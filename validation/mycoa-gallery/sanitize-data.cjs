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

fs.writeFileSync(destination, `window.JOURNEYS = ${JSON.stringify(published, null, 2)};\n`);
