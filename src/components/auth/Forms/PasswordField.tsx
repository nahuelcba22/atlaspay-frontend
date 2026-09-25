import { useState } from 'react';
import PasswordVisibilityIcon from './PasswordVisibilityIcon';

interface PasswordFieldProps {
  label: string;
  name: string;
  placeholder: string;
  autoComplete: string;
}

function PasswordField({ label, name, placeholder, autoComplete }: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="auth-field">
      {label}

      <div className="auth-password">
        <input
          name={name}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />

        {/* Controla la visibilidad de este campo de contraseña. */}
        <button
          type="button"
          className="auth-password-toggle"
          onClick={() => setVisible((value) => !value)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          <PasswordVisibilityIcon visible={visible} />
        </button>
      </div>
    </label>
  );
}

export default PasswordField;