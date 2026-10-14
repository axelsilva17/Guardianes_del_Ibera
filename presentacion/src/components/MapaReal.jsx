import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../styles/MapaReal.css'

/**
 * Mapa real con OpenStreetMap (Leaflet): gratis, sin key ni configuración en Vercel.
 * Mosaicos del servidor público de OpenStreetMap: sirve para un prototipo con poco tráfico
 * (https://operations.osmfoundation.org/policies/tiles/). Para mucho tráfico, usar un proveedor propio.
 *
 * pines: [{ id, lat, lng, label, iconos: [url, ...], seleccionado }]
 */
const MOSAICOS = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const CREDITOS = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>'

export default function MapaReal({ className, pines, onSelect, onFondo }) {
  const caja = useRef(null)
  const mapa = useRef(null)
  const capa = useRef(null)
  const encuadre = useRef({ ids: '', movido: false })
  const callbacks = useRef({ onSelect, onFondo })
  callbacks.current = { onSelect, onFondo }

  // Crear el mapa una sola vez.
  useEffect(() => {
    const m = L.map(caja.current, { zoomControl: false, attributionControl: true })
    L.tileLayer(MOSAICOS, { attribution: CREDITOS, maxZoom: 19 }).addTo(m)
    L.control.zoom({ position: 'bottomright', zoomInTitle: 'Acercar', zoomOutTitle: 'Alejar' }).addTo(m)
    m.attributionControl.setPrefix(false)
    m.setView([-28.536, -57.17], 15)
    m.on('dragstart', () => { encuadre.current.movido = true })
    m.on('click', () => callbacks.current.onFondo?.())
    capa.current = L.layerGroup().addTo(m)
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
    pines.forEach(p => {
      // Leaflet mueve el pin con transform: el agrandado del seleccionado va en un span interno.
      const html = `<span class="mapa-real-pin__cuerpo">${p.iconos.map((src, i) => `<img src="${src}" alt=""${i ? ' class="mapa-real-pin__icono"' : ''}>`).join('')}</span>`
      const icon = L.divIcon({ html, className: `mapa-real-pin${p.seleccionado ? ' is-selected' : ''}`, iconSize: [23, 30], iconAnchor: [11.5, 30] })
      L.marker([p.lat, p.lng], { icon, title: p.label, alt: p.label, keyboard: true, riseOnHover: true })
        .on('click', e => { L.DomEvent.stopPropagation(e); callbacks.current.onSelect?.(p.id) })
        .addTo(capa.current)
    })
  }, [pines])

  return <div ref={caja} className={className} role="region" aria-label="Mapa" />
}
