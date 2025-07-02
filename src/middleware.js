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
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  // Match only the first path segment
  const localeMatch = pathname.match(/^\/([^\/]+)(\/|$)/);
  if (localeMatch) {
    const locale = localeMatch[1];

    // Redirect if the matched segment is not a valid locale
    if (!supportedLocales.includes(locale)) {
      const newPathname = `/${defaultLocale}${pathname.replace(
        /^\/[^\/]+/,
        ""
      )}`;
      const url = request.nextUrl.clone();
      url.pathname = newPathname;
      return NextResponse.redirect(url);
    }
  } else {
    // If there's no locale in the path, prepend the default
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(url);
  }

  // Fallback to next-intl's middleware
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api|backend).*)"],
};
