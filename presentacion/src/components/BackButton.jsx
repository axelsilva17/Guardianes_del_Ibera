import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/**
 * Único botón "volver" del proyecto.
 *
 * Dueño del tamaño táctil (44x44, en `.backbtn`) y del reset visual: las clases
 * de posicionamiento que se le pasan (`mapa__back`, `aprender__back`,
 * `juego__back`, `topbar__back`) sólo fijan posición y decoración, nunca
 * `width`/`height`, para que el mínimo táctil no se pueda pisear por pantalla.
 *
 * Contrato: `navigate(-1)` por defecto, `onBack` para sobrescribir; `label`
 * sobrescribe el `aria-label`.
 */
export default function BackButton({
  className = '',
  label = 'Volver',
  onBack,
  size = 22,
}) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) onBack()
    else navigate(-1)
  }

  return (
    <button
      type="button"
      className={`backbtn${className ? ` ${className}` : ''}`}
      onClick={handleBack}
      aria-label={label}
    >
      <ChevronLeft size={size} aria-hidden="true" />
    </button>
  )
}