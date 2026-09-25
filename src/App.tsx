import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import Operations from './pages/Operations/Operations';
import Register from './pages/Register/Register';

function App() {
  return (
    <BrowserRouter>
      {/* Define las rutas públicas y privadas de la aplicación. */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Temporalmente pública para probar sin backend. Luego va dentro de ProtectedRoute. */}
        <Route path="/operaciones" element={<Operations />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;