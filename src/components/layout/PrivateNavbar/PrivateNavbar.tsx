import { useLocation } from 'react-router-dom';
import DashboardHeader from '../../dashboard/DashboardHeader/DashboardHeader';
import BottomNav from '../BottomNav/BottomNav';
import { getToken } from '../../../services/authStorage';

const PRIVATE_PATHS = [
  '/dashboard',
  '/operaciones',
  '/transferencias',
  '/historial',
  '/perfil',
  '/admin',
];

function PrivateNavbar() {
  const { pathname } = useLocation();
  const isVisible = PRIVATE_PATHS.includes(pathname) && Boolean(getToken());

  if (!isVisible) return null;

  return (
    <>
      <DashboardHeader />
      <BottomNav />
    </>
  );
}

export default PrivateNavbar;