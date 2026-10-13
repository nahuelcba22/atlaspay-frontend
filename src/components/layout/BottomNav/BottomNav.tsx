import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getRole } from '../../../services/authStorage';
import './BottomNav.css';
import iconoHistorial from '../../../assets/icono-historial.png';
import iconoInicio from '../../../assets/icono-comprar.png';
import iconoPerfil from '../../../assets/icono-perfil.png';
import iconoAdmin from '../../../assets/icono-admin.png';
import iconoOperar from '../../../assets/icono-operar.png';

export default function BottomNav() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userIsAdmin = getRole() === 'admin';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bottom-nav-wrapper">
      {/* Fondo oscuro cuando se abre el menú central */}
      {isMenuOpen && <div className="bottom-nav-overlay" onClick={toggleMenu}></div>}

      {/* Menú emergente de Operaciones (SIN ÍCONOS AQUÍ) */}
      <div className={`bottom-nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/operaciones?tipo=comprar" onClick={toggleMenu} className="menu-action">
          <span>Comprar</span>
        </Link>
        <Link to="/operaciones?tipo=vender" onClick={toggleMenu} className="menu-action">
          <span>Vender</span>
        </Link>
        <Link to="/operaciones?tipo=cambiar" onClick={toggleMenu} className="menu-action">
          <span>Cambiar</span>
        </Link>
        <Link to="/transferencias" onClick={toggleMenu} className="menu-action">
          <span>Transferir</span>
        </Link>
      </div>

      {/* Barra de navegación principal */}
      <nav className="bottom-nav">
        
        {/* BOTÓN INICIO (Con ícono PNG) */}
        <Link to="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
          <span className="nav-icon">
             <img src={iconoInicio} alt="Inicio" className="nav-png-icon" />
          </span>
          <span className="nav-label">Inicio</span>
        </Link>

        {/* BOTÓN HISTORIAL */}
        <Link to="/historial" className={`nav-item ${pathname === '/historial' ? 'active' : ''}`}>
          <span className="nav-icon">
            <img src={iconoHistorial} alt="Historial" className="nav-png-icon" />
          </span>
          <span className="nav-label">Historial</span>
        </Link>

        {/* Botón Flotante Central (FAB) */}
        <div className="nav-item fab-container">
          <button className="fab-button" onClick={toggleMenu} aria-label="Opciones de operación">
            {/* Reemplazamos el span del '+' por la imagen */}
            <img 
              src={iconoOperar} 
              alt="Operar" 
              className={`fab-png-icon ${isMenuOpen ? 'rotate' : ''}`} 
            />
          </button>
          <span className="nav-label fab-label" style={{ marginTop: '8px', color: 'var(--color-text)', fontWeight: 600 }}>Operar</span>
        </div>

        {/* BOTÓN PERFIL */}
        <Link to="/perfil" className={`nav-item ${pathname === '/perfil' ? 'active' : ''}`}>
          <span className="nav-icon">
            <img src={iconoPerfil} alt="Perfil" className="nav-png-icon" />
          </span>
          <span className="nav-label">Perfil</span>
        </Link>

        {/* BOTÓN ADMIN */}
        {userIsAdmin ? (
          <Link to="/admin" className={`nav-item ${pathname === '/admin' ? 'active' : ''}`}>
            <span className="nav-icon">
              <img src={iconoAdmin} alt="Admin" className="nav-png-icon" />
            </span>
            <span className="nav-label">Admin</span>
          </Link>
        ) : (
          <div className="nav-item" style={{ visibility: 'hidden' }}></div>
        )}
      </nav>
    </div>
  );
}