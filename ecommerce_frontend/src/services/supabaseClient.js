import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client if env vars are present.
 * Requires:
 * - REACT_APP_SUPABASE_URL
 * - REACT_APP_SUPABASE_ANON_KEY
 */
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

let supabase = null;

if (SUPABASE_URL && SUPABASE_ANON_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
    realtime: {
      params: {
        eventsPerSecond: 3,
      },
    },
  });
}

/**
 * Get the Supabase client or null if not configured.
 */
// PUBLIC_INTERFACE
export function getSupabase() {
  /** Returns Supabase client instance or null if not configured. */
  return supabase;
}
