import { useNavigate } from 'react-router-dom'

/**
 * Acción de la flecha "volver": regresa a la pantalla de la que vino el usuario.
 * Si se entró directo por URL (no hay pantalla anterior en la app), va a `fallback`.
 */
export default function useBack(fallback = '/inicio') {
  const navigate = useNavigate()
  return () => {
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate(fallback, { replace: true })
  }
}
