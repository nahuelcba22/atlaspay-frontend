import Reveal from '../Reveal/Reveal';
import './Stories.css';

const STORIES = [
  {
    route: ['Lima', 'Buenos Aires'],
    quote: '“Me voy un semestre de intercambio y necesito saber cuánto me rinden mis soles.”',
    text: 'Pasas de PEN a ARS cuando lo necesites y ves el saldo de cada moneda en un solo lugar.',
    pair: 'PEN → ARS',
  },
  {
    route: ['Madrid'],
    quote: '“Cobro en euros, pero ahorro en dólares.”',
    text: 'Compras USD con tu saldo en EUR y sabes exactamente a qué tasa.',
    pair: 'EUR → USD',
  },
  {
    route: ['De viaje'],
    quote: '“Quiero saber cuánto gasto antes de pagar.”',
    text: 'Consultas la conversión al instante, con la hora de la última actualización.',
    pair: 'USD → PEN',
  },
];

function Stories() {
  return (
    <section className="landing-section" id="para-quien">
      <Reveal className="landing-section__head">
        <span className="landing-eyebrow">Para quién</span>
        <h2 className="landing-section__title">
          Hecha para gente que vive <em className="landing-serif">entre países.</em>
        </h2>
      </Reveal>

      <div className="stories">
        {STORIES.map((story, index) => (
          <Reveal key={story.pair} className="stories__card" delay={index * 0.09}>
            <div className="stories__route">
              {story.route.map((place, placeIndex) => (
                <span key={place} className="stories__place">
                  {placeIndex > 0 && <i />}
                  {place}
                </span>
              ))}
            </div>
            <blockquote>{story.quote}</blockquote>
            <p>{story.text}</p>
            <span className="stories__pair">{story.pair}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export default Stories;
