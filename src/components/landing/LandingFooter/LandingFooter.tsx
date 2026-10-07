import { Link } from 'react-router-dom';
import Reveal from '../Reveal/Reveal';
import './LandingFooter.css';

function LandingFooter() {
  return (
    <>
      <section className="landing-closing">
        <Reveal>
          <h2 className="landing-closing__title">
            Tu dinero ya viaja contigo.{' '}
            <em className="landing-serif">Ahora bajo tu control.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link className="landing-btn landing-btn--primary" to="/register">
            Crear mi cuenta
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </Reveal>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer__word" aria-hidden="true">
          Atlaspay
        </div>
        <div className="landing-footer__row">
          <span> 2026 Atlaspay · Proyecto Final</span>
          <span>Operaciones simuladas. No se usa dinero real.</span>
          <a href="mailto:atlaspay.dev@gmail.com">Contacto: atlaspay.dev@gmail.com</a>
        </div>
      </footer>
    </>
  );
}

export default LandingFooter;
