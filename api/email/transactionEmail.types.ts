// Estados posibles de una operación notificada por email.
export type TransactionStatus = 'SUCCESS' | 'FAILED';

// Operaciones soportadas por las notificaciones.
export type TransactionType =
  | 'COMPRA'
  | 'VENTA'
  | 'CAMBIO'
  | 'TRANSFERENCIA';

// Datos de la transacción que se muestran en el correo.
export interface TransactionData {
  type: TransactionType;
  amount: number;
  currency: string;
  destinationAmount?: number;
  destinationCurrency?: string;
  exchangeRate?: number;
  transactionId?: string;
  date?: string;
}

// Datos necesarios para generar y enviar el correo.
export interface TransactionEmailRequest {
  to: string;
  userName?: string;
  status: TransactionStatus;
  transaction: TransactionData;
  errorMessage?: string;
}