/** @format */

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://uxrtzmfqjjnzxqwxvwjm.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4cnR6bWZxampuenhxd3h2d2ptIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcwMzM4NjQsImV4cCI6MjAxMjYwOTg2NH0.E4RKUlRoOD67cjX6aRwitvAKbBAPtZZPafKFdxAF4Ec';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
