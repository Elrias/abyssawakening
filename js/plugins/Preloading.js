(() => {

const IMAGE_FOLDERS = [
    "img/animations/",
    "img/battlebacks1/",
    "img/battlebacks2/",
    "img/characters/",
    "img/enemies/",
    "img/faces/",
    "img/parallaxes/",
    "img/pictures/",
    "img/sv_actors/",
    "img/sv_enemies/",
    "img/system/",
    "img/tilesets/"
];

const AUDIO_FOLDERS = [
    "audio/bgm/",
    "audio/bgs/",
    "audio/me/",
    "audio/se/"
];

const EFFECT_FOLDER = "effects/";

let _filesToLoad = [];
let _loaded = 0;

function preloadImage(path) {
    const bitmap = ImageManager.loadBitmap("", path.replace("img/", ""));
    bitmap.addLoadListener(() => {
        _loaded++;
    });
}

function preloadAudio(folder, name) {
    const type = folder.split("/")[1];
    const buffer = AudioManager.createBuffer(type, name);
    buffer.addLoadListener(() => {
        _loaded++;
    });
}

// Effekseer loader
function preloadEffect(name) {
    const effect = Graphics.effekseer.loadEffect("effects/" + name);
    effect.then(() => {
        _loaded++;
    }).catch(() => {
        console.warn("Erreur preload effect:", name);
        _loaded++;
    });
}

// 🔍 Liste fichiers
async function fetchFiles(folder) {
    const response = await fetch(folder);
    const text = await response.text();

    const regex = /href="([^"]+)"/g;
    let match;
    const files = [];

    while ((match = regex.exec(text)) !== null) {
        const file = match[1];
        if (!file.includes("?") && !file.endsWith("/")) {
            files.push(folder + file);
        }
    }

    return files;
}

async function preloadAll() {

    // Images
    for (const folder of IMAGE_FOLDERS) {
        const files = await fetchFiles(folder);
        files.forEach(file => {
            _filesToLoad.push(() => preloadImage(file));
        });
    }

    // Audio
    for (const folder of AUDIO_FOLDERS) {
        const files = await fetchFiles(folder);
        files.forEach(file => {
            const name = file.split("/").pop().replace(/\..+$/, "");
            _filesToLoad.push(() => preloadAudio(folder, name));
        });
    }

    // Effects (Effekseer)
    const effectFiles = await fetchFiles(EFFECT_FOLDER);
    effectFiles.forEach(file => {
        const name = file.split("/").pop();
        _filesToLoad.push(() => preloadEffect(name));
    });

    // Lancer chargement
    _filesToLoad.forEach(fn => fn());
}

Scene_Boot.prototype.start = function() {
    Scene_Base.prototype.start.call(this);

    preloadAll().then(() => {
        const checkReady = setInterval(() => {
            if (_loaded >= _filesToLoad.length) {
                clearInterval(checkReady);
                SceneManager.goto(Scene_Title);
            }
        }, 50);
    });
};

})();