import LessonLayout, { Intro, Note, Sprite } from './LessonLayout.jsx'
import listo from '../../assets/compostar/listo.png'
import ciervo from '../../assets/compostar/ciervo.png'
import check from '../../assets/separar/check.svg'
import line from '../../assets/compostar/line.svg'

const USES = ['En macetas y huertas', 'En jardines y canteros', 'Mejora la calidad del suelo']

export default function Listo() {
  return <LessonLayout step={5}>
    <Intro number={5} title="¡Tu compost está listo!">Cuando el material se ve oscuro, tiene olor a tierra, y no se reconocen los restos originales, está listo para usar.</Intro>
    <div className="compostar__scene compostar__scene--ready"><img src={listo} alt="Manos sosteniendo compost maduro con un brote: ¡Así se ve el compost maduro!" /></div>
    <section className="separar__list"><h2>¿Dónde usarlo?</h2><img src={line} alt="" aria-hidden="true" /><ul>{USES.map(text => <li key={text}><img src={check} alt="" aria-hidden="true" /><span>{text}</span></li>)}</ul></section>
    <div className="compostar__spacer"><Note art={<Sprite src={ciervo} box={{ width: 96, height: 103 }} crop={{ width: '143.16%', height: '100%', left: '-22.58%', top: 0 }} />}>El tiempo de descomposición varía según los materiales y las condiciones. No hay una fecha exacta que sirva para todos los casos</Note></div>
  </LessonLayout>
}
