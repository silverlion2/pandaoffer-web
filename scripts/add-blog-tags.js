const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'src', 'content', 'blog');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

const TAG_MAP = {
  'beijing-vs-hangzhou-where-to-study': ['Cities', 'Cost of Living', 'Beijing', 'Hangzhou'],
  'campus-food-complete-guide': ['Food', 'Campus Life', 'Budget'],
  'cashless-survival-alipay-wechat': ['Finance', 'Apps', 'Alipay', 'WeChat'],
  'chengdu-vs-hangzhou-vs-wuhan': ['Cities', 'Cost of Living', 'Compare'],
  'china-student-visa-x1-x2-guide': ['Visa', 'Documents', 'X1 Visa'],
  'china-university-tiers-c9-985-211': ['Universities', 'Rankings', 'C9 League'],
  'cost-of-living-china-2026': ['Cost of Living', 'Budget', 'Finances'],
  'csc-scholarship-guide-2026': ['CSC Scholarship', 'Funding', 'Application'],
  'culture-shock-china-stages': ['Mental Health', 'Culture', 'Campus Life'],
  'documents-needed-study-china': ['Documents', 'Application', 'Checklist'],
  'first-30-days-china-survival': ['Arrival', 'Checklist', 'Survival'],
  'how-to-write-csc-study-plan': ['CSC Scholarship', 'Study Plan', 'Application'],
  'making-friends-dating-social-life-china': ['Social Life', 'Culture', 'Campus Life'],
  'mbbs-in-china-who-recognized': ['MBBS', 'Medicine', 'WHO Recognized'],
  'nigerian-student-guide-china': ['Country Guide', 'Nigeria', 'Visa'],
  'wechat-vpn-digital-survival-guide': ['Apps', 'Internet', 'VPN', 'WeChat'],
  'bangladeshi-student-guide-china': ['Country Guide', 'Bangladesh', 'Visa'],
  'pakistani-student-guide-china': ['Country Guide', 'Pakistan', 'Visa']
};

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const slug = file.replace('.md', '');
  const tags = TAG_MAP[slug] || [];
  
  // Check if tags already exist
  if (!content.includes('\ntags:')) {
    // Format tags as string array: tags: ["tag1", "tag2"]
    const tagsStr = `tags: ${JSON.stringify(tags)}\n`;
    
    // Insert before the last ---
    const parts = content.split('---\n');
    if (parts.length >= 3) {
      parts[1] = parts[1] + tagsStr;
      content = parts.join('---\n');
      fs.writeFileSync(filePath, content);
      console.log(`Updated ${file}`);
    }
  } else {
    console.log(`Skipped ${file} (tags exist)`);
  }
});

console.log('Done.');
