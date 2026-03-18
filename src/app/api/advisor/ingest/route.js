import { createClient } from '@supabase/supabase-js';

// POST /api/advisor/ingest — bulk insert knowledge chunks
// Protected by a simple secret key
export async function POST(request) {
  try {
    const { chunks, secret } = await request.json();
    
    // Simple auth
    if (secret !== process.env.DEEPSEEK_KEY) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!chunks || !Array.isArray(chunks) || chunks.length === 0) {
      return Response.json({ error: 'chunks array required' }, { status: 400 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    let inserted = 0;
    let errors = [];

    for (const chunk of chunks) {
      const { content, category, source_name, source_type, language, metadata } = chunk;
      
      if (!content || !category || !source_name) {
        errors.push(`Missing fields in chunk: ${JSON.stringify(chunk).substring(0, 100)}`);
        continue;
      }

      // Use the RPC insert function (SECURITY DEFINER bypasses RLS)
      const { error } = await supabase.rpc('insert_laihua_knowledge', {
        p_content: content,
        p_embedding: new Array(384).fill(0), // placeholder — will be replaced with real embeddings later
        p_category: category,
        p_source_type: source_type || 'seed',
        p_source_name: source_name,
        p_language: language || 'en',
        p_metadata: metadata || {},
      });

      if (error) {
        errors.push(`Insert error: ${error.message}`);
      } else {
        inserted++;
      }
    }

    return Response.json({ 
      inserted, 
      total: chunks.length, 
      errors: errors.length > 0 ? errors : undefined 
    });
  } catch (err) {
    console.error('Ingest API error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
