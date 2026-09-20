"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { APPS, UTILITIES, SITE } from "@/lib/data";

type LauncherCtx = { open: () => void };
const LauncherContext = createContext<LauncherCtx>({ open: () => {} });

export const useLauncher = () => useContext(LauncherContext);

export function LauncherProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <LauncherContext.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[86] flex items-center justify-center bg-background/85 px-5 backdrop-blur-2xl md:px-10"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-baseline justify-between border-t border-edge pt-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">
                  Application launcher
                </span>
                <span className="flex items-center gap-6">
                  <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute sm:block">
                    {SITE.base}
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute transition-colors duration-200 hover:text-ink"
                  >
                    esc — close
                  </button>
                </span>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
                {APPS.map((app, i) => (
                  <motion.button
                    key={app.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    onClick={() => go(app.path)}
                    className="group relative flex min-h-[132px] flex-col items-start justify-between bg-background p-6 text-left transition-colors duration-200 hover:bg-surface"
                  >
                    <span className="absolute right-4 top-4 font-mono text-[10px] text-ink-mute/60 transition-colors duration-200 group-hover:text-ink-soft">
                      {app.index}
                    </span>
                    <span className="w-full font-mono text-lg uppercase tracking-[0.16em] text-ink md:text-xl">
                      {app.name}
                    </span>
                    <span className="mt-6 flex w-full items-baseline justify-between gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                        {app.meta}
                      </span>
                      <span className="hidden h-px flex-1 max-w-8 bg-edge transition-all duration-200 group-hover:max-w-14 group-hover:bg-ink/40 md:block" />
                      <span className="inline-block font-mono text-[10px] text-ink-mute transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-ink">
                        →
                      </span>
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-px border border-t-0 border-edge">
                {UTILITIES.map((u) => (
                  <motion.button
                    key={u.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.34, duration: 0.25 }}
                    onClick={() => go(u.path)}
                    className="group flex w-full items-center justify-between gap-4 bg-background px-6 py-5 text-left transition-colors duration-200 hover:bg-surface"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-ink-mute/60">UT</span>
                      <span className="font-mono text-sm uppercase tracking-[0.14em] text-ink">
                        {u.name}
                      </span>
                    </span>
                    <span className="flex items-baseline gap-4">
                      <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute sm:block">
                        {u.meta}
                      </span>
                      <span className="font-mono text-[10px] text-ink-mute transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-ink">
                        →
                      </span>
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
                <span>
                  {SITE.name} — {SITE.codename}
                </span>
                <span className="hidden sm:block">
                  {SITE.coords}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LauncherContext.Provider>
  );
}