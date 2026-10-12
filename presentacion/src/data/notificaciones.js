// Notificaciones de ejemplo del prototipo y cuáles ya leyó el usuario.
// Lo leído se guarda en el navegador (localStorage) para que la campana y la bandeja coincidan.
import { useSyncExternalStore } from 'react'

export const NOTIFICACIONES = [
  { id: 'rep-042-curso', tipo: 'reporte', titulo: 'Tu reporte #042 está en curso', texto: 'Servicios Públicos va a revisar el microbasural de calle San Martín.', cuando: 'Hoy · 10:40', hoy: true, to: '/mis-reportes' },
  { id: 'puntos-20', tipo: 'puntos', titulo: '¡Sumaste 20 puntos!', texto: 'Por reportar residuos. Ya tenés 650 puntos y sos Guardián Activo.', cuando: 'Hoy · 09:15', hoy: true, to: '/nivel' },
  { id: 'recoleccion-manana', tipo: 'recoleccion', titulo: 'Mañana pasa el recolector de residuos', texto: 'Sacá la basura de tu casa antes de las 20 h.', cuando: 'Hoy · 08:00', hoy: true, to: '/recoleccion' },
  { id: 'recompensa-visita', tipo: 'recompensa', titulo: 'Nueva recompensa disponible', texto: 'Visita guiada por los esteros: canjeala por 300 puntos.', cuando: 'Ayer · 18:30', to: '/recompensas' },
  { id: 'desafio-guardian', tipo: 'desafio', titulo: 'Nuevo desafío: Desafío Guardián', texto: 'Poné a prueba lo que sabés sobre cuidar el Iberá y ganá puntos.', cuando: 'Ayer · 12:00', to: '/aprender/ibera/juego', leidaInicial: true },
  { id: 'rep-038-resuelto', tipo: 'resuelto', titulo: 'Tu reporte #038 fue resuelto', texto: '¡Gracias por cuidar el Iberá! Higiene Urbana retiró la basura de la costa del humedal.', cuando: 'Hace 3 días', to: '/mis-reportes', leidaInicial: true },
]

const KEY = 'guardianes-notificaciones-leidas'
const listeners = new Set()

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    if (Array.isArray(saved)) return saved
  } catch { /* sin almacenamiento disponible: se usa el estado inicial */ }
  return NOTIFICACIONES.filter(n => n.leidaInicial).map(n => n.id)
}

let leidas = load()

function save(next) {
  leidas = next
  try { localStorage.setItem(KEY, JSON.stringify(next)) } catch { /* se mantiene solo en memoria */ }
  listeners.forEach(l => l())
}

const subscribe = l => { listeners.add(l); return () => listeners.delete(l) }
const snapshot = () => leidas

/** Lista de notificaciones con `leida`, cantidad sin leer y acciones para marcarlas. */
export function useNotificaciones() {
  const ids = useSyncExternalStore(subscribe, snapshot)
  const lista = NOTIFICACIONES.map(n => ({ ...n, leida: ids.includes(n.id) }))
  return {
    lista,
    sinLeer: lista.filter(n => !n.leida).length,
    marcarLeida: id => { if (!ids.includes(id)) save([...ids, id]) },
    marcarTodas: () => save(NOTIFICACIONES.map(n => n.id)),
  }
}
