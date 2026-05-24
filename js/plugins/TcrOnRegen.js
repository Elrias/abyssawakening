/*:
 * @target MZ
 * @plugindesc Applique TCR à tous les gains de TP (items, skills, effects, regen, etc.) sans double-appliquer sur TP par dégâts.
 * @author You
 *
 * @help
 * - Multiplie tous les gains de TP via gainTp() / gainSilentTp() par this.tcr.
 * - Évite la double application sur le TP gagné en prenant des dégâts (chargeTpByDamage),
 *   qui applique déjà généralement TCR dans le calcul.
 *
 * Optionnel:
 * - Bloque la régén TP au tour 0 pour les ACTEURS (comme ton ancien script).
 */

(() => {
  // --- Options (reprend l'esprit de ton TcrOnRegen.js) ---
  const BLOCK_TURN0_REGEN_ACTORS = true;

  // --- Outil: bypass pour éviter double-application ---
  function withTcrTpBypass(battler, fn) {
    battler._tcrTpBypassDepth = (battler._tcrTpBypassDepth || 0) + 1;
    try { return fn(); }
    finally {
      battler._tcrTpBypassDepth--;
      if (battler._tcrTpBypassDepth <= 0) battler._tcrTpBypassDepth = 0;
    }
  }

  function shouldBypassTcrTp(battler) {
    return (battler._tcrTpBypassDepth || 0) > 0;
  }

  function scaleTpGain(battler, value) {
    // On ne scale que les gains positifs (évite de rendre les drains/burns bizarres)
    if (value <= 0) return value;
    const tcr = (typeof battler.tcr === "number") ? battler.tcr : 1;
    return Math.floor(value * tcr);
  }

  // --- Hook global: gainTp ---
  const _gainTp = Game_BattlerBase.prototype.gainTp;
  Game_BattlerBase.prototype.gainTp = function(value) {
    if (!shouldBypassTcrTp(this)) {
      value = scaleTpGain(this, value);
    }
    return _gainTp.call(this, value);
  };

  // --- Hook global: gainSilentTp (regen, scripts, etc.) ---
  const _gainSilentTp = Game_BattlerBase.prototype.gainSilentTp;
  Game_BattlerBase.prototype.gainSilentTp = function(value) {
    if (!shouldBypassTcrTp(this)) {
      value = scaleTpGain(this, value);
    }
    return _gainSilentTp.call(this, value);
  };

  // --- IMPORTANT: éviter double TCR sur TP par dégâts ---
  // Le moteur (souvent) applique déjà TCR dans chargeTpByDamage().
  if (Game_Battler.prototype.chargeTpByDamage) {
    const _chargeTpByDamage = Game_Battler.prototype.chargeTpByDamage;
    Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
      return withTcrTpBypass(this, () => _chargeTpByDamage.call(this, damageRate));
    };
  }

  // --- Option: bloquer regen TP tour 0 pour les ACTEURS (sans multiplier "extra") ---
  const _regenerateTp = Game_Battler.prototype.regenerateTp;
  Game_Battler.prototype.regenerateTp = function() {
    const turn = ($gameTroop?.turnCount?.() ?? 0);
    if (BLOCK_TURN0_REGEN_ACTORS && turn === 0 && this.isActor?.()) {
      return;
    }
    return _regenerateTp.call(this);
  };

  // --- TCR sur l'effet "Gain TP" (items/skills) de façon 100% fiable ---
  if (Game_Action && Game_Action.prototype.itemEffectGainTp) {
    const _itemEffectGainTp = Game_Action.prototype.itemEffectGainTp;
    Game_Action.prototype.itemEffectGainTp = function(target, effect) {
      // Effet BDD : effect.value1 = TP flat
      if (effect && effect.value1 > 0) {
        const base = effect.value1;
        const tcr = (typeof target.tcr === "number") ? target.tcr : 1;
        const scaled = Math.floor(base * tcr);

        // IMPORTANT: on bypass le hook global gainTp pour ne pas multiplier 2 fois
        return withTcrTpBypass(target, () => {
          // Méthode la plus safe: on force la valeur "scaled" pour cette application
          const old = effect.value1;
          effect.value1 = scaled;
          try {
            return _itemEffectGainTp.call(this, target, effect);
          } finally {
            effect.value1 = old;
          }
        });
      }

      return _itemEffectGainTp.call(this, target, effect);
    };
  }

  // --- Forcer TCR sur la regen TP (TRG, etc.) ---
  const _regenerateTp2 = Game_Battler.prototype.regenerateTp;
  Game_Battler.prototype.regenerateTp = function() {
    const before = this.tp;

    // IMPORTANT :
    // bypass pendant la regen vanilla
    const result = withTcrTpBypass(this, () => {
      return _regenerateTp2.call(this);
    });

    const gained = this.tp - before;

    // On applique TCR UNE seule fois
    if (gained > 0) {
      const scaled = Math.floor(gained * this.tcr);
      const extra = scaled - gained;

      if (extra !== 0) {
        withTcrTpBypass(this, () => {
          this.gainSilentTp(extra);
        });
      }
    }

    return result;
  };
})();