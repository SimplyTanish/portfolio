import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";
import { ARSENAL } from "@/lib/data";

export function Arsenal() {
  return (
    <section
      id="arsenal"
      className="border-y border-edge-soft bg-surface"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
        <SectionHead index="(03)" title="Arsenal" />

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
          {ARSENAL.map((group, gi) => (
            <Reveal key={group.category} delay={0.05 * gi}>
              <div>
                <div className="flex items-baseline justify-between border-b border-edge pb-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink">
                    {group.category}
                  </span>
                  <span className="font-mono text-[10px] text-ink-mute">
                    0{gi + 1} / 0{group.items.length}
                  </span>
                </div>
                <ul className="flex flex-col gap-2 pt-4">
                  {group.items.map((item, ii) => (
                    <li key={item}>
                      <div className="group flex items-center justify-between border border-edge-soft bg-background px-4 py-3.5 transition-[border-color,transform,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-ink/40 hover:bg-background">
                        <span className="font-mono text-xs uppercase tracking-[0.16em] text-ink-soft transition-colors duration-200 group-hover:text-ink">
                          {item}
                        </span>
                        <span className="font-mono text-[10px] text-ink-mute/50 transition-colors duration-200 group-hover:text-ink-soft">
                          {String(ii + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
            No proficiency bars. You either hold the tool or you don&apos;t.
          </p>
        </Reveal>
      </div>
    </section>
  );
}