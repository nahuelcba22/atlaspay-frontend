import { describe, expect, it } from 'vitest';
import { convert, getRate, hasEnoughBalance } from './exchange';
import type { Currency } from './exchange';

// Tasas fijas para que los resultados de los tests no cambien.
const RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.9,
  PEN: 3.7,
  ARS: 1000,
};

describe('getRate', () => {
  it('devuelve 1 cuando las monedas son iguales', () => {
    expect(getRate('USD', 'USD', RATES)).toBe(1);
  });

  it('calcula la tasa desde el dólar', () => {
    expect(getRate('USD', 'PEN', RATES)).toBeCloseTo(3.7);
  });

  it('calcula la tasa entre dos monedas que no son el dólar', () => {
    expect(getRate('PEN', 'EUR', RATES)).toBeCloseTo(0.9 / 3.7);
  });
});

describe('convert', () => {
  it('convierte dólares a soles', () => {
    expect(convert(100, 'USD', 'PEN', RATES)).toBeCloseTo(370);
  });

  it('convierte soles a dólares', () => {
    expect(convert(370, 'PEN', 'USD', RATES)).toBeCloseTo(100);
  });

  it('ida y vuelta devuelve el monto original', () => {
    const euros = convert(250, 'USD', 'EUR', RATES);
    expect(convert(euros, 'EUR', 'USD', RATES)).toBeCloseTo(250);
  });

  it('convertir 0 devuelve 0', () => {
    expect(convert(0, 'ARS', 'USD', RATES)).toBe(0);
  });
});

describe('hasEnoughBalance', () => {
  it('permite operar si el monto es menor al saldo', () => {
    expect(hasEnoughBalance(100, 250)).toBe(true);
  });

  it('permite operar con todo el saldo', () => {
    expect(hasEnoughBalance(250, 250)).toBe(true);
  });

  it('rechaza un monto mayor al saldo', () => {
    expect(hasEnoughBalance(300, 250)).toBe(false);
  });

  it('rechaza montos en cero o negativos', () => {
    expect(hasEnoughBalance(0, 250)).toBe(false);
    expect(hasEnoughBalance(-10, 250)).toBe(false);
  });
});
