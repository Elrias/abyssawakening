//=============================================================================
// VisuStella MZ - Lighting Effects
// VisuMZ_2_LightingEffects.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_LightingEffects = true;

var VisuMZ = VisuMZ || {};
VisuMZ.LightingEffects = VisuMZ.LightingEffects || {};
VisuMZ.LightingEffects.version = 1.10;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.10] [LightingEffects]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Lighting_Effects_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_EventsMoveCore
 * @orderAfter VisuMZ_1_EventsMoveCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ lacks the ability to provide lighting by default. During scenes
 * where it is night, the usage of tones is not adequate either since there is
 * no way to illuminate the darkness. This plugin remedies that problem by
 * providing lighting effects that pierce the darkness. From radial lights to
 * conical lights and applying various lighting behaviors, this plugin covers
 * the general lighting needs that RPG Maker MZ does not.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Auto-Tints allow for maps to automatically load up a specific screen tint
 *   upon player entry. Screen tints can be custom or based off presets.
 * * Apply darkness overlays to maps using custom colors or presets. Change
 *   them midway through the game using Plugin Commands.
 * * Radial lights can be added to pierce the darkness overlays. They will
 *   light up nearby surroundings in a circular area.
 * * Conical lights can be used to portray light in a cone-like direction and
 *   simulate the light coming from flashlights.
 * * Adjust the offset settings for conical lights, such at the source of the
 *   light will come from an actor or event's hand positions rather than their
 *   chest or face.
 * * Adjusted conical light offsets can vary for different actors and/or events
 *   in case they have different body structures. Change these settings through
 *   notetags, Plugin Commands, or Plugin Parameters.
 * * Apply radial and conical lights to vehicles. They can have different
 *   settings applied when they're inactive or being driven. These settings can
 *   be adjusted separately via Plugin Parameters or Plugin Commands!
 * * Assign lights via a variety of ways such as easy to use notetags, page-
 *   specific comment tags, and Plugin Commands!
 * * Use either images or have the plugin generate them ingame using various
 *   notetags, Plugin Parameters, or Plugin Commands!
 * * Apply optional light behaviors to lights such as blinking, flickering,
 *   flashing, flares, and more!
 * * Use patterns for light fluctuation behaviors instead of randoms.
 * * Spawn lights unattached to the player character, followers, or events.
 *   These spawned lights can have unique trajectories akin to what would be
 *   seen at a light show.
 * * The darkness overlay also appears in battle. Actors and enemies will have
 *   their own individual radial light settings that they can use specifically
 *   for the battle-scene only. There will be no conical lights for battle.
 * * Options added in the Options menu to allow players to turn on/off any
 *   unwanted light behaviors that may bother them. Examples include blinking
 *   lights, flickering lights, flashing, flares, etc.
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
 * * VisuMZ_1_EventsMoveCore
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
 * Instructions - Quick Start
 * ============================================================================
 * 
 * Here are some instructions to get yourself started quickly on using the
 * Lighting Effects plugin.
 * 
 * ---
 * 
 * Step 1: Create a map with a darkness overlay.
 * 
 * 1. Create a new map (or use an old one if you know what you're doing).
 * 2. Right click the map's name in the editor and go to the Map's Properties.
 * 3. Add the <Overlay: Night> notetag into the map's notebox.
 * 4. For more information on the types of settings you can pick, look in the
 *    help file.
 * 
 * *NOTE* Keep in mind that whenever you enter this map, the darkness overlay
 * will shift to "Night". If you don't want this to happen and want to shift it
 * dynamically, use the Plugin Command "OVERLAY: Change to Preset Color" or
 * "OVERLAY: Change to Custom Color" to change them instead.
 * 
 * ---
 * 
 * Step 2: Create an event with a radial light.
 * 
 * 1. Create a new event on the map.
 * 2. Add a "Comment" event to the event (you can use the notebox, too, but
 *    it's tiny, and the comment box is more visible).
 * 3. Inside the comment (or notebox), add in the following tags:
 * 
 *    <Radial Light Color: Light Yellow>
 *    <Radial Light Radius: 100>
 *    <Radial Light Intensity: 25%>
 *    <Radial Light Opacity: 50%>
 * 
 * 4. You can leave any of them out, but these four are selected as the main
 *    notetags to use to adjust how radial lights behave.
 * 5. For more information on the types of settings you can apply to radial
 *    lights, look in the help file.
 * 6. Let's see how this looks in-game!
 * 7. Save the game project.
 * 8. Let's test it out!
 * 
 * ---
 * 
 * Step 3: Play Test! Checking out the Radial Light!
 * 
 * 1. You should notice that the screen is darker than normal with the "Night"
 *    color as the darkness overlay.
 * 2. Find the event you've made. It should be emitting a light.
 * 3. The player, by default, assuming that no other Plugin Parameters have
 *    been changed, should also be emitting a faint light and has a conical
 *    light on, too.
 * 4. Everything working? Awesome, let's create an event with a conical light
 *    this time.
 * 
 * ---
 * 
 * Step 4: Create an event with a conical light.
 * 
 * 1. Create another new event on the map.
 * 2. Add a "Comment" event to the event (once again, you can use the notebox,
 *    too if you want but we prefer the larger comment box).
 * 3. Inside the comment (or notebox), add in the following tags:
 * 
 *    <Conical Light Color: Light Yellow>
 *    <Conical Light Radius: 300>
 *    <Conical Light Source Radius: 40>
 *    <Conical Light Intensity: 25%>
 *    <Conical Light Opacity: 80%>
 * 
 * 4. You can leave any of the above out, but these are the usual suspects when
 *    applying a conical light to an event.
 * 5. The "Source Radius" notetag refers to the light source point from which
 *    the conical light extends out of.
 * 6. For more information on the types of settings you can apply to radial
 *    lights, look in the help file.
 * 7. Let's see how this looks in-game!
 * 8. Save the game project.
 * 9. Let's test it out!
 * 
 * ---
 * 
 * Step 5: Play Test! Checking out the Conical Light!
 * 
 * 1. Look for the new event you've made. It should be holding a conical light,
 *    similar to your player.
 * 2. Conical lights will face whatever direction its user is facing.
 * 3. By default, the source point should be coming from the user's hand.
 * 4. This can be changed via notetags, Plugin Parameters, or Plugin Commands.
 * 5. Look in the help file for more information.
 * 6. The lights look kinda boring the way they are though. Let's give them
 *    some typical light behaviors.
 * 
 * ---
 * 
 * Step 6: Applying Behaviors
 * 
 * 1. Open your first event with the radial light and add these tags:
 * 
 *    <Radial Light Blink Rate: 3%>
 *    <Radial Light Pulse Rate: 20%>
 * 
 * 2. This will cause the radial light tied to this event to change slightly
 *    while waiting. This imitates how certain light bulbs work although there
 *    are other patterns you can use.
 * 3. Look in the help file for more behavior notetags you can use.
 * 4. Let's modify the conical light event and add these tags:
 * 
 *    <Conical Light Flicker Rate: 2%>
 *    <Conical Light Glow Rate: 10%>
 * 
 * 5. This will cause the conical light tied to this event to also change ever
 *    so slightly while waiting. Like with the other, this also imitates how
 *    flash bulbs work although there are other pattners you can use.
 * 6. Check the help file out for more behavior types to use with these lights.
 * 7. Let's see how this looks in-game!
 * 8. Save the game project.
 * 9. Let's test it out!
 * 
 * ---
 * 
 * Step 7: Play Test! Checking out Light Behaviors!
 * 
 * 1. Find the two events you've altered.
 * 2. You'll notice that the lights don't stay static the way they are. One
 *    will pulse back and forth while the other will have its opacity oscillate
 *    down and back up.
 * 3. Lighting behaviors make the atmosphere less boring even if nothing is
 *    happening on screen.
 * 4. These behaviors extend to blinking, flickering, flashing, flares, glows,
 *    pulses, and even custom patterns.
 * 5. For more information, check out the help file.
 * 
 * ---
 * 
 * And with that, you should have a better grasp on a few of the things the
 * Lighting Effects plugin is capable of.
 * 
 * ---
 *
 * ============================================================================
 * Keeping FPS Stable
 * ============================================================================
 * 
 * As this is a plugin that adds special effects to your game, you do have to
 * be mindful about how you use the various Lighting Effects features or else
 * your game will face FPS drops.
 *
 * ---
 * 
 * Here are a few things to keep in mind:
 * 
 * 1. Lighting Effects work best on small to medium sized maps. Anything below
 *    72x72 tiles in size is ideal. This also puts less stress on RPG Maker MZ
 *    even if you aren't using Lighting Effects for that map as there are less
 *    tiles to process in regards to the tilemap shader.
 * 
 * 2. Don't go overboard with Lighting Effect events. The more events there are
 *    for lighting effects, the more the player's GPU will act up. Keep the
 *    event count low and there will be less FPS drops. Anything below 80
 *    events is ideal. However, performances may vary on different computers.
 *    This is also a good practice to keep in mind for maps that aren't using
 *    Lighting Effects either.
 * 
 * 3. Keep spawned lights to a minimum. Generally speaking, anything under 128
 *    spawned lights on a map at a time is a good metric to keep in mind.
 *    However, performances may vary on different computers.
 * 
 * ---
 * 
 * We are NOT responsible for irresponsible usage of this plugin that pushes
 * graphical processing to their absolute limitations.
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
 * Without the VisuStella MZ Battle Core installed in the same project, there
 * will be no darkness overlay in battle and as such, no lighting effects. The
 * Battle Core provides the needed architecture for lighting effects to go
 * through properly.
 * 
 * ---
 * 
 * VisuMZ_2_WeatherEffects
 * 
 * Weather patterns placed on the lower layer will be affected by the darkness
 * overlay that the VisuStella MZ Lighting Effects plugin utilizes. This means
 * that even the supposively "brighter" weather patterns will be dimmed out
 * (such as the Flame Wall or Aurora to name a few). To deal with this, use the
 * Lighting Effects plugin's "Auto-Light Regions" and mark the parallax visible
 * tiles with those said regions.
 * 
 * Weather patterns placed on the upper layer will not be affected by the
 * darkness overlay in order to allow the weather have better contrast in
 * addition to following RPG Maker MZ's decision to not have weather affected
 * by tints either. If you want to tint the upper layer weather, you can add
 * the tint manually through the weather pattern's custom Image Settings and
 * apply a hue.
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
 * === Auto-Tint-Related Notetags ===
 * 
 * ---
 *
 * <Auto-Tint: Normal>
 * <Auto-Tint: Dark>
 * <Auto-Tint: Sepia>
 * <Auto-Tint: Sunset>
 * <Auto-Tint: Night>
 *
 * - Used for: Map Notetags
 * - Automatically tints the screen upon map entry with a preset tone.
 * - Screen tint preset values are based on RPG Maker MZ's default presets.
 * - Keep in minds that lights do not pierce through tones.
 *
 * ---
 *
 * <Auto-Tint: r, g, b, k>
 *
 * - Used for: Map Notetags
 * - Automatically tints the screen upon map entry with a custom tone.
 * - Replace 'r' with a number representing the red tone value (-255 to 255).
 * - Replace 'g' with a number representing the green tone value (-255 to 255).
 * - Replace 'b' with a number representing the blue tone value (-255 to 255).
 * - Replace 'k' with a number representing the grey tone value (0 to 255).
 * - Values that exceed -255 or 255 will be automatically timmed down.
 * - Grey values that are negative will have their absolute value taken of.
 * - Keep in minds that lights do not pierce through tones.
 *
 * ---
 * 
 * === Darkness Overlay-Related Notetags ===
 * 
 * ---
 * 
 * <Overlay: name>
 * 
 * - Used for: Map Notetags
 * - Applies a darkness overlay to the map that lights can penetrate through.
 * - Replace 'name' with any of the following preset names:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Some of the above presets automatically adjust opacity levels to certain
 *   values. Otherwise, they will be at 255.
 * 
 * ---
 * 
 * <Overlay Color: #rrggbb>
 * 
 * - Used for: Map Notetags
 * - Applies a darkness overlay using a custom color.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - These settings do not adjust opacity levels.
 * 
 * ---
 * 
 * <Overlay Opacity: x>
 * 
 * - Used for: Map Notetags
 * - Adjusts the darkness overlay's opacity level.
 * - Replace 'x' with a number value from 0 to 255, where 0 is transparent
 *   and 255 is opaque.
 * 
 * ---
 * 
 * <Overlay Opacity: x%>
 * 
 * - Used for: Map Notetags
 * - Adjusts the darkness overlay's opacity level by rate.
 * - Replace 'x' with a number value from 0 to 100, where 0% is transparent
 *   and 100% is opaque.
 * 
 * ---
 * 
 * <No Overlay>
 * 
 * - Used for: Map Notetags
 * - For the maps where you don't want there to be any overlay, but you don't
 *   want this to affect the other maps using them.
 * 
 * ---
 * 
 * === Anti-Light-Related Notetags ===
 * 
 * ---
 * 
 * <Hard Anti-Light Region: x>
 * <Hard Anti-Light Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these regions won't have any light shown on them.
 *   - This will use hard edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the region marked tiles.
 * - Replace 'x' with a number representing the region ID to function as an
 *   anti-light tile marker.
 *   - You cannot use region 0. Use a number from 1 to 255 instead.
 * 
 * ---
 * 
 * <Hard Anti-Light Terrain Tag: x>
 * <Hard Anti-Light Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these terrain tags won't have any light shown on them.
 *   - This will use hard edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the terrain tag marked tiles.
 * - Replace 'x' with a number representing the terrain tag to function as an
 *   anti-light tile marker.
 *   - You cannot use terrain tag 0. Use a number from 1 to 7 instead.
 * 
 * ---
 * 
 * <Soft Anti-Light Region: x>
 * <Soft Anti-Light Regions: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these regions won't have any light shown on them.
 *   - This will use soft edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the region marked tiles.
 * - Replace 'x' with a number representing the region ID to function as an
 *   anti-light tile marker.
 *   - You cannot use region 0. Use a number from 1 to 255 instead.
 * 
 * ---
 * 
 * <Soft Anti-Light Terrain Tag: x>
 * <Soft Anti-Light Terrain Tags: x, x, x>
 * 
 * - Used for: Map Notetags
 * - Tiles marked by these terrain tags won't have any light shown on them.
 *   - This will use soft edges.
 *   - This will override the settings found in the Plugin Parameters.
 *   - If this notetag is not used, use the settings in the Plugin Parameters
 *     instead for the map.
 *   - This does NOT work with looping maps.
 * - This does NOT block light from going to the other side. If the light
 *   radius is large enough, it will pierce through to the other side. It just
 *   won't be visible on the terrain tag marked tiles.
 * - Replace 'x' with a number representing the terrain tag to function as an
 *   anti-light tile marker.
 *   - You cannot use terrain tag 0. Use a number from 1 to 7 instead.
 * 
 * ---
 * 
 * === Radial Light General-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Radial Light>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Quick and simple setup to add radial lights to this event.
 * - Using this notetag will enable radial lights for this event.
 * - This will use the default settings found in the Plugin Parameters for
 *   Event Radial Lights.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <No Radial Light>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Disables radial lights for this event.
 * - Primarily used if the default settings for Event Radial Lights would have
 *   the radial light enabled.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Filename: filename>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses an image instead of generated radial lights.
 *   - Using this notetag will lock out the usage of generated radial light
 *     notetags found below.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Image will be centered on the target where the center of the image is the
 *   anchor point and will be rotated.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Color: name>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Creates a generated radial light using a preset color.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'name' with any of the following:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Color: #rrggbb>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Creates a generated radial light using a custom color.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Radius: r>
 * <Radial Light Diameter: d>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the radius/diameter of the generated radial light.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   radial light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   radial light.
 * - Use one or the other.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 *   - If this notetag is used, this will disable the "Auto-Calc Radius" Plugin
 *     Parameter for this specific actor/enemy.
 * 
 * ---
 * 
 * <Radial Light Intensity: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the light intensity of the generated radial light.
 *   - This notetag cannot be used with <Radial Light Filename: filename>.
 *   - Intensity determines how much of the light's luminosity extends outwards
 *     at full strength between fading away.
 * - Replace 'x' with a number between 0 and 100 representing the intensity
 *   percentage for the generated radial light.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Angle: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the initial angle of the generated radial light.
 *   - Can be used with both image and generated radial lights.
 *   - Best used with the <Radial Light Filename: filename> notetag in order to
 *     see any changes.
 * - Replace 'x' with a number between 0 and 360 representing the angle.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Rotate Speed: +x>
 * <Radial Light Rotate Speed: -x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines the speed at which the radial light rotates.
 *   - Can be used with both image and generated radial lights.
 *   - Best used with the <Radial Light Filename: filename> notetag in order to
 *     see any changes.
 * - Replace 'x' with a number representing how slow (smaller numbers) or fast
 *   (larger numbers) the light rotates.
 *   - Use negative numbers for a reverser rotation going counter-clockwise.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Blend Mode: Normal>
 * <Radial Light Blend Mode: Additive>
 * <Radial Light Blend Mode: Multiply>
 * <Radial Light Blend Mode: Screen>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Changes the blend mode of the radial light.
 *   - Can be used with both image and generated radial lights.
 *   - We recommend that you use 'screen'.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Opacity: x>
 * <Radial Light Opacity: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Changes the opacity level of the radial light.
 *   - Can be used with both image and generated radial lights.
 *   - The opacity of a light determines how bright (larger numbers) or dim
 *     (smaller numbers) it is.
 * - Replace 'x' with a number between 0 and 255 to determine how dim (smaller
 *   numbers) or bright (larger numbers) the light is.
 * - Replace 'x%' with a percentage between 0% and 100% to determine how
 *   dim (smaller numbers) or bright (larger numbers) the light is.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Offset: +x, +y>
 * <Radial Light Offset: -x, -y>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Offsets the position of the radial light, which is normally centered on
 *   the sprite it is coming from.
 *   - Can be used with both image and generated radial lights.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the radial light's x and y coordinates by.
 * - Using this notetag will enable radial lights for this event.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * === Radial Light Behavior-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Radial Light Blink Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will blink.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Blink Modifier: +x%>
 * <Radial Light Blink Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a static multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static multiplier increase.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flicker Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flicker.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flicker Modifier: +x%>
 * <Radial Light Flicker Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a randomized multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flash Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flash.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * - Must be used with a lower opacity setting.
 *   - Use with <Radial Light Opacity: x%> notetag.
 *   - If <Radial Light Opacity: x%> is not used, default to 50%.
 * 
 * ---
 * 
 * <Radial Light Flash Modifier: +x%>
 * <Radial Light Flash Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a static additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static additional change.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Flare Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the frequency at which the radial light will flare.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * - Must be used with a lower opacity setting.
 *   - Use with <Radial Light Opacity: x%> notetag.
 *   - If <Radial Light Opacity: x%> is not used, default to 50%.
 * 
 * ---
 * 
 * <Radial Light Flare Modifier: +x%>
 * <Radial Light Flare Modifier: -x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts a randomized additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flaring up.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts how much the radial light will oscillate its brightness back and
 *   forth in a glow-like fashion.
 * - Replace 'x' with a percentage representing the change in brightness.
 *   - Lower numbers mean less fluctuation.
 *   - Higher numbers mean more fluctuation.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Speed: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the speed at which the glow oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Glow Random>
 * <Radial Light Glow No Random>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adds a random seed (or not) to the glow oscillation. This can be used to
 *   put multiple lights glowing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Rate: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts how much the radial light will oscillate its radius back and
 *   forth in a pulse-like fashion.
 * - Replace 'x' with a percentage representing the change in size.
 *   - Lower numbers mean less shrinking.
 *   - Higher numbers mean more shrinking.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Speed: x%>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adjusts the speed at which the pulse oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pulse Random>
 * <Radial Light Pulse No Random>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Adds a random seed (or not) to the pulse oscillation. This can be used to
 *   put multiple lights pulsing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Pattern Type: name>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses a premade pattern by this plugin. The pattern will change the
 *   brightness of the light in a sequenced pattern.
 * - Replace 'name' with any of the following text:
 *   - none, normal
 *   - fluorescent, halogen, incandescent
 *   - candle, torch, campfire
 *   - fast strobe, slow strobe
 *   - strong pulse, medium pulse, slow pulse
 *   - underwater
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * <Radial Light Custom Pattern: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Uses a custom pattern determined by you, the game dev, on how the light's
 *   brightness will change over time.
 * - Replace 'x' with letters of the alphabet from 'a' to 'z'.
 *   - 'a' is completely transparent.
 *   - 'm' is midway in brightness.
 *   - 'z' is the brightest the light can be.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * - Examples:
 *   - <Radial Light Custom Pattern: mmmmmaaaaammmmmaaaaaabcdefgabcdefg>
 *   - <Radial Light Custom Pattern: nmonqnmomnmomomno>
 *   - <Radial Light Custom Pattern: abcdefghijklmnopqrrqponmlkjihgfedcba>
 * 
 * ---
 * 
 * <Radial Light Pattern Delay: x>
 * 
 * - Used for: Actor, Enemy, Event Notetags, and Event Page Comment Tags
 * - Determines how many frames to wait before going to the next part of the
 *   preset pattern and/or custom pattern.
 * - Replace 'x' with a number representing the frames the radial light needs
 *   to wait before moving forward in the pattern.
 *   - Lower numbers mean faster (minimum: 1).
 *   - Higher numbers mean slower.
 * - When used for actors and/or enemies, the effects will occur in battle.
 *   - Actor effects are NOT applied to the map.
 *   - When on the map, the radial light settings used will be dependent on
 *     the player and follower radial light settings instead of the individual
 *     actor radial light settings.
 * 
 * ---
 * 
 * === Conical Light General-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Conical Light>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Quick and simple setup to add conical lights to this event.
 * - Using this notetag will enable conical lights for this event.
 * - This will use the default settings found in the Plugin Parameters for
 *   Event Conical Lights.
 * 
 * ---
 * 
 * <No Conical Light>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Disables conical lights for this event.
 * - Primarily used if the default settings for Event Conical Lights would have
 *   the conical light enabled.
 * 
 * ---
 * 
 * <Conical Light Filename: filename>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses an image instead of generated conical lights.
 *   - Using this notetag will lock out the usage of generated conical light
 *     notetags found below.
 *   - By default, you should have your conical light image face the right at
 *     "0 degrees".
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light File Angle Offset: +x>
 * <Conical Light File Angle Offset: -x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how much to offset the angle of the conical light image by.
 * - Replace 'x' with a number from 0 to 360 representing the angle offset.
 *   - Negatives are allowed in order to quickly go the other way.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light File Anchor: x, y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determine the anchor points for the conical light image.
 * - Replace 'x' and 'y' with numbers between 0 and 1.
 *   - For x: 0.0 is left-aligned, 0.5 is center-aligned, 1.0 is right-aligned.
 *   - For y: 0.0 is top-aligned, 0.5 is middle-aligned, 1.0 is bottom-aligned.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Color: name>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Creates a generated conical light using a preset color.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'name' with any of the following:
 *   - Normal, Dawn, Day, Dusk, Night
 *   - White, Black, Red, Orange, Yellow, Green, Cyan, Blue, Purple, Magenta,
 *     Pink, Brown
 *   - Light Red, Light Orange, Light Yellow, Light Green, Light Cyan,
 *     Light Blue, Light Purple, Light Magenta, Light Pink, Light Brown
 *   - Dark Red, Dark Orange, Dark Yellow, Dark Green, Dark Cyan,
 *     Dark Blue, Dark Purple, Dark Magenta, Dark Pink, Dark Brown
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Color: #rrggbb>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Creates a generated conical light using a custom color.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'rr' with a hexadecimal value for red.
 * - Replace 'gg' with a hexadecimal value for green.
 * - Replace 'bb' with a hexadecimal value for blue.
 * - Leave the '#' in place.
 * - If you are unsure of what hexadecimal value your color is, please use an
 *   online site like: https://htmlcolorcodes.com/
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Radius: r>
 * <Conical Light Diameter: d>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the radius/diameter of the generated conical light.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   conical light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   conical light.
 * - Use one or the other.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Source Radius: r>
 * <Conical Light Source Diameter: d>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the radius/diameter of the generated conical light's light
 *   source, creating a little circle from where the cone starts.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 * - Replace 'r' with a number representing the pixel radius of the generated
 *   conical light.
 * - Replace 'd' with a number representing the pixel diameter of the generated
 *   conical light.
 * - Use one or the other.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Intensity: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the light intensity of the generated conical light.
 *   - This notetag cannot be used with <Conical Light Filename: filename>.
 *   - Intensity determines how much of the light's luminosity extends outwards
 *     at full strength between fading away.
 * - Replace 'x' with a number between 0 and 100 representing the intensity
 *   percentage for the generated conical light.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Blend Mode: Normal>
 * <Conical Light Blend Mode: Additive>
 * <Conical Light Blend Mode: Multiply>
 * <Conical Light Blend Mode: Screen>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the blend mode of the conical light.
 *   - Can be used with both image and generated conical lights.
 *   - We recommend that you use 'screen'.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Opacity: x>
 * <Conical Light Opacity: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Changes the opacity level of the conical light.
 *   - Can be used with both image and generated conical lights.
 *   - The opacity of a light determines how bright (larger numbers) or dim
 *     (smaller numbers) it is.
 * - Replace 'x' with a number between 0 and 255 to determine how dim (smaller
 *   numbers) or bright (larger numbers) the light is.
 * - Replace 'x%' with a percentage between 0% and 100% to determine how
 *   dim (smaller numbers) or bright (larger numbers) the light is.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Angle: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines the arc angle of the generated conical light.
 *   - The larger the angle, the wider the arc.
 * - Replace 'x' with a number between 0 and 360 representing the angle.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Angle Sway: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how many degrees the light will sway back and forth.
 *   - The larger the angle, the wider the sway.
 * - Replace 'x' with a number between 0 and 360 representing the degrees the
 *   light will sway.
 *   - Use 0 for no sway.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Sway Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how fast the light will sway back and forth.
 * - Replace 'x' with a percentage from 1% to 100%.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Sway Random>
 * <Conical Light Sway No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the sway oscillation. This can be used to
 *   put multiple lights swaying at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Force Direction: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Forces the conical light to face a certain direction.
 *   - This is primarily used for tile events or direction fixed events that
 *     would otherwise lock a conical light to face a certain direction.
 * - Replace 'x' with any of the following:
 *   - none
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Use 'none' to remove any forced directions.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Follow Cursor>
 * <Conical Light Not Follow Cursor>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Causes the conical light to face towards the direction of the mouse
 *   cursor if it's within the game client window.
 * - This is used to offset the default settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Hand Offset>
 * <Conical Light Center Offset>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Causes the conical light to follow either the hand-focused offsets or
 *   base the offset at the center of the character.
 * - This is used to offset the default settings found in the default
 *   Plugin Parameters.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light Offset: +x, +y>
 * <Conical Light Offset: -x, -y>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Offsets the position of the conical light, which is normally centered on
 *   the sprite it is coming from.
 *   - Can be used with both image and generated conical lights.
 *   - Used with the <Conical Light Center Offset> tag if the Plugin
 *     Parameters dictate using hand offsets.
 *   - As of the v1.10 update of this plugin, the presence of this tag will
 *     also automatically include the <Conical Light Center Offset> tag.
 *   - This is NOT used with the <Conical Light Hand Offset> tag.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the conical light's x and y coordinates by.
 * - Using this notetag will enable conical lights for this event.
 * 
 * ---
 * 
 * <Conical Light d Pattern p: +x, +y>
 * <Conical Light d Pattern p: -x, -y>
 * <Conical Light d Pattern p: +x, -y>
 * <Conical Light d Pattern p: -x, +y>
 * 
 * - Used for: Actor Notetags, Event Notetags, and Event Page Comment Tags
 * - When using hand-based offsets for the conical light, this will cause the
 *   light source to come from the target's hand instead of their chest/face.
 *   - Used with the <Conical Light Hand Offset> notetag if the Plugin
 *     Parameters dictate using non-hand offsets.
 *   - As of the v1.10 update of this plugin, the presence of this tag will
 *     also automatically include the <Conical Light Hand Offset> tag.
 *   - This is NOT used with the <Conical Light Hand Offset> notetag.
 * - For actors, the light source origin will vary depending on who is in the
 *   lead, in case certain actors may be left or right handed, or if happen to
 *   be a robot that has the light shining from their eyes.
 * - Replace 'd' with text representing the direction the offset is for. Use
 *   any of the directions below:
 *   - down, left, right, up
 *   - lower left, lower right, upper left, upper right
 * - Replace 'p' with a number representing the pattern index. Patterns are
 *   the individual frames used in the sprite when walking.
 *   - By default, RPG Maker MZ sprites have the following patterns:
 *   - Left frame is pattern 0.
 *   - Center frame is pattern 1.
 *   - Right frame is pattern 2.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the conical light's x and y coordinates by.
 * - Examples:
 *   - <Conical Light Down Pattern 0: +12, +14>
 *   - <Conical Light Left Pattern 1: +4, +16>
 *   - <Conical Light Right Pattern 2: -6, +16>
 * 
 * ---
 * 
 * === Conical Light Behavior-Related Notetags ===
 * 
 * Using this notetag will override the default settings found in the Plugin
 * Parameters provided that they are adjusting already present settings.
 * 
 * ---
 * 
 * <Conical Light Blink Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will blink.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * 
 * ---
 * 
 * <Conical Light Blink Modifier: +x%>
 * <Conical Light Blink Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a static multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static multiplier increase.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flicker Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flicker.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * 
 * ---
 * 
 * <Conical Light Flicker Modifier: +x%>
 * <Conical Light Flicker Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a randomized multiplicative opacity modifier at which lights will
 *   become brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flash Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flash.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - Must be used with a lower opacity setting.
 *   - Use with <Conical Light Opacity: x%> notetag.
 *   - If <Conical Light Opacity: x%> is not used, default to 50%.
 * 
 * ---
 * 
 * <Conical Light Flash Modifier: +x%>
 * <Conical Light Flash Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a static additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flashing.
 * - Replace 'x' with a percentage representing the static additional change.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Flare Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the frequency at which the conical light will flare.
 * - Replace 'x' with a percentage representing the frequency.
 *   - Lower numbers mean less frequent.
 *   - Higher numbers mean more frequent.
 * - Must be used with a lower opacity setting.
 *   - Use with <Conical Light Opacity: x%> notetag.
 *   - If <Conical Light Opacity: x%> is not used, default to 50%.
 * 
 * ---
 * 
 * <Conical Light Flare Modifier: +x%>
 * <Conical Light Flare Modifier: -x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts a randomized additive opacity modifier at which lights will become
 *   brighter (+) or dimmer (-) when flaring up.
 * - Replace 'x' with a percentage representing the randomized multiplier
 *   increase.
 *   - Randomized multiplier will range anywhere from 0 to the number itself.
 *   - Positive numbers mean brighter.
 *   - Negative numbers mean dimmer.
 * 
 * ---
 * 
 * <Conical Light Glow Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts how much the conical light will oscillate its brightness back and
 *   forth in a glow-like fashion.
 * - Replace 'x' with a percentage representing the change in brightness.
 *   - Lower numbers mean less fluctuation.
 *   - Higher numbers mean more fluctuation.
 * 
 * ---
 * 
 * <Conical Light Glow Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the speed at which the glow oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * 
 * ---
 * 
 * <Conical Light Glow Random>
 * <Conical Light Glow No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the glow oscillation. This can be used to
 *   put multiple lights glowing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <Conical Light Pulse Rate: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts how much the conical light will oscillate its radius back and
 *   forth in a pulse-like fashion.
 * - Replace 'x' with a percentage representing the change in size.
 *   - Lower numbers mean less shrinking.
 *   - Higher numbers mean more shrinking.
 * 
 * ---
 * 
 * <Conical Light Pulse Speed: x%>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adjusts the speed at which the pulse oscillates back and forth.
 * - Replace 'x' with a percentage representing the speed.
 *   - Lower numbers mean slower.
 *   - Higher numbers mean faster.
 * 
 * ---
 * 
 * <Conical Light Pulse Random>
 * <Conical Light Pulse No Random>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Adds a random seed (or not) to the pulse oscillation. This can be used to
 *   put multiple lights pulsing at different starting points.
 * - This is used to offset the default RNG settings found in the default
 *   Plugin Parameters.
 * 
 * ---
 * 
 * <Conical Light Pattern Type: name>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses a premade pattern by this plugin. The pattern will change the
 *   brightness of the light in a sequenced pattern.
 * - Replace 'name' with any of the following text:
 *   - none, normal
 *   - fluorescent, halogen, incandescent
 *   - candle, torch, campfire
 *   - fast strobe, slow strobe
 *   - strong pulse, medium pulse, slow pulse
 *   - underwater
 * 
 * ---
 * 
 * <Conical Light Custom Pattern: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Uses a custom pattern determined by you, the game dev, on how the light's
 *   brightness will change over time.
 * - Replace 'x' with letters of the alphabet from 'a' to 'z'.
 *   - 'a' is completely transparent.
 *   - 'm' is midway in brightness.
 *   - 'z' is the brightest the light can be.
 * - Examples:
 *   - <Conical Light Custom Pattern: mmmmmaaaaammmmmaaaaaabcdefgabcdefg>
 *   - <Conical Light Custom Pattern: nmonqnmomnmomomno>
 *   - <Conical Light Custom Pattern: abcdefghijklmnopqrrqponmlkjihgfedcba>
 * 
 * ---
 * 
 * <Conical Light Pattern Delay: x>
 * 
 * - Used for: Event Notetags and Event Page Comment Tags
 * - Determines how many frames to wait before going to the next part of the
 *   preset pattern and/or custom pattern.
 * - Replace 'x' with a number representing the frames the conical light needs
 *   to wait before moving forward in the pattern.
 *   - Lower numbers mean faster (minimum: 1).
 *   - Higher numbers mean slower.
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
 * === Overlay Plugin Commands ===
 * 
 * ---
 * 
 * OVERLAY: Change to Preset Color
 * - Change current darkness overlay to a preset color and opacity level.
 * 
 *   Color: 
 *   - Pick a preset color.
 *   - This will also come with predetermined opacity values.
 * 
 *   Duration:
 *   - What is the duration of the color change?
 * 
 * ---
 * 
 * OVERLAY: Change to Custom Color
 * - Change current darkness overlay to a custom color.
 * 
 *   Color:
 *   - Custom color.
 *   - This uses #rrggbb format.
 *   - Check your color here: https://htmlcolorcodes.com/
 * 
 *   Opacity:
 *   - Opacity level of the color.
 *   - Value between 0-255.
 *   - Transparent: 0. Opaque: 255.
 * 
 *   Duration:
 *   - What is the duration of the color change?
 * 
 * ---
 * 
 * === Battle Light Plugin Commands ===
 * 
 * ---
 * 
 * BATTLE LIGHT: Change Actor(s) Settings
 * - Change the battle-radial light settings for target(s).
 * 
 *   Actor ID(s):
 *   - Target actor(s) you want to change light settings for.
 *   - You may use JavaScript code.
 * 
 *   Settings:
 *   - Change the radial light settings for the target(s).
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 * 
 *   Auto-Calc Radius:
 *   - Automatically calculates the radius size based on sprite's width/height.
 * 
 * ---
 * 
 * BATTLE LIGHT: Change Enemy(s) Settings
 * - Change the battle-radial light settings for target(s).
 * 
 *   Enemy Index(es):
 *   - Select enemy troop index(es) to change light settings for.
 *   - You may use JavaScript code.
 * 
 *   Settings:
 *   - Change the radial light settings for the target(s).
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 * 
 *   Auto-Calc Radius:
 *   - Automatically calculates the radius size based on sprite's width/height.
 * 
 * ---
 * 
 * === Radial Light Plugin Commands ===
 * 
 * ---
 *
 * RADIAL LIGHT: Change Player Settings
 * - Change the radial light settings for the player.
 *
 *   Settings:
 *   - Change the radial light settings for the player.
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Follower Settings
 * - Change the radial light settings for followers.
 *
 *   Settings:
 *   - Change the radial light settings for all followers.
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Event(s) Settings
 * - Change the radial light settings for target event(s).
 *
 *   Event ID(s):
 *   - Target event(s) to have their light settings changed.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 *
 *   Settings:
 *   - Change the radial light settings for target event(s).
 *   - See "Radial Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this radial light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * RADIAL LIGHT: Change Boat Settings
 * - Change the radial light settings for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 *
 * RADIAL LIGHT: Change Ship Settings
 * - Change the radial light settings for the ship vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 *
 * RADIAL LIGHT: Change Airship Settings
 * - Change the radial light settings for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 * 
 *   Unboarded:
 * 
 *     Radial Light:
 *     - Changed radial light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 * 
 * === Conical Light Plugin Commands ===
 * 
 * ---
 *
 * CONICAL LIGHT: Change Player Settings
 * - Change the conical light settings for the player.
 *
 *   Settings:
 *   - Change the conical light settings for the player.
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Follower Settings
 * - Change the conical light settings for followers.
 *
 *   Settings:
 *   - Change the conical light settings for all followers.
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Event(s) Settings
 * - Change the conical light settings for target event(s).
 *
 *   Event ID(s):
 *   - Target event(s) to have their light settings changed.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 *
 *   Settings:
 *   - Change the conical light settings for target event(s).
 *   - See "Conical Light Settings" section below.
 * 
 *   Behavior:
 *   - Change the behaviors for this conical light.
 *   - See "Behavior" section below.
 *
 * ---
 *
 * CONICAL LIGHT: Change Boat Settings
 * - Change the conical light settings for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 *
 * ---
 *
 * CONICAL LIGHT: Change Ship Settings
 * - Change the conical light settings for the ship vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 *
 * ---
 *
 * CONICAL LIGHT: Change Airship Settings
 * - Change the conical light settings for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these conical lights?
 * 
 *   Unboarded:
 * 
 *     Conical Light:
 *     - Changed conical light settings for this vehicle.
 * 
 *       Changed Behavior:
 *       - What are the changed behavioral settings for these radial lights?
 *
 * ---
 * 
 * === Conical Offset Plugin Commands ===
 * 
 * ---
 * 
 * CONICAL OFFSET: Change Actor(s) Settings
 * - Change the conical light hand offset for target actor(s).
 * 
 *   Actor ID(s):
 *   - Target actor(s) you want to change offset settings for.
 *   - You may use JavaScript code.
 * 
 *   Enable:
 *   - Change the offset settings for the target(s).
 * 
 *   Hand Position Offsets:
 *   - Change target(s)'s offsets used for hand positions.
 * 
 *   VS8 Dash Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while dashing.
 * 
 *   VS8 Jump Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while jumping.
 * 
 * ---
 * 
 * CONICAL OFFSET: Change Event(s) Settings
 * - Change the conical light hand offset for target event(s).
 * 
 *   Event ID(s):
 *   - Target event(s) you want to change offset settings for.
 *   - Use 0 for "this event".
 *   - You may use JavaScript code.
 * 
 *   Enable:
 *   - Change the offset settings for the target(s).
 * 
 *   Hand Position Offsets:
 *   - Change target(s)'s offsets used for hand positions.
 * 
 *   VS8 Dash Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while dashing.
 * 
 *   VS8 Jump Offsets:
 *   - Change target(s)'s offsets used for hand positions for VS8 sprites
 *     while jumping.
 * 
 * ---
 *
 * CONICAL LIGHT: Change Ship Settings
 * - Change the conical light hand offset for the Ship vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 *
 * CONICAL LIGHT: Change Airship Settings
 * - Change the conical light hand offset for the airship vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 *
 * CONICAL LIGHT: Change Boat Settings
 * - Change the conical light hand offset for the boat vehicle.
 * 
 *   Boarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 * 
 *   Unboarded:
 * 
 *     Changed Offsets:
 *     - Changed offsets used for the "hand" positions of this vehicle.
 *
 * ---
 * 
 * === Spawn Light Plugin Commands ===
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) at Map X/Y
 * - Map only!
 * - Create new light spawn(s) locked to the map.
 * - Use tile coordinates for X and Y.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Coordinates X/Y:
 * 
 *     Origin X:
 *     Origin Y:
 *     - What is the origin X/Y position?
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) at Screen X/Y
 * - Map only!
 * - Create new light spawn(s) locked to the screen.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Coordinates X/Y:
 * 
 *     Origin X:
 *     Origin Y:
 *     - What is the origin X/Y position?
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Player
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Follower
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Target:
 * 
 *     Follower Index:
 *     - Which follower index should the light(s) follow?
 *     - Index starts at 0.
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * SPAWN LIGHT: Create Light(s) on Event
 * - Map only!
 * - Create new light spawn(s) following the player.
 * - The light spawn(s) is unaffected by map scrolling.
 * 
 *   Light Settings:
 * 
 *     Settings:
 *     - Change the radial light settings for the light spawn(s).
 * 
 *     Bheavior:
 *     - Change the behaviors for the light spawn(s).
 * 
 *   Target:
 * 
 *     Event ID:
 *     - Which map event should the light(s) follow?
 *     - Use 0 for "this event".
 *     - You may use JavaScript code.
 * 
 *   Spawn Settings:
 * 
 *     JS: Trajectory:
 *     - Code used to determine the trajectory of these lights.
 *     - These will revolve around the origin X/Y position.
 * 
 *     Initial Time:
 *     - What is the initial time value for this light spawn(s)?
 *     - You may use JavaScript code.
 * 
 *       Total Spawns:
 *       - How many light spawns should there be?
 *       - Minimum value: 1.
 *       - You may use JavaScript code.
 * 
 *       Time Increment:
 *       - What is the time increment between spawns?
 * 
 *     Expiration Timer:
 *     - After how many frames will light spawn(s) expire?
 *     - Use 0 for no expiration.
 *     - You may use JavaScript code.
 * 
 * ---
 * 
 * === Light-Related Sub Settings ===
 * 
 * ---
 * 
 * Radial Light Settings
 * 
 *   General:
 * 
 *     Enabled?:
 *     - Is this radial light enabled?
 * 
 *   Properties:
 * 
 *     Filename:
 *     - Filename used for the light effect image.
 *     - If used, ignore Color, Radius, and Intensity.
 *     - Image will be centered on the target where the center of the image is
 *       the anchor point and will be rotated.
 * 
 *     Color:
 *     - Color of the radial light in #rrggbb format.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the radius of this radial light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Intensity:
 *     - Radial light intensity. Use value between 0 & 1.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Optional:
 * 
 *     Angle:
 *     - What is the angle of this radial light?
 *     - Only noticeable with using images.
 * 
 *       Rotate Speed:
 *       - The rotation speed of this light?
 *       - Lower: slower. Higher: faster. Negative: reverse.
 * 
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the radial light?
 * 
 *     Opacity:
 *     - What is the opacity (0 to 255)?
 *     - Lower: dimmer. Higher: Brighter.
 * 
 *   Offsets:
 * 
 *     Offset X:
 *     - Offset the X position of this light.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - Offset the Y position of this light.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Conical Light Settings
 * 
 *   General:
 *   
 *     Enabled?:
 *     - Is this conical light enabled?
 * 
 *   Properties:
 * 
 *     Filename:
 *     - Filename used for the light effect image.
 *     - If used, ignore Radius, Color, and Intensity.
 * 
 *       Angle Offset:
 *       - Offset the image angle by this many degrees.
 *       - Only applies to images.
 * 
 *       File Anchor X:
 *       File Anchor Y:
 *       - Anchor X/Y used for images.
 *       - For X - Left: 0.0; Center: 0.5; Right: 1.0
 *       - For Y - Top: 0.0; Middle: 0.5; Bottom: 1.0
 * 
 *     Color:
 *     - What is the radius of this conical light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *     Radius:
 *     - What is the radius of this conical light?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *       Source Radius:
 *       - What is the radius of this light source?
 *       - For generated lights only.
 *       - Ignore if using image.
 * 
 *     Intensity:
 *     - Conical light intensity. Use value between 0 & 1.
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Optional:
 * 
 *     Blend Mode:
 *     - What kind of blend mode do you wish to apply to the conical light?
 * 
 *     Opacity:
 *     - What is the opacity (0 to 255)?
 *     - Lower: dimmer. Higher: Brighter.
 * 
 *   Angle:
 * 
 *     Arc Angle:
 *     - What is the angle of this conical light's arc?
 * 
 *     Angle Sway:
 *     - How many degrees should this light sway?
 *     - Use 0 for no sway.
 * 
 *     Sway Speed:
 *     - How fast should this light sway?
 *     - Lower: Slower; Higher: Faster
 * 
 *     Randomize Sway?:
 *     - Change the sway to offset at different starting points?
 * 
 *   Direction:
 * 
 *     Forced Direction?:
 *     - Force the conical light to face a certain direction?
 * 
 *     Follow Cursor?
 *     - Follow the mouse cursor?
 * 
 *   Offsets:
 * 
 *     Use Hand Offset?:
 *     - Put the light source on the target's "hand" position?
 *     - Disables the two settings below if on.
 * 
 *     Offset X (Non-Hand):
 *     - Offset the X position of this light.
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y (Non-Hand):
 *     - Offset the Y position of this light.
 *     - Negative: up. Positive: down.
 * 
 * ---
 * 
 * Behavior
 * 
 *   Blink:
 * 
 *     Blink Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Blink Modifier:
 *     - Static multiplicative opacity modifier. Before additive.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flicker:
 * 
 *     Flicker Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flicker Modifier:
 *     - Random multiplicative opacity modifier. Before additive.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flash:
 * 
 *     Flash Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flash Modifier:
 *     - Static additive opacity modifier. Before multiplicative.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Flare:
 * 
 *     Flare Rate:
 *     - What is the rate of occurance for this effect?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Flare Modifier:
 *     - Random additive opacity modifier. Before multiplicative.
 *     - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 *   Glow:
 * 
 *     Glow Rate:
 *     - What is the glow change for this light?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Glow Speed:
 *     - What is the speed at which glow oscillates at?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Randomize Glow?:
 *     - Offset the glow to oscillate at different starting points?
 * 
 *   Pulse:
 * 
 *     Pulse Rate:
 *     - What is the pulse change for this light?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Pulse Speed:
 *     - What is the speed at which pulse oscillates at?
 *     - Use a decimal number between 0 and 1.
 * 
 *     Randomize Pulse?:
 *     - Offset the pulse to oscillate at different starting points?
 * 
 *   Pattern:
 * 
 *     Pattern Name:
 *     - Select the pattern name for this light.
 *     - Ignore if using any Custom Pattern.
 * 
 *     Custom Pattern:
 *     - Create a custom pattern with letters from a to z.
 *     - Where 'a' is transparent and 'z' is opaque.
 * 
 *     Frame Delay:
 *     - What is the frame delay between pattern updates?
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Map Lighting Settings
 * ============================================================================
 *
 * Lighting settings for the map scene. These settings allow you to adjust the
 * default settings used for the majority of lighting types and behaviors
 * across the player character, followers, events, and the various vehicles.
 *
 * ---
 *
 * General
 * 
 *   Enable For Map?:
 *   - Enable Lighting Effects for map?
 * 
 *   Shake Buffer:
 *   - Screen shakes reveal more of the screen than normal.
 *   - How many pixels of buffer should you provide?
 *
 * ---
 *
 * Player Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Follower Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Event Defaults
 * 
 *   Radial Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 *   Conical Light:
 *   - Default radial light settings for this target.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for this light?
 * 
 * ---
 * 
 * Vehicles
 * 
 *   Boat:
 *   Ship:
 *   Airship:
 * 
 *     Boarded:
 * 
 *       Radial Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *       Conical Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *         "Hand" Offsets:
 *         - Default offsets used for the "hand" positions of this vehicle.
 * 
 *     Unboarded:
 * 
 *       Radial Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *       Conical Light:
 *       - Default radial light settings for this target.
 * 
 *         Default Behavior:
 *         - What are the default behavioral settings for this light?
 * 
 *         "Hand" Offsets:
 *         - Default offsets used for the "hand" positions of this vehicle.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Hand Position, VS8 Dash, VS8 Jump Offsets
 * ============================================================================
 *
 * Default offsets used for hand positions. These are for conical lights and
 * help determine where the light source should come from to avoid making the
 * conical light look weird by having lights come from the user's face or chest
 * as seen with other lighting plugins.
 * 
 * There are also separate settings for those using VS8 sprites for dashing and
 * jumping positions. Be sure to adjust them accordingly.
 *
 * ---
 *
 * Standard Directions
 * 
 *   Down:
 *   Up:
 *   Left:
 *   Right:
 *   - Offsets to determine conical light source position when facing
 *     this direction.
 * 
 * ---
 * 
 * Diagonal Directions
 * 
 *   Lower Left:
 *   Lower Right:
 *   Upper Left:
 *   Upper Right:
 *   - Offsets to determine conical light source position when facing
 *     this direction.
 *
 * ---
 *
 * Pattern Offsets:
 * 
 *   Pattern 0-10:
 * 
 *     Offset X:
 *     - What is the offset X for this pattern?
 *     - Negative: left. Positive: right.
 * 
 *     Offset Y:
 *     - What is the offset Y for this pattern?
 *     - Negative: up. Positive: down.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Anti-Light Settings
 * ============================================================================
 *
 * Anti-Light regions and terrain tags can be used to mark certain tiles from
 * being affected by light at all. These tiles can be used as ceiling tiles or
 * areas outside of the map boundaries where light doesn't normally reach.
 * 
 * Keep in mind that this does NOT block light from passing through it. If a
 * light source is big enough to engulf the tiles past the anti-light marked
 * tiles, those tiles will still be lit up by any light sources. Therefore, you
 * need to mark those tiles on the map to be anti-light as well in addition to
 * planning out your maps for potential light piercing through the tiles.
 * 
 * There are two kinds of anti-light types. Hard edges and soft edges. Hard
 * Edges are extremely rough and box like. Soft Edges will smooth out towards
 * regularly lit tiles.
 *
 * ---
 *
 * Hard Edges
 * 
 *   Regions:
 *   - Which regions by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 255.
 * 
 *   Terrain Tags:
 *   - Which terrain tags by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 7.
 *
 * ---
 *
 * Soft Edges
 * 
 *   Regions:
 *   - Which regions by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 255.
 * 
 *   Terrain Tags:
 *   - Which terrain tags by default apply anti-light?
 *   - 0 is ignored. Use a number from 1 to 7.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Lighting Settings
 * ============================================================================
 *
 * Lighting settings for the battle scene. The VisuStella MZ Battle Core is
 * required in order for lighting effects to work in-battle.
 *
 * ---
 *
 * General
 * 
 *   Enable For Battle?:
 *   - Enable Lighting Effects for battles?
 *   - Requires VisuStella MZ Battle Core!
 * 
 * ---
 * 
 * Actor Defaults
 * 
 *   Battle Light:
 *   - Default battle-radial light settings for actors.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for actor radial lights?
 * 
 *     Auto-Calc Radius:
 *     - Automatically calculates the radius size based on sprite's
 *       width/height.
 *     - Ignore if use <Radial Light Radius: x>.
 *
 * ---
 * 
 * Enemy Defaults
 * 
 *   Battle Light:
 *   - Default battle-radial light settings for enemies.
 * 
 *     Default Behavior:
 *     - What are the default behavioral settings for enemy radial lights?
 * 
 *     Auto-Calc Radius:
 *     - Automatically calculates the radius size based on sprite's
 *       width/height.
 *     - Ignore if use <Radial Light Radius: x>.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto-Light Regions Settings
 * ============================================================================
 *
 * Tiles marked with these regions will automatically have white light spawned
 * on top of them. However, depending on the group the region belongs to, the
 * light spawned will have varying degrees of opacity. This means some places
 * can be less lit while others can be darker.
 * 
 * This can be used to light up certain parts of the map automatically while
 * requiring others to be lit with standard lighting.
 * 
 * This is also helpful for those who wish to keep their parallax fully lit
 * (since it will be affected by the darkness overlay) without having to put in
 * a lot of light sources.
 *
 * ---
 *
 * Auto-Light Regions
 * 
 *   Opacity - 100%:
 *   to
 *   Opacity - 5%:
 *   - Mark the regions with this opacity level.
 *   - Light color will be white. Use Region ID's (1 to 255).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Preset Color Settings
 * ============================================================================
 *
 * If you happen to not like the preset colors used by this plugin, you can
 * redefine them using different hexidecimal values for you own touch. If you
 * are unsure of what the hexidecimal values are, please use an online site
 * like: https://htmlcolorcodes.com/
 *
 * ---
 *
 * Daytime Colors
 * Greyscale Colors
 * Red Colors
 * Orange Colors
 * Yellow Colors
 * Green Colors
 * Cyan Colors
 * Blue Colors
 * Purple Colors
 * Magenta Colors
 * Pink Colors
 * Brown Colors
 * Misc Colors
 * 
 *   Preset Color Name:
 *   - Preset's hex color in #rrggbb format.
 *   - Check your color here: https://htmlcolorcodes.com/
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Options Menu Settings
 * ============================================================================
 *
 * Lighting settings for the options scene. These are for the players who
 * aren't fond of blinking or oscillating lights in case they bother them.
 *
 * ---
 *
 * Options
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 *   - Ignore if using the VisuStella MZ Options Core.
 * 
 * ---
 * 
 * Blinking Lights
 * 
 *   Add Option?:
 *   - Add the 'Blinking Lights' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 * 
 * Pulsing Lights
 * 
 *   Add Option?:
 *   - Add the 'Pulsing Lights' option to the Options menu?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Radial Light Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary properties of radial lights for the specific
 * user type.
 *
 * --- 
 * 
 * General:
 * 
 *   Enabled?:
 *   - Is this radial light enabled?
 * 
 * ---
 * 
 * Properties:
 * 
 *   Filename:
 *   - Filename used for the light effect image.
 *   - If used, ignore Color, Radius, and Intensity.
 *   - Image will be centered on the target where the center of the image is
 *     the anchor point and will be rotated.
 * 
 *   Color:
 *   - Color of the radial light in #rrggbb format.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the radius of this radial light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Intensity:
 *   - Radial light intensity. Use value between 0 & 1.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Optional:
 * 
 *   Angle:
 *   - What is the angle of this radial light?
 *   - Only noticeable with using images.
 * 
 *     Rotate Speed:
 *     - The rotation speed of this light?
 *     - Lower: slower. Higher: faster. Negative: reverse.
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the radial light?
 * 
 *   Opacity:
 *   - What is the opacity (0 to 255)?
 *   - Lower: dimmer. Higher: Brighter.
 * 
 * ---
 * 
 * Offsets:
 * 
 *   Offset X:
 *   - Offset the X position of this light.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the Y position of this light.
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Conical Light Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary properties of conical lights for the specific
 * user type.
 *
 * --- 
 * 
 * General:
 * 
 *   Enabled?:
 *   - Is this conical light enabled?
 * 
 * ---
 * 
 * Properties:
 * 
 *   Filename:
 *   - Filename used for the light effect image.
 *   - If used, ignore Radius, Color, and Intensity.
 * 
 *     Angle Offset:
 *     - Offset the image angle by this many degrees.
 *     - Only applies to images.
 * 
 *     File Anchor X:
 *     File Anchor Y:
 *     - Anchor X/Y used for images.
 *     - For X - Left: 0.0; Center: 0.5; Right: 1.0
 *     - For Y - Top: 0.0; Middle: 0.5; Bottom: 1.0
 * 
 *   Color:
 *   - What is the radius of this conical light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *   Radius:
 *   - What is the radius of this conical light?
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 *     Source Radius:
 *     - What is the radius of this light source?
 *     - For generated lights only.
 *     - Ignore if using image.
 * 
 *   Intensity:
 *   - Conical light intensity. Use value between 0 & 1.
 *   - For generated lights only.
 *   - Ignore if using image.
 * 
 * ---
 * 
 * Optional:
 * 
 *   Blend Mode:
 *   - What kind of blend mode do you wish to apply to the radial light?
 * 
 *   Opacity:
 *   - What is the opacity (0 to 255)?
 *   - Lower: dimmer. Higher: Brighter.
 * 
 * ---
 * 
 * Angle:
 * 
 *   Arc Angle:
 *   - What is the angle of this conical light's arc?
 * 
 *   Angle Sway:
 *   - How many degrees should this light sway?
 *   - Use 0 for no sway.
 * 
 *   Sway Speed:
 *   - How fast should this light sway?
 *   - Lower: Slower; Higher: Faster
 * 
 *   Randomize Sway?:
 *   - Change the sway to offset at different starting points?
 * 
 * ---
 * 
 * Direction:
 * 
 *   Forced Direction?:
 *   - Force the conical light to face a certain direction?
 * 
 *   Follow Cursor?
 *   - Follow the mouse cursor?
 * 
 * ---
 * 
 * Offsets:
 * 
 *   Offset X:
 *   - Offset the X position of this light.
 *   - Negative: left. Positive: right.
 * 
 *   Offset Y:
 *   - Offset the Y position of this light.
 *   - Negative: up. Positive: down.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Light Behavior Settings
 * ============================================================================
 *
 * These are sub-settings found in the other settings lists. These settings
 * adjust the default/primary patterns of how lights behave for the specific
 * user type.
 *
 * --- 
 * 
 * Blink:
 * 
 *   Blink Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Blink Modifier:
 *   - Static multiplicative opacity modifier. Before additive.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flicker:
 * 
 *   Flicker Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flicker Modifier:
 *   - Random multiplicative opacity modifier. Before additive.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flash:
 * 
 *   Flash Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flash Modifier:
 *   - Static additive opacity modifier. Before multiplicative.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Flare:
 * 
 *   Flare Rate:
 *   - What is the rate of occurance for this effect?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Flare Modifier:
 *   - Random additive opacity modifier. Before multiplicative.
 *   - Use a decimal number between -1 and 1. Negatives allowed.
 * 
 * ---
 * 
 * Glow:
 * 
 *   Glow Rate:
 *   - What is the glow change for this light?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Glow Speed:
 *   - What is the speed at which glow oscillates at?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Randomize Glow?:
 *   - Offset the glow to oscillate at different starting points?
 * 
 * ---
 * 
 * Pulse:
 * 
 *   Pulse Rate:
 *   - What is the pulse change for this light?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Pulse Speed:
 *   - What is the speed at which pulse oscillates at?
 *   - Use a decimal number between 0 and 1.
 * 
 *   Randomize Pulse?:
 *   - Offset the pulse to oscillate at different starting points?
 * 
 * ---
 * 
 * Pattern:
 * 
 *   Pattern Name:
 *   - Select the pattern name for this light.
 *   - Ignore if using any Custom Pattern.
 * 
 *   Custom Pattern:
 *   - Create a custom pattern with letters from a to z.
 *   - Where 'a' is transparent and 'z' is opaque.
 * 
 *   Frame Delay:
 *   - What is the frame delay between pattern updates?
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
 * * Irina
 * * Arisu
 * * Olivia
 * * Yanfly
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.10: January 16, 2025
 * * Documentation Update!
 * ** Updated documentation for following notetags:
 * *** <Conical Light Offset: +x, +y>
 * **** Used with the <Conical Light Center Offset> tag if the Plugin
 *      Parameters dictate using hand offsets.
 * **** As of the v1.10 update of this plugin, the presence of this tag will
 *      also automatically include the <Conical Light Center Offset> tag.
 * *** <Conical Light d Pattern p: +x, +y>
 * **** Used with the <Conical Light Hand Offset> tag if the Plugin
 *      Parameters dictate using non-hand offsets.
 * **** As of the v1.10 update of this plugin, the presence of this tag will
 *      also automatically include the <Conical Light Hand Offset> tag.
 * * Feature Update!
 * ** Using <Conical Light Offset: +x, +y> on an event will automaticaly use
 *    the <Conical Light Center Offset> tag as of this update.
 * ** Using <Conical Light d Pattern p: +x, +y> on an event will automatically
 *    use the <Conical Light Hand Offset> tag as of this update.
 * 
 * Version 1.09: November 14, 2024
 * * Documentation Update!
 * ** Updated documentation for following notetags:
 * *** <Radial Light Flash Rate: x%>
 * *** <Radial Light Flare Rate: x%>
 * **** To include the following:
 * ***** Must be used with a lower opacity setting.
 * ****** Use with <Radial Light Opacity: x%> notetag.
 * ****** If <Radial Light Opacity: x%> is not used, default to 50%.
 * *** <Conical Light Flash Rate: x%>
 * *** <Conical Light Flare Rate: x%>
 * **** To include the following:
 * ***** Must be used with a lower opacity setting.
 * ****** Use with <Conical Light Opacity: x%> notetag.
 * ****** If <Conical Light Opacity: x%> is not used, default to 50%.
 * * Feature Updates!
 * ** Notetags for flash/flare rates will now automatically default the opacity
 *    level of a light to 50% if the opacity notetag is not present. Update
 *    made by Arisu.
 * 
 * Version 1.08: June 13, 2024
 * * Bug Fixes!
 * ** <Conical Light Custom Pattern: x> was not working before and should now
 *    work properly. Fix made by Arisu.
 * 
 * Version 1.07: February 15, 2024
 * * Bug Fixes!
 * ** Fixed a bug where enemy notetags for lighting effects did not work
 *    properly. Fix made by Arisu.
 * 
 * Version 1.06: November 16, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.05: September 14, 2023
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.04: February 16, 2023
 * * Feature Update!
 * ** During events, touch-directed flashlight movement will not occur to
 *    prevent the player character from facing different directions than
 *    intended. Update made by Irina.
 * 
 * Version 1.03: May 5, 2022
 * * Bug Fixes!
 * ** Vehicles no longer auto put out light in the upper left corner of the map
 *    when they have no graphic. Fix made by Irina.
 * 
 * Version 1.02: March 31, 2022
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetags added by Irina:
 * *** <Hard Anti-Light Regions: x, x, x>
 * *** <Hard Anti-Light Terrain Tags: x, x, x>
 * *** <Soft Anti-Light Regions: x, x, x>
 * *** <Soft Anti-Light Terrain Tags: x, x, x>
 * **** Tiles marked by these regions/terrain tags won't have any light shown
 *      on them.
 * **** This does NOT block light from going to the other side. If the light
 *      radius is large enough, it will pierce through to the other side. It
 *      just won't be visible on the region marked tiles.
 * ** New Plugin Parameters added by Irina:
 * *** Anti-Light Settings
 * **** Anti-Light regions and terrain tags can be used to mark certain tiles
 *      from being affected by light at all. These tiles can be used as ceiling
 *      tiles or areas outside of the map boundaries where light doesn't
 *      normally reach.
 * **** Keep in mind that this does NOT block light from passing through it. If
 *      a light source is big enough to engulf the tiles past the anti-light
 *      marked tiles, those tiles will still be lit up by any light sources.
 *      Therefore, you need to mark those tiles on the map to be anti-light as
 *      well in addition to planning out your maps for potential light piercing
 *      through the tiles.
 * **** There are two kinds of anti-light types. Hard edges and soft edges.
 *      Hard Edges are extremely rough and box like. Soft Edges will smooth out
 *      towards regularly lit tiles.
 * 
 * Version 1.01: March 24, 2022
 * * Bug Fixes!
 * ** Updated battle radial light positions for games where the UI resolution
 *    is not the same as the Screen resolution. Fix made by Irina.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update
 * ** Changed the position of "Use Hand Offset?" in the Plugin Parameters for
 *    more clarity in regards to Conical Lights.
 * ** Added "(Non-Hand)" to the respective Offset X and Offset Y plugin
 *    parameter names for those who missed the description of the previous
 *    Plugin Parameter.
 * * New Features!
 * ** New Plugin Parameters added by Irina.
 * *** Plugin Parameters > Preset Colors Settings
 * **** You can now define what hex codes are used for each preset color.
 * 
 * Version 1.00 Official Release Date: April 8, 2022
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_Overlay
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_Overlay
 * @text Category - Overlay
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OverlayChangeToPreset
 * @text OVERLAY: Change to Preset Color
 * @desc Change current darkness overlay to a preset color and opacity level.
 *
 * @arg Color:str
 * @text Color
 * @type select
 * @option Normal
 * @option -
 * @option Dawn
 * @option Day
 * @option Dusk
 * @option Night
 * @option -
 * @option White
 * @option Light Grey
 * @option Grey
 * @option Dark Grey
 * @option Black
 * @option -
 * @option Light Red
 * @option Red
 * @option Dark Red
 * @option -
 * @option Light Orange
 * @option Orange
 * @option Dark Orange
 * @option -
 * @option Light Yellow
 * @option Yellow
 * @option Dark Yellow
 * @option -
 * @option Light Green
 * @option Green
 * @option Dark Green
 * @option -
 * @option Light Cyan
 * @option Cyan
 * @option Dark Cyan
 * @option -
 * @option Light Blue
 * @option Blue
 * @option Dark Blue
 * @option -
 * @option Light Purple
 * @option Purple
 * @option Dark Purple
 * @option -
 * @option Light Magenta
 * @option Magenta
 * @option Dark Magenta
 * @option -
 * @option Light Pink
 * @option Pink
 * @option Dark Pink
 * @option -
 * @option Light Brown
 * @option Brown
 * @option Dark Brown
 * @option -
 * @desc Pick a preset color. This will also come with predetermined opacity values.
 * @default Night
 *
 * @arg Duration:num
 * @text Duration
 * @desc What is the duration of the color change?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command OverlayChangeToCustomColor
 * @text OVERLAY: Change to Custom Color
 * @desc Change current darkness overlay to a custom color.
 *
 * @arg Color:str
 * @text Color
 * @desc Custom color. This uses #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @arg Opacity:num
 * @text Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Opacity level of the color. Value between 0-255.
 * Transparent: 0. Opaque: 255.
 * @default 255
 *
 * @arg Duration:num
 * @text Duration
 * @desc What is the duration of the color change?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_BattleLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_BattleLight
 * @text Category - Battle Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleLightChangeActorSettings
 * @text BATTLE LIGHT: Change Actor(s) Settings
 * @desc Change the battle-radial light settings for target(s).
 * 
 * @arg ActorID:arrayeval
 * @text Actor ID(s)
 * @type actor[]
 * @desc Target actor(s) you want to change light settings for.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the target(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg AutoRadius:eval
 * @text Auto-Calc Radius
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command BattleLightChangeEnemySettings
 * @text BATTLE LIGHT: Change Enemy(s) Settings
 * @desc Change the battle-radial light settings for target(s).
 *
 * @arg EnemyIndex:arrayeval
 * @text Enemy Index(es)
 * @type string[]
 * @desc Select enemy troop index(es) to change light settings for.
 * You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the target(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg AutoRadius:eval
 * @text Auto-Calc Radius
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_RadialLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_RadialLight
 * @text Category - Radial Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangePlayerSettings
 * @text RADIAL LIGHT: Change Player Settings
 * @desc Change the radial light settings for the player.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeFollowerSettings
 * @text RADIAL LIGHT: Change Follower Settings
 * @desc Change the radial light settings for followers.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for all followers.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeEventSettings
 * @text RADIAL LIGHT: Change Event(s) Settings
 * @desc Change the radial light settings for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) to have their light settings changed.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Radial>
 * @desc Change the radial light settings for target event(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"72","color:str":"#ffffff","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this radial light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeBoatSettings
 * @text RADIAL LIGHT: Change Boat Settings
 * @desc Change the radial light settings for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"240","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * @parent Boat
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeShipSettings
 * @text RADIAL LIGHT: Change Ship Settings
 * @desc Change the radial light settings for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"300","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"160","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RadialLightChangeAirshipSettings
 * @text RADIAL LIGHT: Change Airship Settings
 * @desc Change the radial light settings for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Radial Light
 * @parent Boarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"360","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"192","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Radial Light
 * @parent Unboarded
 * @type struct<Radial>
 * @desc Changed radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ConicalLight
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_ConicalLight
 * @text Category - Conical Light
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangePlayerSettings
 * @text CONICAL LIGHT: Change Player Settings
 * @desc Change the conical light settings for the player.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"true","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeFollowerSettings
 * @text CONICAL LIGHT: Change Follower Settings
 * @desc Change the conical light settings for followers.
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for all followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeEventSettings
 * @text CONICAL LIGHT: Change Event(s) Settings
 * @desc Change the conical light settings for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) to have their light settings changed.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Settings:struct
 * @text Settings
 * @type struct<Conical>
 * @desc Change the conical light settings for target event(s).
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @type struct<Behavior>
 * @desc Change the behaviors for this conical light.
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeBoatSettings
 * @text CONICAL LIGHT: Change Boat Settings
 * @desc Change the conical light settings for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeShipSettings
 * @text CONICAL LIGHT: Change Ship Settings
 * @desc Change the conical light settings for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalLightChangeAirshipSettings
 * @text CONICAL LIGHT: Change Airship Settings
 * @desc Change the conical light settings for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedSettings:struct
 * @text Conical Light
 * @parent Boarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg BoardedBehavior:struct
 * @text Changed Behavior
 * @parent BoardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedSettings:struct
 * @text Conical Light
 * @parent Unboarded
 * @type struct<Conical>
 * @desc Changed conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @arg UnboardedBehavior:struct
 * @text Changed Behavior
 * @parent UnboardedSettings:struct
 * @type struct<Behavior>
 * @desc What are the changed behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_ConicalOffset
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_ConicalOffset
 * @text Category - Conical Offset
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeActor
 * @text CONICAL OFFSET: Change Actor(s) Settings
 * @desc Change the conical light hand offset for target actor(s).
 * 
 * @arg ActorID:arrayeval
 * @text Actor ID(s)
 * @type actor[]
 * @desc Target actor(s) you want to change offset settings for.
 * You may use JavaScript code.
 * @default ["1"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Change the offset settings for the target(s).
 * @default true
 * 
 * @arg HandOffset:struct
 * @text Hand Position Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeEvent
 * @text CONICAL OFFSET: Change Event(s) Settings
 * @desc Change the conical light hand offset for target event(s).
 * 
 * @arg EventID:arrayeval
 * @text Event ID(s)
 * @type string[]
 * @desc Target event(s) you want to change offset settings for.
 * Use 0 for "this event". You may use JavaScript code.
 * @default ["0"]
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Change the offset settings for the target(s).
 * @default true
 * 
 * @arg HandOffset:struct
 * @text Hand Position Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @arg VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @type struct<HandOffset>
 * @desc Change target(s)'s offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeBoat
 * @text CONICAL OFFSET: Change Boat Settings
 * @desc Change the conical light hand offset for the boat vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeShip
 * @text CONICAL OFFSET: Change Ship Settings
 * @desc Change the conical light hand offset for the ship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ConicalOffsetChangeAirship
 * @text CONICAL OFFSET: Change Airship Settings
 * @desc Change the conical light hand offset for the airship vehicle.
 *
 * @arg Boarded
 * 
 * @arg BoardedOffset:struct
 * @text Changed Offsets
 * @parent Boarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @arg Unboarded
 * 
 * @arg UnboardedOffset:struct
 * @text Changed Offsets
 * @parent Unboarded
 * @type struct<HandOffset>
 * @desc Changed offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Separator_LightSpawns
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command Category_LightSpawns
 * @text Category - Spawn Light(s)
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewMapLockedLight
 * @text SPAWN LIGHT: Create Light(s) at Map X/Y
 * @desc Map only! Create new light spawn(s) locked to the map.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Coordinates
 * @text Coordinates X/Y
 *
 * @arg CoordinatesX:eval
 * @text Origin X
 * @parent Coordinates
 * @desc What is the origin X position?
 * You may use JavaScript code.
 * @default $gamePlayer.x
 *
 * @arg CoordinatesY:eval
 * @text Origin Y
 * @parent Coordinates
 * @desc What is the origin Y position?
 * You may use JavaScript code.
 * @default $gamePlayer.y
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewScreenLockedLight
 * @text SPAWN LIGHT: Create Light(s) at Screen X/Y
 * @desc Map only! Create new light spawn(s) locked to the screen.
 * The light spawn(s) is unaffected by map scrolling.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Coordinates
 * @text Coordinates X/Y
 *
 * @arg CoordinatesX:eval
 * @text Origin X
 * @parent Coordinates
 * @desc What is the origin X position?
 * You may use JavaScript code.
 * @default Graphics.width / 2
 *
 * @arg CoordinatesY:eval
 * @text Origin Y
 * @parent Coordinates
 * @desc What is the origin Y position?
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewPlayerLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Player
 * @desc Map only! Create new light spawn(s) following the player.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewFollowerLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Follower
 * @desc Map only! Create new light spawn(s) following a follower.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Target
 * @text Target
 *
 * @arg FollowerIndex:eval
 * @text Follower Index
 * @parent Target
 * @desc Which follower index should the light(s) follow?
 * Index starts at 0. You may use JavaScript code.
 * @default 0
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnNewEventLockedLight
 * @text SPAWN LIGHT: Create Light(s) on Event
 * @desc Map only! Create new light spawn(s) following an event.
 * Use tile coordinates for X and Y.
 * 
 * @arg LightSettings
 * @text Light Settings
 * 
 * @arg Settings:struct
 * @text Settings
 * @parent LightSettings
 * @type struct<Radial>
 * @desc Change the radial light settings for the light spawn(s).
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"32","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 *
 * @arg Behavior:struct
 * @text Behavior
 * @parent LightSettings
 * @type struct<Behavior>
 * @desc Change the behaviors for the light spawn(s).
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @arg Target
 * @text Target
 *
 * @arg EventID:eval
 * @text Event ID
 * @parent Target
 * @desc Which map event should the light(s) follow?
 * Use 0 for "this event". You may use JavaScript code.
 * @default 0
 * 
 * @arg SpawnSettings
 * @text Spawn Settings
 *
 * @arg UpdateFunc:json
 * @text JS: Trajectory
 * @parent SpawnSettings
 * @type note
 * @desc Code used to determine the trajectory of these lights.
 * These will revolve around the origin X/Y position.
 * @default "// Declare Constants\nconst data = arguments[0];\nconst time = arguments[1];\n\n// Calculate Results\nconst angle = time * 1.0;\nconst radians = angle * Math.PI / 180.0;\nconst distance = 0;  // Distance from Center\nconst offsetX = 0;\nconst offsetY = 0;\nconst x = Math.cos(radians) * distance + offsetX;\nconst y = Math.sin(radians) * distance + offsetY;\n\n// Return Results\nreturn {\n    x: x,\n    y: y,\n};"
 *
 * @arg InitialTime:eval
 * @text Initial Time
 * @parent SpawnSettings
 * @desc What is the initial time value for this light spawn(s)?
 * You may use JavaScript code.
 * @default 0
 *
 * @arg TotalSpawns:eval
 * @text Total Spawns
 * @parent InitialTime:eval
 * @desc How many light spawns should there be?
 * Minimum value: 1. You may use JavaScript code.
 * @default 1
 *
 * @arg TimeIncrement:eval
 * @text Time Increment
 * @parent InitialTime:eval
 * @desc What is the time increment between spawns?
 * @default +1
 *
 * @arg ExpirationTimer:eval
 * @text Expiration Timer
 * @parent SpawnSettings
 * @desc After how many frames will light spawn(s) expire?
 * Use 0 for no expiration. You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LightSpawnExpireSpawnedLights
 * @text SPAWN LIGHT: Expire All Spawned Light(s)
 * @desc Map only! Expires all spawned lights.
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
 * @param LightingEffects
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 * 
 * @param Map:struct
 * @text Map Lighting Settings
 * @type struct<Map>
 * @desc Lighting settings for the map scene.
 * @default {"General":"","Enable:eval":"true","ShakeBuffer:num":"80","PlayerDefaults":"","PlayerRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"216\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","PlayerRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","PlayerConical:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.1\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","PlayerConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","FollowerDefaults":"","FollowerRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"216\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","FollowerRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","FollowerConical:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"followMouse:eval\":\"false\",\"useHandOffset:eval\":\"true\",\"forceDirection:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","FollowerConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EventDefaults":"","EventRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"radius:num\":\"72\",\"color:str\":\"#ffffff\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EventRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EventConical:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"6\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"followMouse:eval\":\"false\",\"useHandOffset:eval\":\"true\",\"forceDirection:num\":\"0\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EventConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","Vehicles":"","Boat":"","BoatBoarded":"","BoatBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"240\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","BoatUnboarded":"","BoatUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"miniRadius:num\":\"8\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"60\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","BoatUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","BoatUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+23\\\",\\\"pattern0Y:num\\\":\\\"-8\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"-8\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+23\\\",\\\"pattern2Y:num\\\":\\\"-8\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","Ship":"","ShipBoarded":"","ShipBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"300\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"160\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"480\",\"miniRadius:num\":\"16\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"75\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-24\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-23\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-24\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","ShipUnboarded":"","ShipUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"480\",\"miniRadius:num\":\"16\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"75\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ShipUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ShipUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+23\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+24\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+23\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"-24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"-24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"-24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+24\\\",\\\"pattern0Y:num\\\":\\\"+6\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+24\\\",\\\"pattern1Y:num\\\":\\\"+7\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+24\\\",\\\"pattern2Y:num\\\":\\\"+6\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"-24\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"-23\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"-24\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","Airship":"","AirshipBoarded":"","AirshipBoardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"360\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"192\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipBoardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipBoardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"600\",\"miniRadius:num\":\"32\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"90\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipBoardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipBoardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}","AirshipUnboarded":"","AirshipUnboardedRadialSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"72\",\"intensity:num\":\"0.50\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"64\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipUnboardedRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipUnboardedConicalSettings:struct":"{\"General\":\"\",\"enabled:eval\":\"false\",\"Properties\":\"\",\"filename:str\":\"\",\"fileAngleOffset:num\":\"0\",\"fileAnchorX:num\":\"0.5\",\"fileAnchorY:num\":\"0.5\",\"color:str\":\"#ffffff\",\"radius:num\":\"600\",\"miniRadius:num\":\"32\",\"intensity:num\":\"0.25\",\"Optional\":\"\",\"blendMode:num\":\"3\",\"opacity:num\":\"255\",\"AngleSettings\":\"\",\"angle:num\":\"90\",\"angleSway:num\":\"0\",\"swaySpeed:num\":\"0.03\",\"swayRng:eval\":\"true\",\"Direction\":\"\",\"forceDirection:num\":\"0\",\"followMouse:eval\":\"true\",\"useHandOffset:eval\":\"true\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","AirshipUnboardedConicalBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","AirshipUnboardedConicalOffset:struct":"{\"StandardDirections\":\"\",\"dir2:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir4:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir6:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir8:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+1\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+1\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"DiagonalDirections\":\"\",\"dir1:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir3:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir7:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\",\"dir9:struct\":\"{\\\"Pattern0\\\":\\\"\\\",\\\"pattern0X:num\\\":\\\"+0\\\",\\\"pattern0Y:num\\\":\\\"+0\\\",\\\"Pattern1\\\":\\\"\\\",\\\"pattern1X:num\\\":\\\"+0\\\",\\\"pattern1Y:num\\\":\\\"+0\\\",\\\"Pattern2\\\":\\\"\\\",\\\"pattern2X:num\\\":\\\"+0\\\",\\\"pattern2Y:num\\\":\\\"+0\\\",\\\"Pattern3\\\":\\\"(Unused by Default)\\\",\\\"pattern3X:num\\\":\\\"+0\\\",\\\"pattern3Y:num\\\":\\\"+0\\\",\\\"Pattern4\\\":\\\"(Unused by Default)\\\",\\\"pattern4X:num\\\":\\\"+0\\\",\\\"pattern4Y:num\\\":\\\"+0\\\",\\\"Pattern5\\\":\\\"(Unused by Default)\\\",\\\"pattern5X:num\\\":\\\"+0\\\",\\\"pattern5Y:num\\\":\\\"+0\\\",\\\"Pattern6\\\":\\\"(Unused by Default)\\\",\\\"pattern6X:num\\\":\\\"+0\\\",\\\"pattern6Y:num\\\":\\\"+0\\\",\\\"Pattern7\\\":\\\"(Unused by Default)\\\",\\\"pattern7X:num\\\":\\\"+0\\\",\\\"pattern7Y:num\\\":\\\"+0\\\",\\\"Pattern8\\\":\\\"(Unused by Default)\\\",\\\"pattern8X:num\\\":\\\"+0\\\",\\\"pattern8Y:num\\\":\\\"+0\\\",\\\"Pattern9\\\":\\\"(Unused by Default)\\\",\\\"pattern9X:num\\\":\\\"+0\\\",\\\"pattern9Y:num\\\":\\\"+0\\\",\\\"Pattern10\\\":\\\"(Unused by Default)\\\",\\\"pattern10X:num\\\":\\\"+0\\\",\\\"pattern10Y:num\\\":\\\"+0\\\"}\"}"}
 * 
 * @param HandOffset:struct
 * @text Hand Position Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-12\",\"pattern0Y:num\":\"+14\",\"Pattern1\":\"\",\"pattern1X:num\":\"-12\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-12\",\"pattern2Y:num\":\"+18\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"+4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-2\",\"pattern0Y:num\":\"+16\",\"Pattern1\":\"\",\"pattern1X:num\":\"-4\",\"pattern1Y:num\":\"+16\",\"Pattern2\":\"\",\"pattern2X:num\":\"-6\",\"pattern2Y:num\":\"+16\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+12\",\"pattern0Y:num\":\"-18\",\"Pattern1\":\"\",\"pattern1X:num\":\"+12\",\"pattern1Y:num\":\"-16\",\"Pattern2\":\"\",\"pattern2X:num\":\"+12\",\"pattern2Y:num\":\"-14\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param VsDashOffset:struct
 * @text VS8 Dash Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions for VS8 sprites while dashing.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param VsJumpOffset:struct
 * @text VS8 Jump Offsets
 * @parent Map:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for hand positions for VS8 sprites while jumping.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param Battle:struct
 * @text Battle Lighting Settings
 * @type struct<Battle>
 * @desc Lighting settings for the battle scene.
 * Requires VisuMZ_1_BattleCore!
 * @default {"General":"","Enable:eval":"true","ActorDefaults":"","ActorRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"64\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","ActorRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","ActorAutoRadius:eval":"true","EnemyDefaults":"","EnemyRadial:struct":"{\"General\":\"\",\"enabled:eval\":\"true\",\"Properties\":\"\",\"filename:str\":\"\",\"color:str\":\"#ffffff\",\"radius:num\":\"64\",\"intensity:num\":\"0.15\",\"Optional\":\"\",\"angle:num\":\"0\",\"rotateSpeed:num\":\"+0\",\"blendMode:num\":\"3\",\"opacity:num\":\"128\",\"Offsets\":\"\",\"offsetX:num\":\"+0\",\"offsetY:num\":\"+0\"}","EnemyRadialBehavior:struct":"{\"Blink\":\"\",\"blinkRate:num\":\"0.00\",\"blinkModifier:num\":\"-0.50\",\"Flicker\":\"\",\"flickerRate:num\":\"0.00\",\"flickerModifier:num\":\"-0.50\",\"Flash\":\"\",\"flashRate:num\":\"0.00\",\"flashModifier:num\":\"+0.50\",\"Flare\":\"\",\"flareRate:num\":\"0.00\",\"flareModifier:num\":\"+0.50\",\"Glow\":\"\",\"glowRate:num\":\"0.00\",\"glowSpeed:num\":\"0.10\",\"glowRng:eval\":\"true\",\"Pulse\":\"\",\"pulseRate:num\":\"0.00\",\"pulseSpeed:num\":\"0.10\",\"pulseRng:eval\":\"true\",\"Pattern\":\"\",\"patternName:str\":\"none\",\"pattern:str\":\"\",\"patternDelay:num\":\"6\"}","EnemyAutoRadius:eval":"true"}
 *
 * @param AntiLight:struct
 * @text Anti-Light Settings
 * @type struct<AntiLight>
 * @desc Settings to determine default anti-light tile markers.
 * @default {"Hard":"","HardRegions:arraynum":"[]","HardTerrainTags:arraynum":"[]","Soft":"","SoftRegions:arraynum":"[]","SoftTerrainTags:arraynum":"[]"}
 *
 * @param AutoLight:struct
 * @text Auto-Light Regions
 * @type struct<AutoLight>
 * @desc Light up specific parts of the map with regions.
 * @default {"opacity100:arraynum":"[]","opacity95:arraynum":"[]","opacity90:arraynum":"[]","opacity85:arraynum":"[]","opacity80:arraynum":"[]","opacity75:arraynum":"[]","opacity70:arraynum":"[]","opacity65:arraynum":"[]","opacity60:arraynum":"[]","opacity55:arraynum":"[]","opacity50:arraynum":"[]","opacity45:arraynum":"[]","opacity40:arraynum":"[]","opacity35:arraynum":"[]","opacity30:arraynum":"[]","opacity25:arraynum":"[]","opacity20:arraynum":"[]","opacity15:arraynum":"[]","opacity10:arraynum":"[]","opacity5:arraynum":"[]"}
 *
 * @param PresetColors:struct
 * @text Preset Colors Settings
 * @type struct<PresetColors>
 * @desc Preset Color settings for this plugin.
 * @default {"Daytime":"","dawn:str":"#5674b9","day:str":"#ffffff","dusk:str":"#f7941d","night:str":"#2e3192","Greyscale":"","white:str":"#ffffff","light grey:str":"#aaaaaa","grey:str":"#888888","dark grey:str":"#444444","black:str":"#000000","Reds":"","light red:str":"#f69679","red:str":"#ff0000","dark red:str":"#790000","Oranges":"","light orange:str":"#fdc689","orange:str":"#f7941d","dark orange:str":"#7d4900","Yellows":"","light yellow:str":"#fff799","yellow:str":"#ffff00","dark yellow:str":"#827b00","Greens":"","light green:str":"#a3d39c","green:str":"#00ff00","dark green:str":"#005e20","Cyans":"","light cyan:str":"#7accc8","cyan:str":"#00ffff","dark cyan:str":"#005952","Blues":"","light blue:str":"#ace4fa","blue:str":"#0000ff","dark blue:str":"#003663","Purples":"","light purple:str":"#a186be","purple:str":"#92278f","dark purple:str":"#32004b","Magentas":"","light magenta:str":"#bd8cbf","magenta:str":"#ff00ff","dark magenta:str":"#7b0046","Pinks":"","light pink:str":"#f49ac1","pink:str":"#f06eaa","dark pink:str":"#9e0039","Browns":"","light brown:str":"#c69c6d","brown:str":"#8c6239","dark brown:str":"#603913","Misc":"","normal:str":"#ffffff","none:str":"#ffffff","dark:str":"#000000","null:str":"#000000"}
 *
 * @param Options:struct
 * @text Options Menu Settings
 * @type struct<Options>
 * @desc Lighting settings for the options scene.
 * @default {"Options":"","AdjustRect:eval":"true","BlinkingLights":"","AddBlinkingLights:eval":"true","BlinkingLightsName:str":"Blinking Lights","PulsingLights":"","AddPulsingLights:eval":"true","PulsingLightsName:str":"Pulsing Lights"}
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
 * Map Lighting Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Map:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable For Map?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Lighting Effects for map?
 * @default true
 *
 * @param ShakeBuffer:num
 * @text Shake Buffer
 * @parent General
 * @type number
 * @desc Screen shakes reveal more of the screen than normal.
 * How many pixels of buffer should you provide?
 * @default 80
 *
 * @param PlayerDefaults
 * @text Player Defaults
 * 
 * @param PlayerRadial:struct
 * @text Radial Light
 * @parent PlayerDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param PlayerRadialBehavior:struct
 * @text Default Behavior
 * @parent PlayerRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for the player radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param PlayerConical:struct
 * @text Conical Light
 * @parent PlayerDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for the player.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"true","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param PlayerConicalBehavior:struct
 * @text Default Behavior
 * @parent PlayerConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for the player conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param FollowerDefaults
 * @text Follower Defaults
 * 
 * @param FollowerRadial:struct
 * @text Radial Light
 * @parent FollowerDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","radius:num":"216","color:str":"#ffffff","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param FollowerRadialBehavior:struct
 * @text Default Behavior
 * @parent FollowerRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for follower radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param FollowerConical:struct
 * @text Conical Light
 * @parent FollowerDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for followers.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param FollowerConicalBehavior:struct
 * @text Default Behavior
 * @parent FollowerConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for follower conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param EventDefaults
 * @text Event Defaults
 * 
 * @param EventRadial:struct
 * @text Radial Light
 * @parent EventDefaults
 * @type struct<Radial>
 * @desc Default radial light settings for events.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","radius:num":"72","color:str":"#ffffff","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"255","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EventRadialBehavior:struct
 * @text Default Behavior
 * @parent EventRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for event radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param EventConical:struct
 * @text Conical Light
 * @parent EventDefaults
 * @type struct<Conical>
 * @desc Default conical light settings for events.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"240","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"6","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","followMouse:eval":"false","useHandOffset:eval":"true","forceDirection:num":"0","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EventConicalBehavior:struct
 * @text Default Behavior
 * @parent EventConical:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for event conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param Vehicles
 * 
 * @param Boat
 * @parent Vehicles
 *
 * @param BoatBoarded
 * @text Boarded
 * @parent Boat
 * 
 * @param BoatBoardedRadialSettings:struct
 * @text Radial Light
 * @parent BoatBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"240","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent BoatBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatBoardedConicalSettings:struct
 * @text Conical Light
 * @parent BoatBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent BoatBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent BoatBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param BoatUnboarded
 * @text Unboarded
 * @parent Boat
 * 
 * @param BoatUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent BoatUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent BoatUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent BoatUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"360","miniRadius:num":"8","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"60","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param BoatUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent BoatUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param BoatUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent BoatUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"-23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+23\",\"pattern0Y:num\":\"-8\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"-8\",\"Pattern2\":\"\",\"pattern2X:num\":\"+23\",\"pattern2Y:num\":\"-8\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param Ship
 * @parent Vehicles
 *
 * @param ShipBoarded
 * @text Boarded
 * @parent Ship
 * 
 * @param ShipBoardedRadialSettings:struct
 * @text Radial Light
 * @parent ShipBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"300","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"160","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent ShipBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipBoardedConicalSettings:struct
 * @text Conical Light
 * @parent ShipBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent ShipBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent ShipBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param ShipUnboarded
 * @text Unboarded
 * @parent Ship
 * 
 * @param ShipUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent ShipUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent ShipUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent ShipUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"480","miniRadius:num":"16","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"75","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ShipUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent ShipUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param ShipUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent ShipUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+23\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+24\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+23\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"-24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"-24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"-24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+24\",\"pattern0Y:num\":\"+6\",\"Pattern1\":\"\",\"pattern1X:num\":\"+24\",\"pattern1Y:num\":\"+7\",\"Pattern2\":\"\",\"pattern2X:num\":\"+24\",\"pattern2Y:num\":\"+6\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"-24\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"-23\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"-24\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 * 
 * @param Airship
 * @parent Vehicles
 *
 * @param AirshipBoarded
 * @text Boarded
 * @parent Airship
 * 
 * @param AirshipBoardedRadialSettings:struct
 * @text Radial Light
 * @parent AirshipBoarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"360","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"192","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipBoardedRadialBehavior:struct
 * @text Default Behavior
 * @parent AirshipBoardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipBoardedConicalSettings:struct
 * @text Conical Light
 * @parent AirshipBoarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipBoardedConicalBehavior:struct
 * @text Default Behavior
 * @parent AirshipBoardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipBoardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent AirshipBoardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 * @param AirshipUnboarded
 * @text Unboarded
 * @parent Airship
 * 
 * @param AirshipUnboardedRadialSettings:struct
 * @text Radial Light
 * @parent AirshipUnboarded
 * @type struct<Radial>
 * @desc Default radial light settings for this vehicle.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"72","intensity:num":"0.50","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"64","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipUnboardedRadialBehavior:struct
 * @text Default Behavior
 * @parent AirshipUnboardedRadialSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipUnboardedConicalSettings:struct
 * @text Conical Light
 * @parent AirshipUnboarded
 * @type struct<Conical>
 * @desc Default conical light settings for this vehicle.
 * @default {"General":"","enabled:eval":"false","Properties":"","filename:str":"","fileAngleOffset:num":"0","fileAnchorX:num":"0.5","fileAnchorY:num":"0.5","color:str":"#ffffff","radius:num":"600","miniRadius:num":"32","intensity:num":"0.25","Optional":"","blendMode:num":"3","opacity:num":"255","AngleSettings":"","angle:num":"90","angleSway:num":"0","swaySpeed:num":"0.03","swayRng:eval":"true","Direction":"","forceDirection:num":"0","followMouse:eval":"true","useHandOffset:eval":"true","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param AirshipUnboardedConicalBehavior:struct
 * @text Default Behavior
 * @parent AirshipUnboardedConicalSettings:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for these conical lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 * 
 * @param AirshipUnboardedConicalOffset:struct
 * @text "Hand" Offsets
 * @parent AirshipUnboardedConicalSettings:struct
 * @type struct<HandOffset>
 * @desc Default offsets used for the "hand" positions of this vehicle.
 * @default {"StandardDirections":"","dir2:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir4:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir6:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir8:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+1\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+1\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","DiagonalDirections":"","dir1:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir3:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir7:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}","dir9:struct":"{\"Pattern0\":\"\",\"pattern0X:num\":\"+0\",\"pattern0Y:num\":\"+0\",\"Pattern1\":\"\",\"pattern1X:num\":\"+0\",\"pattern1Y:num\":\"+0\",\"Pattern2\":\"\",\"pattern2X:num\":\"+0\",\"pattern2Y:num\":\"+0\",\"Pattern3\":\"(Unused by Default)\",\"pattern3X:num\":\"+0\",\"pattern3Y:num\":\"+0\",\"Pattern4\":\"(Unused by Default)\",\"pattern4X:num\":\"+0\",\"pattern4Y:num\":\"+0\",\"Pattern5\":\"(Unused by Default)\",\"pattern5X:num\":\"+0\",\"pattern5Y:num\":\"+0\",\"Pattern6\":\"(Unused by Default)\",\"pattern6X:num\":\"+0\",\"pattern6Y:num\":\"+0\",\"Pattern7\":\"(Unused by Default)\",\"pattern7X:num\":\"+0\",\"pattern7Y:num\":\"+0\",\"Pattern8\":\"(Unused by Default)\",\"pattern8X:num\":\"+0\",\"pattern8Y:num\":\"+0\",\"Pattern9\":\"(Unused by Default)\",\"pattern9X:num\":\"+0\",\"pattern9Y:num\":\"+0\",\"Pattern10\":\"(Unused by Default)\",\"pattern10X:num\":\"+0\",\"pattern10Y:num\":\"+0\"}"}
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Lighting Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Battle:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable For Battle?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable Lighting Effects for battles?
 * Requires VisuMZ_1_BattleCore!
 * @default true
 * 
 * @param ActorDefaults
 * @text Actor Defaults
 * 
 * @param ActorRadial:struct
 * @text Battle Light
 * @parent ActorDefaults
 * @type struct<Radial>
 * @desc Default battle-radial light settings for actors.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param ActorRadialBehavior:struct
 * @text Default Behavior
 * @parent ActorRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for actor radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param ActorAutoRadius:eval
 * @text Auto-Calc Radius
 * @parent ActorRadial:struct
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height. Ignore if use <Radial Light Radius: x>.
 * @default true
 * 
 * @param EnemyDefaults
 * @text Enemy Defaults
 * 
 * @param EnemyRadial:struct
 * @text Battle Light
 * @parent EnemyDefaults
 * @type struct<Radial>
 * @desc Default battle-radial light settings for enemies.
 * @default {"General":"","enabled:eval":"true","Properties":"","filename:str":"","color:str":"#ffffff","radius:num":"64","intensity:num":"0.15","Optional":"","angle:num":"0","rotateSpeed:num":"+0","blendMode:num":"3","opacity:num":"128","Offsets":"","offsetX:num":"+0","offsetY:num":"+0"}
 * 
 * @param EnemyRadialBehavior:struct
 * @text Default Behavior
 * @parent EnemyRadial:struct
 * @type struct<Behavior>
 * @desc What are the default behavioral settings for enemy radial lights?
 * @default {"Blink":"","blinkRate:num":"0.00","blinkModifier:num":"-0.50","Flicker":"","flickerRate:num":"0.00","flickerModifier:num":"-0.50","Flash":"","flashRate:num":"0.00","flashModifier:num":"+0.50","Flare":"","flareRate:num":"0.00","flareModifier:num":"+0.50","Glow":"","glowRate:num":"0.00","glowSpeed:num":"0.10","glowRng:eval":"true","Pulse":"","pulseRate:num":"0.00","pulseSpeed:num":"0.10","pulseRng:eval":"true","Pattern":"","patternName:str":"none","pattern:str":"","patternDelay:num":"6"}
 *
 * @param EnemyAutoRadius:eval
 * @text Auto-Calc Radius
 * @parent EnemyRadial:struct
 * @type boolean
 * @on Calculate Radius
 * @off Use Default Radius
 * @desc Automatically calculates the radius size based on sprite's
 * width/height. Ignore if use <Radial Light Radius: x>.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Anti-Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AntiLight:
 *
 * @param Hard
 * @text Hard Edges
 *
 * @param HardRegions:arraynum
 * @text Regions
 * @parent Hard
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 255.
 * @default []
 *
 * @param HardTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Hard
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 7.
 * @default []
 *
 * @param Soft
 * @text Soft Edges
 *
 * @param SoftRegions:arraynum
 * @text Regions
 * @parent Soft
 * @type number[]
 * @min 1
 * @max 255
 * @desc Which regions by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 255.
 * @default []
 *
 * @param SoftTerrainTags:arraynum
 * @text Terrain Tags
 * @parent Soft
 * @type number[]
 * @min 1
 * @max 7
 * @desc Which terrain tags by default apply anti-light?
 * 0 is ignored. Use a number from 1 to 7.
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Auto-Light Regions Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoLight:
 *
 * @param opacity100:arraynum
 * @text Opacity - 100%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity95:arraynum
 * @text Opacity - 95%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity90:arraynum
 * @text Opacity - 90%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity85:arraynum
 * @text Opacity - 85%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity80:arraynum
 * @text Opacity - 80%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity75:arraynum
 * @text Opacity - 75%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity70:arraynum
 * @text Opacity - 70%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity65:arraynum
 * @text Opacity - 65%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity60:arraynum
 * @text Opacity - 60%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity55:arraynum
 * @text Opacity - 55%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity50:arraynum
 * @text Opacity - 50%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity45:arraynum
 * @text Opacity - 45%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity40:arraynum
 * @text Opacity - 40%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity35:arraynum
 * @text Opacity - 35%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity30:arraynum
 * @text Opacity - 30%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity25:arraynum
 * @text Opacity - 25%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity20:arraynum
 * @text Opacity - 20%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity15:arraynum
 * @text Opacity - 15%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity10:arraynum
 * @text Opacity - 10%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 * @param opacity5:arraynum
 * @text Opacity - 5%
 * @type number[]
 * @min 1
 * @max 255
 * @desc Mark the regions with this opacity level.
 * Light color will be white. Use Region ID's (1 to 255).
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Preset Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PresetColors:
 *
 * @param Daytime
 * @text Daytime Colors
 *
 * @param dawn:str
 * @text Dawn
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #5674b9
 *
 * @param day:str
 * @text Day
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param dusk:str
 * @text Dusk
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f7941d
 *
 * @param night:str
 * @text Night
 * @parent Daytime
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #2e3192
 *
 * @param Greyscale
 * @text Greyscale Colors
 *
 * @param white:str
 * @text White
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param light grey:str
 * @text Light Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #aaaaaa
 *
 * @param grey:str
 * @text Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #888888
 *
 * @param dark grey:str
 * @text Dark Grey
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #444444
 *
 * @param black:str
 * @text Black
 * @parent Greyscale
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @param Reds
 * @text Red Colors
 *
 * @param light red:str
 * @text Light Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f69679
 *
 * @param red:str
 * @text Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ff0000
 *
 * @param dark red:str
 * @text Dark Red
 * @parent Reds
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #790000
 *
 * @param Oranges
 * @text Orange Colors
 *
 * @param light orange:str
 * @text Light Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #fdc689
 *
 * @param orange:str
 * @text Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f7941d
 *
 * @param dark orange:str
 * @text Dark Orange
 * @parent Oranges
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7d4900
 *
 * @param Yellows
 * @text Yellow Colors
 *
 * @param light yellow:str
 * @text Light Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #fff799
 *
 * @param yellow:str
 * @text Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffff00
 *
 * @param dark yellow:str
 * @text Dark Yellow
 * @parent Yellows
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #827b00
 *
 * @param Greens
 * @text Green Colors
 *
 * @param light green:str
 * @text Light Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #a3d39c
 *
 * @param green:str
 * @text Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #00ff00
 *
 * @param dark green:str
 * @text Dark Green
 * @parent Greens
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #005e20
 *
 * @param Cyans
 * @text Cyan Colors
 *
 * @param light cyan:str
 * @text Light Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7accc8
 *
 * @param cyan:str
 * @text Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #00ffff
 *
 * @param dark cyan:str
 * @text Dark Cyan
 * @parent Cyans
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #005952
 *
 * @param Blues
 * @text Blue Colors
 *
 * @param light blue:str
 * @text Light Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ace4fa
 *
 * @param blue:str
 * @text Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #0000ff
 *
 * @param dark blue:str
 * @text Dark Blue
 * @parent Blues
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #003663
 *
 * @param Purples
 * @text Purple Colors
 *
 * @param light purple:str
 * @text Light Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #a186be
 *
 * @param purple:str
 * @text Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #92278f
 *
 * @param dark purple:str
 * @text Dark Purple
 * @parent Purples
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #32004b
 *
 * @param Magentas
 * @text Magenta Colors
 *
 * @param light magenta:str
 * @text Light Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #bd8cbf
 *
 * @param magenta:str
 * @text Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ff00ff
 *
 * @param dark magenta:str
 * @text Dark Magenta
 * @parent Magentas
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #7b0046
 *
 * @param Pinks
 * @text Pink Colors
 *
 * @param light pink:str
 * @text Light Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f49ac1
 *
 * @param pink:str
 * @text Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #f06eaa
 *
 * @param dark pink:str
 * @text Dark Pink
 * @parent Pinks
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #9e0039
 *
 * @param Browns
 * @text Brown Colors
 *
 * @param light brown:str
 * @text Light Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #c69c6d
 *
 * @param brown:str
 * @text Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #8c6239
 *
 * @param dark brown:str
 * @text Dark Brown
 * @parent Browns
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #603913
 *
 * @param Misc
 * @text Misc Colors
 *
 * @param normal:str
 * @text Normal
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param none:str
 * @text None
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #ffffff
 *
 * @param dark:str
 * @text Dark
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 * @param null:str
 * @text Null
 * @parent Misc
 * @desc Preset's hex color in #rrggbb format.
 * Check your color here: https://htmlcolorcodes.com/
 * @default #000000
 *
 */
/* ----------------------------------------------------------------------------
 * Options Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Options:
 *
 * @param Options
 * @text Options
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param BlinkingLights
 * @text Blinking Lights
 *
 * @param AddBlinkingLights:eval
 * @text Add Option?
 * @parent BlinkingLights
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Blinking Lights' option to the Options menu?
 * @default true
 *
 * @param BlinkingLightsName:str
 * @text Option Name
 * @parent BlinkingLights
 * @desc Command name of the option.
 * @default Blinking Lights
 *
 * @param PulsingLights
 * @text Pulsing Lights
 *
 * @param AddPulsingLights:eval
 * @text Add Option?
 * @parent PulsingLights
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Pulsing Lights' option to the Options menu?
 * @default true
 *
 * @param PulsingLightsName:str
 * @text Option Name
 * @parent PulsingLights
 * @desc Command name of the option.
 * @default Pulsing Lights
 *
 */
/* ----------------------------------------------------------------------------
 * Radial Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Radial:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Is this radial light enabled?
 * @default true
 *
 * @param Properties
 *
 * @param filename:str
 * @text Filename
 * @parent Properties
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for the light effect image.
 * If used, ignore Color, Radius, and Intensity.
 * @default 
 *
 * @param color:str
 * @text Color
 * @parent Properties
 * @desc Color of the radial light in #rrggbb format.
 * For generated lights only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Properties
 * @type number
 * @min 1
 * @desc What is the radius of this radial light?
 * For generated lights only. Ignore if using image.
 * @default 72
 *
 * @param intensity:num
 * @text Intensity
 * @parent Properties
 * @desc Radial light intensity. Use value between 0 & 1.
 * For generated lights only. Ignore if using image.
 * @default 0.50
 *
 * @param Optional
 * 
 * @param angle:num
 * @text Angle
 * @parent Optional
 * @type number
 * @min 0
 * @max 360
 * @desc What is the angle of this radial light?
 * Only noticeable with using images.
 * @default 0
 * 
 * @param rotateSpeed:num
 * @text Rotate Speed
 * @parent angle:num
 * @type number
 * @desc The rotation speed of this light?
 * Lower: slower. Higher: faster. Negative: reverse.
 * @default +0
 *
 * @param blendMode:num
 * @text Blend Mode
 * @parent Optional
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the radial light?
 * @default 3
 *
 * @param opacity:num
 * @text Opacity
 * @parent Optional
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity (0 to 255)?
 * Lower: dimmer. Higher: Brighter.
 * @default 255
 *
 * @param Offsets
 *
 * @param offsetX:num
 * @text Offset X
 * @parent Offsets
 * @desc Offset the X position of this light.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y
 * @parent Offsets
 * @desc Offset the Y position of this light.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Conical Light Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Conical:
 *
 * @param General
 *
 * @param enabled:eval
 * @text Enabled?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Is this conical light enabled?
 * @default true
 *
 * @param Properties
 *
 * @param filename:str
 * @text Filename
 * @parent Properties
 * @type file
 * @dir img/pictures/
 * @require 1
 * @desc Filename used for the light effect image.
 * If used, ignore Color, Radius, and Intensity.
 * @default 
 * 
 * @param fileAngleOffset:num
 * @text Angle Offset
 * @parent filename:str
 * @type number
 * @min 0
 * @max 360
 * @desc Offset the image angle by this many degrees.
 * Only applies to images.
 * @default 0
 *
 * @param fileAnchorX:num
 * @text File Anchor X
 * @parent filename:str
 * @desc Anchor X used for images.
 * Left: 0.0; Center: 0.5; Right: 1.0
 * @default 0.5
 *
 * @param fileAnchorY:num
 * @text File Anchor Y
 * @parent filename:str
 * @desc Anchor Y used for images.
 * Top: 0.0; Middle: 0.5; Bottom: 1.0
 * @default 0.5
 *
 * @param color:str
 * @text Color
 * @parent Properties
 * @desc Color of the conical light in #rrggbb format.
 * For generated lights only. Ignore if using image.
 * @default #ffffff
 *
 * @param radius:num
 * @text Radius
 * @parent Properties
 * @type number
 * @min 1
 * @desc What is the radius of this conical light?
 * For generated lights only. Ignore if using image.
 * @default 240
 *
 * @param miniRadius:num
 * @text Source Radius
 * @parent radius:num
 * @type number
 * @min 1
 * @desc What is the radius of this light source?
 * For generated lights only. Ignore if using image.
 * @default 8
 *
 * @param intensity:num
 * @text Intensity
 * @parent Properties
 * @desc Conical light intensity. Use value between 0 & 1.
 * For generated lights only. Ignore if using image.
 * @default 0.25
 *
 * @param Optional
 *
 * @param blendMode:num
 * @text Blend Mode
 * @parent Optional
 * @type select
 * @option 0 - Normal
 * @value 0
 * @option 1 - Additive
 * @value 1
 * @option 2 - Multiply
 * @value 2
 * @option 3 - Screen
 * @value 3
 * @desc What kind of blend mode do you wish to apply to the conical light?
 * @default 3
 *
 * @param opacity:num
 * @text Opacity
 * @parent Optional
 * @type number
 * @min 0
 * @max 255
 * @desc What is the opacity (0 to 255)?
 * Lower: dimmer. Higher: Brighter.
 * @default 255
 *
 * @param AngleSettings
 * @text Angle
 * 
 * @param angle:num
 * @text Arc Angle
 * @parent AngleSettings
 * @type number
 * @min 0
 * @max 360
 * @desc What is the angle of this conical light's arc?
 * @default 60
 * 
 * @param angleSway:num
 * @text Angle Sway
 * @parent AngleSettings
 * @type number
 * @desc How many degrees should this light sway?
 * Use 0 for no sway.
 * @default 6
 * 
 * @param swaySpeed:num
 * @text Sway Speed
 * @parent AngleSettings
 * @type number
 * @desc How fast should this light sway?
 * Lower: Slower; Higher: Faster
 * @default 0.1
 *
 * @param swayRng:eval
 * @text Randomize Sway?
 * @parent AngleSettings
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Change the sway to offset at different starting points?
 * @default true
 *
 * @param Direction
 *
 * @param forceDirection:num
 * @text Forced Direction?
 * @parent Direction
 * @type select
 * @option none
 * @value 0
 * @option lower left
 * @value 1
 * @option down
 * @value 2
 * @option lower right
 * @value 3
 * @option left
 * @value 4
 * @option right
 * @value 6
 * @option upper left
 * @value 7
 * @option up
 * @value 8
 * @option upper right
 * @value 9
 * @desc Force the conical light to face a certain direction?
 * @default 0
 *
 * @param followMouse:eval
 * @text Follow Cursor?
 * @parent Direction
 * @type boolean
 * @on Follow Mouse
 * @off Don't Follow
 * @desc Follow the mouse cursor?
 * @default false
 *
 * @param Offsets
 *
 * @param useHandOffset:eval
 * @text Use Hand Offset?
 * @parent Offsets
 * @type boolean
 * @on Hand Offset
 * @off Center Offset
 * @desc Put the light source on the target's "hand" position? Disables the two settings below if on.
 * @default true
 *
 * @param offsetX:num
 * @text Offset X (Non-Hand)
 * @parent Offsets
 * @desc Offset the X position of this light.
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param offsetY:num
 * @text Offset Y (Non-Hand)
 * @parent Offsets
 * @desc Offset the Y position of this light.
 * Negative: up. Positive: down.
 * @default +0
 *
 */
/* ----------------------------------------------------------------------------
 * Light Behavior Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Behavior:
 *
 * @param Blink
 *
 * @param blinkRate:num
 * @text Blink Rate
 * @parent Blink
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param blinkModifier:num
 * @text Blink Modifier
 * @parent Blink
 * @desc Static multiplicative opacity modifier. Before additive.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default -0.50
 *
 * @param Flicker
 *
 * @param flickerRate:num
 * @text Flicker Rate
 * @parent Flicker
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flickerModifier:num
 * @text Flicker Modifier
 * @parent Flicker
 * @desc Random multiplicative opacity modifier. Before additive.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default -0.50
 *
 * @param Flash
 *
 * @param flashRate:num
 * @text Flash Rate
 * @parent Flash
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flashModifier:num
 * @text Flash Modifier
 * @parent Flash
 * @desc Static additive opacity modifier. Before multiplicative.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default +0.50
 *
 * @param Flare
 *
 * @param flareRate:num
 * @text Flare Rate
 * @parent Flare
 * @desc What is the rate of occurance for this effect?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param flareModifier:num
 * @text Flare Modifier
 * @parent Flare
 * @desc Random additive opacity modifier. Before multiplicative.
 * Use a decimal number between -1 and 1. Negatives allowed.
 * @default +0.50
 * 
 * @param Glow
 *
 * @param glowRate:num
 * @text Glow Rate
 * @parent Glow
 * @desc What is the glow change for this light?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param glowSpeed:num
 * @text Glow Speed
 * @parent Glow
 * @desc What is the speed at which glow oscillates at?
 * Use a decimal number between 0 and 1.
 * @default 0.10
 *
 * @param glowRng:eval
 * @text Randomize Glow?
 * @parent Glow
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Offset the glow to oscillate at different starting points?
 * @default true
 * 
 * @param Pulse
 *
 * @param pulseRate:num
 * @text Pulse Rate
 * @parent Pulse
 * @desc What is the pulse change for this light?
 * Use a decimal number between 0 and 1.
 * @default 0.00
 *
 * @param pulseSpeed:num
 * @text Pulse Speed
 * @parent Pulse
 * @desc What is the speed at which pulse oscillates at?
 * Use a decimal number between 0 and 1.
 * @default 0.10
 *
 * @param pulseRng:eval
 * @text Randomize Pulse?
 * @parent Pulse
 * @type boolean
 * @on Randomize
 * @off Structured
 * @desc Offset the pulse to oscillate at different starting points?
 * @default true
 * 
 * @param Pattern
 *
 * @param patternName:str
 * @text Pattern Name
 * @parent Pattern
 * @type select
 * @option none
 * @option normal
 * @option fluorescent
 * @option halogen
 * @option incandescent
 * @option candle
 * @option torch
 * @option campfire
 * @option fast strobe
 * @option slow strobe
 * @option strong pulse
 * @option medium pulse
 * @option slow pulse
 * @option underwater
 * @desc Select the pattern name for this light.
 * Ignore if using any Custom Pattern.
 * @default none
 *
 * @param pattern:str
 * @text Custom Pattern
 * @parent Pattern
 * @desc Create a custom pattern with letters from a to z.
 * Where 'a' is transparent and 'z' is opaque.
 * @default 
 *
 * @param patternDelay:num
 * @text Frame Delay
 * @parent Pattern
 * @type number
 * @min 1
 * @desc What is the frame delay between pattern updates?
 * @default 6
 *
 */
/* ----------------------------------------------------------------------------
 * Hand Offsets Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HandOffset:
 * 
 * @param StandardDirections
 * @text Standard Directions
 * 
 * @param dir2:struct
 * @text Down
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"-12","pattern0Y:num":"+14","Pattern1":"","pattern1X:num":"-12","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"-12","pattern2Y:num":"+18","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir4:struct
 * @text Left
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+2","pattern0Y:num":"+16","Pattern1":"","pattern1X:num":"+4","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"+6","pattern2Y:num":"+16","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir6:struct
 * @text Right
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"-2","pattern0Y:num":"+16","Pattern1":"","pattern1X:num":"-4","pattern1Y:num":"+16","Pattern2":"","pattern2X:num":"-6","pattern2Y:num":"+16","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir8:struct
 * @text Up
 * @parent StandardDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+12","pattern0Y:num":"-18","Pattern1":"","pattern1X:num":"+12","pattern1Y:num":"-16","Pattern2":"","pattern2X:num":"+12","pattern2Y:num":"-14","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param DiagonalDirections
 * @text Diagonal Directions
 * 
 * @param dir1:struct
 * @text Lower Left
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir3:struct
 * @text Lower Right
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir7:struct
 * @text Upper Left
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 * 
 * @param dir9:struct
 * @text Upper Right
 * @parent DiagonalDirections
 * @type struct<PatternOffset>
 * @desc Offsets to determine conical light source position when facing this direction.
 * @default {"Pattern0":"","pattern0X:num":"+0","pattern0Y:num":"+0","Pattern1":"","pattern1X:num":"+0","pattern1Y:num":"+0","Pattern2":"","pattern2X:num":"+0","pattern2Y:num":"+0","Pattern3":"(Unused by Default)","pattern3X:num":"+0","pattern3Y:num":"+0","Pattern4":"(Unused by Default)","pattern4X:num":"+0","pattern4Y:num":"+0","Pattern5":"(Unused by Default)","pattern5X:num":"+0","pattern5Y:num":"+0","Pattern6":"(Unused by Default)","pattern6X:num":"+0","pattern6Y:num":"+0","Pattern7":"(Unused by Default)","pattern7X:num":"+0","pattern7Y:num":"+0","Pattern8":"(Unused by Default)","pattern8X:num":"+0","pattern8Y:num":"+0","Pattern9":"(Unused by Default)","pattern9X:num":"+0","pattern9Y:num":"+0","Pattern10":"(Unused by Default)","pattern10X:num":"+0","pattern10Y:num":"+0"}
 *
 */
/* ----------------------------------------------------------------------------
 * Pattern Offsets Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PatternOffset:
 *
 * @param Pattern0
 * @text Pattern 0
 *
 * @param pattern0X:num
 * @text Offset X
 * @parent Pattern0
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern0Y:num
 * @text Offset Y
 * @parent Pattern0
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern1
 * @text Pattern 1
 *
 * @param pattern1X:num
 * @text Offset X
 * @parent Pattern1
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern1Y:num
 * @text Offset Y
 * @parent Pattern1
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern2
 * @text Pattern 2
 *
 * @param pattern2X:num
 * @text Offset X
 * @parent Pattern2
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern2Y:num
 * @text Offset Y
 * @parent Pattern2
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern3
 * @text Pattern 3
 * @default (Unused by Default)
 *
 * @param pattern3X:num
 * @text Offset X
 * @parent Pattern3
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern3Y:num
 * @text Offset Y
 * @parent Pattern3
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern4
 * @text Pattern 4
 * @default (Unused by Default)
 *
 * @param pattern4X:num
 * @text Offset X
 * @parent Pattern4
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern4Y:num
 * @text Offset Y
 * @parent Pattern4
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern5
 * @text Pattern 5
 * @default (Unused by Default)
 *
 * @param pattern5X:num
 * @text Offset X
 * @parent Pattern5
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern5Y:num
 * @text Offset Y
 * @parent Pattern5
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern6
 * @text Pattern 6
 * @default (Unused by Default)
 *
 * @param pattern6X:num
 * @text Offset X
 * @parent Pattern6
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern6Y:num
 * @text Offset Y
 * @parent Pattern6
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern7
 * @text Pattern 7
 * @default (Unused by Default)
 *
 * @param pattern7X:num
 * @text Offset X
 * @parent Pattern7
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern7Y:num
 * @text Offset Y
 * @parent Pattern7
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern8
 * @text Pattern 8
 * @default (Unused by Default)
 *
 * @param pattern8X:num
 * @text Offset X
 * @parent Pattern8
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern8Y:num
 * @text Offset Y
 * @parent Pattern8
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern9
 * @text Pattern 9
 * @default (Unused by Default)
 *
 * @param pattern9X:num
 * @text Offset X
 * @parent Pattern9
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern9Y:num
 * @text Offset Y
 * @parent Pattern9
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 * @param Pattern10
 * @text Pattern 10
 * @default (Unused by Default)
 *
 * @param pattern10X:num
 * @text Offset X
 * @parent Pattern10
 * @desc What is the offset X for this pattern?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param pattern10Y:num
 * @text Offset Y
 * @parent Pattern10
 * @desc What is the offset Y for this pattern?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
//=============================================================================

const _0x5935ea=_0x102e;function _0x1f70(){const _0x2dfd7d=['EnemyAutoRadius','RadialBehaviorPulseRng','event','RadialBehaviorFlashMod','_app','eventId','_baseSprite','setConicalLightDashOffsets','initLightingEffectsSettings','Duration','LightSpawnNewFollowerLockedLight','Unboarded','tileWidth','addLightingEffectsPulsingLightsCommand','isAirship','light\x20red','includes','brown','isLoopVertical','setupRadialLight','ConicalLightChangeShipSettings','ConicalLightOffset','dark','#888888','adjustPosition','isPosing','cacheNewData','Spriteset_Base_createUpperLayer','page','LightSpawnNewScreenLockedLight','_softAlphaMask','Spriteset_Base_createLowerLayer','ConfigManager_makeData','updateOpacity','#ffffff','#ff0000','enabled','flashModifier','parse','makeDeepCopy','_pulseRng','originY','TotalSpawns','sepia','_swayRng','applyData','ConicalLightOpacityFlat','isShip','isFollowingPlayer','flareRate','_lastTouchInputX','Opacity','PlayerConicalBehavior','terrainTag','Window_Options_addGeneralOptions','getFollowerConicalLightBehavior','targetColor','lightContainer','antiLightMaskSoftRegions','fileAngleOffset','rgba(','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','LIGHTING_EFFECTS_SMART_AUTO_OPACITY','RadialBehaviorBlinkMod','radialLight','Game_Screen_initialize','setup','light\x20pink','initVehicleLightingEffectsSettings','RadialBehaviorFlickerRate','ConicalBehaviorGlowRng','forceDirection','flickerModifier','padZero','updateCursorAngle','AdjustRect','EventID','RadialLightChangeFollowerSettings','_lastInputTimer','mmnnmmnnnmmnn','shiftLightingOverlayColor','tileHeight','Spriteset_Battle_createBattleField','Sprite_Battler_setBattler','Game_Event_setupPageSettings','_lastTouchInputY','blendMode','push','UnboardedSettings','blinkModifier','normal','1974sSqXme','Sprite_Character_initialize','_scene','follower','ConicalBehaviorGlowSpeed','#bd8cbf','%1%2%3%4','additive','_source','ConicalLightOpacityRate','conicalLightDashOffsets','ConicalLightForceDir','cyan','texture','isUsingMapCoordinates','softRegionIDs','hasAntiLightTiles','getTimeOverlay','createAutoLightBitmap','EventConicalBehavior','createDestination','floor','filename','Behavior','flareModifier','VisuMZ_2_TileGrafterSystem','PulsingLights','ConicalBehaviorFlashMod','_testDummyG','ARRAYNUM','offsetY','RegExp','initMembers','flickerRate','toLowerCase','_radialLightBehavior','conicalLight','setFollowerConicalLightBehavior','hardTerrainTagIDs','5862152cZDebi','ConicalBehaviorPulseRate','setFollowerRadialLightSettings','_antiLightMasks','_originSprite','Game_Event_clearPageSettings','_conicalLightWalkOffsets','night','opacityPatternParser','MULTIPLY','fillStyle','ConicalLightCentralOffset','checkRadialLightBasicStringTags','settings','8304FFAxGB','destroy','addCommand','Options','updateMain','dir%1','hideCharacters','Scene_Options_maxCommands','updateLastInputType','color','ConicalLightBlendMode','Settings','ceil','regionId','pulseRate','createLensFlareSprite','light\x20cyan','ConicalLightFileAnchor','setConicalLightWalkOffsets','isDead','setRadialLightSettings','isUsingTimeOverlay','lightingOverlayOpacityRate','OverlayChangeToCustomColor','day','SoftRegions','isFollowingEvent','right','black','updateBehavior','createAntiLightMaskBitmap','#92278f','#aaaaaa','boxWidth','gray','ARRAYSTRUCT','parseDirectionText','green','RadialLightFilename','EventConical','isSpriteVS8dir','actor','isUseTimeOverlay','pink','_lastEnabled','_lastFilename','destroyLightContainer','pulseSpeed','#444444','SCREEN','aaaaaaaazzzzzzzz','ConicalLightNoFollowMouse','flicker2','autoRadius','ConicalBehaviorBlinkMod','getFollowerRadialLightBehavior','CalcSmartOpacity','patternDelay','setConicalLightJumpOffsets','mmamammmmammamamaaamammma','VisuMZ_1_BattleCore','_autoLightSprite','setSource','PlayerRadialBehavior','RadialLightDiameter','_lastColor','isEnabled','updateBlink','Map','lightSpawns','updateHandPosition','dark\x20magenta','ALLOW_ANTI_LIGHT_MASK','BoardedBehavior','visible','isEventRunning','arrayToHex','_driving','RadialLightTurnOff','15227244UhTdZe','isLoopHorizontal','InitialTime','setupPageSettings','mamamamamama','needsRecreation','RadialBehaviorPulseRate','RadialLightGeneric','_patternIndex','BLEND_MODES','conicalLightOffsets','#a3d39c','create','dark\x20blue','ConicalLightSwayRng','addLightingEffectsOptionCommands','cacheOpacity','dark\x20red','ActorRadial','_lightingEffects','add','strong\x20pulse','createUpperLayer','isDestinationValid','hardAntiLightTerrainTags','PulsingLightsName','screen','RadialBehaviorPulseNoRng','dark\x20purple','_conicalLightDashOffsets','cos','setVehicleLightingConicalOffset','fileAnchorY','_followerConicalLight','slow\x20pulse','setupLightingEffectsSettings','setLightingOverlayOpacity','EventRadialBehavior','createRadialGradient','jklmnopqrstuvwxyzyxwvutsrqponmlkj','_testDummies','getFollowerConicalLightSettings','clone','checkRadialLightBehaviorStringTags','checkLightingEffectsStringTags','hardAntiLightRegionIDs','createLightingEffectsLightSpawns','_realX','_battleField','NORMAL','note','RadialBehaviorBlinkRate','CoordinatesY','allowCharacterAngleUpdate','addGeneralOptions','Enable','swayRng','random','_lastInputDir','#603913','flicker3','ConicalLightChangeFollowerSettings','lightingEffects','_lastAngle','strobe2','dark\x20yellow','OverlayChangeToPreset','ConicalBehaviorPatternPreset','grey','RadialBehaviorPatternUpdateDelay','scale','UpdateFunc','#32004b','ARRAYSTR','#7b0046','length','behaviorData','abcdefghijklmnopqrstuvwxyzyxwvutsrqponmlkjihgfedcba','adjustPositionByTarget','updateOverlayColor','conicalLightJumpOffsets','opacity','pop','opacity%1','initLightingEffects','down','targetOpacity','updateCharacterAngle','setConicalLightSettings','followMouse','LightSpawnNewMapLockedLight','incandescent','isHidden','createLowerLayer','createNewLightSpawn','fillRect','SpawnLights','FollowerConical','useHandOffset','campfire','BattleLightChangeActorSettings','checkConicalLightBasicStringTags','_mainSprite','hexToArray','_overlayColor','createLightSpawnFunction','pulse2','originX','1222355oUIiIb','miniRadius','Game_Actor_setup','round','glowSpeed','createProxySprite','softTerrainTagIDs','Ship','updatePulse','parameters','SpriteMaskFilter','RadialBehaviorGlowSpeed','bitmap','RadialLightChangeShipSettings','ConicalLightFollowMouse','RadialLightIntensity','randomInt','_grafterRefreshRegions','map','#005952','blendModeParser','ExpirationTimer','#003663','antiLightMaskHardRegions','isAntiLightingOverlay','getSourceDirection','updateFlash','abcdefghijklmnopqrrqponmlkjihgfedcba','#f49ac1','Game_Map_update','_vehicleLightingSettings','VisuMZ_2_DateTimeSystem','ConicalLightRadius','ConicalBehaviorFlareRate','createColorSprite','strobe','RadialBehaviorGlowNoRng','FollowerRadial','#f69679','pulse','readFlag','ConvertParams','player','ConicalBehaviorPatternUpdateDelay','candle3','join','ConicalLightAngleSway','createAutoLightRegions','yellow','split','active','isFollowingFollower','_lightSpawns','atan2','enemy','updateLightingEffectsOpacity','ConicalBehaviorPulseSpeed','Spriteset_Map_hideCharacters','call','ConicalLightColor','BoardedSettings','RadialLightRadius','RadialBehaviorFlickerMod','description','LightingEffectsOptions','handOffsetData','RadialLightChangeAirshipSettings','UnboardedOffset','isSceneBattle','test','mmnmmommommnonmmonqnmmo','VsJumpOffset','clamp','Game_Map_setup','height','_hardAntiLightMask','RadialLightOpacityFlat','nmonqnmomnmomomno','hexToRgba','createBitmap','updateAutoLightAreas','isInVehicle','LightingEffects','blinkingLights','maxCommands','updateFlicker','UnboardedBehavior','name','setConicalLightBehavior','setupLightingEffectsCommentTags','ConicalLightSrcRadius','createDefaultLightingEffectsVehicleData','pattern','Game_Enemy_setup','ConicalBehaviorFlareMod','_realY','AutoRadius','list','presetColorParser','addChild','toUpperCase','ActorID','_lastMiniRadius','tileset','type','_lensFlareSprite','setFollowerConicalLightSettings','softAntiLightRegionIDs','ShakeBuffer','#ffff00','CoordinatesX','BlinkingLightsName','smooth','registerCommand','ConicalLightHandOffset','#f7941d','RadialLightChangeBoatSettings','ConicalLightDiameter','Game_Player_initMembers','_testDummyB','abs','pulsingLights','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','STR','ConicalLightAngle','SHAKE_BUFFER','setupLightingEffectsNotetags','EVAL','getLastPluginCommandInterpreter','dark\x20cyan','#000000','#fdc689','constructor','glowRate','exit','angleSway','generateLight','#a186be','createLightContainer','_lastIntensity','ConicalBehaviorPatternSequence','_spriteset','_proxySprite','createLightingEffects','getRadius','status','isJumping','ActorAutoRadius','match','turnTowardPoint','upper\x20right','radius','fast\x20strobe','Color','_conicalLightBehavior','charCodeAt','updateAntiLightMask','getVehicleLightingData','ADD','light\x20magenta','Conical','HardTerrainTags','blinkRate','pow','FollowerIndex','#790000','AddPulsingLights','HardRegions','applyDefaultLightingEffectsVehicleData','fileAnchorX','processLightingEffectsAutoTint','context','ConicalBehaviorPulseRng','VisuMZ_0_CoreEngine','updateLightingEffectsLightSpawns','drawTestDummy','opacityDuration','1295536rYcRTG','updatePattern','LightSpawnExpireSpawnedLights','mmmmmaaaaammmmmaaaaaabcdefgabcdefg','flashRate','leader','_lightContainer','updateAngle','candle1','members','Game_BattlerBase_initMembers','getFollowerRadialLightSettings','_conicalLightJumpOffsets','AddBlinkingLights','ConicalOffsetChangeEvent','createBattleField','updateLensFlareSprite','prototype','RadialLightChangePlayerSettings','moveTo','#c69c6d','processLightingOverlayColor','pattern%1X','drawRadialLight','applyInverse','setupConicalLight','334494BrAFJz','NUM','RadialLightRotateSpeed','followerIndex','setupLightingEffectsSpawns','_glowRng','BlinkingLights','_followerConicalLightBehavior','radialLightBehavior','addChildToLightContainer','_followerRadialLight','#00ffff','canvasToMapY','ARRAYFUNC','expire','softAntiLightTerrainTags','swaySpeed','lightingOverlayOpacity','#ff00ff','candle2','4znDcdF','initialize','light\x20brown','conicalLightWalkOffsets','updateLightingEffectsColor','dark\x20gray','Radial','RadialLightColor','updateLightSpawn','makeData','clearPageSettings','BoardedOffset','ConicalLightChangeAirshipSettings','format','isUsingScreenCoordinates','drawConicalLight','VsDashOffset','AutoTint','addLightingEffects','dawn','time','isLightingEnabled','#%1','#2e3192','_colorSprite','setLightingOverlayColor','left','dusk','return\x200','worldTransform','_softAntiLightMask','upper\x20left','setupBattleLightingEffectsSettings','PlayerConical','_lightSpawnsFunc','SoftTerrainTags','setFollowerRadialLightBehavior','magenta','ConfigManager_applyData','updatePosition','Boat','RadialBehaviorGlowRng','pulseRng','setVehicleLightingData','white','none','FollowerRadialBehavior','rgba(0,0,0,0)','displayX','dark\x20grey','Battle','lightData','addColorStop','arc','createOverlayTexture','_noDarknessOverlay','anchor','_baseTexture','pattern%1Y','angle','code','regionAutoLightOpacity','isPressed','lightingOverlayColor','airship','RetrieveOpacityPattern','beginPath','_testDummyR','ARRAYEVAL','offsetX','filters','createTestDummies','RadialBehaviorPatternPreset','Offset','#827b00','updateBlendMode','isLightVisible','#9e0039','ConicalLightFilename','setBattler','renderer','max','conicalLightBehavior','VisuMZ_2_WeatherEffects','RadialLightOffset','medium\x20pulse','colorDuration','#0000ff','noLightingOverlay','RadialBehaviorFlashRate','_hardAlphaMask','lineTo','_followerRadialLightBehavior','Spriteset_Map_createDestination','VisuMZ_1_EventsMoveCore','light\x20orange','447888FLAHYo','checkConicalLightHandOffsetStringTags','ship','_radialLight','adjustPositionByMap','ConicalOffsetChangeAirship','mmmaaaabcdefgmmmmaaaammmaamm','Game_Screen_update','#005e20','characterName','_conicalLight','mmmaaammmaaammmabcdefaaaammmmabcdefmmmaaaa','hardRegionIDs','_lastRadius','Airship','ConicalLightFileAngleOffset','_lastInputTouch','intensity','ConicalLightTurnOff','checkProperties','startTint','RadialLightCatchAll','blt','orange','#7accc8','updateOverlayRender','ConicalLightSwaySpeed','width','trim','light\x20green','checkLightingEffectsAutoTintPresets','removeChild','RenderTexture','glowRng','frameCount','HandOffset','#00ff00','shiftLightingOverlayOpacity','slow\x20strobe','update','updateFlare','checkConicalLightBehaviorStringTags','Boarded','ConicalLightGeneric','setRadialLightBehavior','rotateSpeed','FUNC'];_0x1f70=function(){return _0x2dfd7d;};return _0x1f70();}function _0x102e(_0x38c1c8,_0x4fc4d7){const _0x1f702f=_0x1f70();return _0x102e=function(_0x102e39,_0x2b9c62){_0x102e39=_0x102e39-0x73;let _0x9b3f44=_0x1f702f[_0x102e39];return _0x9b3f44;},_0x102e(_0x38c1c8,_0x4fc4d7);}(function(_0x25e821,_0x5bea37){const _0x23d245=_0x102e,_0x494c27=_0x25e821();while(!![]){try{const _0x5afd09=parseInt(_0x23d245(0xa3))/0x1+parseInt(_0x23d245(0x89))/0x2+-parseInt(_0x23d245(0x117))/0x3+parseInt(_0x23d245(0xb7))/0x4*(parseInt(_0x23d245(0x291))/0x5)+parseInt(_0x23d245(0x1d6))/0x6*(parseInt(_0x23d245(0x1a1))/0x7)+parseInt(_0x23d245(0x1c8))/0x8+-parseInt(_0x23d245(0x225))/0x9;if(_0x5afd09===_0x5bea37)break;else _0x494c27['push'](_0x494c27['shift']());}catch(_0x362003){_0x494c27['push'](_0x494c27['shift']());}}}(_0x1f70,0x7c2a2));var label=_0x5935ea(0x2e3),tier=tier||0x0,dependencies=[_0x5935ea(0x85),_0x5935ea(0x115)],pluginData=$plugins['filter'](function(_0x33b522){const _0x4977e6=_0x5935ea;return _0x33b522[_0x4977e6(0x322)]&&_0x33b522['description'][_0x4977e6(0x156)]('['+label+']');})[0x0];VisuMZ[label][_0x5935ea(0x1e1)]=VisuMZ[label][_0x5935ea(0x1e1)]||{},VisuMZ[_0x5935ea(0x2ba)]=function(_0x4e868c,_0x41e9b5){const _0x5dbe9d=_0x5935ea;for(const _0x5d69e4 in _0x41e9b5){if(_0x5d69e4[_0x5dbe9d(0x325)](/(.*):(.*)/i)){const _0x10dc3a=String(RegExp['$1']),_0x5d2e89=String(RegExp['$2'])[_0x5dbe9d(0x2f5)]()[_0x5dbe9d(0x133)]();let _0x5de643,_0x1f64b9,_0x370df9;switch(_0x5d2e89){case _0x5dbe9d(0xa4):_0x5de643=_0x41e9b5[_0x5d69e4]!==''?Number(_0x41e9b5[_0x5d69e4]):0x0;break;case _0x5dbe9d(0x1be):_0x1f64b9=_0x41e9b5[_0x5d69e4]!==''?JSON[_0x5dbe9d(0x16c)](_0x41e9b5[_0x5d69e4]):[],_0x5de643=_0x1f64b9[_0x5dbe9d(0x2a3)](_0x455829=>Number(_0x455829));break;case _0x5dbe9d(0x310):_0x5de643=_0x41e9b5[_0x5d69e4]!==''?eval(_0x41e9b5[_0x5d69e4]):null;break;case _0x5dbe9d(0xfb):_0x1f64b9=_0x41e9b5[_0x5d69e4]!==''?JSON[_0x5dbe9d(0x16c)](_0x41e9b5[_0x5d69e4]):[],_0x5de643=_0x1f64b9[_0x5dbe9d(0x2a3)](_0x39bfc5=>eval(_0x39bfc5));break;case'JSON':_0x5de643=_0x41e9b5[_0x5d69e4]!==''?JSON[_0x5dbe9d(0x16c)](_0x41e9b5[_0x5d69e4]):'';break;case'ARRAYJSON':_0x1f64b9=_0x41e9b5[_0x5d69e4]!==''?JSON['parse'](_0x41e9b5[_0x5d69e4]):[],_0x5de643=_0x1f64b9['map'](_0x396112=>JSON[_0x5dbe9d(0x16c)](_0x396112));break;case _0x5dbe9d(0x145):_0x5de643=_0x41e9b5[_0x5d69e4]!==''?new Function(JSON[_0x5dbe9d(0x16c)](_0x41e9b5[_0x5d69e4])):new Function(_0x5dbe9d(0xd3));break;case _0x5dbe9d(0xb0):_0x1f64b9=_0x41e9b5[_0x5d69e4]!==''?JSON[_0x5dbe9d(0x16c)](_0x41e9b5[_0x5d69e4]):[],_0x5de643=_0x1f64b9[_0x5dbe9d(0x2a3)](_0x50c0cb=>new Function(JSON[_0x5dbe9d(0x16c)](_0x50c0cb)));break;case _0x5dbe9d(0x30c):_0x5de643=_0x41e9b5[_0x5d69e4]!==''?String(_0x41e9b5[_0x5d69e4]):'';break;case _0x5dbe9d(0x26e):_0x1f64b9=_0x41e9b5[_0x5d69e4]!==''?JSON[_0x5dbe9d(0x16c)](_0x41e9b5[_0x5d69e4]):[],_0x5de643=_0x1f64b9[_0x5dbe9d(0x2a3)](_0x105072=>String(_0x105072));break;case'STRUCT':_0x370df9=_0x41e9b5[_0x5d69e4]!==''?JSON[_0x5dbe9d(0x16c)](_0x41e9b5[_0x5d69e4]):{},_0x5de643=VisuMZ[_0x5dbe9d(0x2ba)]({},_0x370df9);break;case _0x5dbe9d(0x1f9):_0x1f64b9=_0x41e9b5[_0x5d69e4]!==''?JSON[_0x5dbe9d(0x16c)](_0x41e9b5[_0x5d69e4]):[],_0x5de643=_0x1f64b9['map'](_0x38728e=>VisuMZ[_0x5dbe9d(0x2ba)]({},JSON[_0x5dbe9d(0x16c)](_0x38728e)));break;default:continue;}_0x4e868c[_0x10dc3a]=_0x5de643;}}return _0x4e868c;},(_0x1b49db=>{const _0x195271=_0x5935ea,_0x26ed0a=_0x1b49db[_0x195271(0x2e8)];for(const _0x107ab1 of dependencies){if(!Imported[_0x107ab1]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x195271(0xc4)](_0x26ed0a,_0x107ab1)),SceneManager[_0x195271(0x317)]();break;}}const _0x2ca564=_0x1b49db[_0x195271(0x2d0)];if(_0x2ca564[_0x195271(0x325)](/\[Version[ ](.*?)\]/i)){const _0x311181=Number(RegExp['$1']);_0x311181!==VisuMZ[label]['version']&&(alert(_0x195271(0x183)[_0x195271(0xc4)](_0x26ed0a,_0x311181)),SceneManager[_0x195271(0x317)]());}if(_0x2ca564[_0x195271(0x325)](/\[Tier[ ](\d+)\]/i)){const _0x383306=Number(RegExp['$1']);_0x383306<tier?(alert(_0x195271(0x30b)[_0x195271(0xc4)](_0x26ed0a,_0x383306,tier)),SceneManager['exit']()):tier=Math[_0x195271(0x108)](_0x383306,tier);}VisuMZ[_0x195271(0x2ba)](VisuMZ[label][_0x195271(0x1e1)],_0x1b49db['parameters']);})(pluginData),PluginManager['registerCommand'](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x1ed),_0x2cae6c=>{const _0x244f32=_0x5935ea;VisuMZ['ConvertParams'](_0x2cae6c,_0x2cae6c);const _0x58d2c8=_0x2cae6c[_0x244f32(0x32a)],_0x479aa7=_0x2cae6c[_0x244f32(0x179)],_0x425e94=_0x2cae6c[_0x244f32(0x14f)];$gameScreen[_0x244f32(0x196)](_0x58d2c8,_0x425e94),$gameScreen[_0x244f32(0x13c)](_0x479aa7,_0x425e94);}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x267),_0x3161d7=>{const _0x16fdb4=_0x5935ea;VisuMZ[_0x16fdb4(0x2ba)](_0x3161d7,_0x3161d7);const _0x29f07c=_0x3161d7[_0x16fdb4(0x32a)],_0x56676c=_0x3161d7['Duration'];$gameScreen[_0x16fdb4(0x9e)](_0x29f07c,_0x56676c);}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x289),_0x4cb517=>{const _0xbf6cbf=_0x5935ea;VisuMZ[_0xbf6cbf(0x2ba)](_0x4cb517,_0x4cb517);const _0x59958c=_0x4cb517['ActorID'],_0x33b8e0=_0x4cb517[_0xbf6cbf(0x1e1)],_0x3af235=_0x4cb517[_0xbf6cbf(0x1b8)],_0x1074bf=_0x4cb517[_0xbf6cbf(0x2f1)];for(const _0x89d15d of _0x59958c){const _0x1b1334=$gameActors['actor'](_0x89d15d);if(!_0x1b1334)continue;_0x1b1334[_0xbf6cbf(0x1ea)](_0x33b8e0),_0x1b1334[_0xbf6cbf(0x143)](_0x3af235),_0x1b1334[_0xbf6cbf(0x186)]()[_0xbf6cbf(0x20b)]=_0x1074bf;}}),PluginManager[_0x5935ea(0x302)](pluginData['name'],'BattleLightChangeEnemySettings',_0x5665f0=>{const _0x2f1d12=_0x5935ea;VisuMZ[_0x2f1d12(0x2ba)](_0x5665f0,_0x5665f0);const _0x3054bf=_0x5665f0['EnemyIndex'],_0x3aac56=_0x5665f0[_0x2f1d12(0x1e1)],_0x5a86d6=_0x5665f0['Behavior'],_0x2d638c=_0x5665f0['AutoRadius'];for(const _0x963dcc of _0x3054bf){const _0x357349=$gameTroop[_0x2f1d12(0x92)]()[_0x963dcc];if(!_0x357349)continue;_0x357349[_0x2f1d12(0x1ea)](_0x3aac56),_0x357349[_0x2f1d12(0x143)](_0x5a86d6),_0x357349[_0x2f1d12(0x186)]()['autoRadius']=_0x2d638c;}}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x9b),_0x1e6e2e=>{const _0x42366d=_0x5935ea;VisuMZ[_0x42366d(0x2ba)](_0x1e6e2e,_0x1e6e2e);const _0x16f081=_0x1e6e2e['Settings'],_0x52298f=_0x1e6e2e[_0x42366d(0x1b8)];$gamePlayer[_0x42366d(0x1ea)](_0x16f081),$gamePlayer[_0x42366d(0x143)](_0x52298f);}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x193),_0x3ae225=>{const _0x401b5d=_0x5935ea;VisuMZ[_0x401b5d(0x2ba)](_0x3ae225,_0x3ae225);const _0x5b6480=_0x3ae225[_0x401b5d(0x1e1)],_0x126081=_0x3ae225[_0x401b5d(0x1b8)];$gamePlayer[_0x401b5d(0x1ca)](_0x5b6480),$gamePlayer[_0x401b5d(0xdb)](_0x126081);}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],'RadialLightChangeEventSettings',_0xda793=>{const _0x3a9a37=_0x5935ea;VisuMZ['ConvertParams'](_0xda793,_0xda793);const _0x57fabc=_0xda793['EventID'],_0x2fa8f0=_0xda793[_0x3a9a37(0x1e1)],_0x2023f4=_0xda793[_0x3a9a37(0x1b8)],_0x57a1e3=$gameTemp[_0x3a9a37(0x311)]();for(let _0x322646 of _0x57fabc){if(_0x322646===0x0)_0x322646=_0x57a1e3[_0x3a9a37(0x14b)]();const _0x59fe36=$gameMap[_0x3a9a37(0x148)](_0x322646);_0x59fe36&&(_0x59fe36[_0x3a9a37(0x1ea)](_0x2fa8f0),_0x59fe36[_0x3a9a37(0x143)](_0x2023f4));}}),PluginManager['registerCommand'](pluginData['name'],_0x5935ea(0x305),_0x3d32ec=>{const _0x3fc069=_0x5935ea;VisuMZ[_0x3fc069(0x2ba)](_0x3d32ec,_0x3d32ec);const _0x104d12=$gameMap['boat'](),_0x5e4d39=_0x3d32ec[_0x3fc069(0x2cd)],_0x1cb35b=_0x3d32ec['BoardedBehavior'],_0x6e8219=_0x3d32ec[_0x3fc069(0x19e)],_0x36d098=_0x3d32ec[_0x3fc069(0x2e7)];if(_0x104d12){const _0x3cd1f5=!![];_0x104d12[_0x3fc069(0xe2)](_0x5e4d39,!![],_0x3cd1f5,![]),_0x104d12[_0x3fc069(0xe2)](_0x1cb35b,!![],_0x3cd1f5,!![]),_0x104d12[_0x3fc069(0xe2)](_0x6e8219,![],_0x3cd1f5,![]),_0x104d12['setVehicleLightingData'](_0x36d098,![],_0x3cd1f5,!![]);}}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x29e),_0x46cfbb=>{const _0x394d1e=_0x5935ea;VisuMZ[_0x394d1e(0x2ba)](_0x46cfbb,_0x46cfbb);const _0x3cb834=$gameMap['ship'](),_0x37faeb=_0x46cfbb[_0x394d1e(0x2cd)],_0x72a0b4=_0x46cfbb['BoardedBehavior'],_0x1f014c=_0x46cfbb[_0x394d1e(0x19e)],_0x33b932=_0x46cfbb[_0x394d1e(0x2e7)];if(_0x3cb834){const _0x2de339=!![];_0x3cb834[_0x394d1e(0xe2)](_0x37faeb,!![],_0x2de339,![]),_0x3cb834[_0x394d1e(0xe2)](_0x72a0b4,!![],_0x2de339,!![]),_0x3cb834[_0x394d1e(0xe2)](_0x1f014c,![],_0x2de339,![]),_0x3cb834['setVehicleLightingData'](_0x33b932,![],_0x2de339,!![]);}}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x2d3),_0x36cce3=>{const _0x4e583a=_0x5935ea;VisuMZ[_0x4e583a(0x2ba)](_0x36cce3,_0x36cce3);const _0x57287f=$gameMap['airship'](),_0x43f9ff=_0x36cce3['BoardedSettings'],_0x41dcbb=_0x36cce3[_0x4e583a(0x21f)],_0x30906a=_0x36cce3[_0x4e583a(0x19e)],_0x2aa7b1=_0x36cce3['UnboardedBehavior'];if(_0x57287f){const _0x4bc0cb=!![];_0x57287f['setVehicleLightingData'](_0x43f9ff,!![],_0x4bc0cb,![]),_0x57287f[_0x4e583a(0xe2)](_0x41dcbb,!![],_0x4bc0cb,!![]),_0x57287f[_0x4e583a(0xe2)](_0x30906a,![],_0x4bc0cb,![]),_0x57287f['setVehicleLightingData'](_0x2aa7b1,![],_0x4bc0cb,!![]);}}),PluginManager[_0x5935ea(0x302)](pluginData['name'],'ConicalLightChangePlayerSettings',_0x361fd2=>{const _0x3f9bbe=_0x5935ea;VisuMZ[_0x3f9bbe(0x2ba)](_0x361fd2,_0x361fd2);const _0x42b203=_0x361fd2[_0x3f9bbe(0x1e1)],_0x48b736=_0x361fd2[_0x3f9bbe(0x1b8)];$gamePlayer[_0x3f9bbe(0x27d)](_0x42b203),$gamePlayer[_0x3f9bbe(0x2e9)](_0x48b736);}),PluginManager['registerCommand'](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x262),_0x42a1eb=>{const _0x303576=_0x5935ea;VisuMZ['ConvertParams'](_0x42a1eb,_0x42a1eb);const _0x46b89=_0x42a1eb[_0x303576(0x1e1)],_0x55075c=_0x42a1eb[_0x303576(0x1b8)];$gamePlayer['setFollowerConicalLightSettings'](_0x46b89),$gamePlayer[_0x303576(0x1c6)](_0x55075c);}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],'ConicalLightChangeEventSettings',_0x6ddc11=>{const _0x26d4e2=_0x5935ea;VisuMZ['ConvertParams'](_0x6ddc11,_0x6ddc11);const _0x211419=_0x6ddc11[_0x26d4e2(0x192)],_0x273142=_0x6ddc11[_0x26d4e2(0x1e1)],_0x544949=_0x6ddc11['Behavior'],_0x4cdf9f=$gameTemp['getLastPluginCommandInterpreter']();for(let _0x2f404f of _0x211419){if(_0x2f404f===0x0)_0x2f404f=_0x4cdf9f['eventId']();const _0x27aa91=$gameMap[_0x26d4e2(0x148)](_0x2f404f);_0x27aa91&&(_0x27aa91['setConicalLightSettings'](_0x273142),_0x27aa91[_0x26d4e2(0x2e9)](_0x544949));}}),PluginManager['registerCommand'](pluginData[_0x5935ea(0x2e8)],'ConicalLightChangeBoatSettings',_0x61d343=>{const _0x58b438=_0x5935ea;VisuMZ[_0x58b438(0x2ba)](_0x61d343,_0x61d343);const _0x1b808e=$gameMap['boat'](),_0x4b0668=_0x61d343[_0x58b438(0x2cd)],_0x25d092=_0x61d343['BoardedBehavior'],_0x4bc221=_0x61d343[_0x58b438(0x19e)],_0x3d1002=_0x61d343['UnboardedBehavior'];if(_0x1b808e){const _0x412750=![];_0x1b808e[_0x58b438(0xe2)](_0x4b0668,!![],_0x412750,![]),_0x1b808e[_0x58b438(0xe2)](_0x25d092,!![],_0x412750,!![]),_0x1b808e[_0x58b438(0xe2)](_0x4bc221,![],_0x412750,![]),_0x1b808e[_0x58b438(0xe2)](_0x3d1002,![],_0x412750,!![]);}}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x15a),_0x302069=>{const _0x5bee05=_0x5935ea;VisuMZ[_0x5bee05(0x2ba)](_0x302069,_0x302069);const _0x46ab2c=$gameMap[_0x5bee05(0x119)](),_0x569a6a=_0x302069[_0x5bee05(0x2cd)],_0x374c7a=_0x302069[_0x5bee05(0x21f)],_0x3502d6=_0x302069['UnboardedSettings'],_0x18103a=_0x302069[_0x5bee05(0x2e7)];if(_0x46ab2c){const _0x1dcb83=![];_0x46ab2c[_0x5bee05(0xe2)](_0x569a6a,!![],_0x1dcb83,![]),_0x46ab2c[_0x5bee05(0xe2)](_0x374c7a,!![],_0x1dcb83,!![]),_0x46ab2c[_0x5bee05(0xe2)](_0x3502d6,![],_0x1dcb83,![]),_0x46ab2c[_0x5bee05(0xe2)](_0x18103a,![],_0x1dcb83,!![]);}}),PluginManager['registerCommand'](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0xc3),_0x2012d9=>{const _0x2fb638=_0x5935ea;VisuMZ['ConvertParams'](_0x2012d9,_0x2012d9);const _0x19ea27=$gameMap[_0x2fb638(0xf7)](),_0x1b88f9=_0x2012d9['BoardedSettings'],_0x5608b5=_0x2012d9[_0x2fb638(0x21f)],_0x5c7b99=_0x2012d9[_0x2fb638(0x19e)],_0x51fc49=_0x2012d9['UnboardedBehavior'];if(_0x19ea27){const _0x3d00ca=![];_0x19ea27[_0x2fb638(0xe2)](_0x1b88f9,!![],_0x3d00ca,![]),_0x19ea27['setVehicleLightingData'](_0x5608b5,!![],_0x3d00ca,!![]),_0x19ea27[_0x2fb638(0xe2)](_0x5c7b99,![],_0x3d00ca,![]),_0x19ea27[_0x2fb638(0xe2)](_0x51fc49,![],_0x3d00ca,!![]);}}),PluginManager['registerCommand'](pluginData['name'],'ConicalOffsetChangeActor',_0x390735=>{const _0x1dce5b=_0x5935ea;VisuMZ[_0x1dce5b(0x2ba)](_0x390735,_0x390735);const _0x3175d9=_0x390735[_0x1dce5b(0x2f6)],_0x2043d2=_0x390735[_0x1dce5b(0x25c)],_0x22ce0a=_0x390735['HandOffset'],_0x4e47c4=_0x390735[_0x1dce5b(0xc7)],_0x2e8e25=_0x390735['VsJumpOffset'];for(const _0x32775d of _0x3175d9){const _0xcddea1=$gameActors[_0x1dce5b(0x1ff)](_0x32775d);if(!_0xcddea1)continue;_0xcddea1[_0x1dce5b(0x1e8)](_0x22ce0a),_0xcddea1[_0x1dce5b(0x14d)](_0x4e47c4),_0xcddea1[_0x1dce5b(0x210)](_0x2e8e25),_0xcddea1===$gameParty['leader']()?$gamePlayer['conicalLight']()[_0x1dce5b(0x287)]=_0x2043d2:$gamePlayer[_0x1dce5b(0x24e)]()[_0x1dce5b(0x287)]=_0x2043d2;}}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x97),_0x521800=>{const _0x50b211=_0x5935ea;VisuMZ[_0x50b211(0x2ba)](_0x521800,_0x521800);const _0x11b82a=_0x521800[_0x50b211(0x192)],_0x380cc3=_0x521800[_0x50b211(0x25c)],_0x4bfa4b=_0x521800[_0x50b211(0x13a)],_0x251843=_0x521800['VsDashOffset'],_0x1b166a=_0x521800[_0x50b211(0x2d8)],_0x9ad3d7=$gameTemp[_0x50b211(0x311)]();for(let _0x3dafe5 of _0x11b82a){if(_0x3dafe5===0x0)_0x3dafe5=_0x9ad3d7[_0x50b211(0x14b)]();const _0x3393dc=$gameMap[_0x50b211(0x148)](_0x3dafe5);_0x3393dc&&(_0x3393dc[_0x50b211(0x1e8)](_0x4bfa4b),_0x3393dc[_0x50b211(0x14d)](_0x251843),_0x3393dc['setConicalLightJumpOffsets'](_0x1b166a),_0x3393dc[_0x50b211(0x1c5)]()[_0x50b211(0x287)]=_0x380cc3);}}),PluginManager[_0x5935ea(0x302)](pluginData['name'],'ConicalOffsetChangeBoat',_0x114fe0=>{const _0x24fadc=_0x5935ea;VisuMZ[_0x24fadc(0x2ba)](_0x114fe0,_0x114fe0);const _0x4bf95a=$gameMap['boat'](),_0x237267=_0x114fe0[_0x24fadc(0xc2)],_0x5aff84=_0x114fe0[_0x24fadc(0x2d4)];_0x4bf95a&&(_0x4bf95a['setVehicleLightingConicalOffset'](_0x237267,!![]),_0x4bf95a[_0x24fadc(0x244)](_0x5aff84,![]));}),PluginManager[_0x5935ea(0x302)](pluginData['name'],'ConicalOffsetChangeShip',_0x2e48c8=>{const _0x3c65e7=_0x5935ea;VisuMZ[_0x3c65e7(0x2ba)](_0x2e48c8,_0x2e48c8);const _0x4432c8=$gameMap['ship'](),_0x297190=_0x2e48c8[_0x3c65e7(0xc2)],_0x3f4700=_0x2e48c8[_0x3c65e7(0x2d4)];_0x4432c8&&(_0x4432c8[_0x3c65e7(0x244)](_0x297190,!![]),_0x4432c8['setVehicleLightingConicalOffset'](_0x3f4700,![]));}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x11c),_0x6d6018=>{const _0x4315ef=_0x5935ea;VisuMZ[_0x4315ef(0x2ba)](_0x6d6018,_0x6d6018);const _0x54dd4b=$gameMap[_0x4315ef(0xf7)](),_0x413264=_0x6d6018[_0x4315ef(0xc2)],_0x1ad1ab=_0x6d6018[_0x4315ef(0x2d4)];_0x54dd4b&&(_0x54dd4b['setVehicleLightingConicalOffset'](_0x413264,!![]),_0x54dd4b[_0x4315ef(0x244)](_0x1ad1ab,![]));}),VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x285)]=function(_0x1c1cda,_0xd34f64){const _0x141258=_0x5935ea;VisuMZ[_0x141258(0x2ba)](_0x1c1cda,_0x1c1cda);const _0x411fbd=_0x1c1cda[_0x141258(0x1e1)],_0x2d616e=_0x1c1cda[_0x141258(0x1b8)],_0x50b69a=_0x1c1cda[_0x141258(0x26c)],_0x5e681c=_0x1c1cda[_0x141258(0x227)]||0x0,_0x3fd0a2=_0x1c1cda[_0x141258(0x170)],_0x1f8edc=_0x1c1cda['TimeIncrement'],_0x52a098=_0x1c1cda[_0x141258(0x2a6)]||0x0,_0x36de5e={'active':!![],'settings':JsonEx['makeDeepCopy'](_0x411fbd),'behavior':JsonEx[_0x141258(0x16d)](_0x2d616e),'type':_0xd34f64,'originX':_0x1c1cda[_0x141258(0x2ff)]||0x0,'originY':_0x1c1cda[_0x141258(0x259)]||0x0,'update':_0x50b69a,'initialTime':_0x5e681c,'time':_0x5e681c,'expire':_0x52a098===0x0?Number['MAX_SAFE_INTEGER']:_0x52a098,'x':0x0,'y':0x0};_0xd34f64===_0x141258(0x1a4)&&(_0x36de5e[_0x141258(0xa6)]=_0x1c1cda[_0x141258(0x7c)]||0x0);if(_0xd34f64===_0x141258(0x148)){_0x36de5e['eventId']=_0x1c1cda[_0x141258(0x192)]||0x0;if(_0x36de5e[_0x141258(0x14b)]===0x0){const _0x4bdde2=$gameTemp[_0x141258(0x311)]();_0x36de5e[_0x141258(0x14b)]=_0x4bdde2['eventId']();}}for(let _0x3dab94=0x0;_0x3dab94<_0x3fd0a2;_0x3dab94++){const _0x58f7f9=JsonEx[_0x141258(0x16d)](_0x36de5e),_0x5c3b4c=_0x5e681c+_0x3dab94*_0x1f8edc;_0x58f7f9['time']=_0x5c3b4c,$gameMap[_0x141258(0x283)](_0x58f7f9);}},PluginManager['registerCommand'](pluginData['name'],_0x5935ea(0x27f),_0x47e821=>{const _0x12d845=_0x5935ea;if(SceneManager[_0x12d845(0x2d5)]())return;VisuMZ[_0x12d845(0x2e3)]['SpawnLights'](_0x47e821,_0x12d845(0x2a3));}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x163),_0x286c97=>{const _0x25a977=_0x5935ea;if(SceneManager[_0x25a977(0x2d5)]())return;VisuMZ['LightingEffects']['SpawnLights'](_0x286c97,_0x25a977(0x23f));}),PluginManager['registerCommand'](pluginData[_0x5935ea(0x2e8)],'LightSpawnNewPlayerLockedLight',_0x32c076=>{const _0x4fa092=_0x5935ea;if(SceneManager['isSceneBattle']())return;VisuMZ[_0x4fa092(0x2e3)][_0x4fa092(0x285)](_0x32c076,'player');}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x150),_0x3765e1=>{const _0x4036f3=_0x5935ea;if(SceneManager[_0x4036f3(0x2d5)]())return;VisuMZ[_0x4036f3(0x2e3)][_0x4036f3(0x285)](_0x3765e1,_0x4036f3(0x1a4));}),PluginManager[_0x5935ea(0x302)](pluginData[_0x5935ea(0x2e8)],'LightSpawnNewEventLockedLight',_0x5e0043=>{const _0x2e338e=_0x5935ea;if(SceneManager['isSceneBattle']())return;VisuMZ[_0x2e338e(0x2e3)][_0x2e338e(0x285)](_0x5e0043,_0x2e338e(0x148));}),PluginManager['registerCommand'](pluginData[_0x5935ea(0x2e8)],_0x5935ea(0x8b),_0x4d6154=>{const _0x544bf3=_0x5935ea;if(SceneManager['isSceneBattle']())return;for(const _0x1b56df of $gameMap['lightSpawns']()){if(!_0x1b56df)continue;if(!_0x1b56df[_0x544bf3(0x2c3)])continue;if(_0x1b56df[_0x544bf3(0xb1)]<0xa)continue;_0x1b56df['expire']=0xa;}}),VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x1c0)]={'AutoTint':/<(?:AUTOTINT|AUTO-TINT|AUTOTONE|AUTO-TONE):[ ](.*)>/i,'lightingOverlayColor':/<(?:OVERLAY|OVERLAY COLOR):[ ](.*)>/i,'lightingOverlayOpacityValue':/<(?:OVERLAY) OPACITY:[ ](\d+)>/i,'lightingOverlayOpacityRate':/<(?:OVERLAY) OPACITY:[ ](\d+)([%％])>/i,'noLightingOverlay':/<NO (?:OVERLAY|DARKNESS OVERLAY)>/i,'antiLightMaskHardRegions':/<HARD (?:ANTILIGHT|ANTI-LIGHT) (?:REGION|REGIONS):[ ](.*)>/i,'antiLightMaskHardTerrainTags':/<HARD (?:ANTILIGHT|ANTI-LIGHT) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'antiLightMaskSoftRegions':/<SOFT (?:ANTILIGHT|ANTI-LIGHT) (?:REGION|REGIONS):[ ](.*)>/i,'antiLightMaskSoftTerrainTags':/<SOFT (?:ANTILIGHT|ANTI-LIGHT) TERRAIN (?:TAG|TAGS):[ ](.*)>/i,'RadialLightGeneric':/<(?:LIGHT|RADIAL LIGHT)>/i,'RadialLightCatchAll':/<(?:LIGHT|RADIAL LIGHT)[ ](.*?)>/i,'RadialLightTurnOff':/<NO (?:LIGHT|RADIAL LIGHT)>/i,'RadialLightFilename':/<(?:LIGHT|RADIAL LIGHT) FILENAME:[ ](.*?)>/i,'RadialLightColor':/<(?:LIGHT|RADIAL LIGHT) COLOR:[ ](.*?)>/i,'RadialLightRadius':/<(?:LIGHT|RADIAL LIGHT) RADIUS:[ ](\d+)>/i,'RadialLightDiameter':/<(?:LIGHT|RADIAL LIGHT) DIAMETER:[ ](\d+)>/i,'RadialLightIntensity':/<(?:LIGHT|RADIAL LIGHT) INTENSITY:[ ](\d+)([%％])>/i,'RadialLightAngle':/<(?:LIGHT|RADIAL LIGHT) ANGLE:[ ](\d+)>/i,'RadialLightRotateSpeed':/<(?:LIGHT|RADIAL LIGHT) ROTATE SPEED:[ ]([\+\-]\d+)>/i,'RadialLightBlendMode':/<(?:LIGHT|RADIAL LIGHT) BLEND MODE:[ ](.*?)>/i,'RadialLightOpacityFlat':/<(?:LIGHT|RADIAL LIGHT) OPACITY:[ ](\d+)>/i,'RadialLightOpacityRate':/<(?:LIGHT|RADIAL LIGHT) OPACITY:[ ](\d+)([%％])>/i,'RadialLightOffset':/<(?:LIGHT|RADIAL LIGHT) OFFSET:[ ](.*?)>/i,'RadialBehaviorBlinkRate':/<(?:LIGHT|RADIAL LIGHT) BLINK RATE:[ ](\d+)([%％])>/i,'RadialBehaviorBlinkMod':/<(?:LIGHT|RADIAL LIGHT) BLINK MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlickerRate':/<(?:LIGHT|RADIAL LIGHT) FLICKER RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlickerMod':/<(?:LIGHT|RADIAL LIGHT) FLICKER MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlashRate':/<(?:LIGHT|RADIAL LIGHT) FLASH RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlashMod':/<(?:LIGHT|RADIAL LIGHT) FLASH MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorFlareRate':/<(?:LIGHT|RADIAL LIGHT) FLARE RATE:[ ](\d+)([%％])>/i,'RadialBehaviorFlareMod':/<(?:LIGHT|RADIAL LIGHT) FLARE MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'RadialBehaviorGlowRate':/<(?:LIGHT|RADIAL LIGHT) GLOW RATE:[ ](\d+)([%％])>/i,'RadialBehaviorGlowSpeed':/<(?:LIGHT|RADIAL LIGHT) GLOW SPEED:[ ](\d+)([%％])>/i,'RadialBehaviorGlowRng':/<(?:LIGHT|RADIAL LIGHT) GLOW RANDOM>/i,'RadialBehaviorGlowNoRng':/<(?:LIGHT|RADIAL LIGHT) GLOW NO RANDOM>/i,'RadialBehaviorPulseRate':/<(?:LIGHT|RADIAL LIGHT) PULSE RATE:[ ](\d+)([%％])>/i,'RadialBehaviorPulseSpeed':/<(?:LIGHT|RADIAL LIGHT) PULSE SPEED:[ ](\d+)([%％])>/i,'RadialBehaviorPulseRng':/<(?:LIGHT|RADIAL LIGHT) PULSE RANDOM>/i,'RadialBehaviorPulseNoRng':/<(?:LIGHT|RADIAL LIGHT) PULSE NO RANDOM>/i,'RadialBehaviorPatternPreset':/<(?:LIGHT|RADIAL LIGHT) PATTERN TYPE:[ ](.*?)>/i,'RadialBehaviorPatternSequence':/<(?:LIGHT|RADIAL LIGHT) (?:PATTERN|PATTERN TABLE|CUSTOM PATTERN):[ ](.*?)>/i,'RadialBehaviorPatternUpdateDelay':/<(?:LIGHT|RADIAL LIGHT) PATTERN (?:DELAY|UPDATE DELAY):[ ](\d+)>/i,'ConicalLightGeneric':/<(?:CONICAL LIGHT|TORCH)>/i,'ConicalLightCatchAll':/<(?:CONICAL LIGHT|TORCH)[ ](.*?)>/i,'ConicalLightTurnOff':/<NO (?:CONICAL LIGHT|TORCH)>/i,'ConicalLightFilename':/<(?:CONICAL LIGHT|TORCH) FILENAME:[ ](.*?)>/i,'ConicalLightFileAngleOffset':/<(?:CONICAL LIGHT|TORCH) FILE ANGLE OFFSET:[ ]([\+\-]\d+)>/i,'ConicalLightFileAnchor':/<(?:CONICAL LIGHT|TORCH) FILE ANCHOR:[ ](.*?)>/i,'ConicalLightColor':/<(?:CONICAL LIGHT|TORCH) COLOR:[ ](.*?)>/i,'ConicalLightRadius':/<(?:CONICAL LIGHT|TORCH) RADIUS:[ ](\d+)>/i,'ConicalLightDiameter':/<(?:CONICAL LIGHT|TORCH) DIAMETER:[ ](\d+)>/i,'ConicalLightSrcRadius':/<(?:CONICAL LIGHT|TORCH) (?:SOURCE|MINI) RADIUS:[ ](\d+)>/i,'ConicalLightSrcDiameter':/<(?:CONICAL LIGHT|TORCH) (?:SOURCE|MINI) DIAMETER:[ ](\d+)>/i,'ConicalLightIntensity':/<(?:CONICAL LIGHT|TORCH) INTENSITY:[ ](\d+)([%％])>/i,'ConicalLightBlendMode':/<(?:CONICAL LIGHT|TORCH) BLEND MODE:[ ](.*?)>/i,'ConicalLightOpacityFlat':/<(?:CONICAL LIGHT|TORCH) OPACITY:[ ](\d+)>/i,'ConicalLightOpacityRate':/<(?:CONICAL LIGHT|TORCH) OPACITY:[ ](\d+)([%％])>/i,'ConicalLightAngle':/<(?:CONICAL LIGHT|TORCH) ANGLE:[ ](\d+)>/i,'ConicalLightAngleSway':/<(?:CONICAL LIGHT|TORCH) ANGLE SWAY:[ ](\d+)>/i,'ConicalLightSwaySpeed':/<(?:CONICAL LIGHT|TORCH) SWAY SPEED:[ ](\d+)([%％])>/i,'ConicalLightSwayRng':/<(?:CONICAL LIGHT|TORCH) SWAY RANDOM>/i,'ConicalLightSwayNoRng':/<(?:CONICAL LIGHT|TORCH) SWAY NO RANDOM>/i,'ConicalLightForceDir':/<(?:CONICAL LIGHT|TORCH) FORCE DIRECTION:[ ](.*?)>/i,'ConicalLightFollowMouse':/<(?:CONICAL LIGHT|TORCH) FOLLOW (?:CURSOR|MOUSE)>/i,'ConicalLightNoFollowMouse':/<(?:CONICAL LIGHT|TORCH) (?:NO|NOT) FOLLOW (?:CURSOR|MOUSE)>/i,'ConicalLightUseHandOffset':/<(?:CONICAL LIGHT|TORCH) HAND OFFSET>/i,'ConicalLightCentralOffset':/<(?:CONICAL LIGHT|TORCH) (?:CENTER|CENTRAL) OFFSET>/i,'ConicalLightOffset':/<(?:CONICAL LIGHT|TORCH) OFFSET:[ ](.*?)>/i,'ConicalBehaviorBlinkRate':/<(?:CONICAL LIGHT|TORCH) BLINK RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorBlinkMod':/<(?:CONICAL LIGHT|TORCH) BLINK MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlickerRate':/<(?:CONICAL LIGHT|TORCH) FLICKER RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlickerMod':/<(?:CONICAL LIGHT|TORCH) FLICKER MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlashRate':/<(?:CONICAL LIGHT|TORCH) FLASH RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlashMod':/<(?:CONICAL LIGHT|TORCH) FLASH MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorFlareRate':/<(?:CONICAL LIGHT|TORCH) FLARE RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorFlareMod':/<(?:CONICAL LIGHT|TORCH) FLARE MODIFIER:[ ]([\+\-]\d+)([%％])>/i,'ConicalBehaviorGlowRate':/<(?:CONICAL LIGHT|TORCH) GLOW RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorGlowSpeed':/<(?:CONICAL LIGHT|TORCH) GLOW SPEED:[ ](\d+)([%％])>/i,'ConicalBehaviorGlowRng':/<(?:CONICAL LIGHT|TORCH) GLOW RANDOM>/i,'ConicalBehaviorGlowNoRng':/<(?:CONICAL LIGHT|TORCH) GLOW NO RANDOM>/i,'ConicalBehaviorPulseRate':/<(?:CONICAL LIGHT|TORCH) PULSE RATE:[ ](\d+)([%％])>/i,'ConicalBehaviorPulseSpeed':/<(?:CONICAL LIGHT|TORCH) PULSE SPEED:[ ](\d+)([%％])>/i,'ConicalBehaviorPulseRng':/<(?:CONICAL LIGHT|TORCH) PULSE RANDOM>/i,'ConicalBehaviorPulseNoRng':/<(?:CONICAL LIGHT|TORCH) PULSE NO RANDOM>/i,'ConicalBehaviorPatternPreset':/<(?:CONICAL LIGHT|TORCH) PATTERN TYPE:[ ](.*?)>/i,'ConicalBehaviorPatternSequence':/<(?:CONICAL LIGHT|TORCH) (?:PATTERN|PATTERN TABLE|CUSTOM PATTERN):[ ](.*?)>/i,'ConicalBehaviorPatternUpdateDelay':/<(?:CONICAL LIGHT|TORCH) PATTERN (?:DELAY|UPDATE DELAY):[ ](\d+)>/i,'ConicalLightHandOffset':/<(?:CONICAL LIGHT|TORCH) (.*?) PATTERN (\d+) OFFSET:[ ](.*?)>/gi},Bitmap[_0x5935ea(0x9a)][_0x5935ea(0x87)]=function(_0x5c706c,_0x350aac){const _0x2b20bb=_0x5935ea;this[_0x2b20bb(0xa0)](_0x5c706c,_0x350aac,0.5);},Bitmap['prototype'][_0x5935ea(0xa0)]=function(_0x4a3ebc,_0x435e2e,_0x562189){const _0x2a8b54=_0x5935ea,_0x1205b4=0x168,_0x51652b=0x1,_0x13298b=0x0;this[_0x2a8b54(0xc6)](_0x4a3ebc,_0x1205b4,_0x435e2e,_0x562189,_0x51652b,_0x13298b);},Bitmap[_0x5935ea(0x9a)]['drawConicalLight']=function(_0x20c46e,_0x5f58a9,_0x54b735,_0xfda345,_0x36ac0f,_0x514cb1){const _0x25b074=_0x5935ea;_0xfda345=_0xfda345[_0x25b074(0x2d9)](0.000001,0.999999);const _0x1e2606=this[_0x25b074(0x83)],_0x40e603=_0x5f58a9*(Math['PI']/0xb4),_0x811931=_0x20c46e*0x2,_0x3f8309=_0x1e2606[_0x25b074(0x24b)](_0x20c46e,_0x20c46e,_0x514cb1,_0x20c46e,_0x20c46e,_0x20c46e),_0x347efb=ColorManager['hexToRgba'](_0x54b735,_0x36ac0f),_0x465365=ColorManager['hexToRgba'](_0x54b735,0x1),_0x14e976=ColorManager[_0x25b074(0x2df)](_0x54b735,0x0);_0x3f8309[_0x25b074(0xeb)](0x0,_0x347efb),_0x3f8309[_0x25b074(0xeb)](_0xfda345/0x2,_0x465365),_0x3f8309[_0x25b074(0xeb)](_0xfda345,_0x465365),_0x3f8309[_0x25b074(0xeb)](0x1,_0x14e976),_0x1e2606['save'](),_0x1e2606[_0x25b074(0x1d2)]=_0x3f8309,_0x1e2606[_0x25b074(0xf9)](),_0x1e2606[_0x25b074(0x9c)](_0x20c46e,_0x20c46e),_0x1e2606[_0x25b074(0x112)](_0x811931,_0x20c46e),_0x1e2606[_0x25b074(0xec)](_0x20c46e,_0x20c46e,_0x20c46e,0x0,_0x40e603),_0x1e2606[_0x25b074(0x112)](_0x20c46e,_0x20c46e),_0x1e2606['fill'](),_0x1e2606['restore'](),this[_0x25b074(0xf0)]['update']();},ConfigManager['blinkingLights']=!![],ConfigManager[_0x5935ea(0x30a)]=!![],VisuMZ['LightingEffects'][_0x5935ea(0x166)]=ConfigManager['makeData'],ConfigManager[_0x5935ea(0xc0)]=function(){const _0x297b2f=_0x5935ea,_0x39cce8=VisuMZ[_0x297b2f(0x2e3)]['ConfigManager_makeData'][_0x297b2f(0x2cb)](this);return _0x39cce8[_0x297b2f(0x2e4)]=this[_0x297b2f(0x2e4)],_0x39cce8['pulsingLights']=this[_0x297b2f(0x30a)],_0x39cce8;},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0xdd)]=ConfigManager[_0x5935ea(0x173)],ConfigManager[_0x5935ea(0x173)]=function(_0x3ca13e){const _0x32b43b=_0x5935ea;VisuMZ[_0x32b43b(0x2e3)][_0x32b43b(0xdd)][_0x32b43b(0x2cb)](this,_0x3ca13e),this['readFlag'](_0x3ca13e,_0x32b43b(0x2e4),!![]),this[_0x32b43b(0x2b9)](_0x3ca13e,_0x32b43b(0x30a),!![]);},TextManager[_0x5935ea(0x2d1)]={'BlinkingLights':VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x1e1)][_0x5935ea(0x1d9)][_0x5935ea(0x300)],'PulsingLights':VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x1e1)][_0x5935ea(0x1d9)][_0x5935ea(0x23e)]},TextManager[_0x5935ea(0x1fa)]=function(_0x5fa116){const _0x51be98=_0x5935ea;_0x5fa116=_0x5fa116[_0x51be98(0x1c3)]()[_0x51be98(0x133)]();switch(_0x5fa116){case _0x51be98(0x27a):return 0x2;case _0x51be98(0xd1):return 0x4;case _0x51be98(0x1f1):return 0x6;case'up':return 0x8;case'lower\x20left':return 0x1;case'lower\x20right':return 0x3;case _0x51be98(0xd6):return 0x7;case _0x51be98(0x327):return 0x9;}return Number(_0x5fa116)||0x0;},ColorManager['presetColorParser']=function(_0xe9cbf4){const _0x116fd4=_0x5935ea;if(_0xe9cbf4['match'](/\#(.*)/i))return _0x116fd4(0xcd)['format'](String(RegExp['$1']));else{_0xe9cbf4=_0xe9cbf4[_0x116fd4(0x1c3)]()[_0x116fd4(0x133)]();const _0xd7eda5=VisuMZ[_0x116fd4(0x2e3)][_0x116fd4(0x1e1)]['PresetColors'];if(_0xd7eda5&&_0xd7eda5[_0xe9cbf4])return _0xd7eda5[_0xe9cbf4];switch(_0xe9cbf4){case'-':case _0x116fd4(0xe3):case'normal':case'day':case _0x116fd4(0xe4):return _0x116fd4(0x168);case'black':case'dark':return _0x116fd4(0x313);case'red':return _0x116fd4(0x169);case _0x116fd4(0x1fb):return'#00ff00';case'blue':return _0x116fd4(0x10e);case _0x116fd4(0x2c1):return _0x116fd4(0x2fe);case _0x116fd4(0xdc):return _0x116fd4(0xb5);case _0x116fd4(0x1ad):return _0x116fd4(0xae);case _0x116fd4(0x12e):return _0x116fd4(0x304);case'purple':return _0x116fd4(0x1f5);case _0x116fd4(0x201):return'#f06eaa';case _0x116fd4(0x157):return'#8c6239';case _0x116fd4(0x269):case _0x116fd4(0x1f8):return _0x116fd4(0x15d);case _0x116fd4(0x155):return _0x116fd4(0x2b7);case _0x116fd4(0x116):return _0x116fd4(0x314);case'light\x20yellow':return'#fff799';case _0x116fd4(0x134):return _0x116fd4(0x230);case _0x116fd4(0x1e6):return _0x116fd4(0x12f);case'light\x20blue':return'#ace4fa';case'light\x20purple':return _0x116fd4(0x31a);case _0x116fd4(0x77):return _0x116fd4(0x1a6);case _0x116fd4(0x189):return _0x116fd4(0x2ad);case _0x116fd4(0xb9):return _0x116fd4(0x9d);case'light\x20grey':case'light\x20gray':return _0x116fd4(0x1f6);case _0x116fd4(0x236):return _0x116fd4(0x7d);case'dark\x20orange':return'#7d4900';case _0x116fd4(0x266):return _0x116fd4(0x101);case'dark\x20green':return _0x116fd4(0x11f);case _0x116fd4(0x312):return _0x116fd4(0x2a4);case _0x116fd4(0x232):return _0x116fd4(0x2a7);case _0x116fd4(0x241):return _0x116fd4(0x26d);case _0x116fd4(0x21d):return _0x116fd4(0x26f);case'dark\x20pink':return _0x116fd4(0x104);case'dark\x20brown':return _0x116fd4(0x260);case _0x116fd4(0xe8):case _0x116fd4(0xbc):return _0x116fd4(0x206);case _0x116fd4(0xca):return'#5674b9';case'dusk':return _0x116fd4(0x304);case _0x116fd4(0x1cf):return _0x116fd4(0xce);}}},ColorManager['blendModeParser']=function(_0x18d49d){const _0x22db33=_0x5935ea;_0x18d49d=_0x18d49d['toLowerCase']();switch(_0x18d49d){case _0x22db33(0x1a0):return PIXI[_0x22db33(0x22e)][_0x22db33(0x256)];case _0x22db33(0x239):case _0x22db33(0x1a8):return PIXI[_0x22db33(0x22e)]['ADD'];case'multiply':return PIXI[_0x22db33(0x22e)][_0x22db33(0x1d1)];case'screen':return PIXI['BLEND_MODES'][_0x22db33(0x207)];}},ColorManager[_0x5935ea(0x2df)]=function(_0x2a6651,_0x59fcc0){const _0x31df91=_0x5935ea;let _0x2f9e6d='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x31df91(0x2d6)](_0x2a6651)){_0x2f9e6d=_0x2a6651['substring'](0x1)[_0x31df91(0x2c2)]('');_0x2f9e6d[_0x31df91(0x270)]===0x3&&(_0x2f9e6d=[_0x2f9e6d[0x0],_0x2f9e6d[0x0],_0x2f9e6d[0x1],_0x2f9e6d[0x1],_0x2f9e6d[0x2],_0x2f9e6d[0x2]]);while(_0x2f9e6d[_0x31df91(0x270)]>0x6)_0x2f9e6d[_0x31df91(0x277)]();return _0x2f9e6d='0x'+_0x2f9e6d[_0x31df91(0x2be)](''),_0x31df91(0x182)+[(_0x2f9e6d>>0x10&0xff)[_0x31df91(0x2d9)](0x0,0xff),(_0x2f9e6d>>0x8&0xff)[_0x31df91(0x2d9)](0x0,0xff),(_0x2f9e6d&0xff)[_0x31df91(0x2d9)](0x0,0xff)][_0x31df91(0x2be)](',')+','+_0x59fcc0[_0x31df91(0x2d9)](0x0,0x1)+')';}else return _0x31df91(0xe6);},ColorManager['hexToArray']=function(_0x54a0c4){const _0x15aeca=_0x5935ea;let _0x31d27e='';if(/^#([A-Fa-f0-9]{3}){1,2}$/[_0x15aeca(0x2d6)](_0x54a0c4)){_0x31d27e=_0x54a0c4['substring'](0x1)[_0x15aeca(0x2c2)]('');_0x31d27e['length']===0x3&&(_0x31d27e=[_0x31d27e[0x0],_0x31d27e[0x0],_0x31d27e[0x1],_0x31d27e[0x1],_0x31d27e[0x2],_0x31d27e[0x2]]);while(_0x31d27e['length']>0x6)_0x31d27e[_0x15aeca(0x277)]();return _0x31d27e='0x'+_0x31d27e[_0x15aeca(0x2be)](''),[(_0x31d27e>>0x10&0xff)[_0x15aeca(0x2d9)](0x0,0xff),(_0x31d27e>>0x8&0xff)[_0x15aeca(0x2d9)](0x0,0xff),(_0x31d27e&0xff)[_0x15aeca(0x2d9)](0x0,0xff)];}else return[0x0,0x0,0x0];},ColorManager[_0x5935ea(0x222)]=function(_0x4db0d8){const _0x36165=_0x5935ea;while(_0x4db0d8['length']<0x3)_0x4db0d8[_0x36165(0x19d)](0x0);while(_0x4db0d8['length']>0x3)_0x4db0d8[_0x36165(0x277)]();return'#'+_0x4db0d8[_0x36165(0x2a3)](_0x5c5d35=>_0x5c5d35[_0x36165(0x2d9)](0x0,0xff)['toString'](0x10)[_0x36165(0x18f)](0x2))[_0x36165(0x2be)]('');},ColorManager[_0x5935ea(0xf8)]=function(_0x17b49b){const _0x4f9b65=_0x5935ea;_0x17b49b[_0x4f9b65(0x2ed)]===''&&(_0x17b49b['pattern']=ColorManager[_0x4f9b65(0x1d0)](_0x17b49b['patternName']));},ColorManager[_0x5935ea(0x1d0)]=function(_0x46f239){const _0x4c34be=_0x5935ea;_0x46f239=_0x46f239['toLowerCase']()[_0x4c34be(0x133)]();switch(_0x46f239){case'normal':case'-':return'z';case'flicker':case'flicker1':case'halogen':return _0x4c34be(0x2d7);case _0x4c34be(0x2b8):case'pulse1':case _0x4c34be(0x23a):return _0x4c34be(0x272);case'candle':case _0x4c34be(0x91):return _0x4c34be(0x8c);case _0x4c34be(0x329):case _0x4c34be(0x2b4):case'strobe1':return _0x4c34be(0x229);case _0x4c34be(0x28f):case _0x4c34be(0x10c):return _0x4c34be(0x24c);case _0x4c34be(0x20a):case _0x4c34be(0x280):return _0x4c34be(0x2de);case _0x4c34be(0xb6):case'torch':return _0x4c34be(0x11d);case _0x4c34be(0x2bd):case _0x4c34be(0x288):return _0x4c34be(0x122);case _0x4c34be(0x13d):case _0x4c34be(0x265):return _0x4c34be(0x208);case'fluorescent':case _0x4c34be(0x261):return _0x4c34be(0x211);case _0x4c34be(0x28f):case _0x4c34be(0x247):return _0x4c34be(0x2ac);case'underwater':return _0x4c34be(0x195);}return'';},SceneManager[_0x5935ea(0x2d5)]=function(){const _0x2aa22e=_0x5935ea;return this[_0x2aa22e(0x1a3)]&&this[_0x2aa22e(0x1a3)][_0x2aa22e(0x315)]===Scene_Battle;},SceneManager['isSceneMap']=function(){const _0x33dddc=_0x5935ea;return this[_0x33dddc(0x1a3)]&&this[_0x33dddc(0x1a3)][_0x33dddc(0x315)]===Scene_Map;},SceneManager[_0x5935ea(0xac)]=function(_0x29c15a){const _0x1108de=_0x5935ea;this[_0x1108de(0x1a3)]&&this[_0x1108de(0x1a3)]['_lightContainer']&&this[_0x1108de(0x1a3)][_0x1108de(0x8f)][_0x1108de(0x2f4)](_0x29c15a);},SceneManager['removeChildFromLightContainer']=function(_0x124cfa){const _0x888758=_0x5935ea;this[_0x888758(0x1a3)]&&this[_0x888758(0x1a3)][_0x888758(0x8f)]&&this[_0x888758(0x1a3)][_0x888758(0x8f)][_0x888758(0x136)](_0x124cfa);},Game_Temp[_0x5935ea(0x9a)][_0x5935ea(0x28e)]=function(_0x2b3a27){const _0x46ea5d=_0x5935ea,_0x380796=_0x2b3a27['update'];this[_0x46ea5d(0xd9)]=this[_0x46ea5d(0xd9)]||[];const _0x49d8a3=this[_0x46ea5d(0xd9)][_0x46ea5d(0x270)];this[_0x46ea5d(0xd9)][_0x49d8a3]=new Function(_0x380796),this[_0x46ea5d(0xbf)](_0x49d8a3,_0x2b3a27);},Game_Temp['prototype'][_0x5935ea(0xbf)]=function(_0x217ad1,_0x4bd25b){const _0x3c1c90=_0x5935ea;if(!_0x4bd25b)return;this[_0x3c1c90(0xd9)]=this[_0x3c1c90(0xd9)]||[];const _0x3b9b95=this[_0x3c1c90(0xd9)][_0x217ad1];if(!_0x3b9b95)return;const _0x525fbd=_0x3b9b95[_0x3c1c90(0x2cb)](_0x4bd25b,_0x4bd25b,_0x4bd25b[_0x3c1c90(0xcb)]);if(!_0x525fbd)return;_0x4bd25b['x']=Math[_0x3c1c90(0x294)](_0x525fbd['x']||0x0),_0x4bd25b['y']=Math[_0x3c1c90(0x294)](_0x525fbd['y']||0x0),_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x1df)]=_0x525fbd[_0x3c1c90(0x1df)]??_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x1df)],_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x328)]=_0x525fbd[_0x3c1c90(0x328)]??_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x328)],_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x128)]=_0x525fbd[_0x3c1c90(0x128)]??_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x128)],_0x4bd25b['settings']['angle']=_0x525fbd['angle']??_0x4bd25b['settings'][_0x3c1c90(0xf2)],_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x276)]=_0x525fbd['opacity']??_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x276)];if(_0x4bd25b[_0x3c1c90(0xb1)]<0xa){const _0x50e5dd=_0x4bd25b[_0x3c1c90(0xb1)]*0.1;_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x276)]=Math[_0x3c1c90(0x294)](_0x4bd25b[_0x3c1c90(0x1d5)][_0x3c1c90(0x276)]*_0x50e5dd)[_0x3c1c90(0x2d9)](0x0,0xff);}},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x187)]=Game_Screen[_0x5935ea(0x9a)][_0x5935ea(0xb8)],Game_Screen[_0x5935ea(0x9a)][_0x5935ea(0xb8)]=function(){const _0x273d54=_0x5935ea;VisuMZ['LightingEffects']['Game_Screen_initialize'][_0x273d54(0x2cb)](this),this[_0x273d54(0x279)]();},VisuMZ[_0x5935ea(0x2e3)]['Game_Screen_update']=Game_Screen['prototype'][_0x5935ea(0x13e)],Game_Screen[_0x5935ea(0x9a)][_0x5935ea(0x13e)]=function(){const _0xcaf02d=_0x5935ea;VisuMZ[_0xcaf02d(0x2e3)][_0xcaf02d(0x11e)]['call'](this),this[_0xcaf02d(0xbb)](),this[_0xcaf02d(0x2c8)]();},Game_Screen[_0x5935ea(0x9a)][_0x5935ea(0x82)]=function(_0x29d25f){const _0x374a00=_0x5935ea;_0x29d25f=_0x29d25f[_0x374a00(0x1c3)]()[_0x374a00(0x133)]();if(this[_0x374a00(0x135)](_0x29d25f))return;else{const _0x38d7ef=_0x29d25f[_0x374a00(0x2c2)](',')['map'](_0x296cb8=>(Number(_0x296cb8)||0x0)['clamp'](-0xff,0xff));while(_0x38d7ef[_0x374a00(0x270)]<0x3)_0x38d7ef[_0x374a00(0x19d)](0x0);_0x38d7ef[0x3]=Math[_0x374a00(0x309)](_0x38d7ef[0x3]),this[_0x374a00(0x12b)](_0x38d7ef,0x0);}},Game_Screen['prototype']['checkLightingEffectsAutoTintPresets']=function(_0x521c37){const _0x453295=_0x5935ea;_0x521c37=_0x521c37['toLowerCase']()['trim']();switch(_0x521c37){case _0x453295(0x1a0):this[_0x453295(0x12b)]([0x0,0x0,0x0,0x0],0x0);return!![];case _0x453295(0x15c):this[_0x453295(0x12b)]([-0x44,-0x44,-0x44,0x0],0x0);return!![];case _0x453295(0x171):this[_0x453295(0x12b)]([0x22,-0x22,-0x44,0xaa],0x0);return!![];case'sunset':this[_0x453295(0x12b)]([0x44,-0x22,-0x22,0x0],0x0);return!![];case'night':this[_0x453295(0x12b)]([-0x44,-0x44,0x0,0x44],0x0);return!![];default:return![];}},Game_Screen[_0x5935ea(0x9a)][_0x5935ea(0x279)]=function(){const _0x85f1d0=_0x5935ea;this['_lightingEffects']={'color':_0x85f1d0(0x168),'targetColor':'#ffffff','colorDuration':0x0,'opacity':0xff,'targetOpacity':0xff,'opacityDuration':0x0,'cacheOpacity':undefined};},Game_Screen[_0x5935ea(0x9a)][_0x5935ea(0x263)]=function(){const _0x2b7363=_0x5935ea;if(this['_lightingEffects']===undefined)this[_0x2b7363(0x279)]();return this['_lightingEffects'];},Game_Screen[_0x5935ea(0x9a)]['lightingOverlayColor']=function(){const _0x3b5608=_0x5935ea;if(this[_0x3b5608(0x1eb)]())return this[_0x3b5608(0x1b2)]();return this[_0x3b5608(0x263)]()[_0x3b5608(0x1df)]??_0x3b5608(0x168);},Game_Screen['prototype']['isUsingTimeOverlay']=function(){const _0x5932a2=_0x5935ea;if(!Imported[_0x5932a2(0x2b0)])return![];if(!$gameMap)return![];return $gameMap[_0x5932a2(0x200)]();},Game_Screen[_0x5935ea(0x9a)]['processLightingOverlayColor']=function(_0x4f5ebf,_0x55cf48){const _0x5973d1=_0x5935ea;let _0x54b3a7=_0x5973d1(0x168),_0x5a3df0=0xff;_0x55cf48=_0x55cf48||0x0;if(_0x4f5ebf[_0x5973d1(0x325)](/\#(.*)/i))_0x54b3a7=_0x5973d1(0xcd)['format'](String(RegExp['$1']));else{_0x4f5ebf=_0x4f5ebf[_0x5973d1(0x1c3)](),_0x54b3a7=ColorManager[_0x5973d1(0x2f3)](_0x4f5ebf);switch(_0x4f5ebf){case _0x5973d1(0x1a0):case _0x5973d1(0xe3):case _0x5973d1(0x1ee):_0x5a3df0=0x0;break;case _0x5973d1(0x1f2):case _0x5973d1(0x15c):case'night':_0x5a3df0=0xf0;break;case _0x5973d1(0xca):case _0x5973d1(0xd2):_0x5a3df0=0x80;break;default:if(_0x4f5ebf['match'](/light/i))_0x5a3df0=0xc0;else _0x4f5ebf[_0x5973d1(0x325)](/dark/i)?_0x5a3df0=0xff:_0x5a3df0=0xf0;break;}}this['shiftLightingOverlayColor'](_0x54b3a7,_0x55cf48),this[_0x5973d1(0x13c)](_0x5a3df0,_0x55cf48);},Game_Screen[_0x5935ea(0x9a)][_0x5935ea(0xd0)]=function(_0x3bb727){const _0xe537a=_0x5935ea;this[_0xe537a(0x263)]()[_0xe537a(0x1df)]=_0x3bb727,this['lightingEffects']()[_0xe537a(0x235)]=undefined;},Game_Screen[_0x5935ea(0x184)]=![],Game_Screen['prototype'][_0x5935ea(0xb4)]=function(){const _0x5d3b66=_0x5935ea;if($gameMap&&$gameMap[_0x5d3b66(0x2a9)]())return 0x0;if(Game_Screen[_0x5d3b66(0x184)]&&Sprite_LightingEffects[_0x5d3b66(0x21e)])return this[_0x5d3b66(0x263)]()[_0x5d3b66(0x235)]===undefined&&(this[_0x5d3b66(0x263)]()['cacheOpacity']=VisuMZ[_0x5d3b66(0x2e3)][_0x5d3b66(0x20e)]()),this[_0x5d3b66(0x263)]()['cacheOpacity'];return this[_0x5d3b66(0x263)]()[_0x5d3b66(0x276)]??0xff;},Game_Screen['prototype']['setLightingOverlayOpacity']=function(_0x1e6366){const _0x3f0682=_0x5935ea;return this[_0x3f0682(0x263)]()[_0x3f0682(0x235)]=undefined,this[_0x3f0682(0x263)]()[_0x3f0682(0x276)]=Math[_0x3f0682(0x294)](_0x1e6366)[_0x3f0682(0x2d9)](0x0,0xff);},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x20e)]=function(){const _0x5a4dde=_0x5935ea,_0x4e3d24=$gameScreen[_0x5a4dde(0x263)]()[_0x5a4dde(0x276)],_0x10f5f8=$gameScreen['lightingOverlayColor'](),_0x2e3eb8=ColorManager[_0x5a4dde(0x28c)](_0x10f5f8),_0x1b8a81=Math[_0x5a4dde(0x294)](_0x2e3eb8['reduce']((_0x5efeb3,_0x50fe3e)=>_0x5efeb3+_0x50fe3e,0x0)/_0x2e3eb8['length']),_0x3ecdc0=0xc0;if(_0x1b8a81<_0x3ecdc0)return _0x4e3d24;const _0x4d9382=(0xff-_0x1b8a81)/(0xff-_0x3ecdc0);return Math[_0x5a4dde(0x1b6)](_0x4d9382*_0x4e3d24)[_0x5a4dde(0x2d9)](0x0,0xff);},Game_Screen['prototype'][_0x5935ea(0x196)]=function(_0x200200,_0x26645d){const _0x509b80=_0x5935ea;this[_0x509b80(0x263)]()[_0x509b80(0x17e)]=_0x200200,this[_0x509b80(0x263)]()[_0x509b80(0x10d)]=_0x26645d,_0x26645d<=0x0&&(this[_0x509b80(0x263)]()['color']=_0x200200,this['lightingEffects']()[_0x509b80(0x235)]=undefined);},Game_Screen['prototype'][_0x5935ea(0xbb)]=function(){const _0x229bc5=_0x5935ea;if(this[_0x229bc5(0x263)]()[_0x229bc5(0x10d)]<=0x0)return;const _0x2291da=this[_0x229bc5(0x263)]()[_0x229bc5(0x10d)],_0x200218=ColorManager[_0x229bc5(0x28c)](this[_0x229bc5(0x263)]()['color']),_0x32b6bf=ColorManager['hexToArray'](this[_0x229bc5(0x263)]()[_0x229bc5(0x17e)]);for(let _0x15af7c=0x0;_0x15af7c<0x3;_0x15af7c++){_0x200218[_0x15af7c]=Math[_0x229bc5(0x294)]((_0x200218[_0x15af7c]*(_0x2291da-0x1)+_0x32b6bf[_0x15af7c])/_0x2291da);}this['lightingEffects']()['color']=ColorManager['arrayToHex'](_0x200218),this[_0x229bc5(0x263)]()[_0x229bc5(0x235)]=undefined,this['lightingEffects']()[_0x229bc5(0x10d)]--,this['lightingEffects']()[_0x229bc5(0x10d)]<=0x0&&(this[_0x229bc5(0x263)]()[_0x229bc5(0x1df)]=this[_0x229bc5(0x263)]()[_0x229bc5(0x17e)]);},Game_Screen[_0x5935ea(0x9a)][_0x5935ea(0x13c)]=function(_0x4f3f03,_0x18ff75){const _0xbf47d6=_0x5935ea;this['lightingEffects']()[_0xbf47d6(0x27b)]=_0x4f3f03,this[_0xbf47d6(0x263)]()[_0xbf47d6(0x88)]=_0x18ff75,_0x18ff75<=0x0&&(this[_0xbf47d6(0x263)]()[_0xbf47d6(0x276)]=_0x4f3f03,this[_0xbf47d6(0x263)]()[_0xbf47d6(0x235)]=undefined);},Game_Screen['prototype']['updateLightingEffectsOpacity']=function(){const _0x468146=_0x5935ea;if(this[_0x468146(0x263)]()['opacityDuration']<=0x0)return;const _0x179924=this['lightingEffects']()['opacityDuration'],_0x4a31a5=this['lightingEffects']()[_0x468146(0x276)],_0x67a751=this[_0x468146(0x263)]()[_0x468146(0x27b)];this[_0x468146(0x263)]()[_0x468146(0x276)]=(_0x4a31a5*(_0x179924-0x1)+_0x67a751)/_0x179924,this[_0x468146(0x263)]()[_0x468146(0x235)]=undefined,this[_0x468146(0x263)]()[_0x468146(0x88)]--,this[_0x468146(0x263)]()['opacityDuration']<=0x0&&(this[_0x468146(0x263)]()['opacity']=_0x67a751);},VisuMZ['LightingEffects'][_0x5935ea(0x93)]=Game_BattlerBase[_0x5935ea(0x9a)]['initMembers'],Game_BattlerBase['prototype'][_0x5935ea(0x1c1)]=function(){const _0x3585df=_0x5935ea;VisuMZ[_0x3585df(0x2e3)][_0x3585df(0x93)][_0x3585df(0x2cb)](this),this[_0x3585df(0x14e)]();},Game_BattlerBase[_0x5935ea(0x9a)][_0x5935ea(0x14e)]=function(){const _0x3347a5=_0x5935ea;this[_0x3347a5(0x11a)]={},this[_0x3347a5(0x1c4)]={};},Game_BattlerBase[_0x5935ea(0x9a)][_0x5935ea(0x186)]=function(){const _0x35c2b6=_0x5935ea;if(this['_radialLight']===undefined)this['initLightingEffectsSettings']();return this[_0x35c2b6(0x11a)];},Game_BattlerBase[_0x5935ea(0x9a)][_0x5935ea(0x1ea)]=function(_0x436d17){const _0x294e51=_0x5935ea;if(this[_0x294e51(0x11a)]===undefined)this[_0x294e51(0x14e)]();this['_radialLight']=JsonEx[_0x294e51(0x16d)](_0x436d17);},Game_BattlerBase[_0x5935ea(0x9a)][_0x5935ea(0xab)]=function(){const _0x14b323=_0x5935ea;if(this[_0x14b323(0x1c4)]===undefined)this[_0x14b323(0x14e)]();return this[_0x14b323(0x1c4)];},Game_BattlerBase['prototype'][_0x5935ea(0x143)]=function(_0x424c68){const _0x21cb86=_0x5935ea;if(this[_0x21cb86(0x1c4)]===undefined)this[_0x21cb86(0x14e)]();this[_0x21cb86(0x1c4)]=JsonEx['makeDeepCopy'](_0x424c68),ColorManager[_0x21cb86(0xf8)](this[_0x21cb86(0x1c4)]);},Game_Battler[_0x5935ea(0x9a)][_0x5935ea(0xd7)]=function(_0x4cd3f5){const _0x142e1b=_0x5935ea;_0x4cd3f5=_0x4cd3f5||'',Game_Event[_0x142e1b(0x9a)][_0x142e1b(0x1d4)][_0x142e1b(0x2cb)](this,_0x4cd3f5),Game_Event[_0x142e1b(0x9a)][_0x142e1b(0x250)]['call'](this,_0x4cd3f5);},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x293)]=Game_Actor[_0x5935ea(0x9a)]['setup'],Game_Actor[_0x5935ea(0x9a)]['setup']=function(_0x323542){const _0x10fe53=_0x5935ea;VisuMZ[_0x10fe53(0x2e3)][_0x10fe53(0x293)]['call'](this,_0x323542),this['initLightingEffects'](),this['setupBattleLightingEffectsSettings']();},Game_Actor[_0x5935ea(0x9a)][_0x5935ea(0x279)]=function(){const _0x33cc24=_0x5935ea,_0x5f1d74=VisuMZ['LightingEffects']['Settings'];this['_conicalLightWalkOffsets']=JsonEx[_0x33cc24(0x16d)](_0x5f1d74[_0x33cc24(0x13a)]),this[_0x33cc24(0x242)]=JsonEx[_0x33cc24(0x16d)](_0x5f1d74[_0x33cc24(0xc7)]),this[_0x33cc24(0x95)]=JsonEx[_0x33cc24(0x16d)](_0x5f1d74[_0x33cc24(0x2d8)]);const _0x199db9=this[_0x33cc24(0x1ff)]()[_0x33cc24(0x257)]||'';Game_Event[_0x33cc24(0x9a)][_0x33cc24(0x118)][_0x33cc24(0x2cb)](this,_0x199db9);},Game_Actor['prototype'][_0x5935ea(0xba)]=function(){const _0x276ae6=_0x5935ea;if(this[_0x276ae6(0x1ce)]===undefined)this[_0x276ae6(0x279)]();return this[_0x276ae6(0x1ce)];},Game_Actor[_0x5935ea(0x9a)][_0x5935ea(0x1e8)]=function(_0x6430c){const _0x2f11b9=_0x5935ea;if(this[_0x2f11b9(0x1ce)]===undefined)this[_0x2f11b9(0x279)]();this[_0x2f11b9(0x1ce)]=JsonEx['makeDeepCopy'](_0x6430c);},Game_Actor[_0x5935ea(0x9a)]['conicalLightDashOffsets']=function(){const _0x3449b4=_0x5935ea;if(this[_0x3449b4(0x242)]===undefined)this[_0x3449b4(0x279)]();return this[_0x3449b4(0x242)];},Game_Actor[_0x5935ea(0x9a)][_0x5935ea(0x14d)]=function(_0x4618ed){const _0x150334=_0x5935ea;if(this[_0x150334(0x242)]===undefined)this[_0x150334(0x279)]();this[_0x150334(0x242)]=JsonEx[_0x150334(0x16d)](_0x4618ed);},Game_Actor[_0x5935ea(0x9a)][_0x5935ea(0x275)]=function(){const _0x509093=_0x5935ea;if(this['_conicalLightJumpOffsets']===undefined)this[_0x509093(0x279)]();return this[_0x509093(0x95)];},Game_Actor[_0x5935ea(0x9a)][_0x5935ea(0x210)]=function(_0x4ae5d6){const _0x517d06=_0x5935ea;if(this[_0x517d06(0x95)]===undefined)this[_0x517d06(0x279)]();this['_conicalLightJumpOffsets']=JsonEx['makeDeepCopy'](_0x4ae5d6);},Game_Actor[_0x5935ea(0x9a)][_0x5935ea(0x14e)]=function(){const _0x4bfec0=_0x5935ea;Game_Battler[_0x4bfec0(0x9a)][_0x4bfec0(0x14e)]['call'](this);const _0x66387d=VisuMZ[_0x4bfec0(0x2e3)][_0x4bfec0(0x1e1)][_0x4bfec0(0xe9)];this['setRadialLightSettings'](_0x66387d[_0x4bfec0(0x237)]),this[_0x4bfec0(0x143)](_0x66387d['ActorRadialBehavior']),this['radialLight']()[_0x4bfec0(0x20b)]=_0x66387d[_0x4bfec0(0x324)];},Game_Actor[_0x5935ea(0x9a)][_0x5935ea(0xd7)]=function(){const _0x560d65=_0x5935ea,_0x4f57e1=this[_0x560d65(0x1ff)]()[_0x560d65(0x257)];Game_Battler[_0x560d65(0x9a)]['setupBattleLightingEffectsSettings']['call'](this,_0x4f57e1);},Game_Enemy[_0x5935ea(0x9a)][_0x5935ea(0x14e)]=function(){const _0x116d74=_0x5935ea;Game_Battler[_0x116d74(0x9a)][_0x116d74(0x14e)][_0x116d74(0x2cb)](this);const _0x1894a7=VisuMZ[_0x116d74(0x2e3)][_0x116d74(0x1e1)]['Battle'];this['setRadialLightSettings'](_0x1894a7['EnemyRadial']),this[_0x116d74(0x143)](_0x1894a7['EnemyRadialBehavior']),this['radialLight']()[_0x116d74(0x20b)]=_0x1894a7[_0x116d74(0x146)];},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x2ee)]=Game_Enemy[_0x5935ea(0x9a)][_0x5935ea(0x188)],Game_Enemy[_0x5935ea(0x9a)]['setup']=function(_0x37500f,_0x1eb2a0,_0x2dc2dc){const _0x4af5f2=_0x5935ea;VisuMZ['LightingEffects'][_0x4af5f2(0x2ee)][_0x4af5f2(0x2cb)](this,_0x37500f,_0x1eb2a0,_0x2dc2dc),this[_0x4af5f2(0xd7)]();},Game_Enemy[_0x5935ea(0x9a)][_0x5935ea(0xd7)]=function(){const _0x29093b=_0x5935ea,_0x7a3bc0=this[_0x29093b(0x2c7)]()['note'];Game_Battler['prototype'][_0x29093b(0xd7)][_0x29093b(0x2cb)](this,_0x7a3bc0);},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x2da)]=Game_Map[_0x5935ea(0x9a)][_0x5935ea(0x188)],Game_Map[_0x5935ea(0x9a)][_0x5935ea(0x188)]=function(_0x1d6c10){const _0x251934=_0x5935ea;VisuMZ['LightingEffects'][_0x251934(0x2da)]['call'](this,_0x1d6c10),this[_0x251934(0x30f)](),this[_0x251934(0xa7)]();},Game_Map[_0x5935ea(0x9a)][_0x5935ea(0x30f)]=function(){const _0x4a29b0=_0x5935ea;if(!$dataMap)return;const _0x5965b7=VisuMZ[_0x4a29b0(0x2e3)][_0x4a29b0(0x1c0)],_0x3c2027=$dataMap[_0x4a29b0(0x257)]||'',_0x2b2d40=(this[_0x4a29b0(0x2f8)]()?this[_0x4a29b0(0x2f8)]()['note']:'')||'',_0x1ad4d3=VisuMZ[_0x4a29b0(0x2e3)][_0x4a29b0(0x1e1)]['AntiLight'];this['_antiLightMasks']={'hardRegionIDs':_0x1ad4d3[_0x4a29b0(0x7f)]['clone'](),'hardTerrainTagIDs':_0x1ad4d3[_0x4a29b0(0x79)][_0x4a29b0(0x24f)](),'softRegionIDs':_0x1ad4d3[_0x4a29b0(0x1ef)][_0x4a29b0(0x24f)](),'softTerrainTagIDs':_0x1ad4d3[_0x4a29b0(0xda)][_0x4a29b0(0x24f)]()};_0x3c2027['match'](_0x5965b7[_0x4a29b0(0xc8)])&&$gameScreen[_0x4a29b0(0x82)](RegExp['$1']);this['_noDarknessOverlay']=![];_0x3c2027[_0x4a29b0(0x325)](_0x5965b7[_0x4a29b0(0xf6)])&&$gameScreen[_0x4a29b0(0x9e)](RegExp['$1']);if(_0x3c2027[_0x4a29b0(0x325)](_0x5965b7['lightingOverlayOpacityValue']))$gameScreen[_0x4a29b0(0x249)](Number(RegExp['$1']));else{if(_0x3c2027[_0x4a29b0(0x325)](_0x5965b7[_0x4a29b0(0x1ec)])){const _0xdbbf5b=Number(RegExp['$1'])*0.01,_0x156a60=Math[_0x4a29b0(0x294)](_0xdbbf5b*0xff);$gameScreen[_0x4a29b0(0x249)](_0x156a60);}}_0x3c2027[_0x4a29b0(0x325)](_0x5965b7[_0x4a29b0(0x10f)])&&(this[_0x4a29b0(0xee)]=!![]),_0x3c2027['match'](_0x5965b7[_0x4a29b0(0x2a8)])&&(this[_0x4a29b0(0x1cb)][_0x4a29b0(0x123)]=String(RegExp['$1'])[_0x4a29b0(0x2c2)](',')[_0x4a29b0(0x2a3)](_0x3ea491=>(Number(_0x3ea491)||0x1)[_0x4a29b0(0x2d9)](0x1,0xff))),_0x2b2d40['match'](_0x5965b7['antiLightMaskHardTerrainTags'])&&(this[_0x4a29b0(0x1cb)][_0x4a29b0(0x1c7)]=String(RegExp['$1'])[_0x4a29b0(0x2c2)](',')[_0x4a29b0(0x2a3)](_0x4ae3ac=>(Number(_0x4ae3ac)||0x1)[_0x4a29b0(0x2d9)](0x1,0x7))),_0x3c2027[_0x4a29b0(0x325)](_0x5965b7[_0x4a29b0(0x180)])&&(this[_0x4a29b0(0x1cb)][_0x4a29b0(0x1b0)]=String(RegExp['$1'])['split'](',')[_0x4a29b0(0x2a3)](_0x3241f0=>(Number(_0x3241f0)||0x1)[_0x4a29b0(0x2d9)](0x1,0xff))),_0x2b2d40[_0x4a29b0(0x325)](_0x5965b7['antiLightMaskSoftTerrainTags'])&&(this[_0x4a29b0(0x1cb)][_0x4a29b0(0x297)]=String(RegExp['$1'])[_0x4a29b0(0x2c2)](',')['map'](_0x57b408=>(Number(_0x57b408)||0x1)['clamp'](0x1,0x7)));},Game_Map['prototype'][_0x5935ea(0x1b1)]=function(){const _0x572fc1=_0x5935ea;if(this[_0x572fc1(0x252)]()[_0x572fc1(0x270)]>0x0)return!![];if(this[_0x572fc1(0x23d)]()[_0x572fc1(0x270)]>0x0)return!![];return![];},Game_Map[_0x5935ea(0x9a)][_0x5935ea(0x252)]=function(){const _0x3eba98=_0x5935ea;if(this[_0x3eba98(0x1cb)]===undefined)this[_0x3eba98(0x30f)]();return this[_0x3eba98(0x1cb)]?.['hardRegionIDs']??[];},Game_Map[_0x5935ea(0x9a)]['hardAntiLightTerrainTags']=function(){const _0x1bb082=_0x5935ea;if(this[_0x1bb082(0x1cb)]===undefined)this[_0x1bb082(0x30f)]();return this[_0x1bb082(0x1cb)]?.[_0x1bb082(0x1c7)]??[];},Game_Map[_0x5935ea(0x9a)][_0x5935ea(0x2fc)]=function(){const _0x277c88=_0x5935ea;if(this['_antiLightMasks']===undefined)this[_0x277c88(0x30f)]();return this[_0x277c88(0x1cb)]?.[_0x277c88(0x1b0)]??[];},Game_Map['prototype'][_0x5935ea(0xb2)]=function(){const _0x5aee45=_0x5935ea;if(this['_antiLightMasks']===undefined)this['setupLightingEffectsNotetags']();return this['_antiLightMasks']?.[_0x5aee45(0x297)]??[];},Game_Map['prototype'][_0x5935ea(0xa7)]=function(){const _0x721c78=_0x5935ea;this['_lightSpawns']=[],$gameTemp[_0x721c78(0xd9)]=[];},Game_Map[_0x5935ea(0x9a)][_0x5935ea(0x21b)]=function(){const _0x424f26=_0x5935ea;if(this[_0x424f26(0x2c5)]===undefined)this['setupLightingEffectsSpawns']();return this[_0x424f26(0x2c5)];},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x2ae)]=Game_Map[_0x5935ea(0x9a)]['update'],Game_Map[_0x5935ea(0x9a)]['update']=function(_0x11ef2d){const _0x3e96ba=_0x5935ea;VisuMZ['LightingEffects'][_0x3e96ba(0x2ae)]['call'](this,_0x11ef2d),this[_0x3e96ba(0x86)]();},Game_Map['prototype'][_0x5935ea(0x86)]=function(){const _0x50ae3e=_0x5935ea,_0x450983=this[_0x50ae3e(0x21b)]()['length'];for(let _0x443079=0x0;_0x443079<_0x450983;_0x443079++){const _0x3a6703=this[_0x50ae3e(0x21b)]()[_0x443079];if(!_0x3a6703)continue;if(!_0x3a6703[_0x50ae3e(0x2c3)])continue;$gameTemp[_0x50ae3e(0xbf)](_0x443079,_0x3a6703),_0x3a6703[_0x50ae3e(0xcb)]++;if(_0x3a6703['expire']<Number['MAX_SAFE_INTEGER'])_0x3a6703['expire']--;if(_0x3a6703['expire']<=0x0)_0x3a6703[_0x50ae3e(0x2c3)]=![];}},Game_Map[_0x5935ea(0x9a)][_0x5935ea(0x283)]=function(_0x4a0527){const _0x2ea0b1=_0x5935ea;$gameTemp[_0x2ea0b1(0x28e)](_0x4a0527),this[_0x2ea0b1(0x21b)]()['push'](_0x4a0527);const _0x191e71=new Sprite_LightSpawn(_0x4a0527);SceneManager[_0x2ea0b1(0xac)](_0x191e71);},Game_Map[_0x5935ea(0x9a)][_0x5935ea(0x2a9)]=function(){const _0x32e5a7=_0x5935ea;return this[_0x32e5a7(0xee)];},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x14e)]=function(){const _0x14ca5f=_0x5935ea;this[_0x14ca5f(0x11a)]={},this[_0x14ca5f(0x1c4)]={},this['_conicalLight']={},this[_0x14ca5f(0x32b)]={};const _0x5a9cac=VisuMZ[_0x14ca5f(0x2e3)]['Settings'];this['_conicalLightWalkOffsets']=JsonEx[_0x14ca5f(0x16d)](_0x5a9cac[_0x14ca5f(0x13a)]),this[_0x14ca5f(0x242)]=JsonEx['makeDeepCopy'](_0x5a9cac[_0x14ca5f(0xc7)]),this[_0x14ca5f(0x95)]=JsonEx['makeDeepCopy'](_0x5a9cac[_0x14ca5f(0x2d8)]);},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x186)]=function(){const _0x26f1a7=_0x5935ea;if(this[_0x26f1a7(0x11a)]===undefined)this[_0x26f1a7(0x14e)]();return this[_0x26f1a7(0x11a)];},Game_CharacterBase['prototype']['setRadialLightSettings']=function(_0x10e3ba){const _0x2d78ac=_0x5935ea;if(this[_0x2d78ac(0x11a)]===undefined)this['initLightingEffectsSettings']();this[_0x2d78ac(0x11a)]=JsonEx[_0x2d78ac(0x16d)](_0x10e3ba);},Game_CharacterBase[_0x5935ea(0x9a)]['radialLightBehavior']=function(){const _0x2d9b4f=_0x5935ea;if(this['_radialLightBehavior']===undefined)this['initLightingEffectsSettings']();return this[_0x2d9b4f(0x1c4)];},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x143)]=function(_0x17dfa7){const _0x16b525=_0x5935ea;if(this['_radialLightBehavior']===undefined)this[_0x16b525(0x14e)]();this[_0x16b525(0x1c4)]=JsonEx['makeDeepCopy'](_0x17dfa7),ColorManager[_0x16b525(0xf8)](this[_0x16b525(0x1c4)]);},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x1c5)]=function(){const _0x5006f9=_0x5935ea;if(this[_0x5006f9(0x121)]===undefined)this[_0x5006f9(0x14e)]();return this[_0x5006f9(0x121)];},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x27d)]=function(_0x111178){const _0x4b54e2=_0x5935ea;if(this[_0x4b54e2(0x121)]===undefined)this['initLightingEffectsSettings']();this[_0x4b54e2(0x121)]=JsonEx[_0x4b54e2(0x16d)](_0x111178);},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x109)]=function(){const _0x4c09d6=_0x5935ea;if(this[_0x4c09d6(0x32b)]===undefined)this[_0x4c09d6(0x14e)]();return this[_0x4c09d6(0x32b)];},Game_CharacterBase['prototype'][_0x5935ea(0x2e9)]=function(_0x3f4ec4){const _0x4ca1=_0x5935ea;if(this[_0x4ca1(0x32b)]===undefined)this[_0x4ca1(0x14e)]();this[_0x4ca1(0x32b)]=JsonEx[_0x4ca1(0x16d)](_0x3f4ec4),ColorManager[_0x4ca1(0xf8)](this['_conicalLightBehavior']);},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x22f)]=function(){const _0x50a231=_0x5935ea;if(this[_0x50a231(0x1fe)]()){if(this['isDashingAndMoving']())return this[_0x50a231(0x1ab)]();else{if(this[_0x50a231(0x323)]())return this[_0x50a231(0x275)]();}}return this['conicalLightWalkOffsets']();},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0xba)]=function(){const _0x197ff6=_0x5935ea;if(this[_0x197ff6(0x1ce)]===undefined)this['initLightingEffects']();return this[_0x197ff6(0x1ce)];},Game_CharacterBase[_0x5935ea(0x9a)]['setConicalLightWalkOffsets']=function(_0xcb4702){const _0x5336ac=_0x5935ea;if(this['_conicalLightWalkOffsets']===undefined)this[_0x5336ac(0x279)]();this[_0x5336ac(0x1ce)]=JsonEx[_0x5336ac(0x16d)](_0xcb4702);},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x1ab)]=function(){const _0x357f09=_0x5935ea;if(this[_0x357f09(0x242)]===undefined)this[_0x357f09(0x279)]();return this[_0x357f09(0x242)];},Game_CharacterBase['prototype'][_0x5935ea(0x14d)]=function(_0x5f219d){const _0x22cce9=_0x5935ea;if(this[_0x22cce9(0x242)]===undefined)this[_0x22cce9(0x279)]();this['_conicalLightDashOffsets']=JsonEx['makeDeepCopy'](_0x5f219d);},Game_CharacterBase[_0x5935ea(0x9a)][_0x5935ea(0x275)]=function(){const _0x5bed85=_0x5935ea;if(this['_conicalLightWalkOffsets']===undefined)this[_0x5bed85(0x279)]();return this[_0x5bed85(0x1ce)];},Game_CharacterBase[_0x5935ea(0x9a)]['setConicalLightJumpOffsets']=function(_0x4e7a1c){const _0x287b2e=_0x5935ea;if(this[_0x287b2e(0x95)]===undefined)this['initLightingEffects']();this[_0x287b2e(0x95)]=JsonEx[_0x287b2e(0x16d)](_0x4e7a1c);},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x307)]=Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x1c1)],Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x1c1)]=function(){const _0x422f1b=_0x5935ea;VisuMZ[_0x422f1b(0x2e3)][_0x422f1b(0x307)][_0x422f1b(0x2cb)](this),this[_0x422f1b(0x279)]();},Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x279)]=function(){const _0x188f77=_0x5935ea,_0x4b2d9b=VisuMZ[_0x188f77(0x2e3)][_0x188f77(0x1e1)][_0x188f77(0x21a)];this[_0x188f77(0x1ca)](_0x4b2d9b[_0x188f77(0x2b6)]),this[_0x188f77(0xdb)](_0x4b2d9b[_0x188f77(0xe5)]),this[_0x188f77(0x2fb)](_0x4b2d9b[_0x188f77(0x286)]),this[_0x188f77(0x1c6)](_0x4b2d9b['FollowerConicalBehavior']);},Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x14e)]=function(){const _0x2ddd11=_0x5935ea;Game_Character[_0x2ddd11(0x9a)][_0x2ddd11(0x14e)][_0x2ddd11(0x2cb)](this);const _0x422c87=VisuMZ[_0x2ddd11(0x2e3)][_0x2ddd11(0x1e1)][_0x2ddd11(0x21a)];this['setRadialLightSettings'](_0x422c87['PlayerRadial']),this[_0x2ddd11(0x143)](_0x422c87[_0x2ddd11(0x215)]),this[_0x2ddd11(0x27d)](_0x422c87[_0x2ddd11(0xd8)]),this[_0x2ddd11(0x2e9)](_0x422c87[_0x2ddd11(0x17a)]);},Game_Player[_0x5935ea(0x9a)]['getFollowerRadialLightSettings']=function(){const _0x2cb622=_0x5935ea;if(this[_0x2cb622(0xad)]===undefined)this['initLightingEffects']();return this[_0x2cb622(0xad)];},Game_Player[_0x5935ea(0x9a)]['setFollowerRadialLightSettings']=function(_0x177b6a){const _0x1a5eae=_0x5935ea;this['_followerRadialLight']=JsonEx[_0x1a5eae(0x16d)](_0x177b6a);},Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x20d)]=function(){const _0x1794fd=_0x5935ea;if(this[_0x1794fd(0x113)]===undefined)this[_0x1794fd(0x14e)]();return this[_0x1794fd(0x113)];},Game_Player[_0x5935ea(0x9a)][_0x5935ea(0xdb)]=function(_0x5c21ce){const _0xab11b5=_0x5935ea;if(this[_0xab11b5(0x113)]===undefined)this[_0xab11b5(0x14e)]();this[_0xab11b5(0x113)]=JsonEx['makeDeepCopy'](_0x5c21ce),ColorManager[_0xab11b5(0xf8)](this[_0xab11b5(0x113)]);},Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x24e)]=function(){const _0x57262a=_0x5935ea;if(this[_0x57262a(0x246)]===undefined)this[_0x57262a(0x279)]();return this[_0x57262a(0x246)];},Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x2fb)]=function(_0x4791f4){const _0x48f164=_0x5935ea;this[_0x48f164(0x246)]=JsonEx[_0x48f164(0x16d)](_0x4791f4);},Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x17d)]=function(){const _0x460334=_0x5935ea;if(this['_followerConicalLightBehavior']===undefined)this[_0x460334(0x14e)]();return this[_0x460334(0xaa)];},Game_Player[_0x5935ea(0x9a)]['setFollowerConicalLightBehavior']=function(_0x2477e8){const _0x1596d3=_0x5935ea;if(this[_0x1596d3(0xaa)]===undefined)this[_0x1596d3(0x14e)]();this['_followerConicalLightBehavior']=JsonEx[_0x1596d3(0x16d)](_0x2477e8),ColorManager[_0x1596d3(0xf8)](this[_0x1596d3(0xaa)]);},Game_Player['prototype'][_0x5935ea(0xba)]=function(){const _0x2b4100=_0x5935ea;return $gameParty[_0x2b4100(0x8e)]()?$gameParty[_0x2b4100(0x8e)]()['conicalLightWalkOffsets']():Game_Character[_0x2b4100(0x9a)]['conicalLightWalkOffsets'][_0x2b4100(0x2cb)](this);},Game_Player['prototype']['setConicalLightWalkOffsets']=function(_0x56787f){const _0x32824a=_0x5935ea;$gameParty[_0x32824a(0x8e)]()?$gameParty[_0x32824a(0x8e)]()[_0x32824a(0x1e8)](_0x56787f):Game_Character[_0x32824a(0x9a)]['setConicalLightWalkOffsets'][_0x32824a(0x2cb)](this,_0x56787f);},Game_Player[_0x5935ea(0x9a)][_0x5935ea(0x1ab)]=function(){const _0x1753d6=_0x5935ea;return $gameParty[_0x1753d6(0x8e)]()?$gameParty[_0x1753d6(0x8e)]()['conicalLightDashOffsets']():Game_Character['prototype']['conicalLightDashOffsets'][_0x1753d6(0x2cb)](this);},Game_Player['prototype']['setConicalLightDashOffsets']=function(_0x4a455d){const _0x5ef015=_0x5935ea;$gameParty[_0x5ef015(0x8e)]()?$gameParty['leader']()[_0x5ef015(0x14d)](_0x4a455d):Game_Character[_0x5ef015(0x9a)][_0x5ef015(0x14d)][_0x5ef015(0x2cb)](this,_0x4a455d);},Game_Player['prototype']['conicalLightJumpOffsets']=function(){const _0x1a7d81=_0x5935ea;return $gameParty[_0x1a7d81(0x8e)]()?$gameParty[_0x1a7d81(0x8e)]()[_0x1a7d81(0x275)]():Game_Character[_0x1a7d81(0x9a)][_0x1a7d81(0x275)]['call'](this);},Game_Player[_0x5935ea(0x9a)]['setConicalLightJumpOffsets']=function(_0x562030){const _0x2f0335=_0x5935ea;$gameParty[_0x2f0335(0x8e)]()?$gameParty[_0x2f0335(0x8e)]()['setConicalLightJumpOffsets'](_0x562030):Game_Character[_0x2f0335(0x9a)][_0x2f0335(0x210)]['call'](this,_0x562030);},Game_Follower[_0x5935ea(0x9a)]['radialLight']=function(){const _0x3f0a31=_0x5935ea;return $gamePlayer[_0x3f0a31(0x94)]();},Game_Follower['prototype'][_0x5935ea(0xab)]=function(){const _0x16d70=_0x5935ea;return $gamePlayer[_0x16d70(0x20d)]();},Game_Follower['prototype'][_0x5935ea(0x1c5)]=function(){const _0x4b0a7b=_0x5935ea;return $gamePlayer[_0x4b0a7b(0x24e)]();},Game_Follower[_0x5935ea(0x9a)][_0x5935ea(0x109)]=function(){const _0x325916=_0x5935ea;return $gamePlayer[_0x325916(0x17d)]();},Game_Follower['prototype'][_0x5935ea(0xba)]=function(){const _0x40fa72=_0x5935ea;return this[_0x40fa72(0x1ff)]()?this[_0x40fa72(0x1ff)]()['conicalLightWalkOffsets']():Game_Character[_0x40fa72(0x9a)][_0x40fa72(0xba)][_0x40fa72(0x2cb)](this);},Game_Follower['prototype'][_0x5935ea(0x1e8)]=function(_0x410a0d){const _0x248d1a=_0x5935ea;this[_0x248d1a(0x1ff)]()?this['actor']()[_0x248d1a(0x1e8)](_0x410a0d):Game_Character[_0x248d1a(0x9a)][_0x248d1a(0x1e8)][_0x248d1a(0x2cb)](this,_0x410a0d);},Game_Follower[_0x5935ea(0x9a)][_0x5935ea(0x1ab)]=function(){const _0x5867a8=_0x5935ea;return this['actor']()?this['actor']()['conicalLightDashOffsets']():Game_Character[_0x5867a8(0x9a)][_0x5867a8(0x1ab)]['call'](this);},Game_Follower[_0x5935ea(0x9a)][_0x5935ea(0x14d)]=function(_0x22ea1b){const _0x289cba=_0x5935ea;this[_0x289cba(0x1ff)]()?this['actor']()['setConicalLightDashOffsets'](_0x22ea1b):Game_Character['prototype'][_0x289cba(0x14d)][_0x289cba(0x2cb)](this,_0x22ea1b);},Game_Follower[_0x5935ea(0x9a)]['conicalLightJumpOffsets']=function(){const _0x5d4dc5=_0x5935ea;return this[_0x5d4dc5(0x1ff)]()?this[_0x5d4dc5(0x1ff)]()[_0x5d4dc5(0x275)]():Game_Character[_0x5d4dc5(0x9a)]['conicalLightJumpOffsets']['call'](this);},Game_Follower[_0x5935ea(0x9a)][_0x5935ea(0x210)]=function(_0x475076){const _0x277af1=_0x5935ea;this[_0x277af1(0x1ff)]()?this[_0x277af1(0x1ff)]()[_0x277af1(0x210)](_0x475076):Game_Character[_0x277af1(0x9a)][_0x277af1(0x210)][_0x277af1(0x2cb)](this,_0x475076);},Game_Vehicle['prototype'][_0x5935ea(0x14e)]=function(){const _0x42f42e=_0x5935ea;Game_Character[_0x42f42e(0x9a)][_0x42f42e(0x14e)][_0x42f42e(0x2cb)](this),this[_0x42f42e(0x18a)]();},Game_Vehicle[_0x5935ea(0x9a)][_0x5935ea(0x18a)]=function(){const _0xfb9d0f=_0x5935ea;let _0x1bdf1d=this[_0xfb9d0f(0x2ec)]();_0x1bdf1d=this[_0xfb9d0f(0x80)](_0x1bdf1d),this[_0xfb9d0f(0x2af)]=_0x1bdf1d;},Game_Vehicle[_0x5935ea(0x9a)]['createDefaultLightingEffectsVehicleData']=function(){return{'Boarded':{'Radial':{'Settings':{},'Behavior':{}},'Conical':{'Settings':{},'Behavior':{},'Offset':{}}},'Unboarded':{'Radial':{'Settings':{},'Behavior':{}},'Conical':{'Settings':{},'Behavior':{},'Offset':{}}}};},Game_Vehicle[_0x5935ea(0x9a)][_0x5935ea(0x80)]=function(_0x479aa1){const _0x2c2f74=_0x5935ea,_0x32c545=VisuMZ[_0x2c2f74(0x2e3)][_0x2c2f74(0x1e1)][_0x2c2f74(0x21a)];let _0x1bdc50='';if(this['isBoat']())_0x1bdc50=_0x2c2f74(0xdf);if(this[_0x2c2f74(0x175)]())_0x1bdc50=_0x2c2f74(0x298);if(this[_0x2c2f74(0x154)]())_0x1bdc50=_0x2c2f74(0x125);const _0x1fea58=[_0x2c2f74(0x141),_0x2c2f74(0x151)],_0x276c5f=[_0x2c2f74(0xbd),_0x2c2f74(0x78)],_0x2566f8=[_0x2c2f74(0x1e1),_0x2c2f74(0x1b8),'Offset'];for(let _0x1aa946=0x0;_0x1aa946<_0x1fea58[_0x2c2f74(0x270)];_0x1aa946++){let _0x5335fa=_0x1fea58[_0x1aa946];for(let _0x43105a=0x0;_0x43105a<_0x276c5f[_0x2c2f74(0x270)];_0x43105a++){let _0x4e178d=_0x276c5f[_0x43105a];for(let _0x4649e3=0x0;_0x4649e3<_0x2566f8[_0x2c2f74(0x270)];_0x4649e3++){let _0x2c139f=_0x2566f8[_0x4649e3];const _0xd9434a=_0x2c2f74(0x1a7)[_0x2c2f74(0xc4)](_0x1bdc50,_0x5335fa,_0x4e178d,_0x2c139f);_0x32c545[_0xd9434a]&&(_0x479aa1[_0x5335fa][_0x4e178d][_0x2c139f]=JsonEx[_0x2c2f74(0x16d)](_0x32c545[_0xd9434a]));}}}return _0x479aa1;},Game_Vehicle[_0x5935ea(0x9a)]['getVehicleLightingData']=function(_0xa0ad2f,_0x337751,_0x243ed3){const _0x377e85=_0x5935ea;this[_0x377e85(0x2af)]===undefined&&this[_0x377e85(0x18a)]();const _0x3beb31=_0xa0ad2f?_0x377e85(0x141):_0x377e85(0x151),_0x462bfc=_0x337751?_0x377e85(0xbd):_0x377e85(0x78),_0x4b1cea=_0x243ed3?_0x377e85(0x1b8):_0x377e85(0x1e1);return this[_0x377e85(0x2af)][_0x3beb31][_0x462bfc][_0x4b1cea];},Game_Vehicle[_0x5935ea(0x9a)][_0x5935ea(0xe2)]=function(_0x3710ba,_0x3ae99d,_0xbc22e8,_0x1d3136){const _0x3f98e8=_0x5935ea;this[_0x3f98e8(0x2af)]===undefined&&this['initVehicleLightingEffectsSettings']();const _0x47fd33=_0x3ae99d?'Boarded':'Unboarded',_0x40157a=_0xbc22e8?'Radial':_0x3f98e8(0x78),_0x416c46=_0x1d3136?_0x3f98e8(0x1b8):_0x3f98e8(0x1e1);this['_vehicleLightingSettings'][_0x47fd33][_0x40157a][_0x416c46]=JsonEx[_0x3f98e8(0x16d)](_0x3710ba);},Game_Vehicle[_0x5935ea(0x9a)][_0x5935ea(0x244)]=function(_0x3d1cc4,_0x34500c){const _0x48eaaa=_0x5935ea;this[_0x48eaaa(0x2af)]===undefined&&this[_0x48eaaa(0x18a)]();const _0xa67728=_0x34500c?_0x48eaaa(0x141):_0x48eaaa(0x151),_0x234c98=_0x48eaaa(0x78),_0x5324c1=_0x48eaaa(0x100);this[_0x48eaaa(0x2af)][_0xa67728][_0x234c98][_0x5324c1]=JsonEx[_0x48eaaa(0x16d)](_0x3d1cc4);},Game_Vehicle[_0x5935ea(0x9a)][_0x5935ea(0x186)]=function(){const _0xfd1a24=_0x5935ea;return this['getVehicleLightingData'](this[_0xfd1a24(0x223)],!![],![]);},Game_Vehicle[_0x5935ea(0x9a)][_0x5935ea(0xab)]=function(){const _0x413e2e=_0x5935ea;return this[_0x413e2e(0x75)](this['_driving'],!![],!![]);},Game_Vehicle[_0x5935ea(0x9a)][_0x5935ea(0x1c5)]=function(){const _0x65091c=_0x5935ea,_0xc9d913=this[_0x65091c(0x223)]?_0x65091c(0x141):_0x65091c(0x151),_0x5ba7d1=![]?'Radial':_0x65091c(0x78),_0x39be30=![]?_0x65091c(0x1b8):_0x65091c(0x1e1);return this['getVehicleLightingData'](this['_driving'],![],![]);},Game_Vehicle['prototype']['conicalLightBehavior']=function(){const _0x21385d=_0x5935ea;return this[_0x21385d(0x75)](this['_driving'],![],!![]);},Game_Vehicle[_0x5935ea(0x9a)][_0x5935ea(0x22f)]=function(){const _0x17917c=_0x5935ea;return this['_vehicleLightingSettings']===undefined&&this['initVehicleLightingEffectsSettings'](),this[_0x17917c(0x223)]?this[_0x17917c(0x2af)][_0x17917c(0x141)][_0x17917c(0x78)][_0x17917c(0x100)]:this[_0x17917c(0x2af)][_0x17917c(0x151)]['Conical'][_0x17917c(0x100)];},VisuMZ['LightingEffects'][_0x5935ea(0x1cd)]=Game_Event[_0x5935ea(0x9a)][_0x5935ea(0xc1)],Game_Event[_0x5935ea(0x9a)][_0x5935ea(0xc1)]=function(){const _0x368ce9=_0x5935ea;VisuMZ[_0x368ce9(0x2e3)][_0x368ce9(0x1cd)][_0x368ce9(0x2cb)](this),this[_0x368ce9(0x14e)]();},VisuMZ[_0x5935ea(0x2e3)]['Game_Event_setupPageSettings']=Game_Event[_0x5935ea(0x9a)][_0x5935ea(0x228)],Game_Event[_0x5935ea(0x9a)]['setupPageSettings']=function(){const _0x455207=_0x5935ea;VisuMZ[_0x455207(0x2e3)][_0x455207(0x19a)][_0x455207(0x2cb)](this),this[_0x455207(0x248)]();},Game_Event['prototype'][_0x5935ea(0x248)]=function(){const _0x3d6d80=_0x5935ea;if(!this[_0x3d6d80(0x148)]())return;this[_0x3d6d80(0x14e)](),this[_0x3d6d80(0x30f)](),this[_0x3d6d80(0x2ea)]();},Game_Event[_0x5935ea(0x9a)]['setupLightingEffectsNotetags']=function(){const _0x5ab2f2=_0x5935ea,_0x19d8a2=this[_0x5ab2f2(0x148)]()[_0x5ab2f2(0x257)];if(_0x19d8a2==='')return;this[_0x5ab2f2(0x251)](_0x19d8a2);},Game_Event[_0x5935ea(0x9a)][_0x5935ea(0x2ea)]=function(){const _0x5304b5=_0x5935ea;if(!this[_0x5304b5(0x162)]())return;const _0x445c09=this[_0x5304b5(0x2f2)]();let _0x47526a='';for(const _0x10d1da of _0x445c09){if([0x6c,0x198][_0x5304b5(0x156)](_0x10d1da[_0x5304b5(0xf3)])){if(_0x47526a!=='')_0x47526a+='\x0a';_0x47526a+=_0x10d1da[_0x5304b5(0x29a)][0x0];}}this['checkLightingEffectsStringTags'](_0x47526a);},Game_Event['prototype']['initLightingEffectsSettings']=function(){const _0x3f10ef=_0x5935ea;Game_Character[_0x3f10ef(0x9a)][_0x3f10ef(0x14e)][_0x3f10ef(0x2cb)](this);const _0x522344=VisuMZ['LightingEffects'][_0x3f10ef(0x1e1)][_0x3f10ef(0x21a)];this['setRadialLightSettings'](_0x522344['EventRadial']),this[_0x3f10ef(0x143)](_0x522344[_0x3f10ef(0x24a)]),this['setConicalLightSettings'](_0x522344[_0x3f10ef(0x1fd)]),this[_0x3f10ef(0x2e9)](_0x522344[_0x3f10ef(0x1b4)]);},Game_Event['prototype'][_0x5935ea(0x251)]=function(_0xbde7d){const _0xfe826d=_0x5935ea;this[_0xfe826d(0x1d4)](_0xbde7d),this[_0xfe826d(0x250)](_0xbde7d),this[_0xfe826d(0x28a)](_0xbde7d),this[_0xfe826d(0x140)](_0xbde7d),this[_0xfe826d(0x118)](_0xbde7d);},Game_Event['prototype'][_0x5935ea(0x1d4)]=function(_0x44145c){const _0x32b053=_0x5935ea,_0x161ca6=VisuMZ[_0x32b053(0x2e3)][_0x32b053(0x1c0)];if(_0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x22c)]))this['radialLight']()['enabled']=!![];else{if(_0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x12c)]))this['radialLight']()[_0x32b053(0x16a)]=!![];else _0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x224)])&&(this[_0x32b053(0x186)]()[_0x32b053(0x16a)]=![]);}_0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x1fc)])&&(this['radialLight']()['filename']=String(RegExp['$1'])[_0x32b053(0x133)]());_0x44145c['match'](_0x161ca6[_0x32b053(0xbe)])&&(this[_0x32b053(0x186)]()[_0x32b053(0x1df)]=ColorManager['presetColorParser'](RegExp['$1']));if(_0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x2ce)]))this[_0x32b053(0x186)]()[_0x32b053(0x328)]=Number(RegExp['$1']),this[_0x32b053(0x186)]()[_0x32b053(0x20b)]=![];else _0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x216)])&&(this[_0x32b053(0x186)]()[_0x32b053(0x328)]=Math[_0x32b053(0x294)](Number(RegExp['$1'])/0x2),this['radialLight']()[_0x32b053(0x20b)]=![]);_0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x2a0)])&&(this[_0x32b053(0x186)]()[_0x32b053(0x128)]=(Number(RegExp['$1'])*0.01)[_0x32b053(0x2d9)](0x0,0x1));_0x44145c['match'](_0x161ca6['RadialLightBlendMode'])&&(this['radialLight']()[_0x32b053(0x19c)]=ColorManager[_0x32b053(0x2a5)](RegExp['$1']));if(_0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x2dd)]))this[_0x32b053(0x186)]()[_0x32b053(0x276)]=Number(RegExp['$1'])['clamp'](0x0,0xff);else{if(_0x44145c[_0x32b053(0x325)](_0x161ca6['RadialLightOpacityRate'])){const _0xb0f4fc=Number(RegExp['$1'])*0.01;this[_0x32b053(0x186)]()[_0x32b053(0x276)]=Math[_0x32b053(0x294)](_0xb0f4fc*0xff)[_0x32b053(0x2d9)](0x0,0xff);}}_0x44145c[_0x32b053(0x325)](_0x161ca6['RadialLightAngle'])&&(this[_0x32b053(0x186)]()[_0x32b053(0xf2)]=Number(RegExp['$1'])['clamp'](0x0,0x168));_0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0xa5)])&&(this[_0x32b053(0x186)]()[_0x32b053(0x144)]=Number(RegExp['$1']));if(_0x44145c[_0x32b053(0x325)](_0x161ca6[_0x32b053(0x10b)])){const _0x209095=String(RegExp['$1'])['split'](',')[_0x32b053(0x2a3)](_0x21d432=>Number(_0x21d432)||0x0);this[_0x32b053(0x186)]()[_0x32b053(0xfc)]=_0x209095[0x0]||0x0,this[_0x32b053(0x186)]()[_0x32b053(0x1bf)]=_0x209095[0x1]||0x0;}},Game_Event[_0x5935ea(0x9a)][_0x5935ea(0x250)]=function(_0x3e0955){const _0x516809=_0x5935ea,_0x291cf1=VisuMZ[_0x516809(0x2e3)][_0x516809(0x1c0)];_0x3e0955['match'](_0x291cf1[_0x516809(0x258)])&&(this[_0x516809(0xab)]()[_0x516809(0x7a)]=Number(RegExp['$1'])*0.01);_0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0x185)])&&(this[_0x516809(0xab)]()['blinkModifier']=Number(RegExp['$1'])*0.01);_0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0x18b)])&&(this[_0x516809(0xab)]()['flickerRate']=Number(RegExp['$1'])*0.01);_0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0x2cf)])&&(this[_0x516809(0xab)]()['flickerModifier']=Number(RegExp['$1'])*0.01);if(_0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0x110)])){this[_0x516809(0xab)]()[_0x516809(0x8d)]=Number(RegExp['$1'])*0.01;if(this[_0x516809(0x186)]()[_0x516809(0x276)]>=0xff)this['radialLight']()[_0x516809(0x276)]=0x80;}_0x3e0955['match'](_0x291cf1[_0x516809(0x149)])&&(this[_0x516809(0xab)]()[_0x516809(0x16b)]=Number(RegExp['$1'])*0.01);if(_0x3e0955['match'](_0x291cf1['RadialBehaviorFlareRate'])){this[_0x516809(0xab)]()[_0x516809(0x177)]=Number(RegExp['$1'])*0.01;if(this[_0x516809(0x186)]()['opacity']>=0xff)this['radialLight']()['opacity']=0x80;}_0x3e0955[_0x516809(0x325)](_0x291cf1['RadialBehaviorFlareMod'])&&(this[_0x516809(0xab)]()['flareModifier']=Number(RegExp['$1'])*0.01);_0x3e0955[_0x516809(0x325)](_0x291cf1['RadialBehaviorGlowRate'])&&(this[_0x516809(0xab)]()[_0x516809(0x316)]=Number(RegExp['$1'])*0.01);_0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0x29c)])&&(this[_0x516809(0xab)]()[_0x516809(0x295)]=Number(RegExp['$1'])*0.01);if(_0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0xe0)]))this[_0x516809(0xab)]()['glowRng']=!![];else _0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0x2b5)])&&(this[_0x516809(0xab)]()[_0x516809(0x138)]=![]);_0x3e0955['match'](_0x291cf1[_0x516809(0x22b)])&&(this['radialLightBehavior']()[_0x516809(0x1e4)]=Number(RegExp['$1'])*0.01);_0x3e0955[_0x516809(0x325)](_0x291cf1['RadialBehaviorPulseSpeed'])&&(this['radialLightBehavior']()[_0x516809(0x205)]=Number(RegExp['$1'])*0.01);if(_0x3e0955['match'](_0x291cf1[_0x516809(0x147)]))this[_0x516809(0xab)]()['pulseRng']=!![];else _0x3e0955['match'](_0x291cf1[_0x516809(0x240)])&&(this[_0x516809(0xab)]()[_0x516809(0xe1)]=![]);if(_0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0xff)]))this[_0x516809(0xab)]()['pattern']=ColorManager[_0x516809(0x1d0)](RegExp['$1']);else _0x3e0955[_0x516809(0x325)](_0x291cf1['RadialBehaviorPatternSequence'])&&(this[_0x516809(0xab)]()['pattern']=String(RegExp['$1'])['toLowerCase']()[_0x516809(0x133)]());_0x3e0955[_0x516809(0x325)](_0x291cf1[_0x516809(0x26a)])&&(this[_0x516809(0xab)]()[_0x516809(0x20f)]=Number(RegExp['$1'])||0x1);},Game_Event['prototype']['checkConicalLightBasicStringTags']=function(_0x8c1f4d){const _0x40597d=_0x5935ea,_0x5345d7=VisuMZ[_0x40597d(0x2e3)][_0x40597d(0x1c0)];if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x142)]))this[_0x40597d(0x1c5)]()['enabled']=!![];else{if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7['ConicalLightCatchAll']))this['conicalLight']()[_0x40597d(0x16a)]=!![];else _0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x129)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0x16a)]=![]);}_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x105)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0x1b7)]=String(RegExp['$1'])[_0x40597d(0x133)]());_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x126)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0x181)]=Number(RegExp['$1'])['clamp'](0x0,0x168));if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x1e7)])){const _0x4e8203=String(RegExp['$1'])[_0x40597d(0x2c2)](',')[_0x40597d(0x2a3)](_0x4493c6=>Number(_0x4493c6)||0x0);this[_0x40597d(0x1c5)]()[_0x40597d(0x81)]=_0x4e8203[0x0],this[_0x40597d(0x1c5)]()[_0x40597d(0x245)]=_0x4e8203[0x1];}_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x2cc)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0x1df)]=ColorManager[_0x40597d(0x2f3)](RegExp['$1']));if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x2b1)]))this[_0x40597d(0x1c5)]()[_0x40597d(0x328)]=Number(RegExp['$1']);else _0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x306)])&&(this[_0x40597d(0x1c5)]()['radius']=Math['round'](Number(RegExp['$1'])/0x2));if(_0x8c1f4d['match'](_0x5345d7[_0x40597d(0x2eb)]))this[_0x40597d(0x1c5)]()['miniRadius']=Number(RegExp['$1']);else _0x8c1f4d['match'](_0x5345d7['ConicalLightSrcDiameter'])&&(this['conicalLight']()[_0x40597d(0x292)]=Math[_0x40597d(0x294)](Number(RegExp['$1'])/0x2));_0x8c1f4d[_0x40597d(0x325)](_0x5345d7['ConicalLightIntensity'])&&(this['conicalLight']()[_0x40597d(0x128)]=(Number(RegExp['$1'])*0.01)[_0x40597d(0x2d9)](0x0,0x1));_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x1e0)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0x19c)]=ColorManager[_0x40597d(0x2a5)](RegExp['$1']));if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x174)]))this[_0x40597d(0x1c5)]()[_0x40597d(0x276)]=Number(RegExp['$1'])[_0x40597d(0x2d9)](0x0,0xff);else{if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x1aa)])){const _0x5e3202=Number(RegExp['$1'])*0.01;this[_0x40597d(0x1c5)]()[_0x40597d(0x276)]=Math['round'](_0x5e3202*0xff)[_0x40597d(0x2d9)](0x0,0xff);}}_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x30d)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0xf2)]=Number(RegExp['$1'])[_0x40597d(0x2d9)](0x0,0x168));_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x2bf)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0x318)]=Number(RegExp['$1'])['clamp'](0x0,0x168));_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x131)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0xb3)]=Number(RegExp['$1'])*0.01);if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x233)]))this[_0x40597d(0x1c5)]()[_0x40597d(0x25d)]=!![];else _0x8c1f4d[_0x40597d(0x325)](_0x5345d7['ConicalLightSwayNoRng'])&&(this['conicalLight']()[_0x40597d(0x25d)]=![]);_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x1ac)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0x18d)]=TextManager[_0x40597d(0x1fa)](RegExp['$1']));if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x29f)]))this[_0x40597d(0x1c5)]()[_0x40597d(0x27e)]=!![];else _0x8c1f4d['match'](_0x5345d7[_0x40597d(0x209)])&&(this[_0x40597d(0x1c5)]()['followMouse']=![]);if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7['ConicalLightUseHandOffset']))this[_0x40597d(0x1c5)]()[_0x40597d(0x287)]=!![];else _0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x1d3)])&&(this[_0x40597d(0x1c5)]()[_0x40597d(0x287)]=![]);if(_0x8c1f4d[_0x40597d(0x325)](_0x5345d7[_0x40597d(0x15b)])){const _0x1fe69c=String(RegExp['$1'])['split'](',')[_0x40597d(0x2a3)](_0x2d2c6f=>Number(_0x2d2c6f)||0x0);this[_0x40597d(0x1c5)]()[_0x40597d(0xfc)]=_0x1fe69c[0x0]||0x0,this[_0x40597d(0x1c5)]()['offsetY']=_0x1fe69c[0x1]||0x0,this[_0x40597d(0x1c5)]()[_0x40597d(0x287)]=![];}},Game_Event[_0x5935ea(0x9a)][_0x5935ea(0x140)]=function(_0x3d319f){const _0x514aed=_0x5935ea,_0x62dc0d=VisuMZ[_0x514aed(0x2e3)][_0x514aed(0x1c0)];_0x3d319f['match'](_0x62dc0d['ConicalBehaviorBlinkRate'])&&(this[_0x514aed(0x109)]()[_0x514aed(0x7a)]=Number(RegExp['$1'])*0.01);_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x20c)])&&(this[_0x514aed(0x109)]()[_0x514aed(0x19f)]=Number(RegExp['$1'])*0.01);_0x3d319f[_0x514aed(0x325)](_0x62dc0d['ConicalBehaviorFlickerRate'])&&(this[_0x514aed(0x109)]()[_0x514aed(0x1c2)]=Number(RegExp['$1'])*0.01);_0x3d319f[_0x514aed(0x325)](_0x62dc0d['ConicalBehaviorFlickerMod'])&&(this[_0x514aed(0x109)]()[_0x514aed(0x18e)]=Number(RegExp['$1'])*0.01);if(_0x3d319f['match'](_0x62dc0d['ConicalBehaviorFlashRate'])){this[_0x514aed(0x109)]()[_0x514aed(0x8d)]=Number(RegExp['$1'])*0.01;if(this[_0x514aed(0x1c5)]()['opacity']>=0xff)this['conicalLight']()[_0x514aed(0x276)]=0x80;}_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x1bc)])&&(this[_0x514aed(0x109)]()['flashModifier']=Number(RegExp['$1'])*0.01);if(_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x2b2)])){this['conicalLightBehavior']()[_0x514aed(0x177)]=Number(RegExp['$1'])*0.01;if(this[_0x514aed(0x1c5)]()[_0x514aed(0x276)]>=0xff)this[_0x514aed(0x1c5)]()[_0x514aed(0x276)]=0x80;}_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x2ef)])&&(this['conicalLightBehavior']()[_0x514aed(0x1b9)]=Number(RegExp['$1'])*0.01);_0x3d319f[_0x514aed(0x325)](_0x62dc0d['ConicalBehaviorGlowRate'])&&(this[_0x514aed(0x109)]()[_0x514aed(0x316)]=Number(RegExp['$1'])*0.01);_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x1a5)])&&(this[_0x514aed(0x109)]()[_0x514aed(0x295)]=Number(RegExp['$1'])*0.01);if(_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x18c)]))this[_0x514aed(0x109)]()[_0x514aed(0x138)]=!![];else _0x3d319f[_0x514aed(0x325)](_0x62dc0d['ConicalBehaviorGlowNoRng'])&&(this['conicalLightBehavior']()[_0x514aed(0x138)]=![]);_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x1c9)])&&(this[_0x514aed(0x109)]()[_0x514aed(0x1e4)]=Number(RegExp['$1'])*0.01);_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x2c9)])&&(this[_0x514aed(0x109)]()[_0x514aed(0x205)]=Number(RegExp['$1'])*0.01);if(_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x84)]))this[_0x514aed(0x109)]()['pulseRng']=!![];else _0x3d319f[_0x514aed(0x325)](_0x62dc0d['ConicalBehaviorPulseNoRng'])&&(this['conicalLightBehavior']()[_0x514aed(0xe1)]=![]);if(_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x268)]))this[_0x514aed(0x109)]()[_0x514aed(0x2ed)]=ColorManager[_0x514aed(0x1d0)](RegExp['$1']);else _0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x31d)])&&(this['conicalLightBehavior']()['pattern']=String(RegExp['$1'])[_0x514aed(0x1c3)]()[_0x514aed(0x133)]());_0x3d319f[_0x514aed(0x325)](_0x62dc0d[_0x514aed(0x2bc)])&&(this[_0x514aed(0x109)]()[_0x514aed(0x20f)]=Number(RegExp['$1'])||0x1);},Game_Event[_0x5935ea(0x9a)][_0x5935ea(0x118)]=function(_0x22f5a4){const _0x29718a=_0x5935ea,_0x66d2b6=VisuMZ[_0x29718a(0x2e3)]['RegExp'],_0x232bad=_0x22f5a4['match'](_0x66d2b6[_0x29718a(0x303)]);if(_0x232bad){this[_0x29718a(0x1c5)]()['useHandOffset']=!![];for(const _0x278bc3 of _0x232bad){_0x278bc3[_0x29718a(0x325)](_0x66d2b6[_0x29718a(0x303)]);const _0x551943=TextManager[_0x29718a(0x1fa)](RegExp['$1']);if([0x0,0x5][_0x29718a(0x156)](_0x551943))continue;const _0x10c7a0=Number(RegExp['$2'])||0x0,_0x535313=String(RegExp['$3'])[_0x29718a(0x2c2)](',')[_0x29718a(0x2a3)](_0xb745d6=>Number(_0xb745d6)||0x0),_0x41391b=Number(_0x535313[0x0])||0x0,_0x5af593=Number(_0x535313[0x1])||0x0,_0x213832='dir%1'[_0x29718a(0xc4)](_0x551943),_0x32892d=_0x29718a(0x9f)[_0x29718a(0xc4)](_0x10c7a0),_0x39cd39=_0x29718a(0xf1)[_0x29718a(0xc4)](_0x10c7a0);this[_0x29718a(0x22f)]()[_0x213832][_0x32892d]=_0x41391b,this[_0x29718a(0x22f)]()[_0x213832][_0x39cd39]=_0x5af593;}}},VisuMZ[_0x5935ea(0x2e3)]['Scene_Options_maxCommands']=Scene_Options[_0x5935ea(0x9a)][_0x5935ea(0x2e5)],Scene_Options[_0x5935ea(0x9a)]['maxCommands']=function(){const _0x4fa979=_0x5935ea;let _0x45bd89=VisuMZ[_0x4fa979(0x2e3)][_0x4fa979(0x1dd)][_0x4fa979(0x2cb)](this);const _0x490af4=VisuMZ[_0x4fa979(0x2e3)][_0x4fa979(0x1e1)][_0x4fa979(0x1d9)];if(_0x490af4[_0x4fa979(0x191)]&&_0x490af4[_0x4fa979(0x96)])_0x45bd89++;if(_0x490af4[_0x4fa979(0x191)]&&_0x490af4[_0x4fa979(0x7e)])_0x45bd89++;return _0x45bd89;},VisuMZ['LightingEffects']['Sprite_Character_initialize']=Sprite_Character['prototype']['initialize'],Sprite_Character[_0x5935ea(0x9a)]['initialize']=function(_0x3a77d9){const _0x5922f0=_0x5935ea;VisuMZ['LightingEffects'][_0x5922f0(0x1a2)]['call'](this,_0x3a77d9),this['setupRadialLight'](_0x3a77d9),this[_0x5922f0(0xa2)](_0x3a77d9);},Sprite_Character[_0x5935ea(0x9a)][_0x5935ea(0x159)]=function(_0x5e1115){const _0x590ddd=_0x5935ea;if(this[_0x590ddd(0x315)]!==Sprite_Character)return;this[_0x590ddd(0x11a)]=new Sprite_RadialLight(_0x5e1115,this),SceneManager['addChildToLightContainer'](this['_radialLight']);},Sprite_Character[_0x5935ea(0x9a)][_0x5935ea(0xa2)]=function(_0x3fed29){const _0x2a8592=_0x5935ea;if(this[_0x2a8592(0x315)]!==Sprite_Character)return;this[_0x2a8592(0x121)]=new Sprite_ConicalLight(_0x3fed29,this),SceneManager[_0x2a8592(0xac)](this['_conicalLight']);},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x199)]=Sprite_Battler[_0x5935ea(0x9a)][_0x5935ea(0x106)],Sprite_Battler[_0x5935ea(0x9a)]['setBattler']=function(_0xcaa061){const _0x4a2c91=_0x5935ea;VisuMZ['LightingEffects'][_0x4a2c91(0x199)][_0x4a2c91(0x2cb)](this,_0xcaa061),this[_0x4a2c91(0x159)](_0xcaa061);},Sprite_Battler['prototype'][_0x5935ea(0x159)]=function(_0x50b596){const _0x306d35=_0x5935ea;if(this[_0x306d35(0x11a)]){this['_radialLight'][_0x306d35(0x214)](_0x50b596);return;}if(this[_0x306d35(0x315)][_0x306d35(0x2e8)]==='Sprite_SvEnemy')return;this[_0x306d35(0x11a)]=new Sprite_RadialLight(_0x50b596,this),SceneManager[_0x306d35(0xac)](this[_0x306d35(0x11a)]);};function Sprite_LightingEffects(){const _0x843ee3=_0x5935ea;this[_0x843ee3(0xb8)](...arguments);}Sprite_LightingEffects[_0x5935ea(0x9a)]=Object[_0x5935ea(0x231)](Sprite[_0x5935ea(0x9a)]),Sprite_LightingEffects['prototype']['constructor']=Sprite_LightingEffects,Sprite_LightingEffects[_0x5935ea(0x30e)]=VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x1e1)][_0x5935ea(0x21a)][_0x5935ea(0x2fd)],Sprite_LightingEffects[_0x5935ea(0x9a)]['initialize']=function(_0x18e4ea){const _0x2b31c7=_0x5935ea;this[_0x2b31c7(0x31e)]=_0x18e4ea,Sprite[_0x2b31c7(0x9a)]['initialize'][_0x2b31c7(0x2cb)](this),this[_0x2b31c7(0x19c)]=PIXI[_0x2b31c7(0x22e)]['MULTIPLY'],this['x']=Math['round'](Graphics['width']/0x2),this['y']=Math[_0x2b31c7(0x294)](Graphics['height']/0x2),this[_0x2b31c7(0xef)]['x']=this[_0x2b31c7(0xef)]['y']=0.5,this[_0x2b31c7(0xed)](),this[_0x2b31c7(0x296)](),this[_0x2b31c7(0x2b3)](),this['createLightContainer'](),this['createAntiLightMask'](),this[_0x2b31c7(0x2c0)](),![]&&this[_0x2b31c7(0xfe)]();},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x1d7)]=function(){const _0x5d3b33=_0x5935ea;Sprite[_0x5d3b33(0x9a)][_0x5d3b33(0x1d7)][_0x5d3b33(0x2cb)](this),this[_0x5d3b33(0x204)]();},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x204)]=function(){const _0x567b1c=_0x5935ea;this['_hardAntiLightMask']&&this[_0x567b1c(0x2dc)][_0x567b1c(0x1d7)](),this[_0x567b1c(0xd5)]&&this[_0x567b1c(0xd5)][_0x567b1c(0x1d7)](),this[_0x567b1c(0x8f)]&&this[_0x567b1c(0x8f)][_0x567b1c(0x1d7)]();},Sprite_LightingEffects[_0x5935ea(0x9a)]['createOverlayTexture']=function(){const _0x10e8c3=_0x5935ea,_0x519356=Sprite_LightingEffects[_0x10e8c3(0x30e)]*0x2,_0x68800a=Graphics[_0x10e8c3(0x132)]+_0x519356,_0x5f5cf4=Graphics[_0x10e8c3(0x2db)]+_0x519356;this['texture']=PIXI[_0x10e8c3(0x137)][_0x10e8c3(0x231)](_0x68800a,_0x5f5cf4);},Sprite_LightingEffects[_0x5935ea(0x9a)]['createProxySprite']=function(){const _0x12a7a0=_0x5935ea;this[_0x12a7a0(0x31f)]=new Sprite();},Sprite_LightingEffects[_0x5935ea(0x9a)]['createColorSprite']=function(){const _0x580bf9=_0x5935ea;this[_0x580bf9(0xcf)]=new Sprite(),this[_0x580bf9(0xcf)][_0x580bf9(0x29d)]=new Bitmap(0x1,0x1),this['_proxySprite'][_0x580bf9(0x2f4)](this['_colorSprite']);const _0x289074=Sprite_LightingEffects['SHAKE_BUFFER']*0x2;this[_0x580bf9(0xcf)]['scale']['x']=Graphics[_0x580bf9(0x132)]+_0x289074,this[_0x580bf9(0xcf)][_0x580bf9(0x26b)]['y']=Graphics[_0x580bf9(0x2db)]+_0x289074,this['updateOverlayColor']();},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x31b)]=function(){const _0x420d9d=_0x5935ea;this['_lightContainer']=new Sprite(),this[_0x420d9d(0x31f)][_0x420d9d(0x2f4)](this['_lightContainer']);const _0x442642=Sprite_LightingEffects[_0x420d9d(0x30e)];this[_0x420d9d(0x8f)]['x']=_0x442642,this[_0x420d9d(0x8f)]['y']=_0x442642;},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x17f)]=function(){const _0x11b727=_0x5935ea;if(this[_0x11b727(0x8f)]===undefined)this[_0x11b727(0x31b)]();return this['_lightContainer'];},Sprite_LightingEffects[_0x5935ea(0x21e)]=!![],Sprite_LightingEffects['SMOOTH_MASKING']=![],Sprite_LightingEffects[_0x5935ea(0x9a)]['createAntiLightMask']=function(){const _0x4adfe6=_0x5935ea;if(!Sprite_LightingEffects['ALLOW_ANTI_LIGHT_MASK'])return;if(SceneManager['isSceneBattle']())return;if($gameMap['isLoopHorizontal']()||$gameMap[_0x4adfe6(0x158)]())return;if(!$gameMap[_0x4adfe6(0x1b1)]())return;{const _0x118d91=new Sprite();_0x118d91['bitmap']=this[_0x4adfe6(0x1f4)](![],$gameMap['hardAntiLightRegionIDs'](),$gameMap[_0x4adfe6(0x23d)]()),_0x118d91[_0x4adfe6(0x26b)]['x']=$gameMap[_0x4adfe6(0x152)](),_0x118d91[_0x4adfe6(0x26b)]['y']=$gameMap['tileHeight'](),this[_0x4adfe6(0x2dc)]=_0x118d91,this[_0x4adfe6(0x8f)][_0x4adfe6(0x2f4)](this[_0x4adfe6(0x2dc)]),this['_hardAlphaMask']=new PIXI[(_0x4adfe6(0x29b))](this['_hardAntiLightMask']),this[_0x4adfe6(0x111)]['blendMode']=PIXI[_0x4adfe6(0x22e)][_0x4adfe6(0x76)];}{const _0x502754=new Sprite();_0x502754[_0x4adfe6(0x29d)]=this[_0x4adfe6(0x1f4)](!![],$gameMap[_0x4adfe6(0x2fc)](),$gameMap[_0x4adfe6(0xb2)]()),_0x502754[_0x4adfe6(0x26b)]['x']=$gameMap[_0x4adfe6(0x152)](),_0x502754[_0x4adfe6(0x26b)]['y']=$gameMap[_0x4adfe6(0x197)](),this[_0x4adfe6(0xd5)]=_0x502754,this[_0x4adfe6(0x8f)][_0x4adfe6(0x2f4)](this[_0x4adfe6(0xd5)]),this[_0x4adfe6(0x164)]=new PIXI['SpriteMaskFilter'](this[_0x4adfe6(0xd5)]),this['_softAlphaMask'][_0x4adfe6(0x19c)]=PIXI[_0x4adfe6(0x22e)][_0x4adfe6(0x76)];}this['_lightContainer']['filters']=this[_0x4adfe6(0x8f)]['filters']||[],this[_0x4adfe6(0x8f)][_0x4adfe6(0xfd)][_0x4adfe6(0x19d)](this[_0x4adfe6(0x111)]),this['_lightContainer']['filters'][_0x4adfe6(0x19d)](this[_0x4adfe6(0x164)]);},Sprite_LightingEffects[_0x5935ea(0x9a)]['createAntiLightMaskBitmap']=function(_0x4e1b49,_0x325001,_0x19a537){const _0x5aa9b5=_0x5935ea,_0x1ccb22=$gameMap[_0x5aa9b5(0x132)](),_0x1c0f66=$gameMap[_0x5aa9b5(0x2db)](),_0x8fa055=new Bitmap(_0x1ccb22,_0x1c0f66);_0x8fa055[_0x5aa9b5(0x301)]=_0x4e1b49;for(let _0x4d6178=0x0;_0x4d6178<_0x1ccb22;_0x4d6178++){for(let _0x2460be=0x0;_0x2460be<_0x1c0f66;_0x2460be++){const _0x3635a0=$gameMap[_0x5aa9b5(0x1e3)](_0x4d6178,_0x2460be);if(_0x325001[_0x5aa9b5(0x156)](_0x3635a0)){Imported[_0x5aa9b5(0x1ba)]&&SceneManager[_0x5aa9b5(0x1a3)][_0x5aa9b5(0x2a2)][_0x5aa9b5(0x19d)](_0x3635a0);continue;}const _0x3afd29=$gameMap[_0x5aa9b5(0x17b)](_0x4d6178,_0x2460be);if(_0x19a537['includes'](_0x3afd29))continue;_0x8fa055[_0x5aa9b5(0x284)](_0x4d6178,_0x2460be,0x1,0x1,_0x5aa9b5(0x168));}}return _0x8fa055;},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x2c0)]=function(){const _0x3cecd7=_0x5935ea;if(!$gameMap)return;if(!$dataMap)return;if($gameMap[_0x3cecd7(0x226)]()||$gameMap[_0x3cecd7(0x158)]())return;if(!this[_0x3cecd7(0x8f)])return;if(SceneManager['isSceneBattle']())return;const _0x110edb=new Sprite();_0x110edb[_0x3cecd7(0x29d)]=this[_0x3cecd7(0x1b3)](),_0x110edb['scale']['x']=$gameMap['tileWidth'](),_0x110edb['scale']['y']=$gameMap['tileHeight'](),this[_0x3cecd7(0x213)]=_0x110edb,this[_0x3cecd7(0x213)][_0x3cecd7(0x19c)]=PIXI[_0x3cecd7(0x22e)][_0x3cecd7(0x207)],this['lightContainer']()['addChild'](_0x110edb);},Sprite_LightingEffects[_0x5935ea(0x9a)]['createAutoLightBitmap']=function(){const _0x4ce296=_0x5935ea,_0x45f450=$gameMap[_0x4ce296(0x132)](),_0x3982c8=$gameMap[_0x4ce296(0x2db)](),_0xd53010=new Bitmap(_0x45f450,_0x3982c8);_0xd53010[_0x4ce296(0x301)]=!![];for(let _0x30b86f=0x0;_0x30b86f<_0x45f450;_0x30b86f++){for(let _0x7e3b88=0x0;_0x7e3b88<_0x3982c8;_0x7e3b88++){const _0x2988e5=$gameMap[_0x4ce296(0x1e3)](_0x30b86f,_0x7e3b88),_0x56838d=this[_0x4ce296(0xf4)](_0x2988e5);if(_0x56838d>0x0){const _0x42c091=Math[_0x4ce296(0x1e2)](0xff*_0x56838d/0x64);let _0x4ae991=ColorManager[_0x4ce296(0x222)]([_0x42c091,_0x42c091,_0x42c091]);_0xd53010[_0x4ce296(0x284)](_0x30b86f,_0x7e3b88,0x1,0x1,_0x4ae991),Imported[_0x4ce296(0x1ba)]&&SceneManager['_scene'][_0x4ce296(0x2a2)][_0x4ce296(0x19d)](_0x2988e5);}}}return _0xd53010;},Sprite_LightingEffects[_0x5935ea(0x9a)]['regionAutoLightOpacity']=function(_0x275039){const _0xd32f6d=_0x5935ea,_0x227c7d=VisuMZ['LightingEffects'][_0xd32f6d(0x1e1)]['AutoLight'];let _0x50253b=0x64;while(_0x50253b>0x0){const _0x1b1895=_0x227c7d[_0xd32f6d(0x278)['format'](_0x50253b)]||[];if(_0x1b1895['includes'](_0x275039))return _0x50253b;_0x50253b-=0x5;}return 0x0;},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0xfe)]=function(){const _0x45eec2=_0x5935ea;{const _0x4dc4a4=new Sprite();_0x4dc4a4[_0x45eec2(0x29d)]=new Bitmap(0x1f4,0x1f4),_0x4dc4a4[_0x45eec2(0x29d)][_0x45eec2(0x87)](0xfa,_0x45eec2(0x169)),this[_0x45eec2(0x17f)]()['addChild'](_0x4dc4a4),_0x4dc4a4[_0x45eec2(0xef)]['x']=_0x4dc4a4['anchor']['y']=0.5,_0x4dc4a4['x']=Graphics[_0x45eec2(0x132)]*0x1/0x2,_0x4dc4a4['y']=Graphics[_0x45eec2(0x2db)]*0x1/0x3,_0x4dc4a4[_0x45eec2(0x19c)]=PIXI[_0x45eec2(0x22e)][_0x45eec2(0x76)],this[_0x45eec2(0xfa)]=_0x4dc4a4;}{const _0x1c1ba3=new Sprite();_0x1c1ba3['bitmap']=new Bitmap(0x1f4,0x1f4),_0x1c1ba3[_0x45eec2(0x29d)][_0x45eec2(0x87)](0xfa,_0x45eec2(0x13b)),this['lightContainer']()[_0x45eec2(0x2f4)](_0x1c1ba3),_0x1c1ba3['anchor']['x']=_0x1c1ba3[_0x45eec2(0xef)]['y']=0.5,_0x1c1ba3['x']=Graphics[_0x45eec2(0x132)]*0x2/0x5,_0x1c1ba3['y']=Graphics[_0x45eec2(0x2db)]*0x2/0x3,_0x1c1ba3[_0x45eec2(0x19c)]=PIXI[_0x45eec2(0x22e)][_0x45eec2(0x76)],this[_0x45eec2(0x1bd)]=_0x1c1ba3;}{const _0x3d38e1=new Sprite();_0x3d38e1[_0x45eec2(0x29d)]=new Bitmap(0x1f4,0x1f4),_0x3d38e1[_0x45eec2(0x29d)]['drawTestDummy'](0xfa,_0x45eec2(0x10e)),this['lightContainer']()[_0x45eec2(0x2f4)](_0x3d38e1),_0x3d38e1[_0x45eec2(0xef)]['x']=_0x3d38e1[_0x45eec2(0xef)]['y']=0.5,_0x3d38e1['x']=Graphics[_0x45eec2(0x132)]*0x3/0x5,_0x3d38e1['y']=Graphics[_0x45eec2(0x2db)]*0x2/0x3,_0x3d38e1[_0x45eec2(0x19c)]=PIXI[_0x45eec2(0x22e)][_0x45eec2(0x76)],this[_0x45eec2(0x308)]=_0x3d38e1;}this[_0x45eec2(0x24d)]=!![];},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x13e)]=function(){const _0x49c8e1=_0x5935ea;Sprite['prototype']['update'][_0x49c8e1(0x2cb)](this),this[_0x49c8e1(0x167)](),this[_0x49c8e1(0x8f)]&&this[_0x49c8e1(0x8f)]['update'](),this[_0x49c8e1(0x74)](),this['_autoLightSprite']&&this['updateAutoLightAreas'](),this[_0x49c8e1(0x24d)]&&this['updateTestDummies'](),this['_proxySprite']&&(this['updateOverlayColor'](),this[_0x49c8e1(0x130)]());},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x167)]=function(){const _0x2a2a4c=_0x5935ea;this['opacity']=$gameScreen[_0x2a2a4c(0xb4)]();},Sprite_LightingEffects['prototype'][_0x5935ea(0x74)]=function(){const _0x3cfd79=_0x5935ea;if(this[_0x3cfd79(0x2dc)]){const _0x380fa1=this[_0x3cfd79(0x2dc)];_0x380fa1['x']=Math[_0x3cfd79(0x1b6)](-$gameMap[_0x3cfd79(0xe7)]()*$gameMap[_0x3cfd79(0x152)]()),_0x380fa1['y']=Math[_0x3cfd79(0x1b6)](-$gameMap['displayY']()*$gameMap[_0x3cfd79(0x197)]());}if(this[_0x3cfd79(0xd5)]){const _0x5e9061=this['_softAntiLightMask'];_0x5e9061['x']=Math['floor'](-$gameMap[_0x3cfd79(0xe7)]()*$gameMap['tileWidth']()),_0x5e9061['y']=Math['floor'](-$gameMap['displayY']()*$gameMap['tileHeight']());}},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x2e1)]=function(){const _0xbb198d=_0x5935ea;this[_0xbb198d(0x213)]['x']=Math[_0xbb198d(0x1b6)](-$gameMap[_0xbb198d(0xe7)]()*$gameMap[_0xbb198d(0x152)]()),this[_0xbb198d(0x213)]['y']=Math[_0xbb198d(0x1b6)](-$gameMap['displayY']()*$gameMap[_0xbb198d(0x197)]());},Sprite_LightingEffects['prototype']['updateTestDummies']=function(){const _0xbf2423=_0x5935ea;this[_0xbf2423(0xfa)][_0xbf2423(0x26b)]['x']=this[_0xbf2423(0xfa)][_0xbf2423(0x26b)]['y']=0.9+Math[_0xbf2423(0x243)](Graphics[_0xbf2423(0x139)]*0.11)*0.1,this[_0xbf2423(0x1bd)][_0xbf2423(0x26b)]['x']=this[_0xbf2423(0x1bd)][_0xbf2423(0x26b)]['y']=0.9+Math[_0xbf2423(0x243)](Graphics[_0xbf2423(0x139)]*0.12)*0.1,this[_0xbf2423(0x308)][_0xbf2423(0x26b)]['x']=this[_0xbf2423(0x308)][_0xbf2423(0x26b)]['y']=0.9+Math[_0xbf2423(0x243)](Graphics[_0xbf2423(0x139)]*0.13)*0.1;},Sprite_LightingEffects['prototype'][_0x5935ea(0x274)]=function(){const _0x35bdc6=_0x5935ea;if(this[_0x35bdc6(0x28d)]===$gameScreen[_0x35bdc6(0xf6)]())return;this['_overlayColor']=$gameScreen[_0x35bdc6(0xf6)]();const _0x2439d2=this[_0x35bdc6(0xcf)][_0x35bdc6(0x29d)];_0x2439d2[_0x35bdc6(0x284)](0x0,0x0,0x1,0x1,this[_0x35bdc6(0x28d)]);},Sprite_LightingEffects[_0x5935ea(0x9a)][_0x5935ea(0x130)]=function(){const _0x15eb10=_0x5935ea,_0x38295a=Graphics[_0x15eb10(0x14a)][_0x15eb10(0x107)];_0x38295a&&_0x38295a['render'](this[_0x15eb10(0x31f)],this[_0x15eb10(0x1ae)],![]);};function Sprite_LightBase(){const _0xa328c=_0x5935ea;this[_0xa328c(0xb8)](...arguments);}Sprite_LightBase[_0x5935ea(0x9a)]=Object['create'](Sprite[_0x5935ea(0x9a)]),Sprite_LightBase[_0x5935ea(0x9a)]['constructor']=Sprite_LightBase,Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0xb8)]=function(_0x5bf2ec,_0x5ca85b){const _0x394d4d=_0x5935ea;this[_0x394d4d(0x1a9)]=_0x5bf2ec,this[_0x394d4d(0x1cc)]=_0x5ca85b,Sprite[_0x394d4d(0x9a)][_0x394d4d(0xb8)]['call'](this),this['initMembers']();},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x1c1)]=function(){const _0x179061=_0x5935ea;this['anchor']['x']=0.5,this[_0x179061(0xef)]['y']=0.5,this[_0x179061(0x26b)]['x']=0x1,this[_0x179061(0x26b)]['y']=0x1,this[_0x179061(0xa8)]=Math['randomInt'](0xf4240),this[_0x179061(0x16e)]=Math[_0x179061(0x2a1)](0xf4240),this[_0x179061(0x22d)]=0x0;},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x214)]=function(_0x37987c){const _0x45d756=_0x5935ea;if(this[_0x45d756(0x1a9)]===_0x37987c)return;this['_source']=_0x37987c,this[_0x45d756(0x13e)]();},Sprite_LightBase[_0x5935ea(0x9a)]['lightData']=function(){const _0x60cb9c=_0x5935ea;return this[_0x60cb9c(0x1a9)]?this[_0x60cb9c(0x1a9)][_0x60cb9c(0x186)]():{};},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x271)]=function(){const _0x253670=_0x5935ea;return this[_0x253670(0x1a9)]?this[_0x253670(0x1a9)]['radialLightBehavior']():{};},Sprite_LightBase[_0x5935ea(0x9a)]['isEnabled']=function(){const _0x414451=_0x5935ea;if(this[_0x414451(0x1a9)]&&this[_0x414451(0x1a9)][_0x414451(0x315)]===Game_Vehicle){if(this[_0x414451(0x1a9)][_0x414451(0x120)]()==='')return![];}return this['lightData']()['enabled'];},Sprite_LightBase['prototype'][_0x5935ea(0x13e)]=function(){const _0x55a335=_0x5935ea;Sprite[_0x55a335(0x9a)][_0x55a335(0x13e)][_0x55a335(0x2cb)](this),this[_0x55a335(0x12a)](),this[_0x55a335(0x218)]()&&this[_0x55a335(0x1a9)]&&(this[_0x55a335(0x1da)](),this[_0x55a335(0x1f3)]()),this['updateVisibility']();},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x1da)]=function(){const _0x47de74=_0x5935ea;this[_0x47de74(0x90)](),this[_0x47de74(0x102)](),this[_0x47de74(0x167)](),this[_0x47de74(0xde)]();},Sprite_LightBase['prototype'][_0x5935ea(0x12a)]=function(){const _0x1b268a=_0x5935ea;if(!this[_0x1b268a(0x22a)]())return;this['cacheNewData'](),this[_0x1b268a(0x2e0)]();},Sprite_LightBase[_0x5935ea(0x9a)]['needsRecreation']=function(){return![];},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x160)]=function(){},Sprite_LightBase['prototype'][_0x5935ea(0x2e0)]=function(){const _0x449398=_0x5935ea,_0x24231a=this[_0x449398(0xea)]();this['scale']['x']=0x1,this[_0x449398(0x26b)]['y']=0x1,this['_glowRng']=Math[_0x449398(0x2a1)](0xf4240),this['_pulseRng']=Math[_0x449398(0x2a1)](0xf4240),this[_0x449398(0x22d)]=0x0;if(_0x24231a[_0x449398(0x1b7)]!=='')this[_0x449398(0x29d)]=ImageManager['loadPicture'](_0x24231a['filename']);else this[_0x449398(0x218)]()?this[_0x449398(0x29d)]=this[_0x449398(0x319)](_0x24231a):this[_0x449398(0x29d)]=new Bitmap(0x1,0x1);},Sprite_LightBase[_0x5935ea(0x9a)]['generateLight']=function(_0x5d5d3c){return new Bitmap(0x1,0x1);},Sprite_LightBase['prototype'][_0x5935ea(0x90)]=function(){this['angle']=0x0;},Sprite_LightBase[_0x5935ea(0x9a)]['updateBlendMode']=function(){const _0x432c94=_0x5935ea;this[_0x432c94(0x19c)]=this[_0x432c94(0xea)]()[_0x432c94(0x19c)]||0x0;},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x167)]=function(){const _0x598955=_0x5935ea;this['opacity']=this[_0x598955(0xea)]()['opacity']||0x0;},Sprite_LightBase[_0x5935ea(0x9a)]['updatePosition']=function(){const _0x42a143=_0x5935ea,_0x96837c=this[_0x42a143(0x1cc)],_0xaf04c6=this[_0x42a143(0xea)]();this['x']=_0x96837c['x'],this['x']+=_0xaf04c6['offsetX'],this['y']=_0x96837c['y']-Math[_0x42a143(0x294)](_0x96837c[_0x42a143(0x2db)]/0x2),this['y']+=_0xaf04c6[_0x42a143(0x1bf)],SceneManager[_0x42a143(0x2d5)]()&&(this['x']+=(Graphics[_0x42a143(0x132)]-Graphics[_0x42a143(0x1f7)])/0x2,this['y']+=(Graphics[_0x42a143(0x2db)]-Graphics['boxHeight'])/0x2);},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x1f3)]=function(){const _0x72d0ac=_0x5935ea;this[_0x72d0ac(0x219)](),this[_0x72d0ac(0x2e6)](),this[_0x72d0ac(0x2ab)](),this[_0x72d0ac(0x13f)](),this['updateGlow'](),this[_0x72d0ac(0x8a)](),this[_0x72d0ac(0x299)]();},Sprite_LightBase[_0x5935ea(0x9a)]['updateBlink']=function(){const _0x4b577c=_0x5935ea;if(!ConfigManager['blinkingLights'])return;const _0x550c85=this[_0x4b577c(0x271)]();if(Math[_0x4b577c(0x25e)]()<(_0x550c85['blinkRate']||0x0)){const _0x545414=this[_0x4b577c(0x276)]*(_0x550c85[_0x4b577c(0x19f)]||0x0);this[_0x4b577c(0x276)]=Math[_0x4b577c(0x294)](this['opacity']+_0x545414)[_0x4b577c(0x2d9)](0x0,0xff);}},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x2e6)]=function(){const _0x3e1836=_0x5935ea;if(!ConfigManager[_0x3e1836(0x2e4)])return;const _0x578b90=this[_0x3e1836(0x271)]();if(Math[_0x3e1836(0x25e)]()<(_0x578b90[_0x3e1836(0x1c2)]||0x0)){const _0x3f4d7b=this[_0x3e1836(0x276)]*(Math[_0x3e1836(0x25e)]()*(_0x578b90['flickerModifier']||0x0));this[_0x3e1836(0x276)]=Math['round'](this['opacity']+_0x3f4d7b)[_0x3e1836(0x2d9)](0x0,0xff);}},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x2ab)]=function(){const _0x40e2f0=_0x5935ea;if(!ConfigManager[_0x40e2f0(0x2e4)])return;const _0x42cb21=this[_0x40e2f0(0x271)]();if(Math[_0x40e2f0(0x25e)]()<(_0x42cb21[_0x40e2f0(0x8d)]||0x0)){const _0x2c2c3c=0xff*(_0x42cb21[_0x40e2f0(0x16b)]||0x0);this[_0x40e2f0(0x276)]=Math[_0x40e2f0(0x294)](this[_0x40e2f0(0x276)]+_0x2c2c3c)['clamp'](0x0,0xff);}},Sprite_LightBase[_0x5935ea(0x9a)]['updateFlare']=function(){const _0x54cc21=_0x5935ea;if(!ConfigManager[_0x54cc21(0x2e4)])return;const _0x582a0e=this[_0x54cc21(0x271)]();if(Math['random']()<(_0x582a0e[_0x54cc21(0x177)]||0x0)){const _0x2cb0d6=0xff*(Math['random']()*(_0x582a0e[_0x54cc21(0x1b9)]||0x0));this[_0x54cc21(0x276)]=Math['round'](this['opacity']+_0x2cb0d6)[_0x54cc21(0x2d9)](0x0,0xff);}},Sprite_LightBase[_0x5935ea(0x9a)]['updateGlow']=function(){const _0x54bde0=_0x5935ea;if(!ConfigManager[_0x54bde0(0x30a)])return;const _0x2bc856=this[_0x54bde0(0x271)]();if(_0x2bc856[_0x54bde0(0x316)]>0x0){const _0x3d2226=_0x2bc856['glowRate']/0x2,_0x2eef33=0x1-_0x3d2226,_0x488588=_0x2bc856[_0x54bde0(0x295)],_0x31ad6e=_0x2bc856[_0x54bde0(0x138)]?this['_glowRng']:0x0,_0x38ae31=Graphics['frameCount']+_0x31ad6e;this[_0x54bde0(0x276)]*=_0x2eef33+Math[_0x54bde0(0x243)](_0x38ae31*_0x488588)*_0x3d2226;}},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x8a)]=function(){const _0xbbbf70=_0x5935ea;if(!ConfigManager[_0xbbbf70(0x2e4)])return;const _0x53cca3=this[_0xbbbf70(0x271)]();if(_0x53cca3[_0xbbbf70(0x2ed)]==='')return;if(_0x53cca3[_0xbbbf70(0x2ed)]===undefined)return;const _0x4487f9=(_0x53cca3['pattern'][_0xbbbf70(0x73)](this[_0xbbbf70(0x22d)])-0x61)[_0xbbbf70(0x2d9)](0x0,0x19),_0x4576c9=_0x4487f9/0x19;this[_0xbbbf70(0x276)]=Math[_0xbbbf70(0x294)](0xff*_0x4576c9)[_0xbbbf70(0x2d9)](0x0,0xff);if(Graphics[_0xbbbf70(0x139)]%(_0x53cca3[_0xbbbf70(0x20f)]||0x1)===0x0){this['_patternIndex']++;if(this[_0xbbbf70(0x22d)]>=_0x53cca3[_0xbbbf70(0x2ed)][_0xbbbf70(0x270)])this[_0xbbbf70(0x22d)]=0x0;}},Sprite_LightBase[_0x5935ea(0x9a)][_0x5935ea(0x299)]=function(){const _0x1c6101=_0x5935ea;if(!ConfigManager[_0x1c6101(0x30a)])return;const _0xdf0fca=this[_0x1c6101(0x271)]();if(_0xdf0fca['pulseRate']>0x0){const _0x2cf6b0=_0xdf0fca[_0x1c6101(0x1e4)]/0x2,_0x201a3c=0x1-_0x2cf6b0,_0x595898=_0xdf0fca[_0x1c6101(0x205)],_0x149e47=_0xdf0fca[_0x1c6101(0xe1)]?this[_0x1c6101(0x16e)]:0x0,_0x1f15f3=Graphics[_0x1c6101(0x139)]+_0x149e47,_0x26d415=_0x201a3c+Math[_0x1c6101(0x243)](_0x1f15f3*_0x595898)*_0x2cf6b0;this['scale']['x']=this[_0x1c6101(0x26b)]['y']=_0x26d415;}else this[_0x1c6101(0x26b)]['x']=this[_0x1c6101(0x26b)]['y']=0x1;},Sprite_LightBase['prototype']['updateVisibility']=function(){const _0x13c1cf=_0x5935ea;this[_0x13c1cf(0x220)]=this[_0x13c1cf(0x103)]();},Sprite_LightBase[_0x5935ea(0x9a)]['isLightVisible']=function(){const _0x5ecf97=_0x5935ea;if(!this[_0x5ecf97(0x1a9)])return![];if(this[_0x5ecf97(0x1a9)][_0x5ecf97(0x120)]&&this[_0x5ecf97(0x1a9)][_0x5ecf97(0x120)]()!==''){if(this[_0x5ecf97(0x1cc)]&&!this[_0x5ecf97(0x1cc)][_0x5ecf97(0x220)])return![];}if(this[_0x5ecf97(0x1a9)]['constructor']===Game_Follower){if(!this[_0x5ecf97(0x1a9)][_0x5ecf97(0x1ff)]())return![];if(!this[_0x5ecf97(0x1a9)]['isVisible']())return![];}if(this['_source']['_erased'])return![];if(this[_0x5ecf97(0x1a9)]===$gamePlayer){if($gamePlayer[_0x5ecf97(0x2e2)]())return![];}if(this[_0x5ecf97(0x1a9)][_0x5ecf97(0x281)]){if(this[_0x5ecf97(0x1a9)]['isHidden']())return![];if(this[_0x5ecf97(0x1a9)][_0x5ecf97(0x1e9)]())return![];}if(!this['lightData']())return![];return this[_0x5ecf97(0x218)]();};function Sprite_RadialLight(){this['initialize'](...arguments);}Sprite_RadialLight['prototype']=Object[_0x5935ea(0x231)](Sprite_LightBase[_0x5935ea(0x9a)]),Sprite_RadialLight[_0x5935ea(0x9a)][_0x5935ea(0x315)]=Sprite_RadialLight,Sprite_RadialLight[_0x5935ea(0x9a)][_0x5935ea(0xb8)]=function(_0x579190,_0x501427){const _0x1b4ade=_0x5935ea;Sprite_LightBase[_0x1b4ade(0x9a)][_0x1b4ade(0xb8)][_0x1b4ade(0x2cb)](this,_0x579190,_0x501427);},Sprite_RadialLight[_0x5935ea(0x9a)]['lightData']=function(){const _0x23aabd=_0x5935ea;return this[_0x23aabd(0x1a9)]?this[_0x23aabd(0x1a9)][_0x23aabd(0x186)]():{};},Sprite_RadialLight[_0x5935ea(0x9a)][_0x5935ea(0x271)]=function(){const _0x11a7b7=_0x5935ea;return this[_0x11a7b7(0x1a9)]?this[_0x11a7b7(0x1a9)][_0x11a7b7(0xab)]():{};},Sprite_RadialLight[_0x5935ea(0x9a)][_0x5935ea(0x321)]=function(_0x20a4d6){const _0x34a27c=_0x5935ea;let _0x16f6cd=_0x20a4d6[_0x34a27c(0x328)];if(_0x20a4d6[_0x34a27c(0x20b)]){let _0x428f4b=this[_0x34a27c(0x1cc)];if(this[_0x34a27c(0x1cc)][_0x34a27c(0x28b)])_0x428f4b=_0x428f4b;let _0xd741e5=Math[_0x34a27c(0x7b)](_0x428f4b[_0x34a27c(0x132)],0x2)+Math[_0x34a27c(0x7b)](_0x428f4b[_0x34a27c(0x2db)],0x2);_0xd741e5=Math[_0x34a27c(0x7b)](_0xd741e5,0.5),_0xd741e5/=0x2,_0x16f6cd=Math[_0x34a27c(0x108)](_0xd741e5,_0x16f6cd);}return _0x16f6cd;},Sprite_RadialLight[_0x5935ea(0x9a)]['needsRecreation']=function(){const _0x440b61=_0x5935ea,_0x588181=this[_0x440b61(0xea)]();if(this[_0x440b61(0x202)]!==_0x588181[_0x440b61(0x16a)])return!![];if(this[_0x440b61(0x203)]!==_0x588181[_0x440b61(0x1b7)])return!![];if(this[_0x440b61(0x124)]!==this[_0x440b61(0x321)](_0x588181))return!![];if(this['_lastColor']!==_0x588181[_0x440b61(0x1df)])return!![];if(this[_0x440b61(0x31c)]!==_0x588181[_0x440b61(0x128)])return!![];return Sprite_LightBase[_0x440b61(0x9a)]['needsRecreation']['call'](this);},Sprite_RadialLight[_0x5935ea(0x9a)][_0x5935ea(0x160)]=function(){const _0x1f8166=_0x5935ea,_0x239a67=this[_0x1f8166(0xea)]();this[_0x1f8166(0x202)]=_0x239a67[_0x1f8166(0x16a)],this[_0x1f8166(0x203)]=_0x239a67['filename'],this[_0x1f8166(0x124)]=this['getRadius'](_0x239a67),this[_0x1f8166(0x217)]=_0x239a67['color'],this[_0x1f8166(0x31c)]=_0x239a67[_0x1f8166(0x128)];},Sprite_RadialLight[_0x5935ea(0x9a)][_0x5935ea(0x319)]=function(_0x531705){const _0x1d16e2=_0x5935ea,_0x20e7cc=this[_0x1d16e2(0x321)](_0x531705),_0xa3e317=ColorManager['presetColorParser'](_0x531705[_0x1d16e2(0x1df)]),_0x1a8c6=_0x531705[_0x1d16e2(0x128)],_0x19ce4a=Math['ceil'](_0x20e7cc)*0x2,_0x4f6478=new Bitmap(_0x19ce4a,_0x19ce4a);return _0x4f6478[_0x1d16e2(0xa0)](_0x20e7cc,_0xa3e317,_0x1a8c6),_0x4f6478;},Sprite_RadialLight[_0x5935ea(0x9a)][_0x5935ea(0x90)]=function(){const _0x178f84=_0x5935ea;this[_0x178f84(0xf2)]=-this[_0x178f84(0xea)]()[_0x178f84(0xf2)]||0x0,this[_0x178f84(0xea)]()[_0x178f84(0xf2)]-=this[_0x178f84(0xea)]()[_0x178f84(0x144)]||0x0;};function Sprite_ConicalLight(){const _0x119bee=_0x5935ea;this[_0x119bee(0xb8)](...arguments);}Sprite_ConicalLight[_0x5935ea(0x9a)]=Object[_0x5935ea(0x231)](Sprite_LightBase['prototype']),Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x315)]=Sprite_ConicalLight,Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0xb8)]=function(_0x17511a,_0x2b0c91){const _0x53d92e=_0x5935ea;Sprite_LightBase[_0x53d92e(0x9a)]['initialize'][_0x53d92e(0x2cb)](this,_0x17511a,_0x2b0c91),this[_0x53d92e(0x1e5)](),this[_0x53d92e(0x194)]=0x4;},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x1e5)]=function(){const _0xb2f8de=_0x5935ea;if(!Imported[_0xb2f8de(0x10a)])return;return;this[_0xb2f8de(0x2fa)]=new Sprite(),this[_0xb2f8de(0x2fa)][_0xb2f8de(0x29d)]=ImageManager['weatherEffectsLensFlare'](),this[_0xb2f8de(0x2fa)]['blendMode']=0x1,this[_0xb2f8de(0x2fa)][_0xb2f8de(0x26b)]['x']=0.6,this[_0xb2f8de(0x2fa)]['scale']['y']=0.6,this[_0xb2f8de(0x2fa)]['anchor']['x']=0.5,this[_0xb2f8de(0x2fa)][_0xb2f8de(0xef)]['y']=0.5,this['_lensFlareSprite']['visible']=![],this[_0xb2f8de(0x2f4)](this['_lensFlareSprite']);},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0xea)]=function(){const _0x359b24=_0x5935ea;return this['_source']?this[_0x359b24(0x1a9)]['conicalLight']():{};},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x271)]=function(){const _0x5ed719=_0x5935ea;return this[_0x5ed719(0x1a9)]?this['_source'][_0x5ed719(0x109)]():{};},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x2d2)]=function(){const _0x33268c=_0x5935ea;return this[_0x33268c(0x1a9)]?this[_0x33268c(0x1a9)][_0x33268c(0x22f)]():{};},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x22a)]=function(){const _0x18b415=_0x5935ea,_0xd5d0bf=this['lightData']();if(this['_lastEnabled']!==_0xd5d0bf[_0x18b415(0x16a)])return!![];if(this[_0x18b415(0x203)]!==_0xd5d0bf['filename'])return!![];if(this[_0x18b415(0x124)]!==_0xd5d0bf[_0x18b415(0x328)])return!![];if(this['_lastColor']!==_0xd5d0bf[_0x18b415(0x1df)])return!![];if(this['_lastIntensity']!==_0xd5d0bf['intensity'])return!![];if(this[_0x18b415(0x264)]!==_0xd5d0bf[_0x18b415(0xf2)])return!![];if(this[_0x18b415(0x2f7)]!==_0xd5d0bf['miniRadius'])return!![];return Sprite_LightBase[_0x18b415(0x9a)][_0x18b415(0x22a)][_0x18b415(0x2cb)](this);},Sprite_ConicalLight[_0x5935ea(0x9a)]['cacheNewData']=function(){const _0x1aa473=_0x5935ea,_0x24d547=this[_0x1aa473(0xea)]();this[_0x1aa473(0x202)]=_0x24d547[_0x1aa473(0x16a)],this[_0x1aa473(0x203)]=_0x24d547[_0x1aa473(0x1b7)],this[_0x1aa473(0x124)]=_0x24d547['radius'],this[_0x1aa473(0x217)]=_0x24d547[_0x1aa473(0x1df)],this[_0x1aa473(0x31c)]=_0x24d547[_0x1aa473(0x128)],this[_0x1aa473(0x264)]=_0x24d547[_0x1aa473(0xf2)],this[_0x1aa473(0x2f7)]=_0x24d547[_0x1aa473(0x292)];},Sprite_ConicalLight['prototype'][_0x5935ea(0x2e0)]=function(){const _0x6a3f27=_0x5935ea;Sprite_LightBase['prototype']['createBitmap'][_0x6a3f27(0x2cb)](this),this[_0x6a3f27(0x178)]=TouchInput['x'],this['_lastTouchInputY']=TouchInput['y'],this[_0x6a3f27(0x127)]=![],this[_0x6a3f27(0x25f)]=!![],this[_0x6a3f27(0x194)]=0x4,this[_0x6a3f27(0x172)]=Math[_0x6a3f27(0x2a1)](0xf4240);const _0x389c06=this[_0x6a3f27(0xea)]();_0x389c06[_0x6a3f27(0x1b7)]!==''?(this[_0x6a3f27(0xef)]['x']=_0x389c06[_0x6a3f27(0x81)],this[_0x6a3f27(0xef)]['y']=_0x389c06[_0x6a3f27(0x245)]):(this[_0x6a3f27(0xef)]['x']=0.5,this['anchor']['y']=0.5);},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x319)]=function(_0x36583e){const _0x3ada8d=_0x5935ea,_0x44b12a=_0x36583e[_0x3ada8d(0x328)],_0x322b3e=ColorManager[_0x3ada8d(0x2f3)](_0x36583e[_0x3ada8d(0x1df)]),_0x10ced9=_0x36583e['intensity'],_0x56c2e5=_0x36583e['angle'],_0x3fca93=_0x44b12a*0x2,_0x5dd1ef=0x1,_0x1cd890=0x0,_0x556b33=new Bitmap(_0x3fca93,_0x3fca93);_0x556b33['drawConicalLight'](_0x44b12a,_0x56c2e5,_0x322b3e,_0x10ced9,_0x5dd1ef,_0x1cd890);const _0xa323bf=_0x36583e[_0x3ada8d(0x292)],_0x53e93f=_0xa323bf*0x2,_0x270897=new Bitmap(_0x53e93f,_0x53e93f);_0x270897[_0x3ada8d(0xa0)](_0xa323bf,_0x322b3e,_0x10ced9);const _0x2fc8a9=Math[_0x3ada8d(0x1b6)](_0x3fca93/0x2)-_0xa323bf;return _0x556b33[_0x3ada8d(0x12d)](_0x270897,0x0,0x0,_0x53e93f,_0x53e93f,_0x2fc8a9,_0x2fc8a9,_0x53e93f,_0x53e93f),_0x556b33;},Sprite_ConicalLight['prototype'][_0x5935ea(0x2aa)]=function(){const _0x31d5d5=_0x5935ea;if(this[_0x31d5d5(0x1a9)][_0x31d5d5(0x15f)]&&this[_0x31d5d5(0x1a9)][_0x31d5d5(0x15f)]())return 0x2;const _0x28e052=this['lightData']();return _0x28e052['forceDirection']?_0x28e052['forceDirection']:this['_source']['_direction'];},Sprite_ConicalLight['prototype'][_0x5935ea(0x90)]=function(){const _0x171dce=_0x5935ea;this['updateLastInputType']();if(this[_0x171dce(0x25f)])this[_0x171dce(0x27c)]();else this[_0x171dce(0x127)]?this[_0x171dce(0x190)]():this[_0x171dce(0xf2)]=0x0;this[_0x171dce(0x99)]();},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x1de)]=function(){const _0x1c8218=_0x5935ea;if(this[_0x1c8218(0x25a)]()){if($gameTemp[_0x1c8218(0x23c)]()||['up',_0x1c8218(0x27a),_0x1c8218(0xd1),_0x1c8218(0x1f1)]['some'](_0x1f13eb=>Input[_0x1c8218(0xf5)](_0x1f13eb)))this[_0x1c8218(0x127)]=![],this[_0x1c8218(0x25f)]=!![],this[_0x1c8218(0x194)]=0x4;else{if(this[_0x1c8218(0xea)]()[_0x1c8218(0x27e)]&&(this['_lastTouchInputX']!==TouchInput['x']||this['_lastTouchInputY']!==TouchInput['y'])){if(this['_lastInputTimer']--)return;this[_0x1c8218(0x127)]=!![],this[_0x1c8218(0x25f)]=![];}}}else this[_0x1c8218(0x1a9)]!==$gamePlayer&&this['_source']!==$gamePlayer['vehicle']()&&(this['_lastInputTouch']=this[_0x1c8218(0xea)]()['followMouse'],this[_0x1c8218(0x25f)]=!this[_0x1c8218(0xea)]()[_0x1c8218(0x27e)]);},Sprite_ConicalLight[_0x5935ea(0x9a)]['allowCharacterAngleUpdate']=function(){const _0x43f3b0=_0x5935ea;if($gameScreen[_0x43f3b0(0xf6)]()===_0x43f3b0(0x168))return![];if($gameScreen[_0x43f3b0(0xb4)]()<=0x0)return![];return this[_0x43f3b0(0x1a9)]===$gamePlayer||this['_source']===$gamePlayer['vehicle']();},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x190)]=function(){const _0x1105c1=_0x5935ea;if(this[_0x1105c1(0x1a9)]===$gamePlayer||this['_source']===$gamePlayer['vehicle']()){if($gameMap[_0x1105c1(0x221)]()||$gameMessage['isBusy']())return;}this[_0x1105c1(0x178)]=TouchInput['x'],this[_0x1105c1(0x19b)]=TouchInput['y'];const _0x4cc711=new Point(TouchInput['x'],TouchInput['y']),_0x4a95ac=this['_originSprite'][_0x1105c1(0xd4)][_0x1105c1(0xa1)](_0x4cc711),_0x589069=this['lightData']();let _0x4498c9=Math[_0x1105c1(0x2c6)](_0x4a95ac['y'],_0x4a95ac['x'])*0xb4/Math['PI'];_0x589069['filename']===''?_0x4498c9-=_0x589069[_0x1105c1(0xf2)]/0x2:_0x4498c9-=_0x589069[_0x1105c1(0x181)];this['angle']=_0x4498c9;if(!this['_source']['isDirectionFixed']()){if(this[_0x1105c1(0x1a9)]===$gamePlayer&&$gamePlayer[_0x1105c1(0x2e2)]())return;if($gameScreen[_0x1105c1(0xf6)]()===_0x1105c1(0x168))return;if($gameScreen[_0x1105c1(0xb4)]()<=0x0)return;let _0x2d0397=this[_0x1105c1(0x1a9)];if(this['_source']===$gamePlayer['vehicle']())_0x2d0397=$gamePlayer;const _0x260c89=$gameMap['canvasToMapX'](TouchInput['x']),_0x138bba=$gameMap[_0x1105c1(0xaf)](TouchInput['y']);_0x2d0397[_0x1105c1(0x326)](_0x260c89,_0x138bba);}},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x27c)]=function(){const _0x1d9cd0=_0x5935ea,_0xde2f43=this[_0x1d9cd0(0xea)]();let _0x34ee2a=0x0;_0xde2f43['filename']===''?_0x34ee2a-=_0xde2f43[_0x1d9cd0(0xf2)]/0x2:_0x34ee2a-=_0xde2f43['fileAngleOffset']||0x0;const _0xed65fd=this[_0x1d9cd0(0x2aa)]();_0x34ee2a+=[0x0,0x87,0x5a,0x2d,0xb4,0x0,0x0,0xe1,0x10e,0x13b][_0xed65fd];if(_0xde2f43['angleSway']){const _0x378007=_0xde2f43[_0x1d9cd0(0x25d)]?this['_swayRng']:0x0,_0xc29bc9=Graphics[_0x1d9cd0(0x139)]+_0x378007,_0x452550=_0xde2f43[_0x1d9cd0(0xb3)];_0x34ee2a+=Math[_0x1d9cd0(0x243)](_0xc29bc9*_0x452550)*_0xde2f43[_0x1d9cd0(0x318)];}this['angle']=_0x34ee2a;},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x99)]=function(){const _0x1a173a=_0x5935ea;if(!this[_0x1a173a(0x2fa)])return;const _0x1a71b1=this[_0x1a173a(0x2aa)]();this[_0x1a173a(0x2fa)]['visible']=_0x1a71b1===0x2,this[_0x1a173a(0x2fa)][_0x1a173a(0xf2)]=this[_0x1a173a(0xf2)]/0x2;},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0xde)]=function(){const _0x1c8684=_0x5935ea,_0x3297ee=this['lightData']();_0x3297ee[_0x1c8684(0x287)]?this[_0x1c8684(0x21c)]():Sprite_LightBase['prototype']['updatePosition'][_0x1c8684(0x2cb)](this);},Sprite_ConicalLight[_0x5935ea(0x9a)][_0x5935ea(0x21c)]=function(){const _0x23b713=_0x5935ea,_0x391019=this['handOffsetData'](),_0x1bfa7a=this[_0x23b713(0x1cc)];let _0x43e13e=(Number(this[_0x23b713(0x2aa)]())||0x2)['clamp'](0x0,0x9);if(_0x43e13e===0x0||_0x43e13e===0x5)_0x43e13e=0x2;const _0x4fb153=_0x23b713(0x1db)['format'](_0x43e13e),_0x583cb3='pattern%1X'[_0x23b713(0xc4)](this['_source'][_0x23b713(0x2ed)]()||0x0),_0x593985=_0x23b713(0xf1)[_0x23b713(0xc4)](this['_source'][_0x23b713(0x2ed)]()||0x0),_0x44e66a=(_0x391019[_0x4fb153]||{})[_0x583cb3]||0x0,_0x3b549c=(_0x391019[_0x4fb153]||{})[_0x593985]||0x0;this['x']=_0x1bfa7a['x'],this['x']+=_0x44e66a,this['y']=_0x1bfa7a['y']-Math[_0x23b713(0x294)](_0x1bfa7a['height']/0x2),this['y']+=_0x3b549c;},Sprite_ConicalLight[_0x5935ea(0x9a)]['isLightVisible']=function(){const _0x47eac4=_0x5935ea;if(!Sprite_LightBase[_0x47eac4(0x9a)][_0x47eac4(0x103)]['call'](this))return![];if(!this['lightData']())return![];return this['isEnabled']();};function Sprite_LightSpawn(){const _0x20bfbc=_0x5935ea;this[_0x20bfbc(0xb8)](...arguments);}Sprite_LightSpawn[_0x5935ea(0x9a)]=Object[_0x5935ea(0x231)](Sprite_RadialLight[_0x5935ea(0x9a)]),Sprite_LightSpawn[_0x5935ea(0x9a)][_0x5935ea(0x315)]=Sprite_LightSpawn,Sprite_LightSpawn['prototype'][_0x5935ea(0xb8)]=function(_0x4daabb){const _0x224af3=_0x5935ea;Sprite_RadialLight[_0x224af3(0x9a)]['initialize'][_0x224af3(0x2cb)](this,_0x4daabb,null);},Sprite_LightSpawn['prototype']['lightData']=function(){const _0x18a925=_0x5935ea;return this[_0x18a925(0x1a9)]?this['_source'][_0x18a925(0x1d5)]:{};},Sprite_LightSpawn['prototype'][_0x5935ea(0x271)]=function(){const _0x39951c=_0x5935ea;return this[_0x39951c(0x1a9)]?this[_0x39951c(0x1a9)]['behavior']:{};},Sprite_LightSpawn[_0x5935ea(0x9a)]['isLightVisible']=function(){const _0x193da6=_0x5935ea;if(this[_0x193da6(0x1a9)]&&!this['_source'][_0x193da6(0x2c3)])return![];return Sprite_LightBase[_0x193da6(0x9a)][_0x193da6(0x103)][_0x193da6(0x2cb)](this);},Sprite_LightSpawn[_0x5935ea(0x9a)]['isUsingScreenCoordinates']=function(){const _0x34c194=_0x5935ea;return this[_0x34c194(0x1a9)]?this[_0x34c194(0x1a9)][_0x34c194(0x2f9)]==='screen':![];},Sprite_LightSpawn[_0x5935ea(0x9a)][_0x5935ea(0x1af)]=function(){const _0x3048e0=_0x5935ea;return this[_0x3048e0(0x1a9)]?this['_source'][_0x3048e0(0x2f9)]===_0x3048e0(0x2a3):![];},Sprite_LightSpawn[_0x5935ea(0x9a)]['isFollowingPlayer']=function(){const _0x4c2959=_0x5935ea;return this[_0x4c2959(0x1a9)]?this['_source'][_0x4c2959(0x2f9)]===_0x4c2959(0x2bb):![];},Sprite_LightSpawn[_0x5935ea(0x9a)][_0x5935ea(0x2c4)]=function(){const _0x5329f4=_0x5935ea;return this[_0x5329f4(0x1a9)]?this['_source'][_0x5329f4(0x2f9)]===_0x5329f4(0x1a4):![];},Sprite_LightSpawn[_0x5935ea(0x9a)]['isFollowingEvent']=function(){const _0x46c4ae=_0x5935ea;return this[_0x46c4ae(0x1a9)]?this[_0x46c4ae(0x1a9)][_0x46c4ae(0x2f9)]==='event':![];},Sprite_LightSpawn[_0x5935ea(0x9a)][_0x5935ea(0xde)]=function(){const _0x51b837=_0x5935ea,_0x5d9bd9=this[_0x51b837(0x1a9)],_0x3136e7=this[_0x51b837(0xea)]();this['x']=_0x5d9bd9['x'],this['x']+=_0x3136e7[_0x51b837(0xfc)],this['y']=_0x5d9bd9['y'],this['y']+=_0x3136e7[_0x51b837(0x1bf)],this[_0x51b837(0x15e)](),this['x']=Math[_0x51b837(0x294)](this['x']),this['y']=Math[_0x51b837(0x294)](this['y']);},Sprite_LightSpawn[_0x5935ea(0x9a)][_0x5935ea(0x15e)]=function(){const _0x2b2d81=_0x5935ea,_0x5cd399=this[_0x2b2d81(0x1a9)];if(this[_0x2b2d81(0xc5)]())this['x']+=_0x5cd399[_0x2b2d81(0x290)],this['y']+=_0x5cd399[_0x2b2d81(0x16f)];else{if(this[_0x2b2d81(0x1af)]()){let _0x39f122=_0x5cd399[_0x2b2d81(0x290)]+0.5,_0x27022c=_0x5cd399[_0x2b2d81(0x16f)]+0.5;this[_0x2b2d81(0x11b)](_0x39f122,_0x27022c);}else{if(this[_0x2b2d81(0x176)]()){const _0x4bdb82=$gamePlayer;this[_0x2b2d81(0x273)](_0x4bdb82);}else{if(this['isFollowingFollower']()){const _0x2ecbc7=$gamePlayer['followers']()[_0x2b2d81(0x1a4)](_0x5cd399[_0x2b2d81(0xa6)]||0x0);this[_0x2b2d81(0x273)](_0x2ecbc7);}else{if(this[_0x2b2d81(0x1f0)]()){const _0x38e327=$gameMap['event'](_0x5cd399[_0x2b2d81(0x14b)]);this[_0x2b2d81(0x273)](_0x38e327);}}}}}},Sprite_LightSpawn['prototype']['adjustPositionByMap']=function(_0x6072cf,_0x284adf,_0x1f0662,_0x1fb47b){const _0x4648b1=_0x5935ea;this['x']+=Math[_0x4648b1(0x1b6)](-$gameMap[_0x4648b1(0xe7)]()*$gameMap[_0x4648b1(0x152)]()),this['y']+=Math[_0x4648b1(0x1b6)](-$gameMap['displayY']()*$gameMap[_0x4648b1(0x197)]()),this['x']+=Math[_0x4648b1(0x1b6)](_0x6072cf*$gameMap[_0x4648b1(0x152)]()),this['y']+=Math[_0x4648b1(0x1b6)](_0x284adf*$gameMap[_0x4648b1(0x197)]()),this['x']+=_0x1f0662||0x0,this['y']+=_0x1fb47b||0x0;},Sprite_LightSpawn[_0x5935ea(0x9a)]['adjustPositionByTarget']=function(_0xe77ccf){const _0x2e28e1=_0x5935ea;if(!_0xe77ccf)return;let _0x5bbebd=_0xe77ccf[_0x2e28e1(0x254)]+0.5,_0x11913c=_0xe77ccf[_0x2e28e1(0x2f0)]+0x1,_0x3e5592=0x0,_0x5f17e3=0x0;const _0x567ccc=SceneManager[_0x2e28e1(0x1a3)][_0x2e28e1(0x31e)];if(_0x567ccc){const _0x41382b=_0x567ccc['findTargetSprite'](_0xe77ccf);_0x41382b&&(_0x5f17e3=-(_0x41382b[_0x2e28e1(0x2db)]/0x2));}this[_0x2e28e1(0x11b)](_0x5bbebd,_0x11913c,_0x3e5592,_0x5f17e3);},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x165)]=Spriteset_Base[_0x5935ea(0x9a)][_0x5935ea(0x282)],Spriteset_Base[_0x5935ea(0x9a)]['createLowerLayer']=function(){const _0x1d6d46=_0x5935ea;this[_0x1d6d46(0x320)](),VisuMZ['LightingEffects'][_0x1d6d46(0x165)]['call'](this);},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x161)]=Spriteset_Base[_0x5935ea(0x9a)][_0x5935ea(0x23b)],Spriteset_Base[_0x5935ea(0x9a)][_0x5935ea(0x23b)]=function(){const _0x214121=_0x5935ea;this['lightContainer']()&&this[_0x214121(0x253)](),VisuMZ[_0x214121(0x2e3)][_0x214121(0x161)][_0x214121(0x2cb)](this);},Spriteset_Base['prototype'][_0x5935ea(0xc9)]=function(){const _0x48b4fd=_0x5935ea;if(!this[_0x48b4fd(0xcc)]())return;this['_lightingEffects']&&this[_0x48b4fd(0x14c)][_0x48b4fd(0x2f4)](this['_lightingEffects']);},Spriteset_Base[_0x5935ea(0x9a)][_0x5935ea(0x320)]=function(){const _0x242828=_0x5935ea;if(!this['isLightingEnabled']())return;this[_0x242828(0x238)]=new Sprite_LightingEffects(this),this[_0x242828(0x8f)]=this[_0x242828(0x238)][_0x242828(0x17f)](),SceneManager[_0x242828(0x1a3)][_0x242828(0x8f)]=this[_0x242828(0x238)][_0x242828(0x17f)]();},Spriteset_Base[_0x5935ea(0x9a)][_0x5935ea(0x17f)]=function(){return this['_lightContainer'];},Spriteset_Base[_0x5935ea(0x9a)][_0x5935ea(0xcc)]=function(){return![];},Spriteset_Base[_0x5935ea(0x9a)]['createLightingEffectsLightSpawns']=function(){},Spriteset_Map[_0x5935ea(0x9a)][_0x5935ea(0xcc)]=function(){const _0x203134=_0x5935ea;return VisuMZ['LightingEffects'][_0x203134(0x1e1)][_0x203134(0x21a)][_0x203134(0x25c)];},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x114)]=Spriteset_Map['prototype'][_0x5935ea(0x1b5)],Spriteset_Map[_0x5935ea(0x9a)][_0x5935ea(0x1b5)]=function(){const _0x3a747d=_0x5935ea;VisuMZ['LightingEffects'][_0x3a747d(0x114)][_0x3a747d(0x2cb)](this),this[_0x3a747d(0xc9)]();},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x2ca)]=Spriteset_Map[_0x5935ea(0x9a)][_0x5935ea(0x1dc)],Spriteset_Map[_0x5935ea(0x9a)][_0x5935ea(0x1dc)]=function(){const _0x2dc7e6=_0x5935ea;VisuMZ['LightingEffects'][_0x2dc7e6(0x2ca)]['call'](this),this[_0x2dc7e6(0x238)]&&this[_0x2dc7e6(0x238)]['update']();},Spriteset_Map[_0x5935ea(0x9a)][_0x5935ea(0x253)]=function(){const _0x3c8360=_0x5935ea,_0x46bbe8=$gameMap[_0x3c8360(0x21b)]();for(const _0x1a5e7f of _0x46bbe8){const _0x5697d0=new Sprite_LightSpawn(_0x1a5e7f);SceneManager['addChildToLightContainer'](_0x5697d0);}},Spriteset_Battle[_0x5935ea(0x9a)][_0x5935ea(0xcc)]=function(){const _0x142604=_0x5935ea;if(!Imported[_0x142604(0x212)])return![];return VisuMZ[_0x142604(0x2e3)][_0x142604(0x1e1)][_0x142604(0xe9)][_0x142604(0x25c)];},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x198)]=Spriteset_Battle['prototype'][_0x5935ea(0x98)],Spriteset_Battle[_0x5935ea(0x9a)][_0x5935ea(0x98)]=function(){const _0x39b0f6=_0x5935ea;VisuMZ[_0x39b0f6(0x2e3)][_0x39b0f6(0x198)][_0x39b0f6(0x2cb)](this),this[_0x39b0f6(0xc9)]();},Spriteset_Battle['prototype']['addLightingEffects']=function(){const _0x176951=_0x5935ea;if(!this[_0x176951(0xcc)]())return;this[_0x176951(0x238)]&&(this['_battleField'][_0x176951(0x2f4)](this[_0x176951(0x238)]),this['_lightingEffects']['x']=this[_0x176951(0x255)][_0x176951(0x132)]/0x2,this['_lightingEffects']['y']=this[_0x176951(0x255)]['height']/0x2);},VisuMZ[_0x5935ea(0x2e3)][_0x5935ea(0x17c)]=Window_Options[_0x5935ea(0x9a)][_0x5935ea(0x25b)],Window_Options[_0x5935ea(0x9a)][_0x5935ea(0x25b)]=function(){const _0x49fce9=_0x5935ea;VisuMZ[_0x49fce9(0x2e3)][_0x49fce9(0x17c)][_0x49fce9(0x2cb)](this),this['addLightingEffectsOptionCommands']();},Window_Options['prototype'][_0x5935ea(0x234)]=function(){const _0x551686=_0x5935ea;VisuMZ[_0x551686(0x2e3)][_0x551686(0x1e1)]['Options']['AddBlinkingLights']&&this['addLightingEffectsBlinkingLightsCommand'](),VisuMZ[_0x551686(0x2e3)][_0x551686(0x1e1)][_0x551686(0x1d9)][_0x551686(0x7e)]&&this[_0x551686(0x153)]();},Window_Options[_0x5935ea(0x9a)]['addLightingEffectsBlinkingLightsCommand']=function(){const _0x5b76aa=_0x5935ea,_0x82c8b4=TextManager[_0x5b76aa(0x2d1)][_0x5b76aa(0xa9)],_0x34e08d=_0x5b76aa(0x2e4);this[_0x5b76aa(0x1d8)](_0x82c8b4,_0x34e08d);},Window_Options[_0x5935ea(0x9a)][_0x5935ea(0x153)]=function(){const _0x1dbf6f=_0x5935ea,_0x2e170d=TextManager['LightingEffectsOptions'][_0x1dbf6f(0x1bb)],_0x4fcb7d=_0x1dbf6f(0x30a);this[_0x1dbf6f(0x1d8)](_0x2e170d,_0x4fcb7d);};