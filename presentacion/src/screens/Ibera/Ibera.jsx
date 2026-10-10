import { Link } from 'react-router-dom'
import SepararLayout from '../Separar/SepararLayout.jsx'
import { Sprite } from '../Compostar/LessonLayout.jsx'
import { TOPICS } from './data.js'
import temas from '../../assets/ibera/temas.png'
import arrow from '../../assets/ibera/arrow-right.svg'
import capi from '../../assets/separar/capi-promo.png'
import '../../styles/Ibera.css'

export default function Ibera() {
  return <SepararLayout title="Cuidemos el Iberá" backTo="/aprender" className="compostar ibera ibera--hub">
    <p className="ibera__lead">Acciones simples cuidan a los humedales, la fauna y la naturaleza del Iberá</p>
    {TOPICS.map(({ id, card, cardText, thumb }) => <Link key={id} to={`/aprender/ibera/${id}`} className="ibera__topic"><Sprite src={temas} {...thumb} /><div><h2>{card}</h2><p>{cardText}</p></div><img src={arrow} alt="" aria-hidden="true" /></Link>)}
    <div className="compostar__spacer"><Link to="/aprender/ibera/juego" className="separar__promo compostar__promo"><div className="separar__capi"><img src={capi} alt="" aria-hidden="true" /></div><div><h2>Desafío Guardián</h2><p>Poné a prueba tus conocimientos sobre cuidados con Capi y ganá puntos!</p><span>JUGAR</span></div></Link></div>
  </SepararLayout>
}
