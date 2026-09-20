"use client";

import { SITE } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-edge-soft">
      <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.4em] text-ink">
              End of transmission
              <span className="ml-2 inline-block h-3 w-2 animate-pulse bg-ink align-middle" />
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
              No signal was lost in the making of this site.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
              © 2026 {SITE.name}
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft transition-colors duration-200 hover:text-ink"
            >
              Ascend
              <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5">
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}