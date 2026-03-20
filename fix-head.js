const fs = require('fs');

const correctHead = `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>OJAS — Prakriti Analyser</title>
  <meta name="theme-color" content="#f5ede0" />
  <link rel="manifest" href="manifest.json" />
  <link rel="icon" type="image/svg+xml" href="icon.svg" />
  <link rel="apple-touch-icon" href="icon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="style.css?v=2" />
</head>
<body>

  <!-- ═══════════════════════════════════════
       SCREEN 1 — LANDING
  ═══════════════════════════════════════ -->
`;

let html = fs.readFileSync('index.html', 'utf8');

// Find where <section id="screen-landing" begins.
const startIdx = html.indexOf('<section id="screen-landing"');

if (startIdx !== -1) {
    html = correctHead + html.substring(startIdx);
    fs.writeFileSync('index.html', html);
    console.log("Head restored successfully.");
} else {
    console.log("Could not find landing section.");
}
