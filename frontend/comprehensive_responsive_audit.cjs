const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const VIEWPORTS = [
  { name: '320px_small_mobile', width: 320, height: 600, dpr: 2 },
  { name: '360px_mobile', width: 360, height: 740, dpr: 2 },
  { name: '375px_mobile_iphone', width: 375, height: 812, dpr: 3 },
  { name: '390px_mobile_iphone14', width: 390, height: 844, dpr: 3 },
  { name: '430px_large_mobile', width: 430, height: 932, dpr: 3 },
  { name: '768px_tablet', width: 768, height: 1024, dpr: 2 },
  { name: '1024px_tablet_laptop', width: 1024, height: 768, dpr: 2 },
  { name: '1280px_laptop', width: 1280, height: 800, dpr: 1 },
  { name: '1440px_desktop', width: 1440, height: 900, dpr: 2 },
  { name: '1920px_large_desktop', width: 1920, height: 1080, dpr: 1 }
];

const SCREENSHOT_DIR = path.resolve(__dirname, 'redesign-screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

(async () => {
  console.log('========================================================================');
  console.log('--- STARTING COMPREHENSIVE RESPONSIVE UI & IMAGE QUALITY AUDIT ---');
  console.log('========================================================================\n');

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: true
  });

  const auditResults = [];

  for (const vp of VIEWPORTS) {
    console.log(`>>> TESTING VIEWPORT: ${vp.name} (${vp.width}x${vp.height}, DPR: ${vp.dpr})`);

    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.dpr
    });

    const page = await context.newPage();

    // 1. Audit Landing Page
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // Check Horizontal Overflow
    const overflowLanding = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      return {
        scrollWidth: docW,
        innerWidth: winW,
        hasOverflow: docW > winW,
        diff: docW - winW
      };
    });

    // Inspect Landing Images
    const landingImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        clientWidth: img.clientWidth,
        clientHeight: img.clientHeight,
        isSharp: img.naturalWidth >= img.clientWidth,
        ratio: img.clientWidth > 0 ? (img.naturalWidth / img.clientWidth).toFixed(2) + 'x' : 'N/A'
      }));
    });

    // Capture Landing Screenshot
    const landingScreenshotPath = path.join(SCREENSHOT_DIR, `landing_${vp.name}.png`);
    await page.screenshot({ path: landingScreenshotPath, fullPage: false });

    // 2. Audit User Dashboard & Health Card H-032
    await page.goto('http://localhost:5173/#user', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Scroll HealthCard into view so images are fully measured
    await page.evaluate(() => {
      const card = document.querySelector('h2');
      if (card) card.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await page.waitForTimeout(300);

    // Check Dashboard Overflow
    const overflowDashboard = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      return {
        scrollWidth: docW,
        innerWidth: winW,
        hasOverflow: docW > winW,
        diff: docW - winW
      };
    });

    // Inspect Health Card Images
    const dashboardImages = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img')).map(img => ({
        src: img.src,
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        clientWidth: img.clientWidth,
        clientHeight: img.clientHeight,
        isSharp: img.naturalWidth >= img.clientWidth,
        ratio: img.clientWidth > 0 ? (img.naturalWidth / img.clientWidth).toFixed(2) + 'x' : 'N/A'
      }));
    });

    // Capture Dashboard Screenshot
    const dashScreenshotPath = path.join(SCREENSHOT_DIR, `dashboard_${vp.name}.png`);
    await page.screenshot({ path: dashScreenshotPath, fullPage: false });

    auditResults.push({
      viewport: vp.name,
      width: vp.width,
      landingOverflow: overflowLanding,
      dashboardOverflow: overflowDashboard,
      landingImages,
      dashboardImages
    });

    console.log(`  [Landing Overflow]: ${overflowLanding.hasOverflow ? 'FAIL (' + overflowLanding.diff + 'px)' : 'PASS (0px)'}`);
    console.log(`  [Dashboard Overflow]: ${overflowDashboard.hasOverflow ? 'FAIL (' + overflowDashboard.diff + 'px)' : 'PASS (0px)'}`);
    
    console.log(`  [Landing Images]:`);
    for (const img of landingImages) {
      const fn = path.basename(img.src);
      console.log(`    - ${fn}: ${img.naturalWidth}x${img.naturalHeight} (rendered ${img.clientWidth}x${img.clientHeight}, density ${img.ratio}) -> ${img.isSharp ? 'SHARP (PASS)' : 'BLUR (FAIL)'}`);
    }

    console.log(`  [Dashboard Images]:`);
    for (const img of dashboardImages) {
      const fn = path.basename(img.src);
      console.log(`    - ${fn}: ${img.naturalWidth}x${img.naturalHeight} (rendered ${img.clientWidth}x${img.clientHeight}, density ${img.ratio}) -> ${img.isSharp ? 'SHARP (PASS)' : 'BLUR (FAIL)'}`);
    }
    console.log('');

    await context.close();
  }

  await browser.close();

  // Write Detailed Audit Report
  const reportPath = path.join(SCREENSHOT_DIR, 'audit_report.json');
  fs.writeFileSync(reportPath, JSON.stringify(auditResults, null, 2));

  console.log('========================================================================');
  console.log('--- ALL 10 VIEWPORTS AUDITED & SCREENSHOTS SAVED SUCCESSFULLY ---');
  console.log('========================================================================');
})();
