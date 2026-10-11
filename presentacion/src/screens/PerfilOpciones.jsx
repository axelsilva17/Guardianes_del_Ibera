import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserRound, Bell, HelpCircle, ChevronRight, Leaf, MapPin, BookOpen } from 'lucide-react'
import ScreenLayout from '../components/ScreenLayout.jsx'
import avatar from '../assets/images/imagennivel.png'
import '../styles/PerfilOpciones.css'

function Layout({ title, children }) {
  const navigate = useNavigate()
  return <ScreenLayout title={title} className="perfil-settings" onBack={() => navigate('/perfil')}>{children}</ScreenLayout>
}

export function MiCuenta() {
  return <Layout title="Mi cuenta">
    <section className="perfil-settings__intro"><img src={avatar} alt="Mascota de Guardianes del Iberá" /><h2>Sofía Martínez</h2><p>Tu espacio como Guardiana del Iberá</p></section>
    <section className="perfil-settings__card"><h2><UserRound size={20} /> Datos personales</h2><dl className="perfil-settings__data"><div><dt>Nombre y apellido</dt><dd>Sofía Martínez</dd></div><div><dt>Correo electrónico</dt><dd>sofia@email.com</dd></div></dl><p className="perfil-settings__muted">Cuenta de ejemplo. La edición de datos estará disponible cuando se conecte el servicio de cuentas.</p></section>
    <section className="perfil-settings__card"><h2><Leaf size={20} /> Tu participación</h2><p>Cada acción cuenta para cuidar nuestro entorno.</p><Link className="perfil-settings__link" to="/nivel">Ver mi nivel y progreso <ChevronRight size={18} /></Link><Link className="perfil-settings__link" to="/mis-reportes">Consultar mis reportes <ChevronRight size={18} /></Link></section>
    <Link className="perfil-settings__back" to="/perfil">Volver a mi perfil</Link>
  </Layout>
}

const PREFERENCES = [
  { id: 'reportes', title: 'Estado de mis reportes', text: 'Novedades sobre los problemas que reportaste.' },
  { id: 'aprendizaje', title: 'Aprendizaje y desafíos', text: 'Recordatorios para aprender y sumar puntos.' },
  { id: 'novedades', title: 'Novedades del Iberá', text: 'Actividades y noticias de nuestra comunidad.' },
]
const KEY = 'guardianes-preferencias-notificaciones'
function readPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return Object.fromEntries(PREFERENCES.map(p => [p.id, saved?.[p.id] === true]))
  } catch { return {} }
}
export function Notificaciones() {
  const [preferences, setPreferences] = useState(readPreferences)
  const [message, setMessage] = useState('')
  function toggle(id) {
    const next = { ...preferences, [id]: !preferences[id] }
    try { localStorage.setItem(KEY, JSON.stringify(next)); setPreferences(next); setMessage('Preferencia guardada en este navegador.') }
    catch { setMessage('No pudimos guardar el cambio. Revisá el almacenamiento de tu navegador.') }
  }
  return <Layout title="Notificaciones">
    <section className="perfil-settings__heading"><span className="perfil-settings__badge"><Bell size={28} /></span><h2>Elegí qué novedades recibir</h2><p>Personalizá tus preferencias para estar al día.</p></section>
    <section className="perfil-settings__card" aria-label="Preferencias de notificaciones">{PREFERENCES.map(p => <button type="button" className="perfil-settings__toggle" key={p.id} role="switch" aria-checked={Boolean(preferences[p.id])} aria-label={p.title} onClick={() => toggle(p.id)}><span><strong>{p.title}</strong><small>{p.text}</small></span><span className={`perfil-settings__switch ${preferences[p.id] ? 'is-enabled' : ''}`} aria-hidden="true" /></button>)}</section>
    {message && <p className="perfil-settings__feedback" role="status">{message}</p>}
    <Link className="perfil-settings__link perfil-settings__card" to="/recoleccion"><MapPin size={20} /><span>Avisos de recolección</span><ChevronRight size={18} /></Link>
    <p className="perfil-settings__muted">Estas preferencias se guardan en tu dispositivo. El envío de notificaciones todavía no está disponible en el prototipo.</p>
  </Layout>
}

const QUESTIONS = [
  ['¿Cómo reporto un problema?', 'Entrá en Reportar, completá la información solicitada y enviá el reporte. Podés incluir una foto, la ubicación y una descripción.'],
  ['¿Dónde veo mis reportes?', 'Desde Mi perfil, elegí Mis reportes para consultar tus reportes.'],
  ['¿Cómo sumo puntos?', 'En Nivel y progreso podés consultar las acciones que suman puntos. Explorá también los contenidos y desafíos de Aprender.'],
  ['¿Cómo consulto la recolección?', 'En Inicio, tocá Consultar recorrido en la tarjeta Recolección de Residuos y elegí tu barrio. Los horarios actuales son datos de ejemplo.'],
  ['¿Mis datos se guardan?', 'Este sitio es un prototipo. Las preferencias de avisos se guardan en este navegador y los reportes se conservan en un archivo local del servidor, incluso después de reiniciarlo.'],
]
export function Ayuda() {
  return <Layout title="Ayuda">
    <section className="perfil-settings__heading"><span className="perfil-settings__badge"><HelpCircle size={28} /></span><h2>Estamos para orientarte</h2><p>Encontrá respuestas para empezar a cuidar el Iberá.</p></section>
    <section className="perfil-settings__faq"><h2>Preguntas frecuentes</h2>{QUESTIONS.map(([question, answer]) => <details key={question}><summary>{question}<ChevronRight size={18} /></summary><p>{answer}</p></details>)}</section>
    <section className="perfil-settings__card"><h2><BookOpen size={20} /> Seguí explorando</h2><Link className="perfil-settings__link" to="/aprender">Aprender a cuidar el ambiente <ChevronRight size={18} /></Link><Link className="perfil-settings__link" to="/reportar">Reportar un problema <ChevronRight size={18} /></Link></section>
  </Layout>
}
