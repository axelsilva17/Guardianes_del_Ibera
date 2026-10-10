import { useState } from 'react'
import ScreenLayout from '../components/ScreenLayout.jsx'
import sprout from '../assets/recompensas/sprout.svg'
import binoculars from '../assets/recompensas/binoculars.svg'
import flower from '../assets/recompensas/flower.svg'
import divider from '../assets/recompensas/divider.svg'
import '../styles/Recompensas.css'

// Figma, Page 3: "13 · Canjear puntos".
const FILTERS = [{ id: 'todas', label: 'Todas' }, { id: 'experiencia', label: 'Experiencias' }, { id: 'objeto', label: 'Objetos' }]
const REWARDS = [
  { id: 'semillas', title: 'Kit de semillas', points: 150, text: 'Para tu huerta en casa', type: 'objeto', icon: sprout, tone: 'amber' },
  { id: 'visita', title: 'Visita guiada', points: 300, text: 'Descubrí la naturaleza del Iberá', type: 'experiencia', icon: binoculars, tone: 'lilac' },
  { id: 'plantin', title: 'Plantín', points: 200, text: 'Una nueva vida para tu hogar', type: 'objeto', icon: flower, tone: 'amber' },
]

export default function Recompensas() {
  const [filter, setFilter] = useState('todas')
  const [redeemed, setRedeemed] = useState([])
  const shown = REWARDS.filter(r => filter === 'todas' || r.type === filter)
  return <ScreenLayout title="Recompensas" className="recompensas">
    <div className="recompensas__filters" role="group" aria-label="Filtrar recompensas">{FILTERS.map(f => <button key={f.id} type="button" aria-pressed={filter === f.id} className={filter === f.id ? 'is-active' : ''} onClick={() => setFilter(f.id)}>{f.label}</button>)}</div>
    {shown.map(r => {
      const done = redeemed.includes(r.id)
      return <article key={r.id} className="recompensas__item"><span className={`recompensas__art recompensas__art--${r.tone}`}><img src={r.icon} alt="" aria-hidden="true" /></span><div><h2>{r.title}</h2><p>{r.points} puntos</p><p className="recompensas__text">{r.text}</p></div><img src={divider} alt="" aria-hidden="true" /><button type="button" disabled={done} onClick={() => setRedeemed([...redeemed, r.id])} aria-label={done ? `${r.title} canjeado` : `Canjear ${r.title} por ${r.points} puntos`}>{done ? 'Canjeado' : 'Canjear'}</button></article>
    })}
  </ScreenLayout>
}
