*** Settings ***
Library    Browser
Library    OperatingSystem
Library    String
Suite Setup      Run Keywords
...              New Browser    chromium    headless=False
...              AND    New Page    ${URL}
Suite Teardown   Close Browser

*** Variables ***
${URL}        http://localhost:5173/login.html
${Username}    crypt:vo3X+rL2c/oc6YEZpX2/UI9cCnhCnbTwNWa23KMnA2/T5U0AAEj2U9Dk752O9y2gsR/kUUjfF3RIfqOdmDgRGQ==
${Password}    crypt:Ykew9/KogtKZu+Sju2KRp4q03VK49CLiW2ADwO9YwUv0FTJXSQS18lDZh2Xxo5B7LKc4N6sohur2K5dkY0s= 
${ENV_FILE}   ${EXECDIR}/.env

*** Keywords ***

Lue tunnukset env-tiedostosta
    # Luetaan .env tiedosto rivi kerrallaan
    ${content}=    Get File    ${ENV_FILE}
    ${lines}=      Split To Lines    ${content}
    ${username}=   Set Variable    ${EMPTY}
    ${password}=   Set Variable    ${EMPTY}
    FOR    ${line}    IN    @{lines}
        ${is_user}=     Run Keyword And Return Status    Should Start With    ${line}    ROBOT_USERNAME=
        ${is_pass}=     Run Keyword And Return Status    Should Start With    ${line}    ROBOT_PASSWORD=
        IF    ${is_user}
            ${username}=    Fetch From Right    ${line}    =
        END
        IF    ${is_pass}
            ${password}=    Fetch From Right    ${line}    =
        END
    END
    RETURN    ${username}    ${password}

*** Test Cases ***

Kirjautuminen env-tunnuksilla
    [Documentation]    Kirjautumistesti joka lukee tunnukset .env-tiedostosta
    ${username}    ${password}=    Lue tunnukset env-tiedostosta
    Log    Kirjaudutaan käyttäjänä: ${username}    console=True

    Wait For Load State    networkidle
    Fill Text    css=#login-username    ${username}
    Fill Text    css=#login-password    ${password}
    Click    css=#login-btn
    Sleep    3s

    Take Screenshot    filename=${EXECDIR}/outputs/login_result.png
    ${url}=    Evaluate JavaScript    ${None}    () => window.location.href
    Should Contain    ${url}    index.html