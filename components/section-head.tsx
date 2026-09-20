import { Reveal } from "@/components/reveal";

export function SectionHead({
  index,
  title,
  className,
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <div className="flex items-baseline gap-4 border-t border-edge-soft pt-4">
        <span className="font-mono text-[11px] tracking-[0.25em] text-ink-mute">
          {index}
        </span>
        <span className="h-px flex-1 bg-edge-soft" />
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-mute">
          {title}
        </span>
      </div>
    </Reveal>
  );
}