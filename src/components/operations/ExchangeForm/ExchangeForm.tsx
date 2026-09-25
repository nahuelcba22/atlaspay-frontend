import { useState } from 'react';
import type { FormEvent } from 'react';
import { CURRENCIES, convert, getRate, hasEnoughBalance } from '../../../utils/exchange';
import type { Currency } from '../../../utils/exchange';
import './ExchangeForm.css';

// Saldos de prueba. Se reemplazarán por los saldos reales del backend.
const MOCK_BALANCES: Record<Currency, number> = {
  ARS: 85000,
  USD: 250,
  EUR: 120,
  PEN: 300,
};

function formatMoney(value: number, currency: Currency): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency });
}

function ExchangeForm() {
  const [from, setFrom] = useState<Currency>('USD');
  const [to, setTo] = useState<Currency>('PEN');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const numericAmount = Number(amount);
  const balance = MOCK_BALANCES[from];
  const rate = getRate(from, to);
  const result = convert(numericAmount, from, to);

  const isSameCurrency = from === to;
  const isOverBalance = numericAmount > balance;
  const canOperate = !isSameCurrency && hasEnoughBalance(numericAmount, balance);

  function handleSwap() {
    setFrom(to);
    setTo(from);
    setMessage('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canOperate) return;

    setMessage(
      `Operación simulada: ${formatMoney(numericAmount, from)} → ${formatMoney(result, to)}`,
    );
    setAmount('');
  }

  return (
    <form className="exchange-form" onSubmit={handleSubmit}>
      <h2 className="exchange-form__title">Convertir monedas</h2>

      <div className="exchange-form__row">
        <label className="exchange-form__field">
          <span className="exchange-form__label">Desde</span>
          <select
            className="exchange-form__input"
            value={from}
            onChange={(event) => {
              setFrom(event.target.value as Currency);
              setMessage('');
            }}
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>

        <button
          className="exchange-form__swap"
          type="button"
          onClick={handleSwap}
          aria-label="Invertir monedas"
        >
          ⇄
        </button>

        <label className="exchange-form__field">
          <span className="exchange-form__label">Hacia</span>
          <select
            className="exchange-form__input"
            value={to}
            onChange={(event) => {
              setTo(event.target.value as Currency);
              setMessage('');
            }}
          >
            {CURRENCIES.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="exchange-form__field">
        <span className="exchange-form__label">Monto</span>
        <input
          className="exchange-form__input"
          type="number"
          min="0"
          step="any"
          placeholder="0,00"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
            setMessage('');
          }}
        />
        <span className="exchange-form__hint">Disponible: {formatMoney(balance, from)}</span>
      </label>

      <div className="exchange-form__summary">
        <p>
          Tasa: 1 {from} = {rate.toLocaleString('es-AR', { maximumFractionDigits: 4 })} {to}
        </p>
        <p className="exchange-form__result">
          Recibís: {formatMoney(numericAmount > 0 ? result : 0, to)}
        </p>
      </div>

      {isSameCurrency && <p className="exchange-form__error">Las monedas deben ser distintas.</p>}
      {!isSameCurrency && isOverBalance && (
        <p className="exchange-form__error">Saldo insuficiente.</p>
      )}

      <button className="exchange-form__submit" type="submit" disabled={!canOperate}>
        Confirmar
      </button>

      {message && <p className="exchange-form__success">{message}</p>}
    </form>
  );
}

export default ExchangeForm;
