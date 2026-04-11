/*:
 * @target MZ
 * @plugindesc Adds a self-damage reflection effect via <SelfReflectRate:x%> notetag on states. Only active if user's HP > 25%.
 * @author ChatGPT
 *
 * @help
 * ===========================================================================
 *  SelfReflectRate.js
 * ---------------------------------------------------------------------------
 *  Notetag supported:
 *
 *     <SelfReflectRate: x%>
 *         → The battler takes x% of the damage they inflict,
 *           but ONLY if their HP is above 25% of max HP.
 *
 *  • Multiple states stack.
 *  • Only triggers when the action deals positive HP damage.
 *  • Does NOT interfere with standard reflect, counter, VS Damage Core, etc.
 * ===========================================================================
 */

(function() {

// ==========================================================================
// NOTETAG PARSING
// ==========================================================================
const _SRR_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    if (!_SRR_DataManager_isDatabaseLoaded.call(this)) return false;

    if (!this._SRR_NotetagsLoaded) {
        this.processSelfReflectNotetags($dataStates);
        this._SRR_NotetagsLoaded = true;
    }
    return true;
};

DataManager.processSelfReflectNotetags = function(group) {
    group.forEach(obj => {
        if (!obj || !obj.note) return;
        const match = obj.note.match(/<SelfReflectRate:\s*(\d+)%>/i);
        obj.selfReflectRate = match ? Number(match[1]) / 100 : 0;
    });
};

// ==========================================================================
// DAMAGE DEALT → SELF-REFLECTION
// ==========================================================================

const _SRR_Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
    const value = _SRR_Game_Action_makeDamageValue.call(this, target, critical);

    // Only if the action deals positive HP damage
    if (value > 0) {
        const user = this.subject();
        const hpPercent = user.hp / user.mhp;

        // Condition added → must be above 25%
        if (hpPercent > 0.25) {
            const rate = user.states().reduce((sum, st) => sum + (st.selfReflectRate || 0), 0);

            if (rate > 0) {
                const reflected = Math.floor(value * rate);

                user.gainHp(-reflected);
                user.startDamagePopup();

                if (user.isActor()) {
                    $gameParty.requestMotionRefresh();
                }
            }
        }
    }

    return value;
};

// ==========================================================================
// END OF PLUGIN
// ==========================================================================
})();
