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
          onClick={() => navigate('/operaciones')}
        >
          Comprar
        </button>

        <button
          className="quick-actions__button"
          type="button"
          onClick={() => navigate('/operaciones')}
        >
          Vender
        </button>

        <button
          className="quick-actions__button"
          type="button"
          onClick={() => navigate('/operaciones')}
        >
          Cambiar
        </button>
      </div>
    </section>
  );
}

export default QuickActions;
