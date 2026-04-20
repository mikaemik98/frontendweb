*** Settings ***
Library    RequestsLibrary
Library    Collections

*** Variables ***
${BASE_URL}    http://localhost:3000
${USERNAME}    robot
${PASSWORD}    robot1234

*** Test Cases ***

Kirjautuminen palauttaa tokenin
    [Documentation]    POST /api/auth/login palauttaa JWT-tokenin
    ${body}=    Create Dictionary    username=${USERNAME}    password=${PASSWORD}
    ${response}=    POST    ${BASE_URL}/api/auth/login    json=${body}
    Should Be Equal As Integers    ${response.status_code}    200
    ${token}=    Get From Dictionary    ${response.json()}    token
    Should Not Be Empty    ${token}
    Set Suite Variable    ${TOKEN}    ${token}

Hae merkinnät vaatii kirjautumisen
    [Documentation]    GET /api/entries ilman tokenia palauttaa 401
    ${response}=    GET    ${BASE_URL}/api/entries    expected_status=any
    Should Be Equal As Integers    ${response.status_code}    401

Hae merkinnät tokenilla
    [Documentation]    GET /api/entries tokenilla palauttaa merkinnät
    ${headers}=    Create Dictionary    Authorization=Bearer ${TOKEN}
    ${response}=    GET    ${BASE_URL}/api/entries    headers=${headers}
    Should Be Equal As Integers    ${response.status_code}    200

Lisää uusi merkintä
    [Documentation]    POST /api/entries lisää uuden merkinnän
    ${headers}=    Create Dictionary    Authorization=Bearer ${TOKEN}
    ${body}=    Create Dictionary
    ...    entry_date=2025-06-15
    ...    mood=Hyvä
    ...    weight=${75}
    ...    sleep_hours=${8}
    ...    notes=Robot Framework API testi
    ${response}=    POST    ${BASE_URL}/api/entries    json=${body}    headers=${headers}
    Should Be Equal As Integers    ${response.status_code}    201
    ${entry_id}=    Get From Dictionary    ${response.json()}    entry_id
    Set Suite Variable    ${ENTRY_ID}    ${entry_id}

Poista merkintä
    [Documentation]    DELETE /api/entries/:id poistaa merkinnän
    ${headers}=    Create Dictionary    Authorization=Bearer ${TOKEN}
    ${response}=    DELETE    ${BASE_URL}/api/entries/${ENTRY_ID}    headers=${headers}
    Should Be Equal As Integers    ${response.status_code}    200