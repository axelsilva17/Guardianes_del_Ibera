// Usuario de ejemplo del prototipo: única fuente de nombre, puntos y nivel para todas las pantallas.
import explorador from '../assets/images/imagennivel.png'
import inicial from '../assets/nivel/guardian-inicial.png'
import activo from '../assets/nivel/guardian-activo.png'
import ibera from '../assets/nivel/guardian-ibera.png'
import protector from '../assets/nivel/protector.png'

export const USER = { name: 'Sofía', points: 650 }

export const LEVELS = [
  { name: 'Explorador', min: 0, max: 99, image: explorador },
  { name: 'Guardián Inicial', min: 100, max: 499, image: inicial },
  { name: 'Guardián Activo', min: 500, max: 999, image: activo },
  { name: 'Guardián del Iberá', min: 1000, max: 1999, image: ibera },
  { name: 'Protector del Iberá', min: 2000, image: protector },
]

/** Nivel actual, siguiente y avance (0–100) dentro del nivel actual. */
export function getProgress(points = USER.points) {
  const index = LEVELS.findLastIndex(l => points >= l.min)
  const level = LEVELS[index]
  const next = LEVELS[index + 1]
  const percent = next ? Math.round(((points - level.min) / (next.min - level.min)) * 100) : 100
  return { index, level, next, percent }
}
