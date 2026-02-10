//kirjautuminen, rekisteröinti, logout
//login onnistuu -> tallennetaan user localStorageen, pysyy kirjautuneena sivun reloadeissa

import {apiPost} from './api.js';

//LOGIN
//haetaan login button
const loginBtn = document.getElementById('login-btn');

if (loginBtn) {
  loginBtn.onclick = async () => {
    //haetaan käyttäjän syöttämät tiedot
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    //validointi enne API-kutsua
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    if (password.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }

    //lähetetään tiedot BE
    const result = await apiPost('/users/login', {
      username,
      password,
    });

    //be palauttaa {message, user}
    if (result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      //jos kirjautuminen onnistui siirrytään pääsivulle
      window.location.href = 'index.html';
    } else {
      alert('Login failed');
    }
  };
}

//REGISTER
const registerBtn = document.getElementById('register-btn');

if (registerBtn) {
  registerBtn.onclick = async () => {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    //validoi fe:ssä
    if (!username || !password) {
      alert('Please enter username and password');
      return;
    }

    if (!email.includes('@')) {
      alert('Virheellinen email');
      return;
    }

    if (password.length < 4) {
      alert('Password must be at least 4 characters');
      return;
    }

    //luodaan uusi käyttäjä
    const result = await apiPost('/users', {
      username,
      email,
      password,
    });

    if (result.message) {
      alert('Käyttäjä luotu!');

      //nollaa kentät
      document.getElementById('register-username').value = '';
      document.getElementById('register-email').value = '';
      document.getElementById('register-password').value = '';
    } else {
      alert(result.error || 'Register failed');
    }
  };
}

/* // tarkistaa onko käyttäjä kirjautunut
const user = localStorage.getItem('user');

if (!user) {
  window.location.href = 'login.html';
} */

//logout button toiminto
//poistetaan localStorage ja ohjataan login-sivulle
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  logoutBtn.onclick = () => {
    const confirmedLogout = confirm('Halautko varmasti kirjautua ulos?');
    if (!confirmedLogout) return;
    //poistetaan käyttäjä locaclstoragesta
    localStorage.removeItem('user');
    //siirrytään login sivulle
    window.location.href = 'login.html';
  };
}
