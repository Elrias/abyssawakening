(() => {
    // --- Bloc 1 : redimensionner le canvas ---
    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        if (Utils.isMobileDevice()) {
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
        }
    };

    function resizeCanvas() {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const scale = Math.min(w / Graphics.width, h / Graphics.height);

        const canvas = Graphics._canvas;
        canvas.style.width = Math.floor(Graphics.width * scale) + 'px';
        canvas.style.height = Math.floor(Graphics.height * scale) + 'px';
        canvas.style.position = 'absolute';
        canvas.style.left = `${(w - Graphics.width * scale) / 2}px`;
        canvas.style.top = `${(h - Graphics.height * scale) / 2}px`;

        Graphics._centerElement(canvas);
    }

    // --- Bloc 2 : corriger les inputs tactiles ---
    TouchInput._canvasToLocalX = function(x) {
        const canvas = Graphics._canvas;
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.width / rect.width;
        return Math.floor((x - rect.left) * scale);
    };

    TouchInput._canvasToLocalY = function(y) {
        const canvas = Graphics._canvas;
        const rect = canvas.getBoundingClientRect();
        const scale = canvas.height / rect.height;
        return Math.floor((y - rect.top) * scale);
    };
})();
