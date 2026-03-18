import { createClient } from '@supabase/supabase-js';

// GET /api/advisor/seed?secret=xxx — one-time seeding endpoint
// Visit in browser: https://pandaoffer.top/api/advisor/seed?secret=YOUR_DEEPSEEK_KEY

const SEED_CHUNKS = [
  // ── CSC Scholarship Deep Guide (from 12+ podcast sources) ──
  { content: `# CSC Scholarship Types
- **Type A (Bilateral/Embassy)**: Apply through the Chinese embassy in your home country. Covers tuition, accommodation, monthly stipend, and medical insurance.
- **Type B (University)**: Apply directly to a Chinese university. Same coverage but the university selects you, not the embassy.
- **Provincial Scholarships**: Offered by local governments (e.g., Beijing, Shanghai, Jiangsu). Usually partial — covering tuition only.
- **University Scholarships**: Individual universities offer merit-based awards. Tsinghua, Peking, Fudan, and Zhejiang all have their own.`, category: 'scholarships', source_name: 'csc_scholarship_deep.md' },

  { content: `# CSC Benefits (Fully Funded)
- Full tuition fee waiver
- On-campus accommodation or housing allowance
- Monthly stipend: Undergraduate 2,500 RMB (~$350), Master's 3,000 RMB (~$420), PhD 3,500 RMB (~$490)
- Comprehensive medical insurance
- Usually no application fee
- 274 Chinese universities offer CSC-eligible programs
- Around 50,000 international students receive CSC scholarships annually`, category: 'scholarships', source_name: 'csc_scholarship_deep.md' },

  { content: `# CSC Eligibility Requirements
- Must be non-Chinese citizen
- Age limits: Under 25 for bachelor's, under 35 for master's, under 45 for PhD
- Good academic record (GPA typically 3.0+ or equivalent)
- HSK may be required for Chinese-taught programs (HSK 4+ for most, HSK 3 for some bachelor's programs)
- English-taught programs: IELTS/TOEFL or English proficiency certificate accepted`, category: 'scholarships', source_name: 'csc_scholarship_deep.md' },

  { content: `# CSC Application Timeline
- Applications typically open January–March, right after Spring Festival
- Start preparing in September–October of the previous year
- Contact professors early (fall) for acceptance letters
- Results announced May–June
- Deadline varies by university — check individual university websites
- The application window is tight — prepare ALL documents before it opens`, category: 'scholarships', source_name: 'csc_scholarship_deep.md' },

  { content: `# CSC Required Documents
1. Completed online application form (www.campuschina.com)
2. Passport copy (valid for at least 1 year)
3. Notarized highest diploma and transcripts (translated into Chinese or English)
4. Study plan or research proposal (for master's/PhD)
5. Two recommendation letters from professors or associate professors
6. Physical examination form (Foreigner Physical Examination Form)
7. Police clearance certificate / No criminal record
8. Language proficiency proof (HSK certificate or IELTS/TOEFL)
9. Optional but highly recommended: Pre-admission/acceptance letter from a professor`, category: 'scholarships', source_name: 'csc_scholarship_deep.md' },

  { content: `# Pro Tips from Successful CSC Applicants
- Getting an acceptance letter from a Chinese professor can boost your chances by up to 70%
- Present your application professionally — all documents in correct order, PDF format
- Apply for BOTH CSC and university scholarships to maximize chances
- Show commitment to China (mention any Chinese language learning, cultural interest, or prior visits)
- Contact the Chinese embassy in your country AND the university's international office for advice
- Write a strong, personal study plan — explain WHY China, WHY this university, WHY this program
- Some embassy quotas exist — smaller countries often have less competition
- If rejected once, reapply — many successful scholars were rejected on their first try`, category: 'scholarships', source_name: 'csc_scholarship_deep.md' },

  // ── CSC Interview Prep ──
  { content: `# Common CSC Scholarship Interview Questions
1. Why do you want to study in China?
2. Why did you choose this specific university and program?
3. What is your research plan or study plan?
4. How will this degree help your career back home?
5. What do you know about Chinese culture?
6. Have you studied Chinese? What is your HSK level?
7. How will you handle cultural differences?
8. What are your strengths and weaknesses?
9. Where do you see yourself in 5 years after graduating?
10. Do you have any publications or research experience?`, category: 'scholarships', source_name: 'csc_interview.md' },

  { content: `# CSC Interview Tips from Successful Scholars
- Dress professionally — business casual at minimum
- Be genuine and show passion for your field AND for China specifically
- Prepare a 2-minute elevator pitch about your research/study plan
- Know the university and supervisor you applied to — mention specific labs, papers, or projects
- Show you've done homework about living in China (mention the city, cultural aspects)
- If you don't have Chinese language skills, emphasize your plan to learn
- Embassy interviews (Type A) tend to be more formal; university interviews more academic
- Express your intention to contribute to bilateral relations between China and your home country
- Red flags: Don't say you chose China just because the scholarship is free; don't show zero knowledge about Chinese culture`, category: 'scholarships', source_name: 'csc_interview.md' },

  // ── Top Universities Deep Guide ──
  { content: `# C9 League — China's Ivy League
1. **Tsinghua University (清华大学)** — Beijing. Best for engineering, CS, AI. QS World #20.
2. **Peking University (北京大学)** — Beijing. Best for humanities, law, medicine, sciences. QS World #17.
3. **Zhejiang University (浙江大学)** — Hangzhou. Strong in engineering, agriculture, medicine.
4. **Shanghai Jiao Tong University (上海交通大学)** — Shanghai. Best for mechanical engineering, medicine, business.
5. **Fudan University (复旦大学)** — Shanghai. Strong in social sciences, economics, journalism.
6. **Nanjing University (南京大学)** — Nanjing. Excellent astronomy, chemistry, Chinese literature.
7. **USTC (中国科学技术大学)** — Hefei. Top for physics, math, pure sciences.
8. **Xi'an Jiaotong University (西安交通大学)** — Xi'an. Strong engineering, energy, management.
9. **Harbin Institute of Technology (哈尔滨工业大学)** — Harbin. Aerospace, robotics, civil engineering.`, category: 'universities', source_name: 'top_universities_deep.md' },

  { content: `# Best Universities by Field for International Students
- **Computer Science / AI**: Tsinghua, Peking, SJTU, Zhejiang, HUST
- **Business / MBA**: CEIBS (Shanghai), Tsinghua SEM, Peking Guanghua, Fudan
- **Medicine**: Peking Health Science Center, Shanghai Medical College (Fudan), Wuhan University
- **Chinese Language & Culture**: Beijing Language and Culture University (BLCU), Nanjing University, Sun Yat-sen
- **Engineering**: Tsinghua, SJTU, Zhejiang, Tongji, Beihang
- **International Relations**: Peking, Renmin (RUC), Fudan, Tsinghua (Schwarzman)
- **Agriculture**: China Agricultural University, Zhejiang University`, category: 'universities', source_name: 'top_universities_deep.md' },

  { content: `# English-Taught Programs in China
- 274 universities offer CSC-eligible programs, many in English
- Most master's and PhD programs at top universities have English-taught options
- Bachelor's programs in English are more limited — mainly at BLCU, Jinan University, and some joint programs
- MBBS (medicine) in English is widely available at 45+ universities, popular with students from South Asia and Africa
Application Tips by Tier:
- Tier 1 (C9/985): Highly competitive. GPA 3.5+, strong research proposal, professor acceptance letter crucial
- Tier 2 (211 universities): Competitive but achievable. GPA 3.0+, good study plan matters
- Tier 3 (Regular universities): More accessible, many actively recruit international students`, category: 'universities', source_name: 'top_universities_deep.md' },

  // ── Student Life ──
  { content: `# Campus Life in China
- Chinese universities have gated campuses with dorms, canteens, sports facilities, and libraries all within — like a small city
- International student dorms are usually separate, better quality but more expensive. Expect shared or private bathroom depending on university tier
- Campus canteens serve meals for 10–25 RMB ($1.50–$3.50) — authentic, affordable, varied regional cuisines
- WeChat is essential — used for paying bills, joining class groups, ordering food delivery, and social life
- Many student clubs available, though language barriers can make joining Chinese-majority clubs harder initially`, category: 'general', source_name: 'student_life.md' },

  { content: `# Culture Shock and Adaptation in China
- The concept of "face" (面子 miànzi) is deeply important. Be respectful, avoid public confrontation, show appreciation
- Personal space norms differ — people stand closer, staring is common (especially outside tier-1 cities)
- Internet: Many western sites (Google, YouTube, Instagram, WhatsApp) are blocked. Get a reliable VPN before arriving
- Food delivery apps (美团 Meituan, 饿了么 Ele.me) will become your best friends — almost everything delivered to your dorm
- Homesickness is real — building a friend group early (both international and Chinese students) makes a huge difference`, category: 'general', source_name: 'student_life.md' },

  { content: `# Practical Daily Life for Students in China
- Get a Chinese phone number immediately — essential for banking, food delivery, registration. China Mobile or China Unicom
- Alipay and WeChat Pay dominate payments. Cash is rarely used. Some international cards can now be linked directly
- Public transportation is excellent and cheap. Subway: 2–10 RMB per ride. Get a transit card or use Alipay mini-program
- Taobao and JD.com for online shopping — deliveries in 1–3 days, often free shipping, much cheaper than physical stores
- University clinics handle basic health issues. For serious concerns, go to international departments of public hospitals`, category: 'general', source_name: 'student_life.md' },

  { content: `# Making Friends in China
- Language exchange (语言交换) is the best way to make Chinese friends — offer to teach English for Chinese practice
- International student associations organize events, trips, and cultural activities. Join early
- Chinese students are often curious about foreigners but may be shy to approach first. Take the initiative
- Group dinners (聚餐) are central to Chinese social life. Expect family-style shared dishes and frequent drink offers
- Social apps: WeChat (main), Xiaohongshu (lifestyle), Bilibili (videos/entertainment)`, category: 'general', source_name: 'student_life.md' },

  // ── Visa Deep Guide ──
  { content: `# Student Visa Types for China
- **X1 Visa**: Long-term study (>180 days). Must convert to Residence Permit within 30 days of arrival
- **X2 Visa**: Short-term study (≤180 days). No conversion needed. Good for language courses or summer programs
- **Important**: Do NOT enter on a tourist (L) visa planning to study — you will need to leave and re-enter on the correct visa
X1 Visa Application Process:
1. Receive JW201/JW202 form and admission letter from university
2. Complete visa application form (Form V.2013) at local Chinese embassy
3. Prepare: valid passport (6+ months validity, 2+ blank pages), JW201/202, admission letter, health exam form, photos
4. Submit at Chinese embassy/consulate. Processing: 4–7 business days (standard)
5. Cost: ~$140 USD for US citizens, ~$30–60 for most others`, category: 'visa', source_name: 'visa_deep.md' },

  { content: `# After Arrival — Residence Permit & Registration
- WITHIN 24 HOURS: Register at local police station (派出所) with your landlord/dorm manager
- WITHIN 30 DAYS: Apply for Residence Permit at the local Exit-Entry Administration office
- Documents needed: passport, JW201/202, admission letter, registration form, health check results, photos
- Residence Permit valid for duration of study (1–4 years). Costs 400–800 RMB
- Common Mistakes to Avoid:
  - Not bringing enough passport photos — bring 20+ (China uses them for everything)
  - Forgetting police registration — fines of 500+ RMB per day of violation
  - Letting Residence Permit expire — can lead to detention and deportation
  - Submitting documents without notarized translations`, category: 'visa', source_name: 'visa_deep.md' },

  { content: `# Foreigner Physical Examination for China Visa
- Must be done at an approved hospital/clinic in your home country
- Tests include: blood test (HIV, syphilis, hepatitis B/C), chest X-ray, ECG, general physical exam
- Use the official "Foreigner Physical Examination Form" — download from university or embassy website
- All results must be signed by physician and stamped by the hospital
- Some students need to redo health checks in China upon arrival — especially in Beijing and Shanghai
- Start the health check at least 4–6 weeks before departure — some tests take time to process`, category: 'visa', source_name: 'visa_deep.md' },

  // ── Costs & Living (enhanced) ──
  { content: `# Detailed Cost of Living by City Tier
**Tier 1 (Beijing, Shanghai, Guangzhou, Shenzhen)**:
- Rent: 2,000–4,500 RMB/month (dorm: 800–1,500 RMB)
- Food: 1,500–3,000 RMB/month (campus canteen much cheaper: 600–900 RMB)
- Transport: 200–400 RMB/month
- Phone/Internet: 50–100 RMB/month
- Total: 4,000–8,000 RMB/month ($550–$1,100)

**Tier 2 (Chengdu, Wuhan, Nanjing, Xi'an, Hangzhou)**:
- Rent: 1,200–2,500 RMB/month (dorm: 600–1,000 RMB)
- Food: 1,000–2,000 RMB/month
- Transport: 100–250 RMB/month
- Total: 2,500–5,000 RMB/month ($350–$700)

**Tier 3 (Kunming, Changsha, Harbin, smaller cities)**:
- Rent: 800–1,500 RMB/month
- Food: 800–1,500 RMB/month
- Total: 1,800–3,500 RMB/month ($250–$500)`, category: 'costs', source_name: 'costs_enhanced.md' },

  { content: `# Tuition Fees for International Students in China
**With CSC Scholarship**: FREE (tuition fully covered)
**Without scholarship (self-funded)**:
- Chinese language program: 8,000–25,000 RMB/year ($1,100–$3,500)
- Bachelor's degree: 15,000–35,000 RMB/year ($2,100–$5,000)
- Master's degree: 20,000–45,000 RMB/year ($2,800–$6,300)
- PhD: 25,000–50,000 RMB/year ($3,500–$7,000)
- MBA: 50,000–200,000 RMB/year ($7,000–$28,000)
- MBBS (Medicine): 25,000–70,000 RMB/year ($3,500–$10,000)
Note: Top universities (C9) tend to be at the higher end; tier-2/3 universities are much more affordable`, category: 'costs', source_name: 'costs_enhanced.md' },

  // ── City Guides (enhanced) ──
  { content: `# Beijing — The Capital Experience
- Population: 22+ million. Political and cultural center of China
- Universities: Tsinghua, Peking (PKU), Renmin, BLCU, Beihang — highest concentration of top universities
- Climate: Cold dry winters (-10°C), hot humid summers (35°C+). Spring (April–May) and autumn (Sept–Oct) are best
- Cost: High — budget 5,000–8,000 RMB/month minimum
- Pros: Rich history, cultural sites (Great Wall, Forbidden City), best academic resources, strong international community
- Cons: Air pollution (improving but still an issue), traffic congestion, high living costs
- Best for: Serious academics, Chinese culture enthusiasts, political science/IR students`, category: 'cities', source_name: 'city_guides_enhanced.md' },

  { content: `# Shanghai — The International Hub
- Population: 26+ million. China's financial and commercial center
- Universities: Fudan, SJTU, Tongji, East China Normal — excellent programs
- Climate: Hot humid summers, mild winters. Comfortable spring and fall
- Cost: Highest in China — budget 6,000–10,000 RMB/month
- Pros: Most cosmopolitan city, easy for English speakers, excellent nightlife, modern infrastructure
- Cons: Most expensive city, can feel less "authentically Chinese"
- Best for: Business/finance students, those wanting a global city experience`, category: 'cities', source_name: 'city_guides_enhanced.md' },

  { content: `# Chengdu — The Lifestyle City
- Population: 21+ million. Capital of Sichuan province, known for relaxed lifestyle
- Universities: Sichuan University, UESTC — good engineering and medical programs
- Climate: Mild year-round, often overcast. Very humid
- Cost: Very affordable — 3,000–5,000 RMB/month
- Pros: Amazing food (Sichuan cuisine/hotpot), relaxed pace, pandas, affordable, growing expat scene
- Cons: Limited English, humid climate, fewer top-tier universities
- Best for: Budget-conscious students, food lovers, those seeking authentic Chinese life`, category: 'cities', source_name: 'city_guides_enhanced.md' },

  // ── Language & HSK ──
  { content: `# HSK Levels Explained for University Admission
- **HSK 1–2**: Basic. Not sufficient for university admission but good starting point
- **HSK 3**: Some bachelor's programs accept this level (mainly with 1 year Chinese prep)
- **HSK 4**: Most common requirement for Chinese-taught bachelor's programs. ~1,200 vocabulary words
- **HSK 5**: Required for competitive programs and some master's programs. ~2,500 words
- **HSK 6**: Advanced. Rarely required but impressive for PhD applications. ~5,000 words
Tips for HSK preparation:
- Apps: HelloChinese, Pleco (dictionary), Anki (flashcards), Du Chinese (reading)
- Many universities offer 1-year Chinese prep programs with HSK guarantee
- HSK tests are offered monthly at test centers worldwide and in China
- Cost: $30–80 depending on level and location
- For English-taught programs: IELTS 6.0+ or TOEFL 80+ usually required instead`, category: 'language', source_name: 'language_enhanced.md' },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  
  if (secret !== process.env.DEEPSEEK_KEY) {
    return Response.json({ error: 'Add ?secret=YOUR_DEEPSEEK_KEY' }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  let inserted = 0;
  let errors = [];

  for (const chunk of SEED_CHUNKS) {
    const { error } = await supabase.rpc('insert_laihua_knowledge', {
      p_content: chunk.content,
      p_embedding: new Array(384).fill(0),
      p_category: chunk.category,
      p_source_type: 'seed',
      p_source_name: chunk.source_name,
      p_language: 'en',
      p_metadata: {},
    });

    if (error) {
      errors.push(\`\${chunk.source_name}: \${error.message}\`);
    } else {
      inserted++;
    }
  }

  return Response.json({
    message: \`Seeded \${inserted}/\${SEED_CHUNKS.length} chunks\`,
    inserted,
    total: SEED_CHUNKS.length,
    errors: errors.length > 0 ? errors : 'none',
  });
}
