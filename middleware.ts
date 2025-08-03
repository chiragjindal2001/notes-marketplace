import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  // For API routes, pass through
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Handle protected routes
  const isAuthPage = ['/login', '/register'].includes(request.nextUrl.pathname);
  
  // Check for custom JWT token in localStorage (we'll check this on the client side)
  // For now, let all requests through and handle auth on the client side
  if (isAuthPage) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
