import '../css/entries.css';

import {apiGet, apiPost} from './api.js';

const container = document.getElementById('entries-container');

const user = JSON.parse(localStorage.getItem('user'));
const token = localStorage.getItem('token');

if (!user || !token) {
  window.location.href = 'login.html';
}

const modal = document.getElementById('entry-modal');

const formatDate = (dateStr) => {
  const d = new Date(dateStr);
  return new Intl.DateTimeFormat('fi-FI').format(d);
};

const renderEntries = (entries) => {
  container.innerHTML = '';

  if (!entries.length) {
    container.innerHTML = `<p>Ei merkintöjä vielä. </p>`;
    return;
  }

  entries.forEach((e) => {
    const card = document.createElement('article');
    card.className = 'entry-card';

    card.innerHTML = `
    <h3>${formatDate(e.entry_date)}</h3>
        
    <div class="entry-meta">
        <span>😌 Mood: ${e.mood ?? '-'}</span>
        <span>⚖️ Weight: ${e.weight ?? '-'}</span>
        <span>💤 Sleep: ${e.sleep_hours ?? '-'}</span>
    </div>

    <p class="entry-notes">${e.notes ?? ''}</p>`;
    container.appendChild(card);
  });
};

const loadEntries = async () => {
  try {
    const entries = await apiGet('/entries/me');
    renderEntries(entries);
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>Haku epäonnistui: ${err.message}</p>`;
  }
};

document.getElementById('add-entry-btn').onclick = () =>
  modal.classList.remove('modal-hidden');
document.getElementById('close-entry').onclick = () =>
  modal.classList.add('modal-hidden');

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('modal-hidden');
});

document.getElementById('save-entry').onclick = async () => {
  try {
    const dateEl = document.getElementById('entry-date');
    const moodEl = document.getElementById('entry-mood'); // ✅ moodEl
    const weightEl = document.getElementById('entry-weight');
    const sleepEl = document.getElementById('entry-sleep');
    const notesEl = document.getElementById('entry-notes');

    const entry_date = dateEl.value;
    const mood = moodEl.value.trim() || null;
    const weight = weightEl.value === '' ? null : Number(weightEl.value);
    const sleep_hours = sleepEl.value === '' ? null : Number(sleepEl.value);
    const notes = notesEl.value.trim() || null;

    if (!entry_date) {
      alert('Valitse päivämäärä');
      return;
    }

    if (!mood && weight === null && sleep_hours === null && !notes) {
      alert('Täytä vähintään yksi kenttä (mood/weight/sleep/notes)');
      return;
    }

    await apiPost('/entries', {entry_date, mood, weight, sleep_hours, notes});

    // nollaa kentät
    dateEl.value = '';
    moodEl.value = '';
    weightEl.value = '';
    sleepEl.value = '';
    notesEl.value = '';

    // sulje modaali
    modal.classList.add('modal-hidden');

    // päivitä lista
    await loadEntries();
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

loadEntries();
