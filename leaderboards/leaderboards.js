const API_BASE = "https://abyssawakening-backend.onrender.com";
const BASE_PATH = "/";
const PLAYERS_PER_PAGE = 20;
let currentPage = 1;
let allPlayers = [];

async function loadLeaderboard() {
  try {
    const res = await fetch(`${API_BASE}/leaderboards`);
    const data = await res.json();

    allPlayers = data.players || [];

    renderPage(1);

  } catch (err) {
    console.error(err);
  }
}

function goToProfile(username) {
  window.location.href = `${BASE_PATH}profile/?user=${username}`;
}

function renderPage(page) {
  currentPage = page;

  const container = document.getElementById("leaderboard");

  const start = (page - 1) * PLAYERS_PER_PAGE;
  const end = start + PLAYERS_PER_PAGE;

  const players = allPlayers.slice(start, end);

  container.innerHTML = players.map((p, index) => {
    let globalRank = 1;

    if (start + index > 0) {

      const currentPlayer = allPlayers[start + index];
      const previousPlayer = allPlayers[start + index - 1];

      if (currentPlayer.score === previousPlayer.score) {

        // même score = même rang
        globalRank = allPlayers[start + index - 1]._rank;

      } else {

        // sinon rang réel dans la liste
        globalRank = start + index + 1;
      }

    }

    p._rank = globalRank;

    return `
      <div 
        class="leaderboard-row rank-${globalRank}" 
        onclick="goToProfile('${p.username}')"
      >
        <div class="rank">#${globalRank}</div>

        <img 
          class="avatar rank-${globalRank}" 
          src="${p.avatar_url || BASE_PATH + "img/avatars/default.png"}"
          onerror="this.src='${BASE_PATH}img/avatars/default.png'"
        >

        <div class="name">${p.username}</div>

        <div class="score">${p.score} pts</div>
      </div>
    `;
  }).join("");

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(allPlayers.length / PLAYERS_PER_PAGE);

  let pagination = document.getElementById("pagination");

  if (!pagination) {
    pagination = document.createElement("div");
    pagination.id = "pagination";
    document.getElementById("content").appendChild(pagination);
  }

  let html = "";

  // Bouton précédent
  if (currentPage > 1) {
    html += `<span onclick="renderPage(${currentPage - 1})"><</span>`;
  }

  // Pages autour
  for (let i = currentPage - 2; i <= currentPage + 2; i++) {
    if (i < 1 || i > totalPages) continue;

    html += `
      <span 
        class="page-number ${i === currentPage ? "active" : ""}"
        onclick="renderPage(${i})"
      >
        ${i}
      </span>
    `;
  }

  // Bouton suivant
  if (currentPage < totalPages) {
    html += `<span onclick="renderPage(${currentPage + 1})">></span>`;
  }

  pagination.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);