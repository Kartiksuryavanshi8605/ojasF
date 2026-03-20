const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
// Add icons.js
html = html.replace(/<script src="app\.js"><\/script>/, '<script src="icons.js"></script>\n  <script src="app.js"></script>');
// Replace splash lotus
html = html.replace(/<div class="land-lotus" aria-hidden="true">🪷<\/div>/, '<div class="land-lotus" id="icon-lotus-1" aria-hidden="true"></div>');
// Replace name lotus
html = html.replace(/<div class="name-lotus" aria-hidden="true">🪷<\/div>/, '<div class="name-lotus" id="icon-lotus-2" aria-hidden="true"></div>');
// Replace pills
html = html.replace(/<span class="pill pill--vata">💨 Vata<\/span>/, '<span class="pill pill--vata" id="icon-pill-v"></span>');
html = html.replace(/<span class="pill pill--pitta">🔥 Pitta<\/span>/, '<span class="pill pill--pitta" id="icon-pill-p"></span>');
html = html.replace(/<span class="pill pill--kapha">🌿 Kapha<\/span>/, '<span class="pill pill--kapha" id="icon-pill-k"></span>');
// Replace features
html = html.replace(/<div class="feat"><span>📜<\/span><span>Classical<\/span><\/div>/, '<div class="feat"><span id="icon-feat-classical" class="icon-holder"></span><span>Classical</span></div>');
html = html.replace(/<div class="feat"><span>🔍<\/span><span>Dual Dosha<\/span><\/div>/, '<div class="feat"><span id="icon-feat-search" class="icon-holder"></span><span>Dual Dosha</span></div>');
html = html.replace(/<div class="feat"><span>🥗<\/span><span>Diet<\/span><\/div>/, '<div class="feat"><span id="icon-feat-diet" class="icon-holder"></span><span>Diet</span></div>');
html = html.replace(/<div class="feat"><span>🌅<\/span><span>Rhythm<\/span><\/div>/, '<div class="feat"><span id="icon-feat-rhythm" class="icon-holder"></span><span>Rhythm</span></div>');
html = html.replace(/<div class="feat"><span>⚠️<\/span><span>Imbalance<\/span><\/div>/, '<div class="feat"><span id="icon-feat-imbalance" class="icon-holder"></span><span>Imbalance</span></div>');
// Replace scores
html = html.replace(/<span class="dlive dlive--v" id="dl-v">💨 0<\/span>/, '<span class="dlive dlive--v" id="dl-v">0</span>');
html = html.replace(/<span class="dlive dlive--p" id="dl-p">🔥 0<\/span>/, '<span class="dlive dlive--p" id="dl-p">0</span>');
html = html.replace(/<span class="dlive dlive--k" id="dl-k">🌿 0<\/span>/, '<span class="dlive dlive--k" id="dl-k">0</span>');
// Replace empty q-icon text
html = html.replace(/<div class="q-icon-wrap" id="q-icon" aria-hidden="true">🌿<\/div>/, '<div class="q-icon-wrap" id="q-icon" aria-hidden="true"></div>');
fs.writeFileSync('index.html', html);


// 2. Update app.js
let app = fs.readFileSync('app.js', 'utf8');
app += `

/* ── Inject SVGs into UI ── */
document.addEventListener('DOMContentLoaded', () => {
  const i = (id, svg) => { const el = document.getElementById(id); if (el) el.innerHTML = svg; };
  i('icon-lotus-1', ICONS.lotus);
  i('icon-lotus-2', ICONS.lotus);
  i('icon-pill-v', ICONS.vata + ' Vata');
  i('icon-pill-p', ICONS.pitta + ' Pitta');
  i('icon-pill-k', ICONS.kapha + ' Kapha');
  i('icon-feat-classical', ICONS.classical);
  i('icon-feat-search', ICONS.search);
  i('icon-feat-diet', ICONS.diet);
  i('icon-feat-rhythm', ICONS.rhythm);
  i('icon-feat-imbalance', ICONS.imbalance);
  i('dl-v', ICONS.vata + ' 0');
  i('dl-p', ICONS.pitta + ' 0');
  i('dl-k', ICONS.kapha + ' 0');
});
`;
fs.writeFileSync('app.js', app);


// 3. Update style.css
let css = fs.readFileSync('style.css', 'utf8');
css += `

/* ── SVG Icons ── */
svg { width: 1.2em; height: 1.2em; vertical-align: middle; }
.icon-holder { display: inline-flex; align-items: center; justify-content: center; width: 1.5em; height: 1.5em; line-height: 1; }
.dual-hero-icon svg { width: 1em; height: 1em; }
`;
fs.writeFileSync('style.css', css);


