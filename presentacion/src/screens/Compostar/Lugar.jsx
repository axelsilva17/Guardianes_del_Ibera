import LessonLayout, { Intro } from './LessonLayout.jsx'
import lugar from '../../assets/compostar/lugar.png'
import sun from '../../assets/compostar/sun.svg'
import water from '../../assets/compostar/water.svg'
import pin from '../../assets/compostar/pin.svg'

const TIPS = [
  { icon: sun, title: 'Con sombra', text: 'Evitá el sol directo' },
  { icon: water, title: 'Protegelo de la lluvia', text: 'Podés usar un techo o ponerlo bajo un árbol' },
  { icon: pin, title: 'Cerca de tu hogar', text: 'Así es más fácil usarlo y mantenerlo' },
]

export default function Lugar() {
  return <LessonLayout step={2}>
    <Intro number={2} title="Prepará el lugar">Elegí un sitio cómodo y accesible, con las condiciones adecuadas para que tu compostera funcione bien.</Intro>
    <div className="compostar__scene"><img src={lugar} alt="Compostera de madera a la sombra de un árbol, junto a una pared" /></div>
    {TIPS.map(({ icon, title, text }) => <article key={title} className="compostar__card compostar__card--tip"><span className="compostar__icon"><img src={icon} alt="" aria-hidden="true" /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}
    <div className="compostar__spacer" />
  </LessonLayout>
}
