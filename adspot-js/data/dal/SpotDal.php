<?php 
	require_once 'DBModel.php';
	
	class SpotDal extends DBModel{
		
		function getSpot($sid){
			$sql = "select * from spot where sid = " + $this->safeStr($sid);
				
			$rs = mysql_query($sql, $this->conn);
				
			$spot = mysql_fetch_row($rs);
				
			return $spot;
		}
		
		function save($spot){
			
			$sql = "insert into spot(type,imgid,marginx,marginy,link_addr,link_title,link_desc,link_thumb,crt_time,update_time)" 
			       . "values('". $this->safeStr($spot['type']) ."',". $spot['imgid'] .",". $spot['left'] .",". $spot['top'] .",'" . $this->safeStr($spot['link_addr']) ."'"
				   . ",'". $this->safeStr($sopt['link_title']) ."','" . $this->safeStr($spot['link_desc']) . "','". $this->safeStr($spot['link_thumb']) ."',now(),now())";
			
			
			$count = mysql_query($sql, $this->conn);
			
			if($count>0){
				$spot['sid'] = mysql_insert_id($this->conn);
			}
			
		}
		
		function update($spot){
			
		}
	}
?>