"use client";

import type { Dict } from "@/lib/i18n";
import { Reveal } from "./motion";
import { openChat } from "./chat/chat-events";

const CONTACT_EMAIL = "info@kw-agentur.de";

export function Contact({ dict }: { dict: Dict }) {
  return (
    <section id="kontakt" className="border-t border-line bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-32 text-center sm:px-8">
        <Reveal>
          <p className="mx-auto max-w-2xl text-lg text-muted">
            {dict.about.statement}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="display mt-10 text-[clamp(3rem,10vw,5.5rem)]">
            {dict.contact.heading}
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-xl text-muted">{dict.contact.sub}</p>
          <div className="mt-10 flex flex-col items-center gap-5">
            <button
              type="button"
              onClick={openChat}
              className="rounded-full bg-accent px-9 py-4 text-lg font-bold text-background transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
            >
              {dict.contact.cta}
            </button>
            <p className="text-sm text-muted">
              {dict.contact.or}{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-semibold text-foreground hover:text-accent transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
