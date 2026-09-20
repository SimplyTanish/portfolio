import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ARCHIVE } from "@/lib/data";

export function ArchiveCollections() {
  return (
    <section className="border-y border-edge-soft bg-surface">
      <div className="mx-auto max-w-[1200px] px-6 pb-28 md:px-10 md:pb-40">
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-3">
          {/* photography */}
          <Reveal>
            <div className="flex h-full flex-col">
              <CollectionMeta index="A" title="Photography" note="Est. 2025" />
              <div className="relative mt-5 aspect-[4/3] overflow-hidden border border-edge-soft bg-background">
                <Image
                  src="/img/mumbai.svg"
                  alt="Monochrome Mumbai night skyline — placeholder"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out hover:scale-[1.03]"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/70 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ink-soft backdrop-blur-sm">
                  <span>FIG. 01 — Bombay</span>
                  <span>B&amp;W / 35MM</span>
                </div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-ink-soft">
                {ARCHIVE.photography}
              </p>
            </div>
          </Reveal>

          {/* library */}
          <Reveal delay={0.06}>
            <div className="flex h-full flex-col">
              <CollectionMeta index="B" title="Library" note="Vol. I—" />
              <div className="mt-5 flex flex-1 flex-col border border-edge-soft bg-background">
                <div className="border-b border-edge-soft px-5 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
                  Books that shaped me
                </div>
                <ul className="flex flex-1 flex-col">
                  {ARCHIVE.library.map((book, i) => (
                    <li
                      key={book}
                      className="group flex flex-1 items-center justify-between gap-3 border-b border-edge-soft px-5 py-4 transition-colors duration-200 last:border-0 hover:bg-surface"
                    >
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-ink-soft transition-colors duration-200 group-hover:text-ink">
                        {book}
                      </span>
                      <span className="font-mono text-[10px] text-ink-mute/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-ink-mute">
                Fiction, engineering &amp; not-so-optional reading
              </p>
            </div>
          </Reveal>

          {/* journal */}
          <Reveal delay={0.12}>
            <div className="flex h-full flex-col">
              <CollectionMeta index="C" title="Journal" note="Field notes" />
              <div className="mt-5 flex flex-1 flex-col border border-edge-soft bg-background">
                <div className="border-b border-edge-soft px-5 py-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
                  Essays &amp; cybersecurity notes
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                  <p className="text-sm leading-relaxed text-ink-soft">
                    {ARCHIVE.journal}
                  </p>
                  <div className="border-t border-edge-soft pt-4">
                    <div className="flex flex-col gap-2.5">
                      <JournalEntry n="01" title="Designing for adversaries" />
                      <JournalEntry n="02" title="Notes on Kerberoasting" />
                      <JournalEntry n="03" title="Boring infrastructure" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CollectionMeta({
  index,
  title,
  note,
}: {
  index: string;
  title: string;
  note: string;
}) {
  return (
    <div className="flex items-baseline justify-between border-b border-edge pb-3">
      <span className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] text-ink-mute">{index}</span>
        <span className="text-xl font-medium tracking-[-0.02em] text-ink md:text-2xl">
          {title}
        </span>
      </span>
      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
        {note}
      </span>
    </div>
  );
}

function JournalEntry({ n, title }: { n: string; title: string }) {
  return (
    <div className="group flex items-baseline justify-between gap-3">
      <span className="font-mono text-xs text-ink-soft transition-colors duration-200 group-hover:text-ink">
        {title}
      </span>
      <span className="font-mono text-[10px] text-ink-mute/60 transition-colors duration-200 group-hover:text-ink-soft">
        {n}
      </span>
    </div>
  );
}