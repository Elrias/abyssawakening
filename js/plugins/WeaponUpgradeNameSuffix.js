/*:
 * @target MZ
 * @plugindesc Show weapon upgrade level in the name (e.g. "Short Sword +3") without mutating database names.
 * @author You
 *
 * @param ShowWhenZero
 * @text Show +0
 * @type boolean
 * @default false
 *
 * @param Pattern
 * @text Name Pattern
 * @type string
 * @default {name} +{level}
 * @desc Tokens: {name}, {level}. Only applied to weapons. Honors ShowWhenZero.
 */
(() => {
  "use strict";

  const FALLBACK = "WeaponUpgradeNameSuffix";
  const scripts = document.getElementsByTagName("script");
  const _src = (document.currentScript && document.currentScript.src) || (scripts.length ? scripts[scripts.length-1].src : "");
  const _m = _src.match(/([^\/]+)\.js$/);
  const PNAME = _m ? _m[1] : FALLBACK;
  const PP = PluginManager.parameters(PNAME);

  const SHOW_ZERO = String(PP["ShowWhenZero"] || "false").toLowerCase() === "true";
  const PATTERN   = String(PP["Pattern"] || "{name} +{level}");

  function levelOf(weapon) {
    try {
      if (window.WeaponUpg && typeof WeaponUpg.currentLevelOf === "function") {
        return WeaponUpg.currentLevelOf(weapon) || 0;
      }
    } catch (_) {}
    return 0;
  }

  function formatName(weapon) {
    const base   = weapon?.name ?? "";
    const level  = levelOf(weapon);
    if (level === 0 && !SHOW_ZERO) return base;
    return PATTERN.replace(/\{name\}/gi, base).replace(/\{level\}/gi, String(level));
  }

  // Keep original for non-weapons and general behavior
  const _drawItemName = Window_Base.prototype.drawItemName;
  Window_Base.prototype.drawItemName = function(item, x, y, width) {
    width = width || 312;
    if (!item || !DataManager.isWeapon(item)) {
      // Not a weapon → default behavior
      return _drawItemName.call(this, item, x, y, width);
    }
    // Weapon: draw icon + formatted name (with +N)
    const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const textMargin = ImageManager.iconWidth + 4;
    const itemWidth = Math.max(0, width - textMargin);
    this.resetTextColor();
    this.drawIcon(item.iconIndex || 0, x, iconY);
    this.drawText(formatName(item), x + textMargin, y, itemWidth);
  };

})();
