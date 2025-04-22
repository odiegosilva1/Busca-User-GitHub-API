document.getElementById("searchButton").addEventListener("click", () => {
  const username = document.getElementById("searchInput").value.trim();
  const resultsSection = document.getElementById("userResults");
  const userInfo = document.getElementById("userInfo");
  const errorMessage = document.getElementById("errorMessage");

  // Reset states
  errorMessage.style.display = "none";
  userInfo.innerHTML = "";

  if (!username) {
    errorMessage.textContent = "Por favor, digite um nome de usuário";
    errorMessage.style.display = "block";
    resultsSection.style.display = "block";
    return;
  }

  // Show loading state
  userInfo.innerHTML = `<p class="loading">Buscando usuário...</p>`;
  resultsSection.style.display = "block";

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }
      return response.json();
    })
    .then((data) => {
      userInfo.innerHTML = `
        <h2>${data.name || username}</h2>
        <img src="${data.avatar_url}" alt="${data.name || username}">
        <p>${data.bio || "Este usuário não possui biografia."}</p>
        <div class="user-stats">
          <div class="stat-item">
            <div class="stat-value">${data.public_repos}</div>
            <div class="stat-label">Repositórios</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${data.followers}</div>
            <div class="stat-label">Seguidores</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">${data.following}</div>
            <div class="stat-label">Seguindo</div>
          </div>
        </div>
      `;
    })
    .catch((error) => {
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
      userInfo.innerHTML = "";
    });
});

// Allow search on Enter key
document.getElementById("searchInput").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    document.getElementById("searchButton").click();
  }
});
