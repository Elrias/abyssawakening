/*:
 * @target MZ
 * @plugindesc [v1.4.1] Weapon Upgrade UI — Inventory-first + compact panel (offset, toast, custom SE, Gem Slots row)
 * @author You
 *
 * @help
 * Open via plugin command “Open Enhance (from Inventory)”.
 * Requires WeaponUpgradeCore + DM_IndependentItems.
 *
 * Shows a "Gem Slots" row in the preview when the next level unlocks a slot.
 *
 * @command OpenEnhanceFromInventory
 * @text Open Enhance (from Inventory)
 *
 * @param ShowZeroParams @text Show zero parameters @type boolean @default false
 * @param UIWidth @text UI Width (px) @type number @min 560 @default 880
 * @param CommandWidth @text Command Column Width (px) @type number @min 160 @default 220
 * @param UIVerticalOffset @text UI Vertical Offset (px) @type number @default -120
 *
 * @param Text.SelectWeapon @text Text: Select Weapon @type string @default Select a weapon to enhance.
 * @param Text.NoItems     @text Text: No Items @type string @default You have no upgradeable weapons in your inventory.
 * @param Text.LevelArrow  @text Text: Level Arrow @type string @default →
 * @param Text.Max         @text Text: Max @type string @default Max
 * @param Text.Current     @text Text: Current @type string @default Current
 * @param Text.Next        @text Text: Next @type string @default Next
 * @param Text.Cost        @text Text: Cost @type string @default Cost
 * @param Text.Owned       @text Text: Owned @type string @default Owned
 * @param Text.Success     @text Text: Success @type string @default Success
 * @param Text.Enhance     @text Button: Enhance @type string @default Enhance
 * @param Text.Return      @text Button: Return @type string @default Return
 *
 * @param ToastEnabled     @text Toast: Enabled @type boolean @default true
 * @param ToastTextSuccess @text Toast: Success text @type string @default SUCCESS!
 * @param ToastTextFailed  @text Toast: Failed text @type string @default FAILED
 * @param ToastDuration    @text Toast: Duration (frames) @type number @min 20 @default 60
 * @param ToastYOffset     @text Toast: Y Offset (px) @type number @default -40
 *
 * @param UseCustomSE      @text Custom SE: Enabled @type boolean @default true
 * @param SuccessSE        @text Success SE (file in audio/se) @type file @dir audio/se/ @default
 * @param SuccessSEVolume  @text Success SE Volume @type number @min 0 @max 100 @default 90
 * @param SuccessSEPitch   @text Success SE Pitch @type number @min 50 @max 150 @default 100
 * @param SuccessSEPan     @text Success SE Pan @type number @min -100 @max 100 @default 0
 * @param FailureSE        @text Failure SE (file in audio/se) @type file @dir audio/se/ @default
 * @param FailureSEVolume  @text Failure SE Volume @type number @min 0 @max 100 @default 90
 * @param FailureSEPitch   @text Failure SE Pitch @type number @min 50 @max 150 @default 100
 * @param FailureSEPan     @text Failure SE Pan @type number @min -100 @max 100 @default 0
 *
 * @param ShowSlotRow      @text Show Gem Slots row @type boolean @default true
 * @param SlotLabel        @text Gem Slots label @type string @default Gem Slots
 * @param SlotUnlockLevels @text Slot unlock levels (fallback) @type string @default 2,4,6,8,10
 */

