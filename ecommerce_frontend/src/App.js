import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Returns from './pages/Returns';
import Recommendations from './pages/Recommendations';
import { setAuthToken } from './services/apiClient';

// PUBLIC_INTERFACE
function App() {
  /** Root app sets theme and bootstraps auth token from localStorage. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) setAuthToken(token);
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <BrowserRouter>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        style={{ position: 'fixed', top: 20, right: 20, zIndex: 50 }}
      >
        {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
      </button>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/orders" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
