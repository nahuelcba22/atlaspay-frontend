import { API_URL } from '../config/api';
import { getToken } from './authStorage';
import { handleApiResponse } from './apiResponse';

export interface AccountBalances {
  ARS: number;
  USD: number;
  EUR: number;
  PEN: number;
}

interface Account {
  cvu: string;
  alias: string;
  estado: string;
  saldos: AccountBalances;
}

interface AccountResponse {
  message: string;
  cuenta: Account;
}

// Obtiene los datos de la cuenta usando el JWT guardado.
export async function getMyAccount(): Promise<AccountResponse> {
  const token = getToken();

  if (!token) {
    throw new Error('No hay una sesión activa.');
  }

  const response = await fetch(`${API_URL}/cuentas/mi-cuenta`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleApiResponse<AccountResponse>(response);
}