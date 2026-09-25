const API_URL = 'http://localhost:3000/api';

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
}

interface LoginResponse {
  message: string;
  token: string;
  usuario: AuthUser;
}

// Procesa la respuesta del backend y devuelve un error legible.
async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || 'Ocurrió un error inesperado.');
  }

  return data;
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

  return handleResponse(response);
}

// Inicia sesión y devuelve el token junto con el usuario.
export async function loginUser(data: LoginData): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleResponse<LoginResponse>(response);
}