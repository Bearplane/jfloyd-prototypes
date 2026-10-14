'use strict';
const D = window.JOURNEYS;
const $ = id => document.getElementById(id);
const paths = {
  all: D.chapters.map(c => c.id),
  merchant: ['paywall','fully-funded','shared-cost','already-paying','annual-handoff','cancel-funded','cancel-scheduled','other-allocations','notices'],
  copy: ['layout-copy','card-copy','savings-copy','qconfig-programs','program-lifecycle','assignment','sponsor-codes','funding-amendments'],
  finance: ['invoice','settlement','processor-card','payment-correction','supplemental-invoice','reporting','notices']
};
let ci = 0, si = 0, tour = 'all', grid = false, zoom = false;
const buttons = [];
const visible = () => D.chapters.map((c,i) => paths[tour].includes(c.id) ? i : -1).filter(i => i >= 0);
D.chapters.forEach((c,i) => {
  const b = document.createElement('button'), n = document.createElement('span'), label = document.createElement('span'), sub = document.createElement('small');
  b.type = 'button'; n.className = 'number'; n.textContent = String(i+1).padStart(2,'0'); label.textContent = c.title; sub.textContent = c.slides.length+' screens · '+c.audience;
  label.append(sub); b.append(n,label); b.onclick = () => go(i,0); $('chapters').append(b); buttons.push(b);
});
$('summary').textContent = D.chapters.length+' journeys · '+D.total+' application captures · wording & lifecycle review';
$('coverage').textContent = D.coverage;
for (const [label,url] of D.sources) { const a = document.createElement('a'); a.href=url; a.textContent=label; a.target='_blank'; a.rel='noopener'; $('sources').append(a); }
function updateJourneys() {
  const ids = visible(); $('journey').replaceChildren();
  buttons.forEach((b,i) => b.hidden = !ids.includes(i));
  ids.forEach(i => $('journey').add(new Option((i+1)+'. '+D.chapters[i].title,i)));
}
function render() {
  const c = D.chapters[ci], s = c.slides[si], ids = visible(), e = s.evidence;
  buttons.forEach((b,i) => b.setAttribute('aria-current',String(i===ci)));
  $('journey').value=ci; $('tour').value=tour;
  $('audience').textContent='Journey '+String(ci+1).padStart(2,'0')+' · '+c.audience;
  $('title').textContent=c.title; $('route').textContent=c.route;
  $('step').replaceChildren(); c.slides.forEach((s,i) => $('step').add(new Option((i+1)+'. '+s.title,i))); $('step').value=si;
  $('shot').src=s.src; $('shot').alt=s.title+' — '+s.caption; $('slide-title').textContent=(si+1)+'. '+s.title; $('caption').textContent=s.caption;
  $('evidence-label').textContent=e.label; $('evidence-label').className='badge'+(e.label.startsWith('Fresh')?' fresh':e.label.includes('local')?' local':'');
  $('capture-date').textContent=e.date; $('boundary').textContent=e.note;
  $('original').href=s.src; $('download').href=s.src;
  $('count').textContent=(si+1)+' / '+c.slides.length;
  const offset=D.chapters.slice(0,ci).reduce((n,c)=>n+c.slides.length,0)+si+1;
  $('position').textContent='Capture '+offset+' of '+D.total+' · Collection updated October 14, 2026';
  $('progress').style.width=(offset/D.total*100)+'%';
  $('prev').disabled=ci===ids[0]&&si===0; $('next').disabled=ci===ids[ids.length-1]&&si===c.slides.length-1;
  $('stage').classList.toggle('read',zoom); $('zoom').setAttribute('aria-pressed',String(zoom)); $('zoom').textContent=zoom?'Fit screen':'Read text';
  $('main').classList.toggle('overview',grid); $('grid').setAttribute('aria-pressed',String(grid)); $('grid').textContent=grid?'Single screen':'All steps';
  $('note-title').textContent=c.summary; $('configurable').textContent=c.configurable; $('review').textContent=c.review;
  $('terms').replaceChildren(); for (const term of c.terms) { const chip=document.createElement('span'); chip.textContent=term; $('terms').append(chip); }
  $('link-status').textContent=''; $('thumbs').replaceChildren();
  if(grid)c.slides.forEach((s,i)=>{const b=document.createElement('button'),img=document.createElement('img'),label=document.createElement('span');img.src=s.src;img.alt='';img.loading='lazy';label.textContent=(i+1)+'. '+s.title;b.append(img,label);b.onclick=()=>{grid=false;go(ci,i)};$('thumbs').append(b)});
  const hash=new URLSearchParams({chapter:c.id,step:String(si+1)}); if(tour!=='all')hash.set('tour',tour);
  history.replaceState(null,'','#'+hash);
}
function go(c,s) { ci=c; si=s; $('stage').scrollTo(0,0); render(); }
function move(delta) {
  const ids=visible(); let c=ci,s=si+delta,idx=ids.indexOf(c);
  if(s<0){if(idx===0)return;c=ids[idx-1];s=D.chapters[c].slides.length-1;}
  if(s>=D.chapters[c].slides.length){if(idx===ids.length-1)return;c=ids[idx+1];s=0;}
  go(c,s);
}
function presentation(force) { const enabled=force??!document.body.classList.contains('presenting'); document.body.classList.toggle('presenting',enabled);$('present').setAttribute('aria-pressed',String(enabled));$('present').textContent=enabled?'Exit presentation':'Present ⛶'; }
$('prev').onclick=()=>move(-1); $('next').onclick=()=>move(1);
$('journey').onchange=e=>go(+e.target.value,0); $('step').onchange=e=>go(ci,+e.target.value);
$('tour').onchange=e=>{tour=e.target.value;updateJourneys();if(!visible().includes(ci)){ci=visible()[0];si=0;}render();};
$('grid').onclick=()=>{grid=!grid;render();}; $('zoom').onclick=()=>{zoom=!zoom;render();}; $('present').onclick=()=>presentation();
$('about').onclick=()=>$('evidence').showModal(); $('copyguide').onclick=()=>$('guide').showModal();
document.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>$(b.dataset.close).close());
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{tour='all';updateJourneys();grid=false;go(D.chapters.findIndex(c=>c.id===b.dataset.go),Number(b.dataset.slide||1)-1);$('guide').close();});
$('copylink').onclick=async()=>{try{await navigator.clipboard.writeText(location.href);$('link-status').textContent='Link copied';}catch{$('link-status').textContent='Copy the current URL from your address bar.';}};
document.addEventListener('keydown',e=>{
  if($('guide').open||$('evidence').open||['INPUT','SELECT','TEXTAREA'].includes(e.target.tagName))return;
  if(e.key==='ArrowRight'){e.preventDefault();move(1);} if(e.key==='ArrowLeft'){e.preventDefault();move(-1);}
  if(e.key.toLowerCase()==='f')presentation(); if(e.key==='Escape')presentation(false);
});
const hash=new URLSearchParams(location.hash.slice(1));
if(paths[hash.get('tour')])tour=hash.get('tour');
const chapterId=D.chapters.findIndex(c=>c.id===hash.get('chapter'));
const numeric=Number(hash.get('journey'))-1;
if(chapterId>=0)ci=chapterId;else if(Number.isInteger(numeric)&&numeric>=0&&numeric<D.chapters.length)ci=numeric;
if(!visible().includes(ci))tour='all';
const step=Number(hash.get('step'))-1;if(Number.isInteger(step)&&step>=0&&step<D.chapters[ci].slides.length)si=step;
updateJourneys();render();
