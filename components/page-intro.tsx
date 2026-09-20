import type { ReactNode } from "react";

export function PageIntro({
  route,
  index,
  title,
  titleSoft,
  description,
  meta = [],
}: {
  route: string;
  index: string;
  title: string;
  titleSoft?: string;
  description: ReactNode;
  meta?: [string, string][];
}) {
  return (
    <header className="mx-auto max-w-[1200px] px-6 pt-24 md:px-10 md:pt-32">
      {/* route rail */}
      <div className="flex items-center justify-between border-t border-edge pt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
        <span>{route}</span>
        <span>File {index} — {title}</span>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-10 pb-16 md:grid-cols-12 md:pb-20">
        <div className="md:col-span-8">
          <h1 className="text-[clamp(2.4rem,6.5vw,5.2rem)] font-medium leading-[0.96] tracking-[-0.04em] text-ink">
            {title}
            {titleSoft && (
              <>
                {" "}
                <span className="text-ink-soft">{titleSoft}</span>
              </>
            )}
          </h1>
        </div>
        <div className="flex flex-col justify-end md:col-span-4">
          <div className="border-t border-edge-soft pt-4">
            <p className="text-sm leading-relaxed text-ink-soft">
              {description}
            </p>
          </div>
          {meta.length > 0 && (
            <div className="mt-6 flex flex-col divide-y divide-edge-soft border-b border-edge-soft">
              {meta.map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-6 py-1.5">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink-mute">
                    {k}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-soft">
                    {v}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}