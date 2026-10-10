import LessonLayout from './LessonLayout.jsx'
import { useNavigate } from 'react-router-dom'

export default function Intro() {
  const n = useNavigate()
  return (
    <LessonLayout
      title="Compostaje"
      step={0}
      showNext
      onNext={() => n('/compostar/1')}
    >
      <div className="comp-intro">
        <h2 className="comp-intro__title">¿Qué es?</h2>
        <p className="comp-intro__text">
          El compostaje es un proceso natural que transforma los residuos orgánicos en abono útil para la tierra. Con Capi, aprendé paso a paso cómo hacerlo en casa.
        </p>
      </div>

      <div className="comp-body" style={{ paddingTop: '8px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--comp-gold)', marginBottom: '8px' }}>¿Qué podés hacer con ellos?</h3>
        <ul className="comp-list">
          <li className="comp-list__item"><span className="comp-list__mark">✓</span> Yerba, café y restos de frutas</li>
          <li className="comp-list__item"><span className="comp-list__mark">✓</span> Hojas secas y ramitas</li>
          <li className="comp-list__item"><span className="comp-list__mark">✓</span> Cáscaras de huevo</li>
        </ul>
      </div>

      <div className="comp-body" style={{ paddingTop: '8px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--comp-gold)', marginBottom: '8px' }}>¿Qué incluyen?</h3>
        <ul className="comp-list comp-list--no">
          <li className="comp-list__item"><span className="comp-list__mark">✗</span> Carne y lácteos</li>
          <li className="comp-list__item"><span className="comp-list__mark">✗</span> Plásticos</li>
          <li className="comp-list__item"><span className="comp-list__mark">✗</span> Aceites y alimentos grasos</li>
        </ul>
      </div>
    </LessonLayout>
  )
}
