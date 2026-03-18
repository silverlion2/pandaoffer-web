import { createClient } from '@supabase/supabase-js';

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

let _supabase = null;
function getSupabase() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      console.error('Missing SUPABASE env vars:', { url: !!url, key: !!key });
      return null;
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// ============================================================
// SEARCH
// ============================================================

async function searchByCategory(category) {
  const sb = getSupabase();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from('laihua_knowledge')
      .select('content, category, source_name, source_type')
      .eq('category', category)
      .order('created_at', { ascending: false })
      .limit(6);
    if (error) { console.error('Category search error:', error.message); return []; }
    return data || [];
  } catch (e) { console.error('Category search exception:', e.message); return []; }
}

async function searchByKeywords(query) {
  const sb = getSupabase();
  if (!sb) return [];
  const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if (keywords.length === 0) return [];
  try {
    const orConditions = keywords.map(k => `content.ilike.%${k}%`).join(',');
    const { data, error } = await sb
      .from('laihua_knowledge')
      .select('content, category, source_name, source_type')
      .or(orConditions)
      .order('created_at', { ascending: false })
      .limit(6);
    if (error) { console.error('Keyword search error:', error.message); return []; }
    return data || [];
  } catch (e) { console.error('Keyword search exception:', e.message); return []; }
}

function detectCategory(query) {
  const q = query.toLowerCase();
  if (q.match(/scholarship|csc|funding|grant|stipend|tuition waiver/)) return 'scholarships';
  if (q.match(/visa|application|jw201|jw202|passport|permit|health check/)) return 'visa';
  if (q.match(/cost|budget|living|rent|food|money|cheap|expensive|afford/)) return 'costs';
  if (q.match(/hsk|language|chinese|mandarin|test|exam|level/)) return 'language';
  if (q.match(/city|beijing|shanghai|chengdu|wuhan|guangzhou|xi'an|where.*live/)) return 'cities';
  if (q.match(/university|universities|tsinghua|peking|fudan|program|degree|rank|computer science|engineering/)) return 'universities';
  return null;
}

// ============================================================
// DEEPSEEK LLM
// ============================================================

const SYSTEM_PROMPT = `You are the Panda Offer AI Study Advisor — an expert on 来华留学 (international students studying in China).

RULES:
- Be warm, helpful, and conversational — like a friendly senior student who has been through it all.
- Use bullet points and clear structure for readability.
- Keep answers concise (150-300 words max).
- Use both English and Chinese terms where helpful (e.g., "CSC (中国政府奖学金)").
- If provided with knowledge sources, base your answer primarily on them.
- If no sources are provided, use your general knowledge about studying in China but mention that this is general advice.
- End with a brief encouraging note.`;

async function askDeepseek(query, ragContext = '') {
  const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;
  if (!DEEPSEEK_KEY) {
    console.error('No DEEPSEEK_KEY');
    return null;
  }

  let userPrompt;
  if (ragContext) {
    userPrompt = `Based on our knowledge base:\n\n${ragContext}\n\n---\n\nUser question: "${query}"\n\nProvide a helpful answer based on the sources above.`;
  } else {
    userPrompt = `User question: "${query}"\n\nProvide a helpful answer about studying in China. Note: our specialized knowledge base didn't have specific results for this query, so use your general expertise.`;
  }

  try {
    const res = await fetch(DEEPSEEK_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('Deepseek API error:', res.status, errText);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error('Deepseek fetch error:', err.message);
    return null;
  }
}

// ============================================================
// API HANDLER
// ============================================================

export async function POST(request) {
  try {
    const { query, category } = await request.json();
    
    if (!query || typeof query !== 'string') {
      return Response.json({ error: 'Query is required' }, { status: 400 });
    }

    console.log(`[advisor] Query: "${query}"`);

    const detectedCategory = category || detectCategory(query);
    let results = [];
    
    // Try category search first
    if (detectedCategory) {
      results = await searchByCategory(detectedCategory);
      console.log(`[advisor] Category "${detectedCategory}": ${results.length} results`);
    }
    
    // Keyword fallback
    if (results.length < 2) {
      const kwResults = await searchByKeywords(query);
      console.log(`[advisor] Keyword fallback: ${kwResults.length} results`);
      const seen = new Set(results.map(r => r.content.substring(0, 50)));
      for (const r of kwResults) {
        if (!seen.has(r.content.substring(0, 50))) results.push(r);
      }
    }

    // Build RAG context from results
    const ragContext = results
      .filter(r => r.source_type === 'seed')
      .slice(0, 5)
      .map((r, i) => `[Source ${i + 1}: ${r.source_name} | ${r.category}]\n${r.content}`)
      .join('\n\n---\n\n');

    const sources = [...new Set(
      results.filter(r => r.source_type === 'seed').map(r => r.source_name)
    )];

    // Always ask Deepseek — with RAG context if available, without if not
    let answer = await askDeepseek(query, ragContext);
    
    if (!answer) {
      // If Deepseek also fails, give a helpful fallback
      answer = results.length > 0
        ? results.slice(0, 3).map(r => `• ${r.content.substring(0, 200)}`).join('\n\n')
        : "Our AI advisor is temporarily unavailable. Please try again shortly, or explore our other tools like the Document Wizard, ROI Calculator, or City Comparator for help with your study-in-China journey!";
    }

    console.log(`[advisor] Answer length: ${answer.length}, sources: ${sources.length}`);

    return Response.json({ answer, sources, resultCount: results.length });
  } catch (err) {
    console.error('Advisor API error:', err);
    return Response.json({ 
      answer: "Something went wrong. Please try again!",
      sources: [], 
      resultCount: 0 
    });
  }
}
