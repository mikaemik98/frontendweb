///Progress-sivu: hakee dataa ja piirtää Chart.js:llä trendit (esim. paino), + summary-metriikat.

import '../css/progress.css';
import {apiGet} from './api.js';

const loadProgress = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  const entries = await apiGet('/entries/me');
  const workouts = await apiGet(`/workouts/user/${user.user_id}`);

  ///entry count
  const entryCount = document.getElementById('entryCount');
  if (entryCount) entryCount.textContent = entries.length;

  ///workout count
  const workoutCount = document.getElementById('workoutCount');
  if (workoutCount) workoutCount.textContent = workouts.length;

  ///weigth change
  const weightChangeEl = document.getElementById('weightChange');

  const weightEntries = entries
    .filter((e) => e.weight !== null && e.weight !== undefined)
    .map((e) => Number(e.weight));

  if (weightEntries.length >= 2) {
    const change = weightEntries[weightEntries.length - 1] - weightEntries[0];

    weightChangeEl.textContent = `${change > 0 ? '+' : ''}${change.toFixed(1)} kg`;
  }

  //average sleep
  const avgSleepEl = document.getElementById('avgSleep');

  const sleeps = entries
    .map((e) => e.sleep_hours)
    .filter((x) => x !== null && x !== undefined)
    .map(Number);

  if (sleeps.length > 0) {
    const avg = sleeps.reduce((a, b) => a + b, 0) / sleeps.length;
    avgSleepEl.textContent = `${avg.toFixed(1)} h`;
  }
};

loadProgress().catch(console.error);
