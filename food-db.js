/* ═══════════════════════════════════════════════════════
   OJAS — food-db.js
   Database of basic foods and their Ayurvedic doshic effects.
   (+) Increases/Aggravates, (-) Decreases/Pacifies, (0) Neutral
═══════════════════════════════════════════════════════ */

const FOOD_DB = [
  // ── Fruits ──
  { name: "🍎 Apple (Raw)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🥧 Apple (Cooked)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🥑 Avocado", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍌 Banana", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍓 Berries", vata: "-", pitta: "-", kapha: "-" },
  { name: "🍒 Cherries", vata: "-", pitta: "-", kapha: "-" },
  { name: "🥥 Coconut", vata: "-", pitta: "-", kapha: "+" },
  { name: "🏜️ Dates", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍇 Grapes", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍋 Lemon", vata: "-", pitta: "-", kapha: "-" },
  { name: "🥭 Mango", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍈 Melon", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍊 Orange (Sweet)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🥭 Papaya", vata: "-", pitta: "-", kapha: "-" },
  { name: "🍑 Peach", vata: "-", pitta: "-", kapha: "-" },
  { name: "🍐 Pear", vata: "+", pitta: "-", kapha: "-" },
  { name: "🍍 Pineapple (Sweet)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍎 Pomegranate", vata: "-", pitta: "-", kapha: "-" },
  { name: "🍉 Watermelon", vata: "+", pitta: "-", kapha: "+" },

  // ── Vegetables ──
  { name: "🎋 Asparagus", vata: "-", pitta: "-", kapha: "-" },
  { name: "🧅 Beetroot (Cooked)", vata: "-", pitta: "+", kapha: "+" },
  { name: "🥦 Broccoli (Raw)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🥦 Broccoli (Cooked)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🥬 Cabbage", vata: "+", pitta: "-", kapha: "-" },
  { name: "🥕 Carrot (Raw)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🥕 Carrot (Cooked)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🥦 Cauliflower", vata: "+", pitta: "-", kapha: "-" },
  { name: "🥒 Cucumber", vata: "+", pitta: "-", kapha: "-" },
  { name: "🧄 Garlic", vata: "-", pitta: "+", kapha: "-" },
  { name: "🥬 Leafy Greens (Raw)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🥬 Leafy Greens (Cooked)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🍄 Mushroom", vata: "+", pitta: "-", kapha: "-" },
  { name: "🧅 Onion (Raw)", vata: "+", pitta: "+", kapha: "-" },
  { name: "🧅 Onion (Cooked)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🥔 Potato (White)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🍠 Sweet Potato", vata: "-", pitta: "-", kapha: "+" },
  { name: "🥬 Spinach (Raw)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🥬 Spinach (Cooked)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍅 Tomato", vata: "+", pitta: "+", kapha: "+" },
  { name: "🥒 Zucchini", vata: "-", pitta: "-", kapha: "-" },

  // ── Grains ──
  { name: "🌾 Amaranth", vata: "-", pitta: "-", kapha: "-" },
  { name: "🌾 Barley", vata: "+", pitta: "-", kapha: "-" },
  { name: "🌾 Buckwheat", vata: "+", pitta: "-", kapha: "-" },
  { name: "🌽 Corn", vata: "+", pitta: "-", kapha: "-" },
  { name: "🌾 Millet", vata: "+", pitta: "-", kapha: "-" },
  { name: "🥣 Oats (Cooked)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🥣 Oats (Dry)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🌾 Quinoa", vata: "-", pitta: "-", kapha: "-" },
  { name: "🍚 Rice (Basmati/White)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍚 Rice (Brown)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍞 Wheat", vata: "-", pitta: "-", kapha: "+" },

  // ── Legumes ──
  { name: "🫘 Black Beans", vata: "+", pitta: "-", kapha: "-" },
  { name: "🧆 Chickpeas (Garbanzo)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🫘 Lentils (Brown/Green)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🫘 Lentils (Red/Yellow)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🫘 Mung Beans (Moong Dal)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🫘 Kidney Beans", vata: "+", pitta: "-", kapha: "-" },
  { name: "🫘 Soybeans / Tofu", vata: "+", pitta: "-", kapha: "+" },

  // ── Dairy & Alternatives ──
  { name: "🧈 Butter (Unsalted)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🧀 Cheese (Aged/Hard)", vata: "+", pitta: "+", kapha: "+" },
  { name: "🧀 Cheese (Soft/Fresh)", vata: "-", pitta: "+", kapha: "+" },
  { name: "🧈 Ghee (Clarified Butter)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🥛 Milk (Cow)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🥛 Milk (Almond)", vata: "-", pitta: "-", kapha: "0" },
  { name: "🥛 Milk (Soy)", vata: "+", pitta: "-", kapha: "+" },
  { name: "🥣 Yogurt (Cow)", vata: "+", pitta: "+", kapha: "+" },

  // ── Nuts & Seeds ──
  { name: "🌰 Almonds (Soaked)", vata: "-", pitta: "-", kapha: "+" },
  { name: "🌰 Almonds (With Skin)", vata: "-", pitta: "+", kapha: "+" },
  { name: "🥜 Cashews", vata: "-", pitta: "+", kapha: "+" },
  { name: "🌰 Chia Seeds", vata: "-", pitta: "-", kapha: "+" },
  { name: "🌰 Flax Seeds", vata: "-", pitta: "+", kapha: "+" },
  { name: "🥜 Peanuts", vata: "+", pitta: "+", kapha: "+" },
  { name: "🌰 Pecans", vata: "-", pitta: "-", kapha: "+" },
  { name: "🎃 Pumpkin Seeds", vata: "-", pitta: "+", kapha: "+" },
  { name: "🌰 Sesame Seeds", vata: "-", pitta: "+", kapha: "+" },
  { name: "🌻 Sunflower Seeds", vata: "-", pitta: "+", kapha: "-" },
  { name: "🧠 Walnuts", vata: "-", pitta: "+", kapha: "+" },

  // ── Spices & Flavorings ──
  { name: "🌶️ Black Pepper", vata: "-", pitta: "+", kapha: "-" },
  { name: "🌿 Cardamom", vata: "-", pitta: "-", kapha: "-" },
  { name: "🍂 Cinnamon", vata: "-", pitta: "+", kapha: "-" },
  { name: "🌿 Coriander", vata: "-", pitta: "-", kapha: "-" },
  { name: "🌿 Cumin", vata: "-", pitta: "-", kapha: "-" },
  { name: "🌿 Fennel", vata: "-", pitta: "-", kapha: "-" },
  { name: "🫚 Ginger (Fresh)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🫚 Ginger (Dried)", vata: "-", pitta: "+", kapha: "-" },
  { name: "🌿 Mint", vata: "-", pitta: "-", kapha: "-" },
  { name: "🌶️ Mustard Seeds", vata: "-", pitta: "+", kapha: "+" },
  { name: "🧂 Salt (Rock/Sea)", vata: "-", pitta: "+", kapha: "+" },
  { name: "🫚 Turmeric", vata: "-", pitta: "-", kapha: "-" },

  // ── Oils ──
  { name: "🥥 Coconut Oil", vata: "-", pitta: "-", kapha: "+" },
  { name: "🫒 Olive Oil", vata: "-", pitta: "-", kapha: "+" },
  { name: "🌿 Sesame Oil", vata: "-", pitta: "+", kapha: "-" },
  { name: "🌻 Sunflower Oil", vata: "-", pitta: "-", kapha: "+" },

  // ── Sweeteners ──
  { name: "🍯 Honey (Raw)", vata: "+", pitta: "+", kapha: "-" },
  { name: "🍁 Maple Syrup", vata: "-", pitta: "-", kapha: "+" },
  { name: "🎋 Jaggery", vata: "-", pitta: "-", kapha: "+" },
  { name: "🍬 Sugar (White)", vata: "+", pitta: "+", kapha: "+" },
  
  // ── Beverages ──
  { name: "☕ Coffee (Black)", vata: "+", pitta: "+", kapha: "-" },
  { name: "☕ Tea (Black)", vata: "+", pitta: "+", kapha: "-" },
  { name: "🍵 Tea (Green)", vata: "+", pitta: "-", kapha: "-" },
  { name: "🍵 Tea (Herbal/Mint)", vata: "-", pitta: "-", kapha: "-" },
  { name: "💧 Water (Warm)", vata: "-", pitta: "-", kapha: "-" },
  { name: "🧊 Water (Ice Cold)", vata: "+", pitta: "+", kapha: "+" }
];
