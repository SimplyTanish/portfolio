import { SectionHead } from "@/components/section-head";
import { Reveal } from "@/components/reveal";
import { INTERESTS } from "@/lib/data";

export function Identity() {
  return (
    <section id="identity" className="mx-auto max-w-[1200px] px-6 py-28 md:px-10 md:py-40">
      <SectionHead index="(01)" title="Identity" />

      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* statement */}
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="text-[clamp(1.9rem,4.2vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-ink">
              Cybersecurity is quiet work —{" "}
              <span className="text-ink-soft">
                I design systems that survive pressure, then test how they break.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-xl leading-relaxed text-ink-soft">
              I&apos;m a BSc Information Technology student based in Mumbai,
              passionate about cybersecurity, Linux, infrastructure, and secure
              system design. I treat a system the way an editor treats a
              sentence — cut what doesn&apos;t hold, keep what&apos;s necessary,
              never trust the surface.
            </p>
          </Reveal>
        </div>

        {/* metadata */}
        <div className="lg:col-span-5">
          <Reveal delay={0.05}>
            <div className="flex flex-col divide-y divide-edge-soft border-y border-edge-soft">
              <MetaRow label="Name" value="Toro" />
              <MetaRow label="Base" value="Mumbai, IN" />
              <MetaRow label="Studies" value="BSc Information Technology" />
              <MetaRow label="Role" value="Cybersecurity Student" />
              <MetaRow label="Focus" value="Secure design · AD labs · Red team · Linux" />
            </div>
          </Reveal>
        </div>
      </div>

      {/* interests */}
      <Reveal delay={0.1} className="mt-20">
        <div className="border-t border-edge-soft pt-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
            Outside the wire
          </p>
          <div className="mt-6 grid grid-cols-1 gap-px overflow-hidden border border-edge-soft bg-edge-soft sm:grid-cols-2 md:grid-cols-3">
            {INTERESTS.map((interest, i) => (
              <div
                key={interest}
                className="group flex items-baseline gap-3 bg-background px-5 py-4 transition-colors duration-200 hover:bg-surface"
              >
                <span className="font-mono text-[10px] text-ink-mute/70">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft">
                  {interest}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6 py-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
        {label}
      </span>
      <span className="text-right font-mono text-xs uppercase tracking-[0.1em] text-ink">
        {value}
      </span>
    </div>
  );
}