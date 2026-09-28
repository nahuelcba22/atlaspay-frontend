import Reveal from '../Reveal/Reveal';
import './HowItWorks.css';

const STEPS = [
  {
    number: 'i.',
    title: 'Abres tu cuenta',
    text: 'Una billetera con cuatro saldos: pesos argentinos, soles, dólares y euros.',
  },
  {
    number: 'ii.',
    title: 'Eliges de qué a qué',
    text: 'Ves la tasa real del día y cuánto recibes antes de confirmar. Sin sorpresas.',
  },
  {
    number: 'iii.',
    title: 'Te llega el comprobante',
    text: 'Cada operación queda en tu historial y recibes un email con el detalle.',
  },
];

function HowItWorks() {
  return (
    <section className="landing-section" id="como-funciona">
      <Reveal className="landing-section__head">
        <span className="landing-eyebrow">Cómo funciona</span>
        <h2 className="landing-section__title">
          Convertir tu dinero no debería requerir{' '}
          <em className="landing-serif">una calculadora.</em>
        </h2>
      </Reveal>

      <div className="how-it-works">
        {STEPS.map((step, index) => (
          <Reveal key={step.number} className="how-it-works__step" delay={index * 0.09}>
            <span className="how-it-works__number">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
