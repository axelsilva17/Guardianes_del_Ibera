import LessonLayout, { Intro, Sprite } from './LessonLayout.jsx'
import armar from '../../assets/compostar/armar.jpg'

const STEPS = [
  { title: 'Separá los residuos orgánicos', text: 'Frutas, verduras, yerba, café, etc', box: { width: 50, height: 38 }, crop: { width: '322.64%', height: '630.17%', left: '-113.95%', top: '-32.76%' } },
  { title: 'Cortá en trozos pequeños', text: 'Así se descomponen más rápido', box: { width: 50, height: 39 }, crop: { width: '296.5%', height: '577.17%', left: '-97.55%', top: '-133.33%' } },
  { title: 'Agregá material seco', text: 'Hojas, ramas, cartón sin tinta', box: { width: 50, height: 37 }, crop: { width: '323.66%', height: '648.21%', left: '-112.98%', top: '-276.41%' } },
  { title: 'Sumá restos húmedos', text: 'Cáscaras, frutas, verduras', box: { width: 50, height: 46 }, crop: { width: '390.78%', height: '625.74%', left: '-146.08%', top: '-378.22%' } },
  { title: 'Alterná y mezclá', text: 'Repetí las capas y revolvé un poco', box: { width: 50, height: 38 }, crop: { width: '328.68%', height: '632%', left: '-114.92%', top: '-499%' } },
]

export default function Armar() {
  return <LessonLayout step={3}>
    <Intro number={3} title="Armá tu compost">Alterná capas de materiales verdes (húmedos) y marrones (secos) para lograr un buen equilibrio.</Intro>
    <ol className="compostar__steps">{STEPS.map(({ title, text, box, crop }, index) => <li key={title} className="compostar__card compostar__card--tip"><Sprite src={armar} box={box} crop={crop} /><div><h3>{index + 1}. {title}</h3><p>{text}</p></div></li>)}</ol>
    <div className="compostar__spacer" />
  </LessonLayout>
}
