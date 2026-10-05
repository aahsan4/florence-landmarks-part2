const list = document.getElementById('landmark-list');
const searchInput = document.getElementById('search');

async function loadLandmarks(search = '') {
  const url = search
    ? `/api/landmarks?search=${encodeURIComponent(search)}`
    : '/api/landmarks';

  const response = await fetch(url);
  const landmarks = await response.json();

  list.innerHTML = '';

  if (landmarks.length === 0) {
    list.innerHTML = '<p>No landmarks match your search.</p>';
    return;
  }

  landmarks.forEach(landmark => {
    const card = document.createElement('article');
    card.innerHTML = `
      <img src="${landmark.image}" alt="${landmark.name}">
      <h3>${landmark.name}</h3>
      <p><strong>${landmark.category}</strong> · ${landmark.architect}</p>
      <a href="/landmarks/${landmark.slug}" role="button">Read more</a>
    `;
    list.appendChild(card);
  });
}

searchInput.addEventListener('input', () => {
  loadLandmarks(searchInput.value.trim());
});

loadLandmarks();