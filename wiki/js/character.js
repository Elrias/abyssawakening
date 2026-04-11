function formatSkillType(type) {
    if (type.startsWith("S")) {
        return "Skill " + type.substring(1);
    }
    return type;
}

function extractSkillExtras(skill) {

    const note = skill.note || "";
    const extras = [];

    // Cooldown
    const cdMatch = note.match(/<Cooldown:\s*(\d+)>/i);
    if (cdMatch) {
        extras.push(`Cooldown: ${cdMatch[1]} turns`);
    }

    // Item Cost (peut être multiple)
    const itemMatches = [...note.matchAll(/<Item Cost:\s*(.*?)>/gi)];
    itemMatches.forEach(match => {
        extras.push(`Item Cost: ${match[1]}`);
    });

    // HP Cost (JS block)
    if (note.includes("<JS HP Cost>")) {
        extras.push("HP Cost: Based on Max HP");
    }

    // TP Cost (direct DB)
    if (skill.tpCost && skill.tpCost > 0) {
        extras.push(`TP Cost: ${skill.tpCost}`);
    }

    return extras;
}

function buildSkillCard(label, skill, isBaseSkill = false) {

    const iconSize = 32;
    const iconsPerRow = 16;

    const sx = (skill.iconIndex % iconsPerRow) * iconSize;
    const sy = Math.floor(skill.iconIndex / iconsPerRow) * iconSize;

    let extrasHTML = "";

    if (isBaseSkill) {
        const extras = extractSkillExtras(skill);

        if (extras.length > 0) {
            extrasHTML = `
                <div class="skill-extras">
                    ${extras.map(e => `<span class="skill-extra">${e}</span>`).join("")}
                </div>
            `;
        }
    }

    return `
        <div class="skill-card">
            <div class="skill-header">
                <div class="skill-icon"
                    style="
                        background-image: url('../../../img/system/IconSet.png');
                        background-position: -${sx}px -${sy}px;
                    ">
                </div>
                <div>
                    <h3>${label}</h3>
                    <h4>${skill.name}</h4>
                </div>
            </div>

            ${extrasHTML}

            <p>${cleanDescription(skill.description)}</p>
        </div>
    `;
}

