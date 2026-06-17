// ===== Bauers storleksguide =====
// Alla siffror kommer från Bauers tabell "Bauer Protective Equipment".
// Om någon siffra är fel: ändra bara talen här, så funkar resten av appen.
// Ett intervall [min, max] betyder "från min till max". 999 betyder "och uppåt".

// Varje storlek (Youth S, Junior M, Senior L ...) med sina mått-intervall.
// vikt = kg, langd/brost/underarm/midja = cm. null = finns inte för den storleken.
var BAUER_STORLEKAR = [
  { namn: "Youth S",       alder: "3–5 år",   vikt: [14, 19],   langd: [91, 107],   brost: [51, 56],   underarm: [15, 18], midja: [48, 53] },
  { namn: "Youth M",       alder: "5–7 år",   vikt: [18, 24],   langd: [104, 119],  brost: [56, 61],   underarm: [16, 19], midja: [51, 56] },
  { namn: "Youth L",       alder: "7–9 år",   vikt: [23, 29],   langd: [117, 135],  brost: [59, 64],   underarm: [18, 23], midja: [54, 62] },
  { namn: "Junior S",      alder: "8–10 år",  vikt: [24, 31],   langd: [127, 142],  brost: [61, 66],   underarm: [20, 23], midja: [56, 64] },
  { namn: "Junior M",      alder: "10–11 år", vikt: [30, 36],   langd: [140, 150],  brost: [66, 71],   underarm: [22, 25], midja: [62, 72] },
  { namn: "Junior L",      alder: "11–13 år", vikt: [36, 45],   langd: [147, 165],  brost: null,       underarm: null,     midja: null },
  { namn: "Intermediate M",alder: "11–13 år", vikt: [36, 45],   langd: [147, 165],  brost: [71, 81],   underarm: [24, 27], midja: [71, 80] },
  { namn: "Intermediate L",alder: "13+ år",   vikt: [45, 68],   langd: [165, 175],  brost: [81, 102],  underarm: [26, 29], midja: [76, 86] },
  { namn: "Senior M",      alder: "14+ år",   vikt: [59, 77],   langd: [170, 180],  brost: [97, 107],  underarm: [27, 32], midja: [81, 91] },
  { namn: "Senior L",      alder: "15+ år",   vikt: [68, 86],   langd: [175, 185],  brost: [102, 112], underarm: [29, 34], midja: [86, 97] },
  { namn: "Senior XL",     alder: "15+ år",   vikt: [77, 95],   langd: [180, 195],  brost: [107, 117], underarm: [32, 37], midja: [91, 102] },
  { namn: "Senior XXL",    alder: "15+ år",   vikt: [86, 104],  langd: [185, 200],  brost: [112, 999], underarm: null,     midja: [97, 107] },
  { namn: "Senior XXXL",   alder: "15+ år",   vikt: [95, 999],  langd: [191, 999],  brost: [112, 999], underarm: null,     midja: [102, 999] },
  { namn: "Woman XS",      alder: "12+ år",   vikt: [41, 50],   langd: [140, 155],  brost: [76, 86],   underarm: null,     midja: [61, 69] },
  { namn: "Woman S",       alder: "12+ år",   vikt: [46, 59],   langd: [150, 165],  brost: [81, 91],   underarm: null,     midja: [66, 74] },
  { namn: "Woman M",       alder: "15+ år",   vikt: [55, 68],   langd: [160, 175],  brost: [86, 97],   underarm: null,     midja: [71, 79] },
  { namn: "Woman L",       alder: "15+ år",   vikt: [64, 77],   langd: [170, 185],  brost: [91, 102],  underarm: null,     midja: [76, 84] }
];

// Benskydd (skenor) mäts i tum. cm = skenbenets längd (knäskål till fotknöl).
var BAUER_BENSKYDD = [
  { storlek: '8"',  cm: [25.5, 28] },
  { storlek: '9"',  cm: [28, 31] },
  { storlek: '10"', cm: [31, 33.5] },
  { storlek: '11"', cm: [33.5, 36] },
  { storlek: '12"', cm: [36, 38.5] },
  { storlek: '13"', cm: [38.5, 41] },
  { storlek: '14"', cm: [41, 43.5] },
  { storlek: '15"', cm: [43.5, 46] },
  { storlek: '16"', cm: [46, 48.5] },
  { storlek: '17"', cm: [48.5, 51.5] },
  { storlek: '18"', cm: [51.5, 999] }
];

// Handskar mäts i tum. cm = handlängd (långfingertopp till handled).
var BAUER_HANDSKAR = [
  { storlek: '8"',  cm: [10.5, 13] },
  { storlek: '9"',  cm: [11.5, 14] },
  { storlek: '10"', cm: [13, 15.5] },
  { storlek: '11"', cm: [14, 16.5] },
  { storlek: '12"', cm: [15.5, 18] },
  { storlek: '13"', cm: [16.5, 19] },
  { storlek: '14"', cm: [18, 20.5] },
  { storlek: '15"', cm: [19, 22] }
];


