<?php 
	require_once 'DBModel.php';

	class WebsiteDal extends DBModel{
		
		function getWebsite($wcode){
			
			$sql = "select * from website where wcode = " . $this->safeStr($wcode);
			
			$rs = mysql_query($sql, $this->conn);
			
			$row = mysql_fetch_array($rs);
			
			$website = null;
			
			if($row){
				
				$website = array();
				
				$website["wid"] = $row["wid"];
				$website["wcode"] = $row["wcode"];
				$website["wname"] = $row["wname"];
				$website["url"] = $row["url"];
				$website["pv"] = $row["pv"];
				$website["wcid"] = $row["wcid"];
				$website["crt_time"] = $row["crt_time"];
				$website["status"] = $row["status"];
			}
			
			return $website;			
		}
	}
?>