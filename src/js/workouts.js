//workouts-sivun logiikka
//hakee kirjautuneen käyttäjän workoutit
//näyttää ne listana
//avaa modaalin ja lähettää uuden workoutin backendille
//tyhjentää kentät onnistuneen tallennuksen jälkeen

import {apiGet, apiPost, apiDelete} from './api.js';
import '../css/workouts.css';

const workoutList = document.getElementById('workout-list');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search');

const user = JSON.parse(localStorage.getItem('user'));
//jos käyttäjä ei ole kirjautun -> login
if (!user) {
  window.location.href = 'login.html';
}

const workoutModal = document.getElementById('workout-modal');

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat('fi-FI').format(d);
};

let allWorkouts = [];

const renderWorkouts = (workouts) => {
  workoutList.innerHTML = '';

  if (!workouts.length) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  workouts.forEach((w) => {
    const card = document.createElement('article');
    card.className = 'workout-card';
    card.innerHTML = `
      <h3>${w.exercise}</h3>
      <div class="workout-meta">
        <span class="badge">📅 ${formatDate(w.workout_date)}</span>
        <span class="badge">🏋️ ${w.weight_kg ?? '-'} kg</span>
        <span class="badge">🔁 ${w.reps ?? '-'} reps</span>
        <span class="badge">📦 ${w.sets ?? '-'} sets</span>
      </div>

      <div class="workout-actions">
        <button class="btn" data-del="${w.workout_id}">Delete</button>
      </div>
    `;
    workoutList.appendChild(card);
  });

  // delete handlers
  workoutList.querySelectorAll('[data-del]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-del');
      if (!confirm('Poistetaanko treeni?')) return;
      await apiDelete(`/workouts/${id}`);
      await loadWorkouts();
    });
  });
};

const updateLastWorkoutCard = () => {
  const cardWorkout = document.getElementById('cardworkout');
  const extra = document.getElementById('cardworkout-extra');
  if (!cardWorkout) return;

  const p =
    cardWorkout.querySelector('.stat-main') || cardWorkout.querySelector('p');
  const s =
    cardWorkout.querySelector('.stat-sub') || cardWorkout.querySelector('span');

  if (!allWorkouts.length) {
    p.textContent = '—';
    s.textContent = 'Ei merkintöjä';
    if (extra) extra.textContent = '';
    return;
  }

  const last = allWorkouts[0];
  p.textContent = last.exercise;
  s.textContent = formatDate(last.workout_date);

  if (extra) {
    extra.textContent = `🏋️ ${last.weight_kg ?? '-'} kg · 🔁 ${last.reps ?? '-'} · 📦 ${last.sets ?? '-'}`;
  }
};

const loadWorkouts = async () => {
  allWorkouts = await apiGet(`/workouts/user/${user.user_id}`);
  renderWorkouts(allWorkouts);
  updateLastWorkoutCard();
};

document.getElementById('add-workout-btn')?.addEventListener('click', () => {
  // esitäytä date
  const dateEl = document.getElementById('workout-date');
  if (dateEl) dateEl.value = new Date().toISOString().slice(0, 10);
  workoutModal.classList.remove('modal-hidden');
});

document.getElementById('close-workout')?.addEventListener('click', () => {
  workoutModal.classList.add('modal-hidden');
});
document.getElementById('cancel-workout')?.addEventListener('click', () => {
  workoutModal.classList.add('modal-hidden');
});

workoutModal?.addEventListener('click', (e) => {
  if (e.target === workoutModal) workoutModal.classList.add('modal-hidden');
});

document.getElementById('save-workout')?.addEventListener('click', async () => {
  const exerciseEl = document.getElementById('exercise');
  const weightEl = document.getElementById('weight');
  const repsEl = document.getElementById('reps');
  const setsEl = document.getElementById('sets');
  const dateEl = document.getElementById('workout-date');

  const exercise = exerciseEl.value.trim();
  const weight = weightEl.value;
  const reps = repsEl.value;
  const sets = setsEl.value;
  const workout_date = dateEl?.value || new Date().toISOString().slice(0, 10);

  if (!exercise) return alert('Please enter an exercise name');

  await apiPost('/workouts', {
    user_id: user.user_id,
    exercise,
    weight_kg: weight === '' ? null : Number(weight),
    reps: reps === '' ? null : Number(reps),
    sets: sets === '' ? null : Number(sets),
    workout_date,
  });

  // reset
  exerciseEl.value = '';
  weightEl.value = '';
  repsEl.value = '';
  setsEl.value = '';

  workoutModal.classList.add('modal-hidden');
  await loadWorkouts();
});

searchInput?.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = allWorkouts.filter((w) =>
    (w.exercise || '').toLowerCase().includes(q)
  );
  renderWorkouts(filtered);
});

loadWorkouts();
