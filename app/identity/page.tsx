import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/page-intro";
import { SITE, INTERESTS, ROUTE_META } from "@/lib/data";

export const metadata: Metadata = ROUTE_META["/identity"];

export default function IdentityPage() {
  return (
    <>
      <PageIntro
        route={ROUTE_META["/identity"].path ?? "~/identity"}
        index="01"
        title="The Operator"
        titleSoft="behind the system."
        description={
          <>
            Cybersecurity is quiet work. I design systems that survive pressure,
            then test how they break — a BSc Information Technology student
            based in Mumbai.
          </>
        }
        meta={[
          ["Name", SITE.name],
          ["Base", SITE.base],
          ["Role", SITE.role],
          ["Clearance", "Operator"],
        ]}
      />
      <Identity />
    </>
  );
}

function Identity() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-28 md:px-10 md:pb-40">
      <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="max-w-xl leading-relaxed text-ink-soft">
            I&apos;m passionate about cybersecurity, Linux, infrastructure, and
            secure system design. I treat a system the way an editor treats a
            sentence — cut what doesn&apos;t hold, keep what&apos;s necessary,
            never trust the surface.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="flex flex-col divide-y divide-edge-soft border-y border-edge-soft">
            <MetaRow label="Focus" value="Secure design · AD labs · Red team · Linux" />
            <MetaRow label="Studies" value="BSc Information Technology" />
            <MetaRow label="Email" value={SITE.email} />
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-edge-soft pt-6">
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

      <Link
        href="/operations"
        className="group mt-16 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute transition-colors duration-200 hover:text-ink"
      >
        View Operations
        <span className="inline-block transition-transform duration-200 group-hover:translate-x-1.5">→</span>
      </Link>

      <p className="mt-12 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
        — End of file
      </p>
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