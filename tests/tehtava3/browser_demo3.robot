*** Settings ***
Library    Browser
Library    OperatingSystem
Suite Setup      Run Keywords
...              New Browser    chromium    headless=False
...              AND    New Page    ${URL}
Suite Teardown   Close Browser
Test Setup       Go To    ${URL}

*** Variables ***
${URL}    https://www.selenium.dev/selenium/web/web-form.html

*** Test Cases ***

Dropdown Select -kentän testaus
    Select Options By    select[name="my-select"]    value    1
    ${selected}=    Get Selected Options    select[name="my-select"]    label
    Should Be Equal    ${selected}[0]    One
    Select Options By    select[name="my-select"]    label    Two
    ${selected2}=    Get Selected Options    select[name="my-select"]    label
    Should Be Equal    ${selected2}[0]    Two

Dropdown Datalist -kentän testaus
    Fill Text    input[name="my-datalist"]    New York
    ${value}=    Get Property    input[name="my-datalist"]    value
    Should Be Equal    ${value}    New York

File Input -kentän testaus
    Create File    ${EXECDIR}/outputs/test_upload.txt    Robot Framework test file content
    ${type}=    Get Property    input[name="my-file"]    type
    Should Be Equal    ${type}    file
    Upload File By Selector    input[name="my-file"]    ${EXECDIR}/outputs/test_upload.txt

Checkbox-kenttien testaus
    # KORJAUS: oikeat ID:t my-check-1 ja my-check-2 (viiva välissä)
    ${check1_initial}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('#my-check-1').checked
    Should Be True    ${check1_initial}
    ${check2_initial}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('#my-check-2').checked
    Should Not Be True    ${check2_initial}
    Evaluate JavaScript    ${None}    () => document.querySelector('#my-check-2').click()
    ${check2_after}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('#my-check-2').checked
    Should Be True    ${check2_after}
    Evaluate JavaScript    ${None}    () => document.querySelector('#my-check-1').click()
    ${check1_after}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('#my-check-1').checked
    Should Not Be True    ${check1_after}

Radio Button -kenttien testaus
    # KORJAUS: my-radio-1 on oletuksena checked, ei my-radio-2
    ${radio1_initial}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('#my-radio-1').checked
    Should Be True    ${radio1_initial}
    Evaluate JavaScript    ${None}    () => document.querySelector('#my-radio-2').click()
    ${radio2_after}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('#my-radio-2').checked
    Should Be True    ${radio2_after}
    ${radio1_after}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('#my-radio-1').checked
    Should Not Be True    ${radio1_after}

Color Picker -kentän testaus
    ${default_color}=    Get Property    input[name="my-colors"]    value
    Should Be Equal    ${default_color}    \#563d7c
    Evaluate JavaScript    ${None}
    ...    () => { let el = document.querySelector('input[name="my-colors"]'); el.value = '#ff5733'; el.dispatchEvent(new Event('change')); }
    ${new_color}=    Get Property    input[name="my-colors"]    value
    Should Be Equal    ${new_color}    \#ff5733

Date Picker -kentän testaus
    Fill Text    input[name="my-date"]    2025-06-15
    ${date_value}=    Get Property    input[name="my-date"]    value
    Should Be Equal    ${date_value}    2025-06-15

Range Slider -kentän testaus
    # KORJAUS: max on 10 joten käytetään arvoa 8
    ${default_range}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('input[type="range"]').value
    Should Be Equal    ${default_range}    5
    Evaluate JavaScript    ${None}
    ...    () => { let el = document.querySelector('input[type="range"]'); el.value = '8'; el.dispatchEvent(new Event('input')); el.dispatchEvent(new Event('change')); }
    ${new_range}=    Evaluate JavaScript    ${None}
    ...    () => document.querySelector('input[type="range"]').value
    Should Be Equal    ${new_range}    8

Lomakkeen kokonaislähetys kaikkine kenttineen
    Fill Text    input[name="my-text"]         RobotFramework Testi
    Fill Text    input[name="my-password"]     SalainenSana123
    Fill Text    textarea[name="my-textarea"]  Automaattisesti täytetty kenttä.
    Select Options By    select[name="my-select"]    label    Three
    Fill Text    input[name="my-datalist"]    Los Angeles
    Evaluate JavaScript    ${None}    () => document.querySelector('#my-check-2').click()
    Evaluate JavaScript    ${None}    () => document.querySelector('#my-radio-2').click()
    Click    button[type="submit"]
    Wait For Elements State    text=Received!    visible    timeout=5s