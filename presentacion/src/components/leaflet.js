// Leaflet como global: la extensión leaflet.markercluster (formato viejo, UMD) busca `window.L`.
// Este módulo se importa antes que la extensión, así ya está definido cuando ella se carga.
import L from 'leaflet'
window.L = L
export default L
