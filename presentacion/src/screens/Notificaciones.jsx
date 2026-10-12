import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipboardCheck, Star, Truck, Gift, Gamepad2, CircleCheck } from 'lucide-react'
import ScreenLayout from '../components/ScreenLayout.jsx'
import { useNotificaciones } from '../data/notificaciones.js'
import buho from '../assets/images/buho-notificaciones.webp'
import '../styles/Notificaciones.css'

// No está en el Figma: bandeja de notificaciones con el estilo de Recompensas y Nivel.
// Las preferencias de notificaciones están en Perfil (/perfil/notificaciones).
const TIPOS = {
  reporte: { Icon: ClipboardCheck, tone: 'blue' },
  puntos: { Icon: Star, tone: 'amber' },
  recoleccion: { Icon: Truck, tone: 'green' },
  recompensa: { Icon: Gift, tone: 'lilac' },
  desafio: { Icon: Gamepad2, tone: 'amber' },
  resuelto: { Icon: CircleCheck, tone: 'green' },
}
const FILTERS = [{ id: 'todas', label: 'Todas' }, { id: 'sin-leer', label: 'No leídas' }]

export default function Notificaciones() {
  const navigate = useNavigate()
  const { lista, sinLeer, marcarLeida, marcarTodas } = useNotificaciones()
  const [filter, setFilter] = useState('todas')
  const shown = lista.filter(n => filter === 'todas' || !n.leida)
  const grupos = [['Hoy', shown.filter(n => n.hoy)], ['Antes', shown.filter(n => !n.hoy)]].filter(([, items]) => items.length)
  function abrir(n) { marcarLeida(n.id); navigate(n.to) }

  return <ScreenLayout title="Notificaciones" className="notificaciones">
    <div className="notificaciones__filters" role="group" aria-label="Filtrar notificaciones">
      {FILTERS.map(f => <button key={f.id} type="button" aria-pressed={filter === f.id} className={filter === f.id ? 'is-active' : ''} onClick={() => setFilter(f.id)}>{f.label}{f.id === 'sin-leer' && sinLeer > 0 ? ` (${sinLeer})` : ''}</button>)}
    </div>
    {sinLeer > 0 && <button type="button" className="notificaciones__all" onClick={marcarTodas}>Marcar todas como leídas</button>}

    {grupos.length ? grupos.map(([titulo, items]) => (
      <section key={titulo} className="notificaciones__group" aria-label={titulo}>
        <h2>{titulo}</h2>
        <ul>{items.map(n => {
          const { Icon, tone } = TIPOS[n.tipo]
          return <li key={n.id}>
            <button type="button" className={`notificacion${n.leida ? '' : ' is-unread'}`} onClick={() => abrir(n)}>
              <span className={`notificacion__icon notificacion__icon--${tone}`}><Icon size={22} strokeWidth={1.8} aria-hidden="true" /></span>
              <span className="notificacion__body"><strong>{n.titulo}</strong><span>{n.texto}</span><small>{n.cuando}</small></span>
              {!n.leida && <span className="notificacion__dot"><span className="sr-only">Sin leer</span></span>}
            </button>
          </li>
        })}</ul>
      </section>
    )) : (
      <div className="notificaciones__empty">
        <img src={buho} alt="" aria-hidden="true" />
        <h2>¡Estás al día!</h2>
        <p>No tenés notificaciones sin leer.</p>
      </div>
    )}

  </ScreenLayout>
}
