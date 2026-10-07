import { Link } from 'react-router-dom';
import HistoryCard from '../../components/history/HistoryCard/HistoryCard';
import '../Transfers/Transfers.css';

function History() {
  return (
    <main className="transfers">
      <Link className="transfers__back" to="/dashboard">
        ← Volver al dashboard
      </Link>

      <h1 className="transfers__title">Historial</h1>

      <HistoryCard />
    </main>
  );
}

export default History;
