import './CurrencyCard.css';

type Currency = 'ARS' | 'USD' | 'EUR' | 'PEN';

interface CurrencyCardProps {
  currency: Currency;
  balance: number;
}

function CurrencyCard({ currency, balance }: CurrencyCardProps) {
  const formattedBalance = balance.toLocaleString('es-AR', {
    style: 'currency',
    currency,
  });

  return (
    <article className="currency-card">
      <span className="currency-card__currency">{currency}</span>
      <strong className="currency-card__balance">{formattedBalance}</strong>
    </article>
  );
}

export default CurrencyCard;
