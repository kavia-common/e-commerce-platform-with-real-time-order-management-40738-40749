import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, setAuthToken } from '../services/apiClient';
import { storeToken } from '../services/auth';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login page to authenticate user and set bearer token on API client. */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      const { token } = await apiLogin(email, password);
      if (!token) {
        throw new Error('Invalid token response');
      }
      // Set axios header and persist
      setAuthToken(token);
      storeToken(token);
      navigate('/orders', { replace: true });
    } catch (err) {
      // Avoid leaking sensitive details
      const detail = err?.response?.data?.detail || 'Login failed';
      setError(detail);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} aria-label="Login form" style={{ maxWidth: 360 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <label>
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              placeholder="you@example.com"
              style={{ width: '100%', padding: 8 }}
              autoComplete="username"
            />
          </label>
          <label>
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              placeholder="••••••••"
              style={{ width: '100%', padding: 8 }}
              autoComplete="current-password"
            />
          </label>
          <button className="theme-toggle" type="submit" disabled={busy} aria-busy={busy}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
          {error && <div role="alert" style={{ color: '#EF4444' }}>{error}</div>}
        </div>
      </form>
    </div>
  );
}
