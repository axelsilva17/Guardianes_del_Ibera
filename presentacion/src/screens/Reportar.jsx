import { Trash2, Milk, Newspaper, Wine, Leaf, Camera, MapPin, Clipboard, ClipboardCheck } from 'lucide-react'
import { useRef, useState } from 'react'
import PhoneFrame from '../components/PhoneFrame.jsx'
import Button from '../components/Button.jsx'
import useBack from '../hooks/useBack.js'
import '../styles/Reportar.css'
import ReporteEnviado from './ReporteEnviado.jsx'

const icons = import.meta.glob('../assets/reportar/*.svg', { eager: true, query: '?url', import: 'default' })
// Íconos de Lucide (los mismos del Figma): toman el color del botón, gris o blanco si está seleccionado.
const CATEGORIES = [['general', 'Residuos generales', Trash2], ['plastico', 'Plástico', Milk], ['papel', 'Papel y cartón', Newspaper], ['vidrio', 'Vidrio', Wine], ['organico', 'Orgánicos', Leaf]]
function Icon({ name }) { return <img src={icons[`../assets/reportar/${name}.svg`]} alt="" aria-hidden="true" /> }

export default function Reportar() {
  const goBack = useBack('/inicio', { section: true })
  const fileInput = useRef(null)
  const [photo, setPhoto] = useState('')
  const [reading, setReading] = useState(false)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('general')
  const [typeChosen, setTypeChosen] = useState(false)
  const [location, setLocation] = useState(null)
  const [locating, setLocating] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(null)

  function selectPhoto(event) {
    const file = event.target.files?.[0]
    if (!file) return
    setError('')
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 2 * 1024 * 1024) {
      setError('Elegí una imagen JPG, PNG o WebP de hasta 2 MB.')
      event.target.value = ''
      return
    }
    setReading(true)
    const reader = new FileReader()
    reader.onload = () => { setPhoto(reader.result); setReading(false) }
    reader.onerror = () => { setError('No pudimos leer la imagen. Intentá con otra.'); setReading(false) }
    reader.readAsDataURL(file)
  }

  function locate() {
    setError('')
    if (!navigator.geolocation) { setError('Tu navegador no permite obtener la ubicación.'); return }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => { setLocation({ lat: coords.latitude, lng: coords.longitude }); setLocating(false) },
      () => { setError('No pudimos obtener tu ubicación. Habilitá el permiso e intentá de nuevo.'); setLocating(false) },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    )
  }

  async function submit(event) {
    event.preventDefault()
    if (sending || reading) return
    setError('')
    if (!description.trim()) { setError('Contanos qué está pasando.'); return }
    if (!location) { setError('Tocá “Mi ubicación actual” para indicar dónde está el problema.'); return }
    setSending(true)
    try {
      const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
      const response = await fetch(`${base}/api/reportes`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo: description.trim().slice(0, 100), descripcion: description.trim(), tipo: 'basura', categoriaResiduo: category, foto: photo, ...location }),
      })
      if (!response.ok) throw new Error('No pudimos enviar el reporte. Intentá de nuevo.')
      const result = await response.json()
      if (!result.id) throw new Error('El servidor no confirmó el reporte.')
      setSent(result)
    } catch (err) { setError(err.message === 'Failed to fetch' ? 'No se pudo conectar con el servidor. Verificá que esté encendido e intentá de nuevo.' : err.message) }
    finally { setSending(false) }
  }

  return (
    <PhoneFrame title={sent ? 'Reporte enviado' : 'Reportar'}>
      <div className="reportar">
        <div className="reportar__status" aria-hidden="true"><span>9:41</span><div><Icon name="signal" /><Icon name="wifi" /><Icon name="battery" /></div></div>
        {sent ? <ReporteEnviado reporte={sent} /> : <form className="reportar__form" onSubmit={submit}>
          <header className="reportar__header"><button type="button" aria-label="Volver" onClick={goBack}><Icon name="back" /></button><h1>Reportar un problema</h1></header>
          <>
            <ol className="reportar__steps" aria-label="Pasos del reporte">{[["Foto", Camera, !!photo], ["Ubicación", MapPin, !!location], ["Tipo", typeChosen ? ClipboardCheck : Clipboard, typeChosen]].map(([label, StepIcon, done]) => <li key={label} className={done ? "is-done" : ""}><StepIcon size={18} strokeWidth={1.8} aria-hidden="true" />{label}<span className="sr-only">{done ? " (completo)" : " (pendiente)"}</span></li>)}</ol>
            <input ref={fileInput} className="reportar__file" type="file" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} disabled={sending || reading} aria-label="Fotografía del problema" />
            <button className="reportar__photo" type="button" disabled={sending || reading} onClick={() => fileInput.current?.click()} aria-label={photo ? 'Cambiar fotografía' : 'Sacar una foto o subir una imagen'}>
              {photo ? <><img className="reportar__preview" src={photo} alt="Fotografía seleccionada del problema" /><span className="reportar__change">Cambiar foto</span></> : <><Icon name="camera" /><span>Tocá para sacar una foto o subir<br />una imagen de tu galería</span></>}
            </button>
            <button className="reportar__location" type="button" onClick={locate} disabled={locating || sending}><Icon name="pin" /><span><strong>Mi ubicación actual</strong><small>{locating ? 'Obteniendo ubicación…' : location ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}` : 'Tocá para obtener tu ubicación'}</small></span></button>
            <label className="reportar__description">Descripción<textarea required maxLength={2000} rows={1} value={description} disabled={sending} onChange={(e) => { setDescription(e.target.value); e.target.style.height = "auto"; e.target.style.height = `${e.target.scrollHeight}px` }} placeholder="Contanos qué está pasando…" /></label>
            <fieldset className="reportar__categories" disabled={sending}><legend>Tipo de residuo</legend><div>{CATEGORIES.map(([value, label, CategoryIcon]) => <button key={value} type="button" aria-label={label} title={label} aria-pressed={category === value} className={category === value ? 'is-selected' : ''} onClick={() => { setCategory(value); setTypeChosen(true) }}><CategoryIcon size={22} strokeWidth={1.8} aria-hidden="true" /></button>)}</div></fieldset>
            {error && <p className="reportar__error" role="alert">{error}</p>}
            <Button type="submit" className="reportar__submit" disabled={sending || locating || reading}>{sending ? 'Enviando…' : reading ? 'Leyendo imagen…' : 'Enviar reporte'}</Button>
          </>
        </form>}
      </div>
    </PhoneFrame>
  )
}
