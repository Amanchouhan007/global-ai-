import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1800 } });

  const b64 = fs.readFileSync('public/assets/ref2x_top.jpg').toString('base64');

  await page.setContent(`
    <html>
    <body style="background:#f0f4f8;padding:20px;font-family:sans-serif;">
      <h2>Option A: Complete Doctor Banner with full buttons (no cutoffs)</h2>
      <canvas id="optA"></canvas>

      <h2>Option B: Clean Doctor Banner (landscape, doctor, credentials, regional pills, no sliced buttons)</h2>
      <canvas id="optB"></canvas>

      <h2>Option C: Full Banner (from left to right)</h2>
      <canvas id="optC"></canvas>

      <script>
        const img = new Image();
        img.onload = () => {
          // In ref2x_top.jpg (2048x1154):
          // Banner top is at y=130
          // Doctor banner with buttons:
          // x: 950 to 2048 (width 1098), y: 130 to 540 (height 410)
          const cA = document.getElementById('optA');
          cA.width = 1100;
          cA.height = 410;
          cA.getContext('2d').drawImage(img, 948, 130, 1100, 410, 0, 0, 1100, 410);

          // Option B: clean landscape ending before the search buttons
          // y: 130 to 455 (height 325)
          const cB = document.getElementById('optB');
          cB.width = 1100;
          cB.height = 325;
          cB.getContext('2d').drawImage(img, 948, 130, 1100, 325, 0, 0, 1100, 325);

          // Option C: full banner
          const cC = document.getElementById('optC');
          cC.width = 2048;
          cC.height = 410;
          cC.getContext('2d').drawImage(img, 0, 130, 2048, 410, 0, 0, 2048, 410);
        };
        img.src = "data:image/jpeg;base64,${b64}";
      </script>
    </body>
    </html>
  `);

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7/banner_options_inspect.jpg', fullPage: true });
  console.log('Saved banner_options_inspect.jpg');
  await browser.close();
})();
