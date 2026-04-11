/*:
 * @plugindesc Displays TP bar for every enemy on top on the screen.
 * @target MZ
 * @help EnemySPBars.js
 * 
 * Displays SP bar for enemies on top of the screen.
 */

(() => {
    // Classe pour les sphères de TP
    class Sprite_EnemyTPSphere extends Sprite {
        initialize(enemy, numSpheres) {
            super.initialize();
            this._enemy = enemy;
            this._numSpheres = numSpheres;
            this._spheres = [];
            this._fadingOut = false;
            this._fadeDuration = 20;
            this.createSpheres();
        }

        createSpheres() {
            const spacing = 5; // Espacement entre les sphères
            const radius = 6; // Rayon des sphères
            for (let i = 0; i < this._numSpheres; i++) {
                const sphere = new Sprite();
                sphere.bitmap = new Bitmap(radius * 2, radius * 2);
                sphere.bitmap.drawCircle(radius, radius, radius, 'rgb(25, 25, 25)');
                sphere.x = i * (radius * 2 + spacing);
                this._spheres.push(sphere);
                this.addChild(sphere);

                // Ajouter le cadre de la sphère
                const frame = new Sprite();
                frame.bitmap = ImageManager.loadBitmap('img/system/', 'SphereFrame'); // Assurez-vous que l'image du cadre est dans le dossier img/system/
                //frame.scale.x = (radius * 2) / frame.bitmap.width; // Ajustez l'échelle du cadre en fonction du rayon de la sphère
                //frame.scale.y = (radius * 2) / frame.bitmap.height; // Ajustez l'échelle du cadre en fonction du rayon de la sphère
                frame.x = sphere.x - radius + 4; // Ajustez selon vos besoins
                frame.y = sphere.y - radius + 4; // Ajustez selon vos besoins
                this.addChild(frame);
                sphere._frame = frame; // Associe le cadre à la sphère pour un accès facile
            }
        }

        update() {
            super.update();

            if (this._enemy.isHidden()) {
                this.visible = false; // Cacher les sphères de TP si l'ennemi est caché
                return;
            } else {
                this.visible = true; // Afficher les sphères de TP si l'ennemi est visible
            }

            if (this._fadingOut) {
                this.opacity -= 255 / this._fadeDuration;
                if (this.opacity <= 0) {
                    this.parent.removeChild(this);
                }
            } else {
                const tp = this._enemy.tp;

                for (let i = 0; i < this._numSpheres; i++) {
                    const sphere = this._spheres[i];
                    if (tp >= (i + 1) * 10) {
                        sphere.bitmap.clear();
                        sphere.bitmap.drawCircle(6, 6, 6, 'green');
                    } else {
                        sphere.bitmap.clear();
                        sphere.bitmap.drawCircle(6, 6, 6, 'rgb(25, 25, 25)');
                    }
                }
    
                // Clignotement progressif des sphères lorsque toutes sont remplies
                if (tp >= (this._numSpheres * 10)) {
                    const blinkSpeed = 60; // Vitesse du clignotement
                    const phase = (Graphics.frameCount % blinkSpeed) / blinkSpeed;
                    const alpha = Math.sin(phase * Math.PI * 2) * 0.5 + 0.5; // Valeur alpha entre 0 et 1
    
                    this._spheres.forEach(sphere => {
                        sphere.bitmap.clear();
                        sphere.bitmap.drawCircle(5, 5, 5, 'green'); // Fond vert
                        const whiteAlpha = `rgba(255, 255, 255, ${alpha})`;
                        sphere.bitmap.drawCircle(5, 5, 5, whiteAlpha); // Superpose le blanc avec alpha
                    });
                }

                if (this._enemy.isDead() && !this._fadingOut) {
                    this._fadingOut = true;
                }
            }
        }
    }

    // Ajout des sphères de TP dans la scène de combat
    const _Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
    Spriteset_Battle.prototype.createEnemies = function() {
        _Spriteset_Battle_createEnemies.call(this);
        this.createEnemyTPSpheres();
    };

    const _Game_Enemy_appear = Game_Enemy.prototype.appear;
    Game_Enemy.prototype.appear = function() {
        _Game_Enemy_appear.call(this);
        if (SceneManager._scene._spriteset) {
            SceneManager._scene._spriteset.updateEnemyTPSpheres(); // Met à jour les sphères de TP lorsque les ennemis apparaissent
        }
    };

    Spriteset_Battle.prototype.createEnemyTPSpheres = function() {
        this._enemyTPSpheres = [];
        const visibleEnemies = this._enemySprites.filter(enemySprite =>
            enemySprite._battler &&
            enemySprite._battler.isAlive() &&
            !enemySprite._battler.isHidden()
        );
        visibleEnemies.forEach((enemySprite) => {
            const numSpheres = this.getTPSphereCount(enemySprite._battler.enemy());
            const tpSpheres = new Sprite_EnemyTPSphere(enemySprite._battler, numSpheres);
            // Assurez-vous que les positions X et Y des barres de vie sont définies dans le script des barres de vie
            if (enemySprite.healthBarX !== undefined && enemySprite.healthBarY !== undefined) {
                tpSpheres.x = enemySprite.healthBarX; // Position X identique à la barre de vie
                tpSpheres.y = enemySprite.healthBarY + 15; // Position Y sous la barre de vie
            } else {
                console.warn("healthBarX or healthBarY is undefined for an enemy sprite.");
            }
            this._enemyTPSpheres.push(tpSpheres);
            this.addChild(tpSpheres);
        });
    };

    Spriteset_Battle.prototype.updateEnemyTPSpheres = function() {
        this._enemyTPSpheres.forEach(sphere => this.removeChild(sphere)); // Retirer les sphères de TP existantes
        this.createEnemyTPSpheres(); // Créer de nouvelles sphères de TP pour les ennemis visibles
    };

    Spriteset_Battle.prototype.getTPSphereCount = function(enemy) {
        // Récupère le nombre de sphères de TP depuis les commentaires de l'ennemi
        const comment = enemy.note;
        const match = comment.match(/<TPSphereCount:\s*(\d+)>/i);
        return match ? parseInt(match[1], 10) : 3; // Nombre par défaut de 3 sphères si non spécifié
    };

    const _Spriteset_Battle_update_TP = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update_TP.call(this);

        const aliveCount = this._enemySprites.filter(sprite =>
            sprite._battler && sprite._battler.isAlive()
        ).length;

        if (this._lastAliveCountTP !== aliveCount) {
            this._lastAliveCountTP = aliveCount;
            this.updateEnemyTPSpheres();
        }
    };
})();