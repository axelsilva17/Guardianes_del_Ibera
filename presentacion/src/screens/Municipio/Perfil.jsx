import { Link } from 'react-router-dom'
import { MapPin, ChevronRight, LogOut } from 'lucide-react'
import MuniScreen, { Icon } from './MuniScreen.jsx'

// No está en el Figma: acceso a Puntos verdes y salida del panel municipal.
export default function Perfil() {
  return <MuniScreen title="Perfil">
    <div className="muni-perfil"><strong>Gestión Ambiental</strong><span>Municipio de Colonia Carlos Pellegrini</span></div>
    <div className="muni-list">
      <Link to="/municipio/puntos-verdes" className="muni-row"><Icon as={MapPin} color="#138548" /><span className="muni-row__info"><strong>Puntos verdes</strong><span>Crear y editar puntos de reciclaje</span></span><Icon as={ChevronRight} color="#75908f" size={22} /></Link>
      <Link to="/municipio" className="muni-row"><Icon as={LogOut} color="#e56d6c" /><span className="muni-row__info"><strong>Cerrar sesión</strong></span></Link>
    </div>
  </MuniScreen>
}
