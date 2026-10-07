import type { HistoryFilters as Filters } from '../../../services/historyService';
import { CURRENCIES } from '../../../utils/exchange';
import { DIRECTION_LABELS, TYPE_LABELS } from '../history.format';
import './HistoryFilters.css';

interface HistoryFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

function HistoryFilters({ filters, onChange }: HistoryFiltersProps) {
  // Un valor vacío ("Todos") quita el filtro.
  function update<K extends keyof Filters>(key: K, value: string) {
    onChange({ ...filters, [key]: value || undefined });
  }

  return (
    <div className="history-filters">
      <select
        className="history-filters__input"
        value={filters.tipo ?? ''}
        onChange={(event) => update('tipo', event.target.value)}
      >
        <option value="">Todos los tipos</option>
        {Object.entries(TYPE_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        className="history-filters__input"
        value={filters.direccion ?? ''}
        onChange={(event) => update('direccion', event.target.value)}
      >
        <option value="">Enviadas y recibidas</option>
        {Object.entries(DIRECTION_LABELS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <select
        className="history-filters__input"
        value={filters.moneda ?? ''}
        onChange={(event) => update('moneda', event.target.value)}
      >
        <option value="">Todas las monedas</option>
        {CURRENCIES.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      <label className="history-filters__date">
        Desde
        <input
          className="history-filters__input"
          type="date"
          value={filters.desde ?? ''}
          max={filters.hasta}
          onChange={(event) => update('desde', event.target.value)}
        />
      </label>

      <label className="history-filters__date">
        Hasta
        <input
          className="history-filters__input"
          type="date"
          value={filters.hasta ?? ''}
          min={filters.desde}
          onChange={(event) => update('hasta', event.target.value)}
        />
      </label>

      <button className="history-filters__clear" type="button" onClick={() => onChange({})}>
        Limpiar
      </button>
    </div>
  );
}

export default HistoryFilters;
