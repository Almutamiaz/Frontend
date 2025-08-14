import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const supportedLocales = routing.locales;
const defaultLocale = routing.defaultLocale;

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip static files, API, and backend paths
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

  // Match only the first path segment
  const localeMatch = pathname.match(/^\/([^\/]+)(?:\/|$)/);
  if (localeMatch) {
    const maybeLocale = localeMatch[1];

    if (supportedLocales.includes(maybeLocale)) {
      // If the URL contains the default locale, redirect to the version without it
      if (maybeLocale === defaultLocale) {
        const withoutDefault = pathname.replace(new RegExp(`^\/${defaultLocale}(?:\/|$)`), "/");
        const newPathname = withoutDefault === "" ? "/" : withoutDefault;
        const url = request.nextUrl.clone();
        url.pathname = newPathname;
        return NextResponse.redirect(url);
      }
      // Non-default locale present: allow and continue
    }
    // If the first segment is not a locale, allow path as-is (default locale implied)
  }

  // Fallback to next-intl's middleware
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api|backend).*)"],
};
