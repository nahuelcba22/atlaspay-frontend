import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { removeToken } from '../../services/authStorage';
import {
  getProfile,
  type UserProfile,
} from '../../services/profileService';
import './Profile.css';

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

  if (error) return <p className="profile__message">{error}</p>;
  if (!profile) return <p className="profile__message">Cargando perfil...</p>;

  return (
    <main className="profile">
      <section className="profile__card">
        <Link className="profile__back" to="/dashboard">
          ← Volver al dashboard
        </Link>

        <div className="profile__header">
          <div className="profile__avatar">👤</div>
          <h1>{profile.usuario.nombre}</h1>
          <p>{profile.usuario.email}</p>
        </div>

        <div className="profile__section">
          <h2>Datos personales</h2>
          <p><strong>ID:</strong> {profile.usuario.id}</p>
          <p><strong>Email:</strong> {profile.usuario.email}</p>
        </div>

        <div className="profile__section">
          <h2>Datos de la cuenta</h2>
          <p><strong>CVU:</strong> {profile.cuenta.cvu}</p>
          <p><strong>Alias:</strong> {profile.cuenta.alias}</p>
          <p><strong>Estado:</strong> {profile.cuenta.estado}</p>
        </div>

        <button className="profile__logout" type="button" onClick={handleLogout}>
          Cerrar sesión
        </button>
      </section>
    </main>
  );
}

export default Profile;