// Skridskor: fotlängd (cm) → rekommenderad skridskostorlek + skenlängd (sken, mm).
// fot = fotlängd i cm (mät från häl till längsta tå).
// sken = bladlängd från Bauers TUUK-tabell. null = saknas i TUUK-tabellen (gäller Youth-storlekar).
// Listan är sorterad från minst till störst fot.
var BAUER_SKRIDSKOR = [
  { fot: 14.5, storlek: "Youth 6",    sken: null },
  { fot: 15.2, storlek: "Youth 7",    sken: null },
  { fot: 16.2, storlek: "Youth 8",    sken: null },
  { fot: 17.0, storlek: "Youth 9",    sken: null },
  { fot: 17.4, storlek: "Youth 9.5",  sken: null },
  { fot: 17.8, storlek: "Youth 10",   sken: null },
  { fot: 18.3, storlek: "Youth 10.5", sken: null },
  { fot: 18.7, storlek: "Youth 11",   sken: null },
  { fot: 19.1, storlek: "Youth 11.5", sken: null },
  { fot: 19.5, storlek: "Youth 12",   sken: null },
  { fot: 19.9, storlek: "Youth 12.5", sken: null },
  { fot: 20.7, storlek: "Youth 13.5", sken: null },
  { fot: 21.0, storlek: "Junior 1",   sken: 212 },
  { fot: 21.4, storlek: "Junior 1.5", sken: 212 },
  { fot: 21.8, storlek: "Junior 2",   sken: 221 },
  { fot: 22.2, storlek: "Junior 2.5", sken: 221 },
  { fot: 22.6, storlek: "Junior 3",   sken: 230 },
  { fot: 23.1, storlek: "Junior 3.5", sken: 230 },
  { fot: 23.5, storlek: "Junior 4",   sken: 238 },
  { fot: 24.3, storlek: "Junior 4.5", sken: 238 },
  { fot: 24.7, storlek: "Junior 5",   sken: 246 },
  { fot: 24.9, storlek: "Junior 5.5", sken: 246 },
  { fot: 25.1, storlek: "Senior 6",   sken: 254 },
  { fot: 25.5, storlek: "Senior 6.5", sken: 254 },
  { fot: 26.0, storlek: "Senior 7",   sken: 263 },
  { fot: 26.4, storlek: "Senior 7.5", sken: 263 },
  { fot: 26.8, storlek: "Senior 8",   sken: 272 },
  { fot: 27.2, storlek: "Senior 8.5", sken: 272 },
  { fot: 27.7, storlek: "Senior 9",   sken: 280 },
  { fot: 28.1, storlek: "Senior 9.5", sken: 280 },
  { fot: 28.5, storlek: "Senior 10",  sken: 288 },
  { fot: 28.9, storlek: "Senior 10.5",sken: 288 }
];

// Hittar rätt skridskostorlek utifrån fotlängd.
// Skridskor ska rymma foten, så vi väljer den minsta storlek vars fotlängd räcker (avrundar uppåt).
function hittaSkridsko(fotlangd) {
  var tal = parseFloat(fotlangd);
  if (!fotlangd || isNaN(tal)) {
    return null; // Ingen fotlängd ifylld än.
  }

  // Leta efter första storlek vars fotmått är minst lika stort som foten.
  for (var i = 0; i < BAUER_SKRIDSKOR.length; i++) {
    if (BAUER_SKRIDSKOR[i].fot >= tal) {
      return { rad: BAUER_SKRIDSKOR[i], exakt: true };
    }
  }

  // Foten är större än hela tabellen – ta största storleken (ungefärligt).
  return { rad: BAUER_SKRIDSKOR[BAUER_SKRIDSKOR.length - 1], exakt: false };
}


// ===== Hjälpfunktion som hittar rätt storlek =====
// Den letar i en lista efter den rad där värdet passar i intervallet.
// "faltNamn" är vilket mått vi tittar på, t.ex. "brost" eller "cm".
// Hittas ingen exakt träff väljs den närmaste (så man alltid får ett förslag).
function hittaStorlek(varde, lista, faltNamn) {
  var tal = parseFloat(varde);
  if (!varde || isNaN(tal)) {
    return null; // Inget mått ifyllt än.
  }

  var narmaste = null;
  var narmasteAvstand = Infinity;

  for (var i = 0; i < lista.length; i++) {
    var intervall = lista[i][faltNamn];
    if (!intervall) {
      continue; // Den här storleken har inget sådant mått.
    }

    var min = intervall[0];
    var max = intervall[1];

    // Passar måttet precis i intervallet? Då är det en perfekt träff.
    if (tal >= min && tal <= max) {
      return { rad: lista[i], exakt: true };
    }

    // Annars: hur långt ifrån är vi? Spara den närmaste.
    var avstand = tal < min ? min - tal : tal - max;
    if (avstand < narmasteAvstand) {
      narmasteAvstand = avstand;
      narmaste = lista[i];
    }
  }

  if (narmaste) {
    return { rad: narmaste, exakt: false };
  }
  return null;
}
