import { useEffect, useState } from 'react';
import { getExchangeRates } from '../../../services/exchangeService';
import type { Currency } from '../../../utils/exchange';

// Mantiene las tasas de cambio obtenidas desde el backend.
export function useExchangeRates() {
  const [rates, setRates] =
    useState<Record<Currency, number> | null>(null);
  const [lastUpdated, setLastUpdated] = useState('');
  const [ratesError, setRatesError] = useState('');

  useEffect(() => {
    getExchangeRates()
      .then((data) => {
        setRates(data.rates);
        setLastUpdated(data.last_updated);
      })
      .catch(() => {
        setRatesError(
          'No se pudieron cargar las tasas de cambio.',
        );
      });
  }, []);

  return {
    rates,
    lastUpdated,
    ratesError,
  };
}
