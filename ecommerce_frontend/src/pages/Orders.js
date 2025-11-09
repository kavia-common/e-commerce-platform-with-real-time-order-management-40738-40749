import React, { useEffect, useState } from 'react';
import { getOrders } from '../services/apiClient';
import { getSupabase } from '../services/supabaseClient';

// PUBLIC_INTERFACE
export default function Orders() {
  /** Orders page lists user orders and subscribes to realtime changes if Supabase configured. */
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | error
  const [error, setError] = useState('');

  useEffect(() => {
    let channel = null;
    async function load() {
      try {
        setStatus('loading');
        const data = await getOrders();
        setOrders(Array.isArray(data) ? data : data?.orders || []);
        setStatus('idle');
      } catch (err) {
        setError(err?.response?.data?.detail || 'Failed to load orders');
        setStatus('error');
      }
    }

    load();

    // Optional realtime via Supabase
    const supabase = getSupabase();
    if (supabase) {
      channel = supabase.channel('orders_changes')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'orders' },
          (payload) => {
            // Simplified handler: re-fetch on any change
            load();
          }
        )
        .subscribe();
    }
    return () => {
      if (channel && getSupabase()) {
        getSupabase().removeChannel(channel);
      }
    };
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      {status === 'loading' && <p>Loading orders…</p>}
      {status === 'error' && <p role="alert" style={{ color: '#EF4444' }}>{error}</p>}
      {!orders?.length && status === 'idle' && <p>No orders to display.</p>}
      <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 12 }}>
        {orders.map((o) => (
          <li key={o.id} style={{ border: '1px solid var(--border-color)', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong>Order #{o.id}</strong>
              <span>Status: {o.status}</span>
            </div>
            <div>Total: {o.total ? `$${o.total}` : '-'}</div>
            <div>Updated: {o.updated_at || o.updatedAt || '-'}</div>
          </li>
        ))}
      </ul>
      {!getSupabase() && (
        <p style={{ marginTop: 12, color: '#64748b' }}>
          Realtime is disabled. Provide REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY to enable it.
        </p>
      )}
    </div>
  );
}
