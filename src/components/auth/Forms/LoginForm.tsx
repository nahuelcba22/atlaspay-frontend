import { useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';
import { saveToken } from '../../../services/authStorage';
import { validateLogin } from '../../../utils/authValidation';
import PasswordField from './PasswordField';
import './AuthForm.css';

function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Valida las credenciales e inicia sesión en el backend.
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    const validationError = validateLogin(email, password);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');

      const response = await loginUser({
        email: email.trim(),
        password,
      });

      // Guarda el JWT recibido antes de acceder al Dashboard.
      saveToken(response.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No se pudo iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      {/* Datos necesarios para iniciar sesión. */}
      <label className="auth-field">
        Email
        <input
          name="email"
          type="email"
          placeholder="nombre@correo.com"
          autoComplete="email"
        />
      </label>

      <PasswordField
        label="Contraseña"
        name="password"
        placeholder="Ingresá tu contraseña"
        autoComplete="current-password"
      />

      {error && <p className="login-error">{error}</p>}

      <button type="submit" className="login-submit" disabled={loading}>
        {loading ? 'Ingresando...' : 'Iniciar sesión'}
      </button>
    </form>
  );
}

export default LoginForm;