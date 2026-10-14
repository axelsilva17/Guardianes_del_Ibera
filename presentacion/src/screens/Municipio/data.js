// Datos de ejemplo del panel municipal (Figma, Page 3: pantallas 17–23 y "Login municipal").
// No vienen del backend: asignar y resolver solo cambian el estado en memoria hasta recargar.

export const ESTADOS = {
  pendiente: { label: 'Pendiente', tone: 'red' },
  en_curso: { label: 'En curso', tone: 'amber' },
  resuelto: { label: 'Resuelto', tone: 'green' },
}

export const PRIORIDADES = {
  alta: { label: 'Alta', tone: 'red' },
  media: { label: 'Media', tone: 'amber' },
  baja: { label: 'Baja', tone: 'green' },
}

// Orden y colores del gráfico de torta: validados para daltonismo (cada sector solo toca vecinos distinguibles).
export const TIPOS = {
  organicos: { label: 'Orgánicos', color: '#4caf63' },
  plasticos: { label: 'Plásticos', color: '#2aa8cc' },
  papel: { label: 'Papel y cartón', color: '#d99a2b' },
  otros: { label: 'Otros', color: '#e0605c' },
  vidrio: { label: 'Vidrio', color: '#a552b3' },
}

export const AREAS = ['Servicios Públicos', 'Medio Ambiente', 'Higiene Urbana', 'Guardaparques']

export const PASOS = ['Asignado', 'En camino', 'Intervención']

// `x`/`y`: posición del pin sobre la imagen del mapa (en px del diseño, área de 354×634).
export const REPORTES = [
  { numero: 42, titulo: 'Microbasural', tipo: 'plasticos', ubicacion: 'Calle San Martín · Colonia C. Pellegrini', fecha: 'Hoy', hora: '10:32', estado: 'en_curso', prioridad: 'media', area: 'Servicios Públicos', pasos: { Asignado: 'Hoy 10:40' }, x: 221, y: 125 },
  { numero: 41, titulo: 'Residuos', tipo: 'organicos', ubicacion: 'Costanera · Laguna Iberá', fecha: 'Hoy', hora: '09:15', estado: 'en_curso', prioridad: 'alta', area: 'Servicios Públicos', pasos: { Asignado: 'Hoy 09:40' }, x: 120, y: 300 },
  { numero: 40, titulo: 'Quema de residuos', tipo: 'otros', ubicacion: 'Ruta 40 · km 12', fecha: 'Ayer', hora: '19:05', estado: 'pendiente', prioridad: 'alta', x: 60, y: 520 },
  { numero: 39, titulo: 'Vidrios en el sendero', tipo: 'vidrio', ubicacion: 'Sendero Carayá', fecha: 'Ayer', hora: '18:20', estado: 'en_curso', prioridad: 'media', area: 'Guardaparques', pasos: { Asignado: 'Ayer 18:50', 'En camino': 'Hoy 08:10' }, x: 300, y: 400 },
  { numero: 38, titulo: 'Basura en la costa', tipo: 'plasticos', ubicacion: 'Costa del humedal · Laguna Iberá', fecha: '09/10', hora: '12:50', estado: 'resuelto', prioridad: 'baja', area: 'Higiene Urbana', pasos: { Asignado: '09/10 13:10', 'En camino': '09/10 15:00', 'Intervención': '09/10 17:45' }, resuelto: '09/10 19:30', x: 180, y: 220 },
  { numero: 37, titulo: 'Cartones acumulados', tipo: 'papel', ubicacion: 'Av. San Martín 450', fecha: '12/10', hora: '11:00', estado: 'resuelto', prioridad: 'baja', area: 'Servicios Públicos', resuelto: '13/10 10:15', x: 250, y: 560 },
  { numero: 36, titulo: 'Bolsas en la laguna', tipo: 'plasticos', ubicacion: 'Laguna Iberá · muelle', fecha: '11/10', hora: '15:30', estado: 'resuelto', prioridad: 'alta', area: 'Medio Ambiente', resuelto: '12/10 09:00', x: 150, y: 450 },
  { numero: 35, titulo: 'Restos de poda', tipo: 'organicos', ubicacion: 'Calle Yacaré', fecha: '10/10', hora: '08:45', estado: 'resuelto', prioridad: 'baja', area: 'Servicios Públicos', resuelto: '10/10 17:20', x: 90, y: 160 },
  { numero: 34, titulo: 'Papeles en el mirador', tipo: 'papel', ubicacion: 'Mirador Iberá', fecha: '09/10', hora: '17:10', estado: 'resuelto', prioridad: 'media', area: 'Guardaparques', resuelto: '10/10 11:40', x: 320, y: 230 },
  { numero: 33, titulo: 'Electrodoméstico abandonado', tipo: 'otros', ubicacion: 'Acceso al pueblo', fecha: '08/10', hora: '12:00', estado: 'resuelto', prioridad: 'media', area: 'Higiene Urbana', resuelto: '09/10 16:00', x: 40, y: 380 },
]

