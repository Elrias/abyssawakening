/*:
 * @plugindesc Skill Ready Spheres (pixel perfect, anchored to TP gauge; compatible StateDisplay)
 * @target MZ
 * @help
 * Affiche des sphères (ready / notReady) sous la jauge TP de chaque acteur.
 * L'ancrage se fait sur la position réelle de la jauge TP (placeGauge),
 * donc stable même si un autre plugin décale/modifie itemRect/itemRectWithPadding.
 */

(() => {
  // --------------------------------------------------------------------------
  // CONFIG
  // --------------------------------------------------------------------------
  const MAX_SKILLS = 4;          // max skills affichés
  const ICON_SPACING = 33;       // espacement entre sphères (dans un même groupe)
  const ICON_Y_FROM_TP = 30;     // distance verticale sous la jauge TP (px)

  // "left"  = commence sous le début de la jauge TP
  // "center"= centre le groupe sous la jauge TP
  const ANCHOR_MODE = "left";    // "left" | "center"

  // micro ajustements globaux (si tu veux peaufiner au pixel)
  const FINE_X = 5;
  const FINE_Y = 0;

  // --------------------------------------------------------------------------
  // INTERNAL: store TP gauge positions by actorId
  // --------------------------------------------------------------------------
  const _tpGaugePosByActorId = new Map();

  // --------------------------------------------------------------------------
  // Capture TP gauge position
  // Many HUDs / MZ uses placeGauge(actor, "tp", x, y)
  // --------------------------------------------------------------------------
  const _Window_StatusBase_placeGauge = Window_StatusBase.prototype.placeGauge;
  Window_StatusBase.prototype.placeGauge = function(actor, type, x, y) {
    if (this instanceof Window_BattleStatus && actor && type === "tp") {
      const gaugeW = (this.gaugeLineWidth && this.gaugeLineWidth()) ? this.gaugeLineWidth() : 128;
      _tpGaugePosByActorId.set(actor.actorId(), { x, y, w: gaugeW });
    }
    return _Window_StatusBase_placeGauge.call(this, actor, type, x, y);
  };

  // --------------------------------------------------------------------------
  // drawItem alias: draw spheres after default slot draw
  // (stable during redrawItem / target selection)
  // --------------------------------------------------------------------------
  const _Window_BattleStatus_drawItem = Window_BattleStatus.prototype.drawItem;
  Window_BattleStatus.prototype.drawItem = function(index) {
    _Window_BattleStatus_drawItem.call(this, index);
    this.drawSkillSpheres(index);
  };

  // --------------------------------------------------------------------------
  // Draw spheres
  // --------------------------------------------------------------------------
  Window_BattleStatus.prototype.drawSkillSpheres = function(index) {
    const actor = this.actor(index);
    if (!actor) return;

    const tp = _tpGaugePosByActorId.get(actor.actorId());
    if (!tp) return; // TP gauge not placed yet

    const skills = actor
      .skills()
      .filter(s => s.stypeId === 1)
      .slice(0, MAX_SKILLS);

    const sample = ImageManager.loadSystem("skillReady");
    const iconW = sample.width;
    const iconH = sample.height;

    const count = skills.length;
    const totalW = count > 0 ? (iconW + (count - 1) * ICON_SPACING) : 0;

    // X anchored to TP gauge
    let startX;
    if (ANCHOR_MODE === "center") {
      startX = Math.round(tp.x + (tp.w - totalW) / 2);
    } else {
      startX = tp.x;
    }
    startX += FINE_X;

    // Y under TP gauge
    const y = tp.y + ICON_Y_FROM_TP + FINE_Y;

    // Clear band where spheres are drawn (slightly wider than gauge)
    this.contents.clearRect(tp.x - 6, y, tp.w + 12, iconH);

    // Draw each sphere
    for (let i = 0; i < count; i++) {
      const skill = skills[i];
      const ready = actor.canUse(skill);
      const bmp = ImageManager.loadSystem(ready ? "skillReady" : "skillNotReady");
      this.contents.blt(bmp, 0, 0, iconW, iconH, startX + i * ICON_SPACING, y);
    }
  };

  // --------------------------------------------------------------------------
  // Refresh helpers (always use redrawItem to keep things consistent)
  // --------------------------------------------------------------------------
  Window_BattleStatus.prototype.refreshSkillIcons = function(index) {
    this.redrawItem(index);
  };

  Window_BattleStatus.prototype.refreshSkills = function() {
    for (let i = 0; i < this.maxItems(); i++) this.redrawItem(i);
  };

  // --------------------------------------------------------------------------
  // Hooks to trigger refresh (optional but useful)
  // --------------------------------------------------------------------------
  const _BattleManager_startTurn = BattleManager.startTurn;
  BattleManager.startTurn = function() {
    _BattleManager_startTurn.call(this);
    const w = SceneManager._scene?._statusWindow;
    if (w) w.refreshSkills();
  };

  const _BattleManager_endAction = BattleManager.endAction;
  BattleManager.endAction = function() {
    _BattleManager_endAction.call(this);
    const w = SceneManager._scene?._statusWindow;
    if (w) w.refreshSkills();
  };

  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.call(this, target);
    if (this.isSkill() && this.item().stypeId === 1) {
      const w = SceneManager._scene?._statusWindow;
      if (w) w.refreshSkillIcons(this.subject().index());
    }
  };

  // If a cooldown plugin adds updateCooldowns, refresh periodically
  const _Game_Battler_updateCooldowns = Game_Battler.prototype.updateCooldowns;
  if (_Game_Battler_updateCooldowns) {
    Game_Battler.prototype.updateCooldowns = function() {
      _Game_Battler_updateCooldowns.call(this);
      const w = SceneManager._scene?._statusWindow;
      if (w) w.refreshSkills();
    };
  }
})();
