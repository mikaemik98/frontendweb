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

export {getItems};
