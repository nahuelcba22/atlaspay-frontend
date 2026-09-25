import atlaspayIcon from '../../../assets/atlaspay-icon.svg';
import './AuthBrand.css';

function AuthBrand() {
  return (
    <div className="auth-brand">
      {/* Identidad visual compartida por Login y Registro. */}
      <img src={atlaspayIcon} alt="" />

      <span>
        Atlas<strong>pay</strong>
      </span>
    </div>
  );
}

export default AuthBrand;