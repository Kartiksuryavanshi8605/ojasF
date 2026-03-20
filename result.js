/* ═══════════════════════════════════════════════════════
   OJAS — result.js
   Builds the full result page from App.scores.
   Dual dosha: shows both doshas with tabbed sections.
═══════════════════════════════════════════════════════ */

function buildResult() {
  const tot    = QUESTIONS.length;
  const sorted = Object.entries(App.scores).sort((a, b) => b[1] - a[1]);
  const dom    = sorted[0][0];
  const sec    = sorted[1][0];
  const domPct = Math.round((sorted[0][1] / tot) * 100);
  const secPct = Math.round((sorted[1][1] / tot) * 100);
  const isDual = secPct >= 28;
  const d      = DOSHA[dom];
  const s      = DOSHA[sec];

  // Persist
  localStorage.setItem('ojasPrakriti', dom);
  localStorage.setItem('ojasScores',   JSON.stringify(App.scores));
  localStorage.setItem('ojasName',     App.name);

  // Theme result screen by dominant dosha
  const screen = document.getElementById('screen-result');
  screen.className = 'screen active ' + d.themeClass;
  ['res-bg--vata','res-bg--pitta','res-bg--kapha'].forEach(c => screen.classList.remove(c));
  screen.classList.add(d.bgClass);

  const bV = Math.round((App.scores.v / tot) * 100);
  const bP = Math.round((App.scores.p / tot) * 100);
  const bK = Math.round((App.scores.k / tot) * 100);

  const names = { v:'Vata', p:'Pitta', k:'Kapha' };
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
      <span class="sc sc--v ${dom==='v'?'sc--dominant':''}">${ICONS.vata} Vata ${App.scores.v}/${tot}</span>
      <span class="sc sc--p ${dom==='p'?'sc--dominant':''}">${ICONS.pitta} Pitta ${App.scores.p}/${tot}</span>
      <span class="sc sc--k ${dom==='k'?'sc--dominant':''}">${ICONS.kapha} Kapha ${App.scores.k}/${tot}</span>
    </div>
    <div class="traits">
      ${d.traits.map(t=>`<span class="trait ${d.traitClass}">${t}</span>`).join('')}
      ${s.traits.slice(0,3).map(t=>`<span class="trait ${s.traitClass}" style="opacity:.65">${t}</span>`).join('')}
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
      <span class="sc sc--v ${dom==='v'?'sc--dominant':''}">${ICONS.vata} Vata ${App.scores.v}/${tot}</span>
      <span class="sc sc--p ${dom==='p'?'sc--dominant':''}">${ICONS.pitta} Pitta ${App.scores.p}/${tot}</span>
      <span class="sc sc--k ${dom==='k'?'sc--dominant':''}">${ICONS.kapha} Kapha ${App.scores.k}/${tot}</span>
    </div>
    <div class="traits">
      ${d.traits.map(t=>`<span class="trait ${d.traitClass}">${t}</span>`).join('')}
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
  function dualCard(icon, title, singleBody, domBody, secBody) {
    if (!isDual) {
      return `
        <div class="ana-card">
          <div class="card-head"><span class="card-icon">${icon}</span><h3 class="card-title">${title}</h3></div>
          ${singleBody}
        </div>`;
    }
    const id = uid();
    return `
      <div class="ana-card dual-tab-card" data-tg="${id}">
        <div class="card-head"><span class="card-icon">${icon}</span><h3 class="card-title">${title}</h3></div>
        <div class="dual-tabs" role="tablist">
          <button class="dual-tab active" role="tab" aria-selected="true"  data-target="${id}-a">
            ${d.icon} ${d.name} <span class="tab-pct">${domPct}%</span>
          </button>
          <button class="dual-tab"        role="tab" aria-selected="false" data-target="${id}-b">
            ${s.icon} ${s.name} <span class="tab-pct">${secPct}%</span>
          </button>
        </div>
        <div class="dual-panel active" id="${id}-a" role="tabpanel">${domBody}</div>
        <div class="dual-panel"        id="${id}-b" role="tabpanel">${secBody}</div>
      </div>`;
  }

  /* Favour / Avoid columns */
  function paCols(fd) { return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65"><strong>Principle:</strong> ${fd.principle}</p>
    <div class="pa-cols">
      <div class="pa-col favour"><h4>✓ Favour</h4><ul class="pa-list">${fd.prefer.map(i=>`<li>${i}</li>`).join('')}</ul></div>
      <div class="pa-col avoid"><h4>✕ Reduce / Avoid</h4><ul class="pa-list">${fd.avoid.map(i=>`<li>${i}</li>`).join('')}</ul></div>
    </div>`; }

  /* Imbalance grid */
  function imbalGrid(dosha) { return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65">
      When <strong>${dosha.name}</strong> becomes aggravated these are the early warning signs to watch for.
    </p>
    <div class="imbalance-grid">${dosha.imbalance.map(i=>`<div class="ib-tag">${i}</div>`).join('')}</div>`; }

  /* Rhythm panel */
  function rhythmPanel(dosha) { return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65">
      Aligning your day to the dosha clock (Kapha 6–10, Pitta 10–2, Vata 2–6) is one of Ayurveda's most powerful practices.
    </p>
    <div class="rhythm-row">
      ${dosha.rhythm.map(r=>`
        <div class="rhythm-item">
          <div class="rhythm-time">${r.time}</div>
          <div class="rhythm-action">${r.action}</div>
        </div>`).join('')}
    </div>`; }

  /* Herb grid */
  function herbPanel(dosha) { return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65">
      These herbs have been used for centuries to balance <strong>${dosha.name}</strong> dosha.
      Always consult a qualified Vaidya before starting any herbal protocol.
    </p>
    <div class="herb-grid">
      ${dosha.herbs.map(h=>`
        <div class="herb-card">
          <div class="herb-name">${h.icon} ${h.name}</div>
          <div class="herb-sanskrit">${h.sanskrit}</div>
          <div class="herb-use">${h.use}</div>
        </div>`).join('')}
    </div>`; }

  /* Season grid */
  function seasonPanel(dosha) { return `
    <p style="font-size:.78rem;color:var(--ink3);margin-bottom:.9rem;line-height:1.65">
      Your <strong>${dosha.name}</strong> side requires specific seasonal adjustments to stay balanced year-round.
    </p>
    <div class="season-grid">
      ${dosha.seasons.map(ss=>`
        <div class="season-card ${ss.active?'active-season':''}">
          <div class="season-icon">${ss.icon}</div>
          <div class="season-name">${ss.name}</div>
          <div class="season-tip">${ss.tip}</div>
        </div>`).join('')}
    </div>`; }

  /* ── Build each section ── */
  const titleSuffix = isDual ? ` — ${d.name} & ${s.name}` : '';

  const whyCard = dualCard(
    `${ICONS.search}`,
    `Why This Is Your Prakriti${titleSuffix}`,
    `<p class="why-text">${d.why}</p>`,
    `<p class="why-text">${d.why}</p>`,
    `<p class="why-text">${s.why}</p>`
  );

  const imbalanceCard = dualCard(
    `${ICONS.imbalance}`, `Signs of Imbalance${titleSuffix}`,
    imbalGrid(d), imbalGrid(d), imbalGrid(s)
  );

  const dietCard = dualCard(
    `${ICONS.diet}`, `Diet — Āhāra${titleSuffix}`,
    paCols(d.foods), paCols(d.foods), paCols(s.foods)
  );

  const lifestyleCard = dualCard(
    `${ICONS.rhythm}`, `Lifestyle — Vihāra${titleSuffix}`,
    paCols(d.lifestyle), paCols(d.lifestyle), paCols(s.lifestyle)
  );

  const exerciseCard = dualCard(
    `${ICONS.exercise}`, `Exercise — Vyāyāma${titleSuffix}`,
    paCols(d.exercise), paCols(d.exercise), paCols(s.exercise)
  );

  const rhythmCard = dualCard(
    `${ICONS.rhythm}`, `Daily Rhythm — Dinacharya${titleSuffix}`,
    rhythmPanel(d), rhythmPanel(d), rhythmPanel(s)
  );

  const herbCard = dualCard(
    `${ICONS.kapha}`, `Classical Herbs — Dravyaguna${titleSuffix}`,
    herbPanel(d), herbPanel(d), herbPanel(s)
  );

  const seasonCard = dualCard(
    `${ICONS.season}`, `Seasonal Guidance — Ritucharya${titleSuffix}`,
    seasonPanel(d), seasonPanel(d), seasonPanel(s)
  );

  /* ── Assemble page ── */
  document.getElementById('res-scroll').innerHTML = `

    <div class="share-banner">
      <span style="font-size:.78rem;color:var(--ink2);font-weight:700;white-space:nowrap">${ICONS.share} Share:</span>
      <input class="share-url-input" id="share-url-input" value="${shareURL}" readonly aria-label="Shareable URL"/>
      <button class="btn-copy" id="btn-copy-url">Copy link</button>
    </div>

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

    <div class="ana-card" id="bmi-card">
      <div class="card-head"><span class="card-icon">⚖️</span><h3 class="card-title">Prakriti-Adjusted BMI</h3></div>
      <p style="font-size:.82rem;color:var(--ink2);line-height:1.6;margin-bottom:1.2rem">
        Standard BMI assumes all frames are identical. Ayurveda recognizes <strong>Vata</strong> is naturally lighter and <strong>Kapha</strong> is naturally denser. 
        Your unique Dosha shift adjusts your ideal weight zone by <strong style="color:var(--ink)">${((App.scores.v/tot)*-2.0 + (App.scores.k/tot)*2.5) > 0 ? '+' : ''}${((App.scores.v/tot)*-2.0 + (App.scores.k/tot)*2.5).toFixed(1)}</strong> points.
      </p>
      
      <div style="display:flex; gap:10px; margin-bottom:1rem; border:1px solid var(--border); padding:.25rem; border-radius:8px; background:var(--bg2)">
        <button id="btn-bmi-metric" style="flex:1; padding:.4rem; border-radius:6px; border:none; background:var(--surface); font-size:.75rem; font-weight:700; cursor:pointer; box-shadow:0 1px 3px rgba(0,0,0,0.05); transition:all 0.2s">Metric</button>
        <button id="btn-bmi-imperial" style="flex:1; padding:.4rem; border-radius:6px; border:none; background:transparent; color:var(--ink3); font-size:.75rem; font-weight:700; cursor:pointer; transition:all 0.2s">Imperial</button>
      </div>
      
      <div id="bmi-inputs-metric" style="display:flex; gap:10px; margin-bottom:1rem;">
        <input type="number" id="bmi-kg" placeholder="Weight (kg)" style="flex:1; padding:.75rem; border:1px solid var(--border); border-radius:8px; font-size:.9rem; background:var(--surface); color:var(--ink)">
        <input type="number" id="bmi-cm" placeholder="Height (cm)" style="flex:1; padding:.75rem; border:1px solid var(--border); border-radius:8px; font-size:.9rem; background:var(--surface); color:var(--ink)">
      </div>

      <div id="bmi-inputs-imperial" style="display:none; flex-direction:column; gap:10px; margin-bottom:1rem;">
        <input type="number" id="bmi-lbs" placeholder="Weight (lbs)" style="padding:.75rem; border:1px solid var(--border); border-radius:8px; font-size:.9rem; background:var(--surface); color:var(--ink)">
        <div style="display:flex; gap:10px">
          <input type="number" id="bmi-ft" placeholder="Height (ft)" style="flex:1; padding:.75rem; border:1px solid var(--border); border-radius:8px; font-size:.9rem; background:var(--surface); color:var(--ink)">
          <input type="number" id="bmi-in" placeholder="Height (in)" style="flex:1; padding:.75rem; border:1px solid var(--border); border-radius:8px; font-size:.9rem; background:var(--surface); color:var(--ink)">
        </div>
      </div>

      <button class="btn btn--gold btn--full" id="btn-calc-bmi">Calculate Corrected BMI</button>
      
      <div id="bmi-output" style="display:none; margin-top:1.5rem; padding-top:1.5rem; border-top:1px solid var(--border);"></div>
    </div>

    ${whyCard}
    ${imbalanceCard}
    ${dietCard}
    ${lifestyleCard}
    ${exerciseCard}
    ${rhythmCard}
    ${herbCard}
    ${seasonCard}

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
    const tab = e.target.closest('.dual-tab');
    if (!tab) return;
    const card    = tab.closest('.dual-tab-card');
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

  /* ── BMI Calculator Bindings ── */
  let isMetric = true;
  document.getElementById('btn-bmi-metric').addEventListener('click', e => {
    isMetric = true;
    e.target.style.background = 'var(--surface)';
    e.target.style.color = 'var(--ink)';
    e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
    const imp = document.getElementById('btn-bmi-imperial');
    imp.style.background = 'transparent';
    imp.style.color = 'var(--ink3)';
    imp.style.boxShadow = 'none';
    document.getElementById('bmi-inputs-metric').style.display = 'flex';
    document.getElementById('bmi-inputs-imperial').style.display = 'none';
    document.getElementById('bmi-output').style.display = 'none';
  });
  
  document.getElementById('btn-bmi-imperial').addEventListener('click', e => {
    isMetric = false;
    e.target.style.background = 'var(--surface)';
    e.target.style.color = 'var(--ink)';
    e.target.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
    const met = document.getElementById('btn-bmi-metric');
    met.style.background = 'transparent';
    met.style.color = 'var(--ink3)';
    met.style.boxShadow = 'none';
    document.getElementById('bmi-inputs-metric').style.display = 'none';
    document.getElementById('bmi-inputs-imperial').style.display = 'flex';
    document.getElementById('bmi-output').style.display = 'none';
  });

  document.getElementById('btn-calc-bmi').addEventListener('click', () => {
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
    const shift = ((App.scores.v/tot) * -2.0) + ((App.scores.k/tot) * 2.5);
    
    const s_under = 16.0 + shift;
    const under = 18.5 + shift;
    const over = 25.0 + shift;
    const obese = 30.0 + shift;

    let state, sanskrit, color, advice;
    if (bmiVal < s_under) {
      state = "Severely Underweight"; sanskrit = "Atikarshya / Severe Dhatu Kshaya"; color = "#6b7280";
      advice = dom === 'v' ? "Vata depletion requires deep, warm nourishment (ghee, root veg, cooked grains)." : "Aggressive tissue depletion detected. Strongly prioritize heavy, grounding foods.";
    } else if (bmiVal < under) {
      state = "Underweight"; sanskrit = "Karshya / Ama Deficiency"; color = "#3b82f6";
      advice = dom === 'v' ? "This is common for Vata constitutions, but ensure you maintain internal strength. Add healthy fats to every meal." : "Below ideal weight for your body type. Focus on rebuilding tissues (Brimhana therapy).";
    } else if (bmiVal < over) {
      state = "Ideal / Balanced"; sanskrit = "Sama Agni"; color = "#10b981";
      advice = "Your weight perfectly aligns with your Prakriti balance. Maintain your current daily rhythms.";
    } else if (bmiVal < obese) {
      state = "Overweight"; sanskrit = "Sthula / Ama Accumulation"; color = "#f59e0b";
      advice = dom === 'k' ? "Kapha is naturally denser, but you are leaning past ideal. Increase daily movement and favor warm, spiced, light foods." : "Ama (toxins) may be accumulating. Favor fasting or lighter, easily digestible meals.";
    } else {
      state = "Obese"; sanskrit = "Atisthula / Medo Roga"; color = "#ef4444";
      advice = "Significant tissue accumulation. Daily vigorous exercise (Vyayama) and strict Kapha-reducing diet recommended via practitioner.";
    }

    const output = document.getElementById('bmi-output');
    output.style.display = 'block';
    
    // Bounds clamping for UI display rendering
    const pctFill = Math.max(0, Math.min(100, (bmiVal / 40) * 100));
    const idealLeft = Math.max(0, (under / 40) * 100);
    const idealWidth = ((over - under) / 40) * 100;

output.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:.5rem;">
        <div>
          <span style="font-size:2.2rem; font-weight:700; color:var(--ink); font-family:var(--font-heading); line-height:1">${bmiVal.toFixed(1)}</span>
          <span style="font-size:.75rem; color:var(--ink3); text-transform:uppercase; letter-spacing:.1em; font-weight:700"> Standard BMI</span>
        </div>
        <div style="text-align:right">
          <div style="font-size:.95rem; font-weight:700; color:${color}">${state}</div>
          <div style="font-size:.7rem; font-style:italic; color:var(--ink3); margin-top:.2rem">${sanskrit}</div>
        </div>
      </div>
      
      <div style="height:10px; width:100%; border-radius:5px; background:var(--bg2); border:1px solid var(--border); position:relative; margin:2rem 0">
        <!-- Ideal Zone -->
        <div style="position:absolute; height:100%; left:${idealLeft}%; width:${idealWidth}%; background:rgba(16,185,129,0.15); border-left:2px solid #10b981; border-right:2px solid #10b981; border-radius:3px"></div>
        <!-- Marker -->
        <div style="position:absolute; top:-8px; bottom:-8px; width:4px; background:${color}; box-shadow:0 0 0 2px var(--surface); border-radius:2px; left:${pctFill}%; transition:left 0.5s ease-out">
           <div style="position:absolute; top:-24px; left:-14px; width:32px; text-align:center; font-size:.65rem; font-weight:700; background:${color}; color:#fff; padding:3px 0; border-radius:4px">You</div>
        </div>
      </div>
      
      <div style="display:flex; justify-content:space-between; font-size:.65rem; color:var(--ink3); font-weight:700; text-transform:uppercase; margin-top:-1.2rem; margin-bottom:1.2rem">
        <span>< ${under.toFixed(1)}</span>
        <span style="color:#10b981">Dosha Ideal Zone</span>
        <span>> ${over.toFixed(1)}</span>
      </div>
      
      <div style="background:var(--bg2); padding:1rem; border-radius:8px; border:1px solid var(--border); font-size:.85rem; color:var(--ink2); line-height:1.6">
        <strong style="color:var(--ink); display:block; margin-bottom:0.2rem">Ayurvedic Insight</strong> 
        ${advice}
      </div>
    `;
  });

  showScreen('screen-result');
}