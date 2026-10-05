import { useNavigate } from 'react-router-dom';
import './DashboardHeader.css';

function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <header className="dashboard-header">
      <span className="dashboard-header__brand">Atlaspay</span>

      <button
        className="dashboard-header__profile"
        type="button"
        aria-label="Abrir perfil"
        onClick={() => navigate('/perfil')}
      >
        👤
      </button>
    </header>
  );
}

export default DashboardHeader;