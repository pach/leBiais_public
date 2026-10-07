// Le titre n'apparaît en fondu qu'à la première page ouverte pendant la visite.
// Sans stockage de session (navigation privée stricte), pas de fondu : il se rejouerait à chaque page.
(function () {
    try {
        if (sessionStorage.getItem("biais-visite")) return;
        sessionStorage.setItem("biais-visite", "1");
    } catch (e) {
        return;
    }
    document.documentElement.classList.add("premiere-visite");
})();

// Sur ordinateur, l'en-tête des chapitres reste collé en haut de la fenêtre. La feuille de style a besoin
// de sa hauteur pour qu'un lien du sommaire amène le titre visé sous l'en-tête, et non derrière.
(function () {
    function mesurer() {
        var entete = document.querySelector(".entete");
        if (entete) document.documentElement.style.setProperty("--entete", entete.offsetHeight + "px");
    }
    document.addEventListener("DOMContentLoaded", mesurer);
    window.addEventListener("load", mesurer);
    window.addEventListener("resize", mesurer);
})();
