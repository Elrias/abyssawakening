//=============================================================================
// VisuStella MZ - State Tooltips
// VisuMZ_3_StateTooltips.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_StateTooltips = true;

var VisuMZ = VisuMZ || {};
VisuMZ.StateTooltips = VisuMZ.StateTooltips || {};
VisuMZ.StateTooltips.version = 1.06;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.06] [StateTooltips]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/State_Tooltips_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_MessageCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_MessageCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin adds a tooltip window in battle (and other scenes) whenever the
 * player's mouse cursor is hovered over specific areas of the screen. The
 * tooltip window will display a list of the states, buffs, and debuffs the
 * hovered battler has along with a description of the entities and their
 * remaining duration.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Tooltip window displays when hovering over battlers and specific windows
 *   to display their states, buffs, and debuffs.
 * * Adjust the text format in which information is displayed inside the
 *   tooltip window.
 * * Modify the descriptions for states, buffs, and debuffs to your liking.
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
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_MessageCore
 * * VisuMZ_1_SkillsStatesCore
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
 * VisuMZ_2_PartySystem
 * 
 * VisuMZ_2_ClassChangeSystem
 *
 * These plugins have scenes that also support tooltips if this plugin is also
 * installed while those are active in your game's project.
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
 * VisuMZ_1_ElementStatusCore
 * 
 * The updated Status Menu currently does not contain tooltip support for the
 * "General" pages that may display the actor's states. This is due to the
 * customization aspect for the various Status Menu pages. There will be a
 * future update where we will adapt this feature.
 * 
 * ---
 *
 * VisuMZ_2_DragonbonesUnion
 *
 * If you are using a Dragonbones Battler and want to apply a state tooltip to
 * it, the access area of the battler will be based on the hitbox size you
 * declare for the Dragonbones Battler with notetags. This is because all
 * Dragonbones battlers do not have innate automatically calculated hitbox
 * sizes as a result of their dynamically animated nature.
 * 
 * Please refer to the notetag section of the Dragonbones Union plugin for
 * Dragonbones Battler hitboxes to learn how to apply hitbox sizes.
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
 * === Description-Related Notetags ===
 * 
 * ---
 *
 * <Help Description>
 *  text
 *  text
 * </Help Description>
 *
 * - Used for: State Notetags
 * - Assigns a help description for the state.
 * - Replace 'text' with text you want displayed for the tooltip window.
 * - This best works with one line.
 * - If this notetag is not used, the help description will default to the
 *   setting found in the plugin's Plugin Parameters.
 * - Insert %1 into the help description to show any data that would otherwise
 *   be shown as the state display, such as Absorption Barrier count.
 *
 * ---
 * 
 * <Exclude From Tooltips>
 * 
 * - Used for: State Notetags
 * - Excludes the state from being displayed in the state tooltips.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Tooltip Settings
 * ============================================================================
 *
 * General settings for the State Tooltips Window.
 *
 * ---
 *
 * Appearance
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
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * Vocabulary settings for the State Tooltips Window.
 *
 * ---
 *
 * General
 * 
 *   Default Description:
 *   - This is the default description that appears for a state without a
 *     declared description. %1 - State's Name
 *   - Can use text codes.
 *
 * ---
 *
 * Entries
 * 
 *   State Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Description, %4 - Duration, %5 - State Color
 * 
 *   Buff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Buff Color
 * 
 *   Debuff Format:
 *   - Can use text codes.
 *   - %1 - Icon, %2 - Name, %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * 
 *   Replace Whites?:
 *   - If state, buff, debuff names are white, replace them?
 * 
 *     Replacement Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors from
 *       the Window Skin.
 *
 * ---
 *
 * Turns Remaining
 * 
 *   Action End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Turn End Format:
 *   - Can use text codes.
 *   - %1 - Remaining, %2 - State/Buff/Debuff Color
 * 
 *   Passive Text:
 *   - Can use text codes.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Choose which windows to enable tooltip support for.
 *
 * ---
 *
 * Settings
 * 
 *   Window_BattleStatus:
 *   Window_ClassStatus:
 *   Window_EquipStatus:
 *   Window_MenuActor:
 *   Window_MenuStatus:
 *   Window_PartyStatus:
 *   Window_SkillStatus:
 *   Window_Status:
 *   - Enable State Tooltips for this window?
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
 * Version 1.06: September 14, 2023
 * * Compatibility Update!
 * ** Added better compatibility with VisuMZ_3_FrontviewBattleUI!
 * 
 * Version 1.05: February 24, 2022
 * * Feature Update!
 * ** When the Choice List Window is hovered over, the State Tooltip window
 *    will hide itself. Update made by Irina.
 * 
 * Version 1.04: October 21, 2021
 * * Documentation Update!
 * ** Added a section for VisuMZ_1_ElementStatusCore in the "VisuStella MZ
 *    Compatibility" section since we received a very good question on it.
 * *** The updated Status Menu currently does not contain tooltip support for
 *     the "General" pages that may display the actor's states. This is due to
 *     the customization aspect for the various Status Menu pages. There will
 *     be a future update where we will adapt this feature.
 * 
 * Version 1.03: October 7, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.02: May 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Irina.
 * *** <Exclude From Tooltips>
 * **** Excludes the state from being displayed in the state tooltips.
 * 
 * Version 1.01: April 2, 2021
 * * Documentation Update!
 * ** Added "VisuStella MZ Compatibility" section for detailed compatibility
 *    explanations with the VisuMZ_2_DragonbonesUnion plugin.
 * 
 * Version 1.00 Official Release Date: February 24, 2021
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
 * @param StateTooltips
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Tooltip:struct
 * @text Tooltip Settings
 * @type struct<Tooltip>
 * @desc General settings for the State Tooltips Window.
 * @default {"Appearance":"","Scale:num":"0.6","WindowSkin:str":"Window","WindowOpacity:num":"240","Offset":"","OffsetX:num":"+0","OffsetY:num":"+0"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc Vocabulary settings for the State Tooltips Window.
 * @default {"General":"","HelpDescription:json":"\"-\"","Entries":"","StateFmt:str":"\\C[%5]%1%2:\\C[0] %3 %4","BuffFmt:str":"\\C[%5]%1%2:\\C[0] Increases unit's %2 to \\C[%5]%3%\\C[0] %4","DebuffFmt:str":"\\C[%5]%1%2:\\C[0] Decreases unit's %2 to \\C[%5]%3%\\C[0] %4","ReplaceWhite:eval":"true","WhiteReplaceColor:str":"5","Turns":"","ActionsFmt:str":"\\C[6](Actions \\C[%2]%1\\C[6])\\C[0]","TurnsFmt:str":"\\C[5](Turns \\C[%2]%1\\C[5])\\C[0]","PassiveText:str":"\\C[4](Passive)\\C[0]"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Choose which windows to enable tooltip support for.
 * @default {"Window_BattleStatus:eval":"true","Window_ClassStatus:eval":"true","Window_EquipStatus:eval":"true","Window_MenuActor:eval":"true","Window_MenuStatus:eval":"true","Window_PartyStatus:eval":"true","Window_SkillStatus:eval":"true","Window_Status:eval":"true"}
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
 * Tooltip Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Tooltip:
 *
 * @param Appearance
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
 * @default +0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Offset
 * @desc Offset the tooltip Y position from the mouse?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Vocab Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param HelpDescription:json
 * @text Default Description
 * @parent General
 * @type note
 * @desc This is the default description that appears for a state
 * without a declared description. %1 - State's Name
 * @default "-"
 * 
 * @param Entries
 *
 * @param StateFmt:str
 * @text State Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Description, %4 - Duration, %5 - State Color
 * @default \C[%5]%1%2:\C[0] %3 %4
 *
 * @param BuffFmt:str
 * @text Buff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Buff Color
 * @default \C[%5]%1%2:\C[0] Increases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param DebuffFmt:str
 * @text Debuff Format
 * @parent Entries
 * @desc Can use text codes. %1 - Icon, %2 - Name,
 * %3 - Percentage, %4 - Duration, %5 - Debuff Color
 * @default \C[%5]%1%2:\C[0] Decreases unit's %2 to \C[%5]%3%\C[0] %4
 *
 * @param ReplaceWhite:eval
 * @text Replace Whites?
 * @parent Entries
 * @type boolean
 * @on Replace
 * @off Don't Replace
 * @desc If state, buff, debuff names are white, replace them?
 * @default true
 *
 * @param WhiteReplaceColor:str
 * @text Replacement Color
 * @parent ReplaceWhite:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 5
 * 
 * @param Turns
 * @text Turns Remaining
 *
 * @param ActionsFmt:str
 * @text Action End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[6](Actions \C[%2]%1\C[6])\C[0]
 *
 * @param TurnsFmt:str
 * @text Turn End Format
 * @parent Turns
 * @desc Can use text codes.
 * %1 - Remaining, %2 - State/Buff/Debuff Color
 * @default \C[5](Turns \C[%2]%1\C[5])\C[0]
 *
 * @param PassiveText:str
 * @text Passive Text
 * @parent Turns
 * @desc Can use text codes.
 * @default \C[4](Passive)\C[0]
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param Window_BattleStatus:eval
 * @text Window_BattleStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_ClassStatus:eval
 * @text Window_ClassStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_EquipStatus:eval
 * @text Window_EquipStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuActor:eval
 * @text Window_MenuActor
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_MenuStatus:eval
 * @text Window_MenuStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_PartyStatus:eval
 * @text Window_PartyStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_SkillStatus:eval
 * @text Window_SkillStatus
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 * @param Window_Status:eval
 * @text Window_Status
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable State Tooltips for this window?
 * @default true
 *
 */
//=============================================================================

const _0x424a8b=_0x69bb;(function(_0x4132a7,_0x4593f5){const _0x4ae918=_0x69bb,_0x33a222=_0x4132a7();while(!![]){try{const _0x346186=-parseInt(_0x4ae918(0x2b0))/0x1*(-parseInt(_0x4ae918(0x20d))/0x2)+-parseInt(_0x4ae918(0x226))/0x3+parseInt(_0x4ae918(0x1e5))/0x4*(-parseInt(_0x4ae918(0x1f2))/0x5)+-parseInt(_0x4ae918(0x254))/0x6+parseInt(_0x4ae918(0x2a2))/0x7*(-parseInt(_0x4ae918(0x293))/0x8)+-parseInt(_0x4ae918(0x29b))/0x9+parseInt(_0x4ae918(0x221))/0xa;if(_0x346186===_0x4593f5)break;else _0x33a222['push'](_0x33a222['shift']());}catch(_0x5b9ff2){_0x33a222['push'](_0x33a222['shift']());}}}(_0x1aea,0x4bba3));var label=_0x424a8b(0x24c),tier=tier||0x0,dependencies=['VisuMZ_1_BattleCore'],pluginData=$plugins['filter'](function(_0x47ad08){const _0x1fbad1=_0x424a8b;return _0x47ad08[_0x1fbad1(0x1e1)]&&_0x47ad08['description']['includes']('['+label+']');})[0x0];VisuMZ[label][_0x424a8b(0x297)]=VisuMZ[label][_0x424a8b(0x297)]||{},VisuMZ[_0x424a8b(0x229)]=function(_0x1bca3f,_0x1ce719){const _0x1a8567=_0x424a8b;for(const _0x190a00 in _0x1ce719){if('wHnjo'!==_0x1a8567(0x2b2))return _0x5ea975[_0x1a8567(0x1e1)]&&_0x35c241['description']['includes']('['+_0x5e95c6+']');else{if(_0x190a00[_0x1a8567(0x21d)](/(.*):(.*)/i)){const _0x3edb03=String(RegExp['$1']),_0x15ce43=String(RegExp['$2'])[_0x1a8567(0x28f)]()[_0x1a8567(0x1e7)]();let _0x4b69d1,_0x1f30f4,_0x5dcc1f;switch(_0x15ce43){case'NUM':_0x4b69d1=_0x1ce719[_0x190a00]!==''?Number(_0x1ce719[_0x190a00]):0x0;break;case _0x1a8567(0x253):_0x1f30f4=_0x1ce719[_0x190a00]!==''?JSON[_0x1a8567(0x220)](_0x1ce719[_0x190a00]):[],_0x4b69d1=_0x1f30f4['map'](_0x46222a=>Number(_0x46222a));break;case _0x1a8567(0x21a):_0x4b69d1=_0x1ce719[_0x190a00]!==''?eval(_0x1ce719[_0x190a00]):null;break;case _0x1a8567(0x2ad):_0x1f30f4=_0x1ce719[_0x190a00]!==''?JSON[_0x1a8567(0x220)](_0x1ce719[_0x190a00]):[],_0x4b69d1=_0x1f30f4[_0x1a8567(0x1ef)](_0x57401d=>eval(_0x57401d));break;case _0x1a8567(0x265):_0x4b69d1=_0x1ce719[_0x190a00]!==''?JSON[_0x1a8567(0x220)](_0x1ce719[_0x190a00]):'';break;case'ARRAYJSON':_0x1f30f4=_0x1ce719[_0x190a00]!==''?JSON[_0x1a8567(0x220)](_0x1ce719[_0x190a00]):[],_0x4b69d1=_0x1f30f4['map'](_0x4df393=>JSON[_0x1a8567(0x220)](_0x4df393));break;case _0x1a8567(0x286):_0x4b69d1=_0x1ce719[_0x190a00]!==''?new Function(JSON[_0x1a8567(0x220)](_0x1ce719[_0x190a00])):new Function(_0x1a8567(0x26a));break;case _0x1a8567(0x290):_0x1f30f4=_0x1ce719[_0x190a00]!==''?JSON[_0x1a8567(0x220)](_0x1ce719[_0x190a00]):[],_0x4b69d1=_0x1f30f4[_0x1a8567(0x1ef)](_0x5e4539=>new Function(JSON[_0x1a8567(0x220)](_0x5e4539)));break;case'STR':_0x4b69d1=_0x1ce719[_0x190a00]!==''?String(_0x1ce719[_0x190a00]):'';break;case'ARRAYSTR':_0x1f30f4=_0x1ce719[_0x190a00]!==''?JSON['parse'](_0x1ce719[_0x190a00]):[],_0x4b69d1=_0x1f30f4['map'](_0x2b7566=>String(_0x2b7566));break;case'STRUCT':_0x5dcc1f=_0x1ce719[_0x190a00]!==''?JSON[_0x1a8567(0x220)](_0x1ce719[_0x190a00]):{},_0x4b69d1=VisuMZ[_0x1a8567(0x229)]({},_0x5dcc1f);break;case'ARRAYSTRUCT':_0x1f30f4=_0x1ce719[_0x190a00]!==''?JSON[_0x1a8567(0x220)](_0x1ce719[_0x190a00]):[],_0x4b69d1=_0x1f30f4[_0x1a8567(0x1ef)](_0x4ac276=>VisuMZ[_0x1a8567(0x229)]({},JSON[_0x1a8567(0x220)](_0x4ac276)));break;default:continue;}_0x1bca3f[_0x3edb03]=_0x4b69d1;}}}return _0x1bca3f;},(_0x602196=>{const _0xd9aac1=_0x424a8b,_0x4e07f0=_0x602196['name'];for(const _0x4e7cb0 of dependencies){if(!Imported[_0x4e7cb0]){if('KrJJO'!==_0xd9aac1(0x285))return null;else{alert(_0xd9aac1(0x215)[_0xd9aac1(0x1f9)](_0x4e07f0,_0x4e7cb0)),SceneManager[_0xd9aac1(0x241)]();break;}}}const _0x4ca243=_0x602196[_0xd9aac1(0x22f)];if(_0x4ca243[_0xd9aac1(0x21d)](/\[Version[ ](.*?)\]/i)){const _0x36287d=Number(RegExp['$1']);_0x36287d!==VisuMZ[label][_0xd9aac1(0x264)]&&(alert(_0xd9aac1(0x29f)[_0xd9aac1(0x1f9)](_0x4e07f0,_0x36287d)),SceneManager['exit']());}if(_0x4ca243[_0xd9aac1(0x21d)](/\[Tier[ ](\d+)\]/i)){const _0x5159dd=Number(RegExp['$1']);if(_0x5159dd<tier){if(_0xd9aac1(0x22d)!=='BjjhO'){const _0x50f63c=this[_0xd9aac1(0x29c)](),_0x5bd6fe=this[_0xd9aac1(0x2a7)](_0x50f63c);return _0x5bd6fe;}else alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x4e07f0,_0x5159dd,tier)),SceneManager[_0xd9aac1(0x241)]();}else tier=Math[_0xd9aac1(0x271)](_0x5159dd,tier);}VisuMZ[_0xd9aac1(0x229)](VisuMZ[label][_0xd9aac1(0x297)],_0x602196['parameters']);})(pluginData),VisuMZ[_0x424a8b(0x24c)]['RegExp']={'HelpDescription':/<(?:HELP|HELP DESCRIPTION|DESCRIPTION)>\s*([\s\S]*)\s*<\/(?:HELP|HELP DESCRIPTION|DESCRIPTION)>/i,'Exclude':/<EXCLUDE FROM (?:TOOLTIP|TOOLTIPS)>/i},VisuMZ['StateTooltips']['Scene_Boot_onDatabaseLoaded']=Scene_Boot[_0x424a8b(0x203)][_0x424a8b(0x1ed)],Scene_Boot[_0x424a8b(0x203)][_0x424a8b(0x1ed)]=function(){const _0xe9037d=_0x424a8b;VisuMZ['StateTooltips'][_0xe9037d(0x287)]['call'](this),this[_0xe9037d(0x2a0)]();},Scene_Boot[_0x424a8b(0x203)][_0x424a8b(0x2a0)]=function(){const _0x2666db=_0x424a8b;this[_0x2666db(0x244)]();},Scene_Boot[_0x424a8b(0x203)][_0x424a8b(0x244)]=function(){const _0xd49dea=_0x424a8b;if(VisuMZ[_0xd49dea(0x217)])return;for(const _0x2b0cc8 of $dataStates){if(!_0x2b0cc8)continue;VisuMZ[_0xd49dea(0x24c)]['Parse_Notetags_Description'](_0x2b0cc8);}},VisuMZ['StateTooltips'][_0x424a8b(0x292)]=VisuMZ[_0x424a8b(0x292)],VisuMZ[_0x424a8b(0x292)]=function(_0x46bc73){const _0x3b6a3b=_0x424a8b;VisuMZ[_0x3b6a3b(0x24c)][_0x3b6a3b(0x292)][_0x3b6a3b(0x261)](this,_0x46bc73),VisuMZ[_0x3b6a3b(0x24c)]['Parse_Notetags_Description'](_0x46bc73);},VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x214)]=function(_0x1df07b){const _0x21bf2e=_0x424a8b;_0x1df07b[_0x21bf2e(0x22f)]=VisuMZ[_0x21bf2e(0x24c)][_0x21bf2e(0x297)][_0x21bf2e(0x257)]['HelpDescription'];const _0x3f7243=VisuMZ[_0x21bf2e(0x24c)][_0x21bf2e(0x24a)],_0x2bfd6e=_0x1df07b[_0x21bf2e(0x24d)];_0x2bfd6e[_0x21bf2e(0x21d)](_0x3f7243[_0x21bf2e(0x223)])&&(_0x21bf2e(0x20b)!==_0x21bf2e(0x279)?_0x1df07b[_0x21bf2e(0x22f)]=String(RegExp['$1'])[_0x21bf2e(0x1e7)]():this[_0x21bf2e(0x21e)]+=_0x5bb076+'\x0a');},ColorManager['getColor']=function(_0x50da26){const _0x13668c=_0x424a8b;_0x50da26=String(_0x50da26);if(_0x50da26[_0x13668c(0x21d)](/#(.*)/i)){if(_0x13668c(0x263)===_0x13668c(0x25c))_0x357305['StateTooltips'][_0x13668c(0x2a9)][_0x13668c(0x261)](this),_0x49fd69['refreshStateTooltipBattler'](this);else return _0x13668c(0x2b4)['format'](String(RegExp['$1']));}else return this['textColor'](Number(_0x50da26));},SceneManager[_0x424a8b(0x23e)]=function(){const _0x54f20f=_0x424a8b;return this[_0x54f20f(0x2aa)]&&this[_0x54f20f(0x2aa)]['constructor']===Scene_Battle;},SceneManager[_0x424a8b(0x2ac)]=function(){const _0x2c5401=_0x424a8b,_0x28c9de=SceneManager[_0x2c5401(0x2aa)][_0x2c5401(0x24e)];if(!_0x28c9de)return null;return _0x28c9de[_0x2c5401(0x219)];},SceneManager[_0x424a8b(0x1f8)]=function(_0x29d635){const _0x289f0b=_0x424a8b;if(_0x29d635&&!_0x29d635[_0x289f0b(0x281)]())return;if(_0x29d635&&_0x29d635[_0x289f0b(0x228)]())return;const _0x3d119a=SceneManager[_0x289f0b(0x2aa)][_0x289f0b(0x24e)];if(!_0x3d119a)return;_0x3d119a[_0x289f0b(0x28c)](_0x29d635);},SceneManager[_0x424a8b(0x23b)]=function(_0x346b6e){const _0x18420f=_0x424a8b;if(_0x346b6e&&!_0x346b6e[_0x18420f(0x281)]())return;const _0x265846=SceneManager[_0x18420f(0x2aa)][_0x18420f(0x24e)];if(!_0x265846)return;if(_0x265846[_0x18420f(0x219)]!==_0x346b6e)return;_0x265846['requestRefresh']();},VisuMZ[_0x424a8b(0x24c)]['Game_Battler_refresh']=Game_Battler[_0x424a8b(0x203)][_0x424a8b(0x24b)],Game_Battler['prototype'][_0x424a8b(0x24b)]=function(){const _0x31aa28=_0x424a8b;VisuMZ[_0x31aa28(0x24c)][_0x31aa28(0x2a9)][_0x31aa28(0x261)](this),SceneManager[_0x31aa28(0x23b)](this);},VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x283)]=Scene_Base[_0x424a8b(0x203)][_0x424a8b(0x2ae)],Scene_Base[_0x424a8b(0x203)][_0x424a8b(0x2ae)]=function(){const _0x466955=_0x424a8b;VisuMZ[_0x466955(0x24c)]['Scene_Base_createWindowLayer']['call'](this),this['createStateTooltipWindow']();},Scene_Base[_0x424a8b(0x203)]['createStateTooltipWindow']=function(){const _0x445649=_0x424a8b;this[_0x445649(0x24e)]=new Window_StateTooltip(),this[_0x445649(0x2a1)](this[_0x445649(0x24e)]);},VisuMZ['StateTooltips'][_0x424a8b(0x27b)]=Sprite_Clickable[_0x424a8b(0x203)][_0x424a8b(0x277)],Sprite_Clickable['prototype'][_0x424a8b(0x277)]=function(){const _0x2e780d=_0x424a8b;VisuMZ[_0x2e780d(0x24c)][_0x2e780d(0x27b)][_0x2e780d(0x261)](this),this[_0x2e780d(0x22a)]();},VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x218)]=Sprite_Clickable['prototype'][_0x424a8b(0x26f)],Sprite_Clickable[_0x424a8b(0x203)][_0x424a8b(0x26f)]=function(){const _0x3cd888=_0x424a8b;VisuMZ['StateTooltips'][_0x3cd888(0x218)]['call'](this),this[_0x3cd888(0x295)]();},Sprite_Clickable[_0x424a8b(0x203)][_0x424a8b(0x22a)]=function(){const _0x4353ad=_0x424a8b;this[_0x4353ad(0x1f8)]();},Sprite_Clickable[_0x424a8b(0x203)]['onMouseExitStateTooltips']=function(){const _0x33384c=_0x424a8b,_0x58758d=this[_0x33384c(0x238)]();_0x58758d&&SceneManager['currentTooltipBattler']()===_0x58758d&&('snoqf'===_0x33384c(0x2a8)?this[_0x33384c(0x244)]():SceneManager[_0x33384c(0x1f8)](null));},Sprite_Clickable[_0x424a8b(0x203)]['setStateTooltipBattler']=function(){const _0x3c78c9=_0x424a8b,_0x63fdc=this[_0x3c78c9(0x238)]();if(_0x63fdc){if(_0x3c78c9(0x26b)==='mBPam')SceneManager['setStateTooltipBattler'](_0x63fdc);else{_0x3e43d2[_0x3c78c9(0x24c)][_0x3c78c9(0x206)][_0x3c78c9(0x261)](this);if(this[_0x3c78c9(0x27c)][_0x3c78c9(0x23f)][_0x3c78c9(0x21d)](/Debug/i))return;this[_0x3c78c9(0x20a)]();}}},Sprite_Clickable[_0x424a8b(0x203)]['getStateTooltipBattler']=function(){return null;},VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x284)]=Sprite_Battler[_0x424a8b(0x203)][_0x424a8b(0x277)],Sprite_Battler[_0x424a8b(0x203)][_0x424a8b(0x277)]=function(){const _0x3213d2=_0x424a8b;VisuMZ[_0x3213d2(0x24c)][_0x3213d2(0x284)][_0x3213d2(0x261)](this),this[_0x3213d2(0x1f8)]();},Sprite_Battler['prototype'][_0x424a8b(0x238)]=function(){const _0x196d9c=_0x424a8b;return this[_0x196d9c(0x219)];},Window_Base[_0x424a8b(0x203)]['isMouseHovered']=function(){const _0x20f953=_0x424a8b,_0x49db3a=new Point(TouchInput['x'],TouchInput['y']),_0x164056=this[_0x20f953(0x26c)][_0x20f953(0x28b)](_0x49db3a);return this[_0x20f953(0x266)]()['contains'](_0x164056['x'],_0x164056['y']);},Window_Base['prototype'][_0x424a8b(0x266)]=function(){const _0x462173=_0x424a8b;return new Rectangle(0x0,0x0,this['width'],this[_0x462173(0x256)]);},VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x206)]=Window_Selectable[_0x424a8b(0x203)][_0x424a8b(0x234)],Window_Selectable[_0x424a8b(0x203)][_0x424a8b(0x234)]=function(){const _0x55d724=_0x424a8b;VisuMZ[_0x55d724(0x24c)][_0x55d724(0x206)][_0x55d724(0x261)](this);if(this[_0x55d724(0x27c)][_0x55d724(0x23f)]['match'](/Debug/i))return;this[_0x55d724(0x20a)]();},Window_Selectable[_0x424a8b(0x203)]['processTouchStateTooltips']=function(){const _0x2bff54=_0x424a8b;if(!this['isStateTooltipEnabled']())return;this[_0x2bff54(0x276)]=this[_0x2bff54(0x276)]||{};if(!this[_0x2bff54(0x1ff)]()){this[_0x2bff54(0x276)][_0x2bff54(0x245)]&&this[_0x2bff54(0x1e0)]();return;}else this['_cache_StateTooltips'][_0x2bff54(0x245)]=!![];if(!this[_0x2bff54(0x252)]){if(_0x2bff54(0x29e)===_0x2bff54(0x29e)){this[_0x2bff54(0x276)]['visible']&&(_0x2bff54(0x1f1)===_0x2bff54(0x26d)?(this[_0x2bff54(0x276)]['battler']=_0x226667,_0x26932a[_0x2bff54(0x1f8)](_0x38a385)):this['closeTouchStateTooltips']());return;}else return this[_0x2bff54(0x207)];}else this['_cache_StateTooltips'][_0x2bff54(0x252)]=!![];if(this['_cache_StateTooltips']['x']!==this['x']||this[_0x2bff54(0x276)]['y']!==this['y']||this[_0x2bff54(0x276)][_0x2bff54(0x27f)]!==TouchInput['x']||this[_0x2bff54(0x276)][_0x2bff54(0x27f)]!==TouchInput['y']){this[_0x2bff54(0x276)]['x']=this['x'],this[_0x2bff54(0x276)]['y']=this['y'],this[_0x2bff54(0x276)][_0x2bff54(0x27f)]=TouchInput['x'],this[_0x2bff54(0x276)][_0x2bff54(0x2a6)]=TouchInput['y'];if(this[_0x2bff54(0x2b5)]())this[_0x2bff54(0x276)][_0x2bff54(0x205)]=!![],this[_0x2bff54(0x27d)]();else{if(this['_cache_StateTooltips'][_0x2bff54(0x205)]){if(_0x2bff54(0x1de)===_0x2bff54(0x210)){const _0x4f0666=_0x10c610['_scene'][_0x2bff54(0x24e)];if(!_0x4f0666)return null;return _0x4f0666[_0x2bff54(0x219)];}else this[_0x2bff54(0x1e0)]();}}}},Window_Selectable['prototype'][_0x424a8b(0x1e3)]=function(){const _0x4a910a=_0x424a8b;return VisuMZ['StateTooltips'][_0x4a910a(0x297)][_0x4a910a(0x201)][this[_0x4a910a(0x27c)][_0x4a910a(0x23f)]];},Window_Selectable[_0x424a8b(0x203)]['isStateTooltipTouched']=function(){return this['hitIndex']()>=0x0;},Window_Selectable[_0x424a8b(0x203)][_0x424a8b(0x1fa)]=function(){const _0x39eb16=_0x424a8b,_0x3cf69d=new Point(TouchInput['x'],TouchInput['y']),_0xf84870=this[_0x39eb16(0x26c)][_0x39eb16(0x28b)](_0x3cf69d),_0xcd56ef=new Rectangle(0x0,0x0,this[_0x39eb16(0x1f4)],this[_0x39eb16(0x256)]);return _0xcd56ef[_0x39eb16(0x1ee)](_0xf84870['x'],_0xf84870['y']);},Window_Selectable['prototype'][_0x424a8b(0x27d)]=function(){const _0x3f868f=_0x424a8b,_0x5b7e39=this[_0x3f868f(0x238)]();if(_0x5b7e39){if('mhktd'==='wGUGM'){const _0x1421d0=this[_0x3f868f(0x238)]();_0x1421d0&&_0x1cf0e8['currentTooltipBattler']()===_0x1421d0&&_0x4c5705['setStateTooltipBattler'](null);}else this[_0x3f868f(0x276)]['battler']=_0x5b7e39,SceneManager[_0x3f868f(0x1f8)](_0x5b7e39);}else this[_0x3f868f(0x1e0)]();},Window_Selectable[_0x424a8b(0x203)][_0x424a8b(0x238)]=function(){return null;},Window_Selectable[_0x424a8b(0x203)][_0x424a8b(0x1e0)]=function(){const _0x164800=_0x424a8b;this[_0x164800(0x276)][_0x164800(0x245)]=![],this[_0x164800(0x276)][_0x164800(0x252)]=![],this[_0x164800(0x276)]['hitTest']=![],this[_0x164800(0x276)]['battler']&&(SceneManager['setStateTooltipBattler'](null),this[_0x164800(0x276)][_0x164800(0x289)]=null);},Window_MenuStatus[_0x424a8b(0x203)][_0x424a8b(0x238)]=function(){const _0x10a1b3=_0x424a8b,_0x18da33=this[_0x10a1b3(0x29c)](),_0x3894b0=this[_0x10a1b3(0x2a7)](_0x18da33);return _0x3894b0;},Window_SkillStatus['prototype'][_0x424a8b(0x2b5)]=function(){const _0x219e27=_0x424a8b;return this[_0x219e27(0x1fa)]();},Window_SkillStatus[_0x424a8b(0x203)][_0x424a8b(0x238)]=function(){const _0x2053c9=_0x424a8b;return this[_0x2053c9(0x207)];},Window_EquipStatus[_0x424a8b(0x203)][_0x424a8b(0x2b5)]=function(){const _0xc2dfa8=_0x424a8b;return this[_0xc2dfa8(0x1fa)]();},Window_EquipStatus['prototype'][_0x424a8b(0x238)]=function(){const _0xf90125=_0x424a8b;return this[_0xf90125(0x207)];},Window_Status[_0x424a8b(0x203)]['isStateTooltipTouched']=function(){const _0x51863e=_0x424a8b;return this[_0x51863e(0x1fa)]();},Window_Status[_0x424a8b(0x203)]['getStateTooltipBattler']=function(){const _0x378b9d=_0x424a8b;return this[_0x378b9d(0x207)];},Window_BattleStatus[_0x424a8b(0x203)][_0x424a8b(0x238)]=function(){const _0x25a864=_0x424a8b,_0x4e86b4=this[_0x25a864(0x29c)](),_0x3d4ef7=this[_0x25a864(0x2a7)](_0x4e86b4);return _0x3d4ef7;},Window_BattleStatus[_0x424a8b(0x203)][_0x424a8b(0x1e3)]=function(){const _0xf8e762=_0x424a8b;if(Imported['VisuMZ_3_FrontviewBattleUI']&&BattleManager[_0xf8e762(0x243)]()){if(_0xf8e762(0x25b)!==_0xf8e762(0x28d)){if(VisuMZ[_0xf8e762(0x1f6)]['version']<1.09){let _0x5e536f='';_0x5e536f+=_0xf8e762(0x204),_0x5e536f+='in\x20order\x20for\x20VisuMZ_3_StateTooltips\x20to\x20work.',alert(_0x5e536f),SceneManager[_0xf8e762(0x241)]();}return![];}else this[_0xf8e762(0x219)]&&this[_0xf8e762(0x219)]['isDead']()&&this[_0xf8e762(0x28c)](null);}return Window_StatusBase['prototype'][_0xf8e762(0x1e3)][_0xf8e762(0x261)](this);};Imported[_0x424a8b(0x27a)]&&(Window_ClassStatus[_0x424a8b(0x203)][_0x424a8b(0x2b5)]=function(){const _0x442199=_0x424a8b;return this[_0x442199(0x1fa)]();},Window_ClassStatus[_0x424a8b(0x203)][_0x424a8b(0x238)]=function(){const _0x587f45=_0x424a8b;return this[_0x587f45(0x207)];});;function _0x69bb(_0x1ddc74,_0x3f87cb){const _0x1aeab4=_0x1aea();return _0x69bb=function(_0x69bbc0,_0x457e02){_0x69bbc0=_0x69bbc0-0x1db;let _0x710606=_0x1aeab4[_0x69bbc0];return _0x710606;},_0x69bb(_0x1ddc74,_0x3f87cb);}Imported[_0x424a8b(0x1df)]&&(Window_PartyStatus['prototype'][_0x424a8b(0x2b5)]=function(){const _0x32affd=_0x424a8b;return this[_0x32affd(0x1fa)]();},Window_PartyStatus[_0x424a8b(0x203)][_0x424a8b(0x238)]=function(){const _0x3c4b11=_0x424a8b;return this[_0x3c4b11(0x207)];});;function _0x1aea(){const _0x175bc5=['convertMessageKeywords','ParseStateNotetags','3776nLaBQW','Scale','onMouseExitStateTooltips','updatePosition','Settings','setupText','createContents','setupBuffText','1547784cgylhJ','hitIndex','show','FeraS','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','process_VisuMZ_StateTooltips','addChild','2989TxKsDS','isBuffAffected','ReplaceWhite','\x5cI[%1]','touchY','actor','eTDTe','Game_Battler_refresh','_scene','baseTextRect','currentTooltipBattler','ARRAYEVAL','createWindowLayer','debuffColor','981RDKmMX','OffsetY','wHnjo','BuffFmt','#%1','isStateTooltipTouched','updateOpacity','getColor','updateDeath','DebuffFmt','kWdyW','VisuMZ_2_PartySystem','closeTouchStateTooltips','status','NONWHITE_COLOR','isStateTooltipEnabled','iitRC','4HOleQw','stateColor','trim','buffColor','create','obtainEscapeString','HEJlM','requestRefresh','onDatabaseLoaded','contains','map','stateTurns','fpDDs','310355ErVANf','scale','width','_itemWindow','FrontviewBattleUI','clamp','setStateTooltipBattler','format','isStateTooltipHovered','STATE_FMT','setupBuffTurnText','kUMvC','buffIconIndex','isOpen','autoRemovalTiming','Window','isColorLocked','prototype','VisuMZ_3_FrontviewBattleUI\x20needs\x20to\x20be\x20updated\x20','hitTest','Window_Selectable_processTouch','_actor','windowskin','paramBuffRate','processTouchStateTooltips','MYOjq','getStateDisplay','254ezWYuI','updateBackOpacity','AhcxS','sXLIL','drawTextEx','initialize','contents','Parse_Notetags_Description','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','WINDOW_SCALE','ParseAllNotetags','Sprite_Clickable_onMouseExit','_battler','EVAL','targetOpacity','param','match','_text','BUFF_FMT','parse','9639670aOJApE','TURNS_FMT','HelpDescription','states','_skillWindow','257472pPWNkK','itemPadding','isDead','ConvertParams','onMouseEnterStateTooltips','REPLACE_WHITE','resetFontSettings','BjjhO','ffffff','description','Tooltip','xTyqz','uuThN','WhiteReplaceColor','processTouch','contentsOpacity','buffTurns','_buffs','getStateTooltipBattler','resizeWindow','TurnsFmt','refreshStateTooltipBattler','WINDOW_SKIN_FILENAME','backOpacity','isSceneBattle','name','drawing','exit','push','isUsingFrontviewUiLayout','process_VisuMZ_StateTooltips_Notetags','open','Exclude','pDfZy','active','isSupportMessageKeywords','RegExp','refresh','StateTooltips','note','_stateTooltipWindow','setupStateTurnText','setupStateText','opacity','visible','ARRAYNUM','1541760xKxyGo','WINDOW_SKIN_OPACITY','height','Vocab','padding','clampPosition','\x5cHEXCOLOR<#%1>','HnExH','CMLXH','textSizeEx','isBuffOrDebuffAffected','EpzFn','processEscapeCharacter','call','isMouseHovered','wVuQy','version','JSON','dimensionRect','WindowOpacity','includes','MOUSE_OFFSET_X','return\x200','mBPam','worldTransform','gtwnt','iconIndex','onMouseExit','update','max','length','PASSIVE_TEXT','MOUSE_OFFSET_Y','_choiceListWindow','_cache_StateTooltips','onMouseEnter','_requestRefresh','VkOOv','VisuMZ_2_ClassChangeSystem','Sprite_Clickable_onMouseEnter','constructor','openTouchStateTooltips','round','touchX','replace','isAppeared','replaceHexColors','Scene_Base_createWindowLayer','Sprite_Battler_onMouseEnter','KrJJO','FUNC','Scene_Boot_onDatabaseLoaded','StateFmt','battler','KZsLL','applyInverse','setBattler','NkuGS','hide','toUpperCase','ARRAYFUNC'];_0x1aea=function(){return _0x175bc5;};return _0x1aea();}function Window_StateTooltip(){const _0x58b12f=_0x424a8b;this[_0x58b12f(0x212)](...arguments);}Window_StateTooltip['prototype']=Object[_0x424a8b(0x1e9)](Window_Base[_0x424a8b(0x203)]),Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x27c)]=Window_StateTooltip,Window_StateTooltip[_0x424a8b(0x216)]=VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x297)][_0x424a8b(0x230)][_0x424a8b(0x294)],Window_StateTooltip[_0x424a8b(0x23c)]=VisuMZ['StateTooltips'][_0x424a8b(0x297)][_0x424a8b(0x230)]['WindowSkin'],Window_StateTooltip['WINDOW_SKIN_OPACITY']=VisuMZ['StateTooltips'][_0x424a8b(0x297)][_0x424a8b(0x230)][_0x424a8b(0x267)],Window_StateTooltip[_0x424a8b(0x1fb)]=VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x297)][_0x424a8b(0x257)][_0x424a8b(0x288)],Window_StateTooltip[_0x424a8b(0x21f)]=VisuMZ['StateTooltips']['Settings'][_0x424a8b(0x257)][_0x424a8b(0x2b3)],Window_StateTooltip['DEBUFF_FMT']=VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x297)][_0x424a8b(0x257)][_0x424a8b(0x1dd)],Window_StateTooltip['ACTIONS_FMT']=VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x297)][_0x424a8b(0x257)]['ActionsFmt'],Window_StateTooltip[_0x424a8b(0x222)]=VisuMZ['StateTooltips'][_0x424a8b(0x297)]['Vocab'][_0x424a8b(0x23a)],Window_StateTooltip[_0x424a8b(0x273)]=VisuMZ['StateTooltips']['Settings'][_0x424a8b(0x257)]['PassiveText'],Window_StateTooltip[_0x424a8b(0x22b)]=VisuMZ[_0x424a8b(0x24c)]['Settings'][_0x424a8b(0x257)][_0x424a8b(0x2a4)],Window_StateTooltip[_0x424a8b(0x1e2)]=VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x297)][_0x424a8b(0x257)][_0x424a8b(0x233)],Window_StateTooltip['MOUSE_OFFSET_X']=VisuMZ['StateTooltips']['Settings'][_0x424a8b(0x230)]['OffsetX'],Window_StateTooltip[_0x424a8b(0x274)]=VisuMZ[_0x424a8b(0x24c)][_0x424a8b(0x297)]['Tooltip'][_0x424a8b(0x2b1)],Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x212)]=function(){const _0x48413f=_0x424a8b,_0x3e521a=new Rectangle(0x0,0x0,Graphics['width'],Graphics['height']);Window_Base[_0x48413f(0x203)][_0x48413f(0x212)][_0x48413f(0x261)](this,_0x3e521a),this[_0x48413f(0x1f3)]['x']=this['scale']['y']=Window_StateTooltip[_0x48413f(0x216)],this[_0x48413f(0x28e)](),this[_0x48413f(0x219)]=null;},Window_StateTooltip['prototype']['loadWindowskin']=function(){const _0x3069f7=_0x424a8b;this[_0x3069f7(0x208)]=ImageManager['loadSystem'](Window_StateTooltip['WINDOW_SKIN_FILENAME']);},Window_StateTooltip['prototype'][_0x424a8b(0x20e)]=function(){const _0x741ab6=_0x424a8b;this[_0x741ab6(0x23d)]=Window_StateTooltip[_0x741ab6(0x255)];},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x28c)]=function(_0x1de70c){const _0x20aa64=_0x424a8b;if(this['_battler']===_0x1de70c)return;this[_0x20aa64(0x219)]=_0x1de70c,this[_0x20aa64(0x219)]?this[_0x20aa64(0x24b)]():this[_0x20aa64(0x28e)]();},Window_StateTooltip[_0x424a8b(0x203)]['refresh']=function(){const _0x155ac5=_0x424a8b;this[_0x155ac5(0x213)]['clear'](),this[_0x155ac5(0x298)]();if(this[_0x155ac5(0x21e)][_0x155ac5(0x272)]>0x0){this[_0x155ac5(0x239)]();const _0x1c2e49=this[_0x155ac5(0x2ab)]();this[_0x155ac5(0x211)](this[_0x155ac5(0x21e)],_0x1c2e49['x'],_0x1c2e49['y'],_0x1c2e49[_0x155ac5(0x1f4)]),this[_0x155ac5(0x29d)]();}else this[_0x155ac5(0x28e)]();},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x291)]=function(_0x22d835){return _0x22d835;},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x249)]=function(){return![];},Window_StateTooltip['prototype'][_0x424a8b(0x298)]=function(){const _0x4fe5db=_0x424a8b;this['_text']='';if(!this[_0x4fe5db(0x219)])return;this[_0x4fe5db(0x250)](),this[_0x4fe5db(0x29a)](),this[_0x4fe5db(0x282)](),this[_0x4fe5db(0x21e)]=this[_0x4fe5db(0x21e)][_0x4fe5db(0x1e7)]();},Window_StateTooltip['prototype'][_0x424a8b(0x250)]=function(){const _0x1c1c46=_0x424a8b,_0x56b865=Window_StateTooltip[_0x1c1c46(0x1fb)],_0x59db46=this[_0x1c1c46(0x219)][_0x1c1c46(0x224)]();for(const _0x5b4abb of _0x59db46){if(_0x1c1c46(0x232)==='saNPa'){const _0x4d8875=new _0x153b90(_0x4b64ad['x'],_0x4700c8['y']),_0x3c85a2=this[_0x1c1c46(0x26c)][_0x1c1c46(0x28b)](_0x4d8875);return this[_0x1c1c46(0x266)]()[_0x1c1c46(0x1ee)](_0x3c85a2['x'],_0x3c85a2['y']);}else{if(!_0x5b4abb)continue;if(!_0x5b4abb[_0x1c1c46(0x23f)]['trim']())continue;if(_0x5b4abb['name'][_0x1c1c46(0x21d)](/-----/i))continue;if(_0x5b4abb[_0x1c1c46(0x26e)]<=0x0)continue;const _0x4978c3=VisuMZ[_0x1c1c46(0x24c)][_0x1c1c46(0x24a)];if(_0x5b4abb['note'][_0x1c1c46(0x21d)](_0x4978c3[_0x1c1c46(0x246)]))continue;const _0xf55c81=_0x1c1c46(0x2a5)[_0x1c1c46(0x1f9)](_0x5b4abb[_0x1c1c46(0x26e)]),_0x226390=_0x5b4abb[_0x1c1c46(0x23f)][_0x1c1c46(0x1e7)](),_0x139f66=_0x5b4abb[_0x1c1c46(0x22f)]['format'](this[_0x1c1c46(0x219)][_0x1c1c46(0x20c)](_0x5b4abb['id'])),_0x14f887=this[_0x1c1c46(0x24f)](_0x5b4abb),_0x450361=ColorManager[_0x1c1c46(0x1e6)](_0x5b4abb),_0x32a76d=_0x56b865['format'](_0xf55c81,_0x226390,_0x139f66,_0x14f887,_0x450361)['trim']();if(_0x32a76d){if(_0x1c1c46(0x247)===_0x1c1c46(0x247))this[_0x1c1c46(0x21e)]+=_0x32a76d+'\x0a';else{const _0x33fec1=_0x58e898['getColor'](_0x4e16ac['NONWHITE_COLOR']);_0x3364eb=_0x33fec1[_0x1c1c46(0x280)](/#/g,'');}}}}},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x24f)]=function(_0xae42cb){const _0x1126b7=_0x424a8b;if(_0xae42cb[_0x1126b7(0x200)]===0x0)return'';if(this[_0x1126b7(0x219)]['passiveStates']()[_0x1126b7(0x268)](_0xae42cb))return _0x1126b7(0x1fd)==='kUMvC'?Window_StateTooltip[_0x1126b7(0x273)]:![];let _0x42fdc1=_0xae42cb[_0x1126b7(0x200)]===0x1?Window_StateTooltip['ACTIONS_FMT']:Window_StateTooltip[_0x1126b7(0x222)];const _0x31da10=this[_0x1126b7(0x219)][_0x1126b7(0x1f0)](_0xae42cb['id'])||0x0,_0x2d8424=ColorManager[_0x1126b7(0x1e6)](_0xae42cb);return _0x42fdc1[_0x1126b7(0x1f9)](_0x31da10,_0x2d8424)[_0x1126b7(0x1e7)]();},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x29a)]=function(){const _0x59ddd5=_0x424a8b,_0x5ec997=Window_StateTooltip[_0x59ddd5(0x21f)],_0x4fef8d=Window_StateTooltip['DEBUFF_FMT'];for(let _0x1a745f=0x0;_0x1a745f<0x8;_0x1a745f++){if(_0x59ddd5(0x1e4)===_0x59ddd5(0x1e4)){if(!this[_0x59ddd5(0x219)][_0x59ddd5(0x25e)](_0x1a745f))continue;const _0x30d19e=this[_0x59ddd5(0x219)][_0x59ddd5(0x2a3)](_0x1a745f),_0x3b3575=_0x30d19e?_0x5ec997:_0x4fef8d,_0xa4bb49=this[_0x59ddd5(0x219)][_0x59ddd5(0x1fe)](this[_0x59ddd5(0x219)][_0x59ddd5(0x237)][_0x1a745f],_0x1a745f),_0x1efdb5='\x5cI[%1]'[_0x59ddd5(0x1f9)](_0xa4bb49),_0x5b0a90=TextManager[_0x59ddd5(0x21c)](_0x1a745f),_0x71dc14=Math['floor'](this[_0x59ddd5(0x219)][_0x59ddd5(0x209)](_0x1a745f)*0x64),_0x17a735=this[_0x59ddd5(0x1fc)](_0x1a745f),_0x446c2e=_0x30d19e?ColorManager[_0x59ddd5(0x1e8)]():ColorManager[_0x59ddd5(0x2af)](),_0x1be3ea=_0x3b3575[_0x59ddd5(0x1f9)](_0x1efdb5,_0x5b0a90,_0x71dc14,_0x17a735,_0x446c2e)[_0x59ddd5(0x1e7)]();_0x1be3ea&&(this['_text']+=_0x1be3ea+'\x0a');}else this[_0x59ddd5(0x1e0)]();}},Window_StateTooltip[_0x424a8b(0x203)]['setupBuffTurnText']=function(_0x2aff1b){const _0x78e0a2=_0x424a8b,_0xcbf870=Window_StateTooltip[_0x78e0a2(0x222)],_0xda1cb1=this[_0x78e0a2(0x219)][_0x78e0a2(0x236)](_0x2aff1b),_0x15e88f=this['_battler'][_0x78e0a2(0x2a3)](_0x2aff1b),_0x4fd321=_0x15e88f?ColorManager[_0x78e0a2(0x1e8)]():ColorManager[_0x78e0a2(0x2af)]();return _0xcbf870[_0x78e0a2(0x1f9)](_0xda1cb1,_0x4fd321)[_0x78e0a2(0x1e7)]();},Window_StateTooltip['prototype'][_0x424a8b(0x282)]=function(){const _0xa1d6ed=_0x424a8b,_0x8f0c8a=/\\C\[#(.*?)\]/g;this[_0xa1d6ed(0x21e)]=this[_0xa1d6ed(0x21e)][_0xa1d6ed(0x280)](_0x8f0c8a,(_0x7a6719,_0x3822eb)=>{const _0x533a01=_0xa1d6ed;if(_0x3822eb===_0x533a01(0x22e)){if(_0x533a01(0x28a)==='GQTdm')return this[_0x533a01(0x207)];else{const _0x7e7296=ColorManager[_0x533a01(0x1db)](Window_StateTooltip[_0x533a01(0x1e2)]);_0x3822eb=_0x7e7296[_0x533a01(0x280)](/#/g,'');}}return _0x533a01(0x25a)[_0x533a01(0x1f9)](_0x3822eb);});},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x260)]=function(_0x55053c,_0x8d7f25){const _0x3f672e=_0x424a8b;switch(_0x55053c){case'HEXCOLOR':const _0x3852fd=this[_0x3f672e(0x1ea)](_0x8d7f25);!this[_0x3f672e(0x202)]()&&_0x8d7f25[_0x3f672e(0x240)]&&this['changeTextColor'](_0x3852fd);break;default:Window_Base[_0x3f672e(0x203)][_0x3f672e(0x260)][_0x3f672e(0x261)](this,_0x55053c,_0x8d7f25);}},Window_StateTooltip[_0x424a8b(0x203)]['resizeWindow']=function(){const _0x4d9e12=_0x424a8b,_0x50ded8=this[_0x4d9e12(0x25d)](this[_0x4d9e12(0x21e)]);this['width']=_0x50ded8[_0x4d9e12(0x1f4)]+(this[_0x4d9e12(0x227)]()+this[_0x4d9e12(0x258)])*0x2,this['height']=_0x50ded8[_0x4d9e12(0x256)]+this[_0x4d9e12(0x258)]*0x2,this[_0x4d9e12(0x299)](),this[_0x4d9e12(0x22c)]();},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x270)]=function(){const _0x438b7c=_0x424a8b;Window_Base[_0x438b7c(0x203)][_0x438b7c(0x270)][_0x438b7c(0x261)](this);if(this[_0x438b7c(0x278)]){if(_0x438b7c(0x1eb)===_0x438b7c(0x20f)){this[_0x438b7c(0x276)][_0x438b7c(0x252)]&&this['closeTouchStateTooltips']();return;}else this[_0x438b7c(0x278)]=![],this[_0x438b7c(0x24b)]();}this[_0x438b7c(0x296)](),this[_0x438b7c(0x1dc)](),this[_0x438b7c(0x2b6)]();},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x1ec)]=function(){this['_requestRefresh']=!![];},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x296)]=function(){const _0xfc11d7=_0x424a8b;if(!this[_0xfc11d7(0x252)])return;this['x']=TouchInput['x']+Window_StateTooltip[_0xfc11d7(0x269)],this['y']=TouchInput['y']+Window_StateTooltip[_0xfc11d7(0x274)],this['clampPosition']();},Window_StateTooltip['prototype'][_0x424a8b(0x259)]=function(){const _0x1cc92b=_0x424a8b,_0x436893=this['width']*(Window_StateTooltip[_0x1cc92b(0x216)]||0.01),_0xd3e382=this[_0x1cc92b(0x256)]*(Window_StateTooltip['WINDOW_SCALE']||0.01);this['x']=Math[_0x1cc92b(0x27e)](this['x'][_0x1cc92b(0x1f7)](0x0,Graphics[_0x1cc92b(0x1f4)]-_0x436893)),this['y']=Math[_0x1cc92b(0x27e)](this['y'][_0x1cc92b(0x1f7)](0x0,Graphics[_0x1cc92b(0x256)]-_0xd3e382));},Window_StateTooltip[_0x424a8b(0x203)]['updateDeath']=function(){const _0x8fa618=_0x424a8b;this[_0x8fa618(0x219)]&&this[_0x8fa618(0x219)][_0x8fa618(0x228)]()&&(_0x8fa618(0x231)!==_0x8fa618(0x231)?this[_0x8fa618(0x276)][_0x8fa618(0x252)]=!![]:this[_0x8fa618(0x28c)](null));},Window_StateTooltip[_0x424a8b(0x203)][_0x424a8b(0x2b6)]=function(){const _0x36d8b5=_0x424a8b,_0x1678e3=this[_0x36d8b5(0x21b)]();this[_0x36d8b5(0x251)]=this[_0x36d8b5(0x235)]=_0x1678e3;},Window_StateTooltip['prototype'][_0x424a8b(0x21b)]=function(){const _0x5981c2=_0x424a8b;if(SceneManager[_0x5981c2(0x23e)]()){if('WfNnR'!==_0x5981c2(0x25f)){const _0x2134aa=[];_0x2134aa[_0x5981c2(0x242)](SceneManager['_scene']['_actorCommandWindow']),_0x2134aa['push'](SceneManager[_0x5981c2(0x2aa)][_0x5981c2(0x1f5)]),_0x2134aa[_0x5981c2(0x242)](SceneManager[_0x5981c2(0x2aa)][_0x5981c2(0x225)]),_0x2134aa['push'](SceneManager[_0x5981c2(0x2aa)][_0x5981c2(0x275)]);for(const _0x141b54 of _0x2134aa){if(_0x141b54&&_0x141b54[_0x5981c2(0x1ff)]()&&_0x141b54[_0x5981c2(0x248)]&&_0x141b54[_0x5981c2(0x262)]())return 0x0;}}else return 0x0;}return 0xff;};