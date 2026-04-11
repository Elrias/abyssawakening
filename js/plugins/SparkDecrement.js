/*:
 * @target MZ
 * @plugindesc Décrémente une chaîne d'états quand la cible est touchée par un Skill Type donné (ex: 2).
 * @author you
 * @help
 * - SKILL_TYPE_IDS : liste des stypeId qui déclenchent la décrémentation (par défaut [2]).
 * - ONCE_PER_ACTION : si true, décrémente au maximum UNE fois par action et par cible,
 *   même si la compétence fait plusieurs "repeats"/hits. Passe à false pour décrémenter à chaque hit.
 * - STATE_CHAINS : tes chaînes d'états (doit correspondre à celles utilisées pour l'incrémentation).
 *
 * Place ce plugin après tes plugins de combat.
 */
(() => {
  // --- CONFIG ---------------------------------------------------------------
  const SKILL_TYPE_IDS = [2];   // <- types de compétence qui déclenchent la baisse (ex: 2)
  const ONCE_PER_ACTION = true; // <- true: 1x par action/cible, false: à chaque hit

  // Les mêmes chaînes que pour ton plugin d'incrémentation :
  const STATE_CHAINS = [
    [250, 251, 252, 253, 254],     // Spark I..V
  ];
  // -------------------------------------------------------------------------

  function decrementOneChainState(target) {
    // Choisir un seul état à décrémenter : on prend "le plus haut rang"
    // trouvé parmi toutes les chaînes présentes sur la cible.
    let choice = null;
    for (const chain of STATE_CHAINS) {
      for (let i = chain.length - 1; i >= 0; i--) {
        if (target.isStateAffected(chain[i])) {
          // Garde celui au rang le plus élevé rencontré
          if (!choice || i > choice.i) choice = { chain, i };
          break; // on a trouvé le plus haut rang de cette chaîne
        }
      }
    }
    if (!choice) return false;

    const { chain, i } = choice;
    target.removeState(chain[i]);      // retire le rang actuel
    if (i > 0) target.addState(chain[i - 1]); // remet le rang inférieur (sinon, plus rien)
    return true;
  }

  const _apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _apply.call(this, target);

    try {
      // 1) Uniquement pour des compétences d'un type surveillé
      if (!this.isSkill()) return;
      const item = this.item();
      if (!item || !SKILL_TYPE_IDS.includes(item.stypeId)) return;

      // 2) Uniquement si l'action a réellement "touché" (ni miss ni evade)
      const res = target.result?.();
      if (!res || !res.isHit()) return;

      // 3) Éviter multiples décrémentations sur multi-hits (optionnel)
      if (ONCE_PER_ACTION) {
        if (!this._decOnceSet) this._decOnceSet = new Set();
        const key = target.isActor() ? `A${target.actorId()}` : `E${target.enemyId()}`;
        if (this._decOnceSet.has(key)) return; // déjà décrémenté pour cette cible/action
        this._decOnceSet.add(key);
      }

      // 4) Décrémenter une chaîne présente (si trouvée)
      decrementOneChainState(target);
    } catch (e) {
      console.error("StateDecrementOnHit error:", e);
    }
  };
})();
