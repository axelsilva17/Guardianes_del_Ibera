import { Signal, Wifi, BatteryFull } from 'lucide-react'

/** iOS-style status bar shared by every screen mock. Decorative, hidden from AT. */
export default function StatusBar({ time = '9:41' }) {
  return (
    <div className="statusbar" aria-hidden="true">
      <span className="statusbar__time">{time}</span>
      <div className="statusbar__icons">
        <Signal size={16} strokeWidth={2.6} />
        <Wifi size={15} strokeWidth={2.6} />
        <BatteryFull size={21} strokeWidth={1.8} />
      </div>
    </div>
  )
}
