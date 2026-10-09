import { useNavigate } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import StatusBar from '../components/StatusBar.jsx'
import fondo from '../assets/images/comenzar1.png'
import frente from '../assets/images/comenzar2.png'

/**
 * Onboarding splash (screen "01 Bienvenida", Figma node 22:34016).
 *
 * The screen is a two-layer composition exported from Figma:
 *
 *   - comenzar1.png (429x720): the wetland photograph. It fills the whole
 *     390x844 frame with `object-fit: cover`.
 *   - comenzar2.png (390x800): the foreground layer with the logo, the
 *     wordmark and the CTA. It is a transparent PNG whose width already
 *     matches the frame, and its height (800) is exactly the frame height
 *     minus the 44px status bar, so it starts right below it.
 *
 * The CTA is part of the artwork, so the real interactive element is a
 * transparent button laid exactly over the drawn one. Its geometry was
 * measured from the PNG (20px sides, 697px from the top of the layer,
 * 350x52 with rounded corners) so the visual stays faithful while keeping
 * navigation, focus and keyboard access working.
 */
export default function Bienvenida() {
  const navigate = useNavigate()

  return (
    <PhoneFrame title="Bienvenida">
      <div className="bienvenida">
        <img className="bienvenida__fondo" src={fondo} alt="" aria-hidden="true" />

        <div className="bienvenida__scene">
          <img className="bienvenida__arte" src={frente} alt="Guardianes del Iberá" />
          <button
            type="button"
            className="bienvenida__cta"
            onClick={() => navigate('/login')}
            aria-label="Comenzar"
          />
        </div>

        <StatusBar />
      </div>
    </PhoneFrame>
  )
}
