*** Settings ***
Library     Browser    auto_closing_level=KEEP

*** Variables ***
${URL}       http://localhost:5173/login.html
${USER}      mikael
${PASS}      salasana123

*** Test Cases ***
Login Onnistuu
  [Documentation]    Testaa, että käyttäjä pystyy kirjautumaan onnistuneesti
  New Browser    chromium    headless=No
  New Page       ${URL}
  Fill Text      id=login-username    ${USER}
  Fill Text      id=login-password    ${PASS}
  Click          id=login-btn
  Click with Options   "Kirjaudu"   delay= 5 s