import type { ChangeEvent } from 'react';
import { CURRENCIES } from '../../../utils/exchange';
import type { Currency } from '../../../utils/exchange';

interface ExchangeFieldsProps {
  from: Currency;
  to: Currency;
  amount: string;
  balanceLabel: string;
  onFromChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onToChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSwap: () => void;
}

function ExchangeFields({
  from,
  to,
  amount,
  balanceLabel,
  onFromChange,
  onToChange,
  onAmountChange,
  onSwap,
}: ExchangeFieldsProps) {
  return (
    <>
      <div className="exchange-form__row">
        <label className="exchange-form__field">
          <span className="exchange-form__label">Desde</span>
          <select
            className="exchange-form__input"
            value={from}
            onChange={onFromChange}
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
          onClick={onSwap}
          aria-label="Invertir monedas"
        >
          ⇄
        </button>

        <label className="exchange-form__field">
          <span className="exchange-form__label">Hacia</span>
          <select
            className="exchange-form__input"
            value={to}
            onChange={onToChange}
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
          min="0.1"
          step="0.1"
          placeholder="0,10"
          value={amount}
          onChange={onAmountChange}
        />
        <span className="exchange-form__hint">
          Disponible: {balanceLabel}
        </span>
      </label>
    </>
  );
}

export default ExchangeFields;
