import { Link, NavLink } from 'react-router-dom'
import { ArrowLeft, House, MapPin, ClipboardList, ChartColumn, UserRound } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame.jsx'
import useBack from '../../hooks/useBack.js'
import signal from '../../assets/reportar/signal.svg'
import wifi from '../../assets/reportar/wifi.svg'
import battery from '../../assets/reportar/battery.svg'
import { ESTADOS, numero } from './data.js'

const NAV = [
  { to: '/municipio/panel', label: 'Inicio', Icon: House },
  { to: '/municipio/mapa', label: 'Mapa', Icon: MapPin },
  { to: '/municipio/reportes', label: 'Reportes', Icon: ClipboardList },
  { to: '/municipio/estadisticas', label: 'Estadísticas', Icon: ChartColumn },
  { to: '/municipio/perfil', label: 'Perfil', Icon: UserRound },
]

export const Icon = ({ as: I, color, size = 26 }) => <I size={size} strokeWidth={1.8} color={color} aria-hidden="true" />

export function StatusBar() {
  return <div className="muni__status" aria-hidden="true"><span>9:41</span><div><img src={signal} alt="" /><img src={wifi} alt="" /><img src={battery} alt="" /></div></div>
}

export function Chip({ tone, children }) {
  return <span className={`muni-chip muni-chip--${tone}`}>{children}</span>
}

export function ReportRow({ r }) {
  const estado = ESTADOS[r.estado]
  return <Link to={`/municipio/reportes/${r.numero}`} className="muni-row">
    <Icon as={MapPin} color="#4daecd" />
    <span className="muni-row__info"><strong>{numero(r.numero)} · {r.titulo}</strong><span>{r.fecha} · {r.hora}</span></span>
    <Chip tone={estado.tone}>{estado.label}</Chip>
  </Link>
}

/**
 * Armazón de las pantallas municipales. `back`: muestra la flecha, que vuelve a la pantalla anterior
 * (o a `back` si se entró directo por URL). `section`: pestaña de la barra; la flecha va siempre al Panel.
 * `nav`: barra inferior; marca activa la pestaña `tab`.
 */
export default function MuniScreen({ title, back, section, nav = true, tab, className = '', action, children }) {
  const goBack = useBack(typeof back === 'string' ? back : '/municipio/panel', { section })
  return <PhoneFrame title={title || 'Municipio'}>
    <div className={`muni ${className}`}>
      <StatusBar />
      <main className="muni__content">
        <header className="muni__header">
          {back && <button type="button" className="muni__back" onClick={goBack} aria-label="Volver"><ArrowLeft size={22} strokeWidth={1.8} aria-hidden="true" /></button>}
          <h1>{title}</h1>
          {action}
        </header>
        {children}
      </main>
      {nav && <nav className="muni__nav" aria-label="Navegación del municipio">{NAV.map(({ to, label, Icon: I }) => <NavLink key={to} to={to} className={({ isActive }) => (isActive || tab === to) ? 'is-active' : ''}><I size={22} strokeWidth={1.8} aria-hidden="true" /><span>{label}</span></NavLink>)}</nav>}
    </div>
  </PhoneFrame>
}
