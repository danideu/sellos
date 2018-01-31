jQuery(document).ready(function($){
	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	updateNavigation();
	$(window).on('scroll', function(){
        if (SCROLLCONTROLL_moveScroll()) {
            updateNavigation();
        }
	});

	//smooth scroll to the section
	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    //smooth scroll to second section
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });

    //open-close navigation on touch devices
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');
  
    });
    //close navigation on touch devices when selectin an elemnt from the list
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	function smoothScroll(target) {
        $('body,html').animate(
        	{'scrollTop':target.offset().top},
        	600
        );
	}
});


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



//Si se hace scroll con el ratón
var contScroll = 0;
$(document).on("mousewheel DOMMouseScroll", function(e) {
    
    // Prevent a page reload when a link is pressed
    e.preventDefault();
    //console.log("Scroll");
    contScroll =contScroll + 1;
    console.log(contScroll);
    if (contScroll == 5){
        $('.aros').animate({opacity: '0.7'}, 800);
    }else if(contScroll == 6){
        $('.cobi').animate({left: '30%'}, 600);
    }else if(contScroll == 10){
        $('body,html').animate(
            {'scrollTop':$('#section2').offset().top},
            600
        );
    }else{

    }
    //$("html, body").animate({scrollTop: $('#section3').offset().top }, 2000)
    
  });