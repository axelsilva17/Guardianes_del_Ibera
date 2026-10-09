# Guardianes del Ibera

A student-built prototype for reporting environmental incidents in the Ibera wetlands. It is a mobile-first interface (390x844) reverse-engineered from a Figma prototype, organized as a **client-server architecture with explicit, separated layers**.

> **Note on the architecture:** the client/server split with separated layers is the architecture **chosen for now**. It is a first-cut decision for the prototype and may evolve as the project grows.

## Stack and dependencies

Plain JavaScript (JSX) — no TypeScript. Styles are plain CSS driven by the design tokens in `client/src/styles/tokens.css`.

### Frontend — `client/`

| Dependency          | Version  | Type | Why it is here                                    |
| ------------------- | -------- | ---- | ------------------------------------------------- |
| `react`             | ^18.3.1  | prod | UI runtime for the screens.                       |
| `react-dom`         | ^18.3.1  | prod | Renders React into the browser.                   |
| `react-router-dom`  | ^6.26.2  | prod | Client-side routing; one route per screen.        |
| `lucide-react`      | ^0.441.0 | prod | Icon set used across the screens.                 |
| `vite`              | ^5.4.8   | dev  | Dev server (port 5173) and production build.      |
| `@vitejs/plugin-react` | ^4.3.1 | dev | JSX transform and React fast refresh for Vite.    |

### Backend — `server/`

| Dependency | Version | Type | Why it is here                                       |
| ---------- | ------- | ---- | ---------------------------------------------------- |
| `express`  | ^4.21.2 | prod | HTTP transport for the API.                          |
| `cors`     | ^2.8.5  | prod | Lets the Vite dev server call the API cross-origin.  |

### Requirements

- **Node.js 18+ (LTS)** and npm — required by Vite 5 and Express 4.
- No database: the server keeps an in-memory dataset seeded from `server/src/data/seed.js`.

Dependencies are pinned in each package's `package-lock.json`, so `npm install` (or `npm ci`) resolves the same versions for everyone.

## Install and run

### Fast path (from the repo root)

```bash
npm run install:all   # installs client/ and server/ dependencies
npm run dev           # Terminal 1 -> frontend on http://localhost:5173
npm run dev:server    # Terminal 2 -> backend  on http://localhost:3000
```

The root `package.json` is only a launcher: every script delegates with `npm --prefix <dir> run <script>`. **npm workspaces are intentionally not used**, so each package keeps its own `node_modules/` and the two apps stay independently runnable.

### Equivalent, per package

```bash
# Terminal 1 — backend (API)
cd server
npm install
npm start          # or: npm run dev  (restarts on change)

# Terminal 2 — frontend (screens)
cd client
npm install
npm run dev
```

### Other root scripts

| Script                 | What it does                                  |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Frontend dev server (Vite, port 5173).        |
| `npm run dev:client`   | Same as `npm run dev`.                        |
| `npm run dev:server`   | Backend with `node --watch` (port 3000).      |
| `npm run build`        | Production build of the frontend into `client/dist`. |
| `npm run preview`      | Serves the built frontend locally.            |
| `npm run start`        | Runs the backend without watch mode.          |
| `npm run install:all`  | Installs both packages.                       |

## Structure

```text
.
  client/                        # PRESENTATION layer (React + Vite)
    src/
      screens/                   # one file per screen
      components/                # shared UI pieces
      styles/                    # design tokens + CSS
      App.jsx                    # routes
  server/                        # LOGIC + DATA layers (Express)
    src/
      index.js                   # HTTP entrypoint (routes -> logic)
      logic/                     # business rules and validation
      data/                      # in-memory store + seed dataset
  docs/
    ARCHITECTURE.md              # how the layers fit together
```

## Layers at a glance

| Layer        | Lives in            | Responsibility                                  |
| ------------ | ------------------- | ----------------------------------------------- |
| Presentation | `client/`           | Render screens, handle user interaction.        |
| Logic        | `server/src/logic/` | Business rules, validation, orchestration.      |
| Data         | `server/src/data/`  | Read/write the underlying data store.           |

**Rule of thumb:** a screen never talks to data directly. The flow is **presentation -> logic -> data**.

See [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) for the full explanation.

## API endpoints

| Method | Path                 | Purpose                     |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/health`        | Liveness check.             |
| GET    | `/api/reportes`      | List all reports.           |
| GET    | `/api/reportes/:id`  | Fetch one report.           |
| POST   | `/api/reportes`      | Create a report.            |

The server listens on `process.env.PORT` (default `3000`). In development the frontend runs on `5173` and reaches the API on `3000`.

## How to add a new screen

1. **Create the screen file** in `client/src/screens/`, e.g. `client/src/screens/MiPantalla.jsx`. Reuse the shared shell (`PhoneFrame`, `TopBar`, `BottomNav`) so it matches the other screens.
2. **Register the route** in `client/src/App.jsx` with a `<Route path="/mi-pantalla" element={<MiPantalla />} />`.
3. **Add navigation** from an existing screen (`BottomNav`, `TopBar`, or a button) if the screen is reachable in the flow.
4. **Add styles** in `client/src/styles/` using the existing design tokens in `client/src/styles/tokens.css` instead of hard-coded colors.
5. **If the screen needs data**, call a server endpoint; do not read the dataset from the client. If the endpoint does not exist yet, add the business rule in `server/src/logic/` and the collection access in `server/src/data/` first.
6. **Verify** with `npm run build` (root) or `npm run build` inside `client/`.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — layer model, responsibilities, and the data-flow rule.
- [`server/README.md`](server/README.md) — how to run the API and the endpoint list.
