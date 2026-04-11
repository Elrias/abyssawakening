/*:
 * @target MZ
 * @plugindesc Chaînes d'états empilables (upgrade, refresh au cap) compatibles VisuStella
 * @author you
 * @help
 * - Déclarez vos chaînes dans STATE_CHAINS.
 * - STEP_ONLY = true : +1 par application (comportement actuel).
 *   STEP_ONLY = false : passe directement au rang demandé si supérieur.
 */
(() => {
  const STATE_CHAINS = [
    [14, 46, 47, 201, 202, 203, 204, 205, 206, 207], // Burn I, II..X
    [25, 28],                  // ArdentBlaze I, II
    [161, 162, 163, 164, 165, 208, 209, 210, 211, 212], // Poison I..X
    [168, 169, 170, 171, 172], // Rythm I..V
    [250, 251, 252, 253, 254], // Spark I..V
  ];
  const STEP_ONLY = true; // ← mets false si tu veux pouvoir sauter des rangs

  // Prépare un index pour lookup O(1)
  const chainIndex = new Map(); // stateId -> { chain, idx }
  for (const chain of STATE_CHAINS) {
    chain.forEach((id, idx) => chainIndex.set(id, { chain, idx }));
  }

  const _addState = Game_Battler.prototype.addState;

  Game_Battler.prototype.addState = function(stateId) {
    const info = chainIndex.get(stateId);

    if (!info) return _addState.call(this, stateId);

    const { chain, idx: wantedIdx } = info;

    let currentIdx = -1;
    for (let i = chain.length - 1; i >= 0; i--) {
      if (this.isStateAffected(chain[i])) {
        currentIdx = i;
        break;
      }
    }

    if (currentIdx < 0) {
      return _addState.call(this, stateId);
    }

    if (currentIdx === chain.length - 1) {
      return _addState.call(this, chain[currentIdx]);
    }

    const nextIdx = STEP_ONLY
      ? currentIdx + 1
      : Math.max(currentIdx + 1, wantedIdx);

    _addState.call(this, chain[nextIdx]);
    
    this.removeState(chain[currentIdx]);
  };
})();
