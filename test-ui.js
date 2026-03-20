const jsdom = require("jsdom");
const { JSDOM } = jsdom;

JSDOM.fromFile("index.html", {
  url: "http://localhost:3000/",
  runScripts: "dangerously",
  resources: "usable"
}).then(dom => {
  const window = dom.window;
  const document = window.document;
  
  window.addEventListener('error', event => {
      console.error("Global Error:", event.error);
  });
  
  setTimeout(() => {
    console.log("DOM loaded. Triggering click.");
    try {
      const inpName = document.getElementById('inp-name');
      inpName.value = 'Test User';
      const btnStart = document.getElementById('btn-start');
      btnStart.click();
      
      setTimeout(() => {
        console.log("Quiz active?", document.getElementById('screen-quiz').classList.contains('active'));
      }, 500);
    } catch(e) {
      console.error("Click error:", e);
    }
  }, 1000);
});
