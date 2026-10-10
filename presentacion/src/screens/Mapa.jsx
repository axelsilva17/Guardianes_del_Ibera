import { useState } from 'react'
import useBack from '../hooks/useBack.js'
import { Flag } from 'lucide-react'
import PhoneFrame from '../components/PhoneFrame.jsx'
import BottomNav from '../components/BottomNav.jsx'
import StatusBar from '../components/StatusBar.jsx'
import MapMarker from '../components/MapMarker.jsx'

/** Markers in canvas coordinates (x, y) mirroring the Figma source. */
const MARKERS = [
  { id: 'report-1', variant: 'report', x: 239, y: 213 },
  { id: 'green-1', variant: 'green', x: 42, y: 248 },
  { id: 'green-2', variant: 'green', x: 286, y: 304 },
  { id: 'green-3', variant: 'green', x: 97, y: 478 },
  { id: 'green-4', variant: 'green', x: 281, y: 545 },
]

const CONTENT_TOP = 44

export default function Mapa() {
  const goBack = useBack('/inicio')
  const [filter, setFilter] = useState('green')
  return (
    <PhoneFrame title="Mapa">
      <div className="mapa">
        <StatusBar />

        <div className="mapa__canvas">
          <div className="mapa__surface" aria-hidden="true" />

          <header className="mapa__header">
            <button type="button" className="mapa__back" aria-label="Volver" onClick={goBack}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15 5 8 12l7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h1 className="mapa__title">Mapa</h1>
          </header>

          <div className="mapa__filters" role="group" aria-label="Filtrar puntos en el mapa">
            <button type="button" className={`mapa__filter${filter === 'green' ? ' mapa__filter--active' : ''}`} aria-pressed={filter === 'green'} onClick={() => setFilter('green')}>
              Puntos verdes
            </button>
            <button type="button" className={`mapa__filter${filter === 'report' ? ' mapa__filter--active' : ''}`} aria-pressed={filter === 'report'} onClick={() => setFilter('report')}>
              Reportes
            </button>
          </div>

          <div className="mapa__legend">
            <span className="mapa__legend-item mapa__legend-item--green">
              <span className="mapa__legend-swatch mapa__legend-swatch--green" aria-hidden="true" />
              Punto verde
            </span>
            <span className="mapa__legend-item mapa__legend-item--report">
              <span className="mapa__legend-swatch mapa__legend-swatch--report" aria-hidden="true" />
              Reporte
            </span>
          </div>

          {MARKERS.filter((m) => m.variant === filter).map((m) => (
            <MapMarker
              key={m.id}
              variant={m.variant}
              icon={m.variant === 'report' ? <Flag size={11} strokeWidth={2.6} color="#fff" /> : null}
              style={{ left: `${m.x}px`, top: `${m.y - CONTENT_TOP}px` }}
            />
          ))}
        </div>

        <BottomNav />
      </div>
    </PhoneFrame>
  )
}
