// ===== Min Hockeyutrustning =====
// All kod för appen ligger här. Den är skriven så att den ska vara lätt att läsa.
// Datan sparas på telefonen i något som heter "localStorage".
// Det betyder att grejerna finns kvar även om du stänger appen.

// Nycklarna är namnen som datan sparas under. Ändra dem inte.
var NYCKEL_UTRUSTNING = "hockeyGear";
var NYCKEL_MATT = "hockeyMeasurements";

// En ikon (emoji) för varje typ av grej. Vill du byta ikon? Ändra bara emojin här!
var IKONER = {
  "Hjälm": "⛑️",
  "Halsskydd": "🧣",
  "Axelskydd": "🦺",
  "Armbågsskydd": "💪",
  "Handskar": "🧤",
  "Hockeybyxa": "🩳",
  "Benskydd/skenor": "🦵",
  "Skridskor": "⛸️",
  "Klubba": "🏒",
  "Suspensoar": "🛡️",
  "Hockeyväska": "🧳",
  "Annat": "📦"
};

// Hämtar rätt ikon för en typ. Om vi inte hittar någon används 🏒.
function ikonForTyp(typ) {
  return IKONER[typ] || "🏒";
}


// ===== Hjälpfunktioner för att spara och läsa =====

// Läser data från telefonen. Om inget finns sparat får man "fallback".
function loadData(key, fallback) {
  var text = localStorage.getItem(key);
  if (text === null) {
    return fallback;
  }
  return JSON.parse(text);
}

// Sparar data på telefonen.
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


// Adressen till appen som vi delar. Byt till App Store-länken när appen finns där.
var APP_LANK = "https://gillmania.github.io/hockey-gear/";

// Delar appen med telefonens inbyggda dela-ruta. Kopierar länken om delning inte stöds.
function delaApp() {
  var data = {
    title: "Min Hockeyutrustning",
    text: "Kolla in den här appen för att hålla koll på din hockeyutrustning och rätt storlek!",
    url: APP_LANK
  };

  if (navigator.share) {
    // iPhone och de flesta mobiler: visa systemets dela-ruta.
    navigator.share(data).catch(function () {
      // Användaren avbröt – gör inget.
    });
  } else if (navigator.clipboard) {
    // Dator utan dela-stöd: kopiera länken istället.
    navigator.clipboard.writeText(APP_LANK);
    alert("Länk kopierad:\n" + APP_LANK);
  } else {
    alert("Dela den här länken:\n" + APP_LANK);
  }
}


// ===== Byta mellan de två flikarna =====
function visaFlik(namn) {
  var sidaUtrustning = document.getElementById("sida-utrustning");
  var sidaMatt = document.getElementById("sida-matt");
  var knappUtrustning = document.getElementById("flik-utrustning");
  var knappMatt = document.getElementById("flik-matt");

  if (namn === "utrustning") {
    sidaUtrustning.classList.remove("dold");
    sidaMatt.classList.add("dold");
    knappUtrustning.classList.add("aktiv");
    knappMatt.classList.remove("aktiv");
  } else {
    sidaUtrustning.classList.add("dold");
    sidaMatt.classList.remove("dold");
    knappUtrustning.classList.remove("aktiv");
    knappMatt.classList.add("aktiv");
  }
}


// ===== FLIK 1: Utrustning =====

// Ritar upp listan med alla grejer man har sparat.
function ritaUtrustning() {
  var lista = document.getElementById("utrustning-lista");
  var grejer = loadData(NYCKEL_UTRUSTNING, []);

  // Töm listan först så vi inte får dubbletter.
  lista.innerHTML = "";

  if (grejer.length === 0) {
    lista.innerHTML = '<p class="tomt-meddelande">Du har inte lagt till något än.</p>';
    return;
  }

  // Gå igenom varje grej och gör ett kort.
  for (var i = 0; i < grejer.length; i++) {
    var grej = grejer[i];

    // Bygg en liten beskrivning av detaljerna.
    var detaljer = "Storlek: " + grej.storlek;
    if (grej.marke) {
      detaljer += " · " + grej.marke;
    }
    if (grej.anteckning) {
      detaljer += " · " + grej.anteckning;
    }

    var kort = document.createElement("div");
    kort.className = "kort";
    kort.innerHTML =
      '<div class="kort-info">' +
        '<div class="kort-typ">' + ikonForTyp(grej.typ) + " " + grej.typ + "</div>" +
        '<div class="kort-detalj">' + detaljer + "</div>" +
      "</div>" +
      '<button class="ta-bort-knapp" onclick="taBortGrej(' + i + ')">Ta bort</button>';

    lista.appendChild(kort);
  }
}

