import useBack from '../../hooks/useBack.js'
import PhoneFrame from '../../components/PhoneFrame.jsx'
import BackButton from '../../components/BackButton.jsx'
import BottomNav from '../../components/BottomNav.jsx'
import residuos from '../../assets/separar/residuos.png'
import signal from '../../assets/reportar/signal.svg'
import wifi from '../../assets/reportar/wifi.svg'
import battery from '../../assets/reportar/battery.svg'
import back from '../../assets/reportar/back.svg'
import home from '../../assets/perfil/nav-home.svg'
import map from '../../assets/perfil/nav-map.svg'
import report from '../../assets/perfil/nav-report.svg'
import learn from '../../assets/separar/nav-learn.svg'
import profile from '../../assets/separar/nav-profile.svg'
import '../../styles/Separar.css'

export function WasteArt({ category, hero = false }) {
  const organicHero = hero && category.id === 'organicos'
  return <div className="separar__art" style={{ width: category.width, height: organicHero ? 62 : category.height }}><img src={residuos} alt="" aria-hidden="true" style={{ ...category.crop, ...(organicHero ? { height: '394.08%', top: '-55.88%' } : {}) }} /></div>
}
export default function SepararLayout({ title, backTo = '/aprender/separar', section = false, children, nav = false, className = '' }) {
  const goBack = useBack(backTo, { section })
  return <PhoneFrame title={title}><div className={`separar ${className}`}><div className="separar__status" aria-hidden="true"><span>9:41</span><div><img src={signal} alt="" /><img src={wifi} alt="" /><img src={battery} alt="" /></div></div><main className="separar__content"><header className="separar__header"><BackButton className="separar__back" iconSrc={back} onBack={goBack} /><h1>{title}</h1></header>{children}</main>{nav && <BottomNav className="separar__nav" icons={{ '/inicio': home, '/mapa': map, '/reportar': report, '/aprender': learn, '/perfil': profile }} />}</div></PhoneFrame>
}
