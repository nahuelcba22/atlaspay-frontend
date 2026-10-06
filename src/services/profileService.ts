import { API_URL } from '../config/api';
import { getToken } from './authStorage';
import { handleApiResponse } from './apiResponse';

export interface UserProfile {
  usuario: {
    id: string;
    nombre: string;
    email: string;
  };
  cuenta: {
    id: string;
    cvu: string;
    alias: string;
    estado: string;
    saldos: {
      ARS: number;
      USD: number;
      EUR: number;
      PEN: number;
    };
  };
}

export async function getProfile(): Promise<UserProfile> {
  const response = await fetch(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return handleApiResponse<UserProfile>(response);
}