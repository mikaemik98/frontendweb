*** Settings ***
Library    Browser
Library    CryptoLibrary    variable_decryption=True
Suite Setup      Run Keywords
...              New Browser    chromium    headless=False
...              AND    New Page    ${URL}
Suite Teardown   Close Browser

*** Variables ***
${URL}          http://localhost:5173/login.html
# Korvaa nämä omilla krypatuilla arvoillasi
${USERNAME}     crypt:vpdR3n4LkESELgLTT4awA6vFYag5URr03DV+OZd/KycUjBfrp8UT9K6ADc3uklRHoqPFQL0=
${PASSWORD}     crypt:PDeSxdBNQqN9qjTUXTwGTEgwgSWQmr1uC6uaf60QylyP4LFUK9sywrWJXU6KWSCp4EIZIVlYZgMh

*** Test Cases ***

Kirjautuminen krypatuilla tunnuksilla
    [Documentation]    Kirjautumistesti jossa tunnukset on kryptattu CryptoLibraryllä
    Wait For Load State    networkidle
    Fill Text    css=#login-username    ${USERNAME}
    Fill Text    css=#login-password    ${PASSWORD}
    Click    css=#login-btn
    Sleep    3s
    Take Screenshot    filename=${EXECDIR}/outputs/login_crypto.png
    ${url}=    Evaluate JavaScript    ${None}    () => window.location.href
    Should Contain    ${url}    index.html