## Tehtävä 7 – Testitulosten ohjaaminen outputs/-kansioon

Tulokset: [outputs/](../../outputs/)

### Mitä tehtiin

Testien loki- ja raporttitiedostot ohjattiin erillisiin tehtäväkohtaisiin kansioihin `--outputdir`-lipulla.

### Ajaminen

```bash
robot --outputdir outputs/tehtava3 tests/tehtava3/browser_demo3.robot
robot --outputdir outputs/tehtava4 tests/tehtava4/browser_demo4.robot
robot --outputdir outputs/tehtava5 tests/tehtava5/browser_demo5.robot
robot --outputdir outputs/tehtava6 tests/tehtava6/browser_demo6.robot
```

### Havainnot

- `--outputdir` ohjaa `log.html`, `report.html` ja `output.xml` haluttuun kansioon
- Tehtäväkohtaiset alikansiot pitävät tulokset selkeästi erillään

---

## Tehtävä 8 – GitHub Pages -sivusto

Sivusto: [https://mikaemik98.github.io/frontendweb/](https://mikaemik98.github.io/frontendweb/)  
Sivuston lähde: [docs/](../../docs/)

### Mitä tehtiin

Projektin testiraportit julkaistiin GitHub Pages -sivustolla. `docs/`-kansioon luotiin `index.html` joka linkittää kaikkiin tehtäväkohtaisiin loki- ja raporttitiedostoihin.

### Rakenne
docs/
├── index.html
├── tehtava3/
│   ├── log.html
│   └── report.html
├── tehtava4/
│   ├── log.html
│   └── report.html
├── tehtava5/
│   ├── log.html
│   └── report.html
└── tehtava6/
├── log.html
└── report.html

### Havainnot

- GitHub Pages aktivoitiin Settings → Pages → Branch: main, kansio: /docs
- Raportit kopioitiin `outputs/`-kansiosta `docs/`-kansioon tehtäväkohtaisiin alikansioihin
- `index.html` toimii hakemistosivuna josta pääsee kaikkiin raportteihin