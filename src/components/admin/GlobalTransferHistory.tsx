import type { AdminTransaction } from '../../services/adminService';

interface GlobalTransferHistoryProps {
  transfers: AdminTransaction[];
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));

const GlobalTransferHistory = ({
  transfers,
}: GlobalTransferHistoryProps) => {
  return (
    <section className="admin-section">
      <div className="admin-section__header">
        <div>
          <h2>Historial global</h2>
          <p>Todas las transferencias realizadas en la plataforma.</p>
        </div>
        <span className="admin-section__count">{transfers.length}</span>
      </div>

      {transfers.length === 0 ? (
        <p className="admin-section__empty">No hay transferencias registradas.</p>
      ) : (
        <div className="admin-list">
          {transfers.map((transfer) => (
            <article className="admin-transaction" key={transfer.id}>
              <div className="admin-transaction__users">
                <strong>
                  {transfer.cuentaOrigen?.usuario?.nombre ?? 'Usuario desconocido'}
                </strong>
                <span>→</span>
                <strong>
                  {transfer.cuentaDestino?.usuario?.nombre ?? 'Usuario desconocido'}
                </strong>
              </div>

              <div className="admin-transaction__details">
                <span>
                  {Number(transfer.monto).toLocaleString('es-AR')} {transfer.moneda}
                </span>
                <span>{formatDate(transfer.fecha)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default GlobalTransferHistory;