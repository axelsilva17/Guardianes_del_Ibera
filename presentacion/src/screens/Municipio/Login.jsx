import { useNavigate } from 'react-router-dom'
import { UserRound, LockKeyhole } from 'lucide-react'
import PhoneFrame from '../../components/PhoneFrame.jsx'
import { StatusBar } from './MuniScreen.jsx'
import fondo from '../../assets/images/portada-estero.jpg'
// Misma marca que la Bienvenida y los portales (componente compartido).
import MarcaGuardianes from '../../components/MarcaGuardianes.jsx'

// Figma, Page 3: "Login municipal". Prototipo: cualquier usuario entra al panel.
export default function Login() {
  const navigate = useNavigate()
  function entrar(event) { event.preventDefault(); navigate('/municipio/panel') }
  return <PhoneFrame title="Municipio · Acceso">
    <div className="muni muni-login">
      <img className="muni-login__bg" src={fondo} alt="" aria-hidden="true" />
      <StatusBar />
      <main className="muni-login__content">
        <div className="muni-login__brand">
          <MarcaGuardianes />
        </div>
        <form className="muni-login__form" onSubmit={entrar}>
          <p className="muni-login__eyebrow">PLATAFORMA MUNICIPAL</p>
          <h1>Iniciar Sesión</h1>
          <p className="muni-login__intro">Gestioná, coordiná y hacé crecer el impacto ambiental en el Iberá</p>
          <label><span><UserRound size={14} aria-hidden="true" /> Email o usuario</span><input id="muni-usuario" name="usuario" placeholder="Usuario" autoComplete="username" /></label>
          <label><span><LockKeyhole size={14} aria-hidden="true" /> Contraseña</span><input id="muni-clave" name="clave" type="password" placeholder="Contraseña" autoComplete="current-password" /></label>
          <button type="submit" className="muni-btn">Entrar</button>
          <p className="muni-login__forgot">¿Olvidaste tu contraseña?</p>
        </form>
      </main>
    </div>
  </PhoneFrame>
}

