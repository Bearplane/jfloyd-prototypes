"""Publish only an explicit allowlist of real, redacted staging screenshots."""
import argparse,json,shutil,re,hashlib
from pathlib import Path
p=argparse.ArgumentParser();p.add_argument('--evidence',required=True);a=p.parse_args()
repo=Path(__file__).resolve().parents[2];source=Path(a.evidence);out=repo/'qredible/merchant-audit-journeys';out.mkdir(parents=True,exist_ok=True);(out/'images').mkdir(exist_ok=True)
for name in ['account-upload','guest-guided','guest-upload','internal','matching','matching-finish','large','delta','controls','qconfig','gates','retention','branding']:
 r=json.loads((source/(name+'-run.json')).read_text());assert not r.get('error'),name+': failed report cannot become an official journey'
chapters=[]
def chapter(title,audience,route,boundary,slides):
 items=[]
 for file,slide_title,caption in slides:
  file=file+'.png';assert not file.startswith('error-');assert (source/file).is_file(),file
  shutil.copyfile(source/file,out/'images'/file)
  items.append({'src':'images/'+file,'title':slide_title,'caption':caption})
 chapters.append({'title':title,'audience':audience,'route':route,'boundary':boundary,'slides':items})
def add(title,audience,route,boundary,slides):
 chapter(title,audience,route,boundary,slides)
host='https://members.qrediblestaging.com'
real='Deployed staging · October 12, 2026 · Synthetic companies and evidence; actual application routes and services, no HTTP mocks.'
add('Create an audit: method, owner and next actor','Processor',host+'/qmonitor/audits',real,[
 ('00-processor-with-qmonitor-entitlement','Q Monitor → Audits','Audits has its own processor navigation entry. The unused Q Monitor dashboard is not part of this journey.'),
 ('01-internal-create','Choose Internal audit','The processor selects an internal audit explicitly. Merchant participation is not required.'),
 ('02-internal-ownership','Internal ownership','The accountable processor owner, internal phase and next actor are visible together.'),
 ('01-account-guided-create','Choose Merchant-led audit','Execution method is separate from who owns final approval.'),
 ('02-account-guided-ownership','Set up merchant participation','The processor remains accountable; the merchant receives a bounded evidence task.'),
 ('03-account-guided-request','Guided review request','Choose recipients, guided review, instructions and guest branding. Creation does not send an invitation email.'),
 ('03-account-upload-request','Upload-only request','The simpler experience asks for inventory and COAs; processor staff performs preparation and matching.')])
add('Internal audit: review → completed baseline','Processor',host+'/qmonitor/audits → Product Compliance / Q-ScanAI → We Monitor',real+' Website observations were arranged in the staging database; no actual crawler ran. MRI/licenses were explicitly excluded. Completion records reviewed scope, not legal compliance.',[
 ('40-internal-no-merchant-request','Internal review','No permanent merchant-response form appears on this internal audit.'),
 ('41-internal-product-review','Open canonical products','The existing Product Compliance table provides processor row review.'),
 ('42-internal-first-row-reviewed','Review one product','One reviewed product does not settle the remaining products or website findings.'),
 ('43-incomplete-review-blocks-completion','Incomplete review blocks completion','The UI disables completion. A direct authenticated completion attempt also returns HTTP 400.'),
 ('44-all-product-rows-reviewed','Review remaining products','All three synthetic canonical products now have processor row stamps.'),
 ('45-website-findings-before-review','Open website findings','The existing Q-ScanAI modal opens from the audit section. Status: All also exposes findings outside current scanner coverage.'),
 ('46-website-findings-reviewed','Review both website findings','Both finding reviews use actual Mark Reviewed controls, recording the reviewing user and time.'),
 ('47-internal-full-review-ready','Ready for processor sign-off','Product and website row coverage is complete; excluded sections have recorded N/A reasons.'),
 ('48-internal-completed-frozen-summary','Complete and freeze the snapshot','The processor completes the audit. Reviewed counts and the timestamp are frozen; three missing COAs remain visible.'),
 ('49-wemonitor-completed-baseline','See the merchant in We Monitor','The completed audit is available from the existing monitoring view. No-open-remediation is distinct from product eligibility.')])
