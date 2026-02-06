const questions = [
    { q: "Your body build is:", a: [
      { t: "Thin and light", d: "vata" },
      { t: "Medium and muscular", d: "pitta" },
      { t: "Broad and strong", d: "kapha" }
    ]},
    { q: "Your appetite is:", a: [
      { t: "Irregular", d: "vata" },
      { t: "Strong and frequent", d: "pitta" },
      { t: "Slow but steady", d: "kapha" }
    ]},
    { q: "Your sleep pattern:", a: [
      { t: "Light and disturbed", d: "vata" },
      { t: "Moderate", d: "pitta" },
      { t: "Deep and long", d: "kapha" }
    ]},
    { q: "Under stress you feel:", a: [
      { t: "Anxious", d: "vata" },
      { t: "Irritated", d: "pitta" },
      { t: "Withdrawn", d: "kapha" }
    ]},
    { q: "Your energy level:", a: [
      { t: "Comes in bursts", d: "vata" },
      { t: "High and intense", d: "pitta" },
      { t: "Steady and calm", d: "kapha" }
    ]},
    { q: "Your skin is mostly:", a: [
      { t: "Dry or rough", d: "vata" },
      { t: "Warm or oily", d: "pitta" },
      { t: "Cool and smooth", d: "kapha" }
    ]},
    { q: "Your reaction speed:", a: [
      { t: "Quick but inconsistent", d: "vata" },
      { t: "Fast and decisive", d: "pitta" },
      { t: "Slow but steady", d: "kapha" }
    ]},
    { q: "Your memory is:", a: [
      { t: "Quick to learn, quick to forget", d: "vata" },
      { t: "Sharp and focused", d: "pitta" },
      { t: "Slow but long-lasting", d: "kapha" }
    ]},
    { q: "Weather you prefer:", a: [
      { t: "Warm", d: "vata" },
      { t: "Cool", d: "pitta" },
      { t: "Dry and warm", d: "kapha" }
    ]},
    { q: "Personality trait:", a: [
      { t: "Creative and expressive", d: "vata" },
      { t: "Confident and ambitious", d: "pitta" },
      { t: "Calm and nurturing", d: "kapha" }
    ]}
  ];
  
  let i = 0;
  let score = { vata: 0, pitta: 0, kapha: 0 };
  
  function loadQ() {
    const q = questions[i];
  
    // show question
    document.getElementById("question").innerText = q.q;
  
    // update progress bar
    const progress = (i / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progress + "%";
  
    // show options
    const opt = document.getElementById("options");
    opt.innerHTML = "";
  
    q.a.forEach(o => {
      const b = document.createElement("button");
      b.innerText = o.t;
      b.onclick = () => {
        score[o.d]++;
        i++;
        i < questions.length ? loadQ() : finish();
      };
      opt.appendChild(b);
    });
  }
  
  
  function finish() {
    document.getElementById("progress-bar").style.width = "100%";

    let p = "vata";
    if (score.pitta > score.vata && score.pitta > score.kapha) p = "pitta";
    if (score.kapha > score.vata && score.kapha > score.pitta) p = "kapha";
    localStorage.setItem("prakriti", p);
    window.location.href = "prakriti.html";
  }
  
  window.onload = loadQ;
  