(() => {
  "use strict";
  const PLUGIN_FALLBACK = "WeaponUpgradeUI";
  const scripts = document.getElementsByTagName("script");
  const _src = (document.currentScript && document.currentScript.src) || (scripts.length ? scripts[scripts.length - 1].src : "");
  const _m = _src.match(/([^\/]+)\.js$/);
  const PNAME = _m ? _m[1] : PLUGIN_FALLBACK;
  const PP = PluginManager.parameters(PNAME);

  // Parse helper
  function parseLevels(s) {
    return String(s||"")
      .split(/[,\s]+/)
      .map(n=>Number(n))
      .filter(n=>Number.isFinite(n) && n>0)
      .sort((a,b)=>a-b);
  }

  const OPT = {
    showZero: String(PP["ShowZeroParams"] || "false").toLowerCase() === "true",
    uiWidth: Number(PP["UIWidth"] || 880),
    cmdWidth: Number(PP["CommandWidth"] || 220),
    uiYOffset: Number(PP["UIVerticalOffset"] || 0),

    txtSelect: String(PP["Text.SelectWeapon"] || "Select a weapon to enhance."),
    txtNoItems: String(PP["Text.NoItems"] || "You have no upgradeable weapons in your inventory."),
    txtArrow: String(PP["Text.LevelArrow"] || "→"),
    txtMax: String(PP["Text.Max"] || "Max"),
    txtCur: String(PP["Text.Current"] || "Current"),
    txtNext: String(PP["Text.Next"] || "Next"),
    txtCost: String(PP["Text.Cost"] || "Cost"),
    txtOwned: String(PP["Text.Owned"] || "Owned"),
    txtSuccess: String(PP["Text.Success"] || "Success"),
    txtEnhance: String(PP["Text.Enhance"] || "Enhance"),
    txtReturn: String(PP["Text.Return"] || "Return"),

    // Toast
    toastOn: String(PP["ToastEnabled"] || "true").toLowerCase() === "true",
    toastSuccess: String(PP["ToastTextSuccess"] || "SUCCESS!"),
    toastFailed:  String(PP["ToastTextFailed"]  || "FAILED"),
    toastDur: Number(PP["ToastDuration"] || 60),
    toastDy:  Number(PP["ToastYOffset"]  || -40),

    // Custom SE
    useSE: String(PP["UseCustomSE"] || "true").toLowerCase() === "true",
    seSuccess: String(PP["SuccessSE"] || ""),
    seSuccessVol: Number(PP["SuccessSEVolume"] || 90),
    seSuccessPitch: Number(PP["SuccessSEPitch"] || 100),
    seSuccessPan: Number(PP["SuccessSEPan"] || 0),
    seFailure: String(PP["FailureSE"] || ""),
    seFailureVol: Number(PP["FailureSEVolume"] || 90),
    seFailurePitch: Number(PP["FailureSEPitch"] || 100),
    seFailurePan: Number(PP["FailureSEPan"] || 0),

    // Gem Slots row
    showSlots: String(PP["ShowSlotRow"] || "true").toLowerCase() === "true",
    slotLabel: String(PP["SlotLabel"] || "Gem Slots"),
    slotLevels: parseLevels(PP["SlotUnlockLevels"] || "2,4,6,8,10"),
  };

  function assertCore(){ if (!window.WeaponUpg){ console.error("WeaponUpgradeUI: WeaponUpgradeCore required."); return false;} return true; }
  PluginManager.registerCommand(PNAME,"OpenEnhanceFromInventory",()=>{ if(!assertCore())return; SceneManager.push(Scene_EnhancePicker); });

  // ───────────────── helpers
  function ownedQty(id){ const it=$dataItems[id]; return it? $gameParty.numItems(it):0; }
  function levelString(w){ const L=WeaponUpg.currentLevelOf(w), M=WeaponUpg.maxLevel(); return L>=M?OPT.txtMax:`+${L} ${OPT.txtArrow} +${Math.min(M,L+1)}`; }
  function _normSeName(s){ if(!s) return ""; return String(s).replace(/^.*[\\/]/,"").replace(/\.(ogg|m4a)$/i,""); }
  function playCustomSE(name,vol,pitch,pan){
    const n=_normSeName(name);
    if(!n) return false;
    const se={name:n,volume:vol|0,pitch:pitch|0,pan:pan|0};
    try{ AudioManager.loadSe(se); }catch(_){}
    AudioManager.playSe(se);
    return true;
  }

  // Slots at level: ask core if available; else fallback with unlock levels list
  function slotsAtLevel(level, weapon){
    try{
      if (WeaponUpg && typeof WeaponUpg.slotsAtLevel === "function") {
        return WeaponUpg.slotsAtLevel(level, weapon);
      }
    }catch(_){}
    // Fallback: count thresholds reached
    let n=0;
    for(const lv of OPT.slotLevels){ if(level>=lv) n++; else break; }
    return n;
  }

  // ───────────────── toast
  class Sprite_UpgradeToast extends Sprite{
    constructor(){
      super(new Bitmap(Graphics.width,Graphics.height));
      this.anchor.set(0.5,0.5);
      this._life=0; this._vy=0; this._text=""; this._ok=true; this.visible=false; this.z=9999;
      this.resetPos();
    }
    resetPos(){ this.x=Graphics.boxWidth/2; this.y=Graphics.boxHeight/2+(OPT.toastDy|0); }
    show(text,ok=true,dur=OPT.toastDur){
      this._text=text; this._ok=!!ok; this._life=Math.max(20,dur|0); this._vy=-0.25; this.alpha=1; this.visible=OPT.toastOn; this.resetPos(); this.redraw();
    }
    redraw(){
      const b=this.bitmap; b.clear(); if(!OPT.toastOn) return;
      const ctx=b.context, padX=22,padY=10,fs=30; ctx.save(); ctx.font=`${fs}px ${$gameSystem.mainFontFace()}`;
      const tw=Math.ceil(ctx.measureText(this._text).width), bw=Math.min(tw+padX*2,Graphics.boxWidth-32), bh=fs+padY*2;
      const x=Math.floor((Graphics.boxWidth-bw)/2), y=Math.floor((Graphics.boxHeight-bh)/2)+(OPT.toastDy|0);
      ctx.globalAlpha=0.72; ctx.fillStyle="black"; ctx.fillRect(x,y,bw,bh);
      ctx.globalAlpha=0.9; ctx.strokeStyle="rgba(255,255,255,0.35)"; ctx.lineWidth=2; ctx.strokeRect(x+1,y+1,bw-2,bh-2);
      ctx.globalAlpha=1; ctx.fillStyle=this._ok?ColorManager.powerUpColor():ColorManager.powerDownColor();
      ctx.textAlign="center"; ctx.textBaseline="middle";
      ctx.fillText(this._text, Math.floor(Graphics.boxWidth/2), Math.floor(Graphics.boxHeight/2)+(OPT.toastDy|0));
      ctx.restore();
      if (typeof b._setDirty==="function") b._setDirty();
      else if (b._baseTexture?.update) b._baseTexture.update();
      else if (b.baseTexture?.update) b.baseTexture.update();
    }
    update(){ super.update(); if(!this.visible||this._life<=0) return; this._life--; const t=this._life/Math.max(1,OPT.toastDur); this.alpha=Math.max(0,Math.min(1,t*1.2)); this.y+=this._vy; this._vy*=0.98; if(this._life<=0){ this.visible=false; this.bitmap.clear(); } }
  }

  // ───────────────── Scene: Picker (group = moves with offset)
  class Scene_EnhancePicker extends Scene_MenuBase{
    initialize(){ super.initialize(); this._uiGroup=null; this._listWindow=null; this._infoWindow=null; }
    create(){
      super.create();
      this._uiw=Math.min(Graphics.boxWidth,Math.max(560,OPT.uiWidth));
      this._basex=Math.floor((Graphics.boxWidth-this._uiw)/2);

      this._uiGroup=new Sprite(); this.addChild(this._uiGroup); this._uiGroup.y=OPT.uiYOffset|0;
      this.createInfoWindow(); this.createListWindow();
    }
    addToGroup(w){ this._uiGroup.addChild(w); }
    createInfoWindow(){
      const r=new Rectangle(this._basex,this.mainAreaTop(),this._uiw,this.calcWindowHeight(2,true));
      this._infoWindow=new Window_Help(r); this._infoWindow.setText(OPT.txtSelect); this.addToGroup(this._infoWindow);
    }
    createListWindow(){
      const wy=this._infoWindow.y+this._infoWindow.height;
      const wh=this.mainAreaHeight()-(this._infoWindow.y-this.mainAreaTop())-this._infoWindow.height;
      const r=new Rectangle(this._basex,wy,this._uiw,wh);
      this._listWindow=new Window_UpgradeInventoryList(r);
      this._listWindow.setHandler("ok",this.onOk.bind(this));
      this._listWindow.setHandler("cancel",this.popScene.bind(this));
      this.addToGroup(this._listWindow);
      if(this._listWindow.weaponsCount()===0) this._infoWindow.setText(OPT.txtNoItems);
      this._listWindow.activate(); this._listWindow.select(0);
    }
    onOk(){
      const entry=this._listWindow.entry();
      if(!entry){ SoundManager.playBuzzer(); return; }
      if(entry.__back){ this.popScene(); return; }

      // ✅ Convert ONLY for upgrade flow (safe for shops)
      let w = entry;
      if (window.WeaponUpg && typeof WeaponUpg.ensureIndependentForUpgrade === "function") {
        w = WeaponUpg.ensureIndependentForUpgrade(entry);
      }

      $gameTemp._wupgSelectedWeapon = w;
      SceneManager.push(Scene_EnhanceDetail);
    }
  }

  class Window_UpgradeInventoryList extends Window_Selectable{
    initialize(r){ super.initialize(r); this.refresh(); this.select(0); }
    maxItems(){ return this._data?this._data.length:0; }
    weaponsCount(){ return this._weaponCount||0; }
    entry(){ return (this._data && this.index()>=0)? this._data[this.index()]: null; }
    item(){ const e=this.entry(); return (e&&e.__back)?null:e; }
    refresh(){ this.makeItemList(); this.createContents(); this.drawAllItems(); }
    makeItemList(){
      const arr=WeaponUpg.inventoryUpgradeableWeapons(); arr.sort((a,b)=> (a.name||"").localeCompare(b.name||""));
      this._weaponCount=arr.length; this._data=arr.concat([{__back:true}]);
    }
    drawItem(i){
      const e=this._data[i], rect=this.itemRect(i);
      if(e&&e.__back){ this.changeTextColor(ColorManager.systemColor()); this.drawText(OPT.txtReturn,rect.x,rect.y,rect.width,"center"); this.resetTextColor(); return; }
      const item=e, icon=item?.iconIndex??0, name=item?.name??"—", L=WeaponUpg.currentLevelOf(item), M=WeaponUpg.maxLevel();
      const levelText = L>=M?OPT.txtMax:`+${L}`;
      this.drawIcon(icon,rect.x+6,rect.y+2);
      this.drawText(name,rect.x+6+ImageManager.iconWidth+8,rect.y,rect.width-120);
      this.drawText(levelText,rect.x,rect.y,rect.width-18,"right");
    }
    isEnabled(){ return true; }
    itemHeight(){ return this.lineHeight(); }
  }

  // ───────────────── Scene: Detail (group + toast + SE)
  class Scene_EnhanceDetail extends Scene_MenuBase{
    prepare(arg){
      // Backward compat: some calls may pass a database id.
      if (arg && typeof arg === "object") this._weapon = arg;
      else this._weaponId = Number(arg||0);
    }
    initialize(){ super.initialize(); this._weapon=null; this._weaponId=0; this._uiGroup=null; }
    create(){
      super.create();
      this._uiw=Math.min(Graphics.boxWidth,Math.max(560,OPT.uiWidth));
      this._basex=Math.floor((Graphics.boxWidth-this._uiw)/2);
      this._cmdw=Math.max(160,Math.min(OPT.cmdWidth,this._uiw-320));

      // Picker stores selected instance on $gameTemp.
      this._weapon = this._weapon || $gameTemp._wupgSelectedWeapon || null;
      $gameTemp._wupgSelectedWeapon = null;
      if (!this._weapon && this._weaponId) this._weapon = $dataWeapons[this._weaponId];

      // ✅ Safety: if opened directly, still ensure we upgrade an independent instance
      if (this._weapon && window.WeaponUpg && typeof WeaponUpg.ensureIndependentForUpgrade === "function") {
        this._weapon = WeaponUpg.ensureIndependentForUpgrade(this._weapon);
      }

      this._uiGroup=new Sprite(); this.addChild(this._uiGroup); this._uiGroup.y=OPT.uiYOffset|0;

      this.createHeaderWindow(); this.createParamsWindow(); this.createFooterWindow(); this.createCommandWindow();
      this._toast=new Sprite_UpgradeToast(); this.addChild(this._toast);

      this.refreshAll(); this._commandWindow.activate(); this._commandWindow.select(0);
    }
    addToGroup(w){ this._uiGroup.addChild(w); }

    createHeaderWindow(){
      const r=new Rectangle(this._basex,this.mainAreaTop(),this._uiw,this.calcWindowHeight(2,true));
      this._headerWindow=new Window_EnhanceHeader(r); this.addToGroup(this._headerWindow);
    }
    createParamsWindow(){
      const wy=this._headerWindow.y+this._headerWindow.height;
      const avail=this.mainAreaHeight()-(wy-this.mainAreaTop())-this.calcWindowHeight(3,true);
      const lh=Window_Base.prototype.lineHeight.call(this._headerWindow);
      const r=new Rectangle(this._basex,wy,this._uiw,Math.max(lh*4,avail));
      this._paramsWindow=new Window_EnhanceParams(r); this.addToGroup(this._paramsWindow);
    }
    createFooterWindow(){
      const wh=this.calcWindowHeight(3,true), wy=this._paramsWindow.y+this._paramsWindow.height, ww=this._uiw-this._cmdw;
      const r=new Rectangle(this._basex,wy,ww,wh);
      this._footerWindow=new Window_EnhanceFooter(r); this.addToGroup(this._footerWindow);
    }
    createCommandWindow(){
      const wh=this._footerWindow.height, wx=this._basex+this._uiw-this._cmdw, wy=this._footerWindow.y;
      const r=new Rectangle(wx,wy,this._cmdw,wh);
      this._commandWindow=new Window_EnhanceCommand(r);
      this._commandWindow.setHandler("enhance",this.onEnhance.bind(this));
      this._commandWindow.setHandler("cancel", this.popScene.bind(this));
      this.addToGroup(this._commandWindow);
    }
    refreshAll(){ this._headerWindow.setWeapon(this._weapon); this._paramsWindow.setWeapon(this._weapon); this._footerWindow.setWeapon(this._weapon); this._commandWindow.setWeapon(this._weapon); }

    onEnhance(){
      let w=this._weapon; if(!w) return;

      // ✅ ensure independence right before attempting (extra safety)
      if (window.WeaponUpg && typeof WeaponUpg.ensureIndependentForUpgrade === "function") {
        w = WeaponUpg.ensureIndependentForUpgrade(w);
        this._weapon = w;
      }

      const res=WeaponUpg.attemptOn(w);
      const success=!!(res && (res.success ?? res.ok));
      const msg=(res && res.msg)? res.msg : (success?"Success!":"Failed.");
      this._footerWindow.setMessage(msg);
      if(OPT.toastOn) this._toast.show(success?OPT.toastSuccess:OPT.toastFailed, success);

      if(success){
        if(OPT.useSE && _normSeName(OPT.seSuccess)) playCustomSE(OPT.seSuccess,OPT.seSuccessVol,OPT.seSuccessPitch,OPT.seSuccessPan);
        else SoundManager.playOk();
      }else{
        if(OPT.useSE && _normSeName(OPT.seFailure)) playCustomSE(OPT.seFailure,OPT.seFailureVol,OPT.seFailurePitch,OPT.seFailurePan);
        else SoundManager.playBuzzer();
      }

      this.refreshAll();
      this._commandWindow.activate();
      if(this._commandWindow.selectSymbol){
        if(this._commandWindow.isEnhanceEnabled()) this._commandWindow.selectSymbol("enhance");
        else this._commandWindow.selectSymbol("cancel");
      } else {
        this._commandWindow.select(0);
      }
    }
  }

  // ───────────────── Windows
  class Window_EnhanceHeader extends Window_Base{
    initialize(r){ super.initialize(r); this._weapon=null; }
    setWeapon(w){ this._weapon=w; this.refresh(); }
    refresh(){
      this.contents.clear(); const w=this._weapon; if(!w) return;
      const icon=w.iconIndex||0, name=w.name||"—";
      const info=WeaponUpg.beforeAfterFor(w); let total=0; for(const k in info.delta) total+=(info.delta[k]||0);
      const L=WeaponUpg.currentLevelOf(w), M=WeaponUpg.maxLevel(); const lvl=L>=M?OPT.txtMax:`+${L} ${OPT.txtArrow} +${Math.min(M,L+1)}`;
      const rightW=Math.max(90,Math.floor(this.contentsWidth()*0.18));
      this.drawIcon(icon,6,2); this.drawText(name,6+ImageManager.iconWidth+8,0,this.contentsWidth()-rightW-24,"left");
      if(total>0)this.changeTextColor(ColorManager.powerUpColor()); else if(total<0)this.changeTextColor(ColorManager.powerDownColor()); else this.resetTextColor();
      this.drawText(lvl,this.contentsWidth()-rightW,0,rightW-12,"right"); this.resetTextColor();
    }
  }

  class Window_EnhanceParams extends Window_Base{
    initialize(r){ super.initialize(r); this._weapon=null; this._rows=[]; }
    setWeapon(w){ this._weapon=w; this.refresh(); }
    makeRows(){
      this._rows=[]; if(!this._weapon) return;
      const inf=WeaponUpg.beforeAfterFor(this._weapon), names=WeaponUpg.paramNames();

      // 1) Classic parameter rows
      for(let i=0;i<names.length;i++){
        const b=inf.before[i]||0,a=inf.after[i]||0,d=(inf.delta[i]||0);
        if(!OPT.showZero && b===0 && a===0) continue;
        this._rows.push({name:names[i],before:b,after:a,delta:d});
      }

      // 2) Gem Slots row (only if next level changes slots)
      if (OPT.showSlots) {
        const L = WeaponUpg.currentLevelOf(this._weapon);
        const M = WeaponUpg.maxLevel();
        const nextL = Math.min(M, L+1);
        const sb = slotsAtLevel(L, this._weapon);
        const sa = slotsAtLevel(nextL, this._weapon);
        if (sa !== sb) {
          this._rows.push({ name: OPT.slotLabel, before: sb, after: sa, delta: sa - sb, __slot: true });
        }
      }
    }
    refresh(){
      this.contents.clear(); this.makeRows();
      const cw=this.contentsWidth(), c1=Math.floor(cw*0.28), c2=Math.floor(cw*0.30), cA=Math.floor(cw*0.05), c3=cw-c1-c2-cA-12;
      let y=0; this.changeTextColor(ColorManager.systemColor());
      this.drawText("",0,y,c1,"left"); this.drawText(OPT.txtCur,c1,y,c2,"center"); this.drawText(OPT.txtNext,c1+c2+cA,y,c3,"center");
      this.resetTextColor(); y+=this.lineHeight();
      for(const r of this._rows){
        this.drawText(r.name,0,y,c1,"left");
        this.drawText(String(r.before),c1,y,c2,"center");
        this.changeTextColor(ColorManager.systemColor()); this.drawText(OPT.txtArrow,c1+c2,y,cA,"center"); this.resetTextColor();
        const sign=r.delta>=0?"+":""; 
        if(r.delta>0)this.changeTextColor(ColorManager.powerUpColor()); else if(r.delta<0)this.changeTextColor(ColorManager.powerDownColor()); else this.changeTextColor(ColorManager.normalColor());
        this.drawText(`${r.after} (${sign}${r.delta})`,c1+c2+cA,y,c3,"center"); 
        this.resetTextColor(); y+=this.lineHeight();
      }
    }
  }

  class Window_EnhanceFooter extends Window_Base{
    initialize(r){ super.initialize(r); this._weapon=null; this._msg=""; }
    setWeapon(w){ this._weapon=w; this._msg=""; this.refresh(); }
    setMessage(m){ this._msg=m||""; this.refresh(); }
    refresh(){
      this.contents.clear(); const w=this._weapon; if(!w) return;
      const mats=WeaponUpg.nextMatsOf(w), chance=WeaponUpg.nextChanceOf(w); let y=0;
      this.changeTextColor(ColorManager.systemColor()); this.drawText(OPT.txtCost+":",0,y,this.contentsWidth(),"left"); this.resetTextColor(); y+=this.lineHeight();
      if(mats.length===0){ this.drawText("—",0,y,this.contentsWidth(),"left"); y+=this.lineHeight(); }
      else {
        for(const m of mats){
          const it=$dataItems[m.itemId], icon=it?it.iconIndex:0, name=it?it.name:`Item ${m.itemId}`, have=$gameParty.numItems(it), leftW=Math.floor(this.contentsWidth()*0.55);
          this.drawIcon(icon,6,y+2); this.drawText(`${name} x${m.qty}`,6+ImageManager.iconWidth+8,y,leftW-(6+ImageManager.iconWidth+8)-8,"left");
          this.drawText(`${OPT.txtOwned}: ${have}`,leftW,y,this.contentsWidth()-leftW-12,"right"); y+=this.lineHeight();
        }
      }
      const rightW=120; this.changeTextColor(ColorManager.systemColor()); this.drawText(OPT.txtSuccess+":",0,y,this.contentsWidth()-rightW-10,"left"); this.resetTextColor();
      const L=WeaponUpg.currentLevelOf(w), M=WeaponUpg.maxLevel(); const cStr=L>=M?"—":`${chance}%`; this.drawText(cStr,this.contentsWidth()-rightW,y,rightW-12,"right"); y+=this.lineHeight();
      if(this._msg){ y+=4; this.changeTextColor(ColorManager.systemColor()); this.drawText(this._msg,0,y,this.contentsWidth(),"left"); this.resetTextColor(); }
    }
  }
  class Window_EnhanceCommand extends Window_Command{
    initialize(r){ this._weapon=null; super.initialize(r); }
    activate(){ Window_Command.prototype.activate.call(this); if(this.index()<0 && this.maxItems()>0) this.select(0); }
    setWeapon(w){ this._weapon=w; this.refresh(); }
    makeCommandList(){ this.addCommand(OPT.txtEnhance,"enhance",this.isEnhanceEnabled()); this.addCommand(OPT.txtReturn,"cancel",true); }
    isEnhanceEnabled(){
      const w=this._weapon; if(!w) return false; const L=WeaponUpg.currentLevelOf(w), M=WeaponUpg.maxLevel(); if(L>=M) return false;
      const mats=WeaponUpg.nextMatsOf(w); if(!mats.length) return true; return mats.every(m=> ownedQty(m.itemId)>=m.qty);
    }
    refresh(){ super.refresh(); if(this.active && this.maxItems()>0) this.select(0); }
  }
})();