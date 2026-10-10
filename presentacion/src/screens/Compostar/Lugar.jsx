import LessonLayout from './LessonLayout.jsx'
import { useNavigate } from 'react-router-dom'

export default function Lugar() {
  const n = useNavigate()
  return (
    <LessonLayout
      title="2. Prepará el lugar"
      step={2}
      onBack={() => n('/compostar')}
      onNext={() => n('/compostar/3')}
    >
      <div className="comp-cards">
        <div className="comp-card">
          <h3 className="comp-card__title" style={{ color: 'var(--comp-gold)' }}>Con sombra</h3>
          <p className="comp-card__desc">Elegí un lugar con luz indirecta o sombra parcial. La luz solar directa puede secar demasiado el compost y matar a los microorganismos beneficiosos.</p>
        </div>
        <div className="comp-card">
          <h3 className="comp-card__title" style={{ color: 'var(--comp-gold)' }}>Protegelo de la lluvia</h3>
          <p className="comp-card__desc">El exceso de lluvia puede encharcar el compost y crear condiciones anaeróbicas. Usá una tapa o cubierto para protegerlo, pero asegurá también circulación de aire.</p>
        </div>
        <div className="comp-card">
          <h3 className="comp-card__title" style={{ color: 'var(--comp-gold)' }}>Cerca de tu hogar</h3>
          <p className="comp-card__desc">Ubicá la compostera a menos de 10 metros de tu cocina o área de generación de residuos orgánicos. Cuanto más cerca, más seguido la usarás.</p>
        </div>
      </div>
    </LessonLayout>
  )
}
