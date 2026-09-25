import CurrencyCard from '../CurrencyCard/CurrencyCard';
import './CurrencyList.css';

const mockCurrencies = [
  { currency: 'ARS', balance: 85000 },
  { currency: 'USD', balance: 250 },
  { currency: 'EUR', balance: 120 },
  { currency: 'PEN', balance: 300 },
] as const;

function CurrencyList() {
  return (
    <section className="currency-list">
      <h2 className="currency-list__title">Mis monedas</h2>

      <div className="currency-list__grid">
        {mockCurrencies.map(({ currency, balance }) => (
          <CurrencyCard key={currency} currency={currency} balance={balance} />
        ))}
      </div>
    </section>
  );
}

export default CurrencyList;
