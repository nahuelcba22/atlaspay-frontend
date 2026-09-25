import './RecentActivity.css';

function RecentActivity() {
  return (
    <section className="recent-activity">
      <h2 className="recent-activity__title">Actividad reciente</h2>

      <div className="recent-activity__empty">
        <p>Todavía no hay movimientos.</p>
        <span>Tus operaciones recientes aparecerán acá.</span>
      </div>
    </section>
  );
}

export default RecentActivity;
