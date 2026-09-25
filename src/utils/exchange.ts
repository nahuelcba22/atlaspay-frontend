export type Currency = 'ARS' | 'PEN' | 'USD' | 'EUR';

export const CURRENCIES: Currency[] = ['ARS', 'PEN', 'USD', 'EUR'];

// Tasas de prueba: cuántas unidades de cada moneda equivalen a 1 USD.
// Se reemplazarán por tasas reales cuando el backend las entregue.
export const MOCK_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.9,
  PEN: 3.7,
  ARS: 1000,
};

// Cuánto vale 1 unidad de "from" expresada en "to".
export function getRate(from: Currency, to: Currency, rates = MOCK_RATES): number {
  return rates[to] / rates[from];
}

// Convierte un monto de una moneda a otra.
export function convert(amount: number, from: Currency, to: Currency, rates = MOCK_RATES): number {
  return amount * getRate(from, to, rates);
}

// Se puede operar si el monto es positivo y no supera el saldo.
export function hasEnoughBalance(amount: number, balance: number): boolean {
  return amount > 0 && amount <= balance;
}