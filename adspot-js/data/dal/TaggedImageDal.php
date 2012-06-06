<?php 
	require_once 'DBModel.php';	

	class TaggedImageDal extends DBModel{
		
		/**
		 * 
		 * @param  $remoteAddr 图片地址
		 * @param  $wid website id
		 */
		function getImage($remoteAddr, $wid){
			$sql = "select * from taggedimage where wid = " . $wid . " and remote_addr=" . $this->safeStr($remoteAddr);
			
			$rs = mysql_query($sql, $this->conn);
				
			$row = mysql_fetch_array($rs);
				
			$img = null;
			
			if($row){
				$img = array();
				
				$img["imgid"] = $row["imgid"];
				$img["wid"] = $row["wid"];
				$img["remote_addr"] = $row["remote_addr"];
				$img["title"] = $row["title"];
				$img["width"] = $row["width"];
				$img["height"] = $row["height"];
				$img["thumb"] = $row["thumb"];
				$img["access_status"] = $row["access_status"];
				$img["spotbyadv"] = $row["spotbyadv"];
				$img["spotbyadv_rule"] = $row["spotbyadv_rule"];
				$img["crt_time"] = $row["crt_time"];
				$img["update_time"] = $row["update_time"];
			}
			return $img;
		}
		
		/**
		 * 保存
		 * @param unknown_type $img
		 */
		function saveImage($img){
			$sql = "insert into taggedimage(wid,remote_addr,width,height,title,crt_time,update_time) "
			."values(" . $this->safeStr($img['wid']) . "," . $this->safeStr($img["remote_addr"]) . ", " . $this->safeStr($img["width"]) . "," . $this->safeStr($img["height"]) . "," . $this->safeStr($img["title"]) .",now(),now())";
			$count = mysql_query($sql, $this->conn);
			
			if($count > 0){
				$img['imgid']  = mysql_insert_id($this->conn);
			}
		}
	}
?>