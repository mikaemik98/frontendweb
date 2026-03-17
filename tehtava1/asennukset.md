# Tehtävä 1

## Tämän markdown tiedoston tekemisessä on hyödynnetty claude sonnet 4.6 käyttöä tekstin jäsentelyssä

# Asennukset

## Työkalut

| Työkalu | Versio |
|---|---|
| Robot Framework | 7.4.2 |
| Browser Library | 19.12.5 |
| Requests Library | 2.32.5 |
| CryptoLibrary | 0.4.2 |
| Robotidy | 4.18.0 |

## Asennusvaiheet

### 1. Virtuaaliympäristö
```bash
python -m venv .venv
.venv\Scripts\activate  # Windows
```

### 2. pip päivitys
```bash
python -m pip install --upgrade pip
```

### 3. Kirjastojen asennus
```bash
pip install robotframework
pip install robotframework-browser
rfbrowser init
pip install robotframework-requests
pip install --upgrade robotframework-crypto
pip install robotframework-tidy
```

### 4. Asennusten tarkistus

Ajettiin `asennustesti.py`, jonka tuloste:
```
Python: 3.11.5
Robot Framework: 7.4.2
Browser: 19.12.5
requests: 2.32.5
CryptoLibrary: 0.4.2
```