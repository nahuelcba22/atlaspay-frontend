import { formatCurrency } from '../../../utils/currency';
import type { Currency } from '../../../utils/exchange';

export function formatMoney(
  value: number,
  currency: Currency,
): string {
  return formatCurrency(value, currency);
}

export function isTransferAmountInvalid(
  amount: number,
  balance: number,
): boolean {
  return amount < 0.1 || amount > balance;
}
