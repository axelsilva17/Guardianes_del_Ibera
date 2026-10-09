import PhoneFrame from '../components/PhoneFrame.jsx'
import TopBar from '../components/TopBar.jsx'
import BottomNav from '../components/BottomNav.jsx'

export default function Perfil() {
  return (
    <PhoneFrame title="Perfil">
      <TopBar title="Perfil" />
      <main className="screen-body">
        <div className="placeholder">
          <h2 className="placeholder__title">Perfil</h2>
          <p className="placeholder__note">TODO: perfil, puntos e insignias.</p>
        </div>
      </main>
      <BottomNav />
    </PhoneFrame>
  )
}
