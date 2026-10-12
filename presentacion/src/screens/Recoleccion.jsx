import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, Search, ChevronRight, CalendarDays, Clock3, Bell } from 'lucide-react'
import ScreenLayout from '../components/ScreenLayout.jsx'
import '../styles/Recoleccion.css'
import guacamayoListo from '../assets/recoleccion/guacamayo-listo.webp'

const STORAGE_KEY = 'guardianes-recoleccion-avisos'
const BARRIOS = ['Centro', 'Barrio Norte']
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()
function readPreference() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) } catch { return null }
}

export default function Recoleccion() {
  const navigate = useNavigate()
  const [step, setStep] = useState('buscar')
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState('')
  const [detail, setDetail] = useState('')
  const [message, setMessage] = useState('')
  const [locating, setLocating] = useState(false)
  const [enabled, setEnabled] = useState(() => Boolean(readPreference()?.enabled))
  const results = BARRIOS.filter(b => !query || normalize(`${b} Ituzaingó`).includes(normalize(query)))

  function search(event) {
    event.preventDefault()
    if (!selected) { setMessage('Elegí un barrio de la lista para consultar sus horarios.'); return }
    setMessage('')
    setStep('horarios')
  }
  function locate() {
    if (!navigator.geolocation) { setMessage('Tu navegador no permite obtener la ubicación. Buscá tu barrio.'); return }
    setLocating(true)
    setMessage('')
    navigator.geolocation.getCurrentPosition(() => {
      setLocating(false)
      setMessage('Ubicación obtenida. Elegí tu barrio: la identificación automática todavía no está disponible.')
    }, () => {
      setLocating(false)
      setMessage('No pudimos acceder a tu ubicación. Podés buscar y elegir tu barrio.')
    }, { timeout: 10000 })
  }
  function toggleNotifications() {
    const next = !enabled
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ enabled: next, barrio: selected }))
      setEnabled(next)
      setMessage('')
      if (next) setStep('listo')
    } catch { setMessage('No se pudo guardar la preferencia en este navegador. Intentá de nuevo.') }
  }
  function back() {
    if (step === 'listo') setStep('horarios')
    else if (detail) setDetail('')
    else if (step === 'horarios') setStep('buscar')
    else navigate('/inicio')
  }
  return <ScreenLayout title="Recolección de Residuos" className="recoleccion" onBack={back}>
    {step === 'buscar' ? <form className="recoleccion__flow" onSubmit={search}>
      <section className="recoleccion__intro"><div className="recoleccion__art-slot"><img src={guacamayoListo} alt="Guacamayo con las alas abiertas" /></div><p>Consultá días, horarios y recorridos de tu barrio</p></section>
      <button type="button" className="recoleccion__location" onClick={locate} disabled={locating}><MapPin size={32} /><span><strong>Tu ubicación</strong><small>{locating ? 'Buscando ubicación…' : 'Usar mi ubicación actual'}</small></span><ChevronRight size={22} /></button>
      <label className="recoleccion__search"><Search size={18} /><input aria-label="Ingresá tu barrio o dirección" placeholder="Ingresá tu barrio o dirección" value={query} onChange={e => { setQuery(e.target.value); setSelected(''); setMessage('') }} /></label>
      <fieldset className="recoleccion__results"><legend>Barrios disponibles · Ituzaingó</legend>{results.length ? results.map(barrio => <label key={barrio}><input type="radio" name="barrio" value={barrio} checked={selected === barrio} onChange={() => { setSelected(barrio); setMessage('') }} /><span>{barrio}</span></label>) : <p>No encontramos ese barrio. Probá con Centro o Barrio Norte.</p>}</fieldset>
      <p className="recoleccion__demo">Datos de ejemplo de Ituzaingó. Los horarios municipales aún no están conectados.</p>
      {message && <p role="status" className="recoleccion__message">{message}</p>}
      <button className="recoleccion__primary" type="submit">Buscar</button>
    </form> : step === 'horarios' ? <div className="recoleccion__flow">
      <div className="recoleccion__city"><MapPin size={18} /><span>Ituzaingó · {selected}</span><button onClick={() => { setStep('buscar'); setDetail('') }}>Cambiar</button></div>
      <section className="recoleccion__section"><h2>Próxima recolección</h2><div className="recoleccion__row"><CalendarDays className="recoleccion__calendar" size={28} /><span><strong>Lunes 14 de noviembre</strong><small>06:00 a 22:00 hs</small></span></div></section>
      <section className="recoleccion__section"><h2>Horarios por barrio</h2>{BARRIOS.map(b => <button key={b} className="recoleccion__row" onClick={() => setDetail(detail === b ? '' : b)} aria-expanded={detail === b}><Clock3 size={20} /><span><strong>{b}</strong><small>06:00 a 22:00 hs</small></span><ChevronRight size={20} /></button>)}{detail && <div className="recoleccion__detail"><strong>{detail}</strong><p>Horario de ejemplo: 06:00 a 22:00 hs.</p><p>El recorrido y los días oficiales están pendientes de información municipal.</p></div>}</section>
      <p className="recoleccion__demo">Calendario ilustrativo del diseño; no corresponde a una próxima fecha real.</p>
      {message && <p role="status" className="recoleccion__message">{message}</p>}
      <button className="recoleccion__notifications" role="switch" aria-checked={enabled} onClick={toggleNotifications}><Bell size={26} /><span><strong>Activar notificaciones</strong><small>Recibí avisos cuando el camión esté en tu zona</small></span><span className={`recoleccion__switch ${enabled ? 'is-enabled' : ''}`} /></button>
    </div> : <div className="recoleccion__flow recoleccion__done">
      <div className="recoleccion__art-slot recoleccion__art-slot--done"><img src={guacamayoListo} alt="Guacamayo con las alas abiertas" /></div>
      <h2>¡Listo!</h2><p>Guardamos tu preferencia de notificaciones.</p>
      <div className="recoleccion__row recoleccion__notice"><Bell size={28} /><span>Vas a recibir avisos cuando se conecte el servicio de recolección de tu zona.</span></div>
      <p className="recoleccion__demo">Por ahora es una demostración: no se envían notificaciones reales.</p>
      <Link className="recoleccion__primary" to="/inicio">Volver al inicio</Link>
    </div>}
  </ScreenLayout>
}
