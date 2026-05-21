(() => {
  "use strict";

  function mainSpriteOf(spriteBattler) {
    return spriteBattler._mainSprite || spriteBattler;
  }

  function battlerOf(spriteBattler) {
    return spriteBattler && spriteBattler._battler;
  }

  function getTintFromState(state) {
    if (!state || !state.note) return null;

    const match = state.note.match(/<Tint:\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)>/i);
    if (match) {
      return [
        Number(match[1]),
        Number(match[2]),
        Number(match[3]),
        Number(match[4])
      ];
    }
    return null;
  }

  function getBattlerTint(battler) {
    if (!battler || !battler.states) return null;

    const states = battler.states();

    // Priorité : dernier state trouvé avec tint
    for (let i = states.length - 1; i >= 0; i--) {
      const tint = getTintFromState(states[i]);
      if (tint) return tint;
    }

    return null;
  }

  const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
  Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.call(this);
    this._tint_applied = false;
    this._baseTone = null;
  };

  const _Sprite_Battler_update = Sprite_Battler.prototype.update;
  Sprite_Battler.prototype.update = function() {
    _Sprite_Battler_update.call(this);

    const b = battlerOf(this);
    if (!b) return;

    const spr = mainSpriteOf(this);
    const tint = getBattlerTint(b);

    if (tint && !this._tint_applied) {
      this._baseTone = (spr._colorTone ? spr._colorTone.slice() : [0,0,0,0]);
      this._tint_applied = true;
    }

    if (tint) {
      spr.setColorTone(tint);
    } else if (this._tint_applied) {
      spr.setColorTone(this._baseTone || [0,0,0,0]);
      this._tint_applied = false;
    }
  };
})();