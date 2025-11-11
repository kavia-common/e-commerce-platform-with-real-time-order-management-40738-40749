import { api, setAuthToken } from './apiClient';

/**
 * Token is stored in localStorage under 'auth_token'.
 * Backend returns { access_token, token_type }, per OpenAPI.
 * We normalize to a raw JWT string for Authorization header.
 */

// PUBLIC_INTERFACE
export function getStoredToken() {
  /** Return token string from storage or null. */
  try {
    const token = localStorage.getItem('auth_token');
    // eslint-disable-next-line no-console
    console.debug('[AUTH] getStoredToken ->', token ? 'present' : 'absent');
    return token || null;
  } catch {
    return null;
  }
}

// PUBLIC_INTERFACE
export function storeToken(token) {
  /** Persist token to storage and set axios default Authorization header. */
  if (!token || typeof token !== 'string') return;
  localStorage.setItem('auth_token', token);
  setAuthToken(token);
  // eslint-disable-next-line no-console
  console.debug('[AUTH] storeToken -> token saved');
}

// PUBLIC_INTERFACE
export function clearToken() {
  /** Clear token from storage and axios defaults. */
  try {
    localStorage.removeItem('auth_token');
  } catch {
    // ignore
  }
  setAuthToken(null);
  // eslint-disable-next-line no-console
  console.debug('[AUTH] clearToken -> token cleared');
}

// PUBLIC_INTERFACE
export function isAuthenticated() {
  /** Basic check for token presence. Expiry validation can be added if required. */
  return Boolean(getStoredToken());
}

/**
 * Install a single axios response interceptor to catch 401s and auto-logout.
 * This avoids perpetual "Not authenticated" UI by redirecting to login.
 */
let interceptorInstalled = false;

// PUBLIC_INTERFACE
export function installAuthInterceptor(navigate) {
  /**
   * Install a global axios interceptor that:
   * - Redirects to /login when receiving 401 from protected endpoints
   * - Clears invalid/expired tokens securely
   */
  if (interceptorInstalled) return;
  interceptorInstalled = true;

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const status = error?.response?.status;
      if (status === 401) {
        // eslint-disable-next-line no-console
        console.debug('[AUTH] 401 received, clearing token and redirecting to /login');
        clearToken();
        if (typeof navigate === 'function') {
          navigate('/login', { replace: true });
        }
      }
      return Promise.reject(error);
    }
  );
}
