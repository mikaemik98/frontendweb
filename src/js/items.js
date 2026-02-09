import {fetchData} from './fetch.js';

// Render Item in a List in the UI
////////////
const renderFruitList = (items) => {
  console.log('Teen kohta listan');
  //Haetaan fruitlist UL
  const fruitList = document.querySelector('.fruitlist');
  fruitList.innerHTML = '';
  //lisätään loopissa kaikki yksittäiset
  //hedelmät listaan
  items.forEach((item) => {
    let li = document.createElement('li');
    li.textContent = `Hedelmän id ${item.id} ja nimi ${item.name}`;
    fruitList.appendChild(li);
  });
};

// GET items
////////////

const getItems = async () => {
  const items = await fetchData('http://127.0.0.1:3000/api/items');
  //jos back-end puolelta tulee virhe niin informoidaan
  //joko consoleen tai käyttäjälle virheestä
  if (items.error) {
    console.log(items.error);
    return;
  }

  //tai jatketaan ja tehdään datalle jotain
  /* items.forEach((item) => {
    console.log(item.name);
  }); */

  renderFruitList(items);
};

//GET item by id
//haetaan itemi id:n perusteella
const getItemById = async (event) => {
  console.log('Tomii');

  event.preventDefault();

  //const idInput = document.getElementById('itemId');
  const idInput = document.querySelector('#itemId');
  const itemId = idInput.value;
  console.log(itemId);

  const url = `http://127.0.0.1:3000/api/items/${itemId}`;

  const options = {
    method: 'GET',
  };

  const item = await fetchData(url, options);
  //jos back-end puolelta tulee virhe niin informoidaan
  //joko consoleen tai käyttäjälle virheestä
  if (item.error) {
    console.log(item.error);
    return;
  }

  console.log(item);
  alert(`Item found! ${item.name}`);
};

//DELETE item by id
//haetaan itemi id:n perusteella
const deleteItemById = async () => {
  console.log('Deletoidaan IDn avulla');

  const idInput = document.querySelector('#itemId');
  const itemId = idInput.value;
  console.log(itemId);

  //muista usein tarkistaa, että käyttäjä lähettää oikean datan
  if (!itemId) {
    console.log('Item ID missing, fill in the details.');
    return;
  }

  const confirmed = confirm(
    `Oletko varma, että haluan poistaa itemin: ${itemId}`
  );
  // jos käyttäjä painaa cancel niin palautuu FALSE ja hypätään pois
  if (!confirmed) return;

  const url = `http://127.0.0.1:3000/api/items/${itemId}`;

  const options = {
    method: 'DELETE',
  };

  const item = await fetchData(url, options);
  if (item.error) {
    console.log(item.error);
    return;
  }

  console.log(item);
  alert(`${item.message}`);
  // päivitä ui niin käyttäjä tietää, että itemi poistui
  await getItems();
};

//POST item
//haetaan itemi id:n perusteella
const addItem = async (event) => {
  event.preventDefault();

  const form = document.querySelector('add-item-form');
  const fruitName = document.querySelector('#newItemName').value.trim();
  const fruitWeight = document.querySelector('#newItemWeight').value.trim();

  if (!fruitName) {
    alert('Nimi puuttuu!');
    return;
  }

  const body = {};

  //const idInput = document.getElementById('itemId');
  const idInput = document.querySelector('#itemId');
  const itemId = idInput.value;
  console.log(itemId);

  const url = `http://127.0.0.1:3000/api/items/`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: fruitName,
      weight: fruitWeight,
    }),
  };

  console.log(url, options);

  const response = await fetchData(url, options);
  if (response.error) {
    console.log(response.error);
    return;
  }

  console.log(response);
};

export {getItems, getItemById, deleteItemById, addItem};
