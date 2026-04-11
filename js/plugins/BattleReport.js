/*:
* @target MZ
* @plugindesc Battle Statistics Overlay (TAB during Victory Aftermath)
* @author ChatGPT
*/

(() => {

// ------------------------------------------------------------
// SETTINGS
// ------------------------------------------------------------

const BAR_WIDTH = 320;
const BAR_HEIGHT = 14;

const COLOR_TAKEN = "#3b6cff";
const COLOR_HEAL = "#32cd32";

const ELEMENT_COLORS = [
"#ff4040","#ff8c00","#ffd700","#7CFC00",
"#00ced1","#9370db","#ff1493","#00fa9a"
];

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

    _BattleManager_startBattle.call(this);

};

// ------------------------------------------------------------
// TRACK DAMAGE
// ------------------------------------------------------------

const _Game_Action_apply = Game_Action.prototype.apply;

Game_Action.prototype.apply = function(target) {

    const subject = this.subject();

    _Game_Action_apply.call(this,target);

    const result = target.result();
    if(!result) return;

    const value = result.hpDamage;

    if(subject && subject.isActor() && value > 0){

        const stats = subject._battleStats;

        const elementId = this.item().damage.elementId || 0;

        if(!stats.damageByElement[elementId]){
            stats.damageByElement[elementId] = 0;
        }

        stats.damageByElement[elementId] += value;

    }

    if(target && target.isActor() && value > 0){
        target._battleStats.taken += value;
    }

    if(subject && subject.isActor() && value < 0){
        subject._battleStats.healing += Math.abs(value);
    }

};

// ------------------------------------------------------------
// BATTLE REPORT WINDOW
// ------------------------------------------------------------

function Window_BattleReport(rect){
    this.initialize(rect);
}

Window_BattleReport.prototype = Object.create(Window_Base.prototype);
Window_BattleReport.prototype.constructor = Window_BattleReport;

Window_BattleReport.prototype.initialize = function(rect){

    Window_Base.prototype.initialize.call(this,rect);

    this.refresh();

};

Window_BattleReport.prototype.refresh = function(){

    this.contents.clear();

    let y = 40;

    const actors = $gameParty.battleMembers();

    const maxDamage = Math.max(...actors.map(a=>this.totalDamage(a)),1);
    const maxTaken = Math.max(...actors.map(a=>a._battleStats.taken),1);
    const maxHeal = Math.max(...actors.map(a=>a._battleStats.healing),1);

    actors.forEach(actor=>{

        this.drawFace(actor.faceName(),actor.faceIndex(),0,y,144,144);

        const x = 160;

        this.drawDamageBar(actor,x,y,maxDamage);
        this.drawTakenBar(actor,x,y+40,maxTaken);
        this.drawHealBar(actor,x,y+80,maxHeal);

        y += 160;

    });

};

Window_BattleReport.prototype.totalDamage = function(actor){

    let total = 0;

    const stats = actor._battleStats.damageByElement;

    for(const id in stats){
        total += stats[id];
    }

    return total;

};

Window_BattleReport.prototype.drawDamageBar = function(actor,x,y,max){

    const stats = actor._battleStats.damageByElement;

    let startX = x;

    for(const elementId in stats){

        const value = stats[elementId];

        const color = ELEMENT_COLORS[elementId % ELEMENT_COLORS.length];

        const w = BAR_WIDTH * value / max;

        this.contents.fillRect(startX,y,w,BAR_HEIGHT,color);

        startX += w;

    }

};

Window_BattleReport.prototype.drawTakenBar = function(actor,x,y,max){

    const value = actor._battleStats.taken;

    const w = BAR_WIDTH * value / max;

    this.contents.fillRect(x,y,w,BAR_HEIGHT,COLOR_TAKEN);

};

Window_BattleReport.prototype.drawHealBar = function(actor,x,y,max){

    const value = actor._battleStats.healing;

    const w = BAR_WIDTH * value / max;

    this.contents.fillRect(x,y,w,BAR_HEIGHT,COLOR_HEAL);

};

// ------------------------------------------------------------
// LABEL WINDOW
// ------------------------------------------------------------

function Window_BattleStatsHint(rect){
    this.initialize(rect);
}

Window_BattleStatsHint.prototype = Object.create(Window_Base.prototype);
Window_BattleStatsHint.prototype.constructor = Window_BattleStatsHint;

Window_BattleStatsHint.prototype.initialize = function(rect){

    Window_Base.prototype.initialize.call(this,rect);

    this.opacity = 0;

    this.refresh();

};

Window_BattleStatsHint.prototype.refresh = function(){

    this.contents.clear();

    this.drawText(
        "TAB - Battle Statistics",
        0,
        0,
        this.contentsWidth(),
        "right"
    );

};

// ------------------------------------------------------------
// SCENE BATTLE HOOK
// ------------------------------------------------------------

const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;

Scene_Battle.prototype.createAllWindows = function(){

    _Scene_Battle_createAllWindows.call(this);

    const rect = new Rectangle(
        Graphics.width - 300,
        Graphics.height - 80,
        300,
        40
    );

    this._battleStatsHint = new Window_BattleStatsHint(rect);

    this.addWindow(this._battleStatsHint);

};

// ------------------------------------------------------------
// TAB TOGGLE
// ------------------------------------------------------------

const _Scene_Battle_update = Scene_Battle.prototype.update;

Scene_Battle.prototype.update = function(){

    _Scene_Battle_update.call(this);

    const victory = BattleManager._phase === "battleEnd";

    if(!victory){

        if(this._battleStatsHint){
            this._battleStatsHint.visible = false;
        }

        return;
    }

    if(this._battleStatsHint){
        this._battleStatsHint.visible = true;
    }

    if(Input.isTriggered("tab")){

        if(this._battleReportWindow){

            this.removeChild(this._battleReportWindow);
            this._battleReportWindow = null;

        }else{

            const rect = new Rectangle(
                0,
                0,
                Graphics.width,
                Graphics.height
            );

            this._battleReportWindow = new Window_BattleReport(rect);

            this.addWindow(this._battleReportWindow);

        }

    }

};

})();