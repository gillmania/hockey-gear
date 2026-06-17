// ===== Storleksguider per varumärke =====
// Just nu finns Bauer. Vill du lägga till ett märke (t.ex. CCM):
//   1) kopiera Bauer-tabellerna nedan, byt namn (t.ex. CCM_STORLEKAR) och skriv in märkets siffror,
//   2) lägg till en rad i VARUMARKEN längst ned i filen.
// Resten av appen (märkesväljaren och förslagen) sköter sig själv.
//
// VIKTIGT: hitta inte på siffror – använd bara märkets officiella storleksguide.
// Ett intervall [min, max] betyder "från min till max". 999 betyder "och uppåt".

// ===== Bauer =====
// Alla siffror kommer från Bauers tabell "Bauer Protective Equipment".

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

// Bauer hjälm: huvudomkrets (cm) → storlek. Siffror från Bauers hjälmguide (hockeymonkey.com).
// OBS: hjälmar är justerbara och varierar mellan modeller – prova alltid.
var BAUER_HJALM = [
  { storlek: "Small",  cm: [51, 55.5] },
  { storlek: "Medium", cm: [54.5, 59] },
  { storlek: "Large",  cm: [57.5, 62] }
];

// Ungefärlig omräkning från EU-skostorlek till fotlängd i cm.
// OBS: skostorlekar skiljer sig mellan märken – mät hellre foten och prova i butik.
// Formel: EU-storlek ≈ (fotlängd + 1,5 cm tåmån) × 1,5  =>  fotlängd ≈ EU / 1,5 − 1,5
function skostorlekTillFotlangd(eu) {
  var tal = parseFloat(eu);
  if (!eu || isNaN(tal)) {
    return null;
  }
  return tal / 1.5 - 1.5;
}

// Hittar rätt skridskostorlek utifrån fotlängd, i det valda märkets skridskotabell.
// Skridskor ska rymma foten, så vi väljer den minsta storlek vars fotlängd räcker (avrundar uppåt).
function hittaSkridsko(fotlangd, skridskor) {
  var tal = parseFloat(fotlangd);
  if (!fotlangd || isNaN(tal) || !skridskor) {
    return null; // Ingen fotlängd ifylld än (eller inget märke med skridskor).
  }

  // Leta efter första storlek vars fotmått är minst lika stort som foten.
  for (var i = 0; i < skridskor.length; i++) {
    if (skridskor[i].fot >= tal) {
      return { rad: skridskor[i], exakt: true };
    }
  }

  // Foten är större än hela tabellen – ta största storleken (ungefärligt).
  return { rad: skridskor[skridskor.length - 1], exakt: false };
}


// ===== CCM =====
// Siffror från CCM:s officiella storleksguide (monkeysportseurope.com).
// OBS: CCM:s guide saknar skridskor och handskar – därför är de null nedan.
// OBS: CCM:s byxtabell anger riktigt midjemått (inget avdrag, till skillnad från Bauer).
var CCM_STORLEKAR = [
  { namn: "Youth S",  alder: "", vikt: null, langd: [102, 109], brost: [58, 58],   underarm: [11, 15],  midja: [51, 55] },
  { namn: "Youth M",  alder: "", vikt: null, langd: [109, 117], brost: [58, 64],   underarm: [14, 17],  midja: [53, 57] },
  { namn: "Youth L",  alder: "", vikt: null, langd: [117, 127], brost: [60, 70],   underarm: [15, 19],  midja: [56, 60] },
  { namn: "Junior S", alder: "", vikt: null, langd: [127, 137], brost: [60, 76],   underarm: [16, 20],  midja: [58, 64] },
  { namn: "Junior M", alder: "", vikt: null, langd: [137, 147], brost: [67, 81],   underarm: [18, 22],  midja: [62, 72] },
  { namn: "Junior L", alder: "", vikt: null, langd: [147, 157], brost: [75, 89],   underarm: [20, 25],  midja: [69, 79] },
  { namn: "Junior XL",alder: "", vikt: null, langd: null,       brost: null,       underarm: null,      midja: [69, 74] },
  { namn: "Senior S", alder: "", vikt: null, langd: [157, 168], brost: [86, 97],   underarm: [23, 27],  midja: [74, 82] },
  { namn: "Senior M", alder: "", vikt: null, langd: [168, 178], brost: [94, 104],  underarm: [25, 29],  midja: [79, 89] },
  { namn: "Senior L", alder: "", vikt: null, langd: [178, 188], brost: [102, 112], underarm: [28, 32],  midja: [86, 99] },
  { namn: "Senior XL",alder: "", vikt: null, langd: [183, 999], brost: [109, 122], underarm: [29, 999], midja: [95, 107] }
];

// CCM benskydd: tibia i cm → tum-storlek. OBS: CCM mäter knäskål → skridskoskaftets överkant,
// vilket är ~5,5 cm kortare än Bauers mått (knäskål → fotknöl). Därför har CCM benskyddAvdrag 5,5.
var CCM_BENSKYDD = [
  { storlek: '8"',  cm: [20, 23] },
  { storlek: '9"',  cm: [23, 25] },
  { storlek: '10"', cm: [25, 28] },
  { storlek: '11"', cm: [28, 30] },
  { storlek: '12"', cm: [30, 33] },
  { storlek: '13"', cm: [33, 36] },
  { storlek: '14"', cm: [36, 38] },
  { storlek: '15"', cm: [38, 41] },
  { storlek: '16"', cm: [41, 43] },
  { storlek: '17"', cm: [43, 46] }
];

