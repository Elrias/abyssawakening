(() => {

const METEOR_ENEMY_ID = 77;
const MAX_TP = 50;
const TOTAL_FALL_DISTANCE = 240;
const SMOOTH_SPEED = 0.08;

const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_setBattler.call(this, battler);

    if (battler && battler.enemyId() === METEOR_ENEMY_ID) {
        this._meteorBaseY = this.y;
        this._meteorVisualY = this.y;
        battler._meteorMaxTpReached = 0; 
    }
};

const _Sprite_Enemy_updatePosition = Sprite_Enemy.prototype.updatePosition;
Sprite_Enemy.prototype.updatePosition = function() {
    _Sprite_Enemy_updatePosition.call(this);

    const battler = this._battler;
    if (!battler) return;
    if (battler.enemyId() !== METEOR_ENEMY_ID) return;
    if (this._meteorBaseY === undefined) return;

    if (battler.tp > battler._meteorMaxTpReached) {
        battler._meteorMaxTpReached = battler.tp;
    }

    const effectiveTp = Math.min(battler._meteorMaxTpReached, MAX_TP);

    const tpRatio = effectiveTp / MAX_TP;
    const targetY = this._meteorBaseY + (tpRatio * TOTAL_FALL_DISTANCE);

    this._meteorVisualY += (targetY - this._meteorVisualY) * SMOOTH_SPEED;
    this.y = this._meteorVisualY;
};

})();