import type { Pagination } from '../../../services/historyService';
import './HistoryPagination.css';

interface HistoryPaginationProps {
  pagination: Pagination;
  onPageChange: (page: number) => void;
}

function HistoryPagination({ pagination, onPageChange }: HistoryPaginationProps) {
  const { page, totalPages, total } = pagination;

  if (totalPages <= 1) return null;

  return (
    <div className="history-pagination">
      <button
        className="history-pagination__button"
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Anterior
      </button>

      <span className="history-pagination__info">
        Página {page} de {totalPages} · {total} movimientos
      </span>

      <button
        className="history-pagination__button"
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente →
      </button>
    </div>
  );
}

export default HistoryPagination;
