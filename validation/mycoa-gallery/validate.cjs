// End-to-end walkthrough-site QA. Underlying application actions are separate,
// dated evidence; this test never authenticates to or mutates the product.
const fs = require('node:fs');
const path = require('node:path');
const { chromium, expect } = require(process.env.PLAYWRIGHT_MODULE || '@playwright/test');
const baseUrl = process.env.GALLERY_URL || 'http://127.0.0.1:4328';
const output = process.env.VALIDATION_OUTPUT || __dirname;
fs.mkdirSync(output,{recursive:true});
(async () => {
 const browser = await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context = await browser.newContext({viewport:{width:1600,height:1000}});
 await context.grantPermissions(['clipboard-read','clipboard-write']);
 const page = await context.newPage();
 const result = {at:new Date().toISOString(),baseUrl,browser:browser.version(),scope:'Full static jfloyd-prototypes site route and user controls; not a new product billing E2E run',screenshots:0,journeys:0,checks:[],pageErrors:[],failedResponses:[]};
 page.on('pageerror',e=>result.pageErrors.push(e.message));
 page.on('response',r=>{if(r.status()>=400)result.failedResponses.push({url:r.url(),status:r.status()});});
 const snap=async name=>page.screenshot({path:path.join(output,name),fullPage:true});
 const decoded=async()=>{await expect(page.locator('#shot')).toHaveAttribute('src',/^assets\//);await page.locator('#shot').evaluate(img=>img.decode());await expect.poll(()=>page.locator('#shot').evaluate(img=>img.complete&&img.naturalWidth>0)).toBe(true);};
 const choose=async id=>{const idx=await page.evaluate(id=>window.JOURNEYS.chapters.findIndex(c=>c.id===id),id);await page.locator('#chapters button').nth(idx).click();await decoded();return idx;};
 try {
  await page.goto(baseUrl+'/',{waitUntil:'networkidle'});
  const link=page.locator('a[href="mycoa-sponsorship-journeys/"]');await expect(link).toHaveCount(1);await link.scrollIntoViewIfNeeded();await snap('qredible-index.png');await link.click();await decoded();
  const data=await page.evaluate(()=>window.JOURNEYS);
  expect(data.total).toBe(200);expect(data.chapters.length).toBe(26);
  await expect(page.locator('#slide-title')).toContainText('Sponsored offer before activation');await snap('gallery-desktop.png');
  for(let j=0;j<data.chapters.length;j++) {
   const c=data.chapters[j];await page.locator('#chapters button').nth(j).click();
   for(let s=0;s<c.slides.length;s++) {
    const slide=c.slides[s];await decoded();
    await expect(page.locator('#shot')).toHaveAttribute('src',slide.src);
    await expect(page.locator('#caption')).toHaveText(slide.caption);
    await expect(page.locator('#evidence-label')).toHaveText(slide.evidence.label);
    await expect(page.locator('#capture-date')).toHaveText(slide.evidence.date);
    await expect(page.locator('#configurable')).toHaveText(c.configurable);
    expect(slide).not.toHaveProperty('source');expect(slide).not.toHaveProperty('capturedFileModifiedAt');
    result.screenshots++;if(s<c.slides.length-1)await page.locator('#next').click();
   }
   result.journeys++;
  }
  result.checks.push('All 200 images visited through chapter and Next controls, decoded, with matching captions, provenance and Q-Config notes');
  await choose('paywall');await page.locator('#next').click();await page.keyboard.press('ArrowLeft');await expect(page.locator('#step')).toHaveValue('0');
  const firstCount=data.chapters[0].slides.length;await page.locator('#step').selectOption(String(firstCount-1));await page.locator('#next').click();await expect(page.locator('#title')).toHaveText(data.chapters[1].title);
  await page.locator('#grid').click();await expect(page.locator('#thumbs button')).toHaveCount(data.chapters[1].slides.length);await page.locator('#thumbs button').nth(2).click();await expect(page.locator('#step')).toHaveValue('2');
  await page.locator('#zoom').click();await expect(page.locator('#stage')).toHaveClass('read');await page.locator('#zoom').click();
  await page.locator('#present').click();await expect(page.locator('body')).toHaveClass('presenting');await expect(page.locator('.notes')).toBeHidden();await snap('presentation.png');await page.keyboard.press('Escape');await expect(page.locator('.notes')).toBeVisible();
  await page.locator('#copyguide').click();await expect(page.locator('#guide')).toBeVisible();await expect(page.locator('#guide tbody tr')).toHaveCount(8);await snap('wording-guide.png');await page.locator('[data-go="card-copy"]').click();await expect(page.locator('#title')).toHaveText(data.chapters.find(c=>c.id==='card-copy').title);await snap('qconfig-wording.png');
  await page.locator('#copylink').click();await expect(page.locator('#link-status')).toHaveText('Link copied');const copied=await page.evaluate(()=>navigator.clipboard.readText());expect(copied).toContain('chapter=card-copy');await page.goto(copied);await decoded();await expect(page.locator('#title')).toHaveText(data.chapters.find(c=>c.id==='card-copy').title);
  await page.locator('#tour').selectOption('copy');await expect(page.locator('#chapters button:visible')).toHaveCount(8);await expect(page.locator('#journey option')).toHaveCount(8);
  await page.locator('#tour').selectOption('finance');await expect(page.locator('#title')).toHaveText('Issue the processor invoice');await snap('invoice-walkthrough.png');
  await page.locator('#tour').selectOption('all');await page.locator('#about').click();await expect(page.locator('#evidence')).toBeVisible();await expect(page.locator('#sources a')).toHaveCount(7);await page.locator('[data-close="evidence"]').click();
  result.checks.push('Next/Previous, keyboard, cross-chapter transitions, thumbnails, text-reading view, presentation/Esc, wording guide jumps, clipboard deep links, filtered paths and evidence dialog');
  await page.setViewportSize({width:1280,height:720});await choose('paywall');await snap('gallery-1280.png');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.setViewportSize({width:390,height:844});await page.locator('#journey').selectOption(String(data.chapters.findIndex(c=>c.id==='shared-cost')));await decoded();await snap('gallery-mobile.png');expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.locator('#copyguide').click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);await page.locator('[data-close="guide"]').click();
  await page.locator('#present').click();await snap('presentation-mobile.png');await page.keyboard.press('Escape');
  result.checks.push('1600px / 1280px / 390px responsive layouts, mobile chapter selection, guide and presentation');
  expect(result.pageErrors).toEqual([]);expect(result.failedResponses).toEqual([]);result.passed=true;
 } catch(e) { result.passed=false;result.error=e.message;await snap('qa-error.png');process.exitCode=1; }
 finally { fs.writeFileSync(path.join(output,'result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));await browser.close(); }
})().catch(e=>{console.error(e.message);process.exitCode=1;});
