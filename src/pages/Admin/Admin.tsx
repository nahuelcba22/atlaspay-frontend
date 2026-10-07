import { useEffect, useState } from 'react';
import {
  getExchangeOperations,
  getGlobalTransfers,
  type AdminTransaction,
} from '../../services/adminService';
import AdminSummary from '../../components/admin/AdminSummary';
import GlobalTransferHistory from '../../components/admin/GlobalTransferHistory';
import ExchangeOperations from '../../components/admin/ExchangeOperations';
import './Admin.css';

const Admin = () => {
  const [transfers, setTransfers] = useState<AdminTransaction[]>([]);
  const [exchanges, setExchanges] = useState<AdminTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAdminData = async () => {
      try {
        const [transfersResponse, exchangesResponse] = await Promise.all([
          getGlobalTransfers(),
          getExchangeOperations(),
        ]);

        setTransfers(transfersResponse.data);
        setExchanges(exchangesResponse.data);
      } catch {
        setError('No se pudo cargar la información del panel.');
      } finally {
        setIsLoading(false);
      }
    };

    loadAdminData();
  }, []);

  if (isLoading) {
    return <main className="admin-page">Cargando panel...</main>;
  }

  if (error) {
    return <main className="admin-page">{error}</main>;
  }

  return (
    <main className="admin-page">
      <div className="admin-page__container">
        <header className="admin-page__header">
          <h1>Panel de administración</h1>
          <p>Supervisá la actividad general de Atlaspay.</p>
        </header>

        <AdminSummary
          transfersTotal={transfers.length}
          exchangesTotal={exchanges.length}
        />

        <GlobalTransferHistory transfers={transfers} />
        <ExchangeOperations exchanges={exchanges} />
      </div>
    </main>
  );
};

export default Admin;