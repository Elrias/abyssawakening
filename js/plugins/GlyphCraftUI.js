/*:
 * @target MZ
 * @plugindesc Glyph Craft UI (Pro v6) - Single vertical menu (A/B/C + Confirm + Cancel) + popup list. Keyboard-friendly. Crafts DM_IndependentItems armor, exits on success.
 * @author Elrias
 *
 * @param TemplateArmorId
 * @type number
 * @min 1
 * @default 280
 *
 * @param DynamicFieldName
 * @type string
 * @default _dynamicTriggerEquips
 *
 * @param MaxWeight
 * @type number
 * @min 0
 * @default 100
 *
 * @param UseCustomNamePatch
 * @type boolean
 * @default true
 *
 * @help
 * Fragment notetags (Items):
 *  A: <GlyphType: A> <GlyphCondition: attack> <GlyphNamePartA: of violence> <GlyphWeight: 10>
 *  B: <GlyphType: B> <GlyphCount: 2>        <GlyphNamePartB: Featherlight> <GlyphWeight: 25>
 *  C: <GlyphType: C> <GlyphSkill: 481>      <GlyphNamePartC: rage>         <GlyphWeight: 40>
 *
 * Template armor (ID TemplateArmorId) MUST have:
 *  <independentItem>
 *
 * Script call:
 *  GlyphCraftUI.open();
 */

