import { API_URL } from '../config/api';
import type { Currency } from '../utils/exchange';
import { handleApiResponse } from './apiResponse';
import { getToken } from './authStorage';

export type OperationType =
  | 'CAMBIO'
  | 'COMPRA'
  | 'VENTA';

export interface ExchangeRatesResponse {
  success: boolean;
  base: Currency;
  source: 'api' | 'cache' | 'fallback_cache';
  last_updated: string;
  rates: Record<Currency, number>;
}

interface ProcessExchangeData {
  montoVenta: number;
  monedaOrigen: Currency;
  monedaDestino: Currency;
  tipoOperacion: OperationType;
}

interface ProcessExchangeResponse {
  mensaje: string;
  operacion: {
    historial: {
      id: string;
      monto: string;
      moneda: string;
      motivo: string;
      fecha: string;
    };
  };
}

// Pide al backend las tasas de cambio actuales.
export async function getExchangeRates(): Promise<ExchangeRatesResponse> {
  const response = await fetch(`${API_URL}/exchange/rates`);
  const data = await handleApiResponse<ExchangeRatesResponse>(response);

  if (!data.success) {
    throw new Error('No se pudieron obtener las tasas de cambio.');
  }

  return data;
}

// Ejecuta una operación de exchange real en el backend.
export async function processExchange(
  data: ProcessExchangeData,
): Promise<ProcessExchangeResponse> {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesión activa.');
  }

  const response = await fetch(`${API_URL}/exchange/procesar`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return handleApiResponse<ProcessExchangeResponse>(response);
}