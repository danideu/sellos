(function($) {

  'use strict';

  // variables
  var $isAnimatedSecond = $('.second .is-animated'),
      $isAnimatedSecondSingle = $('.second .is-animated__single'),
      $isAnimatedThird = $('.third .is-animated'),
      $isAnimatedThirdSingle = $('.third .is-animated__single'),
      $isAnimatedFourth = $('.fourth .is-animated'),
      $isAnimatedFourthSingle = $('.fourth .is-animated__single');

  // initialize fullPage
  $('#fullpage').fullpage({

    navigation: true,
    onLeave: function(index, nextIndex, direction) {

      /**
      * use the following condition:
      *
      *   if( index == 1 && direction == 'down' ) {
      *
      * if you haven't enabled the dot navigation
      * or you aren't interested in the animations that occur
      * when you jump (using the dot navigation)
      * from the first section to another sections
      */

      // first animation
      if( index == 1 && nextIndex == 2 ) {
        $isAnimatedSecond.addClass('animated fadeInUpBig');
        $isAnimatedSecond.eq(0).css('animation-delay', '.3s');
        $isAnimatedSecond.eq(1).css('animation-delay', '1.8s');
        $isAnimatedSecond.eq(2).css('animation-delay', '.9s');
        $isAnimatedSecondSingle.addClass('animated rollIn').css('animation-delay', '1.7s');
      }

    /**
      * use the following condition:
      *
      *   else if( index == 2 && direction == 'down' ) {
      *
      * if you haven't enabled the dot navigation
      * or you aren't interested in the animations that occur
      * when you jump (using the dot navigation) from the first section to the third one
      */

      // second animation
      else if( ( index == 1 || index == 2 ) && nextIndex == 3 ) {
        $isAnimatedThird.eq(0).addClass('animated fadeInRightBig').css('animation-delay', '.3s');
        $isAnimatedThird.eq(1).addClass('animated fadeInLeftBig').css('animation-delay', '.6s');
        $isAnimatedThirdSingle.addClass('animated bounceInDown').css('animation-delay', '1.2s');
      }


     /**
      * use the following condition:
      *
      *   else if( index == 3 && direction == 'down' ) {
      *
      * if you haven't enabled the dot navigation
      * or you aren't interested in the animations that occur
      * when you jump (using the dot navigation)
      * from the first or second section to the fourth one
      */

      // third animation
      else if( ( index == 1 || index == 2 || index == 3 ) && nextIndex == 4 ) {
        $isAnimatedFourth.addClass('animated zoomIn').css('animation-delay', '.6s');
        $isAnimatedFourthSingle.addClass('animated lightSpeedIn').css('animation-delay', '1.2s');
        $isAnimatedFourthSingle.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
          $(this).removeClass('lightSpeedIn').addClass('zoomOutDown');
        });
      }
    }

  });

})(jQuery);


/* Compartir Botón */
postShareButtonClick = $(function (){
    var buttonWrapper = $(".share-button"),
        button = $(".share-button > a"),
        icons = $(".share-button > .icon-wrapper"),
        close = $(".close-social-icons");

    function init(){
        button.on("click", toggle);
        close.on("click", closeIcons);
    }

    function toggle(e){
        if (buttonWrapper.hasClass("active")){
            closeIcons();
        } else{
            openIcons();
        }
        e.preventDefault();
    }

    function openIcons(){
        buttonWrapper.addClass("active");
        button.addClass("hidden");
        buttonWrapper.animate({width: "286"}, 500);
        icons.animate({left: "0"}, 500);
    }

    function closeIcons(){
        buttonWrapper.removeClass("active");
      button.removeClass("hidden");
        icons.animate({left: "-286"}, 0);
        buttonWrapper.animate({width: "178"}, 0);
    }

    init();
});


