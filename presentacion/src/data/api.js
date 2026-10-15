// Dirección de la API de reportes (repo guardianes-api), publicada en el servidor de DonWeb
// con Easypanel; la base de datos está en Neon. Respaldo: https://guardianes-api-13cb.onrender.com
// En la compu (npm run dev) queda vacía: Vite manda /api al servidor local (vite.config.js).
// VITE_API_URL, si está definida, tiene prioridad.
export const API_URL = (import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://guardianes-api.ulu1lp.easypanel.host' : '')).replace(/\/$/, '')
