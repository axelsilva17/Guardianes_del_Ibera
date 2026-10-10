import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../../components/PhoneFrame.jsx'
import { StatusBar } from './MuniScreen.jsx'
import fondo from '../../assets/municipio/login-fondo.png'
import emblema from '../../assets/municipio/emblema.svg'

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
          <img src={emblema} alt="" aria-hidden="true" />
          <p className="muni-login__name">MUNICIPIO <span>Iberá</span></p>
          <p className="muni-login__tagline">Gestión Ambiental</p>
        </div>
        <form className="muni-login__form" onSubmit={entrar}>
          <h1>Ingresar al sistema</h1>
          <label><span className="sr-only">Usuario</span><input id="muni-usuario" name="usuario" placeholder="Usuario" autoComplete="username" /></label>
          <label><span className="sr-only">Contraseña</span><input id="muni-clave" name="clave" type="password" placeholder="Contraseña" autoComplete="current-password" /></label>
          <button type="submit" className="muni-btn">Entrar</button>
          <p className="muni-login__forgot">¿Olvidaste tu contraseña?</p>
        </form>
      </main>
    </div>
  </PhoneFrame>
}
