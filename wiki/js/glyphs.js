document.addEventListener("DOMContentLoaded", loadGlyphSkills);

async function loadGlyphSkills() {
    const response = await fetch("../../../data/Skills.json");
    const skills = await response.json();

    const list = document.getElementById("glyphSkillList");

    const filtered = skills
        .filter(skill =>
            skill &&
            skill.note &&
            skill.note.includes("<GlyphSkill>")
        )
        .sort((a, b) => a.name.localeCompare(b.name));

    renderGlyphSkills(filtered);
}

function renderGlyphSkills(skills) {
    const list = document.getElementById("glyphSkillList");
    list.innerHTML = "";

    skills.forEach(skill => {
        const card = document.createElement("div");
        card.classList.add("wiki-card");

        const iconX = (skill.iconIndex % 16) * 32;
        const iconY = Math.floor(skill.iconIndex / 16) * 32;

        card.innerHTML = `
            <div class="card-header">
                <div class="skill-icon" 
                     style="
                        background-image: url('../../../img/system/IconSet.png');
                        background-position: -${iconX}px -${iconY}px;
                     ">
                </div>
                <h3>${skill.name}</h3>
            </div>
            <p>${cleanDescription(skill.description)}</p>
        `;

        list.appendChild(card);
    });
}

/* Adapter selon ton système d’icônes */
function getIconName(index) {
    return index; // si tu utilises iconIndex direct
}