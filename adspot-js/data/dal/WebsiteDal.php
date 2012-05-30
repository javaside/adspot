<?php 
	require_once 'DBModel.php';

	class WebsiteDal extends DBModel{
		
		function getWebsite($wcode){
			
			$sql = "select * from website where wcode = '" + $this->safeStr($wcode) . "'";
			
			$rs = mysql_query($sql, $this->conn);
			
			$website = mysql_fetch_row($rs);
			
			return $website;			
		}
	}
?>