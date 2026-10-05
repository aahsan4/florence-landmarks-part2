async function loadLandmarks() {
  const response = await fetch('/api/landmarks');
  const landmarks = await response.json();
  const list = document.getElementById('landmark-list');

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

loadLandmarks();