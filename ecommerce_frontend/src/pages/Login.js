import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, setAuthToken } from '../services/apiClient';

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
      setAuthToken(token);
      localStorage.setItem('auth_token', token);
      navigate('/orders');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Login failed');
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
