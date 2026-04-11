//=============================================================================
// VisuStella MZ - Multi-Layer HP Gauge
// VisuMZ_4_MultiLayerHpGauge.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_MultiLayerHpGauge = true;

var VisuMZ = VisuMZ || {};
VisuMZ.MultiLayerHpGauge = VisuMZ.MultiLayerHpGauge || {};
VisuMZ.MultiLayerHpGauge.version = 1.03;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.03] [MultiLayerHpGauge]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Multi-Layer_HP_Gauge_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Want to give certain enemies some more significance than others? Like giving
 * them a giant Multi-Layer HP Gauge spread across the top of the screen in a
 * super imposing type of fashion? This plugin will do just that! Multi-Layer
 * HP Gauges can contain upwards of 10 layers while displaying all of their
 * states in a spread out fashion. Your players will know this enemy is a boss
 * that means business.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Designate which database enemies will have their HP Gauges put on display
 *   at the top of the screen to indicate their importance.
 * * These HP gauges can have multiple layers of health bars to make for a
 *   better representation of how tanky they are.
 * * Control the colors associated with each HP Gauge layer to allow for better
 *   distinctions on how close the player is to defeating the enemy.
 * * Up to a total of 10 different HP Gauge Layers can be used with different
 *   color settings for each layer.
 * * Adds states to be displayed in wide form in order to display more than
 *   the current style of rotating states.
 * * Lots of extra features with other VisuStella plugins if they are installed
 *   together with this plugin.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 4 ------
 *
 * This plugin is a Tier 4 plugin. Place it under other plugins of lower tier
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
 * Battle Log Position Shift
 * 
 * The Battle Log is usually displayed at the top of the screen. This plugin
 * will shift the Battle Log down by a specified amount depending on the number
 * of Multi-Layer HP Gauges are displayed on screen at a time. You can adjust
 * the amount the shift occurs. If you want to disable this, change the shift
 * amount to 0.
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
 * VisuMZ_3_StateTooltips
 *
 * If VisuStella MZ's State Tooltips plugin is installed, players can also view
 * state tooltips when hovering the mouse over the respective Multi-Layer HP
 * Gauge sheets.
 *
 * ---
 *
 * VisuMZ_3_VisualGaugeStyles
 *
 * If VisuStella MZ's Visual Gauge Styles plugin is installed, you can apply
 * gauge styles to the Multi-Layer HP Gauges for this plugin.
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
 * VisuMZ_1_BattleCore
 * 
 * To reduce redundancy, there are options to remove the HP Gauges if an enemy
 * already has a dedicated Multi-Layer HP Gauge shown at the top of the screen.
 * Likewise, the same is done for state icons.
 * 
 * If you don't want these UI elements removed, you can disable this change by
 * altering the respective Plugin Parameters.
 * 
 * ---
 * 
 * VisuMZ's Battle Systems
 * 
 * Since the position of the Multi-Layer HP Gauge will most likely overlap with
 * any turn order or action count UI elements at the top of the screen, this
 * plugin provides the option to offset them via how many Multi-Layer HP Gauge
 * rows are present.
 * 
 * ---
 * 
 * VisuMZ_4_BreakShields
 * 
 * As Break Shields can be displayed in part with the state icons, the reduced
 * redundancy Plugin Parameters allow the UI elements to be removed as to not
 * clutter upt he screen too much.
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
 * === Enemy-Related Notetags ===
 * 
 * ---
 *
 * <Show Multi-Layer HP Gauge>
 * <Hide Multi-Layer HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Determines if the enemy will have the Multi-Layer HP Gauge visible or not
 *   and bypasses the default setting found in the Plugin Parameters.
 * - Keep in mind that using any of the other notetags found below will also
 *   prompt the Multi-Layer HP Gauge to 'Show'. This makes the 'Show' notetag a
 *   bit redundant but it is there for those who want extra clarity in their
 *   note boxes.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Persist>
 * <Multi-Layer HP Gauge Temporal>
 *
 * - Used for: Enemy Notetags
 * - Determines if the Multi-Layer HP Gauge is persistant or temporal and will
 *   bypass the default settings found in the Plugin Parameters.
 * - When 'Persist' is used, the Multi-Layer HP Gauge will stay visible even
 *   after the enemy tied to it has died in combat.
 * - When 'Temporal' is used, the Multi-Layer HP Gauge will vanish after the
 *   enemy tied to it has died in combat, although it will reappear if it is
 *   revived later.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Layers: x>
 *
 * - Used for: Enemy Notetags
 * - Sets the total number of layers used for the enemy as 'x' layers.
 * - Replace 'x' with a number representing a number between 1 and 10 as the
 *   total number of layers used.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge Face: filename, index>
 * <Multi-Layer HP Gauge Graphic: filename, index>
 * <Multi-Layer HP Gauge Face Graphic: filename, index>
 *
 * - Used for: Enemy Notetags
 * - Changes the graphic used by the enemy to this face graphic.
 * - Replace 'filename' with the name of the image file to pick from the game
 *   project's /img/faces/ folder.
 *   - Filenames are case sensitive.
 *   - Leave out the filename extension from the notetag.
 * - Replace 'index' with a number representing the face graphic cell used.
 *   - Index values start at 0.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * <Multi-Layer HP Gauge BgColor: color1>
 * <Multi-Layer HP Gauge BG Color: color1>
 * <Multi-Layer HP Gauge Background Color: color1>
 * 
 * <Multi-Layer HP Gauge BgColor: color1, color2>
 * <Multi-Layer HP Gauge BG Color: color1, color2>
 * <Multi-Layer HP Gauge Background Color: color1, color2>
 *
 * - Used for: Enemy Notetags
 * - Adjusts the background color(s) used for the enemy graphic.
 * - Replace 'color1' and/or 'color2' with either a number from 0 to 31
 *   representing the text color or in the format of '#rrggbb' to custom pick a
 *   hex color.
 * - If two colors are used, a vertical gradient will form.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 * 
 * EXAMPLES:
 * 
 *   <Multi-Layer HP Gauge BgColor: 2>
 *   <Multi-Layer HP Gauge BgColor: #ff0000>
 *   <Multi-Layer HP Gauge BgColor: 2, 18>
 *   <Multi-Layer HP Gauge BgColor: #ff0000, #000000>
 *
 * ---
 *
 * <Multi-Layer HP Gauge Border Color: color>
 *
 * - Used for: Enemy Notetags
 * - Adjusts the border color used for the enemy graphic.
 * - Replace 'color' with either a number from 0 to 31 representing the text
 *   color or in the format of '#rrggbb' to custom pick a hex color.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 * 
 * EXAMPLES:
 * 
 *   <Multi-Layer HP Gauge Border Color: 2>
 *   <Multi-Layer HP Gauge Border Color: #ff0000>
 *
 * ---
 *
 * <Multi-Layer HP Gauge Border Size: x>
 * <Multi-Layer HP Gauge Border Thick: x>
 * <Multi-Layer HP Gauge Border Thickness: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the thickness of the color section of the border.
 * - Replace 'x' with a number representing how thick the color section of the
 *   border is in pixels.
 * - The notetag variants do the same thing. Which you choose to use is
 *   entirely up to personal preference.
 * - Also sets the visibility of the Multi-Layer HP Gauge to 'Show'.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Adjust the general settings for the Multi-Layer HP Gauge.
 *
 * ---
 *
 * Screen
 * 
 *   Max Width:
 *   - What is the max screen area that is taken up by Multi-Layer HP Gauges?
 * 
 *   Gauges Per Row:
 *   - How many gauges are displayed per row?
 *   - When the quantity exceeds this number, start a new row.
 * 
 *   Row Spacing:
 *   - How many pixels are used inbetween rows to space out the stacked
 *     Multi-Layer HP Gauges?
 * 
 *   Mid-Battle Fade Speed:
 *   - How fast should the gauges fade out mid-battle?
 *   - Lower numbers are slower. Higher numbers are faster.
 * 
 *   End Battle Fade Speed:
 *   - How fast should the gauges fade out on ending battle?
 *   - Lower numbers are slower. Higher numbers are faster.
 *
 * ---
 *
 * Properties
 * 
 *   Buffer X:
 *   - What is the minimum pixel distance between individual parts?
 * 
 *   Enable State Tooltips:
 *   - Enables state tooltips when hovered over?
 *   - Requires VisuMZ_3_StateTooltips!
 * 
 *   Graphic Size:
 *   - What is the standard pixel size for the enemy graphic?
 *   - This value is also used to adjust individual part positions.
 * 
 *   Reposition for Help?:
 *   - Reposition the gauges when the Help Window is open?
 * 
 *     Reposition Y:
 *     - How many pixels to offset the gauge reposition?
 *     - Negative: up. Positive: down.
 * 
 *   Update Frequency:
 *   - How many frames of wait should there be before updating the individual
 *     Multi-Layer HP Gauges?
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the whole gauge's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the whole gauge's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Battle Log
 * 
 *   Reposition Window?:
 *   - Repositions the battle log window to make room for the
 *     Multi-Layer HP Gauge?
 * 
 *   Per Row Offset Y:
 *   - Offset Battle Log's Y by this amount per row?
 *   - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Default Settings
 * ============================================================================
 *
 * These are the default values used for this plugin. These settings can be
 * individually changed via notetags.
 *
 * ---
 *
 * General
 * 
 *   Show Gauge?:
 *   - Show Multi-Layer HP Gauges for each enemy by default?
 * 
 *   Persistant Gauges?:
 *   - Are Multi-Layer HP Gauges persistant by default?
 *   - Persistant means they remain after the enemy dies.
 * 
 *   Default Layers:
 *   - How many layers are used by default when an enemy has a
 *     Multi-Layer HP Gauge in effect?
 *
 * ---
 *
 * Graphic
 * 
 *   Background Color 1:
 *   Background Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Border Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Border Thickness:
 *   - What is the thickness of the colored band for the enemy
 *     graphic's border?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Graphic Settings
 * ============================================================================
 *
 * Adjust the settings for the Enemy Graphic part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show Enemy Graphic?:
 *   - Show the "Graphic" part of the Multi-Layer HP Gauge?
 *   - This displays the enemy graphic.
 * 
 *   Show Enemy Letter?:
 *   - Show the enemy's letter on the graphic?
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
 * ============================================================================
 * Plugin Parameters: Gauge Settings
 * ============================================================================
 *
 * Adjust the settings for the HP Gauge part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show Gauge?:
 *   - Show the "Gauge" part of the Multi-Layer HP Gauge?
 *   - I mean, why wouldn't you?
 *   - That's why you got this plugin.
 * 
 *   Gauge Height:
 *   - What is the height of the gauge in pixels?
 *   - Minimum: 1. Maximum: 32.
 * 
 *   Style Name:
 *   - Select the gauge style to use for the gauge.
 *   - Requires VisuMZ_3_VisualGaugeStyles!
 *
 * ---
 *
 * Vocabulary
 * 
 *   Value Format:
 *   - Text format used for the gauge value text.
 *   - %1 - Current Value, %2 - Max Value, %3 - Percentage
 * 
 *   Decimal Places:
 *   - How many decimal places should the percent digits go if they're used
 *     for the value?
 * 
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the gauge part's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the gauge part's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Layer Color Settings
 * ============================================================================
 *
 * Adjust what colors are used for each gauge layer.
 * 
 * Layer 1 uses default HP Gauge Colors.
 *
 * ---
 *
 * Layer 2-10 Sets
 * 
 *   Color 1:
 *   Color 2:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: States Settings
 * ============================================================================
 *
 * Adjust the settings for the states part of the Multi-Layer HP Gauge.
 *
 * ---
 *
 * General
 * 
 *   Show States?:
 *   - Show the "States" part of the Multi-Layer HP Gauge?
 *   - If off, hides all states, buffs, and Break Shields.
 * 
 *   Show Break Shields?:
 *   - Add Break Shields to the list of visible objects?
 *   - Requires VisuMZ_4_BreakShields!
 *
 * ---
 *
 * Offset
 * 
 *   Offset X:
 *   - How many pixels to offset the states part's X?
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - How many pixels to offset the states part's Y?
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Compatibility Settings
 * ============================================================================
 *
 * Adjust compatibility settings with other plugins.
 *
 * ---
 *
 * Battler-Related > Reduced Redundancy
 * 
 *   Break Shields:
 *   - Removes enemy battler Break Shields if redundant.
 *   - Requires VisuMZ_4_BreakShields!
 * 
 *   HP Gauge:
 *   - Removes enemy battler HP Gauges if redundant.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   State Icons:
 *   - Removes enemy battler state icons if redundant.
 *
 * ---
 *
 * Battle Data Offset > Battle Systems
 * 
 *   Each Row Offset Y:
 *   - Offset Y position by this for each row.
 *   - Negative: up. Positive: down.
 * 
 *   Closed Help Offset Y:
 *   - Offset Y position when help window is closed.
 *   - Negative: up. Positive: down.
 * 
 *   Open Help Offset Y:
 *   - Offset Y position when help window is open.
 *   - Negative: up. Positive: down.
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
 * * Arisu
 * * Olivia
 * * Irina
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.03: July 13, 2023
 * * Bug Fixes!
 * ** Fixed an incompatibility with Visual State Effects that would prevent the
 *    state overlays on enemies from appearing. Fix made by Irina.
 * 
 * Version 1.02: May 18, 2023
 * * Bug Fixes!
 * ** When an enemy transforms into another with a Multi-Layer HP Gauge, it
 *    will be updated and shown. Fix made by Olivia.
 * 
 * Version 1.01: March 16, 2023
 * * Bug Fixes!
 * ** Fixed a bug that would cause a crash if the VisuMZ Core Engine wasn't
 *    installed. Fix made by Olivia.
 * 
 * Version 1.00 Official Release Date: April 7, 2023
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
 * @param MultiLayerHpGauge
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
 * @desc Adjust the general settings for the Multi-Layer HP Gauge.
 * @default {"Screen":"","maxWidth:num":"816","perRow:num":"4","rowSpacing:num":"4","endBattleFadeSpeed:num":"24","Properties":"","bufferX:num":"4","stateTooltipsEnable:eval":"true","faceSize:num":"64","midFadeSpeed:num":"16","repositionForHelp:eval":"true","repositionHelpY:num":"+108","checkFrequency:num":"20","Offset":"","offsetX:num":"+0","offsetY:num":"+0","Window_BattleLog":"","repositionBattleLog:eval":"true","battleLogPerRowOffsetY:num":"+64"}
 *
 * @param Defaults:struct
 * @text Default Settings
 * @type struct<Defaults>
 * @desc These are the default values used for this plugin.
 * These settings can be individually changed via notetags.
 * @default {"General":"","showDefault:eval":"false","persist:eval":"true","defaultLayers:num":"1","Graphic":"","bgColor1:str":"19","bgColor2:str":"18","borderColor:str":"2","borderthickness:num":"2"}
 * 
 * @param Parts
 * @text Multi-Layer HP Gauge Parts
 * 
 * @param Graphic:struct
 * @text Enemy Graphic Settings
 * @parent Parts
 * @type struct<Graphic>
 * @desc Adjust the settings for the Enemy Graphic part of the
 * Multi-Layer HP Gauge.
 * @default {"show:eval":"true","drawLetter:eval":"true","letterFontName:str":"","letterFontSize:num":"16"}
 *
 * @param Gauge:struct
 * @text Gauge Settings
 * @parent Parts
 * @type struct<Gauge>
 * @desc Adjust the settings for the HP Gauge part of the
 * Multi-Layer HP Gauge.
 * @default {"General":"","show:eval":"true","gaugeHeight:num":"24","styleName:str":"Lean","Vocab":"","valueFmt:str":"%3%","valuePercentDigits:num":"2","Offset":"","offsetX:num":"+0","offsetY:num":"+4"}
 *
 * @param LayerColors:struct
 * @text Layer Color Settings
 * @parent Gauge:struct
 * @type struct<LayerColors>
 * @desc Adjust what colors are used for each gauge layer.
 * Layer 1 uses default HP Gauge Colors.
 * @default {"Layer2":"","layer2_color1:str":"#fff200","layer2_color2:str":"#fff799","Layer3":"","layer3_color1:str":"#39b54a","layer3_color2:str":"#7cc576","Layer4":"","layer4_color1:str":"#00a99d","layer4_color2:str":"#7accc8","Layer5":"","layer5_color1:str":"#00aeef","layer5_color2:str":"#6dcff6","Layer6":"","layer6_color1:str":"#0054a6","layer6_color2:str":"#8393ca","Layer7":"","layer7_color1:str":"#2e3192","layer7_color2:str":"#605ca8","Layer8":"","layer8_color1:str":"#662d91","layer8_color2:str":"#a186be","Layer9":"","layer9_color1:str":"#f06eaa","layer9_color2:str":"#ffdeec","Layer10":"","layer10_color1:str":"#ed1c24","layer10_color2:str":"#f26c4f"}
 *
 * @param States:struct
 * @text States Settings
 * @parent Parts
 * @type struct<States>
 * @desc Adjust the settings for the states part of the
 * Multi-Layer HP Gauge.
 * @default {"General":"","show:eval":"true","breakShields:eval":"true","Offset":"","offsetX:num":"+0","offsetY:num":"+28"}
 *
 * @param Compatibility:struct
 * @text Compatibility Settings
 * @type struct<Compatibility>
 * @desc Adjust compatibility settings with other plugins.
 * @default {"Battler":"","ReduceRed":"","reduceRedundantBreakShield:eval":"true","reduceRedundantHpGauge:eval":"true","reduceRedundantStateIcon:eval":"true","GaugeOffset":"","BattleSysAtb":"","atbEachRowOffsetY:num":"+64","atbNormalOffsetY:num":"+24","atbHelpOffsetY:num":"+12","BattleSysBtb":"","btbEachRowOffsetY:num":"+64","btbNormalOffsetY:num":"+0","btbHelpOffsetY:num":"+12","BattleSysCtb":"","ctbEachRowOffsetY:num":"+64","ctbNormalOffsetY:num":"+0","ctbHelpOffsetY:num":"+12","BattleSysEtb":"","etbEachRowOffsetY:num":"+64","etbNormalOffsetY:num":"+0","etbHelpOffsetY:num":"-56","BattleSysFtb":"","ftbEachRowOffsetY:num":"+64","ftbNormalOffsetY:num":"+0","ftbHelpOffsetY:num":"-56","BattleSysOtb":"","otbEachRowOffsetY:num":"+64","otbNormalOffsetY:num":"-6","otbHelpOffsetY:num":"-12","BattleSysPtb":"","ptbEachRowOffsetY:num":"+64","ptbNormalOffsetY:num":"+0","ptbHelpOffsetY:num":"-56","BattleSysStb":"","stbEachRowOffsetY:num":"+64","stbNormalOffsetY:num":"+0","stbHelpOffsetY:num":"+12"}
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
 * @param Screen
 *
 * @param maxWidth:num
 * @text Max Width
 * @parent Screen
 * @min 1
 * @desc What is the max screen area that is taken up by Multi-Layer HP Gauges?
 * @default 816
 *
 * @param perRow:num
 * @text Gauges Per Row
 * @parent Screen
 * @min 1
 * @desc How many gauges are displayed per row?
 * When the quantity exceeds this number, start a new row.
 * @default 4
 *
 * @param rowSpacing:num
 * @text Row Spacing
 * @parent Screen
 * @min 0
 * @desc How many pixels are used inbetween rows to space out
 * the stacked Multi-Layer HP Gauges?
 * @default 4
 *
 * @param midFadeSpeed:num
 * @text Mid-Battle Fade Speed
 * @parent Screen
 * @min 1
 * @desc How fast should the gauges fade out mid-battle?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 16
 *
 * @param endBattleFadeSpeed:num
 * @text End Battle Fade Speed
 * @parent Screen
 * @min 1
 * @desc How fast should the gauges fade out on ending battle?
 * Lower numbers are slower. Higher numbers are faster.
 * @default 24
 *
 * @param Properties
 *
 * @param bufferX:num
 * @text Buffer X
 * @parent Properties
 * @min 0
 * @desc What is the minimum pixel distance between individual parts?
 * @default 4
 *
 * @param stateTooltipsEnable:eval
 * @text Enable State Tooltips
 * @parent Properties
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables state tooltips when hovered over?
 * Requires VisuMZ_3_StateTooltips!
 * @default true
 *
 * @param faceSize:num
 * @text Graphic Size
 * @parent Properties
 * @min 1
 * @desc What is the standard pixel size for the enemy graphic?
 * This value is also used to adjust individual part positions.
 * @default 64
 *
 * @param repositionForHelp:eval
 * @text Reposition for Help?
 * @parent Properties
 * @type boolean
 * @on Reposition
 * @off Stay
 * @desc Reposition the gauges when the Help Window is open?
 * @default true
 *
 * @param repositionHelpY:num
 * @text Reposition Y
 * @parent repositionForHelp:eval
 * @desc How many pixels to offset the gauge reposition?
 * Negative: up. Positive: down.
 * @default +108
 *
 * @param checkFrequency:num
 * @text Update Frequency
 * @parent Properties
 * @min 1
 * @desc How many frames of wait should there be before updating
 * the individual Multi-Layer HP Gauges?
 * @default 20
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the whole gauge's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the whole gauge's Y?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Window_BattleLog
 * @text Battle Log
 *
 * @param repositionBattleLog:eval
 * @text Reposition Window?
 * @parent Window_BattleLog
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Repositions the battle log window to make room for
 * the Multi-Layer HP Gauge?
 * @default true
 *
 * @param battleLogPerRowOffsetY:num
 * @text Per Row Offset Y
 * @parent Window_BattleLog
 * @desc Offset Battle Log's Y by this amount per row?
 * Negative: up. Positive: down.
 * @default +64
 *
 */
