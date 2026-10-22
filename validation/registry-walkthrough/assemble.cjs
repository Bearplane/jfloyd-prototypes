// Copy only approved synthetic actual-application captures. No private runtime input.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'../..'),source=process.env.REGISTRY_CAPTURE_ROOT;
if(!source)throw Error('Set REGISTRY_CAPTURE_ROOT to the October 22 platform-preview folder');
const dest=path.join(root,'qredible/registry-user-journeys/assets');fs.mkdirSync(dest,{recursive:true});
const names=fs.readdirSync(source).filter(n=>/^(before|after)-[a-z-]+\.png$/.test(n)&&!/^before-(processor|invite)/.test(n));
if(names.length!==29)throw Error('Expected 29 approved captures; found '+names.length);
const images=names.map(name=>{const bytes=fs.readFileSync(path.join(source,name));fs.writeFileSync(path.join(dest,name),bytes);return {file:'assets/'+name,bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex'),environment:'Full local Next/Nest application; synthetic review fixtures',captured:'2026-10-22',mode:name.startsWith('before-')?'Baseline (flag OFF)':'Registry design preview (flag ON)'};});
fs.writeFileSync(path.join(root,'qredible/registry-user-journeys/capture-manifest.json'),JSON.stringify({captured:'2026-10-22',images,unchangedOriginalBytes:true,excluded:'Raw before-processor/before-invite images and warming Settings screenshot; private runtime, logs, credentials and production exports excluded'},null,2));
const coverage=JSON.parse(fs.readFileSync(path.join(__dirname,'coverage-map.json'),'utf8'));
fs.writeFileSync(path.join(dest,'../coverage.json'),JSON.stringify(coverage,null,2));
fs.writeFileSync(path.join(dest,'../coverage.js'),'window.REGISTRY_COVERAGE='+JSON.stringify(coverage)+';\n');
console.log(JSON.stringify({images:images.length,unchangedBytes:true,sourceFiles:coverage.files.length}));
