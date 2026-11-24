import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const outDir = 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7';

  // 1. Verify Header & Sign In Button bounding box on desktop
  const headerInfo = await page.evaluate(() => {
    const header = document.querySelector('header');
    const signInBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Sign In'));
    return {
      windowWidth: window.innerWidth,
      headerRect: header ? header.getBoundingClientRect() : null,
      btnRect: signInBtn ? signInBtn.getBoundingClientRect() : null
    };
  });
  console.log('Desktop Header & Sign In Button Info:', JSON.stringify(headerInfo, null, 2));

  // Screenshot Header
  const headerEl = await page.$('header');
  if (headerEl) {
    await headerEl.screenshot({ path: path.join(outDir, 'final_verified_header_1440px.jpg') });
  }

  // 2. Screenshot Hero Section (Doctor Banner)
  const heroEl = await page.$('#home');
  if (heroEl) {
    await heroEl.screenshot({ path: path.join(outDir, 'final_verified_hero_1440px.jpg') });
  }

  // 3. Screenshot Explore by Category (My Symptoms 1,000+ cards)
  const catEl = await page.$('#categories');
  if (catEl) {
    await catEl.screenshot({ path: path.join(outDir, 'final_verified_categories_1440px.jpg') });
  }

  // 4. Test Chat Assistant Interactivity
  const chatSection = await page.$('#chat-assistant');
  if (chatSection) {
    // Click one of the quick prompts
    const promptBtn = await page.$('#chat-assistant button:has-text("Severe right-side headache")');
    if (promptBtn) {
      await promptBtn.click();
      console.log('Clicked prompt chip');
      // Wait for AI response simulation (600ms + margin)
      await page.waitForTimeout(1200);
    }
    await chatSection.screenshot({ path: path.join(outDir, 'final_verified_chat_assistant_interactive.jpg') });
  }

  // 5. Desktop Full Viewport
  await page.screenshot({ path: path.join(outDir, 'final_verified_desktop_top_1440px.jpg'), fullPage: false });

  // 6. Mobile 401px Viewport
  await page.setViewportSize({ width: 401, height: 860 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, 'final_verified_mobile_401px.jpg'), fullPage: false });

  // Mobile Header & Hero
  const mobileHero = await page.$('#home');
  if (mobileHero) {
    await mobileHero.screenshot({ path: path.join(outDir, 'final_verified_mobile_hero.jpg') });
  }

  // Mobile Categories
  const mobileCat = await page.$('#categories');
  if (mobileCat) {
    await mobileCat.screenshot({ path: path.join(outDir, 'final_verified_mobile_categories.jpg') });
  }

  // Mobile Chat Assistant
  const mobileChat = await page.$('#chat-assistant');
  if (mobileChat) {
    await mobileChat.screenshot({ path: path.join(outDir, 'final_verified_mobile_chat.jpg') });
  }

  console.log('All final verification screenshots captured successfully!');
  await browser.close();
})();