add('In-account upload-only: corrections and approval','Merchant + processor',host+'/audits → /audits/<request-id> → /qmonitor/audit-responses/<request-id>',real+' Merchant personas have no MyCOA subscription. The final parent completion shown here is a lifecycle-only test with all sections explicitly excluded; use the internal chapter for substantive row-review proof.',[
 ('10-account-inbox','Standalone merchant Audits','The merchant sees requested audits directly in the main sidebar without MyCOA access.'),
 ('11-upload-only-original-evidence','Upload retained inventory','Upload original POS inventory and provide scope/POS details. Duplicate identical files are deduplicated.'),
 ('12-merchant-signed-v1','Sign and submit v1','The original receipt records the merchant attestation and uploaded evidence.'),
 ('13-processor-handoff','Processor acts next','The parent audit shows the handoff and a Review merchant submission action.'),
 ('14-staff-mapping-Read-file','Read the retained inventory','Staff opens the actual import wizard from the retained file.'),
 ('14-staff-mapping-Continue-to-mapping','Map columns','Reuse inventory column mapping in the audit workspace.'),
 ('14-staff-mapping-Continue-to-options','Normalize source values','Existing import options guide normalization.'),
 ('14-staff-mapping-Review-changes','Review import changes','Staff checks proposed changes before applying them.'),
 ('15-staff-prepared-applied','Finalize staff preparation','The preparation is separate from the merchant receipt. Canonical ingestion reaches APPLIED.'),
 ('16-processor-corrections','Request corrections','The processor records specific requested changes.'),
 ('17-merchant-corrections','Merchant responds','The merchant sees the correction request in the same workspace.'),
 ('18-immutable-receipt-history','Sign v2','Resubmission creates a second receipt. The first receipt remains byte-for-byte unchanged.'),
 ('19-staff-remap-Review-changes','Prepare the revised inventory','The corrected SKU updates its existing canonical product rather than duplicating it.'),
 ('20-processor-evidence-accepted','Accept submitted evidence','Evidence acceptance is separate from the final parent audit and from product policy outcomes.'),
 ('21-merchant-accepted','Merchant sees acceptance','The accepted receipt remains available to the merchant.'),
 ('22-parent-completed','Separate parent completion','Lifecycle-only: explicitly excluded sections permit parent completion; this does not establish product compliance.'),
 ('23-retained-evidence-delete-blocked','Deletion is blocked','An audit containing retained merchant evidence cannot be deleted through this action.'),
 ('24-parent-reopened','Reopen the parent','Processor reopening retains earlier signed evidence and requires new processor decisions.')])
add('In-account guided review: real PDFs and matching','Merchant + processor',host+'/audits/<request-id> → /qmonitor/audit-responses/<request-id>',real+' Two synthetic PDFs were sent to real extraction services. Workspace matching preparation completed and acceptance passed. Canonical COA publication remained PROCESSING/UNPUBLISHED at final readback; policy evaluation was unavailable.',[
 ('50-real-pdf-uploads','Upload COA PDFs','Original files are retained in staging object storage and queued for processing.'),
 ('51-shared-filename-bulk-matcher','Review bulk match suggestions','The shared matcher proposes both filename/product associations; the merchant accepts the selected pairs.'),
 ('52-matched-product-editor','Inspect a product association','The product editor shows the matched COA and permits direct review.'),
 ('53-import-value-normalization','Normalize inventory values','Source classification and product-family labels map to governed choices. These test choices are not a compliance finding.'),
 ('54-coa-processing-state','See extraction progress','Unresolved processing blocks signature until preparation is ready.'),
 ('55-coa-matching-extraction-complete','Matching extraction complete','Real matching preparation returns extracted product names for both PDFs.'),
 ('56-guided-ready-to-attest','Confirm reviewed products','The merchant confirms current product/evidence versions and records the missing COA exception.'),
 ('57-guided-signed-with-real-pdfs','Sign the evidence','A receipt freezes the inventory, supporting originals and the merchant signature.'),
 ('58-guided-processor-accepted','Processor accepts evidence','Normal extraction progress owned by this ingestion no longer causes the earlier acceptance conflict. Full canonical publication is still a separate gate.')])
