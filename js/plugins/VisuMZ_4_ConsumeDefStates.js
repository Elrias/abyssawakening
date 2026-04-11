//=============================================================================
// VisuStella MZ - Consumable Defensive States
// VisuMZ_4_ConsumeDefStates.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_4_ConsumeDefStates = true;

var VisuMZ = VisuMZ || {};
VisuMZ.ConsumeDefStates = VisuMZ.ConsumeDefStates || {};
VisuMZ.ConsumeDefStates.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 4] [Version 1.01] [ConsumeDefStates]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Main_Page
 * @orderAfter VisuMZ_0_CoreEngine
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Consumable Defensive States are states that will protect its user once from
 * a specific element(s), skill type(s), or hit type(s) before automatically
 * removing itself. These defensive strategies can range from reflection,
 * evasion, or damage immunity. When utilized, these new state types can add a
 * whole new range of strategy to the battle system.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consumable Defensive States will protect its user from specific types of
 *   attacks before self-removing, consuming itself in the process.
 * * The action, its damage, and its effects can be reflected back at the user
 *   of the action as the third defensive reaction measure.
 * * Defensive evasion reaction states will allow battlers to dodge even skills
 *   with 100% hit rates, as long as the conditions have been met.
 * * Damage immunity is another defensive reaction that can be utilized through
 *   these new state effects. This is different from nullification as this will
 *   proc any damage immunity-based effects.
 * * Those using the Skills and States Core will have access to extra features,
 *   such as additional charges that can be employed. Consumable Defensive
 *   States with additional charges will consume the charges first before
 *   consuming itself, allowing for additional usage.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Skills and States Core
 * 
 * - With the VisuStella MZ Skills and States Core installed, Consumable
 * Defensive States no longer have to be one time uses. Instead, they can have
 * charges. Each time their defensive properties take effect, the charges are
 * reduced by 1. If the number of charges reach zero, the state is
 * automatically removed. Simple and intuitive, right?
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
 * Anti-Damage Barriers
 * 
 * - The VisuStella MZ Anti-Damage Barriers notetag effects cannot be used
 * together with the Consumable Defensive States notetag effects. They utilize
 * the same state display. Priority will be given to Anti-Damage Barriers if
 * both of them are detected on the same state.
 * 
 * - If you absolutely need for multiple effects from both to occur at the same
 * time, we recommend that you create them as separate states and apply both
 * (or more) states simultaneously.
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
 * === Reflection-Related Notetags ===
 * 
 * ---
 *
 * <1 Time Reflect Element: id>
 * <1 Time Reflect Elements: id, id, id>
 * <1 Time Reflect Element: name>
 * <1 Time Reflect Elements: name, name, name>
 *
 * <x Charges Reflect Element: id>
 * <x Charges Reflect Elements: id, id, id>
 * <x Charges Reflect Element: name>
 * <x Charges Reflect Elements: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect the
 *   specific element until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - Replace 'id' with a number representing the element ID to be reflected.
 * - Replace 'name' with the name of the element to be reflected.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Reflect SType: id>
 * <1 Time Reflect STypes: id, id, id>
 * <1 Time Reflect SType: name>
 * <1 Time Reflect STypes: name, name, name>
 *
 * <x Charges Reflect SType: id>
 * <x Charges Reflect STypes: id, id, id>
 * <x Charges Reflect SType: name>
 * <x Charges Reflect STypes: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect a
 *   skill with the specific skill type until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - Replace 'id' with a number representing the skill type ID to be reflected.
 * - Replace 'name' with the name of the skill type to be reflected.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Reflect Certain Hit Skills>
 * <1 Time Reflect Physical Hit Skills>
 * <1 Time Reflect Magical Hit Skills>
 * <1 Time Reflect All Skills>
 *
 * <x Charges Reflect Certain Hit Skills>
 * <x Charges Reflect Physical Hit Skills>
 * <x Charges Reflect Magical Hit Skills>
 * <x Charges Reflect All Skills>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect a
 *   skill with the specific hit type until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Reflect Certain Hit Items>
 * <1 Time Reflect Physical Hit Items>
 * <1 Time Reflect Magical Hit Items>
 * <1 Time Reflect All Items>
 *
 * <x Charges Reflect Certain Hit Items>
 * <x Charges Reflect Physical Hit Items>
 * <x Charges Reflect Magical Hit Items>
 * <x Charges Reflect All Items>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect an
 *   item with the specific hit type until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Reflect Certain Hit Actions>
 * <1 Time Reflect Physical Hit Actions>
 * <1 Time Reflect Magical Hit Actions>
 * <1 Time Reflect All Actions>
 *
 * <x Charges Reflect Certain Hit Actions>
 * <x Charges Reflect Physical Hit Actions>
 * <x Charges Reflect Magical Hit Actions>
 * <x Charges Reflect All Actions>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will reflect an
 *   action (skill and/or item) with the specific hit type until consumed.
 *   - Reflection will occur before Evasion and Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 * 
 * === Evasion-Related Notetags ===
 * 
 * ---
 *
 * <1 Time Evasion Element: id>
 * <1 Time Evasion Elements: id, id, id>
 * <1 Time Evasion Element: name>
 * <1 Time Evasion Elements: name, name, name>
 *
 * <x Charges Evasion Element: id>
 * <x Charges Evasion Elements: id, id, id>
 * <x Charges Evasion Element: name>
 * <x Charges Evasion Elements: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade the
 *   specific element until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - Replace 'id' with a number representing the element ID to be evaded.
 * - Replace 'name' with the name of the element to be evaded.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Evasion SType: id>
 * <1 Time Evasion STypes: id, id, id>
 * <1 Time Evasion SType: name>
 * <1 Time Evasion STypes: name, name, name>
 *
 * <x Charges Evasion SType: id>
 * <x Charges Evasion STypes: id, id, id>
 * <x Charges Evasion SType: name>
 * <x Charges Evasion STypes: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade a
 *   skill with the specific skill type until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - Replace 'id' with a number representing the skill type ID to be evaded.
 * - Replace 'name' with the name of the skill type to be evaded.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Evasion Certain Hit Skills>
 * <1 Time Evasion Physical Hit Skills>
 * <1 Time Evasion Magical Hit Skills>
 * <1 Time Evasion All Skills>
 *
 * <x Charges Evasion Certain Hit Skills>
 * <x Charges Evasion Physical Hit Skills>
 * <x Charges Evasion Magical Hit Skills>
 * <x Charges Evasion All Skills>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade a
 *   skill with the specific hit type until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Evasion Certain Hit Items>
 * <1 Time Evasion Physical Hit Items>
 * <1 Time Evasion Magical Hit Items>
 * <1 Time Evasion All Items>
 *
 * <x Charges Evasion Certain Hit Items>
 * <x Charges Evasion Physical Hit Items>
 * <x Charges Evasion Magical Hit Items>
 * <x Charges Evasion All Items>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade an
 *   item with the specific hit type until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Evasion Certain Hit Actions>
 * <1 Time Evasion Physical Hit Actions>
 * <1 Time Evasion Magical Hit Actions>
 * <1 Time Evasion All Actions>
 *
 * <x Charges Evasion Certain Hit Actions>
 * <x Charges Evasion Physical Hit Actions>
 * <x Charges Evasion Magical Hit Actions>
 * <x Charges Evasion All Actions>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will evade an
 *   action (skill and/or item) with the specific hit type until consumed.
 *   - Evasion will occur after Reflection and before Damage Immunity.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 * 
 * === Immunity-Related Notetags ===
 * 
 * ---
 *
 * <1 Time Immunity Element: id>
 * <1 Time Immunity Elements: id, id, id>
 * <1 Time Immunity Element: name>
 * <1 Time Immunity Elements: name, name, name>
 *
 * <x Charges Immunity Element: id>
 * <x Charges Immunity Elements: id, id, id>
 * <x Charges Immunity Element: name>
 * <x Charges Immunity Elements: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from the specific element until consumed. Other effects may still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - Replace 'id' with a number representing the element ID to nullify.
 * - Replace 'name' with the name of the element to nullify.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Immunity SType: id>
 * <1 Time Immunity STypes: id, id, id>
 * <1 Time Immunity SType: name>
 * <1 Time Immunity STypes: name, name, name>
 *
 * <x Charges Immunity SType: id>
 * <x Charges Immunity STypes: id, id, id>
 * <x Charges Immunity SType: name>
 * <x Charges Immunity STypes: name, name, name>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from a skill with the specific skill type until consumed. Other effects
 *   may still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - Replace 'id' with a number representing the skill type ID to nullify.
 * - Replace 'name' with the name of the skill type to nullify.
 *   - Remove any \I[x] text codes from it if present.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Immunity Certain Hit Skills>
 * <1 Time Immunity Physical Hit Skills>
 * <1 Time Immunity Magical Hit Skills>
 * <1 Time Immunity All Skills>
 *
 * <x Charges Immunity Certain Hit Skills>
 * <x Charges Immunity Physical Hit Skills>
 * <x Charges Immunity Magical Hit Skills>
 * <x Charges Immunity All Skills>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from a skill with the specific hit type until consumed. Other effects may
 *   still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Immunity Certain Hit Items>
 * <1 Time Immunity Physical Hit Items>
 * <1 Time Immunity Magical Hit Items>
 * <1 Time Immunity: All Items>
 *
 * <x Charges Immunity Certain Hit Items>
 * <x Charges Immunity Physical Hit Items>
 * <x Charges Immunity Magical Hit Items>
 * <x Charges Immunity: All Items>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from an item with the specific hit type until consumed. Other effects may
 *   still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 *
 * <1 Time Immunity Certain Hit Actions>
 * <1 Time Immunity Physical Hit Actions>
 * <1 Time Immunity Magical Hit Actions>
 * <1 Time Immunity: All Actions>
 *
 * <x Charges Immunity Certain Hit Actions>
 * <x Charges Immunity Physical Hit Actions>
 * <x Charges Immunity Magical Hit Actions>
 * <x Charges Immunity: All Actions>
 *
 * - Used for: State Notetags
 * - Turns the state into a Consumable Defensive State that will nullify damage
 *   from an action (skill and/or item) with the specific hit type until
 *   consumed. Other effects may still occur.
 *   - Immunity will occur after Reflection and Evasion.
 * - If VisuMZ_1_SkillsStatesCore is installed, you may use the 'x' notetags.
 *   - Replace 'x' with the number of usable charges the state would have
 *     before being consumed. Usable charges go down by 1 each trigger.
 * - IMPORTANT: You cannot use other Consumable Defensive State notetags
 *   together in the same state.
 *
 * ---
 * 
 * === Stackable Charges-Related Notetags ===
 * 
 * ---
 *
 * <Max Stackable Charges: x>
 *
 * - State Notetags
 * - Requires VisuMZ_1_SkillsStatesCore!
 * - Allows the max stackable charges for the state to become 'x'.
 * - Replace 'x' with a number representing the maximum charges the state can
 *   potentially have. If 'x' is lower than the default charge amount, 'x' will
 *   become the default charge amount.
 * - This is not a Consumable Defensive State notetag and can therefore be used
 *   together with the above notetags.
 * - If this notetag is not present, whenever a Consumable Defensive State is
 *   reapplied, the charge number resets. With this notetag, the charges become
 *   stackable up to a maximum of 'x'.
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
 * Version 1.01: October 28, 2021
 * * Bug Fixes!
 * ** Fixed documentation error that listed the incorrect way to parse notetags
 *    for the various Evasion, Reflect, and Immune effects.
 *    Fix made by Olivia.
 * * Documentation Update!
 * ** Help file updated for the correct notetag parsings.
 *
 * Version 1.00 Official Release Date: November 5, 2021
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
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 */
//=============================================================================

