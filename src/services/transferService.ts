import { API_URL } from '../config/api';
import { handleApiResponse } from './apiResponse';
import { getToken } from './authStorage';

export interface Transfer {
  id: string;
  cuenta_origen_id: string;
  cuenta_destino_id: string;
  monto: string;
  motivo: string;
  fecha: string;
}

interface TransferHistoryResponse {
  message: string;
  transferencias: Transfer[];
}

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