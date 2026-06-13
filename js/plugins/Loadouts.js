/*:
 * @target MZ
 * @plugindesc Loadouts System V1
 * @author Elrias
 */

(() => {

const MAX_LOADOUTS = 10;

//-----------------------------------------------------------------------------
// Game_System
//-----------------------------------------------------------------------------

class Sprite_LoadoutToast extends Sprite
{
    constructor()
    {
        super(new Bitmap(Graphics.width, Graphics.height));

        this._life = 0;
        this.visible = false;
    }

    show(text)
    {
        this.bitmap.clear();

        const ctx = this.bitmap.context;

        const w = 400;
        const h = 50;

        const x =
            (Graphics.width - w) / 2;

        const y =
            Graphics.height / 2 - 80;

        ctx.fillStyle =
            "rgba(0,0,0,0.8)";

        ctx.fillRect(x,y,w,h);

        this.bitmap.drawText(
            text,
            x,
            y,
            w,
            h,
            "center"
        );

        this.visible = true;
        this._life = 60;
    }

    update()
    {
        super.update();

        if (this._life > 0)
        {
            this._life--;

            if (this._life <= 0)
            {
                this.visible = false;
                this.bitmap.clear();
            }
        }
    }
}

const _GameSystem_initialize = Game_System.prototype.initialize;

Game_System.prototype.initialize = function() {
    _GameSystem_initialize.call(this);

    this._loadouts = [];

    for (let i = 0; i < MAX_LOADOUTS; i++) {
        this._loadouts.push(null);
    }
};

//-----------------------------------------------------------------------------
// Menu Command
//-----------------------------------------------------------------------------

const _Window_MenuCommand_addOriginalCommands =
Window_MenuCommand.prototype.addOriginalCommands;

Window_MenuCommand.prototype.addOriginalCommands = function() {
    _Window_MenuCommand_addOriginalCommands.call(this);

    this.addCommand("\\I[210]Loadouts", "loadouts", true);
};

//-----------------------------------------------------------------------------
// Scene_Menu
//-----------------------------------------------------------------------------

const _Scene_Menu_createCommandWindow =
Scene_Menu.prototype.createCommandWindow;

Scene_Menu.prototype.createCommandWindow = function() {
    _Scene_Menu_createCommandWindow.call(this);

    this._commandWindow.setHandler(
        "loadouts",
        () => SceneManager.push(Scene_Loadouts)
    );
};

//-----------------------------------------------------------------------------
// Scene_Loadouts
//-----------------------------------------------------------------------------

function Scene_Loadouts() {
    this.initialize(...arguments);
}

Scene_Loadouts.prototype =
Object.create(Scene_MenuBase.prototype);

Scene_Loadouts.prototype.constructor =
Scene_Loadouts;

Scene_Loadouts.prototype.create = function() {

    ensureLoadouts();

    Scene_MenuBase.prototype.create.call(this);

    const rect = new Rectangle(
        20,
        80,
        Graphics.width - 40,
        Graphics.height - 100
    );

    this._window = new Window_LoadoutList(rect);

    this._window.setHandler(
        "ok",
        this.onSlotOk.bind(this)
    );

    this._window.setHandler(
        "cancel",
        this.popScene.bind(this)
    );

    this.addWindow(this._window);

    const cmdRect = new Rectangle(
        Graphics.width / 2 - 150,
        Graphics.height / 2 - 120,
        300,
        220
    );

    this._commandWindow =
        new Window_LoadoutCommands(cmdRect);

    this._commandWindow.hide();
    this._commandWindow.deactivate();

    this.addWindow(this._commandWindow);

    this._commandWindow.setHandler(
        "cancel",
        this.onCommandCancel.bind(this)
    );

    this._commandWindow.setHandler(
        "save",
        this.commandSaveSelected.bind(this)
    );

    this._commandWindow.setHandler(
        "load",
        this.commandLoad.bind(this)
    );

    this._commandWindow.setHandler(
        "overwrite",
        this.commandOverwrite.bind(this)
    );

    this._commandWindow.setHandler(
        "delete",
        this.commandDelete.bind(this)
    );
    this._commandWindow.setHandler(
        "rename",
        this.commandRename.bind(this)
    );

    const confirmRect =
        new Rectangle(
            Graphics.width / 2 - 120,
            Graphics.height / 2 - 80,
            240,
            120
        );

    this._deleteWindow =
        new Window_DeleteConfirm(confirmRect);

    this._deleteWindow.hide();
    this._deleteWindow.deactivate();

    this.addWindow(this._deleteWindow);

    this._deleteWindow.setHandler(
        "yes",
        this.confirmDelete.bind(this)
    );

    this._deleteWindow.setHandler(
        "no",
        this.cancelDelete.bind(this)
    );

    this._toast = new Sprite_LoadoutToast();
    this.addChild(this._toast);
};

Scene_Loadouts.prototype.showToast =
function(text)
{
    if (this._toast)
    {
        this._toast.show(text, true, 60);
    }
};

Scene_Loadouts.prototype.onCommandCancel =
function() {
    this._commandWindow.close();
    this._commandWindow.hide();
    this._commandWindow.deactivate();

    this._window.activate();
};

Scene_Loadouts.prototype.commandSaveSelected =
function() {

    const slot = this._selectedSlot;

    $gameTemp._loadoutSaveSlot = slot;

    const actor = $gameActors.actor(22);

    actor.setName("");

    SceneManager.push(Scene_Name);
    SceneManager.prepareNextScene(22, 12);
};

Scene_Loadouts.prototype.commandLoad =
function() {

    const slot = this._selectedSlot;

    const loadout =
        $gameSystem._loadouts[slot];

    if (!loadout) {
        return;
    }

    const battleMembers =
        loadout.battleMembers
            .filter(id => id > 0);

    const currentActors =
        $gameParty._actors.slice();

    const reserveActors =
        currentActors.filter(id =>
            id > 0 &&
            !battleMembers.includes(id)
        );

    $gameParty._actors =
        battleMembers.concat(reserveActors);

    $gameParty._battleMembers =
        battleMembers;
    
    for (const actorId in loadout.actors)
    {
        const actor =
            $gameActors.actor(Number(actorId));

        if (!actor) continue;

        const savedActor =
            loadout.actors[actorId];

        const equips =
            savedActor.equips;

        for (let slot = 0; slot < equips.length; slot++)
        {
            actor.changeEquip(slot, null);
        }

        for (let slot = 0; slot < equips.length; slot++)
        {
            const savedItem = equips[slot];

            if (!savedItem) {
                continue;
            }

            let item = null;

            if (savedItem.etypeId === 1)
            {
                item =
                    $dataWeapons[savedItem.id];
            }
            else
            {
                item =
                    $dataArmors[savedItem.id];
            }

            actor.changeEquip(slot, item);
        }
    }    
    $gamePlayer.refresh();

    this.showToast(
        "Loadout Loaded"
    );

    AudioManager.playSe({
        name: "success",
        volume: 90,
        pitch: 100,
        pan: 0
    });

    this.onCommandCancel();
};

Scene_Loadouts.prototype.cancelDelete =
function()
{
    this._deleteWindow.close();
    this._deleteWindow.hide();
    this._deleteWindow.deactivate();

    this._commandWindow.activate();
};

Scene_Loadouts.prototype.commandOverwrite =
function() {

    const slot = this._selectedSlot;

    const oldLoadout =
        $gameSystem._loadouts[slot];

    const oldName =
        oldLoadout.name;

    const data =
        createCurrentLoadout();

    data.name = oldName;

    $gameSystem._loadouts[slot] = data;

    this.showToast(
        "Loadout Updated"
    );
    
    SoundManager.playSave();

    this._window.refresh();

    this.onCommandCancel();
};

Scene_Loadouts.prototype.commandRename =
function() {

    const slot = this._selectedSlot;

    const loadout =
        $gameSystem._loadouts[slot];

    if (!loadout) {
        return;
    }

    $gameTemp._loadoutRenameSlot = slot;

    const actor =
        $gameActors.actor(22);

    actor.setName(loadout.name);

    SceneManager.push(Scene_Name);
    SceneManager.prepareNextScene(22, 12);
};

Scene_Loadouts.prototype.commandDelete =
function()
{
    this._commandWindow.deactivate();

    this._deleteWindow.show();
    this._deleteWindow.open();
    this._deleteWindow.activate();
    this._deleteWindow.select(0);
};

Scene_Loadouts.prototype.confirmDelete =
function()
{
    const slot =
        this._selectedSlot;

    $gameSystem._loadouts[slot] =
        null;

    this.showToast(
        "Loadout Deleted"
    );

    AudioManager.playSe({
        name: "Save2",
        volume: 90,
        pitch: 100,
        pan: 0
    });

    this._window.refresh();

    this._deleteWindow.close();
    this._deleteWindow.hide();

    this.onCommandCancel();
};

Scene_Loadouts.prototype.onSlotOk = function() {

    const slot =
        this._window.index();

    this._selectedSlot = slot;

    this._commandWindow.setSlot(slot);

    this._commandWindow.show();
    this._commandWindow.activate();
    this._commandWindow.open();

    this._window.deactivate();
};

const _Scene_Loadouts_start =
    Scene_Loadouts.prototype.start;

Scene_Loadouts.prototype.start =
function()
{
    _Scene_Loadouts_start.call(this);

    if ($gameTemp._loadoutToast)
    {
        this.showToast(
            $gameTemp._loadoutToast
        );

        $gameTemp._loadoutToast =
            null;
    }
};

//-----------------------------------------------------------------------------
// Window_LoadoutList
//-----------------------------------------------------------------------------

function Window_LoadoutList(rect) {
    this.initialize(rect);
}

Window_LoadoutList.prototype =
Object.create(Window_Command.prototype);

Window_LoadoutList.prototype.constructor =
Window_LoadoutList;

Window_LoadoutList.prototype.itemHeight =
function()
{
    return 72;
};

Window_LoadoutList.prototype.drawMiniCharacter =
function(actor, x, y)
{
    const bitmap =
        ImageManager.loadCharacter(
            actor.characterName()
        );

    const big =
        ImageManager.isBigCharacter(
            actor.characterName()
        );

    const pw =
        bitmap.width /
        (big ? 3 : 12);

    const ph =
        bitmap.height /
        (big ? 4 : 8);

    const index =
        actor.characterIndex();

    const sx =
        ((index % 4) * 3 + 1) * pw;

    const sy =
        (Math.floor(index / 4) * 4) * ph;

    this.contents.blt(
        bitmap,
        sx,
        sy,
        pw,
        ph,
        x,
        y,
        pw,
        ph
    );
};

Window_LoadoutList.prototype.makeCommandList = function() {
    
    ensureLoadouts();

    const loadouts = $gameSystem._loadouts;

    for (let i = 0; i < MAX_LOADOUTS; i++) {

        const data = loadouts[i];

        let text;

        if (data) {
            text =
                String(i + 1).padStart(2, "0") +
                ". " +
                data.name;
        } else {
            text =
                String(i + 1).padStart(2, "0") +
                ". Empty";
        }

        this.addCommand(text, "ok");
    }
};

Window_LoadoutList.prototype.drawItem =
function(index)
{
    const rect =
        this.itemLineRect(index);

    const loadout =
        $gameSystem._loadouts[index];

    if (!loadout)
    {
        this.drawText(
            this.commandName(index),
            rect.x,
            rect.y,
            rect.width,
            "center"
        );

        return;
    }

    this.drawText(
        this.commandName(index),
        rect.x + 20,
        rect.y,
        400
    );

    let y = rect.y - 5
    let x = rect.x + 500;

    for (const actorId of loadout.battleMembers)
    {
        const actor =
            $gameActors.actor(actorId);

        if (!actor) continue;

        this.drawMiniCharacter(
            actor,
            x,
            y
        );

        x += 48;
    }
};

function Window_LoadoutCommands(rect) {
    this.initialize(rect);
}

Window_LoadoutCommands.prototype =
    Object.create(Window_Command.prototype);

Window_LoadoutCommands.prototype.constructor =
    Window_LoadoutCommands;

Window_LoadoutCommands.prototype.setSlot = function(slot) {

    this._slot = slot;

    this.refresh();
    this.select(0);
};

Window_LoadoutCommands.prototype.makeCommandList = function() {

    if (this._slot == null) return;

    const loadout =
        $gameSystem._loadouts[this._slot];

    if (!loadout) {

        this.addCommand(
            "Save Current Loadout",
            "save"
        );

        this.addCommand(
            "Cancel",
            "cancel"
        );

    } else {

        this.addCommand(
            "Load",
            "load"
        );

        this.addCommand(
            "Save Over",
            "overwrite"
        );

        this.addCommand(
            "Rename",
            "rename"
        );

        this.addCommand(
            "Delete",
            "delete"
        );

        this.addCommand(
            "Cancel",
            "cancel"
        );
    }
};

function Window_DeleteConfirm(rect)
{
    this.initialize(rect);
}

Window_DeleteConfirm.prototype =
    Object.create(Window_Command.prototype);

Window_DeleteConfirm.prototype.constructor =
    Window_DeleteConfirm;

Window_DeleteConfirm.prototype.makeCommandList =
function()
{
    this.addCommand(
        "Delete this loadout",
        "yes"
    );

    this.addCommand(
        "Return",
        "no"
    );
};

//-----------------------------------------------------------------------------
// Helpers
//-----------------------------------------------------------------------------

function ensureLoadouts() {

    if (!$gameSystem._loadouts) {

        $gameSystem._loadouts = [];

        for (let i = 0; i < MAX_LOADOUTS; i++) {
            $gameSystem._loadouts.push(null);
        }
    }
}

function createCurrentLoadout() {

    const loadout = {};

    loadout.battleMembers =
        $gameParty._battleMembers.slice();

    loadout.actors = {};

    $gameParty.members().forEach(actor => {

        loadout.actors[actor.actorId()] = {

            equips:
                actor.equips().map(item =>
                {
                    if (!item) {
                        return null;
                    }

                    return {
                        id: item.id,
                        etypeId: item.etypeId
                    };
                })
        };
    });

    return loadout;
}

const _Scene_Name_onInputOk =
    Scene_Name.prototype.onInputOk;

Scene_Name.prototype.onInputOk = function() {

    const actorId =
        this._actor.actorId();

    _Scene_Name_onInputOk.call(this);

    if (actorId !== 22) {
        return;
    }

    const saveSlot =
        $gameTemp._loadoutSaveSlot;

    const renameSlot =
        $gameTemp._loadoutRenameSlot;

    if (saveSlot == null &&
        renameSlot == null)
    {
        return;
    }

    const actor =
        $gameActors.actor(22);

    let name =
        actor.name();

    if (!name.trim()) {
        name = "Loadout " + (slot + 1);
    }

    if (saveSlot != null)
    {
        if (!name.trim()) {
            name =
                "Loadout " +
                (saveSlot + 1);
        }

        const data =
            createCurrentLoadout();

        data.name = name;

        $gameSystem._loadouts[saveSlot] =
            data;

        $gameTemp._loadoutSaveSlot =
            null;

        $gameTemp._loadoutToast = "Loadout Saved";
    }

    if (renameSlot != null)
    {
        if (!name.trim()) {
            name =
                "Loadout " +
                (renameSlot + 1);
        }

        $gameSystem
            ._loadouts[renameSlot]
            .name = name;

        $gameTemp._loadoutRenameSlot =
            null;
        
        $gameTemp._loadoutToast = "Loadout Renamed";
    }

    actor.setName("");

    SoundManager.playSave();
};

})();