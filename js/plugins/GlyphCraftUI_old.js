/*:
 * @target MZ
 * @plugindesc Glyph Craft UI (Pro v4) - Bigger multi-line Preview + weight + skill description, lists smaller (scroll), crafts DM_IndependentItems armor, exits on success.
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
  // Meta helpers (trim)
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
  // UI helpers (highlight)
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

  // split long text into wrapped lines based on window width
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
        // if a single word is too long, hard cut
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
  // Only returns the "when/if ..." clause
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
      case "skill_type_use": if (arg === "1") return "when the bearer uses a skill"; if (arg === "2") return "when the bearer uses an EX"; return "when the bearer uses a skill";
      case "damage_taken_skill_type": return arg ? `when the bearer takes damage from special attacks` : "when the bearer takes damage from a given skill type";
      case "damage_dealt_this_turn": return arg ? `if the bearer deals at least ${arg} hit(s) of damage this turn` : "if the bearer deals enough hits of damage this turn";
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

  // -----------------------------
  // Windows
  // -----------------------------
  class Window_GlyphPreview extends Window_Base {
    initialize(rect) {
      super.initialize(rect);
      this._a = null; this._b = null; this._c = null;
      this._weight = 0;
      this.refresh();
    }

    setSelections(a, b, c, weight) {
      this._a = a; this._b = b; this._c = c;
      this._weight = weight || 0;
      this.refresh();
    }

    // Build preview as colored parts
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

    // Convert colored parts to wrapped lines, keeping color per segment
    _wrapColoredParts(parts, maxWidth) {
      // We'll wrap by words while preserving colors by splitting parts into tokens.
      const tokens = [];
      for (const p of parts) {
        const pieces = String(p.text || "").split(/(\s+)/); // keep spaces
        for (const t of pieces) {
          if (t === "") continue;
          tokens.push({ text: t, color: p.color || null });
        }
      }

      const lines = [];
      let current = [];
      let width = 0;

      const tokenWidth = (t) => this.textWidth(t.text);

      for (const tok of tokens) {
        const w = tokenWidth(tok);
        if (width + w <= maxWidth || current.length === 0) {
          current.push(tok);
          width += w;
        } else {
          // new line
          lines.push(current);
          current = [tok];
          width = w;
        }
      }
      if (current.length) lines.push(current);

      // trim leading spaces per line
      for (const line of lines) {
        while (line.length && /^\s+$/.test(line[0].text)) line.shift();
      }
      return lines;
    }

    refresh() {
      this.contents.clear();
      const lh = this.lineHeight();
      const iw = this.innerWidth;

      // --- Preview multi-line
      const parts = this._previewParts();
      const lines = this._wrapColoredParts(parts, iw);

      let y = 0;
      for (const lineParts of lines) {
        drawInlineColored(this, 0, y, lineParts);
        y += lh;
      }
      y += 6;

      // --- Skill description line(s) under preview
      if (this._c) {
        const id = glyphSkillId(this._c);
        const desc = skillDesc(id);
        if (desc) {
          this.changeTextColor(ColorManager.systemColor());
          this.drawText("Skill effect:", 0, y, iw);
          this.resetTextColor();
          y += lh;

          const descLines = wrapText(this, desc, iw);
          // show up to 2 lines to keep UI clean
          const show = descLines.slice(0, 2);
          for (const dl of show) {
            this.drawText(dl, 0, y, iw);
            y += lh;
          }
          if (descLines.length > 2) {
            this.changeTextColor(ColorManager.systemColor());
            this.drawText("…", 0, y - lh / 2, iw);
            this.resetTextColor();
          }
          y += 6;
        }
      }

      // --- Weight
      const over = this._weight > MAX_WEIGHT;

      this.changeTextColor(ColorManager.systemColor());
      this.drawText("Weight:", 0, y, 120);
      this.resetTextColor();

      drawInlineColored(this, 120, y, [
        { text: `${this._weight}`, color: over ? highlightColor() : null },
        { text: `/${MAX_WEIGHT}`, color: null },
      ]);

      if (over) {
        this.changeTextColor(highlightColor());
        this.drawText("Overweight (craft disabled)", 260, y, iw - 260, "left");
        this.resetTextColor();
      }
    }
  }

  class Window_GlyphListSimple extends Window_Selectable {
    initialize(rect, typeLetter, title) {
      super.initialize(rect);
      this._type = typeLetter;
      this._title = title;
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

    drawAllItems() {
      this.contents.clear();
      this.changeTextColor(ColorManager.systemColor());
      this.drawText(this._title, 0, 0, this.innerWidth, "center");
      this.resetTextColor();

      this._topPad = this.lineHeight() + 6;
      for (let i = 0; i < this.maxItems(); i++) this.drawItem(i);
    }

    itemRect(index) {
      const rect = super.itemRect(index);
      rect.y += (this._topPad || 0);
      return rect;
    }

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

  class Window_GlyphActions extends Window_HorzCommand {
    initialize(rect) {
      super.initialize(rect);
      this._canConfirm = false;
      this.refresh();
      this.select(0);
    }
    maxCols() { return 2; }
    makeCommandList() {
      this.addCommand("Cancel", "cancel", true);
      this.addCommand("Confirm craft", "confirm", this._canConfirm);
    }
    setCanConfirm(b) {
      this._canConfirm = !!b;
      this.refresh();
    }
    processTouch() {
      if (this.isOpen() && this.visible && TouchInput.isTriggered() && this.isTouchedInsideFrame()) {
        this.activate();
      }
      super.processTouch();
    }
  }

  // -----------------------------
  // Scene
  // -----------------------------
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

      // Initial focus: only list A cursor
      this.focusList(this._listA);
      this._listB.select(-1);
      this._listC.select(-1);
    }

    createBackground() {
      this._backgroundSprite = new Sprite();
      this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
      this.addChild(this._backgroundSprite);
    }

    createWindows() {
      const w = Graphics.boxWidth;
      const h = Graphics.boxHeight;

      // --- More space for Preview, less for lists
      const previewH = Math.floor(h * 0.35); // ~35% of screen height
      const actionsH = 72;
      const listY = previewH;
      const listH = h - previewH - actionsH;

      this._preview = new Window_GlyphPreview(new Rectangle(0, 0, w, previewH));
      this.addWindow(this._preview);

      const colW = Math.floor(w / 3);
      const colW3 = w - colW * 2;

      this._listA = new Window_GlyphListSimple(new Rectangle(0, listY, colW, listH), "A", "A — Condition");
      this._listB = new Window_GlyphListSimple(new Rectangle(colW, listY, colW, listH), "B", "B — Count");
      this._listC = new Window_GlyphListSimple(new Rectangle(colW * 2, listY, colW3, listH), "C", "C — Skill");

      this._listA.setHandler("ok", () => this.onPick("A"));
      this._listB.setHandler("ok", () => this.onPick("B"));
      this._listC.setHandler("ok", () => this.onPick("C"));

      this._listA.setHandler("cancel", () => this.popScene());
      this._listB.setHandler("cancel", () => this.popScene());
      this._listC.setHandler("cancel", () => this.popScene());

      this.addWindow(this._listA);
      this.addWindow(this._listB);
      this.addWindow(this._listC);

      this._actions = new Window_GlyphActions(new Rectangle(0, h - actionsH, w, actionsH));
      this._actions.setHandler("cancel", () => this.popScene());
      this._actions.setHandler("confirm", () => this.onConfirm());
      this.addWindow(this._actions);
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
      this._listA.refresh();
      this._listB.refresh();
      this._listC.refresh();

      this._preview.setSelections(this._selA, this._selB, this._selC, this.totalWeight());
      this._actions.setCanConfirm(this.canConfirm());
    }

    focusList(listWin) {
      for (const w of [this._listA, this._listB, this._listC]) {
        if (w === listWin) continue;
        w.deactivate();
        w.select(-1);
      }
      this._actions.deactivate();

      listWin.activate();
      if (listWin.index() < 0) listWin.select(0);
    }

    onPick(letter) {
      const win = letter === "A" ? this._listA : letter === "B" ? this._listB : this._listC;
      const item = win.item();
      if (!item) return SoundManager.playBuzzer();

      if (letter === "A") this._selA = item;
      if (letter === "B") this._selB = item;
      if (letter === "C") this._selC = item;

      SoundManager.playOk();
      this.refreshAll();

      if (!this._selA) return this.focusList(this._listA);
      if (!this._selB) return this.focusList(this._listB);
      if (!this._selC) return this.focusList(this._listC);

      // ready -> actions
      this._listA.deactivate(); this._listA.select(-1);
      this._listB.deactivate(); this._listB.select(-1);
      this._listC.deactivate(); this._listC.select(-1);

      this._actions.activate();
      this._actions.select(this.canConfirm() ? 1 : 0);
    }

    onConfirm() {
      if (!this.canConfirm()) {
        SoundManager.playBuzzer();
        return;
      }

      const res = craft(this._selA, this._selB, this._selC);
      if (!res.ok) {
        SoundManager.playBuzzer();
        $gameMessage.add(res.msg);
        this.refreshAll();
        return;
      }

      SoundManager.playOk();
      $gameMessage.add(`Crafted: ${res.armor._customName || res.armor.name}`);
      AudioManager.playSe({
        name: "success", 
        volume: 90,
        pitch: 100,
        pan: 0
      });
      this.popScene();
    }

    update() {
      super.update();

      if (Input.isTriggered("cancel")) {
        if (!this._actions.active) this.popScene();
      }

      if (this._listA.active || this._listB.active || this._listC.active) {
        if (Input.isTriggered("right")) {
          if (this._listA.active) this.focusList(this._listB);
          else if (this._listB.active) this.focusList(this._listC);
        } else if (Input.isTriggered("left")) {
          if (this._listC.active) this.focusList(this._listB);
          else if (this._listB.active) this.focusList(this._listA);
        }
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
