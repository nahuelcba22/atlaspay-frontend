import { Link } from 'react-router-dom';
import ExchangeForm from '../../components/operations/ExchangeForm/ExchangeForm';
import './Operations.css';

function Operations() {
  return (
    <main className="operations">
      <Link className="operations__back" to="/dashboard">
        ← Volver al dashboard
      </Link>

      <h1 className="operations__title">Operaciones</h1>

      <ExchangeForm />
    </main>
  );
}

export default Operations;
