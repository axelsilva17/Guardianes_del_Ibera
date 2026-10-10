import LessonLayout from './LessonLayout.jsx'
import { useNavigate } from 'react-router-dom'

export default function Armar() {
  const n = useNavigate()
  const steps = [
    { num: '1', title: 'Separá los residuos orgánicos', desc: 'Recibí los restos de frutas, verduras, cáscaras de huevo y hojas secas. Separá de carne, lácteos, plásticos y aceites.' },
    { num: '2', title: 'Agregá en capas alternas', desc: 'Alterná capas de materiales verdes (resto de cocina húmedo) y marrones (hojas secas, papel, cartón). Esto equilibra la humedad y el carbono.' },
    { num: '3', title: 'Mantené la humedad adecuada', desc: 'El compost debe estar tan húmedo como una esponja bien escurrida. Si está seco, agregá agua; si está empapado, agregá material seco.' },
    { num: '4', title: 'Aireá cada semana', desc: 'Volvé o aireá el compost una vez por semana para proporcionar oxígeno a los microorganismos y acelerar la descomposición.' },
    { num: '5', title: 'Alterná y mezclá', desc: 'Cada vez que agregues nuevos residuos, mezclá suavemente el contenido para integrar los materiales frescos con los ya en descomposición.' },
  ]
  return (
    <LessonLayout
      title="3. Armá tu compost"
      step={3}
      onBack={() => n('/compostar')}
      onNext={() => n('/compostar/4')}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
        {steps.map((s) => (
          <div key={s.num} className="comp-card" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)', minWidth: '24px' }}>{s.num}</span>
              <div>
                <h4 className="comp-card__title" style={{ marginBottom: '4px' }}>{s.title}</h4>
                <p className="comp-card__desc" style={{ margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </LessonLayout>
  )
}
