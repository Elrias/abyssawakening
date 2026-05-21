/*:
 * @target MZ
 * @plugindesc [v2.8.2] Weapon Upgrade Core + Gem backend (fixe & aléatoire). Stocke sur l'objet arme. API WeaponUpg.* pour l'UI. (Hotfix: rétablit les APIs d'upgrade v2.x)
 * @author You
 *
 * @help
 * ────────────────────────────────────────────────────────────────────────────
 * GEMMES — NOTETAGS (Items)
 * ────────────────────────────────────────────────────────────────────────────
 * <UpgradeGem>
 *   Marque un objet comme gemme.
 *
 * (Gemme à bonus fixe)
 * <GemParams: ATK:+30, LUK:+10>
 *
 * (Gemme à bonus aléatoires)
 * <GemBonus: N>
 *   Tire N caractéristiques aléatoires.
 * <GemRanges: ATK:+20..+50, AGI:+70..+150, ...>
 *   Plage par stat (écrase DefaultGemRanges du plugin).
 * <GemAllowDuplicates>
 *   Autorise de tirer deux fois la même caractéristique (on cumule).
 *
 * ────────────────────────────────────────────────────────────────────────────
 * ARMES — NOTETAGS (Weapons)
 * ────────────────────────────────────────────────────────────────────────────
 * <Upgradeable>
 *   Marque l'arme comme améliorable (pour l'UI d'upgrade).
 * <UpgradeMaterial: 17x1, 21x2>
 *   Coûts matériels par tentative (format id x qty, séparés par des virgules).
 *
 * ────────────────────────────────────────────────────────────────────────────
 * STOCKAGE
 * ────────────────────────────────────────────────────────────────────────────
 * Sur l'objet arme (l'instance) : weapon._wupg = {
 *   lvl,
 *   slots: [ { itemId, bonuses:{pid:value,...} } | null, ... ]
 * }
 * - Migration auto depuis anciens formats :
 *   • rec.gems   (array d’IDs) → converti en slots
 *   • _gemSlots  (array d’IDs) → converti en slots
 *
 * ────────────────────────────────────────────────────────────────────────────
 * API exposée (window.WeaponUpg) — Compat v2.x
 * ────────────────────────────────────────────────────────────────────────────
 *  // Upgrade
 *  maxLevel()                    -> number
 *  paramNames()                  -> ["MHP","MMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *  slotsAtLevel(level)           -> count (via SlotBreakpoints)
 *  isUpgradeable(weapon)         -> boolean (notetag <Upgradeable>)
 *  inventoryUpgradeableWeapons() -> [weaponObj,...] (inventaire)
 *  currentLevelOf(weapon)        -> number
 *  nextGainOf(weapon)            -> {pid:diff,...}
 *  nextGainTextOf(weapon)        -> string
 *  nextMatsOf(weapon)            -> [{itemId,qty},...]
 *  nextMatsTextOf(weapon)        -> string
 *  beforeAfterFor(weapon)        -> { before:{pid:val}, after:{pid:val}, delta:{pid:diff}, cur, next }
 *  attemptOn(weapon)             -> {ok,success,msg} (respecte les matériaux + pitty)
 *
 *  // Gemmes (backend)
 *  slotCountOf(weapon)           -> nb slots UNLOCKED
 *  slotsOf(weapon)               -> [slot|null,...]
 *  totalsOf(weapon)              -> {pid:flat}
 *  applyGemTo(weapon,idx,itemId) -> {ok,msg,slot,totals}
 *
 * NOTE : Hotfix strictement ciblé sur l’upgrade. Aucune modification du
 *        mécanisme des gemmes par rapport à v2.8.
 *
 * ────────────────────────────────────────────────────────────────────────────
 * @param MaxLevel
 * @type number @min 1 @default 10
 *
 * @param LevelMultipliers
 * @type string
 * @default 1.00,1.05,1.10,1.15,1.20,1.25,1.35,1.45,1.60,1.75,2.00
 *
 * @param RoundMode
 * @type select
 * @option round @option floor @option ceil
 * @default round
 *
 * @param ScaleNegativeParams
 * @type boolean @default false
 *
 * @param SlotBreakpoints
 * @text Gem Slot Breakpoints (levels)
 * @type string
 * @default 2,4,6,8,10
 *
 * @param DefaultGemRanges
 * @text Default random ranges (CSV)
 * @type string
 * @default MHP:+200..+500, MMP:+100..+200, ATK:+20..+50, DEF:+2..+5, MAT:+20..+50, MDF:+2..+5, AGI:+70..+150, LUK:+100..+200
 *
 * @param AllowDuplicatesDefault
 * @type boolean
 * @default false
 * 
 * @param LevelMaterials
 * @text Materials per Level
 * @type string
 * @desc Format: niveau:itemIdxqty,itemIdxqty; niveau:itemIdxqty
 * @default 1:17x1;2:17x2;3:17x3;4:17x5;5:17x8;6:17x12;7:17x16;8:17x20;9:17x25;10:17x30
 */

