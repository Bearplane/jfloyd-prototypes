# MyCOA and sponsorship journey gallery publication

The static gallery is published from `qredible/mycoa-sponsorship-journeys/` to
`https://jfloyd-qredible.netlify.app/mycoa-sponsorship-journeys/`.

It assembles 26 journeys and 141 screenshots: 140 existing local-application
captures and one user-provided screenshot of the sponsorship terms on the plan
card before activation. The new capture's environment was not independently
verified for this gallery. This is a review aid, not proof of deployed staging
behavior, payment-provider settlement, or external email delivery. Images are
unchanged; the public `data.js` omits workstation source paths and capture
metadata. The original manifest stays outside this public repository.

To rebuild `data.js` from a local copy of the private gallery, run the
sanitizer below. It also inserts the public-only user-provided slide once;
that image is not in the older private source manifest.

```powershell
node validation/mycoa-gallery/sanitize-data.cjs <local-gallery-data.js> qredible/mycoa-sponsorship-journeys/data.js
```

To verify the actual static route with Playwright Chromium, serve `qredible/`
as the web root and run the validator from the repository root:

```powershell
python -m http.server 4318 --directory qredible
$env:GALLERY_URL = 'http://127.0.0.1:4318'
node validation/mycoa-gallery/validate.cjs
```

The validator requires Playwright and Chromium installed. If Playwright is not
available through Node's normal module resolution, set `PLAYWRIGHT_MODULE` to
its module path. `CHROMIUM_PATH` can select a specific Chromium binary.
`result.json` identifies the exact URL for the latest Playwright run, and the
three PNGs in this folder show the resulting index and gallery states. This
validates gallery integrity and navigation only, not the underlying
QTrust/Q-Config product workflows.
