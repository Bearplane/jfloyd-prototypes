// Assemble unchanged, dated application captures. This never runs product actions.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '../..');
const target = path.join(root, 'qredible/mycoa-sponsorship-journeys');
const api = process.env.QP4802_EVIDENCE_ROOT;
if (!api) throw Error('Set QP4802_EVIDENCE_ROOT to the RTQ-Admin-API evidence checkout');
const D = JSON.parse(fs.readFileSync(path.join(__dirname, 'archived-captures.json')));
const C = D.chapters;
const manifest = [];
const local = { label: 'Full local application', date: 'September 26–28, 2026', note: 'Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof.' };
const early = { label: 'Earlier local application', date: 'September 18, 2026', note: 'Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint.' };
for (let i = 0; i < C.length; i++) {
  C[i].id = ['paywall','layout-copy','card-copy','savings-copy','ordinary-checkout','program-lifecycle','assignment','sponsor-codes','fully-funded','shared-cost','already-paying','other-allocations','annual-handoff','funding-amendments','invoice','settlement','processor-card','payment-correction','supplemental-invoice','cancel-funded','admin-cancel','cancel-scheduled','reporting','notices','pricing-reference','qconfig-programs'][i];
  for (const s of C[i].slides) s.evidence = i < 5 ? early : local;
}
C[0].slides[0].evidence = { label: 'User-supplied capture', date: 'September 29, 2026', note: 'Supplied by Joseph. Its capture environment was not independently verified. No activation or charge is proved.' };
C[24].slides.forEach(s => s.evidence = { ...early, date: 'Earlier QP-4705 checkpoint', note: C[24].boundary });
C[25].title = 'Q-Config sponsorship programs';
C[25].slides.forEach(s => s.evidence = { label: 'Full local Q-Config', date: 'September 29, 2026', note: 'Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email.' });
function copy(source, name, relativeSource) {
  const dest = path.join(target, 'assets', name);
  fs.copyFileSync(source, dest);
  const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
  if (hash(source) !== hash(dest)) throw Error('Capture copy mismatch');
  manifest.push({ asset: 'assets/' + name, source: relativeSource, sha256: hash(dest), unchanged: true });
  return 'assets/' + name;
}
function staged(file, title, caption, note = '') {
  const relative = 'docs/validation/qp4802/post2803-20260930/' + file;
  const src = copy(path.join(api, relative), 'staging-' + path.basename(file), relative);
  return { title, caption, src, evidence: { label: 'Recorded deployed staging', date: 'September 30 – October 1, 2026', note: 'Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. ' + note } };
}
function fresh(file, title, caption) {
  return { title, caption, src: copy(path.join(__dirname, 'staging-20261014', file), '20261014-' + file, 'validation/mycoa-gallery/staging-20261014/' + file), evidence: { label: 'Fresh deployed Q-Config', date: 'October 14, 2026', note: 'Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved.' } };
}
const prepend = (i, slides) => C[i].slides.unshift(...slides);
prepend(0, [
  staged('approved-split-01-initial-offer.png','Sponsored offer before activation','The merchant sees the configured MyCOA presentation with a sponsorship callout before entering consent. This recorded example is 50/50, not fully funded.'),
  staged('layout-01-global-monthly-required.png','Neutral monthly paywall','The global offer is $249/month in this separate fixture. A required paywall has no dismiss control.'),
  staged('layout-02-global-annual.png','Neutral annual alternative','The global offer switches to $2,690/year. This is ordinary plan pricing; sponsored cycles use monthly billing.'),
  staged('layout-05-global-mobile.png','Paywall on mobile','The same configured offer stacks at a 390px viewport.')
]);
prepend(1, [
  fresh('06-paywall-layout.png','Open Global paywall layout','Invite Configuration opens the real global layout editor. Processor-specific layouts are opened from the sender row’s Paywall layout action.'),
  fresh('07-paywall-copy-controls.png','Editable copy and live controls','Purchase button label, safe layout HTML, color, width and billing-control placement are configurable. This source review was not saved.'),
  fresh('11-activation-invite-banner.png','Activation-invite headline and message','The separate Activation banner has headline/message and styling controls. It is for activation-invite entry, not a rule that displays whenever sponsorship is active.')
]);
prepend(2, [
  fresh('08-plan-card-controls.png','Choose the card to configure','Choose a default or an individual plan override. Card design changes presentation; it does not change eligible plans.'),
  fresh('09-card-html.png','Card text versus protected billing','Custom HTML can replace titles, benefits, reassurance copy and button labels. Native plan_price and plan_purchase slots retain the real price and action; plan_billing_toggle is required with in-card billing.')
]);
prepend(3, [fresh('10-annual-savings-copy.png','Annual-savings heading and controls','The savings heading, display mode, badge and monthly equivalent can be configured. The savings amount/percentage is calculated from real eligible prices.')]);
prepend(25, [
  fresh('01-programs.png','Sponsorships → Programs & terms','Choose the sponsoring processor. Program cards show funding cycles, merchant percentage, sponsor commercial rate, collection mode and status.'),
  fresh('02-program-form.png','Configurable program terms','A direct screenshot of the real Q-Config form region: agreement name, eligible MyCOA plans, funding term, cycles, merchant share, sponsor rate and collection mode. Nothing was saved.'),
  fresh('03-merchants.png','Merchants tab','This is program participation and offer administration, rather than merchant-facing checkout.'),
  fresh('04-promo-codes.png','Promo codes tab','Sponsor codes belong to the selected program and have their own lifecycle.'),
  fresh('05-invoices.png','Invoices & payments tab','Processor invoice contact, monthly statements and issued finance live here; invoices aggregate processor obligations across programs.'),
  staged('05-qconfig-split-exact-quote.png','Exact split-price preview','On $199 face price, the merchant pays $99.50; the sponsor’s gross share is $99.50. A 25% sponsor commercial discount makes the sponsor invoice $74.63, not a merchant discount.')
]);
prepend(6, [
  staged('../post2800-20260930/07-fresh-split-offer-selected.png','Select a merchant for an offer','The admin selects an eligible test merchant under the sponsoring program.'),
  staged('../post2800-20260930/08-fresh-split-offer-review.png','Review the offer and reason','Review program, merchant and audit reason before confirming. An offer does not itself enroll or charge the merchant.'),
  staged('../post2800-20260930/09-fresh-split-pending-roster.png','Pending offer in the roster','The offer is PENDING until merchant acceptance. This is a different state from active merchant coverage.')
]);
prepend(8, [
  staged('../release-readiness-20260930/promo-cap-01-no-assigned-sponsorship.png','Merchant without a preassigned offer','This merchant enters through a sponsorship-only promo rather than a prior admin assignment.'),
  staged('../release-readiness-20260930/promo-cap-02-code-validation.png','Validate a sponsorship code','The code resolves a sponsor offer; it is not an ordinary percentage-off checkout promo.'),
  staged('../release-readiness-20260930/promo-cap-03-code-only-activation-review.png','Review fully funded terms','The review discloses the sponsoring processor, three funded monthly cycles, card requirement and later $199 monthly billing.'),
  staged('../release-readiness-20260930/promo-cap-04-approved-code-billing-consent.png','Explicit future billing consent','The recorded test checked the exact billing authorization before activation; this walkthrough submits no consent.'),
  staged('../release-readiness-20260930/promo-cap-05-code-activated-subscription.png','Funded coverage is active','The recorded staging run activated at $0 merchant contribution and established a future $199 schedule. Future execution was not elapsed or charged.'),
  staged('promo-cap-06-second-merchant-rejected.png','A consumed one-use code is rejected','A second merchant cannot redeem the used max-one code. This recorded sequential check proves no second enrollment; concurrent redemption is a separate test.')
]);
prepend(9, [
  staged('approved-split-02-exact-consent-before.png','Shared-cost consent, unchecked','The merchant sees $99.50 now, $99.50 for the remaining sponsored cycles, and $199/month after three cycles. The authorization starts unchecked.'),
  staged('approved-split-03-approved-consent.png','Explicit contribution authorization','The recorded staging test authorized the first merchant contribution and later monthly billing using a masked saved card.'),
  staged('approved-split-04-pending-0.png','Awaiting payment confirmation','Payment submission and active access are distinct. The recorded run used one $99.50 test sale, then the same activation completed after the genuine callback.'),
  staged('fresh-active-Split80-desktop.png','Active shared coverage in Settings','This test fixture’s historical name contains Split80; its actual agreement here is 50/50. Settings reflects the accepted funding and later self-pay terms.'),
  staged('fresh-active-Split80-mobile.png','Active coverage on mobile','The same recorded shared-cost subscription at a mobile viewport.')
]);
prepend(10, [
  staged('paid-review-04-merchant-offer.png','Offer on an existing paid subscription','An existing subscriber reviews sponsorship without buying the current plan again.'),
  staged('paid-review-05-exact-unchecked-consent.png','No immediate charge; next unpaid renewal','The review states the scheduled funding start and later merchant-paid amount/date. In the recorded run the gateway deferral succeeded but a date-status defect remained; the following older local screens illustrate the scheduled target state, not a fresh deployed fix pass.','Historical review only. The paid-renewal date defect reported on that capture date is not a claim about today’s deployment.')
]);
prepend(12, [
  staged('active-PromoB-after-mail-01-status.png','Active funded status and future renewal','The merchant sees current funded access and the later monthly renewal. This separate fixture uses $249 monthly pricing.'),
  staged('active-PromoB-after-mail-02-annual-comparison.png','Compare the post-sponsorship annual option','The eligible offer compares $2,690 annually with $2,988 for twelve $249 payments: $298 savings, about 9.97%.'),
  staged('active-PromoB-after-mail-03-annual-consent-unchecked.png','Review annual consent before commitment','The annual price and first charge date are disclosed. The recorded staging run left consent unchecked and did not confirm annual billing.'),
  staged('active-PromoB-after-mail-04-mobile-annual-review.png','Annual review on mobile','The same nonbinding review at 390px.'),
  staged('active-PromoB-after-mail-05-monthly-kept.png','Keep the existing monthly renewal','The recorded review returned without changing the future monthly contract. Subsequent confirmed/recovery examples below are explicitly full-local simulations.')
]);
const invoiceTitles = [
 ['fresh-invoice-01-program.png','Open processor invoices','Select the processor. Invoices are processor-wide, combining due funded merchant cycles across its programs.'],
 ['fresh-invoice-02-due-cycle-preview.png','Preview due funded cycles','Review itemized merchant coverage and the sponsor amount before creating a statement. This split example owes $74.63.'],
 ['fresh-invoice-03-mobile-preview.png','Due-cycle preview on mobile','Review the same due cycle at mobile width.'],
 ['fresh-invoice-04-draft-confirmation.png','Confirm statement drafting','Drafting assembles obligations; it does not email, post revenue, collect payment or charge a card.'],
 ['fresh-invoice-05-draft-only.png','Statement DRAFT','The DRAFT statement has one funded cycle for $74.63. The application explicitly says no invoice sent and no revenue or cash posted.'],
 ['fresh-invoice-06-invoice-destination-preview.png','Review invoice destination and terms','Review exact recipient, due date, amount and document before issue.'],
 ['approved-invoice-01-exact-destination.png','Exact invoice recipient confirmation','The recorded staging invoice was directed to Joseph’s designated test mailbox, not a live processor billing contact.'],
 ['approved-invoice-02-unconfirmed-disabled.png','Issue stays disabled until confirmed','An unchecked confirmation does not issue or send the invoice.'],
 ['approved-invoice-03-exact-confirmed.png','Final issue confirmation','The original authorized test confirmed the exact invoice. This walkthrough only displays its recorded capture.'],
 ['fresh-finance-01-issued-no-cash.png','After issue: receivable, zero cash','Invoice SP-2026-000004 posts $74.63 revenue and receivable; it is not a paid receipt. The $261.38 open total includes $186.75 from a prior unpaid invoice.'],
 ['fresh-finance-02-issued-mobile.png','Issued invoice on mobile','The issued state is visible in the processor finance workspace.'],
 ['fresh-finance-03-qaudit-october.png','After issue: Q-Audit reporting','Q-Audit reflects the issued obligation separately from collected cash.'],
 ['received-invoice-SP000004.png','Actual received invoice PDF','Qredible’s Processor sponsorship invoice names the bill-to processor, merchant funded cycle, issue/due dates and $74.63 total. The received PDF matched the stored hash. It is not a merchant charge or payment receipt.']
];
prepend(14, invoiceTitles.map(([f,t,c]) => staged(f,t,c,'Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here.')));
prepend(16, [
  staged('../post2800-20260930/13-qconfig-card-invoice-approved-not-settled.jpg','Processor card payment accepted, not settled','The recorded sandbox card collection was accepted. Cash remained $0 while settlement was pending; acceptance is not collection proof.'),
  staged('../post2800-20260930/14-qconfig-card-check-no-new-charge.jpg','Check the existing gateway outcome','The check reads the original payment outcome rather than starting another charge. Later settled examples below use local simulated provider responses.')
]);
prepend(22, [
  staged('full-report-01-partner-overview.png','Processor Partner Program overview','The processor sees sponsorship offsets and receivables separately from merchant payments and referral amounts.'),
  staged('full-report-02-qaudit-finances.png','Q-Audit issued revenue versus cash','Historical $149.25 cash in this fixture was a SIMULATED admin settlement attestation, not bank/provider proof.'),
  staged('full-report-03-qaudit-processor-invoices.png','Inspect processor invoices','The reporting view preserves invoice detail behind the totals.'),
  staged('full-report-04-october-utc-carry-forward.png','Unpaid balances carry into the next period','No new October invoice is required for prior unpaid receivables to remain open. Period revenue and cash remain separate.'),
  staged('partner-test5-02-detail.png','Merchant row after sponsored enrollment','The funded badge, merchant amount, referral amount, sponsor offset and open receivable explain different concepts. The partner offset is a displayed value, not automatic payout deduction.')
]);
prepend(23, [
  staged('../release-readiness-20260930/received-enrollment-email.png','Received enrollment notice','Joseph supplied the actual received staging enrollment email. This is external receipt evidence from that dated test, distinct from MailHog examples.'),
  staged('../release-readiness-20260930/received-invoice-email.png','Received processor invoice email','The sponsor invoice email is addressed to the designated test recipient. The financial obligation belongs to the processor, not the merchant.')
]);
const notes = {
 'paywall': ['What the merchant sees first', ['Activate MyCOA','Processor sponsorship','Monthly / Yearly'], 'Q-Config can change promotional layout/card copy and button labels. The sponsorship callout and live amount come from the eligible offer; typing marketing copy does not establish funding.', 'Review sponsor identity, whether coverage is fully funded or shared, the amount during coverage, and the later renewal. Neutral global and processor-branded layouts are separate examples.'],
 'layout-copy': ['Author the surrounding message', ['Global paywall layout','Purchase button label','Activation banner'], 'Editable: safe HTML, headings, benefits, images, button labels and visual settings. Processor layouts can override global presentation. Activation-invite banner text is separate from active-sponsorship state.', 'Preserve the live plans/promo/billing controls. A design preview does not grant access or change prices.'],
 'card-copy': ['Write a plan card', ['Card to configure','Card design','Card purchase button label'], 'Custom HTML can replace displayed title/features and benefit copy. Individual plan override → layout default card → original plan configuration. This does not edit the shared plan.', 'Retain native plan_price / plan_purchase and, when configured, plan_billing_toggle. Required controls keep real pricing, consent and checkout behavior.'],
 'savings-copy': ['Explain annual savings', ['Annual savings display','Annual savings heading','Yearly'], 'Heading and display options are editable. Savings and monthly-equivalent values are calculated from eligible monthly/annual prices.', 'Annual comparison is for eligible plans; the first sponsored cycles remain monthly. Avoid describing an annual commitment as already accepted.'],
 'qconfig-programs': ['Q-Config configuration of sponsorship programs', ['Programs & terms','Merchants','Promo codes','Invoices & payments'], 'Configure processor, agreement name, eligible plans, funding term/cycles, merchant share, sponsor commercial rate, and collection mode. The program name is administrative; it is not a free-form merchant consent template.', 'Program setup, merchant acceptance and processor invoice issue are separate stages. Merchant share is a percentage of face price; sponsor commercial discount applies only to the remaining sponsor share.'],
 'program-lifecycle': ['Make a program available', ['DRAFT','Activate agreement','ACTIVE','Pause agreement'], 'Admins draft/edit terms and activate/pause eligibility with an audit reason. An active agreement makes an offer eligible; it does not itself enroll merchants.', 'Read ACTIVE with its context: agreement eligibility differs from merchant coverage. Older company-modal screenshots precede the central Sponsorships home.'],
 'assignment': ['Offer sponsorship to a merchant', ['Review selected merchants','Prepare offer','PENDING','Revoke'], 'Admins select eligible merchants, review the program and record a reason. Pre-signup assignment is supported in the local examples.', 'A pending offer is not active access. The merchant still reviews the terms, provides a payment method and accepts billing consent.'],
 'sponsor-codes': ['Make a sponsor code available', ['Reserve code','Activate promo','Pause','Released'], 'Program-specific promo bindings and their lifecycle are configured by admins. A sponsor-only code resolves an agreement rather than acting as an ordinary checkout discount.', 'An active code does not prove redemption. Check eligibility, expiry and usage limits; a consumed code can reject the next merchant.'],
 'fully-funded': ['Three fully funded monthly cycles', ['Activate MyCOA','Card ending','First merchant-paid charge'], 'Q-Config terms determine who funds coverage and its duration. The application generates exact current and future billing disclosures; there is no generic editor here for the consent sentence.', 'The merchant can owe $0 during sponsored cycles and still provide a card for later billing. “Sponsored” describes the payer, rather than an ordinary free trial.'],
 'shared-cost': ['The merchant contributes during coverage', ['You pay … now','Remaining sponsored monthly cycle','Awaiting confirmation'], 'Merchant share is configurable; sponsor commercial pricing is independent. The consent modal derives its amounts from the accepted quote.', 'For this 50/50 example the first merchant contribution is due at activation. A $74.63 sponsor invoice and a $99.50 merchant payment are different amounts.'],
 'already-paying': ['Start at the next unpaid renewal', ['Review sponsorship','Scheduled','No immediate charge'], 'The offer is configurable, but coverage cannot retroactively replace an already paid cycle. Exact dates and future billing are generated and require consent.', 'These are dated examples. A September 30 date-status defect was recorded; local scheduled screenshots illustrate the target flow and do not certify today’s deployed outcome.'],
 'other-allocations': ['Other configurable funding splits', ['80% sponsor / 20% merchant','75% sponsor / 25% merchant'], 'For a $199 face price, 20% merchant share is $39.80 and 25% is $49.75. These are local fixtures, not additional provider activation proof.', 'Different fixture runs illustrate different allocations. They do not change the preceding merchant’s accepted terms.'],
 'annual-handoff': ['Choose billing after sponsorship', ['Compare annual','Keep current renewal','Confirm annual'], 'Eligible annual pricing can be reviewed for the post-sponsored period. Q-Config savings copy is editable; exact annual amount and first-charge date remain generated.', 'Recorded staging review stops before annual commitment. Confirmed annual/return-to-monthly/recovery screens are local runs with fake NMI and MailHog. No elapsed future charge is demonstrated.'],
 'funding-amendments': ['Review a future funding change', ['Proposed','Withdraw','Consent','Confirmed'], 'Prospective allocation changes have an audited proposal and merchant consent when required. They do not silently rewrite the current paid/funded cycle.', 'These full-local examples show proposed, withdrawn, pending and confirmed states. A pending provider outcome is not a confirmed change.'],
 'invoice': ['Invoice the sponsoring processor', ['Preview due cycles','DRAFT','Review invoice destination and terms','ISSUED'], 'Configure invoice email and payment terms; preview due cycles, draft, review destination/document, then separately confirm issue. No invoice-template wording editor is shown in Q-Config.', 'Issue posts revenue/receivable and sends the processor invoice. Cash is recorded separately. The merchant sees their coverage/contribution, not the negotiated processor receivable.'],
 'settlement': ['Record an externally verified payment', ['Record settlement','Payment reference','Settled'], 'Admins attest an externally verified payment with method, reference, time, amount and audit reason. This is not automatic bank verification.', 'This chapter is local simulated/admin-attested settlement. Invoice issue alone never means cash collected.'],
 'processor-card': ['Collect an issued invoice by card', ['Processor-owned card','Accepted','Check gateway outcome','Settled'], 'An admin-confirmed processor card collection applies to an issued invoice using the processor’s payment method. Unattended automatic processor charging is not demonstrated.', 'The recorded staging payment was accepted and pending settlement. Settled local examples simulate the provider; no bank settlement claim.'],
 'payment-correction': ['Preserve payment correction history', ['Partial reversal','Recovery','Full reversal','Audit history'], 'Admins record audited reversals/recoveries against payment history. This is separate from an automatic refund or a new charge.', 'Original invoice revenue/history remains visible; corrected cash and open receivable are separate values. Full-local evidence only.'],
 'supplemental-invoice': ['Invoice later due obligations', ['Supplemental statement','Issue confirmation'], 'A later statement can invoice eligible obligations after an earlier statement was issued. It does not silently append new items to the already issued document.', 'These are full-local examples. Review exact statement, amount and destination before issue.'],
 'cancel-funded': ['Cancel while coverage is active', ['Cancel sponsorship','Current funded cycle','Self-pay schedule'], 'Cancellation confirmation and consequences are generated by the application. A marketing copy change cannot cancel the provider schedule.', 'Current promised coverage and already issued processor obligations are preserved according to the accepted cancellation rules. These cancellation screenshots are local provider simulations.'],
 'admin-cancel': ['Admin reviews cancellation', ['Active grant','Cancel','Audit reason','Cancelled'], 'Admins confirm a scoped cancellation and record an audit reason. The cancelled record remains available for review.', 'Agreement pause and merchant cancellation are different actions. Local examples do not certify a newly executed provider cancellation.'],
 'cancel-scheduled': ['Withdraw before funding starts', ['Scheduled sponsorship','Original subscription'], 'The generated review explains how the original subscription will be preserved when a future scheduled offer is withdrawn.', 'These full-local examples preserve the existing paid subscription. They do not demonstrate a new deployed schedule reversal.'],
 'reporting': ['See the result across applications', ['Qredible revenue issued','Cash collected','Open receivable','Partner-view commission offset'], 'Period/processor selection changes the report. These balances are calculated from posted records; they are not editable terminology fields.', 'Revenue at invoice issue, cash after verified payment, and partner-view offset describe separate events. Test balances are not production financial results.'],
 'notices': ['What lands in the inbox', ['Enrollment notice','Processor sponsorship invoice','Handoff reminder'], 'Recipients, exact terms and delivery status are recorded. No general sponsorship email-body editor is demonstrated by these Q-Config screens.', 'Received staging messages and local MailHog screenshots are labeled separately. A waiting reminder is not a sent notice or an executed renewal.'],
 'ordinary-checkout': ['Ordinary promo and checkout reference', ['Promo code','Start Subscription','Required fields'], 'The paywall design is configurable. Ordinary promo behavior and sponsorship redemption are different journeys.', 'Earlier local reference screens illustrate entry/dismissal and required fields. No new purchase is performed for this walkthrough.'],
 'pricing-reference': ['Related pricing configuration', ['Pricing rules','Flat price','Deactivate'], 'Pricing rules change eligible quote inputs. Paywall text editing alone does not change a price, and a sponsorship program controls payer allocation separately.', 'Earlier QP-4705 local reference, not proof of an existing-subscriber price-change notice/schedule flow.']
};
for (const c of C) {
  const [summary, terms, configurable, review] = notes[c.id];
  Object.assign(c, { summary, terms, configurable, review });
}
D.chapters = [0,8,9,10,12,19,21,11,1,2,3,25,5,6,7,13,14,15,16,17,18,22,23,4,20,24].map(i => C[i]);
D.title = 'Sponsorship — the merchant journey & wording review';
D.assembled = '2026-10-14';
D.total = D.chapters.reduce((n,c) => n + c.slides.length, 0);
D.coverage = 'Fresh October 14 Q-Config configuration/copy review; dated September 30–October 1 deployed staging merchant, invoice and reporting captures; earlier full-local application captures for additional lifecycle stages. Every slide states its environment. No financial action was repeated to assemble this walkthrough. Current merchant billing, bank settlement, future elapsed renewals and production behavior were not revalidated.';
D.sources = [
 ['QP-4802','https://qredible.atlassian.net/browse/QP-4802'],
 ['RTQ API · 2754','https://github.com/qredible/RTQ-Admin-API/pull/2754'],
 ['Merchant UI · 3962','https://github.com/qredible/RTQ-Admin-UI/pull/3962'],
 ['Q-Config API · 120','https://github.com/qredible/qredible_services_api/pull/120'],
 ['Q-Config UI · 112','https://github.com/qredible/qredible_services_ui/pull/112'],
 ['Middleware · 881','https://github.com/qredible/Middleware/pull/881'],
 ['Dated staging evidence · 2804','https://github.com/qredible/RTQ-Admin-API/pull/2804']
];
fs.writeFileSync(path.join(target,'data.js'),'window.JOURNEYS = '+JSON.stringify(D,null,2)+';\n');
fs.writeFileSync(path.join(__dirname,'capture-manifest.json'),JSON.stringify({ assembled: D.assembled, note: 'Source-relative paths and SHA-256 for newly copied unchanged captures; the 141 older assets are retained from merged gallery PR97.', captures: manifest },null,2));
console.log(JSON.stringify({ journeys:D.chapters.length, screenshots:D.total, newUnchangedCaptures:manifest.length }));
