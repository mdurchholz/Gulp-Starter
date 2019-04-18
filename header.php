<?php
global $gClass;

include('functions.php');

?><!DOCTYPE html>
<!--[if lte IE 8]> <html class="ie9 ie8-7"> <![endif]-->
<!--[if IE 9]> <html class="ie9"> <![endif]-->
<!--[if !IE]>-->
<html>
<!--<![endif]-->
<head>
	<meta charset="utf-8" />
	<link rel="dns-prefetch" href="//ajax.googleapis.com" /><!-- Grabs repo files quicker -->
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><!-- This + conditionals above destroy edge detection issues -->
	<meta http-equiv="imagetoolbar" content="false" /><!-- Kills IE6 Image toolbar -->

	<title></title>

	<meta name="author" content="" />
	<meta name="description" content="" />
	<meta name="keywords" content="" />
	<meta name="rating" content="general" />
	<meta name="robots" content="index, follow" />
	<meta name="content-language" content="english">
	<meta name="audience" content="all" />

	<!-- Disables Scaling on multi-touch interfaces -->
	<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0">

	<!-- Favicon -->
	<link type="image/png" rel="icon" href="assets/images/favicon.png" />

	<!-- CSS -->
	<link type="text/css" rel="stylesheet" href="assets/css/master<?php if( $isProd ){ echo '.min'; } ?>.css" />
</head>
<body<?php if( $gClass ){ echo ' class="'.$gClass.'"'; } ?>>
<div id="mobile-wrap"></div>
<div id="wrapper">
	<header id="header">
		<div class="container">
            <div class="row">
                <div class="col-12">
                    <p>header</p>
                </div>
            </div>
        </div>

		<nav id="nav">
			<ul>
				<li><a href=""></a></li>
			</ul>
		</nav>

		<div id="mobile-button" class="va-m no-ani">
			<div class="fill"></div>
			<div class="btn">
				<div class="va-m">
					<ul class="clearfix">
						<li class="t"></li>
						<li class="m"></li>
						<li class="b"></li>
					</ul>
					<span>Menu</span>
				</div>
			</div>
		</div>
	</header>
