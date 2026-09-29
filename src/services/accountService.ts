import { API_URL } from '../config/api';
import { getToken } from './authStorage';
import { handleApiResponse } from './apiResponse';

interface Account {
  cvu: string;
  alias: string;
  saldo: number;
  estado: string;
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