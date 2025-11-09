import React, { useEffect, useState } from 'react';
import { getRecommendations } from '../services/apiClient';

// PUBLIC_INTERFACE
export default function Recommendations() {
  /** Recommendations page shows a simple grid of recommended products. */
  const [recs, setRecs] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setStatus('loading');
        const data = await getRecommendations();
        setRecs(Array.isArray(data) ? data : data?.recommendations || []);
        setStatus('idle');
      } catch (err) {
        setError(err?.response?.data?.detail || 'Failed to load recommendations');
        setStatus('error');
      }
    })();
  }, []);

  return (
    <div>
      <h2>Recommendations</h2>
      {status === 'loading' && <p>Loading…</p>}
      {status === 'error' && <p role="alert" style={{ color: '#EF4444' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
        {recs.map((p, idx) => (
          <div key={p.id || idx} style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 12 }}>
            <strong>{p.title || p.name || `Product ${idx + 1}`}</strong>
            <div>{p.description || 'Recommended for you'}</div>
            {p.price != null && <div style={{ marginTop: 8 }}>${p.price}</div>}
            <button className="theme-toggle" style={{ marginTop: 8 }}>View</button>
          </div>
        ))}
      </div>
      {!recs?.length && status === 'idle' && <p>No recommendations available.</p>}
    </div>
  );
}
