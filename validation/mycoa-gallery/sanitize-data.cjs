const fs = require('node:fs');
const vm = require('node:vm');

const [source, destination] = process.argv.slice(2);
if (!source || !destination) {
  console.error('Usage: node sanitize-data.cjs <local-data.js> <public-data.js>');
  process.exit(1);
}

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(source, 'utf8'), context, { timeout: 1000 });
const original = context.window.JOURNEYS;
if (!original || !Array.isArray(original.chapters)) {
  throw new Error('Expected a journey gallery data file');
}

const published = {
  title: original.title,
  assembled: original.assembled,
  total: original.total,
  chapters: original.chapters.map((chapter) => ({
    title: chapter.title,
    audience: chapter.audience,
    route: chapter.route,
    boundary: chapter.boundary,
    slides: chapter.slides.map(({ title, caption, src }) => ({ title, caption, src })),
  })),
  coverage: original.coverage,
};

const paywall = published.chapters.find((chapter) => chapter.title === 'The merchant paywall');
if (!paywall) throw new Error('Merchant paywall journey missing');
const sponsoredSlide = {
  title: 'Sponsored offer visible before activation',
  caption: 'The plan card shows the first three sponsored monthly cycles at $0 for the test merchant and the later $199/month merchant price before Activate MyCOA is clicked. User-provided screenshot; no activation or charge is proved by this image.',
  src: 'assets/141-sponsored-plan-card-before-activation-user-capture.png',
};
if (!paywall.slides.some((slide) => slide.src === sponsoredSlide.src)) {
  paywall.slides.unshift(sponsoredSlide);
}
paywall.boundary = 'First screen was supplied by Joseph on September 29; its capture environment was not independently verified for this gallery. Remaining screens are earlier local September 18 checkpoints with synthetic prices and blocked outbound payments. This is not a fresh staging validation.';
published.total = published.chapters.reduce((sum, chapter) => sum + chapter.slides.length, 0);
published.assembled = new Date().toISOString().slice(0, 10);
const coverageNote = 'The user-provided capture\'s environment was not independently verified for this gallery. ';
published.coverage = published.coverage.replace(
  'This collection assembles existing actual-application captures; it is not a new end-to-end run. ',
  'This collection assembles existing application captures plus one user-provided sponsored-plan screenshot; it is not a new product end-to-end run. ' + coverageNote,
);

fs.writeFileSync(destination, `window.JOURNEYS = ${JSON.stringify(published, null, 2)};\n`);
