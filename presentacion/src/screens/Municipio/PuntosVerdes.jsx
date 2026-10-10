import { useState } from 'react'
import { Plus, ChevronRight } from 'lucide-react'
import MuniScreen, { Chip } from './MuniScreen.jsx'
import { useMunicipio } from './MunicipioContext.jsx'
import foto from '../../assets/municipio/punto-verde.png'

/** Formulario para crear o editar un punto verde (no está en el Figma). */
function Formulario({ punto, onSave, onCancel }) {
  const [form, setForm] = useState(punto)
  const set = (k, v) => setForm({ ...form, [k]: v })
  function submit(e) { e.preventDefault(); if (form.nombre.trim() && form.direccion.trim()) onSave({ ...form, nombre: form.nombre.trim(), direccion: form.direccion.trim() }) }
  return <form className="muni-punto-form" onSubmit={submit}>
    <label htmlFor="punto-nombre">Nombre</label><input id="punto-nombre" value={form.nombre} onChange={e => set('nombre', e.target.value)} required />
    <label htmlFor="punto-direccion">Dirección</label><input id="punto-direccion" value={form.direccion} onChange={e => set('direccion', e.target.value)} required />
    <label className="muni-punto-form__check"><input id="punto-activo" type="checkbox" checked={form.activo} onChange={e => set('activo', e.target.checked)} /> Activo (se muestra en el mapa)</label>
    <div className="muni-punto-form__actions"><button type="button" className="muni-btn muni-btn--ghost" onClick={onCancel}>Cancelar</button><button type="submit" className="muni-btn">Guardar</button></div>
  </form>
}

// Figma, Page 3: "23 · Gestión de puntos verdes".
export default function PuntosVerdes() {
  const { puntos, guardarPunto } = useMunicipio()
  const [editando, setEditando] = useState(null)
  const save = p => { guardarPunto(p); setEditando(null) }
  return <MuniScreen title="Puntos verdes" back tab="/municipio/estadisticas">
    <div className="muni-puntos__new"><button type="button" className="muni-btn" onClick={() => setEditando({ id: `punto-${Date.now()}`, nombre: '', direccion: '', activo: true, x: 180, y: 300 })}><Plus size={20} strokeWidth={1.8} aria-hidden="true" />Nuevo punto</button></div>
    {editando && !puntos.some(p => p.id === editando.id) && <Formulario punto={editando} onSave={save} onCancel={() => setEditando(null)} />}
    {puntos.map(p => editando?.id === p.id
      ? <Formulario key={p.id} punto={p} onSave={save} onCancel={() => setEditando(null)} />
      : <button key={p.id} type="button" className="muni-punto" onClick={() => setEditando(p)} aria-label={`Editar ${p.nombre}`}>
          <span className="muni-punto__img" aria-hidden="true"><img src={foto} alt="" /></span>
          <span className="muni-punto__info"><strong>{p.nombre}</strong><span>{p.direccion}</span><span className="muni-punto__foot"><Chip tone={p.activo ? 'green' : 'plain'}>{p.activo ? 'Activo' : 'Inactivo'}</Chip><ChevronRight size={16} strokeWidth={1.8} aria-hidden="true" /></span></span>
        </button>)}
  </MuniScreen>
}
