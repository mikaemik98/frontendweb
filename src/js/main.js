import '../css/style.css';
import '../css/mobile.css';

import {apiGet} from './api.js';

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  document.getElementById('username').textContent = user.username;
}

// Navigaation toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navbar nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

//dashboard data
const loadDashboard = async () => {
  try {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    //haetaan workoutit be
    const workouts = await apiGet(`/workouts/user/${user.user_id}`);

    if (workouts.length > 0) {
      const lastWorkout = workouts[0];

      document.getElementById('cardworkout').querySelector('p').textContent =
        lastWorkout.exercise;

      document.getElementById('cardworkout').querySelector('span').textContent =
        lastWorkout.workout_date;

      const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('fi-FI');
      };

      document.querySelector('#cardworkout span').textContent = formatDate(
        lastWorkout.workout_date
      );
    }

    //haetaan diary entries
    const entries = await apiGet(`/entries/user/${user.user_id}`);

    if (entries.length > 0) {
      const lastEntry = entries[0];

      const feedList = document.getElementById('activityfeed');

      const li = document.createElement('li');
      li.textContent = `📓 ${lastEntry.notes}`;

      feedList.appendChild(li);
    }
  } catch (error) {
    console.error('Dashboard load error:', error);
  }
};

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
