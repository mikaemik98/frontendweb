## Tehtävä 6 – Kirjautumistesti krypatuilla tunnuksilla

Testitiedosto: `tests/tehtava6/browser_demo6.robot`  
Tulokset: `outputs/logkrypt.html`

### Mitä testattiin

Kirjautuminen HealthDiary-sovellukseen käyttäen CryptoLibraryllä kryptattuja tunnuksia.

### Tulos

1/1 testiä läpäisty.

### Avainparin generointi
```bash
python -m CryptoLibrary
```

Valitse: `Open config` → `Configure key pair` → `Generate key pair`

Luo kolme tiedostoa:
- `public_key.key` — julkinen avain (salaamiseen)
- `private_key.json` — yksityinen avain (purkamiseen, AES-salattu)
- `password_hash.json` — yksityisen avaimen suojaava salasana

### Tunnusten salaaminen
```bash
python -m CryptoClient
```

Valitse: `Encrypt` → syötä salattava teksti → kopioi `crypt:...`-arvo testitiedostoon.

### Havainnot

- `variable_decryption=True` Library-määrittelyssä purkaa `crypt:...`-muuttujat automaattisesti
- Avaintiedostot lisätty `.gitignore`-tiedostoon — ne eivät saa päätyä versionhallintaan
- Ilman yksityistä avainta kryptattuja arvoja ei voi purkaa