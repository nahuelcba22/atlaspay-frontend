const TOKEN_KEY = 'atlaspay_token';
const ROLE_KEY = 'atlaspay_role';

// Guarda el token de autenticación.
export function saveToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

// Guarda el rol del usuario.
export function saveRole(role: string) {
  localStorage.setItem(ROLE_KEY, role);
}

// Obtiene el token guardado.
export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

// Obtiene el rol guardado. (NUEVO)
export function getRole() {
  return localStorage.getItem(ROLE_KEY);
}

// Elimina la sesión completa.
export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}