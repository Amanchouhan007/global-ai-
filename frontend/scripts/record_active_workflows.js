import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const OUTPUT_DIR = path.resolve(__dirname, '../../../tools/chapter_recordings');

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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
      
      const stat = fs.statSync(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      const range = req.headers.range;
      if (range && (ext === '.mp4' || ext === '.mp3' || ext === '.webm')) {
        const parts = range.replace(/bytes=/, '').split('-');
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        res.writeHead(206, {
          'Content-Range': `bytes ${start}-${end}/${stat.size}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': contentType
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
    
    server.listen(port, () => {
      console.log(`✓ Local server running at http://localhost:${port}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

// Injects high-visibility virtual cursor & click ripple
async function injectVisualCursor(page) {
  await page.evaluate(() => {
    window.alert = () => {};
    window.confirm = () => true;

    const existing = document.getElementById('demo-virtual-cursor');
    if (existing) existing.remove();

    const cursor = document.createElement('div');
    cursor.id = 'demo-virtual-cursor';
    cursor.style.position = 'fixed';
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.borderRadius = '50%';
    cursor.style.backgroundColor = 'rgba(216, 27, 96, 0.85)';
    cursor.style.border = '2.5px solid #ffffff';
    cursor.style.boxShadow = '0 0 14px rgba(216, 27, 96, 0.9), 0 2px 8px rgba(0,0,0,0.35)';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '999999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'transform 0.08s ease, background-color 0.12s ease';
    cursor.style.left = '960px';
    cursor.style.top = '300px';
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    window.addEventListener('mousedown', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(0.75)';
      cursor.style.backgroundColor = 'rgba(13, 92, 58, 0.95)';
    });

    window.addEventListener('mouseup', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.backgroundColor = 'rgba(216, 27, 96, 0.85)';
    });
  });
}

async function smoothMoveTo(page, selectorOrCoords, steps = 18) {
  let targetX, targetY;
  if (typeof selectorOrCoords === 'string') {
    const el = await page.waitForSelector(selectorOrCoords, { timeout: 4000 });
    const box = await el.boundingBox();
    if (!box) return null;
    targetX = box.x + box.width / 2;
    targetY = box.y + box.height / 2;
  } else {
    targetX = selectorOrCoords.x;
    targetY = selectorOrCoords.y;
  }
  await page.mouse.move(targetX, targetY, { steps });
  return { x: targetX, y: targetY };
}

async function smoothClick(page, selectorOrCoords, delayAfter = 400) {
  const pt = await smoothMoveTo(page, selectorOrCoords, 15);
  if (!pt) return;
  await page.mouse.down();
  await page.waitForTimeout(80);
  await page.mouse.up();
  await page.waitForTimeout(delayAfter);
}

async function typeSmoothly(page, selector, text, charDelay = 35) {
  await smoothClick(page, selector, 200);
  for (const ch of text) {
    await page.keyboard.type(ch, { delay: charDelay });
  }
  await page.waitForTimeout(300);
}

async function recordSingleChapter(chapterNum, setupFn, actionFn) {
  console.log(`\n>>> Launching Edge for Chapter ${chapterNum} recording...`);
  const recDir = path.join(OUTPUT_DIR, `ch${chapterNum}_active`);
  fs.mkdirSync(recDir, { recursive: true });

  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage']
  });

  const context = await browser.newContext({
    recordVideo: { dir: recDir, size: { width: 1920, height: 1080 } },
    viewport: { width: 1920, height: 1080 }
  });

  const page = await context.newPage();
  await page.addInitScript(() => {
    sessionStorage.setItem('healthorbit_disclaimer_ack', 'true');
  });

  // Fast DOM load with no 14-second networkidle delay
  await page.goto('http://localhost:4173/', { waitUntil: 'domcontentloaded' });
  await page.waitForSelector('#home, header, #root', { timeout: 4000 });
  await injectVisualCursor(page);

  // Optional setup (e.g. scroll to target section immediately)
  if (setupFn) {
    await setupFn(page);
  }

  // Brief 200ms settle so video captures starting frame cleanly
  await page.waitForTimeout(200);

  // Execute continuous active workflow
  await actionFn(page);

  await page.waitForTimeout(500);
  await context.close();
  await browser.close();
  console.log(`✓ Chapter ${chapterNum} recorded cleanly.`);
}

