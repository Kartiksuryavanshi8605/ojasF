/* ═══════════════════════════════════════════════════════
   OJAS — food-checker.js
   AI-powered logic for searching foods and evaluating doshic impact
═══════════════════════════════════════════════════════ */

// WARNING: Hardcoding API keys in frontend JS is a critical security risk!
// For a frontend-only app, at minimum restrict the key's allowed referrer domains in Google Cloud Console.
// To fix completely, use a backend proxy (like a Cloudflare Worker or Vercel serverless function).
const GEMINI_API_KEY = "AIzaSyBlvWKhkEa7zHSNNJ-kAj3SVyDeo4uPSuA";

function initFoodChecker() {
  const container = document.getElementById('food-checker-card');
  if (!container) return;

  const dom = localStorage.getItem('ojasPrakriti');
  const doshaName = dom ? (dom === 'v' ? 'Vata' : (dom === 'p' ? 'Pitta' : 'Kapha')) : null;

  container.innerHTML = `
    <div class="card-head" style="margin-bottom:1.5rem;"><span class="card-icon">🍎</span><h3 class="card-title">Food Compatibility</h3></div>
    
    <div id="food-empty-state" style="text-align:center; padding-bottom: 1rem; transition: opacity 0.3s; ${!dom ? 'opacity:0.5; pointer-events:none;' : ''}">
      <div style="font-size: 3.5rem; line-height:1; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06)); margin-bottom: 0.8rem; animation: sway 4s ease-in-out infinite;">🌿</div>
      <p style="font-size: 0.85rem; color: var(--ink3); margin-bottom:0;">
        Analyzed for your Prakriti: <strong style="color:var(--ink);">${doshaName || 'Unknown'}</strong>
      </p>
    </div>
    
    <div class="food-search-wrapper" style="position:relative; display:flex; gap:10px; margin-bottom:1.2rem;">
      <input type="text" id="food-search-input" class="food-search-input name-field" style="flex:1; padding:0.85rem 1.2rem; text-align:left;" placeholder="Search any food (e.g. Kombucha)..." autocomplete="off" ${!dom ? 'disabled' : ''} />
      <button id="btn-food-analyze" class="btn btn--gold btn-food-analyze" ${!dom ? 'disabled' : ''}>Analyze</button>
    </div>
    
    <div id="food-suggestions" style="display:flex; justify-content:center; gap:0.5rem; flex-wrap:wrap; margin-bottom:1.5rem; ${!dom ? 'opacity:0.5; pointer-events:none;' : ''}">
      ${['Turmeric', 'Ghee', 'Honey', 'Ginger', 'Milk', 'Quinoa'].map(f => `<button class="food-chip" data-food="${f}">${f}</button>`).join('')}
    </div>
    
    <div id="food-loading" style="display:none; text-align:center; padding: 2.5rem 0; color:var(--ink3); font-size:0.9rem;">
      <div class="pulsing-dots">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      </div>
      <div id="food-loading-text">Consulting ancient texts...</div>
    </div>
    
    <div id="food-result-display" style="display:none; margin-top:1rem; padding-top:1.5rem; border-top:1px solid var(--border);"></div>
  `;

  const input = document.getElementById('food-search-input');
  const btn = document.getElementById('btn-food-analyze');
  const display = document.getElementById('food-result-display');
  const loading = document.getElementById('food-loading');
  const emptyState = document.getElementById('food-empty-state');
  const suggestions = document.getElementById('food-suggestions');
  const loadingTextEl = document.getElementById('food-loading-text');

  // Event Delegation for tab switching
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('dual-tab') && e.target.closest('.food-result-tabs')) {
      const tabBtn = e.target;
      const targetId = tabBtn.getAttribute('data-target');

      const tabContainer = tabBtn.closest('.food-result-tabs');
      tabContainer.querySelectorAll('.dual-tab').forEach(t => t.classList.remove('active'));
      tabBtn.classList.add('active');

      const panels = tabContainer.parentElement.querySelectorAll('.food-panel');
      panels.forEach(p => p.style.display = 'none');
      document.getElementById(targetId).style.display = 'block';
    }
  });

  // Event Delegation for suggestion chips
  if (suggestions) {
    suggestions.addEventListener('click', (e) => {
      if (e.target.classList.contains('food-chip')) {
        input.value = e.target.getAttribute('data-food');
        handleSearch();
      }
    });
  }

  if (!dom) {
    display.innerHTML = `<div style="padding:1rem; text-align:center; color:var(--ink3); font-size:0.95rem;">
      Please complete your Prakriti quiz first for personalized food analysis.
    </div>`;
    display.style.display = 'block';
    return;
  }

  let loadingInterval;
  const loadingMsgs = ["Consulting ancient texts...", "Analyzing Rasa & Virya...", "Balancing the doshas..."];
  const resultCache = {};

  const handleSearch = async () => {
    const q = input.value.trim();
    if (!q) return;

    btn.disabled = true;
    input.disabled = true;
    display.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';
    if (suggestions) suggestions.style.display = 'none';
    loading.style.display = 'block';

    if (resultCache[q.toLowerCase()]) {
      loading.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      if (suggestions) suggestions.style.display = 'flex';
      showFoodResult(q, resultCache[q.toLowerCase()], doshaName, display);
      btn.disabled = false;
      input.disabled = false;
      if (window.innerWidth > 768) input.focus();
      return;
    }

    let msgIdx = 0;
    loadingTextEl.textContent = loadingMsgs[0];
    loadingInterval = setInterval(() => {
      msgIdx = (msgIdx + 1) % loadingMsgs.length;
      loadingTextEl.textContent = loadingMsgs[msgIdx];
    }, 1800);

    try {
      const result = await analyzeFoodAPI(q, doshaName);
      resultCache[q.toLowerCase()] = result;
      loading.style.display = 'none';
      if (result) {
        showFoodResult(q, result, doshaName, display);
      } else {
        display.innerHTML = `<div style="color:#ef4444; padding:1rem; text-align:center;">Could not analyze the food. Please try again.</div>`;
        display.style.display = 'block';
      }
    } catch (e) {
      console.error(e);
      loading.style.display = 'none';
      display.innerHTML = `<div style="color:#ef4444; padding:1rem; text-align:center;">Error communicating with AI. Please check your connection.</div>`;
      display.style.display = 'block';
    } finally {
      clearInterval(loadingInterval);
      btn.disabled = false;
      input.disabled = false;
      if (emptyState) emptyState.style.display = 'block';
      if (suggestions) suggestions.style.display = 'flex';
      if (window.innerWidth > 768) input.focus();
    }
  };

  btn.addEventListener('click', handleSearch);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  });
}

