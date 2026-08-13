"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const easeOutExpo = [0.19, 1, 0.22, 1] as const;

/** Scroll-triggered reveal: rises softly into place, once. */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
    >
      {children}
    </motion.div>
  );
}

/** Masked line reveal for display headlines. */
export function LineReveal({
  lines,
  delay = 0,
  className,
  onView = false,
}: {
  lines: string[];
  delay?: number;
  className?: string;
  /** true: erst beim Scrollen in den Viewport auslösen (einmalig) */
  onView?: boolean;
}) {
  const reduce = useReducedMotion();

  // Bei reduzierter Bewegung statisch rendern — nie hinter der Maske verstecken.
  if (reduce) {
    return (
      <span className={className}>
        {lines.map((line) => (
          <span className="block" key={line}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  // Der Viewport-Observer sitzt auf dem ungeclippten Container: die Zeilen
  // selbst stecken zu 100 % hinter der overflow-Maske und hätten Intersection 0.
  return (
    <motion.span
      className={className}
      initial="hidden"
      {...(onView
        ? { whileInView: "visible", viewport: { once: true, margin: "-60px" } }
        : { animate: "visible" })}
    >
      {lines.map((line, i) => (
        <span className="mask-line" key={line}>
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, visible: { y: 0 } }}
            transition={{
              duration: 1.1,
              delay: delay + i * 0.12,
              ease: easeOutExpo,
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

/**
 * Setzt die Klasse "in-view", sobald das Element in den Viewport scrollt —
 * CSS-getriebene Momente (clip-reveal, line-draw) hängen daran.
 */
export function InView({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      onViewportEnter={(entry) => entry?.target.classList.add("in-view")}
    >
      {children}
    </motion.div>
  );
}

export { motion, easeOutExpo };
