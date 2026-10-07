import { API_URL } from '../config/api';
import { handleApiResponse } from './apiResponse';

interface RegisterData {
  nombre: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthUser {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

interface LoginResponse {
  message: string;
  token: string;
  usuario: AuthUser;
}

// Registra un usuario nuevo en Atlaspay.
export async function registerUser(data: RegisterData) {
  const response = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleApiResponse(response);
}

// Inicia sesión con email y contraseña.
export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleApiResponse<LoginResponse>(response);
}

// Inicia sesión con el access token obtenido desde Google.
export async function loginWithGoogle(
  accessToken: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/usuarios/google`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ accessToken }),
  });

  return handleApiResponse<LoginResponse>(response);
}