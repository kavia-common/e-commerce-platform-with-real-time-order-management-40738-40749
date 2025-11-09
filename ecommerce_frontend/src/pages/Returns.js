import React, { useEffect, useState } from 'react';
import { createReturn, getReturnPolicy } from '../services/apiClient';

// PUBLIC_INTERFACE
export default function Returns() {
  /** Returns page shows policy and allows creating a return request. */
  const [policy, setPolicy] = useState('');
  const [form, setForm] = useState({ orderId: '', reason: '', items: '' });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getReturnPolicy();
        setPolicy(data?.policy || data?.text || JSON.stringify(data));
      } catch {
        setPolicy('Standard 30-day return policy applies. Items must be in original condition.');
      }
    })();
  }, []);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    setErr('');
    try {
      const payload = {
        order_id: form.orderId,
        reason: form.reason,
        items: form.items
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      };
      const res = await createReturn(payload);
      setMessage(res?.message || 'Return request submitted successfully.');
      setForm({ orderId: '', reason: '', items: '' });
    } catch (error) {
      setErr(error?.response?.data?.detail || 'Failed to submit return.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <h2>Returns</h2>
      <section aria-label="Return policy" style={{ marginBottom: 16 }}>
        <h3>Policy</h3>
        <div style={{ whiteSpace: 'pre-wrap', background: 'var(--bg-secondary)', padding: 12, borderRadius: 8 }}>
          {policy}
        </div>
      </section>

      <section aria-label="Create return">
        <h3>Create Return</h3>
        <form onSubmit={submit} style={{ maxWidth: 480, display: 'grid', gap: 12 }}>
          <label>
            Order ID
            <input
              value={form.orderId}
              onChange={(e) => setForm((f) => ({ ...f, orderId: e.target.value }))}
              required
              placeholder="e.g., 12345"
              style={{ width: '100%', padding: 8 }}
            />
          </label>

          <label>
            Reason
            <input
              value={form.reason}
              onChange={(e) => setForm((f) => ({ ...f, reason: e.target.value }))}
              required
              placeholder="Reason for return"
              style={{ width: '100%', padding: 8 }}
            />
          </label>

          <label>
            Items (comma-separated SKUs)
            <input
              value={form.items}
              onChange={(e) => setForm((f) => ({ ...f, items: e.target.value }))}
              placeholder="SKU123, SKU456"
              style={{ width: '100%', padding: 8 }}
            />
          </label>

          <button className="theme-toggle" type="submit" disabled={busy}>
            {busy ? 'Submitting…' : 'Submit Return'}
          </button>

          {message && <div role="status" style={{ color: '#06b6d4' }}>{message}</div>}
          {err && <div role="alert" style={{ color: '#EF4444' }}>{err}</div>}
        </form>
      </section>
    </div>
  );
}
