/* ═══════════════════════════════════════════════════════
   OJAS — result.js
   Builds the full result page from App.scores.
   Dual dosha: shows both doshas with tabbed sections.
═══════════════════════════════════════════════════════ */

function buildResult() {
  const tot = QUESTIONS.length;
  const sorted = Object.entries(App.scores).sort((a, b) => b[1] - a[1]);
  const dom = sorted[0][0];
  const sec = sorted[1][0];
  const domPct = Math.round((sorted[0][1] / tot) * 100);
  const secPct = Math.round((sorted[1][1] / tot) * 100);
  const isDual = secPct >= 28;
  const d = DOSHA[dom];
  const s = DOSHA[sec];

  // Persist
  localStorage.setItem('ojasPrakriti', dom);
  localStorage.setItem('ojasScores', JSON.stringify(App.scores));
  localStorage.setItem('ojasName', App.name);

  // Theme result screen by dominant dosha
  const screen = document.getElementById('screen-result');
  screen.className = 'screen active ' + d.themeClass;
  ['res-bg--vata', 'res-bg--pitta', 'res-bg--kapha'].forEach(c => screen.classList.remove(c));
  screen.classList.add(d.bgClass);

  const bV = Math.round((App.scores.v / tot) * 100);
  const bP = Math.round((App.scores.p / tot) * 100);
  const bK = Math.round((App.scores.k / tot) * 100);

  const names = { v: 'Vata', p: 'Pitta', k: 'Kapha' };
  const icons = { v: ICONS.vata, p: ICONS.pitta, k: ICONS.kapha };

  const shareURL = `${location.href.split('#')[0]}#r/${dom}/${App.scores.v}-${App.scores.p}-${App.scores.k}/${encodeURIComponent(App.name)}`;

  /* ── Hero HTML ── */
  const heroHTML = isDual ? `
    <p class="section-label">Namaste, ${App.name} 🙏</p>
    <div class="divider"></div>
    <div class="dual-hero-icons">
      <span class="dual-hero-icon">${d.icon}</span>
      <span class="dual-hero-sep">×</span>
      <span class="dual-hero-icon">${s.icon}</span>
    </div>
    <h1 class="res-name" style="color:var(--ink)">
      <span style="color:${d.color}">${d.name}</span>
      <span style="color:var(--ink4);font-weight:300"> – </span>
      <span style="color:${s.color}">${s.name}</span>
      <span style="display:block;font-family:'Lato',sans-serif;font-size:.68rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--ink3);margin-top:.45rem">Dual Dosha Prakriti</span>
    </h1>
    <p style="font-size:.83rem;color:var(--ink3);line-height:1.8;max-width:520px;margin:.6rem auto 1rem">
      Most people carry a <strong>dual dosha constitution</strong>. Your primary is
      <strong style="color:${d.color}">${d.name} (${domPct}%)</strong> with a significant secondary
      <strong style="color:${s.color}">${s.name} (${secPct}%)</strong>.
      Each section below shows guidance for <em>both</em> — switch tabs to see each dosha's recommendations.
    </p>
    <div class="score-row">
      <span class="sc sc--v ${dom === 'v' ? 'sc--dominant' : ''}">${ICONS.vata} Vata ${App.scores.v}/${tot}</span>
      <span class="sc sc--p ${dom === 'p' ? 'sc--dominant' : ''}">${ICONS.pitta} Pitta ${App.scores.p}/${tot}</span>
      <span class="sc sc--k ${dom === 'k' ? 'sc--dominant' : ''}">${ICONS.kapha} Kapha ${App.scores.k}/${tot}</span>
    </div>
    <div class="traits">
      ${d.traits.map(t => `<span class="trait ${d.traitClass}">${t}</span>`).join('')}
      ${s.traits.slice(0, 3).map(t => `<span class="trait ${s.traitClass}" style="opacity:.65">${t}</span>`).join('')}
    </div>
    <div class="dual-desc-grid">
      <div class="dual-desc-card dual-desc-card--dom">
        <span class="dual-desc-icon">${d.icon}</span>
        <strong style="color:${d.color}">${d.name} · Primary · ${domPct}%</strong>
        <p>${d.desc}</p>
        <p class="res-element" style="margin-top:.5rem;font-size:.72rem">${d.element}</p>
      </div>
      <div class="dual-desc-card dual-desc-card--sec">
        <span class="dual-desc-icon">${s.icon}</span>
        <strong style="color:${s.color}">${s.name} · Secondary · ${secPct}%</strong>
        <p>${s.desc}</p>
        <p class="res-element" style="margin-top:.5rem;font-size:.72rem">${s.element}</p>
      </div>
    </div>
  ` : `
    <p class="section-label">Namaste, ${App.name} 🙏</p>
    <div class="divider"></div>
    <span class="res-dosha-icon" aria-hidden="true">${d.icon}</span>
    <h1 class="res-name ${d.nameClass}">${d.label}</h1>
    <p class="res-element">${d.element}</p>
    <p style="font-size:.82rem;color:var(--ink3);line-height:1.75;max-width:460px;margin:.3rem auto .8rem">
      Your constitution shows strong single-dosha predominance (${domPct}% ${d.name}).
      Classical texts note this is relatively rare.
    </p>
    <p style="color:var(--ink2);font-size:.9rem;line-height:1.85;max-width:500px;margin:.5rem auto">${d.desc}</p>
    <div class="score-row">
      <span class="sc sc--v ${dom === 'v' ? 'sc--dominant' : ''}">${ICONS.vata} Vata ${App.scores.v}/${tot}</span>
      <span class="sc sc--p ${dom === 'p' ? 'sc--dominant' : ''}">${ICONS.pitta} Pitta ${App.scores.p}/${tot}</span>
      <span class="sc sc--k ${dom === 'k' ? 'sc--dominant' : ''}">${ICONS.kapha} Kapha ${App.scores.k}/${tot}</span>
    </div>
    <div class="traits">
      ${d.traits.map(t => `<span class="trait ${d.traitClass}">${t}</span>`).join('')}
    </div>
  `;

  /* ── Classical reference ── */
  const classicalNote = isDual ? `
    <div class="classical-note">
      ${ICONS.classical} <strong>${d.name}:</strong> ${d.classical}
      <br/><br/>
      ${ICONS.classical} <strong>${s.name}:</strong> ${s.classical}
    </div>` : `
    <div class="classical-note">${ICONS.classical} <strong>Classical Reference:</strong> ${d.classical}</div>`;

  /* ══════════════════════════════════════════════════
     HELPERS
  ══════════════════════════════════════════════════ */

  /* Unique tab-group ID */
  let _uid = 0;
  function uid() { return 'tg' + (++_uid); }

  /* Tabbed card — single dosha gets plain card, dual gets tabs */
  function dualCard(icon, title, singleBody, domBody, secBody, isOpen = false) {
    const openAttr = isOpen ? 'open' : '';
    if (!isDual) {
      return `
        <details class="ana-card" name="ayurvedic-insights" ${openAttr}>
          <summary class="card-head" style="cursor:pointer; list-style:none; margin-bottom:0; outline:none;">
            <div style="display:flex;align-items:center;gap:.6rem;flex:1"><span class="card-icon">${icon}</span><h3 class="card-title">${title}</h3></div>
            <span class="card-chevron" style="font-size:0.8rem;color:var(--ink3);">▼</span>
          </summary>
          <div class="card-body" style="padding-top:1.2rem;border-top:1px solid var(--border);margin-top:.8rem;">
            ${singleBody}
          </div>
        </details>`;
    }
    const id = uid();
    return `
      <details class="ana-card dual-tab-card" name="ayurvedic-insights" data-tg="${id}" ${openAttr}>
        <summary class="card-head" style="cursor:pointer; list-style:none; margin-bottom:0; outline:none;">
          <div style="display:flex;align-items:center;gap:.6rem;flex:1"><span class="card-icon">${icon}</span><h3 class="card-title">${title}</h3></div>
          <span class="card-chevron" style="font-size:0.8rem;color:var(--ink3);">▼</span>
        </summary>
        <div class="card-body" style="padding-top:1.2rem;border-top:1px solid var(--border);margin-top:.8rem;">
          <div class="dual-tabs" role="tablist" style="margin-top:0.2rem;">
            <button class="dual-tab active" role="tab" aria-selected="true"  data-target="${id}-a">
              ${d.icon} ${d.name} <span class="tab-pct">${domPct}%</span>
            </button>
            <button class="dual-tab"        role="tab" aria-selected="false" data-target="${id}-b">
              ${s.icon} ${s.name} <span class="tab-pct">${secPct}%</span>
            </button>
          </div>
          <div class="dual-panel active" id="${id}-a" role="tabpanel">${domBody}</div>
          <div class="dual-panel"        id="${id}-b" role="tabpanel">${secBody}</div>
        </div>
      </details>`;
  }

  /* Favour / Avoid columns */
  function paCols(fd) {
    return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65"><strong>Principle:</strong> ${fd.principle}</p>
    <div class="pa-cols">
      <div class="pa-col favour"><h4>✓ Favour</h4><ul class="pa-list">${fd.prefer.map(i => `<li>${i}</li>`).join('')}</ul></div>
      <div class="pa-col avoid"><h4>✕ Reduce / Avoid</h4><ul class="pa-list">${fd.avoid.map(i => `<li>${i}</li>`).join('')}</ul></div>
    </div>`;
  }

  /* Imbalance grid */
  function imbalGrid(dosha) {
    return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65">
      When <strong>${dosha.name}</strong> becomes aggravated these are the early warning signs to watch for.
    </p>
    <div class="imbalance-grid">${dosha.imbalance.map(i => `<div class="ib-tag">${i}</div>`).join('')}</div>`;
  }

  /* Rhythm panel */
  function rhythmPanel(dosha) {
    return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65">
      Aligning your day to the dosha clock (Kapha 6–10, Pitta 10–2, Vata 2–6) is one of Ayurveda's most powerful practices.
    </p>
    <div class="rhythm-row">
      ${dosha.rhythm.map(r => `
        <div class="rhythm-item">
          <div class="rhythm-time">${r.time}</div>
          <div class="rhythm-action">${r.action}</div>
        </div>`).join('')}
    </div>`;
  }

  /* Herb grid */
  function herbPanel(dosha) {
    return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65">
      These herbs have been used for centuries to balance <strong>${dosha.name}</strong> dosha.
      Always consult a qualified Vaidya before starting any herbal protocol.
    </p>
    <div class="herb-grid">
      ${dosha.herbs.map(h => `
        <div class="herb-card">
          <div class="herb-name">${h.icon} ${h.name}</div>
          <div class="herb-sanskrit">${h.sanskrit}</div>
          <div class="herb-use">${h.use}</div>
        </div>`).join('')}
    </div>`;
  }

  /* Season grid */
  function seasonPanel(dosha) {
    return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65">
      Your <strong>${dosha.name}</strong> side requires specific seasonal adjustments to stay balanced year-round.
    </p>
    <div class="season-grid">
      ${dosha.seasons.map(ss => `
        <div class="season-card ${ss.active ? 'active-season' : ''}">
          <div class="season-icon">${ss.icon}</div>
          <div class="season-name">${ss.name}</div>
          <div class="season-tip">${ss.tip}</div>
        </div>`).join('')}
    </div>`;
  }

  /* ── Build each section ── */
  const titleSuffix = isDual ? ` — ${d.name} & ${s.name}` : '';

  const whyCard = dualCard(
    ICONS.search,
    `Why This Is Your Prakriti${titleSuffix}`,
    `<p class="why-text">${d.why}</p>`,
    `<p class="why-text">${d.why}</p>`,
    `<p class="why-text">${s.why}</p>`,
    true
  );

  const imbalanceCard = dualCard(
    ICONS.imbalance, `Signs of Imbalance${titleSuffix}`,
    imbalGrid(d), imbalGrid(d), imbalGrid(s)
  );

  const dietCard = dualCard(
    ICONS.diet, `Diet — Āhāra${titleSuffix}`,
    paCols(d.foods), paCols(d.foods), paCols(s.foods)
  );

  const lifestyleCard = dualCard(
    ICONS.rhythm, `Lifestyle — Vihāra${titleSuffix}`,
    paCols(d.lifestyle), paCols(d.lifestyle), paCols(s.lifestyle)
  );

  const exerciseCard = dualCard(
    ICONS.exercise, `Exercise — Vyāyāma${titleSuffix}`,
    paCols(d.exercise), paCols(d.exercise), paCols(s.exercise)
  );

  const rhythmCard = dualCard(
    ICONS.rhythm, `Daily Rhythm — Dinacharya${titleSuffix}`,
    rhythmPanel(d), rhythmPanel(d), rhythmPanel(s)
  );

  const herbCard = dualCard(
    ICONS.kapha, `Classical Herbs — Dravyaguna${titleSuffix}`,
    herbPanel(d), herbPanel(d), herbPanel(s)
  );

  const seasonCard = dualCard(
    ICONS.season, `Seasonal Guidance — Ritucharya${titleSuffix}`,
    seasonPanel(d), seasonPanel(d), seasonPanel(s)
  );

  /* ── Assemble page ── */
  document.getElementById('res-scroll').innerHTML = `

    <div class="share-banner">
      <span style="font-size:.78rem;color:var(--ink2);font-weight:700;white-space:nowrap">${ICONS.share} Share:</span>
      <input class="share-url-input" id="share-url-input" value="${shareURL}" readonly aria-label="Shareable URL"/>
      <button class="btn-copy" id="btn-copy-url">Copy link</button>
    </div>

    <div class="res-tabs" role="tablist">
      <button class="res-tab-btn active" data-target="tab-overview">📊 Overview</button>
      <button class="res-tab-btn" data-target="tab-insights">🌿 Insights</button>
      <button class="res-tab-btn" data-target="tab-tools">⚖️ Tools & Checks</button>
    </div>

    <div id="tab-overview" class="res-tab-panel active">
      <div class="res-hero">${heroHTML}</div>

      ${classicalNote}

      <div class="breakdown">
        <p class="breakdown-title">${ICONS.chart} Dosha Score Breakdown</p>
        <div class="b-row">
          <span class="b-label b-label--v">${ICONS.vata} Vata</span>
          <div class="b-track"><div class="b-bar b-bar--v" id="bar-v" style="width:0%"></div></div>
          <span class="b-pct">${bV}%</span>
        </div>
        <div class="b-row">
          <span class="b-label b-label--p">${ICONS.pitta} Pitta</span>
          <div class="b-track"><div class="b-bar b-bar--p" id="bar-p" style="width:0%"></div></div>
          <span class="b-pct">${bP}%</span>
        </div>
        <div class="b-row">
          <span class="b-label b-label--k">${ICONS.kapha} Kapha</span>
          <div class="b-track"><div class="b-bar b-bar--k" id="bar-k" style="width:0%"></div></div>
          <span class="b-pct">${bK}%</span>
        </div>
        <p style="font-size:.79rem;color:var(--ink3);margin-top:.75rem;line-height:1.65">
          18 questions across <strong>Physical</strong> (Q1–6), <strong>Physiological</strong> (Q7–12) and
          <strong>Psychological</strong> (Q13–18) — CCRAS/AYUSH validated Prakriti assessment framework.
        </p>
      </div>
    </div>

    <div id="tab-tools" class="res-tab-panel">
    <div class="ana-card" id="bmi-card" style="margin-bottom:1.5rem; opacity:1; animation:none;">
      <div class="card-head" style="margin-bottom:.9rem;"><span class="card-icon">⚖️</span><h3 class="card-title">Prakriti-Adjusted BMI & Health</h3></div>
      
      <p style="font-size:.82rem;color:var(--ink2);line-height:1.6;margin-bottom:1.2rem">
        Enhanced with <strong>Age</strong>, <strong>Gender</strong>, and <strong>Frame Analysis</strong> for clinical accuracy.
        Your unique Dosha shift adjusts your ideal weight zone by <strong style="color:var(--ink)">${((App.scores.v / tot) * -2.0 + (App.scores.k / tot) * 2.5) > 0 ? '+' : ''}${((App.scores.v / tot) * -2.0 + (App.scores.k / tot) * 2.5).toFixed(1)}</strong> points.
      </p>
      
      <div class="pill-tabs" style="width:100%; margin-bottom:1.2rem">
        <button id="btn-bmi-metric" class="pill-tab active" style="flex:1">Metric</button>
        <button id="btn-bmi-imperial" class="pill-tab" style="flex:1">Imperial</button>
      </div>
      
      <!-- Frictionless Home Profile -->
      <div class="bmi-input-grid">
        <div class="bmi-field-group">
          <label class="bmi-label">Age</label>
          <input type="number" id="bmi-age" class="bmi-input" placeholder="Years">
        </div>
        <div class="bmi-field-group">
          <label class="bmi-label">Gender</label>
          <select id="bmi-gender" class="bmi-input bmi-select">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="bmi-field-group--full">
          <label class="bmi-label">Physical Activity Level</label>
          <select id="bmi-activity" class="bmi-input bmi-select">
            <option value="1.2">Sedentary (Office job / No exercise)</option>
            <option value="1.375">Light (1-3 days/week exercise)</option>
            <option value="1.55" selected>Moderate (3-5 days/week exercise)</option>
            <option value="1.725">Active (6-7 days/week exercise)</option>
            <option value="1.9">Vigorous (Physical job / Athlete)</option>
          </select>
        </div>
      </div>

      <!-- Weight & Height Group -->
      <div id="bmi-inputs-metric" class="bmi-input-grid" style="margin-top: 0.5rem">
        <div class="bmi-field-group">
          <label class="bmi-label">Weight (kg)</label>
          <input type="number" id="bmi-kg" class="bmi-input" placeholder="0.0">
        </div>
        <div class="bmi-field-group">
          <label class="bmi-label">Height (cm)</label>
          <input type="number" id="bmi-cm" class="bmi-input" placeholder="0">
        </div>
      </div>

      <div id="bmi-inputs-imperial" class="bmi-input-grid" style="display:none; margin-top: 0.5rem">
        <div class="bmi-field-group--full">
          <label class="bmi-label">Weight (lbs)</label>
          <input type="number" id="bmi-lbs" class="bmi-input" placeholder="0.0">
        </div>
        <div class="bmi-field-group">
          <label class="bmi-label">Height (ft)</label>
          <input type="number" id="bmi-ft" class="bmi-input" placeholder="ft">
        </div>
        <div class="bmi-field-group">
          <label class="bmi-label">Height (in)</label>
          <input type="number" id="bmi-in" class="bmi-input" placeholder="in">
        </div>
      </div>

      <!-- Extra Accuracy Section (Hidden by Default) -->
      <div style="margin-top:1rem">
        <button id="btn-toggle-advanced-bmi" style="background:transparent; border:none; color:var(--ink4); font-size:0.7rem; font-weight:700; text-transform:uppercase; cursor:pointer; display:flex; align-items:center; gap:5px; padding:0">
          <span>⚙️ Extra Accuracy (Requires Tape Measure)</span>
        </button>
        <div id="bmi-advanced-inputs" style="display:none; margin-top:1rem; padding-top:1rem; border-top:1px dashed var(--border)">
          <div class="bmi-input-grid">
            <div class="bmi-field-group">
              <label class="bmi-label">Wrist (cm)</label>
              <input type="number" id="bmi-wrist" class="bmi-input" placeholder="Frame">
            </div>
            <div class="bmi-field-group">
              <label class="bmi-label">Waist (cm)</label>
              <input type="number" id="bmi-waist" class="bmi-input" placeholder="Belly">
            </div>
            <div class="bmi-field-group">
              <label class="bmi-label">Neck (cm)</label>
              <input type="number" id="bmi-neck" class="bmi-input" placeholder="Neck">
            </div>
            <div class="bmi-field-group" id="bmi-hip-group" style="display:none">
              <label class="bmi-label">Hips (cm)</label>
              <input type="number" id="bmi-hip" class="bmi-input" placeholder="Hips">
            </div>
          </div>
          <p style="font-size:0.65rem; color:var(--ink4); margin-top:0.5rem">Used for Body Fat % and precise Frame Classification.</p>
        </div>
      </div>

      <button class="btn btn--gold btn--full" id="btn-calc-bmi" style="margin-top:1rem">ANALYSE HEALTH METRICS</button>
      
      <div id="bmi-output" style="display:none; margin-top:1rem;"></div>
    </div>

    <!-- Food Checker Card Placeholder -->
    <div class="ana-card" id="food-checker-card" style="margin-bottom:2rem; opacity:1; animation:none;"></div>

    </div>

    <div id="tab-insights" class="res-tab-panel">
      <h2 style="font-family:'Cormorant Garamond',serif; font-size:1.65rem; color:var(--ink); margin:0 0 1.2rem; text-align:center; padding-bottom:.2rem;">
        <span style="color:var(--gold); opacity: 0.6;">✦</span> Ayurvedic Insights <span style="color:var(--gold); opacity: 0.6;">✦</span>
      </h2>

      ${whyCard}
      ${imbalanceCard}
      ${dietCard}
      ${lifestyleCard}
      ${exerciseCard}
      ${rhythmCard}
      ${herbCard}
      ${seasonCard}
    </div>

    <p class="disclaimer">
      🪷 Based on Charaka Samhita and Sushruta Samhita — for educational awareness only, not medical diagnosis.
      Consult a qualified Ayurvedic practitioner for personalised guidance.
    </p>

    <div class="cta-row">
      <button class="btn btn--gold" id="btn-retake-bottom">↺ Retake Quiz</button>
    </div>
  `;

  /* ── Animate score bars ── */
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.getElementById('bar-v').style.width = bV + '%';
      document.getElementById('bar-p').style.width = bP + '%';
      document.getElementById('bar-k').style.width = bK + '%';
    }, 350);
  });

  /* ── Tab switching (event delegation — one listener for all cards) ── */
  document.getElementById('res-scroll').addEventListener('click', e => {

    // Top-level Dashboard Tab Switching
    const dashboardTab = e.target.closest('.res-tab-btn');
    if (dashboardTab) {
      document.querySelectorAll('.res-tab-btn').forEach(btn => btn.classList.remove('active'));
      document.querySelectorAll('.res-tab-panel').forEach(panel => panel.classList.remove('active'));
      dashboardTab.classList.add('active');
      document.getElementById(dashboardTab.dataset.target).classList.add('active');
      return; // Stop here, it was a dashboard tab
    }

    // Existing Insight Dual-Tab Switching
    const tab = e.target.closest('.dual-tab');
    if (!tab) return;
    const card = tab.closest('.dual-tab-card');
    const targetId = tab.dataset.target;
    card.querySelectorAll('.dual-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    card.querySelectorAll('.dual-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(targetId).classList.add('active');
  });

  /* ── Retake ── */
  document.getElementById('btn-retake-bottom').addEventListener('click', retake);

  /* ── Copy URL ── */
  document.getElementById('btn-copy-url').addEventListener('click', function () {
    const val = document.getElementById('share-url-input').value;
    navigator.clipboard.writeText(val).then(() => {
      this.textContent = '✅ Copied!';
      setTimeout(() => { this.textContent = 'Copy link'; }, 2200);
    }).catch(() => {
      document.getElementById('share-url-input').select();
      this.textContent = '↑ Select & copy';
    });
  });

  /* ── BMI & Health Profiler Bindings ── */
  let isMetric = true;
  const bmiInpGroup = ['age', 'gender', 'kg', 'cm', 'lbs', 'ft', 'in', 'wrist', 'waist', 'neck', 'hip'];

  // Persistence Loading
  bmiInpGroup.forEach(id => {
    const val = localStorage.getItem(`ojas_bmi_${id}`);
    const el = document.getElementById(`bmi-${id}`);
    if (val && el) el.value = val;
  });

  // Gender Change -> Show Hip for female
  const genderEl = document.getElementById('bmi-gender');
  const hipGrp = document.getElementById('bmi-hip-group');
  const toggleHip = () => { if (hipGrp) hipGrp.style.display = genderEl.value === 'female' ? 'flex' : 'none'; };
  if (genderEl) {
    genderEl.addEventListener('change', () => {
      toggleHip();
      localStorage.setItem('ojas_bmi_gender', genderEl.value);
    });
    toggleHip();
  }

  // Save inputs on change
  bmiInpGroup.forEach(id => {
    const el = document.getElementById(`bmi-${id}`);
    if (el) el.addEventListener('input', () => localStorage.setItem(`ojas_bmi_${id}`, el.value));
  });

  const btnMet = document.getElementById('btn-bmi-metric');
  const btnImp = document.getElementById('btn-bmi-imperial');
  const inpMet = document.getElementById('bmi-inputs-metric');
  const inpImp = document.getElementById('bmi-inputs-imperial');

  const setUnit = (m) => {
    isMetric = m;
    if (btnMet) btnMet.className = `pill-tab ${m ? 'active' : ''}`;
    if (btnImp) btnImp.className = `pill-tab ${!m ? 'active' : ''}`;
    if (inpMet) inpMet.style.display = m ? 'grid' : 'none';
    if (inpImp) inpImp.style.display = !m ? 'grid' : 'none';
    const out = document.getElementById('bmi-output');
    if (out) out.style.display = 'none';
  };

  if (btnMet) btnMet.addEventListener('click', () => setUnit(true));
  if (btnImp) btnImp.addEventListener('click', () => setUnit(false));

  // Toggle Advanced Section
  const btnToggleAdv = document.getElementById('btn-toggle-advanced-bmi');
  const advSection = document.getElementById('bmi-advanced-inputs');
  if (btnToggleAdv && advSection) {
    btnToggleAdv.addEventListener('click', () => {
      const isHidden = advSection.style.display === 'none';
      advSection.style.display = isHidden ? 'block' : 'none';
      btnToggleAdv.querySelector('span').textContent = isHidden 
        ? '✕ Hide Extra Accuracy' 
        : '⚙️ Extra Accuracy (Requires Tape Measure)';
    });
  }

  // Init Save Persistence for Activity
  const actEl = document.getElementById('bmi-activity');
  if (actEl) {
    const savedAct = localStorage.getItem('ojas_bmi_activity');
    if (savedAct) actEl.value = savedAct;
    actEl.addEventListener('change', () => localStorage.setItem('ojas_bmi_activity', actEl.value));
  }

  document.getElementById('btn-calc-bmi').addEventListener('click', () => {
    const age = parseInt(document.getElementById('bmi-age').value) || 30;
    const gender = document.getElementById('bmi-gender').value;
    const activity = parseFloat(document.getElementById('bmi-activity').value) || 1.55;
    const wrist = parseFloat(document.getElementById('bmi-wrist').value) || 0;
    const waist = parseFloat(document.getElementById('bmi-waist').value) || 0;
    const neck = parseFloat(document.getElementById('bmi-neck').value) || 0;
    const hip = parseFloat(document.getElementById('bmi-hip').value) || 0;

    let w, h;
    if (isMetric) {
      w = parseFloat(document.getElementById('bmi-kg').value);
      h = parseFloat(document.getElementById('bmi-cm').value) / 100;
    } else {
      w = parseFloat(document.getElementById('bmi-lbs').value) * 0.453592;
      const ft = parseFloat(document.getElementById('bmi-ft').value) || 0;
      const _in = parseFloat(document.getElementById('bmi-in').value) || 0;
      h = ((ft * 12) + _in) * 0.0254;
    }

    if (!w || !h || w <= 0 || h <= 0) return;

    const bmiVal = w / (h * h);
    const h_cm = h * 100;

    // Determine dominant dosha for advice
    const tot = App.scores.v + App.scores.p + App.scores.k;
    let dom = 'v'; // Default to Vata
    if (App.scores.p > App.scores.v && App.scores.p > App.scores.k) dom = 'p';
    else if (App.scores.k > App.scores.v && App.scores.k > App.scores.p) dom = 'k';

    // 1. BMI Status with Dosha Shift
    const shift = ((App.scores.v / tot) * -2.0) + ((App.scores.k / tot) * 2.5);
    const under = 18.5 + shift;
    const over = 25.0 + shift;
    const obese = 30.0 + shift;

    let state, color, advice, sanskrit;
    if (bmiVal < (16 + shift)) { state = "Severely Underweight"; sanskrit = "Atikarshya"; color = "#6b7280"; }
    else if (bmiVal < under) { state = "Underweight"; sanskrit = "Karshya"; color = "#3b82f6"; }
    else if (bmiVal < over) { state = "Balanced"; sanskrit = "Sama Agni"; color = "#10b981"; }
    else if (bmiVal < obese) { state = "Overweight"; sanskrit = "Sthula"; color = "#f59e0b"; }
    else { state = "Obese"; sanskrit = "Atisthula"; color = "#ef4444"; }

    // Activity-Aware Activity Logic
    const isSedentary = activity <= 1.25;
    const isActive = activity >= 1.7;
    
    if (dom === 'k') { // Kapha
      if (bmiVal >= over) {
        advice = isSedentary 
          ? "Sedentary Kapha with tissue accumulation has very high risk of Ama (toxins). Prioritize pungent/bitter foods and vigorous daily movement." 
          : "Kapha is naturally denser, but you are leaning past ideal. Maintain your activity level and favor warm, spiced, light foods.";
      } else {
        advice = "Your Kapha constitution is well-balanced. Maintain your current activity to prevent heaviness and stagnation.";
      }
    } else if (dom === 'v') { // Vata
      if (bmiVal < under) {
        advice = isActive 
          ? "Active Vata with low weight needs to caution against over-exhaustion. Prioritize warm, heavy, grounding meals and restorative rest." 
          : "Vata is naturally lighter, but ensure you maintain internal strength. Add healthy fats like Ghee to every meal.";
      } else {
        advice = "Balanced Vata energy. Maintain grounding routines and consistent sleep cycles to keep your light energy stable.";
      }
    } else { // Pitta
      if (bmiVal >= over) {
        advice = isSedentary 
          ? "Sedentary Pitta may experience irritability or heat buildup. Prioritize cooling foods and structured physical discipline." 
          : "Strong Pitta fire helps metabolic speed, but watch for internal heat. Balance your activity with cooling Sitala practices.";
      } else {
        advice = "Balanced Pitta. Your metabolic fire (Agni) is functioning optimally. Continue seasonal cooling routines.";
      }
    }

    // 2. Body Fat % (Navy Method - Optional)
    let bf = 0;
    if (waist && neck && h_cm) {
      if (gender === 'male') {
        const diff = waist - neck;
        if (diff > 0) bf = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(h_cm)) - 450;
      } else if (hip) {
        const diff = waist + hip - neck;
        if (diff > 0) bf = 495 / (1.29579 - 0.35004 * Math.log10(diff) + 0.221 * Math.log10(h_cm)) - 450;
      }
    }
    // Fallback if tape measure missing: Deurenberg BMI formula
    if (!bf || bf < 2) {
      const gVal = gender === 'male' ? 1 : 0;
      bf = (1.20 * bmiVal) + (0.23 * age) - (10.8 * gVal) - 5.4;
    }
    if (bf < 0) bf = 0;

    // 3. BMR (Mifflin-St Jeor) & TDEE
    const bmr = (gender === 'male')
      ? (10 * w) + (6.25 * h_cm) - (5 * age) + 5
      : (10 * w) + (6.25 * h_cm) - (5 * age) - 161;
    const tdee = bmr * activity;

    // 4. Frame Classifier (Wrist - Optional)
    let frame = "Medium";
    if (wrist > 0) {
      const ratio = h_cm / wrist;
      if (gender === 'male') {
        if (ratio > 10.4) frame = "Small"; else if (ratio < 9.6) frame = "Large";
      } else {
        if (ratio > 11.0) frame = "Small"; else if (ratio < 10.1) frame = "Large";
      }
    } else {
      // Logic fallback based on dominant dosha
      frame = dom === 'v' ? 'Small' : dom === 'k' ? 'Large' : 'Medium';
    }

    // 5. Waist-to-Height Ratio
    const wthr = waist ? (waist / h_cm) : 0;

    // 6. Goal Weight
    const targetWeight = ((under + over) / 2) * (h * h);
    const weightDiff = w - targetWeight;
    const goalText = weightDiff > 0.5
      ? `Lose <strong>${weightDiff.toFixed(1)} kg</strong> to reach optimal balance.`
      : weightDiff < -0.5
        ? `Gain <strong>${Math.abs(weightDiff).toFixed(1)} kg</strong> to nourish tissues (Brimhana).`
        : "You are currently within your ideal Prakriti zone.";

    const out = document.getElementById('bmi-output');
    out.style.display = 'block';

    const angle = ((Math.min(40, Math.max(10, bmiVal)) - 10) / 30) * 180 - 90;

    // History Loading
    const history = JSON.parse(localStorage.getItem('ojas_weight_history') || '[]');
    const historyHTML = history.length > 0
      ? `<div style="margin-top:0.5rem; font-size:0.75rem">Recent Logs: ${history.map(h => `<span style="display:inline-block; background:var(--bg3); padding:2px 6px; border-radius:4px; margin:2px">${h.date}: ${h.weight}kg</span>`).join('')}</div>`
      : 'No recent logs found.';

    out.innerHTML = `
      <div class="gauge-container">
        <svg class="gauge-svg" viewBox="0 0 200 120">
          <path class="gauge-track" d="M 20 100 A 80 80 0 0 1 180 100" />
          <path id="gauge-fill" class="gauge-segment" d="M 20 100 A 80 80 0 0 1 180 100" stroke="${color}" stroke-dasharray="0, 100" pathLength="100" />
          <path id="gauge-needle" class="gauge-needle" d="M 100 100 L 96 100 L 100 25 L 104 100 Z" style="transform: rotate(-90deg)" />
        </svg>
        <div class="gauge-value">
          <span class="gauge-num">${bmiVal.toFixed(1)}</span>
          <span class="gauge-label">${state}</span>
        </div>
      </div>

      <div class="metrics-grid">
        <div class="metric-mini-card">
          <span class="mini-card-label">Body Fat %</span>
          <span class="mini-card-val">${bf > 0 ? bf.toFixed(1) + '%' : '—'}</span>
          <span class="mini-card-sub">Navy Method</span>
        </div>
        <div class="metric-mini-card">
          <span class="mini-card-label">Daily TDEE</span>
          <span class="mini-card-val">${Math.round(tdee)}</span>
          <span class="mini-card-sub">Maintenance Cal</span>
        </div>
        <div class="metric-mini-card">
          <span class="mini-card-label">WtH Ratio</span>
          <span class="mini-card-val">${wthr > 0 ? wthr.toFixed(2) : '—'}</span>
          <span class="mini-card-sub">${wthr > 0.53 ? 'High Risk' : wthr > 0 ? 'Healthy' : '—'}</span>
        </div>
        <div class="metric-mini-card">
          <span class="mini-card-label">Body Frame</span>
          <span class="mini-card-val">${frame}</span>
          <span class="mini-card-sub">By Wrist</span>
        </div>
      </div>

      <div class="dosha-range-card">
        <div class="range-header">
          <span class="range-title">Prakriti Ideal Range</span>
          <span class="frame-badge">${frame} Frame</span>
        </div>
        <div class="range-visual">
          <div class="range-fill" style="left:${((under - 10) / 30) * 100}%; width:${((over - under) / 30) * 100}%"></div>
          <div class="range-marker" style="left:${((bmiVal - 10) / 30) * 100}%; background:${color}"></div>
        </div>
        <div class="range-labels">
          <span>${Math.round(under * (h * h))} kg</span>
          <span style="color:var(--gold)">Target: ${Math.round(under * (h * h))}-${Math.round(over * (h * h))} kg</span>
          <span>${Math.round(over * (h * h))} kg</span>
        </div>
        <p style="font-size:0.75rem; color:var(--ink3); margin-top:0.8rem; text-align:center">${goalText}</p>
      </div>

      <div class="bmi-accordion">
        <div class="acc-item">
          <button class="acc-trigger">What does this metric mean?</button>
          <div class="acc-content">
            <p style="margin-bottom:0.8rem">Your BMI of <strong>${bmiVal.toFixed(1)}</strong> is analyzed relative to your <strong>${App.scores.v > App.scores.k ? 'Vata' : 'Kapha'}</strong> constitution. 
            Ayurveda considers bone density and metabolic fire (Agni).</p>
            <p><strong>Status:</strong> ${sanskrit} — ${advice}</p>
          </div>
        </div>
        <div class="acc-item">
          <button class="acc-trigger">Ayurvedic Recommendations</button>
          <div class="acc-content">
            <div style="margin-bottom:0.7rem">
              ${bmiVal < under ? '<span class="therapy-tag">Brimhana</span><span class="therapy-tag">Abhyanga</span>' :
        bmiVal > over ? '<span class="therapy-tag">Langhana</span><span class="therapy-tag">Udvartana</span>' :
          '<span class="therapy-tag">Rasayana</span>'}
            </div>
            <p>Based on your current levels, these traditional adjustments help maintain Dhatu (tissue) equilibrium.</p>
          </div>
        </div>
        <div class="acc-item">
          <button class="acc-trigger">Weight Trend Tracker</button>
          <div class="acc-content">
            <button id="btn-log-weight" class="btn btn--outline btn--sm" style="width:100%; margin-bottom:0.5rem">Log Current Weight (${w.toFixed(1)}kg)</button>
            ${historyHTML}
          </div>
        </div>
      </div>
    `;

    // Accordion Logic
    out.querySelectorAll('.acc-trigger').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.parentElement.classList.toggle('active');
      });
    });

    // Animate Gauge
    setTimeout(() => {
      const fill = document.getElementById('gauge-fill');
      if (fill) {
        const perc = (Math.min(40, Math.max(10, bmiVal)) - 10) / 30;
        fill.style.strokeDasharray = `${perc * 100}, 100`;
      }
      const needle = document.getElementById('gauge-needle');
      if (needle) needle.style.transform = `rotate(${angle}deg)`;
    }, 150);

    // Trend Tracker Binding
    const btnLog = document.getElementById('btn-log-weight');
    if (btnLog) {
      btnLog.addEventListener('click', () => {
        const hist = JSON.parse(localStorage.getItem('ojas_weight_history') || '[]');
        hist.push({ date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }), weight: w.toFixed(1) });
        if (hist.length > 5) hist.shift();
        localStorage.setItem('ojas_weight_history', JSON.stringify(hist));
        btnLog.textContent = "✅ Weight Logged";
        btnLog.disabled = true;
      });
    }
  });
  if (typeof initFoodChecker === 'function') initFoodChecker();
  showScreen('screen-result');
}