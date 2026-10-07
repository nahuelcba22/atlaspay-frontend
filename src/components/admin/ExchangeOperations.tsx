import type { AdminTransaction } from '../../services/adminService';

interface ExchangeOperationsProps {
  exchanges: AdminTransaction[];
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));

const ExchangeOperations = ({ exchanges }: ExchangeOperationsProps) => {
  return (
    <section className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2>Operaciones de cambio</h2>
          <p>Conversiones de moneda realizadas en la plataforma.</p>
        </div>
        <span className="admin-section__count">{exchanges.length}</span>
      </div>

      {exchanges.length === 0 ? (
        <p className="admin-section__empty">
          No hay operaciones de cambio registradas.
        </p>
      ) : (
        <div className="admin-list">
          {exchanges.map((exchange) => (
            <article className="admin-transaction" key={exchange.id}>
              <div>
                <strong>
                  {exchange.cuentaOrigen?.usuario?.nombre ??
                    'Usuario desconocido'}
                </strong>
                <p className="admin-transaction__reason">{exchange.motivo}</p>
              </div>

              <div className="admin-transaction__details">
                <span>
                  {Number(exchange.monto).toLocaleString('es-AR')}{' '}
                  {exchange.moneda}
                </span>
                <span>{formatDate(exchange.fecha)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ExchangeOperations;