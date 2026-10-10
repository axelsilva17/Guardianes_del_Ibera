import LessonLayout, { Intro, Sprite } from './LessonLayout.jsx'
import cuidar from '../../assets/compostar/cuidar.jpg'

const CARE = [
  { title: 'Humedad', text: 'Debe estar húmedo pero no empapado', box: { width: 94, height: 96 }, crop: { width: '198.82%', height: '347.47%', left: '-49.1%', top: '-20.2%' } },
  { title: 'Aireación', text: 'Mezclá el contenido periódicamente', box: { width: 83, height: 96 }, crop: { width: '228.57%', height: '352.82%', left: '-66.67%', top: '-132.31%' } },
  { title: 'Olores', text: 'Si tiene mal olor, revisá la humedad y ventilación', box: { width: 75, height: 96 }, crop: { width: '266.67%', height: '371.89%', left: '-87.5%', top: '-247.03%' } },
]

export default function Cuidar() {
  return <LessonLayout step={4}>
    <Intro number={4} title="Cuidá tu compost">Para que se descomponga bien, es importante mantener el equilibrio.</Intro>
    {CARE.map(({ title, text, box, crop }) => <article key={title} className="compostar__card compostar__card--option"><Sprite src={cuidar} box={box} crop={crop} /><div><h3>{title}</h3><p>{text}</p></div></article>)}
    <div className="compostar__spacer" />
  </LessonLayout>
}
