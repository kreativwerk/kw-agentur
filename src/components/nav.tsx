"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { Dict, Locale } from "@/lib/i18n";
import { Logo } from "./logo";
import { openChat } from "./chat/chat-events";

export function Nav({ dict, lang }: { dict: Dict; lang: Locale }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const otherLang: Locale = lang === "de" ? "en" : "de";
  const switchHref = pathname.replace(`/${lang}`, `/${otherLang}`) || `/${otherLang}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: `/${lang}#leistungen`, label: dict.nav.services },
    { href: `/${lang}#referenzen`, label: dict.nav.work },
    { href: `/${lang}#ablauf`, label: dict.nav.process },
    { href: `/${lang}#kontakt`, label: dict.nav.contact },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-background/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link
          href={`/${lang}`}
          aria-label="Kreativwerk"
          className="text-lg no-underline"
          onClick={() => setMenuOpen(false)}
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
            onClick={() => {
              setMenuOpen(false);
              openChat();
            }}
            className="hidden sm:block rounded-full bg-accent px-4 py-2 text-sm font-bold text-background transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            {dict.nav.cta}
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? dict.chat.close : "Menü"}
            className="md:hidden rounded-full p-2 text-foreground transition-colors hover:bg-surface-2"
          >
            {menuOpen ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="md:hidden fixed inset-x-0 top-[65px] bottom-0 z-40 bg-background/95 backdrop-blur-md"
          >
            <ul className="flex flex-col gap-2 px-5 pt-8">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="display block py-3 text-3xl text-foreground no-underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    openChat();
                  }}
                  className="rounded-full bg-accent px-7 py-3.5 font-bold text-background"
                >
                  {dict.nav.cta}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
