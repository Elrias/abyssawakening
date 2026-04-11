/*:
 * @target MZ
 * @plugindesc Shop Sell: hide items with <Cannot Sell> from the sell list (MZ + VisuStella) v1.0
 * @help Place this plugin BELOW VisuStella plugins.
 */

(() => {
  function hasCannotSell(item) {
    if (!item) return false;
    const note = item.note || "";
    if (/<\s*Cannot\s*Sell\s*>/i.test(note)) return true;
    const m = item.meta || {};
    return !!(m["Cannot Sell"] || m.CannotSell || m.cannotSell);
  }

  // Ne pas lister les objets non vendables dans la fenêtre de VENTE
  const _includes = Window_ShopSell.prototype.includes;
  Window_ShopSell.prototype.includes = function(item) {
    if (item && hasCannotSell(item)) return false;
    return _includes.call(this, item);
  };

  // (Optionnel) si un plugin reconstruit la liste via makeItemList, on filtre aussi ici
  const _makeItemList = Window_ShopSell.prototype.makeItemList;
  Window_ShopSell.prototype.makeItemList = function() {
    _makeItemList.call(this);
    this._data = this._data.filter(it => !hasCannotSell(it));
  };
})();
