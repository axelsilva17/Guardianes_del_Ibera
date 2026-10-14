import logo from '../assets/images/logo-guardianes.svg'
import '../styles/Marca.css'

/**
 * Marca "GUARDIANES x Iberá": la misma en toda la app (Bienvenida, portales de comercio y municipio).
 * Devuelve el logo y el texto sueltos para que cada pantalla los acomode con su propio contenedor;
 * el tamaño sale del font-size de ese contenedor y todo lo demás está en em, así se ve igual en cualquier tamaño.
 * tono: "claro" (blanco, sobre fotos) u "oscuro" (verde, sobre fondos claros).
 */
export default function MarcaGuardianes({ tono = 'claro', conLogo = true, logoClassName = '' }) {
  return <>
    {conLogo && <img className={`marca__logo ${logoClassName}`.trim()} src={logo} alt="" aria-hidden="true" />}
    <span className={`marca__texto marca__texto--${tono}`} aria-hidden="true">GUARDIANES<span className="marca__ibera">x Iberá</span></span>
  </>
}
