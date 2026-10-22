# QP-5004 — MyCOA → Q-Registry, a familiar first release

Review URL: https://deploy-preview-100--jfloyd-qredible.netlify.app/registry-user-journeys/?design=minimal-v3#section=screens&screen=products&scenario=mixed

Jira: https://qredible.atlassian.net/browse/QP-5004
PR: https://github.com/Bearplane/jfloyd-prototypes/pull/100

## Current proposal

The product currently called MyCOA becomes Q-Registry. Keep the existing navigation structure and reuse its working surfaces. The previous expanded design introduced too many new destinations and obscured what was being reused. This revision makes the migration explicit:

- **Eight screen families:** Products/navigation, Dashboard, gated Overview, COAs, Display, processor invitation/status, merchant activation/entry and Settings/Subscription.
- **Each screen:** labeled current-source reconstruction or proposed first-release design, plus a permanent Today → Release 1 explanation and Reuse / Rename / Adjust / New work / Later tags.
- **Direct access:** COAs keeps its familiar tab, with MyCOA as its feature heading. No extra Evidence hub. Display keeps Branding, Content, Template, Embed & Links, Advanced and existing certificate outputs.
- **Five catalogs:** mixed, no-COA, required-COA, undetermined and empty. Product-level relevance changes prompts/defaults, not the merchant's commercial type. Unknown applicability stays undetermined in the proposed design; the real legacy fallback still needs implementation.
- **What moves where:** 13 explicit current-to-proposed mappings.
- **Plans & MyCOA:** three compared options. Recommend preserving the existing bundle/access for the smallest release. An optional MyCOA add-on or two plan variants needs a real capability split first; current feature 7 is the wider workspace identity.
- **Q-Config:** a source-verified capability map, not an invented admin screen or a deployed workflow claim.
- **Release scope:** exact initial changes, continuity checks, open decisions and deferred public product/stamp/shipping features.

Sample interactions include product creation/search/filter, optional COA filename submission without changing plans, pending-review report state, Display controls/preview/example snippet, invitation-wording preview → existing entry concept → Products, current/proposed selection, Overview gate selection, packaging comparison and deep links. State is browser-memory only and resets on reload. Switching catalog resets sample additions/reports. Copy links retain the review section/screen/catalog/view/Overview/packaging selection, not unsaved sample records or Display edits.

## Evidence and limits

**This is a static proposed-design website. It is not deployed Qredible product functionality.** Chromium screenshots validate the actual running website through its normal route. Source sketches are explicitly labeled reconstructions, not current production screenshots. Supporting actual-app captures are unchanged historical October 22 full-local Next/Nest screenshots with synthetic records; individual captions distinguish baseline flag OFF from the earlier flag-ON proposal.

No Qredible application or Q-Config source was changed. No product API, authentication, email, billing, provider, policy, public publication or shipping service is connected. No service responses are mocked to impersonate those services; all example records and interactions live in the prototype. File content is never uploaded or parsed; only a chosen filename is shown. Real application workflows, enforcement, provider continuity, email delivery, entitlement migration and Q-Config operation remain unverified by these tests. The earlier RTQ-Admin-UI PR4206 is not implementation of this revised proposal.

Source checks for this revision: Merchant UI `3519ccfb03b1166e4bafb5c2c3edfba3a09ad78f`, Q-Config UI `021615ba66815b8856c24cd03c6a1c3a8213b47c`, Q-Config API `5aa4090f906a21ba82bff8059066133aae3e54cb`. These local source versions do not establish current deployed capabilities. Prior policy/billing audit and the production configuration snapshot at **2026-10-22 19:33:07 UTC** support the documented entitlement and plan constraints. That snapshot is not refreshed by this revision and does not establish actual merchant charges or effective access.

No new price, automatic permission grant, plan switch, mandatory COA-based merchant segmentation, public compliance claim or shipping permission is proposed for the initial rebrand. Naming and commercial choices remain team decisions.

## Reproduce website validation

In the repo root, start a local static server:

```powershell
python -m http.server 4339 --bind 127.0.0.1 --directory qredible
```

In a second shell:

```powershell
$env:PLAYWRIGHT_MODULE='E:\Qredible\registry-platform-preview-20261022\ui\node_modules\@playwright\test'
$env:CHROMIUM_PATH='C:\Program Files\Google\Chrome\Application\chrome.exe'
node validation/registry-walkthrough/validate-migration.cjs
```

Use an installed `@playwright/test` and Chromium path on another machine; these exact paths record this run's environment. Playwright 1.44.1 / installed Chromium 156.0.8078.47.

Hosted run:

```powershell
$env:WALKTHROUGH_ORIGIN='https://deploy-preview-100--jfloyd-qredible.netlify.app'
$env:MIGRATION_VALIDATION_OUTPUT='validation/registry-walkthrough/migration-hosted'
node validation/registry-walkthrough/validate-migration.cjs
```

`migration-local/result.json` and screenshots record local proof. The harness covers all eight current/proposed screen families, all five catalogs, direct COAs access, optional no-COA report receipt, product creation/search/filter/column control, empty catalogs, required-COA dashboard drilldown, all five Display sections, content preview and snippet clipboard, invite/entry navigation, a labeled actual baseline capture, all review sections/packaging options, deep-link/reload/legacy sharing compatibility, desktop/mobile widths 1600/1280/390 and the archived references. Each full run captures 39 screenshots. Product API calls, failed same-origin responses and browser errors must be empty. Netlify's narrowly identified deploy-view telemetry is recorded separately.

Hosted proof is added after the source deploy succeeds; its result and source SHA are recorded below.

## Retained historical artifacts

- `future-concept.html`, `registry-design.js/css`, `design-local/hosted`, `EXPANDED-DESIGN-README.md`: earlier 18-view expanded concept, explicitly outside release 1. `validate-design.cjs` now targets that archive; only its route smoke test is rerun by the current harness.
- `reference.html`, original app/data/styles/coverage/capture assets, `SCREENSHOT-AUDIT-README.md`, older local/hosted proof: earlier 26-chapter source/capture audit. Original capture files are not edited.
- Current primary implementation: `migration.js`, `migration.css`, `index.html`, `validate-migration.cjs`.
