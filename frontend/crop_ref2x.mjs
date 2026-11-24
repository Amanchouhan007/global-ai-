import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1400, height: 1200 } });

  // Let's create an HTML canvas to crop different regions from ref2x_top.jpg
  const b64 = fs.readFileSync('public/assets/ref2x_top.jpg').toString('base64');
  
  await page.setContent(`
    <html>
    <body style="background:#fff;padding:20px;">
      <canvas id="c1"></canvas>
      <canvas id="c2"></canvas>
      <script>
        const img = new Image();
        img.onload = () => {
          // Crop 1: The doctor banner with full buttons if any
          // In 2048x1154, let's see where the doctor part is:
          // x is from ~800 to 2048, y is from ~100 to ~550
          const c1 = document.getElementById('c1');
          c1.width = 1200;
          c1.height = 450;
          const ctx1 = c1.getContext('2d');
          ctx1.drawImage(img, 848, 120, 1200, 450, 0, 0, 1200, 450);

          // Crop 2: The full hero banner width
          const c2 = document.getElementById('c2');
          c2.width = 2048;
          c2.height = 500;
          const ctx2 = c2.getContext('2d');
          ctx2.drawImage(img, 0, 100, 2048, 500, 0, 0, 2048, 500);
        };
        img.src = "data:image/jpeg;base64,${b64}";
      </script>
    </body>
    </html>
  `);

  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7/ref2x_crops_inspect.jpg', fullPage: true });
  console.log('Saved ref2x_crops_inspect.jpg');
  await browser.close();
})();
