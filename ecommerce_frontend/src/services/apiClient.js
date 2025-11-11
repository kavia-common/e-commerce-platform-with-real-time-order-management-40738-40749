import axios from 'axios';

/**
 * Axios API client configured with backend base URL.
 * Reads REACT_APP_BACKEND_URL from environment; defaults to empty string which makes requests relative.
 */
const baseURL = process.env.REACT_APP_BACKEND_URL || '';

export const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// PUBLIC_INTERFACE
export function setAuthToken(token) {
  /** Set or clear Authorization bearer token on the API client. */
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }
}

// PUBLIC_INTERFACE
export async function getOrders() {
  /** Fetch list of orders for current user. */
  const { data } = await api.get('/orders');
  return data;
}

// PUBLIC_INTERFACE
export async function getOrderById(orderId) {
  /** Fetch a single order by id. */
  const { data } = await api.get(`/orders/${orderId}`);
  return data;
}

// PUBLIC_INTERFACE
export async function getReturnPolicy() {
  /** Fetch return policy list/details from backend. */
  const { data } = await api.get('/returns/policies');
  return data;
}

// PUBLIC_INTERFACE
export async function createReturn(payload) {
  /** Create a return request. */
  const { data } = await api.post('/returns', payload);
  return data;
}

// PUBLIC_INTERFACE
export async function getRecommendations() {
  /** Fetch product recommendations for current user. */
  const { data } = await api.get('/recommendations');
  return data;
}

// PUBLIC_INTERFACE
export async function login(email, password) {
  /**
   * Login to backend; backend spec returns:
   * { access_token: string, token_type: 'bearer' }
   */
  const { data } = await api.post('/auth/login', { email, password });
  // Normalize to { token } shape for callers (existing UI)
  if (data && typeof data === 'object') {
    const token = data.access_token || data.token || null;
    return { token, raw: data };
  }
  return { token: null, raw: data };
}
