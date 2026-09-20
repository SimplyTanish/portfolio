"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";
import { ORBIT_NODES } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Orbit() {
  return (
    <section
      id="orbit"
      className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40"
    >
      <SectionHead index="(04)" title="Orbit" />

      <Reveal className="mt-14">
        <p className="max-w-md leading-relaxed text-ink-soft">
          A trajectory, not a timeline. Three positions so far — each one
          expands on contact.
        </p>
      </Reveal>

      <div className="relative mt-16 md:mt-20">
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-edge via-edge-soft to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="flex flex-col">
          {ORBIT_NODES.map((node, i) => (
            <OrbitNode key={node.date} node={node} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function OrbitNode({
  node,
  index,
}: {
  node: (typeof ORBIT_NODES)[number];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const left = index % 2 === 0;

  const openHandler = { onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false) };

  return (
    <div className="relative grid grid-cols-1 gap-6 pb-20 md:grid-cols-2 md:gap-4 md:pb-28 last:pb-0">
      {/* dot + orbit ring */}
      <div className="absolute left-[7px] top-1.5 md:left-1/2 md:-translate-x-1/2">
        <div className="relative flex size-3 items-center justify-center">
          <motion.span
            className="absolute inset-0 rounded-full border border-ink/50"
            animate={{ scale: open ? 5 : 1, opacity: open ? 0 : 1 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-dashed border-ink-mute"
            animate={{ scale: open ? 6.5 : 1, rotate: open ? 220 : 0, opacity: open ? 0.35 : 0.1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="absolute inset-0 rounded-full bg-ink transition-transform duration-200" />
          <motion.span
            className="pointer-events-none absolute inset-0 rounded-full bg-ink/30 blur-[3px]"
            animate={{ scale: open ? 7 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* content */}
      <div
        className={cn(
          "pl-14 md:pl-0",
          left ? "md:col-start-1 md:pr-24" : "md:col-start-2 md:pl-24",
        )}
      >
        <button
          {...openHandler}
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className={cn(
            "block w-full text-left",
            left && "md:text-right",
          )}
        >
          <span className="flex items-baseline gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
              NODE 0{index + 1}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">
              {node.date}
            </span>
          </span>

          <h3
            className={cn(
              "mt-3 text-[clamp(1.4rem,3vw,2.2rem)] font-medium tracking-[-0.025em] text-ink",
            )}
          >
            {node.title}
          </h3>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                key="detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
                  {node.detail}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <span className="mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute transition-colors duration-200 group-hover:text-ink">
            {open ? "Collapse —" : "Expand +"}
          </span>
        </button>
      </div>
    </div>
  );
}