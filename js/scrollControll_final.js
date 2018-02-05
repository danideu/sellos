
jQuery(document).ready(function($) {
    SCROLL_FULLPAGE_init();

    setTimeout(function () {
        var actualHash = document.location.hash;

        if (actualHash.length > 1) {
            actualHash = parseInt(document.location.hash.replace("#", ""));
        } else {
            actualHash = 1;
        }

        if (actualHash === parseInt(actualHash, 10)) {
            document.location.hash = actualHash;
        } else {
            actualHash = 1;
            document.location.hash = actualHash;
        }

        console.log("Hash actual [" + actualHash + "]");

        SCROLLCONTROL_navigation_update(actualHash);
    }, 300)
});

jQuery(window).on("resize", function () {
    SCROLL_FULLPAGE_init();
});

jQuery("body").scrollsteps({
    up: prev,  // callback for the UP step scroll event, all the events are of course optional
    down: next,  // callback for the DOWN step scroll event
    left: left,  // callback for the UP step scroll event, all the events are of course optional
    right: right,  // callback for the DOWN step scroll event
    transitionDuration: 1200, // Duration of the main transition event, for example page transitions in a fullPage scroller.
    quietPeriodBetweenTwoScrollEvents: 200, // Increases responsiveness, minimum delay between two quiet periods (no scroll events) to force the transition event if the transitionDuration is not completed.
});

jQuery(document).on('touchmove', function() { //touchmove works for iOS, I don't know if Android supports it
    jQuery(window).trigger('mousewheel');
});

jQuery(window).bind('hashchange', function() {
    console.log(window.location.hash);
});


function prev () {
    SCROLLCONTROL_executeMove("up");
}

function next () {
    SCROLLCONTROL_executeMove("down");
}

function left () {

}

function right () {

}

window.addEventListener("hashchange", SCROLLCONTROL_hashChange, false);

function SCROLLCONTROL_hashChange () {
    var actualHash = parseInt(document.location.hash.replace("#", ""));

    SCROLLCONTROL_moveSection(actualHash);

    SCROLLCONTROL_navigation_update(actualHash);
}

function SCROLL_FULLPAGE_init () {
    jQuery("section").height(jQuery(window).height());

    SCROLLCONTROL_navigation_generate();
    SCROLLCONTROL_navigation_event();
}

function SCROLLCONTROL_executeMove (moveTo, forcedHash) {
    var actualHash = 0;
    var actualHash_internal = 0;

    if (forcedHash !== undefined) {
        actualHash = forcedHash;
    } else {
        actualHash = parseInt(document.location.hash.replace("#", ""));
    }

    var sectionIndex = parseInt(actualHash) - 1;
    console.log("Buscanso la seccion [" + sectionIndex + "]");
    var actualSection = jQuery("section").get(sectionIndex);


    switch(moveTo) {
       case "up":
           console.log("subiendo");

           var actualSection_itemToNoAnimate = jQuery(actualSection).find(".step.animated").length - 1;

           if (actualSection_itemToNoAnimate >= 0) {
               console.log("Elemento a DES-animar:");
               console.log(actualSection_itemToNoAnimate);

               console.log("Index del elemento a des-animar [" + actualSection_itemToNoAnimate + "]");

               var animateItem_sectionIndex = parseInt(sectionIndex) + 1;
               var animateItem_itemIndex = parseInt(actualSection_itemToNoAnimate);

               SCROLLCONTROL_animateItem(animateItem_sectionIndex, animateItem_itemIndex);

           } else {
               actualHash = parseInt(document.location.hash.replace("#", ""));
               var sectionToMove_index = parseInt(actualHash) - 1;
               if (sectionToMove_index > 0) {
                   window.location.hash = sectionToMove_index;
               }
           }
       break;

       case "down":
           console.log("Bajando");

           var actualSection_itemToAnimate_index =  jQuery(actualSection).find(".step.animated").length;

           if ((actualSection_itemToAnimate_index + 1) <= jQuery(actualSection).find(".step").length) {
               console.log("Index del elemento a animar [" + actualSection_itemToAnimate_index + "]");

               var animateItem_sectionIndex = parseInt(sectionIndex) + 1;
               var animateItem_itemIndex = parseInt(actualSection_itemToAnimate_index) + 1;

               SCROLLCONTROL_animateItem(animateItem_sectionIndex, animateItem_itemIndex);

           } else {
               actualHash = parseInt(document.location.hash.replace("#", ""));
               var sectionToMove_index = parseInt(actualHash) + 1;
               window.location.hash = sectionToMove_index;
           }
       break;
    }

}

