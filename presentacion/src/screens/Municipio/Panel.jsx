import { Link } from 'react-router-dom'
import { ClipboardList, Clipboard, ClipboardCheck, TriangleAlert } from 'lucide-react'
import MuniScreen, { Icon, ReportRow } from './MuniScreen.jsx'
import { useMunicipio } from './MunicipioContext.jsx'

// Figma, Page 3: "17 · Dashboard municipal". Los indicadores se calculan de los reportes.
export default function Panel() {
  const { reportes } = useMunicipio()
  const count = fn => reportes.filter(fn).length
  const kpis = [
    { label: 'Total reportes', value: reportes.length, icon: ClipboardList, tone: 'blue', color: '#4daecd', to: '/municipio/reportes' },
    { label: 'Pendientes', value: count(r => r.estado === 'pendiente'), icon: Clipboard, tone: 'red', color: '#e56d6c', to: '/municipio/reportes?estado=pendiente' },
    { label: 'Resueltos', value: count(r => r.estado === 'resuelto'), icon: ClipboardCheck, tone: 'green', color: '#138548', to: '/municipio/reportes?estado=resuelto' },
    { label: 'Alta prioridad', value: count(r => r.prioridad === 'alta' && r.estado !== 'resuelto'), icon: TriangleAlert, tone: 'red', color: '#e56d6c', to: '/municipio/reportes?prioridad=alta' },
  ]
  return <MuniScreen title="Panel municipal">
    <div className="muni-kpis">{kpis.map(k => <Link key={k.label} to={k.to} className={`muni-kpi muni-kpi--${k.tone}`}><Icon as={k.icon} color={k.color} size={30} /><span><span>{k.label}</span><strong style={{ color: k.color }}>{k.value}</strong></span></Link>)}</div>
    <h2 className="muni__subtitle">Últimos reportes</h2>
    <div className="muni-list">{reportes.slice(0, 3).map(r => <ReportRow key={r.numero} r={r} />)}</div>
  </MuniScreen>
}
