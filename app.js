// ===== Min Hockeyutrustning =====
// All kod för appen ligger här. Den är skriven så att den ska vara lätt att läsa.
// Datan sparas på telefonen i något som heter "localStorage".
// Det betyder att grejerna finns kvar även om du stänger appen.

// Nycklarna är namnen som datan sparas under. Ändra dem inte.
var NYCKEL_UTRUSTNING = "hockeyGear";
var NYCKEL_MATT = "hockeyMeasurements";

// Hämtar rätt ikon (SVG) för en typ av grej. Ikonerna finns i ikoner.js.
function ikonForTyp(typ) {
  return ikonSvg(typ);
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

// Vilka filter är valda just nu ("Alla" = visa allt).
var filterTyp = "Alla";
var filterMarke = "Alla";
// Vilken grej redigerar vi just nu? -1 betyder "ingen, vi lägger till en ny".
var redigeringsIndex = -1;

// Plockar ut alla olika värden för ett fält (t.ex. alla märken som finns sparade).
function distinkt(grejer, falt) {
  var sedda = {};
  var ut = [];
  for (var i = 0; i < grejer.length; i++) {
    var v = grejer[i][falt];
    if (v && !sedda[v]) {
      sedda[v] = true;
      ut.push(v);
    }
  }
  ut.sort();
  return ut;
}

// Fyller en filter-meny med "Alla" + alla värden, och behåller det man valt.
function fyllFilter(id, varden, valt) {
  var s = document.getElementById(id);
  if (!s) {
    return;
  }
  s.innerHTML = "";

  var alla = document.createElement("option");
  alla.value = "Alla";
  alla.textContent = "Alla";
  s.appendChild(alla);

  for (var i = 0; i < varden.length; i++) {
    var o = document.createElement("option");
    o.value = varden[i];
    o.textContent = varden[i];
    s.appendChild(o);
  }

  // Behåll valet om det fortfarande finns, annars "Alla".
  s.value = (valt === "Alla" || varden.indexOf(valt) >= 0) ? valt : "Alla";
}

// Ritar upp listan med alla grejer man har sparat (med hänsyn till filtren).
function ritaUtrustning() {
  var lista = document.getElementById("utrustning-lista");
  var grejer = loadData(NYCKEL_UTRUSTNING, []);

  // Fyll filter-menyerna utifrån vad som finns sparat.
  fyllFilter("filter-typ", distinkt(grejer, "typ"), filterTyp);
  fyllFilter("filter-marke", distinkt(grejer, "marke"), filterMarke);
  filterTyp = document.getElementById("filter-typ").value;
  filterMarke = document.getElementById("filter-marke").value;

  lista.innerHTML = "";
  var antalVisade = 0;

  // Gå igenom varje grej och gör ett kort (om det passar filtren).
  for (var i = 0; i < grejer.length; i++) {
    var grej = grejer[i];

    if (filterTyp !== "Alla" && grej.typ !== filterTyp) {
      continue;
    }
    if (filterMarke !== "Alla" && grej.marke !== filterMarke) {
      continue;
    }

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
        '<div class="kort-typ"><span class="kort-typ-ikon">' + ikonForTyp(grej.typ) + "</span>" + grej.typ + "</div>" +
        '<div class="kort-detalj">' + detaljer + "</div>" +
      "</div>" +
      '<div class="kort-knappar">' +
        '<button class="andra-knapp" onclick="redigeraGrej(' + i + ')">Ändra</button>' +
        '<button class="ta-bort-knapp" onclick="taBortGrej(' + i + ')">Ta bort</button>' +
      "</div>";

    lista.appendChild(kort);
    antalVisade++;
  }

  // Meddelanden om listan är tom.
  if (grejer.length === 0) {
    lista.innerHTML = '<p class="tomt-meddelande">Du har inte lagt till något än.</p>';
  } else if (antalVisade === 0) {
    lista.innerHTML = '<p class="tomt-meddelande">Inget matchar filtret.</p>';
  }
}

// Laddar en sparad grej in i formuläret för redigering.
function redigeraGrej(index) {
  var grejer = loadData(NYCKEL_UTRUSTNING, []);
  var grej = grejer[index];
  if (!grej) {
    return;
  }

  document.getElementById("typ").value = grej.typ;

  // Märke: känt märke väljs i listan, annars "Annat märke" + eget textfält.
  var markeSelect = document.getElementById("marke");
  if (grej.marke && varumarkeViaNamn(grej.marke)) {
    markeSelect.value = grej.marke;
    document.getElementById("eget-marke").value = "";
  } else {
    markeSelect.value = ""; // "Annat märke"
    document.getElementById("eget-marke").value = grej.marke || "";
  }
  uppdateraEgetMarke();
  uppdateraStorleksforslag();

  document.getElementById("storlek").value = grej.storlek || "";
  document.getElementById("anteckning").value = grej.anteckning || "";

  // Gå in i redigeringsläge.
  redigeringsIndex = index;
  document.getElementById("utrustning-submit").textContent = "Spara ändring";
  document.getElementById("avbryt-redigering").classList.remove("dold");
  document.getElementById("utrustning-form").scrollIntoView({ behavior: "smooth", block: "start" });
}

// Avbryter redigeringen utan att spara.
function avbrytRedigering() {
  redigeringsIndex = -1;
  document.getElementById("utrustning-form").reset();
  uppdateraEgetMarke();
  uppdateraStorleksforslag();
  document.getElementById("utrustning-submit").textContent = "Lägg till";
  document.getElementById("avbryt-redigering").classList.add("dold");
}

// Lägger till en ny grej när man skickar formuläret.
function laggTillGrej(event) {
  event.preventDefault(); // Hindra sidan från att laddas om.

  var grejer = loadData(NYCKEL_UTRUSTNING, []);

  // Vilket märke? Har man valt "Annat märke" använder vi det man själv skrivit.
  var marke = document.getElementById("marke").value;
  if (marke === "") {
    marke = document.getElementById("eget-marke").value;
  }

  // Hämta det man skrivit i formuläret.
  var nyGrej = {
    typ: document.getElementById("typ").value,
    storlek: document.getElementById("storlek").value,
    marke: marke,
    anteckning: document.getElementById("anteckning").value
  };

  if (redigeringsIndex >= 0) {
    grejer[redigeringsIndex] = nyGrej; // Spara ändringen på rätt grej.
  } else {
    grejer.push(nyGrej); // Lägg till en ny grej.
  }
  saveData(NYCKEL_UTRUSTNING, grejer);

  // Lämna redigeringsläge och nollställ knappen.
  redigeringsIndex = -1;
  document.getElementById("utrustning-submit").textContent = "Lägg till";
  document.getElementById("avbryt-redigering").classList.add("dold");

  // Töm fälten och rita om listan.
  document.getElementById("utrustning-form").reset();
  uppdateraStorleksforslag(); // Uppdatera storleksförslagen efter att fälten nollställts.
  uppdateraEgetMarke();       // Dölj "Ange märke"-fältet igen.
  ritaUtrustning();
}


// ===== Märke och storleksförslag i "Min utrustning" =====

// Vilken del i märkets forslag-tabell motsvarar varje typ av grej?
// Typer som inte finns här (klubba, väska ...) har inga storleksförslag.
var TYP_TILL_FORSLAG = {
  "Hjälm": "hjalm",
  "Axelskydd": "axel",
  "Armbågsskydd": "armbage",
  "Hockeybyxa": "byxa",
  "Benskydd": "benskydd",
  "Skridskor": "skridsko",
  "Handskar": "handske"
};

// Hittar ett märke utifrån dess namn (t.ex. "Bauer").
function varumarkeViaNamn(namn) {
  var ids = Object.keys(VARUMARKEN);
  for (var i = 0; i < ids.length; i++) {
    if (VARUMARKEN[ids[i]].namn === namn) {
      return VARUMARKEN[ids[i]];
    }
  }
  return null;
}

// Fyller märkes-menyn i "Min utrustning" med alla märken plus "Annat märke".
function fyllUtrustningMarken() {
  var valj = document.getElementById("marke");
  if (!valj) {
    return;
  }

  valj.innerHTML = "";
  var ids = Object.keys(VARUMARKEN);
  for (var i = 0; i < ids.length; i++) {
    var alternativ = document.createElement("option");
    alternativ.value = VARUMARKEN[ids[i]].namn;
    alternativ.textContent = VARUMARKEN[ids[i]].namn;
    valj.appendChild(alternativ);
  }

  // Ett alternativ för märken vi inte har storlekar för (då får man skriva storleken själv).
  var annat = document.createElement("option");
  annat.value = "";
  annat.textContent = "Annat märke";
  valj.appendChild(annat);
}

// Visar fältet "Ange märke" bara när man valt "Annat märke".
function uppdateraEgetMarke() {
  var valj = document.getElementById("marke");
  var rad = document.getElementById("eget-marke-rad");
  if (!valj || !rad) {
    return;
  }
  if (valj.value === "") {
    rad.classList.remove("dold"); // "Annat märke" valt – visa fältet.
  } else {
    rad.classList.add("dold");
  }
}

// Visar förslag på storlekar (i datalist) utifrån vald typ och valt märke.
function uppdateraStorleksforslag() {
  var typ = document.getElementById("typ").value;
  var markeNamn = document.getElementById("marke").value;
  var datalist = document.getElementById("storlek-forslag");
  if (!datalist) {
    return;
  }

  datalist.innerHTML = "";

  var marke = varumarkeViaNamn(markeNamn);
  var id = TYP_TILL_FORSLAG[typ];
  if (!marke || !id || !marke.forslag[id]) {
    return; // Inget märke valt, eller ingen storlekstabell för den här typen.
  }

  var lista = marke.forslag[id].tabell;
  for (var i = 0; i < lista.length; i++) {
    var etikett = lista[i].storlek || lista[i].namn; // t.ex. 14" eller "Junior M"
    var alternativ = document.createElement("option");
    alternativ.value = etikett;
    datalist.appendChild(alternativ);
  }
}

// Tar bort grej nummer "index" från listan.
function taBortGrej(index) {
  // Om vi höll på att redigera något, avbryt först (annars pekar index fel).
  if (redigeringsIndex >= 0) {
    avbrytRedigering();
  }
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
  { id: "skostorlek", enhet: "EU" },
  { id: "huvud", enhet: "cm" }
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

// Ordningen som förslagen visas i, och ikon + namn för varje del.
var FORSLAG_ORDNING = ["hjalm", "allman", "axel", "armbage", "byxa", "benskydd", "handske", "skridsko"];
// ikon = nyckel i IKON_SVG (ikoner.js)
var FORSLAG_META = {
  hjalm:    { ikon: "Hjälm",        namn: "Hjälm" },
  allman:   { ikon: "Tröja",        namn: "Allmän storlek (tröja m.m.)" },
  axel:     { ikon: "Axelskydd",    namn: "Axelskydd" },
  armbage:  { ikon: "Armbågsskydd", namn: "Armbågsskydd" },
  byxa:     { ikon: "Hockeybyxa",   namn: "Hockeybyxa" },
  benskydd: { ikon: "Benskydd",     namn: "Benskydd" },
  handske:  { ikon: "Handskar",     namn: "Handskar" },
  skridsko: { ikon: "Skridskor",    namn: "Skridskor" }
};

// Räknar ut och visar vilken storlek man borde ha på varje skydd.
// Varje del hämtar sin konfiguration (mått + tabell) från det valda märket, så att olika
// märken kan använda olika mått trots att användaren bara matat in måtten en gång.
function visaForslag(matt) {
  var marke = VARUMARKEN[valtVarumarkeId()];
  var ruta = document.getElementById("forslag-lista");
  ruta.innerHTML = "";

  for (var i = 0; i < FORSLAG_ORDNING.length; i++) {
    var id = FORSLAG_ORDNING[i];
    var meta = FORSLAG_META[id];
    var konfig = marke.forslag[id]; // Hur det här märket sizar just den här delen.

    var svar;
    if (!konfig) {
      // Märket saknar guide för den här delen (t.ex. Warrior har ingen hjälm).
      svar = '<span class="forslag-tom">' + marke.namn + " har ingen guide för detta</span>";
    } else {
      var traff = null;
      var franSko = false; // Sant om skridskon räknades från skostorlek istället för mätt fot.

      if (konfig.typ === "skridsko") {
        // Skridskor: fotlängd → storlek + skenlängd. Faller tillbaka på skostorlek.
        var fot = matt[konfig.matt];
        if (!fot && matt.skostorlek) {
          fot = skostorlekTillFotlangd(matt.skostorlek);
          franSko = true;
        }
        traff = hittaSkridsko(fot, konfig.tabell);
      } else {
        // Övriga delar: ta måttet, dra ev. av för märkets mätmetod, slå upp storleken.
        var varde = matt[konfig.matt];
        if (konfig.avdrag && varde) {
          varde = parseFloat(varde) - konfig.avdrag;
        }
        traff = hittaStorlek(varde, konfig.tabell, konfig.falt);
      }

      if (!traff) {
        svar = '<span class="forslag-tom">Fyll i måttet</span>';
      } else if (traff.rad.storlek) {
        svar = '<span class="forslag-storlek">' + traff.rad.storlek + "</span>"; // t.ex. 14"
      } else {
        svar = '<span class="forslag-storlek">' + traff.rad.namn + "</span>"; // t.ex. Junior M
      }

      // Skridskor visar även skenlängd (bladlängd) i mm.
      if (traff && konfig.typ === "skridsko") {
        var sken = traff.rad.sken ? "skena " + traff.rad.sken + " mm" : "skena –";
        if (franSko) {
          sken += " · från skostorlek, mät och prova i butik";
        }
        svar += ' <span class="forslag-extra">' + sken + "</span>";
      }

      // En extra notis (t.ex. att måttet justerats för märkets mätmetod).
      if (traff && konfig.notis) {
        svar += ' <span class="forslag-extra">' + konfig.notis + "</span>";
      }

      // Inte exakt träff (eller bara uppskattat): visa "ungefär".
      if (traff && (!traff.exakt || franSko)) {
        svar += ' <span class="forslag-ungefar">(ungefär)</span>';
      }
    }

    var rad = document.createElement("div");
    rad.className = "forslag-rad";
    rad.innerHTML =
      '<span class="forslag-ikon">' + ikonSvg(meta.ikon) + "</span>" +
      '<span class="forslag-namn">' + meta.namn + "</span>" +
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

// När man byter typ eller märke i "Min utrustning": uppdatera storleksförslagen.
document.getElementById("typ").addEventListener("change", uppdateraStorleksforslag);
document.getElementById("marke").addEventListener("change", uppdateraStorleksforslag);
document.getElementById("marke").addEventListener("change", uppdateraEgetMarke);

// Filtren i "Mina grejer".
document.getElementById("filter-typ").addEventListener("change", function () {
  filterTyp = this.value;
  ritaUtrustning();
});
document.getElementById("filter-marke").addEventListener("change", function () {
  filterMarke = this.value;
  ritaUtrustning();
});

fyllUtrustningMarken();   // Fyll märkesmenyn i "Min utrustning"
uppdateraEgetMarke();     // Dölj "Ange märke"-fältet från start
uppdateraStorleksforslag(); // Visa storleksförslag direkt
fyllVarumarken();         // Fyll märkesväljaren på mått-fliken
ritaUtrustning();
ritaMatt();
