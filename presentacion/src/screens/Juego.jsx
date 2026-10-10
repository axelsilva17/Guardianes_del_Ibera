import { ListChecks, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import capi from '../assets/images/capi.png'

/* Datos medidos en design-refs/Juego.png (frame 390x844). */
const REGLAS = [
  {
    id: 'preguntas',
    Icon: ListChecks,
    tone: 'primary',
    title: '5 preguntas',
    subtitle: 'Opción múltiple',
  },
  {
    id: 'puntos',
    Icon: Star,
    tone: 'amber',
    title: 'Sumá puntos',
    subtitle: 'por cada correcta',
  },
]

export default function Juego() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Jugá con Capi">
      <div className="juego">
        <StatusBar />

        {/* Mejora 2: el diseño no tiene back y dejaba al usuario atrapado. */}
        <button
          type="button"
          className="juego__back"
          aria-label="Volver"
          onClick={() => navigate(-1)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M15 5 8 12l7 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Mejora 4: scroll vertical; en iPhone SE (667px) el diseño se desborda. */}
        <div className="juego__scroll">
          <main className="juego__content">
            <h1 className="juego__title">Jugá con Capi</h1>

            <img className="juego__art" src={capi} alt="Capi, el capybara del Iberá" />

            <p className="juego__subtitle">¡Hora de poner todo lo aprendido a prueba!</p>
            <p className="juego__desc">
              Respondé las preguntas y descubrí cuánto aprendiste sobre cuidar el Iberá.
            </p>

            <ul className="juego__rules">
              {REGLAS.map(({ id, Icon, tone, title, subtitle }) => (
                <li className="juego-rule" key={id}>
                  <span
                    className={`juego-rule__icon juego-rule__icon--${tone}`}
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={2.2} />
                  </span>
                  <span className="juego-rule__body">
                    <strong className="juego-rule__title">{title}</strong>
                    <span className="juego-rule__subtitle">{subtitle}</span>
                  </span>
                </li>
              ))}
            </ul>

            <aside className="juego-note">
              <strong className="juego-note__title">Recordatorio</strong>
              <p className="juego-note__text">
                Podés reintentar el cuestionario las veces que quieras hasta acertar todas!
              </p>
            </aside>
          </main>

          {/* Sin onClick a propósito: el cuestionario (Juego 2 / Juego 3) no existe en diseño. */}
          <button type="button" className="juego__cta">
            Jugar
          </button>
        </div>
      </div>
    </PhoneFrame>
  )
}
