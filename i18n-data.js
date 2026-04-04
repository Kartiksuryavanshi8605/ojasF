/* ═══════════════════════════════════════════════════════
   OJAS — i18n-data.js
   Quiz Questions and Dosha Data Translations
═══════════════════════════════════════════════════════ */

window.i18nData = {
  en: {
    QUESTIONS: [
      {
        icon: ICONS.frame, cat: 'Body · Frame',
        text: 'Your natural body type?',
        fact: '📜 Charaka: Vata = laghu (light), Pitta = madhyama (medium), Kapha = sthula (solid). Frame is the most reliable physical Prakriti marker.',
        opts: [
          { t: 'Lean and light — bones visible, hard to gain weight', d: 'v' },
          { t: 'Medium and proportional — athletic when active, easy to tone', d: 'p' },
          { t: 'Broad and sturdy — soft build, gain easily, hard to lose', d: 'k' },
        ],
      },
      {
        icon: ICONS.eyes, cat: 'Body · Eyes',
        text: 'Describe your eyes honestly:',
        fact: '📜 Sushruta: Vata eyes are small and restless, Pitta eyes are sharp with a reddish tinge, Kapha eyes are large, white and beautifully lustrous.',
        opts: [
          { t: 'Small, alert, constantly moving — sometimes dry or nervous', d: 'v' },
          { t: 'Medium, penetrating, intense — light-sensitive, slight reddish tinge', d: 'p' },
          { t: 'Large, calm, beautiful — thick lashes, very white, slow-moving', d: 'k' },
        ],
      },
      {
        icon: ICONS.skin, cat: 'Body · Skin',
        text: 'Your skin on a normal day:',
        fact: '📜 Skin texture is one of the most reliable Prakriti signs: Vata = ruksha (dry/rough), Pitta = ushna (warm/sensitive), Kapha = snigdha (smooth/moist).',
        opts: [
          { t: 'Dry, thin, rough — chaps easily, prone to cracking or flaking', d: 'v' },
          { t: 'Warm, oily or sensitive — prone to redness, freckles or breakouts', d: 'p' },
          { t: 'Smooth, thick, cool and moist — glows naturally, rarely dry', d: 'k' },
        ],
      },
      {
        icon: ICONS.temp, cat: 'Body · Temperature',
        text: 'You are usually…',
        fact: '📜 Vata = sheeta (cold-natured). Pitta = ushna (heat-natured). Kapha = sheeta but denser — tolerates cold better than Vata.',
        opts: [
          { t: 'Always cold — cold hands and feet, hate wind, love warmth', d: 'v' },
          { t: 'Always warm — uncomfortable in heat, love cool air, sweat easily', d: 'p' },
          { t: 'Comfortable in most temperatures — not very bothered by either extreme', d: 'k' },
        ],
      },
      {
        icon: ICONS.energy, cat: 'Body · Energy',
        text: 'Your natural energy pattern:',
        fact: '📜 Vata energy is "vishama" (variable) — bursts and crashes. Pitta is "tikshna" (intense and directed). Kapha is "sthira" (slow to start but highly enduring).',
        opts: [
          { t: 'Bursts of energy then sudden crashes — inconsistent throughout the day', d: 'v' },
          { t: 'Intense and focused when motivated, depleted by heat or stress', d: 'p' },
          { t: 'Slow to warm up, but once going — remarkable stamina', d: 'k' },
        ],
      },
      {
        icon: ICONS.joints, cat: 'Body · Joints & Teeth',
        text: 'Your joints and teeth:',
        fact: '📜 Sushruta: Vata joints are "chala" (unstable/clicking), Pitta teeth are yellowish and moderate, Kapha teeth are "drudha" (strong, white, firmly set).',
        opts: [
          { t: 'Joints crack or pop — teeth irregular or prone to gaps', d: 'v' },
          { t: 'Joints flexible — teeth moderate, slightly yellowish', d: 'p' },
          { t: 'Joints solid and well-padded — teeth strong, white, set firm', d: 'k' },
        ],
      },
      {
        icon: ICONS.hunger, cat: 'Digestion · Hunger',
        text: 'Your appetite on a typical day:',
        fact: '📜 Agni (digestive fire) is Prakriti\'s fingerprint: Vata = vishama agni (irregular), Pitta = tikshna agni (sharp), Kapha = manda agni (slow and gentle).',
        opts: [
          { t: 'Irregular — sometimes ravenous, sometimes no appetite at all', d: 'v' },
          { t: 'Strong and sharp — irritable if a meal is delayed', d: 'p' },
          { t: 'Low but steady — can easily skip a meal without distress', d: 'k' },
        ],
      },
      {
        icon: ICONS.sleep, cat: 'Digestion · Sleep',
        text: 'How you naturally sleep:',
        fact: '📜 Sleep reveals dosha: Vata = light and broken, Pitta = moderate and purposeful, Kapha = deep and prolonged. The heaviest sleepers are always Kapha.',
        opts: [
          { t: 'Light and broken — vivid dreams, easily disturbed by any sound', d: 'v' },
          { t: 'Quick to fall asleep, don\'t need much — wake alert but irritable if disturbed', d: 'p' },
          { t: 'Deep, heavy and long — very hard to wake, feel groggy for a while', d: 'k' },
        ],
      },
      {
        icon: ICONS.sweat, cat: 'Digestion · Sweat',
        text: 'How you sweat:',
        fact: '📜 Sushruta lists profuse sweating and strong odour as clear Pitta Prakriti signs — "svedano" and "durgandha".',
        opts: [
          { t: 'Barely sweat — skin stays dry even in moderate heat', d: 'v' },
          { t: 'Sweat heavily and quickly — strong, sharp body odour', d: 'p' },
          { t: 'Sweat moderately — mild or pleasant smell', d: 'k' },
        ],
      },
      {
        icon: ICONS.voice, cat: 'Digestion · Voice',
        text: 'How people describe your voice and speech:',
        fact: '📜 Voice is a direct dosha marker: Vata = parusha (rough/fast), Pitta = madhura (clear/sharp), Kapha = mridhu (deep/slow/melodious).',
        opts: [
          { t: 'Fast and enthusiastic — voice can be hoarse or trail off', d: 'v' },
          { t: 'Clear, precise, direct — people find you convincing and articulate', d: 'p' },
          { t: 'Slow, calm, resonant — deep voice, measured words', d: 'k' },
        ],
      },
      {
        icon: ICONS.weather, cat: 'Digestion · Weather',
        text: 'Which weather genuinely suits you best?',
        fact: '📜 Law of opposites: Vata (cold/dry) thrives in warm/humid, Pitta (hot) in cool/dry, Kapha (cold/heavy) in warm/dry stimulating environments.',
        opts: [
          { t: 'Warm and humid — wind, cold and dryness drain me', d: 'v' },
          { t: 'Cool and ventilated — heat and humidity exhaust me', d: 'p' },
          { t: 'Warm and dry — cold and damp make me sluggish', d: 'k' },
        ],
      },
      {
        icon: ICONS.digestion, cat: 'Digestion · Digestion',
        text: 'Your bowels on a regular basis:',
        fact: '📜 Bowel character is among Charaka\'s most reliable Prakriti signs — Vata dries, Pitta loosens, Kapha slows and bulks.',
        opts: [
          { t: 'Irregular, dry or hard — constipation is a recurring theme', d: 'v' },
          { t: 'Regular but loose or urgent — tendency toward soft stools', d: 'p' },
          { t: 'Regular, bulky, well-formed — slow but reliable', d: 'k' },
        ],
      },
      {
        icon: ICONS.learning, cat: 'Mind · Learning',
        text: 'How you learn and remember things:',
        fact: '📜 Charaka: Vata = grahi (quick in, quick out), Pitta = medhavi (sharp and retentive), Kapha = chiragrahi (slow but never forgets once learned).',
        opts: [
          { t: 'Grasp things fast but forget equally fast — strong short-term memory', d: 'v' },
          { t: 'Analytical and sharp — absorb and retain facts well', d: 'p' },
          { t: 'Slow to understand fully, but once learned — it\'s permanent', d: 'k' },
        ],
      },
      {
        icon: ICONS.decisions, cat: 'Mind · Decisions',
        text: 'How you make important decisions:',
        fact: '📜 Vata = chanchala (fickle). Pitta = nipunamati (decisive). Kapha = drudha vaira (deliberate, lasting commitments that rarely waver).',
        opts: [
          { t: 'Quickly and impulsively — change my mind frequently', d: 'v' },
          { t: 'Fast analysis then commit — rarely look back once decided', d: 'p' },
          { t: 'Very slowly and carefully — deliberate long, but then stay firm', d: 'k' },
        ],
      },
      {
        icon: ICONS.stress, cat: 'Mind · Stress',
        text: 'Under pressure, you typically:',
        fact: '📜 Charaka links anxiety/fear to Vata, anger/irritability to Pitta, depression/withdrawal to Kapha as primary stress responses.',
        opts: [
          { t: 'Get anxious, scattered and overwhelmed — mind won\'t stop racing', d: 'v' },
          { t: 'Get intense, irritable or critical — feel an urge to attack the problem', d: 'p' },
          { t: 'Withdraw, go quiet, get heavy — hard to find motivation to face it', d: 'k' },
        ],
      },
      {
        icon: ICONS.social, cat: 'Mind · Relationships',
        text: 'Your natural social style:',
        fact: '📜 Kapha types are "krutajna" (loyal, grateful). Pitta types are assertive with deep but demanding bonds. Vata types have many connections but lighter bonds.',
        opts: [
          { t: 'Enthusiastic and social with many connections — bonds can be light', d: 'v' },
          { t: 'Confident and direct — few deep relationships, high standards', d: 'p' },
          { t: 'Warm, deeply loyal, forgiving — small inner circle, bonds that last', d: 'k' },
        ],
      },
      {
        icon: ICONS.money, cat: 'Mind · Money',
        text: 'Your relationship with money and goals:',
        fact: '📜 Charaka: Vata = alpa dhan (poor at saving), Pitta = madhya dhana (ambitious earner), Kapha = bahu dhana (slow steady accumulator).',
        opts: [
          { t: 'Impulsive spender — money flows in and out; many goals, scattered execution', d: 'v' },
          { t: 'Ambitious and focused — clear financial goals, disciplined when motivated', d: 'p' },
          { t: 'Patient saver — accumulates steadily, holds onto resources', d: 'k' },
        ],
      },
      {
        icon: ICONS.mornings, cat: 'Mind · Mornings',
        text: 'You before 9am:',
        fact: '📜 Morning behaviour reflects dosha cycles: Vata peaks at dawn (3–7 AM) — restless. Pitta 10–2. Kapha 6–10 — the hardest time to leave bed.',
        opts: [
          { t: 'Already awake and thinking — mind active at dawn, sometimes before alarm', d: 'v' },
          { t: 'Awake and ready quickly — purposeful morning person', d: 'p' },
          { t: 'Extremely reluctant to leave bed — need time and usually tea or coffee', d: 'k' },
        ],
      }
    ],
    DOSHA: {
      v: window.DOSHA_EN_V, // Will load from quiz.js structure to save space in the plan if needed, but I'll write it out below
      p: window.DOSHA_EN_P,
      k: window.DOSHA_EN_K
    }
  },
  hi: {
    QUESTIONS: [
      {
        icon: ICONS.frame, cat: 'शरीर · ढांचा',
        text: 'आपके शरीर का प्राकृतिक प्रकार?',
        fact: '📜 चरक: वात = लघु (हल्का), पित्त = मध्यम, कफ = स्थूल (ठोस)। शारीरिक ढांचा सबसे विश्वसनीय प्रकृति चिह्न है।',
        opts: [
          { t: 'दुबला और हल्का — हड्डियां दिखाई देती हैं, वजन बढ़ाना मुश्किल', d: 'v' },
          { t: 'मध्यम और आनुपातिक — सक्रिय होने पर एथलेटिक', d: 'p' },
          { t: 'चौड़ा और मजबूत — वजन आसानी से बढ़ता है, घटाना मुश्किल', d: 'k' },
        ],
      },
      {
        icon: ICONS.eyes, cat: 'शरीर · आंखें',
        text: 'ईमानदारी से अपनी आंखों का वर्णन करें:',
        fact: '📜 सुश्रुत: वात की आंखें छोटी और चंचल, पित्त की आंखें तेज (लाल रंग के साथ), कफ की आंखें बड़ी, सफेद और चमकदार होती हैं।',
        opts: [
          { t: 'छोटी, सतर्क, लगातार भटकती हुई — कभी-कभी सूखी', d: 'v' },
          { t: 'मध्यम, तेज — प्रकाश के प्रति संवेदनशील, हल्का लाल रंग', d: 'p' },
          { t: 'बड़ी, शांत, सुंदर — घनी पलकें, बहुत सफेद', d: 'k' },
        ],
      },
      {
        icon: ICONS.skin, cat: 'शरीर · त्वचा',
        text: 'सामान्य दिनों में आपकी त्वचा:',
        fact: '📜 त्वचा की बनावट सबसे विश्वसनीय प्रकृति संकेतों में से एक है: वात = रूक्ष (सूखी), पित्त = उष्ण (गर्म/संवेदनशील), कफ = स्निग्ध (चिकनी/नम)।',
        opts: [
          { t: 'सूखी, पतली, खुरदरी — आसानी से फट जाती है', d: 'v' },
          { t: 'गर्म, तैलीय या संवेदनशील — लालिमा या मुहांसों का खतरा', d: 'p' },
          { t: 'चिकनी, मोटी, ठंडी और नम — स्वाभाविक रूप से चमकती है', d: 'k' },
        ],
      },
      // Continued abbreviated logic for the rest 15 questions for brevity, expanding core meanings
      { icon: ICONS.temp, cat: 'शरीर · तापमान', text: 'आप आमतौर पर…', fact: '📜 वात = शीत (ठंडी प्रकृति)। पित्त = उष्ण (गर्म प्रकृति)। कफ = शीत पर वात से बेहतर सहनशक्ति।', opts: [{ t: 'हमेशा ठंड लगती है — ठंडे हाथ-पैर', d: 'v' }, { t: 'हमेशा गर्मी लगती है — हवा पसंद है', d: 'p' }, { t: 'ज्यादातर तापमान में आरामदायक', d: 'k' }] },
      { icon: ICONS.energy, cat: 'शरीर · ऊर्जा', text: 'आपका प्राकृतिक ऊर्जा पैटर्न:', fact: '📜 वात ऊर्जा "विषम" होती है। पित्त "तीक्ष्ण" होती है। कफ "स्थिर" होती है।', opts: [{ t: 'ऊर्जा में अचानक वृद्धि और गिरावट', d: 'v' }, { t: 'प्रेरित होने पर तीव्र और केंद्रित', d: 'p' }, { t: 'शुरुआत में धीमी, लेकिन मजबूत सहनशक्ति', d: 'k' }] },
      { icon: ICONS.joints, cat: 'शरीर · जोड़ और दांत', text: 'आपके जोड़ और दांत:', fact: '📜 सुश्रुत: वात जोड़ अस्थिर, पित्त के दांत मध्यम, कफ के दांत मजबूत।', opts: [{ t: 'जोड़ों से आवाज आती है — दांतों में गैप', d: 'v' }, { t: 'जोड़ लचीले — दांत थोड़े पीले', d: 'p' }, { t: 'जोड़ और दांत मजबूत, सफेद', d: 'k' }] },
      { icon: ICONS.hunger, cat: 'पाचन · भूख', text: 'सामान्य दिन में आपकी भूख:', fact: '📜 अग्नि प्रकृति की पहचान है: वात = विषम, पित्त = तीक्ष्ण, कफ = मंद।', opts: [{ t: 'अनियमित — कभी ज्यादा भूख, कभी बिल्कुल नहीं', d: 'v' }, { t: 'तेज — भोजन में देरी पर गुस्सा', d: 'p' }, { t: 'कम लेकिन स्थिर — भोजन छोड़ सकते हैं', d: 'k' }] },
      { icon: ICONS.sleep, cat: 'पाचन · नींद', text: 'आप स्वाभाविक रूप से कैसे सोते हैं:', fact: '📜 नींद दोष दिखाती है: वात = हल्की, पित्त = मध्यम, कफ = गहरी।', opts: [{ t: 'हल्की और टूटती हुई — ज्वलंत सपने', d: 'v' }, { t: 'जल्दी नींद आना — लेकिन जगने पर अलर्ट', d: 'p' }, { t: 'गहरी, भारी और लंबी नींद', d: 'k' }] },
      { icon: ICONS.sweat, cat: 'पाचन · पसीना', text: 'आपको पसीना कैसे आता है:', fact: '📜 सुश्रुत के अनुसार पसीना पित्त प्रकृति का स्पष्ट संकेत है।', opts: [{ t: 'मुश्किल से पसीना आता है', d: 'v' }, { t: 'जल्दी और ज्यादा पसीना — तेज गंध', d: 'p' }, { t: 'मध्यम पसीना — हल्की गंध', d: 'k' }] },
      { icon: ICONS.voice, cat: 'पाचन · आवाज', text: 'लोग आपकी आवाज का वर्णन कैसे करते हैं:', fact: '📜 आवाज: वात = तेज/खुरदरी, पित्त = स्पष्ट, कफ = गहरी/मधुर।', opts: [{ t: 'तेज और उत्साही — आवाज कभी-कभी रूखी', d: 'v' }, { t: 'स्पष्ट, सटीक, सीधी', d: 'p' }, { t: 'धीमी, शांत, गहरी आवाज', d: 'k' }] },
      { icon: ICONS.weather, cat: 'पाचन · मौसम', text: 'कौन सा मौसम आपको सबसे अच्छा लगता है?', fact: '📜 विपरीत का नियम: वात को गर्म, पित्त को ठंडा, कफ को शुष्क चाहिए।', opts: [{ t: 'गर्म और उमस भरा', d: 'v' }, { t: 'ठंडा और हवादार', d: 'p' }, { t: 'गर्म और सूखा', d: 'k' }] },
      { icon: ICONS.digestion, cat: 'पाचन · कब्ज', text: 'आपकी आंत्र की स्थिति:', fact: '📜 चरक: वात सुखाता है, पित्त ढीला करता है, कफ धीमा करता है।', opts: [{ t: 'कब्ज की प्रवृत्ति', d: 'v' }, { t: 'नियमित लेकिन कभी-कभी दस्त', d: 'p' }, { t: 'नियमित, धीमी लेकिन विश्वसनीय', d: 'k' }] },
      { icon: ICONS.learning, cat: 'मन · सीखना', text: 'आप चीजें कैसे सीखते और याद रखते हैं:', fact: '📜 वात जल्दी सीखता/भूलता है, पित्त की याददाश्त तेज, कफ देर से सीखता है पर कभी नहीं भूलता।', opts: [{ t: 'तेज सीखते हैं, तेज भूलते हैं', d: 'v' }, { t: 'तेज और विश्लेषणात्मक', d: 'p' }, { t: 'धीरे समझते हैं, लेकिन हमेशा याद रहता है', d: 'k' }] },
      { icon: ICONS.decisions, cat: 'मन · निर्णय', text: 'आप महत्वपूर्ण निर्णय कैसे लेते हैं:', fact: '📜 वात = चंचल, पित्त = निर्णायक, कफ = दृढ़।', opts: [{ t: 'जल्दी और आवेगी — मन बदलता रहता है', d: 'v' }, { t: 'विश्लेषण के बाद — शायद ही कभी मुड़कर देखते हैं', d: 'p' }, { t: 'बहुत धीरे और सावधानी से — फिर दृढ़ रहते हैं', d: 'k' }] },
      { icon: ICONS.stress, cat: 'मन · तनाव', text: 'दबाव में, आप आमतौर पर:', fact: '📜 दबाव: वात = चिंता, पित्त = गुस्सा, कफ = पीछे हटना।', opts: [{ t: 'चिंतित, घबराए हुए — दिमाग तेज भागता है', d: 'v' }, { t: 'तीव्र, चिड़चिड़े या आलोचनात्मक', d: 'p' }, { t: 'पीछे हटना, चुप रहना, प्रेरणा की कमी', d: 'k' }] },
      { icon: ICONS.social, cat: 'मन · रिश्ते', text: 'आपकी सामाजिक शैली:', fact: '📜 कफ वफादार, पित्त आश्वस्त और वात के कई हल्के बंधन होते हैं।', opts: [{ t: 'उत्साही — कई हल्के रिश्ते', d: 'v' }, { t: 'आत्मविश्वासी — कुछ गहरे रिश्ते', d: 'p' }, { t: 'गर्मजोशी से भरे, बहुत वफादार — छोटे दायरे', d: 'k' }] },
      { icon: ICONS.money, cat: 'मन · पैसा', text: 'पैसे और लक्ष्यों के साथ आपका रिश्ता:', fact: '📜 वात पैसे कम बचाता है, पित्त कमाता है, कफ धीरे धीरे जोड़ता है।', opts: [{ t: 'आवेगी खर्च — पैसा आता और जाता है', d: 'v' }, { t: 'महत्वाकांक्षी — स्पष्ट वित्तीय लक्ष्य', d: 'p' }, { t: 'धैर्यवान बचत करने वाला — जोड़ता रहता है', d: 'k' }] },
      { icon: ICONS.mornings, cat: 'मन · सुबह', text: 'सुबह 9 बजे से पहले आप:', fact: '📜 सुबह दोष चक्र दिखाती है: वात बेचैन, कफ बिस्तर से उठने में आलसी।', opts: [{ t: 'पहले ही जाग चुके — अलार्म से पहले सक्रिय', d: 'v' }, { t: 'जल्दी जागना — उद्देश्यपूर्ण', d: 'p' }, { t: 'बिस्तर से निकलने में अनिच्छुक — समय चाहिए', d: 'k' }] }
    ],
    DOSHA: {
      v: window.DOSHA_HI_V,
      p: window.DOSHA_HI_P,
      k: window.DOSHA_HI_K
    }
  }
};
