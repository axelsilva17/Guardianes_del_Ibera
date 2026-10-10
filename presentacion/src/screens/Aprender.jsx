import { Link } from 'react-router-dom'
import SepararLayout from './Separar/SepararLayout.jsx'
import mascotas from '../assets/images/aprender-mascotas.png'
import '../styles/Aprender.css'

// Figma, Page 3: "07 · Aprender". Las tres ilustraciones son recortes de la misma imagen.
const TOPICS = [
  {
    id: 'residuos',
    title: 'Aprendé a separar',
    description: 'Descubrí junto a Lobito dónde va cada residuo y cómo clasificarlo',
    to: '/aprender/separar',
    tone: 'water',
    crop: { width: '313.47%', height: '175.34%', left: '-110.2%', top: '-40.75%' },
  },
  {
    id: 'compost',
    title: 'Aprendé a compostar',
    description: 'Transformá tus residuos orgánicos junto a Ciervito en algo útil para la tierra',
    to: '/compostar',
    tone: 'leaf',
    crop: { width: '281.32%', height: '162.03%', left: 0, top: '-31.01%' },
  },
  {
    id: 'ibera',
    title: 'Cuidemos el Iberá',
    description: 'Conocé con Melito pequeños hábitos que ayudan a proteger nuestro entorno',
    to: '/aprender/ibera',
    tone: 'sand',
    crop: { width: '295.38%', height: '192.48%', left: '-195.38%', top: '-50.75%' },
  },
]

export default function Aprender() {
  return (
    <SepararLayout title="Aprendé" backTo="/inicio" nav className="aprender-hub">
      {TOPICS.map(({ id, title, description, to, tone, crop }) => (
        <Link key={id} to={to} className={`aprender-hub__card aprender-hub__card--${tone}`}>
          <span className="aprender-hub__art" aria-hidden="true"><img src={mascotas} alt="" style={crop} /></span>
          <span className="aprender-hub__body">
            <strong>{title}</strong>
            <span>{description}</span>
            <span className="aprender-hub__more">Explorar tema →</span>
          </span>
        </Link>
      ))}
    </SepararLayout>
  )
}
