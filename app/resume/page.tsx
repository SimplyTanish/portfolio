import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Toro — cybersecurity student and systems engineer from Mumbai.",
};

const EXPERIENCE = [
  {
    role: "Founder & Systems Engineer",
    org: "Bombay Silvers",
    period: "2026 — PRESENT",
    points: [
      "Designing a production-grade PWA for India's bullion dealer network — dealer dashboards, live bullion rates, inventory, orders and RBAC.",
      "Own the security architecture: auth, access control and data protection from day one.",
    ],
  },
  {
    role: "Security Research",
    org: "Active Directory Lab",
    period: "2025 — PRESENT",
    points: [
      "Experiments on BloodHound, Impacket and Kerberoasting in an enterprise-grade AD lab.",
      "Documenting privilege-escalation paths as replicable research, not write-ups.",
    ],
  },
  {
    role: "Linux Environment",
    org: "Hyprland / Arch",
    period: "ONGOING",
    points: [
      "Maintained dotfiles for a monochrome, Wayland-first workstation on Arch Linux.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "BSc Information Technology",
    org: "University of Mumbai",
    period: "2024 — 2027",
    points: ["Networks, operating systems, security, and software engineering."],
  },
];

const GRID = {
  systems: ["Linux", "Active Directory", "Docker", "Git", "Networking", "Threat Modeling"],
  offensive: ["Nmap", "Burp Suite", "BloodHound", "Impacket", "HTB", "TryHackMe"],
  development: ["TypeScript", "Python", "Next.js", "PostgreSQL", "PWA"],
};

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-[880px] px-6 py-28 md:px-10 md:py-32">
      <Link
        href="/"
        className="no-print inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-mute transition-colors duration-200 hover:text-ink"
      >
        <ArrowLeft className="size-4" />
        Back to site
      </Link>

      {/* header */}
      <header className="mt-14 border-b border-edge pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
          Curriculum Vitae — {SITE.coords}
        </p>
        <h1 className="mt-4 text-[clamp(2.6rem,8vw,5rem)] font-medium leading-none tracking-[-0.04em] text-ink">
          TORO
        </h1>
        <div className="mt-6 flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft sm:flex-row sm:justify-between">
          <span>Cybersecurity Student · Systems Engineer · Security Researcher</span>
          <span className="text-ink-mute">
            {SITE.github.replace("https://", "")} · {SITE.email}
          </span>
        </div>
      </header>

      <ResumeSection title="Profile" index="01">
        <p className="max-w-3xl leading-relaxed text-ink-soft">
          Security-obsessed systems engineer from Mumbai. I design production-grade
          software with security architecture built in, and I research offensive
          techniques to know how systems fail before they do.
        </p>
      </ResumeSection>

      <ResumeSection title="Experience" index="02">
        <div className="flex flex-col gap-10">
          {EXPERIENCE.map((job) => (
            <div key={job.role}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-medium text-ink">{job.role}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
                {job.org}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-4 text-sm leading-relaxed text-ink-soft">
                    <span className="mt-[9px] h-px w-4 shrink-0 bg-edge" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Education" index="03">
        {EDUCATION.map((ed) => (
          <div key={ed.degree}>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-medium text-ink">{ed.degree}</h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
                {ed.period}
              </span>
            </div>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              {ed.org}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{ed.points[0]}</p>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="Arsenal" index="04">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {(
            [
              ["Systems", GRID.systems],
              ["Offensive", GRID.offensive],
              ["Development", GRID.development],
            ] as const
          ).map(([label, items]) => (
            <div key={label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
                {label}
              </p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {items.map((item) => (
                  <li key={item} className="font-mono text-xs text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="Interests" index="05">
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-ink-soft">
          Formula 1 · Football · UFC · Reading · Space photography · Mumbai nights
        </p>
      </ResumeSection>

      <div className="mt-20 flex items-center justify-between border-t border-edge pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-mute">
        <span>© 2026 TORO</span>
        <span>Eclipse / Blacksite</span>
      </div>
    </main>
  );
}

function ResumeSection({
  title,
  index,
  children,
}: {
  title: string;
  index: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 border-t border-edge pt-8">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-[10px] text-ink-mute">{index}</span>
        <h2 className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink">
          {title}
        </h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}