add('Outside account: guided inventory review','Recipient + processor',host+'/audit/respond/<request-id> → processor /qmonitor/audit-responses/<request-id>',real+' Real emailed code and Verify button used. No account enrollment or MyCOA subscription. The recipient email and secret link are masked; codes and cookies are not published.',[
 ('04-guest-secure-link-masked','Prepare a scoped link','The processor creates a recipient-specific link. This screenshot masks its secret and controlled mailbox.'),
 ('05-guest-verification-required','Open the private response','The existing members staging host serves the guest page with Qredible/MyCOA identification.'),
 ('06-guest-code-sent','Send a verification code','A real code is delivered to the approved controlled mailbox.'),
 ('07-guest-code-entry-survives-refresh','Refresh safely','The same tab retains the normal code-entry path after refresh, without forcing a resend.'),
 ('30-guest-verified-branded-workspace','Verify and open the audit','The real emailed code succeeds through Verify and open audit. The merchant can see owner, phase and next actor.'),
 ('31-guest-mapping-Read-file','Read inventory','The outside-account workspace uses the same actual import wizard.'),
 ('31-guest-mapping-Continue-to-mapping','Map the POS columns','Map source columns to product fields.'),
 ('31-guest-mapping-Continue-to-options','Choose import options','Use normalization and merge behavior in the bounded audit scope.'),
 ('31-guest-mapping-Review-changes','Review proposed changes','Check the preview before applying inventory updates.'),
 ('32-guest-reviewed-with-exception','Confirm inventory and missing evidence','The recipient reviews products and records the outstanding COA exception.'),
 ('33-guest-signed-receipt','Submit a signed receipt','The guest submits evidence without establishing a platform account.'),
 ('34-processor-accepted-guest-evidence','Processor review and acceptance','Canonical ingestion and evidence acceptance are separate recorded steps.'),
 ('35-guest-accepted-receipt','Return to the accepted receipt','The verified recipient can read the retained result.')])
add('Outside account: upload-only retail intake','Recipient + processor',host+'/audit/respond/<request-id> → processor /qmonitor/audit-responses/<request-id>',real+' Real emailed code and Verify button used. Missing supplier COA is explicit; evidence acceptance does not establish compliance.',[
 ('80-guest-upload-code-sent','Verify the designated recipient','A second real challenge tests the separate upload-only experience.'),
 ('81-guest-upload-verified','Simple upload page','The guest sees inventory and COA uploads plus the scope/POS question.'),
 ('82-guest-upload-submitted','Submit the original files','The recipient signs the retained upload evidence.'),
 ('83-guest-upload-staff-map-Read-file','Staff opens the retained inventory','The processor handles the import after the simple merchant intake.'),
 ('83-guest-upload-staff-map-Continue-to-mapping','Staff maps columns','The processor maps the actual retained CSV.'),
 ('83-guest-upload-staff-map-Continue-to-options','Staff checks options','Normalization is reused from the existing import functionality.'),
 ('83-guest-upload-staff-map-Review-changes','Staff reviews changes','The preview provides the final check before canonical ingestion.'),
 ('84-guest-upload-processor-accepted','Accept the upload-only evidence','Staff preparation and APPLIED ingestion precede processor acceptance.')])
