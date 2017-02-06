<?php
require_once('assets/includes/Mobile_Detect.php');
$detect = new Mobile_Detect;

$currentpage = $_SERVER['REQUEST_URI'];
if($currentpage=="/" || $currentpage=="/index.php" || $currentpage=="" ) {
	$page = 'home';
}else{
	$page = 'page';
}

if( $detect->isMobile() || $detect->isTablet() ){
	$device = 'mobile';
}else{
	$device = 'desktop';
}

?><!DOCTYPE html>
<!--[if lte IE 8]> <html class="ie9 ie8-7 <?=$page.' '.$device?>"> <![endif]-->
<!--[if IE 9]> <html class="ie9 <?=$page.' '.$device?>"> <![endif]-->
<!--[if !IE]>-->
<html class="<?=$page.' '.$device?>">
<!--<![endif]-->
<head>
<?php include('assets/includes/doctype.php'); ?>
</head>

<body>
<div class="wrapper">
	<div class="section header">
    	<div class="row long">

			<div class="col_08">
				<h1 class="title">Site</h1>
			</div>

		</div>
    </div>
	<div class="section content"></div>
	<div class="section footer"></div>
</div>
<!-- HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
<script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
<![endif]-->
<!-- Custom Scripts & Plugins for Footer -->
<script type="text/javascript" src="/assets/scripts/master.min.js"></script>
</body>
</html>
