/*:
 * @target MZ
 * @plugindesc Trigger Equip Skills (v2) - Notetags + Dynamic triggers for DM_IndependentItems. Proc at end of battler turn. Battle-counters reset end battle.
 * @author You
 *
 * @param IgnoreTriggeredSkillForCounting
 * @text Ignorer la compétence déclenchée dans le comptage
 * @type boolean
 * @default true
 *
 * @param DynamicFieldName
 * @text Nom du champ dynamique
 * @type string
 * @default _dynamicTriggerEquips
 *
 * @help
 * === Notetag (sur arme/armure) ===
 * <TriggerEquip>
 * condition: damage_taken
 * count: 3
 * skill: 25
 * </TriggerEquip>
 *
 * === Triggers dynamiques (pour items indépendants) ===
 * Sur l'INSTANCE d'armure (Independent Item), stocker:
 * item._dynamicTriggerEquips = [
 *   { conditionRaw: "damage_dealt_this_turn: 5", count: 3, skillId: 55 }
 * ];
 *
 * Le plugin lira: Notetags + item._dynamicTriggerEquips
 *
 * Compteurs:
 * - Se cumulent pendant tout le combat
 * - Reset fin de combat
 * - Après proc, le compteur du trigger repasse à 0
 *
 * Conditions supportées:
 * - damage_taken
 * - attack
 * - guard
 * - skill_type_use: x
 * - damage_taken_skill_type: x
 * - tp_spent
 * - end_hp_below: x
 * - end_hp_above: x
 * - end_tp_at_least: x
 * - critical_dealt
 * - damage_dealt_this_turn: x   (fin du tour: si hits dégâts >= x, +1 tour validé)
 * - healing_done                (fin du tour: si l'acteur a soigné au moins une fois ce tour, +1 tour validé)
 * - healing_received            (recevoir un soin, +1 par hit de soin reçu)
 * - evade
 * - use_item
 *
 * Script calls utiles (craft):
 *  TriggerEquipSkills.addTrigger(item, conditionRaw, count, skillId);
 *  TriggerEquipSkills.setTriggers(item, [{conditionRaw, count, skillId}, ...]);
 *  TriggerEquipSkills.clearTriggers(item);
 *
 * NOTE:
 * - "item" ci-dessus doit être l'OBJET instance (indépendant) d'armure/arme, pas $dataArmors[id].
 *
 * Plugin Commands (optionnel, pour tests):
 * - AddTriggerToEquippedArmor
 * - ClearTriggersOnEquippedArmor
 */

/*~struct~DynamicTrigger:
 * @param conditionRaw
 * @text Condition
 * @type string
 * @default damage_taken
 *
 * @param count
 * @text Count
 * @type number
 * @default 1
 * @min 1
 *
 * @param skillId
 * @text Skill ID
 * @type number
 * @default 1
 * @min 1
 */

