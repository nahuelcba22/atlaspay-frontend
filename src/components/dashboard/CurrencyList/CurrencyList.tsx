import type { AccountBalances } from '../../../services/accountService';
import CurrencyCard from '../CurrencyCard/CurrencyCard';
import './CurrencyList.css';

interface CurrencyListProps {
  balances: AccountBalances;
}

function CurrencyList({ balances }: CurrencyListProps) {
  const currencies = Object.entries(balances) as [
    keyof AccountBalances,
    number,
  ][];

  return (
    <section className="currency-list">
      <h2 className="currency-list__title">Mis monedas</h2>

      <div className="currency-list__grid">
        {currencies.map(([currency, balance]) => (
          <CurrencyCard
            key={currency}
            currency={currency}
            balance={balance}
          />
        ))}
      </div>
    </section>
  );
}

export default CurrencyList;