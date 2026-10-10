import { Link } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout.jsx'
import { USER, LEVELS, getProgress } from '../data/usuario.js'
import users from '../assets/nivel/users.svg'
import clipboard from '../assets/nivel/clipboard.svg'
import sprout from '../assets/nivel/sprout.svg'
import pin from '../assets/nivel/pin.svg'
import '../styles/Nivel.css'

// Figma, Page 3: "14 · Nivel y progreso".
const ACTIONS = [
  { title: 'Jugá con Capi', points: 10, icon: users, to: '/aprender/ibera/juego' },
  { title: 'Reportá residuos', points: 20, icon: clipboard, to: '/reportar' },
  { title: 'Compostá', points: 40, icon: sprout, to: '/compostar' },
  { title: 'Llevá tus reciclables', points: 50, icon: pin, to: '/mapa' },
]

export default function Nivel() {
  const { index, level, next } = getProgress()
  return <ScreenLayout title="Nivel de Guardián" className="nivel">
    <section className="nivel__current">
      <img src={level.image} alt="" aria-hidden="true" />
      <h2>¡{level.name}!</h2>
      {next ? <>
        <p>{USER.points} / {next.min} PUNTOS</p>
        <progress max={next.min - level.min} value={USER.points - level.min} aria-label={`${USER.points} de ${next.min} puntos`} />
        <p className="nivel__hint">Te faltan {next.min - USER.points} puntos para el próximo nivel</p>
      </> : <p>{USER.points} PUNTOS</p>}
      <p className="nivel__cheer">¡Seguí así, {USER.name}!</p>
    </section>
    <ul className="nivel__actions" aria-label="Cómo sumar puntos">{ACTIONS.map(a => <li key={a.title}><Link to={a.to}><img src={a.icon} alt="" aria-hidden="true" /><span>{a.title}</span><strong>+{a.points}</strong></Link></li>)}</ul>
    <div className="nivel__levels-space"><ol className="nivel__levels" aria-label="Niveles">{LEVELS.map((l, i) => <li key={l.name} className={i === index ? 'is-current' : i > index ? 'is-locked' : ''} aria-current={i === index ? 'step' : undefined}><img src={l.image} alt="" aria-hidden="true" /><strong>{l.name}</strong><span>{l.max ? `${l.min}–${l.max}` : `${l.min}+`}<br />puntos</span></li>)}</ol></div>
  </ScreenLayout>
}
