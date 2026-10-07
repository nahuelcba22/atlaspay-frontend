import { API_URL } from '../config/api';
import { handleApiResponse } from './apiResponse';
import { getToken } from './authStorage';

export interface Transfer {
  id: string;
  cuenta_origen_id: string;
  cuenta_destino_id: string;
  monto: string;
  moneda: string;
  motivo: string;
  fecha: string;
}

interface TransferHistoryResponse {
  message: string;
  transferencias: Transfer[];
}

interface CreateTransferData {
  destino: string;
  monto: number;
  motivo: string;
  moneda: string;
}

interface CreateTransferResponse {
  message: string;
  comprobante: Transfer;
}

// Obtiene el historial de transferencias del usuario.
export async function getTransferHistory(): Promise<TransferHistoryResponse> {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesión activa.');
  }

  const response = await fetch(`${API_URL}/transferencias`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleApiResponse<TransferHistoryResponse>(response);
}

// Envía una nueva transferencia al backend.
export async function createTransfer(
  data: CreateTransferData,
): Promise<CreateTransferResponse> {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesión activa.');
  }

  const response = await fetch(`${API_URL}/transferencias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return handleApiResponse<CreateTransferResponse>(response);
}