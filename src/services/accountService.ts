import { getToken } from './authStorage';

const API_URL = 'http://localhost:3000/api';

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

  const response = await fetch(`${API_URL}/mi-cuenta`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'No se pudo obtener la cuenta.');
  }

  return data;
}