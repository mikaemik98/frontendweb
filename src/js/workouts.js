//workouts-sivun logiikka
//hakee kirjautuneen käyttäjän workoutit
//näyttää ne listana
//avaa modaalin ja lähettää uuden workoutin backendille
//tyhjentää kentät onnistuneen tallennuksen jälkeen

import {apiGet, apiPost} from './api.js';

const workoutList = document.getElementById('workout-list');
const workoutModal = document.getElementById('workout-modal');

const user = JSON.parse(localStorage.getItem('user'));
//jos käyttäjä ei ole kirjautun -> login
if (!user) {
  window.location.href = 'login.html';
}

//load workouts ja renderöi listaan
const loadWorkouts = async () => {
  const workouts = await apiGet(`/workouts/user/${user.user_id}`);
  workoutList.innerHTML = '';

  workouts.forEach((workout) => {
    const div = document.createElement('div');
    div.className = 'workout-card';
    div.innerHTML = `
      <h3>${workout.exercise}</h3>
      <p>Weight: ${workout.weight_kg ?? '-'} kg</p>
      <p>Reps: ${workout.reps ?? '-'}</p>
      <p>Sets: ${workout.sets ?? '-'}</p>
      <p>Date: ${workout.workout_date}</p>
    `;
    workoutList.appendChild(div);
  });
};

//avataan modaali
document.getElementById('add-workout-btn').onclick = () => {
  workoutModal.classList.remove('modal-hidden');
};

//sulje modaali (cancel)
document.getElementById('close-workout').onclick = () => {
  workoutModal.classList.add('modal-hidden');
};

//sulje modaali taustaa klikaamalla
workoutModal.addEventListener('click', (e) => {
  if (e.target === workoutModal) workoutModal.classList.add('modal-hidden');
});

//save workout
document.getElementById('save-workout').onclick = async () => {
  try {
    const exerciseInput = document.getElementById('exercise');
    const weightInput = document.getElementById('weight');
    const repsInput = document.getElementById('reps');
    const setsInput = document.getElementById('sets');

    const exercise = exerciseInput.value.trim();
    const weight = weightInput.value;
    const reps = repsInput.value;
    const sets = setsInput.value;

    //vähintään exercise vaaditaan
    if (!exercise) {
      alert('Please enter an exercise name');
      return;
    }

    //lähetetään backendille
    await apiPost('/workouts', {
      user_id: user.user_id,
      exercise,
      weight_kg: weight === '' ? null : Number(weight),
      reps: reps === '' ? null : Number(reps),
      sets: sets === '' ? null : Number(sets),
      workout_date: new Date().toISOString().slice(0, 10),
    });

    // resetoi kentät
    exerciseInput.value = '';
    weightInput.value = '';
    repsInput.value = '';
    setsInput.value = '';

    // sulje modaali vasta onnistuneen tallennuksen jälkeen
    workoutModal.classList.add('modal-hidden');

    // päivitä lista
    await loadWorkouts();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

loadWorkouts();
