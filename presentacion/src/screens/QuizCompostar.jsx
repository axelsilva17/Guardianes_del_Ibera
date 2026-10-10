import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import BackButton from '../components/BackButton.jsx'
import BottomNav from '../components/BottomNav.jsx'

const QUESTIONS = [
  {
    id: 1,
    question: '¿Qué es el compostaje?',
    options: [
      'Un proceso que transforma residuos orgánicos en abono natural',
      'Una forma de convertir plástico en tierra',
      'Una técnica para conservar la basura mezclada',
      'Un método para quemar residuos del jardín',
    ],
    correct: 0,
  },
  {
    id: 2,
    question: '¿Cuál de estos podés agregar a una compostera domiciliaria?',
    options: [
      'Restos de carne',
      'Cáscaras de frutas y verdura',
      'Aceite de cocina usado',
      'Envases de plástico',
    ],
    correct: 1,
  },
  {
    id: 3,
    question: '¿Qué característica debería tener un recipiente para compostar?',
    options: [
      'Permitir la circulación de aire y el drenaje del exceso de agua',
      'Mantener siempre agua acumulada en el fondo',
      'Ser completamente hermético',
      'No tener tapa ni protección contra la lluvia',
    ],
    correct: 0,
  },
  {
    id: 4,
    question: '¿Cómo debe mantenerse la humedad del compost?',
    options: [
      'Sin controlar la humedad en ningún momento',
      'Empapado y con agua acumulada',
      'Completamente seco todo el tiempo',
      'Húmedo, pero no empapado',
    ],
    correct: 3,
  },
  {
    id: 5,
    question: '¿Cómo podés darte cuenta de que el compost está maduro y listo para usar?',
    options: [
      'Tiene mucha agua y libera líquido constantemente',
      'Es oscuro, tiene olor similar al de la tierra y casi no se reconocen los restos originales',
      'Está caliente y todavía contiene muchos restos frescos',
      'Conserva la forma de las cáscaras y tiene olor a podrido',
    ],
    correct: 1,
  },
]

export default function QuizCompostar() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0..4 = preguntas, 5 = resultado
  const [answers, setAnswers] = useState(new Array(QUESTIONS.length).fill(null))

  const current = QUESTIONS[step]
  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length * 10

  const handleSelect = (idx) => {
    const nextAnswers = [...answers]
    nextAnswers[step] = idx
    setAnswers(nextAnswers)
  }

  const handleNext = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(step + 1)
    } else {
      setStep(QUESTIONS.length)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
    else navigate('/juego')
  }

  return (
    <PhoneFrame title="Desafío Compost">
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: 'var(--surface)' }}>
        <StatusBar />
        <BackButton className="compostar__back" onBack={handleBack} />

        <header style={{ padding: '0 24px' }}>
          <h1 className="juego__title" style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-ink)', margin: '12px 0 4px' }}>
            Desafío Compost
          </h1>
          <div className="comp-progress" aria-label={`Pregunta ${step + 1} de ${QUESTIONS.length}`}>
            <div className="comp-progress__track">
              <div className="comp-progress__fill" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
            </div>
            <span className="comp-progress__label">{step + 1} de {QUESTIONS.length}</span>
          </div>
        </header>

        <main style={{ flex: 1, padding: '16px 24px', overflowY: 'auto' }}>
          {step < QUESTIONS.length ? (
            <>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)', marginBottom: '16px', lineHeight: '1.4' }}>
                {current.question}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {current.options.map((opt, i) => {
                  const selected = answers[step] === i
                  const isCorrect = i === current.correct
                  let borderColor = 'var(--color-border)'
                  let bg = 'var(--surface-raised)'
                  if (selected && step === QUESTIONS.indexOf(current) && answers[step] !== null) {
                    borderColor = isCorrect ? '#138548' : '#e56d6c'
                    bg = isCorrect ? '#f0f7f2' : '#fdf2f2'
                  }
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelect(i)}
                      style={{
                        textAlign: 'left',
                        padding: '14px 16px',
                        borderRadius: '12px',
                        border: `2px solid ${borderColor}`,
                        background: bg,
                        color: 'var(--color-ink)',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        fontWeight: 500,
                      }}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#138548', marginBottom: '8px' }}>
                ¡Listo!
              </h2>
              <p style={{ fontSize: '16px', color: 'var(--comp-ink-soft)', marginBottom: '24px' }}>
                Tu puntaje: <strong style={{ color: '#138548' }}>{score} / 50</strong>
              </p>
              <div style={{ background: '#FAF3DF', borderRadius: '12px', border: '1px solid #EFE5C5', padding: '20px' }}>
                <p style={{ margin: 0, fontSize: '14px', color: '#45534d', lineHeight: '1.5' }}>
                  Cada pequeño gesto hace una gran diferencia. Seguí aprendiendo y cuidando el Iberá.
                </p>
              </div>
            </div>
          )}
        </main>

        <footer style={{ padding: '16px 24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          {step === QUESTIONS.length ? (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); navigate('/juego') }}
              className="button button--primary"
              aria-label="Volver al juego"
            >
              Volver
            </a>
          ) : (
            <>
              {answers[step] !== null && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="button button--primary"
                  aria-label={step === QUESTIONS.length - 1 ? 'Ver resultado' : 'Siguiente'}
                >
                  {step === QUESTIONS.length - 1 ? 'Ver resultado' : 'Siguiente'}
                </button>
              )}
            </>
          )}
        </footer>
      </div>
    </PhoneFrame>
  )
}
