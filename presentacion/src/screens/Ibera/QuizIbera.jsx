import Quiz from '../Quiz/Quiz.jsx'

// Preguntas y opciones de Figma (Page 3, "Frame 52"–"Frame 56", junto a "Juego 3").
// Las respuestas correctas y las explicaciones siguen el contenido de "Cuidemos el Iberá".
const QUESTIONS = [
  {
    question: '¿Por qué son importantes los humedales del Iberá?',
    options: ['Porque albergan biodiversidad y ayudan a mantener el equilibrio natural', 'Porque impiden que crezcan plantas y árboles', 'Porque sirven únicamente para atraer turistas', 'Porque toda el agua que contienen es potable'],
    correct: 0,
    explanation: 'Los humedales regulan el agua, albergan una gran biodiversidad y nos brindan aire limpio, alimentos y belleza natural.',
  },
  {
    question: 'Si encontrás un carpincho u otro animal durante una visita al Iberá, ¿qué deberías hacer?',
    options: ['Seguirlos hasta que se acerquen', 'Acercarte para darles comida', 'Intentar tocarlos para sacar una foto', 'Mantener la distancia y observar sin molestarlos'],
    correct: 3,
    explanation: 'No alimentes ni molestes a los animales: observalos desde lejos y mantené la distancia.',
  },
  {
    question: '¿Cuál es una buena práctica al visitar un sendero o mirador del Iberá?',
    options: ['Salir del sendero para acercarte a los animales', 'Arrancar plantas como recuerdo de la visita', 'Dejar los residuos escondidos entre las plantas', 'Llevarte los residuos y respetar los senderos señalizados'],
    correct: 3,
    explanation: 'Hacer turismo responsable es disfrutar sin dejar huella: llevate tu basura y respetá las señalizaciones.',
  },
  {
    question: 'Estás de picnic cerca de una laguna y terminaste de comer. ¿Qué acción ayuda a cuidar el lugar?',
    options: ['Enterrar los residuos para que nadie los vea', 'Tirar los restos de comida al agua', 'Dejar los envoltorios junto a un árbol', 'Guardar los residuos y llevarlos a un cesto adecuado'],
    correct: 3,
    explanation: 'No tirar basura ni contaminar el agua es la mejor forma de cuidar los humedales.',
  },
  {
    question: '¿Cuál de estas acciones cotidianas ayuda a proteger el Iberá?',
    options: ['Usar una botella reutilizable y evitar descartables', 'Quemar la basura del patio', 'Arrojar aceite usado por la pileta', 'Dejar la canilla abierta mientras lavás los platos'],
    correct: 0,
    explanation: 'Cada acción cuenta: evitar los plásticos descartables y ahorrar agua y energía ayuda a cuidar el Iberá.',
  },
]

export default function QuizIbera() {
  return <Quiz title="Desafío Guardián" questions={QUESTIONS} backTo="/aprender/ibera/juego" exitTo="/aprender/ibera" />
}
