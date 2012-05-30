<?php 
	header('Content-type: application/json');
	
	require_once 'config.php';
	require_once 'Utils.php';
	
	$wbcode = _post("wbcode");	//网站编号
	$imgs   = _post("imgs");	//符合规则的网站图片
	
	if(empty($wbcode) || empty($imgs)){
		echo "{}";
		exit;
	}
	
	$imgArr = json_decode($imgs);
	
	$first = true;
	$imgAddrs = "";
	
	foreach ($imgArr as $key=>$img){
		if($first){
			$imgAddrs = "'" . $img->src . "'";
		}else{
			$imgAddrs = $imgAddrs . ",'" . safeStr($img->src) . "'";
		}
		
		$first = false;
	}
	
	$con = mysql_connect($mysql_host, $mysql_user, $mysql_pwd);
	
	mysql_select_db($musql_adspot_db, $con);
	
	$sql = "select s.sid as id, s.type, s.imgid, s.marginx as 'left', s.marginy as 'top', s.link_addr, s.link_title, s.link_desc, s.link_thumb,"
		   ."p.pcode, p.pname,p.unit_price,p.pdct_thumb,p.click_target,p.delivery_type,p.delivery_rule,p.status as pstatus " 
		   ."from spot as s inner join taggedimage as t on t.imgid = s.imgid left join product as p on p.pid=s.pid where t.remote_addr in (" . $imgAddrs . ")";
	
	$result = mysql_query($sql, $con);
	
	$imgArrTmp = array();
	
 	while ($row = mysql_fetch_row($result)){
 		$imgArrTmp[] = $row;
 	}
	
	echo json_encode($imgArrTmp);
	
	mysql_close($con);
	
?>