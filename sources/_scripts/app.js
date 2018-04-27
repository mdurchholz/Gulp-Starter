/*-------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////
// Application Logic
////////////////////////////////////////////////////////////////////////////////////////////////////
------------------------------------------------------------------------------------------------- */
var isMobile;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
     isMobile = true;
else isMobile = false;




/* DOCUMENT.READY - Fires as soon as the DOM is ready
-----------------------------------------------
///////////////////////////////////////////////*/
$docu.ready(function()
{
    // When set to true, this will attempt to mimic the spacing for a WP Admin bar.
    if( false )
    {
        $body.addClass('admin-bar').prepend('<div id="wpadminbar" class="fake" />');
        $('head').append('<style type="text/css" media="screen">html { margin-top: 32px !important; }* html body { margin-top: 32px !important; }@media screen and ( max-width: 782px ) {html { margin-top: 46px !important; }* html body { margin-top: 46px !important; }}</style>');
    }

    // Run the double event functions first
    scrollD(); responsiveD();


    // add a mobile class to the HTML element if mobile device
    $html.addClass( isMobile ? 'mobile' : 'desktop' );


    // Track event clicks for Google Analytics
    $(document.body).on('click', '[data-category]', function() { doTracking($(this)); });


    // Break up header text into individual spans in order to add the theme background color
    spliceH1( $('.js_add_BG') );


    // Add class to HTML tag if window.load doesnt occur before 5 seconds
    // setTimeout(pageLoaded, 5000);
});


/* DOCUMENT.LOAD - Fires only when all content for the page has been downloaded and rendered
-----------------------------------------------
///////////////////////////////////////////////*/
$wind.on({
    load: function()
    {
        responsiveW();

        // THIS MUST BE LAST
        setTimeout(pageLoaded, 500);
    },
    resize: function()
    {
        // CODE GOES HERE

        responsiveD();
        responsiveW();
    },
    scroll: function()
    {
        scrollD();
    }
});








/*-------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////////////////////////
------------------------------------------------------------------------------------------------- */
/* Start the application
----------------------------------------------- */
/**
 * @desc Set of functions to run after page is
 *       loaded. Mainly for animation purposes
 */
function pageLoaded()
{
    $html.addClass('ready');
}




/**
 * @desc Insert functions here that get called
 *       once on load and also on a page event
 */

// Page Scroll
function scrollD()
{

}

// Document Ready
function responsiveD()
{

}

// Window Load
function responsiveW()
{

}




/**
 * @desc Trigger Google Analytic tracking
 *       events if the GA script is found
 */
function doTracking( elem, category, action, label )
{
    var cate = elem ? elem.attr('data-category') : category,
        actn = elem ? elem.attr('data-action') : action,
        labl = elem ? elem.attr('data-label') : label;

    if( typeof ga !== 'undefined' )
    {
        var trackerName = ga.getAll()[0].get('name');

        ga(trackerName + '.send', 'event', cate, actn, labl);
    }
    else if( typeof _gaq !== 'undefined' )
    {
        _gaq.push(['_trackEvent', cate, actn, labl]);
    }
    else
    {
        console.log('GA TRACKING VALUES: '+'Category = "'+cate+'" | Action = "'+actn+'" | Label = "'+labl+'"');
    }
}




/**
 * @source https://codepen.io/jondaiello/pen/mOEZOM
 * @desc Break up header text into individual spans
 *       in order to add the theme background color
 */
function spliceH1( headline )
{
    if( !headline.length ){ return; }

    headline
    .addClass('clearfix')
    .each(function(){
        var elem = $(this),
            headlineText = elem.text().split(' '),
            newHeadline  = '';

        for(var i=0; i<headlineText.length; i++ )
        {
            newHeadline += '<span>'+headlineText[i]+'</span>';
        }

        elem.html(newHeadline);
    });

    headline.siblings('.tag').addClass('topBG');
}




/**
 * @desc ScrollTo animation that offets the end
 *       position with the fixed header in mind
 */
function aniScroll(element, speed, offset)
{
    if(speed  === undefined) speed  = 1000;
    if(offset === undefined) offset = 5;

    $('html, body').animate({
        scrollTop : element.offset().top - $head.outerHeight() - $('#wpadminbar').outerHeight() - offset
    }, speed);
}




/**
 * @desc Get parameters from the URL
 */
function getUrlParameter(sParam)
{
    var sPageURL       = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables  = sPageURL.split('&'),
        sParameterName = null;

    for (var i = 0; i < sURLVariables.length; i++)
    {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam)
        {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
