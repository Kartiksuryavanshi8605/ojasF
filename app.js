/* ═══════════════════════════════════════════════════════
   OJAS — app.js
   Global state, dark mode, landing, particles, session
═══════════════════════════════════════════════════════ */

/* ── Service Worker ── */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

/* ── Global State ── */
const App = {
  name: '',
  scores: { v: 0, p: 0, k: 0 },
  log: [],
  currentQ: 0,
  locked: false,
};

const SESSION_KEY = 'ojas_session';

/* ── Screen routing ── */
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

/* ── Dark mode ── */
(function initTheme() {
  const saved = localStorage.getItem('ojasTheme') || 'light';
  applyTheme(saved);
})();

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  localStorage.setItem('ojasTheme', t);
  document.getElementById('dark-btn').textContent = t === 'dark' ? '☀️' : '🌙';
}

document.getElementById('dark-btn').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

/* ── Particle canvas ── */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, pts = [], running = false;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function Particle() { this.reset(); }
  Particle.prototype.reset = function () {
    this.x    = Math.random() * W;
    this.y    = Math.random() * H;
    this.r    = Math.random() * 1.6 + 0.4;
    this.vx   = (Math.random() - 0.5) * 0.26;
    this.vy   = -(Math.random() * 0.42 + 0.14);
    this.a    = Math.random() * 0.38 + 0.1;
    this.life = 0;
    this.max  = Math.random() * 260 + 120;
    this.pink = Math.random() > 0.5;
  };

  for (let i = 0; i < 55; i++) {
    const p = new Particle();
    p.life = Math.random() * p.max;
    pts.push(p);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function draw() {
    if (!running || prefersReducedMotion.matches) return;
    ctx.clearRect(0, 0, W, H);
    const dark = document.documentElement.getAttribute('data-theme') === 'dark';
    pts.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.life++;
      if (p.life > p.max || p.y < -8) p.reset();
      const prog = p.life / p.max;
      const alpha = prog < 0.2 ? prog / 0.2 : prog > 0.8 ? (1 - prog) / 0.2 : 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      const col = p.pink
        ? (dark ? '220,100,130' : '184,56,80')
        : (dark ? '210,168,80'  : '184,137,42');
      ctx.fillStyle = `rgba(${col},${p.a * alpha})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  // Only animate when landing screen is visible
  const obs = new IntersectionObserver(entries => {
    running = entries[0].isIntersecting;
    if (running) draw();
  }, { threshold: 0.01 });
  obs.observe(document.getElementById('screen-landing'));
})();

/* ── Cursor glow on landing ── */
document.getElementById('screen-landing').addEventListener('mousemove', e => {
  const dark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelector('.land-bg').style.background =
    `radial-gradient(ellipse 480px 480px at ${e.clientX}px ${e.clientY}px,
      ${dark ? 'rgba(210,168,80,.18)' : 'rgba(184,137,42,.12)'},transparent)`;
});

/* ── Landing — two-phase flow ── */
const btnEnter    = document.getElementById('btn-enter');
const btnNameBack = document.getElementById('btn-name-back');
const btnStart    = document.getElementById('btn-start');
const inpName     = document.getElementById('inp-name');
const namePanel   = document.getElementById('land-name-panel');

// Prefill saved name
const savedName = localStorage.getItem('ojasName');
if (savedName) inpName.value = savedName;

function trapFocus(e) {
  const focusable = namePanel.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusable.length === 0) return;
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === 'Escape') closeNamePanel();
  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }
}

function closeNamePanel() {
  namePanel.classList.remove('open');
  namePanel.setAttribute('aria-hidden', 'true');
  namePanel.removeEventListener('keydown', trapFocus);
  btnEnter.focus();
}

btnEnter.addEventListener('click', () => {
  namePanel.classList.add('open');
  namePanel.removeAttribute('aria-hidden');
  setTimeout(() => {
    inpName.focus();
    namePanel.addEventListener('keydown', trapFocus);
  }, 460);
});

btnNameBack.addEventListener('click', closeNamePanel);

btnStart.addEventListener('click', startFromLanding);
inpName.addEventListener('keypress', e => { if (e.key === 'Enter') startFromLanding(); });

function startFromLanding() {
  const n = inpName.value.trim();
  if (!n) {
    inpName.classList.add('shake');
    setTimeout(() => inpName.classList.remove('shake'), 380);
    inpName.focus();
    return;
  }
  App.name = n;
  localStorage.setItem('ojasName', n);
  clearSession();
  App.scores = { v: 0, p: 0, k: 0 };
  App.log = [];
  App.currentQ = 0;
  App.locked = false;
  startQuiz();
}

/* ── Retake ── */
document.getElementById('btn-retake').addEventListener('click', retake);

function retake() {
  clearSession();
  namePanel.classList.remove('open');
  namePanel.setAttribute('aria-hidden', 'true');
  inpName.value = App.name;
  showScreen('screen-landing');
}

/* ── Session persistence ── */
function saveSession() {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({
      name: App.name,
      scores: App.scores,
      log: App.log,
      currentQ: App.currentQ,
    }));
    const ind = document.getElementById('save-indicator');
    ind.classList.add('show');
    clearTimeout(ind._t);
    ind._t = setTimeout(() => ind.classList.remove('show'), 1800);
  } catch (e) {}
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return false;
    const s = JSON.parse(raw);
    if (!s || typeof s.currentQ !== 'number' || !s.scores) return false;
    App.name = s.name || '';
    App.scores = s.scores;
    App.log = s.log || [];
    App.currentQ = s.currentQ;
    return true;
  } catch (e) { return false; }
}

function clearSession() {
  try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
}

/* ── Restore mid-quiz session on load ── */
(function restoreSession() {
  if (loadSession() && App.currentQ < QUESTIONS.length) {
    inpName.value = App.name;
    startQuiz();
  }
})();