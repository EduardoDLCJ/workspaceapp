import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Navbar from './components/navbar';
import Dashboard from './dashboard/dashboard';
import Entornos from './ventanas/entornos';
import Respaldos from './ventanas/respaldos';
import CrudUsuarios from './ventanas/crud';
import ProtectedRoute from './middleware/auth';
import Entorno from './Entorno';
import Recuperar from './ventanas/recuperar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/recuperar" element={<Recuperar />} />
        
        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute allowedRoles={['user']} />}>
          <Route path="/entornos" element={<Entornos />} />
          <Route path="/entorno" element={<Entorno />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/respaldos" element={<Respaldos />} />
          <Route path="/crud" element={<CrudUsuarios />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
