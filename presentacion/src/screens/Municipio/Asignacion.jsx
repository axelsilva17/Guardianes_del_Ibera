import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { Truck, ChevronRight, MapPin, SquareCheck, Square } from 'lucide-react'
import MuniScreen, { Chip, Icon } from './MuniScreen.jsx'
import { useMunicipio } from './MunicipioContext.jsx'
import { AREAS, ESTADOS, PASOS, PRIORIDADES, TIPOS, numero } from './data.js'

// Figma, Page 3: "20 · Asignación y derivación". Tocar un paso lo marca como hecho con la hora actual.
export default function Asignacion() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { reporte, cambiarArea, marcarPaso, resolver } = useMunicipio()
  const [eligiendo, setEligiendo] = useState(false)
  const r = reporte(id)
  if (!r) return <Navigate to="/municipio/reportes" replace />
  if (r.estado === 'pendiente') return <Navigate to={`/municipio/reportes/${r.numero}`} replace />
  const estado = ESTADOS[r.estado]
  const resuelto = r.estado === 'resuelto'
  function finalizar() { resolver(r.numero); navigate(`/municipio/reportes/${r.numero}/resuelto`, { replace: true }) }
  return <MuniScreen title="Asignación" back={`/municipio/reportes/${r.numero}`} nav={false}>
    <h2 className="muni__section">Área responsable</h2>
    <button type="button" className="muni-area" aria-expanded={eligiendo} onClick={() => setEligiendo(!eligiendo)} disabled={resuelto}><Icon as={Truck} color="#4daecd" /><strong>{r.area}</strong><Icon as={ChevronRight} color="#294e49" size={22} /></button>
    {eligiendo && <div className="muni-area__options" role="group" aria-label="Elegir área">{AREAS.map(a => <button key={a} type="button" aria-pressed={a === r.area} onClick={() => { cambiarArea(r.numero, a); setEligiendo(false) }}>{a}</button>)}</div>}
    <h2 className="muni__section">Estado de intervención</h2>
    <div className="muni-row"><Icon as={MapPin} color="#4daecd" /><span className="muni-row__info"><strong>Reporte {numero(r.numero)}</strong><span>{TIPOS[r.tipo].label} · Prioridad {PRIORIDADES[r.prioridad].label.toLowerCase()}</span></span><Chip tone={estado.tone}>{estado.label}</Chip></div>
    {PASOS.map(paso => {
      const hecho = r.pasos?.[paso]
      return <button key={paso} type="button" className="muni-row muni-paso" aria-pressed={!!hecho} disabled={!!hecho || resuelto} onClick={() => marcarPaso(r.numero, paso)}><Icon as={hecho ? SquareCheck : Square} color="#138548" /><span className="muni-row__info"><strong>{paso}</strong></span><Chip tone="plain">{hecho || 'Pendiente'}</Chip></button>
    })}
    <div className="muni__spacer" />
    {!resuelto && <button type="button" className="muni-btn" onClick={finalizar}>Marcar como resuelto</button>}
  </MuniScreen>
}
