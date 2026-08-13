"use client";

import Image from "next/image";
import { useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";
import { projects, type Project } from "@/lib/projects";
import { Reveal } from "./motion";

function Shot({ project, dict }: { project: Project; dict: Dict }) {
  const [failed, setFailed] = useState(!project.hasShots);

  if (failed) {
    // Platzhalter, bis echte Screenshots vorliegen (public/referenzen/<slug>-desktop.png)
    return (
      <div className="flex aspect-[16/10] w-full flex-col justify-between bg-surface-2 p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-muted">
          {dict.work.shotPending}
        </span>
        <span className="display text-2xl text-foreground/80">
          {project.domain}
        </span>
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
      <Reveal>
        <h2 className="display text-[clamp(2.2rem,6vw,3.8rem)]">
          {dict.work.heading}
        </h2>
        <p className="mt-4 max-w-prose text-muted">{dict.work.sub}</p>
      </Reveal>

      <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 2) * 0.08}>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block no-underline"
            >
              <div className="overflow-hidden rounded-xl border border-line transition-colors duration-300 group-hover:border-accent">
                <div className="transition-transform duration-500 ease-out group-hover:scale-[1.02]">
                  <Shot project={project} dict={dict} />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-bold text-foreground">
                  {project.name}
                </h3>
                <span className="shrink-0 text-sm text-muted">
                  {project.category[lang]}
                </span>
              </div>
              <span className="mt-1 inline-block text-sm text-muted transition-colors group-hover:text-accent">
                {project.domain} ↗
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
