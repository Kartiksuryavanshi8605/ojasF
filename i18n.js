/* ═══════════════════════════════════════════════════════
   OJAS — i18n.js
   Translation engine and UI strings
═══════════════════════════════════════════════════════ */

const translations = {
  en: {
    // Landing
    "brand.sub": "Prakriti Analyser",
    "land.desc": "Rooted in <em>Charaka & Sushruta Samhita</em>. 18 questions across body, physiology and mind — discover your constitution with dosha breakdown, imbalance signs, diet, lifestyle & daily rhythm.",
    "feat.classical": "Classical",
    "feat.dual": "Dual Dosha",
    "feat.diet": "Diet",
    "feat.rhythm": "Rhythm",
    "feat.imbalance": "Imbalance",
    "btn.enter": "Begin My Analysis →",
    "name.back": "← Back",
    "name.title": "What's your name?",
    "name.sub": "Your results will be personalised to you",
    "name.placeholder": "Enter your name…",
    "btn.start": "Start Analysis →",
    "name.hint": "Press Enter or tap Start",

    // Explainer
    "explainer.title": "Before we begin...",
    "explainer.desc": "Your Prakriti is uniquely composed of three vital energies (Doshas).",
    "exp.vata.desc": "Movement & Creativity",
    "exp.pitta.desc": "Digestion & Transformation",
    "exp.kapha.desc": "Structure & Stability",
    "btn.start.quiz": "Reveal My Prakriti →",

    // Quiz
    "quiz.back": "← Back",
    "quiz.saved": "Saved",
    "quiz.loading": "Loading…",
    "quiz.hint": "Press <kbd>A</kbd> · <kbd>B</kbd> · <kbd>C</kbd> to answer",

    // Result header
    "res.retake": "↺ Retake",

    // Result text generated dynamically
    "res.share": "Share:",
    "res.copy": "Copy link",
    "res.copied": "✅ Copied!",
    "res.select": "↑ Select & copy",

    // Tabs
    "tab.overview": "📊 Overview",
    "tab.insights": "🌿 Insights",
    "tab.tools": "⚖️ Tools & Checks",
    "disclaimer": "🪷 Based on Charaka Samhita and Sushruta Samhita — for educational awareness only, not medical diagnosis. Consult a qualified Ayurvedic practitioner for personalised guidance.",
    "btn.retake.bottom": "↺ Retake Quiz",

    "bmi.calc.btn": "ANALYSE HEALTH METRICS"
  },
  hi: {
    // Landing
    "brand.sub": "प्रकृति विश्लेषक",
    "land.desc": "<em>चरक एवं सुश्रुत संहिता</em> पर आधारित। शरीर, कार्यप्रणाली और मन से जुड़े 18 प्रश्न — अपने दोषों, असंतुलन के लक्षणों, आहार, जीवनशैली और दिनचर्या के साथ अपनी मूल प्रकृति जानें।",
    "feat.classical": "शास्त्रीय",
    "feat.dual": "द्वि-दोष",
    "feat.diet": "आहार",
    "feat.rhythm": "दिनचर्या",
    "feat.imbalance": "असंतुलन",
    "btn.enter": "विश्लेषण शुरू करें →",
    "name.back": "← पीछे",
    "name.title": "आपका नाम क्या है?",
    "name.sub": "परिणाम आपके अनुसार व्यक्तिगत होंगे",
    "name.placeholder": "अपना नाम दर्ज करें…",
    "btn.start": "विश्लेषण शुरू करें →",
    "name.hint": "प्रारंभ करने के लिए Enter दबाएं",

    // Explainer
    "explainer.title": "शुरू करने से पहले...",
    "explainer.desc": "आपकी प्रकृति तीन महत्वपूर्ण ऊर्जाओं (दोषों) से मिलकर बनी है।",
    "exp.vata.desc": "गतिशीलता और रचनात्मकता",
    "exp.pitta.desc": "पाचन और परिवर्तन",
    "exp.kapha.desc": "स्थिरता और संरचना",
    "btn.start.quiz": "मेरी प्रकृति दिखाएं →",

    // Quiz
    "quiz.back": "← पीछे",
    "quiz.saved": "सहेजा गया",
    "quiz.loading": "लोड हो रहा है…",
    "quiz.hint": "उत्तर देने के लिए <kbd>A</kbd> · <kbd>B</kbd> · <kbd>C</kbd> दबाएं",

    // Result header
    "res.retake": "↺ फिर से लें",

    // Result
    "res.share": "साझा करें:",
    "res.copy": "लिंक कॉपी करें",
    "res.copied": "✅ कॉपी किया गया!",
    "res.select": "↑ चुनें और कॉपी करें",

    // Tabs
    "tab.overview": "📊 अवलोकन",
    "tab.insights": "🌿 अंतर्दृष्टि (Insights)",
    "tab.tools": "⚖️ उपकरण और जाँच",
    "disclaimer": "🪷 चरक और सुश्रुत संहिता पर आधारित — केवल शैक्षिक जागरूकता के लिए, चिकित्सा निदान (medical diagnosis) के लिए नहीं। व्यक्तिगत मार्गदर्शन के लिए एक योग्य आयुर्वेदिक चिकित्सक से परामर्श लें।",
    "btn.retake.bottom": "↺ प्रश्नोत्तरी फिर से लें",

    "bmi.calc.btn": "स्वास्थ्य मेट्रिक्स का विश्लेषण करें",

    // Result.js Literal string mappings
    "Namaste": "नमस्ते",
    "Dual Dosha Prakriti": "द्वि-दोष प्रकृति",
    "Primary": "प्राथमिक",
    "Secondary": "द्वितीयक",
    "Classical Reference:": "शास्त्रीय संदर्भ:",
    "Dosha Score Breakdown": "दोष स्कोर विवरण",
    "Ayurvedic Insights": "आयुर्वेदिक अंतर्दृष्टि",
    "Why This Is Your Prakriti": "यह आपकी प्रकृति क्यों है",
    "Signs of Imbalance": "असंतुलन के लक्षण",
    "Diet — Āhāra": "आहार — भोजन",
    "Lifestyle — Vihāra": "जीवनशैली — विहार",
    "Exercise — Vyāyāma": "व्यायाम",
    "Daily Rhythm — Dinacharya": "दिनचर्या",
    "Classical Herbs — Dravyaguna": "शास्त्रीय जड़ी-बूटियां",
    "Seasonal Guidance — Ritucharya": "मौसमी मार्गदर्शन — ऋतुचर्या",
    "Prakriti-Adjusted BMI & Health": "प्रकृति-अनुसार स्वास्थ्य और बीएमआई",
    "Age": "आयु",
    "Gender": "लिंग",
    "Male": "पुरुष",
    "Female": "महिला",
    "Physical Activity Level": "शारीरिक गतिविधि स्तर",
    "Weight (kg)": "वजन (kg)",
    "Height (cm)": "ऊंचाई (cm)",
    "Weight (lbs)": "वजन (lbs)",
    "Height (ft)": "ऊंचाई (ft)",
    "Height (in)": "ऊंचाई (inch)",
    "Metric": "मेट्रिक",
    "Imperial": "इंपीरियल",
    "Principle:": "सिद्धांत:",
    "✓ Favour": "✓ अनुकूल",
    "✕ Reduce / Avoid": "✕ बचें / कम करें"
  }
};

/* ── Core i18n State ── */
window.AppLang = localStorage.getItem('ojas_lang') || 'en';

function t(key) {
  return translations[window.AppLang][key] || translations['en'][key] || key;
}

function setLanguage(lang) {
  window.AppLang = lang;
  localStorage.setItem('ojas_lang', lang);

  // Update DOM elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.innerHTML = t(key);
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.setAttribute('placeholder', t(key));
  });

  // Trigger app updates if globally ready
  if (typeof updateContentLanguage === 'function') {
    updateContentLanguage(); // defined in app.js or result.js
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setLanguage(window.AppLang);

  const langBtn = document.getElementById('lang-btn');
  if (langBtn) {
    langBtn.addEventListener('click', () => {
      const newLang = window.AppLang === 'en' ? 'hi' : 'en';
      setLanguage(newLang);
    });
  }
});
