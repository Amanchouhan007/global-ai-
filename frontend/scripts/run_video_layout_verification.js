import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const PORT = 5180;
const DIST_DIR = path.resolve('D:/health-orbit-pro/global-ai-/frontend/dist');
const OUTPUT_DIR = path.resolve('D:/health-orbit-pro/tools/mobile_video_verification');
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

// 12 Requested Widths
const WIDTHS = [280, 320, 360, 375, 384, 390, 393, 412, 414, 430, 440, 480];

async function runVideoVerification() {
  const server = await startServer();
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const verificationSummary = [];

  // Step 1: Test Center Play Button Alignment and Paused State across all 12 widths
  console.log("--- 1. Testing Center Play Button Alignment across all widths ---");
  for (const w of WIDTHS) {
    const context = await browser.newContext({
      viewport: { width: w, height: 740 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true
    });
    const page = await context.newPage();
    await page.addInitScript(() => {
      sessionStorage.setItem('healthorbit_disclaimer_ack', 'true');
    });

    await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(500);

    const videoSection = await page.$('#resources');
    if (videoSection) await videoSection.scrollIntoViewIfNeeded();

    // Measure exact center coordinates of video container vs play button
    const geometry = await page.evaluate(() => {
      const v = document.querySelector('video');
      const container = v?.parentElement;
      const btn = container?.querySelector('button[aria-label*="Play"]');
      if (!container || !btn) return null;

      const cRect = container.getBoundingClientRect();
      const bRect = btn.getBoundingClientRect();

      const containerCenterX = cRect.left + cRect.width / 2;
      const containerCenterY = cRect.top + cRect.height / 2;
      const btnCenterX = bRect.left + bRect.width / 2;
      const btnCenterY = bRect.top + bRect.height / 2;

      return {
        containerWidth: cRect.width,
        containerHeight: cRect.height,
        btnWidth: bRect.width,
        btnHeight: bRect.height,
        diffX: Math.abs(containerCenterX - btnCenterX),
        diffY: Math.abs(containerCenterY - btnCenterY),
        isCentered: Math.abs(containerCenterX - btnCenterX) < 1.0 && Math.abs(containerCenterY - btnCenterY) < 1.0
      };
    });

    // Capture paused state screenshot
    await page.screenshot({ path: path.join(OUTPUT_DIR, `paused_${w}px.png`), fullPage: false });

    verificationSummary.push({
      width: w,
      type: 'paused_alignment',
      geometry,
      status: geometry?.isCentered ? 'PASS' : 'WARN_OFFSET'
    });
    console.log(`Width ${w}px -> Play button centered: ${geometry?.isCentered} (diffX: ${geometry?.diffX.toFixed(2)}px, diffY: ${geometry?.diffY.toFixed(2)}px)`);

    await context.close();
  }

  // Step 2: Test Active Playback, Subtitles & Controls on Modern iPhone (390x844)
  console.log("\n--- 2. Testing Active Playback with Subtitles & Controls (390x844) ---");
  const playContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });
  const playPage = await playContext.newPage();
  await playPage.addInitScript(() => {
    sessionStorage.setItem('healthorbit_disclaimer_ack', 'true');
  });

  await playPage.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: 'domcontentloaded' });
  await playPage.waitForTimeout(500);

  // Play video
  await playPage.evaluate(() => document.querySelector('video').play());
  await playPage.waitForTimeout(2000);

  // 2A: Active playback with subtitles
  await playPage.screenshot({ path: path.join(OUTPUT_DIR, '01_playing_with_subtitles_390px.png'), fullPage: false });

  // 2B: Chapter 6 Long Subtitle Chapter test
  const ch6Btn = await playPage.$('button[data-chapter-id="6"]');
  if (ch6Btn) {
    await ch6Btn.click();
    await playPage.waitForTimeout(1500);
    await playPage.screenshot({ path: path.join(OUTPUT_DIR, '02_ch6_long_subtitles_390px.png'), fullPage: false });
  }

  // 2C: Toggle subtitles OFF
  const subToggleBtn = await playPage.$('button[title*="Subtitles"]');
  if (subToggleBtn) {
    await subToggleBtn.click();
    await playPage.waitForTimeout(600);
    await playPage.screenshot({ path: path.join(OUTPUT_DIR, '03_subtitles_disabled_390px.png'), fullPage: false });
  }

  // 2D: Arabic RTL Playback test
  const arBtn = await playPage.$('button[data-lang="AR"]');
  if (arBtn) {
    await arBtn.click();
    await playPage.waitForTimeout(1500);
    await playPage.evaluate(() => document.querySelector('video').play());
    await playPage.waitForTimeout(2000);
    await playPage.screenshot({ path: path.join(OUTPUT_DIR, '04_arabic_playback_390px.png'), fullPage: false });
  }

  // 2E: Mobile Landscape (844x390)
  console.log("\n--- 3. Testing Mobile Landscape (844x390) ---");
  await playPage.setViewportSize({ width: 844, height: 390 });
  await playPage.waitForTimeout(600);
  await playPage.screenshot({ path: path.join(OUTPUT_DIR, '05_mobile_landscape_844x390.png'), fullPage: false });

  await playContext.close();
  await browser.close();
  server.close();

  fs.writeFileSync(path.join(OUTPUT_DIR, 'summary.json'), JSON.stringify(verificationSummary, null, 2));
  console.log("\nVisual layout verification completed successfully!");
}

runVideoVerification().catch(err => {
  console.error("Test error:", err);
  process.exit(1);
});
