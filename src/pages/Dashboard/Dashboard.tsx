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
import { getProfile } from '../../services/profileService';
// Ya no necesitamos importar './Dashboard.css'

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
  const [userName, setUserName] = useState('');
  const [accountAlias, setAccountAlias] = useState('');

  useEffect(() => {
    async function loadAccount() {
      try {
        const response = await getMyAccount();
        setBalances(response.cuenta.saldos);
        setAccountAlias(response.cuenta.alias);
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

    async function loadProfile() {
      try {
        const response = await getProfile();
        setUserName(response.usuario.nombre);
      } catch (error) {
        console.error('No se pudo cargar el perfil:', error);
      }
    }
    
    loadAccount();
    loadTransfers();
    loadProfile();
  }, []);

  // Lógica para el nombre
  const firstName = userName.trim().split(' ')[0];

  // Lógica para el saludo dinámico según la hora
  const currentHour = new Date().getHours();
  let greeting = 'Buenas noches';
  if (currentHour >= 6 && currentHour < 12) greeting = 'Buen día';
  else if (currentHour >= 12 && currentHour < 20) greeting = 'Buenas tardes';

  return (
    <div className="min-h-screen w-full bg-[#07101f] pb-8 text-[#f4f7fb]">
      {/* Contenedor principal centrado */}
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-5 pt-6 sm:px-8 lg:px-12 lg:pt-8">
        
        {/* Cabecera del Dashboard */}
        <div className="mb-4 flex flex-col gap-2">
          <p className="text-sm text-slate-400">
            {greeting}{firstName ? `, ${firstName}` : ''} <span className="text-[#26cee8]">✦</span>
          </p>
          <h1 className="text-3xl font-semibold leading-[1.15] tracking-[-0.06em] sm:text-[40px]">
            Tu dinero, <span className="font-serif font-normal italic text-[#2bd5eb]">en movimiento.</span>
          </h1>
        </div>

        {/* Estados de carga y error */}
        {isLoading && (
          <div role="status" aria-live="polite" className="rounded-md border border-white/10 bg-[#0a1829] p-4 text-sm text-[#38d8ec]">
            Cargando tu billetera...
          </div>
        )}
        
        {hasError && (
          <div role="alert" className="rounded-md border border-red-500/20 bg-[#0a1829] p-4 text-sm text-red-400">
            No pudimos cargar los datos de tu billetera.
          </div>
        )}

        {/* Grilla principal: Replicando exactamente el comportamiento de tu CSS antiguo */}
        {!isLoading && !hasError && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
            
            {/* Columna Izquierda: Balance y Monedas */}
            <div className="flex flex-col gap-6">
              <BalanceCard balance={balances.ARS} alias={accountAlias} />
              <CurrencyList balances={balances} />
            </div>

            {/* Columna Derecha: Operaciones y Actividad */}
            <div className="flex flex-col gap-6">
              <QuickActions />
              <RecentActivity transfers={transfers} />
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;