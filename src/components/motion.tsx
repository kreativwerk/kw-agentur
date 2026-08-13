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
}: {
  lines: string[];
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span className="mask-line" key={line}>
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={{ y: 0 }}
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
    </span>
  );
}

export { motion, easeOutExpo };
