"use client";

import type { Dict } from "@/lib/i18n";
import { Reveal } from "./motion";

/** Vier Schritte als echte Sequenz — die Nummern tragen hier Information. */
export function Process({ dict }: { dict: Dict }) {
  return (
    <section id="ablauf" className="border-y border-line bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8">
        <Reveal>
          <h2 className="display text-[clamp(2.2rem,6vw,3.8rem)]">
            {dict.process.heading}
          </h2>
        </Reveal>

        <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {dict.process.steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.1}>
              <li className="relative border-t-2 border-accent pt-5">
                <span className="tabular text-sm font-bold text-accent">
                  {i + 1} / {dict.process.steps.length}
                </span>
                <h3 className="mt-2 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {step.text}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
