import { NextResponse, type NextRequest } from 'next/server';

/**
 * Legacy sacpl.co used mixed-case routes (/Clients, /Contact). Lower-case every
 * page path with a permanent redirect so old links and search results resolve.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname !== pathname.toLowerCase()) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.toLowerCase();
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = {
  // Skip assets, API routes and files with extensions (media keeps its original casing).
  matcher: ['/((?!_next/|api/|media/|brand/|documents/|.*\\.).*)'],
};
