import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  const userImgPath = 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7/.user_uploaded/media_1795509251869_8b547dcf.jpg';
  const b64 = fs.readFileSync(userImgPath).toString('base64');
  await page.setContent(`<img id="img" src="data:image/jpeg;base64,${b64}" />`);
  const dims = await page.evaluate(() => {
    const img = document.getElementById('img');
    return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
  });
  console.log('User image 1 (media_...8b547dcf.jpg):', dims);

  // Also check original reference files in frontend/public/
  const refs = ['reference.jpg', 'assets/doctor-banner-clean.jpg', 'assets/doctor-hero.jpg'];
  for (const r of refs) {
    if (fs.existsSync('public/' + r)) {
      const b = fs.readFileSync('public/' + r).toString('base64');
      await page.setContent(`<img id="img" src="data:image/jpeg;base64,${b}" />`);
      const d = await page.evaluate(() => {
        const img = document.getElementById('img');
        return { naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight };
      });
      console.log(r, d);
    }
  }
  await browser.close();
})();
