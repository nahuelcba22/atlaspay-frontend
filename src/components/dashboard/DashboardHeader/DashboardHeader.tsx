import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import atlaspayIcon from '../../../assets/atlaspay-icon.svg';
import { getRole } from '../../../services/authStorage';
import { getProfile } from '../../../services/profileService';
import './DashboardHeader.css';

const OPERATIONS = [
  { type: 'comprar', label: 'Comprar', hint: 'Suma una moneda a tu billetera' },
  { type: 'vender', label: 'Vender', hint: 'Convierte lo que no necesitas' },
  { type: 'cambiar', label: 'Cambiar', hint: 'Pasa de una moneda a otra' },
];

// Devuelve qué operación está abierta en la página de operaciones.
function useCurrentOperation() {
  const { pathname, search } = useLocation();
  const isOperationsPage = pathname === '/operaciones';
  const type = new URLSearchParams(search).get('tipo') ?? 'cambiar';

  return { isOperationsPage, type };
}

// En pantallas chicas: Comprar, Vender y Cambiar como enlaces sueltos.
function OperationLinks() {
  const { isOperationsPage, type } = useCurrentOperation();

  return (
    <>
      {OPERATIONS.map((operation) => (
        <Link
          key={operation.type}
          className="dashboard-header__link dashboard-header__link--inline"
          to={`/operaciones?tipo=${operation.type}`}
          aria-current={isOperationsPage && type === operation.type ? 'page' : undefined}
        >
          {operation.label}
        </Link>
      ))}
    </>
  );
}

// En pantallas medianas y grandes: un menú desplegable "Operaciones".
function OperationsMenu() {
  const { isOperationsPage, type } = useCurrentOperation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cierra el menú al hacer clic afuera o al presionar Escape.
  useEffect(() => {
    if (!isOpen) return;

    function handleClick(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKey);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKey);
    };
  }, [isOpen]);

  return (
    <div className="dashboard-header__menu" ref={menuRef}>
      <button
        className="dashboard-header__link dashboard-header__trigger"
        type="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-current={isOperationsPage ? 'page' : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        Operaciones
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="m4 6 4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="dashboard-header__dropdown" role="menu">
          {OPERATIONS.map((operation) => (
            <Link
              key={operation.type}
              className="dashboard-header__dropdown-item"
              role="menuitem"
              to={`/operaciones?tipo=${operation.type}`}
              aria-current={isOperationsPage && type === operation.type ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              <span className="dashboard-header__dropdown-title">{operation.label}</span>
              <span className="dashboard-header__dropdown-hint">{operation.hint}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function DashboardHeader() {
  const userIsAdmin = getRole() === 'admin';
  const [userName, setUserName] = useState('');

  // Pide el nombre para mostrar la inicial y el saludo del usuario.
  useEffect(() => {
    let isActive = true;

    getProfile()
      .then((profile) => {
        if (isActive) setUserName(profile.usuario.nombre);
      })
      .catch(() => {
        // Si falla, la barra sigue funcionando con un avatar genérico.
      });

    return () => {
      isActive = false;
    };
  }, []);

  const firstName = userName.trim().split(' ')[0];
  const initial = firstName ? firstName.charAt(0).toUpperCase() : 'A';

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__inner">
        <Link
          className="dashboard-header__brand"
          to="/dashboard"
          aria-label="Atlaspay, ir a mi billetera"
        >
          <img src={atlaspayIcon} alt="" />
          <span>
            Atlas<strong>pay</strong>
          </span>
        </Link>

        <nav className="dashboard-header__nav" aria-label="Navegación principal">
          <NavLink className="dashboard-header__link" to="/dashboard">
            Billetera
          </NavLink>

          <OperationLinks />
          <OperationsMenu />

          <NavLink className="dashboard-header__link" to="/transferencias">
            Transferir
          </NavLink>
          <NavLink className="dashboard-header__link" to="/historial">
            Historial
          </NavLink>

          {userIsAdmin && (
            <NavLink className="dashboard-header__link" to="/admin">
              Admin
            </NavLink>
          )}
        </nav>

        <Link className="dashboard-header__user" to="/perfil" aria-label="Ver mi perfil">
          <span className="dashboard-header__avatar">{initial}</span>
          {firstName && <span className="dashboard-header__name">{firstName}</span>}
        </Link>
      </div>
    </header>
  );
}

export default DashboardHeader;
