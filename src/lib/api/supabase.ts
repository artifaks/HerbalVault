import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase credentials. Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
}

// Make sure the URL is valid before creating the client
try {
  new URL(supabaseUrl);
} catch (error) {
  throw new Error(
    `Invalid Supabase URL: ${supabaseUrl}. Please check your VITE_SUPABASE_URL in .env file.`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
