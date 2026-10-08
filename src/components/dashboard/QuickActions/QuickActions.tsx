import { useNavigate } from 'react-router-dom';
import './QuickActions.css';

function QuickActions() {
  const navigate = useNavigate();

  return (
    <section className="quick-actions">
      <h2 className="quick-actions__title">Operaciones</h2>

      <div className="quick-actions__buttons">
        <button
          className="quick-actions__button"
          type="button"
          onClick={() => navigate('/operaciones?tipo=comprar')}
        >
          Comprar
        </button>

        <button
          className="quick-actions__button"
          type="button"
          onClick={() => navigate('/operaciones?tipo=vender')}
        >
          Vender
        </button>

        <button
          className="quick-actions__button"
          type="button"
          onClick={() => navigate('/operaciones?tipo=cambiar')}
        >
          Cambiar
        </button>

        <button
          className="quick-actions__button"
          type="button"
          onClick={() => navigate('/transferencias')}
        >
          Transferir
        </button>
      </div>
    </section>
  );
}

export default QuickActions;