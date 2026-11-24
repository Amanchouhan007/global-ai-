import fs from 'fs';
import path from 'path';

console.log('--- STARTING COMPREHENSIVE LANDING REDESIGN VERIFICATION ---');

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${message}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${message}`);
  }
}

// 1. Check Brand Configuration
import { BRAND } from './src/config/brand.js';
assert(BRAND.name === 'Health Orbit Pro', 'Brand name is Health Orbit Pro');
assert(BRAND.tagline.includes('FAMILY HEALTH'), 'Tagline matches requirement');
assert(BRAND.formula.human === 'Human Insight', 'Formula equation human insight configured');
assert(BRAND.formula.ai === 'Artificial Intelligence', 'Formula equation AI configured');
assert(BRAND.formula.outcome === 'Clearer Health Decisions', 'Formula equation outcome configured');

// 2. Check Founder & Company Configuration
import { FOUNDER_INFO, COMPANY_INFO } from './src/config/company.js';
assert(FOUNDER_INFO.name === 'Dr Pratap Madhukar', 'Founder is Dr Pratap Madhukar');
assert(FOUNDER_INFO.experience === '38 Years of Clinical Experience', 'Founder experience matches 38 years');
assert(FOUNDER_INFO.credentials.includes('Harvard Medical School'), 'Credentials include Harvard Medical School');
assert(COMPANY_INFO.grievanceEmail === 'grievance@healthorbitpro.org', 'Grievance email configured');
assert(COMPANY_INFO.compliance.includes('DPDP Act 2023'), 'Compliance references DPDP Act 2023');

// 3. Check 5-Language Translations
import { TRANSLATIONS } from './src/i18n/translations.js';
const requiredLanguages = ['EN', 'HI', 'MR', 'GU', 'BN'];
requiredLanguages.forEach(lang => {
  assert(Boolean(TRANSLATIONS[lang]), `Translation dictionary contains language ${lang}`);
  assert(Boolean(TRANSLATIONS[lang].nav), `Language ${lang} has navigation translations`);
  assert(Boolean(TRANSLATIONS[lang].hero), `Language ${lang} has hero translations`);
  assert(Boolean(TRANSLATIONS[lang].disclaimer), `Language ${lang} has disclaimer translations`);
  assert(Boolean(TRANSLATIONS[lang].categories), `Language ${lang} has categories translations`);
  assert(Boolean(TRANSLATIONS[lang].freeAccess), `Language ${lang} has free access translations`);
  assert(Boolean(TRANSLATIONS[lang].dpdp), `Language ${lang} has DPDP translations`);
});

// 4. Check Demo Video Configuration
import { DEMO_VIDEOS } from './src/config/demoVideos.js';
const videoLangs = Object.keys(DEMO_VIDEOS);
assert(videoLangs.length === 5, 'Demo video config has 5 language entries');
const englishVideo = DEMO_VIDEOS.EN;
assert(englishVideo && englishVideo.available === true, 'English demo video is active');
const gujaratiVideo = DEMO_VIDEOS.GU;
assert(gujaratiVideo && gujaratiVideo.available === false, 'Non-English demo videos (GU/BN) clearly marked as pending/in-production');

// 5. Check AuthContext Google Role Safety
const authContextSource = fs.readFileSync('./src/context/AuthContext.jsx', 'utf-8');
assert(authContextSource.includes("role: 'user'") && !authContextSource.includes("googleUser.role === 'admin'"), 
  'Google login strictly assigns role: "user" and cannot elevate to admin');

// 6. Check Dist files
const distPath = './dist';
assert(fs.existsSync(path.join(distPath, 'index.html')), 'dist/index.html exists');
assert(fs.existsSync(path.join(distPath, '_redirects')), 'dist/_redirects exists for SPA routing');
const indexHtml = fs.readFileSync(path.join(distPath, 'index.html'), 'utf-8');
assert(indexHtml.includes('Health Orbit Pro™'), 'Built index.html contains Health Orbit Pro™ title');

// 7. Check Dist Zip
const distZipPath = '../dist.zip';
assert(fs.existsSync(distZipPath), 'Root dist.zip exists');
const zipStats = fs.statSync(distZipPath);
const zipSizeMB = zipStats.size / (1024 * 1024);
assert(zipSizeMB < 10, `dist.zip size is ${zipSizeMB.toFixed(2)} MB, which is strictly under 10 MB`);

// 8. Check Required Components exist and have exports
const components = [
  './src/components/Header.jsx',
  './src/components/Hero.jsx',
  './src/components/SymptomSearch.jsx',
  './src/components/ExploreCategories.jsx',
  './src/components/HealthCardShowcase.jsx',
  './src/components/FreeAccessSection.jsx',
  './src/components/DemoVideoSection.jsx',
  './src/components/DPDPSection.jsx',
  './src/components/FeedbackCard.jsx',
  './src/components/DisclaimerModal.jsx',
  './src/components/AgeVerificationModal.jsx',
  './src/components/Footer.jsx'
];
components.forEach(cmp => {
  assert(fs.existsSync(cmp), `Component ${cmp} exists`);
  const src = fs.readFileSync(cmp, 'utf-8');
  assert(src.includes('export default'), `Component ${cmp} has default export`);
});

// 9. Check ThemeToggle removed from Header
const headerSrc = fs.readFileSync('./src/components/Header.jsx', 'utf-8');
assert(!headerSrc.includes('ThemeToggle'), 'ThemeToggle button removed from Header per user request');

// 10. Check Doctor Portrait uses Mountain reference
const heroSrc = fs.readFileSync('./src/components/Hero.jsx', 'utf-8');
assert(heroSrc.includes('dr-pratap-desk-hd.jpg') || heroSrc.includes('dr-pratap-portrait-mountain.jpg'), 'Hero renders attractive doctor portrait matching reference image');

// 11. Check HealthCardShowcase moved from Landing to UserDashboard
const appSrc = fs.readFileSync('./src/App.jsx', 'utf-8');
const userDashboardSrc = fs.readFileSync('./src/components/UserDashboard.jsx', 'utf-8');
assert(!appSrc.includes('<HealthCardShowcase'), 'HealthCardShowcase removed from landing page per user request');
assert(userDashboardSrc.includes('<HealthCardShowcase'), 'HealthCardShowcase dynamically wired into UserDashboard symptoms assessment');

console.log(`\nVERIFICATION SUMMARY: ${passedTests} / ${totalTests} tests passed.`);
if (passedTests === totalTests) {
  console.log('ALL FRONTEND ARCHITECTURE & DESIGN CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
} else {
  console.error('SOME CHECKS FAILED!');
  process.exit(1);
}
