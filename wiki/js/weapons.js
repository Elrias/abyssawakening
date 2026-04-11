let allWeapons = [];
let allUpgradeableWeapons = [];
const LEVEL_MULTIPLIERS = [
    1.00,
    1.04,
    1.08,
    1.12,
    1.20,
    1.28,
    1.36,
    1.48,
    1.60,
    1.76,
    2.00
];

function scaleStat(value, multiplier) {
    if (value > 0) {
        return Math.round(value * multiplier);
    }
    return value;
}

async function loadWeapons() {

    const system = await fetch("../../../data/System.json")
        .then(r => r.json());

    const weaponTypes = system.weaponTypes;

    const typeSelect = document.getElementById("weaponTypeFilter");

    const excludedTypes = [3, 5, 8, 9, 12, 14];

    weaponTypes.forEach((typeName, index) => {

        if (
            typeName &&
            !excludedTypes.includes(index)
        ) {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = typeName;
            typeSelect.appendChild(option);
        }

    });

    const upgradeTypeSelect = document.getElementById("upgradeTypeFilter");

    weaponTypes.forEach((typeName, index) => {

        if (
            typeName &&
            !excludedTypes.includes(index)
        ) {
            const option = document.createElement("option");
            option.value = index;
            option.textContent = typeName;

            upgradeTypeSelect.appendChild(option.cloneNode(true));
        }

    });

    const upgradeSearch = document.getElementById("upgradeSearch");
    const upgradeTypeFilter = document.getElementById("upgradeTypeFilter");

    function applyUpgradeFilters() {

        const searchValue = upgradeSearch.value.toLowerCase();
        const selectedType = upgradeTypeFilter.value;

        const filtered = allUpgradeableWeapons.filter(w => {

            const matchesSearch =
                w.name.toLowerCase().includes(searchValue);

            const matchesType =
                selectedType === "all" ||
                w.wtypeId == selectedType;

            return matchesSearch && matchesType;
        });

        renderUpgradeableWeapons(filtered);
    }

    upgradeSearch.addEventListener("input", applyUpgradeFilters);
    upgradeTypeFilter.addEventListener("change", applyUpgradeFilters);

    const weapons = await fetch("../../../data/Weapons.json")
        .then(r => r.json());

    const upgradeableWeapons = weapons
        .filter(w =>
            w &&
            w.note &&
            w.note.includes("<WikiWeapon>") &&
            w.note.includes("<EmberheartSeries>")
        )
        .sort((a, b) => a.price - b.price);
    allUpgradeableWeapons = upgradeableWeapons;
    renderUpgradeableWeapons(allUpgradeableWeapons);

    allWeapons = weapons
        .filter(w =>
            w &&
            w.note &&
            w.note.includes("<WikiWeapon>") &&
            !w.note.includes("<EmberheartSeries>")
        )
        .sort((a, b) => a.price - b.price);

    renderWeapons(allWeapons);

    const searchInput = document.getElementById("weaponSearch");
    const typeFilter = document.getElementById("weaponTypeFilter");

    

    function applyFilters() {

        const searchValue = searchInput.value.toLowerCase();
        const selectedType = typeFilter.value;

        const filtered = allWeapons.filter(w => {

            const matchesSearch =
                w.name.toLowerCase().includes(searchValue);

            const matchesType =
                selectedType === "all" ||
                w.wtypeId == selectedType;

            return matchesSearch && matchesType;
        });

        renderWeapons(filtered);
    }

    const items = await fetch("../../../data/Items.json")
        .then(r => r.json());

    const upgradeGems = items
        .filter(item =>
            item &&
            item.note &&
            item.note.includes("<UpgradeGem>")
        );

    renderGems(upgradeGems);

    searchInput.addEventListener("input", applyFilters);
    typeFilter.addEventListener("change", applyFilters);
}

function renderUpgradeableWeapons(weapons) {

    const container = document.getElementById("upgradeableWeaponsList");

    container.innerHTML = weapons.map(weapon => {

        const iconIndex = weapon.iconIndex;
        const iconX = (iconIndex % 16) * 32;
        const iconY = Math.floor(iconIndex / 16) * 32;

        const description = cleanDescription(weapon.description);

        return `
            <div class="wiki-card upgradeable-card" data-id="${weapon.id}">
                
                <div class="weapon-header">
                    <div style="
                        width:32px;
                        height:32px;
                        background-image:url('../../../img/system/IconSet.png');
                        background-position:-${iconX}px -${iconY}px;">
                    </div>
                    <h3>${weapon.name}</h3>
                </div>

                <p>${description}</p>

                <div class="upgrade-table hidden"></div>

            </div>
        `;

    }).join("");

    setupUpgradeableToggle();
}