(() => {
  'use strict';

  // ---------- Params ----------
  const PNAME = (() => {
    const scripts = document.getElementsByTagName('script');
    const src =
      (document.currentScript && document.currentScript.src) ||
      (scripts.length ? scripts[scripts.length - 1].src : '');
    const m = src.match(/([^\/]+)\.js$/);
    return m ? decodeURIComponent(m[1]) : 'WeaponUpgradeCore';
  })();

  const PP = PluginManager.parameters(PNAME);
  const MAX_LEVEL = Number(PP.MaxLevel || 10);
  const MULTS = (PP.LevelMultipliers || '1')
    .split(',')
    .map(s => Number(s.trim()))
    .filter(Number.isFinite);
  const ROUND = String(PP.RoundMode || 'round').toLowerCase();
  const SCALE_NEG = String(PP.ScaleNegativeParams || 'false') === 'true';
  const SLOT_POINTS = (PP.SlotBreakpoints || '2,4,6,8,10')
    .split(',')
    .map(s => Number(s.trim()))
    .filter(Number.isFinite);
  const DEFAULT_RANGES_RAW = String(PP.DefaultGemRanges || '');
  const DUP_DEFAULT = String(PP.AllowDuplicatesDefault || 'false') === 'true';

  const PNS = ['MHP', 'MMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'];

  const clampLevel = L => Math.max(0, Math.min(MAX_LEVEL, L | 0));
  const roundBy = v =>
    ROUND === 'floor' ? Math.floor(v) : ROUND === 'ceil' ? Math.ceil(v) : Math.round(v);
  const LEVEL_MATS_RAW = String(PP.LevelMaterials || "");

  function parseLevelMaterials(str) {
    const map = {};

    str.split(';').forEach(entry => {
      const [lvlPart, matsPart] = entry.split(':');
      if (!lvlPart || !matsPart) return;

      const level = Number(lvlPart.trim());
      if (!Number.isFinite(level)) return;

      const mats = [];
      matsPart.split(',').forEach(tok => {
        const m = tok.trim().match(/^(\d+)\s*x\s*(\d+)$/i);
        if (m) {
          mats.push({
            itemId: Number(m[1]),
            qty: Number(m[2])
          });
        }
      });

      map[level] = mats;
    });

    return map;
  }

  const LEVEL_MATS = parseLevelMaterials(LEVEL_MATS_RAW);
  function slotsAtLevel(L) {
    let c = 0;
    for (const t of SLOT_POINTS) if ((L | 0) >= t) c++;
    return c;
  }

  // =====================================================================
  // Save-safe persistence for _wupg
  // (works even if an external independent-items system rebuilds objects)
  // =====================================================================
  function _wupgStore() {
    $gameSystem._wupgStore = $gameSystem._wupgStore || {};
    return $gameSystem._wupgStore;
  }
  function _wupgKey(w) {
    if (!w) return null;
    const oid = (w.originalId != null) ? w.originalId : 0;
    return `${w.id}|${oid}`;
  }
  function _wupgStoreRec(w) {
    if (!w || !w._wupg) return;
    const k = _wupgKey(w);
    if (!k) return;
    _wupgStore()[k] = {
      lvl: w._wupg.lvl | 0,
      slots: Array.isArray(w._wupg.slots) ? JSON.parse(JSON.stringify(w._wupg.slots)) : []
    };
  }
  function _wupgRestoreRec(w) {
    if (!w) return;
    const k = _wupgKey(w);
    const snap = k ? _wupgStore()[k] : null;
    if (!snap) return;

    w._wupg = w._wupg || {};
    w._wupg.lvl = snap.lvl | 0;
    w._wupg.slots = Array.isArray(snap.slots) ? JSON.parse(JSON.stringify(snap.slots)) : [];
  }

  // =====================================================================
  // Convert ONLY when upgrading (safe for shops): ensureIndependentForUpgrade
  // =====================================================================
  function ensureIndependentForUpgrade(w) {
    if (!w) return w;

    // Already independent?
    if (w.id >= 10000 && w.originalId != null) return w;

    // Only convert weapons explicitly tagged independentItem
    if (!w.meta || !w.meta.independentItem) return w;

    // Needs DM_IndependentItems runtime
    if (!window.$gameIndependents || typeof $gameIndependents.gainIndependentItem !== 'function') return w;

    // Create independent copy (this ALSO gains it to party)
    $gameIndependents.gainIndependentItem(w, 1);
    const newId = $gameIndependents._independentId - 1;
    const nw = $dataWeapons[newId];
    if (!nw) return w;

    // Carry current record if any (for safety)
    if (w._wupg) {
      nw._wupg = JSON.parse(JSON.stringify(w._wupg));
    }

    // Swap equips (if equipped anywhere)
    $gameParty.members().forEach(a => {
      if (!a) return;
      const eqs = a.equips();
      for (let i = 0; i < eqs.length; i++) {
        if (eqs[i] === w) a.changeEquip(i, nw);
      }
    });

    // Remove one old DB copy from inventory (if any)
    if ($gameParty.numItems(w) > 0) $gameParty.loseItem(w, 1, false);

    // Copy persisted snapshot key if it existed
    const ok = _wupgKey(w);
    const nk = _wupgKey(nw);
    if (ok && nk && _wupgStore()[ok]) {
      _wupgStore()[nk] = JSON.parse(JSON.stringify(_wupgStore()[ok]));
    }

    return nw;
  }

  // ---------- Upgrade notetags (compat UI) ----------
  function weaponMeta(w) {
    if (!w) return { _wupgUpg: false, _wupgMats: [], _wupgMatsLevel10: null };

    let baseWeapon = w;
    if (w.baseItemId && $dataWeapons[w.baseItemId]) {
      baseWeapon = $dataWeapons[w.baseItemId];
    } else if (w.originalId && $dataWeapons[w.originalId]) {
      baseWeapon = $dataWeapons[w.originalId];
    } else if ($dataWeapons[w.id]) {
      baseWeapon = $dataWeapons[w.id];
    }

    const note = String(baseWeapon.note || '');

    const upg = /<\s*Upgradeable\s*>/i.test(note);

    const mm = note.match(/<\s*UpgradeMaterial\s*:\s*([^>]+)>/i);
    const mats = mm ? parseMats(mm[1]) : [];

    const m10 = note.match(/<\s*UpgradeMaterialLevel10\s*:\s*([^>]+)>/i);
    const mats10 = m10 ? parseMats(m10[1]) : null;

    return {
      _wupgUpg: upg,
      _wupgMats: mats,
      _wupgMatsLevel10: mats10
    };
  }
  function parseMats(str) {
    const out = [];
    String(str || '')
      .split(',')
      .forEach(tok => {
        const m = tok.trim().match(/^(\d+)\s*x\s*(\d+)$/i);
        if (m) out.push({ itemId: Number(m[1]), qty: Number(m[2]) });
      });
    return out;
  }
  function matsOf(w) {
    return (weaponMeta(w)._wupgMats || []).slice();
  }
  function matsToText(arr) {
    return arr
      .map(
        m => `x${m.qty} ${($dataItems[m.itemId] && $dataItems[m.itemId].name) || 'Item ' + m.itemId}`
      )
      .join(', ');
  }
function canPayMats(w) {
  const mats = nextMatsOf(w);
  if (!mats.length) return false;
  return mats.every(m => $gameParty.numItems($dataItems[m.itemId]) >= m.qty);
}

  function payMats(w) {
    nextMatsOf(w).forEach(m => {
      $gameParty.loseItem($dataItems[m.itemId], m.qty);
    });
  }
  function isUpgradeable(w) {
    return !!weaponMeta(w)._wupgUpg;
  }

  function inventoryUpgradeableWeapons() {
    // IMPORTANT (DM_IndependentItems):
    // Do NOT de-duplicate by database id. Independent items can have multiple instances
    // of the same weapon, each with different upgrade levels / gem slots.
    const out = [];
    $gameParty.weapons().forEach(w => {
      if (!w) return;
      if (isUpgradeable(w) && $gameParty.numItems(w) > 0) out.push(w);
    });
    return out;
  }

  // ---------- GEM parsing ----------
  function parseFixedGem(it) {
    const out = {};
    if (!it || !it.note) return out;
    const m = it.note.match(/<\s*GemParams\s*:\s*([^>]+)>/i);
    if (!m) return out;
    m[1].split(/[ ,\n]+/).forEach(tok => {
      const mm = tok.match(/^([A-Z_]+)\s*:\s*([+\-]?\d+)$/i);
      if (!mm) return;
      const pid = PNS.indexOf(mm[1].trim().toUpperCase());
      if (pid < 0) return;
      const v = Number(mm[2]);
      if (!Number.isFinite(v)) return;
      out[pid] = (out[pid] || 0) + v;
    });
    return out;
  }
  function parseRanges(str) {
    const map = {};
    String(str || '')
      .split(',')
      .forEach(tok => {
        const m = tok.trim().match(/^([A-Z_]+)\s*:\s*([+\-]?\d+)\.\.([+\-]?\d+)$/i);
        if (!m) return;
        const pid = PNS.indexOf(m[1].toUpperCase());
        if (pid < 0) return;
        const a = Number(m[2]),
          b = Number(m[3]);
        if (!Number.isFinite(a) || !Number.isFinite(b)) return;
        map[pid] = [Math.min(a, b), Math.max(a, b)];
      });
    return map;
  }
  const DEFAULT_RANGES = parseRanges(DEFAULT_RANGES_RAW);
  function gemMeta(it) {
    const note = String((it && it.note) || '');
    const isGem = /<\s*UpgradeGem\s*>/i.test(note);
    const fixed = parseFixedGem(it);
    let bonusCount = 0;
    const mB = note.match(/<\s*GemBonus\s*:\s*(\d+)\s*>/i);
    if (mB) bonusCount = Number(mB[1]) | 0;
    let ranges = DEFAULT_RANGES;
    const mR = note.match(/<\s*GemRanges\s*:\s*([^>]+)>/i);
    if (mR) ranges = parseRanges(mR[1]);
    const allowDup = /<\s*GemAllowDuplicates\s*>/i.test(note) || DUP_DEFAULT;
    return { isGem, fixed, bonusCount, ranges, allowDup };
  }
  function rollRandomBonuses(count, ranges, allowDup) {
    const pids = Object.keys(ranges).map(k => Number(k));
    const out = {};
    if (!pids.length || count <= 0) return out;
    const pool = pids.slice();
    for (let i = 0; i < count; i++) {
      if (!allowDup && pool.length === 0) break;
      const use = allowDup ? pids : pool;
      const idx = Math.floor(Math.random() * use.length);
      const pid = use[idx];
      if (!allowDup) use.splice(idx, 1);
      const [a, b] = ranges[pid] || [0, 0];
      const val = Math.floor(Math.random() * (b - a + 1)) + a;
      out[pid] = (out[pid] || 0) + val;
    }
    return out;
  }

  // ---------- Record storage + migration ----------
  function recOfWeaponObj(w) {
    if (!w) return { lvl: 0, slots: [], gems: [], gemRolls: [] };
    if (!w._wupg) w._wupg = { lvl: 0, slots: [], gems: [], gemRolls: [] };
    if (!Array.isArray(w._wupg.slots)) w._wupg.slots = [];

    // ✅ restore persisted snapshot if external rebuild wiped custom fields
    _wupgRestoreRec(w);

    return w._wupg;
  }

  function migrateOldGems(w) {
    const rec = recOfWeaponObj(w);
    // v1: rec.gems = [itemId,...]
    if (Array.isArray(rec.gems) && rec.gems.length) {
      for (let i = 0; i < rec.gems.length; i++) {
        const gid = rec.gems[i];
        if (!gid) continue;
        const it = $dataItems[gid];
        if (!it) continue;
        const fixed = parseFixedGem(it);
        rec.slots[i] = { itemId: gid, bonuses: Object.keys(fixed).length ? fixed : {} };
      }
      rec.gems = [];
    }
    // v2: _gemSlots = [itemId|null,...]
    if (Array.isArray(w._gemSlots) && w._gemSlots.length) {
      for (let i = 0; i < w._gemSlots.length; i++) {
        const gid = w._gemSlots[i];
        if (!gid) continue;
        const it = $dataItems[gid];
        if (!it) continue;
        const fixed = parseFixedGem(it);
        rec.slots[i] = { itemId: gid, bonuses: fixed };
      }
      w._gemSlots.length = 0;
    }
  }
  function ensureSlotArraySize(rec, upto) {
    for (let i = rec.slots.length; i <= upto; i++) rec.slots[i] = rec.slots[i] || null;
  }

  // ---------- Upgrade math ----------
  function targetParamAtLevel(w, pid, L) {
    const base = (w.params && w.params[pid]) || 0;
    if (base < 0 && !SCALE_NEG) return base;
    const m = MULTS[clampLevel(L)] || 1;
    return roundBy(base * m);
  }

  // ---------- PUBLIC: gems ----------
  function slotCountOf(w) {
    if (!w) return 0;
    const rec = recOfWeaponObj(w);
    return slotsAtLevel(rec.lvl | 0);
  }
  function slotsOf(w) {
    if (!w) return [];
    migrateOldGems(w);
    const rec = recOfWeaponObj(w);
    return rec.slots.slice();
  }
  function totalsOf(w) {
    const out = {};
    if (!w) return out;
    migrateOldGems(w);
    const rec = recOfWeaponObj(w);
    const unlocked = slotsAtLevel(rec.lvl | 0);
    for (let i = 0; i < unlocked; i++) {
      const s = rec.slots[i];
      if (!s || !s.bonuses) continue;
      for (const k of Object.keys(s.bonuses)) {
        const pid = Number(k),
          v = s.bonuses[k] | 0;
        out[pid] = (out[pid] || 0) + v;
      }
    }
    return out;
  }
  function applyGemTo(w, idx, itemId) {
    if (!w) return { ok: false, msg: 'No weapon.' };

    // ✅ convert only when we are about to mutate the instance
    w = ensureIndependentForUpgrade(w);

    migrateOldGems(w);
    const rec = recOfWeaponObj(w);
    const unlocked = slotsAtLevel(rec.lvl | 0);
    if (idx < 0 || idx >= unlocked) return { ok: false, msg: 'Locked slot.' };
    const it = $dataItems[itemId];
    if (!it) return { ok: false, msg: 'Invalid gem.' };
    const meta = gemMeta(it);
    if (!meta.isGem) return { ok: false, msg: 'Not a gem.' };

    const fixed = meta.fixed || {};
    const rand =
      meta.bonusCount > 0
        ? rollRandomBonuses(meta.bonusCount, meta.ranges, meta.allowDup)
        : {};
    const bonuses = {};
    for (const k in fixed) bonuses[k] = (bonuses[k] || 0) + fixed[k];
    for (const k in rand) bonuses[k] = (bonuses[k] || 0) + rand[k];

    ensureSlotArraySize(rec, idx);
    rec.slots[idx] = { itemId, bonuses };

    // ✅ persist after gem change
    _wupgStoreRec(w);

    return { ok: true, msg: 'Gem applied', slot: rec.slots[idx], totals: totalsOf(w) };
  }

  // ---------- Equipped contribution (paramPlus) ----------
  const _paramPlusBase = Game_BattlerBase.prototype.paramPlus;
  Game_BattlerBase.prototype.paramPlus = function (pid) {
    let plus = _paramPlusBase.call(this, pid);

    if (this.isActor && this.isActor()) {
      const equips = this._equips || [];
      for (const gi of equips) {
        if (!gi || !gi.isWeapon || !gi.isWeapon()) continue;
        const w = gi.object();
        if (!w) continue;

        const rec = recOfWeaponObj(w);
        const L = rec.lvl | 0;

        // Upgrade scaling
        const base = (w.params && w.params[pid]) || 0;
        const target = targetParamAtLevel(w, pid, L);
        plus += target - base;

        // Gem flats (slots débloqués uniquement)
        const unlocked = slotsAtLevel(L);
        for (let i = 0; i < unlocked; i++) {
          const s = rec.slots[i];
          if (s && s.bonuses && s.bonuses[pid]) plus += s.bonuses[pid] | 0;
        }
      }
    }
    return plus;
  };

  // ---------- Upgrade APIs (compat v2.x) ----------
  function currentLevelOf(w) {
    return recOfWeaponObj(w).lvl | 0;
  }

  function nextGainOf(w) {
    const L = currentLevelOf(w),
      N = Math.min(MAX_LEVEL, L + 1);
    const gains = {};
    for (let pid = 0; pid < 8; pid++) {
      const a = targetParamAtLevel(w, pid, L),
        b = targetParamAtLevel(w, pid, N);
      const d = b - a;
      if (d) gains[pid] = d;
    }
    return gains;
  }

  function nextGainTextOf(w) {
    const g = nextGainOf(w);
    const parts = [];
    for (const k of Object.keys(g)) {
      const pid = Number(k),
        v = g[pid];
      parts.push(`${PNS[pid]}${v >= 0 ? '+' : ''}${v}`);
    }
    return parts.join(', ');
  }

  function beforeAfterFor(w) {
    const rec = recOfWeaponObj(w);
    const cur = rec.lvl | 0;
    const next = Math.min(MAX_LEVEL, cur + 1);
    const before = {},
      after = {},
      delta = {};
    for (let pid = 0; pid < 8; pid++) {
      const a = targetParamAtLevel(w, pid, cur);
      const b = targetParamAtLevel(w, pid, next);
      before[pid] = a;
      after[pid] = b;
      delta[pid] = b - a;
    }
    return { before, after, delta, cur, next };
  }

  function nextMatsOf(w) {
    const rec = recOfWeaponObj(w);
    const nextLevel = (rec.lvl | 0) + 1;

    // priorité aux paramètres plugin
    if (LEVEL_MATS[nextLevel]) {
      return LEVEL_MATS[nextLevel];
    }
    // fallback (ancien système si rien défini)
    return [];
  }

function nextMatsTextOf(w) {
  return matsToText(nextMatsOf(w));
}

  function attemptOn(w) {
    if (!w) return { ok: false, success: false, msg: 'No weapon.' };

    // ✅ convert only when upgrading (safe for shops)
    w = ensureIndependentForUpgrade(w);

    const rec = recOfWeaponObj(w);
    if (rec.lvl >= MAX_LEVEL) return { ok: false, success: false, msg: 'Max level.' };
    if (!canPayMats(w)) return { ok: false, success: false, msg: 'Not enough materials.' };

    // Consomme les matériaux (toujours)
    payMats(w);

    // Upgrade garanti
    rec.lvl = Math.min(MAX_LEVEL, rec.lvl + 1);

    // Persist
    _wupgStoreRec(w);

    return { ok: true, success: true, msg: `Success! +${rec.lvl}` };
  }

  // ---------- Expose ----------
  window.WeaponUpg = {
    // config
    maxLevel() { return MAX_LEVEL; },
    paramNames() { return PNS.slice(); },
    slotsAtLevel,

    // conversion (for UI)
    ensureIndependentForUpgrade,

    // upgrade (compat)
    isUpgradeable,
    inventoryUpgradeableWeapons,
    currentLevelOf,
    nextGainOf,
    nextGainTextOf,
    nextMatsOf,
    nextMatsTextOf,
    beforeAfterFor,
    attemptOn,

    // gemmes
    slotCountOf,
    slotsOf,
    totalsOf,
    applyGemTo,
  };
})();