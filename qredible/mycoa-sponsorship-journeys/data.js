window.JOURNEYS = {
  "title": "Sponsorship — the merchant journey & wording review",
  "assembled": "2026-10-14",
  "total": 200,
  "chapters": [
    {
      "title": "The merchant paywall",
      "audience": "Merchant",
      "route": "QTrust → required paywall",
      "boundary": "First screen was supplied by Joseph on September 29; its capture environment was not independently verified for this gallery. Remaining screens are earlier local September 18 checkpoints with synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Sponsored offer before activation",
          "caption": "The merchant sees the configured MyCOA presentation with a sponsorship callout before entering consent. This recorded example is 50/50, not fully funded.",
          "src": "assets/staging-approved-split-01-initial-offer.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Neutral monthly paywall",
          "caption": "The global offer is $249/month in this separate fixture. A required paywall has no dismiss control.",
          "src": "assets/staging-layout-01-global-monthly-required.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Neutral annual alternative",
          "caption": "The global offer switches to $2,690/year. This is ordinary plan pricing; sponsored cycles use monthly billing.",
          "src": "assets/staging-layout-02-global-annual.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Paywall on mobile",
          "caption": "The same configured offer stacks at a 390px viewport.",
          "src": "assets/staging-layout-05-global-mobile.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Sponsored offer visible before activation",
          "caption": "The plan card shows the first three sponsored monthly cycles at $0 for the test merchant and the later $199/month merchant price before Activate MyCOA is clicked. User-provided screenshot; no activation or charge is proved by this image.",
          "src": "assets/141-sponsored-plan-card-before-activation-user-capture.png",
          "evidence": {
            "label": "User-supplied capture",
            "date": "September 29, 2026",
            "note": "Supplied by Joseph. Its capture environment was not independently verified. No activation or charge is proved."
          }
        },
        {
          "title": "Required paywall, compact desktop",
          "caption": "The refined one-plan card sits inside the processor layout. Required enrollment has no dismiss action.",
          "src": "assets/001-47-qtrust-reference-required-1280x720.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Switch to annual",
          "caption": "The native billing period and price update inside the custom card; presentation does not replace billing logic.",
          "src": "assets/002-43-qtrust-reference-card-annual.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "The same offer on mobile",
          "caption": "Review the responsive card and surrounding content at a 390px viewport.",
          "src": "assets/003-50-qtrust-reference-mobile-390x844.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Global default without WestTown branding",
          "caption": "The global layout is independently configurable. This is a Q-Config preview of the neutral alternative, not a WestTown merchant screen.",
          "src": "assets/004-52-qconfig-global-neutral-preview.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Global annual alternative",
          "caption": "The neutral default also supports annual pricing; fixture amounts should not be treated as a production rate card.",
          "src": "assets/005-53-qconfig-global-neutral-annual-preview.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        }
      ],
      "id": "paywall",
      "summary": "What the merchant sees first",
      "terms": [
        "Activate MyCOA",
        "Processor sponsorship",
        "Monthly / Yearly"
      ],
      "configurable": "Q-Config can change promotional layout/card copy and button labels. The sponsorship callout and live amount come from the eligible offer; typing marketing copy does not establish funding.",
      "review": "Review sponsor identity, whether coverage is fully funded or shared, the amount during coverage, and the later renewal. Neutral global and processor-branded layouts are separate examples."
    },
    {
      "title": "New merchant: fully funded activation",
      "audience": "Merchant",
      "route": "QTrust → paywall → sponsorship consent → Settings",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Merchant without a preassigned offer",
          "caption": "This merchant enters through a sponsorship-only promo rather than a prior admin assignment.",
          "src": "assets/staging-promo-cap-01-no-assigned-sponsorship.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Validate a sponsorship code",
          "caption": "The code resolves a sponsor offer; it is not an ordinary percentage-off checkout promo.",
          "src": "assets/staging-promo-cap-02-code-validation.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Review fully funded terms",
          "caption": "The review discloses the sponsoring processor, three funded monthly cycles, card requirement and later $199 monthly billing.",
          "src": "assets/staging-promo-cap-03-code-only-activation-review.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Explicit future billing consent",
          "caption": "The recorded test checked the exact billing authorization before activation; this walkthrough submits no consent.",
          "src": "assets/staging-promo-cap-04-approved-code-billing-consent.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Funded coverage is active",
          "caption": "The recorded staging run activated at $0 merchant contribution and established a future $199 schedule. Future execution was not elapsed or charged.",
          "src": "assets/staging-promo-cap-05-code-activated-subscription.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "A consumed one-use code is rejected",
          "caption": "A second merchant cannot redeem the used max-one code. This recorded sequential check proves no second enrollment; concurrent redemption is a separate test.",
          "src": "assets/staging-promo-cap-06-second-merchant-rejected.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Enter the sponsored offer",
          "caption": "The merchant reaches the paywall with the sponsorship promotion available.",
          "src": "assets/047-merchant-activation-offer-paywall-promo-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review funded cycles and handoff",
          "caption": "The merchant reviews the offer and authorizes a payment method for the later merchant-paid subscription.",
          "src": "assets/048-merchant-activation-consent-promo-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Consent on mobile",
          "caption": "The same consent journey is available on a narrow screen.",
          "src": "assets/049-merchant-activation-consent-mobile-promo-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirmed coverage in Settings",
          "caption": "Settings displays the accepted sponsorship and later billing information.",
          "src": "assets/050-merchant-activation-confirmed-settings-promo-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Coverage status on mobile",
          "caption": "The resulting status can be reviewed without returning to the paywall.",
          "src": "assets/051-merchant-activation-confirmed-status-mobile-promo-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Enrollment notice captured locally",
          "caption": "This is the local MailHog message capture, not proof of delivery to an external mailbox.",
          "src": "assets/052-merchant-enrollment-mailhog-promo-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "fully-funded",
      "summary": "Three fully funded monthly cycles",
      "terms": [
        "Activate MyCOA",
        "Card ending",
        "First merchant-paid charge"
      ],
      "configurable": "Q-Config terms determine who funds coverage and its duration. The application generates exact current and future billing disclosures; there is no generic editor here for the consent sentence.",
      "review": "The merchant can owe $0 during sponsored cycles and still provide a card for later billing. “Sponsored” describes the payer, rather than an ordinary free trial."
    },
    {
      "title": "New merchant: shared-cost activation",
      "audience": "Merchant",
      "route": "QTrust → sponsored offer → checkout → Settings",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Shared-cost consent, unchecked",
          "caption": "The merchant sees $99.50 now, $99.50 for the remaining sponsored cycles, and $199/month after three cycles. The authorization starts unchecked.",
          "src": "assets/staging-approved-split-02-exact-consent-before.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Explicit contribution authorization",
          "caption": "The recorded staging test authorized the first merchant contribution and later monthly billing using a masked saved card.",
          "src": "assets/staging-approved-split-03-approved-consent.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Awaiting payment confirmation",
          "caption": "Payment submission and active access are distinct. The recorded run used one $99.50 test sale, then the same activation completed after the genuine callback.",
          "src": "assets/staging-approved-split-04-pending-0.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Active shared coverage in Settings",
          "caption": "This test fixture’s historical name contains Split80; its actual agreement here is 50/50. Settings reflects the accepted funding and later self-pay terms.",
          "src": "assets/staging-fresh-active-Split80-desktop.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Active coverage on mobile",
          "caption": "The same recorded shared-cost subscription at a mobile viewport.",
          "src": "assets/staging-fresh-active-Split80-mobile.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "A shared-cost offer",
          "caption": "A 50/50 offer is presented before the merchant confirms payment.",
          "src": "assets/053-merchant-activation-offer-paywall-promo-split-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirm the merchant share",
          "caption": "In the illustrated $199 example the merchant share is $99.50 at activation; processor economics are calculated separately.",
          "src": "assets/054-merchant-activation-consent-promo-split-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Shared consent on mobile",
          "caption": "Review the same terms and payment consent in the mobile layout.",
          "src": "assets/055-merchant-activation-consent-mobile-promo-split-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Shared subscription confirmed locally",
          "caption": "The local provider double accepted the activation path. This is not evidence of a real card charge.",
          "src": "assets/056-merchant-activation-confirmed-settings-promo-split-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Shared enrollment notice",
          "caption": "The local email records the enrolled offer and its billing terms.",
          "src": "assets/057-merchant-enrollment-mailhog-promo-split-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Annual enrollment during sponsorship is refused",
          "caption": "Funded cycles are monthly. Annual billing is handled at the merchant-paid transition instead.",
          "src": "assets/058-merchant-annual-offer-refusal-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "shared-cost",
      "summary": "The merchant contributes during coverage",
      "terms": [
        "You pay … now",
        "Remaining sponsored monthly cycle",
        "Awaiting confirmation"
      ],
      "configurable": "Merchant share is configurable; sponsor commercial pricing is independent. The consent modal derives its amounts from the accepted quote.",
      "review": "For this 50/50 example the first merchant contribution is due at activation. A $74.63 sponsor invoice and a $99.50 merchant payment are different amounts."
    },
    {
      "title": "Already paying: next unpaid renewal",
      "audience": "Merchant",
      "route": "QTrust → Settings → accept assigned sponsorship",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Offer on an existing paid subscription",
          "caption": "An existing subscriber reviews sponsorship without buying the current plan again.",
          "src": "assets/staging-paid-review-04-merchant-offer.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "No immediate charge; next unpaid renewal",
          "caption": "The review states the scheduled funding start and later merchant-paid amount/date. In the recorded run the gateway deferral succeeded but a date-status defect remained; the following older local screens illustrate the scheduled target state, not a fresh deployed fix pass.",
          "src": "assets/staging-paid-review-05-exact-unchecked-consent.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Historical review only. The paid-renewal date defect reported on that capture date is not a claim about today’s deployment."
          }
        },
        {
          "title": "An offer on an existing subscription",
          "caption": "An already-paying merchant can see an administrator-assigned offer in Settings.",
          "src": "assets/059-merchant-paid-offer-admin-settings-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review when the change begins",
          "caption": "The share starts at the next unpaid renewal, not as another charge for the current paid cycle.",
          "src": "assets/060-merchant-paid-offer-admin-consent-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review on mobile",
          "caption": "The consent screen also exposes the terms on a narrow screen.",
          "src": "assets/061-merchant-paid-offer-admin-consent-mobile-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Sponsorship scheduled",
          "caption": "The existing paid period is preserved while the new funded period is scheduled.",
          "src": "assets/062-merchant-paid-offer-admin-scheduled-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Scheduled-offer notice",
          "caption": "The local notification records the accepted future arrangement.",
          "src": "assets/063-merchant-paid-offer-admin-mailhog-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "already-paying",
      "summary": "Start at the next unpaid renewal",
      "terms": [
        "Review sponsorship",
        "Scheduled",
        "No immediate charge"
      ],
      "configurable": "The offer is configurable, but coverage cannot retroactively replace an already paid cycle. Exact dates and future billing are generated and require consent.",
      "review": "These are dated examples. A September 30 date-status defect was recorded; local scheduled screenshots illustrate the target flow and do not certify today’s deployed outcome."
    },
    {
      "title": "Choose annual at the billing handoff",
      "audience": "Merchant + super admin",
      "route": "QTrust → Settings → renewal choice; Q-Config → company",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Active funded status and future renewal",
          "caption": "The merchant sees current funded access and the later monthly renewal. This separate fixture uses $249 monthly pricing.",
          "src": "assets/staging-active-PromoB-after-mail-01-status.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Compare the post-sponsorship annual option",
          "caption": "The eligible offer compares $2,690 annually with $2,988 for twelve $249 payments: $298 savings, about 9.97%.",
          "src": "assets/staging-active-PromoB-after-mail-02-annual-comparison.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Review annual consent before commitment",
          "caption": "The annual price and first charge date are disclosed. The recorded staging run left consent unchecked and did not confirm annual billing.",
          "src": "assets/staging-active-PromoB-after-mail-03-annual-consent-unchecked.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Annual review on mobile",
          "caption": "The same nonbinding review at 390px.",
          "src": "assets/staging-active-PromoB-after-mail-04-mobile-annual-review.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Keep the existing monthly renewal",
          "caption": "The recorded review returned without changing the future monthly contract. Subsequent confirmed/recovery examples below are explicitly full-local simulations.",
          "src": "assets/staging-active-PromoB-after-mail-05-monthly-kept.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Review the annual transition",
          "caption": "Annual billing is chosen for the merchant-paid handoff, not for the funded monthly cycles.",
          "src": "assets/070-01-annual-consent-desktop.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Annual consent controls on mobile",
          "caption": "The mobile view keeps the confirmation controls available.",
          "src": "assets/071-02b-annual-consent-mobile-controls.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "An uncertain provider response",
          "caption": "A simulated lost response is shown as pending, not falsely reported as confirmed.",
          "src": "assets/072-03-uncertain-gateway-pending.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Recovery with enrollment disabled",
          "caption": "Existing pending work can be reconciled while new enrollment is switched off.",
          "src": "assets/073-03b-recovery-with-enrollment-off.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Annual selection confirmed locally",
          "caption": "The local test recovered the provider result and confirmed the future annual choice.",
          "src": "assets/074-04-annual-confirmed.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Settings reflects the future choice",
          "caption": "The saved future billing preference remains visible to the merchant.",
          "src": "assets/075-05-annual-settings.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Annual confirmation notice",
          "caption": "Local email capture records the confirmed choice.",
          "src": "assets/076-06-annual-confirmation-mailhog.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Return to monthly",
          "caption": "The merchant can also confirm a return to monthly under the supported transition rules.",
          "src": "assets/077-07-monthly-return-confirmed.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "annual-handoff",
      "summary": "Choose billing after sponsorship",
      "terms": [
        "Compare annual",
        "Keep current renewal",
        "Confirm annual"
      ],
      "configurable": "Eligible annual pricing can be reviewed for the post-sponsored period. Q-Config savings copy is editable; exact annual amount and first-charge date remain generated.",
      "review": "Recorded staging review stops before annual commitment. Confirmed annual/return-to-monthly/recovery screens are local runs with fake NMI and MailHog. No elapsed future charge is demonstrated."
    },
    {
      "title": "Cancel during funded coverage",
      "audience": "Merchant + super admin",
      "route": "QTrust → Settings → cancel; Q-Config → active grant",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Review active funded coverage",
          "caption": "The merchant begins cancellation from their actual subscription Settings.",
          "src": "assets/113-merchant-cancellation-settings-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Explain the cancellation effect",
          "caption": "Access continues through the current funded cycle. Future unstarted sponsor cycles are voided; issued invoices remain intact.",
          "src": "assets/114-merchant-cancellation-confirm-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Cancellation consent on mobile",
          "caption": "The same confirmation and consequences are exposed on the mobile screen.",
          "src": "assets/115-merchant-cancellation-confirm-mobile-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirmed cancellation state",
          "caption": "The resulting state is visible after the locally simulated recurring-schedule cancellation.",
          "src": "assets/116-merchant-cancellation-confirmed-mobile-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "cancel-funded",
      "summary": "Cancel while coverage is active",
      "terms": [
        "Cancel sponsorship",
        "Current funded cycle",
        "Self-pay schedule"
      ],
      "configurable": "Cancellation confirmation and consequences are generated by the application. A marketing copy change cannot cancel the provider schedule.",
      "review": "Current promised coverage and already issued processor obligations are preserved according to the accepted cancellation rules. These cancellation screenshots are local provider simulations."
    },
    {
      "title": "Already paying: cancel before sponsorship begins",
      "audience": "Merchant",
      "route": "QTrust → Settings → scheduled sponsorship",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Cancel the scheduled offer",
          "caption": "The merchant withdraws before the funded period starts rather than cancelling an already-consumed cycle.",
          "src": "assets/120-merchant-paid-offer-admin-cancel-confirm-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Original subscription preserved",
          "caption": "The local test confirms cancellation of the future contribution schedule and preservation/restoration of the original recurring arrangement.",
          "src": "assets/121-merchant-paid-offer-admin-cancelled-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "cancel-scheduled",
      "summary": "Withdraw before funding starts",
      "terms": [
        "Scheduled sponsorship",
        "Original subscription"
      ],
      "configurable": "The generated review explains how the original subscription will be preserved when a future scheduled offer is withdrawn.",
      "review": "These full-local examples preserve the existing paid subscription. They do not demonstrate a new deployed schedule reversal."
    },
    {
      "title": "Alternative allocations: 80/20 and 75/25",
      "audience": "Merchant",
      "route": "QTrust → Settings → sponsorship promo",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "80% sponsor / 20% merchant",
          "caption": "The merchant share is $39.80 on a $199 face price in this test configuration.",
          "src": "assets/064-merchant-paid-offer-promo-consent-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "80/20 scheduled",
          "caption": "The selected allocation is scheduled for the next unpaid cycle.",
          "src": "assets/065-merchant-paid-offer-promo-scheduled-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "75% sponsor / 25% merchant",
          "caption": "The merchant share is $49.75 on a $199 face price in this separate test configuration.",
          "src": "assets/066-merchant-paid-offer-promo-consent-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "75/25 scheduled",
          "caption": "This is a different run, illustrating configurability rather than a change to the preceding merchant.",
          "src": "assets/067-merchant-paid-offer-promo-scheduled-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Annual handoff comparison available",
          "caption": "Eligible annual pricing can be compared for the post-sponsorship period.",
          "src": "assets/068-annual-comparison-desktop-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "No eligible annual alternative",
          "caption": "The UI also handles the case where an annual comparison cannot be offered.",
          "src": "assets/069-annual-comparison-desktop-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "other-allocations",
      "summary": "Other configurable funding splits",
      "terms": [
        "80% sponsor / 20% merchant",
        "75% sponsor / 25% merchant"
      ],
      "configurable": "For a $199 face price, 20% merchant share is $39.80 and 25% is $49.75. These are local fixtures, not additional provider activation proof.",
      "review": "Different fixture runs illustrate different allocations. They do not change the preceding merchant’s accepted terms."
    },
    {
      "title": "Configure the overall layout",
      "audience": "Super admin",
      "route": "Q-Config → Invite Configuration → Paywall layout",
      "boundary": "Earlier local paywall checkpoint · September 18. Actual application routes; synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Open Global paywall layout",
          "caption": "Invite Configuration opens the real global layout editor. Processor-specific layouts are opened from the sender row’s Paywall layout action.",
          "src": "assets/20261014-06-paywall-layout.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Editable copy and live controls",
          "caption": "Purchase button label, safe layout HTML, color, width and billing-control placement are configurable. This source review was not saved.",
          "src": "assets/20261014-07-paywall-copy-controls.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Activation-invite headline and message",
          "caption": "The separate Activation banner has headline/message and styling controls. It is for activation-invite entry, not a rule that displays whenever sponsorship is active.",
          "src": "assets/20261014-11-activation-invite-banner.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Global layout configuration",
          "caption": "Set the shared paywall presentation that applies when no processor-specific override is selected.",
          "src": "assets/006-02-global-layout-saved.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Processor-specific layout",
          "caption": "Preview a processor override independently of the global default.",
          "src": "assets/007-03-processor-layout-preview.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Edit the presentation visually",
          "caption": "The rich-text editor controls explanatory content and layout around required native controls.",
          "src": "assets/008-04-tinymce-visual-editor.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Edit the HTML source",
          "caption": "Source mode exposes the layout markup for a more precise design.",
          "src": "assets/009-05-tinymce-source-code.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Invalid token is blocked",
          "caption": "Required and unsupported token checks prevent saving a layout that cannot render its required controls.",
          "src": "assets/010-01-invalid-token-save-blocked.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        }
      ],
      "id": "layout-copy",
      "summary": "Author the surrounding message",
      "terms": [
        "Global paywall layout",
        "Purchase button label",
        "Activation banner"
      ],
      "configurable": "Editable: safe HTML, headings, benefits, images, button labels and visual settings. Processor layouts can override global presentation. Activation-invite banner text is separate from active-sponsorship state.",
      "review": "Preserve the live plans/promo/billing controls. A design preview does not grant access or change prices."
    },
    {
      "title": "Override one or multiple plan cards",
      "audience": "Super admin",
      "route": "Q-Config → processor/global Paywall layout → Plan cards",
      "boundary": "Earlier local paywall checkpoint · September 18. Actual application routes; synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Choose the card to configure",
          "caption": "Choose a default or an individual plan override. Card design changes presentation; it does not change eligible plans.",
          "src": "assets/20261014-08-plan-card-controls.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Card text versus protected billing",
          "caption": "Custom HTML can replace titles, benefits, reassurance copy and button labels. Native plan_price and plan_purchase slots retain the real price and action; plan_billing_toggle is required with in-card billing.",
          "src": "assets/20261014-09-card-html.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Choose original or custom card",
          "caption": "A card can retain the original per-plan presentation or use an override in the paywall layout configuration.",
          "src": "assets/011-35-qconfig-original-card-override.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Custom plan-card editor",
          "caption": "Configure the chosen plan card independently of the outer paywall layout.",
          "src": "assets/012-36-qconfig-card-editor.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Full card source",
          "caption": "HTML controls the card presentation; native price, period and purchase slots keep the existing application behavior.",
          "src": "assets/013-51-qconfig-plan-card-source.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Required billing token validation",
          "caption": "Invalid card content is rejected instead of silently breaking the purchase controls.",
          "src": "assets/014-40-qconfig-billing-token-validation.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Preview the refined card",
          "caption": "The reference design combines the plan title, billing period, price, activation action and concise benefits.",
          "src": "assets/015-41-qconfig-reference-card-preview.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Multiple custom cards in QTrust",
          "caption": "Each eligible plan can have its own custom card; the layout is not restricted to one plan.",
          "src": "assets/016-34-qtrust-multiple-custom-cards.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Mix native and custom cards",
          "caption": "Unmodified cards and overridden cards can appear together in the same paywall.",
          "src": "assets/017-33-qtrust-multiple-native-custom-cards.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        }
      ],
      "id": "card-copy",
      "summary": "Write a plan card",
      "terms": [
        "Card to configure",
        "Card design",
        "Card purchase button label"
      ],
      "configurable": "Custom HTML can replace displayed title/features and benefit copy. Individual plan override → layout default card → original plan configuration. This does not edit the shared plan.",
      "review": "Retain native plan_price / plan_purchase and, when configured, plan_billing_toggle. Required controls keep real pricing, consent and checkout behavior."
    },
    {
      "title": "Highlight annual savings",
      "audience": "Super admin + merchant",
      "route": "Q-Config → annual savings controls; QTrust → paywall",
      "boundary": "Earlier local paywall checkpoint · September 18. Actual application routes; synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Annual-savings heading and controls",
          "caption": "The savings heading, display mode, badge and monthly equivalent can be configured. The savings amount/percentage is calculated from real eligible prices.",
          "src": "assets/20261014-10-annual-savings-copy.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Configure savings messaging",
          "caption": "Control the savings presentation rather than hard-coding promotional prices into the HTML.",
          "src": "assets/018-54-qconfig-annual-savings-controls.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Preview savings copy",
          "caption": "The preview shows the selected savings display using the configured monthly and annual prices.",
          "src": "assets/019-55-qconfig-annual-savings-preview.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Annual savings in the application",
          "caption": "The merchant sees the annual price and its savings alongside the purchase action.",
          "src": "assets/020-56-qtrust-annual-savings.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Savings on mobile",
          "caption": "The annual value proposition remains part of the responsive card.",
          "src": "assets/021-57-qtrust-annual-savings-mobile.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Continue to native checkout",
          "caption": "The customized savings presentation hands off to the existing purchase workflow.",
          "src": "assets/022-58-qtrust-annual-savings-checkout-entry.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        }
      ],
      "id": "savings-copy",
      "summary": "Explain annual savings",
      "terms": [
        "Annual savings display",
        "Annual savings heading",
        "Yearly"
      ],
      "configurable": "Heading and display options are editable. Savings and monthly-equivalent values are calculated from eligible monthly/annual prices.",
      "review": "Annual comparison is for eligible plans; the first sponsored cycles remain monthly. Avoid describing an annual commitment as already accepted."
    },
    {
      "title": "Q-Config sponsorship programs",
      "audience": "Super admin",
      "route": "Q-Config → Sponsorships",
      "boundary": "Current local full-application setup validation. Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No API route mocks. This journey did not charge, enroll, issue invoices or send email.",
      "slides": [
        {
          "title": "Sponsorships → Programs & terms",
          "caption": "Choose the sponsoring processor. Program cards show funding cycles, merchant percentage, sponsor commercial rate, collection mode and status.",
          "src": "assets/20261014-01-programs.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Configurable program terms",
          "caption": "A direct screenshot of the real Q-Config form region: agreement name, eligible MyCOA plans, funding term, cycles, merchant share, sponsor rate and collection mode. Nothing was saved.",
          "src": "assets/20261014-02-program-form.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Merchants tab",
          "caption": "This is program participation and offer administration, rather than merchant-facing checkout.",
          "src": "assets/20261014-03-merchants.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Promo codes tab",
          "caption": "Sponsor codes belong to the selected program and have their own lifecycle.",
          "src": "assets/20261014-04-promo-codes.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Invoices & payments tab",
          "caption": "Processor invoice contact, monthly statements and issued finance live here; invoices aggregate processor obligations across programs.",
          "src": "assets/20261014-05-invoices.png",
          "evidence": {
            "label": "Fresh deployed Q-Config",
            "date": "October 14, 2026",
            "note": "Normal config.qrediblestaging.com routes / Playwright Chromium / no HTTP mocks. Read-only review and unsaved form controls. No program, pricing, invoice or billing change saved."
          }
        },
        {
          "title": "Exact split-price preview",
          "caption": "On $199 face price, the merchant pays $99.50; the sponsor’s gross share is $99.50. A 25% sponsor commercial discount makes the sponsor invoice $74.63, not a merchant discount.",
          "src": "assets/staging-05-qconfig-split-exact-quote.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "One home for sponsorships",
          "caption": "Choose the sponsoring processor without opening a merchant modal.",
          "src": "assets/131-01-sponsorship-home.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "Create a reusable program",
          "caption": "Configure eligible plans, duration, merchant share and processor commercial rate once.",
          "src": "assets/132-02-program-terms.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "Review program terms",
          "caption": "Each processor can have reusable programs; saving a draft does not enroll merchants.",
          "src": "assets/133-03-saved-program.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "Preview exact dollar amounts",
          "caption": "Choose a merchant for a read-only quote. This fixture uses a $79 plan and shows $59.25 sponsor cost after its 25% commercial discount; amounts come from the chosen plan and rules.",
          "src": "assets/134-03b-exact-merchant-price-preview.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "Review merchant offers",
          "caption": "Selected merchants are shown before confirmation. Preparing offers does not activate subscriptions or send invitations.",
          "src": "assets/135-04-review-selected-merchants.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "See who is in the program",
          "caption": "Pending offers are separate from enrollments. Search the roster, add merchants or manage a pending offer.",
          "src": "assets/136-05-program-merchant-roster.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "Program-specific promo controls",
          "caption": "Link and manage sponsorship codes separately from individual merchant assignment. This change does not add a company allowlist to codes.",
          "src": "assets/137-06-program-promo-codes.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "Processor-wide invoices",
          "caption": "The invoice workspace is separate and includes the processor’s programs, not just one merchant.",
          "src": "assets/138-07-processor-invoice-workspace.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "Responsive program workspace",
          "caption": "The page fits the mobile content area; tabs can be scrolled horizontally. The shared app header remains the existing Q-Config header.",
          "src": "assets/139-08-program-home-mobile.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        },
        {
          "title": "Simplified merchant modal",
          "caption": "The merchant modal retains that merchant’s coverage and actions, with a link to Sponsorships. Program creation and processor invoices have moved out.",
          "src": "assets/140-09-merchant-participation-only.png",
          "evidence": {
            "label": "Full local Q-Config",
            "date": "September 29, 2026",
            "note": "Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No route mocks. Setup only; no charge, enrollment, invoice or email."
          }
        }
      ],
      "id": "qconfig-programs",
      "summary": "Q-Config configuration of sponsorship programs",
      "terms": [
        "Programs & terms",
        "Merchants",
        "Promo codes",
        "Invoices & payments"
      ],
      "configurable": "Configure processor, agreement name, eligible plans, funding term/cycles, merchant share, sponsor commercial rate, and collection mode. The program name is administrative; it is not a free-form merchant consent template.",
      "review": "Program setup, merchant acceptance and processor invoice issue are separate stages. Merchant share is a percentage of face price; sponsor commercial discount applies only to the remaining sponsor share."
    },
    {
      "title": "Configure a processor sponsorship",
      "audience": "Super admin",
      "route": "Q-Config → Companies → company modal → Sponsorship",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Organized company sponsorship tab",
          "caption": "The company modal groups sponsorship controls separately from other company information.",
          "src": "assets/029-01-company-sponsorship-tab.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Preview the funded amount",
          "caption": "The illustrated $199 face price with a separate 25% commercial discount yields a $149.25 fully funded processor amount.",
          "src": "assets/030-02-westtown-149-25-preview.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Save a draft",
          "caption": "Saving configuration alone does not enroll a merchant or create a charge.",
          "src": "assets/031-03-saved-draft-only.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review a versioned edit",
          "caption": "Agreement versions preserve a record of changes instead of rewriting financial history.",
          "src": "assets/032-04-versioned-draft-edit.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Configure a shared allocation",
          "caption": "Merchant and processor shares are configurable. A 50/50 split is one example, not a fixed model.",
          "src": "assets/033-33-split-draft-preview-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirm activation",
          "caption": "Activation is a separate administrative decision after reviewing the draft.",
          "src": "assets/034-19-agreement-activation-confirmation-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Active agreement, no merchant grant",
          "caption": "An active processor agreement does not itself create merchant subscriptions.",
          "src": "assets/035-17-active-agreement-no-grant-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Pause the agreement",
          "caption": "Pause controls future enrollment without treating configuration changes as merchant cancellation.",
          "src": "assets/036-18-paused-agreement-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "program-lifecycle",
      "summary": "Make a program available",
      "terms": [
        "DRAFT",
        "Activate agreement",
        "ACTIVE",
        "Pause agreement"
      ],
      "configurable": "Admins draft/edit terms and activate/pause eligibility with an audit reason. An active agreement makes an offer eligible; it does not itself enroll merchants.",
      "review": "Read ACTIVE with its context: agreement eligibility differs from merchant coverage. Older company-modal screenshots precede the central Sponsorships home."
    },
    {
      "title": "Assign an offer without a promo code",
      "audience": "Super admin",
      "route": "Q-Config → Companies → Sponsorship offers",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Select a merchant for an offer",
          "caption": "The admin selects an eligible test merchant under the sponsoring program.",
          "src": "assets/staging-07-fresh-split-offer-selected.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Review the offer and reason",
          "caption": "Review program, merchant and audit reason before confirming. An offer does not itself enroll or charge the merchant.",
          "src": "assets/staging-08-fresh-split-offer-review.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Pending offer in the roster",
          "caption": "The offer is PENDING until merchant acceptance. This is a different state from active merchant coverage.",
          "src": "assets/staging-09-fresh-split-pending-roster.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Assign an offer to a merchant",
          "caption": "An administrator can grant a pending offer without requiring a manually entered promo code.",
          "src": "assets/037-14-sponsor-offer-pending-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Prevent unsafe offer edits",
          "caption": "The UI refuses an edit that would conflict with the offer lifecycle.",
          "src": "assets/038-16-sponsor-offer-edit-blocked-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Revoke a pending offer",
          "caption": "An unused offer can be withdrawn without inventing a subscription or charge.",
          "src": "assets/039-15-sponsor-offer-revoked-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Assign before signup",
          "caption": "A pre-join offer can exist before merchant activation; the merchant still must complete the enrollment steps.",
          "src": "assets/040-26-prejoin-offer-pending-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Revoke before signup",
          "caption": "The pending pre-join offer can also be withdrawn.",
          "src": "assets/041-27-prejoin-offer-revoked-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "assignment",
      "summary": "Offer sponsorship to a merchant",
      "terms": [
        "Review selected merchants",
        "Prepare offer",
        "PENDING",
        "Revoke"
      ],
      "configurable": "Admins select eligible merchants, review the program and record a reason. Pre-signup assignment is supported in the local examples.",
      "review": "A pending offer is not active access. The merchant still reviews the terms, provides a payment method and accepts billing consent."
    },
    {
      "title": "Configure the sponsorship promo",
      "audience": "Super admin",
      "route": "Q-Config → sponsorship promotion controls",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Create a draft sponsorship code",
          "caption": "A promo is an alternative route into the same sponsorship model.",
          "src": "assets/042-11-sponsor-promo-draft-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review the released promotion",
          "caption": "Review promotion configuration before enabling merchant use.",
          "src": "assets/043-12-sponsor-promo-released-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirm promo activation",
          "caption": "Activation is explicit rather than a side effect of drafting the code.",
          "src": "assets/044-20-promo-activation-confirmation-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Active code, no enrollment yet",
          "caption": "A published code does not charge or enroll anyone by itself.",
          "src": "assets/045-21-active-sponsor-code-no-grant-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Pause the promotion",
          "caption": "The code can be paused independently of already-recorded financial history.",
          "src": "assets/046-22-paused-sponsor-code-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "sponsor-codes",
      "summary": "Make a sponsor code available",
      "terms": [
        "Reserve code",
        "Activate promo",
        "Pause",
        "Released"
      ],
      "configurable": "Program-specific promo bindings and their lifecycle are configured by admins. A sponsor-only code resolves an agreement rather than acting as an ordinary checkout discount.",
      "review": "An active code does not prove redemption. Check eligibility, expiry and usage limits; a consumed code can reject the next merchant."
    },
    {
      "title": "Amend future funding safely",
      "audience": "Super admin + merchant",
      "route": "Q-Config → allocation change; QTrust → merchant consent",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Preview a prospective amendment",
          "caption": "Review the before-and-after allocation before changing future unpaid cycles.",
          "src": "assets/078-01-admin-allocation-preview-desktop.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Current-cycle change is refused",
          "caption": "Current and already-issued financial records are not rewritten by a prospective amendment.",
          "src": "assets/079-03-current-cycle-refused.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Withdraw a proposed change",
          "caption": "A proposal can be withdrawn before it takes effect.",
          "src": "assets/080-01-withdrawn-proposal.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Merchant reviews a 50% share",
          "caption": "Increasing the merchant obligation requires explicit consent to the new terms.",
          "src": "assets/081-02-merchant-consent-50.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Amendment consent on mobile",
          "caption": "The mobile consent surface shows the same proposed change.",
          "src": "assets/082-03-merchant-consent-mobile.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Uncertain creation is fenced",
          "caption": "A simulated uncertain gateway response cannot be treated as a completed schedule change.",
          "src": "assets/083-04-uncertain-create.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Admin sees the confirmed 50% change",
          "caption": "The confirmed version and future allocation are visible after reconciliation.",
          "src": "assets/084-05-admin-confirmed-50.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review a later 20% share",
          "caption": "A subsequent proposal demonstrates another configurable allocation.",
          "src": "assets/085-02-merchant-consent-20.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirmed 20% share",
          "caption": "The new confirmed version is recorded without replacing the earlier consent history.",
          "src": "assets/086-05-admin-confirmed-20.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Return to fully funded",
          "caption": "A later confirmed amendment can restore a zero merchant share.",
          "src": "assets/087-05-admin-confirmed-0.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Version history on mobile",
          "caption": "The administrative history remains reviewable on smaller screens.",
          "src": "assets/088-06-admin-history-mobile.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "funding-amendments",
      "summary": "Review a future funding change",
      "terms": [
        "Proposed",
        "Withdraw",
        "Consent",
        "Confirmed"
      ],
      "configurable": "Prospective allocation changes have an audited proposal and merchant consent when required. They do not silently rewrite the current paid/funded cycle.",
      "review": "These full-local examples show proposed, withdrawn, pending and confirmed states. A pending provider outcome is not a confirmed change."
    },
    {
      "title": "Issue the processor invoice",
      "audience": "Super admin / finance",
      "route": "Q-Config → company → Sponsorship finance",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Open processor invoices",
          "caption": "Select the processor. Invoices are processor-wide, combining due funded merchant cycles across its programs.",
          "src": "assets/staging-fresh-invoice-01-program.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Preview due funded cycles",
          "caption": "Review itemized merchant coverage and the sponsor amount before creating a statement. This split example owes $74.63.",
          "src": "assets/staging-fresh-invoice-02-due-cycle-preview.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Due-cycle preview on mobile",
          "caption": "Review the same due cycle at mobile width.",
          "src": "assets/staging-fresh-invoice-03-mobile-preview.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Confirm statement drafting",
          "caption": "Drafting assembles obligations; it does not email, post revenue, collect payment or charge a card.",
          "src": "assets/staging-fresh-invoice-04-draft-confirmation.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Statement DRAFT",
          "caption": "The DRAFT statement has one funded cycle for $74.63. The application explicitly says no invoice sent and no revenue or cash posted.",
          "src": "assets/staging-fresh-invoice-05-draft-only.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Review invoice destination and terms",
          "caption": "Review exact recipient, due date, amount and document before issue.",
          "src": "assets/staging-fresh-invoice-06-invoice-destination-preview.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Exact invoice recipient confirmation",
          "caption": "The recorded staging invoice was directed to Joseph’s designated test mailbox, not a live processor billing contact.",
          "src": "assets/staging-approved-invoice-01-exact-destination.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Issue stays disabled until confirmed",
          "caption": "An unchecked confirmation does not issue or send the invoice.",
          "src": "assets/staging-approved-invoice-02-unconfirmed-disabled.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Final issue confirmation",
          "caption": "The original authorized test confirmed the exact invoice. This walkthrough only displays its recorded capture.",
          "src": "assets/staging-approved-invoice-03-exact-confirmed.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "After issue: receivable, zero cash",
          "caption": "Invoice SP-2026-000004 posts $74.63 revenue and receivable; it is not a paid receipt. The $261.38 open total includes $186.75 from a prior unpaid invoice.",
          "src": "assets/staging-fresh-finance-01-issued-no-cash.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Issued invoice on mobile",
          "caption": "The issued state is visible in the processor finance workspace.",
          "src": "assets/staging-fresh-finance-02-issued-mobile.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "After issue: Q-Audit reporting",
          "caption": "Q-Audit reflects the issued obligation separately from collected cash.",
          "src": "assets/staging-fresh-finance-03-qaudit-october.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Actual received invoice PDF",
          "caption": "Qredible’s Processor sponsorship invoice names the bill-to processor, merchant funded cycle, issue/due dates and $74.63 total. The received PDF matched the stored hash. It is not a merchant charge or payment receipt.",
          "src": "assets/staging-received-invoice-SP000004.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. Recorded invoice issue/delivery was explicitly authorized in the original staging run; not replayed here."
          }
        },
        {
          "title": "Configure the invoice recipient",
          "caption": "Processor invoice delivery uses the designated invoice contact. The validation used test recipients only.",
          "src": "assets/089-07-invoice-contact-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review the statement draft",
          "caption": "Review funded cycle lines before issuing an invoice.",
          "src": "assets/090-08-statement-draft-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Preview the invoice",
          "caption": "Inspect the invoice presentation and amounts before committing issuance.",
          "src": "assets/091-09-invoice-preview-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirm issuance",
          "caption": "Issuing is an explicit action, separate from previewing or drafting.",
          "src": "assets/092-23-invoice-issue-confirmation-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Invoice issued in finance",
          "caption": "Issuance posts the receivable and related sponsor accounting; it does not prove that cash has been collected.",
          "src": "assets/093-24-invoice-issued-finance-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review issued totals",
          "caption": "Keep issued, outstanding and paid amounts distinct.",
          "src": "assets/094-25-invoice-issued-totals-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Company-level financial visibility",
          "caption": "The company overview reflects positive sponsor revenue rather than treating the sponsor obligation as negative revenue.",
          "src": "assets/095-35-company-overview-positive-sponsor-revenue-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "invoice",
      "summary": "Invoice the sponsoring processor",
      "terms": [
        "Preview due cycles",
        "DRAFT",
        "Review invoice destination and terms",
        "ISSUED"
      ],
      "configurable": "Configure invoice email and payment terms; preview due cycles, draft, review destination/document, then separately confirm issue. No invoice-template wording editor is shown in Q-Config.",
      "review": "Issue posts revenue/receivable and sends the processor invoice. Cash is recorded separately. The merchant sees their coverage/contribution, not the negotiated processor receivable."
    },
    {
      "title": "Record an invoice payment",
      "audience": "Super admin / finance",
      "route": "Q-Config → invoice → record settlement",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Issued shared-funding invoice",
          "caption": "The shared-cost fixture has its own processor amount; it is not another charge of the full merchant face price.",
          "src": "assets/096-03-promo-split-settled-activated-invoice-posted-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirm external settlement",
          "caption": "An administrator records an externally verified payment with an auditable confirmation.",
          "src": "assets/097-05-promo-split-settled-settlement-confirm-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Settled finance view",
          "caption": "The test uses synthetic settlement. The screen demonstrates cash-versus-receivable visibility, not an observed bank deposit.",
          "src": "assets/098-06-promo-split-settled-settled-finance-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "settlement",
      "summary": "Record an externally verified payment",
      "terms": [
        "Record settlement",
        "Payment reference",
        "Settled"
      ],
      "configurable": "Admins attest an externally verified payment with method, reference, time, amount and audit reason. This is not automatic bank verification.",
      "review": "This chapter is local simulated/admin-attested settlement. Invoice issue alone never means cash collected."
    },
    {
      "title": "Optional processor saved-card collection",
      "audience": "Super admin / finance",
      "route": "Q-Config → issued invoice → processor card payment",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Processor card payment accepted, not settled",
          "caption": "The recorded sandbox card collection was accepted. Cash remained $0 while settlement was pending; acceptance is not collection proof.",
          "src": "assets/staging-13-qconfig-card-invoice-approved-not-settled.jpg",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Check the existing gateway outcome",
          "caption": "The check reads the original payment outcome rather than starting another charge. Later settled examples below use local simulated provider responses.",
          "src": "assets/staging-14-qconfig-card-check-no-new-charge.jpg",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "A draft cannot be charged",
          "caption": "An unissued statement is not a payable processor invoice.",
          "src": "assets/099-34-saved-card-draft-blocked-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Admin confirms a card collection",
          "caption": "This is the configurable alternative to externally paid invoicing, not unattended automatic collection.",
          "src": "assets/100-36-processor-card-confirmation-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Accepted is a separate state",
          "caption": "An accepted request is tracked separately from its settlement outcome.",
          "src": "assets/101-37-processor-card-accepted-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Locally simulated settlement",
          "caption": "The local gateway double completes the scenario. Actual NMI sandbox settlement remains a separate validation step.",
          "src": "assets/102-38-processor-card-settled-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "processor-card",
      "summary": "Collect an issued invoice by card",
      "terms": [
        "Processor-owned card",
        "Accepted",
        "Check gateway outcome",
        "Settled"
      ],
      "configurable": "An admin-confirmed processor card collection applies to an issued invoice using the processor’s payment method. Unattended automatic processor charging is not demonstrated.",
      "review": "The recorded staging payment was accepted and pending settlement. Settled local examples simulate the provider; no bank settlement claim."
    },
    {
      "title": "Correct a recorded payment",
      "audience": "Super admin / finance",
      "route": "Q-Config → invoice → settlement correction history",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Review a payment correction",
          "caption": "These controls record an externally verified reversal or recovery; they do not issue a gateway refund or new charge.",
          "src": "assets/103-39-reversal-review-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirm a partial correction",
          "caption": "The confirmation captures the proposed financial adjustment before posting it.",
          "src": "assets/104-40-partial-correction-confirm-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Partial reversal recorded",
          "caption": "The local example records a $50 reversal without erasing the original payment.",
          "src": "assets/105-41-correction-1-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Partial recovery recorded",
          "caption": "A subsequent $50 recovery is another immutable entry.",
          "src": "assets/106-41-correction-2-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Full reversal recorded",
          "caption": "The complete $149.25 local payment can be reversed in the ledger with its history preserved.",
          "src": "assets/107-41-correction-3-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Full recovery recorded",
          "caption": "Recovery restores the recorded settlement through a new entry rather than changing the invoice revenue.",
          "src": "assets/108-41-correction-4-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Correction history on mobile",
          "caption": "The sequence of recorded corrections remains visible in the responsive finance view.",
          "src": "assets/109-42-correction-history-mobile-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "payment-correction",
      "summary": "Preserve payment correction history",
      "terms": [
        "Partial reversal",
        "Recovery",
        "Full reversal",
        "Audit history"
      ],
      "configurable": "Admins record audited reversals/recoveries against payment history. This is separate from an automatic refund or a new charge.",
      "review": "Original invoice revenue/history remains visible; corrected cash and open receivable are separate values. Full-local evidence only."
    },
    {
      "title": "Issue a supplemental invoice",
      "audience": "Super admin / finance",
      "route": "Q-Config → Sponsorship finance → statement selector",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Select the supplemental statement",
          "caption": "New billable lines can form another statement without mutating the already-issued invoice.",
          "src": "assets/110-39-supplemental-statement-selector-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirm supplemental issuance",
          "caption": "The test issues an additional $74.63 invoice while preserving the original $149.25 invoice.",
          "src": "assets/111-23-invoice-issue-confirmation-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Review the resulting totals",
          "caption": "Separate invoices retain their own issued amounts and audit history.",
          "src": "assets/112-25-invoice-issued-totals-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "supplemental-invoice",
      "summary": "Invoice later due obligations",
      "terms": [
        "Supplemental statement",
        "Issue confirmation"
      ],
      "configurable": "A later statement can invoice eligible obligations after an earlier statement was issued. It does not silently append new items to the already issued document.",
      "review": "These are full-local examples. Review exact statement, amount and destination before issue."
    },
    {
      "title": "Connect merchant, processor and finance views",
      "audience": "Processor + merchant + super admin",
      "route": "Partner Program → Overview; QTrust → Settings; Q-Config → finance",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Processor Partner Program overview",
          "caption": "The processor sees sponsorship offsets and receivables separately from merchant payments and referral amounts.",
          "src": "assets/staging-full-report-01-partner-overview.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Q-Audit issued revenue versus cash",
          "caption": "Historical $149.25 cash in this fixture was a SIMULATED admin settlement attestation, not bank/provider proof.",
          "src": "assets/staging-full-report-02-qaudit-finances.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Inspect processor invoices",
          "caption": "The reporting view preserves invoice detail behind the totals.",
          "src": "assets/staging-full-report-03-qaudit-processor-invoices.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Unpaid balances carry into the next period",
          "caption": "No new October invoice is required for prior unpaid receivables to remain open. Period revenue and cash remain separate.",
          "src": "assets/staging-full-report-04-october-utc-carry-forward.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Merchant row after sponsored enrollment",
          "caption": "The funded badge, merchant amount, referral amount, sponsor offset and open receivable explain different concepts. The partner offset is a displayed value, not automatic payout deduction.",
          "src": "assets/staging-partner-test5-02-detail.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Processor overview after the shared enrollment",
          "caption": "The processor can review merchant and sponsorship financial context in Partner Program. Commission-view offsets are distinct from cash settlement.",
          "src": "assets/122-07-promo-split-settled-partner-program-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "The merchant view of that scenario",
          "caption": "The merchant sees their own accepted subscription terms rather than the processor commercial discount.",
          "src": "assets/123-08-promo-split-settled-merchant-settings-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Partner table header alignment",
          "caption": "The Actions header is captured alongside the other table headers in the actual Partner Program screen.",
          "src": "assets/124-partner-actions-alignment.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "reporting",
      "summary": "See the result across applications",
      "terms": [
        "Qredible revenue issued",
        "Cash collected",
        "Open receivable",
        "Partner-view commission offset"
      ],
      "configurable": "Period/processor selection changes the report. These balances are calculated from posted records; they are not editable terminology fields.",
      "review": "Revenue at invoice issue, cash after verified payment, and partner-view offset describe separate events. Test balances are not production financial results."
    },
    {
      "title": "Enrollment notices and pending handoff",
      "audience": "Super admin / support",
      "route": "Q-Config → merchant sponsorship status",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Received enrollment notice",
          "caption": "Joseph supplied the actual received staging enrollment email. This is external receipt evidence from that dated test, distinct from MailHog examples.",
          "src": "assets/staging-received-enrollment-email.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Received processor invoice email",
          "caption": "The sponsor invoice email is addressed to the designated test recipient. The financial obligation belongs to the processor, not the merchant.",
          "src": "assets/staging-received-invoice-email.png",
          "evidence": {
            "label": "Recorded deployed staging",
            "date": "September 30 – October 1, 2026",
            "note": "Normal members.qrediblestaging.com / config.qrediblestaging.com routes, Playwright Chromium, synthetic test companies and NMI Test Mode; no HTTP mocks. "
          }
        },
        {
          "title": "Enrollment notice status",
          "caption": "The local notice workflow records acceptance; external mailbox receipt is not established by this capture.",
          "src": "assets/125-09-promo-split-settled-merchant-notice-accepted-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Future handoff reminder waiting",
          "caption": "A waiting reminder is visibly different from one already sent. This is not proof that an elapsed real-world billing handoff has completed.",
          "src": "assets/126-10-promo-split-settled-handoff-reminder-waiting-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "notices",
      "summary": "What lands in the inbox",
      "terms": [
        "Enrollment notice",
        "Processor sponsorship invoice",
        "Handoff reminder"
      ],
      "configurable": "Recipients, exact terms and delivery status are recorded. No general sponsorship email-body editor is demonstrated by these Q-Config screens.",
      "review": "Received staging messages and local MailHog screenshots are labeled separately. A waiting reminder is not a sent notice or an executed renewal."
    },
    {
      "title": "Promo codes, checkout and dismissal",
      "audience": "Merchant",
      "route": "QTrust → paywall → promo → checkout",
      "boundary": "Earlier local paywall checkpoint · September 18. Actual application routes; synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Invalid promo feedback",
          "caption": "A rejected code produces validation feedback without completing a subscription.",
          "src": "assets/023-16-invalid-promo.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Annual promo applied",
          "caption": "A valid promotional state is displayed inside the refined annual card.",
          "src": "assets/024-44-qtrust-reference-card-promo-annual.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Native checkout handoff",
          "caption": "The purchase button uses the native checkout flow; a screenshot does not prove gateway settlement.",
          "src": "assets/025-45-qtrust-reference-native-checkout.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Required checkout fields",
          "caption": "Incomplete checkout is blocked by field validation.",
          "src": "assets/026-18-checkout-required-fields.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Optional enrollment can be closed",
          "caption": "Voluntary enrollment exposes the dismiss control; required enrollment does not.",
          "src": "assets/027-37-qtrust-custom-optional-close.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        },
        {
          "title": "Return to the dashboard",
          "caption": "Closing an optional paywall returns the merchant to the application.",
          "src": "assets/028-46-qtrust-optional-dismissed.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "September 18, 2026",
            "note": "Actual paywall/Q-Config application routes with synthetic prices and outbound payments blocked. Older design checkpoint."
          }
        }
      ],
      "id": "ordinary-checkout",
      "summary": "Ordinary promo and checkout reference",
      "terms": [
        "Promo code",
        "Start Subscription",
        "Required fields"
      ],
      "configurable": "The paywall design is configurable. Ordinary promo behavior and sponsorship redemption are different journeys.",
      "review": "Earlier local reference screens illustrate entry/dismissal and required fields. No new purchase is performed for this walkthrough."
    },
    {
      "title": "Administrator cancellation and pre-start withdrawal",
      "audience": "Super admin + merchant",
      "route": "Q-Config → active grant; QTrust → scheduled sponsorship",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Review the active grant",
          "caption": "An administrator can inspect the merchant sponsorship before taking a cancellation action.",
          "src": "assets/117-28-admin-active-grant-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Confirm an admin cancellation",
          "caption": "The explicit confirmation records the administrative action rather than silently editing the agreement.",
          "src": "assets/118-29-admin-cancel-confirmation-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        },
        {
          "title": "Cancelled grant retained",
          "caption": "The cancelled grant remains part of the company history.",
          "src": "assets/119-30-admin-cancelled-grant-local.png",
          "evidence": {
            "label": "Full local application",
            "date": "September 26–28, 2026",
            "note": "Actual normal application routes with isolated test fixtures. NMI responses/callbacks simulated; MailHog is local email capture. No bank settlement proof."
          }
        }
      ],
      "id": "admin-cancel",
      "summary": "Admin reviews cancellation",
      "terms": [
        "Active grant",
        "Cancel",
        "Audit reason",
        "Cancelled"
      ],
      "configurable": "Admins confirm a scoped cancellation and record an audit reason. The cancelled record remains available for review.",
      "review": "Agreement pause and merchant cancellation are different actions. Local examples do not certify a newly executed provider cancellation."
    },
    {
      "title": "Related pricing-rule configuration",
      "audience": "Super admin",
      "route": "Q-Config → Pricing rules",
      "boundary": "Earlier QP-4705 local application checkpoint (port 3705). Different fixture and feature checkpoint. NOT screenshot proof of the new existing-subscriber $199 → $175 notice/schedule/retract journey.",
      "slides": [
        {
          "title": "Pricing rules overview",
          "caption": "Related configuration shows how rules are listed. A rule used for future quotes is not itself a recurring subscription change.",
          "src": "assets/127-01-pricing-rules-page-light.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "Earlier QP-4705 checkpoint",
            "note": "Earlier QP-4705 local application checkpoint (port 3705). Different fixture and feature checkpoint. NOT screenshot proof of the new existing-subscriber $199 → $175 notice/schedule/retract journey."
          }
        },
        {
          "title": "Flat-price configuration",
          "caption": "This earlier fixture uses a different price and company; it should not be read as a $175 WestTown change.",
          "src": "assets/128-05-modal-flat-price-light.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "Earlier QP-4705 checkpoint",
            "note": "Earlier QP-4705 local application checkpoint (port 3705). Different fixture and feature checkpoint. NOT screenshot proof of the new existing-subscriber $199 → $175 notice/schedule/retract journey."
          }
        },
        {
          "title": "Edit an existing pricing rule",
          "caption": "The related editing surface illustrates rule maintenance, not the later notification and gateway scheduling workflow.",
          "src": "assets/129-11-modal-edit-flat-price-light.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "Earlier QP-4705 checkpoint",
            "note": "Earlier QP-4705 local application checkpoint (port 3705). Different fixture and feature checkpoint. NOT screenshot proof of the new existing-subscriber $199 → $175 notice/schedule/retract journey."
          }
        },
        {
          "title": "Deactivate a pricing rule",
          "caption": "Rule activation state is separate from correcting or cancelling an already-scheduled subscriber price change.",
          "src": "assets/130-09-pricing-rules-page-deactivated-light.png",
          "evidence": {
            "label": "Earlier local application",
            "date": "Earlier QP-4705 checkpoint",
            "note": "Earlier QP-4705 local application checkpoint (port 3705). Different fixture and feature checkpoint. NOT screenshot proof of the new existing-subscriber $199 → $175 notice/schedule/retract journey."
          }
        }
      ],
      "id": "pricing-reference",
      "summary": "Related pricing configuration",
      "terms": [
        "Pricing rules",
        "Flat price",
        "Deactivate"
      ],
      "configurable": "Pricing rules change eligible quote inputs. Paywall text editing alone does not change a price, and a sponsorship program controls payer allocation separately.",
      "review": "Earlier QP-4705 local reference, not proof of an existing-subscriber price-change notice/schedule flow."
    }
  ],
  "coverage": "Fresh October 14 Q-Config configuration/copy review; dated September 30–October 1 deployed staging merchant, invoice and reporting captures; earlier full-local application captures for additional lifecycle stages. Every slide states its environment. No financial action was repeated to assemble this walkthrough. Current merchant billing, bank settlement, future elapsed renewals and production behavior were not revalidated.",
  "sources": [
    [
      "QP-4802",
      "https://qredible.atlassian.net/browse/QP-4802"
    ],
    [
      "RTQ API · 2754",
      "https://github.com/qredible/RTQ-Admin-API/pull/2754"
    ],
    [
      "Merchant UI · 3962",
      "https://github.com/qredible/RTQ-Admin-UI/pull/3962"
    ],
    [
      "Q-Config API · 120",
      "https://github.com/qredible/qredible_services_api/pull/120"
    ],
    [
      "Q-Config UI · 112",
      "https://github.com/qredible/qredible_services_ui/pull/112"
    ],
    [
      "Middleware · 881",
      "https://github.com/qredible/Middleware/pull/881"
    ],
    [
      "Dated staging evidence · 2804",
      "https://github.com/qredible/RTQ-Admin-API/pull/2804"
    ]
  ]
};
