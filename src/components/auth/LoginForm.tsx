import { useState, type SyntheticEvent } from 'react';
import { validateLogin } from '../../utils/authValidation';

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Valida los datos enviados por el formulario.
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');

    setError(validateLogin(email, password));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="nombre@correo.com"
          autoComplete="email"
        />
      </div>

      <div className="login-field">
        <label htmlFor="password">Contraseña</label>

        <div className="login-password">
          <input
            id="password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Ingresá tu contraseña"
            autoComplete="current-password"
          />

          <button
            type="button"
            className="login-password-toggle"
            onClick={() => setShowPassword((value) => !value)}
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
      </div>

      {error && <p className="login-error">{error}</p>}

      <button type="submit" className="login-submit">
        Iniciar sesión
      </button>
    </form>
  );
}

export default LoginForm;