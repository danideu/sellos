
var continueScrolling = true;
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
    SCROLLCONTROLL_executeMove("up");
}

function next () {
    SCROLLCONTROLL_executeMove("down");
}

function left () {

}

function right () {

}

function SCROLL_FULLPAGE_init () {
    jQuery("section").height(jQuery(window).height());
}

function SCROLLCONTROLL_executeMove (moveTo) {
    var actualHash = parseInt(document.location.hash.replace("#", ""));

   switch(moveTo) {
       case "up":
           if (internalStep - 1 >= 0) {
               internalStep = internalStep - 1;
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
                    SCROLLCONTROLL_animateUndo(jQuery(".aros img.rings.ring_blue"));
                    SCROLLCONTROLL_animateUndo(jQuery(".aros img.rings.ring_black"));
                    SCROLLCONTROLL_animateUndo(jQuery(".aros img.rings.ring_red"));
                    SCROLLCONTROLL_animateUndo(jQuery(".aros img.rings.ring_yellow"));
                    SCROLLCONTROLL_animateUndo(jQuery(".aros img.rings.ring_green"));
                break;
                case 1:
                    SCROLLCONTROLL_animateDo(jQuery(".aros img.rings.ring_blue"));
                    SCROLLCONTROLL_animateDo(jQuery(".aros img.rings.ring_black"));
                    SCROLLCONTROLL_animateDo(jQuery(".aros img.rings.ring_red"));
                    SCROLLCONTROLL_animateDo(jQuery(".aros img.rings.ring_yellow"));
                    SCROLLCONTROLL_animateDo(jQuery(".aros img.rings.ring_green"));

                    SCROLLCONTROLL_animateUndo(jQuery(".cobi"))
                break;
                case 2:
                    SCROLLCONTROLL_animateDo(jQuery(".cobi"));

                    SCROLLCONTROLL_animateUndo(jQuery("section.first .diapo.diapo_1"));
                    SCROLLCONTROLL_animateUndo(jQuery("section.first .diapo.diapo_2"));
                break;
                case 3:
                    SCROLLCONTROLL_animateDo(jQuery("section.first .diapo.diapo_1"));
                    SCROLLCONTROLL_animateDo(jQuery("section.first .diapo.diapo_2"));
                break;
            }
        break;

    }
}


function SCROLLCONTROLL_animateDo (elementReferer) {
    jQuery(elementReferer).switchClass("no-animate", "animate", 500, "easeInOutQuad");
}

function SCROLLCONTROLL_animateUndo (elementReferer) {
    jQuery(elementReferer).switchClass("animate", "no-animate", 500, "easeInOutQuad");
}