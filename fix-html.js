const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find the start of SCREEN 2
const idx = html.indexOf('  <!-- ═══════════════════════════════════════\r\n       SCREEN 2 — QUIZ');
const idx2 = html.indexOf('  <!-- ═══════════════════════════════════════\n       SCREEN 2 — QUIZ');

const cutIdx = idx !== -1 ? idx : (idx2 !== -1 ? idx2 : -1);

if (cutIdx !== -1) {
  html = html.substring(0, cutIdx);
  
  html += `  <!-- ═══════════════════════════════════════
       SCREEN 2 — QUIZ
  ═══════════════════════════════════════ -->
  <section id="screen-quiz" class="screen" aria-label="Prakriti quiz">

    <div class="quiz-topbar">
      <span class="quiz-counter" id="quiz-counter" aria-live="polite">1 / 18</span>
      <div class="dosha-live" aria-label="Running dosha scores">
        <span class="dlive dlive--v" id="dl-v">0</span>
        <span class="dlive dlive--p" id="dl-p">0</span>
        <span class="dlive dlive--k" id="dl-k">0</span>
      </div>
    </div>

    <div class="quiz-progress" role="progressbar" aria-valuemin="0" aria-valuemax="18" aria-valuenow="0">
      <div class="quiz-progress-fill" id="quiz-progress-fill"></div>
    </div>

    <div class="quiz-nav-row">
      <button class="btn-back" id="btn-back" disabled aria-label="Previous question">← Back</button>
      <span class="save-indicator" id="save-indicator">
        <span class="save-dot"></span> Saved
      </span>
    </div>

    <div class="quiz-stage">
      <div class="q-ghost q-ghost--2" aria-hidden="true"></div>
      <div class="q-ghost q-ghost--1" aria-hidden="true"></div>
      <div class="q-card" id="q-card" role="main">
        <div class="q-meta">
          <div class="q-icon-wrap" id="q-icon" aria-hidden="true"></div>
          <span class="q-category" id="q-category">Body</span>
        </div>
        <p class="q-text" id="q-text">Loading…</p>
        <div class="q-options" id="q-options" role="group" aria-label="Answer options"></div>
        <div class="q-fact" id="q-fact" aria-live="polite"></div>
      </div>
    </div>

    <div class="quiz-kb-hint" aria-label="Keyboard shortcuts">
      Press <kbd>A</kbd> · <kbd>B</kbd> · <kbd>C</kbd> to answer
    </div>

  </section>


  <!-- ═══════════════════════════════════════
       SCREEN 3 — RESULT
  ═══════════════════════════════════════ -->
  <section id="screen-result" class="screen" aria-label="Your Prakriti result">

    <div class="res-orb res-orb--1" aria-hidden="true"></div>
    <div class="res-orb res-orb--2" aria-hidden="true"></div>

    <header class="res-header">
      <span class="res-brand">OJAS</span>
      <button class="btn btn--outline btn--sm" id="btn-retake">↺ Retake</button>
    </header>

    <div class="res-scroll" id="res-scroll"></div>

  </section>


  <!-- ─── Global UI ─── -->
  <button id="dark-btn" aria-label="Toggle dark mode" title="Toggle dark mode">🌙</button>

  <script src="icons.js?v=2"></script>
  <script src="app.js?v=2"></script>
  <script src="quiz.js?v=2"></script>
  <script src="result.js?v=2"></script>
</body>
</html>
`;
  fs.writeFileSync('index.html', html);
  console.log("Fixed index.html structure.");
} else {
  console.log("Could not find SCREEN 2 cut point.");
}
