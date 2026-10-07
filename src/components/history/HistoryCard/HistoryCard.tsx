import HistoryFilters from '../HistoryFilters/HistoryFilters';
import HistoryItem from '../HistoryItem/HistoryItem';
import HistoryPagination from '../HistoryPagination/HistoryPagination';
import { useHistory } from '../useHistory';
import './HistoryCard.css';

function HistoryCard() {
  const history = useHistory();
  const isEmpty = !history.loading && !history.error && history.movements.length === 0;

  return (
    <section className="history-card">
      <p className="history-card__label">Historial de movimientos</p>

      <HistoryFilters filters={history.filters} onChange={history.changeFilters} />

      {history.loading && <p className="history-card__status">Cargando movimientos...</p>}
      {history.error && <p className="history-card__error">{history.error}</p>}
      {isEmpty && <p className="history-card__status">No hay movimientos para estos filtros.</p>}

      {!history.loading && history.movements.length > 0 && (
        <ul className="history-card__list">
          {history.movements.map((movement) => (
            <HistoryItem key={movement.id} movement={movement} />
          ))}
        </ul>
      )}

      {history.pagination && (
        <HistoryPagination pagination={history.pagination} onPageChange={history.changePage} />
      )}
    </section>
  );
}

export default HistoryCard;
