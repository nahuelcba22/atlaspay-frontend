import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getMyAccount } from '../../../services/accountService';
import { getToken, removeToken } from '../../../services/authStorage';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Valida el JWT contra una ruta privada del backend.
  useEffect(() => {
    const validateSession = async () => {
      if (!getToken()) {
        setIsAuthenticated(false);
        return;
      }

      try {
        await getMyAccount();
        setIsAuthenticated(true);
      } catch {
        removeToken();
        setIsAuthenticated(false);
      }
    };

    validateSession();
  }, []);

  if (isAuthenticated === null) return null;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;