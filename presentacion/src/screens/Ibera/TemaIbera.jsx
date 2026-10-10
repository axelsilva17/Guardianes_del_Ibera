import { Navigate, useParams } from 'react-router-dom'
import SepararLayout from '../Separar/SepararLayout.jsx'
import { Sprite } from '../Compostar/LessonLayout.jsx'
import { TOPICS } from './data.js'
import temas from '../../assets/ibera/temas.png'
import oso from '../../assets/ibera/oso.png'
import line from '../../assets/ibera/line.svg'
import check from '../../assets/separar/check.svg'
import '../../styles/Ibera.css'

export default function TemaIbera() {
  const { tema } = useParams()
  const topic = TOPICS.find(t => t.id === tema)
  if (!topic) return <Navigate to="/aprender/ibera" replace />
  return <SepararLayout title={topic.title} backTo="/aprender/ibera" className="compostar ibera ibera--topic">
    <section className="ibera__intro"><Sprite src={temas} {...topic.hero} /><h2>{topic.heading}</h2><p>{topic.text}</p></section>
    <section className="ibera__tips"><h2>{topic.listTitle}</h2><img src={line} alt="" aria-hidden="true" /><ul>{topic.items.map(text => <li key={text}><img src={check} alt="" aria-hidden="true" /><span>{text}</span></li>)}</ul><img className="ibera__oso" src={oso} alt="" aria-hidden="true" /></section>
  </SepararLayout>
}
