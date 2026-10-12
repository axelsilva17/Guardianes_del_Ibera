import { Link } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import BottomNav from '../components/BottomNav.jsx'
import useBack from '../hooks/useBack.js'
import avatar from '../assets/images/imagennivel.webp'
import '../styles/Perfil.css'

const assets = import.meta.glob('../assets/perfil/*.svg', { eager: true, query: '?url', import: 'default' })
const asset = (name) => assets[`../assets/perfil/${name}.svg`]
const navIcons = { '/inicio': asset('nav-home'), '/mapa': asset('nav-map'), '/reportar': asset('nav-report'), '/aprender': asset('nav-learn'), '/perfil': asset('nav-profile') }
const OPTIONS = [
  { id: 'account', title: 'Mi cuenta', to: '/perfil/mi-cuenta' },
  { id: 'rewards', title: 'Mis Canjes', to: '/recompensas' },
  { id: 'reports', title: 'Mis reportes', to: '/mis-reportes' },
  { id: 'notifications', title: 'Notificaciones', to: '/perfil/notificaciones' },
  { id: 'help', title: 'Ayuda', to: '/perfil/ayuda' },
]
function Icon({ name }) { return <img src={asset(name)} alt="" aria-hidden="true" /> }

export default function Perfil() {
  const goBack = useBack('/inicio', { section: true })

  return (
    <PhoneFrame title="Perfil">
      <div className="perfil">
        <div className="perfil__status" aria-hidden="true"><span>9:41</span><div><Icon name="signal" /><Icon name="wifi" /><Icon name="battery" /></div></div>
        <main className="perfil__content">
          <header className="perfil__header"><button type="button" onClick={goBack} aria-label="Volver"><Icon name="back" /></button><h1>Mi perfil</h1></header>
          <section className="perfil__identity" aria-label="Cuenta de ejemplo">
            <div className="perfil__avatar"><img src={avatar} alt="Mascota de Guardianes del Iberá" /></div>
            <div><h2>Sofía Martínez</h2><p>sofia@email.com</p></div>
          </section>
          <div className="perfil__options">
            {OPTIONS.map(({ id, title, to }) => {
              const content = <><Icon name={id} /><span>{title}</span><Icon name="chevron" /></>
              return <Link key={id} className="perfil__option" to={to}>{content}</Link>
            })}
          </div>
        </main>
        <BottomNav className="perfil__nav" icons={navIcons} />
      </div>
    </PhoneFrame>
  )
}

