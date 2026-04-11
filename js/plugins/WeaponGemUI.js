/*:
 * @target MZ
 * @plugindesc v2.6-skin — Gem socketing UI (inventory-only). Même apparence que ta v2.6. Utilise WeaponUpg.* (Core) pour insérer et afficher les totaux.
 * @author You
 *
 * @command OpenGemUI
 * @text Open Gem UI
 *
 * @param OwnedOnly
 * @text Show Owned Gems Only
 * @type boolean
 * @default true
 *
 * @param GemNameRegex
 * @text Gem Name Regex
 * @type string
 * @default (.*)\\s+Gem\\s+(I|II|III|IV|V)$
 *
 * @param EmptySlotIcon
 * @type number
 * @default 589
 * @param LockedSlotIcon
 * @type number
 * @default 590
 * @param ReturnColorIndex
 * @type number
 * @min 0 @max 31
 * @default 4
 * @param SlotIconScale
 * @type number @decimals 2
 * @min 1.00 @max 3.00
 * @default 2.00
 *
 * @param SlotNameFontSize
 * @text Slot Name Font Size
 * @type number @min 10 @max 64
 * @default 24
 *
 * @param SlotParamFontSize
 * @text Slot Param Font Size
 * @type number @min 10 @max 64
 * @default 20
 *
 * @param SlotNameGap
 * @text Gap below Gem Name
 * @type number @min 0 @max 24
 * @default 6
 *
 * @param SlotBonusLines
 * @text Max Bonus Lines per Slot
 * @type number @min 1 @max 3
 * @default 2
 *
 * @param ContentWidth
 * @type number @decimals 2
 * @min 0.50 @max 1.00
 * @default 0.78
 * @param TopHelpOffset
 * @type number @min 0 @max 96
 * @default 48
 * @param TopGap
 * @type number @min 0 @max 64
 * @default 8
 * @param BottomSplit
 * @type number @decimals 2
 * @min 0.40 @max 0.90
 * @default 0.70
 * @param MaxSlots
 * @type number @min 1 @max 6
 * @default 5
 * @param UnlockLevels
 * @type string
 * @default 2,4,6,8,10
 *
 * @param UIStrings
 * @type struct<UIStrings>
 * @default {"titleChoose":"Gems — Choose a weapon","instructionChoose":"Choose the weapon to socket a gem.","noEligible":"You have no weapons with unlocked gem slots in your inventory.","btnReturn":"Return","titleBonuses":"Total Gem bonuses:","labelGemSlots":"Gem Slots:","labelGemInventory":"Gem Inventory:","labelLocked":"Locked","labelRequires":"Requires +%1","labelEmpty":"Empty","btnInsert":"Insert","btnBack":"Back","toastInsert":"Gem socketed!","toastReplace":"Gem replaced.","errLocked":"Slot is locked. Unlocks at +%1.","errNoUnlocked":"No unlocked gem slots on this weapon.","errNoGems":"No compatible gems.","confirmReplace":"Replace \"%1\"\\nwith \"%2\"?","confirmYes":"Yes","confirmNo":"No"}
 */
/*~struct~UIStrings:
 * @param titleChoose @default Gems — Choose a weapon
 * @param instructionChoose @default Choose the weapon to socket a gem.
 * @param noEligible @default You have no weapons with unlocked gem slots in your inventory.
 * @param btnReturn @default Return
 * @param titleBonuses @default Total Gem bonuses:
 * @param labelGemSlots @default Gem Slots:
 * @param labelGemInventory @default Gem Inventory:
 * @param labelLocked @default Locked
 * @param labelRequires @default Requires +%1
 * @param labelEmpty @default Empty
 * @param btnInsert @default Insert
 * @param btnBack @default Back
 * @param toastInsert @default Gem socketed!
 * @param toastReplace @default Gem replaced.
 * @param errLocked @default Slot is locked. Unlocks at +%1.
 * @param errNoUnlocked @default No unlocked gem slots on this weapon.
 * @param errNoGems @default No compatible gems.
 * @param confirmReplace @default Replace "%1"\nwith "%2"?
 * @param confirmYes @default Yes
 * @param confirmNo @default No
 */

