import { createContext, useContext, useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { House, Gift, ScanLine, Truck, ChartColumn, UserRound, Building2, Bell, Leaf, CupSoda, Utensils, Recycle, Sprout, Plus, MoreVertical, X, LockKeyhole, ArrowLeft } from 'lucide-react'
import QRCode from 'qrcode'
import MarcaGuardianes from '../../components/MarcaGuardianes.jsx'
import fondo from '../../assets/images/portada-estero.jpg'
import '../../styles/Comercio.css'

const Context = createContext(null)
const initial = {
  perfil: { nombre: 'Tienda Verde', email: 'tiendaverde@ejemplo.com', direccion: 'Carlos Pellegrini, Corrientes', telefono: '' },
  beneficios: [
    { id: '1', titulo: '10% en productos sustentables', stock: 50, vigencia: '2025-04-30', estado: 'activo', tipo: 'productos' },
    { id: '2', titulo: '2×1 en bebidas naturales', stock: 30, vigencia: '2025-05-15', estado: 'activo', tipo: 'bebidas' },
    { id: '3', titulo: '15% en menú del día', stock: 100, vigencia: '2025-04-20', estado: 'pendiente', tipo: 'comida' },
  ],
  canjes: [
    { id: '1', titulo: '10% en productos sustentables', fecha: '16/04/2025 · 11:24' },
    { id: '2', titulo: '2×1 en bebidas naturales', fecha: '15/04/2025 · 16:03' },
    { id: '3', titulo: '15% en menú del día', fecha: '15/04/2025 · 10:21' },
  ], retiros: [],
}
const fecha = value => new Date(`${value}T12:00:00`).toLocaleDateString('es-AR')
const hoy = () => { const d = new Date(); return [d.getFullYear(), String(d.getMonth() + 1).padStart(2, '0'), String(d.getDate()).padStart(2, '0')].join('-') }
const useComercio = () => useContext(Context)
function load() { try { const data = JSON.parse(localStorage.getItem('guardianes-comercio-v1')); return data?.perfil && Array.isArray(data.beneficios) && Array.isArray(data.canjes) && Array.isArray(data.retiros) ? data : initial } catch { return initial } }
export function ComercioRoot() {
  const [data, setData] = useState(load)
  useEffect(() => { try { localStorage.setItem('guardianes-comercio-v1', JSON.stringify(data)) } catch { /* El estado sigue disponible durante la sesión. */ } }, [data])
  return <Context.Provider value={{ ...data, setData }}><Outlet /></Context.Provider>
}
function Marca({ tono = 'oscuro' }) { return <Link to="/comercio" className="com-marca" aria-label="Guardianes x Iberá"><MarcaGuardianes tono={tono} /></Link> }
const nav = [['panel', 'Inicio', House], ['beneficios', 'Beneficios', Gift], ['canjes', 'Canjes', ScanLine], ['retiros', 'Retiros', Truck], ['aporte', 'Mi Aporte', ChartColumn], ['perfil', 'Perfil', UserRound]]
function Layout({ title, breadcrumb = title, children, action }) {
  const { perfil, retiros } = useComercio()
  const [notifications, setNotifications] = useState(false)
  return <div className="com-portal"><aside className="com-sidebar"><Marca /><p className="com-caption">PORTAL COMERCIO</p><nav aria-label="Navegación del comercio">{nav.map(([path, label, Icon]) => <NavLink key={path} to={`/comercio/${path}`}><Icon size={18} /><span>{label}</span></NavLink>)}</nav><div className="com-admin"><Building2 size={18} /><span><strong>Municipio Iberá</strong><small>Administrador</small></span></div></aside><div className="com-body"><header className="com-top"><strong>Portal de comercios</strong><div><button className="com-icon" aria-label="Notificaciones" aria-expanded={notifications} onClick={() => setNotifications(!notifications)}><Bell size={19} /></button><Link to="/comercio/perfil"><strong>{perfil.nombre}</strong><small>Comercio</small></Link></div>{notifications && <section className="com-notifications"><strong>Notificaciones</strong><p>{retiros.length ? `Tenés ${retiros.length} solicitud(es) de retiro registrada(s).` : 'No tenés notificaciones nuevas.'}</p></section>}</header><main className="com-main"><p className="com-breadcrumb"><Link to="/comercio/panel">Inicio</Link> &gt; {breadcrumb}</p><div className="com-heading">{breadcrumb !== "Panel de comercio" && <Link className="com-mobile-back" to="/comercio/panel" aria-label="Volver al inicio"><ArrowLeft size={22} /></Link>}<h1>{title}</h1>{action}</div>{children}</main></div></div>
}
export function ComercioLogin() {
  const navigate = useNavigate()
  const [help, setHelp] = useState(false)
  return <main className="com-login"><div className="com-login-card"><div className="com-login-photo"><img src={fondo} alt="Muelle y bote en los Esteros del Iberá al atardecer" /><Marca tono="claro" /></div><form onSubmit={event => { event.preventDefault(); navigate('/comercio/panel') }}><p className="com-eyebrow">PLATAFORMA COMERCIAL+</p><h1>Iniciar Sesión</h1><p className="com-muted">Gestioná, coordiná y hacé crecer el impacto ambiental en el Iberá</p><label><span><UserRound size={14} /> Email o usuario</span><input name="usuario" placeholder="Usuario" autoComplete="username" /></label><label><span><LockKeyhole size={14} /> Contraseña</span><input name="clave" type="password" placeholder="Contraseña" autoComplete="current-password" /></label><button className="com-btn com-login-submit">Entrar</button><button type="button" className="com-forgot" onClick={() => setHelp(!help)}>¿Olvidaste tu contraseña?</button>{help && <p role="status" className="com-muted">Contactá al administrador del Municipio Iberá para recuperar tu acceso.</p>}</form></div></main>
}
const benefitIcons = { productos: Leaf, bebidas: CupSoda, comida: Utensils }
function Detalle({ beneficio, onClose }) { return <Modal title="Detalle del beneficio" onClose={onClose}><h3>{beneficio.titulo}</h3><p>Vigencia: {fecha(beneficio.vigencia)}</p><p>Stock disponible: {beneficio.stock}</p><p>Estado: {beneficio.estado}</p></Modal> }
function Modal({ title, onClose, children }) {
  useEffect(() => { const handler = e => { if (e.key === 'Escape') onClose() }; document.addEventListener('keydown', handler); const previous = document.activeElement; return () => { document.removeEventListener('keydown', handler); previous?.focus() } }, [onClose])
  return <div className="com-overlay" onClick={onClose}><section className="com-modal" role="dialog" aria-modal="true" aria-label={title} onClick={e => e.stopPropagation()}><div className="com-heading"><h2>{title}</h2><button autoFocus className="com-icon" aria-label="Cerrar" onClick={onClose}><X size={22} /></button></div>{children}</section></div>
}
export function ComercioPanel() {
  const { perfil, beneficios, canjes } = useComercio()
  const [detail, setDetail] = useState(null)
  const kpis = [['Beneficios activos', beneficios.filter(b => b.estado === 'activo').length, Gift, 'blue', 'beneficios'], ['Canjes realizados', 48 + canjes.length - 3, ScanLine, 'orange', 'canjes'], ['Residuos retirados', '320 kg', Recycle, 'blue', 'aporte'], ['Mi aporte ambiental', '1.240 kg', Leaf, 'green', 'aporte']]
  return <Layout title={`Hola, ${perfil.nombre}`} breadcrumb="Panel de comercio"><div className="com-welcome"><p className="com-muted">Tus acciones también hacen la diferencia.</p><time>16 abr 2025</time></div><div className="com-kpis">{kpis.map(([label, value, Icon, tone, path]) => <Link className={`com-kpi com-${tone}`} to={`/comercio/${path}`} key={label}><span><Icon size={19} />{label}</span><strong>{value}</strong></Link>)}</div><h2 className="com-section-title">Beneficios destacados</h2><div className="com-benefit-cards">{beneficios.slice(0, 3).map(b => { const Icon = benefitIcons[b.tipo] || Gift; return <article className="com-card" key={b.id}><Icon size={26} /><h3>{b.titulo}</h3><p className="com-muted">Vigencia: {fecha(b.vigencia)}</p><button className="com-btn" onClick={() => setDetail(b)}>Ver detalle</button></article> })}</div>{detail && <Detalle beneficio={detail} onClose={() => setDetail(null)} />}</Layout>
}
export function ComercioBeneficios() {
  const { beneficios, setData } = useComercio()
  const [tab, setTab] = useState('activo'), [proposal, setProposal] = useState(false), [detail, setDetail] = useState(null)
  function submit(e) { e.preventDefault(); const form = new FormData(e.currentTarget); setData(d => ({ ...d, beneficios: [...d.beneficios, { id: crypto.randomUUID(), titulo: form.get('titulo').trim(), stock: Number(form.get('stock')), vigencia: form.get('vigencia'), tipo: form.get('tipo'), estado: 'pendiente' }] })); setProposal(false); setTab('pendiente') }
  return <Layout title="Mis beneficios" action={<button className="com-btn" onClick={() => setProposal(true)}><Plus size={17} />Proponer beneficio</button>}><div className="com-tabs" role="group" aria-label="Estado de beneficios">{[['activo', 'Activos'], ['pendiente', 'Pendientes'], ['rechazado', 'Rechazados']].map(([state, label]) => <button key={state} aria-pressed={tab === state} className={tab === state ? 'selected' : ''} onClick={() => setTab(state)}>{label} ({beneficios.filter(b => b.estado === state).length})</button>)}</div><div className="com-table-wrap"><table className="com-table"><thead><tr>{['Beneficio', 'Stock', 'Vigencia', 'Estado', 'Acciones'].map(t => <th key={t}>{t}</th>)}</tr></thead><tbody>{beneficios.filter(b => b.estado === tab).map(b => <tr key={b.id}><td data-label="Beneficio">{b.titulo}</td><td data-label="Stock">{b.stock}</td><td data-label="Vigencia">{fecha(b.vigencia)}</td><td data-label="Estado"><span className={`com-chip ${b.estado}`}>{b.estado === 'activo' ? 'Activo' : b.estado === 'pendiente' ? 'Pendiente' : 'Rechazado'}</span></td><td data-label="Acciones"><button className="com-icon" aria-label={`Ver detalle de ${b.titulo}`} onClick={() => setDetail(b)}><MoreVertical size={19} /></button></td></tr>)}{!beneficios.some(b => b.estado === tab) && <tr><td colSpan="5">No hay beneficios en este estado.</td></tr>}</tbody></table></div>{detail && <Detalle beneficio={detail} onClose={() => setDetail(null)} />}{proposal && <Modal title="Proponer beneficio" onClose={() => setProposal(false)}><form className="com-form" onSubmit={submit}><label>Beneficio<input name="titulo" required maxLength={120} pattern=".*\S.*" /></label><label>Stock<input name="stock" type="number" min="1" step="1" required /></label><label>Vigencia<input name="vigencia" type="date" min={hoy()} required /></label><label>Categoría<select name="tipo"><option value="productos">Productos sustentables</option><option value="bebidas">Bebidas naturales</option><option value="comida">Gastronomía</option></select></label><button className="com-btn">Enviar propuesta</button></form></Modal>}</Layout>
}
export function ComercioCanjes() {
  const { canjes } = useComercio()
  const [qr, setQr] = useState(''), [error, setError] = useState(''), [generated, setGenerated] = useState(false)
  const generate = async () => { try { const url = new URL('/comercio/canjes', window.location.origin); url.searchParams.set('comercio', 'tienda-verde'); url.searchParams.set('token', crypto.randomUUID()); setQr(await QRCode.toDataURL(url.href, { width: 640, margin: 4, errorCorrectionLevel: 'M' })); setGenerated(true) } catch { setError('No se pudo generar el QR. Intentá nuevamente.') } }
  useEffect(() => { let active = true; QRCode.toDataURL(`${window.location.origin}/comercio/canjes?comercio=tienda-verde`, { width: 640, margin: 4 }).then(value => { if (active) setQr(value) }).catch(() => { if (active) setError('No se pudo cargar el QR.') }); return () => { active = false } }, [])
  return <Layout title="Validar canjes"><div className="com-canjes"><section className="com-qr"><div>{qr && <img src={qr} alt="Código QR del comercio" width="320" height="320" />}<p>Mostrá este QR al cliente para<br />validar el canje</p><button className="com-btn" onClick={generate}><ScanLine size={16} />Generar QR</button>{generated && <p className="com-muted" role="status">QR actualizado.</p>}{error && <p role="alert">{error}</p>}</div></section><section className="com-card com-history"><h2>Últimos canjes</h2>{canjes.slice(0, 3).map(c => <article key={c.id}><time>{c.fecha}</time><h3>{c.titulo}</h3><span>Validado</span></article>)}</section></div><p className="com-demo-note">El QR identifica al comercio. La validación de canjes requiere conectar el servicio de canjes.</p></Layout>
}
export function ComercioRetiros() {
  const { retiros, setData } = useComercio()
  const [sent, setSent] = useState(false)
  function submit(e) { e.preventDefault(); const form = new FormData(e.currentTarget); setData(d => ({ ...d, retiros: [{ id: crypto.randomUUID(), material: form.get('material'), cantidad: Number(form.get('cantidad')), fecha: form.get('fecha'), observaciones: form.get('observaciones'), estado: 'Pendiente' }, ...d.retiros] })); e.currentTarget.reset(); setSent(true) }
  return <Layout title="Solicitud de retiro"><section className="com-card"><h2>Tu solicitud de retiro de residuos</h2><form className="com-form" onSubmit={submit}><label>Tipo de residuo<select name="material">{['Plástico', 'Papel y cartón', 'Vidrio', 'Metales', 'Orgánicos'].map(m => <option key={m}>{m}</option>)}</select></label><label>Cantidad estimada (kg)<input name="cantidad" type="number" min="0.1" step="0.1" placeholder="100" required /></label><label>Observaciones (opcional)<textarea name="observaciones" placeholder="Ej. Bolsas y envases de plástico limpio." maxLength={1000} /></label><label>Disponibilidad<input name="fecha" type="date" min={hoy()} required /></label><button className="com-btn">Enviar solicitud</button>{sent && <p className="com-success" role="status">Solicitud registrada. Podés consultar su estado abajo.</p>}</form></section>{retiros.length > 0 && <section className="com-card com-request-list"><h2>Mis solicitudes</h2>{retiros.map(r => <article key={r.id}><strong>{r.material} · {r.cantidad} kg</strong><span>{fecha(r.fecha)} · {r.estado}</span></article>)}</section>}</Layout>
}
export function ComercioAporte() {
  const materials = [['Plástico', 38, '#4baecb'], ['Papel y cartón', 25, '#19b7a4'], ['Vidrio', 18, '#ff7a39'], ['Metales', 13, '#e9a52d'], ['Orgánicos', 6, '#138548']]
  return <Layout title="Mi aporte ambiental"><section className="com-card com-total"><span className="com-recycle"><Recycle size={32} /></span><div><p className="com-muted">Total reciclado</p><strong>320 kg</strong></div><span className="com-growth">+12% vs. mes anterior</span></section><section className="com-card com-materials"><h2>Por material</h2>{materials.map(([name, percent, color]) => <div className="com-material" key={name}><strong>{name}</strong><div className="com-track" role="meter" aria-label={name} aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${percent}%`, background: color }} /></div><span>{percent}%</span></div>)}</section><div className="com-commitment"><Sprout size={23} /><strong>¡Tu compromiso suma!</strong></div></Layout>
}
export function ComercioPerfil() {
  const { perfil, setData } = useComercio(), navigate = useNavigate()
  const [saved, setSaved] = useState(false)
  return <Layout title="Perfil del comercio"><section className="com-card"><h2>Datos del comercio</h2><form className="com-form" onSubmit={e => { e.preventDefault(); const form = new FormData(e.currentTarget); setData(d => ({ ...d, perfil: Object.fromEntries(form) })); setSaved(true) }}>{[['nombre', 'Nombre del comercio'], ['email', 'Email'], ['direccion', 'Dirección'], ['telefono', 'Teléfono']].map(([key, label]) => <label key={key}>{label}<input name={key} defaultValue={perfil[key]} type={key === 'email' ? 'email' : key === 'telefono' ? 'tel' : 'text'} required={key !== 'telefono'} /></label>)}<button className="com-btn">Guardar cambios</button>{saved && <p role="status" className="com-success">Datos guardados.</p>}</form></section><button className="com-btn com-logout" onClick={() => navigate('/comercio')}>Cerrar sesión</button></Layout>
}






