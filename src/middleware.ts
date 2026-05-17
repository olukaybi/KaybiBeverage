import { NextRequest, NextResponse } from 'next/server';

const SHOP_PAGE_PREFIXES = ['/shop', '/cart', '/checkout', '/admin'];

/**
 * When NEXT_PUBLIC_SHOP_ENABLED is not "true", all e-commerce page routes
 * return HTTP 404. This runs before any page rendering so the response is
 * a genuine 404 regardless of component type.
 */
export function middleware(request: NextRequest) {
  if (process.env.NEXT_PUBLIC_SHOP_ENABLED !== 'true') {
    const { pathname } = request.nextUrl;
    const isShopRoute = SHOP_PAGE_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
    );
    if (isShopRoute) {
      return new NextResponse(null, { status: 404 });
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/shop/:path*', '/cart/:path*', '/checkout/:path*', '/admin/:path*'],
};
