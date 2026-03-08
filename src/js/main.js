//dashboard-sivun logiikka
//näyttää kirjautuneen käyttäjän nimen
//hakee be käyttäjän viimeisimmät workoutit ja diary entries
//täyttää koriti ja feedin

import '../css/style.css';
import '../css/mobile.css';
import {apiGet} from './api.js';

// date formatting helper
const formatDate = (dateStr) => {
  if (!dateStr) return '-';
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat('fi-FI').format(d);
};

// auth check & navbar username
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || 'null');

// Jos ei tokenia -> login
// (jos sinulla on myös täysin julkisia sivuja, lisää tähän poikkeuslista)
if (!token || !user) {
  // älä redirectaa login.html:stä login.html:ään
  if (!location.pathname.endsWith('login.html')) {
    window.location.href = 'login.html';
  }
}

// username navbarissa
const usernameEl = document.getElementById('username');
if (user && usernameEl) usernameEl.textContent = user.username;

// navbar toggle mobilelle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navbar nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });
}

// dashboard-sivun logiikka
const loadDashboard = async () => {
  const cardWorkout = document.getElementById('cardworkout');
  const cardWeight = document.getElementById('cardweight');
  const cardGoals = document.getElementById('cardgoals');
  const feedList = document.getElementById('activityfeed');

  // Jos ei olla dashboard-sivulla -> ei tehdä mitään
  if (!cardWorkout || !cardGoals) return;

  //tyhjennä feedin (jos on)
  if (feedList) {
    feedList.innerHTML = '';
  }

  // 1) Viimeisin workout
  try {
    const workouts = await apiGet(`/workouts/user/${user.user_id}`);
    if (workouts.length > 0) {
      const last = workouts[0];
      cardWorkout.querySelector('p').textContent = last.exercise ?? '-';
      cardWorkout.querySelector('span').textContent = formatDate(
        last.workout_date
      );
    } else {
      cardWorkout.querySelector('p').textContent = 'Ei treenejä';
      cardWorkout.querySelector('span').textContent = '';
    }
  } catch (e) {
    console.error('Workouts fetch failed:', e);
  }

  //weight
  try {
    const entries = await apiGet('/entries/me');

    if (entries.length > 0 && cardWeight) {
      const weightEntries = entries
        .filter((e) => e.weight !== null && e.weight !== undefined)
        .sort((a, b) => new Date(b.entry_date) - new Date(a.entry_date));

      if (weightEntries.length > 0) {
        const lastWeight = weightEntries[0].weight;

        cardWeight.querySelector('.stat-main').textContent = `${lastWeight} kg`;

        cardWeight.querySelector('.stat-sub').textContent = formatDate(
          weightEntries[0].entry_date
        );
      }
    }
  } catch (e) {
    console.error('Weight fetch failed:', e);
  }

  // 2) Viimeisin diary entry (notes feediin)
  if (feedList) {
    try {
      const entries = await apiGet('/entries/me');

      if (entries.length > 0) {
        const lastEntry = entries[0];

        const li = document.createElement('li');
        li.textContent = `📓 ${formatDate(lastEntry.entry_date)}: ${lastEntry.notes ?? ''}`;

        feedList.appendChild(li);
      } else {
        const li = document.createElement('li');
        li.textContent = 'Ei merkintöjä vielä.';
        feedList.appendChild(li);
      }
    } catch (e) {
      console.error('Entries fetch failed:', e);
    }
  }
  // 3) Goals-kortti
  try {
    const goals = await apiGet('/goals/me');
    if (goals.length > 0) {
      const active = goals.find((g) => g.status !== 'completed') || goals[0];
      const cur = Number(active.current_value ?? 0);
      const tar =
        active.target_value == null ? null : Number(active.target_value);
      const pct = tar ? Math.min(100, Math.round((cur / tar) * 100)) : 0;

      cardGoals.querySelector('p').textContent = tar
        ? `${active.goal_type}: ${cur}/${tar}`
        : `${active.goal_type}`;
      cardGoals.querySelector('span').textContent = tar
        ? `${pct}%`
        : (active.status ?? 'active');
    } else {
      cardGoals.querySelector('p').textContent = 'Ei tavoitteita';
      cardGoals.querySelector('span').textContent = '';
    }
  } catch (e) {
    console.error('Goals fetch failed:', e);
  }
};

// Aja vain dashboardissa
loadDashboard();

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
