import { createClient } from '@supabase/supabase-js';

import { Database } from '@/schema';

export function getServiceSupabase() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_KEY as string
  );
}
