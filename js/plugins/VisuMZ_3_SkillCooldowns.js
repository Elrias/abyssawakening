//=============================================================================
// VisuStella MZ - Skill Cooldowns
// VisuMZ_3_SkillCooldowns.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_SkillCooldowns = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillCooldowns = VisuMZ.SkillCooldowns || {};
VisuMZ.SkillCooldowns.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [SkillCooldowns]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Cooldowns_VisuStella_MZ
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * Skill Cooldowns are a mechanic added by the game to prevent repeated skill
 * usage (or as some gamers call it, skill spamming). Upon usage in battle, a
 * skill with a cooldown will become unselectable for a duration of time set by
 * either notetags and/or Plugin Commands. This duration would have to pass in
 * order for the skill to become usable once again.
 *
 * Skill Warmups are another addition by this plugin. Skills with warmups will
 * start the battle unusable until a certain duration has passed. This can help
 * prevent strong skills from being used from the very start of battle.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Add cooldowns and warmups to skills.
 * * Control the way they're displayed in game through the Plugin Parameters.
 * * Create trait object effects that alter the finalized values of cooldowns
 *   and warmups applied to skills.
 * * Create action effects that alter the existing durations of cooldowns and
 *   warmups applied to skills.
 * * Create cooldowns for skills that are linked to other skills, skill types,
 *   and/or affect all skills globally.
 * * Plugin Commands that let you alter cooldowns and warmups as you like.
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
 * - VisuMZ_1_SkillsStatesCore
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
 * New Mechanics: Cooldowns and Warmups
 * ============================================================================
 *
 * This section will explain the key points behind cooldowns and warmups.
 *
 * ---
 *
 * Cooldowns:
 *
 * - At the start and end of battle, any and all cooldowns are cleared.
 * - Cooldowns are applied upon usage only during battle.
 * - Upon usage, skills can affect the cooldowns of an entire skill type or all
 *   of a unit's skills at once.
 *
 * ---
 *
 * Warmups:
 *
 * - Upon the start of battle, Warmups will be applied to affected skills.
 * - Upon the end of battle, any and all warmups are cleared.
 * - If the unit in battle has an advantageous start (ie. preemptive strike),
 *   then the warmup duration can be reduced. This value can be changed in the
 *   plugin parameters.
 *
 * ---
 * 
 * Both Cooldowns and Warmups:
 *
 * - While a skill is on CD/WU, it cannot be used.
 * - CD/WU are updated once per turn for each unit.
 * - CD/WU cannot be applied to Attack and Guard skills.
 * - CD/WU cannot be applied to skills with the <Bypass CD/WU> notetag.
 * - CD/WU can be affected by notetag traits found in various database objects.
 * - CD/WU can be altered by skills and items with notetag effects.
 * - CD/WU have a maximum duration that can be set in the Plugin Parameters.
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
 * === Skill-Only Notetags ===
 *
 * The following notetags are used for skills and are related to setting the
 * primary uses of Cooldowns and Warmups.
 *
 * ---
 *
 * <Bypass Cooldowns>
 * <Bypass Warmups>
 *
 * - Used for: Skill Notetags
 * - Lets the skill bypass cooldowns and/or warmups.
 *
 * ---
 *
 * <Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Skill id Cooldown: x>
 * <Skill name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause listed skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown: x>
 * <Stype name Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills with the skill type to gain a cooldown
 *   upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown: x>
 *
 * - Used for: Skill Notetags
 * - The skill will cause all skills to gain a cooldown upon usage.
 * - Replace 'x' with the number of turns to set the cooldown to.
 *
 * ---
 *
 * <Warmup: x>
 *
 * - Used for: Skill Notetags
 * - The skill will gain a warmup upon the start of battle.
 * - Replace 'x' with the number of turns to set the warmup to.
 *
 * ---
 *
 * === JavaScript Notetags: Skill-Only ===
 *
 * The following are notetags made for users with JavaScript knowledge to give
 * skills dynamic cooldown or warmup durations.
 *
 * ---
 *
 * <JS Cooldown>
 *  code
 *  code
 *  turns = code
 * </JS Cooldown>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base cooldown
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 *
 * ---
 * 
 * <JS On Cooldown Update>
 *  code
 *  code
 *  code
 * </JS On Cooldown Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized cooldown value.
 * 
 * ---
 * 
 * <JS On Cooldown Ready>
 *  code
 *  code
 *  code
 * </JS On Cooldown Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's cooldown hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * <JS Warmup>
 *  code
 *  code
 *  turns = code
 * </JS Warmup>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code used to determine the base warmup
 *   for this skill.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 *
 * ---
 * 
 * <JS On Warmup Update>
 *  code
 *  code
 *  code
 * </JS On Warmup Update>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup updates.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - The 'turns' variable refers to the finalized warmup value.
 * 
 * ---
 * 
 * <JS On Warmup Ready>
 *  code
 *  code
 *  code
 * </JS On Warmup Ready>
 * 
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform various actions whenever
 *   the skill's warmup hits 0 and becomes ready.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * 
 * ---
 *
 * === Cooldown/Warmup Notetag Traits ===
 *
 * These Notetag Traits help modify the finalized value of a cooldown/warmup.
 * The final cooldown/warmup duration is calculated by the following formula:
 * 
 * (base + plus) * rate + flat
 *
 * The base value is the amount calculated through the <Cooldown: x> and
 * <Warmup: x> notetags found in the section above.
 *
 * ---
 *
 * <Skill id Cooldown Plus: +x>
 * <Skill id Cooldown Plus: -x>
 *
 * <Skill name Cooldown Plus: +x>
 * <Skill name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Rate: x%>
 * <Skill id Cooldown Rate: x.x>
 *
 * <Skill name Cooldown Rate: x%>
 * <Skill name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Cooldown Flat: +x>
 * <Skill id Cooldown Flat: -x>
 *
 * <Skill name Cooldown Flat: +x>
 * <Skill name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Cooldown Plus: +x>
 * <Stype id Cooldown Plus: -x>
 *
 * <Stype name Cooldown Plus: +x>
 * <Stype name Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Rate: x%>
 * <Stype id Cooldown Rate: x.x>
 *
 * <Stype name Cooldown Rate: x%>
 * <Stype name Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Cooldown Flat: +x>
 * <Stype id Cooldown Flat: -x>
 *
 * <Stype name Cooldown Flat: +x>
 * <Stype name Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Cooldown Plus: +x>
 * <Global Cooldown Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Rate: x%>
 * <Global Cooldown Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Cooldown Flat: +x>
 * <Global Cooldown Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific cooldown changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Skill id Warmup Plus: +x>
 * <Skill id Warmup Plus: -x>
 *
 * <Skill name Warmup Plus: +x>
 * <Skill name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Rate: x%>
 * <Skill id Warmup Rate: x.x>
 *
 * <Skill name Warmup Rate: x%>
 * <Skill name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Skill id Warmup Flat: +x>
 * <Skill id Warmup Flat: -x>
 *
 * <Skill name Warmup Flat: +x>
 * <Skill name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards this specific skill.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <Stype id Warmup Plus: +x>
 * <Stype id Warmup Plus: -x>
 *
 * <Stype name Warmup Plus: +x>
 * <Stype name Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Rate: x%>
 * <Stype id Warmup Rate: x.x>
 *
 * <Stype name Warmup Rate: x%>
 * <Stype name Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Stype id Warmup Flat: +x>
 * <Stype id Warmup Flat: -x>
 *
 * <Stype name Warmup Flat: +x>
 * <Stype name Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards skills with this skill type.
 * - Replace 'x' with the numeric value to change duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <Global Warmup Plus: +x>
 * <Global Warmup Plus: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * <Global Warmup Rate: x%>
 * <Global Warmup Rate: x.x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the percentile value to change duration by.
 * - Replace 'x.x' with the float value to change duration by.
 *
 * ---
 *
 * <Global Warmup Flat: +x>
 * <Global Warmup Flat: -x>
 *
 * - Used for: Actor, Class, Item, Weapon, Armor, Enemy, State Notetags
 * - Affects specific warmup changes towards all skills.
 * - Replace 'x' with the numeric value to change duration by.
 *
 * ---
 *
 * === Cooldown/Warmup Notetag Actions ===
 *
 * The following notetags are actively altering effects that target cooldowns
 * and/or warmups. Cooldown effects may be applied at any moment through these
 * while warmup effects will only affect skills on warmup currently.
 *
 * ---
 *
 * <Clear User Cooldowns>
 * <Clear Target Cooldowns>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all cooldowns for the user/target.
 *
 * ---
 *
 * <Clear User Warmups>
 * <Clear Target Warmups>
 *
 * - Used for: Skill, Item Notetags
 * - Clears all warmups for the user/target.
 *
 * ---
 *
 * <User Skill id Cooldown: +x>
 * <User Skill id Cooldown: -x>
 *
 * <User Skill name Cooldown: +x>
 * <User Skill name Cooldown: -x>
 *
 * <Target Skill id Cooldown: +x>
 * <Target Skill id Cooldown: -x>
 *
 * <Target Skill name Cooldown: +x>
 * <Target Skill name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 *
 * ---
 *
 * <User Stype id Cooldown: +x>
 * <User Stype id Cooldown: -x>
 *
 * <User Stype name Cooldown: +x>
 * <User Stype name Cooldown: -x>
 *
 * <Target Stype id Cooldown: +x>
 * <Target Stype id Cooldown: -x>
 *
 * <Target Stype name Cooldown: +x>
 * <Target Stype name Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 *
 * ---
 *
 * <User Global Cooldown: +x>
 * <User Global Cooldown: -x>
 *
 * <Target Global Cooldown: +x>
 * <Target Global Cooldown: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's cooldown duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 *
 * ---
 *
 * <User Skill id Warmup: +x>
 * <User Skill id Warmup: -x>
 *
 * <User Skill name Warmup: +x>
 * <User Skill name Warmup: -x>
 *
 * <Target Skill id Warmup: +x>
 * <Target Skill id Warmup: -x>
 *
 * <Target Skill name Warmup: +x>
 * <Target Skill name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for this specific skill.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill found in Database => Skills.
 * - Replace 'name' with the name of the skill found in Database => Skills.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Stype id Warmup: +x>
 * <User Stype id Warmup: -x>
 *
 * <User Stype name Warmup: +x>
 * <User Stype name Warmup: -x>
 *
 * <Target Stype id Warmup: +x>
 * <Target Stype id Warmup: -x>
 *
 * <Target Stype name Warmup: +x>
 * <Target Stype name Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills with this type.
 * - Replace 'x' with the amount to change the duration by.
 * - Replace 'id' with the ID of the skill type found in Database => Types.
 * - Replace 'name' with the name of the skill type found in Database => Types.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
 *
 * ---
 *
 * <User Global Warmup: +x>
 * <User Global Warmup: -x>
 *
 * <Target Global Warmup: +x>
 * <Target Global Warmup: -x>
 *
 * - Used for: Skill, Item Notetags
 * - Alters the user/target's warmup duration for all skills.
 * - Replace 'x' with the amount to change the duration by.
 * - NOTE: Warmup changes only apply to skills that are still in warmup.
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
 * Actor: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Actor: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Actor ID(s):
 *   - Select which Actor Target ID(s) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 * 
 * === Enemy Plugin Commands ===
 * 
 * ---
 *
 * Enemy: Skill Cooldown
 * - Change cooldowns for a specific skill(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill ID(s):
 *   - Select which Skill ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: SType Cooldown
 * - Change cooldowns for all skills of a skill type(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Skill Type ID(s):
 *   - Select which Skill Type ID(s) to affect.
 *
 *   Step 3: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 4: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * Enemy: Global Cooldown
 * - Change cooldowns for all skills for target(s).
 *
 *   Step 1: Enemy Index(es):
 *   - Select which Enemy Index(es) to affect.
 *
 *   Step 2: Operation:
 *   - Set the operation used. =, +, -, *, /, %
 *
 *   Step 3: Value
 *   - Select the modifying value.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cooldown Settings
 * ============================================================================
 *
 * These are the general settings pertaining to cooldowns in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Cooldowns.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Cooldowns.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Cooldowns.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Cooldowns?:
 *   - Display Skill Cooldowns?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Cooldowns.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Max Cooldown:
 *   - Maximum turns that cooldowns can be.
 * 
 *   JS: On Cooldown Update:
 *   - Code ran when a skill's cooldown updates.
 * 
 *   JS: On Cooldown Ready:
 *   - Code ran when a skill's cooldown reaches 0.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Warmup Settings
 * ============================================================================
 *
 * These are the general settings pertaining to warmups in-game.
 *
 * ---
 *
 * Settings
 * 
 *   Icon:
 *   - Icon used for Skill Warmups.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display Skill Warmups.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display Skill Warmups.
 *
 * ---
 *
 * Window Display
 * 
 *   Show Warmups?:
 *   - Display Skill Warmups?
 * 
 *   Text Format:
 *   - Text format for displaying Skill Warmups.
 *   - %1 - Turns, %2 - Icon
 *
 * ---
 *
 * Mechanics
 * 
 *   Preemptive Bonus:
 *   - How many turns should be dropped off Warmups on a Preemptive attack?
 * 
 *   Max Warmup:
 *   - Maximum turns that warmups can be.
 * 
 *   JS: On Warmup Update:
 *   - Code ran when a skill's warmup updates.
 * 
 *   JS: On Warmup Ready:
 *   - Code ran when a skill's warmup reaches 0.
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
 * Version 1.04: February 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * ** Added compatibility for Chain Battles. Cooldowns will be carried across
 *    chained battles.
 * 
 * Version 1.03: June 4, 2021
 * * Bug Fixes!
 * ** <JS Cooldowns> should now be working properly.
 * 
 * Version 1.02: November 8, 2020
 * * Feature Update!
 * ** Cooldown updating has been changed from the start of an action to the
 *    start of a new turn processing for battlers to ensure accuracy.
 *    Update by Arisu.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** Global and SType Cooldown modifiers should not cause crashes with
 *    specific numbers. Fix made by Yanfly.
 *
 * Version 1.00: September 9, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorSkillCooldown
 * @text Actor: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorStypeCooldown
 * @text Actor: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorGlobalCooldown
 * @text Actor: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemySkillCooldown
 * @text Enemy: Skill Cooldown
 * @desc Change cooldowns for a specific skill(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill ID(s)
 * @type skill[]
 * @desc Select which Skill ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyStypeCooldown
 * @text Enemy: SType Cooldown
 * @desc Change cooldowns for all skills of a skill type(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:arraynum
 * @text Step 2: Skill Type ID(s)
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which Skill Type ID(s) to affect.
 * @default ["1"]
 *
 * @arg Step3:str
 * @text Step 3: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step4:eval
 * @text Step 4: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command EnemyGlobalCooldown
 * @text Enemy: Global Cooldown
 * @desc Change cooldowns for all skills for target(s).
 *
 * @arg Step1:arraynum
 * @text Step 1: Enemy Index(es)
 * @type actor[]
 * @desc Select which Enemy Index(es) to affect.
 * @default ["1"]
 *
 * @arg Step2:str
 * @text Step 2: Operation
 * @type select
 * @option = Set
 * @value =
 * @option + Add
 * @value +
 * @option - Subtract
 * @value -
 * @option * Multiply
 * @value *
 * @option / Divide
 * @value /
 * @option % Modulus
 * @value %
 * @desc Set the operation used.
 * @default =
 *
 * @arg Step3:eval
 * @text Step 3: Value
 * @desc Select the modifying value.
 * You may use JavaScript code.
 * @default 0
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
 * @param SkillCooldowns
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Cooldown:struct
 * @text Skill Cooldowns
 * @type struct<Cooldown>
 * @desc Adjust cooldown settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Ready in %1T%2","Mechanics":"","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Warmup:struct
 * @text Skill Warmups
 * @type struct<Warmup>
 * @desc Adjust warmup settings here.
 * @default {"Settings":"","Icon:num":"0","FontColor:str":"5","FontSize:num":"22","Windows":"","Show:eval":"true","TextFmt:str":"Prepared in %1T%2","Mechanics":"","Preemptive:num":"10","MaxTurns:num":"50","OnUpdateJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\"","OnReadyJS:func":"\"// Declare Constants\\nconst id = arguments[0];\\nconst skill = $dataSkills[id];\\nconst user = this;\\n\\n// Perform Actions\\n\""}
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
 * Cooldown Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cooldown:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Cooldowns.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Cooldowns.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Cooldowns.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Cooldowns?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Cooldowns?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Cooldowns.
 * %1 - Turns, %2 - Icon
 * @default Ready in %1T%2
 *
 * @param Mechanics
 *
 * @param MaxTurns:num
 * @text Max Cooldown
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that cooldowns can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Cooldown Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Cooldown Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's cooldown reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Warmup Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Warmup:
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for Skill Warmups.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display Skill Warmups.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 5
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display Skill Warmups.
 * @default 22
 *
 * @param Windows
 * @text Window Display
 *
 * @param Show:eval
 * @text Show Warmups?
 * @parent Windows
 * @type boolean
 * @on YES
 * @off NO
 * @desc Display Skill Warmups?
 * @default true
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent  Windows
 * @desc Text format for displaying Skill Warmups.
 * %1 - Turns, %2 - Icon
 * @default Prepared in %1T%2
 *
 * @param Mechanics
 *
 * @param Preemptive:num
 * @text Preemptive Bonus
 * @parent Mechanics
 * @type number
 * @min 0
 * @desc How many turns should be dropped off Warmups on a Preemptive attack?
 * @default 10
 *
 * @param MaxTurns:num
 * @text Max Warmup
 * @parent Mechanics
 * @type number
 * @min 1
 * @desc Maximum turns that warmups can be.
 * @default 50
 *
 * @param OnUpdateJS:func
 * @text JS: On Warmup Update
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup updates.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 * @param OnReadyJS:func
 * @text JS: On Warmup Ready
 * @parent Mechanics
 * @type note
 * @desc Code ran when a skill's warmup reaches 0.
 * @default "// Declare Constants\nconst id = arguments[0];\nconst skill = $dataSkills[id];\nconst user = this;\n\n// Perform Actions\n"
 *
 */
//=============================================================================

const _0x4a445d=_0x3962;function _0x3962(_0x17ad6a,_0x33e3af){const _0x3f156e=_0x3f15();return _0x3962=function(_0x3962aa,_0x556d63){_0x3962aa=_0x3962aa-0x91;let _0x572cbc=_0x3f156e[_0x3962aa];return _0x572cbc;},_0x3962(_0x17ad6a,_0x33e3af);}function _0x3f15(){const _0x550d75=['OmUbA','NUM','LWdSL','applyMasteryEffectCooldownTurns','item','Window_Base_drawSkillCost','Game_Battler_onTurnEnd','applyChangeCooldownEffects','FLAT','tcyHD','<STYPE\x20%1\x20%2\x20%3:[\x20]%4>','onCooldownUpdateJS','setCooldown','GUMuq','addWarmup','STRUCT','kMaaQ','OnUpdateJS','MijNK','1180122mcAbPw','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','SkillCooldowns','JxSEI','jojQP','Nvqyp','onBattleStart','SLMgj','wmAfU','olFny','EnemyGlobalCooldown','oOTwQ','call','DqSwL','Step1','match','map','ActorSkillCooldown','FontSize','paySkillCost','2302808VPlUZT','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','<GLOBAL\x20%1\x20%2:[\x20]%3>','(\x5cd+\x5c.?\x5cd+)','DKLjY','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','members','FUNC','status','\x5cI[%1]','attackSkillId','lhTRD','replace','trim','DFYqu','Global_%1_%2','applyClearCooldownEffects','drawTextEx','textSizeEx','6SXcCRs','mZtjo','DSsTx','alterPaySkillCooldownModifier','ljrzH','Step4','_skillWarmups','onCooldownUpdate','bjiZX','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','Step3','exit','notetag4','_skillCooldowns','(\x5cd+)([%％])','10255158EEhjPu','eMIae','applySkillCooldownEffects','tkCTA','warmup','clearWarmups','WAIT','applyCDWUnotetagsFlat','ARRAYSTR','EJzSh','Game_BattlerBase_initMembers','isBypassWarmups','onWarmupUpdateJS','21jfDXEm','getSkillTypes','applyCDWUmodifiers','prepareSkillWarmups','YrCsr','jYTyn','WARMUP','\x5cC[%1]','areSkillWarmupsReady','MYzNo','addCooldown','2441372VMpuzM','MaxTurns','cooldown','setWarmup','PLUS','notetag1','max','onWarmupReady','processTurn','MrNzD','VisuMZ_1_MessageCore','Icon','dlUEt','onCooldownReadyJS','OYOCs','OnReadyJS','jDBSd','UuaFD','skills','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20id\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20$dataSkills[id];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','dRZcz','onTurnEnd','ActorStypeCooldown','EIlMe','dnKRo','drawSkillWarmup','JxCIV','ARRAYJSON','JSON','ARRAYFUNC','odGjx','Nslfo','VisuMZ_1_SkillsStatesCore','LHzHY','paySkillCooldown','drawSkillCooldown','STR','fwOsL','applyCooldown','qrPKz','QRAzh','dTemM','getChainBattleSettings','Cooldown','Settings','FontColor','Game_Action_applyItemUserEffect','areSkillCooldownsReady','applyItemUserEffect','moyWL','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.cooldown(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyCooldown(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','onWarmupUpdate','ckgEy','Stype_%1_%2_%3','resetFontSettings','2613392hUzTWo','description','_updatedSkillCooldowns','meetsSkillConditions','yrYUS','KaDrJ','prototype','toUpperCase','applyChangeGlobalCooldownEffects','getSkillIdWithName','KWHCd','ZGiyN','parse','applyChangeStypeCooldownEffects','iwOuu','zuxDf','isBypassCooldowns','Show','Skill_%1_%2_%3','applyGlobalCooldowns','VisuMZ_SkillsStatesCore_Parse_Notetags_Skill_JS','applyChangeGlobalWarmupEffects','VisuMZ_3_SkillMastery','dDVxw','name','notetag2','OperateValues','updateCooldowns','Step2','Aiiwy','lKXnq','Hchwl','965965fpuRzY','rzAGz','Tmabg','gfMhl','Mghdg','380pqmOMz','OKDJA','adOyH','ricIx','1BjneKD','ConvertParams','KcvQY','OyOim','prepareUpdateSkillCooldowns','registerCommand','return\x200','onWarmupReadyJS','WFlYH','Game_BattlerBase_paySkillCost','Preemptive','cooldownJS','guardSkillId','XzTNc','onCooldownReady','applyCDWUnotetagsRate','oCuSn','_subject','ceil','FCTIJ','updateWarmups','Parse_Notetags_Skill_JS','bbiyb','width','COOLDOWN','Bhcfg','vRfHK','\x5cHexColor<%1>','version','applyWarmup','24673bGHwFe','note','SkillsStatesCore','initMembers','drawSkillCost','zWbWy','TextFmt','eKpTr','RegExp','includes','gqtUe','bqLbZ','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','actor','warmupJS','notetag3','onBattleEnd','xDfBx','getStypeIdWithName','Warmup','NOjaB','skillTypes','rawWarmup','applyStypeCooldowns','\x5cFS[%1]','gUDbV','GkVDP','_previousBattleChain','subject','applyChangeWarmupEffects','IXJIC','reduce','clamp','initSkillCooldowns','LPubm','dtmQX','ARRAYSTRUCT','ZPzbi','bFBiw','format','RATE','vxiIF','inBattle','yVlWV','applyChangeStypeWarmupEffects','ActorGlobalCooldown','clearCooldowns','_instantCast','Game_Battler_onBattleEnd'];_0x3f15=function(){return _0x550d75;};return _0x3f15();}(function(_0x1a396a,_0x4978a0){const _0x30a3ff=_0x3962,_0x495b2c=_0x1a396a();while(!![]){try{const _0xc9ee38=-parseInt(_0x30a3ff(0x13e))/0x1*(parseInt(_0x30a3ff(0xde))/0x2)+-parseInt(_0x30a3ff(0xb7))/0x3*(-parseInt(_0x30a3ff(0x115))/0x4)+parseInt(_0x30a3ff(0x135))/0x5+parseInt(_0x30a3ff(0x1a0))/0x6+-parseInt(_0x30a3ff(0xd3))/0x7*(parseInt(_0x30a3ff(0xa4))/0x8)+parseInt(_0x30a3ff(0xc6))/0x9+-parseInt(_0x30a3ff(0x13a))/0xa*(parseInt(_0x30a3ff(0x15c))/0xb);if(_0xc9ee38===_0x4978a0)break;else _0x495b2c['push'](_0x495b2c['shift']());}catch(_0x54f079){_0x495b2c['push'](_0x495b2c['shift']());}}}(_0x3f15,0xa2bc5));var label=_0x4a445d(0x92),tier=tier||0x0,dependencies=[_0x4a445d(0xfe)],pluginData=$plugins['filter'](function(_0x3d33c4){const _0x79c410=_0x4a445d;return _0x3d33c4['status']&&_0x3d33c4[_0x79c410(0x116)][_0x79c410(0x165)]('['+label+']');})[0x0];VisuMZ[label][_0x4a445d(0x10a)]=VisuMZ[label][_0x4a445d(0x10a)]||{},VisuMZ['ConvertParams']=function(_0x47d37a,_0x54517b){const _0x5ab043=_0x4a445d;for(const _0x431936 in _0x54517b){if(_0x5ab043(0xb2)===_0x5ab043(0xb2)){if(_0x431936[_0x5ab043(0x9f)](/(.*):(.*)/i)){if(_0x5ab043(0xbb)!==_0x5ab043(0x94)){const _0x13e23e=String(RegExp['$1']),_0x10c1b7=String(RegExp['$2'])['toUpperCase']()[_0x5ab043(0xb1)]();let _0x282ea0,_0x4bb2e8,_0x386e8d;switch(_0x10c1b7){case _0x5ab043(0x18e):_0x282ea0=_0x54517b[_0x431936]!==''?Number(_0x54517b[_0x431936]):0x0;break;case'ARRAYNUM':_0x4bb2e8=_0x54517b[_0x431936]!==''?JSON[_0x5ab043(0x121)](_0x54517b[_0x431936]):[],_0x282ea0=_0x4bb2e8['map'](_0x1b4c56=>Number(_0x1b4c56));break;case'EVAL':_0x282ea0=_0x54517b[_0x431936]!==''?eval(_0x54517b[_0x431936]):null;break;case'ARRAYEVAL':_0x4bb2e8=_0x54517b[_0x431936]!==''?JSON['parse'](_0x54517b[_0x431936]):[],_0x282ea0=_0x4bb2e8[_0x5ab043(0xa0)](_0x5219fd=>eval(_0x5219fd));break;case _0x5ab043(0xfa):_0x282ea0=_0x54517b[_0x431936]!==''?JSON['parse'](_0x54517b[_0x431936]):'';break;case _0x5ab043(0xf9):_0x4bb2e8=_0x54517b[_0x431936]!==''?JSON[_0x5ab043(0x121)](_0x54517b[_0x431936]):[],_0x282ea0=_0x4bb2e8[_0x5ab043(0xa0)](_0x56b16a=>JSON['parse'](_0x56b16a));break;case _0x5ab043(0xab):_0x282ea0=_0x54517b[_0x431936]!==''?new Function(JSON[_0x5ab043(0x121)](_0x54517b[_0x431936])):new Function(_0x5ab043(0x144));break;case _0x5ab043(0xfb):_0x4bb2e8=_0x54517b[_0x431936]!==''?JSON[_0x5ab043(0x121)](_0x54517b[_0x431936]):[],_0x282ea0=_0x4bb2e8[_0x5ab043(0xa0)](_0x1372f2=>new Function(JSON[_0x5ab043(0x121)](_0x1372f2)));break;case _0x5ab043(0x102):_0x282ea0=_0x54517b[_0x431936]!==''?String(_0x54517b[_0x431936]):'';break;case _0x5ab043(0xce):_0x4bb2e8=_0x54517b[_0x431936]!==''?JSON[_0x5ab043(0x121)](_0x54517b[_0x431936]):[],_0x282ea0=_0x4bb2e8[_0x5ab043(0xa0)](_0x3478b3=>String(_0x3478b3));break;case _0x5ab043(0x19c):_0x386e8d=_0x54517b[_0x431936]!==''?JSON[_0x5ab043(0x121)](_0x54517b[_0x431936]):{},_0x282ea0=VisuMZ[_0x5ab043(0x13f)]({},_0x386e8d);break;case _0x5ab043(0x180):_0x4bb2e8=_0x54517b[_0x431936]!==''?JSON['parse'](_0x54517b[_0x431936]):[],_0x282ea0=_0x4bb2e8['map'](_0x20cc99=>VisuMZ[_0x5ab043(0x13f)]({},JSON['parse'](_0x20cc99)));break;default:continue;}_0x47d37a[_0x13e23e]=_0x282ea0;}else this[_0x5ab043(0x178)]()[_0x5ab043(0xcb)]();}}else _0x160ec9[_0x5ab043(0xdd)](_0x4663d8['id'],_0xec2d36);}return _0x47d37a;},(_0x2a1996=>{const _0x7fdb39=_0x4a445d,_0x2c5706=_0x2a1996['name'];for(const _0x13bc93 of dependencies){if(_0x7fdb39(0xd7)===_0x7fdb39(0xec))for(const _0x30834c of _0x316f52){let _0x3c75a1=0x0,_0x403fed=0x0;if(_0x30834c['match'](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x3c75a1=_0x3053d2(_0x38bd04['$1']),_0x403fed=_0x4f2841(_0x18b40d['$2']);else _0x30834c[_0x7fdb39(0x9f)](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x3c75a1=_0x589c34[_0x7fdb39(0x11e)](_0x4bb8f2['$1']),_0x403fed=_0x4e64fa(_0x1e944f['$2']));this[_0x7fdb39(0x178)]()[_0x7fdb39(0xdd)](_0x3c75a1,_0x403fed);}else{if(!Imported[_0x13bc93]){alert(_0x7fdb39(0x91)['format'](_0x2c5706,_0x13bc93)),SceneManager[_0x7fdb39(0xc2)]();break;}}}const _0x49484e=_0x2a1996['description'];if(_0x49484e[_0x7fdb39(0x9f)](/\[Version[ ](.*?)\]/i)){const _0x40699a=Number(RegExp['$1']);_0x40699a!==VisuMZ[label][_0x7fdb39(0x15a)]&&(alert(_0x7fdb39(0xc0)[_0x7fdb39(0x183)](_0x2c5706,_0x40699a)),SceneManager[_0x7fdb39(0xc2)]());}if(_0x49484e['match'](/\[Tier[ ](\d+)\]/i)){const _0x3c5888=Number(RegExp['$1']);if(_0x3c5888<tier)alert(_0x7fdb39(0x168)[_0x7fdb39(0x183)](_0x2c5706,_0x3c5888,tier)),SceneManager[_0x7fdb39(0xc2)]();else{if(_0x7fdb39(0x140)==='AltGf')for(const _0x4e507b of _0x24db48){let _0x102142=0x0,_0x5d0250=0x0;if(_0x4e507b[_0x7fdb39(0x9f)](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x102142=_0xd55114(_0xf0f44['$1']),_0x5d0250=_0x5428f6(_0x41f1ba['$2']);else _0x4e507b['match'](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x102142=_0x3c9243[_0x7fdb39(0x11e)](_0x10bc47['$1']),_0x5d0250=_0x1ef534(_0x4bf0a4['$2']));_0x4ad095[_0x7fdb39(0x19b)](_0x102142,_0x5d0250);}else tier=Math['max'](_0x3c5888,tier);}}VisuMZ['ConvertParams'](VisuMZ[label]['Settings'],_0x2a1996['parameters']);})(pluginData),VisuMZ[_0x4a445d(0x12f)]=function(_0x33a547,_0x29dd56,_0x48050e){switch(_0x48050e){case'=':return _0x29dd56;break;case'+':return _0x33a547+_0x29dd56;break;case'-':return _0x33a547-_0x29dd56;break;case'*':return _0x33a547*_0x29dd56;break;case'/':return _0x33a547/_0x29dd56;break;case'%':return _0x33a547%_0x29dd56;break;}return _0x33a547;},PluginManager[_0x4a445d(0x143)](pluginData['name'],_0x4a445d(0xa1),_0x927e0=>{const _0x13709a=_0x4a445d;if(!$gameParty[_0x13709a(0x186)]())return;VisuMZ[_0x13709a(0x13f)](_0x927e0,_0x927e0);const _0x3edda2=_0x927e0[_0x13709a(0x9e)],_0x419a3e=_0x927e0[_0x13709a(0x131)],_0x40b860=_0x927e0['Step3'],_0x33a080=_0x927e0[_0x13709a(0xbc)];for(const _0x494b3a of _0x3edda2){const _0x590846=$gameActors['actor'](_0x494b3a);if(!_0x590846)continue;for(const _0x1a3560 of _0x419a3e){if(_0x13709a(0x107)===_0x13709a(0x141)){const _0x3c0b95=_0x4126a1(_0x322fd8['$1']);_0x3c0b95<_0x1c2919?(_0x36892e(_0x13709a(0x168)[_0x13709a(0x183)](_0x4cc4be,_0x3c0b95,_0x1f0877)),_0x418637[_0x13709a(0xc2)]()):_0x5ba0b3=_0x14c80d['max'](_0x3c0b95,_0x5b9313);}else{let _0x1630a4=_0x590846[_0x13709a(0xe0)](_0x1a3560);_0x1630a4=VisuMZ[_0x13709a(0x12f)](_0x1630a4,_0x33a080,_0x40b860),_0x590846[_0x13709a(0x199)](_0x1a3560,_0x1630a4);}}}}),PluginManager['registerCommand'](pluginData[_0x4a445d(0x12d)],_0x4a445d(0xf4),_0xe6774a=>{const _0x19c2e0=_0x4a445d;if(!$gameParty[_0x19c2e0(0x186)]())return;VisuMZ[_0x19c2e0(0x13f)](_0xe6774a,_0xe6774a);const _0x56e00d=_0xe6774a[_0x19c2e0(0x9e)],_0x2b1191=_0xe6774a[_0x19c2e0(0x131)],_0x4a37db=_0xe6774a[_0x19c2e0(0xc1)],_0xcbc8b4=_0xe6774a[_0x19c2e0(0xbc)];for(const _0xee82d4 of _0x56e00d){if(_0x19c2e0(0x9b)!=='oOTwQ'){let _0x3a153c=0x0,_0x545fe8=0x0;if(_0x2e88a5[_0x19c2e0(0x9f)](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x3a153c=_0x189971(_0x1447d5['$1']),_0x545fe8=_0x299fb6(_0x31f787['$2']);else _0x39453c[_0x19c2e0(0x9f)](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)&&(_0x3a153c=_0x1860d0[_0x19c2e0(0x11e)](_0x55da68['$1']),_0x545fe8=_0xffdc0d(_0x1f4f56['$2']));const _0x3ee8ba=_0x2647fe[_0x3a153c];_0x3ee8ba&&(_0x545fe8=this[_0x19c2e0(0xba)](_0x206469,_0x545fe8),this[_0x19c2e0(0x104)](_0x3ee8ba['id'],_0x545fe8));}else{const _0x40c136=$gameActors[_0x19c2e0(0x169)](_0xee82d4);if(!_0x40c136)continue;for(const _0x1b1e24 of _0x2b1191){for(const _0x2f1f06 of _0x40c136[_0x19c2e0(0xf0)]()){if(!_0x2f1f06)continue;if(!DataManager['getSkillTypes'](_0x2f1f06)[_0x19c2e0(0x165)](_0x1b1e24))continue;const _0x4954e4=_0x2f1f06['id'];let _0x12c67a=_0x40c136[_0x19c2e0(0xe0)](_0x4954e4);_0x12c67a=VisuMZ[_0x19c2e0(0x12f)](_0x12c67a,_0xcbc8b4,_0x4a37db),_0x40c136[_0x19c2e0(0x199)](_0x4954e4,_0x12c67a);}}}}}),PluginManager[_0x4a445d(0x143)](pluginData[_0x4a445d(0x12d)],_0x4a445d(0x189),_0x32cf35=>{const _0x4c3feb=_0x4a445d;if(!$gameParty[_0x4c3feb(0x186)]())return;VisuMZ[_0x4c3feb(0x13f)](_0x32cf35,_0x32cf35);const _0x51a9c2=_0x32cf35[_0x4c3feb(0x9e)],_0x569e10=_0x32cf35[_0x4c3feb(0x131)],_0xe8eaf3=_0x32cf35[_0x4c3feb(0xc1)];for(const _0x565599 of _0x51a9c2){const _0x3613c5=$gameActors['actor'](_0x565599);if(!_0x3613c5)continue;for(const _0x3a1a5f of _0x3613c5[_0x4c3feb(0xf0)]()){if(!_0x3a1a5f)continue;const _0xef8f09=_0x3a1a5f['id'];let _0x42ecba=_0x3613c5[_0x4c3feb(0xe0)](_0xef8f09);_0x42ecba=VisuMZ[_0x4c3feb(0x12f)](_0x42ecba,_0xe8eaf3,_0x569e10),_0x3613c5[_0x4c3feb(0x199)](_0xef8f09,_0x42ecba);}}}),PluginManager[_0x4a445d(0x143)](pluginData[_0x4a445d(0x12d)],'EnemySkillCooldown',_0x41d950=>{const _0x4cf98d=_0x4a445d;if(!$gameParty['inBattle']())return;VisuMZ[_0x4cf98d(0x13f)](_0x41d950,_0x41d950);const _0x2fd7cc=_0x41d950[_0x4cf98d(0x9e)],_0x23a911=_0x41d950[_0x4cf98d(0x131)],_0x443f48=_0x41d950[_0x4cf98d(0xc1)],_0x2fa841=_0x41d950[_0x4cf98d(0xbc)];for(const _0x13a878 of _0x2fd7cc){const _0x53c9c1=$gameTroop[_0x4cf98d(0xaa)]()[_0x13a878];if(!_0x53c9c1)continue;for(const _0x35e6eb of _0x23a911){let _0x57a5bb=_0x53c9c1[_0x4cf98d(0xe0)](_0x35e6eb);_0x57a5bb=VisuMZ['OperateValues'](_0x57a5bb,_0x2fa841,_0x443f48),_0x53c9c1[_0x4cf98d(0x199)](_0x35e6eb,_0x57a5bb);}}}),PluginManager[_0x4a445d(0x143)](pluginData['name'],'EnemyStypeCooldown',_0x466568=>{const _0x976356=_0x4a445d;if(!$gameParty['inBattle']())return;VisuMZ[_0x976356(0x13f)](_0x466568,_0x466568);const _0x26ebfc=_0x466568['Step1'],_0x433805=_0x466568['Step2'],_0x24f3dd=_0x466568['Step3'],_0x1c95d1=_0x466568[_0x976356(0xbc)];for(const _0x500106 of _0x26ebfc){if(_0x976356(0x97)===_0x976356(0x97)){const _0x55c30e=$gameTroop[_0x976356(0xaa)]()[_0x500106];if(!_0x55c30e)continue;for(const _0x20d2c7 of _0x433805){for(const _0x51fc16 of _0x55c30e[_0x976356(0xf0)]()){if(!_0x51fc16)continue;if(!DataManager[_0x976356(0xd4)](_0x51fc16)['includes'](_0x20d2c7))continue;const _0x46d1d8=_0x51fc16['id'];let _0x77827f=_0x55c30e[_0x976356(0xe0)](_0x46d1d8);_0x77827f=VisuMZ[_0x976356(0x12f)](_0x77827f,_0x1c95d1,_0x24f3dd),_0x55c30e[_0x976356(0x199)](_0x46d1d8,_0x77827f);}}}else _0x1cc3c0=_0x44bcbb(_0x558508['$1']),_0x33d036=_0x276a3e(_0x3c2e1d['$2']);}}),PluginManager[_0x4a445d(0x143)](pluginData[_0x4a445d(0x12d)],_0x4a445d(0x9a),_0x5cb77b=>{const _0x447339=_0x4a445d;if(!$gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x5cb77b,_0x5cb77b);const _0x1b7bb1=_0x5cb77b[_0x447339(0x9e)],_0x34631d=_0x5cb77b[_0x447339(0x131)],_0x3479a5=_0x5cb77b[_0x447339(0xc1)];for(const _0x310f79 of _0x1b7bb1){if(_0x447339(0x146)!==_0x447339(0x14b)){const _0x12d839=$gameTroop[_0x447339(0xaa)]()[_0x310f79];if(!_0x12d839)continue;for(const _0x189bce of _0x12d839[_0x447339(0xf0)]()){if(_0x447339(0x132)===_0x447339(0x185)){if(_0x48896a>0x0)this[_0x447339(0x14c)](_0x18d46b);delete this['_skillCooldowns'][_0x1506cd];}else{if(!_0x189bce)continue;const _0x286b5e=_0x189bce['id'];let _0x2f3e9a=_0x12d839[_0x447339(0xe0)](_0x286b5e);_0x2f3e9a=VisuMZ[_0x447339(0x12f)](_0x2f3e9a,_0x3479a5,_0x34631d),_0x12d839[_0x447339(0x199)](_0x286b5e,_0x2f3e9a);}}}else _0x3de5c0[_0x447339(0x92)]['onWarmupUpdateJS'][_0x106fd7][_0x447339(0x9c)](this,_0xec63fa);}}),VisuMZ[_0x4a445d(0x92)][_0x4a445d(0x149)]={},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0x16a)]={},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0x198)]={},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0xd2)]={},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0xeb)]={},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0x145)]={},VisuMZ['SkillCooldowns'][_0x4a445d(0x129)]=VisuMZ[_0x4a445d(0x15e)]['Parse_Notetags_Skill_JS'],VisuMZ[_0x4a445d(0x15e)][_0x4a445d(0x153)]=function(_0x5f4ee9){const _0x27dffa=_0x4a445d;VisuMZ['SkillCooldowns'][_0x27dffa(0x129)]['call'](this,_0x5f4ee9);const _0x4c84fd=_0x5f4ee9[_0x27dffa(0x15d)],_0x287d8a=_0x27dffa(0xa5),_0x5acd34=_0x27dffa(0xf1);if(_0x4c84fd['match'](/<JS (?:COOLDOWN|COOLDOWNS)>\s*([\s\S]*)\s*<\/JS (?:COOLDOWN|COOLDOWNS)>/i)){if(_0x27dffa(0x16d)===_0x27dffa(0x16d)){const _0x2306bb=String(RegExp['$1']),_0x4d7280=_0x27dffa(0x110)[_0x27dffa(0x183)](_0x2306bb);VisuMZ[_0x27dffa(0x92)]['cooldownJS'][_0x5f4ee9['id']]=new Function(_0x4d7280);}else{let _0x52e9f6=_0x423842['cooldown'](_0x2c9540);_0x52e9f6=_0x27376d[_0x27dffa(0x12f)](_0x52e9f6,_0x247186,_0x452503),_0x346ece[_0x27dffa(0x199)](_0x1c99b3,_0x52e9f6);}}if(_0x4c84fd[_0x27dffa(0x9f)](/<JS (?:WARMUP|WARMUPS)>\s*([\s\S]*)\s*<\/JS (?:WARMUP|WARMUPS)>/i)){const _0x32345c=String(RegExp['$1']),_0x1d16dd='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20turns\x20=\x20this.rawWarmup(skill.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20this.applyWarmup(skill.id,\x20turns);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20'['format'](_0x32345c);VisuMZ[_0x27dffa(0x92)][_0x27dffa(0x16a)][_0x5f4ee9['id']]=new Function(_0x1d16dd);}if(_0x4c84fd[_0x27dffa(0x9f)](/<JS ON COOLDOWN UPDATE>\s*([\s\S]*)\s*<\/JS ON COOLDOWN UPDATE>/i)){if(_0x27dffa(0xe7)===_0x27dffa(0xe7)){const _0x2228e6=String(RegExp['$1']),_0x564665=_0x287d8a['format'](_0x2228e6);VisuMZ[_0x27dffa(0x92)][_0x27dffa(0x198)][_0x5f4ee9['id']]=new Function(_0x564665);}else _0x5e0104=this[_0x27dffa(0xd5)](_0x12fca9,_0x122508,_0x27dffa(0x156)),this[_0x27dffa(0x199)](_0x3a9dbd,_0x4d585e[_0x27dffa(0xe4)](_0x3cf99a,this[_0x27dffa(0xe0)](_0x5f131d)));}if(_0x4c84fd[_0x27dffa(0x9f)](/<JS ON WARMUP UPDATE>\s*([\s\S]*)\s*<\/JS ON WARMUP UPDATE>/i)){if(_0x27dffa(0x14e)!==_0x27dffa(0x17a)){const _0x216bc3=String(RegExp['$1']),_0x272686=_0x5acd34[_0x27dffa(0x183)](_0x216bc3);VisuMZ[_0x27dffa(0x92)][_0x27dffa(0xd2)][_0x5f4ee9['id']]=new Function(_0x272686);}else{var _0x30ccb0=_0x4f6793(_0xcedda3['$1']);_0x540f09*=_0x30ccb0;}}if(_0x4c84fd['match'](/<JS ON COOLDOWN READY>\s*([\s\S]*)\s*<\/JS ON COOLDOWN READY>/i)){if('qbNvl'!==_0x27dffa(0x19d)){const _0x26708e=String(RegExp['$1']),_0x1f0c7b=_0x287d8a[_0x27dffa(0x183)](_0x26708e);VisuMZ[_0x27dffa(0x92)][_0x27dffa(0xeb)][_0x5f4ee9['id']]=new Function(_0x1f0c7b);}else{const _0x4588d2=_0x5bf856[_0x27dffa(0xd4)](_0x4a04b4);_0x4588d2['includes'](_0x31ef61)&&_0x43ff83['addCooldown'](_0x6bda5e['id'],_0x3b8e8f);}}if(_0x4c84fd[_0x27dffa(0x9f)](/<JS ON WARMUP READY>\s*([\s\S]*)\s*<\/JS ON WARMUP READY>/i)){const _0x3c7516=String(RegExp['$1']),_0x1720a8=_0x5acd34[_0x27dffa(0x183)](_0x3c7516);VisuMZ['SkillCooldowns'][_0x27dffa(0x145)][_0x5f4ee9['id']]=new Function(_0x1720a8);}},VisuMZ[_0x4a445d(0x92)]['BattleManager_processTurn']=BattleManager[_0x4a445d(0xe6)],BattleManager[_0x4a445d(0xe6)]=function(){const _0x19f9fa=_0x4a445d;if(this[_0x19f9fa(0x14f)])this[_0x19f9fa(0x14f)][_0x19f9fa(0x142)]();VisuMZ['SkillCooldowns']['BattleManager_processTurn'][_0x19f9fa(0x9c)](this);},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0x10c)]=Game_Action[_0x4a445d(0x11b)][_0x4a445d(0x10e)],Game_Action[_0x4a445d(0x11b)][_0x4a445d(0x10e)]=function(_0x57d345){const _0x490e59=_0x4a445d;VisuMZ['SkillCooldowns'][_0x490e59(0x10c)][_0x490e59(0x9c)](this,_0x57d345),this['applySkillCooldownEffects'](_0x57d345);},Game_Action[_0x4a445d(0x11b)][_0x4a445d(0xc8)]=function(_0x4e0c5c){const _0x91c7d=_0x4a445d;this[_0x91c7d(0xb4)](_0x4e0c5c),this[_0x91c7d(0x194)](_0x4e0c5c),this[_0x91c7d(0x122)](_0x4e0c5c),this['applyChangeGlobalCooldownEffects'](_0x4e0c5c),this[_0x91c7d(0x179)](_0x4e0c5c),this[_0x91c7d(0x188)](_0x4e0c5c),this[_0x91c7d(0x12a)](_0x4e0c5c);},Game_Action[_0x4a445d(0x11b)][_0x4a445d(0xb4)]=function(_0x1f422d){const _0x555675=_0x4a445d,_0x166a96=this[_0x555675(0x191)]()[_0x555675(0x15d)];_0x166a96['match'](/<CLEAR USER COOLDOWNS>/i)&&this[_0x555675(0x178)]()[_0x555675(0x18a)](),_0x166a96[_0x555675(0x9f)](/<CLEAR TARGET COOLDOWNS>/i)&&_0x1f422d[_0x555675(0x18a)](),_0x166a96[_0x555675(0x9f)](/<CLEAR USER WARMUPS>/i)&&this[_0x555675(0x178)]()[_0x555675(0xcb)](),_0x166a96[_0x555675(0x9f)](/<CLEAR TARGET WARMUPS>/i)&&_0x1f422d[_0x555675(0xcb)]();},Game_Action['prototype'][_0x4a445d(0x194)]=function(_0x1c8b22){const _0x181bd3=_0x4a445d,_0x2dfdb4=this[_0x181bd3(0x191)]()[_0x181bd3(0x15d)],_0xcffe2b=_0x2dfdb4['match'](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0xcffe2b)for(const _0x5e10aa of _0xcffe2b){let _0x45059b=0x0,_0x1079f1=0x0;if(_0x5e10aa[_0x181bd3(0x9f)](/<USER SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x181bd3(0x13b)===_0x181bd3(0x13b))_0x45059b=Number(RegExp['$1']),_0x1079f1=Number(RegExp['$2']);else{if(_0x50b30c){const _0x1dd518=_0x5725b5[_0x181bd3(0xd4)](_0x2b5b51);_0x1dd518[_0x181bd3(0x165)](_0x3e26f7)&&_0x5397f1[_0x181bd3(0x19b)](_0x31aea8['id'],_0x1c8c5b);}}}else _0x5e10aa[_0x181bd3(0x9f)](/<USER SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x45059b=DataManager['getSkillIdWithName'](RegExp['$1']),_0x1079f1=Number(RegExp['$2']));this[_0x181bd3(0x178)]()['addCooldown'](_0x45059b,_0x1079f1);}const _0x152e73=_0x2dfdb4[_0x181bd3(0x9f)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x152e73){if(_0x181bd3(0x176)===_0x181bd3(0x176))for(const _0x50b052 of _0x152e73){let _0x332a17=0x0,_0x2e0e43=0x0;if(_0x50b052[_0x181bd3(0x9f)](/<TARGET SKILL[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x332a17=Number(RegExp['$1']),_0x2e0e43=Number(RegExp['$2']);else _0x50b052[_0x181bd3(0x9f)](/<TARGET SKILL[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0x181bd3(0x17f)!==_0x181bd3(0x17f)?(_0x12b6fa=_0x2827c4(_0x59ddb5['$1']),_0x50bf32=_0x2f9dfd(_0x43d7e6['$2'])):(_0x332a17=DataManager[_0x181bd3(0x11e)](RegExp['$1']),_0x2e0e43=Number(RegExp['$2'])));_0x1c8b22[_0x181bd3(0xdd)](_0x332a17,_0x2e0e43);}else{const _0x537238=this[_0x181bd3(0xbd)][_0x11f598]||0x0;this[_0x181bd3(0xbd)][_0x326fa5]-=_0x42a9cd;if(this[_0x181bd3(0xbd)][_0x1f66bf]<=0x0){if(_0x537238>0x0)this['onWarmupReady'](_0x34b0ca);delete this[_0x181bd3(0xbd)][_0xb1af84];}}}},Game_Action['prototype'][_0x4a445d(0x122)]=function(_0x1d38a5){const _0x483134=_0x4a445d,_0x5ae40=this[_0x483134(0x191)]()['note'],_0x4191a1=_0x5ae40[_0x483134(0x9f)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x4191a1){if(_0x483134(0x175)!==_0x483134(0x106))for(const _0x13a9ac of _0x4191a1){if(_0x483134(0xef)!==_0x483134(0xcf)){let _0xa87c4a=0x0,_0x257206=0x0;if(_0x13a9ac[_0x483134(0x9f)](/<USER STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0xa87c4a=Number(RegExp['$1']),_0x257206=Number(RegExp['$2']);else _0x13a9ac[_0x483134(0x9f)](/<USER STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)&&(_0xa87c4a=DataManager[_0x483134(0x11e)](RegExp['$1']),_0x257206=Number(RegExp['$2']));for(const _0x2dd8d0 of this[_0x483134(0x178)]()[_0x483134(0xf0)]()){if(_0x483134(0x19f)===_0x483134(0x19f)){if(_0x2dd8d0){const _0x13541f=DataManager[_0x483134(0xd4)](_0x2dd8d0);_0x13541f[_0x483134(0x165)](_0xa87c4a)&&this[_0x483134(0x178)]()['addCooldown'](_0x2dd8d0['id'],_0x257206);}}else{var _0x1a8c0b=_0x1ae6d1(_0x577518['$1'])/0x64;_0x67e765*=_0x1a8c0b;}}}else{let _0xc6bd8=0x0,_0x5d7b89=0x0;if(_0x31863f[_0x483134(0x9f)](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0xc6bd8=_0x4d2680(_0x76c82a['$1']),_0x5d7b89=_0x1566b8(_0x27d15d['$2']);else _0x52dbd1[_0x483134(0x9f)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0xc6bd8=_0x38e8c8[_0x483134(0x11e)](_0x151406['$1']),_0x5d7b89=_0x309033(_0x17df84['$2']));_0x342cf9[_0x483134(0x19b)](_0xc6bd8,_0x5d7b89);}}else{const _0x310371=_0x3957f3(_0x262a50['$1']),_0xa5113f=_0x32c624['format'](_0x310371);_0x1cdac3[_0x483134(0x92)][_0x483134(0x145)][_0x13a55b['id']]=new _0x4ec418(_0xa5113f);}}const _0x4240a8=_0x5ae40['match'](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/gi);if(_0x4240a8){if('yrYUS'!==_0x483134(0x119)){const _0x1aba25=_0x4c25ba(_0x24b8d7['$1']),_0x1ca022=_0x483134(0x110)['format'](_0x1aba25);_0x34155e[_0x483134(0x92)][_0x483134(0x149)][_0x3904fc['id']]=new _0x12b991(_0x1ca022);}else for(const _0x1ec197 of _0x4240a8){let _0x22b565=0x0,_0x44adaa=0x0;if(_0x1ec197[_0x483134(0x9f)](/<TARGET STYPE[ ](\d+)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i))_0x22b565=Number(RegExp['$1']),_0x44adaa=Number(RegExp['$2']);else{if(_0x1ec197[_0x483134(0x9f)](/<TARGET STYPE[ ](.*)[ ]COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x483134(0xaf)!==_0x483134(0xaf)){var _0x151066=_0x153301(_0xba41f2['$1'])/0x64;_0x21f6ef*=_0x151066;}else _0x22b565=DataManager[_0x483134(0x11e)](RegExp['$1']),_0x44adaa=Number(RegExp['$2']);}}for(const _0x45f032 of _0x1d38a5[_0x483134(0xf0)]()){if(_0x483134(0x10f)!==_0x483134(0xc7)){if(_0x45f032){if('KiAMF'==='HTsBe'){var _0x38cd69=_0x1d8091(_0x5d3cb0['$1']);_0x23ff57*=_0x38cd69;}else{const _0x36ed41=DataManager[_0x483134(0xd4)](_0x45f032);if(_0x36ed41['includes'](_0x22b565)){if(_0x483134(0xfc)!==_0x483134(0xfc)){_0x4361e0=_0x47d20c||0x1;for(const _0x244e2e in this[_0x483134(0xbd)]){const _0x4720e0=this[_0x483134(0xbd)][_0x244e2e]||0x0;this[_0x483134(0xbd)][_0x244e2e]-=_0x53708f;if(this['_skillWarmups'][_0x244e2e]<=0x0){if(_0x4720e0>0x0)this[_0x483134(0xe5)](_0x244e2e);delete this[_0x483134(0xbd)][_0x244e2e];}}}else _0x1d38a5[_0x483134(0xdd)](_0x45f032['id'],_0x44adaa);}}}}else _0x545746=_0x52062e[_0x483134(0x11e)](_0x1cc2f2['$1']),_0x594e92=_0x212ed1(_0x4dad59['$2']);}}}},Game_Action[_0x4a445d(0x11b)][_0x4a445d(0x11d)]=function(_0x49de30){const _0x48e3d5=_0x4a445d,_0x3f8aea=this[_0x48e3d5(0x191)]()[_0x48e3d5(0x15d)];if(_0x3f8aea[_0x48e3d5(0x9f)](/<USER GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){const _0x2886a2=Number(RegExp['$1']);for(const _0x588c5e of this['subject']()['skills']()){if(_0x588c5e){if(_0x48e3d5(0xf2)!==_0x48e3d5(0x139))this[_0x48e3d5(0x178)]()[_0x48e3d5(0xdd)](_0x588c5e['id'],_0x2886a2);else{const _0x646cbe=_0x56b5a8(_0xaa6ea7['$1']),_0x4cd5d6=_0x56ab38['format'](_0x646cbe);_0x1d72e8[_0x48e3d5(0x92)][_0x48e3d5(0xd2)][_0x726a16['id']]=new _0x133e26(_0x4cd5d6);}}}}if(_0x3f8aea[_0x48e3d5(0x9f)](/<TARGET GLOBAL COOLDOWN:[ ]([\+\-]\d+)>/i)){if(_0x48e3d5(0x157)===_0x48e3d5(0xf6))_0x4c3df5=_0x289d95(_0x295a91['$1']),_0x15aae5=_0x3362ea(_0x483669['$2']);else{const _0x5dc3a8=Number(RegExp['$1']);for(const _0x284f3a of _0x49de30[_0x48e3d5(0xf0)]()){_0x284f3a&&_0x49de30[_0x48e3d5(0xdd)](_0x284f3a['id'],_0x5dc3a8);}}}},Game_Action[_0x4a445d(0x11b)]['applyChangeWarmupEffects']=function(_0x299618){const _0x37e478=_0x4a445d,_0x22a752=this[_0x37e478(0x191)]()[_0x37e478(0x15d)],_0x4dcbe6=_0x22a752['match'](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x4dcbe6){if(_0x37e478(0xff)==='LHzHY')for(const _0x286739 of _0x4dcbe6){if('rzAGz'!==_0x37e478(0x136)){const _0x36dd4e=_0x3a72fd(_0x2b95e4['$1']),_0x433921=_0x37e478(0xa9)['format'](_0x36dd4e);_0x2bda5d['SkillCooldowns']['warmupJS'][_0xc0b29b['id']]=new _0xe5b45f(_0x433921);}else{let _0x4c5fc1=0x0,_0x4faff1=0x0;if(_0x286739[_0x37e478(0x9f)](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x4c5fc1=Number(RegExp['$1']),_0x4faff1=Number(RegExp['$2']);else _0x286739[_0x37e478(0x9f)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x37e478(0x11a)!==_0x37e478(0x11a)?_0x522c15[_0x37e478(0x92)][_0x37e478(0x149)][_0x339465['id']]['call'](this,_0x15d9ad):(_0x4c5fc1=DataManager[_0x37e478(0x11e)](RegExp['$1']),_0x4faff1=Number(RegExp['$2'])));this[_0x37e478(0x178)]()[_0x37e478(0x19b)](_0x4c5fc1,_0x4faff1);}}else{if(_0x2020e2){const _0x22acdd=_0x5c248a['getSkillTypes'](_0x54e948);_0x22acdd[_0x37e478(0x165)](_0x2bbe1c)&&this[_0x37e478(0x178)]()[_0x37e478(0xdd)](_0xbd178c['id'],_0x5a5001);}}}const _0x59f234=_0x22a752['match'](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x59f234)for(const _0x486518 of _0x59f234){if(_0x37e478(0xea)===_0x37e478(0xea)){let _0x5221f1=0x0,_0x5c570e=0x0;if(_0x486518['match'](/<TARGET SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x5221f1=Number(RegExp['$1']),_0x5c570e=Number(RegExp['$2']);else _0x486518[_0x37e478(0x9f)](/<TARGET SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x5221f1=DataManager[_0x37e478(0x11e)](RegExp['$1']),_0x5c570e=Number(RegExp['$2']));_0x299618['addWarmup'](_0x5221f1,_0x5c570e);}else this['drawSkillCooldown'](_0x104ecc,_0x2c7ca3,_0x3b2b3c,_0x30cedb,_0x4b0d51);}},Game_Action[_0x4a445d(0x11b)][_0x4a445d(0x188)]=function(_0x412a96){const _0x2dc5de=_0x4a445d,_0x3e7069=this['item']()[_0x2dc5de(0x15d)],_0x300adb=_0x3e7069[_0x2dc5de(0x9f)](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x300adb)for(const _0x4d2120 of _0x300adb){let _0xa80dbc=0x0,_0x2b73ea=0x0;if(_0x4d2120[_0x2dc5de(0x9f)](/<USER STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x2dc5de(0x112)!==_0x2dc5de(0xd8)?(_0xa80dbc=Number(RegExp['$1']),_0x2b73ea=Number(RegExp['$2'])):(this[_0x2dc5de(0xb4)](_0x17e9fc),this[_0x2dc5de(0x194)](_0x30324a),this[_0x2dc5de(0x122)](_0x9bec70),this[_0x2dc5de(0x11d)](_0x36c318),this[_0x2dc5de(0x179)](_0x17809a),this[_0x2dc5de(0x188)](_0x1c9cfd),this[_0x2dc5de(0x12a)](_0x330aef));else _0x4d2120[_0x2dc5de(0x9f)](/<USER STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0xa80dbc=DataManager[_0x2dc5de(0x11e)](RegExp['$1']),_0x2b73ea=Number(RegExp['$2']));for(const _0x1b6102 of this['subject']()[_0x2dc5de(0xf0)]()){if('dSvGC'===_0x2dc5de(0x18d))_0x244ef7+=_0x2dc5de(0xda)[_0x2dc5de(0x183)](_0x90a544);else{if(_0x1b6102){if('NhpdS'!==_0x2dc5de(0x17e)){const _0x2785bb=DataManager['getSkillTypes'](_0x1b6102);_0x2785bb[_0x2dc5de(0x165)](_0xa80dbc)&&(_0x2dc5de(0x134)!==_0x2dc5de(0x134)?(_0x3cabae=_0x23a8ab[_0x2dc5de(0x11e)](_0x56d8f7['$1']),_0x596676=_0x463a80(_0x11595d['$2'])):this['subject']()[_0x2dc5de(0x19b)](_0x1b6102['id'],_0x2b73ea));}else _0x5d73b5=this[_0x2dc5de(0xd5)](_0x4cf34e,_0x339ac1,_0x2dc5de(0xd9)),this[_0x2dc5de(0xe1)](_0x14956d,_0x4d805d[_0x2dc5de(0xe4)](_0x78ad4f,this[_0x2dc5de(0xca)](_0x2e2f8c)));}}}}const _0x1896d0=_0x3e7069[_0x2dc5de(0x9f)](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/gi);if(_0x1896d0){if(_0x2dc5de(0xfd)!==_0x2dc5de(0xb9))for(const _0x448f12 of _0x1896d0){let _0x2a6c04=0x0,_0x3d79c3=0x0;if(_0x448f12[_0x2dc5de(0x9f)](/<TARGET STYPE[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x2dc5de(0xee)!=='kwrOA')_0x2a6c04=Number(RegExp['$1']),_0x3d79c3=Number(RegExp['$2']);else{const _0xa71304=_0x5d9257(_0x28d50c['$1']);for(const _0x3b604a of _0x3ae721[_0x2dc5de(0xf0)]()){_0x3b604a&&_0x3c3b1e[_0x2dc5de(0xdd)](_0x3b604a['id'],_0xa71304);}}}else _0x448f12['match'](/<TARGET STYPE[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x2a6c04=DataManager[_0x2dc5de(0x11e)](RegExp['$1']),_0x3d79c3=Number(RegExp['$2']));for(const _0x18d3d9 of _0x412a96[_0x2dc5de(0xf0)]()){if(_0x18d3d9){if(_0x2dc5de(0xc9)==='fsxNj'){const _0x48003e=_0x751245(_0x45a0ad['$1']),_0x3b1c97=_0x802292[_0x2dc5de(0x183)](_0x48003e);_0x5355d3[_0x2dc5de(0x92)]['onCooldownUpdateJS'][_0x2aeec9['id']]=new _0x58f8bd(_0x3b1c97);}else{const _0x33eed0=DataManager['getSkillTypes'](_0x18d3d9);if(_0x33eed0[_0x2dc5de(0x165)](_0x2a6c04)){if(_0x2dc5de(0xa8)!==_0x2dc5de(0xa8)){let _0x44ee46=_0x387368(_0x473f7b['$1']);_0x44ee46=this['alterPaySkillCooldownModifier'](_0xe96ff6,_0x44ee46),this[_0x2dc5de(0x104)](_0x11f859['id'],_0x44ee46);}else _0x412a96['addWarmup'](_0x18d3d9['id'],_0x3d79c3);}}}}}else{var _0xc643b5=_0x39590b(_0x50cf51['$1']);_0x3757ea+=_0xc643b5;}}},Game_Action[_0x4a445d(0x11b)][_0x4a445d(0x12a)]=function(_0x329a75){const _0x5287a7=_0x4a445d,_0x5f46ff=this[_0x5287a7(0x191)]()[_0x5287a7(0x15d)];if(_0x5f46ff[_0x5287a7(0x9f)](/<USER GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){const _0x16fd73=Number(RegExp['$1']);for(const _0x56f3a1 of this[_0x5287a7(0x178)]()[_0x5287a7(0xf0)]()){_0x5287a7(0x138)!==_0x5287a7(0xbf)?_0x56f3a1&&this[_0x5287a7(0x178)]()['addWarmup'](_0x56f3a1['id'],_0x16fd73):this['applyCooldown'](_0x3b86d2['id'],_0x170df7);}}if(_0x5f46ff[_0x5287a7(0x9f)](/<TARGET GLOBAL WARMUP:[ ]([\+\-]\d+)>/i)){if(_0x5287a7(0x95)!==_0x5287a7(0x151)){const _0x278633=Number(RegExp['$1']);for(const _0x3aeb49 of _0x329a75[_0x5287a7(0xf0)]()){_0x3aeb49&&_0x329a75[_0x5287a7(0x19b)](_0x3aeb49['id'],_0x278633);}}else _0x5a122f[_0x5287a7(0x92)][_0x5287a7(0x192)][_0x5287a7(0x9c)](this,_0x521669,_0x53f0ed,_0x125a6f,_0x3cd68f,_0x423b06);}},VisuMZ['SkillCooldowns'][_0x4a445d(0xd0)]=Game_BattlerBase[_0x4a445d(0x11b)]['initMembers'],Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x15f)]=function(){const _0x2394d7=_0x4a445d;VisuMZ[_0x2394d7(0x92)][_0x2394d7(0xd0)][_0x2394d7(0x9c)](this),this['initSkillCooldowns']();},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x17d)]=function(){const _0x3099bc=_0x4a445d;this[_0x3099bc(0x18a)](),this[_0x3099bc(0xcb)]();},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x18a)]=function(){const _0x592be2=_0x4a445d;this[_0x592be2(0xc4)]={};},Game_BattlerBase[_0x4a445d(0x11b)]['cooldown']=function(_0x4685b4){const _0x2464bf=_0x4a445d;if(this['_skillCooldowns']===undefined)this[_0x2464bf(0x17d)]();if(this['isBypassCooldowns']())return 0x0;return this[_0x2464bf(0xc4)][_0x4685b4]||0x0;},Game_BattlerBase['prototype'][_0x4a445d(0x125)]=function(_0x44087a){const _0x21ac3a=_0x4a445d;if(!$gameParty[_0x21ac3a(0x186)]())return!![];if(this['attackSkillId']()===_0x44087a)return!![];if(this[_0x21ac3a(0x14a)]()===_0x44087a)return!![];const _0x16597d=$dataSkills[_0x44087a];if(_0x16597d&&_0x16597d[_0x21ac3a(0x15d)]['match'](/<BYPASS COOLDOWNS>/i))return!![];if(_0x16597d&&_0x16597d[_0x21ac3a(0x12d)][_0x21ac3a(0x11c)]()===_0x21ac3a(0xcc))return!![];return![];},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0xbe)]=function(_0xe1ca00){const _0xc88b9=_0x4a445d;if(!$gameParty['inBattle']())return;const _0x539cb8=VisuMZ[_0xc88b9(0x92)]['Settings'][_0xc88b9(0x109)];if(_0x539cb8[_0xc88b9(0x19e)])_0x539cb8[_0xc88b9(0x19e)][_0xc88b9(0x9c)](this,_0xe1ca00);VisuMZ['SkillCooldowns']['onCooldownUpdateJS'][_0xe1ca00]&&VisuMZ[_0xc88b9(0x92)]['onCooldownUpdateJS'][_0xe1ca00][_0xc88b9(0x9c)](this,_0xe1ca00);},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x14c)]=function(_0x66b284){const _0x391bab=_0x4a445d;if(!$gameParty[_0x391bab(0x186)]())return;const _0x2dbb4c=VisuMZ[_0x391bab(0x92)][_0x391bab(0x10a)][_0x391bab(0x109)];if(_0x2dbb4c[_0x391bab(0xed)])_0x2dbb4c['OnReadyJS'][_0x391bab(0x9c)](this,_0x66b284);VisuMZ[_0x391bab(0x92)][_0x391bab(0xeb)][_0x66b284]&&VisuMZ['SkillCooldowns'][_0x391bab(0xeb)][_0x66b284]['call'](this,_0x66b284);},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x199)]=function(_0x3533d3,_0x3ef578){const _0x16140c=_0x4a445d;if(this[_0x16140c(0xc4)]===undefined)this[_0x16140c(0x17d)]();if(this[_0x16140c(0x125)](_0x3533d3))return;_0x3ef578=Math[_0x16140c(0x150)](_0x3ef578),_0x3ef578=_0x3ef578[_0x16140c(0x17c)](0x0,VisuMZ[_0x16140c(0x92)][_0x16140c(0x10a)][_0x16140c(0x109)][_0x16140c(0xdf)]);const _0x3af0bc=this[_0x16140c(0xe0)](_0x3533d3);;this[_0x16140c(0xc4)][_0x3533d3]=_0x3ef578;if(this[_0x16140c(0xc4)][_0x3533d3]<=0x0){if(_0x16140c(0x161)==='zWbWy'){if(_0x3af0bc>0x0)this[_0x16140c(0x14c)](_0x3533d3);delete this['_skillCooldowns'][_0x3533d3];}else _0xccfcb8[_0x16140c(0x92)][_0x16140c(0x147)]['call'](this,_0x2035b5),this[_0x16140c(0x100)](_0x21b498);}},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0xdd)]=function(_0x379be5,_0x2cdb15){const _0x5aeeed=_0x4a445d;if(this[_0x5aeeed(0xc4)]===undefined)this[_0x5aeeed(0x17d)]();this[_0x5aeeed(0xc4)][_0x379be5]=this[_0x5aeeed(0xc4)][_0x379be5]||0x0,this[_0x5aeeed(0x199)](_0x379be5,this[_0x5aeeed(0xc4)][_0x379be5]+_0x2cdb15);},Game_BattlerBase[_0x4a445d(0x11b)]['applyCooldown']=function(_0x35e230,_0x28c779){const _0x325800=_0x4a445d;_0x28c779=this[_0x325800(0xd5)](_0x35e230,_0x28c779,_0x325800(0x156)),this['setCooldown'](_0x35e230,Math[_0x325800(0xe4)](_0x28c779,this[_0x325800(0xe0)](_0x35e230)));},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x173)]=function(_0x45b0b6,_0x5704fa){const _0x176cb4=_0x4a445d;for(const _0x51de24 of this[_0x176cb4(0xf0)]()){if(_0x176cb4(0xb8)!==_0x176cb4(0xb8)){const _0x421944=_0x54ab14[_0x176cb4(0x92)][_0x176cb4(0x10a)];if(_0x421944['Warmup'][_0x176cb4(0x126)]&&_0x1d21b4[_0x176cb4(0x172)](_0x171fac['id'])>0x0)this[_0x176cb4(0xf7)](_0x2e2d92,_0x5618cd,_0x84ada5,_0xdb6cbb,_0x5427f0);else _0x421944[_0x176cb4(0x109)]['Show']&&_0x53520d[_0x176cb4(0xe0)](_0x3c4838['id'])>0x0?this[_0x176cb4(0x101)](_0x44b542,_0x3ccaa9,_0x5aafeb,_0x3e0e5d,_0x41553b):_0x2e34e2[_0x176cb4(0x92)][_0x176cb4(0x192)][_0x176cb4(0x9c)](this,_0x3074a7,_0x48bd1c,_0x3150ea,_0x10093a,_0x2f13f1);}else{if(_0x51de24){const _0x3af1f4=DataManager[_0x176cb4(0xd4)](_0x51de24);_0x3af1f4[_0x176cb4(0x165)](_0x45b0b6)&&this[_0x176cb4(0x104)](_0x51de24['id'],_0x5704fa);}}}},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x128)]=function(_0x5e531f){const _0x32b0f1=_0x4a445d;for(const _0x45ae84 of this[_0x32b0f1(0xf0)]()){_0x45ae84&&this[_0x32b0f1(0x104)](_0x45ae84['id'],_0x5e531f);}},Game_BattlerBase[_0x4a445d(0x11b)]['updateCooldowns']=function(_0x40b374){const _0x2192af=_0x4a445d;_0x40b374=_0x40b374||0x1;for(const _0xc5a03d in this[_0x2192af(0xc4)]){if('BGaJr'!==_0x2192af(0xf8)){const _0x4e392c=this[_0x2192af(0xc4)][_0xc5a03d]||0x0;this[_0x2192af(0xc4)][_0xc5a03d]-=_0x40b374,this[_0x2192af(0xbe)](_0xc5a03d);if(this[_0x2192af(0xc4)][_0xc5a03d]<=0x0){if(_0x4e392c>0x0)this[_0x2192af(0x14c)](_0xc5a03d);delete this[_0x2192af(0xc4)][_0xc5a03d];}}else _0x834804&&this[_0x2192af(0x104)](_0xd535b['id'],_0xad1b21);}},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0xcb)]=function(){const _0x4d8549=_0x4a445d;this[_0x4d8549(0xbd)]={};},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0xca)]=function(_0x22a961){const _0x4ff481=_0x4a445d;return this['rawWarmup'](_0x22a961)+this[_0x4ff481(0xe0)](_0x22a961);},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x172)]=function(_0x4c41db){const _0x493f88=_0x4a445d;if(this[_0x493f88(0xbd)]===undefined)this[_0x493f88(0x17d)]();if(this[_0x493f88(0xd1)]())return 0x0;return this[_0x493f88(0xbd)][_0x4c41db]||0x0;},Game_BattlerBase[_0x4a445d(0x11b)]['isBypassWarmups']=function(_0x335b02){const _0x9fe10a=_0x4a445d;if(this[_0x9fe10a(0xae)]()===_0x335b02)return!![];if(this['guardSkillId']()===_0x335b02)return!![];const _0x49e48c=$dataSkills[_0x335b02];if(_0x49e48c&&_0x49e48c[_0x9fe10a(0x15d)][_0x9fe10a(0x9f)](/<BYPASS WARMUPS>/i))return!![];if(_0x49e48c&&_0x49e48c['name'][_0x9fe10a(0x11c)]()===_0x9fe10a(0xcc))return!![];return![];},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x111)]=function(_0x20c47d){const _0x30c9e8=_0x4a445d;if(!$gameParty[_0x30c9e8(0x186)]())return;const _0x34abe9=VisuMZ[_0x30c9e8(0x92)][_0x30c9e8(0x10a)][_0x30c9e8(0x16f)];if(_0x34abe9[_0x30c9e8(0x19e)])_0x34abe9['OnUpdateJS']['call'](this,_0x20c47d);VisuMZ['SkillCooldowns'][_0x30c9e8(0xd2)][_0x20c47d]&&VisuMZ[_0x30c9e8(0x92)]['onWarmupUpdateJS'][_0x20c47d][_0x30c9e8(0x9c)](this,_0x20c47d);},Game_BattlerBase['prototype'][_0x4a445d(0xe5)]=function(_0x596e13){const _0x28c057=_0x4a445d;if(!$gameParty['inBattle']())return;const _0x4a7c91=VisuMZ[_0x28c057(0x92)][_0x28c057(0x10a)][_0x28c057(0x16f)];if(_0x4a7c91['OnReadyJS'])_0x4a7c91[_0x28c057(0xed)][_0x28c057(0x9c)](this,_0x596e13);},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0xe1)]=function(_0x1758bb,_0x10708b){const _0x141825=_0x4a445d;if(this[_0x141825(0xbd)]===undefined)this[_0x141825(0x17d)]();if(this[_0x141825(0xd1)](_0x1758bb))return;_0x10708b=Math['ceil'](_0x10708b),_0x10708b=_0x10708b[_0x141825(0x17c)](0x0,VisuMZ[_0x141825(0x92)]['Settings'][_0x141825(0x16f)][_0x141825(0xdf)]);const _0xa81f18=this[_0x141825(0x172)](_0x1758bb);;this[_0x141825(0xbd)][_0x1758bb]=_0x10708b;if(this[_0x141825(0xbd)][_0x1758bb]<=0x0){if(_0xa81f18>0x0)this[_0x141825(0xe5)](_0x1758bb);delete this['_skillWarmups'][_0x1758bb];}},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x19b)]=function(_0x2b4998,_0x34865f){const _0x5218d3=_0x4a445d;if(this[_0x5218d3(0xbd)]===undefined)this[_0x5218d3(0x17d)]();this['_skillWarmups'][_0x2b4998]=this['_skillWarmups'][_0x2b4998]||0x0;if(this[_0x5218d3(0xca)](_0x2b4998)<=0x0)return;this['setWarmup'](_0x2b4998,this[_0x5218d3(0xbd)][_0x2b4998]+_0x34865f);},Game_BattlerBase['prototype']['applyWarmup']=function(_0x79de34,_0x31052b){const _0x117366=_0x4a445d;_0x31052b=this[_0x117366(0xd5)](_0x79de34,_0x31052b,'WARMUP'),this[_0x117366(0xe1)](_0x79de34,Math[_0x117366(0xe4)](_0x31052b,this[_0x117366(0xca)](_0x79de34)));},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x152)]=function(_0x4157e2){const _0x3c4925=_0x4a445d;_0x4157e2=_0x4157e2||0x1;for(const _0x24e1dd in this[_0x3c4925(0xbd)]){const _0x5694d5=this[_0x3c4925(0xbd)][_0x24e1dd]||0x0;this['_skillWarmups'][_0x24e1dd]-=_0x4157e2;if(this['_skillWarmups'][_0x24e1dd]<=0x0){if(_0x3c4925(0x12c)!==_0x3c4925(0x12c))_0x2a8f16[_0x3c4925(0xcb)]();else{if(_0x5694d5>0x0)this[_0x3c4925(0xe5)](_0x24e1dd);delete this[_0x3c4925(0xbd)][_0x24e1dd];}}}},VisuMZ[_0x4a445d(0x92)]['Game_BattlerBase_meetsSkillConditions']=Game_BattlerBase['prototype'][_0x4a445d(0x118)],Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x118)]=function(_0x4a0dce){const _0x1720bb=_0x4a445d;if(!VisuMZ[_0x1720bb(0x92)]['Game_BattlerBase_meetsSkillConditions']['call'](this,_0x4a0dce))return![];if(!this['areSkillWarmupsReady'](_0x4a0dce))return![];if(!this[_0x1720bb(0x10d)](_0x4a0dce))return![];return!![];},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0xdb)]=function(_0x4d4d69){const _0x3e6fe0=_0x4a445d;return this[_0x3e6fe0(0x172)](_0x4d4d69['id'])<=0x0;},Game_BattlerBase['prototype']['areSkillCooldownsReady']=function(_0x20b09b){return this['cooldown'](_0x20b09b['id'])<=0x0;},VisuMZ['SkillCooldowns']['Game_BattlerBase_paySkillCost']=Game_BattlerBase[_0x4a445d(0x11b)]['paySkillCost'],Game_BattlerBase['prototype'][_0x4a445d(0xa3)]=function(_0x25d484){const _0x51414f=_0x4a445d;VisuMZ[_0x51414f(0x92)][_0x51414f(0x147)][_0x51414f(0x9c)](this,_0x25d484),this[_0x51414f(0x100)](_0x25d484);},Game_BattlerBase['prototype'][_0x4a445d(0xba)]=function(_0x4beb63,_0x47dc5f){const _0x1802f9=_0x4a445d;return Imported[_0x1802f9(0x12b)]&&(_0x47dc5f=this['applyMasteryEffectCooldownTurns'](_0x4beb63,_0x47dc5f)),_0x47dc5f;},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x100)]=function(_0x3a10de){const _0x3cb14b=_0x4a445d;if(!$gameParty[_0x3cb14b(0x186)]())return;const _0x41cd90=_0x3a10de[_0x3cb14b(0x15d)];if(_0x41cd90[_0x3cb14b(0x9f)](/<COOLDOWN:[ ](\d+)>/i)){if(_0x3cb14b(0x181)===_0x3cb14b(0x120))this[_0x3cb14b(0x178)]()[_0x3cb14b(0xdd)](_0x45cc6f['id'],_0x12abd5);else{let _0x535c4f=Number(RegExp['$1']);_0x535c4f=this[_0x3cb14b(0xba)](_0x3a10de,_0x535c4f),this[_0x3cb14b(0x104)](_0x3a10de['id'],_0x535c4f);}}if(VisuMZ['SkillCooldowns'][_0x3cb14b(0x149)][_0x3a10de['id']]){if(_0x3cb14b(0x158)!==_0x3cb14b(0x163))VisuMZ[_0x3cb14b(0x92)][_0x3cb14b(0x149)][_0x3a10de['id']][_0x3cb14b(0x9c)](this,_0x3a10de);else{const _0x4b50bb=_0x303f1b[_0x3cb14b(0x92)][_0x3cb14b(0x10a)]['Warmup'][_0x3cb14b(0x148)]||0x0;this['updateWarmups'](_0x4b50bb);}}const _0x4d22b0=_0x41cd90[_0x3cb14b(0x9f)](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x4d22b0)for(const _0x2f1b08 of _0x4d22b0){let _0x9fc575=0x0,_0x4d05b8=0x0;if(_0x2f1b08[_0x3cb14b(0x9f)](/<SKILL[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/gi))_0x9fc575=Number(RegExp['$1']),_0x4d05b8=Number(RegExp['$2']);else{if(_0x2f1b08['match'](/<SKILL[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi)){if(_0x3cb14b(0x105)===_0x3cb14b(0x11f)){let _0x2366c8=_0x41bf2d(_0x3421ec['$1']);_0x2366c8=this[_0x3cb14b(0xba)](_0x2ef389,_0x2366c8),this[_0x3cb14b(0x128)](_0x2366c8);}else _0x9fc575=DataManager['getSkillIdWithName'](RegExp['$1']),_0x4d05b8=Number(RegExp['$2']);}}const _0x2a0391=$dataSkills[_0x9fc575];if(_0x2a0391){if(_0x3cb14b(0x187)===_0x3cb14b(0x18f)){const _0xc9caaf=_0x25f8ce[_0x3cb14b(0x92)][_0x3cb14b(0x10a)]['Warmup'];let _0x3555e4='';_0x3555e4+=_0x3cb14b(0x174)[_0x3cb14b(0x183)](_0xc9caaf[_0x3cb14b(0xa2)]);const _0x587737=_0xc9caaf[_0x3cb14b(0x10b)];_0x587737[_0x3cb14b(0x9f)](/#(.*)/i)&&_0x4bf9ec[_0x3cb14b(0xe8)]?_0x3555e4+=_0x3cb14b(0x159)[_0x3cb14b(0x183)](_0x20798f(_0x34309a['$1'])):_0x3555e4+=_0x3cb14b(0xda)[_0x3cb14b(0x183)](_0x587737);const _0x474a8f=_0x3c10b0['warmup'](_0x25ab2b['id']),_0x3446af=_0xc9caaf[_0x3cb14b(0xe9)]>0x0?'\x5cI[%1]'['format'](_0xc9caaf[_0x3cb14b(0xe9)]):'';_0x3555e4+=_0xc9caaf[_0x3cb14b(0x162)][_0x3cb14b(0x183)](_0x474a8f,_0x3446af);const _0xe7c025=this[_0x3cb14b(0xb6)](_0x3555e4,_0x20dabc,_0x7462e6,_0x1fa962),_0x3079ae=_0x53ae50+_0x32bb79-_0xe7c025[_0x3cb14b(0x155)];this[_0x3cb14b(0xb5)](_0x3555e4,_0x3079ae,_0x6e19bf,_0x300850),this[_0x3cb14b(0x114)]();}else _0x4d05b8=this['alterPaySkillCooldownModifier'](_0x3a10de,_0x4d05b8),this[_0x3cb14b(0x104)](_0x2a0391['id'],_0x4d05b8);}}const _0x2c18aa=_0x41cd90[_0x3cb14b(0x9f)](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/gi);if(_0x2c18aa)for(const _0x34164b of _0x2c18aa){if(_0x3cb14b(0xdc)===_0x3cb14b(0x98))for(const _0x41aac3 of _0x345657){let _0x30386f=0x0,_0x272744=0x0;if(_0x41aac3[_0x3cb14b(0x9f)](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i))_0x30386f=_0x30583f(_0x43f96d['$1']),_0x272744=_0x3488c4(_0xa4e584['$2']);else _0x41aac3['match'](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x30386f=_0x373928['getStypeIdWithName'](_0x120eb6['$1']),_0x272744=_0x5c326a(_0x5f19b6['$2']));_0x272744=this[_0x3cb14b(0xba)](_0x501941,_0x272744),this[_0x3cb14b(0x173)](_0x30386f,_0x272744);}else{let _0x28225f=0x0,_0x566808=0x0;if(_0x34164b[_0x3cb14b(0x9f)](/<STYPE[ ](\d+)[ ]COOLDOWN:[ ](\d+)>/i)){if(_0x3cb14b(0x99)!==_0x3cb14b(0x99)){if(!_0x344a52[_0x3cb14b(0x186)]())return;const _0x292fc0=_0x24b2c1[_0x3cb14b(0x92)][_0x3cb14b(0x10a)][_0x3cb14b(0x109)];if(_0x292fc0['OnReadyJS'])_0x292fc0['OnReadyJS'][_0x3cb14b(0x9c)](this,_0x37520f);_0x3d75ba[_0x3cb14b(0x92)][_0x3cb14b(0xeb)][_0x571d3c]&&_0x8276b4['SkillCooldowns'][_0x3cb14b(0xeb)][_0x16c96e]['call'](this,_0x469cdb);}else _0x28225f=Number(RegExp['$1']),_0x566808=Number(RegExp['$2']);}else _0x34164b[_0x3cb14b(0x9f)](/<STYPE[ ](.*)[ ]COOLDOWN:[ ](\d+)>/i)&&(_0x28225f=DataManager[_0x3cb14b(0x16e)](RegExp['$1']),_0x566808=Number(RegExp['$2']));_0x566808=this[_0x3cb14b(0xba)](_0x3a10de,_0x566808),this[_0x3cb14b(0x173)](_0x28225f,_0x566808);}}if(_0x41cd90[_0x3cb14b(0x9f)](/<GLOBAL COOLDOWN:[ ](\d+)>/i)){if(_0x3cb14b(0x124)!==_0x3cb14b(0x124)){if(_0x40dd0d>0x0)this['onCooldownReady'](_0x14285a);delete this['_skillCooldowns'][_0x30aeaf];}else{let _0x5b8209=Number(RegExp['$1']);_0x5b8209=this[_0x3cb14b(0xba)](_0x3a10de,_0x5b8209),this[_0x3cb14b(0x128)](_0x5b8209);}}},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0xd5)]=function(_0xeb668c,_0x495afb,_0x22aea4){const _0x78170c=_0x4a445d,_0x226478=$dataSkills[_0xeb668c];if(!_0x226478)return _0x495afb;const _0x43077a=this[_0x78170c(0xcd)](_0x226478,_0x22aea4,_0x78170c(0xe2)),_0x4fdb09=this[_0x78170c(0x14d)](_0x226478,_0x22aea4,_0x78170c(0x184)),_0xb05f71=this['applyCDWUnotetagsFlat'](_0x226478,_0x22aea4,'FLAT');return Math[_0x78170c(0x150)]((_0x495afb+_0x43077a)*_0x4fdb09+_0xb05f71);},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0x164)]={},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0xcd)]=function(_0x398146,_0x403c09,_0x5bd68e){const _0x470547=_0x4a445d,_0x491b67=_0x398146['id'],_0x539f71=_0x398146[_0x470547(0x12d)][_0x470547(0xb1)](),_0x33dd58=VisuMZ[_0x470547(0x92)][_0x470547(0x164)],_0x508d8a=_0x470547(0x127)['format'](_0x491b67,_0x403c09,_0x5bd68e);_0x33dd58[_0x508d8a]=_0x33dd58[_0x508d8a]||{};const _0x2c0d18='<SKILL\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>';_0x33dd58[_0x508d8a][_0x470547(0xe3)]=_0x33dd58[_0x508d8a][_0x470547(0xe3)]||new RegExp(_0x2c0d18['format'](_0x491b67,_0x403c09,_0x5bd68e),'i'),_0x33dd58[_0x508d8a]['notetag2']=_0x33dd58[_0x508d8a][_0x470547(0x12e)]||new RegExp(_0x2c0d18[_0x470547(0x183)](_0x539f71,_0x403c09,_0x5bd68e),'i');const _0x4e24ba=DataManager[_0x470547(0xd4)](_0x398146);for(const _0x4e3b41 of _0x4e24ba){const _0x571708=_0x470547(0x113)['format'](_0x4e3b41,_0x403c09,_0x5bd68e);let _0x242049=$dataSystem[_0x470547(0x171)][Number(_0x4e3b41)]['toUpperCase']()[_0x470547(0xb1)]();_0x242049=_0x242049[_0x470547(0xb0)](/\x1I\[(\d+)\]/gi,''),_0x242049=_0x242049[_0x470547(0xb0)](/\\I\[(\d+)\]/gi,''),_0x33dd58[_0x571708]=_0x33dd58[_0x571708]||{};const _0x449ee1='<STYPE\x20%1\x20%2\x20%3:[\x20]([\x5c+\x5c-]\x5cd+)>';_0x33dd58[_0x571708][_0x470547(0xe3)]=_0x33dd58[_0x571708]['notetag1']||new RegExp(_0x449ee1[_0x470547(0x183)](_0x4e3b41,_0x403c09,_0x5bd68e),'i'),_0x33dd58[_0x571708]['notetag2']=_0x33dd58[_0x571708][_0x470547(0x12e)]||new RegExp(_0x449ee1[_0x470547(0x183)](_0x242049,_0x403c09,_0x5bd68e),'i');}const _0x12d517='<GLOBAL\x20%1\x20%2:[\x20]([\x5c+\x5c-]\x5cd+)>',_0x3d3b4e=_0x470547(0xb3)[_0x470547(0x183)](_0x403c09,_0x5bd68e);_0x33dd58[_0x3d3b4e]=_0x33dd58[_0x3d3b4e]||new RegExp(_0x12d517[_0x470547(0x183)](_0x403c09,_0x5bd68e),'i');const _0x813322=(_0x3bf398,_0x302386)=>{const _0x2e2d4a=_0x470547;if(!_0x302386)return _0x3bf398;const _0x38b2b5=_0x302386['note'];if(_0x38b2b5['match'](_0x33dd58[_0x508d8a][_0x2e2d4a(0xe3)])){var _0x1fdf88=Number(RegExp['$1']);_0x3bf398+=_0x1fdf88;}if(_0x38b2b5['match'](_0x33dd58[_0x508d8a]['notetag2'])){if(_0x2e2d4a(0x166)==='eSuZD')_0x3e112e=_0x46e990(_0x37802d['$1']),_0x114260=_0x4848e3(_0x49a6d3['$2']);else{var _0x1fdf88=Number(RegExp['$1']);_0x3bf398+=_0x1fdf88;}}for(const _0x5973c3 of _0x4e24ba){const _0x1e8518=_0x2e2d4a(0x113)[_0x2e2d4a(0x183)](_0x5973c3,_0x403c09,_0x5bd68e);if(_0x38b2b5[_0x2e2d4a(0x9f)](_0x33dd58[_0x1e8518][_0x2e2d4a(0xe3)])){var _0x1fdf88=Number(RegExp['$1']);_0x3bf398+=_0x1fdf88;}if(_0x38b2b5[_0x2e2d4a(0x9f)](_0x33dd58[_0x1e8518][_0x2e2d4a(0x12e)])){var _0x1fdf88=Number(RegExp['$1']);_0x3bf398+=_0x1fdf88;}}if(_0x38b2b5['match'](_0x33dd58[_0x3d3b4e])){if(_0x2e2d4a(0x19a)===_0x2e2d4a(0xf5))_0x2b8349=_0x1fc835[_0x2e2d4a(0x11e)](_0x76aeaa['$1']),_0x5347e7=_0x4dc555(_0x5c9e9a['$2']);else{var _0x1fdf88=Number(RegExp['$1']);_0x3bf398+=_0x1fdf88;}}return _0x3bf398;};return this['traitObjects']()[_0x470547(0x17b)](_0x813322,0x0);},Game_BattlerBase[_0x4a445d(0x11b)][_0x4a445d(0x14d)]=function(_0x5f2b58,_0x3d5c88,_0x3dc64f){const _0x1b0528=_0x4a445d,_0x179978=_0x5f2b58['id'],_0x3336c1=_0x5f2b58[_0x1b0528(0x12d)][_0x1b0528(0xb1)](),_0x4ecc0e=VisuMZ['SkillCooldowns'][_0x1b0528(0x164)],_0x5b48e7=_0x1b0528(0xc5),_0xd0b944=_0x1b0528(0xa7),_0x48071c='Skill_%1_%2_%3'[_0x1b0528(0x183)](_0x179978,_0x3d5c88,_0x3dc64f);_0x4ecc0e[_0x48071c]=_0x4ecc0e[_0x48071c]||{};const _0x1d0e13='<SKILL\x20%1\x20%2\x20%3:[\x20]%4>';_0x4ecc0e[_0x48071c][_0x1b0528(0xe3)]=_0x4ecc0e[_0x48071c][_0x1b0528(0xe3)]||new RegExp(_0x1d0e13[_0x1b0528(0x183)](_0x179978,_0x3d5c88,_0x3dc64f,_0x5b48e7),'i'),_0x4ecc0e[_0x48071c]['notetag2']=_0x4ecc0e[_0x48071c][_0x1b0528(0x12e)]||new RegExp(_0x1d0e13['format'](_0x3336c1,_0x3d5c88,_0x3dc64f,_0x5b48e7),'i'),_0x4ecc0e[_0x48071c][_0x1b0528(0x16b)]=_0x4ecc0e[_0x48071c][_0x1b0528(0x16b)]||new RegExp(_0x1d0e13['format'](_0x179978,_0x3d5c88,_0x3dc64f,_0xd0b944),'i'),_0x4ecc0e[_0x48071c][_0x1b0528(0xc3)]=_0x4ecc0e[_0x48071c][_0x1b0528(0xc3)]||new RegExp(_0x1d0e13['format'](_0x3336c1,_0x3d5c88,_0x3dc64f,_0xd0b944),'i');const _0x1b8095=DataManager[_0x1b0528(0xd4)](_0x5f2b58);for(const _0x17e20e of _0x1b8095){if(_0x1b0528(0x182)!==_0x1b0528(0x182))return _0x3a36c8[_0x1b0528(0xac)]&&_0x441f4b[_0x1b0528(0x116)]['includes']('['+_0x59de95+']');else{const _0x1be2b2=_0x1b0528(0x113)[_0x1b0528(0x183)](_0x17e20e,_0x3d5c88,_0x3dc64f);let _0x380add=$dataSystem['skillTypes'][Number(_0x17e20e)]['toUpperCase']()[_0x1b0528(0xb1)]();_0x380add=_0x380add[_0x1b0528(0xb0)](/\x1I\[(\d+)\]/gi,''),_0x380add=_0x380add['replace'](/\\I\[(\d+)\]/gi,''),_0x4ecc0e[_0x1be2b2]=_0x4ecc0e[_0x1be2b2]||{};const _0x320ce7=_0x1b0528(0x197);_0x4ecc0e[_0x1be2b2][_0x1b0528(0xe3)]=_0x4ecc0e[_0x1be2b2][_0x1b0528(0xe3)]||new RegExp(_0x320ce7[_0x1b0528(0x183)](_0x17e20e,_0x3d5c88,_0x3dc64f,_0x5b48e7),'i'),_0x4ecc0e[_0x1be2b2][_0x1b0528(0x12e)]=_0x4ecc0e[_0x1be2b2]['notetag2']||new RegExp(_0x320ce7[_0x1b0528(0x183)](_0x380add,_0x3d5c88,_0x3dc64f,_0x5b48e7),'i'),_0x4ecc0e[_0x1be2b2][_0x1b0528(0x16b)]=_0x4ecc0e[_0x1be2b2]['notetag3']||new RegExp(_0x320ce7[_0x1b0528(0x183)](_0x17e20e,_0x3d5c88,_0x3dc64f,_0xd0b944),'i'),_0x4ecc0e[_0x1be2b2]['notetag4']=_0x4ecc0e[_0x1be2b2][_0x1b0528(0xc3)]||new RegExp(_0x320ce7['format'](_0x380add,_0x3d5c88,_0x3dc64f,_0xd0b944),'i');}}const _0xa8b929=_0x1b0528(0xa6),_0x56acb2='Global_%1_%2'[_0x1b0528(0x183)](_0x3d5c88,_0x3dc64f);_0x4ecc0e[_0x56acb2]=_0x4ecc0e[_0x56acb2]||{},_0x4ecc0e[_0x56acb2][_0x1b0528(0xe3)]=_0x4ecc0e[_0x56acb2]['notetag1']||new RegExp(_0xa8b929[_0x1b0528(0x183)](_0x3d5c88,_0x3dc64f,_0x5b48e7),'i'),_0x4ecc0e[_0x56acb2][_0x1b0528(0x12e)]=_0x4ecc0e[_0x56acb2]['notetag2']||new RegExp(_0xa8b929[_0x1b0528(0x183)](_0x3d5c88,_0x3dc64f,_0xd0b944),'i');const _0x1bfd59=(_0x811f86,_0x4a5e81)=>{const _0x142f68=_0x1b0528;if(_0x142f68(0x123)!==_0x142f68(0x13c)){if(!_0x4a5e81)return _0x811f86;const _0x28a4b5=_0x4a5e81['note'];if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x48071c][_0x142f68(0xe3)])){if(_0x142f68(0x13d)===_0x142f68(0x93)){var _0x5e7fe0=_0x10f401(_0x20ca5b['$1']);_0x2aa18f*=_0x5e7fe0;}else{var _0x5f1382=Number(RegExp['$1'])/0x64;_0x811f86*=_0x5f1382;}}if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x48071c][_0x142f68(0x12e)])){var _0x5f1382=Number(RegExp['$1'])/0x64;_0x811f86*=_0x5f1382;}if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x48071c][_0x142f68(0x16b)])){if(_0x142f68(0x133)===_0x142f68(0x137)){const _0x2a20e1=_0x160208[_0x4168e4];if(!_0x2a20e1)return _0x304b15;const _0x51616=this['applyCDWUnotetagsFlat'](_0x2a20e1,_0x185f90,'PLUS'),_0x363f07=this[_0x142f68(0x14d)](_0x2a20e1,_0x5f54b6,_0x142f68(0x184)),_0x810112=this[_0x142f68(0xcd)](_0x2a20e1,_0x5f4588,_0x142f68(0x195));return _0xf891cc[_0x142f68(0x150)]((_0x110df6+_0x51616)*_0x363f07+_0x810112);}else{var _0x5f1382=Number(RegExp['$1']);_0x811f86*=_0x5f1382;}}if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x48071c][_0x142f68(0xc3)])){var _0x5f1382=Number(RegExp['$1']);_0x811f86*=_0x5f1382;}for(const _0x421308 of _0x1b8095){const _0x4a0eef=_0x142f68(0x113)['format'](_0x421308,_0x3d5c88,_0x3dc64f);if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x4a0eef][_0x142f68(0xe3)])){var _0x5f1382=Number(RegExp['$1'])/0x64;_0x811f86*=_0x5f1382;}if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x4a0eef][_0x142f68(0x12e)])){var _0x5f1382=Number(RegExp['$1'])/0x64;_0x811f86*=_0x5f1382;}if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x4a0eef]['notetag3'])){var _0x5f1382=Number(RegExp['$1']);_0x811f86*=_0x5f1382;}if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x4a0eef]['notetag4'])){var _0x5f1382=Number(RegExp['$1']);_0x811f86*=_0x5f1382;}}if(_0x28a4b5[_0x142f68(0x9f)](_0x4ecc0e[_0x56acb2]['notetag1'])){var _0x5f1382=Number(RegExp['$1'])/0x64;_0x811f86*=_0x5f1382;}if(_0x28a4b5['match'](_0x4ecc0e[_0x56acb2][_0x142f68(0x12e)])){if(_0x142f68(0x196)!==_0x142f68(0x170)){var _0x5f1382=Number(RegExp['$1']);_0x811f86*=_0x5f1382;}else{var _0x1bdef0=_0x2f6666(_0x2dbf37['$1']);_0x3aa3bb*=_0x1bdef0;}}return _0x811f86;}else{const _0x300364=_0x2c7d77[_0x142f68(0x92)][_0x142f68(0x10a)][_0x142f68(0x109)];let _0x3699c8='';_0x3699c8+=_0x142f68(0x174)['format'](_0x300364[_0x142f68(0xa2)]);const _0x33cb7d=_0x300364[_0x142f68(0x10b)];_0x33cb7d[_0x142f68(0x9f)](/#(.*)/i)&&_0x432094[_0x142f68(0xe8)]?_0x3699c8+=_0x142f68(0x159)[_0x142f68(0x183)](_0x31cc2e(_0x4da023['$1'])):_0x3699c8+=_0x142f68(0xda)['format'](_0x33cb7d);const _0x26729c=_0x114ba3['cooldown'](_0x33260d['id']),_0x120de6=_0x300364['Icon']>0x0?_0x142f68(0xad)[_0x142f68(0x183)](_0x300364[_0x142f68(0xe9)]):'';_0x3699c8+=_0x300364[_0x142f68(0x162)][_0x142f68(0x183)](_0x26729c,_0x120de6);const _0x278ece=this[_0x142f68(0xb6)](_0x3699c8,_0x6e4ce0,_0x574950,_0x54699f),_0x5e8a4a=_0x5ecb85+_0x3054c5-_0x278ece[_0x142f68(0x155)];this['drawTextEx'](_0x3699c8,_0x5e8a4a,_0x16e2d1,_0x4f5370),this[_0x142f68(0x114)]();}};return this['traitObjects']()['reduce'](_0x1bfd59,0x1);},VisuMZ[_0x4a445d(0x92)]['Game_Battler_onBattleStart']=Game_Battler['prototype'][_0x4a445d(0x96)],Game_Battler[_0x4a445d(0x11b)]['onBattleStart']=function(_0x5225ca){const _0x5cb4d4=_0x4a445d;VisuMZ[_0x5cb4d4(0x92)]['Game_Battler_onBattleStart'][_0x5cb4d4(0x9c)](this,_0x5225ca);if(this[_0x5cb4d4(0x177)]){this['_previousBattleChain']=undefined;return;}this[_0x5cb4d4(0x18a)](),this['clearWarmups'](),this[_0x5cb4d4(0xd6)](_0x5225ca);},Game_Battler[_0x4a445d(0x11b)]['prepareSkillWarmups']=function(_0x4606e2){const _0x2178f4=_0x4a445d;for(const _0x1c6b82 of this['skills']()){if(!_0x1c6b82)continue;const _0x11f832=_0x1c6b82['id'],_0xd96fdb=_0x1c6b82[_0x2178f4(0x15d)];_0xd96fdb[_0x2178f4(0x9f)](/<WARMUP:[ ](\d+)>/i)&&this[_0x2178f4(0x15b)](_0x11f832,Number(RegExp['$1'])),VisuMZ[_0x2178f4(0x92)][_0x2178f4(0x16a)][_0x1c6b82['id']]&&VisuMZ[_0x2178f4(0x92)][_0x2178f4(0x16a)][_0x1c6b82['id']]['call'](this,_0x1c6b82);}if(_0x4606e2){if(_0x2178f4(0x9d)!==_0x2178f4(0x9d)){var _0x10f97f=_0x3d3d75(_0x253006['$1'])/0x64;_0x120805*=_0x10f97f;}else{const _0x3b974d=VisuMZ[_0x2178f4(0x92)]['Settings'][_0x2178f4(0x16f)]['Preemptive']||0x0;this[_0x2178f4(0x152)](_0x3b974d);}}},Game_Battler['prototype'][_0x4a445d(0x142)]=function(){const _0x5bb80f=_0x4a445d;if(this['_updatedSkillCooldowns'])return;if(this[_0x5bb80f(0x18b)])return;this[_0x5bb80f(0x117)]=!![],this[_0x5bb80f(0x130)](),this['updateWarmups']();},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0x193)]=Game_Battler[_0x4a445d(0x11b)]['onTurnEnd'],Game_Battler[_0x4a445d(0x11b)][_0x4a445d(0xf3)]=function(){const _0x51320d=_0x4a445d;this[_0x51320d(0x117)]=![],VisuMZ[_0x51320d(0x92)][_0x51320d(0x193)]['call'](this);},VisuMZ[_0x4a445d(0x92)][_0x4a445d(0x18c)]=Game_Battler[_0x4a445d(0x11b)][_0x4a445d(0x16c)],Game_Battler[_0x4a445d(0x11b)][_0x4a445d(0x16c)]=function(){const _0xac1cfd=_0x4a445d;VisuMZ[_0xac1cfd(0x92)][_0xac1cfd(0x18c)][_0xac1cfd(0x9c)](this);if(Imported['VisuMZ_3_ChainBattles']&&$gameTemp[_0xac1cfd(0x108)]()){this[_0xac1cfd(0x177)]=!![];return;}this[_0xac1cfd(0x18a)](),this[_0xac1cfd(0xcb)]();},VisuMZ['SkillCooldowns'][_0x4a445d(0x192)]=Window_Base['prototype'][_0x4a445d(0x160)],Window_Base['prototype'][_0x4a445d(0x160)]=function(_0x22bbb4,_0x314ea5,_0xc81517,_0x5b061e,_0x5ac05e){const _0x39a41f=_0x4a445d,_0xd888b1=VisuMZ['SkillCooldowns']['Settings'];if(_0xd888b1[_0x39a41f(0x16f)]['Show']&&_0x22bbb4['rawWarmup'](_0x314ea5['id'])>0x0){if(_0x39a41f(0x154)!=='Pvjhb')this[_0x39a41f(0xf7)](_0x22bbb4,_0x314ea5,_0xc81517,_0x5b061e,_0x5ac05e);else{const _0x9afd8f=_0x55a27d(_0x1b4b98['$1']);for(const _0x25da53 of _0x3f7200[_0x39a41f(0xf0)]()){_0x25da53&&_0x157285[_0x39a41f(0x19b)](_0x25da53['id'],_0x9afd8f);}}}else _0xd888b1['Cooldown'][_0x39a41f(0x126)]&&_0x22bbb4[_0x39a41f(0xe0)](_0x314ea5['id'])>0x0?this[_0x39a41f(0x101)](_0x22bbb4,_0x314ea5,_0xc81517,_0x5b061e,_0x5ac05e):VisuMZ[_0x39a41f(0x92)][_0x39a41f(0x192)][_0x39a41f(0x9c)](this,_0x22bbb4,_0x314ea5,_0xc81517,_0x5b061e,_0x5ac05e);},Window_Base['prototype'][_0x4a445d(0xf7)]=function(_0x4df708,_0x134291,_0x4c5d0a,_0x250ece,_0x4584ba){const _0xd60acb=_0x4a445d,_0x147732=VisuMZ[_0xd60acb(0x92)][_0xd60acb(0x10a)][_0xd60acb(0x16f)];let _0x4179ec='';_0x4179ec+=_0xd60acb(0x174)[_0xd60acb(0x183)](_0x147732['FontSize']);const _0x32af4b=_0x147732['FontColor'];if(_0x32af4b[_0xd60acb(0x9f)](/#(.*)/i)&&Imported[_0xd60acb(0xe8)])'fwOsL'===_0xd60acb(0x103)?_0x4179ec+=_0xd60acb(0x159)[_0xd60acb(0x183)](String(RegExp['$1'])):this[_0xd60acb(0xc4)]={};else{if('YvkoD'==='oSXpb')for(const _0x36aec8 of _0x536dfa){let _0x52c4d9=0x0,_0x27fd1b=0x0;if(_0x36aec8[_0xd60acb(0x9f)](/<USER SKILL[ ](\d+)[ ]WARMUP:[ ]([\+\-]\d+)>/i))_0x52c4d9=_0x24496e(_0x148810['$1']),_0x27fd1b=_0x2abe50(_0xf94954['$2']);else _0x36aec8[_0xd60acb(0x9f)](/<USER SKILL[ ](.*)[ ]WARMUP:[ ]([\+\-]\d+)>/i)&&(_0x52c4d9=_0x517492[_0xd60acb(0x11e)](_0x367e02['$1']),_0x27fd1b=_0x336266(_0x1f4f7a['$2']));this[_0xd60acb(0x178)]()['addWarmup'](_0x52c4d9,_0x27fd1b);}else _0x4179ec+=_0xd60acb(0xda)[_0xd60acb(0x183)](_0x32af4b);}const _0x46bf26=_0x4df708[_0xd60acb(0xca)](_0x134291['id']),_0xdd1b8=_0x147732[_0xd60acb(0xe9)]>0x0?_0xd60acb(0xad)[_0xd60acb(0x183)](_0x147732[_0xd60acb(0xe9)]):'';_0x4179ec+=_0x147732[_0xd60acb(0x162)][_0xd60acb(0x183)](_0x46bf26,_0xdd1b8);const _0x4edf56=this[_0xd60acb(0xb6)](_0x4179ec,_0x4c5d0a,_0x250ece,_0x4584ba),_0x3e31c1=_0x4c5d0a+_0x4584ba-_0x4edf56[_0xd60acb(0x155)];this['drawTextEx'](_0x4179ec,_0x3e31c1,_0x250ece,_0x4584ba),this[_0xd60acb(0x114)]();},Window_Base[_0x4a445d(0x11b)][_0x4a445d(0x101)]=function(_0x21dfdf,_0x4ac357,_0x597dc5,_0x6db12b,_0x23a04c){const _0x4e1047=_0x4a445d,_0x34b5ea=VisuMZ[_0x4e1047(0x92)][_0x4e1047(0x10a)]['Cooldown'];let _0x235718='';_0x235718+=_0x4e1047(0x174)[_0x4e1047(0x183)](_0x34b5ea[_0x4e1047(0xa2)]);const _0x33fed0=_0x34b5ea[_0x4e1047(0x10b)];if(_0x33fed0[_0x4e1047(0x9f)](/#(.*)/i)&&Imported[_0x4e1047(0xe8)])_0x235718+=_0x4e1047(0x159)[_0x4e1047(0x183)](String(RegExp['$1']));else{if(_0x4e1047(0x167)!==_0x4e1047(0x167))return _0xba9da0[_0x4e1047(0x12b)]&&(_0x51475d=this[_0x4e1047(0x190)](_0x44f956,_0x440c53)),_0x1a1aa4;else _0x235718+=_0x4e1047(0xda)[_0x4e1047(0x183)](_0x33fed0);}const _0x2e42c4=_0x21dfdf[_0x4e1047(0xe0)](_0x4ac357['id']),_0x2f157b=_0x34b5ea['Icon']>0x0?'\x5cI[%1]'[_0x4e1047(0x183)](_0x34b5ea[_0x4e1047(0xe9)]):'';_0x235718+=_0x34b5ea['TextFmt'][_0x4e1047(0x183)](_0x2e42c4,_0x2f157b);const _0x192e05=this[_0x4e1047(0xb6)](_0x235718,_0x597dc5,_0x6db12b,_0x23a04c),_0xd9dc89=_0x597dc5+_0x23a04c-_0x192e05['width'];this[_0x4e1047(0xb5)](_0x235718,_0xd9dc89,_0x6db12b,_0x23a04c),this[_0x4e1047(0x114)]();};