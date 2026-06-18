// ===== Egna ikoner för hockeyutrustning =====
// Varje ikon är en liten SVG-bild (24x24) som målas i färgen "currentColor"
// (styrs av CSS). Vill du ändra en ikon? Ändra bara figuren här.

var IKON_SVG = {
  // Hjälm sedd från sidan, med galler framtill.
  "Hjälm": '<svg viewBox="0 0 24 24"><path d="M10 4a7 7 0 0 0-7 7v2.3A1.7 1.7 0 0 0 4.7 15H8v-2H5v-2a5 5 0 0 1 9.9-1l2-.6A7 7 0 0 0 10 4z" fill="currentColor"/><rect x="9.5" y="12.3" width="9.2" height="5.4" rx="1.3" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12.6 12.3v5.4M15.6 12.3v5.4" stroke="currentColor" stroke-width="1.3"/></svg>',

  // Halsskydd – en krage (två bågar).
  "Halsskydd": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 8.5a7 7 0 0 0 14 0"/><path d="M6.7 11.5a6 6 0 0 0 10.6 0"/></svg>',

  // Axelskydd – bröstskydd med två axelkappor.
  "Axelskydd": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 5 8.8 6.5H6a2 2 0 0 0-2 2v1.8l2 1V16a1 1 0 0 0 1 1h3l2-3 2 3h3a1 1 0 0 0 1-1v-4.7l2-1V8.5a2 2 0 0 0-2-2h-2.8z"/></svg>',

  // Armbågsskydd – rundad kåpa med två remmar.
  "Armbågsskydd": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9.5 4.5A5.5 5.5 0 0 1 13 9.6v4.4a5 5 0 0 1-10 0 1 1 0 0 1 1-1h2v-2.4a5.5 5.5 0 0 1 3.5-6.1z"/><rect x="12.5" y="8" width="7.5" height="2.4" rx="1.2"/><rect x="12.5" y="13" width="7.5" height="2.4" rx="1.2"/></svg>',

  // Handske – fingrar uppåt och en manschett.
  "Handskar": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 9.5h1.6V6.6a1 1 0 0 1 2 0V9.5h1V6a1 1 0 0 1 2 0v3.5h1V7a1 1 0 0 1 2 0v6.5A3.5 3.5 0 0 1 14 17H12a5 5 0 0 1-5-5v-.5a2 2 0 0 1 0-2z"/><rect x="8" y="16.5" width="8.5" height="3" rx="1"/></svg>',

  // Hockeybyxa – bylsiga shorts med en skåra mellan benen.
  "Hockeybyxa": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.5 6h13a1 1 0 0 1 1 1v3.8c0 4-.8 5.7-1.1 7.2H14l-2-5.6-2 5.6H5.6C5.3 16.5 4.5 14.8 4.5 10.8V7a1 1 0 0 1 1-1z"/></svg>',

  // Benskydd – knäskål (cirkel) plus en lång benskena.
  "Benskydd": '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="6" r="3.3"/><path d="M9 10h6a1 1 0 0 1 1 1v7a3 3 0 0 1-3 3h-2a3 3 0 0 1-3-3v-7a1 1 0 0 1 1-1z"/></svg>',

  // Skridsko – pjäxa med skena och två hållare under.
  "Skridskor": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5c.6 0 1 .4 1 1 .1 2.6 1.7 4.4 4 5.1l5.4 1.7c1 .3 1.6 1.2 1.6 2.3V16H6z"/><rect x="4" y="17.4" width="16" height="1.8" rx=".9"/><rect x="8" y="16" width="1.6" height="2.2"/><rect x="15" y="16" width="1.6" height="2.2"/></svg>',

  // Klubba – skaft på diagonalen med ett blad nedtill.
  "Klubba": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5 10 15"/><path d="M10 15 4 17"/></svg>',

  // Suspensoar – en skyddskupa.
  "Suspensoar": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 7h12a1 1 0 0 1 1 1c0 6-3 9.5-7 9.5S5 14 5 8a1 1 0 0 1 1-1z"/></svg>',

  // Hockeyväska – bag med handtag.
  "Hockeyväska": '<svg viewBox="0 0 24 24"><rect x="3" y="9" width="18" height="9" rx="2" fill="currentColor"/><path d="M8.5 9V8a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',

  // Tröja/matchställ.
  "Tröja": '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 4 5.5 5 3 8l2.2 3L7 10v9h10v-9l1.8 1L21 8l-2.5-3L15 4a3 3 0 0 1-6 0z"/></svg>',

  // Annat – en låda.
  "Annat": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 3 3 7.5 12 12l9-4.5z"/><path d="M3 7.5V16l9 4.5 9-4.5V7.5"/><path d="M12 12v8.5"/></svg>'
};

// Hämtar SVG-ikonen för en nyckel (t.ex. "Klubba"). Saknas den används lådan.
function ikonSvg(nyckel) {
  return IKON_SVG[nyckel] || IKON_SVG["Annat"];
}
