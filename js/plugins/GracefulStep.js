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

    // Sécurité
    if (!battler?.isActor?.()) return;

    // Filtre Actor ID
    if (ACTOR_ID > 0 && battler.actorId() !== ACTOR_ID) {
      return;
    }

    // ==========================================================
    // 1) State 168 à chaque esquive
    // ==========================================================

    battler.addState(168);

    // ==========================================================
    // 2) TP : une fois par tour
    // ==========================================================

    if (ONCE_PER_TURN) {

      const battleId = BattleManager._battleCount || 0;
      const turn = $gameTroop.turnCount();

      battler._dodgeTpData ??= {
        battleId: -1,
        turn: -1
      };

      const data = battler._dodgeTpData;

      // Déjà déclenché ce tour dans ce combat
      if (data.battleId === battleId && data.turn === turn) {
        return;
      }

      // Sauvegarde
      data.battleId = battleId;
      data.turn = turn;
    }

    // ==========================================================
    // 3) Si state 179 → +15 TP équipe
    // ==========================================================

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