window.JOURNEYS = {
  "title": "MyCOA & sponsorship — journey review",
  "assembled": "2026-09-28",
  "total": 140,
  "chapters": [
    {
      "title": "The merchant paywall",
      "audience": "Merchant",
      "route": "QTrust → required paywall",
      "boundary": "Earlier local paywall checkpoint · September 18. Actual application routes; synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Required paywall, compact desktop",
          "caption": "The refined one-plan card sits inside the processor layout. Required enrollment has no dismiss action.",
          "src": "assets/001-47-qtrust-reference-required-1280x720.png"
        },
        {
          "title": "Switch to annual",
          "caption": "The native billing period and price update inside the custom card; presentation does not replace billing logic.",
          "src": "assets/002-43-qtrust-reference-card-annual.png"
        },
        {
          "title": "The same offer on mobile",
          "caption": "Review the responsive card and surrounding content at a 390px viewport.",
          "src": "assets/003-50-qtrust-reference-mobile-390x844.png"
        },
        {
          "title": "Global default without WestTown branding",
          "caption": "The global layout is independently configurable. This is a Q-Config preview of the neutral alternative, not a WestTown merchant screen.",
          "src": "assets/004-52-qconfig-global-neutral-preview.png"
        },
        {
          "title": "Global annual alternative",
          "caption": "The neutral default also supports annual pricing; fixture amounts should not be treated as a production rate card.",
          "src": "assets/005-53-qconfig-global-neutral-annual-preview.png"
        }
      ]
    },
    {
      "title": "Configure the overall layout",
      "audience": "Super admin",
      "route": "Q-Config → Invite Configuration → Paywall layout",
      "boundary": "Earlier local paywall checkpoint · September 18. Actual application routes; synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Global layout configuration",
          "caption": "Set the shared paywall presentation that applies when no processor-specific override is selected.",
          "src": "assets/006-02-global-layout-saved.png"
        },
        {
          "title": "Processor-specific layout",
          "caption": "Preview a processor override independently of the global default.",
          "src": "assets/007-03-processor-layout-preview.png"
        },
        {
          "title": "Edit the presentation visually",
          "caption": "The rich-text editor controls explanatory content and layout around required native controls.",
          "src": "assets/008-04-tinymce-visual-editor.png"
        },
        {
          "title": "Edit the HTML source",
          "caption": "Source mode exposes the layout markup for a more precise design.",
          "src": "assets/009-05-tinymce-source-code.png"
        },
        {
          "title": "Invalid token is blocked",
          "caption": "Required and unsupported token checks prevent saving a layout that cannot render its required controls.",
          "src": "assets/010-01-invalid-token-save-blocked.png"
        }
      ]
    },
    {
      "title": "Override one or multiple plan cards",
      "audience": "Super admin",
      "route": "Q-Config → processor/global Paywall layout → Plan cards",
      "boundary": "Earlier local paywall checkpoint · September 18. Actual application routes; synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Choose original or custom card",
          "caption": "A card can retain the original per-plan presentation or use an override in the paywall layout configuration.",
          "src": "assets/011-35-qconfig-original-card-override.png"
        },
        {
          "title": "Custom plan-card editor",
          "caption": "Configure the chosen plan card independently of the outer paywall layout.",
          "src": "assets/012-36-qconfig-card-editor.png"
        },
        {
          "title": "Full card source",
          "caption": "HTML controls the card presentation; native price, period and purchase slots keep the existing application behavior.",
          "src": "assets/013-51-qconfig-plan-card-source.png"
        },
        {
          "title": "Required billing token validation",
          "caption": "Invalid card content is rejected instead of silently breaking the purchase controls.",
          "src": "assets/014-40-qconfig-billing-token-validation.png"
        },
        {
          "title": "Preview the refined card",
          "caption": "The reference design combines the plan title, billing period, price, activation action and concise benefits.",
          "src": "assets/015-41-qconfig-reference-card-preview.png"
        },
        {
          "title": "Multiple custom cards in QTrust",
          "caption": "Each eligible plan can have its own custom card; the layout is not restricted to one plan.",
          "src": "assets/016-34-qtrust-multiple-custom-cards.png"
        },
        {
          "title": "Mix native and custom cards",
          "caption": "Unmodified cards and overridden cards can appear together in the same paywall.",
          "src": "assets/017-33-qtrust-multiple-native-custom-cards.png"
        }
      ]
    },
    {
      "title": "Highlight annual savings",
      "audience": "Super admin + merchant",
      "route": "Q-Config → annual savings controls; QTrust → paywall",
      "boundary": "Earlier local paywall checkpoint · September 18. Actual application routes; synthetic prices and blocked outbound payments. This is not a fresh staging validation.",
      "slides": [
        {
          "title": "Configure savings messaging",
          "caption": "Control the savings presentation rather than hard-coding promotional prices into the HTML.",
          "src": "assets/018-54-qconfig-annual-savings-controls.png"
        },
        {
          "title": "Preview savings copy",
          "caption": "The preview shows the selected savings display using the configured monthly and annual prices.",
          "src": "assets/019-55-qconfig-annual-savings-preview.png"
        },
        {
          "title": "Annual savings in the application",
          "caption": "The merchant sees the annual price and its savings alongside the purchase action.",
          "src": "assets/020-56-qtrust-annual-savings.png"
        },
        {
          "title": "Savings on mobile",
          "caption": "The annual value proposition remains part of the responsive card.",
          "src": "assets/021-57-qtrust-annual-savings-mobile.png"
        },
        {
          "title": "Continue to native checkout",
          "caption": "The customized savings presentation hands off to the existing purchase workflow.",
          "src": "assets/022-58-qtrust-annual-savings-checkout-entry.png"
        }
      ]
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
          "src": "assets/023-16-invalid-promo.png"
        },
        {
          "title": "Annual promo applied",
          "caption": "A valid promotional state is displayed inside the refined annual card.",
          "src": "assets/024-44-qtrust-reference-card-promo-annual.png"
        },
        {
          "title": "Native checkout handoff",
          "caption": "The purchase button uses the native checkout flow; a screenshot does not prove gateway settlement.",
          "src": "assets/025-45-qtrust-reference-native-checkout.png"
        },
        {
          "title": "Required checkout fields",
          "caption": "Incomplete checkout is blocked by field validation.",
          "src": "assets/026-18-checkout-required-fields.png"
        },
        {
          "title": "Optional enrollment can be closed",
          "caption": "Voluntary enrollment exposes the dismiss control; required enrollment does not.",
          "src": "assets/027-37-qtrust-custom-optional-close.png"
        },
        {
          "title": "Return to the dashboard",
          "caption": "Closing an optional paywall returns the merchant to the application.",
          "src": "assets/028-46-qtrust-optional-dismissed.png"
        }
      ]
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
          "src": "assets/029-01-company-sponsorship-tab.png"
        },
        {
          "title": "Preview the funded amount",
          "caption": "The illustrated $199 face price with a separate 25% commercial discount yields a $149.25 fully funded processor amount.",
          "src": "assets/030-02-westtown-149-25-preview.png"
        },
        {
          "title": "Save a draft",
          "caption": "Saving configuration alone does not enroll a merchant or create a charge.",
          "src": "assets/031-03-saved-draft-only.png"
        },
        {
          "title": "Review a versioned edit",
          "caption": "Agreement versions preserve a record of changes instead of rewriting financial history.",
          "src": "assets/032-04-versioned-draft-edit.png"
        },
        {
          "title": "Configure a shared allocation",
          "caption": "Merchant and processor shares are configurable. A 50/50 split is one example, not a fixed model.",
          "src": "assets/033-33-split-draft-preview-local.png"
        },
        {
          "title": "Confirm activation",
          "caption": "Activation is a separate administrative decision after reviewing the draft.",
          "src": "assets/034-19-agreement-activation-confirmation-local.png"
        },
        {
          "title": "Active agreement, no merchant grant",
          "caption": "An active processor agreement does not itself create merchant subscriptions.",
          "src": "assets/035-17-active-agreement-no-grant-local.png"
        },
        {
          "title": "Pause the agreement",
          "caption": "Pause controls future enrollment without treating configuration changes as merchant cancellation.",
          "src": "assets/036-18-paused-agreement-local.png"
        }
      ]
    },
    {
      "title": "Assign an offer without a promo code",
      "audience": "Super admin",
      "route": "Q-Config → Companies → Sponsorship offers",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Assign an offer to a merchant",
          "caption": "An administrator can grant a pending offer without requiring a manually entered promo code.",
          "src": "assets/037-14-sponsor-offer-pending-local.png"
        },
        {
          "title": "Prevent unsafe offer edits",
          "caption": "The UI refuses an edit that would conflict with the offer lifecycle.",
          "src": "assets/038-16-sponsor-offer-edit-blocked-local.png"
        },
        {
          "title": "Revoke a pending offer",
          "caption": "An unused offer can be withdrawn without inventing a subscription or charge.",
          "src": "assets/039-15-sponsor-offer-revoked-local.png"
        },
        {
          "title": "Assign before signup",
          "caption": "A pre-join offer can exist before merchant activation; the merchant still must complete the enrollment steps.",
          "src": "assets/040-26-prejoin-offer-pending-local.png"
        },
        {
          "title": "Revoke before signup",
          "caption": "The pending pre-join offer can also be withdrawn.",
          "src": "assets/041-27-prejoin-offer-revoked-local.png"
        }
      ]
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
          "src": "assets/042-11-sponsor-promo-draft-local.png"
        },
        {
          "title": "Review the released promotion",
          "caption": "Review promotion configuration before enabling merchant use.",
          "src": "assets/043-12-sponsor-promo-released-local.png"
        },
        {
          "title": "Confirm promo activation",
          "caption": "Activation is explicit rather than a side effect of drafting the code.",
          "src": "assets/044-20-promo-activation-confirmation-local.png"
        },
        {
          "title": "Active code, no enrollment yet",
          "caption": "A published code does not charge or enroll anyone by itself.",
          "src": "assets/045-21-active-sponsor-code-no-grant-local.png"
        },
        {
          "title": "Pause the promotion",
          "caption": "The code can be paused independently of already-recorded financial history.",
          "src": "assets/046-22-paused-sponsor-code-local.png"
        }
      ]
    },
    {
      "title": "New merchant: fully funded activation",
      "audience": "Merchant",
      "route": "QTrust → paywall → sponsorship consent → Settings",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Enter the sponsored offer",
          "caption": "The merchant reaches the paywall with the sponsorship promotion available.",
          "src": "assets/047-merchant-activation-offer-paywall-promo-local.png"
        },
        {
          "title": "Review funded cycles and handoff",
          "caption": "The merchant reviews the offer and authorizes a payment method for the later merchant-paid subscription.",
          "src": "assets/048-merchant-activation-consent-promo-local.png"
        },
        {
          "title": "Consent on mobile",
          "caption": "The same consent journey is available on a narrow screen.",
          "src": "assets/049-merchant-activation-consent-mobile-promo-local.png"
        },
        {
          "title": "Confirmed coverage in Settings",
          "caption": "Settings displays the accepted sponsorship and later billing information.",
          "src": "assets/050-merchant-activation-confirmed-settings-promo-local.png"
        },
        {
          "title": "Coverage status on mobile",
          "caption": "The resulting status can be reviewed without returning to the paywall.",
          "src": "assets/051-merchant-activation-confirmed-status-mobile-promo-local.png"
        },
        {
          "title": "Enrollment notice captured locally",
          "caption": "This is the local MailHog message capture, not proof of delivery to an external mailbox.",
          "src": "assets/052-merchant-enrollment-mailhog-promo-local.png"
        }
      ]
    },
    {
      "title": "New merchant: shared-cost activation",
      "audience": "Merchant",
      "route": "QTrust → sponsored offer → checkout → Settings",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "A shared-cost offer",
          "caption": "A 50/50 offer is presented before the merchant confirms payment.",
          "src": "assets/053-merchant-activation-offer-paywall-promo-split-local.png"
        },
        {
          "title": "Confirm the merchant share",
          "caption": "In the illustrated $199 example the merchant share is $99.50 at activation; processor economics are calculated separately.",
          "src": "assets/054-merchant-activation-consent-promo-split-local.png"
        },
        {
          "title": "Shared consent on mobile",
          "caption": "Review the same terms and payment consent in the mobile layout.",
          "src": "assets/055-merchant-activation-consent-mobile-promo-split-local.png"
        },
        {
          "title": "Shared subscription confirmed locally",
          "caption": "The local provider double accepted the activation path. This is not evidence of a real card charge.",
          "src": "assets/056-merchant-activation-confirmed-settings-promo-split-local.png"
        },
        {
          "title": "Shared enrollment notice",
          "caption": "The local email records the enrolled offer and its billing terms.",
          "src": "assets/057-merchant-enrollment-mailhog-promo-split-local.png"
        },
        {
          "title": "Annual enrollment during sponsorship is refused",
          "caption": "Funded cycles are monthly. Annual billing is handled at the merchant-paid transition instead.",
          "src": "assets/058-merchant-annual-offer-refusal-local.png"
        }
      ]
    },
    {
      "title": "Already paying: next unpaid renewal",
      "audience": "Merchant",
      "route": "QTrust → Settings → accept assigned sponsorship",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "An offer on an existing subscription",
          "caption": "An already-paying merchant can see an administrator-assigned offer in Settings.",
          "src": "assets/059-merchant-paid-offer-admin-settings-local.png"
        },
        {
          "title": "Review when the change begins",
          "caption": "The share starts at the next unpaid renewal, not as another charge for the current paid cycle.",
          "src": "assets/060-merchant-paid-offer-admin-consent-local.png"
        },
        {
          "title": "Review on mobile",
          "caption": "The consent screen also exposes the terms on a narrow screen.",
          "src": "assets/061-merchant-paid-offer-admin-consent-mobile-local.png"
        },
        {
          "title": "Sponsorship scheduled",
          "caption": "The existing paid period is preserved while the new funded period is scheduled.",
          "src": "assets/062-merchant-paid-offer-admin-scheduled-local.png"
        },
        {
          "title": "Scheduled-offer notice",
          "caption": "The local notification records the accepted future arrangement.",
          "src": "assets/063-merchant-paid-offer-admin-mailhog-local.png"
        }
      ]
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
          "src": "assets/064-merchant-paid-offer-promo-consent-local.png"
        },
        {
          "title": "80/20 scheduled",
          "caption": "The selected allocation is scheduled for the next unpaid cycle.",
          "src": "assets/065-merchant-paid-offer-promo-scheduled-local.png"
        },
        {
          "title": "75% sponsor / 25% merchant",
          "caption": "The merchant share is $49.75 on a $199 face price in this separate test configuration.",
          "src": "assets/066-merchant-paid-offer-promo-consent-local.png"
        },
        {
          "title": "75/25 scheduled",
          "caption": "This is a different run, illustrating configurability rather than a change to the preceding merchant.",
          "src": "assets/067-merchant-paid-offer-promo-scheduled-local.png"
        },
        {
          "title": "Annual handoff comparison available",
          "caption": "Eligible annual pricing can be compared for the post-sponsorship period.",
          "src": "assets/068-annual-comparison-desktop-local.png"
        },
        {
          "title": "No eligible annual alternative",
          "caption": "The UI also handles the case where an annual comparison cannot be offered.",
          "src": "assets/069-annual-comparison-desktop-local.png"
        }
      ]
    },
    {
      "title": "Choose annual at the billing handoff",
      "audience": "Merchant + super admin",
      "route": "QTrust → Settings → renewal choice; Q-Config → company",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Review the annual transition",
          "caption": "Annual billing is chosen for the merchant-paid handoff, not for the funded monthly cycles.",
          "src": "assets/070-01-annual-consent-desktop.png"
        },
        {
          "title": "Annual consent controls on mobile",
          "caption": "The mobile view keeps the confirmation controls available.",
          "src": "assets/071-02b-annual-consent-mobile-controls.png"
        },
        {
          "title": "An uncertain provider response",
          "caption": "A simulated lost response is shown as pending, not falsely reported as confirmed.",
          "src": "assets/072-03-uncertain-gateway-pending.png"
        },
        {
          "title": "Recovery with enrollment disabled",
          "caption": "Existing pending work can be reconciled while new enrollment is switched off.",
          "src": "assets/073-03b-recovery-with-enrollment-off.png"
        },
        {
          "title": "Annual selection confirmed locally",
          "caption": "The local test recovered the provider result and confirmed the future annual choice.",
          "src": "assets/074-04-annual-confirmed.png"
        },
        {
          "title": "Settings reflects the future choice",
          "caption": "The saved future billing preference remains visible to the merchant.",
          "src": "assets/075-05-annual-settings.png"
        },
        {
          "title": "Annual confirmation notice",
          "caption": "Local email capture records the confirmed choice.",
          "src": "assets/076-06-annual-confirmation-mailhog.png"
        },
        {
          "title": "Return to monthly",
          "caption": "The merchant can also confirm a return to monthly under the supported transition rules.",
          "src": "assets/077-07-monthly-return-confirmed.png"
        }
      ]
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
          "src": "assets/078-01-admin-allocation-preview-desktop.png"
        },
        {
          "title": "Current-cycle change is refused",
          "caption": "Current and already-issued financial records are not rewritten by a prospective amendment.",
          "src": "assets/079-03-current-cycle-refused.png"
        },
        {
          "title": "Withdraw a proposed change",
          "caption": "A proposal can be withdrawn before it takes effect.",
          "src": "assets/080-01-withdrawn-proposal.png"
        },
        {
          "title": "Merchant reviews a 50% share",
          "caption": "Increasing the merchant obligation requires explicit consent to the new terms.",
          "src": "assets/081-02-merchant-consent-50.png"
        },
        {
          "title": "Amendment consent on mobile",
          "caption": "The mobile consent surface shows the same proposed change.",
          "src": "assets/082-03-merchant-consent-mobile.png"
        },
        {
          "title": "Uncertain creation is fenced",
          "caption": "A simulated uncertain gateway response cannot be treated as a completed schedule change.",
          "src": "assets/083-04-uncertain-create.png"
        },
        {
          "title": "Admin sees the confirmed 50% change",
          "caption": "The confirmed version and future allocation are visible after reconciliation.",
          "src": "assets/084-05-admin-confirmed-50.png"
        },
        {
          "title": "Review a later 20% share",
          "caption": "A subsequent proposal demonstrates another configurable allocation.",
          "src": "assets/085-02-merchant-consent-20.png"
        },
        {
          "title": "Confirmed 20% share",
          "caption": "The new confirmed version is recorded without replacing the earlier consent history.",
          "src": "assets/086-05-admin-confirmed-20.png"
        },
        {
          "title": "Return to fully funded",
          "caption": "A later confirmed amendment can restore a zero merchant share.",
          "src": "assets/087-05-admin-confirmed-0.png"
        },
        {
          "title": "Version history on mobile",
          "caption": "The administrative history remains reviewable on smaller screens.",
          "src": "assets/088-06-admin-history-mobile.png"
        }
      ]
    },
    {
      "title": "Issue the processor invoice",
      "audience": "Super admin / finance",
      "route": "Q-Config → company → Sponsorship finance",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Configure the invoice recipient",
          "caption": "Processor invoice delivery uses the designated invoice contact. The validation used test recipients only.",
          "src": "assets/089-07-invoice-contact-local.png"
        },
        {
          "title": "Review the statement draft",
          "caption": "Review funded cycle lines before issuing an invoice.",
          "src": "assets/090-08-statement-draft-local.png"
        },
        {
          "title": "Preview the invoice",
          "caption": "Inspect the invoice presentation and amounts before committing issuance.",
          "src": "assets/091-09-invoice-preview-local.png"
        },
        {
          "title": "Confirm issuance",
          "caption": "Issuing is an explicit action, separate from previewing or drafting.",
          "src": "assets/092-23-invoice-issue-confirmation-local.png"
        },
        {
          "title": "Invoice issued in finance",
          "caption": "Issuance posts the receivable and related sponsor accounting; it does not prove that cash has been collected.",
          "src": "assets/093-24-invoice-issued-finance-local.png"
        },
        {
          "title": "Review issued totals",
          "caption": "Keep issued, outstanding and paid amounts distinct.",
          "src": "assets/094-25-invoice-issued-totals-local.png"
        },
        {
          "title": "Company-level financial visibility",
          "caption": "The company overview reflects positive sponsor revenue rather than treating the sponsor obligation as negative revenue.",
          "src": "assets/095-35-company-overview-positive-sponsor-revenue-local.png"
        }
      ]
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
          "src": "assets/096-03-promo-split-settled-activated-invoice-posted-local.png"
        },
        {
          "title": "Confirm external settlement",
          "caption": "An administrator records an externally verified payment with an auditable confirmation.",
          "src": "assets/097-05-promo-split-settled-settlement-confirm-local.png"
        },
        {
          "title": "Settled finance view",
          "caption": "The test uses synthetic settlement. The screen demonstrates cash-versus-receivable visibility, not an observed bank deposit.",
          "src": "assets/098-06-promo-split-settled-settled-finance-local.png"
        }
      ]
    },
    {
      "title": "Optional processor saved-card collection",
      "audience": "Super admin / finance",
      "route": "Q-Config → issued invoice → processor card payment",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "A draft cannot be charged",
          "caption": "An unissued statement is not a payable processor invoice.",
          "src": "assets/099-34-saved-card-draft-blocked-local.png"
        },
        {
          "title": "Admin confirms a card collection",
          "caption": "This is the configurable alternative to externally paid invoicing, not unattended automatic collection.",
          "src": "assets/100-36-processor-card-confirmation-local.png"
        },
        {
          "title": "Accepted is a separate state",
          "caption": "An accepted request is tracked separately from its settlement outcome.",
          "src": "assets/101-37-processor-card-accepted-local.png"
        },
        {
          "title": "Locally simulated settlement",
          "caption": "The local gateway double completes the scenario. Actual NMI sandbox settlement remains a separate validation step.",
          "src": "assets/102-38-processor-card-settled-local.png"
        }
      ]
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
          "src": "assets/103-39-reversal-review-local.png"
        },
        {
          "title": "Confirm a partial correction",
          "caption": "The confirmation captures the proposed financial adjustment before posting it.",
          "src": "assets/104-40-partial-correction-confirm-local.png"
        },
        {
          "title": "Partial reversal recorded",
          "caption": "The local example records a $50 reversal without erasing the original payment.",
          "src": "assets/105-41-correction-1-local.png"
        },
        {
          "title": "Partial recovery recorded",
          "caption": "A subsequent $50 recovery is another immutable entry.",
          "src": "assets/106-41-correction-2-local.png"
        },
        {
          "title": "Full reversal recorded",
          "caption": "The complete $149.25 local payment can be reversed in the ledger with its history preserved.",
          "src": "assets/107-41-correction-3-local.png"
        },
        {
          "title": "Full recovery recorded",
          "caption": "Recovery restores the recorded settlement through a new entry rather than changing the invoice revenue.",
          "src": "assets/108-41-correction-4-local.png"
        },
        {
          "title": "Correction history on mobile",
          "caption": "The sequence of recorded corrections remains visible in the responsive finance view.",
          "src": "assets/109-42-correction-history-mobile-local.png"
        }
      ]
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
          "src": "assets/110-39-supplemental-statement-selector-local.png"
        },
        {
          "title": "Confirm supplemental issuance",
          "caption": "The test issues an additional $74.63 invoice while preserving the original $149.25 invoice.",
          "src": "assets/111-23-invoice-issue-confirmation-local.png"
        },
        {
          "title": "Review the resulting totals",
          "caption": "Separate invoices retain their own issued amounts and audit history.",
          "src": "assets/112-25-invoice-issued-totals-local.png"
        }
      ]
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
          "src": "assets/113-merchant-cancellation-settings-local.png"
        },
        {
          "title": "Explain the cancellation effect",
          "caption": "Access continues through the current funded cycle. Future unstarted sponsor cycles are voided; issued invoices remain intact.",
          "src": "assets/114-merchant-cancellation-confirm-local.png"
        },
        {
          "title": "Cancellation consent on mobile",
          "caption": "The same confirmation and consequences are exposed on the mobile screen.",
          "src": "assets/115-merchant-cancellation-confirm-mobile-local.png"
        },
        {
          "title": "Confirmed cancellation state",
          "caption": "The resulting state is visible after the locally simulated recurring-schedule cancellation.",
          "src": "assets/116-merchant-cancellation-confirmed-mobile-local.png"
        }
      ]
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
          "src": "assets/117-28-admin-active-grant-local.png"
        },
        {
          "title": "Confirm an admin cancellation",
          "caption": "The explicit confirmation records the administrative action rather than silently editing the agreement.",
          "src": "assets/118-29-admin-cancel-confirmation-local.png"
        },
        {
          "title": "Cancelled grant retained",
          "caption": "The cancelled grant remains part of the company history.",
          "src": "assets/119-30-admin-cancelled-grant-local.png"
        }
      ]
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
          "src": "assets/120-merchant-paid-offer-admin-cancel-confirm-local.png"
        },
        {
          "title": "Original subscription preserved",
          "caption": "The local test confirms cancellation of the future contribution schedule and preservation/restoration of the original recurring arrangement.",
          "src": "assets/121-merchant-paid-offer-admin-cancelled-local.png"
        }
      ]
    },
    {
      "title": "Connect merchant, processor and finance views",
      "audience": "Processor + merchant + super admin",
      "route": "Partner Program → Overview; QTrust → Settings; Q-Config → finance",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Processor overview after the shared enrollment",
          "caption": "The processor can review merchant and sponsorship financial context in Partner Program. Commission-view offsets are distinct from cash settlement.",
          "src": "assets/122-07-promo-split-settled-partner-program-local.png"
        },
        {
          "title": "The merchant view of that scenario",
          "caption": "The merchant sees their own accepted subscription terms rather than the processor commercial discount.",
          "src": "assets/123-08-promo-split-settled-merchant-settings-local.png"
        },
        {
          "title": "Partner table header alignment",
          "caption": "The Actions header is captured alongside the other table headers in the actual Partner Program screen.",
          "src": "assets/124-partner-actions-alignment.png"
        }
      ]
    },
    {
      "title": "Enrollment notices and pending handoff",
      "audience": "Super admin / support",
      "route": "Q-Config → merchant sponsorship status",
      "boundary": "Local application validation · September 26–28 checkpoints. Isolated test data; gateway responses/callbacks simulated where used. MailHog captures are local delivery, not external mailbox proof.",
      "slides": [
        {
          "title": "Enrollment notice status",
          "caption": "The local notice workflow records acceptance; external mailbox receipt is not established by this capture.",
          "src": "assets/125-09-promo-split-settled-merchant-notice-accepted-local.png"
        },
        {
          "title": "Future handoff reminder waiting",
          "caption": "A waiting reminder is visibly different from one already sent. This is not proof that an elapsed real-world billing handoff has completed.",
          "src": "assets/126-10-promo-split-settled-handoff-reminder-waiting-local.png"
        }
      ]
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
          "src": "assets/127-01-pricing-rules-page-light.png"
        },
        {
          "title": "Flat-price configuration",
          "caption": "This earlier fixture uses a different price and company; it should not be read as a $175 WestTown change.",
          "src": "assets/128-05-modal-flat-price-light.png"
        },
        {
          "title": "Edit an existing pricing rule",
          "caption": "The related editing surface illustrates rule maintenance, not the later notification and gateway scheduling workflow.",
          "src": "assets/129-11-modal-edit-flat-price-light.png"
        },
        {
          "title": "Deactivate a pricing rule",
          "caption": "Rule activation state is separate from correcting or cancelling an already-scheduled subscriber price change.",
          "src": "assets/130-09-pricing-rules-page-deactivated-light.png"
        }
      ]
    },
    {
      "title": "NEW: Central Sponsorships home",
      "audience": "Super admin",
      "route": "Q-Config → Sponsorships",
      "boundary": "Current local full-application setup validation. Q-Config 4317 → Q-Config API 5628 → RTQ API 5619 → isolated MySQL. No API route mocks. This journey did not charge, enroll, issue invoices or send email.",
      "slides": [
        {
          "title": "One home for sponsorships",
          "caption": "Choose the sponsoring processor without opening a merchant modal.",
          "src": "assets/131-01-sponsorship-home.png"
        },
        {
          "title": "Create a reusable program",
          "caption": "Configure eligible plans, duration, merchant share and processor commercial rate once.",
          "src": "assets/132-02-program-terms.png"
        },
        {
          "title": "Review program terms",
          "caption": "Each processor can have reusable programs; saving a draft does not enroll merchants.",
          "src": "assets/133-03-saved-program.png"
        },
        {
          "title": "Preview exact dollar amounts",
          "caption": "Choose a merchant for a read-only quote. This fixture uses a $79 plan and shows $59.25 sponsor cost after its 25% commercial discount; amounts come from the chosen plan and rules.",
          "src": "assets/134-03b-exact-merchant-price-preview.png"
        },
        {
          "title": "Review merchant offers",
          "caption": "Selected merchants are shown before confirmation. Preparing offers does not activate subscriptions or send invitations.",
          "src": "assets/135-04-review-selected-merchants.png"
        },
        {
          "title": "See who is in the program",
          "caption": "Pending offers are separate from enrollments. Search the roster, add merchants or manage a pending offer.",
          "src": "assets/136-05-program-merchant-roster.png"
        },
        {
          "title": "Program-specific promo controls",
          "caption": "Link and manage sponsorship codes separately from individual merchant assignment. This change does not add a company allowlist to codes.",
          "src": "assets/137-06-program-promo-codes.png"
        },
        {
          "title": "Processor-wide invoices",
          "caption": "The invoice workspace is separate and includes the processor’s programs, not just one merchant.",
          "src": "assets/138-07-processor-invoice-workspace.png"
        },
        {
          "title": "Responsive program workspace",
          "caption": "The page fits the mobile content area; tabs can be scrolled horizontally. The shared app header remains the existing Q-Config header.",
          "src": "assets/139-08-program-home-mobile.png"
        },
        {
          "title": "Simplified merchant modal",
          "caption": "The merchant modal retains that merchant’s coverage and actions, with a link to Sponsorships. Program creation and processor invoices have moved out.",
          "src": "assets/140-09-merchant-participation-only.png"
        }
      ]
    }
  ],
  "coverage": "This collection assembles existing actual-application captures; it is not a new end-to-end run. Current existing-subscriber repricing screens ($199 to $175: notice preview, scheduling, cancellation and notice history) were not located in the evidence set and are not represented as proven here. Gateway settlement, real external email delivery, deployed staging behavior and a real elapsed billing handoff remain separate validation items."
};
