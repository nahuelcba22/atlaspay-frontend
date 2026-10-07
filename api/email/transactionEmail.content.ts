import {
  formatTransactionAmount,
  formatTransactionType,
} from './transactionEmail.format.js';
import type { TransactionEmailRequest } from './transactionEmail.types.js';

// Genera únicamente el bloque con los datos de la operación.
export function createTransactionContent(
  data: TransactionEmailRequest,
) {
  const { status, transaction, errorMessage } = data;
  const isSuccess = status === 'SUCCESS';

  const amount = formatTransactionAmount(transaction, isSuccess);
  const type = formatTransactionType(transaction.type);

  const rate =
    transaction.exchangeRate !== undefined
      ? `<p>Tasa: ${transaction.exchangeRate}</p>`
      : '';

  const id = transaction.transactionId
    ? `<p>ID: ${transaction.transactionId}</p>`
    : '';

  const date = transaction.date
    ? `<p>Fecha: ${transaction.date}</p>`
    : '';

  const error =
    !isSuccess && errorMessage
      ? `
        <p style="margin-top:20px;color:#fecaca;">
          <strong>Motivo:</strong> ${errorMessage}
        </p>
      `
      : '';

  return `
    <div style="margin-top:24px;padding:20px;background:#0f1d31;border:1px solid #223a5e;border-radius:12px;">
      <strong style="color:#60a5fa;">${type}</strong>

      <p style="font-size:22px;color:#ffffff;">
        ${amount}
      </p>

      <div style="color:#94a3b8;font-size:14px;">
        ${rate}
        ${id}
        ${date}
      </div>
    </div>

    ${error}
  `;
}