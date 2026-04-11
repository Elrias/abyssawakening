//=============================================================================
// VisuStella MZ - Skill Learn System
// VisuMZ_2_SkillLearnSystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_SkillLearnSystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillLearnSystem = VisuMZ.SkillLearnSystem || {};
VisuMZ.SkillLearnSystem.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.11] [SkillLearnSystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skill_Learn_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This plugin lets your game's actors have an alternative way of learning
 * skills aside from leveling up. Instead, they can learn skills through the
 * in-game skill menu, where they can trade gold, items, or the brand new
 * resources made available by this plugin: Ability Points and/or Skill Points.
 * 
 * Ability Points and Skill Points are new resources provided by this plugin
 * that can be acquired in a variety of ways, of which, you can set through its
 * mechanical settings in the Plugin Parameters. These can be through leveling
 * up, performing actions, and/or defeating enemies.
 * 
 * When learning skills through this plugin's in-game system, skills can have
 * a variety of costs and requirements. These requirements can come in the form
 * of needing to be at a certain level, having specific skills learned, and/or
 * having certain switches on.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Actors can now learn new skills from the in-game skill menu under the
 *   new "Learn" command.
 * * In this new menu, actors can spend various resources to learn new skills.
 * * These resources can be Ability Points, Skill Points, items, and more.
 * * Ability Points and Skill Points are brand new resources added through this
 *   plugin which can be acquired through a variety a means ranging from
 *   participating in battle, defeating enemies, and/or leveling up.
 * * Learnable skills may have requirements that need to be first met even if
 *   the actor has the available resources.
 * * Skill learning requirements can include levels, having other skills
 *   learned, and/or enabled switches.
 * * Play animations upon learning a new skill inside the menu.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * Battle Test
 *
 * When doing a battle test through the database, all of an actor's learnable
 * skills through the Skill Learn System's notetags will become available for
 * the test battle to reduce the need to manually add them.
 *
 * ---
 *
 * VisuMZ_3_VictoryAftermath
 *
 * If VisuStella MZ's Victory Aftermath plugin is installed, the amount of
 * Skill Points and Ability Points earned can be visibly shown in the rewards
 * window.
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
 * === Ability Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting AP: x>
 * <Class name Starting AP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Ability Points the actor starts with in a
 *   specific class if Ability Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Ability Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Ability Points for.
 * - Replace 'name' with the name of the class to set starting Ability
 *   Points for.
 *
 * ---
 *
 * <AP Gain: x>
 * <User AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Ability Points gain from
 *   the Plugin Parameters.
 *
 * ---
 *
 * <Target AP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Ability Points.
 * - Replace 'x' with a number representing the amount of Ability Points for
 *   the target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <AP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Ability Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Ability Points to
 *   grant the player's party each.
 * - This effect will take over the "Per Enemy" Ability Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <AP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Ability Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Ability
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Ability Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Skill Points-Related Notetags ===
 * 
 * ---
 *
 * <Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in his/her
 *   starting class.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 *
 * ---
 *
 * <Class id Starting SP: x>
 * <Class name Starting SP: x>
 *
 * - Used for: Actor Notetags
 * - Determines the amount of Skill Points the actor starts with in a specific
 *   class if Skill Points aren't shared across all classes.
 * - Replace 'x' with a numeric value representing the amount of Skill Points
 *   to start out with.
 * - Replace 'id' with the ID of the class to set starting Skill Points for.
 * - Replace 'name' with the name of the class to set starting Skill
 *   Points for.
 *
 * ---
 *
 * <SP Gain: x>
 * <User SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the user will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   user to earn upon usage.
 * - This effect will trigger each time per "hit".
 * - This effect will take over the "Per Action Hit" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <Target SP Gain: x>
 *
 * - Used for: Skill, Item Notetags
 * - When this skill/item is used in battle, the target will acquire 'x' amount
 *   of Skill Points.
 * - Replace 'x' with a number representing the amount of Skill Points for the
 *   target to earn upon usage.
 * - This effect will trigger each time per "hit".
 *
 * ---
 *
 * <SP: x>
 *
 * - Used for: Enemy Notetags
 * - Determines the amount of Skill Points the enemy will give the player's
 *   party upon being defeated.
 * - Replace 'x' with a number representing the amount of Skill Points to grant
 *   the player's party each.
 * - This effect will take over the "Per Enemy" Skill Points gain from the
 *   Plugin Parameters.
 *
 * ---
 *
 * <SP Rate: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Increases the amount of Skill Points the affected battler will gain by a
 *   percentile value.
 * - Replace 'x' with a percentage number representing the amount of Skill
 *   Points that will be acquired.
 * - This stacks multiplicatively with each other.
 * - This does not apply when Skill Points are directly added, lost, or set.
 *
 * ---
 * 
 * === Learnable Skills-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill: id>
 * <Learn Skills: id, id, id>
 * 
 * <Learn Skill: name>
 * <Learn Skills: name, name, name>
 *
 * - Used for: Class Notetags
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple entries are permited.
 *
 * ---
 *
 * <Learn Skills>
 *  id
 *  id
 *  id
 *  name
 *  name
 *  name
 * </Learn Skills>
 *
 * - Used for: Class
 * - Determines what skills the class can learn through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the skill that can be
 *   learned through the Skill Learn System menu.
 * - Replace 'name' with the name of the skill that can be learned through the
 *   Skill Learn System menu.
 * - Multiple middle entries are permited.
 *
 * ---
 * 
 * === Skill Learn Cost-Related Notetags ===
 * 
 * ---
 *
 * <Learn AP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Ability Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Ability Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Ability Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn CP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Class Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn JP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Determines the Job Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn SP Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the Skill Point cost needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'x' with a number representing the amount of Skill Points needed
 *   to learn this skill.
 * - If this notetag is not used, then the Skill Point cost will default to
 *   the value found in the settings.
 *
 * ---
 *
 * <Learn Item id Cost: x>
 * <Learn Item name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the items needed to be consumed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the item needed to be 
 *   consumed.
 * - Replace 'name' with the name of the item needed to be consumed.
 * - Replace 'x' with a number representing the amount of the item needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Weapon id Cost: x>
 * <Learn Weapon name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the weapons needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the weapon needed to be 
 *   consumed.
 * - Replace 'name' with the name of the weapon needed to be consumed.
 * - Replace 'x' with a number representing the amount of the weapon needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Armor id Cost: x>
 * <Learn Armor name Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the armors needed to be consumed for an actor to learn the
 *   skill through the Skill Learn System.
 * - Replace 'id' with a number representing the ID of the armor needed to be 
 *   consumed.
 * - Replace 'name' with the name of the armor needed to be consumed.
 * - Replace 'x' with a number representing the amount of the armor needed
 *   to learn this skill.
 * - You may insert multiple copies of this notetag.
 *
 * ---
 *
 * <Learn Gold Cost: x>
 *
 * - Used for: Skill Notetags
 * - Determines the gold cost needed for an actor to learn the skill through
 *   the Skill Learn System.
 * - Replace 'x' with a number representing the amount of gold needed to learn
 *   this skill.
 * - If this notetag is not used, then the gold cost will default to the value
 *   found in the settings.
 *
 * ---
 *
 * <Learn Skill Costs>
 *  AP: x
 * 
 *  SP: x
 * 
 *  Item id: x
 *  Item name: x
 * 
 *  Weapon id: x
 *  Weapon name: x
 * 
 *  Armor id: x
 *  Armor name: x
 *  
 *  Gold: x
 * </Learn Skill Costs>
 *
 * - Used for: Skill Notetags
 * - Determines a group of resources needed for an actor to learn the skill
 *   through the Skill Learn System.
 * - Replace 'id' with the ID's of items, weapons, armors to be consumed.
 * - Replace 'name' with the names of items, weapons, armors to be consumed.
 * - Replace 'x' with the quantities of the designated resource to be consumed.
 * - Insert multiple entries of items, weapons, and armors inside the notetags
 *   to add more resource entries.
 *
 * ---
 * 
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic Ability Point and Skill Point costs.
 * 
 * ---
 *
 * <JS Learn AP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn AP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Ability Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Ability
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn AP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn CP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn CP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Class Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn CP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn JP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn JP Cost>
 *
 * - Used for: Skill Notetags
 * - Requires VisuMZ_2_ClassChangeSystem
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Job Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn JP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 *
 * <JS Learn SP Cost>
 *  code
 *  code
 *  cost = code;
 * </JS Learn SP Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create dynamically calculated cost
 *   for the required Skill Points in order to learn this skill.
 * - The 'cost' variable will be returned to determine the finalized Skill
 *   Points cost to learn this skill.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - If the <Learn SP Cost: x> is present, this notetag will be ignored.
 *
 * ---
 * 
 * === Show Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Show Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to even
 *   appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Show Skill: id>
 * <Learn Show Skill: name>
 * 
 * <Learn Show All Skills: id, id, id>
 * <Learn Show All Skills: name, name, name>
 * 
 * <Learn Show Any Skills: id, id, id>
 * <Learn Show Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to appear visibly in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to appear visibly in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will appear visibly in the menu.
 *
 * ---
 *
 * <Learn Show Switch: x>
 * 
 * <Learn Show All Switches: x, x, x>
 * 
 * <Learn Show Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to appear visibly in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to appear visibly in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will appear visibly in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Show Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined show conditions.
 * 
 * ---
 *
 * <JS Learn Show>
 *  code
 *  code
 *  visible = code;
 * </JS Learn Show>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   visibly shown in the Skill Learn System menu.
 * - The 'visible' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be visible.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other show conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Show List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Show Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Show Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Require Condition-Related Notetags ===
 * 
 * ---
 *
 * <Learn Require Level: x>
 *
 * - Used for: Skill Notetags
 * - Actors must be at least the required level in order for the skill to be
 *   enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the required level for the actor
 *   in order for the skill to visibly appear.
 *
 * ---
 *
 * <Learn Require Skill: id>
 * <Learn Require Skill: name>
 * 
 * <Learn Require All Skills: id, id, id>
 * <Learn Require All Skills: name, name, name>
 * 
 * <Learn Require Any Skills: id, id, id>
 * <Learn Require Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - The actor must have already learned the above skills in order for the
 *   learnable skill to be enabled in the Skill Learn System menu.
 * - Replace 'id' with a number representing the ID of the skill required to be
 *   known by the actor in order to be enabled in the menu.
 * - Replace 'name' with the name of the skill required to be known by the
 *   actor in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the listed skills to be known
 *   before the learnable skill will be enabled in the menu.
 *
 * ---
 *
 * <Learn Require Switch: x>
 * 
 * <Learn Require All Switches: x, x, x>
 * 
 * <Learn Require Any Switches: x, x, x>
 *
 * - Used for: Skill Notetags
 * - The switches must be in the ON position in order for the learnable skill
 *   to be enabled in the Skill Learn System menu.
 * - Replace 'x' with a number representing the ID of the switch required to be
 *   in the ON position in order to be enabled in the menu.
 * - The 'All' notetag variant requires all of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 * - The 'Any' notetag variant requires any of the switches to be in the ON
 *   position before the learnable skill will be enabled in the menu.
 *
 * ---
 * 
 * === JavaScript Notetags: Requirement Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * create dynamic determined learning requirement conditions.
 * 
 * ---
 *
 * <JS Learn Requirements>
 *  code
 *  code
 *  enabled = code;
 * </JS Learn Requirements>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to determine if the skill will be
 *   enabled for learning in the Skill Learn System menu.
 * - The 'enabled' variable must result in a 'true' or 'false' value to
 *   determine if the skill will be enabled.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 * - Any other requirement conditions must be met, too.
 *
 * ---
 *
 * <JS Learn Requirements List Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements List Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is shown in the Skill Learn System skill list
 *   as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 *
 * <JS Learn Requirements Detail Text>
 *  code
 *  code
 *  text = code;
 * </JS Learn Requirements Detail Text>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to create custom text that will be
 *   displayed when the skill is selected and the Detailed Skill Learn System
 *   resource cost window is opened as long as the requirements have to be met.
 * - The 'text' variable will determine the text to be shown if it is a string.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
 *
 * ---
 * 
 * === Animation-Related Notetags ===
 * 
 * ---
 *
 * <Learn Skill Animation: id>
 * <Learn Skill Animation: id, id, id>
 * 
 * - Used for: Skill Notetags
 * - Plays the animation(s) when this skill is learned through the Skill Learn
 *   System's menu.
 * - This will override the default animation settings found in the plugin
 *   parameters and use the unique one set through notetags instead.
 * - Replace 'id' with the ID of the animation you wish to play.
 * - If multiple ID's are found, then each animation will play one by one in
 *   the order they are listed.
 *
 * ---
 * 
 * <Learn Skill Fade Speed: x>
 * 
 * - Used for: Skill Notetags
 * - This determines the speed at which the skill's icon fades in during the
 *   skill learning animation.
 * - Replace 'x' with a number value to determine how fast the icon fades in.
 * - Use lower numbers for slower fade speeds and higher numbers for faster
 *   fade speeds.
 * 
 * ---
 * 
 * <Learn Skill Picture: filename>
 * <Picture: filename>
 * 
 * - Used for: Skill Notetags
 * - Uses a picture from your project's /img/pictures/ folder instead of the
 *   skill's icon during learning instead.
 * - Replace 'filename' with the filename of the image.
 *   - Do not include the file extension.
 * - Scaling will not apply to the picture.
 * - Use the <Picture: filename> version for any other plugins that may be
 *   using this as an image outside of learning skills, too.
 * - The size used for the image will vary based on your game's resolution.
 * 
 * ---
 * 
 * === JavaScript Notetags: On Learning Conditions ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * produce special effects when the skill is learned.
 * 
 * ---
 *
 * <JS On Learn Skill>
 *  code
 *  code
 *  code
 * </JS On Learn Skill>
 *
 * - Used for: Skill Notetags
 * - Replace 'code' with JavaScript code to perform the desired actions when
 *   the skill is learned.
 * - This will apply to any time the skill is learned by an actor, even if it
 *   is through natural leveling or through the Skill Learn System menu.
 * - The 'user' variable can be used to reference the actor who will be
 *   learning the skill.
 * - The 'skill' variable can be used to reference the skill that will be
 *   learned by the actor.
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
 * === Ability Points Plugin Commands ===
 * 
 * ---
 *
 * Ability Points: Gain
 * - The target actor(s) gains Ability Points.
 * - Gained amounts are affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Add
 * - The target actor(s) receives Ability Points.
 * - Received amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Lose
 * - The target actor(s) loses Ability Points.
 * - Lost amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Ability Points: Set
 * - Changes the exact Ability Points for the target actor(s).
 * - Changed amounts are NOT affected by Ability Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Ability Points for.
 *   - Use "0" for the current class.
 *
 *   Ability Points:
 *   - Determine how many Ability Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === Skill Points Plugin Commands ===
 * 
 * ---
 *
 * Skill Points: Gain
 * - The target actor(s) gains Skill Points.
 * - Gained amounts are affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to gain Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be gained.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Add
 * - The target actor(s) receives Skill Points.
 * - Received amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to receive Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be added.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Lose
 * - The target actor(s) loses Skill Points.
 * - Lost amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to lose Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be lost.
 *   - You may use code.
 *
 * ---
 *
 * Skill Points: Set
 * - Changes the exact Skill Points for the target actor(s).
 * - Changed amounts are NOT affected by Skill Point bonus rates.
 *
 *   Actor ID(s):
 *   - Select which Actor ID(s) to affect.
 *
 *   Class ID(s):
 *   - Select which Class ID(s) to change Skill Points for.
 *   - Use "0" for the current class.
 *
 *   Skill Points:
 *   - Determine how many Skill Points will be set exactly to.
 *   - You may use code.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Show Skill Learn in Skill Menu?
 * - Shows/hides Skill Learn inside the skill menu.
 *
 *   Show/Hide?:
 *   - Shows/hides Skill Learn inside the skill menu.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * General settings for the Skill Learn System. These determine the settings
 * that are used for the Skill Learn System menu's main screen.
 *
 * ---
 *
 * Visual
 * 
 *   Displayed Costs:
 *   - Select which cost types to display in the skill entry.
 *   - This also determines the order they are displayed.
 *     - AP - Ability Points
 *     - SP - Skill Points
 *     - Item - Item Costs
 *     - Weapon - Weapon Costs
 *     - Armor - Armor Costs
 *     - Gold - Gold Costs
 * 
 *   JS: Draw Status:
 *   - JavaScript code used to draw in Window_SkillStatus when the Skill Learn
 *     System is active.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Learned Text:
 *   - This is the text that appears if the skill has been learned.
 *   - You may use text codes.
 * 
 *   Requirements
 * 
 *     Requirement Header:
 *     - Header for requirements.
 *     - %1 - Requirements (all of them)
 * 
 *     Separation Format:
 *     - This determines how the requirements are separated.
 *     - %1 - Previous Requirement, %2 - Second Requirement
 * 
 *     Level Format:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Skill Format:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Switch Format:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Separation Format:
 *     - This determines how the costs are separated from one another.
 *     - %1 - Previous Cost, %2 - Second Cost
 * 
 *     Item Format:
 *     - Determine how items are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Item Name
 * 
 *     Weapon Format:
 *     - Determine how weapons are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * 
 *     Armor Format:
 *     - Determine how armors are displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Armor Name
 * 
 *     Gold Format:
 *     - Determine how gold is displayed as a cost.
 *     - %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Main Access Settings
 * ============================================================================
 *
 * Menu Access settings for Skill Learn System. The Skill Learn System is
 * accessible normally through the in-game Skill menu.
 *
 * ---
 *
 * Main Access Settings
 * 
 *   Command Name:
 *   - Name of the 'Skill Learn' option in the Menu.
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Learn?
 * 
 *   Show in Menu?:
 *   - Add the 'Skill Learn' option to the Menu by default?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Animation Settings
 * ============================================================================
 *
 * Animation settings for the Skill Learn System. By default, an animation will
 * be played upon learning a skill through the Skill Learn System's menu in
 * order to provide player feedback about learning the said skill.
 *
 * ---
 *
 * General
 * 
 *   Show Animations?:
 *   - Show animations when learning a skill?
 * 
 *   Show Windows?:
 *   - Show windows during a skill learn animation?
 * 
 *   Default Animations:
 *   - Default animation(s) do you want to play when learning.
 *
 * ---
 *
 * Skill Sprite
 * 
 *   Scale:
 *   - How big do you want the skill sprite to be on screen?
 * 
 *   Fade Speed:
 *   - How fast do you want the icon to fade in?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Sound Settings
 * ============================================================================
 *
 * Settings for the sound effect played when learning a new skill through the
 * Skill Learn System.
 *
 * ---
 *
 * Settings
 * 
 *   Filename:
 *   - Filename of the sound effect played.
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
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Window settings for the Skill Learn System. There are two new windows added
 * into the Skill menu through this plugin: the Detail Window and the Confirm
 * Window.
 * 
 * The Detail Window will list the required costs of learning a skill in detail
 * in case the icons provided are not clear enough to show what's needed.
 * 
 * The Confirm Window is a window that appears towards the bottom to let the
 * player make a confirmation before deciding to learn the skill.
 *
 * ---
 *
 * Detail Window
 * 
 *   Requirements
 * 
 *     Requirement Title:
 *     - Text used when drawing the learning requirements.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Requirement Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Not Met:
 *     - This how met requirements look.
 *     - %1 - Requirement Text
 * 
 *     Requirement Level:
 *     - This how level is displayed.
 *     - %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * 
 *     Requirement Skill:
 *     - This how required skills are displayed.
 *     - %1 - Icon, %2 - Skill Name
 * 
 *     Requirement Switch:
 *     - This how required switches are displayed.
 *     - %1 - Switch Name
 * 
 *   Costs
 * 
 *     Cost Title:
 *     - Text used when drawing the learning costs.
 *     - %1 - Skill Icon, %2 - Skill Name
 * 
 *     Cost Name:
 *     - Text used to label the resource being consumed.
 * 
 *     Cost Quantity:
 *     - Text used to label the cost of the resource.
 * 
 *     Cost of Owned:
 *     - Text used to label the amount of the resource in possession.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Confirm Window
 * 
 *   Confirm Text:
 *   - Text used for the Confirm command.
 *   - Text codes can be used.
 * 
 *   Cancel Text:
 *   - Text used for the Cancel command.
 *   - Text codes can be used.
 * 
 *   Background Type:
 *   - Select background type for this window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Ability Points Settings
 * ============================================================================
 *
 * Ability Points are an actor-only resource used as a currency for this
 * plugin. You can determine how they appear in-game, how they're earned, and
 * what kind of mechanics are involved with them. Ability Points can also be 
 * used in other VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Ability Points:
 *   - Do you want Ability Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Ability Points an actor can have?
 *   - Use 0 for unlimited Ability Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Ability Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Ability Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Ability Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Ability Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Ability Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Ability Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Ability Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Ability Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much AP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Ability Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Ability Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawAbilityPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorAbilityPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Ability Points aren't shared or if you want the Ability
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Points Settings
 * ============================================================================
 *
 * Skill Points are an actor-only resource used as a currency for this plugin.
 * You can determine how they appear in-game, how they're earned, and what kind
 * of mechanics are involved with them. Skill Points can also be used in other
 * VisuStella plugins.
 *
 * ---
 *
 * Mechanics
 * 
 *   Shared Skill Points:
 *   - Do you want Skill Points to be shared across all classes?
 *   - Or do you want all classes to have their own?
 * 
 *   Maximum:
 *   - What's the maximum amount of Skill Points an actor can have?
 *   - Use 0 for unlimited Skill Points.
 *
 * ---
 *
 * Visual
 * 
 *   Show In Menus?:
 *   - Do you wish to show Skill Points in menus that allow them?
 * 
 *   Icon:
 *   - What is the icon you want to use to represent Skill Points?
 *
 * ---
 *
 * Vocabulary
 * 
 *   Full Text:
 *   - The full text of how Skill Points appears in-game.
 * 
 *   Abbreviated Text:
 *   - The abbreviation of how Skill Points appears in-game.
 * 
 *   Menu Text Format:
 *   - What is the text format for it to be displayed in windows.
 *   - %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 *
 * ---
 *
 * Gain
 * 
 *   Per Action Hit:
 *   - How many Skill Points should an actor gain per action?
 *   - You may use code.
 * 
 *   Per Level Up:
 *   - How many Skill Points should an actor gain per level up?
 *   - You may use code.
 * 
 *   Per Enemy Defeated:
 *   - How many Skill Points should an actor gain per enemy?
 *   - You may use code.
 * 
 *     Alive Actors?:
 *     - Do actors have to be alive to receive Skill Points from
 *       defeated enemies?
 *
 * ---
 *
 * Victory
 * 
 *   Show During Victory?:
 *   - Show how much SP an actor has earned in battle during the victory phase?
 * 
 *   Victory Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * 
 *   Aftermath Display?:
 *   - Requires VisuMZ_3_VictoryAftermath. 
 *   - Show Skill Points as the main acquired resource in the actor windows?
 * 
 *   Aftermath Text:
 *   - For no Victory Aftermath, this is the text that appears.
 *   - %1 - Earned, %2 - Abbr, %3 - Full Text
 *
 * ---
 * 
 * For those who wish to display how many Skill Points an actor has for a
 * specific class, you can use the following JavaScript code inside of a
 * window object.
 * 
 *   this.drawSkillPoints(value, x, y, width, align);
 *   - The 'value' variable refers to the number you wish to display.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
 * 
 *   this.drawActorSkillPoints(actor, classID, x, y, width, align);
 *   - The 'actor' variable references the actor to get data from.
 *   - The 'classID' variable is the class to get data from.
 *     - Use 0 if Skill Points aren't shared or if you want the Skill
 *       Points from the actor's current class.
 *   - The 'x' variable refers to the x coordinate to draw at.
 *   - The 'y' variable refers to the y coordinate to draw at.
 *   - The 'width' variable refers to the width of the data area.
 *   - Replace 'align' with a string saying 'left', 'center', or 'right' to
 *     determine how you want the data visibly aligned.
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
 * Version 1.11: May 18, 2023
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.10: December 15, 2022
 * * Bug Fixes!
 * ** Fixed a visual listing bug effect when 'CP' and 'JP' are listed under
 *    costs but the VisuMZ Class Change System plugin isn't present. Fix made
 *    by Olivia.
 * 
 * Version 1.09: June 9, 2022
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.08: March 24, 2022
 * * Documentation Update!
 * ** Fixed a typo for missing a "/" in the <Learn Skills> group notetag.
 * 
 * Version 1.07: February 10, 2022
 * * Bug Fixes!
 * ** Costs for CP and JP will have better fail safes to not automatically
 *    reduce to 0 under specific conditions when learning skills. Fix by Arisu.
 * 
 * Version 1.06: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly.
 * *** <Learn Skill Picture: filename> and <Picture: filename>
 * **** Uses a picture from your project's /img/pictures/ folder instead of the
 *      skill's icon during learning instead.
 * 
 * Version 1.04: December 18, 2020
 * * Bug Fixes!
 * ** Notetags that utilize multiple numeric ID's instead of skill names should
 *    now be working properly. Fix made by Yanfly.
 * 
 * Version 1.03: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Updates!
 * ** The Plugin Parameter for "Displayed Costs" have been updated to contain
 *    compatibility for a future plugin.
 * ** The Plugin Parameter for "JS: Draw Status" has been updated to contain
 *    compatibility for a future plugin.
 * *** To quickly acquire the new changes for the above Plugin Parameters,
 *     delete the "General" settings from the main Plugin Parameters page, then
 *     open them up again. These settings will be defaulted to the new
 *     additions added for the plugin. Warning! Old settings will be lost.
 * * New Features!
 * ** Added <Learn CP Cost: x>, <Learn JP Cost: x>, <JS Learn CP Cost>,
 *    <JS Learn JP Cost> notetags. Added by Arisu.
 * 
 * Version 1.02: November 29, 2020
 * * Bug Fixes!
 * ** The plugin should no longer be dependent on Skills & States Core. Fix
 *    made by Arisu.
 * 
 * Version 1.01: November 22, 2020
 * * Bug Fixes!
 * ** Game no longer crashes when displaying AP/SP rewards for those without
 *    the Victory Aftermath plugin. Fix made by Yanfly.
 *
 * Version 1.00: November 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsGain
 * @text Ability Points: Gain
 * @desc The target actor(s) gains Ability Points.
 * Gained amounts are affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsAdd
 * @text Ability Points: Add
 * @desc The target actor(s) receives Ability Points.
 * Received amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsLose
 * @text Ability Points: Lose
 * @desc The target actor(s) loses Ability Points.
 * Lost amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command AbilityPointsSet
 * @text Ability Points: Set
 * @desc Changes the exact Ability Points for the target actor(s).
 * Changed amounts are NOT affected by Ability Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Ability Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Ability Points
 * @desc Determine how many Ability Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsGain
 * @text Skill Points: Gain
 * @desc The target actor(s) gains Skill Points.
 * Gained amounts are affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to gain Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be gained.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsAdd
 * @text Skill Points: Add
 * @desc The target actor(s) receives Skill Points.
 * Received amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to receive Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be added.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsLose
 * @text Skill Points: Lose
 * @desc The target actor(s) loses Skill Points.
 * Lost amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to lose Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be lost.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SkillPointsSet
 * @text Skill Points: Set
 * @desc Changes the exact Skill Points for the target actor(s).
 * Changed amounts are NOT affected by Skill Point bonus rates.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg Classes:arraynum
 * @text Class ID(s)
 * @type class[]
 * @desc Select which Class ID(s) to change Skill Points for.
 * Use "0" for the current class.
 * @default ["0"]
 *
 * @arg Points:eval
 * @text Skill Points
 * @desc Determine how many Skill Points will be set exactly to.
 * You may use code.
 * @default 100
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowSkillLearnSystemMenu
 * @text System: Show Skill Learn in Skill Menu?
 * @desc Shows/hides Skill Learn inside the skill menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides Skill Learn inside the skill menu.
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
 * @param SkillLearnSystem
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Scene_SkillLearn
 *
 * @param General:struct
 * @text General Settings
 * @parent Scene_SkillLearn
 * @type struct<General>
 * @desc General settings for the Skill Learn System.
 * @default {"Visual":"","DisplayedCosts:arraystr":"[\"AP\",\"SP\",\"Item\",\"Weapon\",\"Armor\",\"Gold\"]","StatusWindowDrawJS:func":"\"// Draw Face\\nconst fx = this.colSpacing() / 2;\\nconst fh = this.innerHeight;\\nconst fy = fh / 2 - this.lineHeight() * 1.5;\\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\\n\\n// Return if Window Size is Too Small\\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\\nlet sw = this.innerWidth - sx - 2;\\nif (sw < 300) return;\\n\\n// Draw Costs\\n// Compatibility Target\\nconst costs = this.getSkillLearnDisplayedCosts();\\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\\nconst maxCol = Math.ceil(costs.length / maxEntries);\\nlet cx = sx;\\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\\nconst by = cy;\\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\\nif (maxCol === 1) {\\n    cw = Math.min(ImageManager.faceWidth, cw);\\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\\n}\\nfor (const cost of costs) {\\n    switch (cost) {\\n\\n        case 'AP':\\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'CP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'JP':\\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            }\\n            break;\\n\\n        case 'SP':\\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\\n            break;\\n\\n        case 'Gold':\\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\\n            break;\\n\\n        default:\\n            continue;\\n    }\\n    cy += this.lineHeight();\\n    if (cy + this.lineHeight() > this.innerHeight) {\\n        cy = by;\\n        cx += cw + (this.itemPadding() * 2);\\n    }\\n}\"","Vocabulary":"","Learned:str":"Learned","Requirements":"","RequireFmt:str":"Requires %1","ReqSeparateFmt:str":"%1, %2","ReqLevelFmt:str":"\\C[16]%3\\C[0]%1","ReqSkillFmt:str":"%1\\C[16]%2\\C[0]","ReqSwitchFmt:str":"\\C[16]%1\\C[0]","Costs":"","SeparationFmt:str":"%1  %2","ItemFmt:str":"×%1%2","WeaponFmt:str":"×%1%2","ArmorFmt:str":"×%1%2","GoldFmt:str":"×%1%2"}
 *
 * @param MenuAccess:struct
 * @text Menu Access Settings
 * @parent Scene_SkillLearn
 * @type struct<MenuAccess>
 * @desc Menu Access settings for Skill Learn System.
 * @default {"Name:str":"Learn","Icon:num":"87","ShowMenu:eval":"true"}
 *
 * @param Animation:struct
 * @text Animation Settings
 * @parent Scene_SkillLearn
 * @type struct<Animation>
 * @desc Animation settings for the Skill Learn System.
 * @default {"General":"","ShowAnimations:eval":"true","ShowWindows:eval":"true","Animations:arraynum":"[\"40\",\"48\"]","Sprite":"","Scale:num":"8.0","FadeSpeed:num":"4"}
 *
 * @param Sound:struct
 * @text Learn Sound Effect
 * @parent Scene_SkillLearn
 * @type struct<Sound>
 * @desc Settings for the sound effect played when learning a new skill through the Skill Learn System.
 * @default {"name:str":"Skill3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Window:struct
 * @text Window Settings
 * @parent Scene_SkillLearn
 * @type struct<Window>
 * @desc Window settings for the Skill Learn System.
 * @default {"DetailWindow":"","Requirements":"","RequirementTitle:str":"\\C[16]%1%2 Requirements\\C[0]","ReqMetFmt:str":"\\C[24]✔ %1\\C[0]","ReqNotMetFmt:str":"\\C[0]✘ %1\\C[0]","ReqLevelFmt:str":"\\I[87]%2 %1 Reached","ReqSkillFmt:str":"%1%2 Learned","ReqSwitchFmt:str":"\\I[160]%1","Costs":"","LearningTitle:str":"\\C[16]Learning\\C[0] %1%2","IngredientName:str":"\\C[16]Resource\\C[0]","IngredientCost:str":"\\C[16]Cost\\C[0]","IngredientOwned:str":"\\C[16]Owned\\C[0]","DetailWindow_BgType:num":"0","DetailWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y;\\nconst ww = skillWindowRect.width;\\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","ConfirmWindow":"","ConfirmCmd:str":"\\I[164]Learn","CancelCmd:str":"\\I[168]Cancel","ConfirmWindow_BgType:num":"0","ConfirmWindow_RectJS:func":"\"const skillWindowRect = this.itemWindowRect();\\nconst ww = skillWindowRect.width;\\nconst wh = this.calcWindowHeight(2, false);\\nconst wx = skillWindowRect.x;\\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\\nreturn new Rectangle(wx, wy, ww, wh);\""}
 * 
 * @param Resources
 *
 * @param AbilityPoints:struct
 * @text Ability Points Settings
 * @parent Resources
 * @type struct<AbilityPoints>
 * @desc Settings for Ability Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"true","DefaultCost:num":"0","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"78","Vocabulary":"","FullText:str":"Ability Points","AbbrText:str":"AP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"10 + Math.randomInt(5)","PerLevelUp:str":"0","PerEnemy:str":"50 + Math.randomInt(10)","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"true","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"true","AftermathText:str":"+%1 %2"}
 *
 * @param SkillPoints:struct
 * @text Skill Points Settings
 * @parent Resources
 * @type struct<SkillPoints>
 * @desc Settings for Skill Points and how they work in-game.
 * @default {"Mechanics":"","SharedResource:eval":"false","DefaultCost:num":"1","MaxResource:num":"0","Visual":"","ShowInMenus:eval":"true","Icon:num":"79","Vocabulary":"","FullText:str":"Skill Points","AbbrText:str":"SP","TextFmt:str":"%1 \\c[5]%2\\c[0]%3","Gain":"","PerAction:str":"0","PerLevelUp:str":"100","PerEnemy:str":"0","AliveActors:eval":"true","Victory":"","ShowVictory:eval":"false","VictoryText:str":"%1 gains %2 %3!","AftermathActorDisplay:eval":"false","AftermathText:str":"+%1 %2"}
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
 * @param Visual
 * 
 * @param DisplayedCosts:arraystr
 * @text Displayed Costs
 * @parent Visual
 * @type select[]
 * @option AP - Ability Points
 * @value AP
 * @option CP - Class Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value CP
 * @option JP - Job Points (Requires VisuMZ_2_ClassChangeSystem)
 * @value JP
 * @option SP - Skill Points
 * @value SP
 * @option Item - Item Costs
 * @value Item
 * @option Weapon - Weapon Costs
 * @value Weapon
 * @option Armor - Armor Costs
 * @value Armor
 * @option Gold - Gold Costs
 * @value Gold
 * @desc Select which cost types to display in the skill entry.
 * This also determines the order they are displayed.
 * @default ["AP","SP","Item","Weapon","Armor","Gold"]
 *
 * @param StatusWindowDrawJS:func
 * @text JS: Draw Status
 * @parent Visual
 * @type note
 * @desc JavaScript code used to draw in Window_SkillStatus when the Skill Learn System is active.
 * @default "// Draw Face\nconst fx = this.colSpacing() / 2;\nconst fh = this.innerHeight;\nconst fy = fh / 2 - this.lineHeight() * 1.5;\nthis.drawActorFace(this._actor, fx + 1, 0, 144, fh);\nthis.drawActorSimpleStatus(this._actor, fx + 180, fy);\n\n// Return if Window Size is Too Small\nlet sx = (this.colSpacing() / 2) + 180 + 180 + 180;\nlet sw = this.innerWidth - sx - 2;\nif (sw < 300) return;\n\n// Draw Costs\n// Compatibility Target\nconst costs = this.getSkillLearnDisplayedCosts();\nconst maxEntries = Math.floor(this.innerHeight / this.lineHeight());\nconst maxCol = Math.ceil(costs.length / maxEntries);\nlet cx = sx;\nlet cy = Math.max(Math.round((this.innerHeight - (this.lineHeight() * Math.ceil(costs.length / maxCol))) / 2), 0);\nconst by = cy;\nlet cw = (this.innerWidth - cx - (this.itemPadding() * 2 * maxCol)) / maxCol;\nif (maxCol === 1) {\n    cw = Math.min(ImageManager.faceWidth, cw);\n    cx += Math.round((this.innerWidth - cx - (this.itemPadding() * 2) - cw) / 2);\n}\nfor (const cost of costs) {\n    switch (cost) {\n\n        case 'AP':\n            this.drawActorAbilityPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'CP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorClassPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'JP':\n            if (Imported.VisuMZ_2_ClassChangeSystem) {\n                this.drawActorJobPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            }\n            break;\n\n        case 'SP':\n            this.drawActorSkillPoints(this._actor, this._actor.currentClass().id, cx, cy, cw, 'right');\n            break;\n\n        case 'Gold':\n            this.drawCurrencyValue($gameParty.gold(), TextManager.currencyUnit, cx, cy, cw);\n            break;\n\n        default:\n            continue;\n    }\n    cy += this.lineHeight();\n    if (cy + this.lineHeight() > this.innerHeight) {\n        cy = by;\n        cx += cw + (this.itemPadding() * 2);\n    }\n}"
 *
 * @param Vocabulary
 *
 * @param Learned:str
 * @text Learned Text
 * @parent Vocabulary
 * @desc This is the text that appears if the skill has been
 * learned. You may use text codes.
 * @default Learned
 *
 * @param Requirements
 * @parent Vocabulary
 *
 * @param RequireFmt:str
 * @text Requirement Header
 * @parent Requirements
 * @desc Header for requirements.
 * %1 - Requirements (all of them)
 * @default Requires %1
 *
 * @param ReqSeparateFmt:str
 * @text Separation Format
 * @parent Requirements
 * @desc This determines how the requirements are separated.
 * %1 - Previous Requirement, %2 - Second Requirement
 * @default %1, %2
 *
 * @param ReqLevelFmt:str
 * @text Level Format
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \C[16]%3\C[0]%1
 *
 * @param ReqSkillFmt:str
 * @text Skill Format
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1\C[16]%2\C[0]
 *
 * @param ReqSwitchFmt:str
 * @text Switch Format
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \C[16]%1\C[0]
 *
 * @param Costs
 * @parent Vocabulary
 *
 * @param SeparationFmt:str
 * @text Separation Format
 * @parent Costs
 * @desc This determines how the costs are separated from one another.
 * %1 - Previous Cost, %2 - Second Cost
 * @default %1  %2
 *
 * @param ItemFmt:str
 * @text Item Format
 * @parent Costs
 * @desc Determine how items are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Item Name
 * @default ×%1%2
 *
 * @param WeaponFmt:str
 * @text Weapon Format
 * @parent Costs
 * @desc Determine how weapons are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Weapon Name
 * @default ×%1%2
 *
 * @param ArmorFmt:str
 * @text Armor Format
 * @parent Costs
 * @desc Determine how armors are displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Armor Name
 * @default ×%1%2
 *
 * @param GoldFmt:str
 * @text Gold Format
 * @parent Costs
 * @desc Determine how gold is displayed as a cost.
 * %1 - Quantity, %2 - Icon, %3 - Currency Vocabulary
 * @default ×%1%2
 *
 */
/* ----------------------------------------------------------------------------
 * MenuAccess Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuAccess:
 *
 * @param Name:str
 * @text Command Name
 * @desc Name of the 'Skill Learn' option in the Menu.
 * @default Learn
 *
 * @param Icon:num
 * @text Icon
 * @desc What is the icon you want to use to represent Skill Learn?
 * @default 87
 *
 * @param ShowMenu:eval
 * @text Show in Menu?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Add the 'Skill Learn' option to the Menu by default?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Animation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Animation:
 *
 * @param General
 *
 * @param ShowAnimations:eval
 * @text Show Animations?
 * @parent General
 * @type boolean
 * @on Show
 * @off Skip
 * @desc Show animations when learning a skill?
 * @default true
 *
 * @param ShowWindows:eval
 * @text Show Windows?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show windows during a skill learn animation?
 * @default false
 *
 * @param Animations:arraynum
 * @text Default Animations
 * @parent General
 * @type animation[]
 * @desc Default animation(s) do you want to play when learning.
 * @default ["40","48"]
 *
 * @param Sprite
 * @text Skill Sprite
 *
 * @param Scale:num
 * @text Scale
 * @parent Sprite
 * @desc How big do you want the skill sprite to be on screen?
 * @default 8.0
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent Sprite
 * @type number
 * @min 1
 * @desc How fast do you want the icon to fade in?
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Sound Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Sound:
 *
 * @param name:str
 * @text Filename
 * @type file
 * @dir audio/se/
 * @desc Filename of the sound effect played.
 * @default Skill3
 *
 * @param volume:num
 * @text Volume
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param DetailWindow
 * @text Detail Window
 * 
 * @param Requirements
 * @parent DetailWindow
 *
 * @param RequirementTitle:str
 * @text Requirement Title
 * @parent Requirements
 * @desc Text used when drawing the learning requirements.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]%1%2 Requirements\C[0]
 *
 * @param ReqMetFmt:str
 * @text Requirement Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[24]✔ %1\C[0]
 *
 * @param ReqNotMetFmt:str
 * @text Requirement Not Met
 * @parent Requirements
 * @desc This how met requirements look.
 * %1 - Requirement Text
 * @default \C[0]✘ %1\C[0]
 *
 * @param ReqLevelFmt:str
 * @text Requirement Level
 * @parent Requirements
 * @desc This how level is displayed.
 * %1 - Level, %2 - Full Level Term, %3 - Abbr Level Term
 * @default \I[87]%2 %1 Reached
 *
 * @param ReqSkillFmt:str
 * @text Requirement Skill
 * @parent Requirements
 * @desc This how required skills are displayed.
 * %1 - Icon, %2 - Skill Name
 * @default %1%2 Learned
 *
 * @param ReqSwitchFmt:str
 * @text Requirement Switch
 * @parent Requirements
 * @desc This how required switches are displayed.
 * %1 - Switch Name
 * @default \I[160]%1
 * 
 * @param Costs
 * @parent DetailWindow
 *
 * @param LearningTitle:str
 * @text Cost Title
 * @parent Costs
 * @desc Text used when drawing the learning costs.
 * %1 - Skill Icon, %2 - Skill Name
 * @default \C[16]Learning\C[0] %1%2
 *
 * @param IngredientName:str
 * @text Cost Name
 * @parent Costs
 * @desc Text used to label the resource being consumed.
 * @default \C[16]Resource\C[0]
 *
 * @param IngredientCost:str
 * @text Cost Quantity
 * @parent Costs
 * @desc Text used to label the cost of the resource.
 * @default \C[16]Cost\C[0]
 *
 * @param IngredientOwned:str
 * @text Cost of Owned
 * @parent Costs
 * @desc Text used to label the amount of the resource in possession.
 * @default \C[16]Owned\C[0]
 *
 * @param DetailWindow_BgType:num
 * @text Background Type
 * @parent DetailWindow
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
 * @param DetailWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent DetailWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y;\nconst ww = skillWindowRect.width;\nconst wh = skillWindowRect.height - this.calcWindowHeight(2, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ConfirmWindow
 * @text Confirm Window
 *
 * @param ConfirmCmd:str
 * @text Confirm Text
 * @parent ConfirmWindow
 * @desc Text used for the Confirm command.
 * Text codes can be used.
 * @default \I[164]Learn
 *
 * @param CancelCmd:str
 * @text Cancel Text
 * @parent ConfirmWindow
 * @desc Text used for the Cancel command.
 * Text codes can be used.
 * @default \I[168]Cancel
 *
 * @param ConfirmWindow_BgType:num
 * @text Background Type
 * @parent ConfirmWindow
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
 * @param ConfirmWindow_RectJS:func
 * @text JS: X, Y, W, H
 * @parent ConfirmWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const skillWindowRect = this.itemWindowRect();\nconst ww = skillWindowRect.width;\nconst wh = this.calcWindowHeight(2, false);\nconst wx = skillWindowRect.x;\nconst wy = skillWindowRect.y + skillWindowRect.height - wh;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
/* ----------------------------------------------------------------------------
 * Ability Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AbilityPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Ability Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Ability Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default true
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default AP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 0
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Ability Points an actor can have?
 * Use 0 for unlimited Ability Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Ability Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Ability Points?
 * @default 78
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Ability Points appears in-game.
 * @default Ability Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Ability Points appears in-game.
 * @default AP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[5]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Ability Points should an actor gain per action?
 * You may use code.
 * @default 10 + Math.randomInt(5)
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Ability Points should an actor gain per level up?
 * You may use code.
 * @default 0
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Ability Points should an actor gain per enemy?
 * You may use code.
 * @default 50 + Math.randomInt(10)
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Ability Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much AP an actor has earned in battle during the
 * victory phase?
 * @default true
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Ability Points as
 * the main acquired resource in the actor windows?
 * @default true
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Points Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillPoints:
 *
 * @param Mechanics
 *
 * @param SharedResource:eval
 * @text Shared Skill Points
 * @parent Mechanics
 * @type boolean
 * @on Shared Across Classes
 * @off Classes Separate
 * @desc Do you want Skill Points to be shared across all classes?
 * Or do you want all classes to have their own?
 * @default false
 *
 * @param DefaultCost:num
 * @text Default Cost
 * @parent Mechanics
 * @type number
 * @desc What's the default SP cost of a skill when trying to learn
 * it through the Skill Learn System?
 * @default 1
 *
 * @param MaxResource:num
 * @text Maximum
 * @parent Mechanics
 * @type number
 * @desc What's the maximum amount of Skill Points an actor can have?
 * Use 0 for unlimited Skill Points.
 * @default 0
 *
 * @param Visual
 *
 * @param ShowInMenus:eval
 * @text Show In Menus?
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Do you wish to show Skill Points in menus that allow them?
 * @default true
 *
 * @param Icon:num
 * @text Icon
 * @parent Visual
 * @desc What is the icon you want to use to represent Skill Points?
 * @default 79
 *
 * @param Vocabulary
 *
 * @param FullText:str
 * @text Full Text
 * @parent Vocabulary
 * @desc The full text of how Skill Points appears in-game.
 * @default Skill Points
 *
 * @param AbbrText:str
 * @text Abbreviated Text
 * @parent Vocabulary
 * @desc The abbreviation of how Skill Points appears in-game.
 * @default SP
 *
 * @param TextFmt:str
 * @text Menu Text Format
 * @parent Vocabulary
 * @desc What is the text format for it to be displayed in windows.
 * %1 - Value, %2 - Abbr, %3 - Icon, %4 - Full Text
 * @default %1 \c[4]%2\c[0]%3
 *
 * @param Gain
 *
 * @param PerAction:str
 * @text Per Action Hit
 * @parent Gain
 * @desc How many Skill Points should an actor gain per action?
 * You may use code.
 * @default 0
 *
 * @param PerLevelUp:str
 * @text Per Level Up
 * @parent Gain
 * @desc How many Skill Points should an actor gain per level up?
 * You may use code.
 * @default 100
 *
 * @param PerEnemy:str
 * @text Per Enemy Defeated
 * @parent Gain
 * @desc How many Skill Points should an actor gain per enemy?
 * You may use code.
 * @default 0
 *
 * @param AliveActors:eval
 * @text Alive Actors?
 * @parent PerEnemy:str
 * @type boolean
 * @on Alive Requirement
 * @off No Requirement
 * @desc Do actors have to be alive to receive Skill Points from
 * defeated enemies?
 * @default true
 *
 * @param Victory
 *
 * @param ShowVictory:eval
 * @text Show During Victory?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show how much SP an actor has earned in battle during the
 * victory phase?
 * @default false
 *
 * @param VictoryText:str
 * @text Victory Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Actor, %2 - Earned, %3 - Abbr, %4 - Full Text
 * @default %1 gains %2 %3!
 *
 * @param AftermathActorDisplay:eval
 * @text Aftermath Display?
 * @parent Victory
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Requires VisuMZ_3_VictoryAftermath. Show Skill Points as
 * the main acquired resource in the actor windows?
 * @default false
 *
 * @param AftermathText:str
 * @text Aftermath Text
 * @parent Victory
 * @desc For no Victory Aftermath, this is the text that appears.
 * %1 - Earned, %2 - Abbr, %3 - Full Text
 * @default +%1 %2
 *
 */
//=============================================================================

const _0x1d7d7f=_0x93e0;(function(_0x185d9f,_0x167c36){const _0x394964=_0x93e0,_0x2ee49b=_0x185d9f();while(!![]){try{const _0x1489bc=parseInt(_0x394964(0x10f))/0x1+parseInt(_0x394964(0x2cc))/0x2*(parseInt(_0x394964(0x311))/0x3)+parseInt(_0x394964(0x28c))/0x4+parseInt(_0x394964(0x1ad))/0x5*(parseInt(_0x394964(0x2ff))/0x6)+parseInt(_0x394964(0xf6))/0x7*(-parseInt(_0x394964(0x137))/0x8)+parseInt(_0x394964(0x2cb))/0x9+-parseInt(_0x394964(0x296))/0xa;if(_0x1489bc===_0x167c36)break;else _0x2ee49b['push'](_0x2ee49b['shift']());}catch(_0x43cc26){_0x2ee49b['push'](_0x2ee49b['shift']());}}}(_0x2cd5,0xad1bf));var label='SkillLearnSystem',tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x347cc){const _0x393d79=_0x93e0;return _0x347cc[_0x393d79(0x2c5)]&&_0x347cc[_0x393d79(0xd9)]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x1d7d7f(0x185)]=VisuMZ[label][_0x1d7d7f(0x185)]||{},VisuMZ[_0x1d7d7f(0x103)]=function(_0x5b93d1,_0x467bdf){const _0x1b1f3f=_0x1d7d7f;for(const _0x5562f3 in _0x467bdf){if(_0x1b1f3f(0x304)!==_0x1b1f3f(0x20f)){if(_0x5562f3[_0x1b1f3f(0x2fe)](/(.*):(.*)/i)){if(_0x1b1f3f(0x291)==='xKCmE'){const _0x55ec2f=String(RegExp['$1']),_0x4c2be8=String(RegExp['$2'])[_0x1b1f3f(0x167)]()[_0x1b1f3f(0x279)]();let _0x33138f,_0x2db821,_0x4160ae;switch(_0x4c2be8){case'NUM':_0x33138f=_0x467bdf[_0x5562f3]!==''?Number(_0x467bdf[_0x5562f3]):0x0;break;case _0x1b1f3f(0x100):_0x2db821=_0x467bdf[_0x5562f3]!==''?JSON[_0x1b1f3f(0x2f4)](_0x467bdf[_0x5562f3]):[],_0x33138f=_0x2db821['map'](_0x53666f=>Number(_0x53666f));break;case'EVAL':_0x33138f=_0x467bdf[_0x5562f3]!==''?eval(_0x467bdf[_0x5562f3]):null;break;case _0x1b1f3f(0x12e):_0x2db821=_0x467bdf[_0x5562f3]!==''?JSON[_0x1b1f3f(0x2f4)](_0x467bdf[_0x5562f3]):[],_0x33138f=_0x2db821[_0x1b1f3f(0x2ae)](_0x14001f=>eval(_0x14001f));break;case _0x1b1f3f(0x247):_0x33138f=_0x467bdf[_0x5562f3]!==''?JSON['parse'](_0x467bdf[_0x5562f3]):'';break;case _0x1b1f3f(0x154):_0x2db821=_0x467bdf[_0x5562f3]!==''?JSON['parse'](_0x467bdf[_0x5562f3]):[],_0x33138f=_0x2db821[_0x1b1f3f(0x2ae)](_0x21176e=>JSON[_0x1b1f3f(0x2f4)](_0x21176e));break;case _0x1b1f3f(0x2f0):_0x33138f=_0x467bdf[_0x5562f3]!==''?new Function(JSON[_0x1b1f3f(0x2f4)](_0x467bdf[_0x5562f3])):new Function(_0x1b1f3f(0x1c1));break;case'ARRAYFUNC':_0x2db821=_0x467bdf[_0x5562f3]!==''?JSON[_0x1b1f3f(0x2f4)](_0x467bdf[_0x5562f3]):[],_0x33138f=_0x2db821[_0x1b1f3f(0x2ae)](_0x339390=>new Function(JSON['parse'](_0x339390)));break;case _0x1b1f3f(0x30b):_0x33138f=_0x467bdf[_0x5562f3]!==''?String(_0x467bdf[_0x5562f3]):'';break;case'ARRAYSTR':_0x2db821=_0x467bdf[_0x5562f3]!==''?JSON['parse'](_0x467bdf[_0x5562f3]):[],_0x33138f=_0x2db821[_0x1b1f3f(0x2ae)](_0x381d91=>String(_0x381d91));break;case _0x1b1f3f(0x2d6):_0x4160ae=_0x467bdf[_0x5562f3]!==''?JSON[_0x1b1f3f(0x2f4)](_0x467bdf[_0x5562f3]):{},_0x33138f=VisuMZ[_0x1b1f3f(0x103)]({},_0x4160ae);break;case _0x1b1f3f(0x27e):_0x2db821=_0x467bdf[_0x5562f3]!==''?JSON[_0x1b1f3f(0x2f4)](_0x467bdf[_0x5562f3]):[],_0x33138f=_0x2db821[_0x1b1f3f(0x2ae)](_0x416ab5=>VisuMZ['ConvertParams']({},JSON[_0x1b1f3f(0x2f4)](_0x416ab5)));break;default:continue;}_0x5b93d1[_0x55ec2f]=_0x33138f;}else{let _0x1a49f7=_0x43a50f[_0x1b1f3f(0x90)];if(_0x1a49f7[_0x1b1f3f(0x2fe)](/\\I\[(\d+)\]/i))return _0x1a49f7;if(!_0x3c0f1e[_0x1b1f3f(0x140)])return _0x1a49f7;if(this[_0x1b1f3f(0xd2)]()===_0x1b1f3f(0x2f9))return _0x1a49f7;const _0x425632=_0x3165bd[_0x1b1f3f(0x27c)];return _0x1b1f3f(0x23d)['format'](_0x425632,_0x1a49f7);}}}else _0x1067d9['id']=_0x3805fe(_0x798fa8);}return _0x5b93d1;},(_0x4ac992=>{const _0x3c2565=_0x1d7d7f,_0x1f5380=_0x4ac992['name'];for(const _0x29d3e3 of dependencies){if(_0x3c2565(0x275)!=='JsQPp')this[_0x3c2565(0x75)]=this[_0x3c2565(0x2cf)](),_0x1f1689['SkillLearnSystem'][_0x3c2565(0xc7)][_0x3c2565(0x158)](this,_0x2d6139),this['_skillLearnSystem_drawItemMode']=![];else{if(!Imported[_0x29d3e3]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x3c2565(0x2b8)](_0x1f5380,_0x29d3e3)),SceneManager[_0x3c2565(0x1a9)]();break;}}}const _0xe3e3f8=_0x4ac992[_0x3c2565(0xd9)];if(_0xe3e3f8[_0x3c2565(0x2fe)](/\[Version[ ](.*?)\]/i)){if(_0x3c2565(0x1a7)!==_0x3c2565(0xbf)){const _0x46ba2b=Number(RegExp['$1']);_0x46ba2b!==VisuMZ[label]['version']&&(alert(_0x3c2565(0x1a0)['format'](_0x1f5380,_0x46ba2b)),SceneManager['exit']());}else _0xd48d36=_0x13d242(_0x1e56e6);}if(_0xe3e3f8[_0x3c2565(0x2fe)](/\[Tier[ ](\d+)\]/i)){const _0x4883a5=Number(RegExp['$1']);_0x4883a5<tier?_0x3c2565(0x305)===_0x3c2565(0x305)?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'[_0x3c2565(0x2b8)](_0x1f5380,_0x4883a5,tier)),SceneManager[_0x3c2565(0x1a9)]()):this['initSkillPoints']():tier=Math['max'](_0x4883a5,tier);}VisuMZ[_0x3c2565(0x103)](VisuMZ[label][_0x3c2565(0x185)],_0x4ac992['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x1d7d7f(0x31a)],_0x1d7d7f(0x1d0),_0x575d2a=>{const _0x2945f4=_0x1d7d7f;VisuMZ['ConvertParams'](_0x575d2a,_0x575d2a);const _0x4afc04=_0x575d2a[_0x2945f4(0x32a)][_0x2945f4(0x2ae)](_0x5d3da0=>$gameActors[_0x2945f4(0xd3)](_0x5d3da0)),_0x346ce9=_0x575d2a[_0x2945f4(0x2de)],_0x212a86=_0x575d2a[_0x2945f4(0x319)];for(const _0x63561f of _0x4afc04){if(!_0x63561f)continue;for(const _0xd8d820 of _0x346ce9){_0x63561f[_0x2945f4(0x1e1)](_0x212a86,_0xd8d820);}}}),PluginManager[_0x1d7d7f(0x223)](pluginData[_0x1d7d7f(0x31a)],_0x1d7d7f(0x1b0),_0xc80107=>{const _0xb6ac8b=_0x1d7d7f;VisuMZ[_0xb6ac8b(0x103)](_0xc80107,_0xc80107);const _0x14b54f=_0xc80107[_0xb6ac8b(0x32a)][_0xb6ac8b(0x2ae)](_0x23e0d5=>$gameActors[_0xb6ac8b(0xd3)](_0x23e0d5)),_0x5c2309=_0xc80107[_0xb6ac8b(0x2de)],_0xa7b939=_0xc80107[_0xb6ac8b(0x319)];for(const _0x39340f of _0x14b54f){if(!_0x39340f)continue;for(const _0x45ab85 of _0x5c2309){_0xb6ac8b(0x292)===_0xb6ac8b(0x2b2)?_0x2ce910!==''?_0x28a292=_0x3b3556[_0xb6ac8b(0x2b8)](_0x1622c8,_0x3c1867):_0x3a6424=_0x402445:_0x39340f[_0xb6ac8b(0x181)](_0xa7b939,_0x45ab85);}}}),PluginManager[_0x1d7d7f(0x223)](pluginData[_0x1d7d7f(0x31a)],_0x1d7d7f(0x17f),_0x4dfdd0=>{const _0x5713f4=_0x1d7d7f;VisuMZ[_0x5713f4(0x103)](_0x4dfdd0,_0x4dfdd0);const _0x4ab22a=_0x4dfdd0['Actors'][_0x5713f4(0x2ae)](_0x3b229c=>$gameActors[_0x5713f4(0xd3)](_0x3b229c)),_0x22d7d8=_0x4dfdd0[_0x5713f4(0x2de)],_0x371e56=_0x4dfdd0[_0x5713f4(0x319)];for(const _0x3a7f28 of _0x4ab22a){if(_0x5713f4(0x201)===_0x5713f4(0x201)){if(!_0x3a7f28)continue;for(const _0x4df7b4 of _0x22d7d8){_0x3a7f28[_0x5713f4(0x1af)](_0x371e56,_0x4df7b4);}}else _0x4499c4['SkillLearnSystem'][_0x5713f4(0x1bc)][_0x5713f4(0x158)](this,_0x144e0b),_0x39c64c[_0x5713f4(0x1b2)][_0x5713f4(0x1d9)](_0x100625);}}),PluginManager[_0x1d7d7f(0x223)](pluginData[_0x1d7d7f(0x31a)],'AbilityPointsSet',_0x371788=>{const _0x281d9c=_0x1d7d7f;VisuMZ[_0x281d9c(0x103)](_0x371788,_0x371788);const _0x4fdf33=_0x371788[_0x281d9c(0x32a)][_0x281d9c(0x2ae)](_0x5668d3=>$gameActors[_0x281d9c(0xd3)](_0x5668d3)),_0x37b039=_0x371788[_0x281d9c(0x2de)],_0x1bc83e=_0x371788['Points'];for(const _0x18a4fc of _0x4fdf33){if(_0x281d9c(0x2f5)===_0x281d9c(0x15a))this[_0x281d9c(0x12d)]=_0x5d2614[_0x281d9c(0x182)](_0x377577(_0x5e7333['$1']),0x1);else{if(!_0x18a4fc)continue;for(const _0x248d4a of _0x37b039){_0x18a4fc[_0x281d9c(0x27f)](_0x1bc83e,_0x248d4a);}}}}),PluginManager[_0x1d7d7f(0x223)](pluginData[_0x1d7d7f(0x31a)],_0x1d7d7f(0x261),_0x587657=>{const _0x5d9a82=_0x1d7d7f;VisuMZ['ConvertParams'](_0x587657,_0x587657);const _0x17610b=_0x587657[_0x5d9a82(0x32a)][_0x5d9a82(0x2ae)](_0x241d35=>$gameActors[_0x5d9a82(0xd3)](_0x241d35)),_0x110ea7=_0x587657[_0x5d9a82(0x2de)],_0x1fad9a=_0x587657['Points'];for(const _0x234124 of _0x17610b){if(_0x5d9a82(0x244)!=='qNUfL'){if(!_0x234124)continue;for(const _0xb310b0 of _0x110ea7){_0x5d9a82(0x124)!==_0x5d9a82(0x124)?this[_0x5d9a82(0x14c)]():_0x234124[_0x5d9a82(0x24d)](_0x1fad9a,_0xb310b0);}}else{const _0x26c66d=_0x5c1ba2(_0x1c2b3b['$1'])['split'](/[\r\n]+/);for(const _0x31c3fa of _0x26c66d){if(_0x31c3fa[_0x5d9a82(0x2fe)](/GOLD:[ ](\d+)/gi))return _0x42ccd6(_0x3cfa54['$1']);}}}}),PluginManager['registerCommand'](pluginData['name'],'SkillPointsAdd',_0x845a6e=>{const _0x3b5286=_0x1d7d7f;VisuMZ[_0x3b5286(0x103)](_0x845a6e,_0x845a6e);const _0x42ac4d=_0x845a6e[_0x3b5286(0x32a)]['map'](_0xeb69c9=>$gameActors[_0x3b5286(0xd3)](_0xeb69c9)),_0x1048a3=_0x845a6e[_0x3b5286(0x2de)],_0x289223=_0x845a6e[_0x3b5286(0x319)];for(const _0xd84014 of _0x42ac4d){if(!_0xd84014)continue;for(const _0x58accf of _0x1048a3){_0xd84014[_0x3b5286(0x267)](_0x289223,_0x58accf);}}}),PluginManager[_0x1d7d7f(0x223)](pluginData[_0x1d7d7f(0x31a)],_0x1d7d7f(0x1f2),_0x570544=>{const _0x2a3a1f=_0x1d7d7f;VisuMZ[_0x2a3a1f(0x103)](_0x570544,_0x570544);const _0x462512=_0x570544[_0x2a3a1f(0x32a)][_0x2a3a1f(0x2ae)](_0x2afb9f=>$gameActors[_0x2a3a1f(0xd3)](_0x2afb9f)),_0x342283=_0x570544['Classes'],_0xe19b23=_0x570544[_0x2a3a1f(0x319)];for(const _0x2ef037 of _0x462512){if(!_0x2ef037)continue;for(const _0x1fb14f of _0x342283){_0x2ef037['loseSkillPoints'](_0xe19b23,_0x1fb14f);}}}),PluginManager[_0x1d7d7f(0x223)](pluginData['name'],_0x1d7d7f(0x2e2),_0x1fa4ce=>{const _0x2f1f10=_0x1d7d7f;VisuMZ['ConvertParams'](_0x1fa4ce,_0x1fa4ce);const _0xdc066e=_0x1fa4ce[_0x2f1f10(0x32a)]['map'](_0x3f01f1=>$gameActors[_0x2f1f10(0xd3)](_0x3f01f1)),_0x36a15f=_0x1fa4ce[_0x2f1f10(0x2de)],_0x5434a4=_0x1fa4ce[_0x2f1f10(0x319)];for(const _0x445eed of _0xdc066e){if(_0x2f1f10(0x136)!==_0x2f1f10(0x2b5)){if(!_0x445eed)continue;for(const _0xd57290 of _0x36a15f){_0x445eed['setSkillPoints'](_0x5434a4,_0xd57290);}}else _0x2d04d2[_0x2f1f10(0x1b2)][_0x2f1f10(0x2bf)]['call'](this,_0x272f21),this[_0x2f1f10(0x327)](),this[_0x2f1f10(0x22b)](),this[_0x2f1f10(0xd1)](),this['gainStartingSkillPoints']();}}),PluginManager[_0x1d7d7f(0x223)](pluginData[_0x1d7d7f(0x31a)],'SystemShowSkillLearnSystemMenu',_0x3bed62=>{const _0x484036=_0x1d7d7f;VisuMZ[_0x484036(0x103)](_0x3bed62,_0x3bed62),$gameSystem[_0x484036(0x214)](_0x3bed62['Show']);}),VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x2ab)]=Scene_Boot['prototype'][_0x1d7d7f(0x11c)],Scene_Boot[_0x1d7d7f(0x175)][_0x1d7d7f(0x11c)]=function(){const _0x530993=_0x1d7d7f;VisuMZ[_0x530993(0x1b2)][_0x530993(0x2ab)][_0x530993(0x158)](this),this['process_VisuMZ_SkillLearnSystem_Notetags']();},Scene_Boot['prototype'][_0x1d7d7f(0x1b8)]=function(){const _0x45c561=_0x1d7d7f;if(VisuMZ[_0x45c561(0x26c)])return;this[_0x45c561(0x151)]();},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x205)]={'StartingAbilityPoints':/<STARTING (?:ABILITY POINTS|AP):[ ](.*)>/i,'StartClassAbilityPoints':/<CLASS (.*) STARTING (?:ABILITY POINTS|AP):[ ](.*)>/gi,'UserGainAbilityPoints':/<(?:ABILITY POINTS|AP|USER ABILITY POINTS|USER AP) GAIN:[ ](.*)>/i,'TargetGainAbilityPoints':/<TARGET (?:ABILITY POINTS|AP) GAIN:[ ](.*)>/i,'EnemyAbilityPoints':/<(?:ABILITY POINTS|AP):[ ](.*)>/i,'AbilityPointsRate':/<(?:ABILITY POINTS|AP) RATE:[ ](\d+)([%％])>/i,'StartingSkillPoints':/<STARTING (?:SKILL POINTS|SP):[ ](.*)>/i,'StartClassSkillPoints':/<CLASS (.*) STARTING (?:SKILL POINTS|SP):[ ](.*)>/gi,'UserGainSkillPoints':/<(?:SKILL POINTS|SP|USER SKILL POINTS|USER SP) GAIN:[ ](.*)>/i,'TargetGainSkillPoints':/<TARGET (?:SKILL POINTS|SP) GAIN:[ ](.*)>/i,'EnemySkillPoints':/<(?:SKILL POINTS|SP):[ ](.*)>/i,'SkillPointsRate':/<(?:SKILL POINTS|SP) RATE:[ ](\d+)([%％])>/i,'LearnSkillA':/<LEARN (?:SKILL|SKILLS):[ ](.*)>/gi,'LearnSkillB':/<LEARN (?:SKILL|SKILLS)>\s*([\s\S]*)\s*<\/LEARN (?:SKILL|SKILLS)>/i,'LearnApCost':/<LEARN (?:ABILITY POINTS|AP) COST:[ ](\d+)>/i,'LearnCpCost':/<LEARN (?:CLASS POINTS|CP) COST:[ ](\d+)>/i,'LearnJpCost':/<LEARN (?:JOB POINTS|JP) COST:[ ](\d+)>/i,'LearnSpCost':/<LEARN (?:SKILL POINTS|SP) COST:[ ](\d+)>/i,'LearnItemCost':/<LEARN ITEM (.*) COST:[ ](\d+)>/gi,'LearnWeaponCost':/<LEARN WEAPON (.*) COST:[ ](\d+)>/gi,'LearnArmorCost':/<LEARN ARMOR (.*) COST:[ ](\d+)>/gi,'LearnGoldCost':/<LEARN GOLD COST:[ ](\d+)>/i,'LearnCostBatch':/<LEARN SKILL (?:COST|COSTS)>\s*([\s\S]*)\s*<\/LEARN SKILL (?:COST|COSTS)>/i,'LearnShowLevel':/<LEARN SHOW LEVEL:[ ](\d+)>/i,'LearnShowSkillsAll':/<LEARN SHOW (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnShowSkillsAny':/<LEARN SHOW ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnShowSwitchesAll':/<LEARN SHOW (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnShowSwitchesAny':/<LEARN SHOW ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'LearnReqLevel':/<LEARN REQUIRE LEVEL:[ ](\d+)>/i,'LearnReqSkillsAll':/<LEARN REQUIRE (?:SKILL|SKILLS|ALL SKILL|ALL SKILLS):[ ](.*)>/i,'LearnReqSkillsAny':/<LEARN REQUIRE ANY (?:SKILL|SKILLS):[ ](.*)>/i,'LearnReqSwitchesAll':/<LEARN REQUIRE (?:SWITCH|SWITCHES|ALL SWITCH|ALL SWITCHES):[ ](.*)>/i,'LearnReqSwitchesAny':/<LEARN REQUIRE ANY (?:SWITCH|SWITCHES):[ ](.*)>/i,'animationIDs':/<LEARN SKILL (?:ANIMATION|ANIMATIONS|ANI):[ ](.*)>/i,'opacitySpeed':/<LEARN SKILL FADE SPEED:[ ](\d+)>/i,'learnPicture':/<LEARN SKILL (?:PICTURE|FILENAME):[ ](.*)>/i,'bigPicture':/<PICTURE:[ ](.*)>/i,'jsLearnApCost':/<JS LEARN (?:ABILITY POINTS|AP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:ABILITY POINTS|AP) COST>/i,'jsLearnCpCost':/<JS LEARN (?:CLASS POINTS|CP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:CLASS POINTS|CP) COST>/i,'jsLearnJpCost':/<JS LEARN (?:JOB POINTS|JP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:JOB POINTS|JP) COST>/i,'jsLearnSpCost':/<JS LEARN (?:SKILL POINTS|SP) COST>\s*([\s\S]*)\s*<\/JS LEARN (?:SKILL POINTS|SP) COST>/i,'jsLearnShow':/<JS LEARN (?:SHOW|VISIBLE)>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE)>/i,'jsLearnShowListTxt':/<JS LEARN (?:SHOW|VISIBLE) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) LIST TEXT>/i,'jsLearnShowDetailTxt':/<JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:SHOW|VISIBLE) DETAIL TEXT>/i,'jsLearnReq':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS)>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS)>/i,'jsLearnReqListTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) LIST TEXT>/i,'jsLearnReqDetailTxt':/<JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>\s*([\s\S]*)\s*<\/JS LEARN (?:REQUIREMENT|REQUIREMENTS) DETAIL TEXT>/i,'jsOnLearn':/<JS ON LEARN SKILL>\s*([\s\S]*)\s*<\/JS ON LEARN SKILL>/i},VisuMZ[_0x1d7d7f(0x1b2)]['JS']={},Scene_Boot[_0x1d7d7f(0x175)][_0x1d7d7f(0x151)]=function(){const _0x6b04da=_0x1d7d7f,_0x535012=$dataActors['concat']($dataSkills);for(const _0x442e32 of _0x535012){if(!_0x442e32)continue;VisuMZ[_0x6b04da(0x1b2)][_0x6b04da(0x1d9)](_0x442e32);}},VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x1bc)]=VisuMZ[_0x1d7d7f(0x1bc)],VisuMZ[_0x1d7d7f(0x1bc)]=function(_0x5483be){const _0x14af03=_0x1d7d7f;VisuMZ[_0x14af03(0x1b2)][_0x14af03(0x1bc)][_0x14af03(0x158)](this,_0x5483be),VisuMZ['SkillLearnSystem'][_0x14af03(0x1d9)](_0x5483be);},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x1d9)]=function(_0x19a6be){const _0x120173=_0x1d7d7f,_0x2f47e2=VisuMZ['SkillLearnSystem'][_0x120173(0x205)];VisuMZ[_0x120173(0x1b2)]['createCostJS'](_0x19a6be,_0x120173(0x1ea),_0x2f47e2[_0x120173(0x1ea)]),VisuMZ[_0x120173(0x1b2)][_0x120173(0xe4)](_0x19a6be,'jsLearnCpCost',_0x2f47e2[_0x120173(0x18e)]),VisuMZ[_0x120173(0x1b2)]['createCostJS'](_0x19a6be,'jsLearnJpCost',_0x2f47e2[_0x120173(0x217)]),VisuMZ['SkillLearnSystem'][_0x120173(0xe4)](_0x19a6be,_0x120173(0x130),_0x2f47e2['jsLearnSpCost']),VisuMZ[_0x120173(0x1b2)][_0x120173(0x2a0)](_0x19a6be,'jsLearnShow',_0x2f47e2[_0x120173(0x1fc)]),VisuMZ[_0x120173(0x1b2)]['createConditionJS'](_0x19a6be,'jsLearnReq',_0x2f47e2[_0x120173(0x180)]),VisuMZ[_0x120173(0x1b2)]['createTextJS'](_0x19a6be,_0x120173(0x7c),_0x2f47e2[_0x120173(0x7c)]),VisuMZ[_0x120173(0x1b2)]['createTextJS'](_0x19a6be,'jsLearnShowDetailTxt',_0x2f47e2['jsLearnShowDetailTxt']),VisuMZ['SkillLearnSystem'][_0x120173(0x11a)](_0x19a6be,_0x120173(0x215),_0x2f47e2['jsLearnReqListTxt']),VisuMZ[_0x120173(0x1b2)]['createTextJS'](_0x19a6be,_0x120173(0x30d),_0x2f47e2['jsLearnReqDetailTxt']),VisuMZ['SkillLearnSystem'][_0x120173(0x17e)](_0x19a6be,_0x120173(0x118),_0x2f47e2[_0x120173(0x118)]);},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0xe4)]=function(_0x59e02c,_0x2d7c47,_0x516930){const _0x39d74d=_0x1d7d7f,_0x31cc3d=_0x59e02c[_0x39d74d(0x323)];if(_0x31cc3d[_0x39d74d(0x2fe)](_0x516930)){const _0x562410=String(RegExp['$1']),_0x44e4d1=_0x39d74d(0x111)['format'](_0x562410),_0x540de0=VisuMZ[_0x39d74d(0x1b2)][_0x39d74d(0x1d2)](_0x59e02c,_0x2d7c47);VisuMZ[_0x39d74d(0x1b2)]['JS'][_0x540de0]=new Function(_0x44e4d1);}},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x2a0)]=function(_0x31f9e2,_0x96d690,_0x3fcc6e){const _0xcfde43=_0x1d7d7f,_0x5eb33a=_0x31f9e2[_0xcfde43(0x323)];if(_0x5eb33a[_0xcfde43(0x2fe)](_0x3fcc6e)){if('WKBsz'!==_0xcfde43(0x25e)){const _0x231932=String(RegExp['$1']),_0x39c625=_0xcfde43(0x9b)[_0xcfde43(0x2b8)](_0x231932),_0x331831=VisuMZ['SkillLearnSystem'][_0xcfde43(0x1d2)](_0x31f9e2,_0x96d690);VisuMZ[_0xcfde43(0x1b2)]['JS'][_0x331831]=new Function(_0x39c625);}else try{return _0x548a22(_0x82e6ab['$1']);}catch(_0x43bd47){if(_0x524f41[_0xcfde43(0x21d)]())_0x250992['log'](_0x43bd47);return 0x0;}}},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x281)]=function(_0x4edba2,_0x35736a,_0x3c4820){const _0xa53f6c=_0x1d7d7f,_0x9888c9=_0x4edba2[_0xa53f6c(0x323)];if(_0x9888c9[_0xa53f6c(0x2fe)](_0x3c4820)){if('ewsCo'!==_0xa53f6c(0x225)){const _0x53ebad=String(RegExp['$1']),_0x251923=_0xa53f6c(0x172)[_0xa53f6c(0x2b8)](_0x53ebad),_0x1408e7=VisuMZ[_0xa53f6c(0x1b2)][_0xa53f6c(0x1d2)](_0x4edba2,_0x35736a);VisuMZ[_0xa53f6c(0x1b2)]['JS'][_0x1408e7]=new Function(_0x251923);}else _0xd18d88[_0xa53f6c(0x1b2)][_0xa53f6c(0xf3)][_0xa53f6c(0x158)](this);}},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x11a)]=function(_0x3e0f4f,_0x14f03c,_0x3039a5){const _0xf6e4dd=_0x1d7d7f,_0xe68a37=_0x3e0f4f[_0xf6e4dd(0x323)];if(_0xe68a37[_0xf6e4dd(0x2fe)](_0x3039a5)){if('CbGZq'!=='CbGZq')this[_0xf6e4dd(0xbd)](),this[_0xf6e4dd(0x2cf)]()?this[_0xf6e4dd(0x8e)]():_0xf7925a['SkillLearnSystem'][_0xf6e4dd(0xf7)][_0xf6e4dd(0x158)](this);else{const _0x1201e5=String(RegExp['$1']),_0x46fd32=_0xf6e4dd(0x131)[_0xf6e4dd(0x2b8)](_0x1201e5),_0x3d66b4=VisuMZ[_0xf6e4dd(0x1b2)][_0xf6e4dd(0x1d2)](_0x3e0f4f,_0x14f03c);VisuMZ[_0xf6e4dd(0x1b2)]['JS'][_0x3d66b4]=new Function(_0x46fd32);}}},VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x17e)]=function(_0x4d28ce,_0x471147,_0x5b6f0b){const _0x47e565=_0x1d7d7f,_0x1b6f59=_0x4d28ce[_0x47e565(0x323)];if(_0x1b6f59['match'](_0x5b6f0b)){if('LauvS'!==_0x47e565(0x237)){let _0x3d8532=0x0;const _0x552fed=/^\d+$/[_0x47e565(0x262)](_0x3c5ea4);_0x552fed?_0x3d8532=_0x56c662(_0x24ad0f):_0x3d8532=_0x130abd['getSkillIdWithName'](_0x122f2b);const _0x54bb62=_0x3b42c3[_0x3d8532];if(_0x54bb62){const _0x55e184=_0x27751e[_0x47e565(0x240)][_0x47e565(0x2b8)]('\x5cI[%1]'['format'](_0x54bb62['iconIndex']),_0x54bb62[_0x47e565(0x31a)]),_0x51fbdd=_0x727380[_0x47e565(0x2d9)](_0x3d8532)?_0x1a5496:_0x57c043;_0x4d419d+=_0x51fbdd[_0x47e565(0x2b8)](_0x55e184)+'\x0a';}}else{const _0x311216=String(RegExp['$1']),_0x2ae84b=_0x47e565(0x2e4)[_0x47e565(0x2b8)](_0x311216),_0x4f6e88=VisuMZ[_0x47e565(0x1b2)][_0x47e565(0x1d2)](_0x4d28ce,_0x471147);VisuMZ[_0x47e565(0x1b2)]['JS'][_0x4f6e88]=new Function(_0x2ae84b);}}},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x1d2)]=function(_0x1fe590,_0x3e48bb){const _0x341b70=_0x1d7d7f;if(VisuMZ[_0x341b70(0x1d2)])return VisuMZ[_0x341b70(0x1d2)](_0x1fe590,_0x3e48bb);let _0x26411b='';if($dataActors[_0x341b70(0x30a)](_0x1fe590))_0x26411b=_0x341b70(0x142)[_0x341b70(0x2b8)](_0x1fe590['id'],_0x3e48bb);if($dataClasses[_0x341b70(0x30a)](_0x1fe590))_0x26411b='Class-%1-%2'[_0x341b70(0x2b8)](_0x1fe590['id'],_0x3e48bb);if($dataSkills[_0x341b70(0x30a)](_0x1fe590))_0x26411b=_0x341b70(0x1cd)['format'](_0x1fe590['id'],_0x3e48bb);if($dataItems[_0x341b70(0x30a)](_0x1fe590))_0x26411b=_0x341b70(0x1d3)[_0x341b70(0x2b8)](_0x1fe590['id'],_0x3e48bb);if($dataWeapons[_0x341b70(0x30a)](_0x1fe590))_0x26411b=_0x341b70(0x2ce)[_0x341b70(0x2b8)](_0x1fe590['id'],_0x3e48bb);if($dataArmors[_0x341b70(0x30a)](_0x1fe590))_0x26411b=_0x341b70(0x315)[_0x341b70(0x2b8)](_0x1fe590['id'],_0x3e48bb);if($dataEnemies[_0x341b70(0x30a)](_0x1fe590))_0x26411b=_0x341b70(0x176)[_0x341b70(0x2b8)](_0x1fe590['id'],_0x3e48bb);if($dataStates[_0x341b70(0x30a)](_0x1fe590))_0x26411b='State-%1-%2'[_0x341b70(0x2b8)](_0x1fe590['id'],_0x3e48bb);return _0x26411b;},DataManager[_0x1d7d7f(0xb5)]=function(_0x47e889){const _0x1dd5dc=_0x1d7d7f;_0x47e889=_0x47e889[_0x1dd5dc(0x167)]()[_0x1dd5dc(0x279)](),this[_0x1dd5dc(0x28e)]=this[_0x1dd5dc(0x28e)]||{};if(this[_0x1dd5dc(0x28e)][_0x47e889])return this[_0x1dd5dc(0x28e)][_0x47e889];for(const _0x361941 of $dataClasses){if(_0x1dd5dc(0x2f6)===_0x1dd5dc(0x2f6)){if(!_0x361941)continue;let _0x3be9ba=_0x361941[_0x1dd5dc(0x31a)];_0x3be9ba=_0x3be9ba[_0x1dd5dc(0xbc)](/\x1I\[(\d+)\]/gi,''),_0x3be9ba=_0x3be9ba['replace'](/\\I\[(\d+)\]/gi,''),this[_0x1dd5dc(0x28e)][_0x3be9ba[_0x1dd5dc(0x167)]()[_0x1dd5dc(0x279)]()]=_0x361941['id'];}else return _0xaf4032[_0x1dd5dc(0x277)];}return this['_classIDs'][_0x47e889]||0x0;},DataManager[_0x1d7d7f(0xee)]=function(_0x4e7467){const _0x2dc109=_0x1d7d7f;_0x4e7467=_0x4e7467['toUpperCase']()[_0x2dc109(0x279)](),this[_0x2dc109(0x29e)]=this[_0x2dc109(0x29e)]||{};if(this[_0x2dc109(0x29e)][_0x4e7467])return this[_0x2dc109(0x29e)][_0x4e7467];for(const _0x4f48a1 of $dataSkills){if(_0x2dc109(0x331)!==_0x2dc109(0xa2)){if(!_0x4f48a1)continue;this[_0x2dc109(0x29e)][_0x4f48a1[_0x2dc109(0x31a)][_0x2dc109(0x167)]()[_0x2dc109(0x279)]()]=_0x4f48a1['id'];}else return _0x494354(_0x2c9ece['$1']);}return this['_skillIDs'][_0x4e7467]||0x0;},DataManager[_0x1d7d7f(0xcf)]=function(_0x2e9e42){const _0x484533=_0x1d7d7f;_0x2e9e42=_0x2e9e42[_0x484533(0x167)]()['trim'](),this[_0x484533(0x122)]=this[_0x484533(0x122)]||{};if(this['_itemIDs'][_0x2e9e42])return this['_itemIDs'][_0x2e9e42];for(const _0x5d9caf of $dataItems){if('PJjvl'!==_0x484533(0x2f7)){if(!_0x5d9caf)continue;this['_itemIDs'][_0x5d9caf['name'][_0x484533(0x167)]()[_0x484533(0x279)]()]=_0x5d9caf['id'];}else return _0x534085=_0x3dca02[_0x484533(0x84)],_0x374d1f[_0x484533(0x2b8)](_0x29d2cb,_0x12278c[_0x484533(0x1a4)],_0x484533(0x1f8)[_0x484533(0x2b8)](_0x57884f[_0x484533(0xb4)]),_0xf87b59[_0x484533(0xad)]);}return this[_0x484533(0x122)][_0x2e9e42]||0x0;},DataManager[_0x1d7d7f(0x1aa)]=function(_0x2cf37a){const _0x3acb7f=_0x1d7d7f;_0x2cf37a=_0x2cf37a[_0x3acb7f(0x167)]()[_0x3acb7f(0x279)](),this[_0x3acb7f(0x184)]=this[_0x3acb7f(0x184)]||{};if(this[_0x3acb7f(0x184)][_0x2cf37a])return this[_0x3acb7f(0x184)][_0x2cf37a];for(const _0x5c9dcb of $dataWeapons){if(_0x3acb7f(0x2d1)===_0x3acb7f(0x312))return _0x32fef7(_0x111989['$1']);else{if(!_0x5c9dcb)continue;this[_0x3acb7f(0x184)][_0x5c9dcb[_0x3acb7f(0x31a)][_0x3acb7f(0x167)]()[_0x3acb7f(0x279)]()]=_0x5c9dcb['id'];}}return this[_0x3acb7f(0x184)][_0x2cf37a]||0x0;},DataManager[_0x1d7d7f(0x189)]=function(_0x7f80e0){const _0x38cd2c=_0x1d7d7f;_0x7f80e0=_0x7f80e0[_0x38cd2c(0x167)]()['trim'](),this[_0x38cd2c(0x20d)]=this['_armorIDs']||{};if(this['_armorIDs'][_0x7f80e0])return this[_0x38cd2c(0x20d)][_0x7f80e0];for(const _0x4ebb61 of $dataArmors){if(_0x38cd2c(0x242)===_0x38cd2c(0x31c)){const _0x62c511=_0xae4407(_0x209228['$1']);this['gainAbilityPoints'](_0x62c511);}else{if(!_0x4ebb61)continue;this['_armorIDs'][_0x4ebb61['name']['toUpperCase']()[_0x38cd2c(0x279)]()]=_0x4ebb61['id'];}}return this[_0x38cd2c(0x20d)][_0x7f80e0]||0x0;},DataManager[_0x1d7d7f(0x2e7)]=function(_0x4f761b){const _0x203f24=_0x1d7d7f;if(!$dataClasses[_0x4f761b])return[];const _0x1a880d=[],_0x1d0480=$dataClasses[_0x4f761b][_0x203f24(0x323)],_0x2adc1b=VisuMZ[_0x203f24(0x1b2)][_0x203f24(0x205)],_0x4bf289=_0x1d0480[_0x203f24(0x2fe)](_0x2adc1b['LearnSkillA']);if(_0x4bf289)for(const _0x22e42f of _0x4bf289){if(_0x203f24(0x241)!==_0x203f24(0x23f)){if(!_0x22e42f)continue;_0x22e42f[_0x203f24(0x2fe)](_0x2adc1b[_0x203f24(0x263)]);const _0x2b6a8f=String(RegExp['$1'])[_0x203f24(0x2b6)](',')['map'](_0x141b51=>_0x141b51['trim']());;for(let _0x396593 of _0x2b6a8f){_0x396593=(String(_0x396593)||'')['trim']();const _0x3efbf2=/^\d+$/[_0x203f24(0x262)](_0x396593);_0x3efbf2?_0x1a880d['push'](Number(_0x396593)):_0x1a880d[_0x203f24(0xce)](DataManager['getSkillIdWithName'](_0x396593));}}else{const _0x17605b=_0x31f330(_0x46480c['$1']);this['subject']()[_0x203f24(0x24d)](_0x17605b);}}const _0x2c4be5=_0x1d0480[_0x203f24(0x2fe)](_0x2adc1b[_0x203f24(0x1ce)]);if(_0x2c4be5){if(_0x203f24(0x11b)!==_0x203f24(0x112))for(const _0x4c79b8 of _0x2c4be5){if(!_0x4c79b8)continue;_0x4c79b8[_0x203f24(0x2fe)](_0x2adc1b[_0x203f24(0x263)]);const _0x18f8d7=String(RegExp['$1'])[_0x203f24(0x2b6)](/[\r\n]+/);for(let _0x5f144b of _0x18f8d7){_0x5f144b=(String(_0x5f144b)||'')[_0x203f24(0x279)]();const _0xd43738=/^\d+$/[_0x203f24(0x262)](_0x5f144b);if(_0xd43738)_0x203f24(0xd8)!==_0x203f24(0x199)?_0x1a880d[_0x203f24(0xce)](Number(_0x5f144b)):_0x1833e2['id']=_0x573de6(_0x215bd4);else{if('mtoHF'===_0x203f24(0x29c)){const _0x219b59=this['textSizeEx'](_0x3ec9c7)[_0x203f24(0xf0)],_0x2aa90d=_0x5eac37+_0x213abf[_0x203f24(0x7a)](_0x4db9f0-_0x219b59);this['drawTextEx'](_0x4a4abf,_0x2aa90d,_0x3fe552);}else _0x1a880d[_0x203f24(0xce)](DataManager[_0x203f24(0xee)](_0x5f144b));}}}else{const _0x135c10=_0x16eef8[_0x203f24(0x1b2)][_0x203f24(0x185)][_0x203f24(0x260)];_0x135c10[_0x203f24(0x22c)]?_0x47bf0d=0x0:_0x4d1f75=_0x54a050||this[_0x203f24(0xd4)]()['id'],_0x2ef9aa+=this[_0x203f24(0x107)](_0x122db2),this['setAbilityPoints'](_0xeb1bb,_0x330330);}}return _0x1a880d[_0x203f24(0x121)]((_0x2e3c26,_0x3874ed)=>_0x2e3c26-_0x3874ed)[_0x203f24(0xb2)]((_0x24da2b,_0xfeeea,_0x45884a)=>_0x45884a[_0x203f24(0x99)](_0x24da2b)===_0xfeeea);},DataManager[_0x1d7d7f(0x2d4)]=function(_0x33776a){const _0x593876=_0x1d7d7f;if(!_0x33776a)return 0x0;if(!DataManager[_0x593876(0x238)](_0x33776a))return 0x0;const _0x269615=VisuMZ[_0x593876(0x1b2)][_0x593876(0x205)],_0x5e64de=_0x33776a[_0x593876(0x323)];if(_0x5e64de['match'](_0x269615[_0x593876(0xe8)]))return Number(RegExp['$1']);if(_0x5e64de[_0x593876(0x2fe)](_0x269615[_0x593876(0xc5)])){const _0x42dfd2=String(RegExp['$1'])[_0x593876(0x2b6)](/[\r\n]+/);for(const _0x21941c of _0x42dfd2){if(_0x593876(0x313)!==_0x593876(0x24a)){if(_0x21941c[_0x593876(0x2fe)](/(?:ABILITY POINTS|AP):[ ](\d+)/gi))return Number(RegExp['$1']);}else _0x4676a7=_0x49994a['format'](_0x119109,_0xa1549f);}}const _0x3568f7=VisuMZ['SkillLearnSystem']['createKeyJS'](_0x33776a,_0x593876(0x1ea));if(VisuMZ[_0x593876(0x1b2)]['JS'][_0x3568f7]){const _0x613d76=SceneManager[_0x593876(0x14a)][_0x593876(0xcb)]();return VisuMZ[_0x593876(0x1b2)]['JS'][_0x3568f7][_0x593876(0x158)](this,_0x613d76,_0x33776a);}return VisuMZ['SkillLearnSystem'][_0x593876(0x185)][_0x593876(0x260)][_0x593876(0xfe)]||0x0;},DataManager[_0x1d7d7f(0xbb)]=function(_0x50a19d){const _0x5bfa06=_0x1d7d7f;if(!_0x50a19d)return 0x0;if(!DataManager[_0x5bfa06(0x238)](_0x50a19d))return 0x0;const _0x9a8adc=VisuMZ['SkillLearnSystem'][_0x5bfa06(0x205)],_0x1f9d56=_0x50a19d['note'];if(_0x1f9d56[_0x5bfa06(0x2fe)](_0x9a8adc[_0x5bfa06(0x11f)]))return Number(RegExp['$1']);if(_0x1f9d56[_0x5bfa06(0x2fe)](_0x9a8adc[_0x5bfa06(0xc5)])){if('OaRrg'!==_0x5bfa06(0xf1)){const _0x13c9ab=String(RegExp['$1'])[_0x5bfa06(0x2b6)](/[\r\n]+/);for(const _0x1b9d72 of _0x13c9ab){if('HNvur'!==_0x5bfa06(0xed)){if(_0x1b9d72[_0x5bfa06(0x2fe)](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return Number(RegExp['$1']);}else this[_0x5bfa06(0xb6)]();}}else return this[_0x5bfa06(0xbe)](_0x56e9a2);}const _0x3c29ad=VisuMZ['SkillLearnSystem'][_0x5bfa06(0x1d2)](_0x50a19d,_0x5bfa06(0x18e));if(VisuMZ[_0x5bfa06(0x1b2)]['JS'][_0x3c29ad]){if(_0x5bfa06(0x2b4)==='POQLn')_0x26ad91=_0x1d1c96;else{const _0x2a3cfd=SceneManager[_0x5bfa06(0x14a)][_0x5bfa06(0xcb)]();return VisuMZ[_0x5bfa06(0x1b2)]['JS'][_0x3c29ad][_0x5bfa06(0x158)](this,_0x2a3cfd,_0x50a19d)||0x0;}}return VisuMZ[_0x5bfa06(0xde)]['Settings']['ClassPoints'][_0x5bfa06(0xfe)]||0x0;},DataManager['getSkillLearnJobPointCost']=function(_0x5a7896){const _0x4db34b=_0x1d7d7f;if(!_0x5a7896)return 0x0;if(!DataManager[_0x4db34b(0x238)](_0x5a7896))return 0x0;const _0x15ba6e=VisuMZ[_0x4db34b(0x1b2)]['RegExp'],_0xfca871=_0x5a7896[_0x4db34b(0x323)];if(_0xfca871[_0x4db34b(0x2fe)](_0x15ba6e['LearnJpCost']))return Number(RegExp['$1']);if(_0xfca871['match'](_0x15ba6e[_0x4db34b(0xc5)])){const _0x40b38d=String(RegExp['$1'])[_0x4db34b(0x2b6)](/[\r\n]+/);for(const _0x494726 of _0x40b38d){if(_0x494726[_0x4db34b(0x2fe)](/(?:JOB POINTS|JP):[ ](\d+)/gi)){if('NBGoG'!==_0x4db34b(0x294))_0xda66dc=0x0;else return Number(RegExp['$1']);}}}const _0x2efd51=VisuMZ[_0x4db34b(0x1b2)][_0x4db34b(0x1d2)](_0x5a7896,_0x4db34b(0x217));if(VisuMZ[_0x4db34b(0x1b2)]['JS'][_0x2efd51]){const _0x3f7eef=SceneManager['_scene']['user']();return VisuMZ[_0x4db34b(0x1b2)]['JS'][_0x2efd51][_0x4db34b(0x158)](this,_0x3f7eef,_0x5a7896);}return VisuMZ['ClassChangeSystem'][_0x4db34b(0x185)][_0x4db34b(0x1fb)][_0x4db34b(0xfe)]||0x0;},DataManager[_0x1d7d7f(0x1eb)]=function(_0x17fb63){const _0x4f63db=_0x1d7d7f;if(!_0x17fb63)return 0x0;if(!DataManager[_0x4f63db(0x238)](_0x17fb63))return 0x0;const _0x928fd5=VisuMZ[_0x4f63db(0x1b2)][_0x4f63db(0x205)],_0x3e9db1=_0x17fb63['note'];if(_0x3e9db1[_0x4f63db(0x2fe)](_0x928fd5[_0x4f63db(0x78)])){if(_0x4f63db(0x1ca)!==_0x4f63db(0x1ca))_0x1a169c=_0x787d;else return Number(RegExp['$1']);}if(_0x3e9db1['match'](_0x928fd5[_0x4f63db(0xc5)])){const _0x59e2b1=String(RegExp['$1'])[_0x4f63db(0x2b6)](/[\r\n]+/);for(const _0x4de9af of _0x59e2b1){if(_0x4de9af['match'](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return Number(RegExp['$1']);}}const _0x5a07a3=VisuMZ['SkillLearnSystem'][_0x4f63db(0x1d2)](_0x17fb63,_0x4f63db(0x130));if(VisuMZ[_0x4f63db(0x1b2)]['JS'][_0x5a07a3]){const _0x1b716c=SceneManager[_0x4f63db(0x14a)][_0x4f63db(0xcb)]();return VisuMZ['SkillLearnSystem']['JS'][_0x5a07a3][_0x4f63db(0x158)](this,_0x1b716c,_0x17fb63);}return VisuMZ[_0x4f63db(0x1b2)]['Settings'][_0x4f63db(0x143)][_0x4f63db(0xfe)]||0x0;},DataManager[_0x1d7d7f(0x2a4)]=function(_0x3bb39a){const _0x27aae1=_0x1d7d7f;if(!_0x3bb39a)return 0x0;if(!DataManager[_0x27aae1(0x238)](_0x3bb39a))return 0x0;const _0x4b2c3a=VisuMZ[_0x27aae1(0x1b2)][_0x27aae1(0x205)],_0x2b783a=_0x3bb39a[_0x27aae1(0x323)],_0xed4066=[],_0x920617=_0x2b783a[_0x27aae1(0x2fe)](_0x4b2c3a['LearnItemCost']);if(_0x920617)for(const _0x27b5c2 of _0x920617){if(!_0x27b5c2)continue;_0x27b5c2[_0x27aae1(0x2fe)](_0x4b2c3a[_0x27aae1(0x134)]);const _0x10c9b9=String(RegExp['$1']),_0x220adf={'id':0x0,'quantity':Number(RegExp['$2'])},_0x35cbdb=/^\d+$/[_0x27aae1(0x262)](_0x10c9b9);_0x35cbdb?_0x220adf['id']=Number(_0x10c9b9):_0x220adf['id']=DataManager[_0x27aae1(0xcf)](_0x10c9b9),_0x220adf['id']>0x0&&_0xed4066['push'](_0x220adf);}if(_0x2b783a[_0x27aae1(0x2fe)](_0x4b2c3a[_0x27aae1(0xc5)])){if('mybBC'===_0x27aae1(0xb0)){const _0xa2bbab=String(RegExp['$1'])[_0x27aae1(0x2b6)](/[\r\n]+/);for(const _0x3b8e59 of _0xa2bbab){if(_0x3b8e59[_0x27aae1(0x2fe)](/ITEM[ ](.*):[ ](\d+)/gi)){const _0x1dd53c=String(RegExp['$1']),_0x3e2f4c={'id':0x0,'quantity':Number(RegExp['$2'])},_0x570821=/^\d+$/[_0x27aae1(0x262)](_0x1dd53c);_0x570821?_0x3e2f4c['id']=Number(_0x1dd53c):_0x3e2f4c['id']=DataManager['getItemIdWithName'](_0x1dd53c),_0x3e2f4c['id']>0x0&&_0xed4066[_0x27aae1(0xce)](_0x3e2f4c);}}}else _0x58219d=_0x4f3f5a(_0x28e3b7);}return _0xed4066;},DataManager[_0x1d7d7f(0x179)]=function(_0x30383e){const _0xea28bd=_0x1d7d7f;if(!_0x30383e)return 0x0;if(!DataManager['isSkill'](_0x30383e))return 0x0;const _0x134ca2=VisuMZ[_0xea28bd(0x1b2)]['RegExp'],_0x5f50bc=_0x30383e[_0xea28bd(0x323)],_0x5e7a4b=[],_0x223055=_0x5f50bc[_0xea28bd(0x2fe)](_0x134ca2[_0xea28bd(0x19d)]);if(_0x223055){if(_0xea28bd(0x11e)===_0xea28bd(0x295))_0x1b7c78[_0xea28bd(0xce)](_0x34894c);else for(const _0x5845e5 of _0x223055){if(_0xea28bd(0xd5)!==_0xea28bd(0xd5)){const _0x58a9c5=_0x451ba0(_0x46a859['$1']);this[_0xea28bd(0x24d)](_0x58a9c5);}else{if(!_0x5845e5)continue;_0x5845e5[_0xea28bd(0x2fe)](_0x134ca2['LearnWeaponCost']);const _0x26a5eb=String(RegExp['$1']),_0x10bd48={'id':0x0,'quantity':Number(RegExp['$2'])},_0x30d904=/^\d+$/['test'](_0x26a5eb);if(_0x30d904)_0xea28bd(0x135)!==_0xea28bd(0x135)?(_0x10640c[_0xea28bd(0x127)]('CP'),_0x3a5049[_0xea28bd(0x127)]('JP')):_0x10bd48['id']=Number(_0x26a5eb);else{if('MNApA'!==_0xea28bd(0x19c)){if(!_0x5162d0)return![];if(_0x46e356['name'][_0xea28bd(0x1c5)]<=0x0)return![];if(_0x2b7ee8[_0xea28bd(0x31a)][_0xea28bd(0x2fe)](/-----/i))return![];if(this[_0xea28bd(0x16b)]['isLearnedSkill'](_0x19d352['id']))return![];if(this[_0xea28bd(0x75)]){if(!this[_0xea28bd(0x16b)][_0xea28bd(0x284)](_0x8df983))return![];return this[_0xea28bd(0x16b)][_0xea28bd(0x27b)](_0x32897e);}return!![];}else _0x10bd48['id']=DataManager[_0xea28bd(0x1aa)](_0x26a5eb);}_0x10bd48['id']>0x0&&_0x5e7a4b[_0xea28bd(0xce)](_0x10bd48);}}}if(_0x5f50bc['match'](_0x134ca2[_0xea28bd(0xc5)])){const _0x4dde5d=String(RegExp['$1'])[_0xea28bd(0x2b6)](/[\r\n]+/);for(const _0x13afd5 of _0x4dde5d){if(_0xea28bd(0x1d7)!==_0xea28bd(0x1d7))return this['_actor']&&!this[_0xea28bd(0x16b)][_0xea28bd(0x284)](_0x27494f);else{if(_0x13afd5['match'](/WEAPON[ ](.*):[ ](\d+)/gi)){const _0x286ebd=String(RegExp['$1']),_0x58ae3b={'id':0x0,'quantity':Number(RegExp['$2'])},_0x43154e=/^\d+$/[_0xea28bd(0x262)](_0x286ebd);if(_0x43154e)_0xea28bd(0x324)==='zYOpt'?(_0x44066a=_0x4f5b2c,_0x248d56+=_0x2c2440+this[_0xea28bd(0x86)]()*0x2):_0x58ae3b['id']=Number(_0x286ebd);else{if(_0xea28bd(0x26e)!==_0xea28bd(0x26e))return _0x9655c3=_0x216441[_0xea28bd(0x203)],_0x2a30d9[_0xea28bd(0x2b8)](_0x23ef69,_0x5ea488[_0xea28bd(0x7b)],'\x5cI[%1]'[_0xea28bd(0x2b8)](_0x1f0685[_0xea28bd(0x1e0)]),_0x4c3bb2[_0xea28bd(0x2b0)]);else _0x58ae3b['id']=DataManager[_0xea28bd(0x1aa)](_0x286ebd);}_0x58ae3b['id']>0x0&&_0x5e7a4b[_0xea28bd(0xce)](_0x58ae3b);}}}}return _0x5e7a4b;},DataManager[_0x1d7d7f(0x105)]=function(_0xa291f5){const _0x5930a4=_0x1d7d7f;if(!_0xa291f5)return 0x0;if(!DataManager['isSkill'](_0xa291f5))return 0x0;const _0x55a3af=VisuMZ[_0x5930a4(0x1b2)]['RegExp'],_0x3f1e2d=_0xa291f5[_0x5930a4(0x323)],_0x5bccbb=[],_0x576609=_0x3f1e2d[_0x5930a4(0x2fe)](_0x55a3af[_0x5930a4(0xc4)]);if(_0x576609){if('IZFbu'===_0x5930a4(0x2a7))for(const _0x576863 of _0x576609){if(_0x5930a4(0x2bc)!=='DkIhW'){if(!_0x576863)continue;_0x576863['match'](_0x55a3af[_0x5930a4(0xc4)]);const _0x563dcb=String(RegExp['$1']),_0x5802ea={'id':0x0,'quantity':Number(RegExp['$2'])},_0x49bab9=/^\d+$/[_0x5930a4(0x262)](_0x563dcb);_0x49bab9?_0x5802ea['id']=Number(_0x563dcb):_0x5802ea['id']=DataManager['getArmorIdWithName'](_0x563dcb),_0x5802ea['id']>0x0&&(_0x5930a4(0x328)!==_0x5930a4(0x328)?_0x428338=_0x3b0652:_0x5bccbb['push'](_0x5802ea));}else _0x5a638b!==''?_0x5f389c=_0xb667e8[_0x5930a4(0x2b8)](_0x13ec99,_0x237460):_0x374071=_0x15bc08;}else{const _0x337bc6=_0x181feb[_0x5930a4(0x323)];if(_0x337bc6[_0x5930a4(0x2fe)](_0x49a732)){const _0x14fcfe=_0x1b11db(_0x4f7312['$1']),_0x1072df='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x5930a4(0x2b8)](_0x14fcfe),_0x1d3c3f=_0x24751c[_0x5930a4(0x1b2)][_0x5930a4(0x1d2)](_0x4fe210,_0x261733);_0x2151ea[_0x5930a4(0x1b2)]['JS'][_0x1d3c3f]=new _0x15f01e(_0x1072df);}}}if(_0x3f1e2d['match'](_0x55a3af[_0x5930a4(0xc5)])){if('IyJbt'!==_0x5930a4(0x1a1)){const _0x3aeeaa=String(RegExp['$1'])[_0x5930a4(0x2b6)](/[\r\n]+/);for(const _0x3ef697 of _0x3aeeaa){if(_0x5930a4(0x25a)!==_0x5930a4(0xa9)){if(_0x3ef697[_0x5930a4(0x2fe)](/ARMOR[ ](.*):[ ](\d+)/gi)){if('SESZO'===_0x5930a4(0x207)){const _0x91c811=String(RegExp['$1']),_0x156174={'id':0x0,'quantity':Number(RegExp['$2'])},_0x1851f5=/^\d+$/[_0x5930a4(0x262)](_0x91c811);if(_0x1851f5)_0x156174['id']=Number(_0x91c811);else{if('qjJSE'!==_0x5930a4(0x2f3))_0x156174['id']=DataManager[_0x5930a4(0x189)](_0x91c811);else{const _0xe87000=_0x34f9a3(_0x1b6436['$1']);if(_0xe87000>this[_0x5930a4(0x88)])return![];}}_0x156174['id']>0x0&&_0x5bccbb[_0x5930a4(0xce)](_0x156174);}else{if(_0x30ff0b['match'](/(?:CLASS POINTS|CP):[ ](\d+)/gi))return _0x311c0d(_0x4187e5['$1']);}}}else this['_skillLearnAnimationPlaying']=!![],this['_skillLearnAnimationWait']=0x14,this[_0x5930a4(0xf5)][_0x5930a4(0x9d)]=_0x576ae9[_0x5930a4(0x1b2)][_0x5930a4(0x185)][_0x5930a4(0x321)][_0x5930a4(0x16a)]||![],this[_0x5930a4(0x14f)]();}}else{_0x45a453=_0x48de5a||_0x5930a4(0xd0);const _0x28702b=_0x5930a4(0x1f8)['format'](_0x4152a4[_0x5930a4(0x1e0)]),_0x447aab=_0x242655['skillPointsFmt'],_0x300f92=_0x447aab['format'](_0x3695f5,_0x3ca560[_0x5930a4(0x7b)],_0x28702b,_0x2db800[_0x5930a4(0x2b0)]),_0x346a6f=this[_0x5930a4(0x2df)](_0x300f92)[_0x5930a4(0xf0)];if(_0x220699===_0x5930a4(0xd0))_0x48860c+=0x0;else _0x448cbe===_0x5930a4(0x139)?_0x15513a+=_0x3b2d82[_0x5930a4(0x7a)]((_0x2b723a-_0x346a6f)/0x2):_0x153883+=_0x57aa39-_0x346a6f;this[_0x5930a4(0xa1)](_0x300f92,_0x1a8dfb,_0x559184);}}return _0x5bccbb;},DataManager['getSkillLearnGoldCost']=function(_0x1aebc4){const _0xa0703e=_0x1d7d7f;if(!_0x1aebc4)return 0x0;if(!DataManager[_0xa0703e(0x238)](_0x1aebc4))return 0x0;const _0x405540=VisuMZ[_0xa0703e(0x1b2)][_0xa0703e(0x205)],_0xdd637b=_0x1aebc4[_0xa0703e(0x323)];if(_0xdd637b[_0xa0703e(0x2fe)](_0x405540['LearnGoldCost']))return Number(RegExp['$1']);if(_0xdd637b[_0xa0703e(0x2fe)](_0x405540['LearnCostBatch'])){if(_0xa0703e(0x173)!==_0xa0703e(0x104)){const _0x53624c=String(RegExp['$1'])[_0xa0703e(0x2b6)](/[\r\n]+/);for(const _0x218ebe of _0x53624c){if(_0x218ebe[_0xa0703e(0x2fe)](/GOLD:[ ](\d+)/gi)){if(_0xa0703e(0x22a)===_0xa0703e(0x22a))return Number(RegExp['$1']);else this[_0xa0703e(0x28d)]={};}}}else this[_0xa0703e(0x2ec)]=[],this[_0xa0703e(0x164)]()['note'][_0xa0703e(0x2fe)](_0x332db8['SkillLearnSystem'][_0xa0703e(0x205)][_0xa0703e(0x1c9)])?this['_skillLearnAnimationIDs']=_0x81cf81['$1'][_0xa0703e(0x2b6)](',')[_0xa0703e(0x2ae)](_0x302a43=>_0xe866d5(_0x302a43)):this['_skillLearnAnimationIDs']=this[_0xa0703e(0x2ec)][_0xa0703e(0x20a)](_0x2bf57c[_0xa0703e(0x1b2)][_0xa0703e(0x185)][_0xa0703e(0x321)]['Animations']);}return 0x0;},TextManager[_0x1d7d7f(0x27c)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x1ee)][_0x1d7d7f(0x2d8)],ImageManager[_0x1d7d7f(0x301)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x260)][_0x1d7d7f(0x2d8)],ImageManager[_0x1d7d7f(0x1e0)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x143)][_0x1d7d7f(0x2d8)],SoundManager[_0x1d7d7f(0x29b)]=function(){const _0x18b80c=_0x1d7d7f;AudioManager[_0x18b80c(0xd7)](VisuMZ[_0x18b80c(0x1b2)][_0x18b80c(0x185)][_0x18b80c(0x2a6)]);},TextManager['skillLearnAlreadyLearned']=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)]['General'][_0x1d7d7f(0x31e)],TextManager['skillLearnReqHeaderFmt']=VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x185)][_0x1d7d7f(0x226)]['RequireFmt'],TextManager['skillLearnReqSeparatorFmt']=VisuMZ[_0x1d7d7f(0x1b2)]['Settings'][_0x1d7d7f(0x226)]['ReqSeparateFmt'],TextManager[_0x1d7d7f(0xca)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)]['General'][_0x1d7d7f(0x91)],TextManager[_0x1d7d7f(0x82)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x226)][_0x1d7d7f(0x1ff)],TextManager[_0x1d7d7f(0x2ef)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)]['General']['ReqSwitchFmt'],TextManager[_0x1d7d7f(0x197)]=VisuMZ[_0x1d7d7f(0x1b2)]['Settings'][_0x1d7d7f(0x226)][_0x1d7d7f(0x2eb)],TextManager[_0x1d7d7f(0x286)]=VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x185)][_0x1d7d7f(0x226)]['ItemFmt'],TextManager[_0x1d7d7f(0x1ba)]=VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x185)][_0x1d7d7f(0x226)][_0x1d7d7f(0x234)],TextManager['skillLearnArmorFmt']=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)]['General'][_0x1d7d7f(0x2a2)],TextManager[_0x1d7d7f(0x211)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x226)][_0x1d7d7f(0x1ec)],TextManager[_0x1d7d7f(0x90)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x1ee)]['Name'],TextManager[_0x1d7d7f(0x2a3)]=VisuMZ[_0x1d7d7f(0x1b2)]['Settings'][_0x1d7d7f(0x8f)][_0x1d7d7f(0x259)],TextManager[_0x1d7d7f(0x8c)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)]['Window'][_0x1d7d7f(0x19a)],TextManager[_0x1d7d7f(0x13d)]=VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x185)][_0x1d7d7f(0x8f)][_0x1d7d7f(0x322)],TextManager[_0x1d7d7f(0xba)]=VisuMZ[_0x1d7d7f(0x1b2)]['Settings'][_0x1d7d7f(0x8f)][_0x1d7d7f(0x91)],TextManager[_0x1d7d7f(0x240)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x8f)][_0x1d7d7f(0x1ff)],TextManager['skillLearnReqListSwitch']=VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x185)][_0x1d7d7f(0x8f)][_0x1d7d7f(0x1b9)],TextManager[_0x1d7d7f(0x248)]=VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x185)]['Window'][_0x1d7d7f(0x187)],TextManager[_0x1d7d7f(0x7d)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x8f)][_0x1d7d7f(0x32b)],TextManager['skillLearningCost']=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)]['Window'][_0x1d7d7f(0x1c6)],TextManager[_0x1d7d7f(0x2ba)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x8f)][_0x1d7d7f(0x1ef)],TextManager[_0x1d7d7f(0x308)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x8f)][_0x1d7d7f(0x31b)],TextManager[_0x1d7d7f(0x24f)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x8f)][_0x1d7d7f(0xfa)],TextManager['abilityPointsFull']=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x260)][_0x1d7d7f(0x29a)],TextManager[_0x1d7d7f(0x81)]=VisuMZ[_0x1d7d7f(0x1b2)]['Settings'][_0x1d7d7f(0x260)][_0x1d7d7f(0x24b)],TextManager['abilityPointsFmt']=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)][_0x1d7d7f(0x260)][_0x1d7d7f(0x2e0)],TextManager[_0x1d7d7f(0x2b0)]=VisuMZ[_0x1d7d7f(0x1b2)]['Settings'][_0x1d7d7f(0x143)][_0x1d7d7f(0x29a)],TextManager[_0x1d7d7f(0x7b)]=VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x185)]['SkillPoints'][_0x1d7d7f(0x24b)],TextManager[_0x1d7d7f(0x203)]=VisuMZ[_0x1d7d7f(0x1b2)]['Settings'][_0x1d7d7f(0x143)]['TextFmt'],VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x270)]=BattleManager['makeRewards'],BattleManager['makeRewards']=function(){const _0x550953=_0x1d7d7f;VisuMZ[_0x550953(0x1b2)][_0x550953(0x270)]['call'](this),this['makeRewardsAbilityPoints'](),this[_0x550953(0x2aa)](),this[_0x550953(0xc2)](),this[_0x550953(0x206)]();},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x196)]=BattleManager[_0x1d7d7f(0x195)],BattleManager[_0x1d7d7f(0x195)]=function(){const _0x11c8b3=_0x1d7d7f;VisuMZ[_0x11c8b3(0x1b2)]['BattleManager_displayRewards'][_0x11c8b3(0x158)](this),this['displayRewardsAbilityPoints'](),this[_0x11c8b3(0x274)]();},BattleManager[_0x1d7d7f(0x1cb)]=function(){const _0x2c5a0c=_0x1d7d7f;this['_rewards']['abilityPoints']=$gameTroop[_0x2c5a0c(0x10a)]();},BattleManager[_0x1d7d7f(0x2be)]=function(){const _0x1e04b7=_0x1d7d7f;if(!this[_0x1e04b7(0x213)]())return;$gameMessage['newPage']();const _0x45acd3=$gameParty[_0x1e04b7(0x22f)](),_0x5c3617=VisuMZ[_0x1e04b7(0x1b2)][_0x1e04b7(0x185)][_0x1e04b7(0x260)],_0x311663=_0x5c3617['VictoryText'];for(const _0x5ba990 of _0x45acd3){if(!_0x5ba990)continue;const _0x378b74=_0x311663[_0x1e04b7(0x2b8)](_0x5ba990[_0x1e04b7(0x31a)](),_0x5ba990[_0x1e04b7(0x1e8)](),TextManager['abilityPointsAbbr'],TextManager[_0x1e04b7(0x29d)]);$gameMessage['add']('\x5c.'+_0x378b74);}},BattleManager['gainRewardsAbilityPoints']=function(){const _0x54a88a=_0x1d7d7f;this[_0x54a88a(0xaf)]['abilityPoints']=this[_0x54a88a(0xaf)][_0x54a88a(0x16d)]||0x0;let _0x10c02d=$gameParty[_0x54a88a(0x300)]();if(VisuMZ[_0x54a88a(0x1b2)][_0x54a88a(0x185)][_0x54a88a(0x260)]['AliveActors']){if(_0x54a88a(0x2c1)===_0x54a88a(0x219)){if(_0x3916f3[_0x54a88a(0x21d)]())_0x572d83[_0x54a88a(0x1de)](_0x226154);return 0x0;}else _0x10c02d=_0x10c02d['filter'](_0x2ffa0e=>_0x2ffa0e[_0x54a88a(0x289)]());}for(const _0x41ef88 of _0x10c02d){if('TXFNZ'===_0x54a88a(0x1df)){const _0x6cc547=_0x5ee8d1(_0x2236ae['$1'])[_0x54a88a(0x2b6)](',')['map'](_0x329133=>_0x202a95(_0x329133));for(const _0x22ae22 of _0x6cc547){if(!_0x33de52[_0x54a88a(0x1b1)](_0x22ae22))return![];}}else{if(!_0x41ef88)continue;if(!$dataSystem['optExtraExp']&&!_0x41ef88['isBattleMember']())continue;_0x41ef88[_0x54a88a(0x1e1)](this[_0x54a88a(0xaf)][_0x54a88a(0x16d)]),_0x41ef88[_0x54a88a(0x21b)](this[_0x54a88a(0xaf)][_0x54a88a(0x16d)]);}}},BattleManager[_0x1d7d7f(0x213)]=function(){const _0x5e819a=_0x1d7d7f;return VisuMZ[_0x5e819a(0x1b2)]['Settings'][_0x5e819a(0x260)][_0x5e819a(0x2da)];},BattleManager[_0x1d7d7f(0xc2)]=function(){const _0x57ee5a=_0x1d7d7f;this[_0x57ee5a(0xaf)][_0x57ee5a(0x1d4)]=$gameTroop['skillPointsTotal']();},BattleManager[_0x1d7d7f(0x274)]=function(){const _0x235d79=_0x1d7d7f;if(!this[_0x235d79(0xab)]())return;$gameMessage[_0x235d79(0x2d3)]();const _0x330d66=$gameParty[_0x235d79(0x22f)](),_0x4fc771=VisuMZ['SkillLearnSystem']['Settings']['SkillPoints'],_0x536114=_0x4fc771[_0x235d79(0x141)];for(const _0x3c0d4f of _0x330d66){if(!_0x3c0d4f)continue;const _0x3d6606=_0x536114['format'](_0x3c0d4f['name'](),_0x3c0d4f['earnedSkillPoints'](),TextManager['skillPointsAbbr'],TextManager['skillPointsFmt']);$gameMessage[_0x235d79(0x194)]('\x5c.'+_0x3d6606);}},BattleManager[_0x1d7d7f(0x206)]=function(){const _0x30d4e3=_0x1d7d7f;this['_rewards'][_0x30d4e3(0x1d4)]=this[_0x30d4e3(0xaf)]['skillPoints']||0x0;let _0x1f6c08=$gameParty[_0x30d4e3(0x300)]();VisuMZ[_0x30d4e3(0x1b2)]['Settings'][_0x30d4e3(0x143)]['AliveActors']&&(_0x30d4e3(0x332)!==_0x30d4e3(0x332)?_0x34cc85=_0x20e1b5(_0x4566b4):_0x1f6c08=_0x1f6c08['filter'](_0x1ae94f=>_0x1ae94f[_0x30d4e3(0x289)]()));for(const _0x2eafc2 of _0x1f6c08){if('wFFow'===_0x30d4e3(0xa6)){if(!_0x2eafc2)continue;if(!$dataSystem[_0x30d4e3(0x204)]&&!_0x2eafc2[_0x30d4e3(0x110)]())continue;_0x2eafc2[_0x30d4e3(0x24d)](this[_0x30d4e3(0xaf)][_0x30d4e3(0x1d4)]),_0x2eafc2[_0x30d4e3(0x2fd)](this[_0x30d4e3(0xaf)][_0x30d4e3(0x1d4)]);}else{const _0x4041e7=_0x3074aa(_0x5948c5['$1'])[_0x30d4e3(0x2b6)](',')[_0x30d4e3(0x2ae)](_0x1952fb=>_0x544e44(_0x1952fb));for(const _0x19df1c of _0x4041e7){if(!_0x34eec0[_0x30d4e3(0x1b1)](_0x19df1c))return![];}}}},BattleManager[_0x1d7d7f(0xab)]=function(){const _0x2cf447=_0x1d7d7f;return VisuMZ['SkillLearnSystem'][_0x2cf447(0x185)][_0x2cf447(0x143)][_0x2cf447(0x2da)];},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x2d0)]=Game_System[_0x1d7d7f(0x175)]['initialize'],Game_System['prototype'][_0x1d7d7f(0x2b7)]=function(){const _0x3a4c7b=_0x1d7d7f;VisuMZ[_0x3a4c7b(0x1b2)][_0x3a4c7b(0x2d0)][_0x3a4c7b(0x158)](this),this['initSkillLearnSystemMenuAccess']();},Game_System[_0x1d7d7f(0x175)][_0x1d7d7f(0x26f)]=function(){const _0x389248=_0x1d7d7f;this[_0x389248(0x218)]=VisuMZ[_0x389248(0x1b2)][_0x389248(0x185)][_0x389248(0x1ee)][_0x389248(0x256)];},Game_System[_0x1d7d7f(0x175)][_0x1d7d7f(0x138)]=function(){const _0x54246b=_0x1d7d7f;return this[_0x54246b(0x218)]===undefined&&this[_0x54246b(0x26f)](),this[_0x54246b(0x218)];},Game_System[_0x1d7d7f(0x175)][_0x1d7d7f(0x214)]=function(_0x3e51e9){const _0x428eb3=_0x1d7d7f;this[_0x428eb3(0x218)]===undefined&&this[_0x428eb3(0x26f)](),this[_0x428eb3(0x218)]=_0x3e51e9;},VisuMZ['SkillLearnSystem']['Game_Action_applyItemUserEffect']=Game_Action['prototype']['applyItemUserEffect'],Game_Action[_0x1d7d7f(0x175)][_0x1d7d7f(0xa8)]=function(_0x4d7551){const _0x42fcaf=_0x1d7d7f;VisuMZ['SkillLearnSystem'][_0x42fcaf(0x329)][_0x42fcaf(0x158)](this,_0x4d7551),this['applySkillLearnSystemUserEffect'](_0x4d7551);},Game_Action['prototype'][_0x1d7d7f(0xb9)]=function(_0x41f569){const _0x36ffe1=_0x1d7d7f;if(this['item']())this[_0x36ffe1(0x330)](_0x41f569);},Game_Action['prototype']['applyItemSkillLearnSystemUserEffect']=function(_0x3ad765){const _0x3483df=_0x1d7d7f,_0x163928=VisuMZ['SkillLearnSystem'][_0x3483df(0x205)],_0x4d14da=this[_0x3483df(0x164)]()[_0x3483df(0x323)];if($gameParty['inBattle']()){if(_0x3483df(0x268)===_0x3483df(0x268)){if(this['subject']()[_0x3483df(0x2ca)]()&&_0x4d14da[_0x3483df(0x2fe)](_0x163928[_0x3483df(0x1ed)])){if(_0x3483df(0x1d1)!=='rQugu')this[_0x3483df(0x216)](_0x144b11)?this['drawSkillLearnRequirements'](_0x1488ba,_0x348058,_0x270229,_0x59364f):this['drawSkillLearnCost'](_0x161ecc,_0x29c2b5,_0x4ca131,_0x401a92);else{const _0x5e7d5e=eval(RegExp['$1']);this[_0x3483df(0x13b)]()[_0x3483df(0x1e1)](_0x5e7d5e);}}else{if(_0x3483df(0x20b)==='COQEs')this['applyAbilityPoints']();else{const _0x4eb6cf=_0x59205d['getSkillLearnClassPointCost'](_0xd25ba1);this['loseClassPoints'](_0x4eb6cf);const _0x41eb3c=_0x51c780[_0x3483df(0x1e4)](_0x113578);this[_0x3483df(0x258)](_0x41eb3c);}}if(_0x3ad765[_0x3483df(0x2ca)]()&&_0x4d14da[_0x3483df(0x2fe)](_0x163928['TargetGainAbilityPoints'])){if(_0x3483df(0x9a)!==_0x3483df(0x9a))_0x562ed6[_0x3483df(0x1b2)][_0x3483df(0x270)]['call'](this),this[_0x3483df(0x1cb)](),this['gainRewardsAbilityPoints'](),this['makeRewardsSkillPoints'](),this[_0x3483df(0x206)]();else{const _0xcf24dc=eval(RegExp['$1']);_0x3ad765['gainAbilityPoints'](_0xcf24dc);}}}else _0xfcea6=_0x3780c2[_0x3483df(0xee)](_0x5d3a3f);}if($gameParty[_0x3483df(0x287)]()){if('UcRTg'===_0x3483df(0x16f)){if(this[_0x3483df(0x13b)]()[_0x3483df(0x2ca)]()&&_0x4d14da[_0x3483df(0x2fe)](_0x163928[_0x3483df(0x2af)])){const _0x570101=eval(RegExp['$1']);this[_0x3483df(0x13b)]()[_0x3483df(0x24d)](_0x570101);}else this['applySkillPoints']();if(_0x3ad765[_0x3483df(0x2ca)]()&&_0x4d14da[_0x3483df(0x2fe)](_0x163928[_0x3483df(0x22e)])){const _0x44d009=eval(RegExp['$1']);_0x3ad765[_0x3483df(0x24d)](_0x44d009);}}else _0xc29e5f+=0x0;}if(_0x4d14da[_0x3483df(0x2fe)](/<NOTETAG>/i)){}},Game_Action['prototype'][_0x1d7d7f(0x1c8)]=function(){const _0x5083a8=_0x1d7d7f;if(!$gameParty[_0x5083a8(0x287)]())return;if(!this['subject']()['isActor']())return;const _0x2315ec=VisuMZ[_0x5083a8(0x1b2)][_0x5083a8(0x185)]['AbilityPoints'];let _0x376499=0x0;try{if(_0x5083a8(0x1f1)===_0x5083a8(0x2b9)){const _0x6edc37=_0x297543(_0x3479b0['$1']),_0x116ee9=_0x5083a8(0x131)[_0x5083a8(0x2b8)](_0x6edc37),_0x68d1b=_0x2555bb['SkillLearnSystem'][_0x5083a8(0x1d2)](_0x3a9bdf,_0xe3d4b4);_0x33ee3c['SkillLearnSystem']['JS'][_0x68d1b]=new _0x4d0c92(_0x116ee9);}else _0x376499=eval(_0x2315ec[_0x5083a8(0x2f8)]);}catch(_0x2063af){if($gameTemp[_0x5083a8(0x21d)]())console[_0x5083a8(0x1de)](_0x2063af);}this[_0x5083a8(0x13b)]()[_0x5083a8(0x1e1)](_0x376499);},Game_Action['prototype']['applySkillPoints']=function(){const _0x56c483=_0x1d7d7f;if(!$gameParty[_0x56c483(0x287)]())return;if(!this['subject']()[_0x56c483(0x2ca)]())return;const _0x3a86cc=VisuMZ['SkillLearnSystem'][_0x56c483(0x185)]['SkillPoints'];let _0x721cd8=0x0;try{_0x56c483(0x1fa)===_0x56c483(0x14d)?_0x27847c=_0x34d00a:_0x721cd8=eval(_0x3a86cc[_0x56c483(0x2f8)]);}catch(_0x3e2d94){if(_0x56c483(0x1cf)===_0x56c483(0x170)){if(!this[_0x56c483(0x16b)][_0x56c483(0x284)](_0x70d580))return![];return this['_actor'][_0x56c483(0x27b)](_0x172f17);}else{if($gameTemp['isPlaytest']())console[_0x56c483(0x1de)](_0x3e2d94);}}this[_0x56c483(0x13b)]()['gainSkillPoints'](_0x721cd8);},VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x21e)]=Game_Battler[_0x1d7d7f(0x175)][_0x1d7d7f(0x18f)],Game_Battler[_0x1d7d7f(0x175)][_0x1d7d7f(0x18f)]=function(_0x2cbe01){const _0x2ec324=_0x1d7d7f;VisuMZ[_0x2ec324(0x1b2)][_0x2ec324(0x21e)]['call'](this,_0x2cbe01);if(this[_0x2ec324(0x2ca)]()){if(_0x2ec324(0xe0)===_0x2ec324(0x13c)){this['_abilityPoints']===_0x33fbf5&&this['initAbilityPoints']();const _0xf2241d=_0x465dd7[_0x2ec324(0x1b2)]['Settings'][_0x2ec324(0x260)];return _0xf2241d[_0x2ec324(0x22c)]?_0xa23fc1=0x0:_0x241bbb=_0x1dbd39||this[_0x2ec324(0xd4)]()['id'],this['_abilityPoints'][_0x46e9a1]=this[_0x2ec324(0x28d)][_0x4bf9db]||0x0,_0x5a5801[_0x2ec324(0x7a)](this[_0x2ec324(0x28d)][_0x7c4f2d]);}else this[_0x2ec324(0x2ed)]=this['getAbilityPoints'](),this[_0x2ec324(0xea)]=this['getSkillPoints']();}},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x2bf)]=Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x25f)],Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x25f)]=function(_0x36f52e){const _0x210d52=_0x1d7d7f;VisuMZ[_0x210d52(0x1b2)]['Game_Actor_setup'][_0x210d52(0x158)](this,_0x36f52e),this['initAbilityPoints'](),this[_0x210d52(0x22b)](),this[_0x210d52(0xd1)](),this[_0x210d52(0xae)]();},VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x265)]=Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x2db)],Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x2db)]=function(_0x5bcbc3,_0x4729bf){const _0x2170f6=_0x1d7d7f;this[_0x2170f6(0x10d)]=!![],VisuMZ[_0x2170f6(0x1b2)]['Game_Actor_changeClass'][_0x2170f6(0x158)](this,_0x5bcbc3,_0x4729bf),this[_0x2170f6(0x10d)]=undefined;},VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x17c)]=Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x326)],Game_Actor['prototype'][_0x1d7d7f(0x326)]=function(){const _0x5527fc=_0x1d7d7f;VisuMZ[_0x5527fc(0x1b2)][_0x5527fc(0x17c)][_0x5527fc(0x158)](this),this[_0x5527fc(0x8a)](this[_0x5527fc(0xd4)]()['id']),this[_0x5527fc(0x95)](this[_0x5527fc(0xd4)]()['id']);},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x327)]=function(){this['_abilityPoints']={};},Game_Actor[_0x1d7d7f(0x175)]['gainStartingAbilityPoints']=function(){const _0x20664f=_0x1d7d7f,_0x30c3cf=VisuMZ[_0x20664f(0x1b2)][_0x20664f(0x205)],_0x127a06=this[_0x20664f(0xd3)]()[_0x20664f(0x323)];if(_0x127a06[_0x20664f(0x2fe)](_0x30c3cf['StartingAbilityPoints'])){if(_0x20664f(0x145)===_0x20664f(0x2e8))return _0x3f658c[_0x20664f(0x1b2)]['JS'][_0x555022]['call'](this,this[_0x20664f(0x16b)],_0x240971);else{const _0x4d79ee=eval(RegExp['$1']);this['gainAbilityPoints'](_0x4d79ee);}}const _0x4d24ff=VisuMZ[_0x20664f(0x1b2)][_0x20664f(0x185)][_0x20664f(0x260)];if(!_0x4d24ff['SharedResource'])return;const _0x19d72d=_0x127a06[_0x20664f(0x2fe)](_0x30c3cf[_0x20664f(0x15d)]);if(_0x19d72d)for(const _0x50846c of _0x19d72d){if(_0x20664f(0x2cd)===_0x20664f(0x1cc)){if(_0x50d51e[_0x20664f(0x2fe)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return _0x198480(_0x2efb87['$1']);}else{if(!_0x50846c)continue;_0x50846c[_0x20664f(0x2fe)](_0x30c3cf[_0x20664f(0x15d)]);const _0x515407=String(RegExp['$1']),_0x2e5527=eval(RegExp['$2']),_0x45ce4d=/^\d+$/['test'](_0x515407);let _0x5f58b5=0x0;_0x45ce4d?'STeyl'===_0x20664f(0x1bd)?_0x5f58b5=Number(_0x515407):_0x5d700f+=_0x2599d0-_0x1f7085:_0x5f58b5=DataManager['getClassIdWithName'](_0x515407),this[_0x20664f(0x1e1)](_0x2e5527,_0x5f58b5);}}},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x107)]=function(_0x29fd67){const _0x2b8b1a=_0x1d7d7f;this['_abilityPoints']===undefined&&this[_0x2b8b1a(0x327)]();const _0x2d2da5=VisuMZ[_0x2b8b1a(0x1b2)][_0x2b8b1a(0x185)][_0x2b8b1a(0x260)];return _0x2d2da5['SharedResource']?_0x29fd67=0x0:_0x29fd67=_0x29fd67||this[_0x2b8b1a(0xd4)]()['id'],this['_abilityPoints'][_0x29fd67]=this[_0x2b8b1a(0x28d)][_0x29fd67]||0x0,Math[_0x2b8b1a(0x7a)](this['_abilityPoints'][_0x29fd67]);},Game_Actor[_0x1d7d7f(0x175)]['setAbilityPoints']=function(_0x2efc23,_0x59c7fd){const _0x166d10=_0x1d7d7f;if(this[_0x166d10(0x28d)]===undefined){if(_0x166d10(0x1fe)!=='vsDxx')this[_0x166d10(0x327)]();else return this[_0x166d10(0x73)]()['reduce']((_0x7a67e9,_0xe42322)=>{const _0x5b76ce=_0x166d10;return _0xe42322&&_0xe42322[_0x5b76ce(0x323)][_0x5b76ce(0x2fe)](_0x26c4d9[_0x5b76ce(0x1b2)]['RegExp'][_0x5b76ce(0x174)])?_0x7a67e9*(_0x54b9c3(_0x44ad9d['$1'])*0.01):_0x7a67e9;},0x1);}const _0x227620=VisuMZ[_0x166d10(0x1b2)][_0x166d10(0x185)]['AbilityPoints'];_0x227620[_0x166d10(0x22c)]?_0x59c7fd=0x0:_0x59c7fd=_0x59c7fd||this['currentClass']()['id'];this['_abilityPoints'][_0x59c7fd]=this[_0x166d10(0x28d)][_0x59c7fd]||0x0,this[_0x166d10(0x28d)][_0x59c7fd]=Math[_0x166d10(0x7a)](_0x2efc23||0x0);const _0x3ba09a=_0x227620[_0x166d10(0x280)]||Number[_0x166d10(0x252)];this[_0x166d10(0x28d)][_0x59c7fd]=this['_abilityPoints'][_0x59c7fd][_0x166d10(0x191)](0x0,_0x3ba09a);},Game_Actor['prototype'][_0x1d7d7f(0x1e1)]=function(_0x417b2f,_0x354407){const _0x116fa4=_0x1d7d7f;_0x417b2f>0x0&&(_0x417b2f*=this['abilityPointsRate']()),this[_0x116fa4(0x181)](_0x417b2f,_0x354407);},Game_Actor[_0x1d7d7f(0x175)]['gainAbilityPointsForMulticlasses']=function(_0x4c1593){const _0x308064=_0x1d7d7f;if(!Imported[_0x308064(0x1c0)])return;if(_0x4c1593>0x0){if(_0x308064(0x1b6)==='iREqQ')_0x4c1593*=this[_0x308064(0x2e3)]();else{this[_0x308064(0x220)]===_0x525340&&this[_0x308064(0xd1)]();const _0x21137a=_0x34c7d4[_0x308064(0x1b2)][_0x308064(0x185)][_0x308064(0x143)];return _0x21137a[_0x308064(0x22c)]?_0x297603=0x0:_0x386709=_0x57aa24||this['currentClass']()['id'],this[_0x308064(0x220)][_0x475be2]=this[_0x308064(0x220)][_0x35ccae]||0x0,_0x33def7['round'](this['_skillPoints'][_0x47bd01]);}}this[_0x308064(0xa4)](_0x4c1593,_0x308064(0x1ac));},Game_Actor[_0x1d7d7f(0x175)]['addAbilityPoints']=function(_0x54da31,_0x516125){const _0x58809a=_0x1d7d7f,_0x5ce4e3=VisuMZ['SkillLearnSystem']['Settings'][_0x58809a(0x260)];if(_0x5ce4e3[_0x58809a(0x22c)])'AFSrl'==='AFSrl'?_0x516125=0x0:this[_0x58809a(0xaf)][_0x58809a(0x1d4)]=_0x5938a9[_0x58809a(0x24e)]();else{if(_0x58809a(0x235)==='KuGLl')try{return _0x25c461(_0x7b8991['$1']);}catch(_0xca115e){if(_0x1b6607['isPlaytest']())_0xe261d5['log'](_0xca115e);return 0x0;}else _0x516125=_0x516125||this[_0x58809a(0xd4)]()['id'];}_0x54da31+=this['getAbilityPoints'](_0x516125),this[_0x58809a(0x27f)](_0x54da31,_0x516125);},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x1af)]=function(_0x3c269a,_0x2bca05){const _0x5a2a36=_0x1d7d7f;this[_0x5a2a36(0x181)](-_0x3c269a,_0x2bca05);},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x2e3)]=function(){const _0x336ce9=_0x1d7d7f;return this[_0x336ce9(0x73)]()[_0x336ce9(0x28b)]((_0x24216b,_0x2bbdeb)=>{const _0x190e50=_0x336ce9;if(_0x190e50(0xdc)===_0x190e50(0xdc))return _0x2bbdeb&&_0x2bbdeb['note'][_0x190e50(0x2fe)](VisuMZ[_0x190e50(0x1b2)]['RegExp'][_0x190e50(0x174)])?_0x24216b*(Number(RegExp['$1'])*0.01):_0x24216b;else _0x52ef7f[_0x190e50(0x24d)](_0x320bbc,_0xa1661a);},0x1);},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x8a)]=function(_0xa20102){const _0x47ac7c=_0x1d7d7f;if(this['_SkillLearnSystem_preventLevelUpGain'])return;const _0x1583b7=VisuMZ[_0x47ac7c(0x1b2)][_0x47ac7c(0x185)][_0x47ac7c(0x260)];let _0x413bd7=0x0;try{_0x47ac7c(0x2c8)==='PszAT'?_0x413bd7=eval(_0x1583b7['PerLevelUp']):_0x2f2e33['id']=_0x10b7e3[_0x47ac7c(0x189)](_0x140aa5);}catch(_0x29035f){if($gameTemp[_0x47ac7c(0x21d)]())console[_0x47ac7c(0x1de)](_0x29035f);}this[_0x47ac7c(0x1e1)](_0x413bd7,_0xa20102);},Game_Actor[_0x1d7d7f(0x175)]['earnedAbilityPoints']=function(){const _0x5cff73=_0x1d7d7f;return this['_earnedAbilityPoints']=this[_0x5cff73(0x2ed)]||0x0,this[_0x5cff73(0x107)]()-this[_0x5cff73(0x2ed)];},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0xd1)]=function(){const _0xa9f47f=_0x1d7d7f;this[_0xa9f47f(0x220)]={};},Game_Actor['prototype'][_0x1d7d7f(0xae)]=function(){const _0x13a4a9=_0x1d7d7f,_0x4078e7=VisuMZ[_0x13a4a9(0x1b2)][_0x13a4a9(0x205)],_0x53befe=this[_0x13a4a9(0xd3)]()[_0x13a4a9(0x323)];if(_0x53befe[_0x13a4a9(0x2fe)](_0x4078e7['StartingSkillPoints'])){const _0x27d000=eval(RegExp['$1']);this['gainSkillPoints'](_0x27d000);}const _0x4ed8fb=VisuMZ[_0x13a4a9(0x1b2)][_0x13a4a9(0x185)][_0x13a4a9(0x143)];if(!_0x4ed8fb[_0x13a4a9(0x22c)])return;const _0x3443e4=_0x53befe[_0x13a4a9(0x2fe)](_0x4078e7[_0x13a4a9(0x309)]);if(_0x3443e4){if('kEheh'===_0x13a4a9(0x224))_0x44b81c[_0x13a4a9(0x181)](_0x8ea455,_0x3da463);else for(const _0x3d88c3 of _0x3443e4){if(!_0x3d88c3)continue;_0x3d88c3['match'](_0x4078e7[_0x13a4a9(0x309)]);const _0x2d6ddb=String(RegExp['$1']),_0x1cf96c=eval(RegExp['$2']),_0x12c43d=/^\d+$/['test'](_0x2d6ddb);let _0x2afea6=0x0;if(_0x12c43d){if(_0x13a4a9(0x1a8)!=='WnSDB')return this[_0x13a4a9(0x283)](_0x4e3c55);else _0x2afea6=Number(_0x2d6ddb);}else _0x2afea6=DataManager[_0x13a4a9(0xb5)](_0x2d6ddb);this[_0x13a4a9(0x24d)](_0x1cf96c,_0x2afea6);}}},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x1a6)]=function(_0x521ba8){const _0x349d58=_0x1d7d7f;this[_0x349d58(0x220)]===undefined&&(_0x349d58(0x317)!=='vUXjd'?_0x1bdc69=_0x46ac69(_0x13efd7[_0x349d58(0x2f8)]):this[_0x349d58(0xd1)]());const _0x1b9d90=VisuMZ['SkillLearnSystem'][_0x349d58(0x185)][_0x349d58(0x143)];return _0x1b9d90[_0x349d58(0x22c)]?_0x521ba8=0x0:_0x349d58(0xcd)!==_0x349d58(0xcd)?_0xe0e270=_0x4f6a24:_0x521ba8=_0x521ba8||this['currentClass']()['id'],this['_skillPoints'][_0x521ba8]=this[_0x349d58(0x220)][_0x521ba8]||0x0,Math['round'](this[_0x349d58(0x220)][_0x521ba8]);},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x192)]=function(_0x50e1bd,_0x121cee){const _0x23f552=_0x1d7d7f;if(this[_0x23f552(0x220)]===undefined){if('WEetc'!==_0x23f552(0xdd))return _0xd14818*(_0x286e40(_0x1f892c['$1'])*0.01);else this[_0x23f552(0xd1)]();}const _0x4e6321=VisuMZ['SkillLearnSystem'][_0x23f552(0x185)][_0x23f552(0x143)];if(_0x4e6321[_0x23f552(0x22c)])_0x121cee=0x0;else{if(_0x23f552(0x92)!==_0x23f552(0x9c))_0x121cee=_0x121cee||this[_0x23f552(0xd4)]()['id'];else{const _0x1ebd3b=_0xb4a209(_0x499fd6['$1']),_0x2b1bde=_0x90ac4f[_0x23f552(0xba)][_0x23f552(0x2b8)](_0x1ebd3b,_0x4d8f26[_0x23f552(0x88)],_0x43b879[_0x23f552(0x15b)]),_0x3ac644=_0x31b103[_0x23f552(0x88)]>=_0x1ebd3b?_0x11b4c1:_0x3fec4d;_0x32f740+=_0x3ac644[_0x23f552(0x2b8)](_0x2b1bde)+'\x0a';}}this[_0x23f552(0x220)][_0x121cee]=this[_0x23f552(0x220)][_0x121cee]||0x0,this[_0x23f552(0x220)][_0x121cee]=Math[_0x23f552(0x7a)](_0x50e1bd||0x0);const _0x9b9cdc=_0x4e6321[_0x23f552(0x280)]||Number[_0x23f552(0x252)];this[_0x23f552(0x220)][_0x121cee]=this['_skillPoints'][_0x121cee][_0x23f552(0x191)](0x0,_0x9b9cdc);},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x24d)]=function(_0x5e08bf,_0x23a029){const _0x23f59e=_0x1d7d7f;if(_0x5e08bf>0x0){if('svfyY'!==_0x23f59e(0x222))_0x5e08bf*=this[_0x23f59e(0x177)]();else{const _0x39d4f8=_0x1a3239[_0x23f59e(0x1b2)][_0x23f59e(0x205)];_0x3ff87d[_0x23f59e(0x1b2)][_0x23f59e(0xe4)](_0x5ccea3,_0x23f59e(0x1ea),_0x39d4f8['jsLearnApCost']),_0x2abb04[_0x23f59e(0x1b2)][_0x23f59e(0xe4)](_0x11f1c5,_0x23f59e(0x18e),_0x39d4f8[_0x23f59e(0x18e)]),_0x264a13[_0x23f59e(0x1b2)]['createCostJS'](_0x4f53d1,'jsLearnJpCost',_0x39d4f8[_0x23f59e(0x217)]),_0x22f35f[_0x23f59e(0x1b2)][_0x23f59e(0xe4)](_0x291e0f,_0x23f59e(0x130),_0x39d4f8[_0x23f59e(0x130)]),_0x2483c0[_0x23f59e(0x1b2)][_0x23f59e(0x2a0)](_0x15ecfc,_0x23f59e(0x1fc),_0x39d4f8[_0x23f59e(0x1fc)]),_0x5efb6c[_0x23f59e(0x1b2)][_0x23f59e(0x281)](_0x55f382,'jsLearnReq',_0x39d4f8[_0x23f59e(0x180)]),_0xc71267['SkillLearnSystem']['createTextJS'](_0x52cebc,_0x23f59e(0x7c),_0x39d4f8[_0x23f59e(0x7c)]),_0x140f60['SkillLearnSystem']['createTextJS'](_0x48ff0f,_0x23f59e(0x243),_0x39d4f8['jsLearnShowDetailTxt']),_0x3854c6[_0x23f59e(0x1b2)]['createTextJS'](_0x9a6f18,_0x23f59e(0x215),_0x39d4f8[_0x23f59e(0x215)]),_0x3c29cb[_0x23f59e(0x1b2)][_0x23f59e(0x11a)](_0x51e142,'jsLearnReqDetailTxt',_0x39d4f8[_0x23f59e(0x30d)]),_0x568632[_0x23f59e(0x1b2)][_0x23f59e(0x17e)](_0x7948d8,_0x23f59e(0x118),_0x39d4f8['jsOnLearn']);}}this[_0x23f59e(0x267)](_0x5e08bf,_0x23a029);},Game_Actor['prototype'][_0x1d7d7f(0x2fd)]=function(_0x48c4fd){const _0x1259fd=_0x1d7d7f;if(!Imported[_0x1259fd(0x1c0)])return;_0x48c4fd>0x0&&(_0x48c4fd*=this[_0x1259fd(0x177)]()),this['gainMulticlassRewardPoints'](_0x48c4fd,_0x1259fd(0x178));},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x267)]=function(_0x326fcb,_0xc70f7d){const _0x164ac5=_0x1d7d7f,_0x136849=VisuMZ['SkillLearnSystem'][_0x164ac5(0x185)][_0x164ac5(0x143)];_0x136849['SharedResource']?_0xc70f7d=0x0:_0xc70f7d=_0xc70f7d||this['currentClass']()['id'],_0x326fcb+=this[_0x164ac5(0x1a6)](_0xc70f7d),this['setSkillPoints'](_0x326fcb,_0xc70f7d);},Game_Actor[_0x1d7d7f(0x175)]['loseSkillPoints']=function(_0x5a4031,_0x17f686){const _0xcf820e=_0x1d7d7f;this[_0xcf820e(0x267)](-_0x5a4031,_0x17f686);},Game_Actor[_0x1d7d7f(0x175)]['skillPointsRate']=function(){const _0x3622b6=_0x1d7d7f;return this[_0x3622b6(0x73)]()[_0x3622b6(0x28b)]((_0x455b71,_0x3e409c)=>{const _0x2f326a=_0x3622b6;return _0x3e409c&&_0x3e409c[_0x2f326a(0x323)][_0x2f326a(0x2fe)](VisuMZ['SkillLearnSystem'][_0x2f326a(0x205)][_0x2f326a(0x128)])?_0x455b71*(Number(RegExp['$1'])*0.01):_0x455b71;},0x1);},Game_Actor[_0x1d7d7f(0x175)]['levelUpGainSkillPoints']=function(_0x5d8439){const _0x546563=_0x1d7d7f;if(this[_0x546563(0x10d)])return;const _0x4da74a=VisuMZ[_0x546563(0x1b2)]['Settings'][_0x546563(0x143)];let _0x1c0334=0x0;try{_0x1c0334=eval(_0x4da74a[_0x546563(0x1e2)]);}catch(_0x32ffeb){if(_0x546563(0x21a)===_0x546563(0x21a)){if($gameTemp['isPlaytest']())console[_0x546563(0x1de)](_0x32ffeb);}else _0x18436e>0x0&&(_0x1235cf*=this[_0x546563(0x177)]()),this['addSkillPoints'](_0x5e5a64,_0x41aabd);}this[_0x546563(0x24d)](_0x1c0334,_0x5d8439);},Game_Actor['prototype']['earnedSkillPoints']=function(){const _0x46f0da=_0x1d7d7f;return this[_0x46f0da(0xea)]=this[_0x46f0da(0xea)]||0x0,this[_0x46f0da(0x1a6)]()-this[_0x46f0da(0xea)];},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x284)]=function(_0x176fa7){const _0x5a131b=_0x1d7d7f;if(!_0x176fa7)return![];const _0x44715a=VisuMZ[_0x5a131b(0x1b2)]['createKeyJS'](_0x176fa7,_0x5a131b(0x180));if(VisuMZ[_0x5a131b(0x1b2)]['JS'][_0x44715a]){if(!VisuMZ['SkillLearnSystem']['JS'][_0x44715a][_0x5a131b(0x158)](this,this,_0x176fa7))return![];}const _0x3d7b0a=VisuMZ['SkillLearnSystem']['RegExp'],_0x191162=_0x176fa7[_0x5a131b(0x323)];if(_0x191162[_0x5a131b(0x2fe)](_0x3d7b0a['LearnReqLevel'])){if(_0x5a131b(0x253)!==_0x5a131b(0x253)){const _0x4d7cca=_0x11aa32(_0x3ebe2d['$1']);if(_0x4d7cca>this[_0x5a131b(0x16b)][_0x5a131b(0x88)])return![];}else{const _0x4d48bf=Number(RegExp['$1']);if(_0x4d48bf>this[_0x5a131b(0x88)])return![];}}if(_0x191162['match'](_0x3d7b0a[_0x5a131b(0x251)])){const _0x1d253f=String(RegExp['$1'])[_0x5a131b(0x2b6)](',')[_0x5a131b(0x2ae)](_0x5b8b22=>_0x5b8b22[_0x5a131b(0x279)]());for(const _0x3fd56c of _0x1d253f){let _0x32eee9=0x0;const _0x2bf481=/^\d+$/['test'](_0x3fd56c);_0x2bf481?_0x32eee9=Number(_0x3fd56c):_0x32eee9=DataManager['getSkillIdWithName'](_0x3fd56c);if(!this[_0x5a131b(0x2d9)](_0x32eee9))return![];}}if(_0x191162[_0x5a131b(0x2fe)](_0x3d7b0a[_0x5a131b(0x8b)])){const _0xf0a4b8=String(RegExp['$1'])[_0x5a131b(0x2b6)](',')[_0x5a131b(0x2ae)](_0x4c2735=>_0x4c2735['trim']());let _0x21715b=![];for(const _0x1a24a7 of _0xf0a4b8){let _0x122493=0x0;const _0x37ac24=/^\d+$/[_0x5a131b(0x262)](_0x1a24a7);if(_0x37ac24){if('ZGSNG'===_0x5a131b(0x318))return _0x10a96d(_0x5104e3[_0x5a131b(0x233)]);else _0x122493=Number(_0x1a24a7);}else _0x122493=DataManager[_0x5a131b(0xee)](_0x1a24a7);if(this['isLearnedSkill'](_0x122493)){_0x21715b=!![];break;}}if(!_0x21715b)return![];}if(_0x191162[_0x5a131b(0x2fe)](_0x3d7b0a['LearnReqSwitchesAll'])){const _0x1ec528=String(RegExp['$1'])[_0x5a131b(0x2b6)](',')[_0x5a131b(0x2ae)](_0x568add=>Number(_0x568add));for(const _0x189e9c of _0x1ec528){if(_0x5a131b(0x24c)!=='SAvte'){if(!$gameSwitches[_0x5a131b(0x1b1)](_0x189e9c))return![];}else _0x5f4bfb['id']=_0x13f5d3['getWeaponIdWithName'](_0x5cf9db);}}if(_0x191162[_0x5a131b(0x2fe)](_0x3d7b0a[_0x5a131b(0xc0)])){const _0x29f73f=String(RegExp['$1'])[_0x5a131b(0x2b6)](',')[_0x5a131b(0x2ae)](_0x2f0eae=>Number(_0x2f0eae));let _0x191a6f=![];for(const _0x5b04ab of _0x29f73f){if($gameSwitches[_0x5a131b(0x1b1)](_0x5b04ab)){_0x191a6f=!![];break;}}if(!_0x191a6f)return![];}return!![];},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x27b)]=function(_0x43865c){const _0x1b8115=_0x1d7d7f;if(!_0x43865c)return![];const _0x3ed579=DataManager[_0x1b8115(0x2d4)](_0x43865c);if(_0x3ed579>this[_0x1b8115(0x107)]())return![];const _0x330a28=DataManager['getSkillLearnSkillPointCost'](_0x43865c);if(_0x330a28>this['getSkillPoints']())return![];const _0x42b6cb=DataManager[_0x1b8115(0x1dd)](_0x43865c);if(_0x42b6cb>$gameParty[_0x1b8115(0x89)]())return![];if(Imported['VisuMZ_2_ClassChangeSystem']){if('Cqmug'==='lBShw')return _0x439977;else{const _0x401e3a=DataManager[_0x1b8115(0xbb)](_0x43865c);if(_0x401e3a>this[_0x1b8115(0x227)]())return![];const _0xcda925=DataManager[_0x1b8115(0x1e4)](_0x43865c);if(_0xcda925>this['getJobPoints']())return![];}}const _0x1d241a=DataManager[_0x1b8115(0x2a4)](_0x43865c);for(const _0x2afb20 of _0x1d241a){if('eHHxR'===_0x1b8115(0x94)){if(!_0x2afb20)continue;const _0x48975b=$dataItems[_0x2afb20['id']];if(_0x48975b&&_0x2afb20[_0x1b8115(0x18c)]>$gameParty[_0x1b8115(0x147)](_0x48975b))return![];}else{const _0x59b162=_0x11ba69(_0x2f6ee3['$1']),_0x45e42b=_0x1b8115(0x2e4)['format'](_0x59b162),_0x33798a=_0x404825[_0x1b8115(0x1b2)][_0x1b8115(0x1d2)](_0x367d46,_0x33c385);_0x1455dd['SkillLearnSystem']['JS'][_0x33798a]=new _0x254d57(_0x45e42b);}}const _0x375429=DataManager['getSkillLearnWeaponCost'](_0x43865c);for(const _0x45dd23 of _0x375429){if(_0x1b8115(0x232)==='MxBTr'){if(!_0x45dd23)continue;const _0xad0784=$dataWeapons[_0x45dd23['id']];if(_0xad0784&&_0x45dd23[_0x1b8115(0x18c)]>$gameParty[_0x1b8115(0x147)](_0xad0784))return![];}else{const _0xd0f12d=_0x1cd9a1(_0x4b7e14['$1'])['split'](',')['map'](_0xd25bb6=>_0x3870bf(_0xd25bb6));for(const _0x1ae746 of _0xd0f12d){const _0x576c49=_0x4f026f[_0x1b8115(0xe6)][_0x1ae746],_0x250757=_0x3e875b[_0x1b8115(0x1b1)](_0x1ae746)?_0x10e1de:_0x4f02ae;_0x5a16cc+=_0x250757[_0x1b8115(0x2b8)](_0x576c49)+'\x0a';}}}const _0x2a2159=DataManager[_0x1b8115(0x105)](_0x43865c);for(const _0x43d41f of _0x2a2159){if('fhcFP'!==_0x1b8115(0x23c))this[_0x1b8115(0x2ec)]=_0x58f816['$1'][_0x1b8115(0x2b6)](',')[_0x1b8115(0x2ae)](_0x5a7add=>_0x5331d6(_0x5a7add));else{if(!_0x43d41f)continue;const _0x24b2a3=$dataArmors[_0x43d41f['id']];if(_0x24b2a3&&_0x43d41f['quantity']>$gameParty[_0x1b8115(0x147)](_0x24b2a3))return![];}}return!![];},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x285)]=function(_0x2e95d5){const _0x1af0c3=_0x1d7d7f;if(!_0x2e95d5)return;const _0x3748cc=DataManager['getSkillLearnAbilityPointCost'](_0x2e95d5);this['loseAbilityPoints'](_0x3748cc);const _0x2c51b3=DataManager[_0x1af0c3(0x1eb)](_0x2e95d5);this[_0x1af0c3(0x231)](_0x2c51b3);const _0x2486e0=DataManager[_0x1af0c3(0x1dd)](_0x2e95d5);$gameParty[_0x1af0c3(0x2bb)](_0x2486e0);if(Imported[_0x1af0c3(0x1c0)]){const _0x2558b2=DataManager[_0x1af0c3(0xbb)](_0x2e95d5);this[_0x1af0c3(0x271)](_0x2558b2);const _0x2273f2=DataManager[_0x1af0c3(0x1e4)](_0x2e95d5);this[_0x1af0c3(0x258)](_0x2273f2);}const _0x2e1790=DataManager[_0x1af0c3(0x2a4)](_0x2e95d5);for(const _0x1a31ea of _0x2e1790){if(!_0x1a31ea)continue;const _0x26fc4c=$dataItems[_0x1a31ea['id']],_0x2126ff=_0x1a31ea[_0x1af0c3(0x18c)];$gameParty[_0x1af0c3(0x1dc)](_0x26fc4c,_0x2126ff);}const _0x24fa83=DataManager['getSkillLearnWeaponCost'](_0x2e95d5);for(const _0x4ae367 of _0x24fa83){if(!_0x4ae367)continue;const _0x3be976=$dataWeapons[_0x4ae367['id']],_0x302efd=_0x4ae367[_0x1af0c3(0x18c)];$gameParty[_0x1af0c3(0x1dc)](_0x3be976,_0x302efd);}const _0x32cad7=DataManager[_0x1af0c3(0x105)](_0x2e95d5);for(const _0x118660 of _0x32cad7){if(!_0x118660)continue;const _0x1868ad=$dataArmors[_0x118660['id']],_0x336b23=_0x118660[_0x1af0c3(0x18c)];$gameParty['loseItem'](_0x1868ad,_0x336b23);}this[_0x1af0c3(0x302)](_0x2e95d5['id']),this[_0x1af0c3(0x155)]();},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0xfd)]=Game_Actor[_0x1d7d7f(0x175)]['learnSkill'],Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x302)]=function(_0x46f352){const _0x15e1f8=_0x1d7d7f,_0x3f0f83=!this[_0x15e1f8(0x2d9)](_0x46f352);VisuMZ['SkillLearnSystem']['Game_Actor_learnSkill'][_0x15e1f8(0x158)](this,_0x46f352);if(_0x3f0f83&&this[_0x15e1f8(0x2d9)](_0x46f352)){const _0xa38b8b=$dataSkills[_0x46f352],_0x6fa6ab=VisuMZ[_0x15e1f8(0x1b2)][_0x15e1f8(0x1d2)](_0xa38b8b,_0x15e1f8(0x118));if(VisuMZ[_0x15e1f8(0x1b2)]['JS'][_0x6fa6ab]){if(_0x15e1f8(0x1fd)!==_0x15e1f8(0x1fd)){const _0x5441a5=_0x41122d(_0x245f5c['$1']);_0x377f08=_0x191206[_0x15e1f8(0xca)][_0x15e1f8(0x2b8)](_0x5441a5,_0x23eaf2[_0x15e1f8(0x88)],_0x2e354d[_0x15e1f8(0x15b)]),_0x325020[_0x15e1f8(0x1c5)]>0x0&&(_0x242bb8!==''?_0x462b96=_0x416be1[_0x15e1f8(0x2b8)](_0x257d41,_0x5782f0):_0x3b301f=_0x4a39ba);}else VisuMZ[_0x15e1f8(0x1b2)]['JS'][_0x6fa6ab][_0x15e1f8(0x158)](this,this,_0xa38b8b);}}},Game_Actor[_0x1d7d7f(0x175)][_0x1d7d7f(0x288)]=function(){const _0x1f3d1d=_0x1d7d7f,_0x29418e=DataManager[_0x1f3d1d(0x2e7)](this[_0x1f3d1d(0xd4)]()['id']);for(const _0x5dae94 of _0x29418e){if(_0x1f3d1d(0xe1)!==_0x1f3d1d(0x1c4)){const _0x2f9622=$dataSkills[_0x5dae94];if(!_0x2f9622)continue;if(_0x2f9622[_0x1f3d1d(0x31a)][_0x1f3d1d(0x279)]()==='')continue;if(_0x2f9622[_0x1f3d1d(0x31a)][_0x1f3d1d(0x2fe)](/-----/i))continue;this[_0x1f3d1d(0x302)](_0x5dae94);}else{if(!_0x4f9cca[_0x1f3d1d(0x287)]())return;if(!this[_0x1f3d1d(0x13b)]()[_0x1f3d1d(0x2ca)]())return;const _0x54c107=_0x164e67[_0x1f3d1d(0x1b2)][_0x1f3d1d(0x185)][_0x1f3d1d(0x260)];let _0x3d322e=0x0;try{_0x3d322e=_0xd0528d(_0x54c107['PerAction']);}catch(_0x149aa7){if(_0x22700f[_0x1f3d1d(0x21d)]())_0x86acac[_0x1f3d1d(0x1de)](_0x149aa7);}this[_0x1f3d1d(0x13b)]()[_0x1f3d1d(0x1e1)](_0x3d322e);}}},Game_Enemy[_0x1d7d7f(0x175)][_0x1d7d7f(0x16d)]=function(){const _0x3d0024=_0x1d7d7f,_0x4fb2b4=VisuMZ[_0x3d0024(0x1b2)][_0x3d0024(0x185)]['AbilityPoints'],_0x13a492=VisuMZ['SkillLearnSystem'][_0x3d0024(0x205)],_0x5d09d9=this[_0x3d0024(0x1f3)]()['note'];if(_0x5d09d9[_0x3d0024(0x2fe)](_0x13a492[_0x3d0024(0x1e6)]))try{return eval(RegExp['$1']);}catch(_0x233d5e){if(_0x3d0024(0x2c3)==='nunaF')_0x959212['SkillLearnSystem'][_0x3d0024(0x2fc)]['call'](this);else{if($gameTemp[_0x3d0024(0x21d)]())console['log'](_0x233d5e);return 0x0;}}try{return eval(_0x4fb2b4[_0x3d0024(0x233)]);}catch(_0x32f7cc){if($gameTemp[_0x3d0024(0x21d)]())console[_0x3d0024(0x1de)](_0x32f7cc);return 0x0;}},Game_Enemy[_0x1d7d7f(0x175)][_0x1d7d7f(0x1d4)]=function(){const _0x462503=_0x1d7d7f,_0xa9a2c2=VisuMZ[_0x462503(0x1b2)][_0x462503(0x185)][_0x462503(0x143)],_0x5d7268=VisuMZ['SkillLearnSystem'][_0x462503(0x205)],_0x5a084a=this[_0x462503(0x1f3)]()[_0x462503(0x323)];if(_0x5a084a['match'](_0x5d7268['EnemySkillPoints'])){if(_0x462503(0xac)!==_0x462503(0xac)){const _0x2c6b3f=_0x27fa8e['makeDeepCopy'](_0x3124a9[_0x462503(0x1b2)][_0x462503(0x185)][_0x462503(0x226)][_0x462503(0xb3)]);return _0x2c6b3f['push'](_0x462503(0x83)),_0x2c6b3f;}else try{return eval(RegExp['$1']);}catch(_0x5f3156){if(_0x462503(0x19e)!==_0x462503(0x1b7)){if($gameTemp['isPlaytest']())console[_0x462503(0x1de)](_0x5f3156);return 0x0;}else _0xcb5f1d=_0x441687['skillLearnSeparationFmt'][_0x462503(0x2b8)](_0x113bbd,_0x53b6a7);}}try{return eval(_0xa9a2c2[_0x462503(0x233)]);}catch(_0x488a82){if($gameTemp['isPlaytest']())console[_0x462503(0x1de)](_0x488a82);return 0x0;}},VisuMZ['SkillLearnSystem'][_0x1d7d7f(0x96)]=Game_Party[_0x1d7d7f(0x175)][_0x1d7d7f(0x1b5)],Game_Party[_0x1d7d7f(0x175)][_0x1d7d7f(0x1b5)]=function(){const _0x439c14=_0x1d7d7f;VisuMZ[_0x439c14(0x1b2)]['Game_Party_setupBattleTestMembers'][_0x439c14(0x158)](this),this[_0x439c14(0x2e6)]();},Game_Party[_0x1d7d7f(0x175)][_0x1d7d7f(0x2e6)]=function(){const _0x23493f=_0x1d7d7f;for(const _0x571237 of this[_0x23493f(0x300)]()){if(_0x23493f(0xec)!==_0x23493f(0xec))_0x4d77c4=_0x3459f3[_0x23493f(0x2b8)](_0x2bd6d9,_0x47421);else{if(!_0x571237)continue;_0x571237[_0x23493f(0x288)]();}}},Game_Troop[_0x1d7d7f(0x175)][_0x1d7d7f(0x10a)]=function(){const _0x4e3f11=_0x1d7d7f;return this[_0x4e3f11(0x229)]()[_0x4e3f11(0x28b)]((_0x25f8ad,_0x496b4b)=>_0x25f8ad+_0x496b4b['abilityPoints'](),0x0);},Game_Troop[_0x1d7d7f(0x175)]['skillPointsTotal']=function(){const _0x14bd3e=_0x1d7d7f;return this['deadMembers']()[_0x14bd3e(0x28b)]((_0x83ee94,_0x333ee1)=>_0x83ee94+_0x333ee1[_0x14bd3e(0x1d4)](),0x0);},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0xa5)]=Scene_Skill[_0x1d7d7f(0x175)]['create'],Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x1f0)]=function(){const _0x458d53=_0x1d7d7f;VisuMZ[_0x458d53(0x1b2)]['Scene_Skill_create'][_0x458d53(0x158)](this),this['createSkillLearnSystemWindows']();},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x1c3)]=function(){const _0x1c0785=_0x1d7d7f;this[_0x1c0785(0x149)](),this['createSkillLearnConfirmWindow']();},Scene_Skill[_0x1d7d7f(0x175)]['createSkillLearnIngredientsWindow']=function(){const _0x406e46=_0x1d7d7f,_0x50e1a1=this[_0x406e46(0x10b)]();this['_skillLearnIngredientsWindow']=new Window_SkillLearnIngredients(_0x50e1a1),this['addWindow'](this[_0x406e46(0x2c7)]),this[_0x406e46(0x2c7)][_0x406e46(0x320)]();const _0x369994=VisuMZ[_0x406e46(0x1b2)][_0x406e46(0x185)][_0x406e46(0x8f)]['DetailWindow_BgType'];this[_0x406e46(0x2c7)][_0x406e46(0xb8)](_0x369994);},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x10b)]=function(){const _0xfa5f73=_0x1d7d7f;if(VisuMZ['SkillLearnSystem'][_0xfa5f73(0x185)]['Window'][_0xfa5f73(0xeb)])return VisuMZ['SkillLearnSystem']['Settings'][_0xfa5f73(0x8f)][_0xfa5f73(0xeb)][_0xfa5f73(0x158)](this);const _0x41efab=this[_0xfa5f73(0x26b)](),_0x3a4926=_0x41efab['x'],_0xecbfbd=_0x41efab['y'],_0x59cfef=_0x41efab['width'],_0x56212d=_0x41efab[_0xfa5f73(0x276)]-this['calcWindowHeight'](0x2,![]);return new Rectangle(_0x3a4926,_0xecbfbd,_0x59cfef,_0x56212d);},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x31f)]=function(){const _0x43d087=_0x1d7d7f,_0x399c3e=this['skillLearnConfirmWindow']();this[_0x43d087(0x30e)]=new Window_SkillLearnConfirm(_0x399c3e),this[_0x43d087(0x254)](this[_0x43d087(0x30e)]),this['_skillLearnConfirmWindow'][_0x43d087(0x2a5)]('ok',this['onSkillLearnConfirmOk'][_0x43d087(0xe3)](this)),this[_0x43d087(0x30e)][_0x43d087(0x2a5)]('cancel',this[_0x43d087(0x264)][_0x43d087(0xe3)](this)),this[_0x43d087(0x30e)][_0x43d087(0x320)]();const _0x32f862=VisuMZ[_0x43d087(0x1b2)][_0x43d087(0x185)][_0x43d087(0x8f)]['ConfirmWindow_BgType'];this[_0x43d087(0x30e)][_0x43d087(0xb8)](_0x32f862);},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x325)]=function(){const _0x50287e=_0x1d7d7f;if(VisuMZ[_0x50287e(0x1b2)]['Settings'][_0x50287e(0x8f)][_0x50287e(0x27a)]){if(_0x50287e(0x1e9)!==_0x50287e(0xc9))return VisuMZ[_0x50287e(0x1b2)][_0x50287e(0x185)]['Window'][_0x50287e(0x27a)][_0x50287e(0x158)](this);else _0x3983c1[_0x50287e(0xce)](_0x23938f[_0x50287e(0xee)](_0x1e2fac));}const _0x1e9269=this['itemWindowRect'](),_0x5c16df=_0x1e9269[_0x50287e(0xf0)],_0x516dd9=this[_0x50287e(0x221)](0x2,![]),_0x22e15b=_0x1e9269['x'],_0x49950f=_0x1e9269['y']+_0x1e9269[_0x50287e(0x276)]-_0x516dd9;return new Rectangle(_0x22e15b,_0x49950f,_0x5c16df,_0x516dd9);},VisuMZ[_0x1d7d7f(0x1b2)]['Scene_Skill_onItemOk']=Scene_Skill[_0x1d7d7f(0x175)]['onItemOk'],Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x123)]=function(){const _0x570161=_0x1d7d7f;if(this['_itemWindow']['isSkillLearnMode']()){if(_0x570161(0x109)===_0x570161(0x79)){if(this[_0x570161(0x13b)]()['isActor']()&&_0x12f593[_0x570161(0x2fe)](_0x4ff79d[_0x570161(0x2af)])){const _0x42a45e=_0xdee0a8(_0x22d9bb['$1']);this[_0x570161(0x13b)]()[_0x570161(0x24d)](_0x42a45e);}else this[_0x570161(0x2ad)]();if(_0x5de9c8[_0x570161(0x2ca)]()&&_0x5a21f1[_0x570161(0x2fe)](_0x3244bc[_0x570161(0x22e)])){const _0x474d1a=_0xc94949(_0x59624f['$1']);_0x3efd0f[_0x570161(0x24d)](_0x474d1a);}}else this[_0x570161(0x27d)]();}else VisuMZ[_0x570161(0x1b2)]['Scene_Skill_onItemOk'][_0x570161(0x158)](this);},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x27d)]=function(){const _0x49fa3c=_0x1d7d7f;this[_0x49fa3c(0x32c)][_0x49fa3c(0x320)](),this[_0x49fa3c(0x2c7)][_0x49fa3c(0x9f)](),this[_0x49fa3c(0x2c7)][_0x49fa3c(0x155)](),this[_0x49fa3c(0x30e)][_0x49fa3c(0x9f)](),this[_0x49fa3c(0x30e)]['refresh'](),this[_0x49fa3c(0x30e)]['activate'](),this[_0x49fa3c(0x30e)][_0x49fa3c(0x246)](0x0);},Scene_Skill[_0x1d7d7f(0x175)]['onSkillLearnConfirmOk']=function(){const _0x392479=_0x1d7d7f;VisuMZ['SkillLearnSystem'][_0x392479(0x185)][_0x392479(0x321)][_0x392479(0xdb)]?this[_0x392479(0x1a2)]():this[_0x392479(0x146)]();},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x264)]=function(){const _0x1cfb9e=_0x1d7d7f;this[_0x1cfb9e(0x32c)][_0x1cfb9e(0x9f)](),this['_itemWindow'][_0x1cfb9e(0x21f)](),this[_0x1cfb9e(0x2c7)][_0x1cfb9e(0x320)](),this['_skillLearnConfirmWindow'][_0x1cfb9e(0x320)]();},Scene_Skill['prototype'][_0x1d7d7f(0x146)]=function(){const _0x541706=_0x1d7d7f;this[_0x541706(0xf5)][_0x541706(0x9d)]=!![],this[_0x541706(0xa0)]=![],SoundManager[_0x541706(0x29b)](),this[_0x541706(0xcb)]()[_0x541706(0x285)](this[_0x541706(0x164)]()),this[_0x541706(0x264)](),this[_0x541706(0x32c)][_0x541706(0x155)](),this[_0x541706(0x282)][_0x541706(0x155)]();},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x115)]=Scene_Skill[_0x1d7d7f(0x175)]['update'],Scene_Skill[_0x1d7d7f(0x175)]['update']=function(){const _0x56c1fd=_0x1d7d7f;VisuMZ[_0x56c1fd(0x1b2)][_0x56c1fd(0x115)][_0x56c1fd(0x158)](this),this[_0x56c1fd(0x2a1)]();},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x1a2)]=function(){const _0x5209fb=_0x1d7d7f;this[_0x5209fb(0xa0)]=!![],this['_skillLearnAnimationWait']=0x14,this[_0x5209fb(0xf5)][_0x5209fb(0x9d)]=VisuMZ[_0x5209fb(0x1b2)][_0x5209fb(0x185)][_0x5209fb(0x321)][_0x5209fb(0x16a)]||![],this['createSkillLearnSkillSprite']();},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x14f)]=function(){const _0x3c5990=_0x1d7d7f;this['_skillLearnIconSprite']=new Sprite(),this[_0x3c5990(0x210)](this[_0x3c5990(0x31d)]),this[_0x3c5990(0x120)](),this[_0x3c5990(0x16c)](),this[_0x3c5990(0x152)](),this[_0x3c5990(0x129)](),this['createSkillLearnAnimationIDs'](),this[_0x3c5990(0x303)](this[_0x3c5990(0x2ec)][_0x3c5990(0x1f9)]());},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x120)]=function(){const _0x255906=_0x1d7d7f,_0x378647=VisuMZ[_0x255906(0x1b2)][_0x255906(0x205)],_0x3a910f=this[_0x255906(0x164)]()['note'];this[_0x255906(0xc3)]='';if(_0x3a910f[_0x255906(0x2fe)](_0x378647[_0x255906(0x116)]))this[_0x255906(0xc3)]=String(RegExp['$1']);else _0x3a910f[_0x255906(0x2fe)](_0x378647[_0x255906(0x169)])&&(this[_0x255906(0xc3)]=String(RegExp['$1']));this['_skillLearnBitmapSprite']=new Sprite();this[_0x255906(0xc3)]?_0x255906(0x198)!==_0x255906(0x168)?this[_0x255906(0x144)][_0x255906(0x13e)]=ImageManager[_0x255906(0x7f)](this[_0x255906(0xc3)]):(_0x492097[_0x255906(0x1b2)][_0x255906(0xa5)][_0x255906(0x158)](this),this[_0x255906(0x1c3)]()):(this[_0x255906(0x144)]['bitmap']=ImageManager['loadSystem'](_0x255906(0x2f2)),this[_0x255906(0x144)][_0x255906(0x13e)]['smooth']=![]);this[_0x255906(0x144)][_0x255906(0x15c)]['x']=0.5,this[_0x255906(0x144)]['anchor']['y']=0.5;if(!this[_0x255906(0xc3)]){const _0x5e531b=VisuMZ[_0x255906(0x1b2)][_0x255906(0x185)][_0x255906(0x321)][_0x255906(0x190)]||0x8;this[_0x255906(0x144)][_0x255906(0x1db)]['x']=_0x5e531b,this[_0x255906(0x144)]['scale']['y']=_0x5e531b;}this[_0x255906(0x31d)][_0x255906(0x210)](this[_0x255906(0x144)]);},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x16c)]=function(){const _0x1fbb7c=_0x1d7d7f;if(this[_0x1fbb7c(0xc3)])return;const _0x442041=this[_0x1fbb7c(0x164)](),_0x532a6f=_0x442041['iconIndex'],_0x3f5349=ImageManager['iconWidth'],_0x495573=ImageManager[_0x1fbb7c(0x2c2)],_0x242eaf=_0x532a6f%0x10*_0x3f5349,_0x22caac=Math['floor'](_0x532a6f/0x10)*_0x495573;this[_0x1fbb7c(0x144)][_0x1fbb7c(0x32e)](_0x242eaf,_0x22caac,_0x3f5349,_0x495573);},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x152)]=function(){const _0x4f2147=_0x1d7d7f;this[_0x4f2147(0x31d)]['x']=Math[_0x4f2147(0x7a)](Graphics[_0x4f2147(0xf0)]/0x2);const _0x201bc3=Math[_0x4f2147(0x7a)](ImageManager[_0x4f2147(0x2c2)]*this['_skillLearnIconSprite']['scale']['y']);this[_0x4f2147(0x31d)]['y']=Math[_0x4f2147(0x7a)]((Graphics[_0x4f2147(0x276)]+_0x201bc3)/0x2);},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x129)]=function(){const _0x593f37=_0x1d7d7f;this['_skillLearnIconSpriteOpacitySpeed']=VisuMZ['SkillLearnSystem'][_0x593f37(0x185)][_0x593f37(0x321)][_0x593f37(0x113)]||0x1;if(this[_0x593f37(0x164)]()[_0x593f37(0x323)]['match'](VisuMZ[_0x593f37(0x1b2)]['RegExp'][_0x593f37(0x14e)])){if(_0x593f37(0x117)!=='gBDlI')this['_skillLearnIconSpriteOpacitySpeed']=Math['max'](Number(RegExp['$1']),0x1);else return _0x3602a6(_0x1b3a47['$1']);}this[_0x593f37(0x31d)][_0x593f37(0xb7)]=0x0;},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x162)]=function(){const _0x41159e=_0x1d7d7f;this[_0x41159e(0x2ec)]=[],this[_0x41159e(0x164)]()[_0x41159e(0x323)]['match'](VisuMZ[_0x41159e(0x1b2)][_0x41159e(0x205)]['animationIDs'])?this['_skillLearnAnimationIDs']=RegExp['$1'][_0x41159e(0x2b6)](',')['map'](_0x1238d2=>Number(_0x1238d2)):this['_skillLearnAnimationIDs']=this[_0x41159e(0x2ec)][_0x41159e(0x20a)](VisuMZ[_0x41159e(0x1b2)][_0x41159e(0x185)][_0x41159e(0x321)][_0x41159e(0x1da)]);},Scene_Skill['prototype'][_0x1d7d7f(0x303)]=function(_0x338199){const _0x4a3140=_0x1d7d7f,_0x663e2a=$dataAnimations[_0x338199];if(!_0x663e2a)return;const _0x1754d6=this['isMVAnimation'](_0x663e2a);this[_0x4a3140(0x25b)]=new(_0x1754d6?Sprite_AnimationMV:Sprite_Animation)();const _0x5d33f0=[this[_0x4a3140(0x31d)]],_0x409763=0x0;this[_0x4a3140(0x25b)][_0x4a3140(0x25f)](_0x5d33f0,_0x663e2a,![],_0x409763,null),this[_0x4a3140(0x210)](this[_0x4a3140(0x25b)]);},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x2c0)]=function(_0x43d396){const _0x503aa4=_0x1d7d7f;return!!_0x43d396[_0x503aa4(0x10c)];},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x2a1)]=function(){const _0x3df975=_0x1d7d7f;if(!this['_skillLearnAnimationPlaying'])return;this[_0x3df975(0x1f5)](),this['updateSkillLearnAnimationSprite'](),this[_0x3df975(0x97)]()&&this['processFinishSkillLearnAnimation']();},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x1f5)]=function(){const _0x1474f0=_0x1d7d7f;this[_0x1474f0(0x31d)]['opacity']+=this[_0x1474f0(0x12d)];},Scene_Skill['prototype'][_0x1d7d7f(0x2c4)]=function(){const _0x12e899=_0x1d7d7f;if(!this['_skillLearnAnimationSprite'])return;if(this['_skillLearnAnimationSprite'][_0x12e899(0x2ee)]())return;this['destroySkillLearnAnimationSprite'](),this[_0x12e899(0x303)](this[_0x12e899(0x2ec)][_0x12e899(0x1f9)]());},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0xe5)]=function(){const _0x31bf54=_0x1d7d7f;if(!this[_0x31bf54(0x25b)])return;this[_0x31bf54(0x2e9)](this[_0x31bf54(0x25b)]),this[_0x31bf54(0x25b)][_0x31bf54(0xc1)](),this[_0x31bf54(0x25b)]=undefined;},Scene_Skill[_0x1d7d7f(0x175)][_0x1d7d7f(0x21c)]=function(){const _0x871483=_0x1d7d7f;if(!this[_0x871483(0x31d)])return;this[_0x871483(0x2e9)](this[_0x871483(0x31d)]),this[_0x871483(0x31d)][_0x871483(0xc1)](),this['_skillLearnIconSprite']=undefined;},Scene_Skill['prototype'][_0x1d7d7f(0x97)]=function(){const _0x5ae18b=_0x1d7d7f;if(TouchInput[_0x5ae18b(0x17d)]())return!![];if(Input[_0x5ae18b(0x2a9)]('ok'))return!![];if(Input[_0x5ae18b(0x2a9)](_0x5ae18b(0x2ea)))return!![];if(this[_0x5ae18b(0x31d)][_0x5ae18b(0xb7)]<0xff)return![];if(this['_skillLearnAnimationSprite'])return![];return this[_0x5ae18b(0x23b)]--<=0x0;},Scene_Skill[_0x1d7d7f(0x175)]['processFinishSkillLearnAnimation']=function(){const _0x12f137=_0x1d7d7f;this[_0x12f137(0xe5)](),this['destroySkillLearnSprite'](),this['finishSkillLearnAnimation'](),TouchInput['clear'](),Input[_0x12f137(0x19b)]();},Window_Base[_0x1d7d7f(0x175)][_0x1d7d7f(0x20e)]=function(_0x17fcb0,_0x2de1f9,_0xb10036,_0x1a84c6,_0x21124c){const _0x54af32=_0x1d7d7f;_0x21124c=_0x21124c||_0x54af32(0xd0);const _0x45bca4=_0x54af32(0x1f8)[_0x54af32(0x2b8)](ImageManager['abilityPointsIcon']),_0x4dc4d8=TextManager[_0x54af32(0x29d)],_0x34e33c=_0x4dc4d8['format'](_0x17fcb0,TextManager['abilityPointsAbbr'],_0x45bca4,TextManager[_0x54af32(0x125)]),_0x258b89=this['textSizeEx'](_0x34e33c)[_0x54af32(0xf0)];if(_0x21124c===_0x54af32(0xd0))_0x2de1f9+=0x0;else _0x21124c==='center'?_0x2de1f9+=Math[_0x54af32(0x7a)]((_0x1a84c6-_0x258b89)/0x2):_0x2de1f9+=_0x1a84c6-_0x258b89;this[_0x54af32(0xa1)](_0x34e33c,_0x2de1f9,_0xb10036);},Window_Base[_0x1d7d7f(0x175)][_0x1d7d7f(0xef)]=function(_0x4fe424,_0xe6f857,_0x22b89c,_0x349f31,_0x2266b9,_0x51e239){const _0x380330=_0x1d7d7f,_0x1fdc33=_0x4fe424[_0x380330(0x107)](_0xe6f857);this['drawAbilityPoints'](_0x1fdc33,_0x22b89c,_0x349f31,_0x2266b9,_0x51e239);},Window_Base[_0x1d7d7f(0x175)]['drawSkillPoints']=function(_0x19c99e,_0x26cd55,_0x232be6,_0x2cf14b,_0x786ef7){const _0x2f3b2c=_0x1d7d7f;_0x786ef7=_0x786ef7||'left';const _0x4517d1='\x5cI[%1]'[_0x2f3b2c(0x2b8)](ImageManager[_0x2f3b2c(0x1e0)]),_0x2a37e3=TextManager['skillPointsFmt'],_0x49dcbf=_0x2a37e3[_0x2f3b2c(0x2b8)](_0x19c99e,TextManager[_0x2f3b2c(0x7b)],_0x4517d1,TextManager[_0x2f3b2c(0x2b0)]),_0x27e454=this[_0x2f3b2c(0x2df)](_0x49dcbf)[_0x2f3b2c(0xf0)];if(_0x786ef7===_0x2f3b2c(0xd0))_0x26cd55+=0x0;else _0x786ef7===_0x2f3b2c(0x139)?_0x2f3b2c(0x29f)!=='liAPg'?_0x3be208=_0x358f24(_0x5c8ec8):_0x26cd55+=Math['round']((_0x2cf14b-_0x27e454)/0x2):_0x26cd55+=_0x2cf14b-_0x27e454;this[_0x2f3b2c(0xa1)](_0x49dcbf,_0x26cd55,_0x232be6);},Window_Base['prototype'][_0x1d7d7f(0x25c)]=function(_0x250ba3,_0x4972ba,_0x19e1a8,_0x24ea59,_0x26743d,_0x5bdc0c){const _0x23257e=_0x1d7d7f,_0x2e56a8=_0x250ba3[_0x23257e(0x1a6)](_0x4972ba);this[_0x23257e(0x93)](_0x2e56a8,_0x19e1a8,_0x24ea59,_0x26743d,_0x5bdc0c);},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x1be)]=Window_SkillType[_0x1d7d7f(0x175)][_0x1d7d7f(0x10e)],Window_SkillType[_0x1d7d7f(0x175)][_0x1d7d7f(0x10e)]=function(){const _0x48326c=_0x1d7d7f;VisuMZ['SkillLearnSystem']['Window_SkillType_makeCommandList'][_0x48326c(0x158)](this),this[_0x48326c(0xe9)]();},Window_SkillType['prototype']['addSkillLearnSystemCommand']=function(){const _0x1c5f1b=_0x1d7d7f;if(!$gameSystem['isSkillLearnSystemMenuAccess']())return;if(!this[_0x1c5f1b(0x16b)])return;let _0x35b691=this[_0x1c5f1b(0x19f)]();const _0x3551bd=this[_0x1c5f1b(0x16b)][_0x1c5f1b(0x1b3)]()[0x0];this[_0x1c5f1b(0x269)](_0x35b691,_0x1c5f1b(0x8d),!![],_0x1c5f1b(0x87));},Window_SkillType[_0x1d7d7f(0x175)][_0x1d7d7f(0x19f)]=function(){const _0x1a752c=_0x1d7d7f;let _0x55f745=TextManager[_0x1a752c(0x90)];if(_0x55f745[_0x1a752c(0x2fe)](/\\I\[(\d+)\]/i))return _0x55f745;if(!Imported[_0x1a752c(0x140)])return _0x55f745;if(this[_0x1a752c(0xd2)]()===_0x1a752c(0x2f9))return _0x55f745;const _0x3ca243=TextManager['skillLearnIcon'];return _0x1a752c(0x23d)[_0x1a752c(0x2b8)](_0x3ca243,_0x55f745);},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0xf7)]=Window_SkillStatus['prototype'][_0x1d7d7f(0x155)],Window_SkillStatus['prototype'][_0x1d7d7f(0x155)]=function(){const _0x36bdf9=_0x1d7d7f;this['resetFontSettings'](),this[_0x36bdf9(0x2cf)]()?this[_0x36bdf9(0x8e)]():_0x36bdf9(0x298)!==_0x36bdf9(0xa3)?VisuMZ[_0x36bdf9(0x1b2)][_0x36bdf9(0xf7)][_0x36bdf9(0x158)](this):this[_0x36bdf9(0x257)](_0x446f70,_0x39b00c,_0x75a676,_0xb12368);},Window_SkillStatus[_0x1d7d7f(0x175)][_0x1d7d7f(0x2cf)]=function(){const _0x2f50b4=_0x1d7d7f,_0x50415c=SceneManager[_0x2f50b4(0x14a)];if(!_0x50415c)return![];const _0x5b9926=_0x50415c['_itemWindow'];if(!_0x5b9926)return![];return _0x5b9926[_0x2f50b4(0x2cf)]&&_0x5b9926[_0x2f50b4(0x2cf)]();},Window_SkillStatus[_0x1d7d7f(0x175)][_0x1d7d7f(0x8e)]=function(){const _0x1f6ca1=_0x1d7d7f;if(!this['_actor'])return;Window_StatusBase['prototype'][_0x1f6ca1(0x155)][_0x1f6ca1(0x158)](this);if(VisuMZ[_0x1f6ca1(0x1b2)][_0x1f6ca1(0x185)][_0x1f6ca1(0x226)][_0x1f6ca1(0x1a3)]){if(_0x1f6ca1(0xf2)===_0x1f6ca1(0x166))return _0xe2e21a&&_0x5b22ed[_0x1f6ca1(0x323)][_0x1f6ca1(0x2fe)](_0x356787[_0x1f6ca1(0x1b2)][_0x1f6ca1(0x205)][_0x1f6ca1(0x174)])?_0x52b762*(_0x3e7fe2(_0x27e405['$1'])*0.01):_0x253f30;else{VisuMZ[_0x1f6ca1(0x1b2)]['Settings']['General'][_0x1f6ca1(0x1a3)][_0x1f6ca1(0x158)](this);return;}}const _0x133384=this[_0x1f6ca1(0x13f)]()/0x2,_0x1bdee0=this[_0x1f6ca1(0x193)],_0x4887c0=_0x1bdee0/0x2-this[_0x1f6ca1(0x1d8)]()*1.5;this[_0x1f6ca1(0x208)](this[_0x1f6ca1(0x16b)],_0x133384+0x1,0x0,0x90,_0x1bdee0),this[_0x1f6ca1(0x26a)](this[_0x1f6ca1(0x16b)],_0x133384+0xb4,_0x4887c0);let _0x192beb=this[_0x1f6ca1(0x13f)]()/0x2+0xb4+0xb4+0xb4,_0x5b9524=this[_0x1f6ca1(0xfc)]-_0x192beb-0x2;if(_0x5b9524<0x12c)return;const _0xa8ccff=this[_0x1f6ca1(0x278)](),_0x20076f=Math[_0x1f6ca1(0x306)](this[_0x1f6ca1(0x193)]/this[_0x1f6ca1(0x1d8)]()),_0xfeed7b=Math[_0x1f6ca1(0xc8)](_0xa8ccff[_0x1f6ca1(0x1c5)]/_0x20076f);let _0x1f4ea9=_0x192beb,_0x1bcfcf=Math[_0x1f6ca1(0x182)](Math[_0x1f6ca1(0x7a)]((this[_0x1f6ca1(0x193)]-this['lineHeight']()*Math[_0x1f6ca1(0xc8)](_0xa8ccff['length']/_0xfeed7b))/0x2),0x0);const _0x591195=_0x1bcfcf;let _0x300cdc=(this['innerWidth']-_0x1f4ea9-this[_0x1f6ca1(0x86)]()*0x2*_0xfeed7b)/_0xfeed7b;_0xfeed7b===0x1&&(_0x300cdc=Math[_0x1f6ca1(0x22d)](ImageManager[_0x1f6ca1(0x272)],_0x300cdc),_0x1f4ea9+=Math[_0x1f6ca1(0x7a)]((this['innerWidth']-_0x1f4ea9-this[_0x1f6ca1(0x86)]()*0x2-_0x300cdc)/0x2));for(const _0xd8e89a of _0xa8ccff){if(_0x1f6ca1(0x236)===_0x1f6ca1(0x202))_0xf0d010[_0x1f6ca1(0x175)][_0x1f6ca1(0x77)][_0x1f6ca1(0x158)](this);else{switch(_0xd8e89a){case'AP':this[_0x1f6ca1(0xef)](this[_0x1f6ca1(0x16b)],this['_actor']['currentClass']()['id'],_0x1f4ea9,_0x1bcfcf,_0x300cdc,_0x1f6ca1(0x20c));break;case'CP':if(Imported[_0x1f6ca1(0x1c0)]){if(_0x1f6ca1(0x102)==='LDYrK')this[_0x1f6ca1(0x98)](this[_0x1f6ca1(0x16b)],this[_0x1f6ca1(0x16b)][_0x1f6ca1(0xd4)]()['id'],_0x1f4ea9,_0x1bcfcf,_0x300cdc,'right');else return _0x485043['SkillLearnSystem'][_0x1f6ca1(0x185)][_0x1f6ca1(0x260)][_0x1f6ca1(0x2da)];}break;case'JP':Imported['VisuMZ_2_ClassChangeSystem']&&(_0x1f6ca1(0x2d5)===_0x1f6ca1(0x2fb)?_0xcd598a=_0x2d2bdb[_0x1f6ca1(0xee)](_0x346eb1):this[_0x1f6ca1(0x25d)](this[_0x1f6ca1(0x16b)],this['_actor'][_0x1f6ca1(0xd4)]()['id'],_0x1f4ea9,_0x1bcfcf,_0x300cdc,'right'));break;case'SP':this[_0x1f6ca1(0x25c)](this[_0x1f6ca1(0x16b)],this[_0x1f6ca1(0x16b)][_0x1f6ca1(0xd4)]()['id'],_0x1f4ea9,_0x1bcfcf,_0x300cdc,_0x1f6ca1(0x20c));break;case'Gold':this[_0x1f6ca1(0x30c)]($gameParty[_0x1f6ca1(0x89)](),TextManager['currencyUnit'],_0x1f4ea9,_0x1bcfcf,_0x300cdc);break;default:continue;}_0x1bcfcf+=this[_0x1f6ca1(0x1d8)](),_0x1bcfcf+this[_0x1f6ca1(0x1d8)]()>this['innerHeight']&&(_0x1bcfcf=_0x591195,_0x1f4ea9+=_0x300cdc+this[_0x1f6ca1(0x86)]()*0x2);}}},Window_SkillStatus[_0x1d7d7f(0x175)][_0x1d7d7f(0x278)]=function(){const _0x5c5a43=_0x1d7d7f,_0x1dd852=JsonEx[_0x5c5a43(0x255)](VisuMZ['SkillLearnSystem'][_0x5c5a43(0x185)]['General'][_0x5c5a43(0xb3)]);return!Imported[_0x5c5a43(0x1c0)]&&(_0x5c5a43(0x2e1)!==_0x5c5a43(0x2e1)?this[_0x5c5a43(0x2ec)]=this[_0x5c5a43(0x2ec)]['concat'](_0x1d530e[_0x5c5a43(0x1b2)][_0x5c5a43(0x185)]['Animation'][_0x5c5a43(0x1da)]):(_0x1dd852[_0x5c5a43(0x127)]('CP'),_0x1dd852[_0x5c5a43(0x127)]('JP'))),_0x1dd852[_0x5c5a43(0x127)](_0x5c5a43(0x200))[_0x5c5a43(0x127)]('Weapon')[_0x5c5a43(0x127)](_0x5c5a43(0x273));},Window_SkillList['prototype'][_0x1d7d7f(0x2cf)]=function(){const _0xf2995e=_0x1d7d7f;return this[_0xf2995e(0x23e)]===_0xf2995e(0x87);},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x314)]=Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x18d)],Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x18d)]=function(_0x55aa0b){const _0xc827b6=_0x1d7d7f,_0x463a10=this[_0xc827b6(0x2cf)]();VisuMZ[_0xc827b6(0x1b2)][_0xc827b6(0x314)][_0xc827b6(0x158)](this,_0x55aa0b);if(_0x463a10!==this[_0xc827b6(0x2cf)]()){if(_0xc827b6(0x85)===_0xc827b6(0x2d2))this[_0xc827b6(0x31d)]['opacity']+=this[_0xc827b6(0x12d)];else{const _0x56e637=SceneManager[_0xc827b6(0x14a)];if(!_0x56e637)return;const _0x464da0=_0x56e637[_0xc827b6(0x282)];if(_0x464da0)_0x464da0[_0xc827b6(0x155)]();}}},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x80)]=Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x228)],Window_SkillList['prototype']['maxCols']=function(){const _0x21b0cc=_0x1d7d7f;if(this['isSkillLearnMode']()){if(_0x21b0cc(0x310)===_0x21b0cc(0x163))_0x1ef6a4[_0x21b0cc(0x1b2)][_0x21b0cc(0x1be)][_0x21b0cc(0x158)](this),this[_0x21b0cc(0xe9)]();else return 0x1;}else return VisuMZ['SkillLearnSystem']['Window_SkillList_maxCols'][_0x21b0cc(0x158)](this);},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x2fc)]=Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0xb1)],Window_SkillList[_0x1d7d7f(0x175)]['makeItemList']=function(){const _0x5832ad=_0x1d7d7f;this[_0x5832ad(0x16b)]&&this['isSkillLearnMode']()?this[_0x5832ad(0x1d6)]():VisuMZ['SkillLearnSystem'][_0x5832ad(0x2fc)][_0x5832ad(0x158)](this);},Window_SkillList['prototype'][_0x1d7d7f(0x1d6)]=function(){const _0x520eb4=_0x1d7d7f,_0x50b3c4=DataManager['getSkillLearnSkillsFromClass'](this['_actor'][_0x520eb4(0xd4)]()['id']);this[_0x520eb4(0x14b)]=_0x50b3c4[_0x520eb4(0x2ae)](_0x4d6394=>$dataSkills[_0x4d6394])[_0x520eb4(0xb2)](_0x813399=>this[_0x520eb4(0x30a)](_0x813399));},VisuMZ[_0x1d7d7f(0x1b2)]['Window_SkillList_includes']=Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x30a)],Window_SkillList[_0x1d7d7f(0x175)]['includes']=function(_0x2c671e){const _0x1db8f2=_0x1d7d7f;if(this['isSkillLearnMode']())return this[_0x1db8f2(0xbe)](_0x2c671e);else{if(_0x1db8f2(0x266)===_0x1db8f2(0x26d))_0x3eff27[_0x1db8f2(0x1b2)][_0x1db8f2(0x196)][_0x1db8f2(0x158)](this),this[_0x1db8f2(0x2be)](),this['displayRewardsSkillPoints']();else return VisuMZ[_0x1db8f2(0x1b2)][_0x1db8f2(0x148)][_0x1db8f2(0x158)](this,_0x2c671e);}},Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0xbe)]=function(_0x2a9f8b){const _0x6daebc=_0x1d7d7f;if(!_0x2a9f8b)return![];if(_0x2a9f8b['name'][_0x6daebc(0x1c5)]<=0x0)return![];if(_0x2a9f8b[_0x6daebc(0x31a)][_0x6daebc(0x2fe)](/-----/i))return![];const _0x3d3a31=VisuMZ['SkillLearnSystem']['createKeyJS'](_0x2a9f8b,_0x6daebc(0x1fc));if(VisuMZ['SkillLearnSystem']['JS'][_0x3d3a31]){if(!VisuMZ[_0x6daebc(0x1b2)]['JS'][_0x3d3a31][_0x6daebc(0x158)](this,this[_0x6daebc(0x16b)],_0x2a9f8b))return![];}const _0x2402f6=VisuMZ[_0x6daebc(0x1b2)][_0x6daebc(0x205)],_0x1408d9=_0x2a9f8b[_0x6daebc(0x323)];if(_0x1408d9[_0x6daebc(0x2fe)](_0x2402f6[_0x6daebc(0x299)])){const _0x4873a9=Number(RegExp['$1']);if(_0x4873a9>this[_0x6daebc(0x16b)][_0x6daebc(0x88)])return![];}if(_0x1408d9[_0x6daebc(0x2fe)](_0x2402f6[_0x6daebc(0x1c7)])){const _0x11689a=String(RegExp['$1'])[_0x6daebc(0x2b6)](',')[_0x6daebc(0x2ae)](_0x4b60bb=>_0x4b60bb[_0x6daebc(0x279)]());;for(const _0x363201 of _0x11689a){if(_0x6daebc(0x1e3)!==_0x6daebc(0x245)){let _0x312b1d=0x0;const _0x5d7b3f=/^\d+$/[_0x6daebc(0x262)](_0x363201);_0x5d7b3f?_0x312b1d=Number(_0x363201):_0x312b1d=DataManager[_0x6daebc(0xee)](_0x363201);if(!this[_0x6daebc(0x16b)]['isLearnedSkill'](_0x312b1d))return![];}else{if(_0x179db8[_0x6daebc(0x2fe)](/GOLD:[ ](\d+)/gi))return _0xa10635(_0x16d532['$1']);}}}if(_0x1408d9[_0x6daebc(0x2fe)](_0x2402f6[_0x6daebc(0x2a8)])){const _0x3d0e41=String(RegExp['$1'])[_0x6daebc(0x2b6)](',')[_0x6daebc(0x2ae)](_0x4a1cec=>_0x4a1cec[_0x6daebc(0x279)]());;let _0x48cccf=![];for(const _0x1eaf8e of _0x3d0e41){let _0x79f922=0x0;const _0x1158c2=/^\d+$/[_0x6daebc(0x262)](_0x1eaf8e);if(_0x1158c2){if(_0x6daebc(0x18b)===_0x6daebc(0x18b))_0x79f922=Number(_0x1eaf8e);else return this[_0x6daebc(0x218)]===_0x41775b&&this[_0x6daebc(0x26f)](),this[_0x6daebc(0x218)];}else _0x79f922=DataManager[_0x6daebc(0xee)](_0x1eaf8e);if(this[_0x6daebc(0x16b)]['isLearnedSkill'](_0x79f922)){_0x48cccf=!![];break;}}if(!_0x48cccf)return![];}if(_0x1408d9['match'](_0x2402f6['LearnShowSwitchesAll'])){const _0x5944a1=String(RegExp['$1'])[_0x6daebc(0x2b6)](',')[_0x6daebc(0x2ae)](_0x50a2ec=>Number(_0x50a2ec));for(const _0x2bd8e1 of _0x5944a1){if(!$gameSwitches['value'](_0x2bd8e1))return![];}}if(_0x1408d9[_0x6daebc(0x2fe)](_0x2402f6['LearnShowSwitchesAny'])){if(_0x6daebc(0x108)===_0x6daebc(0x108)){const _0x3fa6b2=String(RegExp['$1'])[_0x6daebc(0x2b6)](',')[_0x6daebc(0x2ae)](_0x224cfe=>Number(_0x224cfe));let _0x2d0933=![];for(const _0x5554d7 of _0x3fa6b2){if($gameSwitches[_0x6daebc(0x1b1)](_0x5554d7)){_0x2d0933=!![];break;}}if(!_0x2d0933)return![];}else _0x249809>0x0&&(_0x5704c3*=this[_0x6daebc(0x2e3)]()),this['addAbilityPoints'](_0x2b3965,_0x4f8f39);}return _0x2a9f8b;},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x161)]=Window_SkillList['prototype'][_0x1d7d7f(0x153)],Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x153)]=function(_0x30ce40){const _0x3ba5f3=_0x1d7d7f;if(this[_0x3ba5f3(0x16b)]&&this[_0x3ba5f3(0x2cf)]()){if('hPJpg'!==_0x3ba5f3(0xd6))return this[_0x3ba5f3(0x283)](_0x30ce40);else{if(this[_0x3ba5f3(0x164)]())this[_0x3ba5f3(0x330)](_0x18cd41);}}else{if(_0x3ba5f3(0x30f)===_0x3ba5f3(0x30f))return VisuMZ['SkillLearnSystem'][_0x3ba5f3(0x161)][_0x3ba5f3(0x158)](this,_0x30ce40);else{if(this[_0x3ba5f3(0x13b)]()[_0x3ba5f3(0x2ca)]()&&_0x4d05b9[_0x3ba5f3(0x2fe)](_0x2f1fe9['UserGainAbilityPoints'])){const _0x59e139=_0x3a2c86(_0x5bcd84['$1']);this[_0x3ba5f3(0x13b)]()[_0x3ba5f3(0x1e1)](_0x59e139);}else this[_0x3ba5f3(0x1c8)]();if(_0x23706b[_0x3ba5f3(0x2ca)]()&&_0x4aadb8['match'](_0x52ac9d[_0x3ba5f3(0x209)])){const _0x374e48=_0x61cb0(_0x22e634['$1']);_0x2c4527[_0x3ba5f3(0x1e1)](_0x374e48);}}}},VisuMZ['SkillLearnSystem'][_0x1d7d7f(0xc7)]=Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x297)],Window_SkillList['prototype'][_0x1d7d7f(0x297)]=function(_0x103c6b){const _0x201602=_0x1d7d7f;this['_skillLearnSystem_drawItemMode']=this['isSkillLearnMode'](),VisuMZ[_0x201602(0x1b2)][_0x201602(0xc7)][_0x201602(0x158)](this,_0x103c6b),this[_0x201602(0x75)]=![];},Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x283)]=function(_0x42c677){const _0x399bfa=_0x1d7d7f;if(!_0x42c677)return![];if(_0x42c677[_0x399bfa(0x31a)][_0x399bfa(0x1c5)]<=0x0)return![];if(_0x42c677[_0x399bfa(0x31a)][_0x399bfa(0x2fe)](/-----/i))return![];if(this[_0x399bfa(0x16b)][_0x399bfa(0x2d9)](_0x42c677['id']))return![];if(this[_0x399bfa(0x75)]){if(_0x399bfa(0xf9)===_0x399bfa(0xf9)){if(!this[_0x399bfa(0x16b)][_0x399bfa(0x284)](_0x42c677))return![];return this[_0x399bfa(0x16b)]['canPayForSkillLearnSystem'](_0x42c677);}else _0x1bf32d=_0x9d3e64(_0x4a2dfc);}return!![];},VisuMZ[_0x1d7d7f(0x1b2)][_0x1d7d7f(0x18a)]=Window_SkillList['prototype']['drawSkillCost'],Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x290)]=function(_0x28864e,_0x98a4fb,_0x2ce5d9,_0x4c286b){const _0x4b0402=_0x1d7d7f;if(this['isSkillLearnMode']())this[_0x4b0402(0x216)](_0x28864e)?this[_0x4b0402(0x132)](_0x28864e,_0x98a4fb,_0x2ce5d9,_0x4c286b):'WacoJ'===_0x4b0402(0xf4)?this['drawSkillLearnRequirements'](_0x5e5849,_0x2c1842,_0x531848,_0x143a55):this[_0x4b0402(0x257)](_0x28864e,_0x98a4fb,_0x2ce5d9,_0x4c286b);else{if(_0x4b0402(0x2b3)===_0x4b0402(0x2b3))VisuMZ['SkillLearnSystem'][_0x4b0402(0x18a)][_0x4b0402(0x158)](this,_0x28864e,_0x98a4fb,_0x2ce5d9,_0x4c286b);else{if(_0x29e6ff[_0x4b0402(0x1b2)][_0x4b0402(0x185)][_0x4b0402(0x8f)][_0x4b0402(0xeb)])return _0x5ec5e0[_0x4b0402(0x1b2)][_0x4b0402(0x185)][_0x4b0402(0x8f)]['DetailWindow_RectJS'][_0x4b0402(0x158)](this);const _0x2c5e56=this[_0x4b0402(0x26b)](),_0xdeed42=_0x2c5e56['x'],_0x3432cb=_0x2c5e56['y'],_0x593f6c=_0x2c5e56[_0x4b0402(0xf0)],_0x2703bf=_0x2c5e56[_0x4b0402(0x276)]-this['calcWindowHeight'](0x2,![]);return new _0x5ebd53(_0xdeed42,_0x3432cb,_0x593f6c,_0x2703bf);}}},Window_SkillList[_0x1d7d7f(0x175)]['shouldDrawSkillLearnRequirements']=function(_0x53dca4){const _0x39b1b4=_0x1d7d7f;return this[_0x39b1b4(0x16b)]&&!this[_0x39b1b4(0x16b)][_0x39b1b4(0x284)](_0x53dca4);},Window_SkillList['prototype'][_0x1d7d7f(0x132)]=function(_0x51a96c,_0x4d58bb,_0x569605,_0x29309e){const _0x2be1df=_0x1d7d7f,_0x3bf3b5=this[_0x2be1df(0x12b)](_0x51a96c),_0x39e77b=this[_0x2be1df(0x2df)](_0x3bf3b5)['width'];_0x4d58bb+=_0x29309e-_0x39e77b,this[_0x2be1df(0xa1)](_0x3bf3b5,_0x4d58bb,_0x569605);},Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x12b)]=function(_0x6fa88b){const _0x5a5485=_0x1d7d7f,_0x4c8b13=VisuMZ[_0x5a5485(0x1b2)][_0x5a5485(0x185)][_0x5a5485(0x226)],_0x5c5c90=TextManager[_0x5a5485(0xe2)],_0x1a253a=VisuMZ[_0x5a5485(0x1b2)][_0x5a5485(0x205)],_0x5b0270=_0x6fa88b[_0x5a5485(0x323)];let _0x4f351f='',_0x4d828f='';const _0xc13820=['LEVEL',_0x5a5485(0x114),_0x5a5485(0x16e),_0x5a5485(0x249)];for(const _0x23875a of _0xc13820){switch(_0x23875a){case _0x5a5485(0x2c6):if(_0x5b0270[_0x5a5485(0x2fe)](_0x1a253a[_0x5a5485(0x126)])){const _0x474016=Number(RegExp['$1']);_0x4d828f=TextManager[_0x5a5485(0xca)][_0x5a5485(0x2b8)](_0x474016,TextManager[_0x5a5485(0x88)],TextManager[_0x5a5485(0x15b)]);if(_0x4d828f[_0x5a5485(0x1c5)]>0x0){if('sHTtm'===_0x5a5485(0xaa)){_0x3fa3d1=(_0x46ed4b(_0x1bf484)||'')[_0x5a5485(0x279)]();const _0x3ff58f=/^\d+$/['test'](_0x562c5e);_0x3ff58f?_0x523ed5['push'](_0x31b915(_0x5de1d4)):_0x5efcaa[_0x5a5485(0xce)](_0x163ffe['getSkillIdWithName'](_0x46ed16));}else _0x4f351f!==''?'beoWw'!==_0x5a5485(0x2f1)?_0x4f351f=_0x5c5c90[_0x5a5485(0x2b8)](_0x4f351f,_0x4d828f):_0x87c34f=_0x1e6b67[_0x5a5485(0xb5)](_0xd83288):_0x4f351f=_0x4d828f;}}break;case'SKILLS':if(_0x5b0270[_0x5a5485(0x2fe)](_0x1a253a[_0x5a5485(0x251)])){const _0x461bcf=String(RegExp['$1'])[_0x5a5485(0x2b6)](',')[_0x5a5485(0x2ae)](_0xaf0e4d=>_0xaf0e4d[_0x5a5485(0x279)]());;for(const _0xff71de of _0x461bcf){let _0x3a8be2=0x0;const _0x4dc7ce=/^\d+$/[_0x5a5485(0x262)](_0xff71de);if(_0x4dc7ce){if(_0x5a5485(0x171)===_0x5a5485(0x171))_0x3a8be2=Number(_0xff71de);else{const _0x38be41=_0x484ebb(_0x187b70['$1'])['split'](/[\r\n]+/);for(const _0x740b19 of _0x38be41){if(_0x740b19[_0x5a5485(0x2fe)](/(?:SKILL POINTS|SP):[ ](\d+)/gi))return _0x4b00c1(_0x382a34['$1']);}}}else{if(_0x5a5485(0x2dc)!==_0x5a5485(0x2dc)){const _0x5d925c=_0xbdeaf1[_0x5a5485(0x255)](_0x36ea25[_0x5a5485(0x1b2)]['Settings'][_0x5a5485(0x226)]['DisplayedCosts']);return!_0x33fee3['VisuMZ_2_ClassChangeSystem']&&(_0x5d925c[_0x5a5485(0x127)]('CP'),_0x5d925c[_0x5a5485(0x127)]('JP')),_0x5d925c['remove']('Item')['remove']('Weapon')[_0x5a5485(0x127)](_0x5a5485(0x273));}else _0x3a8be2=DataManager[_0x5a5485(0xee)](_0xff71de);}if($dataSkills[_0x3a8be2]){const _0x4eb331=$dataSkills[_0x3a8be2];_0x4d828f=TextManager['skillLearnReqSkillFmt'][_0x5a5485(0x2b8)](_0x5a5485(0x1f8)[_0x5a5485(0x2b8)](_0x4eb331['iconIndex']),_0x4eb331[_0x5a5485(0x31a)]),_0x4d828f[_0x5a5485(0x1c5)]>0x0&&(_0x4f351f!==''?_0x4f351f=_0x5c5c90['format'](_0x4f351f,_0x4d828f):_0x5a5485(0x7e)==='VozWt'?_0x4b9381=_0x38b5c2[_0x5a5485(0xb5)](_0x59b9a2):_0x4f351f=_0x4d828f);}}}if(_0x5b0270['match'](_0x1a253a[_0x5a5485(0x8b)])){const _0x4f03a5=String(RegExp['$1'])[_0x5a5485(0x2b6)](',')[_0x5a5485(0x2ae)](_0x522cf3=>_0x522cf3[_0x5a5485(0x279)]());;for(const _0x4dd796 of _0x4f03a5){if(_0x5a5485(0x212)==='SZWaX')_0x44ddab['setSkillPoints'](_0x36c59a,_0x38a720);else{let _0x4cceb9=0x0;const _0x1bae1d=/^\d+$/['test'](_0x4dd796);_0x1bae1d?_0x4cceb9=Number(_0x4dd796):_0x5a5485(0x165)==='XfkLu'?(_0x290617(_0x5a5485(0x1a0)['format'](_0x68f36d,_0x49fc8c)),_0x2d06ba[_0x5a5485(0x1a9)]()):_0x4cceb9=DataManager[_0x5a5485(0xee)](_0x4dd796);if($dataSkills[_0x4cceb9]){const _0x580b17=$dataSkills[_0x4cceb9];_0x4d828f=TextManager[_0x5a5485(0x82)][_0x5a5485(0x2b8)](_0x5a5485(0x1f8)[_0x5a5485(0x2b8)](_0x580b17[_0x5a5485(0xa7)]),_0x580b17['name']),_0x4d828f[_0x5a5485(0x1c5)]>0x0&&(_0x5a5485(0x28a)!=='cVqeK'?_0x3bad97['SkillLearnSystem']['JS'][_0x3ded68][_0x5a5485(0x158)](this,this,_0x9b3d06):_0x4f351f!==''?_0x4f351f=_0x5c5c90[_0x5a5485(0x2b8)](_0x4f351f,_0x4d828f):_0x4f351f=_0x4d828f);}}}}break;case'SWITCHES':if(_0x5b0270[_0x5a5485(0x2fe)](_0x1a253a[_0x5a5485(0x316)])){const _0x141bcc=String(RegExp['$1'])['split'](',')[_0x5a5485(0x2ae)](_0x20262a=>_0x20262a[_0x5a5485(0x279)]());;for(const _0x3bd759 of _0x141bcc){$dataSystem[_0x5a5485(0xe6)][_0x3bd759]&&(_0x4d828f=TextManager['skillLearnReqSwitchFmt'][_0x5a5485(0x2b8)]($dataSystem['switches'][_0x3bd759]||''),_0x4d828f[_0x5a5485(0x1c5)]>0x0&&(_0x5a5485(0x2c9)!==_0x5a5485(0x2c9)?this[_0x5a5485(0x144)][_0x5a5485(0x13e)]=_0x2078a4[_0x5a5485(0x7f)](this[_0x5a5485(0xc3)]):_0x4f351f!==''?_0x4f351f=_0x5c5c90[_0x5a5485(0x2b8)](_0x4f351f,_0x4d828f):_0x4f351f=_0x4d828f));}}if(_0x5b0270['match'](_0x1a253a[_0x5a5485(0xc0)])){if(_0x5a5485(0x250)!==_0x5a5485(0xda)){const _0x307624=String(RegExp['$1'])[_0x5a5485(0x2b6)](',')[_0x5a5485(0x2ae)](_0x24df39=>_0x24df39['trim']());;for(const _0x256f5c of _0x307624){if(_0x5a5485(0x133)!==_0x5a5485(0x133)){if(!_0x5430aa[_0x5a5485(0x1b2)]['JS'][_0xbfaf4][_0x5a5485(0x158)](this,this,_0x24918b))return![];}else $dataSystem['switches'][_0x256f5c]&&(_0x4d828f=TextManager[_0x5a5485(0x2ef)][_0x5a5485(0x2b8)]($dataSystem[_0x5a5485(0xe6)][_0x256f5c]||''),_0x4d828f[_0x5a5485(0x1c5)]>0x0&&(_0x4f351f!==''?_0x5a5485(0x239)===_0x5a5485(0x239)?_0x4f351f=_0x5c5c90[_0x5a5485(0x2b8)](_0x4f351f,_0x4d828f):_0x25c3a4=_0x5165f9||this[_0x5a5485(0xd4)]()['id']:_0x4f351f=_0x4d828f));}}else{const _0x415583=_0x50b7f9[_0x5a5485(0x14a)][_0x5a5485(0xcb)]();return _0x5a26ce[_0x5a5485(0x1b2)]['JS'][_0x13aecc][_0x5a5485(0x158)](this,_0x415583,_0x237c6b);}}break;case _0x5a5485(0x249):const _0x53a318=VisuMZ['SkillLearnSystem'][_0x5a5485(0x1d2)](_0x6fa88b,'jsLearnReqListTxt');VisuMZ['SkillLearnSystem']['JS'][_0x53a318]&&(_0x4d828f=VisuMZ[_0x5a5485(0x1b2)]['JS'][_0x53a318]['call'](this,this[_0x5a5485(0x16b)],_0x6fa88b),_0x4d828f['length']>0x0&&(_0x4f351f!==''?_0x4f351f=_0x5c5c90[_0x5a5485(0x2b8)](_0x4f351f,_0x4d828f):_0x4f351f=_0x4d828f));break;}}return _0x4f351f=TextManager[_0x5a5485(0x1f6)]['format'](_0x4f351f),_0x4f351f[_0x5a5485(0x279)]();},Window_SkillList[_0x1d7d7f(0x175)]['drawSkillLearnCost']=function(_0x177dbb,_0x16cb8,_0x9b73f2,_0x58d323){const _0x40e4d9=_0x1d7d7f,_0x2f611a=this[_0x40e4d9(0x1bb)](_0x177dbb),_0x4cb1f3=this[_0x40e4d9(0x2df)](_0x2f611a)[_0x40e4d9(0xf0)];_0x16cb8+=_0x58d323-_0x4cb1f3,this[_0x40e4d9(0xa1)](_0x2f611a,_0x16cb8,_0x9b73f2);},Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x1bb)]=function(_0x5a6534){const _0x584884=_0x1d7d7f;if(this[_0x584884(0x16b)]&&this[_0x584884(0x16b)]['isLearnedSkill'](_0x5a6534['id'])){if(_0x584884(0x1bf)===_0x584884(0x1bf))return TextManager['skillLearnAlreadyLearned'];else this[_0x584884(0x2b7)](...arguments);}const _0x261c16=VisuMZ['SkillLearnSystem'][_0x584884(0x185)][_0x584884(0x226)],_0x359a0c=TextManager[_0x584884(0x197)];let _0x49654f='';const _0x5a0886=JsonEx[_0x584884(0x255)](_0x261c16['DisplayedCosts']);_0x5a0886[_0x584884(0xce)]('Custom');for(const _0xb7756f of _0x5a0886){if(_0x584884(0x2bd)==='TJJOj'){if(!_0xb7756f)continue;const _0x553500=this['createSkillLearnCostText'](_0x5a6534,_0xb7756f)[_0x584884(0x279)]();_0x553500[_0x584884(0x1c5)]>0x0&&(_0x49654f!==''?_0x584884(0x1ab)!==_0x584884(0x1ab)?_0x5ae136*=this[_0x584884(0x2e3)]():_0x49654f=_0x359a0c[_0x584884(0x2b8)](_0x49654f,_0x553500):_0x49654f=_0x553500);}else{const _0x4559af=this['skillLearnIngredientsWindowRect']();this['_skillLearnIngredientsWindow']=new _0xdff487(_0x4559af),this['addWindow'](this[_0x584884(0x2c7)]),this[_0x584884(0x2c7)][_0x584884(0x320)]();const _0x429ff2=_0x2b9403[_0x584884(0x1b2)][_0x584884(0x185)][_0x584884(0x8f)][_0x584884(0x101)];this['_skillLearnIngredientsWindow'][_0x584884(0xb8)](_0x429ff2);}}return _0x49654f[_0x584884(0x279)]();},Window_SkillList[_0x1d7d7f(0x175)][_0x1d7d7f(0x28f)]=function(_0x243569,_0x3e3a35){const _0x2f287d=_0x1d7d7f;let _0xafb02f=0x0,_0x153d88='',_0x5c12a0='';switch(_0x3e3a35[_0x2f287d(0x167)]()[_0x2f287d(0x279)]()){case'AP':_0xafb02f=DataManager[_0x2f287d(0x2d4)](_0x243569);if(_0xafb02f>0x0){if(_0x2f287d(0x230)!==_0x2f287d(0x230)){_0x59af64=_0x403fb7||_0x2f287d(0xd0);const _0x26cb1c='\x5cI[%1]'['format'](_0xdcba87[_0x2f287d(0x301)]),_0x342cab=_0x2671ab[_0x2f287d(0x29d)],_0x2fe74c=_0x342cab[_0x2f287d(0x2b8)](_0x1471b1,_0x2c190d[_0x2f287d(0x81)],_0x26cb1c,_0x2a04b7[_0x2f287d(0x125)]),_0x1da55e=this[_0x2f287d(0x2df)](_0x2fe74c)[_0x2f287d(0xf0)];if(_0x14d98e===_0x2f287d(0xd0))_0x362311+=0x0;else _0x493e5c==='center'?_0x5ec138+=_0x34a5f8[_0x2f287d(0x7a)]((_0xd434a6-_0x1da55e)/0x2):_0x30846b+=_0x4daf8d-_0x1da55e;this[_0x2f287d(0xa1)](_0x2fe74c,_0x53b68f,_0x28f47d);}else return _0x153d88=TextManager['abilityPointsFmt'],_0x153d88[_0x2f287d(0x2b8)](_0xafb02f,TextManager['abilityPointsAbbr'],_0x2f287d(0x1f8)[_0x2f287d(0x2b8)](ImageManager[_0x2f287d(0x301)]),TextManager[_0x2f287d(0x125)]);}break;case'SP':_0xafb02f=DataManager[_0x2f287d(0x1eb)](_0x243569);if(_0xafb02f>0x0){if(_0x2f287d(0xdf)==='AGVrd')return _0x153d88=TextManager['skillPointsFmt'],_0x153d88[_0x2f287d(0x2b8)](_0xafb02f,TextManager['skillPointsAbbr'],_0x2f287d(0x1f8)['format'](ImageManager['skillPointsIcon']),TextManager[_0x2f287d(0x2b0)]);else{const _0xb41798=!this[_0x2f287d(0x2d9)](_0x514a35);_0x1ab62c[_0x2f287d(0x1b2)][_0x2f287d(0xfd)][_0x2f287d(0x158)](this,_0x219e5f);if(_0xb41798&&this[_0x2f287d(0x2d9)](_0xa989f2)){const _0x17b2ec=_0x14677f[_0x49be50],_0x802675=_0x5ccdd7['SkillLearnSystem']['createKeyJS'](_0x17b2ec,'jsOnLearn');_0x19465[_0x2f287d(0x1b2)]['JS'][_0x802675]&&_0x42b014['SkillLearnSystem']['JS'][_0x802675]['call'](this,this,_0x17b2ec);}}}break;case _0x2f287d(0x17b):_0xafb02f=DataManager['getSkillLearnItemCost'](_0x243569),_0x153d88=TextManager[_0x2f287d(0x286)];for(const _0x31dae9 of _0xafb02f){if(!_0x31dae9)continue;const _0x28cc44=$dataItems[_0x31dae9['id']];if(!_0x28cc44)continue;const _0x31c3ba=_0x153d88['format'](_0x31dae9['quantity'],_0x2f287d(0x1f8)['format'](_0x28cc44['iconIndex']),_0x28cc44[_0x2f287d(0x31a)]);_0x5c12a0!==''?_0x5c12a0=TextManager[_0x2f287d(0x197)]['format'](_0x5c12a0,_0x31c3ba):_0x5c12a0=_0x31c3ba;}return _0x5c12a0;case _0x2f287d(0x157):_0xafb02f=DataManager[_0x2f287d(0x179)](_0x243569),_0x153d88=TextManager[_0x2f287d(0x1ba)];for(const _0x74e8b2 of _0xafb02f){if(!_0x74e8b2)continue;const _0x2b9094=$dataWeapons[_0x74e8b2['id']];if(!_0x2b9094)continue;const _0x2db1c8=_0x153d88[_0x2f287d(0x2b8)](_0x74e8b2['quantity'],_0x2f287d(0x1f8)[_0x2f287d(0x2b8)](_0x2b9094['iconIndex']),_0x2b9094[_0x2f287d(0x31a)]);if(_0x5c12a0!==''){if(_0x2f287d(0x12c)!=='LzMcO'){if(_0x45a5c7[_0x2f287d(0x26c)])return;this['process_VisuMZ_SkillLearnSystem_JS']();}else _0x5c12a0=TextManager[_0x2f287d(0x197)][_0x2f287d(0x2b8)](_0x5c12a0,_0x2db1c8);}else _0x5c12a0=_0x2db1c8;}return _0x5c12a0;case _0x2f287d(0x74):_0xafb02f=DataManager[_0x2f287d(0x105)](_0x243569),_0x153d88=TextManager['skillLearnArmorFmt'];for(const _0x3b44f4 of _0xafb02f){if(_0x2f287d(0x13a)==='NMPeT')_0x8d24bc[_0x2f287d(0x175)][_0x2f287d(0x2b7)]['call'](this,_0x3548de);else{if(!_0x3b44f4)continue;const _0x3b92c0=$dataArmors[_0x3b44f4['id']];if(!_0x3b92c0)continue;const _0x3c1a2f=_0x153d88[_0x2f287d(0x2b8)](_0x3b44f4['quantity'],_0x2f287d(0x1f8)['format'](_0x3b92c0['iconIndex']),_0x3b92c0['name']);_0x5c12a0!==''?_0x5c12a0=TextManager[_0x2f287d(0x197)][_0x2f287d(0x2b8)](_0x5c12a0,_0x3c1a2f):_0x5c12a0=_0x3c1a2f;}}return _0x5c12a0;case _0x2f287d(0x2dd):_0xafb02f=DataManager[_0x2f287d(0x1dd)](_0x243569);if(_0xafb02f>0x0){if(_0x2f287d(0x1e7)!==_0x2f287d(0x119))return _0x153d88=TextManager[_0x2f287d(0x211)],_0x153d88[_0x2f287d(0x2b8)](_0xafb02f,Imported['VisuMZ_0_CoreEngine']?_0x2f287d(0x1f8)[_0x2f287d(0x2b8)](VisuMZ[_0x2f287d(0x17a)][_0x2f287d(0x185)][_0x2f287d(0x106)][_0x2f287d(0xc6)]):TextManager['currencyUnit'],TextManager['currencyUnit']);else _0x56c625=_0x5b13de[_0x2f287d(0xee)](_0x58ef2f);}break;case _0x2f287d(0x249):const _0x4bf3df=VisuMZ['SkillLearnSystem'][_0x2f287d(0x1d2)](_0x243569,'jsLearnShowListTxt');if(VisuMZ['SkillLearnSystem']['JS'][_0x4bf3df]){if(_0x2f287d(0xf8)!==_0x2f287d(0xf8)){const _0x2fabd9=_0x2052e6[_0x2f287d(0x1b2)][_0x2f287d(0x185)][_0x2f287d(0x143)];_0x2fabd9[_0x2f287d(0x22c)]?_0x222ad4=0x0:_0x3b7dd0=_0x395690||this[_0x2f287d(0xd4)]()['id'],_0x4d10bf+=this[_0x2f287d(0x1a6)](_0x383e89),this['setSkillPoints'](_0x4d2b7b,_0x61ec7a);}else return VisuMZ[_0x2f287d(0x1b2)]['JS'][_0x4bf3df][_0x2f287d(0x158)](this,this[_0x2f287d(0x16b)],_0x243569);}break;case'CP':if(Imported[_0x2f287d(0x1c0)]){_0xafb02f=DataManager[_0x2f287d(0xbb)](_0x243569);if(_0xafb02f>0x0){if(_0x2f287d(0x2b1)==='qsGcg')_0x5b46dd=_0x1420d2(_0x375330['PerLevelUp']);else return _0x153d88=TextManager[_0x2f287d(0x84)],_0x153d88[_0x2f287d(0x2b8)](_0xafb02f,TextManager[_0x2f287d(0x1a4)],_0x2f287d(0x1f8)[_0x2f287d(0x2b8)](ImageManager['classPointsIcon']),TextManager[_0x2f287d(0xad)]);}break;}case'JP':if(Imported[_0x2f287d(0x1c0)]){if(_0x2f287d(0x2ac)===_0x2f287d(0x2d7)){if(!this[_0x2f287d(0x25b)])return;this[_0x2f287d(0x2e9)](this[_0x2f287d(0x25b)]),this['_skillLearnAnimationSprite'][_0x2f287d(0xc1)](),this[_0x2f287d(0x25b)]=_0x442655;}else{_0xafb02f=DataManager[_0x2f287d(0x1e4)](_0x243569);if(_0xafb02f>0x0)return _0x153d88=TextManager[_0x2f287d(0x1e5)],_0x153d88[_0x2f287d(0x2b8)](_0xafb02f,TextManager['jobPointsAbbr'],_0x2f287d(0x1f8)['format'](ImageManager['jobPointsIcon']),TextManager['jobPointsFull']);break;}}}return'';},Window_ActorCommand[_0x1d7d7f(0x175)][_0x1d7d7f(0x2cf)]=function(){return![];};function Window_SkillLearnIngredients(){const _0x2dd460=_0x1d7d7f;this[_0x2dd460(0x2b7)](...arguments);}function _0x93e0(_0x29a4ce,_0x8d9753){const _0x2cd524=_0x2cd5();return _0x93e0=function(_0x93e00a,_0x103b07){_0x93e00a=_0x93e00a-0x73;let _0x1661f9=_0x2cd524[_0x93e00a];return _0x1661f9;},_0x93e0(_0x29a4ce,_0x8d9753);}Window_SkillLearnIngredients['prototype']=Object[_0x1d7d7f(0x1f0)](Window_Base['prototype']),Window_SkillLearnIngredients['prototype'][_0x1d7d7f(0x307)]=Window_SkillLearnIngredients,Window_SkillLearnIngredients[_0x1d7d7f(0x175)][_0x1d7d7f(0x2b7)]=function(_0x990b35){const _0x340eb1=_0x1d7d7f;Window_Base['prototype']['initialize'][_0x340eb1(0x158)](this,_0x990b35);},Window_SkillLearnIngredients['prototype']['refresh']=function(){const _0x13aaf1=_0x1d7d7f;this[_0x13aaf1(0xff)][_0x13aaf1(0x19b)](),this['resetFontSettings'](),this['shouldDrawRequirements']()?this[_0x13aaf1(0xb6)]():this[_0x13aaf1(0x14c)]();},Window_SkillLearnIngredients[_0x1d7d7f(0x175)]['drawTextExCenterAlign']=function(_0x38149d,_0x222297,_0x4f9dd5,_0x5582da){const _0x4bd548=_0x1d7d7f,_0xfc51ea=this[_0x4bd548(0x2df)](_0x38149d)['width'],_0x324646=_0x222297+Math[_0x4bd548(0x7a)]((_0x5582da-_0xfc51ea)/0x2);this[_0x4bd548(0xa1)](_0x38149d,_0x324646,_0x4f9dd5);},Window_SkillLearnIngredients[_0x1d7d7f(0x175)][_0x1d7d7f(0x188)]=function(_0x26cd2a,_0x3db58a,_0x4cdbdf,_0x39653d){const _0x5f0ff6=_0x1d7d7f,_0x1a3ed=this['textSizeEx'](_0x26cd2a)[_0x5f0ff6(0xf0)],_0x54eab2=_0x3db58a+Math['round'](_0x39653d-_0x1a3ed);this['drawTextEx'](_0x26cd2a,_0x54eab2,_0x4cdbdf);},Window_SkillLearnIngredients['prototype'][_0x1d7d7f(0xfb)]=function(){const _0x35f4a0=_0x1d7d7f,_0x8ed94f=SceneManager[_0x35f4a0(0x14a)]['item'](),_0x37c946=SceneManager[_0x35f4a0(0x14a)][_0x35f4a0(0xcb)]();return _0x37c946&&!_0x37c946[_0x35f4a0(0x284)](_0x8ed94f);},Window_SkillLearnIngredients['prototype'][_0x1d7d7f(0xb6)]=function(){const _0x13628f=_0x1d7d7f,_0x119054=SceneManager[_0x13628f(0x14a)][_0x13628f(0x164)](),_0x1b6e5e=VisuMZ['SkillLearnSystem'][_0x13628f(0x205)],_0x3e2d02=_0x119054[_0x13628f(0x323)],_0x178369=SceneManager[_0x13628f(0x14a)]['user'](),_0x570ae3=this[_0x13628f(0x1d8)](),_0x489da2=TextManager[_0x13628f(0x8c)],_0x583197=TextManager[_0x13628f(0x13d)];let _0x5c8bfd=0x0,_0x4d1b02=0x0;const _0x58e36b=_0x13628f(0x1f8)[_0x13628f(0x2b8)](_0x119054['iconIndex']),_0x46b9a1=TextManager['skillLearnReqTitle'][_0x13628f(0x2b8)](_0x58e36b,_0x119054[_0x13628f(0x31a)]);this[_0x13628f(0x150)](_0x46b9a1,_0x5c8bfd,_0x4d1b02,this['innerWidth']),_0x4d1b02+=Math[_0x13628f(0x7a)](_0x570ae3*1.5);let _0x5cfc5a='';if(_0x3e2d02[_0x13628f(0x2fe)](_0x1b6e5e[_0x13628f(0x126)])){const _0x56faa2=Number(RegExp['$1']),_0x17f7a0=TextManager[_0x13628f(0xba)][_0x13628f(0x2b8)](_0x56faa2,TextManager[_0x13628f(0x88)],TextManager['levelA']),_0x456060=_0x178369[_0x13628f(0x88)]>=_0x56faa2?_0x489da2:_0x583197;_0x5cfc5a+=_0x456060[_0x13628f(0x2b8)](_0x17f7a0)+'\x0a';}if(_0x3e2d02[_0x13628f(0x2fe)](_0x1b6e5e[_0x13628f(0x251)])){const _0x566e06=String(RegExp['$1'])[_0x13628f(0x2b6)](',')['map'](_0x7f7122=>_0x7f7122[_0x13628f(0x279)]());;for(const _0x52876b of _0x566e06){let _0x1bb331=0x0;const _0x43083e=/^\d+$/[_0x13628f(0x262)](_0x52876b);_0x43083e?_0x1bb331=Number(_0x52876b):_0x1bb331=DataManager[_0x13628f(0xee)](_0x52876b);const _0x553ec7=$dataSkills[_0x1bb331];if(_0x553ec7){if('KPghp'===_0x13628f(0x1f4))this[_0x13628f(0x1a2)]();else{const _0x12db45=TextManager['skillLearnReqListSkill'][_0x13628f(0x2b8)](_0x13628f(0x1f8)['format'](_0x553ec7['iconIndex']),_0x553ec7[_0x13628f(0x31a)]),_0x59a82c=_0x178369[_0x13628f(0x2d9)](_0x1bb331)?_0x489da2:_0x583197;_0x5cfc5a+=_0x59a82c[_0x13628f(0x2b8)](_0x12db45)+'\x0a';}}}}if(_0x3e2d02[_0x13628f(0x2fe)](_0x1b6e5e[_0x13628f(0x8b)])){const _0x5b6811=String(RegExp['$1'])[_0x13628f(0x2b6)](',')[_0x13628f(0x2ae)](_0x76e516=>_0x76e516[_0x13628f(0x279)]());;for(const _0xe5f86 of _0x5b6811){if(_0x13628f(0x2e5)===_0x13628f(0x2e5)){let _0x24e17b=0x0;const _0x8e826e=/^\d+$/[_0x13628f(0x262)](_0xe5f86);_0x8e826e?_0x24e17b=Number(_0xe5f86):_0x24e17b=DataManager[_0x13628f(0xee)](_0xe5f86);const _0x4153e9=$dataSkills[_0x24e17b];if(_0x4153e9){if(_0x13628f(0x2fa)!==_0x13628f(0x2fa))_0x519b75('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x304dd1,_0x6ad0a7,_0x5b64a1)),_0x4cf828['exit']();else{const _0x1f97d5=TextManager['skillLearnReqListSkill'][_0x13628f(0x2b8)]('\x5cI[%1]'[_0x13628f(0x2b8)](_0x4153e9[_0x13628f(0xa7)]),_0x4153e9[_0x13628f(0x31a)]),_0x3ba4e7=_0x178369[_0x13628f(0x2d9)](_0x24e17b)?_0x489da2:_0x583197;_0x5cfc5a+=_0x3ba4e7['format'](_0x1f97d5)+'\x0a';}}}else this[_0x13628f(0xe5)](),this[_0x13628f(0x21c)](),this['finishSkillLearnAnimation'](),_0x3054b0[_0x13628f(0x19b)](),_0x2b99f3[_0x13628f(0x19b)]();}}if(_0x3e2d02['match'](_0x1b6e5e[_0x13628f(0x316)])){const _0x263a19=String(RegExp['$1'])[_0x13628f(0x2b6)](',')[_0x13628f(0x2ae)](_0x33c76f=>Number(_0x33c76f));for(const _0x1ccee4 of _0x263a19){const _0x51eb23=$dataSystem[_0x13628f(0xe6)][_0x1ccee4],_0x5f5251=$gameSwitches['value'](_0x1ccee4)?_0x489da2:_0x583197;_0x5cfc5a+=_0x5f5251[_0x13628f(0x2b8)](_0x51eb23)+'\x0a';}}if(_0x3e2d02['match'](_0x1b6e5e[_0x13628f(0xc0)])){if('oHtaA'!==_0x13628f(0x1ae)){const _0x42b9a7=String(RegExp['$1'])[_0x13628f(0x2b6)](',')[_0x13628f(0x2ae)](_0x113029=>Number(_0x113029));for(const _0x1275de of _0x42b9a7){const _0x585f45=$dataSystem[_0x13628f(0xe6)][_0x1275de],_0x54de10=$gameSwitches['value'](_0x1275de)?_0x489da2:_0x583197;_0x5cfc5a+=_0x54de10[_0x13628f(0x2b8)](_0x585f45)+'\x0a';}}else return _0x1670df(_0x52739e['$1']);}const _0x1723ff=VisuMZ[_0x13628f(0x1b2)][_0x13628f(0x1d2)](_0x119054,_0x13628f(0x30d));if(VisuMZ[_0x13628f(0x1b2)]['JS'][_0x1723ff]){const _0x47d32c=VisuMZ[_0x13628f(0x1b2)]['JS'][_0x1723ff]['call'](this,_0x178369,_0x119054);_0x5cfc5a+=_0x47d32c+'\x0a';}this[_0x13628f(0x150)](_0x5cfc5a,_0x5c8bfd,_0x4d1b02,this['innerWidth']);},Window_SkillLearnIngredients[_0x1d7d7f(0x175)][_0x1d7d7f(0x14c)]=function(){const _0x56b226=_0x1d7d7f,_0x4f3544=SceneManager[_0x56b226(0x14a)][_0x56b226(0x164)](),_0x195373=SceneManager['_scene']['user'](),_0x3a3948=this['getSkillLearnDisplayedCosts']();let _0x54d7d1=0x0,_0x329344=0x0;const _0x4bb4f9=this[_0x56b226(0x1d8)](),_0x106091=Math[_0x56b226(0x7a)](this[_0x56b226(0xfc)]/0x2),_0x4355f7=Math[_0x56b226(0x7a)](this['innerWidth']/0x4),_0x5d6cc2=0x0,_0x2a8461=_0x106091,_0xacc871=_0x106091+_0x4355f7,_0xa8b0fb=_0x56b226(0x1f8)[_0x56b226(0x2b8)](_0x4f3544[_0x56b226(0xa7)]),_0x3dce59=TextManager[_0x56b226(0x248)]['format'](_0xa8b0fb,_0x4f3544['name']);this[_0x56b226(0x150)](_0x3dce59,_0x54d7d1,_0x329344,this['innerWidth']),_0x329344+=_0x4bb4f9,this[_0x56b226(0x150)](TextManager['skillLearningName'],_0x5d6cc2,_0x329344,_0x106091),this[_0x56b226(0x150)](TextManager[_0x56b226(0x186)],_0x2a8461,_0x329344,_0x4355f7),this[_0x56b226(0x150)](TextManager[_0x56b226(0x2ba)],_0xacc871,_0x329344,_0x4355f7),_0x329344+=_0x4bb4f9;const _0x1d5ff8=_0x5d6cc2+this['itemPadding']();for(const _0x45cee5 of _0x3a3948){this[_0x56b226(0xbd)]();let _0x1c9e01='',_0x1cff6b=0x0,_0x16536a=0x0,_0x437b06='';switch(_0x45cee5[_0x56b226(0x167)]()[_0x56b226(0x279)]()){case'AP':_0x1cff6b=DataManager[_0x56b226(0x2d4)](_0x4f3544);if(_0x1cff6b<=0x0)continue;this[_0x56b226(0x20e)](_0x1cff6b,_0x2a8461,_0x329344,_0x4355f7,_0x56b226(0x20c)),_0x1c9e01=_0x56b226(0x23d)[_0x56b226(0x2b8)](ImageManager[_0x56b226(0x301)],TextManager[_0x56b226(0x125)]),this['drawTextEx'](_0x1c9e01,_0x1d5ff8,_0x329344),_0x16536a=_0x195373[_0x56b226(0x107)](),this['drawAbilityPoints'](_0x16536a,_0xacc871,_0x329344,_0x4355f7-this['itemPadding'](),_0x56b226(0x20c));break;case'SP':_0x1cff6b=DataManager[_0x56b226(0x1eb)](_0x4f3544);if(_0x1cff6b<=0x0)continue;this[_0x56b226(0x93)](_0x1cff6b,_0x2a8461,_0x329344,_0x4355f7,'right'),_0x1c9e01=_0x56b226(0x23d)['format'](ImageManager[_0x56b226(0x1e0)],TextManager[_0x56b226(0x2b0)]),this[_0x56b226(0xa1)](_0x1c9e01,_0x1d5ff8,_0x329344),_0x16536a=_0x195373[_0x56b226(0x1a6)](),this[_0x56b226(0x93)](_0x16536a,_0xacc871,_0x329344,_0x4355f7-this['itemPadding'](),_0x56b226(0x20c));break;case _0x56b226(0x2dd):_0x1cff6b=DataManager['getSkillLearnGoldCost'](_0x4f3544);if(_0x1cff6b<=0x0)continue;this[_0x56b226(0x30c)](_0x1cff6b,TextManager[_0x56b226(0x183)],_0x2a8461,_0x329344,_0x4355f7);const _0x5e6500=Imported[_0x56b226(0x32d)]?_0x56b226(0x1f8)['format'](VisuMZ[_0x56b226(0x17a)][_0x56b226(0x185)][_0x56b226(0x106)][_0x56b226(0xc6)]):TextManager[_0x56b226(0x183)];_0x1c9e01='%1%2'['format'](_0x5e6500,TextManager[_0x56b226(0x183)]),this[_0x56b226(0xa1)](_0x1c9e01,_0x1d5ff8,_0x329344),_0x16536a=$gameParty[_0x56b226(0x89)](),this['drawCurrencyValue'](_0x16536a,TextManager[_0x56b226(0x183)],_0xacc871,_0x329344,_0x4355f7-this[_0x56b226(0x86)]());break;case _0x56b226(0x17b):const _0x21a755=DataManager[_0x56b226(0x2a4)](_0x4f3544);if(_0x21a755['length']<=0x0)continue;for(const _0x15c4de of _0x21a755){if(!_0x15c4de)continue;const _0x3f6b4b=$dataItems[_0x15c4de['id']];_0x437b06=TextManager['skillLearnItemFmt'],this[_0x56b226(0x156)](_0x3f6b4b,_0x1d5ff8,_0x329344,_0x106091-_0x1d5ff8),_0x1c9e01=_0x437b06['format'](_0x15c4de[_0x56b226(0x18c)],'\x5cI[%1]'[_0x56b226(0x2b8)](_0x3f6b4b[_0x56b226(0xa7)]),_0x3f6b4b[_0x56b226(0x31a)]),this['drawTextExRightAlign'](_0x1c9e01,_0x2a8461,_0x329344,_0x4355f7),_0x1c9e01=_0x437b06[_0x56b226(0x2b8)]($gameParty[_0x56b226(0x147)](_0x3f6b4b),_0x56b226(0x1f8)['format'](_0x3f6b4b[_0x56b226(0xa7)]),_0x3f6b4b[_0x56b226(0x31a)]),this[_0x56b226(0x188)](_0x1c9e01,_0xacc871,_0x329344,_0x4355f7-this[_0x56b226(0x86)]()),_0x329344+=_0x4bb4f9;if(_0x329344+_0x4bb4f9>this['innerHeight'])return;}continue;break;case _0x56b226(0x157):const _0x1cd053=DataManager[_0x56b226(0x179)](_0x4f3544);if(_0x1cd053[_0x56b226(0x1c5)]<=0x0)continue;for(const _0x116d90 of _0x1cd053){if(_0x56b226(0x12a)!==_0x56b226(0xcc)){if(!_0x116d90)continue;const _0x3e66ca=$dataWeapons[_0x116d90['id']];_0x437b06=TextManager['skillLearnWeaponFmt'],this[_0x56b226(0x156)](_0x3e66ca,_0x1d5ff8,_0x329344,_0x106091-_0x1d5ff8),_0x1c9e01=_0x437b06[_0x56b226(0x2b8)](_0x116d90[_0x56b226(0x18c)],_0x56b226(0x1f8)['format'](_0x3e66ca[_0x56b226(0xa7)]),_0x3e66ca[_0x56b226(0x31a)]),this[_0x56b226(0x188)](_0x1c9e01,_0x2a8461,_0x329344,_0x4355f7),_0x1c9e01=_0x437b06[_0x56b226(0x2b8)]($gameParty[_0x56b226(0x147)](_0x3e66ca),_0x56b226(0x1f8)[_0x56b226(0x2b8)](_0x3e66ca[_0x56b226(0xa7)]),_0x3e66ca['name']),this[_0x56b226(0x188)](_0x1c9e01,_0xacc871,_0x329344,_0x4355f7-this[_0x56b226(0x86)]()),_0x329344+=_0x4bb4f9;if(_0x329344+_0x4bb4f9>this[_0x56b226(0x193)])return;}else return this[_0x56b226(0x2cf)]()?this['skillLearnIncludes'](_0x4a9cca):_0x149ca1[_0x56b226(0x1b2)][_0x56b226(0x148)][_0x56b226(0x158)](this,_0x4fa8bd);}continue;break;case _0x56b226(0x74):const _0x166b32=DataManager[_0x56b226(0x105)](_0x4f3544);if(_0x166b32[_0x56b226(0x1c5)]<=0x0)continue;for(const _0x2c1030 of _0x166b32){if(_0x56b226(0x11d)==='vIRUv'){const _0x33b989=_0x3c852d(_0x2acfca['$1'])[_0x56b226(0x2b6)](',')['map'](_0x438eea=>_0x5b366b(_0x438eea));for(const _0x234f33 of _0x33b989){const _0x13798c=_0x3862d9[_0x56b226(0xe6)][_0x234f33],_0x344d9e=_0xd3415a[_0x56b226(0x1b1)](_0x234f33)?_0x1817a1:_0x1fe6d6;_0x5efd73+=_0x344d9e[_0x56b226(0x2b8)](_0x13798c)+'\x0a';}}else{if(!_0x2c1030)continue;const _0xe85ed0=$dataArmors[_0x2c1030['id']];_0x437b06=TextManager[_0x56b226(0x15f)],this[_0x56b226(0x156)](_0xe85ed0,_0x1d5ff8,_0x329344,_0x106091-_0x1d5ff8),_0x1c9e01=_0x437b06[_0x56b226(0x2b8)](_0x2c1030[_0x56b226(0x18c)],_0x56b226(0x1f8)[_0x56b226(0x2b8)](_0xe85ed0[_0x56b226(0xa7)]),_0xe85ed0[_0x56b226(0x31a)]),this[_0x56b226(0x188)](_0x1c9e01,_0x2a8461,_0x329344,_0x4355f7),_0x1c9e01=_0x437b06[_0x56b226(0x2b8)]($gameParty[_0x56b226(0x147)](_0xe85ed0),_0x56b226(0x1f8)[_0x56b226(0x2b8)](_0xe85ed0[_0x56b226(0xa7)]),_0xe85ed0[_0x56b226(0x31a)]),this[_0x56b226(0x188)](_0x1c9e01,_0xacc871,_0x329344,_0x4355f7-this[_0x56b226(0x86)]()),_0x329344+=_0x4bb4f9;if(_0x329344+_0x4bb4f9>this[_0x56b226(0x193)])return;}}continue;break;case _0x56b226(0x249):const _0x2e08a0=VisuMZ[_0x56b226(0x1b2)][_0x56b226(0x1d2)](_0x4f3544,'jsLearnShowDetailTxt');if(VisuMZ[_0x56b226(0x1b2)]['JS'][_0x2e08a0]){if(_0x56b226(0x1f7)!==_0x56b226(0xe7))_0x1c9e01=VisuMZ[_0x56b226(0x1b2)]['JS'][_0x2e08a0]['call'](this,_0x195373,_0x4f3544),this[_0x56b226(0xa1)](_0x1c9e01,_0x1d5ff8,_0x329344);else return _0x2a026a(_0x5c716f['$1']);}else continue;break;case'CP':if(Imported[_0x56b226(0x1c0)]){_0x1cff6b=DataManager[_0x56b226(0xbb)](_0x4f3544)||0x0;if(_0x1cff6b<=0x0)continue;this[_0x56b226(0x159)](_0x1cff6b,_0x2a8461,_0x329344,_0x4355f7,'right'),_0x1c9e01=_0x56b226(0x23d)[_0x56b226(0x2b8)](ImageManager[_0x56b226(0xb4)],TextManager[_0x56b226(0xad)]),this[_0x56b226(0xa1)](_0x1c9e01,_0x1d5ff8,_0x329344),_0x16536a=_0x195373[_0x56b226(0x227)](),this[_0x56b226(0x159)](_0x16536a,_0xacc871,_0x329344,_0x4355f7-this[_0x56b226(0x86)](),'right');}else continue;break;case'JP':if(Imported['VisuMZ_2_ClassChangeSystem']){_0x1cff6b=DataManager[_0x56b226(0x1e4)](_0x4f3544)||0x0;if(_0x1cff6b<=0x0)continue;this[_0x56b226(0x293)](_0x1cff6b,_0x2a8461,_0x329344,_0x4355f7,_0x56b226(0x20c)),_0x1c9e01=_0x56b226(0x23d)['format'](ImageManager['jobPointsIcon'],TextManager[_0x56b226(0x1b4)]),this[_0x56b226(0xa1)](_0x1c9e01,_0x1d5ff8,_0x329344),_0x16536a=_0x195373[_0x56b226(0x160)](),this['drawJobPoints'](_0x16536a,_0xacc871,_0x329344,_0x4355f7-this[_0x56b226(0x86)](),_0x56b226(0x20c));}else{if(_0x56b226(0x15e)!==_0x56b226(0x32f))continue;else return![];}break;default:continue;}_0x329344+=_0x4bb4f9;if(_0x329344+_0x4bb4f9>this['innerHeight'])return;}},Window_SkillLearnIngredients[_0x1d7d7f(0x175)][_0x1d7d7f(0x278)]=function(){const _0x5afb5c=_0x1d7d7f,_0x1b1075=JsonEx[_0x5afb5c(0x255)](VisuMZ[_0x5afb5c(0x1b2)][_0x5afb5c(0x185)]['General'][_0x5afb5c(0xb3)]);return _0x1b1075['push'](_0x5afb5c(0x83)),_0x1b1075;},Window_SkillLearnIngredients[_0x1d7d7f(0x175)]['showVisualGoldDisplay']=function(){return![];};function Window_SkillLearnConfirm(){this['initialize'](...arguments);}Window_SkillLearnConfirm[_0x1d7d7f(0x175)]=Object[_0x1d7d7f(0x1f0)](Window_HorzCommand[_0x1d7d7f(0x175)]),Window_SkillLearnConfirm['prototype'][_0x1d7d7f(0x307)]=Window_SkillLearnConfirm,Window_SkillLearnConfirm[_0x1d7d7f(0x175)][_0x1d7d7f(0x2b7)]=function(_0x1323a4){const _0x5efb47=_0x1d7d7f;Window_HorzCommand[_0x5efb47(0x175)][_0x5efb47(0x2b7)]['call'](this,_0x1323a4);},Window_SkillLearnConfirm[_0x1d7d7f(0x175)][_0x1d7d7f(0x228)]=function(){return 0x2;},Window_SkillLearnConfirm[_0x1d7d7f(0x175)][_0x1d7d7f(0x1c2)]=function(){const _0x334531=_0x1d7d7f;return this[_0x334531(0x193)];},Window_SkillLearnConfirm[_0x1d7d7f(0x175)][_0x1d7d7f(0x10e)]=function(){const _0x2c9a07=_0x1d7d7f;this[_0x2c9a07(0x269)](TextManager['skillLearnConfirmCmd'],'ok',this['isConfirmEnabled']()),this[_0x2c9a07(0x269)](TextManager[_0x2c9a07(0x24f)],_0x2c9a07(0x2ea));},Window_SkillLearnConfirm[_0x1d7d7f(0x175)][_0x1d7d7f(0x1d5)]=function(){const _0x3de4bc=_0x1d7d7f,_0x4a7c9f=SceneManager[_0x3de4bc(0x14a)];if(!_0x4a7c9f)return![];const _0x294817=_0x4a7c9f[_0x3de4bc(0xcb)]();if(!_0x294817)return![];const _0x98f0ee=_0x4a7c9f[_0x3de4bc(0x164)]();if(!_0x98f0ee)return![];if(!_0x294817['meetRequirementsForSkillLearnSystem'](_0x98f0ee))return![];return _0x294817['canPayForSkillLearnSystem'](_0x98f0ee);},Window_SkillLearnConfirm[_0x1d7d7f(0x175)][_0x1d7d7f(0x297)]=function(_0x42b118){const _0x321a2e=_0x1d7d7f,_0x25ca48=this['itemLineRect'](_0x42b118);this[_0x321a2e(0x9e)](),this[_0x321a2e(0x76)](this[_0x321a2e(0x1a5)](_0x42b118));const _0x251a4b=this[_0x321a2e(0x12f)](_0x42b118),_0x546c45=this[_0x321a2e(0x2df)](_0x251a4b)['width'];_0x25ca48['x']+=Math['round']((_0x25ca48[_0x321a2e(0xf0)]-_0x546c45)/0x2),this[_0x321a2e(0xa1)](_0x251a4b,_0x25ca48['x'],_0x25ca48['y'],_0x546c45);},Window_SkillLearnConfirm['prototype']['playOkSound']=function(){const _0x56bb98=_0x1d7d7f;if(this[_0x56bb98(0x23a)]()==='ok'){}else Window_HorzCommand[_0x56bb98(0x175)][_0x56bb98(0x77)][_0x56bb98(0x158)](this);};function _0x2cd5(){const _0x1b95d5=['LgYrr','gainStartingAbilityPoints','SharedResource','min','TargetGainSkillPoints','members','UPSix','loseSkillPoints','MxBTr','PerEnemy','WeaponFmt','bzgxx','mEVEK','LauvS','isSkill','acidE','currentSymbol','_skillLearnAnimationWait','fhcFP','\x5cI[%1]%2','_stypeId','vxuZQ','skillLearnReqListSkill','ZPbyu','AqvHK','jsLearnShowDetailTxt','pxJay','etNNj','select','JSON','skillLearningTitle','CUSTOM','WwjVY','AbbrText','wgXpw','gainSkillPoints','skillPointsTotal','skillLearnCancelCmd','aNxQI','LearnReqSkillsAll','MAX_SAFE_INTEGER','UKyNC','addWindow','makeDeepCopy','ShowMenu','drawSkillLearnCost','loseJobPoints','RequirementTitle','bdjEe','_skillLearnAnimationSprite','drawActorSkillPoints','drawActorJobPoints','oAWJc','setup','AbilityPoints','SkillPointsGain','test','LearnSkillA','onSkillLearnConfirmCancel','Game_Actor_changeClass','rwoTc','addSkillPoints','hBLSg','addCommand','drawActorSimpleStatus','itemWindowRect','ParseAllNotetags','OWtVH','xdpKW','initSkillLearnSystemMenuAccess','BattleManager_makeRewards','loseClassPoints','faceWidth','Armor','displayRewardsSkillPoints','JsQPp','height','skillLearnAlreadyLearned','getSkillLearnDisplayedCosts','trim','ConfirmWindow_RectJS','canPayForSkillLearnSystem','skillLearnIcon','onSkillLearnItemOk','ARRAYSTRUCT','setAbilityPoints','MaxResource','createConditionJS','_statusWindow','isSkillLearnEnabled','meetRequirementsForSkillLearnSystem','processPayForSkillLearnSystem','skillLearnItemFmt','inBattle','onLoadBattleTestSkillLearnSystem','isAlive','cVqeK','reduce','4671308MlrLPJ','_abilityPoints','_classIDs','createSkillLearnCostText','drawSkillCost','xKCmE','RceWO','drawJobPoints','NBGoG','jXUyh','15032540tkRwpF','drawItem','cRiAh','LearnShowLevel','FullText','playSkillLearn','dicWZ','abilityPointsFmt','_skillIDs','liAPg','createVisibleJS','updateSkillLearnAnimation','ArmorFmt','skillLearnReqTitle','getSkillLearnItemCost','setHandler','Sound','IZFbu','LearnShowSkillsAny','isTriggered','gainRewardsAbilityPoints','Scene_Boot_onDatabaseLoaded','GJYQH','applySkillPoints','map','UserGainSkillPoints','skillPointsFull','pOfAx','YVwnk','xpsao','RpgOd','OYwal','split','initialize','format','gXuTQ','skillLearningOwned','loseGold','QcZZg','TJJOj','displayRewardsAbilityPoints','Game_Actor_setup','isMVAnimation','KsQBj','iconHeight','uHqRo','updateSkillLearnAnimationSprite','status','LEVEL','_skillLearnIngredientsWindow','PszAT','fcjaQ','isActor','30978QDAbMn','23514BKhqMn','JMjZi','Weapon-%1-%2','isSkillLearnMode','Game_System_initialize','msfFw','nPwZo','newPage','getSkillLearnAbilityPointCost','UsCSO','STRUCT','cgdbG','Icon','isLearnedSkill','ShowVictory','changeClass','znarB','GOLD','Classes','textSizeEx','TextFmt','RPdUa','SkillPointsSet','abilityPointsRate','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20','fRRWJ','setupBattleTestMembersSkillLearnSystem','getSkillLearnSkillsFromClass','PtDRC','removeChild','cancel','SeparationFmt','_skillLearnAnimationIDs','_earnedAbilityPoints','isPlaying','skillLearnReqSwitchFmt','FUNC','ctBmT','IconSet','gkCpC','parse','PGipf','CsVTj','DuetB','PerAction','text','FtIVZ','rJVRE','Window_SkillList_makeItemList','gainSkillPointsForMulticlasses','match','12IYmdEf','allMembers','abilityPointsIcon','learnSkill','createSkillLearnAnimation','UPaXJ','bMBAh','floor','constructor','skillLearnConfirmCmd','StartClassSkillPoints','includes','STR','drawCurrencyValue','jsLearnReqDetailTxt','_skillLearnConfirmWindow','aTSIi','snBVB','243RQttpa','zYzMh','NfqFT','Window_SkillList_setStypeId','Armor-%1-%2','LearnReqSwitchesAll','vUXjd','YGmJi','Points','name','ConfirmCmd','VUINu','_skillLearnIconSprite','Learned','createSkillLearnConfirmWindow','hide','Animation','ReqNotMetFmt','note','SJkzp','skillLearnConfirmWindow','levelUp','initAbilityPoints','TnyCC','Game_Action_applyItemUserEffect','Actors','IngredientName','_itemWindow','VisuMZ_0_CoreEngine','setFrame','zhKLk','applyItemSkillLearnSystemUserEffect','dgXpX','LLsMv','traitObjects','ARMOR','_skillLearnSystem_drawItemMode','changePaintOpacity','playOkSound','LearnSpCost','xEBDI','round','skillPointsAbbr','jsLearnShowListTxt','skillLearningName','hGJNZ','loadPicture','Window_SkillList_maxCols','abilityPointsAbbr','skillLearnReqSkillFmt','Custom','classPointsFmt','lKWtn','itemPadding','skillLearn','level','gold','levelUpGainAbilityPoints','LearnReqSkillsAny','skillLearnReqMet','skill','refreshSkillLearnSystem','Window','skillLearnCmd','ReqLevelFmt','Fgjjs','drawSkillPoints','eHHxR','levelUpGainSkillPoints','Game_Party_setupBattleTestMembers','isFinishedSkillLearnAnimating','drawActorClassPoints','indexOf','RzzPF','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Visible\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','mYdmM','visible','resetTextColor','show','_skillLearnAnimationPlaying','drawTextEx','OkmBv','gOoYl','gainMulticlassRewardPoints','Scene_Skill_create','wFFow','iconIndex','applyItemUserEffect','naBKb','RSqoO','skillPointsVisible','bWNca','classPointsFull','gainStartingSkillPoints','_rewards','mybBC','makeItemList','filter','DisplayedCosts','classPointsIcon','getClassIdWithName','drawRequirements','opacity','setBackgroundType','applySkillLearnSystemUserEffect','skillLearnReqListLevel','getSkillLearnClassPointCost','replace','resetFontSettings','skillLearnIncludes','xqUyi','LearnReqSwitchesAny','destroy','makeRewardsSkillPoints','_learnPicture','LearnArmorCost','LearnCostBatch','GoldIcon','Window_SkillList_drawItem','ceil','NeAUQ','skillLearnReqLevelFmt','user','UNymM','HRFid','push','getItemIdWithName','left','initSkillPoints','commandStyle','actor','currentClass','JhspP','vSKUo','playStaticSe','luXtt','description','eAVac','ShowAnimations','JNdju','WEetc','ClassChangeSystem','AGVrd','OZNoX','leBmO','skillLearnReqSeparatorFmt','bind','createCostJS','destroySkillLearnAnimationSprite','switches','nttNK','LearnApCost','addSkillLearnSystemCommand','_earnedSkillPoints','DetailWindow_RectJS','JIkFe','lDuUB','getSkillIdWithName','drawActorAbilityPoints','width','KZSBB','vvgcp','Scene_Skill_onItemOk','MtnCJ','_windowLayer','7BkJSRQ','Window_SkillStatus_refresh','HWNvX','uaNCC','CancelCmd','shouldDrawRequirements','innerWidth','Game_Actor_learnSkill','DefaultCost','contents','ARRAYNUM','DetailWindow_BgType','LDYrK','ConvertParams','xSpzu','getSkillLearnArmorCost','Gold','getAbilityPoints','oubtZ','QPYKC','abilityPointsTotal','skillLearnIngredientsWindowRect','frames','_SkillLearnSystem_preventLevelUpGain','makeCommandList','132923hiNzvx','isBattleMember','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20cost\x20=\x200;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Cost\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20cost;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','aYwbo','FadeSpeed','SKILLS','Scene_Skill_update','learnPicture','IHUId','jsOnLearn','fwLVu','createTextJS','oslEJ','onDatabaseLoaded','LppuY','puuGy','LearnCpCost','setSkillLearnSkillSpriteBitmap','sort','_itemIDs','onItemOk','CcaFR','abilityPointsFull','LearnReqLevel','remove','SkillPointsRate','setSkillLearnSkillSpriteOpacity','fwryi','getSkillLearnRequirementText','LzMcO','_skillLearnIconSpriteOpacitySpeed','ARRAYEVAL','commandName','jsLearnSpCost','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20text\x20=\x20\x27\x27;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Text\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20text;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','drawSkillLearnRequirements','xgNNv','LearnItemCost','pkEjt','RArYK','7335312KuVRek','isSkillLearnSystemMenuAccess','center','FkkSL','subject','ihaaL','skillLearnReqNotMet','bitmap','colSpacing','VisuMZ_1_SkillsStatesCore','VictoryText','Actor-%1-%2','SkillPoints','_skillLearnBitmapSprite','aObKH','finishSkillLearnAnimation','numItems','Window_SkillList_includes','createSkillLearnIngredientsWindow','_scene','_data','drawIngredients','HlpPS','opacitySpeed','createSkillLearnSkillSprite','drawTextExCenterAlign','process_VisuMZ_SkillLearnSystem_JS','setSkillLearnSkillSpritePosition','isEnabled','ARRAYJSON','refresh','drawItemName','WEAPON','call','drawClassPoints','TCPXD','levelA','anchor','StartClassAbilityPoints','tuLwW','skillLearnArmorFmt','getJobPoints','Window_SkillList_isEnabled','createSkillLearnAnimationIDs','gzyRz','item','VRRCW','JQYuw','toUpperCase','jnvQy','bigPicture','ShowWindows','_actor','setSkillLearnSkillSpriteFrame','abilityPoints','SWITCHES','UcRTg','bXkDb','LhzpV','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Condition\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','yjdXu','AbilityPointsRate','prototype','Enemy-%1-%2','skillPointsRate','Skill','getSkillLearnWeaponCost','CoreEngine','ITEM','Game_Actor_levelUp','isReleased','createActionJS','AbilityPointsLose','jsLearnReq','addAbilityPoints','max','currencyUnit','_weaponIDs','Settings','skillLearningCost','LearningTitle','drawTextExRightAlign','getArmorIdWithName','Window_SkillList_drawSkillCost','cdiBk','quantity','setStypeId','jsLearnCpCost','onBattleStart','Scale','clamp','setSkillPoints','innerHeight','add','displayRewards','BattleManager_displayRewards','skillLearnSeparationFmt','HCCmr','gLllg','ReqMetFmt','clear','MNApA','LearnWeaponCost','QrrJL','skillLearnSystemCommandName','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','aBcOI','startSkillLearnAnimation','StatusWindowDrawJS','classPointsAbbr','isCommandEnabled','getSkillPoints','UnqCy','WnSDB','exit','getWeaponIdWithName','rBTAY','Ability','2181785IigsoM','drQmQ','loseAbilityPoints','AbilityPointsAdd','value','SkillLearnSystem','skillTypes','jobPointsFull','setupBattleTestMembers','iREqQ','NdMQB','process_VisuMZ_SkillLearnSystem_Notetags','ReqSwitchFmt','skillLearnWeaponFmt','getSkillLearnCostText','ParseSkillNotetags','STeyl','Window_SkillType_makeCommandList','iCcVX','VisuMZ_2_ClassChangeSystem','return\x200','itemHeight','createSkillLearnSystemWindows','LlxVk','length','IngredientCost','LearnShowSkillsAll','applyAbilityPoints','animationIDs','uGjGy','makeRewardsAbilityPoints','DwgBD','Skill-%1-%2','LearnSkillB','kLAgO','AbilityPointsGain','rQugu','createKeyJS','Item-%1-%2','skillPoints','isConfirmEnabled','makeSkillLearnList','OBRLd','lineHeight','Parse_Notetags_CreateJS','Animations','scale','loseItem','getSkillLearnGoldCost','log','cyBkB','skillPointsIcon','gainAbilityPoints','PerLevelUp','XrtBz','getSkillLearnJobPointCost','jobPointsFmt','EnemyAbilityPoints','rMMKN','earnedAbilityPoints','TRZkn','jsLearnApCost','getSkillLearnSkillPointCost','GoldFmt','UserGainAbilityPoints','MenuAccess','IngredientOwned','create','PGuDR','SkillPointsLose','enemy','FWCRH','updateSkillLearnSpriteOpacity','skillLearnReqHeaderFmt','nvzJe','\x5cI[%1]','shift','AfTQK','JobPoints','jsLearnShow','TtLqL','dySxX','ReqSkillFmt','Item','vEJvb','Jbjxl','skillPointsFmt','optExtraExp','RegExp','gainRewardsSkillPoints','SESZO','drawActorFace','TargetGainAbilityPoints','concat','COQEs','right','_armorIDs','drawAbilityPoints','bSuGM','addChild','skillLearnGoldFmt','wfyrc','abilityPointsVisible','setSkillLearnSystemMenuAccess','jsLearnReqListTxt','shouldDrawSkillLearnRequirements','jsLearnJpCost','_SkillLearnSystem_MenuAccess','YeRBO','hNGQe','gainAbilityPointsForMulticlasses','destroySkillLearnSprite','isPlaytest','Game_Battler_onBattleStart','activate','_skillPoints','calcWindowHeight','zQTXB','registerCommand','fegLZ','AhecV','General','getClassPoints','maxCols','deadMembers'];_0x2cd5=function(){return _0x1b95d5;};return _0x2cd5();}