(()=>{ 'use strict';

  // ----- Params / Utils
  const FALLBACK='WeaponGemUI';
  const scripts=document.getElementsByTagName('script');
  const src=(document.currentScript&&document.currentScript.src)||(scripts.length?scripts[scripts.length-1].src:"");
  const m=src.match(/([^\/]+)\.js$/);
  const PNAME = m?decodeURIComponent(m[1]):FALLBACK;
  const PP = PluginManager.parameters(PNAME);

  const OWNED_ONLY = String(PP.OwnedOnly||'true')==='true';
  const GEM_RE_SRC = PP.GemNameRegex || '(.*)\\s+Gem\\s+(I|II|III|IV|V)$';
  const GEM_RE = new RegExp(GEM_RE_SRC,'i');
  const ICON_EMPTY  = Number(PP.EmptySlotIcon||589);
  const ICON_LOCKED = Number(PP.LockedSlotIcon||590);
  const RETURN_COL  = Number(PP.ReturnColorIndex||4);
  const SLOT_SCALE  = Number(PP.SlotIconScale||2.00);
  const SLOT_NAME_FS = Number(PP.SlotNameFontSize||24);
  const SLOT_PARAM_FS = Number(PP.SlotParamFontSize||20);
  const SLOT_NAME_GAP = Number(PP.SlotNameGap||6);
  const SLOT_BONUS_LINES = Math.max(1, Math.min(3, Number(PP.SlotBonusLines||2)));
  const CONTENT_W   = Number(PP.ContentWidth||0.78);
  const HELP_Y      = Number(PP.TopHelpOffset||48);
  const TOP_GAP     = Number(PP.TopGap||8);
  const SPLIT       = Number(PP.BottomSplit||0.70);
  const MAX_SLOTS   = Number(PP.MaxSlots||5);
  const UNLOCK      = String(PP.UnlockLevels||'2,4,6,8,10').split(',').map(s=>Number(s.trim())).filter(n=>!Number.isNaN(n));

  const UI = (()=>{ const r=PP.UIStrings?JSON.parse(PP.UIStrings):{};
    return {
      titleChoose:r.titleChoose||'Gems — Choose a weapon',
      instructionChoose:r.instructionChoose||'Choose the weapon to socket a gem.',
      noEligible:r.noEligible||'You have no weapons with unlocked gem slots in your inventory.',
      btnReturn:r.btnReturn||'Return',
      titleBonuses:r.titleBonuses||'Total Gem bonuses:',
      labelGemSlots:r.labelGemSlots||'Gem Slots:',
      labelGemInventory:r.labelGemInventory||'Gem Inventory:',
      labelLocked:r.labelLocked||'Locked',
      labelRequires:r.labelRequires||'Requires +%1',
      labelEmpty:r.labelEmpty||'Empty',
      btnInsert:r.btnInsert||'Insert',
      btnBack:r.btnBack||'Back',
      toastInsert:r.toastInsert||'Gem socketed!',
      toastReplace:r.toastReplace||'Gem replaced.',
      errLocked:r.errLocked||'Slot is locked. Unlocks at +%1.',
      errNoUnlocked:r.errNoUnlocked||'No unlocked gem slots on this weapon.',
      errNoGems:r.errNoGems||'No compatible gems.',

      // ✅ NEW (English)
      confirmReplace: r.confirmReplace || 'Replace "%1"\nwith "%2"?',
      confirmYes: r.confirmYes || 'Yes',
      confirmNo: r.confirmNo || 'No',
    };
  })();

  // % formatter
  if(!String.prototype.format){
    String.prototype.format=function(){ let s=this; for(let i=0;i<arguments.length;i++) s=s.replace('%'+(i+1), arguments[i]); return s; };
  }

  PluginManager.registerCommand(PNAME,'OpenGemUI',()=>SceneManager.push(Scene_GemManage));

  // roman
  function romanToInt(s){ const map={I:1,V:5,X:10,L:50,C:100,D:500,M:1000}; let t=0,p=0; for(let i=s.length-1;i>=0;i--){ const v=map[s[i].toUpperCase()]||0; if(v<p) t-=v; else t+=v; p=v; } return t; }
  function parseGemName(n){ const r=n.match(GEM_RE); if(!r) return {base:n,level:0}; return {base:r[1].trim(),level:romanToInt(r[2])}; }

  // Core helpers (toutes avec gardes)
  const Upg = window.WeaponUpg || {};
  function currentLevelOf(w){ if(!w) return 0; return Upg.currentLevelOf ? (Upg.currentLevelOf(w)|0) : 0; }
  function slotsAtLevel(L){
    if(Upg.slotsAtLevel) return Upg.slotsAtLevel(L)|0;
    let c=0; for(const t of UNLOCK) if((L|0)>=t) c++; return Math.min(c,MAX_SLOTS);
  }
  function slotCountOf(w){ if(!w) return 0; return Upg.slotCountOf ? (Upg.slotCountOf(w)|0) : slotsAtLevel(currentLevelOf(w)); }
  function slotsOf(w){ if(!w) return []; return Upg.slotsOf ? (Upg.slotsOf(w)||[]) : []; }
  function totalsOf(w){ if(!w) return {}; return Upg.totalsOf ? (Upg.totalsOf(w)||{}) : {}; }
  function applyGemTo(w,idx,gemId){ if(!w) return {ok:false}; return Upg.applyGemTo ? Upg.applyGemTo(w,idx,gemId) : {ok:false}; }

  // lisibilité des totaux
  const LABEL = ["MHP","MMP","ATK","DEF","MAT","MDF","AGI","LUK"];
  function linesFromTotals(obj){
    const a=[];
    for(let pid=0;pid<8;pid++){
      const v=obj[pid]|0; if(v) a.push(`${LABEL[pid]} ${v>0?'+':''}${v}`);
    }
    return a;
  }
  function paramLinesFromSlot(slot, maxLines=2){
    const out=[]; if(!slot || !slot.bonuses) return out;
    for(let pid=0; pid<8; pid++){
      const v=(slot.bonuses[pid]|0); if(v){ out.push(`${LABEL[pid]} ${v>0?'+':''}${v}`); if(out.length>=maxLines) break; }
    }
    return out;
  }

  function isGemItem(it){
    if(!it) return false;
    if(GEM_RE.test(it.name)) return true;
    if(it.note && /<\s*UpgradeGem\s*>/i.test(it.note)) return true;
    if(it.note && /<\s*GemParams\s*:/i.test(it.note)) return true;
    if(it.note && /<\s*GemBonus\s*:/i.test(it.note)) return true;
    return false;
  }

  // inventaire uniquement
  function listInventoryWeapons(){ return $gameParty.weapons().map(w=>({weapon:w})); }
  function listCandidates(){ return listInventoryWeapons().filter(e=> slotCountOf(e.weapon)>=1 ); }

  // ---------- Scene 1 : Choose weapon ----------
  function Scene_GemManage(){ this.initialize(...arguments); }
  Scene_GemManage.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_GemManage.prototype.constructor = Scene_GemManage;
  Scene_GemManage.prototype.create = function(){
    Scene_MenuBase.prototype.create.call(this);

    const cw = Math.floor(Graphics.boxWidth*CONTENT_W);
    const x  = Math.floor((Graphics.boxWidth-cw)/2);

    const helpRect = new Rectangle(x, HELP_Y, cw, this.calcWindowHeight(1,true));
    this._helpWindow = new Window_Help(helpRect);
    this.addWindow(this._helpWindow);

    const entries = listCandidates();
    this._helpWindow.setText(entries.length ? UI.instructionChoose : UI.noEligible);

    const y = helpRect.y + helpRect.height + TOP_GAP;
    const ch = Graphics.boxHeight - y - TOP_GAP;
    this._list = new Window_GemWeaponList(new Rectangle(x,y,cw,ch));
    this._list.setHandler('ok', this.onOk.bind(this));
    this._list.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._list);

    this._list.activate(); this._list.select(0);
  };
  Scene_GemManage.prototype.onOk = function(){
    const e=this._list.currentEntry();
    if(!e){ SoundManager.playBuzzer(); return; }
    if(e.__return){ this.popScene(); return; }
    Scene_GemDetail._weapon = e.weapon;
    SceneManager.push(Scene_GemDetail);
  };

  function Window_GemWeaponList(){ this.initialize(...arguments); }
  Window_GemWeaponList.prototype = Object.create(Window_Selectable.prototype);
  Window_GemWeaponList.prototype.constructor = Window_GemWeaponList;
  Window_GemWeaponList.prototype.initialize = function(rect){ Window_Selectable.prototype.initialize.call(this,rect); this.refresh(); this.select(0); };
  Window_GemWeaponList.prototype.maxItems = function(){ return (this._data?this._data.length:0)+1; };
  Window_GemWeaponList.prototype.currentEntry = function(){ const i=this.index(); if(i===this.maxItems()-1) return {__return:true}; return this._data && this._data[i]; };
  Window_GemWeaponList.prototype.makeItems = function(){
    const scored = (listCandidates()||[]).map(e=>{
      const w=e.weapon, lvl=currentLevelOf(w), unlocked=slotsAtLevel(lvl), slots=slotsOf(w);
      const filled = slots.slice(0,unlocked).filter(s=>s&&s.itemId).length;
      const free = Math.max(0, unlocked - filled);
      return {entry:e,free,lvl,name:w.name};
    });
    scored.sort((a,b)=>(b.free-a.free)||(b.lvl-a.lvl)||a.name.localeCompare(b.name));
    this._data = scored.map(s=>s.entry);
  };
  Window_GemWeaponList.prototype.refresh = function(){ this.makeItems(); this.createContents(); this.drawAllItems(); };
  Window_GemWeaponList.prototype.drawItem = function(index){
    const rect = this.itemRectWithPadding(index);

    // Ligne "Return"
    if(index===this.maxItems()-1){
      this.changeTextColor(ColorManager.textColor(RETURN_COL));
      this.drawText(UI.btnReturn, rect.x, rect.y, rect.width, 'center');
      this.resetTextColor();
      return;
    }

    const e=this._data[index]; if(!e) return;
    const w=e.weapon;
    const lvl=currentLevelOf(w), unlocked=slotsAtLevel(lvl), ss=slotsOf(w);
    const name = lvl>0 ? `${w.name} +${lvl}` : w.name;

    // Nom
    this.resetTextColor();
    this.drawText(name, rect.x, rect.y, rect.width);

    // Icônes de slots collées au nom
    const margin=16;
    let x = rect.x + this.textWidth(name) + margin;
    const y = rect.y + (this.lineHeight()-ImageManager.iconHeight)/2;
    for(let i=0;i<MAX_SLOTS;i++){
      let icon;
      if(i<unlocked){
        const s=ss[i];
        icon = (s && s.itemId && $dataItems[s.itemId] ? $dataItems[s.itemId].iconIndex : ICON_EMPTY);
      }else{
        icon = ICON_LOCKED;
      }
      this.drawIcon(icon, x, y);
      x += ImageManager.iconWidth + 4;
    }
  };

  // ---------- Scene 2 : Detail ----------
  function Scene_GemDetail(){ this.initialize(...arguments); }
  Scene_GemDetail.prototype = Object.create(Scene_MenuBase.prototype);
  Scene_GemDetail.prototype.constructor = Scene_GemDetail;

  // ✅ NEW: confirm handlers + helper apply
  Scene_GemDetail.prototype.applyGemNow = function(idx, gem, wasReplace){
    const res = applyGemTo(this._weapon, idx, gem.id);
    if(!res || !res.ok){ SoundManager.playBuzzer(); this._gems.activate(); return; }

    // consume after success
    $gameParty.loseItem(gem, 1, false);

    SoundManager.playOk();
    this.showToast(wasReplace ? UI.toastReplace : UI.toastInsert);

    const gi = this._gems.index();
    this._slots.refresh(); this._tot.refresh(); this._gems.refresh();
    this._gems.activate();
    this._gems.select(Math.min(gi, this._gems.maxItems()-1));
  };

  Scene_GemDetail.prototype.onConfirmYes = function(){
    const p = this._pendingReplace;
    this._pendingReplace = null;
    this._confirm.close();
    this._confirm.deactivate();
    if(!p){ this._gems.activate(); return; }
    this.applyGemNow(p.idx, p.gem, true);
  };

  Scene_GemDetail.prototype.onConfirmNo = function(){
    this._pendingReplace = null;
    this._confirm.close();
    this._confirm.deactivate();
    this._gems.activate();
  };

  Scene_GemDetail.prototype.create = function(){
    Scene_MenuBase.prototype.create.call(this);
    this._weapon = Scene_GemDetail._weapon;
    if(!this._weapon){ SoundManager.playBuzzer(); this.popScene(); return; }

    const cw = Math.floor(Graphics.boxWidth*CONTENT_W);
    const x  = Math.floor((Graphics.boxWidth-cw)/2);

    const helpRect = new Rectangle(x, HELP_Y, cw, this.calcWindowHeight(1,true));
    this._help = new Window_Help(helpRect); this.addWindow(this._help);

    const topRect = new Rectangle(x, helpRect.y+helpRect.height+TOP_GAP, cw, this.calcWindowHeight(1,true));
    this._top = new Window_GemTop(topRect);
    this._top.setHandler('insert', ()=>{ this._slots.activate(); this._slots.select(0); });
    this._top.setHandler('cancel', ()=> this.popScene());
    this.addWindow(this._top);

    const slotsY = topRect.y + topRect.height + TOP_GAP;
    const slotsH = this.calcWindowHeight(4,true);
    this._slots = new Window_GemSlotsIcons(new Rectangle(x, slotsY, cw, slotsH), this._weapon);
    this._slots.setHandler('ok', ()=>{ this._gems.activate(); this._gems.select(0); });
    this._slots.setHandler('cancel', ()=> this._top.activate());
    this.addWindow(this._slots);

    const botY = slotsY + slotsH + TOP_GAP;
    const botH = Graphics.boxHeight - botY - TOP_GAP;
    const listW = Math.floor(cw*SPLIT);
    const totW  = cw - listW;

    const listHeaderH = this.calcWindowHeight(1,true);
    this._gemsHeader = new Window_Base(new Rectangle(x, botY, listW, listHeaderH));
    this.addWindow(this._gemsHeader);
    this._gemsHeader.contents.clear();
    this._gemsHeader.changeTextColor(ColorManager.textColor(RETURN_COL));
    this._gemsHeader.drawText(UI.labelGemInventory, 0, 0, this._gemsHeader.contentsWidth());
    this._gemsHeader.resetTextColor();

    const listY = botY + listHeaderH;
    const listH = botH - listHeaderH;
    this._gems = new Window_GemList(new Rectangle(x, listY, listW, listH));
    this._gems.setHandler('ok', this.onGemOk.bind(this));
    this._gems.setHandler('cancel', ()=> this._slots.activate());
    this.addWindow(this._gems);

    this._tot = new Window_GemTotals(new Rectangle(x+listW, botY, totW, botH), this._weapon);
    this.addWindow(this._tot);

    // ✅ NEW: confirm window (centered, hidden)
    const confirmW = Math.min(520, cw);
    const confirmH = this.calcWindowHeight(4, true); // message (2 lines) + 2 commands
    const confirmX = x + Math.floor((cw - confirmW) / 2);
    const confirmY = Math.floor((Graphics.boxHeight - confirmH) / 2);
    this._confirm = new Window_GemConfirm(new Rectangle(confirmX, confirmY, confirmW, confirmH));
    this._confirm.setHandler('yes', this.onConfirmYes.bind(this));
    this._confirm.setHandler('no', this.onConfirmNo.bind(this));
    this._confirm.setHandler('cancel', this.onConfirmNo.bind(this));
    this.addWindow(this._confirm);
    this._pendingReplace = null;

    this.refreshAll();
    this._top.activate();
  };

  Scene_GemDetail.prototype.refreshAll = function(){ this._help.setText(''); this._slots.refresh(); this._gems.refresh(); this._tot.refresh(); this._top.refresh(); };
  Scene_GemDetail.prototype.showToast = function(t){ this._help.setText(t||''); };

  Scene_GemDetail.prototype.onGemOk = function(){
    if(this._gems.currentIsReturn()){
      this._gems.deselect();
      this._gems.deactivate();
      this._slots.select(-1);
      this._top.activate();
      return;
    }
    const idx = this._slots.index();
    const lvl = currentLevelOf(this._weapon);
    const unlocked = slotsAtLevel(lvl);
    if(idx>=unlocked){
      this.showToast(UI.errLocked.format(String(UNLOCK[idx]||'?')));
      SoundManager.playBuzzer();
      this._slots.activate(); return;
    }
    const gem = this._gems.currentGem();
    if(!gem){ SoundManager.playBuzzer(); this._gems.activate(); return; }
    if($gameParty.numItems(gem)<=0){ this.showToast(UI.errNoGems); SoundManager.playBuzzer(); this._gems.activate(); return; }

    // ✅ NEW: confirm if slot already has a gem
    const ss = slotsOf(this._weapon);
    const curSlot = ss && ss[idx];
    if(curSlot && curSlot.itemId){
      const oldIt = $dataItems[curSlot.itemId];
      const oldName = oldIt ? oldIt.name : 'Gem';
      const newName = gem ? gem.name : 'Gem';

      this._pendingReplace = { idx, gem };
      this._confirm.setMessage(UI.confirmReplace.format(oldName, newName));
      this._confirm.open();
      this._confirm.activate();
      this._confirm.select(0);
      return;
    }

    // slot empty -> normal insert
    this.applyGemNow(idx, gem, false);
  };

  // ---------- NEW WINDOW: Confirm Replace ----------
  function Window_GemConfirm(){ this.initialize(...arguments); }
  Window_GemConfirm.prototype = Object.create(Window_Command.prototype);
  Window_GemConfirm.prototype.constructor = Window_GemConfirm;

  Window_GemConfirm.prototype.initialize = function(rect){
    this._msg = ""; // ✅ important: set before super (prevents undefined.match crashes)
    Window_Command.prototype.initialize.call(this, rect);
    this.openness = 0;
  };

  Window_GemConfirm.prototype.makeCommandList = function(){
    this.addCommand(UI.confirmYes, 'yes');
    this.addCommand(UI.confirmNo, 'no');
  };

  Window_GemConfirm.prototype.setMessage = function(text){
    this._msg = String(text || "");
    this.refresh();
  };

  Window_GemConfirm.prototype.itemRect = function(index){
    const r = Window_Command.prototype.itemRect.call(this, index);
    // leave room for 2 lines of message above
    r.y += this.lineHeight() * 2;
    return r;
  };

  Window_GemConfirm.prototype.refresh = function(){
    Window_Command.prototype.refresh.call(this);
    this.resetTextColor();
    this.drawTextEx(String(this._msg || ""), 0, 0, this.contentsWidth());
  };

  // ---------- Windows ----------
  function Window_GemTop(){ this.initialize(...arguments); }
  Window_GemTop.prototype = Object.create(Window_HorzCommand.prototype);
  Window_GemTop.prototype.constructor = Window_GemTop;
  Window_GemTop.prototype.initialize = function(rect){ this._rect=rect; Window_HorzCommand.prototype.initialize.call(this,rect); };
  Window_GemTop.prototype.windowWidth  = function(){ return this._rect.width; };
  Window_GemTop.prototype.windowHeight = function(){ return this._rect.height; };
  Window_GemTop.prototype.maxCols      = function(){ return 2; };
  Window_GemTop.prototype.makeCommandList = function(){ this.addCommand(UI.btnInsert,'insert'); this.addCommand(UI.btnBack,'cancel'); };
  Window_GemTop.prototype.drawItem = function(index){
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    const s = this.commandSymbol(index);
    this.resetTextColor();
    if (s === 'cancel' || s === 'insert') this.changeTextColor(ColorManager.textColor(RETURN_COL));
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
    this.resetTextColor();
  };

  function Window_GemSlotsIcons(){ this.initialize(...arguments); }
  Window_GemSlotsIcons.prototype = Object.create(Window_Selectable.prototype);
  Window_GemSlotsIcons.prototype.constructor = Window_GemSlotsIcons;
  Window_GemSlotsIcons.prototype.initialize = function(rect, weapon){ Window_Selectable.prototype.initialize.call(this,rect); this._weapon=weapon; this.refresh(); this.select(0); };
  Window_GemSlotsIcons.prototype.maxItems = function(){ return MAX_SLOTS; };
  Window_GemSlotsIcons.prototype.maxCols  = function(){ return MAX_SLOTS; };
  Window_GemSlotsIcons.prototype.numVisibleRows = function(){ return 1; };
  Window_GemSlotsIcons.prototype.itemHeight = function(){ return this.lineHeight()*2.4; };
  Window_GemSlotsIcons.prototype.itemWidth  = function(){ return Math.floor(this.innerWidth / MAX_SLOTS); };
  Window_GemSlotsIcons.prototype.itemRect   = function(i){ const r=Window_Selectable.prototype.itemRect.call(this,i); return r; };
  Window_GemSlotsIcons.prototype.unlockedCount = function(){ return slotCountOf(this._weapon); };
  Window_GemSlotsIcons.prototype.isCurrentItemEnabled = function(){ return this.index()<this.unlockedCount(); };
  Window_GemSlotsIcons.prototype.select = function(index){ const u=this.unlockedCount(); if(u<=0) index=0; if(index>=u) index=Math.max(0,u-1); Window_Selectable.prototype.select.call(this,index); };
  Window_GemSlotsIcons.prototype.cursorRight = function(wrap){ const u=this.unlockedCount(); const i=this.index(); if(i<u-1) this.select(i+1); else if(wrap&&u>0) this.select(0); };
  Window_GemSlotsIcons.prototype.cursorLeft  = function(wrap){ const u=this.unlockedCount(); const i=this.index(); if(i>0) this.select(i-1); else if(wrap&&u>0) this.select(u-1); };

  function drawScaledIcon(win, iconIndex, cx, cy, scale){
    const bmp=ImageManager.loadSystem('IconSet');
    const pw=ImageManager.iconWidth, ph=ImageManager.iconHeight;
    const sx=(iconIndex%16)*pw, sy=Math.floor(iconIndex/16)*ph;
    const dw=Math.round(pw*scale), dh=Math.round(ph*scale);
    const x=Math.round(cx-dw/2), y=Math.round(cy-dh/2);
    win.contents.blt(bmp, sx, sy, pw, ph, x, y, dw, dh);
  }

  Window_GemSlotsIcons.prototype.refresh = function(){
    this.createContents();
    this.contents.clear();
    this.drawAllItems();
  };
  Window_GemSlotsIcons.prototype.drawItem = function(index){
    const rect=this.itemRectWithPadding(index);
    const lvl=currentLevelOf(this._weapon), unlocked=slotsAtLevel(lvl), ss=slotsOf(this._weapon);
    const cx = rect.x + rect.width/2;
    const padTop=0; const iconCY = rect.y + padTop + (ImageManager.iconHeight*SLOT_SCALE)/2;
    const y0 = rect.y + padTop + Math.round(ImageManager.iconHeight*SLOT_SCALE) + 4;

    if(index>=unlocked){
      const req=UNLOCK[index]||'?'; drawScaledIcon(this, ICON_LOCKED, cx, iconCY, SLOT_SCALE);
      this.changePaintOpacity(false);
      this.drawText(UI.labelLocked, rect.x, y0, rect.width, 'center');
      this.drawText(UI.labelRequires.format(String(req)), rect.x, y0+this.lineHeight()*0.8, rect.width, 'center');
      this.changePaintOpacity(true); return;
    }

    const s = ss[index];
    if(!s || !s.itemId){
      drawScaledIcon(this, ICON_EMPTY, cx, iconCY, SLOT_SCALE);
      this.drawText(UI.labelEmpty, rect.x, y0, rect.width, 'center');
      return;
    }

    const it = $dataItems[s.itemId];
    drawScaledIcon(this, (it&&it.iconIndex)||0, cx, iconCY, SLOT_SCALE);
    const prevFS = this.contents.fontSize;
    this.contents.fontSize = SLOT_NAME_FS;
    const nameY = y0 - 2;
    if (it) { this.changeTextColor(ColorManager.textColor(RETURN_COL)); this.drawText(it.name, rect.x, nameY, rect.width, 'center'); this.resetTextColor(); }
    else { this.drawText('Gem', rect.x, nameY, rect.width, 'center'); }

    const lines = paramLinesFromSlot(s, SLOT_BONUS_LINES);
    if (lines.length){
      this.contents.fontSize = SLOT_PARAM_FS;
      let y = nameY + SLOT_NAME_GAP + Math.floor(SLOT_PARAM_FS * 0.1);
      const step = Math.floor(SLOT_PARAM_FS * 1.0) + 2;
      for (const ln of lines){ this.drawText(ln, rect.x, y, rect.width, 'center'); y += step; }
    }
    this.contents.fontSize = prevFS;
  };

  function Window_GemTotals(){ this.initialize(...arguments); }
  Window_GemTotals.prototype = Object.create(Window_Base.prototype);
  Window_GemTotals.prototype.constructor = Window_GemTotals;
  Window_GemTotals.prototype.initialize = function(rect, weapon){ Window_Base.prototype.initialize.call(this,rect); this._weapon=weapon; };
  Window_GemTotals.prototype.refresh = function(){
    this.contents.clear(); const cw = this.contentsWidth();
    this.changeTextColor(ColorManager.textColor(RETURN_COL));
    this.drawText(UI.titleBonuses, 0, 0, cw);
    this.resetTextColor();
    const lines = linesFromTotals(totalsOf(this._weapon));
    let y = this.lineHeight();
    if (!lines.length) this.drawText('-', 0, y, cw);
    else for (const ln of lines) { this.drawText(ln, 0, y, cw); y += this.lineHeight(); }
  };

  function Window_GemList(){ this.initialize(...arguments); }
  Window_GemList.prototype = Object.create(Window_Selectable.prototype);
  Window_GemList.prototype.constructor = Window_GemList;
  Window_GemList.prototype.initialize = function(rect){ Window_Selectable.prototype.initialize.call(this,rect); this.refresh(); };
  Window_GemList.prototype.currentGem = function(){ return (this._data && this.index()<this._data.length) ? this._data[this.index()] : null; };
  Window_GemList.prototype.currentIsReturn = function(){ return this.index()===this.maxItems()-1; };
  Window_GemList.prototype.maxItems = function(){ return (this._data?this._data.length:0)+1; };
  Window_GemList.prototype.makeItems = function(){
    const items=[];
    for(let i=1;i<$dataItems.length;i++){
      const it=$dataItems[i]; if(!it) continue;
      if(!isGemItem(it)) continue;
      if(OWNED_ONLY && $gameParty.numItems(it)<=0) continue;
      items.push(it);
    }
    items.sort((a,b)=>{
      const tier = (n)=>{ n=(n||'').toLowerCase();
        if(/^master\b/.test(n)) return 3;
        if(/^greater\b/.test(n)) return 2;
        if(/^lesser\b/.test(n)) return 1;
        return 0; };
      const ta = tier(a.name), tb = tier(b.name);
      if(tb!==ta) return tb-ta;
      const pa=parseGemName(a.name), pb=parseGemName(b.name);
      if(pb.level!==pa.level) return pb.level-pa.level;
      const c=pa.base.localeCompare(pb.base); if(c!==0) return c;
      return $gameParty.numItems(b)-$gameParty.numItems(a);
    });
    this._data=items;
  };
  Window_GemList.prototype.refresh = function(){ this.makeItems(); this.createContents(); this.drawAllItems(); };
  Window_GemList.prototype.drawItem = function(index){
    const rect=this.itemRectWithPadding(index);
    if(index===this.maxItems()-1){
      this.changeTextColor(ColorManager.textColor(RETURN_COL));
      this.drawText(UI.btnReturn, rect.x, rect.y, rect.width, 'center'); this.resetTextColor(); return;
    }
    const it=this._data[index]; if(!it) return;
    const qty=$gameParty.numItems(it);
    this.drawIcon(it.iconIndex||0, rect.x, rect.y + (this.lineHeight()-ImageManager.iconHeight)/2);
    const mx=ImageManager.iconWidth+4;
    this.drawText(`${it.name} ×${qty}`, rect.x+mx, rect.y, rect.width-mx);
  };

})();