/*:
 * @target MZ
 * @plugindesc Plugin pour ajouter des effets de respiration, flottement et redimensionnement des ennemis en vue de côté dans RPG Maker MZ.
 * @author VotreNom
 *
 * @help
 * Ce plugin permet d'animer les ennemis avec des effets de respiration, flottement, et redimensionnement en vue de côté.
 *
 * Notetags pour les ennemis :
 *
 * <Breathing>
 * <No Breathing>
 * Active ou désactive l'effet de respiration pour le sprite de l'ennemi.
 *
 * <Breathing Speed: x>
 * Définit la vitesse de respiration en nombre de frames. Une valeur plus basse signifie une respiration plus rapide.
 *
 * <Breathing Rate X: x.y>
 * <Breathing Rate Y: x.y>
 * Définit les taux de respiration horizontaux et verticaux. 1.0 correspond à une variation de 100%, tandis que 0.0 correspond à aucune variation.
 *
 * <Enable HP Link Breathing>
 * <Disable HP Link Breathing>
 * Active ou désactive la respiration liée à la santé (HP). Plus la santé de l'ennemi est basse, plus la respiration est lente.
 *
 * <Floating>
 * Définit l'ennemi comme flottant.
 *
 * <Floating Speed: x>
 * Définit la vitesse de flottement en nombre de frames. Une valeur plus basse signifie un flottement plus rapide.
 *
 * <Floating Rate: x.y>
 * Définit le taux de flottement. 1.0 correspond à une variation de 100%, tandis que 0.0 correspond à aucune variation.
 *
 * <Floating Height: x>
 * Définit la hauteur minimale de flottement de l'ennemi.
 *
 * <Floating Death>
 * <No Floating Death>
 * Définit si l'ennemi flotte ou non après la mort.
 *
 * <Scale Sprite: x%>
 * Permet de redimensionner le sprite de l'ennemi par x% de la taille originale.
 *
 * <Scale Sprite Width: x%>
 * <Scale Sprite Height: x%>
 * Permet de redimensionner la largeur ou la hauteur du sprite spécifiquement par x%.
 */

