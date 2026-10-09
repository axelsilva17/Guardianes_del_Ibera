export default function Card({ className = '', children, ...props }) {
  return (
    <section className={`card${className ? ` ${className}` : ''}`} {...props}>
      {children}
    </section>
  )
}
