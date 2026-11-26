import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const PORT = 5178;
const DIST_DIR = path.resolve('D:/health-orbit-pro/global-ai-/frontend/dist');
const OUTPUT_DIR = path.resolve('D:/health-orbit-pro/tools/mobile_verification_proofs');
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.svg': 'image/svg+xml'
};

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/' || reqPath === '') reqPath = '/index.html';

      const filePath = path.join(DIST_DIR, reqPath);
      if (!fs.existsSync(filePath)) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }

      const stat = fs.statSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      const range = req.headers.range;
      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType,
        });
        file.pipe(res);
      } else {
        res.writeHead(200, {
          'Content-Length': stat.size,
          'Content-Type': contentType,
          'Accept-Ranges': 'bytes'
        });
        fs.createReadStream(filePath).pipe(res);
      }
    });

    server.listen(PORT, '127.0.0.1', () => {
      resolve(server);
    });
  });
}

const MOBILE_DEVICES = [
  { name: 'Extra_small_mobile_280x653', width: 280, height: 653 },
  { name: 'Small_mobile_320x568', width: 320, height: 568 },
  { name: 'Compact_Android_360x640', width: 360, height: 640 },
  { name: 'Standard_Android_360x800', width: 360, height: 800 },
  { name: 'Compact_iPhone_375x667', width: 375, height: 667 },
  { name: 'Standard_iPhone_375x812', width: 375, height: 812 },
  { name: 'Android_mobile_384x854', width: 384, height: 854 },
  { name: 'Modern_iPhone_390x844', width: 390, height: 844 },
  { name: 'Modern_mobile_393x852', width: 393, height: 852 },
  { name: 'Large_Android_412x915', width: 412, height: 915 },
  { name: 'Large_iPhone_414x896', width: 414, height: 896 },
  { name: 'iPhone_Pro_Max_430x932', width: 430, height: 932 },
  { name: 'Extra_large_mobile_440x956', width: 440, height: 956 },
  { name: 'Wide_mobile_480x960', width: 480, height: 960 },
  { name: 'Mobile_Landscape_844x390', width: 844, height: 390 },
  { name: 'Desktop_Baseline_1920x1080', width: 1920, height: 1080 }
];

async function runMobileAudit() {
  const server = await startServer();
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const results = [];

  for (const dev of MOBILE_DEVICES) {
    console.log(`Testing Viewport: ${dev.name} (${dev.width}x${dev.height})...`);
    const context = await browser.newContext({
      viewport: { width: dev.width, height: dev.height },
      deviceScaleFactor: 2,
      isMobile: dev.width < 768,
      hasTouch: dev.width < 768
    });

    const page = await context.newPage();
    await page.addInitScript(() => {
      sessionStorage.setItem('healthorbit_disclaimer_ack', 'true');
    });

    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(400);

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;

    const videoState = await page.evaluate(() => {
      const v = document.querySelector('video');
      const box = v ? v.getBoundingClientRect() : null;
      return {
        hasVideo: Boolean(v),
        width: box ? box.width : 0,
        height: box ? box.height : 0
      };
    });

    // Capture screenshots
    await page.screenshot({ path: path.join(OUTPUT_DIR, `${dev.name}_top.png`), fullPage: false });

    const videoSection = await page.$('#resources');
    if (videoSection) {
      await videoSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${dev.name}_video.png`), fullPage: false });
    }

    const heroSection = await page.$('#home');
    if (heroSection) {
      await heroSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);
      await page.screenshot({ path: path.join(OUTPUT_DIR, `${dev.name}_hero_feedback.png`), fullPage: false });
    }

    const pass = !hasHorizontalOverflow && videoState.hasVideo;
    results.push({
      device: dev.name,
      viewport: `${dev.width}x${dev.height}`,
      horizontalOverflow: hasHorizontalOverflow,
      scrollWidth,
      clientWidth,
      videoWidth: videoState.width,
      videoHeight: videoState.height,
      status: pass ? 'PASS' : 'FAIL'
    });

    console.log(`  -> Status: ${pass ? 'PASS' : 'FAIL'}`);
    await context.close();
  }

  // Multilingual testing on Modern iPhone (390x844)
  console.log("\nTesting All 6 Languages on Modern iPhone (390x844)...");
  const langContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const langPage = await langContext.newPage();
  await langPage.addInitScript(() => {
    sessionStorage.setItem('healthorbit_disclaimer_ack', 'true');
  });
  await langPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
  await langPage.waitForTimeout(400);

  const langs = ['EN', 'HI', 'MR', 'GU', 'BN', 'AR'];
  for (const l of langs) {
    const langBtn = await langPage.$('header button[title="Select language"]');
    if (langBtn) {
      await langBtn.click();
      await langPage.waitForTimeout(200);
      const targetLang = await langPage.$(`button[data-lang="${l}"]`);
      if (targetLang) {
        await targetLang.click();
        await langPage.waitForTimeout(400);
        await langPage.screenshot({ path: path.join(OUTPUT_DIR, `lang_${l}_mobile.png`) });
        console.log(`  -> Language ${l} captured.`);
      }
    }
  }
  await langContext.close();

  await browser.close();
  server.close();

  fs.writeFileSync(path.join(OUTPUT_DIR, 'mobile_audit_results.json'), JSON.stringify(results, null, 2));
  console.log("\nAll mobile audit tests completed successfully!");
}

runMobileAudit().catch(err => {
  console.error("Audit error:", err);
  process.exit(1);
});
