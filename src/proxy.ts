import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["de", "en"] as const;
const defaultLocale = "de";

function getLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0]?.trim().toLowerCase().slice(0, 2);
    if (locales.includes(code as (typeof locales)[number])) return code;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|referenzen|.*\\..*).*)"],
};
