/*:
 * @target MZ
 * @plugindesc Cloud Upload on Save (robust: hooks StorageManager.saveObject, uploads global + fileX)
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
  const p = PluginManager.parameters("CloudUploadOnSave");
  const API = String(p.ApiBaseUrl || "").replace(/\/$/, "");
  const GAME_ID = String(p.GameId || "abyssawakening");
  const TOKEN_KEY = String(p.TokenKey || "cloudsave_token");
  const SYNC_FLAG = "cloudsync_in_progress";

  let pendingUploads = 0;

  function token() {
    try { return localStorage.getItem(TOKEN_KEY) || ""; } catch { return ""; }
  }
  function syncing() {
    try { return sessionStorage.getItem(SYNC_FLAG) === "1"; } catch { return false; }
  }

async function putSave(slotId, obj) {
  const t = token();
  if (!t || !API) return;

  pendingUploads++;

  try {
    const payload = JSON.stringify(obj);

    const res = await fetch(`${API}/saves/${slotId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${t}`,
      },
      body: JSON.stringify({ game_id: GAME_ID, payload }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.error || "save_upload_failed");
    }
  } finally {
    pendingUploads--;
  }
}

  // anti double-upload rapide
  const lastAt = new Map();
  function shouldUpload(key) {
    const now = Date.now();
    const last = lastAt.get(key) || 0;
    if (now - last < 400) return false;
    lastAt.set(key, now);
    return true;
  }

  const _saveObject = StorageManager.saveObject;
  StorageManager.saveObject = async function(saveName, object) {
    const result = await _saveObject.call(this, saveName, object);

    // Ne pas uploader pendant la sync cloud->local
    if (syncing()) return result;

    // global -> slot 0
    if (saveName === "global") {
      if (shouldUpload("global")) {
        putSave(0, object)
          .then(() => console.log("[CloudUpload] Uploaded global"))
          .catch(e => console.warn("[CloudUpload] Global upload failed:", e));
      }
      return result;
    }

    // fileX -> slot X
    const m = /^file(\d+)$/.exec(saveName);
    if (m) {
      const slotId = Number(m[1]);
      if (Number.isInteger(slotId) && slotId > 0 && shouldUpload(slotId)) {
        putSave(slotId, object)
          .then(() => console.log(`[CloudUpload] Uploaded slot ${slotId}`))
          .catch(e => console.warn(`[CloudUpload] Upload failed slot ${slotId}:`, e));
      }
    }

    return result;
  };

  //console.log("[CloudUpload] Plugin loaded (StorageManager hook).");
  
  window.addEventListener("beforeunload", function (e) {
    if (pendingUploads > 0) {
      e.preventDefault();
      e.returnValue = "";
      return "";
    }
  });

})();