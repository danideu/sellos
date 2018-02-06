
jQuery(document).ready(function () {
    setTimeout(function () {
        jQuery("#portada .sello").switchClass("no-animated", "animated", 500, "easeInOutQuad");

        jQuery("#portada .sobre").switchClass("no-animated", "animated", 500, "easeInOutQuad");

        setTimeout(function () {
            jQuery("#portada .sello a.button").switchClass("no-animated", "animated", 500, "easeInOutQuad");
        }, 700)
    }, 700);
});