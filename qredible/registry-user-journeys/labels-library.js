/* Browser-memory Labels proposal. No file contents, product API or policy service. */
window.createRegistryLabels = function createRegistryLabels(host) {
  'use strict';
  const { escape: h, button: button, products, modal, close, notify, redraw, before, navigate } = host;
  const $ = selector => document.querySelector(selector);
  const panels = ['FRONT', 'BACK', 'LEFT_SIDE', 'RIGHT_SIDE', 'TOP', 'BOTTOM', 'FULL_WRAP', 'OUTER_CARTON', 'INSERT', 'OTHER'];
  const panelText = value => value.replaceAll('_', ' ').toLowerCase().replace(/^./, x => x.toUpperCase());
  let records = [], query = '', filter = 'active', sequence = 0, upload = null, matching = null;
  const find = id => records.find(record => record.id === id);
  const active = () => records.filter(record => !record.archived);
  const forProduct = productId => active().find(record => record.productIds.includes(productId));
  const currentVersion = record => record.versions[0];
  const attr = record => `data-label="${h(record.id)}"`;
  function reset() {
    query = ''; filter = 'active'; sequence = 0; upload = null; matching = null;
    const available = products();
    records = available.filter(p => p.id === 'soap' || p.id === 'extract').map(p => ({
      id: 'label-' + p.id, name: p.id === 'soap' ? 'Soap bar packaging' : 'Botanical extract packaging',
      productIds: [p.id], archived: false, updated: 'Oct 22, 2026',
      versions: [{number: p.id === 'soap' ? 2 : 1, state: p.id === 'soap' ? 'Needs review' : 'On file · not read',
        files: ['FRONT', 'BACK'].map(panel => ({name: p.sku + '__' + panel + '.png', panel}))},
        ...(p.id === 'soap' ? [{number: 1, state: 'Replaced', files: [{name: p.sku + '__FRONT-v1.png', panel: 'FRONT'}]}] : [])]
    }));
    if (available.length) records.push({id:'label-unassigned', name:'Unmatched packaging upload', productIds:[], archived:false, updated:'Oct 22, 2026', versions:[{number:1,state:'Uploaded · not read',files:[{name:'packaging-front.png',panel:'FRONT'},{name:'packaging-back.png',panel:'BACK'}]}]});
  }
  function productNames(record) {
    return record.productIds.map(id => products().find(p => p.id === id)).filter(Boolean);
  }
  function thumbnail(record) {
    return `<span class="label-thumb" aria-hidden="true"><span>LABEL</span><i></i><i></i><i></i><small>${currentVersion(record).files.length} panels</small></span>`;
  }
  function productCell(product) {
    const record = forProduct(product.id);
    return `<td class="product-label-cell">${record
      ? `<span class="status neutral">${h(currentVersion(record).state)}</span><p>v${currentVersion(record).number} · ${currentVersion(record).files.length} panels</p>${button('View label','label-view','link',attr(record))}`
      : `<span class="muted">No label on file</span><p>${button('Upload label','label-upload','link',`data-product="${h(product.id)}"`)}</p>`}</td>`;
  }
  function tableRows() {
    const selected = records.filter(record => {
      if (filter === 'archived' ? !record.archived : record.archived) return false;
      if (filter === 'unassigned' && record.productIds.length) return false;
      if (filter === 'review' && currentVersion(record).state !== 'Needs review') return false;
      const haystack = [record.name, ...productNames(record).flatMap(p => [p.name, p.sku]), ...currentVersion(record).files.map(f => f.name)].join(' ').toLowerCase();
      return haystack.includes(query.toLowerCase());
    });
    return selected.map(record => {
      const version = currentVersion(record), assigned = productNames(record);
      return `<tr data-label-row="${h(record.id)}"><td><div class="label-title">${thumbnail(record)}<div><strong>${h(record.name)}</strong><p>${record.archived?'Archived record': 'Label record'}</p>${button('View label','label-view','link',attr(record))}</div></div></td>
        <td>${assigned.length ? assigned.map(p=>`<p><b>${h(p.sku)}</b><br>${h(p.name)}</p>`).join('') : '<span class="status">Needs assignment</span>'}</td>
        <td><b>Version ${version.number}</b><p>${version.files.length} panels · ${version.files.map(f=>panelText(f.panel)).join(', ')}</p></td>
        <td><span class="status ${version.state==='Needs review'?'':'neutral'}">${h(version.state)}</span><p>Document processing only</p></td>
        <td>${h(record.updated)}</td><td><div class="label-row-actions">${record.archived?button('Restore','label-restore','',attr(record)):button('Match products','label-match','',attr(record))+button('New version','label-upload','',attr(record))}</div></td></tr>`;
    }).join('') || `<tr><td colspan="6"><div class="label-empty"><h3>${records.length?'No labels match this view':'Your label library starts here'}</h3><p>${records.length?'Change the search or filter to see other records.':'Upload packaging panels, then confirm the products they belong to. You can leave uploads unassigned until the product is available.'}</p>${!records.length?button('Upload labels','label-upload','blue'):''}</div></td></tr>`;
  }
  function render() {
    if (before()) return `<div class="notice"><strong>No standalone Labels table in the current design</strong><p>The current entry points are the Label column in Products, the product label viewer, and individual/bulk upload with product matching.</p></div><div class="cards"><div class="card"><span class="tag reuse">Existing capability</span><h3 style="margin-top:12px">Product label workflow</h3><p>Upload panels, read/review a label, view versions and maintain explicit product assignments.</p><button data-screen="products">Open Products · Label column</button></div><div class="card"><span class="tag new">Proposed addition</span><h3 style="margin-top:12px">A catalog-wide Labels library</h3><p>Switch the review control to Proposed to see the new table, search and assignment work queue. It reuses those existing capabilities.</p></div></div>`;
    return `<div class="label-proposal-strip"><span class="tag new">New table & tab</span><span class="tag reuse">Reuse upload, versions & assignments</span><span>Scoped addition to the minimal rebrand · existing label access assumed</span></div>
      <div class="label-page-heading"><div><h3>Labels</h3><p>Manage packaging labels and the products that use them.</p></div>${button('Upload labels','label-upload','blue')}</div>
      <div class="label-metrics"><div><strong>${active().length}</strong><span>Active labels</span></div><div><strong>${active().filter(r=>!r.productIds.length).length}</strong><span>Need assignment</span></div><div><strong>${active().filter(r=>currentVersion(r).state==='Needs review').length}</strong><span>Need reading review</span></div><div><strong>${records.filter(r=>r.archived).length}</strong><span>Archived</span></div></div>
      <div class="filter-box"><div class="searchbar"><input id="label-search" aria-label="Search labels" value="${h(query)}" placeholder="Search labels, filenames, product names or SKUs…"><select id="label-filter" aria-label="Label filter">${[['active','All active labels'],['unassigned','Needs assignment'],['review','Needs review'],['archived','Archived']].map(([value,text])=>`<option value="${value}" ${filter===value?'selected':''}>${text}</option>`).join('')}</select></div><div class="filter-foot"><span>Company library · Everyday Goods · one row per label record</span><span>Reading status and product compliance are separate</span></div></div>
      <div class="table-wrap label-library"><table><thead><tr><th scope="col">Label</th><th scope="col">Assigned products / variants</th><th scope="col">Current version</th><th scope="col">Reading / review</th><th scope="col">Updated</th><th scope="col">Actions</th></tr></thead><tbody id="label-rows">${tableRows()}</tbody></table></div>
      <p class="label-library-note">Selecting a product does not establish a policy result. Open a label to review its panels, versions and product context.</p>`;
  }
  function view(record) {
    const version = currentVersion(record), assigned = productNames(record);
    modal('Label · ' + h(record.name), `<div class="label-dialog-context"><span class="tag reuse">Existing viewer & version model</span><span class="review-badge">Illustrative record</span></div><div class="label-view-summary"><div><b>Version ${version.number}</b><p>${h(version.state)}</p></div><div><b>${record.archived?'Archived':assigned.length?assigned.length+' assigned product'+(assigned.length===1?'':'s'):'Needs assignment'}</b><p>${assigned.map(p=>h(p.sku)).join(', ')||'No product selected'}</p></div></div>
      <h3>Packaging panels</h3><div class="label-panels">${version.files.map(f=>`<div><div class="label-panel-placeholder">${panelText(f.panel)}</div><p>${h(f.name)}</p></div>`).join('')}</div><p class="small muted">Filename placeholders only. This prototype does not read or upload image/PDF contents.</p>
      <h3>For a product</h3>${assigned.length?`<label>Product context<select id="label-view-product">${assigned.map(p=>`<option value="${h(p.id)}">${h(p.sku+' · '+p.name)}</option>`).join('')}</select></label><div id="label-product-finding" class="preserve">${finding(assigned[0])}</div>`:'<div class="preserve">Assign a product to review the label in its product context. Reading or uploading the document does not produce a product disposition.</div>'}
      <details class="label-version-history" open><summary>Version history (${record.versions.length})</summary>${record.versions.map((v,i)=>`<div><b>Version ${v.number} · ${i===0?'Current':'Replaced'}</b><span>${v.files.length} panels</span><p>${v.files.map(f=>h(f.name)).join(', ')}</p></div>`).join('')}</details>
      <div class="modal-actions">${record.archived?button('Restore label','label-restore','',attr(record)):button('Archive label','label-archive','',attr(record))+button('Upload new version','label-upload','',attr(record))+button('Match products','label-match','blue',attr(record))}</div>`);
  }
  function finding(product) {
    return `<b>${h(product.sku)} · ${h(product.status)}</b><p>${h(product.reason)}. A label on file or a confirmed assignment does not create a passing assessment. Results would use the applicable policy and this product’s evidence.</p>`;
  }
  function openUpload(record, productId) {
    upload = {recordId: record?.id||null, productId: productId||null, files: []};
    const product = products().find(p=>p.id===productId);
    modal(record?'Upload new label version':'Upload labels', `<div class="label-dialog-context"><span class="tag reuse">Existing upload & panel model</span><span class="tag new">New library entry point</span></div><p>${record?`Add version ${currentVersion(record).number+1} to <b>${h(record.name)}</b>. Existing explicit assignments stay linked; the previous version remains in history.`:'Group the panels for one packaging label into a record. Confirm its product assignments after upload.'}</p>
      <form id="label-upload-form"><label>Label name<input id="label-name" required maxlength="140" value="${h(record?.name||(product?product.name+' packaging':''))}"></label><label>Packaging files<input type="file" id="label-files" accept=".png,.jpg,.jpeg,.pdf" multiple required></label><p class="small muted">Choose panels for one label record. Use SKU__FRONT.png / SKU__BACK.png to see suggested matching. Only filenames are used in this browser preview.</p><details class="source-note"><summary>Existing versus proposed intake</summary><p>Existing individual upload requires a product; existing bulk upload retains unresolved items for matching. Saving an unassigned record directly into this library is proposed intake work, not an existing endpoint demonstrated here.</p></details><div id="label-upload-panels"></div><p id="label-upload-error" class="label-error" role="alert"></p><div class="modal-actions"><button class="blue" type="submit">${record?'Save sample version':'Add to sample library'}</button></div></form>`);
  }
  function matchingChoices() {
    const q = matching.query.toLowerCase();
    return products().filter(p=>(p.name+' '+p.sku).toLowerCase().includes(q)).map(p=>{
      const existing=forProduct(p.id), conflict=existing&&existing.id!==matching.recordId;
      return `<label class="label-product-choice"><input type="checkbox" data-label-product="${h(p.id)}" ${matching.ids.has(p.id)?'checked':''}><span><b>${h(p.sku)}</b> · ${h(p.name)}<small>${conflict?'Currently uses '+h(existing.name):'Same company · explicit assignment'}${matching.suggestions.has(p.id)?' · Exact SKU filename match':''}</small></span></label>`;
    }).join('')||'<p class="small">No products found. Add a product in Products or try another search.</p>';
  }
  function matchSummary() {
    const conflicts=products().filter(p=>matching.ids.has(p.id)&&forProduct(p.id)&&forProduct(p.id).id!==matching.recordId);
    $('#label-match-summary').innerHTML=`<b>${matching.ids.size} product${matching.ids.size===1?'':'s'} selected</b><p>Applies only to the selected products/variants in this company. No parent or family inheritance.</p>${conflicts.length?`<label class="label-replace-consent"><input id="label-replace-consent" type="checkbox" required> Replace the current label assignment for ${conflicts.map(p=>h(p.sku)).join(', ')}. The prior label and its versions remain in the library.</label>`:''}`;
  }
  function match(record, productId) {
    const fileSkus=currentVersion(record).files.map(f=>f.name.split('__')[0].toLowerCase());
    const suggestions=new Set();
    let ambiguous=false;
    for(const sku of new Set(fileSkus)) {
      const matches=products().filter(p=>p.sku.toLowerCase()===sku);
      if(matches.length===1)suggestions.add(matches[0].id);
      else if(matches.length>1)ambiguous=true;
    }
    matching={recordId:record.id,ids:new Set(record.productIds),suggestions,query:''};
    if (productId&&products().some(p=>p.id===productId))matching.ids.add(productId);
    modal('Match label to products', `<div class="label-dialog-context"><span class="tag reuse">Existing explicit assignments</span><span class="tag new">New library matching work queue</span></div><h3>${h(record.name)} · version ${currentVersion(record).number}</h3><p>Review each product and variant before confirming. A filename suggestion is not a confirmed assignment.</p>${ambiguous?'<div class="notice">More than one product matches a filename SKU. No suggestion is selected for that SKU; choose the intended product manually.</div>':''}<form id="label-match-form"><label>Find products<input id="label-product-search" placeholder="Search product name or SKU"></label>${suggestions.size?button('Select filename suggestions','label-suggestions'):''}<div id="label-product-options">${matchingChoices()}</div><div id="label-match-summary" class="preserve"></div><p id="label-match-error" class="label-error" role="alert"></p><div class="modal-actions">${button('Leave unchanged','close')}<button class="blue" type="submit">Confirm assignments</button></div></form>`);
    matchSummary();
  }
  function openModal(fn) { if($('#dialog').open) close(); fn(); }
  function handleAction(action, el) {
    if (!action.startsWith('label-')) return false;
    const record=find(el.dataset.label);
    switch(action) {
      case 'label-view': if(record)openModal(()=>view(record)); break;
      case 'label-upload': openModal(()=>openUpload(record,el.dataset.product)); break;
      case 'label-match': if(record&&!record.archived)openModal(()=>match(record,el.dataset.product)); break;
      case 'label-suggestions': matching.suggestions.forEach(id=>matching.ids.add(id)); $('#label-product-options').innerHTML=matchingChoices();matchSummary();break;
      case 'label-archive': if(record)openModal(()=>modal('Archive label?',`<p>End ${record.productIds.length} active assignment(s) for <b>${h(record.name)}</b>. Keep all versions in the library. Product findings are not recalculated in this prototype.</p><div class="modal-actions">${button('Cancel','close')}${button('Archive sample label','label-confirm-archive','primary',attr(record))}</div>`));break;
      case 'label-confirm-archive': if(record){record.archived=true;record.productIds=[];close();redraw();notify('Sample label archived; product assignments removed.');}break;
      case 'label-restore': if(record){record.archived=false;if($('#dialog').open)close();filter='active';redraw();notify('Label restored without automatically restoring product assignments.');}break;
    }
    return true;
  }
  document.addEventListener('input',event=>{
    const target=event.target;
    if(target.id==='label-search'){query=target.value;$('#label-rows').innerHTML=tableRows();}
    if(target.id==='label-product-search'&&matching){matching.query=target.value;$('#label-product-options').innerHTML=matchingChoices();}
  });
  document.addEventListener('change',event=>{
    const target=event.target;
    if(target.id==='label-filter'){filter=target.value;$('#label-rows').innerHTML=tableRows();}
    if(target.id==='label-view-product'){const p=products().find(p=>p.id===target.value);if(p)$('#label-product-finding').innerHTML=finding(p);}
    if(target.dataset.labelProduct&&matching){if(target.checked)matching.ids.add(target.dataset.labelProduct);else matching.ids.delete(target.dataset.labelProduct);matchSummary();}
    if(target.id==='label-files'&&upload){
      upload.files=Array.from(target.files).map(file=>({name:file.name,panel:panels.find(p=>file.name.toUpperCase().endsWith('__'+p+'.'+file.name.split('.').pop().toUpperCase()))||'OTHER'}));
      $('#label-upload-panels').innerHTML=upload.files.map((file,index)=>`<label class="label-upload-panel"><span>${h(file.name)}</span><select aria-label="Panel for ${h(file.name)}" data-label-panel="${index}">${panels.map(p=>`<option ${file.panel===p?'selected':''} value="${p}">${panelText(p)}</option>`).join('')}</select></label>`).join('');
    }
    if(target.dataset.labelPanel!==undefined&&upload)upload.files[Number(target.dataset.labelPanel)].panel=target.value;
  });
  document.addEventListener('submit',event=>{
    if(event.target.id==='label-upload-form'){
      event.preventDefault();const name=$('#label-name').value.trim();
      if(!name||!upload?.files.length){$('#label-upload-error').textContent='Add a label name and at least one packaging file.';return;}
      if(upload.files.some(file=>! /\.(png|jpe?g|pdf)$/i.test(file.name))){$('#label-upload-error').textContent='Choose PNG, JPG or PDF files for this preview.';return;}
      let record=find(upload.recordId);const version={number:record?currentVersion(record).number+1:1,state:'Uploaded · not read',files:upload.files.map(f=>({...f}))};
      if(record){record.name=name;record.versions.unshift(version);record.updated='Just now';}
      else{record={id:'label-upload-'+(++sequence),name,productIds:[],archived:false,updated:'Just now',versions:[version]};records.push(record);}
      const productId=upload.productId;upload=null;query='';filter='active';close();redraw();
      modal('Label added to sample library',`<h3>${h(record.name)} · version ${version.number}</h3><p>${version.files.length} panels grouped into one record. Reading status is Uploaded · not read; no assessment was run.</p><div class="preserve">${record.productIds.length?'Existing assignments remain linked to this label.':'Needs assignment. Confirm the product before using this label as product evidence.'}</div><div class="modal-actions">${button('Done','close')}${button('Match products','label-match','blue',attr(record)+(productId?` data-product="${h(productId)}"`:''))}</div>`);
    }
    if(event.target.id==='label-match-form'){
      event.preventDefault();if(!matching)return;const record=find(matching.recordId);if(!record)return;
      const ids=[...matching.ids].filter(id=>products().some(p=>p.id===id));
      const conflicts=active().filter(r=>r.id!==record.id&&r.productIds.some(id=>ids.includes(id)));
      if(conflicts.length&&!$('#label-replace-consent')?.checked){$('#label-match-error').textContent='Confirm replacement of the existing label assignments.';return;}
      conflicts.forEach(r=>{r.productIds=r.productIds.filter(id=>!ids.includes(id));});
      record.productIds=ids;record.updated='Just now';matching=null;close();redraw();notify(ids.length?'Sample assignments saved. Reading state and product compliance are unchanged.':'Assignments removed. The label remains in the library.');
    }
  });
  return {reset,render,productCell,handleAction};
};
