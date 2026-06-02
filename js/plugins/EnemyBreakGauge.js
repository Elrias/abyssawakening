(() => {

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

        this._icon.setFrame(0, 0, 0, 0);

        this._icon.scale.x = 0.75;
        this._icon.scale.y = 0.75;

        this._icon.x = -28;
        this._icon.y = -12;

        this.addChild(this._icon);
    }

    update() {
        super.update();

        if (
            !this._enemy ||
            !this._enemy.isAlive()
        ) {
            this.visible = false;
            return;
        }

        const gauge = this._enemy._breakGauge;

        if (!gauge) {
            this.visible = false;
            return;
        }

        this.visible = true;

        const state = $dataStates[gauge.stateId];

        if (state && state.iconIndex > 0) {

            const iconIndex = state.iconIndex;

            const pw = 32;
            const ph = 32;

            const sx = (iconIndex % 16) * pw;
            const sy = Math.floor(iconIndex / 16) * ph;

            this._icon.setFrame(sx, sy, pw, ph);
        } else {
            this._icon.setFrame(0, 0, 0, 0);
        }

        const max = Math.max(1, gauge.max);
        const current = Math.max(0, gauge.current);

        this.bitmap.clear();

        // Fond sombre identique HP
        this.bitmap.fillAll('rgb(25, 25, 25)');

        // Effet lumineux bas
        this.bitmap.fillRect(0, 5, this._width, 1, "rgba(255,255,255,0.1)");
        this.bitmap.fillRect(0, 6, this._width, 1, "rgba(255,255,255,0.3)");

        if (gauge.mode === "damage") {

            const remaining = Math.max(
                0,
                max - current
            );

            const rate = remaining / max;

            const fillWidth =
                this._width * rate;

            this.bitmap.fillRect(
                0,
                0,
                fillWidth,
                7,
                "#ffb300"
            );

            this.bitmap.fillRect(
                0,
                0,
                fillWidth,
                3,
                "rgba(255,255,255,0.3)"
            );

            this.bitmap.fillRect(
                0,
                1,
                fillWidth,
                1,
                "rgba(255,255,255,0.6)"
            );

            } else if (gauge.mode === "segments") {

                const remaining =
                    Math.max(0, max - current);

                // Dessin des segments
                for (let i = 0; i < max; i++) {

                    const active = i < remaining;

                    const x1 = Math.round(i * this._width / max);
                    const x2 = Math.round((i + 1) * this._width / max);

                    this.bitmap.fillRect(
                        x1,
                        0,
                        x2 - x1,
                        7,
                        active ? "#ffb300" : "#222222"
                    );

                    this.bitmap.fillRect(
                        x1,
                        0,
                        x2 - x1,
                        2,
                        active
                            ? "rgba(255,255,255,0.35)"
                            : "rgba(255,255,255,0.05)"
                    );
                }

                // Dessin des séparateurs
                for (let i = 1; i < max; i++) {

                    const x =
                        Math.round(i * this._width / max);

                    this.bitmap.fillRect(
                        x,
                        0,
                        1,
                        7,
                        "#000000"
                    );
                }
            }
    }
}

const _Spriteset_Battle_createEnemies =
Spriteset_Battle.prototype.createEnemies;

Spriteset_Battle.prototype.createEnemies = function() {
    _Spriteset_Battle_createEnemies.call(this);
    this.createEnemyBreakGauges();
};

Spriteset_Battle.prototype.createEnemyBreakGauges = function() {
    if (this._enemyBreakGauges) {
        for (const gauge of this._enemyBreakGauges) {
            this.removeChild(gauge);
        }
    }

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

const _Game_Action_applyGlobal =
    Game_Action.prototype.applyGlobal;

Game_Action.prototype.applyGlobal = function() {

    const subject = this.subject();
    const item = this.item();

    if (
        subject &&
        subject.isActor() &&
        item &&
        DataManager.isSkill(item)
    ) {

        $gameTroop.members().forEach(enemy => {

            const gauge = enemy._breakGauge;

            if (!gauge) return;

            if (
                gauge.trigger === "skillType" &&
                item.stypeId === gauge.skillTypeId
            ) {

                gauge.current++;

                if (gauge.current >= gauge.max) {
                    enemy.removeState(gauge.stateId);
                }
            }
        });
    }

    _Game_Action_applyGlobal.call(this);
};

})();