// Lägger till en ny grej när man skickar formuläret.
function laggTillGrej(event) {
  event.preventDefault(); // Hindra sidan från att laddas om.

  var grejer = loadData(NYCKEL_UTRUSTNING, []);

  // Hämta det man skrivit i formuläret.
  var nyGrej = {
    typ: document.getElementById("typ").value,
    storlek: document.getElementById("storlek").value,
    marke: document.getElementById("marke").value,
    anteckning: document.getElementById("anteckning").value
  };

  grejer.push(nyGrej);
  saveData(NYCKEL_UTRUSTNING, grejer);

  // Töm fälten och rita om listan.
  document.getElementById("utrustning-form").reset();
  ritaUtrustning();
}

// Tar bort grej nummer "index" från listan.
function taBortGrej(index) {
  var grejer = loadData(NYCKEL_UTRUSTNING, []);
  grejer.splice(index, 1); // Ta bort en grej på den platsen.
  saveData(NYCKEL_UTRUSTNING, grejer);
  ritaUtrustning();
}


// ===== FLIK 2: Mått =====

// Alla mått vi håller koll på. id = fältets id i formuläret, enhet = vad som visas på figuren.
var MATT_FALT = [
  { id: "langd", enhet: "cm" },
  { id: "vikt", enhet: "kg" },
  { id: "brost", enhet: "cm" },
  { id: "underarm", enhet: "cm" },
  { id: "midja", enhet: "cm" },
  { id: "skenben", enhet: "cm" },
  { id: "handlangd", enhet: "cm" },
  { id: "fotlangd", enhet: "cm" },
  { id: "skostorlek", enhet: "EU" }
];

// Fyller i formuläret med de mått som redan är sparade och uppdaterar figuren.
function ritaMatt() {
  var matt = loadData(NYCKEL_MATT, {});

  for (var i = 0; i < MATT_FALT.length; i++) {
    var falt = MATT_FALT[i];
    var varde = matt[falt.id] || "";

    // Sätt värdet i formuläret.
    document.getElementById(falt.id).value = varde;

    // Skriv värdet på figuren (eller "–" om det är tomt).
    var figurText = document.getElementById("val-" + falt.id);
    if (figurText) {
      figurText.textContent = varde ? varde + " " + falt.enhet : "–";
    }
  }

  visaForslag(matt); // Uppdatera storleksförslagen.
}

