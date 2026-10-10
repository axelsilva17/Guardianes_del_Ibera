import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame.jsx'
import BottomNav from '../components/BottomNav.jsx'
import Button from '../components/Button.jsx'
import useBack from '../hooks/useBack.js'
import avatar from '../assets/images/imagennivel.png'
import '../styles/Perfil.css'

const assets = import.meta.glob('../assets/perfil/*.svg', { eager: true, query: '?url', import: 'default' })
const asset = (name) => assets[`../assets/perfil/${name}.svg`]
const navIcons = { '/inicio': asset('nav-home'), '/mapa': asset('nav-map'), '/reportar': asset('nav-report'), '/aprender': asset('nav-learn'), '/perfil': asset('nav-profile') }
const OPTIONS = [
  { id: 'account', title: 'Mi cuenta' },
  { id: 'rewards', title: 'Mis Canjes', to: '/recompensas' },
  { id: 'reports', title: 'Mis reportes', to: '/mis-reportes' },
  { id: 'notifications', title: 'Notificaciones' },
  { id: 'help', title: 'Ayuda' },
]
const DETAILS = {
  account: { title: 'Mi cuenta', text: 'Sofía Martínez y sofia@email.com son los datos de ejemplo de este prototipo. La gestión de cuentas todavía no está disponible.' },
  rewards: { title: 'Mis Canjes', text: 'La gestión de canjes todavía no está disponible en este prototipo.' },
  notifications: { title: 'Notificaciones', text: 'Las notificaciones todavía no están disponibles en este prototipo.' },
  help: { title: 'Ayuda', text: 'Usá Reportar para enviar una foto, tu ubicación y una descripción del problema. En Aprender podés explorar el contenido educativo y participar del desafío.' },
}
function Icon({ name }) { return <img src={asset(name)} alt="" aria-hidden="true" /> }

export default function Perfil() {
  const goBack = useBack('/inicio')
  const [detail, setDetail] = useState(null)
  const dialog = useRef(null)
  useEffect(() => {
    if (detail && dialog.current && !dialog.current.open) dialog.current.showModal()
  }, [detail])
  function closeDetail() { dialog.current?.close(); setDetail(null) }

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
              return to ? <Link key={id} className="perfil__option" to={to}>{content}</Link> : <button key={id} type="button" className="perfil__option" onClick={() => setDetail(DETAILS[id])} aria-haspopup="dialog">{content}</button>
            })}
          </div>
        </main>
        <BottomNav className="perfil__nav" icons={navIcons} />
        <dialog ref={dialog} className="perfil__dialog" aria-labelledby="perfil-detail-title" onCancel={() => setDetail(null)} onClose={() => setDetail(null)}>
          {detail && <><h2 id="perfil-detail-title">{detail.title}</h2><p>{detail.text}</p><Button onClick={closeDetail} autoFocus>Cerrar</Button></>}
        </dialog>
      </div>
    </PhoneFrame>
  )
}