async function recordAllChapters() {
  const server = await startServer(4173);

  // -------------------------------------------------------------
  // CHAPTER 1: Live Homepage Walkthrough & Clinical Branding
  // -------------------------------------------------------------
  await recordSingleChapter(
    1,
    null,
    async (page) => {
      // Continuous motion across hero banner & platform
      await smoothMoveTo(page, { x: 300, y: 220 }, 15);
      await page.waitForTimeout(400);
      await smoothMoveTo(page, { x: 700, y: 240 }, 20);
      await page.waitForTimeout(500);
      await smoothMoveTo(page, { x: 1200, y: 200 }, 20);
      await page.waitForTimeout(500);

      // Smooth scroll down to overview
      for (let i = 0; i < 7; i++) {
        await page.evaluate(() => window.scrollBy({ top: 90, behavior: 'smooth' }));
        await page.mouse.move(960 + Math.sin(i) * 160, 400 + i * 40, { steps: 10 });
        await page.waitForTimeout(450);
      }

      // Smooth scroll back up
      for (let i = 0; i < 7; i++) {
        await page.evaluate(() => window.scrollBy({ top: -90, behavior: 'smooth' }));
        await page.mouse.move(960 - Math.sin(i) * 130, 650 - i * 40, { steps: 10 });
        await page.waitForTimeout(450);
      }
      await page.waitForTimeout(800);
    }
  );

  // -------------------------------------------------------------
  // CHAPTER 2: AI Symptom Checker Live Walkthrough
  // -------------------------------------------------------------
  await recordSingleChapter(
    2,
    async (page) => {
      // Scroll directly to categories / chat assistant before action begins
      await page.evaluate(() => {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    },
    async (page) => {
      // Click input box immediately
      const inputSelector = 'input[placeholder*="Ask Dr. Pratap"], input[type="text"]';
      await smoothClick(page, inputSelector, 300);

      // Type realistic symptom character by character (active typing ~2.5s)
      const symptomQuery = 'Throbbing migraine on right side with sensitivity to light';
      await typeSmoothly(page, inputSelector, symptomQuery, 32);

      // Click Send
      const sendBtn = 'button:has-text("Send"), button[title="Send message"], button:has(svg.lucide-send)';
      await smoothClick(page, sendBtn, 600);

      // Scroll chat board smoothly to review triage response
      for (let i = 0; i < 9; i++) {
        await page.evaluate(() => {
          const board = document.querySelector('#inline-category-chatboard, div[class*="overflow-y-auto"]');
          if (board) board.scrollBy({ top: 55, behavior: 'smooth' });
        });
        await page.mouse.move(960 + Math.cos(i) * 110, 480 + i * 22, { steps: 8 });
        await page.waitForTimeout(650);
      }
      await page.waitForTimeout(800);
    }
  );

  // -------------------------------------------------------------
  // CHAPTER 3: 1,000+ Health Cards Library Walkthrough
  // -------------------------------------------------------------
  await recordSingleChapter(
    3,
    async (page) => {
      await page.evaluate(() => {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    },
    async (page) => {
      // Hover across category pills
      const pills = await page.$$('div[role="tablist"] button');
      for (let i = 0; i < Math.min(3, pills.length); i++) {
        const box = await pills[i].boundingBox();
        if (box) {
          await smoothMoveTo(page, { x: box.x + box.width / 2, y: box.y + box.height / 2 }, 12);
          await page.waitForTimeout(400);
        }
      }

      // Click "View All Categories"
      const viewAllBtn = 'button:has-text("View All Categories")';
      await smoothClick(page, viewAllBtn, 800);

      // In modal, search for "Heart & Vitals"
      const modalSearch = 'div[role="dialog"] input[type="text"], input[placeholder*="Search"]';
      await typeSmoothly(page, modalSearch, 'Heart & Vitals', 40);
      await page.waitForTimeout(800);

      // Clear search and type 'Diabetes'
      await page.fill(modalSearch, '');
      await typeSmoothly(page, modalSearch, 'Diabetes', 40);
      await page.waitForTimeout(800);

      // Close modal
      const closeBtn = 'div[role="dialog"] button:has(svg.lucide-x)';
      await smoothClick(page, closeBtn, 600);

      // Click first category pill (My Symptoms)
      if (pills.length > 0) {
        await pills[0].click();
        await page.waitForTimeout(1000);
      }
    }
  );

  // -------------------------------------------------------------
  // CHAPTER 4: Personal & Family Health Walkthrough
  // -------------------------------------------------------------
  await recordSingleChapter(
    4,
    async (page) => {
      await page.evaluate(() => {
        const el = document.getElementById('categories');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
    },
    async (page) => {
      // Click "My Personal Health"
      const personalPill = 'button:has-text("Personal Health")';
      await smoothClick(page, personalPill, 900);

      // Click "My Family"
      const familyPill = 'button:has-text("Family")';
      await smoothClick(page, familyPill, 900);

      // Click "My Parenting"
      const parentingPill = 'button:has-text("Parenting")';
      await smoothClick(page, parentingPill, 900);

      // Click "My Mind"
      const mindPill = 'button:has-text("Mind")';
      await smoothClick(page, mindPill, 900);

      // Return to My Symptoms
      const symptomsPill = 'button:has-text("Symptoms")';
      await smoothClick(page, symptomsPill, 800);
      await page.waitForTimeout(1000);
    }
  );

  // -------------------------------------------------------------
  // CHAPTER 5: Multilingual Support Walkthrough
  // -------------------------------------------------------------
  await recordSingleChapter(
    5,
    null,
    async (page) => {
      // Click Language button in navbar
      const langBtnSelector = 'header button[title="Select language"], header button:has(svg.lucide-globe)';
      await smoothClick(page, langBtnSelector, 600);

      // Hover down through languages in dropdown
      const langItems = await page.$$('div:has(button) button:has-text("हिंदी"), div:has(button) button:has-text("English"), div:has(button) button:has-text("मराठी"), div:has(button) button:has-text("ગુજરાતી"), div:has(button) button:has-text("বাংলা"), div:has(button) button:has-text("العربية")');
      
      for (let i = 0; i < langItems.length; i++) {
        const box = await langItems[i].boundingBox();
        if (box) {
          await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
          await page.waitForTimeout(300);
        }
      }

      // Select Hindi
      const hindiBtn = await page.$('button:has-text("हिंदी")');
      if (hindiBtn) {
        await hindiBtn.click();
        await page.waitForTimeout(1500);
      }

      // Open dropdown again and select Arabic
      await smoothClick(page, langBtnSelector, 600);
      const arabicBtn = await page.$('button:has-text("العربية")');
      if (arabicBtn) {
        await arabicBtn.click();
        await page.waitForTimeout(1500);
      }

      // Switch back to English
      await smoothClick(page, langBtnSelector, 600);
      const enBtn = await page.$('button:has-text("English")');
      if (enBtn) {
        await enBtn.click();
        await page.waitForTimeout(1200);
      }
    }
  );

  // -------------------------------------------------------------
  // CHAPTER 6: DPDP Privacy & Clinical Safety
  // -------------------------------------------------------------
  await recordSingleChapter(
    6,
    null,
    async (page) => {
      // Click interactive DPDP button on the hero banner
      const dpdpBannerBtn = 'button[aria-label*="DPDP"], button[title*="DPDP"]';
      await smoothClick(page, dpdpBannerBtn, 800);

      // Draggable box is now open on screen!
      const boxHeader = 'div:has(h3):has-text("Digital Personal Data Protection"), div[class*="cursor-move"], div:has(h3):has-text("DPDP")';
      try {
        const handlePt = await smoothMoveTo(page, boxHeader, 15);
        if (handlePt) {
          // Drag box smoothly 180px right and 90px down
          await page.mouse.down();
          await page.waitForTimeout(80);
          await page.mouse.move(handlePt.x + 180, handlePt.y + 90, { steps: 20 });
          await page.waitForTimeout(80);
          await page.mouse.up();
          await page.waitForTimeout(600);
        }
      } catch (_) {}

      // Hover over key compliance sections
      for (let i = 0; i < 4; i++) {
        await page.mouse.move(1050 + i * 20, 420 + i * 45, { steps: 10 });
        await page.waitForTimeout(500);
      }

      await page.waitForTimeout(1000);
    }
  );

  server.close();
  console.log('\n✓ ALL ACTIVE CHAPTER WORKFLOWS RECORDED WITH IMMEDIATE INTERACTIONS!');
}

recordAllChapters().catch(err => {
  console.error('Fatal recording error:', err);
  process.exit(1);
});
