import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExchangeForm from '../../components/operations/ExchangeForm/ExchangeForm';
import {
  getMyAccount,
  type AccountBalances,
} from '../../services/accountService';
import './Operations.css';

function Operations() {
  const [balances, setBalances] = useState<AccountBalances | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    async function loadAccount() {
      try {
        const response = await getMyAccount();
        setBalances(response.cuenta.saldos);
      } catch (error) {
        console.error('No se pudieron cargar los saldos:', error);
        setHasError(true);
      }
    }

    loadAccount();
  }, []);

  return (
    <main className="operations">
      <Link className="operations__back" to="/dashboard">
        ← Volver al dashboard
      </Link>

      <h1 className="operations__title">Operaciones</h1>

      {!balances && !hasError && <p>Cargando saldos...</p>}

      {hasError && <p>No se pudieron cargar tus saldos.</p>}

      {balances && <ExchangeForm balances={balances} />}
    </main>
  );
}

export default Operations;