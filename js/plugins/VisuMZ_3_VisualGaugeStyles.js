//=============================================================================
// VisuStella MZ - Visual Gauge Styles
// VisuMZ_3_VisualGaugeStyles.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VisualGaugeStyles = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VisualGaugeStyles = VisuMZ.VisualGaugeStyles || {};
VisuMZ.VisualGaugeStyles.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.01] [VisualGaugeStyles]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Visual_Gauge_Styles_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Visual Gauge Styles plugin allows you to swap out the various gauges
 * found and used in the game to don a different appearance and aesthetic. The
 * aesthetics can be mixed and matched to your liking, going from more visual
 * polygon structure-like styles to enhance a feeling to more mechanical-like
 * styles to relay information better. As these styles are all pre-rendered,
 * there are no custom files used with this plugin.
 *
 * Features include all (but not limited to) the following:
 * 
 * * No custom image files are needed for this plugin to utilize the various
 *   pre-rendered visual gauge styles.
 * * Mix and match from over 20+ choices to pick from for different types of
 *   gauges found in the game and from other VisuStella MZ plugins.
 * * Styles can have varying gauge heights, label offsets, and value offsets to
 *   add to the aesthetic differences.
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Sprite_Gauge Overwrite
 * 
 * Naturally, since the visual gauge styles are altered, certain aspects have
 * to be overwritten as a whole. For the Sprite_Gauge class, this means the
 * functions related to drawing the gauges themselves are overwritten.
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
 * VisuMZ_2_AggroControlSys
 * 
 * VisuMZ_2_BattleSystemATB
 * 
 * VisuMZ_3_VictoryAftermath
 *
 * These plugins from the VisuStella MZ library contain sprite gauges used that
 * can be altered and have a different style from the rest. Mix and match them
 * to your liking.
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
 * VisuMZ_4_VariableGauges
 * 
 * The updated version of VisuStella MZ's Variable Gauges can now utilize the
 * styles from this plugin. However, keep in mind that style settings like
 * adjusting gauge thickness will not be handled by the Visual Gauge Styles
 * plugin, but instead, handled by the Variable Gauges plugin.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Style Adjustment Settings
 * ============================================================================
 *
 * Adjust settings like label and value offsets for each style type.
 *
 * ---
 *
 * Structure-Styles
 * 
 *   Normal:
 *   Arrow:
 *   Dipper:
 *   Flag:
 *   Growth:
 *   Lean:
 *   Quad:
 *   Stagger:
 *   Trapezoid:
 *   - Adjustment settings like gauge thickness, labels, values offsets values
 *     when this specific style is used.
 *
 * ---
 *
 * Step-Styles
 * 
 *   Half Step:
 *   Third Step:
 *   Fourth Step:
 *   Fifth Step:
 *   Sixth Step:
 *   Eighth Step:
 *   Tenth Step:
 *   - Adjustment settings like gauge thickness, labels, values offsets values
 *     when this specific style is used.
 *
 * ---
 *
 * Section-Styles
 * 
 *   Half Section:
 *   Third Section:
 *   Fourth Section:
 *   Fifth Section:
 *   Sixth Section:
 *   Eighth Section:
 *   Tenth Section:
 *   - Adjustment settings like gauge thickness, labels, values offsets values
 *     when this specific style is used.
 *   - These gauges will be separated in even sections based on their numeric
 *     value used for their style name.
 *
 * ---
 *
 * Segment-Styles
 * 
 *   Segment By 10:
 *   Segment By 20:
 *   Segment By 25:
 *   Segment By 50:
 *   Segment By 100:
 *   Segment By 200:
 *   Segment By 250:
 *   Segment By 500:
 *   Segment By 1000:
 *   - Adjustment settings like gauge thickness, labels, values offsets values
 *     when this specific style is used.
 *   - These gauges will be separated in divided chunks based on the maximum
 *     value used to calculate the gauge. Their divison count is based on the
 *     numeric value used for their style name.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * Here, you can adjust the default settings for the various gauges used in the
 * game. If there are any future plugins that will utilize custom gauges, they
 * will be added here at a later date.
 *
 * ---
 *
 * Default
 * 
 *   Default Horizontal Style:
 *   Default Vertical Style:
 *   - Select the gauge style to use for default horizontal/vertical gauges.
 *   - When 'Default' style is selected in the "Status Window" or "Battlers"
 *     Plugin Parameters, the style will then refer to the "Horizontal" or
 *     "Vertical" gauge styles set here.
 *
 * ---
 *
 * Status Window
 * 
 *   Status: HP Style:
 *   Status: MP Style:
 *   Status: TP Style:
 *   Status: Time Style:
 *   Status: Aggro Style:
 *   - Select the gauge style to use for the status-related gauge.
 * 
 * ---
 * 
 * Battlers
 * 
 *   Battler: HP Style:
 *   Battler: Aggro Style:
 *   Battler: ATB Style:
 *   Battler: EXP Style:
 *   - Select the gauge style to use for the battler-related gauges.
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
 * Version 1.01: March 16, 2023
 * * Feature Update!
 * ** Plugin now prompts you to make sure your other plugins are up to date
 *    before usage. This plugin does not work with cores that are out of date.
 *    Update made by Olivia.
 * 
 * Version 1.00 Official Release Date: April 5, 2023
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
 * @param VisualGaugeStyles
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Styles:struct
 * @text Style Adjustment Settings
 * @type struct<Styles>
 * @desc Adjust settings like label and value offsets for each style type.
 * @default {"Structure":"","normal:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+0\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"+0\",\"valueOffsetY:num\":\"+0\"}","arrow:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-8\",\"valueOffsetY:num\":\"+0\"}","dipper:struct":"{\"gaugeThickness:num\":\"20\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","flag:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+0\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-8\",\"valueOffsetY:num\":\"+0\"}","growth:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","lean:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-8\",\"valueOffsetY:num\":\"+0\"}","quad:struct":"{\"gaugeThickness:num\":\"20\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","stagger:struct":"{\"gaugeThickness:num\":\"14\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-8\",\"valueOffsetY:num\":\"+0\"}","trapezoid:struct":"{\"gaugeThickness:num\":\"16\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","Steps":"","halfstep:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","thirdstep:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","fourthstep:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","fifthstep:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","sixthstep:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","eighthstep:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","tenthstep:struct":"{\"gaugeThickness:num\":\"24\",\"Label\":\"\",\"labelOffsetX:num\":\"+8\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-12\",\"valueOffsetY:num\":\"+0\"}","Section":"","halfsection:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","thirdsection:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","fourthsection:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","fifthsection:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","sixthsection:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","eighthsection:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","tenthsection:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","Segment":"","segmentby10:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","segmentby20:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","segmentby25:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","segmentby50:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","segmentby100:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","segmentby200:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","segmentby250:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","segmentby500:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}","segmentby1000:struct":"{\"gaugeThickness:num\":\"12\",\"Label\":\"\",\"labelOffsetX:num\":\"+4\",\"labelOffsetY:num\":\"+0\",\"Value\":\"\",\"valueOffsetX:num\":\"-4\",\"valueOffsetY:num\":\"+0\"}"}
 * 
 * @param DefaultStyles
 * @text Default
 * @parent Styles:struct
 * 
 * @param horzStyle:str
 * @text Default Horizontal Style
 * @parent DefaultStyles
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
 * @desc Select the gauge style to use for default horizontal gauges.
 * @default Lean
 * 
 * @param vertStyle:str
 * @text Default Vertical Style
 * @parent DefaultStyles
 * @type select
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
 * @desc Select the gauge style to use for default vertical gauges.
 * @default Arrow
 * 
 * @param StatusStyles
 * @text Status Window
 * @parent Styles:struct
 * 
 * @param statusHpStyle:str
 * @text Status: HP Style
 * @parent StatusStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the status window HP.
 * @default Stagger
 * 
 * @param statusMpStyle:str
 * @text Status: MP Style
 * @parent StatusStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the status window MP.
 * @default Stagger
 * 
 * @param statusTpStyle:str
 * @text Status: TP Style
 * @parent StatusStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the status window TP.
 * @default Stagger
 * 
 * @param statusTimeStyle:str
 * @text Status: Time Style
 * @parent StatusStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the status window time
 * gauge. Used for TPB and VisuMZ_2_BattleSystemATB.
 * @default Lean
 * 
 * @param statusAggroStyle:str
 * @text Status: Aggro Style
 * @parent StatusStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the status aggro gauge.
 * Requires VisuMZ_2_AggroControlSys!
 * @default Lean
 * 
 * @param BattlerStyles
 * @text Battlers
 * @parent Styles:struct
 * 
 * @param battlerHpStyle:str
 * @text Battler: HP Style
 * @parent BattlerStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the battler HP gauges.
 * @default Lean
 * 
 * @param battlerAggroStyle:str
 * @text Battler: Aggro Style
 * @parent BattlerStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the battler aggro gauge.
 * Requires VisuMZ_2_AggroControlSys!
 * @default Lean
 * 
 * @param battlerAtbStyle:str
 * @text Battler: ATB Style
 * @parent BattlerStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the battler ATB gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * @default Lean
 * 
 * @param battlerEXPStyle:str
 * @text Battler: EXP Style
 * @parent BattlerStyles
 * @type select
 * @option Normal
 * @option Default
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
 * @desc Select the gauge style to use for the battler EXP gauges.
 * Requires VisuMZ_3_VictoryAftermath!
 * @default Arrow
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
 * Specific Style Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Styles:
 * 
 * @param Structure
 * @text Structure-Styles
 *
 * @param normal:struct
 * @text Normal
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+0","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"+0","valueOffsetY:num":"+0"}
 *
 * @param arrow:struct
 * @text Arrow
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-8","valueOffsetY:num":"+0"}
 *
 * @param dipper:struct
 * @text Dipper
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"20","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param flag:struct
 * @text Flag
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+0","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-8","valueOffsetY:num":"+0"}
 *
 * @param growth:struct
 * @text Growth
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param lean:struct
 * @text Lean
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-8","valueOffsetY:num":"+0"}
 *
 * @param quad:struct
 * @text Quad
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"20","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param stagger:struct
 * @text Stagger
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"14","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-8","valueOffsetY:num":"+0"}
 *
 * @param trapezoid:struct
 * @text Trapezoid
 * @parent Structure
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"16","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 * 
 * @param Steps
 * @text Step-Styles
 *
 * @param halfstep:struct
 * @text Half Step
 * @parent Steps
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param thirdstep:struct
 * @text Third Step
 * @parent Steps
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param fourthstep:struct
 * @text Fourth Step
 * @parent Steps
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param fifthstep:struct
 * @text Fifth Step
 * @parent Steps
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param sixthstep:struct
 * @text Sixth Step
 * @parent Steps
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param eighthstep:struct
 * @text Eighth Step
 * @parent Steps
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 *
 * @param tenthstep:struct
 * @text Tenth Step
 * @parent Steps
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"24","Label":"","labelOffsetX:num":"+8","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-12","valueOffsetY:num":"+0"}
 * 
 * @param Section
 * @text Section-Styles
 *
 * @param halfsection:struct
 * @text Half Section
 * @parent Section
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param thirdsection:struct
 * @text Third Section
 * @parent Section
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param fourthsection:struct
 * @text Fourth Section
 * @parent Section
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param fifthsection:struct
 * @text Fifth Section
 * @parent Section
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param sixthsection:struct
 * @text Sixth Section
 * @parent Section
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param eighthsection:struct
 * @text Eighth Section
 * @parent Section
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param tenthsection:struct
 * @text Tenth Section
 * @parent Section
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 * 
 * @param Segment
 * @text Segment-Styles
 *
 * @param segmentby10:struct
 * @text Segment By 10
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param segmentby20:struct
 * @text Segment By 20
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param segmentby25:struct
 * @text Segment By 25
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param segmentby50:struct
 * @text Segment By 50
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param segmentby100:struct
 * @text Segment By 100
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param segmentby200:struct
 * @text Segment By 200
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param segmentby250:struct
 * @text Segment By 250
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param segmentby500:struct
 * @text Segment By 500
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 * @param segmentby1000:struct
 * @text Segment By 1000
 * @parent Segment
 * @type struct<OffsetData>
 * @desc Adjustment settings like gauge thickness, labels, values
 * offsets values when this specific style is used.
 * @default {"gaugeThickness:num":"12","Label":"","labelOffsetX:num":"+4","labelOffsetY:num":"+0","Value":"","valueOffsetX:num":"-4","valueOffsetY:num":"+0"}
 *
 */
