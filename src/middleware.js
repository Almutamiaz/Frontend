import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

// Define the middleware function with specific handling for the root path
export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for certain paths to prevent infinite loops
  if (
    pathname.startsWith("/api") ||
    pathname.includes("backend") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/.well-known") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }
  
  // For all other paths, use the next-intl middleware
  const handleI18nRouting = createMiddleware({
    // The locales you want to support
    locales: ["ar", "en"],
    // Arabic is available at / without a prefix
    defaultLocale: "ar",
    // Only add locale prefix for non-default locales (so only /en/... gets a prefix)
    localePrefix: "as-needed",
    // Don't automatically redirect based on the user's locale preference
    localeDetection: false
  });
  
  return handleI18nRouting(request);
}

// Configure which paths should be processed by this middleware
export const config = {
  matcher: ["/((?!api|backend|_next|favicon.ico|robots.txt).*)"]
};
