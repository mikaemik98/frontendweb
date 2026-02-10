//import '../css/api.css';
import {getItems, getItemById, deleteItemById, addItem} from './items.js';

console.log('Skripti starttaa');

//sync a async ajatus ja demo
/* function synchronousFunction() {
  let number = 1;
  for (let i = 1; i < 1000; i++) {
    number += i;
    console.log('synchronousFunction running');
  }
  console.log('regular function complete', number);
}
synchronousFunction();

console.log('1');
console.log('2');
console.log('3');

//async suoritus
console.log('1');
setTimeout(() => {
  console.log('2');
}, 2000);

console.log('3');
 */
//GET
//eka haku ulkoiseen rajapintaan
//tämä on fetch käyttäen promisea eli lupausta
//ja ON asynkroninen
/* fetch('https://api.restful-api.dev/objects')
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error('Verkkovastaus ei ollut kunnossa');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Fetch-operaatiossa ilmeni ongelma:', error);
  });
 */
//yksinkertaistetaan ja modernisoidaan haku
//käytetään async ja await avainsanoja
/* async function getData() {
  try {
    const response = await fetch('https://api.restful-api.dev/objects');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe:', error);
  }
}
 */
//getData();

// oma kutsu omalle back-end puolelle
/* const consoleLogItems = async () => {
  try {
    //defaulttina GET kutsu
    const response = await fetch('http://127.0.0.1:3000/api/items');
    const data = await response.json();
    console.log('Haetaan omasta rajapinnasta.');
    console.log(data);

    data.forEach((rivi) => {
      console.log(rivi);
      console.log(rivi.name);
    });
  } catch (error) {
    console.error('Virhe', error);
  }
};
consoleLogItems();

getItems();

 */
//hakekaa nappula
/* const getItemsBtn = document.querySelector('.get_items');
getItemsBtn.addEventListener('click', getItems);

const getForm = document.querySelector('.get-item-form');
getForm.addEventListener('submit', getItemById);

const deleteBtn = document.querySelector('.delete-item');
deleteBtn.addEventListener('click', deleteItemById);

//etsitään formi, ei itse nappulaa ja tutkitaan SUBMIT eventiä
const addItemForm = document.querySelector('.add-item-form');
addItemForm.addEventListener('submit', addItem);
 */
//lisätkää kuuntelija ja suorittakaa klikatessa get items funktio

//siirretään varsinainen fetch omaksi geneeriseksi funktioksi

//yleinen tiedosto API-kutsuille
const BASE_URL = 'http://localhost:3000/api';

//GET (listat, yksittäiset resurssit)
export const apiGet = async (endpoint) => {
  const response = await fetch(BASE_URL + endpoint);

  //luetaan teksti ensin, be voi palauttaa HTML esim 404 jolloin JSON.parse kaatuu
  const text = await response.text();

  if (!response.ok) {
    throw new Error(
      `GET ${endpoint} failed (${response.status}) ${text.slice(0, 120)}`
    );
  }
  return JSON.parse(text);
};

//POST (login, register, uusi workout, uusi diary entry)
export const apiPost = async (endpoint, data) => {
  const response = await fetch(BASE_URL + endpoint, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data),
  });

  const text = await response.text();
  const result = text ? JSON.parse(text) : {};

  if (!response.ok) {
    throw new Error(result.error || result.message || 'API error');
  }

  return result;
};

//PUT päivitetään olemassa olevaa dataa
export const apiPut = async (endpoint, data) => {
  const response = await fetch(BASE_URL + endpoint, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

//DELETE
export const apiDelete = async (endpoint) => {
  const response = await fetch(BASE_URL + endpoint, {
    method: 'DELETE',
  });

  return await response.json();
};
