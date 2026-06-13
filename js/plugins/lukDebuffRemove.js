/*:
 * @target MZ
 * @plugindesc Désactive l'influence de la LUK sur les états et debuffs.
 * @author Elrias
 */

Game_Action.prototype.lukEffectRate = function(target) {
    return 1.0;
};