import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import fondo from '../assets/images/bienvenida-fondo.webp'
import emblema from '../assets/municipio/emblema.svg'
import '../styles/Bienvenida.css'

/**
 * Pantalla de bienvenida (Figma "01 Bienvenida", nodo 22:34016).
 *
 * - Fondo: foto de los carpinchos al atardecer, a pantalla completa.
 * - Logo: emblema vectorial + "GUARDIANES" (Montserrat) + "Iberá" (Bilbo Swash Caps), como en
 *   el Figma (Page 2, "Marca"). Es texto real, así se ve nítido en cualquier pantalla.
 * - Lema y botón son elementos reales, centrados en columna.
 */
export default function Bienvenida() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Bienvenida">
      <div className="bienvenida">
        <img className="bienvenida__fondo" src={fondo} alt="" aria-hidden="true" />
        <StatusBar />

        <main className="bienvenida__contenido">
          <h1 className="bienvenida__marca" aria-label="Guardianes del Iberá">
            <img className="bienvenida__emblema" src={emblema} alt="" aria-hidden="true" />
            <span className="bienvenida__nombre" aria-hidden="true">GUARDIANES<span className="bienvenida__ibera">Iberá</span></span>
          </h1>
          <p className="bienvenida__lema">Naturaleza que nos une</p>

          <div className="bienvenida__pie">
            <button type="button" className="bienvenida__boton" onClick={() => navigate('/login')}>Comenzar</button>
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}