function SCROLLCONTROL_animateItem (hashIndex, itemIndex, animationForced) {

    console.log("Animando hashIndex [" + hashIndex + "] - itemIndex [" + itemIndex + "]");

    switch (hashIndex) {
        case 1:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_blue"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_black"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_red"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_yellow"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_green"), animationForced);

                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1 .aros"), animationForced);
                break;
                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1 .aros"), animationForced);

                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_blue"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_black"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_red"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_yellow"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1 .aros img.rings.ring_green"), animationForced);

                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1 .cobi"), animationForced);
                    break;
                case 2:
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1 .cobi"), animationForced);

                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_2"), animationForced);
                    break;
                case 3:
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_2"), animationForced);

                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_2 .text"), animationForced);
                    break;

                case 4:
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_2 .text"), animationForced);

                    SCROLLCONTROL_animateUndo("section1-diapo2-sello", animationForced);
                break;

                case 5:
                    SCROLLCONTROL_animateDo("section1-diapo2-sello", animationForced);

                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_2 .claim"), animationForced);
                break;

                case 6:
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_2 .claim"), animationForced);
                break;
            }
            break;

        case 2:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.second .diapo.diapo_1 .minidesc"), animationForced);

                    setTimeout(function () {
                        SCROLLCONTROL_animateUndo(jQuery("section.second .diapo.diapo_1 .img-esquina-r-t"), animationForced);
                        SCROLLCONTROL_animateUndo(jQuery("section.second .diapo.diapo_1 .img-esquina-l-b"), animationForced);
                        setTimeout(function () {
                            SCROLLCONTROL_animateUndo(jQuery("section.second .diapo.diapo_1 .titulodesc"), animationForced);
                        }, 700);
                    }, 500);
                break;

                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.second .diapo.diapo_1 .img-esquina-r-t"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.second .diapo.diapo_1 .img-esquina-l-b"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.second .diapo.diapo_1 .titulodesc"), animationForced);

                    setTimeout(function () {
                        SCROLLCONTROL_animateDo(jQuery("section.second .diapo.diapo_1 .minidesc"), animationForced);
                    }, 1000);

                    SCROLLCONTROL_animateUndo(jQuery("section.second .diapo.diapo_2 .buzon"), animationForced);
                    SCROLLCONTROL_animateUndo("section2-diapo2-sobre", animationForced);

                    setTimeout(function () {
                        SCROLLCONTROL_animateUndo(jQuery("section.second .diapo.diapo_1"), animationForced);
                        SCROLLCONTROL_animateUndo(jQuery("section.second .diapo.diapo_2"), animationForced);
                    }, 500);
                break;

                case 2:
                    SCROLLCONTROL_animateDo(jQuery("section.second .diapo.diapo_1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.second .diapo.diapo_2"), animationForced);

                    SCROLLCONTROL_animateDo(jQuery("section.second .diapo.diapo_2 .buzon"), animationForced);
                    setTimeout(function () {
                        SCROLLCONTROL_animateDo("section2-diapo2-sobre", animationForced);
                    }, 500);

                break;

                case 3:

                break;

            }
        break;

        case 3:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.third .diapo.diapo_1 .image_mariscal"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.third .diapo.diapo_1 .image_cobiCirculo"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.third .diapo.diapo_1 .image_cobiSello"), animationForced);
                break;

                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.third .diapo.diapo_1 .image_mariscal"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.third .diapo.diapo_1 .image_cobiCirculo"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.third .diapo.diapo_1 .image_cobiSello"), animationForced);
                break;
            }
        break;

        case 4:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.fourth .diapo.diapo_1 .part2"), animationForced);
                    setTimeout(function () {
                        SCROLLCONTROL_animateUndo(jQuery("section.fourth .diapo.diapo_1 .part1"), animationForced);
                    }, 300);
                break;

                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.fourth .diapo.diapo_1 .part1"), animationForced);
                    setTimeout(function () {
                        SCROLLCONTROL_animateDo(jQuery("section.fourth .diapo.diapo_1 .part2"), animationForced);
                    }, 200);
                break;
            }
        break;

        case 4:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.fourth .diapo.diapo_1 .part2"), animationForced);
                    setTimeout(function () {
                        SCROLLCONTROL_animateUndo(jQuery("section.fourth .diapo.diapo_1 .part1"), animationForced);
                    }, 300);
                    break;

                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.fourth .diapo.diapo_1 .part1"), animationForced);
                    setTimeout(function () {
                        SCROLLCONTROL_animateDo(jQuery("section.fourth .diapo.diapo_1 .part2"), animationForced);
                    }, 200);
                break;
            }
        break;

        case 5:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.five .diapo.diapo_1 .image1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.five .diapo.diapo_1 .image2"), animationForced);
                break;

                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.five .diapo.diapo_1 .image1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.five .diapo.diapo_1 .image2"), animationForced);
                break;
            }
        break;

        case 6:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo("section5-diapo1-part2", animationForced);
                    setTimeout(function () {
                        SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_1 .part1"), animationForced);
                    }, 500);
                    break;

                case 1:

                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_2"), animationForced);

                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_1 .part1"), animationForced);
                    setTimeout(function () {
                        SCROLLCONTROL_animateDo("section5-diapo1-part2", animationForced);
                    }, 500);

                break;

                case 2:
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_2 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_2 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_2 .sello3"), animationForced);

                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_2"), animationForced);
                break;

                case 3:
                    jQuery("section.six .diapo").animate({
                        top: "-100%"
                    }, 500);

                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_3"), animationForced);

                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_2 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_2 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_2 .sello3"), animationForced);
                break;

                case 4:
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_3 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_3 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_3 .sello3"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_3 .sello4"), animationForced);

                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-200%"
                    }, 500);
                break;

                case 5:
                    jQuery("section.six .diapo").animate({
                        top: "-200%"
                    }, 500);

                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_4"), animationForced);

                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_3 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_3 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_3 .sello3"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_3 .sello4"), animationForced);
                break;

                case 6:

                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_4 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_4 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_4 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-300%"
                    }, 500);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_4"), animationForced);

                break;

                case 7:
                    jQuery("section.six .diapo").animate({
                        top: "-300%"
                    }, 500);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_5"), animationForced);


                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_4 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_4 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_4 .sello3"), animationForced);

                    break;

                case 8:
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_5 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_5 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_5 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-400%"
                    }, 500);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_5"), animationForced);

                break;

                case 9:
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_5 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_5 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_5 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-400%"
                    }, 500);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_6"), animationForced);
                break;

                case 10:
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_6 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_6 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_6 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-500%"
                    }, 500);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_6"), animationForced);
                break;

                case 11:
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_6 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_6 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_6 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-500%"
                    }, 500);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_7"), animationForced);
                break;

                case 12:
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_7 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_7 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_7 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-600%"
                    }, 500);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_7"), animationForced);
                break;

                case 13:
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_7 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_7 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_7 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-600%"
                    }, 500);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_8"), animationForced);
                break;

                case 14:
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_8 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_8 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_8 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-700%"
                    }, 500);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_8"), animationForced);
                break;

                case 15:
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_8 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_8 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_8 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-700%"
                    }, 500);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_9"), animationForced);
                break;

                case 16:
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_9 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_9 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.six .diapo.diapo_9 .sello3"), animationForced);

                    jQuery("section.six .diapo").animate({
                        top: "-800%"
                    }, 500);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_9"), animationForced);
                break;
                case 17:
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_9 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_9 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.six .diapo.diapo_9 .sello3"), animationForced);
                break;
            }
        break;

        case 7:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_1 .element1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_1 .element2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_1 .element3"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_1 .element4"), animationForced);
                    break;

                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_1 .element1"), animationForced);
                    setTimeout(function () {
                        SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_1 .element2"), animationForced);
                        setTimeout(function () {
                            SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_1 .element3"), animationForced);
                            SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_1 .element4"), animationForced);
                        }, 300);
                    }, 300);

                    jQuery("section.seven .diapo").animate({
                        top: "0%"
                    }, 500);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_2"), animationForced);
                break;

                case 2:
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_2 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_2 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_2 .sello3"), animationForced);

                    jQuery("section.seven .diapo").animate({
                        top: "-100%"
                    }, 500);
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_2"), animationForced);
                break;

                case 3:
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_2 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_2 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_2 .sello3"), animationForced);

                    jQuery("section.seven .diapo").animate({
                        top: "-100%"
                    }, 500);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_3"), animationForced);
                break;

                case 4:
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_3 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_3 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.seven .diapo.diapo_3 .sello3"), animationForced);

                    jQuery("section.seven .diapo").animate({
                        top: "-200%"
                    }, 500);
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_3"), animationForced);
                break;

                case 5:
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_3 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_3 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.seven .diapo.diapo_3 .sello3"), animationForced);
                break;
            }
        break;

        case 8:
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.eight .diapo.diapo_1 .element1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.eight .diapo.diapo_1 .element2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.eight .diapo.diapo_1 .element3"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.eight .diapo.diapo_1 .element4"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.eight .diapo.diapo_1 .element5"), animationForced);
                break;

                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.eight .diapo.diapo_1 .element1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.eight .diapo.diapo_1 .element2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.eight .diapo.diapo_1 .element3"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.eight .diapo.diapo_1 .element4"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.eight .diapo.diapo_1 .element5"), animationForced);
                break;
            }
        break;

        case 9:
            console.log("ENTRAAA");
            switch (itemIndex) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery("section.nine .diapo.diapo_1 .sello1"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.nine .diapo.diapo_1 .sello2"), animationForced);
                    SCROLLCONTROL_animateUndo(jQuery("section.nine .diapo.diapo_1 .sello3"), animationForced);
                break;

                case 1:
                    SCROLLCONTROL_animateDo(jQuery("section.nine .diapo.diapo_1 .sello1"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.nine .diapo.diapo_1 .sello2"), animationForced);
                    SCROLLCONTROL_animateDo(jQuery("section.nine .diapo.diapo_1 .sello3"), animationForced);
                break;
            }
        break;

    }
}


