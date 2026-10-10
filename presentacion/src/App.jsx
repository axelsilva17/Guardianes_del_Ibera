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
        <Route path="/mis-reportes" element={<MisReportes />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/juego" element={<Juego />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
