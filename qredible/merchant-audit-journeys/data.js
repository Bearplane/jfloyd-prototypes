window.JOURNEYS = {
  "assembled": "2026-10-12",
  "capturedEnvironment": "https://members.qrediblestaging.com",
  "total": 111,
  "coverage": "Not full acceptance or North launch certification. Still open: final canonical COA publication/provider completion; policy/jurisdiction evaluation; removed-product acknowledgment; real North invitation/enrollment/overlap and branding assets; OTP expiry/resend/attempt-limit recovery; batch/name/ambiguous matching edge cases; concurrent catalog edits and ingestion failure/retry; in-flight worker pause/resume; 1,000 COA and portfolio scan capacity; full mobile response accessibility; case/report/timeline integration. Completed audit scope and evidence acceptance never imply legal compliance.",
  "chapters": [
    {
      "title": "Create an audit: method, owner and next actor",
      "audience": "Processor",
      "route": "https://members.qrediblestaging.com/qmonitor/audits",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks.",
      "slides": [
        {
          "src": "images/00-processor-with-qmonitor-entitlement.png",
          "title": "Q Monitor → Audits",
          "caption": "Audits has its own processor navigation entry. The unused Q Monitor dashboard is not part of this journey."
        },
        {
          "src": "images/01-internal-create.png",
          "title": "Choose Internal audit",
          "caption": "The processor selects an internal audit explicitly. Merchant participation is not required."
        },
        {
          "src": "images/02-internal-ownership.png",
          "title": "Internal ownership",
          "caption": "The accountable processor owner, internal phase and next actor are visible together."
        },
        {
          "src": "images/01-account-guided-create.png",
          "title": "Choose Merchant-led audit",
          "caption": "Execution method is separate from who owns final approval."
        },
        {
          "src": "images/02-account-guided-ownership.png",
          "title": "Set up merchant participation",
          "caption": "The processor remains accountable; the merchant receives a bounded evidence task."
        },
        {
          "src": "images/03-account-guided-request.png",
          "title": "Guided review request",
          "caption": "Choose recipients, guided review, instructions and guest branding. Creation does not send an invitation email."
        },
        {
          "src": "images/03-account-upload-request.png",
          "title": "Upload-only request",
          "caption": "The simpler experience asks for inventory and COAs; processor staff performs preparation and matching."
        }
      ]
    },
    {
      "title": "Internal audit: review → completed baseline",
      "audience": "Processor",
      "route": "https://members.qrediblestaging.com/qmonitor/audits → Product Compliance / Q-ScanAI → We Monitor",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Website observations were arranged in the staging database; no actual crawler ran. MRI/licenses were explicitly excluded. Completion records reviewed scope, not legal compliance.",
      "slides": [
        {
          "src": "images/40-internal-no-merchant-request.png",
          "title": "Internal review",
          "caption": "No permanent merchant-response form appears on this internal audit."
        },
        {
          "src": "images/41-internal-product-review.png",
          "title": "Open canonical products",
          "caption": "The existing Product Compliance table provides processor row review."
        },
        {
          "src": "images/42-internal-first-row-reviewed.png",
          "title": "Review one product",
          "caption": "One reviewed product does not settle the remaining products or website findings."
        },
        {
          "src": "images/43-incomplete-review-blocks-completion.png",
          "title": "Incomplete review blocks completion",
          "caption": "The UI disables completion. A direct authenticated completion attempt also returns HTTP 400."
        },
        {
          "src": "images/44-all-product-rows-reviewed.png",
          "title": "Review remaining products",
          "caption": "All three synthetic canonical products now have processor row stamps."
        },
        {
          "src": "images/45-website-findings-before-review.png",
          "title": "Open website findings",
          "caption": "The existing Q-ScanAI modal opens from the audit section. Status: All also exposes findings outside current scanner coverage."
        },
        {
          "src": "images/46-website-findings-reviewed.png",
          "title": "Review both website findings",
          "caption": "Both finding reviews use actual Mark Reviewed controls, recording the reviewing user and time."
        },
        {
          "src": "images/47-internal-full-review-ready.png",
          "title": "Ready for processor sign-off",
          "caption": "Product and website row coverage is complete; excluded sections have recorded N/A reasons."
        },
        {
          "src": "images/48-internal-completed-frozen-summary.png",
          "title": "Complete and freeze the snapshot",
          "caption": "The processor completes the audit. Reviewed counts and the timestamp are frozen; three missing COAs remain visible."
        },
        {
          "src": "images/49-wemonitor-completed-baseline.png",
          "title": "See the merchant in We Monitor",
          "caption": "The completed audit is available from the existing monitoring view. No-open-remediation is distinct from product eligibility."
        }
      ]
    },
    {
      "title": "In-account upload-only: corrections and approval",
      "audience": "Merchant + processor",
      "route": "https://members.qrediblestaging.com/audits → /audits/<request-id> → /qmonitor/audit-responses/<request-id>",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Merchant personas have no MyCOA subscription. The final parent completion shown here is a lifecycle-only test with all sections explicitly excluded; use the internal chapter for substantive row-review proof.",
      "slides": [
        {
          "src": "images/10-account-inbox.png",
          "title": "Standalone merchant Audits",
          "caption": "The merchant sees requested audits directly in the main sidebar without MyCOA access."
        },
        {
          "src": "images/11-upload-only-original-evidence.png",
          "title": "Upload retained inventory",
          "caption": "Upload original POS inventory and provide scope/POS details. Duplicate identical files are deduplicated."
        },
        {
          "src": "images/12-merchant-signed-v1.png",
          "title": "Sign and submit v1",
          "caption": "The original receipt records the merchant attestation and uploaded evidence."
        },
        {
          "src": "images/13-processor-handoff.png",
          "title": "Processor acts next",
          "caption": "The parent audit shows the handoff and a Review merchant submission action."
        },
        {
          "src": "images/14-staff-mapping-Read-file.png",
          "title": "Read the retained inventory",
          "caption": "Staff opens the actual import wizard from the retained file."
        },
        {
          "src": "images/14-staff-mapping-Continue-to-mapping.png",
          "title": "Map columns",
          "caption": "Reuse inventory column mapping in the audit workspace."
        },
        {
          "src": "images/14-staff-mapping-Continue-to-options.png",
          "title": "Normalize source values",
          "caption": "Existing import options guide normalization."
        },
        {
          "src": "images/14-staff-mapping-Review-changes.png",
          "title": "Review import changes",
          "caption": "Staff checks proposed changes before applying them."
        },
        {
          "src": "images/15-staff-prepared-applied.png",
          "title": "Finalize staff preparation",
          "caption": "The preparation is separate from the merchant receipt. Canonical ingestion reaches APPLIED."
        },
        {
          "src": "images/16-processor-corrections.png",
          "title": "Request corrections",
          "caption": "The processor records specific requested changes."
        },
        {
          "src": "images/17-merchant-corrections.png",
          "title": "Merchant responds",
          "caption": "The merchant sees the correction request in the same workspace."
        },
        {
          "src": "images/18-immutable-receipt-history.png",
          "title": "Sign v2",
          "caption": "Resubmission creates a second receipt. The first receipt remains byte-for-byte unchanged."
        },
        {
          "src": "images/19-staff-remap-Review-changes.png",
          "title": "Prepare the revised inventory",
          "caption": "The corrected SKU updates its existing canonical product rather than duplicating it."
        },
        {
          "src": "images/20-processor-evidence-accepted.png",
          "title": "Accept submitted evidence",
          "caption": "Evidence acceptance is separate from the final parent audit and from product policy outcomes."
        },
        {
          "src": "images/21-merchant-accepted.png",
          "title": "Merchant sees acceptance",
          "caption": "The accepted receipt remains available to the merchant."
        },
        {
          "src": "images/22-parent-completed.png",
          "title": "Separate parent completion",
          "caption": "Lifecycle-only: explicitly excluded sections permit parent completion; this does not establish product compliance."
        },
        {
          "src": "images/23-retained-evidence-delete-blocked.png",
          "title": "Deletion is blocked",
          "caption": "An audit containing retained merchant evidence cannot be deleted through this action."
        },
        {
          "src": "images/24-parent-reopened.png",
          "title": "Reopen the parent",
          "caption": "Processor reopening retains earlier signed evidence and requires new processor decisions."
        }
      ]
    },
    {
      "title": "In-account guided review: real PDFs and matching",
      "audience": "Merchant + processor",
      "route": "https://members.qrediblestaging.com/audits/<request-id> → /qmonitor/audit-responses/<request-id>",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Two synthetic PDFs were sent to real extraction services. Workspace matching preparation completed and acceptance passed. Canonical COA publication remained PROCESSING/UNPUBLISHED at final readback; policy evaluation was unavailable.",
      "slides": [
        {
          "src": "images/50-real-pdf-uploads.png",
          "title": "Upload COA PDFs",
          "caption": "Original files are retained in staging object storage and queued for processing."
        },
        {
          "src": "images/51-shared-filename-bulk-matcher.png",
          "title": "Review bulk match suggestions",
          "caption": "The shared matcher proposes both filename/product associations; the merchant accepts the selected pairs."
        },
        {
          "src": "images/52-matched-product-editor.png",
          "title": "Inspect a product association",
          "caption": "The product editor shows the matched COA and permits direct review."
        },
        {
          "src": "images/53-import-value-normalization.png",
          "title": "Normalize inventory values",
          "caption": "Source classification and product-family labels map to governed choices. These test choices are not a compliance finding."
        },
        {
          "src": "images/54-coa-processing-state.png",
          "title": "See extraction progress",
          "caption": "Unresolved processing blocks signature until preparation is ready."
        },
        {
          "src": "images/55-coa-matching-extraction-complete.png",
          "title": "Matching extraction complete",
          "caption": "Real matching preparation returns extracted product names for both PDFs."
        },
        {
          "src": "images/56-guided-ready-to-attest.png",
          "title": "Confirm reviewed products",
          "caption": "The merchant confirms current product/evidence versions and records the missing COA exception."
        },
        {
          "src": "images/57-guided-signed-with-real-pdfs.png",
          "title": "Sign the evidence",
          "caption": "A receipt freezes the inventory, supporting originals and the merchant signature."
        },
        {
          "src": "images/58-guided-processor-accepted.png",
          "title": "Processor accepts evidence",
          "caption": "Normal extraction progress owned by this ingestion no longer causes the earlier acceptance conflict. Full canonical publication is still a separate gate."
        }
      ]
    },
    {
      "title": "Outside account: guided inventory review",
      "audience": "Recipient + processor",
      "route": "https://members.qrediblestaging.com/audit/respond/<request-id> → processor /qmonitor/audit-responses/<request-id>",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Real emailed code and Verify button used. No account enrollment or MyCOA subscription. The recipient email and secret link are masked; codes and cookies are not published.",
      "slides": [
        {
          "src": "images/04-guest-secure-link-masked.png",
          "title": "Prepare a scoped link",
          "caption": "The processor creates a recipient-specific link. This screenshot masks its secret and controlled mailbox."
        },
        {
          "src": "images/05-guest-verification-required.png",
          "title": "Open the private response",
          "caption": "The existing members staging host serves the guest page with Qredible/MyCOA identification."
        },
        {
          "src": "images/06-guest-code-sent.png",
          "title": "Send a verification code",
          "caption": "A real code is delivered to the approved controlled mailbox."
        },
        {
          "src": "images/07-guest-code-entry-survives-refresh.png",
          "title": "Refresh safely",
          "caption": "The same tab retains the normal code-entry path after refresh, without forcing a resend."
        },
        {
          "src": "images/30-guest-verified-branded-workspace.png",
          "title": "Verify and open the audit",
          "caption": "The real emailed code succeeds through Verify and open audit. The merchant can see owner, phase and next actor."
        },
        {
          "src": "images/31-guest-mapping-Read-file.png",
          "title": "Read inventory",
          "caption": "The outside-account workspace uses the same actual import wizard."
        },
        {
          "src": "images/31-guest-mapping-Continue-to-mapping.png",
          "title": "Map the POS columns",
          "caption": "Map source columns to product fields."
        },
        {
          "src": "images/31-guest-mapping-Continue-to-options.png",
          "title": "Choose import options",
          "caption": "Use normalization and merge behavior in the bounded audit scope."
        },
        {
          "src": "images/31-guest-mapping-Review-changes.png",
          "title": "Review proposed changes",
          "caption": "Check the preview before applying inventory updates."
        },
        {
          "src": "images/32-guest-reviewed-with-exception.png",
          "title": "Confirm inventory and missing evidence",
          "caption": "The recipient reviews products and records the outstanding COA exception."
        },
        {
          "src": "images/33-guest-signed-receipt.png",
          "title": "Submit a signed receipt",
          "caption": "The guest submits evidence without establishing a platform account."
        },
        {
          "src": "images/34-processor-accepted-guest-evidence.png",
          "title": "Processor review and acceptance",
          "caption": "Canonical ingestion and evidence acceptance are separate recorded steps."
        },
        {
          "src": "images/35-guest-accepted-receipt.png",
          "title": "Return to the accepted receipt",
          "caption": "The verified recipient can read the retained result."
        }
      ]
    },
    {
      "title": "Outside account: upload-only retail intake",
      "audience": "Recipient + processor",
      "route": "https://members.qrediblestaging.com/audit/respond/<request-id> → processor /qmonitor/audit-responses/<request-id>",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Real emailed code and Verify button used. Missing supplier COA is explicit; evidence acceptance does not establish compliance.",
      "slides": [
        {
          "src": "images/80-guest-upload-code-sent.png",
          "title": "Verify the designated recipient",
          "caption": "A second real challenge tests the separate upload-only experience."
        },
        {
          "src": "images/81-guest-upload-verified.png",
          "title": "Simple upload page",
          "caption": "The guest sees inventory and COA uploads plus the scope/POS question."
        },
        {
          "src": "images/82-guest-upload-submitted.png",
          "title": "Submit the original files",
          "caption": "The recipient signs the retained upload evidence."
        },
        {
          "src": "images/83-guest-upload-staff-map-Read-file.png",
          "title": "Staff opens the retained inventory",
          "caption": "The processor handles the import after the simple merchant intake."
        },
        {
          "src": "images/83-guest-upload-staff-map-Continue-to-mapping.png",
          "title": "Staff maps columns",
          "caption": "The processor maps the actual retained CSV."
        },
        {
          "src": "images/83-guest-upload-staff-map-Continue-to-options.png",
          "title": "Staff checks options",
          "caption": "Normalization is reused from the existing import functionality."
        },
        {
          "src": "images/83-guest-upload-staff-map-Review-changes.png",
          "title": "Staff reviews changes",
          "caption": "The preview provides the final check before canonical ingestion."
        },
        {
          "src": "images/84-guest-upload-processor-accepted.png",
          "title": "Accept the upload-only evidence",
          "caption": "Staff preparation and APPLIED ingestion precede processor acceptance."
        }
      ]
    },
    {
      "title": "1,000 products: bulk review and acceptance",
      "audience": "Merchant + processor",
      "route": "https://members.qrediblestaging.com/audits/<request-id>",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. 1,000 products, zero COAs. This proves this inventory journey only, not 1,000 COA throughput, concurrent users, or a 335/1,000-merchant scan run.",
      "slides": [
        {
          "src": "images/60-large-import-Read-file.png",
          "title": "Read a 1,000-row CSV",
          "caption": "The retained source inventory contains 1,000 synthetic retail products."
        },
        {
          "src": "images/60-large-import-Continue-to-mapping.png",
          "title": "Map the large catalog",
          "caption": "The existing wizard handles the column mapping."
        },
        {
          "src": "images/60-large-import-Continue-to-options.png",
          "title": "Set import options",
          "caption": "The same normalization/options step applies to the full catalog."
        },
        {
          "src": "images/60-large-import-Review-changes.png",
          "title": "Review the large import",
          "caption": "The preview precedes application of all 1,000 products."
        },
        {
          "src": "images/61-thousand-products-reviewed.png",
          "title": "Review ten pages in bulk",
          "caption": "The merchant records missing evidence and confirms 100 products per page; rendering stays paginated."
        },
        {
          "src": "images/62-thousand-products-search-resume.png",
          "title": "Resume and find the last SKU",
          "caption": "Saved readiness survives reload and SKU search locates product 1,000."
        },
        {
          "src": "images/63-thousand-products-signed.png",
          "title": "Sign the catalog",
          "caption": "The merchant attests to all 1,000 reviewed inventory rows, with missing COAs explicitly recorded."
        },
        {
          "src": "images/64-thousand-products-processor-accepted.png",
          "title": "Accept the large inventory",
          "caption": "All products ingest canonically and the processor accepts the submitted evidence."
        }
      ]
    },
    {
      "title": "Repeat audit: changed, new and unchanged evidence",
      "audience": "Processor",
      "route": "https://members.qrediblestaging.com/qmonitor/audits → /qmonitor/product-compliance",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Synthetic database-arranged changes, not a new scan-provider run. Removal acknowledgment is not implemented and remains open under QP-4887; automated focused reports are a proposal.",
      "slides": [
        {
          "src": "images/70-completed-snapshot-after-changes.png",
          "title": "Keep the earlier completed snapshot",
          "caption": "The earlier summary remains exactly unchanged after underlying evidence changes."
        },
        {
          "src": "images/71-new-audit-scope-after-changes.png",
          "title": "Start the next audit",
          "caption": "Changed + new products require two reviews. The unchanged completed baseline carries forward."
        },
        {
          "src": "images/72-changed-evidence-needs-review.png",
          "title": "Show changed evidence as stale",
          "caption": "The historical stamp remains, but Review changes replaces the settled-current presentation."
        },
        {
          "src": "images/73-changed-evidence-restamped.png",
          "title": "Review the current revision",
          "caption": "The actual row action renews the evidence-version stamp without rewriting the earlier completed snapshot."
        }
      ]
    },
    {
      "title": "Owner, cancellation, takeover and abandonment",
      "audience": "Processor",
      "route": "https://members.qrediblestaging.com/qmonitor/audits → /qmonitor/audit-responses/<request-id>",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Method, accountable owner and next actor are independent. This chapter ends a synthetic follow-up audit; the earlier completed baseline is retained.",
      "slides": [
        {
          "src": "images/90-assigned-processor-reviewer.png",
          "title": "Assign a processor reviewer",
          "caption": "The processor can assign an authorized team member without changing audit method."
        },
        {
          "src": "images/90-owner-returned-through-ui.png",
          "title": "Return ownership to the company owner",
          "caption": "The same dropdown supports the company owner on the return trip; no API workaround."
        },
        {
          "src": "images/91-explicit-merchant-handoff.png",
          "title": "Request merchant participation",
          "caption": "Changing to merchant-led is explicit and records a reason."
        },
        {
          "src": "images/92-cancel-request-confirmation.png",
          "title": "Cancel confirmation",
          "caption": "Keep request open dismisses this confirmation without canceling the work."
        },
        {
          "src": "images/93-request-canceled-retained.png",
          "title": "Confirm cancellation",
          "caption": "The canceled request and its history remain retained."
        },
        {
          "src": "images/94-reasoned-internal-takeover.png",
          "title": "Continue internally",
          "caption": "After cancellation the processor explicitly resumes internal review with a recorded reason."
        },
        {
          "src": "images/95-parent-abandoned.png",
          "title": "End the parent audit",
          "caption": "Abandonment ends current work while retaining the earlier completed baseline and request history."
        }
      ]
    },
    {
      "title": "Guest revocation and processor tracking",
      "audience": "Processor + recipient",
      "route": "https://members.qrediblestaging.com/qmonitor/audit-responses → /audit/respond/<request-id>",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Revocation was tested against an already verified guest cookie. Tracker CSV is real staging output; its invitation columns remain blank because account enrollment was arranged, not sent.",
      "slides": [
        {
          "src": "images/96-revoke-guest-session-confirmation.png",
          "title": "Confirm guest-access revocation",
          "caption": "The processor chooses to revoke scoped outside-account access."
        },
        {
          "src": "images/97-revoked-guest-session-denied.png",
          "title": "Previously verified access is denied",
          "caption": "The existing guest session is invalidated, including direct API access (403)."
        },
        {
          "src": "images/98-processor-response-tracker.png",
          "title": "Track uploads and submissions",
          "caption": "The processor sees request states and evidence timestamps and can export the filtered tracker."
        }
      ]
    },
    {
      "title": "Q-Config and dark-launch switches",
      "audience": "Super-admin + merchant + processor",
      "route": "https://members.qrediblestaging.com/backend → Q-Config Sources; then /audits and /qmonitor/audits",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Actual deployed Q-Config Source deprecation/restoration and independent API switches tested. Both switches and the Source were restored enabled. In-flight worker cancellation/pause under load remains untested.",
      "slides": [
        {
          "src": "images/100-qconfig-live-merchant-source.png",
          "title": "Find the standalone Audits Source",
          "caption": "merchantAudits_navButton_01 is live without paid-plan feature links."
        },
        {
          "src": "images/101-qconfig-deprecate-confirmation.png",
          "title": "Read the source confirmation",
          "caption": "Navigation visibility is distinct from access, cancellation and evidence retention. Cancel preserves the live Source."
        },
        {
          "src": "images/102-qconfig-source-deprecated.png",
          "title": "Deprecate the Source",
          "caption": "The real Q-Config action hides the merchant navigation entry."
        },
        {
          "src": "images/103-merchant-source-hidden-links-preserved.png",
          "title": "Reload the merchant app",
          "caption": "Navigation is hidden; the authorized route and signed receipts remain accessible."
        },
        {
          "src": "images/104-qconfig-restore-confirmation.png",
          "title": "Restore confirmation",
          "caption": "Restoration does not grant MyCOA subscriptions."
        },
        {
          "src": "images/105-standalone-audits-restored.png",
          "title": "Audits restored",
          "caption": "After reload the standalone entry returns for the authorized merchant."
        },
        {
          "src": "images/106-workspace-switch-disabled-merchant.png",
          "title": "Disable workspace only",
          "caption": "Account and guest APIs return 404 while internal parent audit access remains available."
        },
        {
          "src": "images/107-overall-audit-switch-disabled.png",
          "title": "Disable the overall audit feature",
          "caption": "Parent, account and guest APIs return 404 independently of the workspace Source."
        },
        {
          "src": "images/108-switches-restored-evidence-preserved.png",
          "title": "Restore both switches",
          "caption": "Completed snapshots and merchant receipts are unchanged after switch restoration."
        }
      ]
    },
    {
      "title": "XLSX, invalid upload and cancellation after ingestion",
      "audience": "Merchant + processor",
      "route": "https://members.qrediblestaging.com/audits/<request-id> → /qmonitor/audit-responses/<request-id> → parent audit",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. Cancellation does not roll back already-applied canonical changes. It closes further work and retains its signature, source files and ingestion history.",
      "slides": [
        {
          "src": "images/110-retained-xlsx-upload.png",
          "title": "Upload a POS Excel file",
          "caption": "The original XLSX file is retained for processor preparation."
        },
        {
          "src": "images/111-invalid-coa-upload-rejected.png",
          "title": "Reject an unsupported COA file",
          "caption": "The actual upload modal rejects a non-PDF file and preserves earlier successful uploads."
        },
        {
          "src": "images/112-xlsx-staff-mapping-Read-file.png",
          "title": "Read the retained XLSX",
          "caption": "Staff opens the Excel file through the existing wizard."
        },
        {
          "src": "images/112-xlsx-staff-mapping-Continue-to-mapping.png",
          "title": "Map the Excel columns",
          "caption": "Normalize the same SKU rather than creating a duplicate product."
        },
        {
          "src": "images/112-xlsx-staff-mapping-Continue-to-options.png",
          "title": "Review Excel import options",
          "caption": "Use the standard import options."
        },
        {
          "src": "images/112-xlsx-staff-mapping-Review-changes.png",
          "title": "Review the canonical update",
          "caption": "Staff validates the proposed update before ingestion."
        },
        {
          "src": "images/113-xlsx-normalized-and-ingested.png",
          "title": "Canonical ingestion applied",
          "caption": "The same-SKU product is updated, while the original merchant upload receipt remains immutable."
        },
        {
          "src": "images/114-post-ingestion-cancel-confirmation.png",
          "title": "Cancel after ingestion",
          "caption": "The processor sees a confirmation before ending this submitted request."
        },
        {
          "src": "images/115-post-ingestion-canceled-evidence-retained.png",
          "title": "Retain applied evidence",
          "caption": "CANCELED coexists with APPLIED ingestion: cancellation does not silently delete or reverse canonical data."
        },
        {
          "src": "images/116-merchant-canceled-request-readonly.png",
          "title": "Merchant sees a closed request",
          "caption": "The merchant can read retained history and cannot submit further edits."
        },
        {
          "src": "images/117-parent-abandoned-after-acceptance.png",
          "title": "Abandon a parent after acceptance",
          "caption": "The accepted request and its signed evidence remain retained when the parent is abandoned."
        }
      ]
    },
    {
      "title": "Processor branding and outside-account hosting",
      "audience": "Processor + recipient",
      "route": "https://members.qrediblestaging.com/audit/respond/<request-id> · RTQ-Admin-UI existing Next.js deployment",
      "boundary": "Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks. No new domain or external application. Default Qredible/MyCOA is shown in the guest chapters. Processor-name fallback/Forest accent is tested here; a custom North profile logo and full authenticated mobile response are separate checks.",
      "slides": [
        {
          "src": "images/120-canceled-request-next-decision.png",
          "title": "Choose the next processor action",
          "caption": "After cancellation the processor may replace the request, continue internally or abandon."
        },
        {
          "src": "images/121-processor-brand-override-options.png",
          "title": "Override the guest presentation",
          "caption": "The real request dialog chooses processor profile branding and a governed accent."
        },
        {
          "src": "images/122-processor-branded-guest-page.png",
          "title": "Desktop branded guest page",
          "caption": "The processor name appears when no company-profile logo is configured. Platform identification remains."
        },
        {
          "src": "images/123-branded-guest-mobile.png",
          "title": "390px guest presentation",
          "caption": "The same hosted outside-account page renders the scoped verification entry at phone width."
        }
      ]
    }
  ]
};
