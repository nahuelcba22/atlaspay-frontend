import type { Currency } from '../../../utils/exchange';

export function formatMoney(
  value: number,
  currency: Currency,
): string {
  return value.toLocaleString('es-AR', {
    style: 'currency',
    currency,
  });
}

export function isTransferAmountInvalid(
  amount: number,
  balance: number,
): boolean {
  return amount < 0.1 || amount > balance;
}
