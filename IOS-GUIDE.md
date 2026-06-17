# 📱 Guide: gör appen till en iPhone-app och sälj den för ~20 kr

Den här guiden tar er hela vägen från koden ni redan har till en app som ligger till salu i
App Store. **All teknik är redan förberedd** (Capacitor är uppsatt) – det som återstår gör ni på
**Macen** och i Apples webbportaler.

> 💡 Webbappen på https://gillmania.github.io/hockey-gear/ fortsätter fungera precis som vanligt.
> iOS-appen är "samma app" inpaketerad så att den kan ligga i App Store.

---

## Översikt – så här hänger det ihop

1. **Förbered på Macen** – installera verktyg, bygg iOS-projektet (gratis)
2. **Testa på iPhone** – kör appen på telefonen (gratis, men "går ut" efter 7 dagar)
3. **Skaffa Apple Developer Program** – 99 USD/år (krävs för App Store)
4. **Fyll i bank + skatt** – krävs för att få ta betalt
5. **Skapa appen i App Store Connect** – namn, ikon, skärmbilder, pris 20 kr
6. **Ladda upp och skicka för granskning** – Apple godkänner, sedan är den till salu

⚠️ **Viktigt:** Man måste vara **18 år** för ett Apple Developer-konto och betalavtalet.
**Du (Victor) står som kontoägare** – din son är "utvecklaren bakom appen".

---

## Steg 1 – Förbered på Macen (engångsjobb, gratis)

Öppna programmet **Terminal** på Macen och kör kommandona ett i taget.

1. **Installera Xcode** från App Store (stort program, ta i god tid). Öppna det en gång så det
   installerar färdigt, och kör sedan:
   ```bash
   xcode-select --install
   ```
2. **Installera Node.js** (om ni inte har det): ladda ner LTS-versionen från https://nodejs.org
3. **Hämta koden** och gå in i mappen:
   ```bash
   git clone https://github.com/gillmania/hockey-gear.git
   cd hockey-gear
   ```
4. **Installera och bygg iOS-projektet:**
   ```bash
   npm install
   npm run copy-web        # kopierar webbappen till www/
   npx cap add ios         # skapar iOS-appen (görs en gång)
   npx cap sync ios
   npx cap open ios        # öppnar projektet i Xcode
   ```

Nu är Xcode öppet med er app. 🎉

---

## Steg 2 – Testa på din sons iPhone (gratis)

1. Koppla iPhone till Macen med kabel.
2. I Xcode: klicka på projektet **App** högst upp till vänster → fliken **Signing & Capabilities**.
3. Bocka i **Automatically manage signing** och välj **Team** = ditt personliga Apple-ID
   (logga in om det behövs – ett vanligt gratis Apple-ID räcker här).
4. Välj din iPhone högst upp (där det står enhet) och tryck på **▶ Play**.
5. Första gången måste du på telefonen godkänna utvecklaren:
   **Inställningar → Allmänt → VPN och enhetshantering → lita på din e-post**.

Nu kör appen som en riktig app! Med gratis-ID måste den installeras om ungefär **var 7:e dag**.
För att den ska ligga kvar permanent och kunna säljas behövs steg 3.

---

## Steg 3 – Apple Developer Program (99 USD/år)

1. Gå till https://developer.apple.com/programs och tryck **Enroll**.
2. Logga in med **ditt** Apple-ID (vuxen). Välj **Individual/Sole Proprietor** (enklast).
3. Betala 99 USD. Godkännandet tar oftast några timmar till ett par dagar.

---

## Steg 4 – Bank och skatt (för att få ta betalt)

I https://appstoreconnect.apple.com under **Business / Agreements, Tax, and Banking**:

1. Skriv på **Paid Apps**-avtalet.
2. Fyll i **bankkonto** (dit Apple betalar ut).
3. Fyll i skatteformulär: som svensk fyller du i **W-8BEN** (gör att USA inte drar extra skatt).
4. Ansök gärna om **App Store Small Business Program** → Apple tar då **15 %** istället för 30 %.

> 💰 På ett 20-kronorsköp får ni ungefär **12–13 kr** kvar (efter moms och Apples andel).
> Tänk på att intäkter kan vara skattepliktiga – fråga vid behov hur det funkar för en hobby.

---

## Steg 5 – Skapa appen i App Store Connect

1. **Bundle ID:** i Developer-portalen → Certificates, Identifiers & Profiles → Identifiers →
   registrera `com.gillmania.hockeygear` (samma som i `capacitor.config.json`).
2. I App Store Connect → **Apps → +** → skapa appen:
   - **Namn:** Min Hockeyutrustning
   - **Språk:** Svenska
   - **Bundle ID:** det du nyss skapade
3. Fyll i appens sida:
   - **Beskrivning** (vad appen gör)
   - **Ikon** – 1024×1024 px (se "Ikon & skärmbilder" nedan)
   - **Skärmbilder** – ta bilder i appen på iPhone (krävs, minst för en skärmstorlek)
   - **Åldersgräns** – fyll i frågorna (appen har inget olämpligt → låg gräns)
   - **Integritet (Privacy):** välj **"Data Not Collected"** – ni samlar ingen data, allt sparas
     bara lokalt på telefonen. Ange en **support-URL** (t.ex. er GitHub Pages-länk).

---

## Steg 6 – Sätt priset till ~20 kr

I appens sida → **Pricing and Availability** → välj prisnivån närmast **19–20 kr**.
(Apple har fasta prisnivåer; det finns en runt 19 kr.)

---

## Steg 7 – Bygg, ladda upp, skicka in

1. I Xcode: välj enhet **"Any iOS Device (arm64)"** högst upp.
2. Meny: **Product → Archive**. När arkivet är klart öppnas Organizer.
3. Tryck **Distribute App → App Store Connect → Upload**.
4. Tillbaka i App Store Connect: välj den uppladdade versionen på appens sida och tryck
   **Submit for Review**.
5. Apple granskar (oftast 1–3 dagar). När den godkänns blir den **till salu**! 🎉

---

## Senare: göra en uppdatering

När ni ändrat något i koden:
```bash
git pull                 # hämta senaste koden
npm run ios:sync         # kopierar webben + synkar iOS
npx cap open ios
```
Höj **versionsnumret** i Xcode (t.ex. 1.0 → 1.1), gör **Archive** och ladda upp igen.

---

## Ikon & skärmbilder

- **Ikon:** App Store kräver en riktig bild på **1024×1024 px** (emoji-ikonen räcker inte).
  Enklast: be om hjälp att designa en, lägg den som `assets/icon.png`, installera
  `npm i -D @capacitor/assets` och kör `npx capacitor-assets generate --ios` – då skapas alla
  ikonstorlekar automatiskt.
- **Skärmbilder:** ta skärmdumpar direkt på iPhone när appen körs (knapp upp + sidoknapp).

---

## Snabb checklista

- [ ] Xcode + Node installerat på Macen
- [ ] `npm install && npm run copy-web && npx cap add ios`
- [ ] Testat på iPhone (gratis)
- [ ] Apple Developer Program betalt (99 USD/år)
- [ ] Paid Apps-avtal + bank + skatt ifyllt
- [ ] Small Business Program ansökt (15 %)
- [ ] App skapad i App Store Connect (namn, ikon, skärmbilder, integritet)
- [ ] Pris satt till ~20 kr
- [ ] Archive → Upload → Submit for Review
