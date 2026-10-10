import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import useBack from '../hooks/useBack.js'
import PhoneFrame from '../components/PhoneFrame.jsx'
import BottomNav from '../components/BottomNav.jsx'
import StatusBar from '../components/StatusBar.jsx'
import mapa from '../assets/mapa/mapa.png'
import pinReporte from '../assets/mapa/pin-reporte.svg'
import pinReporteIcono from '../assets/mapa/pin-reporte-icono.svg'
import pinVerde from '../assets/mapa/pin-verde.svg'
import reciclaje from '../assets/mapa/reciclaje.svg'
import pin from '../assets/mapa/pin.svg'
import caminar from '../assets/mapa/caminar.svg'
import linea from '../assets/mapa/linea.svg'
import botella from '../assets/mapa/botella.svg'
import caja from '../assets/mapa/caja.svg'
import vidrio from '../assets/mapa/vidrio.svg'
import lata from '../assets/mapa/lata.svg'
import reloj from '../assets/mapa/reloj.svg'
import llegar from '../assets/mapa/llegar.svg'
import compartir from '../assets/mapa/compartir.svg'
import alerta from '../assets/mapa/alerta.svg'
import ayudar from '../assets/mapa/ayudar.svg'
import '../styles/MapaCiudadano.css'

const RESIDUOS = {
  plasticos: { label: 'Plásticos', icon: botella },
  papel: { label: 'Papel y cartón', icon: caja },
  vidrios: { label: 'Vidrios', icon: vidrio },
  metales: { label: 'Metales', icon: lata },
}

// Figma, Page 3: "04 · Mapa ciudadano", "Info punto" e "Info reporte". Datos de ejemplo.
// x/y: posición del pin en px dentro del área del mapa; lat/lng: para "Cómo llegar".
const MARKERS = [
  { id: 'report-1', variant: 'report', nombre: 'Basural en espacio público', direccion: 'Ruta 40, acceso a Colonia Pellegrini', estado: 'En revisión', descripcion: 'Residuos acumulados junto a la ruta', x: 239, y: 169, lat: -28.531, lng: -57.168 },
  { id: 'green-1', variant: 'green', nombre: 'Punto verde Carlos Pellegrini', direccion: 'Colonia Carlos Pellegrini', distancia: '0,8 km', recibe: ['plasticos', 'papel', 'vidrios', 'metales'], horario: '08:00 - 21:00', x: 42, y: 204, lat: -28.537, lng: -57.172 },
  { id: 'green-2', variant: 'green', nombre: 'Centro de reciclaje municipal', direccion: 'Av. San Martín 450', distancia: '1,2 km', recibe: ['plasticos', 'papel', 'vidrios', 'metales'], horario: '07:00 - 19:00', x: 286, y: 260, lat: -28.534, lng: -57.165 },
  { id: 'green-3', variant: 'green', nombre: 'Punto verde Iberá', direccion: 'Acceso al pueblo', distancia: '2,1 km', recibe: ['plasticos', 'vidrios'], horario: '09:00 - 18:00', x: 97, y: 434, lat: -28.541, lng: -57.179 },
  { id: 'green-4', variant: 'green', nombre: 'Punto verde Costanera', direccion: 'Costanera sur', distancia: '1,5 km', recibe: ['plasticos', 'papel'], horario: '08:00 - 20:00', x: 281, y: 501, lat: -28.545, lng: -57.166 },
]
const FILTERS = [{ id: 'green', label: 'Puntos verdes' }, { id: 'report', label: 'Reportes' }]

const mapsUrl = m => `https://www.google.com/maps/search/?api=1&query=${m.lat},${m.lng}`

