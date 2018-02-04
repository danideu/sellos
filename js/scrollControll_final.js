
jQuery(document).ready(function($) {
    SCROLL_FULLPAGE_init();

    setTimeout(function () {
        if (document.location.hash.length > 0) {
            var actualHash = parseInt(document.location.hash.replace("#", ""));

            SCROLLCONTROL_moveSection(actualHash);
        } else {
            actualHash = 1;
            document.location.hash = actualHash;
        }

        console.log("Hash actual [" + actualHash + "]");
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

function    SCROLL_FULLPAGE_init () {
    jQuery("section").height(jQuery(window).height());
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

                   SCROLLCONTROL_moveSection(sectionToMove_index);
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

               SCROLLCONTROL_moveSection(sectionToMove_index);
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
            console.log("ENTRAAA");
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