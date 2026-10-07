import Reveal from '../Reveal/Reveal';
import './HowItWorks.css';

const STEPS = [
  {
    number: 'i.',
    title: 'Te registras en segundos y creas tu cuenta',
    text: 'Reúne tus ingresos en pesos, soles, dólares o euros en un solo lugar.',
  },
  {
    number: 'ii.',
    title: 'Eliges de qué moneda a qué moneda necesitas convertir tu dinero',
    text: 'Ves la tasa real del día y conviertes la moneda que necesites con un solo clic.',
  },
  {
    number: 'iii.',
    title: 'Recibes la confirmación al instante',
    text: 'Cada operación queda en tu historial y recibes un email con el detalle exacto una vez confirmada.',
  },
];

function HowItWorks() {
  return (
    <section className="landing-section" id="como-funciona">
      <Reveal className="landing-section__head">
        <span className="landing-eyebrow">Cómo funciona</span>
        <h2 className="landing-section__title">
          Convertir tu dinero no debería requerir{' '}
          <em className="landing-serif">más esfuerzo.</em>
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
