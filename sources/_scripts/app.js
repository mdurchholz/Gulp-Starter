/* -------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////
// Application Logic
////////////////////////////////////////////////////////////////////////////////////////////////////
------------------------------------------------------------------------------------------------- */
/* Start the application
----------------------------------------------- */


/**
 * @desc Some description of your function
 */
 function someFunction()
 {

 }




 /* Functions for document ready and window resize
 -----------------------------------------------*/
 function responsiveD()
 {

 }
  /* Functions for window load and window resize
  -----------------------------------------------*/
 function responsiveW()
 {

 }

/* DOCUMENT.READY - Fires as soon as the DOM is ready
-----------------------------------------------
///////////////////////////////////////////////*/
$docu.ready(function()
{
    responsiveD();
});


/* DOCUMENT.LOAD - Fires only when all content for the page has been downloaded and rendered
-----------------------------------------------
///////////////////////////////////////////////*/
$wind.on({
    load: function(){

        responsiveW();

        $html.addClass('ready');

    },
    resize: function(){
        responsiveW();
        responsiveD();
    },
    scroll: function(){

    }
});
