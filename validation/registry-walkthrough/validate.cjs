// Actual hosted/local walkthrough website E2E, not a repeat of product workflows.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {chromium,expect}=require(process.env.PLAYWRIGHT_MODULE||'@playwright/test');
const base=process.env.WALKTHROUGH_ORIGIN||'http://127.0.0.1:4339',out=path.resolve(process.env.VALIDATION_OUTPUT||path.join(__dirname,'local'));
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context=await browser.newContext({viewport:{width:1600,height:1100}});await context.grantPermissions(['clipboard-read','clipboard-write']);
 const page=await context.newPage(),result={at:new Date().toISOString(),origin:base,browser:browser.version(),scope:'Actual full static walkthrough website, normal routes and controls; underlying product screenshots are dated local design evidence',chapters:0,images:0,sourceFiles:0,checks:[],pageErrors:[],failedResponses:[]};
 page.on('pageerror',e=>result.pageErrors.push(e.message));page.on('response',r=>{if(r.status()>=400&&new URL(r.url()).origin===base)result.failedResponses.push({url:r.url(),status:r.status()});});
 const snap=name=>page.screenshot({path:path.join(out,name),fullPage:true,animations:'disabled'});
 const decoded=async()=>{await expect(page.locator('#shot')).toHaveAttribute('src',/^assets\//);await page.locator('#shot').evaluate(img=>img.decode());expect(await page.locator('#shot').evaluate(img=>img.naturalWidth)).toBeGreaterThan(1000);};
 const choose=async id=>{await page.locator('#filter').selectOption('all');const i=await page.evaluate(id=>window.REGISTRY_WALKTHROUGH.chapters.findIndex(c=>c.id===id),id);await page.locator('#chapters button').filter({has:page.locator('span')}).evaluateAll(()=>{});await page.locator(`#chapters button[data-chapter="${i}"]`).click();};
 try{
  await page.goto(base+'/',{waitUntil:'networkidle'});const link=page.locator('a[href="registry-user-journeys/"]');await expect(link).toHaveCount(1);await link.scrollIntoViewIfNeeded();await snap('qredible-hub.png');await link.click();await expect(page.locator('#title')).toHaveText('One registry, with MyCOA inside it');
  const data=await page.evaluate(()=>window.REGISTRY_WALKTHROUGH),coverage=await page.evaluate(()=>window.REGISTRY_COVERAGE);expect(data.chapters.length).toBe(26);expect(coverage.files.length).toBe(26);result.sourceFiles=coverage.files.length;
  const manifest=await (await page.request.get(base+'/registry-user-journeys/capture-manifest.json')).json();expect(manifest.images.length).toBe(29);
  const names=new Set();
  for(let i=0;i<data.chapters.length;i++){
   const c=data.chapters[i];await page.locator(`#chapters button[data-chapter="${i}"]`).click();await expect(page.locator('#title')).toHaveText(c.title);await expect(page.locator('#after')).toHaveText(c.after);await expect(page.locator('#decision')).toHaveText(c.decision);
   if(c.shots){for(let j=0;j<c.shots.length;j++){await page.locator('#step').selectOption(String(j));await decoded();await expect(page.locator('#shot')).toHaveAttribute('src','assets/'+c.shots[j][0]);await expect(page.locator('#shot-caption')).toHaveText(c.shots[j][2]);const r=await page.request.get(base+'/registry-user-journeys/assets/'+c.shots[j][0]);expect(r.status()).toBe(200);const bytes=await r.body(),pin=manifest.images.find(v=>v.file==='assets/'+c.shots[j][0]);expect(crypto.createHash('sha256').update(bytes).digest('hex')).toBe(pin.sha256);names.add(c.shots[j][0]);result.images++;}}
   else{await expect(page.locator('#visual')).toBeHidden();await expect(page.locator('#proposal-panel')).toBeVisible();await expect(page.locator('#kind')).toContainText(c.kind==='source'?'Source reviewed':'Future proposal');}
   result.chapters++;
  }
  expect(names.size).toBe(29);result.checks.push('All 26 chapter narratives and all 29 original screenshots visited/decoded; served image SHA256 matches manifest; all source-only/future labels explicit');
  await choose('mixed');await page.locator('#step').selectOption('1');await decoded();await snap('walkthrough-products.png');await page.keyboard.press('ArrowLeft');await expect(page.locator('#step')).toHaveValue('0');await page.keyboard.press('ArrowRight');await expect(page.locator('#step')).toHaveValue('1');
  await page.locator('#zoom').click();await expect(page.locator('#stage')).toHaveClass('read');await page.locator('#zoom').click();
  await page.locator('#share').click();await expect(page.locator('#toast')).toHaveText('Step link copied');const copied=await page.evaluate(()=>navigator.clipboard.readText());expect(copied).toContain('#chapter=mixed&step=2');await page.reload();await decoded();await expect(page.locator('#step')).toHaveValue('1');
  await page.locator('#grid').click();await expect(page.locator('#thumbs button')).toHaveCount(29);await page.locator('#thumbs button').last().click();await decoded();await expect(page.locator('#title')).toHaveText('Preview a product record with zero COAs');
  await page.locator('#present').click();await expect(page.locator('body')).toHaveClass('presenting');await snap('presentation-product-record.png');await page.keyboard.press('Escape');await expect(page.locator('body')).not.toHaveClass('presenting');
  await page.locator('#coverage').click();await expect(page.locator('.coverage-row')).toHaveCount(26);await snap('changed-source-coverage.png');await page.locator('.coverage-row').filter({hasText:'IsoMerchantWorkspace.tsx'}).getByRole('button').click();await expect(page.locator('#title')).toHaveText('Separate access, applicability and outcome');await expect(page.locator('#visual')).toBeHidden();
  await page.locator('#about').click();await expect(page.locator('#evidence')).toBeVisible();await snap('evidence-and-decisions.png');await page.getByRole('button',{name:'Close',exact:true}).first().click();
  for(const role of ['Merchant','Processor','Team','capture']){await page.locator('#filter').selectOption(role);expect(await page.locator('#chapters button').count()).toBe(data.chapters.filter(c=>role==='capture'?c.kind==='capture':c.actor===role).length);}
  await page.locator('#filter').selectOption('all');await choose('paywall');await page.locator('#step').selectOption('1');await decoded();await snap('walkthrough-plan.png');
  for(const width of [1600,1280,390]){await page.setViewportSize({width,height:1000});await choose('no-coa');await page.locator('#step').selectOption('1');await decoded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);await snap('responsive-'+width+'.png');}
  result.checks.push('Keyboard previous/next, full-size reading, clipboard deep link + reload, 29-image overview selection, presentation/Escape, 26-file coverage jumps, evidence dialog, all role filters, 1600/1280/390px layouts');
  expect(result.pageErrors).toEqual([]);expect(result.failedResponses).toEqual([]);result.pass=true;
 }catch(e){result.pass=false;result.error=e.stack;await snap('failure.png').catch(()=>{});process.exitCode=1;}
 finally{fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));await browser.close();}
})();
