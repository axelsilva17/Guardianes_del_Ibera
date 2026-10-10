import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ScreenLayout from '../../components/ScreenLayout.jsx'
import Button from '../../components/Button.jsx'
import Card from '../../components/Card.jsx'
import check from '../../assets/reportar/check.svg'

/* Cuestionario de opción múltiple compartido por los desafíos (Residuos, Compost...).
   `questions`: [{ question, options, correct, explanation }]. */
export default function Quiz({ title, questions, backTo, exitTo, exitLabel = 'Volver a aprender' }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null))
  const [confirmed, setConfirmed] = useState(false)
  const focus = useRef(null)
  const finished = step === questions.length
  const current = questions[step]
  const score = answers.reduce((total, answer, index) => total + (answer === questions[index].correct ? 10 : 0), 0)
  useEffect(() => { focus.current?.focus() }, [step])
  function select(index) { if (!confirmed) setAnswers(previous => previous.map((a, i) => i === step ? index : a)) }
  function next() { setConfirmed(false); setStep(step + 1) }
  function retry() { setAnswers(Array(questions.length).fill(null)); setConfirmed(false); setStep(0) }
  // Se llega desde la pantalla "Jugá con Capi": volver a ella sin apilarla otra vez en el historial,
  // así su flecha sigue llevando a donde estaba el usuario antes de jugar.
  function back() { if (window.history.state?.idx > 0) navigate(-1); else navigate(backTo, { replace: true }) }
  return <ScreenLayout title={title} onBack={back} className="separar--quiz quiz">{finished ? <>
    <section className="separar__result"><div className="separar__result-check"><img src={check} alt="" aria-hidden="true" /></div><h2 ref={focus} tabIndex={-1}>¡Desafío completado!</h2><p>Acertaste {score / 10} de {questions.length} preguntas.</p><strong>{score} / {questions.length * 10} puntos</strong><p>Seguí aprendiendo y cuidando el Iberá.</p></section><Button className="separar__quiz-action" onClick={retry}>Volver a jugar</Button><Button variant="secondary" onClick={() => navigate(exitTo)}>{exitLabel}</Button>
  </> : <><div className="separar__progress"><span>Pregunta {step + 1} de {questions.length}</span><progress max={questions.length} value={step + 1} aria-label={`Pregunta ${step + 1} de ${questions.length}`} /></div><Card className="separar__question"><h2 ref={focus} tabIndex={-1}>{current.question}</h2><div role="group" aria-label="Elegí una respuesta">{current.options.map((option, index) => <button key={option} type="button" disabled={confirmed} aria-pressed={answers[step] === index} className={`separar__answer${answers[step] === index ? ' is-selected' : ''}${confirmed && index === current.correct ? ' is-correct' : ''}${confirmed && answers[step] === index && index !== current.correct ? ' is-wrong' : ''}`} onClick={() => select(index)}>{option}</button>)}</div></Card>{confirmed && <p className="separar__feedback" role="status"><strong>{answers[step] === current.correct ? '¡Correcto!' : 'Seguí aprendiendo.'}</strong> {current.explanation}</p>}<Button className="separar__quiz-action" disabled={answers[step] === null} onClick={confirmed ? next : () => setConfirmed(true)}>{confirmed ? (step === questions.length - 1 ? 'Ver resultado' : 'Siguiente') : 'Comprobar'}</Button></>}</ScreenLayout>
}
