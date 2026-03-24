# Robot framework tehtävä2: Login onnistuu

# Report.html löytyy projektin juuresta

### Tavoite:
Testaa, että käyttäjä pystyy kirjautumaan päiväkirja-sovellukseen.

### Kirjastot:
Browser

### Muuttujat:
- ${URL} - login-sivun osoite (http://localhost:5173/login.html)
- ${USER} - käyttäjänimi (mikael)
- ${PASS} - salasana(salasana123)

### Testin vaiheet:
1. Avaa Chromium-selain näkyvissä (headless=No)
2. Avaa login-sivu
3. Täytä käyttäjänimi ja salasana
4. Klikkaa "Kirjaudu" nappia
5. Odota hetki... nähdään kirjautumisen tapahtuvan

### Testin ajaminen:
```
robot tests/tehtava2/browser_demo2.robot

```