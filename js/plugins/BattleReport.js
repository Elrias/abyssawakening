/*:
* @target MZ
* @plugindesc Battle Log (history + report scene)
* @author ChatGPT
*/

(() => {

// ------------------------------------------------------------
// SETTINGS
// ------------------------------------------------------------
window.BattleStats = window.BattleStats || {};
const BAR_WIDTH = 600;
const BAR_HEIGHT = 10;

const COLOR_TAKEN = "#3b6cff";
const COLOR_HEAL = "#32cd32";

const ELEMENT_COLORS = [
"#ffffff","#ff4040","#ff8c00","#ffd700","#00fa9a",
"#00ced1","#9370db","#ff1493","#00fa9a"
];

function formatNumber(n) {

    if (n >= 100000) {
        return Math.floor(n / 1000) + "k";
    }

    return Math.floor(n).toString();
}

// ------------------------------------------------------------
// RESET STATS
// ------------------------------------------------------------

const _BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {

    $gameParty.members().forEach(actor => {
        actor._battleStats = {
            damageByElement:{},
            taken:0,
            healing:0
        };
    });
    BattleManager._battleStartTime = Graphics.frameCount;
    _BattleManager_startBattle.call(this);
};

// ------------------------------------------------------------
// TRACK DAMAGE
// ------------------------------------------------------------

const _Game_Action_apply = Game_Action.prototype.apply;

Game_Action.prototype.apply = function(target) {

    const subject = this.subject();

    _Game_Action_apply.call(this, target);

    const result = target.result();
    if (!result) return;

    const value = result.hpDamage;

    if (subject?.isActor() && subject._battleStats) {

        let elementIds = [];

        if (this.item().damage.elementId === -1) {
            elementIds = subject.attackElements();
        } else {
            elementIds = [this.item().damage.elementId];
        }

        if (value > 0) {
            // DÉGÂTS
            elementIds.forEach(id => {
                id = id || 0;

                subject._battleStats.damageByElement[id] =
                    (subject._battleStats.damageByElement[id] || 0) + value;
            });
        }
        else if (value < 0) {
            // HEAL
            subject._battleStats.healing += Math.abs(value);
        }
    }
};

// ------------------------------------------------------------
// SAVE HISTORY (5 combats)
// ------------------------------------------------------------

const _BattleManager_endBattle = BattleManager.endBattle;

BattleManager.endBattle = function(result) {

    _BattleManager_endBattle.call(this, result);

    const turns = $gameTroop.turnCount();
    const isVictory = result === 0; 
    const enemies = $gameTroop.members().map(enemy => enemy.battlerName());
    const totalEnemyHp = $gameTroop.members()
    .reduce((sum, enemy) => sum + Math.max(enemy.hp, 0), 0);

    const totalEnemyMhp = $gameTroop.members()
        .reduce((sum, enemy) => sum + enemy.mhp, 0);

    const enemyHpPercent =
        totalEnemyMhp > 0
            ? Math.floor((totalEnemyHp / totalEnemyMhp) * 100)
            : 0;
    const troopName = $gameTroop.troop().name;
    const data = [];
    const durationFrames = Graphics.frameCount - BattleManager._battleStartTime;
    const seconds = Math.floor(durationFrames / 60);

    $gameParty.members().forEach(actor => {

        if (!actor._battleStats) return;

        data.push({
            name: actor.name(),
            faceName: actor.faceName(),
            faceIndex: actor.faceIndex(),
            stats: JSON.parse(JSON.stringify(actor._battleStats))
        });
    });

    if (!$gameSystem._battleHistory) {
        $gameSystem._battleHistory = [];
    }

    $gameSystem._battleHistory.unshift({
        name: troopName,
        actors: data,
        victory: isVictory,
        enemies: enemies,
        turns: turns,
        time: seconds,
        enemyHpPercent: enemyHpPercent
    });

    if ($gameSystem._battleHistory.length > 5) {
        $gameSystem._battleHistory.pop();
    }
};

// ------------------------------------------------------------
// MENU HANDLER
// ------------------------------------------------------------

const _Scene_Menu_createCommandWindow =
Scene_Menu.prototype.createCommandWindow;

Scene_Menu.prototype.createCommandWindow = function() {

    _Scene_Menu_createCommandWindow.call(this);

    this._commandWindow.setHandler(
        "battleLog",
        () => SceneManager.push(Scene_BattleLogList)
    );
};

// ------------------------------------------------------------
// SCENE : LISTE
// ------------------------------------------------------------

function Scene_BattleLogList() {
    this.initialize(...arguments);
}

Scene_BattleLogList.prototype = Object.create(Scene_MenuBase.prototype);
Scene_BattleLogList.prototype.constructor = Scene_BattleLogList;

Scene_BattleLogList.prototype.create = function() {

    Scene_MenuBase.prototype.create.call(this);

    const margin = 20; 
    const topOffset = 80;

    const width = Graphics.width - margin * 2;
    const height = Graphics.height - topOffset - 20;

    const rect = new Rectangle(
        margin,
        topOffset,
        width,
        height
    );

    this._window = new Window_BattleLogList(rect);

    this._window.setHandler("ok", this.onSelect.bind(this));
    this._window.setHandler("cancel", this.popScene.bind(this));

    this.addWindow(this._window);
};

Scene_BattleLogList.prototype.onSelect = function() {

    const history = $gameSystem._battleHistory || [];
    const index = this._window.index();

    if (!history[index]) return;

    SceneManager.push(Scene_BattleReport);
    SceneManager.prepareNextScene(history[index]);
};

// ------------------------------------------------------------
// WINDOW LISTE
// ------------------------------------------------------------

function Window_BattleLogList(rect){
    this.initialize(rect);
}

Window_BattleLogList.prototype = Object.create(Window_Command.prototype);
Window_BattleLogList.prototype.constructor = Window_BattleLogList;

Window_BattleLogList.prototype.makeCommandList = function(){

    const history = $gameSystem._battleHistory || [];

    if (history.length === 0) {
        this.addCommand("No battle data", "none", false);
        return;
    }

    history.forEach((battle, i) => {

        const name = battle.name || "Unknown";

        this.addCommand(
            "Battle " + (i + 1) + " - " + name,
            "ok"
        );
    });
};

// ------------------------------------------------------------
// SCENE : REPORT
// ------------------------------------------------------------

function Scene_BattleReport() {
    this.initialize(...arguments);
}

Scene_BattleReport.prototype = Object.create(Scene_MenuBase.prototype);
Scene_BattleReport.prototype.constructor = Scene_BattleReport;

Scene_BattleReport.prototype.prepare = function(data){
    this._data = data.actors;
    this._battleMeta = data;
};

Scene_BattleReport.prototype.create = function() {

    Scene_MenuBase.prototype.create.call(this);

    const margin = 20; 
    const topOffset = 80;

    const width = Graphics.width - margin * 2;
    const height = Graphics.height - topOffset - 20;

    const rect = new Rectangle(
        margin,
        topOffset,
        width,
        height
    );

    this._window = new Window_BattleReport(rect, this._battleMeta);

    this.addWindow(this._window);
};

Scene_BattleReport.prototype.update = function() {

    Scene_MenuBase.prototype.update.call(this);

    if (Input.isTriggered("cancel") || TouchInput.isCancelled()) {
        SceneManager.pop();
    }
};

// ------------------------------------------------------------
// WINDOW REPORT
// ------------------------------------------------------------

function Window_BattleReport(rect, data){
    this._battleMeta = data;
    this._data = data?.actors || [];
    this.initialize(rect);
}

Window_BattleReport.prototype = Object.create(Window_Base.prototype);
Window_BattleReport.prototype.constructor = Window_BattleReport;

Window_BattleReport.prototype.initialize = function(rect){
    Window_Base.prototype.initialize.call(this, rect);
    this.refresh();
};

Window_BattleReport.prototype.refresh = function(){
        
    this.contents.clear();
    this.drawLegendRight();
    this.drawBattleInfo();

    const data = this._data;

    if (!data || data.length === 0) {
        this.drawText("No battle data.", 0, 0, 400);
        return;
    }

    let y = 10;

    const maxDamage = Math.max(...data.map(a=>this.totalDamage(a)),1);
    const maxTaken = Math.max(...data.map(a=>a.stats.taken),1);
    const maxHeal = Math.max(...data.map(a=>a.stats.healing),1);

    data.forEach(actor=>{

        const faceHeight = 110; // hauteur visuelle réduite

        this.drawFace(actor.faceName, actor.faceIndex, 0, y, 144, 144);

        const x = 220;

        this.drawText(actor.name, x, y - 15, 300);

        const iconOffsetX = x - 40;

        // positions alignées
        const baseY = y + 30;
        const spacing = 32;

        // DAMAGE
        this.drawIcon(76, iconOffsetX, baseY - 12);
        this.drawDamageBar(actor, x, baseY, maxDamage);

        // TAKEN
        this.drawIcon(81, iconOffsetX, baseY + spacing - 12);
        this.drawTakenBar(actor, x, baseY + spacing, maxTaken);

        // HEAL
        this.drawIcon(72, iconOffsetX, baseY + spacing * 2 - 12);
        this.drawHealBar(actor, x, baseY + spacing * 2, maxHeal);

        y += 150;
    });
};

Window_BattleReport.prototype.totalDamage = function(actor){
    let total = 0;
    for(const id in actor.stats.damageByElement){
        const value = actor.stats.damageByElement[id];
        if (value > 0) total += value;
    }
    return total;
};

Window_BattleReport.prototype.drawDamageBar = function(actor, x, y, max){

    // fond gris
    this.contents.fillRect(x, y, BAR_WIDTH, BAR_HEIGHT, "#2a2a2a");

    let startX = x;
    let total = 0;

    for (const elementId in actor.stats.damageByElement) {

        const value = actor.stats.damageByElement[elementId];
        if (value <= 0) continue;

        total += value;

        const w = BAR_WIDTH * value / max;
        const color = ELEMENT_COLORS[elementId % ELEMENT_COLORS.length];

        // segment coloré
        this.contents.fillRect(startX, y + 2, w, BAR_HEIGHT - 4, color);

        startX += w;
    }

    // TOTAL centré
    this.drawText(
        formatNumber(total),
        x,
        y - 13,
        BAR_WIDTH,
        "center"
    );
};

Window_BattleReport.prototype.drawTakenBar = function(actor,x,y,max){
    const w = BAR_WIDTH * actor.stats.taken / max;

    this.contents.fillRect(x, y, BAR_WIDTH, BAR_HEIGHT, "#2a2a2a");
    this.contents.fillRect(x, y + 2, w, BAR_HEIGHT - 4, COLOR_TAKEN);

        this.drawText(
            formatNumber(actor.stats.taken),
            x,
            y - 13,
            BAR_WIDTH,
            "center"
        );
};

Window_BattleReport.prototype.drawHealBar = function(actor,x,y,max){
    const w = BAR_WIDTH * actor.stats.healing / max;


    this.contents.fillRect(x, y, BAR_WIDTH, BAR_HEIGHT, "#2a2a2a");
    this.contents.fillRect(x, y + 2, w, BAR_HEIGHT - 4, COLOR_HEAL);


        this.drawText(
            formatNumber(actor.stats.healing),
            x,
            y - 13,
            BAR_WIDTH,
            "center"
        );

};

const _Game_Battler_gainHp = Game_Battler.prototype.gainHp;

Game_Battler.prototype.gainHp = function(value) {

    _Game_Battler_gainHp.call(this, value);

    if (value >= 0) return;

    const damage = Math.abs(value);

    // --- DÉGÂTS REÇUS ---
    if (this.isActor() && this._battleStats) {
        this._battleStats.taken += damage;
    }

    // --- DÉGÂTS INFLIGÉS (passives / bonus) ---
    const attacker = this._lastAttacker;

    if (attacker && attacker.isActor() && attacker._battleStats) {

        if (!attacker._battleStats.damageByElement[0]) {
            attacker._battleStats.damageByElement[0] = 0;
        }

        attacker._battleStats.damageByElement[0] += damage;
    }

    // reset pour éviter bugs
    this._lastAttacker = null;
};

const _Game_Battler_addState = Game_Battler.prototype.addState;

Game_Battler.prototype.addState = function(stateId) {

    const user = BattleManager._subject;

    _Game_Battler_addState.call(this, stateId);

    if (user && user.isActor()) {

        if (!this._stateSources) {
            this._stateSources = {};
        }

        this._stateSources[stateId] = {
            actorId: user.actorId()
        };
    }
};

const _Game_Battler_removeState = Game_Battler.prototype.removeState;

Game_Battler.prototype.removeState = function(stateId) {

    _Game_Battler_removeState.call(this, stateId);

    if (this._stateSources) {
        delete this._stateSources[stateId];
    }
    
    if (this._dotInitStates) {
        delete this._dotInitStates[stateId];
    }
};

BattleStats.trackDot = function(user, target, value, elementId) {

    console.log("DOT:", value);

    if (!user || !user.isActor()) return;
    if (!user._battleStats) return;

    const damage = Math.floor(value);
    if (damage <= 0) return;

    user._battleStats.damageByElement[elementId] ??= 0;
    user._battleStats.damageByElement[elementId] += damage;
};

Window_BattleReport.prototype.drawLegendRight = function() {

    const x = this.contentsWidth() - 220;
    let y = 40;

    const elements = [
        { id: 0, name: "Other" },
        { id: 1, name: "Attack" },
        { id: 2, name: "Skill" },
        { id: 3, name: "EX" },
        { id: 4, name: "DoT" }
    ];

    elements.forEach(e => {

        const color = ELEMENT_COLORS[e.id];

        this.contents.fillRect(x, y + 6, 12, 12, color);
        this.drawText(e.name, x + 20, y, 180);

        y += 28;
    });
};

function loadEnemyPortrait(name) {
    return ImageManager.loadBitmap("img/enemies/HBportraits/", name);
}

Window_BattleLogList.prototype.drawItem = function(index) {

    const rect = this.itemLineRect(index);
    
    // hauteur réelle de ton contenu (texte + icône)
    const contentHeight = 100; // adapte si besoin

    // centrage vertical
    const offsetY = Math.floor((this.itemHeight() - contentHeight) / 2);
    const visualOffset = -20;
    const baseY = rect.y + offsetY + visualOffset;

    const battle = ($gameSystem._battleHistory || [])[index];
    if (!battle) return;

    const name = battle.name || "Unknown";
    const resultText = battle.victory ? "Victory" : "Defeat";

    // --- SETTINGS ---
    const iconSize = 64; // taille affichée
    const textX = rect.x + iconSize + 16;

    // ----------------------
    // DRAW ICONS (RESIZE)
    // ----------------------

    let iconX = rect.x;
    let iconY = baseY + 8;

    const enemyName = battle.enemies[0];

    if (enemyName) {
        const bitmap = ImageManager.loadBitmap("img/enemies/HBportraits/", enemyName);

        if (bitmap.isReady()) {
            this.contents.blt(
                bitmap,
                0, 0, bitmap.width, bitmap.height,
                iconX, iconY,
                iconSize, iconSize
            );
        }
    }

    // ----------------------
    // TEXT (3 LINES)
    // ----------------------

    this.resetFontSettings();

    // ligne 1
    this.drawText(
        "Battle " + (index + 1),
        textX,
        baseY,
        rect.width
    );

    // ligne 2
    this.drawText(
        name,
        textX,
        baseY + 22,
        rect.width
    );

    // ligne 3
    this.changeTextColor(battle.victory ? "#66ff66" : "#ff6666");

    this.drawText(
        resultText,
        textX,
        baseY + 44,
        rect.width
    );

    this.resetTextColor();
};

Window_BattleLogList.prototype.itemHeight = function() {
    return 100;
};

Window_BattleReport.prototype.drawBattleInfo = function() {

    const x = this.contentsWidth() - 220;
    let y = 200;

    const battle = this._battleMeta;

    if (!battle) return;

    const minutes = Math.floor(battle.time / 60);
    const seconds = battle.time % 60;

    const timeText =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");

    this.changeTextColor("#aaaaaa");
    this.drawText("Turns :", x, y, 100);

    this.resetTextColor();
    this.drawText(battle.turns, x + 80, y, 100, "right");

    this.changeTextColor("#aaaaaa");
    this.drawText("Time :", x, y + 30, 100);

    this.resetTextColor();
    this.drawText(timeText, x + 80, y + 30, 100, "right");

    this.changeTextColor("#aaaaaa");
    this.drawText("Enemy HP :", x, y + 60, 100);

    this.resetTextColor();

    this.drawText(
        battle.enemyHpPercent + "%",
        x + 80,
        y + 60,
        100,
        "right"
    );
};

Game_Battler.prototype.stateSourceActor = function(stateId) {

    if (!this._stateSources) return null;

    const data = this._stateSources[stateId];

    if (!data) return null;

    return $gameActors.actor(data.actorId);
};

const _BattleManager_endBattle_Cleanup =
BattleManager.endBattle;

BattleManager.endBattle = function(result) {

    $gameParty.members().forEach(actor => {

        delete actor._stateSources;
        delete actor._lastAttacker;
    });

    $gameTroop.members().forEach(enemy => {

        delete enemy._stateSources;
        delete enemy._lastAttacker;
    });

    _BattleManager_endBattle_Cleanup.call(this, result);
};

})();