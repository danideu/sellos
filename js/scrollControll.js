
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
    transitionDuration: 1000, // Duration of the main transition event, for example page transitions in a fullPage scroller.
    quietPeriodBetweenTwoScrollEvents: 100, // Increases responsiveness, minimum delay between two quiet periods (no scroll events) to force the transition event if the transitionDuration is not completed.
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
                    jQuery(".aros img.rings.ring_blue").switchClass("animate", "no-animate", 500, "easeInOutQuad");
                    jQuery(".aros img.rings.ring_black").switchClass("animate", "no-animate", 500, "easeInOutQuad");
                    jQuery(".aros img.rings.ring_red").switchClass("animate", "no-animate", 500, "easeInOutQuad");
                    jQuery(".aros img.rings.ring_yellow").switchClass("animate", "no-animate", 500, "easeInOutQuad");
                    jQuery(".aros img.rings.ring_green").switchClass("animate", "no-animate", 500, "easeInOutQuad");
                    break;
                case 1:
                    jQuery(".aros img.rings.ring_blue").switchClass("no-animate", "animate", 500, "easeInOutQuad");
                    jQuery(".aros img.rings.ring_black").switchClass("no-animate", "animate", 500, "easeInOutQuad");
                    jQuery(".aros img.rings.ring_red").switchClass("no-animate", "animate", 500, "easeInOutQuad");
                    jQuery(".aros img.rings.ring_yellow").switchClass("no-animate", "animate", 500, "easeInOutQuad");
                    jQuery(".aros img.rings.ring_green").switchClass("no-animate", "animate", 500, "easeInOutQuad");

                    jQuery(".cobi").switchClass("animate", "no-animate", 500, "easeInOutQuad");
                break;
                case 2:
                    jQuery(".cobi").switchClass("no-animate", "animate", 500, "easeInOutQuad");
                break;
                case 3:
                    
                break;
            }
        break;

    }
}