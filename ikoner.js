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
    palette: { D: "#0e1b2b", B: "#2f7fc4", b: "#7cc0f2", S: "#cfd9e6", s: "#8c99a8" },
    rows: [
      "......DDDD......",
      "....DDBBBBDD....",
      "...DBbbbbbbBD...",
      "..DBbbbbbbbbBD..",
      "..DBbbbbbbbbBD..",
      "..DBBBBBBBBBBD..",
      "..DSSSSSSSSSSD..",
      "..DsSsSsSsSsSD..",
      "..DSSSSSSSSSSD..",
      "..DsSsSsSsSsSD..",
      "..DSSSSSSSSSSD..",
      "...DSSSSSSSSD...",
      "....DDDDDDDD....",
      "................"
    ]
  },
  "Tröja": {
    palette: { D: "#5a1414", J: "#d23b34", j: "#f06a5a", W: "#f2f6fb" },
    rows: [
      "...JJ....JJ.....",
      "..JjjJ..JjjJ....",
      ".JjjjjJJjjjjJ...",
      "JjjjjWWWWjjjjJ..",
      "JjjjWWWWWWjjjJ..",
      "DjjjjjjjjjjjjD..",
      ".JjjjjjjjjjJ....",
      ".JjjjjjjjjjJ....",
      ".JjjWWWWWWjJ....",
      ".JjjjjjjjjjJ....",
      ".JjjjjjjjjjJ....",
      ".DJJJJJJJJJD....",
      "..DDDDDDDDDD....",
      "................"
    ]
  },
  "Axelskydd": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", B: "#3aa0e6" },
    rows: [
      "..DDDD..DDDD....",
      ".DNnnNDDNnnND...",
      ".DNnnnNNnnnND...",
      ".DNnnnnnnnnND...",
      "..DNnnnnnnND....",
      "...DNBBBBND.....",
      "...DNnnnnND.....",
      "...DNnnnnND.....",
      "...DNnnnnND.....",
      "...DNnnnnND.....",
      "....DNnnND......",
      ".....DDDD.......",
      "................"
    ]
  },
  "Armbågsskydd": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", S: "#c2ccd8" },
    rows: [
      "....DDDDD.......",
      "..DDNnnnNDD.....",
      ".DNnnnnnnnND....",
      ".DNnnnnnnnND.SS.",
      ".DNnnnnnnnNDSsS.",
      ".DNnnnnnnnND.SS.",
      ".DNnnnnnnnND....",
      ".DNnnnnnnnND.SS.",
      ".DNnnnnnnnNDSsS.",
      "..DNnnnnnND..SS.",
      "...DNnnnND......",
      "....DDDDD.......",
      "................"
    ]
  },
  "Handskar": {
    palette: { D: "#3a0f0f", R: "#e23b3b", r: "#f47a6a", W: "#f2f6fb" },
    rows: [
      "..D.D.D.D......",
      ".DRDRDRDRD.....",
      ".DrDrDrDrD.....",
      ".DRRRRRRRRD....",
      ".DRrrrrrrRD....",
      "DDRrrrrrrRD....",
      "DRRRrrrrrRD....",
      "DRrRRRRRRRD....",
      ".DRRRRRRRRD....",
      ".DWWWWWWWWD....",
      ".DWWWWWWWWD....",
      "..DDDDDDDD.....",
      "................"
    ]
  },
  "Hockeybyxa": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", B: "#3aa0e6" },
    rows: [
      ".DDDDDDDDDDDD..",
      ".DNNNNNNNNNND..",
      ".DNBBBBBBBBND..",
      ".DNnnnnnnnnND..",
      ".DNnnnnnnnnND..",
      ".DNnnnnnnnnND..",
      ".DNnnnDDnnnND..",
      ".DNnnND.DNnnD..",
      ".DNnnD..DNnnD..",
      ".DNnnD..DNnnD..",
      ".DDDDD..DDDDD..",
      "................"
    ]
  },
  "Benskydd": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", S: "#d3deeb" },
    rows: [
      "......DDDD......",
      "....DDnnnnDD....",
      "...DnSSSSSSnD...",
      "...DnSnnnnSnD...",
      "...DnSSSSSSnD...",
      "....DnnnnnnD....",
      "...DNNNNNNND....",
      "..DNnnSSnnnND...",
      "..DNnnSSnnnND...",
      "..DNnnSSnnnND...",
      "..DNnnSSnnnND...",
      "..DNnnnnnnnND...",
      "..DNnnnnnnnND...",
      "...DNnnnnnND....",
      "....DDDDDD......"
    ]
  },
  "Skridskor": {
    palette: { D: "#0e1b2b", B: "#2f7fc4", b: "#7cc0f2", W: "#f2f6fb", Z: "#dfe7f0" },
    rows: [
      "...DDDDDD.......",
      "..DBBBBBBD......",
      "..DBWBWBBD......",
      "..DBWBWBBDD.....",
      "..DBWBWBBBBD....",
      "..DBBBBBBBBBD...",
      "..DBBBBBBBBBD...",
      "...DDDDDDDDD....",
      "....D.....D.....",
      "..ZZZZZZZZZZZ...",
      "...DZZZZZZZD....",
      "................"
    ]
  },
  "Klubba": {
    palette: { D: "#0e1b2b", T: "#d9a55a", t: "#b9863c", K: "#1a1a1a" },
    rows: [
      "...........DD..",
      "..........DTtD.",
      ".........DTtD..",
      "........DTtD...",
      ".......DTtD....",
      "......DTtD.....",
      ".....DTtD......",
      "....DTtD.......",
      "...DTtD........",
      "..DKtD.........",
      ".DKKKD.........",
      "DKKKKKD........",
      ".DDDDDD........",
      "................"
    ]
  },
  "Suspensoar": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad" },
    rows: [
      "................",
      ".DDDDDDDDDD.....",
      ".DNNNNNNNND.....",
      ".DNnnnnnnND.....",
      ".DNnnnnnnND.....",
      "..DNnnnnND......",
      "..DNnnnnND......",
      "...DNnnND.......",
      "....DNND........",
      "....DND.........",
      ".....D..........",
      "................"
    ]
  },
  "Hockeyväska": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad", R: "#e23b3b" },
    rows: [
      "................",
      "....DDDDDD......",
      "...DD....DD.....",
      "..DDDDDDDDDD....",
      ".DNnnnnnnnnND...",
      ".DNnnnnnnnnND...",
      ".DRRRRRRRRRRD...",
      ".DNnnnnnnnnND...",
      ".DNnnnnnnnnND...",
      "..DNNNNNNNND....",
      "................"
    ]
  },
  "Halsskydd": {
    palette: { D: "#0e1b2b", N: "#566f8c", n: "#7c93ad" },
    rows: [
      "................",
      "...DDDDDDDD.....",
      "..DNNNNNNNND....",
      ".DNnnnnnnnnND...",
      ".DNnDDDDDDnND...",
      ".DNnD....DnND...",
      ".DNnD....DnND...",
      "..DNnD..DnND....",
      "...DNnDDnND.....",
      "....DNnnND......",
      ".....DDDD.......",
      "................"
    ]
  },
  "Annat": {
    palette: { D: "#0e1b2b", T: "#d9a55a", t: "#b9863c" },
    rows: [
      ".....DDDD.......",
      "...DDTttTDD.....",
      ".DDTttttttTDD...",
      ".DTttttttttTD...",
      ".DTttttttttTD...",
      ".DTttttttttTD...",
      ".DTttttttttTD...",
      ".DTttttttttTD...",
      ".DDTttttttTDD...",
      "...DDTttTDD.....",
      ".....DDDD.......",
      "................"
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
