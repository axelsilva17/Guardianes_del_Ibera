import { Link } from 'react-router-dom'
import SepararLayout from '../Separar/SepararLayout.jsx'
import '../../styles/Compostar.css'

export const TOTAL_STEPS = 6

/* Recorte de una ilustración compartida (sprite): `box` es el tamaño del hueco
   en el diseño y `crop` la posición de la imagen dentro de él, ambos medidos en Figma. */
export function Sprite({ src, box, crop }) {
  return <div className="compostar__sprite" style={box}><img src={src} alt="" aria-hidden="true" style={crop} /></div>
}

export function Intro({ number, title, children }) {
  return <section className="compostar__intro"><h2>{number ? `${number}. ${title}` : title}</h2><p>{children}</p></section>
}

export function Note({ children, art }) {
  return <aside className="compostar__note"><div className="compostar__note-text">{children}</div>{art}</aside>
}

/* Paso N de la lección: encabezado, barra de progreso, contenido y botones Volver / Siguiente. */
export default function LessonLayout({ step, children, footer }) {
  const prev = step === 1 ? '/compostar' : `/compostar/${step - 1}`
  const next = `/compostar/${step + 1}`
  return <SepararLayout title="Aprendé a Compostar" backTo={prev} className="compostar">
    <div className="compostar__progress" aria-label={`Paso ${step} de ${TOTAL_STEPS}`}><progress max={TOTAL_STEPS} value={step} /><span>{step} de {TOTAL_STEPS}</span></div>
    {children}
    {footer ?? <div className="compostar__actions"><Link to={prev} className="compostar__btn compostar__btn--ghost">Volver</Link><Link to={next} className="compostar__btn">Siguiente</Link></div>}
  </SepararLayout>
}
