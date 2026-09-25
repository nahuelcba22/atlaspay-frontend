interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Valida los datos del inicio de sesión.
export function validateLogin(email: string, password: string) {
  if ([email, password].some((field) => !field.trim())) {
    return 'Completá todos los campos.';
  }

  return isValidEmail(email) ? '' : 'Ingresá un email válido.';
}

// Valida los datos necesarios para crear una cuenta.
export function validateRegister({
  name,
  email,
  password,
  confirmPassword,
}: RegisterData) {
  const fields = [name, email, password, confirmPassword];

  if (fields.some((field) => !field.trim())) {
    return 'Completá todos los campos.';
  }

  if (!isValidEmail(email)) return 'Ingresá un email válido.';
  if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres.';
  if (password !== confirmPassword) return 'Las contraseñas no coinciden.';

  return '';
}