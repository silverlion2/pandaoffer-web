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

  // Dedup: fetch existing content prefixes to avoid duplicates
  const { data: existing } = await supabase
    .from('laihua_knowledge')
    .select('content')
    .limit(500);
  
  const existingPrefixes = new Set(
    (existing || []).map(r => r.content.substring(0, 80))
  );

  let inserted = 0;
  let skipped = 0;
  let errors = [];

  for (const chunk of SEED_CHUNKS) {
    // Skip if already exists
    if (existingPrefixes.has(chunk.content.substring(0, 80))) {
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
