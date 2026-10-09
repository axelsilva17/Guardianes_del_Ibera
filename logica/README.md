# Guardianes — capa Logica

Capa de logica del prototipo Guardianes del Ibera. Expone una API REST en memoria sobre reportes ambientales de ejemplo y concentra las reglas de negocio y la validacion. La persistencia queda delegada por completo a la capa de datos (`datos/`).

## Ruta rapida

1. Instalar dependencias (la capa de datos tambien debe estar presente, porque la logica importa su repositorio):

   ```bash
   npm install
   ```

   Desde la raiz del repositorio, `npm run install:all` instala de una vez `presentacion/`, `logica/` y `datos/`.

2. Iniciar la API (puerto 3000, o `PORT` si esta definido):

   ```bash
   npm start
   ```

   Para reiniciar automaticamente al detectar cambios en archivos:

   ```bash
   npm run dev
   ```

3. Verificar que esta levantada:

   ```bash
   curl http://localhost:3000/api/health
   ```

   Resultado esperado: `{"status":"ok"}`

## Endpoints

| Metodo | Ruta                 | Descripcion                         | Codigos de estado   |
| ------ | -------------------- | ----------------------------------- | ------------------- |
| GET    | `/api/health`        | Chequeo de disponibilidad           | 200                 |
| GET    | `/api/reportes`      | Lista todos los reportes            | 200                 |
| GET    | `/api/reportes/:id`  | Obtiene un reporte por id           | 200, 404            |
| POST   | `/api/reportes`      | Crea un reporte desde un body JSON  | 201, 400            |

### Body del POST

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

- `titulo` — requerido, cadena no vacia.
- `tipo` — requerido, uno de `fuego | basura | caza_furtiva | tala | otro`.
- `lat` / `lng` — requeridos, coordenadas validas.
- `descripcion`, `autor` — opcionales.

Una entrada invalida devuelve `400` con `{ "error": "..." }`. La logica asigna `id`, `estado` (`pendiente`) y `fecha` de forma automatica.

## Estructura

```text
logica/
  src/
    index.js               # transporte HTTP: rutas -> logica
    reportesService.js     # reglas de negocio + validacion
datos/
  reportesRepository.js     # acceso a la coleccion en memoria
  seed.js                   # dataset de ejemplo
```

La logica nunca toca la coleccion cruda: todo pasa por `datos/reportesRepository.js`. Los datos viven solo en memoria y se reinician cada vez que la API se reinicia.
