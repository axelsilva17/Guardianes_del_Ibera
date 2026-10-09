# Architecture

Guardianes del Ibera is split into a **client** (what the user sees) and a **server** (what the app knows and stores). Inside the server, logic and data are separated so each concern can change on its own.

## Quick path

1. Find the change you need in the table below.
2. Edit only the layer that owns it.
3. Respect the flow: **presentation -> logic -> data**.

## The split

```text
+-----------------------------+        HTTP        +-----------------------------+
|            client/          |  <-------------->  |            server/          |
|      PRESENTATION layer     |   fetch / JSON     |      LOGIC + DATA layers    |
|                             |                    |                             |
|  screens/  components/      |                    |  src/index.js               |
|  styles/   App.jsx          |                    |    |                        |
+-----------------------------+                    |    v                        |
                                                   |  src/logic/    (rules)      |
                                                   |    |                        |
                                                   |    v                        |
                                                   |  src/data/     (store)      |
                                                   +-----------------------------+
```

## Layer mapping and responsibilities

| Layer        | Location            | Responsibility                                          | Must not                          |
| ------------ | ------------------- | ------------------------------------------------------- | --------------------------------- |
| Presentation | `client/`           | Render screens, capture input, show state, call the API. | Read or mutate the dataset directly. |
| Logic        | `server/src/logic/` | Business rules, validation, orchestration, error typing. | Touch the raw collection directly.  |
| Data         | `server/src/data/`  | Own the store; read/write records.                       | Contain business rules.             |

### Presentation — `client/`

React + Vite. `App.jsx` defines the routes, `screens/` holds one file per screen, `components/` holds shared UI, and `styles/` holds the design tokens. Screens may call the server over HTTP, but they never import server files and never hold the canonical dataset.

### Logic — `server/src/logic/`

`reportesService.js` is the only place where rules live: it validates input (`titulo`, `tipo`, coordinate ranges), assigns defaults (`estado`, `fecha`, `id`), and throws typed errors (`ValidationError`, `NotFoundError`). It reads and writes through the repository — never the raw array.

### Data — `server/src/data/`

`reportesRepository.js` is the **only** module that touches the underlying collection. It exposes `list()`, `findById(id)`, and `create(data)`, returning copies so callers cannot mutate stored records. `seed.js` provides the initial mock dataset. Swapping the in-memory array for a real database means changing this layer only.

### Transport — `server/src/index.js`

The entrypoint wires Express to the logic layer. Routes are thin: they call a service function and let the typed-error middleware map `ValidationError` to `400` and `NotFoundError` to `404`. Adding a new endpoint means adding a route here and a service function in logic — not putting rules in the route.

## The rule

> A screen never talks to data directly. The flow is **presentation -> logic -> data**.

Concretely:

- A **presentation** file (`client/`) calls an HTTP endpoint.
- A **logic** file (`server/src/logic/`) applies rules and calls the repository.
- A **data** file (`server/src/data/`) reads or writes the store.

If a change crosses layers, walk the flow in order and stop at the layer that owns the concern.
