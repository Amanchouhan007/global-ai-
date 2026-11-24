import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });

  const b64 = fs.readFileSync('public/assets/ref2x_top.jpg').toString('base64');

  await page.setContent(`
    <html>
    <body style="background:#fff;margin:0;padding:0;">
      <canvas id="c"></canvas>
      <script>
        const img = new Image();
        img.onload = () => {
          // Exactly crop the doctor banner with all buttons, portrait, credentials
          // x: from 1005 (clean mountain sky, zero letters on left) to 2048
          // y: from 135 (top of mountains) to 542 (bottom of buttons)
          const c = document.getElementById('c');
          const cropX = 1005;
          const cropY = 135;
          const cropW = 2048 - cropX;
          const cropH = 542 - cropY;
          c.width = cropW;
          c.height = cropH;
          const ctx = c.getContext('2d');
          ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);

          // Export as base64
          window.resultBase64 = c.toDataURL('image/jpeg', 0.96);
        };
        img.src = "data:image/jpeg;base64,${b64}";
      </script>
    </body>
    </html>
  `);

  await page.waitForFunction(() => window.resultBase64 !== undefined);
  const dataUrl = await page.evaluate(() => window.resultBase64);
  const buffer = Buffer.from(dataUrl.split(',')[1], 'base64');

  // Save to public assets
  fs.writeFileSync('public/assets/dr_pratap_clinic_hero_exact_4k.jpg', buffer);
  console.log('Successfully saved pristine dr_pratap_clinic_hero_exact_4k.jpg, size:', buffer.length);

  await browser.close();
})();
