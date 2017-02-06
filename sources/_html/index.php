<?php
require_once('assets/includes/Mobile_Detect.php');
$detect = new Mobile_Detect;

$device = $detect->isMobile() ? ($detect->isTablet() ? 'tablet' : 'mobile') : 'desktop';

?><!DOCTYPE html>
<!--[if lte IE 8]> <html class="ie9 ie8-7 <?php echo $device; ?>"> <![endif]-->
<!--[if IE 9]> <html class="ie9 <?php echo $device; ?>"> <![endif]-->
<!--[if !IE]>-->
<html class="<?php echo $device; ?>">
<!--<![endif]-->
<head>
<?php include('assets/includes/doctype.php'); ?>
</head>
<body>
<div id="wrapper">
	<div id="header">
		<nav id="nav"></nav>
	</div>
	<div id="content">
		<div id="banner"></div>
	</div>
	<div id="footer"></div>
</div>
<!-- Custom Scripts & Plugins for Footer -->
<script type="text/javascript" src="/assets/scripts/master.min.js"></script>
</body>
</html>
