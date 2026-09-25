import { useState, type SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../services/authService';
import { validateRegister } from '../../../utils/authValidation';
import PasswordField from './PasswordField';
import './AuthForm.css';

function RegisterForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Valida los datos y registra al usuario en el backend.
  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '');
    const email = String(form.get('email') ?? '');
    const password = String(form.get('password') ?? '');
    const confirmPassword = String(form.get('confirmPassword') ?? '');

    const validationError = validateRegister({
      name,
      email,
      password,
      confirmPassword,
    });

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError('');

      await registerUser({
        nombre: name.trim(),
        email: email.trim(),
        password,
      });

      navigate('/login');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'No se pudo crear la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      {/* Datos básicos del usuario. */}
      <label className="auth-field">
        Nombre
        <input name="name" type="text" placeholder="Tu nombre" autoComplete="name" />
      </label>

      <label className="auth-field">
        Email
        <input name="email" type="email" placeholder="nombre@correo.com" autoComplete="email" />
      </label>

      {/* Campos de contraseña con visibilidad independiente. */}
      <PasswordField
        label="Contraseña"
        name="password"
        placeholder="Ingresá una contraseña"
        autoComplete="new-password"
      />

      <PasswordField
        label="Confirmar contraseña"
        name="confirmPassword"
        placeholder="Repetí tu contraseña"
        autoComplete="new-password"
      />

      {error && <p className="register-error">{error}</p>}

      <button type="submit" className="register-submit" disabled={loading}>
        {loading ? 'Creando cuenta...' : 'Crear cuenta'}
      </button>
    </form>
  );
}

export default RegisterForm;