const _0x1b7e4c=_0x51a5;(function(_0xab9ad8,_0x5df248){const _0x56a697=_0x51a5,_0x4db253=_0xab9ad8();while(!![]){try{const _0x178ed7=-parseInt(_0x56a697(0x170))/0x1*(-parseInt(_0x56a697(0x132))/0x2)+parseInt(_0x56a697(0x166))/0x3+parseInt(_0x56a697(0x138))/0x4+-parseInt(_0x56a697(0x17a))/0x5*(parseInt(_0x56a697(0x15a))/0x6)+parseInt(_0x56a697(0x151))/0x7+parseInt(_0x56a697(0x16f))/0x8*(-parseInt(_0x56a697(0x16d))/0x9)+parseInt(_0x56a697(0x145))/0xa;if(_0x178ed7===_0x5df248)break;else _0x4db253['push'](_0x4db253['shift']());}catch(_0xbbdbed){_0x4db253['push'](_0x4db253['shift']());}}}(_0x361e,0xade63));var label=_0x1b7e4c(0x141),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x1b7e4c(0x154)](function(_0x1093d8){const _0x3a617a=_0x1b7e4c;return _0x1093d8[_0x3a617a(0x179)]&&_0x1093d8['description'][_0x3a617a(0x16c)]('['+label+']');})[0x0];function _0x51a5(_0x27f563,_0x1d7fd2){const _0x361e77=_0x361e();return _0x51a5=function(_0x51a563,_0x3da3ce){_0x51a563=_0x51a563-0x12c;let _0x130538=_0x361e77[_0x51a563];return _0x130538;},_0x51a5(_0x27f563,_0x1d7fd2);}VisuMZ[label][_0x1b7e4c(0x186)]=VisuMZ[label][_0x1b7e4c(0x186)]||{},VisuMZ[_0x1b7e4c(0x142)]=function(_0x15c867,_0xa8cdc4){const _0x324055=_0x1b7e4c;for(const _0x2dfa35 in _0xa8cdc4){if(_0x2dfa35[_0x324055(0x14d)](/(.*):(.*)/i)){const _0x105fa8=String(RegExp['$1']),_0xd5ffa8=String(RegExp['$2'])[_0x324055(0x13b)]()[_0x324055(0x169)]();let _0x11165b,_0x57241b,_0x55729b;switch(_0xd5ffa8){case _0x324055(0x192):_0x11165b=_0xa8cdc4[_0x2dfa35]!==''?Number(_0xa8cdc4[_0x2dfa35]):0x0;break;case'ARRAYNUM':_0x57241b=_0xa8cdc4[_0x2dfa35]!==''?JSON[_0x324055(0x13c)](_0xa8cdc4[_0x2dfa35]):[],_0x11165b=_0x57241b[_0x324055(0x146)](_0x17613f=>Number(_0x17613f));break;case'EVAL':_0x11165b=_0xa8cdc4[_0x2dfa35]!==''?eval(_0xa8cdc4[_0x2dfa35]):null;break;case _0x324055(0x12c):_0x57241b=_0xa8cdc4[_0x2dfa35]!==''?JSON[_0x324055(0x13c)](_0xa8cdc4[_0x2dfa35]):[],_0x11165b=_0x57241b[_0x324055(0x146)](_0x175f37=>eval(_0x175f37));break;case'JSON':_0x11165b=_0xa8cdc4[_0x2dfa35]!==''?JSON[_0x324055(0x13c)](_0xa8cdc4[_0x2dfa35]):'';break;case _0x324055(0x153):_0x57241b=_0xa8cdc4[_0x2dfa35]!==''?JSON[_0x324055(0x13c)](_0xa8cdc4[_0x2dfa35]):[],_0x11165b=_0x57241b[_0x324055(0x146)](_0x42b6d6=>JSON['parse'](_0x42b6d6));break;case _0x324055(0x17d):_0x11165b=_0xa8cdc4[_0x2dfa35]!==''?new Function(JSON[_0x324055(0x13c)](_0xa8cdc4[_0x2dfa35])):new Function(_0x324055(0x18f));break;case'ARRAYFUNC':_0x57241b=_0xa8cdc4[_0x2dfa35]!==''?JSON[_0x324055(0x13c)](_0xa8cdc4[_0x2dfa35]):[],_0x11165b=_0x57241b[_0x324055(0x146)](_0x5a6966=>new Function(JSON[_0x324055(0x13c)](_0x5a6966)));break;case _0x324055(0x137):_0x11165b=_0xa8cdc4[_0x2dfa35]!==''?String(_0xa8cdc4[_0x2dfa35]):'';break;case _0x324055(0x13e):_0x57241b=_0xa8cdc4[_0x2dfa35]!==''?JSON[_0x324055(0x13c)](_0xa8cdc4[_0x2dfa35]):[],_0x11165b=_0x57241b['map'](_0x36c4ce=>String(_0x36c4ce));break;case'STRUCT':_0x55729b=_0xa8cdc4[_0x2dfa35]!==''?JSON['parse'](_0xa8cdc4[_0x2dfa35]):{},_0x11165b=VisuMZ[_0x324055(0x142)]({},_0x55729b);break;case _0x324055(0x172):_0x57241b=_0xa8cdc4[_0x2dfa35]!==''?JSON[_0x324055(0x13c)](_0xa8cdc4[_0x2dfa35]):[],_0x11165b=_0x57241b[_0x324055(0x146)](_0x3dd999=>VisuMZ[_0x324055(0x142)]({},JSON[_0x324055(0x13c)](_0x3dd999)));break;default:continue;}_0x15c867[_0x105fa8]=_0x11165b;}}return _0x15c867;},(_0x2ed050=>{const _0xe6d166=_0x1b7e4c,_0x3d6cf3=_0x2ed050[_0xe6d166(0x19c)];for(const _0x177760 of dependencies){if(_0xe6d166(0x15c)!==_0xe6d166(0x15c)){const _0x13cd29=_0x474175['getStypeIdWithName'](_0x2818b6);if(_0x13cd29)_0x73da90[_0xe6d166(0x13f)](_0x13cd29);}else{if(!Imported[_0x177760]){if('JkBrC'!==_0xe6d166(0x17b)){alert(_0xe6d166(0x19f)['format'](_0x3d6cf3,_0x177760)),SceneManager[_0xe6d166(0x136)]();break;}else{const _0x23af06=_0x225d80[_0xe6d166(0x15e)](_0x2f7f2d);if(_0x131873['includes'](_0x23af06))return!![];}}}}const _0x8519dd=_0x2ed050[_0xe6d166(0x18a)];if(_0x8519dd[_0xe6d166(0x14d)](/\[Version[ ](.*?)\]/i)){if(_0xe6d166(0x167)==='NThrT'){const _0x35d0a5=Number(RegExp['$1']);_0x35d0a5!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0xe6d166(0x19b)](_0x3d6cf3,_0x35d0a5)),SceneManager[_0xe6d166(0x136)]());}else _0x382420=[this['item']()[_0xe6d166(0x12f)]['elementId']];}if(_0x8519dd[_0xe6d166(0x14d)](/\[Tier[ ](\d+)\]/i)){const _0x1f7349=Number(RegExp['$1']);_0x1f7349<tier?(alert(_0xe6d166(0x185)[_0xe6d166(0x19b)](_0x3d6cf3,_0x1f7349,tier)),SceneManager['exit']()):tier=Math[_0xe6d166(0x1a4)](_0x1f7349,tier);}VisuMZ[_0xe6d166(0x142)](VisuMZ[label]['Settings'],_0x2ed050[_0xe6d166(0x139)]);})(pluginData),VisuMZ['ConsumeDefStates'][_0x1b7e4c(0x195)]={'StackableCharges':/<(?:MAX STACK|MAX STACKABLE|STACK|STACKABLE)[ ](?:CHARGE|CHARGES):[ ](\d+)>/i,'ConAny':/<(\d+)[ ](?:TIME|TIMES|CHARGE|CHARGES)[ ](.*)>/gi,'ConReflect':/<(\d+)[ ](?:TIME|TIMES|CHARGE|CHARGES)[ ](?:REFLECT|REFLECTION|REPEL)[ ](.*)>/i,'ConEvade':/<(\d+)[ ](?:TIME|TIMES|CHARGE|CHARGES)[ ](?:EVADE|EVASION|DODGE)[ ](.*)>/i,'ConNull':/<(\d+)[ ](?:TIME|TIMES|CHARGE|CHARGES)[ ](?:IMMUNE|IMMUNITY|NULLIFY|NULL|VOID)[ ](.*)>/i},DataManager[_0x1b7e4c(0x17f)]=function(_0x260d6a){const _0x49f411=_0x1b7e4c;_0x260d6a=_0x260d6a[_0x49f411(0x13b)]()['trim'](),this[_0x49f411(0x14e)]=this['_stateIDs']||{};if(this[_0x49f411(0x14e)][_0x260d6a])return this['_stateIDs'][_0x260d6a];for(const _0x1d92ef of $dataStates){if(!_0x1d92ef)continue;this[_0x49f411(0x14e)][_0x1d92ef['name'][_0x49f411(0x13b)]()[_0x49f411(0x169)]()]=_0x1d92ef['id'];}return this[_0x49f411(0x14e)][_0x260d6a]||0x0;},DataManager['getElementIdWithName']=function(_0xff9b94){const _0x5643e6=_0x1b7e4c;_0xff9b94=_0xff9b94['toUpperCase']()[_0x5643e6(0x169)](),this['_elementIDs']=this['_elementIDs']||{};if(this['_elementIDs'][_0xff9b94])return this['_elementIDs'][_0xff9b94];let _0x38009e=0x1;for(const _0x31917c of $dataSystem[_0x5643e6(0x17c)]){if(!_0x31917c)continue;let _0x48f32b=_0x31917c['toUpperCase']();_0x48f32b=_0x48f32b['replace'](/\x1I\[(\d+)\]/gi,''),_0x48f32b=_0x48f32b[_0x5643e6(0x144)](/\\I\[(\d+)\]/gi,''),this[_0x5643e6(0x184)][_0x48f32b]=_0x38009e,_0x38009e++;}return this[_0x5643e6(0x184)][_0xff9b94]||0x0;},DataManager[_0x1b7e4c(0x193)]=function(_0xa81ed4){const _0x5b5f24=_0x1b7e4c;_0xa81ed4=_0xa81ed4[_0x5b5f24(0x13b)]()[_0x5b5f24(0x169)](),this[_0x5b5f24(0x135)]=this[_0x5b5f24(0x135)]||{};if(this['_stypeIDs'][_0xa81ed4])return this['_stypeIDs'][_0xa81ed4];for(let _0xd5b5ad=0x1;_0xd5b5ad<0x64;_0xd5b5ad++){if(_0x5b5f24(0x157)===_0x5b5f24(0x157)){if(!$dataSystem[_0x5b5f24(0x143)][_0xd5b5ad])continue;let _0x18a9a3=$dataSystem[_0x5b5f24(0x143)][_0xd5b5ad]['toUpperCase']()[_0x5b5f24(0x169)]();_0x18a9a3=_0x18a9a3[_0x5b5f24(0x144)](/\x1I\[(\d+)\]/gi,''),_0x18a9a3=_0x18a9a3[_0x5b5f24(0x144)](/\\I\[(\d+)\]/gi,''),this['_stypeIDs'][_0x18a9a3]=_0xd5b5ad;}else _0x397eae[_0x5b5f24(0x15d)](_0x2808b9),this[_0x5b5f24(0x17e)]=!![],_0x421a85=0x0;}return this[_0x5b5f24(0x135)][_0xa81ed4]||0x0;},DataManager[_0x1b7e4c(0x13a)]=function(_0x55386e){const _0x32b3e2=_0x1b7e4c;if(!_0x55386e)return![];const _0x5e6a35=VisuMZ[_0x32b3e2(0x141)][_0x32b3e2(0x195)],_0xf1c2f8=_0x55386e[_0x32b3e2(0x161)]||'',_0x1aa4ce=_0xf1c2f8['match'](_0x5e6a35[_0x32b3e2(0x13d)]);if(_0x1aa4ce&&_0x1aa4ce[_0x32b3e2(0x178)]>0x1)return $gameTemp['isPlaytest']()&&console[_0x32b3e2(0x187)](_0x32b3e2(0x147)[_0x32b3e2(0x19b)](_0x55386e['name'])),![];return!![];},SceneManager['isSceneBattle']=function(){const _0x56dd95=_0x1b7e4c;return this[_0x56dd95(0x16b)]&&this['_scene'][_0x56dd95(0x16e)]===Scene_Battle;},VisuMZ[_0x1b7e4c(0x141)][_0x1b7e4c(0x140)]=BattleManager[_0x1b7e4c(0x131)],BattleManager[_0x1b7e4c(0x131)]=function(_0x4f81d0,_0x46f11c){const _0x5602ea=_0x1b7e4c;if(this[_0x5602ea(0x18c)])this[_0x5602ea(0x18c)][_0x5602ea(0x158)](!![]);VisuMZ['ConsumeDefStates'][_0x5602ea(0x140)][_0x5602ea(0x180)](this,_0x4f81d0,_0x46f11c);if(this['_action'])this[_0x5602ea(0x18c)]['setConsumeDefStateInvoking'](![]);},Game_Action[_0x1b7e4c(0x160)][_0x1b7e4c(0x158)]=function(_0x267393){this['_consumeDefStateInvoking']=_0x267393;},VisuMZ[_0x1b7e4c(0x141)][_0x1b7e4c(0x18e)]=Game_Action[_0x1b7e4c(0x160)][_0x1b7e4c(0x14f)],Game_Action[_0x1b7e4c(0x160)][_0x1b7e4c(0x14f)]=function(_0x540d08){const _0xffca84=_0x1b7e4c;let _0x2a18e0=VisuMZ[_0xffca84(0x141)]['Game_Action_itemHit'][_0xffca84(0x180)](this,_0x540d08);if(_0x540d08[_0xffca84(0x156)]||_0x540d08[_0xffca84(0x16a)])return _0x2a18e0;if(!this[_0xffca84(0x176)])return _0x2a18e0;if(_0x2a18e0>0x0){const _0x52acc1=this[_0xffca84(0x1a3)](_0x540d08,_0xffca84(0x19d));_0x52acc1>0x0&&(_0x540d08['consumeDefState'](_0x52acc1),_0x2a18e0=0x0);}return _0x2a18e0;},VisuMZ['ConsumeDefStates'][_0x1b7e4c(0x159)]=Game_Action[_0x1b7e4c(0x160)]['itemMrf'],Game_Action[_0x1b7e4c(0x160)][_0x1b7e4c(0x14b)]=function(_0x2b9ee0){const _0x4f2629=_0x1b7e4c;let _0x5e151e=VisuMZ[_0x4f2629(0x141)][_0x4f2629(0x159)]['call'](this,_0x2b9ee0);if(_0x2b9ee0[_0x4f2629(0x156)]||_0x2b9ee0[_0x4f2629(0x16a)])return _0x5e151e;if(!this['_consumeDefStateInvoking'])return _0x5e151e;if(_0x5e151e<0x1){if(_0x4f2629(0x164)==='lblzm'){const _0x24a47d=this[_0x4f2629(0x1a3)](_0x2b9ee0,_0x4f2629(0x199));_0x24a47d>0x0&&(_0x2b9ee0[_0x4f2629(0x15d)](_0x24a47d),_0x5e151e=0x1);}else{let _0x44dd9d=_0x411d19[_0x4f2629(0x141)][_0x4f2629(0x18e)][_0x4f2629(0x180)](this,_0x525c8c);if(_0x3adcd0['_tempActor']||_0x5b223e[_0x4f2629(0x16a)])return _0x44dd9d;if(!this[_0x4f2629(0x176)])return _0x44dd9d;if(_0x44dd9d>0x0){const _0xd9a2a7=this['getKeyByConsumeDefState'](_0x270176,_0x4f2629(0x19d));_0xd9a2a7>0x0&&(_0xd6eeb9[_0x4f2629(0x15d)](_0xd9a2a7),_0x44dd9d=0x0);}return _0x44dd9d;}}return _0x5e151e;},VisuMZ['ConsumeDefStates'][_0x1b7e4c(0x197)]=Game_Action[_0x1b7e4c(0x160)][_0x1b7e4c(0x12e)],Game_Action['prototype'][_0x1b7e4c(0x12e)]=function(_0x2ac4c0){const _0x38b1f8=_0x1b7e4c;this[_0x38b1f8(0x17e)]=undefined,VisuMZ[_0x38b1f8(0x141)]['Game_Action_apply'][_0x38b1f8(0x180)](this,_0x2ac4c0);},VisuMZ['ConsumeDefStates']['Game_Action_calcElementRate']=Game_Action[_0x1b7e4c(0x160)]['calcElementRate'],Game_Action[_0x1b7e4c(0x160)][_0x1b7e4c(0x130)]=function(_0x231b58){const _0x134726=_0x1b7e4c;if(this[_0x134726(0x17e)]===!![])return 0x0;let _0x21b911=VisuMZ[_0x134726(0x141)][_0x134726(0x181)]['call'](this,_0x231b58);if(_0x231b58[_0x134726(0x156)]||_0x231b58[_0x134726(0x16a)])return _0x21b911;if(!this[_0x134726(0x176)])return _0x21b911;if(_0x21b911>0x0){const _0x476a1f=this[_0x134726(0x1a3)](_0x231b58,'ConNull');if(_0x476a1f>0x0){if(_0x134726(0x150)!==_0x134726(0x163))_0x231b58[_0x134726(0x15d)](_0x476a1f),this['_cachedConsumeDefStateNull']=!![],_0x21b911=0x0;else return!![];}}return _0x21b911;},Game_Action[_0x1b7e4c(0x160)][_0x1b7e4c(0x1a3)]=function(_0x755bc5,_0x7ab10){const _0x110223=_0x1b7e4c;if(!SceneManager['isSceneBattle']())return 0x0;if(!_0x755bc5)return 0x0;if(this['isGuard']())return 0x0;const _0x3eedd8=VisuMZ[_0x110223(0x141)][_0x110223(0x195)],_0x4196b6=_0x755bc5['consumableDefensiveStates']();for(const _0x3975e8 of _0x4196b6){if(_0x110223(0x148)===_0x110223(0x148)){if(!_0x3975e8)continue;const _0x5986ac=_0x3975e8['id'];if(_0x3975e8['note']['match'](_0x3eedd8[_0x7ab10])){const _0x28590d=String(RegExp['$2']);if(this[_0x110223(0x183)](_0x28590d))return _0x5986ac;}}else{let _0x5ce741=_0x52b6fe(_0x5df39f['$1'])||0x1;if(_0x3fb791['note']['match'](_0x40016f[_0x110223(0x188)])){const _0x1b32a7=_0x562f9d['max'](_0x5ce741,_0x4a2ef4(_0x144c54['$1']));_0x5ce741+=_0x34fdf3(this[_0x110223(0x1a0)](_0x111e77))||0x0,_0x5ce741=_0x512554[_0x110223(0x133)](_0x5ce741,_0x1b32a7);}this[_0x110223(0x196)](_0x405bbd,_0x5ce741);}}return 0x0;},Game_Action[_0x1b7e4c(0x160)][_0x1b7e4c(0x183)]=function(_0x1c87a9){const _0x581054=_0x1b7e4c;if(this[_0x581054(0x14a)]()[_0x581054(0x12f)]['type']>0x0&&_0x1c87a9[_0x581054(0x14d)](/(?:ELE|ELEMENT|ELEMENTS):[ ](.*)/i)){let _0x3928de=[];if(Imported[_0x581054(0x1a5)]){if(_0x581054(0x15f)!=='qrWIf'){const _0x52a1e5=_0x40320f(_0x1b5cef['$1']);_0x52a1e5<_0xe0cc05?(_0x386928(_0x581054(0x185)[_0x581054(0x19b)](_0x3c2dd3,_0x52a1e5,_0x1903e1)),_0x394a0f[_0x581054(0x136)]()):_0x28856a=_0x3fb1ec[_0x581054(0x1a4)](_0x52a1e5,_0x2ddf9c);}else _0x3928de=this[_0x581054(0x17c)]();}else{if(this[_0x581054(0x14a)]()[_0x581054(0x12f)][_0x581054(0x194)]<0x0){const _0x303db5=this['subject']();_0x3928de=_0x303db5['attackElements']();}else _0x3928de=[this[_0x581054(0x14a)]()['damage'][_0x581054(0x194)]];}const _0x19166e=RegExp['$1']['split'](',')[_0x581054(0x146)](_0x1e9f6c=>_0x1e9f6c[_0x581054(0x169)]());for(const _0x4ada63 of _0x19166e){const _0x1b8132=/^\d+$/[_0x581054(0x15b)](_0x4ada63);if(_0x1b8132){if(_0x3928de[_0x581054(0x16c)](Number(_0x4ada63)))return!![];}else{const _0xbe16f3=DataManager[_0x581054(0x15e)](_0x4ada63);if(_0x3928de[_0x581054(0x16c)](_0xbe16f3))return!![];}}return![];}if(this[_0x581054(0x134)]()&&_0x1c87a9[_0x581054(0x14d)](/(?:SKILL TYPE|SKILL TYPES|STYPE|STYPES):[ ](.*)/i)){const _0x17d9cb=RegExp['$1'][_0x581054(0x174)](',')['map'](_0x155821=>_0x155821[_0x581054(0x169)]()),_0x34b7d3=[];for(const _0x41e8d7 of _0x17d9cb){const _0x587b3a=/^\d+$/[_0x581054(0x15b)](_0x41e8d7);if(_0x587b3a)_0x34b7d3[_0x581054(0x13f)](Number(_0x41e8d7));else{const _0x3484ed=DataManager[_0x581054(0x193)](_0x41e8d7);if(_0x3484ed)_0x34b7d3['push'](_0x3484ed);}}let _0x274e5a=[this[_0x581054(0x14a)]()[_0x581054(0x177)]];Imported[_0x581054(0x155)]&&(_0x274e5a=DataManager[_0x581054(0x18b)](this[_0x581054(0x14a)]()));if(_0x34b7d3[_0x581054(0x154)](_0xa3d724=>_0x274e5a[_0x581054(0x16c)](_0xa3d724))[_0x581054(0x178)]>0x0){if('USOqh'!=='SokUT')return!![];else _0xd5c1c7[_0x581054(0x15d)](_0x2c614c),_0x3a0d14=0x0;}return![];}if(this[_0x581054(0x134)]()){if(this[_0x581054(0x14c)]()&&_0x1c87a9[_0x581054(0x14d)](/(?:CERTAIN|CERTAIN HIT|ALL) (?:SKILL|SKILLS|TYPE|TYPES|ACTION|ACTIONS)/i))return _0x581054(0x12d)!==_0x581054(0x12d)?!![]:!![];else{if(this[_0x581054(0x19e)]()&&_0x1c87a9[_0x581054(0x14d)](/(?:PHYSICAL|PHYSICAL HIT|ALL) (?:SKILL|SKILLS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];else{if(this['isMagical']()&&_0x1c87a9['match'](/(?:MAGICAL|MAGICAL HIT|ALL) (?:SKILL|SKILLS|TYPE|TYPES|ACTION|ACTIONS)/i))return _0x581054(0x198)!==_0x581054(0x198)?_0x4b794f:!![];}}}else{if(this[_0x581054(0x165)]()){if('Kymfo'===_0x581054(0x18d)){if(this['isCertainHit']()&&_0x1c87a9[_0x581054(0x14d)](/(?:CERTAIN|CERTAIN HIT|ALL) (?:ITEM|ITEMS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];else{if(this[_0x581054(0x19e)]()&&_0x1c87a9[_0x581054(0x14d)](/(?:PHYSICAL|PHYSICAL HIT|ALL) (?:ITEM|ITEMS|TYPE|TYPES|ACTION|ACTIONS)/i))return!![];else{if(this[_0x581054(0x175)]()&&_0x1c87a9[_0x581054(0x14d)](/(?:MAGICAL|MAGICAL HIT|ALL) (?:ITEM|ITEMS|TYPE|TYPES|ACTION|ACTIONS)/i)){if(_0x581054(0x149)!==_0x581054(0x149)){const _0x2ad662=this[_0x581054(0x1a3)](_0x122e64,'ConReflect');_0x2ad662>0x0&&(_0x1620ad[_0x581054(0x15d)](_0x2ad662),_0x55fe3a=0x1);}else return!![];}}}}else{this[_0x581054(0x196)](_0x10365c,_0x4eca6a);return;}}}return![];},Game_BattlerBase[_0x1b7e4c(0x160)][_0x1b7e4c(0x171)]=function(){const _0x5c30c1=_0x1b7e4c;let _0x12e6ac=this['states']()[_0x5c30c1(0x154)](_0x15ccbb=>_0x15ccbb&&this[_0x5c30c1(0x182)](_0x15ccbb['id']));return _0x12e6ac=_0x12e6ac[_0x5c30c1(0x154)](_0x2aefb1=>DataManager['isLegalConsumableDefensiveState'](_0x2aefb1)),_0x12e6ac;},VisuMZ[_0x1b7e4c(0x141)]['Game_Battler_addState']=Game_Battler[_0x1b7e4c(0x160)][_0x1b7e4c(0x162)],Game_Battler[_0x1b7e4c(0x160)][_0x1b7e4c(0x162)]=function(_0x4c2571){const _0xa4e167=_0x1b7e4c;VisuMZ[_0xa4e167(0x141)]['Game_Battler_addState'][_0xa4e167(0x180)](this,_0x4c2571),SceneManager[_0xa4e167(0x19a)]()&&this[_0xa4e167(0x182)](_0x4c2571)&&(_0xa4e167(0x1a2)!==_0xa4e167(0x173)?this[_0xa4e167(0x168)](_0x4c2571):(_0x23f809(_0xa4e167(0x1a1)[_0xa4e167(0x19b)](_0x465708,_0x156b3d)),_0x12d4e9[_0xa4e167(0x136)]()));},Game_Battler[_0x1b7e4c(0x160)][_0x1b7e4c(0x15d)]=function(_0x159a6a){const _0x5dfda2=_0x1b7e4c;if(!this[_0x5dfda2(0x182)](_0x159a6a))return;if(Imported[_0x5dfda2(0x155)]){let _0x3d6803=Number(this[_0x5dfda2(0x1a0)](_0x159a6a))||0x0;_0x3d6803-=0x1;if(_0x3d6803>0x0){this[_0x5dfda2(0x196)](_0x159a6a,_0x3d6803);return;}}this[_0x5dfda2(0x189)](_0x159a6a);},Game_Battler[_0x1b7e4c(0x160)][_0x1b7e4c(0x168)]=function(_0x42869e){const _0x38b0a1=_0x1b7e4c;if(!this[_0x38b0a1(0x182)](_0x42869e))return;if(!Imported[_0x38b0a1(0x155)])return;const _0x1a9ac8=$dataStates[_0x42869e];if(!_0x1a9ac8)return;if(Imported[_0x38b0a1(0x190)]&&DataManager[_0x38b0a1(0x152)]){if(DataManager[_0x38b0a1(0x152)](_0x1a9ac8))return;}const _0x478716=VisuMZ[_0x38b0a1(0x141)][_0x38b0a1(0x195)];if(_0x1a9ac8[_0x38b0a1(0x161)]['match'](_0x478716['ConAny'])&&DataManager[_0x38b0a1(0x13a)](_0x1a9ac8)){let _0x3a5274=Number(RegExp['$1'])||0x1;if(_0x1a9ac8[_0x38b0a1(0x161)][_0x38b0a1(0x14d)](_0x478716[_0x38b0a1(0x188)])){if(_0x38b0a1(0x191)!=='MnIml'){const _0x43a1c7=Math[_0x38b0a1(0x1a4)](_0x3a5274,Number(RegExp['$1']));_0x3a5274+=Number(this[_0x38b0a1(0x1a0)](_0x42869e))||0x0,_0x3a5274=Math[_0x38b0a1(0x133)](_0x3a5274,_0x43a1c7);}else{if(this[_0x38b0a1(0x18c)])this[_0x38b0a1(0x18c)][_0x38b0a1(0x158)](!![]);_0x679398['ConsumeDefStates'][_0x38b0a1(0x140)][_0x38b0a1(0x180)](this,_0x4b21ef,_0x3e20ca);if(this[_0x38b0a1(0x18c)])this[_0x38b0a1(0x18c)]['setConsumeDefStateInvoking'](![]);}}this[_0x38b0a1(0x196)](_0x42869e,_0x3a5274);}};function _0x361e(){const _0x436f12=['note','addState','yoVam','lblzm','isItem','3823104xSKiCn','NThrT','initConsumeDefState','trim','_tempBattler','_scene','includes','9EUiFDg','constructor','9132584dxjnpM','75731RRQSZJ','consumableDefensiveStates','ARRAYSTRUCT','OmlTy','split','isMagical','_consumeDefStateInvoking','stypeId','length','status','245ZHfnlq','zvBBY','elements','FUNC','_cachedConsumeDefStateNull','getStateIdWithName','call','Game_Action_calcElementRate','isStateAffected','matchConsumeDefStateReq','_elementIDs','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Settings','log','StackableCharges','removeState','description','getSkillTypes','_action','Kymfo','Game_Action_itemHit','return\x200','VisuMZ_3_AntiDmgBarriers','bzIYI','NUM','getStypeIdWithName','elementId','RegExp','setStateDisplay','Game_Action_apply','dtYpD','ConReflect','isSceneBattle','format','name','ConEvade','isPhysical','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','getStateDisplay','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','xFEfY','getKeyByConsumeDefState','max','VisuMZ_1_ElementStatusCore','ARRAYEVAL','feCHc','apply','damage','calcElementRate','invokeAction','4vhnlLf','min','isSkill','_stypeIDs','exit','STR','2629476VIfwll','parameters','isLegalConsumableDefensiveState','toUpperCase','parse','ConAny','ARRAYSTR','push','BattleManager_invokeAction','ConsumeDefStates','ConvertParams','skillTypes','replace','10058210kBNxmL','map','%1\x20cannot\x20be\x20used\x20as\x20a\x20Consumable\x20Defensive\x20State.\x0aOnly\x20one\x20Consumable\x20Defensive\x20State\x20notetag\x20effect\x20can\x20be\x20used\x20per\x20state.','fZzQR','vBzfi','item','itemMrf','isCertainHit','match','_stateIDs','itemHit','aYrYK','544250GofaQh','hasAntiDmgBarriersNotetag','ARRAYJSON','filter','VisuMZ_1_SkillsStatesCore','_tempActor','UTAKf','setConsumeDefStateInvoking','Game_Action_itemMrf','160764JSfvpH','test','dxnOe','consumeDefState','getElementIdWithName','qrWIf','prototype'];_0x361e=function(){return _0x436f12;};return _0x361e();}