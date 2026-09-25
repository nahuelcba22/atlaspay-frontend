import './QuickActions.css';

function QuickActions() {
  return (
    <section className="quick-actions">
      <h2 className="quick-actions__title">Operaciones</h2>

      <div className="quick-actions__buttons">
        <button className="quick-actions__button" type="button">
          Comprar
        </button>

        <button className="quick-actions__button" type="button">
          Vender
        </button>

        <button className="quick-actions__button" type="button">
          Cambiar
        </button>
      </div>
    </section>
  );
}

export default QuickActions;