add('1,000 products: bulk review and acceptance','Merchant + processor',host+'/audits/<request-id>',real+' 1,000 products, zero COAs. This proves this inventory journey only, not 1,000 COA throughput, concurrent users, or a 335/1,000-merchant scan run.',[
 ('60-large-import-Read-file','Read a 1,000-row CSV','The retained source inventory contains 1,000 synthetic retail products.'),
 ('60-large-import-Continue-to-mapping','Map the large catalog','The existing wizard handles the column mapping.'),
 ('60-large-import-Continue-to-options','Set import options','The same normalization/options step applies to the full catalog.'),
 ('60-large-import-Review-changes','Review the large import','The preview precedes application of all 1,000 products.'),
 ('61-thousand-products-reviewed','Review ten pages in bulk','The merchant records missing evidence and confirms 100 products per page; rendering stays paginated.'),
 ('62-thousand-products-search-resume','Resume and find the last SKU','Saved readiness survives reload and SKU search locates product 1,000.'),
 ('63-thousand-products-signed','Sign the catalog','The merchant attests to all 1,000 reviewed inventory rows, with missing COAs explicitly recorded.'),
 ('64-thousand-products-processor-accepted','Accept the large inventory','All products ingest canonically and the processor accepts the submitted evidence.')])
add('Repeat audit: changed, new and unchanged evidence','Processor',host+'/qmonitor/audits → /qmonitor/product-compliance',real+' Synthetic database-arranged changes, not a new scan-provider run. Removal acknowledgment is not implemented and remains open under QP-4887; automated focused reports are a proposal.',[
 ('70-completed-snapshot-after-changes','Keep the earlier completed snapshot','The earlier summary remains exactly unchanged after underlying evidence changes.'),
 ('71-new-audit-scope-after-changes','Start the next audit','Changed + new products require two reviews. The unchanged completed baseline carries forward.'),
 ('72-changed-evidence-needs-review','Show changed evidence as stale','The historical stamp remains, but Review changes replaces the settled-current presentation.'),
 ('73-changed-evidence-restamped','Review the current revision','The actual row action renews the evidence-version stamp without rewriting the earlier completed snapshot.')])
add('Owner, cancellation, takeover and abandonment','Processor',host+'/qmonitor/audits → /qmonitor/audit-responses/<request-id>',real+' Method, accountable owner and next actor are independent. This chapter ends a synthetic follow-up audit; the earlier completed baseline is retained.',[
 ('90-assigned-processor-reviewer','Assign a processor reviewer','The processor can assign an authorized team member without changing audit method.'),
 ('90-owner-returned-through-ui','Return ownership to the company owner','The same dropdown supports the company owner on the return trip; no API workaround.'),
 ('91-explicit-merchant-handoff','Request merchant participation','Changing to merchant-led is explicit and records a reason.'),
 ('92-cancel-request-confirmation','Cancel confirmation','Keep request open dismisses this confirmation without canceling the work.'),
 ('93-request-canceled-retained','Confirm cancellation','The canceled request and its history remain retained.'),
 ('94-reasoned-internal-takeover','Continue internally','After cancellation the processor explicitly resumes internal review with a recorded reason.'),
 ('95-parent-abandoned','End the parent audit','Abandonment ends current work while retaining the earlier completed baseline and request history.')])
add('Guest revocation and processor tracking','Processor + recipient',host+'/qmonitor/audit-responses → /audit/respond/<request-id>',real+' Revocation was tested against an already verified guest cookie. Tracker CSV is real staging output; its invitation columns remain blank because account enrollment was arranged, not sent.',[
 ('96-revoke-guest-session-confirmation','Confirm guest-access revocation','The processor chooses to revoke scoped outside-account access.'),
 ('97-revoked-guest-session-denied','Previously verified access is denied','The existing guest session is invalidated, including direct API access (403).'),
 ('98-processor-response-tracker','Track uploads and submissions','The processor sees request states and evidence timestamps and can export the filtered tracker.')])
