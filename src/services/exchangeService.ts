import { API_URL } from '../config/api';
import type { Currency } from '../utils/exchange';
import { handleApiResponse } from './apiResponse';

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
  const data = await handleApiResponse<ExchangeRatesResponse>(response);

  if (!data.success) {
    throw new Error('No se pudieron obtener las tasas de cambio.');
  }

  return data;
}