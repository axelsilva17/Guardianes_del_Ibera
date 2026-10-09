import { ChevronRight } from 'lucide-react'
import PhoneFrame from '../components/PhoneFrame.jsx'
import BottomNav from '../components/BottomNav.jsx'
import StatusBar from '../components/StatusBar.jsx'
import lobito from '../assets/images/lobito.png'
import ciervito from '../assets/images/ciervito.png'
import melito from '../assets/images/melito.png'

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
          {TOPICS.map(({ id, title, description, mediaClass, image }) => (
            <article className="learn-card" key={id}>
              <div className={`learn-card__media ${mediaClass}`} aria-hidden="true">
                <img className="learn-card__img" src={image} alt="" />
              </div>
              <div className="learn-card__body">
                <h2 className="learn-card__title">{title}</h2>
                <p className="learn-card__desc">{description}</p>
                <a className="learn-card__link" href="#aprender">
                  Explorar tema
                  <ChevronRight size={14} strokeWidth={2.6} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  )
}