async function loadCharacter() {

    const params = new URLSearchParams(window.location.search);
    const nameParam = params.get("name");
    if (!nameParam) return;

    const armors = await fetch("../../../data/Armors.json").then(r => r.json());
    const actors = await fetch("../../../data/Actors.json").then(r => r.json());
    const classes = await fetch("../../../data/Classes.json").then(r => r.json());
    const skills = await fetch("../../../data/Skills.json").then(r => r.json());
    const system = await fetch("../../../data/System.json").then(r => r.json());

    const actor = actors.find(a =>
        a && a.name.toLowerCase().replace(/\s+/g, "-") === nameParam
    );
    if (!actor) return;

    const classData = classes[actor.classId];
    const className = classData.name;
    const isMerc = className === "Mercenary";

    /* ===============================
       TYPE & WEAPON
    =============================== */

    let classType;
    let weaponType;

    if (isMerc) {
        classType = "Hybrid";
        weaponType = "All";
    } else {
        const classTypeMap = {
            "Knight": "Physical",
            "Priest": "Magical",
            "Sorceress": "Magical",
            "Dark Knight": "Hybrid",
            "Paladin": "Hybrid",
            "Whisperer": "Magical",
            "Alchemist": "Hybrid",
            "Magical Girl": "Hybrid",
            "Ranger": "Magical",
            "Occultist": "Magical",
            "Samurai": "Physical",
            "Berserker": "Physical",
            "Rogue": "Physical",
            "Dancer": "Physical"
        };

        classType = classTypeMap[className] || "Unknown";

        const weaponTrait = classData.traits.find(t => t.code === 51);
        weaponType = weaponTrait
            ? system.weaponTypes[weaponTrait.dataId]
            : "Unknown";
    }

    /* ===============================
       FACE POSITION
    =============================== */

    const x = -(actor.faceIndex % 4) * 144;
    const y = -Math.floor(actor.faceIndex / 4) * 144;

    /* ===============================
       STATS
    =============================== */

    const paramMap = [
        { name: "HP", index: 0 },
        { name: "ATK", index: 2 },
        { name: "MAT", index: 4 },
        { name: "AGI", index: 6 },
        { name: "LUK", index: 7 }
    ];

    let statRows = "";

    const lukLv1 = classData.params[7][1];
    const lukLv50 = classData.params[7][50];
    const lukLv99 = classData.params[7][99];

    const critLv1 = 5 + Math.floor(lukLv1 / 20);
    const critLv50 = 5 + Math.floor(lukLv50 / 20);
    const critLv99 = 5 + Math.floor(lukLv99 / 20);

    paramMap.forEach(param => {
        statRows += `
            <tr>
                <td>${param.name}</td>
                <td>${classData.params[param.index][1]}</td>
                <td>${classData.params[param.index][50]}</td>
                <td>${classData.params[param.index][99]}</td>
            </tr>
        `;
    });

    statRows += `
        <tr>
            <td>Crit Rate</td>
            <td>${critLv1}%</td>
            <td>${critLv50}%</td>
            <td>${critLv99}%</td>
        </tr>
    `;

    /* ===============================
       SKILLS & RUNE
    =============================== */

    let skillsHTML = "";
    let runeHTML = "";

    if (isMerc) {

        // Passive
        const passive = skills.find(s =>
            s && s.note?.includes("<MercenaryPassive>")
        );

        if (passive) {
            skillsHTML += buildSkillCard("Passive", passive);
        }

        const mercEx = skills.filter(s =>
            s && s.note && /<MercenaryEX\s*:\s*.*?>/i.test(s.note)
        );

        mercEx.forEach(ex => {
            const match = ex.note.match(/<MercenaryEX\s*:\s*(.*?)>/i);
            const weapon = match ? match[1].trim() : "Unknown";

            skillsHTML += buildSkillCard(`EX (${weapon})`, ex);
        });

        // Skills en vrac
        const mercSkills = skills.filter(s =>
            s && s.note?.includes("<MercenarySkill>")
        );

        mercSkills.forEach(skill => {
            skillsHTML += buildSkillCard("Skill", skill, true);
        });

    } else {

        function getPrefix(name) {
            if (name === "Dark Knight") return "DK";
            if (name === "Magical Girl") return "MG";
            return name;
        }

        const prefix = getPrefix(className);
        const order = ["Passive","EX","S1","S2","S3","S4"];

        order.forEach(type => {
            const tag = `<${prefix}${type}>`;

            const skill = skills.find(s =>
                s && s.note?.includes(tag)
            );

            if (skill) {
                const isBaseSkill = type.startsWith("S");
                skillsHTML += buildSkillCard(formatSkillType(type), skill, isBaseSkill);
            }
        });

        // Rune
        const runeTag = `<${prefix}Rune>`;
        const rune = armors.find(a =>
            a && a.note?.includes(runeTag)
        );

        if (rune) {
            runeHTML = buildSkillCard("Rune", rune);
        }
    }

    /* ===============================
       RENDER
    =============================== */

    const container = document.getElementById("characterContent");

    container.innerHTML = `
        <div class="character-top-layout">

            <div class="left-column">

                <div class="character-header-card">
                    <div class="character-face"
                        style="
                            background-image: url('../../../img/faces/${actor.faceName}.png');
                            background-position: ${x}px ${y}px;
                        ">
                    </div>

                    <div class="character-header-info">
                        <h1>${actor.name}</h1>
                        <h2>${className}</h2>
                        <p class="role">${actor.nickname}</p>

                        <div class="meta-simple">
                            <p><strong>Type:</strong> ${classType}</p>
                            <p><strong>Weapon:</strong> ${weaponType}</p>
                        </div>
                    </div>
                </div>

                ${!isMerc ? `
                <div class="rune-section">
                    <h2>Unique Rune</h2>
                    ${runeHTML}
                </div>
                ` : ""}

            </div>

            <div class="stats-section">
                <h2>Base Stats</h2>
                <table class="stats-table">
                    <tr>
                        <th>Param</th>
                        <th>Lv 1</th>
                        <th>Lv 50</th>
                        <th>Lv 99</th>
                    </tr>
                    ${statRows}
                </table>
            </div>

        </div>

        <div class="skills-section">
            <h2>Skills</h2>
            ${skillsHTML}
        </div>
    `;
}

loadCharacter();