/* FULL SCREEN BUTTON */
(function() {

/**
 * Sets or gets the fullscreen state.
 *
 * @param {boolean=} state
 *            True to enable fullscreen mode, false to disable it. If not
 *            specified then the current fullscreen state is returned.
 * @return {boolean|Element|jQuery|null}
 *            When querying the fullscreen state then the current fullscreen
 *            element (or true if browser doesn't support it) is returned
 *            when browser is currently in full screen mode. False is returned
 *            if browser is not in full screen mode. Null is returned if
 *            browser doesn't support fullscreen mode at all. When setting
 *            the fullscreen state then the current jQuery selection is
 *            returned for chaining.
 * @this {jQuery}
 */
function fullScreen(state)
{
    var e, func, doc;

    // Do nothing when nothing was selected
    if (!this.length) return this;

    // We only use the first selected element because it doesn't make sense
    // to fullscreen multiple elements.
    e = (/** @type {Element} */ this[0]);

    // Find the real element and the document (Depends on whether the
    // document itself or a HTML element was selected)
    if (e.ownerDocument)
    {
        doc = e.ownerDocument;
    }
    else
    {
        doc = e;
        e = doc.documentElement;
    }

    // When no state was specified then return the current state.
    if (state == null)
    {
        // When fullscreen mode is not supported then return null
        if (!((/** @type {?Function} */ doc["exitFullscreen"])
            || (/** @type {?Function} */ doc["webkitExitFullscreen"])
            || (/** @type {?Function} */ doc["webkitCancelFullScreen"])
            || (/** @type {?Function} */ doc["msExitFullscreen"])
            || (/** @type {?Function} */ doc["mozCancelFullScreen"])))
        {
            return null;
        }

        // Check fullscreen state
        state = !!doc["fullscreenElement"]
            || !!doc["msFullscreenElement"]
            || !!doc["webkitIsFullScreen"]
            || !!doc["mozFullScreen"];
        if (!state) return state;

        // Return current fullscreen element or "true" if browser doesn't
        // support this
        return (/** @type {?Element} */ doc["fullscreenElement"])
            || (/** @type {?Element} */ doc["webkitFullscreenElement"])
            || (/** @type {?Element} */ doc["webkitCurrentFullScreenElement"])
            || (/** @type {?Element} */ doc["msFullscreenElement"])
            || (/** @type {?Element} */ doc["mozFullScreenElement"])
            || state;
    }

    // When state was specified then enter or exit fullscreen mode.
    if (state)
    {
        // Enter fullscreen
        func = (/** @type {?Function} */ e["requestFullscreen"])
            || (/** @type {?Function} */ e["webkitRequestFullscreen"])
            || (/** @type {?Function} */ e["webkitRequestFullScreen"])
            || (/** @type {?Function} */ e["msRequestFullscreen"])
            || (/** @type {?Function} */ e["mozRequestFullScreen"]);
        if (func)
        {
            func.call(e);
        }
        return this;
    }
    else
    {
        // Exit fullscreen
        func = (/** @type {?Function} */ doc["exitFullscreen"])
            || (/** @type {?Function} */ doc["webkitExitFullscreen"])
            || (/** @type {?Function} */ doc["webkitCancelFullScreen"])
            || (/** @type {?Function} */ doc["msExitFullscreen"])
            || (/** @type {?Function} */ doc["mozCancelFullScreen"]);
        if (func) func.call(doc);
        return this;
    }
}

/**
 * Toggles the fullscreen mode.
 *
 * @return {!jQuery}
 *            The jQuery selection for chaining.
 * @this {jQuery}
 */
function toggleFullScreen()
{
    return (/** @type {!jQuery} */ fullScreen.call(this,
        !fullScreen.call(this)));
}

/**
 * Handles the browser-specific fullscreenchange event and triggers
 * a jquery event for it.
 *
 * @param {?Event} event
 *            The fullscreenchange event.
 */
function fullScreenChangeHandler(event)
{
    jQuery(document).trigger(new jQuery.Event("fullscreenchange"));
}

/**
 * Handles the browser-specific fullscreenerror event and triggers
 * a jquery event for it.
 *
 * @param {?Event} event
 *            The fullscreenerror event.
 */
function fullScreenErrorHandler(event)
{
    jQuery(document).trigger(new jQuery.Event("fullscreenerror"));
}

/**
 * Installs the fullscreenchange event handler.
 */
function installFullScreenHandlers()
{
    var e, change, error;

    // Determine event name
    e = document;
    if (e["webkitCancelFullScreen"])
    {
        change = "webkitfullscreenchange";
        error = "webkitfullscreenerror";
    }
    else if (e["msExitFullscreen"])
    {
        change = "MSFullscreenChange";
        error = "MSFullscreenError";
    }
    else if (e["mozCancelFullScreen"])
    {
        change = "mozfullscreenchange";
        error = "mozfullscreenerror";
    }
    else
    {
        change = "fullscreenchange";
        error = "fullscreenerror";
    }

    // Install the event handlers
    jQuery(document).bind(change, fullScreenChangeHandler);
    jQuery(document).bind(error, fullScreenErrorHandler);
}

jQuery.fn["fullScreen"] = fullScreen;
jQuery.fn["toggleFullScreen"] = toggleFullScreen;
installFullScreenHandlers();

})();

$(".fullscreen").click(function () {
     $(document).toggleFullScreen();
});


$(document).on("fullscreenchange", function() {
    if ($(document).fullScreen()){
      $('.fullscreen').addClass('full');
    }
    else {
      $('.fullscreen').removeClass('full');
    }
});

