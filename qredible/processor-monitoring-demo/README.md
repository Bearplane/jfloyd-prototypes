# Qredible bank / processor monitoring demo

An interactive presentation concept for Brian and Noah. All companies, identities, findings, policy thresholds, source records, and metrics are synthetic. This is a proposed experience, not a claim that every pictured integration or workflow is deployed in the product.

## Present it

Open `index.html` through a static web server or the published Netlify URL. Select **Start guided demo** for the six-stop walkthrough:

1. Portfolio overview across licenses, products, websites, and MRI.
2. Greenfield Botanicals merchant overview and six product-check families.
3. Assigned versioned policies and source applicability.
4. A lab-limit finding linked to its policy requirement and sample evidence.
5. Analyst confirmation, simulated merchant request and response, and verified resolution.
6. Merchant report with the retained resolution and policy provenance.

The remediation step is interactive: use **Confirm & open case**, **Send demo request**, **Simulate merchant response**, then **Verify & resolve** before advancing the tour. Cases and reports update from the same browser-session state. **Reset demo** returns to the original sample portfolio.

For a second story, use Northgate Lending to demonstrate CFPB applicability and FDA/product exclusions, or review Greenfield's possible OFAC match and close it as a documented false positive.

## Included behavior

- Twelve fictional merchants, three industry profiles, and four versioned policy examples.
- License review; ingredients; lab limits; labels; claims; sales eligibility; COAs and batch linkage.
- FDA letters, FDA recalls, CFPB complaints, BBB, Google Reviews, OFAC, litigation, and a separately labeled disabled PEP source.
- Merchant search and filters; evidence panels; policy/source drawers; case activity; CSV export; browser print/save PDF.
- Desktop and mobile layouts, keyboard focus, drawer focus containment, and reduced-motion support.

No API, credentials, live screening, or messaging is used. Session state contains only the demo's browser-local notes and progress. Reset clears it. Fonts use Google Fonts with system fallbacks.

## Validation

Browser checks covered merchant search and industry filtering, product breadth, policy inspection, source applicability, lab evidence, the full remediation cycle, resolution propagation, OFAC false-positive disposition, reset, tour navigation, and desktop/mobile overflow. No JavaScript exceptions were observed.

Deployment path: `qredible/processor-monitoring-demo/` in `Bearplane/jfloyd-prototypes`; Netlify publishes the `qredible` directory as its site root.
