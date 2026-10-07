import { API_URL } from '../config/api';
import type { Currency } from '../utils/exchange';
import { handleApiResponse } from './apiResponse';
import { getToken } from './authStorage';

export type MovementType = 'TRANSFERENCIA' | 'CAMBIO' | 'COMPRA' | 'VENTA';
export type MovementDirection = 'ENVIADA' | 'RECIBIDA';

export interface Counterpart {
  nombre: string;
  cvu: string;
  alias: string;
}

export interface Movement {
  id: string;
  tipo: MovementType;
  direccion: MovementDirection;
  monto: number;
  moneda: Currency;
  // Los exchanges viejos llegan con estos tres campos en null.
  monto_destino: number | null;
  moneda_destino: Currency | null;
  tasa: number | null;
  // Solo en transferencias: siempre es la otra persona.
  contraparte: Counterpart | null;
  motivo: string | null;
  fecha: string;
}

export interface HistoryFilters {
  tipo?: MovementType;
  direccion?: MovementDirection;
  moneda?: Currency;
  desde?: string;
  hasta?: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface HistoryResponse {
  movimientos: Movement[];
  pagination: Pagination;
}

// Obtiene el historial unificado, filtrado y paginado por el backend.
export async function getHistory(
  filters: HistoryFilters,
  page = 1,
  limit = 20,
): Promise<HistoryResponse> {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesión activa.');
  }

  const params = new URLSearchParams({ page: String(page), limit: String(limit) });

  // Solo se envían los filtros que tienen valor.
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });

  const response = await fetch(`${API_URL}/historial?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleApiResponse<HistoryResponse>(response);
}
