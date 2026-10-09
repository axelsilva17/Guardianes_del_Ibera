import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import Button from '../components/Button.jsx'
import StatusBar from '../components/StatusBar.jsx'
import { GoogleIcon, AppleIcon } from '../components/BrandIcons.jsx'

export default function Login() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Login">
      <div className="login">
        <div className="login__bg" aria-hidden="true" />

        <div className="login__content">
          <StatusBar />

          <div className="login__hero">
            <h1 className="login__title">BIENVENIDO</h1>
            <p className="login__subtitle">Sumate a Guardianes</p>
          </div>

          <div className="login__access">
            <button type="button" className="login__oauth">
              <GoogleIcon size={20} />
              <span>Continuar con Google</span>
            </button>
            <button type="button" className="login__oauth">
              <AppleIcon size={20} />
              <span>Continuar con Apple</span>
            </button>
            <button
              type="button"
              className="login__register"
              onClick={() => navigate('/login')}
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
