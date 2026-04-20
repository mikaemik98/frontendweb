## Tehtävä 9 – Taustapalvelimen API-testaus

Testitiedosto: [api_tests.robot](../tehtava9/api_tests.robot)  
Tulokset: [log.html](../../outputs/tehtava9/log.html)

### Mitä testattiin

HealthDiary-backendin REST API `http://localhost:3000`:

| Testi | Endpoint | Metodi |
|---|---|---|
| Kirjautuminen palauttaa tokenin | /api/auth/login | POST |
| Hae merkinnät vaatii kirjautumisen | /api/entries | GET |
| Hae merkinnät tokenilla | /api/entries | GET |
| Lisää uusi merkintä | /api/entries | POST |
| Poista merkintä | /api/entries/:id | DELETE |

### Tulos

5/5 testiä läpäisty.

### Havainnot

- `RequestsLibrary` sopii hyvin REST API -testaukseen — ei tarvita selainta
- JWT-token haetaan login-testissä ja tallennetaan `Set Suite Variable`:lla muiden testien käyttöön
- Testit ajetaan järjestyksessä: login → GET ilman tokenia → GET tokenilla → POST → DELETE
- `entry_id` saadaan POST-vastauksen JSON-bodystä ja käytetään DELETE-testissä