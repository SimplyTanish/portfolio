"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONSOLE_COMMANDS, SITE } from "@/lib/data";

type CommandId = (typeof CONSOLE_COMMANDS)[number]["id"];

const ROUTES: Record<string, string> = {
  whoami: "#identity",
  projects: "#operations",
  research: "#archive",
  contact: "#contact",
  resume: SITE.resume,
};

export function Console() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const [echo, setEcho] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = CONSOLE_COMMANDS.filter((c) =>
    c.label.toLowerCase().includes(query.trim().toLowerCase()),
  );

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setEcho("");
    setIndex(0);
  }, []);

  const execute = useCallback(
    (raw: string) => {
      const id = raw.trim().toLowerCase() as CommandId;
      if (id === "clear") {
        setQuery("");
        setEcho("console cleared — channel reset");
        inputRef.current?.focus();
        return;
      }
      const route = ROUTES[id];
      if (route) {
        setEcho(`→ navigating to ${route}`);
        const scroller = (window as unknown as {
          __toroScrollTo?: (t: string) => boolean;
        }).__toroScrollTo;
        const ok = scroller ? scroller(route) : false;
        window.setTimeout(() => {
          close();
          if (!ok) {
            const [path, hash] = route.split("#");
            if (hash) {
              window.location.href = path ? route : `/${route}`;
            }
          }
        }, 220);
      } else {
        setEcho(`unknown command: ${raw.trim() || "∅"}`);
        setTimeout(() => setEcho(""), 1600);
      }
    },
    [close],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => {
          if (v) close();
          else setEcho("");
          return !v;
        });
      }
      if (!open) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((i) => Math.min(i + 1, filtered.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const target = filtered[index] ?? CONSOLE_COMMANDS.find((c) => c.id === query.trim());
        execute(target?.label ?? query);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close, query, filtered, index, execute]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[90] flex items-start justify-center bg-background/70 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={close}
        >
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.99 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-lg overflow-hidden border border-edge bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-edge-soft px-5 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
                ECLIPSE CONSOLE — V0.1
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
                esc /
                <button onClick={close} className="ml-1 hover:text-ink">
                  close
                </button>
              </span>
            </div>

            <div className="flex items-center gap-3 border-b border-edge-soft px-5 py-4">
              <span className="font-mono text-sm text-ink-mute">&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setIndex(0);
                }}
                placeholder="type a command…"
                className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-ink-mute/50"
                autoComplete="off"
                spellCheck={false}
              />
            </div>

            <div className="max-h-[280px] overflow-hidden px-2 py-2">
              {filtered.length > 0 ? (
                filtered.map((cmd, i) => (
                  <button
                    key={cmd.id}
                    onClick={() => execute(cmd.label)}
                    onMouseEnter={() => setIndex(i)}
                    className={`flex w-full items-center justify-between gap-4 px-3 py-2.5 text-left transition-colors duration-150 ${
                      i === index ? "bg-ink text-background" : "text-ink-soft"
                    }`}
                  >
                    <span className="font-mono text-sm">{cmd.label}</span>
                    <span
                      className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                        i === index ? "text-background/60" : "text-ink-mute/70"
                      }`}
                    >
                      {cmd.hint}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-4 font-mono text-xs text-ink-mute">
                  no matching command — try &quot;whoami&quot;
                </p>
              )}
            </div>

            <AnimatePresence>
              {echo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-edge-soft px-5 py-3"
                >
                  <p className="font-mono text-xs text-ink-soft">{echo}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="border-t border-edge-soft px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
              {SITE.coords} — {SITE.base}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}