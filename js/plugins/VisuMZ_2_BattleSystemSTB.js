//=============================================================================
// VisuStella MZ - Battle System - STB - Standard Turn Battle
// VisuMZ_2_BattleSystemSTB.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_BattleSystemSTB = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleSystemSTB = VisuMZ.BattleSystemSTB || {};
VisuMZ.BattleSystemSTB.version = 1.20;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.20] [BattleSystemSTB]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_System_-_STB_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Standard Turn Battle (STB) system uses RPG Maker MZ's default non-TPB
 * battle system as a base. Action orders are determined by the battler's AGI
 * values and they go from highest to lowest. However, actions are not selected
 * at the start of the turn. Instead, as the turn progresses, actions are then
 * picked as each battler's turn comes up and is executed immediately.
 * 
 * Optional to the battle system but fine tuned to it is the Exploit System.
 * When landing an elemental weakness or critical hit against a foe, the
 * battler can gain bonuses as well as an extra turn while the foe will become
 * stunned or gain any desired state(s). When all enemies are exploited in a
 * single turn, a common event can also be played, too.
 * 
 * A Turn Order Display will also appear on the screen to show the order the
 * battlers will take their turns in. This lets the player plan in advance on
 * how to go about the rest of the turn.
 * 
 * *NOTE* To use this battle system, you will need the updated version of
 * VisuStella's Core Engine. Go into its Plugin Parameters and change the
 * "Battle System" plugin parameter to "stb".
 *
 * Features include all (but not limited to) the following:
 * 
 * * Utilizes the balanced AGI nature of the Default Turn Battle system.
 * * Allows for actions to execute immediately upon selection.
 * * A Turn Order Display to show the player when each battler will have its
 *   turn to perform an action.
 * * Skills and Items can have an "Instant Use" effect, which allows them to
 *   perform an action immediately without using up a turn.
 * * An optional Exploit System that can be disabled if desired, but otherwise,
 *   fine tuned to make use of STB's highly compatible nature.
 * * Landing an elemental weakness or critical hit can allow the active battler
 *   to gain bonuses, ranging from states to extra actions to custom effects
 *   that can be added on through JavaScript plugin parameters.
 * * An exploited enemy can suffer from states and/or custom effects added
 *   through JavaScript plugin parameters.
 * * If all enemies are exploited, a common event can run to allow for a custom
 *   follow up action.
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
 * * VisuMZ_1_BattleCore
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
 * Turn Order Display
 * 
 * The Turn Order Display will capture the battle's currently active battler
 * and any battlers found in the active battlers array for the BattleManager.
 * This does not overwrite any functions, but the Turn Order Display may or may
 * not conflict with any existing HUD elements that are already positioned on
 * the screen. If so, you can choose to offset the Turn Order Display or move
 * it to a different part of the screen through the plugin parameters.
 * 
 * ---
 *
 * Action Speed
 * 
 * For skills and items, action speeds now behave differently now. Because
 * actions are now decided after a turn starts, positioning will no longer be
 * decided from the selected skill/item's action speed for the current turn.
 * 
 * Instead, the action speed used by a skill or item will determine the bonus
 * speed (or speed penalty if negative) for the following turn. Using a Guard
 * action with a +2000 Action Speed will raise the following turn's speed by
 * +2000, whereas what is originally a long charge time skill with -1000 speed
 * will decrease the following action's speed by -1000.
 * 
 * You can also customize how speed is calculated through JS Plugin Parameters
 * found in the Mechanics Settings.
 *
 * ---
 * 
 * Instant Use
 * 
 * Skills and Items can have an "Instant Use" property which allows them to be
 * used immediately without consuming a turn. This can be used for actions that
 * otherwise do not warrant a whole turn. These can be used for minor buffs,
 * debuffs, toggles, etc.
 * 
 * ---
 * 
 * Exploit System
 * 
 * This is an optional system. If you wish to turn it off, you can do so in the
 * plugin parameters.
 * 
 * There are two main ways that battlers can be exploited. One is by receiving
 * damage that strikes an elemental weakness. The other is by receiving damage
 * from a Critical Hit. Exploited battlers can receive penalty states. These
 * states can be adjusted in the plugin parameters. The default penalty state
 * is the Stunned state.
 * 
 * The battler doing the exploiting can receive bonuses instead. This is to
 * reward a power play. These bonuses can range from added states to receiving
 * an extra action and allowing the active battler to immediately attack again.
 * 
 * Each battler can only be exploited once per turn. This means if an enemy
 * would receive multiple attacks to its elemental weakness(es), the exploited
 * effect will only occur once per turn, meaning the penalty states won't stack
 * multiple times over. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * Each action can also exploit only once per use and against an unexploited
 * target. This means battlers cannot use the same elemental attacks against
 * the same foes over and over to stack up an infinite amount of turns. If the
 * player wants to gain more bonuses, the player would have to strike against
 * unexploited foes. This limitation is for the sake of game balance, but if
 * you so wish, you can turn off this limitation in the plugin parameters.
 * 
 * When all members of a party/troop are exploited, a common event can be
 * triggered to run, allowing for potential follow up actions. How you wish to
 * make these common events is up to you.
 * 
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins. Here is a list
 * of the ones this plugin is not compatible with.
 *
 * ---
 * 
 * VisuMZ_2_PartySystem
 * 
 * In battle, the player cannot change entire parties at once from the Party
 * Command Window. The feature will be unaccessible while Standard Turn Battle
 * is in play. However, the player can still change party members through the
 * Actor Command Window by having actors replace other actors. Party changing
 * is also available through battle events, Common Events, and script calls.
 * 
 * ---
 *
 * VisuMZ_4_BreakShields
 * 
 * The Break Shields plugin can be used together with Battle System - STB.
 * However, it cannot be used together with the STB Exploit system. This is
 * because both Break Shields and the Exploit system function under similar
 * mechanics and will conflict. However, if STB's Exploit system is turned off,
 * then you can use all of the Break Shield plugin's features fully.
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
 * === General STB-Related Notetags ===
 * 
 * These notetags are general purpose notetags that have became available
 * through this plugin.
 * 
 * ---
 * 
 * <STB Help>
 *  description
 *  description
 * </STB Help>
 *
 * - Used for: Skill, Item Notetags
 * - If your game happens to support the ability to change battle systems, this
 *   notetag lets you change how the skill/item's help description text will
 *   look under STB.
 * - This is primarily used if the skill behaves differently in STB versus any
 *   other battle system.
 * - Replace 'description' with help text that's only displayed if the game's
 *   battle system is set to STB.
 *
 * ---
 * 
 * === STB Turn Order Display-Related Notetags ===
 * 
 * These notetags affect the STB Turn Order Display
 * 
 * ---
 *
 * <STB Turn Order Icon: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the battler to a specific icon.
 * - Replace 'x' with the icon index to be used.
 * 
 * ---
 *
 * <STB Turn Order Face: filename, index>
 *
 * - Used for: Actor, Enemy Notetags
 * - Changes the slot graphic used for the enemy to a specific face.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Replace 'index' with the index of the face. Index values start at 0.
 * - Example: <STB Turn Order Face: Monster, 1>
 * 
 * ---
 * 
 * === Instant Use-Related Notetags ===
 * 
 * ---
 *
 * <STB Instant>
 * <STB Instant Use>
 * <STB Instant Cast>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to be used immediately without consuming a turn.
 *
 * ---
 * 
 * === Exploit-Related Notetags ===
 * 
 * ---
 *
 * <STB Exploited Gain State: id>
 * <STB Exploited Gain State: id, id, id>
 * 
 * <STB Exploited Gain State: name>
 * <STB Exploited Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy is exploited via elemental
 *   weaknesses or critical hits, apply the listed penalty state(s).
 * - Replace 'id' with a number representing the penalty state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple penalty states at once.
 * - Replace 'name' with the name of the penalty state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple penalty states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploited>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from being exploited via elemental
 *   weaknesses or critical hits.
 *
 * ---
 *
 * <STB Exploiter Gain State: id>
 * <STB Exploiter Gain State: id, id, id>
 * 
 * <STB Exploiter Gain State: name>
 * <STB Exploiter Gain State: name, name, name>
 *
 * - Used for: Class, Enemy Notetags
 * - If an actor (with the specified class) or enemy exploits an opponent with
 *   an elemental weakness or critical hit, apply the listed bonus state(s).
 * - Replace 'id' with a number representing the bonus state ID's you wish
 *   to apply to the exploited battler.
 * - Insert multiple 'id' values to apply multiple bonus states at once.
 * - Replace 'name' with the name of the bonus state you wish to apply to the
 *   exploited battler.
 * - Insert multiple 'name' entries to apply multiple bonus states at once.
 *
 * ---
 *
 * <STB Cannot Be Exploiter>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - This prevents the affected battler from exploiting any opponents via
 *   elemental weaknesses or critical hits.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Change STB Turn Order Icon
 * - Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Actor: Change STB Turn Order Face
 * - Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Actor: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the actor(s).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Change STB Turn Order Icon
 * - Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Icon:
 *   - Changes the graphic to this icon.
 *
 * ---
 *
 * Enemy: Change STB Turn Order Face
 * - Changes the faces used for the specific enemy(ies) on the STB Turn Order.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 *   Face Name:
 *   - This is the filename for the target face graphic.
 *
 *   Face Index:
 *   - This is the index for the target face graphic.
 *
 * ---
 *
 * Enemy: Clear STB Turn Order Graphic
 * - Clears the STB Turn Order graphics for the enemy(ies).
 * - The settings will revert to the Plugin Parameter settings.
 *
 *   Enemy Index(es):
 *   - Select which enemy index(es) to affect.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: STB Turn Order Visibility
 * - Determine the visibility of the STB Turn Order Display.
 *
 *   Visibility:
 *   - Changes the visibility of the STB Turn Order Display.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Determines the mechanics of the STB Battle System.
 *
 * ---
 *
 * Speed
 * 
 *   JS: Finalized Speed:
 *   - Code used to calculate the finalized speed at the start of each turn.
 * 
 *   JS: Next Turn Speed:
 *   - Code used to calculate speed for a following turn.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploit System Settings
 * ============================================================================
 *
 * Here, you can adjust the main settings for the Exploit System, including
 * where you can turn it on/off. The Exploited and Exploiter settings are
 * extensions of the Exploit System and are better off with their own sections.
 *
 * ---
 *
 * Settings
 * 
 *   Enable System?:
 *   - Enable the exploit system? 
 *   - If disabled, ignore all the  mechanics regarding the Exploit System.
 * 
 *   Critical Hits:
 *   - Do critical hits exploit the opponent?
 * 
 *   Elemental Weakness:
 *   - Do elemental weaknesses exploit the opponent?
 * 
 *     Minimum Rate:
 *     - What's the minimum rate needed to count as an elemental weakness?
 * 
 *   Forced Actions:
 *   - Apply exploit system to Forced Actions?
 *   - We added this function because forced actions can disrupt player
 *     strategies when used with the exploit system.
 * 
 *   Reset Each Turn:
 *   - Reset exploits at the end of each turn?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploited Effects Settings
 * ============================================================================
 *
 * These are effects for the exploited battlers (the receiving end). Change how
 * you want exploited battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a target is exploited.
 * 
 *   Full Exploit Events:
 *   vs Actors Event:
 *   vs Enemies Event:
 *   - If all actors/enemies have been fully exploited, run this common event.
 *   - Does not work with unlimited exploits.
 * 
 *   Unlimited Exploits:
 *   - Can battlers be exploited endlessly?
 * 
 *   JS: On Exploited:
 *   - Code used when the target has been exploited.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Exploiter Effects Settings
 * ============================================================================
 *
 * These are effects for the battlers doing the exploiting. Change how you want
 * exploiter battlers to behave here.
 *
 * ---
 *
 * Mechanics
 * 
 *   Added States:
 *   - A list of the states that are added when a user exploits a foe.
 * 
 *   Extra Actions:
 *   - Successfully exploiting an enemy will grant the user this many
 *     extra actions.
 * 
 *   Multiple Exploits:
 *   - Can battlers exploit opponents multiple times with one action?
 * 
 *   JS: On Exploiting:
 *   - Code used when the user is exploiting a foe's weakness.
 *
 * ---
 *
 * Animation
 * 
 *   Animation ID:
 *   - Play this animation when the effect activates.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text displayed upon the effect activating.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Turn Order Settings
 * ============================================================================
 *
 * Turn Order Display settings used for Battle System STB. These adjust how the
 * visible turn order appears in-game.
 *
 * ---
 *
 * General
 * 
 *   Display Position:
 *   - Select where the Turn Order will appear on the screen.
 * 
 *     Offset X:
 *     - How much to offset the X coordinate by.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - How much to offset the Y coordinate by.
 *     - Negative: up. Positive: down.
 * 
 *   Center Horizontal?:
 *   - Reposition the Turn Order Display to always be centered if it is a
 *     'top' or 'bottom' position?
 * 
 *   Reposition for Help?:
 *   - If the display position is at the top, reposition the display when the
 *     help window is open?
 * 
 *   Reposition Log?:
 *   - If the display position is at the top, reposition the Battle Log Window
 *     to be lower?
 * 
 *   Forward Direction:
 *   - Decide on the direction of the Turn Order.
 *   - Settings may vary depending on position.
 *   - Left to Right / Down to Up
 *   - Right to Left / Up to Down
 * 
 *   Subject Distance:
 *   - How far do you want the currently active battler to distance itself from
 *     the rest of the Turn Order?
 * 
 *   Screen Buffer:
 *   - What distance do you want the display to be away from the edge of the
 *     screen by?
 *
 * ---
 *
 * Reposition For Help
 * 
 *   Repostion X By:
 *   Repostion Y By:
 *   - Reposition the display's coordinates by this much when the Help Window
 *     is visible.
 *
 * ---
 *
 * Slots
 * 
 *   Max Horizontal:
 *   - Maximum slots you want to display for top and bottom Turn Order Display
 *     positions?
 * 
 *   Max Vertical:
 *   - Maximum slots you want to display for left and right Turn Order Display
 *     positions?
 * 
 *   Length:
 *   - How many pixels long should the slots be on the Turn Order display?
 * 
 *   Thin:
 *   - How many pixels thin should the slots be on the Turn Order display?
 * 
 *   Update Frames:
 *   - How many frames should it take for the slots to update their
 *     positions by?
 *
 * ---
 *
 * Slot Border
 * 
 *   Show Border?:
 *   - Show borders for the slot sprites?
 * 
 *   Border Thickness:
 *   - How many pixels thick should the colored portion of the border be?
 * 
 *   Actors
 *   Enemies
 * 
 *     Border Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Border Skin:
 *     - Optional. Place a skin on the actor/enemy borders instead of
 *       rendering them?
 *
 * ---
 *
 * Slot Sprites
 * 
 *   Actors
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the actor graphic.
 *     - Face Graphic - Show the actor's face.
 *     - Icon - Show a specified icon.
 *     - Sideview Actor - Show the actor's sideview battler.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for actors by default?
 * 
 *   Enemies
 * 
 *     Sprite Type:
 *     - Select the type of sprite used for the enemy graphic.
 *     - Face Graphic - Show a specified face graphic.
 *     - Icon - Show a specified icon.
 *     - Enemy - Show the enemy's graphic or sideview battler.
 * 
 *     Default Face Name:
 *     - Use this default face graphic if there is no specified face.
 * 
 *     Default Face Index:
 *     - Use this default face index if there is no specified index.
 * 
 *     Default Icon:
 *     - Which icon do you want to use for enemies by default?
 * 
 *     Match Hue?:
 *     - Match the hue for enemy battlers?
 *     - Does not apply if there's a sideview battler.
 *
 * ---
 *
 * Slot Letter
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the slot sprite?
 * 
 *   Font Name:
 *   - The font name used for the text of the Letter.
 *   - Leave empty to use the default game's font.
 * 
 *   Font Size:
 *   - The font size used for the text of the Letter.
 *
 * ---
 *
 * Slot Background
 * 
 *   Show Background?:
 *   - Show the background on the slot sprite?
 * 
 *   Actors
 *   Enemies
 * 
 *     Background Color 1:
 *     Background Color 2:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 * 
 *     Background Skin:
 *     - Optional. Use a skin for the actor background instead of
 *       rendering them?
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
 * Version 1.20: July 13, 2023
 * * Bug Fixes!
 * ** Fixed a bug involving auto-battle that would give infinite actions if
 *    cancelled at specific timings. Fix made by Olivia.
 * 
 * Version 1.19: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: December 15, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.17: August 18, 2022
 * * Bug Fixes!
 * ** Fixed bugs that caused the STB Turn Order faces and icons to not change
 *    properly for actors and enemies. Fix made by Olivia.
 * 
 * Version 1.16: July 7, 2022
 * * Compatibility Update!
 * ** Plugin is now updated to support larger than 8 troop sizes.
 * 
 * Version 1.15: June 9, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameter added by Olivia:
 * *** Plugin Parameters > Exploit System Settings > Forced Actions
 * **** Apply exploit system to Forced Actions?
 * **** We added this function because forced actions can disrupt player
 *      strategies when used with the exploit system.
 * 
 * Version 1.14: March 3, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.13: November 11, 2021
 * * Bug Fixes!
 * ** Critical hits for enemies with only one action per turn should now
 *    properly allow for the exploited effect to occur. Fix made by Olivia.
 * 
 * Version 1.12: October 28, 2021
 * * Bug Fixes!
 * ** Turn Order display will no longer appear at differing X and Y positions
 *    when using specific battle layouts. Update made by Olivia.
 * 
 * Version 1.11: July 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that altered the current action choice when enemies are using
 *    a skill that utilizes instants when there is only enough MP left for one
 *    of those actions. Fix made by Olivia.
 * 
 * Version 1.10: July 2, 2021
 * * Bug Fixes!
 * ** Dead battlers will no longer reappear in the turn order on subsequent
 *    turns. Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for updated features.
 * * Feature Update!
 * ** "Mechanics Settings" Plugin Parameters has been updated into
 *    "Speed Mechanics" with updated formulas that will now correlate any
 *    adjusted AGI changes made to battlers to alter the following turn
 *    properly. Update made by Olivia.
 * 
 * Version 1.09: March 26, 2021
 * * Bug Fixes!
 * ** Enemy exploit actions should now associate A.I. properly. Fix by Yanfly.
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_4_BreakShields plugin.
 * 
 * Version 1.08: March 19, 2021
 * * Feature Update!
 * ** Turn Order Window calculations slightly tweaked for times when the window
 *    layer is bigger than it should be. Update made by Olivia.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Feature Update!
 * ** A different kind of end battle check is now made to determine hiding the
 *    turn order display. Update made by Olivia.
 * 
 * Version 1.06: January 1, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Bug Fixes!
 * ** Starting battle from a surprise attack will no longer skip turn 1. And
 *    starting battle without any inputtable actors will no longer skip turn 1.
 *    Fix made by Yanfly.
 * 
 * Version 1.04: December 18, 2020
 * * Feature Update!
 * ** Enemies can now benefit from <STB Instant> skills. Update made by Olivia.
 * ** Action End States updating are now handled by Skills and States Core
 *    v1.07+ for proper intended usage. Change from Battle System - STB v1.02
 *    is reverted here to prevent triggering the update twice.
 * 
 * Version 1.03: December 4, 2020
 * * Bug Fixes!
 * ** Select Next Command no longer returns undefined. Fix made by Olivia.
 * 
 * Version 1.02: November 22, 2020
 * * Bug Fixes!
 * ** Action End States now update at the end of each individual action.
 *    Fix made by Yanfly.
 * 
 * Version 1.01: November 15, 2020
 * * Bug Fixes!
 * ** Now compatible with Party Command Window Disable from the Battle Core.
 *    Fix made by Yanfly.
 *
 * Version 1.00 Official Release Date: November 23, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorIcon
 * @text Actor: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 84
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderActorFace
 * @text Actor: Change STB Turn Order Face
 * @desc Changes the faces used for the specific actor(s) on the STB Turn Order.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Actor1
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearActorGraphic
 * @text Actor: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the actor(s).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderEnemyIcon
 * @text Enemy: Change STB Turn Order Icon
 * @desc Changes the icons used for the specific enemy(ies) on the STB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg IconIndex:num
 * @text Icon
 * @desc Changes the graphic to this icon.
 * @default 298
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderEnemyFace
 * @text Enemy: Change STB Turn Order Face
 * @desc Changes the faces used for the specific enemy(ies) on the STB Turn Order.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @arg FaceName:str
 * @text Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc This is the filename for the target face graphic.
 * @default Monster
 *
 * @arg FaceIndex:num
 * @text Face Index
 * @parent EnemySprite
 * @type number
 * @desc This is the index for the target face graphic.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command StbTurnOrderClearEnemyGraphic
 * @text Enemy: Clear STB Turn Order Graphic
 * @desc Clears the STB Turn Order graphics for the enemy(ies).
 * The settings will revert to the Plugin Parameter settings.
 *
 * @arg Enemies:arraynum
 * @text Enemy Index(es)
 * @type number[]
 * @desc Select which enemy index(es) to affect.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemTurnOrderVisibility
 * @text System: STB Turn Order Visibility
 * @desc Determine the visibility of the STB Turn Order Display.
 *
 * @arg Visible:eval
 * @text Visibility
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Changes the visibility of the STB Turn Order Display.
 * @default true
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
 * @param BattleSystemSTB
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Speed:struct
 * @text Speed Mechanics
 * @type struct<Speed>
 * @desc Determines the mechanics of the STB Battle System.
 * @default {"Speed":"","InitialSpeedJS:func":"\"// Declare Constants\\nconst user = this;\\nconst agi = user.agi;\\n\\n// Create Base Speed\\nlet speed = agi;\\n\\n// Random Speed Check\\nif (user.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\n\\n// Add Saved Speed Modifiers from Previous Round\\nspeed += user.getSTBNextTurnSpeed();\\n\\n// Return Speed\\nreturn speed;\"","NextTurnSavedSpeedJS:func":"\"// Create Speed\\nconst action = this;\\nlet speed = 0;\\n\\n// Check Object\\nif (action.item()) {\\n    speed += action.item().speed;\\n}\\n\\n// Check Attack\\nif (action.isAttack()) {\\n    speed += action.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\""}
 *
 * @param Exploit:struct
 * @text Exploit System
 * @type struct<Exploit>
 * @desc Settings for the STB's Exploit System.
 * @default {"EnableExploit:eval":"true","ExploitCritical:eval":"true","ExploitEleWeakness:eval":"true","ExploitEleRate:num":"1.05","TurnResetExploits:eval":"true"}
 *
 * @param Exploited:struct
 * @text Exploited Effects
 * @parent Exploit:struct
 * @type struct<Exploited>
 * @desc Settings for targets being Exploited.
 * @default {"Mechanics":"","AddedStates:arraynum":"[\"13\"]","FullExploitEvents":"","vsActorsFullExploit:num":"0","vsEnemiesFullExploit:num":"0","UnlimitedExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst target = this;\\nconst user = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"0","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"","TextColor:str":"0","FlashColor:eval":"[255, 255, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Exploiter:struct
 * @text Exploiter Effects
 * @parent Exploit:struct
 * @type struct<Exploiter>
 * @desc Settings for users doing the Exploiting.
 * @default {"Mechanics":"","AddedStates:arraynum":"[]","ExtraActions:num":"1","MultipleExploits:eval":"false","CustomJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = arguments[0];\\nconst action = arguments[1];\\n\\n// Perform Actions\\n\"","Animation":"","AnimationID:num":"12","Mirror:eval":"false","Mute:eval":"false","Popups":"","PopupText:str":"ONE MORE!","TextColor:str":"0","FlashColor:eval":"[255, 255, 128, 160]","FlashDuration:num":"60"}
 *
 * @param TurnOrder:struct
 * @text Turn Order Display
 * @type struct<TurnOrder>
 * @desc Turn Order Display settings used for Battle System STB.
 * @default {"General":"","DisplayPosition:str":"top","DisplayOffsetX:num":"0","DisplayOffsetY:num":"0","CenterHorz:eval":"true","RepositionTopForHelp:eval":"true","RepositionLogWindow:eval":"true","OrderDirection:eval":"true","SubjectDistance:num":"8","ScreenBuffer:num":"20","Reposition":"","RepositionTopHelpX:num":"0","RepositionTopHelpY:num":"96","Slots":"","MaxHorzSprites:num":"16","MaxVertSprites:num":"10","SpriteLength:num":"72","SpriteThin:num":"36","UpdateFrames:num":"24","Border":"","ShowMarkerBorder:eval":"true","BorderActor":"","ActorBorderColor:str":"4","ActorSystemBorder:str":"","BorderEnemy":"","EnemyBorderColor:str":"2","EnemySystemBorder:str":"","BorderThickness:num":"2","Sprite":"","ActorSprite":"","ActorBattlerType:str":"face","ActorBattlerIcon:num":"84","EnemySprite":"","EnemyBattlerType:str":"enemy","EnemyBattlerFaceName:str":"Monster","EnemyBattlerFaceIndex:num":"1","EnemyBattlerIcon:num":"298","EnemyBattlerMatchHue:eval":"true","Letter":"","EnemyBattlerDrawLetter:eval":"true","EnemyBattlerFontFace:str":"","EnemyBattlerFontSize:num":"16","Background":"","ShowMarkerBg:eval":"true","BackgroundActor":"","ActorBgColor1:str":"19","ActorBgColor2:str":"9","ActorSystemBg:str":"","BackgroundEnemy":"","EnemyBgColor1:str":"19","EnemyBgColor2:str":"18","EnemySystemBg:str":""}
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
 * Speed Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Speed:
 *
 * @param Speed
 *
 * @param InitialSpeedJS:func
 * @text JS: Finalized Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate initial speed at the start of battle.
 * @default "// Declare Constants\nconst user = this;\nconst agi = user.agi;\n\n// Create Base Speed\nlet speed = agi;\n\n// Random Speed Check\nif (user.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\n\n// Add Saved Speed Modifiers from Previous Round\nspeed += user.getSTBNextTurnSpeed();\n\n// Return Speed\nreturn speed;"
 *
 * @param NextTurnSavedSpeedJS:func
 * @text JS: Next Turn Speed
 * @parent Speed
 * @type note
 * @desc Code used to calculate speed for a following turn.
 * @default "// Create Speed\nconst action = this;\nlet speed = 0;\n\n// Check Object\nif (action.item()) {\n    speed += action.item().speed;\n}\n\n// Check Attack\nif (action.isAttack()) {\n    speed += action.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 * 
 */
/* ----------------------------------------------------------------------------
 * Exploit System Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploit:
 *
 * @param EnableExploit:eval
 * @text Enable System?
 * @parent Exploit
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the exploit system? If disabled, ignore all the 
 * mechanics regarding the Exploit System.
 * @default true
 *
 * @param ExploitCritical:eval
 * @text Critical Hits
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do critical hits exploit the opponent?
 * @default true
 *
 * @param ExploitEleWeakness:eval
 * @text Elemental Weakness
 * @parent Exploit
 * @type boolean
 * @on Exploit
 * @off Don't Exploit
 * @desc Do elemental weaknesses exploit the opponent?
 * @default true
 *
 * @param ExploitEleRate:num
 * @text Minimum Rate
 * @parent ExploitEleWeakness:eval
 * @desc What's the minimum rate needed to count as an elemental weakness?
 * @default 1.05
 *
 * @param ForcedActions:eval
 * @text Forced Actions
 * @parent Exploit
 * @type boolean
 * @on Apply
 * @off Don't Apply
 * @desc Apply exploit system to Forced Actions?
 * @default false
 *
 * @param TurnResetExploits:eval
 * @text Reset Each Turn
 * @parent Exploit
 * @type boolean
 * @on Reset Exploits
 * @off Don't Reset
 * @desc Reset exploits at the end of each turn?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Exploited Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploited:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a target is exploited.
 * @default ["13"]
 * 
 * @param FullExploitEvents
 * @text Full Exploit Events
 * @parent Mechanics
 * 
 * @param vsActorsFullExploit:num
 * @text vs Actors Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all actors have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 * 
 * @param vsEnemiesFullExploit:num
 * @text vs Enemies Event
 * @parent FullExploitEvents
 * @type common_event
 * @desc If all enemies have been fully exploited, run this common
 * event. Does not work with unlimited exploits.
 * @default 0
 *
 * @param UnlimitedExploits:eval
 * @text Unlimited Exploits
 * @parent Mechanics
 * @type boolean
 * @on Unlimited
 * @off Once Per Turn
 * @desc Can battlers be exploited endlessly?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploited
 * @parent Mechanics
 * @type note
 * @desc Code used when the target has been exploited.
 * @default "// Declare Constants\nconst target = this;\nconst user = arguments[0];\nconst action = arguments[1];\n\n// Perform Actions\n"
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 0
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default 
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Exploiter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Exploiter:
 *
 * @param Mechanics
 * 
 * @param AddedStates:arraynum
 * @text Added States
 * @parent Mechanics
 * @type state[]
 * @desc A list of the states that are added when a user exploits a foe.
 * @default []
 * 
 * @param ExtraActions:num
 * @text Extra Actions
 * @parent Mechanics
 * @type number
 * @desc Successfully exploiting an enemy will grant the user this many extra actions.
 * @default 1
 *
 * @param MultipleExploits:eval
 * @text Multiple Exploits
 * @parent Mechanics
 * @type boolean
 * @on Multiple
 * @off Once Per Action
 * @desc Can battlers exploit opponents multiple times with one action?
 * @default false
 *
 * @param CustomJS:func
 * @text JS: On Exploiting
 * @parent Mechanics
 * @type note
 * @desc Code used when the user is exploiting a foe's weakness.
 * @default ""
 *
 * @param Animation
 *
 * @param AnimationID:num
 * @text Animation ID
 * @parent Animation
 * @type animation
 * @desc Play this animation when the effect activates.
 * @default 12
 *
 * @param Mirror:eval
 * @text Mirror Animation
 * @parent Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param Mute:eval
 * @text Mute Animation
 * @parent Animation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text displayed upon the effect activating.
 * @default ONE MORE!
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 255, 128, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Turn Order Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TurnOrder:
 *
 * @param General
 *
 * @param DisplayPosition:str
 * @text Display Position
 * @parent General
 * @type select
 * @option top
 * @option bottom
 * @option left
 * @option right
 * @desc Select where the Turn Order will appear on the screen.
 * @default top
 * 
 * @param DisplayOffsetX:num
 * @text Offset X
 * @parent DisplayPosition:str
 * @desc How much to offset the X coordinate by.
 * Negative: left. Positive: right.
 * @default 0
 * 
 * @param DisplayOffsetY:num
 * @text Offset Y
 * @parent DisplayPosition:str
 * @desc How much to offset the Y coordinate by.
 * Negative: up. Positive: down.
 * @default 0
 *
 * @param CenterHorz:eval
 * @text Center Horizontal?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Center
 * @off Stay
 * @desc Reposition the Turn Order Display to always be centered
 * if it is a 'top' or 'bottom' position?
 * @default true
 *
 * @param RepositionTopForHelp:eval
 * @text Reposition for Help?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * display when the help window is open?
 * @default true
 *
 * @param RepositionLogWindow:eval
 * @text Reposition Log?
 * @parent DisplayPosition:str
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc If the display position is at the top, reposition the
 * Battle Log Window to be lower?
 * @default true
 *
 * @param OrderDirection:eval
 * @text Forward Direction
 * @parent General
 * @type boolean
 * @on Left to Right / Down to Up
 * @off Right to Left / Up to Down
 * @desc Decide on the direction of the Turn Order.
 * Settings may vary depending on position.
 * @default true
 *
 * @param SubjectDistance:num
 * @text Subject Distance
 * @parent General
 * @type number
 * @desc How far do you want the currently active battler to
 * distance itself from the rest of the Turn Order?
 * @default 8
 *
 * @param ScreenBuffer:num
 * @text Screen Buffer
 * @parent General
 * @type number
 * @desc What distance do you want the display to be away
 * from the edge of the screen by?
 * @default 20
 * 
 * @param Reposition
 * @text Reposition For Help
 *
 * @param RepositionTopHelpX:num
 * @text Repostion X By
 * @parent Reposition
 * @desc Reposition the display's X coordinates by this much when
 * the Help Window is visible.
 * @default 0
 *
 * @param RepositionTopHelpY:num
 * @text Repostion Y By
 * @parent Reposition
 * @desc Reposition the display's Y coordinates by this much when
 * the Help Window is visible.
 * @default 96
 * 
 * @param Slots
 *
 * @param MaxHorzSprites:num
 * @text Max Horizontal
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for top and
 * bottom Turn Order Display positions?
 * @default 16
 *
 * @param MaxVertSprites:num
 * @text Max Vertical
 * @parent Slots
 * @type number
 * @min 1
 * @desc Maximum slots you want to display for left and
 * right Turn Order Display positions?
 * @default 10
 *
 * @param SpriteLength:num
 * @text Length
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels long should the slots be on the
 * Turn Order display?
 * @default 72
 *
 * @param SpriteThin:num
 * @text Thin
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many pixels thin should the slots be on the
 * Turn Order display?
 * @default 36
 *
 * @param UpdateFrames:num
 * @text Update Frames
 * @parent Slots
 * @type number
 * @min 1
 * @desc How many frames should it take for the slots to
 * update their positions by?
 * @default 24
 *
 * @param Border
 * @text Slot Border
 *
 * @param ShowMarkerBorder:eval
 * @text Show Border?
 * @parent Border
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show borders for the slot sprites?
 * @default true
 *
 * @param BorderThickness:num
 * @text Border Thickness
 * @parent Markers
 * @type number
 * @min 1
 * @desc How many pixels thick should the colored portion of the border be?
 * @default 2
 *
 * @param BorderActor
 * @text Actors
 * @parent Border
 *
 * @param ActorBorderColor:str
 * @text Border Color
 * @parent BorderActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 4
 *
 * @param ActorSystemBorder:str
 * @text Border Skin
 * @parent BorderActor
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the actor borders instead of rendering them?
 * @default 
 *
 * @param BorderEnemy
 * @text Enemies
 * @parent Border
 *
 * @param EnemyBorderColor:str
 * @text Border Color
 * @parent BorderEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param EnemySystemBorder:str
 * @text Border Skin
 * @parent BorderEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Place a skin on the enemy borders instead of rendering them?
 * @default 
 *
 * @param Sprite
 * @text Slot Sprites
 *
 * @param ActorSprite
 * @text Actors
 * @parent Sprite
 *
 * @param ActorBattlerType:str
 * @text Sprite Type
 * @parent ActorSprite
 * @type select
 * @option Face Graphic - Show the actor's face.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Sideview Actor - Show the actor's sideview battler.
 * @value svactor
 * @desc Select the type of sprite used for the actor graphic.
 * @default face
 *
 * @param ActorBattlerIcon:num
 * @text Default Icon
 * @parent ActorSprite
 * @desc Which icon do you want to use for actors by default?
 * @default 84
 *
 * @param EnemySprite
 * @text Enemies
 * @parent Sprite
 *
 * @param EnemyBattlerType:str
 * @text Sprite Type
 * @parent EnemySprite
 * @type select
 * @option Face Graphic - Show a specified face graphic.
 * @value face
 * @option Icon - Show a specified icon.
 * @value icon
 * @option Enemy - Show the enemy's graphic or sideview battler.
 * @value enemy
 * @desc Select the type of sprite used for the enemy graphic.
 * @default enemy
 *
 * @param EnemyBattlerFaceName:str
 * @text Default Face Name
 * @parent EnemySprite
 * @type file
 * @dir img/faces/
 * @desc Use this default face graphic if there is no specified face.
 * @default Monster
 *
 * @param EnemyBattlerFaceIndex:num
 * @text Default Face Index
 * @parent EnemySprite
 * @type number
 * @desc Use this default face index if there is no specified index.
 * @default 1
 *
 * @param EnemyBattlerIcon:num
 * @text Default Icon
 * @parent EnemySprite
 * @desc Which icon do you want to use for enemies by default?
 * @default 298
 *
 * @param EnemyBattlerMatchHue:eval
 * @text Match Hue?
 * @parent EnemySprite
 * @type boolean
 * @on Match
 * @off Don't Match
 * @desc Match the hue for enemy battlers?
 * Does not apply if there's a sideview battler.
 * @default true
 *
 * @param Letter
 * @text Slot Letter
 *
 * @param EnemyBattlerDrawLetter:eval
 * @text Show Enemy Letter?
 * @parent Letter
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the slot sprite?
 * @default true
 *
 * @param EnemyBattlerFontFace:str
 * @text Font Name
 * @parent Letter
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param EnemyBattlerFontSize:num
 * @text Font Size
 * @parent Letter
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 * @param Background
 * @text Slot Background
 *
 * @param ShowMarkerBg:eval
 * @text Show Background?
 * @parent Background
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the background on the slot sprite?
 * @default true
 *
 * @param BackgroundActor
 * @text Actors
 * @parent Background
 *
 * @param ActorBgColor1:str
 * @text Background Color 1
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ActorBgColor2:str
 * @text Background Color 2
 * @parent BackgroundActor
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 9
 *
 * @param ActorSystemBg:str
 * @text Background Skin
 * @parent BackgroundActor
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the actor background instead of rendering them?
 * @default 
 *
 * @param BackgroundEnemy
 * @text Enemies
 * @parent Background
 *
 * @param EnemyBgColor1:str
 * @text Background Color 1
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param EnemyBgColor2:str
 * @text Background Color 2
 * @parent BackgroundEnemy
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param EnemySystemBg:str
 * @text Background Skin
 * @parent BackgroundEnemy
 * @type file
 * @dir img/system/
 * @desc Optional. Use a skin for the enemy background instead of rendering them?
 * @default 
 *
 */
//=============================================================================

const _0x4e4f4b=_0x579a;(function(_0x46aa83,_0x31573b){const _0x4fe7a9=_0x579a,_0x50f630=_0x46aa83();while(!![]){try{const _0x20a455=parseInt(_0x4fe7a9(0x2d6))/0x1*(-parseInt(_0x4fe7a9(0x156))/0x2)+-parseInt(_0x4fe7a9(0x187))/0x3*(parseInt(_0x4fe7a9(0x296))/0x4)+parseInt(_0x4fe7a9(0x2b3))/0x5+parseInt(_0x4fe7a9(0x12d))/0x6*(-parseInt(_0x4fe7a9(0x223))/0x7)+parseInt(_0x4fe7a9(0x169))/0x8+parseInt(_0x4fe7a9(0x2cc))/0x9+-parseInt(_0x4fe7a9(0x2f5))/0xa*(-parseInt(_0x4fe7a9(0x214))/0xb);if(_0x20a455===_0x31573b)break;else _0x50f630['push'](_0x50f630['shift']());}catch(_0x147bdf){_0x50f630['push'](_0x50f630['shift']());}}}(_0x4813,0x4e77c));var label=_0x4e4f4b(0x14f),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4e4f4b(0x21b)](function(_0x36491e){const _0x41d8da=_0x4e4f4b;return _0x36491e['status']&&_0x36491e[_0x41d8da(0x2fd)][_0x41d8da(0x226)]('['+label+']');})[0x0];function _0x579a(_0x3d2ec8,_0x4b7052){const _0x481337=_0x4813();return _0x579a=function(_0x579a46,_0x448eb6){_0x579a46=_0x579a46-0x10e;let _0x338b16=_0x481337[_0x579a46];return _0x338b16;},_0x579a(_0x3d2ec8,_0x4b7052);}VisuMZ[label][_0x4e4f4b(0x2f1)]=VisuMZ[label][_0x4e4f4b(0x2f1)]||{},VisuMZ[_0x4e4f4b(0x30a)]=function(_0x964615,_0x3b43b0){const _0x39908a=_0x4e4f4b;for(const _0x3f19f3 in _0x3b43b0){if(_0x3f19f3['match'](/(.*):(.*)/i)){const _0x2e8749=String(RegExp['$1']),_0x468080=String(RegExp['$2'])['toUpperCase']()[_0x39908a(0x1bf)]();let _0x3ed90e,_0x3a18f9,_0x26edb9;switch(_0x468080){case _0x39908a(0x2df):_0x3ed90e=_0x3b43b0[_0x3f19f3]!==''?Number(_0x3b43b0[_0x3f19f3]):0x0;break;case _0x39908a(0x2d3):_0x3a18f9=_0x3b43b0[_0x3f19f3]!==''?JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3]):[],_0x3ed90e=_0x3a18f9['map'](_0x5c6709=>Number(_0x5c6709));break;case _0x39908a(0x1aa):_0x3ed90e=_0x3b43b0[_0x3f19f3]!==''?eval(_0x3b43b0[_0x3f19f3]):null;break;case _0x39908a(0x252):_0x3a18f9=_0x3b43b0[_0x3f19f3]!==''?JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3]):[],_0x3ed90e=_0x3a18f9[_0x39908a(0x1d0)](_0x3a0cbf=>eval(_0x3a0cbf));break;case _0x39908a(0x230):_0x3ed90e=_0x3b43b0[_0x3f19f3]!==''?JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3]):'';break;case _0x39908a(0x2a5):_0x3a18f9=_0x3b43b0[_0x3f19f3]!==''?JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3]):[],_0x3ed90e=_0x3a18f9['map'](_0x1aa482=>JSON[_0x39908a(0x2dc)](_0x1aa482));break;case _0x39908a(0x1a0):_0x3ed90e=_0x3b43b0[_0x3f19f3]!==''?new Function(JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3])):new Function('return\x200');break;case _0x39908a(0x198):_0x3a18f9=_0x3b43b0[_0x3f19f3]!==''?JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3]):[],_0x3ed90e=_0x3a18f9[_0x39908a(0x1d0)](_0x4d972d=>new Function(JSON[_0x39908a(0x2dc)](_0x4d972d)));break;case _0x39908a(0x27b):_0x3ed90e=_0x3b43b0[_0x3f19f3]!==''?String(_0x3b43b0[_0x3f19f3]):'';break;case'ARRAYSTR':_0x3a18f9=_0x3b43b0[_0x3f19f3]!==''?JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3]):[],_0x3ed90e=_0x3a18f9[_0x39908a(0x1d0)](_0x39ce51=>String(_0x39ce51));break;case _0x39908a(0x306):_0x26edb9=_0x3b43b0[_0x3f19f3]!==''?JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3]):{},_0x3ed90e=VisuMZ[_0x39908a(0x30a)]({},_0x26edb9);break;case _0x39908a(0x18f):_0x3a18f9=_0x3b43b0[_0x3f19f3]!==''?JSON[_0x39908a(0x2dc)](_0x3b43b0[_0x3f19f3]):[],_0x3ed90e=_0x3a18f9[_0x39908a(0x1d0)](_0x2bcb1b=>VisuMZ['ConvertParams']({},JSON[_0x39908a(0x2dc)](_0x2bcb1b)));break;default:continue;}_0x964615[_0x2e8749]=_0x3ed90e;}}return _0x964615;},(_0x19e1c7=>{const _0x2e2dfd=_0x4e4f4b,_0x281121=_0x19e1c7[_0x2e2dfd(0x217)];for(const _0x307eb2 of dependencies){if(!Imported[_0x307eb2]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x2e2dfd(0x1bd)](_0x281121,_0x307eb2)),SceneManager[_0x2e2dfd(0x1e5)]();break;}}const _0xd080f9=_0x19e1c7[_0x2e2dfd(0x2fd)];if(_0xd080f9[_0x2e2dfd(0x119)](/\[Version[ ](.*?)\]/i)){if(_0x2e2dfd(0x16f)===_0x2e2dfd(0x2eb)){const _0x575088=_0x4fb904[_0x2e2dfd(0x13e)];_0x575088>0x0&&_0x54c011[_0x575088]&&_0x25df67[_0x2e2dfd(0x298)](_0x575088);}else{const _0x1d4703=Number(RegExp['$1']);if(_0x1d4703!==VisuMZ[label][_0x2e2dfd(0x248)]){if('HgRgX'===_0x2e2dfd(0x166))alert(_0x2e2dfd(0x2b5)[_0x2e2dfd(0x1bd)](_0x281121,_0x1d4703)),SceneManager[_0x2e2dfd(0x1e5)]();else return _0x32ec1b[_0x2e2dfd(0x2f1)][_0x2e2dfd(0x164)];}}}if(_0xd080f9[_0x2e2dfd(0x119)](/\[Tier[ ](\d+)\]/i)){const _0x5c5623=Number(RegExp['$1']);if(_0x5c5623<tier){if('VENVs'!==_0x2e2dfd(0x189))return this[_0x2e2dfd(0x2c0)]===_0x2947b0&&this[_0x2e2dfd(0x27f)](),this[_0x2e2dfd(0x2c0)];else alert(_0x2e2dfd(0x235)[_0x2e2dfd(0x1bd)](_0x281121,_0x5c5623,tier)),SceneManager[_0x2e2dfd(0x1e5)]();}else{if('KdYDs'!==_0x2e2dfd(0x12b))tier=Math[_0x2e2dfd(0x2e6)](_0x5c5623,tier);else{if(!_0xd23e2[_0x2e2dfd(0x210)]())return;this[_0x2e2dfd(0x140)]();const _0x127161=new _0x4a092a(this);this[_0x2e2dfd(0x2a6)](0x0);}}}VisuMZ[_0x2e2dfd(0x30a)](VisuMZ[label][_0x2e2dfd(0x2f1)],_0x19e1c7[_0x2e2dfd(0x2e5)]);})(pluginData),PluginManager['registerCommand'](pluginData[_0x4e4f4b(0x217)],_0x4e4f4b(0x282),_0x41cf44=>{const _0x12959c=_0x4e4f4b;VisuMZ['ConvertParams'](_0x41cf44,_0x41cf44);const _0x33d52f=_0x41cf44[_0x12959c(0x115)],_0x4275fa=_0x41cf44[_0x12959c(0x2f7)];for(const _0xef178 of _0x33d52f){if(_0x12959c(0x11e)===_0x12959c(0x2a8)){const _0x245d32=this[_0x12959c(0x302)]();if(this['_position']===_0x245d32)return;this[_0x12959c(0x305)]=_0x245d32;this[_0x12959c(0x1f9)]<0xff&&this[_0x12959c(0x185)]()&&_0x245d32!==this['defaultPosition']()&&this[_0x12959c(0x130)](0xff);if(_0x245d32===this[_0x12959c(0x179)]()&&this[_0x12959c(0x23d)]<=0x0&&this[_0x12959c(0x1f9)]>0x0)this[_0x12959c(0x130)](0x0);else this['_fadeDuration']<=0x0&&this[_0x12959c(0x1f9)]<0xff&&this['checkOpacity']();this[_0x12959c(0x2fe)]();}else{const _0x211126=$gameActors[_0x12959c(0x249)](_0xef178);if(!_0x211126)continue;_0x211126[_0x12959c(0x14b)]=_0x12959c(0x151),_0x211126[_0x12959c(0x27a)]=_0x4275fa;}}}),PluginManager['registerCommand'](pluginData[_0x4e4f4b(0x217)],_0x4e4f4b(0x19b),_0x5d879b=>{const _0x530e68=_0x4e4f4b;VisuMZ['ConvertParams'](_0x5d879b,_0x5d879b);const _0x3e32b6=_0x5d879b['Actors'],_0x12e0de=_0x5d879b[_0x530e68(0x110)],_0x26a240=_0x5d879b[_0x530e68(0x124)];for(const _0x349283 of _0x3e32b6){const _0x3b1fb6=$gameActors['actor'](_0x349283);if(!_0x3b1fb6)continue;_0x3b1fb6[_0x530e68(0x14b)]=_0x530e68(0x2a9),_0x3b1fb6[_0x530e68(0x257)]=_0x12e0de,_0x3b1fb6[_0x530e68(0x1f8)]=_0x26a240;}}),PluginManager['registerCommand'](pluginData[_0x4e4f4b(0x217)],_0x4e4f4b(0x16c),_0x391fa7=>{const _0x2b852d=_0x4e4f4b;VisuMZ[_0x2b852d(0x30a)](_0x391fa7,_0x391fa7);const _0x280a25=_0x391fa7[_0x2b852d(0x115)];for(const _0x464aff of _0x280a25){const _0x291d60=$gameActors['actor'](_0x464aff);if(!_0x291d60)continue;_0x291d60[_0x2b852d(0x196)]();}}),PluginManager[_0x4e4f4b(0x1ed)](pluginData[_0x4e4f4b(0x217)],_0x4e4f4b(0x1d2),_0x43b3cc=>{const _0x4158a6=_0x4e4f4b;VisuMZ['ConvertParams'](_0x43b3cc,_0x43b3cc);const _0x5b5e47=_0x43b3cc[_0x4158a6(0x2d7)],_0x5ce7aa=_0x43b3cc[_0x4158a6(0x2f7)];for(const _0x4c75b3 of _0x5b5e47){const _0x3b3c65=$gameTroop[_0x4158a6(0x1eb)]()[_0x4c75b3];if(!_0x3b3c65)continue;_0x3b3c65[_0x4158a6(0x14b)]=_0x4158a6(0x151),_0x3b3c65[_0x4158a6(0x27a)]=_0x5ce7aa;}}),PluginManager[_0x4e4f4b(0x1ed)](pluginData['name'],_0x4e4f4b(0x18c),_0x406816=>{const _0x4eb09e=_0x4e4f4b;VisuMZ[_0x4eb09e(0x30a)](_0x406816,_0x406816);const _0x21d568=_0x406816[_0x4eb09e(0x2d7)],_0x399b55=_0x406816['FaceName'],_0x2d591f=_0x406816['FaceIndex'];for(const _0x22067a of _0x21d568){const _0x3dcea3=$gameTroop[_0x4eb09e(0x1eb)]()[_0x22067a];if(!_0x3dcea3)continue;_0x3dcea3[_0x4eb09e(0x14b)]=_0x4eb09e(0x2a9),_0x3dcea3[_0x4eb09e(0x257)]=_0x399b55,_0x3dcea3[_0x4eb09e(0x1f8)]=_0x2d591f;}}),PluginManager[_0x4e4f4b(0x1ed)](pluginData[_0x4e4f4b(0x217)],_0x4e4f4b(0x2ea),_0x49eac7=>{const _0x20d0ce=_0x4e4f4b;VisuMZ[_0x20d0ce(0x30a)](_0x49eac7,_0x49eac7);const _0x25caea=_0x49eac7[_0x20d0ce(0x2d7)];for(const _0x34b325 of _0x25caea){const _0x4dd719=$gameTroop['members']()[_0x34b325];if(!_0x4dd719)continue;_0x4dd719[_0x20d0ce(0x196)]();}}),PluginManager['registerCommand'](pluginData[_0x4e4f4b(0x217)],_0x4e4f4b(0x265),_0x5391ff=>{const _0x4b0aee=_0x4e4f4b;VisuMZ[_0x4b0aee(0x30a)](_0x5391ff,_0x5391ff);const _0x390230=_0x5391ff[_0x4b0aee(0x2c3)];$gameSystem[_0x4b0aee(0x1e3)](_0x390230);}),VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x2bc)]={'Instant':/<STB (?:INSTANT|INSTANT CAST|Instant Use)>/i,'CannotBeExploited':/<STB CANNOT BE EXPLOITED>/i,'CannotBeExploiter':/<STB CANNOT BE EXPLOITER>/i,'ExploitedStates':/<STB EXPLOITED GAIN (?:STATE|STATES):[ ](.*)>/i,'ExploiterStates':/<STB EXPLOITER GAIN (?:STATE|STATES):[ ](.*)>/i},DataManager[_0x4e4f4b(0x199)]=function(_0x15d200){const _0x384086=_0x4e4f4b;_0x15d200=_0x15d200[_0x384086(0x1a9)]()[_0x384086(0x1bf)](),this['_stateIDs']=this[_0x384086(0x1d5)]||{};if(this[_0x384086(0x1d5)][_0x15d200])return this['_stateIDs'][_0x15d200];for(const _0x118073 of $dataStates){if(!_0x118073)continue;this[_0x384086(0x1d5)][_0x118073[_0x384086(0x217)][_0x384086(0x1a9)]()[_0x384086(0x1bf)]()]=_0x118073['id'];}return this[_0x384086(0x1d5)][_0x15d200]||0x0;},ImageManager[_0x4e4f4b(0x20a)]=ImageManager['svActorHorzCells']||0x9,ImageManager[_0x4e4f4b(0x1d1)]=ImageManager[_0x4e4f4b(0x1d1)]||0x6,SceneManager['isSceneBattle']=function(){const _0x4fcc66=_0x4e4f4b;return this[_0x4fcc66(0x276)]&&this[_0x4fcc66(0x276)][_0x4fcc66(0x13f)]===Scene_Battle;},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x295)]=BattleManager['battleSys'],BattleManager['battleSys']=function(){const _0x46db57=_0x4e4f4b;if(this['isSTB']())return'STB';return VisuMZ['BattleSystemSTB'][_0x46db57(0x295)][_0x46db57(0x186)](this);},BattleManager['isSTB']=function(){const _0x513024=_0x4e4f4b;return $gameSystem['getBattleSystem']()===_0x513024(0x207);},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x133)]=BattleManager['isTpb'],BattleManager[_0x4e4f4b(0x244)]=function(){const _0x31e641=_0x4e4f4b;if(this[_0x31e641(0x210)]())return![];return VisuMZ[_0x31e641(0x14f)][_0x31e641(0x133)][_0x31e641(0x186)](this);},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x1a1)]=BattleManager['isActiveTpb'],BattleManager['isActiveTpb']=function(){const _0x490fca=_0x4e4f4b;if(this[_0x490fca(0x210)]())return![];return VisuMZ[_0x490fca(0x14f)][_0x490fca(0x1a1)]['call'](this);},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x204)]=BattleManager['isTurnBased'],BattleManager['isTurnBased']=function(){const _0x57df1f=_0x4e4f4b;if(this[_0x57df1f(0x210)]())return!![];return VisuMZ[_0x57df1f(0x14f)][_0x57df1f(0x204)]['call'](this);},VisuMZ[_0x4e4f4b(0x14f)]['BattleManager_startInput']=BattleManager[_0x4e4f4b(0x2cf)],BattleManager[_0x4e4f4b(0x2cf)]=function(){const _0x14ee9c=_0x4e4f4b;VisuMZ['BattleSystemSTB'][_0x14ee9c(0x183)]['call'](this);if(this['isSTB']()&&$gameParty[_0x14ee9c(0x22c)]()&&!this[_0x14ee9c(0x1e8)])this[_0x14ee9c(0x2be)]();},BattleManager[_0x4e4f4b(0x2be)]=function(){this['startTurn']();},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x1fc)]=BattleManager[_0x4e4f4b(0x118)],BattleManager[_0x4e4f4b(0x118)]=function(){const _0x1286fa=_0x4e4f4b;this['isSTB']()?this[_0x1286fa(0x114)]():VisuMZ['BattleSystemSTB'][_0x1286fa(0x1fc)]['call'](this);},BattleManager[_0x4e4f4b(0x114)]=function(){const _0x2e636e=_0x4e4f4b,_0x45228b=this[_0x2e636e(0x273)];if(_0x45228b[_0x2e636e(0x288)]()&&_0x45228b[_0x2e636e(0x22c)]()){if('aHFdp'===_0x2e636e(0x2da)){if(this[_0x2e636e(0x113)]()&&this['currentAction']()[_0x2e636e(0x19c)]())return!![];}else{const _0x319b21=_0x45228b['currentAction']();if(!_0x319b21){if(_0x2e636e(0x1fb)===_0x2e636e(0x1fb))VisuMZ[_0x2e636e(0x14f)][_0x2e636e(0x1fc)][_0x2e636e(0x186)](this);else return _0x3a3663['Settings']['EnemyBattlerFaceIndex'];}else _0x319b21[_0x2e636e(0x208)]?VisuMZ[_0x2e636e(0x14f)]['BattleManager_processTurn'][_0x2e636e(0x186)](this):(this[_0x2e636e(0x268)]=_0x45228b,this[_0x2e636e(0x2f4)]());}}else _0x2e636e(0x2b9)===_0x2e636e(0x243)?_0x16b4c0=!![]:VisuMZ['BattleSystemSTB'][_0x2e636e(0x1fc)][_0x2e636e(0x186)](this);},VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x272)]=BattleManager[_0x4e4f4b(0x15f)],BattleManager[_0x4e4f4b(0x15f)]=function(){const _0x161b39=_0x4e4f4b;if(this['isSTB']()){if(_0x161b39(0x21e)===_0x161b39(0x21e))VisuMZ[_0x161b39(0x14f)][_0x161b39(0x1fc)][_0x161b39(0x186)](this);else{const _0x188850=new _0x2c08bb();_0x188850[_0x161b39(0x25c)]['x']=this[_0x161b39(0x25c)]['x'],_0x188850[_0x161b39(0x25c)]['y']=this['anchor']['y'],this[_0x161b39(0x11d)]=_0x188850,this[_0x161b39(0x283)](this[_0x161b39(0x11d)]),this['processUpdateGraphic']();}}else'CLFhn'!==_0x161b39(0x10f)?(this[_0x161b39(0x200)](),this[_0x161b39(0x1be)]=0x0,this[_0x161b39(0x28a)](),this['opacity']=this[_0x161b39(0x1c7)]):VisuMZ['BattleSystemSTB'][_0x161b39(0x272)][_0x161b39(0x186)](this);},VisuMZ[_0x4e4f4b(0x14f)]['BattleManager_selectNextActor']=BattleManager[_0x4e4f4b(0x176)],BattleManager[_0x4e4f4b(0x176)]=function(){const _0x3c563a=_0x4e4f4b;this[_0x3c563a(0x210)]()?_0x3c563a(0x304)!==_0x3c563a(0x304)?(_0x538a49[_0x3c563a(0x14f)][_0x3c563a(0x19a)][_0x3c563a(0x186)](this),this[_0x3c563a(0x172)]()):this[_0x3c563a(0x14c)]():VisuMZ['BattleSystemSTB'][_0x3c563a(0x24d)][_0x3c563a(0x186)](this);},BattleManager[_0x4e4f4b(0x14c)]=function(){const _0x1b688b=_0x4e4f4b;this['_currentActor']=null,this[_0x1b688b(0x18b)]=![];},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x21f)]=BattleManager[_0x4e4f4b(0x251)],BattleManager[_0x4e4f4b(0x251)]=function(){const _0x330901=_0x4e4f4b;VisuMZ[_0x330901(0x14f)][_0x330901(0x21f)][_0x330901(0x186)](this),this[_0x330901(0x2ce)]();},BattleManager['endActionSTB']=function(){const _0x53cd06=_0x4e4f4b;if(!this['isSTB']())return;this[_0x53cd06(0x11f)]();this[_0x53cd06(0x11b)][_0x53cd06(0x2a3)]>0x0&&(this[_0x53cd06(0x273)]&&(!this['_actionBattlers'][_0x53cd06(0x226)](this[_0x53cd06(0x273)])&&this[_0x53cd06(0x22e)][_0x53cd06(0x254)](this['_subject'])),this[_0x53cd06(0x273)]=this[_0x53cd06(0x274)]());;},BattleManager[_0x4e4f4b(0x23a)]=function(){const _0xa2da6c=_0x4e4f4b;return VisuMZ[_0xa2da6c(0x14f)][_0xa2da6c(0x2f1)][_0xa2da6c(0x120)][_0xa2da6c(0x2a1)];},BattleManager[_0x4e4f4b(0x181)]=function(){const _0x26d6c9=_0x4e4f4b,_0x12ce79=$gameParty['aliveMembers']()[_0x26d6c9(0x21b)](_0x4fd825=>_0x4fd825['isAppeared']()),_0x434eaf=_0x12ce79[_0x26d6c9(0x21b)](_0x2c26e9=>_0x2c26e9[_0x26d6c9(0x247)]());return _0x12ce79[_0x26d6c9(0x2a3)]===_0x434eaf['length'];},BattleManager['areAllEnemiesExploited']=function(){const _0x1650df=_0x4e4f4b,_0x52b9d5=$gameTroop[_0x1650df(0x16d)]()['filter'](_0x52d8f3=>_0x52d8f3[_0x1650df(0x24f)]()),_0x4c97e6=_0x52b9d5['filter'](_0x47544c=>_0x47544c[_0x1650df(0x247)]());return _0x52b9d5[_0x1650df(0x2a3)]===_0x4c97e6['length'];},VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x237)]=BattleManager[_0x4e4f4b(0x2f3)],BattleManager['makeActionOrders']=function(){const _0x3819d6=_0x4e4f4b;VisuMZ['BattleSystemSTB'][_0x3819d6(0x237)][_0x3819d6(0x186)](this),this[_0x3819d6(0x210)]()&&(this[_0x3819d6(0x11f)](),this[_0x3819d6(0x26d)](),this['clearNextTurnSpeedSTB']());},BattleManager[_0x4e4f4b(0x11f)]=function(){const _0x425038=_0x4e4f4b;if(!this[_0x425038(0x210)]())return;this[_0x425038(0x22e)]=this[_0x425038(0x22e)]||[],this[_0x425038(0x22e)]=this[_0x425038(0x22e)][_0x425038(0x21b)](_0x3210dc=>_0x3210dc&&_0x3210dc[_0x425038(0x24f)]()&&_0x3210dc['isAlive']()),this[_0x425038(0x26d)]();},BattleManager['updateTurnOrderSTB']=function(_0x42a82d){const _0x598152=_0x4e4f4b;if(!this[_0x598152(0x210)]())return;const _0x496533=SceneManager[_0x598152(0x276)][_0x598152(0x202)];if(!_0x496533)return;_0x496533['updateTurnOrder'](_0x42a82d);},BattleManager['clearNextTurnSpeedSTB']=function(){const _0x119586=_0x4e4f4b;for(const _0x125e5c of this[_0x119586(0x14a)]()){if(_0x119586(0x26f)==='COiAx'){const _0x3bdfa9=this['battler']();if(!_0x3bdfa9)return;const _0x458e6f=_0x3bdfa9[_0x119586(0x185)]();if(!_0x458e6f)return;const _0x2b8b1f=_0x458e6f[_0x119586(0x2cb)]();if(!_0x2b8b1f)return;this[_0x119586(0x25b)](_0x2b8b1f[_0x119586(0x13c)]);}else{if(!_0x125e5c)continue;_0x125e5c[_0x119586(0x2a6)](0x0);}}},VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x188)]=Game_System[_0x4e4f4b(0x135)][_0x4e4f4b(0x212)],Game_System[_0x4e4f4b(0x135)][_0x4e4f4b(0x212)]=function(){const _0x1538a9=_0x4e4f4b;VisuMZ[_0x1538a9(0x14f)][_0x1538a9(0x188)][_0x1538a9(0x186)](this),this[_0x1538a9(0x27f)]();},Game_System[_0x4e4f4b(0x135)][_0x4e4f4b(0x27f)]=function(){this['_stbTurnOrderVisible']=!![];},Game_System[_0x4e4f4b(0x135)][_0x4e4f4b(0x192)]=function(){const _0x300c2a=_0x4e4f4b;return this[_0x300c2a(0x2c0)]===undefined&&this['initBattleSystemSTB'](),this['_stbTurnOrderVisible'];},Game_System[_0x4e4f4b(0x135)][_0x4e4f4b(0x1e3)]=function(_0x255985){const _0x5dbe4e=_0x4e4f4b;this[_0x5dbe4e(0x2c0)]===undefined&&('IOVtE'===_0x5dbe4e(0x20d)?(this['x']=this[_0x5dbe4e(0x256)]+(_0x51e31f[_0x5dbe4e(0x2e9)]||0x0),this['y']=this[_0x5dbe4e(0x21d)]+(_0x841674[_0x5dbe4e(0x30b)]||0x0)):this['initBattleSystemSTB']()),this['_stbTurnOrderVisible']=_0x255985;},VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x213)]=Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x167)],Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x167)]=function(){const _0x54ce3c=_0x4e4f4b;if(BattleManager['isSTB']()){if('aznvM'!=='IAaRs')return 0x0;else{const _0x363935=this[_0x54ce3c(0x1ce)](),_0x853f08=this['bitmapHeight']();_0x3e5ebf[_0x54ce3c(0x255)]=new _0x5a4464(_0x363935,_0x853f08);const _0x4f0239=_0x2ed5f0[_0x54ce3c(0x263)](_0x436169[_0x54ce3c(0x301)[_0x54ce3c(0x1bd)](_0x54e561)]),_0x44668a=_0x2c7165[_0x54ce3c(0x263)](_0x2232b3['%1BgColor2'[_0x54ce3c(0x1bd)](_0x42a993)]);_0x1c0386[_0x54ce3c(0x255)][_0x54ce3c(0x1a6)](0x0,0x0,_0x363935,_0x853f08,_0x4f0239,_0x44668a,!![]);}}else return VisuMZ[_0x54ce3c(0x14f)][_0x54ce3c(0x213)][_0x54ce3c(0x186)](this);},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x28b)]=Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x180)],Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x180)]=function(){const _0x416169=_0x4e4f4b;VisuMZ[_0x416169(0x14f)]['Game_Action_applyGlobal'][_0x416169(0x186)](this),this['applyGlobalBattleSystemSTB']();},Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x2e4)]=function(){const _0x20c719=_0x4e4f4b;if(!SceneManager[_0x20c719(0x162)]())return;if(!BattleManager['isSTB']())return;const _0x1d0102=this[_0x20c719(0x2d4)](),_0x4f8c4d=VisuMZ[_0x20c719(0x14f)][_0x20c719(0x2bc)],_0x5e8be9=VisuMZ['BattleSystemSTB'][_0x20c719(0x2f1)][_0x20c719(0x233)];_0x1d0102&&_0x1d0102[_0x20c719(0x1f0)][_0x20c719(0x119)](_0x4f8c4d['Instant'])&&this['subject']()[_0x20c719(0x267)](0x1);const _0x528c0c=_0x5e8be9[_0x20c719(0x2c6)][_0x20c719(0x186)](this);this[_0x20c719(0x23c)]()[_0x20c719(0x30c)](_0x528c0c);},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x229)]=Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x2b4)],Game_Action['prototype'][_0x4e4f4b(0x2b4)]=function(){const _0x3781cb=_0x4e4f4b;VisuMZ['BattleSystemSTB'][_0x3781cb(0x229)]['call'](this),this[_0x3781cb(0x241)]();},Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x241)]=function(){const _0x4bdb50=_0x4e4f4b;this[_0x4bdb50(0x218)]=![],this[_0x4bdb50(0x125)]=![];},Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x20c)]=function(){const _0x413bb4=_0x4e4f4b;return this[_0x413bb4(0x218)]===undefined&&this[_0x413bb4(0x241)](),this['_stbExploitAdvantageFlag'];},Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x28e)]=function(_0x5a0634){const _0x214619=_0x4e4f4b;this[_0x214619(0x218)]===undefined&&this[_0x214619(0x241)](),this[_0x214619(0x218)]=_0x5a0634;},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x20e)]=Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x154)],Game_Action['prototype']['executeDamage']=function(_0x3aaca3,_0x261d55){const _0x9b6ed1=_0x4e4f4b;VisuMZ[_0x9b6ed1(0x14f)][_0x9b6ed1(0x20e)][_0x9b6ed1(0x186)](this,_0x3aaca3,_0x261d55),this[_0x9b6ed1(0x1b8)](_0x3aaca3);},Game_Action[_0x4e4f4b(0x135)][_0x4e4f4b(0x1b8)]=function(_0xf716b7){const _0x157019=_0x4e4f4b;if(!SceneManager[_0x157019(0x162)]())return;if(!BattleManager[_0x157019(0x210)]())return;if(!BattleManager[_0x157019(0x23a)]())return;if(_0xf716b7[_0x157019(0x280)]()===this[_0x157019(0x23c)]()['friendsUnit']())return;const _0x5673c8=VisuMZ[_0x157019(0x14f)][_0x157019(0x2f1)]['Exploit'],_0xc7fb70=_0xf716b7[_0x157019(0x11a)]();if(!_0x5673c8['ForcedActions']&&this[_0x157019(0x2fa)])return;_0x5673c8['ExploitCritical']&&_0xc7fb70[_0x157019(0x2ef)]&&(this[_0x157019(0x23c)]()[_0x157019(0x137)](_0xf716b7,this),_0xf716b7[_0x157019(0x13d)](this['subject'](),this));if(_0x5673c8[_0x157019(0x20b)]){if('GqeRL'===_0x157019(0x2c2)){const _0x3318f6=this[_0x157019(0x2ba)](_0xf716b7);_0x3318f6>=_0x5673c8['ExploitEleRate']&&(_0x157019(0x2c9)===_0x157019(0x122)?_0x277bd7[_0x157019(0x1ad)][_0x157019(0x186)](this,_0x26dfdc,_0x1d9d86):(this[_0x157019(0x23c)]()['performSTBExploiter'](_0xf716b7,this),_0xf716b7[_0x157019(0x13d)](this[_0x157019(0x23c)](),this)));}else return _0x157019(0x2a9);}},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x19a)]=Game_BattlerBase['prototype']['initMembers'],Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x1ee)]=function(){const _0x463679=_0x4e4f4b;VisuMZ[_0x463679(0x14f)][_0x463679(0x19a)][_0x463679(0x186)](this),this[_0x463679(0x172)]();},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x172)]=function(){const _0x2cbfe9=_0x4e4f4b;this[_0x2cbfe9(0x191)](),this['clearSTBExploit']();},Game_BattlerBase[_0x4e4f4b(0x135)]['clearSTBNextTurnSpeed']=function(){this['_stbNextTurnSpeed']=0x0;},Game_BattlerBase['prototype'][_0x4e4f4b(0x1c3)]=function(){const _0x3c8eea=_0x4e4f4b;if(this['_stbNextTurnSpeed']===undefined){if(_0x3c8eea(0x1b4)==='drCwy')this[_0x3c8eea(0x172)]();else{const _0x5ff3cd=this['isActor']()?this['currentClass']()[_0x3c8eea(0x1f0)]:this[_0x3c8eea(0x1d8)]()[_0x3c8eea(0x1f0)];if(_0x5ff3cd[_0x3c8eea(0x119)](_0x49887e[_0x3c8eea(0x14f)][_0x3c8eea(0x2bc)]['ExploiterStates']))return _0x3ea640[_0x3c8eea(0x14f)][_0x3c8eea(0x1ae)](_0x208219['$1']);return _0x4c4251[_0x3c8eea(0x14f)]['Settings'][_0x3c8eea(0x2bb)]['AddedStates']||[];}}return this['_stbNextTurnSpeed'];},Game_BattlerBase['prototype'][_0x4e4f4b(0x2a6)]=function(_0xaa0025){const _0x157149=_0x4e4f4b;this[_0x157149(0x27e)]===undefined&&this['initMembersBattleSystemSTB'](),this['_stbNextTurnSpeed']=_0xaa0025;},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x30c)]=function(_0x2283e1){const _0x745cc0=_0x4e4f4b;this[_0x745cc0(0x27e)]===undefined&&this[_0x745cc0(0x172)](),_0x2283e1+=this[_0x745cc0(0x1c3)](),this[_0x745cc0(0x2a6)](_0x2283e1);},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x140)]=function(){const _0x47484a=_0x4e4f4b;this[_0x47484a(0x1a2)]=![];},Game_BattlerBase[_0x4e4f4b(0x135)]['isSTBExploited']=function(){const _0x1fadd2=_0x4e4f4b;return this[_0x1fadd2(0x1a2)]===undefined&&(_0x1fadd2(0x171)===_0x1fadd2(0x171)?this[_0x1fadd2(0x172)]():(_0x4966a4[_0x1fadd2(0x14f)][_0x1fadd2(0x17f)][_0x1fadd2(0x186)](this),_0xd2bb50['removeActionBattlersSTB']())),this[_0x1fadd2(0x1a2)];},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x194)]=function(_0x518b9d){const _0x30c0de=_0x4e4f4b;this['_stbExploited']===undefined&&(_0x30c0de(0x178)!==_0x30c0de(0x178)?(this[_0x30c0de(0x23c)]()['performSTBExploiter'](_0x1f2c03,this),_0x45c043['becomeSTBExploited'](this[_0x30c0de(0x23c)](),this)):this[_0x30c0de(0x172)]()),this[_0x30c0de(0x1a2)]=_0x518b9d;},Game_BattlerBase[_0x4e4f4b(0x135)]['stbCannotBeExploited']=function(){const _0x492be0=_0x4e4f4b,_0x518ff2=VisuMZ[_0x492be0(0x14f)][_0x492be0(0x2bc)][_0x492be0(0x211)];return this['traitObjects']()[_0x492be0(0x2a4)](_0x352477=>_0x352477[_0x492be0(0x1f0)][_0x492be0(0x119)](_0x518ff2));},Game_BattlerBase['prototype'][_0x4e4f4b(0x2b1)]=function(){const _0x5f36a2=_0x4e4f4b,_0x2204de=VisuMZ['BattleSystemSTB'][_0x5f36a2(0x2bc)][_0x5f36a2(0x128)];return this[_0x5f36a2(0x238)]()['some'](_0x2e50bf=>_0x2e50bf[_0x5f36a2(0x1f0)]['match'](_0x2204de));},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x196)]=function(){const _0x4c4e2a=_0x4e4f4b;delete this[_0x4c4e2a(0x14b)],delete this[_0x4c4e2a(0x257)],delete this[_0x4c4e2a(0x1f8)],delete this[_0x4c4e2a(0x27a)];},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x190)]=function(){const _0x476e6a=_0x4e4f4b;return this[_0x476e6a(0x14b)]===undefined&&(this[_0x476e6a(0x14b)]=this['createTurnOrderSTBGraphicType']()),this[_0x476e6a(0x14b)];},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x160)]=function(){const _0x1ef68e=_0x4e4f4b;return Window_STB_TurnOrder['Settings'][_0x1ef68e(0x261)];},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x28c)]=function(){const _0x1e5476=_0x4e4f4b;return this[_0x1e5476(0x257)]===undefined&&(this['_stbTurnOrderFaceName']=this[_0x1e5476(0x1f5)]()),this[_0x1e5476(0x257)];},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x1f5)]=function(){const _0x79ceb8=_0x4e4f4b;return Window_STB_TurnOrder['Settings'][_0x79ceb8(0x303)];},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x182)]=function(){const _0x414d5d=_0x4e4f4b;return this[_0x414d5d(0x1f8)]===undefined&&(_0x414d5d(0x24c)!==_0x414d5d(0x24c)?_0x53933b[_0x414d5d(0x210)]()?this[_0x414d5d(0x308)]():_0xbb051c[_0x414d5d(0x14f)]['Scene_Battle_commandCancel'][_0x414d5d(0x186)](this):this[_0x414d5d(0x1f8)]=this['createTurnOrderSTBGraphicFaceIndex']()),this[_0x414d5d(0x1f8)];},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x2ac)]=function(){const _0x3018c1=_0x4e4f4b;return Window_STB_TurnOrder[_0x3018c1(0x2f1)][_0x3018c1(0x153)];},Game_BattlerBase['prototype']['TurnOrderSTBGraphicIconIndex']=function(){const _0x35915e=_0x4e4f4b;return this['_stbTurnOrderIconIndex']===undefined&&(_0x35915e(0x144)==='tRUVa'?_0x23c12a=this[_0x35915e(0x1ac)][_0x35915e(0x1e1)]():this[_0x35915e(0x27a)]=this[_0x35915e(0x28d)]()),this[_0x35915e(0x27a)];},Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x28d)]=function(){const _0x21aac7=_0x4e4f4b;return Window_STB_TurnOrder[_0x21aac7(0x2f1)]['EnemyBattlerIcon'];},Game_BattlerBase['prototype'][_0x4e4f4b(0x112)]=function(_0x333d7b){this['_stbTurnOrderIconIndex']=_0x333d7b;},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x2de)]=Game_BattlerBase['prototype'][_0x4e4f4b(0x2b0)],Game_BattlerBase[_0x4e4f4b(0x135)]['hide']=function(){const _0x1b4272=_0x4e4f4b;VisuMZ[_0x1b4272(0x14f)][_0x1b4272(0x2de)]['call'](this),BattleManager[_0x1b4272(0x11f)]();},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x17f)]=Game_BattlerBase[_0x4e4f4b(0x135)][_0x4e4f4b(0x1e6)],Game_BattlerBase[_0x4e4f4b(0x135)]['appear']=function(){const _0x342dd4=_0x4e4f4b;VisuMZ['BattleSystemSTB']['Game_BattlerBase_appear']['call'](this),BattleManager[_0x342dd4(0x11f)]();},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x26e)]=Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x284)],Game_Battler['prototype'][_0x4e4f4b(0x284)]=function(){const _0x55bcb2=_0x4e4f4b;VisuMZ[_0x55bcb2(0x14f)][_0x55bcb2(0x26e)][_0x55bcb2(0x186)](this),BattleManager[_0x55bcb2(0x11f)]();},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x270)]=Game_Battler[_0x4e4f4b(0x135)]['onBattleStart'],Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x2aa)]=function(_0x2bc4e3){const _0x426e0b=_0x4e4f4b;VisuMZ[_0x426e0b(0x14f)][_0x426e0b(0x270)][_0x426e0b(0x186)](this,_0x2bc4e3),this[_0x426e0b(0x2bf)](_0x2bc4e3);},Game_Battler[_0x4e4f4b(0x135)]['onBattleStartSTB']=function(_0x4328fe){const _0xe2a852=_0x4e4f4b;if(!BattleManager[_0xe2a852(0x210)]())return;this[_0xe2a852(0x140)]();const _0x10a60e=new Game_Action(this);this[_0xe2a852(0x2a6)](0x0);},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x1f4)]=Game_Battler['prototype']['onTurnEnd'],Game_Battler['prototype'][_0x4e4f4b(0x134)]=function(){const _0x4dc38d=_0x4e4f4b;VisuMZ[_0x4dc38d(0x14f)][_0x4dc38d(0x1f4)][_0x4dc38d(0x186)](this),BattleManager['isSTB']()&&VisuMZ[_0x4dc38d(0x14f)]['Settings'][_0x4dc38d(0x120)][_0x4dc38d(0x1c0)]&&this[_0x4dc38d(0x140)]();},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x23f)]=Game_Battler[_0x4e4f4b(0x135)]['performActionEnd'],Game_Battler['prototype'][_0x4e4f4b(0x18d)]=function(){const _0x2fb0e4=_0x4e4f4b;VisuMZ[_0x2fb0e4(0x14f)][_0x2fb0e4(0x23f)][_0x2fb0e4(0x186)](this),BattleManager[_0x2fb0e4(0x210)]()&&this['performActionEndSTB']();},Game_Battler['prototype'][_0x4e4f4b(0x1de)]=function(){const _0x57b3f2=_0x4e4f4b;if(this[_0x57b3f2(0x1e2)]()>0x0&&this===BattleManager['_subject']){const _0x2e5dec=BattleManager[_0x57b3f2(0x11b)];if(_0x2e5dec[_0x57b3f2(0x2a3)]>0x0&&_0x2e5dec[0x0]!==this){if(_0x57b3f2(0x23b)===_0x57b3f2(0x23b))return;else return this['processUpdateGraphic']();}const _0x4a9e62=this[_0x57b3f2(0x185)]();if(_0x4a9e62)_0x4a9e62[_0x57b3f2(0x2ee)]();}},Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x12a)]=function(){const _0x231c93=_0x4e4f4b;return VisuMZ[_0x231c93(0x1b5)]['Settings'][_0x231c93(0x121)]['AllowRandomSpeed'];},VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x215)]=Game_Battler[_0x4e4f4b(0x135)]['makeSpeed'],Game_Battler['prototype'][_0x4e4f4b(0x15e)]=function(){const _0x48b446=_0x4e4f4b;if(BattleManager[_0x48b446(0x210)]())this[_0x48b446(0x2f6)]();else{if('xLlKe'!=='apvZL')VisuMZ[_0x48b446(0x14f)]['Game_Battler_makeSpeed'][_0x48b446(0x186)](this);else{if(this['numActions']()>0x0&&this===_0x1acdb0['_subject']){const _0x180a74=_0x5598d6[_0x48b446(0x11b)];if(_0x180a74[_0x48b446(0x2a3)]>0x0&&_0x180a74[0x0]!==this)return;const _0x3908de=this[_0x48b446(0x185)]();if(_0x3908de)_0x3908de[_0x48b446(0x2ee)]();}}}},Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x2f6)]=function(){const _0x4ce657=_0x4e4f4b;this[_0x4ce657(0x1fd)]=VisuMZ[_0x4ce657(0x14f)][_0x4ce657(0x2f1)][_0x4ce657(0x233)][_0x4ce657(0x1db)]['call'](this);},Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x2ab)]=function(){const _0x2e7069=_0x4e4f4b,_0x3687bb=this[_0x2e7069(0x288)]()?this['currentClass']()[_0x2e7069(0x1f0)]:this[_0x2e7069(0x1d8)]()['note'];if(_0x3687bb['match'](VisuMZ['BattleSystemSTB'][_0x2e7069(0x2bc)]['ExploitedStates']))return VisuMZ[_0x2e7069(0x14f)][_0x2e7069(0x1ae)](RegExp['$1']);return VisuMZ[_0x2e7069(0x14f)][_0x2e7069(0x2f1)][_0x2e7069(0x16a)][_0x2e7069(0x1d3)]||[];},Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x228)]=function(){const _0x2be581=_0x4e4f4b,_0xc3bbeb=this['isActor']()?this['currentClass']()[_0x2be581(0x1f0)]:this[_0x2be581(0x1d8)]()['note'];if(_0xc3bbeb[_0x2be581(0x119)](VisuMZ[_0x2be581(0x14f)][_0x2be581(0x2bc)]['ExploiterStates'])){if(_0x2be581(0x14d)===_0x2be581(0x14d))return VisuMZ[_0x2be581(0x14f)][_0x2be581(0x1ae)](RegExp['$1']);else return;}return VisuMZ[_0x2be581(0x14f)][_0x2be581(0x2f1)][_0x2be581(0x2bb)][_0x2be581(0x1d3)]||[];},VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x1ae)]=function(_0x517560){const _0x9859bc=_0x4e4f4b,_0x4289b5=_0x517560['split'](','),_0x2b07ba=[];for(let _0x566a13 of _0x4289b5){if(_0x9859bc(0x165)!==_0x9859bc(0x165)){if(this[_0x9859bc(0x185)]())this[_0x9859bc(0x185)]()[_0x9859bc(0x2ee)]();return![];}else{_0x566a13=(String(_0x566a13)||'')['trim']();const _0x560c3c=/^\d+$/[_0x9859bc(0x2f2)](_0x566a13);_0x560c3c?_0x2b07ba[_0x9859bc(0x2f8)](Number(_0x566a13)):_0x2b07ba[_0x9859bc(0x2f8)](DataManager[_0x9859bc(0x199)](_0x566a13));}}return _0x2b07ba;},Game_Battler['prototype'][_0x4e4f4b(0x13d)]=function(_0x1f0190,_0x4cafee){const _0x1a703e=_0x4e4f4b;if(!BattleManager['isSTB']())return;if(!BattleManager[_0x1a703e(0x23a)]())return;if(this[_0x1a703e(0x247)]())return;const _0x15e463=VisuMZ[_0x1a703e(0x14f)][_0x1a703e(0x2f1)][_0x1a703e(0x16a)];!_0x15e463[_0x1a703e(0x177)]&&this[_0x1a703e(0x194)](!![]);if(this[_0x1a703e(0x1dc)]())return;if(this['hp']<=0x0)return;this[_0x1a703e(0x239)](_0x15e463);if(this['hp']>0x0||!this[_0x1a703e(0x1e4)]())for(const _0x1ba100 of this[_0x1a703e(0x2ab)]()){if(!$dataStates[_0x1ba100])continue;this[_0x1a703e(0x1c5)](_0x1ba100);}_0x15e463[_0x1a703e(0x1ad)]&&(_0x1a703e(0x275)!=='JddIi'?_0x15e463[_0x1a703e(0x1ad)][_0x1a703e(0x186)](this,_0x1f0190,_0x4cafee):_0x450868[_0x1a703e(0x14f)]['Scene_Battle_commandCancel'][_0x1a703e(0x186)](this));if(this[_0x1a703e(0x288)]()&&BattleManager['areAllActorsExploited']()){if(_0x1a703e(0x155)!==_0x1a703e(0x155))_0x395b1a['setSTBExploitedFlag'](!![]);else{const _0x19af18=_0x15e463[_0x1a703e(0x18e)];_0x19af18>0x0&&$dataCommonEvents[_0x19af18]&&$gameTemp[_0x1a703e(0x298)](_0x19af18);}}else{if(this[_0x1a703e(0x203)]()&&BattleManager[_0x1a703e(0x1f7)]()){const _0x303ba1=_0x15e463['vsEnemiesFullExploit'];_0x303ba1>0x0&&$dataCommonEvents[_0x303ba1]&&$gameTemp[_0x1a703e(0x298)](_0x303ba1);}}},Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x137)]=function(_0x3470dc,_0x920a03){const _0x4e317d=_0x4e4f4b;if(!BattleManager['isSTB']())return;if(!BattleManager[_0x4e317d(0x23a)]())return;if(_0x920a03['hasSTBExploited']())return;if(_0x3470dc[_0x4e317d(0x247)]())return;const _0xa4ee21=VisuMZ['BattleSystemSTB']['Settings'][_0x4e317d(0x2bb)];!_0xa4ee21['MultipleExploits']&&_0x920a03[_0x4e317d(0x28e)](!![]);if(this[_0x4e317d(0x2b1)]())return;this[_0x4e317d(0x239)](_0xa4ee21);_0xa4ee21['ExtraActions']>0x0&&this[_0x4e317d(0x267)](_0xa4ee21[_0x4e317d(0x221)]);for(const _0x32ccb0 of this[_0x4e317d(0x228)]()){if('GpWuJ'!==_0x4e317d(0x15d)){_0x216661[_0x4e317d(0x30a)](_0x47d8f0,_0x51a832);const _0x5ba984=_0x21315c['Visible'];_0x3355aa[_0x4e317d(0x1e3)](_0x5ba984);}else{if(!$dataStates[_0x32ccb0])continue;this[_0x4e317d(0x1c5)](_0x32ccb0);}}_0xa4ee21[_0x4e317d(0x1ad)]&&_0xa4ee21[_0x4e317d(0x1ad)]['call'](this,_0x3470dc,_0x920a03);},Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x239)]=function(_0x618605){const _0x1e04c7=_0x4e4f4b;if(!_0x618605)return;if(_0x618605[_0x1e04c7(0x131)]){const _0x5be95b=_0x618605[_0x1e04c7(0x131)],_0x88c59b=_0x618605[_0x1e04c7(0x1ff)],_0x142093=_0x618605['Mute'];$gameTemp[_0x1e04c7(0x2e1)]([this],_0x5be95b,_0x88c59b,_0x142093);}if(this[_0x1e04c7(0x185)]()&&_0x618605[_0x1e04c7(0x290)][_0x1e04c7(0x2a3)]>0x0){if(_0x1e04c7(0x2f0)!=='dYbSd')this[_0x1e04c7(0x1ee)](_0xb24372,_0x438429),_0x42f980['prototype'][_0x1e04c7(0x212)][_0x1e04c7(0x186)](this),this[_0x1e04c7(0x1f9)]=0x0,this[_0x1e04c7(0x1fa)](),this[_0x1e04c7(0x29c)]();else{const _0x73c765=_0x618605['PopupText'],_0x1cd17f={'textColor':ColorManager[_0x1e04c7(0x263)](_0x618605[_0x1e04c7(0x1f3)]),'flashColor':_0x618605[_0x1e04c7(0x136)],'flashDuration':_0x618605[_0x1e04c7(0x299)]};this[_0x1e04c7(0x1a5)](_0x73c765,_0x1cd17f);}}},Game_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x267)]=function(_0x106fb1){const _0x21f7cc=_0x4e4f4b;this['_actions']=this[_0x21f7cc(0x1ac)]||[];const _0x1db7d7=this['_actions'][_0x21f7cc(0x2a3)]<=0x0;if(this[_0x21f7cc(0x246)]()){if(_0x21f7cc(0x1cf)===_0x21f7cc(0x1cf)){for(let _0x3cdb81=0x0;_0x3cdb81<_0x106fb1;_0x3cdb81++){if(_0x21f7cc(0x142)!==_0x21f7cc(0x142)){if(this[_0x21f7cc(0x210)]())return![];return _0x526359[_0x21f7cc(0x14f)][_0x21f7cc(0x1a1)][_0x21f7cc(0x186)](this);}else this[_0x21f7cc(0x1ac)]['push'](new Game_Action(this));}if(this[_0x21f7cc(0x203)]()){const _0x25ddaf=this['enemy']()['actions'][_0x21f7cc(0x21b)](_0x2f54bc=>this['isActionValid'](_0x2f54bc));if(_0x25ddaf[_0x21f7cc(0x2a3)]>0x0){let _0x40f14c;!_0x1db7d7&&(_0x40f14c=this[_0x21f7cc(0x1ac)][_0x21f7cc(0x1e1)]()),this[_0x21f7cc(0x2af)](_0x25ddaf),!_0x1db7d7&&this[_0x21f7cc(0x1ac)]['unshift'](_0x40f14c);}}}else{if(this[_0x21f7cc(0x210)]())return _0x21f7cc(0x207);return _0x5eef2f['BattleSystemSTB'][_0x21f7cc(0x295)][_0x21f7cc(0x186)](this);}}},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x111)]=Game_Actor[_0x4e4f4b(0x135)][_0x4e4f4b(0x13b)],Game_Actor[_0x4e4f4b(0x135)][_0x4e4f4b(0x13b)]=function(){const _0x90b62f=_0x4e4f4b;if(BattleManager[_0x90b62f(0x210)]()){if(this['battler']())this[_0x90b62f(0x185)]()[_0x90b62f(0x2ee)]();return![];}return VisuMZ[_0x90b62f(0x14f)][_0x90b62f(0x111)][_0x90b62f(0x186)](this);},Game_Actor[_0x4e4f4b(0x135)][_0x4e4f4b(0x160)]=function(){const _0x17899f=_0x4e4f4b,_0x340c9c=this[_0x17899f(0x249)]()[_0x17899f(0x1f0)];if(_0x340c9c[_0x17899f(0x119)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if('ytEFE'!==_0x17899f(0x277))this['x']=this['_positionTargetX'],this['y']=this['_positionTargetY'];else return _0x17899f(0x2a9);}else{if(_0x340c9c['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x17899f(0x151);}return Window_STB_TurnOrder[_0x17899f(0x2f1)][_0x17899f(0x28f)];},Game_Actor[_0x4e4f4b(0x135)][_0x4e4f4b(0x1f5)]=function(){const _0x590d65=_0x4e4f4b,_0x124680=this[_0x590d65(0x249)]()[_0x590d65(0x1f0)];if(_0x124680[_0x590d65(0x119)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x590d65(0x253)===_0x590d65(0x253))return String(RegExp['$1']);else{if(this[_0x590d65(0x2c4)]!==_0x3da3d9[_0x590d65(0x271)]())return this[_0x590d65(0x22f)]();}}return this[_0x590d65(0x157)]();},Game_Actor[_0x4e4f4b(0x135)]['createTurnOrderSTBGraphicFaceIndex']=function(){const _0x2ad890=_0x4e4f4b,_0x3592cd=this[_0x2ad890(0x249)]()[_0x2ad890(0x1f0)];if(_0x3592cd['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x2ad890(0x1e9)==='CFCVt')this[_0x2ad890(0x27a)]=this[_0x2ad890(0x28d)]();else return Number(RegExp['$2']);}return this['faceIndex']();},Game_Actor[_0x4e4f4b(0x135)][_0x4e4f4b(0x28d)]=function(){const _0x41d2a7=_0x4e4f4b,_0x3cf7d6=this[_0x41d2a7(0x249)]()[_0x41d2a7(0x1f0)];if(_0x3cf7d6[_0x41d2a7(0x119)](/<STB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x41d2a7(0x1b3)!==_0x41d2a7(0x1a8))return Number(RegExp['$1']);else this[_0x41d2a7(0x1c7)]=_0x25656a[_0x41d2a7(0x2e2)]()&&_0x2ec065[_0x41d2a7(0x24f)]()?0xff:0x0;}return Window_STB_TurnOrder['Settings']['ActorBattlerIcon'];},VisuMZ[_0x4e4f4b(0x14f)]['Game_Actor_isAutoBattle']=Game_Actor['prototype'][_0x4e4f4b(0x16e)],Game_Actor['prototype'][_0x4e4f4b(0x16e)]=function(){const _0x1a619d=_0x4e4f4b;if(BattleManager['isSTB']()){if(this[_0x1a619d(0x113)]()&&this[_0x1a619d(0x113)]()['isAutoBattleStb']())return!![];}return VisuMZ['BattleSystemSTB'][_0x1a619d(0x1b6)][_0x1a619d(0x186)](this);},Game_Action[_0x4e4f4b(0x135)]['setAutoBattleStb']=function(){this['_stbAutoBattle']=!![];},Game_Action[_0x4e4f4b(0x135)]['isAutoBattleStb']=function(){const _0x500241=_0x4e4f4b;return this[_0x500241(0x125)];},VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x148)]=Game_Actor[_0x4e4f4b(0x135)][_0x4e4f4b(0x224)],Game_Actor[_0x4e4f4b(0x135)]['makeAutoBattleActions']=function(){const _0x27710=_0x4e4f4b;VisuMZ[_0x27710(0x14f)][_0x27710(0x148)][_0x27710(0x186)](this);if(BattleManager[_0x27710(0x210)]())for(const _0x168f0f of this[_0x27710(0x1ac)]){if(!_0x168f0f)continue;_0x168f0f['setAutoBattleStb']();}},Game_Enemy[_0x4e4f4b(0x135)][_0x4e4f4b(0x160)]=function(){const _0x230dd1=_0x4e4f4b,_0x5c305d=this['enemy']()['note'];if(_0x5c305d[_0x230dd1(0x119)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return _0x230dd1(0x2a9);else{if(_0x5c305d[_0x230dd1(0x119)](/<STB TURN ORDER ICON:[ ](\d+)>/i))return'icon';}return Window_STB_TurnOrder[_0x230dd1(0x2f1)][_0x230dd1(0x261)];},Game_Enemy['prototype'][_0x4e4f4b(0x1f5)]=function(){const _0x4f4fa3=_0x4e4f4b,_0x1cf84c=this[_0x4f4fa3(0x1d8)]()[_0x4f4fa3(0x1f0)];if(_0x1cf84c[_0x4f4fa3(0x119)](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i))return String(RegExp['$1']);return Window_STB_TurnOrder[_0x4f4fa3(0x2f1)][_0x4f4fa3(0x303)];},Game_Enemy[_0x4e4f4b(0x135)][_0x4e4f4b(0x2ac)]=function(){const _0x5dfd66=_0x4e4f4b,_0x246543=this['enemy']()[_0x5dfd66(0x1f0)];if(_0x246543['match'](/<STB TURN ORDER FACE:[ ](.*),[ ](\d+)>/i)){if(_0x5dfd66(0x14e)!==_0x5dfd66(0x25e))return Number(RegExp['$2']);else{if(_0xc5706c[_0x5dfd66(0x210)]()){if(this[_0x5dfd66(0x185)]())this['battler']()[_0x5dfd66(0x2ee)]();return![];}return _0x5754a2['BattleSystemSTB'][_0x5dfd66(0x111)][_0x5dfd66(0x186)](this);}}return Window_STB_TurnOrder[_0x5dfd66(0x2f1)][_0x5dfd66(0x153)];},Game_Enemy[_0x4e4f4b(0x135)][_0x4e4f4b(0x28d)]=function(){const _0x3ece4c=_0x4e4f4b,_0x579aae=this[_0x3ece4c(0x1d8)]()[_0x3ece4c(0x1f0)];if(_0x579aae[_0x3ece4c(0x119)](/<STB TURN ORDER ICON:[ ](\d+)>/i)){if(_0x3ece4c(0x2c8)===_0x3ece4c(0x1ec))_0x135bb9['reserveCommonEvent'](_0x4814fb);else return Number(RegExp['$1']);}return Window_STB_TurnOrder[_0x3ece4c(0x2f1)][_0x3ece4c(0x164)];},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x289)]=Game_Party[_0x4e4f4b(0x135)][_0x4e4f4b(0x163)],Game_Party['prototype']['removeActor']=function(_0x179492){const _0x59bb56=_0x4e4f4b;VisuMZ[_0x59bb56(0x14f)]['Game_Party_removeActor'][_0x59bb56(0x186)](this,_0x179492);if(SceneManager[_0x59bb56(0x162)]()&&BattleManager['isSTB']()){if(_0x59bb56(0x1dd)!==_0x59bb56(0x1dd)){if(!_0x588b0d[_0x59bb56(0x162)]())return;if(!_0x1d881d[_0x59bb56(0x210)]())return;if(!_0x15c674['isSTBExploitSystemEnabled']())return;if(_0x567228['friendsUnit']()===this['subject']()[_0x59bb56(0x280)]())return;const _0x21077f=_0x64fbab[_0x59bb56(0x14f)]['Settings']['Exploit'],_0x4bd511=_0x4d61c6[_0x59bb56(0x11a)]();if(!_0x21077f[_0x59bb56(0x206)]&&this['_forcing'])return;_0x21077f[_0x59bb56(0x250)]&&_0x4bd511['critical']&&(this[_0x59bb56(0x23c)]()[_0x59bb56(0x137)](_0x3390d6,this),_0x4ed133['becomeSTBExploited'](this[_0x59bb56(0x23c)](),this));if(_0x21077f[_0x59bb56(0x20b)]){const _0x4e3c12=this[_0x59bb56(0x2ba)](_0x791b4c);_0x4e3c12>=_0x21077f[_0x59bb56(0x26c)]&&(this[_0x59bb56(0x23c)]()[_0x59bb56(0x137)](_0x5b37e5,this),_0x369875[_0x59bb56(0x13d)](this[_0x59bb56(0x23c)](),this));}}else BattleManager[_0x59bb56(0x22e)]['remove']($gameActors[_0x59bb56(0x249)](_0x179492));}},VisuMZ['BattleSystemSTB'][_0x4e4f4b(0x309)]=Scene_Battle[_0x4e4f4b(0x135)]['createActorCommandWindow'],Scene_Battle[_0x4e4f4b(0x135)][_0x4e4f4b(0x117)]=function(){const _0x600067=_0x4e4f4b;VisuMZ[_0x600067(0x14f)][_0x600067(0x309)]['call'](this),BattleManager[_0x600067(0x210)]()&&this['createActorCommandWindowSTB']();},Scene_Battle[_0x4e4f4b(0x135)][_0x4e4f4b(0x19d)]=function(){const _0x3fd863=_0x4e4f4b,_0x52bb69=this[_0x3fd863(0x245)];this[_0x3fd863(0x2d5)]()&&('GSoQm'!==_0x3fd863(0x300)?delete _0x52bb69[_0x3fd863(0x1c2)]['cancel']:this[_0x3fd863(0x1f1)]=0x0);},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x2e8)]=Scene_Battle[_0x4e4f4b(0x135)][_0x4e4f4b(0x1b9)],Scene_Battle[_0x4e4f4b(0x135)][_0x4e4f4b(0x1b9)]=function(){const _0x53f09b=_0x4e4f4b;if(BattleManager[_0x53f09b(0x210)]())this[_0x53f09b(0x308)]();else{if(_0x53f09b(0x2d2)==='xZTRu'){if(!_0x20372d['Settings'][_0x53f09b(0x201)])return;const _0x5ccbd1=_0x66fa12[_0x53f09b(0x2f1)],_0x1e7fbe=this[_0x53f09b(0x216)]===_0x100a3b?_0x53f09b(0x18a):_0x53f09b(0x15c),_0x5d946f=_0x53f09b(0x1e7)[_0x53f09b(0x1bd)](_0x1e7fbe),_0x2648ce=new _0x1a1c78();_0x2648ce[_0x53f09b(0x25c)]['x']=this['anchor']['x'],_0x2648ce[_0x53f09b(0x25c)]['y']=this[_0x53f09b(0x25c)]['y'];if(_0x5ccbd1[_0x5d946f])_0x2648ce[_0x53f09b(0x255)]=_0x3103f7[_0x53f09b(0x2d0)](_0x5ccbd1[_0x5d946f]);else{const _0x398332=this['bitmapWidth'](),_0x8ac72f=this[_0x53f09b(0x143)]();_0x2648ce[_0x53f09b(0x255)]=new _0x27d2a2(_0x398332,_0x8ac72f);const _0x26fcf4=_0x393b1a[_0x53f09b(0x263)](_0x5ccbd1[_0x53f09b(0x301)[_0x53f09b(0x1bd)](_0x1e7fbe)]),_0x3ab95c=_0x268378['getColor'](_0x5ccbd1['%1BgColor2'['format'](_0x1e7fbe)]);_0x2648ce['bitmap'][_0x53f09b(0x1a6)](0x0,0x0,_0x398332,_0x8ac72f,_0x26fcf4,_0x3ab95c,!![]);}this[_0x53f09b(0x17b)]=_0x2648ce,this[_0x53f09b(0x283)](this[_0x53f09b(0x17b)]),this[_0x53f09b(0x258)]=this[_0x53f09b(0x17b)][_0x53f09b(0x258)],this[_0x53f09b(0x205)]=this[_0x53f09b(0x17b)][_0x53f09b(0x205)];}else VisuMZ[_0x53f09b(0x14f)]['Scene_Battle_commandCancel'][_0x53f09b(0x186)](this);}},Scene_Battle[_0x4e4f4b(0x135)]['commandCancelSTB']=function(){const _0x507f60=_0x4e4f4b;this[_0x507f60(0x145)][_0x507f60(0x158)](),this[_0x507f60(0x245)][_0x507f60(0x21c)]();},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x12f)]=Scene_Battle['prototype']['commandFight'],Scene_Battle[_0x4e4f4b(0x135)][_0x4e4f4b(0x138)]=function(){const _0x3b0fd0=_0x4e4f4b;if(BattleManager[_0x3b0fd0(0x210)]())'rUYJY'===_0x3b0fd0(0x264)?(delete this[_0x3b0fd0(0x14b)],delete this[_0x3b0fd0(0x257)],delete this[_0x3b0fd0(0x1f8)],delete this['_stbTurnOrderIconIndex']):this[_0x3b0fd0(0x1fe)]();else{if(_0x3b0fd0(0x17c)!==_0x3b0fd0(0x17c))return _0x3b0fd0(0x2a9);else VisuMZ[_0x3b0fd0(0x14f)][_0x3b0fd0(0x12f)]['call'](this);}},VisuMZ['BattleSystemSTB']['Scene_Battle_createAllWindows']=Scene_Battle['prototype'][_0x4e4f4b(0x1d7)],Scene_Battle[_0x4e4f4b(0x135)][_0x4e4f4b(0x1d7)]=function(){const _0x443c84=_0x4e4f4b;VisuMZ[_0x443c84(0x14f)][_0x443c84(0x269)][_0x443c84(0x186)](this),this['createSTBTurnOrderWindow']();},Scene_Battle[_0x4e4f4b(0x135)]['createSTBTurnOrderWindow']=function(){const _0x28ab2b=_0x4e4f4b;if(!BattleManager[_0x28ab2b(0x210)]())return;this[_0x28ab2b(0x202)]=new Window_STB_TurnOrder();const _0x3533ce=this['getChildIndex'](this[_0x28ab2b(0x1d4)]);this[_0x28ab2b(0x1d6)](this['_stbTurnOrderWindow'],_0x3533ce),this['repositionLogWindowSTB'](),BattleManager['updateTurnOrderSTB'](!![]);},Scene_Battle[_0x4e4f4b(0x135)][_0x4e4f4b(0x29b)]=function(){const _0x2cd45b=_0x4e4f4b,_0x1868c9=Window_STB_TurnOrder[_0x2cd45b(0x2f1)];if(_0x1868c9['DisplayPosition']!==_0x2cd45b(0x225))return;if(!_0x1868c9[_0x2cd45b(0x1cd)])return;if(!this[_0x2cd45b(0x2ff)])return;const _0x574401=this['_stbTurnOrderWindow']['y']-Math[_0x2cd45b(0x2ae)]((Graphics[_0x2cd45b(0x205)]-Graphics['boxHeight'])/0x2),_0x19d9f8=_0x574401+this[_0x2cd45b(0x202)]['height'];this['_logWindow']['y']=_0x19d9f8+_0x1868c9[_0x2cd45b(0x159)];};function Sprite_STB_TurnOrder_Battler(){const _0x30b7f2=_0x4e4f4b;this[_0x30b7f2(0x212)](...arguments);}Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]=Object['create'](Sprite_Clickable[_0x4e4f4b(0x135)]),Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x13f)]=Sprite_STB_TurnOrder_Battler,Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['initialize']=function(_0x52b69f,_0x227a7c){const _0x6994ff=_0x4e4f4b;this[_0x6994ff(0x1ee)](_0x52b69f,_0x227a7c),Sprite_Clickable['prototype'][_0x6994ff(0x212)]['call'](this),this['opacity']=0x0,this['createChildren'](),this[_0x6994ff(0x29c)]();},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['initMembers']=function(_0x1e8535,_0x2dfbf2){const _0x506156=_0x4e4f4b;this[_0x506156(0x216)]=_0x1e8535,this[_0x506156(0x2c7)]=_0x2dfbf2;const _0xa08c0d=Window_STB_TurnOrder['Settings'],_0x1ee1ce=this['isHorz'](),_0x463390=this['defaultPosition']();this[_0x506156(0x1be)]=0x0,this['_positionTargetX']=_0x1ee1ce?_0xa08c0d[_0x506156(0x2b2)]*_0x463390:0x0,this['_positionTargetY']=_0x1ee1ce?0x0:_0xa08c0d[_0x506156(0x2b2)]*_0x463390,this[_0x506156(0x23d)]=0x0,this[_0x506156(0x1c7)]=0xff,this[_0x506156(0x1e0)]=![],this['_isAppeared']=![],this[_0x506156(0x2c1)]=0x0,this[_0x506156(0x1af)]=0x0;},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x1fa)]=function(){const _0x45bb74=_0x4e4f4b;this[_0x45bb74(0x222)](),this['createBackgroundSprite'](),this[_0x45bb74(0x266)](),this[_0x45bb74(0x1a7)](),this[_0x45bb74(0x161)]();},Sprite_STB_TurnOrder_Battler['prototype']['createInitialPositions']=function(){const _0xdfbb15=_0x4e4f4b;this['x']=this[_0xdfbb15(0x1b2)],this['y']=this[_0xdfbb15(0x1ca)];},Sprite_STB_TurnOrder_Battler['prototype'][_0x4e4f4b(0x292)]=function(){const _0x453ef8=_0x4e4f4b,_0x5d68ae=Window_STB_TurnOrder[_0x453ef8(0x2f1)],_0x3e0b70=[_0x453ef8(0x225),_0x453ef8(0x127)]['includes'](_0x5d68ae[_0x453ef8(0x2d1)]);return _0x3e0b70;},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x1ce)]=function(){const _0x3feb45=_0x4e4f4b,_0x167c78=Window_STB_TurnOrder['Settings'];return this['isHorz']()?_0x167c78['SpriteThin']:_0x167c78[_0x3feb45(0x227)];},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['bitmapHeight']=function(){const _0x851a92=_0x4e4f4b,_0x4b553e=Window_STB_TurnOrder['Settings'];return this[_0x851a92(0x292)]()?_0x4b553e[_0x851a92(0x227)]:_0x4b553e['SpriteThin'];},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['createTestBitmap']=function(){const _0x47bb40=_0x4e4f4b;this[_0x47bb40(0x255)]=new Bitmap(0x48,0x24);const _0x1aa32c=this[_0x47bb40(0x185)]()?this['battler']()['name']():'%1\x20%2\x20%3'[_0x47bb40(0x1bd)](this[_0x47bb40(0x216)],this[_0x47bb40(0x2c7)]);this[_0x47bb40(0x255)]['drawText'](_0x1aa32c,0x0,0x0,0x48,0x24,_0x47bb40(0x259));},Sprite_STB_TurnOrder_Battler['prototype'][_0x4e4f4b(0x29d)]=function(){const _0x2985b6=_0x4e4f4b;if(!Window_STB_TurnOrder['Settings'][_0x2985b6(0x201)])return;const _0x53020c=Window_STB_TurnOrder['Settings'],_0x3d26ee=this['_unit']===$gameParty?_0x2985b6(0x18a):'Enemy',_0x11f56d=_0x2985b6(0x1e7)[_0x2985b6(0x1bd)](_0x3d26ee),_0x280c34=new Sprite();_0x280c34[_0x2985b6(0x25c)]['x']=this[_0x2985b6(0x25c)]['x'],_0x280c34['anchor']['y']=this[_0x2985b6(0x25c)]['y'];if(_0x53020c[_0x11f56d])_0x280c34[_0x2985b6(0x255)]=ImageManager[_0x2985b6(0x2d0)](_0x53020c[_0x11f56d]);else{const _0x4075f8=this[_0x2985b6(0x1ce)](),_0x588a8c=this['bitmapHeight']();_0x280c34[_0x2985b6(0x255)]=new Bitmap(_0x4075f8,_0x588a8c);const _0x48fae8=ColorManager[_0x2985b6(0x263)](_0x53020c['%1BgColor1'[_0x2985b6(0x1bd)](_0x3d26ee)]),_0x1f7f13=ColorManager[_0x2985b6(0x263)](_0x53020c[_0x2985b6(0x13a)['format'](_0x3d26ee)]);_0x280c34['bitmap'][_0x2985b6(0x1a6)](0x0,0x0,_0x4075f8,_0x588a8c,_0x48fae8,_0x1f7f13,!![]);}this[_0x2985b6(0x17b)]=_0x280c34,this['addChild'](this[_0x2985b6(0x17b)]),this[_0x2985b6(0x258)]=this[_0x2985b6(0x17b)][_0x2985b6(0x258)],this[_0x2985b6(0x205)]=this[_0x2985b6(0x17b)][_0x2985b6(0x205)];},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['createGraphicSprite']=function(){const _0x470e8=_0x4e4f4b,_0x25d1cd=new Sprite();_0x25d1cd[_0x470e8(0x25c)]['x']=this['anchor']['x'],_0x25d1cd[_0x470e8(0x25c)]['y']=this[_0x470e8(0x25c)]['y'],this[_0x470e8(0x11d)]=_0x25d1cd,this[_0x470e8(0x283)](this[_0x470e8(0x11d)]),this[_0x470e8(0x22f)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0x4e4f4b(0x1a7)]=function(){const _0xed23ab=_0x4e4f4b;if(!Window_STB_TurnOrder[_0xed23ab(0x2f1)][_0xed23ab(0x146)])return;const _0x4b6505=Window_STB_TurnOrder['Settings'],_0x28fe62=this[_0xed23ab(0x216)]===$gameParty?_0xed23ab(0x18a):_0xed23ab(0x15c),_0x29e32f=_0xed23ab(0x281)['format'](_0x28fe62),_0x5de940=new Sprite();_0x5de940[_0xed23ab(0x25c)]['x']=this[_0xed23ab(0x25c)]['x'],_0x5de940[_0xed23ab(0x25c)]['y']=this['anchor']['y'];if(_0x4b6505[_0x29e32f])_0x5de940['bitmap']=ImageManager[_0xed23ab(0x2d0)](_0x4b6505[_0x29e32f]);else{let _0x2aedda=this[_0xed23ab(0x1ce)](),_0x35e6b5=this[_0xed23ab(0x143)](),_0x2d16ce=_0x4b6505[_0xed23ab(0x17a)];_0x5de940[_0xed23ab(0x255)]=new Bitmap(_0x2aedda,_0x35e6b5);const _0x3864a7='#000000',_0x22e0dd=ColorManager[_0xed23ab(0x263)](_0x4b6505['%1BorderColor'[_0xed23ab(0x1bd)](_0x28fe62)]);_0x5de940[_0xed23ab(0x255)]['fillRect'](0x0,0x0,_0x2aedda,_0x35e6b5,_0x3864a7),_0x2aedda-=0x2,_0x35e6b5-=0x2,_0x5de940[_0xed23ab(0x255)][_0xed23ab(0x278)](0x1,0x1,_0x2aedda,_0x35e6b5,_0x22e0dd),_0x2aedda-=_0x2d16ce*0x2,_0x35e6b5-=_0x2d16ce*0x2,_0x5de940[_0xed23ab(0x255)][_0xed23ab(0x278)](0x1+_0x2d16ce,0x1+_0x2d16ce,_0x2aedda,_0x35e6b5,_0x3864a7),_0x2aedda-=0x2,_0x35e6b5-=0x2,_0x2d16ce+=0x1,_0x5de940[_0xed23ab(0x255)][_0xed23ab(0x139)](0x1+_0x2d16ce,0x1+_0x2d16ce,_0x2aedda,_0x35e6b5);}this[_0xed23ab(0x17b)]=_0x5de940,this[_0xed23ab(0x283)](this[_0xed23ab(0x17b)]);},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x161)]=function(){const _0x533bf4=_0x4e4f4b,_0x1e7632=Window_STB_TurnOrder['Settings'];if(!_0x1e7632['EnemyBattlerDrawLetter'])return;if(this['_unit']===$gameParty)return;const _0x2a9393=this['bitmapWidth'](),_0x12a1b8=this[_0x533bf4(0x143)](),_0x18d616=new Sprite();_0x18d616[_0x533bf4(0x25c)]['x']=this[_0x533bf4(0x25c)]['x'],_0x18d616[_0x533bf4(0x25c)]['y']=this[_0x533bf4(0x25c)]['y'],_0x18d616['bitmap']=new Bitmap(_0x2a9393,_0x12a1b8),this[_0x533bf4(0x1bb)]=_0x18d616,this[_0x533bf4(0x283)](this[_0x533bf4(0x1bb)]);},Sprite_STB_TurnOrder_Battler['prototype']['battler']=function(){const _0x4b582c=_0x4e4f4b;return this[_0x4b582c(0x216)]?this[_0x4b582c(0x216)][_0x4b582c(0x1eb)]()[this[_0x4b582c(0x2c7)]]:null;},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['update']=function(){const _0x493470=_0x4e4f4b;Sprite_Clickable[_0x493470(0x135)]['update'][_0x493470(0x186)](this),this[_0x493470(0x200)](),this[_0x493470(0x28a)](),this[_0x493470(0x29c)](),this[_0x493470(0x285)](),this[_0x493470(0x168)](),this[_0x493470(0x294)](),this[_0x493470(0x2c5)](),this[_0x493470(0x173)]();},Sprite_STB_TurnOrder_Battler['prototype'][_0x4e4f4b(0x200)]=function(){const _0x5594ab=_0x4e4f4b,_0x5dd4fb=this[_0x5594ab(0x302)]();if(this[_0x5594ab(0x305)]===_0x5dd4fb)return;this[_0x5594ab(0x305)]=_0x5dd4fb;this['opacity']<0xff&&this['battler']()&&_0x5dd4fb!==this[_0x5594ab(0x179)]()&&('LrKQn'===_0x5594ab(0x22a)?_0x32838a[_0x5594ab(0x14f)][_0x5594ab(0x1fc)][_0x5594ab(0x186)](this):this[_0x5594ab(0x130)](0xff));if(_0x5dd4fb===this[_0x5594ab(0x179)]()&&this['_fadeDuration']<=0x0&&this['opacity']>0x0)this['startFade'](0x0);else{if(this[_0x5594ab(0x23d)]<=0x0&&this[_0x5594ab(0x1f9)]<0xff){if(_0x5594ab(0x132)===_0x5594ab(0x132))this[_0x5594ab(0x29c)]();else{const _0x52e02a=new _0x268700(_0x3eb17d,_0x224d24);this[_0x5594ab(0x231)][_0x5594ab(0x283)](_0x52e02a),this['_turnOrderContainer'][_0x5594ab(0x2f8)](_0x52e02a);}}}this[_0x5594ab(0x2fe)]();},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x2d8)]=function(){const _0x44dea5=_0x4e4f4b,_0x39ce2c=this[_0x44dea5(0x1a4)]();if(!_0x39ce2c)return;let _0x205768=![];if(this[_0x44dea5(0x2c1)]!==_0x39ce2c['width'])_0x205768=!![];else{if(this[_0x44dea5(0x1af)]!==_0x39ce2c['height']){if(_0x44dea5(0x129)===_0x44dea5(0x175)){if(!_0x1491f1['Settings'][_0x44dea5(0x146)])return;const _0x412dee=_0x9dbbd8[_0x44dea5(0x2f1)],_0x13d3f4=this[_0x44dea5(0x216)]===_0x3c8652?'Actor':_0x44dea5(0x15c),_0x233abd=_0x44dea5(0x281)[_0x44dea5(0x1bd)](_0x13d3f4),_0x13f4df=new _0x32066f();_0x13f4df[_0x44dea5(0x25c)]['x']=this[_0x44dea5(0x25c)]['x'],_0x13f4df['anchor']['y']=this[_0x44dea5(0x25c)]['y'];if(_0x412dee[_0x233abd])_0x13f4df[_0x44dea5(0x255)]=_0x104eaa['loadSystem'](_0x412dee[_0x233abd]);else{let _0x453b5d=this[_0x44dea5(0x1ce)](),_0x3df715=this['bitmapHeight'](),_0x3516fb=_0x412dee[_0x44dea5(0x17a)];_0x13f4df[_0x44dea5(0x255)]=new _0x275b4d(_0x453b5d,_0x3df715);const _0x5cc43b='#000000',_0x137fe7=_0x550a82[_0x44dea5(0x263)](_0x412dee[_0x44dea5(0x1ba)[_0x44dea5(0x1bd)](_0x13d3f4)]);_0x13f4df[_0x44dea5(0x255)][_0x44dea5(0x278)](0x0,0x0,_0x453b5d,_0x3df715,_0x5cc43b),_0x453b5d-=0x2,_0x3df715-=0x2,_0x13f4df[_0x44dea5(0x255)][_0x44dea5(0x278)](0x1,0x1,_0x453b5d,_0x3df715,_0x137fe7),_0x453b5d-=_0x3516fb*0x2,_0x3df715-=_0x3516fb*0x2,_0x13f4df[_0x44dea5(0x255)][_0x44dea5(0x278)](0x1+_0x3516fb,0x1+_0x3516fb,_0x453b5d,_0x3df715,_0x5cc43b),_0x453b5d-=0x2,_0x3df715-=0x2,_0x3516fb+=0x1,_0x13f4df[_0x44dea5(0x255)][_0x44dea5(0x139)](0x1+_0x3516fb,0x1+_0x3516fb,_0x453b5d,_0x3df715);}this[_0x44dea5(0x17b)]=_0x13f4df,this[_0x44dea5(0x283)](this[_0x44dea5(0x17b)]);}else _0x205768=!![];}}_0x205768&&(_0x44dea5(0x2a7)!=='kaJNp'?this[_0x44dea5(0x2fe)]():this[_0x44dea5(0x257)]=this[_0x44dea5(0x1f5)]());},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x2fe)]=function(){const _0x496cae=_0x4e4f4b,_0x1d97ed=Window_STB_TurnOrder[_0x496cae(0x2f1)],_0x44cb08=this[_0x496cae(0x292)](),_0x116925=_0x1d97ed['OrderDirection'],_0x111fa6=_0x1d97ed[_0x496cae(0x123)],_0x298e35=SceneManager[_0x496cae(0x276)]['_stbTurnOrderWindow'];if(!_0x298e35)return;const _0x405d0b=this['containerPosition']();this[_0x496cae(0x1be)]=_0x1d97ed[_0x496cae(0x1d9)],this[_0x496cae(0x1b2)]=_0x44cb08?_0x1d97ed[_0x496cae(0x2b2)]*_0x405d0b:0x0,this['_positionTargetY']=_0x44cb08?0x0:_0x1d97ed['SpriteThin']*_0x405d0b,_0x405d0b>0x0&&(this[_0x496cae(0x1b2)]+=_0x44cb08?_0x111fa6:0x0,this[_0x496cae(0x1ca)]+=_0x44cb08?0x0:_0x111fa6),_0x116925?this[_0x496cae(0x1b2)]=_0x44cb08?_0x298e35[_0x496cae(0x258)]-this[_0x496cae(0x1b2)]-_0x1d97ed[_0x496cae(0x2b2)]:0x0:_0x496cae(0x1da)!=='zpsJY'?this[_0x496cae(0x116)]=_0x5898f3['isBattleSystemSTBTurnOrderVisible']():this['_positionTargetY']=_0x44cb08?0x0:_0x298e35['height']-this['_positionTargetY']-_0x1d97ed[_0x496cae(0x2b2)];},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x28a)]=function(){const _0x93223f=_0x4e4f4b;if(this[_0x93223f(0x23d)]>0x0)return;if(this['_positionDuration']>0x0){if('irlUi'!==_0x93223f(0x19f)){if(!_0x219ce7[_0x93223f(0x210)]())return;this[_0x93223f(0x202)]=new _0x1dab23();const _0x23e932=this[_0x93223f(0x149)](this['_windowLayer']);this[_0x93223f(0x1d6)](this[_0x93223f(0x202)],_0x23e932),this[_0x93223f(0x29b)](),_0x2f18da[_0x93223f(0x26d)](!![]);}else{const _0x30d67a=this[_0x93223f(0x1be)];this['x']=(this['x']*(_0x30d67a-0x1)+this[_0x93223f(0x1b2)])/_0x30d67a,this['y']=(this['y']*(_0x30d67a-0x1)+this['_positionTargetY'])/_0x30d67a,this[_0x93223f(0x1be)]--;}}if(this['_positionDuration']<=0x0){if(_0x93223f(0x2a0)===_0x93223f(0x2a0)){this['x']=this[_0x93223f(0x1b2)],this['y']=this[_0x93223f(0x1ca)];if(this[_0x93223f(0x1f9)]<0xff&&!this[_0x93223f(0x1f6)]&&this[_0x93223f(0x23d)]<=0x0){if(_0x93223f(0x193)!==_0x93223f(0x22d)){const _0x18d56e=this[_0x93223f(0x185)]();_0x18d56e&&(this['_fadeTarget']=_0x18d56e['isAlive']()&&_0x18d56e[_0x93223f(0x24f)]()?0xff:0x0);}else this[_0x93223f(0x27f)]();}}else return _0x36779c[_0x93223f(0x2e3)]()===_0x93223f(0x207);}},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x179)]=function(){const _0x2cfb3c=_0x4e4f4b,_0x143755=Window_STB_TurnOrder[_0x2cfb3c(0x2f1)],_0x4ea401=this[_0x2cfb3c(0x292)]()?_0x143755['MaxHorzSprites']:_0x143755[_0x2cfb3c(0x170)];return _0x4ea401+0x1;},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['containerWindow']=function(){const _0xa75395=_0x4e4f4b;return SceneManager[_0xa75395(0x276)][_0xa75395(0x202)];},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['containerPosition']=function(){const _0x2dd9cd=_0x4e4f4b,_0x56c9e5=this[_0x2dd9cd(0x185)]();if(!_0x56c9e5)return this['defaultPosition']();if(_0x56c9e5===BattleManager[_0x2dd9cd(0x273)])return 0x0;if(BattleManager[_0x2dd9cd(0x22e)][_0x2dd9cd(0x226)](_0x56c9e5)){if(_0x2dd9cd(0x12c)!=='sUogQ'){const _0x5ec4f2=BattleManager[_0x2dd9cd(0x22e)][_0x2dd9cd(0x197)](_0x56c9e5)+0x1;return _0x5ec4f2;}else return _0xc61323['y']-_0x3913d2['y'];}return this[_0x2dd9cd(0x179)]();},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['startFade']=function(_0x21a207){const _0x16c817=_0x4e4f4b,_0x288769=Window_STB_TurnOrder[_0x16c817(0x2f1)];this[_0x16c817(0x23d)]=_0x288769[_0x16c817(0x1d9)],this[_0x16c817(0x1c7)]=_0x21a207;},Sprite_STB_TurnOrder_Battler['prototype'][_0x4e4f4b(0x29c)]=function(){const _0x3d0978=_0x4e4f4b,_0x5ad3f3=this[_0x3d0978(0x185)]();if(!_0x5ad3f3)return;if(this[_0x3d0978(0x1e0)]===_0x5ad3f3[_0x3d0978(0x2e2)]()&&this[_0x3d0978(0x2fc)]===_0x5ad3f3[_0x3d0978(0x24f)]())return;this[_0x3d0978(0x1e0)]=_0x5ad3f3[_0x3d0978(0x2e2)](),this[_0x3d0978(0x2fc)]=_0x5ad3f3['isAppeared']();let _0x2be30c=this[_0x3d0978(0x1e0)]&&this[_0x3d0978(0x2fc)]?0xff:0x0;this[_0x3d0978(0x130)](_0x2be30c);},Sprite_STB_TurnOrder_Battler['prototype'][_0x4e4f4b(0x285)]=function(){const _0x536a5e=_0x4e4f4b;if(this[_0x536a5e(0x23d)]>0x0){const _0x226624=this[_0x536a5e(0x23d)];this['opacity']=(this[_0x536a5e(0x1f9)]*(_0x226624-0x1)+this['_fadeTarget'])/_0x226624,this[_0x536a5e(0x23d)]--;if(this[_0x536a5e(0x23d)]<=0x0){if(_0x536a5e(0x232)==='pyIkA'){const _0x3451c6=this[_0x536a5e(0x260)],_0x58a3c6=this[_0x536a5e(0x1ce)](),_0x40b758=this[_0x536a5e(0x143)]();this[_0x536a5e(0x11d)][_0x536a5e(0x255)]=new _0x55b0e0(_0x58a3c6,_0x40b758);const _0x6d4494=this[_0x536a5e(0x11d)][_0x536a5e(0x255)],_0x2fe456=_0x598bb5[_0x536a5e(0x141)],_0x5c06db=_0x34ae8c['iconHeight'],_0x36b19a=_0x1c9903[_0x536a5e(0x2ca)](_0x2fe456,_0x5c06db,_0x58a3c6,_0x40b758),_0x51530b=_0x3451c6%0x10*_0x2fe456,_0xce5b3=_0x40a04f[_0x536a5e(0x2e7)](_0x3451c6/0x10)*_0x5c06db,_0x38d9d1=_0x1cb0ca[_0x536a5e(0x2e7)](_0x5d8d9e[_0x536a5e(0x2e6)](_0x58a3c6-_0x36b19a,0x0)/0x2),_0xe8eb22=_0x395e58[_0x536a5e(0x2e7)](_0x366e9e['max'](_0x40b758-_0x36b19a,0x0)/0x2);_0x6d4494[_0x536a5e(0x209)](_0x24599b,_0x51530b,_0xce5b3,_0x2fe456,_0x5c06db,_0x38d9d1,_0xe8eb22,_0x36b19a,_0x36b19a);}else this[_0x536a5e(0x200)](),this['_positionDuration']=0x0,this[_0x536a5e(0x28a)](),this[_0x536a5e(0x1f9)]=this[_0x536a5e(0x1c7)];}}if(this[_0x536a5e(0x1f6)])return;BattleManager[_0x536a5e(0x2bd)]===_0x536a5e(0x279)&&(this[_0x536a5e(0x1f6)]=!![],this[_0x536a5e(0x130)](0x0));},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x168)]=function(){const _0x12b9d3=_0x4e4f4b,_0x2a248e=this[_0x12b9d3(0x185)]();if(!_0x2a248e)return;const _0x4fdc2a=Window_STB_TurnOrder[_0x12b9d3(0x2f1)],_0x56d6fe=this[_0x12b9d3(0x216)]===$gameParty?_0x12b9d3(0x18a):'Enemy';let _0x2733ff=_0x2a248e[_0x12b9d3(0x190)]();if(_0x2a248e[_0x12b9d3(0x288)]()&&_0x2733ff===_0x12b9d3(0x1d8)){if(_0x12b9d3(0x27d)!==_0x12b9d3(0x27d)){this[_0x12b9d3(0x216)]=_0x5874e7,this[_0x12b9d3(0x2c7)]=_0x41af12;const _0x506451=_0x4eea23[_0x12b9d3(0x2f1)],_0x30cfab=this[_0x12b9d3(0x292)](),_0xb2acd6=this[_0x12b9d3(0x179)]();this['_positionDuration']=0x0,this[_0x12b9d3(0x1b2)]=_0x30cfab?_0x506451['SpriteThin']*_0xb2acd6:0x0,this[_0x12b9d3(0x1ca)]=_0x30cfab?0x0:_0x506451['SpriteThin']*_0xb2acd6,this[_0x12b9d3(0x23d)]=0x0,this[_0x12b9d3(0x1c7)]=0xff,this[_0x12b9d3(0x1e0)]=![],this[_0x12b9d3(0x2fc)]=![],this['_containerWidth']=0x0,this['_containerHeight']=0x0;}else _0x2733ff='face';}else _0x2a248e['isEnemy']()&&_0x2733ff===_0x12b9d3(0x2ad)&&(_0x2733ff='enemy');if(this[_0x12b9d3(0x29a)]!==_0x2733ff)return this[_0x12b9d3(0x22f)]();switch(this['_graphicType']){case _0x12b9d3(0x2a9):if(this[_0x12b9d3(0x2e0)]!==_0x2a248e[_0x12b9d3(0x28c)]())return this[_0x12b9d3(0x22f)]();if(this[_0x12b9d3(0x24e)]!==_0x2a248e['TurnOrderSTBGraphicFaceIndex']())return this['processUpdateGraphic']();break;case _0x12b9d3(0x151):if(this['_graphicIconIndex']!==_0x2a248e[_0x12b9d3(0x1a3)]())return this[_0x12b9d3(0x22f)]();break;case _0x12b9d3(0x1d8):if(_0x2a248e[_0x12b9d3(0x1f2)]()){if(this['_graphicSv']!==_0x2a248e[_0x12b9d3(0x271)]())return this['processUpdateGraphic']();}else{if(this['_graphicEnemy']!==_0x2a248e[_0x12b9d3(0x219)]())return this[_0x12b9d3(0x22f)]();}break;case _0x12b9d3(0x2ad):if(_0x2a248e[_0x12b9d3(0x288)]()){if(_0x12b9d3(0x147)!=='dnksY')this[_0x12b9d3(0x1b2)]=_0x287a06?_0x76ddee[_0x12b9d3(0x258)]-this['_positionTargetX']-_0x1bb616[_0x12b9d3(0x2b2)]:0x0;else{if(this[_0x12b9d3(0x2c4)]!==_0x2a248e[_0x12b9d3(0x219)]())return this[_0x12b9d3(0x22f)]();}}else{if(this[_0x12b9d3(0x2f9)]!==_0x2a248e[_0x12b9d3(0x219)]())return this[_0x12b9d3(0x22f)]();}break;}},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['processUpdateGraphic']=function(){const _0x1bbb1e=_0x4e4f4b,_0x443395=this[_0x1bbb1e(0x185)]();if(!_0x443395)return;this['_graphicType']=_0x443395[_0x1bbb1e(0x190)]();if(_0x443395[_0x1bbb1e(0x288)]()&&this[_0x1bbb1e(0x29a)]==='enemy')this[_0x1bbb1e(0x29a)]='face';else _0x443395[_0x1bbb1e(0x203)]()&&this['_graphicType']==='svactor'&&(this['_graphicType']='enemy');let _0x3d8ce9;switch(this['_graphicType']){case _0x1bbb1e(0x2a9):this[_0x1bbb1e(0x2e0)]=_0x443395[_0x1bbb1e(0x28c)](),this[_0x1bbb1e(0x24e)]=_0x443395[_0x1bbb1e(0x182)](),_0x3d8ce9=ImageManager[_0x1bbb1e(0x25d)](this[_0x1bbb1e(0x2e0)]),_0x3d8ce9[_0x1bbb1e(0x1c8)](this[_0x1bbb1e(0x1b0)][_0x1bbb1e(0x287)](this,_0x3d8ce9));break;case _0x1bbb1e(0x151):this[_0x1bbb1e(0x260)]=_0x443395['createTurnOrderSTBGraphicIconIndex'](),_0x3d8ce9=ImageManager[_0x1bbb1e(0x2d0)]('IconSet'),_0x3d8ce9[_0x1bbb1e(0x1c8)](this[_0x1bbb1e(0x16b)][_0x1bbb1e(0x287)](this,_0x3d8ce9));break;case'enemy':if(_0x443395[_0x1bbb1e(0x1f2)]()){if(_0x1bbb1e(0x12e)===_0x1bbb1e(0x12e))this[_0x1bbb1e(0x2c4)]=_0x443395['svBattlerName'](),_0x3d8ce9=ImageManager[_0x1bbb1e(0x236)](this['_graphicSv']),_0x3d8ce9[_0x1bbb1e(0x1c8)](this[_0x1bbb1e(0x2dd)][_0x1bbb1e(0x287)](this,_0x3d8ce9));else return this[_0x1bbb1e(0x27e)]===_0x4ecbef&&this[_0x1bbb1e(0x172)](),this[_0x1bbb1e(0x27e)];}else{if($gameSystem['isSideView']()){if(_0x1bbb1e(0x19e)!==_0x1bbb1e(0x19e)){const _0xa5c732=this[_0x1bbb1e(0x1a4)]();if(!_0xa5c732)return;let _0x4774dc=![];if(this[_0x1bbb1e(0x2c1)]!==_0xa5c732[_0x1bbb1e(0x258)])_0x4774dc=!![];else this[_0x1bbb1e(0x1af)]!==_0xa5c732[_0x1bbb1e(0x205)]&&(_0x4774dc=!![]);_0x4774dc&&this[_0x1bbb1e(0x2fe)]();}else this['_graphicEnemy']=_0x443395[_0x1bbb1e(0x219)](),_0x3d8ce9=ImageManager[_0x1bbb1e(0x10e)](this[_0x1bbb1e(0x2f9)]),_0x3d8ce9['addLoadListener'](this['changeEnemyGraphicBitmap']['bind'](this,_0x3d8ce9));}else this[_0x1bbb1e(0x2f9)]=_0x443395[_0x1bbb1e(0x219)](),_0x3d8ce9=ImageManager[_0x1bbb1e(0x21a)](this[_0x1bbb1e(0x2f9)]),_0x3d8ce9[_0x1bbb1e(0x1c8)](this[_0x1bbb1e(0x1b7)]['bind'](this,_0x3d8ce9));}break;case _0x1bbb1e(0x2ad):this[_0x1bbb1e(0x2c4)]=_0x443395[_0x1bbb1e(0x219)](),_0x3d8ce9=ImageManager[_0x1bbb1e(0x236)](this[_0x1bbb1e(0x2c4)]),_0x3d8ce9['addLoadListener'](this[_0x1bbb1e(0x2dd)][_0x1bbb1e(0x287)](this,_0x3d8ce9));break;}},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['changeFaceGraphicBitmap']=function(_0x34b236){const _0x19ad39=_0x4e4f4b,_0x2c3207=this[_0x19ad39(0x24e)],_0x23750d=this[_0x19ad39(0x1ce)](),_0x9d7662=this[_0x19ad39(0x143)](),_0x452327=Math[_0x19ad39(0x2e6)](_0x23750d,_0x9d7662);this[_0x19ad39(0x11d)][_0x19ad39(0x255)]=new Bitmap(_0x23750d,_0x9d7662);const _0x31780b=this[_0x19ad39(0x11d)][_0x19ad39(0x255)],_0x68945d=ImageManager['faceWidth'],_0x3326fc=ImageManager[_0x19ad39(0x1c9)],_0x237413=_0x452327/Math[_0x19ad39(0x2e6)](_0x68945d,_0x3326fc),_0xc98fc=ImageManager[_0x19ad39(0x1c1)],_0x49a6b2=ImageManager[_0x19ad39(0x1c9)],_0x5c4f42=_0x2c3207%0x4*_0x68945d+(_0x68945d-_0xc98fc)/0x2,_0x15b48d=Math[_0x19ad39(0x2e7)](_0x2c3207/0x4)*_0x3326fc+(_0x3326fc-_0x49a6b2)/0x2,_0x5b9f21=(_0x23750d-_0x68945d*_0x237413)/0x2,_0xf361f0=(_0x9d7662-_0x3326fc*_0x237413)/0x2;_0x31780b['blt'](_0x34b236,_0x5c4f42,_0x15b48d,_0xc98fc,_0x49a6b2,_0x5b9f21,_0xf361f0,_0x452327,_0x452327);},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['changeIconGraphicBitmap']=function(_0x1bcfd9){const _0x2f193e=_0x4e4f4b,_0x3e0f33=this[_0x2f193e(0x260)],_0x5fea2d=this[_0x2f193e(0x1ce)](),_0x9f019f=this[_0x2f193e(0x143)]();this[_0x2f193e(0x11d)][_0x2f193e(0x255)]=new Bitmap(_0x5fea2d,_0x9f019f);const _0x2a3dd5=this['_graphicSprite'][_0x2f193e(0x255)],_0x508aa5=ImageManager[_0x2f193e(0x141)],_0x305f4d=ImageManager[_0x2f193e(0x24b)],_0xea98a=Math[_0x2f193e(0x2ca)](_0x508aa5,_0x305f4d,_0x5fea2d,_0x9f019f),_0x6ae08c=_0x3e0f33%0x10*_0x508aa5,_0x1d9e41=Math[_0x2f193e(0x2e7)](_0x3e0f33/0x10)*_0x305f4d,_0x7868f0=Math['floor'](Math[_0x2f193e(0x2e6)](_0x5fea2d-_0xea98a,0x0)/0x2),_0x2e62ec=Math[_0x2f193e(0x2e7)](Math[_0x2f193e(0x2e6)](_0x9f019f-_0xea98a,0x0)/0x2);_0x2a3dd5['blt'](_0x1bcfd9,_0x6ae08c,_0x1d9e41,_0x508aa5,_0x305f4d,_0x7868f0,_0x2e62ec,_0xea98a,_0xea98a);},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x2dd)]=function(_0x46e314){const _0x2d7f76=_0x4e4f4b,_0x4377a3=this[_0x2d7f76(0x1ce)](),_0x488241=this[_0x2d7f76(0x143)](),_0x261c52=Math[_0x2d7f76(0x2ca)](_0x4377a3,_0x488241);this[_0x2d7f76(0x11d)][_0x2d7f76(0x255)]=new Bitmap(_0x4377a3,_0x488241);const _0x4c8e1c=this[_0x2d7f76(0x11d)][_0x2d7f76(0x255)],_0x1b2444=this[_0x2d7f76(0x2c4)][_0x2d7f76(0x119)](/\$/i),_0x1b8db6=_0x1b2444?0x1:ImageManager['svActorHorzCells'],_0x427108=_0x1b2444?0x1:ImageManager[_0x2d7f76(0x1d1)],_0x9f05dc=_0x46e314[_0x2d7f76(0x258)]/_0x1b8db6,_0x250cd4=_0x46e314[_0x2d7f76(0x205)]/_0x427108,_0x2f4f28=Math[_0x2d7f76(0x2ca)](0x1,_0x261c52/_0x9f05dc,_0x261c52/_0x250cd4),_0x47df0a=_0x9f05dc*_0x2f4f28,_0x18d8ca=_0x250cd4*_0x2f4f28,_0x10a8c1=Math['round']((_0x4377a3-_0x47df0a)/0x2),_0x21e843=Math['round']((_0x488241-_0x18d8ca)/0x2);_0x4c8e1c[_0x2d7f76(0x209)](_0x46e314,0x0,0x0,_0x9f05dc,_0x250cd4,_0x10a8c1,_0x21e843,_0x47df0a,_0x18d8ca);},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x1b7)]=function(_0x26a049){const _0x25c4a6=_0x4e4f4b,_0x3acc23=Window_STB_TurnOrder[_0x25c4a6(0x2f1)],_0x592930=this[_0x25c4a6(0x1ce)](),_0x63bfb8=this['bitmapHeight'](),_0x3d40b8=Math[_0x25c4a6(0x2ca)](_0x592930,_0x63bfb8);this[_0x25c4a6(0x11d)][_0x25c4a6(0x255)]=new Bitmap(_0x592930,_0x63bfb8);const _0x536405=this['_graphicSprite'][_0x25c4a6(0x255)],_0x2855a9=Math[_0x25c4a6(0x2ca)](0x1,_0x3d40b8/_0x26a049[_0x25c4a6(0x258)],_0x3d40b8/_0x26a049[_0x25c4a6(0x205)]),_0x5560c6=_0x26a049['width']*_0x2855a9,_0x2a9205=_0x26a049[_0x25c4a6(0x205)]*_0x2855a9,_0xa5119e=Math['round']((_0x592930-_0x5560c6)/0x2),_0x780a06=Math[_0x25c4a6(0x2ae)]((_0x63bfb8-_0x2a9205)/0x2);_0x536405[_0x25c4a6(0x209)](_0x26a049,0x0,0x0,_0x26a049[_0x25c4a6(0x258)],_0x26a049[_0x25c4a6(0x205)],_0xa5119e,_0x780a06,_0x5560c6,_0x2a9205);},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x294)]=function(){const _0x3cfd9a=_0x4e4f4b,_0x3a9bfb=this[_0x3cfd9a(0x185)]();if(!_0x3a9bfb)return;if(!_0x3a9bfb['isEnemy']())return;if(this[_0x3cfd9a(0x262)]===_0x3a9bfb['battlerHue']())return;this[_0x3cfd9a(0x262)]=_0x3a9bfb['battlerHue'](),this[_0x3cfd9a(0x11d)]['setHue'](_0x3a9bfb[_0x3cfd9a(0x1f2)]()?0x0:this['_graphicHue']);},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x2c5)]=function(){const _0x37c247=_0x4e4f4b;if(!this['_letterSprite'])return;const _0x5946b=this[_0x37c247(0x185)]();if(!_0x5946b)return;if(this[_0x37c247(0x293)]===_0x5946b[_0x37c247(0x293)]&&this['_plural']===_0x5946b[_0x37c247(0x17e)])return;this[_0x37c247(0x293)]=_0x5946b[_0x37c247(0x293)],this['_plural']=_0x5946b[_0x37c247(0x17e)];const _0x543018=Window_STB_TurnOrder[_0x37c247(0x2f1)],_0x213cad=this[_0x37c247(0x292)](),_0x30f818=this['bitmapWidth'](),_0x73ce14=this[_0x37c247(0x143)](),_0x52d76d=this[_0x37c247(0x1bb)][_0x37c247(0x255)];_0x52d76d[_0x37c247(0x2b4)]();if(!this['_plural'])return;_0x52d76d['fontFace']=_0x543018[_0x37c247(0x2fb)]||$gameSystem['mainFontFace'](),_0x52d76d[_0x37c247(0x1cc)]=_0x543018[_0x37c247(0x22b)]||0x10,_0x213cad?_0x52d76d[_0x37c247(0x1b1)](this['_letter'][_0x37c247(0x1bf)](),0x0,_0x73ce14/0x2,_0x30f818,_0x73ce14/0x2,_0x37c247(0x259)):_0x37c247(0x126)==='EYaYQ'?this['clearSTB']():_0x52d76d['drawText'](this[_0x37c247(0x293)]['trim'](),0x0,0x2,_0x30f818-0x8,_0x73ce14-0x4,'right');},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)]['updateSelectionEffect']=function(){const _0xb3d26a=_0x4e4f4b,_0x8e8815=this[_0xb3d26a(0x185)]();if(!_0x8e8815)return;const _0x2c51ce=_0x8e8815[_0xb3d26a(0x185)]();if(!_0x2c51ce)return;const _0x57350f=_0x2c51ce[_0xb3d26a(0x2cb)]();if(!_0x57350f)return;this[_0xb3d26a(0x25b)](_0x57350f[_0xb3d26a(0x13c)]);},Sprite_STB_TurnOrder_Battler[_0x4e4f4b(0x135)][_0x4e4f4b(0x2b6)]=function(){return this['battler']();},VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x15b)]=Window_Help['prototype'][_0x4e4f4b(0x26b)],Window_Help[_0x4e4f4b(0x135)][_0x4e4f4b(0x26b)]=function(_0x5ad95c){const _0x123eee=_0x4e4f4b;BattleManager[_0x123eee(0x210)]()&&_0x5ad95c&&_0x5ad95c[_0x123eee(0x1f0)]&&_0x5ad95c['note'][_0x123eee(0x119)](/<(?:STB) HELP>\s*([\s\S]*)\s*<\/(?:STB) HELP>/i)?_0x123eee(0x24a)===_0x123eee(0x24a)?this[_0x123eee(0x2db)](String(RegExp['$1'])):(this[_0x123eee(0x218)]===_0x217c14&&this[_0x123eee(0x241)](),this[_0x123eee(0x218)]=_0x30e8cd):VisuMZ[_0x123eee(0x14f)][_0x123eee(0x15b)]['call'](this,_0x5ad95c);};function Window_STB_TurnOrder(){const _0x637b47=_0x4e4f4b;this[_0x637b47(0x212)](...arguments);}Window_STB_TurnOrder[_0x4e4f4b(0x135)]=Object[_0x4e4f4b(0x25a)](Window_Base['prototype']),Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x13f)]=Window_STB_TurnOrder,Window_STB_TurnOrder['Settings']=VisuMZ[_0x4e4f4b(0x14f)][_0x4e4f4b(0x2f1)]['TurnOrder'],Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x212)]=function(){const _0xe41485=_0x4e4f4b,_0x49c754=this[_0xe41485(0x2cd)]();this['initHomePositions'](_0x49c754),Window_Base[_0xe41485(0x135)]['initialize']['call'](this,_0x49c754),this['createBattlerSprites'](),this[_0xe41485(0x11c)](),this['opacity']=0x0;},Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x2cd)]=function(){const _0x240d31=_0x4e4f4b;return this['createBattlerRect']($gameParty[_0x240d31(0x23e)](),0x9,!![]);},Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x2ec)]=function(_0x15e833){const _0x2a5d4d=_0x4e4f4b;this[_0x2a5d4d(0x29e)]=this[_0x2a5d4d(0x256)]=_0x15e833['x'],this[_0x2a5d4d(0x2d9)]=this[_0x2a5d4d(0x21d)]=_0x15e833['y'],this[_0x2a5d4d(0x240)]=_0x15e833[_0x2a5d4d(0x258)],this['_fullHeight']=_0x15e833[_0x2a5d4d(0x205)],this['_homeDuration']=0x0;},Window_STB_TurnOrder[_0x4e4f4b(0x135)]['createBattlerRect']=function(_0x553ff8,_0x665f25,_0x18835a){const _0x4cd51b=_0x4e4f4b,_0x5385e1=Window_STB_TurnOrder[_0x4cd51b(0x2f1)],_0x175789=this[_0x4cd51b(0x292)]()?_0x5385e1['MaxHorzSprites']:_0x5385e1[_0x4cd51b(0x170)],_0xade9d7=Math[_0x4cd51b(0x2ca)](_0x175789,_0x553ff8+_0x665f25),_0x4ae6e0=SceneManager[_0x4cd51b(0x276)][_0x4cd51b(0x1cb)][_0x4cd51b(0x205)],_0x13c9f3=SceneManager[_0x4cd51b(0x276)][_0x4cd51b(0x1c4)][_0x4cd51b(0x205)],_0x636224=_0x5385e1[_0x4cd51b(0x123)],_0x9a749a=Graphics[_0x4cd51b(0x205)]-_0x4ae6e0-_0x13c9f3;let _0x460225=0x0,_0x5ec24c=0x0,_0x3f1e2f=0x0,_0xc8d85=0x0;switch(_0x5385e1[_0x4cd51b(0x2d1)]){case _0x4cd51b(0x225):_0x460225=_0x5385e1[_0x4cd51b(0x2b2)]*_0xade9d7+_0x636224,_0x5ec24c=_0x5385e1[_0x4cd51b(0x227)],_0x3f1e2f=Math[_0x4cd51b(0x17d)]((Graphics['width']-_0x460225)/0x2),_0xc8d85=_0x5385e1['ScreenBuffer'];break;case _0x4cd51b(0x127):_0x460225=_0x5385e1[_0x4cd51b(0x2b2)]*_0xade9d7+_0x636224,_0x5ec24c=_0x5385e1[_0x4cd51b(0x227)],_0x3f1e2f=Math['ceil']((Graphics[_0x4cd51b(0x258)]-_0x460225)/0x2),_0xc8d85=Graphics[_0x4cd51b(0x205)]-_0x4ae6e0-_0x5ec24c-_0x5385e1[_0x4cd51b(0x159)];break;case'left':_0x460225=_0x5385e1[_0x4cd51b(0x227)],_0x5ec24c=_0x5385e1[_0x4cd51b(0x2b2)]*_0xade9d7+_0x636224,_0x3f1e2f=_0x5385e1['ScreenBuffer'],_0xc8d85=Math[_0x4cd51b(0x17d)]((_0x9a749a-_0x5ec24c)/0x2),_0xc8d85+=_0x13c9f3;break;case _0x4cd51b(0x2b8):_0x460225=_0x5385e1[_0x4cd51b(0x227)],_0x5ec24c=_0x5385e1['SpriteThin']*_0xade9d7+_0x636224,_0x3f1e2f=Graphics[_0x4cd51b(0x258)]-_0x460225-_0x5385e1[_0x4cd51b(0x159)],_0xc8d85=Math['ceil']((_0x9a749a-_0x5ec24c)/0x2),_0xc8d85+=_0x13c9f3;break;}if(!_0x18835a){const _0x1f1c75=Window_STB_TurnOrder[_0x4cd51b(0x2f1)][_0x4cd51b(0x195)];let _0xd1603f=Math[_0x4cd51b(0x2ca)](_0x175789,Math[_0x4cd51b(0x2ca)]($gameParty[_0x4cd51b(0x23e)]()+0x8)-_0xade9d7);switch(_0x5385e1[_0x4cd51b(0x2d1)]){case'top':case _0x4cd51b(0x127):if(_0x1f1c75){if(_0x4cd51b(0x2b7)!=='vMSff')_0x3f1e2f-=_0xd1603f*_0x5385e1[_0x4cd51b(0x2b2)];else{const _0x3e32dd=_0x1833de[_0x4cd51b(0x2f1)],_0x3bd9e1=this['isHorz']()?_0x3e32dd['MaxHorzSprites']:_0x3e32dd[_0x4cd51b(0x170)];return _0x3bd9e1+0x1;}}break;}}return _0x3f1e2f+=_0x5385e1[_0x4cd51b(0x291)],_0xc8d85+=_0x5385e1['DisplayOffsetY'],new Rectangle(_0x3f1e2f,_0xc8d85,_0x460225,_0x5ec24c);},Window_STB_TurnOrder['prototype'][_0x4e4f4b(0x174)]=function(){this['padding']=0x0;},Window_STB_TurnOrder['prototype'][_0x4e4f4b(0x292)]=function(){const _0x1c9701=_0x4e4f4b,_0x15f048=Window_STB_TurnOrder['Settings'],_0x2d81c6=['top',_0x1c9701(0x127)][_0x1c9701(0x226)](_0x15f048['DisplayPosition']);return _0x2d81c6;},Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x1c6)]=function(){const _0x361204=_0x4e4f4b;this[_0x361204(0x231)]=new Sprite(),this[_0x361204(0x286)](this[_0x361204(0x231)]),this[_0x361204(0x15a)]=[];for(let _0x5a6d89=0x0;_0x5a6d89<$gameParty[_0x361204(0x23e)]();_0x5a6d89++){if('Anjpy'===_0x361204(0x220)){const _0xfa8bb7=new Sprite_STB_TurnOrder_Battler($gameParty,_0x5a6d89);this[_0x361204(0x231)]['addChild'](_0xfa8bb7),this[_0x361204(0x15a)][_0x361204(0x2f8)](_0xfa8bb7);}else this['_positionTargetY']=_0x2240a1?0x0:_0x42fe2d[_0x361204(0x205)]-this[_0x361204(0x1ca)]-_0x1e7001['SpriteThin'];}for(let _0x431f54=0x0;_0x431f54<$gameTroop['members']()[_0x361204(0x2a3)];_0x431f54++){if(_0x361204(0x2a2)===_0x361204(0x1ab)){_0x1314a1[_0x361204(0x14f)][_0x361204(0x183)]['call'](this);if(this[_0x361204(0x210)]()&&_0xadb346[_0x361204(0x22c)]()&&!this[_0x361204(0x1e8)])this['startInputSTB']();}else{const _0x2efb52=new Sprite_STB_TurnOrder_Battler($gameTroop,_0x431f54);this[_0x361204(0x231)][_0x361204(0x283)](_0x2efb52),this[_0x361204(0x15a)][_0x361204(0x2f8)](_0x2efb52);}}},Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x1ef)]=function(){const _0x47326b=_0x4e4f4b;Window_Base['prototype'][_0x47326b(0x1ef)][_0x47326b(0x186)](this),this[_0x47326b(0x25f)](),this[_0x47326b(0x28a)](),this[_0x47326b(0x297)](),this['updateBattleContainerOrder'](),this[_0x47326b(0x11c)]();},Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x25f)]=function(){const _0x264cf0=_0x4e4f4b;if(this['_homeDuration']>0x0){const _0x37b548=this['_homeDuration'];this['_homeX']=(this['_homeX']*(_0x37b548-0x1)+this[_0x264cf0(0x29e)])/_0x37b548,this[_0x264cf0(0x21d)]=(this[_0x264cf0(0x21d)]*(_0x37b548-0x1)+this['_targetHomeY'])/_0x37b548,this[_0x264cf0(0x1df)]--,this[_0x264cf0(0x1df)]<=0x0&&(this[_0x264cf0(0x256)]=this[_0x264cf0(0x29e)],this[_0x264cf0(0x21d)]=this['_targetHomeY']);}},Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x28a)]=function(){const _0x3bbefb=_0x4e4f4b,_0xa97252=Window_STB_TurnOrder[_0x3bbefb(0x2f1)];if(_0xa97252['DisplayPosition']!==_0x3bbefb(0x225))return;if(!_0xa97252[_0x3bbefb(0x1bc)])return;const _0x98b21b=SceneManager[_0x3bbefb(0x276)][_0x3bbefb(0x1c4)];if(!_0x98b21b)return;if(_0x98b21b[_0x3bbefb(0x116)]){if(_0x3bbefb(0x27c)!==_0x3bbefb(0x27c))return _0x782538(_0x239b6a['$1']);else this['x']=this[_0x3bbefb(0x256)]+(_0xa97252[_0x3bbefb(0x2e9)]||0x0),this['y']=this[_0x3bbefb(0x21d)]+(_0xa97252[_0x3bbefb(0x30b)]||0x0);}else this['x']=this[_0x3bbefb(0x256)],this['y']=this[_0x3bbefb(0x21d)];const _0x4e6786=SceneManager[_0x3bbefb(0x276)]['_windowLayer'];if(Window_STB_TurnOrder[_0x3bbefb(0x242)]===undefined){if('DgiOg'!==_0x3bbefb(0x184))Window_STB_TurnOrder[_0x3bbefb(0x242)]=Math['round']((Graphics[_0x3bbefb(0x258)]-Math[_0x3bbefb(0x2ca)](Graphics['boxWidth'],_0x4e6786[_0x3bbefb(0x258)]))/0x2),Window_STB_TurnOrder[_0x3bbefb(0x307)]=Math[_0x3bbefb(0x2ae)]((Graphics['height']-Math[_0x3bbefb(0x2ca)](Graphics[_0x3bbefb(0x152)],_0x4e6786[_0x3bbefb(0x205)]))/0x2);else{const _0x287119=this[_0x3bbefb(0x249)]()[_0x3bbefb(0x1f0)];if(_0x287119['match'](/<STB TURN ORDER ICON:[ ](\d+)>/i))return _0x57b676(_0x5e2c29['$1']);return _0x5e73c3[_0x3bbefb(0x2f1)]['ActorBattlerIcon'];}}this['x']+=_0x4e6786['x']-Window_STB_TurnOrder[_0x3bbefb(0x242)],this['y']+=_0x4e6786['y']-Window_STB_TurnOrder['_ogWindowLayerY'];},Window_STB_TurnOrder[_0x4e4f4b(0x135)]['updateSidePosition']=function(){const _0x9da7bc=_0x4e4f4b,_0x219c94=Window_STB_TurnOrder[_0x9da7bc(0x2f1)];if(['top'][_0x9da7bc(0x226)](_0x219c94[_0x9da7bc(0x2d1)]))return;this['x']=this[_0x9da7bc(0x256)],this['y']=this[_0x9da7bc(0x21d)];const _0x480750=SceneManager['_scene'][_0x9da7bc(0x1d4)];this['x']+=_0x480750['x'],this['y']+=_0x480750['y'];},Window_STB_TurnOrder['prototype'][_0x4e4f4b(0x26a)]=function(){const _0x43c66d=_0x4e4f4b;if(!this[_0x43c66d(0x231)])return;const _0x18867c=this[_0x43c66d(0x231)]['children'];if(!_0x18867c)return;_0x18867c[_0x43c66d(0x2ed)](this[_0x43c66d(0x20f)][_0x43c66d(0x287)](this));},Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x20f)]=function(_0x1b5080,_0x5b7b26){const _0x3ca3fd=_0x4e4f4b,_0x5a6bd9=this[_0x3ca3fd(0x292)](),_0x45ec3f=Window_STB_TurnOrder[_0x3ca3fd(0x2f1)]['OrderDirection'];if(_0x5a6bd9&&!_0x45ec3f)return _0x1b5080['x']-_0x5b7b26['x'];else{if(_0x5a6bd9&&_0x45ec3f){if('PJJRX'==='pKPXA'){const _0x56d6f8=_0x39270d[_0x3ca3fd(0x16d)]()[_0x3ca3fd(0x21b)](_0x201a74=>_0x201a74[_0x3ca3fd(0x24f)]()),_0x399edf=_0x56d6f8['filter'](_0x538bbb=>_0x538bbb[_0x3ca3fd(0x247)]());return _0x56d6f8['length']===_0x399edf['length'];}else return _0x5b7b26['x']-_0x1b5080['x'];}else{if(!_0x5a6bd9&&_0x45ec3f)return _0x1b5080['y']-_0x5b7b26['y'];else{if(!_0x5a6bd9&&!_0x45ec3f){if(_0x3ca3fd(0x29f)===_0x3ca3fd(0x29f))return _0x5b7b26['y']-_0x1b5080['y'];else this[_0x3ca3fd(0x273)]&&(!this['_actionBattlers'][_0x3ca3fd(0x226)](this[_0x3ca3fd(0x273)])&&this[_0x3ca3fd(0x22e)][_0x3ca3fd(0x254)](this[_0x3ca3fd(0x273)])),this[_0x3ca3fd(0x273)]=this[_0x3ca3fd(0x274)]();}}}}},Window_STB_TurnOrder[_0x4e4f4b(0x135)][_0x4e4f4b(0x11c)]=function(){this['visible']=$gameSystem['isBattleSystemSTBTurnOrderVisible']();},Window_STB_TurnOrder['prototype'][_0x4e4f4b(0x150)]=function(_0xa0995b){const _0x3abce4=_0x4e4f4b;this['_turnOrderContainer'][_0x3abce4(0x2ed)]((_0x52ca55,_0x27b624)=>{const _0x31b758=_0x3abce4;return _0x52ca55[_0x31b758(0x302)]()-_0x27b624[_0x31b758(0x302)]();}),this[_0x3abce4(0x234)]();if(!_0xa0995b)return;for(const _0x3b4982 of this[_0x3abce4(0x15a)]){if(!_0x3b4982)continue;_0x3b4982[_0x3abce4(0x1ef)](),_0x3b4982[_0x3abce4(0x1be)]=0x0;}},Window_STB_TurnOrder['prototype']['recalculateHome']=function(){const _0x5a60e2=_0x4e4f4b;if(!this[_0x5a60e2(0x292)]())return;const _0xcf537d=VisuMZ[_0x5a60e2(0x14f)][_0x5a60e2(0x2f1)]['TurnOrder'];if(!_0xcf537d[_0x5a60e2(0x1ea)])return;const _0x2a9992=$gameParty['members']()[_0x5a60e2(0x21b)](_0x306bd9=>_0x306bd9&&_0x306bd9[_0x5a60e2(0x2e2)]()&&_0x306bd9[_0x5a60e2(0x24f)]())[_0x5a60e2(0x2a3)],_0x5a9c41=$gameTroop[_0x5a60e2(0x1eb)]()[_0x5a60e2(0x21b)](_0xfe924=>_0xfe924&&_0xfe924[_0x5a60e2(0x2e2)]()&&_0xfe924[_0x5a60e2(0x24f)]())[_0x5a60e2(0x2a3)],_0x1359f3=this['createBattlerRect'](_0x2a9992,_0x5a9c41);this[_0x5a60e2(0x29e)]=_0x1359f3['x'],this['_targetHomeY']=_0x1359f3['y'],(this[_0x5a60e2(0x29e)]!==this[_0x5a60e2(0x256)]||this[_0x5a60e2(0x2d9)]!==this[_0x5a60e2(0x21d)])&&(this[_0x5a60e2(0x1df)]=_0xcf537d[_0x5a60e2(0x1d9)]);};function _0x4813(){const _0x5afeaa=['TFKud','SystemTurnOrderVisibility','createGraphicSprite','stbGainInstant','_currentActor','Scene_Battle_createAllWindows','updateBattleContainerOrder','setItem','ExploitEleRate','updateTurnOrderSTB','Game_Battler_performCollapse','OOcjb','Game_Battler_onBattleStart','svBattlerName','BattleManager_finishActorInput','_subject','getNextSubject','IJnrg','_scene','ytEFE','fillRect','battleEnd','_stbTurnOrderIconIndex','STR','ZbtWz','zuzlh','_stbNextTurnSpeed','initBattleSystemSTB','friendsUnit','%1SystemBorder','StbTurnOrderActorIcon','addChild','performCollapse','updateOpacity','addInnerChild','bind','isActor','Game_Party_removeActor','updatePosition','Game_Action_applyGlobal','TurnOrderSTBGraphicFaceName','createTurnOrderSTBGraphicIconIndex','setSTBExploitedFlag','ActorBattlerType','PopupText','DisplayOffsetX','isHorz','_letter','updateGraphicHue','BattleManager_battleSys','140AgkHUX','updateSidePosition','reserveCommonEvent','FlashDuration','_graphicType','repositionLogWindowSTB','checkOpacity','createBackgroundSprite','_targetHomeX','nbbKl','ADzeS','EnableExploit','smbsC','length','some','ARRAYJSON','setSTBNextTurnSpeed','TllPq','wqCzQ','face','onBattleStart','stbExploitedStates','createTurnOrderSTBGraphicFaceIndex','svactor','round','selectAllActions','hide','stbCannotBeExploiter','SpriteThin','2530125nWbUeE','clear','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','getStateTooltipBattler','lPpeK','right','MtZGa','calcElementRate','Exploiter','RegExp','_phase','startInputSTB','onBattleStartSTB','_stbTurnOrderVisible','_containerWidth','GqeRL','Visible','_graphicSv','updateLetter','NextTurnSavedSpeedJS','_index','KaJPd','HXsHx','min','mainSprite','4264641UqgPMi','windowRect','endActionSTB','startInput','loadSystem','DisplayPosition','nsqTg','ARRAYNUM','item','isPartyCommandWindowDisabled','1wmPWBR','Enemies','checkTargetPositions','_targetHomeY','KrKmK','setText','parse','changeSvActorGraphicBitmap','Game_BattlerBase_hide','NUM','_graphicFaceName','requestFauxAnimation','isAlive','getBattleSystem','applyGlobalBattleSystemSTB','parameters','max','floor','Scene_Battle_commandCancel','RepositionTopHelpX','StbTurnOrderClearEnemyGraphic','ATvZZ','initHomePositions','sort','stepForward','critical','dYbSd','Settings','test','makeActionOrders','startActorInput','14320cUetGx','makeSTBSpeed','IconIndex','push','_graphicEnemy','_forcing','EnemyBattlerFontFace','_isAppeared','description','calculateTargetPositions','_logWindow','AwZkc','%1BgColor1','containerPosition','EnemyBattlerFaceName','zzZIJ','_position','STRUCT','_ogWindowLayerY','commandCancelSTB','Scene_Battle_createActorCommandWindow','ConvertParams','RepositionTopHelpY','addSTBNextTurnSpeed','loadSvEnemy','CLFhn','FaceName','Game_Actor_selectNextCommand','setSTBGraphicIconIndex','currentAction','processTurnSTB','Actors','visible','createActorCommandWindow','processTurn','match','result','_forcedBattlers','updateVisibility','_graphicSprite','pKmrg','removeActionBattlersSTB','Exploit','Mechanics','OQmEb','SubjectDistance','FaceIndex','_stbAutoBattle','zzcHQ','bottom','CannotBeExploiter','vAbgr','allowRandomSpeed','ZorvP','VFOio','6cZpDUs','apnCc','Scene_Battle_commandFight','startFade','AnimationID','cIAfa','BattleManager_isTpb','onTurnEnd','prototype','FlashColor','performSTBExploiter','commandFight','clearRect','%1BgColor2','selectNextCommand','_blendColor','becomeSTBExploited','vsEnemiesFullExploit','constructor','clearSTBExploit','iconWidth','vbBhN','bitmapHeight','AIPKI','_partyCommandWindow','ShowMarkerBorder','dnksY','Game_Actor_makeAutoBattleActions','getChildIndex','allBattleMembers','_stbTurnOrderGraphicType','selectNextActorSTB','UKPMN','QNglt','BattleSystemSTB','updateTurnOrder','icon','boxHeight','EnemyBattlerFaceIndex','executeDamage','mXEeY','769354zJoGaC','faceName','setup','ScreenBuffer','_turnOrderContainer','Window_Help_setItem','Enemy','GpWuJ','makeSpeed','finishActorInput','createTurnOrderSTBGraphicType','createLetterSprite','isSceneBattle','removeActor','EnemyBattlerIcon','ieneG','HgRgX','speed','updateGraphic','4990016CDZaEE','Exploited','changeIconGraphicBitmap','StbTurnOrderClearActorGraphic','aliveMembers','isAutoBattle','MdPgl','MaxVertSprites','cJXUT','initMembersBattleSystemSTB','updateSelectionEffect','updatePadding','LZdPt','selectNextActor','UnlimitedExploits','dVZhj','defaultPosition','BorderThickness','_backgroundSprite','qtjkM','ceil','_plural','Game_BattlerBase_appear','applyGlobal','areAllActorsExploited','TurnOrderSTBGraphicFaceIndex','BattleManager_startInput','gNEkC','battler','call','34113SUgUBC','Game_System_initialize','VENVs','Actor','_inputting','StbTurnOrderEnemyFace','performActionEnd','vsActorsFullExploit','ARRAYSTRUCT','TurnOrderSTBGraphicType','clearSTBNextTurnSpeed','isBattleSystemSTBTurnOrderVisible','afulb','setSTBExploited','OrderDirection','clearTurnOrderSTBGraphics','indexOf','ARRAYFUNC','getStateIdWithName','Game_BattlerBase_initMembers','StbTurnOrderActorFace','isAutoBattleStb','createActorCommandWindowSTB','QSCrk','irlUi','FUNC','BattleManager_isActiveTpb','_stbExploited','TurnOrderSTBGraphicIconIndex','containerWindow','setupTextPopup','gradientFillRect','createBorderSprite','CjRjj','toUpperCase','EVAL','cdSDt','_actions','CustomJS','ParseStateData','_containerHeight','changeFaceGraphicBitmap','drawText','_positionTargetX','QoTBQ','drCwy','BattleCore','Game_Actor_isAutoBattle','changeEnemyGraphicBitmap','executeDamageSTB','commandCancel','%1BorderColor','_letterSprite','RepositionTopForHelp','format','_positionDuration','trim','TurnResetExploits','faceWidth','_handlers','getSTBNextTurnSpeed','_helpWindow','addState','createBattlerSprites','_fadeTarget','addLoadListener','faceHeight','_positionTargetY','_statusWindow','fontSize','RepositionLogWindow','bitmapWidth','FZhiU','map','svActorVertCells','StbTurnOrderEnemyIcon','AddedStates','_windowLayer','_stateIDs','addChildAt','createAllWindows','enemy','UpdateFrames','zpsJY','InitialSpeedJS','stbCannotBeExploited','zadod','performActionEndSTB','_homeDuration','_isAlive','shift','numActions','setBattleSystemSTBTurnOrderVisible','isImmortal','exit','appear','%1SystemBg','_surprise','RtSqi','CenterHorz','members','VcHLq','registerCommand','initMembers','update','note','padding','hasSvBattler','TextColor','Game_Battler_onTurnEnd','createTurnOrderSTBGraphicFaceName','_isBattleOver','areAllEnemiesExploited','_stbTurnOrderFaceIndex','opacity','createChildren','BiSCN','BattleManager_processTurn','_speed','startActorCommandSelection','Mirror','checkPosition','ShowMarkerBg','_stbTurnOrderWindow','isEnemy','BattleManager_isTurnBased','height','ForcedActions','STB','_forceAction','blt','svActorHorzCells','ExploitEleWeakness','hasSTBExploited','qgNYo','Game_Action_executeDamage','compareBattlerSprites','isSTB','CannotBeExploited','initialize','Game_Action_speed','231RMMYuF','Game_Battler_makeSpeed','_unit','name','_stbExploitAdvantageFlag','battlerName','loadEnemy','filter','close','_homeY','RzLNm','BattleManager_endAction','Anjpy','ExtraActions','createInitialPositions','3707424eifPNq','makeAutoBattleActions','top','includes','SpriteLength','stbExploiterStates','Game_Action_clear','BQvph','EnemyBattlerFontSize','canInput','mKQxl','_actionBattlers','processUpdateGraphic','JSON','_turnOrderInnerSprite','sWWHq','Speed','recalculateHome','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','loadSvActor','BattleManager_makeActionOrders','traitObjects','displayExploitedEffects','isSTBExploitSystemEnabled','LocDE','subject','_fadeDuration','maxBattleMembers','Game_Battler_performActionEnd','_fullWidth','clearSTB','_ogWindowLayerX','obqcp','isTpb','_actorCommandWindow','canMove','isSTBExploited','version','actor','dJisT','iconHeight','YNVyv','BattleManager_selectNextActor','_graphicFaceIndex','isAppeared','ExploitCritical','endAction','ARRAYEVAL','LmiHC','unshift','bitmap','_homeX','_stbTurnOrderFaceName','width','center','create','setBlendColor','anchor','loadFace','rUvLi','updateHomePosition','_graphicIconIndex','EnemyBattlerType','_graphicHue','getColor'];_0x4813=function(){return _0x5afeaa;};return _0x4813();}