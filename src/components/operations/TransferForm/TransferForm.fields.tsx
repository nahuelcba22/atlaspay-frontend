import type { ChangeEvent } from 'react';
import { CURRENCIES } from '../../../utils/exchange';
import type { Currency } from '../../../utils/exchange';
import { formatMoney } from './TransferForm.utils';

interface TransferFieldsProps {
  cvu: string;
  currency: Currency;
  amount: string;
  reason: string;
  balance: number;
  onCvuChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCurrencyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReasonChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TransferFields({
  cvu,
  currency,
  amount,
  reason,
  balance,
  onCvuChange,
  onCurrencyChange,
  onAmountChange,
  onReasonChange,
}: TransferFieldsProps) {
  return (
    <>
      <label className="transfer-form__field">
        <span className="transfer-form__label">CVU destino</span>
        <input
          className="transfer-form__input"
          value={cvu}
          onChange={onCvuChange}
          placeholder="Ingresá el CVU"
        />
      </label>

      <label className="transfer-form__field">
        <span className="transfer-form__label">Moneda</span>
        <select
          className="transfer-form__input"
          value={currency}
          onChange={onCurrencyChange}
        >
          {CURRENCIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>

      <label className="transfer-form__field">
        <span className="transfer-form__label">Monto</span>
        <input
          className="transfer-form__input"
          type="number"
          min="0.1"
          step="0.1"
          value={amount}
          onChange={onAmountChange}
          placeholder="0,10"
        />
        <span className="transfer-form__hint">
          Disponible: {formatMoney(balance, currency)}
        </span>
      </label>

      <label className="transfer-form__field">
        <span className="transfer-form__label">Motivo</span>
        <input
          className="transfer-form__input"
          value={reason}
          onChange={onReasonChange}
          placeholder="Opcional"
        />
      </label>
    </>
  );
}

export default TransferFields;
