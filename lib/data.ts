export const SITE = {
  name: "TORO",
  role: "Cybersecurity Student",
  base: "Mumbai, IN",
  coords: "19.0760° N / 72.8777° E",
  email: "hello@toro.dev",
  github: "https://github.com/SimplyTanish",
  linkedin: "https://linkedin.com/in/toro",
  resume: "/resume",
} as const;

export const NAV_LINKS = [
  { label: "Projects", href: "#operations" },
  { label: "Research", href: "#archive" },
  { label: "About", href: "#identity" },
  { label: "Contact", href: "#contact" },
] as const;

export const INTERESTS = [
  "Active Directory labs",
  "Red Team learning",
  "Linux customization",
  "Production-grade software",
  "Reading books",
  "Formula 1",
  "Football",
  "UFC",
  "Space photography",
] as const;

export type Operation = {
  index: string;
  slug: string;
  codename: string;
  title: string;
  status: string;
  summary: string;
  features: string[];
  tags: string[];
};

export const OPERATIONS: Operation[] = [
  {
    index: "001",
    slug: "bombay-silvers",
    codename: "OP_BOMBAY_SILVERS",
    title: "Bombay Silvers",
    status: "IN DEVELOPMENT",
    summary:
      "Production-grade PWA for India's bullion dealer network. Dealer dashboard, live bullion rates, inventory, orders, RBAC and invoicing — built to survive a bank-grade threat model.",
    features: [
      "Dealer dashboard",
      "Live gold & silver rates",
      "Inventory",
      "Orders",
      "Ledger",
      "RBAC",
      "Invoice generation",
      "Analytics",
    ],
    tags: ["Next.js", "Postgres", "PWA", "Security Architecture"],
  },
  {
    index: "002",
    slug: "ad-research",
    codename: "OP_ACTIVE_DIRECTORY",
    title: "Active Directory Research",
    status: "RESEARCH",
    summary:
      "A living lab for offensive AD techniques. BloodHound mapping, Impacket tooling, Kerberoasting paths and privilege escalation chains — documented as research, not write-ups.",
    features: [
      "BloodHound",
      "Impacket",
      "Kerberoasting",
      "Privilege Escalation",
      "Enterprise Lab",
    ],
    tags: ["BloodHound", "Impacket", "Kerberoasting", "Enterprise Lab"],
  },
  {
    index: "003",
    slug: "hyprland-rice",
    codename: "OP_HYPRLAND",
    title: "Hyprland Rice",
    status: "OPEN SOURCE",
    summary:
      "My Linux environment — Arch, Hyprland, Wayland. A monochrome, Tokyo Night–inspired configuration maintained across dotfiles, tuned for focus and speed.",
    features: ["Arch Linux", "Hyprland", "Wayland", "Dotfiles", "Tokyo Night"],
    tags: ["Arch Linux", "Hyprland", "Wayland", "Tokyo Night"],
  },
];

export const ARSENAL = [
  {
    category: "Offensive Security",
    items: ["Nmap", "Burp Suite", "BloodHound", "Impacket"],
  },
  {
    category: "Systems",
    items: ["Linux", "Active Directory", "Docker", "Git"],
  },
  {
    category: "Development",
    items: ["TypeScript", "Python", "Next.js", "PostgreSQL"],
  },
  {
    category: "Research",
    items: ["HTB", "TryHackMe", "CTFs", "Threat Modeling"],
  },
] as const;

export const ORBIT_NODES = [
  {
    date: "2025",
    title: "Started Cybersecurity",
    detail:
      "Began the deep dive — networking, Linux, and the offensive mindset. First labs, first root flags.",
  },
  {
    date: "2026",
    title: "Designing Bombay Silvers",
    detail:
      "Architecting a production-grade bullion platform end to end — security architecture front and centre.",
  },
  {
    date: "NEXT",
    title: "Red Team Internship",
    detail:
      "The target. Simulated engagements, real infrastructure, and a seat at the table.",
  },
] as const;

export const ARCHIVE = {
  photography:
    "Black & white Mumbai — the city's brutalist edges, wet streets, and quiet hours between 2:00 and 5:00.",
  library: [
    "Peer e Kamil",
    "The Count of Monte Cristo",
    "The Code Book",
    "Ghost in the Wires",
  ],
  journal:
    "Essays and field notes on offensive security, infrastructure, and designing systems that hold under pressure.",
} as const;

export const CONSOLE_COMMANDS = [
  { id: "whoami", label: "whoami", hint: "About the operator" },
  { id: "projects", label: "projects", hint: "Featured operations" },
  { id: "research", label: "research", hint: "Archive & field notes" },
  { id: "resume", label: "resume", hint: "Open CV" },
  { id: "contact", label: "contact", hint: "Open a channel" },
  { id: "clear", label: "clear", hint: "Reset the console" },
] as const;