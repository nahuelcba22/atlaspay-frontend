const TOKEN_KEY = 'atlaspay_token';

// Guarda el token de autenticación.
export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Obtiene el token guardado.
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Elimina el token de autenticación.
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}