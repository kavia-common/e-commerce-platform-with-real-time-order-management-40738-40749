import React, { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Returns from './pages/Returns';
import Recommendations from './pages/Recommendations';
import { setAuthToken } from './services/apiClient';
import { getStoredToken, installAuthInterceptor, isAuthenticated, clearToken } from './services/auth';

// Simple protected route wrapper ensuring only authenticated users can access
function ProtectedRoute({ children }) {
  const authed = isAuthenticated();
  // eslint-disable-next-line no-console
  console.debug('[AUTH] ProtectedRoute check =>', authed);
  if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function Logout() {
  /** Clear session and redirect to login. */
  const navigate = useNavigate();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.debug('[AUTH] Logging out: clearing token and navigating to /login');
    clearToken();
    navigate('/login', { replace: true });
  }, [navigate]);
  return null;
}

// PUBLIC_INTERFACE
function App() {
  /** Root app sets theme and bootstraps auth token from localStorage. */
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const token = getStoredToken();
    if (token) setAuthToken(token);
    // Install global 401 handler once app starts
    installAuthInterceptor(navigate);
    // eslint-disable-next-line no-console
    console.debug('[BOOT] App mounted. Token exists?', Boolean(token));
  }, [navigate]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 1000, // keep above content
          pointerEvents: 'auto', // only the button should receive clicks
        }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/returns"
            element={
              <ProtectedRoute>
                <Returns />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recommendations"
            element={
              <ProtectedRoute>
                <Recommendations />
              </ProtectedRoute>
            }
          />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Layout>
    </>
  );
}

// Wrap App with BrowserRouter at index.js so useNavigate works here.

export default App;
