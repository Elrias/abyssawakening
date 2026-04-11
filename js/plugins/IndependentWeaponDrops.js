/*:
 * @target MZ
 * @plugindesc Convert dropped weapons to independent items (safe version)
 */

(() => {

const _Game_Party_gainItem = Game_Party.prototype.gainItem;

Game_Party.prototype.gainItem = function(item, amount, includeEquip) {

    if (
        item &&
        DataManager.isWeapon(item) &&
        item.meta &&
        item.meta.independentItem &&
        item.id < 10000 &&            
        BattleManager._rewards &&
        $gameIndependents
    ) {

        for (let i = 0; i < amount; i++) {
            $gameIndependents.gainIndependentItem(item, 1);
        }

        return;
    }

    _Game_Party_gainItem.call(this, item, amount, includeEquip);

};

})();