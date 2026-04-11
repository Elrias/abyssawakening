document.addEventListener("DOMContentLoaded", initEnemyPage);

async function initEnemyPage() {

    const params = new URLSearchParams(window.location.search);
    const enemyName = params.get("name");

    if (!enemyName) return;

    const enemies = await fetch("../../../data/Enemies.json")
        .then(r => r.json());

    const enemy = enemies.find(e => e && e.name === enemyName);

    if (!enemy) {
        document.getElementById("enemyName").textContent = "Enemy not found";
        return;
    }

    renderEnemyHeader(enemy);
    renderParameters(enemy);
    renderDropTable(enemy);
    setupDropToggle();
    renderSkills(enemy);
}

function renderEnemyHeader(enemy) {

    const nameEl = document.getElementById("enemyName");
    const imgEl = document.getElementById("enemyImage");

    nameEl.textContent = enemy.name;

    // RPG Maker MZ battlerName
    const battler = enemy.battlerName;

    imgEl.src = `../../../img/sv_enemies/${battler}.png`;

    imgEl.onerror = function() {
        this.onerror = null;
    };
}

function renderParameters(enemy) {

    const container = document.getElementById("enemyParams");
    container.innerHTML = "";

    const p = enemy.params;
    const note = enemy.note;

    function getParam(tag, index) {

        const regex = new RegExp(`<${tag}:\\s*(\\d+)>`);
        const match = note.match(regex);

        if (match) {
            return Number(match[1]);
        }

        return p[index];
    }

    addParam("Max HP", getParam("MHP", 0));
    addParam("ATK", getParam("ATK", 2));
    addParam("MAT", getParam("MAT", 4));
    addParam("DEF", getParam("DEF", 3));
    addParam("MDF", getParam("MDF", 5));
    addParam("EXP", enemy.exp);

    // SP spheres
    const spMatch = note.match(/<TPSphereCount:\s*(\d+)>/);
    if (spMatch) {
        const count = Number(spMatch[1]);

        if (count > 0) {
            const div = document.createElement("div");
            div.className = "param-line";

            const orbs = Array.from({ length: count })
                .map(() => `<div class="sp-orb"></div>`)
                .join("");

            div.innerHTML = `
                <span>SP</span>
                <span class="sp-spheres">${orbs}</span>
            `;

            container.appendChild(div);
        }
    }

    function addParam(name, value) {
        const div = document.createElement("div");
        div.className = "param-line";
        div.innerHTML = `
            <span>${name}</span>
            <span>${value}</span>
        `;
        container.appendChild(div);
    }
}

async function renderDropTable(enemy) {

    const container = document.getElementById("enemyDrops");
    container.innerHTML = "";

    const note = enemy.note;

    const dropRegex = /<(Item|Weapon|Armor) Drop (\d+):\s*(\d+)%>/g;

    let match;
    const drops = [];

    while ((match = dropRegex.exec(note)) !== null) {

        drops.push({
            type: match[1],
            id: Number(match[2]),
            rate: Number(match[3])
        });
    }

    if (drops.length === 0) {
        container.innerHTML = "<p>No drops.</p>";
        return;
    }

    // === Load databases ===
    const [items, weapons, armors] = await Promise.all([
        fetch("../../../data/Items.json").then(r => r.json()),
        fetch("../../../data/Weapons.json").then(r => r.json()),
        fetch("../../../data/Armors.json").then(r => r.json())
    ]);

    // === Attach data ===
    drops.forEach(drop => {

        let data;

        if (drop.type === "Item") data = items[drop.id];
        if (drop.type === "Weapon") data = weapons[drop.id];
        if (drop.type === "Armor") data = armors[drop.id];

        drop.name = data?.name || "Unknown";
        drop.iconIndex = data?.iconIndex ?? 0;
    });

    // === Sort ===
    const typeOrder = { Item: 0, Weapon: 1, Armor: 2 };

    drops.sort((a, b) => {
        if (typeOrder[a.type] !== typeOrder[b.type]) {
            return typeOrder[a.type] - typeOrder[b.type];
        }
        return b.rate - a.rate;
    });

    // === Render ===
    drops.forEach(drop => {

        const div = document.createElement("div");
        div.className = "drop-line";

        div.innerHTML = `
            <div class="drop-left">
                ${renderIcon(drop.iconIndex)}
                <span>${drop.name}</span>
            </div>
            <div class="drop-right">
                ${drop.rate}%
            </div>
        `;

        container.appendChild(div);
    });
}

