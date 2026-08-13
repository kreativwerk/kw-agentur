"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { projects, type Project } from "@/lib/projects";

function Shot({
  project,
  dict,
  lang,
}: {
  project: Project;
  dict: Dict;
  lang: Locale;
}) {
  const [failed, setFailed] = useState(!project.hasShots);

  if (failed) {
    // Wartende Fläche als eigene Komposition der Welt: Linienrahmen,
    // Kategorie-Zeile, große Display-Domain — bis der echte Screenshot
    // in public/referenzen/<slug>-desktop.png liegt.
    return (
      <div className="relative flex aspect-[16/10] w-full flex-col p-4">
        <div className="flex flex-1 flex-col justify-between border border-line p-5 transition-colors duration-300 group-hover:border-background/30">
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-xs font-semibold uppercase tracking-wide text-muted transition-colors duration-300 group-hover:text-background/80">
              {project.category[lang]}
            </span>
            <span className="tabular text-xs text-muted transition-colors duration-300 group-hover:text-background/60">
              {dict.work.shotPending}
            </span>
          </div>
          <span className="display [overflow-wrap:anywhere] text-[clamp(1.5rem,3.2vw,2.4rem)] text-foreground transition-colors duration-300 group-hover:text-background">
            {project.domain.replace(/\.(de|com)$/, "")}
            <span className="text-accent transition-colors duration-300 group-hover:text-background/70">
              .{project.domain.split(".").pop()}
            </span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={`/referenzen/${project.slug}-desktop.png`}
      alt={`Screenshot: ${project.name}`}
      width={1280}
      height={800}
      className="aspect-[16/10] w-full object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}

export function Work({ dict, lang }: { dict: Dict; lang: Locale }) {
  return (
    <section id="referenzen" className="mx-auto w-full max-w-6xl px-5 py-28 sm:px-8">
      <h2 className="display text-[clamp(2.2rem,6vw,3.8rem)]">
        {dict.work.heading}
      </h2>
      <p className="mt-4 max-w-prose text-muted">{dict.work.sub}</p>

      <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {projects.map((project) => (
          <a
            key={project.slug}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block no-underline"
          >
            <div className="sweep sweep-tile overflow-hidden rounded-xl border border-line bg-surface-2 transition-colors duration-300 group-hover:border-accent">
              <Shot project={project} dict={dict} lang={lang} />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-bold text-foreground">
                {project.name}
              </h3>
              {/* Kategorie nur, wenn der echte Screenshot sie nicht schon im Tile trägt */}
              {project.hasShots && (
                <span className="shrink-0 text-sm text-muted">
                  {project.category[lang]}
                </span>
              )}
            </div>
            <span className="mt-1 inline-block text-sm text-muted transition-colors group-hover:text-accent">
              {project.domain} ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
