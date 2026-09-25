import './BalanceCard.css';

const mockTotalBalance = 125000;

function BalanceCard() {
  return (
    <section className="balance-card">
      <p className="balance-card__label">Balance total</p>

      <h2 className="balance-card__amount">
        {mockTotalBalance.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
        })}
      </h2>

      <span className="balance-card__reference">Equivalente en ARS</span>
    </section>
  );
}

export default BalanceCard;
