// Chromium journeys of the actual static review website. NOT Qredible application acceptance.
const fs=require('node:fs'),path=require('node:path');
const {chromium,expect}=require(process.env.PLAYWRIGHT_MODULE||'@playwright/test');
const origin=process.env.WALKTHROUGH_ORIGIN||'http://127.0.0.1:4339';
const out=path.resolve(process.env.MIGRATION_VALIDATION_OUTPUT||path.join(__dirname,'migration-local'));
fs.mkdirSync(out,{recursive:true});
(async()=>{
 const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});
 const context=await browser.newContext({viewport:{width:1600,height:1100}});await context.grantPermissions(['clipboard-read','clipboard-write']);const page=await context.newPage();
 const result={at:new Date().toISOString(),origin,browser:browser.version(),scope:'Minimal-change migration prototype website; sample data and browser memory, not actual Qredible/Q-Config/provider acceptance',screenshots:[],checks:[],pageErrors:[],failedResponses:[],productApiRequests:[],hostingTelemetry:[]};
 const trackPage=target=>{
 target.on('pageerror',e=>result.pageErrors.push(e.message));
 target.on('response',r=>{if(r.status()>=400&&new URL(r.url()).origin===origin)result.failedResponses.push({url:r.url(),status:r.status()});});
 target.on('request',r=>{const u=new URL(r.url());if(u.hostname==='app.netlify.com'&&/^\/access-control\/bb-api\/api\/v1\/cdp\/deploys\/[^/]+\/views$/.test(u.pathname))result.hostingTelemetry.push(u.origin+u.pathname);else if(/\/api\//.test(u.pathname))result.productApiRequests.push(r.url());});
 };trackPage(page);
 const snap=async name=>{await page.screenshot({path:path.join(out,name+'.png'),fullPage:true,animations:'disabled'});result.screenshots.push(name+'.png');};
 const screen=async id=>{await page.locator('#screen-picker').selectOption(id);await expect(page.locator('#screen-picker')).toHaveValue(id);};
 const section=async id=>page.locator(`#review-nav [data-section="${id}"]`).click();
 try{
  await page.goto(origin+'/registry-user-journeys/?design=navigation-v5',{waitUntil:'networkidle'});
  await expect(page.locator('.app-heading h2')).toHaveText('Q-Registry');
  const views=await page.evaluate(()=>window.REGISTRY_MIGRATION.screens);expect(views).toHaveLength(9);
  for(const v of views){await screen(v.id);await expect(page.locator('.change-rail h2')).not.toBeEmpty();await expect(page.locator('.change-rail')).toContainText(v.id==='labels'?'Scoped Labels addition':'Release 1 proposal');await expect(page.locator('.folder-tabs [data-screen="coas"]')).toHaveText('COAs');await expect(page.locator('.folder-tabs [data-screen="display"]')).toHaveText('Display');await expect(page.locator('.folder-tabs')).not.toContainText('Evidence');await snap('proposed-'+v.id);await page.locator('#view-mode').selectOption('current');await expect(page.locator('.app-heading h2')).toHaveText('MyCOA');await expect(page.locator('.baseline-note')).toContainText('source-based reconstruction');await snap('current-structure-'+v.id);await page.locator('#view-mode').selectOption('proposed');}
  result.checks.push('All nine screen families: labeled current-source sketch versus proposed UI, permanent per-screen reuse/rename/adjust mapping; COAs and Display remain direct tabs');
  await screen('products');await page.locator('#overview-access').uncheck();await expect(page.locator('.folder-tabs [data-screen="overview"]')).toHaveCount(0);await page.locator('#overview-access').check();await expect(page.locator('.folder-tabs [data-screen="overview"]')).toHaveCount(1);

  const nav=page.locator('#workspace-tabs');
  await expect(nav.locator('button')).toHaveText(['Dashboard','Overview','COAs','Products','Labels New','Display']);
  await expect(nav.locator('[aria-current="page"]')).toHaveText('Products');
  await expect(nav.getByRole('button',{name:'Labs',exact:true})).toHaveCount(0);
  await expect(nav.getByRole('button',{name:'Distributors',exact:true})).toHaveCount(0);
  await expect(page.locator('.workspace-tab-row')).toHaveAttribute('data-overflow','false');
  await snap('navigation-desktop');
  await page.locator('.upcoming-sections summary').click();await expect(page.locator('.upcoming-sections')).toContainText('Labs');await expect(page.locator('.upcoming-sections')).toContainText('Distributors');await expect(page.locator('.upcoming-sections')).toContainText('not available yet');await snap('navigation-coming-soon');
  await page.locator('#view-mode').selectOption('current');await expect(page.locator('.folder-tabs').getByRole('button',{name:'Labs',exact:true})).toBeVisible();await expect(page.locator('.folder-tabs').getByRole('button',{name:'Distributors',exact:true})).toBeVisible();await expect(page.locator('.upcoming-sections')).toHaveCount(0);await page.locator('#view-mode').selectOption('proposed');
  const fullyVisible=async selector=>page.locator(selector).evaluate(el=>{const item=el.getBoundingClientRect(),viewport=el.parentElement.getBoundingClientRect();return item.left>=viewport.left-1&&item.right<=viewport.right+1;});
  for(const width of [390,320]){
   await page.setViewportSize({width,height:1100});await screen('dashboard');
   await expect(page.locator('.workspace-tab-row')).toHaveAttribute('data-overflow','true');
   await expect(page.getByRole('button',{name:'Scroll workspace tabs left',exact:true})).toBeDisabled();
   await expect(page.getByRole('button',{name:'Scroll workspace tabs right',exact:true})).toBeEnabled();
   expect(await nav.locator('button').first().evaluate(el=>getComputedStyle(el).fontSize)).toBe('12px');
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1)).toBe(true);
   await snap('navigation-'+width+'-start');
   await page.getByRole('button',{name:'Scroll workspace tabs right',exact:true}).click();
   await expect.poll(()=>nav.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);
   // Horizontal wheel/trackpad scrolling uses the browser's native overflow region.
   await nav.hover();await page.mouse.wheel(1000,0);await expect(page.getByRole('button',{name:'Scroll workspace tabs right',exact:true})).toBeDisabled();
   await nav.locator('[data-screen="display"]').click();await expect(nav.locator('[aria-current="page"]')).toHaveText('Display');
   expect(await fullyVisible('#workspace-tabs [data-screen="display"]')).toBe(true);
   await expect(nav.locator('[data-screen="display"]')).toBeFocused();await snap('navigation-'+width+'-display');
   await page.keyboard.press('Home');await expect(nav.locator('[data-screen="dashboard"]')).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#screen-picker')).toHaveValue('dashboard');
   await page.keyboard.press('ArrowRight');await expect(nav.locator('[data-screen="overview"]')).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#screen-picker')).toHaveValue('overview');
   await page.locator('#overview-access').uncheck();await expect(nav.locator('[data-screen="overview"]')).toHaveCount(0);await expect(page.locator('#screen-picker')).toHaveValue('products');
   await nav.locator('[data-screen="products"]').focus();await page.keyboard.press('End');await expect(nav.locator('[data-screen="display"]')).toBeFocused();await page.keyboard.press('Enter');
   await page.reload();await expect(nav.locator('[aria-current="page"]')).toHaveText('Display');expect(await fullyVisible('#workspace-tabs [data-screen="display"]')).toBe(true);
   await page.locator('#overview-access').check();
  }
  await page.emulateMedia({reducedMotion:'reduce'});await screen('dashboard');await page.getByRole('button',{name:'Scroll workspace tabs right',exact:true}).click();expect(await nav.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);await page.emulateMedia({reducedMotion:'no-preference'});
  // Real Chromium touch input: swipe the normal tab bar, no synthetic application handlers.
  const touchContext=await browser.newContext({viewport:{width:390,height:850},isMobile:true,hasTouch:true});const touchPage=await touchContext.newPage();trackPage(touchPage);
  await touchPage.goto(origin+'/registry-user-journeys/?design=navigation-v5#screen=dashboard&overview=on',{waitUntil:'networkidle'});
  const touchNav=touchPage.locator('#workspace-tabs'),box=await touchNav.boundingBox(),cdp=await touchContext.newCDPSession(touchPage);
  const x=box.x+box.width-20,y=box.y+20;await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x,y}]});
  for(let i=1;i<=8;i++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x-i*22,y}]});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await expect.poll(()=>touchNav.evaluate(el=>el.scrollLeft)).toBeGreaterThan(0);await touchContext.close();
  await page.setViewportSize({width:1600,height:1100});await expect(page.locator('.workspace-tab-row')).toHaveAttribute('data-overflow','false');await screen('products');
  result.checks.push('Horizontal navigation: strong selected state, quiet future-section disclosure with unchanged current sketch, Overview gate, no reduced font on320/390px, arrow and native wheel/touch overflow, Home/End/arrow keyboard focus and activation, active-tab reveal on reload/resize, reduced-motion support.');

  for(const scenario of ['mixed','no-coa','required','unknown','empty']){await page.locator('#scenario').selectOption(scenario);await screen('products');await expect(page.locator('.kpi strong').first()).toHaveText(String({mixed:3,'no-coa':2,required:2,unknown:1,empty:0}[scenario]));if(scenario==='no-coa'){await expect(page.locator('#coa-columns')).not.toBeChecked();await expect(page.locator('.quick-actions')).not.toContainText('missing a COA');}if(scenario==='unknown')await expect(page.locator('#product-rows')).toContainText('Undetermined');await snap('catalog-'+scenario);await page.locator('.folder-tabs [data-screen="coas"]').click();await expect(page.locator('.coa-feature h3')).toHaveText('COAs · MyCOA');await expect(page.getByRole('button',{name:'Upload COAs',exact:true})).toBeEnabled();}
  result.checks.push('Five catalog states; optional Overview gate; no-COA relevance preset without removing direct COAs access; unknown applicability never treated as an exemption in the proposal');
  await page.locator('#scenario').selectOption('no-coa');await screen('coas');await page.getByRole('button',{name:'Upload COAs',exact:true}).click();await page.locator('#report-file').setInputFiles({name:'supporting-report.pdf',mimeType:'application/pdf',buffer:Buffer.from('Prototype filename fixture only')});await page.getByRole('button',{name:'Add sample report',exact:true}).click();await expect(page.locator('#coa-rows')).toContainText('Received · review pending');await snap('no-coa-optional-report');await page.locator('#coa-search').fill('no-match');await expect(page.locator('#coa-rows')).toContainText('No COAs to show');await page.locator('#coa-search').fill('');
  await screen('products');await page.locator('#coa-columns').check();await expect(page.locator('thead')).toContainText('COA');await page.locator('#product-search').fill('soap');await expect(page.locator('#product-rows tr')).toHaveCount(1);await page.locator('#product-search').fill('');await page.getByRole('button',{name:'＋ Add a product',exact:true}).click();await page.locator('[name="name"]').fill('New mixed-catalog item <safe>');await page.locator('[name="sku"]').fill('ADDED-01');await page.getByRole('button',{name:'Add sample product',exact:true}).click();await expect(page.locator('#product-rows')).toContainText('New mixed-catalog item <safe>');await expect(page.locator('#product-rows')).toContainText('Undetermined');await page.locator('#product-filter').selectOption('unknown');await expect(page.locator('#product-rows tr')).toHaveCount(1);await snap('new-product-undetermined');
  await page.locator('#scenario').selectOption('empty');await page.locator('#product-search').fill('empty search');await page.locator('#product-filter').selectOption('unknown');
  result.checks.push('No-COA merchant uploads optional sample filename without plan switch; report stays review-pending. Product creation, escaped input, search, manual COA column and unknown filter work; empty catalog controls do not crash');
  await page.locator('#scenario').selectOption('required');await screen('dashboard');await page.getByRole('button',{name:'Products missing a COA 2',exact:true}).click();await expect(page.locator('#product-filter')).toHaveValue('required');await expect(page.locator('#product-rows tr')).toHaveCount(2);
  await screen('display');for(const id of ['branding','content','template','embed','advanced']){await page.locator(`[data-display="${id}"]`).click();await snap('display-'+id);}
  await page.locator('[data-display="content"]').click();await page.locator('#directory-heading').fill('Our certificates on file');await expect(page.locator('#preview-heading')).toHaveText('Our certificates on file');await page.locator('[data-display="embed"]').click();await page.getByRole('button',{name:'Inline card',exact:true}).click();await expect(page.locator('.display-controls')).toContainText('No report means no registry stamp');await page.getByRole('button',{name:'Copy example snippet',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('data-mycoa-inline');await page.getByRole('button',{name:'Save prototype settings',exact:true}).click();await expect(page.locator('#toast')).toContainText('No platform save');
  result.checks.push('Dashboard missing-COA drilldown; all five Display sections; content preview, existing Button/Inline mode and example clipboard. Display stays certificate-focused; no product publication or payment action');
  await screen('invites');await page.locator('#delivery').selectOption('activation');await page.getByRole('button',{name:'Preview invitation wording',exact:true}).click();await expect(page.locator('.email h2')).toHaveText('Activate your Q-Registry workspace');await page.getByRole('button',{name:'Preview merchant entry',exact:true}).click();await expect(page.locator('#screen-picker')).toHaveValue('entry');await page.getByRole('button',{name:'Continue to Products',exact:true}).click();await expect(page.locator('#screen-picker')).toHaveValue('products');
  await page.getByRole('button',{name:'View actual capture reference',exact:true}).click();await page.locator('#dialog-body img').evaluate(img=>img.decode());expect(await page.locator('#dialog-body img').evaluate(img=>img.naturalWidth)).toBe(1600);await expect(page.locator('#dialog-body')).toContainText('flag OFF');await snap('labeled-actual-baseline-reference');await page.getByRole('button',{name:'Close',exact:true}).click();
  for(const id of ['map','plans','qconfig','release']){await section(id);await snap('review-'+id);}
  await section('plans');for(const id of ['bundled','addon','split']){await page.locator(`[data-plan="${id}"]`).click();await expect(page.locator('#packaging-panel')).not.toBeEmpty();if(id==='addon')await expect(page.locator('#packaging-panel')).toContainText('not simply renaming feature 7');await snap('packaging-'+id);}
  await section('qconfig');await expect(page.locator('#review-body')).toContainText('NOT A Q-CONFIG SCREEN');await expect(page.locator('#review-body')).toContainText('No new add-on needed');
  result.checks.push('Invitation wording → existing merchant-entry concept → Products; actual baseline image decoded and explicitly labeled; move map, three packaging alternatives, source-only Q-Config map and release boundary');
  await section('screens');await screen('display');await page.getByRole('button',{name:'Copy view link',exact:true}).click();expect(await page.evaluate(()=>navigator.clipboard.readText())).toContain('screen=display');await page.reload();await expect(page.locator('#screen-picker')).toHaveValue('display');
  for(const width of [1600,1280,390]){await page.setViewportSize({width,height:1100});for(const id of ['products','coas','labels','display','entry','subscription']){await screen(id);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' overflow '+width).toBe(true);}for(const id of ['map','plans','qconfig','release']){await section(id);expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),id+' overflow '+width).toBe(true);}await section('screens');await screen('products');await snap('responsive-'+width);}
  await page.goto(origin+'/registry-user-journeys/?design=navigation-v5#screen=sharing&scenario=required',{waitUntil:'networkidle'});await expect(page.locator('#screen-picker')).toHaveValue('display');await expect(page.locator('#scenario')).toHaveValue('required');
  await page.goto(origin+'/registry-user-journeys/future-concept.html',{waitUntil:'networkidle'});await expect(page.locator('body')).toContainText('Earlier expanded concept — outside the proposed first release.');await expect(page.locator('#screen-picker')).toBeVisible();
  await page.goto(origin+'/registry-user-journeys/reference.html',{waitUntil:'networkidle'});await expect(page.locator('#title')).toHaveText('One registry, with MyCOA inside it');
  result.checks.push('Deep link/reload and legacy sharing route compatibility; desktop/mobile layouts at1600/1280/390px; earlier expanded concept and unchanged reference audit remain available with phase labels');
  expect(result.pageErrors).toEqual([]);expect(result.failedResponses).toEqual([]);expect(result.productApiRequests).toEqual([]);result.pass=true;
 }catch(e){result.pass=false;result.error=e.stack;await page.screenshot({path:path.join(out,'failure.png'),fullPage:true}).catch(()=>{});process.exitCode=1;}
 finally{fs.writeFileSync(path.join(out,'result.json'),JSON.stringify(result,null,2));console.log(JSON.stringify(result));await browser.close();}
})();
