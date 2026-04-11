/*:
 * @target MZ
 * @plugindesc Tint (blue) battlers while a specific state is active (e.g. Deep Freeze). v1.1
 *
 * @param stateId
 * @text State ID (Deep Freeze)
 * @type number
 * @default 261
 *
 * @param toneR
 * @text Tone R
 * @type number
 * @min -255
 * @max 255
 * @default -68
 *
 * @param toneG
 * @text Tone G
 * @type number
 * @min -255
 * @max 255
 * @default -34
 *
 * @param toneB
 * @text Tone B
 * @type number
 * @min -255
 * @max 255
 * @default 102
 *
 * @param toneGray
 * @text Tone Gray
 * @type number
 * @min 0
 * @max 255
 * @default 0
 */

(() => {
  "use strict";

  const P = PluginManager.parameters("DeepFreezeTint");
  const STATE_ID = Number(P.stateId || 261);
  const TONE = [
    Number(P.toneR || -68),
    Number(P.toneG || -34),
    Number(P.toneB || 102),
    Number(P.toneGray || 0),
  ];

  function mainSpriteOf(spriteBattler) {
    // Sprite_Actor et Sprite_Enemy ont souvent _mainSprite
    return spriteBattler._mainSprite || spriteBattler;
  }

  function battlerOf(spriteBattler) {
    return spriteBattler && spriteBattler._battler;
  }

  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.call(this);
    this._df_applied = false;
    this._df_baseTone = null;
  };

  const _Sprite_Battler_update = Sprite_Battler.prototype.update;
  Sprite_Battler.prototype.update = function() {
    _Sprite_Battler_update.call(this);

    const b = battlerOf(this);
    if (!b || !b.isStateAffected) return;

    const spr = mainSpriteOf(this);
    const frozen = b.isStateAffected(STATE_ID);

    if (frozen && !this._df_applied) {
      // snapshot de la tone actuelle du main sprite
      this._df_baseTone = (spr._colorTone ? spr._colorTone.slice() : [0,0,0,0]);
      this._df_applied = true;
    }

    if (frozen) {
      spr.setColorTone(TONE);
    } else if (this._df_applied) {
      spr.setColorTone(this._df_baseTone || [0,0,0,0]);
      this._df_applied = false;
    }
  };
})();
