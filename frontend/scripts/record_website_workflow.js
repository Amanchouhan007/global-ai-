import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const OUTPUT_DIR = path.resolve(__dirname, '../../../tools/chapter_recordings');
const MANIFEST_PATH = path.resolve(__dirname, '../../../tools/chapter_temp/final_multilingual_manifest.json');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// MIME types
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.woff2': 'font/woff2'
};

function startServer(port = 4173) {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      let reqPath = decodeURI(req.url.split('?')[0]);
      if (reqPath === '/') reqPath = '/index.html';
      let filePath = path.join(DIST_DIR, reqPath);
      
      if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        filePath = path.join(DIST_DIR, 'index.html');
      }
      
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not found');
        } else {
          res.writeHead(200, { 'Content-Type': contentType });
          res.end(data);
        }
      });
    });
    
    server.listen(port, () => {
      console.log(`✓ Local Health Orbit Pro server active at http://localhost:${port}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

// Visual cursor highlight simulation helper
async function smoothMoveAndClick(page, selector, click = true) {
  try {
    const el = await page.waitForSelector(selector, { timeout: 3000 });
    const box = await el.boundingBox();
    if (box) {
      const targetX = box.x + box.width / 2;
      const targetY = box.y + box.height / 2;
      await page.mouse.move(targetX, targetY, { steps: 15 });
      if (click) {
        await page.mouse.down();
        await page.waitForTimeout(100);
        await page.mouse.up();
      }
    }
  } catch (e) {
    // Fallback normal click if selector not found
    try { await page.click(selector, { timeout: 2000 }); } catch (_) {}
  }
}

async function recordWorkflow() {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf-8'));
  const enTimeline = manifest.en.timeline;
  
  const server = await startServer(4173);
  
  console.log('Launching Edge for Full HD Screen Recording (1920x1080)...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true
  });
  
  // Custom cursor & smooth interaction injection
  const injectStyles = async (page) => {
    await page.addStyleTag({
      content: `
        /* High-visibility demonstration cursor */
        body { cursor: default !important; }
        * { scroll-behavior: smooth !important; }
      `
    });
  };

  // We will record continuous UI workflow for Chapters 1-6
  // Chapter 1: Welcome & Mission (Homepage Hero, Branding, Badges)
  console.log('\n--- Recording Chapter 1: Welcome & Mission (Homepage & Branding) ---');
  {
    const durMs = Math.round(enTimeline[0].duration * 1000);
    const recDir = path.join(OUTPUT_DIR, 'ch1');
    fs.mkdirSync(recDir, { recursive: true });
    
    const context = await browser.newContext({
      recordVideo: { dir: recDir, size: { width: 1920, height: 1080 } },
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await injectStyles(page);
    
    // Smooth viewing of hero banner & branding
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollBy({ top: 120, behavior: 'smooth' }));
    await page.waitForTimeout(3000);
    await page.evaluate(() => window.scrollBy({ top: -120, behavior: 'smooth' }));
    await page.waitForTimeout(Math.max(1000, durMs - 6000));
    
    await context.close();
    console.log('✓ Chapter 1 recorded.');
  }

  // Chapter 2: AI Symptom Checker
  console.log('\n--- Recording Chapter 2: AI Symptom Checker ---');
  {
    const durMs = Math.round(enTimeline[1].duration * 1000);
    const recDir = path.join(OUTPUT_DIR, 'ch2');
    fs.mkdirSync(recDir, { recursive: true });
    
    const context = await browser.newContext({
      recordVideo: { dir: recDir, size: { width: 1920, height: 1080 } },
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await injectStyles(page);
    
    // Scroll to Chat Assistant section
    await page.evaluate(() => {
      const el = document.getElementById('chat-assistant') || document.querySelector('section:has(input)');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    await page.waitForTimeout(1500);
    
    // Find input box and type symptom
    const inputSelector = 'input[placeholder*="Ask Dr. Pratap"], input[placeholder*="Describe"], textarea';
    await smoothMoveAndClick(page, inputSelector, true);
    await page.waitForTimeout(500);
    await page.type(inputSelector, 'Mild right-sided throbbing headache with light sensitivity for 2 days', { delay: 45 });
    await page.waitForTimeout(800);
    
    // Submit
    const sendBtnSelector = 'button:has(svg.lucide-send), button:has-text("Send")';
    await smoothMoveAndClick(page, sendBtnSelector, true);
    await page.waitForTimeout(Math.max(2000, durMs - 7500));
    
    await context.close();
    console.log('✓ Chapter 2 recorded.');
  }

  // Chapter 3: 1,000+ Health Cards
  console.log('\n--- Recording Chapter 3: 1,000+ Health Cards Library ---');
  {
    const durMs = Math.round(enTimeline[2].duration * 1000);
    const recDir = path.join(OUTPUT_DIR, 'ch3');
    fs.mkdirSync(recDir, { recursive: true });
    
    const context = await browser.newContext({
      recordVideo: { dir: recDir, size: { width: 1920, height: 1080 } },
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await injectStyles(page);
    
    // Scroll to Explore by Category
    await page.evaluate(() => {
      const el = document.getElementById('categories');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    await page.waitForTimeout(1500);
    
    // Hover across health cards
    const cards = await page.$$('button:has-text("Health Cards"), div:has(h3):has(p)');
    if (cards.length > 0) {
      for (let i = 0; i < Math.min(3, cards.length); i++) {
        const box = await cards[i].boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 15 });
          await page.waitForTimeout(1000);
        }
      }
    }
    await page.waitForTimeout(Math.max(1000, durMs - 5000));
    
    await context.close();
    console.log('✓ Chapter 3 recorded.');
  }

  // Chapter 4: Personal & Family Health
  console.log('\n--- Recording Chapter 4: Personal & Family Health ---');
  {
    const durMs = Math.round(enTimeline[3].duration * 1000);
    const recDir = path.join(OUTPUT_DIR, 'ch4');
    fs.mkdirSync(recDir, { recursive: true });
    
    const context = await browser.newContext({
      recordVideo: { dir: recDir, size: { width: 1920, height: 1080 } },
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await injectStyles(page);
    
    // Scroll to Personal Health / Family Health
    await page.evaluate(() => {
      const el = document.getElementById('categories');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.scrollBy({ top: 200, behavior: 'smooth' });
    });
    await page.waitForTimeout(1500);
    
    // Highlight "My Personal Health" and "My Family" cards
    const familyCard = await page.$('button:has-text("Family"), h3:has-text("My Family")');
    if (familyCard) {
      const box = await familyCard.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
        await page.waitForTimeout(1500);
      }
    }
    await page.waitForTimeout(Math.max(1000, durMs - 4000));
    
    await context.close();
    console.log('✓ Chapter 4 recorded.');
  }

  // Chapter 5: Multilingual Selection
  console.log('\n--- Recording Chapter 5: Multilingual Selection ---');
  {
    const durMs = Math.round(enTimeline[4].duration * 1000);
    const recDir = path.join(OUTPUT_DIR, 'ch5');
    fs.mkdirSync(recDir, { recursive: true });
    
    const context = await browser.newContext({
      recordVideo: { dir: recDir, size: { width: 1920, height: 1080 } },
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await injectStyles(page);
    
    // Find language switcher in navbar
    const langBtn = await page.$('button:has(svg.lucide-globe), button:has-text("English")');
    if (langBtn) {
      const box = await langBtn.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 15 });
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(1200);
        // Move over language items
        await page.mouse.move(box.x + box.width / 2, box.y + 120, { steps: 10 });
        await page.waitForTimeout(1200);
      }
    }
    await page.waitForTimeout(Math.max(1000, durMs - 3500));
    
    await context.close();
    console.log('✓ Chapter 5 recorded.');
  }

  // Chapter 6: DPDP Privacy & Clinical Safety
  console.log('\n--- Recording Chapter 6: DPDP Privacy & Clinical Safety ---');
  {
    const durMs = Math.round(enTimeline[5].duration * 1000);
    const recDir = path.join(OUTPUT_DIR, 'ch6');
    fs.mkdirSync(recDir, { recursive: true });
    
    const context = await browser.newContext({
      recordVideo: { dir: recDir, size: { width: 1920, height: 1080 } },
      viewport: { width: 1920, height: 1080 }
    });
    const page = await context.newPage();
    await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' });
    await injectStyles(page);
    
    // Click the interactive DPDP disclaimer hotspot on the hero banner
    const disclaimerHotspot = await page.$('button[aria-label*="DPDP"], button[title*="DPDP"]');
    if (disclaimerHotspot) {
      const box = await disclaimerHotspot.boundingBox();
      if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 20 });
        await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(2000);
      }
    }
    
    // Demonstrate draggable box content
    await page.waitForTimeout(Math.max(2000, durMs - 3500));
    
    await context.close();
    console.log('✓ Chapter 6 recorded.');
  }

  await browser.close();
  server.close();
  console.log('\n✓ All 6 website workflow chapters recorded successfully!');
}

recordWorkflow().catch(err => {
  console.error('Fatal recording error:', err);
  process.exit(1);
});
