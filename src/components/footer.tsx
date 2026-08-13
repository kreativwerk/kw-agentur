import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { Logo } from "./logo";

export function Footer({ dict, lang }: { dict: Dict; lang: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-8">
        <Logo className="text-base" />
        <p className="tabular text-sm text-muted">
          © {year} Kreativwerk · kw-agentur.de · {dict.footer.rights}
        </p>
        <ul className="flex gap-6">
          <li>
            <Link
              href={`/${lang}/impressum`}
              className="text-sm text-muted hover:text-foreground transition-colors no-underline"
            >
              {dict.footer.imprint}
            </Link>
          </li>
          <li>
            <Link
              href={`/${lang}/datenschutz`}
              className="text-sm text-muted hover:text-foreground transition-colors no-underline"
            >
              {dict.footer.privacy}
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
