import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Bienvenida from './screens/Bienvenida.jsx'
import Login from './screens/Login.jsx'
import Inicio from './screens/Inicio.jsx'
import Mapa from './screens/Mapa.jsx'
import Reportar from './screens/Reportar.jsx'
import Aprender from './screens/Aprender.jsx'
import MisReportes from './screens/MisReportes.jsx'
import Perfil from './screens/Perfil.jsx'
import Juego from './screens/Juego.jsx'
import QuizCompostar from './screens/QuizCompostar.jsx'
import Separar from './screens/Separar/Separar.jsx'
import CategoriaResiduo from './screens/Separar/CategoriaResiduo.jsx'
import JuegoSeparar from './screens/Separar/JuegoSeparar.jsx'
import QuizSeparar from './screens/Separar/QuizSeparar.jsx'
import CompostarIntro from './screens/Compostar/Intro.jsx'
import Recipiente from './screens/Compostar/Recipiente.jsx'
import Lugar from './screens/Compostar/Lugar.jsx'
import Armar from './screens/Compostar/Armar.jsx'
import Cuidar from './screens/Compostar/Cuidar.jsx'
import Listo from './screens/Compostar/Listo.jsx'
import Cierre from './screens/Compostar/Cierre.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Bienvenida />} />
        <Route path="/login" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/mapa" element={<Mapa />} />
        <Route path="/reportar" element={<Reportar />} />
        <Route path="/aprender" element={<Aprender />} />
        <Route path="/aprender/separar" element={<Separar />} />
        <Route path="/aprender/separar/:categoria" element={<CategoriaResiduo />} />
        <Route path="/aprender/separar/juego" element={<JuegoSeparar />} />
        <Route path="/aprender/separar/desafio" element={<QuizSeparar />} />
        <Route path="/mis-reportes" element={<MisReportes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="/juego/compostar" element={<QuizCompostar />} />
        <Route path="/compostar" element={<CompostarIntro />} />
        <Route path="/compostar/1" element={<Recipiente />} />
        <Route path="/compostar/2" element={<Lugar />} />
        <Route path="/compostar/3" element={<Armar />} />
        <Route path="/compostar/4" element={<Cuidar />} />
        <Route path="/compostar/5" element={<Listo />} />
        <Route path="/compostar/6" element={<Cierre />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
