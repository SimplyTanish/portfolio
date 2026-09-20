"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import { StarryNight } from "@/components/starry-night";
import { SITE } from "@/lib/data";
import { useLauncher } from "@/components/launcher";

export function Desktop() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { open } = useLauncher();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* starry night */}
      <div className="absolute inset-0 z-0">
        <StarryNight />
      </div>

      {/* metadata rail */}
      <div className="relative z-10 mt-16 flex items-center justify-between border-b border-edge-soft px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute md:mx-auto md:w-full md:max-w-[1200px] md:px-10">
        <span>System operator — {SITE.base}</span>
        <span className="hidden sm:block">{SITE.coords}</span>
      </div>

      {/* desktop content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 pb-16 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft"
        >
          {SITE.roles.map((r, i) => (
            <span key={r} className="flex items-center gap-3">
              {i > 0 && <span className="inline-block h-px w-4 bg-edge" />}
              <span className="border border-edge px-2 py-1">{r}</span>
            </span>
          ))}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(4.5rem,18vw,13rem)] font-medium leading-[0.85] tracking-[-0.045em] text-ink"
        >
          TORO
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-md text-base leading-relaxed text-ink-soft md:text-lg"
        >
          {SITE.role}. Building secure systems &amp; meaningful digital
          experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <button
            onClick={open}
            data-cursor
            className="group inline-flex h-11 items-center gap-3 border border-ink px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-colors duration-200 hover:bg-ink hover:text-background"
          >
            Open Launcher
            <span className="grid grid-cols-2 gap-[3px]">
              {[...Array(4)].map((_, i) => (
                <span
                  key={i}
                  className="size-1 bg-current transition-transform duration-200 group-hover:scale-125"
                />
              ))}
            </span>
          </button>
          <Link
            href="/operations"
            className="group inline-flex h-11 items-center gap-3 border border-edge px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            View Operations
          </Link>
          <Link
            href={SITE.resume}
            className="inline-flex h-11 items-center gap-3 border border-edge px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            Resume
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-14 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute"
        >
          Navigate the grid — or press Ctrl+K for the terminal
        </motion.p>
      </motion.div>
    </section>
  );
}