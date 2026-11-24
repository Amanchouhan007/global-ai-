import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });

  const files = [
    'public/assets/dr_pratap_clinic_hero_exact_4k.jpg',
    'public/assets/hero-banner-exact-4k.jpg',
    'public/assets/dr_pratap_hero_native_4k.jpg',
    'public/assets/dr-pratap-clinic-hero-4k.jpg',
    'public/reference.jpg'
  ];

  let html = '<html><body style="background:#fff;color:#000;padding:20px;font-family:sans-serif;">';
  for (const f of files) {
    if (fs.existsSync(f)) {
      const b64 = fs.readFileSync(f).toString('base64');
      const stats = fs.statSync(f);
      html += `<div style="margin-bottom:30px;border-bottom:2px solid #ccc;padding-bottom:20px;">
        <h3>${f} (${stats.size} bytes)</h3>
        <img src="data:image/jpeg;base64,${b64}" style="max-width:100%;height:auto;display:block;" />
      </div>`;
    } else {
      html += `<div><h3>${f} NOT FOUND</h3></div>`;
    }
  }
  html += '</body></html>';

  await page.setContent(html);
  await page.screenshot({ path: 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7/banner_sources_rendered.jpg', fullPage: true });
  console.log('Saved banner_sources_rendered.jpg');
  await browser.close();
})();
