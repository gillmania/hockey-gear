# Projektplan: Min Hockeyutrustning → internationell mobilapp ("Hockey Gear")

> Den godkända planen för omskrivningen till en riktig mobilapp för
> App Store + Google Play. Statusen längst upp uppdateras allt eftersom.

## STATUS

**Klart och pushat** (PR [#2](https://github.com/gillmania/hockey-gear/pull/2), CI grön):

- **Fas 0** – Expo SDK 57-app (`mobile/`, TypeScript, Expo Router), tema från
  `style.css`, alla 13 pixel-ikoner portade till react-native-svg, CI-workflow
- **Fas 1** – storleksmotorn portad till ren TS (`mobile/src/domain/sizing/`):
  Bauer/CCM/Warrior med golden value-tester mot originaltabellerna
- **Fas 2** – datalager (`mobile/src/data/`): profiler, utrustning, append-only
  måtthistorik, zustand + AsyncStorage (versionerad persistens)
- **Fas 3** – alla skärmar: onboarding, utrustning, storlekar, mått + kroppsfigur,
  historik med pixel-graf, profiler, inställningar
- **Fas 4** – i18n svenska + engelska, cm/kg ↔ tum/lbs, EU/US/UK-skostorlekar
- **Fas 5** – "växer ur snart"-badge på förslag OCH ägd utrustning + trenduppskattning
- **Fas 7** – legacy-export i gamla webbappen + importskärm i mobilappen (testad)
- **Fas 8** – app-ikon/splash, `eas.json`, privacy policy, RELEASE-GUIDE, BRAND-DATA-GUIDE

Verifierat: 103 enhetstester gröna, `tsc`/`eslint` rena, end-to-end i webbläsare.

**Kvar / medvetet uteslutet:**

- **Fas 6 (True/Sherwood/STX)** – skeppas INTE i v1. Regeln är absolut: inga
  storlekssiffror utan verifierad officiell källa. Se `docs/BRAND-DATA-GUIDE.md`
  (~1 h/märke när man kan nå källorna).
- Släpp i butikerna – ägaruppgift, se `docs/RELEASE-GUIDE.md` (starta Googles
  12-testare/14-dagars-test tidigt).

---

## Kontext

Appen började som en liten vanilla JS-webbapp helt på svenska: två flikar
(utrustningslista + kroppsmått med storleksrekommendationer per märke),
localStorage, Capacitor för iOS, PWA på GitHub Pages. Kärnan – den
konfigurationsdrivna storleksmotorn i `storleksguide.js` (mät en gång → förslag
för Bauer/CCM/Warrior med per-märkes-justeringar) – är appens unika värde och
behålls rakt av. Målet: internationell succé bland hockeyföräldrar och spelare.

Den gamla webbappen i roten lämnas orörd sånär som på en "Exportera min
data"-knapp för flytten till nya appen.

## Beslut

1. **Full rewrite** → **React Native + Expo (TypeScript)**. Motivering framför
   Flutter: ägaren kan JS (motorn portas nästan rakt av), Expo EAS bygger båda
   plattformarnas binärer i molnet (ingen lokal Xcode/Android Studio),
   `eas submit` automatiserar båda butikerna.
2. **Gratis app, premium senare** – v1 utan köp, framtida gating bakom stub
   (`mobile/src/features/entitlements.ts`) så RevenueCat kan läggas till utan refactor.
3. **V1-scope:** engelska+svenska, imperial + US/UK/EU-skostorlekar, flera
   profiler (barn), måtthistorik + "växer ur snart", fler märken (när källor nås).
4. Den retro/pixel-art-identiteten (Press Start 2P, pixel-SVG-ikoner) behålls.

## Projektstruktur (monorepo)

```
hockey-gear/
├── index.html, app.js, storleksguide.js ...  # gamla webbappen (+ export-knapp)
├── mobile/                       # NYA Expo-appen
│   ├── app.json, eas.json, package.json
│   └── src/
│       ├── app/                  # skärmar (Expo Router, filbaserad routing)
│       ├── domain/sizing/        # motorn: ren TS, inga React-imports
│       │   └── brands/           # en fil per märke, källhänvisad
│       ├── data/                 # zustand-stores, schema, legacy-import
│       ├── i18n/                 # svenska + engelska
│       ├── theme/ · icons/ · components/
├── docs/                         # PLAN.md, RELEASE-GUIDE, BRAND-DATA-GUIDE, privacy-policy
└── .github/workflows/ci.yml
```

## Grundprinciper

- **Allt lagras metriskt** (cm/kg) – enheter är bara visning; storleksetiketter
  (`12"`, "Junior M") är märkesvokabulär och konverteras aldrig.
- **Måtthistoriken är append-only** – varje "Spara mått" blir en ny post; det
  driver tillväxtgraferna och "växer ur snart"-varningen.
- **Inga påhittade storlekssiffror** – varje tabellvärde kommer från märkets
  officiella guide, med källa (URL + datum) i filhuvudet.

## "Växer ur snart"-algoritmen (`mobile/src/domain/sizing/outgrowing.ts`)

- Matchad rad `[min,max]`: `fraction = (värde−min)/(max−min)`; ≥ 0.8 och större
  storlek finns → badge.
- Skridskor (punkttabell): nästa storlek ≤ 0.4 cm bort → badge.
- Med ≥2 historikposter: tillväxttakt → "för liten om ~N mån" (visas bara med historik).
- Appliceras även på ägd utrustning vars storlek matchar märkets tabell.

## Versionspinnar (viktigt vid `npm install`)

- `jest` pinnad till v29 (jest-expo 57 stödjer inte jest 30)
- `eslint` pinnad till v9 (eslint-config-expo 57 stödjer inte eslint 10)
- `npm install --legacy-peer-deps` (Expo SDK 57 peer-konflikt kring `react-server-dom-webpack`)

## Verifiering

```bash
cd mobile
npm install --legacy-peer-deps
npx jest          # golden value-tester + formvalidering över alla märken
npx tsc --noEmit
npx eslint .
npx expo start    # tryck w för webbläsare, eller skanna QR med Expo Go
```

## Risker

1. Varumärken i namn/nyckelord – aldrig i appnamnet; friskrivning överallt.
2. Storleksdata-ansvar – källor citerade i kod, "prova alltid i butik"-friskrivning.
3. Google Plays 12-testare/14-dagars-krav – starta tidigt.
4. Expo SDK-churn – versioner pinnade, uppgraderingsväg i `mobile/README.md`.
5. Imperial-skokonvertering är ungefärlig – märks tydligt, mätt fotlängd rekommenderas.