// 4. Update quiz.js
let q = fs.readFileSync('quiz.js', 'utf8');
q = q.replace(/icon: '🦴'/g, 'icon: ICONS.frame');
q = q.replace(/icon: '👁️'/g, 'icon: ICONS.eyes');
q = q.replace(/icon: '🖐️'/g, 'icon: ICONS.skin');
q = q.replace(/icon: '🌡️'/g, 'icon: ICONS.temp');
q = q.replace(/icon: '⚡'/g, 'icon: ICONS.energy');
q = q.replace(/icon: '🦷'/g, 'icon: ICONS.joints');
q = q.replace(/icon: '🍽️'/g, 'icon: ICONS.hunger');
q = q.replace(/icon: '💤'/g, 'icon: ICONS.sleep');
q = q.replace(/icon: '💧'/g, 'icon: ICONS.sweat');
q = q.replace(/icon: '🗣️'/g, 'icon: ICONS.voice');
q = q.replace(/icon: '🌦️'/g, 'icon: ICONS.weather');
q = q.replace(/icon: '🚽'/g, 'icon: ICONS.digestion');
q = q.replace(/icon: '🧠'/g, 'icon: ICONS.learning');
q = q.replace(/icon: '🎯'/g, 'icon: ICONS.decisions');
q = q.replace(/icon: '😤'/g, 'icon: ICONS.stress');
q = q.replace(/icon: '🤝'/g, 'icon: ICONS.social');
q = q.replace(/icon: '💰'/g, 'icon: ICONS.money');
q = q.replace(/icon: '🌅'/g, 'icon: ICONS.mornings');

q = q.replace(/icon: '💨'/g, 'icon: ICONS.vata');
q = q.replace(/icon: '🔥'/g, 'icon: ICONS.pitta');
q = q.replace(/icon: '🌿'/g, 'icon: ICONS.kapha');

q = q.replace(/icon: '☀️'/g, 'icon: ICONS.summer');
q = q.replace(/icon: '❄️'/g, 'icon: ICONS.winter');
q = q.replace(/icon: '🍂'/g, 'icon: ICONS.season');
q = q.replace(/icon: '🌸'/g, 'icon: ICONS.flower');
q = q.replace(/icon: '🍃'/g, 'icon: ICONS.herb');
q = q.replace(/icon: '🌿'/g, 'icon: ICONS.herb'); // Generic herb icon
q = q.replace(/icon: '🍵'/g, 'icon: ICONS.tea');
q = q.replace(/icon: '🍯'/g, 'icon: ICONS.potion');
q = q.replace(/icon: '🌹'/g, 'icon: ICONS.flower');
q = q.replace(/icon: '💛'/g, 'icon: ICONS.herb');
q = q.replace(/icon: '🌱'/g, 'icon: ICONS.herb');

q = q.replace(/document\.getElementById\('q-icon'\)\.textContent = q\.icon;/g, 'document.getElementById(\'q-icon\').innerHTML = q.icon;');
q = q.replace(/flash\.textContent = \{ v: '💨', p: '🔥', k: '🌿' \}\[dosha\];/g, 'flash.innerHTML = { v: ICONS.vata, p: ICONS.pitta, k: ICONS.kapha }[dosha];');
q = q.replace(/document\.getElementById\('dl-v'\)\.textContent = `💨 \$\{App\.scores\.v\}`;/g, 'document.getElementById(\'dl-v\').innerHTML = `${ICONS.vata} ${App.scores.v}`;');
q = q.replace(/document\.getElementById\('dl-p'\)\.textContent = `🔥 \$\{App\.scores\.p\}`;/g, 'document.getElementById(\'dl-p\').innerHTML = `${ICONS.pitta} ${App.scores.p}`;');
q = q.replace(/document\.getElementById\('dl-k'\)\.textContent = `🌿 \$\{App\.scores\.k\}`;/g, 'document.getElementById(\'dl-k\').innerHTML = `${ICONS.kapha} ${App.scores.k}`;');

fs.writeFileSync('quiz.js', q);


// 5. Update result.js
let res = fs.readFileSync('result.js', 'utf8');

res = res.replace(/const icons = \{ v:'💨',   p:'🔥',   k:'🌿'   \};/, 'const icons = { v: ICONS.vata, p: ICONS.pitta, k: ICONS.kapha };');

// Hero section SVG replacements
res = res.replace(/<span class="dual-hero-icon">\$\{d\.icon\}<\/span>/g, '<span class="dual-hero-icon">${d.icon}</span>');
res = res.replace(/<span class="res-dosha-icon" aria-hidden="true">\$\{d\.icon\}<\/span>/, '<span class="res-dosha-icon" aria-hidden="true">${d.icon}</span>');

// Tab icons
res = res.replace(/\$\{d\.icon\} \$\{d\.name\}/g, '${d.icon} ${d.name}');
res = res.replace(/\$\{s\.icon\} \$\{s\.name\}/g, '${s.icon} ${s.name}');

// Score row and bar labels
res = res.replace(/💨 Vata/g, '${ICONS.vata} Vata');
res = res.replace(/🔥 Pitta/g, '${ICONS.pitta} Pitta');
res = res.replace(/🌿 Kapha/g, '${ICONS.kapha} Kapha');

// Other specific icons
res = res.replace(/🔍/g, '${ICONS.search}');
res = res.replace(/⚠️/g, '${ICONS.imbalance}');
res = res.replace(/🥗/g, '${ICONS.diet}');
res = res.replace(/🌅/g, '${ICONS.rhythm}');
res = res.replace(/🏃/g, '${ICONS.exercise}');
res = res.replace(/🕐/g, '${ICONS.rhythm}');
res = res.replace(/🌿/g, '${ICONS.kapha}'); // The classical herbs uses 🌿 originally
res = res.replace(/🍂/g, '${ICONS.season}');
res = res.replace(/🔗/g, '${ICONS.share}');
res = res.replace(/📊/g, '${ICONS.chart}');

// Classical note
res = res.replace(/📜/g, '${ICONS.classical}');

fs.writeFileSync('result.js', res);

console.log('Done!');
