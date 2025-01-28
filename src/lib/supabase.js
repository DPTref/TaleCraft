import { createClient } from '@supabase/supabase-js'

// Ensure these values are correct
const supabaseUrl = 'https://gzxtuxkxwhcsjmsfcqkk.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6eHR1eGt4d2hjc2ptc2ZjcWtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4MDA4NTAsImV4cCI6MjA1MzM3Njg1MH0.pwMxL-IwUWCaaFp7q2lNzt-rS2ALYdtjPslVrg3w_kw' // Replace with your actual anon key

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase URL or Anon Key')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