/** Tarjeta inferior con la información del pin tocado. */
function Info({ m }) {
  const [aviso, setAviso] = useState('')
  async function share() {
    const data = { title: m.nombre, text: `${m.nombre} · ${m.direccion}`, url: mapsUrl(m) }
    try {
      if (navigator.share) { await navigator.share(data); return }
      await navigator.clipboard.writeText(`${data.text} ${data.url}`)
      setAviso('Ubicación copiada')
    } catch { /* el usuario canceló o el navegador no lo permite */ }
  }
  const report = m.variant === 'report'
  return (
    <section className={`mapa-info${report ? ' mapa-info--report' : ''}`} aria-label={m.nombre}>
      <div className="mapa-info__head">
        {report ? <span className="mapa-info__alert"><img src={alerta} alt="" /></span> : <img src={reciclaje} alt="" />}
        <div className="mapa-info__title"><h2>{m.nombre}</h2><p><img src={pin} alt="" />{m.direccion}</p></div>
        {report ? <span className="mapa-info__estado">{m.estado}</span> : <span className="mapa-info__dist"><img src={caminar} alt="" />{m.distancia}</span>}
      </div>
      <img className="mapa-info__line" src={linea} alt="" />
      {report ? (
        <div className="mapa-info__desc"><h3>Descripción:</h3><p>{m.descripcion}</p></div>
      ) : (
        <>
          <div className="mapa-info__recibe"><h3>Recibe:</h3><ul>{m.recibe.map(id => <li key={id}><img src={RESIDUOS[id].icon} alt="" /><span>{RESIDUOS[id].label}</span></li>)}</ul></div>
          <p className="mapa-info__horario"><img src={reloj} alt="" /><strong>Horarios:</strong> {m.horario}</p>
        </>
      )}
      <div className="mapa-info__actions">
        {report
          ? <Link className="mapa-info__btn mapa-info__btn--red" to="/aprender"><img src={ayudar} alt="" />Cómo ayudar</Link>
          : <a className="mapa-info__btn" href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`} target="_blank" rel="noreferrer"><img src={llegar} alt="" />Cómo llegar</a>}
        <button type="button" className="mapa-info__share" onClick={share} aria-label="Compartir ubicación"><img src={compartir} alt="" /></button>
      </div>
      <p className="mapa-info__aviso" role="status">{aviso}</p>
    </section>
  )
}

export default function Mapa() {
  const goBack = useBack('/inicio', { section: true })
  const [filter, setFilter] = useState(null) // null: se ve todo; tocar un filtro deja solo ese tipo, tocarlo otra vez vuelve a todo
  const [selected, setSelected] = useState(null)
  const current = MARKERS.find(m => m.id === selected)
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') setSelected(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
  function changeFilter(id) { setFilter(filter === id ? null : id); setSelected(null) }
  return (
    <PhoneFrame title="Mapa">
      <div className="mapa-c">
        <StatusBar />
        <main className="mapa-c__content">
          <img className="mapa-c__bg" src={mapa} alt="" aria-hidden="true" onClick={() => setSelected(null)} />
          <header className="mapa-c__header">
            <button type="button" className="mapa-c__back" aria-label="Volver" onClick={goBack}><ArrowLeft size={22} strokeWidth={1.8} aria-hidden="true" /></button>
            <h1>Mapa</h1>
          </header>
          <div className="mapa-c__filters" role="group" aria-label="Filtrar puntos en el mapa">
            {FILTERS.map(f => <button key={f.id} type="button" aria-pressed={filter === f.id} className={filter === f.id ? 'is-active' : ''} onClick={() => changeFilter(f.id)}>{f.label}</button>)}
          </div>
          <div className="mapa-c__legend"><span className="mapa-c__chip mapa-c__chip--green">● Punto verde</span><span className="mapa-c__chip mapa-c__chip--red">● Reporte</span></div>
          {MARKERS.filter(m => !filter || m.variant === filter).map(m => (
            <button key={m.id} type="button" className={`mapa-c__pin${selected === m.id ? ' is-selected' : ''}`} style={{ left: m.x, top: m.y }} aria-label={`Ver ${m.nombre}`} aria-pressed={selected === m.id} onClick={() => setSelected(selected === m.id ? null : m.id)}>
              <img src={m.variant === 'report' ? pinReporte : pinVerde} alt="" />
              {m.variant === 'report' && <img className="mapa-c__pin-icon" src={pinReporteIcono} alt="" />}
            </button>
          ))}
          {current && <Info key={current.id} m={current} />}
        </main>
        <BottomNav />
      </div>
    </PhoneFrame>
  )
}
