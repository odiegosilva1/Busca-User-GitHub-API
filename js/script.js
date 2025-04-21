document.getElementById("searchButton").addEventListener("click", () => {
  const username = document.getElementById("searchInput").value;

  if (username === "") {
    return;
  }

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Usuário não encontrado");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("userInfo").innerHTML = `
              <h2>${data.name}</h2>
              <img src="${data.avatar_url}" alt="${data.name}">
              <p>${data.bio || "Este usuário não tem bio."}</p>
          `;
      document.getElementById("errorMessage").style.display = "none";
    })
    .catch((error) => {
      document.getElementById("userInfo").innerHTML = "";
      document.getElementById("errorMessage").textContent = error.message;
      document.getElementById("errorMessage").style.display = "block";
    });
});
