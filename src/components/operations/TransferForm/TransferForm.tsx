import type { AccountBalances } from '../../../services/accountService';
import type { Currency } from '../../../utils/exchange';
import TransferFields from './TransferForm.fields';
import { useTransferForm } from './useTransferForm';
import './TransferForm.css';

interface TransferFormProps {
  balances: AccountBalances;
  onSuccess: () => void;
}

function TransferForm({
  balances,
  onSuccess,
}: TransferFormProps) {
  const form = useTransferForm({
    balances,
    onSuccess,
  });

  return (
    <form
      className="transfer-form"
      onSubmit={form.handleSubmit}
    >
      <h2 className="transfer-form__title">
        Transferir dinero
      </h2>

      <TransferFields
        cvu={form.cvu}
        currency={form.currency}
        amount={form.amount}
        reason={form.reason}
        balance={form.balance}
        onCvuChange={(event) =>
          form.setCvu(event.target.value)
        }
        onCurrencyChange={(event) =>
          form.setCurrency(
            event.target.value as Currency,
          )
        }
        onAmountChange={(event) =>
          form.setAmount(event.target.value)
        }
        onReasonChange={(event) =>
          form.setReason(event.target.value)
        }
      />

      {form.numericAmount > form.balance && (
        <p className="transfer-form__error">
          Saldo insuficiente.
        </p>
      )}

      {form.error && (
        <p className="transfer-form__error">
          {form.error}
        </p>
      )}

      {form.message && (
        <p className="transfer-form__success">
          {form.message}
        </p>
      )}

      <button
        className="transfer-form__submit"
        type="submit"
        disabled={!form.canSubmit}
      >
        {form.sending
          ? 'Transfiriendo...'
          : 'Confirmar transferencia'}
      </button>
    </form>
  );
}

export default TransferForm;