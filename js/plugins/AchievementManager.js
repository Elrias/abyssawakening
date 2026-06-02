/*:
 * @target MZ
 * @plugindesc Achievement Manager (Main + Side + Battle)
 */

(() => {
    const ACHIEVEMENT_API_URL = "https://abyssawakening-backend.onrender.com/achievements/unlock";
    class Window_AchievementPopup extends Window_Base {
        initialize(rect) {
            super.initialize(rect);
            this.opacity = 0;
            this.contentsOpacity = 0;
            this._timer = 0;
            this._queue = [];
            this._isShowing = false;
        }

        showAchievement(text) {
            this._queue.push(text);
        }

        update() {
            super.update();

            if (!this._isShowing && this._queue.length > 0) {
                const text = this._queue.shift();

                this.contents.clear();
                this.drawText(text, 0, 0, this.contents.width, "center");

                this.opacity = 180;
                this.contentsOpacity = 255;

                this._timer = 120;
                this._isShowing = true;
            }

            // animation
            if (this._isShowing) {
                this._timer--;

                if (this._timer < 30) {
                    this.contentsOpacity -= 10;
                    this.opacity -= 10;
                }

                if (this._timer <= 0) {
                    this._isShowing = false;
                    this.opacity = 0;
                    this.contentsOpacity = 0;
                }
            }
        }
    }

    const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        _Scene_Map_createAllWindows.call(this);

        const rect = new Rectangle(0, 0, Graphics.width, 60);
        this._achievementPopup = new Window_AchievementPopup(rect);

        this.addWindow(this._achievementPopup);
    };

    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.call(this);

        const rect = new Rectangle(0, 0, Graphics.width, 60);
        this._achievementPopup = new Window_AchievementPopup(rect);

        this.addWindow(this._achievementPopup);
    };

    const AchievementManager = {

    // =========================
    // ACHIEVEMENTS
    // =========================
    achievements: {

        // ===== MAIN STORY =====
        DEFEAT_GREAT_RAGEWOLF: { type: "main", title: "Big Bad Wolf", description: "Defeat Great Ragewolf", trigger: "boss_kill", target: 7, score: 10 },
        DEFEAT_SCORVYRM: { type: "main", title: "Sting Operation", description: "Defeat Scorvyrm", trigger: "boss_kill", target: 55, score: 15 },
        DEFEAT_BLAZEWING: { type: "main", title: "Fried Chicken", description: "Defeat Blazewing bird", trigger: "boss_kill", target: 56, score: 20 },
        DEFEAT_NOCTYR: { type: "main", title: "Bat to the bone", description: "Defeat Noctyr", trigger: "boss_kill", target: 57, score: 25 },
        DEFEAT_HOLLOW_SENTINEL: { type: "main", title: "Sleepy Hollow", description: "Defeat Hollow Sentinel", trigger: "boss_kill", target: 58, score: 30 },
        DEFEAT_AUTOMATED_SENTRY: { type: "main", title: "Manual Override", description: "Defeat Automated Sentry", trigger: "boss_kill", target: 76, score: 40 },
        DEFEAT_CORRUPTED_ALRIC: { type: "main", title: "Rest in peace", description: "Defeat Corrupted Alric", trigger: "boss_kill", target: 59, score: 50 },

        // ===== SIDE QUESTS =====
        DEFEAT_GIANT_SNAKE: { type: "side", title: "Snake Charmer", description: "Defeat Giant Snake", trigger: "boss_kill", target: 32, score: 10 },
        DEFEAT_ORECLAD: { type: "side", title: "Shell Shocked", description: "Defeat Oreclad Gastropod", trigger: "boss_kill", target: 33, score: 10 },
        DEFEAT_THUNDERWING: { type: "side", title: "Thunderstruck", description: "Defeat Thunderwing Drake", trigger: "boss_kill", target: 34, score: 15 },
        DEFEAT_HYDROCARNUM: { type: "side", title: "Jaws", description: "Defeat Hydrocarnum", trigger: "boss_kill", target: 37, score: 15 },
        DEFEAT_GLACIAL_SERPENT: { type: "side", title: "Cold-Blooded", description: "Defeat Glacial Serpent", trigger: "boss_kill", target: 38, score: 15 },
        DEFEAT_LEVIATHAN: { type: "side", title: "Seasick", description: "Defeat Leviathan", trigger: "boss_kill", target: 39, score: 20 },
        DEFEAT_CRIMSON_DRAGON: { type: "side", title: "Playing with fire", description: "Defeat Crimson Dragon", trigger: "boss_kill", target: 42, score: 20 },
        DEFEAT_IFRIT: { type: "side", title: "Ashes to ashes", description: "Defeat Ifrit", trigger: "boss_kill", target: 43, score: 20 },
        DEFEAT_EMBERHEART: { type: "side", title: "The last ember", description: "Defeat Emberheart Dragon", trigger: "boss_kill", target: 44, score: 25 },
        DEFEAT_ADAM: { type: "side", title: "Odd Fellow", description: "Defeat Adam", trigger: "boss_kill", target: 86, score: 50 },
        DEFEAT_ADAMHL: { type: "side", title: "Peak", description: "Defeat Adam (Hard)", trigger: "boss_kill", target: 87, score: 100 },


        // ===== BATTLE =====
        KILL_100: { type: "battle", title: "Bloodbath", description: "Defeat 100 enemies", trigger: "enemy_kill_count", target: 100, score: 15 },
        KILL_500: { type: "battle", title: "Massacre", description: "Defeat 500 enemies", trigger: "enemy_kill_count", target: 500, score: 25 },
        KILL_1000: { type: "battle", title: "Extinction", description: "Defeat 1000 enemies", trigger: "enemy_kill_count", target: 1000, score: 35 },

        // ===== CHARACTER =====
        HIRO_50: { type: "character", title: "Ambitious", description: "Raise Hiro to lvl 50", trigger: "actor_level", target: { actorId: 1, level: 50 }, score: 15 },
        DAN_50: { type: "character", title: "Oathkeeper", description: "Raise Dan to lvl 50", trigger: "actor_level", target: { actorId: 2, level: 50 }, score: 15 },
        ERIKA_50: { type: "character", title: "Unbound Spirit", description: "Raise Erika to lvl 50", trigger: "actor_level", target: { actorId: 3, level: 50 }, score: 15 },
        JASMINE_50: { type: "character", title: "Virtuoso", description: "Raise Jasmine to lvl 50", trigger: "actor_level", target: { actorId: 4, level: 50 }, score: 15 },
        LESLIE_50: { type: "character", title: "Creeping Terror", description: "Raise Leslie to lvl 50", trigger: "actor_level", target: { actorId: 14, level: 50 }, score: 15 },
        REYAN_50: { type: "character", title: "Swiftness", description: "Raise Reyan to lvl 50", trigger: "actor_level", target: { actorId: 13, level: 50 }, score: 15 },
        EMI_50: { type: "character", title: "Everything Nice", description: "Raise Emi to lvl 50", trigger: "actor_level", target: { actorId: 12, level: 50 }, score: 15 },
        KAI_50: { type: "character", title: "Supersonic Speed", description: "Raise Kai to lvl 50", trigger: "actor_level", target: { actorId: 17, level: 50 }, score: 15 },
        VALERYA_50: { type: "character", title: "Reckless Fighter", description: "Raise Valerya to lvl 50", trigger: "actor_level", target: { actorId: 18, level: 50 }, score: 15 },
        LEO_50: { type: "character", title: "Divine Protector", description: "Raise Leo to lvl 50", trigger: "actor_level", target: { actorId: 7, level: 50 }, score: 15 },
        GALAD_50: { type: "character", title: "Souleater", description: "Raise Galad to lvl 50", trigger: "actor_level", target: { actorId: 6, level: 50 }, score: 15 },
        VALENTINE_50: { type: "character", title: "Shining Star", description: "Raise Valentine to lvl 50", trigger: "actor_level", target: { actorId: 21, level: 50 }, score: 15 },
        SHELON_50: { type: "character", title: "Guinea Pig", description: "Raise Shelon to lvl 50", trigger: "actor_level", target: { actorId: 10, level: 50 }, score: 15 },
        THYME_50: { type: "character", title: "Mischievous Nature", description: "Raise Thyme to lvl 50", trigger: "actor_level", target: { actorId: 9, level: 50 }, score: 15 },
        CLAW_50: { type: "character", title: "Silent Shadow", description: "Raise Claw to lvl 50", trigger: "actor_level", target: { actorId: 19, level: 50 }, score: 15 },

        // ===== GOLD =====
        GOLD_20000: { type: "gold", title: "Heavy Purse", description: "Have over 20,000G", trigger: "gold_amount", target: 20000, score: 20 },
        GOLD_100000: { type: "gold", title: "Filthy Rich", description: "Have over 100,000G", trigger: "gold_amount", target: 100000, score: 40 },
        GOLD_500000: { type: "gold", title: "My name is Jeff", description: "Have over 500,000G", trigger: "gold_amount", target: 500000, score: 60 },

        // ===== PLAYTIME =====
        PLAYTIME_600: { type: "playtime", title: "Hooked", description: "Play for a total of 600 minutes", trigger: "playtime", target: 600 * 60, score: 20 },
        PLAYTIME_3000: { type: "playtime", title: "In too deep", description: "Play for a total of 1200 minutes", trigger: "playtime", target: 1200 * 60, score: 40 },
        PLAYTIME_6000: { type: "playtime", title: "No way out", description: "Play for a total of 3000 minutes", trigger: "playtime", target: 3000 * 60, score: 60 },

        // ===== SPEEDRUN =====
        SPEED_THUNDERWING: { type: "speedrun", title: "Lightning fast", description: "Defeat Thunderwing Drake in under 120 minutes of play time", trigger: "boss_kill_time", target: { enemyId: 34, maxTime: 120 * 60 }, score: 60 },
        SPEED_LEVIATHAN: { type: "speedrun", title: "Swift current", description: "Defeat Leviathan in under 240 minutes of play time", trigger: "boss_kill_time", target: { enemyId: 39, maxTime: 240 * 60 }, score: 80 },
        SPEED_EMBERHEART: { type: "speedrun", title: "Blazing speed", description: "Defeat Emberheart Dragon in under 360 minutes of play time", trigger: "boss_kill_time", target: { enemyId: 44, maxTime: 360 * 60 }, score: 100 },

        // ===== BURST =====
        BURST_THUNDERWING: { type: "burst", title: "Stormbreaker", description: "Defeat Thunderwing Drake in one turn", trigger: "boss_kill_turn", target: { enemyId: 34, maxTurn: 1 }, score: 50 },
        BURST_LEVIATHAN: { type: "burst", title: "Tidebreaker", description: "Defeat Leviathan in one turn", trigger: "boss_kill_turn", target: { enemyId: 39, maxTurn: 1 }, score: 60 },
        BURST_EMBERHEART: { type: "burst", title: "Flamebreaker", description: "Defeat Emberheart Dragon in one turn", trigger: "boss_kill_turn", target: { enemyId: 44, maxTurn: 1 }, score: 70 },

        // ===== BACKUP =====
        BACKUP_50: { type: "backup", title: "Now Hiring", description: "Call for backup 50 times", trigger: "backup_count", target: 50, score: 10 },
        BACKUP_100: { type: "backup", title: "Human Resources", description: "Call for backup 100 times", trigger: "backup_count", target: 100, score: 30 },
        BACKUP_500: { type: "backup", title: "Corporate Empire", description: "Call for backup 500 times", trigger: "backup_count", target: 500, score: 50 },

        // ===== RECRUIT =====
        RECRUIT_1: { type: "recruit", title: "My only friend", description: "Recruit a new party member", trigger: "recruit_count", target: 1, score: 10 },
        RECRUIT_5: { type: "recruit", title: "Strength in numbers", description: "Recruit 5 new party members", trigger: "recruit_count", target: 5, score: 30 },
        RECRUIT_ALL: { type: "recruit", title: "The place to be", description: "Recruit all characters", trigger: "recruit_all", target: 15, score: 50 },

        // ===== WEAPON =====
        WEAPON_EMBER_9: { type: "weapon", title: "Power Spike", description: "Raise an Emberheart weapon to +9", trigger: "weapon_level", target: { weaponIds: [15,21,27,33,39,45,51,57,63,69], level: 9 }, score: 30 },
        WEAPON_EMBER_10: { type: "weapon", title: "Unlimited Power", description: "Raise an Emberheart weapon to +10", trigger: "weapon_level", target: { weaponIds: [15,21,27,33,39,45,51,57,63,69], level: 10 }, score: 50 },

        // ===== MINING =====
        MINING_10: { type: "mining", title: "Pickaxe testing", description: "Mine ore 10 times", trigger: "mining", target: 10, score: 10 },
        MINING_100: { type: "mining", title: "Pacifist", description: "Mine ore 100 times", trigger: "mining", target: 100, score: 20 },
        MINING_200: { type: "mining", title: "IRL Miner", description: "Mine ore 200 times", trigger: "mining", target: 200, score: 30 },

        // ===== CHESTS =====
        CHESTS_10: { type: "chests", title: "Lucky find", description: "Open 10 chests", trigger: "chests", target: 10, score: 10},
        CHESTS_100: { type: "chests", title: "And another one", description: "Open 100 chests", trigger: "chests", target: 100, score: 20},
        CHESTS_200: { type: "chests", title: "Lucksack", description: "Open 200 chests", trigger: "chests", target: 200, score: 30}
    },

        // =========================
        // DATA
        // =========================
        data: {
            enemiesKilled: 0,
            backupCalls: 0,
            chestsOpened: 0,
            oresMined: 0,
            recruitedActors: [],
            pendingSync: []
        },

        unlocked: {},

        isBackupContext: false,

        // =========================
        // INIT
        // =========================
        init() {
            console.log("AchievementManager initialized");
            this.load();
            this.retryPendingSync();
            
            // TEMP FIX recruit all
            const recruitedActors = [...new Set($gameParty._actors)];
            const recruitedCount = recruitedActors.length;

            if (recruitedCount >= 15 && !this.unlocked["RECRUIT_ALL"]) {
                this.unlock("RECRUIT_ALL");
            }
        },

        // =========================
        // BACKEND
        // =========================
        sendAchievementToBackend(id) {
            const token = localStorage.getItem("cloudsave_token")

            if (!token) {
                console.warn("No token, skip sync");
                return;
            }

            fetch(ACHIEVEMENT_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({
                    achievementId: id
                })
            })
            .then(res => {
                if (!res.ok) throw new Error("HTTP " + res.status);
                return res.json();
            })
            .then(() => {
                console.log("Achievement synced:", id);
            })
            .catch(err => {
                console.warn("Sync failed:", id, err);

                // fallback queue
                this.data.pendingSync.push(id);
                this.save();
            });
        },

        retryPendingSync() {
            if (!this.data.pendingSync.length) return;

            const queue = [...this.data.pendingSync];
            this.data.pendingSync = [];

            queue.forEach(id => this.sendAchievementToBackend(id));
        },

        // =========================
        // SAVE / LOAD
        // =========================
        save() {
            localStorage.setItem("ACHIEVEMENTS", JSON.stringify({
                data: this.data,
                unlocked: this.unlocked
            }));
        },

        load() {
            const raw = localStorage.getItem("ACHIEVEMENTS");
            if (!raw) return;

            try {
                const parsed = JSON.parse(raw);

                this.data = parsed.data || {};

                this.data.enemiesKilled = this.data.enemiesKilled || 0;
                this.data.backupCalls = this.data.backupCalls || 0;
                this.data.oresMined = this.data.oresMined || 0;
                this.data.chestsOpened = this.data.chestsOpened || 0;
                this.data.recruitedActors = this.data.recruitedActors || [];
                this.data.pendingSync = this.data.pendingSync || [];

                this.unlocked = parsed.unlocked || {};

            } catch (e) {
                console.error(e);
            }
        },

        syncAllUnlocked() {
            const token = localStorage.getItem("cloudsave_token");
            if (!token) return;

            for (const id in this.unlocked) {
                if (this.unlocked[id]) {
                    this.sendAchievementToBackend(id);
                }
            }
        },

        // =========================
        // EVENTS
        // =========================
        onEnemyKilled(enemyId) {
            this.data.enemiesKilled++;

            for (const id in this.achievements) {
                const ach = this.achievements[id];

                // boss
                if (ach.trigger === "boss_kill" && ach.target === enemyId) {
                    this.unlock(id);
                }

                // cumulative
                if (ach.trigger === "enemy_kill_count") {
                    if (this.data.enemiesKilled >= ach.target) {
                        this.unlock(id);
                    }
                }

                // speedrun
                if (ach.trigger === "boss_kill_time") {
                    const playtime = $gameSystem.playtime();

                    if (
                        ach.target.enemyId === enemyId &&
                        playtime <= ach.target.maxTime
                    ) {
                        this.unlock(id);
                    }
                }

                // burst
                if (ach.trigger === "boss_kill_turn") {
                    const turn = $gameTroop.turnCount();

                    if (
                        ach.target.enemyId === enemyId &&
                        turn <= ach.target.maxTurn
                    ) {
                        this.unlock(id);
                    }
                }

            }
            this.save();
        },

        onActorLevelUp(actorId, level) {
            for (const id in this.achievements) {
                const ach = this.achievements[id];

                if (ach.trigger === "actor_level") {
                    if (
                        ach.target.actorId === actorId &&
                        level >= ach.target.level
                    ) {
                        this.unlock(id);
                    }
                }
            }
        },
        
        onGoldChanged(currentGold) {
            for (const id in this.achievements) {
                const ach = this.achievements[id];

                if (ach.trigger === "gold_amount") {
                    if (currentGold >= ach.target) {
                        this.unlock(id);
                    }
                }
            }
        },

        checkPlaytime() {
            const playtime = $gameSystem.playtime();

            for (const id in this.achievements) {
                const ach = this.achievements[id];

                if (ach.trigger === "playtime") {
                    if (playtime >= ach.target) {
                        this.unlock(id);
                    }
                }
            }
        },

        onMining(amount = 1) {
            this.data.oresMined += amount;

            console.log("Ores mined:", this.data.oresMined);

            for (const id in this.achievements) {
                const ach = this.achievements[id];

                if (ach.trigger === "mining") {
                    if (this.data.oresMined >= ach.target) {
                        this.unlock(id);
                    }
                }
            }

            this.save();
        },

        onChestOpen(amount = 1) {
            this.data.chestsOpened += amount;

            console.log("Chests Opened:", this.data.chestsOpened);

            for (const id in this.achievements) {
                const ach = this.achievements[id];

                if (ach.trigger === "chests") {
                    if (this.data.chestsOpened >= ach.target) {
                        this.unlock(id);
                    }
                }
            }

            this.save();
        },

        onBackupCall(amount = 1) {
            this.data.backupCalls += amount;

            console.log("Backup calls:", this.data.backupCalls);

            for (const id in this.achievements) {
                const ach = this.achievements[id];

                if (ach.trigger === "backup_count") {
                    if (this.data.backupCalls >= ach.target) {
                        this.unlock(id);
                    }
                }
            }

            this.save();
        },

        onActorRecruited(actorId) {
            if (!this.data.recruitedActors.includes(actorId)) {
                this.data.recruitedActors.push(actorId);
            }

            const count = this.data.recruitedActors.length;

            console.log("Recruited:", count);

            for (const id in this.achievements) {
                const ach = this.achievements[id];

                // nombre de persos
                if (ach.trigger === "recruit_count") {
                    if (count >= ach.target) {
                        this.unlock(id);
                    }
                }

                // tous les persos
                if (ach.trigger === "recruit_all") {

                    const recruitedActors = [...new Set($gameParty._actors)];
                    const recruitedCount = recruitedActors.length;

                    if (recruitedCount >= ach.target) {
                        this.unlock(id);
                    }
                }
            }

            this.save();
        },

        onWeaponUpgrade(weapon, level) {
            const baseId = weapon.originalId || weapon.baseItemId || weapon.id;

            console.log("Weapon upgrade:", baseId, "Level:", level);

            for (const id in this.achievements) {
                const ach = this.achievements[id];

                if (ach.trigger === "weapon_level") {

                    const match = Array.isArray(ach.target.weaponIds)
                        ? ach.target.weaponIds.includes(baseId)
                        : ach.target.weaponId === baseId;

                    if (match && level >= ach.target.level) {
                        this.unlock(id);
                    }
                }
            }

            this.save();
        },

        // =========================
        // UNLOCK
        // =========================
        unlock(id) {
            if (this.unlocked[id]) return;

            this.unlocked[id] = true;

            const ach = this.achievements[id];

            console.log("Achievement unlocked:", id);

            AudioManager.playSe({
                name: "Chime2",
                volume: 90,
                pitch: 150,
                pan: 0
            });

            // Popup
            const scene = SceneManager._scene;
            if (scene && scene._achievementPopup) {
                scene._achievementPopup.showAchievement("Achievement unlocked: " + ach.title);
            }
            try {
                this.sendAchievementToBackend(id);
            } catch (e) {
                console.warn("Backend sync error:", e);
            }
            this.save();
        },

        // =========================
        // DEBUG
        // =========================
        resetAll() {
            this.unlocked = {};
            this.data = {
                enemiesKilled: 0,
                backupCalls: 0,
                oresMined: 0,
                chestsOpened: 0,
                recruitedActors: [],
                pendingSync: []
            };

            this.save();
            console.log("Achievements reset");
        }
    };

    window.AchievementManager = AchievementManager;


    // =========================
    // HOOK RPG MAKER
    // =========================
    const _Game_Enemy_die = Game_Enemy.prototype.die;
    Game_Enemy.prototype.die = function () {
        _Game_Enemy_die.call(this);
        console.log("Enemy killed:", this.enemy().id);
        AchievementManager.onEnemyKilled(this.enemy().id);
    };

    const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
    Game_Actor.prototype.levelUp = function() {
        _Game_Actor_levelUp.call(this);

        console.log("Level up:", this.actorId(), "lvl", this.level);

        AchievementManager.onActorLevelUp(this.actorId(), this.level);
    };

    const _Game_Party_gainGold = Game_Party.prototype.gainGold;
    Game_Party.prototype.gainGold = function(amount) {
        _Game_Party_gainGold.call(this, amount);

        AchievementManager.onGoldChanged(this.gold());
    };

    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        _Scene_Map_update.call(this);

        AchievementManager.checkPlaytime();

        this._syncTimer = (this._syncTimer || 0) + 1;

        if (this._syncTimer >= 300) {
            this._syncTimer = 0;
            AchievementManager.retryPendingSync();
        }
    };

    const _Game_Party_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function(actorId) {
        const alreadyHad = this._actors.includes(actorId);

        _Game_Party_addActor.call(this, actorId);

        if (!alreadyHad && AchievementManager.isBackupContext) {
            AchievementManager.onActorRecruited(actorId);
        }
    };

    const _WeaponUpg_attemptOn = WeaponUpg.attemptOn;
    WeaponUpg.attemptOn = function(weapon) {
        const beforeLevel = WeaponUpg.currentLevelOf(weapon);

        const result = _WeaponUpg_attemptOn.call(this, weapon);

        if (result && result.success) {
            const afterLevel = WeaponUpg.currentLevelOf(weapon);

            AchievementManager.onWeaponUpgrade(weapon, afterLevel);
        }

        return result;
    };

    // =========================
    // BOOT
    // =========================
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        _Scene_Boot_start.call(this);
        AchievementManager.init();
    };

})();