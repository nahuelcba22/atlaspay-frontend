import AuthBrand from '../../components/auth/AuthBrand/AuthBrand';
import LoginForm from '../../components/auth/Forms/LoginForm';
import GoogleAuthButton from '../../components/auth/GoogleAuthButton/GoogleAuthButton';
import './Login.css';

function Login() {
  return (
    <main className="login-page">
      <section className="login-card">
        <header className="login-header">
          <AuthBrand />

          <h1>Iniciar sesión</h1>
          <p>Ingresá a tu cuenta para administrar tu billetera.</p>
        </header>

        <LoginForm />

        <div className="login-divider">
          <span>o continuar con</span>
        </div>

        <GoogleAuthButton />

        <p className="login-register">
          ¿No tenés una cuenta? <a href="/register">Crear cuenta</a>
        </p>
      </section>
    </main>
  );
}

export default Login;