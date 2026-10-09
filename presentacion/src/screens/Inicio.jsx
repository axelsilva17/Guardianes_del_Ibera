import PhoneFrame from '../components/PhoneFrame.jsx'
import TopBar from '../components/TopBar.jsx'
import BottomNav from '../components/BottomNav.jsx'

export default function Inicio() {
  return (
    <PhoneFrame title="Inicio">
      <TopBar title="Inicio" />
      <main className="screen-body">
        <div className="placeholder">
          <h2 className="placeholder__title">Inicio</h2>
          <p className="placeholder__note">TODO: hub principal con resumen y puntos.</p>
        </div>
      </main>
      <BottomNav />
    </PhoneFrame>
  )
}
