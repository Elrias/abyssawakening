const toggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("wikiTheme");

if (savedTheme) {
    document.body.classList.remove("theme-light", "theme-dark");
    document.body.classList.add(savedTheme);
} else {
    document.body.classList.add("theme-light");
}

toggle.addEventListener("click", () => {

    if (document.body.classList.contains("theme-dark")) {
        document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-light");
        localStorage.setItem("wikiTheme", "theme-light");
    } else {
        document.body.classList.remove("theme-light");
        document.body.classList.add("theme-dark");
        localStorage.setItem("wikiTheme", "theme-dark");
    }

});

/* ===== BURGER + OVERLAY ===== */

const burger = document.getElementById("burgerBtn");
const mainNav = document.getElementById("mainNav");
const overlay = document.getElementById("menuOverlay");

if (burger) {
    burger.addEventListener("click", () => {
        mainNav.classList.toggle("open");
        burger.classList.toggle("open");
        overlay.classList.toggle("active");
    });
}

if (overlay) {
    overlay.addEventListener("click", () => {
        mainNav.classList.remove("open");
        burger.classList.remove("open");
        overlay.classList.remove("active");
    });
}

/* ===== CLOSE MENU ON LINK CLICK ===== */

document.querySelectorAll(".wiki-main-nav a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        burger.classList.remove("open");
        overlay.classList.remove("active");
    });
});

/* ===== BACK TO TOP ===== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/* ===== UTILITIES ===== */

function cleanDescription(text) {
    if (!text) return "";

    return text
        .replace(/\\C\[\d+\]/g, "")
        .replace(/\\N\[\d+\]/g, "Hiro")
        .replace(/\\n/g, "<br>");
}
