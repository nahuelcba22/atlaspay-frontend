import { getRate } from '../../../utils/exchange';
import type { Currency } from '../../../utils/exchange';
import { REFERENCE_RATES } from '../referenceRates';
import './RatesTicker.css';

const PAIRS: [Currency, Currency][] = [
  ['USD', 'PEN'],
  ['USD', 'ARS'],
  ['USD', 'EUR'],
  ['EUR', 'PEN'],
  ['EUR', 'ARS'],
  ['PEN', 'ARS'],
  ['EUR', 'USD'],
  ['PEN', 'USD'],
];

function formatRate(value: number) {
  return value.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: value > 100 ? 2 : 4,
  });
}

function RatesTicker() {
  const items = PAIRS.map(([from, to]) => ({
    pair: `${from}/${to}`,
    value: formatRate(getRate(from, to, REFERENCE_RATES)),
  }));

  return (
    <div className="rates-ticker" aria-label="Tasas de referencia">
      <span className="rates-ticker__tag">Tasas de hoy</span>

      <div className="rates-ticker__viewport">
        {/* La lista va dos veces para que la animación sea continua. */}
        <div className="rates-ticker__track">
          {[...items, ...items].map((item, index) => (
            <span key={index} className="rates-ticker__item">
              <b>{item.pair}</b>
              {item.value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RatesTicker;
