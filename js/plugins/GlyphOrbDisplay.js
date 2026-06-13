/*:
 * @target MZ
 * @plugindesc Trigger Equip Orbs Display - show orb progress above actor (uses img/system/SphereFrame.png)
 * @author Elrias
 *
 * @param OrbFrameImage
 * @type string
 * @default SphereFrame
 *
 * @param OrbSize
 * @type number
 * @default 18
 *
 * @param OrbGap
 * @type number
 * @default 4
 *
 * @param OffsetY
 * @type number
 * @default 28
 *
 * @param TTLFadeFrames
 * @type number
 * @default 20
 *
 * @help
 * Requires TriggerEquipSkills storing battler._triggerEquipState.orbDisplay:
 * { current, max, ttl }
 *
 * Put SphereFrame.png into img/system/SphereFrame.png
 */

(() => {
  const PLUGIN_NAME = "GlyphOrbsDisplay";
  const p = PluginManager.parameters(PLUGIN_NAME);

  const ORB_FRAME = String(p.OrbFrameImage || "SphereFrame");
  const ORB_SIZE  = Number(p.OrbSize || 18);
  const ORB_GAP   = Number(p.OrbGap || 4);
  const OFFSET_Y  = Number(p.OffsetY || 28);
  const FADE_FR   = Number(p.TTLFadeFrames || 20);

  function makeFillBitmap(size) {
    const b = new Bitmap(size, size);
    // cercle rouge simple (remplissage)
    const r = Math.max(2, Math.floor(size * 0.38));
    const cx = Math.floor(size / 2);
    const cy = Math.floor(size / 2);
    b.context.save();
    b.context.beginPath();
    b.context.arc(cx, cy, r, 0, Math.PI * 2);
    b.context.closePath();
    b.context.fillStyle = "#ff3b30"; // rouge
    b.context.fill();
    b.context.restore();
    b._baseTexture.update();
    return b;
  }

  class Sprite_TriggerOrbs extends Sprite {
    constructor() {
      super();
      this._frameBmp = ImageManager.loadSystem(ORB_FRAME);
      this._fillBmp = makeFillBitmap(ORB_SIZE);
      this._max = 0;
      this._current = 0;
      this._ttl = 0;
      this._orbs = [];
      this.visible = false;
    }

    setValue(current, max, ttl) {
      this._current = current;
      this._max = max;
      this._ttl = ttl;
      this.visible = max > 0 && ttl > 0;
      this._rebuild();
      this._refreshFill();
    }

    _rebuild() {
      // Rebuild only if max changed
      if (this._orbs.length === this._max) return;

      this.removeChildren();
      this._orbs = [];

      for (let i = 0; i < this._max; i++) {
        const c = new Sprite();

        // fill (behind)
        const fill = new Sprite(this._fillBmp);
        fill.anchor.set(0.5, 0.5);
        fill.x = 0; fill.y = 0;

        // frame (front)
        const frame = new Sprite(this._frameBmp);
        frame.anchor.set(0.5, 0.5);
        frame.scale.set(ORB_SIZE / (frame.bitmap?.width || ORB_SIZE), ORB_SIZE / (frame.bitmap?.height || ORB_SIZE));

        c.addChild(fill);
        c.addChild(frame);

        c._fill = fill;

        c._filledTarget = false;
        c._fillProgress = 0;
        fill.visible = false;
        fill.scale.set(0, 0);
        fill.opacity = 0;

        const x = i * (ORB_SIZE + ORB_GAP);
        c.x = x;
        c.y = 0;

        this.addChild(c);
        this._orbs.push(c);
      }

      // center horizontally
      const totalW = this._max > 0 ? (this._max * ORB_SIZE + (this._max - 1) * ORB_GAP) : 0;
      this.x = -Math.floor(totalW / 2);
    }

    _refreshFill() {
      for (let i = 0; i < this._orbs.length; i++) {
        const o = this._orbs[i];
        o._filledTarget = i < this._current;

        // si on vient de passer à "rempli", démarre l'anim depuis 0
        if (o._filledTarget && o._fillProgress <= 0) {
          o._fillProgress = 0;
          o._fill.visible = true;
          o._fill.scale.set(0, 0);
          o._fill.opacity = 0;
        }

        // si on doit être vide, on laisse update gérer la descente (ou cachera)
        if (!o._filledTarget && o._fillProgress <= 0) {
          o._fill.visible = false;
          o._fill.scale.set(0, 0);
          o._fill.opacity = 0;
        }
      }
    }

    update() {
      super.update();
      if (!this.visible) return;

      if (this._ttl > 0) this._ttl--;
      if (this._ttl <= 0) {
        this.visible = false;
        return;
      }

      // fade out at end
      if (FADE_FR > 0 && this._ttl < FADE_FR) {
        this.opacity = Math.floor(255 * (this._ttl / FADE_FR));
      } else {
        this.opacity = 255;
      }

      const speedIn = 0.08;
      const speedOut = 0.25;  

      for (const o of this._orbs) {
        if (o._filledTarget) {
          o._fillProgress = Math.min(1, o._fillProgress + speedIn);
        } else {
          o._fillProgress = Math.max(0, o._fillProgress - speedOut);
        }

        if (o._fillProgress > 0) {
          o._fill.visible = true;
          const p = o._fillProgress;

          o._fill.scale.set(p, p);
          o._fill.opacity = Math.floor(255 * p);
        } else {
          o._fill.visible = false;
          o._fill.scale.set(0, 0);
          o._fill.opacity = 0;
        }
      }
    }
  }

  // Attach to each Sprite_Actor
  const _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
  Sprite_Actor.prototype.initMembers = function() {
    _Sprite_Actor_initMembers.call(this);
    this._triggerOrbs = new Sprite_TriggerOrbs();
    this.addChild(this._triggerOrbs);
  };

  const _Sprite_Actor_update = Sprite_Actor.prototype.update;
  Sprite_Actor.prototype.update = function() {
    _Sprite_Actor_update.call(this);

    const battler = this._battler;
    if (!battler || !battler._triggerEquipState) {
      if (this._triggerOrbs) this._triggerOrbs.visible = false;
      return;
    }

    const od = battler._triggerEquipState.orbDisplay;
    if (!od) return;

    const main = this._mainSprite;
    if (main) {
      const b = main.getBounds();      
      const topWorldY = b.y;             
      const topLocalY = topWorldY - this.y;
      this._triggerOrbs.y = topLocalY - 12 + OFFSET_Y; 
    }

    if (od.ttl > 0 && od.max > 0) {
      
      od.ttl--;
      if (!od.locked) {
        this._triggerOrbs.setValue(od.current, od.max, od.ttl);
      }
    } else {
      this._triggerOrbs.visible = false;
    }
  };
})();
