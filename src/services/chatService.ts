import { API_URL } from '../config/api';
import { handleApiResponse } from './apiResponse';

interface ChatResponse {
  success: boolean;
  data: {
    respuesta: string;
  };
}

// Envía un mensaje al asistente (Gemini) y devuelve su respuesta.
export async function sendChatMessage(message: string): Promise<string> {
  const response = await fetch(`${API_URL}/bot/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mensaje: message }),
  });

  const data = await handleApiResponse<ChatResponse>(response);

  return data.data.respuesta;
}
