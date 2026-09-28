import { API_URL } from '../config/api';
import type { Currency } from '../utils/exchange';

export interface ExchangeRatesResponse {
  success: boolean;
  base: Currency;
  source: 'api' | 'cache' | 'fallback_cache';
  last_updated: string;
  rates: Record<Currency, number>;
}

// Pide al backend las tasas de cambio actuales (base USD).
export async function getExchangeRates(): Promise<ExchangeRatesResponse> {
  const response = await fetch(`${API_URL}/exchange/rates`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || 'No se pudieron obtener las tasas de cambio.');
  }

  return data;
}
