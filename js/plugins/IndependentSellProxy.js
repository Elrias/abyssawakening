/*:
 * @target MZ
 * @plugindesc [Compat] VisuStella More Currencies: make Shop Sell list treat independent equips as their base item (originalId) for UI + payout, while removing the real instance.
 * @author Elrias
 *
 * @help
 * Put this plugin BELOW:
 * - VisuMZ_MoreCurrencies (and related shop plugins)
 * - DM_IndependentItems
 *
 * What it does:
 * 1) In the SELL list, replaces any independent weapon/armor entry with its BASE database entry (originalId),
 *    and stores a mapping index -> real independent instance.
 * 2) When selling, it temporarily adds the base item so the default/VisuStella selling routine can remove it
 *    and pay currencies correctly, then removes the real independent instance.
 *
 * This makes the UI show the correct currencies and the payout works.
 */

(() => {
  "use strict";

  function isIndependentEquip(it) {
    return !!(it && it.etypeId != null && it.id >= 10000 && it.originalId != null);
  }

  function baseOf(it) {
    if (!it || !isIndependentEquip(it)) return it;
    if (it.wtypeId != null) return $dataWeapons[it.originalId] || it; // weapon
    return $dataArmors[it.originalId] || it; // armor
  }

  // ---------------------------------------------------------------------------
  // 1) Patch the SELL window list so its _data uses BASE items (so More Currencies UI works)
  //    while keeping a mapping to the REAL independent instance per index.
  // ---------------------------------------------------------------------------
  const _Window_ShopSell_makeItemList = Window_ShopSell.prototype.makeItemList;
  Window_ShopSell.prototype.makeItemList = function() {
    _Window_ShopSell_makeItemList.call(this);

    // Build mapping: same length as _data
    this._indepRealByIndex = [];

    if (!Array.isArray(this._data)) return;

    for (let i = 0; i < this._data.length; i++) {
      const real = this._data[i];
      if (isIndependentEquip(real)) {
        this._indepRealByIndex[i] = real;      // store real instance
        this._data[i] = baseOf(real);          // replace list entry with base DB item
      } else {
        this._indepRealByIndex[i] = null;
      }
    }
  };

  // Convenience getter: which real independent instance corresponds to current selection?
  Window_ShopSell.prototype.indepRealSelection = function() {
    const i = this.index();
    if (!this._indepRealByIndex || i == null || i < 0) return null;
    return this._indepRealByIndex[i] || null;
  };

  // ---------------------------------------------------------------------------
  // 2) Patch Scene_Shop.doSell:
  //    - If current selection came from an independent item, sell BASE for payout (More Currencies),
  //      then remove REAL independent instance.
  // ---------------------------------------------------------------------------
  const _Scene_Shop_doSell = Scene_Shop.prototype.doSell;
  Scene_Shop.prototype.doSell = function(number) {
    const sellWin = this._sellWindow;
    const real = sellWin && sellWin.indepRealSelection ? sellWin.indepRealSelection() : null;

    // If not an independent selection, normal flow
    if (!real || !isIndependentEquip(real)) {
      return _Scene_Shop_doSell.call(this, number);
    }

    const base = baseOf(real);

    // Recursion guard
    if (this._indepSellListProxyLock) return _Scene_Shop_doSell.call(this, number);
    this._indepSellListProxyLock = true;

    try {
      // Equipments are usually sold one by one, but keep number anyway.
      const n = Math.max(1, number | 0);

      // 1) Add temporary base items so the sell routine can remove them “legally”
      $gameParty.gainItem(base, n, false);

      // 2) Run VisuStella/vanilla selling on BASE (this is where More Currencies pays out)
      const savedItem = this._item;
      this._item = base;
      _Scene_Shop_doSell.call(this, n);
      this._item = savedItem;

      // 3) Remove the REAL independent instance(s)
      $gameParty.loseItem(real, n, false);

      // 4) Cleanup leftovers of base (safety in case sale was blocked)
      const leftover = $gameParty.numItems(base);
      if (leftover > 0) $gameParty.loseItem(base, leftover, false);

      // Refresh
      this._goldWindow.refresh();
      this._statusWindow.refresh();
      this._buyWindow.refresh();
      this._sellWindow.refresh();
    } finally {
      this._indepSellListProxyLock = false;
    }
  };

  const _Window_ShopSell_drawItem = Window_ShopSell.prototype.drawItem;
  Window_ShopSell.prototype.drawItem = function(index) {
    const real = this._indepRealByIndex && this._indepRealByIndex[index];
    if (real) {
      const base = this._data && this._data[index];
      if (base && base.name != null) {
        let lvl = 0;
        try {
          if (real._wupg && real._wupg.lvl != null) lvl = real._wupg.lvl | 0;
          else if (window.WeaponUpg && typeof WeaponUpg.currentLevelOf === "function") lvl = WeaponUpg.currentLevelOf(real) | 0;
        } catch (_) { lvl = 0; }

        const oldName = base.name;
        base.name = (lvl > 0) ? `${oldName} +${lvl}` : oldName;
        try { _Window_ShopSell_drawItem.call(this, index); }
        finally { base.name = oldName; }
        return;
      }
    }
    _Window_ShopSell_drawItem.call(this, index);
  };

})();