function renderWeapons(list) {

    const container = document.getElementById("weaponsList");

    container.innerHTML = list.map(weapon => {

        const iconX = (weapon.iconIndex % 16) * 32;
        const iconY = Math.floor(weapon.iconIndex / 16) * 32;

        const description = cleanDescription(weapon.description || "");

        const params = weapon.params;

        return `
            <div class="wiki-card">

                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                    <div style="
                        width:32px;
                        height:32px;
                        background-image:url('../../../img/system/IconSet.png');
                        background-position:-${iconX}px -${iconY}px;
                        background-repeat:no-repeat;">
                    </div>
                    <h3>${weapon.name}</h3>
                </div>
                <div class="weapon-price">
                    ${weapon.price} G
                </div>
                <p>${description}</p>
                <div class="weapon-params">
                    ${params[0] ? `<div><strong>HP:</strong> ${params[0]}</div>` : ""}
                    ${params[2] ? `<div><strong>ATK:</strong> ${params[2]}</div>` : ""}
                    ${params[3] ? `<div><strong>DEF:</strong> ${params[3]}</div>` : ""}
                    ${params[4] ? `<div><strong>MAT:</strong> ${params[4]}</div>` : ""}
                    ${params[5] ? `<div><strong>MDF:</strong> ${params[5]}</div>` : ""}
                    ${params[6] ? `<div><strong>AGI:</strong> ${params[6]}</div>` : ""}
                    ${params[7] ? `<div><strong>LUK:</strong> ${params[7]}</div>` : ""}
                </div>

            </div>
        `;
    }).join("");
}

function setupToggle() {

    const toggle = document.getElementById("basicWeaponsToggle");
    const section = document.getElementById("basicWeaponsSection");

    toggle.addEventListener("click", () => {

        section.classList.toggle("hidden");
        toggle.classList.toggle("active");

    });
}


function setupUpgradeableToggle() {

    document.querySelectorAll(".upgradeable-card").forEach(card => {

        card.onclick = () => {

            const weaponId = parseInt(card.dataset.id);
            const weapon = allUpgradeableWeapons.find(w => w.id === weaponId);

            const tableContainer = card.querySelector(".upgrade-table");

            if (!tableContainer.classList.contains("hidden")) {
                tableContainer.classList.add("hidden");
                tableContainer.innerHTML = "";
                return;
            }

            tableContainer.innerHTML = generateUpgradeTable(weapon);
            tableContainer.classList.remove("hidden");

        };

    });
}

function generateUpgradeTable(weapon) {

    const paramNames = ["HP","MP","ATK","DEF","MAT","MDF","AGI","LUK"];

    const usefulIndexes = weapon.params
        .map((value, index) => value > 0 ? index : null)
        .filter(index => index !== null);

    let table = `
        <table class="upgrade-stats-table">
            <thead>
                <tr>
                    <th>Level</th>
                    ${usefulIndexes.map(i => `<th>${paramNames[i]}</th>`).join("")}
                </tr>
            </thead>
            <tbody>
    `;

    LEVEL_MULTIPLIERS.forEach((multiplier, level) => {

        table += `<tr><td>+${level}</td>`;

        usefulIndexes.forEach(index => {
            const baseValue = weapon.params[index];
            const scaled = scaleStat(baseValue, multiplier);
            table += `<td>${scaled}</td>`;
        });

        table += `</tr>`;
    });

    table += `
            </tbody>
        </table>
    `;

    return table;
}

function setupUpgradeToggle() {

    const toggle = document.getElementById("upgradeableWeaponsToggle");
    const section = document.getElementById("upgradeableWeaponsSection");

    toggle.addEventListener("click", () => {
        section.classList.toggle("hidden");
        toggle.classList.toggle("active");
    });
}

function renderGems(gems) {

    const container = document.getElementById("gemList");
    if (!container) return;

    container.innerHTML = gems.map(gem => {

        const iconX = (gem.iconIndex % 16) * 32;
        const iconY = Math.floor(gem.iconIndex / 16) * 32;

        const description = cleanDescription(gem.description || "");

        return `
            <div class="wiki-card">

                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                    <div style="
                        width:32px;
                        height:32px;
                        background-image:url('../../../img/system/IconSet.png');
                        background-position:-${iconX}px -${iconY}px;
                        background-repeat:no-repeat;">
                    </div>
                    <h3>${gem.name}</h3>
                </div>

                <p>${description}</p>

            </div>
        `;

    }).join("");
}

setupToggle();
setupUpgradeToggle();
loadWeapons();