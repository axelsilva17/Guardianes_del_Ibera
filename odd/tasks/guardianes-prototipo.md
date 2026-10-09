# Feature: Guardianes del Ibéra — Citizen Prototype

## Objective
Build a navigable React (Vite) prototype of the main citizen-flow screens from the Figma file `ZpLjAhoryyxrv5vMyzgryS`, page `20:105`.

## Problem
The project folder is empty (only `.atl/`). There is no app to review the design against. We need a runnable, visual prototype to validate layout, flow, and design tokens.

## Why
User request: "realizar algunas pantallas principales de este prototipo" using the `ui-designer` agent + Figma MCPs (reads via `figma-free` to protect the official Starter quota).

## Scope
In scope — screens (390x844 mobile frames):
- 02 Login y registro — 22:34039
- 04 Mapa ciudadano — 22:34132
- 07 Aprender — 22:34247

Out of scope (for this pass): all other screens, including the municipal flow (16–23). User narrowed the set to these 3 on request.

## Constraints
- Stack: React + HTML/CSS/JS (Vite). Plain CSS with design tokens (no heavy UI framework).
- Icons: `lucide-react`.
- Design reads: `figma-free` MCP only. Never the official `figma` read tools.
- Mobile-first, fixed 390x844 frame rendered inside a desktop phone shell.
- Git: this folder is NOT its own repo (home dir repo detected). No commits unless the user asks for `git init`.

## Design tokens (from Figma export_tokens)
- Surface bg: `#fbfdfb`, `#ffffff`, `#f4f9f6`
- Primary green: `#138548`; dark teals: `#135b4b`, `#145c4a`, `#054d40`, `#005747`
- Text: `#294e49`; muted `#75908f`
- Accents: `#84be4d`, `#81b55a` (leaf), `#d97736` (Iberá orange), `#e3a436` + `#fff0cd` (amber), `#32b7d8`/`#4daecd`/`#e2f4fa` (info), `#e53935` (error), `#e5efeb` (track)
- Font: Inter

## Tasks
- [x] T1 — Scaffold Vite + React app, design tokens, shared shell components (PhoneFrame, BottomNav, TopBar, Button, Card), router with all routes, placeholder screens. Verify build.
  - Evidence: `npm install` → 67 packages; `npm run build` → OK (1581 modules, dist built).
- [x] T2 — Screens 02 Login y registro + 04 Mapa ciudadano + 07 Aprender (read nodes via figma-free).
  - Evidence: `npm run build` → OK (1585 modules, 2.72s). New components: StatusBar, MapMarker, BrandIcons; TopBar extended with align/className.

## Acceptance criteria
- `npm install` and `npm run build` succeed.
- All listed routes render without runtime errors.
- Visual structure matches the Figma frames (layout, hierarchy, colors, typography).
- Bottom nav present on hub screens and navigates between them.

## Checks
- `npm run build` (Vite production build)
- Manual route smoke test (each route renders)

## Progress / evidence
- T1 + T2 done. `npm run build` passes (1585 modules, 2.72s). Dev server: `npm run dev` → http://localhost:5173.
- Open: subtítulo color choice (#BDDBD0 vs literal #005747) pending user validation.
- Note: image/map assets use pure CSS gradients (Figma assets quota-locked).

## Next step
- T1 scaffold.
