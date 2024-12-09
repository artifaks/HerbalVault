import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://guafuutwjluavxwkfvbk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1YWZ1dXR3amx1YXZ4d2tmdmJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM2Njg1NTIsImV4cCI6MjA0OTI0NDU1Mn0.Ep8_FmuLebw9iB9J1cLcO1fC3VaDGtYF4W_ovHn7Rx0';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);