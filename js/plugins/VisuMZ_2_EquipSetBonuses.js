//=============================================================================
// VisuStella MZ - Equipment Set Bonuses
// VisuMZ_2_EquipSetBonuses.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_EquipSetBonuses = true;

var VisuMZ = VisuMZ || {};
VisuMZ.EquipSetBonuses = VisuMZ.EquipSetBonuses || {};
VisuMZ.EquipSetBonuses.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.03] [EquipSetBonuses]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Equipment_Set_Bonuses_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_ItemsEquipsCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ItemsEquipsCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This is a RPG Maker MZ plugin that allows you to set equipment to be a part
 * of various sets. When multiple pieces of the set are equipped, (for example:
 * Warrior Shield, Warrior Helm, Warrior Armor), then bonuses are applied.
 * Bonuses can be applied at different stages, too, depending on how many set
 * pieces are being currently equipped. The art (faces, map sprites, battler,
 * and various portraits for other plugins) for an actor can also change based
 * on the number of equipment sets worn.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Create an unlimited amount of Equipment Sets to apply to actors when
 *   wearing matching sets of weapons and/or armor.
 * * Each equipment set can apply bonuses at various stages depending on the
 *   number of set pieces equipped up to a total of 20 per Equipment Set.
 * * A tooltip window to show extra data to show the player what bonuses are
 *   applied when different numbers of set pieces are equipped.
 * * Apply different appearances to actor graphics (face, map sprites, battler,
 *   and portraits) depending on the number of equipment pieces equipped for
 *   certain sets.
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
 * * VisuMZ_1_SkillsStatesCore
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
 * Equipment Set Graphics
 * 
 * If an actor has equipment set graphics defined, they will overwrite the face
 * graphic, map character sprite graphic, battler graphic, and any portraits
 * that have been added through the VisuStella MZ plugins. The equipment set
 * graphics will take priority over the default graphics.
 * 
 * If an actor has multiple equipment sets on at the same time, each with their
 * own set graphics, the set with the highest number of pieces that has defined
 * graphics will be given priority.
 * 
 * ---
 * 
 * Change Actor Images Event Command
 * 
 * When changing an actor's graphics through the "Change Actor Images" event
 * command, these changes will take priority over the Equipment Set Graphics.
 * If you want to remove these priority graphics, set the "Change Actor Images"
 * images to "(None)".
 * 
 * Keep in mind that this means you cannot make an "invisible" graphic through
 * the "(None)" selection anymore. Instead, you need to make a work around by
 * making a custom graphic image that is fully transparent.
 *
 * ---
 *
 * ============================================================================
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_1_BattleCore
 * 
 * VisuMZ_1_MainMenuCore
 *
 * If the Battle Core and/or the Main Menu Core is installed, the Equipment
 * Set Graphics also gives access to notetags that alter their battle portraits
 * and/or menu portraits based on whatever Equipment Sets are equipped.
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
 * === Equipment Set Declaration-Related Notetags ===
 * 
 * ---
 *
 * <Equip Set: name>
 *
 * - Used for: Weapon, Armor Notetags
 * - This assigns this item to an equipment set.
 * - Replace 'name' with the set name you're going to associate this equip
 *   with. Names must equal the Equipment Set names declared in the Plugin
 *   Parameters or else they will not have any effect.
 * - If you want to make a piece of equipment be a part of two different
 *   equipment sets, use multiple copies of this notetag.
 *
 * ---
 * 
 * === Equipment Set Graphics-Related Notetags ===
 * 
 * ---
 *
 * <name Set, x Pieces Face: filename, index>
 * <name Set, x+ Pieces Face: filename, index>
 * <name Set, x to y Pieces Face: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/faces/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Character: filename, index>
 * <name Set, x+ Pieces Character: filename, index>
 * <name Set, x to y Pieces Character: filename, index>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/characters/ folder. Do not include the file extension.
 * - Replace 'index' with the index of the graphic. Index values start at 0.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battler: filename>
 * <name Set, x+ Pieces Battler: filename>
 * <name Set, x to y Pieces Battler: filename>
 *
 * - Used for: Actor Notetags
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/sv_actors/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Menu Portrait: filename>
 * <name Set, x+ Pieces Menu Portrait: filename>
 * <name Set, x to y Pieces Menu Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_MainMenuCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * <name Set, x Pieces Battle Portrait: filename>
 * <name Set, x+ Pieces Battle Portrait: filename>
 * <name Set, x to y Pieces Battle Portrait: filename>
 *
 * - Used for: Actor Notetags
 * - Requires VisuMZ_1_BattleCore!
 * - Gives this actor an Equipment Set face graphic.
 * - Replace 'name' with the Equipment Set name to apply to. Use the set names
 *   that are declared in the Plugin Parameters or there will be no effect.
 * - Replace 'x' with the exact number of pieces to apply this graphic to.
 *   This does NOT apply to larger number numbers, only exactly that amount.
 * - The 'x+' variant will apply the graphic from 'x' to higher numbers.
 * - The 'x to y' variant will apply the graphic for a range of pieces to be
 *   equipped in order to apply the graphic.
 * - Replace 'filename' with the filename of the graphic found inside the
 *   img/pictures/ folder. Do not include the file extension.
 * - 
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Equipment Sets Settings
 * ============================================================================
 *
 * This is where you put all your equipment sets used in the game.
 * Adjust their settings here.
 *
 * ---
 *
 * Equipment Set
 * 
 *   Equipment Set Name:
 *   - This set's name used for databasing and in-game.
 *   - Register equips to sets using <Equip Set: x> notetag.
 * 
 *   Icon:
 *   - This is the icon used to repesent the set name.
 *   - Use 0 to not show an icon.
 * 
 *   Bonuses:
 * 
 *   1 Piece Bonus:
 *   2 Pieces Bonus:
 *   3 Pieces Bonus:
 *   4 Pieces Bonus:
 *   5 Pieces Bonus:
 *   6 Pieces Bonus:
 *   7 Pieces Bonus:
 *   8 Pieces Bonus:
 *   9 Pieces Bonus:
 *   10 Pieces Bonus:
 *   11 Pieces Bonus:
 *   12 Pieces Bonus:
 *   13 Pieces Bonus:
 *   14 Pieces Bonus:
 *   15 Pieces Bonus:
 *   16 Pieces Bonus:
 *   17 Pieces Bonus:
 *   18 Pieces Bonus:
 *   19 Pieces Bonus:
 *   20 Pieces Bonus:
 *   - Bonuses applied for having this number of pieces equipped.
 *   - These settings stack with later bonuses in the same set.
 *
 * ---
 *
 * 1-20 Piece(s) Bonus
 * 
 *   Text:
 *   - Text that appears next to each piece in the tooltip window.
 *   - Use 'auto' if you want this to be done automatically.
 * 
 *     Show in Tooltip?:
 *     - Show this in the tooltip?
 * 
 *   Bonuses:
 * 
 *     Passive States:
 *     - States that will be given out as passives when the required piece
 *       count is equipped.
 * 
 *     Basic Parameters:
 *     - Bonuses applied to the Basic Parameters when the required piece count
 *       is equipped.
 * 
 *     X Parameters:
 *     - Bonuses applied to the X Parameters when the required piece count is
 *       equipped.
 * 
 *     S Parameters:
 *     - Bonuses applied to the S Parameters when the required piece count is
 *       equipped.
 *
 * ---
 *
 * Basic Parameters
 * 
 *   MaxHP:
 *   MaxMP:
 *   ATK:
 *   DEF:
 *   MAT:
 *   MDF:
 *   AGI:
 *   LUK:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0 is +0.
 *
 * ---
 *
 * X Parameters
 * 
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * S Parameters
 * 
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 * 
 *   Rate:
 *   - Multiplicative bonus for this param when the required piece count is
 *     equipped.
 *   - 1.0 is 100%.
 * 
 *   Add:
 *   - Additive bonus for this param when the required piece count is equipped.
 *   - 0.0 is +0%.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Mechanics settings for Equipment Set Bonuses.
 *
 * ---
 *
 * Settings
 * 
 *   Base Parameter Add:
 *   X Parameter Add:
 *   S Parameter Add:
 *   - When do you wish to apply the "Add" bonus parameters?
 *   - Typical Formula: (base + plus) * rate + flat
 *     - Plus - Apply Before Rate
 *     - Flat - Apply After Rate
 *   - For the purpose of keeping the bonuses consistent without confusing any
 *     players, there will be no notetags to shift between the two settings as
 *     an exception for an equip bonus.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * Tooltip settings for Equipment Set Bonuses. The tooltip window will appear
 * when selecting equipment with the <Equip Set: name> notetag.
 * 
 * By default, it will by anchored towards the upper left. However, if the
 * position of the tooltip would extend past the bottom of the screen, then the
 * tooltip window will change its anchor towards the bottom left as to not
 * cover the name of the item it is displaying information for.
 *
 * ---
 *
 * Appearance
 * 
 *   Show Tooltip?:
 *   - Show tooltips for Equipment Set Bonuses?
 * 
 *   Scale:
 *   - What scale size do you want for the tooltip?
 *   - Use 1.0 for normal size.
 * 
 *   Skin Filename:
 *   - What window skin do you want to use for the tooltip?
 * 
 *   Skin Opacity:
 *   - What opacity setting is used for the tooltip?
 *   - Use a number between 0 and 255.
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - Offset the tooltip X position from the mouse?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the tooltip Y position from the mouse?
 *   - Negative: up. Positive: down. 
 *   - Inversed when low on screen.
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
 * Version 1.03: January 20, 2023
 * * Bug Fixes!
 * ** Fixed a bug that prevented character map sprites from being updated.
 *    Fix made by Irina.
 * 
 * Version 1.02: November 3, 2022
 * * Bug Fixes!
 * ** Fixed a problem with Custom text parameter that caused certain lines to
 *    not show up properly. Fix made by Irina.
 * 
 * Version 1.01: October 7, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.00 Official Release Date: March 8, 2021
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EquipSetBonuses
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param EquipSets:arraystruct
 * @text Equipment Sets
 * @type struct<EquipSet>[]
 * @desc This is where you put all your equipment sets used in the
 * game. Adjust their settings here.
 * @default ["{\"SetName:str\":\"Hearty\",\"Icon:num\":\"84\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+50\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+25\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Sorcery\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Power\",\"Icon:num\":\"77\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+15\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.20\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Guardian\",\"Icon:num\":\"81\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+40\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Wizard\",\"Icon:num\":\"78\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Alchemist\",\"Icon:num\":\"79\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+10\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.10\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Speedy\",\"Icon:num\":\"82\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+30\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+20\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{\\\\\\\"HIT\\\\\\\":\\\\\\\"Hit Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EVA\\\\\\\":\\\\\\\"Evasion Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.05\\\\\\\",\\\\\\\"CRI\\\\\\\":\\\\\\\"Critical Hit\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CEV\\\\\\\":\\\\\\\"Critical Evasion\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MEV\\\\\\\":\\\\\\\"Magic Evasion\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRF\\\\\\\":\\\\\\\"Magic Reflect\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"CNT\\\\\\\":\\\\\\\"Counter Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"HRG\\\\\\\":\\\\\\\"HP Regen Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MRG\\\\\\\":\\\\\\\"Magic Regen Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TRG\\\\\\\":\\\\\\\"TP Regen Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.50\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"-0.10\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.0\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}","{\"SetName:str\":\"Fortuna\",\"Icon:num\":\"87\",\"Bonuses\":\"\",\"Piece1:struct\":\"{}\",\"Piece2:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.10\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{}\\\"}\",\"Piece3:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.20\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.25\\\\\\\"}\\\"}\",\"Piece4:struct\":\"{\\\"Text:str\\\":\\\"auto\\\",\\\"ShowText:eval\\\":\\\"true\\\",\\\"Bonuses\\\":\\\"\\\",\\\"PassiveStates:arraynum\\\":\\\"[]\\\",\\\"Param:struct\\\":\\\"{\\\\\\\"MaxHP\\\\\\\":\\\\\\\"Maximum Hit Points\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MaxMP\\\\\\\":\\\\\\\"Maximum Magic Points\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"ATK\\\\\\\":\\\\\\\"Attack\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"DEF\\\\\\\":\\\\\\\"Defense\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MAT\\\\\\\":\\\\\\\"Magic Attack\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"MDF\\\\\\\":\\\\\\\"Magic Defense\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"AGI\\\\\\\":\\\\\\\"Agility\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0\\\\\\\",\\\\\\\"LUK\\\\\\\":\\\\\\\"Luck\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.30\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0\\\\\\\"}\\\",\\\"XParam:struct\\\":\\\"{}\\\",\\\"SParam:struct\\\":\\\"{\\\\\\\"TGR\\\\\\\":\\\\\\\"Target Rate\\\\\\\",\\\\\\\"Rate0:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus0:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"GRD\\\\\\\":\\\\\\\"Guard Rate\\\\\\\",\\\\\\\"Rate1:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus1:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"REC\\\\\\\":\\\\\\\"Recovery Rate\\\\\\\",\\\\\\\"Rate2:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus2:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PHA\\\\\\\":\\\\\\\"Pharmacology Rate\\\\\\\",\\\\\\\"Rate3:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus3:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MCR\\\\\\\":\\\\\\\"MP Cost Rate\\\\\\\",\\\\\\\"Rate4:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus4:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"TCR\\\\\\\":\\\\\\\"TP Charge Rate\\\\\\\",\\\\\\\"Rate5:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus5:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"PDR\\\\\\\":\\\\\\\"Physical Damage Rate\\\\\\\",\\\\\\\"Rate6:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus6:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"MDR\\\\\\\":\\\\\\\"Magical Damage Rate\\\\\\\",\\\\\\\"Rate7:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus7:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"FDR\\\\\\\":\\\\\\\"Floor Damage Rate\\\\\\\",\\\\\\\"Rate8:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus8:num\\\\\\\":\\\\\\\"+0.0\\\\\\\",\\\\\\\"EXR\\\\\\\":\\\\\\\"Experience Gain Rate\\\\\\\",\\\\\\\"Rate9:num\\\\\\\":\\\\\\\"1.0\\\\\\\",\\\\\\\"Plus9:num\\\\\\\":\\\\\\\"+0.50\\\\\\\"}\\\"}\",\"Piece5:struct\":\"{}\",\"Piece6:struct\":\"{}\",\"Piece7:struct\":\"{}\",\"Piece8:struct\":\"{}\",\"Piece9:struct\":\"{}\",\"Piece10:struct\":\"{}\",\"Piece11:struct\":\"{}\",\"Piece12:struct\":\"{}\",\"Piece13:struct\":\"{}\",\"Piece14:struct\":\"{}\",\"Piece15:struct\":\"{}\",\"Piece16:struct\":\"{}\",\"Piece17:struct\":\"{}\",\"Piece18:struct\":\"{}\",\"Piece19:struct\":\"{}\",\"Piece20:struct\":\"{}\"}"]
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Mechanics settings for Equipment Set Bonuses.
 * @default {"BaseParamAdd:str":"flat","XParamAdd:str":"flat","SParamAdd:str":"flat"}
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc Tooltip settings for Equipment Set Bonuses.
 * @default {"Appearance":"","Show:eval":"true","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+24","OffsetY:num":"+40","Vocabulary":"","SetTitleFmt:str":"%2\\C[5]%1 Set Bonuses\\C[0]","SetPieceFmt:str":"\\C[5]∙%1 Set Effect:\\C[0] %2","SeparatorFmt:str":"%1, %2","StateFmt:str":"%2%1","RateFmt:str":"%1:%2","AddPosFmt:str":"%1+%2","AddNegFmt:str":"%1-%2"}
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
/*~struct~EquipSet:
 *
 * @param SetName:str
 * @text Equipment Set Name
 * @desc This set's name used for databasing and in-game.
 * Register equips to sets using <Equip Set: x> notetag.
 * @default Untitled
 *
 * @param Icon:num
 * @text Icon
 * @parent SetName:str
 * @desc This is the icon used to repesent the set name.
 * Use 0 to not show an icon.
 * @default 160
 *
 * @param Bonuses
 *
 * @param Piece1:struct
 * @text 1 Piece Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece2:struct
 * @text 2 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece3:struct
 * @text 3 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece4:struct
 * @text 4 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece5:struct
 * @text 5 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece6:struct
 * @text 6 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece7:struct
 * @text 7 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece8:struct
 * @text 8 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece9:struct
 * @text 9 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece10:struct
 * @text 10 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece11:struct
 * @text 11 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece12:struct
 * @text 12 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece13:struct
 * @text 13 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece14:struct
 * @text 14 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece15:struct
 * @text 15 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece16:struct
 * @text 16 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece17:struct
 * @text 17 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece18:struct
 * @text 18 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece19:struct
 * @text 19 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 * @param Piece20:struct
 * @text 20 Pieces Bonus
 * @parent Bonuses
 * @type struct<EquipSetPieces>
 * @desc Bonuses applied for having this number of pieces equipped.
 * These settings stack with later bonuses in the same set.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Set Pieces Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipSetPieces:
 *
 * @param Text:str
 * @text Text
 * @desc Text that appears next to each piece in the tooltip window.
 * Use 'auto' if you want this to be done automatically.
 * @default auto
 *
 * @param ShowText:eval
 * @text Show in Tooltip?
 * @parent Text
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show this in the tooltip?
 * @default true
 * 
 * @param Bonuses
 * 
 * @param PassiveStates:arraynum
 * @text Passive States
 * @parent Bonuses
 * @type state[]
 * @desc States that will be given out as passives when the
 * required piece count is equipped.
 * @default []
 *
 * @param Param:struct
 * @text Basic Parameters
 * @parent Bonuses
 * @type struct<Param>
 * @desc Bonuses applied to the Basic Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param XParam:struct
 * @text X Parameters
 * @parent Bonuses
 * @type struct<XParam>
 * @desc Bonuses applied to the X Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 * @param SParam:struct
 * @text S Parameters
 * @parent Bonuses
 * @type struct<SParam>
 * @desc Bonuses applied to the S Parameters when the
 * required piece count is equipped.
 * @default {}
 *
 */
