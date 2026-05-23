/*:
 * @target MZ
 * @plugindesc v1.5.0 Applique un état à l'acteur quand il esquive et donne du TP à l'équipe (1 fois par tour).
 * @help
 * Placez ce plugin sous VisuStella.
 */

(() => {

  // ==========================================================================
  // CONFIG
  // ==========================================================================

  const ACTOR_ID = 21; // 0 = n'importe quel acteur

  // Que considérer comme une esquive ?
  const TRIGGER_ON_EVADE = true; // evade
  const TRIGGER_ON_MISS  = true; // miss

  // Types d'actions autorisés
  const ALLOW_PHYSICAL   = true;
  const ALLOW_MAGICAL    = true;
  const ALLOW_CERTAINHIT = false;

  // Limite TP : 1 fois par tour
  const ONCE_PER_TURN = true;

  // ==========================================================================
  // LOGIQUE
  // ==========================================================================

  function applyDodgeEffects(battler) {

  if (!battler?.isActor?.()) return;

  if (ACTOR_ID > 0 && battler.actorId() !== ACTOR_ID) {
    return;
  }

  // State 168 à chaque esquive
  battler.addState(168);

  // Déjà déclenché ce tour ?
  if (battler.isStateAffected(320)) {
    return;
  }

  // Applique le cooldown du tour
  battler.addState(320);

  // State 179 -> TP équipe
  if (battler.isStateAffected(179)) {

    const allies = battler.friendsUnit().aliveMembers();

    for (const member of allies) {
      member.gainTp(15);
    }
  }
}

  // ==========================================================================
  // Dodge Detection
  // ==========================================================================
  // IMPORTANT :
  // On utilise UNIQUEMENT Game_Action.apply
  // pour éviter les doubles triggers et bugs VisuStella.
  // ==========================================================================

  const _Game_Action_apply = Game_Action.prototype.apply;

  Game_Action.prototype.apply = function(target) {

    _Game_Action_apply.call(this, target);

    if (!target?.isActor?.()) return;

    const result = target.result();

    if (!result) return;

    // ==========================================================
    // Vérification dodge
    // ==========================================================

    const wasEvaded = !!result.evaded;
    const wasMissed = !!result.missed;

    const dodgeOk =
      (TRIGGER_ON_EVADE && wasEvaded) ||
      (TRIGGER_ON_MISS && wasMissed);

    if (!dodgeOk) return;

    // ==========================================================
    // Vérification type action
    // ==========================================================

    const isPhysical = this.isPhysical?.();
    const isMagical  = this.isMagical?.();
    const isCertain  = this.isCertainHit?.();

    const typeOk =
      (isPhysical && ALLOW_PHYSICAL) ||
      (isMagical && ALLOW_MAGICAL) ||
      (isCertain && ALLOW_CERTAINHIT);

    if (!typeOk) return;

    // ==========================================================
    // Application effets
    // ==========================================================

    applyDodgeEffects(target);
  };

})();