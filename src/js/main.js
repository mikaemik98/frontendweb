import '../css/style.css';
import '../css/mobile.css';

const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  document.getElementById('username-display').textContent = user.username;
}

/* mokki dataa */
const lastWorkout = {name: 'Juoksu 5 km', date: 'Eilen'};
const weight = {kg: 78.2, change: '-0.4 kg'};
const goals = {description: '3 treeniä / vko', progress: '2 / 3'};
const activityFeed = [
  '🏃 Juoksu 5 km',
  '📓 Päiväkirja: hyvä fiilis',
  '⚖️ Paino 78.2 kg',
];

// Navigaation toggle
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navbar nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

// Täytä kortit
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
});
