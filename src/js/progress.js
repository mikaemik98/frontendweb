import '../css/progress.css';
import {apiGet} from './api.js';
import Chart from 'chart.js/auto';

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat('fi-FI').format(d);
};

const getWeekKey = (dateStr) => {
  // yksinkertainen “YYYY-WW” viikkoavaimeksi
  const d = new Date(dateStr);
  const first = new Date(d.getFullYear(), 0, 1);
  const days = Math.floor((d - first) / 86400000);
  const week = Math.ceil((days + first.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
};

const loadProgress = async () => {
  // entries: paino + unet
  const entries = await apiGet('/entries/me');
  // workouts: jos sinulla on /workouts/user/:id käytössä, tee me-endpoint myöhemmin
  // tässä käytetään user localStoragesta:
  const user = JSON.parse(localStorage.getItem('user'));
  const workouts = await apiGet(`/workouts/user/${user.user_id}`);

  // ----- WEIGHT CHART -----
  const weightEntries = entries
    .filter((e) => e.weight !== null && e.weight !== undefined)
    .sort((a, b) => new Date(a.entry_date) - new Date(b.entry_date));

  const weightLabels = weightEntries.map((e) => formatDate(e.entry_date));
  const weightData = weightEntries.map((e) => Number(e.weight));

  const weightCanvas = document.getElementById('weightChart');
  if (weightCanvas) {
    new Chart(weightCanvas, {
      type: 'line',
      data: {
        labels: weightLabels,
        datasets: [
          {
            label: 'Weight (kg)',
            data: weightData,
            tension: 0.2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  // stats: weight change
  const weightChangeEl = document.getElementById('weightChange');
  if (weightChangeEl && weightData.length >= 2) {
    const diff = weightData[weightData.length - 1] - weightData[0];
    weightChangeEl.textContent = `${diff > 0 ? '+' : ''}${diff.toFixed(1)} kg`;
  }

  // ----- AVG SLEEP -----
  const sleeps = entries
    .map((e) => e.sleep_hours)
    .filter((x) => x !== null && x !== undefined)
    .map(Number);

  const avgSleepEl = document.getElementById('avgSleep');
  if (avgSleepEl && sleeps.length > 0) {
    const avg = sleeps.reduce((a, b) => a + b, 0) / sleeps.length;
    avgSleepEl.textContent = `${avg.toFixed(1)} h`;
  }

  // ----- WORKOUTS PER WEEK -----
  const byWeek = {};
  workouts.forEach((w) => {
    const key = getWeekKey(w.workout_date);
    byWeek[key] = (byWeek[key] || 0) + 1;
  });

  const weekKeys = Object.keys(byWeek).sort();
  const weekCounts = weekKeys.map((k) => byWeek[k]);

  const workoutsCanvas = document.getElementById('workoutsChart');
  if (workoutsCanvas) {
    new Chart(workoutsCanvas, {
      type: 'bar',
      data: {
        labels: weekKeys,
        datasets: [
          {
            label: 'Workouts',
            data: weekCounts,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }
};

loadProgress().catch(console.error);