/* ----------------------------------------------------------------------------
 * Param Bonuses Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param MaxHP
 * @default Maximum Hit Points
 *
 * @param Rate0:num
 * @text Rate
 * @parent MaxHP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent MaxHP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MaxMP
 * @default Maximum Magic Points
 *
 * @param Rate1:num
 * @text Rate
 * @parent MaxMP
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent MaxMP
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param ATK
 * @default Attack
 *
 * @param Rate2:num
 * @text Rate
 * @parent ATK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent ATK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param DEF
 * @default Defense
 *
 * @param Rate3:num
 * @text Rate
 * @parent DEF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent DEF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MAT
 * @default Magic Attack
 *
 * @param Rate4:num
 * @text Rate
 * @parent MAT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MAT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param MDF
 * @default Magic Defense
 *
 * @param Rate5:num
 * @text Rate
 * @parent MDF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MDF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param AGI
 * @default Agility
 *
 * @param Rate6:num
 * @text Rate
 * @parent AGI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent AGI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 * @param LUK
 * @default Luck
 *
 * @param Rate7:num
 * @text Rate
 * @parent LUK
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent LUK
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0 is +0.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * X Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~XParam:
 *
 * @param HIT
 * @default Hit Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent HIT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent HIT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EVA
 * @default Evasion Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent EVA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent EVA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CRI
 * @default Critical Hit
 *
 * @param Rate2:num
 * @text Rate
 * @parent CRI
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent CRI
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CEV
 * @default Critical Evasion
 *
 * @param Rate3:num
 * @text Rate
 * @parent CEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent CEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MEV
 * @default Magic Evasion
 *
 * @param Rate4:num
 * @text Rate
 * @parent MEV
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MEV
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRF
 * @default Magic Reflect
 *
 * @param Rate5:num
 * @text Rate
 * @parent MRF
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent MRF
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param CNT
 * @default Counter Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent CNT
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent CNT
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param HRG
 * @default HP Regen Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent HRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent HRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MRG
 * @default Magic Regen Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent MRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent MRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TRG
 * @default TP Regen Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent TRG
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent TRG
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * S Param Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SParam:
 *
 * @param TGR
 * @default Target Rate
 *
 * @param Rate0:num
 * @text Rate
 * @parent TGR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus0:num
 * @text Add
 * @parent TGR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param GRD
 * @default Guard Rate
 *
 * @param Rate1:num
 * @text Rate
 * @parent GRD
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus1:num
 * @text Add
 * @parent GRD
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param REC
 * @default Recovery Rate
 *
 * @param Rate2:num
 * @text Rate
 * @parent REC
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus2:num
 * @text Add
 * @parent REC
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PHA
 * @default Pharmacology Rate
 *
 * @param Rate3:num
 * @text Rate
 * @parent PHA
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus3:num
 * @text Add
 * @parent PHA
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MCR
 * @default MP Cost Rate
 *
 * @param Rate4:num
 * @text Rate
 * @parent MCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus4:num
 * @text Add
 * @parent MCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param TCR
 * @default TP Charge Rate
 *
 * @param Rate5:num
 * @text Rate
 * @parent TCR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus5:num
 * @text Add
 * @parent TCR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param PDR
 * @default Physical Damage Rate
 *
 * @param Rate6:num
 * @text Rate
 * @parent PDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus6:num
 * @text Add
 * @parent PDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param MDR
 * @default Magical Damage Rate
 *
 * @param Rate7:num
 * @text Rate
 * @parent MDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus7:num
 * @text Add
 * @parent MDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param FDR
 * @default Floor Damage Rate
 *
 * @param Rate8:num
 * @text Rate
 * @parent FDR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus8:num
 * @text Add
 * @parent FDR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 * @param EXR
 * @default Experience Gain Rate
 *
 * @param Rate9:num
 * @text Rate
 * @parent EXR
 * @desc Multiplicative bonus for this param when the required
 * piece count is equipped. 1.0 is 100%.
 * @default 1.0
 *
 * @param Plus9:num
 * @text Add
 * @parent EXR
 * @desc Additive bonus for this param when the required piece
 * count is equipped. 0.0 is +0%.
 * @default +0.0
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param BaseParamAdd:str
 * @text Base Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param XParamAdd:str
 * @text X Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 * @param SParamAdd:str
 * @text S Parameter Add
 * @type select
 * @option Plus - Apply Before Rate
 * @value plus
 * @option Flat - Apply After Rate
 * @value flat
 * @desc When do you wish to apply the "Add" bonus parameters?
 * Typical Formula: (base + plus) * rate + flat
 * @default flat
 *
 */
/* ----------------------------------------------------------------------------
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
 *
 * @param Show:eval
 * @text Show Tooltip?
 * @parent Appearance
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show tooltips for Equipment Set Bonuses?
 * @default true
 *
 * @param Scale:num
 * @text Scale
 * @parent Appearance
 * @desc What scale size do you want for the tooltip?
 * Use 1.0 for normal size.
 * @default 0.6
 *
 * @param WindowSkin:str
 * @text Skin Filename
 * @parent Appearance
 * @type file
 * @dir img/system/
 * @desc What window skin do you want to use for the tooltip?
 * @default Window
 *
 * @param WindowOpacity:num
 * @text Skin Opacity
 * @parent Appearance
 * @type number
 * @min 0
 * @max 255
 * @desc What opacity setting is used for the tooltip?
 * Use a number between 0 and 255.
 * @default 240
 *
 * @param Offset
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Offset
 * @desc Offset the tooltip X position from the mouse?
 * Negative: left. Positive: right.
 * @default +24
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down. Inversed when low on screen.
 * @default +40
 *
 * @param Vocabulary
 *
 * @param SetTitleFmt:str
 * @text Set Title Format
 * @parent Vocabulary
 * @desc How does the set title appear?
 * %1 - Set Name, %2 - Icon
 * @default %2\C[5]%1 Set Bonuses\C[0]
 *
 * @param SetPieceFmt:str
 * @text Set Piece Format
 * @parent Vocabulary
 * @desc How do the set pieces appear?
 * %1 - Set Name, %2 - Effects
 * @default \C[5]∙%1 Set Effect:\C[0] %2
 *
 * @param SeparatorFmt:str
 * @text Separator Format
 * @parent Vocabulary
 * @desc How do you wish to separate effects?
 * %1 - Previous Effect, %2 - Next Effect
 * @default %1, %2
 *
 * @param StateFmt:str
 * @text Passive State Format
 * @parent Vocabulary
 * @desc How are passive state effects displayed?
 * %1 - State Name, %2 - Icon
 * @default %2%1
 *
 * @param RateFmt:str
 * @text Param Rate Format
 * @parent Vocabulary
 * @desc How are Parameter Rate effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1:%2
 *
 * @param AddPosFmt:str
 * @text Add(+) Format
 * @parent Vocabulary
 * @desc How are positive Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1+%2
 *
 * @param AddNegFmt:str
 * @text Add(-) Format
 * @parent Vocabulary
 * @desc How are negative Parameter Add effects displayed?
 * %1 - Param Name, %2 - Effect
 * @default %1-%2
 *
 */
//=============================================================================

