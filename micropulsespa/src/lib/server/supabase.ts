import { createClient } from '@supabase/supabase-js';
import { getSecret } from 'astro:env/server';

function readServerEnv(name: string) {
  const nodeEnv = (globalThis as typeof globalThis & {
    process?: {
      env?: Record<string, string | undefined>;
    };
  }).process?.env?.[name];

  return nodeEnv ?? getSecret(name);
}

export function getSupabaseAdmin() {
  const supabaseUrl = readServerEnv('SUPABASE_URL');
  const supabaseServiceRoleKey = readServerEnv('SUPABASE_SERVICE_ROLE_KEY');

  const missingVariables: string[] = [];

  if (!supabaseUrl) {
    missingVariables.push('SUPABASE_URL');
  }

  if (!supabaseServiceRoleKey) {
    missingVariables.push('SUPABASE_SERVICE_ROLE_KEY');
  }

  if (missingVariables.length > 0) {
    throw new Error(
      `Missing Supabase server environment variables: ${missingVariables.join(', ')}`
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export function getWhatsappNumber() {
  return readServerEnv('WHATSAPP_NUMBER') ?? '';
}
