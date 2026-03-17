## Tämän markdown tiedoston tekemisessä on hyödynnetty claude sonnet 4.6 käyttöä tekstin jäsentelyssä

# Asennukset

## Työkalut

| Työkalu | Versio |
|---|---|
| Robot Framework | 7.x |
| Browser Library | 19.x |
| Requests Library | 2.x |
| CryptoLibrary | 0.4.x |
| Robotidy | 4.x |

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
Python: 3.x.x
Robot Framework: 7.x
Browser: 19.x
requests: 2.x
CryptoLibrary: 0.4.x
```