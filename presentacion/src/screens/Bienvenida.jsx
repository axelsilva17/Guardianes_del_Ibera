import { Link, useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import fondo from '../assets/images/portada-estero.webp'
import emblema from '../assets/images/logo-guardianes.svg'
import '../styles/Bienvenida.css'

/**
 * Pantalla de bienvenida (Figma "01 Bienvenida", nodo 22:34016).
 *
 * - Fondo: muelle sobre los esteros al atardecer (la misma foto que los portales de Municipio y Comercio).
 * - Marca "GUARDIANES x Iberá": logo en SVG + "GUARDIANES" (Montserrat) + "x Iberá" (Bilbo Swash Caps).
 *   Es texto real, así se ve nítido en cualquier pantalla.
 * - Lema y botón son elementos reales, centrados en columna.
 * - Debajo del botón, los accesos a los portales institucionales (comercio y municipio).
 */
export default function Bienvenida() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Bienvenida">
      <div className="bienvenida">
        <img className="bienvenida__fondo" src={fondo} alt="" aria-hidden="true" />
        <StatusBar />

        <main className="bienvenida__contenido">
          <h1 className="bienvenida__marca" aria-label="Guardianes x Iberá">
            <img className="bienvenida__emblema" src={emblema} alt="" aria-hidden="true" />
            <span className="bienvenida__nombre" aria-hidden="true">GUARDIANES<span className="bienvenida__ibera">x Iberá</span></span>
          </h1>
          <p className="bienvenida__lema">Naturaleza que nos une</p>

          <div className="bienvenida__pie">
            <button type="button" className="bienvenida__boton" onClick={() => navigate('/login')}>Comenzar</button>

            <nav className="bienvenida__accesos" aria-label="Acceso a los portales institucionales">
              <Link className="bienvenida__acceso" to="/comercio">Soy comercio</Link>
              <Link className="bienvenida__acceso" to="/municipio">Soy municipio</Link>
            </nav>
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}
