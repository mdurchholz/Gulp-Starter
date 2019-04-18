<?php
$isLocal = strpos($_SERVER['HTTP_HOST'],'127.0.0.1') !== false;
$isDev   = strpos($_SERVER['HTTP_HOST'],'dev2.moveo.com') !== false || strpos($_SERVER['HTTP_HOST'],'moveodev.com') !== false;
$isProd  = !$isLocal && !$isDev;

$isHome  = $_SERVER['REQUEST_URI'] == '/';


// include('assets/includes/icons.php');


function setColumns( $number )
{
    $column = ( $number == 5 ) ? '20-perc' : 12/$number;

    echo $column;
}


function checkPage( $page )
{
    return strpos($_SERVER['REQUEST_URI'], $page);
}

?>
