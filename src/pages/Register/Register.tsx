import AuthBrand from '../../components/auth/AuthBrand/AuthBrand';
import RegisterForm from '../../components/auth/Forms/RegisterForm';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton/GoogleAuthButton';
import './Register.css';

function Register() {
  return (
    <main className="register-page">
      <section className="register-card">
        <header className="register-header">
          <AuthBrand />

          <h1>Crear cuenta</h1>
          <p>Creá tu cuenta para comenzar a gestionar tu billetera.</p>
        </header>

        <RegisterForm />

        <div className="register-divider">
          <span>o continuar con</span>
        </div>

        <GoogleAuthButton />

        <p className="register-login">
          ¿Ya tenés una cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </section>
    </main>
  );
}

export default Register;