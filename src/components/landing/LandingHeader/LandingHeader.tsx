import { Link } from 'react-router-dom';
import atlaspayIcon from '../../../assets/atlaspay-icon.svg';
import './LandingHeader.css';

function LandingHeader() {
  return (
    <header className="landing-header">
      <Link className="landing-header__brand" to="/">
        <img src={atlaspayIcon} alt="" />
        <span>
          Atlas<strong>pay</strong>
        </span>
      </Link>

      <nav className="landing-header__links" aria-label="Secciones">
        <a href="#como-funciona">Cómo funciona</a>
        <a href="#para-quien">Para quién</a>
      </nav>

      <div className="landing-header__actions">
        <Link className="landing-header__login" to="/login">
          Ingresar
        </Link>
        <Link className="landing-btn landing-btn--primary" to="/register">
          Crear cuenta
        </Link>
      </div>
    </header>
  );
}

export default LandingHeader;
