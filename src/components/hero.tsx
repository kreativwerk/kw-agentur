"use client";

import Link from "next/link";
import type { Dict, Locale } from "@/lib/i18n";
import { projects } from "@/lib/projects";
import { LineReveal, motion } from "./motion";
import { openChat } from "./chat/chat-events";

export function Hero({ dict, lang }: { dict: Dict; lang: Locale }) {
  return (
    <section className="relative flex min-h-svh flex-col justify-center overflow-hidden pt-24">
      {/* Stille dunkle Bühne mit einem warmen Lichtkegel hinter der Headline */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[60rem] w-[60rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,77,0,0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h1 className="display text-[clamp(3rem,11vw,6rem)]">
          <LineReveal lines={[dict.hero.line1, dict.hero.line2]} delay={0.15} />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.19, 1, 0.22, 1] }}
          className="mt-7 max-w-xl text-lg text-muted"
        >
          {dict.hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            type="button"
            onClick={openChat}
            className="rounded-full bg-accent px-7 py-3.5 font-bold text-background transition-transform duration-300 hover:scale-[1.04] active:scale-[0.98]"
          >
            {dict.hero.ctaPrimary}
          </button>
          <Link
            href={`/${lang}#referenzen`}
            className="rounded-full border border-line px-7 py-3.5 font-semibold text-foreground no-underline transition-colors hover:border-foreground"
          >
            {dict.hero.ctaSecondary}
          </Link>
        </motion.div>
      </div>

      {/* Marquee echter Kundendomains */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1 }}
        className="relative mt-20 border-y border-line py-5"
        aria-label={dict.hero.clientsLabel}
      >
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-track flex shrink-0 items-center gap-12 pr-12">
            {[...projects, ...projects].map((project, i) => (
              <span
                key={`${project.slug}-${i}`}
                className="whitespace-nowrap text-sm font-semibold uppercase tracking-wide text-muted"
                aria-hidden={i >= projects.length}
              >
                {project.domain}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
