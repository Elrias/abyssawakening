// ---------------- Config ----------------
const API_BASE = "https://abyssawakening-backend.onrender.com";
const TOKEN_KEY = "cloudsave_token";
const FLASH_KEY = "flash_message";

// ---------------- Elements ----------------
const panel = document.getElementById("sidePanel");
const toggle = document.getElementById("menuToggle");
const menuIcon = document.getElementById("menuIcon");
const menuLabel = document.getElementById("menuLabel");
const discordBtn = document.getElementById("discordBtn");
const backdrop = document.getElementById("backdrop");
const fsBtn = document.getElementById("fullscreenBtn");
// Auth
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const emailEl = document.getElementById("authEmail");
const passEl = document.getElementById("authPassword");
const submitBtn = document.getElementById("authSubmitBtn");
const logoutBtn = document.getElementById("authLogoutBtn");
const toggleModeBtn = document.getElementById("authToggleModeBtn");
const forgotBtn = document.getElementById("authForgotBtn");
const authLinksRow = document.getElementById("authLinksRow");
const profileBtn = document.getElementById("profileBtn");
// éviter submit (Enter)
authForm?.addEventListener("submit", (e) => e.preventDefault());

// Retirer focus après clic
toggle?.addEventListener("pointerdown", () => toggle.blur());
fsBtn?.addEventListener("pointerdown", () => fsBtn.blur());

// ---------------- Flash message after reload ----------------
(function showFlash() {
  const msg = sessionStorage.getItem(FLASH_KEY);
  if (!msg) return;
  sessionStorage.removeItem(FLASH_KEY);
  alert(msg);
})();
function flash(msg) {
  sessionStorage.setItem(FLASH_KEY, msg);
}

// ---------------- Menu ----------------
function setToggleState(isOpen) {
  if (!toggle) return;
  toggle.setAttribute("aria-expanded", String(isOpen));
  if (menuIcon) menuIcon.textContent = isOpen ? "✕" : "☰";
  if (menuLabel) menuLabel.textContent = isOpen ? "Close" : "Menu";
}
function closeMenu() {
  panel?.classList.remove("open");
  document.body.classList.remove("menu-open");
  setToggleState(false);
}
function openMenu() {
  panel?.classList.add("open");
  document.body.classList.add("menu-open");
  setToggleState(true);
}
toggle?.addEventListener("click", () => {
  if (!panel) return;
  panel.classList.contains("open") ? closeMenu() : openMenu();
});
setToggleState(false);

// Click backdrop => close
backdrop?.addEventListener("click", closeMenu);

// ESC => close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Click on a link in menu => close (mobile/tablet only)
panel?.addEventListener("click", (e) => {
  const a = e.target?.closest?.("a");
  if (!a) return;
  if (window.matchMedia("(max-width: 1024px)").matches) closeMenu();
});

// ---------------- Fullscreen ----------------
function goFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) elem.requestFullscreen();
  else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
}
fsBtn?.addEventListener("click", goFullscreen);

function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    (window.innerHeight === screen.height && window.innerWidth === screen.width) // F11 approximation
  );
}

function onFsChange() {
  const inFs = isFullscreen();

  if (fsBtn) fsBtn.style.display = inFs ? "none" : "block";
  if (toggle) toggle.style.display = inFs ? "none" : "inline-flex";
  if (discordBtn) discordBtn.style.display = inFs ? "none" : "inline-flex";

  if (inFs) closeMenu();
}
document.addEventListener("fullscreenchange", onFsChange);
document.addEventListener("webkitfullscreenchange", onFsChange);
window.addEventListener("resize", onFsChange);
onFsChange();

// ---------------- Side black bars calc ----------------
function computeSideSpace() {
  const canvas = document.querySelector("canvas");
  if (!canvas) return;

  const cw = canvas.getBoundingClientRect().width || 0;
  const ww = window.innerWidth || 0;

  const side = Math.max(0, Math.floor((ww - cw) / 2));
  document.documentElement.style.setProperty("--sideSpace", side + "px");

  if (side < 140) document.body.classList.add("overlay-menu");
  else document.body.classList.remove("overlay-menu");
}

const waitCanvas = setInterval(() => {
  const canvas = document.querySelector("canvas");
  if (canvas) {
    clearInterval(waitCanvas);
    computeSideSpace();
    window.addEventListener("resize", computeSideSpace);
  }
}, 100);

// ---------------- Auth helpers ----------------
function getToken() {
  return localStorage.getItem(TOKEN_KEY) || "";
}
function isLoggedIn() {
  return !!getToken();
}

function setAuthStatus(msg, kind = "") {
  if (!authStatus) return;
  authStatus.textContent = msg || "";
  authStatus.className = "authStatus" + (kind ? " " + kind : "");
}

function setLoading(isLoading) {
  if (!authForm) return;
  authForm.classList.toggle("is-loading", isLoading);

  // disable/enable buttons
  if (submitBtn) submitBtn.disabled = isLoading;
  if (toggleModeBtn) toggleModeBtn.disabled = isLoading;
  if (forgotBtn) forgotBtn.disabled = isLoading;
  if (logoutBtn) logoutBtn.disabled = isLoading;

  // disable inputs too
  if (emailEl) emailEl.disabled = isLoading;
  if (passEl) passEl.disabled = isLoading;
}

