import type { Movement, MovementDirection, MovementType } from '../../services/historyService';

export const TYPE_LABELS: Record<MovementType, string> = {
  TRANSFERENCIA: 'Transferencia',
  CAMBIO: 'Cambio',
  COMPRA: 'Compra',
  VENTA: 'Venta',
};

export const DIRECTION_LABELS: Record<MovementDirection, string> = {
  ENVIADA: 'Enviadas',
  RECIBIDA: 'Recibidas',
};

export function formatAmount(value: number, currency: string): string {
  return value.toLocaleString('es-AR', { style: 'currency', currency });
}

// Fecha y hora en la zona horaria del usuario.
export function formatDateTime(date: string): string {
  return new Date(date).toLocaleString('es-AR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

// Título principal: qué tipo de movimiento es.
export function getMovementTitle(movement: Movement): string {
  if (movement.tipo === 'TRANSFERENCIA') {
    return movement.direccion === 'ENVIADA' ? 'Transferencia enviada' : 'Transferencia recibida';
  }

  const label = TYPE_LABELS[movement.tipo];

  return movement.moneda_destino
    ? `${label} ${movement.moneda} → ${movement.moneda_destino}`
    : `${label} de ${movement.moneda}`;
}

// Detalle: con quién fue la transferencia o a qué tasa se hizo el cambio.
export function getMovementDetail(movement: Movement): string {
  const { contraparte } = movement;

  if (movement.tipo === 'TRANSFERENCIA') {
    if (!contraparte) return '';

    const prefix = movement.direccion === 'ENVIADA' ? 'Para' : 'De';
    return `${prefix} ${contraparte.nombre} (${contraparte.alias})`;
  }

  if (movement.tasa && movement.moneda_destino) {
    return `Tasa: 1 ${movement.moneda} = ${movement.tasa} ${movement.moneda_destino}`;
  }

  // Exchanges viejos: el backend no guardaba destino ni tasa.
  return 'Sin detalle de tasa';
}