add('Q-Config and dark-launch switches','Super-admin + merchant + processor',host+'/backend → Q-Config Sources; then /audits and /qmonitor/audits',real+' Actual deployed Q-Config Source deprecation/restoration and independent API switches tested. Both switches and the Source were restored enabled. In-flight worker cancellation/pause under load remains untested.',[
 ('100-qconfig-live-merchant-source','Find the standalone Audits Source','merchantAudits_navButton_01 is live without paid-plan feature links.'),
 ('101-qconfig-deprecate-confirmation','Read the source confirmation','Navigation visibility is distinct from access, cancellation and evidence retention. Cancel preserves the live Source.'),
 ('102-qconfig-source-deprecated','Deprecate the Source','The real Q-Config action hides the merchant navigation entry.'),
 ('103-merchant-source-hidden-links-preserved','Reload the merchant app','Navigation is hidden; the authorized route and signed receipts remain accessible.'),
 ('104-qconfig-restore-confirmation','Restore confirmation','Restoration does not grant MyCOA subscriptions.'),
 ('105-standalone-audits-restored','Audits restored','After reload the standalone entry returns for the authorized merchant.'),
 ('106-workspace-switch-disabled-merchant','Disable workspace only','Account and guest APIs return 404 while internal parent audit access remains available.'),
 ('107-overall-audit-switch-disabled','Disable the overall audit feature','Parent, account and guest APIs return 404 independently of the workspace Source.'),
 ('108-switches-restored-evidence-preserved','Restore both switches','Completed snapshots and merchant receipts are unchanged after switch restoration.')])
add('XLSX, invalid upload and cancellation after ingestion','Merchant + processor',host+'/audits/<request-id> → /qmonitor/audit-responses/<request-id> → parent audit',real+' Cancellation does not roll back already-applied canonical changes. It closes further work and retains its signature, source files and ingestion history.',[
 ('110-retained-xlsx-upload','Upload a POS Excel file','The original XLSX file is retained for processor preparation.'),
 ('111-invalid-coa-upload-rejected','Reject an unsupported COA file','The actual upload modal rejects a non-PDF file and preserves earlier successful uploads.'),
 ('112-xlsx-staff-mapping-Read-file','Read the retained XLSX','Staff opens the Excel file through the existing wizard.'),
 ('112-xlsx-staff-mapping-Continue-to-mapping','Map the Excel columns','Normalize the same SKU rather than creating a duplicate product.'),
 ('112-xlsx-staff-mapping-Continue-to-options','Review Excel import options','Use the standard import options.'),
 ('112-xlsx-staff-mapping-Review-changes','Review the canonical update','Staff validates the proposed update before ingestion.'),
 ('113-xlsx-normalized-and-ingested','Canonical ingestion applied','The same-SKU product is updated, while the original merchant upload receipt remains immutable.'),
 ('114-post-ingestion-cancel-confirmation','Cancel after ingestion','The processor sees a confirmation before ending this submitted request.'),
 ('115-post-ingestion-canceled-evidence-retained','Retain applied evidence','CANCELED coexists with APPLIED ingestion: cancellation does not silently delete or reverse canonical data.'),
 ('116-merchant-canceled-request-readonly','Merchant sees a closed request','The merchant can read retained history and cannot submit further edits.'),
 ('117-parent-abandoned-after-acceptance','Abandon a parent after acceptance','The accepted request and its signed evidence remain retained when the parent is abandoned.')])
add('Processor branding and outside-account hosting','Processor + recipient',host+'/audit/respond/<request-id> · RTQ-Admin-UI existing Next.js deployment',real+' No new domain or external application. Default Qredible/MyCOA is shown in the guest chapters. Processor-name fallback/Forest accent is tested here; a custom North profile logo and full authenticated mobile response are separate checks.',[
 ('120-canceled-request-next-decision','Choose the next processor action','After cancellation the processor may replace the request, continue internally or abandon.'),
 ('121-processor-brand-override-options','Override the guest presentation','The real request dialog chooses processor profile branding and a governed accent.'),
 ('122-processor-branded-guest-page','Desktop branded guest page','The processor name appears when no company-profile logo is configured. Platform identification remains.'),
 ('123-branded-guest-mobile','390px guest presentation','The same hosted outside-account page renders the scoped verification entry at phone width.')])