// Decode JWT payload to get email (no extra API call)
function getEmailFromToken() {
  const t = getToken();
  if (!t) return "";
  const parts = t.split(".");
  if (parts.length !== 3) return "";

  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    const payload = JSON.parse(json);
    return payload.email || "";
  } catch {
    return "";
  }
}

async function api(path, { method = "GET", body = null } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(API_BASE + path, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error || "api_error");
  return data;
}

// ---------------- Auth UI logic ----------------
let mode = "login"; // "login" | "register"

// extra elements (add at top with other query selectors)
const authFields = document.getElementById("authFields");
const authLoggedMsg = document.getElementById("authLoggedMsg");
const authStatus = document.getElementById("authStatus");

function setMode(m) {
  mode = m;
  if (isLoggedIn()) return;

  if (authTitle) authTitle.textContent = mode === "login" ? "Login" : "Register";
  if (submitBtn) submitBtn.querySelector(".btnText").textContent =
    mode === "login" ? "Login" : "Create account";
  if (toggleModeBtn) toggleModeBtn.textContent =
    mode === "login" ? "Register" : "Login instead";

  // reset status
  setAuthStatus("");
}

function updateAuthUI() {
  const logged = isLoggedIn();

  if (logged) {
    const email = getEmailFromToken();
    if (authTitle) authTitle.textContent = "Account";

    // hide fields + links, show logged message + logout
    if (authFields) authFields.style.display = "none";
    if (authLinksRow) authLinksRow.style.display = "none";
    if (submitBtn) submitBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-flex";
    if (profileBtn) profileBtn.style.display = "inline-flex";
    if (authLoggedMsg) {
      authLoggedMsg.style.display = "block";
      authLoggedMsg.textContent = `You are successfully logged into the account for ${email || "your email"}.`;
    }

    setAuthStatus("");
    return;
  }

  // not logged
  if (authTitle) authTitle.textContent = mode === "login" ? "Login" : "Register";
  if (authFields) authFields.style.display = "block";
  if (authLoggedMsg) authLoggedMsg.style.display = "none";
  if (authLinksRow) authLinksRow.style.display = "flex";
  if (submitBtn) submitBtn.style.display = "inline-flex";
  if (logoutBtn) logoutBtn.style.display = "none";
  if (profileBtn) profileBtn.style.display = "none";
}

toggleModeBtn?.addEventListener("click", () => {
  if (isLoggedIn()) return;
  setMode(mode === "login" ? "register" : "login");
});

profileBtn?.addEventListener("click", async () => {
  try {
    const res = await api("/profile");
    const username = res.user.username;

    window.open(
      `/profile/`,
      "_blank",
      "noopener,noreferrer"
    );
  } catch (err) {
    console.error("Failed to fetch profile:", err);
    alert("Failed to open profile");
  }
});

forgotBtn?.addEventListener("click", async () => {
  const email = prompt("Enter your account email:");

  if (!email) return;

  setLoading(true);
  setAuthStatus("Sending reset email...", "");

  try {
    await api("/auth/forgot-password", {
      method: "POST",
      body: { email }
    });

    setAuthStatus("If this email exists, a reset link has been sent.", "success");
  } catch (err) {
    setAuthStatus("Error sending reset email.", "error");
  } finally {
    setLoading(false);
  }
});

// Handle submit (click OR Enter)
authForm?.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (isLoggedIn()) return;

  // HTML validation first
  if (!authForm.checkValidity()) {
    authForm.reportValidity();
    setAuthStatus("Please fix the highlighted fields before continuing.", "error");
    return;
  }

  // JS validation (extra)
  const email = (emailEl?.value || "").trim().toLowerCase();
  const password = (passEl?.value || "");

  if (password.length < 8) {
    setAuthStatus("Password must be at least 8 characters.", "error");
    passEl?.focus();
    return;
  }

  setLoading(true);
  setAuthStatus("Contacting server…", "");

  try {
    const route = mode === "login" ? "/auth/login" : "/auth/register";
    const data = await api(route, { method: "POST", body: { email, password } });

    localStorage.setItem(TOKEN_KEY, data.token);

    // (On garde ton flow reload)
    sessionStorage.setItem(FLASH_KEY, "Logged in. Syncing cloud saves and restarting the game…");
    location.reload();
  } catch (err) {
    const code = err?.message || "unknown_error";

    if (code === "bad_input") {
      setAuthStatus("Please enter a valid email and a password of at least 8 characters.", "error");
    } else if (code === "email_taken") {
      setAuthStatus("This email is already registered. Try logging in instead.", "error");
    } else if (code === "invalid_credentials") {
      setAuthStatus("Invalid email or password.", "error");
    } else {
      setAuthStatus("Authentication failed: " + code, "error");
    }
  } finally {
    setLoading(false);
  }
});

logoutBtn?.addEventListener("click", () => {
  const ok = confirm(
    "Logging out will restart the game.\nAny unsaved progress will be lost.\n\nContinue?"
  );
  if (!ok) return;

  localStorage.removeItem(TOKEN_KEY);
  sessionStorage.setItem(FLASH_KEY, "Logged out. Guest mode enabled.");
  location.reload();
});

// init
setMode("login");
updateAuthUI();