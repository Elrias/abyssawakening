/*:
 * @target MZ
 * @plugindesc Cloud Sync on Boot (imports cloud global + saves before Title; uses cloud globalInfo as source of truth)
 *
 * @param ApiBaseUrl
 * @type string
 *
 * @param GameId
 * @type string
 * @default abyssawakening
 *
 * @param TokenKey
 * @type string
 * @default cloudsave_token
 */

(() => {
  const p = PluginManager.parameters("CloudSyncOnBoot");
  const API = String(p.ApiBaseUrl || "").replace(/\/$/, "");
  const GAME_ID = String(p.GameId || "abyssawakening");
  const TOKEN_KEY = String(p.TokenKey || "cloudsave_token");
  const SYNC_FLAG = "cloudsync_in_progress";

  function token() {
    try { return localStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; }
  }

  function setSyncing(v) {
    try { sessionStorage.setItem(SYNC_FLAG, v ? "1" : "0"); } catch {}
  }

  async function apiGet(path) {
    const t = token();
    const res = await fetch(`${API}${path}`, {
      headers: { Authorization: `Bearer ${t}` }
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data?.error || "api_error");
    return data;
  }

  function extractGlobalInfoObject(obj) {
    if (!obj) return null;

    // Standard MZ: Array indexé (1..maxSavefiles)
    if (Array.isArray(obj)) return obj;

    // Certains plugins peuvent encapsuler
    if (obj.globalInfo && Array.isArray(obj.globalInfo)) return obj.globalInfo;
    if (obj.data && Array.isArray(obj.data)) return obj.data;

    return null;
  }

  let importedGlobalInfo = null;

  async function importCloudToLocal() {
    const t = token();
    if (!t || !API) {
      //console.log("[CloudSync] No token or API, skipping.");
      return;
    }

    const list = await apiGet(`/saves?game_id=${encodeURIComponent(GAME_ID)}`);
    const saves = Array.isArray(list.saves) ? list.saves : [];

    setSyncing(true);
    try {
      // 1) Import GLOBAL (slot 0) en premier
      if (saves.some(s => Number(s.slot) === 0)) {
        const g = await apiGet(`/saves/0?game_id=${encodeURIComponent(GAME_ID)}`);
        if (g?.payload) {
          const globalObj = JSON.parse(g.payload);

          // Sauvegarde locale du global tel quel
          await StorageManager.saveObject("global", globalObj);

          // Extraire globalInfo du format exact du jeu (important pour l'UI)
          importedGlobalInfo = extractGlobalInfoObject(globalObj);

          //console.log("[CloudSync] Global imported (and extracted globalInfo)");
        }
      } else {
        //console.log("[CloudSync] No global found in cloud.");
      }

      // 2) Import des slots fileX
      for (const s of saves) {
        const slot = Number(s.slot);
        if (!Number.isInteger(slot) || slot <= 0) continue;

        const r = await apiGet(`/saves/${slot}?game_id=${encodeURIComponent(GAME_ID)}`);
        if (!r?.payload) continue;

        await StorageManager.saveObject(`file${slot}`, JSON.parse(r.payload));
        //console.log(`[CloudSync] Slot ${slot} imported`);
      }
    } finally {
      setSyncing(false);
    }
  }

  // Bloquer le boot tant que la sync n'est pas finie
  const _isReady = Scene_Boot.prototype.isReady;
  Scene_Boot.prototype.isReady = function() {
    if (!this._cloudSyncPromise) {
      this._cloudSyncDone = false;
      this._cloudSyncPromise = (async () => {
        try {
          await importCloudToLocal();

          // Appliquer le globalInfo cloud à DataManager pour que Continue/Load affichent correctement
          if (importedGlobalInfo) {
            DataManager._globalInfo = importedGlobalInfo;
            //console.log("[CloudSync] DataManager._globalInfo set from cloud global");
          } else {
            console.warn("[CloudSync] No globalInfo extracted; UI may not reflect saves correctly.");
          }
        } catch (e) {
          console.warn("[CloudSync] Sync failed:", e);
        } finally {
          this._cloudSyncDone = true;
        }
      })();
    }
    return _isReady.call(this) && this._cloudSyncDone;
  };

  //console.log("[CloudSync] Plugin loaded.");
})();
