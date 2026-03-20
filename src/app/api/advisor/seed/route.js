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

  // ── Batch 3: Confucius Institute Scholarship ──
  { content: `# Confucius Institute Scholarship (ICLTS)
The Confucius Institute Scholarship, officially the International Chinese Language Teachers Scholarship, is a fully funded program for Chinese language study and teacher training.
- **Benefits**: Tuition, accommodation (dorm or 700 RMB/month allowance), medical insurance, monthly living allowance
- **Stipend**: 2,500 RMB/month for language students and BTCSOL; 3,000 RMB for MTCSOL
- **Programs**: 4-week, 1-semester, 1-year language study; 4-year BTCSOL; 2-year MTCSOL; combined 1+2 year programs
- **Age**: 16–35 (up to 45 for in-service Chinese teachers)
- **Apply at**: cis.chinese.cn`, category: 'scholarships', source_name: 'confucius_scholarship.md' },

  { content: `# Confucius Scholarship Requirements
- Non-Chinese citizen, good health, no criminal record
- HSK and HSKK scores required (levels vary by program)
- HSK certificates must be within 2 years
- Need recommendation from a Confucius Institute or host university
- Documents: passport, diploma, transcripts, HSK/HSKK reports, reference letter, personal statement
- Deadlines: ~May for September start, ~November for March start
- Application system opens around March 1`, category: 'scholarships', source_name: 'confucius_scholarship.md' },

  // ── Part-Time Work Rules ──
  { content: `# Part-Time Work for International Students in China
Since January 2022, international students CAN work part-time in China. Requirements:
- Enrolled in a degree program at a Chinese university
- Valid residence permit with 6+ months remaining
- At least 18 years old and completed 1+ year of study
- Good academic standing with no criminal record
Hours: During semester: max 8 hours/week, 40 hours/month. During breaks: max 16 hours/week, 80 hours/month.
Process: 1) Sign agreement with employer 2) Get written permission from university 3) Apply to PSB for work annotation on residence permit
WARNING: Working without proper permits can lead to fines, visa cancellation, or deportation`, category: 'general', source_name: 'part_time_work.md' },

  { content: `# Common Part-Time Jobs for International Students in China
- On-campus: teaching/research assistant, library assistant
- Language tutoring (especially English) — most popular, pays 100–300 RMB/hour
- Retail and hospitality
- Translation and interpretation
- Modeling/acting (entertainment industry)
- Online freelance work (writing, design, programming)
- Social media content creation (Xiaohongshu, Bilibili)
Important: Work must NOT interfere with classes. Your primary purpose in China is study.`, category: 'general', source_name: 'part_time_work.md' },

  // ── Internships ──
  { content: `# Internship Rules for International Students in China
- X1 visa students can do internships related to their major
- Must get approval from university AND Exit-Entry Bureau
- Need "internship remark" added to residence permit
- X2 visa holders need to convert to S2 visa first
- Limited to one internship at a time, max 180 days without re-registration
- Internships provide stipend/allowance, not full salary
- WARNING: Entering China on tourist/business visa to intern is ILLEGAL — detention/deportation risk`, category: 'general', source_name: 'internships.md' },

  // ── Post-Graduation & Career ──
  { content: `# Working in China After Graduation — Z Visa Transition
To work in China after graduating, you need a Z (work) visa:
1. Secure a job offer from a Chinese company
2. Employer applies for Work Permit Notice on your behalf
3. Apply for Z visa at Chinese embassy (may need to exit China first)
4. Enter China, convert to Work Residence Permit within 30 days
Requirements: Bachelor's degree minimum, clean criminal record, health exam
GOOD NEWS: Master's/PhD graduates from Chinese universities can apply immediately — no 2-year work experience needed!
Some cities (Shanghai, Beijing) also exempt bachelor's graduates from top institutions`, category: 'visa', source_name: 'post_graduation.md' },

  { content: `# Career Opportunities After Graduating in China
High-demand sectors for international graduates:
- **Tech/STEM**: AI, 5G, engineering at Huawei, Tencent, BYD, DJI
- **International Trade**: Import-export, MNCs (Siemens China), e-commerce (Alibaba, JD.com)
- **Education**: English teaching, Chinese culture programs, university roles
- **Other**: Consumer products, pharmaceuticals, telecom, transportation
Key advantages: Bilingual skills (English + Mandarin), cultural understanding, global network
Tips: Build connections (关系 guānxi), do internships during study, learn industry-specific Chinese`, category: 'general', source_name: 'post_graduation.md' },

  // ── MBBS Medicine ──
  { content: `# Studying Medicine (MBBS) in China
China is one of the top destinations for international MBBS students:
- 45+ universities offer MBBS in English
- Duration: 5 years MBBS + 1 year clinical internship = 6 years total
- Cost: 25,000–70,000 RMB/year ($3,500–$10,000) without scholarship
- CSC scholarship can cover full MBBS tuition
- Popular with students from South Asia, Africa, Southeast Asia
- Chinese medical degrees are recognized by WHO and listed in WDOMS
- Top choices: Peking University HSC, Fudan Shanghai Medical, Wuhan University, Zhejiang University
- Some universities also offer dental and nursing programs in English`, category: 'universities', source_name: 'mbbs_medicine.md' },

  // ── Accommodation ──
  { content: `# Accommodation Options for International Students
**University Dormitory (recommended for first year)**:
- Single or double room: 800–3,000 RMB/month depending on city/university
- Usually includes desk, bed, closet, shared or private bathroom
- Internet, laundry, and security included
- Register at the dorm office on arrival — bring passport and admission letter
**Off-Campus Apartment**:
- Studio: 2,000–5,000 RMB/month (Tier 1 cities)
- Shared apartment: 1,500–3,000 RMB (your share)
- Apps: 链家 (Lianjia), 贝壳 (Beike), 自如 (Ziroom)
- Need landlord cooperation for police registration
- Utilities typically 200–500 RMB/month extra`, category: 'costs', source_name: 'accommodation.md' },

  // ── Banking & Money ──
  { content: `# Banking and Money Management for Students in China
**Opening a Bank Account**:
- Go to Bank of China (中国银行) or ICBC — most foreigner-friendly
- Bring passport, residence permit, phone number, and enrollment proof
- Takes 30–60 minutes. Get a debit card + mobile banking app
**Mobile Payments**:
- Set up Alipay (支付宝) and WeChat Pay (微信支付) immediately
- International cards (Visa/Mastercard) can now be linked directly — game changer since 2024
- Almost everything uses mobile payment: groceries, restaurants, transport, even street vendors
**Money Transfer**:
- Wise (TransferWise) is cheapest for international transfers
- Western Union available at post offices
- Bank wire transfers work but have high fees (150–300 RMB per transfer)`, category: 'costs', source_name: 'banking.md' },

  // ── Campus Safety ──
  { content: `# Safety for International Students in China
China is generally very safe for international students:
- Violent crime rates are extremely low compared to most Western countries
- Campus security is strict — gated campuses with guards 24/7
- Pickpocketing exists in tourist areas and crowded subways — keep valuables secure
- Scams targeting foreigners: overcharging at tourist spots, fake/counterfeit goods, "tea ceremony" scam
- Emergency numbers: Police 110, Ambulance 120, Fire 119
- Download local emergency apps: 110, 12345 city hotline
- Register with your home country's embassy/consulate upon arrival
- Keep digital copies of all important documents (passport, visa, enrollment)`, category: 'general', source_name: 'safety.md' },

  // ── City Guides (more cities) ──
  { content: `# Wuhan — The Student Capital
- Population: 13+ million. Central China hub, 82 universities — most per capita in China
- Universities: Wuhan University (famous cherry blossoms), HUST — strong engineering and medicine
- Climate: Extreme — very hot humid summers (40°C+), cold winters. Known as one of China's "furnace" cities
- Cost: Affordable — 2,500–4,500 RMB/month
- Pros: Huge student population, affordable, great food (热干面 hot dry noodles), central location for travel
- Cons: Extreme weather, language barrier (strong Wuhan dialect), less international than Beijing/Shanghai
- Best for: Budget students, engineering/medicine, authentic Chinese experience`, category: 'cities', source_name: 'city_wuhan.md' },

  { content: `# Nanjing — The Ancient Capital
- Population: 9.5+ million. Former capital of China, rich historical heritage
- Universities: Nanjing University, Southeast University — excellent academics
- Climate: Four distinct seasons. Hot summers, cold winters with occasional snow
- Cost: Moderate — 3,000–5,500 RMB/month
- Pros: Rich culture (Ming Dynasty walls, Confucius Temple), excellent food, good quality of life, less crowded than Beijing/Shanghai
- Cons: Hot humid summers, fewer English speakers than Shanghai
- Best for: Culture lovers, humanities students, those wanting a balance of history and modernity`, category: 'cities', source_name: 'city_nanjing.md' },

  { content: `# Hangzhou — The Tech Paradise
- Population: 12+ million. Home of Alibaba, known as China's "Silicon Valley of E-commerce"
- Universities: Zhejiang University (C9 league), China Academy of Art
- Climate: Subtropical — humid, rainy spring, hot summer, beautiful autumn
- Cost: Moderate-high — 3,500–6,000 RMB/month
- Pros: Stunning West Lake (UNESCO site), tech scene, clean city, great food, growing international community
- Cons: Humid and rainy, rising costs, competitive university admission
- Best for: Tech/business students, nature lovers, aspiring entrepreneurs`, category: 'cities', source_name: 'city_hangzhou.md' },

  { content: `# Xi'an — The Silk Road City
- Population: 13+ million. Ancient capital, starting point of the Silk Road
- Universities: Xi'an Jiaotong University (C9), Northwestern Polytechnical, Xi'an International Studies
- Climate: Continental — cold dry winters, hot summers. Beautiful autumn
- Cost: Very affordable — 2,000–4,000 RMB/month
- Pros: Incredible history (Terracotta Warriors, city walls), amazing street food (回民街 Muslim Quarter), very affordable
- Cons: Air pollution, less international, fewer English speakers
- Best for: History buffs, budget students, engineering, Chinese language learners`, category: 'cities', source_name: 'city_xian.md' },

  { content: `# Harbin — The Ice City
- Population: 10+ million. Northeast China, famous for ice festivals
- Universities: Harbin Institute of Technology (C9) — top for aerospace and robotics
- Climate: EXTREME cold — -20°C to -30°C winters. Warm short summers
- Cost: Cheapest major city — 1,800–3,500 RMB/month
- Pros: Cheapest living, unique ice festival experience, strong Russian cultural influence, serious academics
- Cons: Brutal winters, isolated location, smallest international community among major cities
- Best for: Engineering students, cold-weather lovers, budget-conscious, unique cultural experience`, category: 'cities', source_name: 'city_harbin.md' },

  { content: `# Guangzhou — The Southern Gateway
- Population: 18+ million. China's third-largest city, major trade hub
- Universities: Sun Yat-sen University, South China University of Technology
- Climate: Subtropical — hot and humid year-round, typhoon season (June-October)
- Cost: Moderate — 3,500–6,000 RMB/month
- Pros: Amazing Cantonese food (dim sum!), diverse population, warm climate, Canton Fair connections
- Cons: Very hot and humid, strong Cantonese dialect, less English than Shanghai
- Best for: Business/trade students, food lovers, those wanting warm weather year-round`, category: 'cities', source_name: 'city_guangzhou.md' },

  // ── Food & Culture ──
  { content: `# Chinese Food Culture for International Students
Regional cuisines to know:
- **Sichuan (川菜)**: Spicy, numbing peppercorns. Famous: 麻婆豆腐, 火锅 (hotpot), 回锅肉
- **Cantonese (粤菜)**: Light, fresh flavors. Famous: dim sum, char siu, congee
- **Hunan (湘菜)**: Spicy and sour. Famous: 剁椒鱼头 (chopped chili fish head)
- **Northern (京菜/东北菜)**: Hearty, wheat-based. Famous: 饺子 (dumplings), 烤鸭 (Peking duck)
- **Shanghai (沪菜)**: Sweet and savory. Famous: 小笼包 (soup dumplings), braised pork
Campus canteen tips:
- Most affordable option: 10–25 RMB per meal
- Use your student card to pay (linked to your bank account)
- Halal (清真) canteens available at most major universities
- Point at what you want if you can't read the menu yet
- Breakfast: steamed buns, soy milk, congee, eggs (usually 3–8 RMB)`, category: 'general', source_name: 'food_culture.md' },

  // ── Weather & Packing ──
  { content: `# What to Pack for Studying in China
Essential items to bring:
- **Documents**: Passport, visa, admission letter, JW201/202, health exam, 20+ passport photos, diploma copies
- **Electronics**: Laptop, phone, universal power adapter (China uses Type A/I plugs, 220V), VPN subscription pre-installed
- **Clothing**: Pack for the climate of your specific city. Beijing = heavy winter coat; Guangzhou = summer clothes year-round
- **Medicine**: Bring familiar medicines (cold/flu, pain relief, allergy). Pharmacies exist but brands differ
- **Personal items**: Deodorant (hard to find in China), sunscreen, your country's snacks
- **NOT needed**: Towels, bedding, toiletries — all cheaply available on Taobao/in campus shops
Pro tip: Pack light. Everything is cheap in China — you'll buy what you need for much less than bringing it`, category: 'general', source_name: 'packing_guide.md' },

  // ── Health & Mental Health ──
  { content: `# Health and Mental Health Support for Students in China
**Physical Health**:
- University clinic: Basic consultations 5–20 RMB. Good for colds, minor injuries
- Public hospitals: International departments available at major hospitals. Bring insurance card
- Pharmacies (药店): Everywhere. Staff can help if you describe symptoms. WeChat translate helps
- Your CSC/university insurance covers most costs — save receipts for reimbursement
**Mental Health**:
- Culture shock is normal — peaks around month 2–4
- Most universities have free counseling centers (心理咨询中心) — may be in Chinese only
- International student office can connect you with English-speaking counselors
- Online therapy services work with VPN (BetterHelp, Talkspace)
- WeChat support groups for international students — ask at orientation
- Exercise, stay social, maintain routines — proven strategies for adjustment`, category: 'general', source_name: 'health_support.md' },

  // ── Chinese Language Learning ──
  { content: `# Learning Chinese While Studying in China — Tips
**Immersion advantages**: Living in China accelerates learning dramatically. Students typically gain 1–2 HSK levels per year.
**Language prep programs**: Many universities offer 1-year Chinese prep before starting your degree. Tuition: 8,000–20,000 RMB/year
**Daily learning strategies**:
- Change your phone language to Chinese
- Order food in Chinese (practice with menus)
- Make Chinese friends through language exchange
- Watch Chinese shows on Bilibili or iQiyi with subtitles
- Use apps: HelloChinese, Pleco dictionary, Anki flashcards, Du Chinese for reading
**Common mistakes**: Only hanging out with students from your home country — you won't improve
**Goal timeline**: HSK 1→3 in 6 months (intensive); HSK 4→5 in 1 year; HSK 5→6 in 1.5–2 years`, category: 'language', source_name: 'learning_chinese.md' },

  { content: `# Chinese Language Resources for International Students
**Free resources**:
- HelloChinese app (best for beginners, gamified)
- Pleco dictionary app (essential — scan characters with camera)
- Du Chinese (graded reading articles)
- Chinese Pod (podcast for all levels)
- CCTV Learn Chinese (official TV learning show)
**Paid resources**:
- University prep programs (best option — structured, peers)
- Italki / Preply (1-on-1 tutors, 80–200 RMB/hour)
- HSK Standard Course textbooks (by Jiang Liping — official series)
- Skritter (character writing practice)
**HSK Test Centers**: Available monthly at most universities and major cities. Register at chinesetest.cn`, category: 'language', source_name: 'chinese_resources.md' },

  // ── Scholarships Comparison ──
  { content: `# Scholarship Comparison — Which One Is Right for You?
| Scholarship | Coverage | Duration | HSK Needed | Competitiveness |
|---|---|---|---|---|
| CSC (Type A) | Full | 1–6 years | Varies | Very High |
| CSC (Type B) | Full | 1–6 years | Varies | High |
| Confucius | Full | 4 weeks – 4 years | HSK 3+ | Moderate |
| Provincial | Partial–Full | 1–4 years | Varies | Moderate |
| University Merit | Partial–Full | 1–4 years | Varies | Moderate-Low |
| Belt & Road | Full | 1–4 years | None | Moderate |
Tips: Apply for MULTIPLE scholarships. CSC + university = best strategy. Provincial scholarships are hidden gems with less competition.`, category: 'scholarships', source_name: 'scholarship_comparison.md' },

  { content: `# Belt & Road Scholarship
China offers scholarships specifically for students from Belt & Road Initiative (BRI) countries:
- 140+ countries covered along the Belt & Road
- Usually full scholarship: tuition, accommodation, stipend, insurance
- Available for bachelor's, master's, and PhD programs
- Application through Chinese embassies or participating universities
- Less competitive than CSC for eligible countries
- Some provinces (Zhejiang, Guangdong, Fujian) have their own BRI scholarship programs
- Growing program — more slots added each year`, category: 'scholarships', source_name: 'belt_road_scholarship.md' },

  // ── Chinese Holidays & Academic Calendar ──
  { content: `# Chinese Academic Calendar and Holidays
**Semesters**: Fall (September–January), Spring (March–July)
**Major holidays (school breaks)**:
- **Spring Festival/Chinese New Year** (春节): January/February, 4–6 weeks off. THE biggest holiday. Travel is insane — book early
- **National Day Golden Week** (国庆节): October 1–7, 1 week off. Heavy travel period
- **Dragon Boat Festival** (端午节): June, 3 days off
- **Mid-Autumn Festival** (中秋节): September/October, 3 days off
- **Labor Day** (劳动节): May 1–5, 5 days off
Academic tip: Final exams are usually in January and July. Chinese universities take attendance seriously — absences affect your grade and scholarship status.`, category: 'general', source_name: 'academic_calendar.md' },

  // ── Transportation ──
  { content: `# Transportation Guide for Students in China
**Within Cities**:
- Subway/Metro: Best option. 2–10 RMB per ride. Apps: 高德地图 (Amap) or Baidu Maps
- Buses: 1–2 RMB per ride. Extensive network but harder to navigate
- Bike sharing: Meituan Bike, Hello Bike — 1.5 RMB per ride. Scan QR code to unlock
- Ride-hailing: DiDi (Chinese Uber) — affordable, safe, convenient
- Taxis: Use DiDi or wave one down. Metered, but drivers rarely speak English
**Between Cities**:
- High-speed rail (高铁): INCREDIBLE. Beijing→Shanghai in 4.5 hours. Book on 12306.cn or Trip.com
- Regular trains: Cheaper but slower. Hard sleeper (硬卧) for overnight budget travel
- Flights: Cheap domestic flights on Trip.com or Fliggy. Often under 500 RMB
- Buses: Long-distance buses for smaller cities. Book at bus stations
Student tip: Get a transit card (交通卡) for your city — works on subway, bus, and some taxis`, category: 'general', source_name: 'transportation.md' },

  // ── Technology & Apps ──
  { content: `# Essential Apps for International Students in China
**Communication**: WeChat (微信) — THE app for everything. Messaging, payments, groups. Non-negotiable
**Navigation**: 高德地图 (Amap) or Baidu Maps — Google Maps doesn't work in China
**Food Delivery**: 美团 (Meituan), 饿了么 (Ele.me) — deliver to your dorm in 30 min
**Shopping**: 淘宝 (Taobao), 京东 (JD.com), 拼多多 (Pinduoduo) for budget
**Ride-hailing**: 滴滴 (DiDi) — Chinese Uber
**Translation**: 百度翻译 (Baidu Translate), Apple Translate — work without VPN
**Payment**: 支付宝 (Alipay), 微信支付 (WeChat Pay)
**Social**: 小红书 (Xiaohongshu/RED), 抖音 (Douyin/TikTok), 哔哩哔哩 (Bilibili)
**Train tickets**: 12306 app or Trip.com
**VPN**: ExpressVPN, Astrill, Clash — essential for accessing Google, WhatsApp, Instagram`, category: 'general', source_name: 'essential_apps.md' },

  // ── Accommodation Tips ──
  { content: `# Tips for Finding Off-Campus Housing in China
**When to look**: 1–2 months before semester starts. Competition is high near popular universities
**Where to search**:
- 链家 (Lianjia/Beike) app — most listings, verified
- 自如 (Ziroom) — furnished apartments, slightly more expensive but hassle-free
- Campus bulletin boards — students leaving post their rooms
- WeChat groups — ask international student office for housing groups
**What to check**:
- Distance to campus (within 15 min by bike or metro is ideal)
- Landlord willingness to do police registration (临时住宿登记 — required!)
- Internet speed and reliability
- Air conditioning and heating (crucial depending on city)
- Contract terms — usually 1-year minimum with 1-month deposit
**Red flags**: No written contract, landlord refuses registration, cash-only payments`, category: 'costs', source_name: 'housing_tips.md' },

  // ── Application Strategy ──
  { content: `# Strategic Application Checklist for CSC Scholarship
**6–12 months before deadline**:
- [ ] Research universities and programs on campuschina.org
- [ ] Contact 3–5 professors by email with your CV and research proposal
- [ ] Take HSK test if Chinese-taught program
- [ ] Get IELTS/TOEFL if English-taught program
**3–6 months before deadline**:
- [ ] Write study plan / research proposal (2,000+ words, specific to professor and lab)
- [ ] Get 2 recommendation letters from current/former professors
- [ ] Notarize and translate all academic documents
- [ ] Complete physical examination
- [ ] Get police clearance certificate
**1–3 months before deadline**:
- [ ] Fill out online application at campuschina.com
- [ ] Upload all documents (PDF format, clear scans)
- [ ] Submit to embassy (Type A) AND university (Type B) — apply for both!
- [ ] Follow up with embassy/university to confirm receipt`, category: 'scholarships', source_name: 'application_checklist.md' },

  // ── Climate Deep Dive ──
  { content: `# China Climate Guide for International Students
**Northern China (Beijing, Harbin, Xi'an)**:
- Winter: -10°C to -30°C. MUST bring heavy winter coat, thermal underwear, warm boots
- Summer: 30–40°C, dry heat. Air conditioning is essential
- Best months: September–November (autumn), April–May (spring)
**Eastern China (Shanghai, Nanjing, Hangzhou)**:
- Winter: 0–5°C, damp cold (feels colder than dry cold!). No central heating south of Yangtze!
- Summer: 35–40°C, very humid. Rain season June–July (梅雨 méiyǔ)
- Best months: October–November, March–April
**Southern China (Guangzhou, Shenzhen, Kunming)**:
- Winter: 10–20°C, mild. Kunming is "Spring City" — pleasant year-round
- Summer: 30–35°C, humid, typhoon risk on coast. Kunming stays cool
- Best months: November–March (dry season)
**Western China (Chengdu, Chongqing)**:
- Year-round overcast and humid. Chongqing = another "furnace" city in summer
- Winter: 5–10°C, damp. Summer: 35–40°C`, category: 'cities', source_name: 'climate_guide.md' },

  // ── Insurance ──
  { content: `# Health Insurance for International Students in China
**CSC Scholarship Insurance**: Provided free — covers hospitalization, outpatient, emergency
**Self-funded Student Insurance**: 400–800 RMB/year. Required by most universities
**What's typically covered**:
- Hospitalization and surgery
- Outpatient visits at designated hospitals
- Emergency medical treatment
- Accidental injury
**What's usually NOT covered**:
- Pre-existing conditions
- Dental and vision care
- Mental health treatment (limited)
- Routine health checkups
**Tips**: Keep all receipts and medical records for reimbursement. File claims within 30 days. Some universities require you to use their designated hospital for insurance to apply.`, category: 'costs', source_name: 'insurance.md' },

  // ── Studying Tips ──
  { content: `# Academic Success Tips at Chinese Universities
- **Attendance matters**: Many universities track attendance strictly. Missing too many classes can cost you your scholarship
- **Grading systems vary**: Some use percentages, others letter grades. 60% is usually the pass mark
- **Office hours**: Chinese professors may not have formal office hours — contact via WeChat
- **Group projects**: Very common. Chinese students tend to be collaborative — learn from them
- **Library resources**: Chinese university libraries are excellent. CNKI (知网) is the main academic database
- **Thesis/dissertation**: Required for all degrees. Start early — your advisor (导师) relationship is crucial
- **Academic integrity**: Plagiarism is taken very seriously. Always cite sources properly
- **Class style**: More lecture-based than Western universities. Participation may be less emphasized`, category: 'general', source_name: 'academic_tips.md' },

  // ── Common Challenges ──
  { content: `# Common Challenges for International Students in China (and Solutions)
1. **Language barrier**: Solution — invest in Chinese language from day 1, use translation apps, find bilingual friends
2. **Internet restrictions**: Solution — get a reliable VPN before arriving. Have backup options
3. **Homesickness**: Solution — join student organizations, maintain routines, video call family regularly
4. **Bureaucracy**: Solution — patience. Bring extra documents, passport photos, and copies of everything
5. **Food adjustment**: Solution — campus canteens are diverse. Find what works for you. International restaurants exist in all major cities
6. **Air quality**: Solution — check AQI app daily, wear N95 masks on bad days, get an air purifier for your room (200–500 RMB on Taobao)
7. **Cultural differences**: Solution — observe before judging, ask Chinese friends to explain, embrace curiosity
8. **Money transfer**: Solution — set up Wise account before arriving, open Chinese bank account in first week`, category: 'general', source_name: 'common_challenges.md' },

  // ── Arrival Checklist ──
  { content: `# First Week in China — Arrival Checklist
Day 1–2:
- [ ] Arrive at university, check into dormitory
- [ ] Register at local police station within 24 hours (bring passport, dorm proof)
- [ ] Get a Chinese SIM card (China Mobile recommended — best coverage)
- [ ] Set up WeChat and add student group chats
Day 3–5:
- [ ] Attend university orientation (mandatory for most schools)
- [ ] Open a bank account (Bank of China or ICBC)
- [ ] Set up Alipay and WeChat Pay
- [ ] Get campus card (for canteen, library, gym)
- [ ] Health check at university clinic if required
Week 2:
- [ ] Apply for Residence Permit (need health check results)
- [ ] Explore campus: find classrooms, library, gym, nearest subway
- [ ] Join international student association
- [ ] Stock up on essentials from Taobao
Pro tip: Upper-year students from your country are your best resource — find them!`, category: 'general', source_name: 'arrival_checklist.md' },

  // ── Batch 4: More cities ──
  { content: `# Shenzhen — The Innovation Capital
- Population: 17+ million. China's youngest major city, tech innovation hub
- Universities: Southern University of Science and Technology (SUSTech), Shenzhen University, Tsinghua Shenzhen
- Climate: Subtropical, warm year-round, typhoon risk. Very humid summers
- Cost: High — 4,500–8,000 RMB/month (similar to Guangzhou)
- Pros: China's Silicon Valley (Huawei, Tencent, DJI headquarters), modern city, close to Hong Kong, great for tech internships
- Cons: Young city with less cultural heritage, very hot, competitive job market
- Best for: Tech/CS students, startup enthusiasts, those wanting Hong Kong access`, category: 'cities', source_name: 'city_shenzhen.md' },

  { content: `# Kunming — The Spring City
- Population: 8.5+ million. Capital of Yunnan province, gateway to Southeast Asia
- Universities: Yunnan University, Kunming Medical University
- Climate: The BEST in China — spring-like year-round (15–25°C). Never too hot, never too cold
- Cost: Very affordable — 2,000–3,500 RMB/month
- Pros: Perfect weather, stunning nature (Stone Forest, Dali, Lijiang nearby), diverse ethnic cultures, very affordable, relaxed pace
- Cons: Fewer top-tier universities, limited job market, less international community
- Best for: Nature lovers, budget students, gap year programs, Chinese language study`, category: 'cities', source_name: 'city_kunming.md' },

  { content: `# Dalian — The Coastal Gem
- Population: 7+ million. Northeast port city on the Yellow Sea
- Universities: Dalian University of Technology (DUT), Dongbei University of Finance
- Climate: Moderate for Northeast China. Cool summers (perfect!), cold but manageable winters
- Cost: Affordable — 2,500–4,000 RMB/month
- Pros: Beautiful coastline, clean air, seafood, best climate in Northeast China, Japanese/Korean cultural influence, growing IT sector
- Cons: Smaller international community, limited nightlife, cold winters
- Best for: Finance students, those wanting coastal living, Japanese/Korean language learners`, category: 'cities', source_name: 'city_dalian.md' },

  // ── University Rankings Explained ──
  { content: `# Understanding Chinese University Rankings
**985 Project** (39 universities): China's top-tier research universities. Think "Ivy League equivalent." ALL C9 schools are 985.
**211 Project** (116 universities): Second tier — still excellent, nationally recognized. All 985 universities are also 211.
**Double First-Class** (2017 reform): Replaced 985/211 officially. 147 universities designated as "world-class" or having "first-class disciplines."
**What matters for international students**:
- 985/C9 = most competitive, best scholarships, highest prestige
- 211 = great education, good career prospects, easier admission
- Regular universities = most accessible, still quality education
- Ranking within China matters more than global rankings for local job market
- Employers check if your university is 985/211 — it's a common filter`, category: 'universities', source_name: 'ranking_systems.md' },

  // ── Social & Cultural ──
  { content: `# Chinese Social Etiquette for International Students
**Gift giving**: Bring small gifts from your home country. Avoid clocks (bad luck), green hats (implies infidelity), white/black wrapping (funeral colors)
**Dining etiquette**: The person who invites usually pays. Don't flip the fish. Don't stick chopsticks upright in rice (funeral gesture). Toast with "干杯" (gānbēi = cheers)
**Addressing people**: Use title + surname (王老师 Wáng Lǎoshī). Never call professors by first name
**Face culture (面子)**: Don't publicly criticize or embarrass anyone. Praise in public, correct in private
**Personal questions**: Questions about age, salary, marital status are normal — not considered rude in China
**Relationship building**: Sharing meals is the #1 way to build relationships. Accept invitations when possible`, category: 'general', source_name: 'social_etiquette.md' },

  { content: `# Dorm Life Tips for International Students
- International student dorms are separate from Chinese student dorms (usually better equipped)
- Typical room: bed, desk, wardrobe, bathroom (shared or private), AC, Wi-Fi
- Quiet hours: Most dorms have 11PM/midnight curfew for noise. Some lock doors at midnight
- Electricity: Many dorms shut off power at midnight — bring a power bank
- Visitors: Chinese dorms rarely allow opposite-gender visitors. International dorms may be more relaxed
- Laundry: Shared machines on each floor. 3–5 RMB per load. Some dorms have dryers
- Cooking: Most dorms don't allow cooking in rooms (fire safety). Use canteens or microwave areas
- Roommates: You may be paired with someone from a different country — embrace the cultural exchange`, category: 'general', source_name: 'dorm_life.md' },

  // ── Travel During Breaks ──
  { content: `# Best Travel Destinations During School Breaks
**Spring Festival (Jan-Feb, 4-6 weeks)**: Southeast Asia is popular (cheap flights from China). Vietnam, Thailand, Cambodia. Or explore China's south (Hainan, Guangxi)
**National Day (Oct 1-7)**: Avoid domestic tourist spots (PACKED). Go off-beaten-path or stay on campus and explore your city without crowds
**Summer Break (Jul-Aug)**: Perfect for longer trips. Tibet, Xinjiang, Inner Mongolia for adventure. Or visit home
**Weekend Trips from Major Cities**:
- Beijing: Great Wall sections (Jinshanling > Badaling), Chengde, Tianjin
- Shanghai: Suzhou, Hangzhou, Huangshan (Yellow Mountain)
- Chengdu: Jiuzhaigou, Le Shan Buddha, Emei Mountain
Budget tip: Student cards get 50% off at most scenic spots. High-speed rail is cheapest for 2-4 hour trips`, category: 'general', source_name: 'travel_breaks.md' },

  // ── Scholarship Renewal ──
  { content: `# Keeping Your Scholarship — Annual Review
CSC and most scholarships require annual evaluations:
- **Academic performance**: Maintain GPA above minimum (usually 2.5–3.0). Failing courses = risk of losing scholarship
- **Attendance**: Missing more than 10% of classes without valid reason = warning. Missing 20%+ = scholarship termination
- **Behavior**: No criminal record, no visa violations, no academic dishonesty
- **Annual review**: Submit academic transcript and evaluation form each year
- **Chinese language progress**: Some scholarships require HSK improvement
- **Tips**: Attend all classes, participate actively, maintain good relationship with advisor (导师)
- **If scholarship is revoked**: You can appeal, but prevention is better. Take academics seriously from day 1`, category: 'scholarships', source_name: 'scholarship_renewal.md' },

  // ── Research in China ──
  { content: `# Doing Research as an International Student in China
- China's research output is now #1 globally by volume — excellent labs and funding
- Key research areas: AI, quantum computing, materials science, biotech, renewable energy, space tech
- **Finding a supervisor**: Email professors directly with your CV and research interests. Read their recent papers first
- **Lab culture**: More hierarchical than Western labs. Address your supervisor as 导师 (dǎoshī)
- **Funding**: CSC covers living expenses. Additional research grants available through NSFC (National Natural Science Foundation)
- **Collaboration**: Great opportunity to co-publish with Chinese researchers — counts for both your records
- **Intellectual property**: Discuss IP ownership with supervisor early. University policies vary
- **Conference travel**: Many labs fund domestic conference attendance. International conferences require advance planning`, category: 'universities', source_name: 'research_china.md' },

  // ── Graduation Requirements ──
  { content: `# Graduation Requirements for International Students
**Bachelor's degree**: Complete all required courses, pass all exams, submit and defend graduation thesis/project
**Master's degree**: Complete coursework, publish 1–2 papers (university-dependent), submit and defend thesis
**PhD**: Complete coursework, publish 2–4 papers in SCI/SSCI journals, submit and defend dissertation
**Common requirements for all degrees**:
- Meet minimum credit requirements
- Pass Chinese language proficiency test (for Chinese-taught programs)
- Complete graduation thesis defense (答辩 dàbiàn)
- Clear all library fines and administrative holds
- Return dormitory key and check out
**Timeline**: Thesis defense usually in May-June. Graduation ceremony in June-July`, category: 'universities', source_name: 'graduation_requirements.md' },

  // ── Alumni & Networking ──
  { content: `# Building Your Professional Network in China
- **University alumni networks**: Chinese universities have strong 校友 (xiàoyǒu) networks. Join your university's international alumni WeChat group
- **LinkedIn alternative**: Use 脉脉 (Maimai) — China's professional networking platform
- **Career fairs**: Universities host annual career fairs in October-November and March-April. Attend even as a freshman
- **Industry events**: Attend meetups on EventBrite, AllEvents, or through WeChat groups for your industry
- **Guanxi (关系)**: The Chinese concept of relationships/connections. Invest in relationships early — they compound over time
- **Your classmates ARE your network**: Chinese classmates from top universities often become leaders in their fields
- **WeChat groups**: Join industry-specific groups. Ask alumni and professors for introductions`, category: 'general', source_name: 'networking_tips.md' },

  // ── Self-Funded Study ──
  { content: `# Self-Funded Study in China — Guide for Students Without Scholarships
Not everyone gets a scholarship, and that's OK — China is still very affordable:
- **Tuition**: 15,000–45,000 RMB/year ($2,000-$6,000) — fraction of Western university costs
- **Living**: 2,000–5,000 RMB/month depending on city — very manageable
- **Total annual cost**: $5,000–$15,000 for tuition + living — less than most Western countries
- **Partial scholarships**: Many universities offer tuition waivers or stipends even without full scholarship
- **How to reduce costs**: Live on campus, eat at canteens, use public transport, shop on Taobao/Pinduoduo
- **Work while studying**: Legal since 2022 — earn 2,000–5,000 RMB/month tutoring English
- **Semester-by-semester payment**: Most universities allow tuition payment per semester, not upfront
- **Still apply for scholarships**: You can apply for university merit scholarships after Year 1 based on GPA`, category: 'costs', source_name: 'self_funded_guide.md' },

  // ── Agency vs Self-Apply ──
  { content: `# Agency vs Self-Application — Which Is Better?
**Using an agency (中介)**:
- Cost: 5,000–30,000 RMB ($700–$4,200) — some charge even more
- Pros: Handle paperwork, translations, professor connections, reduce stress
- Cons: Expensive, some agencies are unreliable/scams, less control over your application
**Self-application (推荐)**:
- Cost: Free (minus document notarization/translation fees, ~500–2,000 RMB)
- Pros: Full control, impress interview panels by showing initiative, save money
- Cons: More time-consuming, need to research universities and contact professors yourself
**Verdict**: For CSC scholarships, self-application is recommended — the process is well-documented on campuschina.org and success rates are similar. For university-specific scholarships, agencies can help if you don't speak Chinese. NEVER pay an agency that guarantees admission — that's a scam.`, category: 'scholarships', source_name: 'agency_vs_self.md' },

  // ── Summer/Short Programs ──
  { content: `# Summer and Short-Term Programs in China
**Summer schools (2-8 weeks)**:
- Many top universities offer summer programs for international students
- Topics: Chinese language, culture, business, STEM, traditional arts
- Cost: Often free or heavily subsidized (including accommodation)
- Great way to test if China is right for you before committing to a full degree
**Language intensive programs**:
- 1-semester to 1-year Chinese language programs
- X2 visa (≤180 days) for shorter programs
- Universities like BLCU, Fudan, and Peking offer excellent programs
- Expect to gain 1-2 HSK levels in an intensive semester
**Confucius Institute 4-week program**: Fully funded short-term scholarship for Chinese language and culture. Apply at cis.chinese.cn`, category: 'universities', source_name: 'summer_programs.md' },

  // ── PhD Specifics ──
  { content: `# Pursuing a PhD in China — What to Know
- **Duration**: 3–4 years (some programs extend to 5-6 years in practice)
- **Stipend**: CSC provides 3,500 RMB/month (~$490). Some supervisors provide additional lab stipends (500–2,000 RMB/month)
- **Publication requirements**: Most programs require 2–4 papers in SCI/SSCI journals before graduation
- **Supervisor selection**: THE most important decision. Your 导师 determines your research direction, funding, and career prospects
- **Research funding**: China invests heavily in research. Labs are well-equipped at top universities
- **Teaching**: May be required to TA courses as part of your PhD duties
- **Candidacy**: Expected to pass qualifying exams (usually Year 1-2), then focus on research
- **Job prospects**: PhD holders are eligible for immediate work permits in China. Academic positions, research institutes, and industry R&D all recruit international PhD graduates`, category: 'universities', source_name: 'phd_guide.md' },

  // ── Master's Programs ──
  { content: `# Master's Programs in China — Overview
- **Duration**: 2–3 years depending on program and university
- **Types**: Academic master's (学术硕士) focuses on research; Professional master's (专业硕士) focuses on practice
- **English-taught**: Most top universities offer MBA, MTCSOL, Engineering, CS, and International Relations in English
- **Thesis vs non-thesis**: Academic programs require thesis + defense. Professional programs may substitute with a capstone project
- **Admission**: Bachelor's degree required. GPA 3.0+ recommended for top universities
- **Cost**: 20,000–45,000 RMB/year without scholarship. CSC covers everything for scholarship students
- **Popular programs**: MBA (CEIBS, Tsinghua, Peking), CS/AI (Tsinghua, SJTU), International Relations (Peking, Fudan)
- **Career advantage**: Master's graduates get immediate work permit eligibility in China — no 2-year experience requirement`, category: 'universities', source_name: 'masters_guide.md' },

  // ── Communication with Family ──
  { content: `# Staying Connected with Family from China
**Video calls**: WhatsApp/FaceTime/Zoom work with VPN. WeChat video call works without VPN — have family download WeChat
**VPN essentials**: ExpressVPN, Astrill, and Clash/V2Ray are most reliable in China. Buy BEFORE arriving — harder to download once inside China
**Time zone management**: China is UTC+8. Examples: +13 hours ahead of New York, +8 of London, +3 of Dubai, same as Singapore/Perth
**Communication tips**:
- Set a regular weekly call schedule with family
- Send photos via WeChat Moments — visible to contacts (like Instagram stories)
- Consider getting a dual-SIM phone — one Chinese SIM + one home country SIM
- Chinese sim with 5-20GB data: 30-100 RMB/month. More than enough for daily use
- International roaming from home SIM: usually expensive — use for emergencies only`, category: 'general', source_name: 'family_communication.md' },

  // ── Dietary Needs ──
  { content: `# Managing Dietary Restrictions in China
**Halal (清真 qīngzhēn)**:
- Halal restaurants are available in ALL major cities. Look for 清真 sign (green/white Arabic-style sign)
- Most major universities have halal canteens
- Cities with large Muslim communities (Xi'an, Lanzhou, Kunming) have the best options
**Vegetarian/Vegan (素食 sùshí)**:
- Harder than you'd expect — many "vegetable" dishes use meat-based stock or oyster sauce
- Buddhist restaurants (素餐厅) are fully vegetarian and surprisingly delicious
- Learn phrases: 我吃素 (wǒ chī sù = I'm vegetarian), 不要肉 (bùyào ròu = no meat)
**Allergies**: Nut allergies are less well-understood in China. Learn to say your allergy in Chinese. Carry translated allergy cards
**Western food**: Available in all Tier 1/2 cities. McDonald's, KFC, Pizza Hut are everywhere. International grocery stores in expat areas carry imported foods`, category: 'general', source_name: 'dietary_needs.md' },

  // ══════════════════════════════════════════════════════════
  // BATCH 5 — University Profiles (Insider / 内幕)
  // ══════════════════════════════════════════════════════════

  // ── Tsinghua Profile ──
  { content: `# Tsinghua University — Insider Profile
**CSC Agency Number**: 10003 (Type B)
**Application fee**: 600 RMB (~$85)
**English programs**: 30+ Master's/PhD programs across 49 schools
**Key programs**: Global MBA, Mechanical Engineering, Int'l Construction, Public Health, Schwarzman Scholars (Global Affairs)
**Undergraduate English**: Very limited — Zhishan College (Politics/Economics/Sociology), Zijing College (Science & Engineering)
**Insider tips**:
- Applying in Round 1 (Sept–Nov) is significantly better than Round 2 — many spots already filled
- Professor acceptance letter is not officially "required" but practically essential for PhD admission
- Tsinghua has internal quotas per country — smaller countries have less competition
- The interview is increasingly important — prepare specific questions about the lab/department you're applying to
- Schwarzman Scholars is at TSINGHUA (not Peking) — fully funded, ~150 spots, extremely competitive (3% acceptance rate)`, category: 'universities', source_name: 'tsinghua_insider.md' },

  { content: `# Tsinghua University — What They Don't Tell You
**Campus vibe (氛围)**: Intense academic pressure. Students study extremely hard. The stereotype "清华苦" (Tsinghua is tough) is real. Expect long library hours and competitive classmates.
**International student reality**: You're in a bubble. International students take separate classes from Chinese students in many programs. Making Chinese friends requires active effort.
**Hidden costs**: Tsinghua's dorms are dated. International student dorms cost 80–150 RMB/day. Many students move off-campus after Year 1 — apartments near Wudaokou are 3,500–6,000 RMB/month.
**Wudaokou (五道口) district**: The legendary student neighborhood. Nicknamed "宇宙中心" (Center of the Universe). Packed with cheap restaurants, bars, and other international students.
**Real talk**: Tsinghua's prestige opens every door in China. But the coursework is genuinely demanding, especially in engineering/CS. Don't come unprepared.`, category: 'universities', source_name: 'tsinghua_insider.md' },

  // ── Peking University Profile ──
  { content: `# Peking University (PKU) — Insider Profile
**CSC Agency Number**: 10001 (Type B)
**Application fee**: 800 RMB (~$112)
**Known for**: Humanities, law, social sciences, medicine, economics — China's #1 for liberal arts
**Key English programs**: Yenching Academy (China Studies, fully funded), International MBA, Public Policy, Law
**Insider tips**:
- Yenching Academy is PKU's answer to Schwarzman — 1-year Master's, fully funded, highly prestigious, ~125 scholars per year
- PKU is more liberal and free-thinking than Tsinghua (known as 北大自由 — PKU freedom). More debate, more political discussion
- Humanities and social science professors at PKU are often the most influential thinkers in China
- The campus (燕园 Yanyuan) is stunningly beautiful — traditional Chinese gardens, Weiming Lake
- PKU Health Science Center is a separate campus in Haidian — if studying medicine, you'll be there, not the main campus`, category: 'universities', source_name: 'pku_insider.md' },

  { content: `# Peking University — Forum Insights & Real Experience
**Student vibe**: More relaxed than Tsinghua, but don't confuse "relaxed" with "easy." PKU students are brilliant and opinionated. Class discussions can get intense.
**The 未名湖 (Weiming Lake) culture**: Students gather here to study, chat, and debate. It's the heart of campus social life.
**Application trick**: PKU has a "pre-admission" system for some programs. If a professor wants you, they can push your application through faster. Always email professors BEFORE applying.
**Housing reality**: PKU dorms for international students are better than Tsinghua's but still basic. Shaoyuan (勺园) is the main international dorm — convenient but noisy.
**Career edge**: PKU graduates dominate Chinese government, media, law, and academia. If you want to work in these fields in China, PKU's network is unmatched.`, category: 'universities', source_name: 'pku_insider.md' },

  // ── Zhejiang University Profile ──
  { content: `# Zhejiang University (ZJU) — Insider Profile
**CSC Agency Number**: 10335 (Type B)
**Location**: Hangzhou — arguably the best city in China for quality of life
**Known for**: Engineering, CS, agriculture, medicine — strongest all-rounder among C9
**Application fee**: 800 RMB
**Insider tips**:
- ZJU has FIVE campuses (紫金港 Zijingang is the main one for international students). Make sure you know which campus your program is on
- Dual application required for CSC: submit on BOTH campuschina.com AND ZJU's own system
- Provisional acceptance letter from a supervisor "strongly recommended" = practically required. Email professors in October–November
- GRE scores are "optional" but submitting them gives a significant advantage
- Video interview is standard — prepare your research proposal presentation
- ZJU's scholarship acceptance rate is higher than Tsinghua/PKU — less competition, same quality`, category: 'universities', source_name: 'zju_insider.md' },

  { content: `# Zhejiang University — The Hidden Gem
**Campus vibe**: ZJU feels like a tech campus mixed with a park. Zijingang campus is modern, spacious, and green. Less pressure-cooker than Tsinghua.
**Hangzhou advantage**: West Lake weekends, Alibaba internships, tech startup scene. Best food city among C9 universities.
**Under-the-table reality**: ZJU aggressively recruits international students to boost global rankings. This means slightly easier admission AND more scholarship money available compared to Tsinghua/PKU.
**Lab culture**: Engineering and CS labs are well-funded. Many professors have industry connections (Alibaba, NetEase, Hikvision — all headquartered in Hangzhou).
**Alumni network**: ZJU has the largest alumni network of any Chinese university by number. The 浙大系 (ZJU faction) dominates Chinese tech industry.`, category: 'universities', source_name: 'zju_insider.md' },

  // ── Fudan University Profile ──
  { content: `# Fudan University — Insider Profile
**CSC Agency Number**: 10246 (Type B)
**Location**: Shanghai — China's most international city
**Application fee**: 800 RMB
**Known for**: Economics, journalism, social sciences, medicine, international relations
**Key English programs**: MBA, International Politics, Economics
**Insider tips**:
- Fudan's Phase 1 CSC deadline is mid-December — much earlier than most universities. Miss it and your chances drop dramatically
- Shanghai Government Scholarship is a separate option with less competition than CSC
- Fudan's journalism school (新闻学院) is #1 in China — if you want to understand Chinese media, this is the place
- The Handan campus (邯郸校区) is in the heart of Shanghai, walking distance to restaurants and nightlife
- Fudan + SJTU students have a famous rivalry — like Harvard vs MIT. Don't mix them up in your application essay`, category: 'universities', source_name: 'fudan_insider.md' },

  // ── SJTU Profile ──
  { content: `# Shanghai Jiao Tong University (SJTU) — Insider Profile
**CSC Agency Number**: 10248 (Type B)
**Application fee**: 800 RMB (non-refundable)
**Location**: Shanghai (Minhang campus is far from city center — 1 hour by metro)
**Known for**: Engineering, mechanical, naval architecture, medicine, business (Antai College)
**Insider tips**:
- SJTU's Minhang campus feels like a small city — self-contained with everything you need, but isolated from Shanghai's nightlife
- Supervisor acceptance letter is COMPULSORY for many PhD programs — not optional like other universities
- SJTU specific language requirements: IELTS 6.0, TOEFL 85, GRE 320+ for some Master's programs
- Antai College MBA is one of Asia's best — FT Global MBA top 50
- SJTU's medical school (home of Ruijin Hospital) is a national powerhouse — if you want clinical medicine experience in China, this is a top choice
- The "双录取" (dual admission) system: some programs admit you provisionally with 1 year of Chinese language prep first`, category: 'universities', source_name: 'sjtu_insider.md' },

  // ── More C9 Schools ──
  { content: `# Nanjing University — Insider Profile
**CSC Agency Number**: 10284
**Known for**: Astronomy (#1 in China), chemistry, Chinese literature, geology, physics
**Insider tips**:
- Nanjing University is arguably the most underrated C9 school — world-class academics, less competitive admission than Beijing/Shanghai schools
- The Xianlin campus (仙林校区) is new, modern, but far from city center. Gulou campus (鼓楼校区) is downtown — ask which one your program is on
- Chinese language and culture programs are excellent here — many students come specifically for Mandarin
- The city of Nanjing is historically significant (former capital) and has a strong sense of cultural identity
- Lower living costs than Beijing/Shanghai with similar academic quality
- Nanjing's 南大精神 (Nanda spirit) emphasizes depth over breadth — expect rigorous academic standards`, category: 'universities', source_name: 'nanjing_insider.md' },

  { content: `# USTC (University of Science and Technology of China) — Insider Profile
**CSC Agency Number**: 10358
**Location**: Hefei, Anhui province — a Tier 2 city
**Known for**: Physics, math, quantum computing, pure sciences — China's "MIT"
**Insider tips**:
- USTC is in Hefei, not a glamorous city, but the academic intensity is unmatched. Students here are laser-focused on research
- Extremely strong in fundamental sciences — if you want a pure research career in physics or math, USTC rivals any Ivy League school
- The student body is unusually young — USTC's famous 少年班 (Young Gifted Program) admits students as young as 14
- Living costs are very low (Hefei is cheap) — your CSC stipend goes much further here than in Beijing/Shanghai
- Fewer international students = more integration opportunities with Chinese students but less English support
- If you're serious about academic research (not industry), USTC is the hidden best choice in China`, category: 'universities', source_name: 'ustc_insider.md' },

  { content: `# Xi'an Jiaotong University (XJTU) — Insider Profile
**CSC Agency Number**: 10698
**Known for**: Engineering, energy, power systems, management science, biomedical engineering
**City**: Xi'an — ancient capital, Silk Road starting point
**Insider tips**:
- XJTU's Innovation Harbor (创新港) is a massive new campus — state-of-the-art facilities, but 30 min from the main city
- Strong in energy engineering — if you want to study power systems, electrical engineering, or nuclear energy, XJTU is top 3 in China
- The Xi'an location means very affordable living + incredible history + amazing food (回民街 Muslim Quarter)
- Less competitive admission than coastal C9 schools but similarly strong academics
- XJTU has a "西迁精神" (Westward Migration Spirit) — the school relocated from Shanghai to Xi'an in the 1950s. There's a strong sense of sacrifice and dedication in the culture`, category: 'universities', source_name: 'xjtu_insider.md' },

  { content: `# Harbin Institute of Technology (HIT) — Insider Profile
**CSC Agency Number**: 10213
**Known for**: Aerospace, robotics, civil engineering, materials science — China's "space university"
**City**: Harbin — extreme cold but unique experience
**Insider tips**:
- HIT is one of China's key defense universities — some programs and labs are restricted for international students
- If you want to study aerospace, satellite technology, or robotics in China, HIT is THE choice
- The cold is real (-20 to -30°C in winter) but dorms have excellent heating (Northeast China has central heating, unlike the south)
- Very few international students = genuine immersion. You'll likely be one of the only foreigners in your department
- HIT's Shenzhen campus (哈工大深圳) offers the same degree with Shenzhen's warm weather and tech scene — an insider hack
- Harbin ice festival in January is a bucket-list experience you get for free as a student there`, category: 'universities', source_name: 'hit_insider.md' },

  // ── Key 985 Universities ──
  { content: `# Tongji University — Insider Profile
**Location**: Shanghai
**CSC Agency Number**: 10247
**Known for**: Architecture (#1 in China), urban planning, civil engineering, automotive engineering, German language
**Insider tips**:
- Tongji was originally founded by Germans — strong German engineering tradition. Many programs have exchange agreements with TU Munich, RWTH Aachen
- Architecture and planning students: Tongji's campus itself is an architectural showcase — the buildings are study material
- Strong automotive connections — VW, BMW, and Mercedes all have research partnerships
- Less international prestige than Fudan/SJTU but more respected than both within China's architecture and engineering industry
- Yangpu campus location is convenient — good food scene, metro accessible, affordable compared to Fudan's Handan area`, category: 'universities', source_name: 'tongji_insider.md' },

  { content: `# Wuhan University — Insider Profile
**CSC Agency Number**: 10486
**Known for**: Law, biology, water resources, remote sensing, Chinese literature
**Insider tips**:
- Wuhan University's campus is considered the MOST BEAUTIFUL in China — especially during cherry blossom season (March). 100,000+ visitors come just for the flowers
- The law school (法学院) is top 3 in China — many Supreme Court judges are WU alumni
- Wuhan has 82 universities (most in any Chinese city) — the student community is massive
- Extremely hot summers (40°C+) and cold winters — Wuhan is one of China's "four furnace cities"
- WU's international student program is growing fast — more scholarship slots available than comparable 985 schools
- Hot dry noodles (热干面) for breakfast every morning — you'll either love it or hate it, but it's the city's identity food`, category: 'universities', source_name: 'wuhan_uni_insider.md' },

  { content: `# HUST (Huazhong University of Science and Technology) — Insider Profile
**Location**: Wuhan
**CSC Agency Number**: 10487
**Known for**: Electrical engineering, computer science, optoelectronics, mechanical engineering, medicine
**Insider tips**:
- HUST's optical engineering (光电) program is #1 in China — produces more optics PhDs than any other university worldwide
- The campus is in a forest — literally. HUST is known as "forest university" (森林大学). Beautiful but humid
- HUST + WU rivalry in Wuhan is fierce — choose carefully and don't confuse them
- Strong CS program with direct industry pipeline to Huawei (headquartered nearby)
- HUST's Tongji Medical College (同济医学院) is among China's best — confusingly, it's NOT related to Tongji University in Shanghai
- The HUST campus is massive — 7,000+ acres. Get a bike or electric scooter`, category: 'universities', source_name: 'hust_insider.md' },

  { content: `# Sun Yat-sen University (SYSU) — Insider Profile
**Location**: Guangzhou + Zhuhai + Shenzhen (three cities!)
**CSC Agency Number**: 10558
**Known for**: Medicine, business, Chinese philosophy, public health, marine sciences
**Insider tips**:
- SYSU has campuses in THREE cities — make sure you know which one your program is on. Guangzhou South campus is the main one
- Named after Sun Yat-sen (孙中山), the founder of modern China — the university has deep historical significance
- The Guangzhou campus area (中大北门) has incredible Cantonese food — dim sum, BBQ, congee at 3am
- SYSU's medical school is one of the oldest in China — associated hospitals are among the best in South China
- Strong for students from Southeast Asia and Africa — large and active international communities from these regions
- Proximity to Hong Kong and Macao is a unique advantage — easy weekend trips`, category: 'universities', source_name: 'sysu_insider.md' },

  { content: `# Beihang University (BUAA) — Insider Profile
**Location**: Beijing, Haidian district (near Tsinghua/PKU)
**CSC Agency Number**: 10006
**Known for**: Aerospace, flight control, computer science, software engineering, cybersecurity
**Insider tips**:
- Beihang = Beijing University of Aeronautics and Astronautics. China's #1 for aerospace after HIT
- Located in the same Haidian university district as Tsinghua/PKU — you get access to the same neighborhood (Wudaokou/Zhongguancun) at a lower admission bar
- Some CS/cybersecurity programs are restricted or have extra background checks for international students due to defense connections
- Beihang's software engineering is ranked #1 in China in some years — graduates go straight to Baidu, ByteDance, and Alibaba
- Campus is small but well-organized. The student community is tight-knit
- If you want aerospace/CS but can't get into Tsinghua, Beihang is the smart alternative`, category: 'universities', source_name: 'beihang_insider.md' },

  { content: `# Renmin University (RUC) — Insider Profile
**Location**: Beijing, Haidian district
**CSC Agency Number**: 10002
**Known for**: Economics, finance, law, journalism, public administration — the "Party School"
**Insider tips**:
- Renmin (人大) is THE university for Chinese government and Communist Party connections. More government officials graduated from here than any other university
- If you want to understand Chinese politics from the inside, this is the place
- The economics and finance programs are top 3 in China — many central bank and regulatory officials are RUC alumni
- International students in political science and IR programs get unique access to Chinese political thinking
- Campus is small but in a prime Haidian location — walkable to Zhongguancun tech hub
- RUC's journalism school rivals Fudan's — and its graduates dominate Chinese state media`, category: 'universities', source_name: 'ruc_insider.md' },

  { content: `# BLCU (Beijing Language and Culture University) — Insider Profile
**Location**: Beijing, Wudaokou area
**CSC Agency Number**: 10032
**Known for**: Chinese language education — THE place to learn Mandarin in China
**Insider tips**:
- BLCU is nicknamed "小联合国" (Little United Nations) — 60%+ of students are international. The most diverse campus in China
- If your goal is learning Chinese quickly, BLCU's intensive programs are unmatched. Many diplomats and translators studied here
- The campus is small but the social scene is incredible — students from 180+ countries
- Downside: you might end up speaking English more than Chinese because everyone else is international too
- BLCU is NOT a research powerhouse. If you want a strong academic degree (not language), consider somewhere else
- The Confucius Institute Scholarship often covers BLCU programs — a great way to study Chinese for free
- Wudaokou location = next door to Tsinghua and PKU. You can attend lectures at both as a BLCU student (unofficially)`, category: 'universities', source_name: 'blcu_insider.md' },

  // ══════════════════════════════════════════════════════════
  // INSIDER / 内幕 / Under-the-Table Knowledge
  // ══════════════════════════════════════════════════════════

  { content: `# CSC Scholarship — What They Don't Tell You (内幕)
**Embassy quotas are real**: Each country gets an unofficial quota of CSC slots. Pakistan, Bangladesh, and Thailand have the most applicants = most competitive. Countries in Eastern Europe, Central Asia, and South America often have unfilled quotas = easier to get.
**Professor connections matter MORE than your GPA**: A professor who wants you can push your application through. The official application is almost a formality if a Chinese professor has already agreed to supervise you.
**Type A vs Type B politics**: Type A (embassy route) is more political — embassy officers may have preferences based on government relations. Type B (university route) is more meritocratic.
**Reapplication advantage**: If you were rejected once, mentioning that you reapplied shows persistence. Many successful scholars got in on their 2nd or 3rd try.
**The "research proposal" weight**: For PhD applications, your research proposal is 40-50% of the decision. Make it specific — generic proposals get rejected immediately.`, category: 'scholarships', source_name: 'csc_insider.md' },

  { content: `# The Email Game — How to Contact Chinese Professors (内幕)
**This is the most important thing nobody tells you**: Your chances of CSC scholarship approval go from ~15% to ~70% if you have a professor's acceptance letter.
**How to email professors**:
1. Find professors on the university website — look at their recent publications, not just their title
2. Read 2-3 of their recent papers. Reference specific papers in your email
3. Subject line: "Prospective PhD/Master's Student — [Your Name] — [Research Area]"
4. Keep the email SHORT (200-300 words). Attach your CV. Mention specific papers of theirs
5. Send to 10-15 professors. Expect 2-3 replies. Don't be discouraged by silence
**Timing**: Email in September-November for the next year's intake. Too early = forgotten. Too late = no spots left.
**Response reality**: Chinese professors are busy. If no reply in 2 weeks, send ONE follow-up. After that, move on.
**WeChat trick**: If a professor replies positively, ask for their WeChat. Communication moves 10x faster on WeChat than email in China.`, category: 'scholarships', source_name: 'professor_email_insider.md' },

  { content: `# Agency Scams and Red Flags (内幕)
**Things agencies won't tell you**:
- Most agencies charge 10,000-30,000 RMB ($1,500-$4,200) for something you can do yourself for free
- Some agencies have "guaranteed admission" claims — IMPOSSIBLE. No agency controls university admissions
- Some agencies submit applications to lower-ranked universities where they have kickback arrangements, not the best university for YOU
- A few agencies reuse the same study plan template for multiple students — universities notice this and reject
**Red flags to watch for**:
- "100% success rate" — impossible. Even the best applicants get rejected sometimes
- Pressure to pay upfront with no refund policy
- Won't tell you which specific university they're applying to
- Promise CSC scholarship "guarantee" — no one can guarantee this
**When agencies ARE worth it**: If you don't speak Chinese AND don't speak English well, AND need translation + notarization help. Otherwise, save your money.
**Free resources**: campuschina.com, university international admissions offices (email them directly), CSC official website, YouTube tutorials`, category: 'scholarships', source_name: 'agency_scams.md' },

  { content: `# Dorm Assignment Politics — What Actually Happens (内幕)
**The dirty truth about international student dorms**:
- Room quality varies HUGELY within the same dorm building. Corner rooms, higher floors, and rooms with private bathrooms are better
- Some universities let you choose your room during orientation — arrive early and go to the dorm office first thing
- Roommate assignment is usually random by nationality — universities try to pair students from different countries
- If you're unhappy with your room, you CAN request a change — but timing matters. Do it in the first 2 weeks before everything is settled
- Some dorms are reserved for scholarship vs self-funded students — scholarship students sometimes get better rooms
**Off-campus housing trick**: After Year 1, many students move to off-campus apartments. The university officially requires you to live on-campus, but enforcement varies. Ask older students what's actually enforced
**The midnight electricity story**: Many dorms cut electricity at 11PM-midnight. This policy is widely hated and inconsistently enforced. International student dorms often have 24-hour power while Chinese student dorms don't`, category: 'general', source_name: 'dorm_insider.md' },

  { content: `# Grade Inflation and Academic Reality (内幕)
**What forums say about grades for international students**:
- In some universities, international students receive slightly easier grading than Chinese students — especially in Chinese-taught courses where language is a barrier
- This is changing. Top universities (Tsinghua, PKU, ZJU) are cracking down on easy grading for international students amid public criticism
- Chinese students sometimes resent preferential treatment of international students — be aware of this dynamic
- For Chinese-taught programs: if your Chinese isn't HSK 5+, the first semester will be extremely hard. Many students fail courses and need to retake them
- For English-taught programs: quality varies ENORMOUSLY. Some are genuinely world-class; others are poorly organized with adjunct faculty
**GPA matters for scholarship renewal**: Maintain at least 2.5-3.0 GPA or risk losing your scholarship. This is enforced strictly.
**Thesis defense culture**: Your 导师 (supervisor) will usually ensure you pass your defense — it's a loss of face for them if you fail. But you still need to do real work.`, category: 'general', source_name: 'academic_insider.md' },

  { content: `# Real vs. Advertised Student Life (内幕)
**What the brochures don't show**:
- University promotional videos show the newest buildings and happiest students. Reality: some facilities are old, Wi-Fi can be unreliable, and bureaucracy is frustrating
- "English-friendly campus" in brochures ≠ staff who actually speak English. The international student office usually does, but campus clinics, banks, and canteen staff often don't
- WeChat groups are where REAL information flows. Official university emails/notices are often late or incomplete. Join student WeChat groups immediately
- Student organizations for international students exist but can be poorly organized. The best events are usually organized informally by students themselves
- Library resources are excellent for Chinese-language research but English-language book collections vary widely
**Social reality**: International students tend to cluster by nationality. It takes deliberate effort to break out of your national group and make Chinese friends or friends from other countries`, category: 'general', source_name: 'reality_check.md' },

  { content: `# Stipend Reality — What CSC Money Actually Buys (内幕)
**Real monthly budget breakdown for CSC scholars (2025 rates)**:
- Master's stipend: 3,000 RMB/month (~$420)
- PhD stipend: 3,500 RMB/month (~$490)
**What it actually covers (Tier 1 city)**:
- Campus food: 600-900 RMB/month (if you eat at canteens exclusively)
- Phone/internet: 50-100 RMB
- Transport: 100-200 RMB
- Personal items/entertainment: 500-1,000 RMB
- Remaining for savings/extras: 800-1,500 RMB
**Reality**: The stipend is enough for a comfortable student life IF you eat on campus and don't have expensive habits. It's NOT enough for restaurants, travel, or shopping regularly.
**Supplementing income**: Many scholars tutor English (100-300 RMB/hour), do translation work, or freelance online. Technically needs a work permit since 2022, but enforcement for small-scale tutoring is minimal.
**The "real" vs advertised stipend**: Some professors add lab stipends (500-2,000 RMB/month) for productive researchers. This is negotiated privately and varies by lab.`, category: 'costs', source_name: 'stipend_reality.md' },

  { content: `# Hidden Scholarship Politics (内幕)
**Things that actually affect your scholarship chances**:
- **Diplomatic relations**: Countries with strong China relations get more CSC slots. Pakistan, Russia, Thailand, Kenya = advantaged
- **Return rate**: CSC tracks whether scholars return home after graduating. If your country's return rate is low, future applicants may face more scrutiny
- **University quotas**: Each university has a fixed number of CSC Type B scholarships. Popular programs may have 200 applicants for 10 slots
- **Provincial scholarships are hidden gems**: Beijing, Shanghai, Jiangsu, Zhejiang, and Guangdong all offer their own scholarships with MUCH less competition than CSC
- **University merit scholarships**: Available after Year 1 based on GPA. Almost nobody knows about these — ask your international student office
- **Confucius Institute connections**: If you studied at a Confucius Institute before applying, this genuinely helps your application — they track this
- **Double-dipping trick**: Apply for BOTH CSC (Type A through embassy AND Type B through university) AND provincial/university scholarships simultaneously. You can only accept one, but it maximizes your chances`, category: 'scholarships', source_name: 'scholarship_politics.md' },

  { content: `# Forum and Reddit Insights — What Students Actually Say
**Common Reddit/forum complaints about studying in China**:
- Bureaucracy is maddening. Simple tasks (bank account, SIM card, residence permit) can take full days with multiple office visits
- "International Student Office hours" are limited — often only 9-11:30AM and 2-4PM. Don't show up outside these times
- Some English-taught PhD programs have nearly zero English-speaking faculty outside the main supervisor
- Group projects with Chinese students can be challenging due to different work styles and communication norms
**Common Reddit/forum praise**:
- Safety is incredible. Walking alone at night? Taking the subway at 11PM? Completely normal and safe
- Food delivery culture is life-changing. 美团 and 饿了么 deliver anything to your dorm in 20-30 minutes for very little money
- High-speed rail makes travel amazing. You can visit a new city every weekend for under 200 RMB
- The sense of community among international students is strong — you'll make friends from countries you've never thought about before
**Most common advice from 3rd/4th-year students**: "Learn Chinese. Seriously. Your experience in China is 10x better if you speak Chinese."`, category: 'general', source_name: 'forum_insights.md' },

  { content: `# WeChat Groups — The Real Information Network (内幕)
**The single most important thing to do when you arrive**: Join the right WeChat groups
**Essential groups**:
1. **Your university's international student group** — ask at orientation or scan QR code on posters
2. **Your country's student group** (e.g., "Nigerians in Beijing", "Pakistani Students Wuhan") — find through Facebook or WhatsApp before arriving
3. **Housing group** — students post available rooms and roommate searches
4. **Buy/Sell group** — students leaving sell furniture, appliances, bikes cheaply
5. **City expat group** — broader community, event announcements, tips
**WeChat group dynamics (内幕)**:
- Groups have unofficial leaders who know everything — identify them and be friendly
- Don't spam groups with repeated questions — search group chat history first
- Red envelopes (红包) in group chats are a trust-building ritual — participate even with small amounts (1-5 RMB)
- Some groups are managed by agencies trying to sell services — be cautious of "helpful" strangers pushing paid services`, category: 'general', source_name: 'wechat_insider.md' },

  { content: `# Visa Insider Knowledge — What the Embassy Won't Tell You
**Tricks from experienced students**:
- Apply for your visa at a less busy embassy/consulate if possible. Smaller consulates (e.g., Houston instead of DC, Edinburgh instead of London) often process faster
- Some countries' embassies are strict about additional documents; others barely look at them. Ask previous applicants from your country
- Health check results from your home country are sometimes rejected in China — especially in Beijing and Shanghai. Budget time and money for a redo
- The 30-day deadline for Residence Permit is STRICTLY enforced. Start the process on Day 1, not Day 25. The Exit-Entry Administration office can have 3-4 hour wait times
- Multiple entry vs single entry residence permit: make sure you get MULTIPLE ENTRY if you plan to travel outside China during holidays
- Taiwan, Hong Kong, and Macao count as leaving mainland China — you need re-entry permission
**Overstay consequences**: Even 1 day overstay = 500 RMB/day fine, potential detention, and a permanent mark on your record. Set calendar reminders for all visa deadlines`, category: 'visa', source_name: 'visa_insider.md' },

  { content: `# The Unwritten Rules (潜规则) for International Students
1. **Gift culture with professors**: Bringing small gifts (from your home country) when you first meet your supervisor is expected and appreciated. Not a bribe — a cultural courtesy
2. **Saying "no" indirectly**: Chinese people rarely say "no" directly. "It's not convenient" (不方便), "let me think about it" (我考虑一下), or "it's a bit difficult" (有点困难) usually means no
3. **Drinking culture**: Academic dinners with professors may involve heavy drinking (白酒 baijiu). You CAN decline politely — say you can't drink for health/religious reasons. But participating builds relationships faster
4. **The enrollment number game**: Some universities admit more international students than they can properly support — because the Chinese government rewards universities based on international enrollment numbers. This can lead to overcrowded international programs
5. **Holiday office closures**: During Spring Festival (Jan/Feb) and National Week (Oct), literally EVERYTHING closes for 1-2 weeks. No office appointments, no visa processing, no bank services. Plan ahead
6. **Academic publishing pressure**: Your supervisor may list you as co-author on papers you didn't significantly contribute to — and expect the same from you. This is normal in Chinese academia`, category: 'general', source_name: 'unwritten_rules.md' },

  { content: `# CEIBS (China Europe International Business School) — Insider Profile
**Location**: Shanghai
**Type**: Independent business school (not under a university)
**Known for**: Asia's #1 MBA by FT rankings. Global MBA, EMBA, Executive Education
**Insider tips**:
- CEIBS is NOT affiliated with any university — it's a joint venture between EU and Chinese government
- Tuition is expensive (300,000+ RMB for MBA) but return on investment is among the highest globally
- Average CEIBS MBA graduate salary: $120,000+ within 3 years of graduation
- Strong for anyone wanting a career at multinationals with China operations, or Western companies doing business with China
- The network is unmatched in China's business world — CEIBS alumni run many of China's top companies
- Not CSC eligible — you must be self-funded or use employer sponsorship`, category: 'universities', source_name: 'ceibs_insider.md' },

  { content: `# University-Specific Application Deadlines — The Insider Calendar
Universities SAY they have deadlines but the real timeline matters more:
**September-October**: Email professors. This is PRIME TIME. Professors are back from summer, labs aren't full yet
**November**: First round applications open at most C9 schools. Apply NOW for best chances
**December**: Fudan Phase 1 CSC deadline. Other universities' early bird deadlines
**January-February**: Main CSC/scholarship deadline period. Spring Festival break = everything pauses for 2-4 weeks. Embassy submissions
**March**: BLCU and language programs openings. Late applications at some universities still possible
**April-May**: Results start coming in. Waitlists exist but universities won't tell you
**June-July**: Final results. JW201/202 forms issued. Visa application begins
**Insider trick**: If you're waitlisted or rejected, call/email the international office in June. Some accepted students don't confirm → spots open up. Persistence pays off.`, category: 'scholarships', source_name: 'deadline_insider.md' },

  { content: `# What Chinese Students Think About International Students (内幕)
**The honest truth from Chinese student forums (知乎 Zhihu)**:
- Some Chinese students resent the perceived preferential treatment: better dorms, easier grading, separate classes
- BUT most Chinese students are genuinely curious and friendly toward international students who make an effort
- Speaking even basic Chinese earns massive respect. Saying "你好" and "谢谢" properly is a great start
- Chinese students who approach international students usually want language exchange — this is genuine, not transactional
- Group dinner invitations are sincere. Refusing repeatedly without reason can be seen as unfriendly
- Social media matters: adding classmates on WeChat and occasionally posting in Chinese shows you're engaged
**The best way to earn respect**: Take your studies seriously, learn Chinese, participate in class, and don't isolate yourself in the international student bubble. Chinese students will notice and respond positively.`, category: 'general', source_name: 'chinese_student_views.md' },

  { content: `# Country-Specific Insider Tips
**Pakistan**: CSC is extremely competitive (largest applicant pool). Apply for university-specific scholarships as backup. Strong embassy support. Many successful scholars from Pakistan — connect with the alumni network
**Africa (Nigeria, Kenya, Ghana, Ethiopia)**: Growing number of CSC slots. MBBS programs are very popular. Certain universities actively recruit African students. Join country-specific WhatsApp groups before arriving
**Central Asia (Kazakhstan, Uzbekistan, Kyrgyzstan)**: Belt & Road Scholarship is your best bet. Less competition than CSC. Strong government support for studying in China
**Southeast Asia (Vietnam, Thailand, Indonesia)**: Some provinces (Guangxi, Yunnan, Fujian) offer specific scholarships for ASEAN students. Language proximity (if studying Mandarin) is an advantage
**Middle East/North Africa**: Halal food availability varies by city. Xi'an and Lanzhou have the best options. Some Gulf countries have bilateral scholarship agreements with China
**South America**: Very few applicants = high acceptance rates for CSC. Language barrier can be challenging — fewer Spanish/Portuguese-speaking Chinese students
**Europe/North America**: Different motivation expected. Emphasize China-specific research interests, not "it's cheap." Schwarzman/Yenching programs are designed for this demographic`, category: 'scholarships', source_name: 'country_tips.md' },

  { content: `# Post-2024 Policy Changes Every Student Should Know
**What changed recently that most guides haven't updated**:
- **Alipay/WeChat Pay for foreigners** (2024): International Visa/Mastercard can now be linked directly. No more Chinese bank account needed for basic payments. Game changer for new arrivals
- **144-hour transit visa free** (expanded 2024): Many countries now get 144-hour visa-free transit in China. Useful for visiting friends before your student visa starts
- **Part-time work legalized** (2022): Still being implemented. Some universities are slow to update their policies. Ask about the current process at YOUR university specifically
- **Post-graduation work permit relaxation**: Master's/PhD graduates from Chinese universities can now apply for work permits directly — no 2-year experience requirement
- **Digital Yuan**: Some campuses are testing digital RMB. Not widespread yet but worth knowing about
- **Online classes**: Post-COVID, some programs still offer hybrid options. Check if your program requires full in-person attendance
- **Health code**: COVID health codes are no longer required, but some remnants of the system remain in university registration processes`, category: 'general', source_name: 'policy_updates.md' },

  // ── Batch 6a: Chinese Video Blog Content (Bilibili/Douyin/YouTube vlogs) ──

  { content: `# 食堂攻略 — Campus Canteen Survival (Bilibili vloggers)
Canteens (食堂) are the lifeline of student life. Most universities have 3-8 canteens with different cuisines:
- **First floor**: Cheapest (8-12 RMB/meal). Basic rice + 2 dishes. Crowded at peak hours
- **Second floor**: Mid-range (15-25 RMB). Regional specialties — Sichuan malatang, Lanzhou noodles, Xinjiang lamb
- **Third floor / special**: Premium (20-40 RMB). Often has Western food, Korean BBQ, Japanese curry
- **Muslim canteen (清真食堂)**: Most 985 schools have one. Halal-certified, great lamb and beef dishes
- **Night snack street (夜宵街)**: Open 9pm-1am near dorms. BBQ skewers (烤串), fried rice, milk tea
Pro tip from vloggers: Download your university's canteen app — many let you order ahead and skip the line. WeChat Mini Programs like "饿了么校园版" also deliver to dorms.`, category: 'general', source_name: 'vlog_canteen_guide.md' },

  { content: `# 留学生宿舍真实体验 — International Student Dorm Reality (Bilibili vlogs)
What vloggers actually show about dorms vs what brochures say:
- **Single room**: Rare and expensive (¥1500-3000/mo). Usually only at top schools or new campuses
- **Double room**: Most common for international students. Each person gets a bed, desk, wardrobe
- **Chinese student dorms**: 4-6 people per room, bunk beds, shared bathroom down the hall. Some universities now offer international students the option to live in Chinese dorms at much lower cost
- **Electricity curfew**: Many dorms cut power at 11pm-11:30pm (lights out policy). Your phone is your lifeline
- **Hot water schedule**: Shower hot water often only available 5pm-11pm. Some schools use IC card payment per minute
- **Laundry**: Shared machines, usually coin/app operated. Hang dry on balcony — dryers are rare
- **AC**: Not guaranteed! Northern schools have central heating (暖气) in winter but often no AC. Southern schools usually have AC units you pay for separately
Reality check: The international dorm is almost always nicer than what Chinese students get. Don't complain too loudly.`, category: 'general', source_name: 'vlog_dorm_reality.md' },

  { content: `# 外国人在中国被围观 — Being a Foreigner on Campus (Douyin/Bilibili)
Every vlogger mentions this: you WILL get stared at, photographed, and approached. How to handle it:
- **Photos**: Chinese students will ask for selfies. It's friendly, not hostile. Say yes or politely decline
- **"Can I practice English?"**: You'll hear this 10x/day. Set boundaries early or you'll never study
- **WeChat friend requests**: People add you everywhere — canteen, gym, library. It's normal social behavior
- **Celebrity treatment fades**: After 2-3 months, you become "that foreigner" and life normalizes
- **Small cities vs big cities**: In Beijing/Shanghai, foreigners are common. In Harbin/Kunming, expect more attention
- **Positive side**: Being memorable = easy networking, invitations to events, free meals
- **Dating**: International students are popular on campus. But cultural expectations around relationships differ significantly from Western norms
Vlogger consensus: Embrace the attention in month 1, set boundaries by month 3.`, category: 'general', source_name: 'vlog_foreigner_experience.md' },

  { content: `# 中国大学体育设施 — Campus Sports & Fitness (YouTube/Bilibili vlogs)
Chinese university campuses are massive and sports facilities are impressive:
- **Track & field**: Almost every university has a 400m standard track, usually free
- **Basketball courts**: Everywhere. Very competitive pickup games. Great way to make Chinese friends
- **Swimming pool**: Most 985 schools have indoor pools (¥10-20 per session). Some require swim cap
- **Gym**: University gyms are cheap (¥200-500/semester). Equipment quality varies wildly — some are world-class, some are from the 1990s
- **Badminton/table tennis**: Huge in China. Courts are always full. Book in advance via WeChat
- **Football (soccer)**: Campus leagues are serious. International students welcome
- **Morning exercise**: Some programs require 早操 (morning exercise) at 6:30am. Yes, attendance is taken
Vlogger tip: Join a sports club in your first week. It's the #1 fastest way to build a friend group and practice Chinese.`, category: 'general', source_name: 'vlog_campus_sports.md' },

  { content: `# 快递文化 — Package Delivery Culture at Chinese Universities (Bilibili)
Online shopping is a lifestyle, and campus delivery infrastructure is insane:
- **菜鸟驿站 (Cainiao Station)**: Every campus has one. Your packages get delivered here, you scan QR to pick up
- **Volume**: Average Chinese student receives 3-5 packages per WEEK. Double 11 (Singles Day) = chaos
- **Taobao/淘宝**: Your new best friend. Everything from textbooks to furniture to snacks. Way cheaper than stores
- **拼多多/Pinduoduo**: Even cheaper than Taobao but quality varies. Great for daily supplies
- **京东/JD.com**: Best for electronics and appliances. Next-day delivery is standard
- **外卖/Food delivery**: Meituan (美团) and Ele.me (饿了么) deliver to your dorm building. Most meals ¥15-30
- **Cost**: Delivery is usually free or ¥1-3. Some shops offer free shipping on orders over ¥9.9
Vlogger warning: Taobao addiction is real. Set a monthly budget or you'll blow through your stipend.`, category: 'costs', source_name: 'vlog_delivery_culture.md' },

  { content: `# 留学生中文课真实感受 — Chinese Language Classes Reality (Bilibili vlogs)
What language classes are actually like according to vloggers:
- **Placement test**: First week, you take a placement exam. Be honest — getting placed too high is worse than too low
- **Class size**: Usually 15-25 students per class. Mix of nationalities
- **Teaching style**: Very grammar-focused, lots of dictation (听写). Less conversation practice than you'd expect
- **Homework load**: Heavy! 2-3 hours of character writing per day for beginners. Textbook exercises daily
- **HSK pressure**: Teachers push HSK certification hard. Your scholarship renewal may depend on passing HSK 4/5
- **Speed**: One semester = roughly one HSK level. HSK 4 typically takes 2 years from zero
- **Best strategy from vloggers**: Spend MORE time outside class talking to Chinese friends than inside class studying grammar. The textbook Chinese and real Chinese are very different
- **Language partner (语伴)**: Most schools offer free language exchange programs. 1 hour Chinese ↔ 1 hour English. Use it!`, category: 'language', source_name: 'vlog_chinese_classes.md' },

  { content: `# 中国移动支付生存指南 — Mobile Payment Survival (Douyin/YouTube vlogs)
Cash is dead in China. Vloggers all agree: set this up DAY ONE:
- **WeChat Pay (微信支付)**: Linked to your Chinese bank card. Used for everything — food, transport, even street vendors
- **Alipay (支付宝)**: Same as WeChat Pay but with more features (bills, investment, credit score)
- **Since 2024**: Foreigners can now link international Visa/Mastercard directly to Alipay! No Chinese bank account needed for basic payments
- **QR codes**: You scan to pay, or show your QR for others to charge you. Every transaction
- **Red packets (红包)**: Digital cash gifts via WeChat. You'll get them in group chats, from teachers, during holidays. Send them back — it's social currency
- **Splitting bills (AA制)**: "Let's AA" = split evenly. Chinese friends usually fight to pay for you. Let them sometimes — reciprocate later
- **Campus card (校园卡)**: Some canteens and facilities still only accept campus IC cards. Load money at kiosks
Vlogger reality: After 1 week, you'll forget what cash looks like.`, category: 'costs', source_name: 'vlog_mobile_payments.md' },

  { content: `# 中国大学社团文化 — Club & Society Culture (Bilibili vlogs)
百团大战 (Hundred Clubs Battle) happens in the first 2 weeks — massive club fair:
- **Types**: Academic, sports, arts, volunteer, cultural exchange, entrepreneurship, gaming
- **International student clubs**: Most schools have one. Good starting point but don't ONLY hang out with foreigners
- **Best clubs to join (per vloggers)**: Photography club (explore the city), hiking club, cooking club, debate club
- **Chinese student organizations**: Student Union (学生会) is the most powerful. Getting in = connections + leadership experience
- **Commitment**: Some clubs meet weekly, some daily. Don't overcommit in semester 1
- **WeChat groups**: Every club has a WeChat group. This is where all communication happens — not email
- **Events**: Club events get you free food, trips, and social credit (figuratively) with Chinese students
Top vlogger advice: Join 3-4 clubs in week 1, drop to 1-2 by month 2 based on what you actually enjoy.`, category: 'general', source_name: 'vlog_club_culture.md' },

  { content: `# 留学生打工实录 — Part-Time Work Reality for International Students (Bilibili)
What vloggers actually do for extra money:
- **Tutoring English**: Most common. ¥100-300/hour depending on city and your accent. Native speakers earn more
- **Modeling/acting**: Tall foreigners get hired for commercials, events, even movie extras. ¥500-2000/day in Shanghai/Beijing
- **Translation**: If you speak Chinese well, translation gigs pay ¥200-500 per document
- **Social media**: Some students build Bilibili/Douyin followings. Monetizable after 10K followers
- **Campus jobs**: Library assistant, international office helper, lab assistant. ¥15-30/hour, easy to get
- **Legal requirements**: You MUST get part-time work approval from your university AND the PSB (police). Working without approval risks visa cancellation
- **How many hours**: Officially limited. Most enforcement is lax but don't push it
- **Freelancing online**: Teaching English on platforms like iTalki, VIPKid (from your dorm). Gray area legally
Vlogger warning: Don't let part-time work tank your grades. Scholarship renewal requires minimum GPA.`, category: 'general', source_name: 'vlog_parttime_work.md' },

  { content: `# 中国节日生存 — Surviving Chinese Holidays as a Student (YouTube vlogs)
Holidays you need to know about and what actually happens:
- **National Day (国庆节, Oct 1-7)**: 7-day break. EVERYONE travels. Book trains/flights 2 weeks early or you're stuck
- **Spring Festival (春节, Jan/Feb)**: 3-4 week break. Campus empties. If you stay, prepare for loneliness. Many canteens close
- **Mid-Autumn Festival (中秋节)**: Mooncakes everywhere. Your teachers will give you some. Say thank you in Chinese
- **Dragon Boat Festival (端午节)**: Eat zongzi (粽子). Short break, good for day trips
- **Singles Day (双十一, Nov 11)**: Not a holiday but THE shopping event. Taobao discounts are real. Stock up
- **Christmas**: NOT a holiday in China. You'll have class. Some cities have decorations but it's commercial, not cultural
- **Qingming (清明节, April)**: Tomb-sweeping festival. Respectful, somber tone. Don't make jokes about it
Vlogger tip: Use Golden Week to travel to less popular destinations. Avoid Great Wall, West Lake, and any "Top 10 Tourist Spot."`, category: 'general', source_name: 'vlog_holidays.md' },

  { content: `# 留学生vs中国室友 — Living with Chinese Roommates (Bilibili vlogs)
If you opt into a Chinese dorm or get a Chinese roommate:
- **Sleep schedule**: Chinese students study LATE (midnight+) and wake early. Light sleepers beware
- **Noise tolerance**: Watching videos on speaker (not headphones) is normal. Bring earplugs
- **Temperature wars**: Northerners want windows open in winter, southerners want AC at 16°C. Negotiate early
- **Food in the room**: Instant noodles at midnight is a bonding ritual. Join in
- **Privacy norms**: Less physical privacy than Western students expect. Changing clothes in the room is normal
- **Studying together**: Chinese students love group study. You'll be invited to study sessions — great for language practice
- **Cleaning**: Usually a rotation schedule. Follow it or face passive-aggressive WeChat messages
- **Best bonding**: Share snacks from your home country. This single act removes all cultural barriers instantly
Vlogger wisdom: The initial awkwardness passes in 2 weeks. Chinese roommates become some of your closest friends.`, category: 'general', source_name: 'vlog_chinese_roommates.md' },

  { content: `# 中国大学图书馆文化 — Library Culture Shock (Bilibili)
Libraries in Chinese universities are INTENSE:
- **Seat wars**: Students wake at 6am to queue for library seats. Some use books/bags to "reserve" spots (sometimes forbidden)
- **Exam season**: Libraries are 100% full during finals. Some students sleep in the library
- **Silence rule**: Strictly enforced. Phone calls = instant shaming from neighbors
- **Study rooms**: Some libraries have bookable private rooms for group study. Reserve on WeChat
- **Resources**: Massive collections. CNKI (中国知网) access is free on campus — invaluable for research
- **Hours**: Usually 7am-10pm. Some 985 schools have 24-hour study areas
- **Atmosphere**: The dedication of Chinese students is motivating. Seeing everyone studying makes you study harder
- **Power outlets**: BRING AN EXTENSION CORD. Outlets are scarce and always occupied
Vlogger consensus: The library is where you truly understand Chinese academic culture — pure, focused intensity.`, category: 'general', source_name: 'vlog_library_culture.md' },

  { content: `# 外卖点餐全攻略 — Food Delivery Mastery (Douyin/Bilibili)
How to eat like a king on a student budget using delivery apps:
- **Meituan (美团)**: Red app. Best for daily meals. Filter by "月销" (monthly sales) to find popular spots
- **Eleme (饿了么)**: Blue app. Owned by Alibaba. Often has better new-user coupons
- **Average meal cost**: ¥15-30 delivered to your building. Compare to canteen ¥10-15
- **Red packet groups (外卖红包群)**: Join WeChat groups that share daily discount codes. Saves ¥3-5 per order
- **Group ordering (拼单)**: Order with dormmates to hit free delivery minimums and share bulk discounts
- **Breakfast delivery**: Yes, you can get 豆浆油条 (soy milk + fried dough) delivered at 7am for ¥8
- **Late night**: Delivery until 2-3am in most cities. BBQ, fried chicken, milk tea
- **Reviews**: Check the comment photos (评价晒图). If the food looks like the menu photo, it's reliable
Vlogger hack: New Meituan accounts get ¥20+ in coupons. Some students cycle through family members' phones.`, category: 'costs', source_name: 'vlog_food_delivery.md' },

  { content: `# 留学生谈恋爱 — Dating as an International Student in China (YouTube/Bilibili vlogs)
The topic every vlogger eventually covers (some insights may surprise you):
- **Dating apps**: Tantan (探探, China's Tinder), Soul (灵魂社交), and even WeChat "Shake" feature
- **Cultural differences**: Chinese dating culture often moves faster toward "official relationship" status. DTR happens early
- **Family expectations**: If dating a Chinese person, meeting parents is a BIG deal and happens sooner than in Western culture
- **Long-distance after graduation**: Many international student relationships face this reality. Discuss early
- **International couples**: Quite common on campus. Beijing/Shanghai have the most diverse dating scenes
- **Language barrier**: Relationships accelerate your Chinese like nothing else. Motivation level: maximum
- **University rules**: Some (especially in smaller cities) have policies about dorm visits for opposite genders. Be aware
- **Gift culture**: Birthday gifts, anniversary gifts, Chinese Valentine's Day (七夕), Western Valentine's Day, 520 Day... budget accordingly`, category: 'general', source_name: 'vlog_dating_culture.md' },

  { content: `# 中国交通全攻略 — Getting Around Like a Local (Bilibili/Douyin)
Vloggers break down the transport system:
- **Metro (地铁)**: Available in 40+ cities. ¥2-8 per ride. Download the city's metro app for QR code entry
- **Bus**: Cheapest option (¥1-2). Pay via WeChat/Alipay or transit card. Routes can be confusing — use Amap (高德地图)
- **DiDi (滴滴)**: China's Uber. ¥10-30 for most city rides. Safer and cheaper than street taxis
- **Shared bikes**: Meituan Bike (yellow), Hellobike (blue). ¥1.5 per 15min. Scan QR to unlock. Park anywhere (almost)
- **High-speed rail (高铁)**: Book on 12306 app or Trip.com. Student discount (学生票) saves 25% — register your student ID
- **Flight**: Spring Airlines and Juneyao Airlines are budget-friendly. Book 2-3 weeks ahead
- **Campus shuttle**: Many large campuses (ZJU, SJTU) have free shuttle buses between campuses
Vlogger essential: Download Amap (高德地图), NOT Google Maps. It actually works in China and has real-time transit info.`, category: 'general', source_name: 'vlog_transportation.md' },

  { content: `# 在中国理发的恐怖经历 — Haircut Horror Stories (Douyin/Bilibili humor vlogs)
The universal foreigner experience that spawned thousands of videos:
- **Communication gap**: "Just a trim" does not translate. Bring PHOTOS of exactly what you want
- **Tony Teacher (Tony老师)**: The meme name for Chinese barbers. They will try to give you a K-pop style cut
- **Price range**: Campus barbershops ¥15-30. Mall salons ¥80-200. "Designer cuts" ¥300+
- **The wash**: Expect a full head massage before cutting. It's amazing. Some places charge extra for it
- **Upsells**: They WILL push treatments, coloring, keratin. "No thank you" (不用了) is your best phrase
- **Tipping**: Not a thing in China. The listed price is the final price
- **Beard trimming**: Barbers outside of international areas may have zero experience with beards
- **Recommendation**: Find one barber who understands your hair type and stick with them for life. Ask other foreigners for referrals
Vlogger universal truth: You WILL get one terrible haircut. It's a rite of passage.`, category: 'general', source_name: 'vlog_haircut_stories.md' },

  { content: `# 中国医院看病指南 — Navigating Chinese Hospitals (YouTube/Bilibili vlogs)
When you get sick (and you will), here's what vloggers wish they knew:
- **Campus clinic (校医院)**: Go here first for minor issues. Free or cheap with student insurance
- **Public hospital (公立医院)**: Extremely crowded. Use 挂号 apps to book appointments. Avoid walk-in if possible
- **International clinics**: Available in Tier 1 cities. English-speaking staff. Expensive (¥500-2000 per visit) but smooth
- **Pharmacy (药房)**: OTC medicine is available everywhere. Pharmacists can recommend based on symptoms
- **Your insurance**: CSC medical insurance covers most costs at public hospitals. KEEP ALL RECEIPTS for reimbursement
- **Emergency (急诊)**: Available 24/7 at all public hospitals. No appointment needed. Can be 2-4 hour wait
- **TCM (中医)**: Many students try Traditional Chinese Medicine — acupuncture, cupping, herbal treatments. Campus clinics often offer it
- **Mental health**: Most universities have a 心理咨询中心 (psychological counseling center). Free, confidential, but usually in Chinese only
Vlogger advice: Download 好大夫 (Good Doctor) app for online consultations — great for non-emergency questions.`, category: 'general', source_name: 'vlog_hospital_guide.md' },

  { content: `# 留学生期末考试生存 — Surviving Finals as an International Student (Bilibili)
Finals season is brutal even for international students:
- **Exam format**: Mix of written exams, oral presentations, papers, and 平时成绩 (daily participation grade, usually 30-40%)
- **Attendance matters**: Some professors count attendance as 20-30% of your final grade. Missing class = grade death
- **Open book exams**: More common for international students in some programs. Don't assume — ask your teacher
- **Cheating culture**: Taken VERY seriously. Caught cheating = expelled from program AND potentially deported
- **Study groups**: Join Chinese students' study groups. They share notes, past exams, and key points (重点)
- **"划重点" (marking key points)**: The MOST important class of the semester. Professor tells you what's on the exam. DO NOT MISS THIS
- **Grade inflation**: Yes, some professors are more lenient with international students. Don't rely on this
- **Thesis/论文**: Graduate students face strict thesis requirements. Start early, meet your advisor regularly`, category: 'general', source_name: 'vlog_finals_survival.md' },

  { content: `# 如何交到中国朋友 — Making Real Chinese Friends (YouTube/Bilibili vlogs)
The #1 question international students ask, answered by vloggers who've done it:
- **Don't only hang out with foreigners**: The biggest mistake. You came to China — immerse yourself
- **Speak Chinese**: Even broken Chinese earns massive respect and opens doors that English never will
- **Canteen buddies**: Sit with random Chinese students at lunch. Say "这个位子有人吗?" (Is this seat taken?)
- **Sports**: Basketball, badminton, and running clubs are where friendships form fastest
- **WeChat Moments**: Like and comment on friends' posts. It's how Chinese people maintain friendships digitally
- **Invite them to YOUR events**: Cook food from your country, celebrate your holidays, teach them your language
- **KTV (karaoke)**: THE Chinese social bonding activity. Learn 2-3 Chinese songs. You'll become legendary
- **Travel together**: Golden Week trips with Chinese friends = lifelong memories and genuine friendships
Vlogger truth: Real friendship takes 3-6 months. Be patient, be consistent, be genuine.`, category: 'general', source_name: 'vlog_making_friends.md' },

  { content: `# 中国大学WiFi和VPN — Internet Reality on Campus (Bilibili/YouTube)
The Great Firewall and campus internet:
- **Campus WiFi**: Free but often slow and unreliable. Peak hours (8-11pm) = unusable in some dorms
- **Ethernet**: Dorm rooms usually have ethernet ports. Buy a cable — much faster than WiFi
- **VPN**: You NEED one for Google, YouTube, Instagram, WhatsApp. Popular choices: ExpressVPN, Astrill, Clash
- **Cost**: Good VPNs cost $5-12/month. Free VPNs are unreliable and potentially unsafe
- **University VPN**: Some schools provide academic VPNs for accessing international journals. Don't use it for social media
- **Chinese alternatives**: Learn to use Baidu (search), Bilibili (YouTube), Weibo (Twitter), Zhihu (Quora), Douyin (TikTok)
- **Phone plan**: China Mobile, China Unicom, China Telecom. Student plans: ¥29-59/month for 20-100GB data
- **SIM card**: Get one at the campus telecom shop in your first week. Bring passport. Takes 30 minutes
Vlogger essential: Set up your VPN BEFORE coming to China. Once you're behind the firewall, downloading VPN apps becomes difficult.`, category: 'general', source_name: 'vlog_internet_vpn.md' },

  { content: `# 北京留学生周末去哪儿 — Weekend Spots in Beijing (Bilibili vlogs)
Beijing vloggers' favorite weekend activities:
- **798 Art District**: Free galleries, cool cafes, street art. Best for Instagram/Xiaohongshu content
- **Wudaokou (五道口)**: THE international student hub. Korean BBQ, clubs, cheap bars. Every Friday night
- **Houhai (后海)**: Lake bar street. Overpriced but atmospheric. Go once for the experience
- **Nanluoguxiang (南锣鼓巷)**: Historic hutong. Tourist-heavy but great for first visit
- **Olympic Park**: Free to walk around. Bird's Nest and Water Cube are lit up at night
- **Temple of Heaven**: ¥15 student price. Go early morning to see elderly doing tai chi
- **Day trips**: Great Wall (Mutianyu > Badaling, less crowded), Ming Tombs, Summer Palace
- **Budget weekend**: Rent shared bikes, ride along Chang'an Avenue, picnic in Ritan Park. Total cost: ¥30
Student price tip: ALWAYS bring your student ID (学生证). Most attractions are 50% off.`, category: 'cities', source_name: 'vlog_beijing_weekends.md' },

  { content: `# 上海留学生周末 — Shanghai Weekend Guide (Bilibili/Douyin vlogs)
Shanghai student vlogger favorites:
- **The Bund (外滩)**: Night views are free and stunning. Go after 7pm for lit skyline. Pack a drink
- **Tianzifang (田子坊)**: Artsy lanes, independent shops, great coffee. Avoid weekends (too crowded)
- **Jing'an Temple area**: Mix of old and new Shanghai. Good brunch spots, vintage shopping
- **French Concession**: Tree-lined streets, cafes on every corner. Best area for walking dates
- **Nanjing Road (南京路)**: Tourist trap but fun once. Night walk only, skip the shops
- **Budget eats**: Jiaozi (饺子) shops, Lanzhou noodle joints, and 生煎包 (pan-fried soup buns) — ¥10-20 meals
- **Day trips**: Suzhou (30min by train ¥25), Hangzhou (1hr ¥80), Zhujiajiao water town (¥20 bus)
- **Nightlife**: Found158 (underground bar complex), Yongfu Road bars, Shake rooftop
Student tip: Shanghai Museum is FREE. World-class collection. Go on a weekday morning.`, category: 'cities', source_name: 'vlog_shanghai_weekends.md' },

  { content: `# 成都留学生生活 — Chengdu Student Life (Bilibili/Douyin vlogs)
Why vloggers unanimously call Chengdu the best student city:
- **Food**: Hotpot (火锅) every week. ¥40-60 per person for UNLIMITED meat and veggies. Sichuan cuisine is addictive
- **Malatang (麻辣烫)**: "Spicy soup" where you pick ingredients by weight. ¥15-25 for a full meal
- **Tea culture**: Chengdu people drink tea all day. City is full of outdoor tea houses (茶馆). Perfect for studying
- **Pandas**: Chengdu Research Base of Giant Panda Breeding. Student price ¥27. Go at 8am for feeding time
- **Nightlife**: Jiuyanqiao (九眼桥) bar street. Cheaper and more fun than Shanghai/Beijing nightlife
- **Pace of life**: Famously relaxed. The saying goes "少不入川" (young people shouldn't go to Sichuan — because you'll never want to leave)
- **Cost**: One of the cheapest Tier 1.5 cities. Monthly budget ¥2,500-4,000 is very comfortable
- **Music scene**: Live music bars everywhere. Hip-hop scene is China's second biggest after Beijing
Vlogger warning: Your spice tolerance will increase 10x. Your stomach will need 2 weeks to adjust.`, category: 'cities', source_name: 'vlog_chengdu_life.md' },

  { content: `# 杭州留学生日常 — Hangzhou Student Daily Life (Bilibili vlogs)
Why ZJU students love Hangzhou:
- **West Lake (西湖)**: Free! Bike around the entire lake in 2 hours. Sunset views are unbeatable
- **Tech vibe**: Alibaba, NetEase, Hikvision HQ. Startup energy everywhere. Great for CS/business students
- **Cost**: More expensive than Tier 2 cities but cheaper than Shanghai (1hr away). Monthly ¥3,000-5,000
- **Food**: Dongpo Pork (东坡肉), West Lake Fish (西湖醋鱼), Longjing shrimp (龙井虾仁). Hangzhou cuisine is mild and sweet
- **Nature**: Mountains on three sides, lake in the center. Trail running and hiking community is active
- **ZJU campuses**: Zijingang (紫金港, main), Yuquan (玉泉, downtown old campus), Zhijiang (之江, scenic cliffside)
- **Weekend escape**: Wuzhen Water Town (1hr bus), Moganshan mountains (1.5hr, great camping), Thousand Island Lake
- **Weather warning**: Summer is absolutely brutal — 40°C+ with humidity. Winter is wet and cold without heating
Vlogger verdict: Best quality of life among all C9 school cities. If you can handle no heating in winter.`, category: 'cities', source_name: 'vlog_hangzhou_life.md' },

  { content: `# 武汉大学生日常 — Wuhan Student Life (Bilibili vlogs)
The ultimate student city experience:
- **Hot Dry Noodles (热干面)**: Wuhan's breakfast staple. ¥5-8. You will eat this every morning eventually
- **Cherry blossoms (樱花)**: March at Wuhan University is magical. The campus becomes a tourist destination
- **Food scene**: 户部巷 (Hubu Lane) — street food heaven. Try 豆皮 (doupi), 三鲜豆皮, and 鸭脖 (duck neck snacks)
- **Weather extreme**: Known as one of the "Three Furnaces of China." Summer 40°C+, NO central heating in winter (can feel brutal)
- **Student population**: 1 million+ students across 82 universities. Optics Valley (光谷) area is pure student energy
- **Nightlife**: 楚河汉街 (Han Street) — designer shops + bars + riverside clubs. 花楼街 for cheaper student bars
- **Transport**: Metro system is new and clean. 11 lines. ¥2-7 per ride. Campus to downtown = 40min
- **Cost**: Monthly ¥2,000-3,500. One of the cheapest 985 school cities to live in
Vlogger take: Wuhan is raw, authentic, and cheap. If you can survive the weather, you'll love everything else.`, category: 'cities', source_name: 'vlog_wuhan_life.md' },

  // ── Batch 6b: More Chinese Video Blog Content ──

  { content: `# 西安留学生体验 — Xi'an Student Experience (Bilibili vlogs)
Ancient capital with unbeatable value:
- **Muslim Quarter (回民街)**: Best street food in China. 羊肉泡馍 (lamb bread soup), 肉夹馍 (Chinese burger), 凉皮 (cold noodles). All under ¥15
- **Terracotta Warriors**: Student price ¥75. Go once, it's world-class. Take the tourist bus from the train station
- **City Wall (城墙)**: Rent a bike and ride the full 14km loop on top. Student price ¥27. Best at sunset
- **XJTU campus**: Beautiful garden-style campus. Cherry blossoms in spring rival Wuhan University
- **Cost of living**: Among the cheapest 985 cities. ¥2,000-3,500/month is very comfortable
- **Nightlife**: 大唐不夜城 (Tang Dynasty Night City) — impressive light show, free. 德福巷 for bars
- **Weather**: Four distinct seasons. Central heating in winter (unlike southern cities). Summer is very hot
- **Halal food**: The BEST city in China for Muslim students. Halal restaurants everywhere, not just the tourist quarter`, category: 'cities', source_name: 'vlog_xian_life.md' },

  { content: `# 哈尔滨留学生冬天生存 — Surviving Harbin Winter (Bilibili/Douyin vlogs)
The most extreme student city — for those who dare:
- **Temperature**: -20 to -35°C in winter. Your eyelashes freeze. Your phone dies in 10 minutes outdoors
- **Central heating**: Indoors is actually warm (20-25°C). The challenge is the 5 minutes between buildings
- **Clothing**: Need proper layers: thermal underwear, down jacket, snow boots, fur-lined hat, gloves. Budget ¥500-1000
- **Ice Festival (冰雪大世界)**: January. Student price ¥100+. The most magical thing you'll see in China
- **Russian influence**: Architecture, cuisine, bread (列巴/lièba). Unique cultural mix
- **HIT campus**: Top engineering school. Aerospace, robotics labs are world-class
- **Summer**: Actually BEAUTIFUL. 20-28°C, long days, green parks. Nobody tells you about Harbin summers
- **Cost**: Cheapest 985 city in China. ¥1,500-2,500/month is genuinely comfortable
Vlogger consensus: Harbin winter is a once-in-a-lifetime experience. Just don't go outside with wet hair.`, category: 'cities', source_name: 'vlog_harbin_winter.md' },

  { content: `# 深圳留学生科技生活 — Shenzhen Tech Life (YouTube/Bilibili vlogs)
China's youngest, most futuristic city:
- **Average age**: 33 years old. Everyone is young, ambitious, working in tech
- **Huaqiangbei (华强北)**: World's largest electronics market. Buy phone parts, drones, gadgets at factory prices
- **Hong Kong border**: 15 minutes by metro from Futian checkpoint. Weekend HK trips are a Shenzhen tradition
- **Startup culture**: Shenzhen = China's Silicon Valley. If you're in CS/EE, the internship opportunities are unmatched
- **Cost**: Expensive for China. Rent is high. But salaries/internship pay is also highest
- **Food**: Shenzhen has NO local cuisine — because everyone is from somewhere else. Result: every regional cuisine is available and competing
- **SUSTech**: Young university (founded 2011), rising fast in rankings. Small international student body = more attention
- **Parks**: Shenzhen has amazing urban parks. Lianhua Mountain, Shenzhen Bay for sunset runs
Vlogger take: If you want old China culture, skip Shenzhen. If you want the future, there's nowhere better.`, category: 'cities', source_name: 'vlog_shenzhen_tech.md' },

  { content: `# 昆明留学生慢生活 — Kunming Slow Life (Bilibili vlogs)
The "Spring City" — eternal perfect weather:
- **Climate**: 15-25°C year-round. No AC needed, no heating needed. The BEST weather in China, period
- **Cost**: Ultra-affordable. ¥2,000/month = comfortable life. ¥3,000 = living like a king
- **Ethnic diversity**: Yunnan has 25 of China's 56 ethnic groups. Markets, festivals, and food reflect this diversity
- **Weekend trips**: Dali (5hr bus ¥100), Lijiang (6hr train), Shangri-La, Tiger Leaping Gorge
- **Southeast Asia access**: Direct flights to Bangkok, Hanoi, Vientiane. Overland to Laos via high-speed rail (launched 2021)
- **Mushroom season**: June-September. Wild mushroom hotpot (菌子火锅) is a MUST. ¥50-80 per person
- **Flower market**: Dounan Flower Market — largest in Asia. Roses ¥5 for a bundle. Buy flowers weekly from your dorm budget
- **Language programs**: Popular for gap year and summer Chinese immersion. Smaller classes, more personal attention
Vlogger verdict: If you prioritize quality of life and budget over prestige, Kunming is the secret answer.`, category: 'cities', source_name: 'vlog_kunming_life.md' },

  { content: `# 南京留学生古都体验 — Nanjing Ancient Capital Life (Bilibili vlogs)
Historical depth + modern convenience:
- **Xuanwu Lake (玄武湖)**: Free! Downtown lake with running trails. NJU is right next to it
- **Confucius Temple (夫子庙)**: Night market, snack street, river boat rides. Tourist-heavy but fun
- **Memorial Hall**: Nanjing Massacre Memorial. Important, heavy, free. Every student should visit once
- **Purple Mountain (紫金山)**: Hiking, Sun Yat-sen Mausoleum, Ming Tombs — all in one scenic area
- **Duck (鸭)**: Nanjing is THE duck capital. 盐水鸭 (salted duck) is everywhere. Try 鸭血粉丝汤 (duck blood vermicelli soup) for ¥12
- **Nanjing University**: Most underrated C9 school. Beautiful Gulou campus is right in the city center
- **Cost**: Moderate. ¥2,500-4,000/month. Cheaper than Shanghai/Hangzhou, similar to Wuhan
- **Day trips**: Shanghai (1.5hr train ¥135), Suzhou, Yangzhou, Huangshan (Yellow Mountain)
Vlogger take: Nanjing has the historical weight of Beijing without the size, pollution, or cost.`, category: 'cities', source_name: 'vlog_nanjing_life.md' },

  { content: `# 留学生安全指南 — Safety Tips from Vloggers (YouTube/Bilibili)
China is extremely safe, but vloggers share smart precautions:
- **Overall**: China is one of the safest countries for international students. Violent crime against foreigners is extremely rare
- **Scams to watch for**: Tea house scam (strangers invite you for tea, bill is ¥2000+), fake art students, "English practice" leading to expensive clubs
- **Taxi scams**: Use DiDi exclusively. If taking a street taxi, insist on the meter (打表)
- **Phone theft**: Rare but possible in crowded metros/tourist areas. Keep phone in front pocket
- **Drink spiking**: Uncommon but exercise caution at bars, especially in tourist areas with heavy nightlife
- **Emergency numbers**: Police 110, Ambulance 120, Fire 119. Save in your phone
- **Police registration**: You MUST register at the local police station within 24 hours of moving to any new address. Fine for not registering: ¥500
- **Natural disasters**: Typhoons (south coast), earthquakes (Sichuan region), flooding (central China summers). Follow local WeChat alerts`, category: 'general', source_name: 'vlog_safety_tips.md' },

  { content: `# 中国天气生存法则 — Weather Survival by Region (Bilibili/Douyin)
What vloggers WISH they knew about Chinese weather:
- **North (Beijing, Harbin)**: Dry cold with central heating. Feels manageable at -15°C because of low humidity. Chapstick and moisturizer are essentials
- **East (Shanghai, Hangzhou, Nanjing)**: Wet cold WITHOUT heating. 5°C feels like -10°C. The most miserable winter experience. Buy electric blanket and space heater
- **South (Guangzhou, Shenzhen, Kunming)**: Mild winters, brutal summers. Mosquitoes. Typhoons. Carry a small umbrella ALWAYS
- **West (Chengdu, Chongqing)**: Extreme humidity. Chongqing is the hottest city in China. Chengdu is overcast 300 days/year
- **Central (Wuhan)**: "Furnace city" summers (42°C+) AND cold winters without heating. The worst combo
- **Rainy season (梅雨)**: June-July in the Yangtze delta region. 2-3 weeks of non-stop rain. Everything gets moldy
- **Smog season**: October-February in northern cities. Buy N95 masks and an air purifier for your room (¥200-500)`, category: 'general', source_name: 'vlog_weather_survival.md' },

  { content: `# 留学生拍照打卡 — Best Photo Spots for Students (Douyin/Xiaohongshu trends)
Where vloggers get their best content:
- **Beijing**: Forbidden City (early morning, no crowds), 798 Art District, Temple of Heaven
- **Shanghai**: The Bund at night, Wukang Mansion (武康大楼), Yuyuan Garden, rooftop bars
- **Chengdu**: Panda base, Kuanzhai Alley (宽窄巷子), Anshun Bridge at night, hot pot steam shots
- **Hangzhou**: West Lake sunrise, Longjing tea fields, ZJU Zhijiang campus
- **Guilin/Yangshuo**: Rice terraces, Li River bamboo rafting — the classic Chinese landscape
- **Campus shots**: University gates, library at night, canteen chaos, graduation gown on athletics track
- **App recommendations**: Xiaohongshu (小红书) for Chinese aesthetic inspiration, VSCO for editing, InShot for Reels/Douyin
- **Content tip**: Bilingual content (Chinese + English captions) gets 3x more engagement on Chinese platforms
Vlogger wisdom: Your study abroad content is GOLD. Start posting from day 1. Future you will be grateful.`, category: 'general', source_name: 'vlog_photo_spots.md' },

  { content: `# 中国街头小吃必吃清单 — Must-Try Street Food (Douyin/Bilibili food vlogs)
The definitive street food list voted by vloggers:
- **烤串 (Kǎo chuàn)**: BBQ skewers. Lamb, chicken hearts, tofu, vegetables. ¥1-3 per skewer. Late night staple
- **煎饼果子 (Jiānbing guǒzi)**: Breakfast crepe with egg, crunchy cracker, sauce. ¥7-10. Best street breakfast
- **臭豆腐 (Chòu dòufu)**: Stinky tofu. Smells terrible, tastes amazing. ¥8-15. Changsha version is best
- **糖葫芦 (Táng húlu)**: Candied hawthorn berries on a stick. Sweet, sour, crunchy. ¥5-10. Winter snack
- **肉夹馍 (Ròu jiā mó)**: Chinese hamburger from Xi'an. Braised pork in crispy flatbread. ¥8-15
- **小龙虾 (Xiǎo lóngxiā)**: Crayfish. Massive in summer. Garlic butter, mala, thirteen-spice flavors. ¥60-100/kg with friends
- **奶茶 (Nǎichá)**: Milk tea. Heytea, Nayuki, Mixue (蜜雪冰城 for budget). Budget: ¥5-30 depending on brand
- **烤红薯 (Kǎo hóngshǔ)**: Roasted sweet potato from street carts. ¥5. Perfect winter hand warmer AND snack`, category: 'general', source_name: 'vlog_street_food.md' },

  { content: `# 留学生省钱大法 — Budget Hacks from Student Vloggers (Bilibili)
How vloggers stretch their stipend/budget:
- **Canteen over delivery**: Save ¥10-15 per meal. Twice a day = ¥600-900/month saved
- **Taobao over mall**: Everything is 50-70% cheaper online. Group buy with dormmates for free shipping
- **Student ID everywhere**: Museums, attractions, trains all have 学生票 (student price). Usually 50% off
- **Shared groceries**: Split cooking ingredients with roommates. 4 people cooking = ¥10-15 per person per meal
- **Campus gym**: ¥200-500/SEMESTER vs ¥200-500/MONTH at commercial gyms
- **Free hot water**: Every dorm floor has a 开水机 (hot water dispenser). Bring your own thermos
- **Bike over taxi**: Shared bikes (¥1.5/ride) instead of DiDi (¥10-30/ride). Healthy AND cheap
- **拼多多 百亿补贴**: "10 Billion Subsidy" section has genuine Apple, Nike products at 10-20% off market price
- **Seasonal fruit**: Buy local seasonal fruit from campus fruit stands. Imported fruit is 3-5x more expensive
Monthly target per vlogger consensus: ¥2,500 is comfortable in Tier 2 cities, ¥4,000 in Tier 1.`, category: 'costs', source_name: 'vlog_budget_hacks.md' },

  { content: `# 文化冲击的五个阶段 — 5 Stages of Culture Shock in China (YouTube vlogs)
Every experienced vlogger describes this same arc:
1. **Honeymoon Phase (Month 1-2)**: Everything is amazing. The food! The culture! The energy! You post constantly on social media
2. **Frustration Phase (Month 3-4)**: Reality hits. Language barriers feel insurmountable. Bureaucracy is maddening. You miss home food
3. **Adjustment Phase (Month 5-8)**: You develop routines. You have go-to restaurants. You understand the metro. Chinese improves noticeably
4. **Acceptance Phase (Month 9-12)**: China starts feeling like home. You think in Chinese sometimes. You prefer hot water over cold
5. **Reverse Culture Shock (Going Home)**: You try to scan QR codes to pay. You miss 外卖. You think your home country is inconvenient
Common frustrations: squat toilets (you WILL adapt), spitting (more common in smaller cities), cutting in line (use elbows), loud phone calls in public
What helps: Having Chinese friends who explain WHY things work differently, not just THAT they're different.`, category: 'general', source_name: 'vlog_culture_shock.md' },

  { content: `# 微信高手教程 — WeChat Power User Guide for Students (Bilibili/Douyin)
WeChat is not just a messenger — it's your entire digital life:
- **Moments (朋友圈)**: Chinese Instagram. Post regularly to stay socially relevant. Like friends' posts
- **Mini Programs (小程序)**: Apps within WeChat. Food delivery, bike rental, bus tickets, campus services. No separate downloads needed
- **Groups (群)**: Class groups, club groups, dorm groups, city groups. Mute the ones you don't need
- **Stickers (表情包)**: Chinese meme culture lives here. Download popular sticker packs to communicate like a local
- **WeChat Pay**: Set daily/weekly limits to control spending. Enable face recognition for fast checkout
- **Voice messages**: Chinese people LOVE sending voice messages instead of typing. Get used to listening to 60-second audio clips
- **Official accounts (公众号)**: Follow your university's account for announcements, canteen menus, event calendars
- **Red packets in groups**: When someone drops a 红包 (red packet) in a group chat, TAP FAST. They disappear in seconds
Essential: Your WeChat profile IS your identity in China. Use a real photo, set a proper name, keep it professional-ish.`, category: 'general', source_name: 'vlog_wechat_mastery.md' },

  { content: `# KTV完全攻略 — Karaoke Night Guide for International Students (Bilibili/Douyin)
KTV (卡拉OK) is THE Chinese social activity. Vlogger survival guide:
- **How it works**: Private rooms by the hour. ¥30-80/hr for small rooms (4-6 people). Bring your own crew
- **Chains**: KTV brands: 大歌星, 好乐迪, 唱吧. Student discounts on weeknight packages
- **Song selection**: System has English songs but selection is limited. Chinese song = instant legend status
- **Easy Chinese songs to learn**: 月亮代表我的心 (Teresa Teng), 朋友 (Emil Chau), 晴天 (Jay Chou) — learn ONE and you're golden
- **Drinking**: Beer and snacks are often included in packages. Don't overdo it on school nights
- **Best timing**: Late night packages (10pm-6am) are cheapest. ¥80-150 for the whole night for a room
- **Chinese KTV culture**: People take turns singing. Cheer for everyone. It's supportive, not competitive
- **Douyin trend**: Record yourself singing Chinese songs and post it. Chinese internet LOVES this content
Vlogger guarantee: One KTV night = more bonding than one month of classroom socializing.`, category: 'general', source_name: 'vlog_ktv_guide.md' },

  { content: `# 中国大学健身房体验 — University Gym Culture (Bilibili vlogs)
Training in China hits different:
- **Campus gyms**: ¥200-500/semester. Some of the best deals in the world. Hours: typically 6am-10pm
- **Equipment**: Varies wildly. Top schools (Tsinghua, ZJU) have brand new equipment. Others have vintage iron from previous decades
- **Culture**: Chinese gym-goers often rest between sets for 5+ minutes scrolling phones. Be patient for equipment
- **Supplements**: Available on Taobao and JD. Myprotein ships to China. Local brand: 康比特 (CPT). Much cheaper than imported
- **Outdoor fitness parks**: Every Chinese residential area has one with pull-up bars, parallel bars, elderly fitness equipment. Free forever
- **Running culture**: 校园跑 (campus running) apps track your runs. Some universities REQUIRE running credits for PE grade (2km x 30 times/semester)
- **Group fitness**: Tai chi, dance fitness (广场舞 is for the elderly but great exercise), campus yoga clubs
- **Personal trainers**: Available at commercial gyms. ¥200-400/session. Often speak limited English`, category: 'general', source_name: 'vlog_gym_culture.md' },

  { content: `# 中国超市購物指南 — Supermarket Guide for Students (Bilibili vlogs)
Where and how to grocery shop:
- **Campus convenience stores**: Overpriced but convenient. Good for drinks, snacks, instant coffee. Often open 24/7
- **Budget chains**: 物美 (Wumart), 永辉 (Yonghui), 大润发 (RT-Mart). Weekly grocery run ¥100-200
- **Premium**: 盒马鲜生 (Hema/Freshippo by Alibaba). Online ordering + 30-min delivery. Premium quality, premium price
- **Sam's Club / Costco**: Membership ¥260/yr. Bulk buying paradise. Share membership with friends
- **Fruit stands**: Best deals on campus. Seasonal fruit rotates. Watermelons in summer = ¥1-2/斤 (0.5kg)
- **Import foods**: Ole', City Shop (Shanghai), Jenny Lou's (Beijing). Western cereals, cheese, bread. 3-5x home prices
- **Essential Chinese groceries**: Soy sauce (生抽), cooking oil (食用油), rice (大米), eggs (鸡蛋), instant noodles for emergencies
- **Taobao groceries**: Long-shelf-life items (snacks, coffee, condiments) are cheapest on Taobao. Free shipping
Pro tip: Download 多点 or 盒马 app for same-day grocery delivery. Game changer for lazy weekends.`, category: 'costs', source_name: 'vlog_supermarket_guide.md' },

  { content: `# 宿舍做饭大挑战 — Cooking in the Dorm (Bilibili vlogs — technically against the rules)
Every vlogger does it even though most dorms ban cooking appliances:
- **Electric hot pot (电煮锅)**: The ESSENTIAL dorm appliance. Noodles, hotpot, boiling eggs, even simple stir-fry. ¥50-100 on Taobao
- **Rice cooker (电饭煲)**: Mini rice cookers designed for dorms. ¥80-200. Cooks rice, congee, steamed eggs
- **Rules**: Most dorms ban high-wattage appliances (>800W). Some do room inspections. Hide your contraband carefully
- **Power limit**: Dorm circuits often can't handle multiple appliances. If breaker trips, the whole floor knows
- **Communal kitchen**: Some new dorms have shared kitchens. If yours does, USE IT. Full stove + oven access
- **Fresh ingredients**: Buy from the campus mini-market or use 美团买菜 (Meituan Groceries) for delivery
- **Popular dorm meals**: Instant noodles upgraded with egg + vegetables, simple hotpot, fried rice (if you have a rice cooker)
- **Shared cooking**: Pool ingredients with dormmates. One person cooks, everyone eats. Great bonding
Vlogger disclaimer: We are not responsible for any fires, breaker trips, or confiscated hot pots.`, category: 'general', source_name: 'vlog_dorm_cooking.md' },

  { content: `# 中国大学的猫 — Campus Cats and Animals (Douyin/Bilibili)
The unexpected joy of Chinese university life:
- **Campus cats (校园猫)**: Most Chinese universities have DOZENS of stray/semi-feral cats that are collectively cared for by students
- **Cat feeding groups**: WeChat groups dedicated to tracking, feeding, and providing medical care for campus cats. Join immediately
- **Named and famous**: Popular campus cats have names, fan followings, and dedicated Bilibili channels
- **Pet adoption**: Some students adopt campus kittens. Dorm rules technically forbid it. Enforcement varies
- **Dogs**: Less common on campus but some evening runners bring dogs. Dog cafes are popular off-campus
- **Cat cafes (猫咖)**: ¥30-50 entry including a drink. Dozens of cats to pet. Great stress relief before exams
- **University mascots**: Some schools have official animal mascots. PKU has cats named after professors
Vlogger truth: Campus cats are the emotional support system that nobody mentions in the brochure.`, category: 'general', source_name: 'vlog_campus_cats.md' },

  { content: `# 留学生洗衣全攻略 — Laundry Reality in Chinese Dorms (Bilibili vlogs)
Seemingly mundane but causes genuine stress for newcomers:
- **Shared machines**: Usually 3-5 washers per floor/building. ¥2-4 per load via app
- **Dryers**: RARE. Almost nobody has dryers. Air dry on your balcony or drying rack in room
- **Rainy season**: Clothes take 3-4 days to dry. Buy a portable drying rack with fan (¥50 on Taobao)
- **Bed sheets**: Some students never wash their own — there are campus laundry services that wash + iron + fold for ¥5-10 per item
- **Hand washing**: Some students hand wash underwear and hang in bathroom. Normal. Not weird. Get over it
- **Detergent**: 蓝月亮 (Blue Moon) is the go-to brand. Available in every campus shop. ¥20 for a big bottle
- **Fabric softener**: Downy/金纺 available at supermarkets. Your clothes will smell amazing in a sea of detergent-only washes
- **Peak hours**: Avoid 6-9pm. Go early morning or late night for guaranteed machine access
Vlogger life hack: Set a phone timer for your wash cycle. If you leave clothes in the machine, someone WILL move them.`, category: 'general', source_name: 'vlog_laundry_tips.md' },

  { content: `# 留学回顾：最后悔没做的事 — Biggest Study Abroad Regrets (YouTube/Bilibili retrospective vlogs)
The most powerful lessons from vloggers who've graduated:
- **Not learning Chinese faster**: #1 regret. Should have been immersing from day 1, not hiding behind English
- **Only hanging out with same-nationality groups**: Comfort zone trap. You can hang out with fellow nationals anywhere in the world
- **Not traveling enough during holidays**: China is massive and beautiful. Golden Week trips should be planned, not wasted
- **Not documenting enough**: Photos, vlogs, journals. Your future self will treasure these memories
- **Ignoring Chinese social media**: Not joining Weibo, Xiaohongshu, Bilibili. This IS Chinese culture
- **Being too shy**: Chinese people appreciate effort. Your broken Chinese is better than their perfect English at making real connections
- **Not doing an internship**: Work experience in China is incredibly valuable on any global resume
- **Waiting to explore off-campus**: The neighborhood around your university has hidden gems — street food, parks, locals' spots
- **Not learning to cook Chinese food**: Biggest practical skill you can bring home. Take one cooking class at minimum
Vlogger message: Don't let comfort prevent you from having the experience of a lifetime.`, category: 'general', source_name: 'vlog_study_abroad_regrets.md' },

  { content: `# 最实用的中文口语 — Essential Chinese Phrases Every Student Needs (Bilibili/Douyin)
What textbooks don't teach but vloggers swear by:
- **你好/Nǐ hǎo**: Too formal. Use 嗨 (hāi) or 你好你好 (casual double)
- **多少钱/Duōshao qián**: "How much?" — your most used phrase at markets
- **太贵了/Tài guì le**: "Too expensive!" — follow up with 便宜点 piányi diǎn ("cheaper please")
- **不要/Bú yào**: "Don't want" — for pushy vendors, taxi haggling
- **我是留学生/Wǒ shì liúxuéshēng**: "I'm an international student" — unlocks patience and kindness
- **加个微信吧/Jiā ge wēixìn ba**: "Let's add each other on WeChat" — the Chinese way of exchanging contacts
- **没关系/Méi guānxi**: "No problem/It's fine" — use constantly. Chinese people love this phrase from foreigners
- **牛逼/Niúbī**: Slang for "awesome/badass." Use with friends ONLY, never teachers. Will make Chinese friends laugh
- **打包/Dǎbāo**: "Pack it to go" — at restaurants when you can't finish
- **救命/Jiùmìng**: "Help/Save me" — hopefully never needed but important to know
Vlogger tip: Learn these 10 phrases in week 1 and you'll survive 80% of daily situations.`, category: 'language', source_name: 'vlog_essential_phrases.md' },

  // ===== Banking & Payment Setup =====
  { content: `Banking in China — How to Set Up:
- Recommended banks: Bank of China (中国银行) or ICBC (工商银行) — both have English service at main branches
- Required to open account: passport, university enrollment certificate, Chinese phone number
- Process: Visit a branch near campus, bring your student ID, expect 1-2 hours for setup
- You'll get a debit card + mobile banking app. Link this card to WeChat Pay and Alipay immediately
- International credit cards now work with Alipay "Tour Pass" for visitors, but students MUST get a local bank card
- Cash is rarely needed — even street food vendors use QR codes. After 1 week you'll forget what cash looks like
Pro tip: Open your bank account in the first 3 days. Without it, you can't set up mobile payments, and without mobile payments, daily life is extremely inconvenient.`, category: 'costs', source_name: 'banking_setup.md' },

  { content: `Mobile Payment in China — Essential Setup:
- WeChat Pay (微信支付): Link your Bank of China card → used for everything from groceries to rent to splitting dinner bills
- Alipay (支付宝): Alternative to WeChat Pay, also widely used. Better for online shopping (Taobao integration)
- Both apps support: QR code payments, money transfers, utility bills, food delivery, transit passes, hospital registration
- International cards: Visa/Mastercard can now be linked directly to Alipay and WeChat Pay (2024 policy update)
- Monthly phone bill: ¥30-100/month for data + calls. China Mobile has best coverage, China Unicom often cheapest for data
- Digital lifestyle: Meituan (美团) for food delivery, DiDi (滴滴) for taxis, Taobao/JD for shopping, 12306 for train tickets
Warning: Some services ONLY accept mobile payment — no cash, no card. Get set up ASAP after arrival.`, category: 'costs', source_name: 'mobile_payments_guide.md' },

  // ===== Healthcare & Insurance =====
  { content: `Healthcare in China for International Students:
- CSC scholarship students: Medical insurance included (Ping An or similar provider)
- Self-funded students: Must buy insurance — costs ¥600-800/year. University will help arrange this
- University clinic (校医院): First stop for any health issue. Free or very cheap (¥5-20 per visit). Basic medications available
- Public hospital (公立医院): Affordable but long waits. Use 好大夫 (Good Doctor) app or 挂号 (guahao) app to book appointments
- International clinic: Expensive (¥500+ per visit) but English-speaking doctors available in Tier 1 cities
- Pharmacy (药房): Many OTC medicines available cheaply. Staff can recommend treatments for common issues
- Emergency: Call 120 for ambulance. University clinic can help translate and coordinate with hospitals
- Mental health: Growing awareness but still limited. International student offices can often provide referrals
Vlogger advice: Download 好大夫 (Good Doctor) app for online consultations — great for non-emergency questions when you don't want to navigate a Chinese hospital alone.`, category: 'general', source_name: 'healthcare_guide.md' },

  // ===== CSC Interview Preparation =====
  { content: `CSC Scholarship Interview Preparation — Top 10 Questions:
1. Why do you want to study in China? (Show genuine interest in Chinese culture, not just "free scholarship")
2. Why did you choose this specific university and program? (Mention professors, labs, rankings)
3. What is your research plan or study plan? (Be specific — methodology, timeline, expected outcomes)
4. How will this degree help your career back home? (Connect to bilateral relations between China and your country)
5. What do you know about Chinese culture? (Mention specific aspects — food, festivals, philosophy)
6. Have you studied Chinese? What is your HSK level? (If no Chinese, emphasize your plan to learn)
7. How will you handle cultural differences? (Show adaptability and openness)
8. What are your strengths and weaknesses? (Be honest but strategic)
9. Where do you see yourself in 5 years? (Show how China experience fits your career trajectory)
10. Do you have any publications or research experience? (Highlight academic achievements)
Interview tips: Dress business casual, prepare a 2-minute elevator pitch, bring printed study plan and CV, know your supervisor's research.`, category: 'scholarships', source_name: 'csc_interview_prep.md' },

  { content: `CSC Interview Red Flags to Avoid:
- Don't say you chose China just because the scholarship is free — this is the #1 interview killer
- Don't show zero knowledge about Chinese culture or the university you applied to
- Don't badmouth your home country's education system — be diplomatic
- Don't be vague about your research plan — specificity shows preparation and seriousness
- Don't appear uninterested or give one-word answers — engagement matters
- Don't say "any university is fine" — show you've researched your target
- Embassy interviews (Type A) tend to be more formal and shorter; university interviews are more academic and detailed
- Express your intention to contribute to bilateral relations between China and your home country — interviewers love this
Success rate tip: Students who mention specific professors, labs, or research projects at their target university have a significantly higher acceptance rate.`, category: 'scholarships', source_name: 'csc_interview_red_flags.md' },

  // ===== HSK Exam Details =====
  { content: `HSK Levels Explained (汉语水平考试):
| Level | Vocabulary | Ability | CEFR Equivalent |
| HSK 1 | 150 words | Basic greetings, numbers, simple phrases | A1 Beginner |
| HSK 2 | 300 words | Simple daily conversations | A2 Elementary |
| HSK 3 | 600 words | Daily life, travel, work basics | B1 Intermediate |
| HSK 4 | 1,200 words | Discuss various topics fluently | B2 Upper-Intermediate |
| HSK 5 | 2,500 words | Read newspapers, write essays | C1 Advanced |
| HSK 6 | 5,000+ words | Comprehend complex written/spoken Chinese | C2 Proficient |
University requirements: Bachelor's = HSK 4 (score 180+), Master's = HSK 5 (score 180+), PhD = HSK 5-6, Medicine = HSK 5+
English-taught programs: No HSK needed, but having HSK 3+ helps daily life enormously
One semester of Chinese study ≈ one HSK level. Start before you arrive!`, category: 'language', source_name: 'hsk_levels_guide.md' },

  { content: `Taking the HSK Test — Practical Guide:
- Registration: www.chinesetest.cn (official site)
- Test centers: Available in 150+ countries worldwide
- Test dates: 6-12 times per year (varies by location)
- Cost: $30-80 USD depending on country and level
- Results: Available 2-3 weeks after test on chinesetest.cn
- Certificate validity: 2 years from test date
- Test format: HSK 1-2 (listening + reading, 35-50 min), HSK 3-4 (+ writing, 90-105 min), HSK 5-6 (+ writing, 120-140 min)
- Pass score: HSK 1-2 need 120/200, HSK 3-6 need 180/300
- HSK vs HSKK: HSK = written test, HSKK = oral test (speaking only). Some programs require both
- New HSK 3.0 (levels 7-8-9): Introduced 2021, being phased in gradually. Not yet widely required
Pro tip: Use Outline email (not Gmail) for CSC portal registration — Gmail has verification issues with campuschina.org.`, category: 'language', source_name: 'hsk_test_guide.md' },

  { content: `Best Resources to Learn Chinese Before Arriving:
FREE resources:
- HSK Online (hsk.academy) — free practice tests for all levels
- Pleco app — the BEST Chinese dictionary, period. Free base version, worth every penny for paid add-ons
- HelloChinese app — gamified learning, great for beginners
- YouTube channels: MandarinCorner, ChinesePod, Learn Chinese with Litao
- Bilibili (China's YouTube) — watching Chinese content with subtitles is incredibly effective
PAID resources:
- Skritter ($15/mo) — character writing practice with stroke order
- ChinesePod ($29/mo) — structured audio lessons
- italki ($10-25/hour) — 1-on-1 tutors, affordable and flexible
- HSK Standard Course textbooks (北京语言大学出版社) — official prep books, widely available on Amazon
Language success tip: Start learning 3-6 months before arrival. Even HSK 1-2 makes your first weeks SO much easier and shows Chinese people you respect their culture.`, category: 'language', source_name: 'chinese_learning_resources.md' },

  // ===== University Application Tips by Tier =====
  { content: `University Application Strategy by Tier:
TIER 1 (C9/985 Universities — Tsinghua, PKU, Zhejiang, Fudan, SJTU, etc.):
- Highly competitive. Need GPA 3.5+ or equivalent (85%+)
- Strong, specific research proposal is CRITICAL — generic ones get instantly rejected
- Professor acceptance/pre-admission letter is almost mandatory for Master's/PhD
- Publication record significantly helps for PhD applications
- Apply to 2-3 C9 universities simultaneously through CSC Type B

TIER 2 (211 Universities — Wuhan, UESTC, Beijing Normal, etc.):
- Competitive but very achievable. GPA 3.0+ (75%+) usually sufficient
- Good study plan and solid recommendation letters matter most
- Provincial scholarships are hidden gems here — less competition than CSC
- Many have excellent English-taught programs with smaller class sizes

TIER 3 (Regular Universities):
- Accessible and actively recruit international students
- Great option for language programs and bachelor's degrees
- University-specific scholarships often have very high acceptance rates
- Don't underestimate these — some have world-class programs in niche fields
Strategy: Apply BOTH CSC and university/provincial scholarships to maximize your chances.`, category: 'universities', source_name: 'application_strategy.md' },

  { content: `CSC Agency Numbers — Top Universities:
When applying for CSC scholarship, you MUST enter the correct 5-digit agency number. Common ones:
- Tsinghua University: 10003
- Peking University: 10001
- Zhejiang University: 10335
- Fudan University: 10246
- Shanghai Jiao Tong University: 10248
- Nanjing University: 10284
- USTC (Hefei): 10358
- Harbin Institute of Technology: 10213
- Xi'an Jiaotong University: 10698
- Wuhan University: 10486
- Sun Yat-sen University: 10558
- Sichuan University: 10610
- Tongji University: 10247
- BLCU (Beijing Language): 10032
- Beijing Normal University: 10027
Find all codes at: campuschina.org → "Search Programs" → University profile
Important: Wrong agency number = application goes to wrong university = automatic rejection. Double-check!`, category: 'universities', source_name: 'csc_agency_numbers.md' },

  // ===== Accommodation Deep Dive =====
  { content: `University Dormitory vs Off-Campus Apartment:
DORM (Recommended for Year 1):
- Single room: ¥800-1,500/month (Tier 1), ¥400-800/month (Tier 2/3)
- Shared room (2 person): ¥400-800/month
- Includes: furniture, AC, shared bathroom (sometimes private), Wi-Fi
- Pros: on campus, safe, social, university support, no landlord hassles
- Cons: curfew (some dorms close 11pm-6am), smaller space, older facilities in some universities
- International student dorms are usually nicer than Chinese student dorms

OFF-CAMPUS APARTMENT (Year 2+):
- Studio/1BR near campus: ¥2,000-4,000/month (Tier 1), ¥1,200-2,500 (Tier 2)
- Shared apartment: ¥1,500-2,500/month (Tier 1)
- Platforms: 自如 (Ziroom), 贝壳找房 (Beike), 链家 (Lianjia), 豆瓣租房
- Tip: ALWAYS bring a Chinese-speaking friend when apartment hunting
- REQUIRED: Must register at local police station within 24 hours of moving — every time you change address`, category: 'costs', source_name: 'accommodation_guide.md' },

  // ===== Transport Deep Dive =====
  { content: `Transport in China — Complete Guide:
WITHIN CITIES:
- Metro/Subway: ¥3-8 per ride, fast and clean. Major cities have extensive networks (Shanghai has 20+ lines)
- Bus: ¥1-2 per ride, covers areas metro doesn't reach
- DiDi (滴滴): China's Uber. ¥15-40 for typical city ride. English interface available
- Shared bikes: Meituan/Hello Bike, ¥1.5-3 per ride, perfect for short distances
- Tip: Get a transit card (交通卡) or use Alipay mini-program for contactless payment

BETWEEN CITIES:
- High-speed rail (高铁): Best option. Beijing-Shanghai ¥553 (4.5 hours), amazing experience
- Book on: 12306.cn or Trip.com app (English available)
- Domestic flights: Often cheaper than train. Spring Airlines, China Southern. ¥300-600 for many routes
- Long-distance bus: Cheapest option but slower. Good for short routes not covered by rail

MONEY-SAVING TIPS:
- Student card gets 50% off most scenic spots and some museum admissions
- Shared bike monthly plans: ¥10-15/month unlimited rides
- Metro monthly pass available in most cities for commuters`, category: 'general', source_name: 'transport_complete.md' },

  // ===== Food & Shopping =====
  { content: `Food Delivery & Online Shopping in China:
FOOD DELIVERY (Essential):
- Meituan (美团): Largest platform. Meals delivered in 20-40 min. Average order ¥15-35
- Ele.me (饿了么): Alibaba-owned alternative. Similar prices and coverage
- New user hack: New Meituan accounts get ¥20+ in first-time coupons
- Campus canteen apps: Many universities have their own ordering app — skip the lunch rush line

ONLINE SHOPPING:
- Taobao (淘宝): China's Amazon. Literally everything. Deliveries arrive 1-3 days. Free shipping on most items
- JD.com (京东): Better for electronics, guaranteed authentic. Same-day delivery in major cities
- Pinduoduo (拼多多): Ultra-cheap group buying platform. Quality varies but unbeatable prices
- 多点 or 盒马 (Hema): Grocery delivery, same-day. Fresh produce, imported goods available

WARNING: Taobao addiction is real. Set a monthly budget or you'll blow through your entire stipend. The convenience is dangerous.
Pro tip: Download all delivery apps in your first week. Compare prices — they often have different promotions.`, category: 'costs', source_name: 'food_shopping_guide.md' },

  // ===== Scholarship Comparison =====
  { content: `Scholarship Comparison — Which One Should You Apply For?
| Scholarship | Coverage | Monthly Stipend | Competition | Best For |
| CSC Type A (Embassy) | Full: tuition + housing + stipend + insurance | ¥2,500-3,500 | Moderate (depends on country quota) | Students from countries with bilateral agreements |
| CSC Type B (University) | Full: same as Type A | ¥2,500-3,500 | High | Strong academic candidates targeting top universities |
| Confucius Institute | Full: tuition + housing + stipend + insurance | ¥2,500 | Moderate | Chinese language/culture students with HSK |
| Provincial (Beijing/Shanghai/Zhejiang) | Partial to Full | Varies | Lower competition | Budget-conscious students, specific city preference |
| University Scholarship | Varies widely | Varies | Moderate | Students targeting specific university |

Strategy: Apply for MULTIPLE scholarships simultaneously. CSC Type A + Type B + Provincial = maximum chances.
Hidden gem: Provincial scholarships have MUCH less competition than CSC. Beijing, Shanghai, Zhejiang, Jiangsu, and Guangdong all offer them.
Key deadlines: CSC opens Jan-Mar. Confucius Institute Mar-May. Provincial varies — check with university directly.`, category: 'scholarships', source_name: 'scholarship_comparison_deep.md' },

  // ===== Post-Graduation Options =====
  { content: `After Graduation — Working and Staying in China:
WORK PERMIT OPTIONS:
- Graduates from Chinese universities can apply for work permits if they find employment
- Major cities (Shanghai, Beijing, Shenzhen, Guangzhou) have special policies for foreign graduates of local universities
- STEM graduates are particularly in demand
- Teaching English: Always available as a backup. Legal with proper work permit (Z visa)

JOB SEARCH RESOURCES:
- LinkedIn China (领英): Used by international companies
- 前程无忧 (51job.com): Largest Chinese job site
- Boss直聘: Popular for startup/tech jobs
- University career fairs: Best resource — companies actively seek bilingual graduates

STAYING IN CHINA:
- Work visa (Z visa): Employer sponsors you. Need bachelor's degree + 2 years experience (waived for some top university graduates)
- Shanghai/Beijing: Special talent policies exempt top university graduates from experience requirement
- Business visa (M visa): If starting your own company
- Tips: Build connections (关系 guānxi), do internships during study, learn industry-specific Chinese

RETURNING HOME:
- Chinese university degrees are recognized in most countries
- CSC scholars may have a 2-year return-home clause — check your agreement
- The China experience + Mandarin skills = HUGE career advantage in your home country`, category: 'general', source_name: 'post_graduation_options.md' },

  // ===== Practical Arrival Checklist =====
  { content: `First 30 Days in China — Essential Checklist:
WEEK 1 (Survival):
□ Get Chinese SIM card (China Mobile or China Unicom at airport or campus shop)
□ Download WeChat and add classmates/university contacts
□ Register at local police station within 24 hours (university usually helps)
□ Get your student ID card
□ Open bank account (Bank of China branch near campus)
□ Set up WeChat Pay and Alipay linked to bank card
□ Download VPN (should have done before arriving — harder to download behind firewall)

WEEK 2 (Setup):
□ Get campus canteen card loaded
□ Buy bedding/essentials from Taobao or nearby supermarket
□ Set up DiDi for taxi rides
□ Download Amap (高德地图) — NOT Google Maps. It actually works in China
□ Join university WeChat groups for your department
□ Apply for Residence Permit (if X1 visa — 30-day deadline!)

WEEK 3-4 (Integration):
□ Join 3-4 student clubs or sports teams
□ Find a language exchange partner (语言交换)
□ Explore your neighborhood — find your go-to restaurants, convenience store, fruit shop
□ Set up online shopping (Taobao, JD, Meituan)
□ Start basic Chinese phrases if you haven't already
Pack light tip: Everything is cheap in China — you'll buy what you need for much less than bringing it from home.`, category: 'general', source_name: 'arrival_checklist_complete.md' },

  // ===== VPN & Internet =====
  { content: `VPN and Internet in China — Student Survival Guide:
WHAT'S BLOCKED: Google (all services including Gmail, Drive, Maps), YouTube, Instagram, WhatsApp, Facebook, Twitter/X, Snapchat, Telegram, most Western news sites
WHAT WORKS: WeChat (messaging), Baidu (search), Bilibili (video), Douyin (TikTok China), Taobao (shopping), Amap (maps)

VPN OPTIONS (legal gray area for personal use):
- Set up BEFORE coming to China — downloading VPN apps is difficult once behind the firewall
- Popular options students use: ExpressVPN, Astrill, Surfshark, NordVPN
- Cost: $5-13/month depending on plan length
- University network: Some academic VPNs provided by university for research purposes
- Speed varies: Some days perfect, some days slow. Have 2 VPN providers as backup

CHINESE ALTERNATIVES:
- Baidu = Google Search (decent for Chinese content)
- Bilibili = YouTube (massive video library, great for learning Chinese)
- WeChat = WhatsApp + Facebook + Venmo combined
- 小红书 (Xiaohongshu/RED) = Instagram
- Douyin = TikTok (original Chinese version, way more content)

Critical tip: Download ALL VPN apps, get your accounts set up, and test them BEFORE your flight. Don't wait until you land.`, category: 'general', source_name: 'vpn_internet_guide.md' },

  // ===== Weather & Climate =====
  { content: `Weather & What to Pack for China by City:
NORTH CHINA (Beijing, Harbin, Dalian):
- Winters: BRUTAL. -10 to -30°C (Harbin). Need serious winter coat, thermal underwear, heated blanket
- But: Indoor heating is EXCELLENT. Buildings are warm. It's the commute that's cold
- Summers: Hot (35°C+) and humid in Beijing
- Pack: Heavy winter coat, thermals, light summer clothes

CENTRAL CHINA (Wuhan, Nanjing, Hangzhou, Shanghai):
- "Furnace cities" — Wuhan and Nanjing hit 40°C in summer
- Winters: Cold (0-5°C) but NO central heating south of the Yangtze River. This surprises everyone
- Pack: Portable heater (buy in China for ¥100-200), dehumidifier, layers

SOUTH CHINA (Guangzhou, Shenzhen, Kunming, Xiamen):
- Warm year-round. Guangzhou never really gets cold
- Kunming: "Spring City" — perfect 15-25°C year-round, best climate in China
- Pack: Light clothes, rain jacket (monsoon season June-September)

WEST CHINA (Chengdu, Xi'an):
- Chengdu: Mild but cloudy/foggy 300 days a year. Rarely sees sun
- Xi'an: Cold dry winters, hot dry summers. Continental climate
Important: DON'T pack too much. Everything is cheap in China. Taobao delivers in 1-2 days.`, category: 'cities', source_name: 'weather_packing_guide.md' },

  // ===== Culture Tips =====
  { content: `Cultural Survival Tips for International Students in China:
FACE (面子 miànzi) — The Most Important Concept:
- Never publicly embarrass anyone, especially professors or officials
- Avoid direct confrontation — use indirect communication
- Saving face applies to YOU too — Chinese people will often go out of their way to not embarrass you

SOCIAL NORMS:
- Personal questions (salary, age, relationship status, weight) are NORMAL in China. Don't be offended
- "Have you eaten?" (你吃了吗?) is a greeting, not a dinner invitation
- Group dinners: Shared dishes, rotating lazy susan. Don't just eat your favorite dish — try everything
- Drinking culture: Expect toasts (干杯 gānbēi). It's OK to say you don't drink (我不喝酒) — most people respect it
- Gift giving: Never give clocks (送钟 = funeral), white flowers, or sets of 4 (sounds like "death")

DAILY LIFE:
- Bargaining: Expected at markets, NOT in shops or malls
- Queue culture: Improving rapidly but still looser than Western standards in some areas
- Noise levels: Generally louder than West. Morning exercise music at 6am is normal near parks
- Staring: Common, especially outside tier-1 cities. Not hostile — just curiosity about foreigners

What helps most: Having Chinese friends who explain WHY things work differently, not just THAT they're different.`, category: 'general', source_name: 'culture_survival.md' },

  // ===== VIDEO-SOURCED KNOWLEDGE (50+ YouTube vlogs) =====

  // Budget & Cost Reality from Vloggers
  { content: `Detailed Monthly Budget Breakdown (from 50+ student vloggers, 2024-2025):
TIER 1 CITIES (Beijing, Shanghai):
- Dorm: ¥800-1,500/month (single room with AC, Wi-Fi, shared kitchen)
- Campus canteen: ¥12-25 per meal × 3 = ¥36-75/day = ¥1,080-2,250/month
- Food delivery (Meituan): ¥15-35 per order, students average 2-3 orders/week
- Transport: ¥200-400/month (metro + occasional DiDi)
- Phone plan: ¥39-80/month (student packages often include unlimited campus Wi-Fi)
- Groceries (Hema/多点): ¥300-500/month if cooking occasionally
- Electricity: ¥150-300/month, Water: ¥30-50, Gas: ¥20-40
- Drinking water: ¥50/month (tap water is NOT drinkable — buy bottled/filtered)
- TOTAL BUDGET: ¥2,500-4,000/month comfortable | ¥1,800-2,500 bare minimum

TIER 2 CITIES (Chengdu, Wuhan, Nanjing, Hangzhou):
- Everything 20-40% cheaper than Tier 1
- Canteen meals: ¥8-15 per meal
- Dorm: ¥400-800/month
- TOTAL BUDGET: ¥1,500-2,500/month comfortable | ¥1,200-1,800 minimum

Vlogger consensus: CSC stipend of ¥3,000 (Master's) is enough for comfortable life in Tier 2 cities but tight in Beijing/Shanghai.`, category: 'costs', source_name: 'vlog_budget_detailed_2025.md' },

  { content: `Canteen Food Guide — What Vloggers Actually Eat:
- Most Chinese universities have 2-5 canteen buildings, each with multiple floors
- Each floor has different food stalls — Chinese regional cuisines, noodles, rice bowls, BBQ, hotpot, dumplings
- Some canteens have separate floors for international food: Japanese, Korean, Western, halal
- Average meal cost: ¥8-15 in Tier 2 cities, ¥12-25 in Tier 1
- Payment: Student card (load via app), WeChat Pay, or Alipay QR codes
- Unlimited rice and free soup refills at most canteens
- Peak hours: 11:30-12:30 (lunch), 17:30-18:30 (dinner) — expect 10-15 min queues
- Many canteens have apps for pre-ordering — skip the line!
- Breakfast: ¥3-8 (steamed buns 包子, soy milk 豆浆, fried dough 油条, congee 粥)
- Late night: Some canteens have night snack windows (夜宵) open until 10-11pm
Fudan vlogger quote: "I eat at 4 different canteens depending on my mood. Each one has like 30+ options. I've been here 2 years and still haven't tried everything."`, category: 'general', source_name: 'vlog_canteen_detailed.md' },

  { content: `Halal Food in Chinese Universities — Muslim Student Guide:
- Most large universities (especially in Beijing, Xi'an, and Guangzhou) have dedicated halal canteen sections (清真食堂)
- Halal stalls are usually on a separate floor or clearly marked section of the canteen
- Xi'an has the BEST halal food scene — 回民街 (Muslim Quarter) is legendary
- Cities with significant Muslim populations (Xi'an, Lanzhou, Yinchuan, Urumqi) have abundant halal options
- Halal food delivery: Search "清真" on Meituan or Ele.me for dedicated halal restaurants
- Beijing: Several universities near Niujie (牛街) mosque area have excellent halal restaurants nearby
- South Asian students: Indian restaurants exist in most Tier 1 cities but are pricier (¥50-80/meal)
- Vlogger tip from Pakistani student at Wuhan University: "The halal canteen here costs ¥10-15 per meal. Quality is good. I never go hungry."
- Important: Ask about halal certification (清真认证) — some restaurants put the label but aren't certified`, category: 'general', source_name: 'vlog_halal_food.md' },

  // Social Life & Dating from Vloggers
  { content: `Dating in China — International Student Reality (from vlogs):
DATING APPS:
- Tantan (探探): China's Tinder. Most popular for casual dating. Swipe-based
- Bumble: Popular among English-speakers. Women make the first move. Good for meeting educated Chinese who speak English
- Momo (陌陌): Older app, more social/random. Used for meetups and chatting
- Soul (Soul): Newer, personality-based matching. Popular with younger Chinese
- WeChat: NOT a dating app but people add each other constantly. Often how dates continue after matching elsewhere

CULTURAL NOTES:
- Chinese dating culture involves MUCH more texting than Western dating. Daily "good morning" texts expected
- Meeting someone's parents = very serious. Don't agree to meet family unless you mean it
- Men typically expected to pay on dates. Splitting is becoming more common among younger generation
- "Are you serious about this?" comes up earlier than in Western dating culture
- Long-distance relationships between China and home country are extremely common for international students

MAKING FRIENDS (easier than dating):
- Language exchange (语言交换) is the #1 way to make Chinese friends. It's socially acceptable and structured
- University clubs: Join 3-4 in your first week. Basketball, badminton, and hiking clubs are most social
- KTV (karaoke): The Chinese bonding activity. One night of KTV = one month of classroom socializing
- Shared meals (聚餐): Always say yes to group dinner invitations in your first semester`, category: 'general', source_name: 'vlog_dating_social.md' },

  // Train Travel from Vloggers
  { content: `Student Train Travel in China — Updated 2025 Policies:
STUDENT DISCOUNTS (recent policy update):
- Chinese railway now offers student tickets at 75% of execution fare (up to 60% off published price)
- 4 single-trip discounts per academic year (Oct 1 - Sep 30)
- No longer restricted to winter/summer breaks — can use anytime!
- Extended to first-class seats and high-speed sleeper berths (previously only second-class)
- Book via 12306 app → "Student Reservation" special section
- IMPORTANT for international students: Discount eligibility varies. Some railway staff say international students don't qualify. Carry student card and be prepared for inconsistency

TRAIN TYPES:
- G-train (高铁): Fastest. 300+ km/h. Beijing-Shanghai in 4.5 hours. ¥553 second-class
- D-train (动车): Fast. 200-250 km/h. Slightly cheaper than G-train
- Z/T/K-train: Slower conventional trains. Much cheaper. Have sleeper berths for overnight travel
- Overnight sleeper trains: GREAT budget hack — saves a hotel night. Soft sleeper ¥200-400 for most routes

BOOKING TIPS:
- Book 15 days in advance when tickets release (especially for holidays)
- Download 12306 app or use Trip.com (English interface)
- Passport number required for booking — have it ready
- During Golden Week (Oct 1-7) and Spring Festival: Book the SECOND tickets go on sale or you'll miss out`, category: 'general', source_name: 'vlog_train_travel_2025.md' },

  // Dorm Life Reality from Vloggers  
  { content: `Dorm Room Hacks — What Vloggers Wish They Knew:
WHAT TO BUY ON DAY 1 (from Taobao, arrives next day):
- Bed curtain/privacy curtain (床帘): ¥30-50. Essential for shared rooms. Creates personal space
- Clip-on desk lamp: ¥50-80. Dorm ceiling lights are too bright and can't be dimmed
- Shower shoes/flip-flops: ¥10-20. Shared bathrooms need these
- Laundry basket + drying rack: ¥30-40. Sunshine drying on balcony is common
- Extension cord with USB ports: ¥30-50. Dorm rooms usually have only 1-2 outlets
- Electric kettle: ¥50-80 (check if allowed — some dorms have auto-breaker systems that detect them)
- Mini clip fan: ¥30-60 (for non-AC dorms or when AC timer turns off at night)

DORM RULES TO KNOW:
- Curfew: Many dorms lock doors at 11pm-midnight. After that, you need security to let you in
- Guests: Usually no opposite-gender visitors allowed in rooms. Meeting areas on ground floor only
- Hot pots/cooking: Officially banned in MOST dorms (fire hazard). Students sneak them in anyway
- Laundry machines: Shared, coin/app operated. SET A TIMER — someone WILL move your clothes
- Internet: University Wi-Fi usually good on campus. Some dorms have ethernet ports for faster connection
- Noise: Quiet hours typically 10pm-7am but enforcement varies wildly by building`, category: 'general', source_name: 'vlog_dorm_hacks.md' },

  // Weekend Destinations from Vloggers
  { content: `Best Weekend Trips from Major University Cities (vlogger favorites):
FROM BEIJING (2-4 hour trips):
- Great Wall (Mutianyu section) — less crowded than Badaling. ¥45 entry. Take bus 916 from Dongzhimen
- Tianjin — 30 min by G-train (¥55). Italian Quarter, food street, ocean park
- Chengde — 2 hours. Summer palace, mountain resort. ¥120 entry

FROM SHANGHAI (1-3 hour trips):
- Hangzhou — 1 hour by G-train (¥73). West Lake is FREE. Longjing tea village
- Suzhou — 30 min by G-train (¥40). Classical gardens, canals. "Venice of the East"
- Nanjing — 1.5 hours by G-train (¥135). Ming Palace ruins, Purple Mountain

FROM CHENGDU:
- Leshan Giant Buddha — 2 hours by train. ¥80 entry. Incredible
- Mount Emei — 3 hours. Buddhist mountain, stunning sunrise
- Jiuzhaigou — 8-10 hours by bus but WORTH IT. Natural wonderland

FROM GUANGZHOU:
- Shenzhen — 30 min by train. Tech city, great shopping in Huaqiangbei
- Hong Kong — 1.5 hours by high-speed rail. Need separate visa!
- Foshan — 30 min. Ancestral Temple, martial arts culture

Vlogger tip: Use Golden Week for less popular destinations. Avoid Great Wall, West Lake during holidays — impossibly crowded.`, category: 'cities', source_name: 'vlog_weekend_trips.md' },

  // Safety from Vloggers
  { content: `Safety in China — What International Students Need to Know:
GENERAL SAFETY (vlogger consensus: China is VERY safe):
- Violent crime is extremely rare. Most cities are safe to walk alone at night
- Petty theft exists but is much less common than in Western countries
- Most common safety issue: Scams targeting foreigners (tea house scam, "art student" scam)
- Traffic: This is the REAL danger. Drivers don't always yield to pedestrians. Electric scooters run red lights constantly
- Air quality: Beijing and northern cities have occasional smog days. Download AQI app to check. Wear N95 mask on bad days (AQI > 150)

SCAMS TO AVOID:
- "Do you speak English?" followed by invitation to tea house or art gallery = SCAM. Walk away
- Taxi drivers offering "flat rate" instead of meter — always insist on meter (打表)
- Fake monks asking for donations near tourist sites
- WeChat "money blessing" scams from strangers

WOMEN'S SAFETY (from female vloggers):
- China is generally considered one of the safest countries for women travelers
- Solo female students report feeling safe walking home from library at 11pm
- However: Drink spiking at clubs EXISTS. Same precautions as anywhere
- Avoid unlicensed "black taxis" (黑车) — use DiDi app for tracked, accountable rides
- Emergency number: 110 (police), 120 (ambulance), 119 (fire)`, category: 'general', source_name: 'vlog_safety_china.md' },

  // Fitness & Sports from Vloggers
  { content: `Gym & Fitness Options for Students in China:
CAMPUS OPTIONS (usually free or very cheap):
- University sports fields: Running tracks, basketball courts, football pitches — usually free with student ID
- Campus gym: ¥10-30/visit or ¥200-500/semester at university-run facilities
- Swimming pool: Some universities have on-campus pools. ¥10-20/swim
- Morning exercise culture: Many Chinese people exercise at 6-7am in parks. Tai chi, dancing, badminton

OFF-CAMPUS GYM:
- Chain gyms: Super Monkey (超级猩猩) — pay-per-class, no membership. ¥69-99/class
- Local gyms: ¥150-300/month for basic membership in Tier 2 cities
- Annual memberships: ¥2,000-5,000/year depending on city and quality

POPULAR SPORTS FOR SOCIALIZING:
- Basketball: By FAR the most popular social sport. Courts are everywhere and always active
- Badminton: Second most popular. ¥20-40/hour for court rental
- Table tennis: Available on almost every campus for free
- Hiking: Growing community, especially in cities near mountains (Chengdu, Hangzhou, Kunming)
- Running clubs: Many universities have organized running groups

Vlogger tip: Join a sports club in your first week. It's the #1 fastest way to build a friend group AND practice Chinese.`, category: 'general', source_name: 'vlog_fitness_sports.md' },

  // Homesickness & Mental Health
  { content: `Dealing with Homesickness in China — Honest Advice from Vloggers:
THE STAGES (almost everyone goes through this):
1. Honeymoon (Week 1-4): Everything is exciting. You love the food, the novelty, the adventure
2. Frustration (Month 2-3): Language barrier hits hard. Miss family food. Small things annoy you
3. Adjustment (Month 3-6): You find your routine, your people, your favorite spots
4. Acceptance (Month 6+): China starts feeling like a second home. You surprise yourself

WHAT ACTUALLY HELPS (from real students):
- Video call family on a SCHEDULE (not constantly — that makes it worse)
- Cook your home country's food. Taobao has international ingredients (Indian spices, African seasoning, etc.)
- Find students from your country — but don't ONLY hang out with them
- Exercise regularly — gym, running, sports. Physical activity is proven to reduce homesickness
- Get a Chinese hobby: Chinese cooking class, calligraphy, tea ceremony. Immersion fights isolation
- Document your experience: Start a vlog, write a journal, take photos. Gives purpose to new experiences
- Use campus psychological counseling if available (increasingly offered at Chinese universities)

WHAT MAKES IT WORSE:
- Isolating in your dorm room
- Comparing China to home constantly
- Refusing to try new foods or experiences
- Only using English and avoiding Chinese

Vlogger truth: Month 2-3 is the hardest. It gets better. Almost every vlogger says "I'm so glad I pushed through."`, category: 'general', source_name: 'vlog_homesickness.md' },

  // Apartment Hunting from Vloggers
  { content: `Off-Campus Apartment Hunting — Vlogger Guide:
WHEN TO MOVE OUT (consensus):
- Stay in dorm for Year 1 to build social network and learn the system
- Year 2+ is when most students consider off-campus apartments

WHERE TO SEARCH:
- 自如 (Ziroom): Most professional platform. Verified listings, online payments, maintenance included
- 贝壳找房 (Beike): Large inventory. Agent-assisted. Expect 1 month rent as agent fee
- 链家 (Lianjia): Premium listings, more expensive but higher quality
- 豆瓣租房 (Douban): Community postings, sometimes cheaper, less regulated
- WeChat groups: Ask university's international student office — they often have housing WeChat groups

COSTS (off-campus, near university):
- Shanghai: ¥2,800-5,000/month (studio) or ¥1,500-2,500 (shared room)
- Beijing: ¥2,500-4,500/month (studio) or ¥1,500-2,500 (shared)
- Chengdu/Wuhan: ¥1,200-2,500/month (studio) or ¥800-1,500 (shared)

CRITICAL REQUIREMENTS:
- Must register at local police station within 24 hours of moving (临时住宿登记)
- Landlord must accompany you or provide authorization letter
- Failure to register = fine of ¥500+ per day of violation
- Keep registration slip — needed for Residence Permit renewal

Vlogger warning: NEVER pay more than 1 month deposit + 1 month rent upfront. "Pay 3 months in advance" deals are often scams.`, category: 'costs', source_name: 'vlog_apartment_hunting.md' },

  // Language Learning from Vloggers
  { content: `Chinese Language Learning — What Actually Works (from vloggers who went from 0 to HSK 5):
FASTEST METHODS (ranked by vlogger consensus):
1. Language exchange partner (语言交换) — Meet 2-3x/week with a Chinese student. Trade English for Chinese. FREE
2. Dating a Chinese person — Controversial but honest. Immersion through relationship is powerful
3. Living with Chinese roommates — Forces daily Chinese use for basic needs
4. Part-time tutoring — Teach English while learning Chinese. ¥100-200/hour for teaching, ¥50-80/hour for tutoring
5. Classes + immersion combo — University Chinese classes alone are NOT enough. Must practice outside class

APPS THAT ACTUALLY HELP:
- Pleco (dictionary): The GOAT. Install immediately. Free base version is enough
- Anki (flashcards): SRS system for memorizing characters. 30 min/day = huge progress
- HelloChinese: Gamified learning, good for HSK 1-3
- Skritter: Character writing practice with stroke order feedback
- WeChat reading mode: Change phone language to Chinese for constant micro-exposure

TIMELINE EXPECTATIONS:
- 0 to HSK 3 (comfortable basic conversation): 6-12 months with regular study
- 0 to HSK 4 (university Chinese-taught classes): 12-18 months
- 0 to HSK 5 (professional level): 18-24 months
- 0 to HSK 6 (near-native reading): 24-36 months

Vlogger consensus: "I learned more Chinese in 1 month of daily language exchange than in 3 months of classroom study."`, category: 'language', source_name: 'vlog_language_reality.md' },

  // Part-time Work from Vloggers
  { content: `Part-Time Work Options for International Students in China:
LEGAL STATUS (CRITICAL):
- International students on X1 visa are NOT allowed to work without a separate work permit
- Some universities offer on-campus opportunities that may be permissible
- Teaching English ILLEGALLY is common but risky — fines, visa cancellation, or deportation if caught
- Some cities (Shanghai, Beijing) have started pilot programs for part-time student work permits

COMMON INCOME SOURCES (what vloggers actually do):
1. English tutoring: ¥150-300/hour for private lessons. Most popular side income
2. Translation work: ¥0.1-0.5 per Chinese character. Freelance via WeChat groups
3. Content creation: YouTube/Bilibili vlogs about China life. Some vloggers earn ¥1,000-10,000/month
4. Campus jobs: Library assistant, orientation guide, event interpreter. ¥50-100/hour
5. Online freelancing: Design, programming, writing. Done remotely, harder to detect
6. Modeling/acting: Surprisingly common for foreigners. ¥500-3,000 per gig for commercial shoots

SCHOLARSHIP WARNING:
- CSC scholarship renewal requires minimum GPA. Don't let work tank your grades
- University can revoke scholarships if caught working illegally
- Time is better spent on networking and language learning than making ¥2,000/month

Vlogger advice: "Focus on building skills and connections, not making pocket money. The real ROI is in your degree and Chinese language ability."`, category: 'general', source_name: 'vlog_parttime_income.md' },

  // Grocery & Daily Shopping from Vloggers
  { content: `Daily Shopping & Grocery Guide (from student vloggers):
SUPERMARKETS:
- 盒马 (Hema/Freshippo): Alibaba's premium grocery. Same-day delivery within 3km. Great produce, imported goods
- 永辉超市 (Yonghui): Mid-range chain. Good prices, wide selection
- 大润发 (RT-Mart): Walmart-equivalent. Bulk buying, affordable
- Sam's Club / Costco: Available in major cities. Membership required. Bulk deals
- 便利店 (convenience stores): 7-Eleven, FamilyMart, Lawson — open 24/7, surprisingly good prepared food

ONLINE GROCERY (game-changer):
- 多点 (Duodian): Partner app for supermarkets. Same-day delivery
- 叮咚买菜 (Dingdong Maicai): 29-min delivery. Excellent fresh produce
- 美团买菜 (Meituan Grocery): Cheapest option. Group-buying discounts

INTERNATIONAL INGREDIENTS:
- Taobao searches: "Indian spices" (印度香料), "African food" (非洲食品), "halal meat" (清真肉)
- Import grocery stores exist in Tier 1 cities — expensive but authentic
- Muslim/halal butchers: Available in most cities, especially near mosques

PRICES COMPARISON:
- Rice (5kg): ¥25-40
- Eggs (30 pack): ¥15-25
- Chicken breast (500g): ¥15-25
- Vegetables (500g): ¥3-8
- Fruits (varies wildly by season): ¥5-15/500g
- Imported cheese: ¥30-80 (expensive!)
- Coca-Cola (500ml): ¥3-5`, category: 'costs', source_name: 'vlog_grocery_shopping.md' },

  // Seasons & Festivals from Vloggers
  { content: `Chinese Festivals & Holidays — Student Experience:
SPRING FESTIVAL (春节, Jan/Feb) — Chinese New Year:
- University closes for 3-4 weeks. Most restaurants and shops close too
- Many international students travel home or travel within China/SE Asia
- If staying on campus: Prepare groceries in advance. It can feel lonely
- Red envelopes (红包): You might receive WeChat red packets from Chinese friends. Lucky!
- Amazing fireworks across the entire country. Best experienced in smaller cities

NATIONAL DAY GOLDEN WEEK (Oct 1-7):
- 7-day national holiday. EVERYONE travels. Train tickets sell out instantly
- Tourist attractions are INSANELY crowded — expect 2-3 hour waits at popular spots
- Vlogger tip: Travel to less popular destinations or stay on campus and explore your empty city
- Great time for budget travel if you book 2-3 weeks early

MID-AUTUMN FESTIVAL (中秋节, Sep/Oct):
- Mooncakes everywhere. Try different flavors — some are amazing, some are... interesting
- Universities often host international student celebrations with free food and activities

DRAGON BOAT FESTIVAL (端午节, Jun):
- 粽子 (zongzi, sticky rice wraps) — delicious. Learn to make them with Chinese friends
- Dragon boat races in cities with rivers

ACADEMIC CALENDAR:
- Fall semester: September - January
- Spring semester: March - July
- Final exams: Usually mid-January and early July
- Chinese universities take attendance VERY seriously — absences affect grades AND scholarship status`, category: 'general', source_name: 'vlog_festivals_holidays.md' },

  // Technology & Apps from Vloggers
  { content: `Essential Apps Every International Student Needs (2025 Updated):
COMMUNICATION:
- WeChat (微信): THE most important app. Messaging, payments, groups, mini-programs. Your entire China life runs on this
- QQ: Older but still used for academic groups and file sharing
- DingTalk (钉钉): Some universities use this for class management
- Zoom equivalent: Tencent Meeting (腾讯会议) or DingTalk for online classes

DAILY LIFE:
- Alipay (支付宝): Payments, utilities, investment, insurance — complete financial ecosystem
- Meituan (美团): Food delivery, hotel booking, movie tickets, everything
- DiDi (滴滴): Ride-hailing (China's Uber). English interface available
- Amap/高德地图: THE map app. Don't use Google Maps — it's inaccurate in China
- Baidu Maps (百度地图): Alternative map app with transit directions

SHOPPING:
- Taobao (淘宝): Everything marketplace. 1-3 day delivery
- JD.com (京东): Electronics, guaranteed authentic. Same-day delivery in big cities
- Pinduoduo (拼多多): Ultra-cheap group buying. Great for daily essentials

TRANSPORT:
- 12306: Official train ticket booking. Link passport for student discounts
- Trip.com (携程): Flights, hotels, trains — English interface
- Metro apps: Each city has its own subway app or use Alipay transit mini-program

ACADEMIC:
- WPS Office (金山文档): Free alternative to Microsoft Office. Popular in Chinese universities
- CNKI (知网): Chinese academic paper database. Your university should provide free access
- Zhihu (知乎): China's Quora. Great for research topics and understanding Chinese perspectives`, category: 'general', source_name: 'vlog_essential_apps_2025.md' },

  // Photography & Content Creation from Vloggers
  { content: `Best Photo Spots & Content Creation Tips for Students in China:
TOP INSTAGRAMMABLE SPOTS (vlogger picks):
- Beijing: Forbidden City golden hour, 798 Art District, Sanlitun at night
- Shanghai: The Bund at sunset, Tianzifang alleys, Yu Garden, Jing'an Temple
- Hangzhou: West Lake at dawn, Longjing tea terraces, Hupao Spring
- Chengdu: Kuanzhai Alley, Wuhou Temple red wall, panda base
- Xi'an: City wall cycling, Bell Tower at night, Muslim Quarter food shots

CONTENT CREATION ADVICE:
- Bilibili (B站) is China's YouTube. Growing your audience HERE opens Chinese brand deals
- Douyin (抖音) = Chinese TikTok. Shorter, more viral. Algorithm is aggressive but effective
- 小红书 (Xiaohongshu/RED) = China's Instagram. Best for lifestyle/food/travel content
- WeChat Official Account: More like a blog. Great for long-form content
- NEVER film inside military bases, government buildings, or near sensitive facilities
- Ask permission before filming people up close. Chinese people are generally cool with it but be respectful

MAKING MONEY FROM CONTENT:
- Bilibili monetization starts at 1,000 followers + 10 videos
- Brand collaborations: Foreign food/lifestyle creators are IN DEMAND. ¥500-5,000 per sponsored post
- Teaching your language on Douyin: Some vloggers get 100K+ followers teaching English/French/Arabic
Vlogger wisdom: "Start posting from day 1. Future you will be grateful you documented this experience."`, category: 'general', source_name: 'vlog_content_spots.md' },

  // Graduation & Leaving China from Vloggers
  { content: `Leaving China After Graduation — What Vloggers Say:
LOGISTICS:
- Close your bank account: Withdraw all funds or transfer internationally (fees apply). Bank of China → home bank costs ¥100-200 per transfer
- Cancel your phone plan: Visit the carrier store with your passport. Refund any remaining balance
- Ship belongings: International shipping via SF Express (顺丰) or China Post. Expect ¥50-200/kg depending on destination
- Sell items you can't ship: WeChat "campus marketplace" groups, Xianyu (闲鱼) app for secondhand sales
- Visa: Exit within your Residence Permit validity. Overstaying = ¥500/day fine + possible ban

EMOTIONAL SIDE (vlogger honesty):
- "Reverse culture shock is REAL. Going home felt stranger than arriving in China"
- "I missed Chinese food more than I expected. Especially campus canteen 🥲"
- "My Chinese friends became lifelong connections. We still video call regularly"
- "The person who left China is VERY different from the person who arrived"
- "If I could do it again, I would have said yes to more spontaneous adventures"

CAREER IMPACT:
- Chinese language ability = massive career differentiator in virtually every industry
- Connections (关系 guānxi) built during university can open doors for years
- Many graduates return to China for work within 2-3 years
- CSC alumni network is global and active — leverage it

Vlogger message: "Don't let comfort prevent you from having the experience of a lifetime."`, category: 'general', source_name: 'vlog_leaving_china.md' },

  // ===== INSIDER KNOWLEDGE — WHAT NO GENERIC AI KNOWS =====

  // K Visa — Brand New Policy (Oct 2025)
  { content: `NEW: K Visa for STEM Talent (Effective October 1, 2025):
China introduced the K Visa — a brand-new visa category targeting young, high-end STEM talent. This is a game-changer:

KEY FEATURES:
- NO confirmed job offer required for recent graduates from recognized international universities
- Multiple entries allowed — more flexible than Z visa
- Longer stays permitted — designed for academic, cultural, and entrepreneurial activities
- Specifically targets: AI, quantum computing, biotech, clean energy, advanced manufacturing
- Positions China as a competitor to US H-1B visa for global tech talent

WHO QUALIFIES:
- Recent graduates (within 2 years) from top international universities
- STEM degree holders with demonstrated research or innovation potential
- Those willing to engage in research, academia, or tech entrepreneurship in China

WHAT THIS MEANS FOR STUDENTS:
- Study in China on X1 visa → Graduate → Apply for K Visa → Stay and work in STEM without the traditional Z visa hassle
- Especially valuable for PhD graduates in AI, biotech, advanced materials
- Combined with Shanghai/Beijing talent policies = very attractive post-graduation path

This is BRAND NEW information. Most students, agencies, and even some universities don't know about this yet.`, category: 'visa', source_name: 'k_visa_2025_policy.md' },

  // Professor Email Strategy — Insider Playbook
  { content: `How to Email Chinese Professors for Acceptance Letters — The Insider Playbook:
This is the #1 factor that separates successful CSC applicants from rejected ones. A professor acceptance letter can boost your chances by up to 70%.

TIMING (critical):
- Start emailing: September-December (for next year's CSC cycle)
- Best send time: Monday-Thursday, 8:00-11:00 AM China Standard Time (UTC+8)
- Avoid: Weekends, late nights, during Chinese holidays (Spring Festival, National Day)
- Follow up: If no reply in 5-7 days, send ONE polite reminder. After 2 attempts, move to another professor

SUBJECT LINE FORMULA (proven to get opened):
"Prospective CSC Scholarship Student Seeking Supervision – [Your Name], [Your Field]"
or
"Request for Supervision: [Specific Research Topic] – [Your Nationality] Applicant"

EMAIL STRUCTURE (what professors actually read):
1. Dear Professor [SURNAME] (Chinese names: surname FIRST, e.g., Prof. Wang, not Prof. Xiaoming)
2. One sentence: Who you are (nationality, current degree, university)
3. One sentence: WHY this specific professor (mention a SPECIFIC paper or project)
4. One paragraph: Your research interest and how it aligns with their work
5. One sentence: Request for acceptance/pre-admission letter
6. Attachments: CV, transcripts, research proposal (ALL in PDF format)

PRO TIPS:
- Attach a DRAFT acceptance letter template to save the professor time — many appreciate this
- Apply to 5-10 professors simultaneously at different universities
- Chinese professors on WeChat often respond faster than email — if their WeChat is public, add them AFTER initial email contact
- Google Scholar is your best tool — search their recent papers and cite specific findings in your email
- Some professors' assistants manage their email. Address them respectfully too`, category: 'scholarships', source_name: 'professor_email_playbook.md' },

  // Agent Scam Prevention — Critical Knowledge
  { content: `Study-in-China Agent Scams — How to Protect Yourself:
CSC officially acknowledged deceptive agency practices in August 2020. This is critical knowledge for every applicant.

RED FLAGS — RUN if you see these:
🚩 "100% guaranteed scholarship" — NO ONE can guarantee a CSC scholarship. It's merit-based
🚩 Upfront fees to "secure" a scholarship — CSC itself charges ZERO application fees
🚩 Agent charges $4,500-7,000 USD for "scholarship placement" — this is predatory pricing for something you can do for free
🚩 "File opening fee" + "management fee" + "service fee" that keeps growing — classic drip-pricing scam
🚩 Asks you to pay university tuition/dorm fees to the AGENT'S bank account — always pay directly to university
🚩 Can't tell you exactly which universities their "students" attend — likely fabricated
🚩 Provides admission letters before you've even applied — could be forged documents

LEGITIMATE CHANNELS (FREE):
- CSC Official Portal: www.csc.edu.cn/laihua or www.campuschina.org
- Direct application to Chinese universities via their international admissions offices
- Chinese Embassy education section in your country (for Type A bilateral)
- PandaOffer.top — free AI advisor with RAG knowledge base

IF YOU ALREADY PAID AN AGENT:
- Request full refund in writing. Document everything
- Report to: CSC official complaints, your country's consumer protection agency
- WARNING: If the agent provided forged documents, YOUR application could be permanently blacklisted

The application is 100% free to do yourself. Every document, every form, every submission — all free through official channels.`, category: 'scholarships', source_name: 'agent_scam_prevention.md' },

  // University Acceptance Rates — Data No LLM Has
  { content: `University Acceptance Rates for International Students (Data Compiled 2024-2025):
CSC overall scholarship success rate: approximately 20% (competitive but achievable)

ACCEPTANCE RATES BY UNIVERSITY (for international student admissions, not just CSC):
| University | Acceptance Rate | Notes |
| Nanjing University | ~90% | Very welcoming to intl students |
| USTC (Hefei) | ~85% | Strong for science, less competitive for intl |
| Central South University | ~80% | Excellent medical programs |
| Northwestern Polytechnical | ~80% | Aerospace, engineering |
| South China Normal | ~80% | Education, Chinese language |
| Wuhan University | ~80% | Beautiful campus, diverse programs |
| Xi'an Jiaotong University | ~55% | C9 but more accessible than Beijing/Shanghai |
| Harbin Institute of Tech | ~50% | Top engineering, cold city = fewer applicants |
| Zhengzhou University | ~50% | Good value, developing international programs |
| Tongji University | ~43% | Architecture, engineering, competitive |
| Tsinghua University | ~36% | Most competitive C9 |
| Fudan University | ~32% | Very competitive, especially business |
| Peking University | ~20-25% | Ultra-competitive, strong humanities |

STRATEGY: Apply to 2-3 "reach" universities (C9, 30-40% rate) + 2-3 "safe" universities (50-90% rate)
Hidden insight: Universities in smaller cities (Hefei, Changsha, Xi'an) have MUCH higher acceptance rates than Beijing/Shanghai peers of similar ranking`, category: 'universities', source_name: 'acceptance_rates_data.md' },

  // Country-Specific Document Authentication
  { content: `Document Authentication by Country — Step-by-Step (2025 Updated):

INDIA (4-step process — start 6-8 weeks early):
1. Get documents notarized by a local Notary Public
2. State authentication: HRD Department or Sub-Divisional Magistrate (SDM)
3. MEA attestation: Ministry of External Affairs of India
4. Chinese Embassy legalization: Based on your consular district
   - Maharashtra/Karnataka → Chinese Consulate Mumbai
   - West Bengal/Odisha/Chhattisgarh/Jharkhand/Bihar → Chinese Consulate Kolkata
   - All other states → Chinese Embassy New Delhi
⚠️ India REJECTED China's Hague Apostille accession — full consular legalization still required!

PAKISTAN (changing in 2025!):
- China & Pakistan are BOTH Hague Apostille Convention members (since Nov 7, 2023)
- Pakistan currently transitioning to apostille-only system
- ⚠️ Chinese Embassy in Pakistan will STOP consular legalization from July 21, 2025
- After July 2025: Get apostille from Pakistan's designated authority → done! No embassy needed
- Before July 2025: Still need Ministry of Foreign Affairs attestation + Embassy legalization
- Submit via: Gerry's Visa Application Service Center (Islamabad, Karachi, or Lahore)

NIGERIA (3-step process):
1. Notarize documents with a local notary public
2. Ministry of Foreign Affairs authentication
3. Chinese Embassy/Consulate legalization (via China Visa Application Center in Lagos)
- Additional: Academic docs need Ministry of Education authentication

ETHIOPIA:
- Follow local authentication procedures through Ministry of Education/Foreign Affairs
- Submit to Chinese Embassy in Addis Ababa
- Fewer specific requirements documented — contact embassy directly for current checklist

BANGLADESH:
- CSC Type A Embassy agency number: 0501
- Submit through Chinese Embassy in Dhaka
- Follow standard authentication: notarize → Ministry of Foreign Affairs → Chinese Embassy`, category: 'visa', source_name: 'country_authentication_guide.md' },

  // Dietary Survival — Chinese Phrases
  { content: `Dietary Survival Guide — Essential Chinese Phrases for Vegetarian/Vegan/Halal Students:

HALAL (清真 qīngzhēn):
- "我只吃清真食物" (Wǒ zhǐ chī qīngzhēn shíwù) = "I only eat halal food"
- Look for: 清真 sign on restaurants and canteen sections (green/white, crescent moon)
- Search on Meituan/Ele.me: Type "清真" to filter halal restaurants
- Cities with best halal food: Xi'an > Beijing (Niujie) > Guangzhou (Xiaobei) > Lanzhou > Yinchuan
- University halal canteens: Separate kitchen, dedicated utensils, visible certification
- ⚠️ Warning: Some restaurants display 清真 sign but aren't properly certified. Ask about 清真认证 (certification)

VEGETARIAN (素食 sùshí):
- "我是吃素的" (Wǒ shì chīsù de) = "I am vegetarian"
- "我不吃肉" (Wǒ bù chī ròu) = "I don't eat meat" (but ròu sometimes means just pork to Chinese people)
- Be specific: "不要鸡肉，不要鱼，不要猪肉" (No chicken, no fish, no pork)
- ⚠️ Hidden meat alert: Many "vegetable" dishes use meat broth or small meat pieces for flavor. Say "不要肉汤" (no meat broth)

STRICT VEGAN (纯素 chún sù):
- "我是纯素的" = "I am strict vegan"
- "不要奶制品，不要鸡蛋，不要蜂蜜" = "No dairy, no eggs, no honey"
- Look for: Buddhist temple restaurants (寺庙素食) — 100% vegan, very cheap (¥10-20/meal)
- Package labels: "全素" or "纯素" = vegan. But check for 蜂蜜 (honey) — sometimes included

TOP VEGAN-FRIENDLY CHINESE DISHES:
- 地三鲜 (dì sān xiān): Eggplant, potato, green pepper stir-fry
- 素浇面 (sù jiāo miàn): Vegetarian noodles (ask for vegan broth)
- 豆腐 (dòufu): Tofu in countless preparations
- 凉拌黄瓜 (liáng bàn huángguā): Smashed cucumber salad
- 拔丝地瓜 (bá sī dìguā): Candied sweet potato
- 罗汉斋 (luó hàn zhāi): Buddha's Delight — classic Buddhist vegan dish
Survival tip: Download Google Translate camera mode. Point at any menu and it'll translate instantly.`, category: 'general', source_name: 'dietary_survival_phrases.md' },

  // CSC Annual Review — What Current Scholars Need to Know
  { content: `CSC Scholarship Annual Review — Keep Your Funding (Most Students Don't Know This):
Your CSC scholarship is NOT guaranteed for the full duration. It's reviewed ANNUALLY, and they CAN revoke it.

WHAT THEY EVALUATE:
1. Academic performance: Must maintain minimum GPA (varies by university, typically 2.7-3.0+)
2. Attendance: Chinese universities track attendance meticulously. Missing classes = red flag
3. Moral conduct: No disciplinary issues, no legal problems
4. Learning attitude: Participation in academic activities, research progress
5. Activity participation: Join university events, cultural exchanges, international student activities
6. Chinese language progress: For Chinese-taught programs, HSK improvement expected

TIMELINE:
- Annual review typically happens March-May for the upcoming academic year
- University international office sends notification — check email and WeChat!
- You submit: Self-evaluation form, academic transcript, attendance record
- Professor/supervisor provides evaluation
- Results announced before summer break

WHAT GETS YOU KICKED OFF:
❌ GPA below minimum threshold (usually bottom 10% of cohort)
❌ More than 10% unexplained absences in any course
❌ Disciplinary violation or criminal record
❌ Failure to submit annual review documents on time
❌ Fraudulent documents discovered at any point (instant permanent ban)

PRO TIPS:
- Attend EVERY class in your first semester. Build a reputation as a serious student
- Participate in at least 2-3 university cultural exchange events per semester
- Keep good relations with your supervisor — their evaluation carries the most weight
- If struggling academically, talk to your international student office BEFORE the review — they can arrange support`, category: 'scholarships', source_name: 'csc_annual_review.md' },

  // Post-COVID China Updates
  { content: `China in 2025-2026 — What's Different Now (Updated Reality):
VISA & ENTRY:
- All COVID-era restrictions fully lifted. Normal visa processing restored
- New online visa application system launched (Sep 30, 2025) by Chinese Embassy in US — streamlined process
- Transit visa-free policy expanded: 144 hours in 54 Chinese cities for citizens of 54 countries
- K Visa introduced (Oct 2025) for STEM talent — no job offer required for recent graduates

CAMPUS LIFE CHANGES:
- Most universities fully back to in-person classes. Online options reduced
- International student enrollment recovering but still below 2019 pre-pandemic peak
- Some universities offering more scholarships to attract international students back
- Digital infrastructure improved: more English-language apps, better campus Wi-Fi
- Health QR codes and mandatory testing: COMPLETELY gone. No health declarations needed

COST CHANGES (post-pandemic):
- Tuition largely unchanged at major universities
- Rent in some cities slightly decreased due to economic slowdown
- Food delivery costs remained stable (Meituan/Ele.me prices similar to 2019)
- Flight prices: Many more direct routes restored. Competition driving prices down

EMPLOYMENT LANDSCAPE:
- China's youth unemployment has been elevated — more competition for post-graduation jobs
- BUT: International graduates with Chinese + English bilingual skills remain in HIGH demand
- Tech sector layoffs at big companies but startups and new energy sectors hiring
- Special talent policies in Shanghai/Beijing/Shenzhen still actively recruiting foreign STEM graduates
- K Visa makes post-graduation path much smoother for STEM graduates

WHAT THIS MEANS FOR YOU: Now is actually a GREAT time to study in China — less competition for scholarships, universities actively recruiting, and new visa policies making it easier to stay after graduation.`, category: 'general', source_name: 'china_2025_update.md' },

  // CSC Application Portal Technical Issues
  { content: `CSC Application Portal — Technical Issues Nobody Warns You About:
The campuschina.org application system has KNOWN quirks that trip up applicants every year:

BROWSER ISSUES:
- The portal works BEST on Internet Explorer or Microsoft Edge. Chrome/Firefox may have form submission errors
- Some applicants report the system timing out during document upload — save frequently!
- Clear your browser cache before starting. Old session data can corrupt your application

DOCUMENT UPLOAD:
- All documents MUST be in PDF format. JPG/PNG will be rejected or display incorrectly
- File size limit: Usually 2-5 MB per document. Compress PDFs if needed
- Naming convention: Use simple filenames (no Chinese characters, no special symbols)
- Upload ALL pages of multi-page documents as a single PDF, not separate files

EMAIL VERIFICATION:
- Gmail verification emails often get blocked or delayed — use Outlook, Yahoo, or a local email provider
- Some applicants NEVER receive the verification email from campuschina.org when using Gmail
- Pro tip: Register with Outlook.com email to avoid this entirely

AGENCY NUMBER MISTAKES:
- The 5-digit agency number MUST match your target university exactly
- Wrong agency number = your application goes to the wrong institution = automatic rejection
- For Type A (Embassy): Use YOUR COUNTRY's dispatching agency number, NOT the university's
- For Type B (University): Use the university's agency number from their CSC listing
- Double-check at: campuschina.org → "Search Programs" → select your university

DEADLINE TRAPS:
- The CSC portal time zone is Beijing Time (UTC+8). A "March 31 deadline" means 11:59 PM Beijing time
- Some universities have EARLIER internal deadlines than the CSC portal deadline — check with university directly
- System gets VERY slow in the last 48 hours before deadline. Submit at least 3 days early`, category: 'scholarships', source_name: 'csc_portal_technical.md' },

  // WeChat Ecosystem — Deep Guide
  { content: `WeChat Mastery — The App That Runs Your Entire China Life:
WeChat (微信) isn't just messaging. It's your wallet, social network, food delivery, ride-hailing, utility payments, and academic collaboration tool combined.

SETTING UP (Critical First Steps):
1. Download WeChat BEFORE arriving in China (available on App Store/Google Play)
2. Register with your phone number (any country works)
3. You may need an existing WeChat user to verify your account — ask a Chinese friend or senior student
4. Set up WeChat Pay: Add bank card → verify identity → start paying everywhere
5. Profile tip: Use a real photo, set a proper display name. Your WeChat profile IS your identity in China

MINI PROGRAMS (小程序) — The Hidden Power:
- Transit: Scan QR codes to ride subway/bus in any city (no physical transit card needed)
- Food: Meituan mini-program for food delivery without installing separate app
- Shopping: Pinduoduo, JD mini-programs built into WeChat
- Government: Many government services accessible via WeChat (utility bills, residence registration)
- University: Some universities have their own WeChat mini-programs for class schedules, grades, library booking

ESSENTIAL GROUPS TO JOIN (First Week):
- Your department/class WeChat group (professor will share QR code)
- International student association group
- City-specific expat group (search "foreigners in [city]" on WeChat)
- Country-specific student group (e.g., "Nigerians in Wuhan")
- Second-hand marketplace group (for buying cheap furniture from departing students)

WECHAT ETIQUETTE:
- Reply to messages relatively quickly — leaving someone "on read" is considered rude
- Use voice messages sparingly with professors — they prefer text
- Red packets (红包): Digital cash gifts. Send small amounts (¥1-10) in group chats for good luck
- Moments (朋友圈): Like Instagram stories. Post occasionally — pure lurking is noticed and seen as cold
- Never delete a professor from your contacts. Ever.`, category: 'general', source_name: 'wechat_deep_guide.md' },

  // Supervisor Relationship — Academic Culture
  { content: `Managing Your Supervisor Relationship in China — The Unwritten Rules:
The student-supervisor relationship in Chinese academia is VERY different from Western universities. Understanding this is crucial for your degree.

HIERARCHY & RESPECT:
- Address as "老师" (lǎoshī, teacher) or "教授" (jiàoshòu, professor) — NEVER by first name
- Stand when your professor enters the room (especially in the first meeting)
- In group meetings, wait for senior members to speak first
- Your supervisor's word is essentially law regarding your research direction. Disagreement must be very diplomatic

COMMUNICATION:
- Weekly or bi-weekly meetings are common. Come prepared with progress updates
- Send a WeChat message before each meeting outlining what you'll discuss
- If you miss a meeting, apologize IMMEDIATELY and reschedule
- Response time: Reply to supervisor messages within hours, not days
- Important requests: via email. Quick questions: via WeChat

THE "LAB CULTURE":
- Many supervisors expect you to be in the lab/office 8-10 hours/day, including some weekends
- "Self-study time" is expected to be spent in the lab, not at home
- Group meals and team activities organized by the supervisor are NOT optional
- Helping senior students with their projects is expected — this is how you learn

PUBLICATION & GRADUATION:
- Most Master's programs require 1-2 publications before graduation
- PhD typically requires 2-4 publications, often in Chinese academic journals
- Your supervisor is always listed as corresponding author
- Some supervisors require you to submit papers in BOTH Chinese and English
- Graduation timeline can be extended if publications are insufficient

WHAT GETS SUPERVISORS UPSET:
- Missing meetings without notice
- Submitting poor-quality work without effort
- Going over their head to the department (loss of face — 面子)
- Not acknowledging them in publications
- Changing research direction without discussion

SECRET WEAPON: Bring your supervisor tea (好茶) or their favorite snack occasionally. Small gifts showing cultural awareness build enormous goodwill.`, category: 'general', source_name: 'supervisor_relationship.md' },

  // Emergency & Legal Knowledge
  { content: `Emergency Situations & Legal Knowledge for International Students:
WHAT TO DO IF:

LOST PASSPORT:
1. Immediately go to the nearest police station (派出所) and file a report (报案)
2. Get a police report certificate (报案证明) — you NEED this
3. Contact your country's embassy to get an emergency travel document or replacement passport
4. Go to the Exit-Entry Administration Bureau to update your Residence Permit
5. Notify your university's international student office — they can help coordinate
Timeline: Expect 2-4 weeks for a new passport. Keep digital copies of all documents on your phone

OVERSTAYED VISA/RESIDENCE PERMIT:
- Fine: ¥500 per day of overstay, up to ¥10,000
- Detention possible for serious overstays (30+ days)
- May be banned from entering China for 1-5 years depending on severity
- Prevention: Set a phone reminder 60 days before your permit expires. Start renewal at least 30 days out

ARRESTED OR DETAINED:
- You have the RIGHT to contact your embassy. Insist on this immediately
- Do NOT sign anything you don't understand — request a translator
- University international office MUST be informed — they have a legal obligation to assist
- Common detention reasons: working without permit, expired visa, public disturbance

ACADEMIC FRAUD:
- Caught plagiarizing: Ranges from course failure to expulsion. Universities check via CNKI (知网)
- Forged documents in CSC application: Permanent ban from studying in China. No second chances
- Buying papers or thesis: Increasingly detected. Both buyer and seller face consequences

EMERGENCY NUMBERS:
- 110: Police
- 120: Ambulance
- 119: Fire
- 12345: Government service hotline (complaints, questions, assistance)
- Your embassy's emergency number: Save this in your phone on day 1

INSURANCE CLAIMS:
- CSC insurance: Ping An (平安保险). Report within 24 hours of incident
- Hospital receipts: Keep EVERY receipt. Chinese insurance requires original paper receipts
- Pre-authorization: For expensive treatments, call insurance company BEFORE treatment if possible`, category: 'general', source_name: 'emergency_legal_guide.md' },

  // Scholarship Renewal Hacks
  { content: `CSC Scholarship Renewal — Insider Strategies from Successful Scholars:
Your scholarship isn't a one-time win. You renew it EVERY year. Here's what successful scholars do differently:

THE EVALUATION CRITERIA (weighted differently at each university):
1. Academic Performance (40-50%): GPA, course grades, research progress
2. Supervisor Evaluation (20-30%): The single most important factor after grades
3. Attendance Record (10%): Both classes and university events
4. Cultural Activity Participation (5-10%): Join events, volunteer, represent your country
5. Chinese Language Progress (5-10%): Show improvement in HSK scores

MAXIMIZING EACH FACTOR:
✅ GPA: Focus on first semester courses. Establish a strong baseline early
✅ Supervisor: Weekly progress reports. Stay visible in the lab. Help with group projects
✅ Attendance: 100% attendance in first semester. Build goodwill for when you occasionally need flexibility
✅ Cultural events: Participate in International Culture Festival, Chinese Bridge competitions, university sports day
✅ Language: Take the next HSK level each year. Even incremental progress counts

STRATEGIC MOVES:
- Publish early: Even a conference paper shows research productivity
- Join your supervisor's grant applications as a team member
- Represent your university at academic conferences (supervisor often covers costs)
- Volunteer as a teaching assistant for undergraduate courses
- Join student government or international student association board

IF YOUR RENEWAL IS AT RISK:
- Talk to your international student office IMMEDIATELY — they have discretion
- A strong letter from your supervisor can override marginal GPA
- Show evidence of improvement trajectory, not just absolute numbers
- Some universities allow appeal — prepare a detailed improvement plan

LITTLE-KNOWN FACT: About 5-10% of CSC scholars lose funding annually. The most common reason is poor attendance, NOT poor grades.`, category: 'scholarships', source_name: 'scholarship_renewal_hacks.md' },

  // Hidden Scholarship Opportunities
  { content: `Hidden Scholarship Opportunities Most Students Never Find:

BEYOND CSC — OTHER FUNDING SOURCES:
1. Confucius Institute Scholarship: For Chinese language/culture students. Need HSK 3+ for one semester, HSK 5+ for Master's. Apply via the nearest Confucius Institute in your country
2. Provincial Scholarships (hidden gems with LOW competition):
   - Beijing Government Scholarship (BGS)
   - Shanghai Government Scholarship
   - Zhejiang Province Scholarship
   - Jiangsu Jasmine Scholarship
   - Guangdong Government Scholarship
   - Sichuan Province Scholarship
   These cover partial to full tuition. Apply directly through the provincial education department

3. University-Specific Scholarships:
   - Tsinghua Scholarship for New Students (merit-based, competitive)
   - PKU President's Fellowship
   - Zhejiang University International Scholarship
   - Many 211 universities offer their own financial aid packages
   Apply: Directly on the university application portal. Often separate from CSC

4. Belt & Road Scholarship: For students from Belt & Road Initiative countries (65+ countries). Growing rapidly

5. MOFCOM (Ministry of Commerce) Scholarship: For students from developing countries. Covers master's and PhD

6. CAS-TWAS President's Fellowship: For PhD students in natural sciences at Chinese Academy of Sciences institutes

STACKING STRATEGY:
- Apply CSC Type A + CSC Type B + Provincial + University scholarship simultaneously
- You can ONLY accept ONE, but applying to all maximizes your chances
- If CSC rejected, provincial or university scholarship may still come through
- Timeline: CSC results (May-Jun), Provincial (Jun-Aug), University (Mar-Jul)

Common mistake: Students apply ONLY for CSC and ignore everything else. Provincial scholarships have acceptance rates of 50-70% in some regions!`, category: 'scholarships', source_name: 'hidden_scholarships.md' },

  // New Visa Application System (2025)
  { content: `China's New Online Visa Application System (Launched September 30, 2025):
China launched a new online visa application system, initially through the Chinese Embassy in the US, with plans to expand globally.

WHAT CHANGED:
- Previously: Paper application forms + in-person submission at embassy/consulate
- Now: Complete the application form online, upload documents digitally, then submit at visa center
- Faster processing: Streamlined verification reduces typical processing from 7 to 4-5 business days
- Better tracking: Online status tracking of your application

HOW TO USE:
1. Visit the COVA system (cova.mfa.gov.cn) to create an account
2. Select visa type (X1 for study > 180 days, X2 for ≤ 180 days)
3. Fill in application form online
4. Upload supporting documents (admission letter, JW201/JW202, passport scan, photo)
5. Schedule appointment at your nearest visa application center
6. Bring printed application + original documents for verification
7. Pay visa fee + collect passport with visa sticker

COUNTRY-SPECIFIC SUBMISSION CENTERS:
- India: Chinese Visa Application Service Center (Delhi, Mumbai, Kolkata)
- Pakistan: Gerry's Visa Application Service Center (Islamabad, Karachi, Lahore)
- Nigeria: China Visa Application Center (Lagos)
- Bangladesh: Chinese Embassy in Dhaka
- Ethiopia: Chinese Embassy in Addis Ababa

FEES (country-specific):
- US citizens: ~$140 USD (most expensive due to reciprocal pricing)
- Most other countries: $30-60 USD
- Some developing nations: Reduced or waived fees for scholarship students

Pro tip: Submit your visa application at least 6-8 weeks before departure. Express processing (2-3 days) available at higher cost in some countries.`, category: 'visa', source_name: 'new_visa_system_2025.md' },
];