(() => {
  const PLUGIN_NAME = "GlyphCraftUI_Pro";
  const params = PluginManager.parameters(PLUGIN_NAME);

  const TEMPLATE_ARMOR_ID = Number(params.TemplateArmorId || 280);
  const DYN_FIELD = String(params.DynamicFieldName || "_dynamicTriggerEquips");
  const MAX_WEIGHT = Number(params.MaxWeight || 100);
  const USE_CUSTOM_NAME_PATCH = String(params.UseCustomNamePatch || "true") === "true";

  // -----------------------------
  // Meta helpers
  // -----------------------------
  function metaOf(item) { return item?.meta || {}; }
  function mstr(item, key) { return String(metaOf(item)[key] ?? "").trim(); }
  function mnum(item, key) {
    const s = mstr(item, key);
    const n = Number(s);
    return Number.isFinite(n) ? n : 0;
  }

  function glyphType(item) { return mstr(item, "GlyphType").toUpperCase(); }
  function glyphCondition(item) { return mstr(item, "GlyphCondition"); }
  function glyphCount(item) { return mnum(item, "GlyphCount"); }
  function glyphSkillId(item) { return mnum(item, "GlyphSkill"); }
  function glyphWeight(item) { return mnum(item, "GlyphWeight"); }

  function partA(item) { return mstr(item, "GlyphNamePartA"); }
  function partB(item) { return mstr(item, "GlyphNamePartB"); }
  function partC(item) { return mstr(item, "GlyphNamePartC"); }

  function partyHas(item) { return item && $gameParty.numItems(item) > 0; }
  function skillName(id) { return $dataSkills?.[id]?.name || `Skill #${id}`; }
  function skillDesc(id) { return String($dataSkills?.[id]?.description || "").trim(); }

  function buildGlyphName(a, b, c) {
    const A = partA(a);
    const B = partB(b);
    const C = partC(c);
    return `${B} ${C} ${A}`.replace(/\s+/g, " ").trim() || "Crafted Glyph";
  }

  // -----------------------------
  // UI helpers
  // -----------------------------
  function highlightColor() { return ColorManager.textColor(2); } // red-ish

  function drawInlineColored(win, x, y, parts) {
    let dx = x;
    for (const p of parts) {
      if (!p.text) continue;
      if (p.color) win.changeTextColor(p.color);
      else win.resetTextColor();
      win.drawText(p.text, dx, y, win.innerWidth - dx);
      dx += win.textWidth(p.text);
    }
    win.resetTextColor();
  }

  function wrapText(win, text, maxWidth) {
    const words = String(text || "").split(/\s+/);
    const lines = [];
    let line = "";

    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      if (win.textWidth(test) <= maxWidth) {
        line = test;
      } else {
        if (line) lines.push(line);
        if (win.textWidth(w) > maxWidth) {
          let chunk = "";
          for (const ch of w) {
            const t = chunk + ch;
            if (win.textWidth(t) <= maxWidth) chunk = t;
            else {
              if (chunk) lines.push(chunk);
              chunk = ch;
            }
          }
          line = chunk;
        } else {
          line = w;
        }
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  // -----------------------------
  // Condition phrasing (REACTS)
  // -----------------------------
  function titleCase(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/\b\w/g, ch => ch.toUpperCase());
  }

  function reactClauseFromConditionRaw(condRaw) {
    const raw = String(condRaw || "").trim();
    if (!raw) return "when the bearer meets the condition";

    const [basePart, ...rest] = raw.split(":");
    const base = basePart.trim().toLowerCase();
    const arg = rest.join(":").trim();

    switch (base) {
      case "attack": return "when the bearer attacks";
      case "guard": return "when the bearer guards";
      case "use_item": return "when the bearer uses an item";
      case "damage_taken": return "when the bearer takes damage";
      case "healing_received": return "when the bearer receives healing";
      case "evade": return "when the bearer evades";
      case "critical_dealt": return "when the bearer lands a critical hit";
      case "healing_done": return "when the bearer heals someone";
      case "tp_spent": return "when the bearer spends TP";
      case "end_tp_at_least": return arg ? `if the bearer ends the turn with at least ${arg} TP` : "if the bearer ends the turn with enough TP";
      case "end_hp_below": return arg ? `if the bearer ends the turn below ${arg}% HP` : "if the bearer ends the turn below a HP threshold";
      case "end_hp_above": return arg ? `if the bearer ends the turn above ${arg}% HP` : "if the bearer ends the turn above a HP threshold";
      case "skill_type_use":
        if (arg === "1") return "when the bearer uses a skill";
        if (arg === "2") return " twice when the bearer uses an EX";
        return "when the bearer uses a skill";
      case "damage_taken_skill_type": return arg ? `when the bearer takes damage from special attacks` : "when the bearer takes damage from a given skill type";
      case "damage_dealt_this_turn": return arg ? `when the bearer deals over ${arg} hit(s) of damage in the same turn` : "if the bearer deals enough hits of damage this turn";
      default: return `when the bearer: ${titleCase(raw.replace(/_/g, " "))}`;
    }
  }

  // -----------------------------
  // Craft (DM_IndependentItems)
  // -----------------------------
  function validate(a, b, c) {
    if (!a || !b || !c) return { ok: false, msg: "Select A + B + C first." };
    if (glyphType(a) !== "A") return { ok: false, msg: "Invalid Type A fragment." };
    if (glyphType(b) !== "B") return { ok: false, msg: "Invalid Type B fragment." };
    if (glyphType(c) !== "C") return { ok: false, msg: "Invalid Type C fragment." };
    if (!partyHas(a) || !partyHas(b) || !partyHas(c)) return { ok: false, msg: "Missing fragments in inventory." };

    const cond = glyphCondition(a);
    const cnt = glyphCount(b);
    const skId = glyphSkillId(c);

    if (!cond) return { ok: false, msg: "Type A missing <GlyphCondition: ...>" };
    if (!cnt || cnt <= 0) return { ok: false, msg: "Type B missing/invalid <GlyphCount: ...>" };
    if (!skId || !$dataSkills[skId]) return { ok: false, msg: "Type C missing/invalid <GlyphSkill: ...>" };

    const template = $dataArmors[TEMPLATE_ARMOR_ID];
    if (!template) return { ok: false, msg: `Template armor #${TEMPLATE_ARMOR_ID} not found.` };
    if (!template.meta?.independentItem) return { ok: false, msg: "Template needs <independentItem>." };

    return { ok: true, cond, cnt, skId, template };
  }

  function craft(a, b, c) {
    const v = validate(a, b, c);
    if (!v.ok) return v;

    $gameIndependents.gainIndependentItem(v.template, 1);
    const newId = $gameIndependents._independentId - 1;
    const armor = $dataArmors[newId];
    if (!armor) return { ok: false, msg: "Failed to create independent armor instance." };

    armor[DYN_FIELD] = [{ conditionRaw: v.cond, count: v.cnt, skillId: v.skId }];
    armor._customName = buildGlyphName(a, b, c);

    const clause = reactClauseFromConditionRaw(v.cond);
    const skNm = skillName(v.skId);
    armor.description =
      "Forged from fragments of ancient power.\n" +
      `Reacts ${clause}, after reacting ${v.cnt} time(s), activate ${skNm} at the end of the turn.`;

    armor._glyphParts = { aId: a.id, bId: b.id, cId: c.id };
    armor._glyphWeight = (glyphWeight(a) + glyphWeight(b) + glyphWeight(c)) || 0;

    $gameParty.loseItem(a, 1);
    $gameParty.loseItem(b, 1);
    $gameParty.loseItem(c, 1);

    return { ok: true, armor };
  }

  // =========================================================
  // Windows
  // =========================================================

  class Window_GlyphPreview extends Window_Base {
    initialize(rect) {
      super.initialize(rect);
      this.opacity = 255;
      this.backOpacity = 255;

      this._a = null; this._b = null; this._c = null;
      this._weight = 0;
      this.refresh();
    }

    setSelections(a, b, c, weight) {
      this._a = a; this._b = b; this._c = c;
      this._weight = weight || 0;
      this.refresh();
    }

    _previewParts() {
      const clause = this._a ? reactClauseFromConditionRaw(glyphCondition(this._a)) : "when the bearer ...";
      const cntTxt = this._b ? `${glyphCount(this._b)} time(s)` : "X time(s)";
      const skTxt = this._c ? skillName(glyphSkillId(this._c)) : "a skill";

      return [
        { text: "Reacts ", color: null },
        { text: clause, color: this._a ? highlightColor() : null },
        { text: ", after reacting ", color: null },
        { text: cntTxt, color: this._b ? highlightColor() : null },
        { text: ", activate ", color: null },
        { text: skTxt, color: this._c ? highlightColor() : null },
        { text: " at the end of the turn.", color: null },
      ];
    }

    _wrapColoredParts(parts, maxWidth) {
      const tokens = [];
      for (const p of parts) {
        const pieces = String(p.text || "").split(/(\s+)/);
        for (const t of pieces) {
          if (t === "") continue;
          tokens.push({ text: t, color: p.color || null });
        }
      }

      const lines = [];
      let current = [];
      let width = 0;

      for (const tok of tokens) {
        const w = this.textWidth(tok.text);
        if (width + w <= maxWidth || current.length === 0) {
          current.push(tok);
          width += w;
        } else {
          lines.push(current);
          current = [tok];
          width = w;
        }
      }
      if (current.length) lines.push(current);

      for (const line of lines) {
        while (line.length && /^\s+$/.test(line[0].text)) line.shift();
      }
      return lines;
    }

    refresh() {
      this.contents.clear();
      const lh = this.lineHeight();
      const iw = this.innerWidth;
      const ih = this.innerHeight;

      // Reserve bottom line for Weight
      const weightY = Math.max(0, ih - lh);
      const maxTextY = Math.max(0, weightY - 6);

      // Preview (clamped)
      const parts = this._previewParts();
      const lines = this._wrapColoredParts(parts, iw);

      let y = 0;
      for (const lineParts of lines) {
        if (y + lh > maxTextY) break;
        drawInlineColored(this, 0, y, lineParts);
        y += lh;
      }
      y += 6;

      // Skill effect (clamped)
      if (this._c && y + lh <= maxTextY) {
        const id = glyphSkillId(this._c);
        const desc = skillDesc(id);
        if (desc) {
          if (y + lh <= maxTextY) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText("Skill effect:", 0, y, iw);
            this.resetTextColor();
            y += lh;
          }

          const descLines = wrapText(this, desc, iw).slice(0, 2);
          for (const dl of descLines) {
            if (y + lh > maxTextY) break;
            this.drawText(dl, 0, y, iw);
            y += lh;
          }
        }
      }

      // Weight always visible
      const over = this._weight > MAX_WEIGHT;

      this.changeTextColor(ColorManager.systemColor());
      this.drawText("Weight:", 0, weightY, 120);
      this.resetTextColor();

      drawInlineColored(this, 120, weightY, [
        { text: `${this._weight}`, color: over ? highlightColor() : null },
        { text: `/${MAX_WEIGHT}`, color: null },
      ]);

      if (over) {
        this.changeTextColor(highlightColor());
        this.drawText("Overweight (craft disabled)", 260, weightY, iw - 260, "left");
        this.resetTextColor();
      }
    }
  }

  class Window_GlyphListSimple extends Window_Selectable {
    initialize(rect, typeLetter) {
      super.initialize(rect);
      this._type = typeLetter;
      this._data = [];
      this.refresh();
      this.select(0);
    }

    makeItemList() {
      const all = $gameParty.allItems().filter(i => DataManager.isItem(i));
      this._data = all.filter(i => glyphType(i) === this._type && $gameParty.numItems(i) > 0);
    }

    refresh() {
      this.makeItemList();
      this.createContents();
      this.drawAllItems();
    }

    maxItems() { return this._data.length; }
    item() { return this._data[this.index()]; }

    drawItem(index) {
      const item = this._data[index];
      if (!item) return;
      const rect = this.itemRectWithPadding(index);
      this.drawItemName(item, rect.x, rect.y, rect.width - 60);
      this.drawText(`x${$gameParty.numItems(item)}`, rect.x, rect.y, rect.width, "right");
    }

    processTouch() {
      if (this.isOpen() && this.visible && TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this.activate();
      }
      super.processTouch();
    }
  }

  class Window_GlyphListPopup extends Window_GlyphListSimple {
    initialize(rect) {
      super.initialize(rect, "A");
      this.openness = 0;
      this.deactivate();
      this.opacity = 255;
      this.backOpacity = 255;
    }

    openForType(typeLetter) {
      this._type = typeLetter;
      this.refresh();
      this.select(0);
      this.open();
      this.activate();
    }

    closePopup() {
      this.deactivate();
      this.close();
    }
  }

  // -----------------------------
  // Single menu: A/B/C + Confirm + Cancel
  // -----------------------------
  class Window_GlyphRecipeMenu extends Window_Selectable {
    initialize(rect) {
      super.initialize(rect);
      this.opacity = 255;
      this.backOpacity = 255;

      this._selA = null;
      this._selB = null;
      this._selC = null;
      this._canConfirm = false;

      this.refresh();
      this.select(0);
      this.activate();
    }

    maxItems() { return 5; }
    itemHeight() { return this.lineHeight() + 10; }

    setSelections(a, b, c, canConfirm) {
      this._selA = a; this._selB = b; this._selC = c;
      this._canConfirm = !!canConfirm;
      this.refresh();
    }

    isConfirmIndex() { return this.index() === 3; }
    isCancelIndex() { return this.index() === 4; }

    currentSlotLetter() {
      if (this.index() === 0) return "A";
      if (this.index() === 1) return "B";
      if (this.index() === 2) return "C";
      return "";
    }

    isCurrentItemEnabled() {
      if (this.index() === 3) return this._canConfirm; // Confirm
      return true;
    }

    drawItem(index) {
      const rect = this.itemRectWithPadding(index);
      const iw = rect.width;
      const system = ColorManager.systemColor();
      const empty = ColorManager.textColor(7);

      // Columns
      const labelW = 180;
      const valueX = rect.x + labelW;
      const valueW = iw - labelW;

      // Row content
      if (index <= 2) {
        let label = "";
        let value = "";
        let isSet = false;

        if (index === 0) { label = "Condition"; isSet = !!this._selA; value = this._selA ? this._selA.name : "— Choose (A) —"; }
        if (index === 1) { label = "Count";     isSet = !!this._selB; value = this._selB ? this._selB.name : "— Choose (B) —"; }
        if (index === 2) { label = "Skill";     isSet = !!this._selC; value = this._selC ? this._selC.name : "— Choose (C) —"; }

        this.changeTextColor(system);
        this.drawText(label + " :", rect.x, rect.y, labelW);
        this.resetTextColor();

        if (!isSet) this.changeTextColor(empty);
        this.drawText(value, valueX, rect.y, valueW, "left");
        this.resetTextColor();

        // subtle chevron hint (optional but nice)
        this.changeTextColor(system);
        this.drawText("▶", rect.x, rect.y, iw, "right");
        this.resetTextColor();
        return;
      }

      // Confirm / Cancel rows
      if (index === 3) {
        const enabled = this._canConfirm;
        if (!enabled) this.changeTextColor(ColorManager.textColor(8)); // disabled-ish
        this.drawText("Confirm craft", rect.x, rect.y, iw, "center");
        this.resetTextColor();
        return;
      }

      if (index === 4) {
        this.changeTextColor(system);
        this.drawText("Cancel", rect.x, rect.y, iw, "center");
        this.resetTextColor();
      }
    }
  }

  // =========================================================
  // Scene
  // =========================================================
  class Scene_GlyphCraft extends Scene_Base {
    create() {
      super.create();
      this.createBackground();
      this.createWindowLayer();

      this._selA = null;
      this._selB = null;
      this._selC = null;

      this.createWindows();
      this.refreshAll();

      this._menu.activate();
      this._menu.select(0);
    }

    createBackground() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this.addChild(this._backgroundSprite);
    }

    createWindows() {
      const w = Graphics.boxWidth;
      const h = Graphics.boxHeight;

      const previewH = Math.floor(h * 0.34);
      const menuY = previewH;
      const menuH = h - previewH;

      this._preview = new Window_GlyphPreview(new Rectangle(0, 0, w, previewH));
      this.addWindow(this._preview);

      this._menu = new Window_GlyphRecipeMenu(new Rectangle(0, menuY, w, menuH));
      this._menu.setHandler("ok", () => this.onMenuOk());
      this._menu.setHandler("cancel", () => this.onCancel());
      this.addWindow(this._menu);

      // Popup centered
      const popW = Math.floor(w * 0.80);
      const popH = Math.floor(h * 0.55);
      const popX = Math.floor((w - popW) / 2);
      const popY = Math.floor((h - popH) / 2);

      this._popup = new Window_GlyphListPopup(new Rectangle(popX, popY, popW, popH));
      this._popup.setHandler("ok", () => this.onPopupPick());
      this._popup.setHandler("cancel", () => this.onPopupCancel());
      this.addWindow(this._popup);
    }

    totalWeight() {
      return (this._selA ? glyphWeight(this._selA) : 0)
        + (this._selB ? glyphWeight(this._selB) : 0)
        + (this._selC ? glyphWeight(this._selC) : 0);
    }

    canConfirm() {
      const complete = !!(this._selA && this._selB && this._selC);
      const okWeight = this.totalWeight() <= MAX_WEIGHT;
      return complete && okWeight;
    }

    refreshAll() {
      this._preview.setSelections(this._selA, this._selB, this._selC, this.totalWeight());
      this._menu.setSelections(this._selA, this._selB, this._selC, this.canConfirm());
    }

    // --- Menu actions ---
    onMenuOk() {
      const i = this._menu.index();

      // A/B/C selection opens popup
      if (i <= 2) {
        const letter = this._menu.currentSlotLetter();
        this._popup.openForType(letter);
        this._menu.deactivate();
        return;
      }

      // Confirm
      if (i === 3) {
        if (!this.canConfirm()) return SoundManager.playBuzzer();
        return this.onConfirm();
      }

      // Cancel
      if (i === 4) {
        return this.popScene();
      }
    }

    onConfirm() {
      const res = craft(this._selA, this._selB, this._selC);
      if (!res.ok) {
        SoundManager.playBuzzer();
        $gameMessage.add(res.msg);
        this.refreshAll();
        return;
      }

      SoundManager.playOk();
      $gameMessage.add(`Crafted: ${res.armor._customName || res.armor.name}`);
      AudioManager.playSe({ name: "success", volume: 90, pitch: 100, pan: 0 });
      this.popScene();
    }

    // --- Popup flow ---
    onPopupPick() {
      const item = this._popup.item();
      if (!item) return SoundManager.playBuzzer();

      const type = this._popup._type;
      if (type === "A") this._selA = item;
      if (type === "B") this._selB = item;
      if (type === "C") this._selC = item;

      SoundManager.playOk();
      this._popup.closePopup();
      this._menu.activate();
      this.refreshAll();

      // comfort: move down but stop before Confirm/Cancel
      const idx = this._menu.index();
      if (idx < 2) this._menu.select(idx + 1);
    }

    onPopupCancel() {
      SoundManager.playCancel();
      this._popup.closePopup();
      this._menu.activate();
    }

    onCancel() {
      // If popup is open => close it first
      if (this._popup.isOpen() && this._popup.active) {
        return this.onPopupCancel();
      }
      this.popScene();
    }

    update() {
      super.update();

      // Bonus keyboard: SHIFT crafts directly (if ready), only when popup is closed
      if (Input.isTriggered("shift") && !this._popup.active) {
        if (this.canConfirm()) this.onConfirm();
        else SoundManager.playBuzzer();
      }
    }
  }

  // -----------------------------
  // Optional: custom name patch (inventory display)
  // -----------------------------
  if (USE_CUSTOM_NAME_PATCH) {
    const _drawItemName = Window_Base.prototype.drawItemName;
    Window_Base.prototype.drawItemName = function(item, x, y, width) {
      if (item && item._customName) {
        this.resetTextColor();
        this.drawIcon(item.iconIndex || 0, x, y);
        this.drawText(item._customName, x + 36, y, width - 36);
        return;
      }
      _drawItemName.call(this, item, x, y, width);
    };
  }

  // -----------------------------
  // Public API
  // -----------------------------
  window.GlyphCraftUI ??= {};
  window.GlyphCraftUI.open = function() {
    SceneManager.push(Scene_GlyphCraft);
  };
})();