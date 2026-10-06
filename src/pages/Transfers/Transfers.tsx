import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TransferForm from '../../components/operations/TransferForm/TransferForm';
import {
  getMyAccount,
  type AccountBalances,
} from '../../services/accountService';
import './Transfers.css';

function Transfers() {
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
    <main className="transfers">
      <Link className="transfers__back" to="/dashboard">
        ← Volver al dashboard
      </Link>

      <h1 className="transfers__title">Transferencias</h1>

      {!balances && !hasError && <p>Cargando saldos...</p>}
      {hasError && <p>No se pudieron cargar tus saldos.</p>}

      {balances && (
        <TransferForm
          balances={balances}
          onSuccess={refreshBalances}
        />
      )}
    </main>
  );
}

export default Transfers;
