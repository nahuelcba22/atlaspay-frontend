import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './BackLink.css';

interface BackLinkProps {
  to?: string;
  children?: ReactNode;
}

// Enlace para volver a la página anterior. Por defecto lleva a la billetera.
function BackLink({ to = '/dashboard', children = 'Regresar a mi billetera' }: BackLinkProps) {
  return (
    <Link className="back-link" to={to}>
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M13 8H3M7 4 3 8l4 4"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{children}</span>
    </Link>
  );
}

export default BackLink;
