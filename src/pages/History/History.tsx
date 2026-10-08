import BackLink from '../../components/layout/BackLink/BackLink';
import HistoryCard from '../../components/history/HistoryCard/HistoryCard';
import '../Transfers/Transfers.css';

function History() {
  return (
    <main className="transfers">
      <BackLink />

      <h1 className="transfers__title">Historial</h1>

      <HistoryCard />
    </main>
  );
}

export default History;
