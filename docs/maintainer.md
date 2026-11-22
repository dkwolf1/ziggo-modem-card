# Onderhoud en publicatie

## GitHub-instellingen

1. **Settings → General.** Houd de repo openbaar als je distributie via Marketplace aanbiedt. Schakel **Issues** in en vul via **About** een korte beschrijving en onderwerpen in, bijvoorbeeld `home-assistant`, `lovelace` en `dashboard-card`. Deze gegevens tellen mee voor de algemene catalogus. [Catalogusvereisten](https://contributors.home-assistant.io/marketplace/guides/catalog/)
2. **Settings → Advanced Security.** Schakel waar beschikbaar **Dependabot alerts**, **Dependabot security updates**, **Secret scanning**, **Push protection**, **Private vulnerability reporting** en **Code scanning** met de standaardinstellingen in. Controleer of de dependency graph actief is. De versie-updates voor npm en Actions staan al in de repository. [GitHub-beveiligingsinstellingen](https://docs.github.com/en/code-security/getting-started/quickstart-for-securing-your-repository) · [Privé meldingen inschakelen](https://docs.github.com/en/code-security/how-tos/report-and-fix-vulnerabilities/configure-vulnerability-reporting/configure-for-a-repository)
3. **Settings → Actions → General.** Gebruik standaard alleen leesrechten voor `GITHUB_TOKEN`. Laat Actions geen pull requests aanmaken of goedkeuren. Vereis volledige commit-SHA's voor acties als de instelling beschikbaar is. Bij een actielijst hebben `actions/checkout`, `actions/setup-node` en `hacs/action` toegang nodig. [GitHub Actions-instellingen](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository)
4. **Settings → Rules → Rulesets.** Bescherm `main` tegen force pushes en verwijderen. Vereis voor toekomstige wijzigingen een pull request en de statuschecks **Quality checks** en **Marketplace validation** zodra die op GitHub zijn verschenen. Laat het aantal verplichte reviewers op nul als je de enige beheerder bent. Voeg zo nodig extra verplichte checks toe nadat hun namen op GitHub zijn verschenen. [GitHub-rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/available-rules-for-rulesets)

De workflow verwijst naar volledige commit-SHA's. De officiële Marketplace-validator verwijst intern naar de Docker-tag `main`; die container kan daardoor alsnog wijzigen. [Action-definitie](https://github.com/hacs/action/blob/1ebf01c408f29afcb6406bd431bc98fd8cbb15aa/action.yml)

## Licentie

De bestaande [Mozilla Public License 2.0](../LICENSE) dekt de kaartcode. De JavaScript-module is de bewerkbare bron en vermeldt de licentie met een SPDX-aanduiding. Behoud het licentiebestand en bestaande licentievermeldingen bij distributie. Controleer vóór publicatie of je de meegeleverde WebP-modemillustratie en de screenshot waarin die voorkomt mag verspreiden. Een licentie voor je code verleent op zichzelf geen rechten op materiaal van derden. [Mozilla MPL 2.0 FAQ](https://www.mozilla.org/en-US/MPL/2.0/FAQ/)

## GitHub-release en Marketplace

1. Push de commit en wacht tot **Quality checks** en **Marketplace validation** groen zijn. Bekijk de uitkomst via het tabblad **Actions**.
2. Test in Home Assistant 2026.11 of nieuwer via **Instellingen → Marketplace → Toevoegen via link**. Controleer of de afbeelding bij de geïnstalleerde kaart geladen wordt en test de diagnostiek en grafiek met eigen sensoren.
3. Publiceer een volledige GitHub-release wanneer je een versie wilt uitbrengen. Gebruik een ongebruikte versietag. De module en WebP staan samen in `dist/` in de bronbestanden van die versie. Voeg je losse releasebijlagen toe, plaats dan de JavaScript-module en de WebP allebei in dezelfde release. [Marketplace-handleiding voor dashboardkaarten](https://contributors.home-assistant.io/marketplace/guides/dashboard/)
4. Wil je dat iedereen de kaart kan vinden via de standaardcatalogus, dien dan na een groene validatierun en een volledige release de kaart in bij de categorie `plugin`. [Catalogusindiening](https://contributors.home-assistant.io/marketplace/guides/catalog/)
