import PhoneFrame from '../../components/PhoneFrame.jsx'
import StatusBar from '../../components/StatusBar.jsx'
import BottomNav from '../../components/BottomNav.jsx'
import BackButton from '../../components/BackButton.jsx'

export default function LessonLayout({
  title,
  step,
  total = 6,
  children,
  onNext,
  onBack,
  showNext = true,
  backLabel = 'Volver',
  nextLabel = 'Siguiente',
}) {
  return (
    <PhoneFrame title={title || 'Compostaje'}>
      <div className="compostar">
        <StatusBar />
        <header className="compostar__header" style={{ paddingTop: '8px' }}>
          <BackButton className="compostar__back" />
          <h1 className="compostar__title">{title}</h1>
        </header>

        {step ? (
          <div className="comp-progress" aria-label={`Paso ${step} de ${total}`}>
            <div className="comp-progress__track">
              <div
                className="comp-progress__fill"
                style={{ width: `${(step / total) * 100}%` }}
              />
            </div>
            <span className="comp-progress__label">{step} de {total}</span>
          </div>
        ) : null}

        <main className="comp-body">{children}</main>

        <footer
          className="comp-lesson__footer"
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'space-between',
            padding: '16px 24px',
          }}
        >
          {onBack ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onBack()
              }}
              className="button button--ghost"
              aria-label={backLabel}
            >
              {backLabel}
            </a>
          ) : (
            <span />
          )}
          {showNext && onNext ? (
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault()
                onNext()
              }}
              className="button button--primary"
              aria-label={nextLabel}
            >
              {nextLabel}
            </a>
          ) : null}
        </footer>

        <BottomNav />
      </div>
    </PhoneFrame>
  )
}
