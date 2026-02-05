import {apiPost} from './api.js';

// LOGIN
const loginBtn = document.getElementById('login-btn');

if (loginBtn) {
  loginBtn.onclick = async () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const result = await apiPost('/users/login', {
      username,
      password,
    });

    if (result.user) {
      localStorage.setItem('user', JSON.stringify(result.user));
      window.location.href = 'index.html';
    } else {
      alert('Login failed');
    }
  };
}

// REGISTER
const registerBtn = document.getElementById('register-btn');

if (registerBtn) {
  registerBtn.onclick = async () => {
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    const result = await apiPost('/users', {
      username,
      email,
      password,
    });

    if (result.message) {
      alert('Käyttäjä luotu!');
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

// logout button toiminto
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  logoutBtn.onclick = () => {
    localStorage.removeItem('user');
    window.location.href = 'login.html';
  };
}
