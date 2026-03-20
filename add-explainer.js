const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
const explainerHTML = `  </section>

  <!-- ═══════════════════════════════════════
       SCREEN 1.5 — EXPLAINER
  ═══════════════════════════════════════ -->
  <section id="screen-explainer" class="screen" aria-label="Dosha Explainer">
    <div class="explainer-content">
      <h2 class="explainer-title" id="explainer-title">Before we begin...</h2>
      <p class="explainer-desc" id="explainer-desc">Your Prakriti is uniquely composed of three vital energies (Doshas).</p>
      
      <div class="explainer-doshas">
        <div class="explainer-dosha" id="exp-vata">
          <div class="explainer-icon" id="icon-exp-v"></div>
          <div>
            <h3>Vata</h3>
            <p>Movement &amp; Creativity</p>
          </div>
        </div>
        <div class="explainer-dosha" id="exp-pitta">
          <div class="explainer-icon" id="icon-exp-p"></div>
          <div>
            <h3>Pitta</h3>
            <p>Digestion &amp; Transformation</p>
          </div>
        </div>
        <div class="explainer-dosha" id="exp-kapha">
          <div class="explainer-icon" id="icon-exp-k"></div>
          <div>
            <h3>Kapha</h3>
            <p>Structure &amp; Stability</p>
          </div>
        </div>
      </div>
      
      <button class="btn btn--rose btn--full" id="btn-start-quiz" style="opacity: 0; transform: translateY(20px); transition: all 0.5s ease; max-width: 320px; margin: 2rem auto 0; display: block;">Reveal My Prakriti →</button>
    </div>
  </section>

  <!-- ═══════════════════════════════════════
       SCREEN 2 — QUIZ`;
html = html.replace(/  <\/section>\s*<!-- ═══════════════════════════════════════\s*SCREEN 2 — QUIZ/, explainerHTML);
fs.writeFileSync('index.html', html);

// 2. Update style.css
let css = fs.readFileSync('style.css', 'utf8');
css += `

/* ── Explainer Screen ── */
#screen-explainer {
  display: none;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
}
#screen-explainer.active {
  display: flex;
}
.explainer-content {
  max-width: 800px;
  width: 100%;
}
.explainer-title {
  font-family: var(--font-heading);
  font-size: 2.2rem;
  color: var(--ink);
  margin-bottom: 0.5rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
}
.explainer-desc {
  font-size: 1.1rem;
  color: var(--ink3);
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease 0.2s;
}
.explainer-doshas {
  display: flex;
  gap: 1.5rem;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.explainer-dosha {
  flex: 1;
  background: var(--surface);
  padding: 2rem 1.5rem;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid var(--border);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease;
  position: relative;
  overflow: hidden;
}
.explainer-dosha::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 4px;
}
#exp-vata::before { background: var(--cv); }
#exp-pitta::before { background: var(--cp); }
#exp-kapha::before { background: var(--ck); }

.explainer-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}
.explainer-icon svg {
  width: 28px;
  height: 28px;
}
#exp-vata .explainer-icon { background: rgba(59, 130, 246, 0.1); color: var(--cv); }
#exp-pitta .explainer-icon { background: rgba(239, 68, 68, 0.1); color: var(--cp); }
#exp-kapha .explainer-icon { background: rgba(16, 185, 129, 0.1); color: var(--ck); }

.explainer-dosha h3 {
  font-family: var(--font-heading);
  font-size: 1.4rem;
  color: var(--ink);
  margin-bottom: 0.4rem;
}
.explainer-dosha p {
  font-size: 0.95rem;
  color: var(--ink3);
  line-height: 1.4;
  margin: 0;
}

@media (max-width: 768px) {
  .explainer-doshas { flex-direction: column; gap: 1rem; }
  .explainer-dosha { padding: 1.5rem; display: flex; align-items: center; text-align: left; gap: 1.5rem; }
  .explainer-icon { margin: 0; flex-shrink: 0; }
  .explainer-dosha > div:not(.explainer-icon) { flex: 1; }
  .explainer-dosha h3 { margin-bottom: 0.2rem; }
}

/* Animation states added via JS */
.explainer-content.animate .explainer-title { opacity: 1; transform: translateY(0); }
.explainer-content.animate .explainer-desc { opacity: 1; transform: translateY(0); }
.explainer-content.animate #exp-vata { opacity: 1; transform: translateY(0); transition-delay: 0.4s; }
.explainer-content.animate #exp-pitta { opacity: 1; transform: translateY(0); transition-delay: 0.6s; }
.explainer-content.animate #exp-kapha { opacity: 1; transform: translateY(0); transition-delay: 0.8s; }
.explainer-content.animate #btn-start-quiz { opacity: 1; transform: translateY(0); transition-delay: 1.2s; }
`;
fs.writeFileSync('style.css', css);

// 3. Update app.js
let app = fs.readFileSync('app.js', 'utf8');

app = app.replace(/startQuiz\(\);/, 'showExplainer();');

app += `
/* ── Explainer ── */
function showExplainer() {
  showScreen('screen-explainer');
  // Trigger animations
  setTimeout(() => {
    document.querySelector('.explainer-content').classList.add('animate');
  }, 50);
}

document.getElementById('btn-start-quiz').addEventListener('click', () => {
  // Remove animation class for next time
  document.querySelector('.explainer-content').classList.remove('animate');
  startQuiz();
});
`;

app = app.replace(/i\('icon-feat-classical', ICONS\.classical\);/, `i('icon-exp-v', ICONS.vata);
  i('icon-exp-p', ICONS.pitta);
  i('icon-exp-k', ICONS.kapha);
  i('icon-feat-classical', ICONS.classical);`);

fs.writeFileSync('app.js', app);
console.log("Explainer successfully added.");
