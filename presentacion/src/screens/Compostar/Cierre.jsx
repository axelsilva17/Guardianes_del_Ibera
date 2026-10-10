import { Link } from 'react-router-dom'
import LessonLayout, { Intro } from './LessonLayout.jsx'
import cierre from '../../assets/compostar/cierre.jpg'
import capi from '../../assets/separar/capi-promo.png'

export default function Cierre() {
  return <LessonLayout step={6} footer={<div className="compostar__actions compostar__actions--single"><Link to="/aprender" className="compostar__btn">Volver</Link></div>}>
    <Intro title="¡Listo! Ya sabés cómo compostar">Ahora podés empezar a transformar tus residuos en un abono natural y ayudar al ambiente.</Intro>
    <div className="compostar__closing"><img src={cierre} alt="Ciervito recostado entre plantas dice: ¡Cada pequeño gesto hace una gran diferencia!" /></div>
    <div className="compostar__spacer"><Link to="/juego" className="separar__promo compostar__promo"><div className="separar__capi"><img src={capi} alt="" aria-hidden="true" /></div><div><h2>Desafío Compost</h2><p>Poné a prueba tus conocimientos sobre compost con Capi y ganá puntos!</p><span>JUGAR</span></div></Link></div>
  </LessonLayout>
}
