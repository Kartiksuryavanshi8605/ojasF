const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

const createStorage = () => {
    let store = {};
    return {
        getItem: key => store[key] || null,
        setItem: (key, value) => { store[key] = value.toString(); },
        removeItem: key => { delete store[key]; },
        clear: () => { store = {}; }
    };
};

Object.defineProperty(window, 'localStorage', { value: createStorage() });
Object.defineProperty(window, 'sessionStorage', { value: createStorage() });

window.scrollTo = () => {};
window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
window.matchMedia = () => ({ matches: false });

function exec(file) {
    try {
        const code = fs.readFileSync(file, 'utf8');
        const script = document.createElement('script');
        script.textContent = code;
        document.body.appendChild(script);
    } catch(e) {
        console.error(`Failed to execute ${file}:`, e);
    }
}

exec('icons.js');
exec('app.js');
exec('quiz.js');
exec('result.js');

document.dispatchEvent(new window.Event('DOMContentLoaded'));

setTimeout(() => {
    try {
        const inp = document.getElementById('inp-name');
        inp.value = 'Test';
        d = document.getElementById('btn-start');
        d.click();
        
        console.log("--- Clicked ---");
        
        setTimeout(() => {
            console.log("Is landing active?", document.getElementById('screen-landing').classList.contains('active'));
            console.log("Is explainer active?", document.getElementById('screen-explainer').classList.contains('active'));
            console.log("Is quiz active?", document.getElementById('screen-quiz').classList.contains('active'));
            
            const explainerContent = document.querySelector('.explainer-content');
            console.log("Explainer content has 'animate'?", explainerContent.classList.contains('animate'));
            
            const explainerStyle = window.getComputedStyle(document.getElementById('screen-explainer'));
            console.log("Explainer display:", explainerStyle.display);
            
            console.log("Title display:", window.getComputedStyle(document.getElementById('explainer-title')).opacity);
        }, 300);
        
    } catch (e) {
        console.error("Test failed:", e);
    }
}, 500);
