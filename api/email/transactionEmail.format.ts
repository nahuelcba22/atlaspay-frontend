import type {
  TransactionData,
  TransactionType,
} from './transactionEmail.types.js';

// Nombres visibles para cada operación.
const labels: Record<TransactionType, string> = {
  COMPRA: 'Compra de moneda',
  VENTA: 'Venta de moneda',
  CAMBIO: 'Cambio de moneda',
  TRANSFERENCIA: 'Transferencia',
};

// Formatea montos para mostrarlos en el correo.
export function formatMoney(amount: number, currency: string) {
  return `${amount.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`;
}

// Devuelve el nombre legible de la operación.
export function formatTransactionType(type: TransactionType) {
  return labels[type];
}

// Arma el resumen principal de montos.
export function formatTransactionAmount(
  transaction: TransactionData,
  isSuccess: boolean,
) {
  const {
    amount,
    currency,
    destinationAmount,
    destinationCurrency,
  } = transaction;

  if (
    isSuccess &&
    destinationAmount !== undefined &&
    destinationCurrency
  ) {
    return `${formatMoney(amount, currency)} → ${formatMoney(
      destinationAmount,
      destinationCurrency,
    )}`;
  }

  return formatMoney(amount, currency);
}