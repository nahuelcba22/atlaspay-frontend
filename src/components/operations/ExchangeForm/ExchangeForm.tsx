import { formatCurrency } from '../../../utils/currency';
import type { AccountBalances } from '../../../services/accountService';
import type { Currency } from '../../../utils/exchange';
import ExchangeFields from './ExchangeForm.fields';
import ExchangeSummary from './ExchangeForm.summary';
import { useExchangeForm } from './useExchangeForm';
import './ExchangeForm.css';

interface ExchangeFormProps {
  balances: AccountBalances;
  onSuccess: () => void;
}

function formatMoney(value: number, currency: Currency) {
  return formatCurrency(value, currency);
}

function ExchangeForm({ balances, onSuccess }: ExchangeFormProps) {
  const form = useExchangeForm({ balances, onSuccess });

  return (
    <form className="exchange-form" onSubmit={form.handleSubmit}>
      <h2 className="exchange-form__title">Convertir monedas</h2>

      <ExchangeFields
        from={form.from}
        to={form.to}
        amount={form.amount}
        balanceLabel={formatMoney(form.balance, form.from)}
        onFromChange={(event) => {
          form.setFrom(event.target.value as Currency);
          form.clearMessages();
        }}
        onToChange={(event) => {
          form.setTo(event.target.value as Currency);
          form.clearMessages();
        }}
        onAmountChange={(event) => {
          form.setAmount(event.target.value);
          form.clearMessages();
        }}
        onSwap={form.handleSwap}
      />

      <ExchangeSummary
        hasRates={form.rates !== null}
        ratesError={form.ratesError}
        from={form.from}
        to={form.to}
        rate={form.rate}
        resultLabel={formatMoney(
          form.numericAmount > 0 ? form.result : 0,
          form.to,
        )}
        sameCurrency={form.isSameCurrency}
        belowMinimum={form.isBelowMinimum}
        overBalance={form.isOverBalance}
        error={form.error}
        message={form.message}
        sending={form.sending}
        canOperate={form.canOperate}
      />
    </form>
  );
}

export default ExchangeForm;
