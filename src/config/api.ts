// Centraliza y valida la URL base utilizada por los servicios.
const apiUrl = import.meta.env.VITE_API_URL;

if (!apiUrl) {
  throw new Error('Falta configurar VITE_API_URL.');
}

export const API_URL = apiUrl;