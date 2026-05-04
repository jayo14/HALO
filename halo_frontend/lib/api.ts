import { supabase } from './supabase';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

async function getAuthHeader() {
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    return { 'Authorization': `Bearer ${session.access_token}` };
  }
  return {};
}

export const api = {
  async get(endpoint: string) {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  async post(endpoint: string, body: any) {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error('API request failed');
    return response.json();
  },

  // Streaming chat helper
  async chatStream(message: string, history: any[], onChunk: (chunk: string) => void) {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_BASE_URL}/api/chat/query/`, {
      method: 'POST',
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, history }),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      onChunk(chunk);
    }
  }
};
