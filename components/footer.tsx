"use client";

import { useEffect, useState } from "react";
import { SITE } from "@/lib/data";
import { useLauncher } from "@/components/launcher";

export function Footer() {
  const [ist, setIst] = useState<string | null>(null);
  const { open } = useLauncher();

  useEffect(() => {
    let timer: number;
    const update = () => {
      setIst(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: SITE.timezone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
      timer = window.setTimeout(update, 30000);
    };
    timer = window.setTimeout(update, 1);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <footer className="border-t border-edge-soft">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute md:flex-row md:px-10">
        <span>
          © 2026 {SITE.name} — {SITE.codename}
        </span>

        <button
          onClick={open}
          className="inline-flex items-center gap-3 text-ink-soft transition-colors duration-200 hover:text-ink"
        >
          <span className="grid grid-cols-2 gap-[3px]">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="size-[3px] bg-current" />
            ))}
          </span>
          Open launcher
        </button>

        <div className="flex items-center gap-6">
          <span className="hidden sm:block">{SITE.coords}</span>
          <span className="flex items-center gap-2">
            {ist ?? "--:--"} IST
            <span className="size-1.5 animate-pulse rounded-full bg-ink/70" />
          </span>
        </div>
      </div>
    </footer>
  );
}