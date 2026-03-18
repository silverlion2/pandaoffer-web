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
