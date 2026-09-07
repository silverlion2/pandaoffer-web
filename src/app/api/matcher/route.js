import { createClient } from '@supabase/supabase-js';
import { aiMatcherSchema } from '@/lib/schema';
import { createLocalMatch, isUsableAiMatch, normalizeGpa } from '@/lib/matcher';

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';

let _supabase = null;
function getSupabase() {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) return null;
    _supabase = createClient(url, key);
  }
  return _supabase;
}

async function getUniversityKnowledge(major) {
  const sb = getSupabase();
  if (!sb) return '';
  try {
    const majorKeywords = {
      'MBBS': ['mbbs', 'medicine', 'medical', 'WHO'],
      'STEM': ['engineering', 'computer', 'science', 'technology', 'stem', 'physics', 'math'],
      'Business': ['business', 'economics', 'finance', 'mba', 'management'],
    };
    const keywords = majorKeywords[major] || ['university'];

    // Get university chunks
    const universityQuery = sb
      .from('laihua_knowledge')
      .select('content, source_name')
      .eq('category', 'universities')
      .order('created_at', { ascending: false })
      .limit(10);

    // Get scholarship chunks
    const scholarshipQuery = sb
      .from('laihua_knowledge')
      .select('content, source_name')
      .eq('category', 'scholarships')
      .order('created_at', { ascending: false })
      .limit(5);

    // Get cost chunks
    const costQuery = sb
      .from('laihua_knowledge')
      .select('content, source_name')
      .eq('category', 'costs')
      .order('created_at', { ascending: false })
      .limit(3);

    const [{ data: uniData }, { data: scholData }, { data: costData }] = await Promise.all([
      universityQuery,
      scholarshipQuery,
      costQuery,
    ]);
    const all = [...(uniData || []), ...(scholData || []), ...(costData || [])];
    return all.map(r => r.content).join('\n\n---\n\n');
  } catch (e) {
    console.error('Matcher RAG error:', e.message);
    return '';
  }
}

export async function POST(request) {
  let localMatch = null;
  try {
    const parsed = aiMatcherSchema.safeParse(await request.json());
    if (!parsed.success) return Response.json({ error: 'Invalid student profile' }, { status: 400 });

    const { nationality, major, gpa } = parsed.data;
    localMatch = createLocalMatch(parsed.data);

    // Normalize GPA to percentage
    const gpaPercent = normalizeGpa(gpa);

    // Get RAG knowledge
    const ragContext = await getUniversityKnowledge(major);

    const DEEPSEEK_KEY = process.env.DEEPSEEK_KEY;
    if (!DEEPSEEK_KEY) {
      if (localMatch) return Response.json(localMatch);
      return Response.json({ error: 'Matching data unavailable' }, { status: 503 });
    }

    const systemPrompt = `You are a university matching engine for international students studying in China. You MUST respond ONLY with valid JSON, no markdown, no explanation.

Given a student profile and knowledge about Chinese universities, return exactly 3 university matches.

RESPOND WITH THIS EXACT JSON FORMAT (no markdown fences, no extra text):
{
  "universities": [
    {
      "name": "Full University Name",
      "code": "Short abbreviation",
      "cscAgency": "CSC agency number like 10003",
      "city": "City, China",
      "tier": "C9/985/211",
      "matchPercent": 92,
      "program": "Specific program name",
      "tuitionUSD": 6200,
      "whyMatch": "2-sentence explanation of why this is a good match",
      "insiderTip": "1-sentence insider tip about applying here"
    }
  ],
  "cscProbability": 45,
  "cscTip": "1-sentence tip to improve CSC chances",
  "overallAdvice": "2-sentence personalized advice"
}

MATCHING RULES:
- Higher GPA → suggest more competitive (C9/top 985) schools
- Lower GPA → suggest mid-tier 985 or strong 211 schools
- Match program to major (MBBS → medical schools, STEM → tech-strong schools, Business → economics schools)
- Consider nationality for CSC diplomatic quotas (Pakistan/Thailand = higher acceptance, Western countries = more competitive)
- First match should be aspirational (stretch), second should be realistic (strong fit), third should be safe (high acceptance)
- CSC probability should be realistic: 70-85% for high GPA from quota countries, 20-40% for average profiles`;

    const userPrompt = `Student Profile:
- Nationality: ${nationality}
- Target Major: ${major}
- GPA: ${gpaPercent.toFixed(0)}% (originally ${gpa.value} on ${gpa.scale} scale)

Knowledge Base Context:
${ragContext || 'Use your general knowledge about Chinese universities.'}

Return the JSON matching result.`;

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
        temperature: 0.4,
        max_tokens: 1200,
      }),
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      console.error('Deepseek matcher error:', res.status);
      if (localMatch) return Response.json(localMatch);
      return Response.json({ error: 'Matching failed' }, { status: 502 });
    }

    const data = await res.json();
    let content = data.choices?.[0]?.message?.content || '';

    // Strip markdown fences if present
    content = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();

    let result;
    try {
      result = JSON.parse(content);
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr.message, 'Content:', content.substring(0, 200));
      if (localMatch) return Response.json(localMatch);
      return Response.json({ error: 'Matching failed' }, { status: 502 });
    }

    if (!isUsableAiMatch(result)) {
      if (localMatch) return Response.json(localMatch);
      return Response.json({ error: 'Matching failed' }, { status: 502 });
    }

    return Response.json({
      ...result,
      meta: { source: 'ai', isPartial: false },
    });
  } catch (err) {
    console.error('Matcher API error:', err);
    if (localMatch) return Response.json(localMatch);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
