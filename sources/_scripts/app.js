/*-------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////
// DOCUMENT.READY - Fires as soon as DOM is ready
////////////////////////////////////////////////////////////////////////////////////////////////////
------------------------------------------------------------------------------------------------- */
$docu.ready(function()
{
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // When set to 'true', this will attempt to mimic the spacing for a WP Admin bar.
    if( false )
    {
        $body.addClass('admin-bar').prepend('<div id="wpadminbar" class="fake" />');
        $('head').append('<style type="text/css" media="screen">html { margin-top: 32px !important; }* html body { margin-top: 32px !important; }@media screen and ( max-width: 782px ) {html { margin-top: 46px !important; }* html body { margin-top: 46px !important; }}</style>');
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // add a mobile class to the HTML element if mobile device
    $html.addClass( isMobile ? 'mobile' : 'desktop' );
    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Run the double event functions first
    scrollD(); responsiveD();
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Enable all events for the navigation menus
    // navigationControls();
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Open and close the mobile menu
    $('#mobile-button', $head).on('click', function(){
        // $html.addClass('open-menu');
        $html.toggleClass('open-menu');

        // We initially add a class of 'no-ani' to stop the CSS from running the animation keyframes
        $(this).removeClass('no-ani');
    });
    // Close mobile menu
    // $('.js_close_menu').on('click', function(){ $html.removeClass('open-menu'); });
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Add arrows to CTA links
    $('.js_add_arrow').each(function(){
        var elem = $(this),
            arry = elem.text().split(' '),
            newS = '';

        for(var i=0; i<arry.length; i++)
        {
            if( (i+1) == arry.length )
                 newS += '<span class="nowrap">'+arry[i]+' &rarr;</span>';
            else newS += arry[i]+' ';
        }

        elem.removeClass('js_add_arrow').addClass('hasArrow').html(newS);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Check for outplay get paramter
    /*
    var autoplay = getUrlParameter('autoplay');

	if( autoplay )
	{
		var elem;

		if( getUrlParameter('resource-type')==='video' && !isNaN( parseInt(autoplay)) )
			 elem = $('#post-'+autoplay+' .fancybox');
		else elem = $('[data-autoplay="'+autoplay+'"]');

        if( !elem.length ){ return; }

        $.fancybox.open( elem[0] );
	}
    */
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////
    //  Responsive Tables
    /*
    $('.table-responsive tr').each(function() {
        var row = $(this),
            txt = $('th', row).text();

        if( txt )
        {
            $('td', row).wrapInner('<div class="cell" />').attr('data-label', txt).addClass('clearfix has-label');
        }
	});

    $('.dform tbody tr').each(function() {
        var row = $(this);
	});
    */
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Remove all empty paragraph tags
    $('p:empty').remove();
    ///////////////////////////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Catch all old fancybox attempts
    $('a.fancybox').fancybox();
    ///////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Responsive Maps
    var map = $('map');
    if( map.length ) map.imageMapResize();
    ////////////////////////////////////////////////////////////////////////////////////////////////


    ////////////////////////////////////////////////////////////////////////////////////////////////
    // Add class to HTML tag if window.load doesnt occur before 5 seconds
    setTimeout(pageLoaded, 5000);
});

////////////////////////////////////////////////////////////////////////////////////////////////////
/* WINDOW.LOAD - Fires only when all content for the page has been downloaded and rendered
-----------------------------------------------
///////////////////////////////////////////////*/
$wind.on({
    load: function()
    {
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // when the user clicks <data-scrollTo="X"> || scroll to its corresponding ID  =>  [data-scrollTo="element_class"] => .element_class
        $('[data-scrollto]').on('click', function(e){ e.preventDefault(); aniScroll($('#'+$(this).attr('data-scrollTo')), 1000, 0); });
        ////////////////////////////////////////////////////////////////////////////////////////////////

        ////////////////////////////////////////////////////////////////////////////////////////////
        // THIS MUST BE LAST
        ////////////////////////////////////////////////////////////////////////////////////////////
        // Run all functions initially as well as when the browser is resized
        responsiveW();
        ////////////////////////////////////////////////////////////////////////////////////////////
        // After all functions have exxecuted, wait XXms then run the final function to fade the page in
        setTimeout(pageLoaded, 500);
        ////////////////////////////////////////////////////////////////////////////////////////////
    },
    resize: function()
    {
        ////////////////////////////////////////////////////////////////////////////////////////////
        // CODE GOES HERE

        if( !isMobile && bInfo.winWidth() > 1024 )
        {
            $html.removeClass('open-menu');
        }


        ////////////////////////////////////////////////////////////////////////////////////////////
        // THIS MUST BE LAST
        ////////////////////////////////////////////////////////////////////////////////////////////
        //
        responsiveD();
        ////////////////////////////////////////////////////////////////////////////////////////////
        //
        responsiveW();
        ////////////////////////////////////////////////////////////////////////////////////////////
    },
    scroll: function()
    {
        ////////////////////////////////////////////////////////////////////////////////////////////
        // CODE GOES HERE

        ////////////////////////////////////////////////////////////////////////////////////////////
        // THIS MUST BE LAST
        ////////////////////////////////////////////////////////////////////////////////////////////
        //
        scrollD();
        ////////////////////////////////////////////////////////////////////////////////////////////
    }
});








/*--------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////
----------------------------------------------------------------------------------------------------
// Start the application
//////////////////////////////////////////////////////////////////////////////////////////////////*/
/**
 * @desc Set of functions to run after page is
 *       loaded. Mainly for animation purposes
 */
function pageLoaded()
{
    if( !page_loaded )
    {
        ////////////////////////////////////////////////////////////////////////////////////////////////
        // Track event clicks for Google Analytics
        //
        var trackers = '[class*="MOV-G_"] a:not([class*="MOV_"]), [class*="MOV_"]',
            tButtons  = {};

        $(trackers).each(function(){
            var elem = $(this);

            if( !elem.parents('#header').length && !elem.parents('#footer').length && !elem.attr('data-label') )
            {
                var label  = elem.text(),
                string = label.replace(/ /g,'').toLowerCase();

                if( !tButtons[string] )
                {
                    tButtons[string] = 1;
                }
                else
                {
                    elem.attr('data-label', label + ' ' + (++tButtons[string]));
                }
            }
        });

        $(document.body).on('click', trackers, function(){ doTracking( $(this) ); });
        ////////////////////////////////////////////////////////////////////////////////////////////////

        $html.addClass('ready');

        page_loaded = true;
    }
}




/**
 * @desc Insert functions here that get called
 *       once onload and also on a page reszie
 */
////////////////////////////////////////////////////////////////////////////////////////////////////
// Page Scroll
function scrollD()
{
    checkScroll();
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Document Ready
function responsiveD()
{

}


////////////////////////////////////////////////////////////////////////////////////////////////////
// Window Load
function responsiveW()
{

}




/**
 * @desc Shrink the header once you begin to scroll the page
 */
function checkScroll()
{
    // var runFunctions = false;

    if( $docu.scrollTop() < 1 || $html.hasClass('fixedHead') )
    {
         $html.removeClass('is-scrolling');

         // runFunctions = true;
    }
    else if( !$html.hasClass('is-scrolling') )
    {
        $html.addClass('is-scrolling');

        // runFunctions = true;
    }

    // Run commands when toggling header size
    /*
    if( runFunctions )
    {
        // CODE GOES HERE

        // KEEP LAST
        runFunctions = false;
    }
    */
}




/**
 * @desc Enable all events for the navigation menus
 */
function navigationControls()
{
    var search = $('form.search-form', $head);

    // Naviation Search Controls
    $('.js_open_search', $head).on('click', function(){

        // If the search box is open, do a search function
        if( $html.hasClass('search-open') && $('.search', search).val() )
        {
            search.submit();
        }
        // Otherwise, open the search box.
        else
        {
            $html.addClass('search-open');
            $('.search', search).focus();
        }
    });
    /**/
    // $('.js_search', $mobi).on('click', function(){ $(this).parent().submit(); });


    // Disable navigation events if the search bar is open
    $('a', $navi).on('click', function(e){ if( $html.hasClass('search-open') || $(this).attr('href')=='#' ) e.preventDefault(); });

    // Add drop buttons to mobile menu items
    $('.menu-item-has-children')
    .prepend('<div class="drop" />')
    .find('.drop').on('click', function(){
        $(this).parent().toggleClass('sub-menu-open').find('ul').stop(0).slideToggle();
    });


    $('> ul > li', $navi).hover(
        // Hover
        function(){ if( !$html.hasClass('search-open') ) $(this).children('ul').stop().slideDown(250); },
        // Blur
        function(){ $(this).children('ul').stop().slideUp(250);}
    );

    $('.quick-nav li', $head).addClass('list-inline-item');


    // Close search box in nav on click of the close button
    $('.js_close_search', $head).on('click', function(){ $html.removeClass('search-open'); });


    ////////////////////////////////////////////////////////////////////////////////////////////////
    /*
    // Language Select controls
    var lang_id     = 'language-select',
        lang_select = $('.'+lang_id);

    lang_select.on('click', function(e){
        if( !$(e.target).is('a')  )
        {
            $(this).toggleClass('open-select-lang').find('.options').slideToggle();
        }
    });

    $docu.click(function(e) {
        if( !$(e.target).parents('.'+lang_id).length && e.target.id!=lang_id )
        {
            lang_select.removeClass('open-select-lang').find('.options').slideUp();
        }
    });
    */
    ////////////////////////////////////////////////////////////////////////////////////////////////
}
