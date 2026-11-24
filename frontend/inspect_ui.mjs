import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const outDir = 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7';

  // 1. Full page desktop
  await page.screenshot({ path: path.join(outDir, 'current_desktop_1440px.jpg'), fullPage: false });

  // 2. Header
  const header = await page.$('header');
  if (header) {
    await header.screenshot({ path: path.join(outDir, 'current_header.jpg') });
  }

  // 3. Hero section
  const hero = await page.$('#home');
  if (hero) {
    await hero.screenshot({ path: path.join(outDir, 'current_hero.jpg') });
  }

  // 4. Categories section
  const cat = await page.$('#categories');
  if (cat) {
    await cat.screenshot({ path: path.join(outDir, 'current_categories.jpg') });
  }

  // 5. Chat assistant section
  const chat = await page.$('#chat-assistant');
  if (chat) {
    await chat.screenshot({ path: path.join(outDir, 'current_chat.jpg') });
  }

  // 6. Mobile 401px
  await page.setViewportSize({ width: 401, height: 860 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(outDir, 'current_mobile_401px.jpg'), fullPage: false });

  console.log('UI screenshots captured successfully');
  await browser.close();
})();
