import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from 'playwright';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');
const EVIDENCE_DIR = path.resolve(__dirname, '../../../tools/audit_frames_readonly/browser_play_evidence');
fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

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

function startServer(port = 5173) {
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
      console.log(`✓ Audit Server listening at http://localhost:${port}`);
      resolve(server);
    });
    server.on('error', reject);
  });
}

async function auditBrowserPlayback() {
  const server = await startServer(5173);
  
  console.log('Launching browser to audit http://localhost:5173/...');
  const browser = await chromium.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage({
    viewport: { width: 1920, height: 1080 }
  });

  await page.addInitScript(() => {
    sessionStorage.setItem('healthorbit_disclaimer_ack', 'true');
  });

  const networkLogs = [];
  page.on('response', resp => {
    if (resp.url().includes('/assets/videos/')) {
      networkLogs.push({
        url: resp.url(),
        status: resp.status(),
        contentType: resp.headers()['content-type'],
        contentRange: resp.headers()['content-range'],
        acceptRanges: resp.headers()['accept-ranges']
      });
    }
  });

  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  console.log('✓ Page loaded.');

  // Scroll to player
  await page.evaluate(() => {
    const el = document.getElementById('resources') || document.getElementById('demo-videos');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await page.waitForTimeout(1000);

  // Play video
  await page.keyboard.press('Space');
  await page.waitForTimeout(1000);

  // Check state
  const playerState = await page.evaluate(() => {
    const v = document.querySelector('video');
    return {
      currentSrc: v.currentSrc,
      currentTime: v.currentTime,
      duration: v.duration,
      paused: v.paused,
      error: v.error ? v.error.message : null
    };
  });
  console.log('Player state after Space:', playerState);

  // Take screenshots during playback at each chapter
  const chaptersToSample = [
    { name: 'ch1_doctor_welcome', seek: 4.0 },
    { name: 'ch1_homepage_ui', seek: 12.0 },
    { name: 'ch2_symptom_checker', seek: 22.0 },
    { name: 'ch3_health_cards', seek: 33.0 },
    { name: 'ch4_family_health', seek: 45.0 },
    { name: 'ch5_multilingual', seek: 55.0 },
    { name: 'ch6_dpdp_privacy', seek: 65.0 },
    { name: 'ch7_closing_doctor', seek: 78.0 }
  ];

  for (const ch of chaptersToSample) {
    await page.evaluate((t) => {
      const v = document.querySelector('video');
      if (v) v.currentTime = t;
    }, ch.seek);
    await page.waitForTimeout(1500);

    const actualT = await page.evaluate(() => document.querySelector('video').currentTime);
    const shotPath = path.join(EVIDENCE_DIR, `browser_${ch.name}_at_${actualT.toFixed(1)}s.png`);
    await page.screenshot({ path: shotPath });
    console.log(`📸 Captured browser screenshot: ${ch.name} at ${actualT.toFixed(1)}s -> ${path.basename(shotPath)}`);
  }

  console.log('\n--- Network Logs for Video Requests ---');
  for (const nl of networkLogs) {
    console.log(`  [HTTP ${nl.status}] ${path.basename(nl.url)} | Type: ${nl.contentType} | Range: ${nl.contentRange}`);
  }

  await browser.close();
  server.close();
  console.log('\n✓ Browser audit complete!');
}

auditBrowserPlayback().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
