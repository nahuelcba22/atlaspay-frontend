import { useEffect, useState } from 'react';
import BalanceCard from '../../components/dashboard/BalanceCard/BalanceCard';
import CurrencyList from '../../components/dashboard/CurrencyList/CurrencyList';
import QuickActions from '../../components/dashboard/QuickActions/QuickActions';
import RecentActivity from '../../components/dashboard/RecentActivity/RecentActivity';
import {
  getMyAccount,
  type AccountBalances,
} from '../../services/accountService';
import {
  getTransferHistory,
  type Transfer,
} from '../../services/transferService';
import './Dashboard.css';

function Dashboard() {
  const [balances, setBalances] = useState<AccountBalances>({
    ARS: 0,
    USD: 0,
    EUR: 0,
    PEN: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [transfers, setTransfers] = useState<Transfer[]>([]);

  useEffect(() => {
    async function loadAccount() {
      try {
        const response = await getMyAccount();
        setBalances(response.cuenta.saldos);
      } catch (error) {
        console.error('No se pudo cargar la cuenta:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    }

    async function loadTransfers() {
      try {
        const response = await getTransferHistory();
        setTransfers(response.transferencias);
      } catch (error) {
        console.error('No se pudo cargar el historial:', error);
      }
    }
    
    loadAccount();
    loadTransfers();
  }, []);

  return (
    <main className="dashboard">
      <div className="dashboard__content">
        <section className="dashboard__welcome">
          <h1 className="dashboard__title">Tu billetera</h1>
          <p className="dashboard__subtitle">
            Gestiona tus monedas desde un solo lugar.
          </p>
        </section>

        {isLoading && (
          <p className="dashboard__status">Cargando tu billetera...</p>
        )}

        {hasError && (
          <p className="dashboard__error">
            No pudimos cargar los datos de tu billetera.
          </p>
        )}

        {!isLoading && !hasError && (
          <BalanceCard balance={balances.ARS} />
        )}

        <CurrencyList balances={balances} />

        <QuickActions />

        <RecentActivity transfers={transfers} />
      </div>
    </main>
  );
}

export default Dashboard;