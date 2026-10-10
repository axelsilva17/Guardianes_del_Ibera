import LessonLayout from './LessonLayout.jsx'
import { useNavigate } from 'react-router-dom'

export default function Listo() {
  const n = useNavigate()
  return (
    <LessonLayout
      title="5. ¡Tu compost está listo!"
      step={5}
      onBack={() => n('/compostar')}
      onNext={() => n('/compostar/6')}
    >
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
        <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
          ¡Así se ve el compost maduro!
        </h2>
      </div>

      <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--color-primary)', margin: '24px 0 12px' }}>
        ¿Para qué lo podés usar?
      </h3>
      <ul className="comp-list">
        <li className="comp-list__item"><span className="comp-list__mark">✓</span> Enriquecer la tierra de macetas y huertos</li>
        <li className="comp-list__item"><span className="comp-list__mark">✓</span> Mejorar la retención de agua en suelos arenosos</li>
        <li className="comp-list__item"><span className="comp-list__mark">✓</span> Reducir la necesidad de fertilizantes químicos</li>
      </ul>

      <div style={{ background: 'var(--color-sand-note)', border: '1px solid var(--color-sand-soft)', borderRadius: '12px', padding: '16px', marginTop: '24px' }}>
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.5', color: 'var(--color-text)' }}>
          <strong>Tiempo de descomposición:</strong> Con los cuidados adecuados, tu compost estará listo en 2 a 4 meses, dependiendo de la época del año y los materiales usados.
        </p>
      </div>
    </LessonLayout>
  )
}
