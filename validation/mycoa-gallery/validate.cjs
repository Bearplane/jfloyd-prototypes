const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const baseUrl = process.env.GALLERY_URL || 'http://127.0.0.1:4318';
const executablePath = process.env.CHROMIUM_PATH;
const output = __dirname;

(async () => {
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
  const galleryLink = page.locator('a[href="mycoa-sponsorship-journeys/"]');
  if (await galleryLink.count() !== 1) throw new Error('Qredible index gallery link missing');
  await galleryLink.scrollIntoViewIfNeeded();
  await page.screenshot({ path: path.join(output, 'qredible-index.png') });
  await galleryLink.click();
  await page.waitForURL('**/mycoa-sponsorship-journeys/');
  await page.locator('#shot').evaluate((image) => image.decode());
  if (!(await page.locator('#caption').textContent()).includes('Sponsored offer visible before activation')) {
    throw new Error('Sponsored offer is not the first gallery step');
  }
  if (!(await page.locator('#shot').getAttribute('src')).includes('141-sponsored-plan-card-before-activation')) {
    throw new Error('Sponsored offer screenshot is not displayed');
  }
  const imagesDecoded = await page.evaluate(async () => {
    let count = 0;
    for (const chapter of window.JOURNEYS.chapters) {
      for (const slide of chapter.slides) {
        if ('source' in slide || 'capturedFileModifiedAt' in slide) {
          throw new Error('Private source metadata was published');
        }
        const image = new Image();
        image.src = slide.src;
        await image.decode();
        if (!image.naturalWidth) throw new Error(slide.src);
        count += 1;
      }
    }
    return count;
  });
  if (imagesDecoded !== 141) throw new Error(`Expected 141 images, found ${imagesDecoded}`);
  await page.screenshot({ path: path.join(output, 'gallery-desktop.png') });

  await page.locator('#next').click();
  if (await page.locator('#step').inputValue() !== '1') throw new Error('Next failed');
  await page.keyboard.press('ArrowLeft');
  if (await page.locator('#step').inputValue() !== '0') throw new Error('Keyboard navigation failed');
  await page.locator('#step').selectOption('5');
  await page.locator('#next').click();
  if (await page.locator('#journey').inputValue() !== '1') throw new Error('Chapter navigation failed');
  await page.locator('#grid').click();
  if (await page.locator('#thumbs button').count() !== 5) throw new Error('Thumbnails failed');
  await page.locator('#thumbs button').nth(2).click();
  if (await page.locator('#step').inputValue() !== '2') throw new Error('Thumbnail selection failed');
  await page.locator('#zoom').click();
  if (!(await page.locator('#stage').evaluate((node) => node.classList.contains('zoom')))) {
    throw new Error('Actual-size mode failed');
  }
  await page.locator('#zoom').click();
  await page.locator('#about').click();
  if (!(await page.locator('#evidence').evaluate((node) => node.open))) {
    throw new Error('Evidence dialog failed');
  }
  await page.locator('#close').click();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('#journey').selectOption('8');
  await page.locator('#step').selectOption('2');
  await page.locator('#shot').evaluate((image) => image.decode());
  await page.screenshot({ path: path.join(output, 'gallery-mobile.png'), fullPage: true });
  if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) {
    throw new Error('Mobile horizontal overflow');
  }
  if (errors.length) throw new Error(errors.join('\n'));

  const result = {
    passed: true,
    scope: 'Static gallery and Qredible index route only; not product E2E',
    baseUrl,
    imagesDecoded,
    journeys: await page.evaluate(() => window.JOURNEYS.chapters.length),
    testedAt: new Date().toISOString(),
  };
  fs.writeFileSync(path.join(output, 'result.json'), JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result));
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
