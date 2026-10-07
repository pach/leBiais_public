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
