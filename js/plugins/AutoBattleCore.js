/*:
 * @target MZ
 * @plugindesc Auto Battle Core V1 (Diagnostic STB)
 * @author ChatGPT
 */

(() => {

    BattleManager._autoBattleMode = false;
    const AUTO_GUARD_ENABLED = true;

    BattleManager.isAutoBattleMode = function() {
        return this._autoBattleMode;
    };

    BattleManager.setAutoBattleMode = function(state) {
        this._autoBattleMode = state;
        console.log("AUTO MODE =", state);
    };

    //=========================================================================
    // Party Command
    //=========================================================================

    const _Window_PartyCommand_makeCommandList =
        Window_PartyCommand.prototype.makeCommandList;

    Window_PartyCommand.prototype.makeCommandList = function() {
        _Window_PartyCommand_makeCommandList.call(this);

        const escapeIndex =
            this._list.findIndex(cmd => cmd.symbol === "escape");

        if (escapeIndex >= 0) {
            this._list.splice(escapeIndex, 0, {
                name: "Auto",
                symbol: "auto",
                enabled: true,
                ext: null
            });
        }
    };

    const _Scene_Battle_createPartyCommandWindow =
        Scene_Battle.prototype.createPartyCommandWindow;

    Scene_Battle.prototype.createPartyCommandWindow = function() {
        _Scene_Battle_createPartyCommandWindow.call(this);

        this._partyCommandWindow.setHandler(
            "auto",
            this.commandAuto.bind(this)
        );
    };

    Scene_Battle.prototype.commandAuto = function() {

        BattleManager.setAutoBattleMode(true);

        this.endCommandSelection();
    };

    //=========================================================================
    // Actor Command Selection Hook
    //=========================================================================

    const _Scene_Battle_startActorCommandSelection =
        Scene_Battle.prototype.startActorCommandSelection;

    Scene_Battle.prototype.startActorCommandSelection = function() {

        _Scene_Battle_startActorCommandSelection.call(this);

        if (!BattleManager.isAutoBattleMode()) {
            return;
        }

        const actor = BattleManager.actor();

        if (!actor) {
            return;
        }

        const skillTypeCmd =
            this._actorCommandWindow._list.find(
                cmd => cmd.symbol === "skill" && cmd.ext === 1
            );

        if (skillTypeCmd) {


            const cmdIndex =
                this._actorCommandWindow._list.indexOf(skillTypeCmd);

            this._actorCommandWindow.select(cmdIndex);

            this._actorCommandWindow.processOk();

            setTimeout(() => {

                console.log(
                    actor.skills()
                        .filter(s => s.stypeId === 1)
                        .map(s => ({
                            id: s.id,
                            name: s.name,
                            canUse: actor.canUse(s)
                        }))
                );

                const targetSkill = actor.skills()
                    .filter(s => s.stypeId === 1)
                    .filter(s => actor.canUse(s))
                    .sort((a, b) => a.id - b.id)[0];

                const targetSkillId = targetSkill?.id;

                if (!targetSkillId) {

                    const exCmd =
                        this._actorCommandWindow._list.find(cmd =>
                            cmd.symbol === "skill" &&
                            cmd.ext === 2
                        );

                    console.log("EX CMD", exCmd);

                    if (exCmd && actor.tp >= 100) {

                        const exIndex =
                            this._actorCommandWindow._list.indexOf(exCmd);

                        console.log(
                            "OPEN EX",
                            exIndex
                        );

                        this._actorCommandWindow.select(exIndex);
                        this._actorCommandWindow.processOk();
                        
                        setTimeout(() => {

                            const exSkillIndex =
                                this._skillWindow._data.findIndex(
                                    s => s && actor.canUse(s)
                                );

                            console.log(
                                "EX SKILL INDEX",
                                exSkillIndex
                            );

                            if (exSkillIndex >= 0) {

                                this._skillWindow.select(exSkillIndex);

                                console.log(
                                    "AUTO EX",
                                    this._skillWindow.item()?.name
                                );

                                this._skillWindow.processOk();

                                setTimeout(() => {

                                    console.log(
                                        "EX ENEMY WINDOW",
                                        this._enemyWindow?.active
                                    );

                                    if (this._actorWindow?.active) {

                                        console.log("AUTO ACTOR TARGET");

                                        this._actorWindow.select(0);

                                        this.onActorOk();
                                    }

                                    if (this._enemyWindow?.active) {

                                        console.log("AUTO EX TARGET");

                                        this._enemyWindow.select(0);

                                        this.onEnemyOk();
                                    }

                                }, 100);
                            }

                        }, 100);

                        return;
                    }

                    console.log(
                        "NO USABLE TYPE1",
                        actor.name()
                    );

                    console.log(
                        "COMMAND LIST",
                        this._actorCommandWindow._list
                    );

                    const singleSkillCmd =
                        this._actorCommandWindow._list.find(cmd => {

                            if (cmd.symbol !== "singleSkill") {
                                return false;
                            }

                            const skill = $dataSkills[cmd.ext];

                            return actor.canUse(skill)
                                && actor.tp >= 100;
                        });

                    if (singleSkillCmd) {

                        console.log(
                            "FOUND TYPE2",
                            singleSkillCmd.ext
                        );

                        const index =
                            this._actorCommandWindow._list.indexOf(
                                singleSkillCmd
                            );

                        console.log(
                            "TYPE2 INDEX",
                            index
                        );

                        this._actorCommandWindow.select(index);

                        this._actorCommandWindow.processOk();
                        setTimeout(() => {

                            console.log(
                                "SINGLE ENEMY WINDOW",
                                this._enemyWindow?.active
                            );

                            console.log(
                                "SINGLE ACTOR WINDOW",
                                this._actorWindow?.active
                            );

                            console.log(
                                "CURRENT ACTION",
                                BattleManager.actor()?.currentAction()
                            );

                            if (this._actorWindow?.active) {

                                console.log("AUTO ACTOR TARGET");

                                this._actorWindow.select(0);

                                this.onActorOk();
                            }

                            if (this._enemyWindow?.active) {

                            this._enemyWindow.select(0);

                            this.onEnemyOk();
                        }

                        }, 100);
                        
                        return;

                    } else {

                        const shouldGuard =
                            AUTO_GUARD_ENABLED &&
                            $gameTroop.aliveMembers().some(enemy =>
                                enemy.isStateAffected(101) ||
                                enemy.tp >= enemy.maxTp()
                            );

                        if (shouldGuard) {

                            console.log(
                                "AUTO GUARD",
                                actor.name()
                            );

                            this.commandGuard();

                            return;

                        } else {

                            console.log(
                                "AUTO ATTACK",
                                actor.name()
                            );

                            this.commandAttack();

                            setTimeout(() => {

                                if (this._enemyWindow?.maxItems() > 0) {

                                    this._enemyWindow.select(0);

                                    this.onEnemyOk();
                                }

                            }, 100);

                            return;
                        }
                    }
                }

                const skillIndex =
                    this._skillWindow._data.findIndex(
                        s => s && s.id === targetSkillId
                    );

                if (skillIndex >= 0) {

                    this._skillWindow.select(skillIndex);

                    console.log(
                        "AUTO SELECT",
                        this._skillWindow.item()?.name
                    );
                    
                    this._skillWindow.processOk();

                    setTimeout(() => {

                        console.log(
                            "ENEMY WINDOW",
                            this._enemyWindow?.active
                        );

                        if (this._actorWindow?.active) {

                            console.log("AUTO ACTOR TARGET");

                            this._actorWindow.select(0);

                            this.onActorOk();
                        }
                        
                        if (this._enemyWindow?.active) {

                            console.log("AUTO TARGET");

                            this._enemyWindow.select(0);

                            this.onEnemyOk();
                        }

                        console.log(
                            "MAX ENEMIES",
                            this._enemyWindow?.maxItems()
                        );

                    }, 100);
                }

            }, 100);
        }

  /*      const singleSkillCmd =
            this._actorCommandWindow._list.find(cmd => {

                if (cmd.symbol !== "singleSkill") {
                    return false;
                }

                const skill = $dataSkills[cmd.ext];

                return actor.canUse(skill) && actor.tp >= 100;

            });

        if (singleSkillCmd) {

            console.log(
                "FOUND SINGLE SKILL",
                singleSkillCmd.ext
            );
            
            const skill = $dataSkills[singleSkillCmd.ext];

            console.log(
                "CAN USE",
                skill.id,
                actor.canUse(skill)
            );

        } else {

            console.log("AUTO ATTACK");

            this.commandAttack();

            if (this._enemyWindow && this._enemyWindow.maxItems() > 0) {
                this._enemyWindow.select(0);
                this.onEnemyOk();
            }
        }

        if (singleSkillCmd) {

            this._actorCommandWindow.select(
                this._actorCommandWindow._list.indexOf(singleSkillCmd)
            );

            console.log(
                "SELECTED COMMAND",
                this._actorCommandWindow.index()
            );

            this._actorCommandWindow.processOk();
        }*/
    };

    //=========================================================================
    // Cancel = Disable Auto
    //=========================================================================

    const _Scene_Battle_update =
        Scene_Battle.prototype.update;

    Scene_Battle.prototype.update = function() {

        _Scene_Battle_update.call(this);

        if (!BattleManager.isAutoBattleMode()) {
            return;
        }

        if (Input.isTriggered("cancel")) {

            BattleManager.setAutoBattleMode(false);

            console.log("AUTO OFF");
        }
    };

})();