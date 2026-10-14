import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Recycle, MapPin, Navigation, Pencil } from 'lucide-react'
import MuniScreen, { Chip } from './MuniScreen.jsx'
import Filtros from './Filtros.jsx'
import { useMunicipio } from './MunicipioContext.jsx'
import { numero, posicion } from './data.js'
import MapaReal, { CENTRO_PUEBLO } from '../../components/MapaReal.jsx'
import pinReporte from '../../assets/mapa/pin-reporte.svg'
import pinReporteIcono from '../../assets/mapa/pin-reporte-icono.svg'
import pinVerde from '../../assets/mapa/pin-verde.svg'

// Figma, Page 3: "18 · Mapa de gestion", sobre un mapa real (OpenStreetMap) con ubicaciones reales.
// Los filtros de estado afectan solo a los reportes; los pines cercanos se agrupan.
// Tocar un reporte abre su detalle; tocar un punto verde muestra su ficha abajo.
export default function Mapa() {
  const navigate = useNavigate()
  const { reportes, puntos } = useMunicipio()
  const [estado, setEstado] = useState('todos')
  const [punto, setPunto] = useState(null)
  const pines = useMemo(() => [
    ...puntos.filter(p => p.activo).map(p => ({ id: `punto:${p.id}`, ...posicion(p), label: p.nombre, iconos: [pinVerde], tono: 'verde', suelto: true, seleccionado: punto?.id === p.id })),
    ...reportes.filter(r => estado === 'todos' || r.estado === estado)
      .map(r => ({ id: `reporte:${r.numero}`, ...posicion(r), label: `Reporte ${numero(r.numero)}: ${r.titulo}`, iconos: [pinReporte, pinReporteIcono] })),
  ], [reportes, puntos, estado, punto])
  const abrir = id => { const [tipo, valor] = id.split(':'); if (tipo === 'punto') setPunto(p => p?.id === valor ? null : puntos.find(x => x.id === valor)); else navigate(`/municipio/reportes/${valor}`) }
  const pos = punto && posicion(punto)
  return <MuniScreen title="Mapa" back section className="muni-mapa">
    <MapaReal className="muni-mapa__mapa" pines={pines} onSelect={abrir} onFondo={() => setPunto(null)} centro={CENTRO_PUEBLO} agrupar />
    <Filtros value={estado} onChange={setEstado} />
    <div className="muni-mapa__legend"><Chip tone="green">● Punto verde</Chip><Chip tone="red">● Reporte</Chip></div>
    {punto && <section className="muni-punto-ficha" aria-label={punto.nombre}>
      <div className="muni-punto-ficha__head">
        <span className="muni-punto-ficha__icono" aria-hidden="true"><Recycle size={22} strokeWidth={1.8} /></span>
        <div><h2>{punto.nombre}</h2><p><MapPin size={14} aria-hidden="true" />{punto.direccion}</p></div>
        <Chip tone="green">Activo</Chip>
      </div>
      <div className="muni-punto-ficha__acciones">
        <a className="muni-btn muni-btn--ghost" href={`https://www.google.com/maps/dir/?api=1&destination=${pos.lat},${pos.lng}`} target="_blank" rel="noreferrer"><Navigation size={16} aria-hidden="true" />Cómo llegar</a>
        <Link className="muni-btn" to="/municipio/puntos-verdes"><Pencil size={16} aria-hidden="true" />Editar</Link>
      </div>
    </section>}
  </MuniScreen>
}
