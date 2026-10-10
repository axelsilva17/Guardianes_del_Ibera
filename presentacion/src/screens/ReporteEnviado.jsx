import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button.jsx'
import Card from '../components/Card.jsx'
import check from '../assets/reportar/check.svg'
import clipboardCheck from '../assets/reportar/clipboard-check.svg'

const STATES = { pendiente: 'Pendiente', en_revision: 'En revisión', resuelto: 'Resuelto' }

export default function ReporteEnviado({ reporte }) {
  const navigate = useNavigate()
  const heading = useRef(null)
  useEffect(() => { heading.current?.focus() }, [])
  const number = reporte.numero ? String(reporte.numero).padStart(3, '0') : reporte.id
  return (
    <main className="reporte-enviado">
      <section className="reporte-enviado__result" aria-labelledby="reporte-enviado-title">
        <div className="reporte-enviado__check"><img src={check} alt="" aria-hidden="true" /></div>
        <h1 id="reporte-enviado-title" ref={heading} tabIndex={-1}>¡Gracias por tu reporte!</h1>
        <p>Tu participación nos ayuda a<br />mantener limpio nuestro entorno.</p>
      </section>
      <Card className="reporte-enviado__card" aria-label="Información del reporte">
        <p className="reporte-enviado__label">Número de reporte</p>
        <strong className="reporte-enviado__number">#{number}</strong>
        <div className="reporte-enviado__state"><img src={clipboardCheck} alt="" aria-hidden="true" /><div><h2>Estado</h2><p>{STATES[reporte.estado] || reporte.estado}</p></div></div>
      </Card>
      <Button className="reporte-enviado__home" onClick={() => navigate('/inicio')}>Volver al inicio</Button>
    </main>
  )
}
