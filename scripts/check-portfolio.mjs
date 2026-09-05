// Run with PLAYWRIGHT_MODULE pointing to an installed playwright package if needed.
import { createRequire } from 'node:module';
import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import assert from 'node:assert/strict';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = resolve('out');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.pdf': 'application/pdf', '.txt': 'text/plain' };
const server = createServer(async (req, res) => {
  let file = resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403).end(); return; }
  try {
    if ((await stat(file).catch(() => null))?.isDirectory()) file = resolve(file, 'index.html');
    if (!extname(file)) file += '.html';
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' }).end(data);
  } catch { res.writeHead(404).end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({ channel: 'chrome', headless: true });
await mkdir('local-qa', { recursive: true });
const failures = [];
try {
  for (const language of ['en', 'es']) {
    for (const width of [320, 390, 768, 1024, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await context.addInitScript(lang => localStorage.setItem('portfolio-language', lang), language);
      const page = await context.newPage();
      page.on('pageerror', error => failures.push(error.message));
      page.on('response', response => { if (response.status() >= 400) failures.push(`${response.status()} ${response.url()}`); });
      await page.goto(base, { waitUntil: 'networkidle' });
      await page.waitForFunction(lang => document.documentElement.lang === lang, language);
      await page.waitForFunction(lang => document.querySelector('.hero-intro')?.textContent?.startsWith(lang === 'es' ? 'Soy José' : 'I’m José'), language);
      for (const id of ['home', 'experience', 'projects', 'research', 'stack', 'background', 'contact']) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      }
      await page.waitForTimeout(500);
      await page.locator('img').evaluateAll(images => images.forEach(image => image.scrollIntoView({ block: 'center' })));
      await page.waitForTimeout(500);
      const overflow = await page.evaluate(() => [...document.querySelectorAll('main *')].filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && (r.left < -1 || r.right > innerWidth + 1) && !el.closest('[aria-hidden="true"]');
      }).map(el => `${el.tagName}.${el.className}`));
      assert.deepEqual(overflow, [], `${language}/${width}: overflowing content`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'page overflow');
      const broken = await page.locator('img').evaluateAll(images => images.filter(img => !img.src.endsWith('.svg') && (!img.complete || img.naturalWidth === 0)).map(img => img.src));
      assert.deepEqual(broken, [], 'broken images');
      if (width < 760) {
        const menu = page.locator('.menu-toggle');
        await menu.click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
        await menu.click();
        await page.locator('.site-nav a[href="#projects"]').click();
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.waitForTimeout(150);
      if ([390, 1440].includes(width)) {
        await page.screenshot({ path: `local-qa/hero-${language}-${width}.png` });
        await page.screenshot({ path: `local-qa/home-${language}-${width}.png`, fullPage: true });
        if (language === 'es') {
          await page.locator('#projects').scrollIntoViewIfNeeded();
          await page.screenshot({ path: `local-qa/projects-${language}-${width}.png` });
          await page.locator('.supporting-grid').screenshot({ path: `local-qa/project-art-${width}.png` });
        }
      }
      await page.goto(`${base}/projects/tennis-predictor`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, 'case study overflow');
      if (width === 390 && language === 'es') await page.screenshot({ path: 'local-qa/case-es-390.png', fullPage: true });
      await context.close();
      console.log(`PASS ${language} ${width}px: layout, images, navigation, case study`);
    }
  }
  const page = await browser.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('.desktop-actions .language-switcher').click();
  await page.waitForFunction(() => document.documentElement.lang === 'es');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForFunction(() => document.documentElement.lang === 'es');
  assert.equal((await page.request.get(`${base}/CV-JoseGalvan.pdf`)).status(), 200);
  assert.deepEqual(failures, [], 'browser errors');
  console.log('PASS language persistence, CV and browser errors');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
