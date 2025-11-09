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
  /** Fetch return policy text/details. */
  const { data } = await api.get('/returns/policy');
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
  /** Mocked login to backend; expects token in response. */
  const { data } = await api.post('/auth/login', { email, password });
  return data;
}
