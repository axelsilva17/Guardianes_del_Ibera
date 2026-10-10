import { Link } from 'react-router-dom'
import SepararLayout from './SepararLayout.jsx'
import Card from '../../components/Card.jsx'
import capi from '../../assets/separar/capi-juego.png'
import question from '../../assets/separar/question.svg'
import coins from '../../assets/separar/coins.svg'
import game from '../../assets/separar/game.svg'
export default function JuegoSeparar() {
  return <SepararLayout title="Jugá con Capi" className="separar--game"><section className="separar__game-hero"><img src={capi} alt="Capi con un cuestionario" /><h2>¡Hora de poner todo lo aprendido a prueba!</h2><p>Respondé las preguntas y descubrí cuánto aprendiste sobre cuidar el Iberá.</p></section><div className="separar__rule-space"><Card className="separar__rule"><span className="separar__badge"><img src={question} alt="" aria-hidden="true" /></span><div><h2>5 preguntas</h2><p>Opción múltiple</p></div></Card></div><Card className="separar__rule"><span className="separar__badge separar__badge--coins"><img src={coins} alt="" aria-hidden="true" /></span><div><h2>Sumá puntos</h2><p>+10 por cada correcta</p></div></Card><div className="separar__reminder-space"><aside className="separar__reminder"><h2>Recordatorio</h2><p>Podés reintentar el cuestionario las veces que quieras hasta acertar todas!</p></aside></div><Link className="separar__play" to="/aprender/separar/desafio"><img src={game} alt="" aria-hidden="true" />Jugar</Link></SepararLayout>
}
