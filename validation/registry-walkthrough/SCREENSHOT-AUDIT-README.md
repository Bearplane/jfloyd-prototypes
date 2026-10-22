# QP-5004 — MyCOA to Q-Registry walkthrough

Served route: `qredible/registry-user-journeys/` (existing Netlify publish root: `qredible`). Added to the existing Qredible hub. No hosting settings or existing galleries change.

Live walkthrough: https://deploy-preview-100--jfloyd-qredible.netlify.app/registry-user-journeys/

Reviewable PR: https://github.com/Bearplane/jfloyd-prototypes/pull/100

The walkthrough contains **26 journey chapters, 29 original application screenshots and a 26-file source coverage map**. The sequence covers processor invitations, identity/access, subscriptions and configured plans, four merchant welcome/catalog scenarios, MyCOA, public sharing, a private product-record proposal, hidden/source-only labels and the wider phased proposal. Presentation mode, keyboard navigation, chapter/role filters, an all-image overview, full-size image reading, original-image links, clipboard deep links, evidence notes and source-to-chapter jumps are included.

## Evidence boundaries

Images are unchanged October 22 full local Next/Nest application captures with synthetic review data, normal routes and normal NextAuth form sign-in. They are not recreated screens. Before means presentation flag OFF; after means ON. Local Redis/MailHog/empty Minio substituted hosted infrastructure; outbound traffic was blocked, workers off and analytics hydration excluded. The independent communications service was absent. No provider, email, purchase, policy activation, publication or shipping acceptance is established.

Source-only chapters explicitly cover changed branches without captures: single invite and activation outcomes, alternate paywalls, Dashboard description, ISO status columns/filters and hidden applicability badges. Q-Config is unchanged and unstarted. Future product records/stamps, commercial packaging, migration and shipping are proposals, not completed behavior. Unknown applicability still inherits a legacy No COA required fallback. Some raw plan/email text remains. The actual private product-record dialog does not create a public record or claim a PASS.

Raw pre-minimization processor screenshots, warming Settings capture, failed-run images, private runtime, auth states/logs, SQL dumps and production exports are excluded. Additional merchant welcome screenshots and the normalized initial invitation composer extend the earlier 22-image review collection to all29 approved captures. Public files contain no workstation source paths or login credentials.

Platform source association: QP-5004 / https://github.com/qredible/RTQ-Admin-UI/pull/4206; UI baseline `3519ccfb03b1166e4bafb5c2c3edfba3a09ad78f`, preview `073da38e03c12b9f3fdc7251646772ba909fed9a`. `coverage-map.json` maps every one of its26 changed source files; a captured parent does not certify hidden branches. The broader October22 product audit supplied the future proposal content.

## Reproduce assembly

Use the existing approved capture directory, containing only the intended dated material. The assembler expects exactly29 allowed PNGs and refuses a changed count. It copies original bytes and emits the public SHA256/provenance manifest and coverage data.

```powershell
$env:REGISTRY_CAPTURE_ROOT='<approved platform-preview folder>'
node validation/registry-walkthrough/assemble.cjs
```

## Reproduce website end-to-end validation

Use installed Playwright and Chromium. No product authentication, mutation or simulated product API response is involved in this website test.

```powershell
python -m http.server 4339 --bind 127.0.0.1 --directory qredible
$env:PLAYWRIGHT_MODULE='<installed @playwright/test module path>'
$env:CHROMIUM_PATH='<installed Chrome executable>'
$env:WALKTHROUGH_ORIGIN='http://127.0.0.1:4339'
node validation/registry-walkthrough/validate.cjs
```

Local Chromium156 verification passed: all26 chapters, all29 images decoded and hash-verified against the served manifest, all26 coverage entries; keyboard/back/next, full-size mode, clipboard/deep-link reload, overview selection, presentation/Escape, source-map jumps, evidence dialog, role filters and1600/1280/390px layouts. No page errors, same-origin failed responses or mobile horizontal overflow. `local/result.json` and actual website screenshots record that run.

Hosted Netlify Chromium verification also passed, recorded under `hosted/`: all26 chapters, all29 original images/hash checks,26 coverage entries, every listed control and1600/1280/390px layouts; zero page errors or failed same-origin responses. The tested website source is `db6f5d19e9fa1c53f1dfe132a495f6deb96c475a`; the subsequent proof commit adds only evidence/documentation and does not change the site. Netlify's Qredible deploy-preview status reported SUCCESS before the hosted run.

```powershell
$env:WALKTHROUGH_ORIGIN='<verified deploy-preview origin>'
$env:VALIDATION_OUTPUT='validation/registry-walkthrough/hosted'
node validation/registry-walkthrough/validate.cjs
```

These are real normal-route walkthrough website tests/screenshots. They do not repeat or extend product/provider acceptance. Netlify publishes the walkthrough only, not the underlying Registry application branch.
