import { Link } from 'react-router-dom'
import SepararLayout, { WasteArt } from './SepararLayout.jsx'
import { CATEGORIES } from './data.js'
import capi from '../../assets/separar/capi-promo.png'

export default function Separar() {
  return <SepararLayout title="¿Dónde va cada residuo?" backTo="/aprender" nav className="separar--hub">
    <div className="separar__grid">{CATEGORIES.map(category => <Link key={category.id} to={`/aprender/separar/${category.id}`} className="separar__category"><WasteArt category={category} /><div><h2 style={{ color: category.color }}>{category.id === 'papel' ? 'Papel y cartón' : category.title}</h2><p>{category.subtitle}</p></div></Link>)}</div>
    <Link to="/aprender/separar/juego" className="separar__promo"><div className="separar__capi"><img src={capi} alt="" aria-hidden="true" /></div><div><h2>Desafío Residuos</h2><p>Poné a prueba tus conocimientos sobre residuos con Capi y ganá puntos!</p><span>JUGAR</span></div></Link>
  </SepararLayout>
}
