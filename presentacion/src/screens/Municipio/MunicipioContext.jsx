import { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { REPORTES, PUNTOS_VERDES, AREAS } from './data.js'
import '../../styles/Municipio.css'

const Ctx = createContext(null)

const ahora = () => `Hoy ${new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit', hour12: false })}`

/** Estado compartido por todas las pantallas del municipio (en memoria: se pierde al recargar). */
export function MunicipioRoot() {
  const [reportes, setReportes] = useState(REPORTES)
  const [puntos, setPuntos] = useState(PUNTOS_VERDES)
  const update = (n, change) => setReportes(list => list.map(r => r.numero === n ? { ...r, ...change(r) } : r))
  const value = {
    reportes,
    puntos,
    reporte: n => reportes.find(r => r.numero === Number(n)),
    asignar: n => update(n, r => r.estado === 'pendiente' ? { estado: 'en_curso', area: r.area || AREAS[0], pasos: { Asignado: ahora() } } : {}),
    cambiarArea: (n, area) => update(n, () => ({ area })),
    marcarPaso: (n, paso) => update(n, r => ({ pasos: { ...r.pasos, [paso]: r.pasos?.[paso] || ahora() } })),
    resolver: n => update(n, () => ({ estado: 'resuelto', resuelto: ahora() })),
    guardarPunto: punto => setPuntos(list => list.some(p => p.id === punto.id) ? list.map(p => p.id === punto.id ? punto : p) : [...list, punto]),
  }
  return <Ctx.Provider value={value}><Outlet /></Ctx.Provider>
}

export const useMunicipio = () => useContext(Ctx)
