import { createBrowserClient } from '@supabase/ssr';

let client = null;

export function createClient() {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Return a no-op client during build/SSR when env vars aren't available
    return {
      auth: {
        getUser: async () => ({ data: { user: null } }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signOut: async () => ({}),
        signUp: async () => ({}),
        signInWithPassword: async () => ({}),
        resetPasswordForEmail: async () => ({}),
        updateUser: async () => ({}),
      },
      from: () => ({
        select: () => ({ eq: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null }), single: async () => ({ data: null }), order: () => ({ limit: async () => ({ data: [] }) }) }), order: () => ({ limit: async () => ({ data: [] }) }), single: async () => ({ data: null }) }), data: [], count: 0 }),
        insert: async () => ({ error: null }),
        update: () => ({ eq: async () => ({ error: null }) }),
        delete: () => ({ eq: async () => ({ error: null }) }),
        upsert: async () => ({ error: null }),
      }),
    };
  }

  client = createBrowserClient(url, key);
  return client;
}
