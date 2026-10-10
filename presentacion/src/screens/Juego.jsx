import { Link } from 'react-router-dom'
import { ListChecks } from 'lucide-react'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import BackButton from '../components/BackButton.jsx'
import capi from '../assets/images/capi.png'
import coins from '../assets/images/coins.png'

import { useNavigate } from 'react-router-dom'
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
    // El diseño no usa un ícono de lucide acá, sino un ícono de monedas exportado
    // desde Figma y calado dentro de un círculo ámbar.
    image: coins,
    // El "+10" no aparece en los PNG exportados (el hueco entre el badge y el
    // texto es blanco puro), pero el usuario lo pide explicitamente. Va en ámbar,
    // del lado del badge de monedas que lo acompaña.
    amount: '+10',
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
        <BackButton className="juego__back" />

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
              {REGLAS.map(({ id, Icon, image, amount, tone, title, subtitle }) => (
                <li className="juego-rule" key={id}>
                  <span
                    className={`juego-rule__icon juego-rule__icon--${tone}`}
                    aria-hidden="true"
                  >
                    {image ? (
                      <img className="juego-rule__art" src={image} alt="" />
                    ) : (
                      <Icon size={20} strokeWidth={2.2} />
                    )}
                  </span>
                  {amount ? <strong className="juego-rule__amount">{amount}</strong> : null}
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
          <Link
            to="/juego/compostar"
            className="juego__cta"
          >
            Jugar
          </Link>
        </div>
      </div>
    </PhoneFrame>
  )
}
