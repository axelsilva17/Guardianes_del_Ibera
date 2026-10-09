import { useNavigate } from 'react-router-dom'
import { Leaf } from 'lucide-react'
import PhoneFrame from '../components/PhoneFrame.jsx'
import Button from '../components/Button.jsx'
import StatusBar from '../components/StatusBar.jsx'

/**
 * Onboarding splash (screen "01 Bienvenida").
 * Dark Iberá hero with layered wetland silhouettes and a single CTA that
 * starts the flow on the login screen.
 */
export default function Bienvenida() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Bienvenida">
      <div className="bienvenida">
        <div className="bienvenida__bg" aria-hidden="true" />
        <div className="bienvenida__landscape" aria-hidden="true">
          <span className="bienvenida__sun" />
          <span className="bienvenida__hill bienvenida__hill--back" />
          <span className="bienvenida__hill bienvenida__hill--mid" />
          <span className="bienvenida__hill bienvenida__hill--front" />
        </div>

        <div className="bienvenida__content">
          <StatusBar />

          <div className="bienvenida__hero">
            <span className="bienvenida__emblem" aria-hidden="true">
              <Leaf size={32} strokeWidth={1.9} />
            </span>
            <h1 className="bienvenida__brand">
              Guardianes
              <span className="bienvenida__brand-line">del Iberá</span>
            </h1>
            <p className="bienvenida__tagline">
              Reportá, aprendé y cuidá los humedales junto a nuestra comunidad.
            </p>
          </div>

          <div className="bienvenida__actions">
            <Button
              variant="secondary"
              className="bienvenida__cta"
              onClick={() => navigate('/login')}
            >
              Comenzar
            </Button>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
