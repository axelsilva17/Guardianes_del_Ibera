# Arquitectura

Guardianes del Ibera separa la **presentacion** (lo que el usuario ve), la **logica** (lo que la aplicacion sabe) y los **datos** (lo que la aplicacion guarda) en tres carpetas de nivel superior. Cada capa puede cambiar por su cuenta sin arrastrar a las demas.

## Ruta rapida

1. Ubicar el cambio en la tabla de capas.
2. Editar solo la capa responsable del concepto.
3. Respetar el flujo: **presentacion -> logica -> datos**.

## La separacion

```text
+-----------------------------+        HTTP        +-----------------------------+
|       presentacion/         |  <-------------->  |          logica/            |
|    capa PRESENTACION        |   fetch / JSON     |       capa LOGICA           |
|                             |                    |                             |
|  screens/  components/      |                    |  src/index.js               |
|  styles/   App.jsx          |                    |    |                        |
+-----------------------------+                    |    v                        |
                                                   |  src/reportesService.js     |
                                                   |    |                        |
                                                   |    v                        |
                                                   +--------------+--------------+
                                                                  |
                                                                  v
                                                   +-----------------------------+
                                                   |           datos/            |
                                                   |        capa DATOS           |
                                                   |                             |
                                                   |  reportesRepository.js      |
                                                   |  seed.js                    |
                                                   +-----------------------------+
```

## Capas y responsabilidades

| Capa         | Ubicacion      | Responsabilidad                                          | No debe                              |
| ------------ | -------------- | -------------------------------------------------------- | ------------------------------------ |
| Presentacion | `presentacion/`| Renderizar pantallas, capturar la entrada, mostrar estado y llamar a la API. | Leer o modificar el dataset directamente. |
| Logica       | `logica/`      | Reglas de negocio, validacion, orquestacion, errores tipados y transporte HTTP. | Tocar la coleccion cruda directamente. |
| Datos        | `datos/`       | Ser duena del almacen; leer y escribir los registros.    | Contener reglas de negocio.          |

### Presentacion — `presentacion/`

React + Vite. `App.jsx` define las rutas, `screens/` guarda un archivo por pantalla, `components/` reune los componentes de UI compartidos y `styles/` contiene los design tokens. Las pantallas pueden llamar a la API por HTTP, pero nunca importan archivos de la logica ni de los datos, y nunca guardan el dataset canonico.

### Logica — `logica/`

`src/reportesService.js` es el unico lugar donde viven las reglas: valida la entrada (`titulo`, `tipo`, rangos de coordenadas), asigna los valores por defecto (`estado`, `fecha`, `id`) y lanza errores tipados (`ValidationError`, `NotFoundError`). Lee y escribe a traves del repositorio, nunca de la coleccion cruda.

### Datos — `datos/`

`reportesRepository.js` es el **unico** modulo que toca la coleccion subyacente. Expone `list()`, `findById(id)` y `create(data)`, y devuelve copias para que quien lo llama no pueda modificar los registros guardados. `seed.js` aporta el dataset de ejemplo inicial. Cambiar el arreglo en memoria por una base de datos real implica modificar solo esta capa.

### Transporte — `logica/src/index.js`

El entrypoint conecta Express con la capa de logica. Las rutas son delgadas: llaman a una funcion del servicio y dejan que el middleware de errores tipados traduzca `ValidationError` a `400` y `NotFoundError` a `404`. Agregar un endpoint significa sumar una ruta aqui y una funcion de servicio en la logica, no meter reglas dentro de la ruta.

## La regla

> Una pantalla nunca lee los datos directo: el flujo es **presentacion -> logica -> datos**.

En concreto:

- Un archivo de **presentacion** (`presentacion/`) llama a un endpoint HTTP.
- Un archivo de **logica** (`logica/`) aplica reglas y llama al repositorio.
- Un archivo de **datos** (`datos/`) lee o escribe el almacen.

Si un cambio cruza capas, recorrer el flujo en orden y detenerse en la capa duena del concepto.
