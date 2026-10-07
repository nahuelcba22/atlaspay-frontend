import type { Movement } from '../../../services/historyService';
import {
  formatAmount,
  formatDateTime,
  getMovementDetail,
  getMovementTitle,
} from '../history.format';

interface HistoryItemProps {
  movement: Movement;
}

function HistoryItem({ movement }: HistoryItemProps) {
  const detail = getMovementDetail(movement);
  const isOutgoing = movement.direccion === 'ENVIADA';

  return (
    <li className="history-item">
      <div className="history-item__info">
        <p className="history-item__title">{getMovementTitle(movement)}</p>
        {detail && <span className="history-item__detail">{detail}</span>}
        {movement.motivo && <span className="history-item__detail">“{movement.motivo}”</span>}
        <span className="history-item__date">{formatDateTime(movement.fecha)}</span>
      </div>

      <div className="history-item__amounts">
        <strong className={isOutgoing ? 'history-item__out' : 'history-item__in'}>
          {isOutgoing ? '−' : '+'} {formatAmount(movement.monto, movement.moneda)}
        </strong>

        {/* En un exchange también se muestra lo que entra. */}
        {movement.monto_destino !== null && movement.moneda_destino && (
          <strong className="history-item__in">
            + {formatAmount(movement.monto_destino, movement.moneda_destino)}
          </strong>
        )}
      </div>
    </li>
  );
}

export default HistoryItem;
