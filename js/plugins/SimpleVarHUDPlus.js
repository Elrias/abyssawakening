/*:
 * @target MZ
 * @plugindesc FR: HUD texte multi-variables, multi-instances, positions presets, commandes dynamiques. v1.0
 * @author ChatGPT
 *
 * @help
 * Crée un ou plusieurs HUD(s) texte sur la map, chacun lié à une variable RPG Maker MZ.
 * Mise à jour en continu, positionnable (presets coin écran ou X/Y), style personnalisable,
 * visibilité via interrupteur ou commandes plugin, filtres de map.
 *
 * --- CONCEPT ---
 * Chaque HUD a un "hudId" (nombre) que tu choisis. Tu peux:
 *  - AddOrUpdateHUD (crée/maj le HUD)
 *  - ShowHUD / HideHUD
 *  - RemoveHUD
 *  - SetHUDVariable / SetHUDFormat / SetHUDPositionPreset / SetHUDPositionXY / SetHUDVisibleSwitch
 *
 * Les HUDs persistent entre maps (recréés automatiquement à l'entrée sur Scene_Map).
 *
 * --- PRESETS DE POSITION ---
 *   topLeft, topRight, bottomLeft, bottomRight
 * Marges: marginX, marginY. Ou bien tu utilises X/Y fixes (SetHUDPositionXY).
 *
 * --- MAP FILTERS ---
 *  - onlyMapIds: liste CSV d'IDs autorisés (ex: "1,2,5")
 *  - excludeMapIds: liste CSV d'IDs à exclure
 *
 * --- EXEMPLES RAPIDES ---
 * 1) Afficher variable 10 en haut-droite :
 *    AddOrUpdateHUD hudId:1 varId:10 format:"Or : %1" preset:"topRight" marginX:20 marginY:16
 *    ShowHUD hudId:1
 *
 * 2) Plus tard, afficher variable 12 à la place (même HUD) :
 *    SetHUDVariable hudId:1 varId:12
 *
 * 3) N’afficher le HUD que sur map 3 et 7 :
 *    AddOrUpdateHUD ... onlyMapIds:"3,7"
 *
 * 4) Cacher/montrer :
 *    HideHUD hudId:1   /   ShowHUD hudId:1
 *
 * --- FORMAT ---
 * Utilise %1 pour la valeur. Ex: "Score : %1" / "Vague : %1 / 6".
 *
 * --- NOTE ---
 * Ce plugin n’a pas de paramètres globaux – tout se pilote par commandes.
 *
 * @command AddOrUpdateHUD
 * @text AddOrUpdateHUD (créer/mettre à jour)
 * @desc Crée ou met à jour un HUD.
 *
 * @arg hudId
 * @type number
 * @min 1
 * @default 1
 *
 * @arg varId
 * @type variable
 * @default 1
 *
 * @arg format
 * @type string
 * @default Valeur : %1
 *
 * @arg preset
 * @type select
 * @option topLeft
 * @option topRight
 * @option bottomLeft
 * @option bottomRight
 * @option none
 * @default topRight
 * @desc "none" pour utiliser X/Y fixes.
 *
 * @arg x
 * @type number
 * @default 0
 *
 * @arg y
 * @type number
 * @default 0
 *
 * @arg marginX
 * @type number
 * @default 20
 *
 * @arg marginY
 * @type number
 * @default 16
 *
 * @arg fontSize
 * @type number
 * @min 8
 * @default 22
 *
 * @arg fontFace
 * @type string
 * @default
 *
 * @arg color
 * @type string
 * @default #FFFFFF
 *
 * @arg outlineColor
 * @type string
 * @default rgba(0,0,0,0.8)
 *
 * @arg outlineWidth
 * @type number
 * @min 0
 * @default 4
 *
 * @arg bgEnabled
 * @type boolean
 * @default true
 *
 * @arg bgPadding
 * @type number
 * @default 6
 *
 * @arg bgColor
 * @type string
 * @default rgba(0,0,0,0.35)
 *
 * @arg visibleSwitchId
 * @type switch
 * @default 0
 *
 * @arg onlyMapIds
 * @type string
 * @default
 * @desc CSV d'IDs (ex: 3,7,12)
 *
 * @arg excludeMapIds
 * @type string
 * @default
 * @desc CSV d'IDs (ex: 2,4)
 *
 * @arg visible
 * @type boolean
 * @default true
 *
 * @command ShowHUD
 * @text ShowHUD
 * @arg hudId
 * @type number
 * @min 1
 * @default 1
 *
 * @command HideHUD
 * @text HideHUD
 * @arg hudId
 * @type number
 * @min 1
 * @default 1
 *
 * @command RemoveHUD
 * @text RemoveHUD
 * @arg hudId
 * @type number
 * @min 1
 * @default 1
 *
 * @command SetHUDVariable
 * @text SetHUDVariable
 * @arg hudId
 * @type number
 * @default 1
 * @arg varId
 * @type variable
 * @default 1
 *
 * @command SetHUDFormat
 * @text SetHUDFormat
 * @arg hudId
 * @type number
 * @default 1
 * @arg format
 * @type string
 * @default Valeur : %1
 *
 * @command SetHUDPositionPreset
 * @text SetHUDPositionPreset
 * @arg hudId
 * @type number
 * @default 1
 * @arg preset
 * @type select
 * @option topLeft
 * @option topRight
 * @option bottomLeft
 * @option bottomRight
 * @option none
 * @default topRight
 * @arg marginX
 * @type number
 * @default 20
 * @arg marginY
 * @type number
 * @default 16
 *
 * @command SetHUDPositionXY
 * @text SetHUDPositionXY
 * @arg hudId
 * @type number
 * @default 1
 * @arg x
 * @type number
 * @default 0
 * @arg y
 * @type number
 * @default 0
 *
 * @command SetHUDVisibleSwitch
 * @text SetHUDVisibleSwitch
 * @arg hudId
 * @type number
 * @default 1
 * @arg switchId
 * @type switch
 * @default 0
 *
 */