const _0x3ea766=_0x26cc;(function(_0x3b4714,_0x3df2eb){const _0x10617c=_0x26cc,_0x42e07=_0x3b4714();while(!![]){try{const _0x5bfd16=parseInt(_0x10617c(0x17d))/0x1*(parseInt(_0x10617c(0x143))/0x2)+parseInt(_0x10617c(0x13c))/0x3+-parseInt(_0x10617c(0x29c))/0x4+-parseInt(_0x10617c(0x16c))/0x5+parseInt(_0x10617c(0x1ca))/0x6+parseInt(_0x10617c(0x287))/0x7*(parseInt(_0x10617c(0x204))/0x8)+parseInt(_0x10617c(0x1c7))/0x9*(-parseInt(_0x10617c(0x21f))/0xa);if(_0x5bfd16===_0x3df2eb)break;else _0x42e07['push'](_0x42e07['shift']());}catch(_0x3d3f4c){_0x42e07['push'](_0x42e07['shift']());}}}(_0xce24,0xc49e1));function _0x26cc(_0x4a13ac,_0x284fbb){const _0xce24da=_0xce24();return _0x26cc=function(_0x26ccd9,_0x437481){_0x26ccd9=_0x26ccd9-0x13b;let _0x3bd2b6=_0xce24da[_0x26ccd9];return _0x3bd2b6;},_0x26cc(_0x4a13ac,_0x284fbb);}var label=_0x3ea766(0x229),tier=tier||0x0,dependencies=[_0x3ea766(0x20d),_0x3ea766(0x1b0),'VisuMZ_1_SkillsStatesCore'],pluginData=$plugins[_0x3ea766(0x1bf)](function(_0x131980){const _0x1ddd46=_0x3ea766;return _0x131980[_0x1ddd46(0x14f)]&&_0x131980[_0x1ddd46(0x288)][_0x1ddd46(0x265)]('['+label+']');})[0x0];VisuMZ[label][_0x3ea766(0x285)]=VisuMZ[label]['Settings']||{},VisuMZ[_0x3ea766(0x169)]=function(_0x1413ce,_0x6328b2){const _0x3556fb=_0x3ea766;for(const _0x550974 in _0x6328b2){if(_0x3556fb(0x255)==='xMSen'){if(_0x550974['match'](/(.*):(.*)/i)){const _0x23476b=String(RegExp['$1']),_0x2d439e=String(RegExp['$2'])[_0x3556fb(0x232)]()[_0x3556fb(0x24c)]();let _0x10146e,_0x4a84b9,_0xa0a7a7;switch(_0x2d439e){case _0x3556fb(0x23d):_0x10146e=_0x6328b2[_0x550974]!==''?Number(_0x6328b2[_0x550974]):0x0;break;case'ARRAYNUM':_0x4a84b9=_0x6328b2[_0x550974]!==''?JSON[_0x3556fb(0x245)](_0x6328b2[_0x550974]):[],_0x10146e=_0x4a84b9[_0x3556fb(0x1b2)](_0x1e52e3=>Number(_0x1e52e3));break;case'EVAL':_0x10146e=_0x6328b2[_0x550974]!==''?eval(_0x6328b2[_0x550974]):null;break;case _0x3556fb(0x13e):_0x4a84b9=_0x6328b2[_0x550974]!==''?JSON[_0x3556fb(0x245)](_0x6328b2[_0x550974]):[],_0x10146e=_0x4a84b9[_0x3556fb(0x1b2)](_0x293a00=>eval(_0x293a00));break;case _0x3556fb(0x18a):_0x10146e=_0x6328b2[_0x550974]!==''?JSON[_0x3556fb(0x245)](_0x6328b2[_0x550974]):'';break;case _0x3556fb(0x2a2):_0x4a84b9=_0x6328b2[_0x550974]!==''?JSON[_0x3556fb(0x245)](_0x6328b2[_0x550974]):[],_0x10146e=_0x4a84b9[_0x3556fb(0x1b2)](_0x4cfb0e=>JSON[_0x3556fb(0x245)](_0x4cfb0e));break;case _0x3556fb(0x1cd):_0x10146e=_0x6328b2[_0x550974]!==''?new Function(JSON[_0x3556fb(0x245)](_0x6328b2[_0x550974])):new Function('return\x200');break;case'ARRAYFUNC':_0x4a84b9=_0x6328b2[_0x550974]!==''?JSON[_0x3556fb(0x245)](_0x6328b2[_0x550974]):[],_0x10146e=_0x4a84b9[_0x3556fb(0x1b2)](_0x5cd5dc=>new Function(JSON[_0x3556fb(0x245)](_0x5cd5dc)));break;case _0x3556fb(0x168):_0x10146e=_0x6328b2[_0x550974]!==''?String(_0x6328b2[_0x550974]):'';break;case _0x3556fb(0x17f):_0x4a84b9=_0x6328b2[_0x550974]!==''?JSON['parse'](_0x6328b2[_0x550974]):[],_0x10146e=_0x4a84b9[_0x3556fb(0x1b2)](_0x14249a=>String(_0x14249a));break;case _0x3556fb(0x1c6):_0xa0a7a7=_0x6328b2[_0x550974]!==''?JSON['parse'](_0x6328b2[_0x550974]):{},_0x10146e=VisuMZ['ConvertParams']({},_0xa0a7a7);break;case _0x3556fb(0x216):_0x4a84b9=_0x6328b2[_0x550974]!==''?JSON[_0x3556fb(0x245)](_0x6328b2[_0x550974]):[],_0x10146e=_0x4a84b9['map'](_0x1969b0=>VisuMZ['ConvertParams']({},JSON[_0x3556fb(0x245)](_0x1969b0)));break;default:continue;}_0x1413ce[_0x23476b]=_0x10146e;}}else{if(this[_0x3556fb(0x1bd)]!==_0x3df81d)return this['_priorityBattlePortrait'];const _0x53be02=this[_0x3556fb(0x146)]();for(const _0x39989c of _0x53be02){const _0x3a5de9=this[_0x3556fb(0x26b)](_0x39989c),_0x38e2ea=_0x4fe607[_0x3556fb(0x194)](this,_0x39989c,_0x3a5de9);if(_0x38e2ea)return _0x38e2ea;}return _0x2c3996[_0x3556fb(0x229)]['Game_Actor_getBattlePortraitFilename'][_0x3556fb(0x19e)](this);;}}return _0x1413ce;},(_0x1a5cc1=>{const _0x240249=_0x3ea766,_0x25d165=_0x1a5cc1['name'];for(const _0x5d6f29 of dependencies){if(!Imported[_0x5d6f29]){alert(_0x240249(0x214)[_0x240249(0x173)](_0x25d165,_0x5d6f29)),SceneManager[_0x240249(0x220)]();break;}}const _0x36c426=_0x1a5cc1['description'];if(_0x36c426['match'](/\[Version[ ](.*?)\]/i)){if(_0x240249(0x281)!==_0x240249(0x281))for(const _0x5b1381 of _0x407df8){_0x5b1381[_0x240249(0x218)](_0x1c7406['Set']);const _0x4f42db=_0x427f0c(_0x2c5bb6['$1'])[_0x240249(0x232)]()[_0x240249(0x24c)]();!!_0x293cbc['getEquipSetData'](_0x4f42db)&&_0x15991a[_0x240249(0x1ef)](_0x4f42db);}else{const _0x5e6470=Number(RegExp['$1']);_0x5e6470!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x25d165,_0x5e6470)),SceneManager[_0x240249(0x220)]());}}if(_0x36c426[_0x240249(0x218)](/\[Tier[ ](\d+)\]/i)){const _0x96f561=Number(RegExp['$1']);if(_0x96f561<tier){if(_0x240249(0x243)===_0x240249(0x243))alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x240249(0x173)](_0x25d165,_0x96f561,tier)),SceneManager[_0x240249(0x220)]();else{if(!_0x84f491||!_0x50e5c1||!_0x254dc4)return'';const _0x4c7f74=_0x240249(0x21d)[_0x240249(0x173)](_0x54818a[_0x240249(0x256)](),_0x17f8f2[_0x240249(0x232)]()['trim'](),_0x24dab3);return _0x4c58e4['actorEquipSetBattlerName'][_0x4c7f74]||'';}}else _0x240249(0x1d1)===_0x240249(0x1d1)?tier=Math[_0x240249(0x1eb)](_0x96f561,tier):this[_0x240249(0x237)]['hide']();}VisuMZ[_0x240249(0x169)](VisuMZ[label]['Settings'],_0x1a5cc1[_0x240249(0x2a4)]);})(pluginData),VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x171)]={'Set':/<(?:EQUIP|EQUIPMENT) SET:[ ](.*)>/gi,'SetFaceName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetFaceNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]FACE:[ ](.*),[ ](\d+)>/gi,'SetCharaName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetCharaNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:CHARACTER|CHARA|SPRITE):[ ](.*),[ ](\d+)>/gi,'SetBattlerName':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNamePlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetBattlerNameRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ](?:BATTLER|SV_ACTOR|SV ACTOR|SVACTOR):[ ](.*)>/gi,'SetMenuPortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetMenuPortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]MENU (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortrait':/<(.*)[ ]SET,[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitPlus':/<(.*)[ ]SET,[ ](\d+)\+[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi,'SetBattlePortraitRange':/<(.*)[ ]SET,[ ](\d+)[ ]TO[ ](\d+)[ ](?:PIECE|PIECES)[ ]BATTLE (?:PORTRAIT|IMAGE):[ ](.*)>/gi},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x180)]=Scene_Boot[_0x3ea766(0x1dc)][_0x3ea766(0x20c)],Scene_Boot[_0x3ea766(0x1dc)][_0x3ea766(0x20c)]=function(){const _0x1e9a83=_0x3ea766;VisuMZ['EquipSetBonuses'][_0x1e9a83(0x180)][_0x1e9a83(0x19e)](this),this[_0x1e9a83(0x15a)]();},Scene_Boot[_0x3ea766(0x1dc)][_0x3ea766(0x15a)]=function(){const _0x204f2a=_0x3ea766;if(VisuMZ[_0x204f2a(0x27f)])return;for(const _0x15f3f1 of $dataActors){if(!_0x15f3f1)continue;ImageManager[_0x204f2a(0x236)](_0x15f3f1);}},VisuMZ[_0x3ea766(0x229)]['ParseActorNotetags']=VisuMZ[_0x3ea766(0x273)],VisuMZ[_0x3ea766(0x273)]=function(_0x32f761){const _0x4f149b=_0x3ea766;VisuMZ[_0x4f149b(0x229)][_0x4f149b(0x273)][_0x4f149b(0x19e)](this,_0x32f761),ImageManager[_0x4f149b(0x236)](_0x32f761);},DataManager[_0x3ea766(0x17b)]=function(_0x36a572){const _0x2700b5=_0x3ea766;if(this[_0x2700b5(0x267)](_0x36a572)){this['_weaponEquipSets']=this[_0x2700b5(0x290)]||{};if(!this[_0x2700b5(0x290)][_0x36a572['id']]){if('gKTQF'!==_0x2700b5(0x18d))this[_0x2700b5(0x290)][_0x36a572['id']]=VisuMZ[_0x2700b5(0x229)][_0x2700b5(0x28e)](_0x36a572);else{this[_0x2700b5(0x1af)]['clear'](),this[_0x2700b5(0x297)]();if(this['_text']['length']>0x0){this[_0x2700b5(0x26e)]();const _0x11a612=this[_0x2700b5(0x19f)]();this[_0x2700b5(0x1c2)](),this['changePaintOpacity'](this[_0x2700b5(0x1f8)]['shift']()),this['drawTextEx'](this[_0x2700b5(0x259)],_0x11a612['x'],_0x11a612['y'],_0x11a612[_0x2700b5(0x167)]),this[_0x2700b5(0x209)]();}else this[_0x2700b5(0x219)]();}}return this['_weaponEquipSets'][_0x36a572['id']];}else return this[_0x2700b5(0x18c)](_0x36a572)?(this[_0x2700b5(0x242)]=this[_0x2700b5(0x242)]||{},!this['_armorEquipSets'][_0x36a572['id']]&&(this[_0x2700b5(0x242)][_0x36a572['id']]=VisuMZ[_0x2700b5(0x229)]['ParseEquipSets'](_0x36a572)),this[_0x2700b5(0x242)][_0x36a572['id']]):[];},VisuMZ['EquipSetBonuses']['ParseEquipSets']=function(_0x3e08ed){const _0x10da10=_0x3ea766,_0x12e0ce=VisuMZ[_0x10da10(0x229)]['RegExp'],_0x223b31=_0x3e08ed['note'],_0x4e5fde=[],_0x5eafbf=_0x223b31['match'](_0x12e0ce[_0x10da10(0x1db)]);if(_0x5eafbf)for(const _0x596c92 of _0x5eafbf){_0x596c92[_0x10da10(0x218)](_0x12e0ce[_0x10da10(0x1db)]);const _0x3b2856=String(RegExp['$1'])[_0x10da10(0x232)]()[_0x10da10(0x24c)]();!!DataManager[_0x10da10(0x250)](_0x3b2856)&&_0x4e5fde[_0x10da10(0x1ef)](_0x3b2856);}return _0x4e5fde;},DataManager[_0x3ea766(0x250)]=function(_0x28d07a){const _0x1f7539=_0x3ea766;_0x28d07a=_0x28d07a[_0x1f7539(0x232)]()['trim']();if(this[_0x1f7539(0x252)]===undefined){this[_0x1f7539(0x252)]={};const _0x122531=VisuMZ[_0x1f7539(0x229)][_0x1f7539(0x285)][_0x1f7539(0x1b6)];for(const _0x223e4d of _0x122531){const _0x513abc=_0x223e4d[_0x1f7539(0x148)][_0x1f7539(0x232)]()['trim']();if(_0x513abc==='')continue;if(_0x513abc==='UNTITLED')continue;this[_0x1f7539(0x252)][_0x513abc]=_0x223e4d;}}return this[_0x1f7539(0x252)][_0x28d07a]||null;},ImageManager['actorEquipSetFaceName']={},ImageManager[_0x3ea766(0x1c9)]={},ImageManager[_0x3ea766(0x13b)]={},ImageManager[_0x3ea766(0x248)]={},ImageManager[_0x3ea766(0x21c)]={},ImageManager[_0x3ea766(0x1a3)]={},ImageManager['actorEquipSetBattlePortrait']={},ImageManager[_0x3ea766(0x236)]=function(_0x407d24){const _0x1432dc=_0x3ea766;if(!_0x407d24)return;const _0xee6ed6=VisuMZ[_0x1432dc(0x229)][_0x1432dc(0x171)],_0x579dab=_0x407d24[_0x1432dc(0x246)],_0x13d309=_0x407d24['id'],_0x5321a3=_0x579dab[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x1be)]);if(_0x5321a3){if(_0x1432dc(0x278)!=='MqDre')for(const _0x34f32f of _0x5321a3){if(_0x1432dc(0x188)!==_0x1432dc(0x24e)){if(!_0x34f32f)continue;_0x34f32f[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x1be)]);const _0x3b102a=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x239797=Number(RegExp['$2'])||0x1,_0xa84d0f=String(RegExp['$3'])[_0x1432dc(0x24c)](),_0x2e69f3=Number(RegExp['$4']);if(!DataManager[_0x1432dc(0x250)](_0x3b102a))continue;const _0x6745fa=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x3b102a,_0x239797);ImageManager[_0x1432dc(0x1ab)][_0x6745fa]=_0xa84d0f,ImageManager[_0x1432dc(0x1c9)][_0x6745fa]=_0x2e69f3;}else _0x57aa54[_0x1432dc(0x229)][_0x1432dc(0x238)][_0x1432dc(0x19e)](this),this[_0x1432dc(0x257)]();}else{if(this['_priorityBattlerName']!==_0x51e2a6)return this[_0x1432dc(0x1f7)];const _0x166ed7=this[_0x1432dc(0x146)]();for(const _0x2db94c of _0x166ed7){const _0x13841d=this[_0x1432dc(0x26b)](_0x2db94c),_0x677c79=_0x2a1ee2[_0x1432dc(0x162)](this,_0x2db94c,_0x13841d);if(_0x677c79)return _0x677c79;}return _0x593ab4[_0x1432dc(0x229)][_0x1432dc(0x25d)][_0x1432dc(0x19e)](this);;}}const _0x231408=_0x579dab['match'](_0xee6ed6['SetFaceNamePlus']);if(_0x231408)for(const _0x1effe4 of _0x231408){if(!_0x1effe4)continue;_0x1effe4[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x172)]);const _0x2d19c4=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x2fe986=Number(RegExp['$2'])||0x1,_0x4629a3=0x14,_0x552d66=String(RegExp['$3'])[_0x1432dc(0x24c)](),_0x1411c7=Number(RegExp['$4']);if(!DataManager[_0x1432dc(0x250)](_0x2d19c4))continue;for(let _0x36c5a2=_0x2fe986;_0x36c5a2<=_0x4629a3;_0x36c5a2++){if(_0x1432dc(0x149)==='ACyrb'){const _0x42e8d1=_0x1432dc(0x21d)['format'](_0x13d309,_0x2d19c4,_0x36c5a2);ImageManager[_0x1432dc(0x1ab)][_0x42e8d1]=_0x552d66,ImageManager[_0x1432dc(0x1c9)][_0x42e8d1]=_0x1411c7;}else this[_0x1432dc(0x1f7)]=_0x595a38;}}const _0x5dfcc9=_0x579dab['match'](_0xee6ed6[_0x1432dc(0x179)]);if(_0x5dfcc9)for(const _0x2eb362 of _0x5dfcc9){if(_0x1432dc(0x22c)==='BecUf'){const _0x363f14=_0x4182bd(_0x109bd4['$1']);_0x363f14<_0x4e8b10?(_0x2c600d('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x1432dc(0x173)](_0x25b403,_0x363f14,_0x46b53f)),_0xfcd9b6[_0x1432dc(0x220)]()):_0xec7032=_0x216e79['max'](_0x363f14,_0x59cceb);}else{if(!_0x2eb362)continue;_0x2eb362[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x179)]);const _0x582923=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x556c1a=Number(RegExp['$2'])||0x1,_0x38ae97=Number(RegExp['$3'])||0x1,_0x1d56d1=String(RegExp['$4'])[_0x1432dc(0x24c)](),_0x3f06de=Number(RegExp['$5']);if(!DataManager[_0x1432dc(0x250)](_0x582923))continue;for(let _0x24f765=_0x556c1a;_0x24f765<=_0x38ae97;_0x24f765++){const _0x40a552=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x582923,_0x24f765);ImageManager['actorEquipSetFaceName'][_0x40a552]=_0x1d56d1,ImageManager[_0x1432dc(0x1c9)][_0x40a552]=_0x3f06de;}}}const _0x54de5a=_0x579dab[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x20e)]);if(_0x54de5a)for(const _0x4c6b3e of _0x54de5a){if('cNZZw'===_0x1432dc(0x28c)){if(!_0x4bc7b3)return;const _0x372f4d=_0x4f7a8f[_0x1432dc(0x148)],_0x3040f1=_0x22921e['Icon']?_0x1432dc(0x299)[_0x1432dc(0x173)](_0x49f162[_0x1432dc(0x261)]):'';this['_text']+=_0x333647['equipSetTitleFmt'][_0x1432dc(0x173)](_0x372f4d,_0x3040f1)+'\x0a',this['_lineOpacity']['push'](!![]);for(let _0x246018=0x1;_0x246018<=0x14;_0x246018++){const _0x22b741=_0x18a8c8[_0x1432dc(0x283)[_0x1432dc(0x173)](_0x246018)];this[_0x1432dc(0x166)](_0x2546f6,_0x22b741,_0x246018);}}else{if(!_0x4c6b3e)continue;_0x4c6b3e[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x20e)]);const _0x3fc22d=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x2bdb6b=Number(RegExp['$2'])||0x1,_0x1efbde=String(RegExp['$3'])[_0x1432dc(0x24c)](),_0x3e7cfc=Number(RegExp['$4']);if(!DataManager[_0x1432dc(0x250)](_0x3fc22d))continue;const _0x52499e='Actor-%1-SetName-%2-Pieces-%3'[_0x1432dc(0x173)](_0x13d309,_0x3fc22d,_0x2bdb6b);ImageManager[_0x1432dc(0x13b)][_0x52499e]=_0x1efbde,ImageManager['actorEquipSetCharacterIndex'][_0x52499e]=_0x3e7cfc;}}const _0x11dad7=_0x579dab[_0x1432dc(0x218)](_0xee6ed6['SetCharaNamePlus']);if(_0x11dad7)for(const _0x15b025 of _0x11dad7){if(!_0x15b025)continue;_0x15b025[_0x1432dc(0x218)](_0xee6ed6['SetCharaNamePlus']);const _0x2541c4=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x1ce740=Number(RegExp['$2'])||0x1,_0xbbe98f=0x14,_0x5b800c=String(RegExp['$3'])['trim'](),_0x539402=Number(RegExp['$4']);if(!DataManager[_0x1432dc(0x250)](_0x2541c4))continue;for(let _0x48d864=_0x1ce740;_0x48d864<=_0xbbe98f;_0x48d864++){if(_0x1432dc(0x28d)==='URZAt')_0x19aacb=_0x1548ce[_0x1432dc(0x1f2)];else{const _0x5154e0=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x2541c4,_0x48d864);ImageManager['actorEquipSetCharacterName'][_0x5154e0]=_0x5b800c,ImageManager[_0x1432dc(0x248)][_0x5154e0]=_0x539402;}}}const _0x3707ab=_0x579dab['match'](_0xee6ed6[_0x1432dc(0x1c4)]);if(_0x3707ab){if('Egvsv'!=='Egvsv')_0x3474e8=_0x5bfb04['max'](_0xd44b0,_0x559f55);else for(const _0xb49ae0 of _0x3707ab){if(!_0xb49ae0)continue;_0xb49ae0[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x1c4)]);const _0x31f7ea=String(RegExp['$1'])[_0x1432dc(0x232)]()['trim'](),_0x918e41=Number(RegExp['$2'])||0x1,_0x223d29=Number(RegExp['$3'])||0x1,_0x228f13=String(RegExp['$4'])[_0x1432dc(0x24c)](),_0x140f90=Number(RegExp['$5']);if(!DataManager['getEquipSetData'](_0x31f7ea))continue;for(let _0x53b099=_0x918e41;_0x53b099<=_0x223d29;_0x53b099++){const _0x3d7aff=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x31f7ea,_0x53b099);ImageManager[_0x1432dc(0x13b)][_0x3d7aff]=_0x228f13,ImageManager[_0x1432dc(0x248)][_0x3d7aff]=_0x140f90;}}}const _0x20b2b9=_0x579dab[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x13f)]);if(_0x20b2b9)for(const _0x2071a9 of _0x20b2b9){if(!_0x2071a9)continue;_0x2071a9['match'](_0xee6ed6['SetBattlerName']);const _0x31116d=String(RegExp['$1'])[_0x1432dc(0x232)]()['trim'](),_0x34c767=Number(RegExp['$2'])||0x1,_0x4afa39=String(RegExp['$3'])[_0x1432dc(0x24c)]();if(!DataManager[_0x1432dc(0x250)](_0x31116d))continue;const _0x37e670=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x31116d,_0x34c767);ImageManager[_0x1432dc(0x21c)][_0x37e670]=_0x4afa39;}const _0x52eb05=_0x579dab[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x1d9)]);if(_0x52eb05){if(_0x1432dc(0x1a7)!==_0x1432dc(0x15c))for(const _0x153d3f of _0x52eb05){if(!_0x153d3f)continue;_0x153d3f[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x1d9)]);const _0x307a8d=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x19d44e=Number(RegExp['$2'])||0x1,_0x4469bb=0x14,_0x227e11=String(RegExp['$3'])['trim']();if(!DataManager[_0x1432dc(0x250)](_0x307a8d))continue;for(let _0x59d91a=_0x19d44e;_0x59d91a<=_0x4469bb;_0x59d91a++){const _0x38220c='Actor-%1-SetName-%2-Pieces-%3'[_0x1432dc(0x173)](_0x13d309,_0x307a8d,_0x59d91a);ImageManager[_0x1432dc(0x21c)][_0x38220c]=_0x227e11;}}else{let _0x2e0478=_0x296f25[_0x1432dc(0x229)][_0x1432dc(0x233)][_0x1432dc(0x19e)](this,_0x60ffca);return _0x835523[_0x1432dc(0x1c3)]===_0x1432dc(0x298)&&(_0x2e0478+=this[_0x1432dc(0x1a0)](_0x1432dc(0x15b),_0x30d79e)),_0x2e0478;}}const _0x557f63=_0x579dab['match'](_0xee6ed6['SetBattlerNameRange']);if(_0x557f63)for(const _0x373ffc of _0x557f63){if(!_0x373ffc)continue;_0x373ffc['match'](_0xee6ed6['SetBattlerNameRange']);const _0x476bd2=String(RegExp['$1'])[_0x1432dc(0x232)]()['trim'](),_0x494f3e=Number(RegExp['$2'])||0x1,_0xa587f8=Number(RegExp['$3'])||0x1,_0x5267a8=String(RegExp['$4'])[_0x1432dc(0x24c)]();if(!DataManager[_0x1432dc(0x250)](_0x476bd2))continue;for(let _0x202975=_0x494f3e;_0x202975<=_0xa587f8;_0x202975++){if('pOBYr'===_0x1432dc(0x292))this[_0x1432dc(0x1ea)]=!![];else{const _0x2fcaec=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x476bd2,_0x202975);ImageManager[_0x1432dc(0x21c)][_0x2fcaec]=_0x5267a8;}}}const _0x21c3bb=_0x579dab[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x296)]);if(_0x21c3bb)for(const _0x3ea7cb of _0x21c3bb){if(!_0x3ea7cb)continue;_0x3ea7cb[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x296)]);const _0x530ab8=String(RegExp['$1'])[_0x1432dc(0x232)]()['trim'](),_0x49afe4=Number(RegExp['$2'])||0x1,_0x3b1c8a=String(RegExp['$3'])[_0x1432dc(0x24c)]();if(!DataManager['getEquipSetData'](_0x530ab8))continue;const _0x343ffa=_0x1432dc(0x21d)['format'](_0x13d309,_0x530ab8,_0x49afe4);ImageManager[_0x1432dc(0x1a3)][_0x343ffa]=_0x3b1c8a;}const _0x25c56b=_0x579dab[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x20f)]);if(_0x25c56b)for(const _0x3a9f5a of _0x25c56b){if(!_0x3a9f5a)continue;_0x3a9f5a[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x20f)]);const _0x497d1e=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x31fe25=Number(RegExp['$2'])||0x1,_0x2b0ccf=0x14,_0x5134e5=String(RegExp['$3'])['trim']();if(!DataManager[_0x1432dc(0x250)](_0x497d1e))continue;for(let _0x5480c3=_0x31fe25;_0x5480c3<=_0x2b0ccf;_0x5480c3++){const _0x2baed2=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x497d1e,_0x5480c3);ImageManager[_0x1432dc(0x1a3)][_0x2baed2]=_0x5134e5;}}const _0x55f649=_0x579dab[_0x1432dc(0x218)](_0xee6ed6['SetMenuPortraitRange']);if(_0x55f649)for(const _0x1fd6aa of _0x55f649){if(!_0x1fd6aa)continue;_0x1fd6aa[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x1b8)]);const _0x2f1ca9=String(RegExp['$1'])[_0x1432dc(0x232)]()['trim'](),_0x3eaeab=Number(RegExp['$2'])||0x1,_0x525efc=Number(RegExp['$3'])||0x1,_0x2bb81b=String(RegExp['$4'])[_0x1432dc(0x24c)]();if(!DataManager['getEquipSetData'](_0x2f1ca9))continue;for(let _0x45b9ba=_0x3eaeab;_0x45b9ba<=_0x525efc;_0x45b9ba++){if(_0x1432dc(0x1cb)===_0x1432dc(0x1cb)){const _0x33db4b='Actor-%1-SetName-%2-Pieces-%3'[_0x1432dc(0x173)](_0x13d309,_0x2f1ca9,_0x45b9ba);ImageManager[_0x1432dc(0x1a3)][_0x33db4b]=_0x2bb81b;}else{const _0x4c1215=_0x1432dc(0x283)[_0x1432dc(0x173)](_0x217b8b);if(_0x1ec06c[_0x4c1215]&&_0x3c36a8[_0x4c1215][_0x2cf10f]){const _0x4b6d53=_0x1432dc(0x1c8)[_0x1432dc(0x173)](_0x56bbff);_0x3c72bd*=_0x1ca4fe[_0x1432dc(0x1b7)](_0x190bcb[_0x4c1215][_0x1814fc][_0x4b6d53]||0x1);}}}}const _0x2f5402=_0x579dab[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x21b)]);if(_0x2f5402)for(const _0x49ceae of _0x2f5402){if(_0x1432dc(0x19c)===_0x1432dc(0x19c)){if(!_0x49ceae)continue;_0x49ceae[_0x1432dc(0x218)](_0xee6ed6[_0x1432dc(0x21b)]);const _0x3902b3=String(RegExp['$1'])[_0x1432dc(0x232)]()['trim'](),_0x2ba7e1=Number(RegExp['$2'])||0x1,_0x421a52=String(RegExp['$3'])[_0x1432dc(0x24c)]();if(!DataManager[_0x1432dc(0x250)](_0x3902b3))continue;const _0x39f389=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x3902b3,_0x2ba7e1);ImageManager[_0x1432dc(0x211)][_0x39f389]=_0x421a52;}else{const _0x1cea2b='Actor-%1-SetName-%2-Pieces-%3'[_0x1432dc(0x173)](_0x51e6dd,_0x45fd6b,_0xd8c46);_0x344a08['actorEquipSetBattlePortrait'][_0x1cea2b]=_0x44692c;}}const _0x36d15f=_0x579dab[_0x1432dc(0x218)](_0xee6ed6['SetBattlePortrait']);if(_0x36d15f)for(const _0x33f05b of _0x36d15f){if(_0x1432dc(0x22a)==='TtIFA'){const _0x2a7bb6=this[_0x1432dc(0x26b)](_0x324327),_0x7a5697=_0x56bca0[_0x1432dc(0x1df)](this,_0x388fff,_0x2a7bb6);if(_0x7a5697)return _0x7a5697;}else{if(!_0x33f05b)continue;_0x33f05b[_0x1432dc(0x218)](_0xee6ed6['SetBattlePortrait']);const _0x39eb09=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x4fd1ae=Number(RegExp['$2'])||0x1,_0x1e7a3f=0x14,_0x382b5f=String(RegExp['$3'])[_0x1432dc(0x24c)]();if(!DataManager[_0x1432dc(0x250)](_0x39eb09))continue;for(let _0x417cd8=_0x4fd1ae;_0x417cd8<=_0x1e7a3f;_0x417cd8++){if(_0x1432dc(0x1d7)===_0x1432dc(0x14d))this[_0x1432dc(0x259)]+=_0x2a2bfe[_0x1432dc(0x1b4)][_0x1432dc(0x173)](_0x4b20e5,_0x274287)+'\x0a',this[_0x1432dc(0x294)](_0x7565dd,_0xfe5f74);else{const _0x1cc10a=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x39eb09,_0x417cd8);ImageManager[_0x1432dc(0x211)][_0x1cc10a]=_0x382b5f;}}}}const _0x41e307=_0x579dab[_0x1432dc(0x218)](_0xee6ed6['SetBattlePortraitRange']);if(_0x41e307){if(_0x1432dc(0x240)===_0x1432dc(0x27d))this[_0x1432dc(0x1f7)]=_0x598edc;else for(const _0x406418 of _0x41e307){if(!_0x406418)continue;_0x406418['match'](_0xee6ed6['SetBattlePortraitRange']);const _0x5568b8=String(RegExp['$1'])[_0x1432dc(0x232)]()[_0x1432dc(0x24c)](),_0x1066b6=Number(RegExp['$2'])||0x1,_0xdc04d8=Number(RegExp['$3'])||0x1,_0x5e8989=String(RegExp['$4'])[_0x1432dc(0x24c)]();if(!DataManager['getEquipSetData'](_0x5568b8))continue;for(let _0xa49330=_0x1066b6;_0xa49330<=_0xdc04d8;_0xa49330++){const _0x2bfe0e=_0x1432dc(0x21d)[_0x1432dc(0x173)](_0x13d309,_0x5568b8,_0xa49330);ImageManager[_0x1432dc(0x211)][_0x2bfe0e]=_0x5e8989;}}}},ImageManager[_0x3ea766(0x16a)]=function(_0x50a4af,_0x3af1f7,_0x2125f3){const _0x4d0b5b=_0x3ea766;if(!_0x50a4af||!_0x3af1f7||!_0x2125f3)return'';const _0x9dc3b1=_0x4d0b5b(0x21d)[_0x4d0b5b(0x173)](_0x50a4af[_0x4d0b5b(0x256)](),_0x3af1f7['toUpperCase']()[_0x4d0b5b(0x24c)](),_0x2125f3);return ImageManager[_0x4d0b5b(0x1ab)][_0x9dc3b1]||'';},ImageManager[_0x3ea766(0x251)]=function(_0x59a910,_0x3fc251,_0x38b353){const _0x5a7ccf=_0x3ea766;if(!_0x59a910||!_0x3fc251||!_0x38b353)return undefined;const _0x28c2f2=_0x5a7ccf(0x21d)['format'](_0x59a910[_0x5a7ccf(0x256)](),_0x3fc251[_0x5a7ccf(0x232)]()[_0x5a7ccf(0x24c)](),_0x38b353);return ImageManager[_0x5a7ccf(0x1c9)][_0x28c2f2]||undefined;},ImageManager[_0x3ea766(0x1df)]=function(_0x7f2d2b,_0x2e5301,_0x35a5d7){const _0x4411c5=_0x3ea766;if(!_0x7f2d2b||!_0x2e5301||!_0x35a5d7)return'';const _0x3bab43='Actor-%1-SetName-%2-Pieces-%3'[_0x4411c5(0x173)](_0x7f2d2b[_0x4411c5(0x256)](),_0x2e5301[_0x4411c5(0x232)]()[_0x4411c5(0x24c)](),_0x35a5d7);return ImageManager['actorEquipSetCharacterName'][_0x3bab43]||'';},ImageManager[_0x3ea766(0x163)]=function(_0x2b3e61,_0x14c07e,_0x2402fd){const _0x5f1788=_0x3ea766;if(!_0x2b3e61||!_0x14c07e||!_0x2402fd)return undefined;const _0x5f012d=_0x5f1788(0x21d)[_0x5f1788(0x173)](_0x2b3e61[_0x5f1788(0x256)](),_0x14c07e[_0x5f1788(0x232)]()[_0x5f1788(0x24c)](),_0x2402fd);return ImageManager[_0x5f1788(0x248)][_0x5f012d]||undefined;},ImageManager['getActorEquipSetBattlerName']=function(_0x3e4d97,_0x2556ee,_0x27f0dc){const _0x291d5a=_0x3ea766;if(!_0x3e4d97||!_0x2556ee||!_0x27f0dc)return'';const _0x48342c='Actor-%1-SetName-%2-Pieces-%3'[_0x291d5a(0x173)](_0x3e4d97['actorId'](),_0x2556ee['toUpperCase']()[_0x291d5a(0x24c)](),_0x27f0dc);return ImageManager['actorEquipSetBattlerName'][_0x48342c]||'';},ImageManager[_0x3ea766(0x249)]=function(_0x56417a,_0x3fe239,_0x4ca5f3){const _0xfdd057=_0x3ea766;if(!_0x56417a||!_0x3fe239||!_0x4ca5f3)return'';const _0x7907e3=_0xfdd057(0x21d)[_0xfdd057(0x173)](_0x56417a['actorId'](),_0x3fe239['toUpperCase']()[_0xfdd057(0x24c)](),_0x4ca5f3);return ImageManager['actorEquipSetMenuPortrait'][_0x7907e3]||'';},ImageManager[_0x3ea766(0x194)]=function(_0x55a8e4,_0x372daa,_0x176451){const _0x58c3b1=_0x3ea766;if(!_0x55a8e4||!_0x372daa||!_0x176451)return'';const _0x4a2c2a=_0x58c3b1(0x21d)[_0x58c3b1(0x173)](_0x55a8e4[_0x58c3b1(0x256)](),_0x372daa[_0x58c3b1(0x232)]()[_0x58c3b1(0x24c)](),_0x176451);return ImageManager['actorEquipSetBattlePortrait'][_0x4a2c2a]||'';},TextManager['equipSetTitleFmt']=VisuMZ['EquipSetBonuses']['Settings'][_0x3ea766(0x159)]['SetTitleFmt'],TextManager[_0x3ea766(0x1b4)]=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)][_0x3ea766(0x159)][_0x3ea766(0x22e)],TextManager[_0x3ea766(0x22d)]=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)]['Tooltip']['SeparatorFmt'],TextManager[_0x3ea766(0x170)]=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)][_0x3ea766(0x159)][_0x3ea766(0x27b)],TextManager[_0x3ea766(0x202)]=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)]['Tooltip'][_0x3ea766(0x17a)],TextManager['equipSetPlusPos']=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)][_0x3ea766(0x159)][_0x3ea766(0x274)],TextManager['equipSetPlusNeg']=VisuMZ[_0x3ea766(0x229)]['Settings'][_0x3ea766(0x159)][_0x3ea766(0x279)],SceneManager['refreshEquipSetTooltip']=function(){const _0x324802=_0x3ea766,_0x8501c7=this[_0x324802(0x1ff)];if(!_0x8501c7)return;const _0xec4486=_0x8501c7[_0x324802(0x237)];if(_0xec4486)_0xec4486[_0x324802(0x16e)]();},Game_BattlerBase[_0x3ea766(0x1c3)]=VisuMZ['EquipSetBonuses'][_0x3ea766(0x285)][_0x3ea766(0x25e)]['BaseParamAdd'],Game_BattlerBase[_0x3ea766(0x22b)]=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)][_0x3ea766(0x25e)]['XParamAdd'],Game_BattlerBase[_0x3ea766(0x25c)]=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)][_0x3ea766(0x25e)][_0x3ea766(0x1d6)],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x1a0)]=function(_0x2d36d5,_0x56396a){return 0x0;},Game_BattlerBase['prototype'][_0x3ea766(0x16b)]=function(_0x12ed2e,_0x3fd39b){return 0x1;},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x23a)]=Game_BattlerBase[_0x3ea766(0x1dc)]['paramPlus'],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x191)]=function(_0x8d2be8){const _0x55a54d=_0x3ea766;let _0x506840=VisuMZ[_0x55a54d(0x229)][_0x55a54d(0x23a)][_0x55a54d(0x19e)](this,_0x8d2be8);return Game_BattlerBase[_0x55a54d(0x1c3)]===_0x55a54d(0x235)&&(_0x506840+=this[_0x55a54d(0x1a0)](_0x55a54d(0x15b),_0x8d2be8)),_0x506840;},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x289)]=Game_BattlerBase['prototype'][_0x3ea766(0x2a3)],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x2a3)]=function(_0x26c2a7){const _0x31eac5=_0x3ea766;let _0x134284=VisuMZ[_0x31eac5(0x229)][_0x31eac5(0x289)][_0x31eac5(0x19e)](this,_0x26c2a7);return _0x134284*this[_0x31eac5(0x16b)](_0x31eac5(0x15b),_0x26c2a7);},VisuMZ['EquipSetBonuses'][_0x3ea766(0x233)]=Game_BattlerBase[_0x3ea766(0x1dc)]['paramFlatBonus'],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x19a)]=function(_0x243cbc){const _0x2823dc=_0x3ea766;let _0x1dac28=VisuMZ[_0x2823dc(0x229)][_0x2823dc(0x233)][_0x2823dc(0x19e)](this,_0x243cbc);return Game_BattlerBase[_0x2823dc(0x1c3)]===_0x2823dc(0x298)&&(_0x1dac28+=this[_0x2823dc(0x1a0)](_0x2823dc(0x15b),_0x243cbc)),_0x1dac28;},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x1d2)]=Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x178)],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x178)]=function(_0x183111){const _0x43ea0f=_0x3ea766;let _0x46fe0f=VisuMZ[_0x43ea0f(0x229)][_0x43ea0f(0x1d2)][_0x43ea0f(0x19e)](this,_0x183111);return Game_BattlerBase[_0x43ea0f(0x22b)]===_0x43ea0f(0x235)&&(_0x46fe0f+=this['equipSetBonusParamPlus'](_0x43ea0f(0x286),_0x183111)),_0x46fe0f;},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x1a9)]=Game_BattlerBase['prototype'][_0x3ea766(0x1ce)],Game_BattlerBase[_0x3ea766(0x1dc)]['xparamRate']=function(_0x4c9016){const _0x3611d2=_0x3ea766;let _0x1636c1=VisuMZ['EquipSetBonuses']['Game_BattlerBase_xparamRate'][_0x3611d2(0x19e)](this,_0x4c9016);return _0x1636c1*this['equipSetBonusParamRate'](_0x3611d2(0x286),_0x4c9016);},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x19d)]=Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x29b)],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x29b)]=function(_0x457420){const _0x49bc1b=_0x3ea766;let _0xf87389=VisuMZ['EquipSetBonuses'][_0x49bc1b(0x19d)][_0x49bc1b(0x19e)](this,_0x457420);return Game_BattlerBase['EQUIP_SET_X_PARAM_PLUS_FLAT']===_0x49bc1b(0x298)&&(_0xf87389+=this[_0x49bc1b(0x1a0)](_0x49bc1b(0x286),_0x457420)),_0xf87389;},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x1ec)]=Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x1cc)],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x1cc)]=function(_0x46219a){const _0x4729d2=_0x3ea766;let _0x45fb9a=VisuMZ[_0x4729d2(0x229)][_0x4729d2(0x1ec)][_0x4729d2(0x19e)](this,_0x46219a);return Game_BattlerBase['EQUIP_SET_S_PARAM_PLUS_FLAT']===_0x4729d2(0x235)&&(_0x45fb9a+=this['equipSetBonusParamPlus'](_0x4729d2(0x208),_0x46219a)),_0x45fb9a;},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x1a6)]=Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x291)],Game_BattlerBase['prototype'][_0x3ea766(0x291)]=function(_0x41ff97){const _0x3a067f=_0x3ea766;let _0x4c6f63=VisuMZ[_0x3a067f(0x229)][_0x3a067f(0x1a6)][_0x3a067f(0x19e)](this,_0x41ff97);return _0x4c6f63*this[_0x3a067f(0x16b)](_0x3a067f(0x208),_0x41ff97);},VisuMZ['EquipSetBonuses'][_0x3ea766(0x1cf)]=Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x1e0)],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x1e0)]=function(_0x4cd9ac){const _0x2d5873=_0x3ea766;let _0x63557a=VisuMZ[_0x2d5873(0x229)]['Game_BattlerBase_sparamFlatBonus'][_0x2d5873(0x19e)](this,_0x4cd9ac);return Game_BattlerBase['EQUIP_SET_S_PARAM_PLUS_FLAT']==='flat'&&(_0x63557a+=this[_0x2d5873(0x1a0)](_0x2d5873(0x208),_0x4cd9ac)),_0x63557a;},VisuMZ[_0x3ea766(0x229)]['Game_BattlerBase_addPassiveStatesFromOtherPlugins']=Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x26f)],Game_BattlerBase[_0x3ea766(0x1dc)][_0x3ea766(0x26f)]=function(){const _0xedb5bf=_0x3ea766;VisuMZ[_0xedb5bf(0x229)][_0xedb5bf(0x293)][_0xedb5bf(0x19e)](this),this[_0xedb5bf(0x213)]();},Game_BattlerBase['prototype']['addPassiveStatesFromEquipSetBonuses']=function(){},VisuMZ[_0x3ea766(0x229)]['Game_Actor_setup']=Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x184)],Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x184)]=function(_0x36e530){const _0x3acbb5=_0x3ea766;VisuMZ[_0x3acbb5(0x229)][_0x3acbb5(0x182)]['call'](this,_0x36e530),this[_0x3acbb5(0x197)]();},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x1bc)]=Game_Actor['prototype'][_0x3ea766(0x20a)],Game_Actor['prototype'][_0x3ea766(0x20a)]=function(_0x3a0651){const _0x1d56c9=_0x3ea766;VisuMZ[_0x1d56c9(0x229)][_0x1d56c9(0x1bc)][_0x1d56c9(0x19e)](this,_0x3a0651),this[_0x1d56c9(0x197)]();},Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x1fe)]=function(_0x3c9cce){const _0x18942f=_0x3ea766;(this[_0x18942f(0x155)]===undefined||this[_0x18942f(0x193)]===undefined)&&this[_0x18942f(0x197)]();},Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x197)]=function(){const _0x164d95=_0x3ea766;this[_0x164d95(0x186)](),this['applyEquipSetBonuses']();if(this['_tempActor'])return;SceneManager['refreshEquipSetTooltip']();},Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x186)]=function(){const _0x4841c9=_0x3ea766;this[_0x4841c9(0x155)]=[],this[_0x4841c9(0x193)]={};},Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x262)]=function(){const _0x8400f7=_0x3ea766;for(const _0x339a86 of this[_0x8400f7(0x25a)]()){if(!_0x339a86)continue;const _0x50611e=DataManager[_0x8400f7(0x17b)](_0x339a86);for(const _0x58688e of _0x50611e){if(_0x8400f7(0x1de)===_0x8400f7(0x1de))!this[_0x8400f7(0x155)][_0x8400f7(0x265)](_0x58688e)&&this[_0x8400f7(0x155)][_0x8400f7(0x1ef)](_0x58688e),this[_0x8400f7(0x193)][_0x58688e]=this['_equipSetBonusCount'][_0x58688e]||0x0,this['_equipSetBonusCount'][_0x58688e]++;else{const _0x4122b3=[_0x8400f7(0x17c),_0x8400f7(0x227),'REC',_0x8400f7(0x272),'MCR',_0x8400f7(0x1e7),_0x8400f7(0x158),'MDR','FDR',_0x8400f7(0x1c0)],_0x493bcc=this[_0x8400f7(0x263)](_0x2d0904,_0x8400f7(0x208),_0x4122b3);while(_0x493bcc[_0x8400f7(0x1d8)]>0x0)_0x2fb93a[_0x8400f7(0x1ef)](_0x493bcc[_0x8400f7(0x1ad)]());}}}},Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x17b)]=function(){const _0x291c46=_0x3ea766;return this[_0x291c46(0x1fe)](),this[_0x291c46(0x155)];},Game_Actor[_0x3ea766(0x1dc)]['getEquipSetPieces']=function(_0x189c33){const _0x2d4723=_0x3ea766;return this[_0x2d4723(0x1fe)](),_0x189c33=_0x189c33[_0x2d4723(0x232)]()['trim'](),(this[_0x2d4723(0x193)][_0x189c33]||0x0)[_0x2d4723(0x277)](0x0,0x14);},Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x146)]=function(){const _0x2ffbe5=_0x3ea766;let _0x53f039=this[_0x2ffbe5(0x17b)]()['clone']();return _0x53f039[_0x2ffbe5(0x14c)]((_0x108758,_0x59b8a0)=>{const _0xfd801e=_0x2ffbe5,_0x702322=this['getEquipSetPieces'](_0x108758),_0x247aec=this[_0xfd801e(0x26b)](_0x59b8a0);if(_0x702322!==_0x247aec)return _0x247aec-_0x702322;return 0x0;}),_0x53f039;},Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x1a0)]=function(_0x3f0347,_0x2cc181){const _0x3d7c31=_0x3ea766;this[_0x3d7c31(0x1fe)]();let _0x5c8fb3=0x0;for(const _0x5b648d of this['getEquipSets']()){const _0xc4c056=DataManager['getEquipSetData'](_0x5b648d);if(!_0xc4c056)continue;const _0x36dd5c=this[_0x3d7c31(0x26b)](_0x5b648d);for(let _0x412d22=0x1;_0x412d22<=_0x36dd5c;_0x412d22++){if(_0x3d7c31(0x187)==='iCLBl'){const _0x3467cb=_0x3d7c31(0x283)['format'](_0x412d22);if(_0xc4c056[_0x3467cb]&&_0xc4c056[_0x3467cb][_0x3f0347]){const _0x187408='Plus%1'[_0x3d7c31(0x173)](_0x2cc181);_0x5c8fb3+=_0xc4c056[_0x3467cb][_0x3f0347][_0x187408]||0x0;}}else{const _0xce1aab=_0x49b9f1[_0x3d7c31(0x283)[_0x3d7c31(0x173)](_0x302c52)];this['addPieceDataText'](_0x805dbc,_0xce1aab,_0x47240e);}}}return _0x5c8fb3;},Game_Actor[_0x3ea766(0x1dc)]['equipSetBonusParamRate']=function(_0x3d8e42,_0x46459a){const _0x2145bf=_0x3ea766;this[_0x2145bf(0x1fe)]();let _0x5365d1=0x1;for(const _0x23fcc1 of this[_0x2145bf(0x17b)]()){if(_0x2145bf(0x275)!==_0x2145bf(0x25b)){const _0x4c60a5=DataManager['getEquipSetData'](_0x23fcc1);if(!_0x4c60a5)continue;const _0x44d5a3=this[_0x2145bf(0x26b)](_0x23fcc1);for(let _0x1be084=0x1;_0x1be084<=_0x44d5a3;_0x1be084++){if(_0x2145bf(0x26d)==='YCUYl'){const _0x128155='Rate%1'[_0x2145bf(0x173)](_0x46ca90);_0x5c1af4*=_0xd51460[_0x2145bf(0x1b7)](_0x578a0f[_0x40f80c][_0x248747][_0x128155]||0x1);}else{const _0xf4b96f=_0x2145bf(0x283)[_0x2145bf(0x173)](_0x1be084);if(_0x4c60a5[_0xf4b96f]&&_0x4c60a5[_0xf4b96f][_0x3d8e42]){if(_0x2145bf(0x254)!=='AkstZ')return this[_0x2145bf(0x290)]=this[_0x2145bf(0x290)]||{},!this[_0x2145bf(0x290)][_0x3c0db9['id']]&&(this[_0x2145bf(0x290)][_0x11ce57['id']]=_0x4ce567['EquipSetBonuses'][_0x2145bf(0x28e)](_0x6e83ab)),this['_weaponEquipSets'][_0xc7eebd['id']];else{const _0x309b36='Rate%1'[_0x2145bf(0x173)](_0x46459a);_0x5365d1*=Math[_0x2145bf(0x1b7)](_0x4c60a5[_0xf4b96f][_0x3d8e42][_0x309b36]||0x1);}}}}}else _0x1c0093[_0x2145bf(0x1ef)](_0x58427e);}return _0x5365d1;},Game_Actor[_0x3ea766(0x1dc)]['addPassiveStatesFromEquipSetBonuses']=function(){const _0x512359=_0x3ea766;this['checkRefreshEquipSetBonuses']();const _0x218e68=this[_0x512359(0x14a)][_0x512359(0x1c5)];for(const _0x5452a8 of this[_0x512359(0x17b)]()){const _0xd81840=DataManager[_0x512359(0x250)](_0x5452a8);if(!_0xd81840)continue;const _0x1e2326=this[_0x512359(0x26b)](_0x5452a8);for(let _0x3986df=0x1;_0x3986df<=_0x1e2326;_0x3986df++){if(_0x512359(0x1f4)!==_0x512359(0x1f4)){if(this[_0x512359(0x244)]!==_0x278a67)return this[_0x512359(0x244)];const _0x214b75=this[_0x512359(0x146)]();for(const _0x4cce28 of _0x214b75){const _0x10bad8=this[_0x512359(0x26b)](_0x4cce28),_0x5c6893=_0x51f5a9[_0x512359(0x251)](this,_0x4cce28,_0x10bad8);if(_0x5c6893!==_0x2105c6)return _0x5c6893;}return _0x3dde93['EquipSetBonuses'][_0x512359(0x142)][_0x512359(0x19e)](this);}else{const _0x1e5d44='Piece%1'[_0x512359(0x173)](_0x3986df);if(_0xd81840[_0x1e5d44]&&_0xd81840[_0x1e5d44][_0x512359(0x276)])for(const _0x3c5cbc of _0xd81840[_0x1e5d44]['PassiveStates']){_0x218e68[_0x512359(0x1ef)](_0x3c5cbc);}}}}},VisuMZ['EquipSetBonuses'][_0x3ea766(0x1f5)]=Game_Actor['prototype'][_0x3ea766(0x21e)],Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x21e)]=function(_0x4bb58e,_0xbe9c17){const _0x2dbcf8=_0x3ea766;_0x4bb58e!==''?(this[_0x2dbcf8(0x1b3)]=_0x4bb58e,this['_priorityFaceIndex']=_0xbe9c17):(this[_0x2dbcf8(0x1b3)]=undefined,this['_priorityFaceIndex']=undefined);},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x24a)]=Game_Actor[_0x3ea766(0x1dc)]['faceName'],Game_Actor['prototype']['faceName']=function(){const _0x1d42a3=_0x3ea766;if(this[_0x1d42a3(0x1b3)]!==undefined)return this[_0x1d42a3(0x1b3)];const _0x372e66=this[_0x1d42a3(0x146)]();for(const _0x4da723 of _0x372e66){const _0x476147=this[_0x1d42a3(0x26b)](_0x4da723),_0x551572=ImageManager[_0x1d42a3(0x16a)](this,_0x4da723,_0x476147);if(_0x551572)return _0x551572;}return VisuMZ[_0x1d42a3(0x229)][_0x1d42a3(0x24a)][_0x1d42a3(0x19e)](this);},VisuMZ['EquipSetBonuses'][_0x3ea766(0x142)]=Game_Actor[_0x3ea766(0x1dc)]['faceIndex'],Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x192)]=function(){const _0x3aa879=_0x3ea766;if(this[_0x3aa879(0x244)]!==undefined)return this[_0x3aa879(0x244)];const _0x5eaa28=this[_0x3aa879(0x146)]();for(const _0x2e19b6 of _0x5eaa28){const _0x20c772=this['getEquipSetPieces'](_0x2e19b6),_0x59415c=ImageManager[_0x3aa879(0x251)](this,_0x2e19b6,_0x20c772);if(_0x59415c!==undefined)return _0x59415c;}return VisuMZ[_0x3aa879(0x229)][_0x3aa879(0x142)]['call'](this);},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x24d)]=Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x221)],Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x221)]=function(_0x1717a9,_0x5bb158){const _0x5acdaa=_0x3ea766;if(_0x1717a9!==''){if('SZvZx'===_0x5acdaa(0x1ed))this[_0x5acdaa(0x1a1)]=_0x1717a9,this[_0x5acdaa(0x18e)]=_0x5bb158;else{if(!this[_0x5acdaa(0x1a5)])return;if(!this[_0x5acdaa(0x1e9)])return;if(!this['_activeWindow']['active'])return;const _0x1e8a64=_0x51e921['_scene']['_windowLayer'],_0x596ee8=this[_0x5acdaa(0x1e9)][_0x5acdaa(0x1d0)](this[_0x5acdaa(0x1e9)][_0x5acdaa(0x1c1)]()),_0x2c3cc7=this[_0x5acdaa(0x1e9)][_0x5acdaa(0x1bb)],_0x57c040=this[_0x5acdaa(0x230)]*(_0x393a5e[_0x5acdaa(0x1e1)]||0.01);this['x']=this[_0x5acdaa(0x1e9)]['x']+_0x1e8a64['x']+_0x596ee8['x']+_0x2c3cc7+_0x52ce98[_0x5acdaa(0x147)],this['y']=this['_activeWindow']['y']+_0x1e8a64['y']+_0x596ee8['y']+_0x389529[_0x5acdaa(0x1b9)](_0x596ee8[_0x5acdaa(0x230)]/0x2)+_0x2c3cc7+_0x296579[_0x5acdaa(0x153)],this['y']+_0x57c040>_0x49d2a4[_0x5acdaa(0x230)]&&(this['y']=this[_0x5acdaa(0x1e9)]['y']+_0x1e8a64['y']+_0x596ee8['y']+_0x1b4d9b[_0x5acdaa(0x1b9)](_0x596ee8[_0x5acdaa(0x230)]/0x2)-_0x57c040-_0xa9f564[_0x5acdaa(0x153)]),this['clampPosition']();}}else this['_priorityCharacterName']=undefined,this['_priorityCharacterIndex']=undefined;},VisuMZ[_0x3ea766(0x229)]['Game_Actor_characterName']=Game_Actor[_0x3ea766(0x1dc)]['characterName'],Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x29f)]=function(){const _0x33585c=_0x3ea766;if(this[_0x33585c(0x1a1)]!==undefined)return this['_priorityCharacterName'];const _0x3dd51e=this[_0x33585c(0x146)]();for(const _0x3ac1f8 of _0x3dd51e){if(_0x33585c(0x205)==='kBcwL'){if(this[_0x33585c(0x1b3)]!==_0x549d9c)return this[_0x33585c(0x1b3)];const _0x22d752=this[_0x33585c(0x146)]();for(const _0xb58b37 of _0x22d752){const _0x2c4d0a=this[_0x33585c(0x26b)](_0xb58b37),_0x34067d=_0x4e1a5e[_0x33585c(0x16a)](this,_0xb58b37,_0x2c4d0a);if(_0x34067d)return _0x34067d;}return _0x16d7cc['EquipSetBonuses'][_0x33585c(0x24a)]['call'](this);}else{const _0x30157f=this['getEquipSetPieces'](_0x3ac1f8),_0x359e16=ImageManager[_0x33585c(0x1df)](this,_0x3ac1f8,_0x30157f);if(_0x359e16)return _0x359e16;}}return VisuMZ['EquipSetBonuses'][_0x33585c(0x157)][_0x33585c(0x19e)](this);},VisuMZ['EquipSetBonuses'][_0x3ea766(0x284)]=Game_Actor[_0x3ea766(0x1dc)]['characterIndex'],Game_Actor['prototype'][_0x3ea766(0x222)]=function(){const _0x5476bf=_0x3ea766;if(this[_0x5476bf(0x18e)]!==undefined)return this[_0x5476bf(0x18e)];const _0x3abc42=this[_0x5476bf(0x146)]();for(const _0x38f4ca of _0x3abc42){if(_0x5476bf(0x20b)===_0x5476bf(0x20b)){const _0x51dc73=this[_0x5476bf(0x26b)](_0x38f4ca),_0x2b80ac=ImageManager[_0x5476bf(0x163)](this,_0x38f4ca,_0x51dc73);if(_0x2b80ac!==undefined)return _0x2b80ac;}else{if(this[_0x5476bf(0x1a2)]===_0x555edc)return;this[_0x5476bf(0x1a2)]=_0x5bbd99,this[_0x5476bf(0x1a2)]?this[_0x5476bf(0x16e)]():this[_0x5476bf(0x219)]();}}return VisuMZ['EquipSetBonuses'][_0x5476bf(0x284)][_0x5476bf(0x19e)](this);},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x207)]=Game_Actor['prototype']['setBattlerImage'],Game_Actor[_0x3ea766(0x1dc)]['setBattlerImage']=function(_0x4ea7ad){const _0x5c3525=_0x3ea766;if(_0x4ea7ad!==''){if(_0x5c3525(0x1ac)===_0x5c3525(0x1ac))this['_priorityBattlerName']=_0x4ea7ad;else{const _0x38ae0d=this['getEquipSetPieces'](_0x5f5a20),_0x4970f0=_0x2cff70[_0x5c3525(0x251)](this,_0x777e3d,_0x38ae0d);if(_0x4970f0!==_0x98963f)return _0x4970f0;}}else{if(_0x5c3525(0x16f)===_0x5c3525(0x16f))this[_0x5c3525(0x1f7)]=undefined;else{const _0x303bc7=_0x217267[_0x5c3525(0x1d3)](_0x1f592e[_0x3c14d4]),_0x458ee3=_0x3c0944(_0x4944e9[_0x21faa8][_0x5c3525(0x1c8)['format'](_0x4690db)]||0x1),_0x5b1537=_0x4df320(_0x58c160[_0x4a615d][_0x5c3525(0x212)[_0x5c3525(0x173)](_0x566d28)]||0x0);if(_0x458ee3!==0x1){const _0x5672ac=_0x4996f0[_0x5c3525(0x202)],_0x5d98ae=_0x55ecaf[_0x5c3525(0x1fb)](_0x458ee3*0x64)+'%',_0x154ee5=_0x5672ac['format'](_0x303bc7,_0x5d98ae);_0x2ea671[_0x5c3525(0x1ef)](_0x154ee5);}if(_0x5b1537!==0x0){const _0x344d8b=_0x5b1537>0x0?_0x5d046e['equipSetPlusPos']:_0x546156[_0x5c3525(0x1ae)];let _0x2fdf8b=_0x45c54f['abs'](_0x5b1537);_0x1d6bd7!=='Param'&&(_0x2fdf8b=_0x4dc882[_0x5c3525(0x1fb)](_0x2fdf8b*0x64)+'%');const _0x12ce9c=_0x344d8b[_0x5c3525(0x173)](_0x303bc7,_0x2fdf8b);_0x21345e['push'](_0x12ce9c);}}}},VisuMZ['EquipSetBonuses'][_0x3ea766(0x25d)]=Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x1a8)],Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x1a8)]=function(){const _0x4146fd=_0x3ea766;if(this['_priorityBattlerName']!==undefined)return this[_0x4146fd(0x1f7)];const _0x3538ec=this[_0x4146fd(0x146)]();for(const _0x41d8c5 of _0x3538ec){const _0x236b35=this[_0x4146fd(0x26b)](_0x41d8c5),_0x93743e=ImageManager[_0x4146fd(0x162)](this,_0x41d8c5,_0x236b35);if(_0x93743e)return _0x93743e;}return VisuMZ[_0x4146fd(0x229)]['Game_Actor_battlerName'][_0x4146fd(0x19e)](this);;},VisuMZ['EquipSetBonuses'][_0x3ea766(0x13d)]=Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x27c)],Game_Actor['prototype'][_0x3ea766(0x27c)]=function(_0x10e949){const _0x3b1b74=_0x3ea766;if(_0x10e949!==''){if(_0x3b1b74(0x27e)!==_0x3b1b74(0x1b5))this['_priorityMenuImage']=_0x10e949;else{if(this[_0x3b1b74(0x1a1)]!==_0x53b96b)return this[_0x3b1b74(0x1a1)];const _0x56cf83=this[_0x3b1b74(0x146)]();for(const _0x225b51 of _0x56cf83){const _0x4c5d75=this[_0x3b1b74(0x26b)](_0x225b51),_0x388211=_0x340e81[_0x3b1b74(0x1df)](this,_0x225b51,_0x4c5d75);if(_0x388211)return _0x388211;}return _0x38790c[_0x3b1b74(0x229)][_0x3b1b74(0x157)][_0x3b1b74(0x19e)](this);}}else'waTXr'==='FqQrJ'?this[_0x3b1b74(0x16e)]():this['_priorityMenuImage']=undefined;},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x1fd)]=Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x196)],Game_Actor[_0x3ea766(0x1dc)]['getMenuImage']=function(){const _0x2ebe81=_0x3ea766;if(this[_0x2ebe81(0x1ba)]!==undefined)return this[_0x2ebe81(0x1ba)];const _0x66f886=this[_0x2ebe81(0x146)]();for(const _0xa35f13 of _0x66f886){if(_0x2ebe81(0x190)===_0x2ebe81(0x190)){const _0x2c241b=this[_0x2ebe81(0x26b)](_0xa35f13),_0x5d3fc9=ImageManager[_0x2ebe81(0x249)](this,_0xa35f13,_0x2c241b);if(_0x5d3fc9)return _0x5d3fc9;}else{if(!_0x73cbc5||!_0x57f017||!_0x35cf30)return'';const _0x3305c4=_0x2ebe81(0x21d)[_0x2ebe81(0x173)](_0x413095[_0x2ebe81(0x256)](),_0x267b06[_0x2ebe81(0x232)]()['trim'](),_0x327931);return _0x385c65[_0x2ebe81(0x13b)][_0x3305c4]||'';}}return VisuMZ['EquipSetBonuses']['Game_Actor_getMenuImage']['call'](this);;},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x160)]=Game_Actor[_0x3ea766(0x1dc)]['setBattlePortrait'],Game_Actor[_0x3ea766(0x1dc)]['setBattlePortrait']=function(_0x32ae7c){const _0x281aee=_0x3ea766;_0x32ae7c!==''?_0x281aee(0x175)==='YQvaf'?_0x2ad951['setItem'](this[_0x281aee(0x15d)]()):this[_0x281aee(0x1bd)]=_0x32ae7c:this[_0x281aee(0x1bd)]=undefined;if(SceneManager[_0x281aee(0x260)]()&&$gameParty[_0x281aee(0x270)]()[_0x281aee(0x265)](this)){const _0x8c9207=SceneManager[_0x281aee(0x1ff)]['_statusWindow'];if(_0x8c9207)_0x8c9207[_0x281aee(0x14e)](this);}},VisuMZ[_0x3ea766(0x229)]['Game_Actor_getBattlePortraitFilename']=Game_Actor[_0x3ea766(0x1dc)]['getBattlePortraitFilename'],Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x185)]=function(){const _0x316f51=_0x3ea766;if(this[_0x316f51(0x1bd)]!==undefined)return this[_0x316f51(0x1bd)];const _0x33945b=this[_0x316f51(0x146)]();for(const _0x123ab7 of _0x33945b){if(_0x316f51(0x282)===_0x316f51(0x215))_0x5c7eb5[_0x316f51(0x1ef)](_0x90d36f);else{const _0x33821c=this[_0x316f51(0x26b)](_0x123ab7),_0x5ae527=ImageManager[_0x316f51(0x194)](this,_0x123ab7,_0x33821c);if(_0x5ae527)return _0x5ae527;}}return VisuMZ[_0x316f51(0x229)][_0x316f51(0x29a)][_0x316f51(0x19e)](this);;},VisuMZ[_0x3ea766(0x229)]['Game_Actor_changeEquip']=Game_Actor[_0x3ea766(0x1dc)][_0x3ea766(0x224)],Game_Actor[_0x3ea766(0x1dc)]['changeEquip']=function(_0x428822,_0x113b45){const _0x1626b0=_0x3ea766;VisuMZ[_0x1626b0(0x229)][_0x1626b0(0x203)]['call'](this,_0x428822,_0x113b45),$gamePlayer['refresh']();},VisuMZ['EquipSetBonuses'][_0x3ea766(0x268)]=Scene_Base['prototype'][_0x3ea766(0x225)],Scene_Base[_0x3ea766(0x1dc)][_0x3ea766(0x225)]=function(){const _0x3869c9=_0x3ea766;VisuMZ[_0x3869c9(0x229)][_0x3869c9(0x268)][_0x3869c9(0x19e)](this),this[_0x3869c9(0x177)]();},Scene_Base['prototype']['createEquipSetBonusTooltipWindow']=function(){const _0x548013=_0x3ea766;if(!Window_EquipSetBonusTooltip[_0x548013(0x1dd)])return;this[_0x548013(0x237)]=new Window_EquipSetBonusTooltip(),this[_0x548013(0x154)](this['_equipSetBonusTooltipWindow']);},Scene_Base[_0x3ea766(0x1dc)][_0x3ea766(0x210)]=function(){const _0x429485=_0x3ea766;if(this[_0x429485(0x237)]){if('zKpGF'!==_0x429485(0x231)){const _0x283deb=this[_0x429485(0x234)](this[_0x429485(0x259)]);this[_0x429485(0x167)]=_0x283deb[_0x429485(0x167)]+(this[_0x429485(0x241)]()+this[_0x429485(0x1bb)])*0x2,this[_0x429485(0x230)]=_0x283deb[_0x429485(0x230)]+this[_0x429485(0x1bb)]*0x2,this[_0x429485(0x199)](),this[_0x429485(0x1c2)]();}else this[_0x429485(0x237)][_0x429485(0x219)]();}},Scene_Base[_0x3ea766(0x1dc)][_0x3ea766(0x257)]=function(){const _0x86fde5=_0x3ea766;this[_0x86fde5(0x237)]&&this[_0x86fde5(0x237)]['refresh']();},VisuMZ[_0x3ea766(0x229)]['Scene_Shop_onBuyOk']=Scene_Shop['prototype'][_0x3ea766(0x18b)],Scene_Shop['prototype'][_0x3ea766(0x18b)]=function(){const _0x12cd1f=_0x3ea766;VisuMZ[_0x12cd1f(0x229)][_0x12cd1f(0x1f1)][_0x12cd1f(0x19e)](this),this[_0x12cd1f(0x210)]();},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x1e6)]=Scene_Shop[_0x3ea766(0x1dc)][_0x3ea766(0x150)],Scene_Shop[_0x3ea766(0x1dc)][_0x3ea766(0x150)]=function(){const _0x44b1e7=_0x3ea766;VisuMZ[_0x44b1e7(0x229)]['Scene_Shop_onSellOk'][_0x44b1e7(0x19e)](this),this[_0x44b1e7(0x210)]();},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x238)]=Scene_Shop[_0x3ea766(0x1dc)]['onNumberOk'],Scene_Shop[_0x3ea766(0x1dc)][_0x3ea766(0x295)]=function(){const _0x4e74aa=_0x3ea766;VisuMZ[_0x4e74aa(0x229)][_0x4e74aa(0x238)][_0x4e74aa(0x19e)](this),this[_0x4e74aa(0x257)]();},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x1d5)]=Scene_Shop[_0x3ea766(0x1dc)]['onNumberCancel'],Scene_Shop[_0x3ea766(0x1dc)][_0x3ea766(0x2a0)]=function(){const _0x380e6c=_0x3ea766;VisuMZ[_0x380e6c(0x229)][_0x380e6c(0x1d5)][_0x380e6c(0x19e)](this),this[_0x380e6c(0x257)]();},Window_Selectable[_0x3ea766(0x1ee)]=[_0x3ea766(0x156),_0x3ea766(0x1f0),'Window_EquipItem','Window_EquipSlot',_0x3ea766(0x280),'Window_ShopSell'],VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x28b)]=Window_Selectable[_0x3ea766(0x1dc)][_0x3ea766(0x14b)],Window_Selectable[_0x3ea766(0x1dc)]['initialize']=function(_0x5a3fab){const _0x1de592=_0x3ea766;VisuMZ[_0x1de592(0x229)][_0x1de592(0x28b)][_0x1de592(0x19e)](this,_0x5a3fab),this[_0x1de592(0x1fa)]();},Window_Selectable['prototype']['registerEquipSetBonusTooltipWindow']=function(){const _0x3b2c02=_0x3ea766;if(!this[_0x3b2c02(0x201)]())return;const _0x4543fa=SceneManager[_0x3b2c02(0x1ff)];if(!_0x4543fa)return;this['_equipSetBonusTooltipWindow']=_0x4543fa[_0x3b2c02(0x237)]||null,this[_0x3b2c02(0x22f)]();},Window_Selectable[_0x3ea766(0x1dc)][_0x3ea766(0x201)]=function(){const _0x280083=_0x3ea766;if(!Window_EquipSetBonusTooltip[_0x280083(0x1dd)])return![];return Window_Selectable[_0x280083(0x1ee)]['includes'](this[_0x280083(0x1da)]['name']);},VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x144)]=Window_Selectable[_0x3ea766(0x1dc)][_0x3ea766(0x22f)],Window_Selectable[_0x3ea766(0x1dc)][_0x3ea766(0x22f)]=function(){const _0x21899d=_0x3ea766;VisuMZ[_0x21899d(0x229)][_0x21899d(0x144)][_0x21899d(0x19e)](this),this[_0x21899d(0x25f)]();},Window_Selectable[_0x3ea766(0x1dc)]['updateEquipSetBonusTooltip']=function(){const _0x540418=_0x3ea766,_0x2c973c=this[_0x540418(0x237)];if(_0x2c973c&&this[_0x540418(0x15d)]){if(_0x540418(0x18f)!==_0x540418(0x18f))this['_equipSetBonusSets']=[],this[_0x540418(0x193)]={};else{_0x2c973c[_0x540418(0x1e3)](this);const _0x31f786=_0x2c973c['getActiveWindow']();_0x31f786===this&&(_0x540418(0x239)!=='opwaT'?this[_0x540418(0x219)]():_0x2c973c['setItem'](this[_0x540418(0x15d)]()));}}};function _0xce24(){const _0x17c648=['sort','vHdoe','refreshActorPortrait','status','onSellOk','WINDOW_SKIN_OPACITY','ShowText','MOUSE_OFFSET_Y','addChild','_equipSetBonusSets','Window_BattleItem','Game_Actor_characterName','PDR','Tooltip','process_VisuMZ_Template_Notetags','Param','eZgFC','item','active','PmKvG','Game_Actor_setBattlePortrait','clear','getActorEquipSetBattlerName','getActorEquipSetCharacterIndex','MEV','MDR','addPieceDataText','width','STR','ConvertParams','getActorEquipSetFaceName','equipSetBonusParamRate','1275105aQeNTJ','NnUTl','requestRefresh','vvxBo','equipSetState','RegExp','SetFaceNamePlus','format','name','RSAax','updateBackOpacity','createEquipSetBonusTooltipWindow','xparamPlus','SetFaceNameRange','RateFmt','getEquipSets','TGR','1UYzrqq','addSetDataText','ARRAYSTR','Scene_Boot_onDatabaseLoaded','DEF','Game_Actor_setup','mDdjo','setup','getBattlePortraitFilename','clearEquipSetBonusCache','iCLBl','VIyEA','uOkEw','JSON','onBuyOk','isArmor','woYnT','_priorityCharacterIndex','iOKvK','LIPpn','paramPlus','faceIndex','_equipSetBonusCount','getActorEquipSetBattlePortrait','setItem','getMenuImage','refreshEquipSetBonuses','UYuEG','createContents','paramFlatBonus','loadSystem','RhNLP','Game_BattlerBase_xparamFlatBonus','call','baseTextRect','equipSetBonusParamPlus','_priorityCharacterName','_item','actorEquipSetMenuPortrait','TRG','visible','Game_BattlerBase_sparamRate','TXPLV','battlerName','Game_BattlerBase_xparamRate','hpEtO','actorEquipSetFaceName','TsoXC','shift','equipSetPlusNeg','contents','VisuMZ_1_ItemsEquipsCore','ZpptK','map','_priorityFaceName','equipSetPieceFmt','KVLJY','EquipSets','abs','SetMenuPortraitRange','round','_priorityMenuImage','padding','Game_Actor_releaseUnequippableItems','_priorityBattlePortrait','SetFaceName','filter','EXR','index','resetFontSettings','EQUIP_SET_BASE_PARAM_PLUS_FLAT','SetCharaNameRange','passiveStates','STRUCT','153nSSlCC','Rate%1','actorEquipSetFaceIndex','9316602mWObma','bCewH','sparamPlus','FUNC','xparamRate','Game_BattlerBase_sparamFlatBonus','itemRect','ZWZoj','Game_BattlerBase_xparamPlus','paramName','HIT','Scene_Shop_onNumberCancel','SParamAdd','rHLvS','length','SetBattlerNamePlus','constructor','Set','prototype','SHOW_TOOLTIP','uqqJF','getActorEquipSetCharacterName','sparamFlatBonus','WINDOW_SCALE','drawTextEx','setActiveWindow','WINDOW_SKIN_FILENAME','EVA','Scene_Shop_onSellOk','TCR','Scale','_activeWindow','_requestRefresh','max','Game_BattlerBase_sparamPlus','SZvZx','EQUIP_SET_BONUS_WINDOWS','push','Window_ItemList','Scene_Shop_onBuyOk','Text','MAXMP','AqsYQ','Game_Actor_setFaceImage','_windowLayer','_priorityBattlerName','_lineOpacity','REC','registerEquipSetBonusTooltipWindow','floor','MRG','Game_Actor_getMenuImage','checkRefreshEquipSetBonuses','_scene','MAXHP','hasEquipSetBonusTooltipWindow','equipSetRate','Game_Actor_changeEquip','8xSGKKG','weXra','processNewLine','Game_Actor_setBattlerImage','SParam','show','releaseUnequippableItems','EFJpX','onDatabaseLoaded','VisuMZ_0_CoreEngine','SetCharaName','SetMenuPortraitPlus','hideEquipSetBonusTooltipWindow','actorEquipSetBattlePortrait','Plus%1','addPassiveStatesFromEquipSetBonuses','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','YScXD','ARRAYSTRUCT','MCR','match','hide','CEV','SetBattlePortrait','actorEquipSetBattlerName','Actor-%1-SetName-%2-Pieces-%3','setFaceImage','1874030gZlkDP','exit','setCharacterImage','characterIndex','create','changeEquip','createWindowLayer','MmNod','GRD','iconIndex','EquipSetBonuses','akfOG','EQUIP_SET_X_PARAM_PLUS_FLAT','vpuYw','equipSetPieceSeparator','SetPieceFmt','callUpdateHelp','height','zKpGF','toUpperCase','Game_BattlerBase_paramFlatBonus','textSizeEx','plus','registerActorEquipSetImages','_equipSetBonusTooltipWindow','Scene_Shop_onNumberOk','opwaT','Game_BattlerBase_paramPlus','actor','backOpacity','NUM','MAT','XODuW','upktN','itemPadding','_armorEquipSets','rbTjt','_priorityFaceIndex','parse','note','updatePosition','actorEquipSetCharacterIndex','getActorEquipSetMenuPortrait','Game_Actor_faceName','CNT','trim','Game_Actor_setCharacterImage','OrViS','LUK','getEquipSetData','getActorEquipSetFaceIndex','_equipSets','update','AkstZ','xMSen','actorId','showEquipSetBonusTooltipWindow','WaYJP','_text','equips','zUJwa','EQUIP_SET_S_PARAM_PLUS_FLAT','Game_Actor_battlerName','Mechanics','updateEquipSetBonusTooltip','isSceneBattle','Icon','applyEquipSetBonuses','createAutoParamText','changePaintOpacity','includes','clampPosition','isWeapon','Scene_Base_createWindowLayer','CRI','Scene_Equip','getEquipSetPieces','WindowOpacity','AodOp','resizeWindow','addPassiveStatesFromOtherPlugins','battleMembers','createAutoPieceText','PHA','ParseActorNotetags','AddPosFmt','KSPEE','PassiveStates','clamp','qYJCx','AddNegFmt','loadWindowskin','StateFmt','setMenuImage','oOFpQ','UkJVP','ParseAllNotetags','Window_ShopBuy','jrCWn','yOXEw','Piece%1','Game_Actor_characterIndex','Settings','XParam','6169044FvGSXY','description','Game_BattlerBase_paramRate','isSupportMessageKeywords','Window_Selectable_initialize','BnLHl','hvFDm','ParseEquipSets','MDF','_weaponEquipSets','sparamRate','ZMhKo','Game_BattlerBase_addPassiveStatesFromOtherPlugins','pushLineOpacity','onNumberOk','SetMenuPortrait','setupText','flat','\x5cI[%1]','Game_Actor_getBattlePortraitFilename','xparamFlatBonus','2482560PQwXiP','equipSetPlusPos','HRG','characterName','onNumberCancel','equipSetTitleFmt','ARRAYJSON','paramRate','parameters','actorEquipSetCharacterName','2908305RcWIVB','Game_Actor_setMenuImage','ARRAYEVAL','SetBattlerName','ISiBg','convertMessageKeywords','Game_Actor_faceIndex','2926726qmSKif','Window_Selectable_callUpdateHelp','getActiveWindow','getEquipSetsSortedByMostPieces','MOUSE_OFFSET_X','SetName','ACyrb','_cache','initialize'];_0xce24=function(){return _0x17c648;};return _0xce24();}function Window_EquipSetBonusTooltip(){this['initialize'](...arguments);}Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)]=Object[_0x3ea766(0x223)](Window_Base[_0x3ea766(0x1dc)]),Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x1da)]=Window_EquipSetBonusTooltip,Window_EquipSetBonusTooltip[_0x3ea766(0x1dd)]=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)]['Tooltip']['Show'],Window_EquipSetBonusTooltip[_0x3ea766(0x1e1)]=VisuMZ['EquipSetBonuses'][_0x3ea766(0x285)][_0x3ea766(0x159)][_0x3ea766(0x1e8)],Window_EquipSetBonusTooltip[_0x3ea766(0x1e4)]=VisuMZ['EquipSetBonuses']['Settings'][_0x3ea766(0x159)]['WindowSkin'],Window_EquipSetBonusTooltip['WINDOW_SKIN_OPACITY']=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)]['Tooltip'][_0x3ea766(0x26c)],Window_EquipSetBonusTooltip[_0x3ea766(0x147)]=VisuMZ[_0x3ea766(0x229)]['Settings'][_0x3ea766(0x159)]['OffsetX'],Window_EquipSetBonusTooltip['MOUSE_OFFSET_Y']=VisuMZ[_0x3ea766(0x229)][_0x3ea766(0x285)][_0x3ea766(0x159)]['OffsetY'],Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x14b)]=function(){const _0x1c7938=_0x3ea766,_0x51c32a=new Rectangle(0x0,0x0,Graphics[_0x1c7938(0x167)],Graphics[_0x1c7938(0x230)]);Window_Base[_0x1c7938(0x1dc)][_0x1c7938(0x14b)][_0x1c7938(0x19e)](this,_0x51c32a),this['scale']['x']=this['scale']['y']=Window_EquipSetBonusTooltip['WINDOW_SCALE'],this['hide'](),this[_0x1c7938(0x1a2)]=null,this[_0x1c7938(0x1e9)]=null;},Window_EquipSetBonusTooltip['prototype'][_0x3ea766(0x27a)]=function(){const _0x3b8cb3=_0x3ea766;this['windowskin']=ImageManager[_0x3b8cb3(0x19b)](Window_EquipSetBonusTooltip['WINDOW_SKIN_FILENAME']);},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x176)]=function(){const _0x3a3b40=_0x3ea766;this[_0x3a3b40(0x23c)]=Window_EquipSetBonusTooltip[_0x3a3b40(0x151)];},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x195)]=function(_0x53c319){const _0x563520=_0x3ea766;if(this[_0x563520(0x1a2)]===_0x53c319)return;this[_0x563520(0x1a2)]=_0x53c319,this[_0x563520(0x1a2)]?_0x563520(0x23f)!==_0x563520(0x1b1)?this[_0x563520(0x16e)]():this[_0x563520(0x290)][_0xa73fb9['id']]=_0xf76b69[_0x563520(0x229)]['ParseEquipSets'](_0x29d9bf):this[_0x563520(0x219)]();},Window_EquipSetBonusTooltip['prototype'][_0x3ea766(0x145)]=function(){return this['_activeWindow']||null;},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x1e3)]=function(_0x8eb7cd){const _0x1b54c5=_0x3ea766;if(!_0x8eb7cd[_0x1b54c5(0x15e)])return;this['_activeWindow']=_0x8eb7cd,this[_0x1b54c5(0x247)]();},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)]['refresh']=function(){const _0x51db0d=_0x3ea766;this[_0x51db0d(0x1af)][_0x51db0d(0x161)](),this[_0x51db0d(0x297)]();if(this[_0x51db0d(0x259)][_0x51db0d(0x1d8)]>0x0){this['resizeWindow']();const _0x10104c=this[_0x51db0d(0x19f)]();this[_0x51db0d(0x1c2)](),this[_0x51db0d(0x264)](this['_lineOpacity'][_0x51db0d(0x1ad)]()),this[_0x51db0d(0x1e2)](this[_0x51db0d(0x259)],_0x10104c['x'],_0x10104c['y'],_0x10104c[_0x51db0d(0x167)]),this['show']();}else this['hide']();},Window_EquipSetBonusTooltip['prototype'][_0x3ea766(0x206)]=function(_0x2a91de){const _0x106c4e=_0x3ea766;Window_Base[_0x106c4e(0x1dc)][_0x106c4e(0x206)]['call'](this,_0x2a91de),_0x2a91de['drawing']&&this[_0x106c4e(0x264)](this[_0x106c4e(0x1f8)][_0x106c4e(0x1ad)]());},Window_EquipSetBonusTooltip['prototype'][_0x3ea766(0x141)]=function(_0x9d3f3a){return _0x9d3f3a;},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x28a)]=function(){return![];},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)]['setupText']=function(){const _0x5adfdd=_0x3ea766;this[_0x5adfdd(0x259)]='',this['_lineOpacity']=[];if(!this[_0x5adfdd(0x1a2)])return;for(const _0x35c010 of DataManager[_0x5adfdd(0x17b)](this[_0x5adfdd(0x1a2)])){if('GKYAb'===_0x5adfdd(0x189)){const _0x1544f6='Actor-%1-SetName-%2-Pieces-%3'[_0x5adfdd(0x173)](_0x72727f,_0x41898f,_0x1d4955);_0x2ad4b2['actorEquipSetBattlerName'][_0x1544f6]=_0x3d128f;}else{const _0x5119f7=DataManager[_0x5adfdd(0x250)](_0x35c010);if(!_0x5119f7)continue;this[_0x5adfdd(0x17e)](_0x5119f7);}}this['_text']=this['_text']['trim']();},Window_EquipSetBonusTooltip['prototype'][_0x3ea766(0x17e)]=function(_0x265567){const _0x31a9aa=_0x3ea766;if(!_0x265567)return;const _0x189894=_0x265567[_0x31a9aa(0x148)],_0x2c0ad2=_0x265567['Icon']?_0x31a9aa(0x299)[_0x31a9aa(0x173)](_0x265567[_0x31a9aa(0x261)]):'';this['_text']+=TextManager[_0x31a9aa(0x2a1)][_0x31a9aa(0x173)](_0x189894,_0x2c0ad2)+'\x0a',this[_0x31a9aa(0x1f8)][_0x31a9aa(0x1ef)](!![]);for(let _0x50c61d=0x1;_0x50c61d<=0x14;_0x50c61d++){const _0x25e823=_0x265567['Piece%1'[_0x31a9aa(0x173)](_0x50c61d)];this[_0x31a9aa(0x166)](_0x265567,_0x25e823,_0x50c61d);}},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x166)]=function(_0x1928ab,_0x227e9c,_0x55b838){const _0x1c54ea=_0x3ea766;if(!_0x227e9c)return;if(_0x227e9c['Text']===undefined)return;if(!_0x227e9c[_0x1c54ea(0x152)])return;let _0x5da909='';if(_0x227e9c[_0x1c54ea(0x1f2)]['toLowerCase']()[_0x1c54ea(0x24c)]()!=='auto'){if(_0x1c54ea(0x140)==='ISiBg')_0x5da909=_0x227e9c[_0x1c54ea(0x1f2)];else{_0x1e0f42[_0x1c54ea(0x218)](_0x242fa4[_0x1c54ea(0x1db)]);const _0x53b6e7=_0x1f9be9(_0x34e209['$1'])[_0x1c54ea(0x232)]()['trim']();!!_0xb3c79d['getEquipSetData'](_0x53b6e7)&&_0x72b460[_0x1c54ea(0x1ef)](_0x53b6e7);}}else{if(_0x1c54ea(0x1aa)==='tmUQC'){const _0x237c0d=_0x1c54ea(0x21d)[_0x1c54ea(0x173)](_0xa8053c,_0x5ced68,_0x3ad7ad);_0x373f7a[_0x1c54ea(0x21c)][_0x237c0d]=_0x31a88d;}else _0x5da909=this[_0x1c54ea(0x271)](_0x227e9c);}if(_0x5da909[_0x1c54ea(0x24c)]()!==''){if(_0x1c54ea(0x226)===_0x1c54ea(0x183)){const _0xd12f4=_0x1c54ea(0x212)[_0x1c54ea(0x173)](_0x5c0480);_0x2ba0aa+=_0x4c2f29[_0x29eb2b][_0x1aa908][_0xd12f4]||0x0;}else this[_0x1c54ea(0x259)]+=TextManager[_0x1c54ea(0x1b4)][_0x1c54ea(0x173)](_0x55b838,_0x5da909)+'\x0a',this[_0x1c54ea(0x294)](_0x1928ab,_0x55b838);}},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)]['createAutoPieceText']=function(_0x1da3cb){const _0x7bf261=_0x3ea766;let _0x31abfd='';const _0x565101=[];if(_0x1da3cb['PassiveStates'])for(const _0x204338 of _0x1da3cb[_0x7bf261(0x276)]){if(_0x7bf261(0x15f)===_0x7bf261(0x15f)){const _0x52382b=$dataStates[_0x204338];if(!_0x52382b)continue;if(_0x52382b['iconIndex']<=0x0)continue;if(_0x52382b[_0x7bf261(0x174)]['trim']()==='')continue;if(_0x52382b['name'][_0x7bf261(0x218)](/-----/i))continue;const _0x54dde0='\x5cI[%1]'[_0x7bf261(0x173)](_0x52382b[_0x7bf261(0x228)]),_0xd38e7c=TextManager[_0x7bf261(0x170)]['format'](_0x52382b[_0x7bf261(0x174)],_0x54dde0);_0x565101['push'](_0xd38e7c);}else this[_0x7bf261(0x1a1)]=_0x4b6c40,this['_priorityCharacterIndex']=_0x4dc3ac;}if(_0x1da3cb[_0x7bf261(0x15b)]){if(_0x7bf261(0x16d)!==_0x7bf261(0x258)){const _0x443375=[_0x7bf261(0x200),_0x7bf261(0x1f3),'ATK',_0x7bf261(0x181),_0x7bf261(0x23e),_0x7bf261(0x28f),'AGI',_0x7bf261(0x24f)],_0x2a26bb=this[_0x7bf261(0x263)](_0x1da3cb,_0x7bf261(0x15b),_0x443375);while(_0x2a26bb['length']>0x0)_0x565101[_0x7bf261(0x1ef)](_0x2a26bb['shift']());}else _0x1e6112+=_0x895eb2;}if(_0x1da3cb[_0x7bf261(0x286)]){const _0x1ef754=[_0x7bf261(0x1d4),_0x7bf261(0x1e5),_0x7bf261(0x269),_0x7bf261(0x21a),_0x7bf261(0x164),'MRF',_0x7bf261(0x24b),_0x7bf261(0x29e),_0x7bf261(0x1fc),_0x7bf261(0x1a4)],_0x580a66=this[_0x7bf261(0x263)](_0x1da3cb,'XParam',_0x1ef754);while(_0x580a66['length']>0x0)_0x565101[_0x7bf261(0x1ef)](_0x580a66[_0x7bf261(0x1ad)]());}if(_0x1da3cb['SParam']){if('UYuEG'!==_0x7bf261(0x198))_0x1593ec[_0x7bf261(0x229)][_0x7bf261(0x1d5)]['call'](this),this['showEquipSetBonusTooltipWindow']();else{const _0x338786=[_0x7bf261(0x17c),_0x7bf261(0x227),_0x7bf261(0x1f9),_0x7bf261(0x272),_0x7bf261(0x217),_0x7bf261(0x1e7),_0x7bf261(0x158),_0x7bf261(0x165),'FDR','EXR'],_0x2ead62=this[_0x7bf261(0x263)](_0x1da3cb,_0x7bf261(0x208),_0x338786);while(_0x2ead62['length']>0x0)_0x565101[_0x7bf261(0x1ef)](_0x2ead62[_0x7bf261(0x1ad)]());}}for(const _0x1bdc54 of _0x565101){if(_0x1bdc54[_0x7bf261(0x1d8)]<=0x0)continue;_0x31abfd[_0x7bf261(0x1d8)]<=0x0?_0x31abfd+=_0x1bdc54:_0x31abfd=TextManager[_0x7bf261(0x22d)][_0x7bf261(0x173)](_0x31abfd,_0x1bdc54);}return _0x31abfd[_0x7bf261(0x24c)]();},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x263)]=function(_0x266699,_0xbc8259,_0x440d88){const _0x6dc0a=_0x3ea766,_0x4fe9f7=[],_0x12bf6d=_0x440d88['length'];for(let _0x51ffe0=0x0;_0x51ffe0<_0x12bf6d;_0x51ffe0++){const _0x280526=TextManager['paramName'](_0x440d88[_0x51ffe0]),_0x32e979=Number(_0x266699[_0xbc8259][_0x6dc0a(0x1c8)[_0x6dc0a(0x173)](_0x51ffe0)]||0x1),_0x1b99a7=Number(_0x266699[_0xbc8259][_0x6dc0a(0x212)[_0x6dc0a(0x173)](_0x51ffe0)]||0x0);if(_0x32e979!==0x1){const _0x54c5a5=TextManager[_0x6dc0a(0x202)],_0x20626d=Math[_0x6dc0a(0x1fb)](_0x32e979*0x64)+'%',_0x5bae14=_0x54c5a5['format'](_0x280526,_0x20626d);_0x4fe9f7[_0x6dc0a(0x1ef)](_0x5bae14);}if(_0x1b99a7!==0x0){const _0x5740a=_0x1b99a7>0x0?TextManager[_0x6dc0a(0x29d)]:TextManager['equipSetPlusNeg'];let _0x411e97=Math[_0x6dc0a(0x1b7)](_0x1b99a7);_0xbc8259!==_0x6dc0a(0x15b)&&(_0x411e97=Math[_0x6dc0a(0x1fb)](_0x411e97*0x64)+'%');const _0x52e45b=_0x5740a[_0x6dc0a(0x173)](_0x280526,_0x411e97);_0x4fe9f7['push'](_0x52e45b);}}return _0x4fe9f7;},Window_EquipSetBonusTooltip['prototype']['pushLineOpacity']=function(_0x552efc,_0x2449aa){const _0x107a67=_0x3ea766,_0x19da81=SceneManager[_0x107a67(0x1ff)];if([_0x107a67(0x26a)][_0x107a67(0x265)](_0x19da81[_0x107a67(0x1da)][_0x107a67(0x174)])){const _0x31eb3d=_0x19da81[_0x107a67(0x23b)](),_0x1ae5c6=_0x552efc['SetName'][_0x107a67(0x232)]()[_0x107a67(0x24c)](),_0x33ec2f=_0x31eb3d[_0x107a67(0x26b)](_0x1ae5c6);this[_0x107a67(0x1f8)]['push'](_0x33ec2f>=_0x2449aa);}else this[_0x107a67(0x1f8)][_0x107a67(0x1ef)](!![]);},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x26e)]=function(){const _0x2d2c7a=_0x3ea766,_0x51d2ab=this[_0x2d2c7a(0x234)](this['_text']);this[_0x2d2c7a(0x167)]=_0x51d2ab[_0x2d2c7a(0x167)]+(this['itemPadding']()+this[_0x2d2c7a(0x1bb)])*0x2,this[_0x2d2c7a(0x230)]=_0x51d2ab[_0x2d2c7a(0x230)]+this[_0x2d2c7a(0x1bb)]*0x2,this['createContents'](),this[_0x2d2c7a(0x1c2)]();},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x253)]=function(){const _0x18fd94=_0x3ea766;Window_Base[_0x18fd94(0x1dc)]['update'][_0x18fd94(0x19e)](this),this[_0x18fd94(0x1ea)]&&(this[_0x18fd94(0x1ea)]=![],this['refresh']()),this['updatePosition']();},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x16e)]=function(){this['_requestRefresh']=!![];},Window_EquipSetBonusTooltip['prototype'][_0x3ea766(0x247)]=function(){const _0x537702=_0x3ea766;if(!this[_0x537702(0x1a5)])return;if(!this[_0x537702(0x1e9)])return;if(!this['_activeWindow'][_0x537702(0x15e)])return;const _0x4a1f6c=SceneManager['_scene'][_0x537702(0x1f6)],_0x2ecb45=this[_0x537702(0x1e9)][_0x537702(0x1d0)](this['_activeWindow'][_0x537702(0x1c1)]()),_0xb5fcfd=this[_0x537702(0x1e9)][_0x537702(0x1bb)],_0x20d762=this['height']*(Window_EquipSetBonusTooltip[_0x537702(0x1e1)]||0.01);this['x']=this['_activeWindow']['x']+_0x4a1f6c['x']+_0x2ecb45['x']+_0xb5fcfd+Window_EquipSetBonusTooltip['MOUSE_OFFSET_X'],this['y']=this[_0x537702(0x1e9)]['y']+_0x4a1f6c['y']+_0x2ecb45['y']+Math['round'](_0x2ecb45[_0x537702(0x230)]/0x2)+_0xb5fcfd+Window_EquipSetBonusTooltip[_0x537702(0x153)],this['y']+_0x20d762>Graphics['height']&&(this['y']=this[_0x537702(0x1e9)]['y']+_0x4a1f6c['y']+_0x2ecb45['y']+Math['round'](_0x2ecb45['height']/0x2)-_0x20d762-Window_EquipSetBonusTooltip[_0x537702(0x153)]),this[_0x537702(0x266)]();},Window_EquipSetBonusTooltip[_0x3ea766(0x1dc)][_0x3ea766(0x266)]=function(){const _0x4f9aa6=_0x3ea766,_0x53eb4d=this['width']*(Window_EquipSetBonusTooltip[_0x4f9aa6(0x1e1)]||0.01),_0x143cd5=this[_0x4f9aa6(0x230)]*(Window_EquipSetBonusTooltip['WINDOW_SCALE']||0.01);this['x']=Math['round'](this['x']['clamp'](0x0,Graphics[_0x4f9aa6(0x167)]-_0x53eb4d)),this['y']=Math['round'](this['y'][_0x4f9aa6(0x277)](0x0,Graphics[_0x4f9aa6(0x230)]-_0x143cd5));};