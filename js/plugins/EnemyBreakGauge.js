(() => {

const PREPARATION_STATE_ID = 299;
const ICON_SIZE = 32;

class Sprite_EnemyBreakGauge extends Sprite {
    initialize(enemy, width) {
        super.initialize();
        this._enemy = enemy;
        this._width = width;
        this.bitmap = new Bitmap(width, 7);
        this.createIcon();
    }

    createIcon() {
        this._icon = new Sprite();
        this._icon.bitmap = ImageManager.loadSystem("IconSet");

        const state = $dataStates[PREPARATION_STATE_ID];
        const iconIndex = state.iconIndex;

        const pw = 32;
        const ph = 32;
        const sx = (iconIndex % 16) * pw;
        const sy = Math.floor(iconIndex / 16) * ph;

        this._icon.setFrame(sx, sy, pw, ph);
        this._icon.scale.x = this._icon.scale.y = 0.75;
        this._icon.x = -28;
        this._icon.y = -12;

        this.addChild(this._icon);
    }

    update() {
        super.update();

        if (!this._enemy ||
            !this._enemy.isAlive() ||
            !this._enemy.isStateAffected(PREPARATION_STATE_ID)) {
            this.visible = false;
            return;
        }

        this.visible = true;

        const max = this._enemy._prepThreshold || 1;
        const current = Math.max(0, max - (this._enemy._prepDamage || 0));
        const rate = current / max;

        this.bitmap.clear();

        // Fond sombre identique HP
        this.bitmap.fillAll('rgb(25, 25, 25)');

        // Effet lumineux bas
        this.bitmap.fillRect(0, 5, this._width, 1, "rgba(255,255,255,0.1)");
        this.bitmap.fillRect(0, 6, this._width, 1, "rgba(255,255,255,0.3)");

        // Jauge jaune/orange
        this.bitmap.fillRect(0, 0, this._width * rate, 7, '#ffb300');

        // Effet lumineux haut
        this.bitmap.fillRect(0, 0, this._width * rate, 3, "rgba(255,255,255,0.3)");
        this.bitmap.fillRect(0, 1, this._width * rate, 1, "rgba(255,255,255,0.6)");
    }
}

const _Spriteset_Battle_createEnemies =
Spriteset_Battle.prototype.createEnemies;

Spriteset_Battle.prototype.createEnemies = function() {
    _Spriteset_Battle_createEnemies.call(this);
    this.createEnemyBreakGauges();
};

Spriteset_Battle.prototype.createEnemyBreakGauges = function() {
    this._enemyBreakGauges = [];

    const visibleEnemies = this._enemySprites.filter(sprite =>
        sprite._battler &&
        sprite._battler.isAlive() &&
        !sprite._battler.isHidden()
    );

    const numEnemies = visibleEnemies.length;
    const hpWidth = numEnemies === 1 ? 400 : 200;
    const barWidth = hpWidth / 2;

    visibleEnemies.forEach((enemySprite) => {
        const gauge = new Sprite_EnemyBreakGauge(enemySprite._battler, barWidth);

        gauge.x = enemySprite.healthBarX + (hpWidth / 2) - (barWidth / 2);
        gauge.y = enemySprite.healthBarY + 40;

        this.addChild(gauge);
        this._enemyBreakGauges.push(gauge);
    });
};

const _Spriteset_Battle_updateBreak =
Spriteset_Battle.prototype.update;

Spriteset_Battle.prototype.update = function() {
    _Spriteset_Battle_updateBreak.call(this);

    const aliveCount = this._enemySprites.filter(sprite =>
        sprite._battler && sprite._battler.isAlive()
    ).length;

    if (this._lastAliveCountBreak !== aliveCount) {
        this._lastAliveCountBreak = aliveCount;
        this.createEnemyBreakGauges();
    }
};

})();