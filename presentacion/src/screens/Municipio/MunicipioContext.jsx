import { createContext, useContext, useState, useSyncExternalStore } from 'react'
import { Outlet } from 'react-router-dom'
import { REPORTES, PUNTOS_VERDES, AREAS } from './data.js'
import '../../styles/Municipio.css'
import MunicipioDesktop from './MunicipioDesktop.jsx'
import '../../styles/MunicipioDesktop.css'

const Ctx = createContext(null)

const ahora = () => `Hoy ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}`

const CONSULTA_ESCRITORIO = '(min-width: 768px)'
const suscribirAlAncho = onCambio => { const mq = window.matchMedia(CONSULTA_ESCRITORIO); mq.addEventListener('change', onCambio); return () => mq.removeEventListener('change', onCambio) }
const esEscritorio = () => window.matchMedia(CONSULTA_ESCRITORIO).matches

/** Estado compartido por todas las pantallas del municipio (en memoria: se pierde al recargar). */
export function MunicipioRoot() {
  // La vista sale del ancho real de la ventana y reacciona al redimensionar: no hay botones
  // de Escritorio/Celular ni preferencia guardada que pise la detección automática.
  const vista = useSyncExternalStore(suscribirAlAncho, esEscritorio) ? 'desktop' : 'celular'
  const [reportes, setReportes] = useState(REPORTES)
  const [puntos, setPuntos] = useState(PUNTOS_VERDES)
  const [perfilMunicipal, guardarPerfil] = useState({ nombre: 'Laura Gómez', municipio: 'Colonia Carlos Pellegrini' })
  const update = (n, change) => setReportes(list => list.map(r => r.numero === n ? { ...r, ...change(r) } : r))
  const value = {
    vista,
    perfilMunicipal,
    guardarPerfil,
    reportes,
    puntos,
    reporte: n => reportes.find(r => r.numero === Number(n)),
    asignar: n => update(n, r => r.estado === 'pendiente' ? { estado: 'en_curso', area: r.area || AREAS[0], pasos: { Asignado: ahora() } } : {}),
    cambiarArea: (n, area) => update(n, () => ({ area })),
    marcarPaso: (n, paso) => update(n, r => ({ pasos: { ...r.pasos, [paso]: r.pasos?.[paso] || ahora() } })),
    resolver: n => update(n, () => ({ estado: 'resuelto', resuelto: ahora() })),
    guardarPunto: punto => setPuntos(list => list.some(p => p.id === punto.id) ? list.map(p => p.id === punto.id ? punto : p) : [...list, punto]),
  }
  return <Ctx.Provider value={value}><div className={`municipio-preview municipio-preview--${vista}`}>{vista === 'desktop' ? <MunicipioDesktop /> : <Outlet />}</div></Ctx.Provider>
}

export const useMunicipio = () => useContext(Ctx)
