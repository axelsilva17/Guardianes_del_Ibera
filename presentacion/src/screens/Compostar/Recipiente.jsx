import LessonLayout, { Intro, Note, Sprite } from './LessonLayout.jsx'
import recipientes from '../../assets/compostar/recipientes.png'
import ciervo from '../../assets/compostar/ciervo.png'

const OPTIONS = [
  { title: 'Balde con tapa', points: ['Ideal para espacios pequeños', 'Con orificios de ventilación y drenaje'], box: { width: 95, height: 96 }, crop: { width: '148.45%', height: '363.64%', left: '-17.01%', top: '-21.83%' } },
  { title: 'Cajón de madera', points: ['Súper prácticos para patios y jardines', 'Económico y fácil de hacer'], box: { width: 95, height: 87 }, crop: { width: '137.83%', height: '373.46%', left: '-14.35%', top: '-149.29%' } },
  { title: 'Compostera comprada', points: ['Listas para usar', 'Vienen con buena ventilación y drenaje'], box: { width: 95, height: 95 }, crop: { width: '152.4%', height: '378.85%', left: '-19.71%', top: '-274.04%' } },
]

export default function Recipiente() {
  return <LessonLayout step={1}>
    <Intro number={1} title="Elegí un recipiente adecuado">Podés usar diferentes tipos de recipientes, lo importante es que permita la circulación del aire y el drenaje del agua</Intro>
    {OPTIONS.map(({ title, points, box, crop }) => <article key={title} className="compostar__card compostar__card--option"><Sprite src={recipientes} box={box} crop={crop} /><div><h3>{title}</h3><ul>{points.map(point => <li key={point}>{point}</li>)}</ul><span className="compostar__more">Informate más →</span></div></article>)}
    <div className="compostar__spacer"><Note art={<Sprite src={ciervo} box={{ width: 96, height: 103 }} crop={{ width: '143.16%', height: '100%', left: '-22.58%', top: 0 }} />}><strong>Importante</strong>Debe permitir la entrada de aire y evitar que se acumule demasiada agua</Note></div>
  </LessonLayout>
}
