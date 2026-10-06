import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  processExchange,
  type OperationType,
} from '../../../services/exchangeService';
import type { Currency } from '../../../utils/exchange';

interface UseExchangeSubmitParams {
  amount: number;
  from: Currency;
  to: Currency;
  operationType: OperationType;
  canSubmit: boolean;
  resetAmount: () => void;
  onSuccess: () => void;
}

export function useExchangeSubmit({
  amount,
  from,
  to,
  operationType,
  canSubmit,
  resetAmount,
  onSuccess,
}: UseExchangeSubmitParams) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  function clearMessages() {
    setMessage('');
    setError('');
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!canSubmit || sending) return;

    setSending(true);
    clearMessages();

    try {
      await processExchange({
        montoVenta: amount,
        monedaOrigen: from,
        monedaDestino: to,
        tipoOperacion: operationType,
      });

      setMessage('Operación realizada correctamente.');
      resetAmount();
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo realizar la operación.',
      );
    } finally {
      setSending(false);
    }
  }

  return {
    message,
    error,
    sending,
    clearMessages,
    handleSubmit,
  };
}