/*:
 * @target MZ
 * @plugindesc [v1.0] Param Rates additifs/multiplicatifs au choix via notetags (par objet et par paramètre)
 * @author You
 *
 * @help
 * Placez ce plugin APRÈS les plugins VisuStella MZ pour qu'il prenne la main.
 * Il ne change QUE la combinaison des traits "Param Rate" (code TRAIT_PARAM).
 * Les bonus plats (paramPlus) et les buffs/debuffs restent natifs.
 *
 * -----------------------------
 * NOTETAGS (dans Acteur/Classe/État/Arme/Armure/Ennemi)
 * -----------------------------
 * 1) Mode global pour l'objet (tous ses Param Rates) :
 *    <ParamRateMode: Add>
 *    <ParamRateMode: Mult>
 *
 * 2) Mode par paramètre :
 *    <AdditiveParamRate: ATK, MAT>
 *    <MultiplicativeParamRate: DEF, MHP>
 *
 *    Paramètres acceptés (insensible à la casse) :
 *    MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *    (ou les IDs 0..7)
 *
 * Exemples :
 *  - Une armure avec <ParamRateMode: Add> rend tous ses % additifs.
 *  - Un état peut être globalement additif, sauf DEF en mult :
 *      <ParamRateMode: Add>
 *      <MultiplicativeParamRate: DEF>
 *
 * -----------------------------
 * FONCTIONNEMENT
 * -----------------------------
 * Par défaut (param plugin), tout ce qui n'est pas taggé suit le mode choisi :
 *  - Additive :  1 + Σ(v - 1)
 *  - Multiplicative : Π(v)
 * Le résultat final = (Additif) * (Multiplicatif) * (extraFactor)
 * où extraFactor préserve d'éventuels ajouts d'autres plugins dans paramRate().
 *
 * -----------------------------
 * COMPATIBILITÉ
 * -----------------------------
 * - Placez ce plugin SOUS VisuMZ_1_SkillsStatesCore / Battle Core, etc.
 * - Si un autre plugin modifie aussi paramRate(), laissez celui-ci tout en bas.
 */

(() => {
  "use strict";

  const PLUGIN_NAME = "ParamRateModesNotetags";

  const params = PluginManager.parameters(PLUGIN_NAME);
  const defaultMode = String(params["DefaultMode"] || "Additive").toLowerCase().startsWith("add") ? "add" : "mult";
  const clampMin = Number(params["ClampMinRate"] || 0);

  // -------------------------
  // Helpers
  // -------------------------
  const PARAM_MAP = {
    "0":0,"MHP":0,"HP":0,"MAXHP":0,
    "1":1,"MMP":1,"MP":1,"MAXMP":1,
    "2":2,"ATK":2,"STR":2,
    "3":3,"DEF":3,"VIT":3,
    "4":4,"MAT":4,"INT":4,
    "5":5,"MDF":5,"MND":5,
    "6":6,"AGI":6,"DEX":6, // DEX mappé à AGI par commodité
    "7":7,"LUK":7
  };

  function toParamId(token) {
    if (!token) return null;
    const key = String(token).trim().toUpperCase();
    return PARAM_MAP.hasOwnProperty(key) ? PARAM_MAP[key] : null;
  }

  function parseList(str) {
    return String(str).split(",").map(s => s.trim()).filter(s => s);
  }

  // -------------------------
  // Notetags parsing
  // -------------------------
  const _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    if (!_DataManager_isDatabaseLoaded.call(this)) return false;
    if (!this._PRModesParsed) {
      this._PRModesParsed = true;
      const groups = [$dataActors, $dataClasses, $dataWeapons, $dataArmors, $dataStates, $dataEnemies];
      for (const group of groups) {
        if (!group) continue;
        for (let i = 1; i < group.length; i++) {
          const obj = group[i];
          if (obj) processNotetags(obj);
        }
      }
    }
    return true;
  };

  function processNotetags(obj) {
    obj._prModeAll = null;        // "add" | "mult" | null
    obj._prModeByParam = {};      // {paramId: "add"|"mult"}

    if (!obj.note) return;
    const note = obj.note;

    // <ParamRateMode: Add> / <ParamRateMode: Mult>
    note.replace(/<ParamRateMode\s*:\s*(.+?)>/gi, (_, a) => {
      const v = String(a).trim().toLowerCase();
      obj._prModeAll = v.startsWith("add") ? "add" : "mult";
      return "";
    });

    // <AdditiveParamRate: ...>
    note.replace(/<AdditiveParamRate\s*:\s*([^>]+)>/gi, (_, list) => {
      for (const tok of parseList(list)) {
        const id = toParamId(tok);
        if (id != null) obj._prModeByParam[id] = "add";
      }
      return "";
    });

    // <MultiplicativeParamRate: ...>
    note.replace(/<MultiplicativeParamRate\s*:\s*([^>]+)>/gi, (_, list) => {
      for (const tok of parseList(list)) {
        const id = toParamId(tok);
        if (id != null) obj._prModeByParam[id] = "mult";
      }
      return "";
    });
  }

  function resolveModeFor(obj, paramId) {
    if (obj && obj._prModeByParam && obj._prModeByParam.hasOwnProperty(paramId)) {
      return obj._prModeByParam[paramId];
    }
    if (obj && obj._prModeAll) return obj._prModeAll;
    return defaultMode; // fallback global
  }

  // -------------------------
  // paramRate override
  // -------------------------
  const _paramRate_native = Game_BattlerBase.prototype.paramRate;

  Game_BattlerBase.prototype.paramRate = function(paramId) {
    // Taux natif (inclut le produit des traits + éventuels ajouts d'autres plugins)
    const nativeRate = _paramRate_native.call(this, paramId);

    // On recompose la partie TRAIT_PARAM selon nos modes, puis on réapplique l'extraFactor.
    const traitObjs = this.traitObjects();

    let traitsProductNative = 1;  // produit vanilla de tous les traits TRAIT_PARAM
    let addSum = 0;               // somme additive des (v-1) pour traits marqués "add"
    let multProd = 1;             // produit pour traits marqués "mult"

    for (const obj of traitObjs) {
      if (!obj || !obj.traits) continue;
      const modeForObj = resolveModeFor(obj, paramId);
      for (const tr of obj.traits) {
        if (tr.code === Game_BattlerBase.TRAIT_PARAM && tr.dataId === paramId) {
          const v = tr.value;
          traitsProductNative *= v;
          if (modeForObj === "add") addSum += (v - 1);
          else multProd *= v; // "mult"
        }
      }
    }

    const desiredTraitsRate = Math.max(clampMin, (1 + addSum)) * multProd;

    // extraFactor = tout ce que d'autres plugins auraient ajouté autour du produit de traits
    const extraFactor = (traitsProductNative !== 0) ? (nativeRate / traitsProductNative) : nativeRate;

    const out = desiredTraitsRate * extraFactor;
    return Math.max(clampMin, out);
  };
})();
