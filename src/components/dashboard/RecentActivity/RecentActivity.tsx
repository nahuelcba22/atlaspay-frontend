import { Link } from 'react-router-dom';
import type { Transfer } from '../../../services/transferService';
import './RecentActivity.css';

interface RecentActivityProps {
  transfers: Transfer[];
}

function RecentActivity({ transfers }: RecentActivityProps) {
  return (
    <section className="recent-activity">
      <h2 className="recent-activity__title">Actividad reciente</h2>

      {/* Toda la card lleva al historial completo. */}
      <Link className="recent-activity__card" to="/historial">
        {transfers.length === 0 ? (
          <div className="recent-activity__empty">
            <p>Todavía no hay movimientos.</p>
            <span>Tus operaciones recientes aparecerán aquí.</span>
          </div>
        ) : (
          <div className="recent-activity__list">
            {transfers.slice(0, 5).map((transfer) => (
              <article className="recent-activity__item" key={transfer.id}>
                <div>
                  <p className="recent-activity__reason">{transfer.motivo}</p>
                  <span className="recent-activity__date">
                    {new Date(transfer.fecha).toLocaleDateString('es-AR')}
                  </span>
                </div>

                <strong className="recent-activity__amount">
                  {Number(transfer.monto).toLocaleString('es-AR', {
                    style: 'currency',
                    currency: transfer.moneda,
                  })}
                </strong>
              </article>
            ))}
          </div>
        )}

        <span className="recent-activity__more">Ver historial completo →</span>
      </Link>
    </section>
  );
}

export default RecentActivity;
