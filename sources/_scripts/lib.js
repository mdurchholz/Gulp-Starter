/* -------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////
// JS LIBRARY
////////////////////////////////////////////////////////////////////////////////////////////////////
------------------------------------------------------------------------------------------------- */
/* Variables
----------------------------------------------- */
var bInfo = new browserInfo(),
    cssEv = new events(),

    $docu = $(document),
    $wind = $(window),
    $html = $('html'),
    $body = $('body'),
    $wrap = $('#wrapper'),
    $head = $('#header'),
    $navi = $('#nav'),
    $bann = $('#banner'),
    $foot = $('#footer');


/* FUNC - Creates Console object to avoid IE issues
----------------------------------------------- */
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


/* FUNC - Check for touch events
----------------------------------------------- */
function events()
{
    this.anistart = 'webkitAnimationStart oanimationstart msAnimationStart animationstart';
    this.aniEnd   = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

    this.transStart = 'webkitTransitionStart otransitionstart oTransitionStart msTransitionStart transitionstart';
    this.transEnd   = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
}


/* FUNC - Browser Info
----------------------------------------------- */
function browserInfo()
{
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0];

    this.winHeight = function()
    {
        return w.innerHeight|| e.clientHeight|| g.clientHeight;
    };
    this.winWidth = function()
    {
        return w.innerWidth || e.clientWidth || g.clientWidth;
    };
    this.aspectRatio = function()
    {
        return (this.winWidth() / this.winHeight());
    };
}


/* FUNC - Asynchronously load in scripts
----------------------------------------------- */
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
