/// <reference types="node" />

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { createTransactionEmail } from './email/transactionEmail.template.js';
import type { TransactionEmailRequest } from './email/transactionEmail.types.js';

// Cliente reutilizable de AWS SES.
const ses = new SESClient({
  region: process.env.AWS_REGION,
});

// Comprueba que estén los datos mínimos para enviar el correo.
function isValidRequest(body: TransactionEmailRequest) {
  return Boolean(
    body.to &&
      body.status &&
      body.transaction?.type &&
      body.transaction.currency &&
      body.transaction.amount !== undefined,
  );
}

// Vercel Function responsable únicamente del envío.
async function handler(request: Request) {
  if (request.method !== 'POST') {
    return Response.json(
      { error: 'Método no permitido' },
      { status: 405 },
    );
  }

  try {
    console.info('[EMAIL] Vercel recibió una solicitud.');

    const body = (await request.json()) as TransactionEmailRequest;

    console.info('[EMAIL] Datos recibidos:', {
      status: body.status,
      type: body.transaction?.type,
      currency: body.transaction?.currency,
    });

    if (!isValidRequest(body)) {
      console.error('[EMAIL] Body inválido o incompleto.');

      return Response.json(
        { error: 'Faltan datos obligatorios' },
        { status: 400 },
      );
    }

    const from = process.env.AWS_SES_FROM_EMAIL;

    if (!from) {
      console.error('[EMAIL] Falta AWS_SES_FROM_EMAIL.');

      return Response.json(
        { error: 'Falta AWS_SES_FROM_EMAIL' },
        { status: 500 },
      );
    }

    console.info('[EMAIL] Intentando envío con SES:', {
      region: process.env.AWS_REGION,
      type: body.transaction.type,
    });

    const { subject, html } = createTransactionEmail(body);

    const result = await ses.send(
      new SendEmailCommand({
        Source: from,
        Destination: { ToAddresses: [body.to] },
        Message: {
          Subject: { Data: subject, Charset: 'UTF-8' },
          Body: {
            Html: { Data: html, Charset: 'UTF-8' },
          },
        },
      }),
    );

    console.info('[EMAIL] SES confirmó el envío:', {
      messageId: result.MessageId,
    });

    return Response.json({
      message: 'Correo enviado correctamente',
      messageId: result.MessageId,
    });
  } catch (error) {
    console.error('[EMAIL] Error Vercel -> AWS SES:', error);

    return Response.json(
      { error: 'No se pudo enviar el correo' },
      { status: 500 },
    );
  }
}

// Firma web de Vercel: recibe un Request y devuelve un Response.
export default { fetch: handler };
