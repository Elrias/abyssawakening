async function loadStates() {

    const states = await fetch("../../data/States.json")
        .then(r => r.json());

    const system = await fetch("../../data/System.json")
        .then(r => r.json());

    // Filtrer les states Wiki
    let wikiStates = states.filter(s =>
        s && s.note && s.note.includes("<WikiState>")
    );

    // Tri alphabétique
    wikiStates.sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const container = document.getElementById("statesList");

    function buildStateCard(state) {

        const iconSize = 32;
        const iconsPerRow = 16;

        const sx = (state.iconIndex % iconsPerRow) * iconSize;
        const sy = Math.floor(state.iconIndex / iconsPerRow) * iconSize;

        // Category
        let categoryHTML = "";
        const catMatch = state.note.match(/<Category:\s*(.*?)>/i);
        if (catMatch) {
            categoryHTML = `<div class="state-category">Category: ${catMatch[1]}</div>`;
        }

        // Help Description
        let helpDesc = "";
        const helpMatch = state.note.match(/<Help Description>([\s\S]*?)<\/Help Description>/i);
        if (helpMatch) {
            helpDesc = helpMatch[1].trim().replace(/\\n/g, "<br>");
        }

        return `
            <div class="state-card" data-name="${state.name.toLowerCase()}">

                <div class="state-header">
                    <div class="state-icon"
                        style="
                            background-image: url('../../img/system/IconSet.png');
                            background-position: -${sx}px -${sy}px;
                        ">
                    </div>

                    <div>
                        <h3>${state.name}</h3>
                        ${categoryHTML}
                    </div>
                </div>

                <div class="state-description">
                    ${cleanDescription(helpDesc)}
                </div>

            </div>
        `;
    }

    container.innerHTML = wikiStates.map(buildStateCard).join("");

    // SEARCH
    const searchInput = document.getElementById("stateSearch");

    searchInput.addEventListener("input", function() {
        const value = this.value.toLowerCase();

        document.querySelectorAll(".state-card").forEach(card => {
            const name = card.dataset.name;
            card.style.display = name.includes(value) ? "" : "none";
        });
    });
}

loadStates();