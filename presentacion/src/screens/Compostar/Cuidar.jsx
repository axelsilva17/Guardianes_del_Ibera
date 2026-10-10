import LessonLayout from './LessonLayout.jsx'
import { useNavigate } from 'react-router-dom'

export default function Cuidar() {
  const n = useNavigate()
  return (
    <LessonLayout
      title="4. Cuidá tu compost"
      step={4}
      onBack={() => n('/compostar')}
      onNext={() => n('/compostar/5')}
    >
      <div className="comp-cards">
        <div className="comp-card">
          <h3 className="comp-card__title" style={{ color: 'var(--comp-gold)' }}>Humedad</h3>
          <p className="comp-card__desc">Mantené la humedad adecuada: ni seca, ni empapada. El compost debe sentirse como una esponja bien escurrida.</p>
        </div>
        <div className="comp-card">
          <h3 className="comp-card__title" style={{ color: 'var(--comp-gold)' }}>Aireación</h3>
          <p className="comp-card__desc">Volvé o aireá el compost una vez por semana para proporcionar oxígeno. Esto evita olores y acelera la descomposición.</p>
        </div>
        <div className="comp-card">
          <h3 className="comp-card__title" style={{ color: 'var(--comp-gold)' }}>Olores</h3>
          <p className="comp-card__desc">Si hay olores fuertes, revisá el equilibrio de materiales (verde vs. marrón) y asegurá buen drenaje. Un compost bien balanceado no huele.</p>
        </div>
      </div>
    </LessonLayout>
  )
}
