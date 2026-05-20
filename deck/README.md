# SUG Minneapolis 2026 — Slide Deck

The actual deck for the talk. Built with Next.js 16 (App Router), Tailwind v4, framer-motion, and Shiki.

## Run it

```bash
cd deck
npm install      # first time only
npm run dev      # opens http://localhost:3000
```

If port 3000 is taken, Next.js will pick the next available port and print it.

## Navigate

| Key                                | Action            |
| ---------------------------------- | ----------------- |
| `→` / `Space` / `PageDown` / `j`   | Next slide        |
| `←` / `Backspace` / `PageUp` / `k` | Previous slide    |
| `Home`                             | First slide       |
| `End`                              | Last slide        |
| `f`                                | Toggle fullscreen |

Click the left/right edges of the screen to advance too.

Jump straight to any slide with `?slide=N` — useful for rehearsal. The URL auto-updates as you navigate.

## Edit slides

All slide content lives in [src/app/page.tsx](src/app/page.tsx). Each slide is a single JSX expression. Layout primitives live in [src/components/Slide.tsx](src/components/Slide.tsx):

- `<Slide hero>` — full-screen slide with the animated gradient halo
- `<Eyebrow>` — small uppercase label above the title
- `<H1>` / `<H2>` — large titles
- `<Lede>` — soft-colored supporting sentence
- `<Accent color="…">` — colored inline span (`accent`, `accent-2`, `accent-3`, `success`, `danger`)
- `<Pull>` — pull quote with the accent border
- `<Card num title body>` — numbered card
- `<TerminalCue command label>` — "switch to the real demo" cue
- `<FootNote>` — soft small line, usually at the bottom

Code blocks are highlighted server-side by Shiki (`src/lib/highlight.ts`).

## Build for offline use

If the venue Wi-Fi is hostile, run a production build:

```bash
npm run build && npm start
```

## Pre-talk checklist

- [ ] `npm run dev` and walk every slide once.
- [ ] Press `f` to verify fullscreen works on the presentation laptop.
- [ ] Test on the projector's actual resolution. Adjust sizes in [src/app/globals.css](src/app/globals.css) if anything wraps oddly.
- [ ] Disable laptop notifications. You're about to share this screen.

## Layout

```
deck/
├── src/
│   ├── app/
│   │   ├── globals.css        # theme tokens, code styling, halo animation
│   │   ├── layout.tsx
│   │   └── page.tsx           # ← all 18 slides live here
│   ├── components/
│   │   ├── Deck.tsx           # keyboard + transitions + counter
│   │   └── Slide.tsx          # layout primitives
│   └── lib/
│       └── highlight.ts       # Shiki wrapper
├── package.json
└── tsconfig.json
```
