<?php 
	//header('Content-type: application/json');
	
	require_once 'config.php';
	require_once 'Utils.php';
	require_once 'dal/WebsiteDal.php';
	require_once 'dal/TaggedImageDal.php';
	require_once 'dal/SpotDal.php';
	
	
	$wbcode = _post("wbcode");	//网站编号
	$type   = _post("type");	//类型
	$link_addr   = _post("link_addr");	//
	$link_thumb   = _post("link_thumb");	//
	$link_desc   = _post("link_desc");	//
	$link_title   = _post("link_title");	//
	$left = _post("left");
	$top  = _post("top");
	$sid = _post('id');
	$pid = _post("pid"); //商品id
	
	$imgSrc = _post("imgSrc");
	$imgWidth = _post("imgWidth");
	$imgHeight = _post("imgHeight");
	$imgTitle = _post("imgTitle");
	
	if(empty($wbcode) || empty($type)){
		exit;
	}
	
	
	$con = mysql_connect($mysql_host, $mysql_user, $mysql_pwd);
	
	mysql_select_db($musql_adspot_db, $con);
	$websiteDal = new WebsiteDal($con);
	$imageDal = new TaggedImageDal($con);
	$spotDal  = new SpotDal($con);
	
	$website = $websiteDal->getWebsite($wbcode);
	
	$taggedImage = $imageDal->getImage($imgSrc, $website['wid']);
	
	if(empty($taggedImage)){
		$taggedImage =  array();
		$taggedImage['wid'] = $website['wid'];
		$taggedImage['remote_addr'] = $imgSrc;
		$taggedImage['width']    = $imgWidth;
		$taggedImage['height']   = $imgHeight;
		$taggedImage['title']    = $imgTitle;
		$imageDal->saveImage($taggedImage);
	}
	
	if(!empty($taggedImage['imgid'])){
		$spot = array();
		$spot['sid'] =  $sid;
		$spot['left'] = $left;
		$spot['top']  = $top;
		$spot['type'] = $type;
		$spot['link_addr'] = $link_addr;
		$spot['link_desc'] = $link_desc;
		$spot['link_thumb'] = $link_thumb;  
		$spot['link_title'] = $link_title;
		$spot['marginy'] = $top;
		$spot['marginx'] = $left;
		$spot['pid']  = $pid;
		$spot['imgid'] = $taggedImage['imgid'];
		
		if(is_numeric($sid)){
			$tspot = $spotDal->getSpot($sid);
		}
		if(!empty($tspot)){
			$spotDal->update($spot);
		}else{
			$spotDal->save($spot);
		}
	}
	
	echo "ok";
	mysql_close($con);
?>