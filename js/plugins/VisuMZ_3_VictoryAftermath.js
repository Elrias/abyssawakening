//=============================================================================
// VisuStella MZ - Victory Aftermath
// VisuMZ_3_VictoryAftermath.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VictoryAftermath = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VictoryAftermath = VisuMZ.VictoryAftermath || {};
VisuMZ.VictoryAftermath.version = 1.23;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.23] [VictoryAftermath]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Victory_Aftermath_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Victory Aftermath plugin consolidates the rewards granted upon finishing
 * a battle successfully into one screen (or more if there are level ups).
 * This helps reduce the amount of button presses needed to display similar
 * information by default. The level up screens will also display parameter
 * changes and new skills acquired in addition to victory quotes.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consolidates EXP, Gold, and Items acquired through battle rewards into one
 *   battle screen.
 * * EXP gauges for currently active battle party will be displayed on the same
 *   screen to indicate progress.
 * * Upon leveling up, individual screens can be shown (optionally) to display
 *   parameter changes, new skills acquired, and level up quotes.
 * * Plugin Commands can be used to clear/add new quotes at any time.
 * * Plugin Commands can be used by bypass certain parts of the Victory
 *   Aftermath segments or the entire thing completely.
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
 * - VisuMZ_1_BattleCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
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
 * VisuMZ_0_CoreEngine
 *
 * - The EXP gauge colors will match the color settings found in the Core
 * Engine's Plugin Parameters instead of defaulting to specific colors.
 *
 * - The continue message will display any changed input keys designated by
 * the Core Engine's Plugin Parameters.
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 *
 * - Upon leveling up, the Menu Image will show up (optional) as a bust during
 * the quote segment.
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
 * <Level Up Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </Level Up Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up.
 * - The <New Quote> tag is used between the <Level Up Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up.
 * - If this notetag is not found inside an actor's notebox, a random level up
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   Level Up Quotes plugin parameter.
 *
 * ---
 *
 * <New Skill Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </New Skill Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up
 *   in addition to learning a new skill upon leveling up.
 * - The <New Quote> tag is used between the <New Skill Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up and learning a new skill.
 * - If this notetag is not found inside an actor's notebox, a random new skill
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   New Skill Quotes plugin parameter.
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
 * Actor: Add Level Up Quotes
 * - Add new entries target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's level up quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Add New Skill Quotes
 * - Add new entries target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's new skill quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Clear Level Up Quotes
 * - Clear target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 *
 * Actor: Clear New Skill Quotes
 * - Clear target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 * 
 * === Post-Battle Plugin Commands ===
 * 
 * ---
 * 
 * Post-Battle: Set Post-Battle BGM
 * - This determines what BGM to play after battle.
 * - Use only in battle!
 * - For clarification, this affects the BGM that is played upon returning to
 *   the map scene.
 * 
 *   Filename:
 *   - Filename of the BGM played.
 * 
 *   Volume:
 *   - Volume of the BGM played.
 * 
 *   Pitch:
 *   - Pitch of the BGM played.
 * 
 *   Pan:
 *   - Pan of the BGM played.
 * 
 * ---
 * 
 * Post-Battle: Set Post-Battle BGS
 * - This determines what BGS to play after battle.
 * - Use only in battle!
 * - For clarification, this affects the BGS that is played upon returning to
 *   the map scene.
 * 
 *   Filename:
 *   - Filename of the BGS played.
 * 
 *   Volume:
 *   - Volume of the BGS played.
 * 
 *   Pitch:
 *   - Pitch of the BGS played.
 * 
 *   Pan:
 *   - Pan of the BGS played.
 * 
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Bypass Victory Motion
 * - Bypass actors performing their victory motion?
 *
 *   Bypass?:
 *   - Bypass actors performing their victory motion?
 *
 * ---
 *
 * System: Bypass Victory Music
 * - Bypass playing the victory music?
 *
 *   Bypass?:
 *   - Bypass playing the victory music?
 *
 * ---
 *
 * System: Bypass Victory Phase
 * - Bypass the entire victory phase and all aspects about it?
 *
 *   Bypass?:
 *   - Bypass the entire victory phase and all aspects about it?
 *
 * ---
 * 
 * System: Change Victory BGM
 * - Changes victory BGM.
 * 
 *   Filename:
 *   - Filename of the BGM to change to.
 * 
 *   Volume:
 *   - Volume of the BGM to change to.
 * 
 *   Pitch:
 *   - Pitch of the BGM to change to.
 * 
 *   Pan:
 *   - Pan of the BGM to change to.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings Plugin Parameters control the overall settings found
 * within the main aspects of the Victory Aftermath sequence.
 *
 * ---
 *
 * General Settings
 * 
 *   Fade In Speed:
 *   - Fade in speed for the victory window.
 * 
 *   Hide Delay (MS):
 *   - Delay in milliseconds before hiding the UI Windows.
 * 
 *   Show Delay (MS):
 *   - Delay in milliseconds before showing the Victory Windows.
 * 
 *   Update Duration:
 *   - Duration in frames on updating actor EXP gauges.
 * 
 *   Auto Skip Auto Battle?:
 *   - Skip the Victory Aftermath sequence if the player has decided to use
 *     the party Auto Battle command?
 * 
 *   Mirror Contents?:
 *   - Mirror the positions of EXP, Gold, and Items?
 * 
 *   Show EXP Gauges?:
 *   - Show the EXP Gauges of the main party members for the first screen of
 *     the Victory Aftermath?
 *   - This is added for those with large parties and cannot fit everything
 *     into one screen for all party members and would prefer not showing any
 *     EXP Gauges at all instead.
 * 
 *   Drops Sorted By:
 *   - How are drops sorted by in the Victory Aftermath?
 *     - ID
 *     - Name
 *
 * ---
 * 
 * Color Settings
 * 
 *   Background Color 1:
 *   Background Color 2:
 *   Reward Strip 1:
 *   Reward Strip 2:
 *   Actor Strip:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 * 
 * ---
 * 
 * Collapse Effect
 * 
 *   Normal Collapse Wait?:
 *   - Wait for the normal collapse effect to finish?
 * 
 *   Boss Collapse Wait?:
 *   - Wait for the boss collapse effect to finish?
 * 
 * ---
 * 
 * Victory Music
 * 
 *   Victory BGM:
 *   - Background music to play during the victory sequence.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reward Strips Settings
 * ============================================================================
 *
 * Reward strip settings that appear in the first screen of the Victory
 * Aftermath. These are used to let you have control over what rewards are
 * displayed at the end of each battle and can be used to display custom data
 * from other plugins as well.
 *
 * ---
 *
 * Reward Strip
 * 
 *   Label:
 *   - This one doesn't have any use other than being a label to  quickly
 *     determine what this one is for.
 * 
 *   JS: Show:
 *   - Code used to determine if the reward strip is shown.
 * 
 *   JS: Text:
 *   - Code used to determine if the text displayed as the category.
 * 
 *   JS: Data:
 *   - Code used to determine what data should be displayed in the
 *     reward strip.
 *
 * ---
 * 
 * The default parameters for this will be updated from time to time as more
 * VisuStella MZ plugins are released to add in extra displayed resources that
 * the party can gain from battle.
 *
 * ============================================================================
 * Plugin Parameters: Level Up Settings
 * ============================================================================
 *
 * When actors level up, extra screens will be displayed in the Victory
 * Aftermath sequence. Alter these settings to best fit your game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable the Level Up portion of the Victory Aftermath phase?
 * 
 *   Show Face?:
 *   - Show the actor's face?
 * 
 *   Show Param Change?:
 *   - Show an extra column for parameter value differences?
 * 
 *     Hide Level?:
 *     - Hide the level change in the parameter value differences?
 * 
 *   Shown Max Skills:
 *   - The maximum amount of skills that are displayed.
 *   - This is due to limited screen space.
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
 * Quotes
 * 
 *   Level Up Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <Level Up Quote> notetags.
 *   - %1 - Actor Name
 * 
 *   New Skill Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <New Skill Quote> notetags.
 *   - %1 - Actor Name
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 * - The following Plugin Parameters require VisuMZ_1_MainMenuCore.
 * 
 *   Show Bust?:
 *   - Show the actor's menu image as a bust?
 * 
 *   Bust Position X:
 *   - Positon to center the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Position Y:
 *   - Positon to anchor the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Scale:
 *   - The amount to scale the actor's menu image bust.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * There's certain diction used in the Victory Aftermath plugin that's not set
 * anywhere else in the game. Change the settings to make it fit your game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Continue Format:
 *   - Text format for continue message.
 *   - %1 - OK key, %2 - Cancel key
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Level Format:
 *   - Text format for actor level.
 *   - %1 - Level
 * 
 *   Level Up:
 *   - Text format for reaching a level up.
 * 
 *   Sound Effect:
 *   - Sound effect played when a level up occurs.
 * 
 *     Volume:
 *     - Volume of the sound effect played.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played.
 * 
 *     Pan:
 *     - Pan of the sound effect played.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors
 *     from the Window Skin.
 * 
 *   New Skill Format:
 *   - Text format describing that a new skill has been learned.
 *   - %1 - Actor Name
 * 
 *   Reward Items:
 *   - Text displayed for items rewarded.
 * 
 *   Victory Title:
 *   - Text displayed at the top of the victory screen.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.23: April 17, 2025
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Command added by Olivia:
 * *** System: Change Victory BGM
 * **** Changes victory BGM.
 * 
 * Version 1.22: July 18, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Parameters > General Settings > Color Settings > Background Color 1
 * *** Parameters > General Settings > Color Settings > Background Color 2
 * *** Parameters > General Settings > Color Settings > Reward Strip 1
 * *** Parameters > General Settings > Color Settings > Reward Strip 1
 * *** Parameters > General Settings > Color Settings > Actor Strip
 * **** Colors with a bit of alpha settings.
 * 
 * Version 1.21: June 13, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia:
 * *** Parameters > General > Drops Sorted By:
 * **** Set your drops to be sorted by ID or name.
 * 
 * Version 1.20: May 16, 2024
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Olivia:
 * *** Post-Battle: Set Post-Battle BGM
 * *** Post-Battle: Set Post-Battle BGS
 * **** This determines what BGM/BGM to play after battle.
 * **** Use only in battle!
 * **** Used to make bgm/bgs changes seamless.
 * 
 * Version 1.19: December 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** The default Plugin Parameter for "Reward Strips" have been updated to
 *    contain compatibility for a future plugin.
 * 
 * Version 1.18: May 18, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.17: December 15, 2022
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.16: January 6, 2022
 * * Bug Fixes!
 * ** Fixed incorrect level change display text. Fix made by Olivia.
 * 
 * Version 1.15: December 16, 2021
 * * Compatibility Update!
 * ** RPG Maker MZ 1.4.0 compatibility update!
 * *** Battle Core's post-battle common events should now load properly. This
 *     incompatibility is due to RPG Maker MZ 1.4.0's core scripts added in
 *     a common event queue clear. Update made by Olivia.
 * 
 * Version 1.14: December 9, 2021
 * * Feature Update!
 * ** Victory Aftermath gauges now automatically round to the nearest pixel
 *    rather than be on half pixels with specific resolutions. Update by Irina.
 * 
 * Version 1.13: September 23, 2021
 * * Bug Fixes!
 * ** Values for parameter differences should no longer be hidden or the same
 *    as the previous values. Fix made by Irina.
 * 
 * Version 1.12: August 27, 2021
 * * Bug Fixes!
 * ** X-Parameters and S-Parameters shown in the level up stat changes should
 *    now display the percentage signs properly. Fix made by Olivia.
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General > Show EXP Gauges?
 * **** Show the EXP Gauges of the main party members for the first screen of
 *      the Victory Aftermath?
 * **** This is added for those with large parties and cannot fit everything
 *      into one screen for all party members and would prefer not showing any
 *      EXP Gauges at all instead.
 * 
 * Version 1.09: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Vocab > Level Up > Volume
 * *** Plugin Parameters > Vocab > Level Up > Pitch
 * *** Plugin Parameters > Vocab > Level Up > Pan
 * **** For the people who want more control over the level up sound effect.
 * 
 * Version 1.08: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Feature Updates!
 * ** The default Plugin Parameter for "Reward Strips" have been updated to
 *    contain compatibility for a future plugin.
 * 
 * Version 1.07: December 4, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Parameter added by Olivia:
 * ** Plugin Parameters > Level Up Settings > Hide Level?
 * *** Hide the level change in the parameter value differences when comparing
 *     the stat changes from the previous level to the next.
 * 
 * Version 1.06: November 29, 2020
 * * Bug Fixed!
 * ** The default reward strips Plugin Parameters data is now updated for the
 *    SP display costs to show the Skill Points data instead of Ability Points
 *    data. Fix made by Arisu.
 * 
 * Version 1.05: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Arisu.
 * *** Plugin Parameters > Reward Strips
 * **** Reward strip settings that appear in the first screen of the Victory
 *      Aftermath. These are used to let you have control over what rewards are
 *      displayed at the end of each battle and can be used to display custom
 *      data from other plugins as well.
 * 
 * Version 1.04: October 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > General > Mirror Contents?
 * **** Mirror the positions of EXP, Gold, and Items?
 * 
 * Version 1.03: October 18, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** BGM pitch plugin parameter is now uncapped.
 * * New Features!
 * ** New plugin parameters added by Yanfly.
 * *** Plugin Parameters > General > Collapse Effect > Normal Collapse Wait?
 * *** Plugin Parameters > General > Collapse Effect > Boss Collapse Wait?
 * **** These settings enable you to decide if you want the Victory Aftermath
 *      to wait until collapse effects are finished before continuing.
 * *** Plugin Parameters > General > Music > Volume
 * *** Plugin Parameters > General > Music > Pitch
 * *** Plugin Parameters > General > Music > Pan
 * **** Adjusts the volume, pitch, and pan of the victory music.
 * 
 * Version 1.02: September 13, 2020
 * * Feature Update!
 * ** Victory Aftermath windows now wait until all boss collapse effects are
 *    done before showing. Update added by Olivia.
 * * New Features!
 * ** New Plugin Parameter under General Settings: Auto Skip Auto Battle?
 * *** Skip the Victory Aftermath sequence if the player has decided to use the
 *     party Auto Battle command?
 * *** Feature added by Olivia
 * 
 * Version 1.01: September 6, 2020
 * * New Features!
 * ** New Plugin Parameters added in Level Up Settings for disabling
 *    the back rectangles and/or changing their colors.
 *
 * Version 1.00: August 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Begin
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpAdd
 * @text Actor: Add Level Up Quotes
 * @desc Add new entries target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's level up quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillAdd
 * @text Actor: Add New Skill Quotes
 * @desc Add new entries target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's new skill quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpClear
 * @text Actor: Clear Level Up Quotes
 * @desc Clear target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillClear
 * @text Actor: Clear New Skill Quotes
 * @desc Clear target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_PostBattle
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PostBattleBgm
 * @text Post-Battle: Set Post-Battle BGM
 * @desc This determines what BGM to play after battle.
 * Use only in battle! Affects map BGM, not victory BGM.
 *
 * @arg name:str
 * @text Filename
 * @type file
 * @dir audio/bgm/
 * @require 1
 * @desc Filename of the BGM played.
 * @default >>>ATTENTION<<<
 *
 * @arg volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the BGM played.
 * @default 90
 *
 * @arg pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the BGM played.
 * @default 100
 *
 * @arg pan:num
 * @text Pan
 * @desc Pan of the BGM played.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PostBattleBgs
 * @text Post-Battle: Set Post-Battle BGS
 * @desc This determines what BGS to play after battle.
 * Use only in battle! Affects map BGS, not victory BGS.
 *
 * @arg name:str
 * @text Filename
 * @type file
 * @dir audio/bgs/
 * @require 1
 * @desc Filename of the BGS played.
 * @default >>>ATTENTION<<<
 *
 * @arg volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the BGS played.
 * @default 90
 *
 * @arg pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the BGS played.
 * @default 100
 *
 * @arg pan:num
 * @text Pan
 * @desc Pan of the BGS played.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_System
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMotion
 * @text System: Bypass Victory Motion
 * @desc Bypass actors performing their victory motion?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass actors performing their victory motion?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMusic
 * @text System: Bypass Victory Music
 * @desc Bypass playing the victory music?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass playing the victory music?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryPhase
 * @text System: Bypass Victory Phase
 * @desc Bypass the entire victory phase and all aspects about it?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass the entire victory phase and all aspects about it?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemChangeVictoryBgm
 * @text System: Change Victory BGM
 * @desc Changes victory BGM.
 *
 * @arg name:str
 * @text Filename
 * @type file
 * @dir audio/bgm/
 * @require 1
 * @desc Filename of the BGM to change to.
 * @default >>>ATTENTION<<<
 *
 * @arg volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the BGM to change to.
 * @default 90
 *
 * @arg pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the BGM to change to.
 * @default 100
 *
 * @arg pan:num
 * @text Pan
 * @desc Pan of the BGM to change to.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_End
 * @text -
 * @desc -
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
 * @param VictoryAftermath
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
 * @desc General settings pertaining to the Victory Aftermath phase.
 * @default {"General":"","FadeInSpeed:num":"8","HideDelayMS:num":"1500","ShowDelayMS:num":"2000","UpdateDuration:num":"180","AutoBattleAutoSkip:eval":"true","MirrorContents:eval":"false","Collapse":"","WaitRegularCollapse:eval":"true","WaitBossCollapse:eval":"true","Music":"","Bgm:str":"Ship3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Rewards:arraystruct
 * @text Reward Strips
 * @parent General:struct
 * @type struct<Rewards>[]
 * @desc Reward strip settings that appear in the first screen of the Victory Aftermath.
 * @default ["{\"Label\":\"EXP\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.exp;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.exp;\\\"\"}","{\"Label\":\"Gold\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.currencyUnit;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.gold;\\\"\"}","{\"Label\":\"AP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.AbilityPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.abilityPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.abilityPoints;\\\"\"}","{\"Label\":\"CP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.ClassPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.classPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.classPoints;\\\"\"}","{\"Label\":\"JP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.JobPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.jobPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.jobPoints;\\\"\"}","{\"Label\":\"SP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.SkillPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.skillPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.skillPoints;\\\"\"}","{\"Label\":\"Medal EXP (Equip Medal System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_EquipMedalSys &&\\\\n    VisuMZ.EquipMedalSys.Settings.General.ShowVictory &&\\\\n    BattleManager._rewards.equipMedalExp > 0;\\\"\",\"Text:func\":\"\\\"return TextManager.equipMedalExp;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.equipMedalExp;\\\"\"}"]
 *
 * @param LevelUp:struct
 * @text Level Up Settings
 * @type struct<LevelUp>
 * @desc Settings pertaining to the Level Up portion of the Victory Aftermath phase.
 * @default {"General":"","Enable:eval":"true","ShowFace:eval":"false","ShowParamDiff:eval":"true","HideLevelDiff:eval":"false","MaxSkills:num":"8","DelayBuffer:num":"200","DrawBackRect:eval":"true","BackRectColor:str":"19","Quotes":"","LevelUpQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Alright! A level up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Yes! I've leveled up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Oh? I've leveled up!?\\\\n This is awesome!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've become stronger!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I feel like I'm getting used to battle.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"The power! I can feel it!\\\\\\\"\\\"\"]","NewSkillQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've acquired a new skill!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This new skill should come in handy.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"It seems I've learned something new!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I've acquired a new power!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This should be useful for future battles.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I wonder what this new skill is like?\\\\\\\"\\\"\"]","MainMenuCore":"","ShowBust:eval":"true","BustPosX:str":"Graphics.width * 0.25","BustPosY:str":"Graphics.height","BustScale:num":"1.20"}
 *
 * @param Vocab:struct
 * @text Vocabulary
 * @type struct<Vocab>
 * @desc The vocabulary used for this plugin and related settings.
 * @default {"ContinueFmt:str":"Press %1 or %2 to continue","KeyOK:str":"OK","KeyCancel:str":"Cancel","LvFmt:str":"LV %1","LvUp:str":"LEVEL UP!","LvUpSfx:str":"Up4","LvUpVolume:num":"90","LvUpPitch:num":"100","LvUpPan:num":"0","LvUpColor:str":"17","NewSkill:str":"%1 has learned:","RewardItems:str":"Items Obtained","Victory:str":"Victory!"}
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
 * @param FadeInSpeed:num
 * @text Fade In Speed
 * @parent General
 * @desc Fade in speed for the victory window.
 * @default 8
 *
 * @param HideDelayMS:num
 * @text Hide Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before hiding the UI Windows.
 * @default 1500
 *
 * @param ShowDelayMS:num
 * @text Show Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before showing the Victory Windows.
 * @default 2000
 *
 * @param UpdateDuration:num
 * @text Update Duration
 * @parent General
 * @desc Duration in frames on updating actor EXP gauges.
 * @default 180
 *
 * @param AutoBattleAutoSkip:eval
 * @text Skip Auto Battle?
 * @parent General
 * @type boolean
 * @on Skip
 * @off Don't Skip
 * @desc Skip the Victory Aftermath sequence if the player has
 * decided to use the party Auto Battle command?
 * @default true
 *
 * @param MirrorContents:eval
 * @text Mirror Contents?
 * @parent General
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the positions of EXP, Gold, and Items?
 * @default false
 *
 * @param ShowExpGauges:eval
 * @text Show EXP Gauges?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the EXP Gauges of the main party members
 * for the first screen of the Victory Aftermath?
 * @default true
 *
 * @param DropsSortBy:str
 * @text Drops Sorted By
 * @parent General
 * @type select
 * @option ID
 * @option Name
 * @desc How are drops sorted by in the Victory Aftermath?
 * @default ID
 *
 * @param Colors
 * @text Color Settings
 *
 * @param bgColor1:str
 * @text Background Color 1
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.8)
 *
 * @param bgColor2:str
 * @text Background Color 2
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.4)
 *
 * @param rewardStrip1:str
 * @text Reward Strip 1
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 *
 * @param rewardStrip2:str
 * @text Reward Strip 2
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.0)
 *
 * @param actorStrip1:str
 * @text Actor Strip
 * @parent Colors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 1.0)
 * 
 * @param Collapse
 * @text Collapse Effect
 *
 * @param WaitRegularCollapse:eval
 * @text Normal Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the normal collapse effect to finish?
 * @default true
 *
 * @param WaitBossCollapse:eval
 * @text Boss Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the boss collapse effect to finish?
 * @default true
 * 
 * @param Music
 * @text Victory Music
 *
 * @param Bgm:str
 * @text Victory BGM
 * @parent Music
 * @type file
 * @dir audio/bgm/
 * @desc Background music to play during the victory sequence.
 * @default Ship3
 *
 * @param volume:num
 * @text Volume
 * @parent Music
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @parent Music
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @parent Music
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Rewards Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rewards:
 *
 * @param Label
 * @desc This one doesn't have any use other than being a label to 
 * quickly determine what this one is for.
 * @default Untitled
 *
 * @param Show:func
 * @text JS: Show
 * @type note
 * @desc Code used to determine if the reward strip is shown.
 * @default "return true;"
 *
 * @param Text:func
 * @text JS: Text
 * @type note
 * @desc Code used to determine if the text displayed as the category.
 * @default "return 'Untitled';"
 *
 * @param Data:func
 * @text JS: Data
 * @type note
 * @desc Code used to determine what data should be displayed in the reward strip.
 * @default "return 0;"
 *
 */
