import { useNavigate } from 'react-router-dom';
import { getRole } from '../../../services/authStorage';
import './DashboardHeader.css';

function DashboardHeader() {
  const navigate = useNavigate();
  const userIsAdmin = getRole() === 'admin';

  return (
    <header className="dashboard-header">
      <span className="dashboard-header__brand">Atlaspay</span>

      <div className="dashboard-header__actions">
        {userIsAdmin && (
          <button
            className="dashboard-header__admin"
            type="button"
            onClick={() => navigate('/admin')}
          >
            Panel admin
          </button>
        )}

        <div className="dashboard-header__profile-wrapper">
          <button
            className="dashboard-header__profile"
            type="button"
            aria-label="Abrir perfil"
            onClick={() => navigate('/perfil')}
          >
            👤
          </button>

          <span className="dashboard-header__tooltip">Ver perfil</span>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;