async function analyzeFoodAPI(foodName, doshaName) {
  const prompt = `You are an expert Ayurvedic practitioner. Analyze the food "${foodName}" for a person whose dominant dosha is ${doshaName}. 
Return ONLY a valid JSON object with EXACTLY this structure, no markdown formatting:
{
  "vata": "+" or "-" or "0",
  "pitta": "+" or "-" or "0",
  "kapha": "+" or "-" or "0",
  "brief": "A 1-2 sentence brief insight on why this is good/bad specifically for ${doshaName} dosha.",
  "detailed": "A detailed 3-4 sentence explanation covering the food's Rasa (taste), Virya (energy), Vipaka (post-digestive effect), and Gunas (qualities), and exactly how it impacts ${doshaName}."
}`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { response_mime_type: "application/json" }
    })
  });

  if (!response.ok) throw new Error("API call failed");
  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  // Clean up any potential markdown formatting in the response
  const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(cleanText);
}

function showFoodResult(foodName, data, doshaName, display) {
  // Title-case capitalization and HTML sanitization
  const safeTitleFoodName = foodName
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Get effect properly matching response shape
  const effect = data[doshaName.toLowerCase()];

  let color = "var(--ink)";
  let badgeLabel = "";
  let badgeClass = "";

  if (effect === "-") {
    color = "#10b981"; // Pacifies (Good) -> Green
    badgeLabel = `Beneficial for ${doshaName}`;
    badgeClass = "badge-green";
  } else if (effect === "+") {
    color = "#ef4444"; // Aggravates (Bad) -> Red
    badgeLabel = `Avoid if ${doshaName}`;
    badgeClass = "badge-red";
  } else {
    color = "#f59e0b"; // Neutral -> Orange
    badgeLabel = `Neutral for ${doshaName}`;
    badgeClass = "badge-amber";
  }

  const renderDoshaCard = (dName, dCode, isDominant) => {
    const val = data[dCode];
    let icon = "—", label = "Neutral";
    if (val === "+") { icon = "🔥"; label = "Increases"; }
    else if (val === "-") { icon = "💧"; label = "Pacifies"; }

    return `
      <div class="dosha-impact-card ${isDominant ? 'dominant' : ''}" style="border-left-color: var(--${dCode});">
        ${isDominant ? `<div class="dom-label">★ Your Dosha</div>` : ''}
        <strong style="color:var(--${dCode}); display:block; margin-bottom:.5rem; font-size:0.9rem;">${dName}</strong>
        <div style="font-size:1.8rem; line-height:1; margin-bottom:.3rem;">${icon}</div>
        <div style="font-size:0.75rem; color:var(--ink3); font-weight:700; text-transform:uppercase;">${label}</div>
      </div>
    `;
  };

  const id = "foodtab-" + Math.floor(Math.random() * 1000000);

  const boldAyurvedic = (txt) => {
    return (txt || "").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/\b(Rasa|Virya|Vipaka|Gunas)\b/gi, '<strong style="color:var(--ink);">$1</strong>');
  };

  display.innerHTML = `
    <div class="result-card-anim" style="text-align:center; margin-bottom:1.8rem;">
      <div class="compat-badge ${badgeClass}" style="margin-bottom:0.85rem;">
        ${effect === '-' ? '🟢' : (effect === '+' ? '🔴' : '🟡')} ${badgeLabel}
      </div>
      <h4 style="font-family:'Cormorant Garamond',serif; font-size:1.85rem; color:var(--ink); margin:0; line-height:1.1;">
        ${safeTitleFoodName}
      </h4>
    </div>
    
    <div class="divider" style="margin-bottom:1.5rem; opacity:0.6;"></div>
    
    <div class="result-card-anim" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(90px, 1fr)); gap:12px; text-align:center; margin-bottom:1.8rem; animation-delay:0.1s;">
      ${renderDoshaCard('Vata', 'vata', doshaName === 'Vata')}
      ${renderDoshaCard('Pitta', 'pitta', doshaName === 'Pitta')}
      ${renderDoshaCard('Kapha', 'kapha', doshaName === 'Kapha')}
    </div>
    
    <div class="pill-tabs food-result-tabs result-card-anim" role="tablist" style="animation-delay:0.2s;">
      <button class="pill-tab dual-tab active" role="tab" data-target="${id}-brief">Quick Read</button>
      <button class="pill-tab dual-tab" role="tab" data-target="${id}-detailed">Deep Dive</button>
    </div>
    
    <div id="${id}-brief" class="food-panel result-card-anim" style="display:block; background:var(--bg2); padding:1.4rem 1.2rem; border-radius:12px; border:1px solid var(--border); border-left:4px solid ${color}; font-size:.88rem; color:var(--ink2); line-height:1.65; animation-delay:0.25s;">
      ${boldAyurvedic(data.brief)}
    </div>
    <div id="${id}-detailed" class="food-panel result-card-anim" style="display:none; background:var(--bg2); padding:1.4rem 1.2rem; border-radius:12px; border:1px solid var(--border); border-left:4px solid ${color}; font-size:.88rem; color:var(--ink2); line-height:1.65; animation-delay:0.25s;">
      <div style="font-size:0.68rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; color:var(--ink3); margin-bottom:0.8rem; border-bottom:1px solid var(--border); padding-bottom:0.6rem;">
        Rasa · Virya · Vipaka · Gunas
      </div>
      ${boldAyurvedic(data.detailed)}
    </div>
  `;
  display.style.display = 'block';
}

// Removed global window.switchFoodTab in favor of event delegation in initFoodChecker


