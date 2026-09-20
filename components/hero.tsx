"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Moon, MoonFloat } from "@/components/moon";
import { SITE } from "@/lib/data";

const MARQUEE = [
  "Active Directory",
  "Linux",
  "Offensive Security",
  "Infrastructure",
  "Red Team",
  "PWA",
  "Kerberoasting",
  "Postgres",
  "Threat Modeling",
  "Docker",
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const moonY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -140]);
  const moonOpacity = useTransform(scrollYProgress, [0, 0.85], [1, reduced ? 1 : 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduced ? 1 : 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* metadata rail */}
      <div className="mt-16 flex items-center justify-between border-b border-edge-soft px-6 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute md:mx-auto md:w-full md:max-w-[1200px] md:px-10">
        <span>System operator — {SITE.base}</span>
        <span className="hidden sm:block">{SITE.coords}</span>
      </div>

      {/* moon */}
      <motion.div
        style={{ y: moonY, opacity: moonOpacity }}
        className="pointer-events-none absolute inset-x-0 top-20 z-0 flex justify-end pr-6 md:pr-[9vw]"
      >
        <MoonFloat>
          <Moon />
        </MoonFloat>
      </motion.div>

      {/* main content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-6 pb-16 md:px-10"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft"
        >
          <span className="border border-edge px-2 py-1">{SITE.role.toUpperCase()}</span>
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
          Building secure systems &amp; meaningful digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#operations"
            className="group inline-flex h-11 items-center gap-3 border border-ink px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink transition-colors duration-200 hover:bg-ink hover:text-background"
          >
            View Projects
            <span className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>
          <a
            href={SITE.resume}
            className="inline-flex h-11 items-center gap-3 border border-edge px-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            Resume
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute"
        >
          Scroll
        </motion.p>
      </motion.div>

      {/* marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.55 }}
        className="relative z-10 border-t border-edge-soft"
      >
        <div className="flex overflow-hidden py-4">
          <div className="flex min-w-max shrink-0 animate-marquee">
            {[0, 1].map((i) => (
              <div
                key={i}
                aria-hidden={i === 1}
                className={`flex items-center gap-8 pr-8 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute ${
                  i === 1 ? "pointer-events-none select-none" : ""
                }`}
              >
                {MARQUEE.map((w) => (
                  <span key={w + i} className="flex items-center gap-8">
                    {w}
                    <span className="size-1 shrink-0 rounded-full bg-edge" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}