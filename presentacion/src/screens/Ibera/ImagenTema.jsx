import { Sprite } from '../Compostar/LessonLayout.jsx'
import { USAR_FOTOS } from './data.js'
import temas from '../../assets/ibera/temas.webp'

/**
 * Imagen de un tema de "Cuidemos el Iberá": la foto real (prueba) o el recorte de la ilustración del Figma.
 * Las fotos usan una medida fija por lugar (ver .ibera__foto--thumb / --hero en Ibera.css),
 * así todas las tarjetas y todos los temas quedan iguales.
 */
export default function ImagenTema({ topic, variant }) {
  if (!USAR_FOTOS) return <Sprite src={temas} {...topic[variant]} />
  return <img className={`ibera__foto ibera__foto--${variant}`} src={topic.foto} alt={variant === 'hero' ? topic.fotoAlt : ''} aria-hidden={variant === 'hero' ? undefined : 'true'} style={{ objectPosition: topic.fotoPos }} />
}
