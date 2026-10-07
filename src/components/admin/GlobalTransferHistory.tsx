import { useState } from 'react';
import type { AdminTransaction } from '../../services/adminService';

interface GlobalTransferHistoryProps {
  transfers: AdminTransaction[];
}

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date));

const getLocalDate = (date: string) => {
  const value = new Date(date);
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, '0');
  const day = String(value.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const GlobalTransferHistory = ({
  transfers,
}: GlobalTransferHistoryProps) => {
  const [selectedDate, setSelectedDate] = useState('');

  const filteredTransfers = selectedDate
    ? transfers.filter(
        (transfer) => getLocalDate(transfer.fecha) === selectedDate,
      )
    : transfers;

  return (
    <section className="admin-section" id="global-history">
      <div className="admin-section__header">
        <div>
          <h2>Historial global</h2>
          <p>Todas las transferencias realizadas en la plataforma.</p>
        </div>

        <span className="admin-section__count">{filteredTransfers.length}</span>
      </div>

      <div className="admin-section__filter">
        <label htmlFor="transfer-date">Filtrar por fecha</label>

        <input
          id="transfer-date"
          type="date"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.target.value)}
        />

        {selectedDate && (
          <button type="button" onClick={() => setSelectedDate('')}>
            Limpiar filtro
          </button>
        )}
      </div>

      {filteredTransfers.length === 0 ? (
        <p className="admin-section__empty">
          No hay transferencias para la fecha seleccionada.
        </p>
      ) : (
        <div className="admin-list">
          {filteredTransfers.map((transfer) => (
            <article className="admin-transaction" key={transfer.id}>
              <div className="admin-transaction__users">
                <strong>
                  {transfer.cuentaOrigen?.Usuario?.nombre ??
                    'Usuario desconocido'}
                </strong>
                <span>→</span>
                <strong>
                  {transfer.cuentaDestino?.Usuario?.nombre ??
                    'Usuario desconocido'}
                </strong>
              </div>

              <div className="admin-transaction__details">
                <span>
                  {Number(transfer.monto).toLocaleString('es-AR')}{' '}
                  {transfer.moneda}
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