function SCROLLCONTROL_animateDo (elementReferer, animationForced) {

    switch(elementReferer) {
        case "section1-diapo2-sello":
            var delayAnimation = 500;
            if (animationForced === true) {
                delayAnimation = 1;
            }
            jQuery('section.first .diapo.diapo_2 .image').animate({
                bottom: [-30, 'easeOutQuint'],
                right: 0,
                opacity: 1
            }, delayAnimation);
            if (animationForced === true) {
                jQuery("section.first .diapo.diapo_2 .image").removeClass("no-animated");
                jQuery("section.first .diapo.diapo_2 .image").addClass("animated");
            } else {
                jQuery("section.first .diapo.diapo_2 .image").switchClass("no-animated", "animated", 500, "easeInOutQuad");
            }
        break;

        case "section2-diapo2-sobre":
            var delayAnimation = 500;
            if (animationForced === true) {
                delayAnimation = 1;
            }
            jQuery('section.second .diapo.diapo_2 .sobre').animate({
                bottom: ["60px", 'easeOutQuint'],
                right: "29%",
                opacity: 1
            }, delayAnimation);
            if (animationForced === true) {
                jQuery("section.second .diapo.diapo_2 .sobre").removeClass("no-animated");
                jQuery("section.second .diapo.diapo_2 .sobre").addClass("animated");
            } else {
                jQuery("section.second .diapo.diapo_2 .sobre").switchClass("no-animated", "animated", 500, "easeInOutQuad");
            }
        break;

        case "section5-diapo1-part2":
            var delayAnimation = 500;
            if (animationForced === true) {
                delayAnimation = 1;
            }
            jQuery('section.six .diapo.diapo_1 .part2').animate({
                bottom: ["35%", 'easeOutQuint'],
                right: "0%",
            }, delayAnimation);
            if (animationForced === true) {
                jQuery("section.six .diapo.diapo_1 .part2").removeClass("no-animated");
                jQuery("section.six .diapo.diapo_1 .part2").addClass("animated");
            } else {
                jQuery("section.six .diapo.diapo_1 .part2").switchClass("no-animated", "animated", 500, "easeInOutQuad");
            }
        break;

        default:
            if (animationForced === true) {
                jQuery(elementReferer).removeClass("animated");
                jQuery(elementReferer).addClass("animated");
            } else {
                jQuery(elementReferer).switchClass("no-animated", "animated", 500, "easeInOutQuad");
            }

    }

}

