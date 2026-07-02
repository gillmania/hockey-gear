# Hockey Gear — mobilappen

Cross-platform-appen (iOS + Android) byggd med [Expo](https://expo.dev)
/ React Native + TypeScript. Efterföljaren till webbappen i repo-roten.

## Kom igång

```bash
npm install
npx expo start        # skanna QR-koden med Expo Go på telefonen
```

Kör i webbläsaren istället: tryck `w` i Expo-terminalen (eller
`npx expo start --web`).

## Vanliga kommandon

```bash
npx jest              # kör testerna (storleksmotorn har golden value-tester)
npx tsc --noEmit      # typkontroll
npx eslint .          # lint
```

## Struktur

```
src/
├── app/              # skärmar (Expo Router, filbaserad routing)
├── domain/sizing/    # storleksmotorn – ren TS, inga React-imports
│   └── brands/       # en fil per märke, källhänvisad (se docs/BRAND-DATA-GUIDE.md)
├── data/             # zustand-stores (AsyncStorage), schema, legacy-import
├── i18n/             # svenska + engelska
├── icons/            # pixel-ikonerna (rutnät → SVG)
├── components/       # delade byggstenar (PixelButton, BodyFigure ...)
└── theme/            # färger/typsnitt (16-bitars rink-tema)
```

Grundprinciper:

- **Allt lagras metriskt** (cm/kg) – enheter är bara visning
- **Måtthistoriken är append-only** – varje "Spara mått" blir en ny post,
  det driver tillväxtgraferna och "växer ur snart"-varningen
- **Inga påhittade storlekssiffror** – varje tabellvärde kommer från
  märkets officiella guide, med källa i filhuvudet

## Släppa i butikerna

Se [docs/RELEASE-GUIDE.md](../docs/RELEASE-GUIDE.md).

## Versionsnoter för beroenden

- `jest` är pinnad till v29 – `jest-expo@57` stödjer inte jest 30
- `eslint` är pinnad till v9 – `eslint-config-expo@57` stödjer inte eslint 10
- `npm install` behöver `--legacy-peer-deps` (peer-konflikt kring
  `react-server-dom-webpack` i Expo SDK 57)
