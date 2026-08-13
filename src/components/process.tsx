"use client";

import type { Dict } from "@/lib/i18n";
import { InView } from "./motion";

/**
 * Vier Schritte als echte Sequenz — die Nummern tragen hier Information.
 * Entrance: die Akzentlinien ziehen sich gestaffelt von links auf,
 * der Inhalt bleibt von Anfang an sichtbar.
 */
export function Process({ dict }: { dict: Dict }) {
  return (
    <section id="ablauf" className="border-y border-line bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8">
        <h2 className="display text-[clamp(2.2rem,6vw,3.8rem)]">
          {dict.process.heading}
        </h2>

        <InView>
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {dict.process.steps.map((step, i) => (
              <li key={step.title} className="relative pt-5">
                <span
                  aria-hidden
                  className="line-draw absolute left-0 top-0 h-0.5 w-full bg-accent"
                  style={{ transitionDelay: `${i * 0.15}s` }}
                />
                <span className="tabular text-sm font-bold text-accent">
                  {i + 1} / {dict.process.steps.length}
                </span>
                <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}