// Historial adicional de ejemplo para explorar estadísticas y filtros.
// Generación determinista: los datos no cambian aleatoriamente al recargar.
const ZONAS_DEMO = [
  ['Barrio Centro', 'Calle San Martín'], ['Barrio Norte', 'Calle Yacaré'],
  ['Barrio Sur', 'Costanera sur'], ['Barrio Oeste', 'Acceso al pueblo'],
  ['Barrio Este', 'Calle Carayá'], ['Colonia Pellegrini', 'Ruta 40'],
]
const TITULOS_DEMO = {
  plasticos: ['Envases en la cuneta', 'Bolsas junto al muelle', 'Botellas en el sendero', 'Plásticos en la costa'],
  organicos: ['Restos de poda acumulados', 'Residuos orgánicos en la vereda', 'Ramas obstruyendo el paso', 'Restos vegetales en la plaza'],
  papel: ['Cartones fuera del contenedor', 'Papeles en el mirador', 'Cajas acumuladas en la esquina', 'Embalajes junto al punto verde'],
  vidrio: ['Botellas rotas en la plaza', 'Vidrios en el sendero', 'Frascos fuera del contenedor', 'Vidrios junto a la costanera'],
  otros: ['Neumáticos abandonados', 'Electrodoméstico en la vía pública', 'Microbasural junto al camino', 'Escombros en terreno baldío'],
}
const idsDemo = Array.from({ length: 128 }, (_, i) => 128 - i).filter(n => !REPORTES.some(r => r.numero === n))
REPORTES.push(...idsDemo.map((n, i) => {
  const tipoValor = (i * 17) % 100
  const tipo = tipoValor < 38 ? 'plasticos' : tipoValor < 62 ? 'organicos' : tipoValor < 80 ? 'papel' : tipoValor < 92 ? 'vidrio' : 'otros'
  const estadoValor = (i * 37) % 118
  const estado = estadoValor < 33 ? 'pendiente' : estadoValor < 42 ? 'en_curso' : 'resuelto'
  const prioridad = ['alta', 'media', 'media', 'baja', 'baja', 'media', 'alta'][i % 7]
  const [zona, calle] = ZONAS_DEMO[i % ZONAS_DEMO.length]
  const mes = 4 + (i % 7), dia = 1 + ((i * 11) % (mes === 10 ? 13 : 27))
  const fecha = `${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/2026`
  const hora = `${String(7 + (i % 11)).padStart(2, '0')}:${String((i * 13) % 60).padStart(2, '0')}`
  const area = AREAS[i % AREAS.length]
  const pasos = estado === 'pendiente' ? undefined : { Asignado: `${fecha} ${hora}` }
  if (estado === 'resuelto') {
    pasos['En camino'] = `${fecha} 18:00`
    pasos.Intervención = `${fecha} 18:30`
  }
  return {
    numero: n, titulo: TITULOS_DEMO[tipo][Math.floor(i / 7) % 4], tipo,
    ubicacion: `${calle} ${100 + (i % 12) * 50} · ${zona}`, zona,
    fecha, fechaISO: `2026-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`,
    hora, estado, prioridad, ...(pasos ? { area, pasos } : {}),
    ...(estado === 'resuelto' ? { resuelto: `${fecha} 19:00` } : {}),
    x: 25 + ((i * 47) % 300), y: 70 + ((i * 83) % 510),
  }
}))

export const PUNTOS_VERDES = [
  { id: 'pellegrini', nombre: 'Punto verde Carlos Pellegrini', direccion: 'Colonia Carlos Pellegrini', activo: true, x: 42, y: 160 },
  { id: 'centro', nombre: 'Centro de reciclaje municipal', direccion: 'Av. San Martín 450', activo: true, x: 286, y: 216 },
  { id: 'ibera', nombre: 'Punto verde Iberá', direccion: 'Acceso al pueblo', activo: false, x: 97, y: 390 },
  { id: 'costanera', nombre: 'Punto verde Costanera', direccion: 'Costanera sur', activo: true, x: 281, y: 457 },
]

// Promedio mensual de días hasta resolver un reporte (últimos 12 meses, el último es el actual).
export const RESOLUCION_MENSUAL = [
  { mes: 'Nov', dias: 0.6 }, { mes: 'Dic', dias: 1.0 }, { mes: 'Ene', dias: 0.7 }, { mes: 'Feb', dias: 1.4 },
  { mes: 'Mar', dias: 0.9 }, { mes: 'Abr', dias: 1.2 }, { mes: 'May', dias: 1.9 }, { mes: 'Jun', dias: 2.6 },
  { mes: 'Jul', dias: 1.3 }, { mes: 'Ago', dias: 1.6 }, { mes: 'Sep', dias: 2.9 }, { mes: 'Oct', dias: 1.8 },
]

export const numero = n => `#${String(n).padStart(3, '0')}`
