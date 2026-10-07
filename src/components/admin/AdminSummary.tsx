interface AdminSummaryProps {
  transfersTotal: number;
  exchangesTotal: number;
}

const AdminSummary = ({
  transfersTotal,
  exchangesTotal,
}: AdminSummaryProps) => {
  return (
    <section className="admin-summary">
      <article className="admin-summary__card">
        <span className="admin-summary__label">Transferencias</span>
        <strong className="admin-summary__value">{transfersTotal}</strong>
        <span className="admin-summary__description">Operaciones registradas</span>
      </article>

      <article className="admin-summary__card">
        <span className="admin-summary__label">Conversiones</span>
        <strong className="admin-summary__value">{exchangesTotal}</strong>
        <span className="admin-summary__description">Cambios de moneda realizados</span>
      </article>
    </section>
  );
};

export default AdminSummary;