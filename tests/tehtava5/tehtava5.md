## Tehtävä 5 – Kirjautumistesti .env-tunnuksilla

[Testiraportti](../../outputs/logdotenv.html)
[Testitiedosto](browser_demo5.robot)

Testitiedosto: `tests/tehtava5/browser_demo5.robot`  
Tulokset: `outputs/logdotenv.html`

### Mitä testattiin

Kirjautuminen HealthDiary-sovellukseen käyttäen `.env`-tiedostoon piilotettuja tunnuksia.

### Tulos

1/1 testiä läpäisty.

### Havainnot

- `Get Environment Variable` lukee muuttujat järjestelmän ympäristöstä, ei `.env`-tiedostosta suoraan
- `Run Process` + `python-dotenv` ei toiminut koska Python-prosessi on erillinen — sen asettamat muuttujat eivät näy Robot Frameworkin prosessissa
- Ratkaisu: luetaan `.env`-tiedosto suoraan `OperatingSystem`-kirjaston `Get File`:llä ja jäsennetään avain-arvoparit Robot Frameworkin `FOR`-loopilla
- `.env` lisätty `.gitignore`-tiedostoon jotta tunnukset eivät päädy versionhallintaan