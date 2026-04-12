## Tehtävä 3 – Browser Library: Web Form -testaus

Testitiedosto: `tests/tehtava3/browser_demo3.robot`  
Tulokset: `outputs/log.html`

### Mitä testattiin

Seleniumin web-form-esimerkkisivu (https://www.selenium.dev/selenium/web/web-form.html):
dropdown (select), datalist, file input, checkboxit, radio buttonit, color picker, date picker, range slider ja lomakkeen kokonaislähetys.

### Tulos

9/9 testiä läpäisty.

### Havainnot

- Sivun todelliset ID:t (`my-check-1`, `my-radio-1` jne.) paljastuivat vasta debug-testillä — oletetut ID:t olivat väärin
- Checkboxit ja radio buttonit vaativat `Evaluate JavaScript` + `document.querySelector()` -lähestymistavan, koska Browser Libraryn omat locatorit eivät löytäneet elementtejä
- Range-sliderin max-arvo oli `10`, ei `100`
- `New Page` per testi aiheutti ongelmia — korjattiin avaamalla sivu kerran Suite Setupissa ja navigoimalla `Go To`:lla