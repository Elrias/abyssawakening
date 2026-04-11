/*:
 * @target MZ
 * @plugindesc Ouvre le jeu en plein écran et met à l'échelle le canvas sans modifier les coordonnées logiques.
 * @help
 * Compatibilité : évite d'appeler des méthodes privées inexistantes (ex: Graphics._resizeCanvas).
 */

(() => {

  const requestFullscreenSafe = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) return el.requestFullscreen();
    if (el.webkitRequestFullScreen) return el.webkitRequestFullScreen();
    if (el.mozRequestFullScreen) return el.mozRequestFullScreen();
    if (el.msRequestFullscreen) return el.msRequestFullscreen();
    return Promise.reject(new Error('Fullscreen API not supported'));
  };

  const applyCanvasScaling = () => {
    const canvas = Graphics._canvas;
    if (!canvas) return;

    // taille physique de l'écran (utilise innerWidth/innerHeight si tu veux la taille de la fenêtre)
    const sw = window.screen.width;
    const sh = window.screen.height;

    // taille logique du jeu (référence interne)
    const gw = Graphics.width;
    const gh = Graphics.height;

    // calcul du scale pour garder le ratio sans déformation
    const scale = Math.min(sw / gw, sh / gh);

    // taille affichée après scale
    const scaledW = Math.round(gw * scale);
    const scaledH = Math.round(gh * scale);

    // offset pour centrer le canvas
    const offsetX = Math.round((sw - scaledW) / 2);
    const offsetY = Math.round((sh - scaledH) / 2);

    // positionnement et transformation CSS — on ne change pas les coordonnées logiques
    canvas.style.position = 'fixed';
    canvas.style.left = '0px';
    canvas.style.top = '0px';
    canvas.style.margin = '0';
    canvas.style.padding = '0';
    canvas.style.transformOrigin = '0 0';
    // d'abord translate (px), puis scale. L'ordre matters: translate fixe le positionnement avant mise à l'échelle.
    canvas.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    // Laisser la taille logique inchangée (le moteur dessinera normalement puis sera mise à l'échelle par CSS)
    canvas.style.width = `${gw}px`;
    canvas.style.height = `${gh}px`;

    // optionnel : empêcher le canvas d'être flou sur certains écrans
    canvas.style.imageRendering = 'auto';
  };

  const onBoot = Scene_Boot.prototype.start;
  Scene_Boot.prototype.start = function() {
    onBoot.call(this);

    // attendre la fin d'initialisation du canvas
    setTimeout(() => {
      // tenter le fullscreen (ne fonctionnera que si déclenché par interaction sur certains navigateurs)
      requestFullscreenSafe().catch(() => {
        // fallback silencieux : certains navigateurs exigent une interaction utilisateur
      }).finally(() => {
        applyCanvasScaling();
      });

      // appliquer aussi lors de changements d'orientation / redimensionnements
      window.addEventListener('resize', () => {
        // délai minime pour laisser le navigateur stabiliser les dimensions
        setTimeout(applyCanvasScaling, 50);
      });

      // appliquer lors d'un changement d'orientation (mobile)
      window.addEventListener('orientationchange', () => {
        setTimeout(applyCanvasScaling, 150);
      });
    }, 120);
  };

})();
