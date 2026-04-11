/*:
 * @target MZ
 * @plugindesc Fix Attack States: 1 tentative par état (dédoublonnage) + cap à 100%
 * @author You
 * @help
 * - Addition des sources conservée (attackStatesRate).
 * - La liste attackStates() est dédoublonnée => une seule tentative par stateId.
 * - attackStatesRate(stateId) est cappé à 1.0 (100%).
 *
 * Place ce plugin tout en bas (après VisuStella + plugins custom runes/traits).
 */
(() => {
  // 1) 1 seule entrée par stateId
  const _attackStates = Game_BattlerBase.prototype.attackStates;
  Game_BattlerBase.prototype.attackStates = function() {
    const arr = _attackStates.call(this);
    return Array.from(new Set(arr));
  };

  // 2) cap à 100% (utile si des sources dépassent 1.0)
  const _attackStatesRate = Game_BattlerBase.prototype.attackStatesRate;
  Game_BattlerBase.prototype.attackStatesRate = function(stateId) {
    const r = _attackStatesRate.call(this, stateId);
    return Math.max(0, Math.min(1, r));
  };
})();
