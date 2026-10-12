# Merchant audit user journeys

13 journeys / 111 original Playwright Chromium screenshots from deployed staging on October 12, 2026. Qredible collection route: `merchant-audit-journeys/`.

Application proof is separate from gallery navigation proof. All companies, account personas, inventories and PDFs are controlled synthetic fixtures. Website observations and changes were arranged in the staging database; no actual crawler scan is claimed. Real hosted UI/API, email verification, storage and extraction services were used with no HTTP mocks. Authentication codes, credentials, cookie values and secret invitation links are excluded. Secret fields were masked at capture; image bytes are unchanged afterwards.

The coverage dialog and chapter captions identify scope. Canonical COAs remained PROCESSING/UNPUBLISHED; policy evaluation was unavailable. Removal acknowledgment, real North enrollment, provider publication, concurrency/fault recovery, 1,000 COAs and portfolio capacity remain open. The gallery is not North launch certification. `N/A` lifecycle completion is labeled separately from actual product/website review.

Runtime: API `540dfba18cdc3c9175770dde5c56fb0a96842e6b`, UI `1f3dee84d9e822d0ba63fd93ea8eba7114cbaf37`, public staging `https://members.qrediblestaging.com`. API #2925 and UI #4059 are merged ancestors. Associated Jira: QP-4814, QP-4817, QP-4818.

Rebuild using `python validation/merchant-audit-gallery/build.py --evidence <authorized-staging-evidence-directory>`. It requires successful reports and copies an explicit PNG allowlist. Hashes are retained in `validation/merchant-audit-gallery/image-hashes.json`.

Serve the repository `qredible` directory locally and run `validation/merchant-audit-gallery/validate.cjs` with `PLAYWRIGHT_MODULE` resolving `@playwright/test`; `GALLERY_URL` selects the HTTP origin. The validator decodes all 111 images and checks chapters, next/previous, keyboard, thumbnails, zoom, coverage dialog, 390px layout, index link and absence of private metadata. This validates the static collection only, not the product workflows again.
