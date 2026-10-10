import { Link } from 'react-router-dom'
import { ChevronRight, Percent, Compass, Utensils } from 'lucide-react'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import BottomNav from '../components/BottomNav.jsx'
import imagennivel from '../assets/images/imagennivel.png'
import novedadesibera from '../assets/images/novedadesibera.png'

const BENEFITS = [
  {
    id: 'gastronomia',
    chip: 'benefit-card__chip--gastronomia',
    Icon: Percent,
    title: '50% OFF',
    subtitle: 'en comercios',
  },
  {
    id: 'turismo',
    chip: 'benefit-card__chip--turismo',
    Icon: Compass,
    title: 'Experiencias',
    subtitle: 'Turísticas',
  },
  {
    id: 'beneficio',
    chip: 'benefit-card__chip--beneficio',
    Icon: Utensils,
    title: 'Beneficio',
    subtitle: 'Gastronómico',
  },
]

export default function Inicio() {
  return (
    <PhoneFrame title="Inicio">
      <div className="inicio">
        <StatusBar />

        <main className="inicio__content">
          <header className="inicio__greeting">
            <h1 className="inicio__hello">Hola, Sofía</h1>
            <Link className="inicio__juego" to="/juego" aria-label="Ir al juego Desafío Guardián">
              Juego
            </Link>
            <p className="inicio__hint">¿Qué querés hacer hoy por el Iberá?</p>
          </header>

          <section className="level-card" aria-label="Tu nivel">
            <img className="level-card__thumb" src={imagennivel} alt="" aria-hidden="true" />
            <div className="level-card__body">
              <span className="level-card__label">Tu nivel</span>
              <strong className="level-card__name">Explorador</strong>
              <div className="level-card__meta">
                <span className="level-card__track" role="img" aria-label="Progreso 0 de 500 puntos" />
                <span className="level-card__points">0/500</span>
              </div>
            </div>
          </section>

          <section className="carousel-card" aria-label="Novedades">
            <img
              className="carousel-card__img"
              src={novedadesibera}
              alt="Novedades del Iberá"
            />
          </section>

          <section className="benefits">
            <header className="benefits__header">
              <h2 className="benefits__title">Canjeá tus puntos</h2>
              <a className="benefits__link" href="#beneficios">
                Ver todos
                <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
              </a>
            </header>
            <p className="benefits__subtitle">Descubrí los beneficios que podés conseguir</p>

            <div className="benefits__row">
              {BENEFITS.map(({ id, chip, Icon, title, subtitle }) => (
                <article className="benefit-card" key={id}>
                  <span className={`benefit-card__chip ${chip}`} aria-hidden="true">
                    <Icon size={18} strokeWidth={2.2} />
                  </span>
                  <h3 className="benefit-card__title">{title}</h3>
                  <p className="benefit-card__subtitle">{subtitle}</p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </PhoneFrame>
  )
}