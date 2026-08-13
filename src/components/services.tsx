"use client";

import type { Dict } from "@/lib/i18n";
import { InView } from "./motion";

/**
 * Drei große Leistungszeilen statt gleichförmiger Karten: volle Breite,
 * Trennlinien, Orange-Sweep beim Hover — Titel und Text wechseln auf
 * Hintergrundfarbe, damit der Kontrast auf Orange stimmt. Entrance:
 * Clip-Reveal von links, gestaffelt — kein Sektions-Fade.
 */
export function Services({ dict }: { dict: Dict }) {
  return (
    <section id="leistungen" className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8">
      <h2 className="display text-[clamp(2.2rem,6vw,3.8rem)]">
        {dict.services.heading}
      </h2>

      <InView className="mt-14 border-t border-line">
        {dict.services.items.map((item, i) => (
          <div
            key={item.title}
            className="clip-reveal"
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="sweep group grid gap-4 border-b border-line px-2 py-10 transition-colors duration-300 sm:grid-cols-[1fr_1.4fr] sm:gap-10 sm:px-4">
              <h3 className="display text-3xl sm:text-4xl group-hover:text-background transition-colors duration-300">
                {item.title}
              </h3>
              <div>
                <p className="max-w-prose text-muted group-hover:text-background/80 transition-colors duration-300">
                  {item.text}
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 text-xs font-semibold text-muted transition-colors duration-300 group-hover:border-background/40 group-hover:text-background"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </InView>
    </section>
  );
}
