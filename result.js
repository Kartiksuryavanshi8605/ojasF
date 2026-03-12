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
  const icons = { v:'💨',   p:'🔥',   k:'🌿'   };

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
      <span class="sc sc--v ${dom==='v'?'sc--dominant':''}">💨 Vata ${App.scores.v}/${tot}</span>
      <span class="sc sc--p ${dom==='p'?'sc--dominant':''}">🔥 Pitta ${App.scores.p}/${tot}</span>
      <span class="sc sc--k ${dom==='k'?'sc--dominant':''}">🌿 Kapha ${App.scores.k}/${tot}</span>
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
      <span class="sc sc--v ${dom==='v'?'sc--dominant':''}">💨 Vata ${App.scores.v}/${tot}</span>
      <span class="sc sc--p ${dom==='p'?'sc--dominant':''}">🔥 Pitta ${App.scores.p}/${tot}</span>
      <span class="sc sc--k ${dom==='k'?'sc--dominant':''}">🌿 Kapha ${App.scores.k}/${tot}</span>
    </div>
    <div class="traits">
      ${d.traits.map(t=>`<span class="trait ${d.traitClass}">${t}</span>`).join('')}
    </div>
  `;

  /* ── Classical reference ── */
  const classicalNote = isDual ? `
    <div class="classical-note">
      📜 <strong>${d.name}:</strong> ${d.classical}
      <br/><br/>
      📜 <strong>${s.name}:</strong> ${s.classical}
    </div>` : `
    <div class="classical-note">📜 <strong>Classical Reference:</strong> ${d.classical}</div>`;

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
    '🔍',
    `Why This Is Your Prakriti${titleSuffix}`,
    `<p class="why-text">${d.why}</p>`,
    `<p class="why-text">${d.why}</p>`,
    `<p class="why-text">${s.why}</p>`
  );

  const imbalanceCard = dualCard(
    '⚠️', `Signs of Imbalance${titleSuffix}`,
    imbalGrid(d), imbalGrid(d), imbalGrid(s)
  );

  const dietCard = dualCard(
    '🥗', `Diet — Āhāra${titleSuffix}`,
    paCols(d.foods), paCols(d.foods), paCols(s.foods)
  );

  const lifestyleCard = dualCard(
    '🌅', `Lifestyle — Vihāra${titleSuffix}`,
    paCols(d.lifestyle), paCols(d.lifestyle), paCols(s.lifestyle)
  );

  const exerciseCard = dualCard(
    '🏃', `Exercise — Vyāyāma${titleSuffix}`,
    paCols(d.exercise), paCols(d.exercise), paCols(s.exercise)
  );

  const rhythmCard = dualCard(
    '🕐', `Daily Rhythm — Dinacharya${titleSuffix}`,
    rhythmPanel(d), rhythmPanel(d), rhythmPanel(s)
  );

  const herbCard = dualCard(
    '🌿', `Classical Herbs — Dravyaguna${titleSuffix}`,
    herbPanel(d), herbPanel(d), herbPanel(s)
  );

  const seasonCard = dualCard(
    '🍂', `Seasonal Guidance — Ritucharya${titleSuffix}`,
    seasonPanel(d), seasonPanel(d), seasonPanel(s)
  );

  /* ── Assemble page ── */
  document.getElementById('res-scroll').innerHTML = `

    <div class="share-banner">
      <span style="font-size:.78rem;color:var(--ink2);font-weight:700;white-space:nowrap">🔗 Share:</span>
      <input class="share-url-input" id="share-url-input" value="${shareURL}" readonly aria-label="Shareable URL"/>
      <button class="btn-copy" id="btn-copy-url">Copy link</button>
    </div>

    <div class="res-hero">${heroHTML}</div>

    ${classicalNote}

    <div class="breakdown">
      <p class="breakdown-title">📊 Dosha Score Breakdown</p>
      <div class="b-row">
        <span class="b-label b-label--v">💨 Vata</span>
        <div class="b-track"><div class="b-bar b-bar--v" id="bar-v" style="width:0%"></div></div>
        <span class="b-pct">${bV}%</span>
      </div>
      <div class="b-row">
        <span class="b-label b-label--p">🔥 Pitta</span>
        <div class="b-track"><div class="b-bar b-bar--p" id="bar-p" style="width:0%"></div></div>
        <span class="b-pct">${bP}%</span>
      </div>
      <div class="b-row">
        <span class="b-label b-label--k">🌿 Kapha</span>
        <div class="b-track"><div class="b-bar b-bar--k" id="bar-k" style="width:0%"></div></div>
        <span class="b-pct">${bK}%</span>
      </div>
      <p style="font-size:.79rem;color:var(--ink3);margin-top:.75rem;line-height:1.65">
        18 questions across <strong>Physical</strong> (Q1–6), <strong>Physiological</strong> (Q7–12) and
        <strong>Psychological</strong> (Q13–18) — CCRAS/AYUSH validated Prakriti assessment framework.
      </p>
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

  showScreen('screen-result');
}