(() => {
    const pluginName = 'MZ_AnimatedSVEnemies';

    const _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function() {
        if (!_DataManager_isDatabaseLoaded.call(this)) return false;
        if (!this._SVENotetagsLoaded) {
            this.processSVENotetags($dataEnemies);
            this._SVENotetagsLoaded = true;
        }
        return true;
    };

    DataManager.processSVENotetags = function(group) {
        const noteHeat = /<(?:HEAT DISTORTION)>/i;
        const noteHeatSpeed = /<(?:HEAT SPEED):[ ]*(\d+)>/i;
        const noteHeatPower = /<(?:HEAT POWER):[ ]*(\d+)[.](\d+)>/i;
        const noteBreathing = /<(?:BREATHING)>/i;
        const noteNoBreathing = /<(?:NO BREATHING)>/i;
        const noteBreathSpeed = /<(?:BREATHING SPEED):[ ]*(\d+)>/i;
        const noteBreathRateX = /<(?:BREATHING RATE X):[ ]*(\d+)[.](\d+)>/i;
        const noteBreathRateY = /<(?:BREATHING RATE Y):[ ]*(\d+)[.](\d+)>/i;
        const noteEnableHPLinkBreathing = /<(?:ENABLE HP LINK BREATHING)>/i;
        const noteDisableHPLinkBreathing = /<(?:DISABLE HP LINK BREATHING)>/i;
        const noteFloating = /<(?:FLOATING)>/i;
        const noteFloatSpeed = /<(?:FLOATING SPEED):[ ]*(\d+)>/i;
        const noteFloatRate = /<(?:FLOATING RATE):[ ]*(\d+)[.](\d+)>/i;
        const noteFloatHeight = /<(?:FLOATING HEIGHT):[ ]*(\d+)>/i;
        const noteFloatDeath = /<(?:FLOATING DEATH)>/i;
        const noteNoFloatDeath = /<(?:NO FLOATING DEATH)>/i;
        const noteScaleSprite = /<(?:SCALE SPRITE):[ ]*(\d+)[%％]>/i;
        const noteScaleSpriteWidth = /<(?:SCALE SPRITE WIDTH):[ ]*(\d+)[%％]>/i;
        const noteScaleSpriteHeight = /<(?:SCALE SPRITE HEIGHT):[ ]*(\d+)[%％]>/i;

        for (let n = 1; n < group.length; n++) {
            const obj = group[n];
            const notedata = obj.note.split(/[\r\n]+/);
            obj.sveHeat = false;
            obj.sveHeatSpeed = 4;
            obj.sveHeatPower = 0.003;
            obj.sveBreathing = false;
            obj.sveBreathSpeed = 20;
            obj.sveBreathRateX = 0.1;
            obj.sveBreathRateY = 0.1;
            obj.sveHPLinkBreathing = false;
            obj.sveFloating = false;
            obj.sveFloatSpeed = 20;
            obj.sveFloatRate = 0.3;
            obj.sveFloatHeight = 50;
            obj.sveFloatDeath = true;
            obj.sveScaleX = 1.0;
            obj.sveScaleY = 1.0;

            for (let i = 0; i < notedata.length; i++) {
                let line = notedata[i];
                if (line.match(noteBreathing)) {
                    obj.sveBreathing = true;
                } else if (line.match(noteNoBreathing)) {
                    obj.sveBreathing = false;
                } else if (line.match(noteBreathSpeed)) {
                    obj.sveBreathSpeed = parseInt(RegExp.$1);
                } else if (line.match(noteBreathRateX)) {
                    obj.sveBreathRateX = parseFloat(RegExp.$1 + '.' + RegExp.$2);
                } else if (line.match(noteBreathRateY)) {
                    obj.sveBreathRateY = parseFloat(RegExp.$1 + '.' + RegExp.$2);
                } else if (line.match(noteEnableHPLinkBreathing)) {
                    obj.sveHPLinkBreathing = true;
                } else if (line.match(noteDisableHPLinkBreathing)) {
                    obj.sveHPLinkBreathing = false;
                } else if (line.match(noteFloating)) {
                    obj.sveFloating = true;
                } else if (line.match(noteFloatSpeed)) {
                    obj.sveFloatSpeed = parseInt(RegExp.$1);
                } else if (line.match(noteFloatRate)) {
                    obj.sveFloatRate = parseFloat(RegExp.$1 + '.' + RegExp.$2);
                } else if (line.match(noteFloatHeight)) {
                    obj.sveFloatHeight = parseInt(RegExp.$1);
                } else if (line.match(noteFloatDeath)) {
                    obj.sveFloatDeath = true;
                } else if (line.match(noteNoFloatDeath)) {
                    obj.sveFloatDeath = false;
                } else if (line.match(noteScaleSprite)) {
                    obj.sveScaleX = parseFloat(RegExp.$1) * 0.01;
                    obj.sveScaleY = obj.sveScaleX;
                } else if (line.match(noteScaleSpriteWidth)) {
                    obj.sveScaleX = parseFloat(RegExp.$1) * 0.01;
                } else if (line.match(noteScaleSpriteHeight)) {
                    obj.sveScaleY = parseFloat(RegExp.$1) * 0.01;
                } else if (line.match(noteHeat)) {
                    obj.sveHeat = true;
                } else if (line.match(noteHeatSpeed)) {
                    obj.sveHeatSpeed = parseInt(RegExp.$1);
                } else if (line.match(noteHeatPower)) {
                    obj.sveHeatPower = parseFloat(RegExp.$1 + '.' + RegExp.$2);
                }
            }
        }
    };

    const _Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function() {
        _Sprite_Enemy_updateBitmap.call(this);
        const enemy = this._enemy;
        if (enemy) {
            this._sveBreathing = enemy.enemy().sveBreathing;
            this._sveBreathSpeed = enemy.enemy().sveBreathSpeed;
            this._sveBreathRateX = enemy.enemy().sveBreathRateX;
            this._sveBreathRateY = enemy.enemy().sveBreathRateY;
            this._sveHPLinkBreathing = enemy.enemy().sveHPLinkBreathing;
            this._sveFloating = enemy.enemy().sveFloating;
            this._sveFloatSpeed = enemy.enemy().sveFloatSpeed;
            this._sveFloatRate = enemy.enemy().sveFloatRate;
            this._sveFloatHeight = enemy.enemy().sveFloatHeight;
            this._sveFloatDeath = enemy.enemy().sveFloatDeath;
            this._sveScaleX = enemy.enemy().sveScaleX;
            this._sveScaleY = enemy.enemy().sveScaleY;
            this._sveHeat = enemy.enemy().sveHeat;
            this._sveHeatSpeed = enemy.enemy().sveHeatSpeed;
            this._sveHeatPower = enemy.enemy().sveHeatPower;
            this.scale.x = this._sveScaleX;
            this.scale.y = this._sveScaleY;
        }
    };

    const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
    Sprite_Enemy.prototype.update = function() {
        _Sprite_Enemy_update.call(this);
        this.updateBreathing();
        this.updateFloating();
        this.updateHeat();
    };

    Sprite_Enemy.prototype.updateBreathing = function() {
        if (this._sveBreathing) {
            const speed = this._sveBreathSpeed;
            const rateX = this._sveBreathRateX;
            const rateY = this._sveBreathRateY;
            const hpRate = this._sveHPLinkBreathing ? this._enemy.hpRate() : 1;

            this.scale.x = this._sveScaleX + Math.sin(Graphics.frameCount / speed) * rateX * hpRate;
            this.scale.y = this._sveScaleY + Math.sin(Graphics.frameCount / speed) * rateY * hpRate;
        }
    };

    Sprite_Enemy.prototype.updateFloating = function() {
        if (this._sveFloating) {
            const speed = this._sveFloatSpeed;
            const rate = this._sveFloatRate;
            const height = this._sveFloatHeight;

            this.y += Math.sin(Graphics.frameCount / speed) * rate * height;
        }
    };

    Sprite_Enemy.prototype.updateHeat = function() {
        if (!this._sveHeat) return;

        const speed = this._sveHeatSpeed;
        const power = this._sveHeatPower;

        const t = Graphics.frameCount / speed;

        this.scale.x += Math.sin(t * 3.3) * power;
        this.scale.y += Math.cos(t * 2.7) * power;

        this.x += Math.sin(t * 5.1) * (power * 40);
    };
})();
