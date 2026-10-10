import { Link, useNavigate } from 'react-router-dom'
import QuizLayout from './QuizLayout.jsx'
import Card from '../../components/Card.jsx'
import capi from '../../assets/separar/capi-juego.png'
import question from '../../assets/separar/question.svg'
import coins from '../../assets/separar/coins.svg'
import game from '../../assets/separar/game.svg'

/* Pantalla "Jugá con Capi" (Figma, Page 3: "Juego"), compartida por todos los desafíos.
   Sin `backTo`, la flecha vuelve a la pantalla anterior. */
export default function JuegoIntro({ backTo, playTo, total = 5 }) {
  const navigate = useNavigate()
  return <QuizLayout title="Jugá con Capi" onBack={backTo ? () => navigate(backTo) : undefined} className="separar--game quiz"><section className="separar__game-hero"><img src={capi} alt="Capi con un cuestionario" /><h2>¡Hora de poner todo lo aprendido a prueba!</h2><p>Respondé las preguntas y descubrí cuánto aprendiste sobre cuidar el Iberá.</p></section><div className="separar__rule-space"><Card className="separar__rule"><span className="separar__badge"><img src={question} alt="" aria-hidden="true" /></span><div><h2>{total} preguntas</h2><p>Opción múltiple</p></div></Card></div><Card className="separar__rule"><span className="separar__badge separar__badge--coins"><img src={coins} alt="" aria-hidden="true" /></span><div><h2>Sumá puntos</h2><p>+10 por cada correcta</p></div></Card><div className="separar__reminder-space"><aside className="separar__reminder"><h2>Recordatorio</h2><p>Podés reintentar el cuestionario las veces que quieras hasta acertar todas!</p></aside></div><Link className="separar__play" to={playTo}><img src={game} alt="" aria-hidden="true" />Jugar</Link></QuizLayout>
}
