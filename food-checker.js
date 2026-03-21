/* ═══════════════════════════════════════════════════════
   OJAS — food-checker.js
   Logic for searching foods and evaluating doshic impact
═══════════════════════════════════════════════════════ */

function initFoodChecker() {
  const container = document.getElementById('food-checker-card');
  if (!container) return;

  container.innerHTML = `
    <div class="card-head"><span class="card-icon">🍎</span><h3 class="card-title">Food Compatibility Checker</h3></div>
    <p style="font-size:.82rem;color:var(--ink2);line-height:1.6;margin-bottom:1.2rem">
      Search for a food item to see how it affects the Ayurvedic doshas. 
      (<strong style="color:#ef4444">⬆</strong> = Aggravates/Increases, <strong style="color:#10b981">⬇</strong> = Pacifies/Decreases, <strong style="color:var(--ink4)">➖</strong> = Neutral)
    </p>
    
    <div class="food-search-wrapper" style="position:relative; margin-bottom:1rem;">
      <input type="text" id="food-search-input" class="food-search-input" placeholder="Search food (e.g. Apple, Rice, Ghee)..." autocomplete="off" />
      <div id="food-search-results" class="food-dropdown" style="display:none;"></div>
    </div>
    
    <div id="food-result-display" style="display:none; margin-top:1.5rem; padding-top:1.5rem; border-top:1px solid var(--border);"></div>
  `;

  const input = document.getElementById('food-search-input');
  const dropdown = document.getElementById('food-search-results');
  const display = document.getElementById('food-result-display');

  // We grab the primary dosha calculated from App.scores/localStorage
  const dom = localStorage.getItem('ojasPrakriti') || 'v'; // fallback to vata

  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (q.length < 1) {
      dropdown.style.display = 'none';
      return;
    }
    
    const matches = FOOD_DB.filter(f => f.name.toLowerCase().includes(q)).slice(0, 6);
    
    // Support enter key selecting the first match
    input.onkeydown = (e) => {
      if (e.key === 'Enter' && matches.length > 0) {
        e.preventDefault();
        input.value = matches[0].name;
        dropdown.style.display = 'none';
        showFoodResult(matches[0], dom, display);
      }
    };
    
    if (matches.length > 0) {
      dropdown.innerHTML = matches.map(f => `
        <div class="food-dropdown-item" data-name="${f.name}">
          ${f.name}
        </div>
      `).join('');
      dropdown.style.display = 'block';
    } else {
      dropdown.innerHTML = `<div class="food-dropdown-item" style="color:var(--ink3); pointer-events:none">No foods found.</div>`;
      dropdown.style.display = 'block';
    }
  });

  // Hide dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#food-search-input') && !e.target.closest('#food-search-results')) {
      dropdown.style.display = 'none';
    }
  });

  // Handle dropdown selection
  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.food-dropdown-item');
    if (!item) return;
    const foodName = item.dataset.name;
    if (!foodName) return;

    input.value = foodName;
    dropdown.style.display = 'none';

    const food = FOOD_DB.find(f => f.name === foodName);
    if (food) showFoodResult(food, dom, display);
  });
}

function showFoodResult(food, dom, display) {
  const doshaName = dom === 'v' ? 'Vata' : (dom === 'p' ? 'Pitta' : 'Kapha');
  const effect = food[doshaName.toLowerCase()]; // '+', '-', or '0'
  
  let advice = "";
  let color = "var(--ink)";
  
  if (effect === "-") {
    advice = `Excellent choice! This food naturally <strong>pacifies</strong> your dominant ${doshaName} dosha.`;
    color = "#10b981"; // green
  } else if (effect === "+") {
    advice = `Consume cautiously. This food <strong>aggravates</strong> your dominant ${doshaName} dosha. If eating, balance it with appropriate spices.`;
    color = "#ef4444"; // red
  } else {
    advice = `This food has a generally <strong>neutral</strong> effect on your dominant ${doshaName} dosha.`;
    color = "#f59e0b"; // orange
  }

  const renderDoshaEffect = (doshaEffect) => {
    if (doshaEffect === "+") return `<span style="color:#ef4444; font-weight:bold; font-size:1.1rem" title="Increases">⬆</span>`;
    if (doshaEffect === "-") return `<span style="color:#10b981; font-weight:bold; font-size:1.1rem" title="Pacifies">⬇</span>`;
    return `<span style="color:var(--ink4); font-weight:bold; font-size:1.1rem" title="Neutral">➖</span>`;
  };

  display.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:.8rem;">
      <h4 style="font-family:'Cormorant Garamond',serif; font-size:1.4rem; color:var(--ink); margin:0; line-height:1">${food.name}</h4>
    </div>
    
    <div style="background:var(--bg2); padding:1rem; border-radius:8px; border:1px solid var(--border); font-size:.85rem; color:var(--ink2); line-height:1.6; margin-bottom:1.2rem;">
      <strong style="color:${color}; display:block; margin-bottom:0.2rem">Ayurvedic Insight</strong> 
      ${advice}
    </div>
    
    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; text-align:center;">
      <div style="background:var(--vata-bg); border:1px solid rgba(46,110,150,.25); border-radius:8px; padding: .6rem .4rem; font-size:.8rem;">
         <strong style="color:var(--vata); display:block; margin-bottom:.2rem;">Vata</strong>
         ${renderDoshaEffect(food.vata)}
      </div>
      <div style="background:var(--pitta-bg); border:1px solid rgba(176,64,32,.25); border-radius:8px; padding: .6rem .4rem; font-size:.8rem;">
         <strong style="color:var(--pitta); display:block; margin-bottom:.2rem;">Pitta</strong>
         ${renderDoshaEffect(food.pitta)}
      </div>
      <div style="background:var(--kapha-bg); border:1px solid rgba(42,104,64,.25); border-radius:8px; padding: .6rem .4rem; font-size:.8rem;">
         <strong style="color:var(--kapha); display:block; margin-bottom:.2rem;">Kapha</strong>
         ${renderDoshaEffect(food.kapha)}
      </div>
    </div>
  `;
  display.style.display = 'block';
}
