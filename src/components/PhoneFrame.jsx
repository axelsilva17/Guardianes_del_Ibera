export default function PhoneFrame({ title, children }) {
  return (
    <div className="phone-stage">
      {title ? <span className="phone-stage__label">{title}</span> : null}
      <div
        className="phone-frame"
        role="group"
        aria-label={title ? `Pantalla ${title}` : 'Pantalla de la app'}
      >
        <div className="phone-frame__screen">{children}</div>
      </div>
    </div>
  )
}
