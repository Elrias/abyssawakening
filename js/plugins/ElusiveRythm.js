(() => {

  const STATE_ID = 178;

  const _xparam = Game_BattlerBase.prototype.xparam;
  Game_BattlerBase.prototype.xparam = function(xparamId) {
    let value = _xparam.call(this, xparamId);

    // EVA
    if (xparamId === 1 && this.isStateAffected(STATE_ID)) {

      // On crée une action factice pour calculer le vrai crit
      const action = new Game_Action(this);

      // Important : on met une skill valide (attaque normale)
      action.setSkill(this.attackSkillId());

      // On utilise self comme cible fictive (la CEV n'importe pas ici)
      const realCrit = action.itemCri(this);

      value += realCrit;
    }

    return value;
  };

})();