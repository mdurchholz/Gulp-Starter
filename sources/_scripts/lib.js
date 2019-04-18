/* -------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////
// JS LIBRARY
////////////////////////////////////////////////////////////////////////////////////////////////////
------------------------------------------------------------------------------------------------- */
/* Variables
----------------------------------------------- */
var $ = jQuery,

    bInfo = new browserInfo(),
    cssEv = new events(),

    $move = chooseTranslate(),

    $docu = $(document),
    $wind = $(window),
    $html = $('html'),
    $body = $('body'),
    $mobi = $('#mobile-wrap'),
    $wrap = $('#wrapper'),
    $head = $('#header'),
    $navi = $('#nav'),
    $crum = $('#breadcrumb'),
    $bann = $('#banner'),
    $cont = $('#content'),
    $foot = $('#footer'),

    $wpBr = $('#wpadminbar'),

    page_loaded = false;


/**
 * @desc Check if user is on mobile device
 */
var isMobile;
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
     isMobile = true;
else isMobile = false;




/**
 * @desc Creates Console object to avoid IE issues
 */
(function()
{
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--)
    {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method])
        {
            console[method] = noop;
        }
    }
}());




/**
 * @desc Transition and Animation event shortcuts
 */
function events()
{
    this.anistart = 'webkitAnimationStart oanimationstart msAnimationStart animationstart';
    this.aniEnd   = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

    this.transStart = 'webkitTransitionStart otransitionstart oTransitionStart msTransitionStart transitionstart';
    this.transEnd   = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
}




/**
 * @desc Get browser information
 */
function browserInfo()
{
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

    this.winHeight   = function(){ return w.innerHeight || e.clientHeight || g.clientHeight; };

    this.winWidth    = function(){ return w.innerWidth  || e.clientWidth  || g.clientWidth;  };

    this.aspectRatio = function(){ return (this.winWidth() / this.winHeight()); };
}




/**
 * @desc Asynchronously load in scripts
 */
var firstScriptTag = document.getElementsByTagName('script')[0];