// Räknar ut och visar vilken storlek man borde ha på varje skydd.
function visaForslag(matt) {
  // Vilket märke har man valt? Förslagen använder det märkets tabeller.
  var marke = VARUMARKEN[valtVarumarkeId()];

  // Varje rad: vilken ikon, vad det heter, vilket mått och vilken tabell vi slår i.
  var forslag = [
    { ikon: "👕", namn: "Allmän storlek (tröja m.m.)", varde: matt.langd,    lista: marke.storlekar, falt: "langd" },
    { ikon: "🦺", namn: "Axelskydd",                   varde: matt.brost,    lista: marke.storlekar, falt: "brost" },
    { ikon: "💪", namn: "Armbågsskydd",                varde: matt.underarm, lista: marke.storlekar, falt: "underarm" },
    { ikon: "🩳", namn: "Hockeybyxa",                  varde: matt.midja,    lista: marke.storlekar, falt: "midja", avdrag: marke.midjaAvdrag },
    { ikon: "🦵", namn: "Benskydd/skenor",             varde: matt.skenben,  lista: marke.benskydd,  falt: "cm" },
    { ikon: "🧤", namn: "Handskar",                    varde: matt.handlangd,lista: marke.handskar,  falt: "cm" },
    { ikon: "⛸️", namn: "Skridskor",                   varde: matt.fotlangd, typ: "skridsko", skridskor: marke.skridskor }
  ];

  var ruta = document.getElementById("forslag-lista");
  ruta.innerHTML = "";

  for (var i = 0; i < forslag.length; i++) {
    var f = forslag[i];

    // Har det valda märket en tabell för den här utrustningen? (CCM saknar t.ex. skridskor.)
    var harTabell = (f.typ === "skridsko")
      ? !!(f.skridskor && f.skridskor.length)
      : !!(f.lista && f.lista.length);

    // Skridskor räknas ut på ett eget sätt (fotlängd → storlek + skenlängd).
    var traff = null;
    var franSko = false; // Sant om vi räknade från skostorlek istället för mätt fot.
    if (harTabell && f.typ === "skridsko") {
      var fot = matt.fotlangd;
      // Har vi ingen mätt fotlängd? Räkna ungefärligt från skostorleken istället.
      if (!fot && matt.skostorlek) {
        fot = skostorlekTillFotlangd(matt.skostorlek);
        franSko = true;
      }
      traff = hittaSkridsko(fot, f.skridskor);
    } else if (harTabell) {
      // En del skydd (hockeybyxan) ska ha ett avdrag innan vi slår upp storleken.
      var varde = f.varde;
      if (f.avdrag && varde) {
        varde = parseFloat(varde) - f.avdrag;
      }
      traff = hittaStorlek(varde, f.lista, f.falt);
    }

    // Texten som visar storleken.
    var svar;
    if (!harTabell) {
      svar = '<span class="forslag-tom">' + marke.namn + " har ingen guide för detta</span>";
    } else if (!traff) {
      svar = '<span class="forslag-tom">Fyll i måttet</span>';
    } else if (traff.rad.storlek) {
      // Storlek som text (t.ex. 14" eller Junior 3).
      svar = '<span class="forslag-storlek">' + traff.rad.storlek + "</span>";
    } else {
      // Skydd med storlek som Youth/Junior/Senior.
      svar = '<span class="forslag-storlek">' + traff.rad.namn + "</span>";
    }

    // Skridskor visar även skenlängd (bladlängd) i mm.
    if (traff && f.typ === "skridsko") {
      var sken = traff.rad.sken ? "skena " + traff.rad.sken + " mm" : "skena –";
      if (franSko) {
        sken += " · från skostorlek, mät och prova i butik";
      }
      svar += ' <span class="forslag-extra">' + sken + "</span>";
    }

    // Om det inte var en exakt träff (eller bara uppskattat från skostorlek): visa "ungefär".
    if (traff && (!traff.exakt || franSko)) {
      svar += ' <span class="forslag-ungefar">(ungefär)</span>';
    }

    var rad = document.createElement("div");
    rad.className = "forslag-rad";
    rad.innerHTML =
      '<span class="forslag-ikon">' + f.ikon + "</span>" +
      '<span class="forslag-namn">' + f.namn + "</span>" +
      '<span class="forslag-svar">' + svar + "</span>";
    ruta.appendChild(rad);
  }
}

// ===== Märkesväljare =====
var NYCKEL_VARUMARKE = "valtVarumarke";

// Vilket märke är valt? Faller tillbaka på det första märket om inget är sparat.
function valtVarumarkeId() {
  var sparat = loadData(NYCKEL_VARUMARKE, null);
  if (sparat && VARUMARKEN[sparat]) {
    return sparat;
  }
  return Object.keys(VARUMARKEN)[0];
}

// Fyller märkes-menyn med alla märken och kommer ihåg vad man valt.
function fyllVarumarken() {
  var valj = document.getElementById("varumarke");
  if (!valj) {
    return;
  }

  valj.innerHTML = "";
  var ids = Object.keys(VARUMARKEN);
  for (var i = 0; i < ids.length; i++) {
    var alternativ = document.createElement("option");
    alternativ.value = ids[i];
    alternativ.textContent = VARUMARKEN[ids[i]].namn;
    valj.appendChild(alternativ);
  }

  valj.value = valtVarumarkeId();

  // När man byter märke: spara valet och räkna om förslagen.
  valj.addEventListener("change", function () {
    saveData(NYCKEL_VARUMARKE, valj.value);
    ritaMatt();
  });
}

// Sparar måtten när man skickar formuläret.
function sparaMatt(event) {
  event.preventDefault();

  // Hämta värdet från varje fält och lägg i ett objekt.
  var matt = {};
  for (var i = 0; i < MATT_FALT.length; i++) {
    var id = MATT_FALT[i].id;
    matt[id] = document.getElementById(id).value;
  }

  saveData(NYCKEL_MATT, matt);
  ritaMatt(); // Uppdatera figuren direkt.

  // Visa ett litet "Sparat!"-meddelande en kort stund.
  var meddelande = document.getElementById("matt-sparat");
  meddelande.classList.remove("dold");
  setTimeout(function () {
    meddelande.classList.add("dold");
  }, 2000);
}


// ===== Starta igång allt när sidan har laddats =====
document.getElementById("utrustning-form").addEventListener("submit", laggTillGrej);
document.getElementById("matt-form").addEventListener("submit", sparaMatt);

fyllVarumarken();
ritaUtrustning();
ritaMatt();
