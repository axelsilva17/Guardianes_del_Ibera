import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

/**
 * Screen header. `align="left"` places the title next to the back button
 * (hub screens); the default centers it (legacy screens).
 */
export default function TopBar({
  title,
  showBack = false,
  onBack,
  right = null,
  align = 'center',
  className = '',
}) {
  const navigate = useNavigate()

  const handleBack = () => {
    if (onBack) onBack()
    // Sin pantalla anterior en la app (se entró directo por URL): volver a Inicio.
    else if (window.history.state?.idx > 0) navigate(-1)
    else navigate('/inicio', { replace: true })
  }

  return (
    <header className={`topbar${align === 'left' ? ' topbar--left' : ''}${className ? ` ${className}` : ''}`}>
      <div className="topbar__side">
        {showBack ? (
          <button
            type="button"
            className="topbar__back"
            onClick={handleBack}
            aria-label="Volver"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <h1 className="topbar__title">{title}</h1>
      <div className="topbar__side topbar__side--right">{right}</div>
    </header>
  )
}
