/*:
 * @target MZ
 * @plugindesc [v1.1] Si l'état @STATE_ID est présent, ajoute à la MAT un flat = BONUS_RATE × ATK (configurable).
 * @author You
 * @help
 * Compatible VisuStella, ParamRateModesNotetags, DynamicPassiveStates.
 * Le bonus est un **flat** (paramPlus) ajouté à MAT; il ne change pas les % (paramRate).
 */

(() => {
  "use strict";

  // === CONFIG ===
  const STATE_ID   = 113;   // État passif qui active le bonus
  const BONUS_RATE = 0.50;  // 0.50 = +50% de l'ATK utilisé ci-dessous
  const USE_FINAL_ATK = true; // true: ATK finale (incluant % & buffs). false: ATK base+flats (sans %)
  const ROUND_MODE = "floor"; // "floor" | "round" | "ceil"
  const LOG = false;          // true pour logs console

  // Chaînage sur la vraie méthode native
  const _paramPlusBase = Game_BattlerBase.prototype.paramPlus;

  // Helper pour arrondir
  function roundByMode(value, mode) {
    if (mode === "round") return Math.round(value);
    if (mode === "ceil")  return Math.ceil(value);
    return Math.floor(value); // default floor
  }

  Game_BattlerBase.prototype.paramPlus = function(paramId) {
    let plus = _paramPlusBase.call(this, paramId);

    // 4 = MAT
    if (paramId === 4 && this.isStateAffected && this.isStateAffected(STATE_ID)) {
      // Choix de l'ATK utilisée
      let atk;
      if (USE_FINAL_ATK) {
        // ATK finale (inclut base+flats, % (paramRate), buffs)
        atk = this.param(2);
      } else {
        // ATK "sans taux": base + flats (sans paramRate/buffs)
        const baseAtk = this.paramBase(2);
        const flatAtk = _paramPlusBase.call(this, 2);
        atk = baseAtk + flatAtk;
      }

      let bonus = BONUS_RATE * atk;
      bonus = roundByMode(bonus, ROUND_MODE);

      plus += bonus;

      if (LOG) {
        const who = this.name ? this.name() : "[battler]";
        console.log(`[ATK→MAT] ${who} +${bonus} MAT (${(BONUS_RATE*100).toFixed(0)}% de ATK=${atk})`);
      }
    }

    return plus;
  };
})();
