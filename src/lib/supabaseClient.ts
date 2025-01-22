import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabasekeyMotoristas = process.env.NEXT_PUBLIC_SUPABASE_KEY_MOTORISTAS!;
const supabasekeyVeiculos = process.env.NEXT_PUBLIC_SUPABASE_KEY_VEICULOS!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL e Key são obrigatórios.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);