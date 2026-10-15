import { useEffect, useRef } from 'react'
import L from './leaflet.js'
import 'leaflet.markercluster'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import '../styles/MapaReal.css'

/**
 * Mapa real con OpenStreetMap (Leaflet): gratis, sin key ni configuración en Vercel.
 * Mosaicos del servidor público de OpenStreetMap: sirve para un prototipo con poco tráfico
 * (https://operations.osmfoundation.org/policies/tiles/). Para mucho tráfico, usar un proveedor propio.
 *
 * pines: [{ id, lat, lng, label, iconos: [url, ...] | html: '<…>', seleccionado, tono }]
 *   `iconos`: imágenes del pin (SVG); `html`: un pin propio de 28×28 centrado; `tono` colorea su grupo.
 * agrupar: junta los pines cercanos en un círculo con la cantidad (para cuando hay muchos).
 *   Los pines con `suelto: true` (p. ej. puntos verdes) nunca se agrupan: siempre quedan a la vista.
 * centro: [lat, lng] y zoom para arrancar ahí (en el celular medio punto más alejado). Sin `centro`,
 *   el mapa se encuadra para mostrar todos los pines.
 */
const MOSAICOS = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const CREDITOS = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'

// Centro de Colonia Carlos Pellegrini: vista inicial de los mapas del municipio.
export const CENTRO_PUEBLO = [-28.5355, -57.1690]
// Polideportivo de Colonia Carlos Pellegrini (calle Tuyuyú, OpenStreetMap): vista inicial del mapa del ciudadano.
export const CENTRO_POLIDEPORTIVO = [-28.5338, -57.1756]

// Círculo de un grupo de pines: rojo si tiene algún reporte, verde si son solo puntos verdes.
const iconoGrupo = grupo => {
  const hijos = grupo.getAllChildMarkers()
  const verde = hijos.every(m => m.options.tono === 'verde')
  return L.divIcon({ html: `<span>${hijos.length}</span>`, className: `mapa-real-grupo${verde ? ' mapa-real-grupo--verde' : ''}`, iconSize: [36, 36] })
}

export default function MapaReal({ className, pines, onSelect, onFondo, agrupar = false, centro, zoom = 15 }) {
  const caja = useRef(null)
  const mapa = useRef(null)
  const capa = useRef(null)
  const sueltos = useRef(null)
  const encuadre = useRef({ ids: '', movido: false })
  const callbacks = useRef({ onSelect, onFondo })
  callbacks.current = { onSelect, onFondo }

  // Crear el mapa una sola vez.
  useEffect(() => {
    const m = L.map(caja.current, { zoomControl: false, attributionControl: true, zoomSnap: .5 })
    L.tileLayer(MOSAICOS, { attribution: CREDITOS, maxZoom: 19 }).addTo(m)
    L.control.zoom({ position: 'bottomright', zoomInTitle: 'Acercar', zoomOutTitle: 'Alejar' }).addTo(m)
    m.attributionControl.setPrefix(false)
    m.setView(centro || [-28.536, -57.17], !centro ? 15 : caja.current.clientWidth >= 500 ? zoom : zoom - .5)
    if (centro) encuadre.current.movido = true // vista fija: no se reencuadra al llegar los pines
    m.on('dragstart', () => { encuadre.current.movido = true })
    m.on('click', () => callbacks.current.onFondo?.())
    capa.current = (agrupar
      ? L.markerClusterGroup({ iconCreateFunction: iconoGrupo, showCoverageOnHover: false, maxClusterRadius: 45, spiderfyOnMaxZoom: true })
      : L.layerGroup()).addTo(m)
    sueltos.current = L.layerGroup().addTo(m)
    mapa.current = m
    return () => { m.remove(); mapa.current = null }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Dibujar los pines cada vez que cambian (filtros, selección).
  useEffect(() => {
    // Encuadrar todos los pines cuando cambia cuáles hay (p. ej. llegan los de la API), salvo que el usuario ya haya movido el mapa.
    const ids = pines.map(p => p.id).sort().join()
    if (pines.length && ids !== encuadre.current.ids && !encuadre.current.movido)
      mapa.current.fitBounds(L.latLngBounds(pines.map(p => [p.lat, p.lng])), { paddingTopLeft: [30, 190], paddingBottomRight: [50, 40], maxZoom: 16 })
    encuadre.current.ids = ids
    capa.current.clearLayers()
    sueltos.current.clearLayers()
    pines.forEach(p => {
      // Leaflet mueve el pin con transform: el agrandado del seleccionado va en un span interno.
      const icon = p.html
        ? L.divIcon({ html: p.html, className: `mapa-real-punto${p.seleccionado ? ' is-selected' : ''}`, iconSize: [28, 28], iconAnchor: [14, 14] })
        : L.divIcon({ html: `<span class="mapa-real-pin__cuerpo">${p.iconos.map((src, i) => `<img src="${src}" alt=""${i ? ' class="mapa-real-pin__icono"' : ''}>`).join('')}</span>`,
          className: `mapa-real-pin${p.seleccionado ? ' is-selected' : ''}`, iconSize: [23, 30], iconAnchor: [11.5, 30] })
      L.marker([p.lat, p.lng], { icon, title: p.label, alt: p.label, keyboard: true, riseOnHover: true, tono: p.tono })
        .on('click', e => { L.DomEvent.stopPropagation(e); callbacks.current.onSelect?.(p.id) })
        .addTo(p.suelto ? sueltos.current : capa.current)
    })
  }, [pines])

  return <div ref={caja} className={className} role="region" aria-label="Mapa" />
}
