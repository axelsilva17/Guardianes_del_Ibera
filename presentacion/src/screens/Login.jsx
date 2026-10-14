import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import Button from '../components/Button.jsx'
import StatusBar from '../components/StatusBar.jsx'
import { GoogleIcon, AppleIcon } from '../components/BrandIcons.jsx'
import emblema from '../assets/images/logo-guardianes.svg'
import fondoLogin from '../assets/images/portada-estero.webp'
import '../styles/LoginCiudadano.css'

export default function Login() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Login">
      <div className="login">
        <img
          className="login__fondo"
          src={fondoLogin}
          alt=""
          aria-hidden="true"
        />

        <div className="login__content">
          <StatusBar />

          {/* Emblema vectorial y texto real (antes una imagen exportada), igual que en Bienvenida. */}
          <div className="login__hero">
            <img className="login__emblema" src={emblema} alt="" aria-hidden="true" />
            <h1 className="login__titulo">BIENVENIDO</h1>
            <p className="login__subtitulo">Sumate a Guardianes</p>
          </div>

          <div className="login__access">
            <button type="button" className="login__oauth" onClick={() => navigate('/inicio')}>
              <GoogleIcon size={20} />
              <span>Continuar con Google</span>
            </button>
            <button type="button" className="login__oauth" onClick={() => navigate('/inicio')}>
              <AppleIcon size={20} />
              <span>Continuar con Apple</span>
            </button>
            <button
              type="button"
              className="login__register"
              onClick={() => navigate('/inicio')}
            >
              Crear cuenta
            </button>
          </div>

          <div className="login__others">
            <p className="login__others-label">o ingresá con tu cuenta</p>
            <Button
              variant="secondary"
              className="login__session"
              onClick={() => navigate('/inicio')}
            >
              Iniciar sesión
            </Button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