/* ----------------------------------------------------------------------------
 * Defaults Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Defaults:
 * 
 * @param General
 *
 * @param showDefault:eval
 * @text Show Gauge?
 * @parent General
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show Multi-Layer HP Gauges for each enemy by default?
 * @default false
 *
 * @param persist:eval
 * @text Persistant Gauges?
 * @parent General
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Are Multi-Layer HP Gauges persistant by default?
 * Persistant means they remain after the enemy dies.
 * @default true
 *
 * @param defaultLayers:num
 * @text Default Layers
 * @parent General
 * @type number
 * @min 1
 * @max 10
 * @desc How many layers are used by default when an enemy has
 * a Multi-Layer HP Gauge in effect?
 * @default 1
 * 
 * @param Graphic
 *
 * @param bgColor1:str
 * @text Background Color 1
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param bgColor2:str
 * @text Background Color 2
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param borderColor:str
 * @text Border Color
 * @parent Graphic
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 2
 *
 * @param borderthickness:num
 * @text Border Thickness
 * @parent Graphic
 * @type number
 * @min 1
 * @desc What is the thickness of the colored band for the enemy
 * graphic's border?
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Graphic Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Graphic:
 *
 * @param show:eval
 * @text Show Enemy Graphic?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "Graphic" part of the Multi-Layer HP Gauge?
 * This displays the enemy graphic.
 * @default true
 *
 * @param drawLetter:eval
 * @text Show Enemy Letter?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the enemy's letter on the graphic?
 * @default true
 *
 * @param letterFontName:str
 * @text Font Name
 * @parent drawLetter:eval
 * @desc The font name used for the text of the Letter.
 * Leave empty to use the default game's font.
 * @default 
 *
 * @param letterFontSize:num
 * @text Font Size
 * @parent drawLetter:eval
 * @min 1
 * @desc The font size used for the text of the Letter.
 * @default 16
 *
 */
/* ----------------------------------------------------------------------------
 * Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gauge:
 *
 * @param General
 *
 * @param show:eval
 * @text Show Gauge?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "Gauge" part of the Multi-Layer HP Gauge?
 * I mean, why wouldn't you? That's why you got this plugin.
 * @default true
 *
 * @param gaugeHeight:num
 * @text Gauge Height
 * @parent General
 * @type number
 * @min 1
 * @max 32
 * @desc What is the height of the gauge in pixels?
 * Minimum: 1. Maximum: 32.
 * @default 24
 * 
 * @param styleName:str
 * @text Style Name
 * @parent General
 * @type select
 * @option -
 * @option Normal
 * @option -
 * @option Arrow
 * @option Dipper
 * @option Flag
 * @option Growth
 * @option Lean
 * @option Quad
 * @option Stagger
 * @option Trapezoid
 * @option -
 * @option HalfStep
 * @option ThirdStep
 * @option FourthStep
 * @option FifthStep
 * @option SixthStep
 * @option EighthStep
 * @option TenthStep
 * @option -
 * @option HalfSection
 * @option ThirdSection
 * @option FourthSection
 * @option FifthSection
 * @option SixthSection
 * @option EighthSection
 * @option TenthSection
 * @option -
 * @option SegmentBy10
 * @option SegmentBy20
 * @option SegmentBy25
 * @option SegmentBy50
 * @option SegmentBy100
 * @option SegmentBy200
 * @option SegmentBy250
 * @option SegmentBy500
 * @option SegmentBy1000
 * @option -
 * @desc Select the gauge style to use for the gauge.
 * Requires VisuMZ_3_VisualGaugeStyles!
 * @default Lean
 *
 * @param Vocab
 * @text Vocabulary
 *
 * @param valueFmt:str
 * @text Value Format
 * @parent Vocab
 * @desc Text format used for the gauge value text.
 * %1 - Current Value, %2 - Max Value, %3 - Percentage
 * @default %3%
 *
 * @param valuePercentDigits:num
 * @text Decimal Places
 * @parent Vocab
 * @type number
 * @desc How many decimal places should the percent digits
 * go if they're used for the value?
 * @default 2
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the gauge part's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the gauge part's Y?
 * Negative: up. Positive: down.
 * @default +4
 *
 */
/* ----------------------------------------------------------------------------
 * States Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param show:eval
 * @text Show States?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the "States" part of the Multi-Layer HP Gauge?
 * If off, hides all states, buffs, and Break Shields.
 * @default true
 *
 * @param breakShields:eval
 * @text Show Break Shields?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add Break Shields to the list of visible objects?
 * Requires VisuMZ_4_BreakShields!
 * @default true
 * 
 * @param Offset
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offset
 * @desc How many pixels to offset the states part's X?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc How many pixels to offset the states part's Y?
 * Negative: up. Positive: down.
 * @default +28
 *
 */
/* ----------------------------------------------------------------------------
 * Layer Colors Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LayerColors:
 *
 * @param Layer2
 * @text Layer 2 Set
 *
 * @param layer2_color1:str
 * @text Color 1
 * @parent Layer2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #fff200
 *
 * @param layer2_color2:str
 * @text Color 2
 * @parent Layer2
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #fff799
 *
 * @param Layer3
 * @text Layer 3 Set
 *
 * @param layer3_color1:str
 * @text Color 1
 * @parent Layer3
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #39b54a
 *
 * @param layer3_color2:str
 * @text Color 2
 * @parent Layer3
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #7cc576
 *
 * @param Layer4
 * @text Layer 4 Set
 *
 * @param layer4_color1:str
 * @text Color 1
 * @parent Layer4
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #00a99d
 *
 * @param layer4_color2:str
 * @text Color 2
 * @parent Layer4
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #7accc8
 *
 * @param Layer5
 * @text Layer 5 Set
 *
 * @param layer5_color1:str
 * @text Color 1
 * @parent Layer5
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #00aeef
 *
 * @param layer5_color2:str
 * @text Color 2
 * @parent Layer5
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #6dcff6
 *
 * @param Layer6
 * @text Layer 6 Set
 *
 * @param layer6_color1:str
 * @text Color 1
 * @parent Layer6
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #0054a6
 *
 * @param layer6_color2:str
 * @text Color 2
 * @parent Layer6
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #8393ca
 *
 * @param Layer7
 * @text Layer 7 Set
 *
 * @param layer7_color1:str
 * @text Color 1
 * @parent Layer7
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2e3192
 *
 * @param layer7_color2:str
 * @text Color 2
 * @parent Layer7
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #605ca8
 *
 * @param Layer8
 * @text Layer 8 Set
 *
 * @param layer8_color1:str
 * @text Color 1
 * @parent Layer8
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #662d91
 *
 * @param layer8_color2:str
 * @text Color 2
 * @parent Layer8
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #a186be
 *
 * @param Layer9
 * @text Layer 9 Set
 *
 * @param layer9_color1:str
 * @text Color 1
 * @parent Layer9
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f06eaa
 *
 * @param layer9_color2:str
 * @text Color 2
 * @parent Layer9
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffdeec
 *
 * @param Layer10
 * @text Layer 10 Set
 *
 * @param layer10_color1:str
 * @text Color 1
 * @parent Layer10
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ed1c24
 *
 * @param layer10_color2:str
 * @text Color 2
 * @parent Layer10
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #f26c4f
 *
 */
/* ----------------------------------------------------------------------------
 * Compatibility Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Compatibility:
 *
 * @param Battler
 * @text Battler-Related
 * 
 * @param ReduceRed
 * @text Reduced Redundancy
 * @parent Battler
 *
 * @param reduceRedundantBreakShield:eval
 * @text Break Shields
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler Break Shields if redundant.
 * Requires VisuMZ_4_BreakShields!
 * @default true
 *
 * @param reduceRedundantHpGauge:eval
 * @text HP Gauge
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler HP Gauges if redundant.
 * Requires VisuMZ_1_BattleCore!
 * @default true
 *
 * @param reduceRedundantStateIcon:eval
 * @text State Icons
 * @parent ReduceRed
 * @type boolean
 * @on Reduce
 * @off Keep
 * @desc Removes enemy battler state icons if redundant.
 * @default true
 * 
 * @param BattleDataOffset
 * @text Battle Data Offset
 *
 * @param BattleSysAtb
 * @text Battle System - ATB
 * @parent BattleDataOffset
 *
 * @param atbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param atbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +24
 *
 * @param atbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysAtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysBtb
 * @text Battle System - BTB
 * @parent GaugeOffset
 *
 * @param btbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param btbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param btbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysBtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysCtb
 * @text Battle System - CTB
 * @parent GaugeOffset
 *
 * @param ctbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ctbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ctbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysCtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 * @param BattleSysEtb
 * @text Battle System - ETB
 * @parent GaugeOffset
 *
 * @param etbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param etbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param etbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysEtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysFtb
 * @text Battle System - FTB
 * @parent GaugeOffset
 *
 * @param ftbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ftbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ftbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysFtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysOtb
 * @text Battle System - OTB
 * @parent GaugeOffset
 *
 * @param otbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param otbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default -6
 *
 * @param otbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysOtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -12
 *
 * @param BattleSysPtb
 * @text Battle System - PTB
 * @parent GaugeOffset
 *
 * @param ptbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param ptbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param ptbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysPtb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default -56
 *
 * @param BattleSysStb
 * @text Battle System - STB
 * @parent GaugeOffset
 *
 * @param stbEachRowOffsetY:num
 * @text Each Row Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position by this for each row.
 * Negative: up. Positive: down.
 * @default +64
 *
 * @param stbNormalOffsetY:num
 * @text Closed Help Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position when help window is closed.
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param stbHelpOffsetY:num
 * @text Open Help Offset Y
 * @parent BattleSysStb
 * @desc Offset Y position when help window is open.
 * Negative: up. Positive: down.
 * @default +12
 *
 */
//=============================================================================