// CCM hjälm: huvudomkrets (cm) → storlek. Siffror från CCM Tacks 910.
// OBS: hjälmar är justerbara och varierar mellan modeller – prova alltid.
var CCM_HJALM = [
  { storlek: "X-Small", cm: [51.5, 55.5] },
  { storlek: "Small",   cm: [52.5, 57] },
  { storlek: "Medium",  cm: [55.5, 60] },
  { storlek: "Large",   cm: [58.5, 63] }
];

// CCM handskar: handlängd (långfingertopp till handled) i cm → tum-storlek. Källa: SkatePro.
var CCM_HANDSKAR = [
  { storlek: '8"',  cm: [10.5, 13] },
  { storlek: '9"',  cm: [11.5, 14] },
  { storlek: '10"', cm: [13, 15.5] },
  { storlek: '11"', cm: [14, 16.5] },
  { storlek: '12"', cm: [15.5, 18] },
  { storlek: '13"', cm: [16.5, 19] },
  { storlek: '14"', cm: [18, 20.5] },
  { storlek: '15"', cm: [19, 22] }
];

// CCM skridskor: fotlängd (cm) → skridskostorlek. Källa: SkatePro.
// CCM anger ingen skenlängd, därför sken: null (visas som "skena –").
var CCM_SKRIDSKOR = [
  { fot: 14.5, storlek: "Youth 6",    sken: null },
  { fot: 15.2, storlek: "Youth 7",    sken: null },
  { fot: 16.2, storlek: "Youth 8",    sken: null },
  { fot: 17.0, storlek: "Youth 9",    sken: null },
  { fot: 17.4, storlek: "Youth 9.5",  sken: null },
  { fot: 17.8, storlek: "Youth 10",   sken: null },
  { fot: 18.2, storlek: "Youth 10.5", sken: null },
  { fot: 18.7, storlek: "Youth 11",   sken: null },
  { fot: 19.1, storlek: "Youth 11.5", sken: null },
  { fot: 19.5, storlek: "Youth 12",   sken: null },
  { fot: 19.9, storlek: "Youth 12.5", sken: null },
  { fot: 20.3, storlek: "Youth 13",   sken: null },
  { fot: 20.6, storlek: "Youth 13.5", sken: null },
  { fot: 21.0, storlek: "Junior 1",   sken: null },
  { fot: 21.4, storlek: "Junior 1.5", sken: null },
  { fot: 21.8, storlek: "Junior 2",   sken: null },
  { fot: 22.2, storlek: "Junior 2.5", sken: null },
  { fot: 22.6, storlek: "Junior 3",   sken: null },
  { fot: 23.1, storlek: "Junior 3.5", sken: null },
  { fot: 23.5, storlek: "Junior 4",   sken: null },
  { fot: 23.9, storlek: "Junior 4.5", sken: null },
  { fot: 24.3, storlek: "Junior 5",   sken: null },
  { fot: 24.7, storlek: "Junior 5.5", sken: null },
  { fot: 25.1, storlek: "Senior 6",   sken: null },
  { fot: 25.5, storlek: "Senior 6.5", sken: null },
  { fot: 26.0, storlek: "Senior 7",   sken: null },
  { fot: 26.4, storlek: "Senior 7.5", sken: null },
  { fot: 26.8, storlek: "Senior 8",   sken: null },
  { fot: 27.2, storlek: "Senior 8.5", sken: null },
  { fot: 27.7, storlek: "Senior 9",   sken: null },
  { fot: 28.1, storlek: "Senior 9.5", sken: null },
  { fot: 28.5, storlek: "Senior 10",  sken: null },
  { fot: 28.9, storlek: "Senior 10.5",sken: null },
  { fot: 29.4, storlek: "Senior 11",  sken: null },
  { fot: 29.8, storlek: "Senior 11.5",sken: null },
  { fot: 30.2, storlek: "Senior 12",  sken: null }
];


// ===== Alla varumärken samlade =====
// Märkesväljaren i appen visar dessa, och förslagen använder det valda märkets tabeller.
// midjaAvdrag = cm som dras av från midjemåttet innan byxstorlek slås upp (Bauer 7,6; CCM 0).
// handskar/skridskor = null om märkets guide saknar den utrustningen.
var VARUMARKEN = {
  bauer: {
    namn: "Bauer",
    storlekar: BAUER_STORLEKAR,
    benskydd: BAUER_BENSKYDD,
    handskar: BAUER_HANDSKAR,
    skridskor: BAUER_SKRIDSKOR,
    hjalm: BAUER_HJALM,
    midjaAvdrag: 7.6,
    benskyddAvdrag: 0
  },
  ccm: {
    namn: "CCM",
    storlekar: CCM_STORLEKAR,
    benskydd: CCM_BENSKYDD,
    handskar: CCM_HANDSKAR,
    skridskor: CCM_SKRIDSKOR,
    hjalm: CCM_HJALM,
    midjaAvdrag: 0,
    benskyddAvdrag: 5.5
  }
};


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
