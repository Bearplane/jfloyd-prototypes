# QP-5004 — New Q-Registry product design

Live preview: https://deploy-preview-100--jfloyd-qredible.netlify.app/registry-user-journeys/#screen=overview&scenario=mixed

PR: https://github.com/Bearplane/jfloyd-prototypes/pull/100

The primary route now opens an **interactive proposal with 18 newly designed views**. It uses the existing Qredible platform's shell, color/table conventions and product context. Q-Registry owns the navigation and workspace; MyCOA is the lab-evidence feature under Evidence. It does not use current-process screenshots as the proposed UI.

## Proposed views

1. Registry overview — product metrics, next tasks, access and optional tools.
2. Processor merchant workspace — invitation/account, Registry access, catalog and product tasks separately.
3. Registry invitation composer — recipient, account path, existing illustrative offer and lab tools.
4. New merchant invitation email — Q-Registry forward, MyCOA inside.
5. Registry offer/capabilities — product catalog and evidence tasks before lab-library packaging.
6. Product-first onboarding — add, import, website scan entry or return later.
7. Registry catalog — product identity, classification, assessment, next task and publication.
8. Product record — facts, policy/evidence context and product-specific lab applicability.
9. Policy assessments — scoped illustrative rows with incomplete/review states.
10. Evidence hub — labels, facts, documents and required lab evidence.
11. MyCOA — optional broader lab library inside Registry, never the parent product.
12. Merchant tasks / information requests — product-specific responses and review.
13. Product publication workspace — explicit fields, preview and in-memory publication/withdrawal.
14. Q-Registered stamp / embed — product-specific example links, separate certificate mode.
15. Public product record — registration, truthful incomplete assessment and optional evidence.
16. Registry subscription / features — commercial access distinct from product outcome.
17. Capability model — Registry Core, optional MyCOA and later public capabilities.
18. Future shipping information — explicit destination scope, always Not assessed in this prototype.

The reviewer can select mixed/no-COA/required-COA/empty catalogs; switch MyCOA tools off; create/edit an illustrative product; import CSV names locally; attach a filename to a requested evidence task; respond to a task; preview/publish/withdraw a sample record; copy example links; and follow invitation → offer → onboarding. What changed? opens per-screen design rationale and decisions. Deep links preserve the view, scenario, product and capability selection.

## Evidence and implementation boundary

**These are rendered proposed interfaces with illustrative records and browser-memory interactions. They are not deployed product screens, actual policy decisions, or Q-Config acceptance evidence.** No authentication, payment, email, production API, policy activation, public registration or shipping service is called. File contents are not uploaded or persisted. No network-backed persistence is implemented.

The existing $199 monthly illustrative offer is preserved as an example, not proposed new pricing. MyCOA capability packaging, Registry Core remediation access, names/mark meaning, public authority and shipping are decisions for owners. Core/later/future phases are labeled above the interface. Unknown applicability is shown as undetermined in this design; the real platform backend's legacy fallback is not repaired by this prototype.

The earlier 26-chapter/29-capture current-process/source audit is preserved at [reference.html](../../qredible/registry-user-journeys/reference.html), accessed only as secondary context. Its capture manifests, source coverage map and previous local/hosted proof remain historical evidence. [SCREENSHOT-AUDIT-README.md](SCREENSHOT-AUDIT-README.md) records that earlier deliverable. RTQ-Admin-UI PR4206 remains the separate earlier gated platform preview, not implementation of these18 new designs.

## Validation

Actual normal-route Playwright Chromium tests of this **prototype website** cover all18 new views (asserting no screenshot image is used as their interface), all4 scenarios, search/filter, product-first creation/import, required evidence with premium MyCOA OFF, pending-review states, explicit sample publication/withdrawal, stamp clipboard, invitation/offer/onboarding, merchant response, future shipping staying Not assessed, per-view notes, deep links/keyboard, and nine key views at1600/1280/390px. It also smoke-tests the secondary reference gallery. These checks are not underlying Qredible application E2E.

Reproduce locally:

```powershell
python -m http.server 4339 --bind 127.0.0.1 --directory qredible
# Set PLAYWRIGHT_MODULE to installed @playwright/test and CHROMIUM_PATH to installed Chrome.
node validation/registry-walkthrough/validate-design.cjs
```

For the hosted run, set WALKTHROUGH_ORIGIN to the verified Netlify preview origin and DESIGN_VALIDATION_OUTPUT to validation/registry-walkthrough/design-hosted before running the same script. Local proof is under design-local; hosted proof is recorded separately under design-hosted. Earlier local/hosted directories belong to the archived screenshot walkthrough.
