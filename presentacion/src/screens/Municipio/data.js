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
  { numero: 42, titulo: 'Microbasural', tipo: 'plasticos', ubicacion: 'Calle San Martín · Colonia C. Pellegrini', fecha: 'Hoy', hora: '10:32', estado: 'pendiente', prioridad: 'media', x: 221, y: 125 },
  { numero: 41, titulo: 'Residuos', tipo: 'organicos', ubicacion: 'Costanera · Laguna Iberá', fecha: 'Hoy', hora: '09:15', estado: 'en_curso', prioridad: 'alta', area: 'Servicios Públicos', pasos: { Asignado: 'Hoy 09:40' }, x: 120, y: 300 },
  { numero: 40, titulo: 'Quema de residuos', tipo: 'otros', ubicacion: 'Ruta 40 · km 12', fecha: 'Ayer', hora: '19:05', estado: 'pendiente', prioridad: 'alta', x: 60, y: 520 },
  { numero: 39, titulo: 'Vidrios en el sendero', tipo: 'vidrio', ubicacion: 'Sendero Carayá', fecha: 'Ayer', hora: '18:20', estado: 'en_curso', prioridad: 'media', area: 'Guardaparques', pasos: { Asignado: 'Ayer 18:50', 'En camino': 'Hoy 08:10' }, x: 300, y: 400 },
  { numero: 38, titulo: 'Basura', tipo: 'plasticos', ubicacion: 'Plaza principal', fecha: 'Ayer', hora: '16:40', estado: 'resuelto', prioridad: 'baja', area: 'Higiene Urbana', resuelto: 'Ayer 19:30', x: 180, y: 220 },
  { numero: 37, titulo: 'Cartones acumulados', tipo: 'papel', ubicacion: 'Av. San Martín 450', fecha: '12/10', hora: '11:00', estado: 'resuelto', prioridad: 'baja', area: 'Servicios Públicos', resuelto: '13/10 10:15', x: 250, y: 560 },
  { numero: 36, titulo: 'Bolsas en la laguna', tipo: 'plasticos', ubicacion: 'Laguna Iberá · muelle', fecha: '11/10', hora: '15:30', estado: 'resuelto', prioridad: 'alta', area: 'Medio Ambiente', resuelto: '12/10 09:00', x: 150, y: 450 },
  { numero: 35, titulo: 'Restos de poda', tipo: 'organicos', ubicacion: 'Calle Yacaré', fecha: '10/10', hora: '08:45', estado: 'resuelto', prioridad: 'baja', area: 'Servicios Públicos', resuelto: '10/10 17:20', x: 90, y: 160 },
  { numero: 34, titulo: 'Papeles en el mirador', tipo: 'papel', ubicacion: 'Mirador Iberá', fecha: '09/10', hora: '17:10', estado: 'resuelto', prioridad: 'media', area: 'Guardaparques', resuelto: '10/10 11:40', x: 320, y: 230 },
  { numero: 33, titulo: 'Electrodoméstico abandonado', tipo: 'otros', ubicacion: 'Acceso al pueblo', fecha: '08/10', hora: '12:00', estado: 'resuelto', prioridad: 'media', area: 'Higiene Urbana', resuelto: '09/10 16:00', x: 40, y: 380 },
]

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
