import { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { convert, getRate } from '../../../utils/exchange';
import { REFERENCE_RATES } from '../referenceRates';
import './Hero.css';

// La escena 3D se descarga aparte, solo cuando se abre la landing.
const HeroScene = lazy(() => import('../HeroScene/HeroScene'));

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.2, 0.8, 0.2, 1] } },
} as const;

const TICKET_AMOUNT = 100;

function formatNumber(value: number, decimals = 2) {
  return value.toLocaleString('es-AR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function Hero() {
  const rate = getRate('USD', 'PEN', REFERENCE_RATES);
  const received = convert(TICKET_AMOUNT, 'USD', 'PEN', REFERENCE_RATES);

  return (
    <section className="hero">
      <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
        <motion.div className="hero__meta" variants={fadeUp}>
          <i />
          ARS · PEN · USD · EUR
        </motion.div>

        <motion.h1 className="hero__title" variants={fadeUp}>
          Cuatro monedas.
          <em className="landing-serif">Una sola cuenta.</em>
        </motion.h1>

        <motion.p className="hero__lead" variants={fadeUp}>
          Para quien <strong>cobra en una moneda, estudia en otra y viaja con una tercera.</strong>{' '}
          Atlaspay guarda tus pesos, soles, dólares y euros juntos, y te dice cuánto vale cada uno
          hoy.
        </motion.p>

        <motion.div className="hero__cta" variants={fadeUp}>
          <Link className="landing-btn landing-btn--primary" to="/register">
            Crear cuenta
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
          <a className="landing-btn landing-btn--line" href="#como-funciona">
            Cómo funciona
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero__stage"
        aria-hidden="true"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>

        <div className="hero__ticket">
          <div className="hero__ticket-row">
            <span>Envías</span>
            <span>USD</span>
          </div>
          <p className="hero__ticket-amount">
            {formatNumber(TICKET_AMOUNT)}
            <span>USD</span>
          </p>
          <div className="hero__ticket-line" />
          <div className="hero__ticket-row">
            <span>Recibes</span>
            <span>PEN</span>
          </div>
          <p className="hero__ticket-amount">
            {formatNumber(received)}
            <span>PEN</span>
          </p>
          <p className="hero__ticket-foot">
            1 USD = {formatNumber(rate, 4)} PEN · tasa de referencia
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default Hero;