function SCROLLCONTROL_animateUndo (elementReferer, animationForced) {
    switch(elementReferer) {
        case "section1-diapo2-sello":
            var delayAnimation = 500;
            if (animationForced === true) {
                delayAnimation = 1;
            }
            jQuery('section.first .diapo.diapo_2 .image').animate({
                bottom: ["-160%", 'easeInQuint'],
                right: "-57%",
                opacity: 0
            }, delayAnimation);
            if (animationForced === true) {
                jQuery("section.first .diapo.diapo_2 .image").removeClass("animated");
                jQuery("section.first .diapo.diapo_2 .image").addClass("no-animated");
            } else {
                jQuery("section.first .diapo.diapo_2 .image").switchClass("animated", "no-animated", 500, "easeInOutQuad");
            }
        break;

        case "section2-diapo2-sobre":
            var delayAnimation = 500;
            if (animationForced === true) {
                delayAnimation = 1;
            }
            jQuery('section.second .diapo.diapo_2 .sobre').animate({
                bottom: ["-160%", 'easeInQuint'],
                right: "-57%",
                opacity: 0
            }, delayAnimation);
            if (animationForced === true) {
                jQuery("section.second .diapo.diapo_2 .sobre").removeClass("animated");
                jQuery("section.second .diapo.diapo_2 .sobre").addClass("no-animated");
            } else {
                jQuery("section.second .diapo.diapo_2 .sobre").switchClass("animated", "no-animated", 500, "easeInOutQuad");
            }
        break;

        case "section5-diapo1-part2":
            var delayAnimation = 500;
            if (animationForced === true) {
                delayAnimation = 1;
            }
            jQuery('section.six .diapo.diapo_1 .part2').animate({
                bottom: ["-17%", 'easeInOutQuart'],
                right: "-73%",
            }, delayAnimation);
            if (animationForced === true) {
                jQuery("section.six .diapo.diapo_1 .part2").removeClass("animated");
                jQuery("section.six .diapo.diapo_1 .part2").addClass("no-animated");
            } else {
                jQuery("section.six .diapo.diapo_1 .part2").switchClass("animated", "no-animated", 500, "easeInOutQuad");
            }
        break;

        default:
            if (animationForced === true) {
                jQuery(elementReferer).removeClass("animated");
                jQuery(elementReferer).addClass("no-animated");
            } else {
                jQuery(elementReferer).switchClass("animated", "no-animated", 500, "easeInOutQuad");
            }
    }
}

