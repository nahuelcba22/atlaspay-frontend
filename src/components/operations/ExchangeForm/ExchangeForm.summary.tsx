interface ExchangeSummaryProps {
  hasRates: boolean;
  ratesError: string;
  from: string;
  to: string;
  rate: number;
  resultLabel: string;
  sameCurrency: boolean;
  belowMinimum: boolean;
  overBalance: boolean;
  error: string;
  message: string;
  sending: boolean;
  canOperate: boolean;
}

function ExchangeSummary({
  hasRates,
  ratesError,
  from,
  to,
  rate,
  resultLabel,
  sameCurrency,
  belowMinimum,
  overBalance,
  error,
  message,
  sending,
  canOperate,
}: ExchangeSummaryProps) {
  return (
    <>
      <div className="exchange-form__summary">
        {!hasRates && !ratesError && <p>Cargando tasas...</p>}

        {ratesError && (
          <p className="exchange-form__error">{ratesError}</p>
        )}

        {hasRates && (
          <>
            <p>
              Tasa: 1 {from} = {rate.toFixed(4)} {to}
            </p>
            <p className="exchange-form__result">
              Recibís: {resultLabel}
            </p>
          </>
        )}
      </div>

      {sameCurrency && (
        <p className="exchange-form__error">
          Las monedas deben ser distintas.
        </p>
      )}

      {belowMinimum && (
        <p className="exchange-form__error">
          El monto mínimo es 0,10.
        </p>
      )}

      {overBalance && (
        <p className="exchange-form__error">
          Saldo insuficiente.
        </p>
      )}

      {error && <p className="exchange-form__error">{error}</p>}

      <button
        className="exchange-form__submit"
        type="submit"
        disabled={!canOperate}
      >
        {sending ? 'Procesando...' : 'Confirmar'}
      </button>

      {message && (
        <p className="exchange-form__success">{message}</p>
      )}
    </>
  );
}

export default ExchangeSummary;
