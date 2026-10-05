async function loadLandmark() {
  const slug = window.location.pathname.split('/').pop();
  const response = await fetch(`/api/landmarks/${slug}`);

  if (!response.ok) {
    window.location.href = '/404';
    return;
  }

  const l = await response.json();
  document.title = l.name;
  document.getElementById('landmark-detail').innerHTML = `
    <img src="${l.image}" alt="${l.name}">
    <h2>${l.name}</h2>
    <p><strong>Category:</strong> ${l.category}</p>
    <p><strong>Architect:</strong> ${l.architect}</p>
    <p><strong>Built:</strong> ${l.built}</p>
    <p><strong>Neighborhood:</strong> ${l.neighborhood}</p>
    <p>${l.description}</p>
    <blockquote><strong>Medici connection:</strong> ${l.medici_connection}</blockquote>
  `;
}

loadLandmark();