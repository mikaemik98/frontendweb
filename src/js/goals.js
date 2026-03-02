import '../css/goals.css';
import {apiGet, apiPost, apiDelete} from './api.js';

// --- turvallisuus: jos goals.html ei ole auki, älä tee mitään ---
const activeEl = document.getElementById('goals-active');
const completedEl = document.getElementById('goals-completed');
if (!activeEl || !completedEl) {
  // ei olla goals-sivulla
  // (tämä estää "null onclick" -virheet jos goals.js latautuu vahingossa muualla)
  console.log('goals.js loaded, but goals containers not found -> skipping');
} else {
  const addBtn = document.getElementById('add-goal-btn');
  const modal = document.getElementById('goal-modal');
  const closeBtn = document.getElementById('close-goal');
  const saveBtn = document.getElementById('save-goal');

  const goalTypeEl = document.getElementById('goal_type');
  const targetValueEl = document.getElementById('target_value');
  const targetDateEl = document.getElementById('target_date');

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat('fi-FI').format(d);
  };

  const calcProgress = (current, target) => {
    if (target === null || target === undefined || Number(target) === 0)
      return 0;
    const pct = (Number(current || 0) / Number(target)) * 100;
    return Math.max(0, Math.min(100, Math.round(pct)));
  };

  const renderGoalCard = (g) => {
    const completed = (g.status || '').toLowerCase() === 'completed';
    const current = g.current_value ?? 0;
    const target = g.target_value ?? null;
    const pct = calcProgress(current, target);

    const card = document.createElement('article');
    card.className = 'goal-card';

    card.innerHTML = `
      <div class="goal-top">
        <h3>${g.goal_type}</h3>
        <span class="badge ${completed ? 'badge-done' : 'badge-active'}">
          ${completed ? 'Completed' : 'Active'}
        </span>
      </div>

      <p class="goal-meta">
        Target: <strong>${target ?? '-'}</strong><br/>
        Current: <strong>${current ?? '-'}</strong><br/>
        Target date: <strong>${formatDate(g.target_date)}</strong>
      </p>

      <div class="progress">
        <div class="progress-bar" style="width:${pct}%"></div>
      </div>
      <p class="progress-text">${pct}%</p>

      <div class="goal-actions">
        <button class="danger-btn" data-id="${g.goal_id}">Delete</button>
      </div>
    `;

    card.querySelector('.danger-btn').onclick = async () => {
      if (!confirm('Delete this goal?')) return;
      await apiDelete(`/goals/${g.goal_id}`);
      await loadGoals();
    };

    return card;
  };

  const loadGoals = async () => {
    const goals = await apiGet('/goals/me');

    activeEl.innerHTML = '';
    completedEl.innerHTML = '';

    const active = goals.filter(
      (g) => (g.status || '').toLowerCase() !== 'completed'
    );
    const done = goals.filter(
      (g) => (g.status || '').toLowerCase() === 'completed'
    );

    if (active.length === 0)
      activeEl.innerHTML = `<p class="empty">No active goals yet.</p>`;
    if (done.length === 0)
      completedEl.innerHTML = `<p class="empty">No completed goals yet.</p>`;

    active.forEach((g) => activeEl.appendChild(renderGoalCard(g)));
    done.forEach((g) => completedEl.appendChild(renderGoalCard(g)));
  };

  // --- modal open/close ---
  addBtn.onclick = () => modal.classList.remove('modal-hidden');

  closeBtn.onclick = () => modal.classList.add('modal-hidden');

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('modal-hidden');
  });

  // --- save ---
  saveBtn.onclick = async () => {
    try {
      const goal_type = goalTypeEl.value.trim();
      const target_value =
        targetValueEl.value === '' ? null : Number(targetValueEl.value);
      const target_date = targetDateEl.value || null;

      if (!goal_type) {
        alert('Kirjoita goal type');
        return;
      }

      // tärkeä: lähetetään null eikä undefined
      await apiPost('/goals', {
        goal_type,
        target_value,
        target_date,
      });

      // nollaa kentät
      goalTypeEl.value = '';
      targetValueEl.value = '';
      targetDateEl.value = '';

      modal.classList.add('modal-hidden');
      await loadGoals();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // init
  loadGoals().catch(console.error);
}
