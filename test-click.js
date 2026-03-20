const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, {
  runScripts: "dangerously",
  resources: "usable"
});

// Mock browser APIs
const window = dom.window;
window.localStorage = { getItem: () => null, setItem: () => {} };
window.sessionStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
window.alert = (msg) => console.log('ALERT FIRED:', msg);
window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
window.scrollTo = () => {};

// Load scripts
const appJs = fs.readFileSync('app.js', 'utf8');
const scriptEl = window.document.createElement('script');
scriptEl.textContent = appJs;
window.document.body.appendChild(scriptEl);

setTimeout(() => {
  const inp = window.document.getElementById('inp-name');
  if(inp) inp.value = 'Tester';
  
  const btn = window.document.getElementById('btn-start');
  if (btn) {
    console.log("Clicking btn-start...");
    btn.click();
  } else {
    console.log("btn-start not found");
  }
}, 100);
