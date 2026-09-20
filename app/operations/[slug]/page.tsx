import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { OPERATIONS } from "@/lib/data";

export function generateStaticParams() {
  return OPERATIONS.map((op) => ({ slug: op.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const op = OPERATIONS.find((o) => o.slug === slug);
    return {
      title: op ? op.title : "Operation",
      description: op?.summary,
    };
  });
}

export default async function OperationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const op = OPERATIONS.find((o) => o.slug === slug);
  if (!op) notFound();

  return (
    <main className="mx-auto max-w-[900px] px-6 pb-32 pt-32 md:px-10">
      <Link
        href="/#operations"
        className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        Return to operations
      </Link>

      <div className="mt-14 border border-edge bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge-soft px-6 py-4 md:px-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
            FILE № {op.index} — {op.codename}
          </span>
          <span className="border border-edge px-3 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
            {op.status}
          </span>
        </div>

        <div className="px-6 py-10 md:px-10">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
            CLEARANCE — OPERATOR
          </p>
          <h1 className="mt-4 text-[clamp(2.2rem,6vw,4rem)] font-medium tracking-[-0.035em] text-ink">
            {op.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-soft">
            {op.summary}
          </p>

          <div className="mt-10 border-t border-edge-soft pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
              — Capabilities
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              {op.features.map((f) => (
                <li
                  key={f}
                  className="border-b border-edge-soft py-3 font-mono text-xs uppercase tracking-[0.12em] text-ink-soft"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            {op.tags.map((tag) => (
              <span
                key={tag}
                className="border border-edge px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
        Case file under review — additional material incoming.
      </p>
    </main>
  );
}