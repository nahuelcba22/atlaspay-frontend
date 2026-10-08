import { formatCurrency } from '../../../utils/currency';
import './BalanceCard.css';

interface BalanceCardProps {
  balance: number;
}

function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <section className="balance-card">
      <p className="balance-card__label">Balance total</p>

      <h2 className="balance-card__amount">
        {formatCurrency(balance, 'ARS')}
      </h2>

      <span className="balance-card__reference">Saldo disponible en ARS</span>
    </section>
  );
}

export default BalanceCard;