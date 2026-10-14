import { Link, useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import fondo from '../assets/images/portada-estero.webp'
import MarcaGuardianes from '../components/MarcaGuardianes.jsx'
import '../styles/Bienvenida.css'

/**
 * Pantalla de bienvenida (Figma "01 Bienvenida", nodo 22:34016).
 *
 * - Fondo: muelle sobre los esteros al atardecer (la misma foto que los portales de Municipio y Comercio).
 * - Marca "GUARDIANES x Iberá": componente MarcaGuardianes (el mismo de los portales).
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
            <MarcaGuardianes logoClassName="bienvenida__emblema" />
          </h1>
          <p className="bienvenida__lema">Naturaleza que nos une</p>

          <div className="bienvenida__pie">
            <button type="button" className="bienvenida__boton" onClick={() => navigate('/login')}>Comenzar</button>

            <div className="bienvenida__accesos">
              <p className="bienvenida__accesos-titulo" id="bienvenida-accesos-titulo">¿Tenés un usuario institucional?</p>
              <nav className="bienvenida__accesos-enlaces" aria-labelledby="bienvenida-accesos-titulo">
                <Link className="bienvenida__acceso" to="/comercio">Soy comercio</Link>
                <Link className="bienvenida__acceso" to="/municipio">Soy municipio</Link>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </PhoneFrame>
  )
}
