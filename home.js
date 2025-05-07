document.addEventListener('DOMContentLoaded', () => {
  let events = [
    { title: 'Summer Gala', date: '2025-06-10', desc: 'Celebrate the start of summer with music, food, and fun.' },
    { title: 'Tech Expo', date: '2025-06-14', desc: 'Explore innovations from top tech companies.' },
    { title: 'Art Fair', date: '2025-06-18', desc: 'A showcase of local artists and their creations.' },
    { title: 'Concert Night', date: '2025-06-22', desc: 'Live performances by local bands.' },
    { title: 'Food Festival', date: '2025-06-25', desc: 'Taste dishes from around the world.' },
    { title: 'Marathon', date: '2025-07-01', desc: 'Join runners from all over the region.' },
    { title: 'Book Launch', date: '2025-07-05', desc: 'Debut of a new mystery thriller by acclaimed author.' },
    { title: 'Film Premiere', date: '2025-07-10', desc: 'Red carpet screening of a new indie film.' },
    { title: 'Dance Showcase', date: '2025-07-15', desc: 'Talented dancers take the stage.' },
  ];

  const grid = document.querySelector('.events-grid .grid');
  const form = document.getElementById('event-form');
  const message = document.getElementById('form-message');
  const modal = document.getElementById('event-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDate = document.getElementById('modal-date');
  const modalDesc = document.getElementById('modal-desc');
  const modalDelete = document.getElementById('modal-delete');

  let currentEventIndex = null;

  function renderEvents() {
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    grid.innerHTML = '';
    events.forEach((evt, index) => {
      const card = document.createElement('div');
      card.className = 'event-card';
      card.innerHTML = `
        <div class="info">
          <h4>${evt.title}</h4>
          <p>${new Date(evt.date).toLocaleDateString()}</p>
        </div>
      `;
      card.addEventListener('click', () => {
        currentEventIndex = index;
        modalTitle.textContent = evt.title;
        modalDate.textContent = new Date(evt.date).toLocaleDateString();
        modalDesc.textContent = evt.desc;
        modal.style.display = 'flex';
      });
      grid.appendChild(card);
    });
  }

  renderEvents();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    message.textContent = '';
    message.className = 'form-message';

    const title = document.getElementById('event-title').value.trim();
    const date = document.getElementById('event-date').value;
    const desc = document.getElementById('event-desc').value.trim();

    const now = new Date();
    const selected = new Date(date);
    const oneYearFromNow = new Date();
    oneYearFromNow.setFullYear(now.getFullYear() + 1);

    if (!title || !date || !desc) {
      message.textContent = 'All fields are required.';
      message.classList.add('error');
      return;
    }

    if (title.length > 30) {
      message.textContent = 'Event title must be 30 characters or fewer.';
      message.classList.add('error');
      return;
    }

    if (desc.length > 500) {
      message.textContent = 'Description must be 500 characters or fewer.';
      message.classList.add('error');
      return;
    }

    if (selected < new Date(now.setHours(0, 0, 0, 0)) || selected > oneYearFromNow) {
      message.textContent = 'Date must be from today up to one year in the future.';
      message.classList.add('error');
      return;
    }

    if (events.some(evt => evt.date === date)) {
      message.textContent = 'Only one event can be held per day. Please select another date.';
      message.classList.add('error');
      return;
    }

    events.push({ title, date, desc });
    renderEvents();
    message.textContent = 'Event submitted successfully!';
    message.classList.add('success');
    form.reset();
  });

  modalDelete.addEventListener('click', () => {
    if (currentEventIndex !== null && confirm('Are you sure you want to delete this event?')) {
      events.splice(currentEventIndex, 1);
      renderEvents();
      modal.style.display = 'none';
    }
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
