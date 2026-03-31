## Tehtävä 4 – Browser Library: Oman sovelluksen testaus

Testitiedosto: `tests/tehtava4/browser_demo4.robot`  
Tulokset: `outputs/logdiary.html`

### Mitä testattiin

Uuden päiväkirjamerkinnän luominen HealthDiary-sovelluksessa:
kirjautuminen sisään, navigointi Diary-sivulle ja merkintälomakkeen täyttö (päivämäärä, mieliala, paino, unitunnit, muistiinpanot) sekä tallennus.

### Tulos

1/1 testiä läpäisty.

### Havainnot

- Sovellus käyttää JWT-tokenia sessionStoragessa — `Go To` -navigointi kirjasi ulos koska token ei siirtynyt. Ratkaisu: `window.location.href`-navigointi JS:llä säilyttää sessionStoragen
- `Wait For URL` ja `Wait For Condition` eivät kuulu Browser Libraryyn odotetussa muodossa — päädyttiin `Sleep` + `Wait For Load State networkidle` -yhdistelmään
- Sovelluksen oikea portti oli 5173 (Vite dev server), ei 3000 (Express backend)
- Lomakkeen kenttärakenne selvitettiin debug-testillä ennen varsinaista testiä