import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Operations from './pages/Operations/Operations';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <BrowserRouter>
      {/* Define las rutas públicas y privadas de la aplicación. */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/operaciones"
          element={
            <ProtectedRoute>
              <Operations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
