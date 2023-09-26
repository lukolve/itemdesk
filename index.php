<html> 
<title>HTML with PHP testing</title>
<style>
body {
margin: 0px;
}
</style>
<body>
<?php
$url = $_SERVER['REQUEST_URI'];
$parts = explode('?=', $url);
$page = $parts[1];
$page = isset( $_GET['page'] ) ? $_GET['page'] : "loader.html";
echo '<iframe align="center" width="100%" height="100%" src="'.$page.'" frameborder="no" scrolling="no" name="myIframe" id="myIframe"> </iframe>';
?>
</body>
</html>
