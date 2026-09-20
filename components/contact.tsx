import { Reveal } from "@/components/reveal";
import { SITE } from "@/lib/data";
import { ArrowUpRight } from "lucide-react";

const CHANNELS = [
  { label: "GitHub", href: SITE.github, meta: "github.com/SimplyTanish" },
  { label: "LinkedIn", href: SITE.linkedin, meta: "linkedin.com/in/toro" },
  { label: "Email", href: `mailto:${SITE.email}`, meta: SITE.email },
  { label: "Resume", href: SITE.resume, meta: "PDF / print" },
] as const;

export function ContactChannels() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-32 md:px-10 md:pb-40">
      <Reveal className="mt-16">
        <h2 className="max-w-4xl text-[clamp(2.4rem,7vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.04em] text-ink">
          Let&apos;s build something{" "}
          <span className="text-ink-soft">meaningful.</span>
        </h2>
      </Reveal>

      <Reveal delay={0.08} className="mt-8">
        <p className="max-w-md leading-relaxed text-ink-soft">
          Open for internships, research collaborations, and conversations about
          security or infrastructure. Message me — normally right back.
        </p>
      </Reveal>

      <Reveal delay={0.12} className="mt-16">
        <div className="flex flex-col divide-y divide-edge-soft border-y border-edge-soft">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex items-center justify-between gap-4 py-6 transition-all duration-200 hover:pl-3 md:py-7"
            >
              <span className="flex items-baseline gap-5">
                <span className="font-mono text-xs uppercase tracking-[0.05em] text-ink-soft md:text-lg">
                  {c.label}
                </span>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute sm:block">
                  {c.meta}
                </span>
              </span>
              <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute transition-colors duration-200 group-hover:text-ink">
                Open
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}