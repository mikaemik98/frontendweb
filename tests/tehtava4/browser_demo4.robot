*** Settings ***
Library    Browser
Suite Setup      Run Keywords
...              New Browser    chromium    headless=False
...              AND    New Page    ${URL}
Suite Teardown   Close Browser

*** Variables ***
${URL}        http://localhost:5173/login.html
${USERNAME}   robot
${PASSWORD}   robot1234

*** Keywords ***

Kirjaudu sisään
    Wait For Load State    networkidle
    Fill Text    css=#login-username    ${USERNAME}
    Fill Text    css=#login-password    ${PASSWORD}
    Click    css=#login-btn
    Sleep    5s
    Take Screenshot    filename=${EXECDIR}/outputs/tehtava4/after_login.png
    Wait For Load State    networkidle

Navigoi päiväkirjaan
    Evaluate JavaScript    ${None}    () => window.location.href = '/entries.html'
    Sleep    5s
    Take Screenshot    filename=${EXECDIR}/outputs/tehtava4/after_nav.png
    Wait For Load State    networkidle

*** Test Cases ***

Uuden päiväkirjamerkinnän lisääminen
    [Documentation]    Testaa uuden merkinnän luominen täyttämällä kaikki lomakekentät
    Kirjaudu sisään
    Navigoi päiväkirjaan

    Take Screenshot    filename=${EXECDIR}/outputs/tehtava4/before_add.png

    Click    css=#add-entry-btn
    Sleep    1s

    Fill Text    css=#entry-date      2025-06-15
    Fill Text    css=#entry-mood      Hyvä
    Fill Text    css=#entry-weight    75
    Fill Text    css=#entry-sleep     8
    Fill Text    css=#entry-notes     Automaattitesti - Robot Framework

    Click    css=#save-entry
    Sleep    2s

    Take Screenshot    filename=${EXECDIR}/outputs/entry_saved.png

    ${content}=    Evaluate JavaScript    ${None}    () => document.body.innerText
    Should Contain    ${content}    Hyvä