/* ----------------------------------------------------------------------------
 * Level Up Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LevelUp:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Level Up portion of the Victory Aftermath phase?
 * @default true
 *
 * @param ShowFace:eval
 * @text Show Face?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's face?
 * @default false
 *
 * @param ShowParamDiff:eval
 * @text Show Param Change?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show an extra column for parameter value differences?
 * @default true
 *
 * @param HideLevelDiff:eval
 * @text Hide Level?
 * @parent ShowParamDiff:eval
 * @type boolean
 * @on Hide
 * @off Normal
 * @desc Hide the level change in the parameter value differences?
 * @default false
 *
 * @param MaxSkills:num
 * @text Shown Max Skills
 * @parent General
 * @desc The maximum amount of skills that are displayed.
 * This is due to limited screen space.
 * @default 8
 *
 * @param DelayBuffer:num
 * @text Delay Buffer
 * @parent General
 * @type number
 * @desc How many milliseconds to wait in between playing
 * each level up sound effect?
 * @default 200
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
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
 * @param Quotes
 *
 * @param LevelUpQuotes:arrayjson
 * @text Level Up Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <Level Up Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Alright! A level up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Yes! I've leveled up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Oh? I've leveled up!?\\n This is awesome!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've become stronger!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I feel like I'm getting used to battle.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"The power! I can feel it!\\\"\""]
 *
 * @param NewSkillQuotes:arrayjson
 * @text New Skill Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <New Skill Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've acquired a new skill!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This new skill should come in handy.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"It seems I've learned something new!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I've acquired a new power!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This should be useful for future battles.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I wonder what this new skill is like?\\\"\""]
 *
 * @param MainMenuCore
 * @text VisuMZ_1_MainMenuCore
 *
 * @param ShowBust:eval
 * @text Show Bust?
 * @parent MainMenuCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's menu image as a bust?
 * @default true
 *
 * @param BustPosX:str
 * @text Bust Position X
 * @parent MainMenuCore
 * @desc Positon to center the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.width * 0.25
 *
 * @param BustPosY:str
 * @text Bust Position Y
 * @parent MainMenuCore
 * @desc Positon to anchor the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.height
 *
 * @param BustScale:num
 * @text Bust Scale
 * @parent MainMenuCore
 * @desc The amount to scale the actor's menu image bust.
 * @default 1.20
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ContinueFmt:str
 * @text Continue Format
 * @desc Text format for continue message.
 * %1 - OK key, %2 - Cancel key
 * @default Press %1 or %2 to continue
 *
 * @param KeyOK:str
 * @text OK Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param KeyCancel:str
 * @text Cancel Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param LvFmt:str
 * @text Level Format
 * @desc Text format for actor level.
 * %1 - Level
 * @default LV %1
 *
 * @param LvUp:str
 * @text Level Up
 * @desc Text format for reaching a level up.
 * @default LEVEL UP!
 *
 * @param LvUpSfx:str
 * @text Sound Effect
 * @parent LvUp:str
 * @type file
 * @dir audio/se/
 * @desc Sound effect played when a level up occurs.
 * @default Up4
 *
 * @param LvUpVolume:num
 * @text Volume
 * @parent LvUpSfx:str
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param LvUpPitch:num
 * @text Pitch
 * @parent LvUpSfx:str
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param LvUpPan:num
 * @text Pan
 * @parent LvUpSfx:str
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param LvUpColor:str
 * @text Text Color
 * @parent LvUp:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param NewSkill:str
 * @text New Skill Format
 * @desc Text format describing that a new skill has been learned.
 * %1 - Actor Name
 * @default %1 has learned:
 *
 * @param RewardItems:str
 * @text Reward Items
 * @desc Text displayed for items rewarded.
 * @default Items Obtained
 *
 * @param Victory:str
 * @text Victory Title
 * @desc Text displayed at the top of the victory screen.
 * @default Victory!
 *
 */
//=============================================================================

