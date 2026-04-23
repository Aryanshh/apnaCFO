import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Configuration of protected routes that require a valid session
const protectedRoutes = ['/dashboard', '/profile', '/booking', '/calculators/portfolio', '/calculators/risk'];

export function middleware(request: NextRequest) {
  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // Retrieve the session token (Supabase auth token or mock cookie)
  // We use our mock cookie 'apna_cfo_session' mapped from the /auth payload
  const hasSession = request.cookies.has('apna_cfo_session');

  // Logic 1: Unauthenticated user trying to access a secure route
  if (isProtectedRoute && !hasSession) {
    const authUrl = new URL('/auth', request.url);
    return NextResponse.redirect(authUrl);
  }

  // Logic 2: Authenticated user trying to access /auth (should be redirected to their dashboard)
  if (request.nextUrl.pathname === '/auth' && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Ensure the middleware only runs on specific application paths
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/booking/:path*',
    '/calculators/:path*',
    '/auth'
  ],
};
