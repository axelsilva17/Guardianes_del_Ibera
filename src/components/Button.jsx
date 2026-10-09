export default function Button({
  variant = 'primary',
  type = 'button',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={`btn btn--${variant}${className ? ` ${className}` : ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
