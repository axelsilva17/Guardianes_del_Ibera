# Guardianes del Ibera

Prototipo desarrollado por estudiantes para reportar incidentes ambientales en los Esteros del Ibera..

> **Nota sobre la arquitectura:** la separacion en capas con un cliente y un servidor es la arquitectura **elegida por el momento**. Es una decision de primera version para el prototipo y puede evolucionar a medida que el proyecto crezca.

## Stack y dependencias

JavaScript plano (JSX), sin TypeScript. Los estilos son CSS plano manejado por los design tokens de `presentacion/src/styles/tokens.css`.

### Presentacion — `presentacion/`

| Dependencia             | Version  | Tipo | Por que esta                                         |
| ----------------------- | -------- | ---- | ---------------------------------------------------- |
| `react`                 | ^18.3.1  | prod | Runtime de UI para las pantallas.                    |
| `react-dom`             | ^18.3.1  | prod | Renderiza React en el navegador.                     |
| `react-router-dom`      | ^6.26.2  | prod | Ruteo del lado del cliente; una ruta por pantalla.   |
| `lucide-react`          | ^0.441.0 | prod | Set de iconos usado en las pantallas.                |
| `vite`                  | ^5.4.8   | dev  | Servidor de desarrollo (puerto 5173) y build.        |
| `@vitejs/plugin-react`  | ^4.3.1   | dev  | Transform de JSX y fast refresh de React para Vite.  |

### Logica — `logica/`

| Dependencia | Version | Tipo | Por que esta                                        |
| ----------- | ------- | ---- | --------------------------------------------------- |
| `express`   | ^4.21.2 | prod | Transporte HTTP de la API.                          |
| `cors`      | ^2.8.5  | prod | Permite que el servidor de Vite llame a la API cross-origin. |

### Requisitos — lo unico que se instala de forma global

Las librerias de la aplicacion (React, Vite, Express...) **no** se instalan de forma global. Estan declaradas en cada `package.json` y se descargan dentro de la carpeta `node_modules/` de cada paquete con el comando de instalacion de mas abajo. Por lo tanto, lo unico que necesita una persona en su maquina es **Node.js 18+ (LTS)**; npm viene incluido.

Verificar que ya esta instalado:

```bash
node -v    # debe imprimir v18.x o superior
npm -v
```

Si `node -v` falla, o imprime v16 o anterior, instalar Node 18+ LTS **antes** de continuar:

| Sistema operativo | Como instalar                                                          |
| ----------------- | ---------------------------------------------------------------------- |
| Windows           | `winget install OpenJS.NodeJS.LTS`                                      |
| Windows (nvm)     | `winget install CoreyButler.NVMforWindows`, luego `nvm install lts`     |
| macOS             | `brew install node@20` — o el instalador LTS de <https://nodejs.org>    |
| Linux             | el paquete de tu distribucion, o nvm                                    |

Luego **cerrar y volver a abrir la terminal** (para que `node` y `npm` queden en el PATH) y verificar `node -v` de nuevo.

- Sin base de datos: el backend mantiene un dataset en memoria sembrado desde `datos/seed.js`.
- Las versiones de las dependencias quedan fijadas en el `package-lock.json` de cada paquete, de modo que todos resuelven las mismas versiones.

## Instalacion y ejecucion

### Camino rapido (desde la raiz del repositorio)

Ejecutar esto **una vez despues de clonar**: descarga todo el stack (React, React Router, lucide-react, Vite, Express, cors...) dentro de `presentacion/node_modules/` y `logica/node_modules/`:

```bash
npm run install:all
```

Luego arrancar cada lado, en dos terminales:

```bash
npm run dev           # Terminal 1 -> frontend en http://localhost:5173
npm run dev:logica    # Terminal 2 -> backend  en http://localhost:3000
```

El `package.json` de la raiz es solo un lanzador: cada script delega con `npm --prefix <dir> run <script>`. **No se usan npm workspaces a proposito**, para que cada paquete conserve su propio `node_modules/` y las dos aplicaciones se puedan ejecutar de forma independiente.

### Equivalente, por paquete

```bash
# Terminal 1 — backend (API)
cd logica
npm install
npm start          # o: npm run dev  (reinicia al detectar cambios)

# Terminal 2 — frontend (pantallas)
cd presentacion
npm install
npm run dev
```

### Otros scripts de la raiz

| Script                     | Que hace                                             |
| -------------------------- | ---------------------------------------------------- |
| `npm run dev`              | Servidor de desarrollo del frontend (Vite, puerto 5173). |
| `npm run dev:presentacion` | Igual que `npm run dev`.                             |
| `npm run dev:logica`       | Backend con `node --watch` (puerto 3000).            |
| `npm run build`            | Build de produccion del frontend en `presentacion/dist`. |
| `npm run preview`          | Sirve localmente el frontend compilado.              |
| `npm run start`            | Ejecuta el backend sin modo watch.                   |
| `npm run install:all`      | Instala los tres paquetes (presentacion, logica, datos). |

## Estructura

```text
.
  presentacion/                  # capa PRESENTACION (React + Vite)
    src/
      screens/                   # un archivo por pantalla
      components/                # piezas de UI compartidas
      styles/                    # design tokens + CSS
      App.jsx                    # rutas
  logica/                        # capa LOGICA (transporte + reglas de negocio)
    src/
      index.js                   # entrypoint HTTP (rutas -> logica)
      reportesService.js         # reglas de negocio y validacion
  datos/                         # capa DATOS
    reportesRepository.js        # acceso a la coleccion en memoria
    seed.js                      # dataset de ejemplo
  docs/
    ARCHITECTURE.md              # como encajan las capas
```

## Las capas de un vistazo

| Capa         | Vive en         | Responsabilidad                                 |
| ------------ | --------------- | ----------------------------------------------- |
| Presentacion | `presentacion/` | Renderizar pantallas, manejar la interaccion.   |
| Logica       | `logica/`       | Reglas de negocio, validacion, orquestacion.    |
| Datos        | `datos/`        | Leer y escribir el almacen de datos subyacente. |

**Regla general:** una pantalla nunca lee los datos directo. El flujo es **presentacion -> logica -> datos**.

Ver [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) para la explicacion completa.

## Endpoints de la API

| Metodo | Ruta                 | Proposito                   |
| ------ | -------------------- | --------------------------- |
| GET    | `/api/health`        | Chequeo de liveness.        |
| GET    | `/api/reportes`      | Lista todos los reportes.   |
| GET    | `/api/reportes/:id`  | Obtiene un reporte.         |
| POST   | `/api/reportes`      | Crea un reporte.            |

El backend escucha en `process.env.PORT` (por defecto `3000`). En desarrollo el frontend corre en `5173` y alcanza la API en `3000`.


## Documentacion

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — modelo de capas, responsabilidades y la regla de flujo de datos.
- [`logica/README.md`](logica/README.md) — como ejecutar la API y la lista de endpoints.
