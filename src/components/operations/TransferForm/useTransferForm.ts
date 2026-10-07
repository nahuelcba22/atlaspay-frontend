import { useState } from 'react';
import type { FormEvent } from 'react';
import type { AccountBalances } from '../../../services/accountService';
import { createTransfer } from '../../../services/transferService';
import type { Currency } from '../../../utils/exchange';
import { isTransferAmountInvalid } from './TransferForm.utils';

interface UseTransferFormParams {
  balances: AccountBalances;
  onSuccess: () => void;
}

export function useTransferForm({
  balances,
  onSuccess,
}: UseTransferFormParams) {
  const [destination, setDestination] = useState('');
  const [currency, setCurrency] = useState<Currency>('ARS');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);

  const numericAmount = Number(amount);
  const balance = balances[currency];
  const invalidAmount = isTransferAmountInvalid(
    numericAmount,
    balance,
  );

  const canSubmit =
    destination.trim() !== '' &&
    !invalidAmount &&
    !sending;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit) return;

    setSending(true);
    setMessage('');
    setError('');

    try {
      await createTransfer({
        destino: destination.trim(),
        monto: numericAmount,
        motivo: reason.trim(),
        moneda: currency,
      });

      setMessage('Transferencia realizada correctamente.');
      setDestination('');
      setAmount('');
      setReason('');
      onSuccess();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'No se pudo realizar la transferencia.',
      );
    } finally {
      setSending(false);
    }
  }

  return {
    destination,
    currency,
    amount,
    reason,
    message,
    error,
    sending,
    numericAmount,
    balance,
    canSubmit,
    setDestination,
    setCurrency,
    setAmount,
    setReason,
    handleSubmit,
  };
}