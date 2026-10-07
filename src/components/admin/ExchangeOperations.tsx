import { useState } from 'react';
import type { AdminTransaction } from '../../services/adminService';

interface ExchangeOperationsProps {
  exchanges: AdminTransaction[];
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

const ExchangeOperations = ({ exchanges }: ExchangeOperationsProps) => {
  const [selectedDate, setSelectedDate] = useState('');

  const filteredExchanges = selectedDate
    ? exchanges.filter(
        (exchange) => getLocalDate(exchange.fecha) === selectedDate,
      )
    : exchanges;

  return (
    <section className="admin-section" id="exchange-operations">
      <div className="admin-section__header">
        <div>
          <h2>Operaciones de cambio</h2>
          <p>Conversiones de moneda realizadas en la plataforma.</p>
        </div>

        <span className="admin-section__count">{filteredExchanges.length}</span>
      </div>

      <div className="admin-section__filter">
        <label htmlFor="exchange-date">Filtrar por fecha</label>

        <input
          id="exchange-date"
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

      {filteredExchanges.length === 0 ? (
        <p className="admin-section__empty">
          No hay operaciones de cambio para la fecha seleccionada.
        </p>
      ) : (
        <div className="admin-list">
          {filteredExchanges.map((exchange) => (
            <article className="admin-transaction" key={exchange.id}>
              <div>
                <strong>
                  {exchange.cuentaOrigen?.Usuario?.nombre ??
                    'Usuario desconocido'}
                </strong>

                <p className="admin-transaction__reason">
                  {exchange.motivo}
                </p>
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