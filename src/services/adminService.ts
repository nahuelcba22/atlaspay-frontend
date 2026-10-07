import { API_URL } from '../config/api';

export interface AdminUser {
  id: string;
  nombre: string;
  email: string;
}

export interface AdminAccount {
  id?: string;
  usuario?: AdminUser;
}

export interface AdminTransaction {
  id: string;
  cuenta_origen_id: string;
  cuenta_destino_id: string;
  monto: number | string;
  moneda: string;
  motivo: string;
  fecha: string;
  cuentaOrigen?: AdminAccount;
  cuentaDestino?: AdminAccount;
}

export interface AdminHistoryResponse {
  message: string;
  total: number;
  data: AdminTransaction[];
}

const getAuthHeaders = () => {
  const token = localStorage.getItem('atlaspay_token');

  return {
    Authorization: `Bearer ${token}`,
  };
};

const getAdminData = async (endpoint: string): Promise<AdminHistoryResponse> => {
  const response = await fetch(`${API_URL}/admin/${endpoint}`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error('No se pudieron obtener los datos del panel');
  }

  return response.json();
};

export const getGlobalTransfers = () => getAdminData('transferencias');

export const getExchangeOperations = () => getAdminData('exchange');