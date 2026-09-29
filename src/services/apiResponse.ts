interface ApiErrorResponse {
  error?: string;
  message?: string;
}

// Valida y procesa las respuestas recibidas desde la API.
export async function handleApiResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? '';

  // Evita intentar convertir HTML u otro contenido inesperado a JSON.
  if (!contentType.includes('application/json')) {
    throw new Error('No se pudo obtener una respuesta válida de la API.');
  }

  const data = (await response.json()) as T & ApiErrorResponse;

  if (!response.ok) {
    throw new Error(data.error || data.message || 'Ocurrió un error inesperado.');
  }

  return data;
}