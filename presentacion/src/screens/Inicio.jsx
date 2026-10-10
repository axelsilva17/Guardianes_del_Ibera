import { Link } from 'react-router-dom'
import { ChevronRight, Percent, Compass, Utensils } from 'lucide-react'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import BottomNav from '../components/BottomNav.jsx'
import { USER, getProgress } from '../data/usuario.js'
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
  const { level, next, percent } = getProgress()
  const goal = next ? next.min : USER.points
  return (
    <PhoneFrame title="Inicio">
      <div className="inicio">
        <StatusBar />

        <main className="inicio__content">
          <header className="inicio__greeting">
            <h1 className="inicio__hello">Hola, {USER.name}</h1>
            <Link className="inicio__juego" to="/aprender/ibera/juego" aria-label="Ir al juego Desafío Guardián">
              Juego
            </Link>
            <p className="inicio__hint">¿Qué querés hacer hoy por el Iberá?</p>
          </header>

          <Link className="level-card" to="/nivel" aria-label={`Tu nivel: ${level.name}. Ver nivel y progreso`}>
            <img className="level-card__thumb" src={level.image} alt="" aria-hidden="true" />
            <div className="level-card__body">
              <span className="level-card__label">Tu nivel</span>
              <strong className="level-card__name">{level.name}</strong>
              <div className="level-card__meta">
                <span className="level-card__track" role="img" aria-label={`Progreso ${USER.points} de ${goal} puntos`} style={{ background: `linear-gradient(to right, var(--color-primary) ${percent}%, var(--color-track) ${percent}%)` }} />
                <span className="level-card__points">{USER.points}/{goal}</span>
              </div>
            </div>
          </Link>

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
              <Link className="benefits__link" to="/recompensas">
                Ver todos
                <ChevronRight size={14} strokeWidth={2.5} aria-hidden="true" />
              </Link>
            </header>
            <p className="benefits__subtitle">Descubrí los beneficios que podés conseguir</p>

            <div className="benefits__row">
              {BENEFITS.map(({ id, chip, Icon, title, subtitle }) => (
                <Link className="benefit-card" key={id} to="/recompensas">
                  <span className={`benefit-card__chip ${chip}`} aria-hidden="true">
                    <Icon size={18} strokeWidth={2.2} />
                  </span>
                  <h3 className="benefit-card__title">{title}</h3>
                  <p className="benefit-card__subtitle">{subtitle}</p>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <BottomNav />
      </div>
    </PhoneFrame>
  )
}