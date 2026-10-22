import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
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
// import './Dashboard.css'; // <-- Puedes eliminar o comentar este archivo

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
    <div className="min-h-screen bg-[#07101f] text-[#f4f7fb]">
      {/* Contenedor principal con el fondo oscuro y texto claro */}
      <div className="mx-auto max-w-[1240px] px-5 py-8 sm:px-8 lg:px-12 lg:py-11">
        
        {/* Cabecera del Dashboard */}
        <div className="mb-9 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-2 text-sm text-slate-400">Buen día <span className="text-[#26cee8]">✦</span></p>
            <h1 className="text-3xl font-semibold tracking-[-0.06em] sm:text-[40px]">
              Tu dinero, <span className="font-serif font-normal italic text-[#2bd5eb]">en movimiento.</span>
            </h1>
          </div>
          <button className="flex w-fit items-center gap-2 rounded-xl bg-[#2d82f5] px-4 py-3 text-sm font-semibold shadow-[0_10px_30px_rgba(45,130,245,0.22)] transition hover:bg-[#4090fa]">
            <Plus size={17} /> Agregar dinero
          </button>
        </div>

        {/* Estados de carga y error (Estilizados mínimamente para que se vean) */}
        {isLoading && <p className="mb-5 text-sm text-[#38d8ec]">Cargando tu billetera...</p>}
        {hasError && <p className="mb-5 text-sm text-red-400">No pudimos cargar los datos de tu billetera.</p>}

        {/* Grilla principal: Balance y Operaciones Rápidas */}
        {!isLoading && !hasError && (
          <div className="grid gap-5 xl:grid-cols-[1.5fr_1fr]">
            <BalanceCard balance={balances.ARS} />
            <QuickActions />
          </div>
        )}

        {/* Aquí irán los siguientes componentes que estilizaremos */}
        <div className="mt-10">
          <CurrencyList balances={balances} />
        </div>

        <div className="mt-10">
          <RecentActivity transfers={transfers} />
        </div>

      </div>
    </div>
  );
}

export default Dashboard;