/*:
 * @target MZ
 * @plugindesc Guard Crush: ignore guard reduction + apply state + animation + popup text. v1.3
 * @author You
 *
 * @help
 * Notetag on skills/items:
 *   <GuardCrush>
 *
 * Setup:
 * - Create state "Guard Crush" with 3 turns in DB.
 * - In that state: Trait -> Seal Skill -> Guard (usually skill ID 2).
 */

(() => {
  "use strict";

  // =========================
  // CONFIG
  // =========================
  const GUARD_CRUSH_STATE_ID = 234; // ton état
  const GUARD_CRUSH_ANIM_ID  = 234;  // 0 = désactivé

  const GUARD_CRUSH_POPUP_TEXT = "GUARD CRUSH";
  const POPUP_FONT_SIZE = 22;
  const POPUP_WIDTH = 240;
  const POPUP_HEIGHT = 48;

  // =========================
  // Helpers
  // =========================
  const hasGuardCrushTag = (action) => {
    const item = action.item?.();
    return !!item?.note && /<\s*GuardCrush\s*>/i.test(item.note);
  };

  // =========================
  // 1) Ignore guard reduction
  // =========================
  const _applyGuard = Game_Action.prototype.applyGuard;
  Game_Action.prototype.applyGuard = function(damage, target) {
    if (hasGuardCrushTag(this) && target?.isGuard?.()) return damage;
    return _applyGuard.call(this, damage, target);
  };

  // =========================
  // 2) Apply state + request animation + set popup flag
  // =========================
  const _apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    const wasGuarding = target?.isGuard?.();
    _apply.call(this, target);

    if (!target || !wasGuarding) return;
    if (!hasGuardCrushTag(this)) return;

    const result = target.result?.();
    if (!result?.isHit?.()) return;

    // Apply state (duration from DB)
    if (GUARD_CRUSH_STATE_ID > 0) {
      target.addState(GUARD_CRUSH_STATE_ID);
    }

    // Animation (more reliable in MZ than target.startAnimation with some battle setups)
    if (GUARD_CRUSH_ANIM_ID > 0 && $gameTemp?.requestAnimation) {
      $gameTemp.requestAnimation([target], GUARD_CRUSH_ANIM_ID, false);
    }

    // Popup flag (DO NOT force startDamagePopup here, to avoid breaking damage SE timing)
    if (result) {
      result.guardCrushPopup = true;
    }
  };

  // =========================
  // 3) Damage popup: add "GUARD CRUSH" text when a damage popup occurs
  // =========================
  const _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
  Sprite_Damage.prototype.setup = function(target) {
    _Sprite_Damage_setup.call(this, target);

    const result = target.result?.();
    if (result?.guardCrushPopup) {
      this._createGuardCrushPopup(GUARD_CRUSH_POPUP_TEXT);
      result.guardCrushPopup = false; // consume
    }
  };

  Sprite_Damage.prototype._createGuardCrushPopup = function(text) {
    const sprite = this.createChildSprite();
    sprite.bitmap = new Bitmap(POPUP_WIDTH, POPUP_HEIGHT);

    const b = sprite.bitmap;
    b.fontSize = POPUP_FONT_SIZE;
    b.outlineWidth = 6;
    b.drawText(text, 0, 0, POPUP_WIDTH, POPUP_HEIGHT, "center");

    sprite.x = -POPUP_WIDTH / 2;
    sprite.y = -POPUP_HEIGHT - 24;
    sprite.dy = -2;
  };

})();
