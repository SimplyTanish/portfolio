"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ARCHIVE,
  ARSENAL,
  INTERESTS,
  OPERATIONS,
  ORBIT_NODES,
  SITE,
} from "@/lib/data";

type Line = { kind: "cmd" | "out" | "err"; text: string; cwd?: string };
type Dir = { type: "dir"; children: Record<string, Node> };
type File = { type: "file"; content: string };
type Node = Dir | File;

const file = (content: string): File => ({ type: "file", content });
const dir = (children: Record<string, Node>): Dir => ({ type: "dir", children });

const HOME = ["home", "toro"];

const FS: Dir = dir({
  home: dir({
    toro: dir({
      "readme.txt": file(
        [
          "ECLIPSE / BLACKSITE — operator workstation.",
          "",
          "System online since 2026. Monochrome only, no exceptions.",
          "Run 'help' for commands, or 'open <app>' to jump into a section.",
          "Try: fetch, ls ~, cat identity/about.txt",
        ].join("\n"),
      ),
      "resume.md": file(
        [
          "TORO — SYSTEM OPERATOR",
          "Cybersecurity Student · Systems Engineer · Security Researcher",
          "Base: Mumbai, IN · tz: Asia/Kolkata",
          "",
          "The full dossier lives at /resume.",
        ].join("\n"),
      ),
      identity: dir({
        "about.txt": file(
          [
            "TORO",
            `Role: ${SITE.role}`,
            `Base: ${SITE.base}`,
            `Coords: ${SITE.coords}`,
            "",
            "Focus: secure infrastructure, red team learning, Linux.",
            `Interests: ${INTERESTS.join(", ")}`,
          ].join("\n"),
        ),
      }),
      operations: dir({
        "readme.md": file(
          [
            "OPERATIONS — /// classified",
            ...OPERATIONS.map(
              (op) =>
                `${op.index} ${op.title} — ${op.status} — ${op.summary.split(".")[0]}.`,
            ),
          ].join("\n"),
        ),
      }),
      arsenal: dir({
        "tools.txt": file(
          ARSENAL.map(
            (c) => `${c.category}: ${c.items.join(", ")}`,
          ).join("\n"),
        ),
      }),
      orbit: dir({
        "path.txt": file(
          ORBIT_NODES.map(
            (n) => `${n.date} ${n.title} — ${n.detail.split(".")[0]}.`,
          ).join("\n"),
        ),
      }),
      archive: dir({
        "collection.txt": file(
          [
            `Photography: ${ARCHIVE.photography}`,
            `Library: ${ARCHIVE.library.join(", ")}.`,
            `Journal: ${ARCHIVE.journal}`,
          ].join("\n"),
        ),
      }),
      contact: dir({
        "channels.txt": file(
          [
            `GitHub: ${SITE.github}`,
            `LinkedIn: ${SITE.linkedin}`,
            `Email: ${SITE.email}`,
            `Resume: /resume`,
          ].join("\n"),
        ),
      }),
    }),
  }),
});

const COMMANDS: Record<string, string> = {
  help: "show this list",
  whoami: "print current operator",
  pwd: "print working directory",
  ls: "list directory contents",
  cd: "change directory",
  cat: "print file contents",
  echo: "print text",
  date: "show current IST time",
  uname: "print system information",
  hostname: "print machine name",
  fetch: "system information block",
  open: "open a section of the site",
  clear: "clear the screen",
  history: "show command history",
  sudo: "elevate privileges",
  exit: "close the terminal",
};

const OPEN_ROUTES: Record<string, string> = {
  home: "/",
  identity: "/identity",
  operations: "/operations",
  arsenal: "/arsenal",
  orbit: "/orbit",
  archive: "/archive",
  contact: "/contact",
  resume: "/resume",
  about: "/identity",
};

function getNode(segs: readonly string[]): Node | null {
  let node: Node = FS;
  for (const s of segs) {
    if (node.type !== "dir") return null;
    const child: Node | undefined = node.children[s];
    if (!child) return null;
    node = child;
  }
  return node;
}

