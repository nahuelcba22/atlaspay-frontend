/// <reference types="node" />

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { createTransactionEmail } from './email/transactionEmail.template';
import type { TransactionEmailRequest } from './email/transactionEmail.types';

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
export default async function handler(request: Request) {
  if (request.method !== 'POST') {
    return Response.json(
      { error: 'Método no permitido' },
      { status: 405 },
    );
  }

  try {
    const body = (await request.json()) as TransactionEmailRequest;

    if (!isValidRequest(body)) {
      return Response.json(
        { error: 'Faltan datos obligatorios' },
        { status: 400 },
      );
    }

    const from = process.env.AWS_SES_FROM_EMAIL;

    if (!from) {
      return Response.json(
        { error: 'Falta AWS_SES_FROM_EMAIL' },
        { status: 500 },
      );
    }

    const { subject, html } = createTransactionEmail(body);

    await ses.send(
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

    return Response.json({
      message: 'Correo enviado correctamente',
    });
  } catch (error) {
    console.error('Error enviando correo con AWS SES:', error);

    return Response.json(
      { error: 'No se pudo enviar el correo' },
      { status: 500 },
    );
  }
}