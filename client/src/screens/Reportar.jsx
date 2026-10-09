import PhoneFrame from '../components/PhoneFrame.jsx'
import TopBar from '../components/TopBar.jsx'
import BottomNav from '../components/BottomNav.jsx'

export default function Reportar() {
  return (
    <PhoneFrame title="Reportar">
      <TopBar title="Reportar" />
      <main className="screen-body">
        <div className="placeholder">
          <h2 className="placeholder__title">Reportar</h2>
          <p className="placeholder__note">TODO: flujo para reportar un incidente.</p>
        </div>
      </main>
      <BottomNav />
    </PhoneFrame>
  )
}
