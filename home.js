// events.js
document.addEventListener('DOMContentLoaded', () => {
  // ── Render 9 placeholder events ────────────────────────
  const events = [
    { title: 'Summer Gala', date: '2025-06-10', img: 'https://via.placeholder.com/300x200' },
    { title: 'Tech Expo',     date: '2025-06-14', img: 'https://via.placeholder.com/300x200' },
    { title: 'Art Fair',      date: '2025-06-18', img: 'https://via.placeholder.com/300x200' },
    { title: 'Concert Night', date: '2025-06-22', img: 'https://via.placeholder.com/300x200' },
    { title: 'Food Festival', date: '2025-06-25', img: 'https://via.placeholder.com/300x200' },
    { title: 'Marathon',      date: '2025-07-01', img: 'https://via.placeholder.com/300x200' },
    { title: 'Book Launch',   date: '2025-07-05', img: 'https://via.placeholder.com/300x200' },
    { title: 'Film Premiere', date: '2025-07-10', img: 'https://via.placeholder.com/300x200' },
    { title: 'Dance Showcase',date: '2025-07-15', img: 'https://via.placeholder.com/300x200' },
  ];

  const grid = document.querySelector('.events-grid .grid');
  events.forEach(evt => {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.innerHTML = `
      <img src="${evt.img}" alt="${evt.title}">
      <div class="info">
        <h4>${evt.title}</h4>
        <p>${new Date(evt.date).toLocaleDateString()}</p>
      </div>
    `;
    grid.appendChild(card);
  });

  // ── Simple Calendar Generator ──────────────────────────
  function renderCalendar(year, month) {
    const cal = document.getElementById('calendar');
    cal.innerHTML = '';

    // Weekday headers
    const daysOfWeek = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    daysOfWeek.forEach(d => {
      const dn = document.createElement('div');
      dn.className = 'day-name';
      dn.textContent = d;
      cal.appendChild(dn);
    });

    const firstDayIdx = new Date(year, month, 1).getDay();
    const daysInMonth  = new Date(year, month + 1, 0).getDate();

    // blank slots
    for (let i = 0; i < firstDayIdx; i++) {
      cal.appendChild(document.createElement('div'));
    }

    // days
    for (let day = 1; day <= daysInMonth; day++) {
      const dayEl = document.createElement('div');
      dayEl.className = 'day';
      dayEl.textContent = day;
      const today = new Date();
      if (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dayEl.classList.add('today');
      }
      cal.appendChild(dayEl);
    }
  }

  const now = new Date();
  renderCalendar(now.getFullYear(), now.getMonth());
});
