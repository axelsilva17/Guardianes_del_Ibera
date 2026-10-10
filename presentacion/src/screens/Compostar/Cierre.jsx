import LessonLayout from './LessonLayout.jsx'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function Cierre() {
  const n = useNavigate()
  return (
    <LessonLayout
      title="¡Listo! Ya sabés cómo compostar"
      step={6}
      total={6}
      showNext={false}
      onBack={() => n('/compostar')}
    >
      <div className="desafio-card" style={{ background: '#FAF3DF', borderRadius: '12px', border: '1px solid #EFE5C5', padding: '20px', marginTop: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#1a2e26', margin: '0 0 4px', letterSpacing: '0.2px' }}>
          ¡Vamos! Ahora que sabés compostar, podría interesarte...
        </h2>
        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#138548', margin: '0 0 4px' }}>
          Desafío Compost
        </h3>
        <p style={{ fontSize: '13px', lineHeight: '1.5', color: '#45534d', margin: '0 0 12px' }}>
          Poné a prueba tus conocimientos sobre compost con Capi y ganá puntos.
        </p>
        <Link
          to="/juego"
          style={{
            display: 'inline-block',
            background: '#138548',
            color: '#fff',
            padding: '8px 16px',
            borderRadius: '999px',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: '13px',
            letterSpacing: '0.3px',
          }}
        >
          JUGAR
        </Link>
      </div>

      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-ink)' }}>
          Cada pequeño gesto hace una gran diferencia
        </p>
      </div>
    </LessonLayout>
  )
}
