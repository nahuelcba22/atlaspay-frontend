import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackLink from '../../components/layout/BackLink/BackLink';
import { removeToken } from '../../services/authStorage';
import { getProfile, type UserProfile } from '../../services/profileService';
import { formatCurrency } from '../../utils/currency';
import { CURRENCIES } from '../../utils/exchange';
import './Profile.css';

interface CopyFieldProps {
  label: string;
  value: string;
}

// Muestra un dato con un botón para copiarlo al portapapeles.
function CopyField({ label, value }: CopyFieldProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Si el navegador no permite copiar, el dato sigue visible para copiarlo a mano.
    }
  }

  return (
    <div className="profile__field">
      <div className="profile__field-text">
        <span className="profile__field-label">{label}</span>
        <span className="profile__field-value">{value}</span>
      </div>

      <button
        className="profile__copy"
        type="button"
        onClick={handleCopy}
        aria-label={`Copiar ${label}`}
      >
        {copied ? 'Copiado ✓' : 'Copiar'}
      </button>
    </div>
  );
}

function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getProfile()
      .then(setProfile)
      .catch(() => setError('No se pudo cargar el perfil.'));
  }, []);

  const handleLogout = () => {
    removeToken();
    navigate('/login', { replace: true });
  };

  if (error) {
    return (
      <main className="profile">
        <p className="profile__message">{error}</p>
      </main>
    );
  }

  if (!profile) {
    return (
      <main className="profile">
        <p className="profile__message">Cargando perfil...</p>
      </main>
    );
  }

  const { usuario, cuenta } = profile;
  const initial = usuario.nombre.trim().charAt(0).toUpperCase() || 'A';
  const isActive = cuenta.estado.toLowerCase() === 'activa';

  return (
    <main className="profile">
      <div className="profile__container">
        <BackLink />

        <section className="profile__hero">
          <div className="profile__banner" aria-hidden="true" />

          <div className="profile__identity">
            <div className="profile__avatar" aria-hidden="true">
              {initial}
            </div>

            <div className="profile__who">
              <h1>{usuario.nombre}</h1>
              <p>{usuario.email}</p>
            </div>

            <span className={`profile__status${isActive ? ' profile__status--active' : ''}`}>
              Cuenta {cuenta.estado}
            </span>
          </div>
        </section>

        <div className="profile__grid">
          <section className="profile__panel">
            <h2>Datos de tu cuenta</h2>
            <p className="profile__hint">Compártelos para recibir transferencias.</p>

            <CopyField label="CVU" value={cuenta.cvu} />
            <CopyField label="Alias" value={cuenta.alias} />
          </section>

          <section className="profile__panel">
            <h2>Resumen de saldos</h2>
            <p className="profile__hint">Lo que tienes hoy en cada moneda.</p>

            <ul className="profile__balances">
              {CURRENCIES.map((currency) => (
                <li key={currency} className="profile__balance">
                  <span className="profile__balance-code">{currency}</span>
                  <span className="profile__balance-amount">
                    {formatCurrency(cuenta.saldos[currency], currency)}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <section className="profile__panel">
            <h2>Datos personales</h2>

            <dl className="profile__details">
              <div>
                <dt>Nombre</dt>
                <dd>{usuario.nombre}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{usuario.email}</dd>
              </div>
              <div>
                <dt>ID de usuario</dt>
                <dd className="profile__muted">{usuario.id}</dd>
              </div>
            </dl>
          </section>

          <section className="profile__panel profile__panel--session">
            <h2>Sesión</h2>
            <p className="profile__hint">
              Cierra tu sesión en este dispositivo cuando termines, sobre todo si no es tuyo.
            </p>

            <button className="profile__logout" type="button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;
