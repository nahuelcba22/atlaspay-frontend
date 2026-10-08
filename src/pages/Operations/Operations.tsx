import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import BackLink from '../../components/layout/BackLink/BackLink';
import ExchangeForm from '../../components/operations/ExchangeForm/ExchangeForm';
import { getMyAccount, type AccountBalances } from '../../services/accountService';
import './Operations.css';

const MODES = {
  comprar: {
    label: 'Comprar',
    title: 'Comprar monedas',
    description:
      'Compra una moneda pagando con el saldo de otra. Verás cuánto recibes antes de confirmar.',
  },
  vender: {
    label: 'Vender',
    title: 'Vender monedas',
    description: 'Vende parte de tu saldo en una moneda y recíbelo en otra, a la tasa del día.',
  },
  cambiar: {
    label: 'Cambiar',
    title: 'Cambiar monedas',
    description: 'Convierte tu saldo de una moneda a otra con las tasas de cambio actualizadas.',
  },
} as const;

type Mode = keyof typeof MODES;

function isMode(value: string | null): value is Mode {
  return value !== null && value in MODES;
}

function Operations() {
  const [searchParams] = useSearchParams();
  const requestedMode = searchParams.get('tipo');
  const mode: Mode = isMode(requestedMode) ? requestedMode : 'cambiar';

  const [balances, setBalances] = useState<AccountBalances | null>(null);
  const [hasError, setHasError] = useState(false);

  async function refreshBalances() {
    try {
      const response = await getMyAccount();

      setBalances(response.cuenta.saldos);
      setHasError(false);
    } catch (error) {
      console.error('No se pudieron actualizar los saldos:', error);
      setHasError(true);
    }
  }

  useEffect(() => {
    let active = true;

    getMyAccount()
      .then((response) => {
        if (!active) return;

        setBalances(response.cuenta.saldos);
      })
      .catch((error) => {
        if (!active) return;

        console.error('No se pudieron cargar los saldos:', error);
        setHasError(true);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="operations">
      <BackLink />

      <header className="operations__header">
        <span className="operations__eyebrow">Operaciones</span>
        <h1 className="operations__title">{MODES[mode].title}</h1>
        <p className="operations__description">{MODES[mode].description}</p>
      </header>

      <nav className="operations__tabs" aria-label="Tipo de operación">
        {(Object.keys(MODES) as Mode[]).map((key) => (
          <Link
            key={key}
            className="operations__tab"
            to={`/operaciones?tipo=${key}`}
            aria-current={mode === key ? 'page' : undefined}
          >
            {MODES[key].label}
          </Link>
        ))}
      </nav>

      {!balances && !hasError && <p className="operations__status">Cargando saldos...</p>}

      {hasError && <p className="operations__status">No se pudieron cargar tus saldos.</p>}

      {balances && <ExchangeForm balances={balances} onSuccess={refreshBalances} />}
    </main>
  );
}

export default Operations;
