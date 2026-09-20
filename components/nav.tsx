"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE, ROUTE_META } from "@/lib/data";
import { useLauncher } from "@/components/launcher";
import { useTerminal } from "@/components/terminal";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { open } = useLauncher();
  const terminal = useTerminal();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  const meta = ROUTE_META[pathname];
  const currentPath = meta?.path ?? "~/operator";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-200",
        scrolled
          ? "border-b border-white/5 bg-background/70 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-px origin-left bg-ink/80"
        style={{ scaleX: progress }}
      />
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 md:px-10">
        <div className="flex items-baseline gap-5">
          <Link
            href="/"
            data-cursor
            className="relative z-50 font-mono text-sm tracking-[0.35em] text-ink"
          >
            {SITE.name}
            <span className="ml-2 inline-block size-1 rounded-full bg-ink align-middle" />
          </Link>
          {pathname !== "/" && (
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute md:block">
              {currentPath}
            </span>
          )}
        </div>

        <div className="flex items-center gap-5 md:gap-7">
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute xl:block">
            {SITE.coords}
          </span>

          <span className="group relative">
            <button
              onClick={terminal.open}
              aria-label="Open terminal"
              aria-describedby="terminal-shortcut"
              data-cursor
              className="inline-flex h-9 items-center gap-2 border border-edge px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
            >
              <TerminalIcon className="size-3.5" />
              term
            </button>
            <span
              id="terminal-shortcut"
              className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap border border-edge bg-surface px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-mute opacity-0 transition-opacity duration-150 group-hover:opacity-100"
            >
              Ctrl + K
            </span>
          </span>

          <button
            onClick={open}
            data-cursor
            className="inline-flex h-9 items-center gap-3 border border-edge px-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft transition-colors duration-200 hover:border-ink hover:text-ink"
          >
            <span className="grid grid-cols-2 gap-[3px]">
              {[...Array(4)].map((_, i) => (
                <span key={i} className="size-[3px] bg-current" />
              ))}
            </span>
            Launcher
          </button>
        </div>
      </div>
    </header>
  );
}