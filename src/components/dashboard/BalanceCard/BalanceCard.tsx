import './BalanceCard.css';

interface BalanceCardProps {
  balance: number;
}

function BalanceCard({ balance }: BalanceCardProps) {
  return (
    <section className="balance-card">
      <p className="balance-card__label">Balance total</p>

      <h2 className="balance-card__amount">
        {balance.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        })}
      </h2>

      <span className="balance-card__reference">Saldo disponible en ARS</span>
    </section>
  );
}

export default BalanceCard;