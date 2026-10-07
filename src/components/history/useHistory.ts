import { useEffect, useState } from 'react';
import {
  getHistory,
  type HistoryFilters,
  type Movement,
  type Pagination,
} from '../../services/historyService';

// Carga el historial cada vez que cambian los filtros o la página.
export function useHistory() {
  const [filters, setFilters] = useState<HistoryFilters>({});
  const [page, setPage] = useState(1);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Evita pisar el resultado con una respuesta vieja.
    let active = true;

    getHistory(filters, page)
      .then((data) => {
        if (!active) return;
        setError('');
        setMovements(data.movimientos);
        setPagination(data.pagination);
      })
      .catch((err) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'No se pudo cargar el historial.');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [filters, page]);

  // Un filtro nuevo vuelve siempre a la primera página.
  function changeFilters(next: HistoryFilters) {
    setLoading(true);
    setFilters(next);
    setPage(1);
  }

  function changePage(next: number) {
    setLoading(true);
    setPage(next);
  }

  return {
    filters,
    page,
    movements,
    pagination,
    loading,
    error,
    changeFilters,
    changePage,
  };
}
