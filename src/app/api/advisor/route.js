import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;
const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

// ============================================================
// SEARCH — category-first with keyword fallback
// ============================================================

async function searchByCategory(category) {
  const { data, error } = await supabase
    .from('laihua_knowledge')
    .select('content, category, source_name, source_type')
    .eq('category', category)
    .order('created_at', { ascending: false })
    .limit(8);
  if (error) { console.error('Supabase category error:', error.message); return []; }
  return data || [];
}

async function searchByKeywords(query) {
  const keywords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  if (keywords.length === 0) return [];

  const orConditions = keywords.map(k => `content.ilike.%${k}%`).join(',');
  const { data, error } = await supabase
    .from('laihua_knowledge')
    .select('content, category, source_name, source_type')
    .or(orConditions)
    .order('created_at', { ascending: false })
    .limit(8);
  if (error) { console.error('Supabase keyword search error:', error); return []; }
  return data || [];
}

function detectCategory(query) {
  const q = query.toLowerCase();
  if (q.match(/scholarship|csc|funding|grant|stipend|tuition waiver/)) return 'scholarships';
  if (q.match(/visa|application|jw201|jw202|passport|permit|health check/)) return 'visa';
  if (q.match(/cost|budget|living|rent|food|money|cheap|expensive|afford/)) return 'costs';
  if (q.match(/hsk|language|chinese|mandarin|test|exam|level/)) return 'language';
  if (q.match(/city|beijing|shanghai|chengdu|wuhan|guangzhou|xi'an|where.*live/)) return 'cities';
  if (q.match(/university|universities|tsinghua|peking|fudan|program|degree|rank/)) return 'universities';
  return null;
}

// ============================================================
// DEEPSEEK LLM — compose natural answer from RAG chunks
// ============================================================

async function askDeepseek(query, ragChunks) {
  if (!DEEPSEEK_KEY) {
    console.error('No DEEPSEEK_KEY set');
    return null;
  }

  // Build context from RAG chunks — only seed/relevant content
  const context = ragChunks
    .filter(r => r.source_type === 'seed' || r.content.toLowerCase().includes(query.toLowerCase().split(' ')[0]))
    .slice(0, 5)
    .map((r, i) => `[Source ${i + 1}: ${r.source_name} | ${r.category}]\n${r.content}`)
    .join('\n\n---\n\n');

  if (!context.trim()) return null;

  const systemPrompt = `You are the Panda Offer AI Study Advisor — an expert on 来华留学 (international students studying in China).

RULES:
- Answer ONLY based on the knowledge sources provided below. Do NOT make up information.
- Be warm, helpful, and conversational — like a friendly senior student who has been through it all.
- Use bullet points and clear structure for readability.
- If the sources don't fully cover the question, say what you know and suggest where to learn more.
- Keep answers concise (150-300 words max).
- Use both English terms and Chinese terms where helpful (e.g., "CSC (中国政府奖学金)").
- End with a brief encouraging note.`;

  const userPrompt = `Based on these knowledge sources:

${context}

---

User question: "${query}"

Please provide a helpful, well-structured answer.`;

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
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!res.ok) {
      console.error('Deepseek error:', res.status, await res.text());
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch (err) {
    console.error('Deepseek fetch error:', err);
    return null;
  }
}

// ============================================================
// FALLBACK — clean bullet-point answer without LLM
// ============================================================

function composeFallbackAnswer(query, results) {
  if (!results || results.length === 0) {
    return "I don't have specific information about that yet. Try asking about scholarships, visas, costs, universities, HSK requirements, or student cities in China.";
  }

  const lines = results
    .filter(r => r.source_type === 'seed')
    .slice(0, 3)
    .flatMap(r => r.content.split(/[.!?\n]+/).filter(l => l.trim().length > 20 && l.trim().length < 200))
    .slice(0, 8)
    .map(l => `• ${l.trim()}`);

  return lines.length > 0 
    ? lines.join('\n') 
    : "I found some related information but couldn't compose a clear answer. Try being more specific.";
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

    const detectedCategory = category || detectCategory(query);

    // Strategy: category search first (returns all chunks in category), keyword fallback
    let results = [];
    
    if (detectedCategory) {
      results = await searchByCategory(detectedCategory);
    }
    
    // If no category match or too few results, search by keywords
    if (results.length < 2) {
      const keywordResults = await searchByKeywords(query);
      const existingContent = new Set(results.map(r => r.content.substring(0, 50)));
      for (const r of keywordResults) {
        if (!existingContent.has(r.content.substring(0, 50))) {
          results.push(r);
        }
      }
    }

    // Get sources for citation
    const sources = [...new Set(
      results.filter(r => r.source_type === 'seed').map(r => r.source_name)
    )];

    // Try Deepseek LLM first, fallback to local compose
    let answer = await askDeepseek(query, results);
    
    if (!answer) {
      answer = composeFallbackAnswer(query, results);
    }

    return Response.json({ answer, sources, resultCount: results.length });
  } catch (err) {
    console.error('Advisor API error:', err);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
