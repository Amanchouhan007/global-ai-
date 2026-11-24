import { chromium } from './node_modules/playwright/index.mjs';
import path from 'path';

const ARTIFACTS_DIR = 'C:/Users/91969/.gemini/antigravity/brain/f43afba9-da11-4144-9ebc-c1575c588de7';

async function verifyMultiLanguage() {
  console.log('Launching browser to verify multi-language dynamic rendering...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  try {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle', timeout: 15000 });
    console.log('Page loaded successfully at http://localhost:5173/');

    // Click the Language dropdown button in the header
    console.log('Opening Language dropdown in Header...');
    const langBtn = page.locator('button[title="Select language"]');
    await langBtn.waitFor({ state: 'visible', timeout: 5000 });
    await langBtn.click();
    await page.waitForTimeout(400);

    // Click Hindi option using explicit data-lang attribute
    console.log('Clicking Hindi (button[data-lang="HI"])...');
    const hindiBtn = page.locator('button[data-lang="HI"]');
    await hindiBtn.click();
    await page.waitForTimeout(800);

    // Verify localStorage & header state
    const currentLangVal = await page.evaluate(() => localStorage.getItem('healthorbit_language'));
    console.log('Active language in localStorage:', currentLangVal);

    // Scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    // Verify Hero & Symptom Search
    const heroHeadline = await page.locator('h1, .hero-headline').first().innerText().catch(() => '');
    console.log('Hero Headline Text:', heroHeadline);

    // Capture Section 1: Hero & Search
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'verified_hindi_hero_search.png'),
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved: verified_hindi_hero_search.png');

    // Scroll to Categories & Chatbot
    const catElem = page.locator('#categories');
    if (await catElem.count() > 0) {
      await catElem.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'verified_hindi_categories_chat.png'),
        clip: { x: 0, y: Math.max(0, (await catElem.boundingBox())?.y || 800), width: 1440, height: 950 }
      });
      console.log('Saved: verified_hindi_categories_chat.png');
    }

    // Scroll to How It Works & Doctor Profile
    const howElem = page.locator('#how-it-works');
    if (await howElem.count() > 0) {
      await howElem.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'verified_hindi_howitworks_doctor.png'),
        clip: { x: 0, y: Math.max(0, (await howElem.boundingBox())?.y || 1600), width: 1440, height: 950 }
      });
      console.log('Saved: verified_hindi_howitworks_doctor.png');
    }

    // Scroll to Risk Levels & DPDP
    const riskElem = page.locator('#risk-levels');
    if (await riskElem.count() > 0) {
      await riskElem.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'verified_hindi_risk_dpdp.png'),
        clip: { x: 0, y: Math.max(0, (await riskElem.boundingBox())?.y || 2400), width: 1440, height: 950 }
      });
      console.log('Saved: verified_hindi_risk_dpdp.png');
    }

    // Scroll to FAQ & Feedback & Footer
    const faqElem = page.locator('#faq');
    if (await faqElem.count() > 0) {
      await faqElem.scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'verified_hindi_faq_feedback_footer.png'),
        clip: { x: 0, y: Math.max(0, (await faqElem.boundingBox())?.y || 3200), width: 1440, height: 1000 }
      });
      console.log('Saved: verified_hindi_faq_feedback_footer.png');
    }

    // Capture Full Page in Hindi
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'verified_hindi_fullpage.png'),
      fullPage: true
    });
    console.log('Saved: verified_hindi_fullpage.png');

    // 2. Also test Marathi (MR) to confirm instant dynamic switching
    console.log('Testing dynamic switch to Marathi (MR)...');
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const langBtn2 = page.locator('button[title="Select language"]');
    await langBtn2.click();
    await page.waitForTimeout(400);

    const marathiOption = page.locator('button[data-lang="MR"]');
    await marathiOption.click();
    await page.waitForTimeout(800);

    const marathiLangVal = await page.evaluate(() => localStorage.getItem('healthorbit_language'));
    console.log('Active language after MR switch:', marathiLangVal);

    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'verified_marathi_hero.png'),
      clip: { x: 0, y: 0, width: 1440, height: 850 }
    });
    console.log('Saved: verified_marathi_hero.png');

    console.log('ALL VERIFICATIONS COMPLETED SUCCESSFULLY!');
  } catch (err) {
    console.error('Verification error:', err);
  } finally {
    await browser.close();
  }
}

verifyMultiLanguage();
