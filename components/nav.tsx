"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { SITE, NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    const ids = [
      "identity",
      "operations",
      "arsenal",
      "orbit",
      "archive",
      "contact",
    ];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
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
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="relative z-50 font-mono text-sm tracking-[0.35em] text-ink"
          >
            TORO
            <span className="ml-2 inline-block size-1 rounded-full bg-ink align-middle" />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-200 hover:text-ink",
                  active === link.href
                    ? "text-ink"
                    : "text-ink-soft",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-ink transition-transform duration-200",
                    active === link.href ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute lg:block">
              Ctrl+K
            </span>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="relative z-50 flex size-10 items-center justify-center md:hidden"
            >
              <span className="relative block h-4 w-5">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-ink transition-transform duration-200",
                    open && "top-1/2 rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-px w-full bg-ink transition-opacity duration-200",
                    open && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-ink transition-transform duration-200",
                    open && "bottom-1/2 -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-background/95 px-6 pb-10 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col divide-y divide-edge-soft border-y border-edge-soft">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.05, duration: 0.25 }}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="font-mono text-2xl tracking-tight uppercase">
                    {link.label}
                  </span>
                  <span className="font-mono text-[10px] text-ink-mute">
                    0{i + 1}
                  </span>
                </motion.a>
              ))}
            </nav>
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
              {SITE.base}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}