/* ----------------------------------------------------------------------------
 * Offset Data Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OffsetData:
 *
 * @param gaugeThickness:num
 * @text Gauge Thickness
 * @type number
 * @min 1
 * @desc What is the gauge height/width when this style is used?
 * Horz Style: Adjusts height. Vert Style: Adjusts width.
 * @default 12
 * 
 * @param Label
 * @text Label Offsets
 *
 * @param labelOffsetX:num
 * @text Offset X
 * @parent Label
 * @desc How many pixels to offset the label text?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param labelOffsetY:num
 * @text Offset Y
 * @parent Label
 * @desc How many pixels to offset the label text?
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @param Value
 * @text Value Offsets
 *
 * @param valueOffsetX:num
 * @text Offset X
 * @parent Value
 * @desc How many pixels to offset the value text?
 * Negative: left. Positive: right.
 * @default +0
 *
 * @param valueOffsetY:num
 * @text Offset Y
 * @parent Value
 * @desc How many pixels to offset the value text?
 * Negative: up. Positive: down.
 * @default +0
 *
 */
//=============================================================================

const _0x366669=_0x2e77;(function(_0x5a6dcb,_0x4043e1){const _0x443f11=_0x2e77,_0x51dcec=_0x5a6dcb();while(!![]){try{const _0x2a1a2e=parseInt(_0x443f11(0x1dc))/0x1+parseInt(_0x443f11(0x158))/0x2+parseInt(_0x443f11(0x1c8))/0x3*(-parseInt(_0x443f11(0x16e))/0x4)+-parseInt(_0x443f11(0x150))/0x5*(-parseInt(_0x443f11(0x182))/0x6)+-parseInt(_0x443f11(0x194))/0x7*(parseInt(_0x443f11(0x17d))/0x8)+parseInt(_0x443f11(0x149))/0x9*(-parseInt(_0x443f11(0x175))/0xa)+parseInt(_0x443f11(0x173))/0xb*(parseInt(_0x443f11(0x1d2))/0xc);if(_0x2a1a2e===_0x4043e1)break;else _0x51dcec['push'](_0x51dcec['shift']());}catch(_0xac46c0){_0x51dcec['push'](_0x51dcec['shift']());}}}(_0x4599,0xa08b7));var label=_0x366669(0x154),tier=tier||0x0,dependencies=[_0x366669(0x134),_0x366669(0x156),_0x366669(0x137)],pluginData=$plugins[_0x366669(0x1ae)](function(_0xc0b529){const _0x231987=_0x366669;return _0xc0b529[_0x231987(0x147)]&&_0xc0b529['description'][_0x231987(0x1a5)]('['+label+']');})[0x0];VisuMZ[label][_0x366669(0x1ef)]=VisuMZ[label][_0x366669(0x1ef)]||{},VisuMZ[_0x366669(0x12e)]=function(_0x2ab5cc,_0x2cb0b5){const _0x863410=_0x366669;for(const _0x41a97e in _0x2cb0b5){if(_0x41a97e[_0x863410(0x1bb)](/(.*):(.*)/i)){const _0x5c4b22=String(RegExp['$1']),_0x7442d=String(RegExp['$2'])[_0x863410(0x19f)]()[_0x863410(0x14f)]();let _0x2e9802,_0x4cbdb,_0x956f93;switch(_0x7442d){case _0x863410(0x197):_0x2e9802=_0x2cb0b5[_0x41a97e]!==''?Number(_0x2cb0b5[_0x41a97e]):0x0;break;case _0x863410(0x18a):_0x4cbdb=_0x2cb0b5[_0x41a97e]!==''?JSON[_0x863410(0x19e)](_0x2cb0b5[_0x41a97e]):[],_0x2e9802=_0x4cbdb[_0x863410(0x1ac)](_0x30f8f3=>Number(_0x30f8f3));break;case _0x863410(0x189):_0x2e9802=_0x2cb0b5[_0x41a97e]!==''?eval(_0x2cb0b5[_0x41a97e]):null;break;case _0x863410(0x1a9):_0x4cbdb=_0x2cb0b5[_0x41a97e]!==''?JSON[_0x863410(0x19e)](_0x2cb0b5[_0x41a97e]):[],_0x2e9802=_0x4cbdb[_0x863410(0x1ac)](_0x353a8f=>eval(_0x353a8f));break;case _0x863410(0x1a2):_0x2e9802=_0x2cb0b5[_0x41a97e]!==''?JSON[_0x863410(0x19e)](_0x2cb0b5[_0x41a97e]):'';break;case _0x863410(0x14c):_0x4cbdb=_0x2cb0b5[_0x41a97e]!==''?JSON[_0x863410(0x19e)](_0x2cb0b5[_0x41a97e]):[],_0x2e9802=_0x4cbdb[_0x863410(0x1ac)](_0x7a4314=>JSON['parse'](_0x7a4314));break;case _0x863410(0x1dd):_0x2e9802=_0x2cb0b5[_0x41a97e]!==''?new Function(JSON[_0x863410(0x19e)](_0x2cb0b5[_0x41a97e])):new Function('return\x200');break;case _0x863410(0x1e0):_0x4cbdb=_0x2cb0b5[_0x41a97e]!==''?JSON['parse'](_0x2cb0b5[_0x41a97e]):[],_0x2e9802=_0x4cbdb[_0x863410(0x1ac)](_0x29e1f2=>new Function(JSON[_0x863410(0x19e)](_0x29e1f2)));break;case _0x863410(0x17f):_0x2e9802=_0x2cb0b5[_0x41a97e]!==''?String(_0x2cb0b5[_0x41a97e]):'';break;case'ARRAYSTR':_0x4cbdb=_0x2cb0b5[_0x41a97e]!==''?JSON[_0x863410(0x19e)](_0x2cb0b5[_0x41a97e]):[],_0x2e9802=_0x4cbdb[_0x863410(0x1ac)](_0x33b557=>String(_0x33b557));break;case _0x863410(0x12f):_0x956f93=_0x2cb0b5[_0x41a97e]!==''?JSON['parse'](_0x2cb0b5[_0x41a97e]):{},_0x2e9802=VisuMZ[_0x863410(0x12e)]({},_0x956f93);break;case'ARRAYSTRUCT':_0x4cbdb=_0x2cb0b5[_0x41a97e]!==''?JSON[_0x863410(0x19e)](_0x2cb0b5[_0x41a97e]):[],_0x2e9802=_0x4cbdb['map'](_0xf2145d=>VisuMZ['ConvertParams']({},JSON[_0x863410(0x19e)](_0xf2145d)));break;default:continue;}_0x2ab5cc[_0x5c4b22]=_0x2e9802;}}return _0x2ab5cc;},(_0x346634=>{const _0x89f4e=_0x366669,_0x2aa1b8=_0x346634[_0x89f4e(0x1c2)];for(const _0x2654bd of dependencies){if(!Imported[_0x2654bd]){alert(_0x89f4e(0x1a4)[_0x89f4e(0x1d4)](_0x2aa1b8,_0x2654bd)),SceneManager[_0x89f4e(0x18c)]();break;}}const _0x427842=_0x346634[_0x89f4e(0x142)];if(_0x427842[_0x89f4e(0x1bb)](/\[Version[ ](.*?)\]/i)){const _0x3e56a1=Number(RegExp['$1']);_0x3e56a1!==VisuMZ[label]['version']&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x89f4e(0x1d4)](_0x2aa1b8,_0x3e56a1)),SceneManager[_0x89f4e(0x18c)]());}if(_0x427842[_0x89f4e(0x1bb)](/\[Tier[ ](\d+)\]/i)){const _0x163457=Number(RegExp['$1']);_0x163457<tier?(alert(_0x89f4e(0x19a)['format'](_0x2aa1b8,_0x163457,tier)),SceneManager[_0x89f4e(0x18c)]()):tier=Math[_0x89f4e(0x135)](_0x163457,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x89f4e(0x1ef)],_0x346634[_0x89f4e(0x15f)]);})(pluginData);if(VisuMZ[_0x366669(0x14d)][_0x366669(0x17b)]<1.7){let text='';text+=_0x366669(0x1cc),text+=_0x366669(0x174),alert(text),SceneManager[_0x366669(0x18c)]();}function _0x4599(){const _0x506be2=['filter','thirdstep','HorzStyle','drawActorLevel','_aggroGaugeSprite','segmentby1000','GetDipperPolygon','_baseTexture','changeTpCustomColor','horzStyle','GetDefaultPolygon','Sprite_Gauge_setupValueFont','Sprite_Gauge_drawLabel','match','beginPath','GetPolygonStyle','_maxValueSegment','segmentby20','globalAlpha','battlerHpStyle','name','fourthsection','number','drawText','stagger','GetMultiSegmentPolygon','2274213YEEFzd','GetStyleData','ClearTextOffset','update','VisuMZ_0_CoreEngine\x20needs\x20to\x20be\x20updated\x20','fifthstep','GetArrowPolygon','labelOffsetX','vertStyle','setupLabelFont','1344TQjKWH','valueOffsetX','format','_tpGaugeSprite','dipper','isBattlerAggroGauge','GetGaugeHeight','drawVisualStyleGauge','moveTo','resetFontSettings','731217eiZTun','FUNC','segmentby10','gaugeColor1','ARRAYFUNC','growth','segmentby100','gaugeThickness','labelOffsetY','right','isExpGaugeDrawn','clamp','drawGauge','Sprite_Gauge_drawValue','levelA','tenthstep','systemColor','ShowActorLevel','ceil','Settings','LabelFontMainType','GetLeanPolygon','gaugeColor2','restore','VisuMZ_1_SkillsStatesCore\x20needs\x20to\x20be\x20updated\x20','battlerAggroStyle','SkillsStatesCore','_tpGaugeBack','ConvertParams','STRUCT','level','quad','call','VisuMZ_1_BattleCore\x20needs\x20to\x20be\x20updated\x20','VisuMZ_0_CoreEngine','max','GetStaggerPolygon','VisuMZ_1_SkillsStatesCore','_visualGaugeStyleOffset','Sprite_Gauge_gaugeHeight','currentMaxValue','gaugeHeight','_statusType','lineTo','GetMultiSectionPolygon','Bitmap_drawText','fourthstep','segmentby25','description','fontSize','fontFace','halfstep','addColorStop','status','drawFullGaugeEnhancedTp','36aKMVcv','segmentby50','strokeStyle','ARRAYJSON','CoreEngine','fifthsection','trim','2933275YrISiS','prototype','VisuMZ_2_AggroControlSystem','BattleCore','VisualGaugeStyles','MatchLabelColor','VisuMZ_1_BattleCore','numberFontFace','1102684ThpkXb','fill','push','drawValue','bitmap','flag','setupValueFont','parameters','segmentby500','redraw','isBattlerAtbGauge','valueOffsetY','slant','thirdsection','normal','battler','styleName','aggro','floor','statusTpStyle','statusHpStyle','mainFontSize','4tnjXCt','GetQuadPolygon','arrow','GetTrapezoidPolygon','gaugeRate','79343VRzNRw','in\x20order\x20for\x20VisuMZ_3_VisualGaugeStyles\x20to\x20work.','1470360XJgOyd','getStyleName','lineHeight','drawVisualStyleGaugeFront','SetLabelOffset','statusAggroStyle','version','drawVisualStyleGaugeRect','185728lzNouV','contents','STR','toLowerCase','lineWidth','6hcMcrr','VisuMZ_2_BattleSystemATB','save','eighthsection','createLinearGradient','tenthsection','segmentby250','EVAL','ARRAYNUM','GetFlagPolygon','exit','bitmapHeight','Sprite_Gauge_redraw','changeTextColor','Sprite_Gauge_setupLabelFont','drawVisualStyleGaugeBack','drawLabel','default','203FDJzSL','_context','trapezoid','NUM','fillStyle','_battler','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','drawGaugeRect','createTpGaugeBitmaps','Styles','parse','toUpperCase','stroke','GetMultiStepPolygon','JSON','_atbGaugeSprite','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','includes','halfsection','drawFullGauge','length','ARRAYEVAL','gaugeBackColor','battlerAtbStyle','map','SetValueOffset'];_0x4599=function(){return _0x506be2;};return _0x4599();}function _0x2e77(_0x5370d9,_0x17bf25){const _0x45990b=_0x4599();return _0x2e77=function(_0x2e77fa,_0x464b2c){_0x2e77fa=_0x2e77fa-0x12e;let _0x47296f=_0x45990b[_0x2e77fa];return _0x47296f;},_0x2e77(_0x5370d9,_0x17bf25);}if(VisuMZ[_0x366669(0x153)][_0x366669(0x17b)]<1.7){let text='';text+=_0x366669(0x133),text+=_0x366669(0x174),alert(text),SceneManager[_0x366669(0x18c)]();}if(VisuMZ[_0x366669(0x1f6)][_0x366669(0x17b)]<1.36){let text='';text+=_0x366669(0x1f4),text+=_0x366669(0x174),alert(text),SceneManager['exit']();}VisuMZ[_0x366669(0x154)][_0x366669(0x1b0)]=function(){const _0x316f80=_0x366669;return(VisuMZ['VisualGaugeStyles'][_0x316f80(0x1ef)][_0x316f80(0x1b7)]??_0x316f80(0x166))[_0x316f80(0x180)]()[_0x316f80(0x14f)]();},VisuMZ['VisualGaugeStyles']['VertStyle']=function(){const _0xd8ce88=_0x366669;return(VisuMZ[_0xd8ce88(0x154)][_0xd8ce88(0x1ef)][_0xd8ce88(0x1d0)]??_0xd8ce88(0x166))['toLowerCase']()[_0xd8ce88(0x14f)]();},VisuMZ[_0x366669(0x154)][_0x366669(0x1c9)]=function(_0x270fa4){const _0x4d3c40=_0x366669;return _0x270fa4=_0x270fa4[_0x4d3c40(0x180)]()[_0x4d3c40(0x14f)](),VisuMZ[_0x4d3c40(0x154)][_0x4d3c40(0x1ef)][_0x4d3c40(0x19d)][_0x270fa4]??{};},VisuMZ[_0x366669(0x154)][_0x366669(0x1d8)]=function(_0x1975a2,_0x31d8b8){const _0x4641d0=_0x366669,_0x51a0c6=this[_0x4641d0(0x1c9)](_0x1975a2);return _0x51a0c6[_0x4641d0(0x1e3)]??0xc;},VisuMZ[_0x366669(0x154)][_0x366669(0x179)]=function(_0x22cae6,_0x2c97d7){const _0x2447b3=_0x366669,_0xe5e4de=this[_0x2447b3(0x1c9)](_0x22cae6);$gameTemp[_0x2447b3(0x138)]={'x':_0xe5e4de[_0x2447b3(0x1cf)]??0x0,'y':_0xe5e4de[_0x2447b3(0x1e4)]??0x0};},VisuMZ[_0x366669(0x154)][_0x366669(0x1ad)]=function(_0x5900fa,_0x17e3ed){const _0x245723=_0x366669,_0x25ffb4=this[_0x245723(0x1c9)](_0x5900fa);$gameTemp[_0x245723(0x138)]={'x':_0x25ffb4[_0x245723(0x1d3)]??0x0,'y':_0x25ffb4[_0x245723(0x163)]??0x0};},VisuMZ[_0x366669(0x154)][_0x366669(0x1ca)]=function(){const _0x16e3ae=_0x366669;$gameTemp[_0x16e3ae(0x138)]=undefined;},Bitmap['prototype']['drawVisualStyleGauge']=function(_0x5366ed,_0x154ef,_0x303333,_0x2f578c,_0x3c8b59,_0x3c2df9,_0x126eaf,_0x255572,_0x2e27aa){const _0x1e82e3=_0x366669;_0x5366ed=String(_0x5366ed)[_0x1e82e3(0x180)]()['trim']();let _0x6c2779=VisuMZ['VisualGaugeStyles'][_0x1e82e3(0x1bd)](_0x5366ed,_0x154ef,_0x303333,_0x2f578c,_0x3c8b59,0x1,!![]),_0x44273b=VisuMZ[_0x1e82e3(0x154)][_0x1e82e3(0x1bd)](_0x5366ed,_0x154ef,_0x303333,_0x2f578c,_0x3c8b59,_0x3c2df9,![]);this[_0x1e82e3(0x191)](_0x6c2779,_0x126eaf);const _0x3c8e2b=_0x154ef+_0x2f578c,_0x54a414=_0x303333,_0x1e555b=this[_0x1e82e3(0x195)][_0x1e82e3(0x186)](_0x154ef,_0x303333,_0x3c8e2b,_0x54a414);this[_0x1e82e3(0x178)](_0x44273b,_0x255572,_0x2e27aa,_0x1e555b);},Bitmap['prototype'][_0x366669(0x191)]=function(_0x6f49e0,_0xa4570c){const _0x2e93ff=_0x366669,_0x2ca9d2=this[_0x2e93ff(0x195)];_0x2ca9d2[_0x2e93ff(0x184)](),_0x2ca9d2[_0x2e93ff(0x1bc)](),_0x2ca9d2['moveTo'](_0x6f49e0[0x0],_0x6f49e0[0x1]);for(var _0xab6494=0x2;_0xab6494<_0x6f49e0[_0x2e93ff(0x1a8)];_0xab6494+=0x2){_0x2ca9d2[_0x2e93ff(0x13d)](_0x6f49e0[_0xab6494],_0x6f49e0[_0xab6494+0x1]);}_0x2ca9d2[_0x2e93ff(0x13d)](_0x6f49e0[0x0],_0x6f49e0[0x1]),_0x2ca9d2['strokeStyle']=_0xa4570c,_0x2ca9d2[_0x2e93ff(0x181)]=0x2,_0x2ca9d2['stroke'](),_0x2ca9d2[_0x2e93ff(0x1c0)]=0xff,_0x2ca9d2[_0x2e93ff(0x198)]=_0xa4570c,_0x2ca9d2[_0x2e93ff(0x159)](),_0x2ca9d2[_0x2e93ff(0x1c0)]=0x1,_0x2ca9d2[_0x2e93ff(0x1f3)](),this[_0x2e93ff(0x1b5)][_0x2e93ff(0x1cb)]();},Bitmap[_0x366669(0x151)][_0x366669(0x178)]=function(_0x11691a,_0x17e112,_0x3a9f99,_0x28af97,_0x43a509){const _0x20b6a6=_0x366669,_0x270068=this['_context'];_0x28af97[_0x20b6a6(0x146)](0x0,_0x17e112),_0x28af97[_0x20b6a6(0x146)](0x1,_0x3a9f99),_0x270068['save'](),_0x270068[_0x20b6a6(0x1bc)](),_0x270068[_0x20b6a6(0x1da)](_0x11691a[0x0],_0x11691a[0x1]);for(var _0x5075a6=0x2;_0x5075a6<_0x11691a[_0x20b6a6(0x1a8)];_0x5075a6+=0x2){_0x270068[_0x20b6a6(0x13d)](_0x11691a[_0x5075a6],_0x11691a[_0x5075a6+0x1]);}_0x270068[_0x20b6a6(0x13d)](_0x11691a[0x0],_0x11691a[0x1]),_0x43a509&&(_0x270068[_0x20b6a6(0x14b)]=_0x43a509,_0x270068[_0x20b6a6(0x181)]=0x2,_0x270068[_0x20b6a6(0x1a0)]()),_0x270068[_0x20b6a6(0x198)]=_0x28af97,_0x270068[_0x20b6a6(0x159)](),_0x270068['globalAlpha']=0x1,_0x270068[_0x20b6a6(0x1f3)](),this['_baseTexture'][_0x20b6a6(0x1cb)]();},VisuMZ[_0x366669(0x154)][_0x366669(0x1bd)]=function(_0x1b5ed8,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b){const _0x1cd8bf=_0x366669;_0x1b5ed8=_0x1b5ed8[_0x1cd8bf(0x180)]()[_0x1cd8bf(0x14f)](),_0x8780a2=_0x8780a2['clamp'](0x0,0x1),_0x2aec73+=0x1,_0x45218+=0x1,_0x3c90c8-=0x2,_0x16016f-=0x2;switch(_0x1b5ed8){case'lean':return this[_0x1cd8bf(0x1f1)](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x170):return this[_0x1cd8bf(0x1ce)](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x1e1):return this['GetGrowthPolygon'](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x1c6):return this[_0x1cd8bf(0x136)](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x1d6):return this[_0x1cd8bf(0x1b4)](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x131):return this[_0x1cd8bf(0x16f)](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x196):return this['GetTrapezoidPolygon'](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x15d):return this[_0x1cd8bf(0x18b)](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x145):return this[_0x1cd8bf(0x1a1)](0x2,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x1af):return this[_0x1cd8bf(0x1a1)](0x3,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x140):return this['GetMultiStepPolygon'](0x4,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x1cd):return this[_0x1cd8bf(0x1a1)](0x5,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case'sixthstep':return this[_0x1cd8bf(0x1a1)](0x6,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case'eighthstep':return this[_0x1cd8bf(0x1a1)](0x8,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x1eb):return this['GetMultiStepPolygon'](0xa,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);case _0x1cd8bf(0x1a6):return this[_0x1cd8bf(0x13e)](0x2,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x165):return this[_0x1cd8bf(0x13e)](0x3,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x1c3):return this[_0x1cd8bf(0x13e)](0x4,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x14e):return this['GetMultiSectionPolygon'](0x5,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case'sixthsection':return this[_0x1cd8bf(0x13e)](0x6,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x185):return this[_0x1cd8bf(0x13e)](0x8,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x187):return this[_0x1cd8bf(0x13e)](0xa,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x1de):return this[_0x1cd8bf(0x1c7)](0xa,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x1bf):return this[_0x1cd8bf(0x1c7)](0x14,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x141):return this[_0x1cd8bf(0x1c7)](0x19,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x14a):return this[_0x1cd8bf(0x1c7)](0x32,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x1e2):return this[_0x1cd8bf(0x1c7)](0x64,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case'segmentby200':return this['GetMultiSegmentPolygon'](0xc8,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x188):return this[_0x1cd8bf(0x1c7)](0xfa,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x160):return this['GetMultiSegmentPolygon'](0x1f4,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);case _0x1cd8bf(0x1b3):return this[_0x1cd8bf(0x1c7)](0x3e8,_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2,_0x4ecc3b);default:return this[_0x1cd8bf(0x1b8)](_0x2aec73,_0x45218,_0x3c90c8,_0x16016f,_0x8780a2);};},VisuMZ['VisualGaugeStyles'][_0x366669(0x1b8)]=function(_0x670988,_0x4c97d8,_0x300eec,_0x4563f9,_0x16561d){const _0x3f2ddc=_0x366669,_0x537045=_0x4563f9;return _0x300eec=Math[_0x3f2ddc(0x16a)](_0x300eec*_0x16561d),[_0x670988,_0x4c97d8,_0x670988+_0x300eec,_0x4c97d8,_0x670988+_0x300eec,_0x4c97d8+_0x4563f9,_0x670988,_0x4c97d8+_0x4563f9];},VisuMZ[_0x366669(0x154)][_0x366669(0x1f1)]=function(_0x366d36,_0x1de3ec,_0x210e41,_0x4f90a3,_0x13e764){const _0x3667e4=_0x366669,_0x4df116=[],_0xc3cf1d=Math[_0x3667e4(0x1ee)](_0x4f90a3/0x3);if(_0x210e41<_0xc3cf1d*0x2)return this['GetDefaultPolygon'](_0x366d36,_0x1de3ec,_0x210e41,_0x4f90a3,_0x13e764);return _0x210e41=Math[_0x3667e4(0x16a)]((_0x210e41-_0xc3cf1d)*_0x13e764),_0x4df116[_0x3667e4(0x15a)](_0x366d36+_0xc3cf1d,_0x1de3ec),(_0x4df116[_0x3667e4(0x15a)](_0x366d36+_0xc3cf1d+_0x210e41,_0x1de3ec),_0x4df116[_0x3667e4(0x15a)](_0x366d36+_0x210e41,_0x1de3ec+_0x4f90a3),_0x4df116[_0x3667e4(0x15a)](_0x366d36,_0x1de3ec+_0x4f90a3)),_0x4df116;},VisuMZ['VisualGaugeStyles'][_0x366669(0x1ce)]=function(_0x10c0af,_0x3562e,_0x17e2a8,_0x4d2b9e,_0x198790){const _0x131dd9=_0x366669,_0x3c8a00=[],_0x36c983=Math[_0x131dd9(0x1ee)](_0x4d2b9e/0x3);if(_0x17e2a8<_0x36c983*0x2)return this[_0x131dd9(0x1b8)](_0x10c0af,_0x3562e,_0x17e2a8,_0x4d2b9e,_0x198790);return _0x17e2a8=Math[_0x131dd9(0x16a)]((_0x17e2a8-_0x36c983)*_0x198790),_0x3c8a00['push'](_0x10c0af,_0x3562e),_0x3c8a00['push'](_0x10c0af+_0x17e2a8,_0x3562e),_0x3c8a00[_0x131dd9(0x15a)](_0x10c0af+_0x17e2a8+_0x36c983,_0x3562e+_0x4d2b9e/0x2),_0x3c8a00[_0x131dd9(0x15a)](_0x10c0af+_0x17e2a8,_0x3562e+_0x4d2b9e),_0x3c8a00[_0x131dd9(0x15a)](_0x10c0af,_0x3562e+_0x4d2b9e),_0x3c8a00[_0x131dd9(0x15a)](_0x10c0af+_0x36c983,_0x3562e+_0x4d2b9e/0x2),_0x3c8a00;},VisuMZ[_0x366669(0x154)]['GetGrowthPolygon']=function(_0x4a502f,_0x120619,_0x2b7daf,_0x47a56b,_0x314e16){const _0x56caea=_0x366669,_0x278ecd=[],_0x498bf7=Math['ceil'](_0x47a56b/0x2);if(_0x2b7daf<_0x498bf7*0x2)return this['GetDefaultPolygon'](_0x4a502f,_0x120619,_0x2b7daf,_0x47a56b,_0x314e16);return _0x2b7daf=Math[_0x56caea(0x16a)](_0x2b7daf*_0x314e16),hr=Math['floor'](_0x47a56b*_0x314e16),_0x278ecd[_0x56caea(0x15a)](_0x4a502f,_0x120619+_0x47a56b),_0x278ecd['push'](_0x4a502f+_0x2b7daf,_0x120619+_0x47a56b-hr),_0x278ecd['push'](_0x4a502f+Math[_0x56caea(0x135)](_0x2b7daf-_0x498bf7*_0x314e16,0x0),_0x120619+_0x47a56b),_0x278ecd;},VisuMZ[_0x366669(0x154)][_0x366669(0x136)]=function(_0x27cff9,_0x5d87b5,_0x595694,_0x3c517c,_0x157beb){const _0x4be0ee=_0x366669,_0x576ded=[],_0x474a5e=Math[_0x4be0ee(0x1ee)](_0x3c517c/0x2),_0x55c44f=_0x474a5e/0x2;if(_0x595694<_0x474a5e*0x2)return this[_0x4be0ee(0x1b8)](_0x27cff9,_0x5d87b5,_0x595694,_0x3c517c,_0x157beb);_0x595694-=_0x474a5e;const _0x65620=_0x595694/0x3;return _0x595694=Math[_0x4be0ee(0x16a)](_0x595694*_0x157beb),_0x576ded[_0x4be0ee(0x15a)](_0x27cff9+_0x55c44f,_0x5d87b5+_0x3c517c/0x2),_0x157beb<0x1/0x3?_0x576ded[_0x4be0ee(0x15a)](_0x27cff9+_0x55c44f+_0x595694,_0x5d87b5+_0x3c517c/0x2):(_0x576ded[_0x4be0ee(0x15a)](_0x27cff9+_0x65620+_0x55c44f,_0x5d87b5+_0x3c517c/0x2),_0x576ded[_0x4be0ee(0x15a)](_0x27cff9+_0x65620+_0x474a5e,_0x5d87b5),_0x576ded[_0x4be0ee(0x15a)](_0x27cff9+_0x595694+_0x474a5e,_0x5d87b5)),_0x576ded[_0x4be0ee(0x15a)](_0x27cff9+_0x595694,_0x5d87b5+_0x3c517c),_0x576ded[_0x4be0ee(0x15a)](_0x27cff9,_0x5d87b5+_0x3c517c),_0x576ded;},VisuMZ[_0x366669(0x154)]['GetDipperPolygon']=function(_0x1c4b8d,_0x470f4a,_0xd9bdab,_0x5bcecf,_0x3dea53){const _0x331668=_0x366669,_0x498540=[],_0x2973dd=0x1e;if(_0xd9bdab<_0x2973dd*0x2)return;_0xd9bdab-=_0x2973dd,_0xd9bdab=Math[_0x331668(0x16a)](_0xd9bdab*_0x3dea53);const _0xa2f473=_0x5bcecf/0x2;return _0x498540[_0x331668(0x15a)](_0x1c4b8d,_0x470f4a+_0xa2f473),_0x498540['push'](_0x1c4b8d+_0xd9bdab+_0x2973dd*_0x3dea53,_0x470f4a+(_0xa2f473-_0xa2f473*_0x3dea53)),_0x498540[_0x331668(0x15a)](_0x1c4b8d+_0xd9bdab,_0x470f4a+(_0xa2f473+_0xa2f473*_0x3dea53)),_0x498540;},VisuMZ['VisualGaugeStyles'][_0x366669(0x16f)]=function(_0x1b849e,_0x447f1b,_0x370402,_0x241092,_0x19a5dc){const _0x5e68e2=_0x366669,_0x499489=[],_0x23f525=_0x241092;_0x370402-=_0x23f525,_0x370402=Math['floor'](_0x370402*_0x19a5dc);const _0x40103c=_0x241092/0x2;return _0x499489[_0x5e68e2(0x15a)](_0x1b849e,_0x447f1b+_0x40103c),_0x499489[_0x5e68e2(0x15a)](_0x1b849e+_0x23f525*_0x19a5dc+_0x370402,_0x447f1b+(_0x40103c-_0x40103c*_0x19a5dc)),_0x499489['push'](_0x1b849e+_0x23f525/0x2+_0x370402,_0x447f1b+_0x241092),_0x499489[_0x5e68e2(0x15a)](_0x1b849e+_0x23f525/0x2,_0x447f1b+_0x241092),_0x499489;},VisuMZ[_0x366669(0x154)][_0x366669(0x171)]=function(_0x17ef9b,_0x10d0a0,_0x363b25,_0x1942c8,_0x340424){const _0x4504ef=_0x366669,_0x3c7edb=[],_0x3faa56=Math[_0x4504ef(0x1ee)](_0x1942c8/0x2),_0x2fa829=Math['floor'](_0x363b25*_0x340424);return _0x363b25-=_0x3faa56*0x2,_0x363b25=Math['floor'](_0x363b25*_0x340424),_0x3c7edb[_0x4504ef(0x15a)](_0x17ef9b+_0x3faa56,_0x10d0a0),_0x3c7edb[_0x4504ef(0x15a)](_0x17ef9b+_0x3faa56+_0x363b25,_0x10d0a0),_0x3c7edb['push'](_0x17ef9b+_0x2fa829,_0x10d0a0+_0x1942c8),_0x3c7edb[_0x4504ef(0x15a)](_0x17ef9b,_0x10d0a0+_0x1942c8),_0x3c7edb;},VisuMZ[_0x366669(0x154)]['GetFlagPolygon']=function(_0x5c0a52,_0x35218c,_0x131a5b,_0x35dd5e,_0x3620e0){const _0x11b7a6=_0x366669,_0x44e1b1=[],_0x10a9fc=Math[_0x11b7a6(0x1ee)](_0x35dd5e/0x3);_0x131a5b=Math[_0x11b7a6(0x16a)](_0x131a5b*_0x3620e0);const _0x3ebc50=Math[_0x11b7a6(0x135)](_0x131a5b-_0x10a9fc,0x0);return _0x44e1b1[_0x11b7a6(0x15a)](_0x5c0a52,_0x35218c),_0x44e1b1['push'](_0x5c0a52+_0x3ebc50,_0x35218c),_0x44e1b1[_0x11b7a6(0x15a)](_0x5c0a52+_0x131a5b,_0x35218c+_0x35dd5e/0x2),_0x44e1b1[_0x11b7a6(0x15a)](_0x5c0a52+_0x3ebc50,_0x35218c+_0x35dd5e),_0x44e1b1['push'](_0x5c0a52,_0x35218c+_0x35dd5e),_0x44e1b1;},VisuMZ[_0x366669(0x154)][_0x366669(0x1a1)]=function(_0x1686a6,_0x186830,_0x5e03a9,_0x43cb61,_0x439a7b,_0x589e50){const _0x2f311f=_0x366669,_0x58bf72=[],_0x183705=Math[_0x2f311f(0x1ee)](_0x439a7b/0x2);if(_0x43cb61<_0x183705*0x2)return this[_0x2f311f(0x1b8)](_0x186830,_0x5e03a9,_0x43cb61,_0x439a7b,_0x589e50);_0x43cb61-=_0x183705;const _0xd246e7=_0x43cb61;_0x43cb61=Math[_0x2f311f(0x16a)](_0x43cb61*_0x589e50);let _0x48ef7a=0x1;_0x58bf72['push'](_0x186830+_0x183705*_0x48ef7a/_0x1686a6,_0x5e03a9+_0x439a7b*(_0x1686a6-_0x48ef7a)/_0x1686a6);while(_0x48ef7a<=_0x1686a6){if(_0x589e50<=_0x48ef7a/_0x1686a6){_0x58bf72[_0x2f311f(0x15a)](_0x186830+_0x183705*_0x48ef7a/_0x1686a6+_0x43cb61,_0x5e03a9+_0x439a7b*(_0x1686a6-_0x48ef7a)/_0x1686a6);break;}_0x58bf72[_0x2f311f(0x15a)](_0x186830+_0x183705*_0x48ef7a/_0x1686a6+_0xd246e7*(_0x48ef7a/_0x1686a6),_0x5e03a9+_0x439a7b*(_0x1686a6-_0x48ef7a)/_0x1686a6),_0x48ef7a+=0x1,_0x58bf72[_0x2f311f(0x15a)](_0x186830+_0x183705*_0x48ef7a/_0x1686a6+_0xd246e7*((_0x48ef7a-0x1)/_0x1686a6),_0x5e03a9+_0x439a7b*(_0x1686a6-_0x48ef7a)/_0x1686a6);}return _0x58bf72[_0x2f311f(0x15a)](_0x186830+_0x43cb61,_0x5e03a9+_0x439a7b),_0x58bf72[_0x2f311f(0x15a)](_0x186830,_0x5e03a9+_0x439a7b),_0x58bf72;},VisuMZ['VisualGaugeStyles']['GetMultiSectionPolygon']=function(_0x3fc6d8,_0x61a00c,_0x472b1c,_0x22b98e,_0x3b7a8b,_0x49b526,_0x1f0de4){const _0x15f481=_0x366669,_0x271a99=[],_0x5c9106=_0x22b98e,_0x21e583=_0x3b7a8b*0.99;_0x22b98e=Math[_0x15f481(0x16a)](_0x22b98e*_0x49b526),_0x271a99[_0x15f481(0x15a)](_0x61a00c,_0x472b1c);const _0x7cf2c4=_0x5c9106/_0x3fc6d8,_0x2c3c3c=0x1/_0x3fc6d8,_0x4b7324=0.5;let _0x36348f=0x1;while(_0x36348f<=_0x3fc6d8){if(_0x49b526<=_0x2c3c3c*_0x36348f||_0x1f0de4){_0x271a99['push'](_0x61a00c+_0x22b98e,_0x472b1c);break;}_0x271a99[_0x15f481(0x15a)](_0x61a00c+_0x7cf2c4*_0x36348f,_0x472b1c),_0x271a99[_0x15f481(0x15a)](_0x61a00c+_0x7cf2c4*_0x36348f,_0x472b1c+_0x21e583);if(_0x22b98e<=_0x61a00c+_0x7cf2c4*_0x36348f+_0x4b7324){_0x271a99[_0x15f481(0x15a)](_0x61a00c+_0x22b98e,_0x472b1c+_0x21e583);break;}_0x271a99[_0x15f481(0x15a)](_0x61a00c+_0x7cf2c4*_0x36348f+_0x4b7324,_0x472b1c+_0x21e583),_0x271a99['push'](_0x61a00c+_0x7cf2c4*_0x36348f+_0x4b7324,_0x472b1c),_0x36348f+=0x1;}return _0x271a99['push'](_0x61a00c+_0x22b98e,_0x472b1c+_0x3b7a8b),_0x271a99[_0x15f481(0x15a)](_0x61a00c,_0x472b1c+_0x3b7a8b),_0x271a99;},VisuMZ[_0x366669(0x154)][_0x366669(0x1c7)]=function(_0x30c7c2,_0x34caac,_0x4059ff,_0x18cacb,_0x1945f7,_0x2210ba,_0x1ba9b7){const _0x2185be=_0x366669,_0x19957f=[],_0x126fc1=_0x18cacb,_0x2ab748=_0x1945f7*0.99;_0x18cacb=Math['floor'](_0x18cacb*_0x2210ba),_0x19957f[_0x2185be(0x15a)](_0x34caac,_0x4059ff);const _0x5b5f7f=Math[_0x2185be(0x135)]((this[_0x2185be(0x1be)]||0x64)/_0x30c7c2,0x1),_0x4a0177=_0x126fc1/_0x5b5f7f,_0xe8376f=0x1/_0x5b5f7f,_0x2b75e9=0.5;let _0x50288e=0x1;while(_0x50288e<=_0x5b5f7f){if(_0x2210ba<=_0xe8376f*_0x50288e||_0x1ba9b7){_0x19957f[_0x2185be(0x15a)](_0x34caac+_0x18cacb,_0x4059ff);break;}_0x19957f[_0x2185be(0x15a)](_0x34caac+_0x4a0177*_0x50288e,_0x4059ff),_0x19957f[_0x2185be(0x15a)](_0x34caac+_0x4a0177*_0x50288e,_0x4059ff+_0x2ab748);if(_0x18cacb<=_0x34caac+_0x4a0177*_0x50288e+_0x2b75e9){_0x19957f[_0x2185be(0x15a)](_0x34caac+_0x18cacb,_0x4059ff+_0x2ab748);break;}_0x19957f['push'](_0x34caac+_0x4a0177*_0x50288e+_0x2b75e9,_0x4059ff+_0x2ab748),_0x19957f[_0x2185be(0x15a)](_0x34caac+_0x4a0177*_0x50288e+_0x2b75e9,_0x4059ff),_0x50288e+=0x1;if(_0x50288e>_0x5b5f7f){_0x19957f['push'](_0x34caac+_0x18cacb,_0x4059ff);break;}}return _0x19957f[_0x2185be(0x15a)](_0x34caac+_0x18cacb,_0x4059ff+_0x1945f7),_0x19957f[_0x2185be(0x15a)](_0x34caac,_0x4059ff+_0x1945f7),_0x19957f;},Sprite_Gauge[_0x366669(0x151)][_0x366669(0x168)]=function(){const _0x1b9677=_0x366669;if(!this[_0x1b9677(0x199)])return VisuMZ[_0x1b9677(0x154)][_0x1b9677(0x1b0)]();const _0x4f1187=this[_0x1b9677(0x176)]()[_0x1b9677(0x180)]()[_0x1b9677(0x14f)]();if(_0x4f1187===_0x1b9677(0x193))return VisuMZ[_0x1b9677(0x154)][_0x1b9677(0x1b0)]();return _0x4f1187;},Sprite_Gauge[_0x366669(0x151)][_0x366669(0x176)]=function(){const _0x2c9ad8=_0x366669,_0x481c48=VisuMZ[_0x2c9ad8(0x154)][_0x2c9ad8(0x1ef)];switch(this[_0x2c9ad8(0x13c)]){case'hp':return _0x481c48[_0x2c9ad8(0x16c)]??_0x2c9ad8(0x1c6);case'mp':return _0x481c48['statusMpStyle']??'stagger';case'tp':return _0x481c48[_0x2c9ad8(0x16b)]??_0x2c9ad8(0x1c6);case'time':return this['isBattlerAtbGauge']()?_0x481c48[_0x2c9ad8(0x1ab)]??_0x2c9ad8(0x164):_0x481c48['statusTimeStyle']??_0x2c9ad8(0x164);case _0x2c9ad8(0x169):return this[_0x2c9ad8(0x1d7)]()?_0x481c48[_0x2c9ad8(0x1f5)]??'slant':_0x481c48[_0x2c9ad8(0x17a)]??_0x2c9ad8(0x164);}return VisuMZ[_0x2c9ad8(0x154)]['HorzStyle']();},Sprite_Gauge[_0x366669(0x151)][_0x366669(0x19b)]=function(_0x4f790d,_0x3b67f0,_0x5da9ee,_0x394ab3){const _0x5eb992=_0x366669;if(Imported['VisuMZ_2_EnhancedTpSystem']&&this[_0x5eb992(0x13c)]==='tp'&&this[_0x5eb992(0x1d5)])this['drawGaugeRectEnhancedTp'](_0x4f790d,_0x3b67f0,_0x5da9ee,_0x394ab3);else{const _0x3066c3=this[_0x5eb992(0x1df)](),_0x262785=this['gaugeColor2']();this[_0x5eb992(0x17c)](_0x3066c3,_0x262785,_0x4f790d,_0x3b67f0,_0x5da9ee,_0x394ab3);}},Sprite_Gauge[_0x366669(0x151)][_0x366669(0x1a7)]=function(_0x2b5152,_0x4538d6,_0x2fa6c3,_0x4ed8cd,_0x9be591,_0x5a20b4){const _0x28efea=_0x366669;Imported['VisuMZ_2_EnhancedTpSystem']&&this[_0x28efea(0x13c)]==='tp'&&this['_tpGaugeSprite']?this['drawFullGaugeEnhancedTp'](_0x2b5152,_0x4538d6,_0x2fa6c3,_0x4ed8cd,_0x9be591,_0x5a20b4):this['drawVisualStyleGaugeRect'](_0x2b5152,_0x4538d6,_0x2fa6c3,_0x4ed8cd,_0x9be591,_0x5a20b4);},Sprite_Gauge[_0x366669(0x151)][_0x366669(0x17c)]=function(_0x18e9f2,_0x308899,_0x263896,_0x2b6234,_0x5000de,_0x80f955){const _0x243450=_0x366669,_0x3720fb=this[_0x243450(0x168)](),_0xfa0bed=this[_0x243450(0x172)](),_0x5afaff=this['gaugeBackColor']();VisuMZ[_0x243450(0x154)][_0x243450(0x1be)]=this[_0x243450(0x13a)]()||0x64,this[_0x243450(0x15c)][_0x243450(0x1d9)](_0x3720fb,_0x263896,_0x2b6234,_0x5000de,_0x80f955,_0xfa0bed,_0x5afaff,_0x18e9f2,_0x308899);},VisuMZ['VisualGaugeStyles'][_0x366669(0x139)]=Sprite_Gauge[_0x366669(0x151)]['gaugeHeight'],Sprite_Gauge['prototype'][_0x366669(0x13b)]=function(){const _0x1f1d57=_0x366669,_0x3df301=this['styleName']();return(VisuMZ[_0x1f1d57(0x154)][_0x1f1d57(0x1d8)](_0x3df301)??0xc)['clamp'](0x1,this[_0x1f1d57(0x18d)]());},VisuMZ[_0x366669(0x154)][_0x366669(0x190)]=Sprite_Gauge[_0x366669(0x151)][_0x366669(0x1d1)],Sprite_Gauge[_0x366669(0x151)][_0x366669(0x1d1)]=function(){const _0x55a53d=_0x366669;VisuMZ[_0x55a53d(0x154)]['Sprite_Gauge_setupLabelFont'][_0x55a53d(0x132)](this),VisuMZ['VisualGaugeStyles'][_0x55a53d(0x179)](this[_0x55a53d(0x168)]());},VisuMZ[_0x366669(0x154)][_0x366669(0x1ba)]=Sprite_Gauge[_0x366669(0x151)][_0x366669(0x192)],Sprite_Gauge['prototype'][_0x366669(0x192)]=function(){const _0x3f5ced=_0x366669;VisuMZ[_0x3f5ced(0x154)]['Sprite_Gauge_drawLabel'][_0x3f5ced(0x132)](this),VisuMZ[_0x3f5ced(0x154)]['ClearTextOffset']();},VisuMZ[_0x366669(0x154)][_0x366669(0x1b9)]=Sprite_Gauge['prototype'][_0x366669(0x15e)],Sprite_Gauge['prototype'][_0x366669(0x15e)]=function(){const _0x188910=_0x366669;VisuMZ[_0x188910(0x154)][_0x188910(0x1b9)][_0x188910(0x132)](this),VisuMZ[_0x188910(0x154)][_0x188910(0x1ad)](this[_0x188910(0x168)]());},VisuMZ[_0x366669(0x154)][_0x366669(0x1e9)]=Sprite_Gauge[_0x366669(0x151)][_0x366669(0x15b)],Sprite_Gauge[_0x366669(0x151)][_0x366669(0x15b)]=function(){const _0x4dd409=_0x366669;VisuMZ[_0x4dd409(0x154)][_0x4dd409(0x1e9)]['call'](this),VisuMZ[_0x4dd409(0x154)][_0x4dd409(0x1ca)]();},VisuMZ[_0x366669(0x154)][_0x366669(0x18e)]=Sprite_Gauge['prototype']['redraw'],Sprite_Gauge[_0x366669(0x151)][_0x366669(0x161)]=function(){const _0xee7790=_0x366669;VisuMZ[_0xee7790(0x154)]['Sprite_Gauge_redraw'][_0xee7790(0x132)](this),VisuMZ[_0xee7790(0x154)]['ClearTextOffset']();},VisuMZ[_0x366669(0x154)][_0x366669(0x13f)]=Bitmap[_0x366669(0x151)]['drawText'],Bitmap[_0x366669(0x151)][_0x366669(0x1c5)]=function(_0x589b0c,_0x10dab6,_0x7cc349,_0x3afb0b,_0x5724f3,_0x9acd36){const _0x5c85ef=_0x366669;$gameTemp&&$gameTemp[_0x5c85ef(0x138)]&&(_0x10dab6+=$gameTemp[_0x5c85ef(0x138)]['x'],_0x7cc349+=$gameTemp[_0x5c85ef(0x138)]['y']),VisuMZ['VisualGaugeStyles']['Bitmap_drawText'][_0x5c85ef(0x132)](this,_0x589b0c,_0x10dab6,_0x7cc349,_0x3afb0b,_0x5724f3,_0x9acd36);},Sprite_HpGauge[_0x366669(0x151)][_0x366669(0x13b)]=function(){const _0x319a89=_0x366669;return VisuMZ[_0x319a89(0x154)][_0x319a89(0x139)]['call'](this);},Sprite_HpGauge['prototype'][_0x366669(0x176)]=function(){const _0x3d191c=_0x366669,_0x1efecf=VisuMZ['VisualGaugeStyles']['Settings'];return _0x1efecf[_0x3d191c(0x1c1)]??_0x3d191c(0x166);},Sprite_Gauge[_0x366669(0x151)][_0x366669(0x162)]=function(){const _0x149ff0=_0x366669;if(!Imported[_0x149ff0(0x183)])return![];if(!this[_0x149ff0(0x199)])return![];if(!this['_battler'][_0x149ff0(0x167)]())return![];return this===this[_0x149ff0(0x199)]['battler']()[_0x149ff0(0x1a3)];},Sprite_Gauge[_0x366669(0x151)][_0x366669(0x1d7)]=function(){const _0xe5490b=_0x366669;if(!Imported[_0xe5490b(0x152)])return![];if(!this['_battler'])return![];if(!this[_0xe5490b(0x199)]['battler']())return![];return this===this[_0xe5490b(0x199)][_0xe5490b(0x167)]()[_0xe5490b(0x1b2)];},Sprite_Gauge[_0x366669(0x151)]['drawGaugeRectEnhancedTp']=function(_0x1eccd0,_0x5426ee,_0x3bfaed,_0x244be3){const _0x109398=_0x366669,_0x192ce8=this[_0x109398(0x1b6)](this[_0x109398(0x1df)](),0x1),_0xee00f4=this[_0x109398(0x1b6)](this[_0x109398(0x1f2)](),0x2);this[_0x109398(0x148)](_0x192ce8,_0xee00f4,_0x1eccd0,_0x5426ee,_0x3bfaed,_0x244be3);},Sprite_Gauge[_0x366669(0x151)][_0x366669(0x148)]=function(_0x4c14db,_0x3e5451,_0x50b0da,_0x33be69,_0x2077b9,_0x163454){const _0x5b9086=_0x366669;this[_0x5b9086(0x19c)](!![]);const _0x40f59a=this[_0x5b9086(0x168)](),_0x19393a=this['gaugeRate'](),_0x31b13a=this[_0x5b9086(0x1aa)](),_0x13406e=VisuMZ[_0x5b9086(0x154)][_0x5b9086(0x1bd)](_0x40f59a,_0x50b0da,_0x33be69,_0x2077b9,_0x163454,0x1,!![]);VisuMZ[_0x5b9086(0x154)][_0x5b9086(0x1be)]=this[_0x5b9086(0x13a)]()||0x64,this[_0x5b9086(0x1f7)][_0x5b9086(0x15c)][_0x5b9086(0x191)](_0x13406e,_0x31b13a);const _0x4480a2=VisuMZ[_0x5b9086(0x154)][_0x5b9086(0x1bd)](_0x40f59a,_0x50b0da,_0x33be69,_0x2077b9,_0x163454,_0x19393a,![]),_0x3a2ebe=this['_tpGaugeSprite'][_0x5b9086(0x15c)][_0x5b9086(0x195)][_0x5b9086(0x186)](_0x50b0da,_0x33be69,_0x50b0da+_0x2077b9,_0x33be69);VisuMZ['VisualGaugeStyles']['_maxValueSegment']=this[_0x5b9086(0x13a)]()||0x64,this['_tpGaugeSprite'][_0x5b9086(0x15c)][_0x5b9086(0x178)](_0x4480a2,_0x4c14db,_0x3e5451,_0x3a2ebe);},Window_Base[_0x366669(0x151)][_0x366669(0x1e8)]=function(_0xf99a19,_0x366691,_0x4e0a05,_0x472f70,_0x2fd7d1,_0x1ab028){const _0x21dc4d=_0x366669,_0x289bac=VisuMZ[_0x21dc4d(0x154)][_0x21dc4d(0x1b0)](),_0x4dd2c1=(VisuMZ[_0x21dc4d(0x154)][_0x21dc4d(0x1d8)](_0x289bac)??0xc)[_0x21dc4d(0x1e7)](0x1,0x20),_0x5354b6=_0x366691+this[_0x21dc4d(0x177)]()-_0x4dd2c1-0x2,_0x52af1f=ColorManager[_0x21dc4d(0x1aa)]();VisuMZ[_0x21dc4d(0x154)]['_maxValueSegment']=0x64,this[_0x21dc4d(0x17e)][_0x21dc4d(0x1d9)](_0x289bac,_0xf99a19,_0x5354b6,_0x4e0a05,_0x4dd2c1,_0x472f70,_0x52af1f,_0x2fd7d1,_0x1ab028);},Window_StatusBase[_0x366669(0x151)][_0x366669(0x1b1)]=function(_0xb60597,_0x5ca65f,_0x1ec203){const _0x6b69f9=_0x366669;if(VisuMZ['CoreEngine']['Settings']['Param'][_0x6b69f9(0x1ed)]===![])return;if(this[_0x6b69f9(0x1e6)]())this['drawActorExpGauge'](_0xb60597,_0x5ca65f,_0x1ec203);this[_0x6b69f9(0x1db)]();const _0x3e20ee=VisuMZ[_0x6b69f9(0x154)]['HorzStyle'](),_0x426309=VisuMZ[_0x6b69f9(0x1f6)]['Settings']['Gauge'],_0x19c4d0=_0x426309[_0x6b69f9(0x155)]?ColorManager['expGaugeColor2']():ColorManager[_0x6b69f9(0x1ec)]();this[_0x6b69f9(0x18f)](_0x19c4d0),_0x426309[_0x6b69f9(0x1f0)]===_0x6b69f9(0x1c4)&&(this[_0x6b69f9(0x17e)][_0x6b69f9(0x144)]=$gameSystem[_0x6b69f9(0x157)](),this[_0x6b69f9(0x17e)][_0x6b69f9(0x143)]=$gameSystem[_0x6b69f9(0x16d)]()),VisuMZ[_0x6b69f9(0x154)]['SetLabelOffset'](_0x3e20ee),this[_0x6b69f9(0x1c5)](TextManager[_0x6b69f9(0x1ea)],_0x5ca65f,_0x1ec203,0x30),this[_0x6b69f9(0x1db)](),VisuMZ[_0x6b69f9(0x154)]['SetValueOffset'](_0x3e20ee),this['drawText'](_0xb60597[_0x6b69f9(0x130)],_0x5ca65f+0x54,_0x1ec203,0x24,_0x6b69f9(0x1e5)),this['resetFontSettings'](),VisuMZ['VisualGaugeStyles'][_0x6b69f9(0x1ca)]();};