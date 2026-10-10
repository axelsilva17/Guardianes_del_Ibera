import { useState } from 'react'
import { Link } from 'react-router-dom'
import MuniScreen, { Chip } from './MuniScreen.jsx'
import Filtros from './Filtros.jsx'
import { useMunicipio } from './MunicipioContext.jsx'
import { numero } from './data.js'
import mapa from '../../assets/municipio/mapa.png'
import pinReporte from '../../assets/municipio/pin-reporte.svg'
import pinReporteIcono from '../../assets/municipio/pin-reporte-icono.svg'
import pinVerde from '../../assets/municipio/pin-verde.svg'

// Figma, Page 3: "18 · Mapa de gestion". Los filtros de estado afectan solo a los reportes.
export default function Mapa() {
  const { reportes, puntos } = useMunicipio()
  const [estado, setEstado] = useState('todos')
  const shown = reportes.filter(r => estado === 'todos' || r.estado === estado)
  return <MuniScreen title="Mapa" back section className="muni-mapa">
    <img className="muni-mapa__bg" src={mapa} alt="" aria-hidden="true" />
    <Filtros value={estado} onChange={setEstado} />
    <div className="muni-mapa__legend"><Chip tone="green">● Punto verde</Chip><Chip tone="red">● Reporte</Chip></div>
    <div className="muni-mapa__pins">
      {puntos.filter(p => p.activo).map(p => <Link key={p.id} to="/municipio/puntos-verdes" className="muni-pin" style={{ left: p.x, top: p.y }} aria-label={p.nombre}><img src={pinVerde} alt="" /></Link>)}
      {shown.map(r => <Link key={r.numero} to={`/municipio/reportes/${r.numero}`} className="muni-pin muni-pin--reporte" style={{ left: r.x, top: r.y }} aria-label={`Reporte ${numero(r.numero)}: ${r.titulo}`}><img src={pinReporte} alt="" /><img className="muni-pin__icon" src={pinReporteIcono} alt="" /></Link>)}
    </div>
  </MuniScreen>
}
