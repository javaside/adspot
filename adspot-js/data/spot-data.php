<?php 
	header('Content-type: application/json');
	
	require_once 'config.php';
	require_once 'Utils.php';
	require_once 'dal/SpotDal.php';
	
	$wbcode = _post("wbcode");	//网站编号
	$imgs   = _post("imgs");	//符合规则的网站图片
	
	if(empty($wbcode) || empty($imgs)){
		echo "{}";
		exit;
	}
	
	$imgArr = json_decode($imgs);
	
	
	
	$con = mysql_connect($mysql_host, $mysql_user, $mysql_pwd);
	
	mysql_select_db($musql_adspot_db, $con);
	
	$spotDal = new SpotDal($con);
	
	$imgArrTmp = $spotDal->getSpotsByImg($imgArr); 
	
	echo json_encode($imgArrTmp);
	
	mysql_close($con);
	
?>