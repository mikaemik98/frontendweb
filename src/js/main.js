//dashboard-sivun logiikka
//näyttää kirjautuneen käyttäjän nimen
//hakee be käyttäjän viimeisimmät workoutit ja diary entries
//täyttää koriti ja feedin

import '../css/style.css';
import '../css/mobile.css';

import {apiGet} from './api.js';

// Pieni apufunktio päiväyksen siistimiseen (2026-02-09T22:00:00.000Z -> 09.02.2026)
const formatDate = (value) => {
  if (!value) return '';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString('fi-FI'); // esim. 9.2.2026
};

// 1) Tarkista token (jos ei ok -> ulos ja login-sivulle)
const checkAuth = async () => {
  try {
    const me = await apiGet('/auth/me'); // vaatii Bearer tokenin
    return me.user; // palautetaan user tokenista
  } catch (err) {
    // token puuttuu / vanhentunut / virheellinen
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // jos ollaan jo login-sivulla, ei redirect loop
    if (!window.location.pathname.endsWith('login.html')) {
      window.location.href = 'login.html';
    }
    return null;
  }
};

// 2) Näytä käyttäjän nimi jos elementti löytyy
const setUsername = (user) => {
  const usernameEl = document.getElementById('username');
  if (user && usernameEl) {
    usernameEl.textContent = user.username;
  }
};

// 3) Hamburger-nav (vain jos elementit löytyy)
const initNavToggle = () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.navbar nav');

  if (!menuToggle || !nav) return;

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });
};

// 4) Dashboardin kortit (vain jos dashboard-elementit löytyy)
const loadDashboard = async (user) => {
  const cardWorkout = document.getElementById('cardworkout');
  const feedList = document.getElementById('activityfeed');

  // jos ei olla dashboard-sivulla -> älä tee mitään
  if (!cardWorkout || !feedList) return;

  try {
    // viimeisin workout
    const workouts = await apiGet(`/workouts/user/${user.user_id}`);
    if (Array.isArray(workouts) && workouts.length > 0) {
      const lastWorkout = workouts[0];

      const p = cardWorkout.querySelector('p');
      const s = cardWorkout.querySelector('span');

      if (p) {
        // näytä myös setit/reps/paino
        const w = lastWorkout.weight_kg ?? '-';
        const reps = lastWorkout.reps ?? '-';
        const sets = lastWorkout.sets ?? '-';
        p.textContent = `${lastWorkout.exercise} (${sets} x ${reps}, ${w} kg)`;
      }
      if (s) s.textContent = formatDate(lastWorkout.workout_date);
    }

    // viimeisin diary entry feediin
    const entries = await apiGet('/entries/me');
    feedList.innerHTML = '';

    if (Array.isArray(entries) && entries.length > 0) {
      const lastEntry = entries[0];
      const li = document.createElement('li');
      li.textContent = `📓 ${lastEntry.notes ?? ''}`;
      feedList.appendChild(li);
    }
  } catch (error) {
    console.error('Dashboard load error:', error);
  }
};

// --- PÄÄSUORITUS ---
initNavToggle();

const run = async () => {
  const authedUser = await checkAuth();
  if (!authedUser) return;

  // (halutessasi voit käyttää tätä useria kaikkialla)
  setUsername(authedUser);

  // jos haluat käyttää myös localStorage-useria, ok – mutta tokenista tuleva on varmempi
  // const user = JSON.parse(localStorage.getItem('user')) || authedUser;

  await loadDashboard(authedUser);
};

run();

/* // Täytä kortit
document.getElementById('cardworkout').querySelector('p').textContent =
  lastWorkout.name;
document.getElementById('cardworkout').querySelector('span').textContent =
  lastWorkout.date;

document.getElementById('cardweight').querySelector('p').textContent =
  weight.kg + ' kg';
document.getElementById('cardweight').querySelector('span').textContent =
  weight.change;

document.getElementById('cardgoals').querySelector('p').textContent =
  goals.description;
document.getElementById('cardgoals').querySelector('span').textContent =
  goals.progress;

// Täytä feed
const feedList = document.getElementById('activityfeed');
feedList.innerHTML = '';
activityFeed.forEach((item) => {
  const li = document.createElement('li');
  li.textContent = item;
  feedList.appendChild(li);
}); */
