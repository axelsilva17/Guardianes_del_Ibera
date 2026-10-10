import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { MapPin, ClipboardList, TriangleAlert, CircleAlert } from 'lucide-react'
import MuniScreen, { Chip, Icon } from './MuniScreen.jsx'
import { useMunicipio } from './MunicipioContext.jsx'
import { ESTADOS, PRIORIDADES, TIPOS, numero } from './data.js'
import foto from '../../assets/municipio/reporte-foto.jpg'

// Figma, Page 3: "19 · Detalle de reporte". La foto es de ejemplo para todos los reportes.
export default function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { reporte, asignar } = useMunicipio()
  const r = reporte(id)
  if (!r) return <Navigate to="/municipio/reportes" replace />
  const estado = ESTADOS[r.estado]
  const prioridad = PRIORIDADES[r.prioridad]
  function accion() { asignar(r.numero); navigate(`/municipio/reportes/${r.numero}/asignacion`) }
  return <MuniScreen title={`Reporte ${numero(r.numero)}`} back="/municipio/reportes" nav={false}>
    <img className="muni-detalle__foto" src={foto} alt={`Foto del reporte: ${r.titulo}`} />
    <div className="muni-row"><Icon as={MapPin} color="#4daecd" /><span className="muni-row__info"><strong>Ubicación</strong><span>{r.ubicacion}</span></span></div>
    <div className="muni-row"><Icon as={ClipboardList} color="#4daecd" /><span className="muni-row__info"><strong>Tipo de residuo</strong><span>{TIPOS[r.tipo].label}</span></span></div>
    <div className="muni-row"><Icon as={TriangleAlert} color="#e3a436" /><span className="muni-row__info"><strong>Prioridad</strong></span><Chip tone={prioridad.tone}>{prioridad.label}</Chip></div>
    <div className="muni-row"><Icon as={CircleAlert} color="#e56d6c" /><span className="muni-row__info"><strong>Estado</strong></span><Chip tone={estado.tone}>{estado.label}</Chip></div>
    <div className="muni__spacer" />
    {r.estado === 'resuelto'
      ? <p className="muni__done">Resuelto · {r.resuelto}{r.area ? ` · ${r.area}` : ''}</p>
      : <button type="button" className="muni-btn" onClick={accion}>{r.estado === 'pendiente' ? 'Asignar' : 'Ver asignación'}</button>}
  </MuniScreen>
}
