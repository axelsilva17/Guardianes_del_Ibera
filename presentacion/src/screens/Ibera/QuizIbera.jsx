import Quiz from '../Quiz/Quiz.jsx'

// Preguntas basadas en el contenido de "Cuidemos el Iberá" (Humedales, Fauna, Turismo y Acciones).
const QUESTIONS = [
  {
    question: '¿Por qué son importantes los humedales del Iberá?',
    options: ['Porque sirven para tirar residuos', 'Porque regulan el agua y albergan una gran biodiversidad', 'Porque no tienen ninguna función en la naturaleza', 'Porque conviene secarlos para construir'],
    correct: 1,
    explanation: 'Los humedales regulan el agua, albergan una gran biodiversidad y nos brindan aire limpio, alimentos y belleza natural.',
  },
  {
    question: 'Si ves un carpincho durante un paseo, ¿qué deberías hacer?',
    options: ['Darle algo de comer', 'Acercarte para sacarle una foto de cerca', 'Observarlo sin acercarte y sin molestarlo', 'Hacer ruido para que se mueva'],
    correct: 2,
    explanation: 'No alimentes ni molestes a los animales: observalos desde lejos y mantené la distancia.',
  },
  {
    question: '¿Qué hacés con tu basura cuando visitás el Iberá?',
    options: ['La dejo en el sendero', 'La entierro en la tierra', 'La tiro al agua', 'Me la llevo conmigo'],
    correct: 3,
    explanation: 'Hacer turismo responsable es disfrutar sin dejar huella: llevate toda tu basura.',
  },
  {
    question: '¿Cuál de estas acciones ayuda a cuidar los humedales?',
    options: ['Evitar el uso de plásticos descartables', 'Usar más bolsas y vasos descartables', 'Lavar envases en las lagunas', 'Arrojar restos de comida al agua'],
    correct: 0,
    explanation: 'Evitar los plásticos descartables y no contaminar el agua son formas simples de cuidarlos.',
  },
  {
    question: '¿Qué significan las señalizaciones en los senderos del Iberá?',
    options: ['Son solo decoración', 'Indican cómo cuidar el lugar y a la fauna, y hay que respetarlas', 'Se pueden ignorar si no hay guardaparques', 'Sirven únicamente para los turistas extranjeros'],
    correct: 1,
    explanation: 'Respetar las señalizaciones protege a la fauna, la flora y a vos.',
  },
]

export default function QuizIbera() {
  return <Quiz title="Desafío Guardián" questions={QUESTIONS} backTo="/aprender/ibera/juego" exitTo="/aprender/ibera" />
}
