// Kopierar webbappens filer till mappen www/ som Capacitor paketerar in i iOS-appen.
// Webbfilerna ligger kvar i projektroten så att GitHub Pages fortsätter fungera.
// Kör med:  npm run copy-web
import { mkdirSync, rmSync, copyFileSync } from "fs";

// De filer som webbappen behöver för att fungera.
var webbfiler = [
  "index.html",
  "style.css",
  "app.js",
  "storleksguide.js",
  "manifest.webmanifest",
  "icon.svg"
];

// Börja om från en tom www/-mapp.
rmSync("www", { recursive: true, force: true });
mkdirSync("www", { recursive: true });

for (var i = 0; i < webbfiler.length; i++) {
  copyFileSync(webbfiler[i], "www/" + webbfiler[i]);
}

console.log("Kopierade " + webbfiler.length + " filer till www/");
