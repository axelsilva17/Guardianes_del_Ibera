import JuegoIntro from '../Quiz/JuegoIntro.jsx'

// Se abre desde Cuidemos el Iberá, Inicio y Aprender: la flecha vuelve a la pantalla anterior.
export default function JuegoIbera() {
  return <JuegoIntro playTo="/aprender/ibera/desafio" fallback="/aprender/ibera" />
}
