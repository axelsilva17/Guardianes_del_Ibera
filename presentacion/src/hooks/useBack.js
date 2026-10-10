import { useNavigate } from 'react-router-dom'

/**
 * Acción de la flecha "volver": regresa a la pantalla de la que vino el usuario.
 * Si se entró directo por URL (no hay pantalla anterior en la app), va a `fallback`.
 * Con `section: true` (secciones de la barra de navegación) va siempre a `fallback`, el inicio.
 */
export default function useBack(fallback = '/inicio', { section = false } = {}) {
  const navigate = useNavigate()
  return () => {
    if (section) navigate(fallback)
    else if (window.history.state?.idx > 0) navigate(-1)
    else navigate(fallback, { replace: true })
  }
}
