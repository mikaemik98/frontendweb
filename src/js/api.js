import '../css/api.css';

async function getData() {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/items');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Virhe:', error);
  }
}

getData();
