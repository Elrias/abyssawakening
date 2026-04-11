document.addEventListener("DOMContentLoaded", loadEnemies);

async function loadEnemies() {
    const response = await fetch("../../data/Enemies.json");
    const enemies = await response.json();

    const basic = enemies.filter(e =>
        e && e.note && e.note.includes("<WikiEnemy>")
    );

    const bosses = enemies.filter(e =>
        e && e.note && e.note.includes("<WikiBoss>")
    );

    renderEnemyList(basic, "basicEnemyList");
    renderEnemyList(bosses, "bossEnemyList");
}

function renderEnemyList(list, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    list.forEach(enemy => {

            const battlerName = enemy.battlerName;
            const portraitPath = `../../img/enemies/HBportraits/${battlerName}.png`;

            const card = document.createElement("div");
            card.classList.add("wiki-card", "enemy-card");

            card.innerHTML = `
                <img src="${portraitPath}" 
                     class="enemy-portrait"
                     onerror="this.src='../../assets/placeholder.png'">
                <div class="enemy-name">${enemy.name}</div>
            `;

            card.addEventListener("click", () => {
                const encoded = encodeURIComponent(enemy.name);
                window.location.href = `enemy/?name=${encoded}`;
            });

            container.appendChild(card);
        });
}