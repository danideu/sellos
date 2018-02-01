var scollSteps = [
    ['animate', 'rings'],
    ['animate', 'cobi'],
    ['move']
];


jQuery(document).ready(function($) {
    SCROLL_FULLPAGE_init();
    document.location.hash = 1;
});

jQuery(window).on("resize", function () {
    SCROLL_FULLPAGE_init();
});

jQuery(window).bind('mousewheel', function(event) {
    var actualHash = parseInt(document.location.hash.replace("#", ""));


    if(event.originalEvent.wheelDelta < 0) {
        //scroll down
        document.location.hash = actualHash + 1;
    }else {
        //scroll up
        if (actualHash - 1 > 0) {
            document.location.hash = actualHash - 1;
        }

    }

    return false;
});

jQuery(document).on('touchmove', function() { //touchmove works for iOS, I don't know if Android supports it
    jQuery(window).trigger('mousewheel');
});





function SCROLL_FULLPAGE_init () {
    jQuery("body").addClass("overflow_hidden");
    jQuery("section").height(jQuery(window).height());
}

function SCROLLCONTROLL_moveScroll() {
    var moveScroll = true;

    moveScroll = false;

    return moveScroll;
}