# Ziggo Modem · Neon

[Nederlands](#nederlands) · [English](#english)

![Ziggo Modem · Neon in uitgebreide en compacte weergave met fictieve gegevens / Expanded and compact layouts with sample data](docs/ziggo-modem-neon.png)

## Nederlands

Een dashboardkaart voor Home Assistant die de signaalkwaliteit, verbinding en DOCSIS-metingen van je Ziggo-modem bij elkaar brengt. Open **Diagnostiek** om te zien waarom de integratie een bepaalde signaalscore geeft.

### Wat je nodig hebt

- Home Assistant met een dashboard waarop je aangepaste kaarten kunt toevoegen.
- De Ziggo Modem-integratie, geïnstalleerd en gekoppeld aan je modem. Die integratie levert de sensoren en berekent de score. [Installatiehandleiding van ha-ziggo-modem](https://github.com/dkwolf1/ha-ziggo-modem#readme)
- Voor de grafiek moet Home Assistant de downstream-SNR-sensor opnemen in Recorder.

### Installeren

#### Via Marketplace

1. Open in Home Assistant 2026.11 of nieuwer **Instellingen → Marketplace** en kies rechtsboven **Toevoegen via link** (_Add from link_).
2. Voer `https://github.com/dkwolf1/ziggo-modem-card` in. Koppel GitHub als Marketplace erom vraagt, voeg de repository toe en kies **Dashboard** als het type niet automatisch wordt herkend.
3. Open **Ziggo Modem · Neon** in Marketplace en installeer de kaart. Beheer je dashboardbronnen via YAML, gebruik dan de bron die het installatievenster toont.
4. Vernieuw de browserpagina. Open je dashboard in bewerkmodus, kies **Kaart toevoegen** en zoek naar **Ziggo Modem · Neon**.

[Home Assistant-handleiding voor Marketplace](https://www.home-assistant.io/integrations/marketplace/#custom-repositories)

#### Handmatig

1. Kopieer [`ziggo-modem-card.js`](dist/ziggo-modem-card.js) en [`ziggo-modem-device.webp`](dist/ziggo-modem-device.webp) naar dezelfde map in Home Assistant, bijvoorbeeld `/config/www/ziggo-modem-card/`. Als je de hoofdmap `www` net hebt aangemaakt, herstart Home Assistant één keer.
2. Ga naar **Instellingen → Dashboards → ⋮ → Bronnen**. Voeg `/local/ziggo-modem-card/ziggo-modem-card.js?v=1` toe als **JavaScript-module**. Zie voor bronnen die via YAML beheerd worden de Home Assistant-handleiding. [Dashboardbronnen registreren](https://contributors.home-assistant.io/frontend/custom-ui/resources/)
3. Vernieuw de browserpagina en voeg **Ziggo Modem · Neon** toe via de kaartkiezer.

Gebruik één dashboardbron voor deze kaart. Als je al een testversie uit `/local/ziggo-neon-test/` gebruikte, vervang dan die bron door de nieuwe.

### Instellen

De kaart vindt Ziggo-entiteiten automatisch via het Home Assistant-entiteitenregister. Heb je meer modems, selecteer dan het juiste **Modem/apparaat** in de kaarteditor. Daar stel je ook de weergave, taal, grafiek en **Tegels op de kaart** in. De beschikbare diagnosewaarden blijven zichtbaar in **Diagnostiek**, ook als je ze als tegel uitvinkt.

Minimale YAML voor een handmatige kaart:

```yaml
type: custom:ziggo-modem-card
```

Voorbeeld met compacte weergave en handmatige koppeling van een sensor:

```yaml
type: custom:ziggo-modem-card
layout: compact
language: nl
show_chart: true
entities:
  ds_snr: sensor.ziggo_modem_downstream_snr
```

Vervang de voorbeeld-ID door die van je eigen sensor. In de editor vind je dit onder **Geavanceerd: entiteiten handmatig koppelen**.

### De waarden lezen

| Onderdeel                  | Betekenis                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Online                     | De verbinding is actief. Je modem kan tegelijk een lagere signaalscore hebben.                                                                          |
| Signaalkwaliteit           | Score van 0 tot 100, berekend door de Ziggo Modem-integratie. **Diagnostiek** toont de reden als de sensor die doorgeeft, in de taal van de integratie. |
| Downstream SNR (dB)        | De verhouding tussen signaal en ruis, met 24 uur of 7 dagen geschiedenis uit Recorder.                                                                  |
| Download- en uploadprofiel | De ingestelde bandbreedteprofielen van het modem. Voor gemeten snelheid heb je een afzonderlijke snelheidstest nodig.                                   |

### Problemen oplossen

- **Kaart verschijnt niet.** Controleer of de dashboardbron het type **JavaScript-module** heeft. Vernieuw daarna de browserpagina. Verhoog bij een handmatige update zo nodig de versie in de bron-URL, bijvoorbeeld van `?v=1` naar `?v=2`.
- **Geen entiteiten of het verkeerde modem.** Controleer of de integratie met je modem verbonden is. Selecteer het modem in de editor of koppel de sensoren handmatig.
- **Geen SNR-geschiedenis.** Controleer in Home Assistant of de gekozen downstream-SNR-sensor geschiedenis heeft en of Recorder de sensor opneemt.
- **Geen modemafbeelding.** Bij een handmatige installatie moeten het JS-bestand en de WebP in dezelfde map staan.

### Lokaal ontwikkelen

Home Assistant laadt de kaart als JavaScript-module zonder bouwstap of npm-afhankelijkheden. Open de [demo](demo.html) via een lokale webserver om de kaart met fictieve waarden te bekijken. Start bijvoorbeeld vanuit de repository `python -m http.server --bind 127.0.0.1 8000` en open `http://127.0.0.1:8000/demo.html`. Zie de [ontwikkelhandleiding](CONTRIBUTING.md) voor linting, pre-commit en tests.

## English

A Home Assistant dashboard card that brings together your Ziggo modem's signal quality, connectivity and DOCSIS readings. Open **Diagnostics** to see why the integration gave your line its current score.

### Requirements

- Home Assistant with a dashboard that supports custom cards.
- The Ziggo Modem integration, installed and connected to your modem. The integration supplies the sensors and calculates the score. [ha-ziggo-modem installation guide](https://github.com/dkwolf1/ha-ziggo-modem#readme)
- To display the chart, Home Assistant Recorder must record the downstream SNR sensor.

### Installation

#### Using Marketplace

1. In Home Assistant 2026.11 or later, open **Settings → Marketplace** and select **Add from link** in the upper-right corner.
2. Enter `https://github.com/dkwolf1/ziggo-modem-card`. Connect GitHub if prompted, add the repository, and select **Dashboard** if Marketplace asks for the type.
3. Open **Ziggo Modem · Neon** in Marketplace and install it. If you manage dashboard resources in YAML, add the resource shown in the install dialog.
4. Reload the browser page. Edit your dashboard, choose **Add card**, and search for **Ziggo Modem · Neon**.

[Home Assistant Marketplace guide](https://www.home-assistant.io/integrations/marketplace/#custom-repositories)

#### Manual installation

1. Copy [`ziggo-modem-card.js`](dist/ziggo-modem-card.js) and [`ziggo-modem-device.webp`](dist/ziggo-modem-device.webp) into the same Home Assistant folder, for example `/config/www/ziggo-modem-card/`. If you just created the main `www` folder, restart Home Assistant once.
2. Under **Settings → Dashboards → ⋮ → Resources**, add `/local/ziggo-modem-card/ziggo-modem-card.js?v=1` as a **JavaScript module**. If you manage resources in YAML, follow the Home Assistant resource guide. [Registering dashboard resources](https://contributors.home-assistant.io/frontend/custom-ui/resources/)
3. Reload the browser page and add **Ziggo Modem · Neon** from the card picker.

Use one dashboard resource for this card. If you previously used a test version from `/local/ziggo-neon-test/`, replace that resource with the new one.

### Configuration

The card discovers Ziggo entities through the Home Assistant entity registry. If you have several modems, select the correct one under **Modem/device** in the card editor. The editor also controls the layout, language, chart, and **Tiles on the card**. Available diagnostic values remain accessible in **Diagnostics** when their tiles are hidden.

Minimal configuration for a manual card:

```yaml
type: custom:ziggo-modem-card
```

Example with a compact layout and a manually mapped sensor:

```yaml
type: custom:ziggo-modem-card
layout: compact
language: en
show_chart: true
entities:
  ds_snr: sensor.ziggo_modem_downstream_snr
```

Replace the example ID with your sensor's actual entity ID. In the editor, use **Advanced: map entity IDs**.

### Reading the values

| Item                         | Meaning                                                                                                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Online                       | The connection is active. The modem can be online while the signal score is low.                                                                                  |
| Signal quality               | A score from 0 to 100, calculated by the Ziggo Modem integration. **Diagnostics** shows the reason when the sensor supplies it, using the integration's language. |
| Downstream SNR (dB)          | The signal-to-noise ratio, with 24 hours or seven days of readings from Recorder.                                                                                 |
| Download and upload profiles | The bandwidth provisioned for your modem. A separate speed test is needed to measure throughput.                                                                  |

### Troubleshooting

- **The card doesn't appear.** Verify that the dashboard resource type is **JavaScript module** and reload the browser page. After a manual update, you can change the resource URL from `?v=1` to `?v=2` to force a fresh download.
- **No entities or the wrong modem.** Check whether the integration is connected to your modem. Select the modem in the editor or map the sensors manually.
- **No SNR history.** Check that the selected downstream SNR sensor has history in Home Assistant and that Recorder includes it.
- **The modem image is missing.** For manual installation, place the JavaScript and WebP files in the same folder.

### Local development

Home Assistant loads the card as a JavaScript module without a build step or npm dependencies. To view the [demo](demo.html) with sample data, run `python -m http.server --bind 127.0.0.1 8000` from the repository and open `http://127.0.0.1:8000/demo.html`. See the [contributing guide](CONTRIBUTING.md) for linting, pre-commit, and tests.

[MPL 2.0 license / licentie](LICENSE) · [Changelog / wijzigingslog](CHANGELOG.md)
