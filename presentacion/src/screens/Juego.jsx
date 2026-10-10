import JuegoIntro from './Quiz/JuegoIntro.jsx'

// Se abre desde Inicio, Aprender, Compostaje y Cuidemos el Iberá: la flecha vuelve a la pantalla anterior.
export default function Juego() {
  return <JuegoIntro playTo="/juego/compostar" fallback="/compostar" />
}
