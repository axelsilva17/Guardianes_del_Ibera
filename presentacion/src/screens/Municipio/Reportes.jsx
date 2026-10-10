import { useSearchParams } from 'react-router-dom'
import MuniScreen, { ReportRow } from './MuniScreen.jsx'
import Filtros from './Filtros.jsx'
import { useMunicipio } from './MunicipioContext.jsx'

// No está en el Figma: lista completa con los mismos filtros del Mapa y las filas de "Últimos reportes".
export default function Reportes() {
  const { reportes } = useMunicipio()
  const [params, setParams] = useSearchParams()
  const estado = params.get('estado') || 'todos'
  const alta = params.get('prioridad') === 'alta'
  const shown = reportes.filter(r => (estado === 'todos' || r.estado === estado) && (!alta || (r.prioridad === 'alta' && r.estado !== 'resuelto')))
  return <MuniScreen title={alta ? 'Alta prioridad' : 'Reportes'} back section>
    <Filtros value={alta ? null : estado} onChange={id => setParams(id === 'todos' ? {} : { estado: id }, { replace: true })} />
    <div className="muni-list">{shown.length ? shown.map(r => <ReportRow key={r.numero} r={r} />) : <p className="muni__empty">No hay reportes con este filtro.</p>}</div>
  </MuniScreen>
}
