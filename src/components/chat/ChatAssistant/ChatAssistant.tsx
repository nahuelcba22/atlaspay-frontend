import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '../../../services/authStorage';
import { sendChatMessage } from '../../../services/chatService';
import './ChatAssistant.css';

interface ChatMessage {
  id: number;
  author: 'user' | 'bot';
  text: string;
}

// Páginas privadas donde aparece el asistente.
const VISIBLE_PATHS = ['/dashboard', '/operaciones'];

const SUGGESTIONS = [
  '¿Qué monedas puedo usar?',
  '¿Cómo convierto dólares a euros?',
  '¿De dónde salen las tasas?',
];

const WELCOME: ChatMessage = {
  id: 0,
  author: 'bot',
  text: 'Hola, soy el asistente de Atlaspay. Puedo ayudarte con tus monedas, conversiones y cómo usar la app.',
};

function ChatAssistant() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const listRef = useRef<HTMLDivElement>(null);

  // Baja automáticamente al último mensaje.
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isSending]);

  const isVisible = VISIBLE_PATHS.includes(pathname) && Boolean(getToken());
  if (!isVisible) return null;

  async function send(text: string) {
    const message = text.trim();
    if (!message || isSending) return;

    setMessages((current) => [...current, { id: Date.now(), author: 'user', text: message }]);
    setDraft('');
    setError('');
    setIsSending(true);

    try {
      const answer = await sendChatMessage(message);
      setMessages((current) => [...current, { id: Date.now(), author: 'bot', text: answer }]);
    } catch {
      setError('No pude responder ahora. Intenta de nuevo en unos segundos.');
    } finally {
      setIsSending(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    send(draft);
  }

  return (
    <div className="chat-assistant">
      {isOpen && (
        <section className="chat-assistant__panel" aria-label="Asistente de Atlaspay">
          <header className="chat-assistant__header">
            <div>
              <p className="chat-assistant__title">Asistente Atlaspay</p>
              <p className="chat-assistant__subtitle">Con inteligencia artificial</p>
            </div>
            <button
              className="chat-assistant__close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Cerrar asistente"
            >
              ×
            </button>
          </header>

          <div className="chat-assistant__messages" ref={listRef}>
            {messages.map((message) => (
              <p
                key={message.id}
                className={`chat-assistant__message chat-assistant__message--${message.author}`}
              >
                {message.text}
              </p>
            ))}

            {isSending && (
              <p className="chat-assistant__message chat-assistant__message--bot chat-assistant__typing">
                Escribiendo...
              </p>
            )}

            {messages.length === 1 && !isSending && (
              <div className="chat-assistant__suggestions">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    className="chat-assistant__suggestion"
                    type="button"
                    onClick={() => send(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {error && <p className="chat-assistant__error">{error}</p>}

          <form className="chat-assistant__form" onSubmit={handleSubmit}>
            <input
              className="chat-assistant__input"
              type="text"
              placeholder="Escribe tu pregunta..."
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              maxLength={500}
              aria-label="Tu mensaje"
            />
            <button
              className="chat-assistant__send"
              type="submit"
              disabled={!draft.trim() || isSending}
            >
              Enviar
            </button>
          </form>
        </section>
      )}

      <button
        className="chat-assistant__toggle"
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
        aria-expanded={isOpen}
      >
        {isOpen ? '×' : '?'}
      </button>
    </div>
  );
}

export default ChatAssistant;
