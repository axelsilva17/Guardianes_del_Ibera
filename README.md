# Guardianes del Ibera

A student-built prototype for reporting environmental incidents in the Ibera wetlands. It is a mobile first (390x844) interface reverse engineered from a Figma prototype, organized as a **client-server architecture with explicit, separated layers**.

## Quick path

From a fresh clone, in two terminals:

```bash
# Terminal 1 — backend (API)
cd server
npm install
npm start          # http://localhost:3000

# Terminal 2 — frontend (screens)
cd client
npm install
npm run dev        # http://localhost:5173
```

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

## How to add a new screen

1. **Create the screen file** in `client/src/screens/`, e.g. `client/src/screens/MiPantalla.jsx`. Reuse the shared shell (`PhoneFrame`, `TopBar`, `BottomNav`) so it matches the other screens.
2. **Register the route** in `client/src/App.jsx` with a `<Route path="/mi-pantalla" element={<MiPantalla />} />`.
3. **Add navigation** from an existing screen (`BottomNav`, `TopBar`, or a button) if the screen is reachable in the flow.
4. **Add styles** in `client/src/styles/` using the existing design tokens in `client/src/styles/tokens.css` instead of hard-coded colors.
5. **If the screen needs data**, call a server endpoint; do not read the dataset from the client. If the endpoint does not exist yet, add the business rule in `server/src/logic/` and the collection access in `server/src/data/` first.
6. **Verify** with `npm run build` in `client/`.

## Documentation

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — layer model, responsibilities, and the data-flow rule.
- [`server/README.md`](server/README.md) — how to run the API and the endpoint list.
