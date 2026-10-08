// Cómo se muestra cada moneda delante del monto (ej: "ARS $ 1.234,56").
const CURRENCY_PREFIXES: Record<string, string> = {
  ARS: 'ARS $',
  USD: 'USD $',
  EUR: 'EUR €',
  PEN: 'PEN S/',
};

export function formatCurrency(value: number, currency: string): string {
  const amount = value.toLocaleString('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${CURRENCY_PREFIXES[currency] ?? currency} ${amount}`;
}
