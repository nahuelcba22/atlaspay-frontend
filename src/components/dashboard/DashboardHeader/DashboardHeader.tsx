import './DashboardHeader.css';

function DashboardHeader() {
  return (
    <header className="dashboard-header">
      <span className="dashboard-header__brand">Atlaspay</span>

      <button className="dashboard-header__profile" type="button" aria-label="Abrir perfil">
        👤
      </button>
    </header>
  );
}

export default DashboardHeader;