function resolve(input: string, cwd: readonly string[]): string[] | null {
  let base: string[];
  let rest = input;
  if (rest === "~" || rest.startsWith("~/")) {
    base = [...HOME];
    rest = rest.replace(/^~\/?/, "");
  } else if (rest.startsWith("/")) {
    base = [];
    rest = rest.replace(/^\//, "");
  } else {
    base = [...cwd];
  }
  if (rest === "") return base;
  const out = [...base];
  for (const part of rest.split("/")) {
    if (part === "" || part === ".") continue;
    if (part === "..") {
      out.pop();
      continue;
    }
    out.push(part);
  }
  return out;
}

function prettyCwd(cwd: readonly string[]) {
  if (cwd.length === 0) return "/";
  if (cwd.length === HOME.length && cwd.every((s, i) => s === HOME[i]))
    return "~";
  if (cwd[0] === HOME[0] && cwd[1] === HOME[1])
    return "~/" + cwd.slice(2).join("/");
  return "/" + cwd.join("/");
}

function fmtDate() {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.timezone,
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
}

const banner = (): Line[] => [
  {
    kind: "out",
    text: [
      "ECLIPSE TERMINAL — V0.3",
      `${SITE.name} / ${SITE.codename} — Linux shell (Arch x86_64)`,
      "",
      "type 'help' for a list of commands",
      "",
    ].join("\n"),
  },
];

type TerminalProps = {
  onClose: () => void;
  onOpenApp: (path: string) => void;
};

function Terminal({ onClose, onOpenApp }: TerminalProps) {
  const [lines, setLines] = useState<Line[]>(banner);
  const [cwd, setCwd] = useState<string[]>([...HOME]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const cwdLabel = prettyCwd(cwd);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const push =
    (kind: Line["kind"]) =>
    (text: string): Line[] => [{ kind, text }];

  const run = (raw: string) => {
    const trimmed = raw.trim();
    const promptRight = prettyCwd(cwd);
    setLines((prev) => [
      ...prev,
      { kind: "cmd", text: trimmed, cwd: promptRight },
    ]);
    setHistory((prev) => [...prev, raw]);
    setHistIdx(-1);

    if (!trimmed) return;

    const args = trimmed.split(/\s+/);
    const cmd = args[0].toLowerCase();
    const rest = args.slice(1);
    let out: Line[] = [];

    switch (cmd) {
      case "help":
        out = push("out")(
          Object.entries(COMMANDS)
            .map(([n, d]) => `  ${n.padEnd(12)}${d}`)
            .join("\n"),
        );
        break;
      case "whoami":
        out = push("out")("toro");
        break;
      case "pwd":
        out = push("out")("/" + cwd.join("/"));
        break;
      case "ls": {
        const segs = rest[0] ? resolve(rest[0], cwd) : cwd;
        if (!segs) {
          out = push("err")(`bash: ls: ${rest[0]}: No such file or directory`);
          break;
        }
        const node = getNode(segs);
        if (!node) {
          out = push("err")(`bash: ls: ${rest[0]}: No such file or directory`);
          break;
        }
        if (node.type === "file") {
          out = push("out")(rest[0] || `~/${segs.slice(2).join("/")}`);
          break;
        }
        const entries = Object.keys(node.children).sort();
        out = push("out")(
          entries.map((k) =>
            node.children[k].type === "dir" ? `${k}/` : k,
          ).join("  "),
        );
        break;
      }
      case "cd": {
        const target = rest[0] || "~";
        const segs = resolve(target, cwd);
        if (!segs) {
          out = push("err")(
            `bash: cd: ${rest[0]}: No such file or directory`,
          );
          break;
        }
        const node = getNode(segs);
        if (!node) {
          out = push("err")(
            `bash: cd: ${rest[0]}: No such file or directory`,
          );
          break;
        }
        if (node.type === "file") {
          out = push("err")(`bash: cd: ${rest[0]}: Not a directory`);
          break;
        }
        setCwd(segs);
        break;
      }
      case "cat": {
        if (!rest[0]) {
          out = push("err")("usage: cat <file>");
          break;
        }
        const segs = resolve(rest[0], cwd);
        const node = segs ? getNode(segs) : null;
        if (!node) {
          out = push("err")(
            `cat: ${rest[0]}: No such file or directory`,
          );
          break;
        }
        if (node.type === "dir") {
          out = push("err")(`cat: ${rest[0]}: Is a directory`);
          break;
        }
        out = push("out")(node.content);
        break;
      }
      case "echo":
        out = push("out")(
          rest
            .join(" ")
            .replace(/\$HOME/, "/home/toro")
            .replace(/\$USER/, "toro")
            .replace(/\$PWD/, "/" + cwd.join("/")),
        );
        break;
      case "date":
        out = push("out")(`${fmtDate()} IST`);
        break;
      case "uname":
        out = push("out")(
          rest[0] === "-a"
            ? "Linux blacksite 6.12.10-arch1-1 x86_64 GNU/Linux"
            : "Linux",
        );
        break;
      case "hostname":
        out = push("out")("blacksite");
        break;
      case "fetch": {
        out = push("out")(
          [
            "        toro@blacksite",
            "        -----------------------------",
            `        OS: Arch Linux (x86_64)`,
            `        Shell: basil`,
            `        DE: Wayland / Hyprland`,
            `        Base: ${SITE.base}`,
            `        Terminal: ECLIPSE V0.3`,
            "",
          ].join("\n"),
        );
        break;
      }
      case "open": {
        if (!rest[0]) {
          out = push("out")(
            `usage: open <app>\napps: ${Object.keys(OPEN_ROUTES).join(", ")}`,
          );
          break;
        }
        const route = OPEN_ROUTES[rest[0].toLowerCase()];
        if (!route) {
          out = push("err")(`bash: open: ${rest[0]}: no such application`);
          break;
        }
        out = push("out")(`→ ${route}`);
        window.setTimeout(() => onOpenApp(route), 220);
        setLines((prev) => [...prev, ...out]);
        return;
      }
      case "clear":
        setLines([]);
        return;
      case "history":
        out = push("out")(
          history.length === 0
            ? "no entries yet"
            : history
                .map((h, i) => `  ${String(i + 1).padStart(3)}  ${h}`)
                .join("\n"),
        );
        break;
      case "sudo":
        out = push("err")(
          "toro is not in the sudoers file.\nThis incident will be reported.",
        );
        break;
      case "exit":
      case "logout":
        return onClose();
      default:
        out = push("err")(`bash: ${cmd}: command not found`);
    }

    setLines((prev) => [...prev, ...out]);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const idx =
        histIdx === -1 ? history.length - 1 : Math.max(0, histIdx - 1);
      setHistIdx(idx);
      setInput(history[idx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx === -1) return;
      const idx = histIdx + 1;
      if (idx >= history.length) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(idx);
        setInput(history[idx]);
      }
    } else if (e.key === "c" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      const promptRight = prettyCwd(cwd);
      setLines((prev) => [
        ...prev,
        { kind: "cmd", text: "^C", cwd: promptRight },
      ]);
      setInput("");
      setHistIdx(-1);
    } else if (e.key === "Tab") {
      e.preventDefault();
      const value = input;
      const space = value.lastIndexOf(" ");
      const token = space === -1 ? value : value.slice(space + 1);
      const prefix = space === -1 ? "" : value.slice(0, space + 1);
      const node = getNode(cwd);
      if (!token) return;
      const isArg = space !== -1;
      const pool = isArg
        ? node && node.type === "dir"
          ? Object.keys(node.children)
          : []
        : Object.keys(COMMANDS);
      const matches = pool.filter(
        (c) => c.toLowerCase().startsWith(token.toLowerCase()),
      );
      if (matches.length === 1) {
        setInput(prefix + matches[0]);
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          {
            kind: "out",
            text: matches.join("  "),
            cwd: prettyCwd(cwd),
          },
        ]);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-background/75 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.99 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -6, scale: 0.99 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        onMouseDown={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        className="flex w-full max-w-2xl flex-col overflow-hidden border border-edge bg-surface shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center justify-between border-b border-edge-soft px-5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-mute">
            ECLIPSE TERMINAL — V0.3
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">
            ctrl+k · esc /
            <button onClick={onClose} className="ml-1 hover:text-ink">
              close
            </button>
          </span>
        </div>

        <div
          ref={bodyRef}
          onClick={() => inputRef.current?.focus()}
          className="max-h-[42vh] min-h-[220px] overflow-y-auto px-5 py-4 font-mono text-[12px] leading-[1.65] text-ink-soft"
        >
          {lines.map((line, i) =>
            line.kind === "cmd" ? (
              <div key={i} className="text-ink">
                <span className="text-ink-mute">
                  toro@blacksite:{line.cwd ?? cwdLabel}$
                </span>{" "}
                {line.text}
              </div>
            ) : (
              <div
                key={i}
                className={`whitespace-pre-wrap ${
                  line.kind === "err" ? "text-ink-mute" : "text-ink-soft"
                }`}
              >
                {line.text}
              </div>
            ),
          )}
        </div>

        <div className="flex items-center gap-3 border-t border-edge-soft px-5 py-3.5">
          <span className="shrink-0 font-mono text-[12px] text-ink-mute">
            toro@blacksite:{cwdLabel}$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="terminal input"
            className="w-full bg-transparent font-mono text-[12px] text-ink caret-ink outline-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

type TerminalCtx = { open: () => void };
const TerminalContext = createContext<TerminalCtx>({ open: () => {} });

export const useTerminal = () => useContext(TerminalContext);

export function TerminalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const openTerminal = () => {
    setOpen((v) => !v);
  };

  return (
    <TerminalContext.Provider value={{ open: openTerminal }}>
      {children}
      <AnimatePresence>
        {open && (
          <Terminal
            onClose={() => setOpen(false)}
            onOpenApp={(path) => {
              setOpen(false);
              router.push(path);
            }}
          />
        )}
      </AnimatePresence>
    </TerminalContext.Provider>
  );
}