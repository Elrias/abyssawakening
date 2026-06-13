/*:
 * @target MZ
 * @plugindesc Battle Turn Counter DEBUG
 * @author Elrias
 */

(() => {

    const POS_Y = 350;

    function Sprite_TurnCounter() {
        this.initialize(...arguments);
    }

    Sprite_TurnCounter.prototype =
        Object.create(Sprite.prototype);

    Sprite_TurnCounter.prototype.constructor =
        Sprite_TurnCounter;

    Sprite_TurnCounter.prototype.initialize = function() {

        Sprite.prototype.initialize.call(this);

        this.bitmap = new Bitmap(180, 50);

        this.x = Graphics.width - 190;
        this.y = POS_Y;

        this.visible = true;
        this.opacity = 255;

        this._lastTurn = -1;

        this.refresh();
    };

    Sprite_TurnCounter.prototype.refresh = function() {

        this.bitmap.clear();

        this.bitmap.fontFace = "GameFont";

        this.bitmap.fontSize = 26;
        this.bitmap.fontBold = false;
        this.bitmap.fontItalic = false;

        this.bitmap.textColor = "#f8f1d4";

        this.bitmap.outlineColor = "rgba(0,0,0,0.8)";
        this.bitmap.outlineWidth = 4;

        const turn = Math.max($gameTroop.turnCount(), 1);

        this.bitmap.drawText(
            "Turn " + turn,
            0,
            0,
            180,
            50,
            "center"
        );
    };

    Sprite_TurnCounter.prototype.update = function() {

        Sprite.prototype.update.call(this);

        const turn = Math.max($gameTroop.turnCount(), 1);

        if (turn !== this._lastTurn) {

            this._lastTurn = turn;

            this.refresh();
        }
    };

    // ------------------------------------------------------------
    // TEST : SCENE_BATTLE
    // ------------------------------------------------------------

    const _Scene_Battle_create =
        Scene_Battle.prototype.create;

    Scene_Battle.prototype.create = function() {

        _Scene_Battle_create.call(this);

        this._turnCounterSprite =
            new Sprite_TurnCounter();

        this.addChild(this._turnCounterSprite);
    };

})();