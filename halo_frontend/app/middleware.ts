import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Simple auth check - redirect to login if no session and not on public paths
  if (!session && !req.nextUrl.pathname.startsWith('/auth') && req.nextUrl.pathname !== '/') {
    // return NextResponse.redirect(new URL('/auth/login', req.url));
    // For now, let's keep it open or just log, as I don't have the login page implementation yet
  }

  return res;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
