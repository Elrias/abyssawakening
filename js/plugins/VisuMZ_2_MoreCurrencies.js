//=============================================================================
// VisuStella MZ - More Shop Currencies
// VisuMZ_2_MoreCurrencies.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_MoreCurrencies = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MoreCurrencies = VisuMZ.MoreCurrencies || {};
VisuMZ.MoreCurrencies.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.04] [MoreCurrencies]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/More_Currencies_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin expands the shop scene's functionality by allowing the game dev
 * to create items that can be sold for items and/or variables instead of gold.
 * Or you know what? Throw gold in there, too. Any combination of the them! By
 * doing so, gold no longer becomes the default currency for every shop, as
 * some special shops may require a different type of trade.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Items can be bought using items, weapons, armors, variables, gold, or any
 *   of the combinations listed.
 * * Sell items this way, too!
 * * Sold item listing window will now show the amount the player can get back
 *   per unit sold.
 * * Shop scene's calculation window is now updated to show the transaction
 *   details from how much the player owns to how much will be spent to what
 *   kind of result there will be.
 * * Proxy system support allows for shops to sell the same items but using
 *   different types of currencies.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_ItemsEquipsCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Window_ShopNumber
 * 
 * The visual contents of this window have been completely overhauled to show
 * the details of what transactions are happening. This includes how much or
 * many of a resource the player owns, how much will be involved in the actual
 * transaction, and the net outcome after the transaction has taken place.
 * 
 * Naturally, this means that things will have to shift around in order for the
 * space to make any sense.
 *
 * ---
 *
 * Proxy Items
 * 
 * Proxy Items are temporary substitutes for another. When they are acquired
 * through shopping, they will turn into the item, weapon, or armor they are a
 * proxy for. Only the icon, name, help description, and status details will
 * match up. Everything else will remain separate such as the notetag data and
 * the trading list. This allows you to effectively have multiple ways to
 * trade the same item using different item combinations.
 * 
 * For more details, look inside of the Notetags section for Proxy items.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Cost-Related Notetags ===
 * 
 * ---
 *
 * <Item id Buy Cost: x>
 * <Item name Buy Cost: x>
 * 
 * <Item id Sell Cost: x>
 * <Item name Sell Cost: x>
 * 
 * <Item id Cost: x>
 * <Item name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the item and quantity needed to purchase this
 *   object in the shop.
 * - The "sell" variant determines the item and quantity acquired when selling
 *   this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the item and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the item to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the item to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the item that will be taken (when bought)
 *   or acquired (when sold).
 * - Insert multiple copies of these notetags to add more item costs.
 *
 * ---
 *
 * <Weapon id Buy Cost: x>
 * <Weapon name Buy Cost: x>
 * 
 * <Weapon id Sell Cost: x>
 * <Weapon name Sell Cost: x>
 * 
 * <Weapon id Cost: x>
 * <Weapon name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the weapon and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the weapon and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the weapon and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the weapon to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the weapon to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the weapon that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more weapon costs.
 *
 * ---
 *
 * <Armor id Buy Cost: x>
 * <Armor name Buy Cost: x>
 * 
 * <Armor id Sell Cost: x>
 * <Armor name Sell Cost: x>
 * 
 * <Armor id Cost: x>
 * <Armor name Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the armor and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the armor and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the armor and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the armor to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the armor to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the armor that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more armor costs.
 *
 * ---
 *
 * <Variable id Buy Cost: x>
 * 
 * <Variable id Sell Cost: x>
 * 
 * <Variable id Cost: x>
 *
 * - Used for: Item, Weapon, Armor Notetags
 * - The "buy" variant determines the variable and quantity needed to purchase
 *   this object in the shop.
 * - The "sell" variant determines the variable and quantity acquired when
 *   selling this object in the shop.
 * - The neither variant will determine both buy/sell transactions related to
 *   the variable and quantities when selling.
 *   - Selling the object will yield a lower quantity determined by the sell
 *     rate found in Plugin Parameters > General > Automatic Sell Rate.
 *   - This variant cannot be used with the Buy/Sell notetag variants. If
 *     either the buy or sell notetag variants are detected, this doesn't work.
 * - Replace 'id' with a number representing the ID of the variable to be taken
 *   (when bought) or acquired (when sold).
 * - Replace 'name' with the name of the variable to be taken (when bought) or
 *   acquired (when sold).
 * - Replace 'x' with the quantity of the variable that will be taken (when
 *   bought) or acquired (when sold).
 * - Insert multiple copies of these notetags to add more variable costs.
 *
 * ---
 * 
 * === Proxy Notetags ===
 * 
 * ---
 * 
 * <Proxy: id>
 * <Proxy: name>
 * 
 * - Used for: Item, Weapon, Armor Notetags
 * - REQUIRES the most up to date VisuMZ Items and Equips Core!
 * - Turns this item, weapon, or armor into a proxy for another item, allowing
 *   you to create trades with different components using the above notetag
 *   contents and yield the same item.
 * - The proxy item itself will take on the name, icon, and description of the
 *   original item it is supposed to represent.
 * - No other properties are carried over from the original.
 * - When viewed through the Window_ShopStatus window, the contents will
 *   reference the original item and not the proxy item.
 * - Proxy items themselves cannot be acquired. This includes event commands,
 *   item drops, or equips.
 * - When bought, the item yielded won't be the proxy item but the item it is
 *   a proxy for.
 * - Replace 'id' with a number representing the item, weapon, or armor ID of
 *   the same item type. If the proxy is an item, this will reference an item.
 *   If the proxy is a weapon, this will reference a weapon. Same for armors.
 * - Replace 'name' with text representing the item, weapon, or armor's name.
 *   The referenced item needs to be the same item type as the proxy. Item for
 *   item, weapon for weapon, armor for armor.
 * - Insert multiple copies of these notetags to add more variables costs.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Default settings for More Currencies.
 *
 * ---
 *
 * General
 * 
 *   Automatic Sell Rate:
 *   - When using the plain "Cost" notetags, use this sell rate.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Owned:
 *   - Text used for how much of an item is owned.
 * 
 *   Shift:
 *   - Text used for the change in value.
 * 
 *   Net:
 *   - Text used for the net result.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Listing Settings
 * ============================================================================
 *
 * Settings for the currency listings.
 *
 * ---
 *
 * Listing
 * 
 *   Listing Order:
 *   - Determines the order the trade components are listed.
 * 
 *   Show Sell Window:
 *   - Show listed items in the sell window?
 * 
 *   List Font Size:
 *   - Font size used for listed items.
 * 
 *   List Padding:
 *   - Pixel padding between listed items.
 *
 * ---
 *
 * Text Format
 * 
 *   Item Format:
 *   Weapon Format:
 *   Armor Format:
 *   Variable Format:
 *   - Text format used for listed items.
 *   - %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.05: February 20, 2025
 * * Compatibility Update!
 * ** Updated for RPG Maker MZ Core Scripts 1.9.0!
 * *** Better compatibility with different icon sizes.
 * 
 * Version 1.04: December 14, 2023
 * * Bug Fixes!
 * ** Fixed a bug where sold item costs didn't get returned. Fixed by Arisu.
 * 
 * Version 1.03: November 16, 2023
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a crash when exiting certain menus from external sources into the
 *    shop scene. Fix made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.01: February 17, 2022
 * * Bug Fixes!
 * ** Item, Weapon, Armor Cost Notetags should no work properly. Fix by Irina.
 * * Documentation Update!
 * ** Added documentation for the following notetags:
 * *** <Variable id Buy Cost: x>
 * *** <Variable id Sell Cost: x>
 * *** <Variable id Cost: x>
 * 
 * Version 1.00 Official Release Date: March 7, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param MoreCurrencies
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text General Settings
 * @type struct<General>
 * @desc Default settings for More Currencies.
 * @default {"General":"","AutoSellRate:num":"0.50","Vocab":"","NumWindowOwned:str":"Owned","NumWindowShift:str":"Change","NumWindowNet:str":"Net"}
 *
 * @param Listing:struct
 * @text Listing Settings
 * @type struct<Listing>
 * @desc Settings for the currency listings.
 * @default {"Listing":"","ListOrder:arraystr":"[\"item\",\"weapon\",\"armor\",\"variable\",\"gold\"]","ShowSell:eval":"true","BuyFontSize:num":"22","BuyPadding:num":"16","Format":"","ItemBuyFmt:str":"%1%3","WeaponBuyFmt:str":"%1%3","ArmorsBuyFmt:str":"%1%3","VariableBuyFmt:str":"%1%4"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 *
 * @param AutoSellRate:num
 * @text Automatic Sell Rate
 * @parent General
 * @desc When using the plain "Cost" notetags, use this sell rate.
 * @default 0.50
 * 
 * @param Vocab
 * @text Vocabulary
 *
 * @param NumWindowOwned:str
 * @text Owned
 * @parent Vocab
 * @desc Text used for how much of an item is owned.
 * @default Owned
 *
 * @param NumWindowShift:str
 * @text Shift
 * @parent Vocab
 * @desc Text used for the change in value.
 * @default Change
 *
 * @param NumWindowNet:str
 * @text Net
 * @parent Vocab
 * @desc Text used for the net result.
 * @default Net
 *
 */
/* ----------------------------------------------------------------------------
 * Listing Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Listing:
 *
 * @param Listing
 *
 * @param ListOrder:arraystr
 * @text Listing Order
 * @parent Listing
 * @type select[]
 * @option item
 * @option weapon
 * @option armor
 * @option variable
 * @option gold
 * @desc Determines the order the trade components are listed.
 * @default ["item","weapon","armor","variable","gold"]
 *
 * @param ShowSell:eval
 * @text Show Sell Window
 * @parent Listing
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show listed items in the sell window?
 * @default true
 *
 * @param BuyFontSize:num
 * @text List Font Size
 * @parent Listing
 * @type number
 * @min 1
 * @desc Font size used for listed items.
 * @default 22
 *
 * @param BuyPadding:num
 * @text List Padding
 * @parent Listing
 * @type number
 * @min 1
 * @desc Pixel padding between listed items.
 * @default 16
 * 
 * @param Format
 * @text Text Format
 *
 * @param ItemBuyFmt:str
 * @text Item Format
 * @parent Format
 * @desc Text format used for listed items.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param WeaponBuyFmt:str
 * @text Weapon Format
 * @parent Format
 * @desc Text format used for listed weapons.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param ArmorsBuyFmt:str
 * @text Armors Format
 * @parent Format
 * @desc Text format used for listed armors.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%3
 *
 * @param VariableBuyFmt:str
 * @text Variable Format
 * @parent Format
 * @desc Text format used for listed variables.
 * %1 - Cost, %2 - Owned, %3 - Icon, %4 - Name
 * @default %1%4
 *
 */
//=============================================================================

const _0xdafcae=_0x148e;(function(_0x3a810c,_0x2e36f5){const _0x425f0f=_0x148e,_0x4a5fcd=_0x3a810c();while(!![]){try{const _0x4e3880=-parseInt(_0x425f0f(0x157))/0x1*(parseInt(_0x425f0f(0x1a4))/0x2)+-parseInt(_0x425f0f(0x12d))/0x3+parseInt(_0x425f0f(0xf7))/0x4*(parseInt(_0x425f0f(0xf5))/0x5)+parseInt(_0x425f0f(0x178))/0x6*(parseInt(_0x425f0f(0x15e))/0x7)+-parseInt(_0x425f0f(0x17e))/0x8+parseInt(_0x425f0f(0x117))/0x9+parseInt(_0x425f0f(0xf9))/0xa*(parseInt(_0x425f0f(0x16b))/0xb);if(_0x4e3880===_0x2e36f5)break;else _0x4a5fcd['push'](_0x4a5fcd['shift']());}catch(_0x2e39c5){_0x4a5fcd['push'](_0x4a5fcd['shift']());}}}(_0x5cc0,0x412aa));var label=_0xdafcae(0x1a9),tier=tier||0x0,dependencies=[_0xdafcae(0xfb),_0xdafcae(0x1a5)],pluginData=$plugins[_0xdafcae(0x1ad)](function(_0x410558){const _0x217f8d=_0xdafcae;return _0x410558[_0x217f8d(0x1a0)]&&_0x410558[_0x217f8d(0xf3)][_0x217f8d(0x142)]('['+label+']');})[0x0];function _0x5cc0(){const _0x57ee90=['iconIndex','drawTextEx','process_VisuMZ_MoreCurrencies','constructor','ARMOR','ItemBuyFmt','Scene_Shop_maxBuy','ARRAYEVAL','ceil','innerWidth','buyWeaponCosts','%1%2Costs','_scene','NUM','Change','iconWidth','WeaponBuyFmt','Scene_Shop_doSell','ParseAllNotetags','drawIcon','map','isArmor','sellPriceOfItem','VisuMZ_1_ItemsEquipsCore\x20needs\x20to\x20be\x20updated\x20','ShowSell','status','match','ChangeQuantityForObj','ParseWeaponNotetags','264818WFNjmW','VisuMZ_1_ItemsEquipsCore','parse','isEnabled','BuyPadding','MoreCurrencies','_number','totalPriceY','right','filter','Window_ShopBuy_isEnabled','MoreCurrenciesFmt','toLowerCase','SubBuyCost','iconHeight','weapon','drawText','_numberWindow','ListOrder','return\x200','NumWindowNet','value','length','Listing','note','getArmorIdWithName','name','itemPadding','sellWeaponCosts','showMoreCurrenciesSellValue','in\x20order\x20for\x20VisuMZ_3_OneTimePurchase\x20to\x20work.','round','ArmorsBuyFmt','GetShopNumberIngredientGold','MoreCurrenciesFontSize','price','prepareMoreCurrenciesObj','Settings','trim','call','CoreEngine','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','version','armors','MORE_CURRENCIES_SHOW_SELL_VALUE','maxDigits','ParseNotetagCosts','maxGold','CreateSubCostText','textWidth','drawCurrencyValue','Gold','drawSellPrice','Scene_Boot_onDatabaseLoaded','description','sellArmorCosts','3575uxjGON','currentSymbol','1096tqONgT','JSON','51490lIEROT','remove','VisuMZ_0_CoreEngine','itemRect','left','toUpperCase','currencyUnit','changeTextColor','CreateSubItemCostTexts','_commandWindow','\x5cI[%1]','_buyWindow','VARIABLE','floor','concat','MORE_CURRENCIES_ORDER','sellVariableCosts','GetShopNumberIngredientType','MORE_CURRENCIES_DEFAULT_SELL_RATE','buyArmorCosts','format','_weaponIDs','resetFontSettings','maxItems','ParseNotetagSubCosts','process_VisuMZ_MoreCurrencies_Notetags','variables','drawItemCost','CheckMeetBuyRequirements','buyVariableCosts','901773naWsbz','getItemIdWithName','\x20%1','getWeaponIdWithName','VISUAL_GOLD_DISPLAY_NO_COST_ENABLE','_moreCurrencyCosts','contents','drawTotalPrice','slice','ItemQuantityFmt','gold','drawMoreCurrenciesVariable','min','isWeapon','_armorIDs','ParseArmorNotetags','itemNameY','prototype','drawItemNumber','weapons','SubCost','useDigitGrouping','482241KWRPOI','GetShopNumberIngredientVariables','VariableBuyFmt','GetMaxBuysForObj','Scene_Shop_doBuy','ARRAYNUM','item','AutoSellRate','\x5cFS[%1]','ConvertParams','drawMoreCurrenciesItem','drawMoreCurrenciesPriceData','replace','sell','reverse','push','exit','onDatabaseLoaded','buy','General','_itemIDs','includes','ItemsEquipsCore','textSizeEx','drawItemName','ParseItemNotetags','parameters','armor','buyItemCosts','CreateSubVariableCostTexts','WEAPON','drawItemMoreCurrencies','drawMultiplicationSign','visualGoldDisplayPadding','visualGoldDisplayAutosize','ItemScene','variable','owned','gainItem','SubSellCost','sellItemCosts','doSell','3pxmJuk','isSceneShop','VisuMZ_3_VisualGoldDisplay','MoreCurrenciesNumberWindow','\x20=\x20','GetShopNumberIngredientItems','maxBuy','112182ODpNYJ','mainFontSize','drawCategories','STR','GoldIcon','STRUCT','visualGoldDisplayNoCost','MakeShopNumberIngredients','VISUAL_GOLD_DISPLAY_PAD_ZERO_DEFAULT','doBuy','ARRAYSTR','systemColor','ParseNotetagLineSubCosts','1243tqWrFg','drawMoreCurrenciesMathMarks','VisualGoldDisplay','innerHeight','Window_ItemList_drawItemNumber','RegExp','_bypassProxy','max','buttonY','_item','width','CreateVisualGoldText','MORE_CURRENCIES_PADDING','30eZotVl','getMoreCurrenciesObjLibrary','EVAL','Owned','\x20+\x20','standardIconWidth','1065424OMVCxw','drawMoreCurrenciesGold','cursorWidth','charAt','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','numItems','_price','lineHeight','ARRAYJSON'];_0x5cc0=function(){return _0x57ee90;};return _0x5cc0();}VisuMZ[label][_0xdafcae(0xe2)]=VisuMZ[label][_0xdafcae(0xe2)]||{},VisuMZ['ConvertParams']=function(_0x54c066,_0x1b300a){const _0x2be2e6=_0xdafcae;for(const _0x1cd9a3 in _0x1b300a){if(_0x1cd9a3[_0x2be2e6(0x1a1)](/(.*):(.*)/i)){const _0x4d1d1c=String(RegExp['$1']),_0x1ac7ff=String(RegExp['$2'])[_0x2be2e6(0xfe)]()['trim']();let _0x1e35ae,_0x220c69,_0x5ea5f4;switch(_0x1ac7ff){case _0x2be2e6(0x194):_0x1e35ae=_0x1b300a[_0x1cd9a3]!==''?Number(_0x1b300a[_0x1cd9a3]):0x0;break;case _0x2be2e6(0x132):_0x220c69=_0x1b300a[_0x1cd9a3]!==''?JSON[_0x2be2e6(0x1a6)](_0x1b300a[_0x1cd9a3]):[],_0x1e35ae=_0x220c69[_0x2be2e6(0x19b)](_0x42017f=>Number(_0x42017f));break;case _0x2be2e6(0x17a):_0x1e35ae=_0x1b300a[_0x1cd9a3]!==''?eval(_0x1b300a[_0x1cd9a3]):null;break;case _0x2be2e6(0x18e):_0x220c69=_0x1b300a[_0x1cd9a3]!==''?JSON['parse'](_0x1b300a[_0x1cd9a3]):[],_0x1e35ae=_0x220c69[_0x2be2e6(0x19b)](_0x25bdf5=>eval(_0x25bdf5));break;case _0x2be2e6(0xf8):_0x1e35ae=_0x1b300a[_0x1cd9a3]!==''?JSON[_0x2be2e6(0x1a6)](_0x1b300a[_0x1cd9a3]):'';break;case _0x2be2e6(0x186):_0x220c69=_0x1b300a[_0x1cd9a3]!==''?JSON[_0x2be2e6(0x1a6)](_0x1b300a[_0x1cd9a3]):[],_0x1e35ae=_0x220c69['map'](_0x39523d=>JSON[_0x2be2e6(0x1a6)](_0x39523d));break;case'FUNC':_0x1e35ae=_0x1b300a[_0x1cd9a3]!==''?new Function(JSON[_0x2be2e6(0x1a6)](_0x1b300a[_0x1cd9a3])):new Function(_0x2be2e6(0xd0));break;case'ARRAYFUNC':_0x220c69=_0x1b300a[_0x1cd9a3]!==''?JSON[_0x2be2e6(0x1a6)](_0x1b300a[_0x1cd9a3]):[],_0x1e35ae=_0x220c69[_0x2be2e6(0x19b)](_0x401e7e=>new Function(JSON[_0x2be2e6(0x1a6)](_0x401e7e)));break;case _0x2be2e6(0x161):_0x1e35ae=_0x1b300a[_0x1cd9a3]!==''?String(_0x1b300a[_0x1cd9a3]):'';break;case _0x2be2e6(0x168):_0x220c69=_0x1b300a[_0x1cd9a3]!==''?JSON[_0x2be2e6(0x1a6)](_0x1b300a[_0x1cd9a3]):[],_0x1e35ae=_0x220c69[_0x2be2e6(0x19b)](_0x5dc2d8=>String(_0x5dc2d8));break;case _0x2be2e6(0x163):_0x5ea5f4=_0x1b300a[_0x1cd9a3]!==''?JSON['parse'](_0x1b300a[_0x1cd9a3]):{},_0x1e35ae=VisuMZ['ConvertParams']({},_0x5ea5f4);break;case'ARRAYSTRUCT':_0x220c69=_0x1b300a[_0x1cd9a3]!==''?JSON[_0x2be2e6(0x1a6)](_0x1b300a[_0x1cd9a3]):[],_0x1e35ae=_0x220c69[_0x2be2e6(0x19b)](_0x3a1d9a=>VisuMZ[_0x2be2e6(0x136)]({},JSON[_0x2be2e6(0x1a6)](_0x3a1d9a)));break;default:continue;}_0x54c066[_0x4d1d1c]=_0x1e35ae;}}return _0x54c066;},(_0x31b5eb=>{const _0x5c3ec3=_0xdafcae,_0x41d6c8=_0x31b5eb['name'];for(const _0x1e296b of dependencies){if(!Imported[_0x1e296b]){alert(_0x5c3ec3(0x182)[_0x5c3ec3(0x10d)](_0x41d6c8,_0x1e296b)),SceneManager[_0x5c3ec3(0x13d)]();break;}}const _0x2fdbdc=_0x31b5eb[_0x5c3ec3(0xf3)];if(_0x2fdbdc[_0x5c3ec3(0x1a1)](/\[Version[ ](.*?)\]/i)){const _0x4b6a4d=Number(RegExp['$1']);_0x4b6a4d!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x41d6c8,_0x4b6a4d)),SceneManager[_0x5c3ec3(0x13d)]());}if(_0x2fdbdc[_0x5c3ec3(0x1a1)](/\[Tier[ ](\d+)\]/i)){const _0x42265d=Number(RegExp['$1']);_0x42265d<tier?(alert(_0x5c3ec3(0xe6)[_0x5c3ec3(0x10d)](_0x41d6c8,_0x42265d,tier)),SceneManager['exit']()):tier=Math[_0x5c3ec3(0x172)](_0x42265d,tier);}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x31b5eb[_0x5c3ec3(0x147)]);})(pluginData);function _0x148e(_0x3d6013,_0x246f23){const _0x5cc0a5=_0x5cc0();return _0x148e=function(_0x148e59,_0x25c409){_0x148e59=_0x148e59-0xca;let _0x31005f=_0x5cc0a5[_0x148e59];return _0x31005f;},_0x148e(_0x3d6013,_0x246f23);}if(VisuMZ['ItemsEquipsCore'][_0xdafcae(0xe7)]<1.37){let text='';text+=_0xdafcae(0x19e),text+=_0xdafcae(0xdb),alert(text),SceneManager[_0xdafcae(0x13d)]();}VisuMZ[_0xdafcae(0x1a9)]['RegExp']={'SubCost':/<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ]COST:[ ](\d+)>/gi,'SubBuyCost':/<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ](?:BUY|LEARN|RECRUIT) COST:[ ](\d+)>/gi,'SubSellCost':/<(ITEM|WEAPON|ARMOR|VARIABLE)[ ](.*?)[ ]SELL COST:[ ](\d+)>/gi},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0xf2)]=Scene_Boot[_0xdafcae(0x128)][_0xdafcae(0x13e)],Scene_Boot['prototype'][_0xdafcae(0x13e)]=function(){const _0x264045=_0xdafcae;DataManager[_0x264045(0xe1)](),VisuMZ[_0x264045(0x1a9)]['Scene_Boot_onDatabaseLoaded'][_0x264045(0xe4)](this),this['process_VisuMZ_MoreCurrencies']();},Scene_Boot[_0xdafcae(0x128)][_0xdafcae(0x189)]=function(){const _0x3676a2=_0xdafcae;this[_0x3676a2(0x112)]();},Scene_Boot[_0xdafcae(0x128)][_0xdafcae(0x112)]=function(){const _0x1afc27=_0xdafcae;if(VisuMZ[_0x1afc27(0x199)])return;const _0x39e0cb=[$dataItems,$dataWeapons,$dataArmors];for(const _0x11c544 of _0x39e0cb){for(const _0x14a3a5 of _0x11c544){if(!_0x14a3a5)continue;VisuMZ['MoreCurrencies']['ParseNotetagCosts'](_0x14a3a5);}}},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x146)]=VisuMZ[_0xdafcae(0x146)],VisuMZ['ParseItemNotetags']=function(_0x387d69){const _0x15f6e1=_0xdafcae;VisuMZ[_0x15f6e1(0x1a9)][_0x15f6e1(0x146)][_0x15f6e1(0xe4)](this,_0x387d69),VisuMZ['MoreCurrencies'][_0x15f6e1(0xeb)](_0x387d69);},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x1a3)]=VisuMZ[_0xdafcae(0x1a3)],VisuMZ['ParseWeaponNotetags']=function(_0x4f1763){const _0x44bca3=_0xdafcae;VisuMZ[_0x44bca3(0x1a9)][_0x44bca3(0x1a3)]['call'](this,_0x4f1763),VisuMZ['MoreCurrencies']['ParseNotetagCosts'](_0x4f1763);},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x126)]=VisuMZ['ParseArmorNotetags'],VisuMZ['ParseArmorNotetags']=function(_0x2795c8){const _0x4b5b5f=_0xdafcae;VisuMZ[_0x4b5b5f(0x1a9)][_0x4b5b5f(0x126)][_0x4b5b5f(0xe4)](this,_0x2795c8),VisuMZ[_0x4b5b5f(0x1a9)]['ParseNotetagCosts'](_0x2795c8);},VisuMZ[_0xdafcae(0x1a9)]['ParseNotetagCosts']=function(_0x54a5a1){const _0x1fa368=_0xdafcae;if(!_0x54a5a1)return;const _0x5e77e1=VisuMZ['MoreCurrencies']['RegExp'],_0x1856a3=_0x54a5a1[_0x1fa368(0xd5)];if(!_0x1856a3[_0x1fa368(0x1a1)](_0x5e77e1[_0x1fa368(0x12b)])&&!_0x1856a3[_0x1fa368(0x1a1)](_0x5e77e1['SubBuyCost'])&&!_0x1856a3[_0x1fa368(0x1a1)](_0x5e77e1['SubSellCost']))return;const _0x48e7aa=DataManager['getMoreCurrenciesObjLibrary'](_0x54a5a1);_0x48e7aa[_0x54a5a1['id']]=_0x48e7aa[_0x54a5a1['id']]||{},_0x1856a3[_0x1fa368(0x1a1)](_0x5e77e1[_0x1fa368(0xca)])||_0x1856a3[_0x1fa368(0x1a1)](_0x5e77e1[_0x1fa368(0x154)])?(this[_0x1fa368(0x111)](_0x54a5a1,_0x48e7aa[_0x54a5a1['id']],_0x1fa368(0xca)),this[_0x1fa368(0x111)](_0x54a5a1,_0x48e7aa[_0x54a5a1['id']],_0x1fa368(0x154))):this[_0x1fa368(0x111)](_0x54a5a1,_0x48e7aa[_0x54a5a1['id']],_0x1fa368(0x12b));},VisuMZ['MoreCurrencies'][_0xdafcae(0x111)]=function(_0x4d3076,_0x2ea32d,_0x4c04ce){const _0x4f78e3=_0xdafcae,_0x1d3198=VisuMZ['MoreCurrencies'][_0x4f78e3(0x170)],_0x13f984=_0x4d3076[_0x4f78e3(0xd5)],_0x5e6268=_0x13f984[_0x4f78e3(0x1a1)](_0x1d3198[_0x4c04ce]);if(_0x5e6268)for(const _0x1279c5 of _0x5e6268){this[_0x4f78e3(0x16a)](_0x1279c5,_0x2ea32d,_0x4c04ce);}},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x16a)]=function(_0x10bed5,_0x3dea68,_0x7aeb2f){const _0x581e54=_0xdafcae,_0x17c7ca=VisuMZ['MoreCurrencies'][_0x581e54(0x170)];_0x10bed5[_0x581e54(0x1a1)](_0x17c7ca[_0x7aeb2f]);const _0x29d5dc=[_0x581e54(0x12b),'SubBuyCost'][_0x581e54(0x142)](_0x7aeb2f),_0x5a0dd2=['SubCost',_0x581e54(0x154)][_0x581e54(0x142)](_0x7aeb2f),_0x1cc58e=_0x7aeb2f===_0x581e54(0x12b),_0x327476=DataManager['MORE_CURRENCIES_DEFAULT_SELL_RATE'],_0x599769=String(RegExp['$1'])['toUpperCase']()['trim'](),_0x44cbd2=String(RegExp['$2'])['trim'](),_0x5a4d1c=Number(RegExp['$3'])||0x0,_0x505174=/^\d+$/['test'](_0x44cbd2);if(_0x599769==='ITEM'){const _0x1c6b83=_0x505174?Number(_0x44cbd2):DataManager[_0x581e54(0x118)](_0x44cbd2);if(!_0x1c6b83)return;_0x29d5dc&&(_0x3dea68[_0x581e54(0x149)]=_0x3dea68[_0x581e54(0x149)]||{},_0x3dea68[_0x581e54(0x149)][_0x1c6b83]=_0x5a4d1c),_0x5a0dd2&&(_0x3dea68['sellItemCosts']=_0x3dea68[_0x581e54(0x155)]||{},_0x3dea68[_0x581e54(0x155)][_0x1c6b83]=Math['floor'](_0x5a4d1c*(_0x1cc58e?_0x327476:0x1)));}else{if(_0x599769===_0x581e54(0x14b)){const _0x31dcdf=_0x505174?Number(_0x44cbd2):DataManager[_0x581e54(0x11a)](_0x44cbd2);if(!_0x31dcdf)return;_0x29d5dc&&(_0x3dea68[_0x581e54(0x191)]=_0x3dea68[_0x581e54(0x191)]||{},_0x3dea68[_0x581e54(0x191)][_0x31dcdf]=_0x5a4d1c),_0x5a0dd2&&(_0x3dea68[_0x581e54(0xd9)]=_0x3dea68[_0x581e54(0xd9)]||{},_0x3dea68[_0x581e54(0xd9)][_0x31dcdf]=Math[_0x581e54(0x106)](_0x5a4d1c*(_0x1cc58e?_0x327476:0x1)));}else{if(_0x599769===_0x581e54(0x18b)){const _0x3d413e=_0x505174?Number(_0x44cbd2):DataManager[_0x581e54(0xd6)](_0x44cbd2);if(!_0x3d413e)return;_0x29d5dc&&(_0x3dea68[_0x581e54(0x10c)]=_0x3dea68['buyArmorCosts']||{},_0x3dea68['buyArmorCosts'][_0x3d413e]=_0x5a4d1c),_0x5a0dd2&&(_0x3dea68[_0x581e54(0xf4)]=_0x3dea68[_0x581e54(0xf4)]||{},_0x3dea68[_0x581e54(0xf4)][_0x3d413e]=Math[_0x581e54(0x106)](_0x5a4d1c*(_0x1cc58e?_0x327476:0x1)));}else{if(_0x599769===_0x581e54(0x105)){const _0x2072d6=Number(_0x44cbd2);if(!_0x2072d6)return;_0x29d5dc&&(_0x3dea68[_0x581e54(0x116)]=_0x3dea68['buyVariableCosts']||{},_0x3dea68[_0x581e54(0x116)][_0x2072d6]=_0x5a4d1c),_0x5a0dd2&&(_0x3dea68[_0x581e54(0x109)]=_0x3dea68[_0x581e54(0x109)]||{},_0x3dea68[_0x581e54(0x109)][_0x2072d6]=Math[_0x581e54(0x106)](_0x5a4d1c*(_0x1cc58e?_0x327476:0x1)));}}}}},DataManager[_0xdafcae(0x10b)]=VisuMZ[_0xdafcae(0x1a9)]['Settings']['General'][_0xdafcae(0x134)],DataManager[_0xdafcae(0x118)]=function(_0x31f7f9){const _0x41f312=_0xdafcae;_0x31f7f9=_0x31f7f9['toUpperCase']()[_0x41f312(0xe3)](),this[_0x41f312(0x141)]=this[_0x41f312(0x141)]||{};if(this[_0x41f312(0x141)][_0x31f7f9])return this['_itemIDs'][_0x31f7f9];for(const _0x10f3d6 of $dataItems){if(!_0x10f3d6)continue;this[_0x41f312(0x141)][_0x10f3d6[_0x41f312(0xd7)][_0x41f312(0xfe)]()[_0x41f312(0xe3)]()]=_0x10f3d6['id'];}return this['_itemIDs'][_0x31f7f9]||0x0;},DataManager[_0xdafcae(0x11a)]=function(_0x15a79d){const _0x4ae73d=_0xdafcae;_0x15a79d=_0x15a79d[_0x4ae73d(0xfe)]()['trim'](),this[_0x4ae73d(0x10e)]=this['_weaponIDs']||{};if(this[_0x4ae73d(0x10e)][_0x15a79d])return this[_0x4ae73d(0x10e)][_0x15a79d];for(const _0x3354ce of $dataWeapons){if(!_0x3354ce)continue;this[_0x4ae73d(0x10e)][_0x3354ce['name'][_0x4ae73d(0xfe)]()[_0x4ae73d(0xe3)]()]=_0x3354ce['id'];}return this[_0x4ae73d(0x10e)][_0x15a79d]||0x0;},DataManager[_0xdafcae(0xd6)]=function(_0x4c69dd){const _0x3d141a=_0xdafcae;_0x4c69dd=_0x4c69dd[_0x3d141a(0xfe)]()[_0x3d141a(0xe3)](),this['_armorIDs']=this[_0x3d141a(0x125)]||{};if(this[_0x3d141a(0x125)][_0x4c69dd])return this[_0x3d141a(0x125)][_0x4c69dd];for(const _0x5e15e3 of $dataArmors){if(!_0x5e15e3)continue;this[_0x3d141a(0x125)][_0x5e15e3[_0x3d141a(0xd7)][_0x3d141a(0xfe)]()[_0x3d141a(0xe3)]()]=_0x5e15e3['id'];}return this[_0x3d141a(0x125)][_0x4c69dd]||0x0;},DataManager['prepareMoreCurrenciesObj']=function(){const _0x9eb7c3=_0xdafcae;this['_moreCurrencyCosts']=this[_0x9eb7c3(0x11c)]||{'items':{},'weapons':{},'armors':{}};},DataManager[_0xdafcae(0x179)]=function(_0xe5c6a){const _0x4d9096=_0xdafcae;if(DataManager['isItem'](_0xe5c6a))return this[_0x4d9096(0x11c)]['items'];else{if(DataManager[_0x4d9096(0x124)](_0xe5c6a))return this[_0x4d9096(0x11c)][_0x4d9096(0x12a)];else return DataManager[_0x4d9096(0x19c)](_0xe5c6a)?this[_0x4d9096(0x11c)][_0x4d9096(0xe8)]:{};}},TextManager[_0xdafcae(0xdf)]=VisuMZ['MoreCurrencies'][_0xdafcae(0xe2)]['Listing']['BuyFontSize'],TextManager[_0xdafcae(0x1af)]={'item':VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0xe2)][_0xdafcae(0xd4)][_0xdafcae(0x18c)],'weapon':VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0xe2)][_0xdafcae(0xd4)][_0xdafcae(0x197)],'armor':VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0xe2)][_0xdafcae(0xd4)][_0xdafcae(0xdd)],'variable':VisuMZ['MoreCurrencies'][_0xdafcae(0xe2)][_0xdafcae(0xd4)][_0xdafcae(0x12f)]},TextManager[_0xdafcae(0x15a)]={'owned':VisuMZ[_0xdafcae(0x1a9)]['Settings'][_0xdafcae(0x140)]['NumWindowOwned']||_0xdafcae(0x17b),'shift':VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0xe2)]['General']['NumWindowShift']||_0xdafcae(0x195),'net':VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0xe2)][_0xdafcae(0x140)][_0xdafcae(0xd1)]||'Net'},SceneManager[_0xdafcae(0x158)]=function(){const _0x20ada1=_0xdafcae;return this[_0x20ada1(0x193)]&&this[_0x20ada1(0x193)][_0x20ada1(0x18a)]===Scene_Shop;},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x18d)]=Scene_Shop[_0xdafcae(0x128)][_0xdafcae(0x15d)],Scene_Shop[_0xdafcae(0x128)]['maxBuy']=function(){const _0x20c438=_0xdafcae;let _0x349790=[VisuMZ['MoreCurrencies'][_0x20c438(0x18d)]['call'](this)];return $gameTemp[_0x20c438(0x171)]=!![],item=this[_0x20c438(0x104)][_0x20c438(0x133)](),_0x349790=_0x349790[_0x20c438(0x107)](VisuMZ[_0x20c438(0x1a9)][_0x20c438(0x130)](item)),$gameTemp[_0x20c438(0x171)]=![],Math['min'](..._0x349790);},VisuMZ['MoreCurrencies'][_0xdafcae(0x130)]=function(_0x1ec5e6){const _0x162b8a=_0xdafcae;if(!_0x1ec5e6)return[];const _0x80c70c=DataManager[_0x162b8a(0x179)](_0x1ec5e6),_0xd8cf79=_0x80c70c[_0x1ec5e6['id']];if(!_0xd8cf79)return[];const _0x41fd76=[];for(const _0x1d6c12 in _0xd8cf79[_0x162b8a(0x149)]){const _0x3cc37a=Number(_0x1d6c12)||0x0;if(!_0x3cc37a)continue;const _0x4fc69d=$dataItems[_0x3cc37a];if(!_0x4fc69d)continue;const _0x476315=_0xd8cf79[_0x162b8a(0x149)][_0x1d6c12]||0x1,_0x593c4a=$gameParty[_0x162b8a(0x183)](_0x4fc69d),_0x216c0c=Math[_0x162b8a(0x106)](_0x593c4a/_0x476315);_0x41fd76['push'](_0x216c0c);}for(const _0x12c83d in _0xd8cf79['buyWeaponCosts']){const _0x5c681c=Number(_0x12c83d)||0x0;if(!_0x5c681c)continue;const _0x3c97f5=$dataWeapons[_0x5c681c];if(!_0x3c97f5)continue;const _0x176f6e=_0xd8cf79[_0x162b8a(0x191)][_0x12c83d]||0x1,_0xdc49a4=$gameParty[_0x162b8a(0x183)](_0x3c97f5),_0x1c58f9=Math[_0x162b8a(0x106)](_0xdc49a4/_0x176f6e);_0x41fd76[_0x162b8a(0x13c)](_0x1c58f9);}for(const _0x4c6411 in _0xd8cf79[_0x162b8a(0x10c)]){const _0x5668fc=Number(_0x4c6411)||0x0;if(!_0x5668fc)continue;const _0x544581=$dataArmors[_0x5668fc];if(!_0x544581)continue;const _0x5272f4=_0xd8cf79[_0x162b8a(0x10c)][_0x4c6411]||0x1,_0x3d8e49=$gameParty[_0x162b8a(0x183)](_0x544581),_0x17bb02=Math[_0x162b8a(0x106)](_0x3d8e49/_0x5272f4);_0x41fd76['push'](_0x17bb02);}for(const _0x4785be in _0xd8cf79[_0x162b8a(0x116)]){const _0x456496=Number(_0x4785be)||0x0;if(!_0x456496)continue;const _0x4b6ff5=_0xd8cf79[_0x162b8a(0x116)][_0x4785be]||0x1,_0xeb0852=$gameVariables[_0x162b8a(0xd2)](_0x456496),_0x275aee=Math['floor'](_0xeb0852/_0x4b6ff5);_0x41fd76[_0x162b8a(0x13c)](_0x275aee);}return _0x41fd76;},VisuMZ[_0xdafcae(0x1a9)]['Scene_Shop_doBuy']=Scene_Shop[_0xdafcae(0x128)][_0xdafcae(0x167)],Scene_Shop[_0xdafcae(0x128)][_0xdafcae(0x167)]=function(_0x36c0e5){const _0x52706e=_0xdafcae;VisuMZ[_0x52706e(0x1a9)][_0x52706e(0x131)][_0x52706e(0xe4)](this,_0x36c0e5);if(_0x36c0e5<=0x0)return;$gameTemp[_0x52706e(0x171)]=!![],item=this[_0x52706e(0x104)][_0x52706e(0x133)](),$gameTemp[_0x52706e(0x171)]=![],VisuMZ[_0x52706e(0x1a9)][_0x52706e(0x1a2)](item,-_0x36c0e5);},VisuMZ[_0xdafcae(0x1a9)]['Scene_Shop_doSell']=Scene_Shop[_0xdafcae(0x128)][_0xdafcae(0x156)],Scene_Shop['prototype'][_0xdafcae(0x156)]=function(_0x412224){const _0x2f1666=_0xdafcae;$gameTemp[_0x2f1666(0x171)]=!![];let _0x39bce9=this['_sellWindow']['item']();$gameTemp[_0x2f1666(0x171)]=![],VisuMZ['MoreCurrencies'][_0x2f1666(0x198)][_0x2f1666(0xe4)](this,_0x412224);if(_0x412224<=0x0)return;VisuMZ[_0x2f1666(0x1a9)][_0x2f1666(0x1a2)](_0x39bce9,_0x412224);},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x1a2)]=function(_0x40cf19,_0x536229){const _0x2fa874=_0xdafcae;if(!_0x40cf19)return[];const _0x55354c=DataManager[_0x2fa874(0x179)](_0x40cf19),_0x2d65e1=_0x55354c[_0x40cf19['id']];if(!_0x2d65e1)return[];let _0x1f42af={};_0x1f42af=_0x536229<0x0?_0x2d65e1[_0x2fa874(0x149)]:_0x2d65e1[_0x2fa874(0x155)];for(const _0x316ae1 in _0x1f42af){const _0x41532a=Number(_0x316ae1)||0x0;if(!_0x41532a)continue;const _0x418c06=$dataItems[_0x41532a];if(!_0x418c06)continue;const _0x243f75=_0x1f42af[_0x316ae1]||0x1,_0x560206=_0x243f75*_0x536229;$gameParty[_0x2fa874(0x153)](_0x418c06,_0x560206);}_0x1f42af=_0x536229<0x0?_0x2d65e1['buyWeaponCosts']:_0x2d65e1[_0x2fa874(0xd9)];for(const _0x9b9312 in _0x1f42af){const _0x132690=Number(_0x9b9312)||0x0;if(!_0x132690)continue;const _0x12d03c=$dataWeapons[_0x132690];if(!_0x12d03c)continue;const _0x379fd6=_0x1f42af[_0x9b9312]||0x1,_0x3d962d=_0x379fd6*_0x536229;$gameParty[_0x2fa874(0x153)](_0x12d03c,_0x3d962d);}_0x1f42af=_0x536229<0x0?_0x2d65e1['buyArmorCosts']:_0x2d65e1[_0x2fa874(0xf4)];for(const _0x32f14d in _0x1f42af){const _0x365c49=Number(_0x32f14d)||0x0;if(!_0x365c49)continue;const _0x4aac20=$dataArmors[_0x365c49];if(!_0x4aac20)continue;const _0x1bda4d=_0x1f42af[_0x32f14d]||0x1,_0x1f383d=_0x1bda4d*_0x536229;$gameParty[_0x2fa874(0x153)](_0x4aac20,_0x1f383d);}_0x1f42af=_0x536229<0x0?_0x2d65e1[_0x2fa874(0x116)]:_0x2d65e1['sellVariableCosts'];for(const _0x4899d9 in _0x1f42af){const _0x5a5b56=Number(_0x4899d9)||0x0;if(!_0x5a5b56)continue;const _0x4d7a7e=_0x1f42af[_0x4899d9]||0x1,_0x5b6e2d=_0x4d7a7e*_0x536229,_0x3037b3=$gameVariables[_0x2fa874(0xd2)](_0x5a5b56)+_0x5b6e2d;$gameVariables['setValue'](_0x5a5b56,_0x3037b3);}},Window_Base['MORE_CURRENCIES_PADDING']=VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0xe2)][_0xdafcae(0xd4)][_0xdafcae(0x1a8)],Window_Base['MORE_CURRENCIES_ORDER']=VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0xe2)][_0xdafcae(0xd4)][_0xdafcae(0xcf)],Window_Base[_0xdafcae(0x128)]['drawItemMoreCurrencies']=function(_0x489e89,_0x21f79a,_0x21d5fa,_0x25d688){const _0x427406=_0xdafcae;_0x21d5fa=_0x21d5fa||![];let _0x50e29b=[];for(const _0x398702 of Window_Base[_0x427406(0x108)]){const _0x3d2528=VisuMZ[_0x427406(0x1a9)][_0x427406(0xed)](_0x489e89,_0x398702,_0x21d5fa,_0x25d688);if(_0x3d2528)_0x50e29b=_0x50e29b[_0x427406(0x107)](_0x3d2528);}const _0x280107=_0x427406(0x135)[_0x427406(0x10d)](TextManager[_0x427406(0xdf)]),_0x1beedc=_0x427406(0x135)[_0x427406(0x10d)]($gameSystem[_0x427406(0x15f)]());_0x50e29b[_0x427406(0xfa)](''),_0x50e29b=_0x50e29b['map'](_0x4d4eef=>_0x280107+_0x4d4eef+_0x1beedc);if(_0x50e29b['length']===0x0){if(Imported[_0x427406(0x159)]){const _0x1c3b88=SceneManager[_0x427406(0x193)][_0x427406(0x104)],_0x17c293=_0x1c3b88?_0x1c3b88['visualGoldDisplayPadding']():Window_Base[_0x427406(0x166)],_0x25e925=_0x1c3b88?_0x1c3b88[_0x427406(0x164)]():Window_Base[_0x427406(0x11b)];_0x50e29b[_0x427406(0x13c)](VisuMZ[_0x427406(0x16d)][_0x427406(0x176)](0x0,_0x17c293,_0x25e925));}else _0x50e29b['push'](VisuMZ[_0x427406(0x1a9)]['CreateGoldCostText'](0x0));}_0x50e29b[_0x427406(0x13b)]();for(const _0xd5296a of _0x50e29b){if(_0xd5296a==='')continue;this[_0x427406(0x10f)]();const _0x144e45=this[_0x427406(0x144)](_0xd5296a)[_0x427406(0x175)],_0x3e808b=_0x21f79a['x']+_0x21f79a['width']-_0x144e45,_0x28e8c0=_0x21f79a['y'];this[_0x427406(0x188)](_0xd5296a,_0x3e808b,_0x28e8c0,_0x144e45),_0x21f79a[_0x427406(0x175)]-=_0x144e45+Window_Base[_0x427406(0x177)];}this[_0x427406(0x10f)]();},VisuMZ['MoreCurrencies'][_0xdafcae(0xed)]=function(_0x5c3f09,_0x84b43e,_0x479d20,_0x2da630){const _0x1d782a=_0xdafcae;_0x84b43e=_0x84b43e[_0x1d782a(0x1b0)]()[_0x1d782a(0xe3)]();switch(_0x84b43e){case _0x1d782a(0x133):case _0x1d782a(0xcc):case _0x1d782a(0x148):return this[_0x1d782a(0x101)](_0x5c3f09,_0x84b43e,_0x479d20,_0x2da630);case _0x1d782a(0x151):return this['CreateSubVariableCostTexts'](_0x5c3f09,_0x84b43e,_0x479d20,_0x2da630);case _0x1d782a(0x121):return[this['CreateSubGoldCostText'](_0x5c3f09,_0x84b43e,_0x479d20,_0x2da630)];default:return[];}},VisuMZ['MoreCurrencies'][_0xdafcae(0x101)]=function(_0x5ce3f9,_0x21e1f5,_0x56496e,_0x272168){const _0x1fa72b=_0xdafcae,_0x229ea0=DataManager['getMoreCurrenciesObjLibrary'](_0x5ce3f9),_0x20967e=_0x229ea0[_0x5ce3f9['id']];if(!_0x20967e)return[];const _0x834bc=_0x56496e?_0x1fa72b(0x13a):_0x1fa72b(0x13f),_0x2b3ba5=_0x1fa72b(0x192)[_0x1fa72b(0x10d)](_0x834bc,_0x21e1f5[_0x1fa72b(0x181)](0x0)[_0x1fa72b(0xfe)]()+_0x21e1f5[_0x1fa72b(0x11f)](0x1));if(!_0x20967e[_0x2b3ba5])return[];let _0x55b949=[];if(_0x21e1f5===_0x1fa72b(0x133))_0x55b949=$dataItems;if(_0x21e1f5===_0x1fa72b(0xcc))_0x55b949=$dataWeapons;if(_0x21e1f5===_0x1fa72b(0x148))_0x55b949=$dataArmors;const _0x42daf0=TextManager['MoreCurrenciesFmt'][_0x21e1f5],_0x15629f=[];for(const _0x1383ab in _0x20967e[_0x2b3ba5]){const _0x479c08=Number(_0x1383ab),_0x3220a6=_0x55b949[_0x479c08];if(!_0x3220a6)continue;const _0x3caa25=_0x20967e[_0x2b3ba5][_0x1383ab]*_0x272168,_0x3d3661=$gameParty[_0x1fa72b(0x183)](_0x3220a6),_0x37c7dc=_0x3220a6['iconIndex']?_0x1fa72b(0x103)[_0x1fa72b(0x10d)](_0x3220a6[_0x1fa72b(0x187)]):'',_0x1eff0d=_0x3220a6[_0x1fa72b(0xd7)],_0x11d2fa=_0x42daf0[_0x1fa72b(0x10d)](_0x3caa25,_0x3d3661,_0x37c7dc,_0x1eff0d);_0x15629f['push'](_0x11d2fa);}return _0x15629f;},VisuMZ['MoreCurrencies'][_0xdafcae(0x14a)]=function(_0x4b1f94,_0x504bdc,_0x2d9561,_0x5c308f){const _0xcd3105=_0xdafcae,_0x5eb34f=DataManager['getMoreCurrenciesObjLibrary'](_0x4b1f94),_0x590da7=_0x5eb34f[_0x4b1f94['id']];if(!_0x590da7)return[];const _0x333dd1=_0x2d9561?_0xcd3105(0x13a):_0xcd3105(0x13f),_0x3cba9f=_0xcd3105(0x192)[_0xcd3105(0x10d)](_0x333dd1,_0x504bdc[_0xcd3105(0x181)](0x0)[_0xcd3105(0xfe)]()+_0x504bdc['slice'](0x1));if(!_0x590da7[_0x3cba9f])return[];const _0x1243c4=TextManager['MoreCurrenciesFmt'][_0x504bdc],_0x960023=[];for(const _0x370fa4 in _0x590da7[_0x3cba9f]){const _0xa1d52f=Number(_0x370fa4);if($dataSystem[_0xcd3105(0x113)][_0xcd3105(0xd3)]<=_0xa1d52f)continue;const _0x59c7b4=_0x590da7[_0x3cba9f][_0x370fa4]*_0x5c308f,_0x10364f=$gameVariables[_0xcd3105(0xd2)](_0xa1d52f);let _0x1d1aeb='',_0x2180a3=$dataSystem[_0xcd3105(0x113)][_0xa1d52f];_0x2180a3['match'](/\\I\[(\d+)\]/i)&&(_0x1d1aeb='\x5cI[%1]'[_0xcd3105(0x10d)](Number(RegExp['$1'])));_0x2180a3=_0x2180a3[_0xcd3105(0x139)](/<(.*)>/gi,'');const _0x4c3863=_0x1243c4[_0xcd3105(0x10d)](_0x59c7b4,_0x10364f,_0x1d1aeb,_0x2180a3);_0x960023['push'](_0x4c3863);}return _0x960023;},VisuMZ['MoreCurrencies']['CreateSubGoldCostText']=function(_0x42fa64,_0x53f643,_0x319999,_0x55c828){const _0x38831a=_0xdafcae,_0x5727d3=SceneManager['_scene'][_0x38831a(0x104)],_0x1bfe73=_0x5727d3?_0x5727d3[_0x38831a(0xe0)](_0x42fa64):0x0,_0x3dc071=SceneManager['_scene'][_0x38831a(0x19d)]?SceneManager[_0x38831a(0x193)]['sellPriceOfItem'](_0x42fa64):0x0,_0x5c2f8a=Math[_0x38831a(0xdc)]((_0x319999?_0x3dc071:_0x1bfe73)*_0x55c828);if(_0x5c2f8a===0x0)return'';if(Imported[_0x38831a(0x159)]){const _0x18f93c=_0x5727d3[_0x38831a(0x14e)](),_0x9ec3a7=_0x5727d3['visualGoldDisplayNoCost']();return VisuMZ['VisualGoldDisplay']['CreateVisualGoldText'](_0x5c2f8a,_0x18f93c,_0x9ec3a7);}else return this['CreateGoldCostText'](_0x5c2f8a);},VisuMZ[_0xdafcae(0x1a9)]['CreateGoldCostText']=function(_0xb9eccd){const _0x407bf0=_0xdafcae,_0x13bf68='%1%2%3',_0x59fd9b=VisuMZ[_0x407bf0(0xe5)][_0x407bf0(0xe2)][_0x407bf0(0xf0)][_0x407bf0(0x162)],_0x2c142a=TextManager[_0x407bf0(0xff)];return _0x13bf68[_0x407bf0(0x10d)](_0xb9eccd,_0x59fd9b>0x0?_0x407bf0(0x103)[_0x407bf0(0x10d)](_0x59fd9b):'',_0x59fd9b>0x0?'':_0x2c142a);},VisuMZ[_0xdafcae(0x1a9)]['Window_ShopBuy_drawItemCost']=Window_ShopBuy[_0xdafcae(0x128)][_0xdafcae(0x114)],Window_ShopBuy[_0xdafcae(0x128)][_0xdafcae(0x114)]=function(_0x23d3af,_0x5f4b4b){const _0x137abe=_0xdafcae;if(!_0x23d3af)return;this[_0x137abe(0x14c)](_0x23d3af,_0x5f4b4b,![],0x1);},VisuMZ[_0xdafcae(0x1a9)]['Window_ShopBuy_isEnabled']=Window_ShopBuy[_0xdafcae(0x128)][_0xdafcae(0x1a7)],Window_ShopBuy[_0xdafcae(0x128)]['isEnabled']=function(_0x422076){const _0x40c1e3=_0xdafcae;if(!VisuMZ[_0x40c1e3(0x1a9)][_0x40c1e3(0x1ae)][_0x40c1e3(0xe4)](this,_0x422076))return![];return VisuMZ['MoreCurrencies']['CheckMeetBuyRequirements'](_0x422076);},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x115)]=function(_0x228894){const _0x559970=_0xdafcae;if(!_0x228894)return![];const _0x3bc387=DataManager['getMoreCurrenciesObjLibrary'](_0x228894),_0x9208f9=_0x3bc387[_0x228894['id']];if(!_0x9208f9)return!![];for(const _0x4d6537 in _0x9208f9[_0x559970(0x149)]){const _0x6a0b5a=Number(_0x4d6537)||0x0;if(!_0x6a0b5a)continue;const _0x4d4dad=$dataItems[_0x6a0b5a];if(!_0x4d4dad)continue;const _0x273228=_0x9208f9[_0x559970(0x149)][_0x4d6537];if(_0x273228>$gameParty[_0x559970(0x183)](_0x4d4dad))return![];}for(const _0x1a149d in _0x9208f9['buyWeaponCosts']){const _0x14f727=Number(_0x1a149d)||0x0;if(!_0x14f727)continue;const _0x5c61df=$dataWeapons[_0x14f727];if(!_0x5c61df)continue;const _0x2179ee=_0x9208f9[_0x559970(0x191)][_0x1a149d];if(_0x2179ee>$gameParty[_0x559970(0x183)](_0x5c61df))return![];}for(const _0x2ab198 in _0x9208f9['buyArmorCosts']){const _0x27168d=Number(_0x2ab198)||0x0;if(!_0x27168d)continue;const _0x3e12b7=$dataArmors[_0x27168d];if(!_0x3e12b7)continue;const _0x4680db=_0x9208f9[_0x559970(0x10c)][_0x2ab198];if(_0x4680db>$gameParty[_0x559970(0x183)](_0x3e12b7))return![];}for(const _0x572e97 in _0x9208f9[_0x559970(0x116)]){const _0xff3f6d=Number(_0x572e97)||0x0;if(!_0xff3f6d)continue;const _0x52c532=_0x9208f9[_0x559970(0x116)][_0x572e97];if(_0x52c532>$gameVariables['value'](_0xff3f6d))return![];}return!![];},Window_ShopSell[_0xdafcae(0xe9)]=VisuMZ[_0xdafcae(0x1a9)]['Settings'][_0xdafcae(0xd4)][_0xdafcae(0x19f)],VisuMZ['MoreCurrencies'][_0xdafcae(0x16f)]=Window_ItemList['prototype'][_0xdafcae(0x129)],Window_ItemList[_0xdafcae(0x128)][_0xdafcae(0x129)]=function(_0x59e245,_0x2fb3dd,_0x521612,_0x167672){const _0x5a7e1a=_0xdafcae;VisuMZ[_0x5a7e1a(0x1a9)][_0x5a7e1a(0x16f)][_0x5a7e1a(0xe4)](this,_0x59e245,_0x2fb3dd,_0x521612,_0x167672),this['showMoreCurrenciesSellValue']&&this[_0x5a7e1a(0xda)]()&&this['drawSellPrice'](_0x59e245,_0x2fb3dd,_0x521612,_0x167672);},Window_ItemList[_0xdafcae(0x128)][_0xdafcae(0xda)]=function(){const _0xff8820=_0xdafcae;return this[_0xff8820(0x18a)]===Window_ShopSell&&Window_ShopSell[_0xff8820(0xe9)];},Window_ShopSell[_0xdafcae(0x128)][_0xdafcae(0xf1)]=function(_0x1b5090,_0x2bc76e,_0x3adba5,_0x3ef66e){const _0x568261=_0xdafcae,_0x2caf96=VisuMZ[_0x568261(0x143)][_0x568261(0xe2)][_0x568261(0x150)],_0x14451d=_0x2caf96[_0x568261(0x120)],_0x4771a6=_0x14451d[_0x568261(0x10d)]($gameParty[_0x568261(0x110)](_0x1b5090));this[_0x568261(0x11d)]['fontSize']=_0x2caf96['ItemQuantityFontSize'];const _0x4809c2=this[_0x568261(0xee)](_0x4771a6);_0x3ef66e-=_0x4809c2+Window_Base[_0x568261(0x177)];const _0x4bcf98=new Rectangle(_0x2bc76e,_0x3adba5,_0x3ef66e,this['lineHeight']());this[_0x568261(0x14c)](_0x1b5090,_0x4bcf98,!![],0x1);},Window_ShopNumber[_0xdafcae(0x128)]['itemNameY']=function(){return Math['floor'](this['totalPriceY']()+this['lineHeight']()*0x2);},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0x1ab)]=function(){const _0x1e12b3=_0xdafcae;return Math[_0x1e12b3(0x106)](this[_0x1e12b3(0x16e)]-this[_0x1e12b3(0x185)]()*6.5);},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0x173)]=function(){const _0x2241a0=_0xdafcae;return Math['floor'](this['itemNameY']()+this[_0x2241a0(0x185)]()*0x2);},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0x11e)]=function(){const _0x463c8d=_0xdafcae,_0x1d7c7e=VisuMZ[_0x463c8d(0x1a9)]['MakeShopNumberIngredients'](this[_0x463c8d(0x174)]);let _0x3e6815=this[_0x463c8d(0x1ab)]();_0x3e6815-=this[_0x463c8d(0x185)]()*_0x1d7c7e[_0x463c8d(0xd3)],this['drawCategories'](_0x3e6815);for(const _0x376bd2 of _0x1d7c7e){_0x3e6815+=this[_0x463c8d(0x185)]();if(!_0x376bd2)continue;this[_0x463c8d(0x138)](_0x376bd2,_0x3e6815);};},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0x160)]=function(_0x2b1161){const _0xcd606=_0xdafcae,_0x1325fd=this[_0xcd606(0xd8)]();let _0x54c4fb=_0x1325fd*0x2;const _0x506c1d=this['innerWidth']-_0x54c4fb-_0x1325fd*0x3,_0x3f631d=_0x54c4fb+Math[_0xcd606(0x18f)](_0x506c1d/0x3),_0x37ea2d=Math[_0xcd606(0x106)](_0x506c1d*0x2/0x3/0x3),_0x290926=Math[_0xcd606(0x172)](this['textWidth'](_0xcd606(0x17c)),this[_0xcd606(0xee)](_0xcd606(0x15b)));this[_0xcd606(0x10f)](),this[_0xcd606(0x100)](ColorManager['systemColor']());const _0x2e537c=[_0xcd606(0x152),'shift','net'];for(let _0x27e4fa=0x0;_0x27e4fa<0x3;_0x27e4fa++){const _0x2a8d75=_0x2e537c[_0x27e4fa],_0x1d0068=TextManager[_0xcd606(0x15a)][_0x2a8d75];this[_0xcd606(0xcd)](_0x1d0068,_0x3f631d+_0x37ea2d*_0x27e4fa+_0x290926,_0x2b1161,_0x37ea2d-_0x290926,'center');}},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0x16c)]=function(_0x4eefa4,_0x499260){const _0x4f87d3=_0xdafcae,_0x47eb4f=this[_0x4f87d3(0xd8)]();let _0x1ecad3=_0x47eb4f*0x2;const _0x4ac4b7=this[_0x4f87d3(0x190)]-_0x1ecad3-_0x47eb4f*0x3,_0x4eecf2=_0x1ecad3+Math['ceil'](_0x4ac4b7/0x3),_0x161936=Math[_0x4f87d3(0x106)](_0x4ac4b7*0x2/0x3/0x3);_0x499260=_0x4f87d3(0x119)['format'](_0x499260),this['drawText'](_0x499260,_0x4eecf2+_0x161936*0x1,_0x4eefa4,_0x161936,'left'),this[_0x4f87d3(0xcd)]('\x20=',_0x4eecf2+_0x161936*0x2,_0x4eefa4,_0x161936,'left');},Window_ShopNumber['prototype'][_0xdafcae(0x138)]=function(_0x370be8,_0x3acd98){const _0x35fa07=_0xdafcae,_0x57a2cb=_0x370be8[0x0];this[_0x35fa07(0x10f)]();const _0x5f4563=SceneManager[_0x35fa07(0x193)]['_commandWindow'][_0x35fa07(0xf6)](),_0x268cea=_0x5f4563===_0x35fa07(0x13f);this['drawMoreCurrenciesMathMarks'](_0x3acd98,_0x268cea?'-':'+');if(_0x57a2cb===_0x35fa07(0x121))this[_0x35fa07(0x17f)](_0x370be8,_0x3acd98,_0x268cea);else _0x57a2cb===_0x35fa07(0x151)?this[_0x35fa07(0x122)](_0x370be8,_0x3acd98,_0x268cea):this[_0x35fa07(0x137)](_0x370be8,_0x3acd98,_0x268cea);},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0x14f)]=function(){return!![];},Window_ShopNumber['prototype'][_0xdafcae(0x164)]=function(){return![];},Window_ShopNumber[_0xdafcae(0x128)]['drawMoreCurrenciesGold']=function(_0x4da61b,_0x398c76,_0x23445c){const _0x1629cd=_0xdafcae,_0x336f29=this[_0x1629cd(0xd8)]();let _0x153d9d=_0x336f29*0x2;const _0x29e87=this[_0x1629cd(0x190)]-_0x153d9d-_0x336f29*0x3,_0x189350=_0x153d9d+Math['ceil'](_0x29e87/0x3),_0x392a2a=Math['floor'](_0x29e87*0x2/0x3/0x3),_0x28fee4=Math[_0x1629cd(0x172)](this[_0x1629cd(0xee)]('\x20+\x20'),this[_0x1629cd(0xee)]('\x20=\x20')),_0x158866=_0x4da61b[0x0],_0x4a7e26=_0x4da61b[0x1],_0x2b1911=_0x4a7e26*this['_number'],_0x4e427b=VisuMZ[_0x1629cd(0xe5)][_0x1629cd(0xe2)][_0x1629cd(0xf0)][_0x1629cd(0x162)];if(_0x4e427b>0x0){const _0x21e47f=ImageManager[_0x1629cd(0x17d)]||0x20,_0x34cd61=_0x21e47f-ImageManager[_0x1629cd(0x196)],_0x3d5236=_0x21e47f+0x4,_0x1a7486=_0x398c76+(this[_0x1629cd(0x185)]()-ImageManager[_0x1629cd(0xcb)])/0x2;this[_0x1629cd(0x19a)](_0x4e427b,_0x153d9d+Math[_0x1629cd(0x18f)](_0x34cd61/0x2),_0x1a7486),_0x153d9d+=_0x3d5236;}this['changeTextColor'](ColorManager[_0x1629cd(0x169)]()),this['drawText'](TextManager[_0x1629cd(0xff)],_0x153d9d,_0x398c76,_0x392a2a,_0x1629cd(0xfd));const _0x6f3055=$gameParty['gold']();this[_0x1629cd(0xef)](_0x6f3055,TextManager[_0x1629cd(0xff)],_0x189350,_0x398c76,_0x392a2a);const _0x536895=_0x189350+_0x392a2a*0x1+_0x28fee4,_0x171255=_0x392a2a-_0x28fee4;this[_0x1629cd(0xef)](_0x2b1911,TextManager[_0x1629cd(0xff)],_0x536895,_0x398c76,_0x171255);const _0xa2d3ca=_0x189350+_0x392a2a*0x2+_0x28fee4,_0x54601f=_0x392a2a-_0x28fee4,_0x4838d3=Math[_0x1629cd(0x123)](_0x6f3055+_0x2b1911*(_0x23445c?-0x1:0x1),$gameParty[_0x1629cd(0xec)]());this['drawCurrencyValue'](_0x4838d3,TextManager[_0x1629cd(0xff)],_0xa2d3ca,_0x398c76,_0x54601f);},Window_ShopNumber[_0xdafcae(0x128)]['drawMoreCurrenciesVariable']=function(_0x33a3b3,_0x31e0d6,_0x26f62f){const _0x5b3bc0=_0xdafcae,_0x2ce36c=this[_0x5b3bc0(0xd8)]();let _0x479fe6=_0x2ce36c*0x2;const _0x5bd8f7=this[_0x5b3bc0(0x190)]-_0x479fe6-_0x2ce36c*0x3,_0x39f09a=_0x479fe6+Math['ceil'](_0x5bd8f7/0x3),_0x5292ba=Math[_0x5b3bc0(0x106)](_0x5bd8f7*0x2/0x3/0x3),_0x4f9bfd=Math[_0x5b3bc0(0x172)](this[_0x5b3bc0(0xee)](_0x5b3bc0(0x17c)),this[_0x5b3bc0(0xee)](_0x5b3bc0(0x15b))),_0x2dbfbf=_0x33a3b3[0x0],_0x11fbaa=_0x33a3b3[0x1],_0x59b231=_0x33a3b3[0x2],_0xa55095=_0x11fbaa*this[_0x5b3bc0(0x1aa)];let _0x1d599c=0x0;const _0x1b68bc=$dataSystem['variables'][_0x59b231];_0x1b68bc[_0x5b3bc0(0x1a1)](/\\I\[(\d+)\]/i)&&(_0x1d599c=Number(RegExp['$1']));const _0x3a20b3=_0x1d599c>0x0?ImageManager[_0x5b3bc0(0x196)]+0x4:0x0;this[_0x5b3bc0(0x188)](_0x1b68bc,_0x479fe6,_0x31e0d6,_0x5bd8f7,_0x5b3bc0(0xfd));const _0x29b238=_0x39f09a+_0x5292ba*0x0,_0x4e5186=_0x5292ba-_0x3a20b3,_0x3e9e9c=$gameVariables[_0x5b3bc0(0xd2)](_0x59b231);this[_0x5b3bc0(0xcd)](_0x3e9e9c,_0x29b238,_0x31e0d6,_0x4e5186,_0x5b3bc0(0x1ac)),this[_0x5b3bc0(0x19a)](_0x1d599c,_0x29b238+_0x4e5186+0x4,_0x31e0d6);const _0x4022ac=_0x39f09a+_0x5292ba*0x1+_0x4f9bfd,_0x5d03c7=_0x5292ba-_0x4f9bfd-_0x3a20b3;this[_0x5b3bc0(0xcd)](_0xa55095,_0x4022ac,_0x31e0d6,_0x5d03c7,_0x5b3bc0(0x1ac)),this[_0x5b3bc0(0x19a)](_0x1d599c,_0x4022ac+_0x5d03c7+0x4,_0x31e0d6);const _0x477cbc=_0x39f09a+_0x5292ba*0x2+_0x4f9bfd,_0x271c4c=_0x5292ba-_0x4f9bfd-_0x3a20b3,_0x47c2c4=_0x3e9e9c+_0xa55095*(_0x26f62f?-0x1:0x1);this[_0x5b3bc0(0xcd)](_0x47c2c4,_0x477cbc,_0x31e0d6,_0x271c4c,_0x5b3bc0(0x1ac)),this['drawIcon'](_0x1d599c,_0x477cbc+_0x271c4c+0x4,_0x31e0d6);},Window_ShopNumber['prototype'][_0xdafcae(0x137)]=function(_0x418792,_0x5ffef,_0x4eddc9){const _0x4e20d3=_0xdafcae,_0xd97d1f=this[_0x4e20d3(0xd8)]();let _0x1bbe96=_0xd97d1f*0x2;const _0x45c7bb=this[_0x4e20d3(0x190)]-_0x1bbe96-_0xd97d1f*0x3,_0x3ed319=_0x1bbe96+Math[_0x4e20d3(0x18f)](_0x45c7bb/0x3),_0xe9257e=Math[_0x4e20d3(0x106)](_0x45c7bb*0x2/0x3/0x3),_0x35bff1=Math[_0x4e20d3(0x172)](this['textWidth'](_0x4e20d3(0x17c)),this[_0x4e20d3(0xee)](_0x4e20d3(0x15b))),_0x35a65e=_0x418792[0x0];if(!_0x35a65e)return;const _0x1c6378=_0x418792[0x1],_0x1f0215=_0x1c6378*this[_0x4e20d3(0x1aa)];let _0xa61b65=_0x35a65e['iconIndex'];const _0xe36367=_0xa61b65>0x0?ImageManager[_0x4e20d3(0x196)]+0x4:0x0;this[_0x4e20d3(0x145)](_0x35a65e,_0x1bbe96,_0x5ffef,_0x45c7bb);const _0x564d78=_0x3ed319+_0xe9257e*0x0,_0x3377e2=_0xe9257e-_0xe36367,_0x35eb48=$gameParty[_0x4e20d3(0x183)](_0x35a65e);this[_0x4e20d3(0xcd)](_0x35eb48,_0x564d78,_0x5ffef,_0x3377e2,_0x4e20d3(0x1ac)),this['drawIcon'](_0xa61b65,_0x564d78+_0x3377e2+0x4,_0x5ffef);const _0x56e14d=_0x3ed319+_0xe9257e*0x1+_0x35bff1,_0x534904=_0xe9257e-_0x35bff1-_0xe36367;this['drawText'](_0x1f0215,_0x56e14d,_0x5ffef,_0x534904,_0x4e20d3(0x1ac)),this[_0x4e20d3(0x19a)](_0xa61b65,_0x56e14d+_0x534904+0x4,_0x5ffef);const _0x3989c8=_0x3ed319+_0xe9257e*0x2+_0x35bff1,_0x25b472=_0xe9257e-_0x35bff1-_0xe36367,_0x1fb782=_0x35eb48+_0x1f0215*(_0x4eddc9?-0x1:0x1);this[_0x4e20d3(0xcd)](_0x1fb782,_0x3989c8,_0x5ffef,_0x25b472,_0x4e20d3(0x1ac)),this[_0x4e20d3(0x19a)](_0xa61b65,_0x3989c8+_0x25b472+0x4,_0x5ffef);},Window_ShopNumber[_0xdafcae(0x128)]['drawCurrentItemName']=function(){const _0x508630=_0xdafcae,_0x59c0a5=[this['_item'],0x1],_0x5ebfc9=this[_0x508630(0x127)](),_0x1efd78=SceneManager[_0x508630(0x193)]['_commandWindow'][_0x508630(0xf6)](),_0x4c33c1=_0x1efd78===_0x508630(0x13f);this[_0x508630(0x137)](_0x59c0a5,_0x5ebfc9,!_0x4c33c1);const _0x28817c=_0x4c33c1?'+':'-';this[_0x508630(0x16c)](_0x5ebfc9,_0x28817c);},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0x14d)]=function(){},Window_ShopNumber['prototype']['drawNumber']=function(){},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0xea)]=function(){const _0x488914=_0xdafcae;if(!this[_0x488914(0x174)])return 0x1;let _0x2669b9=String($gameParty['maxItems'](this[_0x488914(0x174)]));return this[_0x488914(0x12c)]()&&(_0x2669b9=VisuMZ['GroupDigits'](_0x2669b9)),_0x2669b9['length'];},Window_ShopNumber[_0xdafcae(0x128)][_0xdafcae(0xfc)]=function(){const _0x42d1cc=_0xdafcae,_0xf8ca0=this[_0x42d1cc(0xd8)]();let _0xb402e2=_0xf8ca0*0x2;const _0x1f928e=this['innerWidth']-_0xb402e2-_0xf8ca0*0x3,_0xce3bdc=_0xb402e2+Math[_0x42d1cc(0x18f)](_0x1f928e/0x3),_0xf988b4=this[_0x42d1cc(0x127)](),_0xc20957=Math['floor'](_0x1f928e*0x2/0x3/0x3),_0x5ab0bf=Math[_0x42d1cc(0x172)](this[_0x42d1cc(0xee)](_0x42d1cc(0x17c)),this[_0x42d1cc(0xee)](_0x42d1cc(0x15b))),_0x23b8a9=this[_0x42d1cc(0x174)]?.['iconIndex']>0x0?ImageManager[_0x42d1cc(0x196)]:0x0,_0x4aa665=this[_0x42d1cc(0x180)](),_0x1ceb95=new Rectangle(Math['floor'](_0xce3bdc+_0xc20957*0x2-this['cursorWidth']()-_0x23b8a9+this['itemPadding']()/0x2-0x2),_0xf988b4,this['cursorWidth'](),this[_0x42d1cc(0x185)]());return _0x1ceb95;},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x165)]=function(_0x167be4){const _0x4d15f8=_0xdafcae;let _0x392353=[];const _0x12d932=SceneManager[_0x4d15f8(0x193)][_0x4d15f8(0x102)][_0x4d15f8(0xf6)]()===_0x4d15f8(0x13a);for(const _0x280e4a of Window_Base[_0x4d15f8(0x108)]){const _0x3822ed=this[_0x4d15f8(0x10a)](_0x167be4,_0x280e4a,_0x12d932);if(_0x280e4a===_0x4d15f8(0x121)&&SceneManager[_0x4d15f8(0x193)]['_numberWindow'][_0x4d15f8(0x184)]<=0x0)continue;if(_0x3822ed)_0x392353=_0x392353[_0x4d15f8(0x107)](_0x3822ed);};return _0x392353[_0x4d15f8(0xd3)]===0x0&&_0x392353[_0x4d15f8(0x13c)]([_0x4d15f8(0x121),0x0]),_0x392353;},VisuMZ[_0xdafcae(0x1a9)]['GetShopNumberIngredientType']=function(_0x23f406,_0x420453,_0x3a25f0){const _0x521eef=_0xdafcae;_0x420453=_0x420453[_0x521eef(0x1b0)]()['trim']();switch(_0x420453){case _0x521eef(0x133):case _0x521eef(0xcc):case _0x521eef(0x148):return this['GetShopNumberIngredientItems'](_0x23f406,_0x420453,_0x3a25f0);case _0x521eef(0x151):return this['GetShopNumberIngredientVariables'](_0x23f406,_0x420453,_0x3a25f0);case'gold':return[this[_0x521eef(0xde)]()];}},VisuMZ['MoreCurrencies'][_0xdafcae(0x15c)]=function(_0x40c790,_0x2a87e3,_0x37b140){const _0x16a501=_0xdafcae;if(!_0x40c790)return[];const _0x5cf0a8=DataManager[_0x16a501(0x179)](_0x40c790);if(!_0x5cf0a8)return[];const _0x37ff34=_0x5cf0a8[_0x40c790['id']];if(!_0x37ff34)return[];const _0xb07be5=_0x37b140?_0x16a501(0x13a):_0x16a501(0x13f),_0x117b17=_0x16a501(0x192)['format'](_0xb07be5,_0x2a87e3['charAt'](0x0)['toUpperCase']()+_0x2a87e3[_0x16a501(0x11f)](0x1));if(!_0x37ff34[_0x117b17])return[];let _0x51b014=[];if(_0x2a87e3===_0x16a501(0x133))_0x51b014=$dataItems;if(_0x2a87e3===_0x16a501(0xcc))_0x51b014=$dataWeapons;if(_0x2a87e3==='armor')_0x51b014=$dataArmors;const _0x25a332=[];for(const _0xf6718c in _0x37ff34[_0x117b17]){const _0x4b7f92=Number(_0xf6718c),_0x4f48d8=_0x51b014[_0x4b7f92];if(!_0x4f48d8)continue;const _0x9e14b5=[_0x4f48d8];_0x9e14b5[_0x16a501(0x13c)](_0x37ff34[_0x117b17][_0xf6718c]),_0x25a332[_0x16a501(0x13c)](_0x9e14b5);}return _0x25a332;},VisuMZ[_0xdafcae(0x1a9)][_0xdafcae(0x12e)]=function(_0x498075,_0x1940f1,_0xd9e392){const _0x3c8c2a=_0xdafcae;if(!_0x498075)return[];const _0x19be1b=DataManager['getMoreCurrenciesObjLibrary'](_0x498075);if(!_0x19be1b)return[];const _0x2107b6=_0x19be1b[_0x498075['id']];if(!_0x2107b6)return[];const _0x1fd5b4=_0xd9e392?_0x3c8c2a(0x13a):'buy',_0x9cfe1=_0x3c8c2a(0x192)[_0x3c8c2a(0x10d)](_0x1fd5b4,_0x1940f1[_0x3c8c2a(0x181)](0x0)[_0x3c8c2a(0xfe)]()+_0x1940f1[_0x3c8c2a(0x11f)](0x1));if(!_0x2107b6[_0x9cfe1])return[];const _0x569f74=[];for(const _0x56a108 in _0x2107b6[_0x9cfe1]){const _0x29a402=Number(_0x56a108);if($dataSystem[_0x3c8c2a(0x113)]['length']<=_0x29a402)continue;const _0x2a0b7b=['variable'];_0x2a0b7b[_0x3c8c2a(0x13c)](_0x2107b6[_0x9cfe1][_0x56a108]),_0x2a0b7b[_0x3c8c2a(0x13c)](_0x29a402),_0x569f74['push'](_0x2a0b7b);}return _0x569f74;},VisuMZ['MoreCurrencies'][_0xdafcae(0xde)]=function(){const _0x67832c=_0xdafcae,_0x1f8fbe=SceneManager['_scene'][_0x67832c(0xce)]['_price'];return[_0x67832c(0x121),_0x1f8fbe];};