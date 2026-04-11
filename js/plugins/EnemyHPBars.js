/*:
 * @plugindesc Displays HP bar for every enemy on top on the screen.
 * @target MZ
 * @help EnemyHPBars.js
 * 
 * Displays HP bar for enemies on top of the screen.
 */

(() => {
    // Classe pour la barre de vie
    class Sprite_EnemyHealthBar extends Sprite {
        initialize(enemy, width) {
            super.initialize();
            this._enemy = enemy; // Référence à l'ennemi
            this._hp = enemy.hp; // PV actuels de l'ennemi
            this._previousHP = enemy.hp; // PV précédents pour l'animation
            this._animationDuration = 10; // Durée de l'animation de la barre de vie
            this._width = width; // Largeur de la barre de vie
            this._fadingOut = false; // Indicateur de fondu
            this._fadeDuration = 20; // Durée du fondu
            this.createBitmap(); // Crée le bitmap de la barre de vie
            this.createPortrait(); // Crée le portrait de l'ennemi
            this.createFrame(); // Crée le contour de la barre de vie
            this.createHpPercentageText(); // Crée le texte du pourcentage de PV
            this.createStatusIcons(); // Crée les icônes d'état de l'ennemi
        }

        createBitmap() {
            // Crée un bitmap avec une largeur spécifiée et une hauteur fixe (7 pixels), et remplit le fond avec une couleur foncée
            this.bitmap = new Bitmap(this._width, 7);
            this.bitmap.fillAll('rgb(25, 25, 25)');
            this.drawHealthBar(); // Dessine la barre de vie initiale
        }

        drawHealthBar() {
            // Calcule le pourcentage de PV actuels et précédents par rapport aux PV maximum de l'ennemi
            const rate = this._enemy.hp / this._enemy.mhp;
            const previousRate = this._previousHP / this._enemy.mhp;
            this.bitmap.clear(); // Efface le bitmap existant pour redessiner
            this.bitmap.fillAll('rgb(25, 25, 25)'); // Remplit le fond avec une couleur foncée
            // Effet lumineux barre vide
            this.bitmap.fillRect(0, 5, this._width, 1, "rgba(255, 255, 255, 0.1"); 
            this.bitmap.fillRect(0, 6, this._width, 1, "rgba(255, 255, 255, 0.3");

            // Dessine la partie blanche (PV à diminuer) et la partie rouge (PV actuels)
            this.bitmap.fillRect(0, 0, this.width * previousRate, 7, 'white');
            this.bitmap.fillRect(0, 0, this._width * rate, 7, 'red');
            // Effet lumineux barre pleine
            this.bitmap.fillRect(0, 0, this._width * rate, 3, "rgba(255, 255, 255, 0.3"); 
            this.bitmap.fillRect(0, 1, this._width * rate, 1, "rgba(255, 255, 255, 0.6");

            // Mettre à jour le texte des PV
            this.updateHpPercentageText();
        }

        createPortrait() {
            // Crée et positionne le portrait de l'ennemi
            const portrait = new Sprite();
            portrait.bitmap = ImageManager.loadBitmap('img/enemies/HBportraits/', this._enemy.enemy().battlerName); // Assurez-vous que les portraits des ennemis sont dans le dossier img/enemies/
            portrait.x = -52; // Positionnement à gauche de la barre de vie
            portrait.y = -15; // Ajustez selon vos besoins
            portrait.scale.x = 0.5; // Redimensionnement si nécessaire
            portrait.scale.y = 0.5; // Redimensionnement si nécessaire
            this.addChild(portrait);
        }

        createFrame() {
            // Crée et positionne le contour de la barre de vie
            const frame = new Sprite();
            if(this._width === 400) {
                frame.bitmap = ImageManager.loadBitmap('img/system/', 'HealthBarFrame400'); // Frame pour un seul ennemi
            } else {
                frame.bitmap = ImageManager.loadBitmap('img/system/', 'HealthBarFrame200'); // Frame pour plusieurs ennemis
            }
            frame.x = -3; // Ajustez selon vos besoins
            frame.y = -2; // Ajustez selon vos besoins
            this.addChild(frame);
        }

        createHpPercentageText() {
            // Crée et positionne le texte du pourcentage de PV
            this._hpPercentageText = new Sprite(new Bitmap(this._width, 20));
            this._hpPercentageText.bitmap.fontSize = 12;
            this._hpPercentageText.y = -16; // Positionnement au-dessus de la barre de vie
            this.addChild(this._hpPercentageText);
            this.updateHpPercentageText();
        }

        updateHpPercentageText() {
            // Met à jour le texte du pourcentage de PV
            if (this._hpPercentageText && this._hpPercentageText.bitmap) {
                const hpPercentage = Math.ceil((this._enemy.hp / this._enemy.mhp) * 100);
                this._hpPercentageText.bitmap.clear();
                this._hpPercentageText.bitmap.drawText(`${hpPercentage}%`, 0, 0, this._width, 20, 'left');
            }
        }

        createStatusIcons() {
            // Crée et positionne les icônes d'état de l'ennemi
            this._statusIconsContainer = new Sprite();
            this._statusIconsContainer.x = 35; // Ajustez selon vos besoins
            this._statusIconsContainer.y = -22; // Ajustez selon vos besoins
            this.addChild(this._statusIconsContainer);
            this.updateStatusIcons(); // Met à jour les icônes d'état
        }

        updateStatusIcons() {
            if (!this._statusIconsContainer) return;
            this._statusIconsContainer.removeChildren(); // Efface les icônes existantes

            // Obtenez les états de l'ennemi
            const icons = [];
            const buffs = this._enemy.buffIcons()
            buffs.forEach((buff) => {
                if(buff != 0) icons.push(buff);
            })
            const states = this._enemy.states();
            states.forEach((state) => {
                if(state.iconIndex != 0) icons.push(state.iconIndex);
            })


            icons.forEach((iconId, index) => {
                const icon = new Sprite();
                icon.bitmap = ImageManager.loadSystem('IconSet');
                const iconIndex = iconId;
                const iconWidth = 32;
                const iconHeight = 32;
                const sx = (iconIndex % 16) * iconWidth;
                const sy = Math.floor(iconIndex / 16) * iconHeight;
                icon.setFrame(sx, sy, iconWidth, iconHeight);
                icon.scale.x = icon.scale.y = 1;
                icon.x = index * (iconWidth * 1 + 1); // Espacement entre les icônes
                icon.y = -15; // Ajustez selon vos besoins
                this._statusIconsContainer.addChild(icon);
            });
        }

        update() {
            super.update();

            if (this._enemy.isHidden()) {
                this.visible = false; // Cacher la barre de vie si l'ennemi est caché
                return;
            } else {
                this.visible = true; // Afficher la barre de vie si l'ennemi est visible
            }

            if (this._fadingOut) {
                this.opacity -= 255 / this._fadeDuration;
                if(this.opacity <= 0) {
                    this.parent.removeChild(this);
                }
            } else {
                // Met à jour les PV affichés si les PV de l'ennemi ont changé
                if (this._hp !== this._enemy.hp) {
                    this._hp = this._enemy.hp;
                    this.drawHealthBar();
                }

                // Anime la diminution de la barre de vie
                if(this._hp !== this._previousHP) {
                    if (this._previousHP > this._hp) {
                        if((this._previousHP - this._hp) < 1) this._previousHP = this._hp; // Évite des petites fractions de PV résiduels
                        this._previousHP -= (this._previousHP - this._hp) / this._animationDuration; // Diminue progressivement les PV affichés
                    }
                    else {
                        this._previousHP = this._hp; // Si les PV augmentent, met à jour immédiatement
                    }
                    this.drawHealthBar();
                }

                if(this._previousHP <= 0 && !this._fadingOut) {
                    this._fadingOut = true;
                }

                // Met à jour les icônes d'état
                this.updateStatusIcons();
            }
        }
    }

    // Ajout des barres de vie dans la scène de combat
    const _Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
    Spriteset_Battle.prototype.createEnemies = function() {
        _Spriteset_Battle_createEnemies.call(this);
        this.createEnemyHealthBars(); // Crée les barres de vie des ennemis
    };

    const _Game_Enemy_appear = Game_Enemy.prototype.appear;
    Game_Enemy.prototype.appear = function() {
        _Game_Enemy_appear.call(this);
        if (SceneManager._scene._spriteset) {
            SceneManager._scene._spriteset.updateEnemyHealthBars(); // Met à jour les barres de vie lorsque les ennemis apparaissent
        }
    };

    Spriteset_Battle.prototype.createEnemyHealthBars = function() {
        this._enemyHealthBars = [];
        const visibleEnemies = this._enemySprites.filter(enemySprite =>
            enemySprite._battler.isAlive() && !enemySprite._battler.isHidden()
        );
        const numEnemies = visibleEnemies.length;
        const barWidth = numEnemies === 1 ? 400 : 200; // Barre de vie plus grande s'il n'y a qu'un ennemi
        const totalWidth = numEnemies * barWidth + (numEnemies - 1) * 40; // 40 pixels d'espace entre les barres
        const startX = (Graphics.width - totalWidth) / 2; // Centrage des barres de vie

        visibleEnemies.forEach((enemySprite, index) => {
            const healthBar = new Sprite_EnemyHealthBar(enemySprite._battler, barWidth);
            healthBar.x = startX + index * (barWidth + 65);
            healthBar.y = 55; // Position Y fixe pour toutes les barres
            this._enemyHealthBars.push(healthBar);
            this.addChild(healthBar);

            // Enregistrer la position X de la barre de vie
            enemySprite.healthBarX = healthBar.x;
            enemySprite.healthBarY = healthBar.y;
        });
    };

    Spriteset_Battle.prototype.updateEnemyHealthBars = function() {
        this._enemyHealthBars.forEach(bar => this.removeChild(bar)); // Retirer les barres de vie existantes
        this.createEnemyHealthBars(); // Créer de nouvelles barres de vie pour les ennemis visibles
    };

    const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update.call(this);

        const aliveCount = this._enemySprites.filter(sprite =>
            sprite._battler && sprite._battler.isAlive()
        ).length;

        if (this._lastAliveCount !== aliveCount) {
            this._lastAliveCount = aliveCount;
            this.updateEnemyHealthBars();
        }
    };
})();