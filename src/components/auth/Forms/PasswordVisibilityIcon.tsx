interface PasswordVisibilityIconProps {
  visible: boolean;
}

function PasswordVisibilityIcon({ visible }: PasswordVisibilityIconProps) {
  // Muestra el estado actual de visibilidad de la contraseña.
  return visible ? (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 12s3.5-8 9-8 9 8 9 8-3.5 8-9 8-9-8-9-8z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8M9.9 4.2A10.8 10.8 0 0112 4c5.5 0 9 5 9 8a10.8 10.8 0 01-2.1 3.7M6.2 6.2C4.1 7.7 3 10 3 12c0 3 3.5 8 9 8a10 10 0 004.1-.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default PasswordVisibilityIcon;