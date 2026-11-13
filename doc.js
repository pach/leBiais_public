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

// Le Biais est en pause : un encart rouge translucide reste au premier plan, sur toutes les pages.
// Gardé : le faux navigateur des tests n'a pas de createElement.
(function () {
    function poser() {
        if (!document.createElement || !document.body || document.querySelector(".pause-filigrane")) return;
        var encart = document.createElement("aside");
        encart.className = "pause-filigrane";
        encart.setAttribute("role", "note");
        encart.innerHTML =
            "<h2>Le Biais est mise en pause</h2>" +
            "<p>Le Biais est une application de carnet de pâturage, de soins et d’estive, conçue par deux bergers, Noé et Thomas.</p>" +
            "<p>À la suite d’un débat soulevé par des adhérent·es de l’<a href=\"https://abbasp.fr/\">ABBASP</a>, l’application est mise en pause. " +
            "En effet, certain·es craignent qu’elle devienne à terme imposée, ou qu’elle s’impose dans le métier, " +
            "et que ce type d’outil ne soit pas souhaitable dans nos pratiques. " +
            "Ces inquiétudes sont légitimes, et nous pensons qu’elles méritent d’être discutées ensemble.</p>" +
            "<p>Pour laisser la place au débat et à la discussion, l’application n’est donc plus téléchargeable pour le moment.</p>" +
            "<p>Vous souhaitez <a href=\"mailto:abbasp.asso@gmail.com?subject=%5BLe%20Biais%5D\">participer à cette discussion ? Écrivez-nous</a>.</p>";
        document.body.appendChild(encart);
    }
    if (document.readyState === "loading" || !document.readyState) document.addEventListener("DOMContentLoaded", poser);
    else poser();
})();
