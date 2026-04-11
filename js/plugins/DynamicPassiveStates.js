/*:
 * @target MZ
 * @plugindesc [v1.2] DynamicPassiveStates — États passifs dynamiques (PV manquants, PV élevés, tours) + fix preview (stacks via Passive State)
 * @author You
 *
 * @help
 * - Applique des bonus dynamiques de Param Rate (TRAIT_PARAM) selon PV / tours.
 * - Compatible VisuStella (Battle Core / Skills & States Core).
 * - Compatible ParamRateModesNotetags (Add/Mult par notetags ou par config).
 * - Corrige l’aperçu d’équipement : les stacks d’un même passif (ex. Boaster II x2)
 *   sont bien prévisualisés en additionnant les <Passive State: X> des objets survolés.
 *
 * Ordre recommandé :
 *   1) VisuStella (Battle / Skills & States Core / autres)
 *   2) ParamRateModesNotetags (si utilisé)
 *   3) DynamicPassiveStates (ce fichier)
 *
 * Modifie proprement : Game_BattlerBase.prototype.paramRate (chaînage vers base)
 */

(() => {
  "use strict";

  //==============================
  // CONFIGURATION
  //==============================
  // NOTE: Tu peux ajouter "MODE: 'add' | 'mult'" sur chaque entrée pour forcer le mode.

  const PASSIVE_BUFFS_CONFIG = [
    // --- Iron Heart ---
    { STATE_ID: 63, BONUS_PER_TURN: 0.025, MAX_BONUS: 0.50, PARAM_ID: 2, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 63, BONUS_PER_TURN: 0.025, MAX_BONUS: 0.50, PARAM_ID: 4, TYPE: "turns", TURN_OFFSET: 1 },

    // --- Scaling I~V : ATK/MAT / turn ---
    { STATE_ID: 215, BONUS_PER_TURN: 0.010, MAX_BONUS: 0.20, PARAM_ID: 2, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 215, BONUS_PER_TURN: 0.010, MAX_BONUS: 0.20, PARAM_ID: 4, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 216, BONUS_PER_TURN: 0.015, MAX_BONUS: 0.25, PARAM_ID: 2, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 216, BONUS_PER_TURN: 0.015, MAX_BONUS: 0.25, PARAM_ID: 4, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 217, BONUS_PER_TURN: 0.020, MAX_BONUS: 0.30, PARAM_ID: 2, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 217, BONUS_PER_TURN: 0.020, MAX_BONUS: 0.30, PARAM_ID: 4, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 218, BONUS_PER_TURN: 0.025, MAX_BONUS: 0.35, PARAM_ID: 2, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 218, BONUS_PER_TURN: 0.025, MAX_BONUS: 0.35, PARAM_ID: 4, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 219, BONUS_PER_TURN: 0.030, MAX_BONUS: 0.40, PARAM_ID: 2, TYPE: "turns", TURN_OFFSET: 1 },
    { STATE_ID: 219, BONUS_PER_TURN: 0.030, MAX_BONUS: 0.40, PARAM_ID: 4, TYPE: "turns", TURN_OFFSET: 1 },

    // --- Bursting I~V : ATK/MAT / -turn ---
    { STATE_ID: 220, PARAM_ID: 2, TYPE: "turns-", MAX_BONUS: 0.18, BONUS_PER_TURN: -0.06 },
    { STATE_ID: 220, PARAM_ID: 4, TYPE: "turns-", MAX_BONUS: 0.18, BONUS_PER_TURN: -0.06 },
    { STATE_ID: 221, PARAM_ID: 2, TYPE: "turns-", MAX_BONUS: 0.24, BONUS_PER_TURN: -0.08 },
    { STATE_ID: 221, PARAM_ID: 4, TYPE: "turns-", MAX_BONUS: 0.24, BONUS_PER_TURN: -0.08 },
    { STATE_ID: 222, PARAM_ID: 2, TYPE: "turns-", MAX_BONUS: 0.30, BONUS_PER_TURN: -0.10 },
    { STATE_ID: 222, PARAM_ID: 4, TYPE: "turns-", MAX_BONUS: 0.30, BONUS_PER_TURN: -0.10 },
    { STATE_ID: 223, PARAM_ID: 2, TYPE: "turns-", MAX_BONUS: 0.36, BONUS_PER_TURN: -0.12 },
    { STATE_ID: 223, PARAM_ID: 4, TYPE: "turns-", MAX_BONUS: 0.36, BONUS_PER_TURN: -0.12 },
    { STATE_ID: 224, PARAM_ID: 2, TYPE: "turns-", MAX_BONUS: 0.42, BONUS_PER_TURN: -0.14 },
    { STATE_ID: 224, PARAM_ID: 4, TYPE: "turns-", MAX_BONUS: 0.42, BONUS_PER_TURN: -0.14 },

    // --- Last stand I~V : DEF/MDF selon PV manquants ---
    { STATE_ID: 64, BONUS_PER_TURN: 0, MAX_BONUS: 0.20, PARAM_ID: 3, TYPE: "hp_low" },
    { STATE_ID: 64, BONUS_PER_TURN: 0, MAX_BONUS: 0.20, PARAM_ID: 5, TYPE: "hp_low" },
    { STATE_ID: 65, BONUS_PER_TURN: 0, MAX_BONUS: 0.40, PARAM_ID: 3, TYPE: "hp_low" },
    { STATE_ID: 65, BONUS_PER_TURN: 0, MAX_BONUS: 0.40, PARAM_ID: 5, TYPE: "hp_low" },
    { STATE_ID: 66, BONUS_PER_TURN: 0, MAX_BONUS: 0.60, PARAM_ID: 3, TYPE: "hp_low" },
    { STATE_ID: 66, BONUS_PER_TURN: 0, MAX_BONUS: 0.60, PARAM_ID: 5, TYPE: "hp_low" },
    { STATE_ID: 67, BONUS_PER_TURN: 0, MAX_BONUS: 0.80, PARAM_ID: 3, TYPE: "hp_low" },
    { STATE_ID: 67, BONUS_PER_TURN: 0, MAX_BONUS: 0.80, PARAM_ID: 5, TYPE: "hp_low" },
    { STATE_ID: 68, BONUS_PER_TURN: 0, MAX_BONUS: 1.00, PARAM_ID: 3, TYPE: "hp_low" },
    { STATE_ID: 68, BONUS_PER_TURN: 0, MAX_BONUS: 1.00, PARAM_ID: 5, TYPE: "hp_low" },

    // --- Avenger I~V : ATK/MAT selon PV manquants ---
    { STATE_ID: 69, BONUS_PER_TURN: 0, MAX_BONUS: 0.25, PARAM_ID: 2, TYPE: "hp_low" },
    { STATE_ID: 69, BONUS_PER_TURN: 0, MAX_BONUS: 0.25, PARAM_ID: 4, TYPE: "hp_low" },
    { STATE_ID: 70, BONUS_PER_TURN: 0, MAX_BONUS: 0.30, PARAM_ID: 2, TYPE: "hp_low" },
    { STATE_ID: 70, BONUS_PER_TURN: 0, MAX_BONUS: 0.30, PARAM_ID: 4, TYPE: "hp_low" },
    { STATE_ID: 71, BONUS_PER_TURN: 0, MAX_BONUS: 0.35, PARAM_ID: 2, TYPE: "hp_low" },
    { STATE_ID: 71, BONUS_PER_TURN: 0, MAX_BONUS: 0.35, PARAM_ID: 4, TYPE: "hp_low" },
    { STATE_ID: 72, BONUS_PER_TURN: 0, MAX_BONUS: 0.40, PARAM_ID: 2, TYPE: "hp_low" },
    { STATE_ID: 72, BONUS_PER_TURN: 0, MAX_BONUS: 0.40, PARAM_ID: 4, TYPE: "hp_low" },
    { STATE_ID: 73, BONUS_PER_TURN: 0, MAX_BONUS: 0.45, PARAM_ID: 2, TYPE: "hp_low" },
    { STATE_ID: 73, BONUS_PER_TURN: 0, MAX_BONUS: 0.45, PARAM_ID: 4, TYPE: "hp_low" },

    // --- Boaster I~V : ATK/MAT selon PV élevés ---
    { STATE_ID: 74, BONUS_PER_TURN: 0, MAX_BONUS: 0.15, PARAM_ID: 2, TYPE: "hp_high" },
    { STATE_ID: 74, BONUS_PER_TURN: 0, MAX_BONUS: 0.15, PARAM_ID: 4, TYPE: "hp_high" },
    { STATE_ID: 75, BONUS_PER_TURN: 0, MAX_BONUS: 0.20, PARAM_ID: 2, TYPE: "hp_high" },
    { STATE_ID: 75, BONUS_PER_TURN: 0, MAX_BONUS: 0.20, PARAM_ID: 4, TYPE: "hp_high" },
    { STATE_ID: 76, BONUS_PER_TURN: 0, MAX_BONUS: 0.25, PARAM_ID: 2, TYPE: "hp_high" },
    { STATE_ID: 76, BONUS_PER_TURN: 0, MAX_BONUS: 0.25, PARAM_ID: 4, TYPE: "hp_high" },
    { STATE_ID: 77, BONUS_PER_TURN: 0, MAX_BONUS: 0.30, PARAM_ID: 2, TYPE: "hp_high" },
    { STATE_ID: 77, BONUS_PER_TURN: 0, MAX_BONUS: 0.30, PARAM_ID: 4, TYPE: "hp_high" },
    { STATE_ID: 78, BONUS_PER_TURN: 0, MAX_BONUS: 0.35, PARAM_ID: 2, TYPE: "hp_high" },
    { STATE_ID: 78, BONUS_PER_TURN: 0, MAX_BONUS: 0.35, PARAM_ID: 4, TYPE: "hp_high" },

    // --- Berserker : ATK selon PV manquants ---
    { STATE_ID: 106, BONUS_PER_TURN: 0, MAX_BONUS: 0.50, PARAM_ID: 2, TYPE: "hp_low" },
  ];

  //==============================
  // UTILS — Modes Add/Mult
  //==============================
  function modeFromNotetagsForState(state, paramId) {
    if (state && state._prModeByParam && Object.prototype.hasOwnProperty.call(state._prModeByParam, paramId)) {
      return state._prModeByParam[paramId]; // "add" | "mult"
    }
    if (state && state._prModeAll) return state._prModeAll; // "add" | "mult"
    return null;
  }

  function resolveBonusMode(buffEntry, state, paramId) {
    if (buffEntry && (buffEntry.MODE === "add" || buffEntry.MODE === "mult")) {
      return buffEntry.MODE;
    }
    const tagMode = modeFromNotetagsForState(state, paramId);
    if (tagMode === "add" || tagMode === "mult") return tagMode;
    return "add"; // fallback
  }

  function clampBonus(x, max) {
    if (!isFinite(x)) return 0;
    return Math.max(0, Math.min(x, max));
  }

  function ensureBuffStore(battler) {
    if (!battler._passiveBuffs) battler._passiveBuffs = {};
  }

  //==============================
  // NOUVEAU — Compter les stacks en preview
  //==============================
  // Compte les stacks d'un état passif en situation réelle (states()) ET
  // en prévisualisation d'équipement via les notetags <Passive State: X> présents dans traitObjects().
  function countPassiveStacksNow(battler, stateId) {
    // 1) États réellement appliqués
    const real = battler.states().filter(s => s.id === stateId).length;

    // 2) Sources “virtuelles” via <Passive State: ...> sur les objets courants (y compris l’équipement survolé)
    let fromTags = 0;
    for (const obj of battler.traitObjects()) {
      if (!obj || !obj.note) continue;
      obj.note.replace(/<Passive\s*State\s*:\s*([^>]+)>/gi, (_, list) => {
        list.split(/[\s,]+/).forEach(tok => {
          const n = Number(tok);
          if (Number.isFinite(n) && n === stateId) fromTags += 1;
        });
        return "";
      });
    }

    // On prend le max pour éviter double-comptage si un passif est aussi matérialisé en state réel.
    return Math.max(real, fromTags);
  }

  //==============================
  // addState / removeState — init/clear + refresh
  //==============================
  const _Game_Battler_addState = Game_Battler.prototype.addState;
  Game_Battler.prototype.addState = function(stateId) {
    _Game_Battler_addState.call(this, stateId);
    ensureBuffStore(this);

    PASSIVE_BUFFS_CONFIG.forEach(buff => {
      if (stateId === buff.STATE_ID) {
        if (!this._passiveBuffs[stateId]) {
          this._passiveBuffs[stateId] = { turns: 0, bonusRate: 0 };
        }
        // Init immédiate pour les bonus dépendants des PV
        const count = countPassiveStacksNow(this, stateId);
        if (count > 0) {
          let single = 0;
          if (buff.TYPE === "hp_low")  single = clampBonus((1 - this.hpRate()) * buff.MAX_BONUS, buff.MAX_BONUS);
          if (buff.TYPE === "hp_high") single = clampBonus(this.hpRate() * buff.MAX_BONUS, buff.MAX_BONUS);
          const data = this._passiveBuffs[stateId];
          data.bonusRate = single * count;
          this._passiveBuffs[stateId] = data;
          this.refresh();
        }
      }
    });
  };

  const _Game_Battler_removeState = Game_Battler.prototype.removeState;
  Game_Battler.prototype.removeState = function(stateId) {
    _Game_Battler_removeState.call(this, stateId);
    ensureBuffStore(this);
    if (this._passiveBuffs[stateId]) {
      if (!this.states().some(s => s.id === stateId)) {
        this._passiveBuffs[stateId].turns = 0;
        this._passiveBuffs[stateId].bonusRate = 0;
        this.refresh();
      }
    }
  };

  //==============================
  // Début de combat — init acteurs + ennemis
  //==============================
  const _BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function() {
    const all = $gameParty.members().concat($gameTroop.members());
    all.forEach(battler => {
      ensureBuffStore(battler);
      PASSIVE_BUFFS_CONFIG.forEach(buff => {
        const stateId = buff.STATE_ID;
        const count = countPassiveStacksNow(battler, stateId);
        if (count > 0) {
          let bonus = 0;
          if (buff.TYPE === "hp_low")  bonus = clampBonus((1 - battler.hpRate()) * buff.MAX_BONUS, buff.MAX_BONUS);
          if (buff.TYPE === "hp_high") bonus = clampBonus(battler.hpRate() * buff.MAX_BONUS, buff.MAX_BONUS);
          battler._passiveBuffs[stateId] = { turns: 0, bonusRate: bonus * count };
        }
      });
      battler.refresh();
    });
    _BattleManager_startBattle.call(this);
  };

  //==============================
  // Fin de tour — incrémente / recalc + refresh
  //==============================
  const _BattleManager_endTurn = BattleManager.endTurn;
  BattleManager.endTurn = function() {
    _BattleManager_endTurn.call(this);
    const battlers = $gameTroop.members().concat($gameParty.members());
    battlers.forEach(battler => {
      ensureBuffStore(battler);
      let changed = false;
      const turnsIncrOnce = new Set();

      PASSIVE_BUFFS_CONFIG.forEach(buff => {
        const stateId = buff.STATE_ID;
        const count = countPassiveStacksNow(battler, stateId);

        if (count > 0) {
          if (!battler._passiveBuffs[stateId]) {
            battler._passiveBuffs[stateId] = { turns: 0, bonusRate: 0 };
          }
          const data = battler._passiveBuffs[stateId];
          let single = 0;

          if (buff.TYPE === "turns" || buff.TYPE === "turns-") {
            // Incrémente UNE fois par stateId et par tour
            if (!turnsIncrOnce.has(stateId)) {
              const perStep  = Math.abs(buff.BONUS_PER_TURN || 0);
              const maxBonus = Math.max(0, buff.MAX_BONUS || 0);
              const offset   = Math.max(0, buff.TURN_OFFSET || 0);
              const stepsMax = perStep > 0 ? Math.floor(maxBonus / perStep) : 0;

              // Cap des "turns" (compteur brut). On le cale pour permettre d'atteindre le cap logique.
              const maxTurnsRaw = (buff.TYPE === "turns")
                ? (stepsMax + offset)          // croissant : dernier palier atteint quand turns = stepsMax + offset
                : (stepsMax + offset + 1);     // décroissant : on a besoin d’un cran de plus pour tomber à 0

              data.turns = Math.min(data.turns + 1, maxTurnsRaw);
              turnsIncrOnce.add(stateId);
            }

            const perStep  = Math.abs(buff.BONUS_PER_TURN || 0);
            const maxBonus = Math.max(0, buff.MAX_BONUS || 0);
            const offset   = Math.max(0, buff.TURN_OFFSET || 0);

            // Nombre de TOURS COMPLÉTÉS (robuste au "tour 1" où turns peut valoir 1 selon l’ordre des phases)
            const completed = Math.max(0, (data.turns || 0) - 1);

            // Étapes effectives selon le type
            const effSteps = (buff.TYPE === "turns")
              ? Math.max(0, completed - offset + 1)     // ex: OFFSET=1 → tour 1:0, tour 2:1, etc.
              : Math.max(0, completed - offset);        // ex: OFFSET=0 → tour 1:0, tour 2:1, etc.

            // Valeur du bonus
            single = (buff.TYPE === "turns")
              ? clampBonus(perStep * effSteps, maxBonus)                     // 0 → MAX
              : clampBonus(maxBonus - perStep * effSteps, maxBonus);         // MAX → 0
          } else if (buff.TYPE === "hp_low") {
            single = clampBonus((1 - battler.hpRate()) * buff.MAX_BONUS, buff.MAX_BONUS);
          } else if (buff.TYPE === "hp_high") {
            single = clampBonus(battler.hpRate() * buff.MAX_BONUS, buff.MAX_BONUS);
          }

          const newRate = single * count;
          if (newRate !== data.bonusRate) {
            data.bonusRate = newRate;
            changed = true;
          }
          battler._passiveBuffs[stateId] = data;

        } else {
          if (battler._passiveBuffs[stateId] && (battler._passiveBuffs[stateId].bonusRate !== 0 || battler._passiveBuffs[stateId].turns !== 0)) {
            battler._passiveBuffs[stateId].turns = 0;
            battler._passiveBuffs[stateId].bonusRate = 0;
            changed = true;
          }
        }
      });

      if (changed) battler.refresh();
    });
  };

  //==============================
  // setHp — recalc immédiat des bonus HP + refresh
  //==============================
  const _Game_Battler_setHp = Game_Battler.prototype.setHp;
  Game_Battler.prototype.setHp = function(value) {
    _Game_Battler_setHp.call(this, value);
    ensureBuffStore(this);

    let changed = false;
    PASSIVE_BUFFS_CONFIG.forEach(buff => {
      const stateId = buff.STATE_ID;
      const count = countPassiveStacksNow(this, stateId);
      if (count > 0) {
        if (!this._passiveBuffs[stateId]) {
          this._passiveBuffs[stateId] = { turns: 0, bonusRate: 0 };
        }
        const data = this._passiveBuffs[stateId];
        let single = 0;

        if (buff.TYPE === "hp_low")  single = clampBonus((1 - this.hpRate()) * buff.MAX_BONUS, buff.MAX_BONUS);
        if (buff.TYPE === "hp_high") single = clampBonus(this.hpRate() * buff.MAX_BONUS, buff.MAX_BONUS);

        const newRate = single * count;
        if (newRate !== data.bonusRate) {
          data.bonusRate = newRate;
          changed = true;
        }
        this._passiveBuffs[stateId] = data;
      }
    });

    if (changed) this.refresh();
  };

  //==============================
  // paramRate — applique dynamiques (Add/Mult) + PREVIEW FIX
  //==============================
  Game_Battler.prototype.paramRate = function(paramId) {
    // Inclut VisuStella + ParamRateModesNotetags + autres (chaînage base)
    let rate = Game_BattlerBase.prototype.paramRate.call(this, paramId);

    // Recalcule à la volée (pour preview et runtime)
    for (const buff of PASSIVE_BUFFS_CONFIG) {
      if (buff.PARAM_ID !== paramId) continue;

      const stacksNow = countPassiveStacksNow(this, buff.STATE_ID);
      if (stacksNow <= 0) continue;

      let single = 0;
      if (buff.TYPE === "hp_low")  single = clampBonus((1 - this.hpRate()) * buff.MAX_BONUS, buff.MAX_BONUS);
      if (buff.TYPE === "hp_high") single = clampBonus(this.hpRate() * buff.MAX_BONUS, buff.MAX_BONUS);
      if (buff.TYPE === "turns") {
        const turns    = (this._passiveBuffs?.[buff.STATE_ID]?.turns) || 0;
        const offset   = Math.max(0, buff.TURN_OFFSET || 0);
        const perStep  = Math.abs(buff.BONUS_PER_TURN || 0);
        const maxBonus = Math.max(0, buff.MAX_BONUS || 0);
        const completed = Math.max(0, turns - 1);
        const effSteps  = Math.max(0, completed - offset + 1);
        single = clampBonus(perStep * effSteps, maxBonus);
      }
      if (buff.TYPE === "turns-") {
        const turns    = (this._passiveBuffs?.[buff.STATE_ID]?.turns) || 0;
        const offset   = Math.max(0, buff.TURN_OFFSET || 0);
        const perStep  = Math.abs(buff.BONUS_PER_TURN || 0);
        const maxBonus = Math.max(0, buff.MAX_BONUS || 0);
        const completed = Math.max(0, turns - 1);
        const effSteps  = Math.max(0, completed - offset);
        single = clampBonus(maxBonus - perStep * effSteps, maxBonus);
      }

      const totalBonus = single * stacksNow;
      if (totalBonus <= 0) continue;

      const st   = $dataStates[buff.STATE_ID];
      const mode = resolveBonusMode(buff, st, paramId); // "add" | "mult"

      if (mode === "mult") rate *= (1 + totalBonus);
      else                 rate += totalBonus;
    }

    return Math.max(0, rate);
  };

})();
