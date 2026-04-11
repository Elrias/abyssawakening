//-----------------------------------------------------------------------------
// Dungeonmind - DM Independent Items
// DM_IndependentItems.js
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.DM_IndependentItems = true;

var Dungeonmind = Dungeonmind || {};
Dungeonmind.II = Dungeonmind.II || {};
Dungeonmind.II.version = 1.03;

/*:
 * DM_IndependentItems.js
 * Version 1.03
 *
 * @plugindesc [Rpg Maker MZ] [Tier 4] [Version 1.03] - This plugin will allow items to
 * become independent.
 *
 * @url https://www.dmplugins.com
 * @target MZ
 * @author Dungeonmind
 *
 * @author Dungeonmind
 *
 *
 * @help
 *
 * ===========================================================================
 * Terms and Condtions
 * ===========================================================================
 *
 * You may use this plugin for free in a non-commercial game only. However, 
 * commercial licence is available. Read down below. Please credit me as
 * Dungeonmind or Justin Lamarche.
 *
 * Don't take any code for your own released plugins. You can edit the code 
 * for your own projects only.
 *
 * You must obtain a licence from www.dmplugins.com before using this plugin
 * in a commercial project. More information about that licence can be found
 * on the plugin page you downloaded it from.
 *
 * I am not responsible or liable if you choose to use this plugin in your
 * project. It is up to you to figure out if its a right fit (part of the 
 * reason why the full version is always available for you to download and 
 * try out first).
 *
 * ===========================================================================
 * Warning!
 * ===========================================================================
 *
 * PLEASE CAREFULLY READ YOUR LICENCE THAT IS AVAILABLE ON THE PLUGIN PAGE YOU
 * DOWNLOADED FROM DMPLUGINS.COM. IF YOU WANT TO USE ANY PLUGIN MADE BY ME IN
 * A COMMERCIAL PROJECT, YOU MIGHT HAVE TO BUY THE APPROPRIATE LICENCE FIRST. 
 * (ALSO, AVAILABLE ON THE PLUGIN PAGE.)
 *
 * I am not responsible if this plugin doesn't work for other versions of 
 * rpg maker MZ other than the latest version, 1.6.0. Please report any bugs
 * in the comments on dmplugins.com
 *
 * ===========================================================================
 * What it does
 * ===========================================================================
 * By using note tags you can make items, weapons or armours independent. This
 * means the player will always get a single exact copy of the item but with a
 * new ID.
 *
 * For multiple items, the player will gain a number of independent items 
 * equavilent to the amount given or purchased.
 *
 * ===========================================================================
 * Note tags for $dataItems, $dataWeapons and $dataArmors
 * ===========================================================================
 * 
 * ---------------------------------------------------------------------------
 * <independentItem>
 * ---------------------------------------------------------------------------
 * *Set the item, weapon or armor to be independent.
 *
 * Examples :
 * <independentItem>
 * ➔ Every time the player gains this item, it creates a brand new item with
 * the same properties but new ID. Using other plugins, you can really take 
 * advantage of this feature.
 *
 *
 * @param Independent Items Amount Text
 * @type boolean
 * @on SHOW
 * @off HIDE
 * @default true
 * @desc Should independent items hide the ':99' text?
 *
 */

//-----------------------------------------------------------------------------
// Parameters
//-----------------------------------------------------------------------------

 Dungeonmind.II.parameters = PluginManager.parameters('DM_IndependentItems');
 Dungeonmind.II.independentItemsAmountText = eval(Dungeonmind.II.parameters['Independent Items Amount Text'] || false);

//--------------------------------------------------------------------------------------
// DataManager
//--------------------------------------------------------------------------------------

Dungeonmind.II.ALIAS_DataManager_createGameObjects = DataManager.createGameObjects;

DataManager.createGameObjects = function() {
    Dungeonmind.II.ALIAS_DataManager_createGameObjects.call(this);
    $gameIndependents = new Game_Independents();
};


Dungeonmind.II.ALIAS_DataManager_makeSaveContents = DataManager.makeSaveContents;

DataManager.makeSaveContents = function() {
    const contents = Dungeonmind.II.ALIAS_DataManager_makeSaveContents.call(this);
    contents.independents = $gameIndependents;
    return contents;
};

Dungeonmind.II.ALIAS_DataManager_extractSaveContents = DataManager.extractSaveContents;

