import { NavLink } from 'react-router-dom'
import { Home, Map, PlusCircle, BookOpen, User } from 'lucide-react'
import '../styles/BottomNav.css'

// Los mismos íconos en todas las pantallas; toman el color del texto (verde el activo, gris el resto).
const ITEMS = [
  { to: '/inicio', label: 'Inicio', Icon: Home },
  { to: '/mapa', label: 'Mapa', Icon: Map },
  { to: '/reportar', label: 'Reportar', Icon: PlusCircle },
  { to: '/aprender', label: 'Aprender', Icon: BookOpen },
  { to: '/perfil', label: 'Perfil', Icon: User },
]

// `icons` se acepta por compatibilidad con pantallas que lo pasaban, pero ya no se usa:
// así el menú se ve igual en toda la app.
// eslint-disable-next-line no-unused-vars
export default function BottomNav({ className = '', icons }) {
  return (
    <nav className={`bottomnav${className ? ` ${className}` : ''}`} aria-label="Navegacion principal">
      {ITEMS.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} className={({ isActive }) => `bottomnav__item${isActive ? ' is-active' : ''}`}>
          <Icon size={22} strokeWidth={2} aria-hidden="true" />
          <span className="bottomnav__label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