const _0x18ab75=_0x4d78;(function(_0x252b52,_0x54d606){const _0x3ca5e5=_0x4d78,_0x2f711d=_0x252b52();while(!![]){try{const _0x24cf12=-parseInt(_0x3ca5e5(0x1ed))/0x1+-parseInt(_0x3ca5e5(0x21d))/0x2*(parseInt(_0x3ca5e5(0x228))/0x3)+parseInt(_0x3ca5e5(0x36c))/0x4+parseInt(_0x3ca5e5(0x218))/0x5+-parseInt(_0x3ca5e5(0x322))/0x6+parseInt(_0x3ca5e5(0x254))/0x7+parseInt(_0x3ca5e5(0x2ed))/0x8;if(_0x24cf12===_0x54d606)break;else _0x2f711d['push'](_0x2f711d['shift']());}catch(_0x47f1e6){_0x2f711d['push'](_0x2f711d['shift']());}}}(_0x173b,0x8315d));var label=_0x18ab75(0x1f0),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x18ab75(0x24b)](function(_0x1db02b){const _0x3311f3=_0x18ab75;return _0x1db02b['status']&&_0x1db02b['description'][_0x3311f3(0x367)]('['+label+']');})[0x0];VisuMZ[label]['Settings']=VisuMZ[label][_0x18ab75(0x2e4)]||{},VisuMZ[_0x18ab75(0x20d)]=function(_0x511c6e,_0xf9884f){const _0x278093=_0x18ab75;for(const _0x259669 in _0xf9884f){if(_0x278093(0x2b6)===_0x278093(0x310))_0x33b841+=_0x145d79['normalOffsetY'];else{if(_0x259669[_0x278093(0x37a)](/(.*):(.*)/i)){const _0x511371=String(RegExp['$1']),_0xca5a78=String(RegExp['$2'])[_0x278093(0x313)]()[_0x278093(0x217)]();let _0x299c6d,_0x412ead,_0x3a6dbb;switch(_0xca5a78){case'NUM':_0x299c6d=_0xf9884f[_0x259669]!==''?Number(_0xf9884f[_0x259669]):0x0;break;case _0x278093(0x374):_0x412ead=_0xf9884f[_0x259669]!==''?JSON[_0x278093(0x263)](_0xf9884f[_0x259669]):[],_0x299c6d=_0x412ead[_0x278093(0x2d0)](_0x1d9c6f=>Number(_0x1d9c6f));break;case _0x278093(0x25c):_0x299c6d=_0xf9884f[_0x259669]!==''?eval(_0xf9884f[_0x259669]):null;break;case _0x278093(0x1fb):_0x412ead=_0xf9884f[_0x259669]!==''?JSON[_0x278093(0x263)](_0xf9884f[_0x259669]):[],_0x299c6d=_0x412ead['map'](_0x13b2f7=>eval(_0x13b2f7));break;case'JSON':_0x299c6d=_0xf9884f[_0x259669]!==''?JSON[_0x278093(0x263)](_0xf9884f[_0x259669]):'';break;case _0x278093(0x23a):_0x412ead=_0xf9884f[_0x259669]!==''?JSON['parse'](_0xf9884f[_0x259669]):[],_0x299c6d=_0x412ead[_0x278093(0x2d0)](_0x5917be=>JSON[_0x278093(0x263)](_0x5917be));break;case _0x278093(0x375):_0x299c6d=_0xf9884f[_0x259669]!==''?new Function(JSON[_0x278093(0x263)](_0xf9884f[_0x259669])):new Function(_0x278093(0x2f6));break;case _0x278093(0x2db):_0x412ead=_0xf9884f[_0x259669]!==''?JSON['parse'](_0xf9884f[_0x259669]):[],_0x299c6d=_0x412ead[_0x278093(0x2d0)](_0x448e23=>new Function(JSON[_0x278093(0x263)](_0x448e23)));break;case'STR':_0x299c6d=_0xf9884f[_0x259669]!==''?String(_0xf9884f[_0x259669]):'';break;case _0x278093(0x261):_0x412ead=_0xf9884f[_0x259669]!==''?JSON[_0x278093(0x263)](_0xf9884f[_0x259669]):[],_0x299c6d=_0x412ead[_0x278093(0x2d0)](_0x166fd6=>String(_0x166fd6));break;case _0x278093(0x1b6):_0x3a6dbb=_0xf9884f[_0x259669]!==''?JSON[_0x278093(0x263)](_0xf9884f[_0x259669]):{},_0x299c6d=VisuMZ[_0x278093(0x20d)]({},_0x3a6dbb);break;case _0x278093(0x344):_0x412ead=_0xf9884f[_0x259669]!==''?JSON['parse'](_0xf9884f[_0x259669]):[],_0x299c6d=_0x412ead[_0x278093(0x2d0)](_0x548f09=>VisuMZ['ConvertParams']({},JSON[_0x278093(0x263)](_0x548f09)));break;default:continue;}_0x511c6e[_0x511371]=_0x299c6d;}}}return _0x511c6e;},(_0x39497e=>{const _0x382067=_0x18ab75,_0x2e786b=_0x39497e['name'];for(const _0x324c26 of dependencies){if(!Imported[_0x324c26]){alert(_0x382067(0x21f)['format'](_0x2e786b,_0x324c26)),SceneManager['exit']();break;}}const _0x2575cb=_0x39497e[_0x382067(0x1c4)];if(_0x2575cb[_0x382067(0x37a)](/\[Version[ ](.*?)\]/i)){if('xpwml'!=='xpwml')_0x508830+=_0x4110cb[_0x382067(0x200)];else{const _0x47178f=Number(RegExp['$1']);_0x47178f!==VisuMZ[label][_0x382067(0x206)]&&(_0x382067(0x370)!==_0x382067(0x370)?this[_0x382067(0x339)]():(alert(_0x382067(0x33e)['format'](_0x2e786b,_0x47178f)),SceneManager['exit']()));}}if(_0x2575cb[_0x382067(0x37a)](/\[Tier[ ](\d+)\]/i)){const _0x27901d=Number(RegExp['$1']);_0x27901d<tier?(alert(_0x382067(0x255)[_0x382067(0x1ff)](_0x2e786b,_0x27901d,tier)),SceneManager[_0x382067(0x231)]()):tier=Math[_0x382067(0x376)](_0x27901d,tier);}VisuMZ[_0x382067(0x20d)](VisuMZ[label][_0x382067(0x2e4)],_0x39497e[_0x382067(0x30d)]);})(pluginData),VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x1b1)]={'showMultiLayerGauge':/<SHOW MULTI(?:|-| )LAYER (?:HP |)GAUGE>/i,'hideMultiLayerGauge':/<HIDE MULTI(?:|-| )LAYER (?:HP |)GAUGE>/i,'persistMultiLayerGauge':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:PERSIST|PERSISTANT)>/i,'temporalMultiLayerGauge':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:TEMP|TEMPORAL|TEMPORARY)>/i,'layers':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE LAYERS:[ ](\d+)>/i,'faceGraphic':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:FACE|GRAPHIC|FACE GRAPHIC):[ ](.*),[ ]*(\d+)>/i,'bgColor':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE (?:BG|BG |BACKGROUND )COLOR:[ ](.*)>/i,'borderColor':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE BORDER COLOR:[ ](.*)>/i,'borderThick':/<MULTI(?:|-| )LAYER (?:HP |)GAUGE BORDER (?:THICK|THICKNESS|SIZE):[ ](\d+)>/i},ImageManager[_0x18ab75(0x1ac)]=ImageManager[_0x18ab75(0x1ac)]||0x9,ImageManager['svActorVertCells']=ImageManager[_0x18ab75(0x1b9)]||0x6,TextManager[_0x18ab75(0x1e9)]={'valueFmt':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x279)][_0x18ab75(0x244)]??_0x18ab75(0x203),'valuePercentDigits':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x279)][_0x18ab75(0x22f)]??0x2},ColorManager[_0x18ab75(0x1e9)]={'color1':{'layer2':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x1a9)]??_0x18ab75(0x22e),'layer3':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)]['LayerColors'][_0x18ab75(0x292)]??'#39b54a','layer4':VisuMZ[_0x18ab75(0x1f0)]['Settings']['LayerColors']['layer4_color1']??_0x18ab75(0x25e),'layer5':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x36a)]??'#00aeef','layer6':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x1d1)]??_0x18ab75(0x1e4),'layer7':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x2b2)][_0x18ab75(0x29b)]??_0x18ab75(0x30e),'layer8':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x2ff)]??'#662d91','layer9':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x2b2)][_0x18ab75(0x27c)]??_0x18ab75(0x386),'layer10':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x2b2)][_0x18ab75(0x1af)]??_0x18ab75(0x364)},'color2':{'layer2':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x2a7)]??_0x18ab75(0x235),'layer3':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x362)]??_0x18ab75(0x202),'layer4':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)]['LayerColors'][_0x18ab75(0x31b)]??_0x18ab75(0x24d),'layer5':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)]['layer5_color2']??_0x18ab75(0x2f1),'layer6':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x286)]??'#8393ca','layer7':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x2fd)]??_0x18ab75(0x340),'layer8':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x37e)]??'#a186be','layer9':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x2b2)][_0x18ab75(0x2d8)]??_0x18ab75(0x27b),'layer10':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2b2)][_0x18ab75(0x385)]??_0x18ab75(0x1fa)}},ColorManager[_0x18ab75(0x21e)]=function(_0x5f1afa){const _0x3dc0ce=_0x18ab75;return _0x5f1afa=String(_0x5f1afa),_0x5f1afa[_0x3dc0ce(0x37a)](/#(.*)/i)?'#%1'[_0x3dc0ce(0x1ff)](String(RegExp['$1'])):this['textColor'](Number(_0x5f1afa));},ColorManager[_0x18ab75(0x192)]=function(_0x42e3db){const _0xc107d1=_0x18ab75;if(_0x42e3db<0x1)return this['gaugeBackColor']();else{if(_0x42e3db===0x1)return this[_0xc107d1(0x1a1)]();else{const _0x3def12=_0xc107d1(0x2b8)['format'](_0x42e3db[_0xc107d1(0x371)](0x2,0xa)),_0x193ac6=ColorManager[_0xc107d1(0x1e9)][_0xc107d1(0x28a)][_0x3def12];return this['getColor'](_0x193ac6);}}},ColorManager[_0x18ab75(0x1d9)]=function(_0x3ae0ee){const _0x475595=_0x18ab75;if(_0x3ae0ee<0x1)return this[_0x475595(0x38f)]();else{if(_0x3ae0ee===0x1)return this['hpGaugeColor2']();else{const _0x42e0dd=_0x475595(0x2b8)[_0x475595(0x1ff)](_0x3ae0ee['clamp'](0x2,0xa)),_0x297b01=ColorManager[_0x475595(0x1e9)][_0x475595(0x2ae)][_0x42e0dd];return this[_0x475595(0x21e)](_0x297b01);}}},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x196)]=BattleManager[_0x18ab75(0x2b5)],BattleManager['endAction']=function(){const _0xedb261=_0x18ab75;VisuMZ[_0xedb261(0x1f0)][_0xedb261(0x196)][_0xedb261(0x26e)](this),!$gameTroop[_0xedb261(0x277)]()&&$gameTroop[_0xedb261(0x22a)]();},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x1d8)]=Game_BattlerBase[_0x18ab75(0x20f)][_0x18ab75(0x1a0)],Game_BattlerBase[_0x18ab75(0x20f)][_0x18ab75(0x1a0)]=function(){const _0x254404=_0x18ab75;VisuMZ[_0x254404(0x1f0)]['Game_BattlerBase_revive'][_0x254404(0x26e)](this);if(this[_0x254404(0x2cb)]())$gameTroop[_0x254404(0x22a)]();},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x334)]=Game_BattlerBase['prototype'][_0x18ab75(0x294)],Game_BattlerBase[_0x18ab75(0x20f)]['appear']=function(){const _0x5a27d7=_0x18ab75;VisuMZ['MultiLayerHpGauge']['Game_BattlerBase_appear']['call'](this);if(this[_0x5a27d7(0x2cb)]())$gameTroop['clearMultiLayerHpGaugeMembers']();},Game_Enemy['MULTI_LAYER_HP_GAUGE']={'showDefault':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x2d4)]['showDefault']??![],'persist':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x2d4)]['persist']??!![],'defaultLayers':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2d4)][_0x18ab75(0x368)]??0x1,'bgColor1':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x2d4)]['bgColor1']??0x13,'bgColor2':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x2d4)][_0x18ab75(0x36e)]??0x12,'borderColor':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x2d4)][_0x18ab75(0x1ca)]??0x2,'borderthickness':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2d4)][_0x18ab75(0x208)]??0x2},Game_Enemy['prototype'][_0x18ab75(0x242)]=function(){const _0x3ec049=_0x18ab75;if(!this[_0x3ec049(0x345)]())return![];return this[_0x3ec049(0x2a2)]()&&this[_0x3ec049(0x278)]()&&this[_0x3ec049(0x329)]();},Game_Enemy['prototype']['canShowMultiLayerHpGauge']=function(){const _0x2ad1b9=_0x18ab75;if(this[_0x2ad1b9(0x29f)]!==undefined){if(_0x2ad1b9(0x221)!==_0x2ad1b9(0x221)){_0x24a592[_0x2ad1b9(0x1f0)]['Window_PTB_TurnOrder_updatePosition'][_0x2ad1b9(0x26e)](this);if(_0x323d07[_0x2ad1b9(0x2e4)][_0x2ad1b9(0x2c8)])return;const _0x41e7e4=_0x38fb27[_0x2ad1b9(0x34d)]();if(_0x41e7e4<=0x0)return;const _0x110b31=_0x1bb4fe['MultiLayerHpGauge'][_0x2ad1b9(0x347)][_0x2ad1b9(0x1b4)],_0x4510b9=_0x110b31['eachRowOffsetY'];let _0x3ff0df=_0x4510b9*_0x41e7e4;const _0x178710=_0x144c59[_0x2ad1b9(0x1c6)]['_helpWindow'];_0x178710&&_0x178710[_0x2ad1b9(0x342)]&&_0x2e6158[_0x2ad1b9(0x2e4)]['RepositionTopForHelp']?_0x3ff0df+=_0x110b31[_0x2ad1b9(0x2a4)]:_0x3ff0df+=_0x110b31[_0x2ad1b9(0x200)],this['y']+=_0x3ff0df;}else return this[_0x2ad1b9(0x29f)];}this['_canShowMultiLayerHpGauge']=Game_Enemy[_0x2ad1b9(0x1e9)]['showDefault'];const _0xd1cdae=VisuMZ[_0x2ad1b9(0x1f0)][_0x2ad1b9(0x1b1)],_0x263e7d=this[_0x2ad1b9(0x345)]()[_0x2ad1b9(0x349)]||'';if(_0x263e7d[_0x2ad1b9(0x37a)](_0xd1cdae['showMultiLayerGauge']))this[_0x2ad1b9(0x29f)]=!![];else{if(_0x263e7d[_0x2ad1b9(0x37a)](_0xd1cdae[_0x2ad1b9(0x37d)]))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x263e7d[_0x2ad1b9(0x37a)](_0xd1cdae[_0x2ad1b9(0x341)]))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x263e7d['match'](_0xd1cdae[_0x2ad1b9(0x361)]))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x263e7d[_0x2ad1b9(0x37a)](_0xd1cdae['bgColor']))this[_0x2ad1b9(0x29f)]=!![];else{if(_0x263e7d[_0x2ad1b9(0x37a)](_0xd1cdae[_0x2ad1b9(0x1ca)]))this[_0x2ad1b9(0x29f)]=!![];else{if(_0x263e7d[_0x2ad1b9(0x37a)](_0xd1cdae['borderThick']))this['_canShowMultiLayerHpGauge']=!![];else{if(_0x263e7d['match'](_0xd1cdae[_0x2ad1b9(0x298)]))this['_canShowMultiLayerHpGauge']=!![];else _0x263e7d[_0x2ad1b9(0x37a)](_0xd1cdae[_0x2ad1b9(0x302)])&&(this[_0x2ad1b9(0x29f)]=![]);}}}}}}}return this[_0x2ad1b9(0x29f)];},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x1bd)]=Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x2bc)],Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x2bc)]=function(_0x140fff){const _0x203d0c=_0x18ab75;VisuMZ[_0x203d0c(0x1f0)][_0x203d0c(0x1bd)][_0x203d0c(0x26e)](this,_0x140fff),this[_0x203d0c(0x29f)]=undefined,this['canShowMultiLayerHpGauge'](),$gameTroop[_0x203d0c(0x22a)]();},Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x278)]=function(){const _0x323dc0=_0x18ab75;return this[_0x323dc0(0x32f)]()?!![]:!this['isDead']();},Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x32f)]=function(){const _0x536a29=_0x18ab75,_0x570452=VisuMZ[_0x536a29(0x1f0)][_0x536a29(0x1b1)],_0xf81844=this[_0x536a29(0x345)]()[_0x536a29(0x349)]||'';if(_0xf81844[_0x536a29(0x37a)](_0x570452[_0x536a29(0x37d)])){if('peVMS'===_0x536a29(0x2ac)){this['bitmap']=this[_0x536a29(0x1eb)]['contents'];if(this[_0x536a29(0x301)]){const _0x338120=_0x58c3a1['floor'](this[_0x536a29(0x301)]/_0x478f83['iconWidth'])*_0x186304[_0x536a29(0x318)];this[_0x536a29(0x1f9)](0x0,0x0,_0x338120,this['bitmap'][_0x536a29(0x297)]);}}else return!![];}else{if(_0xf81844[_0x536a29(0x37a)](_0x570452[_0x536a29(0x341)])){if('UNGCG'==='IKUkE')_0x2c562e+=_0x40efeb[_0x536a29(0x200)];else return![];}}return Game_Enemy['MULTI_LAYER_HP_GAUGE']['persist'];},Game_Enemy[_0x18ab75(0x20f)]['getMultiLayerHpGaugeBgColorData']=function(){const _0x3cdeba=_0x18ab75;if(this['_multiLayerHpGaugeBgColorData']!==undefined){if(_0x3cdeba(0x22b)!==_0x3cdeba(0x22b))this[_0x3cdeba(0x32b)]={'name':_0x5f5bd2(_0x2d9e7f['$1'])['trim'](),'index':_0x419fcf[_0x3cdeba(0x376)](_0x37e22d(_0x11ed88['$2']),0x0)};else return this[_0x3cdeba(0x366)];}this[_0x3cdeba(0x366)]={'bgColor1':Game_Enemy[_0x3cdeba(0x1e9)][_0x3cdeba(0x27e)],'bgColor2':Game_Enemy[_0x3cdeba(0x1e9)][_0x3cdeba(0x36e)]};const _0x188ad6=VisuMZ[_0x3cdeba(0x1f0)][_0x3cdeba(0x1b1)],_0x495746=this[_0x3cdeba(0x345)]()['note']||'';if(_0x495746[_0x3cdeba(0x37a)](_0x188ad6[_0x3cdeba(0x35b)])){if(_0x3cdeba(0x34b)===_0x3cdeba(0x259))return this[_0x3cdeba(0x209)]();else{const _0x531742=String(RegExp['$1'])[_0x3cdeba(0x250)](',')['map'](_0x19fa36=>_0x19fa36[_0x3cdeba(0x217)]());this[_0x3cdeba(0x366)][_0x3cdeba(0x27e)]=_0x531742[0x0],this[_0x3cdeba(0x366)][_0x3cdeba(0x36e)]=_0x531742[0x1]||_0x531742[0x0];}}return this['_multiLayerHpGaugeBgColorData'];},Game_Enemy[_0x18ab75(0x20f)]['updateMultiLayerHpGaugeBorderData']=function(){const _0x305df7=_0x18ab75;this[_0x305df7(0x366)]=undefined,this[_0x305df7(0x243)]();},Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x1b8)]=function(){const _0x228777=_0x18ab75;return this[_0x228777(0x243)]()[_0x228777(0x27e)];},Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x1ab)]=function(){const _0xa62dfc=_0x18ab75;return this[_0xa62dfc(0x243)]()[_0xa62dfc(0x36e)];},Game_Enemy[_0x18ab75(0x20f)]['getMultiLayerHpGaugeBorderData']=function(){const _0x457d2e=_0x18ab75;if(this[_0x457d2e(0x205)]!==undefined)return this[_0x457d2e(0x205)];this[_0x457d2e(0x205)]={'color':Game_Enemy[_0x457d2e(0x1e9)]['borderColor'],'thick':Game_Enemy[_0x457d2e(0x1e9)]['borderthickness']};const _0x2e8ae8=VisuMZ['MultiLayerHpGauge'][_0x457d2e(0x1b1)],_0x38d0db=this[_0x457d2e(0x345)]()[_0x457d2e(0x349)]||'';return _0x38d0db['match'](_0x2e8ae8[_0x457d2e(0x1ca)])&&('aahUo'===_0x457d2e(0x256)?this[_0x457d2e(0x2c3)]():this[_0x457d2e(0x205)]['color']=String(RegExp['$1'])['trim']()),_0x38d0db['match'](_0x2e8ae8[_0x457d2e(0x1cb)])&&(this[_0x457d2e(0x205)][_0x457d2e(0x1b2)]=Math['max'](Number(RegExp['$1']),0x1)),this['_multiLayerHpGaugeBorderData'];},Game_Enemy['prototype'][_0x18ab75(0x210)]=function(){const _0x135fec=_0x18ab75;this['_multiLayerHpGaugeBorderData']=undefined,this[_0x135fec(0x1db)]();},Game_Enemy['prototype'][_0x18ab75(0x1ce)]=function(){const _0x219f2f=_0x18ab75;return this[_0x219f2f(0x1db)]()[_0x219f2f(0x1b0)];},Game_Enemy[_0x18ab75(0x20f)]['getMultiLayerHpGaugeBorderThickness']=function(){const _0x2a2ef1=_0x18ab75;return this[_0x2a2ef1(0x1db)]()[_0x2a2ef1(0x1b2)];},Game_Enemy['prototype']['getMultiLayerHpGaugeGraphicType']=function(){const _0x10677e=_0x18ab75;if(this[_0x10677e(0x315)]()!=='')return _0x10677e(0x262);else{if(Imported['VisuMZ_1_BattleCore']&&this[_0x10677e(0x32e)]()){if(_0x10677e(0x2e3)!==_0x10677e(0x2e3))this[_0x10677e(0x30b)]=new _0x16120a(_0x93b2d3,_0x2e1ac2);else return _0x10677e(0x389);}else{if($gameSystem[_0x10677e(0x2b0)]()){if('GXCAT'===_0x10677e(0x1a8))this[_0x10677e(0x19a)](),this[_0x10677e(0x2fe)]();else return _0x10677e(0x27f);}else return _0x10677e(0x345);}}},Game_Enemy['prototype'][_0x18ab75(0x32c)]=function(){const _0x588931=_0x18ab75;if(this[_0x588931(0x32b)]!==undefined)return this[_0x588931(0x32b)];this[_0x588931(0x32b)]={'name':'','index':0x0};const _0x10e3be=VisuMZ['MultiLayerHpGauge'][_0x588931(0x1b1)],_0x29dda9=this[_0x588931(0x345)]()['note']||'';return _0x29dda9[_0x588931(0x37a)](_0x10e3be[_0x588931(0x361)])&&(this[_0x588931(0x32b)]={'name':String(RegExp['$1'])['trim'](),'index':Math[_0x588931(0x376)](Number(RegExp['$2']),0x0)}),this[_0x588931(0x32b)];},Game_Enemy['prototype'][_0x18ab75(0x1f2)]=function(){const _0x30d06a=_0x18ab75;this[_0x30d06a(0x32b)]=undefined,this[_0x30d06a(0x32c)]();},Game_Enemy['prototype'][_0x18ab75(0x315)]=function(){const _0x4b8b57=_0x18ab75;return this['getMultiLayerHpGaugeFaceGraphicData']()[_0x4b8b57(0x2c7)];},Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x1ef)]=function(){const _0x5544ac=_0x18ab75;return this[_0x5544ac(0x32c)]()['index'];},Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x29e)]=function(){const _0x18ca60=_0x18ab75;if(this[_0x18ca60(0x282)]!==undefined)return this[_0x18ca60(0x282)];this[_0x18ca60(0x282)]=Game_Enemy[_0x18ca60(0x1e9)][_0x18ca60(0x368)];const _0x25fbee=VisuMZ[_0x18ca60(0x1f0)][_0x18ca60(0x1b1)],_0x492e0a=this['enemy']()[_0x18ca60(0x349)]||'';return _0x492e0a[_0x18ca60(0x37a)](_0x25fbee[_0x18ca60(0x298)])&&(this[_0x18ca60(0x282)]=Number(RegExp['$1'])['clamp'](0x1,0xa)),this[_0x18ca60(0x282)];},Game_Enemy['prototype']['currentMultiLayerHpGaugeLayer']=function(){const _0x4caaf7=_0x18ab75,_0x81a6c6=this[_0x4caaf7(0x29e)]();if(_0x81a6c6<=0x1)return 0x1;const _0x10ffab=this[_0x4caaf7(0x191)]/_0x81a6c6;let _0x13a5fe=this['hp']/_0x10ffab;return _0x13a5fe%0x1===0x0?_0x13a5fe+=0x1:_0x4caaf7(0x2ca)===_0x4caaf7(0x2ca)?_0x13a5fe=Math[_0x4caaf7(0x197)](_0x13a5fe):(this['drawGauge'](),this[_0x4caaf7(0x363)](),this['drawLabel'](),_0x142924[_0x4caaf7(0x372)]&&_0x375a87[_0x4caaf7(0x2a6)][_0x4caaf7(0x2d2)]()),_0x13a5fe;},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e7)]=Game_Troop['prototype'][_0x18ab75(0x2f7)],Game_Troop[_0x18ab75(0x20f)][_0x18ab75(0x2f7)]=function(_0x24c8ca){const _0x3566ae=_0x18ab75;VisuMZ[_0x3566ae(0x1f0)][_0x3566ae(0x2e7)][_0x3566ae(0x26e)](this,_0x24c8ca),this[_0x3566ae(0x22a)]();},Game_Troop[_0x18ab75(0x20f)][_0x18ab75(0x280)]=function(){const _0xbc1d62=_0x18ab75;if(this['_cache_visibleMultiLayerHpGaugeMembers']!==undefined)return this[_0xbc1d62(0x2c4)];return this[_0xbc1d62(0x2c4)]=this[_0xbc1d62(0x1f8)]()[_0xbc1d62(0x24b)](_0x339657=>_0x339657&&_0x339657[_0xbc1d62(0x242)]()),this[_0xbc1d62(0x2c4)];},Game_Troop[_0x18ab75(0x20f)][_0x18ab75(0x22a)]=function(){const _0x30f240=_0x18ab75;this[_0x30f240(0x2c4)]=undefined,this[_0x30f240(0x280)]();},Game_Troop[_0x18ab75(0x20f)][_0x18ab75(0x274)]=function(){return this['visibleMultiLayerHpGaugeMembers']()['length'];},Game_Troop[_0x18ab75(0x20f)][_0x18ab75(0x2c9)]=function(){const _0x152817=_0x18ab75;return Math[_0x152817(0x376)](this['totalVisibleMultiLayerHpGauges'](),0x1);},Game_Troop[_0x18ab75(0x20f)][_0x18ab75(0x34d)]=function(){const _0x1fa08e=_0x18ab75,_0x4bdcd5=this[_0x1fa08e(0x274)](),_0x554923=Scene_Battle[_0x1fa08e(0x1e9)][_0x1fa08e(0x26d)];return Math[_0x1fa08e(0x197)](_0x4bdcd5/_0x554923);},Scene_Battle[_0x18ab75(0x1e9)]={'maxWidth':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x357)][_0x18ab75(0x266)]??0x330,'perRow':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x357)][_0x18ab75(0x26d)]??0x4,'rowSpacing':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x357)][_0x18ab75(0x1e7)]??0x4,'fadeSpeed':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x357)][_0x18ab75(0x323)]??0x18},VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e9)]=Scene_Battle[_0x18ab75(0x20f)][_0x18ab75(0x249)],Scene_Battle[_0x18ab75(0x20f)][_0x18ab75(0x249)]=function(){const _0x41db6e=_0x18ab75;this['createMultiLayerHpGauges'](),VisuMZ[_0x41db6e(0x1f0)][_0x41db6e(0x2e9)]['call'](this);},Scene_Battle[_0x18ab75(0x20f)][_0x18ab75(0x24a)]=function(){const _0x587f43=_0x18ab75;this[_0x587f43(0x1cf)](),this[_0x587f43(0x2d1)]();},Scene_Battle[_0x18ab75(0x20f)][_0x18ab75(0x1cf)]=function(){const _0x3b26a6=_0x18ab75;this['_multiLayerHpGaugeContainer']=new Sprite(),this['addWindow'](this['_multiLayerHpGaugeContainer']);const _0x225784=Scene_Battle['MULTI_LAYER_HP_GAUGE'][_0x3b26a6(0x266)],_0x1946be=Math[_0x3b26a6(0x34e)]((Graphics[_0x3b26a6(0x36b)]-_0x225784)/0x2);this[_0x3b26a6(0x21a)]['x']=_0x1946be;},Scene_Battle['prototype'][_0x18ab75(0x2d1)]=function(){const _0x1996fc=_0x18ab75,_0x1a1fe9=$gameTroop[_0x1996fc(0x1f8)]();for(const _0x2b7dd5 of _0x1a1fe9){if('gEzsp'==='gEzsp'){if(!_0x2b7dd5)continue;this[_0x1996fc(0x35c)](_0x2b7dd5);}else return![];}},Scene_Battle[_0x18ab75(0x20f)]['addMultiLayerHpGaugeSprite']=function(_0x5b5fb8){const _0x1e72c0=_0x18ab75,_0x527fc0=new Sprite_MultiLayerHpContainer(_0x5b5fb8);this[_0x1e72c0(0x21a)][_0x1e72c0(0x2bb)](_0x527fc0);},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x195)]=Scene_Battle[_0x18ab75(0x20f)][_0x18ab75(0x2ee)],Scene_Battle[_0x18ab75(0x20f)][_0x18ab75(0x2ee)]=function(){const _0x501b06=_0x18ab75;VisuMZ[_0x501b06(0x1f0)]['Scene_Battle_update']['call'](this),this[_0x501b06(0x1a2)]();},Scene_Battle[_0x18ab75(0x20f)]['updateMultiLayerHpGaugeContainer']=function(){const _0x5defee=_0x18ab75;this[_0x5defee(0x34c)](),this[_0x5defee(0x348)]();},Scene_Battle['prototype'][_0x18ab75(0x34c)]=function(){const _0x477e2c=_0x18ab75;(BattleManager[_0x477e2c(0x37c)]===_0x477e2c(0x38a)||BattleManager['_victoryPhase'])&&this['_multiLayerHpGaugeContainer']&&(this[_0x477e2c(0x21a)][_0x477e2c(0x2c2)]-=Scene_Battle[_0x477e2c(0x1e9)][_0x477e2c(0x215)]);},Scene_Battle[_0x18ab75(0x20f)][_0x18ab75(0x348)]=function(){const _0x133133=_0x18ab75,_0x5423a0=this[_0x133133(0x21a)][_0x133133(0x1c1)]['filter'](_0x516135=>_0x516135['_hold']&&_0x516135[_0x133133(0x2c2)]<=0x0);for(const _0x416bd3 of _0x5423a0){if(_0x133133(0x355)===_0x133133(0x355))this[_0x133133(0x21a)][_0x133133(0x273)](_0x416bd3),_0x416bd3[_0x133133(0x1b3)]();else{const _0x2ed6d9='layer%1'[_0x133133(0x1ff)](_0xf47952['clamp'](0x2,0xa)),_0x38bb17=_0x44fbc0[_0x133133(0x1e9)][_0x133133(0x28a)][_0x2ed6d9];return this['getColor'](_0x38bb17);}}},VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x1c0)]=Scene_Battle['prototype']['createDisplayObjects'],Scene_Battle[_0x18ab75(0x20f)][_0x18ab75(0x2a3)]=function(){const _0x59d780=_0x18ab75;VisuMZ[_0x59d780(0x1f0)][_0x59d780(0x1c0)][_0x59d780(0x26e)](this);if(this['_logWindow'])this['_logWindow']['registerMultiLayerHpGaugePositionY']();};function Sprite_MultiLayerHpContainer(){this['initialize'](...arguments);}Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)]=Object['create'](Sprite_Clickable[_0x18ab75(0x20f)]),Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x320)]=Sprite_MultiLayerHpContainer,Sprite_MultiLayerHpContainer[_0x18ab75(0x2f0)]={'bufferX':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x357)][_0x18ab75(0x226)]??0x4,'checkFrequency':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x357)][_0x18ab75(0x31f)]??0x14,'faceSize':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)]['General']['faceSize']??0x40,'fadeSpeed':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x357)]['midFadeSpeed']??0x10,'repositionForHelp':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x357)][_0x18ab75(0x269)]??!![],'repositionHelpY':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)]['General'][_0x18ab75(0x2bf)]??0x6c,'stateTooltipsEnable':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x357)][_0x18ab75(0x30c)]??!![],'offset':{'x':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)]['General'][_0x18ab75(0x1f4)]??0x0,'y':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x357)]['offsetY']??0x0}},Sprite_MultiLayerHpContainer['prototype'][_0x18ab75(0x33a)]=function(_0x33458f){const _0x2520ce=_0x18ab75;this['_battler']=_0x33458f,Sprite_Clickable[_0x2520ce(0x20f)][_0x2520ce(0x33a)][_0x2520ce(0x26e)](this),this[_0x2520ce(0x2c2)]=0x0,this[_0x2520ce(0x295)](),this['createBattlerGaugeSprite'](),this[_0x2520ce(0x2e5)](),this[_0x2520ce(0x2fc)]();},Sprite_MultiLayerHpContainer['prototype'][_0x18ab75(0x295)]=function(){const _0x10a350=_0x18ab75;if(!Sprite_MultiLayerHpFace[_0x10a350(0x2f0)][_0x10a350(0x2af)])return;const _0x2c1d79=new Sprite_MultiLayerHpFace(this[_0x10a350(0x1c8)]);this[_0x10a350(0x2bb)](_0x2c1d79),this[_0x10a350(0x33f)]=_0x2c1d79;},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x26b)]=function(){const _0x2b16bb=_0x18ab75;return Sprite_MultiLayerHpFace[_0x2b16bb(0x2f0)]['show']?Sprite_MultiLayerHpContainer['SETTINGS'][_0x2b16bb(0x26b)]:0x0;},Sprite_MultiLayerHpContainer['prototype'][_0x18ab75(0x2b7)]=function(){const _0x2e09e6=_0x18ab75;if(!Sprite_MultiLayerHpGauge[_0x2e09e6(0x2f0)][_0x2e09e6(0x2af)])return;const _0x1bdd10=new Sprite_MultiLayerHpGauge(this[_0x2e09e6(0x1c8)]);this['addChild'](_0x1bdd10),this[_0x2e09e6(0x365)]=_0x1bdd10;const _0x47d83f=this[_0x2e09e6(0x26b)](),_0x16dc6b=Sprite_MultiLayerHpContainer[_0x2e09e6(0x2f0)]['bufferX'],_0x211730=Sprite_MultiLayerHpGauge['SETTINGS'][_0x2e09e6(0x31d)];_0x1bdd10['x']=_0x47d83f,_0x1bdd10['x']+=_0x16dc6b,_0x1bdd10['x']+=_0x211730['x'],_0x1bdd10['y']=0x0,_0x1bdd10['y']+=_0x211730['y'],_0x1bdd10[_0x2e09e6(0x2f7)](this[_0x2e09e6(0x1c8)],'hp'),this[_0x2e09e6(0x1a4)]();},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x28b)]=function(){const _0x5e3db8=_0x18ab75,_0x896c63=this[_0x5e3db8(0x26b)](),_0x5fe1d0=Sprite_MultiLayerHpContainer[_0x5e3db8(0x2f0)]['bufferX'],_0x17af30=Scene_Battle[_0x5e3db8(0x1e9)][_0x5e3db8(0x266)],_0x96dbbc=Math[_0x5e3db8(0x2bd)]($gameTroop[_0x5e3db8(0x2c9)](),Scene_Battle[_0x5e3db8(0x1e9)]['perRow']);return Math[_0x5e3db8(0x197)](_0x17af30/_0x96dbbc)-_0x5fe1d0*0x2-_0x896c63;},Sprite_MultiLayerHpContainer['prototype'][_0x18ab75(0x1a4)]=function(){const _0x4a78ef=_0x18ab75;if(!this[_0x4a78ef(0x365)])return;const _0xde910=this[_0x4a78ef(0x28b)]();this[_0x4a78ef(0x365)]['setWidth'](_0xde910);},Sprite_MultiLayerHpContainer['prototype'][_0x18ab75(0x2e5)]=function(){const _0xdc08bf=_0x18ab75;if(!Sprite_MultiLayerHpStates[_0xdc08bf(0x2f0)]['show'])return;const _0x8c5497=new Sprite_MultiLayerHpStates(this[_0xdc08bf(0x1c8)]);this[_0xdc08bf(0x2bb)](_0x8c5497),this[_0xdc08bf(0x350)]=_0x8c5497;const _0x5ed1ee=this[_0xdc08bf(0x26b)](),_0xbbc287=Sprite_MultiLayerHpContainer['SETTINGS'][_0xdc08bf(0x226)],_0x5aefa8=Sprite_MultiLayerHpStates['SETTINGS'][_0xdc08bf(0x31d)];_0x8c5497['x']=_0x5ed1ee,_0x8c5497['x']+=_0xbbc287,_0x8c5497['x']+=_0x5aefa8['x'],_0x8c5497['y']=0x0,_0x8c5497['y']+=_0x5aefa8['y'],this['updateStatesWidth']();},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x18e)]=function(){const _0x185f98=_0x18ab75;if(!this[_0x185f98(0x350)])return;const _0x780751=this[_0x185f98(0x28b)]();this[_0x185f98(0x350)][_0x185f98(0x319)](_0x780751);},Sprite_MultiLayerHpContainer['prototype'][_0x18ab75(0x2fc)]=function(){const _0x4252d3=_0x18ab75;this[_0x4252d3(0x1de)]!==$gameTroop['totalVisibleMultiLayerHpGaugeCount']()&&(this[_0x4252d3(0x2b4)](),this['setBitmapSize']());if(this[_0x4252d3(0x25d)]!==$gameTroop['visibleMultiLayerHpGaugeMembers']()[_0x4252d3(0x225)](this[_0x4252d3(0x1c8)])){if('fEcWC'!==_0x4252d3(0x245)){const _0x5c4467=_0x109637[_0x4252d3(0x34e)](this[_0x4252d3(0x301)]/_0x567bc1[_0x4252d3(0x318)])*_0x13c5d4[_0x4252d3(0x318)];this['setFrame'](0x0,0x0,_0x5c4467,this[_0x4252d3(0x30b)][_0x4252d3(0x297)]);}else this['setIndexData'](),this[_0x4252d3(0x2fe)]();}this['_finishChecks']=!![];},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x2b4)]=function(){const _0x3c9a29=_0x18ab75;this[_0x3c9a29(0x1de)]=$gameTroop[_0x3c9a29(0x2c9)]();},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x18c)]=function(){const _0x2c92ab=_0x18ab75,_0x508423=Scene_Battle[_0x2c92ab(0x1e9)][_0x2c92ab(0x266)],_0x433d40=Math[_0x2c92ab(0x2bd)](this['_lastTotalVisibleGauges'],Scene_Battle[_0x2c92ab(0x1e9)]['perRow']);return Math['floor'](_0x508423/_0x433d40);},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x253)]=function(){const _0x3e4cab=_0x18ab75,_0x2db3e0=this['calcWidth']();this[_0x3e4cab(0x36f)]=_0x2db3e0;const _0x156243=Sprite_MultiLayerHpContainer['SETTINGS'][_0x3e4cab(0x26b)];this[_0x3e4cab(0x30b)]?_0x3e4cab(0x38e)!==_0x3e4cab(0x220)?(this[_0x3e4cab(0x30b)][_0x3e4cab(0x2ab)](),this['bitmap'][_0x3e4cab(0x270)](_0x2db3e0,_0x156243),this[_0x3e4cab(0x19b)]=_0x2db3e0,this[_0x3e4cab(0x297)]=_0x156243,this[_0x3e4cab(0x1a4)](),this[_0x3e4cab(0x18e)]()):(_0x49c440[_0x3e4cab(0x1f0)]['Game_Troop_setup'][_0x3e4cab(0x26e)](this,_0x44efe7),this[_0x3e4cab(0x22a)]()):this[_0x3e4cab(0x30b)]=new Bitmap(_0x2db3e0,_0x156243),this['_lastIndex']=undefined;},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x19a)]=function(){const _0x10c376=_0x18ab75;this[_0x10c376(0x25d)]=$gameTroop['visibleMultiLayerHpGaugeMembers']()[_0x10c376(0x225)](this[_0x10c376(0x1c8)]);},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x2ee)]=function(){const _0x702edc=_0x18ab75;Sprite_Clickable['prototype'][_0x702edc(0x2ee)][_0x702edc(0x26e)](this);if(!this[_0x702edc(0x1c8)])return;Graphics[_0x702edc(0x30a)]%Sprite_MultiLayerHpContainer['SETTINGS']['checkFrequency']===0x0&&(_0x702edc(0x260)!==_0x702edc(0x378)?this[_0x702edc(0x2c3)]():(this[_0x702edc(0x2b9)]=_0x15b461,this[_0x702edc(0x34f)](),this['_battler']&&(this[_0x702edc(0x1ec)]=-0x1,this[_0x702edc(0x229)]=-0x1,this[_0x702edc(0x2cd)]()))),this[_0x702edc(0x2df)](),this[_0x702edc(0x351)](),this['updateSelectionEffect']();},Sprite_MultiLayerHpContainer['prototype']['calcPositionX']=function(){const _0x3c30ae=_0x18ab75;if(this[_0x3c30ae(0x25d)]<0x0){if('OgKDq'===_0x3c30ae(0x32a))return Graphics['width']*0xa;else this[_0x3c30ae(0x33a)](...arguments);}const _0x5dbec1=Scene_Battle[_0x3c30ae(0x1e9)][_0x3c30ae(0x266)],_0x5c253a=Math['min'](this[_0x3c30ae(0x1de)],Scene_Battle['MULTI_LAYER_HP_GAUGE'][_0x3c30ae(0x26d)]),_0x40cd43=Math[_0x3c30ae(0x197)](_0x5dbec1/_0x5c253a),_0x1aece7=this[_0x3c30ae(0x25d)]%Scene_Battle[_0x3c30ae(0x1e9)][_0x3c30ae(0x26d)];let _0x278915=_0x40cd43*_0x1aece7;return _0x278915+=Sprite_MultiLayerHpContainer[_0x3c30ae(0x2f0)]['offset']['x'],_0x278915;},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x2fe)]=function(){const _0x2332f1=_0x18ab75;if(this[_0x2332f1(0x1d4)])return;if(this[_0x2332f1(0x25d)]===undefined)return;if(this[_0x2332f1(0x25d)]<0x0)return this['x']=Graphics[_0x2332f1(0x19b)]*0xa;const _0x42203b=this[_0x2332f1(0x1aa)]();this[_0x2332f1(0x232)]=_0x42203b,this['x']=_0x42203b;},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)][_0x18ab75(0x20a)]=function(){const _0x44df70=_0x18ab75;if(this[_0x44df70(0x25d)]<0x0)return _0x44df70(0x234)!==_0x44df70(0x1a3)?Graphics[_0x44df70(0x297)]*0xa:_0x59edc5[_0x44df70(0x2f0)][_0x44df70(0x265)];const _0x24fd0c=Sprite_MultiLayerHpContainer[_0x44df70(0x2f0)],_0x40a6d1=Math[_0x44df70(0x34e)](this[_0x44df70(0x25d)]/Scene_Battle[_0x44df70(0x1e9)][_0x44df70(0x26d)]);let _0x23f626=_0x40a6d1*(0x4+_0x24fd0c[_0x44df70(0x26b)]);return _0x23f626+=Sprite_MultiLayerHpContainer[_0x44df70(0x2f0)][_0x44df70(0x31d)]['y'],_0x23f626;},Sprite_MultiLayerHpContainer['prototype'][_0x18ab75(0x2df)]=function(){const _0x506845=_0x18ab75;if(this['_hold'])return;if(this[_0x506845(0x25d)]===undefined)return;if(this[_0x506845(0x25d)]<0x0)return this['y']=Graphics[_0x506845(0x297)]*0xa;const _0x1fd9ad=Sprite_MultiLayerHpContainer[_0x506845(0x2f0)];let _0x3ed6af=this[_0x506845(0x20a)]();this['_lastPositionY']=_0x3ed6af;const _0x291ca8=SceneManager[_0x506845(0x1c6)]['_helpWindow'];_0x291ca8&&_0x291ca8[_0x506845(0x342)]&&_0x1fd9ad[_0x506845(0x269)]&&(_0x3ed6af+=_0x1fd9ad['repositionHelpY']),this['y']=_0x3ed6af;},Sprite_MultiLayerHpContainer['prototype'][_0x18ab75(0x351)]=function(){const _0x1e265f=_0x18ab75,_0x4edcfd=Sprite_MultiLayerHpContainer[_0x1e265f(0x2f0)][_0x1e265f(0x215)];this['opacity']+=this[_0x1e265f(0x1d4)]?-_0x4edcfd:_0x4edcfd;},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)]['updateSelectionEffect']=function(){const _0x1e512f=_0x18ab75;if(!this[_0x1e512f(0x1c8)])return;const _0x1138d8=SceneManager[_0x1e512f(0x1c6)][_0x1e512f(0x1ad)];if(!_0x1138d8)return;const _0x340751=_0x1138d8[_0x1e512f(0x28c)](this[_0x1e512f(0x1c8)]);if(!_0x340751)return;const _0x2e025e=_0x340751[_0x1e512f(0x1f1)]();if(!_0x2e025e)return;this[_0x1e512f(0x284)](_0x2e025e[_0x1e512f(0x25a)]);},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)]['checkNeedReplacement']=function(){const _0xfefe67=_0x18ab75;if(!this[_0xfefe67(0x2e1)])return;if(this[_0xfefe67(0x1de)]!==$gameTroop['totalVisibleMultiLayerHpGaugeCount']()){this[_0xfefe67(0x2b4)]();if(this[_0xfefe67(0x36f)]!==this[_0xfefe67(0x18c)]()){if(_0xfefe67(0x30f)===_0xfefe67(0x30f))return this['processReplacement']();else{const _0x48633e=this['styleName']();_0x829cbe[_0xfefe67(0x2a6)][_0xfefe67(0x24c)]=this[_0xfefe67(0x2d6)]();const _0x2a2910=_0xa95967[_0xfefe67(0x2a6)][_0xfefe67(0x1bb)](_0x48633e,_0xc8989,_0x1103e4,_0x2de58f,_0x2cb8a3,0x1,!![]),_0x57f8a1=this[_0xfefe67(0x38f)]();this[_0xfefe67(0x30b)][_0xfefe67(0x257)](_0x2a2910,_0x57f8a1);const _0xab3646=this['gaugeRate']();if(_0x3bb586>0x1&&_0xab3646<0x1){const _0x5d00e9=_0x1930ae[_0xfefe67(0x192)](_0x10aff6-0x1),_0x2cf27b=_0x38d90a[_0xfefe67(0x1d9)](_0x3545c2-0x1),_0x5dacde=_0x324ab1[_0xfefe67(0x2a6)]['GetPolygonStyle'](_0x48633e,_0x402f38,_0x58b510,_0x5475a6,_0x2b3ca1,0x1,![]),_0x3edd88=this['bitmap'][_0xfefe67(0x326)][_0xfefe67(0x1fd)](_0x861f88,_0x3777ef,_0x1d1a04+_0x49d3e6,_0x4a2081);this[_0xfefe67(0x30b)][_0xfefe67(0x2c0)](_0x5dacde,_0x5d00e9,_0x2cf27b,_0x3edd88);}const _0x3cb270=_0x1a3d8b[_0xfefe67(0x192)](_0xba7196),_0x6df07d=_0x17b0f4[_0xfefe67(0x1d9)](_0xc88372),_0x1de627=this[_0xfefe67(0x30b)]['_context'][_0xfefe67(0x1fd)](_0x423315,_0xfa857,_0x4a01dc+_0x326ecd,_0x26e788),_0x32e2ac=_0x4fed9c[_0xfefe67(0x2a6)][_0xfefe67(0x1bb)](_0x48633e,_0x295874,_0x5d20cc,_0x21c311,_0x27dec3,_0xab3646,![]);this[_0xfefe67(0x30b)][_0xfefe67(0x2c0)](_0x32e2ac,_0x3cb270,_0x6df07d,_0x1de627,_0x57f8a1);}}}if(this['_lastIndex']!==$gameTroop[_0xfefe67(0x280)]()[_0xfefe67(0x225)](this[_0xfefe67(0x1c8)])){if(_0xfefe67(0x22c)!==_0xfefe67(0x1d3)){this[_0xfefe67(0x19a)]();if(this[_0xfefe67(0x232)]!==this[_0xfefe67(0x1aa)]()||this[_0xfefe67(0x24e)]!==this[_0xfefe67(0x20a)]()){if(_0xfefe67(0x18f)!==_0xfefe67(0x1a6))return this[_0xfefe67(0x1d5)]();else _0x1bac4f+=_0x6f91ac[_0xfefe67(0x2a4)];}}else{const _0x2c1165=_0x33774f[_0xfefe67(0x2f0)][_0xfefe67(0x215)];this[_0xfefe67(0x2c2)]+=this[_0xfefe67(0x1d4)]?-_0x2c1165:_0x2c1165;}}},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)]['processReplacement']=function(){const _0x339066=_0x18ab75;this[_0x339066(0x1d4)]=!![];for(const _0x3afcb1 of this[_0x339066(0x1c1)]){if(_0x339066(0x377)==='RpjuV'){if(_0x3afcb1)_0x3afcb1[_0x339066(0x1d4)]=!![];}else{const _0xaa95b2=_0x11eb13['SETTINGS'][_0x339066(0x26b)];this[_0x339066(0x2dc)]=new _0x1f1eac(),this['addChild'](this[_0x339066(0x2dc)]),this[_0x339066(0x2dc)][_0x339066(0x30b)]=new _0x45f402(_0xaa95b2,_0xaa95b2),this[_0x339066(0x2ea)]();}}const _0x3b328b=SceneManager[_0x339066(0x1c6)];if(_0x3b328b)_0x3b328b[_0x339066(0x35c)](this[_0x339066(0x1c8)]);},Sprite_MultiLayerHpContainer[_0x18ab75(0x20f)]['getStateTooltipBattler']=function(){const _0x1336ad=_0x18ab75;if(this[_0x1336ad(0x1d4)])return null;if(!Sprite_MultiLayerHpContainer[_0x1336ad(0x2f0)][_0x1336ad(0x30c)])return null;return this[_0x1336ad(0x1c8)];};function _0x173b(){const _0x76a5b2=['reduceRedundancy','letterFontName','rowSpacing','labelOutlineColor','MULTI_LAYER_HP_GAUGE','registerMultiLayerHpGaugePositionY','_dummyWindow','_targetValue','855755sYNRNx','quad','getMultiLayerHpGaugeFaceIndex','MultiLayerHpGauge','mainSprite','updateMultiLayerHpGaugeFaceGraphicData','create','offsetX','placeBreakShieldIcon','VisuMZ_2_BattleSystemBTB','VisuMZ_2_BattleSystemFTB','members','setFrame','#f26c4f','ARRAYEVAL','currentMultiLayerHpGaugeLayer','createLinearGradient','removeState','format','normalOffsetY','drawText','#7cc576','%3%','bitmapWidth','_multiLayerHpGaugeBorderData','version','blt','borderthickness','valueOutlineWidth','calcPositionY','innerWidth','labelColor','ConvertParams','offsetY','prototype','updateMultiLayerHpGaugeBorderData','VisuMZ_2_BattleSystemCTB','otbHelpOffsetY','left','_lastLetter','fadeSpeed','Graphic','trim','372000zBVlAR','TjHUX','_multiLayerHpGaugeContainer','pfWhy','atb','2NgfiBd','getColor','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','mmjnb','UUInV','XgNxl','calcWindowHeight','reposition','indexOf','bufferX','uAldP','1224060ZGWrux','_targetMaxValue','clearMultiLayerHpGaugeMembers','TGpjh','VXBFH','createBorderSprite','#fff200','valuePercentDigits','_lastPlural','exit','_lastPositionX','otbEachRowOffsetY','OwKbK','#fff799','VisuMZ_2_BattleSystemATB','isStateAffected','loadSvActor','addBreakShieldIcon','ARRAYJSON','_stateSprite','textColor','_plural','useDigitGrouping','battler','_letterSprite','updateGraphicHue','showMultiLayerHpGauge','getMultiLayerHpGaugeBgColorData','valueFmt','fEcWC','stateIcon','tbfQl','ptbHelpOffsetY','createAllWindows','createMultiLayerHpGauges','filter','_maxValueSegment','#7accc8','_lastPositionY','applyNewBitmap','split','otb','onTurnEnd','setBitmapSize','1438031kbzHps','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','PxKfp','drawVisualStyleGaugeBack','bitmapHeight','mnZLJ','_blendColor','clearBitmaps','EVAL','_lastIndex','#00a99d','updateStateTurns','RBMdK','ARRAYSTR','face','parse','drawFullVisualStyleGauge','gaugeHeight','maxWidth','clearRect','fillRect','repositionForHelp','BYuWi','faceSize','Game_Battler_addState','perRow','call','round','resize','Game_Battler_removeState','Window_STB_TurnOrder_updatePosition','removeChild','totalVisibleMultiLayerHpGauges','updateGraphic','checkUpdateRequests','isAllDead','meetsMultiLayerGaugeLifeState','Gauge','stb','#ffdeec','layer9_color1','VisuMZ_1_BattleCore','bgColor1','svenemy','visibleMultiLayerHpGaugeMembers','btb','_multiLayerHpGaugeTotalLayers','vPwub','setBlendColor','etb','layer6_color2','shouldDisplayBreakShields','kiXiI','iconHeight','color1','calcBitmapWidth','findTargetSprite','atbHelpOffsetY','Sprite_FieldGaugeATB_updatePosition','isVisualHpGaugeDisplayed','Game_Battler_onTurnEnd','letterFontSize','layer3_color1','repositionBattleLog','appear','createBattlerGraphicSprite','_graphicEnemy','height','layers','VisuMZ_2_BattleSystemOTB','bUVyc','layer7_color1','breakShields','loadSvEnemy','getMultiLayerHpGaugeTotalLayers','_canShowMultiLayerHpGauge','refresh','hswMe','isAppeared','createDisplayObjects','helpOffsetY','paintOpacity','VisualGaugeStyles','layer2_color2','btbHelpOffsetY','Window_BattleLog_update','createDrawWindow','clear','VRLlt','btbEachRowOffsetY','color2','show','isSideView','LKqjT','LayerColors','drawLetter','setTotalGauges','endAction','eebZb','createBattlerGaugeSprite','layer%1','_bitmapWidth','createGraphicSprite','addChild','transform','min','drawLetterSprite','repositionHelpY','drawVisualStyleGaugeFront','Game_BattlerBase_clearStates','opacity','checkNeedReplacement','_cache_visibleMultiLayerHpGaugeMembers','_stateIconSprite','updateVisualStateEffectsOverlay','name','BottomPosition','totalVisibleMultiLayerHpGaugeCount','AAEJx','isEnemy','vycdF','updateBitmap','ctb','drawStateIcons','map','createMultiLayerHpGaugeSprites','ClearTextOffset','createBgSprite','Defaults','States','maxHpSegmentAmount','XQGYf','layer9_color2','battleLogPerRowOffsetY','Game_Battler_onBattleStart','ARRAYFUNC','_borderSprite','loadEnemy','_svBattlerSprite','updatePositionY','currentValue','_finishChecks','updateBreakShieldIcon','aNWtM','Settings','createBattlerGaugeStates','ftb','Game_Troop_setup','_requestMultiLayerHpGaugeStateUpdate','Scene_Battle_createAllWindows','drawBorderSprite','cNCoj','iconIndex','7642968XqPXFU','update','onBattleStart','SETTINGS','#6dcff6','BUdzR','VgMSK','hpRate','PvQRj','return\x200','setup','drawActorIcons','_graphicFaceIndex','perRowOffsetY','drawBgSprite','finishChecks','layer7_color2','updatePositionX','layer8_color1','createLetterSprite','_frameWidth','hideMultiLayerGauge','top','eachRowOffsetY','_graphicSprite','flaCT','move','EnemyOverlay','_graphicSv','frameCount','bitmap','stateTooltipsEnable','parameters','#2e3192','OtEQp','wkczd','ctbNormalOffsetY','updatePosition','toUpperCase','drawLabel','getMultiLayerHpGaugeFaceName','VisualStateEffects','Bocxh','iconWidth','setWidth','requestMultiLayerHpGaugeStateUpdate','layer4_color2','right','offset','RrHiq','checkFrequency','constructor','VisuMZ_2_BattleSystemETB','472722SgjIxe','endBattleFadeSpeed','toFixed','hpGauge','_context','_logWindow','styleName','canShowMultiLayerHpGauge','OgKDq','_multiLayerHpGaugeFaceGraphicData','getMultiLayerHpGaugeFaceGraphicData','BREAK_SHIELDS_ENEMIES','hasSvBattler','isMultiLayerGaugeLifeStatePersistant','ptbEachRowOffsetY','gradientFillRect','changeFaceGraphic','_bgSprite','Game_BattlerBase_appear','Game_BattlerBase_updateStateTurns','Window_OTB_TurnOrder_updatePosition','label','fontFace','prepareGraphic','initialize','_graphicFaceName','BoaFB','svBattlerName','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','_graphicsSprite','#605ca8','temporalMultiLayerGauge','visible','GroupDigits','ARRAYSTRUCT','enemy','etbHelpOffsetY','Compatibility','updateMultiLayerHpGaugeContainerRemoval','note','fontSize','wMrgF','updateMultiLayerHpGaugeContainerEndBattle','totalVisibleMultiLayerHpGaugeRows','floor','createBitmap','_statesSprite','updateOpacity','getMultiLayerHpGaugeGraphicType','gaugeRate','reduceRedundantHpGauge','UXOgg','setupLabelFont','General','VisuMZ_2_BattleSystemSTB','drawGauge','puXsE','bgColor','addMultiLayerHpGaugeSprite','RepositionTopForHelp','mainFontFace','measureTextWidth','strokeRect','faceGraphic','layer3_color2','drawValue','#ed1c24','_gaugeSprite','_multiLayerHpGaugeBgColorData','includes','defaultLayers','gaugeX','layer5_color1','boxWidth','2577132Nossqz','etbEachRowOffsetY','bgColor2','_lastWidth','Dknwo','clamp','VisuMZ_3_VisualGaugeStyles','Window_PTB_TurnOrder_updatePosition','ARRAYNUM','FUNC','max','RpjuV','SvncS','deathStateId','match','textHeight','_phase','persistMultiLayerGauge','layer8_color2','getMultiLayerHpGaugeBorderThickness','_textWidth','BREAK_SHIELDS_STUN_STATE','setHue','_letter','#000000','layer10_color2','#f06eaa','btbNormalOffsetY','clearStates','svactor','battleEnd','atbNormalOffsetY','bind','_graphicType','TmAGp','gaugeBackColor','Window_ETB_TurnOrder_updatePosition','calcWidth','changeSvActorGraphic','updateStatesWidth','yZjQj','ftbNormalOffsetY','mhp','getMultiLayerHpGaugeColor1','updateMultiLyerHpGaugePositionY','contents','Scene_Battle_update','BattleManager_endAction','ceil','getStyleName','qwTuF','setIndexData','width','DisplayPosition','Window_CTB_TurnOrder_updatePosition','addLoadListener','hpA','revive','hpGaugeColor1','updateMultiLayerHpGaugeContainer','IYQRd','updateGaugeWidth','faceWidth','rCXTS','ftbEachRowOffsetY','gyAoC','layer2_color1','calcPositionX','getMultiLayerHpGaugeBgColor2','svActorHorzCells','_spriteset','Sprite_Battler_updateVisualStateEffectsOverlay','layer10_color1','color','RegExp','thick','destroy','ptb','itemHeight','STRUCT','ctbEachRowOffsetY','getMultiLayerHpGaugeBgColor1','svActorVertCells','Sprite_Enemy_updateStateSprite','GetPolygonStyle','updateStateSprite','Game_Enemy_transform','_graphicHue','_multiLayerHpGaugePositionY','Scene_Battle_createDisplayObjects','children','Sprite_Battler_isVisualHpGaugeDisplayed','CLfUc','description','battlerName','_scene','changeEnemyGraphic','_battler','currentMaxValue','borderColor','borderThick','QAmfW','battlerHue','getMultiLayerHpGaugeBorderColor','createMultiLayerHpGaugeContainer','ptbNormalOffsetY','layer6_color1','yjabB','nUzax','_hold','processReplacement','updateLetterSprite','drawFullGauge','Game_BattlerBase_revive','getMultiLayerHpGaugeColor2','normalColor','getMultiLayerHpGaugeBorderData','addState','_breakShieldSprite','_lastTotalVisibleGauges','valueOutlineColor','_helpWindow','VisuMZ_0_CoreEngine','redraw','loadFace','#0054a6'];_0x173b=function(){return _0x76a5b2;};return _0x173b();}function Sprite_MultiLayerHpFace(){const _0x276eb6=_0x18ab75;this[_0x276eb6(0x33a)](...arguments);}Sprite_MultiLayerHpFace[_0x18ab75(0x20f)]=Object[_0x18ab75(0x1f3)](Sprite['prototype']),Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x320)]=Sprite_MultiLayerHpFace,Sprite_MultiLayerHpFace[_0x18ab75(0x2f0)]={'show':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x216)][_0x18ab75(0x2af)]??!![],'drawLetter':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x216)][_0x18ab75(0x2b3)]??!![],'letterFontName':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)]['Graphic'][_0x18ab75(0x1e6)]??'','letterFontSize':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x216)][_0x18ab75(0x291)]??0x10},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x33a)]=function(_0x15b2e7){const _0x1a2b1b=_0x18ab75;this[_0x1a2b1b(0x1c8)]=_0x15b2e7,Sprite['prototype'][_0x1a2b1b(0x33a)][_0x1a2b1b(0x26e)](this),this[_0x1a2b1b(0x2d3)](),this[_0x1a2b1b(0x2ba)](),this[_0x1a2b1b(0x22d)](),this[_0x1a2b1b(0x300)]();},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x2d3)]=function(){const _0x53ff23=_0x18ab75,_0x15d05d=Sprite_MultiLayerHpContainer[_0x53ff23(0x2f0)][_0x53ff23(0x26b)];this['_bgSprite']=new Sprite(),this['addChild'](this[_0x53ff23(0x333)]),this[_0x53ff23(0x333)][_0x53ff23(0x30b)]=new Bitmap(_0x15d05d,_0x15d05d),this['drawBgSprite']();},Sprite_MultiLayerHpFace['prototype']['createGraphicSprite']=function(){const _0x382980=_0x18ab75,_0x3708dd=Sprite_MultiLayerHpContainer[_0x382980(0x2f0)]['faceSize'];this[_0x382980(0x305)]=new Sprite(),this['addChild'](this[_0x382980(0x305)]),this[_0x382980(0x305)][_0x382980(0x30b)]=new Bitmap(_0x3708dd,_0x3708dd),this[_0x382980(0x339)]();},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x22d)]=function(){const _0x2c032e=_0x18ab75,_0x32769f=Sprite_MultiLayerHpContainer[_0x2c032e(0x2f0)]['faceSize'];this[_0x2c032e(0x2dc)]=new Sprite(),this[_0x2c032e(0x2bb)](this[_0x2c032e(0x2dc)]),this[_0x2c032e(0x2dc)]['bitmap']=new Bitmap(_0x32769f,_0x32769f),this[_0x2c032e(0x2ea)]();},Sprite_MultiLayerHpFace['prototype'][_0x18ab75(0x300)]=function(){const _0x6defb0=_0x18ab75;if(!Sprite_MultiLayerHpFace[_0x6defb0(0x2f0)]['drawLetter'])return;const _0x29d090=Sprite_MultiLayerHpContainer[_0x6defb0(0x2f0)][_0x6defb0(0x26b)];this[_0x6defb0(0x240)]=new Sprite(),this[_0x6defb0(0x2bb)](this[_0x6defb0(0x240)]),this['_letterSprite'][_0x6defb0(0x30b)]=new Bitmap(_0x29d090,_0x29d090),this[_0x6defb0(0x1d6)]();},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x2fb)]=function(){const _0x1afa48=_0x18ab75,_0x4f0b9f=this[_0x1afa48(0x333)][_0x1afa48(0x30b)],_0x121747=ColorManager[_0x1afa48(0x21e)](this[_0x1afa48(0x1c8)][_0x1afa48(0x1b8)]()),_0x29701a=ColorManager[_0x1afa48(0x21e)](this['_battler'][_0x1afa48(0x1ab)]()),_0x14fb2b=Sprite_MultiLayerHpContainer['SETTINGS'][_0x1afa48(0x26b)];_0x4f0b9f[_0x1afa48(0x2ab)](),_0x4f0b9f['gradientFillRect'](0x0,0x0,_0x14fb2b,_0x14fb2b,_0x121747,_0x29701a,!![]),_0x4f0b9f[_0x1afa48(0x360)](0x0,0x0,_0x14fb2b,_0x14fb2b,_0x121747);},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)]['drawBorderSprite']=function(){const _0x38e5d6=_0x18ab75,_0x3b0564=this[_0x38e5d6(0x2dc)][_0x38e5d6(0x30b)],_0x3c8849=_0x38e5d6(0x384),_0x238ace=ColorManager[_0x38e5d6(0x21e)](this[_0x38e5d6(0x1c8)]['getMultiLayerHpGaugeBorderColor']()),_0x56c04c=this[_0x38e5d6(0x1c8)][_0x38e5d6(0x37f)](),_0x4de3cd=Sprite_MultiLayerHpContainer[_0x38e5d6(0x2f0)][_0x38e5d6(0x26b)];let _0x4afc17=0x0;_0x3b0564[_0x38e5d6(0x2ab)](),_0x3b0564[_0x38e5d6(0x268)](_0x4afc17,_0x4afc17,_0x4de3cd-_0x4afc17*0x2,_0x4de3cd-_0x4afc17*0x2,_0x3c8849),_0x4afc17+=0x1,_0x3b0564[_0x38e5d6(0x268)](_0x4afc17,_0x4afc17,_0x4de3cd-_0x4afc17*0x2,_0x4de3cd-_0x4afc17*0x2,_0x238ace),_0x4afc17+=_0x56c04c,_0x3b0564['fillRect'](_0x4afc17,_0x4afc17,_0x4de3cd-_0x4afc17*0x2,_0x4de3cd-_0x4afc17*0x2,_0x3c8849),_0x4afc17+=0x1,_0x3b0564[_0x38e5d6(0x267)](_0x4afc17,_0x4afc17,_0x4de3cd-_0x4afc17*0x2,_0x4de3cd-_0x4afc17*0x2);},Sprite_MultiLayerHpFace['prototype'][_0x18ab75(0x2be)]=function(){const _0x75e98f=_0x18ab75;if(!this[_0x75e98f(0x240)])return;const _0x13e0e0=this['_letterSprite'][_0x75e98f(0x30b)],_0x39c6b2=this[_0x75e98f(0x214)];if(!_0x39c6b2)return;const _0x2aa8c4=Sprite_MultiLayerHpFace['SETTINGS'],_0x375edb=Sprite_MultiLayerHpContainer[_0x75e98f(0x2f0)][_0x75e98f(0x26b)];_0x13e0e0['clear']();if(!this['_lastPlural'])return;_0x13e0e0[_0x75e98f(0x338)]=_0x2aa8c4[_0x75e98f(0x1e6)]||$gameSystem[_0x75e98f(0x35e)](),_0x13e0e0[_0x75e98f(0x34a)]=_0x2aa8c4[_0x75e98f(0x291)]||0x10,_0x13e0e0[_0x75e98f(0x201)](_0x39c6b2['trim'](),0x0,_0x375edb/0x2,_0x375edb*0x7/0x8,_0x375edb/0x2,'right');},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x339)]=function(){const _0x441e6a=_0x18ab75;this[_0x441e6a(0x38d)]=this[_0x441e6a(0x1c8)]['getMultiLayerHpGaugeGraphicType']();let _0x3a076b;switch(this[_0x441e6a(0x38d)]){case'face':this[_0x441e6a(0x33b)]=this[_0x441e6a(0x1c8)]['getMultiLayerHpGaugeFaceName'](),this[_0x441e6a(0x2f9)]=this[_0x441e6a(0x1c8)][_0x441e6a(0x1ef)](),_0x3a076b=ImageManager[_0x441e6a(0x1e3)](this['_graphicFaceName']),_0x3a076b['addLoadListener'](this[_0x441e6a(0x332)][_0x441e6a(0x38c)](this,_0x3a076b));break;case _0x441e6a(0x389):this[_0x441e6a(0x309)]=this[_0x441e6a(0x1c8)]['svBattlerName'](),_0x3a076b=ImageManager[_0x441e6a(0x238)](this[_0x441e6a(0x309)]),_0x3a076b['addLoadListener'](this[_0x441e6a(0x18d)][_0x441e6a(0x38c)](this,_0x3a076b));break;case _0x441e6a(0x27f):this[_0x441e6a(0x296)]=this[_0x441e6a(0x1c8)][_0x441e6a(0x1c5)](),_0x3a076b=ImageManager[_0x441e6a(0x29d)](this['_graphicEnemy']),_0x3a076b[_0x441e6a(0x19e)](this[_0x441e6a(0x1c7)]['bind'](this,_0x3a076b));break;case _0x441e6a(0x345):this['_graphicEnemy']=this[_0x441e6a(0x1c8)][_0x441e6a(0x1c5)](),_0x3a076b=ImageManager[_0x441e6a(0x2dd)](this[_0x441e6a(0x296)]),_0x3a076b['addLoadListener'](this[_0x441e6a(0x1c7)][_0x441e6a(0x38c)](this,_0x3a076b));break;}},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)]['changeFaceGraphic']=function(_0x1738f1){const _0x508d1d=_0x18ab75,_0x2f49b0=this[_0x508d1d(0x305)][_0x508d1d(0x30b)],_0x4a7202=this[_0x508d1d(0x1c8)][_0x508d1d(0x1ef)]()||0x0,_0x106019=Sprite_MultiLayerHpContainer[_0x508d1d(0x2f0)][_0x508d1d(0x26b)],_0x3523b8=_0x106019,_0x25c141=_0x106019,_0x4130fc=ImageManager[_0x508d1d(0x1a5)],_0x3edabc=ImageManager['faceHeight'],_0x2e0e0a=_0x106019/Math[_0x508d1d(0x376)](_0x4130fc,_0x3edabc),_0x496004=ImageManager[_0x508d1d(0x1a5)],_0x31e995=ImageManager['faceHeight'],_0x112b57=_0x4a7202%0x4*_0x4130fc+(_0x4130fc-_0x496004)/0x2,_0xa67d42=Math[_0x508d1d(0x34e)](_0x4a7202/0x4)*_0x3edabc+(_0x3edabc-_0x31e995)/0x2,_0x472467=(_0x3523b8-_0x4130fc*_0x2e0e0a)/0x2,_0x128a86=(_0x25c141-_0x3edabc*_0x2e0e0a)/0x2;_0x2f49b0[_0x508d1d(0x2ab)](),_0x2f49b0[_0x508d1d(0x207)](_0x1738f1,_0x112b57,_0xa67d42,_0x496004,_0x31e995,_0x472467,_0x128a86,_0x106019,_0x106019);},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x18d)]=function(_0x410983){const _0x547be5=_0x18ab75,_0x17d059=this['_graphicSprite']['bitmap'],_0x2f1943=Sprite_MultiLayerHpContainer[_0x547be5(0x2f0)][_0x547be5(0x26b)],_0x4b386a=_0x2f1943,_0x34f088=_0x2f1943,_0x4009a2=this[_0x547be5(0x309)]['match'](/\$/i),_0x57fa69=_0x4009a2?0x1:ImageManager[_0x547be5(0x1ac)],_0x491570=_0x4009a2?0x1:ImageManager[_0x547be5(0x1b9)],_0x81cc28=_0x410983[_0x547be5(0x19b)]/_0x57fa69,_0x480feb=_0x410983[_0x547be5(0x297)]/_0x491570,_0x585999=Math[_0x547be5(0x2bd)](0x1,_0x2f1943/_0x81cc28,_0x2f1943/_0x480feb),_0x23c6e6=_0x81cc28*_0x585999,_0x341b02=_0x480feb*_0x585999,_0x3a9a6e=Math['round']((_0x4b386a-_0x23c6e6)/0x2),_0x3b2855=Math[_0x547be5(0x26f)]((_0x34f088-_0x341b02)/0x2);_0x17d059['clear'](),_0x17d059[_0x547be5(0x207)](_0x410983,0x0,0x0,_0x81cc28,_0x480feb,_0x3a9a6e,_0x3b2855,_0x23c6e6,_0x341b02);},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x1c7)]=function(_0x4f0d0d){const _0x42faba=_0x18ab75,_0xbe4411=this['_graphicSprite'][_0x42faba(0x30b)],_0x29f44f=Sprite_MultiLayerHpContainer['SETTINGS'][_0x42faba(0x26b)],_0xc33a12=_0x29f44f,_0x3e4b92=_0x29f44f,_0x3e2751=Math[_0x42faba(0x2bd)](0x1,_0x29f44f/_0x4f0d0d[_0x42faba(0x19b)],_0x29f44f/_0x4f0d0d[_0x42faba(0x297)]),_0x38761f=_0x4f0d0d[_0x42faba(0x19b)]*_0x3e2751,_0x33c36e=_0x4f0d0d['height']*_0x3e2751,_0x2a1d14=Math[_0x42faba(0x26f)]((_0xc33a12-_0x38761f)/0x2),_0xe18aa8=Math['round']((_0x3e4b92-_0x33c36e)/0x2);_0xbe4411['clear'](),_0xbe4411[_0x42faba(0x207)](_0x4f0d0d,0x0,0x0,_0x4f0d0d['width'],_0x4f0d0d[_0x42faba(0x297)],_0x2a1d14,_0xe18aa8,_0x38761f,_0x33c36e);},Sprite_MultiLayerHpFace['prototype']['update']=function(){const _0x2c14b4=_0x18ab75;Sprite[_0x2c14b4(0x20f)][_0x2c14b4(0x2ee)][_0x2c14b4(0x26e)](this);if(!this[_0x2c14b4(0x1c8)])return;if(!this[_0x2c14b4(0x1c8)][_0x2c14b4(0x242)]())return;if(this[_0x2c14b4(0x1d4)])return;this['updateGraphic'](),this[_0x2c14b4(0x241)](),this[_0x2c14b4(0x1d6)]();},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x275)]=function(){const _0x11f654=_0x18ab75;if(!this['_battler'])return;if(!this[_0x11f654(0x305)])return;if(this['_graphicType']!==this[_0x11f654(0x1c8)][_0x11f654(0x352)]())return this[_0x11f654(0x339)]();switch(this['_graphicType']){case'face':this[_0x11f654(0x33b)]!==this['_battler']['getMultiLayerHpGaugeFaceName']()&&(_0x11f654(0x2f2)!=='BUdzR'?_0x3cdbb3['clearMultiLayerHpGaugeMembers']():this[_0x11f654(0x339)]());this[_0x11f654(0x2f9)]!==this['_battler'][_0x11f654(0x1ef)]()&&(_0x11f654(0x2f5)!==_0x11f654(0x33c)?this[_0x11f654(0x339)]():(_0xc93e(_0x11f654(0x255)[_0x11f654(0x1ff)](_0x5a56e3,_0x54fbd6,_0x5d0c99)),_0x533551['exit']()));break;case _0x11f654(0x389):this[_0x11f654(0x309)]!==this[_0x11f654(0x1c8)][_0x11f654(0x33d)]()&&this[_0x11f654(0x339)]();break;case _0x11f654(0x27f):case _0x11f654(0x345):if(this['_graphicEnemy']!==this[_0x11f654(0x1c8)][_0x11f654(0x1c5)]()){if(_0x11f654(0x2cc)===_0x11f654(0x219)){const _0x5e70f5=this[_0x11f654(0x337)](),_0x2f05e9=this['bitmap'][_0x11f654(0x35f)](_0x5e70f5);if(_0x2f05e9+this[_0x11f654(0x380)]+0x28>this['bitmap']['width'])return;const _0x380122=this[_0x11f654(0x204)](),_0x4aaf0c=this[_0x11f654(0x37b)]?this[_0x11f654(0x37b)]():this[_0x11f654(0x258)](),_0x4e8ae8=0x4,_0x809cf7=0x0,_0x30ef53=_0x380122,_0x2b6ca2=_0x4aaf0c;this[_0x11f654(0x356)](),this[_0x11f654(0x30b)][_0x11f654(0x2a5)]=0xff,this[_0x11f654(0x30b)][_0x11f654(0x201)](_0x5e70f5,_0x4e8ae8,_0x809cf7,_0x30ef53,_0x2b6ca2,_0x11f654(0x213)),_0x5b43e8['VisuMZ_3_VisualGaugeStyles']&&_0x201026['VisualGaugeStyles'][_0x11f654(0x2d2)]();}else this[_0x11f654(0x339)]();}break;}},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x241)]=function(){const _0x1865e2=_0x18ab75;if(!this[_0x1865e2(0x1c8)])return;if(!this['_graphicSprite'])return;if(this[_0x1865e2(0x1be)]===this[_0x1865e2(0x1c8)][_0x1865e2(0x1cd)]())return;this[_0x1865e2(0x1be)]=this[_0x1865e2(0x1c8)][_0x1865e2(0x1cd)](),Imported['VisuMZ_1_BattleCore']&&this['_battler'][_0x1865e2(0x32e)]()&&(this[_0x1865e2(0x1be)]=0x0),this[_0x1865e2(0x305)]['setHue'](this['_graphicHue']);},Sprite_MultiLayerHpFace[_0x18ab75(0x20f)][_0x18ab75(0x1d6)]=function(){const _0x2f1fa1=_0x18ab75;if(!this['_battler'])return;if(!this[_0x2f1fa1(0x240)])return;if(this[_0x2f1fa1(0x214)]===this[_0x2f1fa1(0x1c8)][_0x2f1fa1(0x383)]&&this[_0x2f1fa1(0x230)]===this[_0x2f1fa1(0x1c8)]['_plural'])return;this[_0x2f1fa1(0x214)]=this[_0x2f1fa1(0x1c8)][_0x2f1fa1(0x383)],this['_lastPlural']=this['_battler'][_0x2f1fa1(0x23d)],this['drawLetterSprite']();};function Sprite_MultiLayerHpGauge(){const _0xf16358=_0x18ab75;this[_0xf16358(0x33a)](...arguments);}Sprite_MultiLayerHpGauge['prototype']=Object[_0x18ab75(0x1f3)](Sprite_Gauge[_0x18ab75(0x20f)]),Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)]['constructor']=Sprite_MultiLayerHpGauge,Sprite_MultiLayerHpGauge[_0x18ab75(0x2f0)]={'show':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x279)][_0x18ab75(0x2af)]??!![],'bitmapHeight':0x20,'gaugeHeight':VisuMZ[_0x18ab75(0x1f0)]['Settings']['Gauge'][_0x18ab75(0x265)]??0x18,'styleName':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x279)][_0x18ab75(0x328)]??_0x18ab75(0x1ee),'offset':{'x':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)]['Gauge']['offsetX']??0x0,'y':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)]['Gauge'][_0x18ab75(0x20e)]??0x4}},Sprite_MultiLayerHpGauge['prototype'][_0x18ab75(0x33a)]=function(){const _0x50a0e9=_0x18ab75;Sprite_Gauge['prototype'][_0x50a0e9(0x33a)]['call'](this);},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x319)]=function(_0x4ebdde){const _0x4896e4=_0x18ab75;this['_bitmapWidth']=_0x4ebdde,this[_0x4896e4(0x34f)](),this[_0x4896e4(0x1c8)]&&(this[_0x4896e4(0x1ec)]=-0x1,this['_targetMaxValue']=-0x1,this[_0x4896e4(0x2cd)]());},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x34f)]=function(){const _0x3ba170=_0x18ab75,_0x32da03=this[_0x3ba170(0x204)](),_0x41266f=this[_0x3ba170(0x258)]();this[_0x3ba170(0x30b)]?(this[_0x3ba170(0x30b)]['resize'](_0x32da03,_0x41266f),this[_0x3ba170(0x19b)]=_0x32da03,this[_0x3ba170(0x297)]=_0x41266f):_0x3ba170(0x317)!==_0x3ba170(0x283)?this['bitmap']=new Bitmap(_0x32da03,_0x41266f):(this[_0x3ba170(0x30b)][_0x3ba170(0x2ab)](),this[_0x3ba170(0x30b)][_0x3ba170(0x270)](_0x8174d5,_0x33877c),this[_0x3ba170(0x19b)]=_0x1fb05f,this['height']=_0x44d4a6,this[_0x3ba170(0x1a4)](),this[_0x3ba170(0x18e)]());},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x258)]=function(){const _0x5d0938=_0x18ab75;return Sprite_MultiLayerHpGauge[_0x5d0938(0x2f0)][_0x5d0938(0x258)];},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)]['gaugeHeight']=function(){const _0x3327a0=_0x18ab75;return Sprite_MultiLayerHpGauge[_0x3327a0(0x2f0)][_0x3327a0(0x265)];},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x204)]=function(){const _0x5af531=_0x18ab75;return this[_0x5af531(0x2b9)]||0x80;},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)]['currentDisplayedValue']=function(){const _0x10603b=_0x18ab75;let _0x4783ec=this['currentValue']();return Imported['VisuMZ_0_CoreEngine']&&this[_0x10603b(0x23e)]()&&(_0x4783ec=VisuMZ['GroupDigits'](_0x4783ec)),_0x4783ec;},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x369)]=function(){return 0x0;},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x337)]=function(){const _0x3d9c69=_0x18ab75;return this[_0x3d9c69(0x1c8)]?this['_battler'][_0x3d9c69(0x2c7)]():TextManager[_0x3d9c69(0x19f)];},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)]['labelY']=function(){return 0x0;},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x20c)]=function(){const _0x415866=_0x18ab75;return ColorManager[_0x415866(0x1da)]();},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x1e8)]=function(){const _0x5d5330=_0x18ab75;return this[_0x5d5330(0x1df)]();},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)]['labelOutlineWidth']=function(){const _0x5eb1e9=_0x18ab75;return this[_0x5eb1e9(0x209)]();},Sprite_MultiLayerHpGauge['prototype'][_0x18ab75(0x2cd)]=function(){const _0xf7d357=_0x18ab75;if(!this[_0xf7d357(0x1c8)])return;if(!this['_battler'][_0xf7d357(0x242)]())return;if(this[_0xf7d357(0x1d4)])return;Sprite_Gauge[_0xf7d357(0x20f)][_0xf7d357(0x2cd)][_0xf7d357(0x26e)](this);},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x1e2)]=function(){const _0x1ef1e7=_0x18ab75;this['drawGauge'](),this[_0x1ef1e7(0x363)](),this[_0x1ef1e7(0x314)](),Imported[_0x1ef1e7(0x372)]&&VisuMZ[_0x1ef1e7(0x2a6)][_0x1ef1e7(0x2d2)]();},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x363)]=function(){const _0x5405ab=_0x18ab75,_0x547f73=this[_0x5405ab(0x2e0)](),_0x294a6f=this[_0x5405ab(0x1c9)](),_0x3ab70d=TextManager[_0x5405ab(0x1e9)][_0x5405ab(0x244)],_0x1c97f8=TextManager['MULTI_LAYER_HP_GAUGE'][_0x5405ab(0x22f)],_0x16b4dd=(_0x547f73/_0x294a6f*0x64)[_0x5405ab(0x324)](_0x1c97f8),_0x5213d1=Imported[_0x5405ab(0x1e1)]&&this[_0x5405ab(0x23e)](),_0x38d73f=_0x5213d1?VisuMZ[_0x5405ab(0x343)](_0x547f73):_0x547f73,_0x2dd2ce=_0x5213d1?VisuMZ[_0x5405ab(0x343)](_0x294a6f):_0x294a6f,_0x981554=_0x3ab70d['format'](_0x38d73f,_0x2dd2ce,_0x16b4dd),_0x299690=this[_0x5405ab(0x204)](),_0x3d0390=this[_0x5405ab(0x37b)]?this[_0x5405ab(0x37b)]():this['bitmapHeight'](),_0x3b0cdc=_0x299690-0x2,_0x1dbd49=_0x3d0390;this['setupValueFont'](),this['bitmap'][_0x5405ab(0x23c)]=ColorManager[_0x5405ab(0x1da)](),this[_0x5405ab(0x30b)][_0x5405ab(0x201)](_0x981554,0x0,0x0,_0x3b0cdc,_0x1dbd49,_0x5405ab(0x31c)),this['_textWidth']=this['bitmap'][_0x5405ab(0x35f)](_0x981554);if(Imported[_0x5405ab(0x372)]){if(_0x5405ab(0x1cc)===_0x5405ab(0x26a))return this[_0x5405ab(0x38f)]();else VisuMZ[_0x5405ab(0x2a6)]['ClearTextOffset']();}},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x314)]=function(){const _0x5ec116=_0x18ab75,_0x200883=this['label'](),_0x17126f=this[_0x5ec116(0x30b)]['measureTextWidth'](_0x200883);if(_0x17126f+this[_0x5ec116(0x380)]+0x28>this[_0x5ec116(0x30b)]['width'])return;const _0x3b63f5=this[_0x5ec116(0x204)](),_0x2386d4=this['textHeight']?this[_0x5ec116(0x37b)]():this['bitmapHeight'](),_0x3d8f5=0x4,_0x2dfd6d=0x0,_0x48db6d=_0x3b63f5,_0xc9cb1d=_0x2386d4;this[_0x5ec116(0x356)](),this[_0x5ec116(0x30b)][_0x5ec116(0x2a5)]=0xff,this[_0x5ec116(0x30b)]['drawText'](_0x200883,_0x3d8f5,_0x2dfd6d,_0x48db6d,_0xc9cb1d,_0x5ec116(0x213)),Imported['VisuMZ_3_VisualGaugeStyles']&&VisuMZ[_0x5ec116(0x2a6)]['ClearTextOffset']();},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x359)]=function(){const _0x122354=_0x18ab75,_0x501965=this[_0x122354(0x1c8)][_0x122354(0x1fc)](),_0x2ef9a6=this[_0x122354(0x204)](),_0x4f851a=this[_0x122354(0x37b)]?this['textHeight']():this['bitmapHeight'](),_0xcddd0=this['gaugeHeight'](),_0x448799=0x0,_0x29bd74=_0x4f851a-_0xcddd0,_0x4562a7=_0x2ef9a6-_0x448799,_0x59cbfa=_0xcddd0;this[_0x122354(0x30b)][_0x122354(0x2ab)](),this[_0x122354(0x1d7)](_0x501965,_0x448799,_0x29bd74,_0x4562a7,_0x59cbfa);},Sprite_MultiLayerHpGauge['prototype'][_0x18ab75(0x353)]=function(){const _0x5f3f0a=_0x18ab75,_0x202614=this['_battler']['getMultiLayerHpGaugeTotalLayers']();if(_0x202614<=0x1)return this[_0x5f3f0a(0x1c8)][_0x5f3f0a(0x2f4)]();const _0x446575=this[_0x5f3f0a(0x1c8)][_0x5f3f0a(0x191)]/_0x202614,_0x46a88d=Math['floor'](this[_0x5f3f0a(0x1c8)]['hp']/_0x446575),_0x3f1ecb=this['_battler']['hp']-_0x446575*_0x46a88d;return _0x3f1ecb/_0x446575;},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x1d7)]=function(_0x58a1fb,_0x25ecd0,_0x5eea31,_0x5be1a9,_0x432d5b){const _0x5b07a6=_0x18ab75;if(Imported[_0x5b07a6(0x372)]){if(_0x5b07a6(0x2eb)!=='cNCoj'){if(!_0x4b8e9e[_0x5b07a6(0x2f0)][_0x5b07a6(0x2af)])return;const _0x50adeb=new _0x51e158(this[_0x5b07a6(0x1c8)]);this[_0x5b07a6(0x2bb)](_0x50adeb),this['_statesSprite']=_0x50adeb;const _0x51a593=this[_0x5b07a6(0x26b)](),_0x190dc5=_0x3b36bf[_0x5b07a6(0x2f0)][_0x5b07a6(0x226)],_0x5d0757=_0x328cea['SETTINGS'][_0x5b07a6(0x31d)];_0x50adeb['x']=_0x51a593,_0x50adeb['x']+=_0x190dc5,_0x50adeb['x']+=_0x5d0757['x'],_0x50adeb['y']=0x0,_0x50adeb['y']+=_0x5d0757['y'],this['updateStatesWidth']();}else{this[_0x5b07a6(0x264)](_0x58a1fb,_0x25ecd0,_0x5eea31,_0x5be1a9,_0x432d5b);return;}}const _0x3ca534=this['gaugeBackColor']();this[_0x5b07a6(0x30b)][_0x5b07a6(0x268)](_0x25ecd0,_0x5eea31,_0x5be1a9,_0x432d5b,_0x3ca534),_0x25ecd0+=0x1,_0x5eea31+=0x1,_0x5be1a9-=0x2,_0x432d5b-=0x2;const _0x16f2e1=this['gaugeRate']();if(_0x58a1fb>0x1&&_0x16f2e1<0x1){const _0x47b482=ColorManager[_0x5b07a6(0x192)](_0x58a1fb-0x1),_0x3f5336=ColorManager[_0x5b07a6(0x1d9)](_0x58a1fb-0x1);this['bitmap'][_0x5b07a6(0x331)](_0x25ecd0,_0x5eea31,_0x5be1a9,_0x432d5b,_0x47b482,_0x3f5336);}const _0x3290ba=Math[_0x5b07a6(0x34e)](_0x5be1a9*_0x16f2e1);if(_0x58a1fb>0x1){if(_0x5b07a6(0x31e)!=='eTrEv')this[_0x5b07a6(0x30b)][_0x5b07a6(0x268)](_0x25ecd0,_0x5eea31,_0x3290ba+0x1,_0x432d5b,_0x3ca534);else{_0x1d720c[_0x5b07a6(0x1f0)][_0x5b07a6(0x1c0)][_0x5b07a6(0x26e)](this);if(this[_0x5b07a6(0x327)])this[_0x5b07a6(0x327)][_0x5b07a6(0x1ea)]();}}const _0x46138b=ColorManager['getMultiLayerHpGaugeColor1'](_0x58a1fb),_0x51ee7d=ColorManager['getMultiLayerHpGaugeColor2'](_0x58a1fb);this[_0x5b07a6(0x30b)][_0x5b07a6(0x331)](_0x25ecd0,_0x5eea31,_0x3290ba,_0x432d5b,_0x46138b,_0x51ee7d);},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x2d6)]=function(){const _0xed306e=_0x18ab75,_0x1bad2f=this[_0xed306e(0x1c8)]['getMultiLayerHpGaugeTotalLayers']();return this[_0xed306e(0x1c8)]['mhp']/Math[_0xed306e(0x376)](0x1,_0x1bad2f);},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)]['drawFullVisualStyleGauge']=function(_0x24baf5,_0x31c0d6,_0x2b20a8,_0x24bce1,_0x173970){const _0x3c4407=_0x18ab75,_0x51f62e=this[_0x3c4407(0x328)]();VisuMZ[_0x3c4407(0x2a6)][_0x3c4407(0x24c)]=this[_0x3c4407(0x2d6)]();const _0xcd83c0=VisuMZ[_0x3c4407(0x2a6)][_0x3c4407(0x1bb)](_0x51f62e,_0x31c0d6,_0x2b20a8,_0x24bce1,_0x173970,0x1,!![]),_0x5a01d6=this[_0x3c4407(0x38f)]();this[_0x3c4407(0x30b)]['drawVisualStyleGaugeBack'](_0xcd83c0,_0x5a01d6);const _0x352a77=this[_0x3c4407(0x353)]();if(_0x24baf5>0x1&&_0x352a77<0x1){if(_0x3c4407(0x306)!=='flaCT')return _0x29d207['SETTINGS'][_0x3c4407(0x26b)];else{const _0x5b1b2d=ColorManager['getMultiLayerHpGaugeColor1'](_0x24baf5-0x1),_0x26992d=ColorManager[_0x3c4407(0x1d9)](_0x24baf5-0x1),_0x1d82da=VisuMZ[_0x3c4407(0x2a6)][_0x3c4407(0x1bb)](_0x51f62e,_0x31c0d6,_0x2b20a8,_0x24bce1,_0x173970,0x1,![]),_0x3c5b30=this[_0x3c4407(0x30b)][_0x3c4407(0x326)][_0x3c4407(0x1fd)](_0x31c0d6,_0x2b20a8,_0x31c0d6+_0x24bce1,_0x2b20a8);this[_0x3c4407(0x30b)]['drawVisualStyleGaugeFront'](_0x1d82da,_0x5b1b2d,_0x26992d,_0x3c5b30);}}const _0x44d957=ColorManager['getMultiLayerHpGaugeColor1'](_0x24baf5),_0x195299=ColorManager[_0x3c4407(0x1d9)](_0x24baf5),_0x27e13a=this[_0x3c4407(0x30b)][_0x3c4407(0x326)][_0x3c4407(0x1fd)](_0x31c0d6,_0x2b20a8,_0x31c0d6+_0x24bce1,_0x2b20a8),_0x580ff6=VisuMZ[_0x3c4407(0x2a6)][_0x3c4407(0x1bb)](_0x51f62e,_0x31c0d6,_0x2b20a8,_0x24bce1,_0x173970,_0x352a77,![]);this[_0x3c4407(0x30b)]['drawVisualStyleGaugeFront'](_0x580ff6,_0x44d957,_0x195299,_0x27e13a,_0x5a01d6);},Sprite_MultiLayerHpGauge[_0x18ab75(0x20f)][_0x18ab75(0x198)]=function(){const _0x588a63=_0x18ab75;return Sprite_MultiLayerHpGauge[_0x588a63(0x2f0)][_0x588a63(0x328)];};function Sprite_MultiLayerHpStates(){const _0x262339=_0x18ab75;this[_0x262339(0x33a)](...arguments);}Sprite_MultiLayerHpStates[_0x18ab75(0x20f)]=Object['create'](Sprite[_0x18ab75(0x20f)]),Sprite_MultiLayerHpStates[_0x18ab75(0x20f)][_0x18ab75(0x320)]=Sprite_MultiLayerHpStates,Sprite_MultiLayerHpStates[_0x18ab75(0x2f0)]={'show':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2d5)][_0x18ab75(0x2af)]??!![],'breakShields':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2d5)][_0x18ab75(0x29c)]??!![],'offset':{'x':VisuMZ[_0x18ab75(0x1f0)]['Settings']['States'][_0x18ab75(0x1f4)]??0x0,'y':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x2d5)]['offsetY']??0x1c}},Sprite_MultiLayerHpStates[_0x18ab75(0x20f)]['initialize']=function(_0x54f0af){const _0x1e8a39=_0x18ab75;this['_battler']=_0x54f0af,Sprite[_0x1e8a39(0x20f)][_0x1e8a39(0x33a)][_0x1e8a39(0x26e)](this),this['createDrawWindow'](),this[_0x1e8a39(0x34f)](),this[_0x1e8a39(0x1c8)][_0x1e8a39(0x31a)]();},Sprite_MultiLayerHpStates[_0x18ab75(0x20f)][_0x18ab75(0x2aa)]=function(){const _0x2dd4b3=_0x18ab75,_0x2da530={'x':0x0,'y':0x0,'width':Graphics['width'],'height':SceneManager[_0x2dd4b3(0x1c6)][_0x2dd4b3(0x223)](0x1,![])};this['_dummyWindow']=new Window_MultiLayerHpGaugeStatusBase(_0x2da530);},Sprite_MultiLayerHpStates[_0x18ab75(0x20f)][_0x18ab75(0x34f)]=function(){const _0x49eeb2=_0x18ab75,_0x45ab30=Graphics[_0x49eeb2(0x19b)],_0x1f15f3=ImageManager['iconHeight'];this[_0x49eeb2(0x30b)]=new Bitmap(_0x45ab30,_0x1f15f3);},Sprite_MultiLayerHpStates['prototype'][_0x18ab75(0x319)]=function(_0x2a9d8f){const _0x29a62e=_0x18ab75;this[_0x29a62e(0x1f9)](0x0,0x0,_0x2a9d8f,ImageManager['iconHeight']),this[_0x29a62e(0x19b)]=_0x2a9d8f,this['_frameWidth']=_0x2a9d8f;},Sprite_MultiLayerHpStates[_0x18ab75(0x20f)][_0x18ab75(0x2ee)]=function(){const _0x465167=_0x18ab75;Sprite['prototype'][_0x465167(0x2ee)][_0x465167(0x26e)](this);if(!this[_0x465167(0x1c8)])return;if(!this[_0x465167(0x1c8)]['showMultiLayerHpGauge']())return;if(this[_0x465167(0x1d4)])return;this[_0x465167(0x276)](),this[_0x465167(0x2e2)]();},Sprite_MultiLayerHpStates[_0x18ab75(0x20f)][_0x18ab75(0x276)]=function(){const _0x1f1abf=_0x18ab75;if(this[_0x1f1abf(0x1c8)]['_requestMultiLayerHpGaugeStateUpdate']){if(_0x1f1abf(0x2d7)===_0x1f1abf(0x29a))return this[_0x1f1abf(0x366)];else this[_0x1f1abf(0x1c8)][_0x1f1abf(0x2e8)]=undefined,this[_0x1f1abf(0x2a0)]();}},Sprite_MultiLayerHpStates['prototype']['updateBreakShieldIcon']=function(){const _0x19e164=_0x18ab75;if(!this[_0x19e164(0x1dd)])return;const _0x2cd33b=Game_Battler[_0x19e164(0x381)];if(_0x2cd33b<=0x0)return;this[_0x19e164(0x1c8)][_0x19e164(0x237)](_0x2cd33b)?this[_0x19e164(0x1dd)][_0x19e164(0x2c2)]=0x0:this['_breakShieldSprite'][_0x19e164(0x2c2)]=0xff;},Game_BattlerBase[_0x18ab75(0x20f)][_0x18ab75(0x31a)]=function(){},Game_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x31a)]=function(){const _0x1256e8=_0x18ab75;this[_0x1256e8(0x242)]()&&(_0x1256e8(0x288)===_0x1256e8(0x288)?this[_0x1256e8(0x2e8)]=!![]:(_0x497a8c[_0x1256e8(0x1f0)][_0x1256e8(0x336)]=_0x5e69d9[_0x1256e8(0x20f)]['updatePosition'],_0x391709[_0x1256e8(0x20f)][_0x1256e8(0x312)]=function(){const _0x37e452=_0x1256e8;_0x36aa09[_0x37e452(0x1f0)]['Window_OTB_TurnOrder_updatePosition'][_0x37e452(0x26e)](this);if(_0x1ae8ce[_0x37e452(0x2e4)][_0x37e452(0x19c)]!=='top')return;const _0x3210dc=_0x510460[_0x37e452(0x34d)]();if(_0x3210dc<=0x0)return;const _0x293ffb=_0x24649f['MultiLayerHpGauge']['Compatibility'][_0x37e452(0x251)],_0x2664e6=_0x293ffb[_0x37e452(0x304)];let _0x569c24=_0x2664e6*_0x3210dc;const _0x2263fb=_0xad9349[_0x37e452(0x1c6)][_0x37e452(0x1e0)];_0x2263fb&&_0x2263fb['visible']&&_0x4cb68f[_0x37e452(0x2e4)]['RepositionTopForHelp']?_0x569c24+=_0x293ffb[_0x37e452(0x2a4)]:_0x569c24+=_0x293ffb[_0x37e452(0x200)],this['y']+=_0x569c24;}));},VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x335)]=Game_BattlerBase[_0x18ab75(0x20f)][_0x18ab75(0x25f)],Game_BattlerBase[_0x18ab75(0x20f)][_0x18ab75(0x25f)]=function(){const _0x547d8f=_0x18ab75;VisuMZ[_0x547d8f(0x1f0)]['Game_BattlerBase_updateStateTurns'][_0x547d8f(0x26e)](this),this[_0x547d8f(0x31a)]();},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2da)]=Game_Battler[_0x18ab75(0x20f)]['onBattleStart'],Game_Battler[_0x18ab75(0x20f)][_0x18ab75(0x2ef)]=function(_0x5cedcf){const _0x534744=_0x18ab75;VisuMZ[_0x534744(0x1f0)][_0x534744(0x2da)][_0x534744(0x26e)](this,_0x5cedcf),this['requestMultiLayerHpGaugeStateUpdate']();},VisuMZ[_0x18ab75(0x1f0)]['Game_Battler_addState']=Game_Battler['prototype'][_0x18ab75(0x1dc)],Game_Battler[_0x18ab75(0x20f)][_0x18ab75(0x1dc)]=function(_0x25968d){const _0x5aa76e=_0x18ab75;VisuMZ[_0x5aa76e(0x1f0)][_0x5aa76e(0x26c)][_0x5aa76e(0x26e)](this,_0x25968d),this['requestMultiLayerHpGaugeStateUpdate']();},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x271)]=Game_Battler[_0x18ab75(0x20f)][_0x18ab75(0x1fe)],Game_Battler[_0x18ab75(0x20f)][_0x18ab75(0x1fe)]=function(_0x39d5fe){const _0x41e725=_0x18ab75;VisuMZ[_0x41e725(0x1f0)][_0x41e725(0x271)]['call'](this,_0x39d5fe),this['requestMultiLayerHpGaugeStateUpdate']();},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2c1)]=Game_BattlerBase['prototype']['clearStates'],Game_BattlerBase[_0x18ab75(0x20f)][_0x18ab75(0x388)]=function(){const _0x2b93c3=_0x18ab75;VisuMZ[_0x2b93c3(0x1f0)][_0x2b93c3(0x2c1)][_0x2b93c3(0x26e)](this),this[_0x2b93c3(0x31a)]();},VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x290)]=Game_Battler[_0x18ab75(0x20f)][_0x18ab75(0x252)],Game_Battler['prototype'][_0x18ab75(0x252)]=function(){const _0x35170c=_0x18ab75;VisuMZ[_0x35170c(0x1f0)]['Game_Battler_onTurnEnd']['call'](this),this[_0x35170c(0x31a)]();},Sprite_MultiLayerHpStates['prototype']['refresh']=function(){const _0x25d871=_0x18ab75;this['clearBitmaps'](),this[_0x25d871(0x2cf)](),this[_0x25d871(0x239)](),this[_0x25d871(0x24f)]();},Sprite_MultiLayerHpStates[_0x18ab75(0x20f)][_0x18ab75(0x25b)]=function(){const _0x3b4c19=_0x18ab75;this['bitmap'][_0x3b4c19(0x2ab)](),this['_dummyWindow'][_0x3b4c19(0x194)]['clear']();},Sprite_MultiLayerHpStates['prototype'][_0x18ab75(0x2cf)]=function(){const _0x2be48c=_0x18ab75,_0x4c9aaa=this[_0x2be48c(0x1eb)][_0x2be48c(0x20b)];this[_0x2be48c(0x1eb)][_0x2be48c(0x2f8)](this[_0x2be48c(0x1c8)],0x0,0x0,_0x4c9aaa);},Sprite_MultiLayerHpStates['prototype'][_0x18ab75(0x239)]=function(){const _0x42ffda=_0x18ab75;if(!this[_0x42ffda(0x1c8)])return;if(!Imported['VisuMZ_4_BreakShields'])return;if(!Game_Battler[_0x42ffda(0x32d)])return;if(!Sprite_MultiLayerHpStates[_0x42ffda(0x2f0)][_0x42ffda(0x29c)])return;if(this[_0x42ffda(0x1dd)])return;this[_0x42ffda(0x1dd)]=new Sprite_BreakShieldIcon(),this[_0x42ffda(0x2bb)](this['_breakShieldSprite']),this[_0x42ffda(0x1dd)][_0x42ffda(0x2f7)](this['_battler'],![]),this[_0x42ffda(0x1dd)][_0x42ffda(0x307)](ImageManager[_0x42ffda(0x318)]/0x2,ImageManager[_0x42ffda(0x289)]/0x2+0x2),this[_0x42ffda(0x1dd)][_0x42ffda(0x2af)]();},Sprite_MultiLayerHpStates[_0x18ab75(0x20f)][_0x18ab75(0x24f)]=function(){const _0x3b6f4b=_0x18ab75;this[_0x3b6f4b(0x30b)]=this[_0x3b6f4b(0x1eb)][_0x3b6f4b(0x194)];if(this[_0x3b6f4b(0x301)]){const _0x251d1b=Math[_0x3b6f4b(0x34e)](this[_0x3b6f4b(0x301)]/ImageManager[_0x3b6f4b(0x318)])*ImageManager[_0x3b6f4b(0x318)];this['setFrame'](0x0,0x0,_0x251d1b,this['bitmap'][_0x3b6f4b(0x297)]);}},Window_BattleLog[_0x18ab75(0x1e9)]={'reposition':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x357)][_0x18ab75(0x293)]??!![],'perRowOffsetY':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x357)][_0x18ab75(0x2d9)]??0x40},Window_BattleLog[_0x18ab75(0x20f)]['registerMultiLayerHpGaugePositionY']=function(){this['_multiLayerHpGaugePositionY']=this['y'];},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2a9)]=Window_BattleLog['prototype'][_0x18ab75(0x2ee)],Window_BattleLog['prototype'][_0x18ab75(0x2ee)]=function(){const _0x47b267=_0x18ab75;VisuMZ[_0x47b267(0x1f0)]['Window_BattleLog_update'][_0x47b267(0x26e)](this),this['updateMultiLyerHpGaugePositionY']();},Window_BattleLog[_0x18ab75(0x20f)][_0x18ab75(0x193)]=function(){const _0x33d984=_0x18ab75;if(!Window_BattleLog[_0x33d984(0x1e9)][_0x33d984(0x224)])return;if(this[_0x33d984(0x1bf)]===undefined)return;let _0x1d9d3d=this['_multiLayerHpGaugePositionY'];const _0x1135dd=$gameTroop['totalVisibleMultiLayerHpGaugeRows']();_0x1135dd>0x0&&('olgOp'!==_0x33d984(0x247)?_0x1d9d3d+=Window_BattleLog['MULTI_LAYER_HP_GAUGE'][_0x33d984(0x2fa)]*_0x1135dd:this[_0x33d984(0x30b)]=new _0x433ab4(_0x3412c8,_0xc8a46f)),this['y']=_0x1d9d3d;};function Window_MultiLayerHpGaugeStatusBase(){const _0x315415=_0x18ab75;this[_0x315415(0x33a)](...arguments);}Window_MultiLayerHpGaugeStatusBase[_0x18ab75(0x20f)]=Object[_0x18ab75(0x1f3)](Window_StatusBase[_0x18ab75(0x20f)]),Window_MultiLayerHpGaugeStatusBase[_0x18ab75(0x20f)]['constructor']=Window_MultiLayerHpGaugeStatusBase,Window_MultiLayerHpGaugeStatusBase[_0x18ab75(0x20f)][_0x18ab75(0x33a)]=function(_0x33a67c){const _0x2487ae=_0x18ab75;Window_StatusBase[_0x2487ae(0x20f)][_0x2487ae(0x33a)][_0x2487ae(0x26e)](this,_0x33a67c);},Window_MultiLayerHpGaugeStatusBase[_0x18ab75(0x20f)][_0x18ab75(0x1b5)]=function(){const _0x19c0d1=_0x18ab75;return Window_Scrollable['prototype'][_0x19c0d1(0x1b5)][_0x19c0d1(0x26e)](this);},Window_MultiLayerHpGaugeStatusBase[_0x18ab75(0x20f)][_0x18ab75(0x287)]=function(_0x5c3c5d){const _0x367d09=_0x18ab75;if(!Sprite_MultiLayerHpStates[_0x367d09(0x2f0)][_0x367d09(0x29c)])return![];if(!Game_Battler[_0x367d09(0x32d)])return![];const _0x52a7e5=Game_Battler['BREAK_SHIELDS_STUN_STATE'];if(_0x5c3c5d[_0x367d09(0x237)](_0x52a7e5)&&$dataStates[_0x52a7e5][_0x367d09(0x2ec)]>0x0){if(_0x367d09(0x222)===_0x367d09(0x222))return![];else{const _0x4896a7=_0x5c5b39(_0x194baa['$1']);_0x4896a7!==_0x353b82[_0x322970][_0x367d09(0x206)]&&(_0x2cea8f('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x1c023d,_0x4896a7)),_0x41e187[_0x367d09(0x231)]());}}if(_0x5c3c5d['isDead']()&&$dataStates[_0x5c3c5d[_0x367d09(0x379)]()][_0x367d09(0x2ec)]>0x0)return![];return!![];},Window_MultiLayerHpGaugeStatusBase[_0x18ab75(0x20f)][_0x18ab75(0x1f5)]=function(_0x3d463b,_0x25043b,_0x4ce286){},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x347)]={'battler':{'reduceRedundancy':{'hpGauge':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x347)][_0x18ab75(0x354)]??!![],'stateIcon':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x347)]['reduceRedundantStateIcon']??!![],'breakShields':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)]['reduceRedundantBreakShield']??!![]}},'atb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x347)]['atbEachRowOffsetY']??+0x40,'normalOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)]['Compatibility'][_0x18ab75(0x38b)]??+0x18,'helpOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)]['Compatibility'][_0x18ab75(0x28d)]??+0xc},'btb':{'eachRowOffsetY':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x347)][_0x18ab75(0x2ad)]??+0x40,'normalOffsetY':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x347)][_0x18ab75(0x387)]??+0x0,'helpOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)][_0x18ab75(0x2a8)]??+0xc},'ctb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x347)][_0x18ab75(0x1b7)]??+0x40,'normalOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)][_0x18ab75(0x311)]??+0x0,'helpOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)]['ctbHelpOffsetY']??+0xc},'etb':{'eachRowOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)][_0x18ab75(0x36d)]??+0x40,'normalOffsetY':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x347)]['etbNormalOffsetY']??+0x0,'helpOffsetY':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x347)][_0x18ab75(0x346)]??-0x38},'ftb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge']['Settings'][_0x18ab75(0x347)][_0x18ab75(0x1a7)]??+0x40,'normalOffsetY':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x347)][_0x18ab75(0x190)]??+0x0,'helpOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)]['ftbHelpOffsetY']??-0x38},'otb':{'eachRowOffsetY':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x347)][_0x18ab75(0x233)]??+0x40,'normalOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)]['otbNormalOffsetY']??-0x6,'helpOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)][_0x18ab75(0x212)]??-0xc},'ptb':{'eachRowOffsetY':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x347)][_0x18ab75(0x330)]??+0x40,'normalOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)][_0x18ab75(0x1d0)]??+0x0,'helpOffsetY':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)]['Compatibility'][_0x18ab75(0x248)]??-0x38},'stb':{'eachRowOffsetY':VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x2e4)][_0x18ab75(0x347)]['stbEachRowOffsetY']??+0x40,'normalOffsetY':VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x2e4)][_0x18ab75(0x347)]['stbNormalOffsetY']??+0x0,'helpOffsetY':VisuMZ[_0x18ab75(0x1f0)]['Settings'][_0x18ab75(0x347)]['stbHelpOffsetY']??+0xc}},VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x1c2)]=Sprite_Battler['prototype'][_0x18ab75(0x28f)],Sprite_Battler[_0x18ab75(0x20f)][_0x18ab75(0x28f)]=function(){const _0x94665=_0x18ab75;if(this[_0x94665(0x1c8)]&&this[_0x94665(0x1c8)]['isEnemy']()){if('XKKIU'===_0x94665(0x1d2)){if(!this[_0x94665(0x1c8)])return;if(!this[_0x94665(0x305)])return;if(this[_0x94665(0x1be)]===this[_0x94665(0x1c8)]['battlerHue']())return;this[_0x94665(0x1be)]=this[_0x94665(0x1c8)][_0x94665(0x1cd)](),_0x487df2[_0x94665(0x27d)]&&this[_0x94665(0x1c8)][_0x94665(0x32e)]()&&(this[_0x94665(0x1be)]=0x0),this[_0x94665(0x305)][_0x94665(0x382)](this['_graphicHue']);}else{const _0x280210=VisuMZ[_0x94665(0x1f0)][_0x94665(0x347)][_0x94665(0x23f)][_0x94665(0x1e5)];if(this[_0x94665(0x1c8)][_0x94665(0x242)]()&&_0x280210[_0x94665(0x325)]&&Sprite_MultiLayerHpGauge[_0x94665(0x2f0)][_0x94665(0x2af)])return![];}}return VisuMZ[_0x94665(0x1f0)]['Sprite_Battler_isVisualHpGaugeDisplayed'][_0x94665(0x26e)](this);},VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x1ba)]=Sprite_Enemy['prototype'][_0x18ab75(0x1bc)],Sprite_Enemy[_0x18ab75(0x20f)][_0x18ab75(0x1bc)]=function(){const _0x59a3ca=_0x18ab75;VisuMZ[_0x59a3ca(0x1f0)][_0x59a3ca(0x1ba)]['call'](this);if(this['_battler']&&this[_0x59a3ca(0x2c5)]){if(_0x59a3ca(0x21b)===_0x59a3ca(0x21b)){const _0x2dadc0=VisuMZ[_0x59a3ca(0x1f0)]['Compatibility'][_0x59a3ca(0x23f)][_0x59a3ca(0x1e5)];_0x2dadc0[_0x59a3ca(0x246)]&&Sprite_MultiLayerHpStates['SETTINGS'][_0x59a3ca(0x2af)]&&(this[_0x59a3ca(0x2c5)]['y']=Graphics[_0x59a3ca(0x297)]*0xa);}else{_0x5d1be5[_0x59a3ca(0x1f0)][_0x59a3ca(0x19d)]['call'](this);if(_0x2cef00[_0x59a3ca(0x2e4)][_0x59a3ca(0x19c)]!==_0x59a3ca(0x303))return;const _0x879c7a=_0xbcd694[_0x59a3ca(0x34d)]();if(_0x879c7a<=0x0)return;const _0x48ced2=_0x2886e8[_0x59a3ca(0x1f0)][_0x59a3ca(0x347)]['ctb'],_0x1f9ed9=_0x48ced2[_0x59a3ca(0x304)];let _0x5a2091=_0x1f9ed9*_0x879c7a;const _0x21f553=_0x1f7a39[_0x59a3ca(0x1c6)][_0x59a3ca(0x1e0)];_0x21f553&&_0x21f553[_0x59a3ca(0x342)]&&_0x3220d2['Settings'][_0x59a3ca(0x35d)]?_0x5a2091+=_0x48ced2[_0x59a3ca(0x2a4)]:_0x5a2091+=_0x48ced2['normalOffsetY'],this['y']+=_0x5a2091;}}},VisuMZ['MultiLayerHpGauge'][_0x18ab75(0x1ae)]=Sprite_Battler[_0x18ab75(0x20f)][_0x18ab75(0x2c6)],Sprite_Battler['prototype'][_0x18ab75(0x2c6)]=function(){const _0x4e7ced=_0x18ab75;VisuMZ[_0x4e7ced(0x1f0)][_0x4e7ced(0x1ae)][_0x4e7ced(0x26e)](this);if(this[_0x4e7ced(0x1c8)]&&this['_battler'][_0x4e7ced(0x2cb)]()&&this[_0x4e7ced(0x23b)]){const _0x2f2787=VisuMZ[_0x4e7ced(0x316)][_0x4e7ced(0x2e4)][_0x4e7ced(0x357)],_0x402850=this[_0x4e7ced(0x23b)];_0x402850[_0x4e7ced(0x342)]=_0x2f2787[_0x4e7ced(0x308)];if(this['_svBattlerSprite']){if('uAldP'===_0x4e7ced(0x227))this[_0x4e7ced(0x2de)][_0x4e7ced(0x23b)][_0x4e7ced(0x342)]=![];else{const _0x3bba62=_0x540392['MultiLayerHpGauge'][_0x4e7ced(0x347)]['battler']['reduceRedundancy'];if(this[_0x4e7ced(0x1c8)][_0x4e7ced(0x242)]()&&_0x3bba62[_0x4e7ced(0x325)]&&_0x2d0e4c[_0x4e7ced(0x2f0)]['show'])return![];}}!this[_0x4e7ced(0x1c8)][_0x4e7ced(0x32e)]()&&(_0x402850['y']=-this[_0x4e7ced(0x297)]+_0x402850[_0x4e7ced(0x297)]-ImageManager[_0x4e7ced(0x289)]);}};Imported[_0x18ab75(0x236)]&&(VisuMZ['MultiLayerHpGauge']['Sprite_FieldGaugeATB_updatePosition']=Sprite_FieldGaugeATB['prototype']['updatePosition'],Sprite_FieldGaugeATB[_0x18ab75(0x20f)][_0x18ab75(0x312)]=function(){const _0x4ddc37=_0x18ab75;VisuMZ['MultiLayerHpGauge'][_0x4ddc37(0x28e)][_0x4ddc37(0x26e)](this);if(Sprite_FieldGaugeATB[_0x4ddc37(0x2e4)][_0x4ddc37(0x19c)]!==_0x4ddc37(0x303))return;const _0x1d94ae=$gameTroop['totalVisibleMultiLayerHpGaugeRows']();if(_0x1d94ae<=0x0)return;const _0x54c0f0=VisuMZ['MultiLayerHpGauge'][_0x4ddc37(0x347)][_0x4ddc37(0x21c)],_0x57178a=_0x54c0f0[_0x4ddc37(0x304)];let _0x4b4db2=_0x57178a*_0x1d94ae;const _0x1224b6=SceneManager['_scene'][_0x4ddc37(0x1e0)];_0x1224b6&&_0x1224b6[_0x4ddc37(0x342)]&&Sprite_FieldGaugeATB[_0x4ddc37(0x2e4)][_0x4ddc37(0x35d)]?_0x4b4db2+=_0x54c0f0[_0x4ddc37(0x2a4)]:_0x4b4db2+=_0x54c0f0[_0x4ddc37(0x200)],this['y']+=_0x4b4db2;});;Imported[_0x18ab75(0x1f6)]&&(VisuMZ['MultiLayerHpGauge']['Window_BTB_TurnOrder_updatePosition']=Window_BTB_TurnOrder[_0x18ab75(0x20f)][_0x18ab75(0x312)],Window_BTB_TurnOrder[_0x18ab75(0x20f)][_0x18ab75(0x312)]=function(){const _0x154cfe=_0x18ab75;VisuMZ['MultiLayerHpGauge']['Window_BTB_TurnOrder_updatePosition'][_0x154cfe(0x26e)](this);if(Window_BTB_TurnOrder[_0x154cfe(0x2e4)]['DisplayPosition']!=='top')return;const _0x47971d=$gameTroop[_0x154cfe(0x34d)]();if(_0x47971d<=0x0)return;const _0x3c2f72=VisuMZ[_0x154cfe(0x1f0)]['Compatibility'][_0x154cfe(0x281)],_0x3c7619=_0x3c2f72['eachRowOffsetY'];let _0x778d85=_0x3c7619*_0x47971d;const _0xdcb580=SceneManager['_scene'][_0x154cfe(0x1e0)];if(_0xdcb580&&_0xdcb580[_0x154cfe(0x342)]&&Window_BTB_TurnOrder[_0x154cfe(0x2e4)][_0x154cfe(0x35d)])'QvAmU'==='QvAmU'?_0x778d85+=_0x3c2f72[_0x154cfe(0x2a4)]:_0x2c2af6=_0x4745e2[_0x154cfe(0x343)](_0x54db28);else{if('nsnrt'===_0x154cfe(0x35a))return this[_0x154cfe(0x243)]()['bgColor1'];else _0x778d85+=_0x3c2f72['normalOffsetY'];}this['y']+=_0x778d85;});;Imported[_0x18ab75(0x211)]&&(VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x19d)]=Window_CTB_TurnOrder['prototype'][_0x18ab75(0x312)],Window_CTB_TurnOrder[_0x18ab75(0x20f)][_0x18ab75(0x312)]=function(){const _0x499af4=_0x18ab75;VisuMZ[_0x499af4(0x1f0)]['Window_CTB_TurnOrder_updatePosition'][_0x499af4(0x26e)](this);if(Window_CTB_TurnOrder['Settings'][_0x499af4(0x19c)]!==_0x499af4(0x303))return;const _0x56690b=$gameTroop[_0x499af4(0x34d)]();if(_0x56690b<=0x0)return;const _0x19f589=VisuMZ['MultiLayerHpGauge'][_0x499af4(0x347)][_0x499af4(0x2ce)],_0x37d40a=_0x19f589[_0x499af4(0x304)];let _0x551126=_0x37d40a*_0x56690b;const _0x5d9cb3=SceneManager[_0x499af4(0x1c6)][_0x499af4(0x1e0)];if(_0x5d9cb3&&_0x5d9cb3[_0x499af4(0x342)]&&Window_CTB_TurnOrder[_0x499af4(0x2e4)][_0x499af4(0x35d)])_0x551126+=_0x19f589[_0x499af4(0x2a4)];else{if(_0x499af4(0x2a1)===_0x499af4(0x199)){const _0x587ac8=_0x5d4480[_0x499af4(0x1f0)]['Compatibility'][_0x499af4(0x23f)][_0x499af4(0x1e5)];_0x587ac8[_0x499af4(0x246)]&&_0x3d14ca[_0x499af4(0x2f0)]['show']&&(this[_0x499af4(0x2c5)]['y']=_0x1abec3[_0x499af4(0x297)]*0xa);}else _0x551126+=_0x19f589[_0x499af4(0x200)];}this['y']+=_0x551126;});;Imported[_0x18ab75(0x321)]&&(VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x390)]=Window_ETB_ActionCount['prototype'][_0x18ab75(0x312)],Window_ETB_ActionCount[_0x18ab75(0x20f)][_0x18ab75(0x312)]=function(){const _0x39bd04=_0x18ab75;VisuMZ[_0x39bd04(0x1f0)][_0x39bd04(0x390)][_0x39bd04(0x26e)](this);if(Window_ETB_ActionCount[_0x39bd04(0x2e4)][_0x39bd04(0x2c8)])return;const _0xf59358=$gameTroop[_0x39bd04(0x34d)]();if(_0xf59358<=0x0)return;const _0x1fece8=VisuMZ[_0x39bd04(0x1f0)][_0x39bd04(0x347)][_0x39bd04(0x285)],_0x560a44=_0x1fece8['eachRowOffsetY'];let _0x59498b=_0x560a44*_0xf59358;const _0x3a80e6=SceneManager[_0x39bd04(0x1c6)][_0x39bd04(0x1e0)];_0x3a80e6&&_0x3a80e6[_0x39bd04(0x342)]&&Window_ETB_ActionCount[_0x39bd04(0x2e4)]['RepositionTopForHelp']?_0x59498b+=_0x1fece8[_0x39bd04(0x2a4)]:_0x59498b+=_0x1fece8[_0x39bd04(0x200)],this['y']+=_0x59498b;});;Imported[_0x18ab75(0x1f7)]&&(VisuMZ[_0x18ab75(0x1f0)]['Window_FTB_TurnOrder_updatePosition']=Window_FTB_ActionCount[_0x18ab75(0x20f)]['updatePosition'],Window_FTB_ActionCount[_0x18ab75(0x20f)]['updatePosition']=function(){const _0x269287=_0x18ab75;VisuMZ[_0x269287(0x1f0)]['Window_FTB_TurnOrder_updatePosition'][_0x269287(0x26e)](this);if(Window_FTB_ActionCount[_0x269287(0x2e4)][_0x269287(0x2c8)])return;const _0x530300=$gameTroop['totalVisibleMultiLayerHpGaugeRows']();if(_0x530300<=0x0)return;const _0x5d9f15=VisuMZ[_0x269287(0x1f0)][_0x269287(0x347)][_0x269287(0x2e6)],_0x33cc4f=_0x5d9f15[_0x269287(0x304)];let _0x317a39=_0x33cc4f*_0x530300;const _0x29cfe3=SceneManager[_0x269287(0x1c6)][_0x269287(0x1e0)];if(_0x29cfe3&&_0x29cfe3[_0x269287(0x342)]&&Window_FTB_ActionCount[_0x269287(0x2e4)]['RepositionTopForHelp']){if('GozUO'==='GozUO')_0x317a39+=_0x5d9f15['helpOffsetY'];else{if(_0x22204b)_0x55451b[_0x269287(0x1d4)]=!![];}}else _0x317a39+=_0x5d9f15[_0x269287(0x200)];this['y']+=_0x317a39;});;Imported[_0x18ab75(0x299)]&&(VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x336)]=Window_OTB_TurnOrder[_0x18ab75(0x20f)][_0x18ab75(0x312)],Window_OTB_TurnOrder[_0x18ab75(0x20f)][_0x18ab75(0x312)]=function(){const _0x432f0a=_0x18ab75;VisuMZ['MultiLayerHpGauge'][_0x432f0a(0x336)][_0x432f0a(0x26e)](this);if(Window_OTB_TurnOrder[_0x432f0a(0x2e4)][_0x432f0a(0x19c)]!==_0x432f0a(0x303))return;const _0x2053eb=$gameTroop[_0x432f0a(0x34d)]();if(_0x2053eb<=0x0)return;const _0x5b20aa=VisuMZ['MultiLayerHpGauge'][_0x432f0a(0x347)][_0x432f0a(0x251)],_0x2ab958=_0x5b20aa[_0x432f0a(0x304)];let _0x843483=_0x2ab958*_0x2053eb;const _0x118ed6=SceneManager[_0x432f0a(0x1c6)]['_helpWindow'];_0x118ed6&&_0x118ed6['visible']&&Window_OTB_TurnOrder['Settings'][_0x432f0a(0x35d)]?_0x843483+=_0x5b20aa[_0x432f0a(0x2a4)]:_0x843483+=_0x5b20aa[_0x432f0a(0x200)],this['y']+=_0x843483;});;Imported['VisuMZ_2_BattleSystemPTB']&&(VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x373)]=Window_PTB_ActionCount[_0x18ab75(0x20f)][_0x18ab75(0x312)],Window_PTB_ActionCount[_0x18ab75(0x20f)][_0x18ab75(0x312)]=function(){const _0x5499e3=_0x18ab75;VisuMZ[_0x5499e3(0x1f0)][_0x5499e3(0x373)][_0x5499e3(0x26e)](this);if(Window_PTB_ActionCount[_0x5499e3(0x2e4)][_0x5499e3(0x2c8)])return;const _0x5a165b=$gameTroop[_0x5499e3(0x34d)]();if(_0x5a165b<=0x0)return;const _0x156bca=VisuMZ[_0x5499e3(0x1f0)]['Compatibility'][_0x5499e3(0x1b4)],_0x534842=_0x156bca[_0x5499e3(0x304)];let _0x485eeb=_0x534842*_0x5a165b;const _0x293537=SceneManager['_scene']['_helpWindow'];_0x293537&&_0x293537[_0x5499e3(0x342)]&&Window_PTB_ActionCount[_0x5499e3(0x2e4)][_0x5499e3(0x35d)]?_0x485eeb+=_0x156bca[_0x5499e3(0x2a4)]:'sTGKE'!==_0x5499e3(0x1c3)?_0x485eeb+=_0x156bca[_0x5499e3(0x200)]:(_0x4fe1d0[_0x5499e3(0x1f0)]['Game_Battler_addState']['call'](this,_0x193d92),this[_0x5499e3(0x31a)]()),this['y']+=_0x485eeb;});function _0x4d78(_0x4f3690,_0x135a9f){const _0x173ba8=_0x173b();return _0x4d78=function(_0x4d78f2,_0x389bf7){_0x4d78f2=_0x4d78f2-0x18c;let _0x1d5c7e=_0x173ba8[_0x4d78f2];return _0x1d5c7e;},_0x4d78(_0x4f3690,_0x135a9f);};Imported[_0x18ab75(0x358)]&&(VisuMZ[_0x18ab75(0x1f0)][_0x18ab75(0x272)]=Window_STB_TurnOrder[_0x18ab75(0x20f)][_0x18ab75(0x312)],Window_STB_TurnOrder[_0x18ab75(0x20f)][_0x18ab75(0x312)]=function(){const _0x149909=_0x18ab75;VisuMZ[_0x149909(0x1f0)]['Window_STB_TurnOrder_updatePosition']['call'](this);if(Window_STB_TurnOrder[_0x149909(0x2e4)][_0x149909(0x19c)]!=='top')return;const _0x562070=$gameTroop['totalVisibleMultiLayerHpGaugeRows']();if(_0x562070<=0x0)return;const _0x1ee8bc=VisuMZ[_0x149909(0x1f0)][_0x149909(0x347)][_0x149909(0x27a)],_0x57f898=_0x1ee8bc[_0x149909(0x304)];let _0xb615f2=_0x57f898*_0x562070;const _0x5ba734=SceneManager['_scene']['_helpWindow'];if(_0x5ba734&&_0x5ba734[_0x149909(0x342)]&&Window_STB_TurnOrder['Settings'][_0x149909(0x35d)])_0xb615f2+=_0x1ee8bc[_0x149909(0x2a4)];else{if(_0x149909(0x2b1)===_0x149909(0x2f3)){if(this['_lastIndex']<0x0)return _0x1c91af['width']*0xa;const _0x303c4d=_0x14898d[_0x149909(0x1e9)][_0x149909(0x266)],_0x564cfd=_0x2edeeb[_0x149909(0x2bd)](this[_0x149909(0x1de)],_0x16b5c5[_0x149909(0x1e9)][_0x149909(0x26d)]),_0x21c0ee=_0x4300e2['ceil'](_0x303c4d/_0x564cfd),_0x5515b1=this[_0x149909(0x25d)]%_0x3c4ea7['MULTI_LAYER_HP_GAUGE'][_0x149909(0x26d)];let _0x5b957b=_0x21c0ee*_0x5515b1;return _0x5b957b+=_0x3a8264[_0x149909(0x2f0)][_0x149909(0x31d)]['x'],_0x5b957b;}else _0xb615f2+=_0x1ee8bc[_0x149909(0x200)];}this['y']+=_0xb615f2;});;