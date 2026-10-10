import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import PhoneFrame from '../components/PhoneFrame.jsx'
import BottomNav from '../components/BottomNav.jsx'
import StatusBar from '../components/StatusBar.jsx'
import lobito from '../assets/images/lobito.png'
import ciervito from '../assets/images/ciervito.png'
import melito from '../assets/images/melito.png'
import capiCard from '../assets/images/capi-card.png'

const TOPICS = [
  {
    id: 'residuos',
    title: 'Aprendé a separar',
    description: 'Descubrí junto a Lobito dónde va cada residuo y còmo clasificarlo',
    mediaClass: 'learn-card__media--water',
    image: lobito,
  },
  {
    id: 'compost',
    title: 'Aprendé a compostar',
    description: 'Transformá tus residuos organicos junto a Ciervito en algo útil para la tierra',
    mediaClass: 'learn-card__media--leaf',
    image: ciervito,
  },
  {
    id: 'ibera',
    title: 'Cuidemos el Iberá',
    description: 'Conoce con Melito pequeños hábitos que ayudan a proteger a nuestro entorno',
    mediaClass: 'learn-card__media--sand',
    image: melito,
  },
]

export default function Aprender() {
  return (
    <PhoneFrame title="Aprender">
      <div className="aprender">
        <StatusBar />

        <header className="aprender__header">
          <button type="button" className="aprender__back" aria-label="Volver">
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
          <h1 className="aprender__title">Aprendé</h1>
        </header>

        <div className="aprender__list">
          {/* Promo de descubrimiento del juego: va primero porque al final
              queda bajo el scroll de las tres tarjetas altas. El card entero
              es el enlace, as que la píldora "Jugar" es decorativa (aria-hidden).
              No se usa JuegoFlotante.png como <img>: su botón quedaría
              horneado en el bitmap y dejaría de ser un control real. */}
          <Link
            className="juego-cta"
            to="/juego"
            aria-label="Desafío Guardián: poné a prueba tus conocimientos sobre cuidados con Capi y ganá puntos"
          >
            <img className="juego-cta__art" src={capiCard} alt="" aria-hidden="true" />
            <span className="juego-cta__body">
              <span className="juego-cta__title">Desafío Guardián</span>
              <span className="juego-cta__desc">
                Poné a prueba tus conocimientos sobre cuidados con Capi y ganá puntos!
              </span>
            </span>
            <span className="juego-cta__pill" aria-hidden="true">
              Jugar
            </span>
          </Link>

          {TOPICS.map(({ id, title, description, mediaClass, image }) => (
            <article className="learn-card" key={id}>
              <div className={`learn-card__media ${mediaClass}`} aria-hidden="true">
                <img className="learn-card__img" src={image} alt="" />
              </div>
              <div className="learn-card__body">
                <h2 className="learn-card__title">{title}</h2>
                <p className="learn-card__desc">{description}</p>
                <Link className="learn-card__link" to={id === 'residuos' ? '/aprender/separar' : id === 'compost' ? '/compostar' : '#aprender'}>
                  Explorar tema
                  <ChevronRight size={14} strokeWidth={2.6} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  )
}
