import { createTransactionContent } from './transactionEmail.content.js';
import type { TransactionEmailRequest } from './transactionEmail.types.js';

// Construye la presentación final del email.
export function createTransactionEmail(
  data: TransactionEmailRequest,
) {
  const { userName, status } = data;
  const isSuccess = status === 'SUCCESS';

  const subject = isSuccess
    ? 'Atlaspay · Operación realizada correctamente'
    : 'Atlaspay · No pudimos completar tu operación';

  const title = isSuccess
    ? 'Operación realizada correctamente'
    : 'No pudimos completar la operación';

  const message = isSuccess
    ? 'Tu operación fue procesada correctamente.'
    : 'La operación solicitada no pudo completarse.';

  const content = createTransactionContent(data);

  const html = `
    <!doctype html>
    <html lang="es">
      <body style="margin:0;padding:32px 20px;background:#07111f;font-family:Arial,sans-serif;color:#f8fafc;">
        <div style="max-width:600px;margin:auto;background:#0b1628;border:1px solid #1f3657;border-radius:16px;padding:32px;">

          <div style="margin-bottom:24px;font-size:36px;font-weight:800;">
            <span style="color:#ffffff;">Atlas</span><span style="color:#3b82f6;">pay</span>
          </div>

          <h2 style="color:#ffffff;">${title}</h2>

          <p style="color:#cbd5e1;">
            ${userName ? `Hola ${userName},` : 'Hola,'}
          </p>

          <p style="color:#94a3b8;">${message}</p>

          ${content}

          <p style="margin-top:28px;color:#64748b;font-size:12px;">
            Este es un mensaje automático de Atlaspay.
          </p>
        </div>
      </body>
    </html>
  `;

  return { subject, html };
}