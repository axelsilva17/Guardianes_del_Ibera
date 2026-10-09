/**
 * Teardrop map marker used on the citizen map.
 * variant "green" renders a solid green pin with a white dot;
 * variant "report" renders a red pin wrapping a supplied icon.
 */
export default function MapMarker({ variant = 'green', icon = null, style }) {
  const fill = variant === 'report' ? 'var(--color-error)' : 'var(--color-primary)'

  return (
    <span className={`map-marker map-marker--${variant}`} style={style}>
      <svg className="map-marker__shape" viewBox="0 0 24 30" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 8.5 12 18 12 18s12-9.5 12-18C24 5.373 18.627 0 12 0Z" fill={fill} />
      </svg>
      <span className="map-marker__inner">
        {icon ?? <span className="map-marker__dot" />}
      </span>
    </span>
  )
}
