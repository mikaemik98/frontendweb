Esimerkkejä Robot Framework testeistä, resurssitiedostoista, generoiduista lokitiedoista ja raporteista.

## Sisäänkirjautuminen
- [login.robot](./login.robot) - Sisäänkirjautumisen testaaminen
- [login_variables.resource](./login_variables.resource) - Sisäänkirjautumisen testaamisessa käytettävät tunnuksiset ja salasanat
## Selaimen käyttö
- [browser_demo.robot](./browser_demo.robot) - Esimerkki Browser Libraryn käytöstä
- [moodle.robot](./moodle.robot) - Esimerkki miten kirjaudutaan Metropolian Moodle-palvelimelle
- [Keywords.robot](./Keywords.robot) - Moodle-esimerkissä käytetyt käyttäjätunnus ja salasana (eivät ole oikeat)
## Ympäristömuuttujien käyttö
- [env_demo.robot](./env_demo.robot) - Esimerkki järjestelmän ympäristömuuttujien käytöstä
- [load_end.py](./load_end.py) - `env_demo.robot` testin käyttämä Python-koodi
## REST API esimerkit
- [requests_demo1.robot](./requests_demo1.robot) - Ensimmäinen yksinkertainen REST API testi, joka käyttää https://jsonplaceholder.typicode.com -testauspalvelinta
- [requests_demo2.robot](./requests_demo2.robot) - Toinen yksinkertainen REST API testi, joka myös käyttää  https://jsonplaceholder.typicode.com -testauspalvelinta
- [requests_demo3.robot](./requests_demo3.robot) - Kolmas REST API testi, missä otetaan yhteys https://restful-booker.herokuapp.com -esimerkkipalvelimille
## CryptoLibrary
- [crypto_demo.robot](./crypto_demo.robot) - Esimerkki CryptoLibraryn käytöstä


## Tehtävä 3 – Web Form -testaus
- [browser_demo3.robot](./tehtava3/browser_demo3.robot) - Browser Library -testit Seleniumin web-form-esimerkkisivulle
- Testattuja elementtejä: dropdown (select), datalist, file input, checkboxit, radio buttonit, color picker, date picker, range slider
- Tulokset: [log.html](../outputs/tehtava3/log.html) | [report.html](../outputs/tehtava3/report.html)
- Tulos: 9/9 PASS

## Tehtävä 4 – Oman sovelluksen UI-testaus
- [browser_demo4.robot](./tehtava4/browser_demo4.robot) - Uuden päiväkirjamerkinnän lisääminen HealthDiary-sovelluksessa
- Tulokset: [log.html](../outputs/tehtava4/log.html) | [report.html](../outputs/tehtava4/report.html)
- Tulos: 1/1 PASS

## Tehtävä 5 – Kirjautuminen .env-tunnuksilla
- [browser_demo5.robot](./tehtava5/browser_demo5.robot) - Kirjautumistesti joka lukee tunnukset `.env`-tiedostosta
- Tulokset: [log.html](../outputs/tehtava5/log.html) | [report.html](../outputs/tehtava5/report.html)
- Tulos: 1/1 PASS

## Tehtävä 6 – Kirjautuminen krypatuilla tunnuksilla
- [browser_demo6.robot](./tehtava6/browser_demo6.robot) - Kirjautumistesti CryptoLibraryllä krypatuilla tunnuksilla
- Tulokset: [log.html](../outputs/tehtava6/log.html) | [report.html](../outputs/tehtava6/report.html)
- Tulos: 1/1 PASS

## Tehtävä 7 – Testitulosten ohjaus outputs/-kansioon
- Kaikki testit ajetaan `--outputdir outputs/tehtavaX` -lipulla
- Tulokset tallentuvat tehtäväkohtaisiin alikansioihin

## Tehtävä 8 – GitHub Pages
- Testiraportit luettavissa: [https://mikaemik98.github.io/hyte-projekti/](https://mikaemik98.github.io/hyte-projekti/)
- Sivuston lähde: [docs/](../docs/)

## Tehtävä 9 – Taustapalvelimen API-testaus
- [api_tests.robot](./tehtava9/api_tests.robot) - REST API -testit HealthDiary-backendille
- Testattuja endpointteja: `POST /api/auth/login`, `GET /api/entries`, `POST /api/entries`, `DELETE /api/entries/:id`
- Tulokset: [log.html](../outputs/tehtava9/log.html) | [report.html](../outputs/tehtava9/report.html)
- Tulos: 5/5 PASS


