/*:
 * @target MZ
 * @plugindesc v1.4.1 Applique un état à toute l'équipe quand un acteur "esquive" (evade ou miss selon réglages).
 * @help
 * Placez ce plugin sous VisuStella. 
 * Réglez les constantes ci-dessous.
 */
(() => {
  // ===== Réglages =====
  const ACTOR_ID          = 21;     // 0 = n'importe quel acteur ; sinon ID précis

  // Que considérer comme "dodge" ?
  const TRIGGER_ON_EVADE  = true;  // result().evaded === true
  const TRIGGER_ON_MISS   = true;  // result().missed === true

  // Filtre par type d'action
  const ALLOW_PHYSICAL    = true;
  const ALLOW_MAGICAL     = true;
  const ALLOW_CERTAINHIT  = false;

  const ONCE_PER_TURN     = true;
  const REFRESH_DURATION  = true;

  function applyDodgeEffects(b) {

    if (!b?.isActor?.()) return;
    if (ACTOR_ID > 0 && b.actorId() !== ACTOR_ID) return;

    b.addState(168);

    if (ONCE_PER_TURN) {
      b._lastDodgeTurn ??= -9999;
      const t = $gameTroop.turnCount();
      if (t === b._lastDodgeTurn) return;
      b._lastDodgeTurn = t;
    }

    // ==============================
    // 2️⃣ State 179 → +15 TP à l'équipe
    // ==============================
    if (b.isStateAffected(179)) {
      const allies = b.friendsUnit().aliveMembers();
      for (const member of allies) {
        member.gainTp(15);
      }
    }
  }

  function onDodge(b) {
    const stamp = Graphics?.frameCount ?? Date.now();
    if (b._dtsLastStamp === stamp) return;
    b._dtsLastStamp = stamp;
    applyDodgeEffects(b);
  }

  const _performEvasion = Game_Battler.prototype.performEvasion;
  Game_Battler.prototype.performEvasion = function() {
    _performEvasion.call(this);
    onDodge(this);
  };
  const _performMagicEvasion = Game_Battler.prototype.performMagicEvasion;
  Game_Battler.prototype.performMagicEvasion = function() {
    _performMagicEvasion.call(this);
    onDodge(this);
  };

  const _apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _apply.call(this, target);
    const res = target?.result?.();
    const wasEvade = !!res?.evaded;
    const wasMiss  = !!res?.missed;
    const isPhys = this.isPhysical?.();
    const isMag  = this.isMagical?.();
    const isCert = this.isCertainHit?.() ?? this.isCertainHit?.();
    const typeOk = (isPhys && ALLOW_PHYSICAL) || (isMag && ALLOW_MAGICAL) || (isCert && ALLOW_CERTAINHIT);
    const flagOk = (TRIGGER_ON_EVADE && wasEvade) || (TRIGGER_ON_MISS && wasMiss);
    if (target?.isActor?.() && typeOk && flagOk) onDodge(target);
  };
})();