(() => {
  const PLUGIN_NAME = "TriggerEquipSkills";
  const params = PluginManager.parameters(PLUGIN_NAME);
  const ignoreTriggeredSkillForCounting =
    String(params.IgnoreTriggeredSkillForCounting || "true") === "true";
  const dynamicFieldName = String(params.DynamicFieldName || "_dynamicTriggerEquips");

  // ----------------------------
  // Parsing notetags
  // ----------------------------
  function parseTriggerEquipBlocks(note) {
    const blocks = [];
    const re = /<TriggerEquip>([\s\S]*?)<\/TriggerEquip>/gi;
    let m;
    while ((m = re.exec(note)) !== null) {
      const body = m[1];
      const lines = body
        .split(/\r?\n/)
        .map((s) => s.trim())
        .filter(Boolean);

      let conditionRaw = "";
      let count = 1;
      let skillId = 0;

      for (const line of lines) {
        const [k, ...rest] = line.split(":");
        if (!k || rest.length === 0) continue;
        const key = k.trim().toLowerCase();
        const val = rest.join(":").trim();

        if (key === "condition") conditionRaw = val;
        if (key === "count") count = Number(val);
        if (key === "skill") skillId = Number(val);
      }

      if (conditionRaw && Number.isFinite(count) && count > 0 && skillId > 0) {
        blocks.push({ conditionRaw, count, skillId });
      }
    }
    return blocks;
  }

  function normalizeCondition(conditionRaw) {
    const parts = String(conditionRaw || "").split(":").map((s) => s.trim());
    const key = (parts[0] || "").toLowerCase();
    const arg =
      parts[1] !== undefined && parts[1] !== "" ? Number(parts[1]) : null;
    return { key, arg };
  }

  function toRuntimeTrigger(t) {
    const conditionRaw = String(t?.conditionRaw ?? "");
    const count = Number(t?.count ?? 1);
    const skillId = Number(t?.skillId ?? 0);
    const cond = normalizeCondition(conditionRaw);
    if (!cond.key || !Number.isFinite(count) || count <= 0 || skillId <= 0) return null;
    return { conditionRaw, count, skillId, cond };
  }

  // ----------------------------
  // Source: notetags (base items)
  // ----------------------------
  function getNotetagTriggers(item) {
    if (!item) return [];
    if (!item._triggerEquipCache) {
      const blocks = parseTriggerEquipBlocks(item.note || "");
      item._triggerEquipCache = blocks
        .map((b) => ({ ...b, cond: normalizeCondition(b.conditionRaw) }))
        .filter((x) => x.cond.key && x.count > 0 && x.skillId > 0);
    }
    return item._triggerEquipCache;
  }

  // ----------------------------
  // Source: dynamic triggers (independent instances)
  // ----------------------------
  function getDynamicTriggers(item) {
    if (!item) return [];
    const raw = item[dynamicFieldName];
    if (!raw) return [];

    // Supporte:
    // - Array<{conditionRaw,count,skillId}>
    // - string JSON (au cas où)
    let arr = raw;
    if (typeof raw === "string") {
      try {
        arr = JSON.parse(raw);
      } catch (_) {
        return [];
      }
    }
    if (!Array.isArray(arr)) return [];

    const out = [];
    for (const t of arr) {
      const rt = toRuntimeTrigger(t);
      if (rt) out.push(rt);
    }
    return out;
  }

  // ----------------------------
  // Battler state
  // ----------------------------
  function battlerTriggerState(battler) {
    if (!battler._triggerEquipState) {
      battler._triggerEquipState = {
        counters: {},
        firedThisTurn: {},
        isTriggerCasting: false,

        // FIX: queue (no proc lost)
        queuedTriggerSkills: [],
        _lastActionConsumesTurn: false,
        _processingTriggerQueue: false,

        turnLocal: {
          damageDealtHits: 0,
          healedThisTurn: false,
        },
        orbDisplay: { current: 0, max: 0, ttl: 0 },
      };
    }
    return battler._triggerEquipState;
  }

  function makeCounterKey(condKey, condArg, skillId) {
    return `${condKey}:${condArg ?? ""}=>${skillId}`;
  }

  function incCounter(battler, condKey, condArg, skillId, amount = 1) {
    const st = battlerTriggerState(battler);
    const key = makeCounterKey(condKey, condArg, skillId);
    st.counters[key] = (st.counters[key] || 0) + amount;

    if (battler && battler.isActor && battler.isActor()) {
      const triggers = allEquippedTriggersForActor(battler);
      const trg = triggers.find(t =>
        t.skillId === skillId &&
        t.cond.key === condKey &&
        Number(t.cond.arg ?? null) === Number(condArg ?? null)
      );
      if (trg) {
        const current = st.counters[key] || 0;
        st.orbDisplay.current = Math.max(0, Math.min(current, trg.count));
        st.orbDisplay.max = Math.max(0, trg.count);
        st.orbDisplay.ttl = 90;
      }
    }

    checkImmediateTriggers(battler, condKey, condArg, skillId);
  }

  function checkImmediateTriggers(actor, condKey, condArg, skillId) {
    const endTurnKeys = ["damage_dealt_this_turn", "healing_done", "end_hp_below", "end_hp_above", "end_tp_at_least"];
    if (endTurnKeys.includes(condKey)) return;

    const triggers = allEquippedTriggersForActor(actor);

    for (const t of triggers) {
      if (t.skillId !== skillId) continue;
      if (t.cond.key !== condKey) continue;
      if (Number(t.cond.arg ?? null) !== Number(condArg ?? null)) continue;

      const current = getCounter(actor, condKey, condArg, skillId);
      if (current >= t.count) {
        queueTriggerSkill(actor, skillId, condKey, condArg);
        markFiredThisTurn(actor, condKey, condArg, skillId);
      }
    }
  }

  function getCounter(battler, condKey, condArg, skillId) {
    const st = battlerTriggerState(battler);
    const key = makeCounterKey(condKey, condArg, skillId);
    return st.counters[key] || 0;
  }

  function resetCounterFor(battler, condKey, condArg, skillId) {
    const st = battlerTriggerState(battler);
    const key = makeCounterKey(condKey, condArg, skillId);
    st.counters[key] = 0;
  }

  function markFiredThisTurn(battler, condKey, condArg, skillId) {
    const st = battlerTriggerState(battler);
    const key = makeCounterKey(condKey, condArg, skillId);
    st.firedThisTurn[key] = true;
  }

  function hasFiredThisTurn(battler, condKey, condArg, skillId) {
    const st = battlerTriggerState(battler);
    const key = makeCounterKey(condKey, condArg, skillId);
    return !!st.firedThisTurn[key];
  }

  function resetBattleCounters(battler) {
    const st = battlerTriggerState(battler);
    st.counters = {};
    st.firedThisTurn = {};
    st.turnLocal.damageDealtHits = 0;
    st.turnLocal.healedThisTurn = false;

    // optional: clear queue too
    st.queuedTriggerSkills = [];
    st._lastActionConsumesTurn = false;
    st._processingTriggerQueue = false;
  }

  function resetTurnLocal(battler) {
    const st = battlerTriggerState(battler);
    st.firedThisTurn = {};
    st.turnLocal.damageDealtHits = 0;
    st.turnLocal.healedThisTurn = false;
  }

  // ----------------------------
  // Equip triggers gather
  // ----------------------------
  function allEquippedTriggersForActor(actor) {
    const items = [];
    if (actor.weapons) items.push(...actor.weapons().filter(Boolean));
    if (actor.armors) items.push(...actor.armors().filter(Boolean));

    const triggers = [];
    for (const it of items) {
      triggers.push(...getNotetagTriggers(it));
      triggers.push(...getDynamicTriggers(it));
    }
    return triggers;
  }

  // ----------------------------
  // Reset timing
  // ----------------------------
  const _BattleManager_startBattle = BattleManager.startBattle;
  BattleManager.startBattle = function () {
    _BattleManager_startBattle.call(this);
    $gameParty.members().forEach((a) => resetBattleCounters(a));
    $gameTroop.members().forEach((e) => resetBattleCounters(e));
  };

  const _BattleManager_endBattle = BattleManager.endBattle;
  BattleManager.endBattle = function (result) {
    _BattleManager_endBattle.call(this, result);
    $gameParty.members().forEach((a) => resetBattleCounters(a));
    $gameTroop.members().forEach((e) => resetBattleCounters(e));
  };

  const _BattleManager_startTurn = BattleManager.startTurn;
  BattleManager.startTurn = function () {
    _BattleManager_startTurn.call(this);
    $gameParty.members().forEach((a) => resetTurnLocal(a));
    $gameTroop.members().forEach((e) => resetTurnLocal(e));
  };

  // ----------------------------
  // Counting hooks
  // ----------------------------
  const _Game_Battler_useItem = Game_Battler.prototype.useItem;
  Game_Battler.prototype.useItem = function (item) {
    const st = battlerTriggerState(this);
    const isSkill = DataManager.isSkill(item);
    const isItem = DataManager.isItem(item);

    if (!(ignoreTriggeredSkillForCounting && st.isTriggerCasting)) {
      if (this.isActor()) {
        const triggers = allEquippedTriggersForActor(this);

        // Utiliser un objet
        if (isItem) {
          for (const t of triggers) {
            if (t.cond.key === "use_item") {
              incCounter(this, "use_item", null, t.skillId, 1);
            }
          }
        }

        // Skill type use / Attack / Guard
        if (isSkill) {
          const stypeId = item.stypeId;

          for (const t of triggers) {
            const { key, arg } = t.cond;

            if (key === "skill_type_use" && Number(arg) === Number(stypeId)) {
              incCounter(this, "skill_type_use", arg, t.skillId, 1);
            }
            if (key === "attack" && item && item.id === this.attackSkillId()) {
              incCounter(this, "attack", null, t.skillId, 1);
            }
            if (key === "guard" && item && item.id === this.guardSkillId()) {
              incCounter(this, "guard", null, t.skillId, 1);
            }
          }
        }
      }
    }

    _Game_Battler_useItem.call(this, item);
  };

  const _Game_Battler_paySkillCost = Game_Battler.prototype.paySkillCost;
  Game_Battler.prototype.paySkillCost = function (skill) {
    const st = battlerTriggerState(this);

    if (!(ignoreTriggeredSkillForCounting && st.isTriggerCasting)) {
      if (this.isActor() && skill && DataManager.isSkill(skill)) {
        const tpCost = this.skillTpCost(skill);
        if (tpCost > 0) {
          const triggers = allEquippedTriggersForActor(this);
          for (const t of triggers) {
            if (t.cond.key === "tp_spent") {
              incCounter(this, "tp_spent", null, t.skillId, 1);
            }
          }
        }
      }
    }

    _Game_Battler_paySkillCost.call(this, skill);
  };

  // --- Healing received: count every healing tick (regen, lifesteal, direct heals, etc.) ---
  const _Game_Battler_gainHp = Game_Battler.prototype.gainHp;
  Game_Battler.prototype.gainHp = function(value) {
    _Game_Battler_gainHp.call(this, value);

    if (!$gameParty.inBattle()) return;
    if (!this.isActor()) return;
    if (value <= 0) return; // only actual healing

    const st = battlerTriggerState(this);
    if (ignoreTriggeredSkillForCounting && st.isTriggerCasting) return;

    const triggers = allEquippedTriggersForActor(this);
    for (const t of triggers) {
      if (t.cond.key === "healing_received") {
        incCounter(this, "healing_received", null, t.skillId, 1);
      }
    }
  };

  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function (target) {
    _Game_Action_apply.call(this, target);

    const subject = this.subject();
    const item = this.item();
    const result = target.result?.();
    if (!result) return;

    // --- Evade ---
    if (target.isActor() && result.evaded) {
      const stT = battlerTriggerState(target);
      if (!(ignoreTriggeredSkillForCounting && stT.isTriggerCasting)) {
        const actor = target;
        const triggers = allEquippedTriggersForActor(actor);
        for (const t of triggers) {
          if (t.cond.key === "evade") {
            incCounter(actor, "evade", null, t.skillId, 1);
          }
        }
      }
    }

    const hpDmg = result.hpDamage || 0;

    // --- Subir des dégâts ---
    if (hpDmg > 0 && target.isActor()) {
      const stT = battlerTriggerState(target);
      if (!(ignoreTriggeredSkillForCounting && stT.isTriggerCasting)) {
        const actor = target;
        const triggers = allEquippedTriggersForActor(actor);

        for (const t of triggers) {
          const { key, arg } = t.cond;

          if (key === "damage_taken") {
            incCounter(actor, "damage_taken", null, t.skillId, 1);
          }

          if (key === "damage_taken_skill_type") {
            if (DataManager.isSkill(item)) {
              const stypeId = item.stypeId;
              if (Number(arg) === Number(stypeId)) {
                incCounter(actor, "damage_taken_skill_type", arg, t.skillId, 1);
              }
            }
          }
        }
      }
    }

    // --- Infliger des dégâts / Crit / Flag soin (côté lanceur) ---
    if (subject && subject.isActor()) {
      const stS = battlerTriggerState(subject);
      if (!(ignoreTriggeredSkillForCounting && stS.isTriggerCasting)) {
        if (hpDmg > 0) {
          stS.turnLocal.damageDealtHits += 1;
        }

        if (result.critical && hpDmg > 0) {
          const actor = subject;
          const triggers = allEquippedTriggersForActor(actor);
          for (const t of triggers) {
            if (t.cond.key === "critical_dealt") {
              incCounter(actor, "critical_dealt", null, t.skillId, 1);
            }
          }
        }

        if (hpDmg < 0) {
          stS.turnLocal.healedThisTurn = true;
        }
      }
    }
  };

  // ----------------------------
  // End of turn: triggering
  // ----------------------------
  function shouldTriggerOnEndHp(actor, condKey, percent) {
    const hpRate = actor.hpRate() * 100;
    if (condKey === "end_hp_below") return hpRate < percent;
    if (condKey === "end_hp_above") return hpRate > percent;
    return false;
  }

  function shouldTriggerOnEndTp(actor, condKey, value) {
    if (condKey === "end_tp_at_least") return actor.tp >= value;
    return false;
  }

  // FIX: queue (no proc lost) + anti-dupe
  function queueTriggerSkill(actor, skillId, condKey, condArg) {
    const st = battlerTriggerState(actor);

    const exists = st.queuedTriggerSkills.some(q =>
      q.skillId === skillId &&
      q.condKey === condKey &&
      Number(q.condArg ?? null) === Number(condArg ?? null)
    );
    if (exists) return false;

    st.queuedTriggerSkills.push({ skillId, condKey, condArg });
    return true;
  }

  function tryFireTrigger(actor, trigger) {
    const { skillId, count } = trigger;
    const { key, arg } = trigger.cond;

    const endTurnKeys = ["damage_dealt_this_turn", "healing_done", "end_hp_below", "end_hp_above", "end_tp_at_least"];
    if (!endTurnKeys.includes(key)) return false;

    if (key === "damage_dealt_this_turn") {
      const hits = battlerTriggerState(actor).turnLocal.damageDealtHits;
      const minHits = Number(arg || 0);
      if (minHits > 0 && hits >= minHits) {
        incCounter(actor, "damage_dealt_this_turn", minHits, skillId, 1);
      }
    }

    if (key === "healing_done") {
      const didHeal = battlerTriggerState(actor).turnLocal.healedThisTurn;
      if (didHeal) {
        incCounter(actor, "healing_done", null, skillId, 1);
      }
    }

    if (key === "end_hp_below" || key === "end_hp_above") {
      if (!shouldTriggerOnEndHp(actor, key, Number(arg))) return false;
      incCounter(actor, key, arg, skillId, 1);
    }

    if (key === "end_tp_at_least") {
      if (!shouldTriggerOnEndTp(actor, key, Number(arg))) return false;
      incCounter(actor, key, arg, skillId, 1);
    }

    const current = getCounter(actor, key, arg, skillId);
    if (current < count) return false;
    if (hasFiredThisTurn(actor, key, arg, skillId)) return false;

    const ok = queueTriggerSkill(actor, skillId, key, arg);
    if (!ok) return false;

    markFiredThisTurn(actor, key, arg, skillId);
    return true;
  }

  const _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
  Game_Battler.prototype.onTurnEnd = function () {
    _Game_Battler_onTurnEnd.call(this);

    if (!this.isActor()) return;
    if (BattleManager.isBattleEnd()) return;

    const actor = this;
    const triggers = allEquippedTriggersForActor(actor);
    for (const t of triggers) {
      tryFireTrigger(actor, t);
    }
  };

  // ==========================================================
  // Public API for crafting (script calls)
  // ==========================================================
  const API = (window.TriggerEquipSkills ||= {});

  API.dynamicFieldName = dynamicFieldName;

  API.getTriggers = function (item) {
    if (!item) return [];
    const arr = item[dynamicFieldName];
    return Array.isArray(arr) ? arr : [];
  };

  API.addTrigger = function (item, conditionRaw, count, skillId) {
    if (!item) return false;
    const rt = toRuntimeTrigger({ conditionRaw, count, skillId });
    if (!rt) return false;

    item[dynamicFieldName] ??= [];
    if (!Array.isArray(item[dynamicFieldName])) item[dynamicFieldName] = [];

    item[dynamicFieldName].push({
      conditionRaw: rt.conditionRaw,
      count: rt.count,
      skillId: rt.skillId,
    });
    return true;
  };

  API.setTriggers = function (item, triggers) {
    if (!item) return false;
    if (!Array.isArray(triggers)) return false;

    const cleaned = [];
    for (const t of triggers) {
      const rt = toRuntimeTrigger(t);
      if (rt) cleaned.push({ conditionRaw: rt.conditionRaw, count: rt.count, skillId: rt.skillId });
    }
    item[dynamicFieldName] = cleaned;
    return true;
  };

  API.clearTriggers = function (item) {
    if (!item) return false;
    item[dynamicFieldName] = [];
    return true;
  };

  // ==========================================================
  // Plugin Commands (pratique pour tests)
  // ==========================================================
  PluginManager.registerCommand(PLUGIN_NAME, "AddTriggerToEquippedArmor", (args) => {
    const actorId = Number(args.actorId || 0);
    const slotIndex = Number(args.slotIndex || 0);
    const conditionRaw = String(args.conditionRaw || "");
    const count = Number(args.count || 1);
    const skillId = Number(args.skillId || 0);
    const replace = String(args.replace || "false") === "true";

    const actor = $gameActors.actor(actorId);
    if (!actor) return;

    const equip = actor.equips()[slotIndex];
    if (!equip) return;

    if (replace) API.clearTriggers(equip);
    API.addTrigger(equip, conditionRaw, count, skillId);
  });

  PluginManager.registerCommand(PLUGIN_NAME, "ClearTriggersOnEquippedArmor", (args) => {
    const actorId = Number(args.actorId || 0);
    const slotIndex = Number(args.slotIndex || 0);
    const actor = $gameActors.actor(actorId);
    if (!actor) return;

    const equip = actor.equips()[slotIndex];
    if (!equip) return;

    API.clearTriggers(equip);
  });

  // ---------------------------------------------
  // STB timing: proc only after a "turn-consuming" action.
  // In this project: Attack, Guard, Skill Type 2 ("EX") consume the turn.
  // Type 1 (often <STB Instant>) can queue procs without consuming the turn.
  // ---------------------------------------------
  function actionConsumesTurn(subject, action) {
    if (!subject || !subject.isActor || !subject.isActor()) return false;
    if (!action || !action.item) return false;
    const item = action.item();
    if (!item) return false;

    if (DataManager.isSkill(item)) {
      if (item.id === subject.attackSkillId()) return true;
      if (item.id === subject.guardSkillId()) return true;
      if (Number(item.stypeId) === 2) return true; // EX
    }
    return false;
  }

  const _BattleManager_startAction = BattleManager.startAction;
  BattleManager.startAction = function() {
    const subject = this._subject;
    const action = subject && subject.currentAction ? subject.currentAction() : null;

    if (subject && subject.isActor && subject.isActor()) {
      const st = battlerTriggerState(subject);
      st._lastActionConsumesTurn = actionConsumesTurn(subject, action);
    }

    _BattleManager_startAction.call(this);
  };

  const _BattleManager_endAction = BattleManager.endAction;
  BattleManager.endAction = function() {
    const subject = this._subject;

    // Let BattleManager finalize the action first (VisuStella/flow friendly)
    _BattleManager_endAction.call(this);

    if (!subject || !subject.isActor || !subject.isActor()) return;

    const st = battlerTriggerState(subject);
    if (!st.queuedTriggerSkills || st.queuedTriggerSkills.length === 0) return;

    // IMPORTANT: only execute queued procs after a turn-consuming action
    if (!st._lastActionConsumesTurn) return;

    // Avoid re-entrancy / loops
    if (st._processingTriggerQueue) return;
    st._processingTriggerQueue = true;

    try {
      // Execute ONE proc at a time; the rest will run on subsequent endAction calls
      const data = st.queuedTriggerSkills.shift();
      if (!data) return;

      const skillId = data.skillId;
      const skill = $dataSkills[skillId];

      if (skill && subject.canUse(skill)) {
        st.isTriggerCasting = true;

        subject.forceAction(skillId, -1);
        this.forceAction(subject);

        st.isTriggerCasting = false;

        // Reset ONLY when the proc is actually launched
        resetCounterFor(subject, data.condKey, data.condArg, data.skillId);

        st.orbDisplay.current = 0;
        st.orbDisplay.ttl = 20;
      } else {
        // If it can't be used right now, keep it (don't lose procs)
        st.queuedTriggerSkills.unshift(data);
      }
    } finally {
      st._processingTriggerQueue = false;
    }
  };

})();