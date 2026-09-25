import BalanceCard from '../../components/dashboard/BalanceCard/BalanceCard';
import CurrencyList from '../../components/dashboard/CurrencyList/CurrencyList';
import DashboardHeader from '../../components/dashboard/DashboardHeader/DashboardHeader';
import QuickActions from '../../components/dashboard/QuickActions/QuickActions';
import RecentActivity from '../../components/dashboard/RecentActivity/RecentActivity';
import './Dashboard.css';

function Dashboard() {
  return (
    <main className="dashboard">
      <DashboardHeader />

      <div className="dashboard__content">
        <section className="dashboard__welcome">
          <h1 className="dashboard__title">Tu billetera</h1>
          <p className="dashboard__subtitle">Gestioná tus monedas desde un solo lugar.</p>
        </section>

        <BalanceCard />

        <CurrencyList />

        <QuickActions />

        <RecentActivity />
      </div>
    </main>
  );
}

export default Dashboard;
