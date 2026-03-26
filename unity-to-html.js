#!/usr/bin/env node
// unity-to-html.js
// Converts ui-hierarchy.json (exported from UISceneHierarchyExporter.cs) into
// a pixel-accurate HTML implementation spec with Unity Inspector panel.
//
// Usage:
//   node unity-to-html.js --scene UIKingdomHerald --input ui-hierarchy.json --output kingdom-herald-spec.html
//   node unity-to-html.js --scene UIPlayerPanel --input ui-hierarchy.json --output player-panel-spec.html
//   node unity-to-html.js --list --input ui-hierarchy.json   (list available scenes)
//
// Options:
//   --scene <name>    Scene name to export (from ALL_UI_SCENES list)
//   --input <path>    Path to ui-hierarchy.json
//   --output <path>   Output HTML path (default: <scene>-spec.html)
//   --list            List all available scenes in the JSON
//   --canvas-width    Base canvas width (default: 1920)
//   --canvas-height   Base canvas height (default: 1080)

const fs = require('fs');
const path = require('path');

// ── CLI argument parsing ──────────────────────────────────────────────────────
const args = process.argv.slice(2);
const opts = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : true;
    opts[key] = val;
  }
}

const inputPath  = opts.input  || 'ui-hierarchy.json';
const sceneName  = opts.scene  || null;
const outputPath = opts.output || (sceneName ? `${sceneName}-spec.html` : 'ui-spec.html');
const CANVAS_W   = parseInt(opts['canvas-width']  || '1920', 10);
const CANVAS_H   = parseInt(opts['canvas-height'] || '1080', 10);

