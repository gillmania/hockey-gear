# Lägga till ett nytt märke i storleksguiden

Så här lägger du till t.ex. **True**, **Sherwood** eller **STX** i appen.
Det tar ungefär en timme per märke. Den gyllene regeln:

> **Hitta aldrig på siffror.** Varje värde måste komma från märkets
> officiella storlekstabell. Kan du inte hitta en officiell tabell för en
> utrustningsdel – utelämna den delen. Appen visar då "har ingen guide
> för detta", vilket är ärligt och helt okej.

## Steg 1: Hitta officiella tabeller

Godkända källor, i fallande ordning:

1. Märkets egen webbplats (t.ex. true-hockey.com → "Sizing")
2. Märkets officiella fit guide-PDF:er
3. Auktoriserade återförsäljare som återger märkets tabell
   (t.ex. Pure Hockey, Ice Warehouse, SkatePro) – anteckna vilken

Spara **URL och datum** – de ska in i filens huvudkommentar.

## Steg 2: Skapa märkesfilen

Kopiera `mobile/src/domain/sizing/brands/warrior.ts` (enklast) eller
`bauer.ts` (komplett) till t.ex. `true.ts`. Skriv av tabellen:

- Alla mått lagras i **cm/kg**. Nordamerikanska tabeller i tum/lbs
  konverteras (1 tum = 2,54 cm; 1 lb = 0,454 kg) – men **behåll
  originalvärdena i en kommentar** så att någon kan granska mot källan.
- `[min, max]`-intervall; `Infinity` betyder "och uppåt".
- Storleksetiketter (`'12"'`, `"Junior M"`) skrivs exakt som märket
  skriver dem – de översätts aldrig.

## Steg 3: Kolla mätmetoden (det luriga steget!)

Märken mäter olika. Exempel som redan finns i koden: CCM mäter skenbenet
från knäskålen till **skridskoskaftets kant**, medan Bauer mäter till
**fotknölen** – ca 5,5 cm längre. Därför har CCM:s benskydd
`adjustmentCm: 5.5` plus en `noteKey` som förklarar justeringen för
användaren.

Läs alltid märkets "how to measure"-text. Om metoden skiljer sig från
appens instruktion (se `measurements.instructions` i
`mobile/src/i18n/locales/sv.json`): lägg till `adjustmentCm` och en ny
notis-nyckel i båda språkfilerna.

## Steg 4: Registrera och validera

1. Lägg till märket i `mobile/src/domain/sizing/brands/index.ts`
2. Kör `cd mobile && npx jest` – valideringssviten i
   `tables.test.ts` körs automatiskt över alla registrerade märken
   (intervall åt rätt håll, sorterade skridskotabeller m.m.)
3. Lägg gärna till ett par golden value-tester: "chest X cm ska ge
   storlek Y" direkt ur märkets tabell

## Steg 5: Granska innan merge

Öppna källan bredvid koden och bocka av **varje rad**. En felskriven
siffra ger fel storleksråd till någon annans barn – det är hela
förtroendet för appen.

## Juridiskt

- Tabellvärden är fakta och får transkriberas – men kopiera aldrig
  märkets layout, bilder eller grafik.
- Använd aldrig märkeslogotyper i appen.
- Friskrivningen om icke-affiliering (finns i appens Inställningar och
  på Sizes-fliken) täcker alla märken automatiskt.
