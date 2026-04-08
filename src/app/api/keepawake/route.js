import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Missing Supabase credentials' }, { status: 500 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Ping the Supabase REST API to reset the 7-day inactivity timer.
    // Querying a non-existent table is enough to hit the postgrest instance
    // and keep the project active on the free tier.
    const { data, error } = await supabase.from('_keepalive_ping_').select('*').limit(1);

    return NextResponse.json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      message: 'Supabase jolted successfully' 
    });
  } catch (err) {
    return NextResponse.json({ error: err?.message || 'Unknown error occurred' }, { status: 500 });
  }
}
