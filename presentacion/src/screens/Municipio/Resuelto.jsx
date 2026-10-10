import { Link, Navigate, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import MuniScreen from './MuniScreen.jsx'
import { useMunicipio } from './MunicipioContext.jsx'
import { numero } from './data.js'

// Figma, Page 3: "21 · Reporte resuelto".
export default function Resuelto() {
  const { id } = useParams()
  const r = useMunicipio().reporte(id)
  if (!r) return <Navigate to="/municipio/reportes" replace />
  return <MuniScreen title="" back="/municipio/reportes" nav={false} className="muni-resuelto">
    <section className="muni-resuelto__result">
      <span className="muni-resuelto__check"><Check size={52} strokeWidth={1.8} color="#fff" aria-hidden="true" /></span>
      <h2>Reporte resuelto</h2>
      <p>El ciudadano recibirá una notificación sobre el estado de su reporte.</p>
    </section>
    <div className="muni-resuelto__card"><strong>{numero(r.numero)}</strong><span>{r.resuelto}</span></div>
    <div className="muni__spacer" />
    <Link className="muni-btn" to="/municipio/reportes">Ver reportes</Link>
    <Link className="muni-resuelto__home" to="/municipio/panel">Volver al inicio</Link>
  </MuniScreen>
}
