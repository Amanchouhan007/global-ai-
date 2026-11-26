import { chromium } from 'playwright';

async function test() {
  console.log('Testing Playwright with Edge...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  console.log('Browser launched successfully!');
  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });
  await page.setContent('<html><body style="background:#0D5C3A; color:white; font-size:40px; text-align:center; padding:100px;">Health Orbit Pro — Automation Ready</body></html>');
  await page.screenshot({ path: 'd:\\health-orbit-pro\\tools\\chapter_temp\\edge_test.png' });
  console.log('Screenshot saved!');
  await browser.close();
  console.log('Browser closed cleanly.');
}

test().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
