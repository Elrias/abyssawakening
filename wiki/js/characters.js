async function loadCharacters() {
    const actors = await fetch("../../data/Actors.json").then(r => r.json());
    const classes = await fetch("../../data/Classes.json").then(r => r.json());

    const container = document.getElementById("charactersGrid");

    actors.forEach(actor => {
        if (!actor) return;
        if (actor.name.includes("-")) return;
        if (actor.name==="Stasia") return;
        const className = classes[actor.classId]?.name || "Unknown";

        const slug = actor.name.toLowerCase().replace(/\s+/g, "-");

        const card = document.createElement("a");
        card.className = "wiki-card";
        card.href = `character/?name=${slug}`;

        card.innerHTML = `
            <div class="character-face"
                style="
                    background-image: url('../../img/faces/${actor.faceName}.png');
                    background-position: ${-(actor.faceIndex % 4) * 144}px ${-Math.floor(actor.faceIndex / 4) * 144}px;
                ">
            </div>
            <h3>${actor.name}</h3>
            <p>${className}</p>
        `;

        container.appendChild(card);
    });
}

loadCharacters();