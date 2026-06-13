/*:
 * @target MZ
 * @plugindesc Fix runtime des Independent Items (normalisation type save/load)
 * @author Elrias
 */

(() => {
  "use strict";

  function normalizeIndependentItems() {
    const party = $gameParty;

    function processContainer(containerName) {
      const container = party[containerName];
      if (!container) return;

      const items = Object.values(container).filter(Boolean);

      for (const item of items) {
        if (!item || !item.meta || !item.meta.independentItem) continue;

        const count = party.numItems(item);

        console.log("Normalizing item:", item.name, "ID:", item.id);

        // Remove old instance
        party.loseItem(item, count, false);

        // Recreate from base
        const base = DataManager.isWeapon(item)
          ? $dataWeapons[item.originalId]
          : $dataArmors[item.originalId];

        if (base) {
          party.gainItem(base, count, false);
        }
      }
    }

    processContainer("_weapons");
    processContainer("_armors");

    console.log("Independent items normalized");
  }

  // Hook shop open
  const _Scene_Shop_create = Scene_Shop.prototype.create;
  Scene_Shop.prototype.create = function() {
    normalizeIndependentItems();
    _Scene_Shop_create.call(this);
  };

})();