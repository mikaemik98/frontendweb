const { apiPost } = require('./api.js');

const login = async (username, password) => {
  if (!username || !password) {
    throw new Error('Virheellinen syöte');
  }

  const result = await apiPost('/auth/login', { username, password });

  localStorage.setItem('user', JSON.stringify(result.user));
  localStorage.setItem('token', result.token);

  return result.user;
};

module.exports = { login };


// UI-event handler erikseen
if (typeof document !== 'undefined') {

  const loginBtn = document.getElementById('login-btn');

  if (loginBtn) {

    loginBtn.onclick = async (e) => {

      e.preventDefault();

      try {

        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        await login(username, password);

        window.location.href = 'index.html';

      } catch (err) {

        console.error(err);
        alert('Login epäonnistui');

      }

    };

  }

}