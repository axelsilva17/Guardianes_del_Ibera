import LessonLayout from './LessonLayout.jsx'
import { useNavigate } from 'react-router-dom'

export default function Recipiente() {
  const n = useNavigate()
  return (
    <LessonLayout
      title="1. Elegí un recipiente adecuado"
      step={1}
      onBack={() => n('/compostar')}
      onNext={() => n('/compostar/2')}
    >
      <div className="comp-cards">
        <div className="comp-card comp-card--icon">
          <div className="comp-art comp-art--thumb" aria-label="Balde con tapa" />
          <div className="comp-card__body">
            <h3 className="comp-card__title">Balde con tapa</h3>
            <p className="comp-card__desc">Permite controlar olores y plagas. Fácil de mover y vaciar.</p>
          </div>
        </div>
        <div className="comp-card comp-card--icon">
          <div className="comp-art comp-art--thumb" aria-label="Cajón de madera" />
          <div className="comp-card__body">
            <h3 className="comp-card__title">Cajón de madera</h3>
            <p className="comp-card__desc">Material natural y estético. Ideal para espacios pequeños.</p>
          </div>
        </div>
        <div className="comp-card comp-card--icon">
          <div className="comp-art comp-art--thumb" aria-label="Compostera comprada" />
          <div className="comp-card__body">
            <h3 className="comp-card__title">Compostera comprada</h3>
            <p className="comp-card__desc">Diseñada específicamente para compostaje. Sistemas de aireación y drenaje incluidos.</p>
          </div>
        </div>
      </div>
    </LessonLayout>
  )
}
