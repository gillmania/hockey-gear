// ===== Pixel-ikoner (16-bitars SNES-stil) =====
// Varje ikon ritas som ett rutnät av pixlar. En bokstav = en färg, "." = genomskinligt.
// Vill du ändra en ikon? Rita bara om rutnätet nedan – varje tecken är en pixel.

// Ritar ett rutnät till en SVG (en liten ruta per pixel).
function pixelArt(def) {
  var rows = def.rows;
  var pal = def.palette;
  var h = rows.length;
  var w = 0;
  for (var i = 0; i < h; i++) {
    if (rows[i].length > w) { w = rows[i].length; }
  }

  var rutor = "";
  for (var y = 0; y < h; y++) {
    var rad = rows[y];
    for (var x = 0; x < rad.length; x++) {
      var farg = pal[rad[x]];
      if (farg) {
        // 1.02 i storlek tätar små glipor mellan pixlarna.
        rutor += '<rect x="' + x + '" y="' + y + '" width="1.02" height="1.02" fill="' + farg + '"/>';
      }
    }
  }
  return '<svg viewBox="0 0 ' + w + ' ' + h + '" shape-rendering="crispEdges">' + rutor + "</svg>";
}

// Rutnäten för varje utrustning. Tecknen pekar på färgerna i "palette".
var PIXEL_IKONER = {
  "Hjälm": {
    palette: { D: "#0e1b2b", L: "#f7f9fc", W: "#dde4ec", G: "#b9c2cf", g: "#8d97a6", C: "#3a4250", K: "#11151c" },
    rows: [
      ".......DLLLLD.......",
      ".....DLLLLLLLLD.....",
      "...DLLLLLLLLLLLLD...",
      "..DWWWWWWWWWWWWWWD..",
      ".DWWWWWWWWWWWWWWWWD.",
      ".DWDWDWDWWWWDWDWDWD.",
      ".DGGGGGGGGGGGGGGGGD.",
      ".DGGGGGGGGGGGGGGGGD.",
      "..DggggggggggggggD..",
      "...DggggggggggggD...",
      "..DCCCCCCCCCCCCCCD..",
      "..DC..C..C..C..C.D..",
      "..DC..C..C..C..C.D..",
      "..DCCCCCCCCCCCCCCD..",
      "..DC..C..C..C..C.D..",
      "..DC..C..C..C..C.D..",
      "..DCCCCCCCCCCCCCCD..",
      "..DC..C..C..C..C.D..",
      "..DC..C..C..C..C.D..",
      "..DCCCCCCCCCCCCCCD..",
      "....DKKKKKKKKKKD....",
      "......DKKKKKKD......",
      "...................."
    ]
  },
  "Tröja": {
    palette: { D: "#5a1414", J: "#d23b34", j: "#f06a5a", W: "#f2f6fb", N: "#8a2420" },
    rows: [
      "....DJJD..DJJD....",
      "...DJjjjJJjjjJD...",
      "..DJjjjWWWWjjjJD..",
      ".DJJWWWWWWWWWWJJD.",
      ".DJJJJJJJJJJJJJJD.",
      ".DJJJJJWWWWJJJJJD.",
      ".DJJJJJWWWWJJJJJD.",
      ".DJJJJJWWWWJJJJJD.",
      ".DjjjjjjjjjjjjjjD.",
      ".DNNNNNNNNNNNNNND.",
      ".DWWWWWWWWWWWWWWD.",
      ".DDDDDDDDDDDDDDDD.",
      "....DDDDDDDDDD....",
      ".................."
    ]
  },
  "Axelskydd": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", B: "#3aa0e6" },
    rows: [
      "....DnnD..DnnD....",
      "..DNnnND.DNnnND...",
      "..DNnnnNNNNnnnND..",
      "..DNnBBBBBBBBnND..",
      "..DNnnnnnnnnnnND..",
      "..DNnnnnnnnnnnND..",
      "...DNnnnnnnnnND...",
      "...DNnnnnnnnnND...",
      "....DNnnnnnnND....",
      ".....DNnnnnND.....",
      "......DDDDDD......",
      ".................."
    ]
  },
  "Armbågsskydd": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", S: "#c2ccd8" },
    rows: [
      ".....DNNNNNND.....",
      "..DNnnnnnnnnnD....",
      "..DNnnnnnnnnnnND..",
      "..DNnnnnnnnnnnNDSS",
      ".DNnnnnnnnnnnNDSsS",
      "..DNnnnnnnnnnnNDSS",
      "..DNnnnnnnnnnnND..",
      "..DNnnnnnnnnnnNDSS",
      ".DNnnnnnnnnnnNDSsS",
      "....DNnnnnnnnnNDSS",
      "....DNnnnnnnND....",
      ".....DNNNNNND.....",
      ".................."
    ]
  },
  "Handskar": {
    palette: { D: "#3a0f0f", R: "#e23b3b", r: "#f47a6a", W: "#f2f6fb", N: "#8c2424" },
    rows: [
      "..D.D.D.D.D.......",
      ".DRDRDRDRD........",
      ".DrDrDrDrD........",
      ".DRRRRRRRRD.......",
      ".DRrrrrrrRD.......",
      "DDRrrrrrrRD.......",
      "DRRRrrrrrRD.......",
      "DRrRRRRRRRD.......",
      ".DRRRRRRRRD.......",
      ".DNNNNNNNND.......",
      ".DWWWWWWWWD.......",
      ".DWWWWWWWWD.......",
      "..DDDDDDDD........",
      ".................."
    ]
  },
  "Hockeybyxa": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", B: "#3aa0e6" },
    rows: [
      ".DDDDDDDDDDDDDDDD.",
      ".DNNNNNNNNNNNNNND.",
      ".DBBBBBBBBBBBBBBD.",
      ".DnnnnnnnnnnnnnnD.",
      ".DnnnnnnnnnnnnnnD.",
      ".DnnnnnnnnnnnnnnD.",
      ".Dnnnnn....nnnnnD.",
      ".Dnnnn......nnnnD.",
      ".Dnnn........nnnD.",
      ".Dnn..........nnD.",
      "..DD..........DD..",
      ".................."
    ]
  },
  "Benskydd": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", S: "#d3deeb" },
    rows: [
      "......DSSSSD......",
      "....DSSSSSSSSD....",
      "....DSnnnnnnSD....",
      "....DSSSSSSSSD....",
      "....DnnnnnnnnD....",
      "...DNNNNNNNNNND...",
      "..DnnSSnnnnSSnnD..",
      "..DnnSSnnnnSSnnD..",
      "..DnnSSnnnnSSnnD..",
      "..DnnnnnnnnnnnnD..",
      "..DnnnnnnnnnnnnD..",
      "...DnnnnnnnnnnD...",
      "....DnnnnnnnnD....",
      ".....DDDDDDDD.....",
      ".................."
    ]
  },
  "Skridskor": {
    palette: { D: "#0e1b2b", B: "#2f7fc4", b: "#7cc0f2", W: "#f2f6fb", Z: "#dfe7f0", k: "#1a1a1a" },
    rows: [
      "...DDDDDDDD.......",
      "..DBBBBBBD........",
      "..DBWbWBBD........",
      "..DBWbWBBDD.......",
      "..DBWbWBBBBD......",
      "..DBBBBBBBBBBD....",
      "..DBBBBBBBBBBD....",
      "..DkkkkkkkkkkD....",
      "...DDDDDDDDDDD....",
      "....D.............",
      "..ZZZZZZZZZZZZZ...",
      "...DZZZZZZZZZD....",
      ".................."
    ]
  },
  "Klubba": {
    palette: { D: "#0e1b2b", T: "#d9a55a", t: "#b9863c", K: "#1a1a1a", W: "#f2f6fb" },
    rows: [
      ".............DD...",
      "............DTtD..",
      "...........DWtD...",
      "..........DTtD....",
      ".........DWtD.....",
      "........DTtD......",
      ".......DWtD.......",
      "......DTtD........",
      ".....DTtD.........",
      "...DKKtD..........",
      "..DKKKKD..........",
      ".DKKKKKKD.........",
      ".DDDDDDDD.........",
      ".................."
    ]
  },
  "Suspensoar": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad" },
    rows: [
      "..................",
      "..DDDDDDDDDDDD....",
      "..DNNNNNNNNNND....",
      "..DnnnnnnnnnnD....",
      "..DnnnnnnnnnnD....",
      "...DnnnnnnnnD.....",
      "...DnnnnnnnnD.....",
      "....DnnnnnnD......",
      ".....DnnnnD.......",
      "......DnnD........",
      ".......DD.........",
      ".................."
    ]
  },
  "Hockeyväska": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", R: "#e23b3b" },
    rows: [
      "..................",
      "....DDDDDDDD......",
      "...DD......DD.....",
      "..DDDDDDDDDDDD....",
      ".DnnnnnnnnnnnnD...",
      ".DnnnnnnnnnnnnD...",
      ".DRRRRRRRRRRRRD...",
      ".DnnnnnnnnnnnnD...",
      ".DnnnnnnnnnnnnD...",
      "..NNNNNNNNNNNN....",
      ".................."
    ]
  },
  "Halsskydd": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad" },
    rows: [
      "..................",
      "....DDDDDDDDDD....",
      "...DNNNNNNNNNND...",
      "..DnnnnnnnnnnnnD..",
      "..DnDDDDDDDDDDnD..",
      "..DnD........DnD..",
      "..DnD........DnD..",
      "...DnD......DnD...",
      "...DnDDDDDDDnD....",
      ".....DnnnnnnD.....",
      "......DDDDDD......",
      ".................."
    ]
  },
  "Annat": {
    palette: { D: "#0e1b2b", T: "#d9a55a", t: "#b9863c" },
    rows: [
      "......DDDDDD......",
      "....DTttttttTD....",
      "...DttttttttttD...",
      "..DttttttttttttD..",
      "..DttttttttttttD..",
      "..DttttttttttttD..",
      "..DttttttttttttD..",
      "..DttttttttttttD..",
      "...DttttttttttD...",
      "....DTttttttTD....",
      "......DDDDDD......",
      ".................."
    ]
  }
};

// Bygg färdiga SVG-strängar av alla pixel-ikoner.
var IKON_SVG = {};
for (var ikonNamn in PIXEL_IKONER) {
  if (PIXEL_IKONER.hasOwnProperty(ikonNamn)) {
    IKON_SVG[ikonNamn] = pixelArt(PIXEL_IKONER[ikonNamn]);
  }
}

// Hämtar SVG-ikonen för en nyckel (t.ex. "Klubba"). Saknas den används lådan.
function ikonSvg(nyckel) {
  return IKON_SVG[nyckel] || IKON_SVG["Annat"];
}
