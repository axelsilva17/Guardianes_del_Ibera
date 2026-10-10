// Filtros por estado, compartidos por el Mapa de gestión y la lista de Reportes.
export const FILTROS = [
  { id: 'todos', label: 'Todos' },
  { id: 'pendiente', label: 'Pendientes' },
  { id: 'en_curso', label: 'En curso' },
  { id: 'resuelto', label: 'Resueltos' },
]

export default function Filtros({ value, onChange }) {
  return <div className="muni-filters" role="group" aria-label="Filtrar por estado">{FILTROS.map(f => <button key={f.id} type="button" aria-pressed={value === f.id} className={value === f.id ? 'is-active' : ''} onClick={() => onChange(f.id)}>{f.label}</button>)}</div>
}
