/*:
 * @target MZ
 * @plugindesc Reflect a portion of received HP damage back to the attacker via a state notetag <ReflectRate: X> (e.g., 0.10 or 10%). 
 * @author You
 * @help
 * Put <ReflectRate: 0.10> or <ReflectRate: 10%> in a State's note.
 * When a battler with that State takes HP damage, the attacker takes back X of that damage.
 * - Triggers only on positive HP damage (not healing, not 0 damage).
 * - Won't loop, since it directly applies HP loss (no new action).
 * - Sums rates if multiple states have ReflectRate (cap behavior not enforced; adjust if desired).
 */

(() => {
  const RATE_REGEX = /<\s*ReflectRate\s*:\s*([0-9.]+)\s*%?\s*>/i;

  function reflectRateFromState(state) {
    // Try metadata first
    let rate = 0;
    if (state && state.meta && state.meta.ReflectRate != null) {
      let v = String(state.meta.ReflectRate).trim();
      if (v.endsWith("%")) v = v.slice(0, -1);
      rate = parseFloat(v);
      if (isNaN(rate)) rate = 0;
      if (rate > 1) rate = rate / 100;
      return rate;
    }
    // Fallback: parse note
    const m = RATE_REGEX.exec(state?.note || "");
    if (!m) return 0;
    let v = parseFloat(m[1]);
    if (isNaN(v)) return 0;
    // If author wrote <ReflectRate: 10> (no %), treat 10 as 10%? We'll assume decimal unless >=1
    if (v > 1) v = v / 100;
    return v;
  }

  function totalReflectRate(target) {
    return target.states().reduce((sum, st) => sum + reflectRateFromState(st), 0);
  }

  const _Game_Action_apply = Game_Action.prototype.apply;
  Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.call(this, target);

    const result = target.result?.();
    const subject = this.subject?.();

    if (!result || !subject) return;

    // Only reflect on positive HP damage after all calcs (guard, resist, etc.)
    const hpDmg = result.hpDamage || 0;
    if (hpDmg <= 0) return;
    if (!subject.isAlive()) return;

    const rate = Math.max(0, totalReflectRate(target));
    if (rate <= 0) return;

    const reflect = Math.floor(hpDmg * rate);
    if (reflect <= 0) return;

    // Apply damage directly; this does not create another action (no infinite loops)
    subject.gainHp(-reflect);
    subject.startDamagePopup?.();
    if (subject.isDead?.() && subject.performCollapse) subject.performCollapse();
  };
})();