function renderIcon(iconIndex) {

    const iconSize = 32;
    const iconsPerRow = 16;

    const sx = (iconIndex % iconsPerRow) * iconSize;
    const sy = Math.floor(iconIndex / iconsPerRow) * iconSize;

    return `
        <div class="icon"
            style="
                width:${iconSize}px;
                height:${iconSize}px;
                background-image:url('../../../img/system/IconSet.png');
                background-position:-${sx}px -${sy}px;
            ">
        </div>
    `;
}

function setupDropToggle() {

    const toggle = document.getElementById("dropToggle");
    const container = document.getElementById("enemyDrops");

    toggle.addEventListener("click", () => {
        container.classList.toggle("hidden");
        toggle.classList.toggle("active");
    });
}

async function renderSkills(enemy) {

    const container = document.querySelector(".enemy-skills-section");
    container.innerHTML = "<h2>Skills</h2>";

    if (!enemy.actions || enemy.actions.length === 0) {
        container.innerHTML += "<p>No skills.</p>";
        return;
    }

    const skills = await fetch("../../../data/Skills.json").then(r => r.json());
    const states = await fetch("../../../data/States.json").then(r => r.json());

    enemy.actions.forEach(action => {

        const skill = skills[action.skillId];
        if (!skill) return;

        const skillDiv = document.createElement("div");
        skillDiv.className = "enemy-skill-card";

        const typeLabel = getSkillTypeLabel(skill);
        const conditionLabel = getSkillCondition(action, states);
        const spCost = getSkillSPCost(skill);

        skillDiv.innerHTML = `
            <div class="skill-left">
                ${renderIcon(skill.iconIndex)}
                <div>
                    <div class="skill-name">${skill.name}</div>
                    <div class="skill-desc">${skill.description}</div>
                </div>
            </div>

            <div class="skill-right">
                <div class="skill-type">${typeLabel}</div>
                <div class="skill-condition">${conditionLabel || ""}</div>
                <div class="skill-sp-wrapper">${spCost || ""}</div>
            </div>
        `;

        container.appendChild(skillDiv);
    });
}

function getSkillTypeLabel(skill) {

    switch (skill.stypeId) {
        case 0:
            return "Attack";
        case 1:
            return "Skill";
        case 2:
            return "EX";
        default:
            return "Unknown";
    }
}

function getSkillCondition(action, states) {

    // HP condition
    if (action.conditionType === 2) {

        const min = Math.floor(action.conditionParam1 * 100);
        const max = Math.floor(action.conditionParam2 * 100);

        if (min === 0 && max === 100) {
            return null;
        }

        return `${min}% - ${max}% HP`;
    }

    // State condition (boss trigger states)
    if (action.conditionType === 4) {

        const state = states[action.conditionParam1];
        if (!state) return null;

        const match = state.name.match(/(\d+)%/);

        if (match) {
            return `${match[1]}% HP`;
        }

        return state.name;
    }

    return null;
}

function getSkillSPCost(skill) {

    if (!skill.tpCost || skill.tpCost <= 0) return null;

    const sp = Math.floor(skill.tpCost / 10);

    if (sp <= 0) return null;

    const orbs = Array.from({ length: sp })
        .map(() => `<div class="sp-orb"></div>`)
        .join("");

    return `<div class="sp-spheres">${orbs}</div>`;
}