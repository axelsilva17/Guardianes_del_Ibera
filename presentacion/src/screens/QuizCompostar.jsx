import Quiz from './Quiz/Quiz.jsx'

// Las explicaciones siguen el contenido de "Aprendé a compostar".
const QUESTIONS = [
  {
    question: '¿Qué es el compostaje?',
    options: ['Un proceso que transforma residuos orgánicos en abono natural', 'Una forma de convertir plástico en tierra', 'Una técnica para conservar la basura mezclada', 'Un método para quemar residuos del jardín'],
    correct: 0,
    explanation: 'Gracias a microorganismos y lombrices, los residuos orgánicos se transforman en compost o abono natural.',
  },
  {
    question: '¿Cuál de estos podés agregar a una compostera domiciliaria?',
    options: ['Restos de carne', 'Cáscaras de frutas y verdura', 'Aceite de cocina usado', 'Envases de plástico'],
    correct: 1,
    explanation: 'Las cáscaras de frutas y verduras se compostan; la carne, los aceites y los plásticos no van al compost.',
  },
  {
    question: '¿Qué característica debería tener un recipiente para compostar?',
    options: ['Permitir la circulación de aire y el drenaje del exceso de agua', 'Mantener siempre agua acumulada en el fondo', 'Ser completamente hermético', 'No tener tapa ni protección contra la lluvia'],
    correct: 0,
    explanation: 'El recipiente debe dejar entrar aire y evitar que se acumule demasiada agua.',
  },
  {
    question: '¿Cómo debe mantenerse la humedad del compost?',
    options: ['Sin controlar la humedad en ningún momento', 'Empapado y con agua acumulada', 'Completamente seco todo el tiempo', 'Húmedo, pero no empapado'],
    correct: 3,
    explanation: 'El compost tiene que estar húmedo pero no empapado. Si tiene mal olor, revisá la humedad y la ventilación.',
  },
  {
    question: '¿Cómo podés darte cuenta de que el compost está maduro y listo para usar?',
    options: ['Tiene mucha agua y libera líquido constantemente', 'Es oscuro, tiene olor similar al de la tierra y casi no se reconocen los restos originales', 'Está caliente y todavía contiene muchos restos frescos', 'Conserva la forma de las cáscaras y tiene olor a podrido'],
    correct: 1,
    explanation: 'Cuando se ve oscuro, huele a tierra y no se reconocen los restos, ya podés usarlo en macetas, huertas y jardines.',
  },
]

export default function QuizCompostar() {
  return <Quiz title="Desafío Compost" questions={QUESTIONS} backTo="/juego" exitTo="/compostar" />
}
