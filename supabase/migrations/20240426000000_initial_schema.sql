-- Enable pgvector
create extension if not exists vector;

-- User profiles
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text default 'public', -- public | student | verified_student | admin
  matric_number text unique,
  department text,
  level text,
  school_email text,
  created_at timestamptz default now()
);

-- Knowledge base chunks
create table knowledge_chunks (
  id uuid primary key default gen_random_uuid(),
  category text, -- lecturer|course|rule|location|event|admission|organisation
  title text,
  content text,
  embedding vector(1536),
  source_url text,
  chunk_index int,
  last_updated timestamptz default now(),
  created_at timestamptz default now()
);

-- Lecturers
create table lecturers (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  department text,
  courses_taught text[],
  email text,
  office_location text,
  bio text,
  is_active boolean default true
);

-- Courses
create table courses (
  id uuid primary key default gen_random_uuid(),
  code text unique,
  title text,
  department text,
  level text,
  units integer,
  accreditation_status text,
  lecturer_id uuid references lecturers(id)
);

-- Conversations
create table conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  session_id text,
  messages jsonb,
  created_at timestamptz default now()
);

-- Email logs
create table email_logs (
  id uuid primary key default gen_random_uuid(),
  student_id uuid references profiles(id),
  recipient text,
  subject text,
  body text,
  sent_at timestamptz,
  status text
);

-- News & events
create table news (
  id uuid primary key default gen_random_uuid(),
  title text,
  body text,
  category text, -- news | event | announcement
  event_date timestamptz,
  source text,
  published_at timestamptz default now()
);

-- Student registry (for verification)
create table students_registry (
  matric_number text primary key,
  full_name text,
  department text,
  entry_year text,
  programme text,
  is_verified boolean default false
);

-- Rate limits table
create table rate_limits (
  id uuid primary key default gen_random_uuid(),
  identifier text not null, -- IP or User ID
  request_count int default 1,
  last_request timestamptz default now(),
  reset_at timestamptz not null,
  unique(identifier, reset_at)
);

-- pgvector similarity search function
create or replace function match_knowledge(
  query_embedding vector(1536),
  match_count int default 5,
  filter_category text default null
)
returns table (
  id uuid, content text, title text, category text, similarity float
)
language sql stable as $$
  select id, content, title, category,
    1 - (embedding <=> query_embedding) as similarity
  from knowledge_chunks
  where (filter_category is null or category = filter_category)
  order by embedding <=> query_embedding
  limit match_count;
$$;

-- RLS Policies (Basic setup)
alter table profiles enable row level security;
alter table conversations enable row level security;
alter table email_logs enable row level security;

create policy "Users can view their own profile" on profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can view their own conversations" on conversations
  for select using (auth.uid() = user_id);

create policy "Users can view their own email logs" on email_logs
  for select using (auth.uid() = student_id);
