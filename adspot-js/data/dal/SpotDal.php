<?php 
	require_once 'DBModel.php';
	
	class SpotDal extends DBModel{
		
		function getSpotsByImg($imgArr){
			$first = true;
			$imgAddrs = "";
			
			foreach ($imgArr as $key=>$img){
				if($first){
					$imgAddrs = $this->safeStr($img->src);
				}else{
					if(empty($img->src)) {continue;}
					$imgAddrs = $imgAddrs . "," . $this->safeStr($img->src);
				}
			
				$first = false;
			}
			
			$sql = "select s.sid as id, s.type, s.imgid, s.marginx as 'left', s.marginy as 'top', s.link_addr, s.link_title, s.link_desc, s.link_thumb,"
			."p.pcode, p.pname,p.unit_price,p.pdct_thumb,p.click_target,p.delivery_type,p.delivery_rule,p.status as pstatus "
			."from spot as s inner join taggedimage as t on t.imgid = s.imgid left join product as p on p.pid=s.pid where t.remote_addr in (" . $imgAddrs . ")";
			
			$result = mysql_query($sql, $this->conn);
			
			$imgArrTmp = array();
			
			while ($row = mysql_fetch_row($result)){
				$imgArrTmp[] = $row;
			}
			
			return $imgArrTmp;
		}
		
		function getSpot($sid){
			$sql = "select * from spot where sid = " . $this->safeStr($sid);
				
			$rs = mysql_query($sql, $this->conn);
				
			$row = mysql_fetch_array($rs);
			
			$sopt = array();
			
			if($row){
				$spot["sid"] = $row["sid"];
				$spot["type"] = $row["type"];
				$spot["imgid"] = $row["imgid"];
				$spot["marginx"] = $row["marginx"];
				$spot["marginy"] = $row["marginy"];
				$spot["link_addr"] = $row["link_addr"];
				$spot["link_title"] = $row["link_title"];
				$spot["link_desc"] = $row["link_desc"];
				$spot["link_thumb"] = $row["link_thumb"];
				$spot["pid"] = $row["pid"];
				$spot["crt_time"] = $row["crt_time"];
				$spot["update_time"] = $row["update_time"];
			}
				
			return $spot;
		}
		
		function save($spot){
			
			$sql = "insert into spot(type,imgid,marginx,marginy,link_addr,link_title,link_desc,link_thumb,pid,crt_time,update_time)" 
			       . "values(". $this->safeStr($spot['type']) . "," . $this->safeStr($spot['imgid']) . "," . $this->safeStr($spot['marginx']) . "," . $this->safeStr($spot['marginy']) . "," . $this->safeStr($spot['link_addr'])
				   . ",". $this->safeStr($sopt['link_title']) . "," . $this->safeStr($spot['link_desc']) . ",". $this->safeStr($spot['link_thumb']) ."," . $this->safeStr($spot['pid']) . ",now(),now())";
			
			echo $sql;
			
			$count = mysql_query($sql, $this->conn);
			
			if($count>0){
				$spot['sid'] = mysql_insert_id($this->conn);
			}
			
		}
		
		function update($spot){
			
		}
	}
?>