import { CalendarDays } from 'lucide-react'
import MuniScreen, { Icon } from './MuniScreen.jsx'
import { useMunicipio } from './MunicipioContext.jsx'
import { RESOLUCION_MENSUAL, TIPOS } from './data.js'

const dias = n => n.toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })

/** Torta de reportes por tipo: anillo SVG con 2px de separación entre sectores. */
function Torta({ partes }) {
  const R = 60, r = 36, C = 80
  let angle = -Math.PI / 2
  const arc = (a0, a1) => {
    const p = (rad, a) => `${C + rad * Math.cos(a)} ${C + rad * Math.sin(a)}`
    const large = a1 - a0 > Math.PI ? 1 : 0
    return `M ${p(R, a0)} A ${R} ${R} 0 ${large} 1 ${p(R, a1)} L ${p(r, a1)} A ${r} ${r} 0 ${large} 0 ${p(r, a0)} Z`
  }
  return <svg className="muni-torta" viewBox="0 0 160 160" width="160" height="160" role="img" aria-label="Reportes por tipo">
    {partes.filter(p => p.cantidad).map(p => {
      const a0 = angle, a1 = angle + p.fraccion * Math.PI * 2
      angle = a1
      return <path key={p.id} d={arc(a0, a1)} fill={p.color} stroke="var(--surface)" strokeWidth="2"><title>{`${p.label}: ${p.cantidad} (${p.pct}%)`}</title></path>
    })}
  </svg>
}

// Figma, Page 3: "22 · Estadísticas". La torta se calcula de los reportes; el tiempo de resolución es de ejemplo.
export default function Estadisticas() {
  const { reportes } = useMunicipio()
  const total = reportes.length
  const partes = Object.entries(TIPOS).map(([id, t]) => {
    const cantidad = reportes.filter(r => r.tipo === id).length
    return { id, ...t, cantidad, fraccion: cantidad / total, pct: Math.round((cantidad / total) * 100) }
  })
  const max = Math.max(...RESOLUCION_MENSUAL.map(m => m.dias))
  const actual = RESOLUCION_MENSUAL.at(-1)
  return <MuniScreen title="Estadísticas" back className="muni-stats">
    <div className="muni-field" aria-label="Período: este mes"><Icon as={CalendarDays} color="#75908f" size={18} /><span>Este mes</span></div>
    <h2 className="muni__subtitle">Reportes por tipo</h2>
    <div className="muni-stats__dist">
      <Torta partes={partes} />
      <ul className="muni-stats__legend">{partes.map(p => <li key={p.id}><i style={{ background: p.color }} aria-hidden="true" /><span>{p.label}</span><span>{p.pct}%</span></li>)}</ul>
    </div>
    <section className="muni-stats__tiempo">
      <h2 className="muni__subtitle">Tiempo de resolución</h2>
      <p className="muni-stats__hero">{dias(actual.dias)} días</p>
      <p className="muni-stats__note">Promedio de este mes</p>
      <div className="muni-stats__bars" role="img" aria-label="Promedio de días de resolución por mes, últimos 12 meses">
        {RESOLUCION_MENSUAL.map((m, i) => <span key={m.mes} className={i === RESOLUCION_MENSUAL.length - 1 ? 'is-current' : ''} style={{ height: `${(m.dias / max) * 100}%` }} title={`${m.mes}: ${dias(m.dias)} días`} />)}
      </div>
      <div className="muni-stats__axis" aria-hidden="true">{RESOLUCION_MENSUAL.map(m => <span key={m.mes}>{m.mes}</span>)}</div>
      <table className="sr-only"><caption>Promedio de días de resolución por mes</caption><tbody>{RESOLUCION_MENSUAL.map(m => <tr key={m.mes}><th scope="row">{m.mes}</th><td>{dias(m.dias)} días</td></tr>)}</tbody></table>
    </section>
  </MuniScreen>
}