const _0x509144=_0xca77;(function(_0x557954,_0x4b37cc){const _0x556a7d=_0xca77,_0x278908=_0x557954();while(!![]){try{const _0x280107=-parseInt(_0x556a7d(0x300))/0x1+parseInt(_0x556a7d(0x1cf))/0x2+parseInt(_0x556a7d(0x1a8))/0x3*(-parseInt(_0x556a7d(0x258))/0x4)+-parseInt(_0x556a7d(0x220))/0x5+-parseInt(_0x556a7d(0x2be))/0x6+-parseInt(_0x556a7d(0x237))/0x7*(parseInt(_0x556a7d(0x2fa))/0x8)+parseInt(_0x556a7d(0x219))/0x9*(parseInt(_0x556a7d(0x158))/0xa);if(_0x280107===_0x4b37cc)break;else _0x278908['push'](_0x278908['shift']());}catch(_0x1e62f8){_0x278908['push'](_0x278908['shift']());}}}(_0x4bf0,0xa6c78));var label=_0x509144(0x1af),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins[_0x509144(0x16f)](function(_0x423f7f){const _0xfd9948=_0x509144;return _0x423f7f[_0xfd9948(0x282)]&&_0x423f7f[_0xfd9948(0x2ee)][_0xfd9948(0x228)]('['+label+']');})[0x0];VisuMZ[label][_0x509144(0x2e7)]=VisuMZ[label][_0x509144(0x2e7)]||{},VisuMZ[_0x509144(0x286)]=function(_0x7b61b9,_0x30ce5f){const _0x426ac9=_0x509144;for(const _0x174268 in _0x30ce5f){if(_0x174268[_0x426ac9(0x16c)](/(.*):(.*)/i)){const _0x20cc3a=String(RegExp['$1']),_0x17cf92=String(RegExp['$2'])[_0x426ac9(0x264)]()['trim']();let _0x224ea2,_0xe9bb4c,_0x505298;switch(_0x17cf92){case _0x426ac9(0x1ef):_0x224ea2=_0x30ce5f[_0x174268]!==''?Number(_0x30ce5f[_0x174268]):0x0;break;case _0x426ac9(0x138):_0xe9bb4c=_0x30ce5f[_0x174268]!==''?JSON['parse'](_0x30ce5f[_0x174268]):[],_0x224ea2=_0xe9bb4c[_0x426ac9(0x296)](_0x5c7400=>Number(_0x5c7400));break;case'EVAL':_0x224ea2=_0x30ce5f[_0x174268]!==''?eval(_0x30ce5f[_0x174268]):null;break;case _0x426ac9(0x29d):_0xe9bb4c=_0x30ce5f[_0x174268]!==''?JSON[_0x426ac9(0x24c)](_0x30ce5f[_0x174268]):[],_0x224ea2=_0xe9bb4c[_0x426ac9(0x296)](_0x1ef1ff=>eval(_0x1ef1ff));break;case _0x426ac9(0x2ef):_0x224ea2=_0x30ce5f[_0x174268]!==''?JSON[_0x426ac9(0x24c)](_0x30ce5f[_0x174268]):'';break;case _0x426ac9(0x17f):_0xe9bb4c=_0x30ce5f[_0x174268]!==''?JSON['parse'](_0x30ce5f[_0x174268]):[],_0x224ea2=_0xe9bb4c[_0x426ac9(0x296)](_0x429d1f=>JSON['parse'](_0x429d1f));break;case _0x426ac9(0x20a):_0x224ea2=_0x30ce5f[_0x174268]!==''?new Function(JSON['parse'](_0x30ce5f[_0x174268])):new Function(_0x426ac9(0x1e8));break;case _0x426ac9(0x2f7):_0xe9bb4c=_0x30ce5f[_0x174268]!==''?JSON[_0x426ac9(0x24c)](_0x30ce5f[_0x174268]):[],_0x224ea2=_0xe9bb4c['map'](_0x391712=>new Function(JSON[_0x426ac9(0x24c)](_0x391712)));break;case _0x426ac9(0x233):_0x224ea2=_0x30ce5f[_0x174268]!==''?String(_0x30ce5f[_0x174268]):'';break;case _0x426ac9(0x23a):_0xe9bb4c=_0x30ce5f[_0x174268]!==''?JSON[_0x426ac9(0x24c)](_0x30ce5f[_0x174268]):[],_0x224ea2=_0xe9bb4c[_0x426ac9(0x296)](_0x5b2081=>String(_0x5b2081));break;case'STRUCT':_0x505298=_0x30ce5f[_0x174268]!==''?JSON[_0x426ac9(0x24c)](_0x30ce5f[_0x174268]):{},_0x224ea2=VisuMZ[_0x426ac9(0x286)]({},_0x505298);break;case _0x426ac9(0x187):_0xe9bb4c=_0x30ce5f[_0x174268]!==''?JSON[_0x426ac9(0x24c)](_0x30ce5f[_0x174268]):[],_0x224ea2=_0xe9bb4c[_0x426ac9(0x296)](_0x154d12=>VisuMZ['ConvertParams']({},JSON['parse'](_0x154d12)));break;default:continue;}_0x7b61b9[_0x20cc3a]=_0x224ea2;}}return _0x7b61b9;},(_0x21c9ae=>{const _0x10ac4c=_0x509144,_0x186e30=_0x21c9ae[_0x10ac4c(0x25f)];for(const _0x26a720 of dependencies){if(!Imported[_0x26a720]){alert(_0x10ac4c(0x142)[_0x10ac4c(0x2a5)](_0x186e30,_0x26a720)),SceneManager[_0x10ac4c(0x27d)]();break;}}const _0x170390=_0x21c9ae[_0x10ac4c(0x2ee)];if(_0x170390[_0x10ac4c(0x16c)](/\[Version[ ](.*?)\]/i)){const _0x4fcbcb=Number(RegExp['$1']);_0x4fcbcb!==VisuMZ[label]['version']&&(alert(_0x10ac4c(0x2d4)[_0x10ac4c(0x2a5)](_0x186e30,_0x4fcbcb)),SceneManager['exit']());}if(_0x170390[_0x10ac4c(0x16c)](/\[Tier[ ](\d+)\]/i)){const _0x1a5e26=Number(RegExp['$1']);_0x1a5e26<tier?(alert(_0x10ac4c(0x222)['format'](_0x186e30,_0x1a5e26,tier)),SceneManager[_0x10ac4c(0x27d)]()):tier=Math['max'](_0x1a5e26,tier);}VisuMZ[_0x10ac4c(0x286)](VisuMZ[label][_0x10ac4c(0x2e7)],_0x21c9ae[_0x10ac4c(0x265)]);})(pluginData),PluginManager[_0x509144(0x2f6)](pluginData['name'],_0x509144(0x2f5),_0x1000f0=>{const _0x19d066=_0x509144;VisuMZ[_0x19d066(0x286)](_0x1000f0,_0x1000f0);const _0x39758e=$gameActors[_0x19d066(0x28b)](_0x1000f0[_0x19d066(0x2e4)]),_0x3fd3ae=_0x1000f0[_0x19d066(0x13c)];if(_0x39758e)while(_0x3fd3ae[_0x19d066(0x2ea)]>0x0){_0x39758e[_0x19d066(0x2a9)]()[_0x19d066(0x1dc)](_0x3fd3ae[_0x19d066(0x205)]());}}),PluginManager[_0x509144(0x2f6)](pluginData[_0x509144(0x25f)],_0x509144(0x285),_0x44b3a1=>{const _0x485c6e=_0x509144;VisuMZ[_0x485c6e(0x286)](_0x44b3a1,_0x44b3a1);const _0x14d3d6=$gameActors[_0x485c6e(0x28b)](_0x44b3a1['ActorID']),_0x40217b=_0x44b3a1[_0x485c6e(0x13c)];if(_0x14d3d6)while(_0x40217b[_0x485c6e(0x2ea)]>0x0){_0x14d3d6['newSkillQuotes']()[_0x485c6e(0x1dc)](_0x40217b[_0x485c6e(0x205)]());}}),PluginManager[_0x509144(0x2f6)](pluginData[_0x509144(0x25f)],_0x509144(0x2bf),_0x8f8582=>{const _0x511b90=_0x509144;VisuMZ[_0x511b90(0x286)](_0x8f8582,_0x8f8582);const _0x524322=$gameActors[_0x511b90(0x28b)](_0x8f8582[_0x511b90(0x2e4)]);if(_0x524322)while(_0x524322[_0x511b90(0x2a9)]()[_0x511b90(0x2ea)]>0x0){_0x524322[_0x511b90(0x2a9)]()[_0x511b90(0x205)]();}}),PluginManager[_0x509144(0x2f6)](pluginData['name'],_0x509144(0x27e),_0x4d8a70=>{const _0x50d298=_0x509144;VisuMZ[_0x50d298(0x286)](_0x4d8a70,_0x4d8a70);const _0x5f5202=$gameActors[_0x50d298(0x28b)](_0x4d8a70[_0x50d298(0x2e4)]);if(_0x5f5202)while(_0x5f5202[_0x50d298(0x2e8)]()[_0x50d298(0x2ea)]>0x0){_0x5f5202[_0x50d298(0x2e8)]()[_0x50d298(0x205)]();}}),PluginManager[_0x509144(0x2f6)](pluginData[_0x509144(0x25f)],_0x509144(0x2c0),_0x544efa=>{const _0x27d729=_0x509144;if(!$gameParty[_0x27d729(0x1f5)]())return;VisuMZ[_0x27d729(0x286)](_0x544efa,_0x544efa),BattleManager[_0x27d729(0x288)]={'name':String(_0x544efa['name']||''),'volume':Number(_0x544efa[_0x27d729(0x1ec)]||0x0),'pitch':Number(_0x544efa['pitch']||0x0),'pan':Number(_0x544efa[_0x27d729(0x2e0)]||0x0),'pos':0x0};}),PluginManager[_0x509144(0x2f6)](pluginData['name'],'PostBattleBgs',_0x48a5ab=>{const _0xaedb1c=_0x509144;if(!$gameParty[_0xaedb1c(0x1f5)]())return;VisuMZ[_0xaedb1c(0x286)](_0x48a5ab,_0x48a5ab),BattleManager['_mapBgs']={'name':String(_0x48a5ab[_0xaedb1c(0x25f)]||''),'volume':Number(_0x48a5ab[_0xaedb1c(0x1ec)]||0x0),'pitch':Number(_0x48a5ab[_0xaedb1c(0x167)]||0x0),'pan':Number(_0x48a5ab[_0xaedb1c(0x2e0)]||0x0),'pos':0x0};}),PluginManager[_0x509144(0x2f6)](pluginData['name'],_0x509144(0x2dd),_0x17aa64=>{const _0x491043=_0x509144;VisuMZ[_0x491043(0x286)](_0x17aa64,_0x17aa64),$gameSystem[_0x491043(0x206)]()[_0x491043(0x20d)]=_0x17aa64['Bypass'];}),PluginManager[_0x509144(0x2f6)](pluginData[_0x509144(0x25f)],_0x509144(0x1d7),_0x8c827a=>{const _0x242bff=_0x509144;VisuMZ[_0x242bff(0x286)](_0x8c827a,_0x8c827a),$gameSystem[_0x242bff(0x206)]()[_0x242bff(0x1fe)]=_0x8c827a[_0x242bff(0x141)];}),PluginManager[_0x509144(0x2f6)](pluginData[_0x509144(0x25f)],_0x509144(0x23b),_0x1a5b56=>{const _0x35dba3=_0x509144;VisuMZ[_0x35dba3(0x286)](_0x1a5b56,_0x1a5b56),$gameSystem[_0x35dba3(0x206)]()['bypassVictoryPhase']=_0x1a5b56['Bypass'];}),PluginManager[_0x509144(0x2f6)](pluginData[_0x509144(0x25f)],'SystemChangeVictoryBgm',_0xf3ab93=>{const _0x48aa61=_0x509144;VisuMZ[_0x48aa61(0x286)](_0xf3ab93,_0xf3ab93),VisuMZ['ConvertParams'](_0xf3ab93,_0xf3ab93),$gameSystem[_0x48aa61(0x215)](String(_0xf3ab93[_0x48aa61(0x25f)]||''),Number(_0xf3ab93['volume']||0x0),Number(_0xf3ab93[_0x48aa61(0x167)]||0x0),Number(_0xf3ab93[_0x48aa61(0x2e0)]||0x0));}),TextManager['victoryContinueFmt']=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)][_0x509144(0x1a2)][_0x509144(0x2e1)],TextManager[_0x509144(0x16e)]=VisuMZ[_0x509144(0x1af)]['Settings'][_0x509144(0x1a2)][_0x509144(0x164)],TextManager[_0x509144(0x2f9)]=VisuMZ['VictoryAftermath'][_0x509144(0x2e7)][_0x509144(0x1a2)]['KeyCancel'],TextManager[_0x509144(0x2d3)]=VisuMZ['VictoryAftermath'][_0x509144(0x2e7)]['Vocab'][_0x509144(0x223)],TextManager[_0x509144(0x199)]=VisuMZ[_0x509144(0x1af)]['Settings'][_0x509144(0x1a2)][_0x509144(0x234)],TextManager[_0x509144(0x13e)]=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)][_0x509144(0x1a2)]['RewardItems'],TextManager[_0x509144(0x2c6)]=VisuMZ[_0x509144(0x1af)]['Settings'][_0x509144(0x1a2)][_0x509144(0x175)],TextManager['victoryNewSkillFmt']=VisuMZ[_0x509144(0x1af)]['Settings'][_0x509144(0x1a2)]['NewSkill'],TextManager[_0x509144(0x147)]=function(_0x489445){const _0x11a60d=_0x509144,_0x47ab90=VisuMZ[_0x11a60d(0x1af)][_0x11a60d(0x2e7)]['LevelUp'][_0x11a60d(0x1cb)];if(!_0x489445)return _0x47ab90[Math[_0x11a60d(0x2c1)](_0x47ab90['length'])];if(!_0x489445[_0x11a60d(0x212)]())return _0x47ab90[Math[_0x11a60d(0x2c1)](_0x47ab90[_0x11a60d(0x2ea)])];const _0x3379d1=_0x489445[_0x11a60d(0x2a9)]();if(_0x3379d1[_0x11a60d(0x2ea)]>0x0)return _0x3379d1[Math[_0x11a60d(0x2c1)](_0x3379d1[_0x11a60d(0x2ea)])];return _0x47ab90[Math['randomInt'](_0x47ab90['length'])];},TextManager['quoteLevelSkill']=function(_0x41035e){const _0x4c120b=_0x509144,_0x362e23=VisuMZ['VictoryAftermath']['Settings'][_0x4c120b(0x140)][_0x4c120b(0x1c3)];if(!_0x41035e)return _0x362e23[Math[_0x4c120b(0x2c1)](_0x362e23['length'])];if(!_0x41035e[_0x4c120b(0x212)]())return _0x362e23[Math[_0x4c120b(0x2c1)](_0x362e23[_0x4c120b(0x2ea)])];const _0x356bce=_0x41035e['newSkillQuotes']();if(_0x356bce[_0x4c120b(0x2ea)]>0x0)return _0x356bce[Math[_0x4c120b(0x2c1)](_0x356bce[_0x4c120b(0x2ea)])];return _0x362e23[Math[_0x4c120b(0x2c1)](_0x362e23[_0x4c120b(0x2ea)])];},ColorManager['getColorDataFromPluginParameters']=function(_0x39cf9c,_0x517d43){const _0x3495af=_0x509144;return _0x517d43=String(_0x517d43),this['_colorCache']=this[_0x3495af(0x211)]||{},_0x517d43['match'](/#(.*)/i)?this[_0x3495af(0x211)][_0x39cf9c]=_0x3495af(0x213)[_0x3495af(0x2a5)](String(RegExp['$1'])):this[_0x3495af(0x211)][_0x39cf9c]=this[_0x3495af(0x195)](Number(_0x517d43)),this['_colorCache'][_0x39cf9c];},ColorManager[_0x509144(0x232)]=function(_0x179944){const _0x5d5148=_0x509144;return _0x179944=String(_0x179944),_0x179944[_0x5d5148(0x16c)](/#(.*)/i)?_0x5d5148(0x213)[_0x5d5148(0x2a5)](String(RegExp['$1'])):this['textColor'](Number(_0x179944));},ColorManager[_0x509144(0x23f)]=function(){const _0x190038=_0x509144,_0x435851=_0x190038(0x27a);this[_0x190038(0x211)]=this[_0x190038(0x211)]||{};if(this[_0x190038(0x211)][_0x435851])return this[_0x190038(0x211)][_0x435851];const _0x5ae742=VisuMZ['VictoryAftermath'][_0x190038(0x2e7)]['Vocab'][_0x190038(0x2fd)];return this[_0x190038(0x1e3)](_0x435851,_0x5ae742);},SoundManager['playVictoryLevelUpSFX']=function(){const _0x5d10f7=_0x509144;if(this[_0x5d10f7(0x145)])return;if(!this[_0x5d10f7(0x161)]){const _0x22fbd5=VisuMZ['VictoryAftermath'][_0x5d10f7(0x2e7)]['Vocab'];this[_0x5d10f7(0x161)]={'name':_0x22fbd5[_0x5d10f7(0x16a)]||'','volume':_0x22fbd5[_0x5d10f7(0x252)]??0x5a,'pitch':_0x22fbd5[_0x5d10f7(0x21c)]??0x64,'pan':_0x22fbd5[_0x5d10f7(0x2a1)]??0x0};}this[_0x5d10f7(0x161)][_0x5d10f7(0x25f)]!==''&&(AudioManager[_0x5d10f7(0x208)](this[_0x5d10f7(0x161)]),this[_0x5d10f7(0x145)]=!![],setTimeout(this[_0x5d10f7(0x204)]['bind'](this),0xc8));},SoundManager[_0x509144(0x204)]=function(){const _0x205ab4=_0x509144;this[_0x205ab4(0x145)]=![];},SoundManager[_0x509144(0x14a)]=function(){const _0x181cea=_0x509144,_0x35f9dc=$gameSystem[_0x181cea(0x202)]();_0x35f9dc[_0x181cea(0x25f)]!==''&&AudioManager[_0x181cea(0x18a)](_0x35f9dc);},BattleManager[_0x509144(0x183)]=VisuMZ[_0x509144(0x1af)]['Settings'][_0x509144(0x254)][_0x509144(0x26f)]||0x1,VisuMZ[_0x509144(0x1af)][_0x509144(0x2ed)]=BattleManager[_0x509144(0x1b4)],BattleManager['initMembers']=function(){const _0x55e7dc=_0x509144;VisuMZ[_0x55e7dc(0x1af)][_0x55e7dc(0x2ed)]['call'](this),this[_0x55e7dc(0x2d6)]=![],this[_0x55e7dc(0x1e0)]=-0x1,this['_autoBattleVictorySkip']=![];},VisuMZ[_0x509144(0x1af)]['BattleManager_isBusy']=BattleManager[_0x509144(0x163)],BattleManager[_0x509144(0x163)]=function(){const _0x30a211=_0x509144;return this[_0x30a211(0x1cc)]()?!![]:VisuMZ['VictoryAftermath']['BattleManager_isBusy'][_0x30a211(0x26b)](this);},BattleManager[_0x509144(0x1cc)]=function(){const _0x2d2819=_0x509144;return this['_phase']==='battleEnd'&&this[_0x2d2819(0x2d6)];},BattleManager[_0x509144(0x297)]=function(){const _0x4fcae1=_0x509144;this[_0x4fcae1(0x2c4)](_0x4fcae1(0x209)),this['processVictoryAftermath'](),Imported[_0x4fcae1(0x17a)]&&$gameParty['playBattleVoice'](_0x4fcae1(0x174));},BattleManager[_0x509144(0x2b9)]=function(){const _0x49854c=_0x509144;this[_0x49854c(0x299)](),this[_0x49854c(0x1a5)](),this[_0x49854c(0x2d5)](),this[_0x49854c(0x224)]();},BattleManager['processVictoryAftermathParty']=function(){const _0x2572ec=_0x509144;$gameParty[_0x2572ec(0x21d)](),$gameParty[_0x2572ec(0x236)]();},BattleManager[_0x509144(0x1a5)]=function(){const _0x25887d=_0x509144;if(this[_0x25887d(0x1a9)]())return;this['playVictoryMe'](),SoundManager[_0x25887d(0x14a)]();},BattleManager[_0x509144(0x1a9)]=function(){const _0x216404=_0x509144;return $gameSystem[_0x216404(0x206)]()['bypassVictoryMusic']||$gameSystem[_0x216404(0x206)]()[_0x216404(0x255)];},BattleManager[_0x509144(0x2d5)]=function(){const _0x1c115e=_0x509144;this[_0x1c115e(0x22f)](),this[_0x1c115e(0x2df)](),this[_0x1c115e(0x2a8)]();},BattleManager['makeTempActors']=function(){const _0x246ffd=_0x509144;this[_0x246ffd(0x1b0)]=$gameParty[_0x246ffd(0x148)]()[_0x246ffd(0x296)](_0x347d13=>_0x347d13['makeVictoryCopy']()),this['_victoryTempActorsB']=JsonEx['makeDeepCopy'](this[_0x246ffd(0x1b0)]);},BattleManager[_0x509144(0x224)]=function(){const _0x49132b=_0x509144;this['checkVictoryAftermathAutoBattleAutoSkip'](),this['endBattle'](0x0),this[_0x49132b(0x242)]('Victory'),this[_0x49132b(0x2d6)]=!![],this[_0x49132b(0x26a)]()?this[_0x49132b(0x185)]():this[_0x49132b(0x1f8)]();},BattleManager[_0x509144(0x2f3)]=function(){const _0x4b4949=_0x509144,_0x23c117=VisuMZ['VictoryAftermath']['Settings'][_0x4b4949(0x254)];_0x23c117[_0x4b4949(0x1c6)]===undefined&&(_0x23c117[_0x4b4949(0x1c6)]=!![]),_0x23c117[_0x4b4949(0x1c6)]===!![]&&(this[_0x4b4949(0x2b7)]=this[_0x4b4949(0x2a4)]);},BattleManager[_0x509144(0x26a)]=function(){const _0x350dc7=_0x509144;if(this[_0x350dc7(0x2b7)])return!![];return $gameSystem[_0x350dc7(0x206)]()[_0x350dc7(0x255)];},BattleManager[_0x509144(0x185)]=function(){const _0x17436e=_0x509144,_0x10e61b=VisuMZ['VictoryAftermath'][_0x17436e(0x2e7)]['General'],_0x48846f=SceneManager[_0x17436e(0x1e7)];setTimeout(_0x48846f[_0x17436e(0x19b)]['bind'](_0x48846f),_0x10e61b[_0x17436e(0x18d)]);},BattleManager[_0x509144(0x1f8)]=function(){const _0x536843=_0x509144,_0x1b6b3b=VisuMZ[_0x536843(0x1af)][_0x536843(0x2e7)][_0x536843(0x254)],_0x5bd87d=SceneManager[_0x536843(0x1e7)];this[_0x536843(0x1d6)]=this['_rewards'][_0x536843(0x1c5)]/(BattleManager[_0x536843(0x183)]||0x1),Window_StatusBase[_0x536843(0x186)][_0x536843(0x1a4)](),setTimeout(_0x5bd87d[_0x536843(0x249)][_0x536843(0x2a0)](_0x5bd87d),_0x1b6b3b[_0x536843(0x153)]),setTimeout(_0x5bd87d[_0x536843(0x1a3)][_0x536843(0x2a0)](_0x5bd87d),_0x1b6b3b[_0x536843(0x18d)]);},BattleManager['nextVictoryLevelUpActor']=function(){const _0x6dc8b3=_0x509144;for(;;){this['_victoryActorIndex']++;if(this[_0x6dc8b3(0x1e0)]>=$gameParty[_0x6dc8b3(0x23c)]())return null;const _0x3d91a4=$gameParty['battleMembers']()[this['_victoryActorIndex']],_0x20724a=this['_victoryTempActorsB'][this[_0x6dc8b3(0x1e0)]];if(_0x3d91a4[_0x6dc8b3(0x18f)]!==_0x20724a['level'])return _0x3d91a4;}return null;},VisuMZ[_0x509144(0x1af)][_0x509144(0x139)]=Game_System[_0x509144(0x186)]['initialize'],Game_System[_0x509144(0x186)][_0x509144(0x1be)]=function(){const _0x3feefa=_0x509144;VisuMZ[_0x3feefa(0x1af)]['Game_System_initialize'][_0x3feefa(0x26b)](this),this[_0x3feefa(0x2ae)](),this['initVictoryBgm']();},Game_System[_0x509144(0x186)]['initVictoryAftermath']=function(){const _0x52cbc3=_0x509144;this[_0x52cbc3(0x201)]={'bypassVictoryMusic':![],'bypassVictoryPhase':![],'bypassVictoryMotion':![]};},Game_System[_0x509144(0x186)][_0x509144(0x206)]=function(){const _0x113bf4=_0x509144;if(this['_victoryAftermathSettings']===undefined)this[_0x113bf4(0x2ae)]();return this[_0x113bf4(0x201)];},Game_System[_0x509144(0x186)]['initVictoryBgm']=function(){const _0x2ce929=_0x509144,_0x5c2a9c=VisuMZ[_0x2ce929(0x1af)]['Settings']['General'];this['_victoryBgm']={'name':_0x5c2a9c[_0x2ce929(0x270)]??'','volume':_0x5c2a9c[_0x2ce929(0x1ec)]??0x5a,'pitch':_0x5c2a9c[_0x2ce929(0x167)]??0x0,'pan':_0x5c2a9c['pan']??0x0};},Game_System[_0x509144(0x186)][_0x509144(0x202)]=function(){const _0x546238=_0x509144;if(this['_victoryBgm']===undefined)this[_0x546238(0x1b9)]();return this[_0x546238(0x210)];},Game_System[_0x509144(0x186)][_0x509144(0x215)]=function(_0x5971bc,_0x3e1922,_0x146ae0,_0x5bc4d2){const _0x4a19cf=_0x509144;if(this[_0x4a19cf(0x210)]===undefined)this[_0x4a19cf(0x1b9)]();this[_0x4a19cf(0x210)]={'name':String(_0x5971bc)??'','volume':Number(_0x3e1922)??0x5a,'pitch':Number(_0x146ae0)??0x0,'pan':Number(_0x5bc4d2)??0x0};},VisuMZ[_0x509144(0x1af)][_0x509144(0x190)]=Game_Actor[_0x509144(0x186)][_0x509144(0x28c)],Game_Actor['prototype'][_0x509144(0x28c)]=function(_0x1dee75){const _0x3db455=_0x509144;VisuMZ[_0x3db455(0x1af)][_0x3db455(0x190)][_0x3db455(0x26b)](this,_0x1dee75),this[_0x3db455(0x192)]();},Game_Actor[_0x509144(0x186)]['setupVictoryAftermathQuotes']=function(){const _0x5551ed=_0x509144;this[_0x5551ed(0x157)]=[],this[_0x5551ed(0x1ad)]=[];const _0x429ab1=this[_0x5551ed(0x28b)]()[_0x5551ed(0x160)];_0x429ab1['match'](/<LEVEL UP (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/LEVEL UP (?:QUOTE|QUOTES)>/i)&&(this[_0x5551ed(0x157)]=String(RegExp['$1'])[_0x5551ed(0x2b3)](/<NEW QUOTE>[\r\n]+/i)),_0x429ab1[_0x5551ed(0x16c)](/<NEW SKILL (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/NEW SKILL (?:QUOTE|QUOTES)>/i)&&(this[_0x5551ed(0x1ad)]=String(RegExp['$1'])[_0x5551ed(0x2b3)](/<NEW QUOTE>[\r\n]+/i));},Game_Actor[_0x509144(0x186)]['levelUpQuotes']=function(){const _0x19ccfb=_0x509144;if(this[_0x19ccfb(0x157)]===undefined)this[_0x19ccfb(0x192)]();return this['_victoryAftermathLevelUpQuotes'];},Game_Actor[_0x509144(0x186)][_0x509144(0x2e8)]=function(){const _0x44ecc1=_0x509144;if(this['_victoryAftermathNewSkillQuotes']===undefined)this['setupVictoryAftermathQuotes']();return this[_0x44ecc1(0x1ad)];},Game_Actor[_0x509144(0x186)][_0x509144(0x2c8)]=function(){const _0x39cf26=_0x509144;if(this[_0x39cf26(0x22c)]())return 0x1;const _0xe6a5e7=this[_0x39cf26(0x22b)]()-this[_0x39cf26(0x251)](),_0x34634f=this[_0x39cf26(0x168)]()-this['currentLevelExp']();return(_0x34634f/_0xe6a5e7)[_0x39cf26(0x243)](0x0,0x1);},VisuMZ[_0x509144(0x1af)][_0x509144(0x26d)]=Game_Actor[_0x509144(0x186)][_0x509144(0x2b5)],Game_Actor['prototype'][_0x509144(0x2b5)]=function(){const _0x276298=_0x509144;return SceneManager[_0x276298(0x21a)]()?![]:VisuMZ['VictoryAftermath'][_0x276298(0x26d)][_0x276298(0x26b)](this);},Game_Actor[_0x509144(0x186)][_0x509144(0x2bd)]=function(){const _0x569641=_0x509144,_0x548f68=JsonEx[_0x569641(0x28e)](this);return _0x548f68[_0x569641(0x15b)]=!![],_0x548f68;},VisuMZ['VictoryAftermath'][_0x509144(0x238)]=Game_Actor[_0x509144(0x186)][_0x509144(0x1d3)],Game_Actor[_0x509144(0x186)][_0x509144(0x1d3)]=function(){const _0x1f5f55=_0x509144;return this['_victoryAftermathCopy']?!![]:VisuMZ[_0x1f5f55(0x1af)][_0x1f5f55(0x238)][_0x1f5f55(0x26b)](this);},VisuMZ[_0x509144(0x1af)][_0x509144(0x1d0)]=Game_Actor[_0x509144(0x186)][_0x509144(0x236)],Game_Actor[_0x509144(0x186)]['performVictory']=function(){const _0x3c75ce=_0x509144;this[_0x3c75ce(0x1e9)]()?this[_0x3c75ce(0x2ab)](_0x3c75ce(0x1e5)):VisuMZ[_0x3c75ce(0x1af)][_0x3c75ce(0x1d0)]['call'](this);},Game_Actor[_0x509144(0x186)][_0x509144(0x1e9)]=function(){const _0xe21bdf=_0x509144;return $gameSystem['victoryAftermathSettings']()[_0xe21bdf(0x20d)]||$gameSystem[_0xe21bdf(0x206)]()['bypassVictoryPhase'];},Scene_Battle[_0x509144(0x186)][_0x509144(0x249)]=function(){const _0x74981=_0x509144;if(this[_0x74981(0x2ff)][_0x74981(0x2d2)]())return setTimeout(this[_0x74981(0x249)][_0x74981(0x2a0)](this),0x7d0);if(!SceneManager[_0x74981(0x21a)]())return;this[_0x74981(0x1ac)](![]),this['closeCommandWindows'](),this[_0x74981(0x24f)](),this['_statusWindow']['y']=Graphics[_0x74981(0x18c)]*0xa;},Scene_Battle['prototype'][_0x509144(0x1a3)]=function(){const _0x201e21=_0x509144;if(this[_0x201e21(0x2ff)][_0x201e21(0x2d2)]())return setTimeout(this[_0x201e21(0x1a3)][_0x201e21(0x2a0)](this),0x7d0);this[_0x201e21(0x203)]=[],this[_0x201e21(0x21b)](),this[_0x201e21(0x149)](),this[_0x201e21(0x1b7)]();},Scene_Battle[_0x509144(0x186)][_0x509144(0x21b)]=function(){const _0x10e9c7=_0x509144;this['_victorySteps']=[],this['createVictoryStepRewards'](),this[_0x10e9c7(0x269)]();},Scene_Battle[_0x509144(0x186)][_0x509144(0x2ad)]=function(){const _0x470ec7=_0x509144;this[_0x470ec7(0x225)][_0x470ec7(0x1dc)](_0x470ec7(0x1c7));},Scene_Battle[_0x509144(0x186)]['createVictoryStepLevelUps']=function(){const _0x176d13=_0x509144;if(!this[_0x176d13(0x189)]())return;for(const _0x18f973 of $gameParty[_0x176d13(0x148)]()){if(!_0x18f973)continue;const _0x5e1ded=BattleManager['_victoryTempActorsA'][_0x18f973['index']()];_0x18f973[_0x176d13(0x18f)]>_0x5e1ded['level']&&this[_0x176d13(0x198)](_0x18f973);}},Scene_Battle[_0x509144(0x186)][_0x509144(0x198)]=function(_0x304a37){const _0x3d9d75=_0x509144;Imported[_0x3d9d75(0x1d9)]&&Window_VictoryLevelUp[_0x3d9d75(0x22d)]&&ImageManager[_0x3d9d75(0x22a)](_0x304a37['getMenuImage']()),this[_0x3d9d75(0x225)]['push']('levelups');},Scene_Battle[_0x509144(0x186)][_0x509144(0x189)]=function(){const _0x32e1ca=_0x509144;return VisuMZ['VictoryAftermath'][_0x32e1ca(0x2e7)][_0x32e1ca(0x140)][_0x32e1ca(0x1c0)];},Scene_Battle['prototype'][_0x509144(0x1b7)]=function(){const _0x55080e=_0x509144;this[_0x55080e(0x2aa)]=this[_0x55080e(0x225)]['shift']()||'',this['processVictoryStep']();},Scene_Battle[_0x509144(0x186)][_0x509144(0x1ed)]=function(){const _0x4fd1f8=_0x509144;switch(this[_0x4fd1f8(0x2aa)][_0x4fd1f8(0x1d8)]()[_0x4fd1f8(0x14c)]()){case _0x4fd1f8(0x1c7):this[_0x4fd1f8(0x241)](),this[_0x4fd1f8(0x1db)]['setDelayDuration'](BattleManager[_0x4fd1f8(0x183)]);break;case _0x4fd1f8(0x1d1):this[_0x4fd1f8(0x14f)](),this[_0x4fd1f8(0x2fc)](),this['_victoryContinueWindow']['setDelayDuration'](0x0);break;default:this[_0x4fd1f8(0x19b)]();break;}this['addChild'](this['_victoryContinueWindow']);},Scene_Battle[_0x509144(0x186)][_0x509144(0x144)]=function(){const _0x4c3e3a=_0x509144,_0x5c41fd=Window_Base[_0x4c3e3a(0x186)][_0x4c3e3a(0x2db)](),_0x5ae567=Math[_0x4c3e3a(0x214)](Graphics[_0x4c3e3a(0x197)]/0x2)-0x64,_0x62b6eb=Math[_0x4c3e3a(0x214)](Graphics['height']-_0x5c41fd*1.25),_0x11df5c=Math[_0x4c3e3a(0x214)](Graphics['width']/0x2),_0x5504a4=_0x5c41fd;return new Rectangle(_0x5ae567,_0x62b6eb,_0x11df5c,_0x5504a4);},Scene_Battle[_0x509144(0x186)][_0x509144(0x218)]=function(){const _0x5c772c=_0x509144,_0x5dd3fe=0x0,_0xa13f64=0x0,_0xcfd4c3=Graphics[_0x5c772c(0x197)],_0x566674=Graphics[_0x5c772c(0x18c)];return new Rectangle(_0x5dd3fe,_0xa13f64,_0xcfd4c3,_0x566674);},Scene_Battle[_0x509144(0x186)][_0x509144(0x149)]=function(){const _0x300a91=_0x509144;if(this[_0x300a91(0x1db)])return;const _0x3de727=this[_0x300a91(0x144)](),_0x43c218=new Window_VictoryContinueMessage(_0x3de727);this[_0x300a91(0x1a6)](_0x43c218),this[_0x300a91(0x203)][_0x300a91(0x1dc)](_0x43c218),this[_0x300a91(0x1db)]=_0x43c218;},Scene_Battle[_0x509144(0x186)][_0x509144(0x241)]=function(){const _0x342157=_0x509144;if(this['_victoryRewardsWindow'])return;const _0x494094=this[_0x342157(0x218)](),_0x4f89dc=new Window_VictoryRewards(_0x494094);this[_0x342157(0x1a6)](_0x4f89dc),this[_0x342157(0x203)][_0x342157(0x1dc)](_0x4f89dc),this[_0x342157(0x22e)]=_0x4f89dc;},Scene_Battle[_0x509144(0x186)][_0x509144(0x14f)]=function(){const _0x47d3c9=_0x509144;if(this[_0x47d3c9(0x2b6)])return;const _0x16e4b5=this['victoryFullScreenWindowRect'](),_0x13abb4=new Window_VictoryLevelUp(_0x16e4b5);this[_0x47d3c9(0x1a6)](_0x13abb4),this['_victoryWindows']['push'](_0x13abb4),this[_0x47d3c9(0x2b6)]=_0x13abb4;},Scene_Battle[_0x509144(0x186)]['setupVictoryLevelUpNextActor']=function(){const _0x316a83=_0x509144,_0x4d522d=BattleManager['nextVictoryLevelUpActor']();this['_victoryLevelUpWindow'][_0x316a83(0x20c)](_0x4d522d),Imported[_0x316a83(0x17a)]&&_0x4d522d[_0x316a83(0x1e6)]('BattleVictoryLevelUp');},Scene_Battle[_0x509144(0x186)][_0x509144(0x19b)]=function(){const _0x45335d=_0x509144;BattleManager[_0x45335d(0x25b)](),BattleManager['_victoryPhase']=![];};Imported[_0x509144(0x178)]&&(VisuMZ[_0x509144(0x1af)][_0x509144(0x259)]=Scene_Battle['prototype'][_0x509144(0x24d)],Scene_Battle['prototype']['allowUpdateBattleAniSpeed']=function(){const _0x31b167=_0x509144;if(BattleManager[_0x31b167(0x1cc)]())return![];return VisuMZ['VictoryAftermath'][_0x31b167(0x259)]['call'](this);});;Scene_Battle[_0x509144(0x186)][_0x509144(0x28f)]=function(){const _0x3d43cc=_0x509144;return this[_0x3d43cc(0x1db)]&&this[_0x3d43cc(0x1db)][_0x3d43cc(0x235)]();},VisuMZ[_0x509144(0x1af)][_0x509144(0x13a)]=Scene_Battle[_0x509144(0x186)][_0x509144(0x1dd)],Scene_Battle[_0x509144(0x186)][_0x509144(0x1dd)]=function(){const _0x1d63f1=_0x509144;VisuMZ[_0x1d63f1(0x1af)][_0x1d63f1(0x13a)][_0x1d63f1(0x26b)](this),this[_0x1d63f1(0x2c3)]();},Scene_Battle[_0x509144(0x186)][_0x509144(0x2c3)]=function(){const _0x21aaac=_0x509144;if(!BattleManager[_0x21aaac(0x1cc)]())return;if(!this[_0x21aaac(0x28f)]())return;(Input[_0x21aaac(0x2ce)]('ok')||Input[_0x21aaac(0x2ce)](_0x21aaac(0x2da))||TouchInput[_0x21aaac(0x2ce)]())&&(Input[_0x21aaac(0x26c)](),TouchInput['clear'](),this[_0x21aaac(0x1b7)]());},Sprite_Enemy[_0x509144(0x186)][_0x509144(0x2d2)]=function(){const _0x1cfb07=_0x509144,_0x312ab8=VisuMZ[_0x1cfb07(0x1af)][_0x1cfb07(0x2e7)][_0x1cfb07(0x254)];if(this[_0x1cfb07(0x21f)]==='collapse'){if(_0x312ab8[_0x1cfb07(0x19d)]!==undefined)return _0x312ab8[_0x1cfb07(0x19d)];}else{if(this[_0x1cfb07(0x21f)]===_0x1cfb07(0x221)){if(_0x312ab8[_0x1cfb07(0x1d5)]!==undefined)return _0x312ab8['WaitBossCollapse'];}}return[_0x1cfb07(0x290),_0x1cfb07(0x221)][_0x1cfb07(0x228)]();},Sprite_Battler['prototype']['isCollapsing']=function(){return![];},Spriteset_Battle['prototype']['isCollapsing']=function(){const _0x54e8c1=_0x509144;return this['battlerSprites']()[_0x54e8c1(0x1da)](_0xe2a6c4=>_0xe2a6c4[_0x54e8c1(0x2d2)]());};function Sprite_VictoryGauge(){const _0x2d3bc2=_0x509144;this[_0x2d3bc2(0x1be)](...arguments);}Sprite_VictoryGauge[_0x509144(0x186)]=Object[_0x509144(0x2f8)](Sprite[_0x509144(0x186)]),Sprite_VictoryGauge['prototype'][_0x509144(0x1e1)]=Sprite_VictoryGauge,Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x1be)]=function(_0x212d55,_0x47e29c,_0x212422){const _0x352825=_0x509144;this['_index']=_0x212d55,this[_0x352825(0x275)]=_0x47e29c,this[_0x352825(0x244)]=_0x212422,Sprite[_0x352825(0x186)][_0x352825(0x1be)]['call'](this),this[_0x352825(0x1b4)](),this['createBitmap'](),this[_0x352825(0x2d1)](),this[_0x352825(0x194)]();},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x1b4)]=function(){const _0x396a96=_0x509144;this['_duration']=BattleManager[_0x396a96(0x183)],this['_currentlevel']=this[_0x396a96(0x28b)]()[_0x396a96(0x18f)],this['_showLevelUp']=![];},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x143)]=function(){const _0x482701=_0x509144;this[_0x482701(0x1eb)]=new Bitmap(this[_0x482701(0x244)],this[_0x482701(0x2db)]()*0x2);},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x2db)]=function(){const _0x3f28db=_0x509144;return Window_Base['prototype'][_0x3f28db(0x2db)]();},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x28b)]=function(){const _0xbefdf9=_0x509144;return BattleManager[_0xbefdf9(0x1b0)][this['_index']];},Sprite_VictoryGauge[_0x509144(0x186)]['update']=function(){const _0x26b5ac=_0x509144;Sprite[_0x26b5ac(0x186)]['update']['call'](this),this[_0x26b5ac(0x2f0)](),this['updateOpacity']();},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x2f0)]=function(){const _0x2f0c72=_0x509144;if(this[_0x2f0c72(0x20b)]<=0x0)return;const _0x23a7ea=this[_0x2f0c72(0x28b)]();this['_duration']--;this[_0x2f0c72(0x278)]()&&(this['_duration']=0x0);if(this[_0x2f0c72(0x20b)]<=0x0){const _0x3afc5b=$gameActors[_0x2f0c72(0x28b)](_0x23a7ea['_actorId']);_0x23a7ea['changeExp'](_0x3afc5b[_0x2f0c72(0x168)](),![]);}else _0x23a7ea[_0x2f0c72(0x1de)](BattleManager[_0x2f0c72(0x1d6)]);this[_0x2f0c72(0x2fe)]!==_0x23a7ea['level']&&(this[_0x2f0c72(0x2fe)]=_0x23a7ea[_0x2f0c72(0x18f)],this[_0x2f0c72(0x1fd)]=!![],SoundManager[_0x2f0c72(0x2f1)]()),this[_0x2f0c72(0x2d1)]();},Game_Actor[_0x509144(0x186)][_0x509144(0x1de)]=function(_0x217f2e){const _0x3a9b62=_0x509144,_0x418fcd=this['currentExp']()+_0x217f2e*this[_0x3a9b62(0x1b1)]();this['changeExp'](_0x418fcd,this[_0x3a9b62(0x2b5)]());},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x278)]=function(){const _0x23f7db=_0x509144;return SceneManager[_0x23f7db(0x1e7)][_0x23f7db(0x28f)]();},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x194)]=function(){const _0x32dc8b=_0x509144;this[_0x32dc8b(0x229)]=this['_mainWindow']['contentsOpacity'];},Sprite_VictoryGauge[_0x509144(0x186)]['refresh']=function(){const _0x41059d=_0x509144;this[_0x41059d(0x1eb)][_0x41059d(0x26c)](),this[_0x41059d(0x24a)](),this[_0x41059d(0x2ca)](),this[_0x41059d(0x18b)](),this[_0x41059d(0x1f0)](),this['drawExpGauge'](),this[_0x41059d(0x2b0)]();},Sprite_VictoryGauge[_0x509144(0x186)]['resetFontSettings']=function(){const _0x2af341=_0x509144;this[_0x2af341(0x1eb)][_0x2af341(0x180)]=$gameSystem[_0x2af341(0x281)](),this[_0x2af341(0x1eb)][_0x2af341(0x2d8)]=$gameSystem[_0x2af341(0x156)](),this[_0x2af341(0x1eb)]['textColor']=ColorManager['normalColor']();},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x2ca)]=function(){const _0x4b8893=_0x509144;this[_0x4b8893(0x24a)]();const _0x37f573=this['lineHeight'](),_0xd29df1=Math['round'](_0x37f573/0x2),_0x34cb29=0x0,_0x10aa2f=this[_0x4b8893(0x1eb)][_0x4b8893(0x197)]-_0x37f573,_0x192805=_0x4b8893(0x2cc),_0x2b0956=this[_0x4b8893(0x28b)]()[_0x4b8893(0x25f)]();this[_0x4b8893(0x1eb)][_0x4b8893(0x1bb)](_0x2b0956,_0xd29df1,_0x34cb29,_0x10aa2f,_0x37f573,_0x192805);},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x18b)]=function(){const _0x5d3497=_0x509144;this[_0x5d3497(0x24a)]();const _0xf34db4=this['lineHeight'](),_0x1f52f7=Math[_0x5d3497(0x214)](_0xf34db4/0x2),_0x58ed0d=0x0,_0x3c8894=this['bitmap']['width']-_0xf34db4,_0xda71e4=this[_0x5d3497(0x27b)]()===''?'right':_0x5d3497(0x1f3),_0x4ab791=TextManager[_0x5d3497(0x2d3)]['format'](this[_0x5d3497(0x28b)]()['level']);this['_showLevelUp']&&(this[_0x5d3497(0x1eb)][_0x5d3497(0x195)]=ColorManager[_0x5d3497(0x16b)]()),this['bitmap'][_0x5d3497(0x1bb)](_0x4ab791,_0x1f52f7,_0x58ed0d,_0x3c8894,_0xf34db4,_0xda71e4);},Sprite_VictoryGauge[_0x509144(0x186)]['getAdditionalRewardsText']=function(){const _0x308c8e=_0x509144,_0x5e9a50=$gameParty['members']()[this['_index']];if(!_0x5e9a50)return'';if(Imported[_0x308c8e(0x15a)]&&VisuMZ[_0x308c8e(0x176)]['Settings'][_0x308c8e(0x1d2)][_0x308c8e(0x2e3)])return VisuMZ[_0x308c8e(0x176)]['Settings'][_0x308c8e(0x1d2)]['AftermathText'][_0x308c8e(0x2a5)](_0x5e9a50['earnedJobPoints'](),TextManager[_0x308c8e(0x29a)],TextManager[_0x308c8e(0x1b2)]);if(Imported[_0x308c8e(0x240)]){const _0x127c1b=VisuMZ[_0x308c8e(0x217)][_0x308c8e(0x2e7)];if(_0x127c1b[_0x308c8e(0x1bf)][_0x308c8e(0x2e3)])return _0x127c1b[_0x308c8e(0x1bf)][_0x308c8e(0x162)][_0x308c8e(0x2a5)](_0x5e9a50[_0x308c8e(0x2d9)](),TextManager[_0x308c8e(0x216)],TextManager[_0x308c8e(0x2fb)]);if(_0x127c1b[_0x308c8e(0x1d2)]['AftermathActorDisplay'])return _0x127c1b[_0x308c8e(0x1d2)][_0x308c8e(0x162)][_0x308c8e(0x2a5)](_0x5e9a50['earnedJobPoints'](),TextManager[_0x308c8e(0x29a)],TextManager['jobPointsFull']);}if(Imported[_0x308c8e(0x271)]){const _0x23ffe8=VisuMZ[_0x308c8e(0x20f)]['Settings'];if(_0x23ffe8['AbilityPoints'][_0x308c8e(0x2e3)])return _0x23ffe8[_0x308c8e(0x17b)][_0x308c8e(0x162)][_0x308c8e(0x2a5)](_0x5e9a50[_0x308c8e(0x1a7)](),TextManager[_0x308c8e(0x26e)],TextManager[_0x308c8e(0x21e)]);if(_0x23ffe8[_0x308c8e(0x1c4)]['AftermathActorDisplay'])return _0x23ffe8[_0x308c8e(0x1c4)][_0x308c8e(0x162)][_0x308c8e(0x2a5)](_0x5e9a50[_0x308c8e(0x13d)](),TextManager[_0x308c8e(0x261)],TextManager[_0x308c8e(0x2a6)]);}return'';},Sprite_VictoryGauge[_0x509144(0x186)]['drawActorAdditionalRewards']=function(){const _0x30f710=_0x509144;this[_0x30f710(0x24a)]();const _0xde5f0f=this['lineHeight'](),_0x2437c5=Math[_0x30f710(0x214)](_0xde5f0f/0x2),_0x58ae9b=0x0,_0xfed5c3=this['bitmap'][_0x30f710(0x197)]-_0xde5f0f,_0x3e6214=_0x30f710(0x1f9);let _0x39b4c7=this[_0x30f710(0x27b)]();this[_0x30f710(0x1eb)][_0x30f710(0x1bb)](_0x39b4c7,_0x2437c5,_0x58ae9b,_0xfed5c3,_0xde5f0f,_0x3e6214);},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x263)]=function(){const _0x506e27=_0x509144,_0x43662c=this['lineHeight'](),_0x2aa8d7=this[_0x506e27(0x1eb)][_0x506e27(0x197)]-_0x43662c,_0x590a3d=Sprite_Gauge[_0x506e27(0x186)][_0x506e27(0x19c)](),_0x66331b=Math[_0x506e27(0x214)](_0x43662c/0x2),_0x19e47f=_0x43662c*0x2-_0x590a3d-0x2,_0x11339b=Math[_0x506e27(0x181)]((_0x2aa8d7-0x2)*this['actor']()[_0x506e27(0x2c8)]()),_0x367728=_0x590a3d-0x2,_0x311c52=this[_0x506e27(0x1fb)](),_0x21ecde=this['gaugeColor1'](),_0x295626=this[_0x506e27(0x2eb)]();if(Imported[_0x506e27(0x253)]){const _0x2fc308=VisuMZ['VisualGaugeStyles'][_0x506e27(0x2e7)]['battlerEXPStyle']??_0x506e27(0x154);this['bitmap'][_0x506e27(0x2af)](_0x2fc308,_0x66331b,_0x19e47f,_0x2aa8d7,_0x590a3d,this['actor']()[_0x506e27(0x2c8)](),_0x311c52,_0x21ecde,_0x295626);}else this[_0x506e27(0x1eb)][_0x506e27(0x172)](_0x66331b,_0x19e47f,_0x2aa8d7,_0x590a3d,_0x311c52),this['bitmap']['gradientFillRect'](_0x66331b+0x1,_0x19e47f+0x1,_0x11339b,_0x367728,_0x21ecde,_0x295626);},Sprite_VictoryGauge['prototype'][_0x509144(0x1fb)]=function(){const _0x252051=_0x509144;return ColorManager[_0x252051(0x1fb)]();},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x293)]=function(){const _0x101ed3=_0x509144;return this['actor']()[_0x101ed3(0x22c)]()?Imported[_0x101ed3(0x25e)]?ColorManager[_0x101ed3(0x19f)]():ColorManager[_0x101ed3(0x195)](0xe):Imported[_0x101ed3(0x25e)]?ColorManager[_0x101ed3(0x2d0)]():ColorManager[_0x101ed3(0x195)](0x1e);},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x2eb)]=function(){const _0x5dfb1c=_0x509144;return this[_0x5dfb1c(0x28b)]()[_0x5dfb1c(0x22c)]()?Imported['VisuMZ_0_CoreEngine']?ColorManager[_0x5dfb1c(0x170)]():ColorManager[_0x5dfb1c(0x195)](0x6):Imported[_0x5dfb1c(0x25e)]?ColorManager[_0x5dfb1c(0x2c2)]():ColorManager[_0x5dfb1c(0x195)](0x1f);},Sprite_VictoryGauge[_0x509144(0x186)][_0x509144(0x2b0)]=function(){const _0x5aa9a9=_0x509144;this[_0x5aa9a9(0x24a)]();const _0xfc38cc=this[_0x5aa9a9(0x2db)](),_0x51d63e=_0xfc38cc,_0x1e952d=_0xfc38cc;let _0x25fcd1=this['bitmap'][_0x5aa9a9(0x197)]-_0xfc38cc*0x2;const _0x169d4f=this[_0x5aa9a9(0x28b)]();let _0x1ed487=Math[_0x5aa9a9(0x214)](_0x169d4f[_0x5aa9a9(0x168)]()-_0x169d4f[_0x5aa9a9(0x251)]()),_0x4e5196='/'+Math[_0x5aa9a9(0x214)](_0x169d4f[_0x5aa9a9(0x22b)]()-_0x169d4f[_0x5aa9a9(0x251)]());Imported[_0x5aa9a9(0x25e)]&&VisuMZ[_0x5aa9a9(0x2de)]['Settings'][_0x5aa9a9(0x273)]['DigitGroupingStandardText']&&(_0x1ed487=VisuMZ[_0x5aa9a9(0x2a2)](_0x1ed487),_0x4e5196=VisuMZ[_0x5aa9a9(0x2a2)](_0x4e5196));this['_showLevelUp']?(this['bitmap'][_0x5aa9a9(0x195)]=ColorManager[_0x5aa9a9(0x23f)](),this[_0x5aa9a9(0x1eb)][_0x5aa9a9(0x1bb)](TextManager['victoryDisplayLvUp'],_0x51d63e,_0x1e952d,_0x25fcd1,_0xfc38cc,_0x5aa9a9(0x2cc))):this['bitmap'][_0x5aa9a9(0x1bb)](TextManager[_0x5aa9a9(0x1c5)],_0x51d63e,_0x1e952d,_0x25fcd1,_0xfc38cc,_0x5aa9a9(0x2cc));this[_0x5aa9a9(0x24a)]();if(_0x169d4f['isMaxLevel']()){this[_0x5aa9a9(0x1eb)][_0x5aa9a9(0x1bb)](_0x5aa9a9(0x17e),_0x51d63e,_0x1e952d,_0x25fcd1,_0xfc38cc,_0x5aa9a9(0x1f9));return;}this['bitmap'][_0x5aa9a9(0x2d8)]-=0x8,this[_0x5aa9a9(0x1eb)][_0x5aa9a9(0x195)]=ColorManager[_0x5aa9a9(0x195)](0x8),this[_0x5aa9a9(0x1eb)][_0x5aa9a9(0x1bb)](_0x4e5196,_0x51d63e,_0x1e952d,_0x25fcd1,_0xfc38cc,_0x5aa9a9(0x1f9)),_0x25fcd1-=this['bitmap'][_0x5aa9a9(0x231)](_0x4e5196),this[_0x5aa9a9(0x24a)](),this[_0x5aa9a9(0x1eb)][_0x5aa9a9(0x1bb)](_0x1ed487,_0x51d63e,_0x1e952d,_0x25fcd1,_0xfc38cc,_0x5aa9a9(0x1f9));};function _0xca77(_0x3a702c,_0x2d64e4){const _0x4bf002=_0x4bf0();return _0xca77=function(_0xca77f6,_0x284cf5){_0xca77f6=_0xca77f6-0x138;let _0xa7866f=_0x4bf002[_0xca77f6];return _0xa7866f;},_0xca77(_0x3a702c,_0x2d64e4);}function Window_VictoryContinueMessage(){const _0x2fc087=_0x509144;this[_0x2fc087(0x1be)](...arguments);}Window_VictoryContinueMessage[_0x509144(0x186)]=Object['create'](Window_Base[_0x509144(0x186)]),Window_VictoryContinueMessage[_0x509144(0x186)]['constructor']=Window_VictoryContinueMessage,Window_VictoryContinueMessage['prototype'][_0x509144(0x1be)]=function(_0x21205c){const _0x5bbfd6=_0x509144;Window_Base['prototype'][_0x5bbfd6(0x1be)][_0x5bbfd6(0x26b)](this,_0x21205c),this[_0x5bbfd6(0x14d)](0x2),this[_0x5bbfd6(0x2d1)]();},Window_VictoryContinueMessage[_0x509144(0x186)]['setDelayDuration']=function(_0x46db3c){const _0x229d39=_0x509144;this[_0x229d39(0x13f)]=_0x46db3c,this[_0x229d39(0x1ea)]=0x0;},Window_VictoryContinueMessage['prototype']['updatePadding']=function(){const _0x7b97ca=_0x509144;this[_0x7b97ca(0x2d7)]=0x0;},Window_VictoryContinueMessage[_0x509144(0x186)][_0x509144(0x1dd)]=function(){const _0x29fb6b=_0x509144;Window_Base[_0x29fb6b(0x186)][_0x29fb6b(0x1dd)][_0x29fb6b(0x26b)](this),this[_0x29fb6b(0x2ac)]();},Window_VictoryContinueMessage[_0x509144(0x186)]['updateContentsOpacity']=function(){const _0x54fe6a=_0x509144;this[_0x54fe6a(0x13f)]>0x0&&this[_0x54fe6a(0x278)]()&&(this[_0x54fe6a(0x13f)]=0x0,Input[_0x54fe6a(0x26c)](),TouchInput['clear']());if(this[_0x54fe6a(0x13f)]-->0x0)return;this[_0x54fe6a(0x1ea)]+=Window_VictoryRewards['_opacitySpeed'];},Window_VictoryContinueMessage[_0x509144(0x186)]['isFastForwarded']=function(){const _0x382bcb=_0x509144;return Input['isPressed']('ok')||Input[_0x382bcb(0x13b)](_0x382bcb(0x2da))||TouchInput[_0x382bcb(0x13b)]();},Window_VictoryContinueMessage[_0x509144(0x186)]['refresh']=function(){const _0x5861f8=_0x509144;this[_0x5861f8(0x277)][_0x5861f8(0x26c)]();const _0x1c63aa=TextManager[_0x5861f8(0x267)];let _0x46fc91=TextManager[_0x5861f8(0x16e)],_0x5d5f57=TextManager[_0x5861f8(0x2f9)];Imported[_0x5861f8(0x25e)]&&(_0x46fc91=TextManager['getInputButtonString']('ok'),_0x5d5f57=TextManager[_0x5861f8(0x283)](_0x5861f8(0x2da)));const _0x5f2b43=_0x1c63aa['format'](_0x46fc91,_0x5d5f57),_0x1e4960=this['textSizeEx'](_0x5f2b43)['width'],_0x51767f=Math[_0x5861f8(0x214)]((this[_0x5861f8(0x15f)]-_0x1e4960)/0x2);this[_0x5861f8(0x2dc)](_0x5f2b43,_0x51767f,0x0,_0x1e4960);},Window_VictoryContinueMessage['prototype']['isContinueReady']=function(){const _0x506119=_0x509144;return this[_0x506119(0x13f)]<=0x0;};function Window_VictoryRewards(){const _0x355ad0=_0x509144;this[_0x355ad0(0x1be)](...arguments);}Window_VictoryRewards[_0x509144(0x2e6)]=VisuMZ[_0x509144(0x1af)]['Settings'][_0x509144(0x254)]['FadeInSpeed'],Window_VictoryRewards[_0x509144(0x186)]=Object[_0x509144(0x2f8)](Window_StatusBase[_0x509144(0x186)]),Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x1e1)]=Window_VictoryRewards,Window_VictoryRewards[_0x509144(0x186)]['initialize']=function(_0x29987a){const _0x2aaf9a=_0x509144;Window_StatusBase[_0x2aaf9a(0x186)][_0x2aaf9a(0x1be)][_0x2aaf9a(0x26b)](this,_0x29987a),this[_0x2aaf9a(0x14d)](0x2),this[_0x2aaf9a(0x1ea)]=0x0,this['refresh']();},Window_VictoryRewards['prototype'][_0x509144(0x200)]=function(){this['padding']=0x0;},Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x1dd)]=function(){const _0xa09196=_0x509144;Window_StatusBase['prototype']['update'][_0xa09196(0x26b)](this),this[_0xa09196(0x2ac)]();},Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x2ac)]=function(){const _0x340986=_0x509144;SceneManager[_0x340986(0x1e7)][_0x340986(0x2aa)]===_0x340986(0x1c7)?this[_0x340986(0x1ea)]+=Window_VictoryRewards[_0x340986(0x2e6)]:this['contentsOpacity']-=Window_VictoryRewards['_opacitySpeed'];},Window_VictoryRewards[_0x509144(0x186)]['mirrorContents']=function(){const _0x17c18b=_0x509144;return VisuMZ[_0x17c18b(0x1af)]['Settings'][_0x17c18b(0x254)][_0x17c18b(0x2ec)];},Window_VictoryRewards['prototype'][_0x509144(0x2d1)]=function(){const _0x4f7c44=_0x509144;Window_StatusBase[_0x4f7c44(0x186)][_0x4f7c44(0x2d1)]['call'](this),this[_0x4f7c44(0x277)]['clear'](),this[_0x4f7c44(0x24a)](),this['drawBackgroundElements'](),this[_0x4f7c44(0x279)](),this['drawItemGainTitle'](),this[_0x4f7c44(0x18e)](),this[_0x4f7c44(0x2b1)]();},Window_VictoryRewards[_0x509144(0x171)]=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)][_0x509144(0x254)][_0x509144(0x23d)]??_0x509144(0x15c),Window_VictoryRewards['BG_COLOR_2']=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)][_0x509144(0x254)]['bgColor2']??_0x509144(0x152),Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x196)]=function(){const _0x154bd5=_0x509144,_0x9f8041=this[_0x154bd5(0x2db)](),_0x5ac0c5=0x0,_0x25f32d=_0x9f8041*2.5,_0x28c83a=Window_VictoryRewards[_0x154bd5(0x171)],_0x492fca=Window_VictoryRewards[_0x154bd5(0x1c2)],_0x2bcb53=ColorManager[_0x154bd5(0x29f)]();this['contents'][_0x154bd5(0x169)](_0x5ac0c5,_0x25f32d,this[_0x154bd5(0x197)],this['height']-_0x25f32d-_0x9f8041*1.5,_0x28c83a,_0x492fca),this['contents'][_0x154bd5(0x172)](0x0,_0x25f32d-0x1,this[_0x154bd5(0x197)],0x2,_0x2bcb53),this[_0x154bd5(0x277)]['fillRect'](0x0,this['height']-_0x9f8041*1.5-0x1,this[_0x154bd5(0x197)],0x2,_0x2bcb53);const _0x572bb4=this['mirrorContents'](),_0x37ec60=_0x572bb4?Math['round'](this['width']/0x2+0x28):0x64,_0x33d16e=_0x25f32d-_0x9f8041*0.75,_0x1b61cf=TextManager[_0x154bd5(0x2c6)];this[_0x154bd5(0x1e2)](),this[_0x154bd5(0x1e2)](),this[_0x154bd5(0x1bb)](_0x1b61cf,_0x37ec60,_0x33d16e,this['width']);},Window_VictoryRewards['_rewardSets']=VisuMZ['VictoryAftermath'][_0x509144(0x2e7)]['Rewards'],Window_VictoryRewards[_0x509144(0x186)]['drawRewards']=function(){const _0x58a180=_0x509144;this[_0x58a180(0x24a)]();const _0x2a652c=this[_0x58a180(0x1c8)](),_0x4f0ab3=this[_0x58a180(0x2db)](),_0x1a00a5=Math['floor'](_0x4f0ab3/0x2),_0x217173=_0x2a652c?Math[_0x58a180(0x214)](this[_0x58a180(0x197)]/0x2+0x28):0x64,_0x159688=Math[_0x58a180(0x214)](_0x4f0ab3*3.5),_0x311705=Math[_0x58a180(0x214)](this['width']/0x2-0x8c),_0x869da8=_0x311705-_0x1a00a5-0x50;let _0x318ba8=_0x159688;for(const _0x140dda of Window_VictoryRewards[_0x58a180(0x20e)]){if(!_0x140dda[_0x58a180(0x2e2)]())continue;this[_0x58a180(0x182)](_0x217173,_0x318ba8,_0x311705),this[_0x58a180(0x230)](ColorManager[_0x58a180(0x184)]()),this[_0x58a180(0x1bb)](_0x140dda[_0x58a180(0x2c9)](),_0x217173+_0x1a00a5,_0x318ba8,_0x869da8),this[_0x58a180(0x230)](ColorManager['normalColor']());const _0x212c4d=_0x140dda[_0x58a180(0x165)]();Imported[_0x58a180(0x25d)]&&_0x140dda['Text']()===TextManager[_0x58a180(0x1fc)]?this[_0x58a180(0x166)](_0x212c4d,TextManager[_0x58a180(0x1fc)],_0x217173+_0x1a00a5,_0x318ba8,_0x869da8):this['drawText'](_0x212c4d,_0x217173+_0x1a00a5,_0x318ba8,_0x869da8,_0x58a180(0x1f9)),_0x318ba8+=_0x4f0ab3;}},Window_VictoryRewards[_0x509144(0x1ee)]=VisuMZ[_0x509144(0x1af)]['Settings'][_0x509144(0x254)][_0x509144(0x1ca)]??'rgba(0,\x200,\x200,\x201)',Window_VictoryRewards[_0x509144(0x28d)]=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)][_0x509144(0x254)][_0x509144(0x1c1)]??_0x509144(0x247),Window_VictoryRewards[_0x509144(0x186)]['drawRewardStrip']=function(_0x43689f,_0x64eaa3,_0x1d3441){const _0xcdb19=_0x509144,_0x2e390=this[_0xcdb19(0x2db)]()-0x2,_0x5b9ddf=Math[_0xcdb19(0x181)](_0x2e390/0x2),_0x201319=Window_VictoryRewards[_0xcdb19(0x1ee)],_0x3da67e=Window_VictoryRewards[_0xcdb19(0x28d)],_0x103c9f=0x50,_0x1f3291=_0x1d3441-_0x5b9ddf-_0x103c9f;!ImageManager[_0xcdb19(0x2b2)]&&(ImageManager['victoryRewardBitmap']=new Bitmap(_0x1d3441,_0x2e390),ImageManager[_0xcdb19(0x2b2)][_0xcdb19(0x2e5)]=this[_0xcdb19(0x2c5)](),ImageManager[_0xcdb19(0x2b2)][_0xcdb19(0x29c)](_0x5b9ddf,_0x5b9ddf,_0x5b9ddf,_0x201319),ImageManager[_0xcdb19(0x2b2)][_0xcdb19(0x245)](_0x5b9ddf,0x0,_0x2e390,_0x2e390),ImageManager[_0xcdb19(0x2b2)]['fillRect'](_0x5b9ddf,0x0,_0x1f3291,_0x2e390,_0x201319),ImageManager['victoryRewardBitmap']['gradientFillRect'](_0x5b9ddf+_0x1f3291,0x0,_0x103c9f,_0x2e390,_0x201319,_0x3da67e)),this[_0xcdb19(0x277)][_0xcdb19(0x19e)](ImageManager[_0xcdb19(0x2b2)],0x0,0x0,_0x1d3441,_0x2e390,_0x43689f,_0x64eaa3,_0x1d3441,_0x2e390);},Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x2b8)]=function(){const _0xc8bb43=_0x509144;this[_0xc8bb43(0x24a)]();if(BattleManager[_0xc8bb43(0x1b3)][_0xc8bb43(0x173)][_0xc8bb43(0x2ea)]<=0x0)return;const _0x4509ac=this[_0xc8bb43(0x1c8)](),_0x2a1c4b=this[_0xc8bb43(0x2db)](),_0x4cd2e2=_0x4509ac?0x8c:Math['round'](this[_0xc8bb43(0x197)]/0x2+0x28),_0x585e30=Math[_0xc8bb43(0x214)](_0x2a1c4b*0x3),_0x1f84f5=Math[_0xc8bb43(0x214)](this[_0xc8bb43(0x197)]/0x2-0x8c),_0x53d9f1=TextManager[_0xc8bb43(0x13e)],_0x151f64=ColorManager['normalColor']();this[_0xc8bb43(0x1e2)](),this[_0xc8bb43(0x1bb)](_0x53d9f1,_0x4cd2e2,_0x585e30,_0x1f84f5,_0xc8bb43(0x2cc));const _0x2a27f6=_0x4509ac?0x64:Math[_0xc8bb43(0x214)](this[_0xc8bb43(0x197)]/0x2),_0xa750d8=_0x585e30+_0x2a1c4b*1.5,_0x1d457a=Math['round'](this[_0xc8bb43(0x197)]/0x2)-0x64;this[_0xc8bb43(0x277)][_0xc8bb43(0x172)](_0x2a27f6,_0xa750d8,_0x1d457a,0x2,_0x151f64);},Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x18e)]=function(){const _0x390ada=_0x509144,_0xd5f843=this[_0x390ada(0x1c8)](),_0x3120de=this[_0x390ada(0x2db)](),_0x3c0d51=_0xd5f843?0x64:Math['round'](this['width']/0x2+0x28),_0x3a69e8=Math[_0x390ada(0x214)](_0x3120de*0x5),_0x48cd79=Math['round'](this[_0x390ada(0x197)]/0x2-0x8c),_0x17595b=this['height']-_0x3a69e8-_0x3120de*0x2,_0x4106c9=new Rectangle(_0x3c0d51,_0x3a69e8,_0x48cd79,_0x17595b);this['_itemGainWindow']=new Window_VictoryItem(_0x4106c9,this),this[_0x390ada(0x1a6)](this[_0x390ada(0x1aa)]);},Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x2b1)]=function(){const _0x448475=_0x509144;this[_0x448475(0x24a)]();const _0x204c6d=this[_0x448475(0x1c8)](),_0x4833e9=this[_0x448475(0x2db)](),_0x1d2b7a=$gameParty['maxBattleMembers'](),_0x21323f=_0x204c6d?Math[_0x448475(0x214)](this['width']/0x2+0x28):0x64,_0xd57d60=this[_0x448475(0x18c)]-1.5-_0x4833e9*0x2*(_0x1d2b7a+0x1),_0x1b794a=Math[_0x448475(0x214)](this[_0x448475(0x197)]/0x2-0x8c);let _0x319ced=Math[_0x448475(0x214)](_0xd57d60);if(VisuMZ[_0x448475(0x1af)][_0x448475(0x2e7)][_0x448475(0x254)][_0x448475(0x1cd)]??!![])for(let _0x338501=0x0;_0x338501<_0x1d2b7a;_0x338501++){if(!$gameParty['members']()[_0x338501])continue;this[_0x448475(0x2c7)](_0x21323f,_0x319ced,_0x1b794a),this['placeActorGauges'](_0x338501,_0x21323f,_0x319ced,_0x1b794a),_0x319ced+=_0x4833e9*0x2;}},Window_VictoryRewards[_0x509144(0x151)]=VisuMZ['VictoryAftermath'][_0x509144(0x2e7)][_0x509144(0x254)][_0x509144(0x1ca)]??_0x509144(0x27c),Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x2c7)]=function(_0x4a6692,_0x57b6e3,_0x3943ed){const _0x3b5e27=_0x509144,_0x46edbe=this[_0x3b5e27(0x2db)]()-0x2,_0x3994c7=Math[_0x3b5e27(0x181)](_0x46edbe/0x2),_0x542ca1=Window_VictoryRewards[_0x3b5e27(0x151)],_0x5ee99e=_0x3943ed-_0x46edbe;!ImageManager[_0x3b5e27(0x287)]&&(ImageManager['victoryNameBitmap']=new Bitmap(_0x3943ed,_0x46edbe),ImageManager['victoryNameBitmap'][_0x3b5e27(0x2e5)]=this['translucentOpacity'](),ImageManager[_0x3b5e27(0x287)][_0x3b5e27(0x29c)](_0x3994c7,_0x3994c7,_0x3994c7,_0x542ca1),ImageManager[_0x3b5e27(0x287)]['drawCircle'](_0x3994c7+_0x5ee99e,_0x3994c7,_0x3994c7,_0x542ca1),ImageManager[_0x3b5e27(0x287)][_0x3b5e27(0x245)](_0x3994c7,0x0,_0x5ee99e,_0x46edbe),ImageManager[_0x3b5e27(0x287)][_0x3b5e27(0x172)](_0x3994c7,0x0,_0x5ee99e,_0x46edbe,_0x542ca1)),this[_0x3b5e27(0x277)][_0x3b5e27(0x19e)](ImageManager[_0x3b5e27(0x287)],0x0,0x0,_0x3943ed,_0x46edbe,_0x4a6692,_0x57b6e3,_0x3943ed,_0x46edbe);},Window_VictoryRewards[_0x509144(0x186)]['placeActorGauges']=function(_0x18a680,_0xc3f712,_0x3150ef,_0x57f9d1){const _0x31d0c7=_0x509144,_0x6d036c='actor%1-gauge'[_0x31d0c7(0x2a5)](_0x18a680),_0xc47e27=this['createGaugeSprite'](_0x6d036c,_0x18a680,_0x57f9d1);_0xc47e27['move'](_0xc3f712,_0x3150ef),_0xc47e27[_0x31d0c7(0x1ae)]();},Window_VictoryRewards[_0x509144(0x186)][_0x509144(0x1b5)]=function(_0x420f22,_0x4b7a02,_0x54563d){const _0x10f2bf=_0x509144,_0x4b5b35=this['_additionalSprites'];if(_0x4b5b35[_0x420f22])return _0x4b5b35[_0x420f22];else{const _0x487dda=new Sprite_VictoryGauge(_0x4b7a02,this,_0x54563d);return _0x4b5b35[_0x420f22]=_0x487dda,this[_0x10f2bf(0x1e4)](_0x487dda),_0x487dda;}};function Window_VictoryItem(){this['initialize'](...arguments);}Window_VictoryItem[_0x509144(0x186)]=Object[_0x509144(0x2f8)](Window_ItemList['prototype']),Window_VictoryItem[_0x509144(0x186)][_0x509144(0x1e1)]=Window_VictoryItem,Window_VictoryItem[_0x509144(0x1f4)]=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)][_0x509144(0x254)][_0x509144(0x1ce)]??'ID',Window_VictoryItem[_0x509144(0x186)][_0x509144(0x1be)]=function(_0x49c937,_0x4d04a5){const _0x47bc57=_0x509144;this[_0x47bc57(0x275)]=_0x4d04a5,Window_ItemList[_0x47bc57(0x186)]['initialize'][_0x47bc57(0x26b)](this,_0x49c937),this[_0x47bc57(0x14d)](0x2),this[_0x47bc57(0x2d1)](),this['updateContentsOpacity'](),this[_0x47bc57(0x16d)]['length']>this[_0x47bc57(0x23e)]()&&(this['activate'](),this['select'](0x0));},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x19a)]=function(){const _0x3124a4=_0x509144;return Window_Base['prototype'][_0x3124a4(0x19a)][_0x3124a4(0x26b)](this);},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x200)]=function(){const _0xcb9f21=_0x509144;this[_0xcb9f21(0x2d7)]=0x0;},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x1bc)]=function(){return 0x1;},Window_VictoryItem['prototype']['colSpacing']=function(){return 0x0;},Window_VictoryItem['prototype'][_0x509144(0x1dd)]=function(){Window_ItemList['prototype']['update']['call'](this),this['updateContentsOpacity']();},Window_VictoryItem['prototype']['updateContentsOpacity']=function(){const _0x1f6113=_0x509144;this['contentsOpacity']=this[_0x1f6113(0x275)][_0x1f6113(0x1ea)];},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x25c)]=function(){const _0x4f545f=_0x509144,_0x7abfa7=BattleManager[_0x4f545f(0x1b3)][_0x4f545f(0x173)];_0x7abfa7[_0x4f545f(0x1fa)]((_0x2abfc7,_0x1b0c6e)=>_0x2abfc7['id']-_0x1b0c6e['id']);const _0x283c6e=_0x7abfa7['filter'](_0x8bbdbd=>DataManager[_0x4f545f(0x179)](_0x8bbdbd)),_0x324ab6=_0x7abfa7[_0x4f545f(0x16f)](_0x58dd04=>DataManager['isWeapon'](_0x58dd04)),_0x585e58=_0x7abfa7[_0x4f545f(0x16f)](_0x8b7a02=>DataManager[_0x4f545f(0x15e)](_0x8b7a02));this[_0x4f545f(0x16d)]=_0x283c6e['concat'](_0x324ab6)[_0x4f545f(0x1a0)](_0x585e58),this['_data']=this[_0x4f545f(0x16d)][_0x4f545f(0x16f)]((_0x1243aa,_0x52b5b5,_0x683529)=>_0x683529['indexOf'](_0x1243aa)===_0x52b5b5),this[_0x4f545f(0x28a)]();},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x28a)]=function(){const _0x25e6e3=_0x509144,_0x365f77=Window_VictoryItem[_0x25e6e3(0x1f4)][_0x25e6e3(0x1d8)]()[_0x25e6e3(0x14c)]();if(_0x365f77===_0x25e6e3(0x25f)&&this[_0x25e6e3(0x16d)][_0x25e6e3(0x2ea)]>0x0)return this['_data'][_0x25e6e3(0x1fa)]((_0xaf3d87,_0x2f5ecb)=>_0xaf3d87[_0x25e6e3(0x25f)][_0x25e6e3(0x2f2)](_0x2f5ecb[_0x25e6e3(0x25f)]));},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x226)]=function(_0x58f168){return!![];},Window_VictoryItem[_0x509144(0x186)]['isShowNew']=function(){return![];},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x250)]=function(_0x4c00ca){const _0x592ea=_0x509144;return BattleManager[_0x592ea(0x1b3)][_0x592ea(0x173)][_0x592ea(0x16f)](_0x8c7571=>_0x8c7571===_0x4c00ca)[_0x592ea(0x2ea)];},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x2bb)]=function(_0x2e1f52){},Window_VictoryItem[_0x509144(0x186)][_0x509144(0x284)]=function(_0x436dd0,_0x2a2e27,_0x24d4d6,_0x4b0a79){const _0x1446e1=_0x509144;let _0x29ae3f=_0x1446e1(0x159);Imported[_0x1446e1(0x14b)]&&(_0x29ae3f=VisuMZ[_0x1446e1(0x2cd)][_0x1446e1(0x2e7)][_0x1446e1(0x1d4)][_0x1446e1(0x1f1)]);let _0x3101d1=_0x29ae3f[_0x1446e1(0x2a5)](this[_0x1446e1(0x250)](_0x436dd0));this[_0x1446e1(0x1bb)](_0x3101d1,_0x2a2e27,_0x24d4d6,_0x4b0a79,_0x1446e1(0x1f9));};function _0x4bf0(){const _0x4e02b8=['createActorSprite','initVictoryBgm','Param','drawText','maxCols','createSubWindow','initialize','ClassPoints','Enable','rewardStrip2','BG_COLOR_2','NewSkillQuotes','SkillPoints','exp','AutoBattleAutoSkip','rewards','mirrorContents','victoryNewSkillFmt','rewardStrip1','LevelUpQuotes','isVictoryPhase','ShowExpGauges','DropsSortBy','2282324ifiFgJ','Game_Actor_performVictory','levelups','JobPoints','isBattleMember','ItemScene','WaitBossCollapse','_tempActorExpGain','SystemBypassVictoryMusic','toLowerCase','VisuMZ_1_MainMenuCore','some','_victoryContinueWindow','push','update','gainTempExp','drawLevelUpQuote','_victoryActorIndex','constructor','makeFontBigger','getColorDataFromPluginParameters','addInnerChild','done','playBattleVoice','_scene','return\x200','isBypassVictoryAftermathMotion','contentsOpacity','bitmap','volume','processVictoryStep','REWARD_STRIP_COLOR_1','NUM','drawActorAdditionalRewards','ItemQuantityFmt','findNewSkills','center','SORT_TYPE','inBattle','index','_actor','processVictoryAftermathTransition','right','sort','gaugeBackColor','currencyUnit','_showLevelUp','bypassVictoryMusic','HideLevelDiff','updatePadding','_victoryAftermathSettings','getVictoryBgm','_victoryWindows','removeVictoryLevelUpBuffer','shift','victoryAftermathSettings','_showFace','playSe','BattleVictoryJS','FUNC','_duration','setActor','bypassVictoryMotion','_rewardSets','SkillLearnSystem','_victoryBgm','_colorCache','isActor','#%1','round','setVictoryBgm','classPointsAbbr','ClassChangeSystem','victoryFullScreenWindowRect','9pBAwHQ','isSceneBattle','createVictorySteps','LvUpPitch','removeBattleStates','abilityPointsFull','_effectType','4959415SNCVbP','bossCollapse','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','LvFmt','prepareVictoryAftermathTransition','_victorySteps','isEnabled','_drawParamDiff','includes','opacity','loadPicture','nextLevelExp','isMaxLevel','_showBust','_victoryRewardsWindow','makeTempActors','changeTextColor','measureTextWidth','getColor','STR','LvUp','isContinueReady','performVictory','14tcSfsE','Game_Actor_isBattleMember','VisuMZ_1_MessageCore','ARRAYSTR','SystemBypassVictoryPhase','maxBattleMembers','bgColor1','maxVisibleItems','victoryLevelUpColor','VisuMZ_2_ClassChangeSystem','createVictoryRewardsWindow','processPostBattleCommonEvents','clamp','_fullWidth','clearRect','ShowBust','rgba(0,\x200,\x200,\x200)','scale','hideWindowsForVictoryAftermath','resetFontSettings','_subWindow','parse','allowUpdateBattleAniSpeed','drawParamName','hideSubInputWindows','itemCount','currentLevelExp','LvUpVolume','VisuMZ_3_VisualGaugeStyles','General','bypassVictoryPhase','drawItemName','drawActorFace','549772fmxpWB','Scene_Battle_allowUpdateBattleAniSpeed','faceWidth','replayBgmAndBgs','makeItemList','VisuMZ_3_VisualGoldDisplay','VisuMZ_0_CoreEngine','name','drawParamChanges','skillPointsAbbr','getMenuImage','drawExpGauge','toUpperCase','parameters','itemPadding','victoryContinueFmt','MessageWidth','createVictoryStepLevelUps','isBypassVictoryAftermathPhase','call','clear','Game_Actor_shouldDisplayLevelUp','abilityPointsAbbr','UpdateDuration','Bgm','VisuMZ_2_SkillLearnSystem','paramValueFontSize','QoL','MaxSkills','_mainWindow','drawNewLearnedSkillsList','contents','isFastForwarded','drawRewards','victory-level-up-color','getAdditionalRewardsText','rgba(0,\x200,\x200,\x201)','exit','ActorQuotesNewSkillClear','paramValueByName','drawParamAfterValue','mainFontFace','status','getInputButtonString','drawItemNumber','ActorQuotesNewSkillAdd','ConvertParams','victoryNameBitmap','_mapBgm','ShowFace','sortItemList','actor','setup','REWARD_STRIP_COLOR_2','makeDeepCopy','isVictoryContinueReady','collapse','drawItemDarkRect','ExtDisplayedParams','gaugeColor1','param','(+%1)','map','processVictory','BustPosY','processVictoryAftermathParty','jobPointsAbbr','afterActor','drawCircle','ARRAYEVAL','skills','normalColor','bind','LvUpPan','GroupDigits','drawNewLearnedSkillsBackground','_autoBattle','format','skillPointsFull','drawLevelMessage','gainRewards','levelUpQuotes','_victoryStep','setActionState','updateContentsOpacity','createVictoryStepRewards','initVictoryAftermath','drawVisualStyleGauge','drawExpValues','drawPartyExpGauges','victoryRewardBitmap','split','max','shouldDisplayLevelUp','_victoryLevelUpWindow','_autoBattleVictorySkip','drawItemGainTitle','processVictoryAftermath','BackRectColor','drawItemBackground','_victoryTempActorsB','makeVictoryCopy','364950oXvNPK','ActorQuotesLevelUpClear','PostBattleBgm','randomInt','expGaugeColor2','updateVictoryPhase','processBattleCoreJS','translucentOpacity','victoryDisplayTitle','drawActorNameStrip','expRate','Text','drawActorName','ShowParamDiff','left','ItemsEquipsCore','isRepeated','getQuoteWidth','expGaugeColor1','refresh','isCollapsing','victoryDisplayLvFmt','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','processVictoryAftermathRewards','_victoryPhase','padding','fontSize','earnedClassPoints','cancel','lineHeight','drawTextEx','SystemBypassVictoryMotion','CoreEngine','makeRewards','pan','ContinueFmt','Show','AftermathActorDisplay','ActorID','paintOpacity','_opacitySpeed','Settings','newSkillQuotes','drawParamDiffValue','length','gaugeColor2','MirrorContents','BattleManager_initMembers','description','JSON','updateExpGain','playVictoryLevelUpSFX','localeCompare','checkVictoryAftermathAutoBattleAutoSkip','actorParams','ActorQuotesLevelUpAdd','registerCommand','ARRAYFUNC','create','victoryKeyCancel','3812008bDeNCZ','classPointsFull','setupVictoryLevelUpNextActor','LvUpColor','_currentlevel','_spriteset','589921CMMUge','ARRAYNUM','Game_System_initialize','Scene_Battle_update','isPressed','NewQuotes','earnedSkillPoints','victoryDisplayItem','_delayDuration','LevelUp','Bypass','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','createBitmap','victoryContinueMessageWindowRect','_victoryLevelUpBuffer','paramchangeTextColor','quoteLevelUp','battleMembers','createVictoryContinueMessageWindow','playVictoryBgm','VisuMZ_1_ItemsEquipsCore','trim','setBackgroundType','boxWidth','createVictoryLevelUpWindow','getQuoteText','ACTOR_STRIP_COLOR_1','rgba(0,\x200,\x200,\x200.4)','HideDelayMS','arrow','MessageCore','mainFontSize','_victoryAftermathLevelUpQuotes','32371410gnmruu','x%1','VisuMZ_X_Template','_victoryAftermathCopy','rgba(0,\x200,\x200,\x200.8)','getVictoryAftermathBackColor','isArmor','innerWidth','note','_victoryLevelUpSFX','AftermathText','isBusy','KeyOK','Data','drawCurrencyValue','pitch','currentExp','gradientFillRect','LvUpSfx','powerUpColor','match','_data','victoryKeyOk','filter','maxLvGaugeColor2','BG_COLOR_1','fillRect','items','BattleVictory','Victory','Template','BustScale','VisuMZ_1_OptionsCore','isItem','VisuMZ_3_BattleVoices','AbilityPoints','quoteLevelSkill','drawNewLearnedSkills','MAX\x20LEVEL','ARRAYJSON','fontFace','floor','drawRewardStrip','_victoryUpdateDuration','systemColor','skipVictoryAftermathTransition','prototype','ARRAYSTRUCT','addChildToBack','isVictoryLevelUpPhaseEnabled','playBgm','drawActorLevel','height','ShowDelayMS','makeItemGainWindow','level','Game_Actor_setup','anchor','setupVictoryAftermathQuotes','drawParamBeforeValue','updateOpacity','textColor','drawBackgroundElements','width','onVictoryStepLevelUpMember','victoryDisplayLvUp','itemHeight','finishVictoryPhase','gaugeHeight','WaitRegularCollapse','blt','maxLvGaugeColor1','concat','textSizeEx','Vocab','createVictoryAftermathWindows','loadFaceImages','processVictoryAftermathMusic','addChild','earnedAbilityPoints','24yIUjdj','isBypassVictoryAftermathMusic','_itemGainWindow','beforeActor','setVisibleUI','_victoryAftermathNewSkillQuotes','show','VictoryAftermath','_victoryTempActorsA','finalExpRate','jobPointsFull','_rewards','initMembers','createGaugeSprite','_actorSprite','updateVictorySteps'];_0x4bf0=function(){return _0x4e02b8;};return _0x4bf0();}function Window_VictoryLevelUp(){const _0x4a1590=_0x509144;this[_0x4a1590(0x1be)](...arguments);}Window_VictoryLevelUp['_opacitySpeed']=Window_VictoryRewards['_opacitySpeed'],Window_VictoryLevelUp[_0x509144(0x22d)]=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)][_0x509144(0x140)][_0x509144(0x246)],Window_VictoryLevelUp[_0x509144(0x186)]=Object[_0x509144(0x2f8)](Window_StatusBase[_0x509144(0x186)]),Window_VictoryLevelUp[_0x509144(0x186)]['constructor']=Window_VictoryLevelUp,Window_VictoryLevelUp[_0x509144(0x186)][_0x509144(0x1be)]=function(_0xb6ffbf){const _0x4882ae=_0x509144;Window_StatusBase[_0x4882ae(0x186)][_0x4882ae(0x1be)]['call'](this,_0xb6ffbf),this[_0x4882ae(0x14d)](0x2),this[_0x4882ae(0x1ea)]=0x0,this[_0x4882ae(0x2d1)](),this['createActorSprite'](),this[_0x4882ae(0x1bd)]();},Window_VictoryLevelUp[_0x509144(0x186)][_0x509144(0x200)]=function(){this['padding']=0x0;},Window_VictoryLevelUp[_0x509144(0x186)][_0x509144(0x1dd)]=function(){const _0x392f36=_0x509144;Window_StatusBase[_0x392f36(0x186)][_0x392f36(0x1dd)][_0x392f36(0x26b)](this),this[_0x392f36(0x2ac)]();},Window_VictoryLevelUp[_0x509144(0x186)][_0x509144(0x2ac)]=function(){const _0x39edae=_0x509144;SceneManager['_scene'][_0x39edae(0x2aa)]===_0x39edae(0x1d1)?this[_0x39edae(0x1ea)]+=Window_VictoryLevelUp[_0x39edae(0x2e6)]:this[_0x39edae(0x1ea)]-=Window_VictoryLevelUp['_opacitySpeed'],this[_0x39edae(0x1b6)]&&(this[_0x39edae(0x1b6)][_0x39edae(0x229)]=this[_0x39edae(0x1ea)]);},Window_VictoryLevelUp[_0x509144(0x186)][_0x509144(0x2d1)]=function(){const _0xf59bf9=_0x509144;Window_StatusBase[_0xf59bf9(0x186)][_0xf59bf9(0x2d1)][_0xf59bf9(0x26b)](this),this[_0xf59bf9(0x277)][_0xf59bf9(0x26c)](),this['resetFontSettings'](),this[_0xf59bf9(0x196)]();},Window_VictoryLevelUp['prototype'][_0x509144(0x196)]=function(){const _0x4e51be=_0x509144,_0x3d0952=this[_0x4e51be(0x2db)](),_0x394e65=Window_VictoryRewards[_0x4e51be(0x171)],_0x2e9ac8=Window_VictoryRewards[_0x4e51be(0x1c2)],_0x3d381c=ColorManager['normalColor'](),_0x3f2707=SceneManager[_0x4e51be(0x1e7)]['_victoryContinueWindow']['x'],_0x4e96ea=Math[_0x4e51be(0x214)](this[_0x4e51be(0x197)]/0x2);this[_0x4e51be(0x277)]['gradientFillRect'](_0x3f2707,0x0,_0x4e96ea,this[_0x4e51be(0x18c)],_0x2e9ac8,_0x394e65,!![]),this[_0x4e51be(0x277)][_0x4e51be(0x172)](_0x3f2707-0x1,0x0,0x2,this['height'],_0x3d381c),this[_0x4e51be(0x277)][_0x4e51be(0x172)](_0x3f2707+_0x4e96ea-0x1,0x0,0x2,this[_0x4e51be(0x18c)],_0x3d381c);const _0x2e685b=_0x3d0952,_0x24f7af=_0x3d0952*0x1;this[_0x4e51be(0x277)][_0x4e51be(0x169)](0x0,_0x2e685b,this[_0x4e51be(0x197)],_0x24f7af,_0x394e65,_0x2e9ac8),this[_0x4e51be(0x277)]['fillRect'](0x0,_0x2e685b-0x1,this[_0x4e51be(0x197)],0x2,_0x3d381c),this['contents']['fillRect'](0x0,_0x2e685b+_0x24f7af-0x1,this[_0x4e51be(0x197)],0x2,_0x3d381c);const _0x5f3880=this[_0x4e51be(0x18c)]-_0x3d0952*5.5,_0x57341b=_0x3d0952*0x4;this[_0x4e51be(0x277)][_0x4e51be(0x169)](0x0,_0x5f3880,this[_0x4e51be(0x197)],_0x57341b,_0x394e65,_0x2e9ac8),this[_0x4e51be(0x277)][_0x4e51be(0x169)](0x0,_0x5f3880,this[_0x4e51be(0x197)],_0x57341b,_0x2e9ac8,_0x394e65),this['contents'][_0x4e51be(0x172)](0x0,_0x5f3880-0x2,this[_0x4e51be(0x197)],0x2,_0x3d381c),this[_0x4e51be(0x277)][_0x4e51be(0x172)](0x0,_0x5f3880+_0x57341b,this[_0x4e51be(0x197)],0x2,_0x3d381c);},Window_VictoryLevelUp['prototype'][_0x509144(0x1b8)]=function(){const _0x1a3ebe=_0x509144,_0x5aba21=VisuMZ[_0x1a3ebe(0x1af)][_0x1a3ebe(0x2e7)][_0x1a3ebe(0x140)];this['_actorSprite']=new Sprite(),this[_0x1a3ebe(0x1b6)]['anchor']['x']=0.5,this[_0x1a3ebe(0x1b6)][_0x1a3ebe(0x191)]['y']=0x1,this[_0x1a3ebe(0x1b6)][_0x1a3ebe(0x229)]=0x0,this[_0x1a3ebe(0x1b6)]['x']=Math[_0x1a3ebe(0x214)](eval(_0x5aba21['BustPosX'])),this[_0x1a3ebe(0x1b6)]['y']=Math[_0x1a3ebe(0x214)](eval(_0x5aba21[_0x1a3ebe(0x298)])),this[_0x1a3ebe(0x1b6)][_0x1a3ebe(0x248)]['x']=_0x5aba21[_0x1a3ebe(0x177)],this[_0x1a3ebe(0x1b6)][_0x1a3ebe(0x248)]['y']=_0x5aba21[_0x1a3ebe(0x177)],this[_0x1a3ebe(0x188)](this[_0x1a3ebe(0x1b6)]);},Window_VictoryLevelUp[_0x509144(0x186)][_0x509144(0x1bd)]=function(){const _0x4d1362=_0x509144,_0xbdacdb=new Rectangle(0x0,0x0,this['width'],this['height']);this[_0x4d1362(0x24b)]=new Window_VictoryLevelUpActor(_0xbdacdb,this),this[_0x4d1362(0x1a6)](this[_0x4d1362(0x24b)]);},Window_VictoryLevelUp[_0x509144(0x186)][_0x509144(0x20c)]=function(_0x33f262){const _0x28afa2=_0x509144;Imported[_0x28afa2(0x1d9)]&&Window_VictoryLevelUp[_0x28afa2(0x22d)]&&(this['_actorSprite'][_0x28afa2(0x1eb)]=ImageManager[_0x28afa2(0x22a)](_0x33f262[_0x28afa2(0x262)]())),SoundManager[_0x28afa2(0x2f1)](),this[_0x28afa2(0x24b)][_0x28afa2(0x20c)](_0x33f262);};function Window_VictoryLevelUpActor(){const _0x248e51=_0x509144;this[_0x248e51(0x1be)](...arguments);}Window_VictoryLevelUpActor[_0x509144(0x2e6)]=Window_VictoryRewards['_opacitySpeed'],Window_VictoryLevelUpActor[_0x509144(0x227)]=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)][_0x509144(0x140)][_0x509144(0x2cb)],Window_VictoryLevelUpActor[_0x509144(0x207)]=VisuMZ[_0x509144(0x1af)][_0x509144(0x2e7)]['LevelUp'][_0x509144(0x289)],Window_VictoryLevelUpActor[_0x509144(0x186)]=Object[_0x509144(0x2f8)](Window_StatusBase[_0x509144(0x186)]),Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x1e1)]=Window_VictoryLevelUpActor,Window_VictoryLevelUpActor[_0x509144(0x186)]['initialize']=function(_0x367647,_0x4219e4){const _0x2d5cd9=_0x509144;this['_mainWindow']=_0x4219e4,Window_StatusBase[_0x2d5cd9(0x186)][_0x2d5cd9(0x1be)]['call'](this,_0x367647),this[_0x2d5cd9(0x14d)](0x2),this['contentsOpacity']=0x0,this[_0x2d5cd9(0x1f7)]=null,this['refresh']();},Window_VictoryLevelUpActor[_0x509144(0x186)]['updatePadding']=function(){this['padding']=0x0;},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x1dd)]=function(){const _0x563568=_0x509144;Window_StatusBase[_0x563568(0x186)][_0x563568(0x1dd)]['call'](this),this[_0x563568(0x2ac)]();},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x2ac)]=function(){const _0x225983=_0x509144;this[_0x225983(0x1ea)]=this[_0x225983(0x275)][_0x225983(0x1ea)];},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x20c)]=function(_0x519d7b){const _0x48c59d=_0x509144;this[_0x48c59d(0x1f7)]=_0x519d7b,this['refresh']();},Window_VictoryLevelUpActor[_0x509144(0x186)]['beforeActor']=function(){const _0x2d7d63=_0x509144,_0x18c423=this[_0x2d7d63(0x1f7)][_0x2d7d63(0x1f6)]();return BattleManager[_0x2d7d63(0x2bc)][_0x18c423];},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x29b)]=function(){const _0x22a844=_0x509144,_0x318d2b=this[_0x22a844(0x1f7)][_0x22a844(0x1f6)]();return BattleManager['_victoryTempActorsA'][_0x318d2b];},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x2d1)]=function(){const _0x3e8311=_0x509144;Window_StatusBase[_0x3e8311(0x186)][_0x3e8311(0x2d1)][_0x3e8311(0x26b)](this),this[_0x3e8311(0x277)][_0x3e8311(0x26c)](),this[_0x3e8311(0x24a)]();if(!this['_actor'])return;this['drawLevelMessage'](),this['drawParamChanges'](),this[_0x3e8311(0x17d)](),this[_0x3e8311(0x1df)]();},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x2a7)]=function(){const _0x214af4=_0x509144,_0x559964=this['lineHeight'](),_0x1488e4=TextManager['levelUp']['format'](this[_0x214af4(0x1f7)]['name'](),TextManager[_0x214af4(0x18f)],this[_0x214af4(0x1f7)]['level']),_0x5d41ba=this[_0x214af4(0x1a1)](_0x1488e4)[_0x214af4(0x197)],_0x415db7=SceneManager[_0x214af4(0x1e7)][_0x214af4(0x1db)]['x']+Math[_0x214af4(0x214)]((this[_0x214af4(0x197)]/0x2-_0x5d41ba)/0x2),_0x543137=_0x559964;this[_0x214af4(0x2dc)](_0x1488e4,_0x415db7,_0x543137,_0x5d41ba);},Window_VictoryLevelUpActor['prototype'][_0x509144(0x291)]=function(_0x2b9d34,_0x34213c,_0x4d497a,_0x34d35f,_0x1e608d){const _0x2cda6a=_0x509144;if(VisuMZ['VictoryAftermath'][_0x2cda6a(0x2e7)]['LevelUp']['DrawBackRect']===![])return;_0x1e608d=Math[_0x2cda6a(0x2b4)](_0x1e608d||0x1,0x1);while(_0x1e608d--){_0x34d35f=_0x34d35f||this[_0x2cda6a(0x2db)](),this['contents']['paintOpacity']=0xa0;const _0x4200c3=ColorManager[_0x2cda6a(0x15d)]();this['contents'][_0x2cda6a(0x172)](_0x2b9d34+0x1,_0x34213c+0x1,_0x4d497a-0x2,_0x34d35f-0x2,_0x4200c3),this['contents'][_0x2cda6a(0x2e5)]=0xff;}},ColorManager[_0x509144(0x15d)]=function(){const _0x5ae226=_0x509144,_0x2ce553=VisuMZ['VictoryAftermath'][_0x5ae226(0x2e7)][_0x5ae226(0x140)];let _0x47b97f=_0x2ce553['BackRectColor']!==undefined?_0x2ce553[_0x5ae226(0x2ba)]:0x13;return ColorManager[_0x5ae226(0x232)](_0x47b97f);},Window_VictoryLevelUpActor['prototype'][_0x509144(0x260)]=function(){const _0x242c46=_0x509144,_0x407955=this[_0x242c46(0x2db)](),_0x4356eb='→',_0x16184a=this[_0x242c46(0x2f4)](),_0x4da415=_0x407955*0x2,_0x3efd92=this[_0x242c46(0x18c)]-_0x407955*5.5,_0x50e808=this['textWidth'](_0x4356eb)+this['itemPadding']()*0x2,_0x4b754a=Window_VictoryLevelUpActor[_0x242c46(0x227)]?0x4:0x3,_0xeb470c=Math[_0x242c46(0x214)]((this[_0x242c46(0x197)]/0x2-_0x50e808-this[_0x242c46(0x266)]()*0x2)/_0x4b754a),_0x35cbe7=_0x3efd92-_0x4da415,_0x21b887=VisuMZ[_0x242c46(0x1af)][_0x242c46(0x2e7)][_0x242c46(0x140)][_0x242c46(0x1ff)],_0x38cfaf=SceneManager[_0x242c46(0x1e7)][_0x242c46(0x1db)]['x']+this[_0x242c46(0x266)](),_0x398f30=_0x38cfaf+_0xeb470c,_0x53f9cb=_0x398f30+_0xeb470c,_0x11f7aa=_0x53f9cb+_0x50e808,_0x21222f=_0x11f7aa+_0xeb470c;let _0x588f6d=Math[_0x242c46(0x214)](_0x4da415+(_0x35cbe7-(_0x16184a[_0x242c46(0x2ea)]+(_0x21b887?0x0:0x1))*_0x407955)/0x2),_0x2d0d08=0x2;!_0x21b887&&(this['resetFontSettings'](),VisuMZ[_0x242c46(0x2cd)]&&(this[_0x242c46(0x277)][_0x242c46(0x2d8)]=Window_EquipStatus[_0x242c46(0x186)][_0x242c46(0x272)]()),this[_0x242c46(0x291)](_0x38cfaf,_0x588f6d,_0xeb470c,_0x407955,_0x2d0d08),this[_0x242c46(0x24e)](_0x242c46(0x18f),_0x38cfaf,_0x588f6d,_0xeb470c),this[_0x242c46(0x291)](_0x398f30,_0x588f6d,_0xeb470c,_0x407955,_0x2d0d08),this[_0x242c46(0x193)]('level',_0x398f30,_0x588f6d,_0xeb470c),this[_0x242c46(0x291)](_0x53f9cb,_0x588f6d,_0x50e808,_0x407955,_0x2d0d08),this[_0x242c46(0x230)](ColorManager[_0x242c46(0x184)]()),this[_0x242c46(0x1bb)](_0x4356eb,_0x53f9cb,_0x588f6d,_0x50e808,_0x242c46(0x1f3)),this[_0x242c46(0x291)](_0x11f7aa,_0x588f6d,_0xeb470c,_0x407955,_0x2d0d08),this[_0x242c46(0x280)](_0x242c46(0x18f),_0x11f7aa,_0x588f6d,_0xeb470c),Window_VictoryLevelUpActor[_0x242c46(0x227)]&&(this['drawItemDarkRect'](_0x21222f,_0x588f6d,_0xeb470c,_0x407955,_0x2d0d08),this[_0x242c46(0x2e9)](_0x242c46(0x18f),_0x21222f,_0x588f6d,_0xeb470c)),_0x588f6d+=_0x407955,_0x2d0d08=_0x2d0d08===0x2?0x1:0x2);for(const _0x28cdab of _0x16184a){this['resetFontSettings'](),VisuMZ['ItemsEquipsCore']&&(this[_0x242c46(0x277)][_0x242c46(0x2d8)]=Window_EquipStatus[_0x242c46(0x186)]['paramValueFontSize']()),this['drawItemDarkRect'](_0x38cfaf,_0x588f6d,_0xeb470c,_0x407955,_0x2d0d08),this[_0x242c46(0x24e)](_0x28cdab,_0x38cfaf,_0x588f6d,_0xeb470c),this[_0x242c46(0x291)](_0x398f30,_0x588f6d,_0xeb470c,_0x407955,_0x2d0d08),this[_0x242c46(0x193)](_0x28cdab,_0x398f30,_0x588f6d,_0xeb470c),this[_0x242c46(0x291)](_0x53f9cb,_0x588f6d,_0x50e808,_0x407955,_0x2d0d08),this[_0x242c46(0x230)](ColorManager[_0x242c46(0x184)]()),this[_0x242c46(0x1bb)](_0x4356eb,_0x53f9cb,_0x588f6d,_0x50e808,_0x242c46(0x1f3)),this[_0x242c46(0x291)](_0x11f7aa,_0x588f6d,_0xeb470c,_0x407955,_0x2d0d08),this['drawParamAfterValue'](_0x28cdab,_0x11f7aa,_0x588f6d,_0xeb470c),Window_VictoryLevelUpActor['_drawParamDiff']&&(this['drawItemDarkRect'](_0x21222f,_0x588f6d,_0xeb470c,_0x407955,_0x2d0d08),this[_0x242c46(0x2e9)](_0x28cdab,_0x21222f,_0x588f6d,_0xeb470c)),_0x588f6d+=_0x407955,_0x2d0d08=_0x2d0d08===0x2?0x1:0x2;}},Window_VictoryLevelUpActor['prototype'][_0x509144(0x2f4)]=function(){const _0x91f82b=_0x509144;return Imported[_0x91f82b(0x25e)]?VisuMZ['CoreEngine'][_0x91f82b(0x2e7)][_0x91f82b(0x1ba)][_0x91f82b(0x292)]:[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x24e)]=function(_0x210055,_0x4d07c3,_0x52fda4,_0x43023e){const _0x32e03b=_0x509144;this[_0x32e03b(0x230)](ColorManager[_0x32e03b(0x184)]());let _0x38fa01='';_0x210055===_0x32e03b(0x18f)?_0x38fa01=TextManager[_0x32e03b(0x18f)]:_0x38fa01=TextManager['param'](_0x210055),this[_0x32e03b(0x1bb)](_0x38fa01,_0x4d07c3+this[_0x32e03b(0x266)](),_0x52fda4,_0x43023e-this[_0x32e03b(0x266)]()*0x2);},Window_VictoryLevelUpActor['prototype'][_0x509144(0x193)]=function(_0x1fb1aa,_0x423ffd,_0x1d4419,_0x4304d0){const _0x529ca2=_0x509144,_0x4b697a=this[_0x529ca2(0x1ab)]();let _0x4edd43='';_0x1fb1aa===_0x529ca2(0x18f)?_0x4edd43=_0x4b697a[_0x529ca2(0x18f)]:_0x4edd43=Imported[_0x529ca2(0x25e)]?_0x4b697a[_0x529ca2(0x27f)](_0x1fb1aa,!![]):_0x4b697a['param'](_0x1fb1aa),this[_0x529ca2(0x230)](ColorManager[_0x529ca2(0x29f)]()),this[_0x529ca2(0x1bb)](_0x4edd43,_0x423ffd+this['itemPadding'](),_0x1d4419,_0x4304d0-this[_0x529ca2(0x266)]()*0x2,'right');},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x280)]=function(_0x504779,_0x53bd07,_0xca59bb,_0x3527d5){const _0x46d001=_0x509144,_0x10b070=this['beforeActor'](),_0xdb02e9=this[_0x46d001(0x1f7)];let _0x229e04=0x0,_0x24f110=0x0,_0x4d9c40='0';_0x504779===_0x46d001(0x18f)?(_0x229e04=_0x10b070[_0x46d001(0x18f)],_0x24f110=_0xdb02e9[_0x46d001(0x18f)],_0x4d9c40=_0x24f110):(_0x229e04=Imported['VisuMZ_0_CoreEngine']?_0x10b070['paramValueByName'](_0x504779,![]):_0x10b070[_0x46d001(0x294)](_0x504779),_0x24f110=Imported['VisuMZ_0_CoreEngine']?_0xdb02e9[_0x46d001(0x27f)](_0x504779,![]):_0xdb02e9['param'](_0x504779),_0x4d9c40=Imported[_0x46d001(0x25e)]?_0xdb02e9[_0x46d001(0x27f)](_0x504779,!![]):_0x24f110);const _0x187253=_0x24f110-_0x229e04;this[_0x46d001(0x230)](ColorManager[_0x46d001(0x146)](_0x187253)),this[_0x46d001(0x1bb)](_0x4d9c40,_0x53bd07+this['itemPadding'](),_0xca59bb,_0x3527d5-this[_0x46d001(0x266)]()*0x2,_0x46d001(0x1f9));},Window_VictoryLevelUpActor['prototype']['drawParamDiffValue']=function(_0x3f9c22,_0x465713,_0x3608d,_0x3bcbcd){const _0x5c914f=_0x509144,_0x3b3cd2=this[_0x5c914f(0x1ab)](),_0x5dd9f3=this[_0x5c914f(0x1f7)];let _0xd3e3c8=0x0,_0x53300d=0x0;_0x3f9c22==='level'?(_0xd3e3c8=_0x3b3cd2[_0x5c914f(0x18f)],_0x53300d=_0x5dd9f3[_0x5c914f(0x18f)]):(_0xd3e3c8=Imported['VisuMZ_0_CoreEngine']?_0x3b3cd2[_0x5c914f(0x27f)](_0x3f9c22,![]):_0x3b3cd2[_0x5c914f(0x294)](_0x3f9c22),_0x53300d=Imported[_0x5c914f(0x25e)]?_0x5dd9f3['paramValueByName'](_0x3f9c22,![]):_0x5dd9f3[_0x5c914f(0x294)](_0x3f9c22));const _0x52ad15=_0x53300d-_0xd3e3c8;let _0x330398=_0x52ad15;if(_0xd3e3c8%0x1!==0x0)_0x330398=Math[_0x5c914f(0x214)](_0x52ad15*0x64)+'%';_0x52ad15!==0x0&&(this[_0x5c914f(0x230)](ColorManager[_0x5c914f(0x146)](_0x52ad15)),_0x330398=(_0x52ad15>=0x0?_0x5c914f(0x295):'(%1)')[_0x5c914f(0x2a5)](_0x330398),this[_0x5c914f(0x1bb)](_0x330398,_0x465713+this[_0x5c914f(0x266)](),_0x3608d,_0x3bcbcd-this[_0x5c914f(0x266)]()*0x2,_0x5c914f(0x2cc)));},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x17d)]=function(){const _0x2f50d3=_0x509144;this[_0x2f50d3(0x24a)]();const _0x272105=this[_0x2f50d3(0x1f2)]();if(_0x272105[_0x2f50d3(0x2ea)]<=0x0)return;const _0x18c430=VisuMZ[_0x2f50d3(0x1af)]['Settings'][_0x2f50d3(0x140)][_0x2f50d3(0x274)];while(_0x272105[_0x2f50d3(0x2ea)]>_0x18c430){_0x272105['pop']();}this[_0x2f50d3(0x2a3)](_0x272105),this[_0x2f50d3(0x276)](_0x272105);},Window_VictoryLevelUpActor['prototype']['findNewSkills']=function(){const _0x2e9720=_0x509144,_0x5eb542=this[_0x2e9720(0x1ab)]()[_0x2e9720(0x29e)]();return this[_0x2e9720(0x1f7)][_0x2e9720(0x1f2)](_0x5eb542);},Window_VictoryLevelUpActor['prototype'][_0x509144(0x2a3)]=function(_0x5ee21b){const _0x34a28f=_0x509144,_0x31e4bd=this[_0x34a28f(0x2db)](),_0x1088a7=Window_VictoryRewards['BG_COLOR_1'],_0x3ee808=Window_VictoryRewards[_0x34a28f(0x1c2)],_0x221183=ColorManager[_0x34a28f(0x29f)](),_0x10a347=Math[_0x34a28f(0x214)](this[_0x34a28f(0x197)]/0x2)-0x64-_0x31e4bd*0x2,_0x2e9659=(_0x5ee21b[_0x34a28f(0x2ea)]+0x1)*_0x31e4bd,_0x107a72=_0x31e4bd,_0x365f5e=this[_0x34a28f(0x18c)]-_0x31e4bd*6.5-_0x2e9659;this[_0x34a28f(0x277)][_0x34a28f(0x172)](_0x107a72-0x2,_0x365f5e-0x2,_0x10a347+0x4,_0x2e9659+0x4,_0x221183),this['contents'][_0x34a28f(0x245)](_0x107a72,_0x365f5e,_0x10a347,_0x2e9659),this[_0x34a28f(0x277)][_0x34a28f(0x169)](_0x107a72,_0x365f5e,_0x10a347,_0x2e9659,_0x1088a7,_0x3ee808);},Window_VictoryLevelUpActor[_0x509144(0x186)][_0x509144(0x276)]=function(_0x4163bf){const _0x5ef263=_0x509144,_0x2ec7b6=this['lineHeight'](),_0x5a5995=Window_VictoryRewards['BG_COLOR_1'],_0x14c7f8=Window_VictoryRewards['BG_COLOR_2'],_0x4196a9=ColorManager['normalColor'](),_0x553d28=Math[_0x5ef263(0x214)](this[_0x5ef263(0x197)]/0x2)-0x64-(_0x2ec7b6+this[_0x5ef263(0x266)]())*0x2,_0xd05535=(_0x4163bf[_0x5ef263(0x2ea)]+0x1)*_0x2ec7b6;let _0x1e1fff=_0x2ec7b6+this[_0x5ef263(0x266)](),_0x59c0a2=this[_0x5ef263(0x18c)]-_0x2ec7b6*6.5-_0xd05535;const _0x59014d=TextManager[_0x5ef263(0x1c9)]['format'](this[_0x5ef263(0x1f7)][_0x5ef263(0x25f)]()),_0xa5e1d8=this[_0x5ef263(0x1a1)](_0x59014d)[_0x5ef263(0x197)],_0x45f031=Math[_0x5ef263(0x214)](_0x1e1fff+(_0x553d28-_0xa5e1d8)/0x2);this[_0x5ef263(0x2dc)](_0x59014d,_0x45f031,_0x59c0a2,_0xa5e1d8),_0x59c0a2+=_0x2ec7b6,this[_0x5ef263(0x277)][_0x5ef263(0x172)](_0x1e1fff,_0x59c0a2-0x1,_0x553d28,0x2,_0x4196a9);for(const _0x4b566e of _0x4163bf){if(!_0x4b566e)continue;this[_0x5ef263(0x24a)](),this[_0x5ef263(0x256)](_0x4b566e,_0x1e1fff+this[_0x5ef263(0x266)](),_0x59c0a2,_0x553d28-this['itemPadding']()*0x2),_0x59c0a2+=_0x2ec7b6;}},Window_VictoryLevelUpActor['prototype']['drawLevelUpQuote']=function(){const _0x47a338=_0x509144,_0x203702=this[_0x47a338(0x2db)](),_0x300f91=Window_VictoryLevelUpActor[_0x47a338(0x207)],_0x4a8d9a=this[_0x47a338(0x2cf)](),_0x49f547=_0x203702*0x4,_0x18b3ce=Math['round']((this[_0x47a338(0x197)]-_0x4a8d9a)/0x2),_0x282257=_0x18b3ce+(_0x300f91?ImageManager[_0x47a338(0x25a)]+0x14:0x0),_0x4e8d8f=this[_0x47a338(0x18c)]-_0x203702*5.5;let _0xdf2cd3=this['getQuoteText']();_0x300f91&&this[_0x47a338(0x257)](this[_0x47a338(0x1f7)],_0x18b3ce,_0x4e8d8f,ImageManager[_0x47a338(0x25a)],ImageManager['faceHeight']),this['drawTextEx'](_0xdf2cd3,_0x282257,_0x4e8d8f,_0x4a8d9a-_0x282257);},Window_VictoryLevelUpActor['prototype'][_0x509144(0x2cf)]=function(){const _0xdb67b0=_0x509144;let _0x16b084=Graphics[_0xdb67b0(0x14e)];return Imported[_0xdb67b0(0x239)]&&(_0x16b084=Math['min'](_0x16b084,VisuMZ[_0xdb67b0(0x155)][_0xdb67b0(0x2e7)][_0xdb67b0(0x254)][_0xdb67b0(0x268)])),_0x16b084-this[_0xdb67b0(0x266)]()*0x2;},Window_VictoryLevelUpActor['prototype'][_0x509144(0x150)]=function(){const _0x164140=_0x509144;return this[_0x164140(0x1f2)]()['length']>0x0?TextManager[_0x164140(0x17c)](this[_0x164140(0x1f7)])[_0x164140(0x2a5)](this['_actor'][_0x164140(0x25f)]()):TextManager[_0x164140(0x147)](this['_actor'])[_0x164140(0x2a5)](this[_0x164140(0x1f7)][_0x164140(0x25f)]());};