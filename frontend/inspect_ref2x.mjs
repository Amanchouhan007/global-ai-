import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });

  // Let's inspect ref2x_top.jpg dimensions and slices
  const b64 = fs.readFileSync('public/assets/ref2x_top.jpg').toString('base64');
  await page.setContent(`<img id="img" src="data:image/jpeg;base64,${b64}" />`);
  const dims = await page.evaluate(() => {
    const img = document.getElementById('img');
    return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
  });
  console.log('ref2x_top dims:', dims);

  // Take a full view of ref2x_top.jpg
  await page.screenshot({ path: 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7/ref2x_top_full.jpg' });
  await browser.close();
})();
