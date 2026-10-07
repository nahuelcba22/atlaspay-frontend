import type { ChangeEvent } from 'react';
import { CURRENCIES } from '../../../utils/exchange';
import type { Currency } from '../../../utils/exchange';
import { formatMoney } from './TransferForm.utils';

interface TransferFieldsProps {
  destination: string;
  currency: Currency;
  amount: string;
  reason: string;
  balance: number;
  onDestinationChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCurrencyChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onAmountChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onReasonChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TransferFields({
  destination,
  currency,
  amount,
  reason,
  balance,
  onDestinationChange,
  onCurrencyChange,
  onAmountChange,
  onReasonChange,
}: TransferFieldsProps) {
  return (
    <>
      <label className="transfer-form__field">
        <span className="transfer-form__label">CVU o alias de destino</span>
        <input
          className="transfer-form__input"
          value={destination}
          onChange={onDestinationChange}
          placeholder="CVU de 22 dígitos o alias (ej. juan.123.atlas)"
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
