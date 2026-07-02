# 🚀 Guide: släpp mobilappen på App Store och Google Play

Den här guiden tar dig hela vägen från koden i `mobile/` till en app i båda
butikerna. **Du behöver ingen Mac för att bygga** – Expos molntjänst EAS
bygger både iOS- och Android-apparna åt dig. (En Mac behövs bara om du vill
felsöka lokalt i Xcode.)

> 💡 Den gamla webbappen på https://gillmania.github.io/hockey-gear/
> fortsätter fungera som vanligt. Den har fått en "Exportera min data"-knapp
> så att befintliga användare kan flytta sina grejer till nya appen.

---

## Översikt – så här hänger det ihop

1. **Skaffa konton** – Expo (gratis), Apple Developer (99 USD/år),
   Google Play Console (25 USD en gång)
2. **Testa appen** – direkt i telefonen med Expo Go, sen som riktig
   testbuild
3. **⚠️ Starta Googles stängda test TIDIGT** – nya Play-konton måste ha
   **minst 12 testare i 14 dagar** innan appen får släppas publikt.
   Det här är den längsta ledtiden i hela processen – börja där!
4. **Bygg produktionsversioner** med `eas build`
5. **Skicka in** med `eas submit` + fyll i butiksuppgifterna
6. **Granskning** – Apple ~1–2 dagar, Google ~1–7 dagar första gången

⚠️ Precis som förut: kontoägaren måste vara **18 år** – du (Victor) står
som ägare, din son är utvecklaren bakom appen.

---

## Steg 1 – Konton (engångsjobb)

1. **Expo**: skapa gratis konto på https://expo.dev
2. **Apple Developer Program**: https://developer.apple.com → Enroll
   (99 USD/år). Fyll i bank/skatt även om appen är gratis – det är
   enklast att göra klart direkt.
3. **Google Play Console**: https://play.google.com/console → registrera
   dig (25 USD, engångsavgift).

## Steg 2 – Provkör på telefonen (gratis, 5 minuter)

På datorn:

```bash
cd hockey-gear/mobile
npm install
npx expo start
```

Installera appen **Expo Go** på telefonen och skanna QR-koden som dyker
upp. Nu kör appen live på telefonen – ändringar i koden syns direkt.

## Steg 3 – Riktiga testbyggen med EAS

```bash
npm install -g eas-cli
eas login
eas build --profile preview --platform android   # ger en .apk att installera direkt
eas build --profile preview --platform ios       # kräver Apple-kontot, går till TestFlight
```

Första gången ställer EAS några frågor (låt den skapa nycklar åt dig –
svara ja på allt). Bygget tar ~15 min i molnet och du får en länk.

## Steg 4 – ⚠️ Googles stängda test (starta NU, inte sist!)

Nya personliga Play-konton måste köra **stängt test med minst 12 testare
i 14 dagar** innan man ens får ansöka om publik lansering.

1. I Play Console: skapa appen (namn, gratis, kategori Sport)
2. Ladda upp din preview-/produktions-AAB under **Testning → Stängt test**
   (bygg med `eas build --profile production --platform android`)
3. Bjud in 12+ testare via e-postlista – hockeylaget är perfekt! Skicka
   opt-in-länken till föräldrarna i laget.
4. Efter 14 dagar med testare: ansök om produktion i Play Console.

## Steg 5 – Butiksuppgifter (båda butikerna)

Ha detta redo:

- **Namn**: t.ex. "Hockey Gear" (aldrig märkesnamn som Bauer/CCM i
  appnamnet eller nyckelorden – varumärkesrisk!)
- **Beskrivning**: på svenska OCH engelska (två lokaliseringar i båda
  butikerna). Nämn: håll koll på utrustningen, mät en gång → rätt storlek
  per märke, flera barnprofiler, växer ur-varning, allt sparas lokalt.
- **Skärmbilder**: ta på telefonen (iPhone-format 6.7" för Apple;
  telefon + eventuellt 7"-surfplatta för Google). Visa Sizes-fliken,
  utrustningslistan och mätfiguren.
- **Integritet**:
  - Apple: App Privacy → **"Data Not Collected"**
  - Google: Data safety → ingen data samlas in eller delas
  - Policy-URL (Google kräver, Apple vill ha):
    `https://gillmania.github.io/hockey-gear/docs/privacy-policy.html`
- **Målgrupp/ålder**: deklarera **13+** och "inte primärt riktad till
  barn" – appen används av föräldern/spelaren, inte småbarn. Då slipper
  du Googles hårdare barnregler (Families Policy). ✋ Det här är ett
  medvetet val – ändra inte till "för barn" utan att läsa på.

## Steg 6 – Bygg och skicka in

```bash
cd mobile
eas build --profile production --platform all
eas submit --platform ios
eas submit --platform android
```

Fyll i det sista i App Store Connect respektive Play Console och tryck
på **Submit for review**.

## Uppdatera appen senare

1. Ändra koden, höj `version` i `mobile/app.json` (t.ex. 1.0.1)
2. `eas build --profile production --platform all`
3. `eas submit` för båda plattformarna

## Vanliga frågor

**Kostar EAS pengar?** Gratisplanen räcker långt (ett begränsat antal
molnbyggen per månad). Bygg bara när något faktiskt ska släppas.

**Var är datan?** Allt sparas lokalt på användarens telefon – ingen
server, inget konto, ingenting att underhålla eller GDPR-oroa sig för.

**Hur lägger jag till fler märken (True, Sherwood, STX)?** Se
`docs/BRAND-DATA-GUIDE.md` – ca en timme per märke, och regeln är att
varje siffra måste komma från märkets officiella tabell.
