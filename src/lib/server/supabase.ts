import { createClient } from '@supabase/supabase-js';
import { getSecret } from 'astro:env/server';

export function getSupabaseAdmin() {
  const supabaseUrl = getSecret('SUPABASE_URL');
  const supabaseServiceRoleKey = getSecret('SUPABASE_SERVICE_ROLE_KEY');

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase server environment variables.');
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getWhatsappNumber() {
  return getSecret('WHATSAPP_NUMBER') ?? '';
}
