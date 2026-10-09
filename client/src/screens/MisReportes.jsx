import PhoneFrame from '../components/PhoneFrame.jsx'
import TopBar from '../components/TopBar.jsx'

export default function MisReportes() {
  return (
    <PhoneFrame title="Mis reportes">
      <TopBar title="Mis reportes" showBack />
      <main className="screen-body">
        <div className="placeholder">
          <h2 className="placeholder__title">Mis reportes</h2>
          <p className="placeholder__note">TODO: historial de reportes del usuario.</p>
        </div>
      </main>
    </PhoneFrame>
  )
}
