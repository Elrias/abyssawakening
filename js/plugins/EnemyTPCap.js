/*:
 * @target MZ
 * @plugindesc Cap TP des ennemis via <TPSphereCount:X> (X orbes => max TP = X*10)
 * @author you
 * @help
 * - Dans la fiche ENNEMI: <TPSphereCount: 6>  // max TP = 60
 * - Place ce plugin après vos plugins combat (VisuStella, etc.).
 */

(() => {
  // Helper: lit le cap depuis la note de l'ennemi (X orbes -> X*10 TP)
  function readTpCap(enemyBattler) {
    const metaVal = enemyBattler.enemy()?.meta?.TPSphereCount;
    if (metaVal == null) return null;
    const spheres = Number(metaVal);
    if (!Number.isFinite(spheres)) return null;
    return Math.max(0, Math.floor(spheres) * 10);
  }

  // 1) maxTp ennemi : applique le cap si présent
  const _Enemy_maxTp = Game_Enemy.prototype.maxTp;
  Game_Enemy.prototype.maxTp = function() {
    const base = _Enemy_maxTp.call(this); // inclut toute modif d'autres plugins
    const cap  = readTpCap(this);
    return cap == null ? base : Math.min(base, cap);
  };

  // 2) Au setup et au début du combat, recaler le TP courant sous le cap
  const _Enemy_setup = Game_Enemy.prototype.setup;
  Game_Enemy.prototype.setup = function(enemyId, x, y) {
    _Enemy_setup.call(this, enemyId, x, y);
    this._tp = Math.min(this._tp, this.maxTp());
  };

  const _Enemy_onBattleStart = Game_Enemy.prototype.onBattleStart;
  Game_Enemy.prototype.onBattleStart = function(adv) {
    _Enemy_onBattleStart.call(this, adv);
    this._tp = Math.min(this._tp, this.maxTp());
  };

  // 3) Sécurité : si un plugin pousse au-dessus du cap, re-clamp après set/gain
  const _BattlerBase_setTp = Game_BattlerBase.prototype.setTp;
  Game_Enemy.prototype.setTp = function(value) {
    _BattlerBase_setTp.call(this, value);
    const cap = this.maxTp();
    if (this._tp > cap) this._tp = cap;
  };

  const _Battler_gainTp = Game_Battler.prototype.gainTp;
  Game_Enemy.prototype.gainTp = function(value) {
    _Battler_gainTp.call(this, value);
    const cap = this.maxTp();
    if (this._tp > cap) this._tp = cap;
  };
})();
