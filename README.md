# ECLIPSE / BLACKSITE — TORO

> A premium, single-page portfolio for a cybersecurity student and systems
> engineer. Dossier-grade, editorial, and aggressively monochrome.

Monochrome as an identity, not a theme. Brutalist structure with editorial
typography. A classified intelligence file masquerading as a luxury website —
no green text, no matrix rain, no rgb glow.

---

## Preview

![Toro — Cybersecurity Portfolio](./preview.png)

## Stack

- **[Next.js 15](https://nextjs.org)** (App Router) — static-first, SSR + RSC
- **TypeScript** — strict mode
- **[Tailwind CSS v4](https://tailwindcss.com)** — CSS-first tokens
- **[Framer Motion](https://motion.dev)** — restrained, precise motion
- **[Lenis](https://github.com/darkroomengineering/lenis)** — buttery smooth scrolling
- **[Geist](https://vercel.com/font)** — Geist Sans + Geist Mono (self-hosted via `next/font`)
- **Lucide** — minimal iconography

## Identity

```
Background   #050505
Surface      #090909
Border       #27272A
Primary      #FAFAFA
Secondary    #A1A1AA
Muted        #71717A
```

No accent color. The absence of color is the identity.

## Sections

| Section | Code-name |
| --- | --- |
| Hero | `TORO` — signature crescent moon, parallax + bloom |
| Identity | `01` — editorial statement, metadata rails |
| Featured Operations | `02` — classified dossier cards |
| Arsenal | `03` — tooling grid, no progress bars |
| Orbit | `04` — hover-expanding trajectory nodes |
| Archive | `05` — photography / library / journal |
| Contact | `06` — quiet channels |
| Hidden Console | `Ctrl+K` — command palette navigation |

## Hidden Console

Press `Ctrl+K` (or `Cmd+K`). A command palette opens — a quiet second way to
navigate the site.

```
> whoami        → Identity
> projects      → Featured Operations
> research      → Archive
> resume        → Resume
> contact       → Contact
> clear         → reset console
```

## Getting Started

```bash
npm install
npm run dev       # http://localhost:3000
```

```bash
npm run build     # production build
npm run start     # serve production build
npm run lint      # eslint
```

## Customization

Your content lives in **`lib/data.ts`** — single source of truth:

- Site identity, coordinates, GitHub / LinkedIn / Email / Resume URLs
- Navigation links, interests
- Featured Operations, Arsenal, Orbit nodes, Archive collections
- Console commands

Edit the data, keep the silence. Swap placeholder imagery inside `public/img/`
(`mumbai.svg`, `brutalist.svg`, `editorial.svg`) for real work when ready.

Design tokens are in `app/globals.css` (`@theme`). Typography, motion and
interaction details are per-component under `components/`.

## Performance

- Static prerendering for every route
- 0 CLS, sub-200 ms LCP in testing
- Self-hosted fonts — no external requests
- `prefers-reduced-motion` respected end to end

## License

© 2026 TORO — all rights reserved. The classification is yours to lift; the
code is this operator's.