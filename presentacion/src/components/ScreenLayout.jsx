import useBack from '../hooks/useBack.js'
import PhoneFrame from './PhoneFrame.jsx'
import BackButton from './BackButton.jsx'
import signal from '../assets/reportar/signal.svg'
import wifi from '../assets/reportar/wifi.svg'
import battery from '../assets/reportar/battery.svg'
import back from '../assets/reportar/back.svg'
import '../styles/Separar.css'
import '../styles/Quiz.css'

/* Armazón de pantalla: mismo aspecto que SepararLayout (reusa sus clases), pero la flecha
   la decide cada pantalla con `onBack`; sin él vuelve a la pantalla anterior, o a `fallback`
   si se entró directo por URL y no hay pantalla anterior en la app. */
export default function ScreenLayout({ title, onBack, fallback = '/inicio', className = '', children }) {
  const goBack = useBack(fallback)
  return <PhoneFrame title={title}><div className={`separar ${className}`}><div className="separar__status" aria-hidden="true"><span>9:41</span><div><img src={signal} alt="" /><img src={wifi} alt="" /><img src={battery} alt="" /></div></div><main className="separar__content"><header className="separar__header"><BackButton className="separar__back" iconSrc={back} onBack={onBack || goBack} /><h1>{title}</h1></header>{children}</main></div></PhoneFrame>
}
