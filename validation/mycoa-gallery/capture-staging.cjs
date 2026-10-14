// Read-only screenshots from normal Q-Config routes. Never Save, activate,
// consent, send, issue, cancel, settle, or submit a payment.
const fs = require('node:fs/promises');
const path = require('node:path');
const { chromium, expect } = require(process.env.PLAYWRIGHT_MODULE || '@playwright/test');
const output = path.join(__dirname, 'staging-20261014');
(async () => {
  const lines = (await fs.readFile(process.env.STAGING_LOGIN_FILE, 'utf8')).split(/\r?\n/);
  const start = lines.findIndex(x => x.startsWith('## Staging Q-Trust Login'));
  if (start < 0) throw Error('Existing authorized staging login section unavailable');
  const section = lines.slice(start, start + 12);
  const email = section[section.findIndex(x => x.startsWith('**Email')) + 1]?.trim();
  const password = section[section.findIndex(x => x.startsWith('**Password')) + 1]?.trim();
  if (!email || !password) throw Error('Existing login incomplete');
  await fs.mkdir(output, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH });
  const context = await browser.newContext({ viewport: { width: 1600, height: 1100 } });
  const page = await context.newPage();
  const result = { at: new Date().toISOString(), environment: 'Deployed config.qrediblestaging.com / normal routes / Playwright Chromium / no HTTP mocks / read-only review', screens: [], checks: [], pageErrors: [] };
  page.on('pageerror', e => result.pageErrors.push(e.message));
  const snap = async (name, title) => {
    await page.getByRole('listbox').waitFor({ state: 'hidden', timeout: 5000 });
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(output, name), fullPage: true });
    result.screens.push({ name, title, url: page.url() });
  };
  try {
    await page.goto('https://config.qrediblestaging.com/auth/sign-in');
    await page.locator('input[type=password]').waitFor({ timeout: 20000 });
    await page.locator('input[name=email],input[type=email]').first().fill(email);
    await page.locator('input[type=password]').fill(password);
    await page.getByRole('button', { name: 'Log In', exact: true }).click();
    await page.waitForURL(u => !u.pathname.includes('/auth/sign-in'), { timeout: 30000 });
    result.checks.push('Normal sign-in succeeded; credentials and browser state are not saved');
    await page.goto('https://config.qrediblestaging.com/sponsorships?processor=164920');
    await page.getByTestId('sponsorships-home').waitFor({ timeout: 30000 });
    await page.getByTestId('new-sponsorship-draft').waitFor({ timeout: 30000 });
    await snap('01-programs.png', 'Q-Config Sponsorships: programs and terms');
    await page.getByTestId('new-sponsorship-draft').click();
    await page.getByTestId('sponsorship-draft-form').waitFor();
    await expect.poll(async () => (await page.getByTestId('sponsorship-draft-form').boundingBox())?.height || 0).toBeGreaterThan(300);
    await page.getByLabel('Agreement name', { exact: true }).scrollIntoViewIfNeeded();
    await page.getByTestId('save-sponsorship-draft').scrollIntoViewIfNeeded();
    await snap('02-program-form.png', 'Configurable sponsorship terms, reviewed without saving');
    await page.getByTestId('sponsorship-draft-form').screenshot({ path: path.join(output, '02-program-form.png') });
    await page.getByTestId('new-sponsorship-draft').click();
    for (const [label, name] of [['Merchants', '03-merchants.png'], ['Promo codes', '04-promo-codes.png'], ['Invoices & payments', '05-invoices.png']]) {
      await page.getByRole('tab', { name: label, exact: true }).click();
      await snap(name, 'Q-Config ' + label);
    }
    result.checks.push('Program, merchant, promo and invoice tabs reviewed; no saves or financial submissions');
    await page.goto('https://config.qrediblestaging.com/invite-config');
    await page.getByRole('button', { name: 'Global paywall layout', exact: true }).click({ timeout: 25000 });
    await page.getByText('Layout selection', { exact: true }).waitFor({ timeout: 12000 });
    await snap('06-paywall-layout.png', 'Global paywall configuration');
    // A local form selection exposes controls; it is never persisted.
    if (!await page.getByLabel('Purchase button label', { exact: true }).isVisible()) {
      await page.getByRole('combobox', { name: 'Layout selection', exact: true }).click();
      await page.getByRole('option', { name: 'Custom full layout (HTML)', exact: true }).click();
    }
    await page.getByLabel('Purchase button label', { exact: true }).waitFor();
    await page.locator('#activation-banner-heading').click();
    await page.getByLabel('Banner message', { exact: true }).scrollIntoViewIfNeeded();
    await snap('11-activation-invite-banner.png', 'Activation-invite banner headline and message; separate from sponsorship status');
    await page.locator('#activation-banner-heading').click();
    await page.getByRole('button', { name: 'HTML source', exact: true }).click();
    await page.getByLabel('Paywall HTML source', { exact: true }).waitFor();
    await snap('07-paywall-copy-controls.png', 'Paywall wording and presentation controls; unsaved review');
    await page.getByRole('tab', { name: 'Plan cards', exact: true }).click();
    await snap('08-plan-card-controls.png', 'Plan-card wording and annual savings controls');
    await page.getByText('Card design', { exact: true }).locator('..').getByRole('combobox').click();
    await page.getByRole('option', { name: 'Custom card HTML', exact: true }).click();
    await page.getByRole('button', { name: 'Card HTML source', exact: true }).click();
    await page.getByLabel('Card HTML source', { exact: true }).scrollIntoViewIfNeeded();
    await snap('09-card-html.png', 'Editable card copy and protected billing tokens; unsaved');
    await page.getByText('Annual savings display', { exact: true }).locator('..').getByRole('combobox').click();
    await page.getByRole('option', { name: 'Amount and percentage', exact: true }).click();
    await page.getByLabel('Annual savings heading (optional)', { exact: true }).scrollIntoViewIfNeeded();
    await snap('10-annual-savings-copy.png', 'Editable annual savings heading and calculated values; unsaved');
    result.checks.push('Global layout and card controls reviewed; unsaved form only');
    result.passed = true;
  } catch (e) {
    result.passed = false;
    result.error = e.message.split('\n').slice(0, 3).join(' ');
    result.url = page.url();
    if (result.checks.length) {
      await page.screenshot({ path: path.join(output, 'review-limit.png'), fullPage: true });
      result.visibleReview = (await page.locator('body').innerText()).slice(-6500);
    }
    process.exitCode = 1;
  } finally {
    await fs.writeFile(path.join(output, 'result.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result));
    await browser.close();
  }
})().catch(e => { console.error(e.message); process.exitCode = 1; });
