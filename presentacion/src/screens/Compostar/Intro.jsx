import { Link } from 'react-router-dom'
import SepararLayout from '../Separar/SepararLayout.jsx'
import check from '../../assets/separar/check.svg'
import x from '../../assets/compostar/x.svg'
import line from '../../assets/compostar/line.svg'
import compost from '../../assets/compostar/compost-intro.jpg'
import '../../styles/Compostar.css'

function List({ title, items, icon }) {
  return <section className="separar__list"><h2>{title}</h2><img src={line} alt="" aria-hidden="true" /><ul>{items.map(text => <li key={text}><img src={icon} alt="" aria-hidden="true" /><span>{text}</span></li>)}</ul></section>
}

export default function Intro() {
  return <SepararLayout title="Compostaje" backTo="/aprender" className="compostar compostar--intro">
    <section className="compostar__about"><h2>¿De qué se trata?</h2><p>El compostaje es un proceso natural que transforma los residuos orgánicos en compost o abono natural, gracias a microorganismos y lombrices</p></section>
    <List title="¿Qué podés compostar?" icon={check} items={['Yerba, café y té', 'Cáscaras de frutas y verduras', 'Hojas secas y ramitas', 'Cáscaras de huevo']} />
    <List title="¿Qué no va al compost?" icon={x} items={['Carne y lácteos', 'Plásticos', 'Aceites y alimentos grasos']} />
    <div className="compostar__hero"><img src={compost} alt="Una planta y una compostera de madera con un brote" /></div>
    <Link to="/compostar/1" className="compostar__btn compostar__btn--wide">Aprendé a compostar</Link>
  </SepararLayout>
}