DataManager.extractSaveContents = function(contents) {
    Dungeonmind.II.ALIAS_DataManager_extractSaveContents.call(this, contents);
    $gameIndependents = contents.independents;
};

//-----------------------------------------------------------------------------
// Game_Independents
//
// The game object class for handling independent items.

function Game_Independents() {
    this.initialize(...arguments);
}

Game_Independents.prototype.initialize = function() {
    this._independentId = this.getLimitedInventoryIndependentIds();
    this._independentItems = $dataItems;
    this._independentWeapons = $dataWeapons;
    this._independentArmors = $dataArmors;
};

Game_Independents.prototype.getLimitedInventoryIndependentIds = function() {
    if(this.limitedInvPluginCheck()) {
        if(this.coreShopPluginCheck()) {
            num = $gameShop._independentId;
        } else {
            num = $gameContainers._independentId;
        }
        return num;
    } else {
        return 10000;
    }
};

Game_Independents.prototype.getItemDatabaseEntries = function() {
    let i = 0;
    while(i <= 9999) {
        this._independentItems[i] = $dataItems[i];
        i++;
    }
    return this._independentItems;
};

Game_Independents.prototype.getWeaponDatabaseEntries = function() {
    let i = 0;
    while(i <= 9999) {
        this._independentWeapons[i] = $dataWeapons[i];
        i++;
    }
    return this._independentWeapons;
};

Game_Independents.prototype.getArmorDatabaseEntries = function() {
    let i = 0;
    while(i <= 9999) {
        this._independentArmors[i] = $dataArmors[i];
        i++;
    }
    return this._independentArmors;
};

Game_Independents.prototype.limitedInvPluginCheck = function() {
    if($plugins.find(plugin => plugin.name == "DM_LimitedInventory")?.status) {
        return true;
    } else {
        return false;
    }
};

Game_Independents.prototype.coreShopPluginCheck = function() {
    if($plugins.find(plugin => plugin.name == "DM_CoreShop")?.status) {
        return true;
    } else {
        return false;
    }
};

Dungeonmind.II.refreshClonedDatabaseObject = function(obj) {
  if (!obj) return;
  try {
    // MZ: onLoad() appelle extractMetadata() et peut être hooké par d'autres plugins (VisuStella)
    if (DataManager && typeof DataManager.onLoad === "function") {
      DataManager.onLoad(obj);
      return;
    }
  } catch (e) {
    console.warn("DM_IndependentItems: DataManager.onLoad failed, fallback to extractMetadata", e);
  }
  try {
    if (DataManager && typeof DataManager.extractMetadata === "function") {
      DataManager.extractMetadata(obj);
    }
  } catch (e) {
    console.warn("DM_IndependentItems: extractMetadata failed", e);
  }
};

Game_Independents.prototype.gainIndependentItem = function(oldItem, value) {
    itemId = oldItem.id;
    //*items
    if(oldItem.etypeId === undefined) {
        obj = {};
        obj = JsonEx.makeDeepCopy($dataItems[itemId]);
        obj.id = $gameIndependents._independentId++;
        obj.originalId = $dataItems[itemId].id;
        $gameIndependents._independentItems[$gameIndependents._independentId-1] = obj;
        $dataItems[$gameIndependents._independentId-1] = obj;
        Dungeonmind.II.refreshClonedDatabaseObject(obj);
        $gameParty.gainItem($gameIndependents._independentItems[$gameIndependents._independentId-1], value);
    }
    //*weapons
    if(oldItem.etypeId === 1) {
        obj = {};
        obj = JsonEx.makeDeepCopy($dataWeapons[itemId]);
        obj.id = $gameIndependents._independentId++;
        obj.originalId = $dataWeapons[itemId].id;
        $gameIndependents._independentWeapons[$gameIndependents._independentId-1] = obj;
        $dataWeapons[$gameIndependents._independentId-1] = obj;
        Dungeonmind.II.refreshClonedDatabaseObject(obj);
        $gameParty.gainItem($gameIndependents._independentWeapons[$gameIndependents._independentId-1], value);
    }
    //*armors
    if(oldItem.etypeId > 1) {
        obj = {};
        obj = JsonEx.makeDeepCopy($dataArmors[itemId]);
        obj.id = $gameIndependents._independentId++;
        obj.originalId = $dataArmors[itemId].id;
        $gameIndependents._independentArmors[$gameIndependents._independentId-1] = obj;
        $dataArmors[$gameIndependents._independentId-1] = obj;
        Dungeonmind.II.refreshClonedDatabaseObject(obj);
        $gameParty.gainItem($gameIndependents._independentArmors[$gameIndependents._independentId-1], value);
    }
};

