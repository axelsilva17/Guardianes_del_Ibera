import { NavLink } from 'react-router-dom'
import { Home, Map, PlusCircle, BookOpen, User } from 'lucide-react'

const ITEMS = [
  { to: '/inicio', label: 'Inicio', Icon: Home },
  { to: '/mapa', label: 'Mapa', Icon: Map },
  { to: '/reportar', label: 'Reportar', Icon: PlusCircle },
  { to: '/aprender', label: 'Aprender', Icon: BookOpen },
  { to: '/perfil', label: 'Perfil', Icon: User },
]

export default function BottomNav({ className = '', icons = {} }) {
  return (
    <nav className={`bottomnav${className ? ` ${className}` : ''}`} aria-label="Navegacion principal">
      {ITEMS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `bottomnav__item${isActive ? ' is-active' : ''}`
          }
        >
          <>{icons[to] ? <img src={icons[to]} alt="" aria-hidden="true" /> : <Icon size={22} strokeWidth={2} aria-hidden="true" />}</>
          <span className="bottomnav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
