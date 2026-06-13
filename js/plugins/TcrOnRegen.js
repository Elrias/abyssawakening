/*:
 * @target MZ
 * @plugindesc Applique TCR à tous les gains de TP (regen, skills, items, etc.) sans double application.
 * @author Elrias
 *
 * @help
 * - Applique TCR aux gains TP :
 *   - TP Regeneration (TRG)
 *   - Effets "Gain TP"
 *   - Scripts utilisant gainTp/gainSilentTp
 *
 * - Évite la double application :
 *   - TP gagné en prenant des dégâts
 *   - Regen TP
 */

(() => {

  // -------------------------------------------------------------------------
  // Options
  // -------------------------------------------------------------------------

  const BLOCK_TURN0_REGEN_ACTORS = true;

  // -------------------------------------------------------------------------
  // Bypass utilitaire
  // -------------------------------------------------------------------------

  function withTcrTpBypass(battler, fn) {
    battler._tcrTpBypassDepth = (battler._tcrTpBypassDepth || 0) + 1;

    try {
      return fn();
    } finally {
      battler._tcrTpBypassDepth--;

      if (battler._tcrTpBypassDepth <= 0) {
        battler._tcrTpBypassDepth = 0;
      }
    }
  }

  function shouldBypassTcrTp(battler) {
    return (battler._tcrTpBypassDepth || 0) > 0;
  }

  function scaleTpGain(battler, value) {
    if (value <= 0) return value;

    const tcr = typeof battler.tcr === "number"
      ? battler.tcr
      : 1;

    return Math.floor(value * tcr);
  }

  // -------------------------------------------------------------------------
  // gainTp
  // -------------------------------------------------------------------------

  const _gainTp = Game_BattlerBase.prototype.gainTp;

  Game_BattlerBase.prototype.gainTp = function(value) {

    if (!shouldBypassTcrTp(this)) {
      value = scaleTpGain(this, value);
    }

    return _gainTp.call(this, value);
  };

  // -------------------------------------------------------------------------
  // gainSilentTp
  // -------------------------------------------------------------------------

  const _gainSilentTp = Game_BattlerBase.prototype.gainSilentTp;

  Game_BattlerBase.prototype.gainSilentTp = function(value) {

    if (!shouldBypassTcrTp(this)) {
      value = scaleTpGain(this, value);
    }

    return _gainSilentTp.call(this, value);
  };

  // -------------------------------------------------------------------------
  // TP par dégâts
  // -------------------------------------------------------------------------

  if (Game_Battler.prototype.chargeTpByDamage) {

    const _chargeTpByDamage =
      Game_Battler.prototype.chargeTpByDamage;

    Game_Battler.prototype.chargeTpByDamage = function(damageRate) {

      return withTcrTpBypass(this, () => {
        return _chargeTpByDamage.call(this, damageRate);
      });
    };
  }

  // -------------------------------------------------------------------------
  // Regen TP (TRG)
  // -------------------------------------------------------------------------

  Game_Battler.prototype.regenerateTp = function() {

    // Pas de regen avant le vrai début du combat
    if (!BattleManager._phase || BattleManager._phase === "start") {
      return;
    }

    // Regen vanilla
    let value = Math.floor(100 * this.trg);

    // Application TCR
    value = Math.floor(value * this.tcr);

    // bypass pour éviter double scaling
    withTcrTpBypass(this, () => {
      this.gainSilentTp(value);
    });
  };

  // -------------------------------------------------------------------------
  // Effet "Gain TP"
  // -------------------------------------------------------------------------

  if (Game_Action.prototype.itemEffectGainTp) {

    const _itemEffectGainTp =
      Game_Action.prototype.itemEffectGainTp;

    Game_Action.prototype.itemEffectGainTp =
      function(target, effect) {

        if (effect && effect.value1 > 0) {

          const base = effect.value1;
          const scaled =
            Math.floor(base * target.tcr);

          return withTcrTpBypass(target, () => {

            const old = effect.value1;

            effect.value1 = scaled;

            try {
              return _itemEffectGainTp.call(
                this,
                target,
                effect
              );

            } finally {
              effect.value1 = old;
            }
          });
        }

        return _itemEffectGainTp.call(
          this,
          target,
          effect
        );
      };
  }

})();