//-----------------------------------------------------------------------------
// Game_Actor
//
// The game object class for an actor.


Game_Actor.prototype.tradeItemWithParty = function(newItem, oldItem) {
    if (newItem && !$gameParty.hasItem(newItem)) {
        return false;
    } else {
        if(oldItem !== null && oldItem.meta.independentItem && oldItem.id < 10000) {
            $gameIndependents.gainIndependentItem(oldItem, 1);
        } else {
            $gameParty.gainItem(oldItem, 1);
        }
        $gameParty.loseItem(newItem, 1);
        return true;
    }
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//
// *Overwritten functions.

// Change Items
Game_Interpreter.prototype.command126 = function(params) {
    //$gameIndependents._independentId = (typeof $gameIndependents._independentId === 'undefined') ? 9999 : $gameIndependents._independentId;
    if($dataItems[params[0]] && $dataItems[params[0]] !== null && $dataItems[params[0]].meta.independentItem) {
        let value = this.operateValue(params[1], params[2], params[3]);
        while(value > 0) {
            obj = {};
            obj = JsonEx.makeDeepCopy($dataItems[params[0]]);
            obj.id = $gameIndependents._independentId++;
            obj.originalId = $dataItems[params[0]].id;
            $gameIndependents._independentItems[$gameIndependents._independentId-1] = obj;
            $dataItems[$gameIndependents._independentId-1] = obj;
            $gameParty.gainItem($gameIndependents._independentItems[$gameIndependents._independentId-1], 1, params[4]);
            value--;
        }
    }
    if($dataItems[params[0]] && $dataItems[params[0]] !== null && !$dataItems[params[0]].meta.independentItem) {
        const value = this.operateValue(params[1], params[2], params[3]);
        $gameParty.gainItem($dataItems[params[0]], value, params[4]);
    }
    return true;
};

// Change Weapons
Game_Interpreter.prototype.command127 = function(params) {
    //$gameIndependents._independentId = (typeof $gameIndependents._independentId === 'undefined') ? 9999 : $gameIndependents._independentId;
    if($dataWeapons[params[0]] && $dataWeapons[params[0]] !== null && $dataWeapons[params[0]].meta.independentItem) {
        let value = this.operateValue(params[1], params[2], params[3]);
        while (value > 0) {
            obj = {};
            obj = JsonEx.makeDeepCopy($dataWeapons[params[0]]);
            obj.id = $gameIndependents._independentId++;
            obj.originalId = $dataWeapons[params[0]].id;
            $gameIndependents._independentWeapons[$gameIndependents._independentId-1] = obj;
            $dataWeapons[$gameIndependents._independentId-1] = obj;
            $gameParty.gainItem($gameIndependents._independentWeapons[$gameIndependents._independentId-1], 1, params[4]);
            value--;
        }
    }
    if($dataWeapons[params[0]] && $dataWeapons[params[0]] !== null && !$dataWeapons[params[0]].meta.independentItem) {
        const value = this.operateValue(params[1], params[2], params[3]);
        $gameParty.gainItem($dataWeapons[params[0]], value, params[4]);
    }
    return true;
};

// Change Armors
Game_Interpreter.prototype.command128 = function(params) {
    //$gameIndependents._independentId = (typeof $gameIndependents._independentId === 'undefined') ? 9999 : $gameIndependents._independentId;
    if($dataArmors[params[0]] && $dataArmors[params[0]] !== null && $dataArmors[params[0]].meta.independentItem) {
        let value = this.operateValue(params[1], params[2], params[3]);
        while(value > 0) {
            obj = {};
            obj = JsonEx.makeDeepCopy($dataArmors[params[0]]);
            obj.id = $gameIndependents._independentId++;
            obj.originalId = $dataArmors[params[0]].id;
            $gameIndependents._independentArmors[$gameIndependents._independentId-1] = obj;
            $dataArmors[$gameIndependents._independentId-1] = obj;
            $gameParty.gainItem($gameIndependents._independentArmors[$gameIndependents._independentId-1], 1, params[4]);
            value--;
        }
    }
    if($dataArmors[params[0]] && $dataArmors[params[0]] !== null && !$dataArmors[params[0]].meta.independentItem) {
        const value = this.operateValue(params[1], params[2], params[3]);
        $gameParty.gainItem($dataArmors[params[0]], value, params[4]);
    }
    return true;
};

Dungeonmind.II.ALIAS_SceneMap_start = Scene_Map.prototype.start;

Scene_Map.prototype.start = function() {
    Dungeonmind.II.ALIAS_SceneMap_start.call(this);
    $dataItems = $gameIndependents.getItemDatabaseEntries();
    $dataWeapons = $gameIndependents.getWeaponDatabaseEntries();
    $dataArmors = $gameIndependents.getArmorDatabaseEntries();
};

//-----------------------------------------------------------------------------
// Scene_Shop
//
// *Aliased funtion.

Dungeonmind.II.ALIAS_SceneShop_doBuy = Scene_Shop.prototype.doBuy;

Scene_Shop.prototype.doBuy = function(number) {
    const item = this._item;

    // Si pas indépendant, comportement normal
    if (!item || !item.meta || !item.meta.independentItem) {
        return Dungeonmind.II.ALIAS_SceneShop_doBuy.call(this, number);
    }

    // 1) Laisse la boutique (y compris VisuStella currency items) gérer l'achat + le paiement
    // -> elle ajoute l'item DB dans l'inventaire, et consomme la monnaie (items ou gold)
    Dungeonmind.II.ALIAS_SceneShop_doBuy.call(this, number);

    // 2) Swap: remplace les copies DB gagnées par des copies indépendantes
    // Sécurité: si pas de $gameIndependents, on ne fait rien
    if (!window.$gameIndependents || typeof $gameIndependents.gainIndependentItem !== "function") return;

    // Empêche les doubles conversions récursives si d'autres hooks existent
    if ($gameParty._dmShopSwapLock) return;
    $gameParty._dmShopSwapLock = true;
    try {
        for (let i = 0; i < number; i++) {
            // Si la boutique n'a pas réellement donné l'objet (ex: manque de monnaie), on stop
            if ($gameParty.numItems(item) <= 0) break;

            // Retire une copie DB...
            $gameParty.loseItem(item, 1, false);

            // ...et donne une copie indépendante à la place (sans repayer)
            $gameIndependents.gainIndependentItem(item, 1);
        }
    } finally {
        $gameParty._dmShopSwapLock = false;
    }
};

//-----------------------------------------------------------------------------
// Window_ItemList
//
// The window for selecting an item on the item screen.

Window_ItemList.prototype.drawItemNumber = function(item, x, y, width) {
    if(this._item && this._item.etypeId === undefined) {
        item = $dataItems[this._item.id];
    }
    if(this._item && this._item.etypeId === 1) {
        item = $dataWeapons[this._item.id];
    }
    if(this._item && this._item.etypeId > 1) {
        item = $dataArmors[this._item.id];
    }
    if(item && item.meta.independentItem) {
        if (Dungeonmind.II.independentItemsAmountText && this.needsNumber()) {
            if(Dungeonmind.LI) {
                if($gameParty.numItems(item) <= 9) {
                    this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0"), "right");
                } else if($gameParty.numItems(item) <= 99) {
                    this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("00"), "right");
                } else if($gameParty.numItems(item)<= 999) {
                    this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("000"), "right");
                } else if($gameParty.numItems(item) <= 9999) {
                    this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0000"), "right");
                }
            } else {
                this.drawText(":", x, y, width - this.textWidth("00"), "right");
            }
            this.drawText($gameParty.numItems(item), x, y, width, "right");
        }
    }
    if(item && !item.meta.independentItem) {
        if (this.needsNumber()) {
            if(Dungeonmind.LI) {
                if($gameParty.numItems(item) <= 9) {
                    this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0"), "right");
                } else if($gameParty.numItems(item) <= 99) {
                    this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("00"), "right");
                } else if($gameParty.numItems(item)<= 999) {
                    this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("000"), "right");
                } else if($gameParty.numItems(item) <= 9999) {
                    this.drawText(Dungeonmind.LI.itemCountSymbolText, x, y, width - this.textWidth("0000"), "right");
                }
            } else {
                this.drawText(":", x, y, width - this.textWidth("00"), "right");
            }
            this.drawText($gameParty.numItems(item), x, y, width, "right");
        }
    }
};
