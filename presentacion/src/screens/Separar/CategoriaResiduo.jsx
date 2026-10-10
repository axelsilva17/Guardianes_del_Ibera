import { Link, Navigate, useParams } from 'react-router-dom'
import SepararLayout, { WasteArt } from './SepararLayout.jsx'
import { CATEGORIES } from './data.js'
import lobito from '../../assets/images/lobito.png'
import check from '../../assets/separar/check.svg'
const lines = import.meta.glob('../../assets/separar/line-*.svg', { eager: true, query: '?url', import: 'default' })

export default function CategoriaResiduo() {
  const { categoria } = useParams()
  const item = CATEGORIES.find(c => c.id === categoria)
  if (!item) return <Navigate to="/aprender/separar" replace />
  const line = lines[`../../assets/separar/line-${item.id}.svg`]
  function List({ title, items }) { return <section className="separar__list"><h2>{title}</h2><img src={line} alt="" aria-hidden="true" /><ul>{items.map(text => <li key={text}><img src={check} alt="" aria-hidden="true" /><span>{text}</span></li>)}</ul></section> }
  const tip = <><div className="separar__lobito"><img src={lobito} alt="" aria-hidden="true" /></div><div><h2>Consejo de Lobito</h2><p>{item.advice}</p></div></>
  return <SepararLayout title={item.title} className="separar--lesson"><section className="separar__definition" style={{ background: item.tint }}><div><h2>¿Qué son?</h2><p>{item.description}</p></div><div className="separar__hero-art"><WasteArt category={item} hero /></div></section><List title="¿Qué incluyen?" items={item.includes} /><List title="¿Qué podés hacer con ellos?" items={item.actions} /><div className="separar__tip-space">{item.link ? <Link className="separar__tip" to={item.link} aria-label="Aprendé a compostar con Ciervito">{tip}</Link> : <aside className="separar__tip">{tip}</aside>}</div></SepararLayout>
}
