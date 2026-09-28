import type { Currency } from '../../utils/exchange';

// Tasas de referencia (base USD) tomadas de /api/exchange/rates.
// Cuando se integre exchangeService, se pueden reemplazar por las del día.
export const REFERENCE_RATES: Record<Currency, number> = {
  USD: 1,
  ARS: 1523.9662,
  EUR: 0.878356,
  PEN: 3.392941,
};
