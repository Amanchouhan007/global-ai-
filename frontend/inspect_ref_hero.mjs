import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 2000 } });

  const files = [
    'public/assets/real_ref_2_hero.jpg',
    'public/assets/ref_sec_2_hero.jpg',
    'public/assets/dr_pratap_hero_reference.jpg',
    'public/assets/ref2x_top.jpg'
  ];

  let html = '<html><body style="background:#fff;padding:20px;">';
  for (const f of files) {
    if (fs.existsSync(f)) {
      const b64 = fs.readFileSync(f).toString('base64');
      const stats = fs.statSync(f);
      html += `<div style="margin-bottom:20px;"><h3>${f} (${stats.size})</h3><img src="data:image/jpeg;base64,${b64}" style="max-width:100%;height:auto;border:1px solid #ccc;" /></div>`;
    }
  }
  html += '</body></html>';

  await page.setContent(html);
  await page.screenshot({ path: 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7/ref_hero_inspect.jpg', fullPage: true });
  console.log('Saved ref_hero_inspect.jpg');
  await browser.close();
})();
