import { useLocation } from 'react-router-dom';
import DashboardHeader from '../../dashboard/DashboardHeader/DashboardHeader';
import { getToken } from '../../../services/authStorage';

// Páginas privadas donde se muestra la barra de navegación.
const PRIVATE_PATHS = [
  '/dashboard',
  '/operaciones',
  '/transferencias',
  '/historial',
  '/perfil',
  '/admin',
];

// Muestra la barra de navegación en todas las páginas privadas, una sola vez.
function PrivateNavbar() {
  const { pathname } = useLocation();
  const isVisible = PRIVATE_PATHS.includes(pathname) && Boolean(getToken());

  if (!isVisible) return null;

  return <DashboardHeader />;
}

export default PrivateNavbar;