coverage='Not full acceptance or North launch certification. Still open: final canonical COA publication/provider completion; policy/jurisdiction evaluation; removed-product acknowledgment; real North invitation/enrollment/overlap and branding assets; OTP expiry/resend/attempt-limit recovery; batch/name/ambiguous matching edge cases; concurrent catalog edits and ingestion failure/retry; in-flight worker pause/resume; 1,000 COA and portfolio scan capacity; full mobile response accessibility; case/report/timeline integration. Completed audit scope and evidence acceptance never imply legal compliance.'
data={'assembled':'2026-10-12','capturedEnvironment':host,'total':sum(len(c['slides']) for c in chapters),'coverage':coverage,'chapters':chapters}
payload=json.dumps(data,ensure_ascii=False,indent=2)
assert not re.search(r'joseph@|#access=|Bearer |\.private\.|[A-Z]:[/\\]',payload)
(out/'data.js').write_text('window.JOURNEYS = '+payload+';\n',encoding='utf-8')
html=(repo/'qredible/mycoa-sponsorship-journeys/index.html').read_text(encoding='utf-8')
html=html.replace('MyCOA · User journey walkthrough','Merchant audits · Staging user journeys').replace('MyCOA & sponsorship journeys','Merchant audit journeys').replace('review evidence, not staging certification','deployed staging · October 12, 2026 · acceptance limits noted')
start=html.index('<dialog id="evidence">');end=html.index('</dialog>',start)+len('</dialog>')
dialog='''<dialog id="evidence"><div class="dialog-top"><h2>Coverage and acceptance limits</h2><button id="close">Close</button></div><p>Actual Playwright Chromium captures from deployed staging on October 12, 2026. These are not mockups, reconstructed screens or isolated components. Companies, account personas, inventories and PDFs are controlled synthetic fixtures. Website observations and later changes were deliberately arranged in staging; no crawler/provider scan is claimed.</p><p>The journeys show internal audit, both merchant experiences inside and outside the account, immutable receipts, processor handoffs, review stamps, cancellations, 1,000 products, Q-Config and independent dark-launch switches. Real guest verification emails, storage and extraction services were used; no HTTP services were mocked.</p><p id="coverage"></p><h3>What the timestamps mean</h3><p>Merchant attestation freezes the submitted evidence. Processor acceptance records acceptance of that evidence. Final parent completion freezes its reviewed scope and counts. Each is a different event. Missing COAs remain missing; no-open-remediation does not certify product eligibility.</p><h3>Environment and ownership</h3><p>Staging application: members.qrediblestaging.com. Processor: Q Monitor → Audits. Merchant: standalone Audits, independent of MyCOA. Guest: /audit/respond/&lt;request-id&gt; on the same Next.js frontend, maintained in RTQ-Admin-UI; RTQ-Admin-API owns scope, identity and evidence. No new domain was provisioned. Production hosting was not tested.</p><p>API runtime 540dfba18cdc3c9175770dde5c56fb0a96842e6b; UI runtime 1f3dee84d9e822d0ba63fd93ea8eba7114cbaf37. Merged acceptance fixes: API #2925 and UI #4059. Runtime identities and proof boundaries are documented in the validation PR.</p><h3>Safe review collection</h3><p>Secret invitation links, mailbox fields and authentication inputs are masked at capture. Codes, cookies, credentials and private source metadata are omitted. The copied images are unchanged after capture. Chapters use several separate fixtures; this is not one continuous merchant session.</p><p>Use Previous / Next, arrow keys, the step selector or All steps. Actual size lets you pan dense screens. Open image displays the original capture. <a href="../">Return to the Qredible collection</a>.</p></dialog>'''
html=html[:start]+dialog+html[end:]
(out/'index.html').write_text(html,encoding='utf-8')
hashes={s['src']:hashlib.sha256((out/s['src']).read_bytes()).hexdigest() for c in chapters for s in c['slides']}
(repo/'validation/merchant-audit-gallery/image-hashes.json').write_text(json.dumps(hashes,indent=2))
print(json.dumps({'journeys':len(chapters),'screenshots':data['total'],'uniqueImages':len(hashes),'mockups':0}))
