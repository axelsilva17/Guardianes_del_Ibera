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
import Ibera from './screens/Ibera/Ibera.jsx'
import TemaIbera from './screens/Ibera/TemaIbera.jsx'
import JuegoIbera from './screens/Ibera/JuegoIbera.jsx'
import QuizIbera from './screens/Ibera/QuizIbera.jsx'
import Recompensas from './screens/Recompensas.jsx'
import Nivel from './screens/Nivel.jsx'
import { MunicipioRoot } from './screens/Municipio/MunicipioContext.jsx'
import MuniLogin from './screens/Municipio/Login.jsx'
import MuniPanel from './screens/Municipio/Panel.jsx'
import MuniMapa from './screens/Municipio/Mapa.jsx'
import MuniReportes from './screens/Municipio/Reportes.jsx'
import MuniDetalle from './screens/Municipio/Detalle.jsx'
import MuniAsignacion from './screens/Municipio/Asignacion.jsx'
import MuniResuelto from './screens/Municipio/Resuelto.jsx'
import MuniEstadisticas from './screens/Municipio/Estadisticas.jsx'
import MuniPuntosVerdes from './screens/Municipio/PuntosVerdes.jsx'
import MuniPerfil from './screens/Municipio/Perfil.jsx'

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
        <Route path="/aprender/ibera" element={<Ibera />} />
        <Route path="/aprender/ibera/juego" element={<JuegoIbera />} />
        <Route path="/aprender/ibera/desafio" element={<QuizIbera />} />
        <Route path="/aprender/ibera/:tema" element={<TemaIbera />} />
        <Route path="/mis-reportes" element={<MisReportes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/recompensas" element={<Recompensas />} />
        <Route path="/nivel" element={<Nivel />} />
        <Route path="/municipio" element={<MunicipioRoot />}>
          <Route index element={<MuniLogin />} />
          <Route path="panel" element={<MuniPanel />} />
          <Route path="mapa" element={<MuniMapa />} />
          <Route path="reportes" element={<MuniReportes />} />
          <Route path="reportes/:id" element={<MuniDetalle />} />
          <Route path="reportes/:id/asignacion" element={<MuniAsignacion />} />
          <Route path="reportes/:id/resuelto" element={<MuniResuelto />} />
          <Route path="estadisticas" element={<MuniEstadisticas />} />
          <Route path="puntos-verdes" element={<MuniPuntosVerdes />} />
          <Route path="perfil" element={<MuniPerfil />} />
        </Route>
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