if (!fs.existsSync(inputPath)) {
  console.error(`❌ Input file not found: ${inputPath}`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// ── List mode ─────────────────────────────────────────────────────────────────
if (opts.list) {
  console.log(`\nAvailable scenes in ${inputPath}:`);
  data.scenes.forEach((s, i) => {
    const count = countNodes(s.rootObjects);
    console.log(`  ${String(i + 1).padStart(3)}. ${s.sceneName.padEnd(40)} (${count} nodes)`);
  });
  console.log(`\nTotal: ${data.scenes.length} scenes\n`);
  process.exit(0);
}

if (!sceneName) {
  console.error('❌ --scene <name> is required. Use --list to see available scenes.');
  process.exit(1);
}

const sceneData = data.scenes.find(s => s.sceneName === sceneName);
if (!sceneData) {
  console.error(`❌ Scene "${sceneName}" not found. Use --list to see available scenes.`);
  process.exit(1);
}

// ── Utility functions ─────────────────────────────────────────────────────────

function countNodes(nodes) {
  if (!nodes) return 0;
  return nodes.reduce((sum, n) => sum + 1 + countNodes(n.children), 0);
}

/** Flatten all nodes with unique IDs */
let nodeIdCounter = 0;
function flattenNodes(nodes, parentId = null) {
  const result = [];
  (nodes || []).forEach(node => {
    const id = nodeIdCounter++;
    result.push({ id, parentId, node });
    flattenNodes(node.children, id).forEach(n => result.push(n));
  });
  return result;
}

/** Unity RectTransform → CSS */
function unityToCSS(node, parentWidth, parentHeight) {
  const rt = node.rectTransform;
  if (!rt) return { position: 'absolute', left: '0px', top: '0px', width: '100%', height: '100%' };

  // Anchors at same point → absolute pos + sizeDelta
  if (Math.abs(rt.anchorMin[0] - rt.anchorMax[0]) < 0.001 && Math.abs(rt.anchorMin[1] - rt.anchorMax[1]) < 0.001) {
    const anchorX = rt.anchorMin[0] * parentWidth;
    const anchorY = rt.anchorMin[1] * parentHeight;
    const w = rt.sizeDelta[0];
    const h = rt.sizeDelta[1];
    const left = anchorX + rt.anchoredPosition[0] - rt.pivot[0] * w;
    const top  = parentHeight - anchorY - rt.anchoredPosition[1] - (1 - rt.pivot[1]) * h;
    return {
      position: 'absolute',
      left:   Math.round(left) + 'px',
      top:    Math.round(top)  + 'px',
      width:  Math.round(w)    + 'px',
      height: Math.round(h)    + 'px',
    };
  }

  // Stretched anchors → use offsetMin/offsetMax
  const l = rt.anchorMin[0] * parentWidth  + rt.offsetMin[0];
  const r = rt.anchorMax[0] * parentWidth  + rt.offsetMax[0];
  const b = rt.anchorMin[1] * parentHeight + rt.offsetMin[1];
  const t = rt.anchorMax[1] * parentHeight + rt.offsetMax[1];
  const w = r - l;
  const h = t - b;
  const cssTop = parentHeight - t;
  return {
    position: 'absolute',
    left:   Math.round(l)      + 'px',
    top:    Math.round(cssTop) + 'px',
    width:  Math.round(w)      + 'px',
    height: Math.round(h)      + 'px',
  };
}

/** Float[4] → CSS hex color */
function floatToHex(arr) {
  if (!arr || arr.length < 3) return '#ffffff';
  const r = Math.round(arr[0] * 255);
  const g = Math.round(arr[1] * 255);
  const b = Math.round(arr[2] * 255);
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function floatToRGBA(arr) {
  if (!arr || arr.length < 4) return 'rgba(255,255,255,1)';
  const r = Math.round(arr[0] * 255);
  const g = Math.round(arr[1] * 255);
  const b = Math.round(arr[2] * 255);
  const a = (arr[3] || 1).toFixed(2);
  return `rgba(${r},${g},${b},${a})`;
}

function bool(v) { return v ? '✓' : '✗'; }
function fmt(v) { return v === null || v === undefined ? '—' : v; }

/** Generate inspector HTML for a node */
function buildInspectorHTML(node) {
  const n = node.node;
  let html = '';

  // Header
  html += `<div class="insp-header">`;
  html += `<div class="insp-go-name">${escHtml(n.name)}</div>`;
  html += `<div class="insp-meta">`;
  html += `<span class="insp-label">Prefab</span> <span class="insp-val">${n.prefabSource ? `<span title="${escHtml(n.prefabSource)}">${escHtml(path.basename(n.prefabSource || ''))}</span>` : '—'}</span>`;
  html += ` &nbsp; <span class="insp-label">Active</span> <span class="insp-val ${n.activeSelf ? 'val-true' : 'val-false'}">${bool(n.activeSelf)}</span>`;
  html += ` &nbsp; <span class="insp-label">Tag</span> <span class="insp-val">${escHtml(n.tag || 'Untagged')}</span>`;
  html += `</div></div>`;

  // RectTransform
  if (n.rectTransform) {
    const rt = n.rectTransform;
    html += inspSection('RectTransform', `
      <div class="insp-row"><span class="insp-label">Pos X</span><span class="insp-val">${rt.anchoredPosition[0].toFixed(1)}</span>
        <span class="insp-label">Pos Y</span><span class="insp-val">${rt.anchoredPosition[1].toFixed(1)}</span></div>
      <div class="insp-row"><span class="insp-label">Width</span><span class="insp-val">${rt.sizeDelta[0].toFixed(1)}</span>
        <span class="insp-label">Height</span><span class="insp-val">${rt.sizeDelta[1].toFixed(1)}</span></div>
      <div class="insp-row"><span class="insp-label">Anchor Min</span><span class="insp-val">(${rt.anchorMin[0].toFixed(2)}, ${rt.anchorMin[1].toFixed(2)})</span>
        <span class="insp-label">Max</span><span class="insp-val">(${rt.anchorMax[0].toFixed(2)}, ${rt.anchorMax[1].toFixed(2)})</span></div>
      <div class="insp-row"><span class="insp-label">Pivot</span><span class="insp-val">(${rt.pivot[0].toFixed(2)}, ${rt.pivot[1].toFixed(2)})</span></div>
      <div class="insp-row"><span class="insp-label">Offset Min</span><span class="insp-val">(${rt.offsetMin[0].toFixed(1)}, ${rt.offsetMin[1].toFixed(1)})</span>
        <span class="insp-label">Max</span><span class="insp-val">(${rt.offsetMax[0].toFixed(1)}, ${rt.offsetMax[1].toFixed(1)})</span></div>
    `);
  }

  // Image
  if (n.image) {
    const im = n.image;
    const hex = floatToHex(im.color);
    const alpha = im.color ? im.color[3].toFixed(2) : '1.00';
    html += inspSection('Image', `
      <div class="insp-row"><span class="insp-label">Sprite</span><span class="insp-val">${escHtml(im.spriteName || '(none)')}</span></div>
      ${im.spritePath ? `<div class="insp-row"><span class="insp-label">Path</span><span class="insp-val insp-path">${escHtml(im.spritePath)}</span></div>` : ''}
      <div class="insp-row"><span class="insp-label">Color</span>
        <span class="insp-val"><span class="color-swatch" style="background:${hex}"></span>${hex} <span class="insp-muted">(α ${alpha})</span></span></div>
      <div class="insp-row"><span class="insp-label">Type</span><span class="insp-val">${escHtml(im.imageType || '—')}</span>
        <span class="insp-label">Raycast</span><span class="insp-val ${im.raycastTarget ? 'val-true' : 'val-false'}">${bool(im.raycastTarget)}</span></div>
      <div class="insp-row"><span class="insp-label">Preserve Aspect</span><span class="insp-val">${bool(im.preserveAspect)}</span></div>
    `);
  }

  // LayoutGroup
  if (n.layoutGroup) {
    const lg = n.layoutGroup;
    html += inspSection((lg.type === 'vertical' ? 'Vertical' : 'Horizontal') + 'LayoutGroup', `
      <div class="insp-row"><span class="insp-label">Spacing</span><span class="insp-val">${lg.spacing}</span></div>
      <div class="insp-row"><span class="insp-label">Padding</span><span class="insp-val">T:${lg.paddingTop} B:${lg.paddingBottom} L:${lg.paddingLeft} R:${lg.paddingRight}</span></div>
      <div class="insp-row"><span class="insp-label">Child Alignment</span><span class="insp-val">${escHtml(lg.childAlignment)}</span></div>
      <div class="insp-row"><span class="insp-label">Control W</span><span class="insp-val ${lg.controlChildWidth ? 'val-true' : 'val-false'}">${bool(lg.controlChildWidth)}</span>
        <span class="insp-label">Control H</span><span class="insp-val ${lg.controlChildHeight ? 'val-true' : 'val-false'}">${bool(lg.controlChildHeight)}</span></div>
      <div class="insp-row"><span class="insp-label">Force Expand W</span><span class="insp-val ${lg.childForceExpandWidth ? 'val-true' : 'val-false'}">${bool(lg.childForceExpandWidth)}</span>
        <span class="insp-label">Force Expand H</span><span class="insp-val ${lg.childForceExpandHeight ? 'val-true' : 'val-false'}">${bool(lg.childForceExpandHeight)}</span></div>
    `);
  }

  // TextMeshPro
  if (n.tmpText) {
    const t = n.tmpText;
    const hex = floatToHex(t.color);
    const alpha = t.color ? t.color[3].toFixed(2) : '1.00';
    html += inspSection('TextMeshProUGUI', `
      <div class="insp-row"><span class="insp-label">Text</span><span class="insp-val insp-text-val">"${escHtml(t.text || '')}"</span></div>
      <div class="insp-row"><span class="insp-label">Font Size</span><span class="insp-val">${t.fontSize}</span>
        <span class="insp-label">Style</span><span class="insp-val">${escHtml(t.fontStyle || 'Normal')}</span></div>
      <div class="insp-row"><span class="insp-label">Color</span>
        <span class="insp-val"><span class="color-swatch" style="background:${hex}"></span>${hex} <span class="insp-muted">(α ${alpha})</span></span></div>
      <div class="insp-row"><span class="insp-label">Alignment</span><span class="insp-val">${escHtml(t.alignment || '—')}</span></div>
      <div class="insp-row"><span class="insp-label">Auto Size</span><span class="insp-val ${t.autoSizeText ? 'val-true' : 'val-false'}">${bool(t.autoSizeText)}</span>
        ${t.autoSizeText ? `<span class="insp-label">Min</span><span class="insp-val">${t.fontSizeMin}</span><span class="insp-label">Max</span><span class="insp-val">${t.fontSizeMax}</span>` : ''}</div>
    `);
  }

  // Button
  if (n.button) {
    const b = n.button;
    html += inspSection('Button', `
      <div class="insp-row"><span class="insp-label">Transition</span><span class="insp-val">${escHtml(b.transitionType || '—')}</span></div>
      ${b.normalColor ? `<div class="insp-row">
        <span class="insp-label">Normal</span><span class="insp-val"><span class="color-swatch" style="background:${floatToHex(b.normalColor)}"></span>${floatToHex(b.normalColor)}</span>
        <span class="insp-label">Hover</span><span class="insp-val"><span class="color-swatch" style="background:${floatToHex(b.highlightedColor)}"></span>${floatToHex(b.highlightedColor)}</span></div>
      <div class="insp-row">
        <span class="insp-label">Pressed</span><span class="insp-val"><span class="color-swatch" style="background:${floatToHex(b.pressedColor)}"></span>${floatToHex(b.pressedColor)}</span>
        <span class="insp-label">Disabled</span><span class="insp-val"><span class="color-swatch" style="background:${floatToHex(b.disabledColor)}"></span>${floatToHex(b.disabledColor)}</span></div>` : ''}
    `);
  }

  // CanvasGroup
  if (n.canvasGroup) {
    const cg = n.canvasGroup;
    html += inspSection('CanvasGroup', `
      <div class="insp-row"><span class="insp-label">Alpha</span><span class="insp-val">${cg.alpha.toFixed(2)}</span></div>
      <div class="insp-row"><span class="insp-label">Interactable</span><span class="insp-val ${cg.interactable ? 'val-true' : 'val-false'}">${bool(cg.interactable)}</span>
        <span class="insp-label">Blocks Raycasts</span><span class="insp-val ${cg.blocksRaycasts ? 'val-true' : 'val-false'}">${bool(cg.blocksRaycasts)}</span></div>
    `);
  }

  // ContentSizeFitter
  if (n.contentSizeFitter) {
    const csf = n.contentSizeFitter;
    html += inspSection('ContentSizeFitter', `
      <div class="insp-row"><span class="insp-label">Horizontal Fit</span><span class="insp-val">${escHtml(csf.horizontalFit)}</span></div>
      <div class="insp-row"><span class="insp-label">Vertical Fit</span><span class="insp-val">${escHtml(csf.verticalFit)}</span></div>
    `);
  }

  // LayoutElement
  if (n.layoutElement) {
    const le = n.layoutElement;
    html += inspSection('LayoutElement', `
      <div class="insp-row"><span class="insp-label">Min W</span><span class="insp-val">${le.minWidth}</span>
        <span class="insp-label">Min H</span><span class="insp-val">${le.minHeight}</span></div>
      <div class="insp-row"><span class="insp-label">Pref W</span><span class="insp-val">${le.preferredWidth}</span>
        <span class="insp-label">Pref H</span><span class="insp-val">${le.preferredHeight}</span></div>
      <div class="insp-row"><span class="insp-label">Flex W</span><span class="insp-val">${le.flexibleWidth}</span>
        <span class="insp-label">Flex H</span><span class="insp-val">${le.flexibleHeight}</span></div>
      <div class="insp-row"><span class="insp-label">Ignore Layout</span><span class="insp-val ${le.ignoreLayout ? 'val-true' : 'val-false'}">${bool(le.ignoreLayout)}</span></div>
    `);
  }

  // Canvas
  if (n.canvas) {
    const c = n.canvas;
    html += inspSection('Canvas', `
      <div class="insp-row"><span class="insp-label">Override Sorting</span><span class="insp-val ${c.overrideSorting ? 'val-true' : 'val-false'}">${bool(c.overrideSorting)}</span></div>
      <div class="insp-row"><span class="insp-label">Sorting Order</span><span class="insp-val">${c.sortingOrder}</span></div>
    `);
  }

  // ScrollRect
  if (n.scrollRect) {
    const sr = n.scrollRect;
    html += inspSection('ScrollRect', `
      <div class="insp-row"><span class="insp-label">Horizontal</span><span class="insp-val ${sr.horizontal ? 'val-true' : 'val-false'}">${bool(sr.horizontal)}</span>
        <span class="insp-label">Vertical</span><span class="insp-val ${sr.vertical ? 'val-true' : 'val-false'}">${bool(sr.vertical)}</span></div>
      <div class="insp-row"><span class="insp-label">Movement</span><span class="insp-val">${escHtml(sr.movementType)}</span>
        <span class="insp-label">Elasticity</span><span class="insp-val">${sr.elasticity.toFixed(2)}</span></div>
      <div class="insp-row"><span class="insp-label">Inertia</span><span class="insp-val ${sr.inertia ? 'val-true' : 'val-false'}">${bool(sr.inertia)}</span></div>
    `);
  }

  // Toggle
  if (n.toggle) {
    const tg = n.toggle;
    html += inspSection('Toggle', `
      <div class="insp-row"><span class="insp-label">Is On</span><span class="insp-val ${tg.isOn ? 'val-true' : 'val-false'}">${bool(tg.isOn)}</span></div>
      ${tg.toggleGroup ? `<div class="insp-row"><span class="insp-label">Toggle Group</span><span class="insp-val">${escHtml(tg.toggleGroup)}</span></div>` : ''}
    `);
  }

  // MonoBehaviours (non-Unity built-ins)
  const builtins = new Set([
    'RectTransform','Transform','Image','CanvasGroup','TextMeshProUGUI','Button',
    'ContentSizeFitter','LayoutElement','Canvas','ScrollRect','Toggle',
    'VerticalLayoutGroup','HorizontalLayoutGroup','CanvasScaler','GraphicRaycaster',
    'CanvasRenderer','Mask','RectMask2D','Scrollbar','InputField','TMP_InputField',
    'Dropdown','TMP_Dropdown','Slider','EventSystem','StandaloneInputModule','RawImage',
    'GridLayoutGroup','AspectRatioFitter'
  ]);
  const scripts = (n.components || []).filter(c => !builtins.has(c));
  if (scripts.length > 0) {
    const rows = scripts.map(s =>
      `<div class="insp-row script-row"><span class="insp-label">⚙</span>
       <span class="insp-val script-name">${escHtml(s)}</span>
       <span class="insp-muted script-note">Wire SerializeField refs in Inspector</span></div>`
    ).join('');
    html += inspSection('MonoBehaviours', rows, 'section-scripts');
  }

  return html;
}

function inspSection(title, content, extraClass = '') {
  return `<div class="insp-section ${extraClass}">
    <div class="insp-section-title">${escHtml(title)}</div>
    <div class="insp-section-body">${content}</div>
  </div>`;
}

function escHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

// ── Generate implementation checklist ─────────────────────────────────────────
function buildChecklist(flatNodes) {
  const items = [];
  const builtins = new Set([
    'RectTransform','Transform','Image','CanvasGroup','TextMeshProUGUI','Button',
    'ContentSizeFitter','LayoutElement','Canvas','ScrollRect','Toggle',
    'VerticalLayoutGroup','HorizontalLayoutGroup','CanvasScaler','GraphicRaycaster',
    'CanvasRenderer','Mask','RectMask2D','Scrollbar','InputField','TMP_InputField',
    'Dropdown','TMP_Dropdown','Slider','EventSystem','StandaloneInputModule','RawImage',
    'GridLayoutGroup','AspectRatioFitter'
  ]);

  flatNodes.forEach(({ node: n }) => {
    const scripts = (n.components || []).filter(c => !builtins.has(c));
    scripts.forEach(s => {
      items.push({
        label: `Wire <strong>${escHtml(s)}</strong> SerializeFields on <em>${escHtml(n.name)}</em>`,
        type: 'script'
      });
    });
    if (n.button) {
      items.push({ label: `Hook <strong>Button.onClick</strong> listener on <em>${escHtml(n.name)}</em>`, type: 'event' });
    }
    if (n.toggle) {
      items.push({ label: `Hook <strong>Toggle.onValueChanged</strong> on <em>${escHtml(n.name)}</em>`, type: 'event' });
    }
    if (n.scrollRect) {
      items.push({ label: `Assign <strong>ScrollRect.content</strong> reference on <em>${escHtml(n.name)}</em>`, type: 'ref' });
    }
    if (n.image && !n.image.spriteName) {
      items.push({ label: `Assign sprite to <strong>Image</strong> on <em>${escHtml(n.name)}</em>`, type: 'sprite' });
    }
    if (n.prefabSource) {
      items.push({ label: `Prefab instance: <em>${escHtml(n.name)}</em> → ${escHtml(path.basename(n.prefabSource))}`, type: 'prefab' });
    }
  });

  if (items.length === 0) return '<p class="checklist-empty">No action items detected.</p>';

  const icons = { script: '⚙', event: '⚡', ref: '🔗', sprite: '🖼', prefab: '📦' };
  return items.map((item, i) =>
    `<label class="checklist-item">
      <input type="checkbox" id="chk-${i}">
      <span class="chk-icon">${icons[item.type] || '□'}</span>
      <span class="chk-label">${item.label}</span>
    </label>`
  ).join('\n');
}

// ── Render nodes recursively as HTML elements ─────────────────────────────────
function renderNodes(nodes, parentWidth, parentHeight, depth = 0) {
  if (!nodes || nodes.length === 0) return '';
  let html = '';
  nodes.forEach(n => {
    const id = nodeIdCounter++;
    const css = unityToCSS(n, parentWidth, parentHeight);
    const styleStr = Object.entries(css).map(([k, v]) => `${camelToKebab(k)}:${v}`).join(';');

    let bgStyle = '';
    if (n.image && n.image.color) {
      const c = n.image.color;
      bgStyle = `background:${floatToRGBA(c)};`;
    }

    let textContent = '';
    if (n.tmpText && n.tmpText.text) {
      const t = n.tmpText;
      const tColor = floatToRGBA(t.color);
      textContent = `<div class="tmp-text" style="font-size:${t.fontSize * 0.5}px;color:${tColor};text-align:${tmpAlignToCSS(t.alignment)}">${escHtml(t.text)}</div>`;
    }

    const nodeData = escHtml(JSON.stringify({ id, name: n.name }));
    const childW = css.width  ? parseFloat(css.width)  : parentWidth;
    const childH = css.height ? parseFloat(css.height) : parentHeight;

    html += `<div class="ui-node" data-node-id="${id}" data-name="${escHtml(n.name)}" style="${styleStr};${bgStyle}" title="${escHtml(n.name)}">
      <div class="node-label">${escHtml(n.name)}</div>
      ${textContent}
      ${renderNodes(n.children, childW, childH, depth + 1)}
    </div>`;
  });
  return html;
}

function tmpAlignToCSS(alignment) {
  if (!alignment) return 'left';
  const a = alignment.toLowerCase();
  if (a.includes('center')) return 'center';
  if (a.includes('right')) return 'right';
  return 'left';
}

function camelToKebab(str) {
  return str.replace(/([A-Z])/g, m => '-' + m.toLowerCase());
}

// ── Build inspector data lookup ───────────────────────────────────────────────
nodeIdCounter = 0;
const flatNodes = flattenNodes(sceneData.rootObjects);
const nodeMap = {}; // id → {id, node}
flatNodes.forEach(fn => { nodeMap[fn.id] = fn; });

// Build inspector HTML for all nodes
const inspectorMap = {};
flatNodes.forEach(fn => {
  inspectorMap[fn.id] = buildInspectorHTML(fn);
});

const checklistHTML = buildChecklist(flatNodes);

// Reset counter for render pass
nodeIdCounter = 0;
const sceneHTML = renderNodes(sceneData.rootObjects, CANVAS_W, CANVAS_H);

// ── Generate full HTML page ───────────────────────────────────────────────────
const inspectorDataScript = `
const INSPECTOR_DATA = ${JSON.stringify(inspectorMap)};
const NODE_NAMES = ${JSON.stringify(Object.fromEntries(flatNodes.map(fn => [fn.id, fn.node.name])))};
`;

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>UI Spec: ${escHtml(sceneName)} — MGK</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg-deep: #0d0a06;
      --bg-panel: #111;
      --bg-card: #1a1008;
      --bg-inspector: #1e1e1e;
      --bg-inspector-header: #252525;
      --bg-inspector-section: #2a2a2a;
      --bg-inspector-section-title: #333;
      --border-gold: #8a6530;
      --border-gold-bright: #c8a050;
      --border-inspector: #3a3a3a;
      --text-primary: #f0e8d0;
      --text-gold: #c8a050;
      --text-muted: #8a7050;
      --text-code: #9cdcfe;
      --text-green: #4aaa60;
      --text-red: #f44747;
      --text-dim: #777;
      --insp-label: #9cdcfe;
      --insp-val: #ce9178;
      --insp-section-bg: #252525;
    }

    * { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      background: var(--bg-deep);
      color: var(--text-primary);
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      height: 100vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    /* ── Toolbar ── */
    .toolbar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 16px;
      background: #111;
      border-bottom: 1px solid #333;
      flex-shrink: 0;
      height: 44px;
    }

    .toolbar-title {
      font-size: 0.85rem;
      color: var(--text-gold);
      font-weight: 600;
      letter-spacing: 0.04em;
    }

    .toolbar-scene {
      font-size: 0.75rem;
      color: var(--text-dim);
      font-family: 'JetBrains Mono', monospace;
    }

    .toolbar-spacer { flex: 1; }

    .toolbar-btn {
      padding: 5px 12px;
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      border-radius: 3px;
      cursor: pointer;
      border: 1px solid var(--border-gold);
      background: transparent;
      color: var(--text-gold);
      transition: all 0.15s;
    }

    .toolbar-btn:hover {
      background: rgba(200,160,80,0.15);
      border-color: var(--border-gold-bright);
    }

    .toolbar-btn.active {
      background: rgba(200,160,80,0.2);
      border-color: var(--border-gold-bright);
    }

    /* ── Main layout ── */
    .main-layout {
      display: flex;
      flex: 1;
      overflow: hidden;
    }

    /* ── Scene viewport ── */
    .scene-viewport {
      flex: 1;
      overflow: hidden;
      position: relative;
      background: #0a0a12;
    }

    .scene-scaler {
      position: absolute;
      top: 50%;
      left: 50%;
      transform-origin: top left;
    }

    .scene-canvas {
      width: ${CANVAS_W}px;
      height: ${CANVAS_H}px;
      position: relative;
      overflow: hidden;
      background: #0d0d1a;
      box-shadow: 0 0 0 1px rgba(200,160,80,0.2), 0 0 60px rgba(0,0,0,0.8);
    }

    /* ── UI Nodes ── */
    .ui-node {
      position: absolute;
      pointer-events: all;
      cursor: pointer;
      border: 1px solid transparent;
      transition: border-color 0.1s;
    }

    .ui-node:hover > .node-label {
      opacity: 1;
    }

    .ui-node:hover {
      border-color: rgba(200,160,80,0.8) !important;
      z-index: 9999 !important;
    }

    .node-label {
      position: absolute;
      top: -18px;
      left: 0;
      font-size: 10px;
      font-family: 'JetBrains Mono', monospace;
      background: rgba(200,160,80,0.9);
      color: #000;
      padding: 1px 4px;
      border-radius: 2px;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      z-index: 10000;
      transition: opacity 0.15s;
    }

    .ui-node.selected {
      border-color: rgba(100,200,255,0.8) !important;
      box-shadow: inset 0 0 0 1px rgba(100,200,255,0.3);
    }

    .ui-node.selected > .node-label {
      opacity: 1;
      background: rgba(100,200,255,0.9);
    }

    /* Show all bounds mode */
    .show-bounds .ui-node {
      border-color: rgba(200,160,80,0.3) !important;
    }

    .tmp-text {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2px 4px;
      overflow: hidden;
      font-family: Georgia, serif;
      pointer-events: none;
    }

    /* ── Right panel ── */
    .right-panel {
      width: 340px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      border-left: 1px solid #333;
      background: var(--bg-inspector);
      overflow: hidden;
    }

    .panel-tabs {
      display: flex;
      border-bottom: 1px solid #333;
      flex-shrink: 0;
    }

    .panel-tab {
      flex: 1;
      padding: 8px;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      text-align: center;
      cursor: pointer;
      color: var(--text-dim);
      border-bottom: 2px solid transparent;
      transition: color 0.15s;
    }

    .panel-tab.active {
      color: var(--text-gold);
      border-bottom-color: var(--text-gold);
    }

    .panel-content {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .panel-content::-webkit-scrollbar { width: 6px; }
    .panel-content::-webkit-scrollbar-track { background: #1a1a1a; }
    .panel-content::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }

    .tab-pane { display: none; }
    .tab-pane.active { display: block; }

    /* ── Inspector styles ── */
    .insp-empty {
      padding: 32px 16px;
      text-align: center;
      color: var(--text-dim);
      font-size: 0.85rem;
      font-style: italic;
    }

    .insp-header {
      padding: 12px 14px;
      background: var(--bg-inspector-header);
      border-bottom: 1px solid #333;
    }

    .insp-go-name {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 4px;
      font-family: 'JetBrains Mono', monospace;
    }

    .insp-meta {
      font-size: 0.72rem;
      color: var(--text-dim);
    }

    .insp-section {
      border-bottom: 1px solid #333;
    }

    .insp-section-title {
      padding: 6px 14px;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-gold);
      background: var(--bg-inspector-section-title);
      letter-spacing: 0.04em;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .insp-section-title::before { content: '▾'; font-size: 0.6rem; }

    .insp-section-body {
      padding: 6px 14px 8px;
    }

    .insp-row {
      display: flex;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 4px 8px;
      margin-bottom: 3px;
      font-size: 0.78rem;
      line-height: 1.5;
    }

    .insp-label {
      color: var(--insp-label);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      min-width: 60px;
      flex-shrink: 0;
    }

    .insp-val {
      color: var(--insp-val);
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
    }

    .insp-path {
      font-size: 0.65rem;
      color: #888;
      word-break: break-all;
    }

    .insp-text-val {
      color: #ce9178;
      font-style: italic;
      max-width: 200px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .insp-muted { color: var(--text-dim); }

    .val-true  { color: var(--text-green) !important; }
    .val-false { color: var(--text-red)   !important; }

    .color-swatch {
      display: inline-block;
      width: 10px;
      height: 10px;
      border-radius: 2px;
      border: 1px solid rgba(255,255,255,0.2);
      vertical-align: middle;
      margin-right: 3px;
    }

    .section-scripts .insp-section-title { color: #dcdcaa; }
    .section-scripts .insp-section-title::before { content: '⚙'; }

    .script-name { color: #dcdcaa !important; font-weight: 600; }
    .script-note { color: #888; font-size: 0.68rem; display: block; padding-left: 68px; }

    /* ── Checklist ── */
    .checklist-container {
      padding: 12px 14px;
    }

    .checklist-title {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-gold);
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #333;
    }

    .checklist-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      padding: 5px 0;
      font-size: 0.78rem;
      line-height: 1.4;
      cursor: pointer;
      border-bottom: 1px solid #2a2a2a;
    }

    .checklist-item input[type="checkbox"] {
      flex-shrink: 0;
      margin-top: 2px;
      accent-color: var(--text-gold);
    }

    .chk-icon { flex-shrink: 0; font-size: 0.8rem; }

    .chk-label { color: #ccc; }
    .chk-label strong { color: #dcdcaa; }
    .chk-label em { color: #9cdcfe; font-style: normal; }

    .checklist-item:has(input:checked) .chk-label {
      text-decoration: line-through;
      opacity: 0.5;
    }

    .checklist-empty {
      color: var(--text-dim);
      font-size: 0.82rem;
      font-style: italic;
      padding: 16px 0;
    }

    /* ── Hierarchy tree ── */
    .hierarchy-tree {
      padding: 8px 0;
      font-size: 0.78rem;
      font-family: 'JetBrains Mono', monospace;
    }

    .hier-node {
      padding: 3px 8px 3px 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: background 0.1s;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .hier-node:hover { background: rgba(200,160,80,0.08); }
    .hier-node.selected { background: rgba(100,200,255,0.12); color: #9cdcfe; }

    .hier-indent { display: inline-block; }
    .hier-expand { color: #666; width: 12px; text-align: center; flex-shrink: 0; }
    .hier-icon { font-size: 0.7rem; flex-shrink: 0; }
    .hier-name { overflow: hidden; text-overflow: ellipsis; color: #ccc; }
    .hier-node.selected .hier-name { color: #9cdcfe; }

    .hier-inactive { opacity: 0.4; }

    /* ── Status bar ── */
    .status-bar {
      height: 24px;
      background: #007acc;
      display: flex;
      align-items: center;
      padding: 0 12px;
      gap: 16px;
      font-size: 0.7rem;
      color: white;
      flex-shrink: 0;
    }

    .status-item { opacity: 0.9; }
  </style>
</head>
<body>

  <!-- Toolbar -->
  <div class="toolbar">
    <span class="toolbar-title">🔬 UI Spec</span>
    <span class="toolbar-scene">${escHtml(sceneName)}</span>
    <div class="toolbar-spacer"></div>
    <button class="toolbar-btn" id="btn-bounds" onclick="toggleBounds()">Show All Bounds</button>
    <button class="toolbar-btn" onclick="printChecklist()">🖨 Print Checklist</button>
    <span class="toolbar-scene" style="color:#555">Canvas: ${CANVAS_W}×${CANVAS_H}</span>
  </div>

  <!-- Main -->
  <div class="main-layout">

    <!-- Scene viewport -->
    <div class="scene-viewport" id="viewport">
      <div class="scene-scaler" id="scaler">
        <div class="scene-canvas" id="scene-canvas">
          ${sceneHTML}
        </div>
      </div>
    </div>

    <!-- Right panel -->
    <div class="right-panel">
      <div class="panel-tabs">
        <div class="panel-tab active" onclick="switchTab('inspector')">Inspector</div>
        <div class="panel-tab" onclick="switchTab('hierarchy')">Hierarchy</div>
        <div class="panel-tab" onclick="switchTab('checklist')">Checklist</div>
      </div>

      <div class="panel-content">
        <!-- Inspector tab -->
        <div class="tab-pane active" id="tab-inspector">
          <div id="inspector-content">
            <div class="insp-empty">Click any element to inspect it.</div>
          </div>
        </div>

        <!-- Hierarchy tab -->
        <div class="tab-pane" id="tab-hierarchy">
          <div class="hierarchy-tree" id="hierarchy-tree">
            ${buildHierarchyHTML(sceneData.rootObjects, 0)}
          </div>
        </div>

        <!-- Checklist tab -->
        <div class="tab-pane" id="tab-checklist">
          <div class="checklist-container">
            <div class="checklist-title">Implementation Checklist — ${escHtml(sceneName)}</div>
            ${checklistHTML}
          </div>
        </div>
      </div>
    </div>

  </div>

  <!-- Status bar -->
  <div class="status-bar">
    <span class="status-item" id="status-selected">No selection</span>
    <span class="status-item">${flatNodes.length} nodes</span>
    <span class="status-item">Exported: ${data.exportedAt}</span>
  </div>

<script>
${inspectorDataScript}

// ── Scale scene to fit viewport ───────────────────────────────────────────────
function scaleScene() {
  const vp = document.getElementById('viewport');
  const scaler = document.getElementById('scaler');
  const vpW = vp.offsetWidth;
  const vpH = vp.offsetHeight;
  const canvasW = ${CANVAS_W};
  const canvasH = ${CANVAS_H};
  const scale = Math.min(vpW / canvasW, vpH / canvasH) * 0.95;
  const offsetX = (vpW - canvasW * scale) / 2;
  const offsetY = (vpH - canvasH * scale) / 2;
  scaler.style.transform = \`translate(\${offsetX}px, \${offsetY}px) scale(\${scale})\`;
}

window.addEventListener('resize', scaleScene);
scaleScene();

// ── Node click → inspector ────────────────────────────────────────────────────
let selectedId = null;

document.querySelectorAll('.ui-node').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = parseInt(el.dataset.nodeId, 10);
    selectNode(id, el);
  });
});

function selectNode(id, el) {
  // Deselect previous
  document.querySelectorAll('.ui-node.selected').forEach(n => n.classList.remove('selected'));
  document.querySelectorAll('.hier-node.selected').forEach(n => n.classList.remove('selected'));

  selectedId = id;

  if (el) el.classList.add('selected');

  // Sync hierarchy
  const hierNode = document.querySelector(\`.hier-node[data-node-id="\${id}"]\`);
  if (hierNode) {
    hierNode.classList.add('selected');
    hierNode.scrollIntoView({ block: 'nearest' });
  }

  // Update inspector
  const html = INSPECTOR_DATA[id];
  document.getElementById('inspector-content').innerHTML = html || '<div class="insp-empty">No data for this node.</div>';
  document.getElementById('status-selected').textContent = NODE_NAMES[id] || 'Unknown';

  // Switch to inspector tab
  switchTab('inspector');
}

// ── Hierarchy click ───────────────────────────────────────────────────────────
document.querySelectorAll('.hier-node').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = parseInt(el.dataset.nodeId, 10);
    const sceneNode = document.querySelector(\`.ui-node[data-node-id="\${id}"]\`);
    selectNode(id, sceneNode);
  });
});

// ── Tab switching ─────────────────────────────────────────────────────────────
function switchTab(name) {
  document.querySelectorAll('.panel-tab').forEach((t, i) => {
    const tabs = ['inspector', 'hierarchy', 'checklist'];
    t.classList.toggle('active', tabs[i] === name);
  });
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === 'tab-' + name);
  });
}

// ── Show all bounds toggle ────────────────────────────────────────────────────
let boundsOn = false;
function toggleBounds() {
  boundsOn = !boundsOn;
  document.getElementById('scene-canvas').classList.toggle('show-bounds', boundsOn);
  document.getElementById('btn-bounds').classList.toggle('active', boundsOn);
}

// ── Print checklist ───────────────────────────────────────────────────────────
function printChecklist() {
  switchTab('checklist');
  setTimeout(() => window.print(), 300);
}
</script>
</body>
</html>`;

function buildHierarchyHTML(nodes, depth) {
  if (!nodes || nodes.length === 0) return '';
  let html = '';
  let hierIdCounter = 0; // local, but we need global mapping
  // We re-walk and assign same IDs as render pass
  // Actually we need a separate counter aligned with the flat nodes
  // Use the flatNodes map instead
  nodes.forEach(n => {
    // Find node in flatNodes by name (may collide - use index approach)
    const fn = flatNodes.find(fn => fn.node === n);
    const id = fn ? fn.id : -1;
    const indent = '&nbsp;&nbsp;&nbsp;&nbsp;'.repeat(depth);
    const hasChildren = n.children && n.children.length > 0;
    const icon = n.button ? '🔘' : n.tmpText ? '📝' : n.image ? '🖼' : n.scrollRect ? '📜' : hasChildren ? '📁' : '▫';
    html += `<div class="hier-node ${n.activeSelf ? '' : 'hier-inactive'}" data-node-id="${id}" title="${escHtml(n.name)}">
      <span class="hier-indent">${indent}</span>
      <span class="hier-expand">${hasChildren ? '▾' : ' '}</span>
      <span class="hier-icon">${icon}</span>
      <span class="hier-name">${escHtml(n.name)}</span>
    </div>`;
    if (hasChildren) {
      html += buildHierarchyHTML(n.children, depth + 1);
    }
  });
  return html;
}

// Write output
fs.writeFileSync(outputPath, html, 'utf8');
console.log(`\n✅ Generated: ${outputPath}`);
console.log(`   Scene:  ${sceneName}`);
console.log(`   Nodes:  ${flatNodes.length}`);
console.log(`   Canvas: ${CANVAS_W}×${CANVAS_H}\n`);
