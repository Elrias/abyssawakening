//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.27;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.27] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
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
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
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
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
 *
 * ---
 *
 * ============================================================================
 * VisuStella MZ Compatibility
 * ============================================================================
 *
 * While this plugin is compatible with the majority of the VisuStella MZ
 * plugin library, it is not compatible with specific plugins or specific
 * features. This section will highlight the main plugins/features that will
 * not be compatible with this plugin or put focus on how the make certain
 * features compatible.
 *
 * ---
 * 
 * VisuMZ_2_BattleSystemOTB
 * 
 * With Battle System - OTB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Order Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
 * 
 * ---
 * 
 * VisuMZ_2_BattleSystemSTB
 * 
 * With Battle System - STB, the player cannot change entire parties at once
 * from the Party Command Window. The feature will be unaccessible while
 * Standard Turn Battle is in play. However, the player can still change party
 * members through the Actor Command Window by having actors replace other
 * actors. Party changing is also available through battle events, Common
 * Events, and script calls.
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Required Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.27: February 16, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * * Feature Update!
 * ** When holding the "up" keyboard button with the reserve window active, the
 *    return to the active party window will no longer happen unless the "up"
 *    key is released and then pressed again. Update made by Olivia.
 * 
 * Version 1.26: January 20, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.25: July 28, 2022
 * * Bug Fixes!
 * ** Changing party members via actor command with a less than max battle size
 *    after removing a middle member midway through battle will no longer cause
 *    weird results when switching. Fix made by Arisu.
 * ** Party members that were switched out during battle animations with active
 *    TPB/ATB will no longer cause damage popup crashes when switched back in a
 *    follow up battle. Fix made by Arisu.
 * 
 * Version 1.24: March 24, 2022
 * * Compatibility Update!
 * ** Compatibility update with Skills & States Core Passive Conditions
 *    involving the party leader. Update made by Arisu.
 * 
 * Version 1.23: January 13, 2022
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.22: July 16, 2021
 * * Feature Update!
 * ** Added a fail safe that prevents on-battle start events from triggering
 *    when adding party members outside of battle under evented circumstances
 *    that function as a bridge between event and battle. Fix by Irina.
 * 
 * Version 1.21: July 9, 2021
 * * Bug Fixes!
 * ** When using TPB-based battle systems, adding actors to the main party
 *    would not enable them to move. This should be fixed. Fix made by Irina.
 * 
 * Version 1.20: July 2, 2021
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.19: June 18, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.18: April 16, 2021
 * * Documentation Update!
 * ** Fixed typo. Fix made by Arisu.
 * 
 * Version 1.17: March 26, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_BattleSystemOTB plugin.
 * 
 * Version 1.16: March 19, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.15: March 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features
 * ** New Plugin Parameter added by Irina:
 * *** Plugin Parameters > Gneral > Battle Scene > Battle Party Icon
 * **** For some reason, we never had a setting that lets you change the party
 *      icon. Well, now there is!
 * 
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyIcon:num
 * @text Battle Party Icon
 * @parent BattleScene
 * @desc Icon used for changing party members.
 * @default 75
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Required Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x387eb3=_0x40be;(function(_0x7c7b7a,_0x4eb159){const _0x377ad5=_0x40be,_0x3d86dd=_0x7c7b7a();while(!![]){try{const _0x2bb8c8=parseInt(_0x377ad5(0x274))/0x1+-parseInt(_0x377ad5(0x20b))/0x2+parseInt(_0x377ad5(0xb8))/0x3*(parseInt(_0x377ad5(0x264))/0x4)+-parseInt(_0x377ad5(0x134))/0x5*(-parseInt(_0x377ad5(0x178))/0x6)+parseInt(_0x377ad5(0x148))/0x7*(parseInt(_0x377ad5(0x2d2))/0x8)+parseInt(_0x377ad5(0xd5))/0x9*(parseInt(_0x377ad5(0x1a9))/0xa)+parseInt(_0x377ad5(0xd3))/0xb*(-parseInt(_0x377ad5(0x23a))/0xc);if(_0x2bb8c8===_0x4eb159)break;else _0x3d86dd['push'](_0x3d86dd['shift']());}catch(_0x346ee2){_0x3d86dd['push'](_0x3d86dd['shift']());}}}(_0x3a5f,0x6d042));var label='PartySystem',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x387eb3(0xa0)](function(_0x42614c){const _0x22c923=_0x387eb3;return _0x42614c[_0x22c923(0xae)]&&_0x42614c[_0x22c923(0x1e0)][_0x22c923(0xda)]('['+label+']');})[0x0];VisuMZ[label][_0x387eb3(0xe3)]=VisuMZ[label][_0x387eb3(0xe3)]||{},VisuMZ[_0x387eb3(0x11b)]=function(_0x1726d4,_0x5c65e9){const _0xb7e17b=_0x387eb3;for(const _0x56c9a7 in _0x5c65e9){if('aCjSq'!=='LHeLZ'){if(_0x56c9a7[_0xb7e17b(0x14c)](/(.*):(.*)/i)){if(_0xb7e17b(0x2a0)===_0xb7e17b(0xed))this['callFormation']();else{const _0x5c0c29=String(RegExp['$1']),_0xd671fb=String(RegExp['$2'])['toUpperCase']()[_0xb7e17b(0x290)]();let _0xd6e24b,_0xc30ad6,_0x22c926;switch(_0xd671fb){case'NUM':_0xd6e24b=_0x5c65e9[_0x56c9a7]!==''?Number(_0x5c65e9[_0x56c9a7]):0x0;break;case _0xb7e17b(0x9f):_0xc30ad6=_0x5c65e9[_0x56c9a7]!==''?JSON['parse'](_0x5c65e9[_0x56c9a7]):[],_0xd6e24b=_0xc30ad6[_0xb7e17b(0xbd)](_0x2d1c7d=>Number(_0x2d1c7d));break;case'EVAL':_0xd6e24b=_0x5c65e9[_0x56c9a7]!==''?eval(_0x5c65e9[_0x56c9a7]):null;break;case'ARRAYEVAL':_0xc30ad6=_0x5c65e9[_0x56c9a7]!==''?JSON[_0xb7e17b(0x29d)](_0x5c65e9[_0x56c9a7]):[],_0xd6e24b=_0xc30ad6[_0xb7e17b(0xbd)](_0x35096a=>eval(_0x35096a));break;case _0xb7e17b(0x11a):_0xd6e24b=_0x5c65e9[_0x56c9a7]!==''?JSON[_0xb7e17b(0x29d)](_0x5c65e9[_0x56c9a7]):'';break;case _0xb7e17b(0x250):_0xc30ad6=_0x5c65e9[_0x56c9a7]!==''?JSON['parse'](_0x5c65e9[_0x56c9a7]):[],_0xd6e24b=_0xc30ad6[_0xb7e17b(0xbd)](_0x1264f0=>JSON[_0xb7e17b(0x29d)](_0x1264f0));break;case'FUNC':_0xd6e24b=_0x5c65e9[_0x56c9a7]!==''?new Function(JSON[_0xb7e17b(0x29d)](_0x5c65e9[_0x56c9a7])):new Function(_0xb7e17b(0xb6));break;case _0xb7e17b(0x2b8):_0xc30ad6=_0x5c65e9[_0x56c9a7]!==''?JSON['parse'](_0x5c65e9[_0x56c9a7]):[],_0xd6e24b=_0xc30ad6['map'](_0x4cb8b5=>new Function(JSON[_0xb7e17b(0x29d)](_0x4cb8b5)));break;case _0xb7e17b(0x29c):_0xd6e24b=_0x5c65e9[_0x56c9a7]!==''?String(_0x5c65e9[_0x56c9a7]):'';break;case _0xb7e17b(0xf2):_0xc30ad6=_0x5c65e9[_0x56c9a7]!==''?JSON[_0xb7e17b(0x29d)](_0x5c65e9[_0x56c9a7]):[],_0xd6e24b=_0xc30ad6[_0xb7e17b(0xbd)](_0x5b6338=>String(_0x5b6338));break;case _0xb7e17b(0x132):_0x22c926=_0x5c65e9[_0x56c9a7]!==''?JSON[_0xb7e17b(0x29d)](_0x5c65e9[_0x56c9a7]):{},_0xd6e24b=VisuMZ[_0xb7e17b(0x11b)]({},_0x22c926);break;case _0xb7e17b(0x1d0):_0xc30ad6=_0x5c65e9[_0x56c9a7]!==''?JSON[_0xb7e17b(0x29d)](_0x5c65e9[_0x56c9a7]):[],_0xd6e24b=_0xc30ad6['map'](_0x4198f3=>VisuMZ[_0xb7e17b(0x11b)]({},JSON[_0xb7e17b(0x29d)](_0x4198f3)));break;default:continue;}_0x1726d4[_0x5c0c29]=_0xd6e24b;}}}else{if(_0x38cb5b['members']()[_0xb7e17b(0x22f)]<=0x0)return!![];if(_0x3f5ffc['anyRequiredPartyMembersInReserve']())return![];return _0x24f193[_0xb7e17b(0x2c3)]()['length']>0x0;}}return _0x1726d4;},(_0x1d9231=>{const _0x4e5c86=_0x387eb3,_0x2f146f=_0x1d9231['name'];for(const _0x219ab of dependencies){if(!Imported[_0x219ab]){alert(_0x4e5c86(0x9c)[_0x4e5c86(0x109)](_0x2f146f,_0x219ab)),SceneManager[_0x4e5c86(0x285)]();break;}}const _0x5b4a2c=_0x1d9231[_0x4e5c86(0x1e0)];if(_0x5b4a2c['match'](/\[Version[ ](.*?)\]/i)){if('DuSUo'!==_0x4e5c86(0x18e))this['initialize'](...arguments);else{const _0x4fa8b8=Number(RegExp['$1']);_0x4fa8b8!==VisuMZ[label]['version']&&(alert(_0x4e5c86(0x175)['format'](_0x2f146f,_0x4fa8b8)),SceneManager[_0x4e5c86(0x285)]());}}if(_0x5b4a2c['match'](/\[Tier[ ](\d+)\]/i)){if('kCTSb'!==_0x4e5c86(0x14a)){const _0x23e9c9=Number(RegExp['$1']);if(_0x23e9c9<tier){if('cPtwS'===_0x4e5c86(0x2a3))alert(_0x4e5c86(0x126)['format'](_0x2f146f,_0x23e9c9,tier)),SceneManager['exit']();else while(this[_0x4e5c86(0x12f)]('formation')>=0x0){const _0x8941f5=this[_0x4e5c86(0x12f)](_0x4e5c86(0xea));this[_0x4e5c86(0x268)][_0x4e5c86(0x273)](_0x8941f5,0x1);}}else _0x4e5c86(0x19c)===_0x4e5c86(0x19c)?tier=Math[_0x4e5c86(0xfb)](_0x23e9c9,tier):(_0x36e718[_0x4e5c86(0x191)][_0x4e5c86(0x225)][_0x4e5c86(0xc9)](this,_0x9b5fbf),this['initPartySystem'](),this[_0x4e5c86(0x206)]());}else{const _0x1428fa=this[_0x4e5c86(0xd4)]();this[_0x4e5c86(0xcb)]=new _0x1671d2(_0x1428fa),this['_activePartyWindow'][_0x4e5c86(0x1c6)](_0x1fbbf0['PartySystem'][_0x4e5c86(0xe3)]['Window'][_0x4e5c86(0xd7)]),this[_0x4e5c86(0xcb)][_0x4e5c86(0x2af)]('ok',this[_0x4e5c86(0x263)][_0x4e5c86(0x10e)](this)),this[_0x4e5c86(0xcb)]['setHandler'](_0x4e5c86(0x108),this['popScene']['bind'](this)),this[_0x4e5c86(0x140)](this[_0x4e5c86(0xcb)]);}}VisuMZ[_0x4e5c86(0x11b)](VisuMZ[label][_0x4e5c86(0xe3)],_0x1d9231['parameters']);})(pluginData),PluginManager[_0x387eb3(0x1e9)](pluginData[_0x387eb3(0x101)],'CallPartyScene',_0x3bb6c7=>{const _0x11fb85=_0x387eb3;SceneManager[_0x11fb85(0x1c8)](Scene_Party);}),PluginManager['registerCommand'](pluginData[_0x387eb3(0x101)],_0x387eb3(0xac),_0x5dabda=>{const _0x27ec0a=_0x387eb3;if($gameParty[_0x27ec0a(0x14b)]())return;VisuMZ['ConvertParams'](_0x5dabda,_0x5dabda);const _0x545b52=_0x5dabda[_0x27ec0a(0x1b1)];$gameParty[_0x27ec0a(0x153)](_0x545b52);}),PluginManager[_0x387eb3(0x1e9)](pluginData['name'],_0x387eb3(0xd2),_0x1e866f=>{const _0x49dab5=_0x387eb3;if(!SceneManager[_0x49dab5(0x131)]())return;VisuMZ[_0x49dab5(0x11b)](_0x1e866f,_0x1e866f);const _0x247be3=_0x1e866f[_0x49dab5(0x2ab)];for(const _0x1df7ac of _0x247be3){$gameParty[_0x49dab5(0x242)](_0x1df7ac);}$gamePlayer['refresh']();}),PluginManager['registerCommand'](pluginData[_0x387eb3(0x101)],_0x387eb3(0x2a9),_0x53d313=>{const _0x23d517=_0x387eb3;if(!SceneManager[_0x23d517(0x131)]())return;VisuMZ['ConvertParams'](_0x53d313,_0x53d313);const _0x39592c=_0x53d313[_0x23d517(0x2ab)];for(const _0x7fe965 of _0x39592c){if($gameParty[_0x23d517(0x2c3)]()['length']<=0x1)break;$gameParty[_0x23d517(0x283)](_0x7fe965);}$gamePlayer[_0x23d517(0xa7)]();}),PluginManager['registerCommand'](pluginData[_0x387eb3(0x101)],_0x387eb3(0x24f),_0x4e0049=>{const _0x1aa1f4=_0x387eb3;if(!SceneManager[_0x1aa1f4(0x131)]())return;if($gameParty[_0x1aa1f4(0x2c3)]()[_0x1aa1f4(0x22f)]<=0x1)return;if(!$gameParty[_0x1aa1f4(0xcd)])return;if($gameParty['_battleMembers']['length']<=0x0)return;VisuMZ[_0x1aa1f4(0x11b)](_0x4e0049,_0x4e0049);const _0x5ccc3f=_0x4e0049[_0x1aa1f4(0xc1)],_0x1b85d2=$gameParty[_0x1aa1f4(0xcd)][_0x5ccc3f];$gameParty[_0x1aa1f4(0x283)](_0x1b85d2),$gamePlayer[_0x1aa1f4(0xa7)]();}),PluginManager['registerCommand'](pluginData[_0x387eb3(0x101)],'MoveRandomToActive',_0x4940a8=>{const _0x3395e3=_0x387eb3;if(!SceneManager[_0x3395e3(0x131)]())return;if($gameParty['battleMembers']()[_0x3395e3(0x22f)]>=$gameParty[_0x3395e3(0x202)]())return;if($gameParty[_0x3395e3(0x2d9)]()[_0x3395e3(0x22f)]<=0x0)return;const _0x4359f3=$gameParty[_0x3395e3(0x2d9)](),_0x16b442=_0x4359f3[Math['floor'](Math[_0x3395e3(0x2b3)]()*_0x4359f3[_0x3395e3(0x22f)])],_0x2bfe9d=_0x16b442[_0x3395e3(0x1fb)]();$gameParty[_0x3395e3(0x242)](_0x2bfe9d),$gamePlayer[_0x3395e3(0xa7)]();}),PluginManager[_0x387eb3(0x1e9)](pluginData[_0x387eb3(0x101)],_0x387eb3(0x1f5),_0x2f6aaa=>{const _0x30c269=_0x387eb3;VisuMZ[_0x30c269(0x11b)](_0x2f6aaa,_0x2f6aaa);const _0x4b77b6=_0x2f6aaa[_0x30c269(0x2ab)][_0x30c269(0xbd)](_0x15c624=>$gameActors[_0x30c269(0x217)](_0x15c624))[_0x30c269(0x1c0)](null),_0x8bf12e=_0x2f6aaa[_0x30c269(0x20a)];for(const _0x26e957 of _0x4b77b6){if(!_0x26e957)continue;_0x26e957[_0x30c269(0x1cb)](_0x8bf12e);}}),PluginManager['registerCommand'](pluginData[_0x387eb3(0x101)],_0x387eb3(0x19f),_0x53daf6=>{const _0x4cea6c=_0x387eb3;VisuMZ[_0x4cea6c(0x11b)](_0x53daf6,_0x53daf6);const _0x2b9645=_0x53daf6[_0x4cea6c(0x2ab)][_0x4cea6c(0xbd)](_0x359f57=>$gameActors[_0x4cea6c(0x217)](_0x359f57))['remove'](null),_0x5b42c6=_0x53daf6[_0x4cea6c(0x28c)];for(const _0x3b732c of _0x2b9645){if(_0x4cea6c(0x1ea)==='LSJKh'){const _0x1904e5=this[_0x4cea6c(0x217)](_0x442f5f);if(!_0x1904e5)return this['drawItemEmpty'](_0x17c3a9);this[_0x4cea6c(0x26d)]();const _0x447c93=this[_0x4cea6c(0x162)](_0x3a3681);this[_0x4cea6c(0x2a7)](_0x9172cc);const _0x18ce29=_0x447c93['y']+_0x447c93[_0x4cea6c(0x15e)]-this['lineHeight']();this[_0x4cea6c(0x272)](_0x447c93['x'],_0x18ce29,_0x447c93[_0x4cea6c(0x298)],0x2),this[_0x4cea6c(0x1ef)](_0x1904e5,_0x447c93['x']+0x2,_0x447c93['y']),this[_0x4cea6c(0x20d)](_0x1904e5,_0x447c93['x'],_0x18ce29,_0x447c93[_0x4cea6c(0x298)]);}else{if(!_0x3b732c)continue;_0x3b732c['setPartyRequirement'](_0x5b42c6);}}}),ImageManager[_0x387eb3(0x296)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0xf9)][_0x387eb3(0xe8)],ImageManager['requiredPartyMemberIcon']=VisuMZ['PartySystem']['Settings'][_0x387eb3(0xf9)][_0x387eb3(0xf7)],TextManager['activeParty']=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0x266)],TextManager[_0x387eb3(0x11c)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)]['ReserveParty'],TextManager[_0x387eb3(0x113)]=VisuMZ[_0x387eb3(0x191)]['Settings'][_0x387eb3(0x15f)][_0x387eb3(0x24b)],TextManager['emptyPartyMember']=VisuMZ[_0x387eb3(0x191)]['Settings'][_0x387eb3(0x15f)][_0x387eb3(0x9d)],TextManager['removePartyMember']=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)]['Vocab'][_0x387eb3(0x15d)],TextManager[_0x387eb3(0x200)]=VisuMZ['PartySystem'][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0x107)],TextManager[_0x387eb3(0x147)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0x275)],TextManager[_0x387eb3(0x2b2)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0xe6)],TextManager[_0x387eb3(0xe1)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0xfd)],TextManager[_0x387eb3(0x279)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0x21f)],ColorManager[_0x387eb3(0xe9)]=function(_0x3c5f0a){const _0xb9c616=_0x387eb3;return _0x3c5f0a=String(_0x3c5f0a),_0x3c5f0a['match'](/#(.*)/i)?_0xb9c616(0x188)[_0xb9c616(0x109)](String(RegExp['$1'])):_0xb9c616(0x1d6)===_0xb9c616(0xcf)?_0x1c4c0b['prototype'][_0xb9c616(0x25b)][_0xb9c616(0xc9)](this):this[_0xb9c616(0x1db)](Number(_0x3c5f0a));},SceneManager['isSceneParty']=function(){const _0x308543=_0x387eb3;return this[_0x308543(0x260)]&&this[_0x308543(0x260)]['constructor']===Scene_Party;},SceneManager[_0x387eb3(0x131)]=function(){const _0x31f4e2=_0x387eb3;return this['_scene']&&this['_scene'][_0x31f4e2(0x25e)]===Scene_Map;},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x1cf)]=BattleManager[_0x387eb3(0x13e)],BattleManager['setup']=function(_0x53e276,_0x172514,_0xc13830){const _0x19cca4=_0x387eb3;VisuMZ[_0x19cca4(0x191)]['BattleManager_setup']['call'](this,_0x53e276,_0x172514,_0xc13830),$gameParty['clearPartyBattleCommandCooldown']();},BattleManager['updateTargetsForPartySwitch']=function(_0x16b57e,_0x184f77){const _0x216532=_0x387eb3;if(_0x16b57e===_0x184f77)return;if(!_0x16b57e)return;if(!_0x184f77)return;if(this[_0x216532(0x1d2)]===_0x16b57e)this[_0x216532(0x1d2)]=_0x184f77;while(this[_0x216532(0x27c)][_0x216532(0xda)](_0x16b57e)){const _0x98ed9b=this[_0x216532(0x27c)]['indexOf'](_0x16b57e);this[_0x216532(0x27c)][_0x98ed9b]=_0x184f77;}},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x25c)]=Game_Battler[_0x387eb3(0x28d)][_0x387eb3(0x23b)],Game_Battler['prototype'][_0x387eb3(0x23b)]=function(_0xf07b68){const _0x48fc4d=_0x387eb3;VisuMZ[_0x48fc4d(0x191)][_0x48fc4d(0x25c)][_0x48fc4d(0xc9)](this,_0xf07b68);if(this[_0x48fc4d(0x2ad)]())this[_0x48fc4d(0x206)]();this[_0x48fc4d(0x190)]();},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x247)]=Game_Battler[_0x387eb3(0x28d)][_0x387eb3(0x124)],Game_Battler[_0x387eb3(0x28d)][_0x387eb3(0x124)]=function(){const _0x51a383=_0x387eb3;VisuMZ['PartySystem'][_0x51a383(0x247)][_0x51a383(0xc9)](this);if(this[_0x51a383(0x2ad)]()&&$gameParty[_0x51a383(0x14b)]())this[_0x51a383(0x291)]();},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x225)]=Game_Actor['prototype'][_0x387eb3(0x13e)],Game_Actor[_0x387eb3(0x28d)][_0x387eb3(0x13e)]=function(_0xc78860){const _0x39e2bd=_0x387eb3;VisuMZ['PartySystem'][_0x39e2bd(0x225)]['call'](this,_0xc78860),this[_0x39e2bd(0x112)](),this['clearPartySwitchCommandCooldown']();},Game_Actor['prototype'][_0x387eb3(0x112)]=function(){const _0x229167=_0x387eb3;this[_0x229167(0xb4)]=![],this[_0x229167(0x1b8)]=![];},Game_Actor[_0x387eb3(0x28d)][_0x387eb3(0x231)]=function(){const _0x3eda26=_0x387eb3;if(this[_0x3eda26(0xb4)]===undefined)this[_0x3eda26(0x112)]();return!this['_partyLocked'];},Game_Actor['prototype']['setPartyLock']=function(_0x288781){const _0x1919b9=_0x387eb3;if(this['_partyLocked']===undefined)this[_0x1919b9(0x112)]();this[_0x1919b9(0xb4)]=_0x288781;},Game_Actor[_0x387eb3(0x28d)][_0x387eb3(0x27f)]=function(){const _0x3d7007=_0x387eb3;if(this[_0x3d7007(0x1b8)]===undefined)this[_0x3d7007(0x112)]();return this['_partyRequired'];},Game_Actor[_0x387eb3(0x28d)][_0x387eb3(0x2a6)]=function(_0x4677a3){const _0x555961=_0x387eb3;if(this[_0x555961(0x1b8)]===undefined)this[_0x555961(0x112)]();this[_0x555961(0x1b8)]=_0x4677a3;},Game_Actor[_0x387eb3(0x28d)]['clearPartySwitchCommandCooldown']=function(){const _0x188e38=_0x387eb3;this[_0x188e38(0x27d)]=0x0;},Game_Actor[_0x387eb3(0x28d)][_0x387eb3(0x2cc)]=function(){const _0x578635=_0x387eb3;if(this[_0x578635(0x27d)]===undefined)this[_0x578635(0x206)]();if(!this[_0x578635(0x231)]())return![];if(this['isRequiredInParty']())return![];return this['_partySwitchBattleCommandCooldown']<=0x0;},Game_Actor[_0x387eb3(0x28d)][_0x387eb3(0xa9)]=function(){const _0x1f3442=_0x387eb3;if(this['_partySwitchBattleCommandCooldown']===undefined)this[_0x1f3442(0x206)]();return this[_0x1f3442(0x27d)];},Game_Actor[_0x387eb3(0x28d)]['setBattlePartySwitchCooldown']=function(_0x1fda26){const _0x23e0f2=_0x387eb3;if(this[_0x23e0f2(0x27d)]===undefined)this[_0x23e0f2(0x206)]();this['_partySwitchBattleCommandCooldown']=_0x1fda26||0x0;},Game_Actor[_0x387eb3(0x28d)][_0x387eb3(0x2b0)]=function(){const _0x593368=_0x387eb3;if(this[_0x593368(0x27d)]===undefined)this['clearPartySwitchCommandCooldown']();const _0x1ad143=VisuMZ[_0x593368(0x191)][_0x593368(0xe3)][_0x593368(0xf9)]['ActorCmdCooldown'];this[_0x593368(0x198)](_0x1ad143);},Game_Actor['prototype']['updateBattlePartySwitchCooldown']=function(){const _0x4d0f53=_0x387eb3;if(this[_0x4d0f53(0x27d)]===undefined)this[_0x4d0f53(0x206)]();this[_0x4d0f53(0x27d)]--;},Game_Actor[_0x387eb3(0x28d)][_0x387eb3(0x1ff)]=function(_0x480a5b){const _0x4814ac=_0x387eb3;Imported['VisuMZ_2_BattleSystemCTB']&&BattleManager['isCTB']()&&BattleManager[_0x4814ac(0x209)]();Imported['VisuMZ_2_BattleSystemSTB']&&BattleManager[_0x4814ac(0x252)]()&&(BattleManager[_0x4814ac(0x128)](),BattleManager[_0x4814ac(0x251)]=this,BattleManager[_0x4814ac(0x25a)]=this);if(Imported[_0x4814ac(0x1e7)]&&BattleManager[_0x4814ac(0x168)]()){if(_0x4814ac(0x286)===_0x4814ac(0x286)){BattleManager[_0x4814ac(0x251)]=undefined,BattleManager[_0x4814ac(0x25a)]=this;const _0x15b5bb=BattleManager[_0x4814ac(0x295)][_0x4814ac(0xf6)](_0x480a5b);BattleManager['_actionBattlers'][_0x15b5bb]=this,BattleManager[_0x4814ac(0xe7)]();}else return _0x229c0d[_0x4814ac(0x191)][_0x4814ac(0xe3)][_0x4814ac(0x201)][_0x4814ac(0x23d)]['call'](this);}Imported[_0x4814ac(0x187)]&&BattleManager['isFTB']()&&(BattleManager[_0x4814ac(0x251)]=this,BattleManager['_currentActor']=this);if(Imported[_0x4814ac(0x1b6)]&&BattleManager[_0x4814ac(0xc6)]()){BattleManager['_subject']=this,BattleManager['_currentActor']=this;for(let _0xec1fd4=0x0;_0xec1fd4<BattleManager[_0x4814ac(0x295)]['length'];_0xec1fd4++){if(_0x4814ac(0x154)!==_0x4814ac(0x154))return this[_0x4814ac(0x185)];else{const _0x278eab=BattleManager['_actionBattlers'][_0xec1fd4];_0x278eab===_0x480a5b&&(BattleManager[_0x4814ac(0x295)][_0xec1fd4]=this);}}for(let _0x501651=0x0;_0x501651<BattleManager['_otb_actionBattlersNext'][_0x4814ac(0x22f)];_0x501651++){if(_0x4814ac(0x18d)!=='SCsDm'){const _0x253dc3=BattleManager['_otb_actionBattlersNext'][_0x501651];_0x253dc3===_0x480a5b&&(BattleManager[_0x4814ac(0x2a5)][_0x501651]=this);}else this['_activePartyWindow'][_0x4814ac(0xa7)](),this[_0x4814ac(0x130)][_0x4814ac(0xa7)]();}}if(Imported[_0x4814ac(0x16d)]&&BattleManager['isUsingGridSystem']()){const _0x387429=_0x480a5b[_0x4814ac(0xc4)](),_0x5f35d3=_0x480a5b['gridFlank']();this[_0x4814ac(0xa3)](_0x387429,_0x5f35d3);}},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x248)]=Game_Unit[_0x387eb3(0x28d)][_0x387eb3(0x14b)],Game_Unit[_0x387eb3(0x28d)][_0x387eb3(0x14b)]=function(){const _0x5e2d44=_0x387eb3;if(SceneManager[_0x5e2d44(0x270)]())return![];return VisuMZ[_0x5e2d44(0x191)][_0x5e2d44(0x248)][_0x5e2d44(0xc9)](this);},Game_Party[_0x387eb3(0x2a8)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0xf9)][_0x387eb3(0x208)],VisuMZ[_0x387eb3(0x191)]['Game_Party_initialize']=Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x125)],Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x125)]=function(){const _0x4d434f=_0x387eb3;VisuMZ[_0x4d434f(0x191)][_0x4d434f(0x20f)][_0x4d434f(0xc9)](this),this[_0x4d434f(0x27b)](),this[_0x4d434f(0x287)](),this[_0x4d434f(0x2bf)]();},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x27b)]=function(){const _0x2f7d68=_0x387eb3;this[_0x2f7d68(0x22c)]=0x0;},Game_Party['prototype'][_0x387eb3(0x2cc)]=function(){const _0x2e7c6f=_0x387eb3;if(this[_0x2e7c6f(0x22c)]===undefined)this[_0x2e7c6f(0x27b)]();return this[_0x2e7c6f(0x22c)]<=0x0;},Game_Party['prototype'][_0x387eb3(0xa9)]=function(){const _0x9a4f47=_0x387eb3;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x9a4f47(0x27b)]();return this[_0x9a4f47(0x22c)];},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x198)]=function(_0x214cd4){const _0x5a154b=_0x387eb3;if(this[_0x5a154b(0x22c)]===undefined)this[_0x5a154b(0x27b)]();this[_0x5a154b(0x22c)]=_0x214cd4;},Game_Party['prototype']['applyBattlePartySwitchCooldown']=function(){const _0x4367ff=_0x387eb3;if(this[_0x4367ff(0x22c)]===undefined)this[_0x4367ff(0x27b)]();this[_0x4367ff(0x22c)]=VisuMZ['PartySystem'][_0x4367ff(0xe3)][_0x4367ff(0xf9)][_0x4367ff(0x213)]||0x0;},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x291)]=function(){const _0x5f3528=_0x387eb3;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x5f3528(0x27b)]();this[_0x5f3528(0x22c)]--;},Game_Party['prototype'][_0x387eb3(0x287)]=function(){const _0x53cc1a=_0x387eb3;this[_0x53cc1a(0xa8)]=0x0;},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x153)]=function(_0x2a2eb7){const _0x3c705a=_0x387eb3;this[_0x3c705a(0xa8)]=_0x2a2eb7,this[_0x3c705a(0x2bf)](!![]),$gamePlayer&&$gamePlayer[_0x3c705a(0x222)]()&&$gamePlayer[_0x3c705a(0x222)]()['changeMaxBattleMembers']();},Game_Followers['prototype']['changeMaxBattleMembers']=function(){const _0x14ba3c=_0x387eb3;if(!SceneManager[_0x14ba3c(0x131)]())return;this['setup']();const _0x1c35e0=$gameMap[_0x14ba3c(0x142)](),_0x51f3f1=$gamePlayer['x'],_0x2e416c=$gamePlayer['y'],_0x963905=$gamePlayer[_0x14ba3c(0xeb)]();$gameTemp['_bypassAutoSavePartySystem']=!![],$gamePlayer[_0x14ba3c(0x139)](_0x1c35e0,_0x51f3f1,_0x2e416c,_0x963905,0x2),setTimeout(this[_0x14ba3c(0x2cd)][_0x14ba3c(0x10e)](this),0x7d0);},Game_Followers[_0x387eb3(0x28d)][_0x387eb3(0x2cd)]=function(){const _0x3923b0=_0x387eb3;$gameTemp[_0x3923b0(0x90)]=![];},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x29f)]=Scene_Base[_0x387eb3(0x28d)][_0x387eb3(0x2ae)],Scene_Base[_0x387eb3(0x28d)][_0x387eb3(0x2ae)]=function(){const _0x581e3d=_0x387eb3;if($gameTemp[_0x581e3d(0x90)])return![];return VisuMZ[_0x581e3d(0x191)][_0x581e3d(0x29f)][_0x581e3d(0xc9)](this);},Game_Party['prototype'][_0x387eb3(0x202)]=function(){const _0x4a6c79=_0x387eb3;if(this[_0x4a6c79(0xa8)]===undefined)this[_0x4a6c79(0x2bf)]();return this[_0x4a6c79(0xa8)]||Game_Party[_0x4a6c79(0x2a8)];},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x14e)]=function(){const _0x59fe92=_0x387eb3;if(this[_0x59fe92(0xa8)]===undefined)this[_0x59fe92(0x2bf)]();if(!this['_battleMembers'])this[_0x59fe92(0x2bf)]();while(this['_battleMembers'][_0x59fe92(0x22f)]<this[_0x59fe92(0xa8)]){this[_0x59fe92(0xcd)][_0x59fe92(0x1c8)](0x0);}},Game_Party[_0x387eb3(0x28d)]['initBattleMembers']=function(_0x4da978){const _0x4827a4=_0x387eb3;if(!_0x4da978){if('dgZtm'===_0x4827a4(0x1ae)){if(this[_0x4827a4(0xdc)]&&this[_0x4827a4(0xdc)][_0x4827a4(0x185)])return!![];if(this[_0x4827a4(0x29a)])return!![];if(this[_0x4827a4(0xaf)])return!![];if(this['_callSceneParty'])return!![];return _0x980888['PartySystem'][_0x4827a4(0x1f6)][_0x4827a4(0xc9)](this);}else this[_0x4827a4(0xa8)]=Game_Party[_0x4827a4(0x2a8)];}this['_battleMembers']=this[_0x4827a4(0x241)][_0x4827a4(0x1a6)](0x0,this[_0x4827a4(0xa8)]);while(this[_0x4827a4(0xcd)][_0x4827a4(0x22f)]<this[_0x4827a4(0xa8)]){this[_0x4827a4(0xcd)][_0x4827a4(0x1c8)](0x0);}if($gamePlayer)$gamePlayer[_0x4827a4(0xa7)]();},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x2c3)]=function(){const _0x2e9c5a=_0x387eb3;return this[_0x2e9c5a(0x278)]()[_0x2e9c5a(0xa0)](_0x145a3e=>!!_0x145a3e);},Game_Party[_0x387eb3(0x28d)]['rawBattleMembers']=function(){const _0x110307=_0x387eb3;this[_0x110307(0x14e)]();const _0x250b00=this[_0x110307(0xcd)][_0x110307(0xbd)](_0x3bd466=>$gameActors['actor'](_0x3bd466));return SceneManager[_0x110307(0x270)]()?_0x250b00:_0x250b00[_0x110307(0xa0)](_0x202b2f=>_0x202b2f&&_0x202b2f['isAppeared']());},Game_Party['prototype'][_0x387eb3(0x2d9)]=function(){const _0x135fe0=_0x387eb3,_0x32077c=this[_0x135fe0(0x2c3)]();return this[_0x135fe0(0x20c)]()[_0x135fe0(0xa0)](_0x3c82c6=>!_0x32077c[_0x135fe0(0xda)](_0x3c82c6));},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x1e3)]=Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x177)],Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x177)]=function(){const _0x1a7b62=_0x387eb3;VisuMZ[_0x1a7b62(0x191)][_0x1a7b62(0x1e3)][_0x1a7b62(0xc9)](this),this[_0x1a7b62(0x2bf)]();},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x224)]=Game_Party[_0x387eb3(0x28d)][_0x387eb3(0xde)],Game_Party[_0x387eb3(0x28d)][_0x387eb3(0xde)]=function(){const _0x1e65c9=_0x387eb3;VisuMZ['PartySystem'][_0x1e65c9(0x224)][_0x1e65c9(0xc9)](this),this[_0x1e65c9(0x18b)]();},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x2a4)]=function(){const _0xa9afa3=_0x387eb3;this[_0xa9afa3(0xa8)]=Game_Party['defaultMaxBattleMembers'],this['_battleMembers']=[],this['_actors']=[];for(const _0x35889b of $dataSystem['testBattlers']){const _0x481e74=$gameActors[_0xa9afa3(0x217)](_0x35889b[_0xa9afa3(0x1fb)]);if(!_0x481e74)continue;_0x481e74[_0xa9afa3(0x216)](_0x35889b[_0xa9afa3(0x13d)],![]),_0x481e74[_0xa9afa3(0x239)](_0x35889b[_0xa9afa3(0x180)]),_0x481e74[_0xa9afa3(0x17f)](),this['_battleMembers'][_0xa9afa3(0x1c8)](_0x35889b[_0xa9afa3(0x1fb)]),this[_0xa9afa3(0x241)][_0xa9afa3(0x1c8)](_0x35889b[_0xa9afa3(0x1fb)]);}this[_0xa9afa3(0xcd)][_0xa9afa3(0x1c0)](0x0);while(this[_0xa9afa3(0xcd)][_0xa9afa3(0x22f)]<this[_0xa9afa3(0xa8)]){if(_0xa9afa3(0x2c5)===_0xa9afa3(0x2c5))this['_battleMembers']['push'](0x0);else return![];}while(this[_0xa9afa3(0xcd)][_0xa9afa3(0x22f)]>this['maxBattleMembers']()){this['_battleMembers'][_0xa9afa3(0x120)]();}if($gamePlayer)$gamePlayer['refresh']();},Game_Party[_0x387eb3(0x28d)]['addNonBattleTestMembers']=function(){const _0x33b09b=_0x387eb3,_0x27867a=this[_0x33b09b(0x2c3)]();for(let _0x7d5458=0x1;_0x7d5458<$dataActors[_0x33b09b(0x22f)];_0x7d5458++){const _0xf85ed5=$gameActors[_0x33b09b(0x217)](_0x7d5458);if(!_0xf85ed5)continue;if(_0xf85ed5[_0x33b09b(0x101)]()['length']<=0x0)continue;if(_0xf85ed5['name']()[_0x33b09b(0x14c)](/-----/i))continue;if(_0x27867a['includes'](_0xf85ed5))continue;this[_0x33b09b(0x241)][_0x33b09b(0x1c8)](_0xf85ed5[_0x33b09b(0x1fb)]());}},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x207)]=Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x244)],Game_Party[_0x387eb3(0x28d)]['addActor']=function(_0x1eecd3){const _0x14f06c=_0x387eb3;VisuMZ[_0x14f06c(0x191)][_0x14f06c(0x207)][_0x14f06c(0xc9)](this,_0x1eecd3),this[_0x14f06c(0x242)](_0x1eecd3),SceneManager['isSceneBattle']()&&(Imported[_0x14f06c(0x1b6)]&&BattleManager[_0x14f06c(0xc6)]()&&(BattleManager[_0x14f06c(0x21e)](),BattleManager[_0x14f06c(0x1c5)]($gameActors[_0x14f06c(0x217)](_0x1eecd3))));},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x242)]=function(_0x309040){const _0x2bd259=_0x387eb3;this[_0x2bd259(0x14e)]();if(this[_0x2bd259(0xcd)][_0x2bd259(0xda)](_0x309040))return;if(!this['_actors']['includes'](_0x309040))return;if(!this[_0x2bd259(0xcd)][_0x2bd259(0xda)](0x0))return;const _0x112066=$gameActors[_0x2bd259(0x217)](_0x309040);if(!_0x112066)return;const _0x4c1437=this[_0x2bd259(0xcd)][_0x2bd259(0xf6)](0x0);if(_0x4c1437<0x0)return;this[_0x2bd259(0xcd)][_0x4c1437]=_0x309040,SceneManager[_0x2bd259(0xfa)]()&&(_0x112066[_0x2bd259(0x23b)](),_0x112066[_0x2bd259(0x195)]()),this[_0x2bd259(0x17e)]();},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x2aa)]=function(_0x5c78ac,_0x22bff3){const _0x399b27=_0x387eb3;this[_0x399b27(0x14e)]();if(this['_battleMembers'][_0x399b27(0xda)](_0x5c78ac))return;if(!this['_battleMembers'][_0x399b27(0xda)](0x0))return;const _0x4adb5f=$gameActors[_0x399b27(0x217)](_0x5c78ac);if(!_0x4adb5f)return;this[_0x399b27(0xcd)][_0x22bff3]=_0x5c78ac,_0x4adb5f['makeActions'](),this[_0x399b27(0x17e)]();},VisuMZ[_0x387eb3(0x191)]['Game_Party_removeActor']=Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x22d)],Game_Party[_0x387eb3(0x28d)]['removeActor']=function(_0x32f065){const _0x1fb531=_0x387eb3;this[_0x1fb531(0x283)](_0x32f065),VisuMZ[_0x1fb531(0x191)][_0x1fb531(0x2b7)][_0x1fb531(0xc9)](this,_0x32f065);},Game_Party['prototype'][_0x387eb3(0x283)]=function(_0x382797){const _0x3ed720=_0x387eb3;this[_0x3ed720(0x14e)]();if(!this['_battleMembers'][_0x3ed720(0xda)](_0x382797))return;if(_0x382797<=0x0)return;const _0x956c7e=this[_0x3ed720(0xcd)]['indexOf'](_0x382797);this[_0x3ed720(0xcd)][_0x956c7e]=0x0,this[_0x3ed720(0x241)][_0x3ed720(0x1c0)](_0x382797),this['_actors'][_0x3ed720(0x1c8)](_0x382797),this[_0x3ed720(0x17e)]();},Game_Party['prototype'][_0x387eb3(0x17e)]=function(){const _0x125133=_0x387eb3;this['rearrangePartyActors'](),$gamePlayer[_0x125133(0xa7)](),$gameMap[_0x125133(0x12e)]();},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x259)]=function(){const _0x368f77=_0x387eb3;this[_0x368f77(0x14e)]();const _0x3f0dea=this[_0x368f77(0x2c3)]()[_0x368f77(0x243)](this[_0x368f77(0x2d9)]());this[_0x368f77(0x241)]=_0x3f0dea['map'](_0x5930c7=>_0x5930c7?_0x5930c7[_0x368f77(0x1fb)]():0x0)[_0x368f77(0x1c0)](0x0);},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x2b1)]=function(){const _0x43b6f1=_0x387eb3;this['_actors']['sort']((_0x36550f,_0x46019a)=>_0x36550f-_0x46019a),this[_0x43b6f1(0x259)](),this[_0x43b6f1(0x17e)]();},Game_Party['prototype'][_0x387eb3(0x141)]=function(){const _0x885aff=_0x387eb3;for(const _0x1e94df of this['reserveMembers']()){if(!_0x1e94df)continue;if(_0x1e94df[_0x885aff(0x27f)]())return!![];}return![];},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xc3)]=Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x1a8)],Game_Party[_0x387eb3(0x28d)]['swapOrder']=function(_0x4dfcf4,_0x39b010){const _0x24726d=_0x387eb3;VisuMZ[_0x24726d(0x191)][_0x24726d(0xc3)][_0x24726d(0xc9)](this,_0x4dfcf4,_0x39b010),this[_0x24726d(0x1be)](_0x4dfcf4,_0x39b010);},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x1be)]=function(_0x1d1059,_0x35df09){const _0x13b443=_0x387eb3;this[_0x13b443(0xcd)]=[];for(let _0x4411d8=0x0;_0x4411d8<this['_actors'][_0x13b443(0x22f)];_0x4411d8++){if(_0x13b443(0x1c1)===_0x13b443(0x227))return this[_0x13b443(0x2a2)](this['currentActor']());else{if(this['_battleMembers'][_0x13b443(0x22f)]>=this['maxBattleMembers']())break;this[_0x13b443(0xcd)][_0x4411d8]=this[_0x13b443(0x241)][_0x4411d8];}}$gamePlayer['refresh']();},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x2da)]=Game_Troop[_0x387eb3(0x28d)][_0x387eb3(0x19e)],Game_Troop['prototype'][_0x387eb3(0x19e)]=function(){const _0x1cba85=_0x387eb3;VisuMZ[_0x1cba85(0x191)][_0x1cba85(0x2da)]['call'](this),$gameParty['updateBattlePartySwitchCooldown']();},Scene_Menu[_0x387eb3(0x28d)]['commandFormation']=function(){SceneManager['push'](Scene_Party);};function Scene_Party(){const _0x585946=_0x387eb3;this[_0x585946(0x125)](...arguments);}function _0x3a5f(){const _0x3dca29=['getPartySystemBackColor','_lastIndex','umaoh','updateHelp','LockPartyMembers','Scene_Battle_isAnyInputWindowActive','iRgej','startSwitchOutAnimation','loadPartyImages','isNextScene','actorId','JsHSh','Scene_Battle_updateBattleProcess','zUtaN','onBattlePartySwitch','assistSwapPositions','Window','maxBattleMembers','addFormationCommand','terminate','createAllWindows','clearPartySwitchCommandCooldown','Game_Party_addActor','MaxBattleMembers','updateTurnOrderCTB','Lock','58532KGQqEE','allMembers','drawActorName','isQueueFormationMenu','Game_Party_initialize','pUUrr','currentActor','gaugeBackColor','PartyCmdCooldown','drawItem','itemPadding','changeLevel','actor','isActiveTpb','gtREc','updateBattleProcess','BattleHelpFormation','create','getBackgroundOpacity','removeActionBattlersOTB','AssistSwapOut','clear','activate','followers','_partySwitchTargetActor','Game_Party_setupBattleTest','Game_Actor_setup','isETB','DbHZv','updateTargetsForPartySwitch','_actorGraphic','_partyCommandWindow','addRemoveCommand','_partySystemBattleCommandCooldown','removeActor','ActivePartyWindowRect','length','actorParams','isFormationChangeOk','_tpbChargeTime','drawItemStatus','itemRectWithPadding','centerSprite','addChild','_actor','param','initEquips','8028gaceim','onBattleStart','callUpdateHelp','ActivePartyLabelRect','isShiftRemoveShortcutEnabled','VisuMZ_0_CoreEngine','changeTextColor','_actors','addActorToBattleMembers','concat','addActor','drawItemImageFace','processShiftSortShortcut','Game_Battler_regenerateAll','Game_Unit_inBattle','drawRemoveCommand','ActiveTpbFormationMessage','Status','hDlHj','round','callPartyMemberSwitch','MovePartyIndexToReserve','ARRAYJSON','_subject','isSTB','_backSprite1','isFormationCommandAdded','hasBattleSystemIncompatibilities','DrawBackRect','updatePadding','createActorCommandWindow','rearrangePartyActors','_currentActor','buttonAssistText4','Game_Battler_onBattleStart','loadTitle1','constructor','Scene_Battle_createActorCommandWindow','_scene','reservePartyLabelRect','SnapshotOpacity','onActiveOk','1888304zbPQOd','smoothSelect','ActiveParty','createActivePartyLabel','_list','innerWidth','_backSprite2','battlePartySwitchCmdHelp','isPTB','resetFontSettings','faceWidth','activePartyLabelRect','isSceneParty','QfiDo','drawDarkRect','splice','318283EXWvnZ','AssistRemove','Idufb','setStatusWindow','rawBattleMembers','assistSwapOutPartyMember','PcJLs','clearPartyBattleCommandCooldown','_targets','_partySwitchBattleCommandCooldown','createPageButtons','isRequiredInParty','select','selectActor','windowPadding','removeActorFromBattleMembers','adjustSprite','exit','BCgGb','initMaxBattleMembers','changePaintOpacity','StatusWindowRect','maxItems','createPartySwitchWindow','Require','prototype','iconHeight','isAlive','trim','updateBattlePartySwitchCooldown','battlePartyChangeIcon','\x5cI[%1]%2','onPartySwitchCancel','_actionBattlers','lockPartyMemberIcon','min','width','isFTB','_partySystemSwitchOut','Sprite_Actor_update','STR','parse','isTpb','Scene_Base_isAutosaveEnabled','RwktB','paramValueByName','isEnabled','cPtwS','setupBattleTestMembers','_otb_actionBattlersNext','setPartyRequirement','drawItemImage','defaultMaxBattleMembers','MoveActorsToReserve','addActorToBattleMembersAtIndex','Actors','isPreviousSceneBattleTransitionable','isActor','isAutosaveEnabled','setHandler','applyBattlePartySwitchCooldown','sortActors','assistSortPartyMembers','random','hXBOn','reselect','tpbImmediateAction','Game_Party_removeActor','ARRAYFUNC','drawItemImageSprite','center','itemLineRect','_inputting','GZyPU','cursorDown','initBattleMembers','_reservePartyLabel','isUsingGridSystem','loadTitle2','battleMembers','actor%1-stateIcon','ciIWy','Param','WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System','Window_PartyCommand_updateHelp','contents','isPreviousScene','ffkHP','canSwitchPartyInBattle','clearBypassAutoSave','ubRce','createActivePartyWindow','BZjMQ','_rowThickness','8chieeK','ALGwy','battleLayoutStyle','setText','commandStyle','innerHeight','clearTpbChargeTime','reserveMembers','Game_Troop_increaseTurn','_bypassAutoSavePartySystem','ybYom','drawIcon','drawItemEmpty','emptyPartyMember','iconWidth','getInputButtonString','ReservePartyWindowRect','right','drawActorFace','reservePartyWindowRect','SceneManager_isNextSceneBattleTransitionable','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','Empty','dimColor1','ARRAYNUM','filter','updatePartySwitch','drawActorSimpleStatus','gridMoveTo','ReservePartyLabelBgType','drawActorPartyIconsVert','battlePartySwitchCmd','refresh','_battleMaxSize','battlePartySwitchCooldown','isPlaytest','partySwitchWindowRectStandard','ChangeMaxBattleMembers','ReserveItemThickness','status','_callPartyMemberSwitch','ensureCursorVisible','BattlePartyCmd','uiInputPosition','RCMkY','_partyLocked','processShiftRemoveShortcut','return\x200','Scene_Battle_isTimeActive','3SlohYr','ActivePartyGraphic','lineHeight','switchStateIconActor','statusLabelRect','map','statusWindowRect','ZNSAv','_tpbState','Index','getParamValue','Game_Party_swapOrder','gridRank','_spriteset','isOTB','uWRqi','drawParamValue','call','drawParamName','_activePartyWindow','drawItemDarkRect','_battleMembers','PartyCmdWinAddParty','KzIDa','OTXog','addText','MoveActorsToActive','32329HHGZqn','activePartyWindowRect','9SCqeSl','createCustomBackgroundImages','ActivePartyWindowBgType','BattlePartyIcon','wNkXQ','includes','update','_partyMemberSwitchWindow','removePartyCommand','setupBattleTest','currentSymbol','ReserveBattlerOffsetY','assistSwapInPartyMember','skillItemWindowRectBorderStyle','Settings','requiredPartyMemberIcon','VisuMZ_1_MainMenuCore','AssistSort','sortActionOrdersBTB','LockIcon','getColor','formation','direction','iCaXO','WCSKb','processDrawItem','_debug','dimColor2','_tpbSceneChangeCacheActor','ARRAYSTR','commandFormation','shift','isTriggered','indexOf','RequireIcon','ActiveSpriteOffsetY','General','isSceneBattle','max','_clickHandler','AssistSwapIn','_battleSystemIncompatibilityError','buttonAssistText1','helpAreaHeight','name','_pagedownButton','onPartySwitchOk','fillRect','svbattler','close','AssistSwapPosition','cancel','format','processOk','playCursorSound','battlePartyChangeCmdHelp','drawSvActor','bind','processCursorMove','BgFilename1','teamBasedFirstAvailableMember','initPartySystem','statusParty','kqtJm','log','cursorPagedown','face','SceneManager_isPreviousSceneBattleTransitionable','QueuePartyScene','JSON','ConvertParams','reserveParty','drawParamText','setBattler','_pageupButton','pop','deselect','characterName','createStatusLabel','regenerateAll','initialize','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','hpColor','updateTurnOrderSTB','drawItemImageSvActor','cursorPageup','ceil','battler','ReservePartyGraphic','requestRefresh','findSymbol','_reservePartyWindow','isSceneMap','STRUCT','toLowerCase','565vAePOd','_activePartyLabel','isPartyCommandAdded','checkShiftSortShortcut','drawText','reserveTransfer','popScene','BattleSwitchWindowBgType','yYeHH','level','setup','isShowPartySwitchOutAnimation','addWindow','anyRequiredPartyMembersInReserve','mapId','StatusWindowDraw','battlePartyChangeCmd','partySwitchWindowRect','isImmediateTpb','assistRemovePartyMember','2685746yiXHah','onReserveCancel','QzFgZ','inBattle','match','refreshAllWindows','checkInitBattleMembers','openness','deactivate','index','RdPaG','changeMaxBattleMembers','iqYzi','drawActorPartyIconsHorz','StatusWindowBgType','hEGoL','uiMenuStyle','MzDKl','ReserveBattlerOffsetX','callFormation','drawActorCharacter','Remove','height','Vocab','isOkEnabled','nlVvq','itemRect','setActor','ReservePartyWindowBgType','VisuMZ_2_BattleSystemSTB','isAnyInputWindowActive','isPartyCommandEnabled','isBTB','Scene_Battle_createPartyCommandWindowBattleCore','isFormationCommandEnabled','postPartySwitchMenuTurnBased','gradientFillRect','VisuMZ_2_BattleGridSystem','itemHeight','createBackground','tsmXB','DNGWs','preparePartySwitchMember','refreshOG','open','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','partySwitchWindowRectBorder','setupStartingMembers','34962yvkwEa','_statusWindow','drawActorClass','loadSvActor','GfZMz','processPartySwitchMember','partyChangeRefresh','recoverAll','equips','_statusPartyWindow','onReserveOk','startOpacity','addLoadListener','active','CoreEngine','VisuMZ_2_BattleSystemFTB','#%1','BattleHelpSwitch','startSwitchInAnimation','addNonBattleTestMembers','ActiveSpriteOffsetX','lPAeJ','DuSUo','isCurrentItemEnabled','clearDamagePopup','PartySystem','loadFace','cursorVisible','ActivePartyLabelBgType','makeActions','isShiftShortcutEnabled','jXXJQ','setBattlePartySwitchCooldown','sFvyR','createInnerSprite','BackRectColor','gCULb','createReservePartyWindow','increaseTurn','RequirePartyMembers','battlerName','quickSwap','placeBasicGauges','addCommand','_actorCommandWindow','_helpWindow','slice','createStatusWindow','swapOrder','6094990kCztWR','loadCharacter','ReserveSpriteOffsetX','BattleSwitchWindowRect','padding','KVzRN','activeParty','border','Value','_callSceneParty','createPartyCommandWindowBattleCore','commandPartyMemberSwitch','isCancelEnabled','VisuMZ_2_BattleSystemOTB','IYwbk','_partyRequired','pendingIndex','playEquip','faceHeight','MIVMK','cursorUp','swapOrderPartySystemPlugin','DisplayedParams','remove','HJisF','_logWindow','faceName','ActorCmdWinAddParty','otbReturnBattlerToTurnOrders','setBackgroundType','_partySwitchDuration','push','checkShiftRemoveShortcut','members','setPartyLock','paintOpacity','_statusPartyLabel','nameStartPosition','BattleManager_setup','ARRAYSTRUCT','VisuMZ_2_BattleSystemPTB','_target','text','Window_ActorCommand_updateHelp','playOkSound','rnapS','IsHyV','BViVf','addCustomCommands','ActiveBattlerOffsetX','textColor','setBackgroundOpacity','createReservePartyLabel','sprite','SBCXK','description','hfHKo','postPartySwitchMenuTpb','Game_Party_setupStartingMembers','isRightInputMode','systemColor','BgFilename2','VisuMZ_2_BattleSystemBTB','BgSettings','registerCommand','RuKcP','Scene_Battle_createAllWindows','buttonAssistText3','AddRemoveCmd','isTimeActive','drawActorPartyIcons','bitmap'];_0x3a5f=function(){return _0x3dca29;};return _0x3a5f();}Scene_Party[_0x387eb3(0x28d)]=Object[_0x387eb3(0x21c)](Scene_MenuBase[_0x387eb3(0x28d)]),Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x25e)]=Scene_Party,Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x125)]=function(){const _0x2504dc=_0x387eb3;this[_0x2504dc(0x1f9)](),Scene_MenuBase['prototype'][_0x2504dc(0x125)][_0x2504dc(0xc9)](this);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x1e4)]=function(){const _0x39e3dc=_0x387eb3;if(ConfigManager[_0x39e3dc(0x158)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x39e3dc(0xb2)];else{if(ConfigManager[_0x39e3dc(0x158)]===![])return![];else{if(_0x39e3dc(0x1fc)!==_0x39e3dc(0x1d7))return Scene_MenuBase['prototype'][_0x39e3dc(0x1e4)][_0x39e3dc(0xc9)](this);else{this[_0x39e3dc(0x26d)]();const _0x172e12=this[_0x39e3dc(0x162)](_0x3aa658);this[_0x39e3dc(0xcc)](_0x172e12['x'],_0x172e12['y'],_0x172e12[_0x39e3dc(0x298)],_0x172e12[_0x39e3dc(0x15e)]);const _0x40d801=_0x172e12['y']+_0x1a548d[_0x39e3dc(0x24d)]((_0x172e12['height']-this[_0x39e3dc(0xba)]())/0x2);this['changeTextColor'](_0x16da78['systemColor']()),this[_0x39e3dc(0x138)](_0x245dcf[_0x39e3dc(0x94)],_0x172e12['x'],_0x40d801,_0x172e12[_0x39e3dc(0x298)],_0x39e3dc(0x2ba));}}}},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x100)]=function(){return 0x0;},Scene_Party[_0x387eb3(0x28d)]['needsPageButtons']=function(){return!![];},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x27e)]=function(){const _0x3c9c36=_0x387eb3;Scene_MenuBase[_0x3c9c36(0x28d)][_0x3c9c36(0x27e)][_0x3c9c36(0xc9)](this),this[_0x3c9c36(0x11f)]['_clickHandler']=undefined,this[_0x3c9c36(0x102)][_0x3c9c36(0xfc)]=undefined;},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x1f9)]=function(){const _0x53b4b9=_0x387eb3;for(const _0x36b9bf of $gameParty[_0x53b4b9(0x1ca)]()){if(_0x53b4b9(0x114)===_0x53b4b9(0xbf)){const _0x410e2f=this['reservePartyLabelRect']();this['_reservePartyLabel']=new _0x540244(_0x410e2f,_0x46fa8f[_0x53b4b9(0x11c)]),this['_reservePartyLabel']['setBackgroundType'](_0x1d00ff[_0x53b4b9(0x191)][_0x53b4b9(0xe3)][_0x53b4b9(0x201)][_0x53b4b9(0xa4)]),this[_0x53b4b9(0x140)](this[_0x53b4b9(0x2c0)]);}else ImageManager[_0x53b4b9(0x192)](_0x36b9bf[_0x53b4b9(0x1c3)]()),ImageManager[_0x53b4b9(0x1aa)](_0x36b9bf[_0x53b4b9(0x122)]()),ImageManager[_0x53b4b9(0x17b)](_0x36b9bf[_0x53b4b9(0x1a0)]());}},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x21c)]=function(){const _0x218c2f=_0x387eb3;Scene_MenuBase[_0x218c2f(0x28d)][_0x218c2f(0x21c)]['call'](this),this['createActivePartyLabel'](),this[_0x218c2f(0x2cf)](),this[_0x218c2f(0x1dd)](),this[_0x218c2f(0x19d)](),this['createStatusLabel'](),this[_0x218c2f(0x1a7)]();},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x267)]=function(){const _0x1b0c28=_0x387eb3,_0x338b63=this[_0x1b0c28(0x26f)]();this[_0x1b0c28(0x135)]=new Window_PartyLabel(_0x338b63,TextManager[_0x1b0c28(0x1af)]),this[_0x1b0c28(0x135)][_0x1b0c28(0x1c6)](VisuMZ[_0x1b0c28(0x191)][_0x1b0c28(0xe3)]['Window'][_0x1b0c28(0x194)]),this['addWindow'](this[_0x1b0c28(0x135)]);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x26f)]=function(){const _0x44e90c=_0x387eb3;return VisuMZ[_0x44e90c(0x191)][_0x44e90c(0xe3)][_0x44e90c(0x201)][_0x44e90c(0x23d)][_0x44e90c(0xc9)](this);},Scene_Party[_0x387eb3(0x28d)]['createActivePartyWindow']=function(){const _0x364465=_0x387eb3,_0x1b5aa0=this[_0x364465(0xd4)]();this[_0x364465(0xcb)]=new Window_PartyActive(_0x1b5aa0),this['_activePartyWindow'][_0x364465(0x1c6)](VisuMZ['PartySystem'][_0x364465(0xe3)]['Window'][_0x364465(0xd7)]),this[_0x364465(0xcb)]['setHandler']('ok',this['onActiveOk'][_0x364465(0x10e)](this)),this['_activePartyWindow'][_0x364465(0x2af)](_0x364465(0x108),this[_0x364465(0x13a)][_0x364465(0x10e)](this)),this[_0x364465(0x140)](this[_0x364465(0xcb)]);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0xd4)]=function(){const _0x44754c=_0x387eb3;return VisuMZ[_0x44754c(0x191)][_0x44754c(0xe3)]['Window'][_0x44754c(0x22e)][_0x44754c(0xc9)](this);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x263)]=function(){const _0x1b6ff9=_0x387eb3;this[_0x1b6ff9(0x130)]['activate'](),this['_reservePartyWindow'][_0x1b6ff9(0x2b5)]();},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x1dd)]=function(){const _0x50af43=_0x387eb3,_0x9fddf1=this['reservePartyLabelRect']();this[_0x50af43(0x2c0)]=new Window_PartyLabel(_0x9fddf1,TextManager[_0x50af43(0x11c)]),this['_reservePartyLabel']['setBackgroundType'](VisuMZ['PartySystem'][_0x50af43(0xe3)][_0x50af43(0x201)][_0x50af43(0xa4)]),this[_0x50af43(0x140)](this['_reservePartyLabel']);},Scene_Party['prototype'][_0x387eb3(0x261)]=function(){const _0x2c5381=_0x387eb3;return VisuMZ[_0x2c5381(0x191)]['Settings'][_0x2c5381(0x201)]['ReservePartyLabelRect'][_0x2c5381(0xc9)](this);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x19d)]=function(){const _0x17dc5b=_0x387eb3,_0x3952f6=this[_0x17dc5b(0x9a)]();this[_0x17dc5b(0x130)]=new Window_PartyReserve(_0x3952f6),this[_0x17dc5b(0x130)][_0x17dc5b(0x1c6)](VisuMZ[_0x17dc5b(0x191)][_0x17dc5b(0xe3)][_0x17dc5b(0x201)][_0x17dc5b(0x164)]),this[_0x17dc5b(0x130)]['setHandler']('ok',this['onReserveOk']['bind'](this)),this[_0x17dc5b(0x130)][_0x17dc5b(0x2af)](_0x17dc5b(0x108),this[_0x17dc5b(0x149)][_0x17dc5b(0x10e)](this)),this[_0x17dc5b(0x140)](this[_0x17dc5b(0x130)]);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x9a)]=function(){const _0x4ecc14=_0x387eb3;return VisuMZ[_0x4ecc14(0x191)]['Settings'][_0x4ecc14(0x201)][_0x4ecc14(0x97)][_0x4ecc14(0xc9)](this);},Scene_Party['prototype'][_0x387eb3(0x182)]=function(){const _0x4e2c74=_0x387eb3,_0x108b3d=this[_0x4e2c74(0x130)][_0x4e2c74(0x1b9)](),_0x3a8962=this['_activePartyWindow'][_0x4e2c74(0x211)]();if(_0x108b3d<0x0){if(_0x3a8962)$gameParty['removeActorFromBattleMembers'](_0x3a8962[_0x4e2c74(0x1fb)]());}else{const _0x272234=this[_0x4e2c74(0x130)][_0x4e2c74(0x211)]()[_0x4e2c74(0x1fb)](),_0x4fccc9=this[_0x4e2c74(0xcb)][_0x4e2c74(0x151)]();if(_0x3a8962)$gameParty[_0x4e2c74(0x283)](_0x3a8962[_0x4e2c74(0x1fb)]());$gameParty['addActorToBattleMembersAtIndex'](_0x272234,_0x4fccc9);}this['refreshAllWindows'](),this[_0x4e2c74(0x149)]();},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x14d)]=function(){const _0x3cb060=_0x387eb3;this[_0x3cb060(0xcb)][_0x3cb060(0xa7)](),this[_0x3cb060(0x130)][_0x3cb060(0xa7)]();},Scene_Party['prototype'][_0x387eb3(0x149)]=function(){const _0x1d499e=_0x387eb3;this[_0x1d499e(0x130)][_0x1d499e(0x150)](),this[_0x1d499e(0x130)][_0x1d499e(0x121)](),this[_0x1d499e(0xcb)]['activate']();},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x123)]=function(){const _0x3d34b5=_0x387eb3,_0x1b49b6=this[_0x3d34b5(0xbc)]();this['_statusPartyLabel']=new Window_PartyLabel(_0x1b49b6,TextManager[_0x3d34b5(0x113)]),this[_0x3d34b5(0x1cd)][_0x3d34b5(0x1c6)](VisuMZ[_0x3d34b5(0x191)]['Settings']['Window']['StatusLabelBgType']),this['addWindow'](this[_0x3d34b5(0x1cd)]);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0xbc)]=function(){const _0x1af57f=_0x387eb3;return VisuMZ['PartySystem'][_0x1af57f(0xe3)]['Window']['StatusLabelRect'][_0x1af57f(0xc9)](this);},Scene_Party['prototype'][_0x387eb3(0x1a7)]=function(){const _0x457a85=_0x387eb3,_0x36e9f0=this[_0x457a85(0xbe)]();this[_0x457a85(0x181)]=new Window_PartyStatus(_0x36e9f0),this['_statusPartyWindow'][_0x457a85(0x1c6)](VisuMZ[_0x457a85(0x191)][_0x457a85(0xe3)]['Window'][_0x457a85(0x156)]),this[_0x457a85(0x140)](this[_0x457a85(0x181)]),this[_0x457a85(0x130)]['setStatusWindow'](this['_statusPartyWindow']),this[_0x457a85(0xcb)][_0x457a85(0x277)](this['_statusPartyWindow']);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0xbe)]=function(){const _0x3e4c2e=_0x387eb3;return VisuMZ[_0x3e4c2e(0x191)]['Settings'][_0x3e4c2e(0x201)][_0x3e4c2e(0x289)][_0x3e4c2e(0xc9)](this);},Scene_Party[_0x387eb3(0x28d)]['buttonAssistKey3']=function(){const _0x4b0cab=_0x387eb3;return TextManager[_0x4b0cab(0x96)](_0x4b0cab(0xf4));},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0xff)]=function(){const _0x2c8279=_0x387eb3;return TextManager[_0x2c8279(0x200)];},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x1ec)]=function(){const _0x2037a4=_0x387eb3,_0x5d58e9=this[_0x2037a4(0xcb)],_0x505f99=this[_0x2037a4(0x130)];if(_0x5d58e9&&_0x5d58e9[_0x2037a4(0x185)]&&_0x5d58e9[_0x2037a4(0x211)]()&&_0x5d58e9[_0x2037a4(0x23e)]())return TextManager[_0x2037a4(0x147)];else{if(_0x505f99&&_0x505f99[_0x2037a4(0x185)]&&$gameParty[_0x2037a4(0x2d9)]()[_0x2037a4(0x22f)]>0x0){if(_0x2037a4(0x1f3)===_0x2037a4(0x1f3))return TextManager[_0x2037a4(0x2b2)];else _0x253f2e[_0x2037a4(0x28d)][_0x2037a4(0xa7)]['call'](this),this[_0x2037a4(0x2c9)][_0x2037a4(0x220)](),this[_0x2037a4(0x26d)](),_0x4bd891[_0x2037a4(0x191)][_0x2037a4(0xe3)][_0x2037a4(0x201)][_0x2037a4(0x143)][_0x2037a4(0xc9)](this);}else{if(_0x2037a4(0x197)===_0x2037a4(0x2cb)){const _0x5760ed=this[_0x2037a4(0x217)](this[_0x2037a4(0x151)]());return _0x5760ed?_0x5760ed[_0x2037a4(0x231)]():!![];}else return'';}}},Scene_Party[_0x387eb3(0x28d)]['buttonAssistText4']=function(){const _0x1f3a22=_0x387eb3;if(this[_0x1f3a22(0xcb)]&&this[_0x1f3a22(0xcb)]['active'])return TextManager[_0x1f3a22(0x279)];else{if(this[_0x1f3a22(0x130)]&&this[_0x1f3a22(0x130)][_0x1f3a22(0x185)])return TextManager[_0x1f3a22(0xe1)];else{if(_0x1f3a22(0x91)!=='ybYom')_0x1cb558[_0x1f3a22(0x191)][_0x1f3a22(0x1eb)]['call'](this),this[_0x1f3a22(0x28b)](),this[_0x1f3a22(0x1e2)](),this[_0x1f3a22(0x16b)]();else return Scene_MenuBase[_0x1f3a22(0x28d)][_0x1f3a22(0x25b)]['call'](this);}}},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x16f)]=function(){const _0x1debf3=_0x387eb3;Scene_MenuBase['prototype'][_0x1debf3(0x16f)][_0x1debf3(0xc9)](this),this[_0x1debf3(0x1dc)](this[_0x1debf3(0x21d)]()),this[_0x1debf3(0xd6)]();},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x21d)]=function(){const _0x19c2e3=_0x387eb3;return VisuMZ[_0x19c2e3(0x191)][_0x19c2e3(0xe3)][_0x19c2e3(0x1e8)][_0x19c2e3(0x262)];},Scene_Party[_0x387eb3(0x28d)]['createCustomBackgroundImages']=function(){const _0x5075f3=_0x387eb3,_0x2ce1d8={'BgFilename1':VisuMZ[_0x5075f3(0x191)]['Settings'][_0x5075f3(0x1e8)][_0x5075f3(0x110)],'BgFilename2':VisuMZ['PartySystem'][_0x5075f3(0xe3)]['BgSettings'][_0x5075f3(0x1e6)]};_0x2ce1d8&&(_0x2ce1d8[_0x5075f3(0x110)]!==''||_0x2ce1d8[_0x5075f3(0x1e6)]!=='')&&(this[_0x5075f3(0x253)]=new Sprite(ImageManager[_0x5075f3(0x25d)](_0x2ce1d8[_0x5075f3(0x110)])),this['_backSprite2']=new Sprite(ImageManager[_0x5075f3(0x2c2)](_0x2ce1d8[_0x5075f3(0x1e6)])),this[_0x5075f3(0x236)](this[_0x5075f3(0x253)]),this['addChild'](this[_0x5075f3(0x26a)]),this[_0x5075f3(0x253)][_0x5075f3(0x1f0)][_0x5075f3(0x184)](this[_0x5075f3(0x284)][_0x5075f3(0x10e)](this,this[_0x5075f3(0x253)])),this[_0x5075f3(0x26a)]['bitmap'][_0x5075f3(0x184)](this[_0x5075f3(0x284)][_0x5075f3(0x10e)](this,this[_0x5075f3(0x26a)])));},Scene_Party[_0x387eb3(0x28d)]['adjustSprite']=function(_0xf667e4){const _0x52d077=_0x387eb3;this['scaleSprite'](_0xf667e4),this[_0x52d077(0x235)](_0xf667e4);},Scene_Party[_0x387eb3(0x28d)][_0x387eb3(0x204)]=function(){const _0x339df5=_0x387eb3;Scene_MenuBase[_0x339df5(0x28d)][_0x339df5(0x204)][_0x339df5(0xc9)](this),$gameParty['partyChangeRefresh']();},Window_StatusBase[_0x387eb3(0x28d)][_0x387eb3(0x1ef)]=function(_0x33021d,_0x1d209c,_0x9ea094,_0x463620){const _0x3ca4eb=_0x387eb3;if(!_0x33021d)return;if(_0x463620)this['drawActorPartyIconsVert'](_0x33021d,_0x1d209c,_0x9ea094);else{if(_0x3ca4eb(0xc7)!==_0x3ca4eb(0xc7)){if(!this[_0x3ca4eb(0x254)]())return;if(this[_0x3ca4eb(0x255)]()){_0x4e7c55['isPlaytest']()&&!_0x459ba6[_0x3ca4eb(0xfe)]&&(_0x5a628b[_0x3ca4eb(0x115)](_0x3ca4eb(0x2c7)),_0x528e19[_0x3ca4eb(0xfe)]=!![]);return;}const _0x22191f=this[_0x3ca4eb(0x2d6)](),_0x351a6f=_0x4553bb['battlePartyChangeIcon'],_0x588fad=_0x22191f===_0x3ca4eb(0x1d3)?_0x34dfc3[_0x3ca4eb(0x144)]:'\x5cI[%1]%2'[_0x3ca4eb(0x109)](_0x351a6f,_0x5dde6d[_0x3ca4eb(0x144)]),_0x575109=this[_0x3ca4eb(0x16a)]();this[_0x3ca4eb(0x1a3)](_0x588fad,'formation',_0x575109);}else this[_0x3ca4eb(0x155)](_0x33021d,_0x1d209c,_0x9ea094);}},Window_StatusBase[_0x387eb3(0x28d)]['drawActorPartyIconsHorz']=function(_0x39d6b2,_0x325ec8,_0x506654){const _0x2fa06e=_0x387eb3;_0x506654+=Math[_0x2fa06e(0x24d)]((this[_0x2fa06e(0xba)]()-ImageManager[_0x2fa06e(0x28e)])/0x2),!_0x39d6b2[_0x2fa06e(0x231)]()&&(this[_0x2fa06e(0x92)](ImageManager[_0x2fa06e(0x296)],_0x325ec8,_0x506654),_0x325ec8+=ImageManager['iconWidth']+0x4),_0x39d6b2['isRequiredInParty']()&&(this[_0x2fa06e(0x92)](ImageManager[_0x2fa06e(0xe4)],_0x325ec8,_0x506654),_0x325ec8+=ImageManager['iconWidth']+0x4);},Window_StatusBase[_0x387eb3(0x28d)][_0x387eb3(0xa5)]=function(_0x27ebe8,_0x3515a6,_0x40a7ad){const _0x2ca6ba=_0x387eb3;let _0x268711=0x0;if(!_0x27ebe8[_0x2ca6ba(0x231)]())_0x268711+=0x1;if(_0x27ebe8[_0x2ca6ba(0x27f)]())_0x268711+=0x1;if(_0x268711<=0x1){if(_0x2ca6ba(0x1d8)===_0x2ca6ba(0x1d8))return this['drawActorPartyIconsHorz'](_0x27ebe8,_0x3515a6,_0x40a7ad);else{if(_0x217455[_0x2ca6ba(0x90)])return![];return _0x50262e['PartySystem']['Scene_Base_isAutosaveEnabled'][_0x2ca6ba(0xc9)](this);}}_0x40a7ad+=Math[_0x2ca6ba(0x24d)]((this[_0x2ca6ba(0xba)]()-ImageManager[_0x2ca6ba(0x28e)])/0x2),_0x40a7ad-=Math[_0x2ca6ba(0x24d)](this['lineHeight']()/0x2),this['drawIcon'](ImageManager[_0x2ca6ba(0x296)],_0x3515a6,_0x40a7ad),_0x40a7ad+=this[_0x2ca6ba(0xba)](),this[_0x2ca6ba(0x92)](ImageManager['requiredPartyMemberIcon'],_0x3515a6,_0x40a7ad);};function Window_PartyLabel(){const _0x4f8622=_0x387eb3;this[_0x4f8622(0x125)](...arguments);}Window_PartyLabel[_0x387eb3(0x28d)]=Object[_0x387eb3(0x21c)](Window_Base[_0x387eb3(0x28d)]),Window_PartyLabel[_0x387eb3(0x28d)][_0x387eb3(0x25e)]=Window_PartyLabel,Window_PartyLabel[_0x387eb3(0x28d)][_0x387eb3(0x125)]=function(_0x3348b7,_0x42bf6f){const _0x47815d=_0x387eb3;Window_Base['prototype'][_0x47815d(0x125)][_0x47815d(0xc9)](this,_0x3348b7),this['setText'](_0x42bf6f);},Window_PartyLabel[_0x387eb3(0x28d)][_0x387eb3(0x257)]=function(){const _0x138a4c=_0x387eb3;this[_0x138a4c(0x1ad)]=0x0;},Window_PartyLabel[_0x387eb3(0x28d)][_0x387eb3(0x2d5)]=function(_0x1108a6){const _0x2ae344=_0x387eb3;this['contents'][_0x2ae344(0x220)](),this[_0x2ae344(0x138)](_0x1108a6,0x0,0x0,this[_0x2ae344(0x269)],_0x2ae344(0x2ba));};function Window_PartyActive(){const _0xab5de7=_0x387eb3;this[_0xab5de7(0x125)](...arguments);}Window_PartyActive[_0x387eb3(0x28d)]=Object['create'](Window_StatusBase[_0x387eb3(0x28d)]),Window_PartyActive['prototype'][_0x387eb3(0x25e)]=Window_PartyActive,Window_PartyActive['_actorGraphic']=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x201)][_0x387eb3(0xb9)],Window_PartyActive[_0x387eb3(0x28d)]['initialize']=function(_0x3e6a02){const _0x390d9c=_0x387eb3;Window_StatusBase['prototype'][_0x390d9c(0x125)][_0x390d9c(0xc9)](this,_0x3e6a02),this[_0x390d9c(0xa7)](),this['activate'](),this[_0x390d9c(0x265)](0x0);},Window_PartyActive[_0x387eb3(0x28d)]['addRemoveCommand']=function(){const _0x316898=_0x387eb3;return VisuMZ[_0x316898(0x191)][_0x316898(0xe3)][_0x316898(0xf9)][_0x316898(0x1ed)];},Window_PartyActive[_0x387eb3(0x28d)]['maxItems']=function(){const _0x13b562=_0x387eb3;return $gameParty[_0x13b562(0x202)]();},Window_PartyActive[_0x387eb3(0x28d)]['maxCols']=function(){const _0x33e085=_0x387eb3;return $gameParty[_0x33e085(0x202)]();},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x16e)]=function(){const _0x13b07b=_0x387eb3;return this[_0x13b07b(0x2d7)];},Window_PartyActive['prototype'][_0x387eb3(0x217)]=function(_0x198cd4){const _0x575c14=_0x387eb3;return $gameParty[_0x575c14(0x278)]()[_0x198cd4];},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x211)]=function(){return this['actor'](this['index']());},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x18f)]=function(){const _0x2bd728=_0x387eb3,_0x392a03=this[_0x2bd728(0x217)](this[_0x2bd728(0x151)]());return _0x392a03?_0x392a03['isFormationChangeOk']():!![];},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x1b5)]=function(){const _0x38fc04=_0x387eb3;if($gameParty['members']()[_0x38fc04(0x22f)]<=0x0)return!![];if($gameParty[_0x38fc04(0x141)]())return![];return $gameParty[_0x38fc04(0x2c3)]()[_0x38fc04(0x22f)]>0x0;},Window_PartyActive[_0x387eb3(0x28d)]['processCursorMove']=function(){const _0x9a666c=_0x387eb3;Window_StatusBase[_0x9a666c(0x28d)][_0x9a666c(0x10f)]['call'](this),this[_0x9a666c(0x1c9)]();},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x2be)]=function(_0xef4a4d){const _0x295bb3=_0x387eb3;this[_0x295bb3(0x160)]()&&this[_0x295bb3(0x10a)]();},Window_PartyActive[_0x387eb3(0x28d)]['cursorPagedown']=function(){const _0x2f2490=_0x387eb3,_0x41cd8b=this[_0x2f2490(0x151)](),_0x5f222f=_0x41cd8b+0x1>=this[_0x2f2490(0x28a)]()?0x0:_0x41cd8b+0x1;this[_0x2f2490(0x1a1)](_0x41cd8b,_0x5f222f);},Window_PartyActive[_0x387eb3(0x28d)]['cursorPageup']=function(){const _0x144b00=_0x387eb3,_0x384941=this[_0x144b00(0x151)](),_0x52b147=_0x384941-0x1<0x0?this[_0x144b00(0x28a)]()-0x1:_0x384941-0x1;this[_0x144b00(0x1a1)](_0x384941,_0x52b147);},Window_PartyActive[_0x387eb3(0x28d)]['quickSwap']=function(_0x36f667,_0x259007){const _0x4665a1=_0x387eb3,_0x1ba34c=this['actor'](_0x36f667),_0x5e0bdf=this[_0x4665a1(0x217)](_0x259007);if(_0x1ba34c&&!_0x1ba34c[_0x4665a1(0x231)]())return;if(_0x5e0bdf&&!_0x5e0bdf[_0x4665a1(0x231)]())return;const _0x207032=$gameParty[_0x4665a1(0xcd)];_0x207032[_0x36f667]=_0x5e0bdf?_0x5e0bdf[_0x4665a1(0x1fb)]():0x0,_0x207032[_0x259007]=_0x1ba34c?_0x1ba34c[_0x4665a1(0x1fb)]():0x0,this['refresh'](),this[_0x4665a1(0x10b)](),this[_0x4665a1(0x265)](_0x259007);},Window_PartyActive[_0x387eb3(0x28d)]['checkShiftRemoveShortcut']=function(){const _0x3945e3=_0x387eb3;if(!this[_0x3945e3(0x23e)]())return;if(Input[_0x3945e3(0xf5)](_0x3945e3(0xf4))){const _0x292e1d=this[_0x3945e3(0x211)]();this[_0x3945e3(0xb5)]();}},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0xb5)]=function(){const _0x3e4d54=_0x387eb3;SoundManager[_0x3e4d54(0x1ba)]();const _0x54d484=this[_0x3e4d54(0x211)]();$gameParty[_0x3e4d54(0x283)](_0x54d484[_0x3e4d54(0x1fb)]()),this[_0x3e4d54(0x23c)](),SceneManager['_scene'][_0x3e4d54(0x14d)]();},Window_PartyActive['prototype']['isShiftRemoveShortcutEnabled']=function(){const _0x5f3f60=_0x387eb3;if(!this[_0x5f3f60(0x22b)]())return![];const _0x12b9db=this[_0x5f3f60(0x211)]();return this['active']&&_0x12b9db&&_0x12b9db[_0x5f3f60(0x231)]();},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x214)]=function(_0x9d9757){const _0x106e1d=_0x387eb3,_0x2b1f16=this[_0x106e1d(0x217)](_0x9d9757);if(!_0x2b1f16)return this[_0x106e1d(0x93)](_0x9d9757);this[_0x106e1d(0x26d)]();const _0x4074b2=this[_0x106e1d(0x162)](_0x9d9757);this[_0x106e1d(0x2a7)](_0x9d9757);const _0x2bf4dd=_0x4074b2['y']+_0x4074b2['height']-this['lineHeight']();this[_0x106e1d(0x272)](_0x4074b2['x'],_0x2bf4dd,_0x4074b2[_0x106e1d(0x298)],0x2),this['drawActorPartyIcons'](_0x2b1f16,_0x4074b2['x']+0x2,_0x4074b2['y']),this['drawActorName'](_0x2b1f16,_0x4074b2['x'],_0x2bf4dd,_0x4074b2[_0x106e1d(0x298)]);},Window_PartyActive[_0x387eb3(0x28d)]['drawItemEmpty']=function(_0x3e04c5){const _0x4adafb=_0x387eb3;this[_0x4adafb(0x26d)]();const _0x266152=this[_0x4adafb(0x162)](_0x3e04c5);this[_0x4adafb(0xcc)](_0x266152['x'],_0x266152['y'],_0x266152[_0x4adafb(0x298)],_0x266152['height']);const _0x2c24c6=_0x266152['y']+Math[_0x4adafb(0x24d)]((_0x266152[_0x4adafb(0x15e)]-this['lineHeight']())/0x2);this[_0x4adafb(0x240)](ColorManager[_0x4adafb(0x1e5)]()),this[_0x4adafb(0x138)](TextManager[_0x4adafb(0x94)],_0x266152['x'],_0x2c24c6,_0x266152[_0x4adafb(0x298)],_0x4adafb(0x2ba));},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0xcc)]=function(_0x3c6482,_0x1a3e03,_0x3a9c5c,_0x57940d,_0x546066){const _0x5bb817=_0x387eb3;_0x546066=Math[_0x5bb817(0xfb)](_0x546066||0x1,0x1);while(_0x546066--){_0x57940d=_0x57940d||this['lineHeight'](),this['contents'][_0x5bb817(0x1cc)]=0xa0;const _0x184939=ColorManager[_0x5bb817(0x212)]();this[_0x5bb817(0x2c9)][_0x5bb817(0x104)](_0x3c6482+0x1,_0x1a3e03+0x1,_0x3a9c5c-0x2,_0x57940d-0x2,_0x184939),this[_0x5bb817(0x2c9)][_0x5bb817(0x1cc)]=0xff;}},Window_PartyActive[_0x387eb3(0x28d)]['drawItemImage']=function(_0x371b06){const _0x278bc2=_0x387eb3;switch(Window_PartyActive[_0x278bc2(0x229)][_0x278bc2(0x133)]()[_0x278bc2(0x290)]()){case _0x278bc2(0x117):this[_0x278bc2(0x245)](_0x371b06);break;case'sprite':this[_0x278bc2(0x2b9)](_0x371b06);break;case'svbattler':Imported[_0x278bc2(0xe5)]&&(_0x278bc2(0x1df)==='SBCXK'?this[_0x278bc2(0x129)](_0x371b06):this['refresh']());break;};},Window_PartyActive['prototype'][_0x387eb3(0x245)]=function(_0x2f4471){const _0x323af3=_0x387eb3,_0x5a60cf=this[_0x323af3(0x217)](_0x2f4471),_0x1e5be9=this[_0x323af3(0x162)](_0x2f4471),_0x3c6f59=Math[_0x323af3(0x297)](ImageManager[_0x323af3(0x26e)],_0x1e5be9[_0x323af3(0x298)]-0x2),_0xff8ef3=_0x1e5be9[_0x323af3(0x15e)]-0x2;this['changePaintOpacity'](_0x5a60cf[_0x323af3(0x231)]());const _0x3a2d21=Math[_0x323af3(0x24d)](_0x1e5be9['x']+(_0x1e5be9[_0x323af3(0x298)]-_0x3c6f59)/0x2);this['drawActorFace'](_0x5a60cf,_0x3a2d21,_0x1e5be9['y']+0x1,_0x3c6f59,_0xff8ef3),this[_0x323af3(0x288)](!![]);},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x2b9)]=function(_0x5e8818){const _0x54e874=_0x387eb3,_0x5df39c=this['actor'](_0x5e8818),_0x936d93=this[_0x54e874(0x162)](_0x5e8818),_0x3bcb88=VisuMZ['PartySystem'][_0x54e874(0xe3)]['Window'],_0x408433=_0x936d93['x']+Math[_0x54e874(0x24d)](_0x936d93[_0x54e874(0x298)]/0x2)+_0x3bcb88[_0x54e874(0x18c)],_0x4936d5=_0x936d93['y']+_0x936d93[_0x54e874(0x15e)]-this[_0x54e874(0xba)]()-_0x3bcb88[_0x54e874(0xf8)];this[_0x54e874(0x15c)](_0x5df39c,_0x408433,_0x4936d5);},Window_PartyActive[_0x387eb3(0x28d)]['drawItemImageSvActor']=function(_0x25af92){const _0x425e2d=_0x387eb3,_0x3ccd8c=this['actor'](_0x25af92),_0xf648ff=_0x3ccd8c[_0x425e2d(0x1a0)](),_0x5eaea3=this['itemRect'](_0x25af92),_0x3698a4=VisuMZ[_0x425e2d(0x191)][_0x425e2d(0xe3)][_0x425e2d(0x201)],_0x18ee89=_0x5eaea3['x']+Math[_0x425e2d(0x24d)](_0x5eaea3[_0x425e2d(0x298)]/0x2)+_0x3698a4[_0x425e2d(0x1da)],_0x4e147a=_0x5eaea3['y']+_0x5eaea3['height']-this[_0x425e2d(0xba)]()-_0x3698a4['ActiveBattlerOffsetY'];this[_0x425e2d(0x10d)](_0xf648ff,_0x18ee89,_0x4e147a);},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x272)]=function(_0x17a385,_0x470dba,_0x587f42,_0x1e58c8){const _0x8b99f2=_0x387eb3,_0x1703a0=ColorManager[_0x8b99f2(0x9e)](),_0xe098c4=ColorManager[_0x8b99f2(0xf0)](),_0xee384f=_0x587f42/0x2,_0x5e00fa=this[_0x8b99f2(0xba)]();while(_0x1e58c8--){_0x8b99f2(0x1b7)!=='WWlXr'?(this[_0x8b99f2(0x2c9)][_0x8b99f2(0x16c)](_0x17a385,_0x470dba,_0xee384f,_0x5e00fa,_0xe098c4,_0x1703a0),this[_0x8b99f2(0x2c9)][_0x8b99f2(0x16c)](_0x17a385+_0xee384f,_0x470dba,_0xee384f,_0x5e00fa,_0x1703a0,_0xe098c4)):(_0x480c6e[_0x8b99f2(0x21e)](),_0x5ba1d1[_0x8b99f2(0x1c5)](_0x2ab854[_0x8b99f2(0x217)](_0x46f221)));}},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x20d)]=function(_0x1da4f5,_0x528369,_0x693e24,_0x33b5a6){const _0x3d4672=_0x387eb3;_0x33b5a6=_0x33b5a6||0xa8,this[_0x3d4672(0x240)](ColorManager[_0x3d4672(0x127)](_0x1da4f5)),this[_0x3d4672(0x138)](_0x1da4f5[_0x3d4672(0x101)](),_0x528369,_0x693e24,_0x33b5a6,_0x3d4672(0x2ba));},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x277)]=function(_0x247b66){const _0x1733ac=_0x387eb3;this[_0x1733ac(0x179)]=_0x247b66,this[_0x1733ac(0x23c)]();},Window_PartyActive[_0x387eb3(0x28d)][_0x387eb3(0x23c)]=function(){const _0x340e30=_0x387eb3;if(this[_0x340e30(0x179)])this['_statusWindow'][_0x340e30(0x163)](this['actor'](this[_0x340e30(0x151)]()));};function Window_PartyReserve(){this['initialize'](...arguments);}function _0x40be(_0x11ab6a,_0x43fe9c){const _0x3a5fbf=_0x3a5f();return _0x40be=function(_0x40bebd,_0x56ad2f){_0x40bebd=_0x40bebd-0x90;let _0x23917b=_0x3a5fbf[_0x40bebd];return _0x23917b;},_0x40be(_0x11ab6a,_0x43fe9c);}Window_PartyReserve['prototype']=Object['create'](Window_StatusBase['prototype']),Window_PartyReserve[_0x387eb3(0x28d)]['constructor']=Window_PartyReserve,Window_PartyReserve[_0x387eb3(0x229)]=VisuMZ['PartySystem'][_0x387eb3(0xe3)][_0x387eb3(0x201)][_0x387eb3(0x12d)],Window_PartyReserve['_rowThickness']=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x201)][_0x387eb3(0xad)],Window_PartyReserve[_0x387eb3(0x28d)]['initialize']=function(_0x34caed){const _0x22cdd0=_0x387eb3;Window_StatusBase['prototype'][_0x22cdd0(0x125)][_0x22cdd0(0xc9)](this,_0x34caed),this[_0x22cdd0(0x1f2)]=0x0,this[_0x22cdd0(0xa7)]();},Window_PartyReserve[_0x387eb3(0x28d)]['maxCols']=function(){const _0x684b04=_0x387eb3;return VisuMZ['PartySystem'][_0x684b04(0xe3)][_0x684b04(0x201)]['ReserveCol']||0x1;},Window_PartyReserve['prototype'][_0x387eb3(0x16e)]=function(){const _0x2b4d98=_0x387eb3;return this[_0x2b4d98(0xba)]()*Window_PartyReserve['_rowThickness']+0x6;},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x22b)]=function(){const _0x4d214b=_0x387eb3;return VisuMZ[_0x4d214b(0x191)]['Settings'][_0x4d214b(0xf9)][_0x4d214b(0x1ed)];},Window_PartyReserve[_0x387eb3(0x28d)]['maxItems']=function(){const _0x59521b=_0x387eb3;let _0x1706b4=$gameParty[_0x59521b(0x2d9)]()[_0x59521b(0x22f)];if(this[_0x59521b(0x22b)]())_0x1706b4++;return _0x1706b4;},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x217)]=function(_0x4cf4f7){const _0x115920=_0x387eb3;return $gameParty[_0x115920(0x2d9)]()[_0x4cf4f7];},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x211)]=function(){const _0x556ee3=_0x387eb3;return this[_0x556ee3(0x217)](this[_0x556ee3(0x151)]());},Window_PartyReserve['prototype'][_0x387eb3(0x1d5)]=function(){SoundManager['playEquip']();},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x18f)]=function(){const _0xcd5a74=_0x387eb3,_0x35d85b=this[_0xcd5a74(0x217)](this[_0xcd5a74(0x151)]());return _0x35d85b?_0x35d85b[_0xcd5a74(0x231)]():!![];},Window_PartyReserve['prototype'][_0x387eb3(0x10f)]=function(){const _0x52bfc7=_0x387eb3;Window_StatusBase[_0x52bfc7(0x28d)][_0x52bfc7(0x10f)]['call'](this),this[_0x52bfc7(0x137)]();},Window_PartyReserve['prototype'][_0x387eb3(0x1bd)]=function(_0xc8c629){const _0xd99ba6=_0x387eb3;this['index']()<=0x0&&Input[_0xd99ba6(0xf5)]('up')?_0xd99ba6(0x2d0)!=='hDHnl'?this['processCancel']():(_0x3544c9[_0xd99ba6(0x28d)][_0xd99ba6(0x221)][_0xd99ba6(0xc9)](this),this['open'](),this['refresh'](),this[_0xd99ba6(0x265)](0x0)):_0xd99ba6(0x24c)===_0xd99ba6(0x24c)?Window_StatusBase[_0xd99ba6(0x28d)][_0xd99ba6(0x1bd)][_0xd99ba6(0xc9)](this,_0xc8c629):this[_0xd99ba6(0x125)](...arguments);},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x116)]=function(){const _0x2155a2=_0x387eb3,_0x5d2632=this[_0x2155a2(0x151)](),_0x535778=_0x5d2632+0x1>=this[_0x2155a2(0x28a)]()-0x1?0x0:_0x5d2632+0x1;this[_0x2155a2(0x1a1)](_0x5d2632,_0x535778);},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x12a)]=function(){const _0x118e1e=_0x387eb3,_0xee8110=this['index'](),_0x2705ee=_0xee8110-0x1<0x0?this[_0x118e1e(0x28a)]()-0x2:_0xee8110-0x1;this[_0x118e1e(0x1a1)](_0xee8110,_0x2705ee);},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x1a1)]=function(_0x510549,_0x436cf1){const _0x274edf=_0x387eb3,_0xd5eeb6=this['actor'](_0x510549),_0x171206=this['actor'](_0x436cf1);if(!_0xd5eeb6?.[_0x274edf(0x231)]()||!_0x171206?.[_0x274edf(0x231)]()){if(_0x274edf(0x161)===_0x274edf(0x161))return;else{const _0x34386d=this[_0x274edf(0x217)](_0x1afb38),_0x4d6d9f=this[_0x274edf(0x217)](_0xb03ddf);if(!_0x34386d?.['isFormationChangeOk']()||!_0x4d6d9f?.[_0x274edf(0x231)]())return;else{if(!_0x34386d||!_0x4d6d9f)return;}const _0x4b20e3=_0xe97601['_actors'],_0x2b97d0=_0x4b20e3['indexOf'](_0x34386d[_0x274edf(0x1fb)]()),_0x136111=_0x4b20e3[_0x274edf(0xf6)](_0x4d6d9f[_0x274edf(0x1fb)]());_0x4b20e3[_0x2b97d0]=_0x4d6d9f?_0x4d6d9f[_0x274edf(0x1fb)]():0x0,_0x4b20e3[_0x136111]=_0x34386d?_0x34386d[_0x274edf(0x1fb)]():0x0,this[_0x274edf(0xa7)](),this[_0x274edf(0x10b)](),this[_0x274edf(0x265)](_0x1a8618);}}else{if(!_0xd5eeb6||!_0x171206){if('RCMkY'===_0x274edf(0xb3))return;else{const _0x21a830=this[_0x274edf(0xcb)],_0x16553a=this[_0x274edf(0x130)];if(_0x21a830&&_0x21a830[_0x274edf(0x185)]&&_0x21a830[_0x274edf(0x211)]()&&_0x21a830[_0x274edf(0x23e)]())return _0x57cc45[_0x274edf(0x147)];else return _0x16553a&&_0x16553a[_0x274edf(0x185)]&&_0x25645c['reserveMembers']()[_0x274edf(0x22f)]>0x0?_0x44525c[_0x274edf(0x2b2)]:'';}}}const _0x2a545d=$gameParty[_0x274edf(0x241)],_0x480440=_0x2a545d[_0x274edf(0xf6)](_0xd5eeb6['actorId']()),_0x46aad2=_0x2a545d[_0x274edf(0xf6)](_0x171206[_0x274edf(0x1fb)]());_0x2a545d[_0x480440]=_0x171206?_0x171206[_0x274edf(0x1fb)]():0x0,_0x2a545d[_0x46aad2]=_0xd5eeb6?_0xd5eeb6[_0x274edf(0x1fb)]():0x0,this[_0x274edf(0xa7)](),this[_0x274edf(0x10b)](),this[_0x274edf(0x265)](_0x436cf1);},Window_PartyReserve[_0x387eb3(0x28d)]['checkShiftSortShortcut']=function(){const _0xbfe7c1=_0x387eb3;if(!this[_0xbfe7c1(0x196)]())return;Input[_0xbfe7c1(0xf5)](_0xbfe7c1(0xf4))&&this['processShiftSortShortcut']();},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x246)]=function(){const _0x4f2060=_0x387eb3;SoundManager[_0x4f2060(0x1ba)](),$gameParty[_0x4f2060(0x2b1)](),this[_0x4f2060(0x265)](0x0),SceneManager[_0x4f2060(0x260)][_0x4f2060(0x14d)]();},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x196)]=function(){const _0x4de949=_0x387eb3;return this[_0x4de949(0x185)];},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x1b9)]=function(){const _0x1e9918=_0x387eb3,_0x1bac4f=this[_0x1e9918(0x211)]();return _0x1bac4f?_0x1bac4f[_0x1e9918(0x151)]():-0x1;},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x280)]=function(_0xcf94ce){const _0x5173ce=_0x387eb3;Window_StatusBase[_0x5173ce(0x28d)][_0x5173ce(0x280)][_0x5173ce(0xc9)](this,_0xcf94ce);if(_0xcf94ce>=0x0)this[_0x5173ce(0x1f2)]=_0xcf94ce;},Window_PartyReserve['prototype'][_0x387eb3(0x2b5)]=function(){const _0x323f57=_0x387eb3;this[_0x323f57(0x1f2)]=Math[_0x323f57(0x297)](this['_lastIndex'],this[_0x323f57(0x28a)]()-0x1),this[_0x323f57(0x265)](this['_lastIndex']),this[_0x323f57(0xb0)](!![]),this[_0x323f57(0x193)]=!![];},Window_PartyReserve[_0x387eb3(0x28d)]['drawItem']=function(_0x201346){const _0xe8c527=_0x387eb3,_0x520079=this[_0xe8c527(0x217)](_0x201346);if(!_0x520079)return this[_0xe8c527(0x249)](_0x201346);const _0x3f8aa3=this[_0xe8c527(0x2bb)](_0x201346);this['drawItemImage'](_0x201346);const _0x21fe43=0xa8,_0x3dbf0f=Window_PartyReserve[_0xe8c527(0x2d1)]===0x1,_0x2dc52d=ImageManager['iconWidth']*(_0x3dbf0f?0x2:0x1),_0x46473c=this[_0xe8c527(0x1ce)]()+this[_0xe8c527(0x215)](),_0x257415=_0x3f8aa3[_0xe8c527(0x298)]-_0x21fe43,_0x33ea05=_0x3f8aa3['x']+_0x2dc52d+Math[_0xe8c527(0x297)](_0x46473c,_0x257415),_0x48713f=_0x3dbf0f?![]:!![];this['changePaintOpacity'](_0x520079['isFormationChangeOk']()),this[_0xe8c527(0x1ef)](_0x520079,_0x3f8aa3['x'],_0x3f8aa3['y'],_0x48713f),this[_0xe8c527(0x20d)](_0x520079,_0x33ea05,_0x3f8aa3['y'],_0x21fe43),this[_0xe8c527(0x288)](!![]);},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x1ce)]=function(){const _0x2f116b=_0x387eb3,_0x1a35d1=VisuMZ[_0x2f116b(0x191)][_0x2f116b(0xe3)][_0x2f116b(0x201)];switch(Window_PartyReserve[_0x2f116b(0x229)][_0x2f116b(0x133)]()[_0x2f116b(0x290)]()){case _0x2f116b(0x117):return ImageManager[_0x2f116b(0x26e)];case _0x2f116b(0x1de):return _0x1a35d1[_0x2f116b(0x1ab)]*0x2;case _0x2f116b(0x105):return _0x1a35d1[_0x2f116b(0x15a)]*0x2;};},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x249)]=function(_0x5f0902){const _0x3b923c=_0x387eb3,_0x84a0a=this[_0x3b923c(0x2bb)](_0x5f0902);this[_0x3b923c(0x288)](!![]);const _0x43af13=TextManager['removePartyMember'];this[_0x3b923c(0x138)](_0x43af13,_0x84a0a['x'],_0x84a0a['y'],_0x84a0a[_0x3b923c(0x298)],_0x3b923c(0x2ba));},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x2a7)]=function(_0x1f5265){const _0x4361b2=_0x387eb3;switch(Window_PartyReserve[_0x4361b2(0x229)]['toLowerCase']()['trim']()){case _0x4361b2(0x117):this[_0x4361b2(0x245)](_0x1f5265);break;case _0x4361b2(0x1de):this[_0x4361b2(0x2b9)](_0x1f5265);break;case'svbattler':Imported[_0x4361b2(0xe5)]&&this[_0x4361b2(0x129)](_0x1f5265);break;};},Window_PartyReserve['prototype']['drawItemImageFace']=function(_0x4565c4){const _0x7b456e=_0x387eb3,_0x1d1dbf=this[_0x7b456e(0x217)](_0x4565c4),_0x2c8ae4=this[_0x7b456e(0x162)](_0x4565c4),_0x276df0=Window_PartyReserve[_0x7b456e(0x2d1)]===0x1;_0x2c8ae4['x']+=ImageManager['iconWidth']*(_0x276df0?0x2:0x1);const _0x570253=ImageManager[_0x7b456e(0x26e)],_0x549817=_0x2c8ae4['height']-0x2;this[_0x7b456e(0x288)](_0x1d1dbf[_0x7b456e(0x231)]()),this[_0x7b456e(0x99)](_0x1d1dbf,_0x2c8ae4['x']+0x1,_0x2c8ae4['y']+0x1,_0x570253,_0x549817),this[_0x7b456e(0x288)](!![]);},Window_PartyReserve[_0x387eb3(0x28d)]['drawItemImageSprite']=function(_0x22094a){const _0x13db81=_0x387eb3,_0x136cd4=this[_0x13db81(0x217)](_0x22094a),_0x1fda2c=this[_0x13db81(0x162)](_0x22094a),_0x326858=Window_PartyReserve[_0x13db81(0x2d1)]===0x1;_0x1fda2c['x']+=ImageManager['iconWidth']*(_0x326858?0x2:0x1);const _0x4618ad=VisuMZ[_0x13db81(0x191)][_0x13db81(0xe3)][_0x13db81(0x201)],_0x5abe00=_0x1fda2c['x']+_0x4618ad['ReserveSpriteOffsetX']+this['itemPadding'](),_0x559829=_0x1fda2c['y']+_0x1fda2c['height']-_0x4618ad['ReserveSpriteOffsetY'];this['drawActorCharacter'](_0x136cd4,_0x5abe00,_0x559829);},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x129)]=function(_0x5e222d){const _0x141e97=_0x387eb3,_0x4ea8d0=this[_0x141e97(0x217)](_0x5e222d),_0x2d0213=_0x4ea8d0['battlerName'](),_0x48b9d7=this[_0x141e97(0x162)](_0x5e222d),_0x350b08=Window_PartyReserve[_0x141e97(0x2d1)]===0x1;_0x48b9d7['x']+=ImageManager[_0x141e97(0x95)]*(_0x350b08?0x2:0x1);const _0x5101e1=VisuMZ[_0x141e97(0x191)][_0x141e97(0xe3)]['Window'],_0x463092=_0x48b9d7['x']+_0x5101e1['ReserveBattlerOffsetX']+this[_0x141e97(0x215)](),_0x118f15=_0x48b9d7['y']+_0x48b9d7['height']-_0x5101e1[_0x141e97(0xe0)];this[_0x141e97(0x10d)](_0x2d0213,_0x463092,_0x118f15);},Window_PartyReserve['prototype'][_0x387eb3(0x277)]=function(_0x4bf504){const _0x270120=_0x387eb3;this[_0x270120(0x179)]=_0x4bf504,this[_0x270120(0x23c)]();},Window_PartyReserve[_0x387eb3(0x28d)][_0x387eb3(0x23c)]=function(){const _0x43270b=_0x387eb3;this[_0x43270b(0x179)]&&this['_statusWindow'][_0x43270b(0x163)](this[_0x43270b(0x217)](this[_0x43270b(0x151)]()));};function Window_PartyStatus(){const _0x9940b5=_0x387eb3;this[_0x9940b5(0x125)](...arguments);}Window_PartyStatus[_0x387eb3(0x28d)]=Object[_0x387eb3(0x21c)](Window_StatusBase['prototype']),Window_PartyStatus[_0x387eb3(0x28d)][_0x387eb3(0x25e)]=Window_PartyStatus,Window_PartyStatus['prototype'][_0x387eb3(0x125)]=function(_0x253dab){const _0x1fcd5a=_0x387eb3;this[_0x1fcd5a(0x237)]=null,Window_StatusBase[_0x1fcd5a(0x28d)][_0x1fcd5a(0x125)][_0x1fcd5a(0xc9)](this,_0x253dab);},Window_PartyStatus[_0x387eb3(0x28d)][_0x387eb3(0xcc)]=function(_0x213e91,_0x266733,_0x1566ea,_0x6bdcdb,_0x2d3047){const _0x11130f=_0x387eb3;if(VisuMZ[_0x11130f(0x191)]['Settings'][_0x11130f(0xf9)][_0x11130f(0x256)]===![])return;_0x2d3047=Math['max'](_0x2d3047||0x1,0x1);while(_0x2d3047--){_0x6bdcdb=_0x6bdcdb||this[_0x11130f(0xba)](),this['contents'][_0x11130f(0x1cc)]=0xa0;const _0x3b929e=ColorManager['getPartySystemBackColor']();this[_0x11130f(0x2c9)]['fillRect'](_0x213e91+0x1,_0x266733+0x1,_0x1566ea-0x2,_0x6bdcdb-0x2,_0x3b929e),this['contents'][_0x11130f(0x1cc)]=0xff;}},ColorManager[_0x387eb3(0x1f1)]=function(){const _0x821cd1=_0x387eb3,_0x183ffb=VisuMZ[_0x821cd1(0x191)][_0x821cd1(0xe3)][_0x821cd1(0xf9)];let _0x260497=_0x183ffb[_0x821cd1(0x19b)]!==undefined?_0x183ffb[_0x821cd1(0x19b)]:0x13;return ColorManager[_0x821cd1(0xe9)](_0x260497);},Window_PartyStatus[_0x387eb3(0x28d)][_0x387eb3(0x163)]=function(_0x381502){const _0x24f72c=_0x387eb3;if(this[_0x24f72c(0x237)]===_0x381502)return;this[_0x24f72c(0x237)]=_0x381502;if(_0x381502){const _0x6a3354=ImageManager[_0x24f72c(0x192)](_0x381502['faceName']());_0x6a3354[_0x24f72c(0x184)](this[_0x24f72c(0xa7)][_0x24f72c(0x10e)](this));}else this[_0x24f72c(0xa7)]();},Window_PartyStatus[_0x387eb3(0x28d)][_0x387eb3(0xa7)]=function(){const _0x479207=_0x387eb3;Window_StatusBase[_0x479207(0x28d)][_0x479207(0xa7)][_0x479207(0xc9)](this),this[_0x479207(0x2c9)]['clear'](),this[_0x479207(0x26d)](),VisuMZ[_0x479207(0x191)][_0x479207(0xe3)][_0x479207(0x201)]['StatusWindowDraw'][_0x479207(0xc9)](this);},Window_PartyStatus['prototype'][_0x387eb3(0x173)]=function(){const _0x42b9f0=_0x387eb3;if(!this[_0x42b9f0(0x237)]){this[_0x42b9f0(0xcc)](0x0,0x0,this[_0x42b9f0(0x269)],this[_0x42b9f0(0x2d7)]);const _0x1e5b84=Math[_0x42b9f0(0x24d)]((this[_0x42b9f0(0x2d7)]-this[_0x42b9f0(0xba)]())/0x2);this[_0x42b9f0(0x240)](ColorManager['systemColor']()),this['drawText'](TextManager[_0x42b9f0(0x94)],0x0,_0x1e5b84,this[_0x42b9f0(0x269)],_0x42b9f0(0x2ba));return;}this[_0x42b9f0(0x99)](this[_0x42b9f0(0x237)],0x1,0x0,ImageManager[_0x42b9f0(0x26e)],ImageManager[_0x42b9f0(0x1bb)]),this[_0x42b9f0(0xa2)](this[_0x42b9f0(0x237)],ImageManager[_0x42b9f0(0x26e)]+0x24,0x0);const _0x216e29=this[_0x42b9f0(0xba)](),_0x3b61bd=this[_0x42b9f0(0x230)](),_0x4d95da=Math[_0x42b9f0(0x24d)](this[_0x42b9f0(0x269)]/0x2),_0x2c7602=Math[_0x42b9f0(0x12b)](_0x3b61bd['length']/0x2)*_0x216e29,_0x569a80=0x0;let _0x3adcd7=0x0,_0xde91c=ImageManager[_0x42b9f0(0x1bb)]+_0x216e29/0x2;for(const _0x5dbe05 of _0x3b61bd){if(_0x42b9f0(0x276)===_0x42b9f0(0x276))this[_0x42b9f0(0xcc)](_0x3adcd7,_0xde91c,_0x4d95da,_0x216e29),this['drawParamName'](_0x5dbe05,_0x3adcd7,_0xde91c,_0x4d95da),this[_0x42b9f0(0xc8)](_0x5dbe05,_0x3adcd7,_0xde91c,_0x4d95da),_0x3adcd7===_0x569a80?_0x3adcd7+=_0x4d95da:(_0x3adcd7=_0x569a80,_0xde91c+=_0x216e29);else{const _0x5b86b4=this[_0x42b9f0(0x9a)]();this[_0x42b9f0(0x130)]=new _0x345e49(_0x5b86b4),this[_0x42b9f0(0x130)][_0x42b9f0(0x1c6)](_0x26612d['PartySystem'][_0x42b9f0(0xe3)][_0x42b9f0(0x201)][_0x42b9f0(0x164)]),this[_0x42b9f0(0x130)][_0x42b9f0(0x2af)]('ok',this[_0x42b9f0(0x182)][_0x42b9f0(0x10e)](this)),this['_reservePartyWindow']['setHandler'](_0x42b9f0(0x108),this[_0x42b9f0(0x149)][_0x42b9f0(0x10e)](this)),this[_0x42b9f0(0x140)](this[_0x42b9f0(0x130)]);}}},Window_PartyStatus[_0x387eb3(0x28d)][_0x387eb3(0x230)]=function(){const _0x169157=_0x387eb3;return Imported[_0x169157(0x23f)]?VisuMZ[_0x169157(0x186)][_0x169157(0xe3)][_0x169157(0x2c6)][_0x169157(0x1bf)]:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus['prototype'][_0x387eb3(0xca)]=function(_0x3484fc,_0x4f3fe7,_0x5abb99,_0x360554){const _0x5ab1fe=_0x387eb3,_0x5a9a76=this[_0x5ab1fe(0x215)]();_0x360554-=_0x5a9a76*0x2;if(Imported[_0x5ab1fe(0x23f)])this[_0x5ab1fe(0x11d)](_0x4f3fe7+_0x5a9a76,_0x5abb99,_0x360554,_0x3484fc,![]);else{const _0x20dec9=TextManager[_0x5ab1fe(0x238)](_0x3484fc);this[_0x5ab1fe(0x240)](ColorManager[_0x5ab1fe(0x1e5)]()),this['drawText'](_0x20dec9,_0x4f3fe7+_0x5a9a76,_0x5abb99,_0x360554);}},Window_PartyStatus[_0x387eb3(0x28d)][_0x387eb3(0xc8)]=function(_0x39a51a,_0x169522,_0x31c883,_0xc22dad){const _0x1536c5=_0x387eb3;this[_0x1536c5(0x26d)]();const _0x4560e8=this['itemPadding'](),_0x35eaba=this[_0x1536c5(0xc2)](_0x39a51a);this[_0x1536c5(0x138)](_0x35eaba,_0x169522+_0x4560e8,_0x31c883,_0xc22dad-_0x4560e8*0x2,_0x1536c5(0x98));},Window_PartyStatus[_0x387eb3(0x28d)][_0x387eb3(0xc2)]=function(_0x33e93f){const _0xe522f2=_0x387eb3,_0x3b8878=this[_0xe522f2(0x237)];if(Imported[_0xe522f2(0x23f)]){if(_0xe522f2(0x171)!==_0xe522f2(0x171)){const _0x4fb7f7=_0x2dd30b[_0xe522f2(0x9e)](),_0x382832=_0x50175a[_0xe522f2(0xf0)](),_0x2ac2bc=_0x3bd47f/0x2,_0x45a067=this[_0xe522f2(0xba)]();while(_0x2ee24d--){this[_0xe522f2(0x2c9)]['gradientFillRect'](_0x16bada,_0x14a5bd,_0x2ac2bc,_0x45a067,_0x382832,_0x4fb7f7),this[_0xe522f2(0x2c9)][_0xe522f2(0x16c)](_0x1a0ee1+_0x2ac2bc,_0x5f3a26,_0x2ac2bc,_0x45a067,_0x4fb7f7,_0x382832);}}else return _0x3b8878[_0xe522f2(0x2a1)](_0x33e93f,!![]);}else return _0x3b8878[_0xe522f2(0x238)](_0x33e93f);};function Window_PartyBattleSwitch(){this['initialize'](...arguments);}Window_PartyBattleSwitch[_0x387eb3(0x28d)]=Object['create'](Window_StatusBase[_0x387eb3(0x28d)]),Window_PartyBattleSwitch['prototype'][_0x387eb3(0x25e)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0x387eb3(0x28d)]['initialize']=function(_0x1a1984){const _0x338570=_0x387eb3;Window_StatusBase[_0x338570(0x28d)][_0x338570(0x125)][_0x338570(0xc9)](this,_0x1a1984),this['setBackgroundType'](VisuMZ[_0x338570(0x191)]['Settings'][_0x338570(0x201)][_0x338570(0x13b)]),this[_0x338570(0x14f)]=0x0;},Window_PartyBattleSwitch[_0x387eb3(0x28d)]['loadFaceImages']=function(){const _0x3a5e31=_0x387eb3;for(const _0x18894f of $gameParty['allMembers']()){if(_0x3a5e31(0x1f7)!==_0x3a5e31(0x1f7))return _0x11a9d3[_0x3a5e31(0x191)][_0x3a5e31(0xe3)]['General']['AddRemoveCmd'];else ImageManager[_0x3a5e31(0x192)](_0x18894f[_0x3a5e31(0x1c3)]());}},Window_PartyBattleSwitch[_0x387eb3(0x28d)]['maxCols']=function(){return 0x1;},Window_PartyBattleSwitch[_0x387eb3(0x28d)][_0x387eb3(0x217)]=function(_0x352373){const _0x21043a=_0x387eb3;return $gameParty[_0x21043a(0x2d9)]()[_0x352373];},Window_PartyBattleSwitch[_0x387eb3(0x28d)][_0x387eb3(0x211)]=function(){const _0x26a64b=_0x387eb3;return this['actor'](this[_0x26a64b(0x151)]());},Window_PartyBattleSwitch['prototype']['itemHeight']=function(){const _0x5732c6=_0x387eb3;return this[_0x5732c6(0xba)]()*0x2+0x8;},Window_PartyBattleSwitch[_0x387eb3(0x28d)][_0x387eb3(0x28a)]=function(){const _0x46b730=_0x387eb3;return $gameParty[_0x46b730(0x2d9)]()['length'];},Window_PartyBattleSwitch[_0x387eb3(0x28d)]['activate']=function(){const _0x123bed=_0x387eb3;Window_StatusBase[_0x123bed(0x28d)][_0x123bed(0x221)][_0x123bed(0xc9)](this),this[_0x123bed(0x174)](),this[_0x123bed(0xa7)](),this[_0x123bed(0x265)](0x0);},Window_PartyBattleSwitch[_0x387eb3(0x28d)][_0x387eb3(0x150)]=function(){const _0x341826=_0x387eb3;Window_StatusBase[_0x341826(0x28d)][_0x341826(0x150)][_0x341826(0xc9)](this),this[_0x341826(0x106)]();},Window_PartyBattleSwitch[_0x387eb3(0x28d)][_0x387eb3(0x18f)]=function(){const _0x33b1ac=_0x387eb3;return this[_0x33b1ac(0x2a2)](this[_0x33b1ac(0x211)]());},Window_PartyBattleSwitch['prototype'][_0x387eb3(0x2a2)]=function(_0x382ea0){const _0x27fd3b=_0x387eb3;if(!_0x382ea0)return![];return _0x382ea0['isFormationChangeOk']()&&_0x382ea0[_0x27fd3b(0x28f)]();},Window_PartyBattleSwitch[_0x387eb3(0x28d)][_0x387eb3(0x214)]=function(_0x38306d){const _0x29851c=_0x387eb3,_0x274604=this[_0x29851c(0x217)](_0x38306d);if(!_0x274604)return;const _0x3e55f4=ImageManager[_0x29851c(0x192)](_0x274604[_0x29851c(0x1c3)]());_0x3e55f4['addLoadListener'](this['processDrawItem']['bind'](this,_0x38306d));},Window_PartyBattleSwitch[_0x387eb3(0x28d)][_0x387eb3(0xee)]=function(_0x24224e){const _0xe1088b=_0x387eb3;this[_0xe1088b(0x2a7)](_0x24224e),this[_0xe1088b(0x233)](_0x24224e);},Window_PartyBattleSwitch['prototype']['drawItemImage']=function(_0x3ffee9){const _0x238248=_0x387eb3,_0x24be12=this[_0x238248(0x217)](_0x3ffee9),_0x4dab32=this['itemRect'](_0x3ffee9);this[_0x238248(0x288)](this[_0x238248(0x2a2)](_0x24be12)),this['drawActorFace'](_0x24be12,_0x4dab32['x']+0x1,_0x4dab32['y']+0x1,ImageManager[_0x238248(0x26e)],_0x4dab32['height']-0x2),this['changePaintOpacity'](!![]);},Window_PartyBattleSwitch[_0x387eb3(0x28d)][_0x387eb3(0x233)]=function(_0x451471){const _0x4f39b7=_0x387eb3,_0x1550c1=this[_0x4f39b7(0x217)](_0x451471),_0x493577=this[_0x4f39b7(0x234)](_0x451471),_0x36e956=_0x493577['x']+ImageManager[_0x4f39b7(0x26e)]+0x24,_0x20a0f2=_0x36e956+0xb4;this[_0x4f39b7(0x288)](this[_0x4f39b7(0x2a2)](_0x1550c1)),this[_0x4f39b7(0x20d)](_0x1550c1,_0x36e956,_0x493577['y']),this[_0x4f39b7(0x17a)](_0x1550c1,_0x36e956,_0x493577['y']+this[_0x4f39b7(0xba)]()),this[_0x4f39b7(0x1a2)](_0x1550c1,_0x20a0f2,_0x493577['y']),this[_0x4f39b7(0x288)](!![]);};Imported['VisuMZ_1_BattleCore']&&(ImageManager['battlePartyChangeIcon']=VisuMZ['PartySystem'][_0x387eb3(0xe3)][_0x387eb3(0xf9)][_0x387eb3(0xd8)]??0x4b,TextManager[_0x387eb3(0x144)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0xb1)],TextManager['battlePartyChangeCmdHelp']=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0x21b)],TextManager[_0x387eb3(0xa6)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)]['BattleSwitchOut'],TextManager[_0x387eb3(0x26b)]=VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x15f)][_0x387eb3(0x189)],TextManager['ActiveTpbFormationMessage']=VisuMZ[_0x387eb3(0x191)]['Settings'][_0x387eb3(0x15f)][_0x387eb3(0x119)],VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x118)]=SceneManager[_0x387eb3(0x2ac)],SceneManager[_0x387eb3(0x2ac)]=function(){const _0x5e43a0=_0x387eb3;if(SceneManager[_0x5e43a0(0x2ca)](Scene_Party))return!![];return VisuMZ['PartySystem'][_0x5e43a0(0x118)][_0x5e43a0(0xc9)](this);},VisuMZ[_0x387eb3(0x191)]['SceneManager_isNextSceneBattleTransitionable']=SceneManager['isNextSceneBattleTransitionable'],SceneManager['isNextSceneBattleTransitionable']=function(){const _0x5b9d56=_0x387eb3;if(SceneManager[_0x5b9d56(0x1fa)](Scene_Party))return!![];return VisuMZ[_0x5b9d56(0x191)][_0x5b9d56(0x9b)][_0x5b9d56(0xc9)](this);},SceneManager[_0x387eb3(0x131)]=function(){const _0xc10d11=_0x387eb3;return this[_0xc10d11(0x260)]&&this[_0xc10d11(0x260)][_0xc10d11(0x25e)]===Scene_Map;},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x1eb)]=Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x205)],Scene_Battle[_0x387eb3(0x28d)]['createAllWindows']=function(){const _0x51e940=_0x387eb3;VisuMZ[_0x51e940(0x191)][_0x51e940(0x1eb)]['call'](this),this[_0x51e940(0x28b)](),this['postPartySwitchMenuTpb'](),this[_0x51e940(0x16b)]();},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x28b)]=function(){const _0x2675d9=_0x387eb3,_0x52f58a=this[_0x2675d9(0x145)]();this[_0x2675d9(0xdc)]=new Window_PartyBattleSwitch(_0x52f58a),this[_0x2675d9(0x140)](this['_partyMemberSwitchWindow']),this['_partyMemberSwitchWindow'][_0x2675d9(0x2af)]('ok',this[_0x2675d9(0x103)]['bind'](this)),this[_0x2675d9(0xdc)][_0x2675d9(0x2af)](_0x2675d9(0x108),this['onPartySwitchCancel'][_0x2675d9(0x10e)](this));},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x145)]=function(){const _0x4b1b72=_0x387eb3,_0x563f20=this[_0x4b1b72(0x2d4)]();if(_0x563f20===_0x4b1b72(0x1b0)){if(_0x4b1b72(0x27a)!==_0x4b1b72(0x210))return this[_0x4b1b72(0x176)]();else{if(!_0x14c95d)return![];return _0x542690[_0x4b1b72(0x231)]()&&_0x172325[_0x4b1b72(0x28f)]();}}else return this['partySwitchWindowRectStandard']();},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0xab)]=function(){const _0x8a183d=_0x387eb3;return VisuMZ['PartySystem'][_0x8a183d(0xe3)]['Window'][_0x8a183d(0x1ac)][_0x8a183d(0xc9)](this);},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x176)]=function(){const _0xfb826c=_0x387eb3,_0xc90fe8=this[_0xfb826c(0xe2)](),_0x2cceac=$gameSystem[_0xfb826c(0x282)]()*0x2;return _0xc90fe8['width']=0x204+_0x2cceac,_0xc90fe8;},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x1f6)]=Scene_Battle['prototype'][_0x387eb3(0x166)],Scene_Battle[_0x387eb3(0x28d)]['isAnyInputWindowActive']=function(){const _0x4b7158=_0x387eb3;if(this[_0x4b7158(0xdc)]&&this['_partyMemberSwitchWindow'][_0x4b7158(0x185)])return!![];if(this[_0x4b7158(0x29a)])return!![];if(this[_0x4b7158(0xaf)])return!![];if(this['_callSceneParty'])return!![];return VisuMZ[_0x4b7158(0x191)][_0x4b7158(0x1f6)][_0x4b7158(0xc9)](this);},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0x169)]=Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x1b3)],Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x1b3)]=function(){const _0x2c4541=_0x387eb3;VisuMZ[_0x2c4541(0x191)]['Scene_Battle_createPartyCommandWindowBattleCore'][_0x2c4541(0xc9)](this),this[_0x2c4541(0x22a)][_0x2c4541(0x2af)](_0x2c4541(0xea),this['commandFormation'][_0x2c4541(0x10e)](this));},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0xf3)]=function(){const _0x3e6022=_0x387eb3;if(this['isQueueFormationMenu']()){if(_0x3e6022(0x1fe)==='gvQob'){const _0x19c2e4=this['actor'](_0x374738);if(!_0x19c2e4)return;const _0xdb2561=_0x5b06fb[_0x3e6022(0x192)](_0x19c2e4[_0x3e6022(0x1c3)]());_0xdb2561[_0x3e6022(0x184)](this['processDrawItem']['bind'](this,_0x14bb52));}else this[_0x3e6022(0x1b2)]=!![],this[_0x3e6022(0x1c2)]['addText'](TextManager[_0x3e6022(0x24a)][_0x3e6022(0x109)](TextManager[_0x3e6022(0xea)]));}else this[_0x3e6022(0x15b)]();},Scene_Battle[_0x387eb3(0x28d)]['isQueueFormationMenu']=function(){return BattleManager['isActiveTpb']();},Scene_Battle[_0x387eb3(0x28d)]['callFormation']=function(){const _0xa8c07b=_0x387eb3;this[_0xa8c07b(0x1b2)]=![],this[_0xa8c07b(0xc5)][_0xa8c07b(0xdb)](),this['_windowLayer']['visible']=![],SceneManager['snapForBackground'](),SceneManager['push'](Scene_Party),$gameParty[_0xa8c07b(0x2b0)]();if(BattleManager[_0xa8c07b(0x29e)]()){if(_0xa8c07b(0x2b4)!==_0xa8c07b(0x2b4)){const _0x3eb6ab=this[_0xa8c07b(0x217)](this[_0xa8c07b(0x151)]());return _0x3eb6ab?_0x3eb6ab[_0xa8c07b(0x231)]():!![];}else BattleManager[_0xa8c07b(0xf1)]=BattleManager[_0xa8c07b(0x217)]();}},VisuMZ[_0x387eb3(0x191)]['Scene_Battle_updateBattleProcess']=Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x21a)],Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x21a)]=function(){const _0x2cdfbb=_0x387eb3;VisuMZ['PartySystem'][_0x2cdfbb(0x1fd)]['call'](this);if(this[_0x2cdfbb(0x1b2)]&&!BattleManager[_0x2cdfbb(0x251)]){if('qjtVr'!==_0x2cdfbb(0x2d3))this[_0x2cdfbb(0x15b)]();else{const _0x55defb=this['actor'](_0x8e3e5c);if(!_0x55defb)return this['drawRemoveCommand'](_0x51904a);const _0x3e63f1=this[_0x2cdfbb(0x2bb)](_0x2e42e7);this[_0x2cdfbb(0x2a7)](_0xcad22f);const _0x58918e=0xa8,_0x4dac15=_0x46ac88[_0x2cdfbb(0x2d1)]===0x1,_0x568a39=_0x443581['iconWidth']*(_0x4dac15?0x2:0x1),_0x5f3679=this[_0x2cdfbb(0x1ce)]()+this[_0x2cdfbb(0x215)](),_0x49bde3=_0x3e63f1[_0x2cdfbb(0x298)]-_0x58918e,_0x624d8f=_0x3e63f1['x']+_0x568a39+_0x1f2f4e[_0x2cdfbb(0x297)](_0x5f3679,_0x49bde3),_0xe3b41a=_0x4dac15?![]:!![];this['changePaintOpacity'](_0x55defb['isFormationChangeOk']()),this[_0x2cdfbb(0x1ef)](_0x55defb,_0x3e63f1['x'],_0x3e63f1['y'],_0xe3b41a),this[_0x2cdfbb(0x20d)](_0x55defb,_0x624d8f,_0x3e63f1['y'],_0x58918e),this['changePaintOpacity'](!![]);}}this[_0x2cdfbb(0xaf)]&&!BattleManager['_subject']&&this['callPartyMemberSwitch']();},VisuMZ['PartySystem'][_0x387eb3(0xb7)]=Scene_Battle['prototype'][_0x387eb3(0x1ee)],Scene_Battle['prototype'][_0x387eb3(0x1ee)]=function(){const _0x72e32b=_0x387eb3;if(BattleManager[_0x72e32b(0x218)]()){if('aesuq'!==_0x72e32b(0x199)){if(this[_0x72e32b(0xdc)]&&this[_0x72e32b(0xdc)][_0x72e32b(0x185)]){if(_0x72e32b(0x1bc)==='MIVMK')return![];else{const _0x216a29=_0x15042a[_0x72e32b(0x2a5)][_0x3cab8f];_0x216a29===_0x241137&&(_0x1c5020[_0x72e32b(0x2a5)][_0x3bd552]=this);}}}else{if(_0x531b80['inBattle']())return;_0x25f0f5['ConvertParams'](_0x259ae8,_0x86fa39);const _0x874074=_0x2072ae['Value'];_0x4e73f3[_0x72e32b(0x153)](_0x874074);}}return VisuMZ[_0x72e32b(0x191)]['Scene_Battle_isTimeActive'][_0x72e32b(0xc9)](this);},VisuMZ[_0x387eb3(0x191)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x258)],Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x258)]=function(){const _0x2667d2=_0x387eb3;VisuMZ[_0x2667d2(0x191)][_0x2667d2(0x25f)]['call'](this),this[_0x2667d2(0x1a4)][_0x2667d2(0x2af)](_0x2667d2(0xea),this[_0x2667d2(0x1b4)][_0x2667d2(0x10e)](this));},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x1b4)]=function(){const _0x3b7d79=_0x387eb3;if(this[_0x3b7d79(0x20e)]()){if(_0x3b7d79(0x17c)==='GfZMz')this[_0x3b7d79(0xaf)]=!![],this['_logWindow'][_0x3b7d79(0xd1)](TextManager[_0x3b7d79(0x24a)][_0x3b7d79(0x109)](TextManager[_0x3b7d79(0xea)]));else return _0x30bafc[_0x3b7d79(0xae)]&&_0x332d60[_0x3b7d79(0x1e0)][_0x3b7d79(0xda)]('['+_0x31aca9+']');}else this[_0x3b7d79(0x24e)]();},Scene_Battle[_0x387eb3(0x28d)]['callPartyMemberSwitch']=function(){const _0x465bb1=_0x387eb3;this[_0x465bb1(0xaf)]=![],this['_logWindow'][_0x465bb1(0x220)](),BattleManager['actor']()&&this[_0x465bb1(0xdc)]['activate']();},Scene_Battle['prototype'][_0x387eb3(0x103)]=function(){const _0x4d587a=_0x387eb3,_0x19f60c=this[_0x4d587a(0xdc)][_0x4d587a(0x211)]();_0x19f60c?this[_0x4d587a(0x172)](_0x19f60c):(this[_0x4d587a(0xdc)]['deactivate'](),this[_0x4d587a(0x1a4)][_0x4d587a(0x221)]());},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x172)]=function(_0x21d1fd){const _0x1ed1d0=_0x387eb3,_0x149a56=BattleManager[_0x1ed1d0(0x217)](),_0x5305cb=_0x149a56['battler']();this['_partyMemberSwitchWindow'][_0x1ed1d0(0x150)](),this[_0x1ed1d0(0x13f)]()&&_0x5305cb?(this[_0x1ed1d0(0x29a)]=!![],_0x5305cb['startSwitchOutAnimation'](_0x21d1fd)):this['processPartySwitchMember'](_0x21d1fd);},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x13f)]=function(){const _0x3d3b30=_0x387eb3;return VisuMZ[_0x3d3b30(0x191)][_0x3d3b30(0xe3)][_0x3d3b30(0xf9)]['SwitchOutAnimation'];},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x17d)]=function(_0x1adc51){const _0x174329=_0x387eb3;this[_0x174329(0x29a)]=![];const _0x1cd8ba=BattleManager['actor'](),_0x1ec555=_0x1cd8ba[_0x174329(0x12c)](),_0x5e1015=$gameParty[_0x174329(0xcd)]['indexOf'](_0x1cd8ba[_0x174329(0x1fb)]());$gameParty[_0x174329(0xcd)][_0x5e1015]=_0x1adc51[_0x174329(0x1fb)](),$gameParty[_0x174329(0x17e)]();if(this['isImmediateTpb']()){if(_0x174329(0x13c)!==_0x174329(0x13c))return _0x460188['PartySystem'][_0x174329(0xe3)][_0x174329(0x201)]['StatusWindowRect'][_0x174329(0xc9)](this);else _0x1adc51[_0x174329(0x232)]=_0x1cd8ba[_0x174329(0x232)],_0x1adc51[_0x174329(0xc0)]='charged';}else BattleManager['isTpb']()&&_0x1adc51[_0x174329(0x2d8)]();BattleManager[_0x174329(0x25a)]=_0x1adc51,BattleManager[_0x174329(0x228)](_0x1cd8ba,_0x1adc51),_0x1adc51[_0x174329(0x2b0)](),_0x1adc51[_0x174329(0x195)](),_0x1adc51[_0x174329(0x1ff)](_0x1cd8ba),_0x1ec555&&(_0x174329(0xd9)===_0x174329(0xd9)?_0x1ec555[_0x174329(0x11e)](_0x1adc51):(_0x4772c7[_0x174329(0x25a)]=_0x4e378a[_0x174329(0x111)](),_0x1ebc27[_0x174329(0x251)]=_0x2cbfb3[_0x174329(0x217)](),_0x65b654['_inputting']=!![],this[_0x174329(0x1a4)][_0x174329(0x13e)](_0x8e25e6[_0x174329(0x217)]()),this[_0x174329(0x179)][_0x174329(0x281)](_0x53078a[_0x174329(0x217)]()))),this[_0x174329(0x179)][_0x174329(0xbb)](_0x1cd8ba,_0x1adc51),this[_0x174329(0x179)]['refresh'](),this['_actorCommandWindow'][_0x174329(0x13e)](_0x1adc51),this[_0x174329(0x1a4)][_0x174329(0x265)](0x0),this[_0x174329(0x1a4)][_0x174329(0x221)](),this[_0x174329(0x1a4)][_0x174329(0xef)]=!![];},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x146)]=function(){const _0x2b27db=_0x387eb3;if(!BattleManager[_0x2b27db(0x29e)]())return![];const _0xd7091e=VisuMZ[_0x2b27db(0x191)][_0x2b27db(0xe3)][_0x2b27db(0xf9)];return _0xd7091e[_0x2b27db(0x2b6)]===undefined&&(_0xd7091e[_0x2b27db(0x2b6)]=!![]),_0xd7091e[_0x2b27db(0x2b6)];},Window_StatusBase['prototype'][_0x387eb3(0xbb)]=function(_0x4f8721,_0xfb8cf0){const _0x6a73a5=_0x387eb3,_0x5b76b8=_0x6a73a5(0x2c4)[_0x6a73a5(0x109)](_0x4f8721[_0x6a73a5(0x1fb)]()),_0x862fad=this[_0x6a73a5(0x19a)](_0x5b76b8,Sprite_StateIcon);_0x862fad[_0x6a73a5(0x13e)](_0xfb8cf0);},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x294)]=function(){const _0x10e931=_0x387eb3;this[_0x10e931(0xdc)][_0x10e931(0x150)](),this[_0x10e931(0x1a4)][_0x10e931(0x221)](),this[_0x10e931(0x1a4)][_0x10e931(0xa7)]();},Scene_Battle[_0x387eb3(0x28d)][_0x387eb3(0x1e2)]=function(){const _0xf4ca5=_0x387eb3;if(!BattleManager[_0xf4ca5(0x29e)]())return;if(!SceneManager[_0xf4ca5(0x2ca)](Scene_Party))return;this['_partyCommandWindow']['deactivate'](),this[_0xf4ca5(0x22a)][_0xf4ca5(0x106)](),this['_actorCommandWindow'][_0xf4ca5(0x150)](),this[_0xf4ca5(0x1a4)][_0xf4ca5(0x106)](),BattleManager[_0xf4ca5(0x25a)]=null,BattleManager[_0xf4ca5(0x2bc)]=![];},Scene_Battle[_0x387eb3(0x28d)]['postPartySwitchMenuTurnBased']=function(){const _0xbbba6c=_0x387eb3;if(BattleManager[_0xbbba6c(0x29e)]())return;if(!SceneManager['isPreviousScene'](Scene_Party))return;Imported[_0xbbba6c(0x1e7)]&&BattleManager[_0xbbba6c(0x168)]()&&BattleManager['makeActionOrders']();if(Imported[_0xbbba6c(0x187)]&&BattleManager[_0xbbba6c(0x299)]()){if(_0xbbba6c(0x170)!==_0xbbba6c(0x152))BattleManager[_0xbbba6c(0x25a)]=$gameParty[_0xbbba6c(0x111)](),BattleManager[_0xbbba6c(0x251)]=BattleManager[_0xbbba6c(0x217)](),BattleManager[_0xbbba6c(0x2bc)]=!![],this[_0xbbba6c(0x1a4)]['setup'](BattleManager[_0xbbba6c(0x217)]()),this[_0xbbba6c(0x179)][_0xbbba6c(0x281)](BattleManager[_0xbbba6c(0x217)]());else{const _0xa77050=this[_0xbbba6c(0x27c)]['indexOf'](_0xf86824);this[_0xbbba6c(0x27c)][_0xa77050]=_0x2573b1;}}if(Imported['VisuMZ_2_BattleSystemETB']&&BattleManager[_0xbbba6c(0x226)]()){if(_0xbbba6c(0x157)===_0xbbba6c(0x157))BattleManager['_currentActor']=$gameParty[_0xbbba6c(0x111)](),BattleManager[_0xbbba6c(0x251)]=BattleManager['actor'](),BattleManager[_0xbbba6c(0x2bc)]=!![],this[_0xbbba6c(0x1a4)]['setup'](BattleManager['actor']()),this['_statusWindow'][_0xbbba6c(0x281)](BattleManager[_0xbbba6c(0x217)]());else{if(this[_0xbbba6c(0x22c)]===_0x2720ba)this[_0xbbba6c(0x27b)]();return this[_0xbbba6c(0x22c)]<=0x0;}}Imported[_0xbbba6c(0x1d1)]&&BattleManager[_0xbbba6c(0x26c)]()&&(_0xbbba6c(0x1e1)!==_0xbbba6c(0x1e1)?this['_battleMembers']['pop']():(BattleManager['_currentActor']=$gameParty[_0xbbba6c(0x111)](),BattleManager[_0xbbba6c(0x251)]=BattleManager[_0xbbba6c(0x217)](),BattleManager[_0xbbba6c(0x2bc)]=!![],this[_0xbbba6c(0x1a4)][_0xbbba6c(0x13e)](BattleManager[_0xbbba6c(0x217)]()),this[_0xbbba6c(0x179)][_0xbbba6c(0x281)](BattleManager[_0xbbba6c(0x217)]())));},Game_Party[_0x387eb3(0x28d)][_0x387eb3(0x111)]=function(){const _0x329523=_0x387eb3;let _0x4b6d71=this[_0x329523(0x2c3)]();return _0x4b6d71[0x0];},Sprite_Actor['_partySwitchDuration']=0xc,Sprite_Actor[_0x387eb3(0x28d)][_0x387eb3(0x1f8)]=function(_0x56c009){const _0x17c6af=_0x387eb3;this['_partySwitchTargetActor']=_0x56c009;const _0x4bddcf=Sprite_Actor[_0x17c6af(0x1c7)];this['startMove'](0x12c,0x0,_0x4bddcf),this[_0x17c6af(0x183)](0x0,_0x4bddcf),this[_0x17c6af(0x1c7)]=_0x4bddcf;},Sprite_Actor[_0x387eb3(0x28d)][_0x387eb3(0x18a)]=function(_0x4a6a6b){const _0xbc0796=_0x387eb3;if(SceneManager[_0xbc0796(0xfa)]()){if(_0xbc0796(0xd0)===_0xbc0796(0xec))this[_0xbc0796(0xdc)][_0xbc0796(0x150)](),this[_0xbc0796(0x1a4)][_0xbc0796(0x221)](),this[_0xbc0796(0x1a4)][_0xbc0796(0xa7)]();else{SceneManager[_0xbc0796(0x260)][_0xbc0796(0x17d)](_0x4a6a6b);const _0x454596=Sprite_Actor[_0xbc0796(0x1c7)];this['stepForward'](),this['startOpacity'](0xff,_0x454596);}}this[_0xbc0796(0x223)]=null;},VisuMZ['PartySystem'][_0x387eb3(0x29b)]=Sprite_Actor[_0x387eb3(0x28d)][_0x387eb3(0xdb)],Sprite_Actor[_0x387eb3(0x28d)][_0x387eb3(0xdb)]=function(){const _0x56f0a7=_0x387eb3;VisuMZ[_0x56f0a7(0x191)][_0x56f0a7(0x29b)]['call'](this);if(this[_0x56f0a7(0x1c7)])this[_0x56f0a7(0xa1)]();},Sprite_Actor[_0x387eb3(0x28d)]['updatePartySwitch']=function(){const _0x1c138d=_0x387eb3;this[_0x1c138d(0x1c7)]=this[_0x1c138d(0x1c7)]||0x0,this[_0x1c138d(0x1c7)]--;if(this['_partySwitchDuration']<=0x0){if(_0x1c138d(0x2ce)===_0x1c138d(0x159))return;else this[_0x1c138d(0x18a)](this['_partySwitchTargetActor']);}},Window_PartyCommand[_0x387eb3(0x28d)][_0x387eb3(0x1d9)]=function(){this['addFormationCommand']();},Window_PartyCommand[_0x387eb3(0x28d)][_0x387eb3(0x203)]=function(){const _0x565f81=_0x387eb3;if(!this[_0x565f81(0x254)]())return;if(this[_0x565f81(0x255)]()){$gameTemp[_0x565f81(0xaa)]()&&!BattleManager[_0x565f81(0xfe)]&&(_0x565f81(0x2bd)!=='GZyPU'?_0x57d449[_0x565f81(0xf1)]=_0x5ca2fb['actor']():(console[_0x565f81(0x115)]('WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System'),BattleManager[_0x565f81(0xfe)]=!![]));return;}const _0x40c761=this['commandStyle'](),_0x511fb2=ImageManager[_0x565f81(0x292)],_0x3a1ee3=_0x40c761===_0x565f81(0x1d3)?TextManager[_0x565f81(0x144)]:_0x565f81(0x293)[_0x565f81(0x109)](_0x511fb2,TextManager[_0x565f81(0x144)]),_0x18d7cc=this[_0x565f81(0x16a)]();this[_0x565f81(0x1a3)](_0x3a1ee3,'formation',_0x18d7cc);},Window_PartyCommand[_0x387eb3(0x28d)][_0x387eb3(0x254)]=function(){const _0x11b74e=_0x387eb3;if(Imported[_0x11b74e(0x1b6)]&&BattleManager[_0x11b74e(0xc6)]())return![];if(Imported[_0x11b74e(0x165)]&&BattleManager[_0x11b74e(0x252)]())return![];if(Imported[_0x11b74e(0x16d)]&&BattleManager[_0x11b74e(0x2c1)]())return![];return VisuMZ['PartySystem'][_0x11b74e(0xe3)][_0x11b74e(0xf9)][_0x11b74e(0xce)];},Window_PartyCommand['prototype']['hasBattleSystemIncompatibilities']=function(){return![];},Window_PartyCommand[_0x387eb3(0x28d)][_0x387eb3(0x16a)]=function(){const _0x310bd1=_0x387eb3;if($gameParty[_0x310bd1(0x20c)]()[_0x310bd1(0x22f)]<=0x1)return![];if(!$gameParty[_0x310bd1(0x2cc)]())return![];return $gameSystem['isFormationEnabled']();},VisuMZ[_0x387eb3(0x191)][_0x387eb3(0xe3)][_0x387eb3(0x2c8)]=Window_PartyCommand[_0x387eb3(0x28d)][_0x387eb3(0x1f4)],Window_PartyCommand[_0x387eb3(0x28d)][_0x387eb3(0x1f4)]=function(){const _0x15d2a5=_0x387eb3,_0x1db8c7=this['currentSymbol']();switch(_0x1db8c7){case'formation':this[_0x15d2a5(0x1a5)][_0x15d2a5(0x2d5)](TextManager[_0x15d2a5(0x10c)]);break;default:VisuMZ[_0x15d2a5(0x191)]['Settings'][_0x15d2a5(0x2c8)][_0x15d2a5(0xc9)](this);break;}},Window_ActorCommand[_0x387eb3(0x28d)]['addPartyCommand']=function(){const _0x5de4c3=_0x387eb3;if(!this[_0x5de4c3(0x136)]())return;if(this[_0x5de4c3(0x12f)](_0x5de4c3(0xea))>=0x0){if(_0x5de4c3(0x271)===_0x5de4c3(0x219)){const _0x2665c1=_0x1b40d9(_0x1a6106['$1']);_0x2665c1<_0x484922?(_0x5efc26(_0x5de4c3(0x126)[_0x5de4c3(0x109)](_0x5e4748,_0x2665c1,_0x4f1197)),_0xdcaa72[_0x5de4c3(0x285)]()):_0x4f8032=_0x48273c[_0x5de4c3(0xfb)](_0x2665c1,_0x24f7ac);}else this[_0x5de4c3(0xdd)]();}const _0x3ee3b=this[_0x5de4c3(0x2d6)](),_0x8429cb=ImageManager[_0x5de4c3(0x292)],_0x5d0685=_0x3ee3b===_0x5de4c3(0x1d3)?TextManager[_0x5de4c3(0xa6)]:_0x5de4c3(0x293)[_0x5de4c3(0x109)](_0x8429cb,TextManager[_0x5de4c3(0x144)]),_0x435937=this['isPartyCommandEnabled']();this[_0x5de4c3(0x1a3)](_0x5d0685,_0x5de4c3(0xea),_0x435937);},Window_ActorCommand[_0x387eb3(0x28d)][_0x387eb3(0x136)]=function(){const _0x583988=_0x387eb3;if(!this['_actor'])return![];return VisuMZ[_0x583988(0x191)][_0x583988(0xe3)][_0x583988(0xf9)][_0x583988(0x1c4)];},Window_ActorCommand[_0x387eb3(0x28d)][_0x387eb3(0x167)]=function(){const _0x1bdd0f=_0x387eb3;if($gameParty[_0x1bdd0f(0x20c)]()['length']<=0x1)return![];if(!this[_0x1bdd0f(0x237)])return![];if(!this['_actor'][_0x1bdd0f(0x2cc)]())return![];return this[_0x1bdd0f(0x237)]['isFormationChangeOk']();},VisuMZ[_0x387eb3(0x191)]['Settings'][_0x387eb3(0x1d4)]=Window_ActorCommand[_0x387eb3(0x28d)][_0x387eb3(0x1f4)],Window_ActorCommand['prototype'][_0x387eb3(0x1f4)]=function(){const _0xf9c6ef=_0x387eb3,_0x4c4dbb=this[_0xf9c6ef(0xdf)]();if(!_0x4c4dbb)return;switch(_0x4c4dbb[_0xf9c6ef(0x133)]()){case _0xf9c6ef(0xea):this[_0xf9c6ef(0x1a5)][_0xf9c6ef(0x2d5)](TextManager[_0xf9c6ef(0x26b)]);break;default:VisuMZ[_0xf9c6ef(0x191)][_0xf9c6ef(0xe3)][_0xf9c6ef(0x1d4)]['call'](this);break;}},Window_ActorCommand['prototype'][_0x387eb3(0xdd)]=function(){const _0x546514=_0x387eb3;while(this[_0x546514(0x12f)](_0x546514(0xea))>=0x0){const _0x271f7b=this[_0x546514(0x12f)](_0x546514(0xea));this[_0x546514(0x268)][_0x546514(0x273)](_0x271f7b,0x1);}});;