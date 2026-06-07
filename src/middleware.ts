import { NextRequest, NextResponse } from 'next/server';

const SHOP_PAGE_PREFIXES = ['/shop', '/cart', '/checkout', '/admin'];

/**
 * Legal/IP pages are gated behind NEXT_PUBLIC_LEGAL_ENABLED until
 * Sprint 3 is approved and attorney review is complete.
 */
const LEGAL_PAGE_PREFIXES = ['/legal', '/terms', '/privacy', '/authentic', '/distributor-policy'];

/**
 * When NEXT_PUBLIC_SHOP_ENABLED is not "true", all e-commerce page routes
 * return HTTP 404. This runs before any page rendering so the response is
 * a genuine 404 regardless of component type.
 *
 * When NEXT_PUBLIC_LEGAL_ENABLED is not "true", all legal/IP pages also
 * return HTTP 404 — unlinked is not sufficient protection.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (process.env.NEXT_PUBLIC_SHOP_ENABLED !== 'true') {
    const isShopRoute = SHOP_PAGE_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
    );
    if (isShopRoute) {
      return new NextResponse(null, { status: 404 });
    }
  }

  if (process.env.NEXT_PUBLIC_LEGAL_ENABLED !== 'true') {
    const isLegalRoute = LEGAL_PAGE_PREFIXES.some(
      (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
    );
    if (isLegalRoute) {
      return new NextResponse(null, { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/shop/:path*',
    '/cart/:path*',
    '/checkout/:path*',
    '/admin/:path*',
    '/legal/:path*',
    '/legal',
    '/terms/:path*',
    '/terms',
    '/privacy/:path*',
    '/privacy',
    '/authentic/:path*',
    '/authentic',
    '/distributor-policy/:path*',
    '/distributor-policy',
  ],
};
