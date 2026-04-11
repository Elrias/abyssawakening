(() => {
  "use strict";

  const SHOW_SHIELD_NUMBER = true;
  const SHIELD_TEXT_COLOR = "#3fa9ff";    
  const SHIELD_TEXT_PREFIX = "";
  // Couleurs bouclier (gradient)
  const SHIELD_C1 = "#2aa7ff";
  const SHIELD_C2 = "#0b4bd6";

  // Petits réglages anti-recouvrement (si besoin)
  // Si ton bleu touche encore le texte, augmente PAD_TOP ou baisse PAD_H.
  const PAD_LEFT = 0;
  const PAD_TOP = 0;
  const PAD_RIGHT = 0;
  const PAD_BOTTOM = 0;

  function totalAbsorbShield(battler) {
    if (!battler || typeof battler.getStateDisplay !== "function") return 0;

    let total = 0;
    for (const st of battler.states()) {
      if (!st?.note) continue;
      if (/Absorb\s*Barrier/i.test(st.note)) {
        total += Number(battler.getStateDisplay(st.id)) || 0;
      }
    }
    return Math.max(0, total);
  }

  // --- 1) On capture le rect exact au moment où Visu dessine (drawFullGauge est bien appelé chez toi)
  const _drawFullGauge = Sprite_Gauge.prototype.drawFullGauge;
  Sprite_Gauge.prototype.drawFullGauge = function(c1, c2, x, y, w, h) {
    // stocke le dernier rect utilisé POUR CE sprite
    this._barrierGaugeRect = { x, y, w, h };
    return _drawFullGauge.call(this, c1, c2, x, y, w, h);
  };

  function paddedRect(rect) {
    const x = rect.x + PAD_LEFT;
    const y = rect.y + PAD_TOP;
    const w = rect.w - PAD_LEFT - PAD_RIGHT;
    const h = rect.h - PAD_TOP - PAD_BOTTOM;
    return { x, y, w: Math.max(0, w), h: Math.max(0, h) };
  }

  function ensureTempBitmap(g) {
    const bw = g.bitmap?.width ?? 0;
    const bh = g.bitmap?.height ?? 0;
    if (!g._barrierTemp || g._barrierTemp.width !== bw || g._barrierTemp.height !== bh) {
      g._barrierTemp = new Bitmap(bw, bh);
    }
    g._barrierTemp.clear();
    return g._barrierTemp;
  }

  function drawShieldSegment(g) {
    if (!g.bitmap || g._statusType !== "hp" || !g._battler) return;

    const rect0 = g._barrierGaugeRect;
    if (!rect0) return;

    const rect = paddedRect(rect0);
    if (rect.w <= 0 || rect.h <= 0) return;

    const b = g._battler;
    const mhp = Math.max(1, b.mhp);
    const hp = Math.max(0, b.hp);
    const shield = totalAbsorbShield(b);
    if (shield <= 0) return;

    const hpRate = Math.min(1, hp / mhp);
    const shRate = Math.min(1, shield / mhp);

    // Pixels (dans la largeur de jauge)
    const hpW = Math.floor(rect.w * hpRate);
    const shW = Math.floor(rect.w * Math.min(1, shRate));

    if (shW <= 0) return;

    // --- 2) On dessine une jauge bleue stylée DANS UN TEMP bitmap (même style Visu)
    const temp = ensureTempBitmap(g);

    const savedBitmap = g.bitmap;
    const savedGaugeRate = g.gaugeRate;

    // Pour avoir une jauge bleue qui remplit jusqu'à (HP+Shield)
    const combinedRate = Math.min(1, hpRate + shRate);

    try {
      g.bitmap = temp;
      g.gaugeRate = () => combinedRate;
      _drawFullGauge.call(g, SHIELD_C1, SHIELD_C2, rect0.x, rect0.y, rect0.w, rect0.h);
    } finally {
      g.bitmap = savedBitmap;
      g.gaugeRate = savedGaugeRate;
    }

    // --- 3) On blit UNIQUEMENT le segment bouclier
    // Cas HP full OU bouclier > PV manquants : bleu au début (à gauche)
    if (hpRate >= 1 || (hpRate + shRate) > 1) {
      const drawW = Math.min(shW, rect.w);
      if (drawW > 0) {
        g.bitmap.blt(
          temp,
          rect.x, rect.y, drawW, rect.h,   // src
          rect.x, rect.y                   // dst
        );
      }
      return;
    }

    // Cas HP non full : bleu après les HP
    const startX = rect.x + hpW;
    const drawW = Math.min(shW, rect.w - hpW);
    if (drawW <= 0) return;

    g.bitmap.blt(
      temp,
      startX, rect.y, drawW, rect.h,       // src: uniquement la zone après HP
      startX, rect.y                        // dst
    );

  }

  // On dessine APRÈS redraw (pour ne pas être écrasé)
  const _redraw = Sprite_Gauge.prototype.redraw;
  Sprite_Gauge.prototype.redraw = function() {
    _redraw.call(this);
    drawShieldSegment(this);

    // Affiche le nombre après TOUT le reste
    const rect0 = this._barrierGaugeRect;
    if (!rect0) return;

    const rect = paddedRect(rect0);
    const shield = totalAbsorbShield(this._battler);
    updateShieldTextSprite(this);
  };

  // Force redraw quand bouclier change
  const _updateBitmap = Sprite_Gauge.prototype.updateBitmap;
  Sprite_Gauge.prototype.updateBitmap = function() {
    if (this._statusType === "hp" && this._battler) {
      const sh = totalAbsorbShield(this._battler);
      if (this._lastShieldValue !== sh) {
        this._lastShieldValue = sh;
        if (typeof this.redraw === "function") this.redraw();
      }
    }
    _updateBitmap.call(this);
  };

  function formatWithCommas(n) {
  return Number(n).toLocaleString("en-US");
}

  // Crée un sprite texte (une fois) et l'attache au même parent que la jauge
  function ensureShieldTextSprite(g) {
    if (g._shieldTextSprite) return g._shieldTextSprite;

    const bmp = new Bitmap(140, 32); // largeur/hauteur du label
    const spr = new Sprite(bmp);
    spr.anchor.set(1, 0.5); // ancre à droite
    spr.visible = false;

    g._shieldTextSprite = spr;

    // Attacher au parent (même repère que la jauge)
    if (g.parent) g.parent.addChild(spr);

    return spr;
  }

  function updateShieldTextSprite(g) {
    if (!SHOW_SHIELD_NUMBER) return;
    if (!g || g._statusType !== "hp" || !g._battler) return;

    const rect0 = g._barrierGaugeRect;
    if (!rect0) return;

    const shield = totalAbsorbShield(g._battler);
    const spr = ensureShieldTextSprite(g);

    if (shield <= 0) {
      spr.visible = false;
      return;
    }

    const text = `${SHIELD_TEXT_PREFIX}${formatWithCommas(shield)}`;

    const bmp = spr.bitmap;
    bmp.clear();

    const sourceBmp = g.bitmap;

    bmp.fontFace = sourceBmp.fontFace;
    bmp.fontSize = sourceBmp.fontSize;
    bmp.fontBold = sourceBmp.fontBold;
    bmp.fontItalic = sourceBmp.fontItalic;

    bmp.textColor = SHIELD_TEXT_COLOR;
    bmp.outlineColor = sourceBmp.outlineColor;
    bmp.outlineWidth = 0;

    bmp.drawText(text, 0, 0, bmp.width, bmp.height, "right");

    const HP_RIGHT_OFFSET = 14; 
    const rightX = g.x + rect0.x + rect0.w - HP_RIGHT_OFFSET;
    const ABOVE_PX = 20;
    const y = g.y + rect0.y - ABOVE_PX;

    spr.x = rightX;
    spr.y = y;
    spr.visible = true;
  }
})();