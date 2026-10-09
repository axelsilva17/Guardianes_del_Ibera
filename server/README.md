# Guardianes server

Logic and data layers for the Guardianes del Ibera prototype. It exposes a small in-memory REST API over mock environmental `reportes`.

## Quick path

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server (port 3000, or `PORT` if set):

   ```bash
   npm start
   ```

   For auto-restart on file changes:

   ```bash
   npm run dev
   ```

3. Verify it is up:

   ```bash
   curl http://localhost:3000/api/health
   ```

   Expected: `{"status":"ok"}`

## Endpoints

| Method | Path                 | Description                        | Status codes        |
| ------ | -------------------- | ---------------------------------- | ------------------- |
| GET    | `/api/health`        | Readiness check                    | 200                 |
| GET    | `/api/reportes`      | List every report                  | 200                 |
| GET    | `/api/reportes/:id`  | Get one report by id               | 200, 404            |
| POST   | `/api/reportes`      | Create a report from a JSON body   | 201, 400            |

### POST body

```json
{
  "titulo": "Foco de incendio cerca del portal",
  "tipo": "fuego",
  "descripcion": "Humo visible sobre el pastizal.",
  "lat": -28.55,
  "lng": -57.18,
  "autor": "Camila Rios"
}
```

- `titulo` — required, non-empty string.
- `tipo` — required, one of `fuego | basura | caza_furtiva | tala | otro`.
- `lat` / `lng` — required, valid coordinates.
- `descripcion`, `autor` — optional.

Invalid input returns `400` with `{ "error": "..." }`. The server sets `id`, `estado` (`pendiente`) and `fecha` automatically.

## Layout

```text
server/
  src/
    index.js                 # HTTP transport: routes -> logic
    logic/
      reportesService.js     # business rules + validation
    data/
      reportesRepository.js  # in-memory collection access
      seed.js                # mock dataset
```

Data is in memory only: it resets every time the server restarts.