function addScript(list)
{
    for(var i=0; i<list.length; i++)
    {
        var tag = document.createElement('script');
        tag.src = list[i];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}




/**
 * @desc ScrollTo animation that offets the end
 *       position with the fixed header in mind
 */
function aniScroll(element, speed, offset)
{
    if(speed  === undefined) speed  = 1000;
    if(offset === undefined) offset = 5;

    // Include header when fixed
    var gap = ($head.css('position')=='fixed' ? $head.outerHeight() : 0) + ($wpBr.length ? $wpBr.outerHeight() : 0) + offset;

    $('html, body').animate({
        scrollTop : element.offset().top - gap
    }, speed);
}




/**
 * @desc Functions to perform after video is ready to play
 */
function canPlay(elm)
{
    var elem = $(elm);

    if( !elem.hasClass('loadIn') )
    {
        sizes[elem.attr('data-position')] = [elem.outerWidth() / elem.outerHeight()];

        setDimensions(elem, 0.5, false);

        $(window).resize(function(){ setDimensions(elem, 0.5, false); });

        elem.addClass('loadIn');
    }
}



/**
 * @desc
 */
function getDimensions(target, track)
{
    var winWidth  = target.parent().outerWidth(),
        winHeight = target.parent().outerHeight(),
        winAspect = winWidth / winHeight,

        elemRatio = sizes[target.attr('data-position')],

        chk = ( winWidth >= winHeight ) && ( winAspect >= elemRatio),

        $wH = { high : ( chk ? winWidth : winHeight),
                low  : (!chk ? winWidth : winHeight) },

        $tP = chk ? (1 / elemRatio) : elemRatio,

        $oF  = -Math.round( ($wH.high * $tP - $wH.low) * track );

    this.getWidth  = chk ? winWidth : (winHeight*elemRatio);

    this.getHeight = chk ? (winWidth/elemRatio) : winHeight;

    this.getMove   = { x : chk ? 0 : $oF,
                       y : chk ? $oF : 0,
                       z : 0 };
}

function setDimensions(target, track, useWindow)
{
    var getDim = new getDimensions(target, track, useWindow),
        getWd  = Math.round(getDim.getWidth),
        getHt  = Math.round(getDim.getHeight),
        getMvX = Math.round(getDim.getMove.x),
        getMvY = Math.round(getDim.getMove.y),
        css    = $move(getMvX, getMvY);

    target
    .width(getWd)
    .height(getHt)
    .css(css);
}

function chooseTranslate()
{
    var args;

    if( detectIE() > 0 )
         args = function(x, y){ return { 'top'  : y+'px', 'left' : x+'px' }; };
    else args = function(x, y){ return { 'transform' : 'translate3d('+x+'px, '+y+'px, 0) scale3d(1,1,1)' }; };

    return args;
}

/**
 * https://codepen.io/gapcode/pen/vEJNZN
 *
 * @desc Detect if browser is in Internest Explorer
 */
function detectIE()
{
    var ua = window.navigator.userAgent;

    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        // IE 10 or older => return version number
        return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        // IE 11 => return version number
        var rv = ua.indexOf('rv:');
        return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    var edge = ua.indexOf('Edge/');
    if (edge > 0) {
        // Edge (IE 12+) => return version number
        return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
}





/**
 * @desc Initialize videos and add to DOM
 */
// var ext   = [['.mp4', 'mp4'],['.webm', 'webm']],
var ext   = [['.mp4', 'mp4']],
    sizes = [];

function initVideos()
{
	// var supportsVideoElement = Modernizr.video && ( !detectIE() || detectIE() >= 11);
    var supportsVideoElement = ( !detectIE() || detectIE() >= 11);

    if( !supportsVideoElement )
    {
        $('.video-load').each(function(index){
            var elem = $(this);

            elem.parent().css('background-image', 'url('+elem.attr('data-poster')+')');
            elem.remove();
        });
    }
    else
    {
        $('.video-load').each(function(index){
            var elem   = $(this),
                path   = elem.attr('data-path'),
                poster = elem.attr('data-poster'),
                exclud = elem.attr('data-exclude'),
                newVid = loadVideo(index, path, exclud);

            elem.after(newVid);
            elem.remove();

            if (poster) $(newVid).attr("poster", poster);
        });
    }

    /**
     * @desc Create video element
     */
    function loadVideo(index, path, exclude)
    {
        var vid = $('<video id="video-'+index+'" preload loop muted'+(exclude ? '' : ' autoplay')+' class="fullscreen'+(exclude ? ' exclude' : '')+'" data-position="'+index+'" oncanplay="canPlay(this);"></video>');

        for(var i=0; i<ext.length; i++)
        {
            vid.append($('<source type="video/'+ext[i][1]+'" src="'+path+ext[i][0]+'" />'));
        }

        return vid;
    }
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




/**
 * @desc Trigger Google Analytic tracking
 *       events if the GA script is found
 */
 var $MOV_DEV = getUrlParameter('movdev');

function doTracking( elem, label )
{
    var labl = elem ? '' : label;

    if( !label )
    {
        /* Determine type of button
        ----------------------------------------------- */
        var logo = '[id*="logo"], [class*="logo"]';

        if( elem.is(logo) || elem.children(logo).length || elem.parents(logo).length )
        {
            labl += 'Logo';
        }
        else if( elem.hasClass('MOV_Play') || elem.parents('.MOV-G_Play').length )
        {
            labl += 'Video';
        }
        else if( elem.attr('href') && elem.attr('href').indexOf('tel:') !== -1 )
        {
            labl += 'Phone';
        }
        else if( elem.attr('data-scrollTo') )
        {
            labl += 'Anchor';
        }
        else if( elem.parents('form').length )
        {
            labl += 'Form Submit';
        }
        else
        {
            labl += 'CTA';
        }


        /* Check to see if the element has data-label
        ----------------------------------------------- */
        labl += ' ~ ';

        if( elem.attr('data-label') )
        {
            labl += elem.attr('data-label');
        }
        else if( elem.is('input') )
        {
            labl += elem.attr('value');
        }
        else
        {
            //      Grab HTML,  replace <br> with space,    remove all HTML elements,     trim the whitespace
            labl += elem.html().replace(/<br\s*\/?>/gi,' ').replace(/<(?:.|\n)*?>/gm, '').trim();
        }


        /* Check which page section the element is in
        ----------------------------------------------- */
             if( elem.parents('#header').length ) { labl += ' ~ Header';  }
        else if( elem.parents('#banner').length ) { labl += ' ~ Banner';  }
        else if( elem.parents('#footer').length ) { labl += ' ~ Footer';  }
    }


    /* Send the data to GA or console
    ----------------------------------------------- */
    if( typeof ga !== 'undefined' && !$MOV_DEV )
    {
        dataLayer.push({'eventLabel' : labl });
    }
    else
    {
        console.log( 'GA TRACKING VALUES: Label = "'+labl+'"' );
    }
}
