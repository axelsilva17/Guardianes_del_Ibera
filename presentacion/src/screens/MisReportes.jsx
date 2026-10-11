import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ScreenLayout from '../components/ScreenLayout.jsx'
import { USER } from '../data/usuario.js'
import '../styles/MisReportes.css'
const FILTERS = [['todos', 'Todos'], ['proceso', 'En proceso'], ['resuelto', 'Resueltos']]
const STATES = { pendiente: 'Pendiente', en_revision: 'En proceso', resuelto: 'Resuelto' }
const base = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '')
export default function MisReportes() {
  const [reports, setReports] = useState([])
  const [filter, setFilter] = useState('todos')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const [selected, setSelected] = useState(null)
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    fetch(`${base}/api/reportes?autorId=${encodeURIComponent(USER.id)}`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('No pudimos cargar tus reportes. Verificá que el servidor esté encendido.')
        const result = await response.json()
        if (!Array.isArray(result)) throw new Error('El servidor devolvió una respuesta inesperada.')
        setReports(result.sort((a, b) => (b.numero || 0) - (a.numero || 0)))
      })
      .catch(err => { if (!controller.signal.aborted) setError(err.message === 'Failed to fetch' ? 'No pudimos conectar con el servidor. Intentá de nuevo.' : err.message) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [retry])
  const visible = reports.filter(r => filter === 'todos' || (filter === 'resuelto' ? r.estado === 'resuelto' : r.estado !== 'resuelto'))
  return <ScreenLayout title={selected ? 'Detalle del reporte' : 'Mis Reportes'} className="mis-reportes" {...(selected ? { onBack: () => setSelected(null) } : { fallback: '/perfil' })}>
    {selected ? <article className="mis-reportes__detail">
      <div className="mis-reportes__detail-heading"><h2>#{String(selected.numero).padStart(3, '0')}</h2><span className={`mis-reportes__badge is-${selected.estado}`}>{STATES[selected.estado] || selected.estado}</span></div>
      <h3>{selected.titulo}</h3>
      {selected.foto && <img className="mis-reportes__photo" src={selected.foto} alt="Fotografía del problema reportado" />}
      <p>{selected.descripcion || 'Sin descripción adicional.'}</p>
      <dl><div><dt>Fecha de envío</dt><dd>{new Date(`${selected.fecha}T12:00:00`).toLocaleDateString('es-AR')}</dd></div><div><dt>Ubicación</dt><dd>{Number(selected.lat).toFixed(5)}, {Number(selected.lng).toFixed(5)}</dd></div><div><dt>Reportado por</dt><dd>{selected.autor}</dd></div></dl>
      <button className="mis-reportes__action" onClick={() => setSelected(null)}>Volver a mis reportes</button>
    </article> : <>
      <div className="mis-reportes__filters" role="group" aria-label="Filtrar reportes">{FILTERS.map(([id, label]) => <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}</div>
      {loading ? <p role="status" className="mis-reportes__empty">Cargando tus reportes…</p> : error ? <div className="mis-reportes__empty"><p role="alert">{error}</p><button className="mis-reportes__action" onClick={() => setRetry(n => n + 1)}>Reintentar</button></div> : visible.length ? <ul className="mis-reportes__list">{visible.map(r => <li key={r.id}><button className={`mis-reportes__card is-${r.estado}`} onClick={() => setSelected(r)} aria-label={`Ver reporte ${r.numero}: ${r.titulo}. ${STATES[r.estado] || r.estado}`}><span className="mis-reportes__summary"><strong>#{String(r.numero).padStart(3, '0')}</strong><span>{r.titulo}</span></span><span className={`mis-reportes__badge is-${r.estado}`}>{STATES[r.estado] || r.estado}</span></button></li>)}</ul> : <div className="mis-reportes__empty"><h2>{reports.length ? 'No hay reportes en este estado' : 'Todavía no hiciste reportes'}</h2><p>{reports.length ? 'Probá con otro filtro para ver tus envíos.' : 'Cuando reportes un problema, vas a poder seguirlo desde acá.'}</p><Link className="mis-reportes__action" to="/reportar">Reportar un problema</Link></div>}
    </>}
  </ScreenLayout>
}
