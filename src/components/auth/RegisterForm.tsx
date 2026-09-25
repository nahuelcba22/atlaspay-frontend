import { useState, type SyntheticEvent } from 'react';
import { validateRegister } from '../../utils/authValidation';

function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Obtiene y valida los datos enviados por el formulario.
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const validationError = validateRegister({
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      password: String(form.get('password') ?? ''),
      confirmPassword: String(form.get('confirmPassword') ?? ''),
    });

    setError(validationError);
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <label>
        Nombre
        <input name="name" type="text" autoComplete="name" />
      </label>

      <label>
        Email
        <input name="email" type="email" autoComplete="email" />
      </label>

      <label>
        Contraseña
        <input
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
        />
      </label>

      <label>
        Confirmar contraseña
        <input
          name="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
        />
      </label>

      <button type="button" onClick={() => setShowPassword((value) => !value)}>
        {showPassword ? 'Ocultar' : 'Mostrar'} contraseña
      </button>

      {error && <p className="register-error">{error}</p>}

      <button type="submit" className="register-submit">
        Crear cuenta
      </button>
    </form>
  );
}

export default RegisterForm;