function SCROLLCONTROL_moveSection (sectionNumber) {
    var sectionToMove = sectionNumber - 1;

    console.log("Moviendo a sección [" + sectionNumber + "]");

    var sectionToMove = jQuery("section").get(sectionToMove);
    var sectionTop = jQuery(sectionToMove).offset();
    sectionTop = sectionTop.top;

    console.log();

    var body = jQuery("html");
    body.stop().animate({scrollTop:sectionTop}, 500, 'swing', function() {
        SCROLLCONTROL_beforeSection_activeAnimations(sectionNumber);
    });

}

function SCROLLCONTROL_section_getLastStep (sectionNumber) {
    var sectionLastStep = 0;

    console.log("---- Obteniendo ultimo step de la sección [" + sectionNumber + "]");

    var actualSectionContainer = jQuery("section").get(sectionNumber - 1);
    sectionLastStep = jQuery(actualSectionContainer).find(".step").length;

    console.log("-------- Ultimo step [" + sectionLastStep + "]");

    return sectionLastStep;
}

function SCROLLCONTROL_beforeSection_activeAnimations(sectionNumber) {
    var beforeSectionNumber = parseInt(sectionNumber) - 1;


    console.log("---- Ejecutando las animaciones de las ección anterior [" + beforeSectionNumber + "]");

    if (beforeSectionNumber > 0) {

        var beforeSection = jQuery("section").get(beforeSectionNumber - 1);

        console.log(beforeSection);

        if (jQuery(beforeSection).length) {
            var allAnimationItems = jQuery(beforeSection).find(".no-animated");
            jQuery(allAnimationItems).each(function (itemIndex) {
                var animationForced = true;
                SCROLLCONTROL_animateItem(beforeSectionNumber, itemIndex, animationForced);
            });
        }
    }
}

function SCROLLCONTROL_navigation_generate () {
    var scrollNavigationUL = jQuery(".scrollNavigation ul");

    jQuery(scrollNavigationUL).find("li").remove();

    jQuery("section").each(function () {
        var sectionTitle = jQuery(this).attr("id");
        jQuery("<li><a href='javascript:void(null)' alt='" + sectionTitle + "'><span></span></a></li>").appendTo(scrollNavigationUL);

        var navigationElement = jQuery(".scrollNavigation ul").last();

    })
}

function SCROLLCONTROL_navigation_event () {
    jQuery(".scrollNavigation ul li a").on("click", function () {
        var actualElement_containerLI = jQuery(this).parent("li");

        var actualIndex = jQuery(".scrollNavigation ul li").index(actualElement_containerLI);

        window.location.hash = actualIndex + 1;
    });
}


function SCROLLCONTROL_navigation_update (actualHash) {
    actualHash = parseInt(actualHash);

    var elementIndexToRemark = actualHash - 1;

    console.log("SCROLLCONTROL_navigation_update [" + elementIndexToRemark + "]");
    jQuery(".scrollNavigation ul li.active").removeClass("active");

    console.log("Marcando elemento [" + elementIndexToRemark + "]");

    var navigationElementToRemark = jQuery(".scrollNavigation ul li").get(elementIndexToRemark);
    jQuery(navigationElementToRemark).addClass("active");
}