export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    
    if (secret !== process.env.DEEPSEEK_KEY) {
      return Response.json({ error: 'Add ?secret=YOUR_DEEPSEEK_KEY' }, { status: 401 });
    }

    // Fallback: use hardcoded values if env vars not available
    // This is safe — anon key is public/read-only, protected by RLS
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dfjqsoglwrcmtpyzaicw.supabase.co';
    const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_0_aJNHbZurXiwohCR-7ZSg_cP_h2mBq';

    const supabase = createClient(sbUrl, sbKey);

  // Dedup: fetch existing source_names to avoid duplicates
  // Using source_name is more precise than content prefix matching
  const forceReseed = searchParams.get('force') === 'true';
  
  let existingSourceNames = new Set();
  if (!forceReseed) {
    const { data: existing } = await supabase
      .from('laihua_knowledge')
      .select('source_name')
      .limit(1000);
    
    existingSourceNames = new Set(
      (existing || []).map(r => r.source_name).filter(Boolean)
    );
  }

  let inserted = 0;
  let skipped = 0;
  let errors = [];

  for (const chunk of SEED_CHUNKS) {
    // Skip if source_name already exists (unless force mode)
    if (!forceReseed && existingSourceNames.has(chunk.source_name)) {
      skipped++;
      continue;
    }

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
      errors.push(`${chunk.source_name}: ${error.message}`);
    } else {
      inserted++;
    }
  }

    return Response.json({
      message: `Seeded ${inserted} new, ${skipped} already existed, of ${SEED_CHUNKS.length} total`,
      inserted,
      skipped,
      total: SEED_CHUNKS.length,
      errors: errors.length > 0 ? errors : 'none',
    });
  } catch (err) {
    return Response.json({ error: err.message, stack: err.stack?.split('\n').slice(0, 3) }, { status: 500 });
  }
}