(() => {
  "use strict";
  const PN = "SimpleVarHUDPlus";

  // --------- Gestionnaire global (persiste dans la partie) ---------
  window.$svhud = window.$svhud || {
    // store: { hudId: {config}, ...}
    store: {},
    // runtime: { hudId: { sprite: Sprite, scene: Scene_Map }, ...}
    runtime: {}
  };

  // Utilitaires
  function parseCsvIds(str) {
    if (!str) return [];
    return String(str).split(",").map(s => Number(s.trim())).filter(n => !Number.isNaN(n) && n > 0);
  }

  // Sprite d’un HUD
  class Sprite_VarHUD extends Sprite {
    constructor(config) {
      super();
      this._cfg = JSON.parse(JSON.stringify(config)); // copie défensive
      this._container = new PIXI.Container();
      this.addChild(this._container);

      this._bg = new PIXI.Graphics();
      this._container.addChild(this._bg);

      const style = new PIXI.TextStyle({
        fill: this._cfg.color,
        fontSize: this._cfg.fontSize,
        fontFamily: this._cfg.fontFace || $gameSystem.mainFontFace(),
        stroke: this._cfg.outlineColor,
        strokeThickness: this._cfg.outlineWidth,
        lineJoin: "round",
      });
      this._text = new PIXI.Text("", style);
      // ancrage géré dynamiquement selon preset
      this._container.addChild(this._text);

      this._lastValue = undefined;
      this._needsResync = true;

      window.addEventListener("resize", () => (this._needsResync = true));
    }

    updateConfig(partial) {
      Object.assign(this._cfg, partial);
      // Mettre à jour style si besoin
      if (partial.fontSize || partial.fontFace || partial.color || partial.outlineColor || partial.outlineWidth) {
        this._text.style = new PIXI.TextStyle({
          fill: this._cfg.color,
          fontSize: this._cfg.fontSize,
          fontFamily: this._cfg.fontFace || $gameSystem.mainFontFace(),
          stroke: this._cfg.outlineColor,
          strokeThickness: this._cfg.outlineWidth,
          lineJoin: "round",
        });
      }
      this._needsResync = true;
    }

    currentValue() {
      const id = Math.max(1, this._cfg.varId|0);
      return $gameVariables.value(id);
    }

    makeText() {
      const v = this.currentValue();
      return String(this._cfg.format || "%1").replace("%1", v != null ? String(v) : "");
    }

    shouldShowOnThisMap() {
      const mapId = $gameMap ? $gameMap.mapId() : 0;
      const only = this._cfg.onlyMapIds || [];
      const excl = this._cfg.excludeMapIds || [];
      if (only.length > 0 && !only.includes(mapId)) return false;
      if (excl.length > 0 && excl.includes(mapId)) return false;
      // switch de visibilité
      if (this._cfg.visibleSwitchId > 0 && !$gameSwitches.value(this._cfg.visibleSwitchId)) return false;
      return this._cfg.visible;
    }

    update() {
      super.update();
      this.visible = this.shouldShowOnThisMap();
      if (!this.visible) return;

      const val = this.currentValue();
      if (val !== this._lastValue) {
        this._text.text = this.makeText();
        this._lastValue = val;
        this._needsResync = true;
      }

      if (this._needsResync) {
        this._needsResync = false;
        this.resyncLayout();
      }
    }

    resyncLayout() {
      // Choix de l'ancre selon preset
      const preset = this._cfg.preset;
      const w = Graphics.width, h = Graphics.height;
      const mX = this._cfg.marginX, mY = this._cfg.marginY;

      this._text.updateText(); // pour width/height à jour
      const tw = this._text.width, th = this._text.height;

      let x = this._cfg.x, y = this._cfg.y, anchorX = 0, anchorY = 0;
      if (preset && preset !== "none") {
        switch (preset) {
          case "topLeft":     x = mX;        y = mY;        anchorX = 0; anchorY = 0; break;
          case "topRight":    x = w - mX;    y = mY;        anchorX = 1; anchorY = 0; break;
          case "bottomLeft":  x = mX;        y = h - mY;    anchorX = 0; anchorY = 1; break;
          case "bottomRight": x = w - mX;    y = h - mY;    anchorX = 1; anchorY = 1; break;
        }
      } else {
        // X/Y bruts (anchor par défaut à gauche/haut)
        anchorX = 0; anchorY = 0;
      }

      this._text.anchor.set(anchorX, anchorY);
      this._text.x = x;
      this._text.y = y;

      // Fond (optionnel)
      this._bg.clear();
      if (this._cfg.bgEnabled) {
        const pad = this._cfg.bgPadding;
        // calcul du rect selon l'ancre
        let left = x - (anchorX * tw) - pad;
        let top  = y - (anchorY * th) - pad;
        let rw   = tw + pad*2;
        let rh   = th + pad*2;

        this._bg.beginFill(0x000000, 1);
        this._bg.drawRoundedRect(left, top, rw, rh, 8);
        this._bg.endFill();

        // couleur/alpha depuis bgColor
        const col = (this._cfg.bgColor || "rgba(0,0,0,0.35)").trim();
        let alpha = 0.35, tint = 0x000000;
        if (col.startsWith("#")) {
          tint = PIXI.utils.string2hex(col); alpha = 0.35;
        } else if (col.startsWith("rgba")) {
          const m = col.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([0-9.]+)\)/i);
          if (m) { tint = (Number(m[1])<<16) + (Number(m[2])<<8) + Number(m[3]); alpha = Number(m[4]); }
        } else if (col.startsWith("rgb")) {
          const m = col.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/i);
          if (m) { tint = (Number(m[1])<<16) + (Number(m[2])<<8) + Number(m[3]); alpha = 0.35; }
        }
        this._bg.tint = tint;
        this._bg.alpha = alpha;
      }
    }
  }

  // --------- Scène Map : création / reconstruction ----------
  function buildSpriteFor(hudId, scene) {
    const cfg = $svhud.store[hudId];
    if (!cfg) return;
    const spr = new Sprite_VarHUD(cfg);
    scene.addChild(spr);
    $svhud.runtime[hudId] = { sprite: spr, scene };
  }

  function destroySprite(hudId) {
    const rt = $svhud.runtime[hudId];
    if (rt && rt.sprite && rt.sprite.parent) {
      rt.sprite.parent.removeChild(rt.sprite);
    }
    delete $svhud.runtime[hudId];
  }

  const _Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    _Scene_Map_createAllWindows.apply(this, arguments);
    // Recrée tous les HUDs existants
    for (const hid of Object.keys($svhud.store)) {
      buildSpriteFor(Number(hid), this);
    }
  };

  const _Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
  Scene_Map.prototype.onMapLoaded = function() {
    _Scene_Map_onMapLoaded.apply(this, arguments);
    // Resync des HUDs à chaque carte
    for (const hid of Object.keys($svhud.runtime)) {
      const rt = $svhud.runtime[hid];
      if (rt && rt.sprite) rt.sprite._needsResync = true;
    }
  };

  // --------- Commandes Plugin ----------
  function ensureConfig(hudId) {
    if (!$svhud.store[hudId]) {
      // defaults
      $svhud.store[hudId] = {
        hudId,
        varId: 1,
        format: "Valeur : %1",
        preset: "topRight",
        x: 0, y: 0,
        marginX: 20, marginY: 16,
        fontSize: 22,
        fontFace: "",
        color: "#FFFFFF",
        outlineColor: "rgba(0,0,0,0.8)",
        outlineWidth: 4,
        bgEnabled: true,
        bgPadding: 6,
        bgColor: "rgba(0,0,0,0.35)",
        visibleSwitchId: 0,
        onlyMapIds: [],
        excludeMapIds: [],
        visible: true,
      };
    }
    return $svhud.store[hudId];
  }

  function refreshRuntime(hudId) {
    const rt = $svhud.runtime[hudId];
    const cfg = $svhud.store[hudId];
    if (rt && rt.sprite) {
      rt.sprite.updateConfig(cfg);
      rt.sprite._needsResync = true;
    }
  }

  PluginManager.registerCommand(PN, "AddOrUpdateHUD", args => {
    const hudId = Number(args.hudId || 1);
    const cfg = ensureConfig(hudId);
    Object.assign(cfg, {
      varId: Number(args.varId || cfg.varId),
      format: String(args.format ?? cfg.format),
      preset: String(args.preset || cfg.preset),
      x: Number(args.x || 0),
      y: Number(args.y || 0),
      marginX: Number(args.marginX || cfg.marginX),
      marginY: Number(args.marginY || cfg.marginY),
      fontSize: Number(args.fontSize || cfg.fontSize),
      fontFace: String(args.fontFace || cfg.fontFace),
      color: String(args.color || cfg.color),
      outlineColor: String(args.outlineColor || cfg.outlineColor),
      outlineWidth: Number(args.outlineWidth || cfg.outlineWidth),
      bgEnabled: String(args.bgEnabled) === "true",
      bgPadding: Number(args.bgPadding || cfg.bgPadding),
      bgColor: String(args.bgColor || cfg.bgColor),
      visibleSwitchId: Number(args.visibleSwitchId || 0),
      onlyMapIds: parseCsvIds(args.onlyMapIds || ""),
      excludeMapIds: parseCsvIds(args.excludeMapIds || ""),
      visible: String(args.visible) !== "false",
    });

    // (Re)construire sprite si scène présente
    const rt = $svhud.runtime[hudId];
    if (SceneManager._scene instanceof Scene_Map) {
      if (rt && rt.sprite) {
        refreshRuntime(hudId);
      } else {
        buildSpriteFor(hudId, SceneManager._scene);
      }
    }
  });

  PluginManager.registerCommand(PN, "ShowHUD", args => {
    const hudId = Number(args.hudId || 1);
    ensureConfig(hudId).visible = true;
    refreshRuntime(hudId);
  });

  PluginManager.registerCommand(PN, "HideHUD", args => {
    const hudId = Number(args.hudId || 1);
    ensureConfig(hudId).visible = false;
    refreshRuntime(hudId);
  });

  PluginManager.registerCommand(PN, "RemoveHUD", args => {
    const hudId = Number(args.hudId || 1);
    delete $svhud.store[hudId];
    destroySprite(hudId);
  });

  PluginManager.registerCommand(PN, "SetHUDVariable", args => {
    const hudId = Number(args.hudId || 1);
    const varId = Number(args.varId || 1);
    ensureConfig(hudId).varId = varId;
    refreshRuntime(hudId);
  });

  PluginManager.registerCommand(PN, "SetHUDFormat", args => {
    const hudId = Number(args.hudId || 1);
    const format = String(args.format || "Valeur : %1");
    ensureConfig(hudId).format = format;
    refreshRuntime(hudId);
  });

  PluginManager.registerCommand(PN, "SetHUDPositionPreset", args => {
    const hudId = Number(args.hudId || 1);
    const preset = String(args.preset || "topRight");
    const marginX = Number(args.marginX || 20);
    const marginY = Number(args.marginY || 16);
    const cfg = ensureConfig(hudId);
    cfg.preset = preset;
    cfg.marginX = marginX;
    cfg.marginY = marginY;
    refreshRuntime(hudId);
  });

  PluginManager.registerCommand(PN, "SetHUDPositionXY", args => {
    const hudId = Number(args.hudId || 1);
    const x = Number(args.x || 0);
    const y = Number(args.y || 0);
    const cfg = ensureConfig(hudId);
    cfg.preset = "none";
    cfg.x = x; cfg.y = y;
    refreshRuntime(hudId);
  });

  PluginManager.registerCommand(PN, "SetHUDVisibleSwitch", args => {
    const hudId = Number(args.hudId || 1);
    const sw = Number(args.switchId || 0);
    ensureConfig(hudId).visibleSwitchId = sw;
    refreshRuntime(hudId);
  });

})();
