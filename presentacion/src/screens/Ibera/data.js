// Contenido de "Cuidemos el Iberá" (Figma, Page 3: "Cuidemos Ibera", "Cuidar Humedales",
// "Fauna Nativa", "Turismo Responsable" y "Acciones"). `thumb` y `hero` recortan la misma
// ilustración de cuatro escenas (assets/ibera/temas.webp).
import fotoHumedales from '../../assets/ibera/fotos/humedales.webp'
import fotoFauna from '../../assets/ibera/fotos/fauna.webp'
import fotoTurismo from '../../assets/ibera/fotos/turismo.webp'
import fotoAcciones from '../../assets/ibera/fotos/acciones.webp'

// Prueba: fotos reales en lugar de las ilustraciones. Con false vuelven las ilustraciones del Figma.
export const USAR_FOTOS = true

export const TOPICS = [
  {
    id: 'humedales', foto: fotoHumedales, fotoAlt: 'Laguna del Iberá cubierta de irupés', fotoPos: 'center', card: 'Humedales', cardText: 'Conocé por qué son importantes', title: 'Humedales',
    heading: '¿Por qué son importantes?', text: 'Los humedales del Iberá regulan el agua, albergan una gran biodiversidad y nos brindan aire limpio, alimentos y belleza natural.',
    listTitle: '¿Cómo podemos cuidarlos?', items: ['No tirar basura ni contaminarlos', 'Evitar el uso de plásticos descartables'],
    thumb: { box: { width: 121, height: 80 }, crop: { width: '208.87%', height: '211.4%', left: '-3.75%', top: '-5.18%' } },
    hero: { box: { width: 298, height: 197 }, crop: { width: '208.87%', height: '211.4%', left: '-3.75%', top: '-5.18%' } },
  },
  {
    id: 'fauna', foto: fotoFauna, fotoAlt: 'Carpinchos nadando entre camalotes', fotoPos: '30% center', card: 'Fauna nativa', cardText: 'Respetemos su hábitat', title: 'Fauna Nativa',
    heading: 'Respetemos su hábitat', text: 'El Iberá es el hogar de muchas especies únicas. No las alimentes, no las molestes y mantené la distancia.',
    listTitle: '¿Qué podés hacer?', items: ['Observá sin acercarte', 'No alimentes a los animales', 'Respetá las señalizaciones'],
    thumb: { box: { width: 119, height: 80 }, crop: { width: '208.49%', height: '207.11%', left: '-104.93%', top: '-3.55%' } },
    hero: { box: { width: 298, height: 200 }, crop: { width: '208.49%', height: '207.11%', left: '-104.93%', top: '-3.55%' } },
  },
  {
    id: 'turismo', foto: fotoTurismo, fotoAlt: 'Turistas en lancha mirando aves en los esteros', fotoPos: 'center', card: 'Turismo responsable', cardText: 'Disfrutá sin dejar huella', title: 'Turismo Responsable',
    heading: 'Disfrutá sin dejar huella', text: 'El turismo responsable permite conocer el Iberá sin dañar su entorno ni afectar a la fauna y flora.',
    listTitle: 'Recordá:', items: ['Llevá tu botella reutilizable', 'Llevate toda tu basura', 'Respetá las señalizaciones'],
    thumb: { box: { width: 126, height: 80 }, crop: { width: '208.16%', height: '219.35%', left: '-3.4%', top: '-111.29%' } },
    hero: { box: { width: 298, height: 189 }, crop: { width: '208.16%', height: '219.35%', left: '-3.4%', top: '-111.29%' } },
  },
  {
    id: 'acciones', foto: fotoAcciones, fotoAlt: 'Dos personas cuidando la orilla de una laguna', fotoPos: '35% center', card: 'Pequeñas acciones', cardText: 'Grandes cambios', title: 'Pequeñas Acciones',
    heading: 'Sumemos hábitos', text: 'Cada acción cuenta. Entre todos podemos cuidar el Iberá y construir un futuro mejor.',
    listTitle: 'Algunas ideas', items: ['Ahorrá agua y energía', 'Evitá el uso de plásticos descartables', 'Cuidá los espacios públicos', 'No arrojes basura'],
    thumb: { box: { width: 125, height: 80 }, crop: { width: '208.16%', height: '217.02%', left: '-104.42%', top: '-109.57%' } },
    hero: { box: { width: 298, height: 191 }, crop: { width: '208.16%', height: '217.02%', left: '-104.42%', top: '-109.57%' } },
  },
]
