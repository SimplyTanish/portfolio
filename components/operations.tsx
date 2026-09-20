import { Reveal } from "@/components/reveal";
import { OPERATIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

export function OperationsGrid() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-28 md:px-10 md:pb-40">
      <div className="mt-14 flex flex-col gap-6">
        {OPERATIONS.map((op, i) => (
          <Reveal key={op.slug} delay={0.04 * i}>
            <a
              href={`/operations/${op.slug}`}
              className="group relative block border border-edge bg-surface transition-[border-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-1 hover:border-ink/40 hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.9)]"
            >
              {/* corner ticks */}
              <span className="absolute left-2 top-2 size-2 border-l border-t border-ink-mute/40" />
              <span className="absolute right-2 top-2 size-2 border-r border-t border-ink-mute/40" />
              <span className="absolute bottom-2 left-2 size-2 border-b border-l border-ink-mute/40" />
              <span className="absolute bottom-2 right-2 size-2 border-b border-r border-ink-mute/40" />

              {/* header band */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge-soft px-6 py-4 md:px-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
                  FILE № {op.index} — {op.codename}
                </span>
                <span className="inline-flex items-center gap-2 border border-edge px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
                  <span
                    className={cn(
                      "size-1.5 rounded-full",
                      op.status === "OPEN SOURCE"
                        ? "bg-ink/80"
                        : op.status === "IN DEVELOPMENT"
                          ? "bg-ink-soft"
                          : "bg-ink-mute animate-pulse",
                    )}
                  />
                  {op.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-0 md:grid-cols-12">
                {/* body */}
                <div className="px-6 py-8 md:col-span-7 md:px-10">
                  <h3 className="text-[clamp(1.6rem,3.5vw,2.6rem)] font-medium tracking-[-0.03em] text-ink transition-colors duration-200 group-hover:text-white">
                    {op.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft">
                    {op.summary}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {op.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-edge px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute transition-colors duration-200 group-hover:text-ink">
                    Open case
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                </div>

                {/* features */}
                <div className="border-t border-edge-soft bg-surface-2/60 px-6 py-8 md:col-span-5 md:border-l md:border-t-0 md:px-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
                    — Capabilities
                  </p>
                  <ul className="mt-5 flex flex-col gap-1">
                    {op.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-baseline gap-3 border-b border-edge-soft last:border-0"
                      >
                        <span className="pb-2.5 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}