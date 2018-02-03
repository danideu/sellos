
var internalStep = 0;


jQuery(document).ready(function($) {
    var actualHash = parseInt(document.location.hash.replace("#", ""));
    console.log("Hash actual [" + actualHash + "]");
    console.log("---- InternalStep [" + internalStep + "]");

    SCROLL_FULLPAGE_init();
    document.location.hash = 1;
});

jQuery(window).on("resize", function () {
    SCROLL_FULLPAGE_init();
});

jQuery("body").scrollsteps({
    up: prev,  // callback for the UP step scroll event, all the events are of course optional
    down: next,  // callback for the DOWN step scroll event
    left: left,  // callback for the UP step scroll event, all the events are of course optional
    right: right,  // callback for the DOWN step scroll event
    transitionDuration: 1500, // Duration of the main transition event, for example page transitions in a fullPage scroller.
    quietPeriodBetweenTwoScrollEvents: 1000, // Increases responsiveness, minimum delay between two quiet periods (no scroll events) to force the transition event if the transitionDuration is not completed.
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

function SCROLL_FULLPAGE_init () {
    jQuery("section").height(jQuery(window).height());
}

function SCROLLCONTROL_executeMove (moveTo) {
    var actualHash = parseInt(document.location.hash.replace("#", ""));

   switch(moveTo) {
       case "up":
           if ((internalStep - 1) >= 0) {
               internalStep = internalStep - 1;
           } else {
               if ((actualHash - 1) >= 0) {
                   actualHash = (actualHash - 1);
                   document.location.hash = actualHash;
                   SCROLLCONTROL_moveSection(actualHash);
                   internalStep = SCROLLCONTROL_section_getLastStep(actualHash);
               }
           }
       break;

       case "down":
           internalStep = internalStep + 1;
       break;
    }

    console.log("Hash actual [" + actualHash + "]");
    console.log("---- InternalStep [" + internalStep + "]");


    switch (actualHash) {
        case 1:
            switch (internalStep) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery(".aros img.rings.ring_blue"));
                    SCROLLCONTROL_animateUndo(jQuery(".aros img.rings.ring_black"));
                    SCROLLCONTROL_animateUndo(jQuery(".aros img.rings.ring_red"));
                    SCROLLCONTROL_animateUndo(jQuery(".aros img.rings.ring_yellow"));
                    SCROLLCONTROL_animateUndo(jQuery(".aros img.rings.ring_green"));
                break;
                case 1:
                    SCROLLCONTROL_animateDo(jQuery(".aros img.rings.ring_blue"));
                    SCROLLCONTROL_animateDo(jQuery(".aros img.rings.ring_black"));
                    SCROLLCONTROL_animateDo(jQuery(".aros img.rings.ring_red"));
                    SCROLLCONTROL_animateDo(jQuery(".aros img.rings.ring_yellow"));
                    SCROLLCONTROL_animateDo(jQuery(".aros img.rings.ring_green"));

                    SCROLLCONTROL_animateUndo(jQuery(".cobi"))
                break;
                case 2:
                    SCROLLCONTROL_animateDo(jQuery(".cobi"));

                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_1"));
                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_2"));
                break;
                case 3:
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_1"));
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_2"));

                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_2 .text"));
                    break;

                case 4:
                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_2 .text"));

                    SCROLLCONTROL_animateUndo("section1-diapo2-sello");
                break;

                case 5:
                    SCROLLCONTROL_animateDo("section1-diapo2-sello");

                    SCROLLCONTROL_animateUndo(jQuery("section.first .diapo.diapo_2 .claim"));
                break;

                case 6:
                    SCROLLCONTROL_moveSection(actualHash);

                    SCROLLCONTROL_animateDo(jQuery("section.first .diapo.diapo_2 .claim"));
                break;

                case 7:
                    window.location.hash = parseInt(actualHash) + 1;

                    internalStep = -1;

                    actualHash = parseInt(document.location.hash.replace("#", ""));

                    SCROLLCONTROL_moveSection(actualHash);
                break;
            }
        break;

        case 2:
            switch (internalStep) {
                case 0:
                    SCROLLCONTROL_animateUndo(jQuery(".aros img.rings.ring_blue"));
                break;
            }
        break;

    }
}


function SCROLLCONTROL_animateDo (elementReferer) {

    switch(elementReferer) {
        case "section1-diapo2-sello":
            jQuery('section.first .diapo.diapo_2 .image').animate({
                bottom: [-150, 'easeOutQuint'],
                right: 0,
                opacity: 1
            }, 500);
        break;

        default:
            jQuery(elementReferer).switchClass("no-animate", "animate", 500, "easeInOutQuad");

    }

}

function SCROLLCONTROL_animateUndo (elementReferer) {
    switch(elementReferer) {
        case "section1-diapo2-sello":
            jQuery('section.first .diapo.diapo_2 .image').animate({
                bottom: ["-160%", 'easeOutQuint'],
                right: "-57%",
                opacity: 0
            }, 500);
        break;

        default:
            jQuery(elementReferer).switchClass("animate", "no-animate", 500, "easeInOutQuad");

    }
}

function SCROLLCONTROL_moveSection (sectionNumber) {
    var sectionToMove = jQuery("section").get(sectionNumber - 1);
    var sectionTop = jQuery(sectionToMove).offset();
    sectionTop = sectionTop.top;

    var body = jQuery("html, body");
        body.stop().animate({scrollTop:sectionTop}, 500, 'swing', function() {
    });

}

function SCROLLCONTROL_section_getLastStep (sectionNumber) {
    var sectionLastStep = 0;

    var actualSectionContainer = jQuery("section").get(sectionNumber - 1);
    sectionLastStep = jQuery(actualSectionContainer).find(".step").length;

    return sectionLastStep;
}