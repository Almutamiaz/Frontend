import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";

const supportedLocales = routing.locales;
const defaultLocale = routing.defaultLocale;

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and other non-page routes
  if (
    pathname.includes("backend") // Skip files with extensions
  ) {
    return NextResponse.next();
  }

  const localeMatch = pathname.match(/^\/([a-zA-Z0-9-]+)(\/|$)/);
  if (localeMatch) {
    const locale = localeMatch[1];
    if (!supportedLocales.includes(locale)) {
      // Replace the unsupported locale with the default locale
      const newPathname = pathname.replace(
        /^\/[a-zA-Z0-9-]+/,
        `/${defaultLocale}`
      );
      const url = request.nextUrl.clone();
      url.pathname = newPathname;
      return NextResponse.redirect(url);
    }
  }
  // Fallback to next-intl's middleware
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|robots.txt|api).*)"],
};
