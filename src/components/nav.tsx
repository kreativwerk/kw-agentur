"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { Logo } from "./logo";
import { openChat } from "./chat/chat-events";

export function Nav({ dict, lang }: { dict: Dict; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const otherLang: Locale = lang === "de" ? "en" : "de";
  const switchHref = pathname.replace(`/${lang}`, `/${otherLang}`) || `/${otherLang}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${lang}#leistungen`, label: dict.nav.services },
    { href: `/${lang}#referenzen`, label: dict.nav.work },
    { href: `/${lang}#ablauf`, label: dict.nav.process },
    { href: `/${lang}#kontakt`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href={`/${lang}`}
          aria-label="Kreativwerk"
          className="text-lg no-underline"
        >
          <Logo />
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link
            href={switchHref}
            hrefLang={otherLang}
            className="text-sm font-semibold text-muted hover:text-foreground transition-colors no-underline uppercase"
            aria-label={otherLang === "de" ? "Deutsche Version" : "English version"}
          >
            {otherLang}
          </Link>
          <button
            type="button"
            onClick={openChat}
            className="rounded-full bg-accent px-4 py-2 text-sm font-bold text-background transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            {dict.nav.cta}
          </button>
        </div>
      </nav>
    </header>
  );
}
