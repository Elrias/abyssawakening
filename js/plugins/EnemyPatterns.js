/*:
 * @target MZ
 * @plugindesc IA ennemie : max rating (égalité→aléa) + re-sélection si TP insuffisant (sans rating 9).
 * @author Elrias
 */
(() => {
  const DEBUG = false;
  const log = (...a)=>{ if (DEBUG) console.log("[AI]", ...a); };

  // ======== CONFIG ========
  // Pendant la re-sélection due à TP insuffisant, ignorer les actions dont le rating est >= à ce seuil.
  const TP_RESELECT_RATING_CAP = 9; // 9 => exclut 9 (et 10 si jamais ça existe)
  // ========================

  // Sélection par défaut : ignore ratingZero, garde actions condition OK + canUse (TP/MP/portée/lock),
  // puis prend le rating max (égalité → aléatoire).
  const _selectAction = Game_Enemy.prototype.selectAction;
  Game_Enemy.prototype.selectAction = function(actionList, ratingZero) {
    const isUsable = a => {
      if (!this.meetsCondition?.(a)) return false;
      const skill = $dataSkills[a.skillId];
      return !!skill && this.canUse?.(skill);
    };
    const cand = actionList.filter(isUsable);
    if (cand.length === 0) return _selectAction.call(this, actionList, ratingZero);
    const maxR = Math.max(...cand.map(a => a.rating));
    const top  = cand.filter(a => a.rating === maxR);
    const pick = top[Math.floor(Math.random() * top.length)] || null;
    if (DEBUG && pick) log("selectAction -> maxR", maxR, "pick", pick.skillId);
    return pick;
  };

  // Re-sélection, avec option pour exclure les rating élevés (cas TP insuffisant).
  function reselectNow(subject, {capRating = null} = {}) {
    const baseList = subject.enemy()?.actions || [];
    // Si on cappe, on exclut les actions dont rating >= capRating
    const filtered = capRating == null
      ? baseList
      : baseList.filter(a => a.rating < capRating);

    // Utilise notre selectAction (max rating sur la liste filtrée)
    const pick = subject.selectAction(filtered, 0);
    if (pick) {
      subject.currentAction()?.setEnemyAction?.(pick);
      return true;
    }

    // Dernier recours : Attaque si possible (sans jamais repêcher du rating 9)
    const atkId = subject.attackSkillId?.();
    const atk   = atkId ? $dataSkills[atkId] : null;
    if (atk && subject.canUse?.(atk)) {
      subject.currentAction()?.setAttack?.();
      return true;
    }
    return false;
  }

  // Re-sélection le plus tôt possible (avant annulations tiers), en capant le rating si TP manquant
  const _processTurn = BattleManager.processTurn;
  BattleManager.processTurn = function() {
    const subject = this._subject;
    if (subject?.isEnemy?.() && !this._actionForcedBattler) {
      const action = subject.currentAction?.();
      if (action?.isSkill?.()) {
        const skill  = action.item();
        const tpNeed = subject.skillTpCost?.(skill) ?? 0;
        if (!subject.canUse(skill)) {
            log("processTurn: Skill unusable -> reselect");
            reselectNow(subject, {capRating: TP_RESELECT_RATING_CAP});
        }
      }
    }
    _processTurn.call(this);
  };

  // Ceinture + bretelles juste avant exécution
  const _startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    const subject = this._subject;
    const action  = subject?.currentAction?.();
    if (subject?.isEnemy?.() && action?.isSkill?.()) {
      const skill  = action.item();
      const tpNeed = subject.skillTpCost?.(skill) ?? 0;
      if (!subject.canUse(skill)) {
          log("startAction: Skill unusable -> reselect");
          reselectNow(subject, {capRating: TP_RESELECT_RATING_CAP});
      }
    }
    _startAction.call(this);
  };
})();
